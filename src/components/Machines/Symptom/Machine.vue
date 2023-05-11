<template>
  <div>
    <div class="tooltip-native">
      <button
        :class="
          machineData.total_alarm_abnormal > 0
            ? 'card-mc-stop'
            : machineData.total_alarm_warning > 0
            ? 'card-mc-warn'
            : 'card-mc'
        "
        @click="getDataGraph()"
      >
        <h2>{{ machineData.machine_nm }}</h2>
      </button>
      <div
        class="tooltiptext-native"
        v-if="
          machineData.total_alarm_abnormal > 0 ||
          machineData.total_alarm_warning > 0
        "
      >
        <line-chart
          v-if="containerDataChart.length > 0"
          :propsChartData="containerDataChart[0]"
        ></line-chart>
        <span v-if="isLoading">Loading . . .</span>
        <a
          v-if="containerDataChart.length > 0"
          class="btn btn-primary text-light m-2"
          target="_blank"
          href="https://tmmin.sharepoint.com/sites/MaintenancePlant3/Dokumen%20Berbagi/Forms/AllItems.aspx"
          >Guidance</a
        >
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
// import VueApexCharts from "vue-apexcharts";
import formatDate from "@/functions/formatDate";

export default {
  name: "Machine",
  data() {
    return {
      containerDataChart: [],
      isLoading: null,
      detailAl: null,
      startDate: formatDate.YYYYMMDD_HHMM(new Date()),
      endDate: formatDate.YYYYMMDD_HHMM(
        new Date(new Date().getTime + 1000 * 60 * 3)
      ),
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chartOptions: {
        chart: {
          height: 550,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "IKDM-102 (Biscuit Thickness)",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    };
  },
  props: {
    machineData: Object,
  },
  methods: {
    getDataGraph() {
      this.isLoading = true;
      this.containerDataChart = [];
      let url = `${process.env.VUE_APP_HOST}/paramHistory?`;
      url += `filterQuery=WHERE param_name = 'Vibration Spindle' AND fmc_name = 'IMSP-0004'`;
      axios
        .get(url)
        .then(async (resultParam) => {
          console.log(resultParam);
          this.isLoading = false;
          this.containerDataChart.push(resultParam.data.data);
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },
  components: {
    // apexchart: VueApexCharts,
    LineChart: () => import("./LineChart.vue"),
  },
  async mounted() {
    // if (
    //   this.machineData.total_alarm_abnormal > 0 ||
    //   this.machineData.total_alarm_warning > 0
    // ) {
    //   this.getDataGraph();
    // }
    console.log(this.machineData);
  },
};
</script>


<style scoped>
.tooltip-native {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip-native .tooltiptext-native {
  visibility: hidden;
  background-color: white;
  /* color: white; */
  text-align: center;
  border-radius: 6px;
  /* padding: 5px 0; */
  width: 500px;
  /* height: 50vh; */
  /* bottom: 20%; */
  /* bottom: 0px; */
  top: -5px;
  right: 95%;
  margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */

  /* Position the tooltip-native */
  position: absolute;
  z-index: 100000000;
}
.tooltip-native:hover .tooltiptext-native {
  visibility: visible;
  opacity: 0.98;
}

.card-mc {
  width: 80px;
  height: 80px;
  background: #07182e;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 10px;
}

.card-mc h2 {
  z-index: 1;
  color: whitesmoke;
  /* background-color: aliceblue; */
  opacity: 0.8;
  font-size: 20px;
}

.card-mc::before {
  content: "";
  position: absolute;
  width: 80px;
  background-image: linear-gradient(180deg, rgb(51, 255, 0), rgb(48, 255, 183));
  height: 80px;
  /* animation: rotBGimg 3s linear infinite; */
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card-mc::after {
  content: "";
  position: absolute;
  background: #07182e;
  inset: 4px;
  border-radius: 10px;
}

.card-mc-stop {
  width: 80px;
  height: 80px;
  background: #07182e;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 10px;
}

.card-mc-stop h2 {
  z-index: 1;
  color: whitesmoke;
  /* background-color: aliceblue; */
  opacity: 0.8;
  font-size: 20px;
}

.card-mc-stop::before {
  content: "";
  position: absolute;
  width: 80px;
  background-image: linear-gradient(
    180deg,
    rgb(255, 0, 119),
    rgb(255, 48, 238)
  );
  height: 80px;
  animation: rotBGimg 3s linear infinite;
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card-mc-stop::after {
  content: "";
  position: absolute;
  background: #07182e;
  inset: 4px;
  border-radius: 10px;
}

.card-mc-warn {
  width: 80px;
  height: 80px;
  background: #07182e;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 10px;
}

.card-mc-warn h2 {
  z-index: 1;
  color: whitesmoke;
  /* background-color: aliceblue; */
  opacity: 0.8;
  font-size: 20px;
}

.card-mc-warn::before {
  content: "";
  position: absolute;
  width: 80px;
  background-image: linear-gradient(
    180deg,
    rgb(255, 145, 0),
    rgb(255, 234, 48)
  );
  height: 80px;
  /* animation: rotBGimg 3s linear infinite; */
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card-mc-warn::after {
  content: "";
  position: absolute;
  background: #07182e;
  inset: 4px;
  border-radius: 10px;
}
</style>