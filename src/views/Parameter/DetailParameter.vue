<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <search class="mt-1"></search>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParameter",
  data() {
    return {};
  },
  components: {
    Search: () => import("./components/Search/Search.vue"),
  },
};
</script>