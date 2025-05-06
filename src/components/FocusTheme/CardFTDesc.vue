<template>
  <div></div>
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