<template>
  <div class="container-fluid p-1 m-0">
    <!-- LOADING -->
    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
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
    <div class="row m-0 p-0 mb-3">
      <div class="col-6 p-0 btn btn-secondary">
        {{ timeNow }}
      </div>
      <div class="col-6 p-0">
        <router-link class="btn btn-outline-info w-100" to="/job">
          Heijunka Job
        </router-link>
      </div>
    </div>
    <!-- Card PRod -->
    <div class="row m-0 p-0">
      <div class="col-10">
        <div class="row m-0 p-0">
          <CardProdNew
            v-for="line in lineAchivements"
            :key="line.name"
            :propsLine="line"
            :propsLoading="skeletonLoading"
          />
          <div class="col-6 mt-2 px-1 py-0">
            <div
              id="cardProdNew"
              class="`card shadow bg-dark w-100"
              style="height: 100%"
            >
              <div class="row m-0">
                <div class="col text-left text-light title-text px-1 py-1">
                  <h6>Legend</h6>
                </div>
              </div>
              <div class="row m-0">
                <div class="col-12 p-0 px-2">
                  <table>
                    <thead>
                      <tr class="w-100">
                        <td
                          class="bg-success bordered"
                          style="height: 10px; width: 10px"
                        ></td>
                        <td></td>
                        <td>
                          <h6 class="m-0">RUNNING</h6>
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="bg-warning bordered"
                          style="height: 10px; width: 10px"
                        ></td>
                        <td style="width: 10px"></td>
                        <td>
                          <h6 class="m-0">STOP ( Under 30 Min)</h6>
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="bg-danger bordered"
                          style="height: 10px; width: 10px"
                        ></td>
                        <td style="width: 10px"></td>
                        <td>
                          <h6 class="m-0">STOP (Over 30 Min)</h6>
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2 card p-0">
        <div class="card-header text-left">Problem Sedang Terjadi</div>
        <div class="card-body p-1">
          <div
            class="card bg-warning p-2 text-left mt-1"
            v-for="(item, i) in containerActiveProblem"
            style="font-size: 10px"
            :key="i"
          >
            {{ i + 1 }}. {{ item.fline }} | {{ item.fmc_name }} | ({{
              item.fdur
            }}
            min) |
            {{ item.foperator }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <a
        class="btn btn-success p-2 text-light"
        style="
          position: fixed;
          z-index: 100;
          bottom: 10px;
          right: 10px;
          font-size: 20px;
          opacity: 0.7;
        "
        target="_blank"
        href="https://wa.me/6282211511213"
      >
        <span style="font-size: 12px"
          ><b>Ada Masukan?</b><i class="fa fa-whatsapp"></i
        ></span>
      </a>
    </div>
  </div>
</template>

<script>
import CardProdNew from "@/components/CardProdNew";
import { mapActions, mapState } from "vuex";
import axios from "axios";
import moment from "moment";

// import { ModelSelect } from "vue-search-select";

export default {
  name: "DashboarNew",
  data() {
    return {
      lineAchivements: [
        {
          name: "ASSY LINE",
          oee: 100,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: 0,
          output: "-/-",
        },
        {
          name: "CRANK SHAFT",
          oee: 70,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: 0,
          output: "-/-",
        },
        {
          name: "CAM SHAFT",
          oee: 80,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: 0,
          output: "-/-",
        },
        {
          name: "CYLINDER BLOCK",
          oee: 100,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: false,
          output: "-/-",
        },
        {
          name: "CYLINDER HEAD",
          oee: 100,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: false,
          output: "-/-",
        },
        {
          name: "LPDC",
          oee: 100,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: false,
          output: "-/-",
        },
        {
          name: "HPDC",
          oee: 100,
          durMtCall: "-",
          durCurrentStop: "-",
          isStop: false,
          output: "-/-",
        },
      ],
      problem: "",
      selectedLine: "",
      lines: null,
      operator: "",
      machines: ["IMSP-0001", "IMSP-0002"],
      machineSelected: "",
      cycleCount: 0,
      item: [],
      containerRawMachine: [],
      fmc_id: "",
      fnInterval: null,
      dialog: false,
      isLoading: false,
      timeNow: "",
      name: "",
      skeletonLoading: false,
      categoryProblem: false,
      setRole: null,
      containerActiveProblem: [],
    };
  },
  computed: {
    ...mapState([
      "stateProdAchievements",
      "countProbTemp",
      "stateLines",
      "stateMachines",
    ]),
  },
  watch: {
    stateProdAchievements: function () {
      console.log("PROD ACH");
      console.log(this.stateProdAchievements);
      this.stateProdAchievements.map((prod) => {
        console.log(prod.durCurrentStop);
        // TEMPORARY
        // if (prod.falias == "LP" || prod.falias == "DC") {
        //   prod.durMtCall = 0;
        // }
        if (
          prod.durCurrentStop >= 0 &&
          prod.durCurrentStop <= 30 &&
          prod.durCurrentStop != null
        ) {
          prod.borderStatus = "border-warning";
          prod.bgStatus = "bg-warning";
        } else if (prod.durCurrentStop > 30 && prod.durCurrentStop != null) {
          prod.borderStatus = "border-danger";
          prod.bgStatus = "bg-danger";
        } else {
          prod.borderStatus = "border-success";
          prod.bgStatus = "bg-success";
        }
      });
      if (this.stateProdAchievements) {
        this.cycleCount += 1;
        this.lineAchivements = this.stateProdAchievements;
      }
      this.isLoading = false;
    },
    countProbTemp: function () {
      console.log(this.countProbTemp[0].totalProb);
    },
    stateLines: function () {
      console.log(this.stateLines);
      this.lines = this.stateLines;
    },
    stateMachines: function () {
      console.log("Machines");
      console.log(this.stateMachines);
      this.stateMachines.map((machine) => {
        return machine.fmc_name;
      });
      this.machines = this.stateMachines;
    },
    machineSelected: function () {
      console.log(this.machineSelected);
      if (this.machineSelected != "") {
        let mcSelected = this.containerRawMachine.map((mc) => {
          if (mc.fmc_name == this.machineSelected) {
            this.fmc_id = mc.fid;
            return mc.fline;
          } else {
            return null;
          }
        });
        console.log(mcSelected.sort());
        this.selectedLine = mcSelected.sort()[0];
      }
    },
    categoryProblem: function () {
      if (this.categoryProblem) {
        this.problem = "[FULLCAP]" + this.problem;
      } else {
        this.problem = this.problem.split("]")[1];
      }
    },
  },
  methods: {
    ...mapActions([
      "storeProdAchievments",
      "storeCountProbTemp",
      "storeGetLines",
      "storeGetMachines",
    ]),
    goTo(link) {
      this.$router.push(link);
    },
    async problemInput() {
      let { problem, operator, fmc_id } = this;
      let obj = {
        ferror_name: problem,
        foperator: operator,
        fmc_id: fmc_id,
      };
      this.isLoading = true;
      if (problem != "" || operator != "" || fmc_id != "") {
        await axios
          .post(`${process.env.VUE_APP_HOST}/addProblem`, obj)
          .then(async (result) => {
            console.log(result);
            if (result.status == 203) {
              alert(result.data.message);
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.clearSubmit();
              await this.storeProdAchievments();
            }
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
          });
      }
    },
    async getColorDash() {
      setInterval(async () => {
        await this.storeProdAchievments();
        await this.getActiveProblem();
      }, 60000);
      await this.storeProdAchievments();
      await this.storeCountProbTemp();
    },
    async getMachines(first = true) {
      if (first) {
        this.dialog = true;
      }
      await axios
        .get(`${process.env.VUE_APP_HOST}/searchMc`)
        .then((result) => {
          console.log(result.data.data);
          this.containerRawMachine = result.data.data;
          let mapMc = result.data.data.map((mc) => {
            return { value: mc.fmc_name, text: mc.fmc_name };
          });
          console.log(mapMc);
          this.machines = mapMc;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    beforeDestroy() {
      clearInterval(this.fnInterval);
      console.log("BEFORE DESTROY");
    },
    clearSubmit() {
      this.problem = "";
      this.fmc_id = "";
      this.machineSelected = "";
      this.selectedLine = "";
      this.dialog = false;
      this.isLoading = false;
    },
    intervalTime() {
      let dateConvert = `${moment().format("L").split("/")[1]}/${
        moment().format("L").split("/")[0]
      }/${moment().format("L").split("/")[2]}`;
      this.timeNow = `${dateConvert} ${
        moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
      }`;
    },
    permissionCheck() {
      if (!localStorage.getItem("name")) {
        this.$router.push("/login");
      } else {
        this.name = localStorage.getItem("name");
        this.setRole = localStorage.getItem("role");
        this.operator = this.name;
      }
    },
    async getActiveProblem() {
      let uri = `${process.env.VUE_APP_HOST}/getAllActiveProblem`;
      await axios
        .get(uri)
        .then((result) => {
          console.log(result);
          if (result.data.data.length > 0) {
            this.containerActiveProblem = [];
            result.data.data.forEach((item) => {
              console.log(item);
              this.containerActiveProblem.push(item);
            });
          }
        })
        .catch((err) => {
          console.log(err);
          // this.getActiveProblem()
        });
      console.log(this.containerActiveProblem);
    },
  },
  components: {
    CardProdNew,
    // ModelSelect,
  },
  async mounted() {
    this.skeletonLoading = true;
    await this.getColorDash();
    await this.permissionCheck();
    await this.getActiveProblem();
    // let intervalColDash = setInterval(this.storeProdAchievments, 20000);
    // console.log(intervalColDash);
    // await this.getMachines(false);
    let dateConvert = `${moment().format("L").split("/")[1]}/${
      moment().format("L").split("/")[0]
    }/${moment().format("L").split("/")[2]}`;
    this.timeNow = `${dateConvert} ${
      moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
    }`;
    let intervalStart = setInterval(this.intervalTime, 1000);
    console.log(intervalStart);
  },
};
</script>
<style>
.container-menu {
  /* height: 100%; */
}
.card-title {
  /* font-family: "Bebas Neue", cursive; */
  font-size: 13px;
  margin-bottom: 0px;
  font-weight: 800;
}
.nav-title {
  font-family: "Bebas Neue", cursive;
  font-size: 23px;
  letter-spacing: 3px;
}
#vs1__combobox {
  max-height: 29px;
}
h2 {
  font-family: "Bebas Neue", cursive;
  margin: 0px;
  color: #006b38ff;
}
.title-text {
  font-family: "Bebas Neue", cursive;
  font-size: 16px;
}
.vm-progress__text {
  display: flex !important;
  justify-content: center !important;
}
.vm-progress--circle .vm-progress__text {
  position: flex !important;
  justify-content: center;
  align-items: center;
  color: white !important;
  margin: 0;
  text-align: center;
  transform: translate(0, -50%);
}
strong {
  font-size: 12px;
}
.input-group-text {
  font-size: 10px;
}
.form-control,
.search {
  font-size: 0.6rem;
  padding-left: 4px;
  padding-right: 0px;
  max-height: 29px;
}
.swal2-content {
  padding: 0px;
}
td h6 {
  font-size: 10px;
  color: white;
  text-align: left;
}
.hover-menu:active {
  background-color: rgba(125, 242, 228, 0.7);
  border-radius: 10px;
}
.hover-menu {
  border-radius: 10px;
}
</style>