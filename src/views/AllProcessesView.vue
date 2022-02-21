<template>
  <h1>All Processes</h1>

  <div>
    <table>
        <thead>
            <tr>
              <th>Name</th>
              <th>PID</th>
              <th>CPU</th>
              <th>Memory</th>
              <th>Description</th>
            </tr>
        </thead>
        <tbody>
          
          <tr v-for="(item, index) in processInfo.list" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.pid }}</td>
            <td>{{ item.cpu }}</td>
            <td>{{ item.mem }}</td>
            <td>{{ item.command }}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processInfo: {},
      processInterval: null,
    }
  },

  async mounted() {
    this.initInformation();
  },

  methods: {
    initInformation() {
      this.getProcessInformation();

      this.processInterval = setInterval(() => {
        this.getProcessInformation();
      }, 5000);
    },

    async getProcessInformation() {
      try {
        const si = window.si;
        const result = await si.processes();
        this.processInfo = result;
        console.log(result)
      } catch (error) {
        console.error(error);
      }
    },
  },

  unmounted() {
    clearInterval(this.processInterval);
  }
}
</script>

<style>
table {
  width: 100%;
}
</style>
