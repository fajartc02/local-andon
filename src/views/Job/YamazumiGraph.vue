<template>
  <div class="container-fluid">
    <!-- <div class="row mt-3">
      <div class="col">
        <div class="card-header p-1">Search</div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col-4 px-0">
                  <small>Start Date</small>
                </div>
                <div class="col-8">
                  <input
                    class="form-control"
                    type="date"
                    v-model="fstart_time"
                  />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row">
                <div class="col-4 px-0">
                  <small>End Date</small>
                </div>
                <div class="col-8">
                  <input type="date" class="form-control" v-model="fend_time" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-9"></div>
            <div class="col-3">
              <button class="btn btn-sm btn-info" @click="getYamazumiByDate()">
                Search
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <button
              :class="`btn ${
                filterBy == 'day' ? 'btn-info' : 'btn-outline-info'
              } text-dark w-100`"
              @click="filterBy = 'day'"
            >
              Day
            </button>
          </div>
          <div class="col-3">
            <button
              :class="`btn ${
                filterBy == 'week' ? 'btn-info' : 'btn-outline-info'
              } text-dark w-100`"
              @click="filterBy = 'week'"
            >
              Week
            </button>
          </div>
          <div class="col-3">
            <button
              :class="`btn ${
                filterBy == 'month' ? 'btn-info' : 'btn-outline-info'
              } text-dark w-100`"
              @click="filterBy = 'month'"
            >
              Month
            </button>
          </div>
          <div class="col-3">
            <button
              :class="`btn ${
                filterBy == 'year' ? 'btn-info' : 'btn-outline-info'
              } text-dark w-100`"
              @click="filterBy = 'year'"
            >
              Year
            </button>
          </div>
        </div>
      </div>
    </div> -->
    <div v-if="!auditMode">
      <div class="row">
        <div class="col">
          <BarGraph v-if="!isLoadingRed" :propsData="yamazumiDataRed" />
          <Skeleton v-else />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <BarGraph v-if="!isLoadingWhite" :propsData="yamazumiDataWhite" />
          <Skeleton v-else />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="input-group w-50 mx-auto">
        <select class="form-control" v-model="year">
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">YEAR</span>
        </div>
      </div>
      <div v-if="year == 2022">
        <BarGraphAudit :mapBgCol="bgCol" />
      </div>
      <div v-else>
        <BarGraphAudit2 :mapBgCol="bgCol" />
      </div>
      <div class="card">
        <table class="table table-bordered">
          <tr>
            <td style="max-width: 50px !important">Category</td>
            <td>Description</td>
          </tr>
          <tr>
            <td style="background-color: #fc3232">Repair</td>
            <td class="text-left pl-3">
              <b>Maintenance Repair Breakdown machine</b>
            </td>
          </tr>
          <tr>
            <td style="background-color: #c8ffdb">Preventive</td>
            <td class="text-left pl-3">
              <b
                >1.SE Activity, 2.Critical Machine C/M, 3.Yokoten,
                4.Improvement, 5.TPM, 6.RED TAG, 7.C/M Temuan TPM, 8.C/M
                Potencial Breakdown, 9.Trainer OM</b
              >
            </td>
          </tr>
          <tr>
            <td style="background-color: #149102">Safety</td>
            <td class="text-left pl-3">
              <b>Safety activity (KY)</b>
            </td>
          </tr>
          <tr>
            <td style="background-color: #97ffeb">Project</td>
            <td class="text-left pl-3">
              <b>Project Activity</b>
            </td>
          </tr>
          <tr>
            <td style="background-color: #c2eae3">Others</td>
            <td class="text-left pl-3">
              <b>1.4S, 2.Admin, 3.Meeting, 4.Investigasi Problem</b>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Skeleton } from "vue-loading-skeleton";

import BarGraph from "@/components/ApexChart/BarGraph";
import BarGraphAudit from "@/components/ApexChart/BarGraphAudit";
import BarGraphAudit2 from "@/components/ApexChart/BarGraphAudit2";
import { STATE_GROUP_FIX } from "./job.state";
// import { yamazumiDataWhite, yamazumiDataRed } from "./state.job";

import formatDate from "@/functions/formatDate";

export default {
  data() {
    return {
      year: 2022,
      yamazumiDataRed: null,
      yamazumiDataWhite: null,
      auditMode: true,
      memberRed: null,
      memberWhite: null,
      memberYamazumiDataRed: [],
      memberYamazumiDataWhite: [],
      bgCol: null,
      filterBy: "day",
      fstart_time: formatDate.YYYYMMDD(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      ),
      fend_time: formatDate.YYYYMMDD(
        new Date().getTime() + 1000 * 60 * 60 * 24
      ),
      isLoadingRed: false,
      isLoadingWhite: false,
    };
  },
  components: {
    BarGraph,
    Skeleton,
    BarGraphAudit,
    BarGraphAudit2,
  },
  watch: {
    filterBy: async function () {
      await this.getYamazumiData("RED");
      await this.getYamazumiData("WHITE");
    },
  },
  methods: {
    async getMtMember(shift) {
      await axios
        .get(
          `${process.env.VUE_APP_HOST}/getAllMtMember?shift=${shift}&isMember=true`
        )
        .then((result) => {
          console.log(result);
          let mapMembers = result.data.data.map((member) => {
            return member.fname.slice(0, 10);
          });
          if (shift == "RED") {
            this.memberRed = mapMembers;
          }
          if (shift == "WHITE") {
            this.memberWhite = mapMembers;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getYamazumiData(shift) {
      await axios
        .post(
          `${process.env.VUE_APP_HOST}/getYamazumiData?fstart_time=${this.fstart_time}&fend_time=${this.fend_time}`,
          {
            members: shift == "RED" ? this.memberRed : this.memberWhite,
          }
        )
        .then((result) => {
          console.log(result);
          result.data.data.forEach((yamaData) => {
            // let results = yamaData.reduce(function (r, a) {
            //   r[a.fgroup] = r[a.fgroup] || [];
            //   r[a.fgroup].push(a);
            //   return r;
            // }, Object.create(null));
            // console.log(results);
            if (shift == "RED") {
              this.memberYamazumiDataRed.push(yamaData);
            } else {
              this.memberYamazumiDataWhite.push(yamaData);
            }
          });
          if (shift == "RED") {
            this.isLoadingRed = false;
          } else {
            this.isLoadingWhite = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getYamazumiByDate() {
      this.isLoadingRed = true;
      this.isLoadingWhite = true;
      await this.processYamaRed();
      await this.processYamaWhite();
    },
    initArrayZero(length, value) {
      var arr = [],
        i = 0;
      arr.length = length;
      while (i < length) {
        arr[i++] = value;
      }
      return arr;
    },
    async processYamaRed() {
      await this.getMtMember("RED");
      await this.getYamazumiData("RED");
      let containerData = [];
      for (let i = 0; i < STATE_GROUP_FIX.container.length; i++) {
        let jobType = STATE_GROUP_FIX.container[i];
        let obj = {
          name: jobType.type,
          data: await this.initArrayZero(this.memberRed.length, 0),
        };
        for (let j = 0; j < this.memberRed.length; j++) {
          let member = this.memberRed[j];
          // let idxMember = -1
          for (let k = 0; k < this.memberYamazumiDataRed.length; k++) {
            let datas = this.memberYamazumiDataRed[k];
            datas.forEach((data) => {
              if (
                data.foperator.includes(member) &&
                jobType.group == data.fgroup
              ) {
                // idxMember =
                obj.data[j] = Number(data.fdur);
              }
            });
          }
        }
        await containerData.push(obj);
      }
      this.yamazumiDataRed = {
        data: containerData,
        bgCol: this.bgCol,
        labels: this.memberRed,
        title: "Yamazumi Red Shift",
        yLabel: "Minutes",
      };
      // this.yamazumiDataRed = yamazumiDataRed;
    },
    async processYamaWhite() {
      let containerDataWhite = [];
      await this.getMtMember("WHITE");
      await this.getYamazumiData("WHITE");
      for (let i = 0; i < STATE_GROUP_FIX.container.length; i++) {
        let jobType = STATE_GROUP_FIX.container[i];
        let obj = {
          name: jobType.type,
          data: await this.initArrayZero(this.memberWhite.length, 0),
        };
        for (let j = 0; j < this.memberWhite.length; j++) {
          let member = this.memberWhite[j];
          for (let k = 0; k < this.memberYamazumiDataWhite.length; k++) {
            let datas = this.memberYamazumiDataWhite[k];
            datas.forEach((data) => {
              if (
                data.foperator.includes(member) &&
                jobType.group.includes(data.fgroup)
              ) {
                obj.data[j] = Number(data.fdur);
              }
            });
          }
        }
        console.log(obj);
        containerDataWhite.push(obj);
      }
      this.yamazumiDataWhite = {
        data: containerDataWhite,
        bgCol: this.bgCol,
        labels: this.memberWhite,
        title: "Yamazumi White Shift",
        yLabel: "Minutes",
      };
      this.isLoadingWhite = false;
      // this.yamazumiDataWhite = yamazumiDataWhite;
    },
  },
  async mounted() {
    let mapBgCol = await STATE_GROUP_FIX.container.map((item) => {
      return item.bgCol;
    });
    this.bgCol = mapBgCol;
    this.isLoadingRed = true;
    this.isLoadingWhite = true;
    await this.processYamaRed();
    await this.processYamaWhite();
  },
};
</script>