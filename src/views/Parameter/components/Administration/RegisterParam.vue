<template>
  <div>
    <div class="row mt-2">
      <div class="col">
        <button
          class="btn btn-sm btn-outline-primary"
          @click="isShowDialog = true"
        >
          + New Parameter
        </button>
      </div>
      <div class="col">
        <button
          class="btn btn-sm btn-outline-success"
          @click="isShowDialogAddParam = true"
        >
          + Parameter to Machine
        </button>
      </div>
    </div>
    <v-dialog v-model="isShowDialog" persistent>
      <v-card class="p-0">
        <v-card-title class="headline grey lighten-2">
          Add New Parameter
        </v-card-title>

        <v-card-text class="p-1 text-left">
          <div class="row">
            <div class="col-4">
              <small>Name</small>
            </div>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                placeholder="parameter name"
                v-model="newParam.name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <small>Methode Check</small>
            </div>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                placeholder="Lihat, bersih, data record dll"
                v-model="newParam.methode_check"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <small>Total MP</small>
            </div>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                placeholder="total MP"
                v-model="newParam.total_mp"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <small>Std Duration</small>
            </div>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                placeholder="duration"
                v-model="newParam.std_duration"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <small>Units</small>
            </div>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                placeholder="mm/s, A, etc"
                v-model="newParam.units"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <small>Upper Limit</small>
            </div>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                v-model="newParam.upper_limit"
                placeholder="masukan nilai batas atas"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <small>Lower Limit</small>
            </div>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                v-model="newParam.lower_limit"
                placeholder="masukan nilai batas bawah"
              />
            </div>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <button
            type="button"
            @click="registerParameter"
            class="btn btn-success"
          >
            Submit
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="isShowDialog = false"
          >
            Close
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isShowDialogAddParam" persistent>
      <v-card class="p-0">
        <v-card-title class="headline grey lighten-2">
          Add Parameter To Machine
        </v-card-title>

        <v-card-text class="p-1 text-left">
          <div class="row">
            <div class="col-3">
              <small>Select Parameter</small>
            </div>
            <div class="col-9">
              <multiselect
                v-model="selectedParam"
                :options="paramList"
                placeholder="Parameter"
              >
              </multiselect>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <small>Select Machines</small>
            </div>
            <div class="col-9">
              <multiselect
                v-model="selectedMachines"
                :options="machineList"
                multiple
                placeholder="Machine"
              >
              </multiselect>
            </div>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <button
            type="button"
            class="btn btn-success"
            @click="addParamToMachines()"
          >
            Submit
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="isShowDialogAddParam = false"
          >
            Close
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import multiselect from "vue-multiselect";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "RegisterParam",
  data() {
    return {
      isLoading: false,
      isShowDialog: false,
      newParam: {
        name: null,
        methode_check: null,
        total_mp: null,
        std_duration: null,
        units: null,
        upper_limit: null,
        lower_limit: null,
        created_by: localStorage.getItem("name"),
        updated_by: localStorage.getItem("name"),
      },
      selectedParam: null,
      selectedMachines: [],
      paramList: [],
      machineList: [],
      isShowDialogAddParam: false,
      selectedIdMachines: [],
      selectedIdParam: null,
      rawMachines: [],
      rawParams: [],
      totalOldMachine: null,
    };
  },
  watch: {
    selectedMachines: function () {
      if (this.selectedMachines.length == 0) {
        this.selectedIdMachines = [];
      } else {
        let lastSelectedMc =
          this.selectedMachines[this.selectedMachines.length - 1];
        let idMachinesSelected = this.rawMachines.find((item) => {
          // console.log(item);
          if (item.fmc_name == lastSelectedMc) {
            return item;
          }
          return item.fmc_name === this.selectedMachines;
        }).fid;
        let isIdxNotAvail =
          this.selectedIdMachines.indexOf(idMachinesSelected) == -1;
        if (isIdxNotAvail) {
          this.selectedIdMachines.push(idMachinesSelected);
        }
      }
    },
    selectedParam: function () {
      console.log(this.selectedParam);
      let idParamSelected = this.rawParams.find((item) => {
        return item.name === this.selectedParam;
      }).fid;
      this.selectedIdParam = idParamSelected;
      console.log(idParamSelected);
      this.getMachinesBeforeAdd(idParamSelected);
    },
  },
  methods: {
    registerParameter() {
      this.isLoading = true;
      if (this.newParam.name) {
        axios
          .post(`${process.env.VUE_APP_HOST}/admin/parameter`, this.newParam)
          .then((result) => {
            console.log(result);
            if (result.data.data.err) {
              Swal.fire("Info", "Parameter Sudah ada", "info");
            } else {
              Swal.fire("Berhasil", "Parameter Sudah Di tambahkan", "success");
              this.$router.go();
            }
            this.isLoading = false;
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
          });
      } else {
        Swal.fire("Info", "Lengkapin dulu bro parameter nya", "info");
        this.isLoading = false;
      }
    },
    getParameterList() {
      axios
        .get(`${process.env.VUE_APP_HOST}/admin/parameter`)
        .then((result) => {
          console.log(result);
          this.rawParams = result.data.data;
          this.paramList = result.data.data.map((item) => {
            return item.name;
          });
          this.getMachines();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMachines() {
      // mapMachines
      axios
        .get(`${process.env.VUE_APP_HOST}/mapMachines`)
        .then((result) => {
          console.log(result);
          this.rawMachines = result.data.data;
          this.machineList = result.data.data.map((item) => {
            return item.fmc_name;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addParamToMachines() {
      // /admin/parameter/toMachine
      this.isLoading = true;
      let newMcs = {
        machines: this.selectedIdMachines.splice(
          this.totalOldMachine,
          this.selectedIdMachines.length
        ),
        id_m_parameter: this.selectedIdParam,
        created_by: localStorage.getItem("name"),
      };
      axios
        .post(`${process.env.VUE_APP_HOST}/admin/parametertToMachine`, newMcs)
        .then((result) => {
          console.log(result);
          this.isLoading = false;
          this.isShowDialogAddParam = false;
          alert("berhasil menambahkan parameter ke machine");
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
      // console.log(this.selectedParam);
      // console.log(this.selectedMachines);
    },
    getMachinesBeforeAdd(idParam) {
      this.isLoading = true;
      axios
        .get(
          `${process.env.VUE_APP_HOST}/admin/parameterToMc?filterByParamId=${idParam}`
        )
        .then((result) => {
          console.log(result);
          this.selectedMachines = [];
          this.selectedIdMachines = [];
          result.data.data.forEach((item) => {
            this.selectedMachines.push(item.mc_name);
            this.selectedIdMachines.push(item.id_machine);
          });
          this.totalOldMachine = this.selectedMachines.length;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },
  components: {
    multiselect,
  },
  mounted() {
    this.getParameterList();
  },
};
</script>
