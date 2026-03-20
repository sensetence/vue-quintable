import { config } from "@vue/test-utils";
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

// Register global components for all tests (Vue 3 style)
config.global.components = {
  "quintable-font-awesome-icon": FontAwesomeIcon,
  "quintable-p-check": {
    template: '<input type="checkbox" v-bind="$attrs" />',
    props: ["modelValue", "value", "color", "className"],
    emits: ["update:modelValue", "change"],
  },
  "quintable-v-select": {
    template: '<select v-bind="$attrs"><slot /></select>',
    props: ["modelValue", "options", "reduce", "clearable"],
    emits: ["update:modelValue"],
  },
};

// Stub v-tooltip directive
config.global.directives = {
  tooltip: {},
};
