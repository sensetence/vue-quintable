import Vue from "vue";

Vue.config.productionTip = false;
Vue.config.devtools = false;

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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

library.add(
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
  faTimes
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

// Stub p-check and v-select as simple components
Vue.component("p-check", {
  template: '<input type="checkbox" v-bind="$attrs" v-on="$listeners" />',
  props: ["modelValue", "value", "color", "className"],
});

Vue.component("v-select", {
  template: '<select v-bind="$attrs" v-on="$listeners"><slot /></select>',
  props: ["value", "options", "reduce"],
});

// Stub v-tooltip directive
Vue.directive("tooltip", {});
