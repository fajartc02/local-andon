<template>
  <div class="container-fluid">
    <div class="row">
      <div
        v-for="(item, i) in containerLines"
        :key="i"
        class="col-lg-6 col-sm-12"
      >
        <card-line :propsLine="item"></card-line>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "ContentLines",
  data() {
    return {
      containerLines: null,
    };
  },
  methods: {
    getLines() {
      axios
        .get(`${process.env.VUE_APP_HOST}/dashboard/machines`)
        .then((result) => {
          console.log(result);
          this.containerLines = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    CardLine: () => import("./Card/CardLine.vue"),
  },
  mounted() {
    this.getLines();
  },
};
</script>