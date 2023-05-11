<template>
  <div class="container-fluid container-bg-dark">
    <div class="row pt-3">
      <div class="col">
        <h2 class="text-light">Symptom Management Menu</h2>
      </div>
    </div>
    <div class="pt-3 d-flex justify-content-between">
      <div class="d-flex">
        <CardMenu
          :title="'Machines Monitoring'"
          :img="'https://cdn.dribbble.com/users/980520/screenshots/2859415/monitoring.gif'"
          :path="'/symptom/parameter/dashboard'"
        />
      </div>
      <div class="d-flex">
        <CardMenu
          :title="'Alarm History'"
          :img="'https://cdn-blog.adafruit.com/uploads/2021/09/5134.gif'"
          :path="'/dashboard'"
        />
      </div>
      <div class="d-flex">
        <CardMenu
          :title="'Administration'"
          :img="'https://cliply.co/wp-content/uploads/2021/04/392104010_PENCIL_400px.gif'"
          :path="'/symptom/parameter/dashboard'"
        />
      </div>
    </div>
  </div>
</template>


<script>
// COMPONENTS
import CardMenu from "@/components/Cards/CardMenu";

export default {
  name: "SymptomParameter",
  components: {
    CardMenu,
  },
};
</script>

<style>
.container-bg-dark {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1057%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(29%2c 33%2c 33%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c526.315C96.815%2c506.441%2c181.735%2c464.109%2c271.001%2c421.686C374.35%2c372.57%2c496.708%2c349.907%2c564.76%2c257.917C638.099%2c158.781%2c693.387%2c22.491%2c652.343%2c-93.793C611.124%2c-210.573%2c457.502%2c-234.576%2c362.773%2c-314.345C286.814%2c-378.308%2c246.423%2c-486.781%2c151.401%2c-515.623C56.185%2c-544.524%2c-37.521%2c-472.299%2c-136.826%2c-465.987C-275.106%2c-457.198%2c-447.922%2c-571.212%2c-544.049%2c-471.421C-638.122%2c-373.763%2c-497.147%2c-208.456%2c-514.452%2c-73.967C-531.343%2c57.309%2c-675.55%2c165.246%2c-642.459%2c293.401C-609.588%2c420.704%2c-476.977%2c505.045%2c-353.371%2c549.856C-240.093%2c590.923%2c-118.031%2c550.544%2c0%2c526.315' fill='%231a1d1d'%3e%3c/path%3e%3cpath d='M1440 1063.943C1535.272 1061.232 1622.302 1019.8240000000001 1704.445 971.4839999999999 1789.423 921.475 1871.981 865.073 1922.159 780.1949999999999 1975.6 689.797 1998.2930000000001 585.179 1994.868 480.222 1991.165 366.756 1981.083 241.115 1901.913 159.75 1823.498 79.161 1697.029 81.94799999999998 1586.62 60.65699999999998 1486.551 41.360000000000014 1388.55 26.636999999999944 1287.698 41.30799999999999 1173.821 57.874000000000024 1049.938 70.26400000000001 967.6410000000001 150.699 883.383 233.05 856.765 357.20500000000004 844.586 474.392 832.735 588.422 838.568 709.718 899.445 806.863 957.504 899.51 1066.964 939.857 1165.702 986.815 1253.248 1028.45 1343.097 1066.701 1440 1063.943' fill='%23202525'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1057'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  height: 100vh;
  width: 100vw;
  background-size: cover;
}
.font-bungee {
  font-family: "Bungee";
  font-size: 40px;
}
.zoom-70 {
  zoom: 70%;
}
.v-window-x-transition-enter-active {
  transition: none;
}
.v-window-item {
  transition: none !important;
}
.v-window-x-transition-enter {
  transition: none;
}
.v-window__container {
  transition: none;
}
</style>