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
  components: {
    apexchart: VueApexCharts,
  },
  watch: {
    graphCm: function () {
      let categories = this.graphCm.map((itm) => {
        return itm.line;
      });
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
        legend: {
          show: false,
        },
      };
      let mapTotal = {
        name: "Total",
        data: this.graphCm.map((itm) => {
          return itm.total;
        }),
      };
      let mapClose = {
        name: "Close",
        data: this.graphCm.map((itm) => {
          return itm.totalOk;
        }),
      };
      this.series = [mapTotal, mapClose];
    },
  },
  props: {
    graphCm: Array,
  },
  mounted() {
    let categories = this.graphCm.map((itm) => {
      return itm.line;
    });
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
      legend: {
        show: false,
      },
    };
    let mapTotal = {
      name: "Total",
      data: this.graphCm.map((itm) => {
        return itm.total;
      }),
    };
    let mapClose = {
      name: "Close",
      data: this.graphCm.map((itm) => {
        return itm.totalOk;
      }),
    };
    this.series = [mapTotal, mapClose];
  },
};
</script>