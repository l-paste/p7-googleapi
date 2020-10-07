import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import axios from 'axios' // Pour charger le jSon local
import VueLodash from 'vue-lodash' // Pour le tri par note
import lodash from 'lodash'

import { store } from './store/store'; // Chargement du store pour qu'il soit accessible partout.

Vue.prototype.$http = axios
Vue.config.productionTip = true
Vue.use(Buefy)
Vue.use(VueLodash, { lodash: lodash })

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')