<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div id="content-search" class="card shadow w-100">
          <div class="card-header title-text p-0 px-2 text-left">Search</div>
          <div class="card-body px-1 py-1">
            <div class="row m-0">
              <div class="col-6 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Start</span
                    >
                  </div>
                  <input
                    type="date"
                    v-model="selectedStartDate"
                    class="form-control"
                    placeholder="Start Date"
                  />
                </div>
              </div>
              <div class="col-6 p-0 pl-1">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Finish</span
                    >
                  </div>
                  <input
                    type="date"
                    class="form-control"
                    v-model="selectedEndDate"
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>
            <div class="row m-0">
              <div class="col-6 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Line</span>
                  </div>
                  <model-select
                    :options="optionsLines"
                    v-model="lineSelected"
                    placeholder="select line"
                    style="width: 70%; font-size: 10px; color: black"
                  >
                  </model-select>
                </div>
              </div>
              <div class="col-6 p-0 pl-1">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Machine</span
                    >
                  </div>
                  <model-select
                    :options="optionsMcs"
                    v-model="machineSelected"
                    placeholder="pilih line baru mesin akan terlihat"
                    style="width: 60%; font-size: 10px; color: black"
                  >
                  </model-select>
                </div>
              </div>
            </div>
            <div class="row m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Shift</span>
                  </div>
                  <input
                    list="shift"
                    name="shift"
                    v-model="fshift"
                    class="form-control"
                    placeholder="select shift"
                  />
                  <datalist id="shift">
                    <option value="RED"></option>
                    <option value="WHITE"></option>
                  </datalist>
                </div>
              </div>
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Waktu</span>
                  </div>
                  <input
                    list="waktu"
                    v-model="isDay"
                    class="form-control"
                    placeholder="pilih waktu (siang/malam)"
                  />
                  <datalist id="waktu">
                    <option value="Siang"></option>
                    <option value="Malam"></option>
                  </datalist>
                </div>
              </div>
            </div>
            <div class="row m-0">
              <div class="col-10 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      >Defect Name</span
                    >
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="kajiri, yujiwa, kurokawa, dan lain-lain"
                    v-model="problemSelected"
                  />
                </div>
              </div>
              <div class="col-2 p-0">
                <button
                  class="btn btn-primary p-0 px-3"
                  @click="allDefectData()"
                >
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table :class="`table ${tableSize}`">
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Time</th>
              <th>Line</th>
              <th>Machine</th>
              <th>Defect</th>
              <th>Ilustration</th>
              <th>Total</th>
              <!-- <th>Why Analisys</th>
              <th>Countermeasure</th> -->
              <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody v-if="containerDefectData.length > 0">
            <tr v-for="(item, i) in containerDefectData" :key="i">
              <td>{{ i + 1 }}</td>
              <td>{{ item.fdate.split("T")[0] }}</td>
              <td>{{ item.fdate.split("T")[1].split(".")[0] }}</td>
              <td>{{ item.fline }}</td>
              <td>{{ item.fmc_name }}</td>
              <td>{{ item.fdesc }}</td>
              <td v-if="item.filustration != 'null'">
                <a :href="item.filustration" target="_blank">See here!</a>
              </td>
              <td v-else>Tidak Ada</td>
              <td>{{ item.totalDefect }}</td>
              <td>
                <router-link
                  class="btn-sm btn-info text-decoration-none text-light"
                  :to="`/quality/editQuality?v_=${item.fid}`"
                  >Edit</router-link
                >
              </td>
              <td>
                <button
                  class="btn-sm btn-danger"
                  @click="removeDefectData(item.fid, item.fdesc)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="10">Tidak Ada Defect</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ModelSelect } from "vue-search-select";

import formatDate from "@/functions/formatDate";
import Swal from "sweetalert2";

export default {
  name: "DetailQualityProblem",
  data() {
    return {
      containerDefectData: [],
      optionsLines: [],
      optionsMcs: [],
      lineSelected: null,
      isShow: true,
      selectedStartDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ),
      selectedEndDate: new Date(),
      containerProblems: [],
      isLoading: false,
      machineSelected: null,
      problemSelected: null,
      fshift: null,
      isDay: null,
      windowWidth: window.innerWidth,
      isMobile: false,
      tableSize: "table-bordered",
      dialog: false,
    };
  },
  methods: {
    async allDefectData() {
      let line = this.lineSelected ? "&fline=" + this.lineSelected : "";
      let machine = this.machineSelected
        ? "&fmc_name=" + this.machineSelected
        : "";
      let defectName = this.problemSelected
        ? "&fdesc=" + this.problemSelected
        : "";
      let shift = this.fshift ? "&fshift=" + this.fshift : "";
      let isDay = this.isDay
        ? this.isDay == "Siang"
          ? "&isDay=" + 1
          : "&isDay=" + 0
        : "";
      let url = `${process.env.VUE_APP_HOST}/allDefectData?startDate=${this.selectedStartDate}&finishDate=${this.selectedEndDate}${line}${machine}${defectName}${shift}${isDay}`;
      axios
        .get(url)
        .then((result) => {
          this.containerDefectData = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getLines() {
      await axios
        .get(`${process.env.VUE_APP_HOST}/lines`)
        .then((result) => {
          console.log(result.data.data);
          let mapLines = result.data.data.map((line) => {
            return { value: line.fline, text: line.fline };
          });
          //   console.log(mapLines);
          this.optionsLines = mapLines;
        })
        .catch((err) => {
          // this.getLines();
          console.log(err);
        });
    },
    async getMachines() {
      await axios
        .get(`${process.env.VUE_APP_HOST}/machines?line=${this.lineSelected}`)
        .then((result) => {
          console.log(result);
          let mapMcs = result.data.data.map((mc) => {
            return { value: mc.fmc_name, text: mc.fmc_name };
          });
          console.log(mapMcs);
          this.optionsMcs = mapMcs;
        })
        .catch((err) => {
          // this.getMachines();
          console.log(err);
        });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      console.log(this.windowWidth);
      if (this.windowWidth < 650) {
        this.isMobile = true;
        this.tableSize = "table-responsive";
      } else {
        this.isMobile = false;
        this.tableSize = "table-bordered";
      }
    },
    removeDefectData(fid, defectName) {
      Swal.fire({
        title: `Apakah kamu akan menghapus Defect: ${defectName}?`,
        text: `Kamu tidak bisa mengembalikannya!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${process.env.VUE_APP_HOST}/removeDefectData/${fid}`)
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.allDefectData();
            })
            .catch((err) => {
              alert(JSON.stringify(err));
            });
        }
      });
    },
  },
  watch: {
    lineSelected: function () {
      if (this.lineSelected !== undefined) {
        console.log("changes");
        localStorage.setItem("lineSelected", this.lineSelected);
        this.getMachines();
      } else {
        this.lineSelected = "";
      }
    },
  },
  components: {
    ModelSelect,
  },
  async mounted() {
    this.selectedStartDate = formatDate.YYYYMMDD(this.selectedStartDate);
    this.selectedEndDate = formatDate.YYYYMMDD(this.selectedEndDate);
    await this.getLines();
    await this.allDefectData();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>