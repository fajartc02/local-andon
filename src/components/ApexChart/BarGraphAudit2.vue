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
import STATE_JOB from "./job.state";

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
          data: STATE_JOB.thn21.mhData,
        },
        {
          name: "Repair",
          type: "column",
          data: STATE_JOB.thn21.repairData,
        },
        {
          name: "Predictive",
          type: "column",
          data: STATE_JOB.thn21.predicData,
        },
        {
          name: "Preventive",
          type: "column",
          data: STATE_JOB.thn21.prevData,
        },
        {
          name: "Safety",
          type: "column",
          data: STATE_JOB.thn21.safetyData,
        },
        {
          name: "Project",
          type: "column",
          data: STATE_JOB.thn21.projectData,
        },
        {
          name: "Others",
          type: "column",
          data: STATE_JOB.thn21.othersData,
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
              axios
                .get(
                  `${
                    process.env.VUE_APP_HOST
                  }/getJobData?filterQuery=WHERE~(fgroup~=~'${labelSelected}'~OR~fjob_type~=~'${labelSelected}')~AND~fend_time~IS~NOT~NULL~AND~MONTH(fstart_time)~=~${
                    config.dataPointIndex - 8
                  }`
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
                  function shuffleArray(array) {
                    let container = [];
                    for (var i = array.length - 1; i > 0; i--) {
                      var j = Math.floor(Math.random() * (i + 1));
                      var temp = array[i];
                      array[i] = array[j];
                      array[j] = temp;
                      container.push(temp);
                    }
                    return container;
                  }
                  const groupByFjobType = shuffleArray(formatedDate).reduce(
                    (group, product) => {
                      const { fjob_type } = product;
                      group[fjob_type] = group[fjob_type] ?? [];
                      group[fjob_type].push(product);
                      return group;
                    },
                    {}
                  );
                  let containerGroup = [];
                  for (const key in groupByFjobType) {
                    const element = groupByFjobType[key];
                    element.forEach((itm) => {
                      containerGroup.push(itm);
                    });
                  }
                  console.log(containerGroup);
                  this.jobDetailData = containerGroup;
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
              let arr = STATE_JOB.thn21.arrMh;
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
          "#ffff00",
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
          categories: STATE_JOB.thn21.months,
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