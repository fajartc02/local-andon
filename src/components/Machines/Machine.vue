<template>
  <button
    :class="!machineData.status ? 'card-mc' : 'card-mc-stop'"
    v-b-tooltip.hover
    :title="
      !machineData.status
        ? 'Tidak Ada Problem'
        : detailAl
        ? detailAl
        : 'Klik untuk details'
    "
    @click="machineData.status ? getDetailAlarm(machineData.fid) : null"
  >
    <h2>{{ machineData.machine_nm }}</h2>
  </button>
</template>


<script>
import axios from "axios";
export default {
  name: "Machine",
  data() {
    return {
      detailAl: null,
    };
  },
  props: {
    machineData: Object,
  },
  methods: {
    async getDetailAlarm(id) {
      await axios
        .get(`${process.env.VUE_APP_HOST}/monitoring/machines/details?id=${id}`)
        .then((result) => {
          this.detailAl = `Alarm: ${result.data.data[0].ferror_name} | Duration: ${result.data.data[0].fdur} min`;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>


<style scoped>
.card-mc {
  width: 80px;
  height: 80px;
  background: #07182e;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 10px;
}

.card-mc h2 {
  z-index: 1;
  color: whitesmoke;
  /* background-color: aliceblue; */
  opacity: 0.8;
  font-size: 20px;
}

.card-mc::before {
  content: "";
  position: absolute;
  width: 80px;
  background-image: linear-gradient(180deg, rgb(51, 255, 0), rgb(48, 255, 183));
  height: 80px;
  /* animation: rotBGimg 3s linear infinite; */
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card-mc::after {
  content: "";
  position: absolute;
  background: #07182e;
  inset: 4px;
  border-radius: 10px;
}

.card-mc-stop {
  width: 80px;
  height: 80px;
  background: #07182e;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 10px;
}

.card-mc-stop h2 {
  z-index: 1;
  color: whitesmoke;
  /* background-color: aliceblue; */
  opacity: 0.8;
  font-size: 20px;
}

.card-mc-stop::before {
  content: "";
  position: absolute;
  width: 80px;
  background-image: linear-gradient(
    180deg,
    rgb(255, 0, 119),
    rgb(255, 48, 238)
  );
  height: 80px;
  animation: rotBGimg 3s linear infinite;
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card-mc-stop::after {
  content: "";
  position: absolute;
  background: #07182e;
  inset: 4px;
  border-radius: 10px;
}
</style>