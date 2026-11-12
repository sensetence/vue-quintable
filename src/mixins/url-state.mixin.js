// urlState: page, sort, search, rows per page and column filters as query parameters of the page's address, so a
// link shows the same view. Part of VueQuintable (src/components/table/vue-quintable.vue).

export default {
  computed: {
    // The parameter names: the table's identifier (or "qt") and the state's name, e.g. "orders-page".
    _urlStatePrefix() {
      return (this.identifier || "qt") + "-";
    },

    // The state as parameters; values at their default are left out.
    _urlStateParams() {
      const params = {};
      if (this.currentPage > 1) {
        params.page = String(this.currentPage);
      }
      const sorts = Object.values(this.currentSortIndexes)
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((sort) => `${sort.index}:${sort.asc ? "asc" : "desc"}`);
      if (sorts.length) {
        params.sort = sorts.join(",");
      }
      if (this.query) {
        params.search = this.query;
      }
      if (
        this.customRowsPerPage &&
        this.customRowsPerPage !== this.configFinal.pagination
      ) {
        params.rows = String(this.customRowsPerPage);
      }
      if (
        this.configFinal.columnFilters &&
        Object.keys(this.columnFilterValues).length
      ) {
        params.filters = JSON.stringify(this.columnFilterValues);
      }
      return params;
    },
  },
  methods: {
    // Reads the state from the address into storedState, the way storeState restores it.
    _readUrlState() {
      if (typeof window === "undefined") {
        return;
      }
      const url = new URLSearchParams(window.location.search);
      const get = (name) => url.get(this._urlStatePrefix + name);

      const page = parseInt(get("page"));
      if (page > 1) {
        this.storedState["current-page"] = page;
      }
      const search = get("search");
      if (search) {
        this.storedState.query = search;
      }
      const rows = get("rows");
      if (rows) {
        this.storedState["rows-per-page"] =
          rows === "All" ? "All" : parseInt(rows) || undefined;
      }
      const sort = get("sort");
      if (sort) {
        const indexes = {};
        sort.split(",").forEach((part, order) => {
          const [index, direction] = part.split(":");
          const i = parseInt(index);
          if (this.configFinal.sorts[i]) {
            indexes[i] = {
              headline: this.configFinal.headlines[i],
              index: i,
              asc: direction !== "desc",
              order,
            };
          }
        });
        if (Object.keys(indexes).length) {
          this.storedState["sort-indexes"] = indexes;
        }
      }
      const filters = get("filters");
      if (filters && this.configFinal.columnFilters) {
        try {
          this.columnFilterValues = JSON.parse(filters);
        } catch {
          // not ours, or broken: no column filters
        }
      }
    },

    // Writes the state into the address, keeping its other parameters, without a new history entry.
    _writeUrlState(params) {
      const url = new URL(window.location.href);
      for (const name of ["page", "sort", "search", "rows", "filters"]) {
        const key = this._urlStatePrefix + name;
        if (params[name] === undefined) {
          url.searchParams.delete(key);
        } else {
          url.searchParams.set(key, params[name]);
        }
      }
      if (url.href !== window.location.href) {
        window.history.replaceState(window.history.state, "", url);
      }
    },
  },
};
