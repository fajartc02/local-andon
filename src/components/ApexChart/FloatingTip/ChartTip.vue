<template>
    <div id="chart">
        <apexchart type="area" height="300" :options="chartOptions" :series="series"></apexchart>
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
            series: [{
                name: 'Value',
                data: []
            }],
            chartOptions: {
                chart: {
                    type: 'area',
                    stacked: false,
                    height: 350,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: [3],
                },
                stroke: {
                    dashArray: [0]
                },
                colors: ['#0bea95'],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    },
                },
                yaxis: {
                    title: {
                        text: this.units
                    },
                    min: 0,
                    max: 0.3
                },
                annotations: {
                    yaxis: [
                        {
                            y: 0.1,
                            borderColor: '#ffe821',
                            borderWidth: 5,
                            label: {
                                borderColor: '#ffe821',
                                style: {
                                    color: '#000',
                                    background: '#ffe821',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                },
                                text: '0.1 mm',
                            }
                        }
                    ],
                },
                xaxis: {
                    type: 'datetime',
                },
                tooltip: {
                    shared: true,
                    y: {
                        formatter: function (val, opts) {
                            console.log(val, opts);
                            return val.toFixed(1) + " (Count Tip: " + val + ")";
                        }
                    }
                }
            },
        }
    },
    props: {
        limit: {
            type: Array,
            default: () => [
                {
                    "y": 0,
                    "borderColor": "#ffe821",
                    "borderWidth": 5,
                    "label": {
                        "borderColor": "#ffe821",
                        "style": {
                            "color": "#000",
                            "background": "#ffe821",
                            "fontSize": "12px",
                            "fontWeight": "bold"
                        },
                        "text": "- mm"
                    }
                }
            ]
        },
        units: {
            type: String,
            default: "units"
        },
        seriesData: {
            type: Array,
            default: () => []
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0.3
        }
    },
    watch: {
        seriesData: {
            handler() {
                this.series = [{
                    name: 'Value',
                    data: this.seriesData
                }]
                this.chartOptions = {
                    yaxis: {
                        min: this.min,
                        max: this.max,
                        title: {
                            text: this.units
                        },
                    },
                    annotations: {
                        yaxis: this.limit
                    },
                    tooltip: {
                        y: {
                            formatter: (val, opts) => {
                                console.log(this.seriesData[opts.dataPointIndex]);
                                return val.toFixed(2) + ` mm (Tip: ${this.seriesData[opts.dataPointIndex].tip_counter} | Sleeve: ${this.seriesData[opts.dataPointIndex].sleeve_counter} | Spruebush: ${this.seriesData[opts.dataPointIndex].spruebush_counter})`;
                            }
                        }
                    }
                }
            },
            deep: true
        }
    },
    mounted() {
        this.series = [{
            name: 'Value',
            data: this.seriesData
        }]
        this.chartOptions = {
            yaxis: {
                min: this.min,
                max: this.max,
                title: {
                    text: this.units
                },
            },
            annotations: {
                yaxis: this.limit
            },
            tooltip: {
                y: {
                    formatter: (val, opts) => {
                        console.log(this.seriesData[opts.dataPointIndex]);
                        return val.toFixed(2) + ` mm (Tip: ${this.seriesData[opts.dataPointIndex].tip_counter} | Sleeve: ${this.seriesData[opts.dataPointIndex].sleeve_counter} | Spruebush: ${this.seriesData[opts.dataPointIndex].spruebush_counter})`;
                    }
                }
            }
        }
    }
}
</script>