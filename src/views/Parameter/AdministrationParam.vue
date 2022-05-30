<template>
  <div class="container-fluid px-0">
    <div class="row">
      <div class="col">
        <register-param></register-param>
      </div>
    </div>
    <div class="row">
      <div class="col px-0">
        <table-admin></table-admin>
      </div>
    </div>
  </div>
</template>

<script>
import TableAdmin from "./components/Administration/TableAdmin.vue";
import RegisterParam from "./components/Administration/RegisterParam.vue";

export default {
  name: "AdministrationParam",
  components: {
    TableAdmin,
    RegisterParam,
  },
};
</script>