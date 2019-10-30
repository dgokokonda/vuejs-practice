import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
// import {store} from './store'
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueTheMask)

new Vue({
  // store,
  router,
  render: h => h(App),
}).$mount('#app')
