<template>
  <v-dialog v-model="propsLoading" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        Loading...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Loading",
  props: {
    propsLoading: Boolean,
  },
};
</script>