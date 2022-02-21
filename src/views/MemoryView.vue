<template>
  <div class="wrapper">
    <h1>RAM</h1>

    <div class="flex">
      <div>
        <h1>{{ formatBytes(memoryInfo.used) }}</h1>
        <p>Used</p>
      </div>
      <div>
        <h1>{{ formatBytes(memoryInfo.total) }}</h1>
        <p>Total</p>
      </div>
    </div>

    <highcharts
      :constructor-type="'stockChart'"
      class="stats-chart"
      :options="memoryChartOptions"
      ref="memoryChart"
    ></highcharts>

    <div>
      {{ memoryInfo }}
    </div>
  </div>
</template>

<script>
import mixinsUtils from "@/mixins/mixinsUtils";

export default {
  mixins: [mixinsUtils],

  data() {
    return {
      memoryChartOptions: {
        series: [
          {
            color: "#4287f5",
            name: "GPU",
            type: "area",
            data: [],
            tooltip: {
              valueDecimals: 0,
              shared: true,
            },
          },
        ],
        xAxis: {
          type: "datetime",
        },
        yAxis: {
          allowDecimals: false,
          title: {
            text: "usage",
          },
        },
        credits: {
          enabled: false,
        },
        rangeSelector: {
          enabled: false,
        },
        navigator: {
          enabled: false,
        },
      },
      memoryInfo: {},
      getInterval: null,
    };
  },

  async mounted() {
    this.initInformation();

    const formatBytes = this.formatBytes;

    this.memoryChartOptions.tooltip = {
      formatter: function () {
        return formatBytes(this.y);
      },
    };
  },

  methods: {
    async initInformation() {
      await this.getInformation();

      this.memoryChartOptions.yAxis.max = this.memoryInfo.total;

      this.getInterval = setInterval(() => {
        this.getInformation();
      }, 2000);
    },

    async getInformation() {
      try {
        const si = window.si;
        const result = await si.mem();
        this.memoryInfo = result;
        //console.log(result)

        const date = new Date();
        const resDate = date.getTime() - date.getTimezoneOffset() * 60 * 1000;

        const usedMem = result.active;

        const newData = [resDate, usedMem];

        this.memoryChartOptions.series[0].data.push(newData);
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
table {
  width: 100%;
}

.stats-chart {
  border: 2px solid #e5e5e5;
  border-radius: 12px;
}
</style>
