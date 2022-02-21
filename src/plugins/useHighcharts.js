import HighchartsVue from 'highcharts-vue'
import Highcharts from "highcharts"
import StockInit from "highcharts/modules/stock"
//import exportingInit from "highcharts/modules/exporting";


export default function useHighcharts(app) {
  if (typeof Highcharts === "object") {
    StockInit(Highcharts);
    //exportingInit(Highcharts)
  }

  app.use(HighchartsVue)
}