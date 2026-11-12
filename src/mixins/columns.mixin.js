// Column features behind config switches: the column picker (columnPicker), pinned columns (column pin), sticky
// headings (stickyHeader), resizable columns (resizableColumns) and a filter per column (columnFilters).

import { cellsOf } from "../components/table/helpers";

// columnFilters: the text a cell shows (html without its tags), and the number it stands for.
function cellText(cell) {
  if (!cell) {
    return "";
  }
  const html = cell.html;
  return html !== undefined && html !== null && html !== ""
    ? String(html).replace(/<[^>]*>/g, "")
    : cell.text === undefined || cell.text === null
      ? ""
      : String(cell.text);
}
function cellNumber(cell) {
  if (!cell) {
    return NaN;
  }
  const value =
    cell.sortValue !== undefined && cell.sortValue !== null
      ? cell.sortValue
      : cellText(cell);
  return typeof value === "number" ? value : parseFloat(value);
}
const isSet = (value) =>
  value !== undefined && value !== null && String(value).trim() !== "";

// resizableColumns: widths of cells nobody sized yet, and the narrowest a column gets.
const DEFAULT_WIDTH = { column: 120, extra: 40 };
const MIN_WIDTH = 40;

// The table's own header cells (not columns of the config), by the key their width is kept under.
const EXTRA_HEADERS = {
  toggle: "toggle-th",
  selectPre: "select-th pre",
  selectPost: "select-th post",
  prepend: "row-prepend-th",
  append: "row-append-th",
};

// Pins: nothing pinned. Shared and frozen, so a table without pins reads the same object each time.
const NO_PIN = Object.freeze({ any: false, cols: Object.freeze([]) });
// Part of VueQuintable (src/components/table/vue-quintable.vue).

export default {
  methods: {
    // A column the table does not show: hidden by the config, or (columnPicker) by the user.
    _isHiddenCol(index) {
      return (
        this.configFinal.hiddenCols[index] ||
        (this.configFinal.columnPicker && !!this.userHiddenColumns[index])
      );
    },

    /**
     * columnPicker: shows or hides a column (flips it without a value). The last shown column stays.
     *
     * @param index the column
     * @param visible true to show, false to hide
     */
    toggleColumn(index, visible) {
      const show =
        typeof visible === "boolean"
          ? visible
          : !!this.userHiddenColumns[index];
      if (!show && this._pickerColumns.filter((c) => c.visible).length <= 1) {
        return;
      }
      const next = { ...this.userHiddenColumns };
      if (show) {
        delete next[index];
      } else {
        next[index] = true;
      }
      this.userHiddenColumns = next;
      const hidden = Object.keys(next).map(Number);
      if (this.configFinal.storeState) {
        localStorage.setItem(
          `vue-quintable-${this.identifier}-hidden-columns`,
          JSON.stringify(hidden),
        );
      }
      this.$emit("update:hidden-columns", hidden, "update:hidden-columns");
    },

    // columnPicker: closes the menu on a click outside it or on Escape.
    _onPickerToggle(event) {
      const details = event.target;
      const close = (e) => {
        if (
          (e.type === "keydown" && e.key === "Escape") ||
          (e.type === "pointerdown" && !details.contains(e.target))
        ) {
          details.open = false;
        }
      };
      if (details.open) {
        this._closePicker = close;
        document.addEventListener("pointerdown", close);
        document.addEventListener("keydown", close);
      } else {
        this._removePickerListeners();
      }
    },

    // column pin: measures the pinned cells now and whenever the table's size changes.
    _schedulePins() {
      if (!this._pin.any) {
        return;
      }
      const table = this.$refs.table;
      if (
        table &&
        this._pinObserved !== table &&
        typeof ResizeObserver !== "undefined"
      ) {
        this._unobservePins();
        this._pinObserver = new ResizeObserver(() => this._measurePins());
        this._pinObserver.observe(table);
        this._pinObserved = table;
      }
      this._measurePins();
    },

    _unobservePins() {
      if (this._pinObserver) {
        this._pinObserver.disconnect();
        this._pinObserver = null;
        this._pinObserved = null;
      }
    },

    // column pin: measures the pinned headings and sets each pinned cell's offset (the widths before it).
    _measurePins() {
      const table = this.$refs.table;
      const row = table && table.querySelector(":scope > thead > tr");
      if (!row) {
        return;
      }
      for (const side of ["start", "end"]) {
        const cells = [
          ...row.querySelectorAll(`:scope > .quintable-pin-${side}`),
        ];
        if (side === "end") {
          cells.reverse();
        }
        let offset = 0;
        cells.forEach((cell, k) => {
          table.style.setProperty(
            `--quintable-pin-${side}-${k}`,
            offset + "px",
          );
          offset += cell.getBoundingClientRect().width;
        });
      }
    },

    // resizableColumns: the key a header cell's width is kept under (a column's index, or an EXTRA_HEADERS key).
    _widthKey(th) {
      if (th.dataset.column !== undefined) {
        return Number(th.dataset.column);
      }
      return Object.keys(EXTRA_HEADERS).find((key) =>
        EXTRA_HEADERS[key].split(" ").every((c) => th.classList.contains(c)),
      );
    },

    // resizableColumns: takes the widths the header cells have now, so the table can switch to a fixed layout.
    _freezeWidths() {
      const row =
        this.$refs.table &&
        this.$refs.table.querySelector(":scope > thead > tr");
      if (!row || Object.keys(this.columnWidths).length) {
        return;
      }
      const widths = {};
      for (const th of row.children) {
        const key = this._widthKey(th);
        if (key !== undefined) {
          widths[key] = Math.round(th.getBoundingClientRect().width);
        }
      }
      this.columnWidths = widths;
    },

    // resizableColumns: sets a column's width and reports it.
    _commitWidth(index, width) {
      const next = {
        ...this.columnWidths,
        [index]: Math.max(MIN_WIDTH, width),
      };
      this.columnWidths = next;
      if (this.configFinal.storeState) {
        localStorage.setItem(
          `vue-quintable-${this.identifier}-column-widths`,
          JSON.stringify(next),
        );
      }
      this.$emit("resize:column", index, next[index], "resize:column");
    },

    /**
     * resizableColumns: back to the widths the content gives the columns.
     */
    resetColumnWidths() {
      this.columnWidths = {};
      if (this.configFinal.storeState) {
        localStorage.removeItem(
          `vue-quintable-${this.identifier}-column-widths`,
        );
      }
    },

    // resizableColumns: drags a column's edge. The DOM follows the pointer; the width is committed on release, so
    // moving the pointer renders nothing.
    _startResize(event, index) {
      const handle = event.currentTarget;
      const th = handle.parentElement;
      const table = this.$refs.table;
      this._freezeWidths();
      const rtl = getComputedStyle(table).direction === "rtl";
      const startX = event.clientX;
      const startWidth = th.getBoundingClientRect().width;
      const startTable = table.getBoundingClientRect().width;
      let width = startWidth;
      handle.setPointerCapture?.(event.pointerId);
      const move = (e) => {
        width = Math.max(
          MIN_WIDTH,
          startWidth + (rtl ? startX - e.clientX : e.clientX - startX),
        );
        th.style.width = width + "px";
        table.style.width = startTable + width - startWidth + "px";
      };
      const up = () => {
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", up);
        handle.removeEventListener("pointercancel", up);
        this._commitWidth(index, Math.round(width));
      };
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", up);
      handle.addEventListener("pointercancel", up);
    },

    // resizableColumns: arrow keys on a focused edge narrow or widen its column.
    _resizeKeydown(event, index) {
      const step = { ArrowLeft: -10, ArrowRight: 10 }[event.key];
      if (!step) {
        return;
      }
      event.preventDefault();
      this._freezeWidths();
      const rtl =
        this.$refs.table &&
        getComputedStyle(this.$refs.table).direction === "rtl";
      const current = this.columnWidths[index] || DEFAULT_WIDTH.column;
      this._commitWidth(index, current + (rtl ? -step : step));
    },

    // The width of one of the table's own header cells (toggle, select, prepend, append) in the fixed layout.
    _extraThStyle(key) {
      return (
        (this._layoutWidths && this._layoutWidths.extras[key]) || undefined
      );
    },

    /**
     * columnFilters: sets a column's filter: a text, a select value, or { min, max } for a range. An empty value
     * removes it.
     *
     * @param index the column
     * @param value the filter value
     */
    setColumnFilter(index, value) {
      const next = { ...this.columnFilterValues };
      const empty =
        value && typeof value === "object"
          ? !isSet(value.min) && !isSet(value.max)
          : !isSet(value);
      if (empty) {
        delete next[index];
      } else {
        next[index] = value;
      }
      this.columnFilterValues = next;
      this._columnFiltersChanged();
    },

    /**
     * columnFilters: removes every column filter.
     */
    clearColumnFilters() {
      this.columnFilterValues = {};
      this._columnFiltersChanged();
    },

    _columnFiltersChanged() {
      const values = this.columnFilterValues;
      if (this.configFinal.storeState) {
        localStorage.setItem(
          `vue-quintable-${this.identifier}-column-filters`,
          JSON.stringify(values),
        );
      }
      this.$emit("update:column-filters", values, "update:column-filters");
      if (this.configFinal.ajaxUrl) {
        clearTimeout(this._columnFilterTimeout);
        this._columnFilterTimeout = setTimeout(
          () => this.loadViaAjax(true, true, "COLUMN_FILTERS"),
          this.configFinal.ajaxRequestDelay,
        );
      } else {
        this.currentPage = 1;
      }
    },

    // columnFilters: an input of the filter row changed (a range input changes one bound).
    _onFilterInput(index, event, bound) {
      const value = event.target.value;
      this.setColumnFilter(
        index,
        bound
          ? { ...(this.columnFilterValues[index] || {}), [bound]: value }
          : value,
      );
    },

    // columnFilters: the accessible name of a column's filter: "Filter" and the heading's text.
    _filterLabel(index) {
      const headline = String(this.configFinal.headlines[index] || "")
        .replace(/<[^>]*>/g, "")
        .trim();
      return `${this.configFinal.columnFilterPlaceholder} ${headline || index + 1}`;
    },

    // columnFilters: the rows of `visible` that also pass every column filter.
    _applyColumnFilters(visible) {
      const filters = Object.entries(this.columnFilterValues).map(
        ([index, value]) => {
          const type = this.configFinal.filterTypes[index];
          if (type === "range") {
            const min = isSet(value.min) ? parseFloat(value.min) : -Infinity;
            const max = isSet(value.max) ? parseFloat(value.max) : Infinity;
            return (cell) => {
              const number = cellNumber(cell);
              return !isNaN(number) && number >= min && number <= max;
            };
          }
          if (type === "select") {
            const wanted = String(value);
            return (cell) => cellText(cell) === wanted;
          }
          const query = String(value).toLowerCase();
          return (cell) => cellText(cell).toLowerCase().includes(query);
        },
      );
      const indexes = Object.keys(this.columnFilterValues).map(Number);
      const rows = this.rowsFinal;
      return visible.map((pass, i) => {
        if (!pass) {
          return false;
        }
        const cells = cellsOf(rows[i]);
        return filters.every((test, k) => test(cells[indexes[k]]));
      });
    },

    _removePickerListeners() {
      if (this._closePicker) {
        document.removeEventListener("pointerdown", this._closePicker);
        document.removeEventListener("keydown", this._closePicker);
        this._closePicker = null;
      }
    },
  },
  computed: {
    // columnFilters: whether a column filter is set.
    _columnFilterActive() {
      return Object.keys(this.columnFilterValues).length > 0;
    },

    // columnFilters: the choices of each select filter, the column's filterOptions or its distinct values.
    _columnFilterOptions() {
      const options = {};
      const rows = this.rowsFinal;
      this.configFinal.columns.forEach((column, index) => {
        if (this.configFinal.filterTypes[index] !== "select") {
          return;
        }
        if (Array.isArray(column.filterOptions)) {
          options[index] = column.filterOptions.map(String);
          return;
        }
        const values = new Set();
        for (const row of rows) {
          const text = cellText(cellsOf(row)[index]);
          if (text !== "") {
            values.add(text);
          }
        }
        options[index] = [...values].sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true }),
        );
      });
      return options;
    },

    /**
     * resizableColumns: once a column was sized, the table lays its columns out by fixed widths (a sized width, or
     * a default for cells that came later), and is exactly as wide as they are together. Null before.
     */
    _layoutWidths() {
      if (!this.configFinal.resizableColumns) {
        return null;
      }
      const widths = this.columnWidths;
      if (!Object.keys(widths).length) {
        return null;
      }
      let total = 0;
      const px = (key, fallback) => {
        const width = widths[key] || fallback;
        total += width;
        return Object.freeze({ width: width + "px" });
      };
      const columns = this.configFinal.columns.map((c, j) =>
        this.cellVisible[j] ? px(j, DEFAULT_WIDTH.column) : null,
      );
      const extras = {};
      const present = {
        toggle: this.hasGeneratedRows && !this.configFinal.hideRowToggle,
        selectPre:
          this.configFinal.select && this.configFinal.selectPosition === "pre",
        selectPost:
          this.configFinal.select && this.configFinal.selectPosition === "post",
        prepend: !!this.$slots["row-prepend"],
        append: !!this.$slots["row-append"],
      };
      for (const key in present) {
        if (present[key]) {
          extras[key] = px(key, DEFAULT_WIDTH.extra);
        }
      }
      return Object.freeze({
        columns,
        extras,
        table: Object.freeze({ tableLayout: "fixed", width: total + "px" }),
      });
    },

    // The style of a column's heading: its width (sized, or the column's width option), or undefined.
    _thStyles() {
      const widths = this._layoutWidths;
      const configured = this.configFinal.widths;
      return this.configFinal.columns.map(
        (c, j) =>
          // a sized width, else the column's width option
          (widths && widths.columns[j]) ||
          (configured[j] ? { width: configured[j] } : undefined),
      );
    },

    // scrollHeight: the height the table scrolls in (virtualScroll needs one: 400px unless set), or false.
    _scrollHeight() {
      const height =
        this.configFinal.scrollHeight ||
        (this.configFinal.virtualScroll ? 400 : false);
      return typeof height === "number" ? height + "px" : height;
    },

    /**
     * column pin: the cells that stay in place while the table scrolls sideways, by column and for the table's own
     * columns (toggle, select, row-prepend/-append), each with its class and its offset variable. With a column
     * pinned to the start, the columns before all columns pin too; to the end, those after them.
     */
    _pin() {
      const pins = this.configFinal.pins;
      if (!pins.some(Boolean)) {
        return NO_PIN;
      }
      const visible = this.cellVisible;
      const pin = { any: false, cols: [] };
      const start = [];
      const end = [];
      const startCols = pins.filter((p, j) => p === "start" && visible[j]);
      if (startCols.length) {
        if (this.hasGeneratedRows && !this.configFinal.hideRowToggle) {
          start.push("toggle");
        }
        if (
          this.configFinal.select &&
          this.configFinal.selectPosition === "pre"
        ) {
          start.push("selectPre");
        }
        if (this.$slots["row-prepend"]) {
          start.push("prepend");
        }
      }
      pins.forEach((p, j) => p === "start" && visible[j] && start.push(j));
      if (pins.some((p, j) => p === "end" && visible[j])) {
        if (
          this.configFinal.select &&
          this.configFinal.selectPosition === "post"
        ) {
          end.push("selectPost");
        }
        if (this.$slots["row-append"]) {
          end.push("append");
        }
      }
      for (let j = pins.length - 1; j >= 0; j--) {
        if (pins[j] === "end" && visible[j]) {
          end.push(j);
        }
      }
      // up to 10 pinned cells per side: the CSS has an offset class for each (no inline style in every cell)
      const place = (items, side) =>
        items.slice(0, 10).forEach((item, k, placed) => {
          const entry = Object.freeze({
            cls:
              `quintable-pin quintable-pin-${side} quintable-pin-${side}-${k}` +
              (k === placed.length - 1 ? " quintable-pin-edge" : ""),
          });
          if (typeof item === "number") {
            pin.cols[item] = entry;
          } else {
            pin[item] = entry;
          }
        });
      place(start, "start");
      place(end, "end");
      pin.any = start.length + end.length > 0;
      return Object.freeze(pin);
    },

    // columnPicker: the columns the menu lists (not those the config hides), with their state.
    _pickerColumns() {
      const columns = [];
      this.configFinal.columns.forEach((column, index) => {
        if (column && !this.configFinal.hiddenCols[index]) {
          columns.push({
            index,
            headline:
              this.configFinal.headlines[index] || `Column ${index + 1}`,
            visible: !this.userHiddenColumns[index],
          });
        }
      });
      return columns;
    },
  },
};
