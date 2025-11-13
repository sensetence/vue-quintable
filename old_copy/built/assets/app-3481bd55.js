import {
  v as ue,
  a as R,
  f as ae,
  C as v,
  V as y,
  m as he,
  b as de,
  P as oe,
  l as m,
  c as pe,
  d as fe,
  e as me,
  g as ge,
  h as we,
  i as be,
  j as ve,
  k as _e,
  n as xe,
  o as ye,
  p as Ce,
  q as Se,
  r as ke,
  s as Re,
  t as Fe,
  u as Pe,
  w as Ae,
  x as $e,
  y as Oe,
  z as Ve,
  A as je,
  B as Ee,
  D as qe,
  E as Le,
  F as Ne,
  G as Qe,
  H as Te,
} from "./vendor-7ea3e80a.js";
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const a of i)
      if (a.type === "childList")
        for (const o of a.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const a = {};
    return (
      i.integrity && (a.integrity = i.integrity),
      i.referrerpolicy && (a.referrerPolicy = i.referrerpolicy),
      i.crossorigin === "use-credentials"
        ? (a.credentials = "include")
        : i.crossorigin === "anonymous"
        ? (a.credentials = "omit")
        : (a.credentials = "same-origin"),
      a
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const a = t(i);
    fetch(i.href, a);
  }
})();
function f(n, e, t, s, i, a, o, r) {
  var l = typeof n == "function" ? n.options : n;
  e && ((l.render = e), (l.staticRenderFns = t), (l._compiled = !0)),
    s && (l.functional = !0),
    a && (l._scopeId = "data-v-" + a);
  var c;
  if (
    (o
      ? ((c = function (p) {
          (p =
            p ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent &&
              this.parent.$vnode &&
              this.parent.$vnode.ssrContext)),
            !p && typeof __VUE_SSR_CONTEXT__ < "u" && (p = __VUE_SSR_CONTEXT__),
            i && i.call(this, p),
            p && p._registeredComponents && p._registeredComponents.add(o);
        }),
        (l._ssrRegister = c))
      : i &&
        (c = r
          ? function () {
              i.call(
                this,
                (l.functional ? this.parent : this).$root.$options.shadowRoot
              );
            }
          : i),
    c)
  )
    if (l.functional) {
      l._injectStyles = c;
      var u = l.render;
      l.render = function (_, C) {
        return c.call(C), u(_, C);
      };
    } else {
      var h = l.beforeCreate;
      l.beforeCreate = h ? [].concat(h, c) : [c];
    }
  return { exports: n, options: l };
}
const De = {
  name: "VueQuintable",
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
    dynamicConfig: { type: Boolean, default: !1 },
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
    loading: { type: Boolean, default: !1 },
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
    verbose: { type: Boolean, default: !1 },
    nested: { type: Boolean, default: !1 },
    tableClasses: { type: String, default: "" },
    sortOrder: {
      type: Array,
      default() {
        return [];
      },
    },
    updated: { type: [Boolean, Object, Date], default: !1 },
    axios: { type: Function },
    identifier: { type: String, default: null },
    initialSearchTerm: { type: String, default: null },
  },
  data() {
    return {
      rowsUpdatedKey: Date.now(),
      indexesUpdatedKey: Date.now(),
      generatedUpdatedKey: Date.now(),
      hoveredRow: null,
      allSelectedCustom: null,
      selected: {},
      openRows: {},
      sortedIndexes: {},
      currentSortIndexes: {},
      query: "",
      currentPage: 1,
      paginationOptions: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 50, 100,
      ],
      fetching: !1,
      ajaxRows: [],
      ajaxPages: 0,
      ajaxAll: 0,
      customRowsPerPage: null,
      customMultiSort: null,
      customPageSort: null,
      hiddenBreakpoints: [],
      initBreakpoints: !0,
      breakpointTimeout: null,
      cancelSource: null,
      lastQuery: "",
      pageOffset: 0,
      uuid: ue(),
      loaderHeight: 0,
      defaultOperator: "equal",
      queryAjaxTimeout: null,
      lastSearchQueryUpdated: null,
      operatorFunctions: {
        equal: (n, e) => e === n,
        greater: (n, e) => e > n,
        less: (n, e) => e < n,
        greaterEqual: (n, e) => e >= n,
        lessEqual: (n, e) => e <= n,
        contains: (n, e) =>
          !Array.isArray(e) && typeof e != "string" ? !1 : e.indexOf(n) !== -1,
        notContains: (n, e) =>
          !Array.isArray(e) && typeof e != "string" ? !1 : e.indexOf(n) === -1,
        startsWith: (n, e) => (typeof e != "string" ? !1 : e.indexOf(n) === 0),
        endsWitch: (n, e) =>
          typeof e != "string"
            ? !1
            : e.indexOf(n, this.length - n.length) !== -1,
        matches(n, e) {
          return !(n instanceof RegExp) || typeof e != "string"
            ? !1
            : n.test(e);
        },
      },
      storedState: {},
      activeRow: null,
    };
  },
  computed: {
    DEBUG() {
      return this.verbose;
    },
    axiosFinal() {
      return this.axios ? this.axios : R;
    },
    configFinal() {
      if (!this.config) return {};
      let n = !1;
      if (this.config.pagination === !0) n = 25;
      else if (this.config.pagination) {
        let d = 0;
        for (
          ;
          this.paginationOptions[d] <= this.config.pagination &&
          d < this.paginationOptions.length;

        )
          d++;
        n =
          this.paginationOptions[
            Math.min(d - 1, this.paginationOptions.length - 1)
          ];
      }
      let e = "of";
      this.config.numberOfVisibleRowsFillerWord &&
        (e = this.config.numberOfVisibleRowsFillerWord);
      let t = !1;
      this.config.select && (t = !0);
      let s = 250;
      this.config.ajaxRequestDelay && (s = this.config.ajaxRequestDelay);
      let i = "bg-muted";
      this.config.hoverClass === !1
        ? (i = "")
        : this.config.hoverClass &&
          this.config.hoverClass !== !0 &&
          (i = this.config.hoverClass);
      let a = "bg-muted";
      this.config.activeClass === !1
        ? (a = "")
        : this.config.activeClass &&
          this.config.activeClass !== !0 &&
          (a = this.config.activeClass);
      let o = !1;
      this.config.multiSort && (o = !0);
      let r = !1;
      this.config.pageSort && (r = !0);
      let l = !1;
      this.config.multiSortSelect && (l = !0);
      let c = !1;
      this.config.pageSortSelect && (c = !0);
      let u = !1;
      this.config.ajaxUrl && (u = this.config.ajaxUrl);
      let h = "post";
      ["pre", "post"].includes(this.config.selectPosition) &&
        (h = this.config.selectPosition);
      let p = !1;
      this.config.expandedAll && (p = !0);
      let _ = !1;
      this.config.useFuzzySearch && (_ = !0);
      let C = !1;
      this.config.prettySelect && (C = !0);
      let x = !1;
      this.config.rowsSelect && (x = !0);
      let S = !1;
      this.config.keepSelect && (S = !0);
      let k = !1;
      this.config.disallowAllOption && (k = !0);
      let w = !1;
      this.config.hideEmptyColumns && (w = !0);
      let b = "none";
      ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns) &&
        (b = this.config.ignoreSortEmptyColumns);
      let Q = !1;
      this.config.search && (Q = !0);
      let T = 1;
      this.config.searchLength && (T = this.config.searchLength);
      let D = "Search...";
      this.config.searchPlaceholder && (D = this.config.searchPlaceholder);
      let B = "Multiple sort";
      this.config.multiSortPlaceholder &&
        (B = this.config.multiSortPlaceholder);
      let H = "Page sort";
      this.config.pageSortPlaceholder && (H = this.config.pageSortPlaceholder);
      let U = "AND";
      ["AND", "OR"].includes(this.config.filterRelation) &&
        (U = this.config.filterRelation);
      let I = "AND";
      ["AND", "OR"].includes(this.config.filterGroupRelation) &&
        (I = this.config.filterGroupRelation);
      let M = "Rows per page:";
      this.config.rowsPlaceholder && (M = this.config.rowsPlaceholder);
      let J = "No rows...";
      this.config.emptyPlaceholder && (J = this.config.emptyPlaceholder);
      let G = !1;
      this.config.selectAll && (G = !0);
      let P = !1;
      this.config.selectAllRows && (P = !0),
        u &&
          P &&
          (console.warn(
            "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
          ),
          (P = !1));
      let A = !1;
      this.config.storeState && (A = !0),
        !this.identifier &&
          this.config.storeState &&
          (console.warn(
            "Option storeState was deactivated automatically because table identifier is not set!"
          ),
          (A = !1));
      const O = "test-local-storage";
      try {
        localStorage.setItem(O, O), localStorage.removeItem(O);
      } catch {
        console.warn(
          "Option storeState was deactivated automatically because local storage is not available!"
        ),
          (A = !1);
      }
      let z = !1;
      this.config.defaultSelected && (z = !0);
      let K = !1;
      this.config.hideRowToggle && (K = !0);
      let W = !1;
      this.config.enableRowTabIndex && (W = !0);
      let Y = "chevron-up";
      this.config.expandedRowIcon &&
        typeof this.config.expandedRowIcon == "string" &&
        ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
          this.config.expandedRowIcon.toLowerCase()
        ) &&
        (Y = this.config.expandedRowIcon.toLowerCase());
      let X = "chevron-down";
      this.config.collapsedRowIcon &&
        typeof this.config.collapsedRowIcon == "string" &&
        ["chevron-down", "plus", "caret-down", "eye"].includes(
          this.config.collapsedRowIcon.toLowerCase()
        ) &&
        (X = this.config.collapsedRowIcon.toLowerCase());
      let Z = 5;
      this.config.pageRange && (Z = this.config.pageRange);
      let ee = "col-12";
      this.config.searchClass && (ee = this.config.searchClass);
      let te = "row";
      this.config.searchContainerClass &&
        (te = this.config.searchContainerClass);
      let ne = "GET";
      this.config.requestMethod &&
        typeof this.config.requestMethod == "string" &&
        ["POST", "GET"].includes(this.config.requestMethod.toUpperCase()) &&
        (ne = this.config.requestMethod.toUpperCase());
      let se = 0,
        V = [],
        j = [],
        E = [],
        $ = [],
        q = [],
        L = [],
        F = [],
        N = [],
        ie = null;
      if (this.config.columns) {
        se = this.config.columns.length;
        for (let d = 0; d < this.config.columns.length; d++)
          (F[d] = ""),
            this.config.columns[d] && this.config.columns[d].headline
              ? ((V[d] = this.config.columns[d].headline),
                (F[d] += this.config.columns[d].headline
                  .replace(/([a-z])([A-Z])/g, "$1-$2")
                  .replace(/\s+/g, "-")
                  .toLowerCase()))
              : (V[d] = ""),
            (F[d] += " column-" + (d + 1)),
            this.config.columns[d].classes &&
              (F[d] += " " + this.config.columns[d].classes),
            this.config.columns[d] && this.config.columns[d].breakpoint
              ? (j[d] = this.config.columns[d].breakpoint)
              : (j[d] = ""),
            this.config.columns[d] && this.config.columns[d].sort
              ? this.config.columns[d].firstSortDirection &&
                typeof this.config.columns[d].firstSortDirection == "string" &&
                ["DESC", "ASC"].includes(
                  this.config.columns[d].firstSortDirection.toUpperCase()
                )
                ? ($[d] =
                    this.config.columns[d].firstSortDirection.toUpperCase())
                : ($[d] = !0)
              : ($[d] = !1),
            this.config.columns[d] && this.config.columns[d].ignoreEmpty
              ? (N[d] = !0)
              : (N[d] = !1),
            this.config.columns[d] && this.config.columns[d].sticky
              ? (q[d] = !0)
              : (q[d] = !1),
            this.config.columns[d] && this.config.columns[d].hidden
              ? (E[d] = !0)
              : (E[d] = !1),
            this.config.columns[d] && this.config.columns[d].align
              ? (L[d] = this.config.columns[d].align)
              : (L[d] = !1);
        ie = this.config.columns;
      }
      return {
        headlines: V,
        columnClasses: F,
        sorts: $,
        pageSort: r,
        multiSort: o,
        pageSortSelect: c,
        multiSortSelect: l,
        filterGroupRelation: I,
        filterRelation: U,
        rowsSelect: x,
        keepSelect: S,
        disallowAllOption: k,
        defaultSelected: z,
        searchLength: T,
        search: Q,
        searchPlaceholder: D,
        useFuzzySearch: _,
        ajaxUrl: u,
        pageSortPlaceholder: H,
        multiSortPlaceholder: B,
        rowsPlaceholder: M,
        emptyPlaceholder: J,
        stickyCols: q,
        alignments: L,
        breakpoints: j,
        hiddenCols: E,
        ignoreEmpty: N,
        hideEmptyColumns: w,
        ignoreSortEmptyColumns: b,
        pagination: n,
        numberOfVisibleRowsFillerWord: e,
        select: t,
        selectAll: G,
        selectAllRows: P,
        hoverClass: i,
        activeClass: a,
        expandedAll: p,
        pageRange: Z,
        prettySelect: C,
        number: se,
        columns: ie,
        hideRowToggle: K,
        enableRowTabIndex: W,
        expandedRowIcon: Y,
        collapsedRowIcon: X,
        selectPosition: h,
        searchClass: ee,
        searchContainerClass: te,
        requestMethod: ne,
        storeState: A,
        ajaxRequestDelay: s,
      };
    },
    visibleRows() {
      if (
        this.rowsUpdatedKey &&
        !this.configFinal.ajaxUrl &&
        this.currentRowsPerPage !== "All"
      ) {
        let n = [];
        for (let a = 0; a < this.rowsFinal.length; a++) n.push(!1);
        let e = {};
        for (let a in this.sortedIndexes)
          Object.prototype.hasOwnProperty.call(this.sortedIndexes, a) &&
            this.filteredRows[this.sortedIndexes[a]] &&
            (e[a] = this.sortedIndexes[a]);
        let t = this.currentPage * this.currentRowsPerPage,
          s = t - this.currentRowsPerPage,
          i = 0;
        for (let a in e)
          Object.prototype.hasOwnProperty.call(e, a) &&
            ((a = parseInt(a)), i < t && i >= s && (n[e[a]] = !0), i++);
        return n;
      } else return this.filteredRows;
    },
    visibleRowIndexes() {
      let n = [];
      if (this.indexesUpdatedKey)
        if (this.configFinal.ajaxUrl && !this.pageSort)
          for (let e = 0; e < this.rowsFinal.length; e++) n.push(e);
        else
          for (let e in this.sortedIndexes)
            Object.prototype.hasOwnProperty.call(this.sortedIndexes, e) &&
              this.visibleRows[this.sortedIndexes[e]] &&
              n.push(this.sortedIndexes[e]);
      return n;
    },
    generatedRows() {
      let n = {};
      if (this.generatedUpdatedKey)
        for (let e = 0; e < this.rowsFinal.length; e++) {
          let t = this.rowsFinal[e].cells
              ? this.rowsFinal[e].cells
              : this.rowsFinal[e],
            s = {};
          for (let i = 0; i < this.hiddenBreakpoints.length; i++) {
            let a = this.hiddenBreakpoints[i];
            for (let o = 0; o < this.configFinal.columns.length; o++) {
              let r = this.configFinal.columns[o];
              !(
                this.configFinal.hiddenCols[o] ||
                (!this.configFinal.ignoreEmpty[o] &&
                  this.configFinal.hideEmptyColumns &&
                  (this.isColEmpty(o) || this.isColEmpty(o, e))) ||
                this.emptyColumns[o]
              ) &&
                r.breakpoint &&
                (r.breakpoint.toLocaleLowerCase() === "all" ||
                  r.breakpoint.toLocaleLowerCase() === a) &&
                !r.sticky &&
                !r.alwaysExpanded &&
                (s[o] = t[o]);
            }
          }
          n[e] = s;
        }
      return n;
    },
    stickyRows() {
      let n = {};
      for (let e = 0; e < this.rowsFinal.length; e++) {
        let t = this.rowsFinal[e].cells
            ? this.rowsFinal[e].cells
            : this.rowsFinal[e],
          s = {};
        for (let i = 0; i < this.hiddenBreakpoints.length; i++) {
          let a = this.hiddenBreakpoints[i];
          for (let o = 0; o < this.configFinal.columns.length; o++) {
            let r = this.configFinal.columns[o];
            const l =
              this.configFinal.hiddenCols[o] ||
              (!this.configFinal.ignoreEmpty[o] &&
                this.configFinal.hideEmptyColumns &&
                (this.isColEmpty(o) || this.isColEmpty(o, e))) ||
              this.emptyColumns[o];
            ((!l && r.sticky) ||
              (!l &&
                r.breakpoint &&
                (r.breakpoint.toLocaleLowerCase() === "all" ||
                  r.breakpoint.toLocaleLowerCase() === a) &&
                r.alwaysExpanded)) &&
              (s[o] = t[o]);
          }
        }
        n[e] = s;
      }
      return n;
    },
    allSelectedProperty: {
      get() {
        return this.allSelectedCustom === null
          ? this.configFinal.defaultSelected
          : this.allSelectedCustom;
      },
      set(n) {
        this.allSelectedCustom = n;
      },
    },
    currentRowsPerPageProperty: {
      get() {
        return this.customRowsPerPage
          ? this.customRowsPerPage
          : this.currentRowsPerPage;
      },
      set(n) {
        this.customRowsPerPage = n;
      },
    },
    pageSort: {
      get() {
        return this.customPageSort === null
          ? this.configFinal.pageSort
          : this.customPageSort;
      },
      set(n) {
        this.customPageSort = n;
      },
    },
    multiSort: {
      get() {
        return this.customMultiSort === null
          ? this.configFinal.multiSort
          : this.customMultiSort;
      },
      set(n) {
        this.customMultiSort = n;
      },
    },
    currentRowsPerPage() {
      return this.customRowsPerPage
        ? this.customRowsPerPage
        : this.configFinal.pagination
        ? this.configFinal.pagination
        : "All";
    },
    hasGeneratedRows() {
      for (let n in this.generatedRows)
        if (
          Object.prototype.hasOwnProperty.call(this.generatedRows, n) &&
          Object.keys(this.generatedRows[n]).length
        )
          return !0;
      return !1;
    },
    cellClassesParsed() {
      let n = [];
      for (let e = 0; e < this.rowsFinal.length; e++) {
        n.push([]);
        let t = this.rowsFinal[e].align,
          s = this.rowsFinal[e].cells
            ? this.rowsFinal[e].cells
            : this.rowsFinal[e];
        for (let i = 0; i < s.length; i++) {
          let a = [],
            o = this.configFinal.alignments[i];
          if (
            ((s[i].align || t || o) &&
              (s[i].align
                ? a.push("text-" + s[i].align)
                : t
                ? a.push("text-" + t)
                : a.push("text-" + o)),
            s[i].classes)
          ) {
            let r = s[i].classes.split(" ");
            Array.prototype.push.apply(a, r);
          }
          n[e].push(a.join(" "));
        }
      }
      return n;
    },
    hiddenColumns() {
      const n = {};
      for (let e = 0; e < this.visibleRowIndexes.length; e++) {
        let t = 0;
        const s = this.visibleRowIndexes[e];
        for (let i = 0; i < this.hiddenBreakpoints.length; i++) {
          let a = this.hiddenBreakpoints[i];
          for (let o = 0; o < this.configFinal.columns.length; o++) {
            let r = this.configFinal.columns[o];
            if (
              !(
                this.configFinal.hiddenCols[o] ||
                (!this.configFinal.ignoreEmpty[o] &&
                  this.configFinal.hideEmptyColumns &&
                  (this.isColEmpty(o) || this.isColEmpty(o, s))) ||
                this.emptyColumns[o]
              ) &&
              r.breakpoint &&
              (r.breakpoint.toLocaleLowerCase() === "all" ||
                r.breakpoint.toLocaleLowerCase() === a)
            ) {
              t++;
              break;
            }
          }
        }
        n[s] = t;
      }
      return n;
    },
    rowsFinal() {
      return this.configFinal.ajaxUrl
        ? this.ajaxRows
        : this.rows
        ? this.rows
        : [];
    },
    someSelected() {
      return Object.values(this.selected).filter((n) => n).length > 0;
    },
    numberOfSorts() {
      return Object.keys(this.currentSortIndexes).length;
    },
    paginationOptionsFilled() {
      return (this.configFinal.disallowAllOption ? [] : ["All"]).concat(
        this.paginationOptions
      );
    },
    sortingColumns() {
      let n = {};
      for (let e in this.currentSortIndexes)
        Object.prototype.hasOwnProperty.call(this.currentSortIndexes, e) &&
          (n[e] = this.configFinal.columns[e]);
      return n;
    },
    headerClass() {
      let n = [];
      for (let e = 0; e < this.configFinal.number; e++) {
        let t = [];
        this.configFinal.alignments[e] &&
          t.push("text-" + this.configFinal.alignments[e]),
          this.configFinal.sorts[e] &&
            (t.push("sort-header"),
            this.currentSortIndexes[e] && t.push("active")),
          n.push(
            t.join(" ") +
              "  quintable--table-container--table--header-row--th " +
              this.configFinal.columnClasses[e]
          );
      }
      return n;
    },
    pageRange() {
      return Math.min(this.configFinal.pageRange, this.pages);
    },
    pages() {
      return this.ajaxPages
        ? this.ajaxPages
        : !this.currentRowsPerPage || this.currentRowsPerPage === "All"
        ? 1
        : Math.max(
            1,
            Math.ceil(this.numberOfVisibleRows / this.currentRowsPerPage)
          );
    },
    numberOfVisibleRows() {
      return this.configFinal.ajaxUrl
        ? this.ajaxAll
        : this.filteredRows.filter((n) => n).length;
    },
    visiblePages() {
      let n = [],
        e = 0;
      if (this.pages < this.pageRange || this.currentPage === 1) e = 1;
      else if (this.currentPage === this.pages)
        e = this.currentPage - (this.pageRange - 1);
      else {
        let t;
        this.pageRange % 2 === 0
          ? (t = this.pageRange / 2)
          : ((t = (this.pageRange - 1) / 2),
            this.currentPage + t > this.pages && t++),
          (e = this.currentPage - t);
      }
      e = Math.max(e + this.pageOffset, 1);
      for (let t = 0; t < this.pageRange && !(t + e > this.pages); t++)
        n.push(t + e);
      return n;
    },
    filterActive() {
      return this.filtersFinal && Object.keys(this.filtersFinal).length;
    },
    filteredRows() {
      let n = [];
      if (this.configFinal.ajaxUrl) return this.rowsFinal;
      for (let e = 0; e < this.rowsFinal.length; e++) n.push(!0);
      if (
        (!this.configFinal.search && !this.filterActive) ||
        (!this.filterActive &&
          this.configFinal.search &&
          this.query.length < this.configFinal.searchLength)
      )
        return n;
      for (let e = 0; e < this.rowsFinal.length; e++) {
        let t = this.rowsFinal[e].cells
            ? this.rowsFinal[e].cells
            : this.rowsFinal[e],
          s = !1,
          i = !1;
        if (
          this.configFinal.search &&
          this.query.length >= this.configFinal.searchLength
        ) {
          for (let a = 0; a < t.length; a++) {
            let o = t[a],
              r = o.html ? o.html : o.text;
            if (r) {
              if (
                this.configFinal.useFuzzySearch &&
                ae((r + "").toLowerCase(), (this.query + "").toLowerCase())
                  .score > 6
              ) {
                s = !0;
                break;
              }
              if (
                (r + "")
                  .toLowerCase()
                  .indexOf((this.query + "").toLowerCase()) !== -1
              ) {
                s = !0;
                break;
              }
            }
          }
          if (t.keywords)
            for (let a = 0; a < t.keywords.length; a++) {
              if (
                this.configFinal.useFuzzySearch &&
                ae(
                  (t.keywords[a] + "").toLowerCase(),
                  (this.query + "").toLowerCase()
                ).score > 6
              ) {
                s = !0;
                break;
              }
              if (
                (t.keywords[a] + "")
                  .toLowerCase()
                  .indexOf((this.query + "").toLowerCase()) !== -1
              ) {
                s = !0;
                break;
              }
            }
          i = !0;
        }
        if (this.filterActive && !this.rowsFinal[e].filters) s = !1;
        else if (((i && s) || !i) && this.filterActive) {
          if (this.filterGroups.length)
            s = this.doFiltering(this.rowsFinal[e].filters);
          else {
            let a = { items: [], relation: this.configFinal.filterRelation };
            for (let o in this.filtersFinal)
              Object.prototype.hasOwnProperty.call(this.filtersFinal, o) &&
                a.items.push({ name: o });
            (s = this.doFilteringForGroup(
              this.filtersFinal,
              this.rowsFinal[e].filters,
              a
            )),
              this.DEBUG &&
                console.log("FILTER GROUPS CALCULATED", this.filterGroups);
          }
          this.DEBUG &&
            (console.log(`
`),
            console.log("ROW " + e, s, this.rowsFinal[e].filters),
            console.log(`
`));
        }
        n[e] = s;
      }
      return n;
    },
    noRows() {
      return !this.numberOfVisibleRows;
    },
    firstVisibleRow() {
      return this.currentRowsPerPage === "All" || this.pages === 1
        ? 1
        : this.currentPage * this.currentRowsPerPage -
            this.currentRowsPerPage +
            1;
    },
    lastVisibleRow() {
      return this.currentRowsPerPage === "All" || this.pages === 1
        ? this.numberOfVisibleRows
        : Math.min(
            this.firstVisibleRow + this.currentRowsPerPage - 1,
            this.numberOfVisibleRows
          );
    },
    ajaxLoading() {
      return this.loading || this.fetching;
    },
    showHeadlines() {
      let n = [];
      for (let e = 0; e < this.configFinal.number; e++)
        this.configFinal.headlines[e] &&
        (!this.configFinal.columns[e].showHeadlineBreakpoint ||
          (this.configFinal.columns[e].showHeadlineBreakpoint &&
            this.hiddenBreakpoints.findIndex(
              (t) =>
                this.configFinal.columns[e] &&
                t === this.configFinal.columns[e].showHeadlineBreakpoint
            ) !== -1)) &&
        (!this.configFinal.columns[e].hideHeadlineBreakpoint ||
          (this.configFinal.columns[e].hideHeadlineBreakpoint &&
            this.hiddenBreakpoints.findIndex(
              (t) =>
                this.configFinal.columns[e] &&
                t === this.configFinal.columns[e].hideHeadlineBreakpoint
            ) === -1))
          ? n.push(!0)
          : n.push(!1);
      return n;
    },
    operators() {
      return Object.keys(this.operatorFunctions);
    },
    emptyColumns() {
      const n = {},
        e = this.configFinal.ignoreSortEmptyColumns;
      for (let t = 0; t < this.configFinal.number; t++) {
        const s = this.configFinal.ignoreEmpty[t],
          i = this.configFinal.sorts[t];
        !this.configFinal.hideEmptyColumns ||
        s ||
        (e === "none" && i) ||
        (e === "active" &&
          Object.keys(this.currentSortIndexes).includes(t + ""))
          ? (n[t] = !1)
          : (n[t] = this.isColEmpty(t));
      }
      return n;
    },
    filtersFinal() {
      return !this.configFinal.storeState || !this.storedState.filters
        ? this.filters
        : this.storedState.filters;
    },
    rowClasses() {
      const n = {};
      for (let e = 0; e < this.visibleRowIndexes.length; e++) {
        const t = this.visibleRowIndexes[e],
          s = [];
        this.rowsFinal[t].classes && s.push(this.rowsFinal[t].classes),
          this.hoveredRow === t && s.push(this.configFinal.hoverClass),
          this.activeRow === t && s.push(this.configFinal.activeClass),
          this.openRows[t] && s.push("row-expanded"),
          this.hiddenColumns[t] > 0 &&
            !this.openRows[t] &&
            s.push("row-collapsed"),
          (n[t] = s.join(" "));
      }
      return n;
    },
  },
  watch: {
    rowsFinal: {
      handler(n) {
        if (n && n.length)
          for (let e = 0; e < n.length; e++) {
            let t = n[e].cells ? n[e].cells : n[e];
            t.length !== this.config.columns.length &&
              console.error(
                `Column count on row index ${e} doesn't fit for column config! expected: ${this.config.columns.length}, got: ${t.length}` +
                  (this.configFinal.ajaxUrl
                    ? ` | URL: ${this.configFinal.ajaxUrl}`
                    : "") +
                  (this.identifier ? ` | IDENTIFIER: ${this.identifier}` : ""),
                n[e]
              );
          }
      },
      immediate: !0,
    },
    preSelectedRows(n) {
      if (n) {
        for (let e = 0; e < this.rowsFinal.length; e++)
          this.$set(this.selected, e, !1);
        if (n && n.length) {
          let e = 0;
          const t = this.configFinal.selectAllRows
            ? this.rowsFinal.map((s, i) => i)
            : this.visibleRowIndexes;
          for (let s = 0; s < n.length; s++) {
            const i = n[s].key,
              a = n[s].value;
            for (let o = 0; o < t.length; o++) {
              const r = t[o];
              this.rowsFinal[r][i] === a &&
                (this.$set(this.selected, r, !0), e++);
            }
          }
          this.configFinal.selectAllRows
            ? (this.allSelectedCustom = e && e === this.rowsFinal.length)
            : (this.allSelectedCustom =
                e && e === this.visibleRows.filter((s) => s).length);
        } else this.allSelectedCustom = !1;
      }
    },
    filters: {
      handler() {
        if (this.configFinal.ajaxUrl) {
          const n = !(this.configFinal.storeState && this.storedState.filters);
          (this.pageSort = !1), this.loadViaAjax(n, n, "FILTERS");
        }
        this.pageSort &&
          ((this.currentSortIndexes = {}),
          this.resetSorts(),
          this.recomputeEssentials()),
          this.configFinal.storeState &&
            (this.$delete(this.storedState, "filters"),
            localStorage.setItem(
              `vue-quintable-${this.identifier}-filters`,
              JSON.stringify(this.filtersFinal)
            ));
      },
      deep: !0,
    },
    filtersFinal(n) {
      this.$emit("update:filters", n, "update:filters");
    },
    updated(n) {
      this.configFinal.ajaxUrl &&
        (n && n.clear
          ? this.loadViaAjax(!0, !0, "UPDATED")
          : n && this.loadViaAjax(!1, !0, "UPDATED"));
    },
    loading() {
      this.loaderHeight = this.$refs["height-wrapper"]
        ? this.$refs["height-wrapper"].clientHeight
        : 0;
    },
    filteredRows: {
      handler(n, e) {
        if (JSON.stringify(n) === JSON.stringify(e) || this.configFinal.ajaxUrl)
          return;
        this.visibleRowIndexes.findIndex((i) => i === this.activeRow) < 0 &&
          (this.activeRow = null),
          this.currentPage !== 1
            ? (this.currentPage = 1)
            : this.configFinal.keepSelect ||
              this.resetSelect("filteredRows watcher");
        const s = [];
        for (let i = 0; i < n.length; i++) {
          const a = i.toString();
          n[i] &&
            s.push(
              this.rowsFinal[this.sortedIndexes[a] ? this.sortedIndexes[a] : i]
            );
        }
        this.$emit("filtered:rows", s, "filtered:rows");
      },
      deep: !0,
      immediate: !0,
    },
    hiddenBreakpoints(n) {
      this.initBreakpoints ||
        this.$emit("change:breakpoints", n, "change:breakpoints"),
        (this.initBreakpoints = !1);
    },
    hoveredRow(n) {
      n !== null && this.$emit("hover:row", this.rowsFinal[n], "hover:row");
    },
    query(n, e) {
      if (((this.lastQuery = e), this.configFinal.ajaxUrl)) {
        this.pageSort = !1;
        const t = !(this.configFinal.storeState && this.storedState.query);
        clearTimeout(this.queryAjaxTimeout),
          (this.queryAjaxTimeout = setTimeout(() => {
            this.loadViaAjax(t, t, "QUERY");
          }, this.configFinal.ajaxRequestDelay));
      }
      n.length >= this.configFinal.searchLength &&
      this.lastSearchQueryUpdated !== n
        ? (this.$emit("update:search", n, "update:search"),
          (this.lastSearchQueryUpdated = n))
        : this.lastSearchQueryUpdated !== null &&
          ((this.lastSearchQueryUpdated = null),
          this.$emit("update:search", null, "update:search")),
        this.pageSort &&
          ((this.currentSortIndexes = {}),
          this.resetSorts(),
          this.recomputeEssentials()),
        this.configFinal.storeState &&
          (this.$delete(this.storedState, "query"),
          localStorage.setItem(
            `vue-quintable-${this.identifier}-query`,
            this.query
          ));
    },
    currentRowsPerPage(n) {
      this.$emit("update:rows-per-page", n, "update:rows-per-page");
      const e = !(
        this.configFinal.storeState && this.storedState["rows-per-page"]
      );
      if (
        (this.configFinal.storeState &&
          (this.$delete(this.storedState, "rows-per-page"),
          localStorage.setItem(
            `vue-quintable-${this.identifier}-rows-per-page`,
            this.currentRowsPerPage
          )),
        this.configFinal.ajaxUrl)
      ) {
        this.loadViaAjax(e, e, "PAGE_ROWS");
        return;
      }
      this.currentPage !== 1
        ? (this.currentPage = 1)
        : this.configFinal.selectAllRows ||
          this.resetSelect("currentRowsPerPage watcher");
    },
    rows() {
      this.clearLists(),
        this.initLists(),
        (this.activeRow = null),
        this.$nextTick(() => {
          this.recomputeEssentials(),
            this.$forceUpdate(),
            this.configFinal.defaultSelected &&
              ((this.allSelectedCustom = null), this.checkAll(!0));
        });
    },
    config(n) {
      if (typeof n != "object") throw "config must be an object";
      this.dynamicConfig ||
        (this.initLists(),
        this.$forceUpdate(),
        (this.activeRow = null),
        this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "CONFIG"),
        this.configFinal.defaultSelected && this.checkAll(!0));
    },
    selected: {
      handler(n) {
        let e = [];
        for (let t in this.sortedIndexes)
          if (
            Object.prototype.hasOwnProperty.call(this.sortedIndexes, t) &&
            n[this.sortedIndexes[t]]
          ) {
            const s = this.rowsFinal[this.sortedIndexes[t]];
            s.disableSelect || e.push(s);
          }
        this.configFinal.storeState &&
          localStorage.setItem(
            `vue-quintable-${this.identifier}-selected-rows`,
            JSON.stringify(n)
          ),
          this.$emit("input", e),
          this.$emit("update:selected-rows", e, "update:selected-rows");
      },
      deep: !0,
    },
    currentPage(n) {
      (this.pageOffset = 0),
        (this.activeRow = null),
        this.$emit("update:page", n, "update:page");
      const e = !(
        this.configFinal.storeState && this.storedState["current-page"]
      );
      if (
        (this.configFinal.storeState &&
          (this.$delete(this.storedState, "current-page"),
          localStorage.setItem(
            `vue-quintable-${this.identifier}-current-page`,
            this.currentPage
          )),
        this.configFinal.ajaxUrl)
      ) {
        this.resetSelect("currentPage watcher ajax"),
          this.loadViaAjax(!1, e, "PAGE");
        return;
      }
      this.configFinal.selectAllRows || this.resetSelect("currentPage watcher"),
        this.pageSort && ((this.currentSortIndexes = {}), this.resetSorts()),
        this.recomputeEssentials();
    },
    customMultiSort(n) {
      if (!n && Object.keys(this.currentSortIndexes).length > 1) {
        let e, t;
        for (let s in this.currentSortIndexes)
          if (
            Object.prototype.hasOwnProperty.call(this.currentSortIndexes, s) &&
            this.currentSortIndexes[s].order === 0
          ) {
            (e = this.currentSortIndexes[s]), (t = s);
            break;
          }
        (this.currentSortIndexes = {}),
          this.$set(this.currentSortIndexes, t, e),
          this.sort();
      }
    },
    pageSort() {
      (this.currentSortIndexes = {}),
        this.resetSorts(),
        this.recomputeEssentials();
    },
    sortOrder: {
      immediate: !0,
      handler() {
        this.currentSortIndexes = {};
        for (let n = 0; n < this.sortOrder.length; n++)
          typeof this.sortOrder[n] == "object"
            ? this.setSortColumn(this.sortOrder[n].index, this.sortOrder[n].asc)
            : typeof this.sortOrder[n] == "number" &&
              this.setSortColumn(this.sortOrder[n]);
      },
    },
    activeRow(n) {
      const e = this.visibleRowIndexes.findIndex((t) => t === n);
      this.$emit("active:row", this.rowsFinal[n], "active:row", e);
    },
  },
  methods: {
    setSearchQuery(n) {
      this.query = n;
    },
    valueToString: function (n) {
      switch (n) {
        case "":
        case null:
        case !1:
        case void 0:
          return "";
        case 0:
        case "0":
        default:
          return String(n);
      }
    },
    isColEmpty(n, e = -1) {
      return (
        (e > -1 ? [e] : this.visibleRowIndexes)
          .map((i) => this.rowsFinal[i])
          .filter((i) => {
            const a = i.cells ? i.cells : i;
            return typeof a[n].isEmpty == "boolean" && a[n].isEmpty === !0
              ? !1
              : !!(
                  (typeof a[n].isEmpty == "boolean" && a[n].isEmpty === !1) ||
                  (typeof a[n].text < "u" && this.valueToString(a[n].text)) ||
                  (typeof a[n].html < "u" && this.valueToString(a[n].html))
                );
          }).length <= 0
      );
    },
    handleComponentEvent(n) {
      this.$emit("component:event", n, "component:event");
    },
    updatePageOffset(n) {
      let e = this.pageOffset + this.pageRange * n;
      if (n > 0) {
        let t = Math.min(e, this.pages - this.pageRange);
        this.pageOffset = Math.min(t, this.pages - this.currentPage);
      } else
        n < 0
          ? (this.pageOffset = Math.max(e, -(this.pages - this.pageRange)))
          : (this.pageOffset = 0);
    },
    cellFormatters(n, e) {
      if (typeof this.configFinal.columns[n].cellFormatter == "function") {
        let t = this.configFinal.columns[n].cellFormatter(e);
        return typeof t != "object" && (t = { value: t }), t;
      }
      return this.valueToString(e.html)
        ? e.html
        : this.valueToString(e.text)
        ? e.text
        : "";
    },
    checkListener(n, e) {
      let t = Object.keys(this.selected)
        .slice()
        .map(
          (s) =>
            !!this.selected[s] ||
            !!(
              this.rowsFinal[parseInt(s)] &&
              this.rowsFinal[parseInt(s)].disableSelect
            )
        );
      (t[e] = !!n),
        this.configFinal.selectAllRows
          ? t.indexOf(!1) === -1
            ? (this.allSelectedProperty = !0)
            : (this.allSelectedProperty = !1)
          : ((t = t.filter((s, i) => this.visibleRowIndexes.includes(i))),
            t.indexOf(!1) !== -1
              ? (this.allSelectedProperty = !1)
              : t.indexOf(!1) === -1 && (this.allSelectedProperty = !0));
    },
    hasSomeParentTheClass(n, e) {
      return n instanceof HTMLElement && n.classList.contains(e)
        ? !0
        : n instanceof Element &&
            n.parentNode &&
            this.hasSomeParentTheClass(n.parentNode, e);
    },
    hasSomeParentTagName(n, e) {
      return n instanceof HTMLElement &&
        n.tagName.toLowerCase() === e.toLowerCase()
        ? !0
        : n instanceof Element &&
            n.parentNode &&
            this.hasSomeParentTagName(n.parentNode, e);
    },
    onRowAuxClick(n, e) {
      if (n.button === 1) {
        const t = parseInt(e);
        this.$emit(
          "auxclick:row",
          this.rowsFinal[t],
          "auxclick:row",
          n.target,
          n,
          t
        );
      }
    },
    onRowMousedown(n) {
      n.which === 2 && n.preventDefault();
    },
    onRowClick(n, e) {
      if ((n.target || {}).type === "checkbox") return;
      if (
        this.hasSomeParentTheClass(n.target, "generated-table") &&
        !this.nested
      )
        return;
      let t = this.hasSomeParentTagName(n.target, "a"),
        s = this.hasSomeParentTheClass(n.target, "prevent-toggle");
      const i = e.toString(),
        a = parseInt(e);
      this.hiddenColumns[i] &&
        !t &&
        !s &&
        (this.openRows[i]
          ? (this.$set(this.openRows, i, !1),
            this.$emit(
              "expand:row",
              this.rowsFinal[this.sortedIndexes[i]],
              "collapse:row",
              this.sortedIndexes[i]
            ))
          : (this.$set(this.openRows, i, !0),
            this.$emit(
              "expand:row",
              this.rowsFinal[this.sortedIndexes[i]],
              "expand:row",
              this.sortedIndexes[i]
            )),
        (this.generatedUpdatedKey = Date.now())),
        this.configFinal.enableRowTabIndex &&
          (this.activeRow === a
            ? (this.activeRow = null)
            : (this.activeRow = a)),
        this.$emit("click:row", this.rowsFinal[a], "click:row", n.target, n, a);
    },
    onCellClick(n, e) {
      this.$emit("click:cell", e, "click:cell", n.target, n);
    },
    onCellAuxClick(n, e) {
      n.button === 1 &&
        this.$emit("auxclick:cell", e, "auxclick:cell", n.target, n);
    },
    onCellMousedown(n) {
      n.which === 2 && n.preventDefault();
    },
    onMouseenterRow(n) {
      this.hoveredRow !== n && (this.hoveredRow = n);
    },
    onMouseleaveTable() {
      this.hoveredRow = null;
    },
    removeSort(n) {
      for (let e in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, e)) {
          let t = this.currentSortIndexes[e];
          t.order > this.currentSortIndexes[n].order && t.order--,
            this.$set(this.currentSortIndexes, e, t);
        }
      this.$delete(this.currentSortIndexes, n),
        this.numberOfSorts === 0
          ? (this.resetSorts(),
            this.currentPage !== 1
              ? (this.currentPage = 1)
              : this.recomputeEssentials(),
            this.configFinal.ajaxUrl &&
              !this.pageSort &&
              this.loadViaAjax(!0, !0, "SORT"))
          : this.sort();
    },
    resetSorts() {
      for (let n = 0; n < this.rowsFinal.length; n++) {
        const e = n.toString();
        this.$set(this.sortedIndexes, e, n);
      }
    },
    checkAll(n = !1) {
      let e = this.allSelectedProperty;
      n && (e = !0);
      let t = 0;
      for (let s in this.sortedIndexes)
        Object.prototype.hasOwnProperty.call(this.sortedIndexes, s) &&
          ((s = parseInt(s)),
          (!this.configFinal.selectAllRows &&
            this.visibleRows[this.sortedIndexes[s]]) ||
          (this.configFinal.selectAllRows &&
            this.filteredRows[this.sortedIndexes[s]])
            ? (this.$set(this.selected, this.sortedIndexes[s], e), t++)
            : this.$set(this.selected, this.sortedIndexes[s], !1));
      e &&
        (this.configFinal.selectAllRows
          ? (this.allSelectedCustom = t && t === this.rowsFinal.length)
          : (this.allSelectedCustom =
              t && t === this.visibleRows.filter((s) => s).length));
    },
    doFiltering(n) {
      let e = [];
      for (let t = 0; t < this.filterGroups.length; t++)
        e.push(
          this.doFilteringForGroup(this.filtersFinal, n, this.filterGroups[t])
        ),
          this.DEBUG &&
            t < this.filterGroups.length - 1 &&
            console.log(this.configFinal.filterGroupRelation);
      return (
        this.DEBUG &&
          console.log(
            "RESULTS FOR GROUPS:",
            e,
            this.configFinal.filterGroupRelation
          ),
        this.configFinal.filterGroupRelation === "AND"
          ? e.indexOf(!1) === -1
          : this.configFinal.filterGroupRelation === "OR"
          ? e.indexOf(!0) !== -1
          : !0
      );
    },
    doFilteringForGroup(n, e, t, s = 0) {
      let i = "   ";
      for (let o = 0; o < s; o++) i += "   ";
      if (this.DEBUG) {
        if (t.items) {
          let o = i,
            r = t.items.slice(),
            l = function (c, u) {
              return c.name === void 0 ? 1 : u.name === void 0 ? -1 : 0;
            };
          r = r.sort(l);
          for (let c = 0; c < r.length; c++)
            r[c].name &&
              ((o += r[c].name),
              c < r.length - 1 && (o += " " + t.relation + " "));
          console.log(o);
        }
        console.log(i, "GROUP:", t);
      }
      let a = !1;
      if (t.relation === "AND") {
        for (let o in n)
          if (Object.prototype.hasOwnProperty.call(n, o)) {
            if (
              this.filterGroups.length &&
              !this.findInFilterGroups(o, this.filterGroups)
            )
              continue;
            let r = !0;
            for (let l = 0; l < t.items.length; l++) {
              let c = t.items[l];
              if (c.name && e[c.name] === void 0) {
                r = !1;
                break;
              }
            }
            if (r)
              for (let l = 0; l < t.items.length; l++) {
                let c = t.items[l];
                if (
                  ((a = !0),
                  c.items && (a = this.doFilteringForGroup(n, e, c, s + 1)),
                  !a)
                )
                  break;
                if (typeof n[c.name] > "u") continue;
                let u =
                    typeof n[c.name] == "object" &&
                    n[c.name] !== null &&
                    n[c.name].operator &&
                    this.operators.includes(n[c.name].operator)
                      ? n[c.name].operator
                      : this.defaultOperator,
                  h = this.getFilterValues(n[c.name]);
                const p =
                  typeof n[c.name].compare == "function"
                    ? n[c.name].compare
                    : this.operatorFunctions[u];
                for (let _ = 0; _ < h.length; _++)
                  if (!p(h[_], e[c.name])) {
                    a = !1;
                    break;
                  }
                if (!a) break;
              }
          }
        return a;
      } else if (t.relation === "OR" || t.items) {
        for (let o in n)
          if (Object.prototype.hasOwnProperty.call(n, o)) {
            if (
              this.filterGroups.length &&
              !this.findInFilterGroups(o, this.filterGroups)
            )
              continue;
            for (let r = 0; r < t.items.length; r++) {
              let l = t.items[r];
              if (
                l.items &&
                ((a = this.doFilteringForGroup(n, e, l, s + 1)), a)
              )
                break;
              if (typeof n[l.name] > "u") continue;
              let c =
                  typeof n[l.name] == "object" &&
                  n[l.name] !== null &&
                  n[l.name].operator &&
                  this.operators.includes(n[l.name].operator)
                    ? n[l.name].operator
                    : this.defaultOperator,
                u = this.getFilterValues(n[l.name]);
              const h =
                typeof n[l.name].compare == "function"
                  ? n[l.name].compare
                  : this.operatorFunctions[c];
              for (let p = 0; p < u.length; p++)
                if (h(u[p], e[l.name])) {
                  a = !0;
                  break;
                }
              if (a) break;
            }
          }
        return a;
      } else return !0;
    },
    getFilterValues(n) {
      return n instanceof RegExp || typeof n != "object" || n === null
        ? [n]
        : Array.isArray(n)
        ? n
        : this.getFilterValues(n.values);
    },
    findInFilterGroups(n, e, t = 0) {
      if (!e) return !1;
      let s = !1;
      for (let i = 0; i < e.length; i++) {
        let a = e[i];
        if (a.items && ((s = this.findInFilterGroups(n, a.items, t + 1)), s))
          break;
        if (a.name === n) {
          s = !0;
          break;
        }
      }
      return s;
    },
    gotoPage(n) {
      n === "prev"
        ? this.currentPage - 1 > 0 && this.currentPage--
        : n === "next"
        ? this.currentPage + 1 <= this.pages && this.currentPage++
        : n === "first"
        ? (this.currentPage = 1)
        : n === "last"
        ? (this.currentPage = this.pages)
        : (this.currentPage = n);
    },
    setSortColumn(n, e) {
      const t = parseInt(n),
        s = n.toString();
      if (!this.configFinal.sorts[t]) return;
      let i;
      this.currentSortIndexes[s]
        ? ((i = this.currentSortIndexes[s]), (i.asc = !i.asc))
        : (this.multiSort || (this.currentSortIndexes = {}),
          (i = {
            headline: this.configFinal.headlines[t],
            index: t,
            asc:
              this.configFinal.sorts[t] === !0
                ? !0
                : this.configFinal.sorts[t] === "ASC",
            order: this.numberOfSorts,
          })),
        typeof e < "u" && (i.asc = e),
        this.$set(this.currentSortIndexes, s, i),
        this.configFinal.storeState &&
          localStorage.setItem(
            `vue-quintable-${this.identifier}-sort-indexes`,
            JSON.stringify(this.currentSortIndexes)
          ),
        this.$emit("update:sort", this.currentSortIndexes, "update:sort"),
        this.sort();
    },
    sort(n = !1) {
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        this.loadViaAjax(!n, !n, "SORT");
        return;
      }
      let e = this.rowsFinal.slice(),
        t = [],
        s = [],
        i = {};
      if (this.pageSort) {
        if (((s = this.visibleRowIndexes.slice()), !s.length)) {
          const h = this.configFinal.pagination
            ? this.configFinal.pagination
            : this.rowsFinal.length;
          for (let p = 0; p < h; p++) s.push(p);
        }
        let u = 0;
        for (let h = 0; h < e.length; h++)
          (e[h].index = h),
            s.indexOf(h) !== -1 &&
              (u < this.configFinal.pagination && t.push(e[h]), u++);
        if (Object.keys(this.sortedIndexes).length)
          i = Object.assign({}, this.sortedIndexes);
        else for (let h = 0; h < e.length; h++) this.$set(i, h.toString(), h);
      } else {
        t = this.rowsFinal.slice();
        for (let u = 0; u < t.length; u++) t[u].index = u;
      }
      let a = [];
      for (let u in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, u)) {
          let h = this.currentSortIndexes[u];
          (h.index = u), a.push(h);
        }
      a.sort(function (u, h) {
        return u.order - h.order;
      });
      let o = (u, h, p, _) => {
        _ = _ || 0;
        let C = p[_],
          x = C.index,
          S = u.cells ? u.cells : u,
          k = h.cells ? h.cells : h,
          w =
            typeof S[x].sortValue < "u" && S[x].sortValue !== null
              ? S[x].sortValue
              : S[x].html
              ? S[x].html
              : S[x].text,
          b =
            typeof k[x].sortValue < "u" && k[x].sortValue !== null
              ? k[x].sortValue
              : k[x].html
              ? k[x].html
              : k[x].text;
        return (
          typeof w == "string" && (w = w.toLowerCase()),
          typeof b == "string" && (b = b.toLowerCase()),
          isNaN(w)
            ? ((typeof w == "string" && w.match(/^-?\d+$/)) ||
                (typeof w == "string" && w.match(/^\d+\.\d+$/))) &&
              (w = parseFloat(w))
            : (w = parseFloat(w)),
          isNaN(b)
            ? ((typeof b == "string" && b.match(/^-?\d+$/)) ||
                (typeof b == "string" && b.match(/^\d+\.\d+$/))) &&
              (b = parseFloat(b))
            : (b = parseFloat(b)),
          C.asc
            ? w > b
              ? 1
              : w < b
              ? -1
              : p[_ + 1]
              ? o(u, h, p, _ + 1)
              : 1
            : w < b
            ? 1
            : w > b
            ? -1
            : p[_ + 1]
            ? o(u, h, p, _ + 1)
            : -1
        );
      };
      t.sort(function (u, h) {
        return o(u, h, a);
      });
      const r = [];
      let l = 0,
        c = 0;
      for (let u = 0; u < e.length; u++) {
        const h = u.toString();
        this.pageSort && s.indexOf(u) !== -1
          ? (l < this.configFinal.pagination
              ? (r.push(t[c]), c++)
              : r.push(e[i[h]]),
            l++)
          : this.pageSort
          ? r.push(e[i[h]])
          : r.push(t[u]);
      }
      for (let u = 0; u < r.length; u++) {
        const h = u.toString();
        this.$set(this.sortedIndexes, h, parseInt(r[u].index));
      }
      !this.pageSort && !n && (this.currentPage = 1),
        !this.configFinal.selectAllRows &&
          !this.pageSort &&
          !n &&
          !this.configFinal.keepSelect &&
          this.resetSelect("sort method"),
        this.recomputeEssentials();
    },
    recomputeEssentials() {
      this.$nextTick(() => {
        (this.rowsUpdatedKey = Date.now()),
          (this.indexesUpdatedKey = Date.now()),
          (this.generatedUpdatedKey = Date.now());
      });
    },
    initLists() {
      if (this.rowsFinal)
        for (let n = 0; n < this.rowsFinal.length; n++) {
          const e = n.toString();
          typeof this.sortedIndexes[e] > "u" &&
            this.$set(this.sortedIndexes, e, n),
            typeof this.selected[e] > "u" && this.$set(this.selected, e, !1),
            this.configFinal.expandedAll || this.rowsFinal[n].expanded
              ? this.$set(this.openRows, e, !0)
              : this.$set(this.openRows, e, !1);
        }
    },
    clearLists(n = !0) {
      n && (this.selected = {}),
        (this.openRows = {}),
        (this.sortedIndexes = {});
    },
    resetSelect(n) {
      this.DEBUG && console.log("CALLED FROM:", n),
        (this.allSelectedProperty = !1);
      for (let e = 0; e < this.rowsFinal.length; e++)
        this.$set(this.selected, e, !1);
    },
    loadViaAjax(n = !1, e = !0, t = null) {
      this.DEBUG && console.log("CALLED FROM:", t);
      let s = this.query;
      if (
        s &&
        s.length < this.configFinal.searchLength &&
        (this.lastQuery.length < s.length ||
          this.lastQuery.length < this.configFinal.searchLength)
      )
        return;
      if (!s && this.lastQuery) {
        const o = this.lastQuery;
        if (((this.lastQuery = ""), o.length < this.configFinal.searchLength))
          return;
      } else s && s.length < this.configFinal.searchLength && (s = "");
      this.cancelSource &&
        this.cancelSource.cancel("Operation canceled by the user."),
        this.clearLists(e),
        (this.ajaxRows = []),
        n && ((this.currentPage = 1), this.resetSelect("loadViaAjax method")),
        (this.loaderHeight = this.$refs["height-wrapper"]
          ? this.$refs["height-wrapper"].clientHeight
          : 0),
        (this.fetching = !0);
      let i = {
        search: s,
        filters: this.filtersFinal,
        perPage: this.currentRowsPerPage,
        page: this.currentPage,
        hiddenColumns: this.configFinal.hiddenCols,
        sort:
          this.numberOfSorts > 0
            ? { indexes: this.currentSortIndexes, columns: this.sortingColumns }
            : null,
      };
      this.cancelSource = this.axiosFinal.CancelToken.source();
      const a = { "Content-Type": "application/json" };
      this.axiosFinal
        .request(this.configFinal.ajaxUrl, {
          method: this.configFinal.requestMethod,
          params: this.configFinal.requestMethod === "GET" ? i : null,
          data: this.configFinal.requestMethod === "POST" ? i : null,
          cancelToken: this.cancelSource.token,
          headers: a,
        })
        .then((o) => {
          if (!o.data.rows || typeof o.data.rows.length > "u")
            throw "Response data has to contain rows property. Please see Readme.md for details";
          if (typeof o.data.all > "u")
            throw "Response data has to contain all property. Please see Readme.md for details";
          (this.ajaxAll = o.data.all),
            (this.ajaxPages = Math.max(
              1,
              Math.ceil(o.data.all / this.currentRowsPerPage)
            )),
            this.$emit(
              "ajax:rows",
              {
                rows: o.data.rows,
                old: JSON.parse(JSON.stringify(this.ajaxRows)),
                all: this.ajaxAll,
              },
              "ajax:rows"
            ),
            o.data.all && ((this.ajaxRows = o.data.rows), this.initLists()),
            (this.fetching = !1);
        })
        .catch((o) => {
          this.axiosFinal.isCancel(o)
            ? console.log("Request canceled", o.message)
            : ((this.fetching = !1),
              console.error(o),
              this.$emit("ajax:error", o, "ajax:error"));
        });
    },
    elementVisible(n) {
      return n ? window.getComputedStyle(n).display !== "none" : !1;
    },
    breakpointListener() {
      clearTimeout(this.breakpointTimeout),
        (this.breakpointTimeout = setTimeout(() => {
          this.generateHiddenBreakpoints(!1);
        }, 250));
    },
    generateHiddenBreakpoints(n = !1) {
      n && (this.hiddenBreakpoints = []);
      let e = [];
      this.elementVisible(this.$refs.xxl) || e.push("xxl"),
        this.elementVisible(this.$refs.xl) || e.push("xl"),
        this.elementVisible(this.$refs.lg) || e.push("lg"),
        this.elementVisible(this.$refs.md) || e.push("md"),
        this.elementVisible(this.$refs.sm) || e.push("sm"),
        e.push("all"),
        JSON.stringify(this.hiddenBreakpoints) !== JSON.stringify(e) &&
          (this.hiddenBreakpoints = e);
    },
    checkStoredSelectedRows(n = !1) {
      if (
        (this.storedState["pre-selected-rows"],
        this.storedState["selected-rows"])
      ) {
        this.selected = JSON.parse(
          JSON.stringify(this.storedState["selected-rows"])
        );
        const e = Object.values(this.selected).filter((t) => t).length;
        this.configFinal.selectAllRows
          ? (this.allSelectedCustom = e && e === this.rowsFinal.length)
          : (this.allSelectedCustom =
              e && e === this.visibleRows.filter((t) => t).length),
          n && this.$delete(this.storedState, "selected-rows");
      }
    },
    checkKey(n) {
      if (this.activeRow !== null) {
        if (n.keyCode === 40) {
          n.preventDefault();
          const e = this.visibleRowIndexes.findIndex(
            (t) => t === this.activeRow
          );
          e === this.visibleRowIndexes.length - 1
            ? (this.activeRow = 0)
            : (this.activeRow = this.visibleRowIndexes[e + 1]);
        }
        if (n.keyCode === 38) {
          n.preventDefault();
          const e = this.visibleRowIndexes.findIndex(
            (t) => t === this.activeRow
          );
          e === 0
            ? (this.activeRow =
                this.visibleRowIndexes[this.visibleRowIndexes.length - 1])
            : (this.activeRow = this.visibleRowIndexes[e - 1]);
        }
      }
    },
  },
  created() {
    if (this.configFinal.storeState) {
      const t = localStorage.getItem(
        `vue-quintable-${this.identifier}-filters`
      );
      if (t) {
        const l = JSON.parse(t);
        for (let c in this.filters)
          Object.prototype.hasOwnProperty.call(this.filters, c) &&
            !Object.prototype.hasOwnProperty.call(l, c) &&
            (l[c] = this.filters[c]);
        this.$set(this.storedState, "filters", l);
      }
      const s = localStorage.getItem(`vue-quintable-${this.identifier}-query`);
      s && this.$set(this.storedState, "query", s);
      const i = localStorage.getItem(
        `vue-quintable-${this.identifier}-rows-per-page`
      );
      i && this.$set(this.storedState, "rows-per-page", parseInt(i));
      const a = localStorage.getItem(
        `vue-quintable-${this.identifier}-selected-rows`
      );
      a && this.$set(this.storedState, "selected-rows", JSON.parse(a));
      const o = localStorage.getItem(
        `vue-quintable-${this.identifier}-current-page`
      );
      o && this.$set(this.storedState, "current-page", parseInt(o));
      const r = localStorage.getItem(
        `vue-quintable-${this.identifier}-sort-indexes`
      );
      r && this.$set(this.storedState, "sort-indexes", JSON.parse(r));
    }
    this.initLists();
    let n = 0;
    const e = this.configFinal.selectAllRows
      ? this.rowsFinal.map((t, s) => s)
      : this.visibleRowIndexes;
    for (let t = 0; t < e.length; t++) {
      let s = this.rowsFinal[t];
      s.selected && this.$set(this.selected, t, !0),
        (s.selected || s.disableSelect) && n++;
    }
    !this.configFinal.selectAllRows &&
    n &&
    n === this.visibleRows.filter((t) => t).length
      ? (this.allSelectedCustom = !0)
      : this.configFinal.selectAllRows &&
        n &&
        n === this.rowsFinal.length &&
        (this.allSelectedCustom = !0),
      this.initialSearchTerm && (this.query = this.initialSearchTerm),
      this.storedState.query && (this.query = this.storedState.query),
      this.storedState["rows-per-page"] &&
        (this.customRowsPerPage = this.storedState["rows-per-page"]),
      this.storedState["sort-indexes"] &&
        ((this.currentSortIndexes = this.storedState["sort-indexes"]),
        this.sort(!0)),
      this.storedState["current-page"] &&
        this.$nextTick(() => {
          this.currentPage = this.storedState["current-page"];
        }),
      this.$nextTick(this.checkStoredSelectedRows),
      this.configFinal.enableRowTabIndex &&
        document.addEventListener("keydown", this.checkKey);
  },
  mounted() {
    this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "MOUNTED"),
      this.configFinal.defaultSelected && this.checkAll(!0),
      this.generateHiddenBreakpoints(),
      window.addEventListener("resize", this.breakpointListener);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.breakpointListener),
      this.configFinal.enableRowTabIndex &&
        document.removeEventListener("keydown", this.checkKey);
  },
};
var Be = function () {
    var e = this,
      t = e._self._c;
    return t("div", { staticClass: "table-wrapper quintable" }, [
      t("div", { staticClass: "breakpoints quintable--breakpoints" }, [
        t("div", { ref: "xs" }),
        t("div", { ref: "sm", staticClass: "d-none d-sm-block" }),
        t("div", { ref: "md", staticClass: "d-none d-md-block" }),
        t("div", { ref: "lg", staticClass: "d-none d-lg-block" }),
        t("div", { ref: "xl", staticClass: "d-none d-xl-block" }),
        t("div", { ref: "xxl", staticClass: "d-none d-xxl-block" }),
      ]),
      t(
        "div",
        { staticClass: "header slot slot-header quintable--header" },
        [e._t("header")],
        2
      ),
      e.configFinal.search
        ? t(
            "div",
            {
              staticClass: "mb-3 quintable--search-container",
              class: e.configFinal.searchContainerClass,
            },
            [
              e._t("before-search"),
              e._t(
                "search",
                function () {
                  return [
                    t(
                      "div",
                      {
                        staticClass:
                          "quintable--search-container--input-container",
                        class: e.configFinal.searchClass,
                      },
                      [
                        t("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.query,
                              expression: "query",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "search",
                            placeholder: e.configFinal.searchPlaceholder,
                          },
                          domProps: { value: e.query },
                          on: {
                            input: function (s) {
                              s.target.composing || (e.query = s.target.value);
                            },
                          },
                        }),
                      ]
                    ),
                  ];
                },
                {
                  value: e.query,
                  loading: e.loading,
                  setSearchQuery: e.setSearchQuery,
                  placeholder: e.configFinal.searchPlaceholder,
                  searchClass: e.configFinal.searchClass,
                }
              ),
              e._t("after-search"),
            ],
            2
          )
        : e._e(),
      t(
        "div",
        {
          staticClass:
            "slot slot-after-search quintable--after-search-container",
        },
        [e._t("after-search-container")],
        2
      ),
      t(
        "div",
        {
          ref: "height-wrapper",
          staticClass: "clearfix quintable--table-container",
        },
        [
          e.ajaxLoading
            ? e._e()
            : t(
                "table",
                {
                  staticClass:
                    "vue-quintable table quintable--table-container--table",
                  class: e.tableClasses,
                },
                [
                  e.configFinal.headlines.length
                    ? t("thead", [
                        t(
                          "tr",
                          {
                            staticClass:
                              "vue-quintable-header-row quintable--table-container--table--header-row",
                          },
                          [
                            e.hasGeneratedRows && !e.configFinal.hideRowToggle
                              ? t(
                                  "th",
                                  {
                                    staticClass:
                                      "placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th",
                                  },
                                  [t("wbr")]
                                )
                              : e._e(),
                            e.configFinal.select &&
                            e.configFinal.selectPosition === "pre"
                              ? t(
                                  "th",
                                  {
                                    staticClass:
                                      "select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre",
                                  },
                                  [
                                    e.configFinal.selectAll && !e.noRows
                                      ? [
                                          e.configFinal.prettySelect
                                            ? t(
                                                "p-check",
                                                {
                                                  staticClass:
                                                    "p-icon p-smooth",
                                                  attrs: { name: "check" },
                                                  on: {
                                                    change: function (s) {
                                                      return e.checkAll();
                                                    },
                                                  },
                                                  model: {
                                                    value:
                                                      e.allSelectedProperty,
                                                    callback: function (s) {
                                                      e.allSelectedProperty = s;
                                                    },
                                                    expression:
                                                      "allSelectedProperty",
                                                  },
                                                },
                                                [
                                                  t(
                                                    "template",
                                                    { slot: "extra" },
                                                    [
                                                      t(
                                                        "span",
                                                        [
                                                          e.allSelectedProperty
                                                            ? t(
                                                                "font-awesome-icon",
                                                                {
                                                                  staticClass:
                                                                    "text-success icon-check",
                                                                  attrs: {
                                                                    icon: "check",
                                                                  },
                                                                }
                                                              )
                                                            : e._e(),
                                                        ],
                                                        1
                                                      ),
                                                      t(
                                                        "span",
                                                        [
                                                          e.someSelected &&
                                                          !e.allSelectedProperty
                                                            ? t(
                                                                "font-awesome-icon",
                                                                {
                                                                  staticClass:
                                                                    "text-success icon-check",
                                                                  attrs: {
                                                                    icon: "square",
                                                                  },
                                                                }
                                                              )
                                                            : e._e(),
                                                        ],
                                                        1
                                                      ),
                                                    ]
                                                  ),
                                                ],
                                                2
                                              )
                                            : t(
                                                "label",
                                                { staticClass: "mb-0 mt-0" },
                                                [
                                                  t("input", {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          e.allSelectedProperty,
                                                        expression:
                                                          "allSelectedProperty",
                                                      },
                                                    ],
                                                    attrs: { type: "checkbox" },
                                                    domProps: {
                                                      checked: Array.isArray(
                                                        e.allSelectedProperty
                                                      )
                                                        ? e._i(
                                                            e.allSelectedProperty,
                                                            null
                                                          ) > -1
                                                        : e.allSelectedProperty,
                                                    },
                                                    on: {
                                                      change: [
                                                        function (s) {
                                                          var i =
                                                              e.allSelectedProperty,
                                                            a = s.target,
                                                            o = !!a.checked;
                                                          if (
                                                            Array.isArray(i)
                                                          ) {
                                                            var r = null,
                                                              l = e._i(i, r);
                                                            a.checked
                                                              ? l < 0 &&
                                                                (e.allSelectedProperty =
                                                                  i.concat([r]))
                                                              : l > -1 &&
                                                                (e.allSelectedProperty =
                                                                  i
                                                                    .slice(0, l)
                                                                    .concat(
                                                                      i.slice(
                                                                        l + 1
                                                                      )
                                                                    ));
                                                          } else
                                                            e.allSelectedProperty =
                                                              o;
                                                        },
                                                        function (s) {
                                                          return e.checkAll();
                                                        },
                                                      ],
                                                    },
                                                  }),
                                                ]
                                              ),
                                        ]
                                      : e._e(),
                                  ],
                                  2
                                )
                              : e._e(),
                            e._l(e.configFinal.headlines, function (s, i) {
                              return [
                                ((e.configFinal.columns[i] &&
                                  !e.configFinal.columns[i].breakpoint) ||
                                  e.hiddenBreakpoints.findIndex(
                                    (a) =>
                                      e.configFinal.columns[i] &&
                                      a === e.configFinal.columns[i].breakpoint
                                  ) === -1) &&
                                !e.configFinal.columns[i].sticky &&
                                !e.configFinal.hiddenCols[i] &&
                                !e.emptyColumns[i]
                                  ? t(
                                      "th",
                                      {
                                        key: "headline-" + i,
                                        class: e.headerClass[i],
                                        attrs: {
                                          title: e.configFinal.columns[i].title,
                                        },
                                        on: {
                                          click: function (a) {
                                            return (
                                              a.stopPropagation(),
                                              e.setSortColumn(i)
                                            );
                                          },
                                        },
                                      },
                                      [
                                        e.showHeadlines[i]
                                          ? t("span", {
                                              staticClass:
                                                "headline quintable--table-container--table--header-row--th--headline",
                                              domProps: { innerHTML: e._s(s) },
                                            })
                                          : t(
                                              "span",
                                              {
                                                staticClass:
                                                  "headline quintable--table-container--table--header-row--th--headline",
                                              },
                                              [t("wbr")]
                                            ),
                                        e.configFinal.sorts[i]
                                          ? t(
                                              "span",
                                              {
                                                staticClass:
                                                  "sorting-icon ms-2 quintable--table-container--table--header-row--th--sorting-icon",
                                              },
                                              [
                                                e.currentSortIndexes[i]
                                                  ? e._e()
                                                  : t("font-awesome-icon", {
                                                      staticClass:
                                                        "text-primary",
                                                      attrs: { icon: "sort" },
                                                    }),
                                                e.currentSortIndexes[i] &&
                                                e.currentSortIndexes[i].asc
                                                  ? t("font-awesome-icon", {
                                                      staticClass:
                                                        "text-primary",
                                                      attrs: {
                                                        icon: "sort-amount-down-alt",
                                                      },
                                                    })
                                                  : e._e(),
                                                e.currentSortIndexes[i] &&
                                                !e.currentSortIndexes[i].asc
                                                  ? t("font-awesome-icon", {
                                                      staticClass:
                                                        "text-primary",
                                                      attrs: {
                                                        icon: "sort-amount-down",
                                                      },
                                                    })
                                                  : e._e(),
                                                e.currentSortIndexes[i]
                                                  ? t(
                                                      "span",
                                                      {
                                                        staticClass:
                                                          "ms-1 text-muted",
                                                        on: {
                                                          click: function (a) {
                                                            return (
                                                              a.stopPropagation(),
                                                              a.preventDefault(),
                                                              e.removeSort(i)
                                                            );
                                                          },
                                                        },
                                                      },
                                                      [
                                                        e.numberOfSorts > 1
                                                          ? t(
                                                              "span",
                                                              {
                                                                staticClass:
                                                                  "badge bg-info text-white",
                                                              },
                                                              [
                                                                e._v(
                                                                  " " +
                                                                    e._s(
                                                                      e
                                                                        .currentSortIndexes[
                                                                        i
                                                                      ].order +
                                                                        1
                                                                    ) +
                                                                    " "
                                                                ),
                                                              ]
                                                            )
                                                          : t(
                                                              "small",
                                                              [
                                                                t(
                                                                  "font-awesome-icon",
                                                                  {
                                                                    attrs: {
                                                                      icon: "times",
                                                                    },
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                      ]
                                                    )
                                                  : e._e(),
                                              ],
                                              1
                                            )
                                          : e._e(),
                                      ]
                                    )
                                  : e._e(),
                              ];
                            }),
                            e.configFinal.select &&
                            e.configFinal.selectPosition === "post"
                              ? t(
                                  "th",
                                  {
                                    staticClass:
                                      "select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post",
                                  },
                                  [
                                    e.configFinal.selectAll && !e.noRows
                                      ? [
                                          e.configFinal.prettySelect
                                            ? t(
                                                "p-check",
                                                {
                                                  staticClass:
                                                    "p-icon p-smooth",
                                                  attrs: { name: "check" },
                                                  on: {
                                                    change: function (s) {
                                                      return e.checkAll();
                                                    },
                                                  },
                                                  model: {
                                                    value:
                                                      e.allSelectedProperty,
                                                    callback: function (s) {
                                                      e.allSelectedProperty = s;
                                                    },
                                                    expression:
                                                      "allSelectedProperty",
                                                  },
                                                },
                                                [
                                                  t(
                                                    "template",
                                                    { slot: "extra" },
                                                    [
                                                      t(
                                                        "span",
                                                        [
                                                          e.allSelectedProperty
                                                            ? t(
                                                                "font-awesome-icon",
                                                                {
                                                                  staticClass:
                                                                    "text-success icon-check",
                                                                  attrs: {
                                                                    icon: "check",
                                                                  },
                                                                }
                                                              )
                                                            : e._e(),
                                                        ],
                                                        1
                                                      ),
                                                      t(
                                                        "span",
                                                        [
                                                          e.someSelected &&
                                                          !e.allSelectedProperty
                                                            ? t(
                                                                "font-awesome-icon",
                                                                {
                                                                  staticClass:
                                                                    "text-success icon-check",
                                                                  attrs: {
                                                                    icon: "square",
                                                                  },
                                                                }
                                                              )
                                                            : e._e(),
                                                        ],
                                                        1
                                                      ),
                                                    ]
                                                  ),
                                                ],
                                                2
                                              )
                                            : t(
                                                "label",
                                                { staticClass: "mb-0 mt-0" },
                                                [
                                                  t("input", {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          e.allSelectedProperty,
                                                        expression:
                                                          "allSelectedProperty",
                                                      },
                                                    ],
                                                    attrs: { type: "checkbox" },
                                                    domProps: {
                                                      checked: Array.isArray(
                                                        e.allSelectedProperty
                                                      )
                                                        ? e._i(
                                                            e.allSelectedProperty,
                                                            null
                                                          ) > -1
                                                        : e.allSelectedProperty,
                                                    },
                                                    on: {
                                                      change: [
                                                        function (s) {
                                                          var i =
                                                              e.allSelectedProperty,
                                                            a = s.target,
                                                            o = !!a.checked;
                                                          if (
                                                            Array.isArray(i)
                                                          ) {
                                                            var r = null,
                                                              l = e._i(i, r);
                                                            a.checked
                                                              ? l < 0 &&
                                                                (e.allSelectedProperty =
                                                                  i.concat([r]))
                                                              : l > -1 &&
                                                                (e.allSelectedProperty =
                                                                  i
                                                                    .slice(0, l)
                                                                    .concat(
                                                                      i.slice(
                                                                        l + 1
                                                                      )
                                                                    ));
                                                          } else
                                                            e.allSelectedProperty =
                                                              o;
                                                        },
                                                        function (s) {
                                                          return e.checkAll();
                                                        },
                                                      ],
                                                    },
                                                  }),
                                                ]
                                              ),
                                        ]
                                      : e._e(),
                                  ],
                                  2
                                )
                              : e._e(),
                          ],
                          2
                        ),
                      ])
                    : e._e(),
                  t(
                    "tbody",
                    {
                      staticClass: "quintable--table-container--table--tbody",
                      on: { mouseleave: e.onMouseleaveTable },
                    },
                    [
                      e._l(e.visibleRowIndexes, function (s) {
                        return [
                          t(
                            "tr",
                            {
                              directives: [
                                {
                                  name: "tooltip",
                                  rawName: "v-tooltip",
                                  value: {
                                    placement: "top",
                                    content: e.rowsFinal[s].tooltip,
                                    trigger: e.rowsFinal[s].tooltip
                                      ? "hover"
                                      : "manual",
                                    offset: 5,
                                  },
                                  expression: `{
              placement: 'top',
              content: rowsFinal[rIndex].tooltip,
              trigger: rowsFinal[rIndex].tooltip ? 'hover' : 'manual',
              offset: 5,
            }`,
                                },
                              ],
                              key:
                                "vue-quintable-" +
                                e.uuid +
                                "-row-" +
                                s +
                                "-" +
                                e.indexesUpdatedKey,
                              ref: "row-highlighted-" + s,
                              refInFor: !0,
                              staticClass:
                                "vue-quintable-row quintable--table-container--table--tbody--row",
                              class: e.rowClasses[s],
                              style:
                                e.hiddenColumns[s] > 0 ? "cursor:pointer;" : "",
                              attrs: {
                                id: "vue-quintable-" + e.uuid + "-row-" + s,
                              },
                              on: {
                                click: function (i) {
                                  return e.onRowClick(i, s);
                                },
                                auxclick: function (i) {
                                  return e.onRowAuxClick(i, s);
                                },
                                mousedown: function (i) {
                                  return e.onRowMousedown(i);
                                },
                                mouseenter: function (i) {
                                  return e.onMouseenterRow(s);
                                },
                              },
                            },
                            [
                              e.hasGeneratedRows && !e.configFinal.hideRowToggle
                                ? t(
                                    "td",
                                    {
                                      staticClass:
                                        "toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td",
                                    },
                                    [
                                      e.hiddenColumns[s] > 0
                                        ? t("span", [
                                            e.openRows[s]
                                              ? t(
                                                  "span",
                                                  [
                                                    t("font-awesome-icon", {
                                                      attrs: {
                                                        "fixed-width": "",
                                                        icon: e.configFinal
                                                          .expandedRowIcon,
                                                      },
                                                    }),
                                                  ],
                                                  1
                                                )
                                              : t(
                                                  "span",
                                                  [
                                                    t("font-awesome-icon", {
                                                      attrs: {
                                                        "fixed-width": "",
                                                        icon: e.configFinal
                                                          .collapsedRowIcon,
                                                      },
                                                    }),
                                                  ],
                                                  1
                                                ),
                                          ])
                                        : e._e(),
                                    ]
                                  )
                                : e._e(),
                              e.configFinal.select &&
                              e.configFinal.selectPosition === "pre"
                                ? t(
                                    "td",
                                    {
                                      staticClass:
                                        "select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre",
                                      class: {
                                        "disabled-select":
                                          e.rowsFinal[s].disableSelect,
                                      },
                                    },
                                    [
                                      e.rowsFinal[s].disableSelect
                                        ? e._e()
                                        : [
                                            e.configFinal.prettySelect
                                              ? t(
                                                  "p-check",
                                                  {
                                                    staticClass: "p-icon",
                                                    attrs: { name: "check" },
                                                    on: {
                                                      change: function (i) {
                                                        return e.checkListener(
                                                          i,
                                                          s
                                                        );
                                                      },
                                                    },
                                                    model: {
                                                      value: e.selected[s],
                                                      callback: function (i) {
                                                        e.$set(
                                                          e.selected,
                                                          s,
                                                          i
                                                        );
                                                      },
                                                      expression:
                                                        "selected[rIndex]",
                                                    },
                                                  },
                                                  [
                                                    t(
                                                      "template",
                                                      { slot: "extra" },
                                                      [
                                                        t(
                                                          "span",
                                                          [
                                                            e.selected[s]
                                                              ? t(
                                                                  "font-awesome-icon",
                                                                  {
                                                                    staticClass:
                                                                      "text-success icon-check",
                                                                    attrs: {
                                                                      icon: "check",
                                                                    },
                                                                  }
                                                                )
                                                              : e._e(),
                                                          ],
                                                          1
                                                        ),
                                                      ]
                                                    ),
                                                  ],
                                                  2
                                                )
                                              : t(
                                                  "label",
                                                  { staticClass: "mb-0 mt-0" },
                                                  [
                                                    t("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value: e.selected[s],
                                                          expression:
                                                            "selected[rIndex]",
                                                        },
                                                      ],
                                                      attrs: {
                                                        type: "checkbox",
                                                      },
                                                      domProps: {
                                                        checked: Array.isArray(
                                                          e.selected[s]
                                                        )
                                                          ? e._i(
                                                              e.selected[s],
                                                              null
                                                            ) > -1
                                                          : e.selected[s],
                                                      },
                                                      on: {
                                                        change: [
                                                          function (i) {
                                                            var a =
                                                                e.selected[s],
                                                              o = i.target,
                                                              r = !!o.checked;
                                                            if (
                                                              Array.isArray(a)
                                                            ) {
                                                              var l = null,
                                                                c = e._i(a, l);
                                                              o.checked
                                                                ? c < 0 &&
                                                                  e.$set(
                                                                    e.selected,
                                                                    s,
                                                                    a.concat([
                                                                      l,
                                                                    ])
                                                                  )
                                                                : c > -1 &&
                                                                  e.$set(
                                                                    e.selected,
                                                                    s,
                                                                    a
                                                                      .slice(
                                                                        0,
                                                                        c
                                                                      )
                                                                      .concat(
                                                                        a.slice(
                                                                          c + 1
                                                                        )
                                                                      )
                                                                  );
                                                            } else
                                                              e.$set(
                                                                e.selected,
                                                                s,
                                                                r
                                                              );
                                                          },
                                                          function (i) {
                                                            return e.checkListener(
                                                              i,
                                                              s
                                                            );
                                                          },
                                                        ],
                                                      },
                                                    }),
                                                  ]
                                                ),
                                          ],
                                    ],
                                    2
                                  )
                                : e._e(),
                              e._l(
                                e.rowsFinal[s].cells
                                  ? e.rowsFinal[s].cells
                                  : e.rowsFinal[s],
                                function (i, a) {
                                  return [
                                    !e.configFinal.hiddenCols[a] &&
                                    !e.emptyColumns[a] &&
                                    e.configFinal.columns[a] &&
                                    i &&
                                    e.hiddenBreakpoints.findIndex(
                                      (o) =>
                                        o ===
                                        e.configFinal.columns[a].breakpoint
                                    ) === -1 &&
                                    e.configFinal.columns[a].breakpoint !==
                                      "all" &&
                                    !e.configFinal.stickyCols[a]
                                      ? t(
                                          "td",
                                          {
                                            directives: [
                                              {
                                                name: "tooltip",
                                                rawName: "v-tooltip",
                                                value: {
                                                  placement: "left",
                                                  content: i.tooltip,
                                                  trigger: i.tooltip
                                                    ? "hover"
                                                    : "manual",
                                                },
                                                expression: `{
                  placement: 'left',
                  content: cell.tooltip,
                  trigger: cell.tooltip ? 'hover' : 'manual',
                }`,
                                              },
                                            ],
                                            key:
                                              "vue-quintable-" +
                                              e.uuid +
                                              "-cell-" +
                                              s +
                                              "-" +
                                              a,
                                            staticClass:
                                              "vue-quintable-cell quintable--table-container--table--tbody--row--cell",
                                            class:
                                              e.cellClassesParsed[s][a] +
                                              " " +
                                              e.configFinal.columnClasses[a],
                                            attrs: {
                                              id:
                                                "vue-quintable-" +
                                                e.uuid +
                                                "-cell-" +
                                                s +
                                                "-" +
                                                a,
                                            },
                                            on: {
                                              click: function (o) {
                                                return e.onCellClick(o, i);
                                              },
                                              auxclick: function (o) {
                                                return e.onCellAuxClick(o, i);
                                              },
                                              mousedown: function (o) {
                                                return e.onCellMousedown(o);
                                              },
                                            },
                                          },
                                          [
                                            e._t(
                                              "cell-complete",
                                              function () {
                                                return [
                                                  e._t(
                                                    "cell-content",
                                                    function () {
                                                      return [
                                                        e.configFinal.columns[a]
                                                          .cellFormatter &&
                                                        e.cellFormatters(a, i)
                                                          .type === "html"
                                                          ? t("div", {
                                                              staticClass:
                                                                "cell-inner",
                                                              class:
                                                                "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html",
                                                              domProps: {
                                                                innerHTML: e._s(
                                                                  e.cellFormatters(
                                                                    a,
                                                                    i
                                                                  ).value
                                                                ),
                                                              },
                                                            })
                                                          : e.configFinal
                                                              .columns[a]
                                                              .cellFormatter
                                                          ? t(
                                                              "div",
                                                              {
                                                                staticClass:
                                                                  "cell-inner",
                                                                class:
                                                                  "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value",
                                                              },
                                                              [
                                                                e._v(
                                                                  " " +
                                                                    e._s(
                                                                      e.cellFormatters(
                                                                        a,
                                                                        i
                                                                      ).value
                                                                    ) +
                                                                    " "
                                                                ),
                                                              ]
                                                            )
                                                          : e.valueToString(
                                                              i.html
                                                            )
                                                          ? t("div", {
                                                              staticClass:
                                                                "cell-inner",
                                                              class:
                                                                "quintable--table-container--table--tbody--row--cell--inner-cell--html",
                                                              domProps: {
                                                                innerHTML: e._s(
                                                                  i.html
                                                                ),
                                                              },
                                                            })
                                                          : i.component
                                                          ? t(
                                                              "div",
                                                              {
                                                                staticClass:
                                                                  "cell-inner",
                                                                class:
                                                                  "quintable--table-container--table--tbody--row--cell--inner-cell--component",
                                                              },
                                                              [
                                                                t(
                                                                  i.component
                                                                    .name,
                                                                  e._b(
                                                                    {
                                                                      tag: "component",
                                                                      on: {
                                                                        action:
                                                                          e.handleComponentEvent,
                                                                      },
                                                                    },
                                                                    "component",
                                                                    i.component
                                                                      .props,
                                                                    !1
                                                                  )
                                                                ),
                                                              ],
                                                              1
                                                            )
                                                          : e.valueToString(
                                                              i.text
                                                            )
                                                          ? t(
                                                              "div",
                                                              {
                                                                staticClass:
                                                                  "cell-inner",
                                                                class:
                                                                  "quintable--table-container--table--tbody--row--cell--inner-cell--text",
                                                              },
                                                              [
                                                                e._v(
                                                                  " " +
                                                                    e._s(
                                                                      i.text
                                                                    ) +
                                                                    " "
                                                                ),
                                                              ]
                                                            )
                                                          : e._e(),
                                                      ];
                                                    },
                                                    { cell: i }
                                                  ),
                                                ];
                                              },
                                              { cell: i }
                                            ),
                                          ],
                                          2
                                        )
                                      : e._e(),
                                  ];
                                }
                              ),
                              e.configFinal.select &&
                              e.configFinal.selectPosition === "post"
                                ? t(
                                    "td",
                                    {
                                      staticClass:
                                        "select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post",
                                      class: {
                                        "disabled-select":
                                          e.rowsFinal[s].disableSelect,
                                      },
                                    },
                                    [
                                      e.rowsFinal[s].disableSelect
                                        ? e._e()
                                        : [
                                            e.configFinal.prettySelect
                                              ? t(
                                                  "p-check",
                                                  {
                                                    staticClass: "p-icon",
                                                    attrs: { name: "check" },
                                                    on: {
                                                      change: function (i) {
                                                        return e.checkListener(
                                                          i,
                                                          s
                                                        );
                                                      },
                                                    },
                                                    model: {
                                                      value: e.selected[s],
                                                      callback: function (i) {
                                                        e.$set(
                                                          e.selected,
                                                          s,
                                                          i
                                                        );
                                                      },
                                                      expression:
                                                        "selected[rIndex]",
                                                    },
                                                  },
                                                  [
                                                    t(
                                                      "template",
                                                      { slot: "extra" },
                                                      [
                                                        t(
                                                          "span",
                                                          [
                                                            e.selected[s]
                                                              ? t(
                                                                  "font-awesome-icon",
                                                                  {
                                                                    staticClass:
                                                                      "text-success icon-check",
                                                                    attrs: {
                                                                      icon: "check",
                                                                    },
                                                                  }
                                                                )
                                                              : e._e(),
                                                          ],
                                                          1
                                                        ),
                                                      ]
                                                    ),
                                                  ],
                                                  2
                                                )
                                              : t(
                                                  "label",
                                                  { staticClass: "mb-0 mt-0" },
                                                  [
                                                    t("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value: e.selected[s],
                                                          expression:
                                                            "selected[rIndex]",
                                                        },
                                                      ],
                                                      attrs: {
                                                        type: "checkbox",
                                                      },
                                                      domProps: {
                                                        checked: Array.isArray(
                                                          e.selected[s]
                                                        )
                                                          ? e._i(
                                                              e.selected[s],
                                                              null
                                                            ) > -1
                                                          : e.selected[s],
                                                      },
                                                      on: {
                                                        change: [
                                                          function (i) {
                                                            var a =
                                                                e.selected[s],
                                                              o = i.target,
                                                              r = !!o.checked;
                                                            if (
                                                              Array.isArray(a)
                                                            ) {
                                                              var l = null,
                                                                c = e._i(a, l);
                                                              o.checked
                                                                ? c < 0 &&
                                                                  e.$set(
                                                                    e.selected,
                                                                    s,
                                                                    a.concat([
                                                                      l,
                                                                    ])
                                                                  )
                                                                : c > -1 &&
                                                                  e.$set(
                                                                    e.selected,
                                                                    s,
                                                                    a
                                                                      .slice(
                                                                        0,
                                                                        c
                                                                      )
                                                                      .concat(
                                                                        a.slice(
                                                                          c + 1
                                                                        )
                                                                      )
                                                                  );
                                                            } else
                                                              e.$set(
                                                                e.selected,
                                                                s,
                                                                r
                                                              );
                                                          },
                                                          function (i) {
                                                            return e.checkListener(
                                                              i,
                                                              s
                                                            );
                                                          },
                                                        ],
                                                      },
                                                    }),
                                                  ]
                                                ),
                                          ],
                                    ],
                                    2
                                  )
                                : e._e(),
                            ],
                            2
                          ),
                          (e.generatedRows[s] || e.stickyRows[s]) &&
                          e.visibleRows[s]
                            ? [
                                (e.generatedUpdatedKey &&
                                  e.openRows[s] &&
                                  Object.keys(e.generatedRows[s]).length) ||
                                Object.keys(e.stickyRows[s]).length
                                  ? t(
                                      "tr",
                                      {
                                        key:
                                          "generated-row-" +
                                          s +
                                          "-" +
                                          e.rowsUpdatedKey +
                                          "-" +
                                          e.generatedUpdatedKey,
                                        ref: "generated-row-highlighted-" + s,
                                        refInFor: !0,
                                        staticClass:
                                          "generated-row quintable--table-container--table--tbody--generated-row",
                                        class: {
                                          "parent-row-expanded": e.openRows[s],
                                          "parent-row-collapsed":
                                            e.hiddenColumns[s] > 0 &&
                                            !e.openRows[s],
                                        },
                                        on: {
                                          mouseenter: function (i) {
                                            return e.onMouseenterRow(s);
                                          },
                                          click: function (i) {
                                            return e.onRowClick(i, s);
                                          },
                                        },
                                      },
                                      [
                                        t(
                                          "td",
                                          {
                                            staticClass: "ps-0 pe-0 pt-0",
                                            attrs: {
                                              colspan: e.configFinal.number + 1,
                                            },
                                          },
                                          [
                                            t(
                                              "div",
                                              {
                                                class: {
                                                  [e.configFinal.hoverClass]:
                                                    e.hoveredRow === s,
                                                  [e.configFinal.activeClass]:
                                                    e.activeRow === s,
                                                },
                                              },
                                              [
                                                t(
                                                  "table",
                                                  {
                                                    staticClass:
                                                      "mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table",
                                                  },
                                                  [
                                                    t(
                                                      "tbody",
                                                      [
                                                        e._l(
                                                          e.generatedRows[s],
                                                          function (i, a) {
                                                            return [
                                                              e.openRows[s]
                                                                ? t(
                                                                    "tr",
                                                                    {
                                                                      key:
                                                                        "vue-quintable-" +
                                                                        e.uuid +
                                                                        "-generated-row-cell-" +
                                                                        s +
                                                                        "-" +
                                                                        a +
                                                                        "-" +
                                                                        e.generatedUpdatedKey,
                                                                      staticClass:
                                                                        "generated-row-cell quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell",
                                                                      attrs: {
                                                                        id:
                                                                          "vue-quintable-" +
                                                                          e.uuid +
                                                                          "-generated-row-cell-" +
                                                                          s +
                                                                          "-" +
                                                                          a,
                                                                      },
                                                                    },
                                                                    [
                                                                      !e
                                                                        .configFinal
                                                                        .hideRowToggle &&
                                                                      e
                                                                        .generatedRows[
                                                                        s
                                                                      ] &&
                                                                      Object.keys(
                                                                        e
                                                                          .generatedRows[
                                                                          s
                                                                        ]
                                                                      ).length
                                                                        ? t(
                                                                            "td",
                                                                            {
                                                                              staticClass:
                                                                                "toggle-cell invisible",
                                                                            },
                                                                            [
                                                                              e
                                                                                .hiddenColumns[
                                                                                s
                                                                              ] >
                                                                              0
                                                                                ? t(
                                                                                    "span",
                                                                                    [
                                                                                      e
                                                                                        .openRows[
                                                                                        s
                                                                                      ]
                                                                                        ? t(
                                                                                            "span",
                                                                                            [
                                                                                              t(
                                                                                                "font-awesome-icon",
                                                                                                {
                                                                                                  attrs:
                                                                                                    {
                                                                                                      "fixed-width":
                                                                                                        "",
                                                                                                      icon: e
                                                                                                        .configFinal
                                                                                                        .expandedRowIcon,
                                                                                                    },
                                                                                                }
                                                                                              ),
                                                                                            ],
                                                                                            1
                                                                                          )
                                                                                        : t(
                                                                                            "span",
                                                                                            [
                                                                                              t(
                                                                                                "font-awesome-icon",
                                                                                                {
                                                                                                  attrs:
                                                                                                    {
                                                                                                      "fixed-width":
                                                                                                        "",
                                                                                                      icon: e
                                                                                                        .configFinal
                                                                                                        .collapsedRowIcon,
                                                                                                    },
                                                                                                }
                                                                                              ),
                                                                                            ],
                                                                                            1
                                                                                          ),
                                                                                    ]
                                                                                  )
                                                                                : e._e(),
                                                                            ]
                                                                          )
                                                                        : e._e(),
                                                                      e
                                                                        .showHeadlines[
                                                                        a
                                                                      ] ||
                                                                      e
                                                                        .configFinal
                                                                        .sorts[
                                                                        a
                                                                      ]
                                                                        ? t(
                                                                            "td",
                                                                            {
                                                                              staticClass:
                                                                                "generated-cell-element generated-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline",
                                                                              class:
                                                                                e
                                                                                  .configFinal
                                                                                  .columnClasses[
                                                                                  a
                                                                                ],
                                                                              on: {
                                                                                click:
                                                                                  function (
                                                                                    o
                                                                                  ) {
                                                                                    return (
                                                                                      o.stopPropagation(),
                                                                                      e.setSortColumn(
                                                                                        a
                                                                                      )
                                                                                    );
                                                                                  },
                                                                              },
                                                                            },
                                                                            [
                                                                              e
                                                                                .showHeadlines[
                                                                                a
                                                                              ]
                                                                                ? t(
                                                                                    "strong",
                                                                                    {
                                                                                      domProps:
                                                                                        {
                                                                                          innerHTML:
                                                                                            e._s(
                                                                                              e
                                                                                                .configFinal
                                                                                                .headlines[
                                                                                                a
                                                                                              ]
                                                                                            ),
                                                                                        },
                                                                                    }
                                                                                  )
                                                                                : t(
                                                                                    "span",
                                                                                    {
                                                                                      staticClass:
                                                                                        "headline",
                                                                                    },
                                                                                    [
                                                                                      t(
                                                                                        "wbr"
                                                                                      ),
                                                                                    ]
                                                                                  ),
                                                                              e
                                                                                .configFinal
                                                                                .sorts[
                                                                                a
                                                                              ] &&
                                                                              e.hoveredRow ===
                                                                                s
                                                                                ? t(
                                                                                    "span",
                                                                                    {
                                                                                      staticClass:
                                                                                        "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon",
                                                                                    },
                                                                                    [
                                                                                      e
                                                                                        .currentSortIndexes[
                                                                                        a
                                                                                      ]
                                                                                        ? e._e()
                                                                                        : t(
                                                                                            "font-awesome-icon",
                                                                                            {
                                                                                              staticClass:
                                                                                                "text-primary",
                                                                                              attrs:
                                                                                                {
                                                                                                  icon: "sort",
                                                                                                },
                                                                                            }
                                                                                          ),
                                                                                      e
                                                                                        .currentSortIndexes[
                                                                                        a
                                                                                      ] &&
                                                                                      e
                                                                                        .currentSortIndexes[
                                                                                        a
                                                                                      ]
                                                                                        .asc
                                                                                        ? t(
                                                                                            "font-awesome-icon",
                                                                                            {
                                                                                              staticClass:
                                                                                                "text-primary",
                                                                                              attrs:
                                                                                                {
                                                                                                  icon: "sort-amount-down-alt",
                                                                                                },
                                                                                            }
                                                                                          )
                                                                                        : e._e(),
                                                                                      e
                                                                                        .currentSortIndexes[
                                                                                        a
                                                                                      ] &&
                                                                                      !e
                                                                                        .currentSortIndexes[
                                                                                        a
                                                                                      ]
                                                                                        .asc
                                                                                        ? t(
                                                                                            "font-awesome-icon",
                                                                                            {
                                                                                              staticClass:
                                                                                                "text-primary",
                                                                                              attrs:
                                                                                                {
                                                                                                  icon: "sort-amount-down",
                                                                                                },
                                                                                            }
                                                                                          )
                                                                                        : e._e(),
                                                                                      e
                                                                                        .currentSortIndexes[
                                                                                        a
                                                                                      ]
                                                                                        ? t(
                                                                                            "span",
                                                                                            {
                                                                                              staticClass:
                                                                                                "ms-1 text-muted",
                                                                                              on: {
                                                                                                click:
                                                                                                  function (
                                                                                                    o
                                                                                                  ) {
                                                                                                    return (
                                                                                                      o.stopPropagation(),
                                                                                                      o.preventDefault(),
                                                                                                      e.removeSort(
                                                                                                        a
                                                                                                      )
                                                                                                    );
                                                                                                  },
                                                                                              },
                                                                                            },
                                                                                            [
                                                                                              e.numberOfSorts >
                                                                                              1
                                                                                                ? t(
                                                                                                    "span",
                                                                                                    {
                                                                                                      staticClass:
                                                                                                        "badge bg-info text-white",
                                                                                                    },
                                                                                                    [
                                                                                                      e._v(
                                                                                                        " " +
                                                                                                          e._s(
                                                                                                            e
                                                                                                              .currentSortIndexes[
                                                                                                              a
                                                                                                            ]
                                                                                                              .order +
                                                                                                              1
                                                                                                          ) +
                                                                                                          " "
                                                                                                      ),
                                                                                                    ]
                                                                                                  )
                                                                                                : t(
                                                                                                    "small",
                                                                                                    [
                                                                                                      t(
                                                                                                        "font-awesome-icon",
                                                                                                        {
                                                                                                          attrs:
                                                                                                            {
                                                                                                              icon: "times",
                                                                                                            },
                                                                                                        }
                                                                                                      ),
                                                                                                    ],
                                                                                                    1
                                                                                                  ),
                                                                                            ]
                                                                                          )
                                                                                        : e._e(),
                                                                                    ],
                                                                                    1
                                                                                  )
                                                                                : e._e(),
                                                                            ]
                                                                          )
                                                                        : e._e(),
                                                                      t(
                                                                        "td",
                                                                        {
                                                                          directives:
                                                                            [
                                                                              {
                                                                                name: "tooltip",
                                                                                rawName:
                                                                                  "v-tooltip",
                                                                                value:
                                                                                  {
                                                                                    placement:
                                                                                      "top",
                                                                                    content:
                                                                                      i.tooltip,
                                                                                    trigger:
                                                                                      i.tooltip
                                                                                        ? "hover"
                                                                                        : "manual",
                                                                                  },
                                                                                expression: `{
                              placement: 'top',
                              content: cell.tooltip,
                              trigger: cell.tooltip ? 'hover' : 'manual',
                            }`,
                                                                              },
                                                                            ],
                                                                          staticClass:
                                                                            "generated-cell-element generated-cell-element-content generated-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content",
                                                                          class:
                                                                            e
                                                                              .configFinal
                                                                              .columnClasses[
                                                                              a
                                                                            ] +
                                                                            " " +
                                                                            e
                                                                              .cellClassesParsed[
                                                                              s
                                                                            ][
                                                                              a
                                                                            ],
                                                                          attrs:
                                                                            {
                                                                              colspan:
                                                                                !e
                                                                                  .showHeadlines[
                                                                                  a
                                                                                ] &&
                                                                                !e
                                                                                  .configFinal
                                                                                  .sorts[
                                                                                  a
                                                                                ]
                                                                                  ? 2
                                                                                  : 1,
                                                                            },
                                                                          on: {
                                                                            click:
                                                                              function (
                                                                                o
                                                                              ) {
                                                                                return e.onCellClick(
                                                                                  o,
                                                                                  i
                                                                                );
                                                                              },
                                                                          },
                                                                        },
                                                                        [
                                                                          e._t(
                                                                            "generated-cell-complete",
                                                                            function () {
                                                                              return [
                                                                                e._t(
                                                                                  "generated-cell-content",
                                                                                  function () {
                                                                                    return [
                                                                                      e
                                                                                        .configFinal
                                                                                        .columns[
                                                                                        a
                                                                                      ]
                                                                                        .cellFormatter &&
                                                                                      e.cellFormatters(
                                                                                        a,
                                                                                        i
                                                                                      )
                                                                                        .type ===
                                                                                        "html"
                                                                                        ? t(
                                                                                            "div",
                                                                                            {
                                                                                              staticClass:
                                                                                                "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html",
                                                                                              domProps:
                                                                                                {
                                                                                                  innerHTML:
                                                                                                    e._s(
                                                                                                      e.cellFormatters(
                                                                                                        a,
                                                                                                        i
                                                                                                      )
                                                                                                        .value
                                                                                                    ),
                                                                                                },
                                                                                            }
                                                                                          )
                                                                                        : e
                                                                                            .configFinal
                                                                                            .columns[
                                                                                            a
                                                                                          ]
                                                                                            .cellFormatter
                                                                                        ? t(
                                                                                            "div",
                                                                                            {
                                                                                              staticClass:
                                                                                                "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value",
                                                                                            },
                                                                                            [
                                                                                              e._v(
                                                                                                " " +
                                                                                                  e._s(
                                                                                                    e.cellFormatters(
                                                                                                      a,
                                                                                                      i
                                                                                                    )
                                                                                                      .value
                                                                                                  ) +
                                                                                                  " "
                                                                                              ),
                                                                                            ]
                                                                                          )
                                                                                        : e.valueToString(
                                                                                            i.html
                                                                                          )
                                                                                        ? t(
                                                                                            "div",
                                                                                            {
                                                                                              staticClass:
                                                                                                "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html",
                                                                                              domProps:
                                                                                                {
                                                                                                  innerHTML:
                                                                                                    e._s(
                                                                                                      i.html
                                                                                                    ),
                                                                                                },
                                                                                            }
                                                                                          )
                                                                                        : i.component
                                                                                        ? t(
                                                                                            "div",
                                                                                            {
                                                                                              staticClass:
                                                                                                "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component",
                                                                                            },
                                                                                            [
                                                                                              t(
                                                                                                i
                                                                                                  .component
                                                                                                  .name,
                                                                                                e._b(
                                                                                                  {
                                                                                                    tag: "component",
                                                                                                    on: {
                                                                                                      action:
                                                                                                        e.handleComponentEvent,
                                                                                                    },
                                                                                                  },
                                                                                                  "component",
                                                                                                  i
                                                                                                    .component
                                                                                                    .props,
                                                                                                  !1
                                                                                                )
                                                                                              ),
                                                                                            ],
                                                                                            1
                                                                                          )
                                                                                        : e.valueToString(
                                                                                            i.text
                                                                                          )
                                                                                        ? t(
                                                                                            "div",
                                                                                            {
                                                                                              staticClass:
                                                                                                "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text",
                                                                                            },
                                                                                            [
                                                                                              e._v(
                                                                                                " " +
                                                                                                  e._s(
                                                                                                    i.text
                                                                                                  ) +
                                                                                                  " "
                                                                                              ),
                                                                                            ]
                                                                                          )
                                                                                        : e._e(),
                                                                                    ];
                                                                                  },
                                                                                  {
                                                                                    cell: i,
                                                                                  }
                                                                                ),
                                                                              ];
                                                                            },
                                                                            {
                                                                              cell: i,
                                                                            }
                                                                          ),
                                                                        ],
                                                                        2
                                                                      ),
                                                                    ]
                                                                  )
                                                                : e._e(),
                                                            ];
                                                          }
                                                        ),
                                                        e._l(
                                                          e.stickyRows[s],
                                                          function (i, a) {
                                                            return t(
                                                              "tr",
                                                              {
                                                                key:
                                                                  "vue-quintable-" +
                                                                  e.uuid +
                                                                  "-sticky-row-cell-" +
                                                                  s +
                                                                  "-" +
                                                                  a,
                                                                staticClass:
                                                                  "sticky-row-cell quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell",
                                                                attrs: {
                                                                  id:
                                                                    "vue-quintable-" +
                                                                    e.uuid +
                                                                    "-sticky-row-cell-" +
                                                                    s +
                                                                    "-" +
                                                                    a,
                                                                },
                                                              },
                                                              [
                                                                !e.configFinal
                                                                  .hideRowToggle &&
                                                                e.generatedRows[
                                                                  s
                                                                ] &&
                                                                Object.keys(
                                                                  e
                                                                    .generatedRows[
                                                                    s
                                                                  ]
                                                                ).length
                                                                  ? t(
                                                                      "td",
                                                                      {
                                                                        staticClass:
                                                                          "toggle-cell invisible",
                                                                      },
                                                                      [
                                                                        e
                                                                          .hiddenColumns[
                                                                          s
                                                                        ] > 0
                                                                          ? t(
                                                                              "span",
                                                                              [
                                                                                e
                                                                                  .openRows[
                                                                                  s
                                                                                ]
                                                                                  ? t(
                                                                                      "span",
                                                                                      [
                                                                                        t(
                                                                                          "font-awesome-icon",
                                                                                          {
                                                                                            attrs:
                                                                                              {
                                                                                                "fixed-width":
                                                                                                  "",
                                                                                                icon: e
                                                                                                  .configFinal
                                                                                                  .expandedRowIcon,
                                                                                              },
                                                                                          }
                                                                                        ),
                                                                                      ],
                                                                                      1
                                                                                    )
                                                                                  : t(
                                                                                      "span",
                                                                                      [
                                                                                        t(
                                                                                          "font-awesome-icon",
                                                                                          {
                                                                                            attrs:
                                                                                              {
                                                                                                "fixed-width":
                                                                                                  "",
                                                                                                icon: e
                                                                                                  .configFinal
                                                                                                  .collapsedRowIcon,
                                                                                              },
                                                                                          }
                                                                                        ),
                                                                                      ],
                                                                                      1
                                                                                    ),
                                                                              ]
                                                                            )
                                                                          : e._e(),
                                                                      ]
                                                                    )
                                                                  : e._e(),
                                                                e.showHeadlines[
                                                                  a
                                                                ] ||
                                                                e.configFinal
                                                                  .sorts[a]
                                                                  ? t(
                                                                      "td",
                                                                      {
                                                                        staticClass:
                                                                          "generated-cell-element sticky-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline",
                                                                        class:
                                                                          e
                                                                            .configFinal
                                                                            .columnClasses[
                                                                            a
                                                                          ],
                                                                        on: {
                                                                          click:
                                                                            function (
                                                                              o
                                                                            ) {
                                                                              return (
                                                                                o.stopPropagation(),
                                                                                e.setSortColumn(
                                                                                  a
                                                                                )
                                                                              );
                                                                            },
                                                                        },
                                                                      },
                                                                      [
                                                                        e
                                                                          .showHeadlines[
                                                                          a
                                                                        ]
                                                                          ? t(
                                                                              "strong",
                                                                              {
                                                                                domProps:
                                                                                  {
                                                                                    innerHTML:
                                                                                      e._s(
                                                                                        e
                                                                                          .configFinal
                                                                                          .headlines[
                                                                                          a
                                                                                        ]
                                                                                      ),
                                                                                  },
                                                                              }
                                                                            )
                                                                          : t(
                                                                              "span",
                                                                              {
                                                                                staticClass:
                                                                                  "headline",
                                                                              },
                                                                              [
                                                                                t(
                                                                                  "wbr"
                                                                                ),
                                                                              ]
                                                                            ),
                                                                        e
                                                                          .configFinal
                                                                          .sorts[
                                                                          a
                                                                        ] &&
                                                                        e.hoveredRow ===
                                                                          s
                                                                          ? t(
                                                                              "span",
                                                                              {
                                                                                staticClass:
                                                                                  "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon",
                                                                              },
                                                                              [
                                                                                e
                                                                                  .currentSortIndexes[
                                                                                  a
                                                                                ]
                                                                                  ? e._e()
                                                                                  : t(
                                                                                      "font-awesome-icon",
                                                                                      {
                                                                                        staticClass:
                                                                                          "text-primary",
                                                                                        attrs:
                                                                                          {
                                                                                            icon: "sort",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                e
                                                                                  .currentSortIndexes[
                                                                                  a
                                                                                ] &&
                                                                                e
                                                                                  .currentSortIndexes[
                                                                                  a
                                                                                ]
                                                                                  .asc
                                                                                  ? t(
                                                                                      "font-awesome-icon",
                                                                                      {
                                                                                        staticClass:
                                                                                          "text-primary",
                                                                                        attrs:
                                                                                          {
                                                                                            icon: "sort-amount-down-alt",
                                                                                          },
                                                                                      }
                                                                                    )
                                                                                  : e._e(),
                                                                                e
                                                                                  .currentSortIndexes[
                                                                                  a
                                                                                ] &&
                                                                                !e
                                                                                  .currentSortIndexes[
                                                                                  a
                                                                                ]
                                                                                  .asc
                                                                                  ? t(
                                                                                      "font-awesome-icon",
                                                                                      {
                                                                                        staticClass:
                                                                                          "text-primary",
                                                                                        attrs:
                                                                                          {
                                                                                            icon: "sort-amount-down",
                                                                                          },
                                                                                      }
                                                                                    )
                                                                                  : e._e(),
                                                                                e
                                                                                  .currentSortIndexes[
                                                                                  a
                                                                                ]
                                                                                  ? t(
                                                                                      "span",
                                                                                      {
                                                                                        staticClass:
                                                                                          "ms-1 text-muted",
                                                                                        on: {
                                                                                          click:
                                                                                            function (
                                                                                              o
                                                                                            ) {
                                                                                              return (
                                                                                                o.stopPropagation(),
                                                                                                o.preventDefault(),
                                                                                                e.removeSort(
                                                                                                  a
                                                                                                )
                                                                                              );
                                                                                            },
                                                                                        },
                                                                                      },
                                                                                      [
                                                                                        e.numberOfSorts >
                                                                                        1
                                                                                          ? t(
                                                                                              "span",
                                                                                              {
                                                                                                staticClass:
                                                                                                  "badge bg-info text-white",
                                                                                              },
                                                                                              [
                                                                                                e._v(
                                                                                                  " " +
                                                                                                    e._s(
                                                                                                      e
                                                                                                        .currentSortIndexes[
                                                                                                        a
                                                                                                      ]
                                                                                                        .order +
                                                                                                        1
                                                                                                    ) +
                                                                                                    " "
                                                                                                ),
                                                                                              ]
                                                                                            )
                                                                                          : t(
                                                                                              "small",
                                                                                              [
                                                                                                t(
                                                                                                  "font-awesome-icon",
                                                                                                  {
                                                                                                    attrs:
                                                                                                      {
                                                                                                        icon: "times",
                                                                                                      },
                                                                                                  }
                                                                                                ),
                                                                                              ],
                                                                                              1
                                                                                            ),
                                                                                      ]
                                                                                    )
                                                                                  : e._e(),
                                                                              ],
                                                                              1
                                                                            )
                                                                          : e._e(),
                                                                      ]
                                                                    )
                                                                  : e._e(),
                                                                t(
                                                                  "td",
                                                                  {
                                                                    directives:
                                                                      [
                                                                        {
                                                                          name: "tooltip",
                                                                          rawName:
                                                                            "v-tooltip",
                                                                          value:
                                                                            {
                                                                              placement:
                                                                                "top",
                                                                              content:
                                                                                i.tooltip,
                                                                              trigger:
                                                                                i.tooltip
                                                                                  ? "hover"
                                                                                  : "manual",
                                                                            },
                                                                          expression: `{
                            placement: 'top',
                            content: cell.tooltip,
                            trigger: cell.tooltip ? 'hover' : 'manual',
                          }`,
                                                                        },
                                                                      ],
                                                                    staticClass:
                                                                      "generated-cell-element generated-cell-element-content sticky-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content",
                                                                    class:
                                                                      e
                                                                        .configFinal
                                                                        .columnClasses[
                                                                        a
                                                                      ] +
                                                                      " " +
                                                                      e
                                                                        .cellClassesParsed[
                                                                        s
                                                                      ][a],
                                                                    attrs: {
                                                                      colspan:
                                                                        !e
                                                                          .showHeadlines[
                                                                          a
                                                                        ] &&
                                                                        !e
                                                                          .configFinal
                                                                          .sorts[
                                                                          a
                                                                        ]
                                                                          ? 2
                                                                          : 1,
                                                                    },
                                                                    on: {
                                                                      click:
                                                                        function (
                                                                          o
                                                                        ) {
                                                                          return e.onCellClick(
                                                                            o,
                                                                            i
                                                                          );
                                                                        },
                                                                    },
                                                                  },
                                                                  [
                                                                    e._t(
                                                                      "sticky-cell-complete",
                                                                      function () {
                                                                        return [
                                                                          e._t(
                                                                            "sticky-cell-content",
                                                                            function () {
                                                                              return [
                                                                                e
                                                                                  .configFinal
                                                                                  .columns[
                                                                                  a
                                                                                ]
                                                                                  .cellFormatter &&
                                                                                e.cellFormatters(
                                                                                  a,
                                                                                  i
                                                                                )
                                                                                  .type ===
                                                                                  "html"
                                                                                  ? t(
                                                                                      "div",
                                                                                      {
                                                                                        staticClass:
                                                                                          "cell-inner",
                                                                                        class:
                                                                                          "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html",
                                                                                        domProps:
                                                                                          {
                                                                                            innerHTML:
                                                                                              e._s(
                                                                                                e.cellFormatters(
                                                                                                  a,
                                                                                                  i
                                                                                                )
                                                                                                  .value
                                                                                              ),
                                                                                          },
                                                                                      }
                                                                                    )
                                                                                  : e
                                                                                      .configFinal
                                                                                      .columns[
                                                                                      a
                                                                                    ]
                                                                                      .cellFormatter
                                                                                  ? t(
                                                                                      "div",
                                                                                      {
                                                                                        staticClass:
                                                                                          "cell-inner",
                                                                                        class:
                                                                                          "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value",
                                                                                      },
                                                                                      [
                                                                                        e._v(
                                                                                          " " +
                                                                                            e._s(
                                                                                              e.cellFormatters(
                                                                                                a,
                                                                                                i
                                                                                              )
                                                                                                .value
                                                                                            ) +
                                                                                            " "
                                                                                        ),
                                                                                      ]
                                                                                    )
                                                                                  : e.valueToString(
                                                                                      i.html
                                                                                    )
                                                                                  ? t(
                                                                                      "div",
                                                                                      {
                                                                                        staticClass:
                                                                                          "cell-inner",
                                                                                        class:
                                                                                          "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html",
                                                                                        domProps:
                                                                                          {
                                                                                            innerHTML:
                                                                                              e._s(
                                                                                                i.html
                                                                                              ),
                                                                                          },
                                                                                      }
                                                                                    )
                                                                                  : i.component
                                                                                  ? t(
                                                                                      "div",
                                                                                      {
                                                                                        staticClass:
                                                                                          "cell-inner",
                                                                                        class:
                                                                                          "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component",
                                                                                      },
                                                                                      [
                                                                                        t(
                                                                                          i
                                                                                            .component
                                                                                            .name,
                                                                                          e._b(
                                                                                            {
                                                                                              tag: "component",
                                                                                              on: {
                                                                                                action:
                                                                                                  e.handleComponentEvent,
                                                                                              },
                                                                                            },
                                                                                            "component",
                                                                                            i
                                                                                              .component
                                                                                              .props,
                                                                                            !1
                                                                                          )
                                                                                        ),
                                                                                      ],
                                                                                      1
                                                                                    )
                                                                                  : e.valueToString(
                                                                                      i.text
                                                                                    )
                                                                                  ? t(
                                                                                      "div",
                                                                                      {
                                                                                        staticClass:
                                                                                          "cell-inner",
                                                                                        class:
                                                                                          "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text",
                                                                                      },
                                                                                      [
                                                                                        e._v(
                                                                                          " " +
                                                                                            e._s(
                                                                                              i.text
                                                                                            ) +
                                                                                            " "
                                                                                        ),
                                                                                      ]
                                                                                    )
                                                                                  : e._e(),
                                                                              ];
                                                                            },
                                                                            {
                                                                              cell: i,
                                                                            }
                                                                          ),
                                                                        ];
                                                                      },
                                                                      {
                                                                        cell: i,
                                                                      }
                                                                    ),
                                                                  ],
                                                                  2
                                                                ),
                                                              ]
                                                            );
                                                          }
                                                        ),
                                                      ],
                                                      2
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                      ]
                                    )
                                  : e._e(),
                              ]
                            : e._e(),
                        ];
                      }),
                    ],
                    2
                  ),
                ]
              ),
          e.noRows && !e.ajaxLoading
            ? [
                t(
                  "div",
                  {
                    staticClass:
                      "clearfix slot-no-results slot quintable--table-container--no-results",
                  },
                  [
                    e._t("no-results", function () {
                      return [
                        t(
                          "div",
                          {
                            staticClass:
                              "text-center p-3 quintable--table-container--no-results--results",
                          },
                          [
                            t("em", {
                              domProps: {
                                innerHTML: e._s(e.configFinal.emptyPlaceholder),
                              },
                            }),
                          ]
                        ),
                      ];
                    }),
                    t("hr"),
                  ],
                  2
                ),
              ]
            : e._e(),
        ],
        2
      ),
      e.ajaxLoading
        ? t(
            "div",
            { staticClass: "slot-loading slot quintable--loading" },
            [
              e._t("loading", function () {
                return [
                  t(
                    "div",
                    {
                      staticClass:
                        "loader-wrapper quintable--loading--loader-wrapper",
                      style: "height:" + e.loaderHeight + "px;",
                    },
                    [
                      t(
                        "div",
                        {
                          staticClass:
                            "loader text-center py-4 quintable--loading--loader-wrapper--loader",
                        },
                        [
                          t("font-awesome-icon", {
                            staticClass:
                              "ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader",
                            attrs: { icon: "circle-notch", spin: "" },
                          }),
                        ],
                        1
                      ),
                    ]
                  ),
                ];
              }),
            ],
            2
          )
        : e._e(),
      t("div", { staticClass: "clearfix quintable--table-footer-container" }, [
        t("div", { staticClass: "row" }, [
          t(
            "div",
            {
              staticClass:
                "col-lg-4 quintable--table-footer-container--sort-container",
            },
            [
              e.configFinal.multiSortSelect || e.configFinal.pageSortSelect
                ? t(
                    "div",
                    {
                      staticClass:
                        "pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select",
                    },
                    [
                      e.configFinal.multiSortSelect
                        ? t(
                            "span",
                            { class: e.configFinal.pageSort ? "me-3" : "" },
                            [
                              t(
                                "p-check",
                                {
                                  staticClass:
                                    "p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select",
                                  attrs: { value: "true" },
                                  model: {
                                    value: e.multiSort,
                                    callback: function (s) {
                                      e.multiSort = s;
                                    },
                                    expression: "multiSort",
                                  },
                                },
                                [e._v(e._s(e.configFinal.multiSortPlaceholder))]
                              ),
                            ],
                            1
                          )
                        : e._e(),
                      e.configFinal.pageSortSelect
                        ? t(
                            "p-check",
                            {
                              staticClass:
                                "p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select",
                              attrs: { value: "true" },
                              model: {
                                value: e.pageSort,
                                callback: function (s) {
                                  e.pageSort = s;
                                },
                                expression: "pageSort",
                              },
                            },
                            [e._v(e._s(e.configFinal.pageSortPlaceholder))]
                          )
                        : e._e(),
                    ],
                    1
                  )
                : e._e(),
            ]
          ),
          t(
            "div",
            {
              staticClass:
                "col-lg-8 quintable--table-footer-container--pagination-wrapper",
            },
            [
              e.configFinal && e.configFinal.pagination
                ? t(
                    "div",
                    {
                      staticClass:
                        "float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container",
                    },
                    [
                      e.configFinal.rowsSelect
                        ? t(
                            "div",
                            {
                              staticClass:
                                "mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select",
                            },
                            [
                              t("span", {
                                staticClass:
                                  "d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder",
                                domProps: {
                                  innerHTML: e._s(
                                    e.configFinal.rowsPlaceholder
                                  ),
                                },
                              }),
                              t("v-select", {
                                staticClass:
                                  "d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select",
                                attrs: {
                                  options: e.paginationOptionsFilled,
                                  clearable: !1,
                                },
                                model: {
                                  value: e.currentRowsPerPageProperty,
                                  callback: function (s) {
                                    e.currentRowsPerPageProperty = s;
                                  },
                                  expression: "currentRowsPerPageProperty",
                                },
                              }),
                            ],
                            1
                          )
                        : e._e(),
                      e.configFinal && e.configFinal.pagination && e.pages > 1
                        ? t(
                            "nav",
                            {
                              staticClass:
                                "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav",
                              class: {
                                "me-3": e.numberOfVisibleRows,
                                disabled: e.ajaxLoading,
                              },
                            },
                            [
                              t(
                                "ul",
                                {
                                  staticClass:
                                    "pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination",
                                },
                                [
                                  e.pages > e.pageRange
                                    ? t(
                                        "li",
                                        {
                                          staticClass: "page-item",
                                          class: {
                                            disabled: e.currentPage <= 1,
                                          },
                                          on: {
                                            click: function (s) {
                                              return e.gotoPage("first");
                                            },
                                          },
                                        },
                                        [
                                          t(
                                            "span",
                                            { staticClass: "page-link" },
                                            [
                                              t("font-awesome-icon", {
                                                attrs: {
                                                  icon: "angle-double-left",
                                                },
                                              }),
                                            ],
                                            1
                                          ),
                                        ]
                                      )
                                    : e._e(),
                                  t(
                                    "li",
                                    {
                                      staticClass: "page-item",
                                      class: { disabled: e.currentPage <= 1 },
                                      on: {
                                        click: function (s) {
                                          return e.gotoPage("prev");
                                        },
                                      },
                                    },
                                    [
                                      t(
                                        "span",
                                        { staticClass: "page-link" },
                                        [
                                          t("font-awesome-icon", {
                                            attrs: { icon: "angle-left" },
                                          }),
                                        ],
                                        1
                                      ),
                                    ]
                                  ),
                                  e.pageRange < e.pages && e.visiblePages[0] > 1
                                    ? t(
                                        "li",
                                        {
                                          staticClass: "page-item",
                                          on: {
                                            click: function (s) {
                                              return e.updatePageOffset(-1);
                                            },
                                          },
                                        },
                                        [
                                          t(
                                            "span",
                                            { staticClass: "page-link" },
                                            [e._v(" ... ")]
                                          ),
                                        ]
                                      )
                                    : e._e(),
                                  e._l(e.visiblePages, function (s) {
                                    return t(
                                      "li",
                                      {
                                        key: "pagination-item-" + s,
                                        staticClass: "page-item",
                                        class: { active: s === e.currentPage },
                                        on: {
                                          click: function (i) {
                                            return e.gotoPage(s);
                                          },
                                        },
                                      },
                                      [
                                        t(
                                          "span",
                                          { staticClass: "page-link" },
                                          [e._v(" " + e._s(s) + " ")]
                                        ),
                                      ]
                                    );
                                  }),
                                  e.pageRange < e.pages &&
                                  e.visiblePages[e.visiblePages.length - 1] <
                                    e.pages
                                    ? t(
                                        "li",
                                        {
                                          staticClass: "page-item",
                                          on: {
                                            click: function (s) {
                                              return e.updatePageOffset(1);
                                            },
                                          },
                                        },
                                        [
                                          t(
                                            "span",
                                            { staticClass: "page-link" },
                                            [e._v(" ... ")]
                                          ),
                                        ]
                                      )
                                    : e._e(),
                                  t(
                                    "li",
                                    {
                                      staticClass: "page-item",
                                      class: {
                                        disabled: e.pages === e.currentPage,
                                      },
                                      on: {
                                        click: function (s) {
                                          return e.gotoPage("next");
                                        },
                                      },
                                    },
                                    [
                                      t(
                                        "span",
                                        { staticClass: "page-link" },
                                        [
                                          t("font-awesome-icon", {
                                            attrs: { icon: "angle-right" },
                                          }),
                                        ],
                                        1
                                      ),
                                    ]
                                  ),
                                  e.pages > e.pageRange
                                    ? t(
                                        "li",
                                        {
                                          staticClass: "page-item",
                                          class: {
                                            disabled: e.pages === e.currentPage,
                                          },
                                          on: {
                                            click: function (s) {
                                              return e.gotoPage("last");
                                            },
                                          },
                                        },
                                        [
                                          t(
                                            "span",
                                            { staticClass: "page-link" },
                                            [
                                              t("font-awesome-icon", {
                                                attrs: {
                                                  icon: "angle-double-right",
                                                },
                                              }),
                                            ],
                                            1
                                          ),
                                        ]
                                      )
                                    : e._e(),
                                ],
                                2
                              ),
                            ]
                          )
                        : e._e(),
                      e.numberOfVisibleRows
                        ? t(
                            "span",
                            {
                              staticClass:
                                "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows",
                            },
                            [
                              e._v(
                                e._s(e.firstVisibleRow) +
                                  "-" +
                                  e._s(e.lastVisibleRow) +
                                  " " +
                                  e._s(
                                    e.configFinal.numberOfVisibleRowsFillerWord
                                  ) +
                                  " " +
                                  e._s(e.numberOfVisibleRows)
                              ),
                            ]
                          )
                        : e._e(),
                    ]
                  )
                : e._e(),
            ]
          ),
        ]),
      ]),
      t(
        "div",
        { staticClass: "footer slot slot-footer quintable--footer" },
        [e._t("footer")],
        2
      ),
    ]);
  },
  He = [],
  Ue = f(De, Be, He, !1, null, "847a5e4e", null, null);
const g = Ue.exports,
  Ie = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age" },
            { headline: "Birth Place" },
            { headline: "Job" },
          ],
        },
        rows: [
          [
            { html: "<em>John Doe</em>" },
            { text: 40 },
            { text: "New York" },
            { text: "CFO" },
          ],
          [
            { text: "Mia Wong", classes: "text-primary" },
            { text: 50 },
            { text: "Beijing" },
            { text: "CEO" },
          ],
          [
            { text: "Peter Stanbridge" },
            { text: 18 },
            { text: "London" },
            { text: "Trainee", align: "end" },
          ],
          {
            cells: [
              { text: "Natalie Lee-Walsh" },
              { text: 25 },
              { text: "Dublin" },
              { text: "Managing Director" },
            ],
            classes: "text-danger",
          },
        ],
      };
    },
  };
var Me = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Just a simple table "),
          ],
          1
        ),
        t("VueQuintable", { attrs: { config: e.config, rows: e.rows } }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  Je = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>

<script>
    import VueQuintable from "../components/VueQuintable.vue"

    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                },

                rows: [
                    [
                        {
                            html: "<em>John Doe</em>"
                        },
                        {
                            text: 40
                        },
                        {
                            text: "New York"
                        },
                        {
                            text: "CFO"
                        },
                    ],
                    [
                        {
                            text: "Mia Wong",
                            classes:"text-primary"
                        },
                        {
                            text: 50
                        },
                        {
                            text: "Beijing"
                        },
                        {
                            text: "CEO"
                        },
                    ],
                    [
                        {
                            text: "Peter Stanbridge"
                        },
                        {
                            text: 18
                        },
                        {
                            text: "London"
                        },
                        {
                            text: "Trainee",
                            align:"end"
                        },
                    ],
                    {
                         cells:[   {
                                text: "Natalie Lee-Walsh"
                            },
                            {
                                text: 25
                            },
                            {
                                text: "Dublin"
                            },
                            {
                                text: "Managing Director"
                            },
                        ],
                        classes:"text-danger"
                    },
                ],
            }
        }
    }
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  Ge = f(Ie, Me, Je, !1, null, null, null, null);
const ze = Ge.exports,
  Ke = {
    components: { VueQuintable: g },
    data() {
      return { selectedRows: [], preSelectedRows: [], selectAllRows: !1 };
    },
    computed: {
      config() {
        return {
          columns: [
            { headline: "Name", classes: "first-and-last-name", sort: !0 },
            { headline: "Age" },
            { headline: "Birth Place" },
            { headline: "Job" },
          ],
          selectPosition: "pre",
          select: !0,
          selectAll: !0,
          prettySelect: !0,
          pagination: 8,
          selectAllRows: this.selectAllRows,
          enableRowTabIndex: !0,
          search: !0,
        };
      },
      rows() {
        let n = 24;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++)
          e.push({
            selected: s % 2 === 0,
            disableSelect: s === 1,
            index: s,
            cells: [
              { text: t.name({ nationality: "en" }) },
              { text: t.age() },
              { text: t.city() },
              { text: t.profession() },
            ],
          });
        return e;
      },
    },
    watch: {
      selectAllRows() {
        this.selectedRows = [];
        const n = [];
        for (let e = 0; e < this.rows.length; e++)
          (e === 0 || e % 2 !== 0) && n.push({ key: "index", value: e });
        this.preSelectedRows = n;
      },
      selectedRows() {
        alert(
          `Selection Changed - Names:
` +
            (this.selectedRows.length
              ? "- " +
                this.selectedRows.map((n) => n.cells[0].text).join(`
- `)
              : "No rows selected")
        );
      },
    },
  };
var We = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Select rows by clicking on checkboxes "),
          ],
          1
        ),
        t(
          "div",
          { staticClass: "mb-3" },
          [
            t(
              "p-check",
              {
                staticClass: "p-switch",
                model: {
                  value: e.selectAllRows,
                  callback: function (s) {
                    e.selectAllRows = s;
                  },
                  expression: "selectAllRows",
                },
              },
              [e._v("Select rows cross pages")]
            ),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: {
            preSelectedRows: e.preSelectedRows,
            "selected-rows": e.selectedRows,
            config: e.config,
            rows: e.rows,
          },
          on: {
            "update:selectedRows": function (s) {
              e.selectedRows = s;
            },
            "update:selected-rows": function (s) {
              e.selectedRows = s;
            },
          },
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  Ye = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            n._v(" "),
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
    <div class="mb-3">
        <p-check class="p-switch" v-model="selectAllRows">Select rows cross pages</p-check>
    </div>

    <VueQuintable :preSelectedRows="preSelectedRows" selected-rows.sync="selectedRows" :config="config" :rows="rows"></VueQuintable>
</template>
<script>

    import VueQuintable from "../components/VueQuintable.vue"
    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                selectedRows:[],
                preSelectedRows:[],
                selectAllRows:false,
            }
        },
        computed:{
            config(){
                return {
                    columns: [
                        {
                            headline: "Name",
                            classes: "first-and-last-name",
                            sort:true,
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                    selectPosition:"pre",
                    select:true,
                    selectAll:true,
                    prettySelect:true,
                    pagination:8,
                    selectAllRows:this.selectAllRows,
                    enableRowTabIndex: true,

                }
            },
            rows(){

                let count = 24;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push(
                        {
                            selected:i % 2 === 0,
                            disableSelect: i===1,
                            index:i,
                            cells:[
                            {
                                text:chance.name({ nationality: 'en' })
                            },
                            {
                                text:chance.age()
                            },
                            {
                                text:chance.city()
                            },
                            {
                                text:chance.profession()
                            },
                        ]
                        });
                }

                return rows;


            }
        },
        watch:{
            selectAllRows(){
                this.selectedRows = [];

                const selectedRows = [];
                for(let i = 0; i < this.rows.length; i++){
                    if(i===0 || i % 2 !== 0 ){
                        selectedRows.push({
                            key:"index",
                            value:i,
                        });
                    }
                }

                this.preSelectedRows = selectedRows;

            },
            selectedRows(){
                alert("Selection Changed - Names:\\n" + (this.selectedRows.length?"- "+this.selectedRows.map((row)=>{return row.cells[0].text}).join("\\n- "): "No rows selected"));
            }
        }
    }
<\/script>`),
            ]),
            n._v(`
`),
          ]),
        ]
      );
    },
  ],
  Xe = f(Ke, We, Ye, !1, null, null, null, null);
const Ze = Xe.exports,
  et = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age" },
            { headline: "Birth Place" },
            { headline: "Job" },
          ],
          pagination: 5,
          pageRange: 3,
          rowsSelect: !0,
        },
      };
    },
    computed: {
      rows() {
        let n = 250;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++)
          e.push([
            { text: t.name({ nationality: "en" }) },
            { text: t.age() },
            { text: t.city() },
            { text: t.profession() },
          ]);
        return e;
      },
    },
  };
var tt = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Switch pages by clicking on pagination below "),
          ],
          1
        ),
        t("VueQuintable", { attrs: { config: e.config, rows: e.rows } }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  nt = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>

    import Chance from "chance";
    import VueQuintable from "../components/VueQuintable.vue"
    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                    pagination:5,
                    pageRange:3,
                    rowsSelect:true
                },

            }
        },
        computed:{
            rows(){

                let count = 250;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  st = f(et, tt, nt, !1, null, null, null, null);
const it = st.exports,
  at = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age", sort: !0 },
            { headline: "Birth Place", sort: !0 },
            { headline: "Job", sort: !0, firstSortDirection: "DESC" },
          ],
          multiSort: !1,
          multiSortSelect: !0,
          pageSort: !1,
          pageSortSelect: !0,
          pagination: 5,
          search: !0,
        },
        sortOrder: [{ index: 1, asc: !1 }],
      };
    },
    computed: {
      rows() {
        let n = 30;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++) {
          const i = Math.ceil(Math.random() * 10);
          e.push([
            { text: t.name({ nationality: "en" }) },
            { text: t.age() },
            { text: t.city() },
            {
              html:
                '<span class="me-2">' +
                t.profession() +
                "</span><em>[" +
                i +
                "]</em>",
              sortValue: i,
            },
          ]);
        }
        return e;
      },
    },
  };
var ot = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Hover and click on headlines for sorting "),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: { "sort-order": e.sortOrder, config: e.config, rows: e.rows },
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary mt-3",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  lt = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(` <template>
        <VueQuintable  :sort-order="sortOrder" :config="config" :rows="rows"></VueQuintable>
</template>
<script>
    import VueQuintable from "../components/VueQuintable.vue"
    import Chance from "chance";

    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                            sort:true

                        }, {
                            headline: "Birth Place",
                            sort: true,
                        }, {
                            headline: "Job",
                            sort:true,
                            firstSortDirection: "DESC",
                        }
                    ],
                    multiSort:true,
                    multiSortSelect:true,
                    pageSort:true,
                    pageSortSelect:true,
                    pagination:5,
                    search:true,
                },
                sortOrder:[{
                    index:1,
                    asc:false,
                }]

            }
        },
        computed:{
            rows(){

                let count = 30;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){

                    const randSortValue = Math.ceil(Math.random() * 10);

                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            html:"<span class\\"me-2\\">" + chance.profession() +"</span><em>"+ "["+randSortValue+"]</em>",
                            sortValue: randSortValue
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  rt = f(at, ot, lt, !1, null, null, null, null);
const ct = rt.exports,
  dt = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age", breakpoint: "md" },
            { headline: "Birth Place", breakpoint: "xxl" },
            { headline: "Job", breakpoint: "xl" },
          ],
        },
      };
    },
    computed: {
      rows() {
        let n = 10;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++)
          e.push([
            { text: t.name({ nationality: "en" }) },
            { text: t.age() },
            { text: t.city() },
            { text: t.profession() },
          ]);
        return e;
      },
    },
  };
var ut = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Resize your brower window to see responsive behaviour "),
          ],
          1
        ),
        t("VueQuintable", { attrs: { config: e.config, rows: e.rows } }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  ht = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
    <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>
    import VueQuintable from "../components/VueQuintable.vue"
    import Chance from "chance";

    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                            breakpoint:"md"
                        }, {
                            headline: "Birth Place",
                            breakpoint:"xxl"
                        }, {
                            headline: "Job",
                            breakpoint:"xl"
                        }
                    ],
                },


            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  pt = f(dt, ut, ht, !1, null, null, null, null);
const ft = pt.exports,
  mt = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age" },
            { headline: "Birth Place" },
            { headline: "Job" },
          ],
        },
        input: "New York",
        age: 18,
      };
    },
    computed: {
      initialRows() {
        let n = 10;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++)
          e.push([
            { text: t.name({ nationality: "en" }) },
            { text: t.age() },
            { text: t.city() },
            { text: t.profession() },
          ]);
        return e;
      },
      rows() {
        return this.initialRows.map(
          (n, e) => (
            e === 0 && (n[2].text = this.input),
            e === 0 && (n[1].text = this.age),
            n
          )
        );
      },
    },
    mounted() {
      setInterval(() => {
        this.age >= 35 ? (this.age = 18) : this.age++;
      }, 1e3);
    },
  };
var gt = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Change the value in the input to see affect for the table "),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: { config: e.config, rows: e.rows },
          scopedSlots: e._u([
            {
              key: "header",
              fn: function () {
                return [
                  t("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.input,
                        expression: "input",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: { type: "text" },
                    domProps: { value: e.input },
                    on: {
                      input: function (s) {
                        s.target.composing || (e.input = s.target.value);
                      },
                    },
                  }),
                ];
              },
              proxy: !0,
            },
          ]),
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  wt = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>

    import VueQuintable from "../components/VueQuintable.vue"

    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                },
                input:"New York",
                age:18
            }
        },
        computed:{
            initialRows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){

                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()

                        },
                    ]);
                }

                return rows;
            },
            rows(){
                return this.initialRows.map((row,index)=>{
                    if(index === 0){
                        row[2].text = this.input;
                    }

                    if(index === 0){
                        row[1].text = this.age;
                    }

                    return row;
                });
            }
        },

        mounted(){
            setInterval(()=>{

                if(this.age >=35){
                    this.age = 18;
                }else{
                    this.age++;
                }

            },1000);
        }

    }
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  bt = f(mt, gt, wt, !1, null, null, null, null);
const vt = bt.exports,
  _t = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age", sort: !0 },
            { headline: "Birth Place" },
            { headline: "Job", breakpoint: "all" },
          ],
          pagination: 5,
          rowsSelect: !0,
          search: !0,
          searchLength: 2,
        },
        eventsLog: [],
      };
    },
    computed: {
      rows() {
        let n = 20;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++)
          e.push([
            { text: t.name({ nationality: "en" }) },
            { type: "prevent-toggle", value: t.age() },
            { text: t.city(), classes: "prevent-toggle" },
            { text: t.profession() },
          ]);
        return e;
      },
    },
    methods: {
      eventListener(n, e, t) {
        const s = this.eventsLog;
        if (
          (s.push({
            event: e,
            data: JSON.stringify(n),
            target: t ? t.outerHTML : null,
          }),
          (this.eventsLog = s),
          this.eventsLog.length > 4)
        ) {
          const i = this.eventsLog;
          i.splice(0, 1), (this.eventsLog = i);
        }
      },
    },
  };
var xt = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Interact with the table to so when events get fired "),
          ],
          1
        ),
        this.eventsLog.length
          ? t(
              "div",
              { staticClass: "list-group mb-3" },
              e._l(e.eventsLog, function (s, i) {
                return t(
                  "div",
                  {
                    key: i,
                    staticClass: "list-group-item",
                    class: {
                      "bg-info text-white": i === e.eventsLog.length - 1,
                    },
                  },
                  [
                    e._v(" Event " + e._s(s.event) + " was fired with data: "),
                    t("div", [e._v(e._s(s.data))]),
                    s.target
                      ? t("div", { staticClass: "mt-2" }, [
                          e._v("Target:" + e._s(s.target)),
                        ])
                      : e._e(),
                  ]
                );
              }),
              0
            )
          : e._e(),
        t("VueQuintable", {
          attrs: { config: e.config, rows: e.rows },
          on: {
            "update:sort": e.eventListener,
            "update:page": e.eventListener,
            "update:search": e.eventListener,
            "update:rows-per-page": e.eventListener,
            "click:row": e.eventListener,
            "click:cell": e.eventListener,
            "auxclick:cell": e.eventListener,
            "auxclick:row": e.eventListener,
            "expand:row": e.eventListener,
            "filtered:rows": e.eventListener,
            "hover:row": e.eventListener,
            "collapse:row": e.eventListener,
            "change:breakpoints": e.eventListener,
          },
          scopedSlots: e._u([
            {
              key: "cell-content",
              fn: function (s) {
                return [
                  s.cell.type === "prevent-toggle"
                    ? t("span", { staticClass: "prevent-toggle" }, [
                        e._v(" " + e._s(s.cell.value) + " "),
                      ])
                    : e._e(),
                ];
              },
            },
          ]),
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  yt = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { pre: !0, attrs: { class: "language-markup" } }, [
              n._v(`<template>
    <div class="list-group mb-3" v-if="this.eventsLog.length">
      <div
        :key="index"
        class="list-group-item"
        v-for="(event, index) in eventsLog"
        :class="{ 'bg-info text-white': index === eventsLog.length - 1 }"
      >
        Event {{ event.event }} was fired with data:
        <div>{{ event.data }}</div>
        <div class="mt-2" v-if="event.target">Target:{{ event.target }}</div>
      </div>
    </div>
    <VueQuintable
      @update:sort="eventListener"
      @update:page="eventListener"
      @update:search="eventListener"
      @update:rows-per-page="eventListener"
      @click:row="eventListener"
      @click:cell="eventListener"
      @expand:row="eventListener"
      @filtered:rows="eventListener"
      @hover:row="eventListener"
      @collapse:row="eventListener"
      @change:breakpoints="eventListener"
      :config="config"
      :rows="rows"
    >
      <template #cell-content="context">
        <span
          v-if="context.cell.type === 'prevent-toggle'"
          class="prevent-toggle"
        >
          {{ context.cell.value }}
        </span>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";
import Chance from "chance";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
            sort: true,
          },
          {
            headline: "Birth Place",
          },
          {
            headline: "Job",
            breakpoint: "all",
          },
        ],
        pagination: 5,
        rowsSelect: true,
        search: true,
        searchLength: 2,
      },
      eventsLog: [],
    };
  },
  computed: {
    rows() {
      let count = 20;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push([
          {
            text: chance.name({ nationality: "en" }),
          },
          {
            type: "prevent-toggle",
            value: chance.age(),
          },
          {
            text: chance.city(),
            classes: "prevent-toggle",
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    },
  },
 methods: {
    eventListener(data, event, target) {
      const eventsLog = this.eventsLog;
      eventsLog.push({
        event: event,
        data: JSON.stringify(data),
        target: target ? target.outerHTML : null,
      });
      this.eventsLog = eventsLog;

      if (this.eventsLog.length > 5) {
        const eventsLog = this.eventsLog;
        eventsLog.splice(0, 1);
        this.eventsLog = eventsLog;
      }
    },
  },
};
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  Ct = f(_t, xt, yt, !1, null, null, null, null);
const St = Ct.exports,
  kt = {
    props: { updated: { type: [Boolean, Date] } },
    components: { VueQuintable: g },
    data() {
      return { loading: !1, remoteConfig: {}, remoteRows: [] };
    },
    mounted() {
      (this.loading = !0),
        R.get(
          "https://sensetence.com/vue-quintable-demo/data.php?fetch=true"
        ).then((n) => {
          (this.remoteRows = n.data.rows),
            (this.remoteConfig = n.data.config),
            (this.loading = !1);
        });
    },
    watch: {
      updated() {
        (this.remoteConfig = null),
          (this.remoteRows = null),
          (this.loading = !0),
          R.get(
            "https://sensetence.com/vue-quintable-demo/data.php?fetch=true"
          ).then((n) => {
            (this.remoteRows = n.data.rows),
              (this.remoteConfig = n.data.config),
              (this.loading = !1);
          });
      },
    },
  };
var Rt = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Initially pulled config and rows from server via ajax "),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: {
            loading: e.loading,
            config: e.remoteConfig,
            rows: e.remoteRows,
          },
          scopedSlots: e._u([
            {
              key: "loading",
              fn: function () {
                return [
                  t(
                    "div",
                    {
                      staticClass:
                        "text-center py-3 mb-3 text-white bg-success",
                    },
                    [
                      e._v(" Loading... "),
                      t("font-awesome-icon", {
                        staticClass: "ms-3",
                        attrs: { icon: "circle-notch", spin: "" },
                      }),
                    ],
                    1
                  ),
                ];
              },
              proxy: !0,
            },
          ]),
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  Ft = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            n._v("           "),
            e("code", { staticClass: "language-markup" }, [
              n._v(`
      <template>
           <VueQuintable :loading="loading" :config="remoteConfig" :rows="remoteRows">
              <template v-slot:loading>
                  <div class="text-center py-3 mb-3 text-white bg-success">
                      Loading... <font-awesome-icon class="ms-3" icon="circle-notch" spin></font-awesome-icon>
                  </div>
              </template>
          </VueQuintable>
      </template>

      <script>
          import axios from 'axios'
          import VueQuintable from "../components/VueQuintable.vue"

          export default {
              components:{
                  VueQuintable
              },
              data() {
                  return {
                      loading:false,
                      remoteConfig:{},
                      remoteRows:[]
                  }
              },
              mounted(){
                  this.remoteConfig = null;
                  this.remoteRows = null;
                  this.loading = true;
                  axios.get("https://sensetence.com/vue-quintable-demo/data.php?fetch=true").then((response)=>{
                      this.remoteRows = response.data.rows;
                      this.remoteConfig = response.data.config;
                      this.loading = false;
                  });
              }

          }

      <\/script>
  `),
            ]),
            n._v(`
      `),
          ]),
        ]
      );
    },
  ],
  Pt = f(kt, Rt, Ft, !1, null, null, null, null);
const At = Pt.exports,
  $t = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age" },
            { headline: "Printable" },
            { headline: "Active" },
          ],
          search: !0,
          useFuzzySearch: !0,
          searchLength: 3,
          filterRelation: "AND",
          searchPlaceholder: "Search rows...",
        },
        filters: {},
        filterGroupsDefaults: [
          {
            items: [
              { items: [{ name: "name" }, { name: "active" }], relation: "OR" },
              { items: [{ name: "printable" }] },
            ],
            relation: "AND",
          },
        ],
        filterGroupsActive: !1,
        printableFilter: !1,
        activeFilter: !1,
        dynamicFilter: !1,
        number: 0,
      };
    },
    computed: {
      filterGroups() {
        return this.filterGroupsActive ? this.filterGroupsDefaults : [];
      },
      rows() {
        let n = 50;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++) {
          const i = Math.random() >= 0.5,
            a = Math.random() >= 0.5,
            o = t.name({ nationality: "en" }),
            r = t.age();
          e.push({
            cells: [
              { text: o },
              { text: r },
              {
                component: {
                  name: "font-awesome-icon",
                  props: { icon: i ? "check" : "times" },
                },
              },
              {
                component: {
                  name: "font-awesome-icon",
                  props: { icon: a ? "check" : "times" },
                },
              },
            ],
            filters: { active: a, printable: i, name: o },
          });
        }
        return e;
      },
    },
    watch: {
      activeFilter(n) {
        n
          ? this.$set(this.filters, "active", !0)
          : this.$delete(this.filters, "active");
      },
      printableFilter(n) {
        n
          ? this.$set(this.filters, "printable", !0)
          : this.$delete(this.filters, "printable");
      },
      dynamicFilter(n) {
        n
          ? this.$set(this.filters, "name", {
              operator: "matches",
              values: new RegExp("Ma"),
            })
          : this.$delete(this.filters, "name");
      },
    },
    methods: {
      visibleRows(n) {
        this.number = n.length;
      },
    },
  };
var Ot = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Filter rows by adjust filter and settings switches "),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: {
            "filter-groups": e.filterGroups,
            filters: e.filters,
            config: e.config,
            rows: e.rows,
          },
          on: { "filtered:rows": e.visibleRows },
          scopedSlots: e._u([
            {
              key: "header",
              fn: function () {
                return [
                  t("strong", { staticClass: "mb-2" }, [e._v("Filters:")]),
                  t(
                    "div",
                    { staticClass: "clearfix py-2" },
                    [
                      t(
                        "p-check",
                        {
                          staticClass: "p-switch",
                          attrs: { value: "true" },
                          model: {
                            value: e.activeFilter,
                            callback: function (s) {
                              e.activeFilter = s;
                            },
                            expression: "activeFilter",
                          },
                        },
                        [e._v("Active")]
                      ),
                    ],
                    1
                  ),
                  t(
                    "div",
                    { staticClass: "clearfix py-2" },
                    [
                      t(
                        "p-check",
                        {
                          staticClass: "p-switch",
                          attrs: { value: "true" },
                          model: {
                            value: e.printableFilter,
                            callback: function (s) {
                              e.printableFilter = s;
                            },
                            expression: "printableFilter",
                          },
                        },
                        [e._v("Printable")]
                      ),
                    ],
                    1
                  ),
                  t(
                    "div",
                    { staticClass: "clearfix py-2" },
                    [
                      t(
                        "p-check",
                        {
                          staticClass: "p-switch",
                          attrs: { value: "true" },
                          model: {
                            value: e.dynamicFilter,
                            callback: function (s) {
                              e.dynamicFilter = s;
                            },
                            expression: "dynamicFilter",
                          },
                        },
                        [e._v("Regex for name (/Ma/)")]
                      ),
                    ],
                    1
                  ),
                  t("hr"),
                  t("strong", { staticClass: "mb-2" }, [e._v("Settings:")]),
                  t(
                    "div",
                    { staticClass: "clearfix py-2" },
                    [
                      t(
                        "p-check",
                        {
                          staticClass: "p-switch",
                          attrs: { value: "true" },
                          model: {
                            value: e.filterGroupsActive,
                            callback: function (s) {
                              e.filterGroupsActive = s;
                            },
                            expression: "filterGroupsActive",
                          },
                        },
                        [e._v("Toggle Filter Groups")]
                      ),
                    ],
                    1
                  ),
                  t("div", { staticClass: "card" }, [
                    t(
                      "div",
                      { staticClass: "card-body" },
                      [
                        t(
                          "p-radio",
                          {
                            attrs: {
                              value: "AND",
                              name: "radio",
                              color: "info",
                            },
                            model: {
                              value: e.config.filterRelation,
                              callback: function (s) {
                                e.$set(e.config, "filterRelation", s);
                              },
                              expression: "config.filterRelation",
                            },
                          },
                          [e._v("AND filter relation")]
                        ),
                        t("span", { staticClass: "mx-2" }),
                        t(
                          "p-radio",
                          {
                            attrs: {
                              value: "OR",
                              name: "radio",
                              color: "info",
                            },
                            model: {
                              value: e.config.filterRelation,
                              callback: function (s) {
                                e.$set(e.config, "filterRelation", s);
                              },
                              expression: "config.filterRelation",
                            },
                          },
                          [e._v("OR filter relation")]
                        ),
                      ],
                      1
                    ),
                  ]),
                  t("hr"),
                ];
              },
              proxy: !0,
            },
            {
              key: "footer",
              fn: function () {
                return [
                  t("div", { staticClass: "mb-3 alert alert-info" }, [
                    t("em", [e._v("Number of Rows:")]),
                    e._v(" "),
                    t("strong", [e._v(e._s(e.number))]),
                  ]),
                ];
              },
              proxy: !0,
            },
          ]),
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        t(
          "div",
          { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
          [
            t("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
              t("code", { staticClass: "language-markup" }, [
                e._v(
                  `<template>
        <VueQuintable :filter-groups="filterGroups" :filters="filters" :config="config" :rows="rows" @filtered:rows="visibleRows">
            <template v-slot:header>

                <strong class="mb-2">Filters:</strong>

                <div class="clearfix py-2">
                    <p-check class="p-switch" v-model="activeFilter" value="true">Active</p-check>
                </div>
                <div class="clearfix py-2">
                    <p-check class="p-switch" v-model="printableFilter" value="true">Printable</p-check>
                </div>

                <div class="clearfix py-2">
                    <p-check class="p-switch" v-model="dynamicFilter" value="true">Regex for name (/Ma/)</p-check>
                </div>

                <hr>
                <strong class="mb-2">Settings:</strong>
                    <div class="clearfix py-2">
                        <p-check class="p-switch" v-model="filterGroupsActive" value="true">Toggle Filter Groups</p-check>
                    </div>

                <div class="card">
                    <div class="card-body">
                     <p-radio value="AND" name="radio" color="info" v-model="config.filterRelation">AND filter relation</p-radio>
                     <span class="mx-2"></span>
                        <p-radio value="OR" name="radio" color="info" v-model="config.filterRelation">OR filter relation</p-radio>
                    </div>
                    </div>
                <hr>
            </template>

            <template v-slot:footer>
                <div class="mb-3 alert alert-info">
                    <em>Number of Rows:</em> <strong>` +
                    e._s(e.number) +
                    `</strong>
                </div>
            </template>
        </VueQuintable>
</template>
<script>

    import VueQuintable from "../components/VueQuintable.vue"

    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Printable",
                        }, {
                            headline: "Active",
                        }
                    ],
                    search:true,
                    useFuzzySearch:true,
                    searchLength:3,
                    filterRelation:"AND",
                    searchPlaceholder:"Search rows...",
                },
                filters:{
                },
                filterGroupsDefaults:[
                    {
                        items:[
                            {
                                items:[
                                    {name:"name"},
                                    {name:"active"}
                                ],
                                relation:"OR",
                            },
                            {
                                items:[
                                    {
                                        name:"printable"
                                    }
                                ],
                            }
                        ],
                        relation:"AND"
                    }
                ],
                filterGroupsActive:false,
                printableFilter:false,
                activeFilter:false,
                dynamicFilter:false,
                number:0,

            }
        },
        computed:{
            filterGroups(){
                  return this.filterGroupsActive?this.filterGroupsDefaults:[];
            },
            rows(){

                let count = 50;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    const printable = Math.random() >= 0.5;
                    const active = Math.random() >= 0.5;
                    const name = chance.name({ nationality: 'en' });
                    const age = chance.age();

                    rows.push(
                        {
                            cells:[
                                {
                                    text:name
                                },
                                {
                                    text:age
                                },
                                {
                                    component:{
                                        name:"font-awesome-icon",
                                        props: {
                                            icon: (printable ? "check" : "times")
                                        }
                                    }
                                },
                                {
                                    component:{
                                        name:"font-awesome-icon",
                                        props: {
                                            icon: (active ? "check" : "times")
                                        }
                                    }
                                },

                            ],
                            filters: {
                                active: active,
                                printable: printable,
                                name:name,
                            }
                        });
                }

                return rows;


            }
        },
        watch:{
            activeFilter(val){
                if(val){
                    this.$set(this.filters,"active",true);
                }else{
                    this.$delete(this.filters,"active");
                }

            },
            printableFilter(val){
                if(val){
                    this.$set(this.filters,"printable",true);
                }else{
                    this.$delete(this.filters,"printable");
                }
            },

            dynamicFilter(val){
                if(val){
                    this.$set(this.filters,"name",{
                        operator:"matches",
                        values:new RegExp("Ma")
                    });
                }else{
                    this.$delete(this.filters,"name");
                }
            },



        },
        methods:{
            visibleRows(rows){
                this.number = rows.length;
            }
        }

    }
<\/script>`
                ),
              ]),
            ]),
          ]
        ),
      ],
      1
    );
  },
  Vt = [],
  jt = f($t, Ot, Vt, !1, null, null, null, null);
const Et = jt.exports,
  qt = {
    props: { index: { type: Number }, name: { type: String } },
    data() {
      return { checked: !1, reference: "checkbox-component" };
    },
    methods: {
      toggleCheck() {
        this.$emit("action", {
          reference: this.reference,
          index: this.index,
          checked: this.checked,
        });
      },
    },
  };
var Lt = function () {
    var e = this,
      t = e._self._c;
    return t("div", { staticClass: "checkbox-wrapper" }, [
      t(
        "div",
        [
          t("span", { staticClass: "me-2" }, [e._v(e._s(e.name))]),
          t(
            "p-check",
            {
              on: { change: e.toggleCheck },
              model: {
                value: e.checked,
                callback: function (s) {
                  e.checked = s;
                },
                expression: "checked",
              },
            },
            [t("wbr")]
          ),
        ],
        1
      ),
    ]);
  },
  Nt = [],
  Qt = f(qt, Lt, Nt, !1, null, null, null, null);
const le = Qt.exports;
y.component("checkbox-component", le.default || le);
const Tt = {
  components: { VueQuintable: g },
  data() {
    return {
      config: {
        columns: [
          { headline: "Name" },
          { headline: "Age" },
          { headline: "Birth Place" },
          { headline: "Job" },
        ],
      },
    };
  },
  computed: {
    rows() {
      let n = 10;
      const e = [],
        t = new v();
      for (let s = 0; s < n; s++)
        e.push([
          {
            component: {
              name: "checkbox-component",
              props: { index: s + 1, name: t.name({ nationality: "en" }) },
            },
          },
          { text: t.age() },
          { text: t.city() },
          { text: t.profession() },
        ]);
      return e;
    },
  },
  methods: {
    onComponentEvent(n) {
      alert(
        "Component " +
          n.reference +
          " on index " +
          n.index +
          " has just been" +
          (n.checked ? " checked!" : " unchecked!")
      );
    },
  },
};
var Dt = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Rows are calculated and passed as a computed property "),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: { config: e.config, rows: e.rows },
          on: { "component:event": e.onComponentEvent },
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary mb-1 me-2",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code for App "),
          ],
          1
        ),
        t(
          "button",
          {
            staticClass: "btn btn-secondary mb-1",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-component",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code Component "),
          ],
          1
        ),
        e._m(0),
        e._m(1),
      ],
      1
    );
  },
  Bt = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
        <VueQuintable :config="config" :rows="rows" @component:event="onComponentEvent" ></VueQuintable>
</template>
<script>

    import VueQuintable from "../components/VueQuintable.vue"
    import CheckboxComponent from "./components/CheckboxComponent.vue"
    import Vue from "vue"


    Vue.component(
        "checkbox-component",
        CheckboxComponent.default || CheckboxComponent
    );


    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                },

            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push([
                        {
                            component: {
                                name: "checkbox-component",
                                props: {
                                    index: i+1,
                                    name: chance.name({ nationality: 'en' }),
                                }
                            }
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        },
        methods:{
            onComponentEvent(data){
                alert(
                    "Component " +data.reference +
                    " on index " + data.index +
                    " has just been" +
                    (data.checked ? " checked!" : " unchecked!")
                );
            }
        }
    }
<\/script>`),
            ]),
          ]),
        ]
      );
    },
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-component" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
    <div class="checkbox-wrapper">
        <div>
            <span class="me-2" v-html="name"></span>
            <p-check v-model="checked" @change="toggleCheck"><wbr></p-check>
        </div>
    </div>
</template>


<script>

    export default {
        props:{
            index:{
                type:Number
            },
            name:{
                type:String
            }
        },
        data(){
            return {
                checked:true,
                reference:"checkbox-component",
            }
        },
        methods: {
            check() {
                this.$emit("action",
                    {
                        reference:this.reference,
                        index:this.index,
                        checked:this.checked,
                    }
                )
            }
        }
    }

<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  Ht = f(Tt, Dt, Bt, !1, null, null, null, null);
const Ut = Ht.exports,
  It = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age", breakpoint: "lg" },
            { headline: "Children", breakpoint: "all" },
            { headline: "Job" },
          ],
        },
      };
    },
    computed: {
      rows() {
        let n = 10;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++)
          e.push([
            { text: t.name({ nationality: "en" }) },
            { text: t.age() },
            { type: "nested" },
            { text: t.profession() },
          ]);
        return e;
      },
      configNested() {
        return {
          columns: [
            { headline: "Name", align: "center", sort: !0 },
            {
              headline: "Country of Birth",
              cellFormatter: (n) => ({ value: "Country: " + n.value }),
              align: "center",
            },
            { headline: "Time of Birth", breakpoint: "xl", align: "center" },
          ],
        };
      },
      rowsNested() {
        const n = Math.ceil(Math.random() * 24),
          e = Math.ceil(Math.random() * 59);
        let t = he.tz("Europe/Berlin");
        t.set({ hour: n, minute: e, second: 0, millisecond: 0 });
        const s = t.format("hh:mm A"),
          i = t.tz("America/New_York").format("hh:mm A"),
          a = t.tz("America/Chicago").format("hh:mm A"),
          o = new v();
        return [
          [
            { text: o.name({ nationality: "en" }) },
            { value: o.country({ full: !0 }) },
            { type: "strong", value: s },
          ],
          [
            { text: o.name({ nationality: "en" }) },
            { value: o.country({ full: !0 }) },
            { type: "strong", value: i },
          ],
          [
            { text: o.name({ nationality: "en" }) },
            { value: o.country({ full: !0 }) },
            { type: "strong", value: a },
          ],
        ];
      },
    },
  };
var Mt = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Nested VueQuintable "),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: { config: e.config, rows: e.rows },
          scopedSlots: e._u([
            {
              key: "generated-cell-content",
              fn: function (s) {
                return [
                  s.cell.type === "nested"
                    ? t(
                        "div",
                        [
                          t("VueQuintable", {
                            staticClass: "ms-4",
                            attrs: {
                              nested: !0,
                              rows: e.rowsNested,
                              config: e.configNested,
                            },
                            scopedSlots: e._u(
                              [
                                {
                                  key: "cell-complete",
                                  fn: function (i) {
                                    return [
                                      i.cell.type === "strong"
                                        ? t("strong", [
                                            e._v(e._s(i.cell.value)),
                                          ])
                                        : e._e(),
                                    ];
                                  },
                                },
                              ],
                              null,
                              !0
                            ),
                          }),
                        ],
                        1
                      )
                    : e._e(),
                ];
              },
            },
          ]),
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  Jt = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { pre: !0, attrs: { class: "language-markup" } }, [
              n._v(`<template>
      <VueQuintable
            class="ms-4"
            :nested="true"
            :rows="rowsNested"
            :config="configNested"
          >
            <template v-slot:generated-cell-content="context">
              <strong v-if="context.cell.type === 'strong'">{{context.cell.value }}</strong>
            </template>
          </VueQuintable>
        </div>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";

import Chance from "chance";
import moment from 'moment-timezone';


export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
          },
          {
            headline: "Children",
            breakpoint: "all",
          },
          {
            headline: "Job",
          },
        ],
      },
    };
  },
  computed: {
    rows() {
      let count = 10;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push([
          {
            text: chance.name({ nationality: "en" }),
          },
          {
            text: chance.age(),
          },
          {
            type: "nested",
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    },
    configNested() {
      return {
        columns: [
        {
            headline: "Name",
            align: "center",
            sort:true,
          },
          {
            headline: "Country of Birth",
            cellFormatter: (cell) => {
              return { value: "Country: " + cell.value };
            },
            align: "center",
          },
          {
            headline: "Time of Birth",
            breakpoint: "xl",
            align: "center",
          },
        ],
      };
    },

    rowsNested() {
      const chance = new Chance();
      const hours = Math.ceil(Math.random() * 24);
      const minutes = Math.ceil(Math.random() * 59);

      var m = moment.tz("Europe/Berlin");
      m.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });

      const timeB = m.format("hh:mm A");
      const timeNY = m.tz("America/New_York").format("hh:mm A");
      const timeH = m.tz("America/Chicago").format("hh:mm A");


      return [
        [
          { text: chance.name({ nationality: "en" }) },
          { value: chance.country({ full: true })},
          { type: "strong", value: timeB },
        ],
        [
          { text: chance.name({ nationality: "en" }) },
          { value: chance.country({ full: true }) },
          { type: "strong", value: timeNY },
        ],
        [
          { text: chance.name({ nationality: "en" }) },
          { value: chance.country({ full: true }) },
          { type: "strong", value: timeH },
        ],
      ];
    },
  },
};
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  Gt = f(It, Mt, Jt, !1, null, null, null, null);
const zt = Gt.exports,
  Kt = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          pagination: !0,
          columns: [
            { headline: "Name" },
            { headline: "Age" },
            { headline: "Birth Place", sticky: !0 },
            { headline: "Job", breakpoint: "md" },
          ],
          search: !0,
          searchClass: "col-md-8",
        },
        showRows: !0,
      };
    },
    computed: {
      rows() {
        if (!this.showRows) return [];
        let n = 500;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++)
          e.push([
            { text: t.name({ nationality: "en" }) },
            { text: t.age() },
            { text: t.city() },
            { text: t.profession(), type: "nested" },
          ]);
        return e;
      },
    },
    methods: {
      alert(n) {
        alert("I clicked the slot " + n);
      },
    },
  };
var Wt = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Customized with configured slots "),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: { config: e.config, rows: e.rows },
          scopedSlots: e._u([
            {
              key: "cell-content",
              fn: function (s) {
                return [
                  t(
                    "div",
                    {
                      staticClass: "btn btn-sm btn-info",
                      on: {
                        click: function (i) {
                          return i.stopPropagation(), e.alert(s.cell.text);
                        },
                      },
                    },
                    [e._v(" " + e._s(s.cell.text) + " ")]
                  ),
                ];
              },
            },
            {
              key: "generated-cell-content",
              fn: function (s) {
                return [
                  t(
                    "div",
                    {
                      staticClass: "btn btn-sm btn-warning",
                      on: {
                        click: function (i) {
                          return i.stopPropagation(), e.alert(s.cell.text);
                        },
                      },
                    },
                    [e._v(" " + e._s(s.cell.text) + " ")]
                  ),
                ];
              },
            },
            {
              key: "sticky-cell-content",
              fn: function (s) {
                return [
                  t(
                    "div",
                    {
                      staticClass: "btn btn-sm btn-danger",
                      on: {
                        click: function (i) {
                          return i.stopPropagation(), e.alert(s.cell.text);
                        },
                      },
                    },
                    [e._v(" " + e._s(s.cell.text) + " ")]
                  ),
                ];
              },
            },
            {
              key: "header",
              fn: function () {
                return [
                  t("hr"),
                  t("div", { staticClass: "alert alert-primary" }, [
                    t("div", { staticClass: "text-center" }, [
                      t("h4", [e._v("VueQuintable")]),
                    ]),
                  ]),
                ];
              },
              proxy: !0,
            },
            {
              key: "before-search",
              fn: function () {
                return [
                  t("div", { staticClass: "col-md-2" }, [
                    t(
                      "button",
                      {
                        staticClass: "btn btn-primary w-100 text-center",
                        attrs: { type: "button" },
                      },
                      [e._v(" Button before search ")]
                    ),
                  ]),
                ];
              },
              proxy: !0,
            },
            {
              key: "search",
              fn: function ({ placeholder: s, value: i, setSearchQuery: a }) {
                return [
                  t("div", { staticClass: "col-md-8" }, [
                    t("input", {
                      staticClass: "form-control",
                      attrs: { type: "search", placeholder: s },
                      domProps: { value: i },
                      on: {
                        input: function (o) {
                          return a(o.target.value);
                        },
                      },
                    }),
                  ]),
                ];
              },
            },
            {
              key: "after-search",
              fn: function () {
                return [
                  t("div", { staticClass: "col-md-2" }, [
                    t(
                      "button",
                      {
                        staticClass: "btn btn-secondary w-100 text-center",
                        attrs: { type: "button" },
                      },
                      [e._v(" Button after search ")]
                    ),
                  ]),
                ];
              },
              proxy: !0,
            },
            {
              key: "after-search-container",
              fn: function () {
                return [
                  t("hr"),
                  t(
                    "p-check",
                    {
                      staticClass: "p-switch",
                      model: {
                        value: e.showRows,
                        callback: function (s) {
                          e.showRows = s;
                        },
                        expression: "showRows",
                      },
                    },
                    [e._v("Toggle Rows")]
                  ),
                  t("hr"),
                ];
              },
              proxy: !0,
            },
            {
              key: "footer",
              fn: function () {
                return [
                  t(
                    "div",
                    {
                      staticClass:
                        "text-center py-3 px-3 mt-3 bg-info text-white",
                    },
                    [
                      e._v(
                        " Copyright © 2021 by Sensetence UG (haftungsbeschränkt) "
                      ),
                    ]
                  ),
                ];
              },
              proxy: !0,
            },
            {
              key: "no-results",
              fn: function () {
                return [
                  t("div", { staticClass: "text-center" }, [
                    t("div", { staticClass: "alert alert-danger" }, [
                      e._v("No Results..."),
                    ]),
                  ]),
                ];
              },
              proxy: !0,
            },
          ]),
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary mt-3",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  Yt = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { pre: !0, attrs: { class: "language-markup" } }, [
              n._v(`<template>
     <VueQuintable :config="config" :rows="rows">
      <template v-slot:cell-content="context">
        <div class="btn btn-sm btn-info" @click.stop="alert(context.cell.text)">
          {{ context.cell.text }}
        </div>
      </template>
      <template v-slot:generated-cell-content="context">
        <div
          class="btn btn-sm btn-warning"
          @click.stop="alert(context.cell.text)"
        >
          {{ context.cell.text }}
        </div>
      </template>
      <template v-slot:sticky-cell-content="context">
        <div
          class="btn btn-sm btn-danger"
          @click.stop="alert(context.cell.text)"
        >
          {{ context.cell.text }}
        </div>
      </template>
      <template v-slot:header>
        <hr />
        <div class="alert alert-primary">
          <div class="text-center">
            <h4>VueQuintable</h4>
          </div>
        </div>
      </template>

      <template v-slot:before-search>
        <div class="col-md-2">
          <button type="button" class="btn btn-primary w-100 text-center">
            Button before search
          </button>
        </div>
      </template>

      <template v-slot:search="{ placeholder, value, setSearchQuery }">
        <div class="col-md-8">
          <input
            type="search"
            :value="value"
            :placeholder="placeholder"
            class="form-control"
            @input="setSearchQuery($event.target.value)"
          />
        </div>
      </template>

      <template v-slot:after-search>
        <div class="col-md-2">
          <button type="button" class="btn btn-secondary w-100 text-center">
            Button after search
          </button>
        </div>
      </template>

      <template v-slot:after-search-container>
        <hr />
        <p-check class="p-switch" v-model="showRows">Toggle Rows</p-check>
        <hr />
      </template>

      <template v-slot:footer>
        <div class="text-center py-3 px-3 mt-3 bg-info text-white">
          Copyright © 2021 by Sensetence UG (haftungsbeschränkt)
        </div>
      </template>
      <template v-slot:no-results>
        <div class="text-center">
          <div class="alert alert-danger">No Results...</div>
        </div>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";
import Chance from "chance";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
          },
          {
            headline: "Birth Place",
            sticky: true,
          },
          {
            headline: "Job",
            breakpoint: "md",
          },
        ],
        search: true,
        searchClass: "col-md-8",
      },
      showRows: true,
    };
  },
  computed: {
    rows() {
      if (!this.showRows) {
        return [];
      }

      let count = 10;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push([
          {
            text: chance.name({ nationality: "en" }),
          },
          {
            text: chance.age(),
          },
          {
            text: chance.city(),
          },
          {
            text: chance.profession(),
            type: "nested",
          },
        ]);
      }

      return rows;
    },
  },
  methods: {
    alert(text) {
      alert("I clicked the slot " + text);
    },
  },
};
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  Xt = f(Kt, Wt, Yt, !1, null, null, null, null);
const Zt = Xt.exports,
  en = {
    props: { index: { type: Number } },
    components: { Drag: de.Drag },
    methods: {
      dragstart() {
        this.$emit("action", { index: this.index, type: "dragstart" });
      },
      dragend() {
        this.$emit("action", { index: this.index, type: "dragend" });
      },
    },
  };
var tn = function () {
    var e = this,
      t = e._self._c;
    return t(
      "drag",
      {
        staticClass: "d-inline-block",
        attrs: {
          "transfer-data": { index: e.index },
          "effect-allowed": ["move"],
          "drop-effect": "move",
        },
        on: { dragend: e.dragend, dragstart: e.dragstart },
      },
      [
        t(
          "div",
          { staticClass: "btn p-2" },
          [t("font-awesome-icon", { attrs: { icon: "arrows-alt" } })],
          1
        ),
      ]
    );
  },
  nn = [],
  sn = f(en, tn, nn, !1, null, null, null, null);
const re = sn.exports;
const an = {
  props: {
    first: { type: Boolean, default: !1 },
    last: { type: Boolean, default: !1 },
    index: { type: Number },
  },
  components: { Drop: de.Drop },
  data() {
    return { checked: !1, reference: "actions-component" };
  },
  methods: {
    handleDrop(n) {
      this.$emit("action", {
        index: n.index,
        type: "move-row",
        to: this.index,
      });
    },
    moveRow(n = "up") {
      (n === "up" && this.first) ||
        (n === "down" && this.last) ||
        this.$emit("action", {
          index: this.index,
          type: "move-row",
          to: n === "up" ? this.index - 1 : this.index + 1,
        });
    },
    deleteRow() {
      this.$emit("action", { index: this.index, type: "delete-row" });
    },
  },
};
var on = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t("div", { staticClass: "btn-group me-2" }, [
          t(
            "div",
            {
              staticClass: "btn btn-info",
              class: { disabled: e.first },
              attrs: { disabled: e.first },
              on: {
                click: function (s) {
                  return e.moveRow("up");
                },
              },
            },
            [t("font-awesome-icon", { attrs: { icon: "chevron-up" } })],
            1
          ),
          t(
            "div",
            {
              staticClass: "btn btn-info",
              class: { disabled: e.last },
              attrs: { disabled: e.last },
              on: {
                click: function (s) {
                  return e.moveRow("down");
                },
              },
            },
            [t("font-awesome-icon", { attrs: { icon: "chevron-down" } })],
            1
          ),
        ]),
        t(
          "div",
          {
            staticClass: "btn btn-danger me-2",
            attrs: { title: "Delete Row" },
            on: { click: e.deleteRow },
          },
          [t("font-awesome-icon", { attrs: { icon: "times" } })],
          1
        ),
        t(
          "drop",
          {
            staticClass: "d-inline-block align-middle drop-element",
            attrs: { title: "Drop your dragging row here to move it" },
            on: { drop: e.handleDrop },
          },
          [
            t("div", { staticClass: "card px-3 d-inline-block" }, [
              t(
                "div",
                { staticClass: "py-2 bg-muted" },
                [t("font-awesome-icon", { attrs: { icon: "expand" } })],
                1
              ),
            ]),
          ]
        ),
      ],
      1
    );
  },
  ln = [],
  rn = f(an, on, ln, !1, null, "7d001535", null, null);
const ce = rn.exports;
y.component("actions-component", ce.default || ce);
y.component("drag-component", re.default || re);
const cn = {
  components: { VueQuintable: g },
  data() {
    return {
      config: {
        columns: [
          { headline: "" },
          { headline: "Name" },
          { headline: "Age", breakpoint: "md" },
          { headline: "Birth Place", breakpoint: "lg" },
          { headline: "Job", breakpoint: "lg" },
          { headline: "Actions", breakpoint: "sm" },
        ],
      },
      rows: [],
      index: 1,
      name: "",
      age: null,
      city: "",
      job: "",
      rowCount: 10,
      dragging: !1,
    };
  },
  computed: {
    tableClasses() {
      return this.dragging ? "dragging" : "";
    },
    ages() {
      return Array.range(1, 99);
    },
    indexes() {
      return this.rows.map((n, e) => e + 1);
    },
  },
  created() {
    Array.range = (t, s) => Array.from({ length: s - t }, (i, a) => a + t);
    const n = [],
      e = new v();
    for (let t = 0; t < this.rowCount; t++)
      n.push([
        { component: { name: "drag-component", props: { index: t } } },
        { text: e.name({ nationality: "en" }) },
        { text: e.age() },
        { text: e.city() },
        { text: e.profession() },
        {
          component: {
            name: "actions-component",
            props: { index: t, first: t === 0, last: t === this.rowCount - 1 },
          },
        },
      ]);
    this.rows = n;
  },
  methods: {
    updateIndexes() {
      this.rows = this.rows.map(
        (n, e) => (
          (n[5].component.props.index = e),
          (n[5].component.props.first = e === 0),
          (n[5].component.props.last = e === this.rowCount - 1),
          (n[0].component.props.index = e),
          n
        )
      );
    },
    componentListener(n) {
      console.log(n),
        n.type === "delete-row"
          ? (this.rows.splice(n.index, 1),
            this.rowCount--,
            this.updateIndexes())
          : n.type === "move-row"
          ? ((this.dragging = !1), this.move(n.index, n.to))
          : n.type === "dragstart"
          ? (this.dragging = !0)
          : n.type === "dragend" && (this.dragging = !1);
    },
    move(n, e) {
      if (e >= this.rows.length)
        for (var t = e - this.rows.length + 1; t--; ) this.rows.push(void 0);
      this.rows.splice(e, 0, this.rows.splice(n, 1)[0]), this.updateIndexes();
    },
    addRow() {
      if (!this.name || !this.age || !this.city || !this.job) {
        alert("You have to fill out all inputs");
        return;
      }
      const n = [
        {
          component: {
            name: "drag-component",
            props: { index: this.index - 1 },
          },
        },
        { text: this.name },
        { text: this.age },
        { text: this.city },
        { text: this.job },
        {
          component: {
            name: "actions-component",
            props: { index: this.index - 1 },
          },
        },
      ];
      this.index === this.rowCount
        ? this.rows.push(n)
        : this.rows.splice(this.index - 1, 0, n),
        (this.index = 1),
        (this.name = ""),
        (this.age = null),
        (this.city = ""),
        (this.job = ""),
        this.rowCount++,
        this.updateIndexes();
    },
  },
};
var dn = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Use buttons to add/remove/move rows or Drag&Drop ["),
            t(
              "a",
              {
                attrs: {
                  target: "_blank",
                  href: "https://github.com/Alfred-Skyblue/vue-draggable-plus",
                },
              },
              [e._v("vue-drag-drop")]
            ),
            e._v("]. "),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: {
            "table-classes": e.tableClasses,
            config: e.config,
            rows: e.rows,
          },
          on: { "component:event": e.componentListener },
          scopedSlots: e._u([
            {
              key: "header",
              fn: function () {
                return [
                  t("div", { staticClass: "row" }, [
                    t("div", { staticClass: "col-md-2" }, [
                      t(
                        "div",
                        { staticClass: "mb-3" },
                        [
                          t("label", [e._v("Index")]),
                          t("v-select", {
                            attrs: { options: e.indexes, clearable: !1 },
                            model: {
                              value: e.index,
                              callback: function (s) {
                                e.index = s;
                              },
                              expression: "index",
                            },
                          }),
                        ],
                        1
                      ),
                    ]),
                    t("div", { staticClass: "col-md-2" }, [
                      t("div", { staticClass: "mb-3" }, [
                        t("label", { attrs: { for: "name" } }, [e._v("Name")]),
                        t("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.name,
                              expression: "name",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: { id: "name", type: "text" },
                          domProps: { value: e.name },
                          on: {
                            input: function (s) {
                              s.target.composing || (e.name = s.target.value);
                            },
                          },
                        }),
                      ]),
                    ]),
                    t("div", { staticClass: "col-md-2" }, [
                      t(
                        "div",
                        { staticClass: "mb-3" },
                        [
                          t("label", [e._v("Age")]),
                          t("v-select", {
                            attrs: {
                              options: e.ages,
                              placeholder: "Select Age...",
                            },
                            model: {
                              value: e.age,
                              callback: function (s) {
                                e.age = s;
                              },
                              expression: "age",
                            },
                          }),
                        ],
                        1
                      ),
                    ]),
                    t("div", { staticClass: "col-md-2" }, [
                      t("div", { staticClass: "mb-3" }, [
                        t("label", { attrs: { for: "city" } }, [e._v("City")]),
                        t("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.city,
                              expression: "city",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: { id: "city", type: "text" },
                          domProps: { value: e.city },
                          on: {
                            input: function (s) {
                              s.target.composing || (e.city = s.target.value);
                            },
                          },
                        }),
                      ]),
                    ]),
                    t("div", { staticClass: "col-md-2" }, [
                      t("div", { staticClass: "mb-3" }, [
                        t("label", { attrs: { for: "job" } }, [e._v("Job")]),
                        t("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.job,
                              expression: "job",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: { id: "job", type: "text" },
                          domProps: { value: e.job },
                          on: {
                            input: function (s) {
                              s.target.composing || (e.job = s.target.value);
                            },
                          },
                        }),
                      ]),
                    ]),
                    t("div", { staticClass: "col-md-2" }, [
                      t("label", [t("wbr")]),
                      t("div", { staticClass: "mb-3" }, [
                        t(
                          "span",
                          {
                            staticClass: "btn btn-info",
                            on: { click: e.addRow },
                          },
                          [
                            t("font-awesome-icon", { attrs: { icon: "plus" } }),
                            e._v(" Add Row"),
                          ],
                          1
                        ),
                      ]),
                    ]),
                  ]),
                ];
              },
              proxy: !0,
            },
          ]),
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary me-2 mb-1",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code for App "),
          ],
          1
        ),
        t(
          "button",
          {
            staticClass: "btn btn-secondary me-2 mb-1",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-component",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code Drag Component "),
          ],
          1
        ),
        t(
          "button",
          {
            staticClass: "btn btn-secondary mb-1",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-component-drag",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code Actions Component "),
          ],
          1
        ),
        e._m(0),
        e._m(1),
        e._m(2),
      ],
      1
    );
  },
  un = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
       <VueQuintable :table-classes="tableClasses" :config="config" :rows="rows" @component:event="componentListener">

            <template v-slot:header>
                <div class="row">
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="index" >Index</label>
                            <v-select id="index" :options="indexes" v-model="index" :clearable="false"></v-select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="name" >Name</label>
                            <input id="name" v-model="name" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="age" >Age</label>
                            <v-select id="age" :options="ages" v-model="age" placeholder="Select Age..."></v-select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="city" >City</label>
                            <input id="city" v-model="city" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="job" >Job</label>
                            <input id="job" v-model="job" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <label><wbr></label>
                        <div class="mb-3">
                            <span class="btn btn-info" @click="addRow"><font-awesome-icon icon="plus"></font-awesome-icon> Add Row</span>
                        </div>
                    </div>
                </div>
            </template>

        </VueQuintable>
</template>
<script>
    import VueQuintable from "../components/VueQuintable.vue"
    import DragComponent from "./components/DragComponent.vue"
    import ActionsComponent from "./components/ActionsComponent.vue"
    import Vue from "vue"


    Vue.component(
        "actions-component",
        ActionsComponent.default || ActionsComponent
    );

    Vue.component(
        "drag-component",
        DragComponent.default || DragComponent
    );

    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "",
                        },{
                            headline: "Name",
                        }, {
                            headline: "Age",
                            breakpoint:"md",
                        }, {
                            headline: "Birth Place",
                            breakpoint:"lg",
                        }, {
                            headline: "Job",
                            breakpoint:"lg",
                        },{
                            headline:"Actions",
                            breakpoint:"sm",
                        }
                    ],
                },
                rows:[],
                index:1,
                name:"",
                age:null,
                city:"",
                job:"",
                rowCount:10,
                dragging:false,
            }

        },
        computed:{
            tableClasses() {
                return this.dragging ? "dragging" : "";
            },

            ages() {
                return Array.range(1, 99);
            },

            indexes(){
                return this.rows.map((row,index)=>{
                    return index+1;
                });
            }
        },
        created(){

            Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

            const rows = [];

            const chance = new Chance();

            for(let i = 0; i < this.rowCount; i++){
                rows.push([
                    {
                        component:{
                            name:"drag-component",
                            props:{
                                index:i,
                            },

                        }
                    },
                    {
                        text:chance.name({ nationality: 'en' })
                    },
                    {
                        text:chance.age()
                    },
                    {
                        text:chance.city()
                    },
                    {
                        text:chance.profession()
                    },
                    {
                        component:{
                            name:"actions-component",
                            props:{
                                index:i,
                                first:i===0,
                                last:i===this.rowCount -1,
                            },

                        }
                    }
                ]);
            }

            this.rows = rows;
        },
        methods:{

            updateIndexes(){
                this.rows = this.rows.map((row,index)=>{
                    row[5].component.props.index = index;
                    row[5].component.props.first = index === 0;
                    row[5].component.props.last = index === this.rowCount - 1;
                    row[0].component.props.index = index;
                    return row;
                });
            },

            componentListener(data){
                if(data.type === "delete-row"){
                    this.rows.splice(data.index,1);
                    this.rowCount--;
                    this.updateIndexes();
                }else if(data.type === "move-row"){
                    this.move(data.index,data.to);
                }else if(data.type === "dragstart"){
                    this.dragging = true;
                }else if(data.type === "dragend"){
                    this.dragging = false;
                }
            },

             move(old_index, new_index) {
                if (new_index >= this.rows.length) {
                    var k = new_index - this.rows.length + 1;
                    while (k--) {
                        this.rows.push(undefined);
                    }
                }
                this.rows.splice(new_index, 0, this.rows.splice(old_index, 1)[0]);
                this.updateIndexes();

             },
            addRow(){

                if(!this.name || !this.age || !this.city || !this.job){
                     alert("You have to fill out all inputs");
                     return;
                }

                const data = [
                    {
                        component:{
                            name:"drag-component",
                            props:{
                                index:this.index - 1,
                            },

                        }
                    },
                    {
                        text:this.name
                    },
                    {
                        text:this.age
                    },
                    {
                        text:this.city
                    },
                    {
                        text:this.job
                    },
                    {
                        component:{
                            name:"actions-component",
                            props:{
                                index:this.index - 1,
                            },

                        }
                    }
                ];

                if(this.index === this.rowCount){
                    this.rows.push(data);
                }else{
                    this.rows.splice(this.index - 1 , 0, data);
                }

                this.index = 1;
                this.name = "";
                this.age = null;
                this.city = "";
                this.job = "";
                this.rowCount ++;

                this.updateIndexes();

            }
        }
    }
<\/script>

<style>
    .vue-quintable.dragging .vue-quintable-cell{
        position: relative;
    }

    .vue-quintable.dragging .vue-quintable-cell:after{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(255,255,255,0.75);
        left: 0;
        top: 0;
        pointer-events: none;
        z-index: 2;
    }

    .vue-quintable.dragging .vue-quintable-cell.actions .drop-element{
        position: relative;
        z-index: 3;

    }

    .vue-quintable.dragging .vue-quintable-cell.actions .drop-element .card{
        background-color: #28a745;
        color: #fff;
    }

</style>`),
            ]),
          ]),
        ]
      );
    },
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-component" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
    <div class="content">
        <div class="btn-group me-2">
            <div class="btn btn-info" :disabled="first" :class="{disabled:first}" @click="moveRow('up')">
                <font-awesome-icon icon="chevron-up"></font-awesome-icon>
            </div>
            <div class="btn btn-info" :disabled="last" :class="{disabled:last}" @click="moveRow('down')">
                <font-awesome-icon icon="chevron-down"></font-awesome-icon>
            </div>
       </div>
        <div class="btn btn-danger me-2" @click="deleteRow" title="Delete Row">
            <font-awesome-icon icon="times"></font-awesome-icon>
        </div>

        <drop  class="d-inline-block align-middle drop-element" @drop="handleDrop" title="Drop your dragging row here to move it">
            <div class="card px-3 d-inline-block">
                <div class="py-2 bg-muted">
                    <font-awesome-icon icon="expand"></font-awesome-icon>
                </div>
            </div>
        </drop>
    </div>
</template>


<script>
    import { Drop } from 'vue-drag-drop';

    export default {
        props:{
            first:{
                type:Boolean,
                default:false
            },
            last:{
                type:Boolean,
                default:false
            },
            index:{
                type:Number
            }
        },
        components:{
            Drop
        },
        data(){
            return {
                checked:false,
                reference:"checkbox-component",
            }
        },
        methods: {
            handleDrop(data) {
                this.$emit("action",
                    {
                        index:data.index,
                        type:"move-row",
                        to:this.index
                    }
                )
            },
            moveRow(mode = "up") {

                if(mode === "up" && this.first || mode === "down" && this.last){
                    return;
                }

                this.$emit("action",
                    {
                        index:this.index,
                        type:"move-row",
                        to:mode === "up" ? this.index - 1:this.index + 1
                    }
                )
            },
            deleteRow(){
                this.$emit("action",
                    {
                        index:this.index,
                        type:"delete-row",
                    }
                )
            }
        }
    }

<\/script>
<style scoped>
    .btn.disabled{
        cursor: not-allowed;
    }
</style>


`),
            ]),
          ]),
        ]
      );
    },
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        {
          staticClass: "mt-2 collapse show",
          attrs: { id: "code-component-drag" },
        },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
    <drag class="d-inline-block" :transfer-data="{ index: index }" :effect-allowed="['move']"
          drop-effect="move" @dragend="dragend" @dragstart="dragstart">
        <div class="btn  p-2">
            <font-awesome-icon icon="arrows-alt"></font-awesome-icon>
        </div>
    </drag>
</template>
<script>
    import { Drag } from 'vue-drag-drop';

    export default {
        props:{
            index:{
                type:Number
            }
        },
        components:{
            Drag
        },
        methods:{
            dragstart(){
                this.$emit("action",
                    {
                        index:this.index,
                        type:"dragstart",
                    }
                );
            },
            dragend(){
                this.$emit("action",
                    {
                        index:this.index,
                        type:"dragend",
                    }
                );
            }
        }
    }
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  hn = f(cn, dn, un, !1, null, null, null, null);
const pn = hn.exports,
  fn = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age", showHeadlineBreakpoint: "md", breakpoint: "md" },
            { headline: "Birth Place", sticky: !0 },
            { headline: "Job", breakpoint: "md", alwaysExpanded: !0 },
          ],
        },
      };
    },
    computed: {
      rows() {
        let n = 10;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++)
          e.push({
            cells: [
              { text: t.name({ nationality: "en" }) },
              { text: t.age(), tooltip: "Age " + s },
              { text: t.city(), tooltip: "City " + s },
              { text: t.profession(), tooltip: "Job " + s },
            ],
            tooltip: "Row " + s,
          });
        return e;
      },
    },
  };
var mn = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Hover over rows and cells to see the tooltips "),
          ],
          1
        ),
        t("VueQuintable", { attrs: { config: e.config, rows: e.rows } }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  gn = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";
import Chance from "chance";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
            showHeadlineBreakpoint: "md",
            breakpoint: "md",
          },
          {
            headline: "Birth Place",
            sticky: true,
          },
          {
            headline: "Job",
            breakpoint: "all",
          },
        ],
      },
    };
  },
  computed: {
    rows() {
      let count = 10;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push({
          cells: [
            {
              text: chance.name({ nationality: "en" }),
            },
            {
              text: chance.age(),
              tooltip: "Age " + i,
            },
            {
              text: chance.city(),
              tooltip: "City " + i,
            },
            {
              text: chance.profession(),
              tooltip: "Job " + i,
            },
          ],
          tooltip: "Row " + i,
        });
      }

      return rows;
    },
  },
};
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  wn = f(fn, mn, gn, !1, null, null, null, null);
const bn = wn.exports,
  vn = {
    components: { VueQuintable: g },
    data() {
      return {
        hideColumns: !0,
        ignoreSortingColumns: "none",
        hideAge: !1,
        hideJob: !1,
        dynamicConfig: !1,
        ignoreOptions: [
          { value: "none", label: "Don't hide hide empty sorting columns" },
          { value: "active", label: "Don't hide active empty sorting columns" },
          { value: "all", label: "Hide empty sorting columns" },
        ],
      };
    },
    computed: {
      config() {
        return {
          columns: [
            { headline: "Name", ignoreEmpty: !0 },
            { headline: "Age", hidden: this.hideAge, breakpoint: "lg" },
            { headline: "Birth Place", breakpoint: "md", sort: !0 },
            { headline: "Birth country", breakpoint: "lg" },
            { headline: "Random Word", breakpoint: "xl" },
            { headline: "Job", hidden: this.hideJob, sticky: !0 },
          ],
          hideEmptyColumns: this.hideColumns,
          ignoreSortEmptyColumns: this.ignoreSortingColumns,
          pagination: 10,
        };
      },
      rows() {
        let n = 20;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++) {
          const i = s < 13 ? "" : t.city(),
            a = s >= 9 ? "" : t.country(),
            o = s > 7 ? "" : t.name({ nationality: "en" }),
            r = s < 15;
          e.push([
            { text: o },
            { text: t.age() },
            { text: i },
            { text: a },
            { type: "word", isEmpty: r, value: t.word() },
            { text: t.profession() },
          ]);
        }
        return e;
      },
    },
    watch: {
      hideColumns() {
        this.setConfigDynamicForNextTick();
      },
      ignoreSortingColumns() {
        this.setConfigDynamicForNextTick();
      },
      hideAge() {
        this.setConfigDynamicForNextTick();
      },
      hideJob() {
        this.setConfigDynamicForNextTick();
      },
    },
    methods: {
      setConfigDynamicForNextTick() {
        (this.dynamicConfig = !0),
          this.$nextTick(() => {
            this.dynamicConfig = !1;
          });
      },
    },
  };
var _n = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Toggle switches to hide/show columns "),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: {
            dynamicConfig: e.dynamicConfig,
            config: e.config,
            rows: e.rows,
          },
          scopedSlots: e._u([
            {
              key: "header",
              fn: function () {
                return [
                  t(
                    "div",
                    { staticClass: "mb-3" },
                    [
                      t(
                        "p-check",
                        {
                          staticClass: "p-switch",
                          model: {
                            value: e.hideAge,
                            callback: function (s) {
                              e.hideAge = s;
                            },
                            expression: "hideAge",
                          },
                        },
                        [e._v("Hide Age Column")]
                      ),
                    ],
                    1
                  ),
                  t(
                    "div",
                    { staticClass: "mb-3" },
                    [
                      t(
                        "p-check",
                        {
                          staticClass: "p-switch",
                          model: {
                            value: e.hideJob,
                            callback: function (s) {
                              e.hideJob = s;
                            },
                            expression: "hideJob",
                          },
                        },
                        [e._v("Hide Job Column")]
                      ),
                    ],
                    1
                  ),
                  t(
                    "div",
                    { staticClass: "mb-3" },
                    [
                      t(
                        "p-check",
                        {
                          staticClass: "p-switch",
                          model: {
                            value: e.hideColumns,
                            callback: function (s) {
                              e.hideColumns = s;
                            },
                            expression: "hideColumns",
                          },
                        },
                        [e._v("Hide empty columns automatically")]
                      ),
                    ],
                    1
                  ),
                  t(
                    "div",
                    { staticClass: "mb-3" },
                    [
                      t("v-select", {
                        attrs: {
                          reduce: (s) => s.value,
                          options: e.ignoreOptions,
                          clearable: !1,
                        },
                        model: {
                          value: e.ignoreSortingColumns,
                          callback: function (s) {
                            e.ignoreSortingColumns = s;
                          },
                          expression: "ignoreSortingColumns",
                        },
                      }),
                    ],
                    1
                  ),
                ];
              },
              proxy: !0,
            },
            {
              key: "cell-content",
              fn: function ({ cell: s }) {
                return [
                  s.type === "word"
                    ? t("div", [e._v(" " + e._s(s.value) + " ")])
                    : e._e(),
                ];
              },
            },
          ]),
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  xn = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { pre: !0, attrs: { class: "language-markup" } }, [
              n._v(`<template>
  <VueQuintable :dynamicConfig="dynamicConfig" :config="config" :rows="rows">
      <template v-slot:header>
        <div class="mb-3">
          <p-check class="p-switch" v-model="hideAge">Hide Age Column</p-check>
        </div>
        <div class="mb-3">
          <p-check class="p-switch" v-model="hideJob">Hide Job Column</p-check>
        </div>
        <div class="mb-3">
          <p-check class="p-switch" v-model="hideColumns"
            >Hide empty columns automatically</p-check
          >
        </div>
        <div class="mb-3">
          <v-select
            v-model="ignoreSortingColumns"
            :reduce="(option) => option.value"
            :options="ignoreOptions"
            :clearable="false"
          ></v-select>
        </div>
      </template>
      <template #cell-content="{ cell }">
        <div v-if="cell.type === 'word'">
          {{ cell.value }}
        </div>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";
import Chance from "chance";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      hideColumns: true,
      ignoreSortingColumns: "none",
      hideAge: false,
      hideJob: false,
      dynamicConfig: false,
      ignoreOptions: [
        {
          value: "none",
          label: "Don't hide hide empty sorting columns",
        },
        {
          value: "active",
          label: "Don't hide active empty sorting columns",
        },
        {
          value: "all",
          label: "Hide empty sorting columns",
        },
      ],
    };
  },
  computed: {
    config() {
      return {
        columns: [
          {
            headline: "Name",
            ignoreEmpty: true,
          },
          {
            headline: "Age",
            hidden: this.hideAge,
            breakpoint: "lg",
          },
          {
            headline: "Birth Place",
            breakpoint: "md",
            sort: true,
          },
          {
            headline: "Birth country",
            breakpoint: "lg",
          },
          {
            headline: "Random Word",
            breakpoint: "xl",
          },
          {
            headline: "Job",
            hidden: this.hideJob,
            sticky: true,
          },
        ],
        hideEmptyColumns: this.hideColumns,
        ignoreSortEmptyColumns: this.ignoreSortingColumns,
        pagination: 10,
      };
    },
    rows() {
      let count = 20;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        //first entry with a birth place will be the 13. row
        const city = i < 13 ? "" : chance.city();
        //last entry with a birth place will be the 9. row
        const country = i >= 9 ? "" : chance.country();
        //lase entry with name will be the 8. row
        const name = i > 7 ? "" : chance.name({ nationality: "en" });
        //hide cell thought it has content
        const alwaysHide = i < 15;

        rows.push([
          {
            text: name,
          },
          {
            text: chance.age(),
          },
          {
            text: city,
          },
          {
            text: country,
          },
          {
            type: "word",
            text: "asd",
            isEmpty: alwaysHide,
            value: chance.word(),
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    },
  },
  watch: {
    hideColumns() {
      this.setConfigDynamicForNextTick();
    },
    ignoreSortingColumns() {
      this.setConfigDynamicForNextTick();
    },
    hideAge() {
      this.setConfigDynamicForNextTick();
    },
    hideJob() {
      this.setConfigDynamicForNextTick();
    },
  },
  methods: {
    setConfigDynamicForNextTick() {
      this.dynamicConfig = true;
      this.$nextTick(() => {
        this.dynamicConfig = false;
      });
    },
  },
};
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  yn = f(vn, _n, xn, !1, null, null, null, null);
const Cn = yn.exports,
  Sn = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age" },
            { headline: "Birth Place" },
            { headline: "Job" },
          ],
        },
      };
    },
    computed: {
      rows() {
        let n = 10;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++)
          e.push([
            { text: t.name({ nationality: "en" }) },
            { text: t.age() },
            { text: t.city() },
            { text: t.profession() },
          ]);
        return e;
      },
    },
  };
var kn = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Rows are calculated and passed as a computed property "),
          ],
          1
        ),
        t("VueQuintable", { attrs: { config: e.config, rows: e.rows } }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  Rn = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>

    import Chance from "chance";
    import VueQuintable from "../components/VueQuintable.vue"
    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                },

            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  Fn = f(Sn, kn, Rn, !1, null, null, null, null);
const Pn = Fn.exports,
  An = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            {
              headline: "Name",
              cellFormatter: (n) => "Name: " + n.content.name,
            },
            {
              headline: "Age",
              cellFormatter: (n) => ({
                value: "<strong>" + n.content.age + "</strong>",
                type: "html",
              }),
            },
            { headline: "Birth Place", cellFormatter: (n) => n.content.city },
            { headline: "Job", cellFormatter: (n) => n.content.profession },
          ],
        },
      };
    },
    computed: {
      rows() {
        let n = 10;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++) {
          const i = {
            name: t.name({ nationality: "en" }),
            age: t.age(),
            city: t.city(),
            profession: t.profession(),
          };
          e.push([
            { content: i },
            { content: i },
            { content: i },
            { content: i },
          ]);
        }
        return e;
      },
    },
  };
var $n = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Cells will be formatted by custom formatting functions "),
          ],
          1
        ),
        t("VueQuintable", { attrs: { config: e.config, rows: e.rows } }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  On = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>

<script>

    import VueQuintable from "../components/VueQuintable.vue"

    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                            cellFormatter:(cell)=>{
                                return "Name: " +  cell.content.name
                            }
                        }, {
                            headline: "Age",
                            cellFormatter:(cell)=>{
                                return {
                                    value:"<strong>"+cell.content.age+"</strong>",
                                    type:"html",
                                }
                            }
                        }, {
                            headline: "Birth Place",
                            cellFormatter:(cell)=>{
                                return cell.content.city
                            }
                        }, {
                            headline: "Job",
                            cellFormatter:(cell)=>{
                                return cell.content.profession
                            }
                        }
                    ],
                },

             }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();



                for(let i = 0; i < count; i++){

                    const row = {
                        name:chance.name({ nationality: 'en' }),
                        age:chance.age(),
                        city:chance.city(),
                        profession:chance.profession(),
                    };

                    rows.push([
                        {
                            content:row
                        },
                        {
                            content:row
                        },
                        {
                            content:row
                        },
                        {
                            content:row
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>
`),
            ]),
          ]),
        ]
      );
    },
  ],
  Vn = f(An, $n, On, !1, null, null, null, null);
const jn = Vn.exports;
R.interceptors.request.use(
  (n) => (console.warn("Custom axios", n), n),
  (n) => {
    console.log("ERROR AXIOS", n);
  }
);
const En = {
  components: { VueQuintable: g },
  data() {
    return {
      axios: R,
      ajaxConfig: {
        columns: [
          { headline: "Name", sort: !0 },
          { headline: "Email", breakpoint: "sm", sort: !0 },
          { headline: "Phone", breakpoint: "md" },
          { headline: "Job Title", breakpoint: "md", sort: !0 },
          { headline: "City", breakpoint: "md" },
          { headline: "Address", breakpoint: "md" },
        ],
        pagination: 5,
        search: !0,
        pageSortSelect: !0,
        ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php",
        requestMethod: "POST",
      },
    };
  },
  methods: {
    rowsUpdated(n) {
      n.rows.length &&
        alert("Rows updated from server: " + n.rows.length + " rows.");
    },
  },
};
var qn = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(
              " Pagination and sorting will be handled by server side via ajax "
            ),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: { axios: e.axios, config: e.ajaxConfig },
          on: { "ajax:rows": e.rowsUpdated },
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary mt-3",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  Ln = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            n._v("           "),
            e("code", { staticClass: "language-markup" }, [
              n._v(`
      <template>
              <VueQuintable :axios="axios" :config="ajaxConfig" @ajax:rows="rowsUpdated"></VueQuintable>
      </template>

      <script>

          import VueQuintable from "../components/VueQuintable.vue"
          export default {
              components:{
                VueQuintable
              },
              data() {
                  return {
                      ajaxConfig: {
                          columns: [
                              {
                                  headline: "Name",
                                  sort: true,
                              }, {
                                  headline: "Email",
                                  breakpoint: "sm",
                                  sort: true,
                              }, {
                                  headline: "Phone",
                                  breakpoint: "md",
                              }, {
                                  headline: "Job Title",
                                  breakpoint: "md",
                                  sort: true,
                              }, {
                                  headline: "City",
                                  breakpoint: "md",
                              }, {
                                  headline: "Address",
                                  breakpoint: "md",

                              }
                          ],
                          pagination:5,
                          pageSortSelect:true,
                          ajaxUrl:"https://sensetence.com/vue-quintable-demo/data.php",
                          requestMethod: "POST",
                      },
                  }
              },
              methods:{
                  rowsUpdated(rows){
                      if(rows.length){
                          alert("Rows updated from server: "+rows.length +" rows.")
                      }
                  },
              }
          }

      <\/script>
  `),
            ]),
            n._v(`
      `),
          ]),
        ]
      );
    },
  ],
  Nn = f(En, qn, Ln, !1, null, null, null, null);
const Qn = Nn.exports;
R.interceptors.request.use(
  (n) => (console.warn("Custom axios", n), n),
  (n) => {
    console.log("ERROR AXIOS", n);
  }
);
const Tn = {
  components: { VueQuintable: g },
  data() {
    return {
      axios: R,
      selectedRows: [],
      allSelectedRows: {},
      preSelectedRowIds: [],
      preSelectedRows: [],
      ajaxRows: [],
      ajaxConfig: {
        columns: [
          { headline: "Name" },
          { headline: "Email", breakpoint: "sm" },
          { headline: "Phone", breakpoint: "md" },
          { headline: "Job Title", breakpoint: "md" },
          { headline: "City", breakpoint: "md" },
          { headline: "Address", breakpoint: "md" },
        ],
        pagination: 5,
        select: !0,
        selectPosition: "pre",
        selectAll: !0,
        prettySelect: !0,
        ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php/",
        pageChanged: !1,
      },
    };
  },
  watch: {
    selectedRows(n) {
      if (!this.pageChanged && this.ajaxRows) {
        for (let e = 0; e < n.length; e++)
          this.preSelectedRowIds.includes(n[e].id) ||
            (this.preSelectedRowIds.push(n[e].id),
            this.$set(this.allSelectedRows, n[e].id, n[e]));
        for (let e = 0; e < this.ajaxRows.length; e++) {
          const t = this.ajaxRows[e].id,
            s = this.preSelectedRowIds.indexOf(t);
          !n.map((i) => i.id).includes(t) &&
            s !== -1 &&
            (this.preSelectedRowIds.splice(s, 1),
            this.$delete(this.allSelectedRows, t));
        }
      }
    },
  },
  methods: {
    clearSelection() {
      (this.allSelectedRows = {}),
        (this.preSelectedRows = []),
        (this.preSelectedRowIds = []);
    },
    rowsUpdated(n) {
      (this.pageChanged = !1),
        n &&
          n.rows &&
          n.rows.length &&
          this.$nextTick(() => {
            this.preSelectedRows = this.preSelectedRowIds.map((e) => ({
              key: "id",
              value: e,
            }));
          }),
        (this.ajaxRows = n.rows);
    },
    onPageChange() {
      this.pageChanged = !0;
    },
  },
};
var Dn = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(
              " Selecting rows will be persistent, even if pages are changes via ajax "
            ),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: {
            "selected-rows": e.selectedRows,
            "pre-selected-rows": e.preSelectedRows,
            axios: e.axios,
            config: e.ajaxConfig,
          },
          on: {
            "update:selectedRows": function (s) {
              e.selectedRows = s;
            },
            "update:selected-rows": function (s) {
              e.selectedRows = s;
            },
            "update:page": e.onPageChange,
            "ajax:rows": e.rowsUpdated,
          },
        }),
        e.preSelectedRowIds.length
          ? t("p", [t("strong", [e._v("Selected Rows:")])])
          : e._e(),
        t(
          "div",
          { staticClass: "list-group" },
          e._l(e.preSelectedRowIds, function (s) {
            return t("div", { key: s, staticClass: "list-group-item" }, [
              e._v(" " + e._s(e.allSelectedRows[s].cells[0].html) + " "),
            ]);
          }),
          0
        ),
        e.preSelectedRowIds.length
          ? t(
              "div",
              {
                staticClass: "btn btn-danger mt-2",
                on: { click: e.clearSelection },
              },
              [e._v(" Clear ")]
            )
          : e._e(),
        t("div", { staticClass: "clearfix" }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary mt-3",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  Bn = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            n._v("             "),
            e("code", { pre: !0, attrs: { class: "language-markup" } }, [
              n._v(`
        <template>
           <VueQuintable
            :selected-rows.sync="selectedRows"
            :pre-selected-rows="preSelectedRows"
            :axios="axios"
            :config="ajaxConfig"
            @update:page="onPageChange"
            @ajax:rows="rowsUpdated"
          />

          <p v-if="preSelectedRowIds.length">
            <strong>Selected Rows:</strong>
          </p>
          <div class="list-group">
            <div class="list-group-item" v-for="id in preSelectedRowIds" :key="id">
              {{ allSelectedRows[id].cells[0].html }}
            </div>
          </div>
          <div
            class="btn btn-danger mt-2"
            v-if="preSelectedRowIds.length"
            @click="clearSelection"
          >
            Clear
          </div>
          <div class="clearfix"></div>
        </template>

        <script>
import VueQuintable from "../components/VueQuintable.vue";
import axiosCustom from "axios";

axiosCustom.interceptors.request.use(
  (config) => {
    console.warn("Custom axios", config);

    return config;
  },
  (error) => {
    console.log("ERROR AXIOS", error);
  }
);

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      axios: axiosCustom,
      selectedRows: [],
      allSelectedRows: {},
      preSelectedRowIds: [],
      preSelectedRows: [],
      ajaxRows: [],
      ajaxConfig: {
        //Object[] columns with headline, sticky, breakpoint, align, sort
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Email",
            breakpoint: "sm",
          },
          {
            headline: "Phone",
            breakpoint: "md",
          },
          {
            headline: "Job Title",
            breakpoint: "md",
          },
          {
            headline: "City",
            breakpoint: "md",
          },
          {
            headline: "Address",
            breakpoint: "md",
          },
        ],
        pagination: 5,
        select: true,
        selectPosition: "pre",
        selectAll: true,
        prettySelect: true,
        ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php/",
        pageChanged: false,
      },
    };
  },

  watch: {
    selectedRows(rows) {
      if (!this.pageChanged && this.ajaxRows) {
        for (let i = 0; i < rows.length; i++) {
          if (!this.preSelectedRowIds.includes(rows[i].id)) {
            this.preSelectedRowIds.push(rows[i].id);
            this.$set(this.allSelectedRows, rows[i].id, rows[i]);
          }
        }

        for (let j = 0; j < this.ajaxRows.length; j++) {
          const id = this.ajaxRows[j].id;

          const index = this.preSelectedRowIds.indexOf(id);

          if (!rows.map((r) => r.id).includes(id) && index !== -1) {
            this.preSelectedRowIds.splice(index, 1);
            this.$delete(this.allSelectedRows, id);
          }
        }
      }
    },
  },
  methods: {
    clearSelection() {
      this.allSelectedRows = {};
      this.preSelectedRows = [];
      this.preSelectedRowIds = [];
    },
    rowsUpdated(data) {
      this.pageChanged = false;
      if (data && data.rows && data.rows.length) {
        this.$nextTick(() => {
          this.preSelectedRows = this.preSelectedRowIds.map((id) => {
            return {
              key: "id",
              value: id,
            };
          });
        });
      }

      this.ajaxRows = data.rows;
    },
    onPageChange() {
      this.pageChanged = true;
    },
  },
};
<\/script>
    `),
            ]),
            n._v(`
        `),
          ]),
        ]
      );
    },
  ],
  Hn = f(Tn, Dn, Bn, !1, null, null, null, null);
const Un = Hn.exports,
  In = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          expandedRowIcon: "caret-up",
          collapsedRowIcon: "plus",
          columns: [
            { headline: "Name" },
            { headline: "Age", showHeadlineBreakpoint: "md", breakpoint: "md" },
            { headline: "Birth Place", sticky: !0, sort: !0 },
            {
              headline: "Description",
              hideHeadlineBreakpoint: "xxl",
              sticky: !0,
            },
            { headline: "Job", breakpoint: "all" },
          ],
        },
      };
    },
    computed: {
      rows() {
        let n = 10;
        const e = [],
          t = new v();
        for (let s = 0; s < n; s++)
          e.push([
            { text: t.name({ nationality: "en" }) },
            { text: t.age() },
            { text: t.city() },
            { text: [...Array(50).keys()].map(() => t.word()).join(" ") },
            { text: t.profession() },
          ]);
        return e;
      },
    },
  };
var Mn = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(" Resize your brower window to see responsive behaviour "),
          ],
          1
        ),
        t("VueQuintable", { attrs: { config: e.config, rows: e.rows } }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  Jn = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>
    import VueQuintable from "../components/VueQuintable.vue"
    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    expandedRowIcon: "caret-up",
                    collapsedRowIcon: "caret-down",
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                            breakpoint:"md"
                            showHeadlineBreakpoint:"md",
                        }, {
                            headline: "Birth Place",
                            sticky: true,
                            sort: true,
                        }, {
                            headline: "Job",
                            breakpoint: "all"
                        }
                    ],
                },
            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  Gn = f(In, Mn, Jn, !1, null, null, null, null);
const zn = Gn.exports,
  Kn = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name" },
            { headline: "Age", sort: !0 },
            { headline: "Birth Place" },
            { headline: "Job" },
            { headline: "Active" },
          ],
          pagination: 5,
          selectAllRows: !0,
          pageRange: 3,
          rowsSelect: !0,
          search: !0,
          select: !0,
          prettySelect: !0,
          storeState: !0,
        },
        activeOptions: [
          { label: "All", value: "both" },
          { label: "Only Active", value: !0 },
          { label: "Only Not Active", value: !1 },
        ],
        active: "both",
        identifier: "stored-state-table",
        filters: {},
        selected: [],
        rows: [],
      };
    },
    created() {
      let n = null;
      try {
        n = localStorage.getItem("stored-state-table-stored-rows")
          ? JSON.parse(localStorage.getItem("stored-state-table-stored-rows"))
          : null;
      } catch {}
      if (n) this.rows = n;
      else {
        let e = 250;
        const t = [],
          s = new v();
        for (let i = 0; i < e; i++) {
          const o = Math.random() >= 0.5;
          t.push({
            filters: { active: o },
            cells: [
              { text: s.name({ nationality: "en" }) },
              { text: s.age() },
              { text: s.city() },
              { text: s.profession() },
              { text: o ? "Yes" : "No" },
            ],
          });
        }
        this.rows = t;
        try {
          localStorage.setItem(
            "stored-state-table-stored-rows",
            JSON.stringify(t)
          );
        } catch {}
      }
    },
    watch: {
      active() {
        this.active === "both"
          ? this.$delete(this.filters, "active")
          : this.$set(this.filters, "active", this.active);
      },
      filters() {
        typeof this.filters.active > "u"
          ? (this.active = "both")
          : this.filters.active !== this.active &&
            (this.active = this.filters.active);
      },
    },
  };
var Wn = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(
              " Do some filtering/sorting/selecting and then reload the page, state stays the same "
            ),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: {
            config: e.config,
            filters: e.filters,
            selectedRows: e.selected,
            rows: e.rows,
            identifier: e.identifier,
          },
          on: {
            "update:filters": function (s) {
              e.filters = s;
            },
            "update:selectedRows": function (s) {
              e.selected = s;
            },
            "update:selected-rows": function (s) {
              e.selected = s;
            },
          },
          scopedSlots: e._u([
            {
              key: "header",
              fn: function () {
                return [
                  t("v-select", {
                    staticClass: "mb-3",
                    attrs: {
                      options: e.activeOptions,
                      reduce: (s) => s.value,
                      clearable: !1,
                    },
                    model: {
                      value: e.active,
                      callback: function (s) {
                        e.active = s;
                      },
                      expression: "active",
                    },
                  }),
                ];
              },
              proxy: !0,
            },
          ]),
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  Yn = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
         <VueQuintable
      :config="config"
      :filters.sync="filters"
      :selectedRows.sync="selected"
      :rows="rows"
      :identifier="identifier"
    >
      <template #header>
        <v-select
          v-model="active"
          :options="activeOptions"
          :clearable="false"
          :reduce="(x) => x.value"
          class="mb-3"
        ></v-select>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";

import Chance from "chance";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
            sort: true,
          },

          {
            headline: "Birth Place",
          },
          {
            headline: "Job",
          },
          {
            headline: "Active",
          },
        ],
        pagination: 5,
        selectAllRows: true,
        pageRange: 3,
        rowsSelect: true,
        search: true,
        select: true,
        prettySelect: true,
        storeState: true,
      },
      activeOptions: [
        { label: "All", value: "both" },
        { label: "Only Active", value: true },
        { label: "Only Not Active", value: false },
      ],
      active: "both",
      identifier: "stored-state-table",
      filters: {},
      selected: [],
      rows: [],
    };
  },

  created() {
    let storedRows = null;

    try {
      storedRows = localStorage.getItem("stored-state-table-stored-rows")
        ? JSON.parse(localStorage.getItem("stored-state-table-stored-rows"))
        : null;
    } catch (e) {
      //do nothing
    }

    if (!storedRows) {
      let count = 250;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        const active = rand >= 0.5;
        rows.push({
          filters: {
            active,
          },
          cells: [
            {
              text: chance.name({ nationality: "en" }),
            },

            {
              text: chance.age(),
            },
            {
              text: chance.city(),
            },
            {
              text: chance.profession(),
            },
            {
              text: active ? "Yes" : "No",
            },
          ],
        });
      }
      this.rows = rows;
      try {
        localStorage.setItem(
          "stored-state-table-stored-rows",
          JSON.stringify(rows)
        );
      } catch (e) {
        //do nothing
      }
    } else {
      this.rows = storedRows;
    }
  },
  watch: {
    active() {
      if (this.active === "both") {
        this.$delete(this.filters, "active");
      } else {
        this.$set(this.filters, "active", this.active);
      }
    },
    filters() {
      if (typeof this.filters.active === "undefined") {
        this.active = "both";
      } else if (this.filters.active !== this.active) {
        this.active = this.filters.active;
      }
    },
  },
};
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  Xn = f(Kn, Wn, Yn, !1, null, null, null, null);
const Zn = Xn.exports,
  es = {
    components: { VueQuintable: g },
    data() {
      return {
        config: {
          columns: [
            { headline: "Name", sort: !0 },
            { headline: "Email", breakpoint: "sm", sort: !0 },
            { headline: "Phone", breakpoint: "md" },
            { headline: "Job Title", breakpoint: "md", sort: !0 },
            { headline: "City", breakpoint: "md" },
            { headline: "Address", breakpoint: "md" },
          ],
          pagination: 5,
          rowsSelect: !0,
          search: !0,
          select: !0,
          prettySelect: !0,
          storeState: !0,
          ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php",
        },
        indexesOptions: [
          { label: "All", value: "all" },
          { label: "Bigger than 100", value: "bigger" },
          { label: "Smaller than 100", value: "smaller" },
        ],
        indexes: "all",
        identifier: "stored-state-table-ajax",
        filters: {},
        selected: [],
        rows: [],
      };
    },
    watch: {
      indexes() {
        this.indexes === "all"
          ? (this.$delete(this.filters, "bigger"),
            this.$delete(this.filters, "smaller"))
          : this.indexes === "bigger"
          ? (this.$set(this.filters, "bigger", !0),
            this.$delete(this.filters, "smaller"))
          : this.indexes === "smaller" &&
            (this.$set(this.filters, "smaller", !0),
            this.$delete(this.filters, "bigger"));
      },
      filters() {
        typeof this.filters.smaller > "u" && typeof this.filters.bigger > "u"
          ? (this.indexes = "all")
          : this.filters.smaller
          ? (this.indexes = "smaller")
          : this.filters.bigger && (this.indexes = "bigger");
      },
    },
  };
var ts = function () {
    var e = this,
      t = e._self._c;
    return t(
      "div",
      { staticClass: "content" },
      [
        t(
          "p",
          { staticClass: "alert alert-info" },
          [
            t("font-awesome-icon", {
              staticClass: "me-2",
              attrs: { icon: "info-circle" },
            }),
            e._v(
              " Do some filtering/sorting/selecting and then reload the page, state stays the same "
            ),
          ],
          1
        ),
        t("VueQuintable", {
          attrs: {
            config: e.config,
            filters: e.filters,
            selectedRows: e.selected,
            rows: e.rows,
            identifier: e.identifier,
          },
          on: {
            "update:filters": function (s) {
              e.filters = s;
            },
            "update:selectedRows": function (s) {
              e.selected = s;
            },
            "update:selected-rows": function (s) {
              e.selected = s;
            },
          },
          scopedSlots: e._u([
            {
              key: "header",
              fn: function () {
                return [
                  t("v-select", {
                    staticClass: "mb-3",
                    attrs: {
                      options: e.indexesOptions,
                      reduce: (s) => s.value,
                      clearable: !1,
                    },
                    model: {
                      value: e.indexes,
                      callback: function (s) {
                        e.indexes = s;
                      },
                      expression: "indexes",
                    },
                  }),
                ];
              },
              proxy: !0,
            },
          ]),
        }),
        t(
          "button",
          {
            staticClass: "btn btn-secondary",
            attrs: {
              "data-bs-toggle": "collapse",
              "data-bs-target": "#code-basic",
            },
          },
          [
            t("font-awesome-icon", { attrs: { icon: "chevron-up" } }),
            t("font-awesome-icon", { attrs: { icon: "chevron-down" } }),
            t("span", { staticClass: "show ms-2" }, [e._v("Show")]),
            t("span", { staticClass: "hide ms-2" }, [e._v("Hide")]),
            e._v(" Code "),
          ],
          1
        ),
        e._m(0),
      ],
      1
    );
  },
  ns = [
    function () {
      var n = this,
        e = n._self._c;
      return e(
        "div",
        { staticClass: "mt-2 collapse show", attrs: { id: "code-basic" } },
        [
          e("pre", { attrs: { "data-toolbar-order": "copy-to-clipboard" } }, [
            e("code", { staticClass: "language-markup" }, [
              n._v(`<template>
        <VueQuintable
      :config="config"
      :filters.sync="filters"
      :selectedRows.sync="selected"
      :rows="rows"
      :identifier="identifier"
    >
      <template #header>
        <v-select
          v-model="indexes"
          :options="indexesOptions"
          :clearable="false"
          :reduce="(x) => x.value"
          class="mb-3"
        ></v-select>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
            sort: true,
          },
          {
            headline: "Email",
            breakpoint: "sm",
            sort: true,
          },
          {
            headline: "Phone",
            breakpoint: "md",
          },
          {
            headline: "Job Title",
            breakpoint: "md",
            sort: true,
          },
          {
            headline: "City",
            breakpoint: "md",
          },
          {
            headline: "Address",
            breakpoint: "md",
          },
        ],
        pagination: 5,
        rowsSelect: true,
        search: true,
        select: true,
        prettySelect: true,
        storeState: true,
        ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php",
      },
      indexesOptions: [
        { label: "All", value: "all" },
        { label: "Bigger than 100", value: "bigger" },
        { label: "Smaller than 100", value: "smaller" },
      ],
      indexes: "all",
      identifier: "stored-state-table-ajax",
      filters: {},
      selected: [],
      rows: [],
    };
  },
  watch: {
    indexes() {
      if (this.indexes === "all") {
        this.$delete(this.filters, "bigger");
        this.$delete(this.filters, "smaller");
      } else if (this.indexes === "bigger") {
        this.$set(this.filters, "bigger", true);
        this.$delete(this.filters, "smaller");
      } else if (this.indexes === "smaller") {
        this.$set(this.filters, "smaller", true);
        this.$delete(this.filters, "bigger");
      }
    },
    filters() {
      if (
        typeof this.filters.smaller === "undefined" &&
        typeof this.filters.bigger === "undefined"
      ) {
        this.indexes = "all";
      } else if (this.filters.smaller) {
        this.indexes = "smaller";
      } else if (this.filters.bigger) {
        this.indexes = "bigger";
      }
    },
  },
};
<\/script>`),
            ]),
          ]),
        ]
      );
    },
  ],
  ss = f(es, ts, ns, !1, null, null, null, null);
const is = ss.exports;
const as = "" + new URL("banner-0488777d.png", import.meta.url).href;
R.interceptors.request.use(
  (n) => (console.warn("Custom axios", n), n),
  (n) => {
    console.log("ERROR AXIOS", n);
  }
);
const os = {
  name: "app",
  components: {
    BasicExample: ze,
    BreakpointsExample: ft,
    AjaxSelectExample: Un,
    BreakpointsAdvancedExample: zn,
    AjaxExample: Qn,
    AjaxLoadedExample: At,
    PaginationExample: it,
    SortExample: ct,
    BindedExample: vt,
    TooltipsExample: bn,
    SelectExample: Ze,
    FiltersExample: Et,
    ComponentsExample: Ut,
    EventsExample: St,
    NestedExample: zt,
    SlotsExample: Zt,
    HiddenExample: Cn,
    AddRemoveExample: pn,
    ComputedRowsExample: Pn,
    CellFormattersExample: jn,
    StoreStateExample: Zn,
    AjaxStoreStateExample: is,
  },
  data() {
    return {
      example: { value: "BasicExample", label: "Basic Example" },
      examples: [
        { value: "BasicExample", label: "Basic Example" },
        { value: "ComputedRowsExample", label: "Computed Rows Example" },
        { value: "PaginationExample", label: "Pagination Example" },
        { value: "SortExample", label: "Sort Example" },
        { value: "SelectExample", label: "Select Example" },
        { value: "CellFormattersExample", label: "Cell Formatters Example" },
        { value: "BreakpointsExample", label: "Breakpoints Example" },
        {
          value: "BreakpointsAdvancedExample",
          label: "Breakpoints Advanced Example",
        },
        { value: "TooltipsExample", label: "Tooltips" },
        { value: "AjaxExample", label: "Ajax Example" },
        { value: "AjaxSelectExample", label: "Ajax + Select Example" },
        { value: "AjaxLoadedExample", label: "Ajax Loaded Example" },
        { value: "EventsExample", label: "Events Example" },
        { value: "SlotsExample", label: "Slots Example" },
        { value: "BindedExample", label: "Vue-binded Example" },
        { value: "FiltersExample", label: "Filter Example" },
        { value: "ComponentsExample", label: "Component Example" },
        { value: "HiddenExample", label: "Hide/Show Example" },
        { value: "AddRemoveExample", label: "Add/Remove/Move Example" },
        { value: "NestedExample", label: "Nested Example" },
        { value: "StoreStateExample", label: "Store State" },
        { value: "AjaxStoreStateExample", label: "Ajax Store State" },
      ],
    };
  },
  watch: {
    example: {
      handler() {
        this.$nextTick(() => {
          oe.highlightAll();
        });
      },
      immediate: !0,
    },
  },
  created() {
    oe.manual = !0;
  },
};
var ls = function () {
    var e = this,
      t = e._self._c;
    return t("div", { attrs: { id: "app" } }, [
      t("div", { staticClass: "container py-5" }, [
        e._m(0),
        t("div", { staticClass: "row" }, [
          t(
            "div",
            { staticClass: "col-12" },
            [
              t("v-select", {
                staticClass: "mb-3",
                attrs: { clearable: !1, options: e.examples },
                model: {
                  value: e.example,
                  callback: function (s) {
                    e.example = s;
                  },
                  expression: "example",
                },
              }),
              t(
                "div",
                { staticClass: "example-content" },
                [t(e.example.value, { tag: "component" })],
                1
              ),
            ],
            1
          ),
        ]),
      ]),
    ]);
  },
  rs = [
    function () {
      var n = this,
        e = n._self._c;
      return e("div", { staticClass: "row" }, [
        e("div", { staticClass: "col-12" }, [
          e("div", { staticClass: "text-center" }, [
            e("img", {
              attrs: {
                alt: "VueQuintable Logo",
                title: "VueQuintable Logo",
                src: as,
                width: "400",
                height: "300",
              },
            }),
            e("h1", { staticClass: "mb-4" }, [n._v("VueQuintable Demo")]),
          ]),
        ]),
      ]);
    },
  ],
  cs = f(os, ls, rs, !1, null, null, null, null);
const ds = cs.exports;
y.config.productionTip = !1;
m.add(pe);
m.add(fe);
m.add(me);
m.add(ge);
m.add(we);
m.add(be);
m.add(ve);
m.add(_e);
m.add(xe);
m.add(ye);
m.add(Ce);
m.add(Se);
m.add(ke);
m.add(Re);
m.add(Fe);
m.add(Pe);
m.add(Ae);
m.add($e);
m.add(Oe);
m.add(Ve);
m.add(je);
m.add(Ee);
y.component("v-select", qe);
y.component("p-check", Le);
y.component("p-radio", Ne);
y.component("font-awesome-icon", Qe);
y.use(Te, {
  defaultTemplate:
    '<div class="quintable-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  defaultClass: "",
});
new y({ render: (n) => n(ds) }).$mount("#app");
