<template>
    <div>
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
    name: "BarReport",
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return {
            series: [{
                name: 'Data One',
                data: [40, 20, 12, 39, 10, 40, 39]
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'bar'
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                },
                yaxis: {
                    title: {
                        text: 'Value'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val;
                        }
                    }
                }
            }
        };
    }
};
</script>

<style scoped></style>