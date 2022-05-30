<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
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
              <tr v-for="(item, i) in problemDetail" :key="i">
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
      series: [
        {
          name: "Emergency",
          type: "column",
          data: [
            337,
            329,
            228,
            279,
            152,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
        },
        {
          name: "Longtime Breakdown",
          type: "column",
          data: [
            3,
            3,
            7,
            4,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
        },
        {
          name: "Problem PIC Produksi",
          type: "column",
          data: [
            3,
            4,
            8,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
        },
        {
          name: "Problem TPM",
          type: "column",
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
        },
        {
          name: "Problem Predictive",
          type: "column",
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
        },
        {
          name: "N Problem / 1000 Units",
          type: "line",
          data: [
            29,
            29,
            27,
            25,
            13,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
        },
      ],
      chartOptions: {
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
              //
              console.log(config);
              this.isLoading = true;
              let labelSelected = this.series[config.seriesIndex].name;
              console.log(labelSelected);
              console.log(config.seriesIndex);
              console.log(config.dataPointIndex);
              let idxMonth = config.dataPointIndex;
              this.getProblemCategory(labelSelected, idxMonth + 1);
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            },
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ["black", "green"],
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
          categories: [
            "FY 2019/2020",
            "FY 2020/2021",
            "FY 2021/2022",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
          ],
          tickPlacement: "on",
        },
        yaxis: [
          {
            title: {
              text: "Frequency",
            },
            min: 0,
            max: 800,
          },
          {
            show: false,
            opposite: true,
            min: 0,
            max: 30,
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
      },
      problemDetail: [],
      isShowDialog: false,
      isLoading: false,
    };
  },
  components: {
    apexchart: () => import("vue-apexcharts"),
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
};
</script>