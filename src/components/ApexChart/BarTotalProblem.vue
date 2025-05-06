<template>
  <div id="chart" v-if="series.length > 0">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div class="row">
      <div class="col p-0">
        <table>
          <tr>
            <th
              scope="row"
              style="
                max-width: 25px !important;
                background-color: #028ffb !important;
              "
            >
              Emergency
            </th>
            <td
              v-for="(emergency, i) in dataGraph.containerProbEmergency"
              :key="i"
              style="min-width: 30px"
            >
              {{ emergency }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              style="
                max-width: 25px !important;
                background-color: #feb019 !important;
              "
            >
              Long Time
            </th>
            <td
              v-for="(Ltb, i) in dataGraph.containerProbLtb"
              :key="i"
              style="min-width: 30px"
            >
              {{ Ltb }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              style="
                max-width: 25px !important;
                background-color: #ff4560 !important;
              "
            >
              Problem PIC Produksi
            </th>
            <td
              v-for="(prod, i) in dataGraph.containerProbProd"
              :key="i"
              style="min-width: 30px"
            >
              {{ prod }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              style="
                max-width: 25px !important;
                background-color: #765ed0 !important;
              "
            >
              Problem TPM
            </th>
            <td
              v-for="(Tpm, i) in dataGraph.containerProbTpm"
              :key="i"
              style="min-width: 30px"
            >
              {{ Tpm }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              style="
                max-width: 25px !important;
                background-color: #00ff61 !important;
              "
            >
              Problem Predictive
            </th>
            <td
              v-for="(Trend, i) in dataGraph.containerProbTrend"
              :key="i"
              style="min-width: 30px"
            >
              {{ Trend }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <v-dialog v-model="isShowDialog">
      <v-card class="p-3">
        <!-- <v-card-title class="headline grey lighten-2">
          Input Manual TPM
        </v-card-title> -->
        <!-- <v-card-text> -->
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <!-- <th>No</th> -->
                <!-- <th>Start Date</th> -->
                <th>Line</th>
                <th>Machine</th>
                <th>Problem Desc</th>
                <th>Operator</th>
                <th>Duration</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody v-if="problemDetail.length > 0">
              <tr
                v-for="(item, i) in problemDetail.slice(0, limitProb)"
                :key="i"
              >
                <!-- <td>{{ i + 1 }}</td> -->
                <!-- <td>{{ item.fstart_time.split("T")[0] }}</td> -->
                <td>{{ item.fline }}</td>
                <td>{{ item.fmc_name }}</td>
                <td>{{ item.ferror_name }}</td>
                <td>{{ item.foperator }}</td>
                <td>{{ item.fdur }}</td>
                <td>
                  <router-link :to="`/editProblem?v_=${item.fid}`"
                    >See Details</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- </v-card-text> -->
      </v-card>
    </v-dialog>
    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Loading...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BarTotalProblem",
  data() {
    return {
      limitProb: 0,
      series: [],
      chartOptions: {},
      problemDetail: [],
      isShowDialog: false,
      isLoading: false,
    };
  },
  components: {
    apexchart: () => import("vue-apexcharts"),
  },
  props: {
    dataGraph: Object,
  },
  watch: {
    dataGraph: function () {
      (this.series = [
        {
          name: "Emergency",
          type: "column",
          data: this.dataGraph.containerProbEmergency,
        },
        {
          name: "Longtime Breakdown",
          type: "column",
          data: this.dataGraph.containerProbLtb,
        },
        {
          name: "Problem PIC Produksi",
          type: "column",
          data: this.dataGraph.containerProbProd,
        },
        {
          name: "Problem TPM",
          type: "column",
          data: this.dataGraph.containerProbTpm,
        },
        {
          name: "Problem Predictive",
          type: "column",
          data: this.dataGraph.containerProbTrend,
        },
        {
          name: "N Problem / 1000 Units",
          type: "line",
          data: this.dataGraph.containerNproblem,
        },
      ]),
        (this.chartOptions = {
          chart: {
            type: "line",
            height: 350,
            stacked: true,
            toolbar: {
              show: true,
            },
            zoom: {
              enabled: true,
            },
            events: {
              dataPointSelection: (event, chartContext, config) => {
                console.log(event, chartContext);
                // console.log(
                //   config.w.config.series[config.seriesIndex].data[
                //     config.dataPointIndex
                //   ]
                // );
                let seriesVal =
                  config.w.config.series[config.seriesIndex].data[
                    config.dataPointIndex
                  ];
                this.limitProb = seriesVal;
                this.isLoading = true;
                let labelSelected = this.series[config.seriesIndex].name;
                // console.log(labelSelected);
                // console.log(config.seriesIndex);
                // console.log(config.dataPointIndex);
                let idxMonth = config.dataPointIndex;
                this.getProblemCategory(labelSelected, idxMonth + 1);
                // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
              },
            },
          },
          tooltip: {
            x: {
              format: "dd MMM",
              formatter: undefined,
            },
            y: {
              formatter: (value) => {
                console.log(value);
                return value;
                // if (value > 23 && value <= 35) {
                //   return value + "%";
                // } else {
                //   return value;
                // }
              },
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ["black", "black"],
              fonstSize: "9px",
            },
          },
          colors: ["#028ffb", "#feb019", "#ff4560", "#765ed0", "#00ff61"],
          stroke: {
            show: true,
            curve: "smooth",
            lineCap: "butt",
            colors: undefined,
            width: 2,
            dashArray: 0,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
            },
          },
          markers: {
            size: 5,
            hover: {
              size: 9,
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: "12px",
              },
            },
            categories: this.dataGraph.categories,
            tickPlacement: "on",
          },
          yaxis: [
            {
              title: {
                text: "Frequency",
              },
              min: 0,
              // max: 800,
            },
            {
              show: false,
              opposite: true,
              min: 0,
              // max: 30,
              title: {
                text: "N Problem / 1000 units",
              },
            },
          ],
          legend: {
            position: "bottom",
            offsetY: 10,
          },
          fill: {
            opacity: 1,
          },
        });
    },
  },
  methods: {
    getProblemCategory(category, month) {
      this.isLoading = true;
      let query = "";
      if (month <= 3) {
        month = `YEAR(fstart_time) = 20${month + 18}`;
      } else if (month > 12) {
        month = `YEAR(fstart_time) = 2023 AND MONTH(fstart_time) = ${
          month - 12
        }`;
      } else {
        month = `MONTH(fstart_time) = ${month}`;
      }
      if (category == "Emergency") {
        query += `fdur > 20 AND fdur < 120`;
      } else if (category == "Longtime Breakdown") {
        query += `(fdur >= 120 OR (fline = 'ASSY LINE' AND fdur > 10))`;
      } else {
        query += `fav_categoty LIKE '%${category.split(" ")[2]}%'`;
      }
      query += ` AND ${month}`;
      axios
        .post(`${process.env.VUE_APP_HOST}/problemCategory`, {
          filterQuery: query,
        })
        .then((result) => {
          this.isLoading = false;
          console.log(result);
          this.isShowDialog = true;
          this.problemDetail = result.data.data;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
  mounted() {
    // if (this.dataGraph.length > 0) {
    // setTimeout(() => {
    (this.series = [
      {
        name: "Emergency",
        type: "column",
        data: this.dataGraph.containerProbEmergency,
      },
      {
        name: "Longtime Breakdown",
        type: "column",
        data: this.dataGraph.containerProbLtb,
      },
      {
        name: "Problem PIC Produksi",
        type: "column",
        data: this.dataGraph.containerProbProd,
      },
      {
        name: "Problem TPM",
        type: "column",
        data: this.dataGraph.containerProbTpm,
      },
      {
        name: "Problem Predictive",
        type: "column",
        data: this.dataGraph.containerProbTrend,
      },
      {
        name: "N Problem / 1000 Units",
        type: "line",
        data: this.dataGraph.containerNproblem,
      },
    ]),
      (this.chartOptions = {
        chart: {
          type: "line",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },

          zoom: {
            enabled: true,
          },
          events: {
            dataPointSelection: (event, chartContext, config) => {
              console.log(event, chartContext);
              // console.log(
              //   config.w.config.series[config.seriesIndex].data[
              //     config.dataPointIndex
              //   ]
              // );
              let seriesVal =
                config.w.config.series[config.seriesIndex].data[
                  config.dataPointIndex
                ];
              this.limitProb = seriesVal;
              this.isLoading = true;
              let labelSelected = this.series[config.seriesIndex].name;
              // console.log(labelSelected);
              // console.log(config.seriesIndex);
              // console.log(config.dataPointIndex);
              let idxMonth = config.dataPointIndex;
              this.getProblemCategory(labelSelected, idxMonth + 1);
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            },
          },
        },
        tooltip: {
          x: {
            format: "dd MMM",
            formatter: undefined,
          },
          y: {
            formatter: (value) => {
              console.log(value);
              return value;
              // if (value > 23 && value <= 35) {
              //   return value + "%";
              // } else {
              //   return value;
              // }
            },
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ["black", "black"],
            fonstSize: "9px",
          },
        },
        colors: ["#028ffb", "#feb019", "#ff4560", "#765ed0", "#00ff61"],
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 2,
          dashArray: 0,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        markers: {
          size: 5,
          hover: {
            size: 9,
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
            style: {
              fontSize: "12px",
            },
          },
          categories: this.dataGraph.categories,
          tickPlacement: "on",
        },
        yaxis: [
          {
            title: {
              text: "Frequency",
            },
            min: 0,
            // max: 800,
          },
          {
            show: false,
            opposite: true,
            min: 0,
            // max: 30,
            title: {
              text: "N Problem / 1000 units",
            },
          },
        ],
        legend: {
          position: "bottom",
          offsetY: 10,
        },
        fill: {
          opacity: 1,
        },
      });
    // }, 2000);
    // }
  },
};
</script>