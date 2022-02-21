import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import useHighcharts from '@/plugins/useHighcharts'



const app = createApp(App)

useHighcharts(app)

app.use(router)
app.mount('#wrapper')
