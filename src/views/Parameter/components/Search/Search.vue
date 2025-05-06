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
    <!-- <div class="row d-flex align-items-center mt-1">
      <div class="col-md-2 col-xs-6">
        Parameter Auto <input type="checkbox" v-model="isParamAuto" />
      </div>
      <div class="col-md-2 col-xs-6">
        Parameter Manual <input type="checkbox" v-model="isParamManual" />
      </div>
    </div> -->
    <hr />
    <div class="row d-flex align-items-center mt-1">
      <div class="col-md-2 col-xs-6">Start Date</div>
      <div class="col-md-4 col-xs-12">
        <input class="form-control" type="date" v-model="startDate" />
      </div>
      <div class="col-md-2 col-xs-6">Finish Date</div>
      <div class="col-md-4 col-xs-12">
        <input class="form-control" type="date" v-model="endDate" />
      </div>
    </div>
    <div class="row d-flex align-items-center mt-1">
      <div class="col-md-2 col-xs-6">Select Machine</div>
      <div class="col-md-9 col-xs-12">
        <multiselect
          v-model="selectedMachine"
          :options="machineList"
          placeholder="Klik Di sini untuk memilih mesin"
        >
        </multiselect>
      </div>
    </div>
    <div class="row d-flex align-items-center mt-1">
      <div class="col-md-2 col-xs-6">Select Parameter</div>
      <div class="col-md-9 col-xs-12">
        <!-- :disabled="selectedMachine && paramList.length != 0 ? false : true" -->
        <multiselect
          v-model="selectedParam"
          :options="paramList"
          :disabled="selectedMachine && paramList.length != 0 ? false : true"
          :placeholder="
            selectedMachine
              ? 'Klik Di sini untuk memilih parameter'
              : 'Pilih Machine Terlebih dulu'
          "
        >
        </multiselect>
      </div>
    </div>
    <div class="row d-flex align-items-center mt-1">
      <div class="col-md-2 col-xs-6">Periodic</div>
      <div class="col-md-9 col-xs-12 text-left">
        <!-- :disabled="selectedMachine && paramList.length != 0 ? false : true" -->
        <b class="text-left">{{ periodic }}</b>
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
    <div v-if="containerDataChart.length > 0">
      <div class="row" v-for="(data, i) in containerDataChart" :key="i">
        <!-- {{ JSON.stringify(data.parameters) }} -->
        <div class="col">
          <line-chart :propsChartData="data.parameters"></line-chart>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row text-center">
        <!-- {{ JSON.stringify(data.parameters) }} -->
        <div class="col text-secondary mt-10">
          <h5>Tidak Ada Data</h5>
        </div>
      </div>
    </div>
    <!-- <line-chart></line-chart> -->
    <Loading :propsLoading="isLoading" />
  </div>
</template>


<script>
import multiselect from "vue-multiselect";
import axios from "axios";

import formatDate from "@/functions/formatDate";
import Swal from "sweetalert2";

export default {
  name: "Search",
  data() {
    return {
      paramList: [],
      startDate: "2016-01-01",
      //   formatDate.YYYYMMDD(
      //   new Date(formatDate.getMondayThisWeek(new Date()))
      // ),
      endDate: formatDate.YYYYMMDD(new Date()),
      selectedParam: "Vibration Spindle",
      selectedMachine: "IMSP-0004",
      machineList: [],
      selectedIdMc: null,
      selectedIdParam: null,
      rawMachineList: null,
      isLoading: false,
      containerDataChart: [],
      isParamAuto: true,
      isParamManual: false,
      periodic: "6M",
      periodics: [],
    };
  },
  watch: {
    selectedMachine: function () {
      this.selectedParam = null;
      this.getParamListMan(this.selectedMachine);
      if (this.$route.query.machine) {
        this.selectedParam = this.$route.query.param;
      }
    },
    selectedParam: function () {
      let paramSelect = this.rawParamList.find((item) => {
        if (item.param_name == this.selectedParam) {
          this.periodic = this.periodics.find(
            (item) => item.param_name == this.selectedParam
          ).periodic;
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
      let url = `${process.env.VUE_APP_HOST}/paramHistory?`;
      if (machine || parameter) {
        // url += `filterQuery=WHERE fmc_name = '${machine}' AND param_name = '${parameter}'`;
        url += `filterQuery=WHERE param_name = '${parameter}' AND (fmc_name = '${machine}' OR fmc_name = 'IMSP-0001' OR fmc_name = 'IMSP-0002' OR fmc_name = 'IMSP-0003') AND clock BETWEEN '${this.startDate} 00:01:00' AND '${this.endDate} 23:59:00'`;
        // if (this.isParamAuto) {
        //   url += ` AND is_auto = 1`;
        // }
      } else {
        url += `filterQuery=WHERE `;
      }
      axios
        .get(url)
        .then(async (resultParam) => {
          console.log(resultParam);
          if (resultParam.message != "Err") {
            this.periodic = resultParam.data.data[0].periodic;
            let helper = {};
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
            // let sortTime = resArr.sort((a, b) => a.clock - b.clock);
            // console.log(sortTime);
            this.containerDataChart = resArr;
            console.log(this.containerDataChart);
            setTimeout(() => {
              this.isLoading = false;
            }, 3000);
          } else {
            Swal.fire("", "data tidak ada", "info");
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    getMachineParamMan() {
      // this.isLoading = true;
      axios
        .get(`${process.env.VUE_APP_HOST}/machineParameter`)
        .then((resMachine) => {
          console.log(resMachine);
          this.rawMachineList = resMachine.data.data;
          this.machineList = resMachine.data.data.map((mc) => {
            return mc.mc_name;
          });
          // this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getParamListMan(mc = null) {
      // this.isLoading = true;
      let url = `${process.env.VUE_APP_HOST}/parameterList`;
      if (mc) {
        url += `?mc_name=${mc}`;
      }
      axios
        .get(url)
        .then((result) => {
          console.log(result);
          this.rawParamList = result.data.data;
          this.periodics = result.data.data.map((param) => {
            return {
              periodic: param.periodic,
              param_name: param.name,
            };
          });
          this.selectedIdMc = result.data.data[0].id_machine;
          this.paramList = [
            ...new Set(
              result.data.data.map((param) => {
                return param.param_name;
              })
            ),
          ];
          // this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    async searchParameter() {
      await this.getParamListMan(this.selectedMachine);
      await this.getDataGraph(this.selectedMachine, this.selectedParam, false);
    },
  },
  components: {
    multiselect,
    LineChart: () => import("../Chart/LineChart.vue"),
    Loading: () => import("@/components/Loading.vue"),
  },
  mounted() {
    // this.getParamListMan();
    console.log(this.$route.query);
    if (this.$route.query.machine) {
      console.log(this.$route.query.param);
      this.selectedMachine = this.$route.query.machine;
      this.selectedParam = this.$route.query.param;
    }
    this.searchParameter();
    this.getMachineParamMan();
  },
};
</script>