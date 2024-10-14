<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center my-2">
            <h6 class="font-weight-bold">Floating Tip</h6>
            <button class="btn btn-sm btn-primary my-auto" @click="dialog = true">Record Data</button>
            <v-dialog v-model="dialog" persistent width="500">
                <v-card>
                    <v-card-title class="headline grey lighten-2">
                        Input Floating Tip
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
                                        <select class="form-control" v-model="form.machine_nm">
                                            <option v-for="machine in machines" :key="machine.text"
                                                :value="machine.text" placeholder="all">
                                                {{ machine.text }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text font-weight-bold text-center"
                                                style="min-width: 130px">Date Check</span>
                                        </div>
                                        <input type="date" v-model="form.check_date" class="form-control pl-2" />
                                    </div>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text font-weight-bold text-center"
                                                style="min-width: 130px">Counter Tip</span>
                                        </div>
                                        <input type="number" v-model="form.tip_counter" class="form-control pl-2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text font-weight-bold text-center">shot</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text font-weight-bold text-center"
                                                style="min-width: 130px">Counter Sleeve</span>
                                        </div>
                                        <input type="number" v-model="form.sleeve_counter" class="form-control pl-2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text font-weight-bold text-center">shot</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text font-weight-bold text-center"
                                                style="min-width: 130px">Counter Spruebush</span>
                                        </div>
                                        <input type="number" v-model="form.spruebush_counter"
                                            class="form-control pl-2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text font-weight-bold text-center">shot</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 p-0 text-left">
                                    <span class="text-muted">Hasil Check (Dengan Thickness Gauge)</span>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="input-group my-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text font-weight-bold text-center"
                                                style="min-width: 130px">Celah Tip Atas</span>
                                        </div>
                                        <input type="number" v-model="form.upper_gap_tip" class="form-control pl-2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text font-weight-bold text-center">mm</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="input-group my-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text font-weight-bold text-center"
                                                style="min-width: 130px">Kedalaman Tip Atas</span>
                                        </div>
                                        <input type="number" v-model="form.upper_depth_tip" class="form-control pl-2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text font-weight-bold text-center">mm</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="input-group my-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text font-weight-bold text-center"
                                                style="min-width: 130px">Celah Tip Bawah</span>
                                        </div>
                                        <input type="number" v-model="form.lower_gap_tip" class="form-control pl-2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text font-weight-bold text-center">mm</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="input-group my-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text font-weight-bold text-center"
                                                style="min-width: 130px">Kedalaman Tip Bawah</span>
                                        </div>
                                        <input type="number" v-model="form.lower_depth_tip" class="form-control pl-2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text font-weight-bold text-center">mm</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="input-group my-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text font-weight-bold text-center"
                                                style="min-width: 130px">Notes / Comments</span>
                                        </div>
                                        <textarea v-model="form.notes" class="form-control pl-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <button type="button" @click="submitData()" class="btn btn-success">
                            Submit
                        </button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearSubmit()">
                            Close
                        </button>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <div class="card">
            <div class="card-body px-1 py-1">
                <div class="row m-0">
                    <div class="col-12 col-lg-6 p-0">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Start</span>
                            </div>
                            <input type="date" v-model="filter.fstart_date" class="form-control"
                                placeholder="Start Date" />
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 p-0 pl-1">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Finish</span>
                            </div>
                            <input type="date" class="form-control" v-model="filter.fend_date" placeholder="End Date" />
                        </div>
                    </div>
                </div>
                <div class="row m-0">
                    <div class="col-12 col-lg-4 p-0">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Machines</span>
                            </div>
                            <select class="form-control" v-model="filter.fmc_name">
                                <option selected value="ALL">ALL</option>
                                <option v-for="machine in machines" :key="machine.text" :value="machine.text"
                                    placeholder="all">
                                    {{ machine.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-2 px-4 mx-4">
            <div v-if="viewMode == 'GRAPH'" class="col p-2 card bg-info text-light font-weight-bold">
                GRAPH
            </div>
            <div v-else class="col p-2 card text-dark" @click="changeMode('GRAPH')">
                GRAPH
            </div>
            <div v-if="viewMode == 'TABLE'" class="col p-2 card bg-info text-light font-weight-bold">
                TABLE
            </div>
            <div v-else class="col p-2 card text-dark" @click="changeMode('TABLE')">
                TABLE
            </div>
        </div>
        <!-- Data -->
        <template v-if="viewMode == 'GRAPH'">
            <div v-if="floatingData.length > 0" class="row justify-content-between align-items-center my-2">
                <div v-for="parent in floatingData" :key="parent.machine_nm" class="col-12 my-2">
                    <div class="my-1" v-for="child in parent.children" :key="child.param">
                        <h6 class="text-left font-weight-bold">
                            <div class="badge badge-primary">{{ parent.machine_nm }}</div>{{ child.param }} (Std:
                            {{ child.limit.length > 1 ? child.limit[0].y : child.min }} ~ {{
                                child.limit[child.limit.length
                                    - 1].y }}
                            mm)
                        </h6>
                        <div class="card mt-2 p-2">
                            <ChartTip :limit="child.limit" :seriesData="child.data" :min="child.min" :max="child.max"
                                :units="child.units" :notes="child.notes" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div class="col-12">
                    <h6 class="badge badge-info text-center font-weight-bold">No Data</h6>
                </div>
            </div>
        </template>
        <template v-else-if="viewMode == 'TABLE'">
            <div class="row">
                <div class="col overflow-auto">
                    <table class="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th style="width: 100px">Date</th>
                                <th style="width: 100px">Machine</th>
                                <th>Tip Counter</th>
                                <th>Sleeve Counter</th>
                                <th>Spruebush Counter</th>
                                <th>Celah Tip Atas</th>
                                <th>Celah Tip Bawah</th>
                                <th>Kedalaman Tip Atas</th>
                                <th>Kedalaman Tip Bawah</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody v-if="floatingDataTable.length > 0">
                            <tr v-for="(data, index) in floatingDataTable" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ data.check_date }}</td>
                                <td>{{ data.machine_nm }}</td>
                                <td>{{ data.tip_counter }}</td>
                                <td>{{ data.sleeve_counter }}</td>
                                <td>{{ data.spruebush_counter }}</td>
                                <td>{{ data.upper_gap_tip }}</td>
                                <td>{{ data.lower_gap_tip }}</td>
                                <td>{{ data.upper_depth_tip }}</td>
                                <td>{{ data.lower_depth_tip }}</td>
                                <td>{{ data.notes ? data.notes : "-" }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>

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
import moment from 'moment';
import ChartTip from '@/components/ApexChart/FloatingTip/ChartTip.vue';
import axios from 'axios';
import isNotEmpty from '../../functions/isNotEmpty';

export default {
    name: "CastingTrend",
    data() {
        return {
            isLoading: false,
            floatingData: [],
            floatingDataTable: [],
            filter: {
                fstart_date: moment().startOf('month').format('YYYY-MM-DD'),
                fend_date: moment().format('YYYY-MM-DD'),
                fmc_name: "ALL"
            },
            machines: [
                {
                    text: "IKDM-0101",
                    value: "IKDM-0101"
                },
                {
                    text: "IKDM-0102",
                    value: "IKDM-0102"
                }
            ],
            dialog: false,
            form: {
                machine_nm: null,
                check_date: moment().format('YYYY-MM-DD'),
                tip_counter: null,
                sleeve_counter: null,
                spruebush_counter: null,
                upper_gap_tip: null,
                upper_depth_tip: null,
                lower_gap_tip: null,
                lower_depth_tip: null,
                notes: null
            },
            viewMode: "GRAPH" // GRAPH | TABLE
        }
    },
    methods: {
        changeMode(mode) {
            this.viewMode = mode
        },
        clearSubmit() {
            this.form = {
                machine_nm: null,
                check_date: moment().format('YYYY-MM-DD'),
                tip_counter: null,
                sleeve_counter: null,
                spruebush_counter: null,
                upper_gap_tip: null,
                upper_depth_tip: null,
                lower_gap_tip: null,
                lower_depth_tip: null,
                notes: null
            }
            this.dialog = false
        },
        async submitData() {
            try {
                this.isLoading = true
                if (!isNotEmpty(this.form, 'notes')) {
                    this.isLoading = false
                    alert("Form tidak boleh kosong")
                    return
                }
                await axios.post(`${process.env.VUE_APP_HOST}/v2/floating-tip`, this.form)
                await this.getData()
                this.isLoading = false
                this.clearSubmit()
            } catch (error) {
                alert(JSON.stringify(error));
                this.isLoading = false
            }
        },
        async getData() {
            try {
                this.isLoading = true
                const response = await axios.get(`${process.env.VUE_APP_HOST}/v2/floating-tip`, { params: this.filter })
                this.floatingData = response.data.data
                this.isLoading = false
            } catch (error) {
                alert(JSON.stringify(error));
                this.isLoading = false
            }
        },
        async getDataTable() {
            try {
                this.isLoading = true
                const response = await axios.get(`${process.env.VUE_APP_HOST}/v2/floating-tip/table`, { params: this.filter })
                this.floatingDataTable = response.data.data
                this.isLoading = false
            } catch (error) {
                alert(JSON.stringify(error));
                this.isLoading = false
            }
        }
    },
    watch: {
        filter: {
            handler() {
                if (this.viewMode == "GRAPH") {
                    this.getData()
                } else {
                    this.getDataTable()
                }
            },
            deep: true
        },
        viewMode: function () {
            if (this.viewMode == "GRAPH") {
                this.getData()
            } else {
                this.getDataTable()
            }
        }
    },
    components: {
        ChartTip
    },
    mounted() {

        this.getData()
    }
}
</script>
<style></style>