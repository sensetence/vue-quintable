import type { App } from "vue";

// components
import PrettyCheckbox from "../components/form/pretty-checkbox.vue";
import PrettyRadio from "../components/form/pretty-radio.vue";
import VueSelect from "vue-select";

// styles
import "vue-select/dist/vue-select.css";

export function registerFormComponents(app: App) {
  app.component("QuintablePCheck", PrettyCheckbox);
  app.component("QuintablePRadio", PrettyRadio);
  app.component("QuintableVSelect", VueSelect);
}
