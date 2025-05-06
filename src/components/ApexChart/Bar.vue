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
  components: {
    apexchart: VueApexCharts,
  },
  name: "Bar",
  data() {
    return {
      series: [],
      chartOptions: {},
    };
  },
  props: {
    propsData: Object,
  },
  watch: {
    propsData: {
      handler: async function (val) {
        this.series = val.data;
        this.chartOptions = {
          chart: {
            height: 190,
            type: "bar",
            stacked: true,
          },
          plotOptions: {
            bar: {
              borderRadius: 2,
              columnWidth: "50%",
            },
          },
          dataLabels: {
            enabled: true,
          },
          colors: [
            "#00d8ff",
            "#0026ff",
            "#ff00b6",
            "#00ff2e",
            "#e9ff00",
            "#ff9000",
            "#DC3546",
          ],
          stroke: {
            width: 2,
          },

          grid: {
            row: {
              colors: ["#fff", "#f2f2f2"],
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
            },
            categories: val.labels,
            tickPlacement: "on",
          },
          yaxis: {
            title: {
              text: val.title,
            },
            max: 10,
          },
          // fill: {
          //   type: "gradient",
          //   gradient: {
          //     shade: "light",
          //     type: "horizontal",
          //     shadeIntensity: 0.25,
          //     gradientToColors: undefined,
          //     inverseColors: true,
          //     opacityFrom: 0.85,
          //     opacityTo: 0.85,
          //     stops: [50, 0, 100],
          //   },
          // },
        };
      },
      deep: true,
    },
  },
};
</script>