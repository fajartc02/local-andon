<template>
  <div
    class="container-fluid p-0 text-dark"
    style="margin-bottom: 130px; font-weight: bold"
  >
    <div class="row m-0 p-0" id="content-pdf" ref="content">
      <div class="col-12 p-0">
        <div class="container-fluid p-0 m-0">
          <!-- HEADER TITLE -->
          <div class="row m-0 text-center">
            <div class="col-3 p-0 border" style="padding-top: 30px !important">
              <h4 class="text-danger m-0">TMMIN</h4>
              <h4 style="font-size: 12px">
                PLANT 3 ENGINE PRODUCTION KARAWANG DIVISION
              </h4>
              <h4 class="text-primary" style="font-size: 12px">
                MAINTENANCE DEPARTEMENT
              </h4>
            </div>
            <div
              class="
                col
                p-0
                border
                d-flex
                align-items-center
                justify-content-center
              "
              style="vertical-align: middle"
            >
              <h4 class="text-primary" style="font-size: 20px">
                Long Time Breakdown & Recurrence Prevention Report
              </h4>
            </div>
            <div class="col p-0 border" style="max-height: 140px">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <td style="width: 70px" rowspan="3">Action</td>
                    <td style="width: 70px">D/H</td>
                    <td style="width: 70px">S/H Staff</td>
                    <td style="width: 70px">S/H Op</td>
                    <td style="width: 70px">Staff</td>
                    <td style="width: 70px">GL</td>
                    <td style="width: 70px">TL</td>
                  </tr>
                  <tr>
                    <td style="height: 30px"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                  </tr>
                  <tr>
                    <td style="height: 25px"></td>
                  </tr>
                  <tr>
                    <td style="width: 70px" rowspan="2">Countermeasure</td>
                    <td style="height: 35px"></td>
                  </tr>
                  <tr>
                    <td style="height: 25px"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <!-- 1. KEJADIAN &  2. PROBLEM -->
          <div class="row m-0">
            <div class="col-12 p-0">
              <table class="table table-bordered">
                <thead class="text-center">
                  <tr>
                    <td class="bg-success" rowspan="3">1. Kejadian</td>
                    <td colspan="7">Breakdown Start</td>
                    <td class="bg-success text-left px-2" rowspan="3">
                      2. Problem <br />
                      <b style="font-size: 20px">{{ ferror_name }}</b>
                    </td>
                    <td>Line</td>
                    <td>LP</td>
                    <td>PIC</td>
                    <td>Report Number</td>
                  </tr>
                  <tr>
                    <td>Tanggal</td>
                    <td>Bulan</td>
                    <td>Tahun</td>
                    <td>Shift</td>
                    <td>Start</td>
                    <td>Finish</td>
                    <td>B/D Dura</td>

                    <td>Mesin</td>
                    <td>{{ fmc_name }}</td>
                    <td rowspan="2">{{ foperator }}</td>
                    <td rowspan="2" style="font-size: 15px; font-weight: bold">
                      {{ fid }}
                    </td>
                  </tr>
                  <tr>
                    <td>{{ startDate.split("-")[2] }}</td>
                    <td>{{ startDate.split("-")[1] }}</td>
                    <td>{{ startDate.split("-")[0] }}</td>
                    <td>{{ fshift }}</td>
                    <td>{{ startTime }}</td>
                    <td>{{ endTime }}</td>
                    <td>{{ fdur }}</td>

                    <td>Nama Part</td>
                    <td>{{ fpart_change }}</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-12 p-0">
              <table class="table table-bordered">
                <thead>
                  <tr style="height: 30px">
                    <td class="bg-success" colspan="2" style="width: 50%">
                      3. PROBLEM DESCRIPTION
                    </td>
                    <td class="bg-success" style="width: 50%">
                      5.STEP REPAIR ( Micro Analysis )
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center" style="height: 300px; width: 200px">
                      <img
                        src="data:image/png;base64,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"
                        height="150"
                      />
                      <h5>{{ ferror_name }}</h5>
                    </td>
                    <td style="height: 300px; width: 200px">
                      <!-- <h3>{{ ferror_name }}</h3> -->
                      <img
                        crossorigin="*"
                        :src="displayImage"
                        alt=""
                        height="300"
                      />
                    </td>
                    <td class="p-0" style="vertical-align: baseline !important">
                      <!-- ACTUAL -->
                      <table class="table table-bordered">
                        <thead>
                          <tr class="text-center">
                            <td rowspan="2" style="width: 10px">No</td>
                            <td rowspan="2" style="width: 300px">
                              Step Repair
                            </td>
                            <td colspan="2" style="width: 20px">Work Time</td>
                            <!-- <td rowspan="2" colspan="5">Menit</td> -->
                            <td rowspan="2" style="width: 30px">Q6</td>
                            <td
                              :rowspan="containerStepRepair.length + 2"
                              style="width: 120px; color: grey; opacity: 0.1"
                            >
                              GRAFIK_STD_ACTUAL
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 60px">Std</td>
                            <td style="width: 60px">Actual</td>
                          </tr>
                          <!-- STEP -->
                          <tr
                            v-for="(stepRepair, i) in containerStepRepair"
                            :key="stepRepair"
                          >
                            <td class="text-center" v-if="i < 12">
                              {{ i + 1 }}
                            </td>
                            <td v-if="i < 12" class="text-left">
                              {{ stepRepair }}
                            </td>
                            <!-- Std -->
                            <td v-if="i < 12"></td>
                            <!-- Act -->
                            <td v-if="i < 12"></td>
                            <!-- Q6 -->
                            <td v-if="i < 12"></td>
                            <!-- <td v-if="i < 7"></td>
                            <td v-if="i < 7"></td>
                            <td v-if="i < 7"></td>
                            <td v-if="i < 7"></td> -->
                          </tr>
                          <!-- <tr>
                            <td colspan="2">Total Time</td>
                            <td></td>
                          </tr> -->
                        </thead>
                      </table>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-12 p-0">
              <table class="table table-bordered">
                <thead>
                  <tr style="height: 30px">
                    <!-- TABLE WHY TERJADI -->
                    <td class="bg-success" style="width: 50%">
                      <tr>
                        <td>4. KENAPA TERJADI (5W Analysis)</td>
                        <td class="text-center">
                          <tr>
                            <td>PIC</td>
                            <td style="width: 100px"></td>
                            <td style="width: 100px"></td>
                            <td style="width: 100px"></td>
                            <td style="width: 100px"></td>
                            <td style="width: 100px"></td>
                          </tr>
                          <tr>
                            <td>Bagian</td>
                            <td>MT</td>
                            <td>E/S</td>
                            <td>QC</td>
                            <td>PROD</td>
                            <td>ESCO</td>
                          </tr>
                        </td>
                      </tr>
                    </td>
                    <td class="bg-success" style="width: 50%" colspan="2">
                      6. KENAPA LAMA ( 5W Analysis )
                    </td>
                  </tr>
                  <tr>
                    <!-- KENAPA TERJADI -->
                    <td
                      style="
                        height: 300px;
                        vertical-align: baseline !important;
                        margin-top: 10px !important;
                      "
                      rowspan="3"
                      v-if="containerWhyTerjadi.length !== 0"
                    >
                      <TreeListAnalisys :hide="true" />
                      <div
                        v-for="(whyTerjadi, i) in containerWhyTerjadi"
                        :key="whyTerjadi.machine"
                      >
                        <tr>
                          <td
                            class="text-center"
                            style="height: 20px; width: 300px"
                          >
                            {{ whyTerjadi }}
                          </td>
                        </tr>
                        <tr v-if="i < containerWhyTerjadi.length - 1">
                          <td class="text-center" style="border: none">
                            <i class="fa fa-arrow-down"></i>
                          </td>
                        </tr>
                      </div>
                      <img
                        :src="displayImage"
                        alt=""
                        height="200"
                        style="position: absolute; top: 100px"
                      />
                    </td>
                    <td
                      class="text-danger"
                      style="
                        height: 300px;
                        vertical-align: baseline !important;
                        margin-top: 10px !important;
                      "
                      rowspan="3"
                      v-else
                    >
                      Analisys kenapa Terjadi Belum Di isi
                    </td>
                    <!-- KENAPA LAMA -->
                    <td
                      style="vertical-align: baseline !important"
                      colspan="2"
                      v-if="containerWhyLama.length !== 0"
                    >
                      <div
                        v-for="(whyLama, i) in containerWhyLama"
                        :key="whyLama.machine"
                      >
                        <tr>
                          <td
                            class="text-center"
                            style="height: 20px; width: 300px"
                          >
                            {{ whyLama }}
                          </td>
                        </tr>
                        <tr v-if="i < containerWhyLama.length - 1">
                          <td class="text-center" style="border: none">
                            <i class="fa fa-arrow-down"></i>
                          </td>
                        </tr>
                      </div>
                    </td>
                    <td
                      class="text-danger"
                      style="vertical-align: baseline !important"
                      colspan="2"
                      v-else
                    >
                      Analisys kenapa Lama Belum Di isi
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-success">7. COUNTER MEASURE</td>
                    <td class="bg-success">8. YOKOTEN COUNTERMEASURE</td>
                  </tr>
                  <tr>
                    <!-- TABLE CM -->
                    <td style="vertical-align: baseline !important">
                      <tr class="text-center">
                        <td style="width: 10px">No</td>
                        <td style="width: 200px">Countermeasure</td>
                        <td>C/M Category</td>
                        <td>PIC</td>
                        <td>Bagian</td>
                        <td>Kapan</td>
                        <td>Judg</td>
                      </tr>
                      <tr
                        v-for="(cmTerjadi, i) in containerCmTerjadi"
                        :key="cmTerjadi.cmDesc"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ cmTerjadi.cmDesc }}</td>
                        <td></td>
                        <td>{{ cmTerjadi.pic }}</td>
                        <td>MT</td>
                        <td>{{ cmTerjadi.datePlan }}</td>
                        <td v-if="cmTerjadi.judg" class="text-success">
                          {{ "OK" }}
                        </td>
                        <td v-else class="text-danger">{{ "Belum" }}</td>
                      </tr>
                      <tr v-if="containerCmTerjadi.length === 0">
                        <td
                          class="text-danger text-center"
                          style="
                            vertical-align: baseline !important;
                            border: none;
                          "
                          colspan="2"
                        >
                          Countermeasure Belum di isi
                        </td>
                      </tr>
                    </td>
                    <!-- TABLE YOKO -->
                    <td style="vertical-align: baseline !important">
                      <tr>
                        <td>Machine</td>
                        <td>PIC</td>
                        <td>Bagian</td>
                        <td>Kapan</td>
                        <td>Judg</td>
                      </tr>
                      <div v-if="containerYokoten.length !== 0">
                        <tr v-for="yokoten in containerYokoten" :key="yokoten">
                          <td>{{ yokoten.machine }}</td>
                          <td>{{ yokoten.pic }}</td>
                          <td>MT</td>
                          <td>{{ yokoten.datePlan }}</td>
                          <td v-if="yokoten.judg" class="text-success">
                            {{ "OK" }}
                          </td>
                          <td v-else class="text-danger">{{ "Belum" }}</td>
                        </tr>
                      </div>
                      <div v-else>
                        <tr>
                          <td
                            class="text-danger text-center"
                            style="
                              vertical-align: baseline !important;
                              border: none;
                            "
                            colspan="2"
                          >
                            Yokoten Tidak Ada
                          </td>
                        </tr>
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0" style="position: absolute; top: 20px">
      <div class="col-12 p-0">
        <button class="btn btn-primary" @click="exportToPDF()">Export</button>
      </div>
    </div>
    <div class="row m-0">
      <div class="col-12 p-0">
        <v-dialog v-model="dialogLoading" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              Downloading Pdf File
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import axios from "axios";
import TreeListAnalisys from "@/components/TreeListAnalisys.vue";
export default {
  name: "PdfViewerSmallProb",
  data() {
    return {
      fpart_change: "",
      fmc_name: "",
      fline: "",
      foperation_no: "",
      fmaker: "",
      ferror_name: "",
      foperator: "",
      isLoading: false,
      fshift: "",
      fav_categoty: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      fdur: "",
      fDescImage: "",
      isLongBd: false,
      url: null,
      containerWhyTerjadi: [],
      containerWhyLama: [],
      containerStepRepair: [],
      containerCmTerjadi: [],
      containerCmLama: [],
      containerYokoten: [],
      fid: "",
      dialogLoading: false,
      displayImage: null,
    };
  },
  methods: {
    exportToPDF(nameFile) {
      console.log(nameFile);
      html2pdf(this.$refs.content, {
        margin: 1,
        filename: nameFile,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "pt", format: "a3", orientation: "l" },
        allowTaint: true,
      }).then((pdf) => {
        console.log(pdf);
        // this.$router.go(-1);
        this.dialogLoading = false;
      });
    },
  },
  mounted() {
    this.isLoading = true;
    // this.dialogLoading = true;
    // console.log(this.$route.query.v_);
    axios
      .get(
        `${process.env.VUE_APP_HOST}/getDetailProblem?v_=${this.$route.query.v_}`
      )
      .then((result) => {
        this.isLoading = false;
        console.log(result);
        this.displayImage = `${process.env.VUE_APP_HOST}/image?path=${result.data.data[0].fimage}`;
        this.fid = result.data.data[0].fid;
        this.fmc_name = result.data.data[0].fmc_name;
        this.fline = result.data.data[0].fline;
        this.foperation_no = result.data.data[0].foperation_no;
        this.fmaker = result.data.data[0].fmaker;
        this.ferror_name = result.data.data[0].ferror_name;
        this.foperator = result.data.data[0].foperator;
        this.fshift = result.data.data[0].fshift;
        this.fav_categoty = result.data.data[0].fav_categoty;
        this.startDate = result.data.data[0].fstart_time.split("T")[0];
        this.startTime = result.data.data[0].fstart_time
          .split("T")[1]
          .split(".")[0];
        this.endDate = result.data.data[0].fend_time.split("T")[0];
        this.endTime = result.data.data[0].fend_time
          .split("T")[1]
          .split(".")[0];
        this.fdur = result.data.data[0].fdur;
        this.fDescImage = result.data.data[0].fDescImage;
        if (result.data.data[0].fstep_repair.includes("\n")) {
          this.containerStepRepair =
            result.data.data[0].fstep_repair.split("\n");
        }
        if (result.data.data[0].freal_prob.includes("\n")) {
          this.containerWhyTerjadi = result.data.data[0].freal_prob.split("\n");
        }
        if (result.data.data[0].froot_cause.includes("\n")) {
          this.containerWhyLama = result.data.data[0].froot_cause.split("\n");
        }
        this.fpart_change = result.data.data[0].fpart_change;
        if (result.data.data[0].fpermanet_cm.includes("[{")) {
          this.containerCmTerjadi = JSON.parse(
            result.data.data[0].fpermanet_cm
          );
        }
        if (result.data.data[0].fyokoten.includes("[{")) {
          this.containerYokoten = JSON.parse(result.data.data[0].fyokoten);
          //   [{"machine":"IMZY-0222","datePlan":"2021-01-29","pic":"Didi","judg":false}]
        }
        if (result.data.data[0].fpermanet_cm_lama.includes("[{")) {
          this.containerCmLama = JSON.parse(
            result.data.data[0].fpermanet_cm_lama
          );
        }
        // this.dialogLoading = false;
        this.exportToPDF(`${this.ferror_name}_${this.fmc_name}.pdf`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    TreeListAnalisys,
  },
};
</script>

<style scoped>
/* div {
    vertical-align: middle;
} */
.bg-success {
  background-color: #d7fdd0 !important;
}
</style>