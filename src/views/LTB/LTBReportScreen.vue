<template>
    <div class="container">
        <h6 class="text-left">LTB Report</h6>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-6 col-xl-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Year</span>
                            </div>
                            <select class="form-control" v-model="filter.year">
                                <option v-for="year in yearOpts" :key="year.value" :value="year.value">
                                    {{ year.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-xl-6">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Line</span>
                            </div>
                            <select class="form-control" v-model="filter.line_id">
                                <option v-for="line in getLinesOpts" :key="line.value" :value="line.value">
                                    {{ line.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-2">
            <div class="card-body p-2 overflow-auto fixHead">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th class="fixCol-1"
                                style="z-index: 1;background-color: black!important; color: aliceblue!important;">No
                            </th>
                            <th class="fixCol-2"
                                style="z-index: 1;background-color: black!important; color: aliceblue!important;">Date
                            </th>
                            <th style="min-width: 150px">Line</th>
                            <th style="min-width: 150px">Machine</th>
                            <th style="min-width: 150px">Problem</th>
                            <th style="min-width: 150px">Duration (min)</th>
                            <th colspan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ltb, idx) in ltbData" :key="ltb.fid">
                            <td class="fixCol-1">{{ idx + 1 }}</td>
                            <td class="fixCol-2">{{ ltb.fstart_time.split('T')[0] }}</td>
                            <td>{{ ltb.fline }}</td>
                            <td>{{ ltb.fmc_name }}</td>
                            <td>{{ ltb.ferror_name }}</td>
                            <td>{{ ltb.duration }}</td>
                            <td>
                                <router-link class="btn btn-sm btn-success text-light"
                                    :to="`/pdfViewerLong?v_=${ltb.fid}`">
                                    <i class="fa fa-book"></i> Report
                                </router-link>
                            </td>
                            <td>
                                <router-link class="btn btn-sm btn-info text-light" :to="`/editProblem?v_=${ltb.fid}`">
                                    See Details
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
import axios from 'axios';
import queryFormat from '../../functions/queryFormat';
import { mapGetters } from 'vuex';

export default {
    name: "LTBReportScreen",
    data() {
        return {
            isLoading: false,
            filter: {
                year: new Date().getFullYear(),
                line_id: '-1'
            },
            yearOpts: [
                {
                    value: new Date().getFullYear() - 2,
                    text: new Date().getFullYear() - 2
                },
                {
                    value: new Date().getFullYear() - 1,
                    text: new Date().getFullYear() - 1
                },
                {
                    value: new Date().getFullYear(),
                    text: new Date().getFullYear()
                }
            ],
            ltbData: []
        }
    },
    watch: {
        filter: {
            handler() {
                this.getDataLTB()
            },
            deep: true
        }
    },
    computed: {
        ...mapGetters(['getLinesOpts']),
    },
    methods: {
        async getDataLTB() {
            try {
                this.isLoading = true
                let resp = await axios.get(`${process.env.VUE_APP_HOST}/v2/ltb-history?${queryFormat(this.filter)}`);
                this.ltbData = resp.data.data;
                this.isLoading = false
            } catch (error) {
                console.log(error);
                this.$toast.error('Failed To get Data LTB');
            }
        },
        async getLines() {
            try {
                await this.$store.dispatch('storeGetLines');
            } catch (error) {
                console.log(error);
                this.$toast.error('Failed To get Lines');
            }
        }
    },
    mounted() {
        this.getLines();
        this.getDataLTB();
    }
}
</script>
<style>
.fixHead {
    position: sticky !important;
    top: 0px !important;
    height: 80vh;
}

.fixCol-1 {
    position: sticky !important;
    left: 0px !important;
    background-color: #fff !important;
    opacity: 0.9;
    color: black;
    min-width: 30px !important;
}

.fixCol-2 {
    position: sticky !important;
    left: 30px !important;
    background-color: white !important;
    color: black;
    opacity: 0.9;
    min-width: 80px !important;
}
</style>