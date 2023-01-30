<template>
  <div
    class="aw-card"
    :style="`border:${
      henkatenData.fstatus ? '1px green solid' : '1px #f4ce0e solid'
    }`"
  >
    <div class="container">
      <div class="row">
        <!-- <span class="badge badge-primary">Fix</span> -->
        <div class="col text-left pb-0 align-items-center">
          <!-- limit 8 -->
          <span class="badge badge-light">{{ henkatenData.fmc }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col text-left py-0">
          <span class="badge badge-dark">{{ henkatenData.fpic }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col text-left py-0" style="height: 130px">
          <!-- description max length 50 -->
          <b style="font-size: 12px">Item Temporary:</b><br />
          <small>{{ henkatenData.fchanges_item }}</small>
          <hr class="m-0 bg-success" />
          <b style="font-size: 12px">Next Action:</b><br />
          <small>{{ henkatenData.fnote }}</small>
        </div>
      </div>
      <div class="justify-content-around row">
        <div class="col text-left">
          <small>Dibuat: </small
          ><span class="badge badge-light">{{
            henkatenData.fdate.split("T")[0]
          }}</span>
        </div>
      </div>
      <div class="justify-content-center align-items-end row p-1">
        <div class="col py-0">
          <button class="btn btn-sm btn-pill btn-danger">
            <i class="fa fa-trash"></i>
          </button>
        </div>
        <div class="col py-0 align-items-center">
          <button class="btn btn-sm btn-pill btn-primary">
            <i class="fa fa-pencil"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "CardInquiry",
  data() {
    return {};
  },
  props: {
    henkatenData: Object,
    delHenkaten: Function,
    EditHenkaten: Function,
  },
};
</script>


<style scoped>
.aw-card {
  width: 190px;
  min-height: 250px;
  border-radius: 20px;
  background: #e0e0e0;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
}
</style>