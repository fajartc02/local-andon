<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-12">
        <h2>LTB Report Status</h2>
        <p>Problem (>= 120 min)</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 p-0">
        <LegendStatus />
      </div>
    </div>
    <div class="row">
      <div class="col-12 p-0">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Table Summary" active>
              <div class="row">
                <div class="col-12 p-0">
                  <div class="tableFixHead">
                    <div class="card">
                      <b-input-group size="sm" prepend="Name">
                        <b-form-input placeholder="name TL/GL" v-model="findLeader"></b-form-input>
                      </b-input-group>
                    </div>
                    <Spinner2 v-if="isLoading" />
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th v-if="!isMobile">Date</th>
                          <th v-if="!isMobile">Mesin</th>
                          <th>
                            {{ isMobile ? "Mesin" : "Problem Description" }}
                          </th>
                          <th v-if="!isMobile">Duration</th>
                          <th>TL</th>
                          <th>GL</th>
                          <th>
                            TL <br />
                            Check
                          </th>
                          <th>
                            GL <br />
                            Check
                          </th>
                          <th>
                            SH <br />
                            Check
                          </th>
                          <th>
                            Mgr <br />
                            Check
                          </th>
                        </tr>
                      </thead>
                      <tbody v-for="(item, i) in tableProblemFup" :key="item.fid">
                        <tr>
                          <td>{{ i + 1 }}</td>
                          <td v-if="!isMobile">
                            {{ item.fstart_time.split('T')[0] }}
                          </td>
                          <td v-if="!isMobile">
                            {{ item.fmc_name }}
                          </td>
                          <td class="text-left pl-2">
                            <router-link :to="`/editProblem?v_=${item.fid}`">{{
                              isMobile ? item.fmc_name : item.ferror_name
                            }}</router-link>
                          </td>
                          <td v-if="!isMobile">
                            {{ item.fdur }}
                          </td>
                          <td>{{ item.tlName }}</td>
                          <td>{{ item.glName }}</td>
                          <td>
                            <div :class="`${item.tlCheck} text-center`">
                              <span style="font-size: 6px">.</span>
                            </div>
                          </td>
                          <td>
                            <div :class="`${item.lhCheck} text-center`">
                              <span style="font-size: 6px">.</span>
                            </div>
                          </td>
                          <td>
                            <div :class="`${item.shCheck} text-center`">
                              <span style="font-size: 6px">.</span>
                            </div>
                          </td>
                          <td>
                            <div :class="`${item.dhCheck} text-center`">
                              <span style="font-size: 6px">.</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab title="Grafik Summary">
              <div class="row">
                <div class="col-12">
                  <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../components/BarChart.js";
import axios from "axios";
import qs from "qs";
import Spinner2 from "@/components/spinner/Spinner-2";
import LegendStatus from "@/components/LegendStatus";

export default {
  name: "SummaryWeekly",
  data() {
    return {
      containerDataHerman: [],
      containerDataHartanto: [],
      containerDataWahyu: [],
      containerDataTriyanto: [],
      containerProblemFup: [],
      // name: "",
      datacollection: {
        labels: ["HERMAN", "HARTANTO", "WAHYU", "TRIYANTO"],
        datasets: [
          {
            label: "Blm Close",
            backgroundColor: "#f75492",
            data: [0, 0, 0, 0],
          },
          {
            label: "Close",
            backgroundColor: "#5954f7",
            data: [0, 0, 0, 0],
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          display: true,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 12,
                min: 0,
              },
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Jumlah",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 12,
                min: 0,
              },
              stacked: true,
            },
          ],
        },
      },
      valGraph: [],
      containerTl: [
        {
          line: "CYLINDER BLOCK",
          shift: "w",
          name: "M. BAGUS",
        },
        {
          line: "CRANK SHAFT",
          shift: "w",
          name: "M. BAGUS",
        },
        {
          line: "CAM SHAFT",
          shift: "w",
          name: "SUPRIYANTO",
        },
        {
          line: "CYLINDER HEAD",
          shift: "w",
          name: "SUPRIYANTO",
        },
        {
          line: "HPDC",
          shift: "w",
          name: "Mugiyono",
        },
        {
          line: "LPDC",
          shift: "w",
          name: "ADI S",
        },
        {
          line: "ASSY LINE",
          shift: "w",
          name: "ADISTYA",
        },
        {
          line: "CYLINDER BLOCK",
          shift: "r",
          name: "ERWIN",
        },
        {
          line: "CRANK SHAFT",
          shift: "r",
          name: "ERWIN",
        },
        {
          line: "CAM SHAFT",
          shift: "r",
          name: "MAULANA",
        },
        {
          line: "CYLINDER HEAD",
          shift: "r",
          name: "MAULANA",
        },
        {
          line: "HPDC",
          shift: "r",
          name: "DIDI I",
        },
        {
          line: "LPDC",
          shift: "r",
          name: "SAZALI",
        },
        {
          line: "ASSY LINE",
          shift: "r",
          name: "W. ADAM",
        },
      ],
      containerGl: [
        {
          line: "CYLINDER BLOCK",
          shift: "w",
          name: "FERDIANSYAH",
        },
        {
          line: "CRANK SHAFT",
          shift: "w",
          name: "FERDIANSYAH",
        },
        {
          line: "CAM SHAFT",
          shift: "w",
          name: "FERDIANSYAH",
        },
        {
          line: "CYLINDER HEAD",
          shift: "w",
          name: "FERDIANSYAH",
        },
        {
          line: "HPDC",
          shift: "w",
          name: "TRIYANTO",
        },
        {
          line: "LPDC",
          shift: "w",
          name: "TRIYANTO",
        },
        {
          line: "ASSY LINE",
          shift: "w",
          name: "FERDIANSYAH",
        },
        {
          line: "CYLINDER BLOCK",
          shift: "r",
          name: "WAHYU SUWARNO",
        },
        {
          line: "CRANK SHAFT",
          shift: "r",
          name: "WAHYU SUWARNO",
        },
        {
          line: "CAM SHAFT",
          shift: "r",
          name: "WAHYU SUWARNO",
        },
        {
          line: "CYLINDER HEAD",
          shift: "r",
          name: "WAHYU SUWARNO",
        },
        {
          line: "HPDC",
          shift: "r",
          name: "HARTANTO",
        },
        {
          line: "LPDC",
          shift: "r",
          name: "HARTANTO",
        },
        {
          line: "ASSY LINE",
          shift: "r",
          name: "WAHYU SUWARNO",
        },
      ],
      containerSh: [
        {
          line: "CYLINDER BLOCK",
          shift: "w",
          name: "ABIDIN",
        },
        {
          line: "CRANK SHAFT",
          shift: "w",
          name: "ABIDIN",
        },
        {
          line: "CAM SHAFT",
          shift: "w",
          name: "ABIDIN",
        },
        {
          line: "CYLINDER HEAD",
          shift: "w",
          name: "ABIDIN",
        },
        {
          line: "HPDC",
          shift: "w",
          name: "ARIS B",
        },
        {
          line: "LPDC",
          shift: "w",
          name: "ARIS B",
        },
        {
          line: "ASSY LINE",
          shift: "w",
          name: "ABIDIN",
        },
        {
          line: "CYLINDER BLOCK",
          shift: "r",
          name: "ARIS BUDIANTO",
        },
        {
          line: "CRANK SHAFT",
          shift: "r",
          name: "ARIS BUDIANTO",
        },
        {
          line: "CAM SHAFT",
          shift: "r",
          name: "ARIS BUDIANTO",
        },
        {
          line: "CYLINDER HEAD",
          shift: "r",
          name: "ARIS BUDIANTO",
        },
        {
          line: "HPDC",
          shift: "r",
          name: "DEDE S",
        },
        {
          line: "LPDC",
          shift: "r",
          name: "DEDE S",
        },
        {
          line: "ASSY LINE",
          shift: "r",
          name: "ARIS BUDIANTO",
        },
      ],
      tableProblemFup: [],
      isLoading: false,
      findLeader: null,
      windowWidth: window.innerWidth,
      isMobile: false,
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      console.log(this.windowWidth);
      if (this.windowWidth < 650) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
      console.log(this.isMobile);
    },
    sendMessageWa(msg, no_receiver) {
      let message = msg;
      let receiverNo = no_receiver;
      // VUE_APP_HOST
      this.configWa(message, receiverNo);
    },
    configWa(msg, receiverNo) {
      var data = qs.stringify({
        token: process.env.VUE_APP_TKNWA,
        number: receiverNo,
        message: msg,
      });
      var config = {
        method: "post",
        url: "https://app.ruangwa.id/api/send_express",
        headers: {},
        data: data,
      };

      axios(config)
        .then(function (response) {
          alert(JSON.stringify(response.data));
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          alert(error);
          console.log(error);
        });
    },
    checkStatus(state) {
      // 1: approveCm, 2: delay, 3: comment, 4: none,
      if (state == 1) {
        return "dotApprove";
      } else if (state == 2) {
        return "dotDelay";
      } else if (state == 3) {
        return "dotComment";
      } else {
        return "dot";
      }
    },
  },
  watch: {
    containerProblemFup: function () {
      console.log(this.containerProblemFup);
    },
    findLeader: function () {
      console.log(this.findLeader);
      let tmpTable = this.containerProblemFup.filter((item) => {
        console.log(item.glName.toUpperCase());
        console.log(item.glName.includes(this.findLeader.toUpperCase()));
        if (
          item.glName.toUpperCase().includes(this.findLeader.toUpperCase()) ||
          item.tlName.toUpperCase().includes(this.findLeader.toUpperCase())
        ) {
          return item;
        }
      });
      this.tableProblemFup = tmpTable;
    },
  },
  components: {
    BarChart,
    Spinner2,
    LegendStatus,
  },
  async mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.onResize();
    // this.name = localStorage.getItem("name");
    this.isLoading = true;
    this.containerProblemFup = [];
    await axios
      .get(`${process.env.VUE_APP_HOST}/delayProblemCm`)
      .then((result) => {
        //   0: FERDIANSYAH, 1: HARTANTO, 2: WAHYU SUWARNO, 3: TRIYANTO
        this.isLoading = false;
        this.containerDataHerman = result.data.data[0];
        this.containerDataHartanto = result.data.data[1];
        this.containerDataWahyu = result.data.data[2];
        let combineProblem = [
          ...result.data.data[8],
          ...result.data.data[9],
        ].sort((a, b) =>
          a.fstart_time > b.fstart_time
            ? 1
            : b.fstart_time > a.fstart_time
              ? -1
              : 0
        );
        console.log(result.data.data[8]);
        console.log(result.data.data[9]);
        console.log(combineProblem);
        this.containerDataTriyanto = [];
        console.log(combineProblem);
        combineProblem.forEach((item) => {
          if (item.glName == "TRIYANTO") {
            if (item.cmLhApprove) {
              this.containerDataTriyanto += 1;
            }
            this.containerDataTriyanto.push(item);
          }
        });
        let mapProblemFup = combineProblem.map((item) => {
          // console.log(item);
          let idxTl = this.containerTl.findIndex(
            (x) =>
              x.line.toUpperCase() == item.fline.toUpperCase() &&
              x.shift == item.fshift
          );
          let idxGl = this.containerGl.findIndex(
            (x) =>
              x.line.toUpperCase() == item.fline.toUpperCase() &&
              x.shift == item.fshift
          );
          // console.log(item);
          // console.log(this.containerTl[idxTl].name);
          if (this.containerTl[idxTl].name) {
            item.tlName = this.containerTl[idxTl].name;
          } else {
            item.tlName = "";
          }
          if (this.containerGl[idxGl].name) {
            item.glName = this.containerGl[idxGl].name;
          } else {
            item.glName = "";
          }
          // 1: approve, 2: delay, 3: comment, 4: none
          if (item.fpermanet_cm == "[]" && item.fpermanet_cm_lama == "[]") {
            item.tlCheck = item.tlCheck = this.checkStatus(2);
          } else {
            item.tlCheck = item.tlCheck = this.checkStatus(1);
          }

          if (item.cmLhApprove == 0) {
            let diffInTime =
              new Date().getTime() - new Date(item.fstart_time).getTime();
            let diffDay = diffInTime / (1000 * 3600 * 24);
            if (
              diffDay >= 1 &&
              (String(item.cmLhFeedback) == "null" || item.cmLhFeedback == "")
            ) {
              item.lhCheck = this.checkStatus(2);
            } else if (String(item.cmLhFeedback) != "null") {
              item.lhCheck = this.checkStatus(3);
            } else {
              item.lhCheck = this.checkStatus(4);
            }
          } else if (item.cmLhApprove == 1) {
            item.lhCheck = this.checkStatus(1);
          }

          if (item.cmShApprove == 0) {
            let diffInTime =
              new Date().getTime() - new Date(item.fstart_time).getTime();
            let diffDay = diffInTime / (1000 * 3600 * 24);
            if (
              diffDay >= 2 &&
              (String(item.cmShFeedback) == "null" || item.cmShFeedback == "")
            ) {
              item.shCheck = this.checkStatus(2);
            } else if (String(item.cmShFeedback) != "null") {
              item.shCheck = this.checkStatus(3);
            } else {
              item.shCheck = this.checkStatus(4);
            }
          } else if (item.cmShApprove == 1) {
            item.shCheck = this.checkStatus(1);
          }
          if (item.cmDhApprove == 'null') {
            item.cmDhApprove = 0
          }
          if (item.cmDhApprove == 0) {
            let diffInTime =
              new Date().getTime() - new Date(item.fstart_time).getTime();
            let diffDay = diffInTime / (1000 * 3600 * 24);
            if (
              diffDay >= 3 &&
              (String(item.cmDhFeedback) == "null" ||
                String(item.cmDhFeedback) == "")
            ) {
              item.dhCheck = this.checkStatus(2);
            } else if (String(item.cmDhFeedback) != "null") {
              item.dhCheck = this.checkStatus(3);
            } else {
              item.dhCheck = this.checkStatus(4);
            }
          } else if (item.cmDhApprove == 1) {
            item.dhCheck = this.checkStatus(1);
          }
          if (item.ferror_name == 'Servo alarm A498 & A46F (Master error)') {
            console.log(item);
            console.log();
          }
          return item;
        });
        this.containerProblemFup = mapProblemFup;
        this.tableProblemFup = mapProblemFup;
        this.datacollection = {
          labels: ["TRIYANTO", "HARTANTO", "WAHYU SUWARNO", "HARTANTO"],
          datasets: [
            {
              label: "Blm Close",
              backgroundColor: "#f75492",
              data: result.data.count,
            },
            {
              label: "Sudah Close",
              backgroundColor: "#5954f7",
              data: result.data.countFin,
            },
          ],
        };
      })
      .catch((err) => {
        console.log(err);
      });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style>
.v-application ul,
.v-application ol {
  padding-left: 0px;
}

td {
  font-size: 12px;
}

.tableFixHead {
  overflow: auto;
  height: 70vh;
}

.tableFixHead thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}

/* Just common table stuff. Really. */
table {
  border-collapse: collapse;
  width: 100%;
}

/* .card {
  background-color: transparent !important;
} */
th,
td {
  padding: 8px 16px;
  font-size: 12px;
}

th {
  background: #eee;
}

.dot {
  height: 25px;
  width: 25px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid black;
}

.dotDelay {
  height: 25px;
  width: 25px;
  background-color: #fc5555;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid black;
}

.dotApprove {
  height: 25px;
  width: 25px;
  background-color: #00ff3b;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid black;
}

.dotComment {
  height: 25px;
  width: 25px;
  background-color: yellow;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid black;
}
</style>