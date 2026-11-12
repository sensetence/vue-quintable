// Sorting: the active sort columns and the order of the rows (see sort.ts).
// Part of VueQuintable (src/components/table/vue-quintable.vue), as src/mixins/sorting.mixin.js is in v2. Its
// watchers stay in the component: the order watchers are created in decides the order of the events they emit.

import { sortRows } from "../components/table/sort";
import { setIfChanged, withUpdates } from "../components/table/helpers";

export default {
  computed: {
    /**
     * Calculates the number of active sorts
     *
     */
    numberOfSorts() {
      return Object.keys(this.currentSortIndexes).length;
    },

    /**
     * Calculates columns which can be sorted from config value
     *
     */
    sortingColumns() {
      const columns = {};
      for (const index in this.currentSortIndexes) {
        columns[index] = this.configFinal.columns[index];
      }
      return columns;
    },

    // accessible: a sortable heading can take focus and says how its column is sorted.
    _headerA11y() {
      return this.configFinal.headlines.map((headline, index) => {
        if (!this.configFinal.sorts[index]) {
          return {};
        }
        const sort = this.currentSortIndexes[index];
        return {
          tabindex: 0,
          "aria-sort": sort ? (sort.asc ? "ascending" : "descending") : "none",
        };
      });
    },

    /**
     * Checks if page sort is currently active. Special case: no user action in place
     *
     */
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
  },
  methods: {
    /**
     *
     *
     * @param index Index of removed sorting column
     */
    removeSort(index) {
      for (const i in this.currentSortIndexes) {
        const item = this.currentSortIndexes[i];
        if (item.order > this.currentSortIndexes[index].order) {
          item.order--;
        }
        this.currentSortIndexes[i] = item;
      }
      delete this.currentSortIndexes[index];

      if (this.numberOfSorts !== 0) {
        this.sort();
        return;
      }

      this.resetSorts();
      if (this.currentPage !== 1) {
        this.currentPage = 1;
      } else {
        this.recomputeEssentials();
      }

      if (this.configFinal.ajaxUrl && !this.pageSort) {
        this.loadViaAjax(true, true, "SORT");
      }
    },

    resetSorts() {
      const updates = new Map();
      for (let i = 0, n = this.rowsFinal.length; i < n; i++) {
        updates.set(i.toString(), i);
      }
      const next = withUpdates(this.sortedIndexes, updates);
      if (next) {
        this.sortedIndexes = next;
      }
    },

    /**
     * Add a column to the sorting or change the sort direction of set sorting column
     *
     * @param sortIndex the column
     * @param asc bool if it shall be set to a direction
     */
    setSortColumn(sortIndex, asc) {
      const i = parseInt(sortIndex);
      const index = sortIndex.toString();

      if (!this.configFinal.sorts[i]) {
        return;
      }

      let item;

      if (!this.currentSortIndexes[index]) {
        if (!this.multiSort) {
          this.currentSortIndexes = {};
        }

        item = {
          headline: this.configFinal.headlines[i],
          index: i,
          asc:
            this.configFinal.sorts[i] === true ||
            this.configFinal.sorts[i] === "ASC",
          order: this.numberOfSorts,
        };
      } else {
        item = this.currentSortIndexes[index];
        item.asc = !item.asc;
      }

      if (typeof asc !== "undefined") {
        item.asc = asc;
      }

      this.currentSortIndexes[i] = item;

      if (this.configFinal.storeState) {
        localStorage.setItem(
          `vue-quintable-${this.identifier}-sort-indexes`,
          JSON.stringify(this.currentSortIndexes),
        );
      }

      this.$emit("update:sort", this.currentSortIndexes, "update:sort");

      this.sort();
    },

    // sort-icon slot: "asc", "desc" or null for an unsorted column.
    _sortDirection(index) {
      const sort = this.currentSortIndexes[index];
      return sort ? (sort.asc ? "asc" : "desc") : null;
    },

    /**
     * The actual sorting process. Sort by sorting value or the inner text/html of the cells
     *
     */
    sort(preventReset = false) {
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        this.loadViaAjax(!preventReset, !preventReset, "SORT");
        return;
      }

      const pageSort = this.pageSort;
      const pagination = this.configFinal.pagination;
      const allRows = this.rowsFinal.slice();
      let rows = [];
      let visibleIndexes = null;
      let sortedIndexesBefore = {};

      if (pageSort) {
        // Page sort: only the first page's worth of the visible rows is sorted, the others keep their places.
        visibleIndexes = new Set(this.visibleRowIndexes);
        if (!visibleIndexes.size) {
          const length = pagination ? pagination : this.rowsFinal.length;
          for (let i = 0; i < length; i++) {
            visibleIndexes.add(i);
          }
        }

        let counter = 0;
        for (let i = 0; i < allRows.length; i++) {
          setIfChanged(allRows[i], "index", i);
          if (visibleIndexes.has(i)) {
            if (counter < pagination) {
              rows.push(allRows[i]);
            }
            counter++;
          }
        }

        if (Object.keys(this.sortedIndexes).length) {
          sortedIndexesBefore = { ...this.sortedIndexes };
        } else {
          for (let i = 0; i < allRows.length; i++) {
            sortedIndexesBefore[i.toString()] = i;
          }
        }
      } else {
        // allRows serves for its length only from here on: sort that copy.
        rows = allRows;
        for (let i = 0; i < rows.length; i++) {
          setIfChanged(rows[i], "index", i);
        }
      }

      // The sort keys by their order. (Their index becomes the column's string key, as it always has.)
      const keys = [];
      for (const index in this.currentSortIndexes) {
        const key = this.currentSortIndexes[index];
        key.index = index;
        keys.push(key);
      }
      keys.sort((a, b) => a.order - b.order);

      sortRows(rows, keys, this.currentSortIndexes);

      let counterRows = 0;
      let counterAdded = 0;
      const updates = new Map();
      for (let i = 0; i < allRows.length; i++) {
        let row;
        if (pageSort && visibleIndexes.has(i)) {
          row =
            counterRows < pagination
              ? rows[counterAdded++]
              : allRows[sortedIndexesBefore[i.toString()]];
          counterRows++;
        } else if (pageSort) {
          row = allRows[sortedIndexesBefore[i.toString()]];
        } else {
          row = rows[i];
        }
        updates.set(i.toString(), parseInt(row.index));
      }
      const next = withUpdates(this.sortedIndexes, updates);
      if (next) {
        this.sortedIndexes = next;
      }

      if (!pageSort && !preventReset) {
        this.currentPage = 1;
      }

      if (
        !this.configFinal.selectAllRows &&
        !pageSort &&
        !preventReset &&
        !this.configFinal.keepSelect
      ) {
        this.resetSelect("sort method");
      }

      this.recomputeEssentials();
    },
  },
};
