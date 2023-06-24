<template>
    <div class="card m-3">
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
        </div>
        <div class="card-body mt-4">
            <GraphMtbf :mtfbMttrData="mtfbMttrData"/>
            <GraphMttr :mtfbMttrData="mtfbMttrData"/>
        </div>
    </div>
</template>

<script>
import formatDate from "@/functions/formatDate";
import axios from "axios";

import GraphMtbf from '@/components/ApexChart/MtbfMttr/GraphMtbf'
import GraphMttr from '@/components/ApexChart/MtbfMttr/GraphMttr'

export default {
    name: 'MtbfMttr',
    data() {
        return {
            selectedStartDate: formatDate.YYYYMMDD(
                new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            ),
            selectedEndDate: formatDate.YYYYMMDD(new Date()),
            mtfbMttrData: []
        }
    },
    components: {
        GraphMtbf,
        GraphMttr
    },
    methods: {
        getMtbfMttr() {
            let url = `${process.env.VUE_APP_HOST}/mtbf-mttr?start_date=${this.selectedStartDate}&end_date=${this.selectedEndDate}`;
            axios.get(url)
            .then((result) => {
                // console.log(result.data.data);
                this.mtfbMttrData = result.data.data
            }).catch((err) => {
                alert('Gagal Memuat data')
                console.log(err);
            });
        }
    },
    mounted() {
        this.getMtbfMttr()
    },
}
</script>