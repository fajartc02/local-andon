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
                <th style="min-width: 100px">Start Time</th>
                <th style="min-width: 100px">End Time</th>
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
                <td>
                  {{ item.fstart_time }}
                </td>
                <td v-if="item.fend_time">
                  {{ item.fend_time }}
                </td>
                <td v-else>Belum Slesai</td>
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
        // {
        //   name: "Percent Ratio",
        //   type: "line",
        //   data: [
        //     3800, 3420, 3078, 3078, 3078, 3078, 3078, 3078, 3078, 3078, 3078,
        //     3078, 3078, 3078, 3078,
        //   ],
        // },
        {
          name: "Percent Ratio",
          type: "line",
          data: [
            32.55,
            29.06,
            26.25,
            30.5,
            25.9,
            28.3,
            26.9,
            25.4,
            19.8,
            19.7,
            19.5,
            19.3,
            16.3,
            16.1,
            null,
          ],
        },
        {
          name: "Repair",
          type: "column",
          data: [
            3190, 2871, 2583, 3026, 1739, 2986, 2280, 2556, 2090, 2426, 2354,
            1950, 1639, 1439, 1393,
          ],
        },
        {
          name: "Preventive",
          type: "column",
          data: [
            2330, 2510, 2654, 2310, 1815, 2450, 2600, 2710, 2860, 2890, 3100,
            3200, 3224, 2336, 3230,
          ],
        },
        {
          name: "Safety",
          type: "column",
          data: [
            290, 280, 210, 280, 100, 250, 320, 220, 180, 250, 320, 210, 280,
            140, 210,
          ],
        },
        {
          name: "Project",
          type: "column",
          data: [
            280, 260, 260, 260, 110, 500, 280, 450, 250, 480, 600, 512, 480,
            210, 320,
          ],
        },
        {
          name: "Others",
          type: "column",
          data: [
            412, 200, 361, 280, 200, 150, 280, 400, 380, 290, 250, 288, 250,
            160, 160,
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
        plotOptions: {
          bar: {
            borderRadius: 2,
            // columnWidth: "50%",
          },
        },
        dataLabels: {
          enabled: [false, true, true, true, true],
          style: {
            fontSize: "12px",
            colors: ["#000"],
          },
          offsetY: 20,
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
            },
          },
          categories: [
            "2019~2020",
            "2020~2021",
            "2021~2022",
            "Apr '21",
            "May '21",
            "Jun '21",
            "Jul '21",
            "Aug '21",
            "Sept '21",
            "Oct '21",
            "Nov '21",
            "Dec '21",
            "Jan '22",
            "Feb '22",
            "Mar '22",
          ],
          tickPlacement: "on",
        },
        yaxis: [
          {
            show: true,
            opposite: true,
            title: {
              text: "Percent Ratio Problem",
            },
            // max: 50,
          },
          {
            title: {
              text: "Duration (hour)",
            },
            labels: {
              // rotate: -45,
              style: {
                fontSize: "12px",
              },
            },
            show: true,
            // min: 0,
            max: 5000,
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