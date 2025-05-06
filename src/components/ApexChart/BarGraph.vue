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
        console.log(val);
        this.series = val.data;
        this.chartOptions = {
          chart: {
            height: 350,
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
            style: {
              colors: ["#000000"],
              fontSize: "9px",
            },
          },
          colors: val.bgCol,
          stroke: {
            width: 2,
          },
          title: {
            text: val.title,
            align: "center",
          },
          grid: {
            row: {
              colors: ["#fff", "#f2f2f2"],
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: "8px",
              },
            },
            categories: val.labels,
            tickPlacement: "on",
          },
          yaxis: {
            title: {
              text: val.yLabel,
            },
          },
        };
      },
      deep: true,
    },
  },
};
</script>