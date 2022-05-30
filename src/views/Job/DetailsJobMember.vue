<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th style="min-width: 60px">Line</th>
                <th style="min-width: 80px">Area</th>
                <th>Job Type</th>
                <th style="min-width: 200px">Description</th>
                <th>Operator</th>
                <th style="min-width: 100px">Start Time</th>
                <th style="min-width: 100px">End Time</th>
                <th style="min-width: 100px">Duration</th>
                <th colspan="2">Actions</th>
              </tr>
            </thead>
            <tbody v-if="jobDataMember">
              <tr v-for="(item, i) in jobDataMember" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ item.fline }}</td>
                <td>{{ item.farea }}</td>
                <td>{{ item.fjob_type }}</td>
                <td>{{ item.fdesc }}</td>
                <td>{{ item.foperator }}</td>
                <td>
                  {{ item.fstart_time }}
                </td>
                <td v-if="item.fend_time">
                  {{ item.fend_time }}
                </td>
                <td v-else>Belum Slesai</td>
                <td>{{ item.fdur }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-warning"
                    @click="showDialogEdit(item)"
                  >
                    <i class="fa fa-pencil"></i>
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="removeJob(item.fid)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <v-dialog
      v-if="setEditJobData"
      v-model="isShowEditDialog"
      persistent
      width="500"
    >
      <v-card class="p-1">
        <v-card-title class="headline grey lighten-2"> Edit Job </v-card-title>

        <v-card-text class="p-0">
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
                    v-model="setEditJobData.fjob_type"
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
                    v-model="setEditJobData.farea"
                    class="form-control pl-2"
                  />
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style="min-width: 20%"
                      >Kamu Kerja di line mana?</span
                    >
                  </div>
                  <select class="form-control" v-model="setEditJobData.fline">
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
                    v-model="setEditJobData.foperator"
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
                    v-model="setEditJobData.fdesc"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </div>
              </div>
            </div>
            <div class="row p-0 m-0">
              <div class="col p-0">
                <span style="font-size: 8px; color: grey"
                  >AM (00:00 - 11:59) | PM (12:00 - 23:59)</span
                >
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
                        v-model="setEditJobData.fstart_time[0]"
                      />
                    </div>
                    <div class="col-5 p-0">
                      <input
                        class="form-control"
                        type="time"
                        v-model="setEditJobData.fstart_time[1]"
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
                        v-model="setEditJobData.fend_time[0]"
                      />
                    </div>
                    <div class="col-5 p-0">
                      <input
                        class="form-control"
                        type="time"
                        v-model="setEditJobData.fend_time[1]"
                        pattern="([1]?[0-9]|2[0-3]):[0-5][0-9]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <button
            type="button"
            class="btn btn-success"
            data-dismiss="modal"
            @click="submitEditJobdesk()"
          >
            Submit
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="isShowEditDialog = false"
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
import axios from "axios";
import Swal from "sweetalert2";

import formatDate from "@/functions/formatDate";
import { STATE_LINES, STATE_TYPE_JOB, STATE_GROUP } from "./job.state";

import Loading from "@/components/Loading";

export default {
  name: "DetailsJobMember",
  data() {
    return {
      setMember: null,
      jobDataMember: null,
      isShowEditDialog: false,
      isShowDialog: false,
      setDetaiJob: null,
      setEditJobData: null,
      optsLine: STATE_LINES.opts,
      jobTypes: STATE_TYPE_JOB.containers,
      defineGroup: STATE_GROUP.container,
      isLoading: false,
    };
  },
  watch: {
    setMember: function () {
      console.log(this.setMember);
      //   this.getDataJob();
    },
  },
  methods: {
    getDataJob() {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_HOST}/getJobData`;
      if (this.setMember) {
        url += `?filterQuery=WHERE~foperator~=~'${this.setMember}'~AND~fend_time~IS~NOT~NULL`;
      }
      axios
        .get(`${url}`)
        .then((result) => {
          console.log(result.data.data);
          let formatedDate = result.data.data.map((item) => {
            let newDateStrFormat = item.fstart_time
              .split(".")[0]
              .split("T")
              .join(" ");
            let newDateEndFormat = item.fend_time
              .split(".")[0]
              .split("T")
              .join(" ");
            item.fstart_time = formatDate.YYYYMMDD_HHMM(newDateStrFormat);
            item.fend_time = formatDate.YYYYMMDD_HHMM(newDateEndFormat);
            return item;
          });
          this.jobDataMember = formatedDate;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    showDialogEdit(obj) {
      let newObj = obj;
      newObj.fstart_time = formatDate
        .YYYYMMDD_HHMM(newObj.fstart_time)
        .split(" ");
      newObj.fend_time = formatDate.YYYYMMDD_HHMM(newObj.fend_time).split(" ");

      this.setEditJobData = newObj;
      this.isShowEditDialog = true;
    },
    submitEditJobdesk() {
      // console.log("SUBMIT EDIT JOB DESK");
      this.isLoading = true;
      let idxGroup = this.defineGroup.findIndex((item) => {
        return item.type === this.setEditJobData.fjob_type;
      });
      let newJob = {
        fid: this.setEditJobData.fid,
        fline: this.setEditJobData.fline,
        farea: this.setEditJobData.farea,
        fjob_type: this.setEditJobData.fjob_type,
        fdesc: this.setEditJobData.fdesc,
        fstart_time: this.setEditJobData.fstart_time.join(" "),
        fend_time: this.setEditJobData.fend_time.join(" "),
        foperator: this.setEditJobData.foperator,
        fgroup: this.defineGroup[idxGroup].group,
        frole: localStorage.getItem("role")
          ? localStorage.getItem("role")
          : null,
      };
      console.log(newJob);
      axios
        .put(`${process.env.VUE_APP_HOST}/editJobData`, newJob)
        .then((result) => {
          console.log(result);
          alert("success to edit");
          this.$router.go();
          this.isShowEditDialog = false;
          this.isLoading = false;
        })
        .catch((err) => {
          console.error(err);
          alert(JSON.stringify(err));
          this.isLoading = false;
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
        if (result.isConfirmed) {
          axios
            .post(`${process.env.VUE_APP_HOST}/deleteJobData`, newObj)
            .then(() => {
              this.$router.go();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(() => {
              Swal.fire("Error", "please try again", "error");
            });
        }
      });
    },
  },
  components: {
    Loading,
  },
  mounted() {
    console.log("MASUUK DETAILS");
    this.setMember = localStorage.getItem("name");
    this.getDataJob();
  },
};
</script>