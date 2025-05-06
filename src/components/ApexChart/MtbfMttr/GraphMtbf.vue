<template>
  <div>
    <div id="chart">
      <apexchart
        type="bar"
        height="190"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div class="mt-3" v-if="seriesMcs.length > 0">
      <apexchart
        type="bar"
        height="190"
        :options="chartOptionsMc"
        :series="seriesMcs"
      ></apexchart>
    </div>
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "GraphMtbfMttr",
  data() {
    return {
      chartOptions: null,
      chartOptionsMc: null,
      series: [],
      seriesMcs: [],
    };
  },
  components: {
    apexchart: VueApexCharts,
  },
  watch: {
    mtfbMttrData: function () {
      let container = []
      let linesCategories = this.mtfbMttrData.map(line => {
        return line.fline
      })
      let mtbfLines = this.mtfbMttrData.map(line => {
        container.push(850)
        return line.mtbf
      })
      this.series = [
        {
          name: 'MTBF',
          type: "column",
          data: mtbfLines
        },
        {
          name: 'Target',
          type: "line",
          data: container
        }
      ]
      this.chartOptions = {
        chart: {
          height: 190,
          stacked: true,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              console.log(chartContext.w.globals);
              let label = chartContext.w.globals.labels[config.dataPointIndex]
              let machines = this.mtfbMttrData.find(line => line.fline == label)
              // let machines = this.mtfbMttrData[config.seriesIndex].mcs;
              this.getDetail(label, machines.mcs)
            },
          },
          zoom: {
              enabled: false,
          },
        },
        title: {
          text: "MTBF ALL LINES",
          align: "center",
          style: {
            fontSize: "20px",
          },
        },
        dataLabels: {
          style: {
            fontSize: "12px",
            colors: ["#000"],
          },
          background: {
            enabled: true,
            foreColor: '#f6f990',
          },
        },
        markers: {
          size: 5,
          hover: {
            size: 9,
          },
        },
        stroke: {
          width: 2,
          show: true,
          curve: "straight",
        },
        xaxis: {
          categories: linesCategories
        },
        legend: {
            show: false,
        },
      }
    },
  },
  methods: {
    getDetail(line, machines) {
      let categories = machines.map(mc => {
        return mc.fmc_name
      })
      this.seriesMcs = [
        {
          name: 'MTBF',
          type: "column",
          data: machines.map(mc => {
            return mc.mtbf
          })
        }
      ]
      this.chartOptionsMc = {
        chart: {
          height: 190,
          stacked: true,
          zoom: {
              enabled: false,
          },
        },
        title: {
          text: `MTBF by ${line}`,
          align: "center",
          style: {
            fontSize: "20px",
          },
        },
        dataLabels: {
          style: {
            fontSize: "12px",
            colors: ["#000"],
          },
          background: {
            enabled: true,
            foreColor: '#f6f990',
          },
        },
        markers: {
          size: 5,
          hover: {
            size: 9,
          },
        },
        stroke: {
          width: 2,
          show: true,
          curve: "straight",
        },
        xaxis: {
            categories: categories,
            tickPlacement: "on",
        },
        legend: {
            show: false,
        },
      }
    }
  },
  props: {
    mtfbMttrData: Array
  },
  mounted() {
  },
};
</script>