import Vue from 'vue'
import App from './App.vue'
import axios from '@/api'
import '@/mock'
import router from '@/router'
import '@/common/stylus/style.styl'
import '@/common/stylus/transition.styl'
Vue.config.productionTip = false;
Vue.prototype.bus = new Vue()
Vue.prototype.axios = axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
