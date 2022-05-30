<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="180"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <v-dialog v-model="isShowDialog">
      <v-card class="p-1">
        <v-card-title class="headline grey lighten-2">
          Detail Problem
        </v-card-title>

        <v-card-text class="p-1">
          <div class="container-fluid p-1">
            <div class="row">
              <div class="col p-0">
                <table class="table table-sm table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Shift</th>
                      <th>Problem Desc</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(member, i) in detailProblem" :key="i">
                      <td>{{ i + 1 }}</td>
                      <td>
                        {{ member.fname }}
                      </td>
                      <td>
                        {{ member.fshift }}
                      </td>
                      <td>
                        {{ member.problem_theme ? member.problem_theme : "-" }}
                      </td>
                      <td>
                        {{ member.status_theme == 1 ? "OK" : "Not Yet" }}
                      </td>
                      <td v-if="!member.id_problem">-</td>
                      <td v-else>
                        <router-link
                          class="btn btn-sm btn-primary text-light"
                          :to="`/editProblem?v_=${member.id_problem}`"
                        >
                          Detail
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "ColumnChartFt",
  data() {
    return {
      series: null,
      chartOptions: null,
      isShowDialog: false,
      detailProblem: null,
    };
  },
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    propsData: Object,
  },
  mounted() {
    let mapCountOk = this.propsData.dataOk.map((item) => {
      return item.length;
    });
    let mapCountNg = this.propsData.dataNg.map((item) => {
      return item.length;
    });
    this.series = [
      {
        name: "Finished",
        data: mapCountOk,
      },
      {
        name: "Not Yet",
        data: mapCountNg,
      },
    ];
    this.chartOptions = {
      chart: {
        type: "bar",
        height: 180,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(event);
            console.log(chartContext);
            console.log(config.dataPointIndex);
            this.isShowDialog = true;
            this.detailProblem =
              this.propsData[config.seriesIndex == 0 ? "dataOk" : "dataNg"][
                config.dataPointIndex
              ];
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "LPDC",
          "HPDC",
          "CRANK",
          "CAM",
          "HEAD",
          "BLOCK",
          "ASSYLINE",
        ],
      },
      yaxis: {
        title: {
          text: "Total",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " Problem";
          },
        },
      },
    };
  },
};
</script>

<style>
.apexcharts-tooltip {
  background: #f3f3f3;
  color: black;
}
</style>