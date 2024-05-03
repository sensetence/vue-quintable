/** COMMON START **/

import PrettyCheck from "pretty-checkbox-vue/check";
import "pretty-checkbox/src/pretty-checkbox.scss";

import vueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VTooltip from "v-tooltip";

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faCaretDown,
  faCaretUp,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCircleNotch,
  faEye,
  faEyeSlash,
  faMinus,
  faPlus,
  faSort,
  faSortAmountDown,
  faSortAmountDownAlt,
  faSquare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDoubleLeft);
library.add(faAngleDoubleRight);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faCaretDown);
library.add(faCaretUp);
library.add(faCheck);
library.add(faChevronDown);
library.add(faChevronUp);
library.add(faCircleNotch);
library.add(faEye);
library.add(faEyeSlash);
library.add(faMinus);
library.add(faPlus);
library.add(faSort);
library.add(faSortAmountDown);
library.add(faSortAmountDownAlt);
library.add(faSquare);
library.add(faTimes);

/** COMMON END **/

import VueQuintable from "./components/VueQuintable.vue";

// Declare install function executed by Vue.use()
let install = function (Vue, options) {
  if (install.installed) return;

  install.installed = true;
  Vue.component("v-select", vueSelect);
  Vue.component("p-check", PrettyCheck);
  Vue.component("font-awesome-icon", FontAwesomeIcon);
  Vue.component("VueQuintable", VueQuintable);
  Vue.use(VTooltip, {
    defaultTemplate:
      '<div class="quintable-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    defaultClass: "",
  });

  if (options.axios) {
    Vue.prototype.$globalVueQuintableaxios = options.axios;
  }
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default {
  VueQuintable: VueQuintable,
  install: install,
};
