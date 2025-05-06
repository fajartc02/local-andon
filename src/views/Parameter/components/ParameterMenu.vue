<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="(param, i) in parameters" :key="i" class="col-4">
        <div class="card text-dark">
          <div class="card-header">
            {{ param.param_name }}
          </div>
          <div class="card-body bg-success">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            aspernatur aliquid accusamus sequi maxime iure voluptatibus
            similique architecto quas natus dignissimos alias enim, sit neque
            perspiciatis asperiores corrupti repellendus! Quidem.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ParameterMenu",
  data() {
    return {
      parameters: [],
    };
  },
  methods: {
    getParameterMachine() {
      axios
        .get(`${process.env.VUE_APP_HOST}/monitoringParam`)
        .then((result) => {
          console.log(result);
          this.parameters = result.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.getParameterMachine();
  },
};
</script>