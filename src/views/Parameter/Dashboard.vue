<template>
  <div class="container-fluid bg-dark">
    <div class="row">
      <div class="col">
        <button class="btn btn-info text-dark" @click="showDialogTest">
          <b>Test Notif</b>
        </button>
        <v-dialog v-model="isDialogTest" persistent>
          <v-card class="p-0">
            <v-card-title class="headline grey lighten-2">
              Test Notification
            </v-card-title>

            <v-card-text class="p-1">
              <div class="row">
                <div class="col">
                  <multiselect
                    v-model="selectedMachine"
                    :options="machineList"
                    placeholder="Machine"
                  >
                  </multiselect>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <multiselect
                    v-model="selectedParam"
                    :options="paramList"
                    placeholder="Parameter"
                  >
                  </multiselect>
                </div>
              </div>
              <div class="row">
                <div class="col-3">
                  <small>Target Number</small>
                </div>
                <div class="col-9">
                  <b-form-input type="text" v-model="receiverNo"></b-form-input>
                </div>
              </div>
              <div class="row">
                <div class="col-3">
                  <small>Value Check</small>
                </div>
                <div class="col-9">
                  <b-form-input
                    :id="`type-number`"
                    type="number"
                    v-model="valueInput"
                  ></b-form-input>
                </div>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <button
                type="button"
                @click="testSubmitParameter()"
                class="btn btn-success"
              >
                Test Submit
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="isDialogTest = false"
              >
                Close
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="col">
        <button class="btn btn-info text-dark" @click="showDialog">
          <b>TPM Check Manual</b>
        </button>
        <v-dialog v-model="isShowDialog" persistent>
          <v-card class="p-0">
            <v-card-title class="headline grey lighten-2">
              Input Manual TPM
            </v-card-title>

            <v-card-text class="p-1">
              <div class="row">
                <div class="col">
                  <multiselect
                    v-model="selectedMachine"
                    :options="machineList"
                    placeholder="Machine"
                  >
                  </multiselect>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <multiselect
                    v-model="selectedParam"
                    :options="paramList"
                    placeholder="Parameter"
                  >
                  </multiselect>
                </div>
              </div>
              <div class="row">
                <div class="col-3">
                  <small>Date Check</small>
                </div>
                <div class="col-9">
                  <b-form-input
                    type="date"
                    v-model="selectedDate"
                  ></b-form-input>
                </div>
              </div>
              <div class="row">
                <div class="col-3">
                  <small>Value Check</small>
                </div>
                <div class="col-9">
                  <b-form-input
                    :id="`type-number`"
                    type="number"
                    v-model="valueInput"
                  ></b-form-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <multiselect
                    v-model="selectedStatusTxt"
                    :options="statusList"
                    placeholder="select status pengecekan"
                  >
                  </multiselect>
                </div>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <button
                type="button"
                @click="submitParameterVal()"
                class="btn btn-success"
              >
                Submit
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="isShowDialog = false"
              >
                Close
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="col">
        <router-link class="btn btn-info text-dark" to="/parameter/details">
          <b>Details Parameter</b>
        </router-link>
      </div>
    </div>
    <HeaderParam />
    <ContentLines />
    <!-- <ParameterMenu /> -->
    <!-- <div class="row p-0" v-for="(data, i) in containerDataChart" :key="i">
      <div class="col p-0">
        <line-chart v-if="data.length > 0" :propsCharData="data"></line-chart>
      </div>
    </div>
    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Loading...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import multiselect from "vue-multiselect";
import axios from "axios";
import qs from "qs";

// import ParameterMenu from "@/views/Parameter/components/ParameterMenu";

import formatDate from "@/functions/formatDate";

export default {
  name: "DashboardParam",
  data() {
    return {
      isShowDialog: false,
      isDialogTest: false,
      machineList: [
        {
          id: 0,
          fmc_name: "IMSP-0001",
        },
        {
          id: 1,
          fmc_name: "IMSP-0002",
        },
        {
          id: 2,
          fmc_name: "IMSP-0003",
        },
      ],
      rawMachineList: [],
      rawParamList: [],
      selectedMachine: null,
      selectedStatusTxt: [],
      paramList: ["Please select machine first"],
      statusList: ["OK", "WARNING", "NG"],
      statusIdList: [1, 2, 3],
      selectedIdStatus: null,
      selectedParam: null,
      isLoading: false,
      paramUnit: null,
      valueInput: null,
      selectedIdMc: null,
      selectedIdParam: null,
      containerDataChart: [],
      receiverNo: null,
      msg: null,
      setUpperLimit: null,
      setLowerLimit: null,
      setUnits: null,
      selectedDate: formatDate.YYYYMMDD(new Date()),
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
      this.setUpperLimit = paramSelect.upper_limit;
      this.setLowerLimit = paramSelect.lower_limit;
      this.setUnits = paramSelect.units;
    },
    selectedStatusTxt: function () {
      let idx = this.statusList.indexOf(this.selectedStatusTxt);
      this.selectedIdStatus = this.statusIdList[idx];
    },
  },
  components: {
    multiselect,
    // LineChart: () => import("./components/Chart/LineChart.vue"),
    // ParameterMenu,
    HeaderParam: () => import("./components/HeaderParam.vue"),
    ContentLines: () => import("./components/ContentLines.vue"),
  },
  methods: {
    getMachineParamMan(stateTest = null) {
      axios
        .get(`${process.env.VUE_APP_HOST}/machineParameter`)
        .then((resMachine) => {
          console.log(resMachine);
          this.rawMachineList = resMachine.data.data;
          this.machineList = resMachine.data.data.map((mc) => {
            return mc.mc_name;
          });
          if (stateTest) {
            this.isDialogTest = true;
          } else {
            this.isShowDialog = true;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getParamListMan(mc) {
      axios
        .get(`${process.env.VUE_APP_HOST}/parameterList?mc_name=${mc}`)
        .then((result) => {
          console.log(result);
          this.rawParamList = result.data.data;
          this.selectedIdMc = result.data.data[0].id_machine;
          this.paramList = result.data.data.map((param) => {
            return param.param_name;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async showDialog() {
      this.isLoading = true;
      await this.getMachineParamMan();
    },
    showDialogTest() {
      this.isLoading = true;
      this.getMachineParamMan(true);
    },
    testSubmitParameter() {
      this.isLoading = true;
      let objVal = {
        id_m_machine: this.selectedIdMc,
        id_m_parameter: this.selectedIdParam,
        clock: formatDate.YYYYMMDD_HHMM(new Date()),
        value: this.valueInput,
        upper_limit: this.setUpperLimit,
        lower_limit: this.setLowerLimit,
      };
      console.log(objVal);
      axios
        .post(`${process.env.VUE_APP_HOST}/insertParamManual`, objVal)
        .then((result) => {
          console.log(result);
          // this.isLoading = false;
          this.sendMessage();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    submitParameterVal() {
      this.isLoading = true;
      let objVal = {
        id_m_machine: this.selectedIdMc,
        id_m_parameter: this.selectedIdParam,
        clock: this.selectedDate,
        value: this.valueInput,
        upper_limit: this.setUpperLimit,
        lower_limit: this.setLowerLimit,
        id_m_sev: this.selectedIdStatus,
      };
      console.log(objVal);
      axios
        .post(`${process.env.VUE_APP_HOST}/insertParamManual`, objVal)
        .then((result) => {
          console.log(result);
          this.isLoading = false;
          alert("Success to add parameter");
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    sendMessage() {
      let msg = `*[Warning Parameter Info]*
Mc: ${this.selectedMachine},
Parameter: ${this.selectedParam},
Value: ${this.valueInput} ${this.setUnits},
===================
Upper Limit: ${this.setUpperLimit} ${this.setUnits},
===================
https://smartandonsys.web.app/parameter/history
Please take action! Thank you.`;
      let data = qs.stringify({
        token: "nRRMT4Jomzf5vyn4DU1p4ywDuZ7pdYwDnULfGTlrAsVAMWcpeT",
        number: this.receiverNo,
        message: msg,
      });
      let config = {
        method: "post",
        url: "https://app.ruangwa.id/api/send_express",
        headers: {},
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.isLoading = false;
          this.isDialogTest = false;
          alert("Success to add parameter");
          // alert(JSON.stringify(response.data));
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
          alert(JSON.stringify(error));
        });
    },
    getParamHistory(filterQuery = null) {
      let url = `${process.env.VUE_APP_HOST}/paramHistory`;
      if (filterQuery) {
        url += `${filterQuery}`;
      }
      axios
        .get(url)
        .then((resultParam) => {
          console.log(resultParam);
          if (resultParam.message != "Err") {
            this.containerDataChart.push(resultParam.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // this.getParamHistory(
    //   "?filterQuery=GROUP BY id_mc,id_param ORDER BY clock DESC"
    // );
    // axios
    //   .get(
    //     `${process.env.VUE_APP_HOST}/parameterList?filterQuery=GROUP BY id_machine,id_parameter`
    //   )
    //   .then((result) => {
    //     console.log(result);
    //     result.data.data.forEach((item) => {
    //       this.getParamHistory(
    //         `?filterQuery=WHERE id_param = '${item.id_parameter}' AND id_mc = '${item.id_machine}'`
    //       );
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>