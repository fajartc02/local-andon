<template>
  <div>
    <div class="container-fluid p-4 mt-4">
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
            <select class="form-control text-dark" v-model="isDay" disabled>
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
            <input
              type="text"
              id="line"
              v-model="machineSelected"
              disabled
              class="form-control pl-2"
            />
          </div>
        </div>
        <div class="col p-0">
          <div class="input-group mb-3">
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
      <!-- Ilustration disabled temporary -->
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
                    @change="onSelect('file')"
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
      <div class="row p-0 m-0" v-if="displayImg != 'null'">
        <div class="col p-0">
          <img
            v-if="displayImg"
            :src="displayImg"
            :alt="displayImg"
            height="100%"
            width="60%"
          />
        </div>
      </div>
      <div class="row" v-if="displayImg != 'null'">
        <div class="col">
          <a
            :href="displayImg"
            class="
              btn-sm btn-primary
              text-light text-decoration-none
              mb-4
              text-center
            "
            target="_blank"
            style="opacity: 0.7"
          >
            Preview Image
          </a>
        </div>
      </div>
      <!-- WHY ANALISYS -->
      <div class="row p-0 m-0">
        <div class="col p-0">
          <table class="table-responsive border-0">
            <thead class="">
              <tr>
                <td
                  class="text-dark border-0"
                  style="min-width: 80px; font-weight: 800"
                >
                  Why Analisys
                </td>
                <td class="border-0">
                  <button class="btn-sm btn-primary" @click="isInputWhy = true">
                    Add
                  </button>
                </td>
              </tr>
              <tr>
                <th>No</th>
                <th>Description</th>
                <th
                  style="
                    max-width: 300px;
                    min-width: 100px;
                    width: 300px !important;
                  "
                >
                  ilustration {{ isInputWhy ? "(optional)" : "" }}
                </th>
                <th style="min-width: 200px">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- For Input Why -->
              <tr v-if="isInputWhy">
                <td class="text-info">Input</td>
                <td>
                  <input
                    class="form-control"
                    type="text"
                    v-model="onInputWhy.fdesc"
                    placeholder="masukan description"
                  />
                </td>
                <td>
                  <form
                    method="post"
                    @submit.prevent="
                      onSubmitUploadWhy(
                        `${urlUpload}?folder=quality&nameFile=${fileName}_analisys_`,
                        true
                      )
                    "
                  >
                    <div class="row">
                      <div class="col-8">
                        <input
                          class="form-control"
                          name="sampleFile"
                          ref="fileWhy"
                          type="file"
                          @change="onSelectWhy('fileWhy')"
                        />
                      </div>
                      <div class="col-2">
                        <button class="btn btn-secondary btn-sm" type="submit">
                          Upload
                        </button>
                      </div>
                    </div>
                  </form>
                </td>
                <td>
                  <button
                    class="btn-sm btn-outline-success"
                    @click="addQualityWhy"
                  >
                    Submit
                  </button>
                  <button class="btn-sm btn-danger" @click="isInputWhy = false">
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-if="containerWhyQuality.length > 0">
              <tr v-for="(whyItem, i) in containerWhyQuality" :key="i">
                <td>{{ i + 1 }}</td>
                <!-- Description -->
                <td v-if="whyItem.isEdit">
                  <input
                    type="text"
                    class="form-control"
                    v-model="whyItem.fdesc"
                  />
                </td>
                <td v-else>
                  {{ whyItem.fdesc }}
                </td>
                <!-- Ilustration -->
                <td v-if="whyItem.isEdit">
                  <form
                    method="post"
                    @submit.prevent="
                      onSubmitUploadWhy(
                        `${urlUpload}?folder=quality&nameFile=${fileName}_analisys_`,
                        i
                      )
                    "
                  >
                    <div class="row">
                      <div class="col-8">
                        <input
                          class="form-control"
                          name="sampleFile"
                          ref="fileWhyEdit"
                          type="file"
                          @change="onSelectWhyEdit"
                        />
                      </div>
                      <div class="col-2">
                        <button class="btn btn-secondary btn-sm" type="submit">
                          Upload
                        </button>
                      </div>
                    </div>
                  </form>
                  <img
                    v-if="whyItem.filustration"
                    :src="`${whyItem.filustration}`"
                    width="80%"
                    height="40%"
                  />
                </td>
                <td v-else>
                  <img
                    v-if="whyItem.filustration"
                    :src="`${whyItem.filustration}`"
                    width="80%"
                    height="40%"
                  />
                </td>
                <td v-if="whyItem.isEdit">
                  <button
                    class="btn-sm btn-primary"
                    @click="editWhyAnalisys(whyItem, whyItem.fid, i)"
                  >
                    Submit
                  </button>
                  <button
                    class="btn-sm btn-danger"
                    @click="whyItem.isEdit = false"
                  >
                    Cancel
                  </button>
                </td>
                <td v-else>
                  <button
                    class="btn-sm btn-success"
                    @click="whyItem.isEdit = true"
                  >
                    Edit
                  </button>
                  <button
                    class="btn-sm btn-danger"
                    @click="deleteWhy(whyItem.fid)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <CountermeasureQuality />
    </div>
    <v-spacer></v-spacer>
    <button type="button" @click="editQualityData()" class="btn btn-success">
      Submit Edit
    </button>
    <router-link
      class="btn btn-secondary text-light"
      to="/quality/detailProblem"
    >
      Close
    </router-link>
    <Loading :propsLoading="isLoading" />
  </div>
</template>

<script>
import axios from "axios";
import CountermeasureQuality from "@/components/Quality/CountermeasureQuality";
import Loading from "@/components/Loading";

export default {
  name: "EditQuality",
  data() {
    return {
      qId: null,
      dialog: false,
      isLoading: false,
      machines: [],
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
      isInputWhy: false,
      onInputWhy: {
        fid_quality: null,
        fdesc: null,
        filustration: null,
      },
      displayImgWhy: null,
      containerWhyQuality: [],
      selectedFile: null,
      onEditQuality: {
        fdesc: null,
        filustration: null,
        foperator: null,
        fshift: null,
        fwork_no: null,
        totalDefect: null,
      },
      changesUpload: null,
      fileUploadWhy: null,
    };
  },
  methods: {
    onSelect(refName) {
      console.log(refName);
      let file = this.$refs[`${refName}`].files[0];
      console.log(file);
      this.selectedFile = file;
      this.fileName = `${Date.now()}`;
    },
    onSelectWhy(refName) {
      console.log(refName);
      let file = this.$refs.fileWhy.files[0];
      console.log(file);
      this.selectedFile = file;
      this.fileName = `${Date.now()}`;
      console.log(this.fileName);
    },
    onSelectWhyEdit() {
      let file = this.$refs.fileWhyEdit[0].files[0];
      console.log(file);
      this.selectedFile = file;
      this.fileName = `${Date.now()}`;
      console.log(this.fileName);
    },
    async onSubmitUpload(url) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      await axios
        .post(url, formData)
        .then((result) => {
          console.log(result);
          if (result.status == 201) {
            this.fimage = result.data.path;
            this.displayImg = `${process.env.VUE_APP_HOST}/image?path=${result.data.path}`;
            this.onInputWhy.filustration = this.displayImg;
            this.selectedFile = null;
            this.changesUpload = this.displayImg;
            alert(
              "success to upload, silahkan tekan tombol finished kalau sudah slesai input semua data"
            );
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
          alert(JSON.stringify(err));
        });
    },
    async onSubmitUploadWhy(url, i) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      await axios
        .post(url, formData)
        .then((result) => {
          if (result.status == 201) {
            this.fimage = result.data.path;
            this.onInputWhy.filustration = `${process.env.VUE_APP_HOST}/image?path=${result.data.path}`;
            this.selectedFile = null;
            this.fileUploadWhy = `${process.env.VUE_APP_HOST}/image?path=${result.data.path}`;
            alert(
              "success to upload, silahkan tekan tombol finished kalau sudah slesai input semua data"
            );
            if (i != true) {
              this.containerWhyQuality[
                i
              ].filustration = `${process.env.VUE_APP_HOST}/image?path=${result.data.path}`;
            }
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
          alert(JSON.stringify(err));
        });
    },
    async problemInput() {
      let newProblemQuality = {
        fdesc: this.problem,
        fmc_name: this.machineSelected,
        fline: this.selectedLine,
        filustration: this.displayImg,
        fdate: this.fdate,
        foperator: this.operator,
        fshift: this.shift,
        fwork_no: this.work_no.toUpperCase(),
        totalDefect: this.totalDefect,
        isDay: this.isDay,
      };
      if (this.displayImg) {
        axios
          .post(`${process.env.VUE_APP_HOST}/addDataQuality`, newProblemQuality)
          .then(async (result) => {
            console.log(result);
            alert(`Success to input`);
            this.problem = null;
            this.machineSelected = null;
            this.selectedLine = null;
            this.displayImg = null;
            this.dialog = false;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("please upload ilustration defect");
      }
    },
    async getMachines() {
      await axios
        .get(`${process.env.VUE_APP_HOST}/searchMc`)
        .then((result) => {
          this.containerRawMachine = result.data.data;
          let mapMc = result.data.data.map((mc) => {
            return { value: mc.fmc_name, text: mc.fmc_name };
          });
          this.machines = mapMc;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async addQualityWhy() {
      this.isInputWhy = false;
      if (!this.onInputWhy.filustration) {
        delete this.onInputWhy.filustration;
      }
      await axios
        .post(`${process.env.VUE_APP_HOST}/addAnalisys`, this.onInputWhy)
        .then((result) => {
          console.log(result);
          this.onInputWhy.fdesc = null;
          this.onInputWhy.filustration = null;
          this.getAnalisys();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getAnalisys() {
      await axios
        .get(`${process.env.VUE_APP_HOST}/getAnalisys?fid_quality=${this.qId}`)
        .then((result) => {
          let mapResult = result.data.data.map((item) => {
            item.isEdit = false;
            return item;
          });
          this.containerWhyQuality = mapResult;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkDayNight() {
      const hours = new Date(this.fdate).getHours();
      const isDayTime = hours > 6 && hours < 20;
      this.isDay = isDayTime;
    },
    async editWhyAnalisys(whyItem, id, i) {
      console.log(this.fileUploadWhy);
      if (this.fileUploadWhy) {
        whyItem.filustration = this.fileUploadWhy;
      }
      axios
        .put(`${process.env.VUE_APP_HOST}/editAnalisys/${id}`, whyItem)
        .then((result) => {
          console.log(result);
          this.containerWhyQuality[i].filustration = this.fileUploadWhy;
          this.containerWhyQuality[i].isEdit = false;
          this.fileUploadWhy = null;
        })
        .catch((err) => {
          console.log(err);
          this.fileUploadWhy = null;
        });
    },
    async getDetailQuality() {
      axios
        .get(`${process.env.VUE_APP_HOST}/getOneDefectData?v_=${this.qId}`)
        .then((result) => {
          let data = result.data.data[0];
          console.log(data);
          this.onInputWhy.fid_quality = data.fid;
          this.problem = data.fdesc;
          this.selectedLine = data.fline;
          this.machineSelected = data.fmc_name;
          this.displayImg = data.filustration;
          this.fdate = data.fdate.split(".")[0];
          this.operator = data.foperator;
          this.shift = data.fshift;
          this.work_no = data.fwork_no;
          this.totalDefect = data.totalDefect;
          //   this.getMachines();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async editQualityData() {
      this.onEditQuality.fdesc = this.problem;
      if (this.changesUpload) {
        this.onEditQuality.filustration = this.changesUpload;
      }
      this.onEditQuality.foperator = this.operator;
      this.onEditQuality.fshift = this.shift;
      this.onEditQuality.fwork_no = this.work_no;
      this.onEditQuality.totalDefect = this.totalDefect;
      axios
        .put(
          `${process.env.VUE_APP_HOST}/editDefectData/${this.qId}`,
          this.onEditQuality
        )
        .then((res) => {
          console.log(res);
          alert("Success to Edit");
          this.$router.push("/quality/detailProblem");
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err));
        });
    },
    async deleteWhy(id) {
      axios
        .delete(`${process.env.VUE_APP_HOST}/removeAnalisys/${id}`)
        .then((result) => {
          console.log(result);
          this.getAnalisys();
          alert("Success to delete Analisys");
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  watch: {
    machineSelected: function () {
      if (this.machineSelected != "") {
        // let mcSelected = this.containerRawMachine.map((mc) => {
        //   if (mc.fmc_name == this.machineSelected) {
        //     this.fmc_id = mc.fid;
        //     return mc.fline;
        //   } else {
        //     return null;
        //   }
        // });
        // this.selectedLine = mcSelected.sort()[0];
      }
    },
    fdate: function () {
      this.checkDayNight();
    },
    propsData: function () {
      console.log(this.propsData);
    },
  },
  components: {
    CountermeasureQuality,
    Loading,
    // ModelSelect,
  },
  props: {
    propsData: Object,
  },
  async mounted() {
    this.qId = +this.$route.query.v_;
    await this.getDetailQuality();
    await this.getAnalisys();
  },
};
</script>
