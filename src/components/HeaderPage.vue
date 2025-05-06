<template>
  <div class="row mt-2">
    <div class="col p-0 m-0">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderPage",
  props: {
    title: String,
  },
};
</script>