<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="700"
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
                <th>No</th>
                <th style="min-width: 60px">Line</th>
                <th style="min-width: 80px">Area</th>
                <th>Job Type</th>
                <th style="min-width: 200px">Description</th>
                <th>Operator</th>
                <!-- <th style="min-width: 100px">Start Time</th>
                <th style="min-width: 100px">End Time</th> -->
                <th style="min-width: 100px">Duration</th>
              </tr>
            </thead>
            <tbody v-if="jobDetailData.length > 0">
              <tr v-for="(item, i) in jobDetailData" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ item.fline }}</td>
                <td>{{ item.farea }}</td>
                <td>{{ item.fjob_type }}</td>
                <td>{{ item.fdesc }}</td>
                <td>{{ item.foperator }}</td>
                <!-- <td>
                  {{ item.fstart_time }}
                </td>
                <td v-if="item.fend_time">
                  {{ item.fend_time }}
                </td>
                <td v-else>Belum Slesai</td> -->
                <td>{{ item.fdur }}</td>
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
import VueApexCharts from "vue-apexcharts";
import axios from "axios";
let totalMh1 = 6502;
let totalMh2 = 6121;
let totalMh3 = 6400;

import formatDate from "@/functions/formatDate";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  name: "Bar",
  data() {
    return {
      jobDetailData: [],
      series: [
        {
          name: "Total Man Hour",
          type: "line",
          data: [
            100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
            100, 100,
          ],
        },
        {
          name: "Repair",
          type: "column",
          data: [
            ((3190 / totalMh1) * 100).toFixed(1),
            ((2871 / totalMh2) * 100).toFixed(1),
            (((2583 - 200) / totalMh3) * 100).toFixed(1),
            (((3026 - 600) / totalMh3) * 100).toFixed(1),
            ((3140 / totalMh3) * 100).toFixed(1),
            ((2986 / totalMh3) * 100).toFixed(1),
            ((3080 / totalMh3) * 100).toFixed(1),
            ((2900 / totalMh3) * 100).toFixed(1),
            ((2800 / totalMh3) * 100).toFixed(1),
            ((2626 / totalMh3) * 100).toFixed(1),
            ((2354 / totalMh3) * 100).toFixed(1),
            ((2500 / totalMh3) * 100).toFixed(1),
            ((2300 / totalMh3) * 100).toFixed(1),
            ((2200 / totalMh3) * 100).toFixed(1),
            ((2109 / totalMh3) * 100).toFixed(1),
          ],
        },
        {
          name: "Preventive",
          type: "column",
          data: [
            ((2330 / totalMh1) * 100).toFixed(1),
            ((2510 / totalMh2) * 100).toFixed(1),
            (((2654 + 200) / totalMh3) * 100).toFixed(1),
            (((2310 + 600) / totalMh3) * 100).toFixed(1),
            ((2809 / totalMh3) * 100).toFixed(1),
            ((2800 / totalMh3) * 100).toFixed(1),
            ((2809 / totalMh3) * 100).toFixed(1),
            ((2600 / totalMh3) * 100).toFixed(1),
            ((2600 / totalMh3) * 100).toFixed(1),
            ((2710 / totalMh3) * 100).toFixed(1),
            ((3100 / totalMh3) * 100).toFixed(1),
            ((3250 / totalMh3) * 100).toFixed(1),
            ((3500 / totalMh3) * 100).toFixed(1),
            ((3430 / totalMh3) * 100).toFixed(1),
            ((3230 / totalMh3) * 100).toFixed(1),
          ],
        },
        {
          name: "Safety",
          type: "column",
          data: [
            ((290 / totalMh1) * 100).toFixed(1),
            ((280 / totalMh2) * 100).toFixed(1),
            ((210 / totalMh3) * 100).toFixed(1),
            ((280 / totalMh3) * 100).toFixed(1),
            ((100 / totalMh3) * 100).toFixed(1),
            ((320 / totalMh3) * 100).toFixed(1),
            ((100 / totalMh3) * 100).toFixed(1),
            ((220 / totalMh3) * 100).toFixed(1),
            ((100 / totalMh3) * 100).toFixed(1),
            ((180 / totalMh3) * 100).toFixed(1),
            ((150 / totalMh3) * 100).toFixed(1),
            ((320 / totalMh3) * 100).toFixed(1),
            ((100 / totalMh3) * 100).toFixed(1),
            ((320 / totalMh3) * 100).toFixed(1),
            ((390 / totalMh3) * 100).toFixed(1),
          ],
        },
        {
          name: "Project",
          type: "column",
          data: [
            ((280 / totalMh1) * 100).toFixed(1),
            ((260 / totalMh1) * 100).toFixed(1),
            ((560 / totalMh3) * 100).toFixed(1),
            ((490 / totalMh3) * 100).toFixed(1),
            ((110 / totalMh3) * 100).toFixed(1),
            ((110 / totalMh3) * 100).toFixed(1),
            ((110 / totalMh3) * 100).toFixed(1),
            ((250 / totalMh3) * 100).toFixed(1),
            ((480 / totalMh3) * 100).toFixed(1),
            ((670 / totalMh3) * 100).toFixed(1),
            ((600 / totalMh3) * 100).toFixed(1),
            ((110 / totalMh3) * 100).toFixed(1),
            ((290 / totalMh3) * 100).toFixed(1),
            ((210 / totalMh3) * 100).toFixed(1),
            ((340 / totalMh3) * 100).toFixed(1),
          ],
        },
        {
          name: "Others",
          type: "column",
          data: [
            ((412 / totalMh1) * 100).toFixed(1),
            ((200 / totalMh1) * 100).toFixed(1),
            ((361 / totalMh3) * 100).toFixed(1),
            ((280 / totalMh3) * 100).toFixed(1),
            ((200 / totalMh3) * 100).toFixed(1),
            ((150 / totalMh3) * 100).toFixed(1),
            ((280 / totalMh3) * 100).toFixed(1),
            ((400 / totalMh3) * 100).toFixed(1),
            ((380 / totalMh3) * 100).toFixed(1),
            ((200 / totalMh3) * 100).toFixed(1),
            ((200 / totalMh3) * 100).toFixed(1),
            ((200 / totalMh3) * 100).toFixed(1),
            ((210 / totalMh3) * 100).toFixed(1),
            ((200 / totalMh3) * 100).toFixed(1),
            ((290 / totalMh3) * 100).toFixed(1),
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 550,
          type: "line",
          stacked: true,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              console.log(event, chartContext, config);
              //
              this.isLoading = true;
              let labelSelected = this.series[config.seriesIndex].name;
              console.log(labelSelected);
              console.log(config.seriesIndex);
              axios
                .get(
                  `${process.env.VUE_APP_HOST}/getJobData?filterQuery=WHERE~(fgroup~=~'${labelSelected}'~OR~fjob_type~=~'${labelSelected}')~AND~fend_time~IS~NOT~NULL`
                )
                .then((result) => {
                  this.isLoading = false;
                  this.isShowDialog = true;
                  console.log(result);
                  let formatedDate = result.data.data.map((item) => {
                    console.log(item);
                    let newDateStrFormat = item.fstart_time
                      .split(".")[0]
                      .split("T")
                      .join(" ");
                    let newDateEndFormat = item.fend_time
                      .split(".")[0]
                      .split("T")
                      .join(" ");
                    item.fstart_time =
                      formatDate.YYYYMMDD_HHMM(newDateStrFormat);
                    item.fend_time = formatDate.YYYYMMDD_HHMM(newDateEndFormat);
                    // item.fdur = (Number(item.fdur) / 60).toFixed(1);
                    return item;
                  });
                  this.jobDetailData = formatedDate;
                  console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                });
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            },
          },
        },
        legend: {
          show: false,
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: function (value, ctx) {
              console.log(ctx);
              let arr = [
                [
                  6502, 6121, 6200, 6186, 6186, 6200, 6502, 6121, 6502, 6121,
                  6502, 6186, 6121, 6200, 6186,
                ],
                [
                  3190,
                  2871,
                  2583 - 200,
                  3026 - 600,
                  3140,
                  2986,
                  3080,
                  2900,
                  2800,
                  2626,
                  2354,
                  2500,
                  2300,
                  2200,
                  2109,
                ],
                [
                  2330,
                  2510,
                  2654 + 200,
                  2310 + 600,
                  2809,
                  2800,
                  2809,
                  2600,
                  2600,
                  2710,
                  3100,
                  3250,
                  3500,
                  3430,
                  3230,
                ],
                [
                  290, 280, 210, 280, 100, 320, 100, 220, 100, 180, 150, 320,
                  100, 320, 390,
                ],
                [
                  280, 260, 560, 490, 110, 110, 110, 250, 480, 670, 600, 110,
                  290, 210, 340,
                ],
                [
                  412, 200, 361, 280, 200, 150, 280, 400, 380, 200, 200, 200,
                  210, 200, 290,
                ],
              ];
              console.log(arr[ctx.seriesIndex][ctx.dataPointIndex]);
              return `${value}% (${
                arr[ctx.seriesIndex][ctx.dataPointIndex]
              } MH)`;
            },
            // title: {
            //   formatter: function (
            //     value,
            //     { series, seriesIndex, dataPointIndex, w }
            //   ) {
            //     console.log(seriesIndex);
            //     console.log(w);
            //     console.log(series);
            //     console.log(dataPointIndex);
            //     console.log("====VALUE====");
            //     console.log(series[dataPointIndex][seriesIndex - 1]);
            //     return `${value}`;
            //   },
            // },
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 2,
            // columnWidth: "50%",
          },
        },
        dataLabels: {
          enabled: [false, true, true, true, true],
          style: {
            fontSize: "10px",
            colors: ["#000"],
          },
          textAnchor: "middle",
          offsetX: 0,
          offsetY: 0,
          formatter: function (val, opts) {
            console.log(opts);
            if (val) {
              return `${val}%`;
            } else {
              return "";
            }
          },
        },
        markers: {
          size: 5,
          hover: {
            size: 9,
          },
        },
        colors: [
          "#2c7bf9",
          "#fc3232",
          "#91f7a4",
          "#139102",
          "#96ffeb",
          "#c2eae3",
        ],
        stroke: {
          width: 2,
          show: true,
          curve: "straight",
          dashArray: [5],
        },
        title: {
          text: "Yamazumi Board",
          align: "center",
          style: {
            fontSize: "40px",
          },
        },
        grid: {
          row: {
            colors: ["#fff"],
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
            style: {
              fontSize: "12px",
              cssClass: "apexcharts-xaxis-label",
            },
          },
          categories: [
            "2019~2020",
            "2020~2021",
            "2021~2022",
            ["Apr '21", "(20 Days)"],
            ["May '21", "(18 Days)"],
            ["Jun '21", "(21 Days)"],
            ["Jul '21", "(21 Days)"],
            ["Aug '21", "(22 Days)"],
            ["Sep '21", "(22 Days)"],
            ["Oct '21", "(21 Days)"],
            ["Nov '21", "(22 Days)"],
            ["Des '21", "(22 Days)"],
            ["Jan '22", "(20 Days)"],
            ["Feb '22", "(20 Days)"],
            ["Mar '22", "(20 Days)"],
          ],
          tickPlacement: "on",
        },
        yaxis: [
          {
            title: {
              text: "Man Hour (%)",
            },
            labels: {
              // rotate: -45,
              style: {
                fontSize: "12px",
              },
            },
            show: true,
            // min: 0,
            max: 110,
          },
        ],
      },
      isShowDialog: false,
      isLoading: false,
    };
  },
  props: {
    propsData: Object,
    mapBgCol: Array,
  },
  watch: {
    propsData: {
      handler: async function (val) {
        console.log(val);
      },
      deep: true,
    },
  },
  methods: {
    showDialog() {
      this.isShowDialog = true;
    },
  },
  mounted() {},
};
</script>