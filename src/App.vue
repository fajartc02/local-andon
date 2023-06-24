<template>
  <div @mousemove="mouseMove">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
// import ContainerMenu from "@/components/ContainerMenu";
import { mapActions } from "vuex";
// import PWABadge from "pwa-badge";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      isHomeBtn: false,
      ex11: false,
      isShow: false,
      idle: false,
      mousePos: 0,
      currentRoute: null,
      windowWidth: window.innerWidth,
      isMobile: false,
    };
  },
  components: {
    // ContainerMenu,
  },
  watch: {
    $route(to) {
      // console.log(to);
      this.actionsPushRoute(to.params.line);
      // if (to.path == "/") {
      //   this.isHomeBtn = false;
      // } else {
      //   this.isHomeBtn = true;
      // }
      this.currentRoute = to.path;
    },
    idle: function () {
      // if (this.idle && !this.isMobile) {
      //   this.checkScreen();
      //   // let time = 0.4 * 60 * 1000;
      //   // setTimeout(() => {
      //   // this.checkScreen();
      //   // }, time);
      // }
    },
    mousePos: function () {
      // let time = 10 * 60 * 1000;
      // if (this.currentRoute != null)
      this.idle = false;
      // if (!this.isMobile) {
      //   setTimeout(() => {
      //     if (
      //       this.currentRoute != "/dashboard" ||
      //       this.currentRoute != "/job/dashboard"
      //     ) {
      //       this.idle = true;
      //     } else {
      //       this.idle = false;
      //     }
      //   }, time);
      // }
    },
  },
  methods: {
    ...mapActions(["actionsPushRoute", "actionsChangeTheme"]),
    onResize() {
      this.windowWidth = window.innerWidth;
      // console.log(this.windowWidth);
      if (this.windowWidth < 650) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
      // console.log(this.isMobile);
    },
    gotoHome() {
      this.$router.push("/");
    },
    changesTheme() {
      if (this.ex11 == true) {
        this.actionsChangeTheme("dark");
        document.getElementById("app").style.backgroundColor = "black";
      } else {
        this.actionsChangeTheme("light");
        document.getElementById("app").style.backgroundColor = "white";
      }
    },
    permissionCheck() {
      if (localStorage.getItem("name") == "Guest") {
        alert(
          "Login toyota sudah tidak tersedia, Silahkan register dan menunggu notifikasi approve dari SMART ANDON"
        );
        localStorage.removeItem("name");
        this.$router.push("/login");
      }
      if (!localStorage.getItem("name")) {
        this.$router.push("/login");
      } else {
        this.name = localStorage.getItem("name");
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.isShow = false;
    },
    async checkScreen() {
      axios
        .get(`${process.env.VUE_APP_HOST}/checkScreen`)
        .then((result) => {
          // console.log(result);
          if (result.data.data.length > 0) {
            let path = result.data.data[0].path;
            axios
              .put(`${process.env.VUE_APP_HOST}/updateScreen`, {
                path,
                status: 1,
              })
              .then(() => {
                this.$router.push(path);
                // console.log(msgUpdate);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    mouseMove(event) {
      this.mousePos = event.clientX;
      // console.log(event.clientX, event.clientY);
    },
    // swaggerTest() {
    //   axios
    //     .get(
    //       "https://app.swaggerhub.com/apis/tioazis/noval_hendra_azis_bersatu_dalam_perprojekan_duniawi/0.0.1/dieType",
    //       {
    //         headers: {
    //           // Authorization: "Bearer blabla",
    //           "Content-Type": "application/json",
    //           // Accept: "application/json",
    //         },
    //       }
    //     )
    //     .then((result) => {
    //       console.log(result.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  mounted() {
    // this.permissionCheck();
    // this.$nextTick(() => {
    //   window.addEventListener("resize", this.onResize);
    // });
    // this.onResize();
    // console.log(this.$route.path);
    // // if (!this.isMobile) {
    // //   setInterval(() => {
    // //     if (
    // //       this.$route.path == "/dashboard" ||
    // //       this.$route.path == "/job/dashboard"
    // //     ) {
    // //       this.idle = false;
    // //       axios
    // //         .put(`${process.env.VUE_APP_HOST}/updateScreen`, {
    // //           path: this.currentRoute,
    // //           status: 1,
    // //         })
    // //         .then((msgUpdate) => {
    // //           // this.$router.push(path);
    // //           console.log(msgUpdate);
    // //         })
    // //         .catch((err) => {
    // //           console.log(err);
    // //         });
    // //     }
    // //   }, 5000);
    // //   setInterval(() => {
    // //     axios
    // //       .put(`${process.env.VUE_APP_HOST}/updateScreen`, {
    // //         path: "/dashboard",
    // //         status: 0,
    // //       })
    // //       .then((msgUpdate) => {
    // //         // this.$router.push(path);
    // //         console.log(msgUpdate);
    // //       })
    // //       .catch((err) => {
    // //         console.log(err);
    // //       });
    // //     axios
    // //       .put(`${process.env.VUE_APP_HOST}/updateScreen`, {
    // //         path: "/job/dashboard",
    // //         status: 0,
    // //       })
    // //       .then((msgUpdate) => {
    // //         // this.$router.push(path);
    // //         console.log(msgUpdate);
    // //       })
    // //       .catch((err) => {
    // //         console.log(err);
    // //       });
    // //   }, 70000);
    // // }
    // const badge = new PWABadge();
    // badge
    //   .asyncSetBadge(1)
    //   .then(() => {
    //     // Badge count has shown as well
    //   })
    //   .catch((e) => {
    //     // The Browser not supporting the Badge feature or something went wrong
    //     console.log(e);
    //   });
    // this.swaggerTest();
  },
};
</script>

<style>
.rounded-img-20 {
  border-radius: 10%;
}
.pointer {
  cursor: pointer;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  background-color: white;
}

#nav {
  padding: 30px;
}

th {
  background-color: black !important;
  text-align: center;
  color: whitesmoke;
}

table,
th,
td {
  border: 1px solid black;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

html {
  background-color: rgb(234, 252, 252);
  background-color: #101820ff;
}
.modal-backdrop {
  z-index: -1;
}
</style>
