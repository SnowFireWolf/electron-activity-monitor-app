<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>Let's get system information</h1>

  <div>
    <!-- foreach list -->
    <ul>
      <li v-for="(item, index) in processInfo.list" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
  <h1>記憶體資訊</h1>
  <div>
    {{ memoryInfo }}
  </div>
  <h1>電池資訊</h1>
  <div>
    {{ batteryInfo }}
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      allInterval: null,

      cpuInfo: {},
      //cpuInterval: null,

      processInfo: {},
      //processInterval: null,

      memoryInfo: {},
      //memoryInterval: null,

      batteryInfo: {},
      //batteryInterval: null,
    }
  },

  async mounted() {
    console.log('App mounted.');
    this.initAllInformation();
  },

  methods: {
    initAllInformation() {
      this.getProcessInformation();
      this.getCpuInformation();
      this.getMemoryInformation();
      this.getBatteryInformation();

      this.allInterval = setInterval(() => {
        this.getProcessInformation();
      }, 5000);
    },

    async getCpuInformation() {
    },

    async getProcessInformation() {
      try {
        const si = window.si;
        const result = await si.processes();
        this.processInfo = result;
      } catch (error) {
        console.error(error);
      }
    },

    async getMemoryInformation() {
      const si = window.si;
      const result = await si.mem();
      this.memoryInfo = result;
    },

    async getBatteryInformation() {
      try {
        const si = window.si;
        const result = await si.battery();
        this.batteryInfo = result;
      } catch (error) {
        console.error(error);
      }
    },
  },

  unmounted() {
    this.allInterval = null;
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
