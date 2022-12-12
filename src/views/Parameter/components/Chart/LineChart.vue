<template>
  <div id="chart">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div v-if="is_admin">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Data</th>
            <th colspan="2">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in propsChartData" :key="data.id">
            <td>{{ i + 1 }}</td>
            <td>
              {{ data.clock.split("T")[0] }}
            </td>
            <td>
              <template v-if="!is_edit_mode">
                {{ data.value }}
              </template>
              <template v-else-if="is_edit_mode && i == id_edit_selected">
                <input
                  class="form-control"
                  type="number"
                  v-model="valueChange"
                />
              </template>
              <template v-else>
                {{ data.value }}
              </template>
            </td>
            <td>
              <button
                v-if="!is_edit_mode"
                class="btn btn-sm btn-info"
                @click="editParamMode(true, data, i)"
              >
                <i class="fa fa-edit"></i>
              </button>
              <button
                v-else-if="is_edit_mode && i == id_edit_selected"
                class="btn btn-sm btn-success"
                @click="editParamMode(false, data, i)"
              >
                <i class="fa fa-send"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import formatDate from "@/functions/formatDate";
// import Swal from "sweetalert2";
import axios from "axios";
// import moment from "moment";
export default {
  name: "LineChart",
  data() {
    return {
      series: [],
      isLoading: false,
      chartOptions: {
        // chart: {
        //   type: "line",
        //   stacked: false,
        //   height: 350,
        //   zoom: {
        //     enabled: false,
        //   },
        //   toolbar: {
        //     show: true,
        //   },
        // },
      },
      is_admin: false,
      is_edit_mode: false,
      valueChange: 0,
      id_edit_selected: 0,
    };
  },
  components: {
    apexchart: VueApexCharts,
  },
  watch: {
    propsChartData: function () {},
  },
  props: {
    propsChartData: Array,
  },
  methods: {
    editParamMode(state, data, i) {
      this.id_edit_selected = i;
      if (state) {
        this.is_edit_mode = state;
      } else {
        this.is_edit_mode = state;
        this.isLoading = true;
        axios
          .put(`${process.env.VUE_APP_HOST}/parameter/${data.id}`, {
            value: this.valueChange,
          })
          .then((result) => {
            console.log(result);
            this.valueChange = 0;
            this.isLoading = false;
            this.$router.go();
          })
          .catch((err) => {
            console.error(err);
            this.valueChange = 0;
            this.isLoading = false;
            this.$router.go();
          });
      }
    },
  },
  mounted() {
    if (this.$route.query.is_admin) {
      this.is_admin = true;
    }
    console.log("panggil");
    // if (this.propsChartData) {
    // }
    console.log(this.propsChartData);
    console.log(this.propsChartData);
    this.propsChartData.sort((a, b) =>
      a.clock > b.clock ? 1 : b.clock > a.clock ? -1 : 0
    );
    // setTimeout(() => {}, 1000);
    let isActionAvail = false;
    let containerColors = [];
    let containerColorsLimit = ["#19ff30"];
    let containPointGraph = [];
    let currentCondMap = this.propsChartData.map((item, i) => {
      containerColors.push("#19ff30");
      if (item.id_action) {
        isActionAvail = true;
        let objPoint = {
          // x: new Date(this.propsChartData[i].clock).getTime() + 1000 * 60 * 60,
          x: formatDate.DDMMYY(this.propsChartData[i].clock),
          y: this.propsChartData[i].value,
          marker: {
            size: 1,
          },
          label: {
            borderColor: "#000",
            fillColor: "#FEB019",
            offsetY: 0,
            style: {
              color: "#000000",
              background: "#00ffff",
            },

            text: item.desc_action,
          },
        };
        containPointGraph.push(objPoint);
        containPointGraph.push({
          x: formatDate.DDMMYY(this.propsChartData[i + 1].clock),
          y: this.propsChartData[i + 1].value,
          marker: {
            size: 1,
          },
          label: {
            borderColor: "#000",
            fillColor: "#FEB019",
            offsetY: 0,
            offsetX: -50,
            style: {
              color: "#000000",
              background: "#00ffff",
            },

            text: `pengecekan setelah ${item.desc_action}`,
          },
        });
        console.log(containPointGraph);
      }
      return item.value;
    });
    console.log("PROPS CHART UPPERLIMIT[0]");

    console.log(this.propsChartData[0].warning_ul);
    let time = this.propsChartData.map((item) => {
      // console.log(item.clock);
      return formatDate.DDMMYY(item.clock);
      // return new Date(item.clock).getTime();
    });
    this.series.push({
      name: "Current Condition",
      data: currentCondMap,
    });
    if (this.propsChartData[0].upper_limit) {
      let upper_limit = this.propsChartData.map((item) => {
        return item.upper_limit;
      });
      containPointGraph.push({
        x: time[0],
        y: this.propsChartData[0].upper_limit,
        marker: {
          size: 1,
        },
        label: {
          borderColor: "#000",
          fillColor: "#FEB019",
          offsetY: 0,
          offsetX: 40,
          style: {
            color: "#000000",
            background: "#ff411c",
          },

          text: `Upper Limit: ${this.propsChartData[0].upper_limit}`,
        },
      });
      containerColorsLimit.push("#ff411c");
      this.series.push({
        name: "Upper Limit",
        data: upper_limit,
      });
    }
    if (this.propsChartData[0].lower_limit) {
      let lower_limit = this.propsChartData.map((item) => {
        return item.lower_limit;
      });
      containPointGraph.push({
        x: time[0],
        y: this.propsChartData[0].lower_limit,
        marker: {
          size: 1,
        },
        label: {
          borderColor: "#000",
          fillColor: "#FEB019",
          offsetY: 0,
          offsetX: 40,
          style: {
            color: "#000000",
            background: "#ff411c",
          },

          text: `Lower Limit: ${this.propsChartData[0].lower_limit}`,
        },
      });
      containerColorsLimit.push("#ff411c");
      this.series.push({
        name: "Lower Limit",
        data: lower_limit,
      });
    }
    if (this.propsChartData[0].warning_ll) {
      let warn_lower_limit = this.propsChartData.map((item) => {
        return item.warning_ll;
      });
      containPointGraph.push({
        x: time[0],
        y: this.propsChartData[0].warning_ll,
        marker: {
          size: 1,
        },
        label: {
          borderColor: "#000",
          fillColor: "#FEB019",
          offsetY: 0,
          offsetX: 50,
          style: {
            color: "#000000",
            background: "#fff31c",
          },

          text: `Warning Lower: ${this.propsChartData[0].warning_ll}`,
        },
      });
      containerColorsLimit.push("#fff31c");
      this.series.push({
        name: "Warning Low Limit",
        data: warn_lower_limit,
      });
    }
    if (this.propsChartData[0].warning_ul) {
      let warn_upper_limit = this.propsChartData.map((item) => {
        return item.warning_ul;
      });
      containPointGraph.push({
        x: time[0],
        y: this.propsChartData[0].warning_ul,
        marker: {
          size: 1,
        },
        label: {
          borderColor: "#000",
          fillColor: "#FEB019",
          offsetY: 0,
          offsetX: 50,
          style: {
            color: "#000000",
            background: "#fff31c",
          },

          text: `Warning Upper: ${this.propsChartData[0].warning_ul}`,
        },
      });
      containerColorsLimit.push("#fff31c");
      this.series.push({
        name: "Warning Up Limit",
        data: warn_upper_limit,
      });
    }
    // let map
    let is_exception_param_min_yAxes =
      this.propsChartData[0].id_param == 7 ? true : false;
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
          enabled: true,
          formatter: function (val, opts) {
            if (opts.seriesIndex == 0) {
              return val;
            } else {
              return "";
            }
          },
          style: {
            fontSize: "9px",
            colors: ["#00ff61"],
          },
          background: {
            foreColor: "black",
          },
        },
        markers: {
          size: 1,
          colors: containerColorsLimit,
          strokeColors: containerColorsLimit,
        },
        colors: containerColorsLimit,
        yaxis: {
          show: true,
          title: {
            text: this.propsChartData[0].units,
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
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
            rotate: -90,
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
          text: `Data Record TPM ${this.propsChartData[0].param_name} (${this.propsChartData[0].fmc_name})`,
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
          yaxis: [
            // {
            //   y: this.propsChartData[0].warning_ul
            //     ? this.propsChartData[0].warning_ul
            //     : this.propsChartData[0].warning_ll,
            //   y2: this.propsChartData[0].lower_limit
            //     ? this.propsChartData[0].warning_ll
            //       ? this.propsChartData[0].upper_limit
            //       : this.propsChartData[0].lower_limit
            //     : this.propsChartData[0].upper_limit,
            //   borderColor: "#000",
            //   fillColor: "#FEB019",
            //   opacity: 0.2,
            // },
          ],
          points: containPointGraph,
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
          },
        },
        labels: time,
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            if (opts.seriesIndex == 0) {
              return val;
            } else {
              return "";
            }
          },
          style: {
            fontSize: "9px",
            colors: ["#00ff61"],
          },
          background: {
            foreColor: "black",
          },
        },
        markers: {
          size: 1,
          colors: containerColorsLimit,
          strokeColors: containerColorsLimit,
        },
        colors: containerColorsLimit,
        yaxis: {
          show: true,
          title: {
            text: this.propsChartData[0].units,
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            rotate: -90,
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
          text: `Data Record TPM ${this.propsChartData[0].param_name} (${this.propsChartData[0].fmc_name})`,
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
          yaxis: [
            // {
            //   y: this.propsChartData[0].warning_ul
            //     ? this.propsChartData[0].warning_ul
            //     : this.propsChartData[0].warning_ll,
            //   y2: this.propsChartData[0].lower_limit
            //     ? this.propsChartData[0].warning_ll
            //       ? this.propsChartData[0].upper_limit
            //       : this.propsChartData[0].lower_limit
            //     : this.propsChartData[0].upper_limit,
            //   borderColor: "#000",
            //   fillColor: "#FEB019",
            //   opacity: 0.2,
            // },
          ],
          points: containPointGraph,
        },
      };
    }
    if (is_exception_param_min_yAxes) {
      this.chartOptions.yaxis.min = 0;
    }
  },
};
</script>