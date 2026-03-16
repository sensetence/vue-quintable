export default {
  data() {
    return {
      currentPage: 1,
      paginationOptions: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 50, 100,
      ],
      customRowsPerPage: null,
      pageOffset: 0,
    };
  },
  computed: {
    currentRowsPerPageProperty: {
      get() {
        if (!this.customRowsPerPage) {
          return this.currentRowsPerPage;
        }
        return this.customRowsPerPage;
      },
      set(val) {
        this.customRowsPerPage = val;
      },
    },

    currentRowsPerPage() {
      if (!this.customRowsPerPage) {
        return this.configFinal.pagination
          ? this.configFinal.pagination
          : "All";
      }
      return this.customRowsPerPage;
    },

    paginationOptionsFilled() {
      let options = !this.configFinal.disallowAllOption ? ["All"] : [];
      return options.concat(this.paginationOptions);
    },

    pageRange() {
      return Math.min(this.configFinal.pageRange, this.pages);
    },

    pages() {
      if (this.ajaxPages) {
        return this.ajaxPages;
      }

      if (!this.currentRowsPerPage || this.currentRowsPerPage === "All") {
        return 1;
      }

      return Math.max(
        1,
        Math.ceil(this.numberOfVisibleRows / this.currentRowsPerPage)
      );
    },

    numberOfVisibleRows() {
      if (this.configFinal.ajaxUrl) {
        return this.ajaxAll;
      }

      let count = 0;
      for (let i = 0; i < this.filteredRows.length; i++) {
        if (this.filteredRows[i]) count++;
      }
      return count;
    },

    visiblePages() {
      let pages = [];
      let start = 0;

      if (this.pages < this.pageRange || this.currentPage === 1) {
        start = 1;
      } else if (this.currentPage === this.pages) {
        start = this.currentPage - (this.pageRange - 1);
      } else {
        let off;
        if (this.pageRange % 2 === 0) {
          off = this.pageRange / 2;
        } else {
          off = (this.pageRange - 1) / 2;
          if (this.currentPage + off > this.pages) {
            off++;
          }
        }

        start = this.currentPage - off;
      }

      start = Math.max(start + this.pageOffset, 1);

      for (let i = 0; i < this.pageRange; i++) {
        if (i + start > this.pages) {
          break;
        }
        pages.push(i + start);
      }

      return pages;
    },

    noRows() {
      return !this.numberOfVisibleRows;
    },

    firstVisibleRow() {
      if (this.currentRowsPerPage === "All" || this.pages === 1) {
        return 1;
      }

      return (
        this.currentPage * this.currentRowsPerPage - this.currentRowsPerPage + 1
      );
    },

    lastVisibleRow() {
      if (this.currentRowsPerPage === "All" || this.pages === 1) {
        return this.numberOfVisibleRows;
      }
      return Math.min(
        this.firstVisibleRow + this.currentRowsPerPage - 1,
        this.numberOfVisibleRows
      );
    },
  },
  watch: {
    currentRowsPerPage(val) {
      this.$emit("update:rows-per-page", val, "update:rows-per-page");

      const clear = !(
        this.configFinal.storeState && this.storedState["rows-per-page"]
      );

      if (this.configFinal.storeState) {
        this.$delete(this.storedState, "rows-per-page");
        localStorage.setItem(
          `vue-quintable-${this.identifier}-rows-per-page`,
          this.currentRowsPerPage
        );
      }

      if (this.configFinal.ajaxUrl) {
        this.loadViaAjax(clear, clear, "PAGE_ROWS");
        return;
      }

      if (this.currentPage !== 1) {
        this.currentPage = 1;
      } else if (!this.configFinal.selectAllRows) {
        this.resetSelect("currentRowsPerPage watcher");
      }
    },

    currentPage(val) {
      this.pageOffset = 0;
      this.activeRow = null;

      this.$emit("update:page", val, "update:page");

      const clear = !(
        this.configFinal.storeState && this.storedState["current-page"]
      );

      if (this.configFinal.storeState) {
        this.$delete(this.storedState, "current-page");
        localStorage.setItem(
          `vue-quintable-${this.identifier}-current-page`,
          this.currentPage
        );
      }

      if (this.configFinal.ajaxUrl) {
        this.resetSelect("currentPage watcher ajax");
        this.loadViaAjax(false, clear, "PAGE");
        return;
      }

      if (!this.configFinal.selectAllRows) {
        this.resetSelect("currentPage watcher");
      }

      if (this.pageSort) {
        this.currentSortIndexes = {};
        this.resetSorts();
      }

      this.recomputeEssentials();
    },
  },
  methods: {
    gotoPage(page) {
      if (page === "prev") {
        if (this.currentPage - 1 > 0) {
          this.currentPage--;
        }
      } else if (page === "next") {
        if (this.currentPage + 1 <= this.pages) {
          this.currentPage++;
        }
      } else if (page === "first") {
        this.currentPage = 1;
      } else if (page === "last") {
        this.currentPage = this.pages;
      } else {
        this.currentPage = page;
      }
    },

    updatePageOffset(factor) {
      let result = this.pageOffset + this.pageRange * factor;

      if (factor > 0) {
        let offset = Math.min(result, this.pages - this.pageRange);
        this.pageOffset = Math.min(offset, this.pages - this.currentPage);
      } else if (factor < 0) {
        this.pageOffset = Math.max(result, -(this.pages - this.pageRange));
      } else {
        this.pageOffset = 0;
      }
    },
  },
};
