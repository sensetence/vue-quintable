import {App} from "vue";

// components
import PrettyCheckbox from "../components/form/pretty-checkbox.vue";
import PrettyRadio from "../components/form/pretty-radio.vue";
import VueSelect from "vue-select";

// styles
import 'vue-select/dist/vue-select.css';

export function registerFormComponents(app: App) {
    app.component("p-quintable-check", PrettyCheckbox);
    app.component("p-quintable-radio", PrettyRadio);
    app.component("v-quintable-select", VueSelect);
}