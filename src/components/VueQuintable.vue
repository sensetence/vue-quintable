<template>
  <div class="table-wrapper quintable">
    <div class="header slot slot-header quintable--header">
      <slot name="header"></slot>
    </div>

    <search-bar>
      <template v-if="$scopedSlots['before-search']" v-slot:before-search>
        <slot name="before-search" />
      </template>
      <template v-if="$scopedSlots['search']" v-slot:search="scope">
        <slot name="search" v-bind="scope" />
      </template>
      <template v-if="$scopedSlots['after-search']" v-slot:after-search>
        <slot name="after-search" />
      </template>
    </search-bar>
    <div class="slot slot-after-search quintable--after-search-container">
      <slot name="after-search-container"></slot>
    </div>
    <div class="clearfix quintable--table-container" ref="height-wrapper">
      <table
        class="vue-quintable table quintable--table-container--table"
        :class="tableClasses"
        v-if="!ajaxLoading"
      >
        <table-header />

        <tbody
          @mouseleave="onMouseleaveTable"
          class="quintable--table-container--table--tbody"
        >
          <template v-for="rIndex in visibleRowIndexes">
            <tr
              v-if="rowsFinal[rIndex]"
              class="
                vue-quintable-row
                quintable--table-container--table--tbody--row
              "
              v-tooltip="{
                placement: 'top',
                content: rowsFinal[rIndex].tooltip,
                trigger: rowsFinal[rIndex].tooltip ? 'hover' : 'manual',
                offset: 5,
              }"
              :style="hiddenColumns[rIndex] > 0 ? 'cursor:pointer;' : ''"
              :ref="'row-highlighted-' + rIndex"
              @click="onRowClick($event, rIndex)"
              @auxclick="onRowAuxClick($event, rIndex)"
              @mousedown="onRowMousedown($event)"
              :class="rowClasses[rIndex]"
              :id="'vue-quintable-' + uuid + '-row-' + rIndex"
              @mouseenter="_hoverRow(rIndex, $event)"
              :key="'vue-quintable-' + uuid + '-row-' + rIndex"
            >
              <td
                class="
                  toggle toggle-td toggle-cell
                  quintable--table-container--table--tbody--row--toggle-td
                "
                v-if="hasGeneratedRows && !configFinal.hideRowToggle"
              >
                <span v-if="hiddenColumns[rIndex] > 0">
                  <span v-if="!openRows[rIndex]">
                    <font-awesome-icon
                      fixed-width
                      :icon="configFinal.collapsedRowIcon"
                    ></font-awesome-icon>
                  </span>
                  <span v-else>
                    <font-awesome-icon
                      fixed-width
                      :icon="configFinal.expandedRowIcon"
                    ></font-awesome-icon>
                  </span>
                </span>
              </td>
              <td
                v-if="
                  configFinal.select && configFinal.selectPosition === 'pre'
                "
                class="
                  select-td
                  pre
                  quintable--table-container--table--tbody--row--select-td
                  quintable--table-container--table--tbody--row--select-td--pre
                "
                :class="{
                  'disabled-select': rowsFinal[rIndex].disableSelect,
                }"
              >
                <select-checkbox
                  v-if="
                    !rowsFinal[rIndex].disableSelect ||
                    rowsFinal[rIndex].showDisabledSelect
                  "
                  :value="selected[rIndex]"
                  :pretty="configFinal.prettySelect"
                  :disabled="rowsFinal[rIndex].disableSelect"
                  @input="$set(selected, rIndex, $event)"
                  @change="checkListener($event, rIndex)"
                />
              </td>

              <template v-for="rc in _renderRows[rIndex]">
                <td
                  class="
                    vue-quintable-cell
                    quintable--table-container--table--tbody--row--cell
                  "
                  v-tooltip="{
                    placement: 'left',
                    content: rc.cell.tooltip,
                    trigger: rc.cell.tooltip ? 'hover' : 'manual',
                  }"
                  :class="rc.cls"
                  v-if="rc.vis"
                  @click="onCellClick($event, rc.cell)"
                  @auxclick="onCellAuxClick($event, rc.cell)"
                  @mousedown="onCellMousedown($event)"
                  :key="rc.key"
                  :id="rc.key"
                >
                  <slot name="cell-complete" :cell="rc.cell">
                    <slot name="cell-content" :cell="rc.cell">
                      <div
                        class="
                          cell-inner
                          quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html
                        "
                        v-if="rc.fmt && rc.fmt.type === 'html'"
                        v-html="rc.fmt.value"
                      ></div>
                      <div
                        class="
                          cell-inner
                          quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value
                        "
                        v-else-if="rc.fmt"
                      >
                        {{ rc.fmt.value }}
                      </div>
                      <div
                        class="
                          cell-inner
                          quintable--table-container--table--tbody--row--cell--inner-cell--html
                        "
                        v-else-if="
                          rc.cell.html != null && String(rc.cell.html) !== ''
                        "
                        v-html="rc.cell.html"
                      ></div>
                      <div
                        class="
                          cell-inner
                          quintable--table-container--table--tbody--row--cell--inner-cell--component
                        "
                        v-else-if="rc.cell.component"
                      >
                        <component
                          :is="rc.cell.component.name"
                          v-bind="rc.cell.component.props"
                          @action="handleComponentEvent"
                        ></component>
                      </div>
                      <div
                        class="
                          cell-inner
                          quintable--table-container--table--tbody--row--cell--inner-cell--text
                        "
                        v-else-if="
                          rc.cell.text != null && String(rc.cell.text) !== ''
                        "
                      >
                        {{ rc.cell.text }}
                      </div>
                    </slot>
                  </slot>
                </td>
              </template>

              <td
                v-if="
                  configFinal.select && configFinal.selectPosition === 'post'
                "
                class="
                  select-td
                  post
                  quintable--table-container--table--tbody--row--select-td
                  quintable--table-container--table--tbody--row--select-td--post
                "
                :class="{
                  'disabled-select': rowsFinal[rIndex].disableSelect,
                }"
              >
                <select-checkbox
                  v-if="
                    !rowsFinal[rIndex].disableSelect ||
                    rowsFinal[rIndex].showDisabledSelect
                  "
                  :value="selected[rIndex]"
                  :pretty="configFinal.prettySelect"
                  :disabled="rowsFinal[rIndex].disableSelect"
                  @input="$set(selected, rIndex, $event)"
                  @change="checkListener($event, rIndex)"
                />
              </td>
            </tr>
            <expanded-row
              v-if="
                (generatedRows[rIndex] || stickyRows[rIndex]) &&
                visibleRows[rIndex]
              "
              :r-index="rIndex"
              :key="'vue-quintable-' + uuid + '-expanded-' + rIndex"
            >
              <template
                v-if="$scopedSlots['generated-cell-complete']"
                v-slot:generated-cell-complete="{ cell }"
              >
                <slot name="generated-cell-complete" :cell="cell" />
              </template>
              <template
                v-if="$scopedSlots['generated-cell-content']"
                v-slot:generated-cell-content="{ cell }"
              >
                <slot name="generated-cell-content" :cell="cell" />
              </template>
              <template
                v-if="$scopedSlots['sticky-cell-complete']"
                v-slot:sticky-cell-complete="{ cell }"
              >
                <slot name="sticky-cell-complete" :cell="cell" />
              </template>
              <template
                v-if="$scopedSlots['sticky-cell-content']"
                v-slot:sticky-cell-content="{ cell }"
              >
                <slot name="sticky-cell-content" :cell="cell" />
              </template>
            </expanded-row>
          </template>
        </tbody>
      </table>

      <template v-if="noRows && !ajaxLoading">
        <div
          class="
            clearfix
            slot-no-results slot
            quintable--table-container--no-results
          "
        >
          <slot name="no-results">
            <div
              class="
                text-center
                p-3
                quintable--table-container--no-results--results
              "
            >
              <em v-html="configFinal.emptyPlaceholder"></em>
            </div>
          </slot>
          <hr />
        </div>
      </template>
    </div>

    <div v-if="ajaxLoading" class="slot-loading slot quintable--loading">
      <slot name="loading">
        <div
          class="loader-wrapper quintable--loading--loader-wrapper"
          :style="'height:' + loaderHeight + 'px;'"
        >
          <div
            class="
              loader
              text-center
              py-4
              quintable--loading--loader-wrapper--loader
            "
          >
            <font-awesome-icon
              icon="circle-notch"
              spin
              class="
                ajax-loader
                quintable--loading--loader-wrapper--loader--ajax-loader
              "
            />
          </div>
        </div>
      </slot>
    </div>

    <pagination-footer />
    <div class="footer slot slot-footer quintable--footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { getSharedBreakpoints } from "../utils/shared-breakpoints.js";

let _quintableIdCounter = 0;

import TableHeader from "./TableHeader.vue";
import SelectCheckbox from "./SelectCheckbox.vue";
import ExpandedRow from "./ExpandedRow.vue";
import PaginationFooter from "./PaginationFooter.vue";
import SearchBar from "./SearchBar.vue";
import configMixin from "../mixins/config.mixin.js";
import sortingMixin from "../mixins/sorting.mixin.js";
import filteringMixin from "../mixins/filtering.mixin.js";
import ajaxMixin from "../mixins/ajax.mixin.js";
import paginationMixin from "../mixins/pagination.mixin.js";
import selectionMixin from "../mixins/selection.mixin.js";
import eventsMixin from "../mixins/events.mixin.js";
import breakpointMixin from "../mixins/breakpoint.mixin.js";

export default {
  name: "VueQuintable",
  mixins: [
    configMixin,
    sortingMixin,
    filteringMixin,
    ajaxMixin,
    paginationMixin,
    selectionMixin,
    eventsMixin,
    breakpointMixin,
  ],
  components: {
    TableHeader,
    SelectCheckbox,
    ExpandedRow,
    PaginationFooter,
    SearchBar,
  },
  provide() {
    return {
      quintable: this,
    };
  },
  props: {
    rows: {
      type: Array,
      default() {
        return [];
      },
    },
    config: {
      type: Object,
      default() {
        return {};
      },
    },

    dynamicConfig: {
      type: Boolean,
      default: false,
    },

    value: {
      type: Array,
      default() {
        return [];
      },
    },
    selectedRows: {
      type: Array,
      default() {
        return [];
      },
    },
    preSelectedRows: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Object,
      default() {
        return {};
      },
    },
    filterGroups: {
      type: Array,
      default() {
        return [];
      },
    },
    verbose: {
      type: Boolean,
      default: false,
    },
    nested: {
      type: Boolean,
      default: false,
    },
    tableClasses: {
      type: String,
      default: "",
    },
    sortOrder: {
      type: Array,
      default() {
        return [];
      },
    },
    updated: {
      type: [Boolean, Object, Date],
      default: false,
    },
    axios: {
      type: Function,
    },
    identifier: {
      type: String,
      default: null,
    },
    initialSearchTerm: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      essentialsKey: Date.now(),
      generatedUpdatedKey: Date.now(),
      hoveredRow: null,
      openRows: {},
      query: "",
      customMultiSort: null,
      customPageSort: null,
      uuid: "qt-" + ++_quintableIdCounter + "-" + Date.now(),
      loaderHeight: 0,
      lastSearchQueryUpdated: null,
      storedState: {},
      activeRow: null,
    };
  },

  computed: {
    visibleRows() {
      if (!this.configFinal.ajaxUrl && this.currentRowsPerPage !== "All") {
        let visible = new Array(this.rowsFinal.length).fill(false);

        let onlyVisibleSortedRows = {};

        for (let index in this.sortedIndexes) {
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, index)) {
            if (this.filteredRows[this.sortedIndexes[index]]) {
              onlyVisibleSortedRows[index] = this.sortedIndexes[index];
            }
          }
        }

        let borderHigh = this.currentPage * this.currentRowsPerPage;
        let borderLow = borderHigh - this.currentRowsPerPage;

        let counter = 0;
        for (let index in onlyVisibleSortedRows) {
          if (
            Object.prototype.hasOwnProperty.call(onlyVisibleSortedRows, index)
          ) {
            index = parseInt(index);
            if (counter < borderHigh && counter >= borderLow) {
              visible[onlyVisibleSortedRows[index]] = true;
            }
            counter++;
          }
        }

        return visible;
      } else {
        return this.filteredRows;
      }
    },

    visibleRowIndexes() {
      let rows = [];
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        for (let i = 0; i < this.rowsFinal.length; i++) {
          rows.push(i);
        }
      } else {
        for (let i in this.sortedIndexes) {
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, i)) {
            if (this.visibleRows[this.sortedIndexes[i]]) {
              rows.push(this.sortedIndexes[i]);
            }
          }
        }
      }
      return rows;
    },

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
        })
      );
    },

    // Cache isColEmpty(j) results so it's computed once per column, not N times
    _colEmptyCache() {
      const cache = {};
      for (let j = 0; j < this.configFinal.number; j++) {
        cache[j] = this.isColEmpty(j);
      }
      return Object.freeze(cache);
    },

    // Pre-compute per-column hide status (shared by generatedRows, stickyRows, hiddenColumns)
    _colHideCache() {
      const cache = {};
      for (let j = 0; j < this.configFinal.columns.length; j++) {
        cache[j] =
          this.configFinal.hiddenCols[j] ||
          (!this.configFinal.ignoreEmpty[j] &&
            this.configFinal.hideEmptyColumns &&
            this._colEmptyCache[j]) ||
          this.emptyColumns[j];
      }
      return Object.freeze(cache);
    },

    // Pre-compute per-column base visibility for TableRow template
    cellVisible() {
      return Object.freeze(
        this.configFinal.columns.map((col, j) => {
          if (this.configFinal.hiddenCols[j]) return false;
          if (this.emptyColumns[j]) return false;
          if (!col) return false;
          if (this._colBreakpointMatch[j]) return false;
          if (this.configFinal.stickyCols[j]) return false;
          return true;
        })
      );
    },

    generatedRows() {
      let generatedRows = {};

      if (this.generatedUpdatedKey) {
        const colMatch = this._colBreakpointMatch;
        const colHide = this._colHideCache;
        const checkEmpty = this.configFinal.hideEmptyColumns;
        const indexes = this.visibleRowIndexes;

        for (let vi = 0; vi < indexes.length; vi++) {
          const x = indexes[vi];
          let cells = this.rowsFinal[x].cells
            ? this.rowsFinal[x].cells
            : this.rowsFinal[x];

          let generatedCells = {};

          for (let j = 0; j < this.configFinal.columns.length; j++) {
            if (!colMatch[j]) continue;
            let col = this.configFinal.columns[j];

            const hide =
              colHide[j] ||
              (checkEmpty &&
                !this.configFinal.ignoreEmpty[j] &&
                this.isColEmpty(j, x));

            if (!hide && !col.sticky && !col.alwaysExpanded) {
              generatedCells[j] = cells[j];
            }
          }
          generatedRows[x] = generatedCells;
        }
      }
      return generatedRows;
    },

    stickyRows() {
      let stickyRows = {};
      const colMatch = this._colBreakpointMatch;
      const colHide = this._colHideCache;
      const checkEmpty = this.configFinal.hideEmptyColumns;
      const indexes = this.visibleRowIndexes;

      for (let vi = 0; vi < indexes.length; vi++) {
        const x = indexes[vi];
        let cells = this.rowsFinal[x].cells
          ? this.rowsFinal[x].cells
          : this.rowsFinal[x];

        let stickyCells = {};

        for (let j = 0; j < this.configFinal.columns.length; j++) {
          let col = this.configFinal.columns[j];

          const hide =
            colHide[j] ||
            (checkEmpty &&
              !this.configFinal.ignoreEmpty[j] &&
              this.isColEmpty(j, x));

          if (!hide && col.sticky) {
            stickyCells[j] = cells[j];
          } else if (!hide && col.alwaysExpanded && colMatch[j]) {
            stickyCells[j] = cells[j];
          }
        }
        stickyRows[x] = stickyCells;
      }
      return stickyRows;
    },

    pageSort: {
      get() {
        if (this.customPageSort === null) {
          return this.configFinal.pageSort;
        }
        return this.customPageSort;
      },
      set(val) {
        this.customPageSort = val;
      },
    },

    multiSort: {
      get() {
        if (this.customMultiSort === null) {
          return this.configFinal.multiSort;
        }
        return this.customMultiSort;
      },
      set(val) {
        this.customMultiSort = val;
      },
    },

    hasGeneratedRows() {
      const colMatch = this._colBreakpointMatch;
      const colHide = this._colHideCache;
      for (let j = 0; j < this.configFinal.columns.length; j++) {
        if (colMatch[j] && !colHide[j]) {
          const col = this.configFinal.columns[j];
          if (!col.sticky && !col.alwaysExpanded) {
            return true;
          }
        }
      }
      return false;
    },

    cellClassesParsed() {
      let cellClasses = {};

      // Only compute for visible rows — these are the only ones accessed in templates
      const indexes =
        this.visibleRowIndexes.length > 0
          ? this.visibleRowIndexes
          : Object.keys(this.rowsFinal).map(Number);

      for (let x = 0; x < indexes.length; x++) {
        const i = indexes[x];
        if (!this.rowsFinal[i]) continue;
        cellClasses[i] = [];

        let rAlign = this.rowsFinal[i].align;

        let cells = this.rowsFinal[i].cells
          ? this.rowsFinal[i].cells
          : this.rowsFinal[i];

        for (let j = 0; j < cells.length; j++) {
          let classes = [];

          let colAlign = this.configFinal.alignments[j];

          if (cells[j].align || rAlign || colAlign) {
            if (cells[j].align) {
              classes.push("text-" + cells[j].align);
            } else if (rAlign) {
              classes.push("text-" + rAlign);
            } else {
              classes.push("text-" + colAlign);
            }
          }

          if (cells[j].classes) {
            let splitted = cells[j].classes.split(" ");
            Array.prototype.push.apply(classes, splitted);
          }

          cellClasses[i].push(classes.join(" "));
        }
      }

      return cellClasses;
    },

    hiddenColumns() {
      // Fast path: check once if ANY breakpoint column is visible (not hidden)
      const colMatch = this._colBreakpointMatch;
      const colHide = this._colHideCache;
      let anyVisible = false;

      for (let j = 0; j < this.configFinal.columns.length; j++) {
        if (colMatch[j] && !colHide[j]) {
          anyVisible = true;
          break;
        }
      }

      const rows = {};
      if (anyVisible) {
        // At least one breakpoint column is visible for all rows
        for (let x = 0; x < this.visibleRowIndexes.length; x++) {
          rows[this.visibleRowIndexes[x]] = 1;
        }
      } else if (this.configFinal.hideEmptyColumns) {
        // Need per-row check only when hideEmptyColumns is active
        for (let x = 0; x < this.visibleRowIndexes.length; x++) {
          let hidden = 0;
          const rowIndex = this.visibleRowIndexes[x];

          for (let j = 0; j < this.configFinal.columns.length; j++) {
            if (!colMatch[j]) continue;

            const hide =
              colHide[j] ||
              (!this.configFinal.ignoreEmpty[j] &&
                this.isColEmpty(j, rowIndex));

            if (!hide) {
              hidden++;
              break;
            }
          }

          rows[rowIndex] = hidden;
        }
      } else {
        for (let x = 0; x < this.visibleRowIndexes.length; x++) {
          rows[this.visibleRowIndexes[x]] = 0;
        }
      }

      return rows;
    },

    rowsFinal() {
      return this.configFinal.ajaxUrl
        ? this.ajaxRows
        : this.rows
        ? this.rows
        : [];
    },

    headerClass() {
      let classes = [];

      for (let i = 0; i < this.configFinal.number; i++) {
        let iClasses = [];
        if (this.configFinal.alignments[i]) {
          iClasses.push("text-" + this.configFinal.alignments[i]);
        }

        if (this.configFinal.sorts[i]) {
          iClasses.push("sort-header");

          if (this.currentSortIndexes[i]) {
            iClasses.push("active");
          }
        }

        classes.push(
          iClasses.join(" ") +
            "  quintable--table-container--table--header-row--th " +
            this.configFinal.columnClasses[i]
        );
      }
      return Object.freeze(classes);
    },

    showHeadlines() {
      const bpSet = this._hiddenBreakpointSet;
      let shows = [];

      for (let i = 0; i < this.configFinal.number; i++) {
        const col = this.configFinal.columns[i];
        if (
          this.configFinal.headlines[i] &&
          (!col.showHeadlineBreakpoint ||
            (col.showHeadlineBreakpoint &&
              bpSet.has(col.showHeadlineBreakpoint))) &&
          (!col.hideHeadlineBreakpoint ||
            (col.hideHeadlineBreakpoint &&
              !bpSet.has(col.hideHeadlineBreakpoint)))
        ) {
          shows.push(true);
        } else {
          shows.push(false);
        }
      }
      return Object.freeze(shows);
    },

    emptyColumns() {
      const cols = {};
      const colEmptyCache = this._colEmptyCache;
      const ignore = this.configFinal.ignoreSortEmptyColumns;

      for (let i = 0; i < this.configFinal.number; i++) {
        const ignoredCol = this.configFinal.ignoreEmpty[i];
        const sort = this.configFinal.sorts[i];

        if (
          !this.configFinal.hideEmptyColumns ||
          ignoredCol ||
          (ignore === "none" && sort) ||
          (ignore === "active" &&
            Object.prototype.hasOwnProperty.call(this.currentSortIndexes, i))
        ) {
          cols[i] = false;
        } else {
          cols[i] = colEmptyCache[i];
        }
      }

      return cols;
    },

    rowClasses() {
      const allRowclasses = {};
      for (let x = 0; x < this.visibleRowIndexes.length; x++) {
        const rIndex = this.visibleRowIndexes[x];

        const rowClasses = [];
        if (this.rowsFinal[rIndex].classes) {
          rowClasses.push(this.rowsFinal[rIndex].classes);
        }

        if (this.openRows[rIndex]) {
          rowClasses.push("row-expanded");
        }

        if (this.hiddenColumns[rIndex] > 0 && !this.openRows[rIndex]) {
          rowClasses.push("row-collapsed");
        }

        allRowclasses[rIndex] = rowClasses.join(" ");
      }

      return allRowclasses;
    },

    _fmtCells() {
      const map = {};
      const cols = this.configFinal.columns;
      for (let x = 0; x < this.visibleRowIndexes.length; x++) {
        const rIndex = this.visibleRowIndexes[x];
        const row = this.rowsFinal[rIndex];
        if (!row) continue;
        const cells = row.cells ? row.cells : row;
        let hasAny = false;
        const rowMap = {};
        for (let i = 0; i < cells.length; i++) {
          if (cols[i] && cols[i].cellFormatter) {
            rowMap[i] = this.cellFormatters(i, cells[i]);
            hasAny = true;
          }
        }
        if (hasAny) map[rIndex] = rowMap;
      }
      return map;
    },

    _renderRows() {
      const map = {};
      const colClasses = this.configFinal.columnClasses;
      const cellVis = this.cellVisible;
      const cellCls = this.cellClassesParsed;
      const fmtCells = this._fmtCells;
      const uid = this.uuid;
      for (let x = 0; x < this.visibleRowIndexes.length; x++) {
        const rIndex = this.visibleRowIndexes[x];
        const row = this.rowsFinal[rIndex];
        if (!row) continue;
        const cells = row.cells ? row.cells : row;
        const prefix = "vue-quintable-" + uid + "-cell-" + rIndex + "-";
        const rowCls = cellCls[rIndex];
        const rowFmt = fmtCells[rIndex];
        const arr = [];
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          arr.push(
            Object.freeze({
              cell: cell,
              cls:
                (rowCls ? rowCls[i] || "" : "") + " " + (colClasses[i] || ""),
              vis: !!(cellVis[i] && cell),
              fmt: rowFmt ? rowFmt[i] || null : null,
              key: prefix + i,
            })
          );
        }
        map[rIndex] = Object.freeze(arr);
      }
      return map;
    },

    // O(1) lookup map: rowIndex → position in visibleRowIndexes
    _visibleRowIndexMap() {
      const map = {};
      for (let i = 0; i < this.visibleRowIndexes.length; i++) {
        map[this.visibleRowIndexes[i]] = i;
      }
      return map;
    },
  },

  watch: {
    rowsFinal: {
      handler(val) {
        if (!this.verbose) return;
        if (val && val.length) {
          for (let i = 0; i < val.length; i++) {
            let cells = val[i].cells ? val[i].cells : val[i];
            if (cells.length !== this.config.columns.length) {
              console.error(
                `Column count on row index ${i} doesn't fit for column config! expected: ${this.config.columns.length}, got: ${cells.length}` +
                  (this.configFinal.ajaxUrl
                    ? ` | URL: ${this.configFinal.ajaxUrl}`
                    : "") +
                  (this.identifier ? ` | IDENTIFIER: ${this.identifier}` : ""),
                val[i]
              );
            }
          }
        }
      },
      immediate: true,
    },

    hoveredRow(val) {
      if (val !== null) {
        this.$emit("hover:row", this.rowsFinal[val], "hover:row");
      }
    },

    query(val, old) {
      this.lastQuery = old;

      if (this.configFinal.ajaxUrl) {
        this.pageSort = false;
        const clear = !(this.configFinal.storeState && this.storedState.query);
        clearTimeout(this.queryAjaxTimeout);
        this.queryAjaxTimeout = setTimeout(() => {
          this.loadViaAjax(clear, clear, "QUERY");
        }, this.configFinal.ajaxRequestDelay);
      }

      if (
        val.length >= this.configFinal.searchLength &&
        this.lastSearchQueryUpdated !== val
      ) {
        this.$emit("update:search", val, "update:search");
        this.lastSearchQueryUpdated = val;
      } else if (this.lastSearchQueryUpdated !== null) {
        this.lastSearchQueryUpdated = null;
        this.$emit("update:search", null, "update:search");
      }

      if (this.pageSort) {
        this.currentSortIndexes = {};
        this.resetSorts();
        this.recomputeEssentials();
      }

      if (this.configFinal.storeState) {
        this.$delete(this.storedState, "query");
        localStorage.setItem(
          `vue-quintable-${this.identifier}-query`,
          this.query
        );
      }
    },

    rows() {
      this.clearLists();
      this.initLists();

      this.activeRow = null;

      this.$nextTick(() => {
        this.recomputeEssentials();

        if (this.configFinal.defaultSelected) {
          this.allSelectedCustom = null;
          this.checkAll(true);
        }
      });
    },

    config(val) {
      if (typeof val !== "object") {
        throw "config must be an object";
      }

      if (this.dynamicConfig) {
        return;
      }

      this.initLists();

      this.activeRow = null;

      if (this.configFinal.ajaxUrl) {
        this.loadViaAjax(false, true, "CONFIG");
      }

      if (this.configFinal.defaultSelected) {
        this.checkAll(true);
      }
    },

    activeRow(val, oldVal) {
      const activeClass = this.configFinal.activeClass;
      if (activeClass) {
        if (oldVal !== null) {
          const oldRefs = this.$refs["row-highlighted-" + oldVal];
          const oldEl =
            oldRefs && (Array.isArray(oldRefs) ? oldRefs[0] : oldRefs);
          if (oldEl) oldEl.classList.remove(activeClass);
        }
        if (val !== null) {
          const newRefs = this.$refs["row-highlighted-" + val];
          const newEl =
            newRefs && (Array.isArray(newRefs) ? newRefs[0] : newRefs);
          if (newEl) newEl.classList.add(activeClass);
        }
      }
      const realIndex =
        val !== null && this._visibleRowIndexMap[val] !== undefined
          ? this._visibleRowIndexMap[val]
          : -1;
      this.$emit("active:row", this.rowsFinal[val], "active:row", realIndex);
    },
  },
  methods: {
    setSearchQuery(query) {
      this.query = query;
    },

    valueToString: function (value) {
      switch (value) {
        case "":
        case null:
        case false:
        case undefined:
          return "";
        case 0:
        case "0":
        default:
          return String(value);
      }
    },

    isColEmpty(i, rowIndex = -1) {
      const rowIndexes = rowIndex > -1 ? [rowIndex] : this.visibleRowIndexes;
      for (let k = 0; k < rowIndexes.length; k++) {
        const row = this.rowsFinal[rowIndexes[k]];
        if (!row) continue;
        const cells = row.cells ? row.cells : row;
        const cell = cells[i];

        if (!cell) continue;

        if (typeof cell.isEmpty === "boolean") {
          if (!cell.isEmpty) return false; // cell explicitly not empty
          continue; // cell explicitly empty, check next
        }

        if (
          (typeof cell.text !== "undefined" && this.valueToString(cell.text)) ||
          (typeof cell.html !== "undefined" && this.valueToString(cell.html))
        ) {
          return false; // found non-empty cell
        }
      }
      return true; // all cells empty
    },

    cellFormatters(cIndex, cell) {
      if (
        typeof this.configFinal.columns[cIndex].cellFormatter === "function"
      ) {
        let formatted = this.configFinal.columns[cIndex].cellFormatter(cell);

        if (typeof formatted !== "object") {
          formatted = {
            value: formatted,
          };
        }

        return formatted;
      }

      return this.valueToString(cell.html)
        ? cell.html
        : this.valueToString(cell.text)
        ? cell.text
        : "";
    },

    _rowCells(rIndex) {
      const row = this.rowsFinal[rIndex];
      if (!row) return [];
      return row.cells ? row.cells : row;
    },

    _hoverRow(rIndex, event) {
      if (this.hoveredRow !== rIndex) {
        const hoverClass = this.configFinal.hoverClass;
        if (hoverClass && this._lastHoveredEl) {
          this._lastHoveredEl.classList.remove(hoverClass);
        }
        this.hoveredRow = rIndex;
        if (hoverClass && event && event.currentTarget) {
          event.currentTarget.classList.add(hoverClass);
          this._lastHoveredEl = event.currentTarget;
        }
      }
    },

    recomputeEssentials() {
      this.$nextTick(() => {
        const now = Date.now();
        this.essentialsKey = now;
        this.generatedUpdatedKey = now;
      });
    },

    initLists() {
      if (!this.rowsFinal) {
        return;
      }

      for (let i = 0; i < this.rowsFinal.length; i++) {
        const index = i.toString();

        if (typeof this.sortedIndexes[index] === "undefined") {
          this.$set(this.sortedIndexes, index, i);
        }

        if (typeof this.selected[index] === "undefined") {
          this.$set(this.selected, index, false);
        }

        if (this.configFinal.expandedAll || this.rowsFinal[i].expanded) {
          this.$set(this.openRows, index, true);
        } else {
          this.$set(this.openRows, index, false);
        }
      }
    },

    clearLists(clearSelected = true) {
      if (clearSelected) {
        this.selected = {};
      }
      this.openRows = {};
      this.sortedIndexes = {};
    },

    checkKey(event) {
      if (this.activeRow === null) {
        return;
      }
      if (event.keyCode === 40) {
        event.preventDefault();
        const realCurrentIndex = this._visibleRowIndexMap[this.activeRow];
        if (
          realCurrentIndex === undefined ||
          realCurrentIndex === this.visibleRowIndexes.length - 1
        ) {
          this.activeRow = 0;
        } else {
          this.activeRow = this.visibleRowIndexes[realCurrentIndex + 1];
        }
      }
      if (event.keyCode === 38) {
        event.preventDefault();
        const realCurrentIndex = this._visibleRowIndexMap[this.activeRow];
        if (realCurrentIndex === undefined || realCurrentIndex === 0) {
          this.activeRow =
            this.visibleRowIndexes[this.visibleRowIndexes.length - 1];
        } else {
          this.activeRow = this.visibleRowIndexes[realCurrentIndex - 1];
        }
      }
    },
  },
  created() {
    this._lastHoveredEl = null;
    if (this.configFinal.storeState) {
      const filters = localStorage.getItem(
        `vue-quintable-${this.identifier}-filters`
      );

      if (filters) {
        const storedFilters = JSON.parse(filters);

        //merge new filters into stored filters
        for (let key in this.filters) {
          if (
            Object.prototype.hasOwnProperty.call(this.filters, key) &&
            !Object.prototype.hasOwnProperty.call(storedFilters, key)
          ) {
            storedFilters[key] = this.filters[key];
          }
        }

        this.$set(this.storedState, "filters", storedFilters);
      }

      const query = localStorage.getItem(
        `vue-quintable-${this.identifier}-query`
      );
      if (query) {
        this.$set(this.storedState, "query", query);
      }

      const rowsPerPage = localStorage.getItem(
        `vue-quintable-${this.identifier}-rows-per-page`
      );
      if (rowsPerPage) {
        this.$set(this.storedState, "rows-per-page", parseInt(rowsPerPage));
      }

      const selectedRows = localStorage.getItem(
        `vue-quintable-${this.identifier}-selected-rows`
      );
      if (selectedRows) {
        this.$set(this.storedState, "selected-rows", JSON.parse(selectedRows));
      }

      const page = localStorage.getItem(
        `vue-quintable-${this.identifier}-current-page`
      );
      if (page) {
        this.$set(this.storedState, "current-page", parseInt(page));
      }

      const sortIndexes = localStorage.getItem(
        `vue-quintable-${this.identifier}-sort-indexes`
      );
      if (sortIndexes) {
        this.$set(this.storedState, "sort-indexes", JSON.parse(sortIndexes));
      }
    }
    this.initLists();

    //Pre-select rows in case
    let counter = 0;

    const indexes = this.configFinal.selectAllRows
      ? this.rowsFinal.map((x, i) => i)
      : this.visibleRowIndexes;
    for (let i = 0; i < indexes.length; i++) {
      let row = this.rowsFinal[i];
      if (row.selected) {
        this.$set(this.selected, i, true);
      }
      if (row.selected) {
        counter++;
      }
    }

    if (!this.configFinal.selectAllRows && counter) {
      let selectableCount = 0;
      for (let j = 0; j < this.rowsFinal.length; j++) {
        if (
          !this.rowsFinal[j].disableSelect &&
          this.visibleRows[this.sortedIndexes[j]]
        ) {
          selectableCount++;
        }
      }
      if (counter === selectableCount) {
        this.allSelectedCustom = true;
      }
    } else if (this.configFinal.selectAllRows && counter) {
      let selectableCount = 0;
      for (let j = 0; j < this.rowsFinal.length; j++) {
        if (!this.rowsFinal[j].disableSelect) selectableCount++;
      }
      if (counter === selectableCount) {
        this.allSelectedCustom = true;
      }
    }

    if (this.initialSearchTerm) {
      this.query = this.initialSearchTerm;
    }

    if (this.storedState.query) {
      this.query = this.storedState.query;
    }

    if (this.storedState["rows-per-page"]) {
      this.customRowsPerPage = this.storedState["rows-per-page"];
    }

    if (this.storedState["sort-indexes"]) {
      this.currentSortIndexes = this.storedState["sort-indexes"];
      this.sort(true);
    }

    if (this.storedState["current-page"]) {
      this.$nextTick(() => {
        this.currentPage = this.storedState["current-page"];
      });
    }
    this.$nextTick(this.checkStoredSelectedRows);

    if (this.configFinal.enableRowTabIndex) {
      document.addEventListener("keydown", this.checkKey);
    }
  },
  mounted() {
    if (this.configFinal.ajaxUrl) {
      this.loadViaAjax(false, true, "MOUNTED");
    }

    if (this.configFinal.defaultSelected) {
      this.checkAll(true);
    }

    // Subscribe to shared breakpoint detector
    this._sharedBP = getSharedBreakpoints();
    this._sharedBP.subscribe(this._onBreakpointChange);
  },
  beforeDestroy() {
    if (this._sharedBP) {
      this._sharedBP.unsubscribe(this._onBreakpointChange);
    }
    if (this.configFinal.enableRowTabIndex) {
      document.removeEventListener("keydown", this.checkKey);
    }
  },
};
</script>

<style scoped>
/* Rules targeting child component elements need ::v-deep to pierce scoped boundary */
::v-deep table.generated-table td {
  vertical-align: top;
}

::v-deep .generated-cell-element {
  padding: 0.5rem 0.5rem;
}

::v-deep .toggle-cell {
  width: 0;
  white-space: nowrap;
  padding: 0.5rem 0.5rem;
}

::v-deep .toggle-cell.invisible > span {
  pointer-events: none;
  opacity: 0;
}

::v-deep .cursor-pointer {
  cursor: pointer;
}
::v-deep .icon-check {
  padding: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.loader-wrapper {
  position: relative;
  min-height: 100px;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

/* Hover/active background — scoped to row elements only, not arbitrary children */
::v-deep .vue-quintable-row.bg-muted,
::v-deep .generated-row > td > div.bg-muted {
  background: rgba(0, 0, 0, 0.1);
}

::v-deep .select-th .pretty,
::v-deep .select-td .pretty {
  background: #fff;
  margin-right: 0 !important;
  width: 18px;
}

.footer {
  height: auto;
  background-color: transparent;
}

::v-deep .table th {
  border-top: none;
}

::v-deep .sort-header {
  cursor: pointer;
  position: relative;
}

::v-deep .sort-header:hover {
  padding-right: 20px !important;
}

::v-deep .sort-header.active {
  padding-right: 45px !important;
}

::v-deep .sort-header .sorting-icon {
  position: absolute;
  right: 5px;
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
}

::v-deep .sort-header.active .sorting-icon,
::v-deep .sort-header:hover .sorting-icon {
  opacity: 1;
}

.ajax-loader {
  font-size: 3em;
}

::v-deep .generated-cell-element-content {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

/*.generated-row-cell:nth-child(odd) {*/
/*  background: rgba(255, 255, 0, 0.1);*/
/*}*/

/*.generated-row-cell:nth-child(even) {*/
/*  background: rgba(100, 100, 0, 0.1);*/
/*}*/

/*.generated-row-cell:nth-child(odd).hovered,*/
/*.generated-row-cell:nth-child(even).hovered{*/
/*	background:none;*/
/*}*/

::v-deep .generated-row table tr:first-child td {
  border-top: none;
}

::v-deep .quintable-sub-table {
  text-align: left;
}

::v-deep nav.disabled {
  pointer-events: none;
  opacity: 0.75;
}
</style>

<style>
.tooltip-arrow {
  z-index: 1;
}

.quintable-tooltip {
  display: block !important;
  z-index: 10000;
}

.quintable-tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 4px;
  padding: 5px 10px 4px;
}

.quintable-tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.quintable-tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.quintable-tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.quintable-tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.quintable-tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.quintable-tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.quintable-tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.quintable-tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.quintable-tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.quintable-tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
}

.quintable-tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.quintable-tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.quintable-tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
