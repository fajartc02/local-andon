<template>
  <!-- COUNTERMEASURE -->
  <div class="row p-0 m-0">
    <div class="col p-0">
      <table class="table-responsive border-0">
        <thead class="">
          <tr>
            <td
              class="text-dark border-0"
              style="min-width: 80px; font-weight: 800"
            >
              Countermeasure
            </td>
            <td class="border-0">
              <button class="btn-sm btn-primary" @click="isInputCm = true">
                Add
              </button>
            </td>
          </tr>
          <tr>
            <th>No</th>
            <th style="min-width: 300px">Description</th>
            <th style="max-width: 300px; min-width: 100px">
              ilustration {{ isInputCm ? "(optional)" : "" }}
            </th>
            <th>Date Plan</th>
            <th>Date Actual</th>
            <th>Pic</th>
            <th>Status</th>
            <th style="min-width: 200px">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- For Input Why -->
          <tr v-if="isInputCm">
            <td class="text-info">Input</td>
            <td>
              <input
                class="form-control"
                type="text"
                v-model="onInputCm.fdesc"
                placeholder="masukan description"
              />
            </td>
            <td>
              <form
                method="post"
                @submit.prevent="
                  onSubmitUpload(
                    `${urlUpload}?folder=quality&nameFile=${fileName}`
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
                      @change="onSelectCm('fileWhy')"
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
              <input
                class="form-control"
                type="date"
                v-model="onInputCm.fdatePlan"
              />
            </td>
            <td></td>
            <td>
              <input
                class="form-control"
                type="text"
                v-model="onInputCm.fpic"
              />
            </td>
            <td></td>
            <td>
              <button class="btn-sm btn-outline-success" @click="addQualityCm">
                Submit
              </button>
              <button class="btn-sm btn-danger" @click="isInputCm = false">
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-if="containerCmQuality.length > 0">
          <tr v-for="(cmItem, i) in containerCmQuality" :key="i">
            <td>{{ i + 1 }}</td>
            <!-- Description -->
            <td v-if="cmItem.isEdit">
              <input type="text" class="form-control" v-model="cmItem.fdesc" />
            </td>
            <td v-else>
              {{ cmItem.fdesc }}
            </td>
            <!-- Ilustration -->
            <td v-if="cmItem.isEdit">
              <form
                method="post"
                @submit.prevent="
                  onSubmitUploadWhy(
                    `${urlUpload}?folder=quality&nameFile=${fileName}`,
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
                      @change="onSelectCm('fileWhyEdit')"
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
                v-if="cmItem.filustration"
                :src="`${cmItem.filustration}`"
                width="80%"
                height="40%"
              />
            </td>
            <td v-else>
              <img
                v-if="cmItem.filustration"
                :src="`${cmItem.filustration}`"
                width="80%"
                height="40%"
              />
            </td>
            <!-- Date PLan -->
            <td v-if="cmItem.isEdit">
              <input
                type="date"
                class="form-control"
                v-model="cmItem.fdatePlan"
              />
            </td>
            <td v-else>
              {{ cmItem.fdatePlan.split("T")[0] }}
            </td>
            <!-- Date Actual -->
            <td v-if="cmItem.isEdit">
              <input
                type="date"
                class="form-control"
                v-model="cmItem.fdateActual"
              />
            </td>
            <td v-else>
              {{ cmItem.fdateActual ? cmItem.fdateActual.split("T")[0] : "" }}
            </td>
            <!-- PIC -->
            <td v-if="cmItem.isEdit">
              <input type="text" class="form-control" v-model="cmItem.fpic" />
            </td>
            <td v-else>
              {{ cmItem.fpic }}
            </td>
            <!-- Status -->
            <td v-if="cmItem.isEdit">
              <input
                type="text"
                class="form-control"
                v-model="cmItem.fstatus"
              />
            </td>
            <td v-else>
              {{ cmItem.fstatus == 0 ? "Not Yet" : "OK" }}
            </td>
            <td v-if="cmItem.isEdit">
              <button
                class="btn-sm btn-primary"
                @click="editWhyAnalisys(cmItem, cmItem.fid, i)"
              >
                Submit
              </button>
              <button class="btn-sm btn-danger" @click="cmItem.isEdit = false">
                Cancel
              </button>
            </td>
            <td v-else>
              <button class="btn-sm btn-success" @click="cmItem.isEdit = true">
                Edit
              </button>
              <button class="btn-sm btn-danger" @click="deleteWhy(cmItem.fid)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Loading :propsLoading="isLoading" />
  </div>
</template>

<script>
import axios from "axios";
import formatDate from "@/functions/formatDate";
import Loading from "@/components/Loading";

export default {
  name: "CountermeasureQuality",
  data() {
    return {
      isInputCm: false,
      containerCmQuality: [],
      onInputCm: {
        fid_quality: null,
        fdesc: null,
        fdatePlan: null,
        fdateActual: null,
        filustration: null,
        fpic: null,
      },
      selectedFile: null,
      fileName: null,
      isLoading: false,
      urlUpload: `${process.env.VUE_APP_HOST}/upload`,
    };
  },
  components: {
    Loading,
  },
  watch: {
    containerCmQuality: {
      handler: function (newVal) {
        //prevVal
        console.log(newVal);
        console.log(this.containerCmQuality);
      },
      deep: true,
    },
  },
  methods: {
    onSelectCm(refName) {
      let file = this.$refs[`${refName}`].files[0];
      this.selectedFile = file;
      this.fileName = `${Date.now()}`;
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
            this.onInputCm.filustration = this.displayImg;
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
    async addQualityCm() {
      this.isInputWhy = false;
      this.isLoading = true;
      delete this.onInputCm.fdateActual;
      if (!this.onInputCm.filustration) {
        delete this.onInputCm.filustration;
      }
      await axios
        .post(`${process.env.VUE_APP_HOST}/addCmQuality`, this.onInputCm)
        .then((result) => {
          console.log(result);
          this.isLoading = false;
          this.onInputCm.fdesc = null;
          this.onInputCm.filustration = null;
          this.onInputCm.fdatePlan = null;
          this.onInputCm.fpic = null;
          // this.getAnalisys();
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    async getQualityCm() {
      axios
        .get(
          `${process.env.VUE_APP_HOST}/getQualityCm/${+this.$route.query.v_}`
        )
        .then((result) => {
          console.log(result);
          let mapResult = result.data.data.map((item) => {
            item.isEdit = false;
            return item;
          });
          this.containerCmQuality = mapResult;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.onInputCm.fdatePlan = formatDate.YYYYMMDD(new Date());
    this.onInputCm.fid_quality = +this.$route.query.v_;
    this.fileName = `${Date.now()}_cm`;
    this.getQualityCm();
  },
};
</script>