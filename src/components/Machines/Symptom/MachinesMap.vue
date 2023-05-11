<template>
  <div>
    <Loading :propsLoading="isLoading" />
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
                    <h2>Parameter Breakdown</h2>
                  </button>
                </div>
                <div class="col-1 border">
                  <button class="card-mc-warn mx-auto">
                    <h2>Parameter Warning</h2>
                  </button>
                </div>
                <div class="col-1 border">
                  <button class="card-mc mx-auto">
                    <h2>Parameter Normal</h2>
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
import Machine from "@/components/Machines/Symptom/Machine";
import axios from "axios";
import { mapState, mapActions } from "vuex";
import formatDate from "@/functions/formatDate";
import Loading from "@/components/Loading";
export default {
  name: "ContainerMachines",
  data() {
    return {
      model: 0,
      clock: formatDate.YYYYMMDD_HHMMSS(new Date()),
      lines: [],
      startDate: formatDate.YYYYMMDD_HHMM(
        new Date(new Date().getTime() - 1000 * 60 * 3)
      ),
      endDate: formatDate.YYYYMMDD_HHMM(new Date()),
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["stateProdAchievements"]),
  },
  props: {
    propsLineIdSelected: Number,
  },
  watch: {
    propsLineIdSelected: function () {
      this.getMachinesStatus();
    },
  },
  methods: {
    ...mapActions(["storeProdAchievments"]),
    updateTime() {
      this.clock = formatDate.YYYYMMDD_HHMMSS(new Date());
    },
    async getMachinesStatus() {
      this.isLoading = true;
      await axios
        .get(
          `${process.env.VUE_APP_HOST}/symptom/parameters/machinesStatus?line_id=${this.propsLineIdSelected}&start=${this.startDate}&end=${this.endDate}`
        )
        .then((result) => {
          this.lines = result.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          // alert(err);
          console.log(err);
          this.isLoading = false;
        });
    },
  },
  components: {
    Machine,
    Loading,
  },
  async mounted() {
    this.getMachinesStatus();
    setInterval(() => {
      this.updateTime();
    }, 1000);
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

.card-mc-warn {
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

.card-mc-warn h2 {
  z-index: 1;
  color: whitesmoke;
  /* background-color: aliceblue; */
  opacity: 0.8;
  font-size: 20px;
}

.card-mc-warn::before {
  content: "";
  position: absolute;
  width: 80px;
  background-image: linear-gradient(
    180deg,
    rgb(255, 145, 0),
    rgb(255, 234, 48)
  );
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

.card-mc-warn::after {
  content: "";
  position: absolute;
  background: #07182e;
  inset: 4px;
  border-radius: 10px;
}
</style>