<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>Let's get system information</h1>
  {{ cpuInfo }}
  <button @click="testSi">testSi</button>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      cpuInfo: {},
    }
  },

  async mounted() {
    console.log('App mounted.');
    this.getMemoryInformation();
  },

  methods: {
    async getCpuInformation() {
      const si = window.si;

      try {
        console.log("loading...")
        const result = await si.cpuCurrentSpeed();
        this.cpuInfo = result;
        console.log(result)

        const cpuTemperature = await si.cpuTemperature();
        console.log(cpuTemperature)
      } catch (err) {
        console.log(err)
      }
    },

    async getMemoryInformation() {
      const si = window.si;

      si.mem().then(data => console.log(data));
    }
  }
}
</script>

<style>
#wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
