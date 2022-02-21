<template>
  <h1>GPU</h1>

  <div>
    {{ GPUInfo }}
  </div>

  <highcharts 
    :constructor-type="'stockChart'"
    class="hc"
    :options="gpuChartOptions"
    ref="gpuChart"
  ></highcharts>
</template>

<script>
import mixinsUtils from '@/mixins/mixinsUtils';

export default {
  mixins: [mixinsUtils],

  data() {
    return {
      gpuChartOptions: {
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
      GPUInfo: {},
      getInterval: null,
    };
  },

  async mounted() {
    this.initInformation();
  },

  methods: {
    async initInformation() {
      await this.getInformation();

      this.gpuChartOptions.yAxis.max = this.GPUInfo.controllers[0].memoryTotal;

      this.getInterval = setInterval(() => {
        this.getInformation();
        this.setChartData();
      }, 1000);
    },

    async getInformation() {
      try {
        const si = window.si;
        const result = await si.graphics();
        this.GPUInfo = result;
        //console.log(result);

        const date = new Date();
        const resDate = date.getTime() - date.getTimezoneOffset() * 60 * 1000;

        const newData = [
          resDate,
          result.controllers[0].memoryUsed
        ]

        this.gpuChartOptions.series[0].data.push(newData);
      } catch (error) {
        console.error(error);
      }
    },

    setChartData() {
      // this.testData.datasets[0].data = shallowRef(toRaw(this.chartContentData));
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
</style>
