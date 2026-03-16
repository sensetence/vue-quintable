export default {
  data() {
    return {
      sortedIndexes: {},
      currentSortIndexes: {},
    };
  },
  computed: {
    numberOfSorts() {
      return Object.keys(this.currentSortIndexes).length;
    },

    sortingColumns() {
      let columns = {};

      for (let index in this.currentSortIndexes) {
        if (
          Object.prototype.hasOwnProperty.call(this.currentSortIndexes, index)
        ) {
          columns[index] = this.configFinal.columns[index];
        }
      }

      return columns;
    },
  },
  watch: {
    pageSort() {
      this.currentSortIndexes = {};
      this.resetSorts();
      this.recomputeEssentials();
    },

    customMultiSort(val) {
      if (!val && Object.keys(this.currentSortIndexes).length > 1) {
        let currentItem;
        let currentIndex;
        for (let index in this.currentSortIndexes) {
          if (
            Object.prototype.hasOwnProperty.call(
              this.currentSortIndexes,
              index
            ) &&
            this.currentSortIndexes[index].order === 0
          ) {
            currentItem = this.currentSortIndexes[index];
            currentIndex = index;
            break;
          }
        }

        this.currentSortIndexes = {};
        this.$set(this.currentSortIndexes, currentIndex, currentItem);

        this.sort();
      }
    },

    sortOrder: {
      immediate: true,
      handler() {
        this.currentSortIndexes = {};
        for (let i = 0; i < this.sortOrder.length; i++) {
          if (typeof this.sortOrder[i] === "object") {
            this.setSortColumn(this.sortOrder[i].index, this.sortOrder[i].asc);
          } else if (typeof this.sortOrder[i] === "number") {
            this.setSortColumn(this.sortOrder[i]);
          }
        }
      },
    },
  },
  methods: {
    removeSort(index) {
      for (let i in this.currentSortIndexes) {
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, i)) {
          let item = this.currentSortIndexes[i];
          if (item.order > this.currentSortIndexes[index].order) {
            item.order--;
          }
          this.$set(this.currentSortIndexes, i, item);
        }
      }
      this.$delete(this.currentSortIndexes, index);

      if (this.numberOfSorts === 0) {
        this.resetSorts();
        if (this.currentPage !== 1) {
          this.currentPage = 1;
        } else {
          this.recomputeEssentials();
        }

        if (this.configFinal.ajaxUrl && !this.pageSort) {
          this.loadViaAjax(true, true, "SORT");
        }
      } else {
        this.sort();
      }
    },

    resetSorts() {
      for (let i = 0; i < this.rowsFinal.length; i++) {
        const index = i.toString();
        this.$set(this.sortedIndexes, index, i);
      }
    },

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
            this.configFinal.sorts[i] === true
              ? true
              : this.configFinal.sorts[i] === "ASC",
          order: this.numberOfSorts,
        };
      } else {
        item = this.currentSortIndexes[index];
        item.asc = !item.asc;
      }

      if (typeof asc !== "undefined") {
        item.asc = asc;
      }

      this.$set(this.currentSortIndexes, index, item);

      if (this.configFinal.storeState) {
        localStorage.setItem(
          `vue-quintable-${this.identifier}-sort-indexes`,
          JSON.stringify(this.currentSortIndexes)
        );
      }

      this.$emit("update:sort", this.currentSortIndexes, "update:sort");

      this.sort();
    },

    sort(preventReset = false) {
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        this.loadViaAjax(!preventReset, !preventReset, "SORT");
        return;
      }

      let allRows = this.rowsFinal.slice();
      let rows = [];
      let visibleIndexes = [];
      let sortedIndexesBefore = {};

      if (this.pageSort) {
        visibleIndexes = this.visibleRowIndexes.slice();

        if (!visibleIndexes.length) {
          const length = this.configFinal.pagination
            ? this.configFinal.pagination
            : this.rowsFinal.length;
          for (let i = 0; i < length; i++) {
            visibleIndexes.push(i);
          }
        }

        let counter = 0;
        for (let i = 0; i < allRows.length; i++) {
          allRows[i].index = i;
          if (visibleIndexes.indexOf(i) !== -1) {
            if (counter < this.configFinal.pagination) {
              rows.push(allRows[i]);
            }
            counter++;
          }
        }

        if (Object.keys(this.sortedIndexes).length) {
          sortedIndexesBefore = Object.assign({}, this.sortedIndexes);
        } else {
          for (let i = 0; i < allRows.length; i++) {
            this.$set(sortedIndexesBefore, i.toString(), i);
          }
        }
      } else {
        rows = this.rowsFinal.slice();
        for (let i = 0; i < rows.length; i++) {
          rows[i].index = i;
        }
      }

      let sortableIndexes = [];
      for (let index in this.currentSortIndexes) {
        if (
          Object.prototype.hasOwnProperty.call(this.currentSortIndexes, index)
        ) {
          let data = this.currentSortIndexes[index];
          data.index = index;
          sortableIndexes.push(data);
        }
      }

      sortableIndexes.sort(function (a, b) {
        return a.order - b.order;
      });

      let compare = (a, b, keys, index) => {
        index = index || 0;

        let currentKey = keys[index];

        let i = currentKey.index;

        let cellsA = a.cells ? a.cells : a;
        let cellsB = b.cells ? b.cells : b;

        let aValue =
          typeof cellsA[i].sortValue !== "undefined" &&
          cellsA[i].sortValue !== null
            ? cellsA[i].sortValue
            : cellsA[i].html
            ? cellsA[i].html
            : cellsA[i].text;

        if (typeof cellsA[i].computeSortValue === "function") {
          aValue = cellsA[i].computeSortValue(this.currentSortIndexes);
        }

        let bValue =
          typeof cellsB[i].sortValue !== "undefined" &&
          cellsB[i].sortValue !== null
            ? cellsB[i].sortValue
            : cellsB[i].html
            ? cellsB[i].html
            : cellsB[i].text;

        if (typeof cellsB[i].computeSortValue === "function") {
          bValue = cellsB[i].computeSortValue(this.currentSortIndexes);
        }

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
        }

        if (typeof bValue === "string") {
          bValue = bValue.toLowerCase();
        }

        if (!isNaN(aValue)) {
          aValue = parseFloat(aValue);
        } else if (typeof aValue === "string" && aValue.match(/^-?\d+$/)) {
          aValue = parseFloat(aValue);
        } else if (typeof aValue === "string" && aValue.match(/^\d+\.\d+$/)) {
          aValue = parseFloat(aValue);
        }

        if (!isNaN(bValue)) {
          bValue = parseFloat(bValue);
        } else if (typeof bValue === "string" && bValue.match(/^-?\d+$/)) {
          bValue = parseFloat(bValue);
        } else if (typeof bValue === "string" && bValue.match(/^\d+\.\d+$/)) {
          bValue = parseFloat(bValue);
        }

        if (currentKey.asc) {
          return aValue > bValue
            ? 1
            : aValue < bValue
            ? -1
            : keys[index + 1]
            ? compare(a, b, keys, index + 1)
            : 1;
        } else {
          return aValue < bValue
            ? 1
            : aValue > bValue
            ? -1
            : keys[index + 1]
            ? compare(a, b, keys, index + 1)
            : -1;
        }
      };

      rows.sort(function (a, b) {
        return compare(a, b, sortableIndexes);
      });

      const finalRows = [];

      let counterRows = 0;
      let counterAdded = 0;
      for (let i = 0; i < allRows.length; i++) {
        const index = i.toString();
        if (this.pageSort && visibleIndexes.indexOf(i) !== -1) {
          if (counterRows < this.configFinal.pagination) {
            finalRows.push(rows[counterAdded]);
            counterAdded++;
          } else {
            finalRows.push(allRows[sortedIndexesBefore[index]]);
          }
          counterRows++;
        } else if (this.pageSort) {
          finalRows.push(allRows[sortedIndexesBefore[index]]);
        } else {
          finalRows.push(rows[i]);
        }
      }

      for (let i = 0; i < finalRows.length; i++) {
        const index = i.toString();
        this.$set(this.sortedIndexes, index, parseInt(finalRows[i].index));
      }

      if (!this.pageSort && !preventReset) {
        this.currentPage = 1;
      }

      if (
        !this.configFinal.selectAllRows &&
        !this.pageSort &&
        !preventReset &&
        !this.configFinal.keepSelect
      ) {
        this.resetSelect("sort method");
      }

      this.recomputeEssentials();
    },
  },
};
