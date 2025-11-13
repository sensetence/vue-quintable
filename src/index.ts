// src/index.js  (or whatever your package entry is)

/** COMMON START **/

// Replace the Vue 2 wrapper with the pure CSS package.
// (We'll register a tiny <p-check> shim below to preserve your template API.)


import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

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
} from '@fortawesome/free-solid-svg-icons';

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

/** COMMON END **/

import { h, computed } from 'vue';
import VueQuintable from './components/VueQuintable.vue';



// Vue 3 plugin install
const install = (app, options = {}) => {
    // Components
    app.component('v-select', vSelect);
    app.component('font-awesome-icon', FontAwesomeIcon);
    app.component('VueQuintable', VueQuintable);

    // Tooltips (floating-vue is the Vue 3 successor to v-tooltip)
    app.use(FloatingVue, {
        // You can tweak defaults here; example sets a custom distance.
        distance: 6,
        // If you want a custom theme class, add CSS and set theme on each use.
        // See floating-vue docs for options.
    });

    // Global axios reference (was Vue.prototype.* in Vue 2)
    if (options.axios) {
        app.config.globalProperties.$globalVueQuintableaxios = options.axios;
    }
};

const plugin = { install };

// Export for ESM usage
export default plugin;
export { VueQuintable };