<template>
  <div class="container-fluid">
    <HeaderPage title="Dashboard Focus Theme" />
    <!-- SESARCH -->
    <div class="row m-0 p-0">
      <div class="col-12 d-flex justify-content-center px-0" style="z-index: 1">
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
              <div class="col-8 p-0">
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
              </div>
              <div class="col-4 p-0">
                <button
                  class="btn btn-primary p-0 px-3 title-text"
                  @click="searchPareto()"
                >
                  Search <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div class="row m-0 p-0">
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
            </div>
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
    <!-- TEMPORARY BUTTON -->
    <!-- <div class="row m-0 p-0">
      <div class="col-12 p-0 m-0">
        <button
          type="button"
          class="btn btn-outline-warning"
          @click="isOrderFreq = false"
        >
          Duration
        </button>
        <button
          type="button"
          class="btn btn-outline-warning"
          @click="isOrderFreq = true"
        >
          Frequency
        </button>
      </div>
    </div> -->
    <CardSummary />
    <div class="row m-0 p-0" v-if="containerParetoData.length == 7">
      <div
        v-for="(data, i) in containerParetoData"
        :key="i"
        class="col-md-6 col-xs-12 p-0 mt-2 pl-1"
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
  </div>
</template>


<script>
import { ModelSelect } from "vue-search-select";
import formatDate from "@/functions/formatDate";

import BarGraphPareto from "@/components/ApexChart/BarGraphPareto";

import axios from "axios";
export default {
  name: "DashboardFocusTheme",
  data() {
    return {
      selectedStartDate: formatDate.YYYYMMDD(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      ),
      selectedEndDate: formatDate.YYYYMMDD(new Date()),
      selectedEndDateFetch: new Date(),
      selectedStartDateFetch: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ),
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
      isOrderFreq: true,
      isFilterMachine: true,
      containerParetoData: [],
      lineLabel: [],
      isLoading: false,
    };
  },
  components: {
    HeaderPage: () => import("@/components/HeaderPage"),
    ModelSelect,
    BarGraphPareto,
    Loading: () => import("@/components/Loading"),
    CardSummary: () => import("@/components/FocusTheme/CardSummary"),
  },
  methods: {
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
      let url = `${process.env.VUE_APP_HOST}/data/pareto?fline=${line}&fstart_date=${startDate}&fend_date=${endDate}`;
      if (this.isOrderFreq) {
        url += `&isOrderFreq=true`;
      }
      if (this.isFilterMachine) {
        url += `&isMachine=true`;
      }
      axios
        .get(url)
        .then((result) => {
          console.log(result);
          // let idxLine = this.lines.indexOf(line);
          // if (idxLine) {
          // console.log(idx);
          this.containerParetoData.splice(idx, 0, result.data.data);
          this.lineLabel.splice(idx, 0, line);
          if (this.containerParetoData.length == 7) {
            this.isLoading = false;
          }
          // }
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
    },
  },
  mounted() {
    this.lines.forEach((line, idx) => {
      console.log(idx);
      this.getParetoLineMc(line, idx);
    });
  },
};
</script>