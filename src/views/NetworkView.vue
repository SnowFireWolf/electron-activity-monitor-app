<template>
  <div class="wrapper">
    <h1>Network</h1>

    <div v-if="isLoading">Loading...</div>
    <div class="flex" v-else>
      <div>
        <h1>{{ formatBytes(networkInfo[0].tx_dropped) }}</h1>
        <p>Upload</p>
      </div>
      <div>
        <h1>{{ formatBytes(networkInfo[0].rx_dropped) }}</h1>
        <p>Download</p>
      </div>
    </div>
    <div>
      {{ networkInfo }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,

      networkInfo: [],
      getInterval: null,
    };
  },

  async mounted() {
    this.initInformation();
  },

  watch: {
    networkInfo(value) {
      if (value !== []) {
        this.isLoading = false;
      } else {
        this.isLoading = true;
      }
    },
  },

  methods: {
    initInformation() {
      this.getInformation();

      this.getInterval = setInterval(() => {
        this.getInformation();
      }, 2000);
    },

    async getInformation() {
      try {
        const si = window.si;
        const result = await si.networkStats();
        this.networkInfo = result;
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    },

    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
  },

  unmounted() {
    clearInterval(this.getInterval);
  },
};
</script>

<style>
.wrapper {
  margin: auto;
  margin-left: 5%;
  margin-right: 5%;
}

@media screen and (max-width: 768px) {
  .wrapper {
    margin-left: 10%;
    margin-right: 10%;
  }
}

@media screen and (min-width: 920px) {
  .wrapper {
    margin-left: 20%;
    margin-right: 20%;
  }
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
