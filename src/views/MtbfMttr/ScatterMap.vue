<template>
    <div class="card">
        <Loading :propsLoading="isLoading"/>
        <div class="card-header">
            Search
        </div>
        <div class="card-body">
            <div class="row m-0">
                <div class="col-6 p-0">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        >Start</span
                      >
                    </div>
                    <input
                      type="date"
                      v-model="selectedStartDate"
                      class="form-control"
                      placeholder="Start Date"
                    />
                  </div>
                </div>
                <div class="col-6 p-0 pl-1">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        >Finish</span
                      >
                    </div>
                    <input
                      type="date"
                      class="form-control"
                      v-model="selectedEndDate"
                      placeholder="End Date"
                    />
                  </div>
                </div>
            </div>
            <div class="row m-0">
              <div class="col-12">
                <button class="btn btn-primary w-100" @click="getMtbfMttr()">Search</button>
              </div>
            </div>  
        </div>
        <div id="chart">
            <apexchart type="scatter" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import axios from 'axios'
import formatDate from "@/functions/formatDate";
import Loading from '@/components/Loading'

export default {
    name: 'ScatterMap',
    data() {
        return {
            isLoading: false,
            selectedStartDate: formatDate.YYYYMMDD(
                new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            ),
            selectedEndDate: formatDate.YYYYMMDD(new Date()),
            machines: [],
            series: [{
                name: "Range A",
                data: [
                    [16.4, 5.4], [16.4, 8.4]]
                },{
                    name: "Range B",
                    data: [
                    [36.4, 13.4]]
                },{
                    name: "Range C",
                    data: [
                    [21.7, 3]]
                }],
            chartOptions: {},
        }
    },
    methods: {
        async getMtbfMttr() {
            this.isLoading = true
            let url = `${process.env.VUE_APP_HOST}/mtbf-mttr?start_date=${this.selectedStartDate}&end_date=${this.selectedEndDate}`;
            await axios.get(url)
            .then(async (result) => {
                console.log();
                const rawData = result.data.data.containerScatters
                const machines = result.data.data.scatters
                this.machines = machines
                this.series = rawData
                this.chartOptions = {
                    chart: {
                        height: 350,
                        type: 'scatter',
                        zoom: {
                            enabled: true,
                            type: 'xy'
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
                                console.log(seriesIndex);
                                console.log(series);
                                console.log(dataPointIndex);
                                console.log(w);
                                console.log(this.machines[seriesIndex][dataPointIndex]);
                                console.log(value);
                                // let line = this.machines[seriesIndex][dataPointIndex].fline
                                // let machine = this.machines[seriesIndex][dataPointIndex].fmc_name
                                let mtbf = this.machines[seriesIndex][dataPointIndex].mtbf
                                let mttr = this.machines[seriesIndex][dataPointIndex].mttr
                                return `MTTR: ${mttr.toFixed(1)}, MTBF: ${mtbf.toFixed(1)}`
                            }
                        },
                        x: {
                            formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
                                console.log(seriesIndex);
                                console.log(series);
                                console.log(dataPointIndex);
                                console.log(w);
                                console.log(this.machines[seriesIndex][dataPointIndex]);
                                console.log(value);
                                let line = this.machines[seriesIndex][dataPointIndex].fline
                                let machine = this.machines[seriesIndex][dataPointIndex].fmc_name
                                return `${line} - ${machine}`
                            }
                        }
                    },
                    colors: ['#21ff00', '#4ec43e', '#e2d922', '#ed44b5', '#f25b04', '#fc4141'],
                    xaxis: {
                        tickAmount: 10,
                        title: {
                            text: 'MTTR (Mean Time to Repair)'
                        },
                        labels: {
                            show: true,
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'MTBF (Mean Time Between Failure)'
                        },
                        labels: {
                            show: true,
                        },
                        tickAmount: 7
                    }
                }
                this.isLoading = false
            }).catch((err) => {
                alert('Gagal Memuat data')
                console.log(err);
                this.isLoading = false
            });
        }
    },
    components: {
        apexchart: VueApexCharts,
        Loading,
    },
    mounted() {
        this.getMtbfMttr()
    },
}
</script>