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
import mixinsUtils from '@/mixins/mixinsUtils';

export default {
  mixins: [mixinsUtils],

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
  },

  unmounted() {
    clearInterval(this.getInterval);
  },
};
</script>

<style>
</style>
