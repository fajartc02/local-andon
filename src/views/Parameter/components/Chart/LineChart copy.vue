<template>
  <div id="chart">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
// import formatDate from "@/functions/formatDate";
// import moment from "moment";
export default {
  name: "LineChart",
  data() {
    return {
      series: [],
      chartOptions: null,
    };
  },
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    propsCharData: Array,
  },
  mounted() {
    console.log(this.propsCharData);
    setTimeout(() => {
      let isActionAvail = false;
      let containerColors = [];
      let currentCondMap = this.propsCharData.map((item) => {
        containerColors.push("#19ff30");
        if (item.id_action) {
          isActionAvail = true;
        }
        return item.value;
      });

      let time = this.propsCharData.map((item) => {
        console.log(item.clock);
        // return formatDate.YYYYMMDD(item.clock);
        return new Date(item.clock).getTime();
      });
      this.series.push({
        name: "Current Condition",
        data: currentCondMap,
      });
      if (this.propsCharData[0].upper_limit) {
        let upper_limit = this.propsCharData.map((item) => {
          return item.upper_limit;
        });
        this.series.push({
          name: "Upper Limit",
          data: upper_limit,
        });
      }
      if (this.propsCharData[0].lower_limit) {
        let lower_limit = this.propsCharData.map((item) => {
          return item.lower_limit;
        });
        this.series.push({
          name: "Lower Limit",
          data: lower_limit,
        });
      }
      if (this.propsCharData[0].warning_ll) {
        let warn_lower_limit = this.propsCharData.map((item) => {
          return item.warning_ll;
        });
        this.series.push({
          name: "Warning Low Limit",
          data: warn_lower_limit,
        });
      }
      if (this.propsCharData[0].warning_ul) {
        let warn_upper_limit = this.propsCharData.map((item) => {
          return item.warning_ul;
        });
        this.series.push({
          name: "Warning Up Limit",
          data: warn_upper_limit,
        });
      }
      // let map

      if (isActionAvail) {
        this.chartOptions = {
          chart: {
            type: "line",
            stacked: false,
            height: 350,
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: true,
            },
          },
          labels: time,
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 3,
            colors: ["#19ff30", "#ff411c", "#fff31c", "#ff411c", "#fff31c"],
            strokeColors: "#000000",
          },
          colors: ["#19ff30", "#ff411c", "#fff31c", "#ff411c", "#fff31c"],
          yaxis: {
            labels: {
              style: {
                colors: "#8e8da4",
              },
              offsetX: 0,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          xaxis: {
            type: "datetime",
            labels: {
              datetimeFormatter: {
                year: "yyyy",
                month: "MMM 'yy",
                day: "dd MMM",
                hour: "HH:mm",
              },
            },
            tickPlacement: "on",
          },
          title: {
            text: `Data Record TPM ${this.propsCharData[0].param_name} (${this.propsCharData[0].fmc_name})`,
            align: "left",
            offsetX: 14,
          },
          tooltip: {
            shared: true,
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            offsetX: -10,
          },
          annotations: {
            // yaxis: [
            //   {
            //     y: this.propsCharData[0].upper_limit
            //       ? this.propsCharData[0].upper_limit
            //       : this.propsCharData[0].lower_limit,
            //     y2: this.propsCharData[0].warning_ul
            //       ? this.propsCharData[0].warning_ul
            //       : this.propsCharData[0].warning_ll,
            //     borderColor: "#000",
            //     fillColor: "#FEB019",
            //     opacity: 0.2,
            //     label: {
            //       borderColor: "#333",
            //       style: {
            //         fontSize: "10px",
            //         color: "#333",
            //         // background: "#FEB019",
            //       },
            //       text: "Warning Ranged",
            //     },
            //   },
            // ],
            // xaxis: [
            //   {
            //     x: new Date(this.propsCharData[0].clock).getTime(),
            //     x2: new Date(this.propsCharData[0].clock).getTime(),
            //   },
            // ],
            points: [
              // {
              //   x: new Date("08 Jun 2021").getTime(),
              //   y: 3.2,
              //   marker: {
              //     // size: 8,
              //     // radius: 2,
              //     cssClass: "apexcharts-custom-class",
              //   },
              //   label: {
              //     borderColor: "black",
              //     offsetY: 0,
              //     style: {
              //       color: "#000000",
              //     },

              //     text: "Ganti Bearing",
              //   },
              // },
              {
                x:
                  new Date(this.propsCharData[0].clock).getTime() +
                  1000 * 60 * 60,
                y: this.propsCharData[0].upper_limit,
                marker: {
                  // cssClass: "apexcharts-custom-class",
                  size: 0,
                },
                label: {
                  borderColor: "#000",
                  fillColor: "#FEB019",
                  offsetY: 0,
                  style: {
                    color: "#000000",
                    background: "#fff600",
                  },

                  text: "Warning Ranged",
                },
              },
            ],
          },
        };
      } else {
        this.chartOptions = {
          chart: {
            type: "line",
            stacked: false,
            height: 350,
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
              },
            },
          },
          labels: time,
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 3,
            colors: ["#19ff30", "#ff411c", "#fff31c", "#ff411c", "#fff31c"],
            strokeColors: "#000000",
          },
          colors: ["#19ff30", "#ff411c", "#fff31c", "#ff411c", "#fff31c"],
          yaxis: {
            labels: {
              style: {
                colors: "#8e8da4",
              },
              offsetX: 0,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          xaxis: {
            type: "datetime",
            tickPlacement: "on",
            labels: {
              // datetimeFormatter: {
              //   year: "yyyy",
              //   month: "MMM 'yy",
              //   day: "HH:mm",
              //   hour: "HH:mm",
              // },
              format: "dd/MM HH:mm",
              // formatter: function (value, timestamp) {
              //   return new Date(timestamp); // The formatter function overrides format property
              // },
            },
          },
          title: {
            text: `Data Record TPM ${this.propsCharData[0].param_name} (${this.propsCharData[0].fmc_name})`,
            align: "left",
            offsetX: 14,
          },
          tooltip: {
            shared: true,
            x: {
              format: "dd/MM HH:mm",
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            offsetX: -10,
          },
          annotations: {
            yaxis: [
              {
                y: this.propsCharData[0].upper_limit
                  ? this.propsCharData[0].upper_limit
                  : this.propsCharData[0].lower_limit,
                y2: this.propsCharData[0].warning_ul
                  ? this.propsCharData[0].warning_ul
                  : this.propsCharData[0].warning_ll,
                borderColor: "#000",
                fillColor: "#FEB019",
                opacity: 0.2,
                label: {
                  borderColor: "#333",
                  style: {
                    fontSize: "10px",
                    color: "#333",
                    background: "#FEB019",
                  },
                  text: "Warning Ranged",
                },
              },
            ],
          },
        };
      }
    }, 1000);
  },
};
</script>