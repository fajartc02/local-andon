<template>
  <b-tabs content-class="mt-3">
    <b-tab title="Parameter List" active>
      <div class="table-responsive-sm mt-2">
        <table class="table table-dark table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Methode Check</th>
              <th scope="col">Total MP</th>
              <th scope="col">Std Duradion</th>
              <th scope="col">Units</th>
              <th scope="col">Upper Limit</th>
              <th scope="col">Lower Limit</th>
              <th scope="col">Created By</th>
              <th scope="col" colspan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in paramList" :key="item.fid">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.methode_check }}</td>
              <td>{{ item.total_mp }}</td>
              <td>{{ item.std_duration }}</td>
              <td>{{ item.units }}</td>
              <td>{{ item.upper_limit }}</td>
              <td>{{ item.lower_limit }}</td>
              <td>{{ item.created_by }}</td>
              <td>
                <button
                  class="btn btn-sm btn-danger"
                  @click="deleteParam(item.fid)"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </td>
              <td>
                <button class="btn btn-sm btn-warning">
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-tab>
    <b-tab title="Prameter to Machines">
      <div class="table-responsive-sm mt-2">
        <table class="table table-dark table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Line</th>
              <th scope="col">Machines</th>
              <th scope="col">Parameter</th>
              <th scope="col">Methode Check</th>
              <th scope="col">Units</th>
              <th scope="col">Upper Limit</th>
              <th scope="col">Lower Limit</th>
              <th scope="col">Created By</th>
              <th scope="col" colspan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(param, i) in parameters" :key="i">
              <th scope="row">{{ i + 1 }}</th>
              <td>
                <tr v-for="(mc, j) in param.machines" :key="j">
                  <td>{{ param.line }}</td>
                </tr>
              </td>
              <td>
                <tr v-for="(mc, j) in param.machines" :key="j">
                  <td>{{ mc.mc_name }}</td>
                </tr>
              </td>
              <td>{{ param.param_name }}</td>
              <td>{{ param.methode_check }}</td>
              <td>{{ param.units }}</td>
              <td>{{ param.upper_limit }}</td>
              <td>{{ param.lower_limit }}</td>
              <td>{{ param.created_by }}</td>
              <td>
                <button class="btn btn-sm btn-danger">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
              <td>
                <button class="btn btn-sm btn-warning">
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <div class="row align-items-center">
      <div class="col justify-content-center">
        <b-pagination
          v-model="currentPage"
          :total-rows="9"
          :per-page="perPage"
          aria-controls="my-table"
          size="sm"
        ></b-pagination>
      </div>
      <div class="col justify-content-center">
        <input type="checkbox" /> <span>Show All</span>
      </div>
    </div> -->
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "TableAdmin",
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      parameters: [],
      paramList: [],
    };
  },
  methods: {
    getParameterMachine() {
      axios
        .get(`${process.env.VUE_APP_HOST}/admin/parameterToMc`)
        .then((result) => {
          console.log(result);
          this.parameters = result.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getParameterList() {
      axios
        .get(`${process.env.VUE_APP_HOST}/admin/parameter`)
        .then((result) => {
          console.log(result);
          this.paramList = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteParam(fid) {
      this.isLoading = true;
      axios
        .delete(`${process.env.VUE_APP_HOST}/admin/parameter/${fid}`)
        .then((result) => {
          console.log(result);
          this.isLoading = false;
          Swal.fire("", "Berhasil Menghapus", "success");
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
          Swal.fire("", JSON.stringify(err), "error");
        });
    },
  },
  mounted() {
    this.getParameterList();
    this.getParameterMachine();
  },
};
</script>