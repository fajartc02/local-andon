<template>
  <div class="container-fluid">
    <div class="row" v-if="containerLines">
      <div
        v-for="(item, i) in containerLines"
        :key="i"
        class="col-lg-6 col-sm-12"
      >
        <card-line :propsLine="item"></card-line>
      </div>
    </div>
    <div class="row" v-else>
      <Loading :propsLoading="isLoading" />
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
      isLoading: false,
    };
  },
  methods: {
    getLines() {
      this.isLoading = true;
      axios
        .get(`${process.env.VUE_APP_HOST}/dashboard/machines`)
        .then((result) => {
          console.log(result);
          this.containerLines = result.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
  components: {
    CardLine: () => import("./Card/CardLine.vue"),
    Loading: () => import("@/components/Loading.vue"),
  },
  mounted() {
    this.getLines();
  },
};
</script>