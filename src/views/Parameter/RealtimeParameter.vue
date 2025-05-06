<template>
  <div>
    <HeaderPage title="Realtime Graph Parameters" />
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
                      >Machine</span
                    >
                  </div>
                  <input
                    type="text"
                    value="IKDM-102"
                    class="form-control"
                    disabled
                  />
                </div>
              </div>
              <div class="col-6 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Parameters</span
                    >
                  </div>
                  <input
                    type="text"
                    value="All"
                    class="form-control"
                    disabled
                  />
                </div>
              </div>
            </div>
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
              <div class="col-12 p-0">
                <button
                  class="btn btn-primary p-0 px-3 title-text w-100"
                  @click="searchPareto()"
                >
                  Search <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {{ time }}
    <div class="row">
      <div class="col-6" v-for="(item, i) in containerData" :key="i">
        <div class="card">
          <RealtimeLine :graphData="item" :idx="i" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import RealtimeLine from "./components/Chart/RealtimeLine.vue";
import formatDate from "@/functions/formatDate";
import axios from "axios";

export default {
  name: "RealtimeParameter",
  data() {
    return {
      selectedStartDate: formatDate.YYYYMMDD(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 1
        )
      ),
      selectedEndDate: formatDate.YYYYMMDD(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1
        )
      ),
      containerData: null,
      time: new Date().toLocaleString(),
    };
  },
  methods: {
    getParamsHistory() {
      axios
        .get(
          `http://192.168.1.96:3030/parameter/history?start_date=${this.selectedStartDate}&end_date=${this.selectedEndDate}`
        )
        .then((result) => {
          // console.log(result.data.data);
          this.containerData = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    RealtimeLine,
    HeaderPage: () => import("@/components/HeaderPage"),
  },
  mounted() {
    this.getParamsHistory();
    setInterval(() => {
      this.getParamsHistory();
    }, 10000);
    setInterval(() => {
      this.time = new Date().toLocaleString();
    }, 1000);
  },
};
</script>