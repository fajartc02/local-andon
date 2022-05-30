<template>
  <div class="row">
    <div class="col-xs-12 col-md-6 justify-content-center">
      <div class="card text-light">
        <div class="card-header bg-primary p-1">
          <b>Total Member Yang sudah memilih thema Bulan Ini</b>
        </div>
        <!-- <h1 class="text-primary">40/40</h1> -->
        <div class="row" v-if="!isLoading">
          <div
            class="col-xs-12 col-md-6"
            v-for="(item, i) in pieDatas"
            :key="i"
          >
            <PieChartFocusTHeme
              :propsLine="item.shift"
              :propsData="item.data"
              :propsCount="item.countMp"
            />
          </div>
        </div>
        <!-- <button class="btn btn-sm btn-outline-primary">Details</button> -->
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="card text-light">
        <div class="card-header bg-success p-1">
          <b>Commulative Problem Close Status</b>
        </div>
        <ColumnChartFt v-if="!isLoading" :propsData="columnDatas" />
        <!-- <button class="btn btn-sm btn-outline-success">Details</button> -->
      </div>
    </div>
    <Loading :propsLoading="isLoading" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CardSummary",
  data() {
    return {
      pieDatas: [
        {
          shift: "RED SHIFT",
          data: [],
          countMp: [],
        },
        {
          shift: "WHITE SHIFT",
          data: [],
          countMp: [],
        },
      ],
      columnDatas: null,
      isLoading: false,
    };
  },
  methods: {
    getMemberSelectedTheme() {
      this.isLoading = true;
      axios
        .get(`${process.env.VUE_APP_HOST}/focusTheme/getMemberSelectedTheme`)
        .then((result) => {
          console.log(result);
          // RED series count [ok,notyet]
          this.pieDatas[0].data = result.data.pieChartDataSeries[0];
          this.pieDatas[1].data = result.data.pieChartDataSeries[1];
          this.pieDatas[0].countMp = result.data.detailMp[0];
          this.pieDatas[1].countMp = result.data.detailMp[1];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getStatusTheme() {
      axios
        .get(`${process.env.VUE_APP_HOST}/focusTheme/getStatusTheme`)
        .then((result) => {
          console.log(result);
          this.columnDatas = result.data;
          console.log(this.columnDatas);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    PieChartFocusTHeme: () =>
      import("@/components/ApexChart/PieChartFocusTheme"),
    ColumnChartFt: () => import("@/components/ApexChart/ColumnChartFt.vue"),
    Loading: () => import("@/components/Loading"),
  },
  mounted() {
    this.getMemberSelectedTheme();
    this.getStatusTheme();
  },
};
</script>