<template>
  <div class="col-6 mt-2 px-1 py-0 text-dark">
    <div
      id="cardProd"
      :class="`card shadow bg-dark w-100 ${propsLine.borderStatus} p-1`"
      style="height: 100%; min-height: 170px"
      @click="goToDetailsLine(propsLine.fline)"
    >
      <div class="row p-0 m-0">
        <div
          class="col-7 text-left text-light title-text px-1 py-0"
          style="font-size: 25px"
        >
          {{ propsLine.fline }}
          <b-skeleton v-if="skeletonLoading"></b-skeleton>
        </div>
        <div
          v-if="propsLine.isStop != 0"
          :class="`col-5 text-left text-light title-text px-1 d-flex justify-content-center align-items-center py-0 ${propsLine.bgStatus}`"
          style="font-size: 10px"
        >
          <p class="m-0 p-0">Stop: {{ propsLine.durCurrentStop }} Min</p>
          <b-skeleton v-if="skeletonLoading"></b-skeleton>
        </div>
        <div
          v-else
          class="
            col-5
            text-left text-light
            title-text
            px-1
            bg-success
            d-flex
            justify-content-center
            align-items-center
            py-0
          "
          style="font-size: 20px"
        >
          <p class="m-0 p-0" scrollamount="3">RUNNING</p>
          <b-skeleton v-if="skeletonLoading"></b-skeleton>
        </div>
      </div>
      <!-- VM -->
      <div class="row d-flex align-items-center p-0 m-0">
        <div class="col-6 d-flex justify-content-center p-0">
          <vm-progress
            type="circle"
            :width="containerActiveProblem.length > 0 ? 80 : 100"
            :percentage="`${
              propsLine.fline.includes('DC') ? 97.3 : propsLine.oee
            }`"
            status="success"
          >
            <strong class="text-center title-text">
              <b style="font-size: 20px">OEE</b> <br />
              <b style="font-size: 30px">
                {{ propsLine.fline.includes("DC") ? 97.3 : propsLine.oee }}%
              </b>

              <!-- {{ propsLine.oee + "%" }} -->
              <b-skeleton v-if="skeletonLoading"></b-skeleton>
            </strong>
          </vm-progress>
        </div>
        <div class="col-6 p-0 mt-3" style="height: 70px">
          <div class="card">
            <div class="row p-0 m-0">
              <div
                class="col-12 p-0 d-flex justify-content-center title-text"
                style="font-size: 18px"
              >
                MT Call
              </div>
            </div>
            <div class="row p-0 m-0">
              <div
                class="col-12 p-0 d-flex justify-content-center title-text"
                style="font-size: 18px"
              >
                {{ propsLine.durMtCall + " Min" }}
                <b-skeleton v-if="skeletonLoading"></b-skeleton>
              </div>
            </div>
          </div>
          <div class="row p-0 m-0">
            <div
              class="col-12 text-light p-0 d-flex justify-content-center"
              style="
                font-family: Roboto, sans-serif;
                font-weight: 800;
                font-size: 18px;
              "
            >
              {{
                propsLine.fline.includes("DC") ? "241/304" : propsLine.output
              }}
              <!-- {{ propsLine.output }} -->
              <b-skeleton v-if="skeletonLoading"></b-skeleton>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Problem -->
      <div
        class="row p-0 m-0 rounded-all"
        v-if="containerActiveProblem.length > 0"
        style="max-height: 34px; overflow: auto"
      >
        <div
          class="
            col
            bg-light
            text-danger
            card
            p-2
            m-0
            text-center
            border-danger
          "
          style="height: 34px; overflow: auto"
          v-for="item in containerActiveProblem"
          :key="item.fid"
        >
          <span
            style="font-size: 10px"
            v-b-tooltip.hover.html.left="tipMethod(item)"
            >{{ item.ferror_name }} <b>|</b> {{ item.foperator }} <b>|</b>
            {{ item.fdur }} min</span
          >
        </div>
      </div>
      <!-- INFO STILL LOADING-->
      <div class="text-center">
        <v-dialog v-model="info" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2"> Info </v-card-title>

            <v-card-text>
              Tunggu Sebentar sedang mengambil data pencapaian produksi
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="info = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CardProd",
  data() {
    return {
      info: false,
      skeletonLoading: false,
      containerActiveProblem: [],
    };
  },
  props: {
    propsLine: Object,
    propsLoading: Boolean,
  },
  watch: {
    propsLine: function () {
      this.info = false;
    },
    propsLoading: function () {
      this.skeletonLoading = this.propsLoading;
    },
  },
  methods: {
    goToDetailsLine(line) {
      if (line) {
        this.$router.push(`/detailsLine?v_=${line}`);
      } else {
        this.info = true;
      }
    },
    async getActiveProblem(line) {
      let uri = `${process.env.VUE_APP_HOST}/activeProblem?fline=${line}`;
      await axios
        .get(uri)
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          this.containerActiveProblem = result.data.data;
        })
        .catch((err) => {
          console.log(err);
          // this.getActiveProblem()
        });
    },
    tipMethod(item) {
      let containerRepair = [];
      if (item.fstep_repair) {
        let splitRepair = item.fstep_repair.split("\n");
        for (let i = 0; i < splitRepair.length; i++) {
          const element = splitRepair[i];
          containerRepair.push(`${i + 1}.${element}`);
        }
      }
      return `<table class="table table-bordered">
          <tr>
            <th scope="cols">Problem</th>
            <td class="text-left">${item.ferror_name}</td>
          </tr>
          <tr>
            <th scope="cols">Operator</th>
            <td class="text-left">${item.foperator}</td>
          </tr>
          <tr>
            <th scope="cols">Duration</th>
            <td class="text-left">${item.fdur} min</td>
          </tr>
          <tr>
            <th scope="cols">Step Repair</th>
            <td class="text-left">${
              containerRepair.length > 0
                ? containerRepair.join("\n")
                : "belum ada repair"
            }</td>
          </tr>
        </table>`;
    },
  },
  mounted() {
    console.log(this.propsLine);
    if (this.propsLine.fline) {
      this.getActiveProblem(this.propsLine.fline);
    }
    setInterval(() => {
      this.getActiveProblem(this.propsLine.fline);
    }, 60000);
  },
};
</script>

<style>
#cardProd:active {
  border: 1px solid yellow;
  background-color: rgba(249, 255, 76, 0.4) !important;
}
</style>