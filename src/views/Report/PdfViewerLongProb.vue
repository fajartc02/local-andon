<template>
  <div id="app">
    <h1>Excel Report with Graph and Image</h1>
    <BarReport ref="chartComponent" />
    <ImageLink ref="imageComponent" />
    <button @click="generateReport">Generate Excel Report</button>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import BarReport from '@/components/Report/BarReport.vue';
import ImageLink from '@/components/Report/ImageLink.vue';

export default {
  name: 'App',
  components: {
    BarReport,
    ImageLink
  },
  methods: {
    generateReport() {
      const ws = XLSX.utils.json_to_sheet([
        { A: 'Chart and Image Report' },
        { A: '' },
        { A: 'Chart Data' },
        { A: 'Month', B: 'Value' },
        { A: 'January', B: 40 },
        { A: 'February', B: 20 },
        { A: 'March', B: 12 },
        { A: 'April', B: 39 },
        { A: 'May', B: 10 },
        { A: 'June', B: 40 },
        { A: 'July', B: 39 }
      ], { header: ['A', 'B'], skipHeader: true });

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');

      XLSX.writeFile(wb, 'ExcelReport.xlsx');
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}

button {
  margin-top: 20px;
}
</style>
