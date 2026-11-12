import type { App } from "vue";
// First, so floating-vue's CSS stays ahead of the form controls' in the bundled CSS.
import { registerTooltipComponent } from "./utils/register-tooltip";
import { registerIconComponents } from "./utils/register-icon";
import { registerFormComponents } from "./utils/register-form";
import VueQuintable from "./components/table/vue-quintable.vue";

interface InstallOptions {
  axios?: any;
  // Config defaults for every table; a table's own config wins.
  defaults?: Record<string, unknown>;
}

// Vue 3 plugin: registers the table, its icons, form controls and tooltips (floating-vue).
const install = (app: App, options: InstallOptions = {}) => {
  app.component("VueQuintable", VueQuintable);

  registerIconComponents(app);
  registerFormComponents(app);
  registerTooltipComponent(app);

  if (options.defaults) {
    app.provide("vueQuintableDefaults", options.defaults);
  }

  // Global axios instance for every table (a table's own `axios` prop wins).
  if (options.axios) {
    app.config.globalProperties.$globalVueQuintableaxios = options.axios;
  }
};

export { VueQuintable };
export default install;
