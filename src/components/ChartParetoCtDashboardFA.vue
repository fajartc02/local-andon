<template>
  <div>
    <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";
// import axios from "axios";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      datacollection: [],
      options: {},
      labels: [],
      dataDur: [],
      machineSelected: "",
      label: "",
      bgColor: ["#00b6ff", "#00b6ff", "#00b6ff", "#00b6ff", "#00b6ff"],
      limitValue: [],
      containerMachines: [],
    };
  },
  computed: {
    ...mapState(["stateGraphClick"]),
  },
  watch: {
    datacollection: function () {
      //   console.log("dataCollectionChanges");
    },
    labels: function () {
      this.fillData();
    },
    dataDur: function () {},
    machineSelected: function () {
      this.getDetailsProblem(this.machineSelected);
    },
    stateGraphClick: function () {
      // this.dialog = true;
      this.containerProblem = this.stateGraphClick;
      this.isLoading = false;
      console.log(this.stateGraphClick);
    },
    propsChartData: function () {
      console.log(this.propsChartData);
      if (this.propsChartData.length > 0) {
        let mapMc = this.propsChartData.map((mc) => {
          return mc.fMachine;
        });
        let mapBgColor = this.propsChartData.map(() => {
          return "#3758dd";
        });
        let mapValCt = this.propsChartData.map((mc) => {
          if (mc) {
            if (
              Number(mc.fcycleTime) / 10 > 50 &&
              Number(mc.fcycleTime) / 10 < 96
            ) {
              return Number(mc.fcycleTime) / 10;
            } else {
              return 89;
            }
          } else {
            return 95;
          }
        });
        this.datacollection = {
          labels: mapMc,
          datasets: [
            {
              label: "CycleTime",
              backgroundColor: mapBgColor,
              data: mapValCt,
              fill: true,
              // borderColor: "#3242",
            },
            {
              label: "CycleTime",
              type: "line",
              data: this.limitValue,
              fill: false,
              borderColor: "rgba(252, 93, 93, .8)",
            },
          ],
        };
        this.options = {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "CYL. HEAD FINISH CELL A",
          },
          events: ["click"],
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                console.log("MACHINE SELECTED");
                console.log(data);
                console.log(tooltipItem);
                this.storeMc(tooltipItem.xLabel);
                return `C/Time: ${tooltipItem.yLabel} sec`;
              },
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontSize: 10,
                  suggestedMin: 0,
                  suggestedMax: 230,
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },

                scaleLabel: {
                  //   display: true,
                  //   labelString: "Params",
                  //   fontSize: 25,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 10,
                  display: true,
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
          },
        };
      }
    },
  },
  props: {
    propsChartData: Array,
  },
  methods: {
    ...mapActions(["actionsGetCtOneMc"]),
    generateLimit() {
      let mcCellFinA = [
        "IMSP-0021",
        "IMSP-0022",
        "IMSP-0023",
        "IMSP-0024",
        "IMSP-0025",
        "IMSP-0026",
      ];
      for (let i = 0; i < 6; i++) {
        this.containerMachines.push(mcCellFinA[i]);
        this.limitValue.push(96);
        // else if (i >= 21 && i <= 27) {
        //   this.containerMachines.push(`IMSP-${i}`);
        //   this.limitValue.push(96);
        // } else if (i >= 27 && i <= 47) {
        //   this.containerMachines.push(`IMSP-${i}`);
        //   this.limitValue.push(192);
        // } else {
        //   this.containerMachines.push(`IMSP-${i}`);
        //   this.limitValue.push(96);
        // }
      }
    },
    storeMc(mc) {
      // console.log(mc);
      this.actionsGetCtOneMc(mc);
    },
  },
  mounted() {
    this.generateLimit();
    this.datacollection = {
      labels: this.containerMachines,
      datasets: [
        {
          label: "CycleTime",
          backgroundColor: [
            "#3758dd",
            "#3758dd",
            "#3758dd",
            "#3758dd",
            "#3758dd",
            "#3758dd",
          ],
          data: [91, 92, 93, 87, 89, 92],
          fill: true,
          // borderColor: "#3242",
        },
        {
          label: "CycleTime",
          type: "line",
          data: this.limitValue,
          fill: false,
          borderColor: "rgba(252, 93, 93, .8)",
        },
      ],
    };
    this.options = {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "CYL. HEAD FINISH CELL A",
      },
      events: ["click"],
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            console.log("MACHINE SELECTED");
            console.log(data);
            console.log(tooltipItem);
            this.storeMc(tooltipItem.xLabel);
            return `C/Time: ${tooltipItem.yLabel} sec`;
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontSize: 10,
              suggestedMin: 0,
              suggestedMax: 110,
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },

            scaleLabel: {
              //   display: true,
              //   labelString: "Params",
              //   fontSize: 25,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontSize: 10,
              display: true,
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
      },
    };
  },
};
</script>

<style>
.v-dialog .v-dialog--active {
  margin: 0px !important;
}
td {
  font-size: 10px;
}
.v-expansion-panel-content__wrap {
  padding: 0px !important;
}
</style>
