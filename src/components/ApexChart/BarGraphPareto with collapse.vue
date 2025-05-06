<template>
  <div id="chart">
    <h6 class="mt-2 mb-0">Pareto Machines</h6>
    <apexchart
      type="bar"
      height="190"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <b-button
      variant="secondary"
      v-if="visibleColapse"
      @click="visibleColapse = false"
      >Close Detail</b-button
    >
    <b-collapse v-model="visibleColapse" class="mt-2">
      <div class="card">
        <h6 class="my-2">Pareto Problems</h6>
        <apexchart
          type="bar"
          height="190"
          :options="chartOptionsProblem"
          :series="seriesProblem"
        ></apexchart>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import formatDate from "@/functions/formatDate";
import axios from "axios";
export default {
  name: "BarGraphPareto",
  data() {
    return {
      visibleColapse: false,
      stateData: null,
      series: [],
      timeOutActive: false,
      chartOptions: null,
      seriesProblem: [],
      chartOptionsProblem: null,
      mcPareto: [],
      selectedMc: null,
      selectedStartDate: formatDate.YYYYMMDD(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      ),
      selectedEndDate: formatDate.YYYYMMDD(new Date()),
      isOrderFreq: false,
      clickedProblem: null,
    };
  },
  watch: {
    propsStartDate: function () {
      this.selectedStartDate = this.propsStartDate;
    },
    propsEndDate: function () {
      this.selectedEndDate = this.propsEndDate;
    },
    propsIsOrderFreq: function () {
      this.isOrderFreq = this.propsIsOrderFreq;
    },
    propsData: function () {
      var durProblemData = [0];
      var mcProblemData = ["tidak ada problem"];
      if (this.propsData.length > 0) {
        durProblemData = this.propsData.map((item) => {
          if (item.fdur) {
            return +item.fdur;
          } else {
            return 0;
          }
        });
        console.log(durProblemData);

        console.log(durProblemData);
        mcProblemData = this.propsData.map((item) => {
          if (item.fmc_name) {
            this.mcPareto.push(item.fmc_name);
            return item.fmc_name.slice(0, 10);
          } else {
            return "";
          }
        });
        if (durProblemData.length <= 5) {
          let difLength = (durProblemData.length - 5) * -1;
          for (let i = 0; i < difLength; i++) {
            durProblemData.push(0);
            mcProblemData.push("");
          }
        }
      }
      console.log(durProblemData);
      this.series.push({
        name: this.isOrderFreq ? "Freq" : "Frequency",
        data: durProblemData,
      });
      this.chartOptions = {
        chart: {
          height: 350,
          type: "bar",
          events: {
            dataPointSelection: (event, chartContext, config) => {
              console.log(event);
              console.log(chartContext);
              console.log(config.dataPointIndex);
              this.stateData = config.dataPointIndex;
              this.selectedMc = this.mcPareto[this.stateData];
              this.visibleColapse = true;
              this.getParetoData();
              if (!this.timeOutActive) {
                this.timeOutActive = true;
                setTimeout(() => {
                  this.visibleColapse = false;
                  this.timeOutActive = false;
                }, 60000);
              }
            },
          },
        },
        dataLabels: {
          background: {
            enabled: true,
            foreColor: "#000",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: "#000",
              opacity: 0.45,
            },
          },
        },
        colors: [
          "#ff2828",
          "#28a9ff",
          "#28a9ff",
          "#28a9ff",
          "#28a9ff",
          "#28a9ff",
        ],
        plotOptions: {
          bar: {
            distributed: true,
          },
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: mcProblemData,
        },
        yaxis: {
          title: {
            text: this.isOrderFreq ? "Total (x)" : "Min",
          },
        },
      };
    },
  },
  methods: {
    getParetoData() {
      let startDate;
      let endDate;
      if (!startDate) {
        // this.selectedStartDate += " 06:00:00";
        startDate = this.selectedStartDate + " 07:00:00";
      }
      if (!endDate) {
        let d = new Date(this.selectedEndDate);
        let offsetTimeEndDate = d.setDate(d.getDate() + 1);
        let offsetEndDate = formatDate.YYYYMMDD(new Date(offsetTimeEndDate));
        endDate = offsetEndDate + " 06:59:59";
      }
      let url = `${process.env.VUE_APP_HOST}/focus-theme/data/pareto?fline=${this.propsLine}&fstart_date=${startDate}&fend_date=${endDate}&fmc_name=${this.selectedMc}&isNoLimit=true`;
      if (this.isOrderFreq) {
        url += `&isOrderFreq=true`;
      }
      axios
        .get(url)
        .then((result) => {
          console.log(result);
          let mapDurProblem = [];
          let mapNameProblem = [];
          mapDurProblem = result.data.data.map((item) => {
            return item.fdur;
          });
          mapNameProblem = result.data.data.map((item) => {
            return item.ferror_name;
          });
          var themaMemberName;
          themaMemberName = result.data.data.map((item) => {
            return axios
              .get(`${process.env.VUE_APP_HOST}/focus-theme/check/${item.fid}`)
              .then((result) => {
                console.log(result);
                let data = result.data.data[0];
                if (data) {
                  console.log(data);
                  return {
                    x: data.problem_name,
                    seriesIndex: 0,
                    y: 0,
                    marker: {
                      // size: 8,
                      // radius: 2,
                      cssClass: "apexcharts-custom-class",
                    },
                    label: {
                      borderColor: "black",
                      offsetY: 0,
                      style: {
                        color: "#000000",
                      },
                      text: `${
                        data.problem_name.includes("[TASKFORCE]")
                          ? `${data.member_name} [${data.member_shift}] [TASKFORCE]`
                          : `${data.member_name} [${data.member_shift}]`
                      }`,
                      // item.fname_theme_member
                    },
                  };
                } else {
                  if (data.problem_name.includes("[TASKFORCE]")) {
                    return {
                      x: data.problem_name,
                      seriesIndex: 0,
                      y: 0,
                      marker: {
                        // size: 8,
                        // radius: 2,
                        cssClass: "apexcharts-custom-class",
                      },
                      label: {
                        borderColor: "black",
                        offsetY: 0,
                        style: {
                          color: "#000000",
                        },
                        text: `[TASKFORCE]`,
                        // item.fname_theme_member
                      },
                    };
                  }
                  return null;
                }
              })
              .catch((err) => {
                console.log(err);
                if (item.ferror_name.includes("[TASKFORCE]")) {
                  return {
                    x: item.ferror_name,
                    seriesIndex: 0,
                    y: 0,
                    marker: {
                      // size: 8,
                      // radius: 2,
                      cssClass: "apexcharts-custom-class",
                    },
                    label: {
                      borderColor: "black",
                      offsetY: 0,
                      style: {
                        color: "#000000",
                      },
                      text: `THEMA TASKFORCE`,
                      // item.fname_theme_member
                    },
                  };
                }
              });
          });

          Promise.all(themaMemberName).then((resPromise) => {
            console.log(resPromise);
            this.seriesProblem = [
              {
                name: this.isOrderFreq ? "Freq" : "Frequency",
                data: mapDurProblem,
              },
            ];
            this.chartOptionsProblem = {
              chart: {
                height: 350,
                type: "bar",
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    console.log(event);
                    console.log(chartContext);
                    console.log(config.dataPointIndex);
                    console.log(result.data.data[config.dataPointIndex]);
                    this.stateData = config.dataPointIndex;
                    // this.visibleColapse = true;
                    let idProblem = result.data.data[config.dataPointIndex].fid;
                    this.$router.push(`/editProblem?v_=${idProblem}`);
                    // if (!this.timeOutActive) {
                    //   this.timeOutActive = true;
                    //   setTimeout(() => {
                    //     this.visibleColapse = false;
                    //     this.timeOutActive = false;
                    //   }, 60000);
                    // }
                  },
                },
              },
              annotations: {
                points: resPromise,
              },
              dataLabels: {
                formatter: function (val, opts) {
                  console.log(opts);
                  if (val > 0) {
                    return val;
                  } else {
                    return "";
                  }
                },
                background: {
                  enabled: true,
                  foreColor: "#000",
                  padding: 4,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#fff",
                  opacity: 0.9,
                  dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: "#000",
                    opacity: 0.45,
                  },
                },
              },
              colors: [
                "#ff2828",
                "#6b6767",
                "#6b6767",
                "#6b6767",
                "#6b6767",
                "#6b6767",
              ],
              plotOptions: {
                bar: {
                  distributed: true,
                },
              },
              legend: {
                show: false,
              },
              xaxis: {
                categories: mapNameProblem,
                labels: {
                  formatter: function (value) {
                    return value;
                  },
                },
                tickPlacement: "on",
              },
              yaxis: {
                title: {
                  text: this.isOrderFreq ? "Freq (x)" : "Duration (min)",
                },
              },
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  props: {
    propsData: Array,
    propsLine: String,
    propsStartDate: String,
    propsEndDate: String,
    propsIsOrderFreq: Boolean,
  },
  components: {
    apexchart: VueApexCharts,
  },
  mounted() {
    var durProblemData = [0];
    this.selectedStartDate = this.propsStartDate;
    this.selectedEndDate = this.propsEndDate;

    var mcProblemData = ["tidak ada problem"];
    if (this.propsData.length > 0) {
      durProblemData = this.propsData.map((item) => {
        if (item.fdur) {
          return +item.fdur;
        } else {
          return 0;
        }
      });
      var idProbMember;
      idProbMember = this.propsData.map((item) => {
        if (item.id_m_problem_member) {
          return {
            x: item.fmc_name,
            seriesIndex: 0,
            y: +item.fdur,
            marker: {
              // size: 8,
              // radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "black",
              offsetY: 0,
              style: {
                color: "#000000",
              },

              text: "Ada thema",
            },
          };
        } else {
          return {};
        }
      });
      mcProblemData = this.propsData.map((item) => {
        if (item.fmc_name) {
          this.mcPareto.push(item.fmc_name);
          return item.fmc_name.slice(0, 10);
        } else {
          return "";
        }
      });
      console.log(durProblemData);
      if (durProblemData.length <= 5) {
        let difLength = (durProblemData.length - 5) * -1;
        for (let i = 0; i < difLength; i++) {
          durProblemData.push(0);
          mcProblemData.push("");
        }
      }
    }
    console.log(durProblemData);
    this.series.push({
      name: "Frequency",
      data: durProblemData,
    });
    this.chartOptions = {
      chart: {
        height: 350,
        zoom: {
          enabled: true,
        },
        type: "bar",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(event);
            console.log(chartContext);
            console.log(config.dataPointIndex);
            this.stateData = config.dataPointIndex;
            this.selectedMc = this.mcPareto[this.stateData];
            this.visibleColapse = true;
            this.getParetoData();
            if (!this.timeOutActive) {
              this.timeOutActive = true;
              setTimeout(() => {
                this.visibleColapse = false;
                this.timeOutActive = false;
              }, 60000);
            }
          },
        },
      },
      dataLabels: {
        background: {
          enabled: true,
          foreColor: "#000",
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#fff",
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45,
          },
        },
      },
      colors: [
        "#ff2828",
        "#28a9ff",
        "#28a9ff",
        "#28a9ff",
        "#28a9ff",
        "#28a9ff",
      ],
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: mcProblemData,
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: this.isOrderFreq ? "Freq (x)" : "Duration (min)",
        },
      },
    };
    this.chartOptions.annotations = {
      points: idProbMember,
    };
  },
};
</script>