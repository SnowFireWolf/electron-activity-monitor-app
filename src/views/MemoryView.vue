<template>
  <h1>RAM</h1>

  <div>
    {{ memoryInfo }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      memoryInfo: {},
      getInterval: null,
    }
  },

  async mounted() {
    this.initInformation();
  },

  methods: {
    initInformation() {
      this.getInformation();

      this.getInterval = setInterval(() => {
        this.getInformation();
      }, 5000);
    },

    async getInformation() {
      try {
        const si = window.si;
        const result = await si.mem();
        this.memoryInfo = result;
        console.log(result)
      } catch (error) {
        console.error(error);
      }
    },
  },

  unmounted() {
    clearInterval(this.getInterval);
  }
}
</script>

<style>
table {
  width: 100%;
}
</style>
