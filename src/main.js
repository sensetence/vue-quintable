// import "@babel/polyfill";

/** COMMON START **/

import Vue from "vue";
import "./plugins/bootstrap-vue";
Vue.config.productionTip = false;

import PrettyCheck from "pretty-checkbox-vue/check";
import PrettyRadio from "pretty-checkbox-vue/radio";
import "pretty-checkbox/src/pretty-checkbox.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import vueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import VTooltip from "v-tooltip";

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faArrowsAlt,
  faCaretDown,
  faCaretUp,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCircleNotch,
  faEye,
  faEyeSlash,
  faExpand,
  faInfoCircle,
  faPlus,
  faMinus,
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
library.add(faArrowsAlt);
library.add(faCaretDown);
library.add(faCaretUp);
library.add(faCheck);
library.add(faChevronDown);
library.add(faChevronUp);
library.add(faCircleNotch);
library.add(faExpand);
library.add(faEye);
library.add(faEyeSlash);
library.add(faInfoCircle);
library.add(faMinus);
library.add(faPlus);
library.add(faSort);
library.add(faSortAmountDown);
library.add(faSortAmountDownAlt);
library.add(faSquare);
library.add(faTimes);

Vue.component("v-select", vueSelect);
Vue.component("p-check", PrettyCheck);
Vue.component("p-radio", PrettyRadio);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VTooltip, {
  defaultTemplate:
    '<div class="quintable-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  defaultClass: "",
});

/** COMMON END **/

import App from "./App.vue";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
