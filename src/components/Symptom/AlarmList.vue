<template>
  <div class="card px-1 py-2">
    <div class="card-header text-left">Active Alarm</div>
    <div class="card-body p-1">
      <table class="table table-responsive">
        <thead>
          <tr>
            <th>No</th>
            <th>Machine</th>
            <th>Parameter</th>
            <th>Time</th>
            <th>Value</th>
            <th>Std</th>
            <th>Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="containerAlarm.length > 0">
          <tr
            v-for="(alarm, i) in containerAlarm"
            :class="alarm.isNormal == '0' ? 'bg-warning' : 'bg-danger'"
            :key="i"
          >
            <td>{{ i + 1 }}</td>
            <td>{{ alarm.fmc_name }}</td>
            <td>{{ alarm.ftemp_name }}</td>
            <td>{{ alarm.fupdate.split(".")[0] }}</td>
            <td>{{ alarm.fvalue_01 }}</td>
            <td>{{ alarm.franged }}</td>
            <td>{{ alarm.funit }}</td>
            <td>
              <button
                class="btn-sm btn-primary"
                @click="getDetailParam(alarm.fmc_name, alarm.ftemp_name)"
              >
                Detail
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="7">Tidak Ada Problem</td>
          </tr>
        </tbody>
      </table>
      <v-dialog v-model="dialogShow" persistent width="500" fullscreen>
        <v-card>
          <v-card-title class="headline grey lighten-2">
            <div class="row">
              <div class="col-8 text-left">Detail Parameter</div>
              <div class="col-4 text-right">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="dialogShow = false"
                >
                  Close
                </button>
              </div>
            </div>
          </v-card-title>
          <apexChartParameter
            v-for="(data, i) in chartData"
            :key="i"
            :propsChartData="data"
          />
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apexChartParameter from "@/components/apexChartParameter.vue";

export default {
  name: "AlarmList",
  data() {
    return {
      containerAlarm: [],
      containerDetailParam: null,
      chartData: [],
      isLoading: false,
      dialogShow: false,
    };
  },
  methods: {
    getAlarmHistory() {
      axios
        .get(`${process.env.VUE_APP_HOST}/alarmHistory?today=true`)
        .then((result) => {
          //   this.containerAlarm = result.data.data;
          console.log(result);
        })
        .catch((err) => {
          alert(err);
        });
    },
    getAlarmActive() {
      axios
        .get(`${process.env.VUE_APP_HOST}/activeAlarm`)
        .then((result) => {
          console.log(result);
          this.containerAlarm = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDetailParam(mc, param) {
      this.chartData = [];
      axios
        .get(
          `${process.env.VUE_APP_HOST}/detailParam?fmc_name=${mc}&ftemp_name=${param}`
        )
        .then((result) => {
          if (result.data.data) {
            this.containerDetailParam = result.data.data;
          }
          console.log(result);
          this.dialogShow = true;
          // this.paramGraph();
          if (this.containerDetailParam) {
            let raw = this.containerDetailParam;
            console.log(raw);
            this.dialogShow = true;
            if (raw[0][1]) {
              raw.forEach((paramsData) => {
                // if(paramsData.length > 0) {}
                let rawData = paramsData.reverse();
                let mapRawData = rawData.map((data) => {
                  let obj = {};
                  obj.data = Number(data.fvalue_01).toFixed(1);
                  obj.fupdate = `${data.fupdate.split("T")[1].split(".")[0]}`;
                  obj.mcName = data.fmc_name;
                  obj.funit = data.funit;
                  obj.fdiv = data.fdiv ? data.fdiv : 1;
                  if (data.WUL != null) {
                    if (Number(data.WUL) < -1) {
                      obj.Ul = data.WUL;
                      obj.max = Number(data.WUL) - 100;
                      obj.Ll = data.WLL;
                      obj.min = Number(data.WLL) + 100;
                    } else {
                      if (data.funit == "m/s") {
                        obj.max = Number(data.WUL) + 2;
                        obj.min = Number(data.WLL) - 2;
                      } else {
                        obj.max = Number(data.WUL) + 10;
                        obj.min = Number(data.WLL) - 10;
                      }
                      obj.Ul = data.WUL;
                      obj.Ll = data.WLL;
                    }
                  }
                  obj.paramName = data.ftemp_name;
                  // console.log(obj);
                  return obj;
                });
                this.chartData.push(mapRawData);
                // this.selectedParameters = [];
              });
            } else {
              let rawData = raw.reverse();
              let mapRawData = rawData.map((data) => {
                let obj = {};
                obj.data = Number(data.fvalue_01);
                obj.fupdate = data.fupdate.split("T")[1].split(".")[0];
                obj.mcName = data.fmc_name;
                obj.funit = data.funit;
                obj.fdiv = data.fdiv ? data.fdiv : 1;
                if (data.WUL != null) {
                  obj.Ul = data.WUL;
                  obj.max = Number(data.WUL) + 10;
                  obj.Ll = data.WLL;
                  obj.min = Number(data.WLL) - 10;
                }
                obj.paramName = data.ftemp_name;
                // console.log(obj);
                return obj;
              });
              this.chartData.push(mapRawData);
            }
            this.isLoading = false;
          } else {
            alert("Data tidak ada");
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async paramGraph() {},
  },
  components: {
    apexChartParameter,
  },
  mounted() {
    this.getAlarmHistory();
    this.getAlarmActive();
  },
};
</script>