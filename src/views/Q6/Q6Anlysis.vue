<template>
    <div class="container-fluid">
        <h6 class="text-left card-title my-3">Q6 analysis</h6>
        <div class="card">
            <div class="card-header p-0 py-1">
                Search
            </div>
            <div class="card-body px-1 py-1">
                <div class="row m-0">
                    <div class="col-12 col-lg-6 p-0">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Start</span>
                            </div>
                            <input type="date" v-model="filter.fstart_date" class="form-control"
                                placeholder="Start Date" />
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 p-0 pl-1">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Finish</span>
                            </div>
                            <input type="date" class="form-control" v-model="filter.fend_date" placeholder="End Date" />
                        </div>
                    </div>
                </div>
                <div class="row m-0">
                    <div class="col-12 col-lg-4 p-0">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Line</span>
                            </div>
                            <select class="form-control" v-model="filter.fline">
                                <option v-for="line in getLinesOpts" :key="line.text" :value="line.text"
                                    placeholder="all">
                                    {{ line.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4 p-0">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="filter.is_abnormal"
                                id="flexCheckChecked">
                            <label class="form-check-label" for="flexCheckChecked">
                                Only Abnormal
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4 p-0">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="filter.is_freq"
                                id="flexCheckChecked">
                            <label class="form-check-label" for="flexCheckChecked">
                                Frequency
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-3" v-if="graphData">
            <div class="card-body">
                <ChartQ6 :graphData="graphData" />
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import ChartQ6 from '@/components/ApexChart/Q6/ChartQ6.vue';
import axios from 'axios';

export default {
    name: "Q6Anlysis",
    data() {
        return {
            filter: {
                fstart_date: moment().subtract('2', 'Month').startOf('month').format('YYYY-MM-DD'),
                fend_date: moment().endOf('month').format('YYYY-MM-DD'),
                fline: "ALL",
                is_abnormal: false,
                is_freq: false
            },
            isLoading: false,
            graphData: null

        }
    },
    components: {
        ChartQ6
    },
    computed: {
        ...mapGetters([
            "getLinesOpts",
        ]),
    },
    watch: {
        filter: {
            handler() {
                this.getGraphQ6()
            },
            deep: true
        }
    },
    methods: {
        ...mapActions([
            "storeGetLines",
            "storeGetMachines",
        ]),
        async getInitData() {
            try {
                await this.storeGetLines();
                await this.getGraphQ6()
            } catch (error) {
                console.log(error);
            }
        },
        async getGraphQ6() {
            try {
                this.isLoading = true
                let resp = await axios.get(`${process.env.VUE_APP_HOST}/v2/q6-analysis/graph`, { params: this.filter });
                // console.log(resp.data.data);
                this.graphData = resp.data.data
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                console.log(error);
                this.$toast.error('Failed To get Data Q6');
            }
        }
    },
    mounted() {
        this.getInitData();
    }
}
</script>