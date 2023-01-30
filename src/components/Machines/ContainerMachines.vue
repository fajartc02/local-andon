<template>
  <div>
    <h3 class="text-light">
      {{ clock }}
    </h3>
    <v-carousel v-model="model" height="100vh">
      <v-carousel-item v-for="line in lines" :key="line">
        <v-sheet :color="'transparent'" tile>
          <v-row class="fill-height" justify="center">
            <div class="container-fluid mt-4">
              <h4 class="font-bungee text-light" style="font-size: 30px">
                {{ line.line_nm }}
              </h4>
              <div class="row mt-3">
                <div class="col-6">
                  <HeadProbActive />
                </div>
                <div class="col-6">
                  <HeadMtCall :valMtCall="stateProdAchievements[1].durMtCall" />
                </div>
                <div class="col-4">
                  <!-- <HeadProbActive /> -->
                </div>
              </div>
              <div class="row py-1 mt-3 mb-3">
                <div
                  v-for="(area, idxArea) in lines[model].areas"
                  :class="
                    lines[model].areas[idxArea].cells[idxArea].machines.length >
                    1
                      ? `col my-auto border border-secondary
                        py-1`
                      : `col-3 my-auto border border-secondary
                        py-1`
                  "
                  :key="area.area_nm"
                >
                  <h4 class="font-bungee text-light" style="font-size: 20px">
                    {{ area.area_nm }}
                  </h4>
                  <template v-for="(cell, idxCell) in area.cells">
                    <div
                      class="
                        d-flex
                        justify-content-start
                        flex-wrap
                        mt-3
                        border border-secondary
                        py-1
                        my-auto
                      "
                      :key="idxCell"
                    >
                      <h4
                        class="font-bungee p-1 text-light"
                        style="font-size: 10px"
                      >
                        {{ cell.cell_nm }}
                      </h4>
                      <template v-for="(mc, idxMc) in cell.machines">
                        <div class="m-1" :key="idxMc">
                          <Machine :machineData="mc" />
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </div>
              <div class="row mt-4 justify-content-center">
                <div class="col-2">
                  <h2 class="font-bungee text-light mt-4">Legend</h2>
                </div>
                <div class="col-1 border">
                  <button class="card-mc-stop mx-auto">
                    <h2>Machine Stop</h2>
                  </button>
                </div>
                <div class="col-1 border">
                  <button class="card-mc mx-auto">
                    <h2>Machine Running</h2>
                  </button>
                </div>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>


<script>
import Machine from "@/components/Machines/Machine";
import HeadProbActive from "./HeadProbActive.vue";
import HeadMtCall from "./HeadMtCall.vue";
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  name: "ContainerMachines",
  data() {
    return {
      model: 0,
      clock: new Date().toLocaleString(),
      lines: [],
    };
  },
  computed: {
    ...mapState(["stateProdAchievements"]),
  },
  methods: {
    ...mapActions(["storeProdAchievments"]),
    updateTime() {
      this.clock = new Date().toLocaleString();
    },
    async getMachinesStatus() {
      await this.storeProdAchievments();
      await axios
        .get(`${process.env.VUE_APP_HOST}/monitoring/machines`)
        .then((result) => {
          this.lines = result.data.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  components: {
    Machine,
    HeadProbActive,
    HeadMtCall,
  },
  async mounted() {
    this.getMachinesStatus();
    setInterval(() => {
      this.updateTime();
    }, 1000);
    setInterval(() => {
      this.getMachinesStatus();
      console.log(this.stateProdAchievements);
    }, 3000);
  },
};
</script>

<style scoped>
.card-mc {
  width: 80px;
  height: 80px;
  background: #07182e;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 10px;
}

.card-mc h2 {
  z-index: 1;
  color: whitesmoke;
  /* background-color: aliceblue; */
  opacity: 0.8;
  font-size: 20px;
}

.card-mc::before {
  content: "";
  position: absolute;
  width: 80px;
  background-image: linear-gradient(180deg, rgb(51, 255, 0), rgb(48, 255, 183));
  height: 80px;
  /* animation: rotBGimg 3s linear infinite; */
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card-mc::after {
  content: "";
  position: absolute;
  background: #07182e;
  inset: 4px;
  border-radius: 10px;
}

.card-mc-stop {
  width: 80px;
  height: 80px;
  background: #07182e;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 10px;
}

.card-mc-stop h2 {
  z-index: 1;
  color: whitesmoke;
  /* background-color: aliceblue; */
  opacity: 0.8;
  font-size: 20px;
}

.card-mc-stop::before {
  content: "";
  position: absolute;
  width: 80px;
  background-image: linear-gradient(
    180deg,
    rgb(255, 0, 119),
    rgb(255, 48, 238)
  );
  height: 80px;
  animation: rotBGimg 3s linear infinite;
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card-mc-stop::after {
  content: "";
  position: absolute;
  background: #07182e;
  inset: 4px;
  border-radius: 10px;
}
</style>