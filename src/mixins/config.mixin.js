// The table's settings: the config with defaults filled in (see config.ts), the axios to use, the debug flag.
// Part of VueQuintable (src/components/table/vue-quintable.vue), as src/mixins/config.mixin.js is in v2. Its
// watchers stay in the component: the order watchers are created in decides the order of the events they emit.

import axios from "axios";
import { normalizeConfig } from "../components/table/config";

export default {
  computed: {
    /**
     * Just a debug flag
     *
     */
    DEBUG() {
      return this.verbose;
    },

    /**
     * The axios instance to use: the table's own, else the plugin's, else the default axios.
     *
     */
    axiosFinal() {
      return this.axios || this.$globalVueQuintableaxios || axios;
    },

    /**
     * The config with every default filled in (see config.ts)
     *
     */
    configFinal() {
      return normalizeConfig(
        this.config,
        this.quintableDefaults,
        this.identifier,
        this.paginationOptions,
      );
    },
  },
};
