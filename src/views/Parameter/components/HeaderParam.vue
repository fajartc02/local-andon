<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col" v-for="(item, i) in containerHeader" :key="i">
        <card-menu :propsMenu="item"></card-menu>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "HeaderParam",
  data() {
    return {
      containerHeader: [],
    };
  },
  components: {
    CardMenu: () => import("./Card/CardMenu.vue"),
  },
  methods: {
    getAlarmHistory() {
      axios
        .get(`${process.env.VUE_APP_HOST}/countAlertHistory`)
        .then((result) => {
          console.log(result);
          this.containerHeader = [
            {
              name: "Machines Monitored",
              num: 370,
              icon: "fa fa-cogs",
              color: "text-success",
              menu: false,
            },
            {
              name: "Parameters Monitored",
              num: 116,
              icon: "fa fa-tachometer",
              color: "text-primary",
              menu: false,
              // menu: [
              //   "",
              //   // "Torque Spindle Clamp (manual)",
              //   // "Thermo Treassure (manual)",
              //   // "Torque Sensor (manual)",
              //   // "Centering Jig Conroad (manual)",
              //   // "Vibration Motor (auto)",
              //   // "Temperature Motor (auto)"
              // ],
            },
            {
              name: "Alarm Active",
              num: 0,
              icon: "fa fa-bell",
              color: "text-danger",
              menu: false,
            },
            {
              name: "Alarm/Warning History",
              // num: result.data.data.length,
              num: result.data.data.length - 1,
              icon: "fa fa-history",
              color: "text-danger",
              menu: true,
            },
          ];
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getParameter() {},
  },
  mounted() {
    this.getAlarmHistory();
  },
};
</script>