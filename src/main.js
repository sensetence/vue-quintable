import '@babel/polyfill'
import 'mutationobserver-shim'

/** COMMON START **/

import Vue from 'vue'
import './plugins/bootstrap-vue'
Vue.config.productionTip = false

import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';
import 'pretty-checkbox/src/pretty-checkbox.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import vueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import VueRecomputed from 'vue-recomputed'
Vue.use(VueRecomputed);


import {
	faCheck,
	faSort,
	faSquare,
	faTimes,
	faSortAmountDownAlt,
	faSortAmountDown,
	faAngleRight,
	faInfoCircle,
	faAngleLeft,
	faAngleDoubleRight,
	faAngleDoubleLeft,
	faCircleNotch,
	faChevronDown,
	faArrowsAlt,
	faExpand,
	faPlus,
	faChevronUp,
} from '@fortawesome/free-solid-svg-icons'


library.add(faArrowsAlt);
library.add(faExpand);
library.add(faCheck);
library.add(faTimes);
library.add(faSort);
library.add(faSquare);
library.add(faSortAmountDownAlt);
library.add(faSortAmountDown);
library.add(faAngleDoubleRight);
library.add(faAngleDoubleLeft);
library.add(faAngleRight);
library.add(faAngleLeft);
library.add(faInfoCircle);
library.add(faCircleNotch);
library.add(faChevronDown);
library.add(faPlus);
library.add(faChevronUp);



Vue.component('v-select', vueSelect);
Vue.component('p-check', PrettyCheck);
Vue.component('p-radio', PrettyRadio);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/** COMMON END **/

import App from './App.vue'


new Vue({
	render: h => h(App),
}).$mount('#app')
