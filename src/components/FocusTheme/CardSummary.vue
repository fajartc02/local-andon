<template>
  <div class="row">
    <div class="col-xs-12 col-md-12 justify-content-center">
      <div class="card text-light">
        <div class="card-header bg-primary p-1">
          <b>Total Member Yang sudah memilih thema Bulan Ini</b>
        </div>
        <div class="row" v-if="!isLoading"></div>
      </div>
    </div>
    <!-- <div class="col-xs-12 col-md-6">
      <div class="card text-light">
        <div class="card-header bg-success p-1">
          <b>Commulative Problem Close Status</b>
        </div>
        <ColumnChartFt v-if="!isLoading" :propsData="columnDatas" />
      </div>
    </div> -->
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
          data: [1, 1],
          countMp: [1, 1],
        },
        {
          shift: "WHITE SHIFT",
          data: [1, 1],
          countMp: [1, 1],
        },
      ],
      columnDatas: null,
      isLoading: false,
    };
  },
  methods: {
    getStatusTheme() {
      axios
        .get(`${process.env.VUE_APP_HOST}/focus-theme/getStatusTheme`)
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
    // ColumnChartFt: () => import("@/components/ApexChart/ColumnChartFt.vue"),
    Loading: () => import("@/components/Loading"),
  },
  mounted() {
    this.getStatusTheme();
  },
};
</script>