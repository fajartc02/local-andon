<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center mt-1">
      <div class="col-xs-12 col-md-6">
        <div class="card">
          <div class="row">
            <div class="col">
              <b>Search</b>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-6">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Start</span>
                </div>
                <input
                  type="date"
                  v-model="selectedStartDate"
                  class="form-control"
                  placeholder="Start Date"
                />
              </div>
            </div>
            <div class="col-6 pl-1">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Finish</span>
                </div>
                <input
                  type="date"
                  class="form-control"
                  v-model="selectedEndDate"
                  placeholder="End Date"
                />
              </div>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-12">
              <button class="btn btn-sm btn-success w-100">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h6>Alarm/Warning Parameter History</h6>
      </div>
    </div>
    <div class="row">
      <div class="col p-0">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Line</th>
                <th>Machine</th>
                <th>Parameter</th>
                <th>Upper Limit</th>
                <th>Lower Limit</th>
                <th>Value</th>
                <th>Status</th>
                <th>Satuan</th>
                <th>Actions</th>
                <th>Grafik</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in containerAlarmData" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ item.clock.split("T")[0] }}</td>
                <td>{{ item.fline }}</td>
                <td>{{ item.fmc_name }}</td>
                <td>{{ item.param_name }}</td>
                <td>{{ item.upper_limit ? item.upper_limit : "tidak ada" }}</td>
                <td>{{ item.lower_limit ? item.lower_limit : "tidak ada" }}</td>
                <td>
                  {{ item.value }}
                </td>
                <td
                  :class="`${
                    item.severity == 'WARNING'
                      ? 'bg-warning'
                      : item.severity == 'NG'
                      ? 'bg-danger'
                      : ''
                  }`"
                >
                  {{ item.severity }}
                </td>
                <td>
                  {{ item.units }}
                </td>
                <td>Ganti Bearing</td>
                <td>
                  <button
                    class="btn btn-primary btn-sm"
                    @click="detailGraph(item.fmc_name, item.param_name)"
                  >
                    See Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <v-dialog v-model="isShowDialog">
      <v-card class="p-0">
        <v-card-title class="headline grey lighten-2">
          Detail Graph
        </v-card-title>

        <v-card-text class="p-1">
          <div class="row">
            <div class="col">
              <line-chart
                v-if="containerDataChart.length > 0"
                :propsCharData="containerDataChart"
              ></line-chart>
            </div>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="closeDialog()"
          >
            Close
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Loading :propsLoading="isLoading" />
  </div>
</template>

<script>
import axios from "axios";
import formatDate from "@/functions/formatDate.js";
export default {
  name: "ParameterHistory",
  data() {
    return {
      selectedStartDate: formatDate.YYYYMMDD(
        new Date(new Date().getFullYear() - 1, 0, 1)
      ),
      selectedEndDate: formatDate.YYYYMMDD(new Date()),
      containerAlarmData: [],
      isLoading: false,
      isShowDialog: false,
      containerDataChart: [],
    };
  },
  methods: {
    getAlarmHistory() {
      this.isLoading = true;
      axios
        .get(
          `${process.env.VUE_APP_HOST}/parameterAlertHistory?startDate=${this.selectedStartDate}&endDate=${this.selectedEndDate}`
        )
        .then((result) => {
          console.log(result);
          this.containerAlarmData = result.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getDataGraph(machine = null, parameter = null) {
      this.isLoading = true;
      this.containerDataChart = [];
      let url = `${process.env.VUE_APP_HOST}/paramHistory`;
      if (machine && parameter) {
        url += `?filterQuery=WHERE fmc_name = '${machine}' AND param_name = '${parameter}'`;
      }
      axios
        .get(url)
        .then(async (resultParam) => {
          console.log(resultParam);
          if (resultParam.message != "Err") {
            this.containerDataChart = resultParam.data.data;
            this.isLoading = false;
            this.isShowDialog = true;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    detailGraph(machine, parameter) {
      this.getDataGraph(machine, parameter);
    },
    closeDialog() {
      this.isShowDialog = false;
      this.containerDataChart = [];
    },
  },
  components: {
    Loading: () => import("@/components/Loading"),
    LineChart: () => import("./components/Chart/LineChart.vue"),
  },
  mounted() {
    this.getAlarmHistory();
  },
};
</script>