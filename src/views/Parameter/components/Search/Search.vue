<template>
  <div class="card">
    <div class="card-header py-0">
      <h6 class="m-0">Search</h6>
    </div>
    <!-- <div class="row d-flex align-items-center mt-1">
      <div class="col-md-2 col-xs-6">Select Machine</div>
      <div class="col-md-9 col-xs-12">
        <multiselect
          v-model="selectedMachine"
          :options="machineList"
          placeholder="Klik Di sini untuk memilih mesin"
        >
        </multiselect>
      </div>
    </div> -->
    <div class="row d-flex align-items-center mt-1">
      <div class="col-md-2 col-xs-6">
        Parameter Auto <input type="checkbox" v-model="isParamAuto" />
      </div>
      <div class="col-md-2 col-xs-6">
        Parameter Manual <input type="checkbox" v-model="isParamManual" />
      </div>
    </div>
    <hr />
    <div class="row d-flex align-items-center mt-1">
      <div class="col-md-2 col-xs-6">Select Parameter</div>
      <div class="col-md-9 col-xs-12">
        <!-- :disabled="selectedMachine && paramList.length != 0 ? false : true" -->
        <multiselect
          v-model="selectedParam"
          :options="paramList"
          :placeholder="
            selectedMachine
              ? 'Klik Di sini untuk memilih parameter'
              : 'Pilih Machine Terlebih dulu'
          "
        >
        </multiselect>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- :disabled="!selectedMachine || !selectedParam" -->
        <button class="btn btn-primary mb-2" @click="searchParameter">
          Search
        </button>
      </div>
    </div>
    <div class="row" v-for="(data, i) in containerDataChart" :key="i">
      <div
        class="col"
        v-if="containerDataChart.length > 0 && data.parameters.length > 1"
      >
        <line-chart :propsCharData="data.parameters"></line-chart>
      </div>
    </div>
    <Loading :propsLoading="isLoading" />
  </div>
</template>


<script>
import multiselect from "vue-multiselect";
import axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      paramList: [],
      selectedParam: "Vibration Spindle",
      selectedMachine: null,
      machineList: [],
      selectedIdMc: null,
      selectedIdParam: null,
      rawMachineList: null,
      isLoading: false,
      containerDataChart: [],
      isParamAuto: true,
      isParamManual: false,
    };
  },
  watch: {
    selectedMachine: function () {
      this.getParamListMan(this.selectedMachine);
    },
    selectedParam: function () {
      let paramSelect = this.rawParamList.find((item) => {
        if (item.param_name == this.selectedParam) {
          return item;
        }
      });
      this.selectedIdParam = paramSelect.id_parameter;
    },
  },
  methods: {
    getDataGraph(machine = null, parameter = null) {
      this.isLoading = true;
      this.containerDataChart = [];
      let url = `${process.env.VUE_APP_HOST}/paramHistory`;
      if (machine && parameter) {
        url += `?filterQuery=WHERE fmc_name = '${machine}' AND param_name = '${parameter}'`;
        // if (this.isParamAuto) {
        //   url += ` AND is_auto = 1`;
        // }
      }
      axios
        .get(url)
        .then(async (resultParam) => {
          console.log(resultParam);
          if (resultParam.message != "Err") {
            let resArrGroup = [];
            let helper = {};
            console.log(resultParam.data.data);
            let resArr = await resultParam.data.data.reduce((r, o) => {
              var key = o.fmc_name + "-" + o.param_name;

              if (!helper[key]) {
                helper[key] = Object.assign({}, o); // create a copy of o
                helper[key].parameters = [];
                helper[key].parameters.push(o);
                if (helper[key].param_name == this.selectedParam) {
                  r.push(helper[key]);
                }
              } else {
                helper[key].parameters.push(o);
              }

              return r;
            }, []);
            console.log(resArr);
            console.log(resArrGroup);
            this.containerDataChart = resArr;
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    getMachineParamMan() {
      this.isLoading = true;
      axios
        .get(`${process.env.VUE_APP_HOST}/machineParameter`)
        .then((resMachine) => {
          console.log(resMachine);
          this.rawMachineList = resMachine.data.data;
          this.machineList = resMachine.data.data.map((mc) => {
            return mc.mc_name;
          });
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getParamListMan(mc = null) {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_HOST}/parameterList`;
      if (mc) {
        url += `?mc_name=${mc}`;
      }
      axios
        .get(url)
        .then((result) => {
          console.log(result);
          this.rawParamList = result.data.data;
          this.selectedIdMc = result.data.data[0].id_machine;
          this.paramList = [
            ...new Set(
              result.data.data.map((param) => {
                return param.param_name;
              })
            ),
          ];
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    searchParameter() {
      this.getDataGraph(this.selectedMachine, this.selectedParam, false);
    },
  },
  components: {
    multiselect,
    LineChart: () => import("../Chart/LineChart.vue"),
    Loading: () => import("@/components/Loading.vue"),
  },
  mounted() {
    this.isLoading = true;
    this.getParamListMan();
    this.getDataGraph();
  },
};
</script>