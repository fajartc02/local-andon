<template>
    <div>
        <Header title="Job Analisys"/>
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Search
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6 p-0">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                        <span class="input-group-text"
                                            >Month</span
                                        >
                                        </div>
                                        <input
                                            type="date"
                                            v-model="selectedDate"
                                            class="form-control"
                                            placeholder="Start Date"
                                        />
                                    </div>
                                </div>
                                <div class="col-6 p-0">
                                    <model-select
                                        :options="optionsLines"
                                        v-model="lineSelected"
                                        placeholder="select line"
                                        style="width: 70%; font-size: 10px; color: black"
                                    >
                                    </model-select>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary w-100" @click="getProblemData()">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 p-0 m-0">
                    <div class="card">
                        <div class="card-header">
                            Problem Data
                        </div>
                        <div class="card-body">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowspan="2">No</th>
                                        <th rowspan="2">Line</th>
                                        <th rowspan="2">Machine</th>
                                        <th rowspan="2">Problem</th>
                                        <th :colspan="containerHours.length">{{selectedDate}}</th>
                                    </tr>
                                    <tr>
                                        <th v-for="(hr) in containerHours" :key="hr">{{ hr }}</th>
                                    </tr>
                                </thead>
                                <tbody v-if="containerData.length > 0">
                                    <tr v-for="(probData, i) in containerData" :key="probData.id">
                                        <td>{{i + 1}}</td>
                                        <td>{{probData.line}}</td>
                                        <td>{{probData.machine}}</td>
                                        <td>{{probData.problem}}</td>
                                        <td v-for="state in probData.data" :key="state" :class="`${state == 1 ? 'bg-danger': ''}`">{{ '' }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td :colspan="4+containerHours.length">Tidak Ada Data</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Header from "@/components/HeaderPage"
import moment from "moment";
import { ModelSelect } from "vue-search-select";
import axios from "axios"
export default {
    name: "JobAnalisys",
    data() {
        return {
            selectedDate: moment().format('YYYY-MM-DD'),
            optionsLines: [],
            lineSelected: null,
            containerHours: [],
            containerData: []
        }
    },
    methods: {
        async getLines() {
            await axios
            .get(`${process.env.VUE_APP_HOST}/lines`)
            .then((result) => {
                console.log(result.data.data);
                let mapLines = result.data.data.map((line) => {
                    return { value: line.fline, text: line.fline };
                });
                this.optionsLines = mapLines;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        generateHours() {
            for (let i = 0; i < 24; i++) {
                const element = `${i < 10 ? `0${i}` : i}`
                this.containerHours.push(element);
            }
        },
        async getProblemData() {
            try {
                let result;
                if(this.lineSelected) {
                    result = await axios.get(`${process.env.VUE_APP_HOST}/problem-analisys?filterDate=${this.selectedDate}&line=${this.lineSelected}`)
                } else {
                    result = await axios.get(`${process.env.VUE_APP_HOST}/problem-analisys?filterDate=${this.selectedDate}`)
                }
                console.log(result);
                this.containerData = result.data.data
            } catch (error) {
                console.log(error);
            }
        }
    },
    components: {
        Header,
        "model-select": ModelSelect
    },
    mounted() {
        this.getLines()
        this.generateHours()
        this.getProblemData()
    },
}
</script>