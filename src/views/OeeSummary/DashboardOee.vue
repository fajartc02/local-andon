<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12">
        <h2>Production Efficiency Dashboard</h2>
      </div>
    </div>
    <div class="row m-0 p-0 justify-content-center">
      <div class="col-md-6 col-xs-0 p-0">
        Month:
        <input type="month" class="form-control" v-model="selectedMonth" />
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
    </v-dialog>
    <div v-if="!isLoading && containerData.length > 0">
      <div class="row m-0 p-0">
        <div class="col-md-6 col-xs-0 p-0"></div>
        <div
          class="col-md-6 col-xs-12 p-0 m-0 table-responsive text-left"
          style="padding-left: 100px !important"
        >
          <b>Detail Problems:</b>
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col-md-6 col-xs-0 p-0">
          <button class="btn btn-info btn-sm w-100" @click="showInputOee()">
            <b>Input OEE</b>
          </button>
          <v-dialog v-model="isShowInputOee" persistent width="500">
            <v-card class="p-1">
              <v-card-title class="headline grey lighten-2">
                Input OEE
              </v-card-title>

              <v-card-text class="p-0">
                <div class="container-fluid p-0 mt-4">
                  <div class="row p-0 m-0">
                    <div class="col-6 p-0">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="min-width: 20%"
                            >Date</span
                          >
                        </div>
                        <input
                          class="form-control"
                          type="date"
                          v-model="fdate"
                        />
                      </div>
                    </div>
                    <div class="col-6 p-0">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="min-width: 20%"
                            >Shift</span
                          >
                        </div>
                        <b-form-select
                          size="sm"
                          v-model="fshift"
                          :options="shiftOpts"
                        ></b-form-select>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row p-0 m-0"
                    v-for="(l, j) in lineOptsFix"
                    :key="j"
                  >
                    <div class="col-6 p-0">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="min-width: 20%"
                            >Line</span
                          >
                        </div>
                        <div class="form-control">
                          {{ l.value }}
                        </div>
                        <!-- <b-form-select
                          size="sm"
                          v-model="fline"
                          :options="lineOpts"
                        ></b-form-select> -->
                      </div>
                    </div>
                    <div class="col-6 p-0">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" style="min-width: 20%"
                            >OEE</span
                          >
                        </div>
                        <input
                          class="form-control"
                          type="number"
                          v-model="containerVals[j]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <button
                  type="button"
                  class="btn btn-success"
                  data-dismiss="modal"
                  @click="submitOeeLine()"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="isShowInputOee = false"
                >
                  Close
                </button>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="col-md-6 col-xs-12 p-0 text-right m-0 table-responsive">
          <div
            class="btn-group btn-group-sm bordered"
            role="group"
            aria-label="..."
          >
            <button
              type="button"
              class="btn btn-outline-success"
              @click="switchRealtimePareto('today')"
            >
              Today
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="switchRealtimePareto('yesterday')"
            >
              Yesterday
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="switchRealtimePareto('yesterdayDay')"
            >
              Yesterday Day
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="switchRealtimePareto('yesterdayNight')"
            >
              Yesterday Night
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="switchRealtimePareto('lastmonth')"
            >
              Last Month
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="switchRealtimePareto('thismonth')"
            >
              This Month
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="switchRealtimePareto('lastWeek')"
            >
              Last Week
            </button>
          </div>
        </div>
      </div>
      <div v-for="(item, i) in containerData" :key="i" class="row">
        <div class="col-12 p-0">
          <div class="card">
            <div class="card-header">{{ item.name }}</div>
            <!-- <oee-graph
            :propsDataOee="item.dataOee"
            :propsDataDurProb="item.dataSumDur"
          ></oee-graph> -->
            <oee-graph
              :propsDataOee="item.dataOee"
              :propsLine="item.name"
            ></oee-graph>
            <!-- <div class="card-footer p-0">
            <h6 class="mt-2 card-title">2 Worst Problem</h6>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Date</th>
                    <th>Line</th>
                    <th>Machine</th>
                    <th>Problem</th>
                    <th>Duration (min)</th>
                    <th>Shift</th>
                    <th>See Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(problem, i) in item.dataProblem" :key="i">
                    <td>{{ i }}</td>
                    <td>{{ problem.fstart_time.split("T")[0] }}</td>
                    <td>{{ problem.fline }}</td>
                    <td>{{ problem.fmc_name }}</td>
                    <td>
                      {{ problem.ferror_name }}
                    </td>
                    <td>{{ problem.fdur }}</td>
                    <td>{{ problem.fshift == "r" ? "RED" : "WHITE" }}</td>
                    <td>
                      <button class="btn btn-sm btn-info">See Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4" v-else>
      <div class="col">
        <h3>Data Masih Kosong</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import formatDate from "@/functions/formatDate";
export default {
  name: "DashboardOee",
  data() {
    return {
      containerData: null,
      isShowInputOee: false,
      isLoading: false,
      fdate: formatDate.YYYYMMDD(new Date()),
      fshift: null,
      shiftOpts: [
        { value: null, text: "Select Shift", disabled: true },
        { value: "1", text: "Siang" },
        { value: "2", text: "Malam" },
      ],
      fline: null,
      lineOpts: [
        { value: null, text: "Select Line", disabled: true },
        { value: "LPDC", text: "LPDC" },
        { value: "HPDC", text: "HPDC" },
        { value: "CAM SHAFT", text: "CAM SHAFT" },
        { value: "CRANK SHAFT", text: "CRANK SHAFT" },
        { value: "CYLINDER HEAD", text: "CYLINDER HEAD" },
        { value: "CYLINDER BLOCK", text: "CYLINDER BLOCK" },
        { value: "ASSY LINE", text: "ASSY LINE" },
      ],
      lineOptsFix: [
        { value: "LPDC", text: "LPDC" },
        { value: "HPDC", text: "HPDC" },
        { value: "CAM SHAFT", text: "CAM SHAFT" },
        { value: "CRANK SHAFT", text: "CRANK SHAFT" },
        { value: "CYLINDER HEAD", text: "CYLINDER HEAD" },
        { value: "CYLINDER BLOCK", text: "CYLINDER BLOCK" },
        { value: "ASSY LINE", text: "ASSY LINE" },
      ],
      containerVals: [],
      fvalue1: null,
      fvalue2: null,
      fvalue3: null,
      fvalue4: null,
      fvalue5: null,
      fvalue6: null,
      selectedMonth: formatDate.YYYYMM(new Date()),
    };
  },
  components: {
    OeeGraph: () => import("@/components/ApexChart/OeeGraph"),
  },
  watch: {
    selectedMonth: function () {
      let date =
        new Date().getDate() < 10
          ? `0${new Date().getDate()}`
          : new Date().getDate();
      let selectedDate = `${this.selectedMonth}-${date}`;
      this.getOeeDataHistory(selectedDate);
      console.log(selectedDate);
    },
    containerVals: function () {
      if (`${this.containerVals.join("")}`.includes(",")) {
        alert("Jangan pakai koma(,) bro isi OEE nya, tapi pake titik (.)");
      }
    },
  },
  methods: {
    getOeeDataHistory(date) {
      this.isLoading = true;
      axios
        .get(`${process.env.VUE_APP_HOST}/oeeAllLines?date=${date}`)
        .then((result) => {
          console.log(result);
          this.containerData = result.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.error(err);
          this.isLoading = false;
        });
    },
    switchRealtimePareto(state) {
      this.$router.push(`/realtimePareto?dateState=${state}`);
    },
    showInputOee() {
      this.isShowInputOee = true;
    },
    submitOeeLine() {
      let lengthContainer = this.containerVals.length;
      this.isLoading = true;
      if (this.fshift && lengthContainer == 7) {
        for (let i = 0; i < lengthContainer; i++) {
          const element = this.containerVals[i];
          let newOeeLine = {
            fline: this.lineOptsFix[i].value,
            fdate: this.fdate,
            fshift: this.fshift,
            fvalue: element,
          };
          // let containerLines = [];

          // if (this.fdate && this.fshift) {

          console.log(newOeeLine);
          axios
            .post(`${process.env.VUE_APP_HOST}/insertOee`, newOeeLine)
            .then((result) => {
              console.log(result);
              // this.getOeeDataHistory();
              // this.fline = null;
              // this.fdate = formatDate.YYYYMMDD(new Date());
              // this.fshift = null;
              // this.fvalue = null;
              // this.isShowInputOee = false;
              // this.$route.go();
              // this.containerData = null;
            })
            .catch((err) => {
              this.isLoading = false;
              console.error(err);
            });
          // }
          // else {
          //
          // }
          if (i == 6) {
            this.isLoading = false;

            this.isShowInputOee = false;
            this.containerVals = [];
            this.fshift = null;
            this.$route.go();
          }
        }
      } else {
        alert("Lengkapi input dulu broo..");
        this.isLoading = false;
      }
    },
  },
  mounted() {
    let date =
      new Date().getDate() < 10
        ? `0${new Date().getDate()}`
        : new Date().getDate();
    let selectedDate = `${this.selectedMonth}-${date}`;
    console.log(selectedDate);
    this.getOeeDataHistory(selectedDate);
  },
};
</script>