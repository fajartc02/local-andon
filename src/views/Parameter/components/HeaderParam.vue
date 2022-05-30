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
        .get(`${process.env.VUE_APP_HOST}/parameterAlertHistory`)
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
              num: 5,
              icon: "fa fa-tachometer",
              color: "text-primary",
              menu: [
                "Vibration Spindle",
                "Torque Spindle Clamp",
                "Thermo Treassure",
                "Torque Sensor",
                "Centering Jig Conroad",
              ],
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
              num: result.data.data.length,
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
  },
  mounted() {
    this.getAlarmHistory();
  },
};
</script>