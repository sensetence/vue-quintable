// Search and filters: which rows pass the query and the filter values (see filter.ts).
// Part of VueQuintable (src/components/table/vue-quintable.vue), as src/mixins/filtering.mixin.js is in v2. Its
// watchers stay in the component: the order watchers are created in decides the order of the events they emit.

import fuzzy from "fuzzy.js";
import {
  matchesGroup,
  matchesGroups,
  getFilterValues,
  findInFilterGroups,
} from "../components/table/filter";
import { cellsOf } from "../components/table/helpers";

export default {
  computed: {
    /**
     * Key of filter operator fuctions
     *
     */
    operators() {
      return Object.keys(this.operatorFunctions);
    },

    /**
     * Checks if any filter is active
     *
     */
    filterActive() {
      return this.filtersFinal && Object.keys(this.filtersFinal).length;
    },

    filtersFinal() {
      if (!this.configFinal.storeState || !this.storedState.filters) {
        return this.filters;
      }
      return this.storedState.filters;
    },

    /**
     * Calculates all rows which passes the filter and search restrictions
     *
     */
    filteredRows() {
      const visible = this._searchAndFilter();
      // columnFilters: read after everything above, so a table without them reads its sources as before.
      if (
        this.configFinal.columnFilters &&
        !this.configFinal.ajaxUrl &&
        this._columnFilterActive
      ) {
        return this._applyColumnFilters(visible);
      }
      return visible;
    },
    // highlightSearch: the lower-case query the text cells mark, "" while none is searched.
    _markQuery() {
      if (!this.configFinal.search) {
        return "";
      }
      const query = String(
        this.configFinal.searchDebounce && !this.configFinal.ajaxUrl
          ? this.debouncedQuery
          : this.query,
      );
      return query.length >= this.configFinal.searchLength
        ? query.toLowerCase()
        : "";
    },

    // What filter.ts needs from the table.
    _filterContext() {
      return {
        groups: this.filterGroups,
        operators: this.operatorFunctions,
        operatorNames: this.operators,
        defaultOperator: this.defaultOperator,
        debug: this.DEBUG,
      };
    },
  },
  methods: {
    // The rows that pass search and filters (filteredRows without the column filters).
    _searchAndFilter() {
      if (this.configFinal.ajaxUrl) {
        return this.rowsFinal;
      }

      const rows = this.rowsFinal;
      const visible = new Array(rows.length).fill(true);
      const search = this.configFinal.search;
      // searchDebounce: the rows follow the query after a pause.
      const queryOf = () =>
        this.configFinal.searchDebounce ? this.debouncedQuery : this.query;

      // Sources are read in the order of before (the query only with search on, and past here only once there is a
      // row): the order a computed reads its sources in decides the order watchers run in, and with it of events.
      if (
        (!search && !this.filterActive) ||
        (!this.filterActive &&
          search &&
          queryOf().length < this.configFinal.searchLength)
      ) {
        return visible;
      }

      const filterActive = this.filterActive;
      let searching;
      let matches;
      let group = null;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        let match = false;

        if (searching === undefined) {
          searching =
            search && queryOf().length >= this.configFinal.searchLength;
        }
        if (searching && !matches) {
          const query = (queryOf() + "").toLowerCase();
          const fuzzySearch = this.configFinal.useFuzzySearch;
          matches = (value) => {
            const text = (value + "").toLowerCase();
            return (
              (fuzzySearch && fuzzy(text, query).score > 6) ||
              text.indexOf(query) !== -1
            );
          };
        }

        if (searching) {
          // A row matches if a cell's html or text, or one of the row's keywords, contains the query.
          const cells = cellsOf(row);
          for (let j = 0, n = cells.length; j < n && !match; j++) {
            const cell = cells[j];
            const html = cell.html;
            const text = html ? html : cell.text;
            match = !!text && matches(text);
          }
          if (row.keywords) {
            for (let k = 0; k < row.keywords.length && !match; k++) {
              match = matches(row.keywords[k]);
            }
          }
        }

        if (filterActive && !row.filters) {
          // Filters are active, but the row has no values to filter by.
          match = false;
        } else if (filterActive && (!searching || match)) {
          if (this.filterGroups.length) {
            match = this.doFiltering(row.filters);
          } else {
            // No groups: one group of all set filters, by the table's relation.
            group = group || {
              items: Object.keys(this.filtersFinal).map((name) => ({ name })),
              relation: this.configFinal.filterRelation,
            };
            match = this.doFilteringForGroup(
              this.filtersFinal,
              row.filters,
              group,
            );
            if (this.DEBUG) {
              console.log("FILTER GROUPS CALCULATED", this.filterGroups);
            }
          }
          if (this.DEBUG) {
            console.log("\n");
            console.log("ROW " + i, match, row.filters);
            console.log("\n");
          }
        }

        visible[i] = match;
      }

      return visible;
    },
    // searchDebounce: follows the typed query after the pause; at once without one.
    _debounceQuery(query) {
      clearTimeout(this._debounceTimer);
      const delay = this.configFinal.searchDebounce;
      if (!delay || this.configFinal.ajaxUrl) {
        this.debouncedQuery = query;
        return;
      }
      this._debounceTimer = setTimeout(() => {
        this.debouncedQuery = query;
      }, delay);
    },

    /**
     * sets search query from outside (search slot)
     *
     */
    setSearchQuery(query) {
      this.query = query;
    },

    /**
     * Do the filtering for all rows against all groups
     *
     * @param filterValues the set filter keys and values
     *
     * @returns {boolean}
     */
    doFiltering(filterValues) {
      return matchesGroups(
        this.filtersFinal,
        filterValues,
        this.configFinal.filterGroupRelation,
        this._filterContext,
      );
    },

    /**
     * Do the actual filtering for a row against a cetrain group
     *
     * @param filters the set filter keys and values
     * @param filterValues the filter values of one row
     * @param group the actual filter group
     * @param index the group's nesting depth
     *
     * @returns {boolean}
     */
    doFilteringForGroup(filters, filterValues, group, index = 0) {
      return matchesGroup(
        filters,
        filterValues,
        group,
        this._filterContext,
        index,
      );
    },

    /**
     *
     * Helper method to calculate an array of filter values from value/array/object
     *
     */
    getFilterValues,

    /**
     * Search a certain filter key in a filter group
     *
     * @param key the filter key
     * @param arr the group
     * @param index just a counter
     * @returns {boolean}
     */
    findInFilterGroups,
  },
};
