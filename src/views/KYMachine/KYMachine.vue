<template>
    <div class="container-fluid">
        <h6 class="title-text text-left mt-2">KY Machine</h6>
        <div class="row">
            <div class="col-12 card mt-2 p-2">
                <div class="row m-0">
                    <div class="col-6 p-0">
                        <v-autocomplete class="mt-4" v-model="filter.fline" :custom-filter="customFilter"
                            :items="getLinesOpts" chips base-color="white" item-value="value" item-text="text"
                            label="Line"></v-autocomplete>
                    </div>
                    <div class="col-6 p-0 pl-1">
                        <v-autocomplete class="mt-4" v-model="filter.fid" :custom-filter="customFilter"
                            :items="getMachinesOpts" chips base-color="white" item-value="value" item-text="text"
                            label="Machines"></v-autocomplete>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <table class="table table-hover table-border">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Line</th>
                    <th>Machine</th>
                    <th>KY Details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in kyData" :key="item.machine_id">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item.line_nm }}</td>
                    <td>{{ item.machine_nm }}</td>
                    <td>
                        <button class="btn btn-outline-success btn-pill btn-sm m-0" @click="getDetailDataKy(item)">
                            <i class="fa fa-book"></i>
                            <div class="badge badge-danger">{{ item.ky_total }}</div>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <v-dialog v-model="dialog" persistent width="700">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    KY Machine Input
                </v-card-title>

                <v-card-text class="p-0">
                    <div class="container-fluid p-1 mt-4">
                        <div class="row p-0 m-0">
                            <div class="col-12 p-0">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text font-weight-bold text-center"
                                            style="min-width: 130px">Machine</span>
                                    </div>
                                    <select class="form-control" v-model="kyObj.machine_id" disabled>
                                        <option v-for="machine in machines" :key="machine.machine_id"
                                            :value="machine.machine_id" placeholder="all">
                                            {{ machine.machine_nm }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                </v-card-text>
                <v-card-text class="p-1 my-3 text-left">
                    <button v-if="!isCardVisible" class="btn btn-sm btn-primary my-2 mt-0"
                        @click="isCardVisible = true">Add
                        +</button>
                    <button v-else class="btn btn-sm btn-danger my-2" @click="isCardVisible = false">Close
                        X</button>
                    <div v-if="isCardVisible" class="card p-3">
                        <v-text-field v-model="kyObj.details" :counter="10" :rules="descriptionRules"
                            label="Description KY" hide-details required></v-text-field>

                        <v-autocomplete class="mt-4" v-model="kyObj.stop6_category" :custom-filter="customFilter"
                            :items="stop6Categories" base-color="white" item-value="id" item-text="label" chips
                            label="Stop 6 Category"></v-autocomplete>

                        <v-file-input label="File input (optional)" v-model="kyObj.ilustration"></v-file-input>

                        <v-btn class="mt-2" type="submit" block style="font-size: 15px!important;"
                            :disabled="!isKyFullFill" @click="submitKy()">Submit</v-btn>
                        <v-btn v-if="kyObj.is_edit" class="mt-2" type="submit" block style="font-size: 15px!important;"
                            :disabled="!isKyFullFill" @click="submitKy()">Submit</v-btn>
                    </div>
                </v-card-text>
                <v-card-text class="p-1">
                    <div class="badge badge-primary" v-if="isEditLabel">Edit Mode</div>
                    <table class="table table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th style="min-width: 200px;">Description</th>
                                <th>Stop 6 Category</th>
                                <th>ilustration</th>
                                <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="detailsKyData.length > 0">
                            <tr v-for="(ky, i) in detailsKyData" :key="ky.id">
                                <td>{{ i + 1 }}</td>
                                <template v-if="!ky.is_edit">
                                    <td>{{ ky.details }}</td>
                                    <td>{{ ky.stop6_category }}</td>
                                    <td v-if="ky.ilustration">
                                        <a :href="ky.ilustration">
                                            <img :src="ky.ilustration" alt="image" style="width: 100px;">
                                        </a>
                                    </td>
                                    <td v-else>
                                        <span class="text-danger font-weight-bold">No Image</span>
                                    </td>
                                    <td>
                                        <button class="btn btn-outline-primary btn-pill btn-sm m-0" @click="() => {
                                            isEditLabel = true
                                            ky.is_edit = true
                                        }">
                                            <i class="fa fa-edit"></i>
                                            Edit
                                        </button>
                                    </td>
                                </template>
                                <template v-else>
                                    <td><input type="text" class="form-control" v-model="ky.details"></td>
                                    <td>
                                        <v-autocomplete class="mt-4" v-model="ky.stop6_category"
                                            :custom-filter="customFilter" :items="stop6Categories" base-color="white"
                                            item-value="id" item-text="label" chips
                                            label="Stop 6 Category"></v-autocomplete>
                                    </td>
                                    <td v-if="ky.ilustration">
                                        <img :src="ky.ilustration" alt="image" style="width: 100px;">
                                    </td>
                                    <td style="min-width: 200px;" v-else>
                                        <span class="text-danger font-weight-bold">No Image</span>
                                        <v-file-input label="File input (optional)"
                                            v-model="ky.ilustration"></v-file-input>
                                    </td>
                                    <td>
                                        <button class="btn btn-outline-success btn-pill btn-sm m-0" @click="editKy(ky)">
                                            <i class="fa fa-send"></i>
                                            Submit Edit
                                        </button>
                                    </td>
                                </template>
                                <td>
                                    <button class="btn btn-outline-danger btn-pill btn-sm m-0" @click="deleteKy(ky.id)">
                                        <i class="fa fa-trash"></i>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="3">Belum Ada KY</td>
                            </tr>
                        </tbody>
                    </table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearSubmit()">
                        Close
                    </button>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- LOADING -->
        <v-dialog v-model="isLoading" hide-overlay persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                    Loading...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import axios from "axios";
// import { ModelSelect } from "vue-search-select";
import STOP6_CATEGORY from "../../constants/stop6Category";
import isNotEmpty from '../../functions/isNotEmpty';
import Swal from "sweetalert2";
import { mapGetters } from "vuex/dist/vuex.common.js";
export default {
    name: "KYMachine",
    data() {
        return {
            isEditLabel: false,
            isLoading: false,
            isKyFullFill: false,
            isCardVisible: false,
            filter: {
                fline: '-1',
                fid: '-1'
            },
            kyObj: {
                machine_id: null,
                details: null,
                created_by: localStorage.getItem('name'),
                stop6_category: null,
                ilustration: null
            },
            stop6Categories: STOP6_CATEGORY,
            dialog: false,
            optionsLines: [],
            machines: [],
            kyData: [],
            detailsKyData: [],
            descriptionRules: [
                value => {
                    if (value) return true
                    return 'Name is required.'
                },
            ],
            countInitFilterApply: 0
        }
    },
    watch: {
        kyObj: {
            deep: true,
            handler() {
                if (this.kyObj.details && this.kyObj.stop6_category) {
                    this.isKyFullFill = true
                } else {
                    this.isKyFullFill = false
                }
            }
        },
        filter: {
            deep: true,
            async handler() {
                if (this.filter.fline != -1) {
                    await this.$store.dispatch('storeGetMachines', this.filter.fline)
                }
                await this.getKy()
            }
        }
    },
    computed: {
        ...mapGetters(["getMachinesOpts", "getLinesOpts"]),
    },
    components: {
        // ModelSelect
    },
    methods: {
        async getFilterData() {
            try {
                await this.$store.dispatch('storeGetLines')
                await this.$store.dispatch('storeGetMachines')
            } catch (error) {
                console.log(error);
            }
        },
        customFilter(itemTitle, queryText, item) {
            const textOne = item.raw.label.toLowerCase()

            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1
        },
        async getKy() {
            try {
                this.isLoading = true
                this.filter.name = localStorage.getItem("name");
                this.filter.INIT_COUNT = this.countInitFilterApply
                const rawKy = await axios.get(`${process.env.VUE_APP_HOST}/v2/ky/get`, { params: this.filter });
                this.kyData = rawKy.data.data[0]
                this.filter.fline = rawKy.data.data[1]
                let machinesMap = await rawKy.data.data[0].map(mc => {
                    return {
                        machine_id: mc.machine_id,
                        machine_nm: mc.machine_nm
                    }
                })
                // countInitFilterApply for first init to IGNORING filter default user position line
                this.countInitFilterApply++
                this.machines = machinesMap
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                alert(JSON.stringify(error));
            }
        },
        getDetailDataKy(machine) {
            this.kyObj.machine_id = machine.machine_id
            this.detailsKyData = machine.ky_data.map(ky => {
                ky.is_edit = false
                return ky
            })
            this.dialog = true
        },
        clearSubmit() {
            this.kyObj = {
                machine_id: null,
                details: null,
                created_by: localStorage.getItem('name'),
                stop6_category: null,
            }
            this.detailsKyData = []
            this.dialog = false
            this.isCardVisible = false
        },
        async submitKy() {
            try {
                this.isLoading = true
                const image = this.kyObj.ilustration
                delete this.kyObj.ilustration
                if (!isNotEmpty(this.kyObj)) {
                    this.isLoading = false
                    alert("Form tidak boleh kosong")
                    return
                }
                let formData = new FormData();
                formData.append('machine_id', this.kyObj.machine_id);
                formData.append('details', this.kyObj.details);
                formData.append('created_by', this.kyObj.created_by);
                formData.append('stop6_category', this.kyObj.stop6_category);
                formData.append('ilustration', image);

                await axios.post(
                    `${process.env.VUE_APP_HOST}/v2/ky/add`,
                    formData,
                )
                alert("Success to add KY");
                this.getKy();
                this.clearSubmit();
                this.isLoading = false
            } catch (error) {
                console.log(error);
                this.isLoading = false
                alert(JSON.stringify(error));
            }
        },
        async editKy(ky) {
            try {
                this.isLoading = true
                this.isEditLabel = false;
                ky.is_edit = false
                let formData = new FormData();
                formData.append('id', ky.id);
                formData.append('details', ky.details);
                formData.append('created_by', ky.created_by);
                formData.append('stop6_category', ky.stop6_category);
                formData.append('ilustration', ky.ilustration);
                await axios.put(`${process.env.VUE_APP_HOST}/v2/ky/edit`, formData)
                alert("Success to edit KY");
                this.clearSubmit();
                await this.getKy();
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                alert(JSON.stringify(error));
            }
        },
        async deleteKy(id) {
            try {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                    .then(async (result) => {
                        if (result.isConfirmed) {
                            this.isLoading = true
                            await axios.delete(`${process.env.VUE_APP_HOST}/v2/ky/delete/${id}`)
                            alert("Success to delete KY");
                            this.getKy();
                            this.clearSubmit();
                            this.isLoading = false
                        }
                    })
            } catch (error) {
                this.isLoading = false
                alert(JSON.stringify(error));
            }
        }
    },
    async mounted() {
        let queryAvail = Object.keys(this.$route.query).length
        if (queryAvail > 0) {
            this.filter.fline = this.$route.query.fline
            this.filter.fid = this.$route.query.fid
            this.filter.IS_IGNORE = 1
        }
        await this.getFilterData();

        await this.getKy();
    }
}   
</script>