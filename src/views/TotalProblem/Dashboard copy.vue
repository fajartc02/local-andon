<template>
  <div class="container-fluid mt-2">
    <div class="row">
      <div class="col">
        <h5>Dashboard Total Problem</h5>
      </div>
    </div>
    <div class="row">
      <div class="col p-0 pl-1">
        <bar-total-problem></bar-total-problem>
      </div>
    </div>
    <div class="row">
      <div class="col p-0">
        <table>
          <tr>
            <th
              scope="row"
              style="
                max-width: 25px !important;
                background-color: #028ffb !important;
              "
            >
              Emergency
            </th>
            <td
              v-for="(emergency, i) in containerProbEmergency"
              :key="i"
              style="min-width: 30px"
            >
              {{ emergency }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              style="
                max-width: 25px !important;
                background-color: #feb019 !important;
              "
            >
              Long Time
            </th>
            <td
              v-for="(Ltb, i) in containerProbLtb"
              :key="i"
              style="min-width: 30px"
            >
              {{ Ltb }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              style="
                max-width: 25px !important;
                background-color: #ff4560 !important;
              "
            >
              Problem PIC Produksi
            </th>
            <td
              v-for="(prod, i) in containerProbProd"
              :key="i"
              style="min-width: 30px"
            >
              {{ prod }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              style="
                max-width: 25px !important;
                background-color: #765ed0 !important;
              "
            >
              Problem TPM
            </th>
            <td
              v-for="(Tpm, i) in containerProbTpm"
              :key="i"
              style="min-width: 30px"
            >
              {{ Tpm }}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              style="
                max-width: 25px !important;
                background-color: #00ff61 !important;
              "
            >
              Problem Predictive
            </th>
            <td
              v-for="(Trend, i) in containerProbTrend"
              :key="i"
              style="min-width: 30px"
            >
              {{ Trend }}
            </td>
          </tr>
        </table>
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
export default {
  name: "DashboardTotalProblem",
  data() {
    return {
      containerProbProd: [3, 4, 8, 3, 1, 4, 2, 1, 0, 0, 0, 1, 2, null, null],
      containerProbEmergency: [
        337,
        329,
        228,
        275,
        199,
        295,
        233,
        220,
        280,
        281,
        275,
        270,
        228,
        null,
        null,
      ],
      containerProbLtb: [3, 3, 7, 4, 3, 4, 4, 5, 3, 3, 3, 0, 3, null, null],
      containerProbTpm: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null],
      containerProbTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null],
    };
  },
  components: {
    BarTotalProblem: () => import("@/components/ApexChart/BarTotalProblem.vue"),
  },
};
</script>