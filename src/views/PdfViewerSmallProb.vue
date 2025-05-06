<template>
  <div class="container-fluid p-0 text-dark" style="font-weight: bold">
    <div class="row m-0 p-2" style="padding-right: 20px !important" ref="content">
      <div class="col-12 p-0">
        <div class="container-fluid p-0 m-0">
          <div class="row m-0 text-center">
            <div class="col-3 p-0 border border-dark" style="padding-top: 10px !important">
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
                border-dark
                d-flex
                align-items-center
                justify-content-center
              "
              style="vertical-align: middle"
            >
              <h4 class="text-primary" style="font-size: 20px">
                Machine Breakdown Report
              </h4>
            </div>
            <div class="col p-0 m-0 border border-left-0 border-dark" style="max-height: 140px">
              <table class=" p-0 m-0 table table-bordered-dark">
                <thead>
                  <tr>
                    <td style="width: 80px">D/H</td>
                    <td style="width: 80px">S/H Staff</td>
                    <td style="width: 80px">S/H Op</td>
                    <td style="width: 80px">GL</td>
                    <td style="width: 80px">TL</td>
                  </tr>
                  <tr>
                    <td style="height: 80px"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                    <td rowspan="3"></td>
                  </tr>
                  
                </thead>
              </table>
            </div>
          </div>
          
          <!-- Table Title -->
          <div class="row m-0 border border-dark">
            <div class="col-12 p-0">
              <table class=" m-0 p-0 table table-bordered">
                <tbody>
                  <tr>
                    <td>Operation No</td>
                    <td>:</td>
                    <td>{{ foperation_no }}</td>
                    <td>Start Date</td>
                    <td>:</td>
                    <td>{{ startDate }}</td>
                    <td>Finish Date</td>
                    <td>:</td>
                    <td>{{ endDate }}</td>
                  </tr>
                  <tr>
                    <td>Line</td>
                    <td>:</td>
                    <td>{{ fline }}</td>
                    <td>Start Time</td>
                    <td>:</td>
                    <td>{{ startTime }}</td>
                    <td>Finish Time</td>
                    <td>:</td>
                    <td>{{ endTime }}</td>
                  </tr>
                  <tr>
                    <td>M/C No</td>
                    <td>:</td>
                    <td>{{ fmc_name }}</td>
                    <td>Shift</td>
                    <td>:</td>
                    <td>{{ fshift }}</td>
                    <td>M/C Stop (min)</td>
                    <td>:</td>
                    <td>{{ fdur }}</td>
                  </tr>
                  <tr>
                    <td>Maker</td>
                    <td>:</td>
                    <td>{{ fmaker }}</td>
                    <td>Operator</td>
                    <td>:</td>
                    <td>{{ foperator }}</td>
                    <td>AV Category</td>
                    <td>:</td>
                    <td>{{ fav_categoty }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Problem -->
          <div class="row m-0 border border-dark" style="font-weight: bolder; font-size: 16px">
            <div class="col-3 p-0 bg-primary text-center">Problems</div>
            <div class="col-9 p-0 text-center">{{ ferror_name }}</div>
          </div>
          <!-- Ilus & Step -->
          <div class="row m-0 mt-1 border border-dark">
            <div class="col-4 p-0">
              <div class="row m-0 border border-left-0 border-bottom-0 border-dark">
                <div class="col-12 p-0 bg-primary text-center" style="font-weight: bolder; font-size: 16px">Illustration</div>
                <div class="col-12 p-0 text-center" style="height: 200px">
                  <p class="p-0 m-0 text-left px-4">{{ furaian_kejadian }}</p>
                  <img
                    :src="`data:image/png;base64,${displayImage}`"
                    width="250" class="img-fluid rounded"
                  />
                </div>
              </div>
            </div>
            <div class="col-8 p-0">
              <div class="row m-0 border-top border-dark">
                <div class="col-12 p-0 bg-primary text-center" style="font-weight: bolder; font-size: 16px">Step Repair</div>
                <div class="col-12 p-0">
                  <table class=" m-0 p-0 text-center">
                    <thead>
                      <tr>
                        <th style="max-width: 10px">No</th>
                        <th>Step Repair</th>
                        <th style="max-width: 50px">Repair Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(stepRepair, i) in containerStepRepair"
                        :key="stepRepair"
                      >
                        <td style="max-width: 25px">{{ i + 1 }}</td>
                        <td class="text-left">{{ stepRepair }}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Why Analisys & CM (kenapa terjadi) -->
          <div class="row m-0 p-0 mt-1 border border-dark">
            <div class="col p-0 m-0 border-top border-dark">
              <table class=" m-0 p-0 table table-bordered-dark">
                <thead>
                  <tr>
                    <td class="m-0 p-0 bg-primary text-center" style="width: 50% !important; font-weight: bolder; font-size: 16px">
                      Why Analisys (Kenapa Terjadi)
                    </td>
                    <td class="m-0 p-0 bg-primary text-center" style="width: 50% !important; font-weight: bolder; font-size: 16px">
                      Countermeasure (Kenapa Terjadi)
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="3" 
                    class=" m-0 p-0 text-center" 
                    style="height: 200px; vertical-align: baseline !important"
                    v-if="newAnalisys"
                    >
                      <TreeListAnalisys :hide="true" whyCategory="TERJADI"/>
                    </td>
                    <td
                      rowspan="3"
                      class=" m-0 p-0 text-center"
                      style="height: 200px; vertical-align: baseline !important"
                      v-else-if="containerWhyTerjadi.length > 0"
                    >
                      <tr class=" m-0 p-0">
                        <td style="max-width: 10px">No</td>
                        <td>Description</td>
                      </tr>
                      <tr
                        v-for="(whyTerjadi, i) in containerWhyTerjadi"
                        :key="whyTerjadi"
                      >
                        <td style="max-width: 20px">{{ i + 1 }}</td>
                        <td>
                          {{ whyTerjadi }}
                        </td>
                      </tr>
                    </td>
                    <td
                      class="text-danger"
                      style="
                        height: 200px;
                        vertical-align: baseline !important;
                      "
                      rowspan="3"
                      v-else
                    >
                      Analisys kenapa Terjadi Belum Di isi
                    </td>
                    <td class=" m-0 p-0 text-center table-center" style="vertical-align: baseline !important; "
                    v-if="containerCmTerjadi !== 0"
                    >
                      <tr class="p-0 m-0 text-center d-flex justify-content-center">
                        <th style="width: 30px" >No</th>
                        <th style="width: 190px">Countermeasure</th>
                        <th style="width: 90px">C/M Category</th>
                        <th style="width: 80px">PIC</th>
                        <th style="width: 50px">Bagian</th>
                        <th style="width: 80px">Kapan</th>
                        <th style="width: 40px">Judg</th>
                      </tr>
                      <tr class=" p-0 m-0 text-center d-flex justify-content-center"
                        v-for="(cmTerjadi, i) in containerCmTerjadi"
                        :key="cmTerjadi.cmDesc"
                      >
                        <td style="width: 30px">{{ i + 1 }}</td>
                        <td class="text-left" style="width: 190px">{{ cmTerjadi.cmDesc }}</td>
                        <td style="width: 90px">{{cmTerjadi.cmCategory}}</td>
                        <td style="width: 80px">{{ cmTerjadi.pic }}</td>
                        <td style="width: 50px">MT</td>
                        <td style="width: 80px">{{ cmTerjadi.datePlan }}</td>
                        <td style="width: 40px" v-if="cmTerjadi.judg" class="text-success">
                          {{ "OK" }}
                        </td>
                        <td style="width: 40px" v-else class="text-danger">{{ "Belum" }}</td>
                      </tr>
                      
                    </td>
                    <td
                      class="text-danger text-center"
                      style="
                        vertical-align: baseline !important;
                        border: none;
                      "
                      v-else
                    >
                      Countermeasure Belum di isi
                    </td>
                  </tr>
                  <tr>
                    <td class=" p-0 bg-primary text-center" style="height: 20px; font-weight: bolder; font-size: 16px">
                      Yokoten
                    </td>
                  </tr>
                  <tr >
                    <td class="m-0 p-0 text-center" style="vertical-align: baseline !important"
                    v-if="containerYokoten.length !== 0"
                    >
                      <tr class="p-0 m-0 text-center d-flex justify-content-center">
                        <th style="width: 30px">No</th>
                        <th style="width: 310px">Item yokoten</th>
                        <th style="width: 90px">Date Plan</th>
                        <th style="width: 80px">PIC</th>
                        <th style="width: 50px">Status</th>
                      </tr>
                      <tr class="p-0 m-0 text-center d-flex justify-content-center"
                        v-for="(yokoten, i) in containerYokoten"
                        :key="yokoten.machine"
                      >
                        <td style="width: 30px">{{ i + 1 }}</td>
                        <td style="width: 310px">
                          {{ yokoten.machine }}
                        </td>
                        <td style="width: 90px">{{ yokoten.datePlan }}</td>
                        <td style="width: 80px">{{ yokoten.pic }}</td>
                        <td style="width: 50px" class="text-success">{{ yokoten.judg }}</td>
                      </tr>
                    </td>
                    <td
                      class="text-danger text-center"
                      style="
                        vertical-align: baseline !important;
                        border: none;
                      "
                      v-else
                    >
                      Yokoten Tidak Ada
                    </td>
                  </tr>
                </thead>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0" style="position: absolute; top: 0px">
      <div class="col-12 p-0">
        <button class="btn btn-primary" @click="exportToPDF()">Download PDF</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import axios from "axios";
import TreeListAnalisys from "@/components/TreeListAnalisys.vue";
import imageToBase64 from 'image-to-base64/browser'
import {mapState} from "vuex"; 

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
      furaian_kejadian: "",
      displayImage: null,
      fimage_problem: null,
      isLongBd: false,
      url: null,
      containerWhyTerjadi: [],
      containerWhyLama: [],
      containerStepRepair: [],
      containerCmTerjadi: [],
      containerCmLama: [],
      containerYokoten: [],
      dialogLoading: false,
    };
  },

  computed: {
    ...mapState(["newAnalisys", "newAnalisys2"])
  },
  
  methods: {
    exportToPDF() {
      html2pdf(this.$refs.content, {
        margin: 1,
        filename: `${this.ferror_name}_${this.fmc_name}.pdf`,
        quality: 50,
        image: { type: "jpeg", quality: 1, },
        html2canvas: { dpi: 192, letterRendering: true, scale: 2,},
        jsPDF: { unit: "pt", format: "a4", orientation: "L" },
      }).then((pdf) => {
        console.log(pdf);
        // this.$router.go(-1);
        this.dialogLoading = false;
      });
    },
    convertImgToBase64(urlImage) {
      console.log(urlImage);
      return imageToBase64(`${urlImage}`) // Image URL
        .then(
            (response) => {
                console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."
                return response
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
                return error
            }
        )
    }
  },
  async mounted() {
    this.isLoading = true;
    // this.dialogLoading = true;
    // console.log(this.$route.query.v_);
    await axios
      .get(
        `${process.env.VUE_APP_HOST}/getDetailProblem?v_=${this.$route.query.v_}`
      )
      .then(async (result) => {
        this.isLoading = false;

        console.log(result.data.data[0]);
        if(result.data.data[0].uraian.length > 0) {
          for (let i = 0; i < result.data.data[0].uraian.length; i++) {
            const element = result.data.data[0].uraian[i];
            if(element.type_uraian == 'general') {
              this.furaian_kejadian = element.desc_nm
              this.fimage_problem = element.ilustration;
            }
          }
        }

        this.displayImage = await this.convertImgToBase64(`${process.env.VUE_APP_HOST}/image?path=${this.fimage_problem}`);
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
          this.containerStepRepair = result.data.data[0].fstep_repair.split(
            "\n"
          );
        }
        if (result.data.data[0].freal_prob.includes("\n")) {
          this.containerWhyTerjadi = result.data.data[0].freal_prob.split("\n");
        }
        if (result.data.data[0].froot_cause.includes("\n")) {
          this.containerWhyLama = result.data.data[0].froot_cause.split("\n");
        }
        this.fpart_change = result.data.data[0].fpart_change;
        // console.log(result.data.data[0].fpermanet_cm);
        if (result.data.data[0].fpermanet_cm.includes("[{")) {
          this.containerCmTerjadi = JSON.parse(
            result.data.data[0].fpermanet_cm
          );
        }
        if (result.data.data[0].fyokoten.includes("[{")) {
          this.containerYokoten = JSON.parse(result.data.data[0].fyokoten);
        }
        if (result.data.data[0].fpermanet_cm_lama.includes("[{")) {
          this.containerCmLama = JSON.parse(
            result.data.data[0].fpermanet_cm_lama
          );
        }
        // this.exportToPDF(`${this.ferror_name}_${this.fmc_name}.pdf`);
        // setInterval(() => {
        //   this.$router.push("/problemHistory");
        // }, 3000);
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