<template>
  <div class="container-fluid mt-2">
    <div class="row">
      <div class="col">
        <h5>Dashboard Total Problem</h5>
      </div>
    </div>
    <div class="row">
      <div class="col p-0 pl-1">
        <select class="form-control" v-model="selectedYear">
          <option selected value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col p-0 pl-1">
        <bar-total-problem v-if="selectedYear == 2022 && isDelayShow" :dataGraph="containerData"></bar-total-problem>
        <bar-total-problem v-if="selectedYear == 2021 && isDelayShow" :dataGraph="containerData2021"></bar-total-problem>
        <bar-total-problem v-if="selectedYear == 2020 && isDelayShow" :dataGraph="containerData2020"></bar-total-problem>
      </div>
    </div>
    <div class="row">
      <div class="col px-0">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th style="max-width: 35px">Warna</th>
              <th>Kategori</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="background-color: #ff4560"></td>
              <td>Problem PIC Produksi</td>
              <td class="text-left pl-2">
                1. Miss Operation Mesin, 2. Kebocoran Oli, 3. Kiriko, 4. Kurang
                Lubrikasi, 5. Kendor (Bolt / Nut)
              </td>
            </tr>
            <!-- <tr>
              <td style="background-color: #028ffb"></td>
              <td>Emergency</td>
              <td>Problem Lebih Dari 30 menit dan Kurang Dari 120 menit</td>
            </tr>
            <tr>
              <td style="background-color: #feb019"></td>
              <td>Long Time</td>
              <td>Problem Lebih Dari 120 menit</td>
            </tr> -->
            <tr>
              <td style="background-color: #765ed0"></td>
              <td>Problem TPM</td>
              <td class="text-left pl-2">
                1. Keterlambatan Inspeksi, 2. kesalahan inspeksi 3.
                keterlambatan action
              </td>
            </tr>
            <!-- <tr>
              <td style="background-color: #00ff61"></td>
              <td>Problem Predictive</td>
              <td>Problem Lebih Dari 120 menit</td>
            </tr> -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import BarTotalProblem from "../../components/ApexChart/BarTotalProblem.vue";
const arr21Ltb = [4, 3, 4, 4, 5, 3, 3, 3, 0, 3, 2, 3];

export default {
  name: "DashboardTotalProblem",
  data() {
    return {
      selectedYear: 2022,
      containerData: {
        categories: [
          "FY 2020/2021",
          "FY 2021/2022",
          // "FY 2022/2023",
          "Apr '22",
          "May '22'",
          "Jun '22",
          "Jul '22",
          "Aug '22",
          "Sept '22",
          "Oct '22",
          "Nov '22",
          "Dec '22",
          "Jan '23",
          "Feb '23",
          "Mar '23",
        ],
        containerProbProd: [
          18,
          12,
          // 8,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        containerProbEmergency: [
          1179,
          806,
          // 142,
          728,
          715,
          566,
          580,
          411,
          359,
          356,
          372,
          null,
          null,
          null,
          null,
        ],
        containerProbLtb: [
          86,
          arr21Ltb.reduce((total, num) => {
            return total + num;
          }, 1),
          // 7,
          4,
          3,
          3,
          2,
          1,
          5,
          5,
          3,
          null,
          null,
          null,
          null,
        ],
        containerProbTpm: [
          0,
          0,
          // 0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          null,
          null,
          null,
          null,
        ],
        containerNproblem: [
          34.3,
          33.6,
          // 32.7,
          28.3,
          26.1,
          24.1,
          23.8,
          20.1,
          19.8,
          19.1,
          18.4,
          null,
          null,
          null,
          null,
        ],
        containerProbTrend: [
          0,
          0,
          // 0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          null,
          null,
          null,
          null,
        ],
      },
      containerData2021: {
        categories: [
          "FY 2019/2020",
          "FY 2020/2021",
          // "FY 2021/2022",
          "Apr '21",
          "May '21",
          "Jun '21",
          "Jul '21",
          "Aug '21",
          "Sept '21",
          "Oct '21",
          "Nov '21",
          "Dec '21",
          "Jan '22",
          "Feb '22",
          "Mar '22",
        ],
        containerProbProd: [
          23, 18,
          // 14,
          3, 1, 4, 2, 1, 0, 0, 0, 0, 0, 1, 0,
        ],
        containerProbEmergency: [
          1208, 1179,
          // 806,
          84, 82, 79, 77, 73, 65, 63, 61, 58, 57, 55, 52,
        ],
        containerProbLtb: [
          103, 86,
          // 20,
          4, 3, 4, 4, 5, 3, 3, 3, 0, 3, 2, 3,
        ],
        containerProbTpm: [
          0, 0,
          // 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        containerNproblem: [
          45.4, 45.2,
          // 44.8,
          44.5, 44.2, 43.9, 43.6, 43.2, 43.1, 42.7, 42.6, 42.3, 42.1, 41.9,
          41.8,
        ],
        containerProbTrend: [
          0, 0,
          // 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
      },
      containerData2020: {
        categories: [
          "FY 2018/2019",
          "FY 2019/2020",
          // "FY 2020/2021",
          "Apr '20",
          "May '20",
          "Jun '20",
          "Jul '20",
          "Aug '20",
          "Sept '20",
          "Oct '20",
          "Nov '20",
          "Dec '20",
          "Jan '21",
          "Feb '21",
          "Mar '21",
        ],
        containerProbProd: [
          31, 23,
          // 18,
          3, 1, 3, 2, 2, 2, 1, 0, 1, 1, 2, 0,
        ],
        containerProbEmergency: [
          1412, 1208,
          // 1179,
          121, 117, 115, 103, 100, 95, 93, 92, 89, 87, 85, 82,
        ],
        containerProbLtb: [
          123,
          103,
          // 7,
          4,
          3,
          5,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        containerProbTpm: [
          0,
          0,
          // 0,
          0,
          0,
          0,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        containerNproblem: [
          52.3, 51.6,
          // 50.7,
          49.3, 49.1, 48.1, 47.3, 47.2, 47.1, 46.9, 46.7, 46.5, 46.3, 46.1,
          45.9,
        ],
        containerProbTrend: [
          0,
          0,
          // 0,
          0,
          0,
          0,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
      },
      containerProbProd: [
        18,
        14,
        // 8,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        null,
        null,
        null,
        null,
      ],
      containerProbEmergency: [
        1179,
        806,
        // 142,
        54,
        45,
        43,
        39,
        0,
        0,
        0,
        0,
        null,
        null,
        null,
        null,
      ],
      containerProbLtb: [
        32,
        20,
        // 7,
        4,
        3,
        5,
        1,
        0,
        0,
        0,
        0,
        null,
        null,
        null,
        null,
      ],
      containerProbTpm: [
        0,
        0,
        // 0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        null,
        null,
        null,
        null,
      ],
      containerProbTrend: [
        0,
        0,
        // 0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        null,
        null,
        null,
        null,
      ],
      isDelayShow: false,
    };
  },
  components: {
    BarTotalProblem,
  },
  mounted() {
    setTimeout(() => {
      this.isDelayShow = true;
    }, 1000);
  },
};
</script>