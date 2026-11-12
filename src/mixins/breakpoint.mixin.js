// Breakpoints: which columns collapse into a row's details, by window width or (autoFit) by the room in the container.
// Part of VueQuintable (src/components/table/vue-quintable.vue), as src/mixins/breakpoint.mixin.js is in v2. Its
// watchers stay in the component: the order watchers are created in decides the order of the events they emit.

import { getSharedBreakpoints } from "../utils/shared-breakpoints";
import { sameList } from "../components/table/helpers";

// autoFit: the breakpoints that collapse by the room in the table's container, largest first, never by window width.
const FIT_ORDER = ["xxl", "xl", "lg"];

export default {
  computed: {
    // Pre-compute per-column whether it matches any hidden breakpoint
    _hiddenBreakpointSet() {
      return Object.freeze(new Set(this.hiddenBreakpoints));
    },

    _colBreakpointMatch() {
      const bpSet = this._hiddenBreakpointSet;
      return Object.freeze(
        this.configFinal.columns.map((col) => {
          if (!col || !col.breakpoint) return false;
          const bp = col.breakpoint.toLocaleLowerCase();
          return bp === "all" || bpSet.has(bp);
        }),
      );
    },
  },
  methods: {
    /**
     * Callback from shared breakpoint detector
     */
    _onBreakpointChange(hidden) {
      if (this.configFinal.autoFit) {
        this.windowHiddenBreakpoints = hidden.filter(
          (bp) => !FIT_ORDER.includes(bp),
        );
        this.fitLevel = 0;
        this._applyFitLevel();
        this._scheduleFit();
        return;
      }
      if (!sameList(this.hiddenBreakpoints, hidden)) {
        this.hiddenBreakpoints = hidden;
      }
    },

    /**
     * autoFit: the window's list (phones, tablets, `all`) plus the `fitLevel` largest of FIT_ORDER.
     */
    _applyFitLevel() {
      const next = [
        ...this.windowHiddenBreakpoints,
        ...FIT_ORDER.slice(0, this.fitLevel),
      ];
      if (!sameList(this.hiddenBreakpoints, next)) {
        this.hiddenBreakpoints = next;
      }
    },

    _observeFitTable() {
      const table = this.$refs.table;
      if (this._fitObserver && table && table !== this._fitTable) {
        if (this._fitTable) {
          this._fitObserver.unobserve(this._fitTable);
        }
        this._fitObserver.observe(table);
        this._fitTable = table;
      }
    },

    _scheduleFit() {
      if (typeof requestAnimationFrame === "undefined") {
        this._fitToContainer();
        return;
      }
      if (this._fitFrame) {
        cancelAnimationFrame(this._fitFrame);
      }
      this._fitFrame = requestAnimationFrame(() => {
        this._fitFrame = null;
        this._fitToContainer();
      });
    },

    /**
     * autoFit: collapses FIT_ORDER one level at a time while the table overflows its container, all in one frame
     * before the next paint. A container that grew starts again from the window's list. Whatever still overflows
     * after the last level scrolls inside the container (`quintable-fit-scroll`).
     */
    _fitToContainer() {
      const container = this.$refs["height-wrapper"];
      const table = this.$refs.table;
      if (!container || !table || !this.windowHiddenBreakpoints) {
        return;
      }

      const width = container.clientWidth;
      const grew = this._fitWidth !== undefined && width > this._fitWidth;
      this._fitWidth = width;
      if (grew && this.fitLevel > 0) {
        this.fitScroll = false;
        this.fitLevel = 0;
        this._applyFitLevel();
        this.$nextTick(this._fitToContainer);
        return;
      }

      if (width === 0 || table.scrollWidth <= width + 1) {
        this.fitScroll = false;
        return;
      }
      if (this.fitLevel >= FIT_ORDER.length) {
        this.fitScroll = true;
        return;
      }

      // A level without columns of its own does not resize the table, so nothing observed fires: check again.
      this.fitLevel += 1;
      this._applyFitLevel();
      this.$nextTick(this._fitToContainer);
    },

    /**
     * Keep for backwards compatibility — now delegates to shared detector
     */
    generateHiddenBreakpoints() {
      const shared = getSharedBreakpoints();
      this._onBreakpointChange(shared.hiddenBreakpoints);
    },
  },
};
