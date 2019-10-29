import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import axios from 'axios'
import VueLodash from 'vue-lodash'

import { store } from './store/store';

Vue.prototype.$http = axios
Vue.config.productionTip = true
Vue.use(Buefy)
Vue.use(VueLodash)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

