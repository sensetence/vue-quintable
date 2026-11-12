// virtualScroll: only the rows in the table's scroll box (and a few around it) are rendered; spacer rows above and
// below keep the scroll height. Row heights are measured once rendered and estimated (rowHeight, or the average of
// the measured ones) for the others. Part of VueQuintable (src/components/table/vue-quintable.vue).

// Rows rendered beyond the box on each side, so a fast scroll shows no gap.
const OVERSCAN = 8;
// Rows rendered before the box was measured.
const FIRST_WINDOW = 40;

export default {
  computed: {
    // The rows to render: the window with virtualScroll, else all rows of the page (the same array).
    _renderedRowIndexes() {
      if (!this.configFinal.virtualScroll) {
        return this.visibleRowIndexes;
      }
      const { start, end } = this.virtualRange;
      return this.visibleRowIndexes.slice(start, end);
    },
  },
  methods: {
    // A row's height: measured, or estimated. The estimate is fixed once a first row was measured: an average that
    // moved with every measurement, times thousands of unmeasured rows, would move the window on every render.
    _rowHeight(rIndex) {
      const heights =
        this._virtualHeights || (this._virtualHeights = new Map());
      if (heights.has(rIndex)) {
        return heights.get(rIndex);
      }
      return this._virtualEstimate || this.configFinal.rowHeight;
    },

    // The box the rows scroll in and where the body starts in it.
    _virtualBox() {
      const box = this.$refs["height-wrapper"];
      const body =
        this.$refs.table && this.$refs.table.querySelector(":scope > tbody");
      if (!box || !body) {
        return null;
      }
      const bodyTop =
        body.getBoundingClientRect().top -
        box.getBoundingClientRect().top +
        box.scrollTop;
      return { box, bodyTop };
    },

    // Works out which rows the box shows and sets the window and the spacer heights, if they changed.
    _updateVirtualRange() {
      if (!this.configFinal.virtualScroll) {
        return;
      }
      const indexes = this.visibleRowIndexes;
      const n = indexes.length;
      const view = this._virtualBox();
      let top = 0;
      let height = FIRST_WINDOW * this.configFinal.rowHeight;
      if (view) {
        top = Math.max(0, view.box.scrollTop - view.bodyTop);
        // a hidden box has no height yet: render the first window until it shows (see _setupVirtual)
        height = view.box.clientHeight || height;
      }
      let start = 0;
      let y = 0;
      while (start < n && y + this._rowHeight(indexes[start]) <= top) {
        y += this._rowHeight(indexes[start]);
        start++;
      }
      let end = start;
      let y2 = y;
      while (end < n && y2 < top + height) {
        y2 += this._rowHeight(indexes[end]);
        end++;
      }
      start = Math.max(0, start - OVERSCAN);
      end = Math.min(n, end + OVERSCAN);
      let before = 0;
      for (let i = 0; i < start; i++) {
        before += this._rowHeight(indexes[i]);
      }
      let after = 0;
      for (let i = end; i < n; i++) {
        after += this._rowHeight(indexes[i]);
      }
      const range = this.virtualRange;
      if (
        range.start !== start ||
        range.end !== end ||
        Math.abs(range.top - before) > 1 ||
        Math.abs(range.bottom - after) > 1
      ) {
        this.virtualRange = {
          start,
          end,
          top: Math.round(before),
          bottom: Math.round(after),
        };
      }
    },

    // Measures the rendered rows (a row and its details) and corrects the window if their heights changed it.
    _measureVirtualRows() {
      if (!this.configFinal.virtualScroll) {
        return;
      }
      // At most a few corrections a frame: rows that measure differently each time must not render without end.
      this._virtualPasses = (this._virtualPasses || 0) + 1;
      if (this._virtualPasses === 1) {
        requestAnimationFrame(() => (this._virtualPasses = 0));
      } else if (this._virtualPasses > 4) {
        return;
      }
      const heights =
        this._virtualHeights || (this._virtualHeights = new Map());
      const first = (name) => [].concat(this.$refs[name] || [])[0];
      for (const rIndex of this._renderedRowIndexes) {
        const row = first("row-highlighted-" + rIndex);
        if (!row) {
          continue;
        }
        const details = first("generated-row-highlighted-" + rIndex);
        const height =
          row.getBoundingClientRect().height +
          (details ? details.getBoundingClientRect().height : 0);
        // a hidden table measures 0: keep the estimate
        if (height > 0) {
          heights.set(rIndex, height);
          // the first row without details sets the estimate for all rows not measured yet
          if (!this._virtualEstimate && !details) {
            this._virtualEstimate = height;
          }
        }
      }
      this._updateVirtualRange();
    },

    // Listens to the box's scrolling (once a frame) while virtualScroll is on.
    _setupVirtual() {
      const box = this.$refs["height-wrapper"];
      if (!this.configFinal.virtualScroll || !box) {
        this._teardownVirtual();
        return;
      }
      if (this._virtualListening !== box) {
        this._teardownVirtual();
        this._onVirtualScroll = () => {
          if (!this._virtualFrame) {
            this._virtualFrame = requestAnimationFrame(() => {
              this._virtualFrame = null;
              this._updateVirtualRange();
            });
          }
        };
        box.addEventListener("scroll", this._onVirtualScroll, {
          passive: true,
        });
        // A box that changes its height (or shows after being hidden) shows other rows.
        if (typeof ResizeObserver !== "undefined") {
          this._virtualObserver = new ResizeObserver(() =>
            this._measureVirtualRows(),
          );
          this._virtualObserver.observe(box);
        }
        this._virtualListening = box;
      }
      this._measureVirtualRows();
    },

    _teardownVirtual() {
      if (this._virtualListening) {
        this._virtualListening.removeEventListener(
          "scroll",
          this._onVirtualScroll,
        );
        this._virtualListening = null;
      }
      if (this._virtualObserver) {
        this._virtualObserver.disconnect();
        this._virtualObserver = null;
      }
      if (this._virtualFrame) {
        cancelAnimationFrame(this._virtualFrame);
        this._virtualFrame = null;
      }
    },

    // Scrolls the box so a row (e.g. the active one, moved with the arrow keys) is in view.
    _scrollRowIntoView(rIndex) {
      const view = this._virtualBox();
      const position = this._visibleRowIndexMap[rIndex];
      if (!view || position === undefined) {
        return;
      }
      const indexes = this.visibleRowIndexes;
      let y = 0;
      for (let i = 0; i < position; i++) {
        y += this._rowHeight(indexes[i]);
      }
      const rowTop = view.bodyTop + y;
      const rowBottom = rowTop + this._rowHeight(rIndex);
      const box = view.box;
      if (rowTop < box.scrollTop + view.bodyTop) {
        box.scrollTop = rowTop - view.bodyTop;
      } else if (rowBottom > box.scrollTop + box.clientHeight) {
        box.scrollTop = rowBottom - box.clientHeight;
      }
    },
  },
};
