<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Select Month</span>
          </div>
          <input type="month" v-model="selectedMonth" class="form-control" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Bar :propsData="barData" />
      </div>
    </div>
    <div class="row p-0">
      <div class="col p-0">
        <DialogInput />
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-12">
        <div class="card">
          <div class="card-header">Worst Machines</div>
          <div class="card-body p-0">
            <Bar :propsData="barDataMachine" />
          </div>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="card" style="min-height: 365px">
          <div class="card-header">The Most Qulaity Problem</div>
          <div class="card-body">
            <div class="card bg-danger text-light">
              <div class="row">
                <div class="col-2 text-center px-0">No</div>
                <div class="col-8 px-0">Description</div>
                <div class="col px-0">Total</div>
              </div>
            </div>
            <div
              class="card p-2"
              v-for="(item, i) in containerMostDefect"
              :key="i"
            >
              <div class="row">
                <div class="col-2 text-center px-0">{{ i + 1 }}</div>
                <div class="col-8 px-0">{{ item.fdesc }}</div>
                <div class="col px-0">{{ item.totalCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-12">
        <div class="card" style="min-height: 365px">
          <div class="card-header">
            <div class="row">
              <div class="col-8 text-left">Today's Defect</div>
              <div class="col-4 text-right">
                <router-link to="/quality/detailProblem">See All</router-link>
              </div>
            </div>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Line</th>
                <th>Machine</th>
                <th>Defect</th>
                <th>Total</th>
                <th>Ilustration</th>
              </tr>
            </thead>
            <tbody v-if="containerTodayDefect.length > 0">
              <tr v-for="(item, i) in containerTodayDefect" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ item.fline }}</td>
                <td>{{ item.fmc_name }}</td>
                <td>{{ item.fdesc }}</td>
                <td>{{ item.totalDefect }}</td>
                <td v-if="item.filustration != 'null'">
                  <a :href="item.filustration" target="_blank">See here!</a>
                </td>
                <td v-else>Tidak Ada</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5">Tidak Ada Defect</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bar from "@/components/ApexChart/Bar";
import axios from "axios";

import DialogInput from "@/components/Quality/DialogInput";
import { mapState } from "vuex";

import formatDate from "@/functions/formatDate";

export default {
  name: "Quality",
  data() {
    return {
      barData: {
        title: "Quality Problem: This Month",
        data: [],
        labels: [],
      },
      barDataMachine: {
        title: "Worst Machine",
        data: [],
        labels: [],
      },
      selectedStartDate: null,
      selectedEndDate: null,
      containerDate: [],
      containerMostDefect: null,
      containerTodayDefect: [],
      selectedMonth: null,
    };
  },
  computed: {
    ...mapState(["successAddData"]),
  },
  watch: {
    successAddData: function () {
      this.getQualityData();
      this.groupDefect();
      this.worstMachine();
      this.getDefectData();
    },
    selectedMonth: function () {
      this.generateLabel();
      this.getQualityData();
    },
  },
  components: {
    Bar,
    DialogInput,
  },
  methods: {
    async getQualityData() {
      axios
        .get(
          `${process.env.VUE_APP_HOST}/qualityData?date=${
            this.selectedMonth
          }&fdate=${formatDate.YYYYMMDD(this.selectedMonth)}`
        )
        .then((result) => {
          console.log(result);
          let totalDefect = result.data.data;
          this.barData = {
            title: `Quality Problem: ${formatDate.InaMMYYYY(
              new Date(this.selectedMonth)
            )}`,
            data: totalDefect,
            labels: this.containerDate,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async groupDefect() {
      axios
        .get(`${process.env.VUE_APP_HOST}/groupDefect`)
        .then((result) => {
          console.log(result);
          this.containerMostDefect = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async worstMachine() {
      axios
        .get(`${process.env.VUE_APP_HOST}/groupWorstMachine`)
        .then((result) => {
          console.log(result);
          let mapMcName = result.data.data.map((item) => {
            return item.fmc_name;
          });
          let mapTotalDefmc = result.data.data.map((item) => {
            return item.totalCount;
          });
          this.barDataMachine = {
            title: `Quality Problem: ${formatDate.InaMMYYYY(
              new Date(this.selectedMonth),
              true
            )}`,
            data: [
              {
                name: "Freq",
                data: mapTotalDefmc,
              },
            ],
            labels: mapMcName,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getDefectData() {
      axios
        .get(
          `${
            process.env.VUE_APP_HOST
          }/allDefectData?startDate=${formatDate.YYYYMMDD(
            new Date()
          )}&finishDate=${formatDate.YYYYMMDD(new Date())}`
        )
        .then((result) => {
          console.log(result);
          this.containerTodayDefect = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    generateLabel() {
      this.selectedEndDate = formatDate
        .getLastDate(new Date(this.selectedMonth))
        .getDate();
      this.selectedStartDate = formatDate
        .getFirstDate(new Date(this.selectedMonth))
        .getDate();
      this.containerDate = [];
      let containerMonth = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      let monthIdx = new Date(this.selectedMonth).getMonth();
      for (
        let date = this.selectedStartDate;
        date <= this.selectedEndDate;
        date++
      ) {
        this.containerDate.push(
          `${date > 9 ? date : "0" + date}-${containerMonth[monthIdx].slice(
            0,
            3
          )}`
        );
      }
    },
  },
  async mounted() {
    this.selectedMonth = formatDate.YYYYMM(new Date());
    this.generateLabel();
    await this.getQualityData();
    await this.groupDefect();
    await this.worstMachine();
    await this.getDefectData();
  },
};
</script>