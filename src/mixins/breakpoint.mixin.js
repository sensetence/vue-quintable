import { getSharedBreakpoints } from "../utils/shared-breakpoints.js";

export default {
  data() {
    return {
      hiddenBreakpoints: [],
      initBreakpoints: true,
      breakpointTimeout: null,
    };
  },
  watch: {
    hiddenBreakpoints(val) {
      if (!this.initBreakpoints) {
        this.$emit("change:breakpoints", val, "change:breakpoints");
      }
      this.initBreakpoints = false;
    },
  },
  methods: {
    _onBreakpointChange(hidden) {
      if (
        this.hiddenBreakpoints.length !== hidden.length ||
        this.hiddenBreakpoints.some((bp, i) => bp !== hidden[i])
      ) {
        this.hiddenBreakpoints = hidden;
      }
    },

    elementVisible(el) {
      if (el) {
        return window.getComputedStyle(el).display !== "none";
      }
      return false;
    },

    // Keep for backwards compatibility — now delegates to shared detector
    generateHiddenBreakpoints() {
      const shared = getSharedBreakpoints();
      this._onBreakpointChange(shared.hiddenBreakpoints);
    },

    breakpointListener() {
      clearTimeout(this.breakpointTimeout);
      this.breakpointTimeout = setTimeout(() => {
        this.generateHiddenBreakpoints();
      }, 200);
    },
  },
};
