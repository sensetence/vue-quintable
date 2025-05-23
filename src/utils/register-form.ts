import {App} from "vue";

// components
import PrettyInput from "../components/form/pretty-input.vue";
import PrettyCheckbox from "../components/form/pretty-checkbox.vue";
import PrettyRadio from "../components/form/pretty-radio.vue";
import VueSelect from "vue-select";

// styles
import 'vue-select/dist/vue-select.css';

export function registerFormComponents(app: App) {
    app.component("p-input", PrettyInput);
    app.component("p-check", PrettyCheckbox);
    app.component("p-radio", PrettyRadio);
    app.component("v-select", VueSelect);
}