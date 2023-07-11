<template>
  <div
    class="container-fluid p-0 text-dark"
    style="margin-bottom: 130px; font-weight: bold"
  >
    <div class="row m-0 p-2" id="content-pdf" ref="content">
      <div class="col-12 p-0">
        <div class="container-fluid p-0 m-0">
          <!-- HEADER TITLE -->
          <div class="row m-0 text-center">
            <div class="col-3 p-0 border border-dark" style="padding-top: 30px !important">
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
                Long Time Breakdown & Recurrence Prevention Report
              </h4>
            </div>
            <div class="col p-0 border border-left-0 border-dark" style="max-height: 140px">
              <table class="table table-bordered-dark">
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
          <div class="row m-0 ">
            <div class="col-12 p-0">
              <table class="table table-bordered-dark">
                <thead class="text-center">
                  <tr>
                    <td class="bg-success" style="font-weight: bolder" rowspan="3">1. Kejadian</td>
                    <td colspan="7">Breakdown Start</td>
                    <td class="bg-success text-left px-2" style="font-weight: bolder" rowspan="3">
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
            <div class="col-12 p-0 border-top border-dark">
              <table class="table table-bordered-dark">
                <thead>
                  <tr style="height: 30px">
                    <td class="bg-success" colspan="2" style="width: 50%; font-weight: bolder">
                      3. PROBLEM DESCRIPTION
                    </td>
                    <td class="bg-success" rowspan="2" colspan="2" style="width: 50%; font-weight: bolder">
                      5.STEP REPAIR ( Micro Analysis )
                    </td>
                  </tr>
                  <tr style="height: 25px">
                    <td class="bg-succes text-center text" style="max-width: 50%; font-weight: bolder">
                      3.a. Uraian Kejadian
                    </td>
                    <td class="bg-succes text-center" style="max-width: 50%; font-weight: bolder">
                      3.b. Ilustrasi
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center" style="max-height: 300px; max-width: 200px">
                      <p class="text-left px-4">{{ furaian_kejadian }}</p>
                      <img
                        :src="`data:image/png;base64,${displayImage}`"
                        width="90%" class="img-fluid rounded"
                      />
                    </td>
                    <td class="text-center" style="max-height: 300px; max-width: 200px">
                      <p class="card bg-primary text-center m-0" style="width: 60px">Standart</p>
                      <p class="text-left m-0 px-2">{{ filustrasi_standart }}</p>
                      <img
                        :src="`data:image/png;base64,${displayImageStd}`"
                         width="50%" class="img-fluid rounded"
                      />
                      <p class="card bg-danger text-center m-0" style="width: 60px">Actual</p>
                      <p class="text-left m-0 px-2">{{ filustrasi_actual }}</p>
                      <img
                        :src="`data:image/png;base64,${displayImageAct}`"
                        width="50%" class="img-fluid rounded"
                      />
                    </td>
            
                      <!-- ACTUAL -->
                      
                        <td class="m-0 p-0 border-0" style=" vertical-align: baseline !important">
                          <table class="table table-bordered-dark">
                            <thead>
                              <tr class="text-center">
                                
                                <td rowspan="2" style="width: 10px">No</td>
                                <td rowspan="2" style="width: 300px">
                                  Step Repair
                                </td>
                                <td colspan="2" style="width: 20px">Work Time (min)</td>
                                <!-- <td rowspan="2" colspan="5">Menit</td> -->
                                <td rowspan="2" style="width: 30px">Q6</td>
                              </tr>
                              <tr>
                                <td style="width: 60px">Actual</td>
                                <td style="width: 60px">Ideal</td>
                              </tr>
                              <!-- STEP -->
                              <tr class="text-center" 
                                v-for="(stepRepair, i) in containerStepRepair"
                                :key="stepRepair"
                              >
                                <td class="text-center" v-if="i < 12">
                                  {{ i + 1 }}
                                </td>
                                <td v-if="i < 12" class="text-left">
                                  {{ stepRepair.stepDesc }}
                                </td>
                                <td v-if="i < 12">
                                  {{stepRepair.actualTime}}
                                </td>
                                <td v-if="i < 12">
                                  {{stepRepair.idealTime}}
                                </td>
                                <td v-if="i < 12">
                                  {{stepRepair.quick6}}
                                </td>
                                <!-- <td v-if="i < 7"></td>
                                <td v-if="i < 7"></td>
                                <td v-if="i < 7"></td>
                                <td v-if="i < 7"></td> -->
                              </tr>
                              <tr class="text-center">
                                <td colspan="2">Total Time</td>
                                <td>{{jumlahActual}}</td>
                                <td>{{jumlahIdeal}}</td>
                                <td></td>
                              </tr>
                            </thead>
                          </table>
                          
                        </td>
                        <td 
                            class="m-0 p-0 border-0 text-center justify-center" >
                          <!-- <div style=" scale: 50%" class="m-0 p-0 content-top"> -->
                            <div class="col m-0 p-0 text-center justify-center" style="width: 150px; height: 350px">
                              <div class="row m-0 p-0" >
                            <bar-chart  
                            v-if="chartData.datasets[0].data[0] !== 0"
                            style="height: 200px!important; width: 150px"
                            :chart-data="chartData"
                            :options="{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: { display: false },
                                title: { display: true, },
                              },
                              scales: {
                                yAxes: [{
                                  ticks: {
                                    min: 0,
                                    
                                    }
                                }]
                              }
              
                            }"
                            />
                              </div>
                              <div class="card border-danger row m-0 p-0 text-center content-center" style="scale: 90%">
                                <td class=" border-0 m-0 p-0" >
                                  <h2>{{bigQuick}}</h2>
                                  <b>{{bigDesc}}</b>
                                </td>
                              </div>
                              <div class="row m-0 p-0 conten-center alignment-center">
                                <td class="card bg-danger text-center m-0" style="width: 50px; height: 30px">
                                  <p>{{jumlahActual}} min</p>
                                  <p>Current Step</p>
                                </td>
                                <td class="text-center" style=" width: 50px; border: none">
                                  <i class="fa fa-arrow-right p-0"></i>
                                  <p class="text-danger">{{jumlahActual - jumlahIdeal}} min</p>
                                </td>
                                <td class="card bg-success text-center m-0" style="width: 50px; height: 30px">
                                  <p>{{jumlahIdeal}} min</p>
                                  <p>Ideal Step</p>
                                </td>
                              </div>
                            </div>
                          
                          <!-- </div> -->
                        </td>
                      
                  
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="row m-0 p-0">
            <div class="col-12 p-0 m-0 border-top border-dark">
              <table class="table table-bordered-dark">
                <thead>
                  <tr style="height: 30px">
                    <!-- TABLE WHY TERJADI -->
                    <td class="bg-success m-0 p-0" style="width: 50%; font-weight: bolder">
                      <tr>
                        <td>4. KENAPA TERJADI (5W Analysis)</td>
                        <td class="text-center m-0 p-0">
                          <tr>
                            <td style="width: 100px">PIC</td>
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
                    <td class="bg-success" style="width: 50%; font-weight: bolder" colspan="2">
                      6. KENAPA LAMA ( 5W Analysis )
                    </td>
                  </tr>
                  <tr>
                    <!-- KENAPA TERJADI -->
                    <td
                      style="
                        height: 300px;
                        
                        margin-top: 10px !important;
                      "
                      rowspan="3"
                      v-if="newAnalisys"
                    >
                      <div class= "m-0 p-0 text-center justify-center">
                        <TreeListAnalisys :hide="true" whyCategory="TERJADI"/>
                        <img
                        :src="`data:image/png;base64,${displayImageWhy}`"
                         width="40%" class="img-fluid rounded text-center"
                      />
                      </div>
                      
                      <div
                        v-for="(whyTerjadi, i) in containerWhyTerjadi"
                        :key="whyTerjadi.machine" hidden
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
                      v-if="newAnalisys2"
                    >
                      <div class= "content-center mx-10">
                        <TreeListAnalisys :hide="true" whyCategory="LAMA" />
                      </div>
                      
                      <div
                        v-for="(whyLama, i) in containerWhyLama"
                        :key="whyLama.machine" hidden
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
                    <td class="p-0 m-0" style="vertical-align: baseline !important">
                      <tr class="p-0 m-0 text-center">
                        <td style="width: 5%">No</td>
                        <td style="width: 50%">Countermeasure</td>
                        <td>C/M Category</td>
                        <td>PIC</td>
                        <td>Bagian</td>
                        <td>Kapan</td>
                        <td>Judg</td>
                      </tr>
                      <tr class="text-center"
                        v-for="(cmTerjadi, i) in containerCmTerjadi"
                        :key="cmTerjadi.cmDesc"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ cmTerjadi.cmDesc }}</td>
                        <td>{{cmTerjadi.cmCategory}}</td>
                        <td>{{ cmTerjadi.pic }}</td>
                        <td>MT</td>
                        <td>{{ cmTerjadi.datePlan }}</td>
                        <td v-if="cmTerjadi.judg" class="text-success">
                          {{ "OK" }}
                        </td>
                        <td v-else class="text-danger">{{ "Belum" }}</td>
                      </tr>
                      <tr
                        v-for="(cmLama, i) in containerCmLama"
                        :key="cmLama.cmDesc"
                      >
                        <td>{{ i + containerCmTerjadi.length + 1 }}</td>
                        <td>{{ cmLama.cmDesc }}</td>
                        <td>{{cmLama.cmCategory}}</td>
                        <td>{{ cmLama.pic }}</td>
                        <td>MT</td>
                        <td>{{ cmLama.datePlan }}</td>
                        <td v-if="cmLama.judg" class="text-success">
                          {{ "OK" }}
                        </td>
                        <td v-else class="text-danger">{{ "Belum" }}</td>
                      </tr>
                      <tr v-if="containerCmTerjadi.length === 0 && containerCmLama.length === 0">
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
                    <td class="m-0 p-0" style="vertical-align: baseline !important">
                      <tr>
                        <td>Machine</td>
                        <td>PIC</td>
                        <td>Bagian</td>
                        <td>Kapan</td>
                        <td >Judg</td>
                      </tr>
                      
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
                      
                      
                        <tr v-if="containerYokoten.length === 0">
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
import imageToBase64 from 'image-to-base64/browser'
import {mapState} from "vuex"
import BarChart from "@/components/BarChart.js";

export default {
  name: "PdfViewerSmallProb",
  data() {
    return {
      chartData :{
        labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
        datasets: [
          {
            label: "Ideal",
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: "#008000",
          },
          {
            label: "Actual",
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: "#FF0000",
          },
        ],
      },
      fpart_change: "",
      fmc_name: "",
      fline: "",
      foperation_no: "",
      fmaker: "",
      ferror_name: "",
      furaian_kejadian: "",
      filustrasi_standart: "",
      filustrasi_actual: "",
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
      fimage_problem: null,
      std_img: null,
      act_img: null,
      why1_img: null,
      displayImage: null,
      displayImageStd: null,
      displayImageAct: null,
      displayImageWhy: null,
      big: 0,
      bigQuick: "",
      q6Desc: ["Diagnose/Cause Analysis", "SparePart", "Tools", "Maintenance Ability", "Machine Backup", "Machine Setting"],
      bigDesc: "",
      jumlahIdeal: 0,
      jumlahActual: 0,
      
    };
  },
  computed: {
    filterSectionHeight() {
        const filterSectionDOM = document.getElementById("filterSection");
        return filterSectionDOM ? filterSectionDOM.offsetHeight : 0;   
      },
    ...mapState(["newAnalisys", "newAnalisys2"])
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
  watch: {
    newAnalisys: function() {
      console.log(this.newAnalisys);
      if(this.newAnalisys) {
        // this.exportToPDF(`${this.fmc_name}-${this.ferror_name}.pdf`);
      }
      // document.getElementById("bar-chart").style.height = "300px!important";
      let chartClasses = document.getElementsByClassName(
          "chartjs-render-monitor"
        );
        for (let i = 0; i < chartClasses.length; i++) {
          const element = chartClasses[i];
          element.style.height = "200px";
      }
    }
  },
  async mounted() {
    this.isLoading = true;
    // this.dialogLoading = true;
    // console.log(this.$route.query.v_);
    console.log(this.newAnalisys);
    await axios
      .get(
        `${process.env.VUE_APP_HOST}/getDetailProblem?v_=${this.$route.query.v_}`
      )
      .then(async (result) => {
        this.isLoading = false;
        console.log(result);
        if(result.data.data[0].uraian.length > 0) {
          for (let i = 0; i < result.data.data[0].uraian.length; i++) {
            const element = result.data.data[0].uraian[i];
            if(element.type_uraian == 'general') {
              this.furaian_kejadian = element.desc_nm
              this.fimage_problem = element.ilustration;
            }
            if(element.type_uraian == 'standard') {
              this.filustrasi_standart = element.desc_nm;
              this.std_img = element.ilustration;
            }
            if(element.type_uraian == 'actual') {
              this.filustrasi_actual = element.desc_nm;
              this.act_img = element.ilustration;
            }
          }
        }
        console.log(this.std_img);
        this.why1_img = result.data.data[0].why1_img;
        // this.displayImage = `${process.env.VUE_APP_HOST}/image?path=${result.data.data[0].fimage}`;
        // this.displayImage = await this.convertImgToBase64("http://localhost:3101/image?path=./upload/problem/file_problem_1685001006311-2023-05-25.png")
        // this.displayImageStd = await this.convertImgToBase64("http://localhost:3101/image?path=./upload/ilustration/std_file_1685001021779-2023-05-25.jpg")
        // this.displayImageAct = await this.convertImgToBase64("http://localhost:3101/image?path=./upload/ilustration/act_file_1685001032692-2023-05-25.jpg")
        // this.displayImageWhy = await this.convertImgToBase64("http://localhost:3101/image?path=./upload/ilustration/5whyterjadi_file_1684813575691-2023-05-23.png")

        this.displayImage = await this.convertImgToBase64(`${process.env.VUE_APP_HOST}/image?path=${this.fimage_problem}`);
        this.displayImageStd = await this.convertImgToBase64(`${process.env.VUE_APP_HOST}/image?path=${this.std_img}`);
        this.displayImageAct = await this.convertImgToBase64(`${process.env.VUE_APP_HOST}/image?path=${this.act_img}`);
        this.displayImageWhy = await this.convertImgToBase64(`${process.env.VUE_APP_HOST}/image?path=${this.why1_img}`);
        this.fid = result.data.data[0].fid;
        console.log(`${process.env.VUE_APP_HOST}/image?path=${this.fimage_problem}`);
        console.log(this.displayImage);
        this.fmc_name = result.data.data[0].fmc_name;
        this.fline = result.data.data[0].fline;
        this.foperation_no = result.data.data[0].foperation_no;
        this.fmaker = result.data.data[0].fmaker;
        this.ferror_name = result.data.data[0].ferror_name;
        // this.furaian_kejadian = result.data.data[0].furaian_kejadian;
        // this.filustrasi_standart = result.data.data[0].filustrasi_standart;
        // this.filustrasi_actual = result.data.data[0].filustrasi_actual;
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
        // if (result.data.data[0].fstep_repair.includes("\n")) {
        //   this.containerStepRepair =
        //     result.data.data[0].fstep_repair.split("\n");
        // }
        if (result.data.data[0].fstep_new.includes("[{")) {
            this.containerStepRepair = JSON.parse(
            result.data.data[0].fstep_new
          );
          if (this.containerStepRepair){
            console.log(this.chartData);
            for (let i = 0; i < this.containerStepRepair.length; i++) {
              if(this.containerStepRepair[i].quick6 == "Q1"){
                this.chartData.datasets[0].data[0] += this.containerStepRepair[i].idealTime;
                this.chartData.datasets[1].data[0] += this.containerStepRepair[i].actualTime;
              }else if(this.containerStepRepair[i].quick6 == "Q2"){
                this.chartData.datasets[0].data[1] += this.containerStepRepair[i].idealTime;
                this.chartData.datasets[1].data[1] += this.containerStepRepair[i].actualTime;
              }else if(this.containerStepRepair[i].quick6 == "Q3"){
                this.chartData.datasets[0].data[2] += this.containerStepRepair[i].idealTime;
                this.chartData.datasets[1].data[2] += this.containerStepRepair[i].actualTime;
              }else if(this.containerStepRepair[i].quick6 == "Q4"){
                this.chartData.datasets[0].data[3] += this.containerStepRepair[i].idealTime;
                this.chartData.datasets[1].data[3] += this.containerStepRepair[i].actualTime;
              }else if(this.containerStepRepair[i].quick6 == "Q5"){
                this.chartData.datasets[0].data[4] += this.containerStepRepair[i].idealTime;
                this.chartData.datasets[1].data[4] += this.containerStepRepair[i].actualTime;
              }else if(this.containerStepRepair[i].quick6 == "Q6"){
                this.chartData.datasets[0].data[5] += this.containerStepRepair[i].idealTime;
                this.chartData.datasets[1].data[5] += this.containerStepRepair[i].actualTime;
              }
            }
          }
          if(this.chartData.datasets){
            console.log(this.chartData.labels)
            console.log(this.chartData.datasets[0].data);
            for (let i = 0; i < 6; i++){
              this.jumlahIdeal += this.chartData.datasets[0].data[i];
              this.jumlahActual += this.chartData.datasets[1].data[i];
              if((this.chartData.datasets[1].data[i] - this.chartData.datasets[0].data[i]) > this.big){
                this.big = this.chartData.datasets[1].data[i] - this.chartData.datasets[0].data[i]
                this.bigQuick = this.chartData.labels[i];
                this.bigDesc = this.q6Desc[i];
              }
            }
          }
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
        
      })
      .catch((err) => {
        console.log(err);
      });
    
  },
  components: {
    TreeListAnalisys,
    BarChart,
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
/* #bar-chart {
  height: 200px !important;
} */
</style>