<template>
  <apexchart
    type="line"
    height="300"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
// import axios from "axios";

// import formatDate from "@/functions/formatDate";
export default {
  name: "OeeGraph",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [],
      chartOptions: {},
      containerDateTime: [],
      targetOee: null,
    };
  },
  methods: {
    generateDateThisMonth() {
      var today = new Date();
      let lastDateIdx = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();
      var firstDayOfMonth =
        new Date(today.getFullYear(), today.getMonth(), 0).getTime() +
        24 * 60 * 60 * 1000;

      let resDataOee = [];
      let resDataTargetOee = [];
      //   let resDataSumDur = [];
      for (let i = 1; i <= lastDateIdx; i++) {
        let d = firstDayOfMonth + 24 * 60 * 60 * 1000 * i;
        // if (i > 1) {
        //   d = firstDayOfMonth + 24 * 60 * 60 * 1000 * i;
        // }
        console.log(new Date(d));
        if (
          this.propsLine.toLowerCase().includes("crank shaft") ||
          this.propsLine.toLowerCase().includes("cam shaft") ||
          this.propsLine.toLowerCase().includes("cylinder head") ||
          this.propsLine.toLowerCase().includes("cylinder block")
        ) {
          this.targetOee = 95;
          resDataTargetOee.push(95);
        } else if (
          this.propsLine.toUpperCase().includes("LPDC") ||
          this.propsLine.toLowerCase().includes("hpdc")
        ) {
          resDataTargetOee.push(90);
          this.targetOee = 90;
        } else {
          resDataTargetOee.push(98);
        }

        resDataOee.push(null);
        // resDataSumDur.push(null);
        this.containerDateTime.push(i);
      }
      for (let j = 0; j < this.propsDataOee.length; j++) {
        let idxDate = this.containerDateTime.indexOf(
          new Date(this.propsDataOee[j].fdate).getDate()
        );
        if (idxDate != -1) {
          resDataOee[idxDate] = +this.propsDataOee[j].favg_oee;
        }
      }
      //   for (let i = 0; i < this.propsDataDurProb.length; i++) {
      //     // const element = array[i];
      //     let idxDate = this.containerDateTime.indexOf(
      //       new Date(this.propsDataDurProb[i].fstart_time).getDate()
      //     );
      //     if (idxDate != -1) {
      //       resDataSumDur[idxDate] = +this.propsDataDurProb[i].fdur;
      //     }
      //   }
      this.series = [
        {
          name: "OEE",
          type: "column",
          data: resDataOee,
        },
        {
          name: "Target OEE",
          type: "line",
          data: resDataTargetOee,
        },
      ];

      //   console.log(new Date(lastDayOfMonth));
      //   console.log(new Date(firstDayOfMonth));
      this.chartOptions = {
        chart: {
          type: "line",
          stacked: true,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              console.log(event, chartContext, config);
              //
              console.log(config);
              let date =
                  config.dataPointIndex + 1 < 10
                    ? `0${config.dataPointIndex + 1}`
                    : config.dataPointIndex + 1,
                // endDate =
                //   config.dataPointIndex + 2 < 10
                //     ? `0${config.dataPointIndex + 2}`
                //     : config.dataPointIndex + 2,
                month =
                  new Date().getMonth() + 1 < 10
                    ? `0${new Date().getMonth() + 1}`
                    : new Date().getMonth() + 1,
                year = new Date().getFullYear();
              let selectedDate = `${year}-${month}-${date} 07:00:00`;
              let selectedEndDate = `${year}-${month}-${date} 06:59:59`;
              console.log(selectedDate);
              this.$router.push(
                `/realtimePareto?dateState=graphSelect&selectedDate=${selectedDate}&selectedEndDate=${selectedEndDate}&selectedLine=${this.propsLine}`
              );
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            },
          },
        },

        labels: this.containerDateTime,
        stroke: {
          width: [0, 4],
          dashArray: [0, 8],
        },
        annotations: {
          points: [
            {
              x: 30,
              y: resDataTargetOee[0],
              marker: {
                // cssClass: "apexcharts-custom-class",
              },
              label: {
                borderColor: "black",
                offsetY: 0,
                style: {
                  color: "#000000",
                },

                text: `Target OEE: ${resDataTargetOee[0]}%`,
              },
            },
          ],
        },
        xaxis: {
          //   type: "datetime",
          labels: {
            show: true,
            rotate: -90,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            style: {
              colors: [],
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              //   fontWeight: 400,
              //   cssClass: "apexcharts-xaxis-label",
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeUTC: true,
            datetimeFormatter: {
              year: "yyyy",
              month: "dd",
              day: "dd",
              hour: "HH:mm",
            },
          },
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [0],
          style: {
            colors: ["#FFF"],
            fontSize: "11px",
          },
          background: {
            enabled: true,
            foreColor: ["#000", "#00e396"],
            borderColor: "#000",
          },
        },

        markers: {
          size: 0,
          hover: {
            size: 8,
          },
        },
        yaxis: [
          {
            title: {
              text: "Eff (%)",
            },
            min: 50,
            max: 120,
            tickAmount: 4,
          },
          //   {
          //     opposite: true,
          //     title: {
          //       text: "Eff (%)",
          //     },
          //     max: 120,
          //     min: 50,
          //     tickAmount: 4,
          //   },
        ],
      };
    },
  },

  props: {
    propsDataOee: Array,
    propsLine: String,
  },
  mounted() {
    this.generateDateThisMonth();
  },
};
</script>