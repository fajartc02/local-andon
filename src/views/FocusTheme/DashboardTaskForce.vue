<template>
  <div class="container-fluid">
    <HeaderPage title="Dashboard Taskforce Thema" />
    <!-- SEARCH -->
    <div class="row m-0 p-0">
      <div class="col-12 px-0" style="z-index: 1">
        <div id="content-search" class="card shadow">
          <div class="card-header title-text p-0 px-2 text-left">Search</div>
          <div class="card-body px-1 py-1">
            <div class="row m-0">
              <div class="col-6 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Start</span
                    >
                  </div>
                  <input
                    type="date"
                    v-model="selectedStartDate"
                    class="form-control"
                    placeholder="Start Date"
                  />
                </div>
              </div>
              <div class="col-6 p-0 pl-1">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Finish</span
                    >
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
            <div class="row m-0 p-0">
              <!-- <div class="col-8 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >AV Category</span
                    >
                  </div>
                  <model-select
                    :options="avCategories"
                    v-model="selectedCategory"
                    placeholder="select Category"
                    style="width: 60%; font-size: 10px; color: black"
                  >
                  </model-select>
                </div>
              </div> -->
              <div class="col-12 p-0">
                <button
                  class="btn btn-primary p-0 px-3 title-text w-100"
                  @click="searchPareto()"
                >
                  Search <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
            <!-- <div class="row m-0 p-0">
              <div class="col-12 p-0 table-responsive">
                <div
                  class="btn-group btn-group-sm bordered"
                  role="group"
                  aria-label="..."
                >
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('today')"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('yesterday')"
                  >
                    Yesterday
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('yesterdayDay')"
                  >
                    Yesterday Day
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('yesterdayNight')"
                  >
                    Yesterday Night
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('lastmonth')"
                  >
                    Last Month
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('thismonth')"
                  >
                    This Month
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="switchDate('lastWeek')"
                  >
                    Last Week
                  </button>
                </div>
              </div>
            </div> -->
          </div>
          <!-- BTN SEARCH -->
          <!-- <div
              class="card bg-primary shadow"
              id="btn-search-toggle"
              @click="showSearch()"
              style="
                position: absolute;
                width: 20px;
                height: 20px;
                bottom: -10px;
                left: 50%;
              "
            >
              <i class="fa fa-search"></i>
            </div> -->
        </div>
      </div>
    </div>
    <div class="row m-0 p-0">
      <div class="col-xs-12 col-md-6 p-0">
        <div class="card bg-light">
          <div class="card-header p-1">
            <b>Taskforce By Lines</b>
          </div>
          <div class="card-body p-1 text-dark">
            <GraphTheme v-if="graphTheme" :graphTheme="graphTheme" />
            <!-- <b style="font-size: 30px" @click="getFocusTheme()">{{
              countStatusFinished
            }}</b>
            Problem -->
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6 p-0">
        <div class="card bg-light">
          <div class="card-header p-1">
            <b>Status Countermeasure</b>
          </div>
          <div class="card-body p-1 text-dark">
            <GraphCm v-if="graphCm" :graphCm="graphCm" />
            <!-- <b @click="statusMemberNotyet()" style="font-size: 30px">{{
              countStatusNotyet
            }}</b>
            Problem -->
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0 p-0" v-if="containerParetoData.length == 7">
      <div
        v-for="(data, i) in containerParetoData"
        :key="i"
        class="col-md-12 col-xs-12 p-0 mt-2 pl-1"
      >
        <div class="card">
          <div class="card-header p-0 m-0">{{ lineLabel[i] }}</div>
          <!-- {{ data }} -->
          <BarGraphPareto
            :propsData="data"
            v-if="data.length > 0"
            :propsLine="lineLabel[i]"
            :propsStartDate="selectedStartDate"
            :propsEndDate="selectedEndDate"
            :propsIsOrderFreq="isOrderFreq"
          />
          <div v-else>Tidak Ada Problem</div>
        </div>
        <!-- <div class="card" v-else>
          <div class="card-header p-0 m-0">{{ lines[i] }}</div>
          Tidak Ada Problem
        </div> -->
      </div>
    </div>
    <Loading :propsLoading="isLoading" />
    <v-dialog v-model="modalShow" class="p-1" persistent>
      <v-card class="p-1">
        <v-card-title class="headline grey lighten-2">
          {{ labelCard }}
        </v-card-title>
        <v-card-body>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Line</th>
                <th>Machine</th>
                <th>Problem</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, idx) in containerTFData">
                <tr :key="item.id">
                  <td>{{ idx + 1 }}</td>
                  <td>
                    {{ item.fline }}
                  </td>
                  <td>{{ item.fmc_name }}</td>
                  <td>{{ item.ferror_name }}</td>
                  <td>
                    <router-link
                      :to="`/editProblem?v_=${item.fid}`"
                      class="btn btn-sm btn-primary text-light"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </v-card-body>
        <b-button
          class="mx-2 mt-3"
          size="sm"
          variant="danger"
          @click="modalShow = false"
          >Close</b-button
        >
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
// import { ModelSelect } from "vue-search-select";
import formatDate from "@/functions/formatDate";

import BarGraphPareto from "@/components/ApexChart/BarGraphPareto";

import axios from "axios";
export default {
  name: "DashboardTaskForce",
  data() {
    return {
      selectedStartDate: formatDate.YYYYMMDD(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      ),
      selectedEndDate: formatDate.YYYYMMDD(new Date()),
      startDateFT: new Date(),
      endDateFT: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      tempResult: [],
      lines: [
        "LPDC",
        "HPDC",
        "CAM SHAFT",
        "CYLINDER HEAD",
        "CYLINDER BLOCK",
        "CRANK SHAFT",
        "ASSY LINE",
      ],
      avCategories: [
        { value: "MESIN", text: "MESIN" },
        { value: "DIES", text: "DIES" },
        { value: "TOOL", text: "TOOL" },
        { value: "COOLANT", text: "COOLANT" },
        { value: "PRODUKSI", text: "PIC PRODUKSI" },
        { value: "PROBLEM TPM", text: "PROBLEM TPM" },
        { value: "PROBLEM PREDICTIVE", text: "PROBLEM PREDICTIVE" },
        // { value: "TOOL CHANGE", text: "TOOL CHANGE" },
        // { value: "FUTAI", text: "FUTAI" },
        // { value: "POWER/ANGIN", text: "POWER/ANGIN" },
        // { value: "NES", text: "NES" },
        // { value: "PALLETE", text: "PALLETE" },
        // { value: "OTHER", text: "OTHER" },
      ],
      selectedCategory: null,
      isOrderFreq: false,
      isFilterMachine: true,
      containerParetoData: [],
      lineLabel: [],
      isLoading: false,
      countStatusFinished: null,
      countStatusNotyet: null,
      modalShow: false,
      containerTFData: null,
      containerExMember: [],
      labelCard: "",
      graphTheme: null,
      graphCm: null,
    };
  },
  components: {
    HeaderPage: () => import("@/components/HeaderPage"),
    // ModelSelect,
    BarGraphPareto,
    Loading: () => import("@/components/Loading"),
    GraphTheme: () => import("@/components/ApexChart/Taskforce/GraphTheme"),
    GraphCm: () => import("@/components/ApexChart/Taskforce/GraphCm"),
    // CardSummary: () => import("@/components/FocusTheme/CardSummary"),
  },
  methods: {
    getLastMonth() {
      let year = new Date().getFullYear();
      let month =
        new Date().getMonth() - 1 == -1 ? 11 : new Date().getMonth() - 1;
      if (new Date().getMonth() - 1 == -1) {
        year = new Date(year) - 1;
      }
      let lastDateOfMonth = new Date(year, month + 1, 0);
      let firstDateOfMonth = new Date(year, month, 1);
      this.selectedStartDate = this.formatDate(firstDateOfMonth);
      this.selectedEndDate = this.formatDate(lastDateOfMonth);
    },
    getParetoLineMc(line, idx) {
      this.containerParetoData = [];
      this.isLoading = true;
      this.lineLabel = [];
      let startDate;
      let endDate;
      if (!startDate) {
        // this.selectedStartDate += " 06:00:00";
        startDate = this.selectedStartDate + " 07:00:00";
      }
      if (!endDate) {
        let d = new Date(this.selectedEndDate);
        // console.log(d);
        let offsetTimeEndDate = d.setDate(d.getDate() + 1);
        // console.log(offsetTimeEndDate);
        let offsetEndDate = formatDate.YYYYMMDD(new Date(offsetTimeEndDate));
        // console.log(offsetEndDate);
        endDate = offsetEndDate + " 06:59:59";
      }
      let url = `${process.env.VUE_APP_HOST}/focus-theme/data/pareto?fline=${line}&fstart_date=${startDate}&fend_date=${endDate}&isNoLimit=true`;
      if (this.isOrderFreq) {
        url += `&isOrderFreq=true`;
      }
      if (this.isFilterMachine) {
        url += `&isMachine=true`;
      }
      axios
        .get(url)
        .then((result) => {
          this.containerParetoData.splice(idx, 0, result.data.data);
          this.lineLabel.splice(idx, 0, line);
          if (this.containerParetoData.length == 7) {
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    searchPareto() {
      this.lines.forEach((line, idx) => {
        console.log(idx);
        this.getParetoLineMc(line, idx);
      });
      this.graphCountTF();
      this.graphCountCm();
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    countTaskForce() {
      axios
        .get(
          `${process.env.VUE_APP_HOST}/focus-theme/countTaskForce?start_time=${this.selectedStartDate}&end_time=${this.selectedEndDate}`
        )
        .then((result) => {
          console.log(result);
          this.countStatusFinished = result.data.data.count_member_finished;
          this.countStatusNotyet = result.data.data.count_member_notyet;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFocusTheme() {
      this.isLoading = true;
      this.labelCard = "Problem Taskforce";
      axios
        .get(
          `${process.env.VUE_APP_HOST}/focus-theme/detailTaskforce?start_time=${this.selectedStartDate}&end_time=${this.selectedEndDate}`
        )
        .then((result) => {
          this.isLoading = false;
          this.modalShow = true;
          this.containerTFData = result.data.data;
          this.containerExMember = result.data.data.map((item) => {
            return item.id_m_member;
          });
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    statusMemberNotyet() {
      this.isLoading = true;
      this.labelCard = "Problem Belum Taskforce";
      axios
        .get(
          `${process.env.VUE_APP_HOST}/focus-theme/notyetTaskforce?start_time=${this.selectedStartDate}&end_time=${this.selectedEndDate}`
        )
        .then((result) => {
          console.log(result);
          this.isLoading = false;
          this.modalShow = true;
          this.containerTFData = result.data.data;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    graphCountTF() {
      axios
        .get(
          `${process.env.VUE_APP_HOST}/focus-theme/graph/taskforce?start_time=${this.selectedStartDate}&end_time=${this.selectedEndDate}`
        )
        .then((result) => {
          console.log(result);
          this.graphTheme = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    graphCountCm() {
      axios
        .get(
          `${process.env.VUE_APP_HOST}/focus-theme/graph/taskforce/countermeasure?start_time=${this.selectedStartDate}&end_time=${this.selectedEndDate}`
        )
        .then((result) => {
          console.log(result);
          this.graphCm = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getLastMonth();
    this.lines.forEach((line, idx) => {
      console.log(idx);
      this.getParetoLineMc(line, idx);
    });
    this.graphCountTF();
    this.graphCountCm();
  },
};
</script>