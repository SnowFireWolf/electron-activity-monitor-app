<template>
  <h1>CPU</h1>
  <div>
    {{ cpuInfo }}
  </div>
</template>

<script>
export default {
  name: 'HomeView',

  data() {
    return {
      getInterval: null,

      cpuInfo: {},
      //cpuInterval: null,
    }
  },

  async mounted() {
    console.log('App mounted.');
    this.initInformation();
  },

  methods: {
    initInformation() {
      this.getCpuInformation();

      this.getInterval = setInterval(() => {
        this.getCpuInformation();
      }, 5000);
    },

    async getCpuInformation() {
      const si = window.si;
      const result = await si.cpuCurrentSpeed();
      this.cpuInfo = result;
    },
  },

  unmounted() {
    clearInterval(this.getInterval);
  }
}
</script>

<style>
</style>
