/** COMMON START **/

import Vue from 'vue'

import PrettyCheck from 'pretty-checkbox-vue/check';
import 'pretty-checkbox/src/pretty-checkbox.scss';


import vueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
	faAngleLeft,
	faAngleDoubleRight,
	faAngleDoubleLeft,
	faCircleNotch
} from '@fortawesome/free-solid-svg-icons'


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
library.add(faCircleNotch);


/** COMMON END **/

import VueQuintable from './components/VueQuintable.vue'

// Declare install function executed by Vue.use()
let install = function (Vue) {
	if (install.installed) return;

	install.installed = true;
	Vue.component('v-select', vueSelect);
	Vue.component('p-check', PrettyCheck);
	Vue.component('font-awesome-icon', FontAwesomeIcon);
	Vue.component('VueQuintable', VueQuintable);
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default {
	VueQuintable: VueQuintable,
	install: install
}
