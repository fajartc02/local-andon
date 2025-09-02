<template>
  <div class="card container-menu bg-light">
    <div class="row m-0 p-0 mt-2 flex-row flex-nowrap overflow-auto">
      <template v-for="menu in menus[0]">
        <div :key="menu" v-if="menu.isActive" class="col-3 hover-menu p-1" @click="goTo(menu.link)">
          <center>
            <img :src="menu.icon" width="30%" />
          </center>
          <center class="card-title">
            <div v-html="menu.html"></div>
          </center>
        </div>
      </template>
    </div>
    <div class="row m-0 p-0 mt-2 flex-row flex-nowrap overflow-auto">
      <template v-for="menu in menus[1]">
        <div :key="menu" v-if="menu.isActive" class="col-3 hover-menu p-1" @click="goTo(menu.link)">
          <center>
            <img :src="menu.icon" width="30%" />
          </center>
          <center class="card-title">
            <div v-html="menu.html"></div>
          </center>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "FeaturesMenu",
  data() {
    return {
      test: '',
      menus: [
        [
          {
            name: "Symptomp Parameter Monitoring",
            link: "/parameter/dashboard",
            icon: "https://cdn0.iconfinder.com/data/icons/work-from-home-153/66/91_work_log_work_record_work_list_listing_work_index-512.png",
            html: '<center class="card-title">Symptomp Parameter Monitoring</center>',
            isActive: true
          },
          {
            name: "Symptomp Management",
            link: "/symptom/parameter/dashboard",
            icon: "https://cdn-icons-png.flaticon.com/512/16873/16873867.png",
            html: '<center class="card-title">Symptomp Management</center>',
            isActive: true
          },
          {
            name: "LTB Report",
            link: "/ltb-report",
            icon: "https://www.pngmart.com/files/8/Report-PNG-Photos.png",
            html: '<center class="card-title">LTB Report</center>',
            isActive: false
          },
          {
            name: "Q6 Analysis",
            link: "/q6-anlysis",
            icon: "https://cdn0.iconfinder.com/data/icons/finance-141/33/analysis-1024.png",
            html: '<center class="card-title">Q6 <br /> Analysis</center>',
            isActive: true
          },
          {
            name: "Realtime Pareto",
            link: "/realtimePareto",
            icon: "https://cdn0.iconfinder.com/data/icons/accounting-and-tax/48/17-512.png",
            html: '<center class="card-title">Realtime Pareto</center>',
            isActive: true
          },
          {
            name: "Repair Analisys",
            link: "/job-analisys",
            icon: "https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-analyzing-data-png-image_5744358.png",
            html: '<center class="card-title">Repair <br /> Analisys</center>',
            isActive: true
          },
          {
            name: "Floating Analisys",
            link: "/floating-plunger",
            icon: "https://www.downloadclipart.net/large/32035-trend-infographic-clipart.png",
            html: '<center class="card-title">Floating<br />Plunger Tip</center>',
            isActive: true
          },
          {
            name: 'Order Spareparts',
            link: 'https://iwms.toyota.co.id/StorageInquiry',
            icon: 'https://cdn-icons-png.flaticon.com/512/2271/2271166.png',
            html: '<center class="card-title">Order Spareparts</center>',
            isActive: true
          }
        ],
        [
          {
            name: "Mtbf Mttr",
            link: "/mtbf-mttr",
            icon: "https://cdn3d.iconscout.com/3d/premium/thumb/achievement-6456750-5348958.png",
            html: '<center class="card-title">Mtbf <br />Mttr</center>',
            isActive: true
          },
          {
            name: "KY Machines",
            link: "/ky-machines",
            icon: "https://static.vecteezy.com/system/resources/thumbnails/016/770/597/small_2x/safety-first-yellow-sign-on-transparent-background-free-png.png",
            html: '<center class="card-title">KY <br /> Machines</center>',
            isActive: true
          },
          {
            name: "CM Followup",
            link: "/cmFollowup",
            icon: "https://cdn-icons-png.flaticon.com/512/3652/3652191.png",
            html: '<center class="card-title">CM <br /> Followup</center>',
            isActive: true
          },
          {
            name: "Problem History",
            link: "/problemHistory",
            icon: "https://cdn2.iconfinder.com/data/icons/plump-by-zerode_/256/Folder-URL-History-icon.png",
            html: '<center class="card-title">Problem<br />History</center>',
            isActive: true
          },
          {
            name: 'LTB Report Status',
            link: '/summaryWeekly',
            icon: 'https://icon-library.com/images/summary-icon/summary-icon-15.jpg',
            html: '<center class="card-title">LTB Report<br />Status</center>',
            isActive: true
          },
          {
            name: 'Focus Thema',
            link: '/focus-theme/member',
            icon: 'https://cdn-icons-png.flaticon.com/512/1879/1879426.png',
            html: '<center class="card-title">Focus <br />Thema</center>',
            isActive: true
          },
          {
            name: 'Manual Book & Drawing',
            link: 'https://tmmin.sharepoint.com/sites/MaintenancePlant3/Dokumen%20Berbagi/Forms/AllItems.aspx',
            icon: 'https://cdn-icons-png.flaticon.com/512/1879/1879426.png',
            html: '<center class="card-title">Manual Book <br />& Drawing</center>',
            isActive: false
          },
          {
            name: 'Temporary Action List',
            link: '/henkaten',
            icon: 'https://cdn-icons-png.flaticon.com/512/6214/6214240.png',
            html: '<center class="card-title">Temporary<br />Action List</center>',
            isActive: true
          },
          {
            name: 'Register Mc',
            link: '/registerNewMachine',
            icon: 'https://cdn-icons-png.flaticon.com/512/2271/2271166.png',
            html: '<center class="card-title">Register Mc</center>',
            isActive: true
          }
        ]
      ]
    }
  },
  methods: {
    goTo(link) {
      if (link?.includes === "https://") {
        window.open(link, "_blank");
        return
      }
      this.$router.push(link);
    },
  },
  props: {
    isStaff: Boolean
  }
}
</script>