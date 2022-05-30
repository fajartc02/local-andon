<template>
  <div class="container-fluid p-0">
    <navigation-bar></navigation-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
export default {
  name: "Parameter",
  components: {
    NavigationBar,
  },
};
</script>