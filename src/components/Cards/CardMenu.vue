<template>
  <router-link class="card-cus" :to="path">
    <div class="row">
      <div class="col">
        <img :src="img" height="100" style="border-radius: 10%" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span class="text-dark">{{ title }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CardMenuSymptom",
  props: {
    title: String,
    img: String,
    path: String,
  },
};
</script>


<style scoped>
.card-cus {
  padding-top: 5%;
  padding-bottom: auto;
  box-sizing: border-box;
  width: 350px;
  height: 204px;
  background: #d8d8d8;
  border: 1px solid white;
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(6px);
  border-radius: 17px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: bolder;
}

.card-cus:hover {
  border: 10px solid greenyellow;
  transform: scale(1.05);
}

.card-cus:active {
  transform: scale(0.95) rotateZ(1.7deg);
}
</style>