<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="190"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "GraphCm",
  data() {
    return {
      chartOptions: null,
      series: null,
    };
  },
  props: {
    graphTheme: Array,
  },
  watch: {
    graphTheme: function () {
      let categories = ["LP", "DC", "CRANK", "CAM", "HEAD", "BLOCK", "ASSY"];
      this.chartOptions = {
        chart: {
          height: 190,
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: categories,
          tickPlacement: "on",
        },
      };
      let obj = { name: "Case" };
      let containerRawLines = [0, 0, 0, 0, 0, 0, 0];
      this.graphTheme.forEach((itm) => {
        let idxNoCheck = categories.indexOf(itm.sname);
        containerRawLines.splice(idxNoCheck, 1, itm.total);
      });
      obj.data = containerRawLines;
      this.series = [obj];
    },
  },
  components: {
    apexchart: VueApexCharts,
  },
  mounted() {
    let categories = ["LP", "DC", "CRANK", "CAM", "HEAD", "BLOCK", "ASSY"];
    this.chartOptions = {
      chart: {
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      xaxis: {
        categories: categories,
        tickPlacement: "on",
      },
    };
    let obj = { name: "Case" };
    let containerRawLines = [0, 0, 0, 0, 0, 0, 0];
    this.graphTheme.forEach((itm) => {
      let idxNoCheck = categories.indexOf(itm.sname);
      containerRawLines.splice(idxNoCheck, 1, itm.total);
    });
    obj.data = containerRawLines;
    this.series = [obj];
  },
};
</script>