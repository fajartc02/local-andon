<template>
  <div class="container-fluid mt-4">
    <div>
      <img
        src="@/assets/library2.jpeg"
        style="width: 100%; position: absolute; left: 0"
      />
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-outline-primary w-100">
          <i class="fa fa-plus"></i> Add Book
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              <i class="fa fa-search"></i>
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Search by judul, maker dan lain-lain..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div class="input-group-append">
            <span class="input-group-text p-0">
              <button class="btn btn-info btn-sm w-100 p-0 px-3">
                <i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-left">
      <div class="col py-0 px-1">
        <b>Last Book Opened</b>
      </div>
      <div class="col py-0 px-1 text-right">
        <span class="text-primary">See All</span>
      </div>
    </div>
    <div class="row flex-row flex-nowrap overflow-auto mb-4">
      <div
        class="col-5 p-0 mx-1 col-md-3 col-xl-3"
        @click="openPdf('eduDefectCasting')"
      >
        <div class="card">
          <img
            class="card-img-top"
            src="https://5.imimg.com/data5/KU/RX/MY-304964/cylinder-head-500x500.png"
            alt="Card image cap"
            height="100"
          />
          <div class="card-body p-1 mt-1 text-left">
            <h5 class="card-title py-2">Guidance Defect Casting</h5>
          </div>
        </div>
      </div>
      <div
        class="col-5 p-0 mx-1 col-md-3 col-xl-3"
        @click="openPdf('kindsCastDefect')"
      >
        <div class="card">
          <img
            class="card-img-top"
            src="https://www.researchgate.net/publication/331902545/figure/fig1/AS:738539998289921@1553093065193/Casting-simulation-results-of-cylinder-head.ppm"
            alt="Card image cap"
            height="100"
          />
          <div class="card-body p-1 mt-1 text-left">
            <h5 class="card-title py-2">Jenis Defect Casting</h5>
          </div>
        </div>
      </div>
      <div
        class="col-5 p-0 mx-1 col-md-3 col-xl-3"
        @click="openPdf('fanucManual')"
      >
        <div class="card">
          <img
            class="card-img-top"
            src="https://worldskills2019.com/application/files/4015/6468/4765/fanuc.png"
            alt="Card image cap"
            height="100"
          />
          <div class="card-body p-1 mt-1 text-left">
            <h5 class="card-title py-2">Fanuc Manual Instruction</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-left mt-4">
      <div class="col py-0 px-1">
        <b>Types Documents</b>
      </div>
      <div class="col py-0 px-1 text-right">
        <span class="text-primary">See All</span>
      </div>
    </div>
    <!-- Type Docs -->
    <div class="row flex-row flex-nowrap overflow-auto text-danger mb-4">
      <div class="col-4 p-0 mx-1 col-md-3 col-xl-3">
        <div class="card p-2 shadow-all" style="height: 100%">
          <div class="row">
            <div class="col">
              <i class="fa fa-cog" style="font-size: 40px"></i>
            </div>
          </div>
          <div class="row">
            <div class="col"><h6>Maintenance Manual</h6></div>
          </div>
          <div class="row">
            <div class="col">
              <span>43 Books</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 p-0 mx-1 col-md-3 col-xl-3">
        <div class="card p-2 shadow-all" style="height: 100%">
          <div class="row">
            <div class="col">
              <i class="fa fa-cog" style="font-size: 40px"></i>
            </div>
          </div>
          <div class="row">
            <div class="col"><h6>Drawing Book</h6></div>
          </div>
          <div class="row">
            <div class="col">
              <span>3 Books</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 p-0 mx-1 col-md-3 col-xl-3">
        <div class="card p-2 shadow-all" style="height: 100%">
          <div class="row">
            <div class="col">
              <i class="fa fa-cog" style="font-size: 40px"></i>
            </div>
          </div>
          <div class="row">
            <div class="col"><h6>Operation Drawing</h6></div>
          </div>
          <div class="row">
            <div class="col">
              <span>12 Books</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-left mt-4">
      <div class="col py-0 px-1">
        <b>Educational</b>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-6">
        <div class="card">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. A asperiores
          assumenda quia enim inventore distinctio maiores odio fugit architecto
          alias voluptas dolorem ad aperiam, nam cumque minima hic porro ipsa.
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. A asperiores
          assumenda quia enim inventore distinctio maiores odio fugit architecto
          alias voluptas dolorem ad aperiam, nam cumque minima hic porro ipsa.
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. A asperiores
          assumenda quia enim inventore distinctio maiores odio fugit architecto
          alias voluptas dolorem ad aperiam, nam cumque minima hic porro ipsa.
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. A asperiores
          assumenda quia enim inventore distinctio maiores odio fugit architecto
          alias voluptas dolorem ad aperiam, nam cumque minima hic porro ipsa.
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "DashboardMI",
  data() {
    return {
      search: null,
    };
  },
  methods: {
    openPdf(file) {
      window.open(`./${file}.pdf`);
    },
  },
};
</script>

<style scoped>
span {
  font-size: 11px;
}
</style>