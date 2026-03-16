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
    elementVisible(el) {
      if (el) {
        let computedStyle = window.getComputedStyle(el);
        return computedStyle.display !== "none";
      }
      return false;
    },

    breakpointListener() {
      clearTimeout(this.breakpointTimeout);

      this.breakpointTimeout = setTimeout(() => {
        this.generateHiddenBreakpoints(false);
      }, 250);
    },

    generateHiddenBreakpoints(regenerate = false) {
      if (regenerate) {
        this.hiddenBreakpoints = [];
      }

      let breakpoints = [];
      if (!this.elementVisible(this.$refs.xxl)) {
        breakpoints.push("xxl");
      }

      if (!this.elementVisible(this.$refs.xl)) {
        breakpoints.push("xl");
      }

      if (!this.elementVisible(this.$refs.lg)) {
        breakpoints.push("lg");
      }

      if (!this.elementVisible(this.$refs.md)) {
        breakpoints.push("md");
      }

      if (!this.elementVisible(this.$refs.sm)) {
        breakpoints.push("sm");
      }

      breakpoints.push("all");

      if (
        this.hiddenBreakpoints.length !== breakpoints.length ||
        this.hiddenBreakpoints.some((bp, i) => bp !== breakpoints[i])
      ) {
        this.hiddenBreakpoints = breakpoints;
      }
    },
  },
};
