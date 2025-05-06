<template>
    <div id="chart">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
const Q6_CATEGORY = [['Q1', '(Diagnose)'], ['Q2', '(Spareparts)'], ['Q3', '(Tools)'], ['Q4', '(Maintenance Ability)'], ['Q5', '(Machine Setting)'], ['Q6', '(Machine Backup)']];
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
                // [{
                //     category: "Q1",
                //     description: "Diagnose / Cause Analysis",
                // },
                // {
                //     category: "Q2",
                //     description: "Spareparts",
                // },
                // {
                //     category: "Q3",
                //     description: "Tools",
                // },
                // {
                //     category: "Q4",
                //     description: "Maintenance Ability",
                // },
                // {
                //     category: "Q5",
                //     description: "Machine Setting",
                // },
                // {
                //     category: "Q6",
                //     description: "Machine Backup",
                // },
                labels: Q6_CATEGORY,
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
                    labels: Q6_CATEGORY,
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
            labels: Q6_CATEGORY,
            yaxis: this.chartOptions.yaxis
        }
    }
}
</script>