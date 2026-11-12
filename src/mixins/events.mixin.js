// Mouse and keyboard: clicks on rows and cells, hover, arrow keys.
// Part of VueQuintable (src/components/table/vue-quintable.vue), as src/mixins/events.mixin.js is in v2. Its
// watchers stay in the component: the order watchers are created in decides the order of the events they emit.

import { shallowReactive } from "vue";

// The default hoverClass and activeClass (see config.ts).
const DEFAULT_ROW_CLASS = "bg-muted";

// ignoreControlClicks: the elements whose click is their own, not the row's or the cell's.
const CONTROL_SELECTOR =
  "a, button, input, select, textarea, label, [role='button']";
// accessible: the row's own toggle is a button, but its click is the row's (it opens the details).
const ROW_TOGGLE = ".quintable--toggle-button";

// The elements an event passed, from its target up, as they were when it was dispatched. Checked from the target
// alone, an earlier handler (a nested table's) may have re-rendered and detached it by now: the browser runs Vue's
// render between the listeners of one click.
function eventPath(e) {
  let path = typeof e.composedPath === "function" ? e.composedPath() : [];
  if (path.length) {
    // Not into a cell component's shadow DOM: from outside, its host was clicked, as before.
    const root = e.currentTarget && e.currentTarget.getRootNode();
    return root
      ? path.filter((n) => !(n instanceof Node) || n.getRootNode() === root)
      : path;
  }
  for (let node = e.target; node; node = node.parentNode) {
    path.push(node);
  }
  return path;
}

export default {
  methods: {
    /**
     * Handler for generic component events
     *
     */
    handleComponentEvent(data) {
      this.$emit("component:event", data, "component:event");
    },

    /**
     * ignoreControlClicks: a click on a link, button or form field inside the row or cell is the control's own, so
     * the row and the cell emit nothing and leave the event alone. A disabled control does nothing of its own: a
     * click on it stays the row's.
     */
    _isControlClick(e) {
      if (
        !this.configFinal.ignoreControlClicks ||
        !(e.target instanceof Element) ||
        !(e.currentTarget instanceof Element)
      ) {
        return false;
      }
      // The closest control up to the row or cell.
      const path = eventPath(e);
      const element = path
        .slice(0, path.indexOf(e.currentTarget) + 1)
        .find(
          (node) =>
            node instanceof Element &&
            node.matches(CONTROL_SELECTOR) &&
            !node.matches(ROW_TOGGLE),
        );
      if (!element) {
        return false;
      }
      const control =
        element instanceof HTMLLabelElement ? element.control : element;
      return !control?.disabled;
    },

    /**
     * cellTitles: an element in a body cell that cuts its text with `text-overflow: ellipsis` shows the whole text
     * as its title while the text is cut. An own title, or a tooltip on the cell, wins. Hover only: touch screens
     * get no title.
     */
    onCellMouseover(event) {
      if (!this.configFinal.cellTitles || !(event.target instanceof Element)) {
        return;
      }
      const cell = event.target.closest("td");
      if (
        !cell ||
        cell.hasAttribute("title") ||
        cell.hasAttribute("aria-describedby")
      ) {
        return;
      }
      let element = event.target;
      while (getComputedStyle(element).textOverflow !== "ellipsis") {
        if (element === cell) {
          return;
        }
        element = element.parentElement;
      }
      if (element.hasAttribute("title") && !element.dataset.quintableTitle) {
        return;
      }
      if (element.scrollWidth > element.clientWidth) {
        element.title = element.textContent.trim();
        element.dataset.quintableTitle = "1";
      } else if (element.dataset.quintableTitle) {
        element.removeAttribute("title");
        delete element.dataset.quintableTitle;
      }
    },

    /**
     * Check if a parent with certain class exists (kept for compatibility; onRowClick checks the event's path)
     *
     */
    hasSomeParentTheClass(element, className) {
      if (
        element instanceof HTMLElement &&
        element.classList.contains(className)
      ) {
        return true;
      }
      return (
        element instanceof Element &&
        element.parentNode &&
        this.hasSomeParentTheClass(element.parentNode, className)
      );
    },

    /**
     * Check if a parent with certain tag name exists
     *
     */
    hasSomeParentTagName(element, tagName) {
      if (
        element instanceof HTMLElement &&
        element.tagName.toLowerCase() === tagName.toLowerCase()
      ) {
        return true;
      }
      return (
        element instanceof Element &&
        element.parentNode &&
        this.hasSomeParentTagName(element.parentNode, tagName)
      );
    },

    /**
     * Event listener for mouse wheel clicked row
     *
     * @param e Click Event
     * @param rowIndex Index of clicked row
     */
    onRowAuxClick(e, rowIndex) {
      if (this._isControlClick(e) || e.button !== 1) {
        return;
      }
      const i = parseInt(rowIndex);
      this.$emit(
        "auxclick:row",
        this.rowsFinal[i],
        "auxclick:row",
        e.target,
        e,
        i,
      );
    },
    /**
     * Event listener for mousedown row, just for supporting mouse wheel click
     *
     * @param e Click Event
     */
    onRowMousedown(e) {
      if (!this._isControlClick(e) && e.which === 2) {
        e.preventDefault();
      }
    },
    /**
     * Event listener for clicked row. Emits an event if the row has been expanded or collapsed. Emits and event that row was clicked
     *
     * @param e Click Event
     * @param rowIndex Index of clicked row
     */
    onRowClick(e, rowIndex) {
      const path = eventPath(e);
      const inPath = (test) =>
        path.some((node) => node instanceof HTMLElement && test(node));
      if (
        this._isControlClick(e) ||
        (e.target || {}).type === "checkbox" ||
        // A click in a row's details (the default table or the details slot) is not a click on the row.
        (inPath(
          (node) =>
            node.classList.contains("generated-table") ||
            node.classList.contains("generated-details"),
        ) &&
          !this.nested)
      ) {
        return;
      }

      const isLink = inPath((node) => node.tagName.toLowerCase() === "a");
      const shouldPrevent = inPath((node) =>
        node.classList.contains("prevent-toggle"),
      );

      const index = rowIndex.toString();
      const i = parseInt(rowIndex);

      if (this.hiddenColumns[index] && !isLink && !shouldPrevent) {
        const row = this.rowsFinal[this.sortedIndexes[index]];
        const position = this.sortedIndexes[index];
        if (!this.openRows[index]) {
          this.openRows[index] = true;
          this.$emit("expand:row", row, "expand:row", position);
        } else {
          this.openRows[index] = false;
          this.$emit("collapse:row", row, "collapse:row", position);
          // deprecated: legacy listeners get collapses via expand:row as well
          this.$emit("expand:row", row, "collapse:row", position);
        }
        this.generatedUpdatedKey = Date.now();
      }

      if (this.configFinal.enableRowTabIndex) {
        this.activeRow = this.activeRow === i ? null : i;
      }
      this.$emit("click:row", this.rowsFinal[i], "click:row", e.target, e, i);
    },

    /**
     *
     * @param e
     * @param cell
     */
    onCellClick(e, cell) {
      if (this._isControlClick(e)) {
        return;
      }
      this.$emit("click:cell", cell, "click:cell", e.target, e);
    },

    /**
     *
     * @param e
     * @param cell
     */
    onCellAuxClick(e, cell) {
      if (!this._isControlClick(e) && e.button === 1) {
        this.$emit("auxclick:cell", cell, "auxclick:cell", e.target, e);
      }
    },

    /**
     * Event listener for mousedown cell, just for supporting mouse wheel click
     *
     * @param e Click Event
     */
    onCellMousedown(e) {
      if (!this._isControlClick(e) && e.which === 2) {
        e.preventDefault();
      }
    },

    /**
     * DOM-based hover management — avoids full re-render on mouse movement. A row and its details are one row: the
     * hovered element and both of them get the hover class, whichever the mouse is on.
     */
    _hoverRow(rIndex, event) {
      const target = event && event.currentTarget;
      if (
        this.hoveredRow === rIndex &&
        (!target || target === this._hoverTarget)
      ) {
        return;
      }
      this._hoverTarget = target || null;
      this.hoveredRow = rIndex;
      this._paintRows();
    },

    /**
     * Sets the hover and the active class on the rendered elements of their rows, a row's tr and its details' tr,
     * and takes them off the ones no longer hovered or active. On the DOM, not by rendering: moving the mouse or the
     * active row with the arrow keys re-renders nothing. With the default active class the active row also gets
     * `row-active` (`parent-row-active` on its details): both default classes are `bg-muted`, and the markers carry
     * the built-in active look. A custom activeClass is the app's to style. Only classes this method added are ever
     * taken off again, so a class a row has of its own stays.
     */
    _paintRows() {
      const { hoverClass, activeClass } = this.configFinal;
      // A class setting may hold several classes, e.g. "bg-light fw-bold".
      const tokens = (value) =>
        value ? String(value).split(/\s+/).filter(Boolean) : [];
      const paint = new Map();
      const add = (elements, classes) => {
        for (const element of elements) {
          paint.set(element, [...(paint.get(element) || []), ...classes]);
        }
      };
      const refs = (name) => [].concat(this.$refs[name] || []);
      if (
        hoverClass &&
        this._hoverTarget &&
        this.$el.contains(this._hoverTarget)
      ) {
        // Hover only while the element the mouse entered is still there: after a sort or page change it is gone.
        add(
          [
            this._hoverTarget,
            ...refs("row-highlighted-" + this.hoveredRow),
            ...refs("generated-row-highlighted-" + this.hoveredRow),
          ],
          tokens(hoverClass),
        );
      }
      if (activeClass && this.activeRow !== null) {
        const builtIn = activeClass === DEFAULT_ROW_CLASS;
        add(refs("row-highlighted-" + this.activeRow), [
          ...tokens(activeClass),
          ...(builtIn ? ["row-active"] : []),
        ]);
        add(refs("generated-row-highlighted-" + this.activeRow), [
          ...tokens(activeClass),
          ...(builtIn ? ["parent-row-active"] : []),
        ]);
      }
      const previous = this._painted || new Map();
      for (const [element, classes] of previous) {
        const keep = paint.get(element) || [];
        element.classList.remove(...classes.filter((c) => !keep.includes(c)));
      }
      const painted = new Map();
      for (const [element, classes] of paint) {
        const ours = previous.get(element) || [];
        const mine = classes.filter(
          (c) => ours.includes(c) || !element.classList.contains(c),
        );
        element.classList.add(...mine);
        painted.set(element, mine);
      }
      this._painted = painted;
    },

    /**
     * The rows' hover or active flags (name "hovered" or "active") for their details boxes (QuintableDetailsBox):
     * one reactive key per row, so a change wakes only the boxes of the rows it leaves and enters.
     */
    _rowFlags(name) {
      const flags = this._flags || (this._flags = {});
      return flags[name] || (flags[name] = shallowReactive({}));
    },

    // Moves a flag (see _rowFlags) from one row to another; null for none.
    _flagRow(name, from, to) {
      const flags = this._rowFlags(name);
      if (from !== null && from !== undefined) {
        flags[from] = false;
      }
      if (to !== null && to !== undefined) {
        flags[to] = true;
      }
    },

    /**
     * Event listener for mouse leave of table body. Releases the hoveredRow data entry
     *
     */
    onMouseleaveTable() {
      this._hoverTarget = null;
      this._paintRows();
      this.hoveredRow = null;
    },

    // accessible: Enter and Space sort by a focused sortable heading.
    _onHeaderKeydown(event, index) {
      if (
        this.configFinal.accessible &&
        this.configFinal.sorts[index] &&
        (event.key === "Enter" || event.key === " ") &&
        event.target === event.currentTarget
      ) {
        event.preventDefault();
        this.setSortColumn(index);
      }
    },

    // accessible: Enter and Space on a focused page link click it.
    _onPaginationKeydown(event) {
      if (
        this.configFinal.accessible &&
        (event.key === "Enter" || event.key === " ") &&
        event.target instanceof Element &&
        event.target.matches(".page-link[tabindex]")
      ) {
        event.preventDefault();
        event.target.click();
      }
    },

    // accessible: the attributes of a row's toggle button.
    _toggleA11y(rIndex) {
      const open = !!this.openRows[rIndex];
      return {
        type: "button",
        class: "quintable--toggle-button",
        "aria-expanded": String(open),
        "aria-label": open
          ? this.configFinal.collapseRowLabel
          : this.configFinal.expandRowLabel,
      };
    },

    // accessible: the attributes of a page link; label for an arrow, current for the page shown.
    _pageLinkA11y(label = null, current = false) {
      return {
        role: "button",
        tabindex: 0,
        "aria-label": label,
        "aria-current": current ? "page" : null,
      };
    },

    checkKey(event) {
      if (
        this.activeRow === null ||
        (event.keyCode !== 40 && event.keyCode !== 38)
      ) {
        return;
      }
      event.preventDefault();
      const rows = this.visibleRowIndexes;
      const current = this._visibleRowIndexMap[this.activeRow];
      if (event.keyCode === 40) {
        // Arrow down: the next visible row, from the last back to the first.
        this.activeRow =
          current === undefined || current === rows.length - 1
            ? rows[0]
            : rows[current + 1];
      } else {
        // Arrow up: the previous visible row, from the first round to the last.
        this.activeRow =
          current === undefined || current === 0
            ? rows[rows.length - 1]
            : rows[current - 1];
      }
    },
  },
};
