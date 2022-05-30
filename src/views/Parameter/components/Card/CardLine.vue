<template>
  <div class="container-fluid">
    <div class="row border rounded mt-1" style="background-color: #343a40">
      <div class="col pt-0">
        <div class="row mt-2">
          <div class="col p-0 pb-1 text-light">
            <h6 class="m-0">
              <b>{{ propsLine.name }}</b>
            </h6>
          </div>
        </div>
        <div class="row mt-2 p-1">
          <div class="col border rounded mx-1 opa-8 border-success bg-success">
            <h6>Machines Normal</h6>
            <!-- <button
              class="btn btn-sm btn-info"
              @click="getDataGraph(propsLine, 'okMc')"
              disabled
            > -->
            <h5 class="m-0 text-light">{{ propsLine.okCount }}</h5>
            <!-- </button> -->
          </div>
          <div class="col border rounded mx-1 opa-8 border-warning bg-warning">
            <h6>Machines Warning</h6>
            <button
              class="btn btn-sm btn-info"
              :disabled="propsLine.warnCount == 0"
              @click="getDataGraph(propsLine, 'warnMc')"
            >
              <h5 class="m-0">{{ propsLine.warnCount }}</h5>
            </button>
          </div>
          <div class="col border rounded mx-1 opa-8 border-danger bg-danger">
            <h6>Machines Alarm</h6>
            <button
              class="btn btn-sm btn-info"
              :disabled="propsLine.ngCount == 0"
              @click="getDataGraph(propsLine, 'ngMc')"
            >
              <h5 class="m-0">{{ propsLine.ngCount }}</h5>
            </button>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="isShowDialog">
      <v-card class="p-0">
        <v-card-title class="headline grey lighten-2">
          Detail Graph
        </v-card-title>

        <v-card-text class="p-1" v-if="isCompleteRequest">
          <div class="row" v-for="(item, i) in containerDataChart" :key="i">
            <div class="col">
              <line-chart :propsCharData="item"></line-chart>
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
            @click="isShowDialog = false"
          >
            Close
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "CardLine",
  data() {
    return {
      time: "",
      isShowDialog: false,
      isCompleteRequest: false,
      containerDataChart: [],
      isLoading: false,
    };
  },
  methods: {
    updateTime() {
      setInterval(() => {
        this.time = new Date().toLocaleString();
      }, 1000);
    },
    async getDataGraph(line, keyName) {
      console.log(line[keyName]);
      let containerData = line[keyName];
      this.isLoading = true;
      this.containerDataChart = [];
      await containerData.forEach((item) => {
        let filterQuery = "";
        filterQuery = `fmc_name = '${item.mc_name}' AND param_name = '${item.name}'`;
        let url = `${process.env.VUE_APP_HOST}/paramHistory`;
        if (filterQuery) {
          url += `?filterQuery=WHERE ${filterQuery}`;
        }
        axios
          .get(url)
          .then((result) => {
            console.log(result);
            this.containerDataChart.push(result.data.data);
            if (this.containerDataChart.length == containerData.length) {
              this.isShowDialog = true;
              this.isLoading = false;
              this.isCompleteRequest = true;
            }
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
          });
      });
    },
  },
  props: {
    propsLine: Object,
  },
  components: {
    LineChart: () => import("../Chart/LineChart.vue"),
  },
  mounted() {
    this.updateTime();
  },
};
</script>

<style>
.card-hover:active {
  background-color: grey;
}
.card-hover {
  background-color: #14fca3;
}
.opa-8 {
  opacity: 0.9;
}
</style>