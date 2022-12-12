<template>
  <div id="chart">
    <apexchart
      type="pie"
      width="300"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <v-dialog v-model="isShowDialog">
      <v-card class="p-1">
        <v-card-title class="headline grey lighten-2">
          Detail Member
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
                    <tr v-for="(member, i) in detailMember" :key="i">
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
  name: "PieChartFocusTheme",
  data() {
    return {
      series: null,
      chartOptions: null,
      isShowDialog: false,
      detailMember: null,
    };
  },
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    propsLine: String,
    propsData: Array,
    propsCount: Array,
  },
  mounted() {
    this.series = this.propsData;
    console.log(this.propsCount);
    this.chartOptions = {
      chart: {
        width: 300,
        type: "pie",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(event);
            console.log(chartContext);
            console.log(config.dataPointIndex);
            this.isShowDialog = true;
            this.detailMember = this.propsCount[config.dataPointIndex];
          },
        },
      },
      title: {
        text: this.propsLine,
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000"],
        },
        formatter: (val, opt) => {
          console.log(opt);
          console.log(this.propsCount[opt.seriesIndex]);
          console.log(val);
          return (
            val.toFixed(1) +
            "%" +
            `(${this.propsCount[opt.seriesIndex].length} ${
              opt.seriesIndex == 1 ? "Mp" : "Thema"
            })`
          );
        },
      },
      labels: ["Sudah", "Belum"],
      colors: ["#3aaf47", "#f45353"],
    };
  },
};
</script>