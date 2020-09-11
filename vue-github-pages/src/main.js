import Vue from 'vue'
import App from './App.vue'
import { router } from './routers/index.js'
import '../src/utils/material.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
