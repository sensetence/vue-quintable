/** COMMON START **/

import PrettyCheck from 'pretty-checkbox-vue/check';
import 'pretty-checkbox/src/pretty-checkbox.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons'
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons'

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css"


/** COMMON END **/

import VueFooTable from './components/VueFooTable.vue'

// Declare install function executed by Vue.use()
let install = function(Vue) {
	if (install.installed) return;
	install.installed = true;

	Vue.use(BootstrapVue)
	Vue.component('p-check', PrettyCheck);
	Vue.component('font-awesome-icon', FontAwesomeIcon)
	Vue.component('vue-foo-table', VueFooTable)

	library.add(faCheck)
	library.add(faSort)
	library.add(faSortAmountDownAlt)
	library.add(faSortAmountDown)
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
	VueFooTable:VueFooTable,
	install:install
}
