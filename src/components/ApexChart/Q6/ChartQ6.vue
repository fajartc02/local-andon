<template>
    <div id="chart">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
export default {
    components: {
        apexchart: VueApexCharts,
    },
    name: "ChartQ6",
    data() {
        return {
            series: [],
            chartOptions: {
                chart: {
                    stacked: true,
                    height: 350,
                    type: 'line',
                },
                stroke: {
                    width: [0, 0, 4]
                },
                title: {
                    text: 'Q6 Anlysis Graph'
                },
                colors: [],
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [0, 1, 2]
                },
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
                yaxis: []
            },
        }
    },
    props: {
        graphData: Object
    },
    watch: {
        graphData: {
            handler() {
                console.log(this.graphData);
                this.series = this.graphData.series
                this.chartOptions = {
                    chart: {
                        stacked: true,
                        height: 350,
                        type: 'line',
                    },
                    legend: {
                        show: false
                    },
                    colors: this.graphData.chartOptions.colors,
                    stroke: {
                        width: this.graphData.chartOptions.strokeWidth
                    },
                    title: {
                        text: 'Q6 Anlysis Graph'
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: this.graphData.chartOptions.enabledOnSeries
                    },
                    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
                    yaxis: this.chartOptions.yaxis
                }
            },
            deep: true
        }
    },
    mounted() {
        this.series = this.graphData.series
        this.chartOptions = {
            chart: {
                stacked: true,
                height: 350,
                type: 'line',
                events: {
                    dataPointSelection: (event, chartContext, config) => {
                        console.log(config.seriesIndex);
                        let idProblem = this.graphData.series[config.seriesIndex].fid;
                        console.log(this.graphData.series[config.seriesIndex].name);
                        console.log(idProblem);

                        this.$router.push(`/editProblem?v_=${idProblem}`);
                    }
                }
            },
            colors: this.graphData.chartOptions.colors,
            legend: {
                show: false
            },
            stroke: {
                width: this.graphData.chartOptions.strokeWidth
            },
            title: {
                text: 'Q6 Anlysis Graph'
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: this.graphData.chartOptions.enabledOnSeries
            },
            labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
            yaxis: this.chartOptions.yaxis
        }
    }
}
</script>