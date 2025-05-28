<template>
  <ScrollableContainer>
    <div class="container-fluid" style="padding-bottom: 80px">
      <h2>Edit Problem</h2>
      <i v-if="isLoading" class="fa fa-refresh fa-spin" style="font-size: 30px"></i>
      <!-- LOADING -->
      <v-dialog v-model="isLoading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Loading...
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Machine</span>
          <input class="form-control" type="text" v-model="fmc_name" disabled/>
        </div>
        <div class="col px-1 text-left">
          <span class="input-lable">Line</span>
          <input class="form-control" type="text" v-model="fline" disabled/>
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Operation No.</span>
          <input class="form-control" type="text" v-model="foperation_no" disabled/>
        </div>
        <div class="col px-1 text-left">
          <span class="input-lable">Maker</span>
          <input class="form-control" type="text" v-model="fmaker" disabled/>
        </div>
      </div>
      <!-- Prob & OP -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Problem</span>
          <input type="text" class="form-control" placeholder="nama problem" v-model="ferror_name"/>
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col-8 px-1 text-left">
          <span class="input-lable">Uraian Kejadian</span>
          <input class="form-control" type="text" placeholder="Uraian Problem" v-model="furaian_kejadian"/>
        </div>
        <div class="col-4 px-1 text-left">
          <span class="input-lable">Upload Image</span>
          <form method="post" @submit.prevent="
            onSubmitUploadFlex(
              `${urlUpload}?folder=problem&nameFile=${fileName}`,
              'file_problem', 'fimage_problem', 'displayImg_problem'
            )
            ">
            <div class="row m-0 p-0">
              <div class="col-8 p-0">
                <input class="form-control" name="sampleFile" ref="fimage_problem" type="file"
                       @change="uploadFile('fimage_problem')" placeholder="masukan ilustrasi problem"/>
              </div>
              <div class="col-1 py-0 m-0">
                <button class="btn btn-success btn-sm" @click="addToogle('isImgProblem')">
                  +
                </button>
              </div>
              <div class="col-1 py-0 m-0">
                <button class="btn btn-danger btn-sm" @click="deleteImg('deleteProblem1', 'fimage_problem')">
                  <i class="fa fa-trash" style="font-size: 10px"></i>
                </button>
              </div>
            </div>
          </form>
          <img :src="displayImg_problem" width="50" v-if="fimage_problem">
          <form v-if="isImgProblem || fimage2_problem" method="post" @submit.prevent="
            onSubmitUploadFlex(
              `${urlUpload}?folder=problem&nameFile=${fileName}`,
              'file_problem2', 'fimage2_problem', 'displayImg2_problem'
            )
            ">
            <div class="row m-0 p-0">
              <div class="col-8 p-0">
                <input class="form-control" name="sampleFile2" ref="fimage2_problem" type="file"
                       @change="uploadFile('fimage2_problem')" placeholder="masukan ilustrasi problem"/>
              </div>
              <div class="col-2 py-0 m-0">
                <button class="btn btn-danger btn-sm"
                        @click="onCancel('isImgProblem'), deleteImg('deleteProblem2', 'fimage2_problem')">
                  <i class="fa fa-trash" style="font-size: 10px"></i>
                </button>
              </div>
              <!-- <div class="col-2 p-0">
                <button class="btn btn-success btn-sm">View</button>
              </div> -->
            </div>
          </form>
          <img :src="displayImg2_problem" width="50" v-if="isImgProblem || fimage2_problem">
        </div>
      </div>
      <div v-if="isLongBd" class="row m-0 p-0">
        <div class="col-8 px-1 text-left">
          <span class="input-lable">Ilustrasi Standart</span>
          <input class="form-control" type="text" placeholder="Standart Condition" v-model="filustrasi_standart"/>
        </div>
        <div class="col-4 px-1 text-left">
          <span class="input-lable">Standart Image</span>
          <form method="post" @submit.prevent="
            onSubmitUploadFlex(
              `${urlUpload}?folder=ilustration&nameFile=${fileName}`,
              'std_file', 'std_img', 'displayStd_img'
            )
            ">
            <div class="row m-0 p-0">
              <div class="col-8 p-0">
                <input class="form-control" name="sampleFilestd" ref="std_img" type="file"
                       @change="uploadFile('std_img')"/>
              </div>
              <div class="col-1 py-0 m-0">
                <button class="btn btn-success btn-sm" @click="addToogle('isImgStd')">
                  +
                </button>
              </div>
              <div class="col-1 py-0 m-0">
                <button class="btn btn-danger btn-sm" @click="deleteImg('deleteStd1', 'std_img')">
                  <i class="fa fa-trash" style="font-size: 10px"></i>
                </button>
              </div>
            </div>
          </form>
          <img :src="displayStd_img" width="50" v-if="std_img">
          <form v-if="isImgStd || std2_img" method="post" @submit.prevent="
            onSubmitUploadFlex(
              `${urlUpload}?folder=ilustration&nameFile=${fileName}`,
              'std_file2', 'std2_img', 'displayStd2_img'
            )
            ">
            <div class="row m-0 p-0">
              <div class="col-8 p-0">
                <input class="form-control" name="sampleFilestd" ref="std2_img" type="file"
                       @change="uploadFile('std2_img')"/>
              </div>
              <div class="col-2 py-0 m-0">
                <button class="btn btn-danger btn-sm"
                        @click="onCancel('isImgStd'), deleteImg('deleteStd2', 'std2_img')">
                  <i class="fa fa-trash" style="font-size: 10px"></i>
                </button>
              </div>
            </div>
          </form>
          <img :src="displayStd2_img" width="50" v-if="isImgStd || std2_img">
        </div>
      </div>
      <div v-if="isLongBd" class="row m-0 p-0">
        <div class="col-8 px-1 text-left">
          <span class="input-lable">Ilustrasi Actual</span>
          <input class="form-control" type="text" placeholder="Actual Condition" v-model="filustrasi_actual"/>
        </div>
        <div class="col-4 px-1 text-left">
          <span class="input-lable">Actual Image</span>
          <form method="post" @submit.prevent="
            onSubmitUploadFlex(
              `${urlUpload}?folder=ilustration&nameFile=${fileName}`,
              'act_file', 'act_img', 'displayAct_img'
            )
            ">
            <div class="row m-0 p-0">
              <div class="col-8 p-0">
                <input class="form-control" name="sampleFilestd" ref="act_img" type="file"
                       @change="uploadFile('act_img')"/>
              </div>
              <div class="col-1 py-0 m-0">
                <button class="btn btn-success btn-sm" @click="addToogle('isImgAct')">
                  +
                </button>
              </div>
              <div class="col-1 py-0 m-0">
                <button class="btn btn-danger btn-sm" @click="deleteImg('deleteAct1', 'act_img')">
                  <i class="fa fa-trash" style="font-size: 10px"></i>
                </button>
              </div>
            </div>
          </form>
          <img :src="displayAct_img" width="50" v-if="act_img">
          <form v-if="isImgAct || act2_img" method="post" @submit.prevent="
            onSubmitUploadFlex(
              `${urlUpload}?folder=ilustration&nameFile=${fileName}`,
              'act_file2', 'act2_img', 'displayAct2_img'
            )
            ">
            <div class="row m-0 p-0">
              <div class="col-8 p-0">
                <input class="form-control" name="sampleFilestd" ref="act2_img" type="file"
                       @change="uploadFile('act2_img')"/>
              </div>
              <div class="col-2 py-0 m-0">
                <button class="btn btn-danger btn-sm"
                        @click="onCancel('isImgAct'), deleteImg('deleteAct2', 'act2_img')">
                  <i class="fa fa-trash" style="font-size: 10px"></i>
                </button>
              </div>
            </div>
          </form>
          <img :src="displayAct2_img" width="50" v-if="isImgAct || act2_img">
        </div>
      </div>
      <div v-if="isLongBd" class="row m-0 p-0">
        <div class="col-10 px-1 text-left">
          <span class="input-lable">Gap Between Standard and Actual</span>
          <input class="form-control" type="text" placeholder="Gap of Condition" v-model="gapIlustrasi"/>
        </div>
      </div>

      <div class="row mx-0 my-4 p-0">
        <div class="col-6 px-1 py-0">
          <button v-if="!is_ft_selected" class="btn btn-sm btn-outline-secondary w-100" @click="showModalFt()">
            <i class="fa fa-cheklist"></i>Pilih Focus thema Member
          </button>
          <button v-else class="btn btn-sm btn-primary w-100" disabled>
            <i class="fa fa-cheklist"></i>Focus thema <b>{{ memberFT }}</b>
          </button>
          <v-dialog v-model="modalShow" width="500">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Submit Focus Thema
              </v-card-title>

              <v-card-text class="p-4">
                <div class="row">
                  <div class="col-6">
                    <v-text-field v-model="fmc_name" label="Mesin" required disabled></v-text-field>
                  </div>
                  <div class="col-6">
                    <v-text-field v-model="ferror_name" label="Problem" required disabled></v-text-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col text-left">
                    <label class="typo__label text-bold">PIC</label>
                    <multiselect v-model="ft_pic" :options="optOperators" placeholder="Pilih Member"
                                 style="font-size: 10px"></multiselect>
                  </div>
                </div>
              </v-card-text>

              <v-divider class="m-0"></v-divider>

              <v-card-actions>
                <v-btn color="primary" text :loading="loadingBtn" @click="submitFT()">
                  Submit
                </v-btn>
                <v-btn color="warning" text @click="modalShow = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="col-6 px-1 py-0">
          <!-- TASKFORCE CHECKBOX -->
          <!-- <input type="checkbox" style="height: 20px" v-model="isTaskforce" /> -->
          <b-form-checkbox v-model="isTaskforce" name="check-button" button
                           :button-variant="isTaskforce ? 'outline-danger' : 'primary'">
            {{ isTaskforce ? "Batalkan Taskforce" : "Pilih Taskforce" }}
          </b-form-checkbox>
          <!-- <span style="font-size: 9px; font-weight: 800">Taskforce</span> -->
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col px-1 text-left">
              <span class="input-lable">Operator</span>
              <input class="form-control" type="text" disabled v-model="foperator"/>
              <multiselect v-model="foperator" :options="optOperators" :multiple="true" style="font-size: 10px">
              </multiselect>
            </div>
            <!-- <div class="col">
              <input type="checkbox" style="height: 20px" v-model="isFullcap" />
              <span style="font-size: 9px; font-weight: 800">FULLCAP</span>
            </div> -->
          </div>
        </div>
      </div>
      <!-- Av category & Shift -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">AV Category</span>
          <select ref="fav_categoty" id="fav_categoty" class="form-control" v-model="fav_categoty">
            <option value="MESIN">MESIN</option>
            <option value="DIES">DIES</option>
            <option value="TOOL">TOOL</option>
            <option value="COOLANT">COOLANT</option>
          </select>
        </div>
        <div class="col px-1 text-left">
          <span class="input-lable">Shift</span>
          <select ref="fshift" id="fshift" class="form-control" v-model="fshift">
            <option value="r">RED</option>
            <option value="w">WHITE</option>
          </select>
        </div>
      </div>
      <!-- TIME -->
      <div class="row p-0 m-0">
        <div class="col p-0">
          <span style="font-size: 8px; color: grey">AM (00:00 - 11:59) | PM (12:00 - 23:59)</span>
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Start Date</span>
          <div class="row m-0 p-0">
            <div class="col-7 p-0">
              <input style="font-size: 10px" class="form-control" type="date" v-model="startDate"/>
            </div>
            <div class="col-5 p-0">
              <input class="form-control" type="time" v-model="startTime"/>
            </div>
          </div>
        </div>
        <div class="col px-1 text-left">
          <span class="input-lable">Finish Date</span>
          <div class="row m-0 p-0">
            <div class="col-7 p-0">
              <input style="font-size: 10px" class="form-control" type="date" v-model="endDate"/>
            </div>
            <div class="col-5 p-0">
              <input class="form-control" type="time" v-model="endTime"/>
            </div>
          </div>
        </div>
      </div>
      <!-- DUR&Desc -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Duration (min)</span>
          <input class="form-control" type="text" v-model="fdur" disabled/>
        </div>
      </div>
      <!-- Ilustration (DISABLED)-->
      <div class="row m-0 p-0" style="display: none">
        <div class="col px-1 text-left">
          <div class="col px-1 text-left">
            <span class="input-lable">Description Ilustration</span>
            <input class="form-control" type="text" v-model="fDescImage"/>
          </div>
        </div>
        <div class="col px-1 text-left" style="display: none">
          <span class="input-lable">Image Ilustration</span>
          <img v-if="url" :src="url" style="width: 80%; height: 80%"/>
          <img v-else src="https://mtsn4malang.sch.id/wp-content/uploads/2019/08/placeholder-1.png"
               style="width: 80%; height: 80%"/>

        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Item Temporary Action</span>
          <input class="form-control" type="text" v-model="temporaryAction"/>
        </div>
      </div>
      <!-- Rootcause Terjadi -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Rootcause 5 Why (kenapa terjadi) </span>
          <!-- <button
            class="btn btn-success py-1"
            @click="addToogle('isWhyTerjadi')"
            style="font-size: 10px"
            v-if="!isLongBd"
          >
            +
          </button> -->
          <!-- WHY TERJADI -->
          <div class="row m-0 p-0">
            <table id="table-why-terjadi" class="table table-responsive text-center" style="font-size: 10px"
                   v-if="containerWhyTerjadi.length > 0">
              <thead>
              <tr>
                <th>No</th>
                <th style="max-width: 100px">Description</th>
                <th colspan="2">actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(whyTerjadi, i) in containerWhyTerjadi" :key="whyTerjadi">
                <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                <td class="text-left border" style="min-width: 220px"
                    v-if="!isEditWhyTerjadi || idxWhyTerjadiSelected != i">
                  {{ whyTerjadi }}
                </td>
                <td class="text-left border" style="min-width: 220px"
                    v-else-if="isEditWhyTerjadi && idxWhyTerjadiSelected == i">
                  <input type="text" v-model="descWhyTerjadi"/>
                </td>
                <td class="border">
                  <button class="btn btn-primary py-1 input-lable" @click="
                      onToogleEdit(
                        'isEditWhyTerjadi',
                        'descWhyTerjadi',
                        whyTerjadi,
                        i
                      )
                      " v-if="!isEditWhyTerjadi || idxWhyTerjadiSelected != i">
                    <i class="fa fa-pencil" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-primary py-1 input-lable" @click="
                      editContainerSingle(
                        i,
                        'containerWhyTerjadi',
                        'descWhyTerjadi',
                        'isEditWhyTerjadi'
                      )
                      " v-else-if="isEditWhyTerjadi && idxWhyTerjadiSelected == i">
                    <i class="fa fa-send" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                </td>
                <td class="border">
                  <button class="btn btn-danger py-1 input-lable">
                    <i class="fa fa-trash" style="font-size: 10px" aria-hidden="true"
                       @click="removeContainerSingle(i, 'containerWhyTerjadi')"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="
              row
              m-0
              p-0
              d-flex
              justify-content-around
              align-content-center
            " v-if="isWhyTerjadi">
            <div class="col-7 p-0">
              <input class="form-control mt-1" type="text" v-model="descWhyTerjadi"/>
            </div>
            <div class="col-2 p-0">
              <button class="btn btn-info py-1 input-lable" @click="onAddWhyTerjadi()">
                Submit
              </button>
            </div>
            <div class="col-2 p-0 ml-2">
              <button class="btn btn-danger py-1 input-lable" @click="onCancel('isWhyTerjadi')">
                Cancel
              </button>
            </div>
          </div>
          <div class="m-0 p-0">
            <TreeListAnalisys @checkAnalysis="checkAnalysis" :hide="false" whyCategory="TERJADI" :report="false"/>
          </div>
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">5 Why (Kenapa Terjadi) Image</span>
          <form method="post" @submit.prevent="
            onSubmitUploadFlex(
              `${urlUpload}?folder=ilustration&nameFile=${fileName}`,
              '5whyterjadi_file', 'why1_img', 'displayWhy1_img'
            )
            ">
            <div class="row m-0 p-0">
              <div class="col-8 p-0">
                <input class="form-control" name="sampleFile5why" ref="why1_img" type="file"
                       @change="uploadFile('why1_img')"/>
              </div>
              <div class="px-3 m-0">
                <button class="btn btn-success btn-sm" @click="addToogle('isImgTerjadi')">
                  +
                </button>
              </div>
              <div class="px-2 m-0">
                <button class="btn btn-danger btn-sm" @click="deleteImg('deleteWhy1', 'why1_img')">
                  <i class="fa fa-trash" style="font-size: 10px"></i>
                </button>
              </div>
            </div>
          </form>
          <img :src="displayWhy1_img" width="50" v-if="why1_img">
          <form v-if="isImgTerjadi || (why12_img && why12_img != 'null')" method="post" @submit.prevent="
            onSubmitUploadFlex(
              `${urlUpload}?folder=ilustration&nameFile=${fileName}`,
              '5whyterjadi_file2', 'why12_img', 'displayWhy12_img'
            )
            ">
            <div class="row m-0 p-0">
              <div class="col-8 p-0">
                <input class="form-control" name="sampleFile5why" ref="why12_img" type="file"
                       @change="uploadFile('why12_img')"/>
              </div>
              <div class="col-2 py-0 m-0">
                <button class="btn btn-danger btn-sm"
                        @click="onCancel('isImgTerjadi'), deleteImg('deleteWhy12', 'why12_img')">
                  <i class="fa fa-trash" style="font-size: 10px"></i>
                </button>
              </div>
            </div>
          </form>
          <img :src="displayWhy12_img" width="50" v-if="isImgTerjadi || (why12_img && why12_img != 'null')">
        </div>
      </div>
      <div class="col px-1 text-left" style="margin-top: 10px; margin-bottom: 25px;">
        <!-- O6 -->
        <div style="font-weight: bold;">Pilih O6:</div>
        <select v-model="oCategory" style="border: 0.1px solid black; padding-left: 5px;">
          <option disabled value="">Pilih O6</option>
          <option :value="1">O1: Design, Installation</option>
          <option :value="2">O2: Henkaten Issue</option>
          <option :value="3">O3: PM Issue</option>
          <option :value="4">O4: PM Skill</option>
          <option :value="5">O5: Environment</option>
          <option :value="6">O6: Lifetime</option>
        </select>
      </div>
      <!-- Step Repair -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Step Repair </span>
          <button class="btn btn-success py-1" @click="addToogle('isStepRepair')" style="font-size: 10px">
            +
          </button>
          <div class="row m-0 p-0">
            <table id="table-step-repair" class="table table-responsive text-center" style="font-size: 10px">
              <thead>
              <tr>
                <th>No</th>
                <th style="max-width: 100px">Description</th>
                <th colspan="2">actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(stepRepair, i) in containerStepRepair" :key="stepRepair">
                <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                <td class="text-left border" style="min-width: 220px"
                    v-if="!isEditStepRepair || idxStepRepairSelected != i">
                  {{ stepRepair }}
                </td>
                <td class="text-left border" style="min-width: 220px"
                    v-else-if="isEditStepRepair || idxStepRepairSelected != i">
                  <input type="text" v-model="descStepRepair"/>
                </td>
                <td class="border">
                  <button class="btn btn-primary py-1 input-lable">
                    <i class="fa fa-pencil" style="font-size: 10px" aria-hidden="true" @click="
                        onToogleEdit(
                          'isEditStepRepair',
                          'descStepRepair',
                          stepRepair,
                          i
                        )
                        " v-if="!isEditStepRepair || idxStepRepairSelected != i"></i>
                    <i class="fa fa-send" style="font-size: 10px" aria-hidden="true" @click="
                        editContainerSingle(
                          i,
                          'containerStepRepair',
                          'descStepRepair',
                          'isEditStepRepair'
                        )
                        " v-else-if="isEditStepRepair || idxStepRepairSelected != i
                        "></i>
                  </button>
                </td>
                <td class="border">
                  <button class="btn btn-danger py-1 input-lable">
                    <i class="fa fa-trash" style="font-size: 10px" aria-hidden="true"
                       @click="removeContainerSingle(i, 'containerStepRepair')"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="
              row
              m-0
              p-0
              d-flex
              justify-content-around
              align-content-center
            " v-if="isStepRepair && !isLongBd">
              <div class="col-7 p-0">
                <input class="form-control mt-1" type="text" v-model="descStepRepair"/>
              </div>
              <div class="col-2 p-0">
                <button class="btn btn-info py-1 input-lable" @click="onAddStepRepair()">
                  Submit
                </button>
              </div>
              <div class="col-2 p-0 ml-2">
                <button class="btn btn-danger py-1 input-lable" @click="onCancel('isStepRepair')">
                  Cancel
                </button>
              </div>
            </div>
            <table id="table-step-repair" class="table table-responsive text-center" style="font-size: 10px"
                   v-if="containerStepRepairNew.length > 0">
              <thead>
              <tr>
                <th>No</th>
                <th style="max-width: 100px">Description</th>
                <th style="max-width: 100px">Actual Time (Min)</th>
                <th style="max-width: 80px">Ideal Time (Min)</th>
                <th style="max-width: 100px">Q6</th>
                <th colspan="2">actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(stepRepair, i) in containerStepRepairNew" :key="stepRepair">
                <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                <td class="text-left border" style="min-width: 220px"
                    v-if="!isEditStepRepair || idxStepRepairSelected != i">
                  {{ stepRepair.stepDesc }}
                </td>
                <td class="text-left border" style="min-width: 220px"
                    v-else-if="isEditStepRepair || idxStepRepairSelected != i">
                  <input type="text" v-model="stepRepair.stepDesc"/>
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-if="!isEditStepRepair || idxStepRepairSelected != i">
                  {{ stepRepair.actualTime }}
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-else-if="isEditStepRepair || idxStepRepairSelected != i">
                  <input v-model.number="stepRepair.actualTime"/>
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-if="!isEditStepRepair || idxStepRepairSelected != i">
                  {{ stepRepair.idealTime }}
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-else-if="isEditStepRepair || idxStepRepairSelected != i">
                  <input v-model.number="stepRepair.idealTime"/>
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-if="!isEditStepRepair || idxStepRepairSelected != i">
                  {{ stepRepair.quick6 }}
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-else-if="isEditStepRepair || idxStepRepairSelected != i">
                  <select class="text-center border" style="min-width: 50px" v-model="stepRepair.quick6">
                    <option disabled value="">Quick 6</option>
                    <option value="Q1">Q1 (Diagnose/Cause Analysis)</option>
                    <option value="Q2">Q2 (SparePart)</option>
                    <option value="Q3">Q3 (Tools)</option>
                    <option value="Q4">Q4 (Maintenance Ability)</option>
                    <option value="Q5">Q5 (Machine Setting)</option>
                    <option value="Q6">Q6 (Machine Backup)</option>
                  </select>
                </td>
                <td class="border">
                  <button class="btn btn-primary py-1 input-lable" @click="
                      onToogleEditStep(
                        'isEditStepRepair',
                        'stepField',
                        stepRepair,
                        i
                      )
                      " v-if="!isEditStepRepair || idxStepRepairSelected != i">
                    <i class="fa fa-pencil" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-primary py-1 input-lable" @click="
                      editContainerObjStep(
                        i,
                        'containerStepRepairNew',
                        'stepField',
                        'isEditStepRepair',
                        stepRepair
                      )
                      " v-else-if="isEditStepRepair || idxStepRepairSelected != i">
                    <i class="fa fa-send" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                </td>
                <td class="border">
                  <button class="btn btn-danger py-1 input-lable">
                    <i class="fa fa-trash" style="font-size: 10px" aria-hidden="true"
                       @click="removeContainerSingle(i, 'containerStepRepairNew')"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-if="isStepRepair && isLongBd">
            <div class="
                row
                m-0
                p-0
                d-flex
                justify-content-around
                align-content-center
              ">
              <div class="col-6 p-0">
                <input class="form-control mt-1" type="text" placeholder="Description" v-model="stepField.stepDesc"/>
              </div>
              <div class="col p-0">
                <select class="form-control mt-1" v-model="stepField.quick6">
                  <option disabled value="">Quick 6</option>
                  <option value="Q1">Q1 (Diagnose/Cause Analysis)</option>
                  <option value="Q2">Q2 (SparePart)</option>
                  <option value="Q3">Q3 (Tools)</option>
                  <option value="Q4">Q4 (Maintenance Ability)</option>
                  <option value="Q5">Q5 (Machine Setting)</option>
                  <option value="Q6">Q6 (Machine Backup)</option>
                </select>
              </div>
              <div class="col p-0">
                <input class="form-control mt-1" placeholder="Actual Time" v-model.number="stepField.actualTime"/>
              </div>
              <div class="col p-0">
                <input class="form-control mt-1" placeholder="Ideal Time" v-model.number="stepField.idealTime"/>
              </div>

            </div>
            <div class="row m-0 p-0 text-right justify-content-end">
              <div class="col-2 p-0">
                <button class="btn btn-info py-1 input-lable" @click="onAddStepRepairNew()">
                  Submit
                </button>
              </div>
              <div class="col-1 p-0 ml-2">
                <button class="btn btn-danger py-1 input-lable" @click="onCancel('isStepRepair')">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Part Change -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Part Change</span>
          <input class="form-control" type="text" v-model="fpart_change"/>
        </div>
      </div>
      <!-- Countermeasure (terjadi) -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Countermeasure (kenapa terjadi) </span>
          <button class="btn btn-success py-1" @click="addToogle('isCmTerjadi')" style="font-size: 10px">
            +
          </button>
          <div class="row m-0 p-0">
            <table id="table-cm-terjadi" class="table table-responsive text-center" style="font-size: 10px"
                   v-if="containerCmTerjadi.length > 0">
              <thead>
              <tr>
                <th>No</th>
                <th style="max-width: 100px">Countermeasure</th>
                <th style="max-width: 50px">Plan Date</th>
                <th>PIC</th>
                <th style="max-width: 60px">C/M Category</th>
                <th style="max-width: 50px">Judg</th>
                <th style="min-width: 100px">Result Notes</th>
                <th colspan="2">actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(cmTerjadi, i) in containerCmTerjadi" :key="i">
                <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                <td class="text-left border" style="min-width: 220px"
                    v-if="!isEditCmTerjadi || idxCmTerjadiSelected != i">
                  {{ cmTerjadi.cmDesc }}
                </td>
                <td class="text-left border" style="min-width: 220px"
                    v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i">
                  <input type="text" v-model="cmTerjadi.cmDesc"/>
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-if="!isEditCmTerjadi || idxCmTerjadiSelected != i">
                  {{ cmTerjadi.datePlan }}
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i">
                  <input type="date" v-model="cmTerjadi.datePlan"/>
                </td>
                <td class="text-left border" v-if="!isEditCmTerjadi || idxCmTerjadiSelected != i">
                  {{ cmTerjadi.pic }}
                </td>
                <td class="text-left border" v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i">
                  <multiselect v-model="cmTerjadi.pic" :options="optOperators" :multiple="false"
                               style="font-size: 10px"></multiselect>
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-if="!isEditCmTerjadi || idxCmTerjadiSelected != i">
                  {{ cmTerjadi.cmCategory }}
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i">
                  <select class="form-control mt-1" v-model="cmTerjadi.cmCategory">
                    <option value="">C/M Category</option>
                    <option value="Improvement">Improvement</option>
                    <option value="Training">Training</option>
                    <option value="Revice TPM">Revisi TPM</option>
                    <option value="Sparepart">Sparepart</option>
                  </select>
                </td>
                <td v-if="cmTerjadi.judg == true &&
                    (!isEditCmTerjadi || idxCmTerjadiSelected != i)
                  " class="text-center border text-success" style="min-width: 50px">
                  {{ "Sudah" }}
                </td>
                <td v-else-if="cmTerjadi.judg == false &&
                    (!isEditCmTerjadi || idxCmTerjadiSelected != i)
                  " class="text-center border text-danger" style="min-width: 50px">
                  {{ "Belum" }}
                </td>
                <td class="text-center border" style="min-width: 50px"
                    v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i">
                  <select v-model="cmTerjadi.judg">
                    <option :value="false">Belum</option>
                    <option :value="true">Sudah</option>
                  </select>
                </td>
                <td class="border">
                  <input v-if="isEditCmTerjadi || idxCmTerjadiSelected == i" type="text" v-model="cmTerjadi.result"/>
                  <p class="m-0" v-else>
                    {{ cmTerjadi.result ? cmTerjadi.result : "-" }}
                  </p>
                </td>
                <td class="border">
                  <button class="btn btn-primary py-1 input-lable" @click="
                      onToogleEditObj(
                        'isEditCmTerjadi',
                        'cmField',
                        cmTerjadi,
                        i
                      )
                      " v-if="!isEditCmTerjadi || idxCmTerjadiSelected != i">
                    <i class="fa fa-pencil" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-primary py-1 input-lable" @click="
                      editContainerObj(
                        i,
                        'containerCmTerjadi',
                        'cmField',
                        'isEditCmTerjadi',
                        cmTerjadi
                      )
                      " v-else-if="isEditCmTerjadi || idxCmTerjadiSelected == i">
                    <i class="fa fa-send" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                </td>
                <td class="border">
                  <button class="btn btn-danger py-1 input-lable">
                    <i class="fa fa-trash" style="font-size: 10px" aria-hidden="true"
                       @click="removeContainerSingle(i, 'containerCmTerjadi')"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-if="isCmTerjadi">
            <div class="
                border border-secondary
                row
                m-0
                p-0
                d-flex
                justify-content-around
                align-content-center
              ">
              <div class="col-12 col-md-4 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      Ini Action? -
                      <input type="checkbox" style="height: 20px" v-model="isActionCm"/>
                    </div>
                  </div>
                  <input class="form-control mt-1" type="text" placeholder="countermeasure / action"
                         v-model="cmField.cmDesc"/>
                </div>
              </div>
              <div class="col-12 col-md-2 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <div class="input-group-text">Plan Date</div>
                  </div>
                  <input class="form-control mt-1" type="date" placeholder="date" v-model="cmField.datePlan"/>
                </div>
              </div>
              <div class="col-12 col-md-2 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <div class="input-group-text">C/M Category</div>
                  </div>
                  <select class="form-control mt-1" v-model="cmField.cmCategory">
                    <option value="">C/M Category</option>
                    <option value="Improvement">Improvement</option>
                    <option value="Training">Training</option>
                    <option value="Revice TPM">Revisi TPM</option>
                    <option value="Sparepart">Sparepart</option>
                  </select>
                </div>
              </div>
              <div class="col-12 col-md-4 p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <div class="input-group-text">Pic</div>
                  </div>
                  <multiselect v-model="cmField.pic" :options="optOperators" :multiple="false" class="w-80"
                               style="font-size: 10px"></multiselect>
                </div>
              </div>
            </div>
            <div class="row m-0 p-0 text-right justify-content-end">
              <div class="col-2 p-0">
                <button class="btn btn-info py-1 input-lable" @click="onAddCmTerjadi()">
                  Submit
                </button>
              </div>
              <div class="col-1 p-0 ml-2">
                <button class="btn btn-danger py-1 input-lable" @click="onCancel('isCmTerjadi')">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Yokoten -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left mb-2">
          <span class="input-lable">Yokoten </span>
          <button class="btn btn-success py-1" @click="addToogle('isYokoten')" style="font-size: 10px">
            +
          </button>
          <div class="row m-0 p-0">
            <table id="table-yokoten" class="table table-responsive text-center" style="font-size: 10px"
                   v-if="containerYokoten.length != 0">
              <thead>
              <tr>
                <th>No</th>
                <th style="max-width: 100px">Item Yokoten</th>
                <th style="max-width: 50px">Plan Date</th>
                <th style="max-width: 50px">PIC</th>
                <th style="max-width: 50px">Judg</th>
                <th colspan="2">actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(yokoten, i) in containerYokoten" :key="i">
                <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                <td class="text-left border" style="min-width: 220px"
                    v-if="!isEditYokoten || idxYokotenSelected != i">
                  {{ yokoten.machine }}
                </td>
                <td class="text-left border" style="min-width: 220px"
                    v-else-if="isEditYokoten || idxYokotenSelected != i">
                  <input type="text" v-model="yokoten.machine"/>
                </td>
                <td class="text-left border" style="min-width: 50px" v-if="!isEditYokoten || idxYokotenSelected != i">
                  {{ yokoten.datePlan }}
                </td>
                <td class="text-left border" style="min-width: 220px"
                    v-else-if="isEditYokoten || idxYokotenSelected != i">
                  <input type="date" v-model="yokoten.datePlan"/>
                </td>
                <td class="text-left border" style="min-width: 50px" v-if="!isEditYokoten || idxYokotenSelected != i">
                  {{ yokoten.pic }}
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-else-if="isEditYokoten || idxYokotenSelected != i">
                  <input type="text" v-model="yokoten.pic"/>
                </td>
                <td v-if="yokoten.judg == true &&
                    (!isEditYokoten || idxYokotenSelected != i)
                  " class="text-center border text-success" style="min-width: 50px">
                  {{ "Sudah" }}
                </td>
                <td v-else-if="yokoten.judg == false &&
                    (!isEditYokoten || idxYokotenSelected != i)
                  " class="text-center border text-danger" style="min-width: 50px">
                  {{ "Belum" }}
                </td>
                <td class="text-center border" style="min-width: 50px"
                    v-else-if="isEditYokoten || idxYokotenSelected == i">
                  <select v-model="yokoten.judg">
                    <option :value="false">Belum</option>
                    <option :value="true">Sudah</option>
                  </select>
                </td>
                <td class="border">
                  <button class="btn btn-primary py-1 input-lable" v-if="!isEditYokoten || idxYokotenSelected != i"
                          @click="
                        onToogleEditObj(
                          'isEditYokoten',
                          'yokoField',
                          yokoten,
                          i
                        )
                        ">
                    <i class="fa fa-pencil" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-primary py-1 input-lable" @click="
                      editContainerObj(
                        i,
                        'containerYokoten',
                        'yokoField',
                        'isEditYokoten',
                        yokoten
                      )
                      " v-else-if="isEditYokoten || idxYokotenSelected == i">
                    <i class="fa fa-send" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                </td>
                <td class="border">
                  <button class="btn btn-danger py-1 input-lable">
                    <i class="fa fa-trash" style="font-size: 10px" aria-hidden="true"
                       @click="removeContainerSingle(i, 'containerYokoten')"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-if="isYokoten">
            <div class="
                row
                m-0
                p-0
                d-flex
                justify-content-around
                align-content-center
              ">
              <div class="col p-0">
                <input class="form-control mt-1" type="text" placeholder="yokoyen item" v-model="yokoField.machine"/>
              </div>
              <div class="col p-0">
                <input class="form-control mt-1" type="date" placeholder="date" v-model="yokoField.datePlan"/>
              </div>
              <div class="col p-0">
                <input class="form-control mt-1" type="text" placeholder="Pic" v-model="yokoField.pic"/>
              </div>
            </div>
            <div class="row m-0 p-0">
              <div class="col p-0">
                <button class="btn btn-info py-1 input-lable" @click="onAddYokoten()">
                  Submit
                </button>
              </div>
              <div class="col p-0 ml-2">
                <button class="btn btn-danger py-1 input-lable" @click="onCancel('isYokoten')">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ISLONG BD (root LAMA) (CM LAMA) -->
      <!-- Why Lama -->
      <div v-if="isLongBd" class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Rootcause 5 Why (kenapa lama) </span>
          <!-- <button
            class="btn btn-success py-1"
            @click="addToogle('isWhyLama')"
            style="font-size: 10px"
            v-if="!isLongBd"
          >
            +
          </button> -->
          <div class="row m-0 p-0">
            <table id="table-why-lama" class="table table-responsive text-center" style="font-size: 10px">
              <thead>
              <tr>
                <th>No</th>
                <th style="max-width: 100px">Description</th>
                <th colspan="2">actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(whyLama, i) in containerWhyLama" :key="whyLama">
                <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                <td class="text-left border" style="min-width: 220px"
                    v-if="!isEditWhyLama || idxWhyLamaSelected != i">
                  {{ whyLama }}
                </td>
                <td class="text-left border" style="min-width: 220px"
                    v-else-if="isEditWhyLama && idxWhyLamaSelected == i">
                  <input type="text" v-model="descWhyLama"/>
                </td>
                <td class="border">
                  <button class="btn btn-primary py-1 input-lable" @click="
                      onToogleEdit('isEditWhyLama', 'descWhyLama', whyLama, i)
                      " v-if="!isEditWhyLama || idxWhyLamaSelected != i">
                    <i class="fa fa-pencil" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-primary py-1 input-lable" @click="
                      editContainerSingle(
                        i,
                        'containerWhyLama',
                        'descWhyLama',
                        'isEditWhyLama'
                      )
                      " v-else-if="isEditWhyLama && idxWhyLamaSelected == i">
                    <i class="fa fa-send" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                </td>
                <td class="border">
                  <button class="btn btn-danger py-1 input-lable">
                    <i class="fa fa-trash" style="font-size: 10px" aria-hidden="true"
                       @click="removeContainerSingle(i, 'containerWhyLama')"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="
              row
              m-0
              p-0
              d-flex
              justify-content-around
              align-content-center
            " v-if="isWhyLama">
            <div class="col-7 p-0">
              <input class="form-control mt-1" type="text" v-model="descWhyLama"/>
            </div>
            <div class="col-2 p-0">
              <button class="btn btn-info py-1 input-lable" @click="onAddWhyLama()">
                Submit
              </button>
            </div>
            <div class="col-2 p-0 ml-2">
              <button class="btn btn-danger py-1 input-lable" @click="onCancel('isWhyLama')">
                Cancel
              </button>
            </div>
          </div>
          <div v-if="isLongBd" class="m-0 p-0">
            <TreeListAnalisys :hide="false" whyCategory="LAMA" :report="false"/>
          </div>
        </div>
      </div>
      <div class="col px-1 text-left" style="margin-top: 25px; margin-bottom: 25px;">
        <!-- Q6 -->
        <div style="font-weight: bold;">Pilih Q6:</div>
        <select v-model="qCategory" style="border: 0.1px solid black; padding-left: 5px;">
          <option disabled value="">Pilih Q6</option>
          <option :value="1">Q1: Diagnose</option>
          <option :value="2">Q2: Sparepart</option>
          <option :value="3">Q3: Tool</option>
          <option :value="4">Q4: Maint. Ability</option>
          <option :value="5">Q5: Setting Ability</option>
          <option :value="6">Q6: Back-Up</option>
        </select>
      </div>
      <div class="row m-0 p-0" v-if="isLongBd">
        <div class="col px-1 text-left">
          <span class="input-lable">5 Why (Kenapa Lama) Image</span>
          <form method="post" @submit.prevent="
            onSubmitUploadFlex(
              `${urlUpload}?folder=ilustration&nameFile=${fileName}`,
              '5whyterjadi2_file', 'why2_img', 'displayWhy2_img'
            )
            ">
            <div class="row m-0 p-0">
              <div class="col-8 p-0">
                <input class="form-control" name="sampleFile5why" ref="why2_img" type="file"
                       @change="uploadFile('why2_img')"/>
              </div>
              <div class=" px-3 m-0">
                <button class="btn btn-success btn-sm" @click="addToogle('isImgLama')">
                  +
                </button>
              </div>
              <div class=" px-2 m-0">
                <button class="btn btn-danger btn-sm" @click="deleteImg('deleteWhy2', 'why2_img')">
                  <i class="fa fa-trash" style="font-size: 10px"></i>
                </button>
              </div>
            </div>
          </form>
          <img :src="displayWhy2_img" width="50" v-if="why2_img">
          <form v-if="isImgLama || (why22_img && why22_img != 'null')" method="post" @submit.prevent="
            onSubmitUploadFlex(
              `${urlUpload}?folder=ilustration&nameFile=${fileName}`,
              '5whyterjadi2_file2', 'why22_img', 'displayWhy22_img'
            )
            ">
            <div class="row m-0 p-0">
              <div class="col-8 p-0">
                <input class="form-control" name="sampleFile5why" ref="why22_img" type="file"
                       @change="uploadFile('why22_img')"/>
              </div>
              <div class="col-2 py-0 m-0">
                <button class="btn btn-danger btn-sm"
                        @click="onCancel('isImgLama'), deleteImg('deleteWhy22', 'why22_img')">
                  <i class="fa fa-trash" style="font-size: 10px"></i>
                </button>
              </div>
            </div>
          </form>
          <img :src="displayWhy22_img" width="50" v-if="isImgLama || (why22_img && why22_img != 'null')">
        </div>
      </div>
      <!-- CM LAMA -->
      <div v-if="isLongBd" class="row m-0 p-0">
        <div class="col px-1 text-left">
          <span class="input-lable">Countermeasure (kenapa Lama) </span>
          <button class="btn btn-success py-1" @click="addToogle('isCmLama')" style="font-size: 10px">
            +
          </button>
          <div class="row m-0 p-0">
            <table id="table-cm-lama" class="table table-responsive text-center" style="font-size: 10px"
                   v-if="containerCmLama.length > 0">
              <thead>
              <tr>
                <th>No</th>
                <th style="max-width: 100px">Countermeasure</th>
                <th style="max-width: 50px">Plan Date</th>
                <th style="max-width: 50px">PIC</th>
                <th style="max-width: 60px">C/M Category</th>
                <th style="max-width: 50px">Judg</th>
                <th style="min-width: 100px">Result Notes</th>
                <th colspan="2">actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(cmLama, i) in containerCmLama" :key="i">
                <td class="border" style="min-width: 10px">{{ i + 1 }}</td>
                <td class="text-left border" style="min-width: 220px" v-if="!isEditCmLama || idxCmLamaSelected != i">
                  {{ cmLama.cmDesc }}
                </td>
                <td class="text-left border" style="min-width: 220px"
                    v-else-if="isEditCmLama || idxCmLamaSelected == i">
                  <input type="text" v-model="cmLama.cmDesc"/>
                </td>
                <td class="text-left border" style="min-width: 50px" v-if="!isEditCmLama || idxCmLamaSelected != i">
                  {{ cmLama.datePlan }}
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-else-if="isEditCmLama || idxCmLamaSelected == i">
                  <input type="date" v-model="cmLama.datePlan"/>
                </td>
                <td class="text-left border" style="min-width: 50px" v-if="!isEditCmLama || idxCmLamaSelected != i">
                  {{ cmLama.pic }}
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-else-if="isEditCmLama || idxCmLamaSelected == i">
                  <input type="text" v-model="cmLama.pic"/>
                </td>
                <td class="text-left border" style="min-width: 50px" v-if="!isEditCmLama || idxCmLamaSelected != i">
                  {{ cmLama.cmCategory }}
                </td>
                <td class="text-left border" style="min-width: 50px"
                    v-else-if="isEditCmLama || idxCmLamaSelected == i">
                  <select class="form-control mt-1" v-model="cmLama.cmCategory">
                    <option value="">C/M Category</option>
                    <option value="Improvement">Improvement</option>
                    <option value="Training">Training</option>
                    <option value="Revice TPM">Revisi TPM</option>
                    <option value="Sparepart">Sparepart</option>
                  </select>
                </td>
                <td v-if="cmLama.judg == true &&
                    (!isEditCmLama || idxCmLamaSelected != i)
                  " class="text-center border text-success" style="min-width: 50px">
                  {{ "Sudah" }}
                </td>
                <td class="text-center border text-danger" style="min-width: 50px" v-else-if="cmLama.judg == false &&
                    (!isEditCmLama || idxCmLamaSelected != i)
                  ">
                  {{ "Belum" }}
                </td>
                <td class="text-center border" style="min-width: 50px"
                    v-else-if="isEditCmLama || idxCmLamaSelected == i">
                  <select v-model="cmLama.judg">
                    <option :value="false">Belum</option>
                    <option :value="true">Sudah</option>
                  </select>
                </td>
                <td class="border">
                  <input v-if="isEditCmLama || idxCmLamaSelected == i" type="text" v-model="cmLama.result"/>
                  <p class="m-0" v-else>
                    {{ cmLama.result ? cmLama.result : "-" }}
                  </p>
                </td>
                <td class="border">
                  <button class="btn btn-primary py-1 input-lable" @click="
                      onToogleEditObj('isEditCmLama', 'cmField', cmLama, i)
                      " v-if="!isEditCmLama || idxCmLamaSelected != i">
                    <i class="fa fa-pencil" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-primary py-1 input-lable" @click="
                      editContainerObj(
                        i,
                        'containerCmLama',
                        'cmField',
                        'isEditCmLama',
                        cmLama
                      )
                      " v-else-if="isEditCmLama || idxCmLamaSelected == i">
                    <i class="fa fa-send" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                </td>
                <td class="border">
                  <button class="btn btn-danger py-1 input-lable"
                          @click="removeContainerSingle(i, 'containerCmLama')">
                    <i class="fa fa-trash" style="font-size: 10px" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-if="isCmLama">
            <div class="
                row
                m-0
                p-0
                d-flex
                justify-content-around
                align-content-center
              ">
              <div class="col p-0">
                <input class="form-control mt-1" type="text" placeholder="countermeasure" v-model="cmField.cmDesc"/>
              </div>
              <div class="col p-0">
                <input class="form-control mt-1" type="date" placeholder="date" v-model="cmField.datePlan"/>
              </div>
              <div class="col p-0">
                <input class="form-control mt-1" type="text" placeholder="Pic" v-model="cmField.pic"/>
              </div>
              <div class="col p-0">
                <select class="form-control mt-1" v-model="cmField.cmCategory">
                  <option value="">C/M Category</option>
                  <option value="Improvement">Improvement</option>
                  <option value="Training">Training</option>
                  <option value="Revice TPM">Revisi TPM</option>
                  <option value="Sparepart">Sparepart</option>
                </select>
              </div>
            </div>
            <div class="row m-0 p-0 text-right justify-content-end">
              <div class="col-2 p-0">
                <button class="btn btn-info py-1 input-lable" @click="onAddCmLama()">
                  Submit
                </button>
              </div>
              <div class="col-1 p-0 ml-2">
                <button class="btn btn-danger py-1 input-lable" @click="onCancel('isCmLama')">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Attachment Meeting -->
      <div class="row m-0 p-0">
        <div class="col px-1 text-left">
          <!-- <input type="file" > -->
          <span class="input-lable">Attachment Meeting</span>
          <div class="row m-0 p-0">
            <div class="col-8 p-0">
              <input class="form-control" name="sampleFile" ref="attachFile" type="file" @change="onSelectAttachment"/>
            </div>
            <div class="col-2 p-0">
              <button class="btn btn-secondary btn-sm" type="submit"
                      @click="onSubmitAttach(`${urlUpload}?folder=attachmentMeeting&nameFile=attachment_${selectedAttachFile.name}`)">
                Upload
              </button>
            </div>
            <!-- <div class="col-2 p-0">
                <button class="btn btn-success btn-sm">View</button>
              </div> -->
          </div>
        </div>
      </div>
      <!-- DISPLAY ATTACHMENT MEETING -->
      <div class="row m-0 p-0" v-if="fattachment">
        <div class="col px-1">
          <a class="btn btn-primary w-100 text-light" :href="displayAttachment" style="opacity: 0.9" target="_blank">
            See Attachment
          </a>
        </div>
      </div>
      <LegendStatus style="margin-top: 20px"/>
      <div class="card">
        <div class="row m-0 p-0 mt-1">
          <div class="col text-left">
            <span style="font-size: 9px; font-weight: bold">Approval Status 5 Why</span>
          </div>
          <div class="col justify-content-around" v-if="setRole != 'TM' &&
            setRole != 'GH' &&
            setRole != 'Staff' &&
            setRole != 'Dph' &&
            setRole != 'DDH'
          ">
            <button class="btn-success btn px-2 py-1 fontSp mr-1" @click="submitEdit('WHY')"
                    :disabled="containerWhyTerjadi.length == 0">
              Approve
            </button>
            <button class="btn-info btn px-2 py-1 fontSp" @click="
              setRole == 'LH'
                ? (isDialogShowLhFiveWhy = true)
                : (isDialogShowShFiveWhy = true)
              ">
              Comment
            </button>
            <v-dialog v-model="isDialogShowLhFiveWhy" persistent width="500">
              <v-card>
                <v-card-title class="headline grey lighten-2" style="font-size: 15px !important">
                  Comment 5 Why Line Head:
                </v-card-title>

                <v-card-text class="p-0">
                  <div class="container-fluid mt-4">
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Feedback</span>
                          </div>
                          <input type="text" v-model="fiveWhyLhFeedback" class="form-control"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <button type="button" class="btn btn-success" data-dismiss="modal" @click="submitEdit('WHYFB')">
                    Send Feedback
                  </button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearDialog()">
                    Close
                  </button>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="isDialogShowShFiveWhy" persistent width="500">
              <v-card>
                <v-card-title class="headline grey lighten-2" style="font-size: 15px !important">
                  Comment 5 Why Section Head:
                </v-card-title>

                <v-card-text class="p-0">
                  <div class="container-fluid mt-4">
                    <div class="row p-0 m-0">
                      <div class="col p-0">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Feedback</span>
                          </div>
                          <input type="text" v-model="fiveWhyShFeedback" class="form-control"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <button type="button" class="btn btn-success" data-dismiss="modal" @click="submitEdit('WHYFB')">
                    Send Feedback
                  </button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearDialog()">
                    Close
                  </button>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
        <div class="row align-items-center justify-content-center m-0 p-0 mt-1">
          <div class="col">
            <table class="table table-bordered mt-1">
              <thead class="fontSp">
              <tr>
                <th>TL Check</th>
                <th>GL Check</th>
                <th>SH Check</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <div :class="`${fiveWhyTlApprove} text-center`">
                    <span style="font-size: 6px">.</span>
                  </div>
                </td>
                <td>
                  <div :class="`${fiveWhylhCheck} text-center`">
                    <span style="font-size: 6px">.</span>
                  </div>
                </td>
                <td>
                  <div :class="`${fiveWhyshCheck} text-center`">
                    <span style="font-size: 6px">.</span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Approval Status CM -->
        <div>
          <div class="row m-0 p-0 mt-1">
            <div class="col text-left">
              <span style="font-size: 9px; font-weight: bold">Approval Status Countermeasure</span>
            </div>
            <div class="col justify-content-around" v-if="setRole != 'TM' &&
              setRole != 'GH' &&
              setRole != 'Staff' &&
              setRole != 'Dph' &&
              setRole != 'DDH'
            ">
              <button class="btn-success btn px-2 py-1 fontSp mr-1" @click="submitEdit('CM')"
                      :disabled="containerCmTerjadi.length == 0">
                Approve
              </button>
              <button class="btn-info btn px-2 py-1 fontSp" @click="
                setRole == 'LH'
                  ? (isDialogShowLhCm = true)
                  : (isDialogShowShCm = true)
                ">
                Comment
              </button>
              <v-dialog v-model="isDialogShowLhCm" persistent width="500">
                <v-card>
                  <v-card-title class="headline grey lighten-2" style="font-size: 15px !important">
                    Comment C/M Line Head:
                  </v-card-title>

                  <v-card-text class="p-0">
                    <div class="container-fluid mt-4">
                      <div class="row p-0 m-0">
                        <div class="col p-0">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text">Feedback</span>
                            </div>
                            <input type="text" v-model="cmLhFeedback" class="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <button type="button" class="btn btn-success" data-dismiss="modal" @click="submitEdit('CMFB')">
                      Send Feedback
                    </button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearDialog()">
                      Close
                    </button>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="isDialogShowShCm" persistent width="500">
                <v-card>
                  <v-card-title class="headline grey lighten-2" style="font-size: 15px !important">
                    Comment C/M Section Head:
                  </v-card-title>

                  <v-card-text class="p-0">
                    <div class="container-fluid mt-4">
                      <div class="row p-0 m-0">
                        <div class="col p-0">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text">Feedback</span>
                            </div>
                            <input type="text" v-model="cmShFeedback" class="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <button type="button" class="btn btn-success" data-dismiss="modal" @click="submitEdit('CMFB')">
                      Send Feedback
                    </button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearDialog()">
                      Close
                    </button>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
          <div class="row align-items-center justify-content-center m-0 p-0 mt-1">
            <div class="col">
              <table class="table table-bordered mt-1">
                <thead class="fontSp">
                <tr>
                  <th>TL Check</th>
                  <th>GL Check</th>
                  <th>SH Check</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <div :class="`${cmTlApprove} text-center`">
                      <span style="font-size: 6px">.</span>
                    </div>
                  </td>
                  <td>
                    <div :class="`${cmlhCheck} text-center`">
                      <span style="font-size: 6px">.</span>
                    </div>
                  </td>
                  <td>
                    <div :class="`${cmshCheck} text-center`">
                      <span style="font-size: 6px">.</span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Approval Status CM DH -->
        <div>
          <div class="row m-0 p-0 mt-1">
            <div class="col text-left">
              <span style="font-size: 9px; font-weight: bold">Approval Status Departement Head</span>
            </div>
            <div class="col justify-content-around" v-if="setRole == 'Dph'">
              <button class="btn-success btn px-2 py-1 fontSp mr-1" @click="submitEdit('CM')"
                      :disabled="containerCmTerjadi.length == 0">
                Approve
              </button>
              <button class="btn-info btn px-2 py-1 fontSp" @click="isDialogShowDhCm = true">
                Comment
              </button>
              <v-dialog v-model="isDialogShowDhCm" persistent width="500">
                <v-card>
                  <v-card-title class="headline grey lighten-2" style="font-size: 15px !important">
                    Comment C/M Departement Head:
                  </v-card-title>

                  <v-card-text class="p-0">
                    <div class="container-fluid mt-4">
                      <div class="row p-0 m-0">
                        <div class="col p-0">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text">Feedback</span>
                            </div>
                            <input type="text" v-model="cmDhFeedback" class="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <button type="button" class="btn btn-success" data-dismiss="modal" @click="submitEdit('CMFB')">
                      Send Feedback
                    </button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearDialog()">
                      Close
                    </button>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
          <div class="row align-items-center justify-content-center m-0 p-0 mt-1">
            <div class="col">
              <table class="table table-bordered mt-1">
                <thead class="fontSp">
                <tr>
                  <th>Dph Check</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <div :class="`${dhCheck} text-center`">
                      <span style="font-size: 6px">.</span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Comment 5Why -->
        <div>
          <div class="row m-0 p-0 mt-1">
            <div class="col text-left">
              <span style="font-size: 9px; font-weight: bold">Comments 5 Why</span>
            </div>
          </div>
          <!-- isi comment 5 Why LH -->
          <div class="row mb-1" v-if="String(fiveWhyLhFeedback) != 'null' &&
            String(fiveWhyLhFeedback) != ''
          ">
            <div class="col-2 p-1 pr-0">
              <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" width="30"
                   style="position: absolute"/>
            </div>
            <div class="col-9 p-1">
              <div class="card rounded-all text-left p-1" style="font-size: 9px">
                GL: {{ fiveWhyLhFeedback }}
              </div>
            </div>
          </div>
          <!-- isi comment 5 Why SH -->
          <div class="row mb-1" v-if="String(fiveWhyShFeedback) != 'null' &&
            String(fiveWhyShFeedback) != ''
          ">
            <div class="col-2 p-1 pr-0">
              <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" width="30"
                   style="position: absolute"/>
            </div>
            <div class="col-9 p-1">
              <div class="card rounded-all text-left p-1" style="font-size: 9px">
                SH: {{ fiveWhyShFeedback }}
              </div>
            </div>
          </div>
          <!-- no comment -->
          <div class="row p-0 m-0" v-if="(String(fiveWhyShFeedback) == 'null' &&
            String(fiveWhyLhFeedback) == 'null') ||
            (String(fiveWhyShFeedback) == '' &&
              String(fiveWhyLhFeedback) == '')
          ">
            <div class="col text-secondary text-start fontSp">No Comments</div>
          </div>
        </div>
        <!-- Comment CM -->
        <div>
          <div class="row m-0 p-0 mt-1">
            <div class="col text-left">
              <span style="font-size: 9px; font-weight: bold">Comments Countermeasure</span>
            </div>
          </div>
          <!-- isi comment Countermeasure LH -->
          <div class="row mb-1" v-if="String(cmLhFeedback) != 'null' && String(cmLhFeedback) != ''">
            <div class="col-2 p-1 pr-0">
              <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" width="30"
                   style="position: absolute"/>
            </div>
            <div class="col-9 p-1">
              <div class="card rounded-all text-left p-1" style="font-size: 9px">
                GL: {{ cmLhFeedback }}
              </div>
            </div>
          </div>
          <!-- isi comment 5 Why SH -->
          <div class="row mb-1" v-if="String(cmShFeedback) != 'null' && String(cmShFeedback) != ''">
            <div class="col-2 p-1 pr-0">
              <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" width="30"
                   style="position: absolute"/>
            </div>
            <div class="col-9 p-1">
              <div class="card rounded-all text-left p-1" style="font-size: 9px">
                SH: {{ cmShFeedback }}
              </div>
            </div>
          </div>
          <!-- isi comment 5 Why SH -->
          <div class="row mb-1" v-if="String(cmDhFeedback) != 'null' && String(cmDhFeedback) != ''">
            <div class="col-2 p-1 pr-0">
              <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" width="30"
                   style="position: absolute"/>
            </div>
            <div class="col-9 p-1">
              <div class="card rounded-all text-left p-1" style="font-size: 9px">
                Dph: {{ cmDhFeedback }}
              </div>
            </div>
          </div>
          <!-- no comment -->
          <div class="row p-0 m-0" v-if="(String(cmShFeedback) == 'null' &&
            String(cmLhFeedback) == 'null') ||
            (String(cmShFeedback) == '' && String(cmLhFeedback) == '')
          ">
            <div class="col text-secondary text-start fontSp">No Comments</div>
          </div>
        </div>
        <div class="row m-0 p-0 justify-content-center" v-if="fimage">
          <div class="col-12 col-md-10 col-xl-12 py-0">
            <span style="font-size: 12px; font-weight: bold">Image Ilustration</span>
          </div>
          <div class="col-12 col-md-10 col-xl-12 py-0">
            <img :src="displayImg_problem" :alt="fimage" height="300" width="300"/>
            <a class="btn btn-primary text-light justify-content-center" style="
                position: absolute;
                left: 25%;
                bottom: 0px;
                width: 50%;
                opacity: 0.9;
              " :href="displayImg" target="_blank">
              Preview Image
            </a>
          </div>
        </div>
      </div>
      <div class="card mt-2">
        <span class="input-lable">Last Report File</span>
        <button v-if="!file_report" class="btn btn-sm btn-warning" disabled>Belum Ada Report di upload</button>
        <button v-else class="btn btn-sm btn-primary text-light mt-2" @click="downloadUploadedReport">
          Download Uploaded Report
        </button>
        <a class="btn btn-sm btn-success text-light mt-2"
           :href="reportUri" target="_blank" rel="noopener noreferrer">Download Template</a>
      </div>
      <div class="card mt-2" id="uploadReport">
        <div class="card-body">
          <span class="input-lable">Upload Report <a class="badge badge-pill badge-primary text-light"
                                                     :href="reportUri">Download
              Template</a></span>
          <input type="file" class="form-control" ref="fileReport" @change="isNotFill = false"/>
          <button class="btn btn-sm btn-primary" :disabled="isNotFill" @click="uploadFileReport()">
            Upload
          </button>
        </div>
      </div>
      <!-- SUBMIT EDIT BTN -->
      <hr class="bg-light m-0"/>
      <div class="row m-0 p-0 mt-3">
        <div class="col-6">
          <button v-if="!isDurationInvalid" class="btn btn-outline-success" :id="`${isPleaseFinish ? 'blink' : ''}`"
                  @click="submitEdit()" :disabled="isLoading" style="width: 100%">
            <i v-if="isLoading" class="fa fa-refresh fa-spin" style="font-size: 14px"></i>
            <div v-else>Finish</div>
          </button>
          <button class="btn btn-outline-info" v-if="isDurationInvalid && !isProblemClose" @click="updateEdit()"
                  style="width: 100%">
            <i v-if="isLoading" class="fa fa-refresh fa-spin" style="font-size: 14px"></i>
            <div v-else>Update</div>
          </button>
        </div>
        <div class="col-6">
          <button class="btn btn-outline-danger" @click="goBack()" style="width: 100%">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </ScrollableContainer>
</template>

<script>
import ScrollableContainer from "vue-scrollable-container";
import axios from "axios";
import {mapState} from "vuex";
import LegendStatus from "@/components/LegendStatus";
// import ExcalamationInfo from "../components/ExclamationInfo";
// import moment from "moment";
import formatDate from "@/functions/formatDate";

import TreeListAnalisys from "@/components/TreeListAnalisys.vue";
import Swal from "sweetalert2";

const host = (process.env.VUE_APP_HOST && process.env.VUE_APP_HOST !== "undefined") ? process.env.VUE_APP_HOST : window.location.origin;

export default {
  name: "EditProblem",
  data() {
    return {
      isNotFill: true,
      file_report: null,
      loadingBtn: false,
      memberFT: null,
      is_ft_selected: false,
      modalShow: false,
      ft_pic: null,
      id_p_m: null,
      initDateThema: null,
      id_m_problem_member: null,
      containerThemaActivity: [],
      isMemberThema: false,
      picThema: null,
      imgPicThema: null,
      target_finish_date: null,
      gl_comment: null,
      sh_comment: null,
      dph_comment: null,
      is_status: false,
      id_m_member: null,
      datePlanTheme: null,
      imgUrl: `${process.env.VUE_APP_HOST}`,
      isWhyTerjadi: false,
      isActionCm: false,
      isTaskforce: false,
      isEditWhyTerjadi: false,
      idxWhyTerjadiSelected: -1,
      isWhyLama: false,
      isEditWhyLama: false,
      idxWhyLamaSelected: -1,
      isStepRepair: false,
      isEditStepRepair: false,
      idxStepRepairSelected: -1,
      isCmTerjadi: false,
      isEditCmTerjadi: false,
      idxCmTerjadiSelected: -1,
      isCmLama: false,
      isEditCmLama: false,
      idxCmLamaSelected: -1,
      isYokoten: false,
      isEditYokoten: false,
      idxYokotenSelected: -1,
      containerWhyTerjadi: [],
      containerWhyLama: [],
      containerStepRepair: [],
      containerStepRepairNew: [],
      containerCmTerjadi: [],
      containerCmLama: [],
      containerYokoten: [],

      descWhyTerjadi: "",
      descWhyLama: "",
      descStepRepair: "",
      tlCheck: "dot",
      fiveWhylhCheck: "dot",
      fiveWhyshCheck: "dot",
      cmlhCheck: "dot",
      cmshCheck: "dot",
      dhCheck: "dot",
      stepField: {
        stepDesc: "",
        quick6: "",
        idealTime: 0,
        actualTime: 0,
      },
      cmField: {
        cmDesc: "",
        datePlan: "",
        pic: "",
        cmCategory: "",
        judg: false,
        result: null,
      },
      yokoField: {
        machine: "",
        datePlan: "",
        pic: "",
        judg: false,
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
      isDurationInvalid: false,
      isProblemClose: false,
      fmc_id: null,
      isHenkatenForm: false,

      fiveWhyTlApprove: "dot",
      fiveWhyLhApprove: 0,
      fiveWhyShApprove: 0,
      fiveWhyLhFeedback: "",
      fiveWhyShFeedback: "",

      cmLhApprove: 0,
      cmShApprove: 0,
      cmLhFeedback: "",
      cmShFeedback: "",

      cmDhApprove: 0,
      cmTlApprove: "dot",

      cmDhFeedback: "",
      cmTlFeedback: "",

      isDialogShowLhFiveWhy: false,
      isDialogShowLhCm: false,
      isDialogShowShFiveWhy: false,
      isDialogShowShCm: false,

      isDialogShowDhCm: false,

      itemsStatus: ["Approve", "Tidak Approve"],

      selectedStatusLhFiveWhy: "Tidak Approve",
      selectedStatusShFiveWhy: "Tidak Approve",
      selectedStatusLhCm: "Tidak Approve",
      selectedStatusShCm: "Tidak Approve",
      isLineHead: false,
      isSectionHead: false,

      setName: null,
      setArea: null,
      setRole: null,

      isPleaseFinish: "false",
      temporaryAction: "",

      isFullcap: false,
      uploadImage: null,
      urlUpload: `${process.env.VUE_APP_HOST}/upload`,
      fileName: null,
      selectedFile: null,
      selectedAttachFile: null,
      fimage_problem: null,
      displayImg_problem: null,
      fimage2_problem: null,
      displayImg2_problem: null,
      std_img: null,
      displayStd_img: null,
      std2_img: null,
      displayStd2_img: null,
      act_img: null,
      displayAct_img: null,
      act2_img: null,
      displayAct2_img: null,
      why1_img: null,
      displayWhy1_img: null,
      why12_img: null,
      displayWhy12_img: null,
      why2_img: null,
      displayWhy2_img: null,
      why22_img: null,
      displayWhy22_img: null,
      fattachment: null,
      displayAttachment: null,
      fimage: null,
      displayImg: null,
      optOperators: ["Loading ..."],
      optOperatorsThema: ["Loading ..."],
      gapIlustrasi: "",
      isImgProblem: false,
      isImgStd: false,
      isImgAct: false,
      isImgTerjadi: false,
      isImgLama: false,

      deleteProblem1: false,
      deleteProblem2: false,
      deleteAct1: false,
      deleteAct2: false,
      deleteStd1: false,
      deleteStd2: false,
      deleteWhy1: false,
      deleteWhy12: false,
      deleteWhy2: false,
      deleteWhy22: false,
      oCategory: "",
      qCategory: "",
    };
  },
  computed: {
    ...mapState(["storeTheme", "newAnalisys", "newAnalisys2"]),
reportUri() {
  return `${host}/v2/download-template?fid=${this.id_p_m}`;
}
  },
  methods: {
    scrollToUploadReport() {
      if (this.$route.hash === '#uploadReport') {
        this.$nextTick(() => {
          const el = document.getElementById('uploadReport');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    },
    async uploadFileReport() {
      try {
        this.isLoading = true
        const formData = new FormData();
        formData.append('fid', this.id_p_m)
        formData.append('problem', this.ferror_name)
        formData.append("file", this.$refs.fileReport.files[0]);
        console.log('==============================IYAAAAA=====================================');
        await axios.put(`${process.env.VUE_APP_HOST}/v2/upload-report`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        await this.getDetailProblem()
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        alert('gagal upload!')
      }
    },
    async downloadUploadedReport() {
      try {
        this.isLoading = true;
        const response = await axios.get(`${process.env.VUE_APP_HOST}/v2/download-report`, {
          params: {
            fid: this.id_p_m,
            problem: this.ferror_name,
            t: Date.now()
          },
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        // Set filename for download, you can customize this
        link.setAttribute('download', `${this.ferror_name}_report_${this.id_p_m}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        alert('Failed to download report!');
        console.error(error);
      }
    },
    downloadReportFromUrl() {
      // Construct the download URL using the given format
      const downloadUrl = `${process.env.VUE_APP_HOST}/v2/download-report?fid=${this.id_p_m}`;
      // Open the URL in a new tab to trigger the download
      window.open(downloadUrl, '_blank');
    },
    checkAnalysis(state) {
      console.log('CHECK ANALYSIS state');
      if (state) {
        this.fiveWhyTlApprove = this.checkStatus(1);
      } else {
        this.fiveWhyTlApprove = this.checkStatus(2);
      }
    },
    checkFocusTheme() {
      axios
          .get(
              `${process.env.VUE_APP_HOST}/focus-theme/check/${this.$route.query.v_}`
          )
          .then((result) => {
            console.log(result);
            if (result.data.data.length > 0) {
              let memberFT = result.data.data[0].member_name;
              this.is_ft_selected = true;
              this.memberFT = memberFT;
            } else {
              this.is_ft_selected = false;
              this.memberFT = null;
            }
          })
          .catch(() => {
            this.is_ft_selected = false;
            this.memberFT = null;
          });
    },
    submitFT() {
      this.loadingBtn = true;
      let newFT = {
        id_m_member: this.id_m_member,
        id_m_problem: +this.$route.query.v_,
      };
      console.log(newFT);
      axios
          .post(`${process.env.VUE_APP_HOST}/focus-theme`, newFT)
          .then(() => {
            alert("Berhasil menambah focus theme");
            this.modalShow = false;
            this.loadingBtn = false;
            this.checkFocusTheme();
          })
          .catch(() => {
            alert("Gagal menambah focus theme");
          });
    },
    showModalFt() {
      this.modalShow = true;
    },
    addContainerThema() {
      this.containerThemaActivity.push({
        desc: null,
        duration: 0,
        date_plan: null,
        date_actual: null,
        attachment: null,
        status: 0,
      });

      // this.newActivityThema = {

      // }
    },
    closeThema() {
      this.isLoading = true;
      axios
          .put(
              `${process.env.VUE_APP_HOST}/finishedTheme/${this.id_m_problem_member}`
          )
          .then(() => {
            alert("Problem Ini sudah close :) Mantaaaab ...");
            this.is_status = true;
            this.isLoading = false;
          })
          .catch(() => {
            alert("Eits Error Bro..");
            this.isLoading = false;
          });
    },
    addMemberTheme() {
      this.isLoading = true;
      if (this.id_m_member && this.initDateThema) {
        let newThema = {
          id_m_member: this.id_m_member,
          id_m_problem: this.$route.query.v_,
          init_date: this.initDateThema,
        };
        // 3600 * 1000 * 24 (one day)
        this.datePlanTheme ? (newThema.date_plan = this.datePlanTheme) : null;
        this.gl_comment ? (newThema.gl_comment = this.gl_comment) : null;
        this.sh_comment ? (newThema.sh_comment = this.sh_comment) : null;
        this.dph_comment ? (newThema.dph_comment = this.dph_comment) : null;
        this.containerThemaActivity.length > 0
            ? (newThema.detail_activity = JSON.stringify(
                this.containerThemaActivity
            ))
            : null;
        console.log(newThema);
        if (this.id_m_problem_member) {
          axios
              .put(
                  `${process.env.VUE_APP_HOST}/updateFocusTheme/${this.id_m_problem_member}`,
                  newThema
              )
              .then((result) => {
                console.log(result);
                this.isLoading = false;
                this.isMemberThema = true;
                // this.getDetailProblem();
                alert("Success Edit Member Thema");
              })
              .catch((err) => {
                this.isLoading = false;
                alert("Gagal Edit Member Thema");
                console.log(err);
              });
        } else {
          axios
              .post(`${process.env.VUE_APP_HOST}/addFocusTheme`, newThema)
              .then((result) => {
                console.log(result);
                this.isLoading = false;
                this.isMemberThema = true;
                // this.getDetailProblem();
                alert("Success Menambah Thema");
              })
              .catch((err) => {
                this.isLoading = false;
                alert("Gagal Menambah Thema");
                console.log(err);
              });
        }
      } else {
        alert("Di isi dulu nama dan date plan nya bestiee..");
        this.isLoading = false;
      }
    },
    uploadFile(state) {
      this[state] = this.$refs[state].files[0];
    },
    onSelectFlex(ref) {
      const file = this.$refs[ref].files[0];
      console.log(this.$refs[ref].files[0]);

      if (file.size > 1000000) {
        alert(
            "Size file anda terlalu besar (melebihi 1 MB), mohon di kecilkan"
        );
        this.$refs[ref].files[0].name = "";
      } else {
        // this.selectedFile = file;
        this.fileName = `${ref}_${Date.now()}`;
      }
    },
    async onSubmitUploadFlex(url, ref, fimage, displayImg) {
      this.isLoading = true;
      if (this.$refs[ref].files[0]) {
        const formData = new FormData();

        formData.append("file", this.$refs[ref].files[0]);
        // for (var key of formData.entries()) {
        //   console.log(key[1]);
        // }
        // console.log(this.selectedFile);
        // console.log(formData);
        await axios
            .post(url, formData)
            .then((result) => {
              console.log(result);
              if (result.status == 201) {
                this[fimage] = result.data.path;
                // localStorage.setItem("image", result.data.path);
                this[displayImg] = `${process.env.VUE_APP_HOST}/image?path=${result.data.path}`;
                alert(
                    "success to upload, silahkan tekan tombol finished kalau sudah slesai input semua data"
                );
              }
              this.isLoading = false;
            })
            .catch((err) => {
              console.log(err);
              this.isLoading = false;
              // alert(JSON.stringify(err));
            });
      } else {
        this.isLoading = false;
        alert(`Pastikan File tidak lebih dari 1 MB dan file sudah di pilih`);
      }
    },
    onSelect() {
      const file = this.$refs.file.files[0];
      console.log(this.$refs.file.files[0]);

      if (file.size > 1000000) {
        alert(
            "Size file anda terlalu besar (melebihi 1 MB), mohon di kecilkan"
        );
        this.$refs.file.files[0].name = "";
      } else {
        this.selectedFile = file;
      }
    },
    onSelectAttachment() {
      console.log(this.$refs.attachFile.files[0]);
      const attachFile = this.$refs.attachFile.files[0];
      this.selectedAttachFile = attachFile;
    },

    async onSubmitUpload(url) {
      this.isLoading = true;
      if (this.selectedFile) {
        const formData = new FormData();

        formData.append("file", this.selectedFile);
        for (var key of formData.entries()) {
          console.log(key[1]);
        }
        // console.log(this.selectedFile);
        // console.log(formData);
        await axios
            .post(url, formData)
            .then((result) => {
              console.log(result);
              if (result.status == 201) {
                this.fimage = result.data.path;
                // localStorage.setItem("image", result.data.path);
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
              // alert(JSON.stringify(err));
            });
      } else {
        this.isLoading = false;
        alert(`Pastikan File tidak lebih dari 1 MB dan file sudah di pilih`);
      }
    },
    async onSubmitAttach(url) {
      try {
        if (!this.fattachment) {
          this.isLoading = true;
          const formData = new FormData();
          formData.append("file", this.selectedAttachFile);
          await axios
              .post(url, formData)
              .then((result) => {
                console.log(result);
                if (result.status == 201) {
                  this.fattachment = result.data.path;
                  // localStorage.setItem("image", result.data.path);
                  this.displayAttachment = `${process.env.VUE_APP_HOST}/image?path=${result.data.path}`;
                  alert(
                      "success to upload, silahkan tekan tombol finished kalau sudah slesai input semua data"
                  );
                }
                this.isLoading = false;
              })
        } else {
          Swal.fire({
            title: "File sebelumnya akan hilang! kamu yakin ingin upload file?",
            showCancelButton: true,
            confirmButtonText: "Ya",
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.isLoading = true;
              const formData = new FormData();
              formData.append("file", this.selectedAttachFile);
              await axios
                  .post(url, formData)
                  .then((result) => {
                    console.log(result);
                    if (result.status == 201) {
                      this.fattachment = result.data.path;
                      // localStorage.setItem("image", result.data.path);
                      this.displayAttachment = `${process.env.VUE_APP_HOST}/image?path=${result.data.path}`;
                      alert(
                          "success to upload, silahkan tekan tombol finished kalau sudah slesai input semua data"
                      );
                    }
                    this.isLoading = false;
                  })
            }
          });
        }
      } catch (error) {
        alert(error);
        console.log(error);
        this.isLoading = false;
      }
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
    addToogle(cond) {
      this[`${cond}`] = true;
    },
    onCancel(cond) {
      this[`${cond}`] = false;
    },

    deleteImg(deletecond, displayImage) {
      this[`${deletecond}`] = 1;
      this[`${displayImage}`] = null;
    },
    onAddWhyTerjadi() {
      this.containerWhyTerjadi.push(this.descWhyTerjadi);
      this.descWhyTerjadi = "";
      this.isWhyTerjadi = false;
    },
    onAddWhyLama() {
      this.containerWhyLama.push(this.descWhyLama);
      this.descWhyLama = "";
      this.isWhyLama = false;
    },
    onAddStepRepair() {
      this.containerStepRepair.push(this.descStepRepair);
      this.descStepRepair = "";
      this.isStepRepair = false;
    },
    onAddStepRepairNew() {
      this.containerStepRepairNew.push(this.stepField);
      this.stepField = {
        stepDesc: "",
        quick6: "",
        idealTime: 0,
        actualTime: 0
      };
      this.isStepRepair = false;
    },
    onAddCmTerjadi() {
      this.containerCmTerjadi.push(this.cmField);
      this.cmField = {
        cmDesc: "",
        datePlan: "",
        pic: "",
        cmCategory: "",
        judg: false,
        result: null,
      };
      this.isCmTerjadi = false;
      this.isActionCm = false;
    },
    onAddCmLama() {
      this.containerCmLama.push(this.cmField);
      this.cmField = {
        cmDesc: "",
        datePlan: "",
        pic: "",
        cmCategory: "",
        judg: false,
        result: null,
      };
      this.isCmLama = false;
      this.isActionCm = false;
    },
    onAddYokoten() {
      this.containerYokoten.push(this.yokoField);
      this.yokoField = {
        machine: "",
        datePlan: "",
        pic: "",
        judg: false,
      };
      this.isYokoten = false;
    },
    onToogleEdit(condToogle, editDesc = null, beforeValue = null, idxSelected) {
      this[`${condToogle}`] = true;
      this.idxWhyTerjadiSelected = idxSelected;
      this.idxWhyLamaSelected = idxSelected;
      this.idxStepRepairSelected = idxSelected;
      if (editDesc || beforeValue) {
        this[`${editDesc}`] = beforeValue;
      }
    },
    onToogleEditStep(condToogle, editDesc = null, beforeValue = null, idxSelected) {
      this[`${condToogle}`] = true;
      this.idxStepRepairSelected = idxSelected;
      if (editDesc || beforeValue) {
        this[`${editDesc}`] = {
          stepDesc: beforeValue.stepDesc,
          idealTime: beforeValue.idealTime,
          actualTime: beforeValue.actualTime,
          quick6: beforeValue.quick6,
        };
      }
    },
    onToogleEditObj(
        condToogle,
        editDesc = null,
        beforeValue = null,
        idxSelected
    ) {
      this[`${condToogle}`] = true;
      this.idxCmTerjadiSelected = idxSelected;
      this.idxCmLamaSelected = idxSelected;
      this.idxYokotenSelected = idxSelected;
      if (editDesc == "cmField") {
        this[`${editDesc}`] = {
          cmDesc: beforeValue.cmDesc,
          datePlan: beforeValue.datePlan,
          pic: beforeValue.pic,
          judg: beforeValue.judg,
        };
      } else {
        this[`${editDesc}`] = {
          machine: beforeValue.machine,
          datePlan: beforeValue.datePlan,
          pic: beforeValue.pic,
          judg: beforeValue.judg,
        };
      }
    },
    removeContainerSingle(i, containerName) {
      let postIdx = i;
      if (postIdx > -1) {
        this[`${containerName}`].splice(postIdx, 1);
      }
    },
    editContainerSingle(idx, containerName, editDesc, condToogle) {
      this[`${containerName}`].splice(idx, 1, this[`${editDesc}`]);
      this[`${condToogle}`] = false;
      this[`${editDesc}`] = "";
    },
    editContainerObjStep(idx, containerName, editDesc, condToogle, afterVal) {
      console.log(this[`${containerName}`]);
      console.log(this[`${editDesc}`]);
      this[`${editDesc}`] = afterVal;
      this[`${containerName}`].splice(idx, 1, this[`${editDesc}`]);
      this[`${condToogle}`] = false;
      this[`${editDesc}`] = {stepDesc: "", quick6: "", idealTime: 0, actualTime: 0};
    },
    editContainerObj(idx, containerName, editDesc, condToogle, afterVal) {
      console.log(this[`${containerName}`]);
      console.log(this[`${editDesc}`]);
      this[`${editDesc}`] = afterVal;
      this[`${containerName}`].splice(idx, 1, this[`${editDesc}`]);
      this[`${condToogle}`] = false;
      this[`${editDesc}`] = {cmDesc: "", datePlan: "", pic: "", cmCategory: "", judg: false};
    },
    editCmCategory(idx, containerName, afterVal) {
      this[`${containerName}`].splice(idx, 1, afterVal);
      afterVal = "";
    },

    async submitEdit() {
      try {
        if (this.newAnalisys) {
          await axios
              .post(
                  `${process.env.VUE_APP_HOST}/why_analisys/add/${this.$route.query.v_}?analisys_category=TERJADI`,
                  this.newAnalisys
              )
        }
        if (this.newAnalisys2) {
          await axios
              .post(
                  `${process.env.VUE_APP_HOST}/why_analisys/add/${this.$route.query.v_}?analisys_category=LAMA`,
                  this.newAnalisys2
              )
        }
        if (this.picThema) {
          this.addMemberTheme();
        }
        this.isLoading = true;
        let isBack = true;
        if (this.containerWhyTerjadi.length == 1) {
          this.containerWhyTerjadi.push("");
        }
        if (this.containerWhyLama.length == 1) {
          this.containerWhyTerjadi.push("");
        }
        let formData = new FormData();
        formData.append('fimage_problem', this.fimage_problem)
        formData.append('std_img', this.std_img)
        formData.append('act_img', this.act_img)
        formData.append('why1_img', this.why1_img)
        formData.append('why2_img', this.why2_img)
        formData.append('fimage2_problem', this.fimage2_problem)
        formData.append('std2_img', this.std2_img)
        formData.append('act2_img', this.act2_img)
        formData.append('why12_img', this.why12_img)
        formData.append('why22_img', this.why22_img)
        if (this.fattachment) {
          formData.append('fattachment', this.fattachment);
        }
        let dataPrev = {
          furaian_kejadian_general: this.furaian_kejadian,
          furaian_kejadian_standard: this.filustrasi_standart,
          furaian_kejadian_actual: this.filustrasi_actual,
          gapIlustrasi: this.gapIlustrasi,
          ferror_name: this.ferror_name,
          foperator: this.foperator,
          fshift: this.fshift,
          fav_categoty: this.fav_categoty,
          fstart_time: `${this.startDate} ${this.startTime}`,
          fend_time: `${this.endDate} ${this.endTime}`,
          fpart_change: this.fpart_change,
          fDescImage: this.fDescImage,
          fstep_repair: this.containerStepRepair.join("\n"),
          fstep_new: JSON.stringify(this.containerStepRepairNew),
          fiveWhyLhApprove: this.fiveWhyLhApprove,
          fiveWhyShApprove: this.fiveWhyShApprove,
          cmLhApprove: this.cmLhApprove,
          cmShApprove: this.cmShApprove,
          cmDhApprove: this.cmDhApprove,
          fiveWhyLhFeedback: this.fiveWhyLhFeedback,
          fiveWhyShFeedback: this.fiveWhyShFeedback,
          cmLhFeedback: this.cmLhFeedback,
          cmShFeedback: this.cmShFeedback,
          cmDhFeedback: this.cmDhFeedback,
          freal_prob: this.containerWhyTerjadi.join("\n"),
          froot_cause: this.containerWhyLama.join("\n"),
          fpermanet_cm: JSON.stringify(this.containerCmTerjadi),
          fyokoten: JSON.stringify(this.containerYokoten),
          fpermanet_cm_lama: JSON.stringify(this.containerCmLama),
          temporaryAction: this.temporaryAction,
          deleteProblem1: this.deleteProblem1,
          deleteProblem2: this.deleteProblem2,
          deleteAct1: this.deleteAct1,
          deleteAct2: this.deleteAct2,
          deleteStd1: this.deleteStd1,
          deleteStd2: this.deleteStd2,
          deleteWhy1: this.deleteWhy1,
          deleteWhy12: this.deleteWhy12,
          deleteWhy2: this.deleteWhy2,
          deleteWhy22: this.deleteWhy22,
          oCategory: this.oCategory,
          qCategory: this.qCategory
        };

        for (const key in dataPrev) {
          let value = dataPrev[key]

          formData.append(key, value)
        }
        dataPrev = formData
        if (this.fimage) {
          dataPrev.fimage = this.fimage;
        }

        if (this.fav_categoty != null) {
          if (this.fshift != null) {
            let url = `${process.env.VUE_APP_HOST}/editProblem/${this.$route.query.v_}`;
            if (this.isProblemClose) {
              url += `?isFinished=${this.fmc_id}&line=${this.fline}`;
            }
            await axios
                .put(url, dataPrev)
                .then(async (result) => {
                  console.log(result);
                  this.isLoading = false;
                  if (isBack) {
                    alert("Success to Edit Problem");
                    this.$router.go(-1);
                  } else {
                    // alert("Success");
                    this.getDetailProblem();
                    // this.$router.go();
                  }
                })
            if (localStorage.getItem("intervalId")) {
              clearInterval(localStorage.getItem("intervalId"))
              localStorage.removeItem("intervalId")
              localStorage.removeItem('notificationId')
            }
          } else {
            document.getElementById("fshift").style.borderColor = "red";
            this.$refs.fshift.focus();
            this.isLoading = false;
          }
        } else {
          if (this.fshift != null) {
            console.log(dataPrev);
            this.isLoading = false;
          } else {
            this.$refs.fshift.focus();
            document.getElementById("fshift").style.borderColor = "red";
            this.isLoading = false;
          }
          this.$refs.fav_categoty.focus();
          this.isLoading = false;
          document.getElementById("fav_categoty").style.borderColor = "red";
        }
      } catch (error) {
        alert(JSON.stringify(error));
        this.isLoading = false;
      }
    },
    async updateEdit() {
      try {
        console.log(this.newAnalisys);
        if (this.newAnalisys) {
          await axios
              .post(
                  `${process.env.VUE_APP_HOST}/why_analisys/add/${this.$route.query.v_}?analisys_category=TERJADI`,
                  this.newAnalisys
              )
              .then((result) => {
                console.log(result);
              })
        }
        if (this.newAnalisys2) {
          await axios
              .post(
                  `${process.env.VUE_APP_HOST}/why_analisys/add/${this.$route.query.v_}?analisys_category=LAMA`,
                  this.newAnalisys2
              )
              .then((result) => {
                console.log(result);
              })
        }
        this.isLoading = true;
        let formData = new FormData();
        formData.append('fimage_problem', this.fimage_problem)
        formData.append('std_img', this.std_img)
        formData.append('act_img', this.act_img)
        formData.append('why1_img', this.why1_img)
        formData.append('why2_img', this.why2_img)
        formData.append('fimage2_problem', this.fimage2_problem)
        formData.append('std2_img', this.std2_img)
        formData.append('act2_img', this.act2_img)
        formData.append('why12_img', this.why12_img)
        formData.append('why22_img', this.why22_img)
        let dataPrev = {
          furaian_kejadian_general: this.furaian_kejadian,
          furaian_kejadian_standard: this.filustrasi_standart,
          furaian_kejadian_actual: this.filustrasi_actual,
          gapIlustrasi: this.gapIlustrasi,
          ferror_name: this.ferror_name,
          foperator: this.foperator,
          fav_categoty: this.fav_categoty,
          fstart_time: `${this.startDate} ${this.startTime}`,
          fend_time: `${this.endDate} ${this.endTime}`,
          fpart_change: this.fpart_change,
          fDescImage: this.fDescImage,
          fiveWhyLhApprove: this.fiveWhyLhApprove,
          fiveWhyShApprove: this.fiveWhyShApprove,
          cmLhApprove: this.cmLhApprove,
          cmShApprove: this.cmShApprove,
          fiveWhyLhFeedback: this.fiveWhyLhFeedback,
          fiveWhyShFeedback: this.fiveWhyShFeedback,
          cmLhFeedback: this.cmLhFeedback,
          cmShFeedback: this.cmShFeedback,
          fstep_repair: this.containerStepRepair.join("\n"),
          fstep_new: JSON.stringify(this.containerStepRepairNew),
          freal_prob: this.containerWhyTerjadi.join("\n"),
          froot_cause: this.containerWhyLama.join("\n"),
          fpermanet_cm: JSON.stringify(this.containerCmTerjadi),
          fyokoten: JSON.stringify(this.containerYokoten),
          fpermanet_cm_lama: JSON.stringify(this.containerCmLama),
          temporaryAction: this.temporaryAction,
          deleteProblem1: this.deleteProblem1,
          deleteProblem2: this.deleteProblem2,
          deleteAct1: this.deleteAct1,
          deleteAct2: this.deleteAct2,
          deleteStd1: this.deleteStd1,
          deleteStd2: this.deleteStd2,
          deleteWhy1: this.deleteWhy1,
          deleteWhy12: this.deleteWhy12,
          deleteWhy2: this.deleteWhy2,
          deleteWhy22: this.deleteWhy22,
          oCategory: this.oCategory,
          qCategory: this.qCategory
        };
        for (const key in dataPrev) {
          let value = dataPrev[key]

          formData.append(key, value)
        }
        dataPrev = formData

        if (this.fshift) {
          dataPrev.fshift = this.fshift;
        }
        let url = `${process.env.VUE_APP_HOST}/editProblem/${this.$route.query.v_}?fline=${this.fline}&fmc_name=${this.fmc_name}`;
        await axios
            .put(url, dataPrev)
            .then(() => {
              alert("Success to update problem");
              this.isLoading = false;
              this.$router.go(-1);
            })

      } catch (err) {
        console.log(err);
        alert(JSON.stringify(err));
        this.isLoading = false;
      }
    },
    onFileChange(e) {
      // const file
      console.log(e);
      // this.uploadImage = file;
      // this.url = URL.createObjectURL(file);
      // var data = new FormData();
      // data.append("image", file);
      // console.log(data);
    },
    goBack() {
      this.$router.go(-1);
    },
    getMcId() {
      console.log(this.fmc_name);
      axios
          .get(`${process.env.VUE_APP_HOST}/searchMc?machine=${this.fmc_name}`)
          .then((result) => {
            // console.log("GETTING ID MC");
            // console.log(result.data.data[0]);
            this.fmc_id = result.data.data[0].fid;
          })
          .catch((err) => {
            console.log(err);
            // alert(JSON.stringify(err));
          });
    },
    clearDialog() {
      this.isDialogShowLhFiveWhy = false;
      this.isDialogShowLhCm = false;
      this.isDialogShowShFiveWhy = false;
      this.isDialogShowShCm = false;
      this.isDialogShowDhCm = false;
    },
    checkPermission() {
      this.setName = localStorage.getItem("name");
      this.setArea = localStorage.getItem("area");
      this.setRole = localStorage.getItem("role");
      console.log(localStorage.getItem("role"));
      console.log(localStorage.getItem("role") == "SH");
      if (localStorage.getItem("role") == "LH") {
        this.isLineHead = true;
        this.isSectionHead = false;
      } else if (localStorage.getItem("role") == "SH") {
        this.isSectionHead = true;
        this.isLineHead = false;
      }
    },
    postHenkaten() {
      let postData = {
        fdate: this.startDate,
        fline: this.fline,
        fmc: this.fmc_name,
        fproblem: this.ferror_name,
        fchanges_item: this.temporaryAction,
        fpart_type: "",
        fpic: this.foperator,
        fwork_no: "",
        fnote: "",
        fstatus: "0",
      };
      axios
          .post(
              `${process.env.VUE_APP_HOST}/postHenkaten?keywordTempAction=${this.temporaryAction}`,
              postData
          )
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    checkNameCategory() {
      console.log(this.ferror_name.includes("[FULLCAP]"));
      this.isTaskforce = false;
      this.isFullcap = false;
      if (this.ferror_name.includes("[FULLCAP]")) {
        this.isFullcap = true;
      } else if (this.ferror_name.includes("[TASKFORCE]")) {
        this.isTaskforce = true;
      }
    },
    async getDetailProblem() {
      await axios
          .get(
              `${process.env.VUE_APP_HOST}/getDetailProblem?v_=${this.$route.query.v_}`
          )
          .then((result) => {
            this.isLoading = false;
            let item = result.data.data[0];
            console.log(item.uraian);
            // AMJAD1
            if (item.file_report) {
              this.file_report = item.file_report
            }
            if (item.uraian.length > 0) {
              for (let i = 0; i < item.uraian.length; i++) {
                const element = item.uraian[i];
                if (element.type_uraian == 'general') {
                  this.furaian_kejadian = element.desc_nm
                  this.fimage_problem = element.ilustration;
                  this.displayImg_problem = `${process.env.VUE_APP_HOST}/image?path=${this.fimage_problem}`;
                  this.fimage2_problem = element.ilustration2;
                  this.displayImg2_problem = `${process.env.VUE_APP_HOST}/image?path=${this.fimage2_problem}`;
                }
                if (element.type_uraian == 'standard') {
                  this.filustrasi_standart = element.desc_nm;
                  this.std_img = element.ilustration;
                  this.displayStd_img = `${process.env.VUE_APP_HOST}/image?path=${this.std_img}`;
                  this.std2_img = element.ilustration2;
                  this.displayStd2_img = `${process.env.VUE_APP_HOST}/image?path=${this.std2_img}`;
                }
                if (element.type_uraian == 'actual') {
                  this.filustrasi_actual = element.desc_nm;
                  this.act_img = element.ilustration;
                  this.displayAct_img = `${process.env.VUE_APP_HOST}/image?path=${this.act_img}`;
                  this.act2_img = element.ilustration2;
                  this.displayAct2_img = `${process.env.VUE_APP_HOST}/image?path=${this.act2_img}`;
                }
              }
            }
            if (item.id_m_problem_member) {
              this.isMemberThema = true;
              this.id_m_problem_member = item.id_m_problem_member;
              this.picThema = item.fname_theme_member;
              this.id_m_member = this.optOperatorsThemaRaw.filter((item) => {
                return item.fname === this.picThema;
              })[0].fid;
              this.target_finish_date = item.target_finish_date.split("T")[0];
              this.is_status = item.is_status == 0 ? false : true;
              this.imgPicThema = `${process.env.VUE_APP_HOST}/image?path=${item.fimage_member}`;
            }
            if (item.init_date) {
              this.initDateThema = formatDate.YYYYMMDD(item.init_date);
            }
            if (item.target_finish_date) {
              this.datePlanTheme = formatDate.YYYYMMDD(item.target_finish_date);
            }
            if (item.detail_activity) {
              if (item.detail_activity.includes("[{")) {
                this.containerThemaActivity = JSON.parse(item.detail_activity);
              }
            }
            if (item.gl_comment) {
              this.gl_comment = item.gl_comment;
            }
            if (item.sh_comment) {
              this.sh_comment = item.sh_comment;
            }
            if (item.dph_comment) {
              this.dph_comment = item.dph_comment;
            }
            this.fmc_name = item.fmc_name;
            this.getMcId();
            this.fline = item.fline;
            this.foperation_no = item.foperation_no;
            this.fmaker = item.fmaker;
            this.ferror_name = item.ferror_name;
            this.gapIlustrasi = item.gapIlustrasi;

            this.oCategory = item.oCategory !== undefined && item.oCategory !== null ? item.oCategory : "";
            this.qCategory = item.qCategory !== undefined && item.qCategory !== null ? item.qCategory : "";

            // this.fileName = `ilustration_${Date.now()}`;
            this.foperator = item.foperator.includes(",")
                ? item.foperator.split(",")
                : item.foperator;
            this.fshift = item.fshift;
            this.fav_categoty = item.fav_categoty;
            this.startDate = item.fstart_time.split("T")[0];
            this.startTime = item.fstart_time.split("T")[1].split(".")[0];
            if (item.fimage) {
              this.fimage = item.fimage;
              this.displayImg = `${process.env.VUE_APP_HOST}/image?path=${item.fimage}`;
            }
            if (item.why1_img) {
              this.why1_img = item.why1_img;
              this.displayWhy1_img = `${process.env.VUE_APP_HOST}/image?path=${this.why1_img}`;
            }
            if (item.why2_img) {
              this.why2_img = item.why2_img;
              this.displayWhy2_img = `${process.env.VUE_APP_HOST}/image?path=${item.why2_img}`;
            }
            if (item.why12_img) {
              this.why12_img = item.why12_img;
              this.displayWhy12_img = `${process.env.VUE_APP_HOST}/image?path=${item.why12_img}`;
            }
            if (item.why22_img) {
              this.why22_img = item.why22_img;
              this.displayWhy22_img = `${process.env.VUE_APP_HOST}/image?path=${item.why22_img}`;
            }
            if (item.fattachment) {
              this.fattachment = item.fattachment;
              this.displayAttachment = `${process.env.VUE_APP_HOST}/image?path=${item.fattachment}`;
            }
            this.fiveWhyLhApprove = item.fiveWhyLhApprove;
            this.fiveWhyShApprove = item.fiveWhyShApprove;
            this.cmLhApprove = item.cmLhApprove;
            this.cmShApprove = item.cmShApprove;
            this.cmDhApprove = item.cmDhApprove || 0;
            // OLD STATUS CHANGES TL
            if (String(item.fend_time) != null) {
              if (item.freal_prob.includes("\n")) {
                this.containerWhyTerjadi = item.freal_prob.split("\n");
                this.fiveWhyTlApprove = this.checkStatus(1);
              } else {
                this.fiveWhyTlApprove = this.checkStatus(2);
              }
            }
            if (item.fiveWhyLhApprove == 0) {
              let diffInTime =
                  new Date().getTime() - new Date(item.fstart_time).getTime();
              let diffDay = diffInTime / (1000 * 3600 * 24);
              if (
                  diffDay >= 1 &&
                  (String(item.fiveWhyLhFeedback) == "null" ||
                      String(item.fiveWhyLhFeedback) == "")
              ) {
                this.fiveWhylhCheck = this.checkStatus(2);
              } else if (String(item.fiveWhyLhFeedback) != "null") {
                this.fiveWhylhCheck = this.checkStatus(3);
              } else {
                this.fiveWhylhCheck = this.checkStatus(4);
              }
            } else if (item.fiveWhyLhApprove == 1) {
              this.fiveWhylhCheck = this.checkStatus(1);
            }

            if (item.cmLhApprove == 0) {
              let diffInTime =
                  new Date().getTime() - new Date(item.fstart_time).getTime();
              let diffDay = diffInTime / (1000 * 3600 * 24);
              if (
                  diffDay >= 1 &&
                  (String(item.cmLhFeedback) == "null" ||
                      String(item.cmLhFeedback) == "")
              ) {
                this.cmlhCheck = this.checkStatus(2);
              } else if (String(item.cmLhFeedback) != "null") {
                this.cmlhCheck = this.checkStatus(3);
              } else {
                this.cmlhCheck = this.checkStatus(4);
              }
            } else if (item.cmLhApprove == 1) {
              this.cmlhCheck = this.checkStatus(1);
            }
            console.log('item.fiveWhyShApprove');
            console.log(item.fiveWhyShApprove);
            console.log(item.fiveWhyShFeedback);
            if (item.fiveWhyShApprove == 0) {
              let diffInTime =
                  new Date().getTime() - new Date(item.fstart_time).getTime();
              let diffDay = diffInTime / (1000 * 3600 * 24);
              if (
                  diffDay >= 2 &&
                  (String(item.fiveWhyShFeedback) == "null" ||
                      item.fiveWhyShFeedback == "")
              ) {
                this.fiveWhyshCheck = this.checkStatus(2);
              } else if (String(item.fiveWhyShFeedback) != "null") {
                this.fiveWhyshCheck = this.checkStatus(3);
              } else {
                this.fiveWhyshCheck = this.checkStatus(4);
              }
            } else if (item.fiveWhyShApprove == 1) {
              this.fiveWhyshCheck = this.checkStatus(1);
            }

            if (item.cmShApprove == 0) {
              let diffInTime =
                  new Date().getTime() - new Date(item.fstart_time).getTime();
              let diffDay = diffInTime / (1000 * 3600 * 24);
              if (
                  diffDay >= 2 &&
                  (String(item.cmShFeedback) == "null" || item.cmShFeedback == "")
              ) {
                this.cmshCheck = this.checkStatus(2);
              } else if (String(item.cmShFeedback) != "null") {
                this.cmshCheck = this.checkStatus(3);
              } else {
                this.cmshCheck = this.checkStatus(4);
              }
            } else if (item.cmShApprove == 1) {
              this.cmshCheck = this.checkStatus(1);
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
                this.dhCheck = this.checkStatus(2);
              } else if (String(item.cmDhFeedback) != "null") {
                this.dhCheck = this.checkStatus(3);
              } else {
                this.dhCheck = this.checkStatus(4);
              }
            } else if (item.cmDhApprove == 1) {
              this.dhCheck = this.checkStatus(1);
            }

            this.fiveWhyLhFeedback = item.fiveWhyLhFeedback;
            this.fiveWhyShFeedback = item.fiveWhyShFeedback;
            this.cmLhFeedback = item.cmLhFeedback;
            this.cmShFeedback = item.cmShFeedback;
            if (item.fend_time != null) {
              this.endDate = item.fend_time.split("T")[0];
              this.endTime = item.fend_time.split("T")[1].split(".")[0];
              this.isProblemClose = true;
            } else {
              this.isProblemClose = false;
            }
            this.fdur = +item.fdur.toFixed(0);
            this.fDescImage = item.fDescImage;
            this.cmDhFeedback = item.cmDhFeedback;
            this.cmDhApprove = item.cmDhApprove;
            console.log(item);
            this.temporaryAction = item.temporaryAction;
            if (item.fstep_repair.includes("\n")) {
              this.containerStepRepair = item.fstep_repair.split("\n");
            }
            console.log(item.fstep_new);
            if (item.fstep_new) {
              this.containerStepRepairNew = JSON.parse(item.fstep_new);
              this.containerStepRepairNew = this.containerStepRepairNew.map((item) => {
                if (!item.result) {
                  item.result = null;
                }
                return item;
              });
            }

            console.log(item.froot_cause);
            if (item.fend_time != null) {
              if (item.froot_cause.includes("\n")) {
                this.containerWhyLama = item.froot_cause.split("\n");
              }
            }
            this.fpart_change = item.fpart_change;
            if (String(item.fpermanet_cm).includes("[{")) {
              // #REVISICM
              localStorage.setItem("beforeCm", String(item.fpermanet_cm));
              this.containerCmTerjadi = JSON.parse(String(item.fpermanet_cm));
              this.containerCmTerjadi = this.containerCmTerjadi.map((item) => {
                if (!item.result) {
                  item.result = null;
                }
                return item;
              });
              this.cmTlApprove = this.checkStatus(1);
            } else {
              this.cmTlApprove = this.checkStatus(2);
            }
            if (String(item.fyokoten).includes("[{")) {
              this.containerYokoten = JSON.parse(item.fyokoten);
            }
            if (String(item.fpermanet_cm_lama).includes("[{")) {
              this.containerCmLama = JSON.parse(item.fpermanet_cm_lama);
              this.containerCmLama = this.containerCmLama.map((item) => {
                if (!item.result) {
                  item.result = null;
                }
                return item;
              });
            }

            // APPROVAL STATUS
            if (this.fiveWhyLhApprove === 0) {
              this.selectedStatusLhFiveWhy = "Tidak Approve";
            } else {
              this.selectedStatusLhFiveWhy = "Approve";
            }
            if (this.fiveWhyShApprove === 0) {
              this.selectedStatusShFiveWhy = "Tidak Approve";
            } else {
              this.selectedStatusShFiveWhy = "Approve";
            }
            if (this.cmLhApprove === 0) {
              this.selectedStatusLhCm = "Tidak Approve";
            } else {
              this.selectedStatusLhCm = "Approve";
            }
            if (this.cmShApprove === 0) {
              this.selectedStatusShCm = "Tidak Approve";
            } else {
              this.selectedStatusShCm = "Approve";
            }
            this.checkNameCategory();
          })
          .catch((err) => {
            console.log(err);
            // alert(JSON.stringify(err));
          });
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
            this.optOperatorsRaw = result.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    async getAllMtMemberThema() {
      await axios
          // .get(`${process.env.VUE_APP_HOST}/getAllMtMember?isMember=TRUE`)
          .get(`${process.env.VUE_APP_HOST}/getAllMtMember`)
          .then((result) => {
            console.log(result);
            let mapMembers = result.data.data.map((member) => {
              return member.fname;
            });
            this.optOperatorsThema = mapMembers;
            this.optOperatorsThemaRaw = result.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
  components: {
    ScrollableContainer,
    LegendStatus,
    TreeListAnalisys,
  },
  async mounted() {
    this.isLoading = true;
    this.id_p_m = +this.$route.query.v_;
    await this.checkPermission();
    await this.getAllMtMemberThema();
    await this.getAllMtMember();
    await this.getDetailProblem();
    await this.checkFocusTheme();
    this.scrollToUploadReport();
  },
  watch: {
    containerThemaActivity: {
      handler: function () {
        let timeInit = new Date(this.initDateThema).getTime();
        let countOffsetTime = 0;
        this.containerThemaActivity.forEach((item) => {
          console.log(item);
          if (item.duration) {
            countOffsetTime += +item.duration;
            item.date_plan = formatDate.YYYYMMDD(
                new Date(timeInit + +item.duration * 3600 * 1000 * 24)
            );
          }
        });
        let timeOffset =
            countOffsetTime == 0 ? 1 : countOffsetTime * 3600 * 1000 * 24;
        console.log(new Date(timeInit + timeOffset));
        this.datePlanTheme = formatDate.YYYYMMDD(
            new Date(timeInit + timeOffset)
        );
      },
      deep: true,
    },
    cmField: {
      handler: function () {
        if (this.cmField.cmDesc.includes('"')) {
          alert('tidak boleh menggunakan petik dua (")');
        }
      },
      deep: true,
    },
    yokoField: {
      handler: function () {
        if (this.yokoField.machine.includes('"')) {
          alert('tidak boleh menggunakan petik dua (")');
        }
      },
      deep: true,
    },
    isTaskforce: function () {
      if (this.isTaskforce == true) {
        alert("Taskforce di pilih");
        if (!this.ferror_name.includes("[TASKFORCE]")) {
          this.ferror_name += "[TASKFORCE]";
        }
      } else {
        this.ferror_name = this.ferror_name.split("[")[0];
        alert("Taskforce tidak di pilih");
      }
    },
    isFullcap: function () {
      if (this.isFullcap == true) {
        if (!this.ferror_name.includes("[FULLCAP]")) {
          this.ferror_name = "[FULLCAP]" + this.ferror_name;
        }
      } else {
        this.ferror_name = this.ferror_name.split("]")[1];
      }
    },
    isDialogShowLhFiveWhy: function () {
      if (this.isDialogShowLhFiveWhy == true) {
        this.fiveWhyLhFeedback = this.fiveWhyLhFeedback.split(": ")[1];
      }
    },
    isDialogShowShFiveWhy: function () {
      if (this.isDialogShowShFiveWhy == true) {
        this.fiveWhyShFeedback = this.fiveWhyShFeedback.split(": ")[1];
      }
    },
    isDialogShowLhCm: function () {
      if (this.isDialogShowLhCm == true) {
        this.cmLhFeedback = this.cmLhFeedback.split(": ")[1];
      }
    },
    isDialogShowShCm: function () {
      if (this.isDialogShowShCm == true) {
        this.cmShFeedback = this.cmShFeedback.split(": ")[1];
      }
    },
    isDialogShowDhCm: function () {
      if (this.isDialogShowDhCm == true) {
        this.cmDhFeedback = this.cmDhFeedback.split(": ")[1];
      }
    },
    startDate: function () {
      let strStartDate = `${this.startDate} ${this.startTime}`;
      let strEndDate = `${this.endDate} ${this.endTime}`;
      let start = new Date(strStartDate.replace(" ", "T"));
      let finish = new Date(strEndDate.replace(" ", "T"));
      let dura = (finish - start) / 1000 / 60;
      if (dura >= 120) {
        this.isLongBd = true;
      } else if (dura >= 15 && this.fline == "ASSY LINE") {
        this.isLongBd = true;
      }
      if (dura.toFixed("1").includes("-")) {
        // alert(`tidak bisa memasukan durasi minus (${dura})`);
        this.isDurationInvalid = true;
      } else if (isNaN(dura)) {
        // alert(
        //   "tolong masukan date start dan date end apabila problem sudah selesai"
        // );
        this.isDurationInvalid = true;
      } else {
        this.fdur = +dura.toFixed(0);
        this.isDurationInvalid = false;
      }
    },
    startTime: function () {
      let strStartDate = `${this.startDate} ${this.startTime}`;
      let strEndDate = `${this.endDate} ${this.endTime}`;
      let start = new Date(strStartDate.replace(" ", "T"));
      let finish = new Date(strEndDate.replace(" ", "T"));
      let dura = (finish - start) / 1000 / 60;
      if (dura >= 120) {
        this.isLongBd = true;
      } else if (dura >= 15 && this.fline == "ASSY LINE") {
        this.isLongBd = true;
      }
      if (dura.toFixed("1").includes("-")) {
        // alert(`tidak bisa memasukan durasi minus (${dura})`);
        this.isDurationInvalid = true;
      } else if (isNaN(dura)) {
        // alert(
        //   "tolong masukan date start dan date end apabila problem sudah selesai"
        // );
        this.isDurationInvalid = true;
      } else {
        this.fdur = +dura.toFixed(0);
        this.isDurationInvalid = false;
      }
    },
    endDate: function () {
      let strStartDate = `${this.startDate} ${this.startTime}`;
      let strEndDate = `${this.endDate} ${this.endTime}`;
      let start = new Date(strStartDate.replace(" ", "T"));
      let finish = new Date(strEndDate.replace(" ", "T"));
      let dura = (finish - start) / 1000 / 60;
      console.log(dura);
      console.log(this.whyCategory);
      if (dura >= 120) {
        this.isLongBd = true;
      } else if (dura >= 15 && this.fline == "ASSY LINE") {
        this.isLongBd = true;
      }
      if (dura.toFixed("1").includes("-")) {
        // alert(`tidak bisa memasukan durasi minus (${dura})`);
        this.isDurationInvalid = true;
      } else if (isNaN(dura)) {
        // alert(
        //   "tolong masukan date start dan date end apabila problem sudah selesai"
        // );
        this.isDurationInvalid = true;
      } else {
        this.fdur = +dura.toFixed(0);
        this.isDurationInvalid = false;
        this.isProblemClose = true;
      }
    },
    endTime: function () {
      let strStartDate = `${this.startDate} ${this.startTime}`;
      let strEndDate = `${this.endDate} ${this.endTime}`;
      let start = new Date(strStartDate.replace(" ", "T"));
      let finish = new Date(strEndDate.replace(" ", "T"));
      console.log((finish.getTime() - start.getTime()) / 1000 / 60);
      let dura = (finish - start) / 1000 / 60;
      if (dura >= 120) {
        this.isLongBd = true;
      } else if (dura >= 15 && this.fline == "ASSY LINE") {
        this.isLongBd = true;
      }
      if (dura.toFixed("1").includes("-")) {
        alert(`tidak bisa memasukan durasi minus (${dura})`);
        this.isDurationInvalid = true;
      } else if (isNaN(dura)) {
        alert(
            "tolong masukan date start dan date end apabila problem sudah selesai"
        );
        this.isDurationInvalid = true;
      } else {
        this.fdur = +dura.toFixed(0);
        this.isDurationInvalid = false;
        this.isProblemClose = true;
      }
    },
    isEditWhyTerjadi: function () {
    },
    isEditWhyLama: function () {
      console.log("lama berubah");
    },
    storeTheme: function () {
      var all = document.getElementsByClassName("form-control");
      var inputsLabel = document.getElementsByClassName("input-lable");
      if (this.storeTheme == "light") {
        for (let i = 0; i < all.length; i++) {
          all[i].style.color = "black";
        }
        for (let i = 0; i < inputsLabel.length; i++) {
          inputsLabel[i].style.color = "black";
        }
        document.getElementById(`table-step-repair`).style.color = "black";
        document.getElementById(`table-why-lama`).style.color = "black";
        document.getElementById(`table-why-terjadi`).style.color = "black";
        document.getElementById(`table-cm-terjadi`).style.color = "black";
        document.getElementById(`table-cm-lama`).style.color = "black";
        document.getElementById(`table-yokoten`).style.color = "black";
      } else {
        for (let i = 0; i < all.length; i++) {
          all[i].style.color = "white";
        }
        for (let i = 0; i < inputsLabel.length; i++) {
          inputsLabel[i].style.color = "white";
        }
        document.getElementById(`table-step-repair`).style.color = "white";
        document.getElementById(`table-why-lama`).style.color = "white";
        document.getElementById(`table-why-terjadi`).style.color = "white";
        document.getElementById(`table-cm-terjadi`).style.color = "white";
        document.getElementById(`table-cm-lama`).style.color = "white";
        document.getElementById(`table-yokoten`).style.color = "white";
      }
    },
    selectedStatusLhFiveWhy: function () {
      if (this.selectedStatusLhFiveWhy == "Tidak Approve") {
        this.fiveWhyLhApprove = 0;
      } else {
        this.fiveWhyLhApprove = 1;
      }
    },
    selectedStatusShFiveWhy: function () {
      if (this.selectedStatusShFiveWhy == "Tidak Approve") {
        this.fiveWhyShApprove = 0;
      } else {
        this.fiveWhyShApprove = 1;
      }
    },
    selectedStatusLhCm: function () {
      if (this.selectedStatusLhCm == "Tidak Approve") {
        this.cmLhApprove = 0;
      } else {
        this.cmLhApprove = 1;
      }
    },
    selectedStatusShCm: function () {
      if (this.selectedStatusShCm == "Tidak Approve") {
        this.cmShApprove = 0;
      } else {
        this.cmShApprove = 1;
      }
    },
    fiveWhyLhApprove: function () {
      this.clearDialog();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    fiveWhyShApprove: function () {
      this.clearDialog();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    cmLhApprove: function () {
      this.clearDialog();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    cmShApprove: function () {
      this.clearDialog();
      if (this.fiveWhyLhApprove == 1) {
        this.isPleaseFinish = true;
        // alert("kalau sudah approve silahkan tekan FINISH");
      }
    },
    isActionCm: function () {
      console.log(this.cmField.cmDesc.includes("ACTION"));
      console.log(this.cmField.cmDesc.split("[")[0]);
      if (this.isActionCm == true) {
        this.cmField.cmDesc = `[ACTION]` + this.cmField.cmDesc;
      } else {
        this.cmField.cmDesc = this.cmField.cmDesc.split("]")[1];
      }
    },
    picThema: function () {
      this.id_m_member = this.optOperatorsThemaRaw.filter((item) => {
        return item.fname === this.picThema;
      })[0].fid;
      if (this.picThema) {
        this.initDateThema = formatDate.YYYYMMDD(new Date());
      } else {
        this.initDateThema = null;
      }
    },
    ft_pic: function () {
      this.id_m_member = this.optOperatorsThemaRaw.filter((item) => {
        return item.fname === this.ft_pic;
      })[0].fid;
    },
    $route() {
      this.scrollToUploadReport();
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.input-lable {
  font-size: 12px;
  color: black;
  font-weight: 800;
}

.form-control {
  background-color: transparent !important;
  color: black;
  padding-left: 3px;
}

h6 {
  font-family: "Bebas Neue", cursive;
}

.col {
  padding-top: 0px;
  padding-bottom: 0px;
}

input,
select {
  /* color: white; */
  font-size: 12px;
  height: 34px;
  background-color: white;
  width: 100%;
}

#table-why-terjadi {
  color: black;
}

#table-why-lama {
  color: black;
}

#table-cm-lama {
  color: black;
}

#table-cm-terjadi {
  color: black;
}

#table-yokoten {
  color: black;
}

#table-step-repair {
  color: black;
}

td {
  font-size: 12px;
}

#blink {
  animation-duration: 400ms;
  animation-name: blink;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes blink {
  from {
    /* opacity: 1; */
    background-color: khaki;
  }

  to {
    /* opacity: 0; */
    background-color: greenyellow;
  }
}

.fontSp {
  font-size: 9px;
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

.card:active {
  background-color: none !important;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
</style>

<style>
.multiselect__tags {
  height: 20px !important;
}
</style>