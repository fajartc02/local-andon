<template>
  <div class="container p-1">
    <div class="row m-0 p-0 mt-2 bordered">
      <p class="text-left">
        Hallo, <b>{{ name }}</b>
        <br />
        This web can visit link:<code
          ><a
            href="https://smartandonsys.web.app"
            target="_blank"
            style="text-decoration: none"
            >https://smartandonsys.web.app</a
          ></code
        >
      </p>
      <div class="col-12 p-0">
        <features-menu :isStaff="isStaff"></features-menu>
      </div>
    </div>
    <div class="row m-0 p-0 mt-1">
      <div :class="`${isProd ? 'col-12 p-0' : 'col-12 p-0'}`">
        <div style="width: 100%; display: none" id="reader"></div>
        <div class="card">
          <div
            class="btn btn-info"
            data-toggle="modal"
            data-target="#exampleModal"
            @click="getMachines()"
            style="height: 50px"
          >
            <h1
              class="title-text"
              :style="`color: black; font-size: ${isMobile ? '18px' : '25px'}`"
            >
              <i class="fa fa-bell"></i>
              MACHINE STOP INPUT
              <i class="fa fa-bell"></i>
            </h1>
          </div>
        </div>
        <v-dialog v-model="isKyDialog" persistent width="500">
          <v-card class="p-1">
            <v-card-title class="d-flex headline grey lighten-2">
              <b>E - S</b
              ><small class="align-items-end pt-2" style="font-size: 15px"
                >hort</small
              >
              <b class="ml-2">KY</b>
            </v-card-title>
            <v-card-text class="p-1">
              <h6 class="text-left mt-2 pl-0">
                Machine: {{ machineSelected }}
              </h6>
              <router-link
                class="text-decoration-none text-left text-success text-weight-bold"
                :to="`/ky-machines?fline=${selectedLine.toUpperCase()}&fid=${fmc_id}`"
              >
                Tambah KY (klik disini!)
              </router-link>
              <hr class="m-0 p-1" />
              <div
                class="badge badge-danger badge-pill text-center font-weight-bold"
              >
                Terjepit
              </div>
              <div
                class="badge badge-warning badge-pill text-center font-weight-bold"
              >
                Tertimpa
              </div>
              <div
                class="badge badge-info badge-pill text-center font-weight-bold"
              >
                Tertabrak
              </div>
              <div
                class="badge badge-primary badge-pill text-center font-weight-bold"
              >
                Terjatuh
              </div>
              <div
                class="badge badge-secondary badge-pill text-center font-weight-bold"
              >
                Tersetrum
              </div>
              <div
                class="badge badge-dark badge-pill text-center font-weight-bold"
              >
                Terbakar
              </div>
              <div
                class="badge badge-light badge-pill text-center font-weight-bold"
              >
                Other
              </div>
              <hr class="m-0 p-1" />
              <template v-if="kyData.length > 0">
                <div
                  v-for="(item, index) in kyData"
                  :key="index"
                  class="row text-left"
                >
                  <div class="col-12 d-flex align-items-center">
                    <div class="m-0 align-items-center">
                      <div
                        v-if="item.stop6_category == 'A'"
                        class="badge badge-danger badge-pill text-center font-weight-bold"
                      >
                        Terjepit
                      </div>
                      <div
                        v-if="item.stop6_category == 'B'"
                        class="badge badge-warning badge-pill text-center font-weight-bold"
                      >
                        Tertimpa
                      </div>
                      <div
                        v-if="item.stop6_category == 'C'"
                        class="badge badge-info badge-pill text-center font-weight-bold"
                      >
                        Tertabrak
                      </div>
                      <div
                        v-if="item.stop6_category == 'D'"
                        class="badge badge-primary badge-pill text-center font-weight-bold"
                      >
                        Terjatuh
                      </div>
                      <div
                        v-if="item.stop6_category == 'E'"
                        class="badge badge-secondary badge-pill text-center font-weight-bold"
                      >
                        Tersetrum
                      </div>
                      <div
                        v-if="item.stop6_category == 'F'"
                        class="badge badge-dark badge-pill text-center font-weight-bold"
                      >
                        Terbakar
                      </div>
                      <br />
                      <div
                        v-if="item.stop6_category == 'Other'"
                        class="badge badge-light badge-pill text-center font-weight-bold"
                      >
                        Other
                      </div>

                      <p>
                        {{ item.details
                        }}<input
                          class="ml-2"
                          type="checkbox"
                          v-model="item.is_checked"
                        />
                      </p>
                      <img
                        v-if="item.ilustration"
                        :src="item.ilustration"
                        style="width: 100%"
                      />
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <h6 class="text-center">Belum Ada Data KY</h6>
              </template>
              <div class="card p-3">
                <div class="d-flex justify-content-start align-items-center">
                  <input
                    class="mr-2"
                    type="checkbox"
                    :checked="
                      kyData.filter((x) => x.is_checked == true).length ==
                      counter_total_ky
                    "
                    disabled
                  />
                  <h6 class="text-left">
                    Saya "Telah membaca dan memahami terkait bahaya di Atas!"
                  </h6>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <button
                :class="`btn ${
                  kyData.filter((x) => x.is_checked == true).length !=
                  counter_total_ky
                    ? 'btn-danger'
                    : 'btn-success'
                } btn-sm`"
                @click="isKyDialog = false"
                :disabled="
                  kyData.filter((x) => x.is_checked == true).length !=
                  counter_total_ky
                "
              >
                {{
                  kyData.filter((x) => x.is_checked == true).length !=
                  counter_total_ky
                    ? "Baca Dahulu!"
                    : "Saya Paham!"
                }}
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" persistent width="500">
          <v-card class="p-1">
            <v-card-title class="headline grey lighten-2">
              Input Problem
            </v-card-title>

            <v-card-text class="p-0">
              <div class="container-fluid p-0 mt-4">
                <div class="row p-0 m-0">
                  <div class="col p-0">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Machine</span>
                      </div>
                      <!-- <v-select :options="machines" style="width: 75%"></v-select> -->
                      <model-select
                        :options="machines"
                        v-model="machineSelected"
                        placeholder="select machine"
                        style="width: 75%"
                      >
                      </model-select>
                    </div>
                  </div>
                </div>
                <div class="row p-0 m-0">
                  <div class="col p-0">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" style="min-width: 63px"
                          >Line</span
                        >
                      </div>
                      <input
                        type="text"
                        id="line"
                        v-model="selectedLine"
                        class="form-control pl-2"
                        disabled
                        aria-label="Amount (to the nearest dollar)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row p-0 m-0">
                  <div class="col p-0">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Operator</span>
                      </div>
                      <input
                        type="text"
                        id="operator"
                        v-model="operator"
                        class="form-control"
                        aria-label="Amount (to the nearest dollar)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row p-0 m-0" v-if="isProd">
                  <div class="col p-0">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span>Operator MT</span>
                      </div>
                      <multiselect
                        v-model="mtMember"
                        :options="optOperators"
                        :multiple="true"
                        style="font-size: 10px"
                      >
                      </multiselect>
                    </div>
                  </div>
                </div>
                <div class="row p-0 m-0">
                  <div class="col p-0">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Problem</span>
                      </div>

                      <multiselect
                        v-if="!is_new_problem"
                        v-model="problem"
                        :options="optProblems"
                        style="font-size: 10px; width: 75%"
                        :disabled="!selectedLine"
                      >
                      </multiselect>
                      <input
                        v-else
                        type="text"
                        id="problem"
                        v-model="problem"
                        class="form-control"
                        aria-label="Amount (to the nearest dollar)"
                      />
                    </div>
                    <span v-if="selectedLine"
                      >*jika tidak menemukan problem, klik </span
                    ><button
                      v-if="selectedLine"
                      class="btn btn-primary rounded-all"
                      @click="is_new_problem = true"
                    >
                      Add Problem !
                    </button>
                  </div>
                </div>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <button
                type="button"
                @click="problemInput()"
                class="btn btn-success"
              >
                Submit
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="clearSubmit()"
              >
                Close
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
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
    <div class="row m-0 p-0">
      <div class="col-12 p-0">
        {{ timeNow }}
      </div>
    </div>
    <!-- Card PRod -->
    <div class="row m-0 p-0">
      <CardProd
        v-for="line in lineAchivements"
        :key="line.name"
        :propsLine="line"
        :propsLoading="skeletonLoading"
      />
      <div class="col-6 col-lg-3 mt-2 px-1 py-0">
        <div
          id="cardProd"
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
    <UpdateDialog
      :dialog="isShowDialogUpdate"
      :list="listUpdate"
      :oldVersion="oldVersion"
      @dialog-close="isShowDialogUpdate = false"
    />
  </div>
</template>

<script>
import { STATE_TYPE_JOB, STATE_LINES, STATE_GROUP } from "./Job/job.state";
import CardProd from "@/components/CardProd";
import { mapActions, mapState } from "vuex";
import axios from "axios";
import moment from "moment";
import UpdateDialog from "@/components/UpdateDialog/UpdateDialog.vue";

import { ModelSelect } from "vue-search-select";

import formatDate from "@/functions/formatDate";
import FeaturesMenu from "../components/FeaturesMenu.vue";

export default {
  name: "DashboardOld",
  data() {
    return {
      counter_total_ky: 0,
      kyData: [],
      isKyDialog: false,
      isShowDialogUpdate: false,
      listUpdate: [
        // {
        //   type: "new",
        //   name: 'Pengingat Bahaya yang ada pada mesin sebelum kamu input problem, kamu bisa tambahkan item-item safety yang ada di mesin pada menu "KY Machines Data"'
        // },
        // {
        //   type: "new",
        //   name: 'Report LTB Generator Excel, Kamu bisa akses pada screen edit problem problem & bisa download template lalu upload setelah report sudah di perbaiki (pastikan report sudah lengkap yaa!, baru kamu bisa download template LTB nya)'
        // },
        // {
        //   type: "new",
        //   name: 'Saat Input problem, untuk KY machine harus di ceklis terlbih dahulu, baru bisa melanjutkan input problem'
        // },
        // {
        //   type: "enhance",
        //   name: 'KY Machine Data sekarang bisa kamu tambahkan gambarnya!'
        // },
        // {
        //   type: "enhance",
        //   name: 'Input Floating tip dengan notes / comments, dan bisa View mode TABLE / GRAPH'
        // },
        // {
        //   type: "bug",
        //   name: 'fixing temporary action list, Id is not increment'
        // },
        // {
        //   type: "bug",
        //   name: 'fixing chart on realtime pareto machine name did not appear'
        // },
        // {
        //   type: "enhance",
        //   name: 'type here...'
        // }
        //region version 3.8.2
        {
          type: "new",
          name: "Temporary disabled KY Machine Data (Pak Triyanto)",
        },
        {
          type: "bug",
          name: "Step repair tidak terlihat saat download excel",
        },
        // {
        //   type: "enhance",
        //   name: "show symptom management and symptom parameter to front menu",
        // },
        //endregion
      ],
      oldVersion: null,
      isStaff: localStorage.getItem("role") === "STAFF" ? true : false,
      is_new_problem: false,
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
      timeNow: "",
      name: "",
      skeletonLoading: false,
      categoryProblem: false,
      setRole: null,
      jobInput: {
        fline: null,
        farea: null,
        fproblem_id: null,
        fjob_type: "Repair",
        fdesc: null,
        fstart_time: null,
        foperator: null,
      },
      modalShow: false,
      jobTypes: STATE_TYPE_JOB.containers,
      optsLine: STATE_LINES.opts,
      defineGroup: STATE_GROUP.container,
      fline: null,
      farea: null,
      fjob_type: null,
      fdesc: null,
      foperator: null,
      fstart_time: formatDate.YYYYMMDD_HHMM(new Date()).split(" "),
      fend_time: formatDate.YYYYMMDD_HHMM(new Date()).split(" "),
      isLoading: false,
      intervalDays: null,
      isBulk: false,
      windowWidth: window.innerWidth,
      isMobile: false,
      optOperators: [],
      optProblems: [],
      isProd: false,
      mtMember: false,
      intervalId: null,
      notificationId: null,
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
    machineSelected: async function () {
      // console.log(this.machineSelected);
      // let machine = "-1"
      if (this.machineSelected != "") {
        let mcSelected = await this.containerRawMachine.map((mc) => {
          if (mc.fmc_name == this.machineSelected) {
            this.fmc_id = mc.fid;
            return mc.fline;
          } else {
            return null;
          }
        });
        // console.log(mcSelected.sort());
        this.selectedLine = mcSelected.sort()[0];
        // Temporary
        this.isKyDialog = true;
        await this.getKy({ fline: this.selectedLine, fid: this.fmc_id });
      }
    },
    categoryProblem: function () {
      if (this.categoryProblem) {
        this.problem = "[FULLCAP]" + this.problem;
      } else {
        this.problem = this.problem.split("]")[1];
      }
    },
    // lanjut kenepaa foperator masuk mulu
    mtMember: function () {
      this.foperator +=
        "," + this.mtMember.length > 1
          ? this.mtMember.join(",")
          : this.mtMember[0];
    },
    intervalDays: function () {
      let currentDate = new Date(this.fstart_time.join(" ")).getDate();
      let dateAdd = new Date(this.fstart_time.join(" ")).setDate(
        this.intervalDays + currentDate
      );
      this.fend_time = formatDate.YYYYMMDD_HHMM(new Date(dateAdd)).split(" ");
      this.isBulk = true;
    },
    selectedLine: function () {
      this.getProblems();
    },
  },
  methods: {
    async getKy(filter) {
      try {
        this.isLoading = true;
        const rawKy = await axios.get(`${process.env.VUE_APP_HOST}/v2/ky/get`, {
          params: filter,
        });
        console.log(rawKy.data.data[0]);
        this.kyData = rawKy.data.data[0][0].ky_data.sort(
          (ky) => ky.stop6_category
        );
        this.counter_total_ky = rawKy.data.data[0][0].ky_data.length;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        alert(JSON.stringify(error));
      }
    },
    ...mapActions([
      "storeProdAchievments",
      "storeCountProbTemp",
      "storeGetLines",
      "storeGetMachines",
    ]),
    showPersistentNotification() {
      if ("Notification" in window && "serviceWorker" in navigator) {
        if (Notification.permission === "granted") {
          this.showNotification();
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              this.showNotification();
            }
          });
        }
      }
    },
    showNotification() {
      const countdownSeconds = 0; // Set the duration of the countdown in seconds
      let remainingSeconds = countdownSeconds;

      this.intervalId = setInterval(() => {
        remainingSeconds++;
        this.updateNotificationContent(remainingSeconds);
      }, 1000);
      localStorage.setItem("intervalId", this.intervalId);
      this.updateNotificationContent(remainingSeconds);
    },
    updateNotificationContent(remainingSeconds) {
      const notificationTitle = `Problem ${this.problem} masih aktif`;
      const notificationOptions = {
        body: `Tolong jangan closed notifikasi ini sampai Problem closed: ${remainingSeconds} seconds.`,
        requireInteraction: true, // Make the notification persistent
        tag: "Alert",
      };
      navigator.serviceWorker.ready.then(async (registration) => {
        console.log("registration");
        console.log(registration);
        if (!localStorage.getItem("notificationId")) {
          // Create a new notification if one doesn't exist
          await registration
            .showNotification(notificationTitle, notificationOptions)
            .then((notification) => {
              console.log("notification showNotification THEN");
              console.log(notification);
              localStorage.setItem(
                "notificationId",
                notification.notificationId
              );
              this.notificationId = notification.notificationId;
            })
            .catch((error) => {
              console.error("Error showing notification:", error);
            });
        } else {
          // Update the existing notification
          await registration
            .getNotification(localStorage.getItem("notificationId"))
            .then((existingNotification) => {
              existingNotification.close(); // Close the existing notification
              registration
                .showNotification(notificationTitle, notificationOptions)
                .then((notification) => {
                  console.log("notification GET NOTIF THEN");
                  console.log(notification);
                  this.notificationId = notification.notificationId;
                  localStorage.setItem("notificationId", this.notificationId);
                })
                .catch((error) => {
                  console.error("Error showing notification:", error);
                });
            })
            .catch(() => {
              // If the existing notification is not found, create a new one
              registration
                .showNotification(notificationTitle, notificationOptions)
                .then((notification) => {
                  console.log("notification GET NOTIF CATCH");
                  console.log(notification);
                  this.notificationId = notification.notificationId;
                  localStorage.setItem("notificationId", this.notificationId);
                })
                .catch((error) => {
                  console.error("Error showing notification:", error);
                });
            });
        }
      });
    },
    async getProblems() {
      try {
        let problems = await axios.get(
          `${process.env.VUE_APP_HOST}/v2/master/problem?f_line=${this.selectedLine}`
        );
        this.optProblems = problems.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addNewProblem() {
      try {
        let form = {
          line_nm: this.selectedLine,
          prob_nm: this.problem,
          created_by: this.mtMember,
        };
        let resp = await axios.post(
          `${process.env.VUE_APP_HOST}/v2/master/problem`,
          form
        );

        console.log(resp);
      } catch (error) {
        console.error(error);
      }
    },
    goTo(link) {
      this.$router.push(link);
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      console.log(this.windowWidth);
      if (this.windowWidth < 650) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    async problemInput() {
      let { problem, operator, fmc_id } = this;
      if (this.is_new_problem) {
        this.addNewProblem();
      }
      if (this.isProd && !this.mtMember) {
        alert("masukan nama maintenance terlebih dahulu");
      } else {
        let obj = {
          ferror_name: problem,
          foperator: this.mtMember
            ? this.mtMember.join(",") + "," + operator
            : operator,
          fmc_id: fmc_id,
        };
        this.isLoading = true;
        if (problem != "" || operator != "" || fmc_id != "") {
          await axios
            .post(`${process.env.VUE_APP_HOST}/addProblem`, obj)
            .then(async (result) => {
              console.log(result);
              this.jobInput = {
                fline: this.selectedLine,
                farea: this.machineSelected,
                fproblem_id: result.data.data.insertId,
                fjob_type: "Repair",
                fdesc: this.problem,
                fstart_time: formatDate.YYYYMMDD_HHMM(new Date()),
                foperator: this.name,
              };
              if (result.status == 203) {
                alert(result.data.message);
                this.isLoading = false;
              } else {
                this.isLoading = false;
                await axios
                  .post(`${process.env.VUE_APP_HOST}/addJobData`, this.jobInput)
                  .then((result) => {
                    console.log(result);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                this.clearSubmit();
                await this.storeProdAchievments();
              }
            })
            .catch((err) => {
              console.log(err);
              this.isLoading = false;
            });
          this.showPersistentNotification();
        }
      }
    },
    async getColorDash() {
      this.storeProdAchievments();
      this.storeCountProbTemp();
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
      if (localStorage.getItem("area") == "null") {
        this.isProd = true;
      } else {
        this.isProd = false;
      }
      console.log(localStorage.getItem("name"));
      if (!localStorage.getItem("name")) {
        this.$router.push("/login");
      } else {
        this.name = localStorage.getItem("name");
        this.setRole = localStorage.getItem("role");
        this.operator = this.name;
      }
    },
    async submitJob() {
      this.isLoading = true;
      let idxGroup = this.defineGroup.findIndex((item) => {
        return item.type === this.fjob_type;
      });
      if (this.isProd && this.mtMember) {
        // this.jobInput = {
        //         fline: this.selectedLine,
        //         farea: this.machineSelected,
        //         fproblem_id: result.data.data.insertId,
        //         fjob_type: "Repair",
        //         fdesc: this.problem,
        //         fstart_time: formatDate.YYYYMMDD_HHMM(new Date()),
        //         foperator: this.name,
        //       };
        // Please check condition when logging heijunka data
        let newJob = {
          fline: this.selectedLine,
          farea: this.machineSelected,
          fjob_type: "Repair",
          fdesc: this.problem,
          fstart_time: this.fstart_time.join(" "),
          fend_time: this.fend_time.join(" "),
          foperator: this.foperator,
          fgroup: "Repair",
          frole: localStorage.getItem("role")
            ? localStorage.getItem("role")
            : null,
        };
        if (!this.isBulk) {
          await axios
            .post(`${process.env.VUE_APP_HOST}/addJobData`, newJob)
            .then(async () => {
              this.isLoading = false;
              this.modalShow = false;
              alert("Success to add job");
              this.resetFormInput();
            })
            .catch((err) => {
              console.log(err);
              this.isLoading = false;
              alert(JSON.stringify(err));
            });
        } else {
          this.submitBulkJob(newJob);
        }
      } else {
        let newJob = {
          fline: this.fline,
          farea: this.farea,
          fjob_type: this.fjob_type,
          fdesc: this.fdesc,
          fstart_time: this.fstart_time.join(" "),
          fend_time: this.fend_time.join(" "),
          foperator: this.foperator,
          fgroup: this.defineGroup[idxGroup].group,
          frole: localStorage.getItem("role")
            ? localStorage.getItem("role")
            : null,
        };
        if (!this.isBulk) {
          await axios
            .post(`${process.env.VUE_APP_HOST}/addJobData`, newJob)
            .then(async () => {
              this.isLoading = false;
              this.modalShow = false;
              alert("Success to add job");
              this.resetFormInput();
            })
            .catch((err) => {
              console.log(err);
              this.isLoading = false;
              alert(JSON.stringify(err));
            });
        } else {
          this.submitBulkJob(newJob);
        }
      }
    },
    async submitBulkJob(newJob) {
      newJob.intervalDays = this.intervalDays;
      // this.isBulk = false;
      // this.modalShow = false;
      for (const key in newJob) {
        const element = newJob[key];
        if (element) {
          // Nothing
        } else {
          delete newJob[key];
        }
      }
      axios
        .post(`${process.env.VUE_APP_HOST}/bulkAddJobData`, newJob)
        .then((result) => {
          console.log(result);
          alert("success to add job routine");
          this.isLoading = false;
          this.modalShow = false;
          this.resetFormInput();
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    resetFormInput() {
      this.fline = null;
      this.farea = null;
      this.fjob_type = null;
      this.fdesc = null;
      this.foperator = localStorage.getItem("name");
      this.fstart_time = formatDate.YYYYMMDD_HHMM(new Date()).split(" ");
      this.fend_time = formatDate.YYYYMMDD_HHMM(new Date()).split(" ");
      this.intervalDays = null;
    },
    async getAllMtMember() {
      console.log("MASUK MT MEMBER");
      await axios
        .get(`${process.env.VUE_APP_HOST}/getAllMtMember`)
        .then((result) => {
          console.log(result);
          let mapMembers = result.data.data.map((member) => {
            return member.fname;
          });
          this.optOperators = mapMembers;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    CardProd,
    ModelSelect,
    UpdateDialog,
    FeaturesMenu,
  },
  async mounted() {
    let newVersion = "v3.8.10";
    // let newVersion = '2.0.2'
    const newVersionAvailable =
      localStorage.getItem("oldVersion") != newVersion &&
      localStorage.getItem("name") &&
      localStorage.getItem("name") != "Guest";
    if (newVersionAvailable) {
      this.oldVersion = newVersion;
      this.isShowDialogUpdate = true;
      localStorage.setItem("oldVersion", newVersion);
    }
    this.onResize();
    this.skeletonLoading = true;
    if (localStorage.getItem("name")) {
      this.foperator = localStorage.getItem("name");
    }
    await this.getColorDash();
    await this.permissionCheck();
    // let intervalColDash = setInterval(this.storeProdAchievments, 20000);
    // console.log(intervalColDash);
    await this.getMachines(false);
    await this.getAllMtMember();
    let dateConvert = `${moment().format("L").split("/")[1]}/${
      moment().format("L").split("/")[0]
    }/${moment().format("L").split("/")[2]}`;
    this.timeNow = `${dateConvert} ${
      moment().format("MMMM Do YYYY, h:mm:ss a").split(", ")[1]
    }`;
    let intervalStart = setInterval(this.intervalTime, 1000);
    console.log(intervalStart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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