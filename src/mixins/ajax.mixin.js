export default {
  data() {
    return {
      fetching: false,
      ajaxRows: [],
      ajaxPages: 0,
      ajaxAll: 0,
      cancelSource: null,
      lastQuery: "",
      queryAjaxTimeout: null,
    };
  },
  computed: {
    ajaxLoading() {
      return this.loading || this.fetching;
    },
  },
  watch: {
    updated(val) {
      if (!this.configFinal.ajaxUrl) {
        return;
      }

      if (val && val.clear) {
        this.loadViaAjax(true, true, "UPDATED");
      } else if (val) {
        this.loadViaAjax(false, true, "UPDATED");
      }
    },

    loading() {
      this.loaderHeight = this.$refs["height-wrapper"]
        ? this.$refs["height-wrapper"].clientHeight
        : 0;
    },
  },
  methods: {
    loadViaAjax(
      clearSortAndPage = false,
      clearSelected = true,
      accessor = null
    ) {
      if (this.DEBUG) {
        console.log("CALLED FROM:", accessor);
      }

      let query = this.query;

      if (
        query &&
        query.length < this.configFinal.searchLength &&
        (this.lastQuery.length < query.length ||
          this.lastQuery.length < this.configFinal.searchLength)
      ) {
        return;
      } else if (!query && this.lastQuery) {
        const tmp = this.lastQuery;
        this.lastQuery = "";
        if (tmp.length < this.configFinal.searchLength) {
          return;
        }
      } else if (query && query.length < this.configFinal.searchLength) {
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

      this.loaderHeight = this.$refs["height-wrapper"]
        ? this.$refs["height-wrapper"].clientHeight
        : 0;

      this.fetching = true;

      let params = {
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

      const headers = {
        "Content-Type": "application/json",
      };

      this.axiosFinal
        .request(this.configFinal.ajaxUrl, {
          method: this.configFinal.requestMethod,
          params: this.configFinal.requestMethod === "GET" ? params : null,
          data: this.configFinal.requestMethod === "POST" ? params : null,
          cancelToken: this.cancelSource.token,
          headers,
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
            Math.ceil(response.data.all / this.currentRowsPerPage)
          );

          this.$emit(
            "ajax:rows",
            {
              rows: response.data.rows,
              old: JSON.parse(JSON.stringify(this.ajaxRows)),
              all: this.ajaxAll,
            },
            "ajax:rows"
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
