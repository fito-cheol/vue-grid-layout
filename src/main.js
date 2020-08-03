import Vue from 'vue'
import App from './App.vue'


import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import highchartsMore from "highcharts/highcharts-more";

Stock(Highcharts)
highchartsMore(Highcharts);

Vue.use(HighchartsVue);

new Vue({
  render: h => h(App)
}).$mount('#app')
