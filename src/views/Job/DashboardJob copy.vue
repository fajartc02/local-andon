<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-6">
        <b-button
          @click="modalShow = !modalShow"
          class="text-light w-100"
          variant="info"
        >
          Input Job
        </b-button>
      </div>
      <div class="col-6">
        <router-link to="/job/yamazumi">
          <b-button class="text-light w-100" variant="info">
            Yamazumi Graph
          </b-button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div
        class="col px-0 borderSide"
        v-for="(item, i) in containerLines"
        :key="i"
      >
        <div class="row p-0 m-0">
          <div class="col p-0 border-bottom">
            <b>{{ item.name }}</b>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>OEE</th>
              <th>MT Call</th>
              <th>Act/Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-success">
                <b>{{ containerOee[i].oee }} %</b>
              </td>
              <td class="text-danger">{{ containerOee[i].durMtCall }} min</td>
              <td>
                <b>{{ containerOee[i].output }}</b>
              </td>
            </tr>
          </tbody>
        </table>
        <!--  -->
        <div class="row p-0 m-0">
          <div class="col p-0">
            <div
              class="bg-primary"
              style="height: 100px; position: absolute"
            ></div>
            <table class="table table-bordered">
              <tr>
                <td colspan="2">Day</td>
              </tr>
              <tr>
                <th>Jam</th>
                <th>Job Desc</th>
              </tr>
              <tbody>
                <tr v-for="(time, idxTime) in dayTimes" :key="time">
                  <td style="width: 9px; height: 60px">{{ time }}</td>
                  <td v-if="idxTime == 0" rowspan="10">
                    <div
                      v-for="(problem, idxProb) in item.dataProblem[0]"
                      :key="idxProb"
                      class="borderAll text-dark text-left p-0 text-center"
                      v-b-tooltip.hover.html.left="detailTip(problem)"
                      :style="`
                        position: absolute;
                        height: ${
                          Number(problem.fdur) + Number(problem.startPx) >= 600
                            ? Number(problem.fdur) +
                              Number(problem.startPx) -
                              615 -
                              36
                            : problem.fdur
                        }px;
                        width: 82%;
                        top: ${problem.startPx}px;
                        cursor: pointer;
                        background-color: ${problem.bgCol}!important
                      `"
                    >
                      {{ problem.fjob_type }}
                      ({{ problem.fdur }} min)
                      <img
                        v-if="problem.fimage"
                        :src="`${mainUrl}/image?path=${problem.fimage}`"
                        alt=""
                        width="20"
                        height="20"
                      /><img
                        v-else
                        src="@/assets/img/1.jpg"
                        alt=""
                        width="20"
                        height="20"
                      />
                      <button
                        class="btn-sm btn-danger p-1 py-0"
                        @click="removeJob(problem.fid)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                      <!-- <b-button @click="modalShowEdit = !modalShowEdit">
                        <i class="fa fa-pencil"></i>
                      </b-button> -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table table-bordered">
              <tr>
                <td colspan="2">Night</td>
              </tr>
              <tr>
                <th>Jam</th>
                <th>Job Desc</th>
              </tr>
              <tr v-for="(time, idxTime) in nightTimes" :key="time">
                <td style="width: 9px; height: 60px">{{ time }}</td>
                <td v-if="idxTime == 0" rowspan="10">
                  <div
                    v-for="(problem, idxProb) in item.dataProblem[1]"
                    :key="idxProb"
                    class="
                      borderAll
                      text-dark text-left
                      p-1
                      text-center
                      py-auto
                    "
                    v-b-tooltip.hover.html.left="detailTip(problem)"
                    :style="`
                        position: absolute;
                        height: ${
                          Number(problem.fdur) + Number(problem.startPx) >= 1305
                            ? Number(problem.fdur) +
                              Number(problem.startPx) -
                              1270 -
                              36
                            : problem.fdur
                        }px;
                        width: 82%;
                        top: ${problem.startPx}px;
                        cursor: pointer;
                        background-color: ${problem.bgCol}!important
                      `"
                  >
                    {{ problem.fjob_type }}
                    ({{ problem.fdur }} min)
                    <img
                      v-if="problem.fimage"
                      :src="`${mainUrl}/image?path=${problem.fimage}`"
                      alt=""
                      width="20"
                      height="20"
                    /><img
                      v-else
                      src="@/assets/img/1.jpg"
                      alt=""
                      width="20"
                      height="20"
                    />
                    <button
                      class="btn-sm btn-danger p-1 py-0"
                      @click="removeJob(problem.fid)"
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                    <br />
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="modalShow">Hello From Modal!</b-modal>
    <!-- <b-button @click="modalShow = !modalShow">Open Modal</b-button> -->
    <b-modal v-model="modalShow">
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
        <h5>Input Job</h5>
      </template>
      <b-tabs content-class="mt-3">
        <b-tab title="Single" active>
          <div class="container-fluid p-0 mt-4">
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style="min-width: 20%"
                      >Job Type</span
                    >
                  </div>
                  <b-form-select
                    size="sm"
                    v-model="fjob_type"
                    :options="jobTypes"
                  ></b-form-select>
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style="min-width: 100px"
                      >Area / Mesin</span
                    >
                  </div>
                  <input
                    type="text"
                    id="line"
                    v-model="farea"
                    class="form-control pl-2"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style="min-width: 20%"
                      >Kamu Line Mana?</span
                    >
                  </div>
                  <select class="form-control" v-model="fline">
                    <option
                      v-for="(line, i) in optsLine"
                      :key="i"
                      :value="line"
                    >
                      {{ line }}
                    </option>
                  </select>
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
                    v-model="foperator"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Description</span>
                  </div>
                  <input
                    type="text"
                    v-model="fdesc"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Start Date</span>
                  </div>
                  <div class="row m-0 p-0">
                    <div class="col-7 p-0">
                      <input
                        style="font-size: 10px"
                        class="form-control"
                        type="date"
                        v-model="fstart_time[0]"
                      />
                    </div>
                    <div class="col-5 p-0">
                      <input
                        class="form-control"
                        type="time"
                        v-model="fstart_time[1]"
                        pattern="([1]?[0-9]|2[0-3]):[0-5][0-9]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Finish Date</span>
                  </div>
                  <div class="row m-0 p-0">
                    <div class="col-7 p-0">
                      <input
                        style="font-size: 10px"
                        class="form-control"
                        type="date"
                        v-model="fend_time[0]"
                      />
                    </div>
                    <div class="col-5 p-0">
                      <input
                        class="form-control"
                        type="time"
                        v-model="fend_time[1]"
                        pattern="([1]?[0-9]|2[0-3]):[0-5][0-9]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Routine">
          <div class="container-fluid p-0 mt-4">
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style="min-width: 20%"
                      >Job Type</span
                    >
                  </div>
                  <b-form-select
                    size="sm"
                    v-model="fjob_type"
                    :options="jobTypes"
                  ></b-form-select>
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style="min-width: 100px"
                      >Area / Mesin</span
                    >
                  </div>
                  <input
                    type="text"
                    id="line"
                    v-model="farea"
                    class="form-control pl-2"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style="min-width: 20%"
                      >Kamu Line Mana?</span
                    >
                  </div>
                  <select class="form-control" v-model="fline">
                    <option
                      v-for="(line, i) in optsLine"
                      :key="i"
                      :value="line"
                    >
                      {{ line }}
                    </option>
                  </select>
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
                    v-model="foperator"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Description</span>
                  </div>
                  <input
                    type="text"
                    v-model="fdesc"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Start Date</span>
                  </div>
                  <div class="row m-0 p-0">
                    <div class="col-7 p-0">
                      <input
                        style="font-size: 10px"
                        class="form-control"
                        type="date"
                        v-model="fstart_time[0]"
                      />
                    </div>
                    <div class="col-5 p-0">
                      <input
                        class="form-control"
                        type="time"
                        v-model="fstart_time[1]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Interval</span>
                    <b-form-radio
                      v-model="intervalDays"
                      class="ml-2"
                      name="some-radios"
                      :value="30"
                      >1 Month</b-form-radio
                    >
                    <b-form-radio
                      v-model="intervalDays"
                      class="ml-2"
                      name="some-radios"
                      :value="7"
                      >1 Week</b-form-radio
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Finish Date</span>
                  </div>
                  <div class="row m-0 p-0">
                    <div class="col-7 p-0">
                      <input
                        style="font-size: 10px"
                        class="form-control"
                        disabled
                        type="date"
                        v-model="fend_time[0]"
                      />
                    </div>
                    <div class="col-5 p-0">
                      <input
                        class="form-control"
                        type="time"
                        v-model="fend_time[1]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
      </b-tabs>
      <template #modal-footer>
        <b-button size="sm" variant="success" @click="submitJob()"
          >Submit</b-button
        >
      </template>
    </b-modal>
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
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import getPxPosOfStrTime from "@/functions/getPxPosOfStrTime";
import formatDate from "@/functions/formatDate";

import Swal from "sweetalert2";

import {
  STATE_TYPE_JOB,
  STATE_LINES,
  STATE_TEMP_JOB,
  STATE_BLANK_JOB,
  STATE_GROUP,
} from "./job.state";
// import { ModelSelect } from "vue-search-select";

export default {
  name: "DashboardJob",
  data() {
    return {
      containerLines: STATE_LINES.containers,
      dayTimes: [],
      nightTimes: [],
      firstPx: 46,
      containerActiveProblem: [],
      containerTempJobs: STATE_TEMP_JOB.containers,
      jobTypes: STATE_TYPE_JOB.containers,
      modalShow: false,
      optsLine: STATE_LINES.opts,
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
      containerOee: STATE_LINES.oee,
      defineGroup: STATE_GROUP.container,
      commentsLh: null,
      mainUrl: `${process.env.VUE_APP_HOST}`,
      showEditModal: false,
    };
  },
  computed: {
    ...mapState(["stateProdAchievements"]),
  },
  watch: {
    stateProdAchievements: async function () {
      console.log(this.stateProdAchievements);
      this.stateProdAchievements.forEach((item) => {
        let idx = this.containerOee.findIndex(function (line) {
          return line.name === item.fline;
        });
        if (idx != -1) {
          this.containerOee[idx] = item;
        }
      });
    },
    intervalDays: function () {
      let dateAdd = new Date(this.fstart_time.join(" ")).setDate(
        this.intervalDays
      );
      this.fend_time = formatDate.YYYYMMDD_HHMM(new Date(dateAdd)).split(" ");
      this.isBulk = true;
    },
    containerLines: function () {
      console.log(this.containerLines);
    },
  },
  methods: {
    generateDayTimes() {
      for (let i = 7; i <= 18; i++) {
        if (i <= 9) {
          this.dayTimes.push(`0${i}:00`);
        } else {
          this.dayTimes.push(`${i}:00`);
        }
      }
    },
    generateNightTimes() {
      for (let i = 19; i <= 30; i++) {
        if (i >= 24) {
          if (i - 24 <= 9) {
            this.nightTimes.push(`0${i - 24}:00`);
          } else {
            this.nightTimes.push(`${i - 24}:00`);
          }
        } else {
          this.nightTimes.push(`${i}:00`);
        }
      }
    },
    async getActiveProblem() {
      for (let i = 0; i < this.containerLines.length; i++) {
        const element = this.containerLines[i];
        let uri = `${process.env.VUE_APP_HOST}/activeProblem?fline=${element.name}`;
        await axios
          .get(uri)
          .then(async (result) => {
            console.log(result.data.data);
            this.containerActiveProblem.push(result.data.data[0]);

            let mapRes = result.data.data.map((item) => {
              item.startPx = getPxPosOfStrTime(item.fstart_time);
              return item;
            });
            this.containerLines[i].dataProblem = mapRes;
          })
          .catch((err) => {
            console.log(err);
            // this.getActiveProblem()
          });
      }
      console.log(this.containerActiveProblem);
    },
    async getJobData(shift, onlyFirst = false) {
      this.containerTempJobs = STATE_BLANK_JOB.containers;
      if (onlyFirst) {
        this.isLoading = true;
      }
      let filterQuery = ``;
      console.log(new Date(this.fstart_time.join(" ")));
      if (shift == "day") {
        await axios
          .get(
            `${
              process.env.VUE_APP_HOST
            }/getJobData?filterQuery=WHERE fstart_time between '2021-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} 07:00:00' and '2021-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} 18:00:00'`
          )
          .then((result) => {
            console.log(result);
            result.data.data.forEach((jobDesk) => {
              let idx = this.containerLines.findIndex(function (line) {
                return line.name.toLowerCase() === jobDesk.fline.toLowerCase();
              });
              let idxBgCol = this.defineGroup.findIndex(function (group) {
                return jobDesk.fjob_type === group.type;
              });
              jobDesk.startPx = getPxPosOfStrTime(jobDesk.fstart_time);
              jobDesk.bgCol = this.defineGroup[idxBgCol].bgCol;
              if (idx != -1) {
                if (jobDesk.frole != "LH") {
                  let idxJobAvail = this.containerLines[
                    idx
                  ].dataProblem[0].findIndex(function (item) {
                    return item.fid == jobDesk.fid;
                  });
                  let idxProbJobAvail = this.containerLines[
                    idx
                  ].dataProblem[0].findIndex(function (item) {
                    return item.fproblem_id == jobDesk.fproblem_id;
                  });
                  if (idxJobAvail == -1) {
                    if (idxProbJobAvail == -1) {
                      this.containerLines[idx].dataProblem[0].push(jobDesk);
                    } else {
                      this.containerLines[idx].dataProblem[0][
                        idxProbJobAvail
                      ].foperator += `,${jobDesk.foperator}`;
                    }
                  } else {
                    this.containerLines[idx].dataProblem[0].splice(
                      idxJobAvail,
                      1,
                      jobDesk
                    );
                  }
                }
              }
            });
          })
          .catch((err) => {
            console.log(err);
            if (onlyFirst) {
              this.isLoading = false;
            }
          });
      } else {
        if (new Date().getHours() >= 0 && new Date().getHours() <= 6) {
          filterQuery = `WHERE fstart_time between '2021-${
            new Date().getMonth() + 1
          }-${new Date().getDate() - 1} 19:00:00' and '2021-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} 06:00:00'`;
        } else {
          filterQuery = `WHERE fstart_time between '2021-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} 19:00:00' and '2021-${
            new Date().getMonth() + 1
          }-${new Date().getDate() + 1} 06:00:00'`;
        }
        await axios
          .get(
            `${process.env.VUE_APP_HOST}/getJobData?filterQuery=${filterQuery}`
          )
          .then((result) => {
            console.log(result);
            this.containerLines.forEach((line, i) => {
              this.containerLines[i].dataProblem[1] = [];
            });
            result.data.data.forEach((problem) => {
              let idx = this.containerLines.findIndex(function (line) {
                return line.name.toLowerCase() === problem.fline.toLowerCase();
              });
              let idxBgCol = this.defineGroup.findIndex(function (group) {
                return problem.fjob_type === group.type;
              });
              console.log(idx);

              problem.startPx = getPxPosOfStrTime(problem.fstart_time);
              problem.bgCol = this.defineGroup[idxBgCol].bgCol;
              if (idx != -1) {
                this.containerLines[idx].dataProblem[1].push(problem);
              }
            });
            if (onlyFirst) {
              this.isLoading = false;
            }
          })
          .catch((err) => {
            console.log(err);
            if (onlyFirst) {
              this.isLoading = false;
            }
          });
      }
    },
    calculatePx(start_time, duration) {
      getPxPosOfStrTime(start_time, duration);
    },
    detailTip(item) {
      // console.log(item);
      console.log(item.foperator);
      return `<table class="table table-bordered">
          <tr>
            <th scope="cols">Description</th>
            <td class="text-left">${item.fjob_type}</td>
          </tr>
          <tr>
            <th scope="cols">Area/Mc</th>
            <td class="text-left">${item.farea}</td>
          </tr>
          <tr>
            <th scope="cols">Description</th>
            <td class="text-left">${item.fdesc}</td>
          </tr>
          <tr>
            <th scope="cols">Operator</th>
            <td class="text-left">${item.foperator}</td>
          </tr>
          <tr>
            <th scope="cols">Duration</th>
            <td class="text-left">${item.fdur} min</td>
          </tr>
          ${
            item.fproblem_id && item.fdur >= 15
              ? `<tr>
            <th scope="cols">Comment LH</th>
            <td class="text-left">
              ${item.fcommentLh == "null" ? "tidak ada komen" : item.fcommentLh}
            </td>
          </tr>`
              : ``
          }
          ${
            item.fproblem_id && item.fdur >= 30
              ? `<tr>
            <th scope="cols">Comment SH</th>
            <td class="text-left">
              ${item.fcommentSh == "null" ? "tidak ada komen" : item.fcommentSh}
            </td>
          </tr>`
              : ``
          }
          ${
            item.fproblem_id && item.fdur >= 60
              ? `<tr>
            <th scope="cols">Comment Dph</th>
            <td class="text-left">
              ${
                item.fcommentDph == "null"
                  ? "tidak ada komen"
                  : item.fcommentDph
              }
            </td>
          </tr>`
              : ``
          }
          ${
            item.fproblem_id
              ? `<tr>
            <th scope="cols">More</th>
            <td class="text-left">
              <a class="btn btn-primary" href="/editProblem?v_=${item.fproblem_id}">
              See Details</a>
            </td>
          </tr>`
              : ``
          }
          
        </table>`;
    },
    goDetails(route) {
      this.$router.push(route);
    },
    async submitJob() {
      this.isLoading = true;
      let idxGroup = this.defineGroup.findIndex((item) => {
        return item.type === this.fjob_type;
      });
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
            // this.$router.go();
            await this.getJobData("day");
            await this.getJobData("night");
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
            alert(JSON.stringify(err));
          });
      } else {
        this.submitBulkJob(newJob);
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
      this.foperator = null;
      this.fstart_time = formatDate.YYYYMMDD_HHMM(new Date()).split(" ");
      this.fend_time = formatDate.YYYYMMDD_HHMM(new Date()).split(" ");
      this.intervalDays = null;
    },
    getOeeData() {
      axios
        .get(`${process.env.VUE_APP_HOST}/getOeeData`)
        .then((result) => {
          console.log(result);
          result.data.data.forEach((item) => {
            let idx = this.containerOee.findIndex(function (line) {
              return line.name === item.fline;
            });
            if (idx != -1) {
              this.containerOee[idx] = item;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeJob(id) {
      console.log(id);
      Swal.fire({
        title: "Delete job?",
        text: "data tidak akan kembali",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya hapus dong!",
      }).then((result) => {
        let newObj = {
          key: "fid",
          operator: "=",
          val: id,
        };
        axios
          .post(`${process.env.VUE_APP_HOST}/deleteJobData`, newObj)
          .then(() => {
            if (result.isConfirmed) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch(() => {
            Swal.fire("Error", "please try again", "error");
          });
      });
    },
    editJob(obj) {
      console.log(obj);
      this.showEditModal = true;
    },
  },
  components: {
    // ModelSelect,
    // ModalEdit: () => import("./components/ModalEdit.vue"),
  },
  async mounted() {
    if (localStorage.getItem("name")) {
      this.foperator = localStorage.getItem("name");
    }
    this.generateDayTimes();
    this.generateNightTimes();
    // this.getOeeData();
    await this.getJobData("day", true);
    await this.getJobData("night", true);
    // this.getActiveProblem();
    setInterval(async () => {
      await this.getJobData("day");
      await this.getJobData("night");
    }, 60000);
  },
};
</script>

<style scoped>
.borderSide {
  border-left: 1px solid black;
  /* border-right: 1px solid black; */
}
.borderAll {
  border: 1px solid black;
}
.btn-fixed {
  position: fixed;
  z-index: 100;
  top: 100px;
  right: 0px;
  opacity: 0.8;
}
.btn-fixed:hover {
  position: fixed;
  z-index: 100;
  top: 100px;
  right: 0px;
  opacity: 1;
}
</style>