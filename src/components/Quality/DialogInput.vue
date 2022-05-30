<template>
  <div>
    <button class="btn btn-primary" @click="dialog = true">
      Quality Input
    </button>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card class="p-2">
        <v-card-title class="headline grey lighten-2">
          Input Quality Problem
        </v-card-title>
        <v-card-text class="p-0">
          <div class="container-fluid p-0 mt-4">
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Date Time</span>
                  </div>
                  <input
                    type="datetime-local"
                    v-model="fdate"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </div>
              </div>
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Waktu</span>
                  </div>
                  <select
                    class="form-control text-dark"
                    v-model="isDay"
                    disabled
                  >
                    <option value="true">Siang</option>
                    <option value="false">Malam</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col-9 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Machine</span>
                  </div>
                  <model-select
                    :options="machines"
                    v-model="machineSelected"
                    placeholder="select machine"
                    style="width: 75%"
                  >
                  </model-select>
                </div>
              </div>
              <div class="col p-0">
                <div class="input-group mb-3">
                  <!-- <div class="input-group-prepend">
                    <span class="input-group-text">Line</span>
                  </div> -->
                  <input
                    type="text"
                    id="line"
                    v-model="selectedLine"
                    class="form-control pl-2"
                    disabled
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
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Shift</span>
                  </div>
                  <select class="form-control text-dark" v-model="shift">
                    <option value="null" disabled selected>Select Shift</option>
                    <option value="RED">RED</option>
                    <option value="WHITE">WHITE</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Defect</span>
                  </div>
                  <input
                    type="text"
                    id="problem"
                    v-model="problem"
                    class="form-control"
                    autocomplete="on"
                  />
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col-5 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Total Defect</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    v-model="totalDefect"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Work No.</span>
                  </div>
                  <input
                    type="text"
                    v-model="work_no"
                    class="form-control"
                    style="text-transform: uppercase"
                  />
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Ilustration</span>
                  </div>
                  <form
                    method="post"
                    @submit.prevent="
                      onSubmitUpload(
                        `${urlUpload}?folder=quality&nameFile=${fileName}`
                      )
                    "
                  >
                    <div class="row m-0 p-0">
                      <div class="col-10 p-0">
                        <input
                          class="form-control"
                          name="sampleFile"
                          ref="file"
                          type="file"
                          @change="onSelect"
                        />
                      </div>
                      <div class="col-2 p-0">
                        <button class="btn btn-secondary btn-sm" type="submit">
                          Upload
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <img
                  v-if="displayImg"
                  :src="displayImg"
                  :alt="displayImg"
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <button type="button" @click="problemInput()" class="btn btn-success">
            Submit
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="dialog = false"
          >
            Close
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Loading :propsLoading="isLoading" />
  </div>
</template>

<script>
import { ModelSelect } from "vue-search-select";
import axios from "axios";
import formatDate from "@/functions/formatDate";
import Loading from "@/components/Loading";

import { mapActions } from "vuex";

export default {
  name: "DialogInput",
  data() {
    return {
      dialog: false,
      isLoading: false,
      machines: ["IMSP-0001", "IMSP-0002"],
      machineSelected: null,
      selectedLine: null,
      fdate: new Date(),
      problem: null,
      operator: null,
      shift: null,
      work_no: null,
      isUploadComp: false,
      fimage: null,
      displayImg: null,
      urlUpload: `${process.env.VUE_APP_HOST}/upload`,
      fileName: null,
      isDay: false,
      containerRawMachine: [],
      totalDefect: 1,
    };
  },
  methods: {
    ...mapActions(["successToRegister"]),
    onSelect() {
      const file = this.$refs.file.files[0];
      console.log(file);
      this.selectedFile = file;
      this.fileName = `${Date.now()}`;
    },
    async onSubmitUpload(url) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      for (var key of formData.entries()) {
        console.log(key[1]);
      }
      await axios
        .post(url, formData)
        .then((result) => {
          console.log(result);
          if (result.status == 201) {
            this.fimage = result.data.path;
            this.displayImg = `${process.env.VUE_APP_HOST}/image?path=${result.data.path}`;
            alert(
              "success to upload, silahkan tekan tombol finished kalau sudah slesai input semua data"
            );
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
          alert(`${err.message} \n ${JSON.stringify(err.config)}`);
        });
    },
    async problemInput() {
      this.isLoading = true;
      let newProblemQuality = {
        fdesc: this.problem,
        fmc_name: this.machineSelected,
        fline: this.selectedLine,
        filustration: this.displayImg,
        fdate: this.fdate,
        foperator: this.operator,
        fshift: this.shift,
        fwork_no: this.work_no ? this.work_no.toUpperCase() : "null",
        totalDefect: this.totalDefect,
        isDay: this.isDay,
      };
      console.log(newProblemQuality);
      if (this.displayImg) {
        axios
          .post(`${process.env.VUE_APP_HOST}/addDataQuality`, newProblemQuality)
          .then(async (result) => {
            console.log(result);
            alert(`Anda Berhasil Input`);
            this.successToRegister(newProblemQuality);
            this.problem = null;
            this.machineSelected = null;
            this.selectedLine = null;
            this.displayImg = null;
            this.dialog = false;
            this.isLoading = false;
            //   await this.getQualityData();
            //   await this.groupDefect();
          })
          .catch((err) => {
            console.log(err);
            alert(`Anda gagal menambahkan defect data`);
          });
      } else {
        axios
          .post(`${process.env.VUE_APP_HOST}/addDataQuality`, newProblemQuality)
          .then(async (result) => {
            console.log(result);
            alert(`Anda berhasil input tanpa ilustrasi`);
            this.successToRegister(newProblemQuality);
            this.problem = null;
            this.machineSelected = null;
            this.selectedLine = null;
            this.displayImg = null;
            this.dialog = false;
            this.isLoading = false;
            //   await this.getQualityData();
            //   await this.groupDefect();
          })
          .catch((err) => {
            alert(`Anda gagal menambahkan defect data`);
            console.log(err);
          });
      }
    },
    async getMachines() {
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
    checkDayNight() {
      console.log(new Date().getHours());
      const hours = new Date(this.fdate).getHours();
      const isDayTime = hours > 6 && hours < 20;
      this.isDay = isDayTime;
    },
  },
  watch: {
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
    fdate: function () {
      this.checkDayNight();
    },
  },
  components: {
    ModelSelect,
    Loading,
  },
  async mounted() {
    await this.getMachines();
    this.operator = localStorage.getItem("name");
    this.shift = localStorage.getItem("shift");
    this.checkDayNight();
    this.fdate = formatDate.ISOLocaleString(new Date());
  },
};
</script>

<style scoped>
select:invalid {
  color: black;
}
</style>