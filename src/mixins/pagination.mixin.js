// Pages: rows per page, the page's rows and the page buttons.
// Part of VueQuintable (src/components/table/vue-quintable.vue), as src/mixins/pagination.mixin.js is in v2. Its
// watchers stay in the component: the order watchers are created in decides the order of the events they emit.

export default {
  computed: {
    /**
     * Calculates number of current rows per page. Special case: no user action in place
     *
     */
    currentRowsPerPageProperty: {
      get() {
        return this.customRowsPerPage || this.currentRowsPerPage;
      },
      set(val) {
        this.customRowsPerPage = val;
      },
    },

    /**
     * Calculates the value of number of shown rows. If no pagination is set, all will be displayed.
     *
     */
    currentRowsPerPage() {
      return this.customRowsPerPage || this.configFinal.pagination || "All";
    },

    /**
     * The options of the rows-per-page select
     *
     */
    paginationOptionsFilled() {
      return (this.configFinal.disallowAllOption ? [] : ["All"]).concat(
        this.paginationOptions,
      );
    },

    /**
     * Calculates the actual displayed page range (number of shown page buttons in pagination) to prevent showing pages out of row range
     *
     */
    pageRange() {
      return Math.min(this.configFinal.pageRange, this.pages);
    },

    /**
     * Calculates number of pages regarding the rows per page and visible rows
     *
     */
    pages() {
      if (this.ajaxPages) {
        return this.ajaxPages;
      }
      if (!this.currentRowsPerPage || this.currentRowsPerPage === "All") {
        return 1;
      }
      return Math.max(
        1,
        Math.ceil(this.numberOfVisibleRows / this.currentRowsPerPage),
      );
    },

    /**
     * Calculates the number of visible Rows without paging;
     *
     */
    numberOfVisibleRows() {
      if (this.configFinal.ajaxUrl) {
        return this.ajaxAll;
      }
      let count = 0;
      for (const visible of this.filteredRows) {
        if (visible) count++;
      }
      return count;
    },

    /**
     * Calculates all accessible pages regarding to page range and current page
     *
     */
    visiblePages() {
      let start;
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

      const pages = [];
      for (let i = 0; i < this.pageRange && i + start <= this.pages; i++) {
        pages.push(i + start);
      }
      return pages;
    },

    /**
     * Checks if there are currently no rows visible
     *
     */
    noRows() {
      return !this.numberOfVisibleRows;
    },

    // empty slot: the table has no rows at all, not just none that pass search and filters. With ajaxUrl: the
    // server reports none while no search or filter is set.
    _hasNoRowsAtAll() {
      if (this.configFinal.ajaxUrl) {
        return (
          !this.ajaxAll &&
          !this.query &&
          !Object.keys(this.filtersFinal || {}).length
        );
      }
      return !this.rowsFinal.length;
    },

    /**
     * Calculates the first visible row for displaying
     *
     */
    firstVisibleRow() {
      if (this.currentRowsPerPage === "All" || this.pages === 1) {
        return 1;
      }
      return (
        this.currentPage * this.currentRowsPerPage - this.currentRowsPerPage + 1
      );
    },

    /**
     * Calculates the last visible row for displaying
     *
     */
    lastVisibleRow() {
      if (this.currentRowsPerPage === "All" || this.pages === 1) {
        return this.numberOfVisibleRows;
      }
      return Math.min(
        this.firstVisibleRow + this.currentRowsPerPage - 1,
        this.numberOfVisibleRows,
      );
    },
  },
  methods: {
    /**
     * Change page with certain value
     *
     * @param page
     */
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

    /**
     * Calculate which pages should be displayed in pagination due to page offset
     *
     */
    updatePageOffset(factor) {
      const result = this.pageOffset + this.pageRange * factor;

      if (factor > 0) {
        const offset = Math.min(result, this.pages - this.pageRange);
        this.pageOffset = Math.min(offset, this.pages - this.currentPage);
      } else if (factor < 0) {
        this.pageOffset = Math.max(result, -(this.pages - this.pageRange));
      } else {
        this.pageOffset = 0;
      }
    },
  },
};
