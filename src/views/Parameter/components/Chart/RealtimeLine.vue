<template>
  <div id="wrapper">
    <div :id="`chart-line-${idx}`">
      <apexchart
        type="line"
        height="230"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div :id="`chart-line-${idx}`">
      <apexchart
        type="area"
        height="130"
        :options="chartOptionsLine"
        :series="seriesLine"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "RealtimeLine",
  data() {
    return {
      series: [],
      chartOptions: null,

      seriesLine: [],
      chartOptionsLine: null,
    };
  },
  watch: {
    graphData: function () {
      this.updateGraph();
    },
  },
  props: {
    graphData: Object,
    idx: Number,
  },
  methods: {
    updateGraph() {
      this.series = [
        {
          name: this.graphData.param,
          data: this.graphData.data,
        },
      ];
      this.chartOptions = {
        chart: {
          id: `chart${this.idx}`,
          type: "line",
          height: 230,
          toolbar: {
            autoSelected: "pan",
            show: false,
          },
        },
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        title: {
          text: this.graphData.param,
          align: "center",
        },
        colors: ["#0b7f6e"],
        stroke: {
          width: 3,
          curve: "smooth",
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
        },
      };
      this.seriesLine = [
        {
          data: this.graphData.data,
        },
      ];
      this.chartOptionsLine = {
        chart: {
          id: `chart-${this.idx}`,
          height: 130,
          type: "area",
          brush: {
            target: `chart${this.idx}`,
            enabled: true,
          },
          selection: {
            enabled: true,
            xaxis: {
              min: this.graphData.data[this.graphData.data.length - 1][0],
              max: this.graphData.data[0][0],
            },
          },
        },
        colors: ["#008FFB"],
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1,
          },
        },
        xaxis: {
          type: "datetime",
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          tickAmount: 2,
        },
      };
    },
  },
  components: {
    apexchart: VueApexCharts,
  },
  mounted() {
    this.updateGraph();
  },
};
</script>