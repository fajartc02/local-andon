<template>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio eaque,
    recusandae magni beatae, nisi, error maxime accusamus at fugiat facilis
    distinctio cumque nam debitis quae modi ut. Officiis, expedita explicabo!
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";
export default {
  name: "CardFTDesc",
  data() {
    return {};
  },
  props: {
    id_p_m: Number,
  },
  mounted() {
    ApiService.get("/getLineMember")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>