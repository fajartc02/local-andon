<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col p-0">
        <nav class="navbar navbar-dark bg-dark">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li
                v-for="(item, i) in menu"
                :key="i"
                :class="`nav-item ${item.isActive ? 'active' : ''}`"
              >
                <router-link
                  class="nav-link"
                  :to="item.routes"
                  @click="changeRoutes(i)"
                  >{{ item.name }}</router-link
                >
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      menu: [
        {
          name: "Dashboard",
          routes: "/parameter/dashboard",
          isActive: true,
        },
        {
          name: "Administration",
          routes: "/parameter/administration",
          isActive: false,
        },
      ],
    };
  },
  methods: {
    changeRoutes(i) {
      this.menu = this.menu.map((item, idx) => {
        if (i == idx) {
          return {
            name: item.name,
            routes: item.routes,
            isActive: true,
          };
        } else {
          return {
            name: item.name,
            routes: item.routes,
            isActive: false,
          };
        }
      });
    },
  },
};
</script>