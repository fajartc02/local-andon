<template>
  <div class="justify-content-around row">
    <div class="col-lg-12 col-xs-12 mt-2">
      <div class="card p-3 shadow-all bg-light text-dark shadow-lg p-0">
        <div class="row text-center">
          <div
            :class="`col-8 text-left title-text p-0 p-2 pb-0 ${propsMenu.color}`"
            style="font-size: 32px"
          >
            <router-link
              class="btn btn-outline-success"
              to="/parameter/history"
              v-if="propsMenu.menu == true"
            >
              {{ propsMenu.num }}
            </router-link>
            <b-button
              v-else
              :id="`button-${propsMenu.num}`"
              variant="outline-success"
              :disabled="!propsMenu.menu"
              >{{ propsMenu.num }}</b-button
            >
          </div>
          <b-tooltip :target="`button-${propsMenu.num}`" placement="bottom">
            <table
              class="table table-bordered"
              v-if="propsMenu.menu.length > 0"
            >
              <tr>
                <th>No</th>
                <th>Parameter</th>
              </tr>
              <tr v-for="(item, i) in propsMenu.menu" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ item }}</td>
              </tr>
            </table>
          </b-tooltip>
          <div
            :class="`col
              text-left
              title-text
              p-0 p-2
              pb-0
              ${propsMenu.color} text-center`"
            style="font-size: 32px"
          >
            <i :class="propsMenu.icon" aria-hidden="true"></i>
          </div>
        </div>
        <div class="row">
          <div class="col text-left p-0 p-2 pt-0 text-secondary">
            <span class="title-text">{{ propsMenu.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardMenu",
  data() {
    return {};
  },
  props: {
    propsMenu: Object,
  },
  methods: {},
};
</script>