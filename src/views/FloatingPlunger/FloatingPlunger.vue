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
        <!-- Data -->
        <div v-if="floatingData.length > 0" class="row justify-content-between align-items-center my-2">
            <div v-for="parent in floatingData" :key="parent.machine_nm" class="col-12 my-2">
                <div class="my-1" v-for="child in parent.children" :key="child.param">
                    <h6 class="text-left font-weight-bold">
                        <div class="badge badge-primary">{{ parent.machine_nm }}</div>{{ child.param }} (Std:
                        {{ child.limit.length > 1 ? child.limit[0].y : child.min }} ~ {{ child.limit[child.limit.length
                            - 1].y }}
                        mm)
                    </h6>
                    <div class="card mt-2 p-2">
                        <ChartTip :limit="child.limit" :seriesData="child.data" :min="child.min" :max="child.max"
                            :units="child.units" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="row">
            <div class="col-12">
                <h6 class="badge badge-info text-center font-weight-bold">No Data</h6>
            </div>
        </div>

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

export default {
    name: "CastingTrend",
    data() {
        return {
            isLoading: false,
            floatingData: [],
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
                lower_depth_tip: null
            }
        }
    },
    methods: {
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
                lower_depth_tip: null
            }
            this.dialog = false
        },
        async submitData() {
            try {
                this.isLoading = true
                await axios.post(`${process.env.VUE_APP_HOST}/v2/floating-tip`, this.form)
                await this.getData()
                this.isLoading = false
                this.clearSubmit()
            } catch (error) {
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
                this.isLoading = false
            }
        }
    },
    watch: {
        filter: {
            handler() {
                this.getData()
            },
            deep: true
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