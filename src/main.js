/** COMMON START **/

import Vue from 'vue'
Vue.config.productionTip = false

import PrettyCheck from 'pretty-checkbox-vue/check';
import 'pretty-checkbox/src/pretty-checkbox.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons'
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck)
library.add(faSort)
library.add(faSortAmountDownAlt)
library.add(faSortAmountDown)


import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css"
Vue.use(BootstrapVue)

Vue.component('p-check', PrettyCheck);
Vue.component('font-awesome-icon', FontAwesomeIcon)

/** COMMON END **/

import App from './App.vue'


new Vue({
  render: h => h(App),
}).$mount('#app')
