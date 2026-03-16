import axios from "axios";

export default {
  computed: {
    DEBUG() {
      return this.verbose;
    },

    axiosFinal() {
      return this.axios
        ? this.axios
        : this.$globalVueQuintableaxios
        ? this.$globalVueQuintableaxios
        : axios;
    },

    configFinal() {
      if (!this.config) {
        return {};
      }

      let pagination = false;
      if (this.config.pagination === true) {
        pagination = 25;
      } else if (this.config.pagination) {
        let i = 0;
        while (
          this.paginationOptions[i] <= this.config.pagination &&
          i < this.paginationOptions.length
        ) {
          i++;
        }
        pagination =
          this.paginationOptions[
            Math.min(i - 1, this.paginationOptions.length - 1)
          ];
      }

      let numberOfVisibleRowsFillerWord = "of";

      if (this.config.numberOfVisibleRowsFillerWord) {
        numberOfVisibleRowsFillerWord =
          this.config.numberOfVisibleRowsFillerWord;
      }

      let select = false;
      if (this.config.select) {
        select = true;
      }

      let ajaxRequestDelay = 250;
      if (this.config.ajaxRequestDelay) {
        ajaxRequestDelay = this.config.ajaxRequestDelay;
      }

      let hoverClass = "bg-muted";
      if (this.config.hoverClass === false) {
        hoverClass = "";
      } else if (this.config.hoverClass && this.config.hoverClass !== true) {
        hoverClass = this.config.hoverClass;
      }

      let activeClass = "bg-muted";
      if (this.config.activeClass === false) {
        activeClass = "";
      } else if (this.config.activeClass && this.config.activeClass !== true) {
        activeClass = this.config.activeClass;
      }

      let multiSort = false;
      if (this.config.multiSort) {
        multiSort = true;
      }

      let pageSort = false;
      if (this.config.pageSort) {
        pageSort = true;
      }

      let multiSortSelect = false;
      if (this.config.multiSortSelect) {
        multiSortSelect = true;
      }

      let pageSortSelect = false;
      if (this.config.pageSortSelect) {
        pageSortSelect = true;
      }

      let ajaxUrl = false;
      if (this.config.ajaxUrl) {
        ajaxUrl = this.config.ajaxUrl;
      }

      let selectPosition = "post";
      if (["pre", "post"].includes(this.config.selectPosition)) {
        selectPosition = this.config.selectPosition;
      }

      let expandedAll = false;
      if (this.config.expandedAll) {
        expandedAll = true;
      }

      let useFuzzySearch = false;
      if (this.config.useFuzzySearch) {
        useFuzzySearch = true;
      }
      let prettySelect = false;
      if (this.config.prettySelect) {
        prettySelect = true;
      }

      let rowsSelect = false;
      if (this.config.rowsSelect) {
        rowsSelect = true;
      }

      let keepSelect = false;
      if (this.config.keepSelect) {
        keepSelect = true;
      }

      let disallowAllOption = false;
      if (this.config.disallowAllOption) {
        disallowAllOption = true;
      }

      let hideEmptyColumns = false;
      if (this.config.hideEmptyColumns) {
        hideEmptyColumns = true;
      }

      let ignoreSortEmptyColumns = "none";
      if (
        ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns)
      ) {
        ignoreSortEmptyColumns = this.config.ignoreSortEmptyColumns;
      }

      let search = false;
      if (this.config.search) {
        search = true;
      }

      let searchLength = 1;
      if (this.config.searchLength) {
        searchLength = this.config.searchLength;
      }

      let searchPlaceholder = "Search...";
      if (this.config.searchPlaceholder) {
        searchPlaceholder = this.config.searchPlaceholder;
      }

      let multiSortPlaceholder = "Multiple sort";
      if (this.config.multiSortPlaceholder) {
        multiSortPlaceholder = this.config.multiSortPlaceholder;
      }

      let pageSortPlaceholder = "Page sort";
      if (this.config.pageSortPlaceholder) {
        pageSortPlaceholder = this.config.pageSortPlaceholder;
      }

      let filterRelation = "AND";
      if (["AND", "OR"].includes(this.config.filterRelation)) {
        filterRelation = this.config.filterRelation;
      }

      let filterGroupRelation = "AND";
      if (["AND", "OR"].includes(this.config.filterGroupRelation)) {
        filterGroupRelation = this.config.filterGroupRelation;
      }

      let rowsPlaceholder = "Rows per page:";
      if (this.config.rowsPlaceholder) {
        rowsPlaceholder = this.config.rowsPlaceholder;
      }

      let emptyPlaceholder = "No rows...";
      if (this.config.emptyPlaceholder) {
        emptyPlaceholder = this.config.emptyPlaceholder;
      }

      let selectAll = false;
      if (this.config.selectAll) {
        selectAll = true;
      }

      let selectAllRows = false;
      if (this.config.selectAllRows) {
        selectAllRows = true;
      }

      if (ajaxUrl && selectAllRows) {
        console.warn(
          "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
        );
        selectAllRows = false;
      }

      let storeState = false;
      if (this.config.storeState) {
        storeState = true;
      }

      if (!this.identifier && this.config.storeState) {
        console.warn(
          "Option storeState was deactivated automatically because table identifier is not set!"
        );
        storeState = false;
      }

      const testLocalStorage = "test-local-storage";
      try {
        localStorage.setItem(testLocalStorage, testLocalStorage);
        localStorage.removeItem(testLocalStorage);
      } catch (e) {
        console.warn(
          "Option storeState was deactivated automatically because local storage is not available!"
        );
        storeState = false;
      }

      let defaultSelected = false;
      if (this.config.defaultSelected) {
        defaultSelected = true;
      }

      let hideRowToggle = false;
      if (this.config.hideRowToggle) {
        hideRowToggle = true;
      }

      let enableRowTabIndex = false;
      if (this.config.enableRowTabIndex) {
        enableRowTabIndex = true;
      }

      let expandedRowIcon = "chevron-up";
      if (
        this.config.expandedRowIcon &&
        typeof this.config.expandedRowIcon === "string" &&
        ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
          this.config.expandedRowIcon.toLowerCase()
        )
      ) {
        expandedRowIcon = this.config.expandedRowIcon.toLowerCase();
      }

      let collapsedRowIcon = "chevron-down";
      if (
        this.config.collapsedRowIcon &&
        typeof this.config.collapsedRowIcon === "string" &&
        ["chevron-down", "plus", "caret-down", "eye"].includes(
          this.config.collapsedRowIcon.toLowerCase()
        )
      ) {
        collapsedRowIcon = this.config.collapsedRowIcon.toLowerCase();
      }

      let pageRange = 5;
      if (this.config.pageRange) {
        pageRange = this.config.pageRange;
      }

      let searchClass = "col-12";
      if (this.config.searchClass) {
        searchClass = this.config.searchClass;
      }

      let searchContainerClass = "row";
      if (this.config.searchContainerClass) {
        searchContainerClass = this.config.searchContainerClass;
      }

      let requestMethod = "GET";
      if (
        this.config.requestMethod &&
        typeof this.config.requestMethod === "string" &&
        ["POST", "GET"].includes(this.config.requestMethod.toUpperCase())
      ) {
        requestMethod = this.config.requestMethod.toUpperCase();
      }

      let number = 0;
      let headlines = [];
      let breakpoints = [];
      let hiddenCols = [];
      let sorts = [];
      let stickyCols = [];
      let alignments = [];
      let columnClasses = [];
      let ignoreEmpty = [];

      let columns = null;
      if (this.config.columns) {
        number = this.config.columns.length;

        for (let i = 0; i < this.config.columns.length; i++) {
          columnClasses[i] = "";
          if (this.config.columns[i] && this.config.columns[i].headline) {
            headlines[i] = this.config.columns[i].headline;
            columnClasses[i] += this.config.columns[i].headline
              .replace(/([a-z])([A-Z])/g, "$1-$2")
              .replace(/\s+/g, "-")
              .toLowerCase();
          } else {
            headlines[i] = "";
          }

          columnClasses[i] += " column-" + (i + 1);

          if (this.config.columns[i].classes) {
            columnClasses[i] += " " + this.config.columns[i].classes;
          }

          if (this.config.columns[i] && this.config.columns[i].breakpoint) {
            breakpoints[i] = this.config.columns[i].breakpoint;
          } else {
            breakpoints[i] = "";
          }

          if (this.config.columns[i] && this.config.columns[i].sort) {
            if (
              this.config.columns[i].firstSortDirection &&
              typeof this.config.columns[i].firstSortDirection === "string" &&
              ["DESC", "ASC"].includes(
                this.config.columns[i].firstSortDirection.toUpperCase()
              )
            ) {
              sorts[i] =
                this.config.columns[i].firstSortDirection.toUpperCase();
            } else {
              sorts[i] = true;
            }
          } else {
            sorts[i] = false;
          }

          if (this.config.columns[i] && this.config.columns[i].ignoreEmpty) {
            ignoreEmpty[i] = true;
          } else {
            ignoreEmpty[i] = false;
          }

          if (this.config.columns[i] && this.config.columns[i].sticky) {
            stickyCols[i] = true;
          } else {
            stickyCols[i] = false;
          }

          if (this.config.columns[i] && this.config.columns[i].hidden) {
            hiddenCols[i] = true;
          } else {
            hiddenCols[i] = false;
          }

          if (this.config.columns[i] && this.config.columns[i].align) {
            alignments[i] = this.config.columns[i].align;
          } else {
            alignments[i] = false;
          }
        }

        columns = this.config.columns;
      }

      return Object.freeze({
        headlines: headlines,
        columnClasses: columnClasses,
        sorts: sorts,
        pageSort: pageSort,
        multiSort: multiSort,
        pageSortSelect: pageSortSelect,
        multiSortSelect: multiSortSelect,
        filterGroupRelation: filterGroupRelation,
        filterRelation: filterRelation,
        rowsSelect: rowsSelect,
        keepSelect: keepSelect,
        disallowAllOption: disallowAllOption,
        defaultSelected: defaultSelected,
        searchLength: searchLength,
        search: search,
        searchPlaceholder: searchPlaceholder,
        useFuzzySearch: useFuzzySearch,
        ajaxUrl: ajaxUrl,
        pageSortPlaceholder: pageSortPlaceholder,
        multiSortPlaceholder: multiSortPlaceholder,
        rowsPlaceholder: rowsPlaceholder,
        emptyPlaceholder: emptyPlaceholder,
        stickyCols: stickyCols,
        alignments: alignments,
        breakpoints: breakpoints,
        hiddenCols: hiddenCols,
        ignoreEmpty: ignoreEmpty,
        hideEmptyColumns: hideEmptyColumns,
        ignoreSortEmptyColumns: ignoreSortEmptyColumns,
        pagination: pagination,
        numberOfVisibleRowsFillerWord: numberOfVisibleRowsFillerWord,
        select: select,
        selectAll: selectAll,
        selectAllRows: selectAllRows,
        hoverClass: hoverClass,
        activeClass: activeClass,
        expandedAll: expandedAll,
        pageRange: pageRange,
        prettySelect: prettySelect,
        number: number,
        columns: columns,
        hideRowToggle: hideRowToggle,
        enableRowTabIndex: enableRowTabIndex,
        expandedRowIcon: expandedRowIcon,
        collapsedRowIcon: collapsedRowIcon,
        selectPosition: selectPosition,
        searchClass: searchClass,
        searchContainerClass: searchContainerClass,
        requestMethod: requestMethod,
        storeState: storeState,
        ajaxRequestDelay: ajaxRequestDelay,
      });
    },
  },
};
