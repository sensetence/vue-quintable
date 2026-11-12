// Rows loaded from the server (`ajaxUrl`).
// Part of VueQuintable (src/components/table/vue-quintable.vue), as src/mixins/ajax.mixin.js is in v2. Its
// watchers stay in the component: the order watchers are created in decides the order of the events they emit.

export default {
  computed: {
    /**
     * Calculates if something is currently loading via ajax
     *
     */
    ajaxLoading() {
      return this.loading || this.fetching;
    },
  },
  methods: {
    _wrapperHeight() {
      const wrapper = this.$refs["height-wrapper"];
      return wrapper ? wrapper.clientHeight : 0;
    },

    /**
     * Load new rows via ajax including filters, search query and pagination
     *
     * @param clearSortAndPage
     * @param clearSelected
     * @param accessor
     */
    loadViaAjax(
      clearSortAndPage = false,
      clearSelected = true,
      accessor = null,
    ) {
      if (this.DEBUG) {
        console.log("CALLED FROM:", accessor);
      }

      const searchLength = this.configFinal.searchLength;
      let query = this.query;

      if (
        query &&
        query.length < searchLength &&
        (this.lastQuery.length < query.length ||
          this.lastQuery.length < searchLength)
      ) {
        // A query below the minimum length that is growing, or whose predecessor was short as well: nothing to do.
        return;
      } else if (!query && this.lastQuery) {
        // The query was cleared: reset the last query, and stop if it was below the minimum length (no search ran).
        const tmp = this.lastQuery;
        this.lastQuery = "";
        if (tmp.length < searchLength) {
          return;
        }
      } else if (query && query.length < searchLength) {
        // A query shortened below the minimum length searches nothing.
        query = "";
      }

      if (this.cancelSource) {
        this.cancelSource.cancel("Operation canceled by the user.");
      }

      this.clearLists(clearSelected);

      this.ajaxRows = [];

      if (clearSortAndPage) {
        this.currentPage = 1;
        this.resetSelect("loadViaAjax method");
      }

      this.loaderHeight = this._wrapperHeight();

      this.fetching = true;

      const params = {
        search: query,
        filters: this.filtersFinal,
        perPage: this.currentRowsPerPage,
        page: this.currentPage,
        hiddenColumns: this.configFinal.hiddenCols,
        sort:
          this.numberOfSorts > 0
            ? {
                indexes: this.currentSortIndexes,
                columns: this.sortingColumns,
              }
            : null,
      };

      this.cancelSource = this.axiosFinal.CancelToken.source();

      const method = this.configFinal.requestMethod;
      this.axiosFinal
        .request(this.configFinal.ajaxUrl, {
          method,
          params: method === "GET" ? params : null,
          data: method === "POST" ? params : null,
          cancelToken: this.cancelSource.token,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (
            !response.data.rows ||
            typeof response.data.rows.length === "undefined"
          ) {
            throw "Response data has to contain rows property. Please see Readme.md for details";
          }

          if (typeof response.data.all === "undefined") {
            throw "Response data has to contain all property. Please see Readme.md for details";
          }

          this.ajaxAll = response.data.all;
          this.ajaxPages = Math.max(
            1,
            Math.ceil(response.data.all / this.currentRowsPerPage),
          );

          this.$emit(
            "ajax:rows",
            {
              rows: response.data.rows,
              old: JSON.parse(JSON.stringify(this.ajaxRows)),
              all: this.ajaxAll,
            },
            "ajax:rows",
          );

          if (response.data.all) {
            this.ajaxRows = response.data.rows;
            this.initLists();
          }

          this.fetching = false;
        })
        .catch((error) => {
          if (this.axiosFinal.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            this.fetching = false;
            console.error(error);
            this.$emit("ajax:error", error, "ajax:error");
          }
        });
    },
  },
};
