import ce from "vue-select";
import { library as y } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as he } from "@fortawesome/vue-fontawesome";
import ue from "v-tooltip";
import { faAngleDoubleLeft as fe, faAngleDoubleRight as de, faAngleLeft as ge, faAngleRight as pe, faCaretDown as me, faCaretUp as we, faCheck as be, faChevronDown as ye, faChevronUp as Se, faCircleNotch as Fe, faEye as ve, faEyeSlash as Ce, faMinus as _e, faPlus as Re, faSort as ke, faSortAmountDown as Pe, faSortAmountDownAlt as xe, faSquare as Oe, faTimes as qe } from "@fortawesome/free-solid-svg-icons";
import ie from "fuzzy.js";
import Ae from "axios";
var je = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function $e(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var E = {}, Le = {
  get exports() {
    return E;
  },
  set exports(i) {
    E = i;
  }
};
/*!
 * pretty-checkbox-vue v1.1.9
 * (c) 2017-2018 Hamed Ehtesham
 * Released under the MIT License.
 */
(function(i, e) {
  (function(t, s) {
    i.exports = s();
  })(typeof self != "undefined" ? self : je, function() {
    return function(t) {
      var s = {};
      function l(n) {
        if (s[n])
          return s[n].exports;
        var o = s[n] = { i: n, l: !1, exports: {} };
        return t[n].call(o.exports, o, o.exports, l), o.l = !0, o.exports;
      }
      return l.m = t, l.c = s, l.d = function(n, o, a) {
        l.o(n, o) || Object.defineProperty(n, o, { configurable: !1, enumerable: !0, get: a });
      }, l.n = function(n) {
        var o = n && n.__esModule ? function() {
          return n.default;
        } : function() {
          return n;
        };
        return l.d(o, "a", o), o;
      }, l.o = function(n, o) {
        return Object.prototype.hasOwnProperty.call(n, o);
      }, l.p = "", l(l.s = 1);
    }([function(t, s) {
      t.exports = function(l, n, o, a, r, c) {
        var u, f = l = l || {}, d = typeof l.default;
        d !== "object" && d !== "function" || (u = l, f = l.default);
        var g, m = typeof f == "function" ? f.options : f;
        if (n && (m.render = n.render, m.staticRenderFns = n.staticRenderFns, m._compiled = !0), o && (m.functional = !0), r && (m._scopeId = r), c ? (g = function(b) {
          (b = b || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || typeof __VUE_SSR_CONTEXT__ == "undefined" || (b = __VUE_SSR_CONTEXT__), a && a.call(this, b), b && b._registeredComponents && b._registeredComponents.add(c);
        }, m._ssrRegister = g) : a && (g = a), g) {
          var S = m.functional, F = S ? m.render : m.beforeCreate;
          S ? (m._injectStyles = g, m.render = function(b, p) {
            return g.call(p), F(b, p);
          }) : m.beforeCreate = F ? [].concat(F, g) : [g];
        }
        return { esModule: u, exports: f, options: m };
      };
    }, function(t, s, l) {
      var n = l(0)(l(2), null, !1, null, null, null);
      n.options.__file = "src/PrettyCheckbox.vue", t.exports = n.exports;
    }, function(t, s, l) {
      Object.defineProperty(s, "__esModule", { value: !0 });
      var n = l(3), o = { name: "pretty-checkbox", input_type: "checkbox", model: n.model, props: n.props, data: n.data, computed: n.computed, watch: n.watch, mounted: n.mounted, methods: n.methods, render: n.render };
      s.default = o;
    }, function(t, s, l) {
      var n = l(0)(l(4), l(5), !1, null, null, null);
      n.options.__file = "src/PrettyInput.vue", t.exports = n.exports;
    }, function(t, s, l) {
      Object.defineProperty(s, "__esModule", { value: !0 }), s.default = { name: "pretty-input", model: { prop: "modelValue", event: "change" }, props: { type: String, name: String, value: {}, modelValue: {}, trueValue: {}, falseValue: {}, checked: {}, disabled: {}, required: {}, indeterminate: {}, color: String, offColor: String, hoverColor: String, indeterminateColor: String, toggle: {}, hover: {}, focus: {} }, data: function() {
        return { m_checked: void 0, default_mode: !1 };
      }, computed: { _type: function() {
        return this.$options.input_type ? this.$options.input_type : this.type ? this.type : "checkbox";
      }, shouldBeChecked: function() {
        return this.modelValue !== void 0 ? this._type === "radio" ? this.modelValue === this.value : this.modelValue instanceof Array ? this.modelValue.includes(this.value) : this._trueValue ? this.modelValue === this.trueValue : typeof this.modelValue == "string" || !!this.modelValue : this.m_checked === void 0 ? this.m_checked = typeof this.checked == "string" || !!this.checked : this.m_checked;
      }, _disabled: function() {
        return typeof this.disabled == "string" || !!this.disabled;
      }, _required: function() {
        return typeof this.required == "string" || !!this.required;
      }, _indeterminate: function() {
        return typeof this.indeterminate == "string" || !!this.indeterminate;
      }, _trueValue: function() {
        return typeof this.trueValue == "string" ? this.trueValue : !!this.trueValue;
      }, _falseValue: function() {
        return typeof this.falseValue == "string" ? this.falseValue : !!this.falseValue;
      }, _toggle: function() {
        return typeof this.toggle == "string" || !!this.toggle;
      }, _hover: function() {
        return typeof this.hover == "string" || !!this.hover;
      }, _focus: function() {
        return typeof this.focus == "string" || !!this.focus;
      }, classes: function() {
        return { pretty: !0, "p-default": this.default_mode, "p-round": this._type === "radio" && this.default_mode, "p-toggle": this._toggle, "p-has-hover": this._hover, "p-has-focus": this._focus, "p-has-indeterminate": this._indeterminate };
      }, onClasses: function() {
        var n = { state: !0, "p-on": this._toggle };
        return this.color && (n["p-" + this.color] = !0), n;
      }, offClasses: function() {
        var n = { state: !0, "p-off": !0 };
        return this.offColor && (n["p-" + this.offColor] = !0), n;
      }, hoverClasses: function() {
        var n = { state: !0, "p-is-hover": !0 };
        return this.hoverColor && (n["p-" + this.hoverColor] = !0), n;
      }, indeterminateClasses: function() {
        var n = { state: !0, "p-is-indeterminate": !0 };
        return this.indeterminateColor && (n["p-" + this.indeterminateColor] = !0), n;
      } }, watch: { checked: function(n) {
        this.m_checked = n;
      }, indeterminate: function(n) {
        this.$refs.input.indeterminate = n;
      } }, mounted: function() {
        this.$vnode.data && !this.$vnode.data.staticClass && (this.default_mode = !0), this._indeterminate && (this.$refs.input.indeterminate = !0), this.$el.setAttribute("p-" + this._type, "");
      }, methods: { updateInput: function(n) {
        if (this._type !== "radio") {
          this.$emit("update:indeterminate", !1);
          var o = n.target.checked;
          if (this.m_checked = o, this.modelValue instanceof Array) {
            var a = [].concat(function(r) {
              if (Array.isArray(r)) {
                for (var c = 0, u = Array(r.length); c < r.length; c++)
                  u[c] = r[c];
                return u;
              }
              return Array.from(r);
            }(this.modelValue));
            o ? a.push(this.value) : a.splice(a.indexOf(this.value), 1), this.$emit("change", a);
          } else
            this.$emit("change", o ? !this._trueValue || this.trueValue : !!this._falseValue && this.falseValue);
        } else
          this.$emit("change", this.value);
      } } };
    }, function(t, s, l) {
      var n = function() {
        var o = this.$createElement, a = this._self._c || o;
        return a("div", { class: this.classes }, [a("input", { ref: "input", attrs: { type: this._type, name: this.name, disabled: this._disabled, required: this._required }, domProps: { checked: this.shouldBeChecked, value: this.value }, on: { change: this.updateInput } }), this._v(" "), a("div", { class: this.onClasses }, [this._t("extra"), this._v(" "), a("label", [this._t("default")], 2)], 2), this._v(" "), this._toggle ? a("div", { class: this.offClasses }, [this._t("off-extra"), this._v(" "), this._t("off-label")], 2) : this._e(), this._v(" "), this._hover ? a("div", { class: this.hoverClasses }, [this._t("hover-extra"), this._v(" "), this._t("hover-label")], 2) : this._e(), this._v(" "), this._indeterminate ? a("div", { class: this.indeterminateClasses }, [this._t("indeterminate-extra"), this._v(" "), this._t("indeterminate-label")], 2) : this._e()]);
      };
      n._withStripped = !0, t.exports = { render: n, staticRenderFns: [] };
    }]);
  });
})(Le);
const Te = /* @__PURE__ */ $e(E);
var V = {}, se = {
  get exports() {
    return V;
  },
  set exports(i) {
    V = i;
  }
}, ne = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (ne) {
  var le = new Uint8Array(16);
  se.exports = function() {
    return ne(le), le;
  };
} else {
  var oe = new Array(16);
  se.exports = function() {
    for (var e = 0, t; e < 16; e++)
      e & 3 || (t = Math.random() * 4294967296), oe[e] = t >>> ((e & 3) << 3) & 255;
    return oe;
  };
}
var ae = [];
for (var k = 0; k < 256; ++k)
  ae[k] = (k + 256).toString(16).substr(1);
function Ee(i, e) {
  var t = e || 0, s = ae;
  return [
    s[i[t++]],
    s[i[t++]],
    s[i[t++]],
    s[i[t++]],
    "-",
    s[i[t++]],
    s[i[t++]],
    "-",
    s[i[t++]],
    s[i[t++]],
    "-",
    s[i[t++]],
    s[i[t++]],
    "-",
    s[i[t++]],
    s[i[t++]],
    s[i[t++]],
    s[i[t++]],
    s[i[t++]],
    s[i[t++]]
  ].join("");
}
var Ve = Ee, Ue = V, Me = Ve;
function De(i, e, t) {
  var s = e && t || 0;
  typeof i == "string" && (e = i === "binary" ? new Array(16) : null, i = null), i = i || {};
  var l = i.random || (i.rng || Ue)();
  if (l[6] = l[6] & 15 | 64, l[8] = l[8] & 63 | 128, e)
    for (var n = 0; n < 16; ++n)
      e[s + n] = l[n];
  return e || Me(l);
}
var Ge = De;
function Ne(i, e, t, s, l, n, o, a) {
  var r = typeof i == "function" ? i.options : i;
  e && (r.render = e, r.staticRenderFns = t, r._compiled = !0), s && (r.functional = !0), n && (r._scopeId = "data-v-" + n);
  var c;
  if (o ? (c = function(d) {
    d = d || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ != "undefined" && (d = __VUE_SSR_CONTEXT__), l && l.call(this, d), d && d._registeredComponents && d._registeredComponents.add(o);
  }, r._ssrRegister = c) : l && (c = a ? function() {
    l.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), c)
    if (r.functional) {
      r._injectStyles = c;
      var u = r.render;
      r.render = function(g, m) {
        return c.call(m), u(g, m);
      };
    } else {
      var f = r.beforeCreate;
      r.beforeCreate = f ? [].concat(f, c) : [c];
    }
  return {
    exports: i,
    options: r
  };
}
const Be = {
  name: "VueQuintable",
  props: {
    rows: {
      type: Array,
      default() {
        return [];
      }
    },
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    dynamicConfig: {
      type: Boolean,
      default: !1
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    selectedRows: {
      type: Array,
      default() {
        return [];
      }
    },
    preSelectedRows: {
      type: Array,
      default() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: !1
    },
    filters: {
      type: Object,
      default() {
        return {};
      }
    },
    filterGroups: {
      type: Array,
      default() {
        return [];
      }
    },
    verbose: {
      type: Boolean,
      default: !1
    },
    nested: {
      type: Boolean,
      default: !1
    },
    tableClasses: {
      type: String,
      default: ""
    },
    sortOrder: {
      type: Array,
      default() {
        return [];
      }
    },
    updated: {
      type: [Boolean, Object, Date],
      default: !1
    },
    axios: {
      type: Function
    },
    identifier: {
      type: String,
      default: null
    },
    initialSearchTerm: {
      type: String,
      default: null
    }
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
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        15,
        20,
        25,
        30,
        50,
        100
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
      uuid: Ge(),
      loaderHeight: 0,
      defaultOperator: "equal",
      queryAjaxTimeout: null,
      lastSearchQueryUpdated: null,
      operatorFunctions: {
        equal: (i, e) => e === i,
        greater: (i, e) => e > i,
        less: (i, e) => e < i,
        greaterEqual: (i, e) => e >= i,
        lessEqual: (i, e) => e <= i,
        contains: (i, e) => !Array.isArray(e) && typeof e != "string" ? !1 : e.indexOf(i) !== -1,
        notContains: (i, e) => !Array.isArray(e) && typeof e != "string" ? !1 : e.indexOf(i) === -1,
        startsWith: (i, e) => typeof e != "string" ? !1 : e.indexOf(i) === 0,
        endsWitch: (i, e) => typeof e != "string" ? !1 : e.indexOf(i, this.length - i.length) !== -1,
        matches(i, e) {
          return !(i instanceof RegExp) || typeof e != "string" ? !1 : i.test(e);
        }
      },
      storedState: {}
    };
  },
  computed: {
    /**
     * Just a debug flag
     *
     */
    DEBUG() {
      return this.verbose;
    },
    /**
     * Checks if an axios instance has been passed to quintable or the default axios has to be used
     *
     */
    axiosFinal() {
      return this.axios ? this.axios : Ae;
    },
    /**
     * Set default values for all possible config values
     *
     */
    configFinal() {
      if (!this.config)
        return {};
      let i = !1;
      if (this.config.pagination === !0)
        i = 25;
      else if (this.config.pagination) {
        let h = 0;
        for (; this.paginationOptions[h] <= this.config.pagination && h < this.paginationOptions.length; )
          h++;
        i = this.paginationOptions[Math.min(h - 1, this.paginationOptions.length - 1)];
      }
      let e = "of";
      this.config.numberOfVisibleRowsFillerWord && (e = this.config.numberOfVisibleRowsFillerWord);
      let t = !1;
      this.config.select && (t = !0);
      let s = 250;
      this.config.ajaxRequestDelay && (s = this.config.ajaxRequestDelay);
      let l = "bg-muted";
      this.config.hoverClass === !1 ? l = "" : this.config.hoverClass && this.config.hoverClass !== !0 && (l = this.config.hoverClass);
      let n = !1;
      this.config.multiSort && (n = !0);
      let o = !1;
      this.config.pageSort && (o = !0);
      let a = !1;
      this.config.multiSortSelect && (a = !0);
      let r = !1;
      this.config.pageSortSelect && (r = !0);
      let c = !1;
      this.config.ajaxUrl && (c = this.config.ajaxUrl);
      let u = "post";
      ["pre", "post"].includes(this.config.selectPosition) && (u = this.config.selectPosition);
      let f = !1;
      this.config.expandedAll && (f = !0);
      let d = !1;
      this.config.useFuzzySearch && (d = !0);
      let g = !1;
      this.config.prettySelect && (g = !0);
      let m = !1;
      this.config.rowsSelect && (m = !0);
      let S = !1;
      this.config.disallowAllOption && (S = !0);
      let F = !1;
      this.config.hideEmptyColumns && (F = !0);
      let b = "none";
      ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns) && (b = this.config.ignoreSortEmptyColumns);
      let p = !1;
      this.config.search && (p = !0);
      let w = 1;
      this.config.searchLength && (w = this.config.searchLength);
      let U = "Search...";
      this.config.searchPlaceholder && (U = this.config.searchPlaceholder);
      let M = "Multiple sort";
      this.config.multiSortPlaceholder && (M = this.config.multiSortPlaceholder);
      let D = "Page sort";
      this.config.pageSortPlaceholder && (D = this.config.pageSortPlaceholder);
      let G = "AND";
      ["AND", "OR"].includes(this.config.filterRelation) && (G = this.config.filterRelation);
      let N = "AND";
      ["AND", "OR"].includes(this.config.filterGroupRelation) && (N = this.config.filterGroupRelation);
      let B = "Rows per page:";
      this.config.rowsPlaceholder && (B = this.config.rowsPlaceholder);
      let H = "No rows...";
      this.config.emptyPlaceholder && (H = this.config.emptyPlaceholder);
      let Q = !1;
      this.config.selectAll && (Q = !0);
      let C = !1;
      this.config.selectAllRows && (C = !0), c && C && (console.warn(
        "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
      ), C = !1);
      let _ = !1;
      this.config.storeState && (_ = !0), !this.identifier && this.config.storeState && (console.warn(
        "Option storeState was deactivated automatically because table identifier is not set!"
      ), _ = !1);
      const O = "test-local-storage";
      try {
        localStorage.setItem(O, O), localStorage.removeItem(O);
      } catch (h) {
        console.warn(
          "Option storeState was deactivated automatically because local storage is not available!"
        ), _ = !1;
      }
      let z = !1;
      this.config.defaultSelected && (z = !0);
      let K = !1;
      this.config.hideRowToggle && (K = !0);
      let J = "chevron-up";
      this.config.expandedRowIcon && typeof this.config.expandedRowIcon == "string" && ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
        this.config.expandedRowIcon.toLowerCase()
      ) && (J = this.config.expandedRowIcon.toLowerCase());
      let W = "chevron-down";
      this.config.collapsedRowIcon && typeof this.config.collapsedRowIcon == "string" && ["chevron-down", "plus", "caret-down", "eye"].includes(
        this.config.collapsedRowIcon.toLowerCase()
      ) && (W = this.config.collapsedRowIcon.toLowerCase());
      let I = 5;
      this.config.pageRange && (I = this.config.pageRange);
      let X = "col-12";
      this.config.searchClass && (X = this.config.searchClass);
      let Y = "row";
      this.config.searchContainerClass && (Y = this.config.searchContainerClass);
      let Z = "GET";
      this.config.requestMethod && typeof this.config.requestMethod == "string" && ["POST", "GET"].includes(this.config.requestMethod.toUpperCase()) && (Z = this.config.requestMethod.toUpperCase());
      let ee = 0, q = [], A = [], j = [], R = [], $ = [], L = [], v = [], T = [], te = null;
      if (this.config.columns) {
        ee = this.config.columns.length;
        for (let h = 0; h < this.config.columns.length; h++)
          v[h] = "", this.config.columns[h] && this.config.columns[h].headline ? (q[h] = this.config.columns[h].headline, v[h] += this.config.columns[h].headline.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()) : q[h] = "", v[h] += " column-" + (h + 1), this.config.columns[h].classes && (v[h] += " " + this.config.columns[h].classes), this.config.columns[h] && this.config.columns[h].breakpoint ? A[h] = this.config.columns[h].breakpoint : A[h] = "", this.config.columns[h] && this.config.columns[h].sort ? this.config.columns[h].firstSortDirection && typeof this.config.columns[h].firstSortDirection == "string" && ["DESC", "ASC"].includes(
            this.config.columns[h].firstSortDirection.toUpperCase()
          ) ? R[h] = this.config.columns[h].firstSortDirection.toUpperCase() : R[h] = !0 : R[h] = !1, this.config.columns[h] && this.config.columns[h].ignoreEmpty ? T[h] = !0 : T[h] = !1, this.config.columns[h] && this.config.columns[h].sticky ? $[h] = !0 : $[h] = !1, this.config.columns[h] && this.config.columns[h].hidden ? j[h] = !0 : j[h] = !1, this.config.columns[h] && this.config.columns[h].align ? L[h] = this.config.columns[h].align : L[h] = !1;
        te = this.config.columns;
      }
      return {
        headlines: q,
        columnClasses: v,
        sorts: R,
        pageSort: o,
        multiSort: n,
        pageSortSelect: r,
        multiSortSelect: a,
        filterGroupRelation: N,
        filterRelation: G,
        rowsSelect: m,
        disallowAllOption: S,
        defaultSelected: z,
        searchLength: w,
        search: p,
        searchPlaceholder: U,
        useFuzzySearch: d,
        ajaxUrl: c,
        pageSortPlaceholder: D,
        multiSortPlaceholder: M,
        rowsPlaceholder: B,
        emptyPlaceholder: H,
        stickyCols: $,
        alignments: L,
        breakpoints: A,
        hiddenCols: j,
        ignoreEmpty: T,
        hideEmptyColumns: F,
        ignoreSortEmptyColumns: b,
        pagination: i,
        numberOfVisibleRowsFillerWord: e,
        select: t,
        selectAll: Q,
        selectAllRows: C,
        hoverClass: l,
        expandedAll: f,
        pageRange: I,
        prettySelect: g,
        number: ee,
        columns: te,
        hideRowToggle: K,
        expandedRowIcon: J,
        collapsedRowIcon: W,
        selectPosition: u,
        searchClass: X,
        searchContainerClass: Y,
        requestMethod: Z,
        storeState: _,
        ajaxRequestDelay: s
      };
    },
    /**
     * Checks which rows shall be shown
     *
     * @returns {Array} a boolean array which represents all indexes of the rows
     */
    visibleRows() {
      if (this.rowsUpdatedKey && !this.configFinal.ajaxUrl && this.currentRowsPerPage !== "All") {
        let i = [];
        for (let n = 0; n < this.rowsFinal.length; n++)
          i.push(!1);
        let e = {};
        for (let n in this.sortedIndexes)
          Object.prototype.hasOwnProperty.call(this.sortedIndexes, n) && this.filteredRows[this.sortedIndexes[n]] && (e[n] = this.sortedIndexes[n]);
        let t = this.currentPage * this.currentRowsPerPage, s = t - this.currentRowsPerPage, l = 0;
        for (let n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (n = parseInt(n), l < t && l >= s && (i[e[n]] = !0), l++);
        return i;
      } else
        return this.filteredRows;
    },
    /**
     * Checks which indexes belongs to the current visible rows
     *
     * @returns {Array} an array of all visible indexes
     */
    visibleRowIndexes() {
      let i = [];
      if (this.indexesUpdatedKey)
        if (this.configFinal.ajaxUrl && !this.pageSort)
          for (let e = 0; e < this.rowsFinal.length; e++)
            i.push(e);
        else
          for (let e in this.sortedIndexes)
            Object.prototype.hasOwnProperty.call(this.sortedIndexes, e) && this.visibleRows[this.sortedIndexes[e]] && i.push(this.sortedIndexes[e]);
      return i;
    },
    /**
     * Checks which cells are hidden and shall be displayed as additional generated rows.
     *
     * @returns {Object} an object with sorted index as key and generated row array of cells as value
     */
    generatedRows() {
      let i = {};
      if (this.generatedUpdatedKey)
        for (let e = 0; e < this.rowsFinal.length; e++) {
          let t = this.rowsFinal[e].cells ? this.rowsFinal[e].cells : this.rowsFinal[e], s = {};
          for (let l = 0; l < this.hiddenBreakpoints.length; l++) {
            let n = this.hiddenBreakpoints[l];
            for (let o = 0; o < this.configFinal.columns.length; o++) {
              let a = this.configFinal.columns[o];
              !(this.configFinal.hiddenCols[o] || !this.configFinal.ignoreEmpty[o] && this.configFinal.hideEmptyColumns && (this.isColEmpty(o) || this.isColEmpty(o, e)) || this.emptyColumns[o]) && a.breakpoint && (a.breakpoint.toLocaleLowerCase() === "all" || a.breakpoint.toLocaleLowerCase() === n) && !a.sticky && !a.alwaysExpanded && (s[o] = t[o]);
            }
          }
          i[e] = s;
        }
      return i;
    },
    stickyRows() {
      let i = {};
      for (let e = 0; e < this.rowsFinal.length; e++) {
        let t = this.rowsFinal[e].cells ? this.rowsFinal[e].cells : this.rowsFinal[e], s = {};
        for (let l = 0; l < this.hiddenBreakpoints.length; l++) {
          let n = this.hiddenBreakpoints[l];
          for (let o = 0; o < this.configFinal.columns.length; o++) {
            let a = this.configFinal.columns[o];
            const r = this.configFinal.hiddenCols[o] || !this.configFinal.ignoreEmpty[o] && this.configFinal.hideEmptyColumns && (this.isColEmpty(o) || this.isColEmpty(o, e)) || this.emptyColumns[o];
            (!r && a.sticky || !r && a.breakpoint && (a.breakpoint.toLocaleLowerCase() === "all" || a.breakpoint.toLocaleLowerCase() === n) && a.alwaysExpanded) && (s[o] = t[o]);
          }
        }
        i[e] = s;
      }
      return i;
    },
    /**
     * Calculates the all selected flag. Special case: defaultSelected is set and no user action in place
     *
     */
    allSelectedProperty: {
      get() {
        return this.allSelectedCustom === null ? this.configFinal.defaultSelected : this.allSelectedCustom;
      },
      set(i) {
        this.allSelectedCustom = i;
      }
    },
    /**
     * Calculates number of current rows per page. Special case: no user action in place
     *
     */
    currentRowsPerPageProperty: {
      get() {
        return this.customRowsPerPage ? this.customRowsPerPage : this.currentRowsPerPage;
      },
      set(i) {
        this.customRowsPerPage = i;
      }
    },
    /**
     * Checks if page sort is currently active. Special case: no user action in place
     *
     */
    pageSort: {
      get() {
        return this.customPageSort === null ? this.configFinal.pageSort : this.customPageSort;
      },
      set(i) {
        this.customPageSort = i;
      }
    },
    /**
     * Checks if multi sort is currently active. Special case: no user action in place
     *
     */
    multiSort: {
      get() {
        return this.customMultiSort === null ? this.configFinal.multiSort : this.customMultiSort;
      },
      set(i) {
        this.customMultiSort = i;
      }
    },
    /**
     * Calculates the value of number of shown rows. If no pagination is set, all will be displayed.
     *
     */
    currentRowsPerPage() {
      return this.customRowsPerPage ? this.customRowsPerPage : this.configFinal.pagination ? this.configFinal.pagination : "All";
    },
    /**
     * Checks if there are any generated rows in place
     *
     */
    hasGeneratedRows() {
      for (let i in this.generatedRows)
        if (Object.prototype.hasOwnProperty.call(this.generatedRows, i) && Object.keys(this.generatedRows[i]).length)
          return !0;
      return !1;
    },
    /**
     * Calculates the classes array for every cell from the align parameters of rows and cells and the custom class string passed to cells
     *
     */
    cellClassesParsed() {
      let i = [];
      for (let e = 0; e < this.rowsFinal.length; e++) {
        i.push([]);
        let t = this.rowsFinal[e].align, s = this.rowsFinal[e].cells ? this.rowsFinal[e].cells : this.rowsFinal[e];
        for (let l = 0; l < s.length; l++) {
          let n = [], o = this.configFinal.alignments[l];
          if ((s[l].align || t || o) && (s[l].align ? n.push("text-" + s[l].align) : t ? n.push("text-" + t) : n.push("text-" + o)), s[l].classes) {
            let a = s[l].classes.split(" ");
            Array.prototype.push.apply(n, a);
          }
          i[e].push(n.join(" "));
        }
      }
      return i;
    },
    /**
     *Calculates the number of hidden columns
     *
     */
    hiddenColumns() {
      const i = {};
      for (let e = 0; e < this.visibleRowIndexes.length; e++) {
        let t = 0;
        const s = this.visibleRowIndexes[e];
        for (let l = 0; l < this.hiddenBreakpoints.length; l++) {
          let n = this.hiddenBreakpoints[l];
          for (let o = 0; o < this.configFinal.columns.length; o++) {
            let a = this.configFinal.columns[o];
            if (!(this.configFinal.hiddenCols[o] || !this.configFinal.ignoreEmpty[o] && this.configFinal.hideEmptyColumns && (this.isColEmpty(o) || this.isColEmpty(o, s)) || this.emptyColumns[o]) && a.breakpoint && (a.breakpoint.toLocaleLowerCase() === "all" || a.breakpoint.toLocaleLowerCase() === n)) {
              t++;
              break;
            }
          }
        }
        i[s] = t;
      }
      return i;
    },
    /**
     * Calculates the actual rows which shall be used.
     *
     */
    rowsFinal() {
      return this.configFinal.ajaxUrl ? this.ajaxRows : this.rows ? this.rows : [];
    },
    /**
     * Checks if some rows are selected
     *
     */
    someSelected() {
      return Object.values(this.selected).filter((i) => i).length > 0;
    },
    /**
     * Calculates the number of active sorts
     *
     */
    numberOfSorts() {
      return Object.keys(this.currentSortIndexes).length;
    },
    /**
     * Calculates the actual visible pagination options to sort out options which are bigger than number of rows
     *
     */
    paginationOptionsFilled() {
      return (this.configFinal.disallowAllOption ? [] : ["All"]).concat(this.paginationOptions);
    },
    /**
     * Calculates columns which can be sorted from config value
     *
     */
    sortingColumns() {
      let i = {};
      for (let e in this.currentSortIndexes)
        Object.prototype.hasOwnProperty.call(this.currentSortIndexes, e) && (i[e] = this.configFinal.columns[e]);
      return i;
    },
    /**
     * Calculates the classes of every table header
     *
     */
    headerClass() {
      let i = [];
      for (let e = 0; e < this.configFinal.number; e++) {
        let t = [];
        this.configFinal.alignments[e] && t.push("text-" + this.configFinal.alignments[e]), this.configFinal.sorts[e] && (t.push("sort-header"), this.currentSortIndexes[e] && t.push("active")), i.push(
          t.join(" ") + "  quintable--table-container--table--header-row--th " + this.configFinal.columnClasses[e]
        );
      }
      return i;
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
      return this.ajaxPages ? this.ajaxPages : !this.currentRowsPerPage || this.currentRowsPerPage === "All" ? 1 : Math.max(
        1,
        Math.ceil(this.numberOfVisibleRows / this.currentRowsPerPage)
      );
    },
    /**
     * Calculates the number of visible Rows without paging;
     *
     */
    numberOfVisibleRows() {
      return this.configFinal.ajaxUrl ? this.ajaxAll : this.filteredRows.filter((i) => i).length;
    },
    /**
     * Calculates all accessible pages regarding to page range and current page
     *
     */
    visiblePages() {
      let i = [], e = 0;
      if (this.pages < this.pageRange || this.currentPage === 1)
        e = 1;
      else if (this.currentPage === this.pages)
        e = this.currentPage - (this.pageRange - 1);
      else {
        let t;
        this.pageRange % 2 === 0 ? t = this.pageRange / 2 : (t = (this.pageRange - 1) / 2, this.currentPage + t > this.pages && t++), e = this.currentPage - t;
      }
      e = Math.max(e + this.pageOffset, 1);
      for (let t = 0; t < this.pageRange && !(t + e > this.pages); t++)
        i.push(t + e);
      return i;
    },
    /**
     * Checks if any filter is active
     *
     */
    filterActive() {
      return this.filtersFinal && Object.keys(this.filtersFinal).length;
    },
    /**
     * Calculates all rows which passes the filter and search restrictions
     *
     */
    filteredRows() {
      let i = [];
      if (this.configFinal.ajaxUrl)
        return this.rowsFinal;
      for (let e = 0; e < this.rowsFinal.length; e++)
        i.push(!0);
      if (!this.configFinal.search && !this.filterActive || !this.filterActive && this.configFinal.search && this.query.length < this.configFinal.searchLength)
        return i;
      for (let e = 0; e < this.rowsFinal.length; e++) {
        let t = this.rowsFinal[e].cells ? this.rowsFinal[e].cells : this.rowsFinal[e], s = !1, l = !1;
        if (this.configFinal.search && this.query.length >= this.configFinal.searchLength) {
          for (let n = 0; n < t.length; n++) {
            let o = t[n], a = o.html ? o.html : o.text;
            if (a) {
              if (this.configFinal.useFuzzySearch && ie(
                (a + "").toLowerCase(),
                (this.query + "").toLowerCase()
              ).score > 6) {
                s = !0;
                break;
              }
              if ((a + "").toLowerCase().indexOf((this.query + "").toLowerCase()) !== -1) {
                s = !0;
                break;
              }
            }
          }
          if (t.keywords)
            for (let n = 0; n < t.keywords.length; n++) {
              if (this.configFinal.useFuzzySearch && ie(
                (t.keywords[n] + "").toLowerCase(),
                (this.query + "").toLowerCase()
              ).score > 6) {
                s = !0;
                break;
              }
              if ((t.keywords[n] + "").toLowerCase().indexOf((this.query + "").toLowerCase()) !== -1) {
                s = !0;
                break;
              }
            }
          l = !0;
        }
        if (this.filterActive && !this.rowsFinal[e].filters)
          s = !1;
        else if ((l && s || !l) && this.filterActive) {
          if (this.filterGroups.length)
            s = this.doFiltering(this.rowsFinal[e].filters);
          else {
            let n = {
              items: [],
              relation: this.configFinal.filterRelation
            };
            for (let o in this.filtersFinal)
              Object.prototype.hasOwnProperty.call(this.filtersFinal, o) && n.items.push({ name: o });
            s = this.doFilteringForGroup(
              this.filtersFinal,
              this.rowsFinal[e].filters,
              n
            ), this.DEBUG && console.log("FILTER GROUPS CALCULATED", this.filterGroups);
          }
          this.DEBUG && (console.log(`
`), console.log("ROW " + e, s, this.rowsFinal[e].filters), console.log(`
`));
        }
        i[e] = s;
      }
      return i;
    },
    /**
     * Checks if there are currently no rows visible
     *
     */
    noRows() {
      return !this.numberOfVisibleRows;
    },
    /**
     * Calculates the first visible row for displaying
     *
     */
    firstVisibleRow() {
      return this.currentRowsPerPage === "All" || this.pages === 1 ? 1 : this.currentPage * this.currentRowsPerPage - this.currentRowsPerPage + 1;
    },
    /**
     * Calculates the last visible row for displaying
     *
     */
    lastVisibleRow() {
      return this.currentRowsPerPage === "All" || this.pages === 1 ? this.numberOfVisibleRows : Math.min(
        this.firstVisibleRow + this.currentRowsPerPage - 1,
        this.numberOfVisibleRows
      );
    },
    /**
     * Calculates if something is currently loading via ajax
     *
     */
    ajaxLoading() {
      return this.loading || this.fetching;
    },
    /**
     * Calculates if a headline is to be shown on generated rows
     *
     */
    showHeadlines() {
      let i = [];
      for (let e = 0; e < this.configFinal.number; e++)
        //headline is not empty
        this.configFinal.headlines[e] && //show breakpoints match with set settings
        //no show breakpoint is set
        (!this.configFinal.columns[e].showHeadlineBreakpoint || //show breakpoint is set and the hidden breakpoints contain this breakpoint
        this.configFinal.columns[e].showHeadlineBreakpoint && this.hiddenBreakpoints.findIndex(
          (t) => this.configFinal.columns[e] && t === this.configFinal.columns[e].showHeadlineBreakpoint
        ) !== -1) && //hide breakpoints match with set settings
        //no hide breakpoint is set
        (!this.configFinal.columns[e].hideHeadlineBreakpoint || //hide breakpoint is set and the hidden breakpoints contain this breakpoint
        this.configFinal.columns[e].hideHeadlineBreakpoint && this.hiddenBreakpoints.findIndex(
          (t) => this.configFinal.columns[e] && t === this.configFinal.columns[e].hideHeadlineBreakpoint
        ) === -1) ? i.push(!0) : i.push(!1);
      return i;
    },
    /**
     * Key of filter operator fuctions
     *
     */
    operators() {
      return Object.keys(this.operatorFunctions);
    },
    emptyColumns() {
      const i = {}, e = this.configFinal.ignoreSortEmptyColumns;
      for (let t = 0; t < this.configFinal.number; t++) {
        const s = this.configFinal.ignoreEmpty[t], l = this.configFinal.sorts[t];
        !this.configFinal.hideEmptyColumns || s || e === "none" && l || e === "active" && Object.keys(this.currentSortIndexes).includes(t + "") ? i[t] = !1 : i[t] = this.isColEmpty(t);
      }
      return i;
    },
    filtersFinal() {
      return !this.configFinal.storeState || !this.storedState.filters ? this.filters : this.storedState.filters;
    },
    rowClasses() {
      const i = {};
      for (let e = 0; e < this.visibleRowIndexes.length; e++) {
        const t = this.visibleRowIndexes[e], s = [];
        this.rowsFinal[t].classes && s.push(this.rowsFinal[t].classes), this.hoveredRow === t && s.push(this.configFinal.hoverClass), this.openRows[t] && s.push("row-expanded"), this.hiddenColumns[t] > 0 && !this.openRows[t] && s.push("row-collapsed"), i[t] = s.join(" ");
      }
      return i;
    }
  },
  watch: {
    rowsFinal: {
      handler(i) {
        if (i && i.length)
          for (let e = 0; e < i.length; e++) {
            let t = i[e].cells ? i[e].cells : i[e];
            t.length !== this.config.columns.length && console.error(
              `Row cell count on index ${e} doesn't fit for column config! expected: ${this.config.columns.length}, got: ${t.length}`,
              i[e]
            );
          }
      },
      immediate: !0
    },
    /**
     * Check if some rows should be selected due to an outside change
     *
     */
    preSelectedRows(i) {
      if (i) {
        for (let e = 0; e < this.rowsFinal.length; e++)
          this.$set(this.selected, e, !1);
        if (i && i.length) {
          let e = 0;
          const t = this.configFinal.selectAllRows ? this.rowsFinal.map((s, l) => l) : this.visibleRowIndexes;
          for (let s = 0; s < i.length; s++) {
            const l = i[s].key, n = i[s].value;
            for (let o = 0; o < t.length; o++) {
              const a = t[o];
              this.rowsFinal[a][l] === n && (this.$set(this.selected, a, !0), e++);
            }
          }
          this.configFinal.selectAllRows ? this.allSelectedCustom = e && e === this.rowsFinal.length : this.allSelectedCustom = e && e === this.visibleRows.filter((s) => s).length;
        } else
          this.allSelectedCustom = !1;
      }
    },
    /**
     * Resets page and selects if a filter value is changes
     *
     */
    filters: {
      handler() {
        if (this.configFinal.ajaxUrl) {
          const i = !(this.configFinal.storeState && this.storedState.filters);
          this.pageSort = !1, this.loadViaAjax(i, i, "FILTERS");
        }
        this.pageSort && (this.currentSortIndexes = {}, this.resetSorts(), this.recomputeEssentials()), this.configFinal.storeState && (this.$delete(this.storedState, "filters"), localStorage.setItem(
          `vue-quintable-${this.identifier}-filters`,
          JSON.stringify(this.filtersFinal)
        ));
      },
      deep: !0
    },
    filtersFinal(i) {
      this.$emit("update:filters", i);
    },
    /**
     * Trigger reload current page without changing filter/search/page from outside
     *
     */
    updated(i) {
      this.configFinal.ajaxUrl && (i && i.clear ? this.loadViaAjax(!0, !0, "UPDATED") : i && this.loadViaAjax(!1, !0, "UPDATED"));
    },
    /**
     * Set height of loader if loading is set from outside
     *
     */
    loading() {
      this.loaderHeight = this.$refs["height-wrapper"] ? this.$refs["height-wrapper"].clientHeight : 0;
    },
    /**
     * Reset page and select if filtering/search is active
     *
     */
    filteredRows: {
      handler(i, e) {
        if (JSON.stringify(i) === JSON.stringify(e) || this.configFinal.ajaxUrl)
          return;
        this.currentPage !== 1 ? this.currentPage = 1 : this.resetSelect("filteredRows watcher");
        const t = [];
        for (let s = 0; s < i.length; s++) {
          const l = s.toString();
          i[s] && t.push(
            this.rowsFinal[this.sortedIndexes[l] ? this.sortedIndexes[l] : s]
          );
        }
        this.$emit("filtered:rows", t, "filtered:rows");
      },
      deep: !0,
      immediate: !0
    },
    /**
     * Emits an event if breakpoints are changed
     *
     */
    hiddenBreakpoints(i) {
      this.initBreakpoints || this.$emit("change:breakpoints", i, "change:breakpoints"), this.initBreakpoints = !1;
    },
    /**
     * Emits an event if a row is hovered
     *
     */
    hoveredRow(i) {
      i !== null && this.$emit("hover:row", this.rowsFinal[i], "hover:row");
    },
    /**
     * Resets page and selects if a search query is entered and emits and event
     *
     */
    query(i, e) {
      if (this.lastQuery = e, this.configFinal.ajaxUrl) {
        this.pageSort = !1;
        const t = !(this.configFinal.storeState && this.storedState.query);
        clearTimeout(this.queryAjaxTimeout), this.queryAjaxTimeout = setTimeout(() => {
          this.loadViaAjax(t, t, "QUERY");
        }, this.configFinal.ajaxRequestDelay);
      }
      i.length >= this.configFinal.searchLength && this.lastSearchQueryUpdated !== i ? (this.$emit("update:search", i, "update:search"), this.lastSearchQueryUpdated = i) : this.lastSearchQueryUpdated !== null && (this.lastSearchQueryUpdated = null, this.$emit("update:search", null, "update:search")), this.pageSort && (this.currentSortIndexes = {}, this.resetSorts(), this.recomputeEssentials()), this.configFinal.storeState && (this.$delete(this.storedState, "query"), localStorage.setItem(
        `vue-quintable-${this.identifier}-query`,
        this.query
      ));
    },
    /**
     * Resets page and selects if the number of rows per page is changed and emits and event
     *
     */
    currentRowsPerPage(i) {
      this.$emit("update:rows-per-page", i, "update:rows-per-page");
      const e = !(this.configFinal.storeState && this.storedState["rows-per-page"]);
      if (this.configFinal.storeState && (this.$delete(this.storedState, "rows-per-page"), localStorage.setItem(
        `vue-quintable-${this.identifier}-rows-per-page`,
        this.currentRowsPerPage
      )), this.configFinal.ajaxUrl) {
        this.loadViaAjax(e, e, "PAGE_ROWS");
        return;
      }
      this.currentPage !== 1 ? this.currentPage = 1 : this.configFinal.selectAllRows || this.resetSelect("currentRowsPerPage watcher");
    },
    /**
     * Reset everything if rows have been changed (e.g. [re]loaded via ajax)
     *
     */
    rows() {
      this.clearLists(), this.initLists(), this.$nextTick(() => {
        this.recomputeEssentials(), this.$forceUpdate(), this.configFinal.defaultSelected && (this.allSelectedCustom = null, this.checkAll(!0));
      });
    },
    /**
     * Reset everything if config has been changed (e.g. [re]loaded via ajax)
     *
     */
    config(i) {
      if (typeof i != "object")
        throw "config must be an object";
      this.dynamicConfig || (this.initLists(), this.$forceUpdate(), this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "CONFIG"), this.configFinal.defaultSelected && this.checkAll(!0));
    },
    /**
     * Prepare the selected rows array for passing to the event and emits it
     *
     */
    selected: {
      handler(i) {
        let e = [];
        for (let t in this.sortedIndexes)
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, t) && i[this.sortedIndexes[t]]) {
            const s = this.rowsFinal[this.sortedIndexes[t]];
            s.disableSelect || e.push(s);
          }
        this.configFinal.storeState && localStorage.setItem(
          `vue-quintable-${this.identifier}-selected-rows`,
          JSON.stringify(i)
        ), this.$emit("input", e), this.$emit("update:selected-rows", e);
      },
      deep: !0
    },
    /**
     * Resets the row selection if page has been changed and emits an event
     *
     */
    currentPage(i) {
      this.pageOffset = 0, this.$emit("update:page", i, "update:page");
      const e = !(this.configFinal.storeState && this.storedState["current-page"]);
      if (this.configFinal.storeState && (this.$delete(this.storedState, "current-page"), localStorage.setItem(
        `vue-quintable-${this.identifier}-current-page`,
        this.currentPage
      )), this.configFinal.ajaxUrl) {
        this.resetSelect("currentPage watcher ajax"), this.loadViaAjax(!1, e, "PAGE");
        return;
      }
      this.configFinal.selectAllRows || this.resetSelect("currentPage watcher"), this.pageSort && (this.currentSortIndexes = {}, this.resetSorts()), this.recomputeEssentials();
    },
    /**
     *  Reorder the indexes of sorting if a sort column has been removed (e.g. column 1,2,3 are active, 2 has been removed, 3 has to be 2 now)
     *
     */
    customMultiSort(i) {
      if (!i && Object.keys(this.currentSortIndexes).length > 1) {
        let e, t;
        for (let s in this.currentSortIndexes)
          if (Object.prototype.hasOwnProperty.call(
            this.currentSortIndexes,
            s
          ) && this.currentSortIndexes[s].order === 0) {
            e = this.currentSortIndexes[s], t = s;
            break;
          }
        this.currentSortIndexes = {}, this.$set(this.currentSortIndexes, t, e), this.sort();
      }
    },
    /**
     * Reset sort order on page sort change
     *
     */
    pageSort() {
      this.currentSortIndexes = {}, this.resetSorts(), this.recomputeEssentials();
    },
    /**
     * Reset sort order if it is changed from outside
     *
     */
    sortOrder: {
      immediate: !0,
      handler() {
        this.currentSortIndexes = {};
        for (let i = 0; i < this.sortOrder.length; i++)
          typeof this.sortOrder[i] == "object" ? this.setSortColumn(this.sortOrder[i].index, this.sortOrder[i].asc) : typeof this.sortOrder[i] == "number" && this.setSortColumn(this.sortOrder[i]);
      }
    }
  },
  methods: {
    /**
     * sets search query from outside (search slot)
     *
     */
    setSearchQuery(i) {
      this.query = i;
    },
    /**
     * just a small string casting function
     *
     */
    valueToString: function(i) {
      switch (i) {
        case "":
        case null:
        case !1:
        case void 0:
          return "";
        case 0:
        case "0":
        default:
          return String(i);
      }
    },
    /**
     * checks if the passed cell is empty for one or all rows
     *
     */
    isColEmpty(i, e = -1) {
      return (e > -1 ? [e] : this.visibleRowIndexes).map((l) => this.rowsFinal[l]).filter((l) => {
        const n = l.cells ? l.cells : l;
        return typeof n[i].isEmpty == "boolean" && n[i].isEmpty === !0 ? !1 : !!(typeof n[i].isEmpty == "boolean" && n[i].isEmpty === !1 || typeof n[i].text != "undefined" && this.valueToString(n[i].text) || typeof n[i].html != "undefined" && this.valueToString(n[i].html));
      }).length <= 0;
    },
    /**
     * Handler for generic component events
     *
     */
    handleComponentEvent(i) {
      this.$emit("component:event", i, "component:event");
    },
    /**
     * Calculate which pages should be displayed in pagination due to page offset
     *
     */
    updatePageOffset(i) {
      let e = this.pageOffset + this.pageRange * i;
      if (i > 0) {
        let t = Math.min(e, this.pages - this.pageRange);
        this.pageOffset = Math.min(t, this.pages - this.currentPage);
      } else
        i < 0 ? this.pageOffset = Math.max(e, -(this.pages - this.pageRange)) : this.pageOffset = 0;
    },
    cellFormatters(i, e) {
      if (typeof this.configFinal.columns[i].cellFormatter == "function") {
        let t = this.configFinal.columns[i].cellFormatter(e);
        return typeof t != "object" && (t = {
          value: t
        }), t;
      }
      return this.valueToString(e.html) ? e.html : this.valueToString(e.text) ? e.text : "";
    },
    /**
     * Event listener for select row checkboxes. Checks if all rows are selected now and sets the allSelectedProperty in case
     *
     * @param bool selected or not
     * @param index index of selected row
     */
    checkListener(i, e) {
      let t = Object.keys(this.selected).slice().map((s) => !!this.selected[s] || !!(this.rowsFinal[parseInt(s)] && this.rowsFinal[parseInt(s)].disableSelect));
      t[e] = !!i, this.configFinal.selectAllRows ? t.indexOf(!1) === -1 ? this.allSelectedProperty = !0 : this.allSelectedProperty = !1 : (t = t.filter((s, l) => this.visibleRowIndexes.includes(l)), t.indexOf(!1) !== -1 ? this.allSelectedProperty = !1 : t.indexOf(!1) === -1 && (this.allSelectedProperty = !0));
    },
    /**
     * Check if a parent with certain class exists
     *
     */
    hasSomeParentTheClass(i, e) {
      return i instanceof HTMLElement && i.classList.contains(e) ? !0 : i instanceof Element && i.parentNode && this.hasSomeParentTheClass(i.parentNode, e);
    },
    /**
     * Check if a parent with certain tag name exists
     *
     */
    hasSomeParentTagName(i, e) {
      return i instanceof HTMLElement && i.tagName.toLowerCase() === e.toLowerCase() ? !0 : i instanceof Element && i.parentNode && this.hasSomeParentTagName(i.parentNode, e);
    },
    /**
     * Event listener for clicked row. Emits an event if the row has been expanded or collapsed. Emits and event that row was clicked
     *
     * @param e Click Event
     * @param rowIndex Index of clicked row
     */
    onRowClick(i, e) {
      if ((i.target || {}).type === "checkbox")
        return;
      if (this.hasSomeParentTheClass(i.target, "generated-table") && !this.nested)
        return;
      let t = this.hasSomeParentTagName(i.target, "a"), s = this.hasSomeParentTheClass(
        i.target,
        "prevent-toggle"
      );
      const l = e.toString(), n = parseInt(e);
      this.hiddenColumns[l] && !t && !s && (this.openRows[l] ? (this.$set(this.openRows, l, !1), this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[l]],
        "collapse:row"
      )) : (this.$set(this.openRows, l, !0), this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[l]],
        "expand:row"
      )), this.generatedUpdatedKey = Date.now()), this.$emit("click:row", this.rowsFinal[n], "click:row", i.target, i);
    },
    /**
     *
     * @param e
     * @param cell
     */
    onCellClick(i, e) {
      this.$emit("click:cell", e, "click:cell", i.target, i);
    },
    /**
     * Event listener for hovered row. Sets the hoveredRow data entry
     *
     * @param index Index of hovered row
     */
    onMouseenterRow(i) {
      this.hoveredRow !== i && (this.hoveredRow = i);
    },
    /**
     * Event listener for mouse leave of table body. Releases the hoveredRow data entry
     *
     */
    onMouseleaveTable() {
      this.hoveredRow = null;
    },
    /**
     *
     *
     * @param index Index of removed sorting column
     */
    removeSort(i) {
      for (let e in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, e)) {
          let t = this.currentSortIndexes[e];
          t.order > this.currentSortIndexes[i].order && t.order--, this.$set(this.currentSortIndexes, e, t);
        }
      this.$delete(this.currentSortIndexes, i), this.numberOfSorts === 0 ? (this.resetSorts(), this.currentPage !== 1 ? this.currentPage = 1 : this.recomputeEssentials(), this.configFinal.ajaxUrl && !this.pageSort && this.loadViaAjax(!0, !0, "SORT")) : this.sort();
    },
    resetSorts() {
      for (let i = 0; i < this.rowsFinal.length; i++) {
        const e = i.toString();
        this.$set(this.sortedIndexes, e, i);
      }
    },
    /**
     * Select all relevant rows
     *
     */
    checkAll(i = !1) {
      let e = this.allSelectedProperty;
      i && (e = !0);
      let t = 0;
      for (let s in this.sortedIndexes)
        Object.prototype.hasOwnProperty.call(this.sortedIndexes, s) && (s = parseInt(s), !this.configFinal.selectAllRows && this.visibleRows[this.sortedIndexes[s]] || this.configFinal.selectAllRows && this.filteredRows[this.sortedIndexes[s]] ? (this.$set(this.selected, this.sortedIndexes[s], e), t++) : this.$set(this.selected, this.sortedIndexes[s], !1));
      e && (this.configFinal.selectAllRows ? this.allSelectedCustom = t && t === this.rowsFinal.length : this.allSelectedCustom = t && t === this.visibleRows.filter((s) => s).length);
    },
    /**
     * Do the filtering for all rows against all groups
     *
     * @param filterValues the set filter keys and values
     *
     * @returns {boolean}
     */
    doFiltering(i) {
      let e = [];
      for (let t = 0; t < this.filterGroups.length; t++)
        e.push(
          this.doFilteringForGroup(
            this.filtersFinal,
            i,
            this.filterGroups[t]
          )
        ), this.DEBUG && t < this.filterGroups.length - 1 && console.log(this.configFinal.filterGroupRelation);
      return this.DEBUG && console.log(
        "RESULTS FOR GROUPS:",
        e,
        this.configFinal.filterGroupRelation
      ), this.configFinal.filterGroupRelation === "AND" ? e.indexOf(!1) === -1 : this.configFinal.filterGroupRelation === "OR" ? e.indexOf(!0) !== -1 : !0;
    },
    /**
     * Do the actual filtering for a row against a cetrain group
     *
     * @param filters the set filter keys and values
     * @param filterValues the filter values of one row
     * @param group the actual filter group
     * @param index just a counter
     *
     * @returns {boolean}
     */
    doFilteringForGroup(i, e, t, s = 0) {
      let l = "   ";
      for (let o = 0; o < s; o++)
        l += "   ";
      if (this.DEBUG) {
        if (t.items) {
          let o = l, a = t.items.slice(), r = function(c, u) {
            return c.name === void 0 ? 1 : u.name === void 0 ? -1 : 0;
          };
          a = a.sort(r);
          for (let c = 0; c < a.length; c++)
            a[c].name && (o += a[c].name, c < a.length - 1 && (o += " " + t.relation + " "));
          console.log(o);
        }
        console.log(l, "GROUP:", t);
      }
      let n = !1;
      if (t.relation === "AND") {
        for (let o in i)
          if (Object.prototype.hasOwnProperty.call(i, o)) {
            if (this.filterGroups.length && !this.findInFilterGroups(o, this.filterGroups))
              continue;
            let a = !0;
            for (let r = 0; r < t.items.length; r++) {
              let c = t.items[r];
              if (c.name && e[c.name] === void 0) {
                a = !1;
                break;
              }
            }
            if (a)
              for (let r = 0; r < t.items.length; r++) {
                let c = t.items[r];
                if (n = !0, c.items && (n = this.doFilteringForGroup(
                  i,
                  e,
                  c,
                  s + 1
                )), !n)
                  break;
                if (typeof i[c.name] == "undefined")
                  continue;
                let u = typeof i[c.name] == "object" && i[c.name] !== null && i[c.name].operator && this.operators.includes(i[c.name].operator) ? i[c.name].operator : this.defaultOperator, f = this.getFilterValues(i[c.name]);
                const d = typeof i[c.name].compare == "function" ? i[c.name].compare : this.operatorFunctions[u];
                for (let g = 0; g < f.length; g++)
                  if (!d(
                    f[g],
                    e[c.name]
                  )) {
                    n = !1;
                    break;
                  }
                if (!n)
                  break;
              }
          }
        return n;
      } else if (t.relation === "OR" || t.items) {
        for (let o in i)
          if (Object.prototype.hasOwnProperty.call(i, o)) {
            if (this.filterGroups.length && !this.findInFilterGroups(o, this.filterGroups))
              continue;
            for (let a = 0; a < t.items.length; a++) {
              let r = t.items[a];
              if (r.items && (n = this.doFilteringForGroup(
                i,
                e,
                r,
                s + 1
              ), n))
                break;
              if (typeof i[r.name] == "undefined")
                continue;
              let c = typeof i[r.name] == "object" && i[r.name] !== null && i[r.name].operator && this.operators.includes(i[r.name].operator) ? i[r.name].operator : this.defaultOperator, u = this.getFilterValues(i[r.name]);
              const f = typeof i[r.name].compare == "function" ? i[r.name].compare : this.operatorFunctions[c];
              for (let d = 0; d < u.length; d++)
                if (f(
                  u[d],
                  e[r.name]
                )) {
                  n = !0;
                  break;
                }
              if (n)
                break;
            }
          }
        return n;
      } else
        return !0;
    },
    /**
     *
     * Helper method to calculate an array of filter values from value/array/object
     *
     */
    getFilterValues(i) {
      return i instanceof RegExp || typeof i != "object" || i === null ? [i] : Array.isArray(i) ? i : this.getFilterValues(i.values);
    },
    /**
     * Search a certain filter key in a filter group
     *
     * @param key the filter key
     * @param arr the group
     * @param index just a counter
     * @returns {boolean}
     */
    findInFilterGroups(i, e, t = 0) {
      if (!e)
        return !1;
      let s = !1;
      for (let l = 0; l < e.length; l++) {
        let n = e[l];
        if (n.items && (s = this.findInFilterGroups(i, n.items, t + 1), s))
          break;
        if (n.name === i) {
          s = !0;
          break;
        }
      }
      return s;
    },
    /**
     * Change page with certain value
     *
     * @param page
     */
    gotoPage(i) {
      i === "prev" ? this.currentPage - 1 > 0 && this.currentPage-- : i === "next" ? this.currentPage + 1 <= this.pages && this.currentPage++ : i === "first" ? this.currentPage = 1 : i === "last" ? this.currentPage = this.pages : this.currentPage = i;
    },
    /**
     * Add a column to the sorting or change the sort direction of set sorting column
     *
     * @param index the column
     * @param asc bool if it shall be set to a direction
     */
    setSortColumn(i, e) {
      const t = parseInt(i), s = i.toString();
      if (!this.configFinal.sorts[t])
        return;
      let l;
      this.currentSortIndexes[s] ? (l = this.currentSortIndexes[s], l.asc = !l.asc) : (this.multiSort || (this.currentSortIndexes = {}), l = {
        headline: this.configFinal.headlines[t],
        index: t,
        asc: this.configFinal.sorts[t] === !0 ? !0 : this.configFinal.sorts[t] === "ASC",
        order: this.numberOfSorts
      }), typeof e != "undefined" && (l.asc = e), this.$set(this.currentSortIndexes, s, l), this.configFinal.storeState && localStorage.setItem(
        `vue-quintable-${this.identifier}-sort-indexes`,
        JSON.stringify(this.currentSortIndexes)
      ), this.$emit("update:sort", this.currentSortIndexes, "update:sort"), this.sort();
    },
    /**
     * The actual sorting process. Sort by sorting value or the inner text/html of the cells
     *
     */
    sort(i = !1) {
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        this.loadViaAjax(!i, !i, "SORT");
        return;
      }
      let e = this.rowsFinal.slice(), t = [], s = [], l = {};
      if (this.pageSort) {
        if (s = this.visibleRowIndexes.slice(), !s.length) {
          const f = this.configFinal.pagination ? this.configFinal.pagination : this.rowsFinal.length;
          for (let d = 0; d < f; d++)
            s.push(d);
        }
        let u = 0;
        for (let f = 0; f < e.length; f++)
          e[f].index = f, s.indexOf(f) !== -1 && (u < this.configFinal.pagination && t.push(e[f]), u++);
        if (Object.keys(this.sortedIndexes).length)
          l = Object.assign({}, this.sortedIndexes);
        else
          for (let f = 0; f < e.length; f++)
            this.$set(l, f.toString(), f);
      } else {
        t = this.rowsFinal.slice();
        for (let u = 0; u < t.length; u++)
          t[u].index = u;
      }
      let n = [];
      for (let u in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, u)) {
          let f = this.currentSortIndexes[u];
          f.index = u, n.push(f);
        }
      n.sort(function(u, f) {
        return u.order - f.order;
      });
      let o = (u, f, d, g) => {
        g = g || 0;
        let m = d[g], S = m.index, F = u.cells ? u.cells : u, b = f.cells ? f.cells : f, p = typeof F[S].sortValue != "undefined" && F[S].sortValue !== null ? F[S].sortValue : F[S].html ? F[S].html : F[S].text, w = typeof b[S].sortValue != "undefined" && b[S].sortValue !== null ? b[S].sortValue : b[S].html ? b[S].html : b[S].text;
        return typeof p == "string" && (p = p.toLowerCase()), typeof w == "string" && (w = w.toLowerCase()), isNaN(p) ? (typeof p == "string" && p.match(/^-?\d+$/) || typeof p == "string" && p.match(/^\d+\.\d+$/)) && (p = parseFloat(p)) : p = parseFloat(p), isNaN(w) ? (typeof w == "string" && w.match(/^-?\d+$/) || typeof w == "string" && w.match(/^\d+\.\d+$/)) && (w = parseFloat(w)) : w = parseFloat(w), m.asc ? p > w ? 1 : p < w ? -1 : d[g + 1] ? o(u, f, d, g + 1) : 1 : p < w ? 1 : p > w ? -1 : d[g + 1] ? o(u, f, d, g + 1) : -1;
      };
      t.sort(function(u, f) {
        return o(u, f, n);
      });
      const a = [];
      let r = 0, c = 0;
      for (let u = 0; u < e.length; u++) {
        const f = u.toString();
        this.pageSort && s.indexOf(u) !== -1 ? (r < this.configFinal.pagination ? (a.push(t[c]), c++) : a.push(e[l[f]]), r++) : this.pageSort ? a.push(e[l[f]]) : a.push(t[u]);
      }
      for (let u = 0; u < a.length; u++) {
        const f = u.toString();
        this.$set(this.sortedIndexes, f, parseInt(a[u].index));
      }
      !this.pageSort && !i && (this.currentPage = 1), !this.configFinal.selectAllRows && !this.pageSort && !i && this.resetSelect("sort method"), this.recomputeEssentials();
    },
    /**
     * Trigger recomputing of the essential parts of the table to ensure correct displaying
     *
     */
    recomputeEssentials() {
      this.$nextTick(() => {
        this.rowsUpdatedKey = Date.now(), this.indexesUpdatedKey = Date.now(), this.generatedUpdatedKey = Date.now();
      });
    },
    /**
     * Initialize nested object lists
     *
     */
    initLists() {
      if (this.rowsFinal)
        for (let i = 0; i < this.rowsFinal.length; i++) {
          const e = i.toString();
          typeof this.sortedIndexes[e] == "undefined" && this.$set(this.sortedIndexes, e, i), typeof this.selected[e] == "undefined" && this.$set(this.selected, e, !1), this.configFinal.expandedAll || this.rowsFinal[i].expanded ? this.$set(this.openRows, e, !0) : this.$set(this.openRows, e, !1);
        }
    },
    /**
     * Clear all relevant lists to ensure re-initialization
     *
     */
    clearLists(i = !0) {
      i && (this.selected = {}), this.openRows = {}, this.sortedIndexes = {};
    },
    /**
     * Clear all row selections
     *
     */
    resetSelect(i) {
      this.DEBUG && console.log("CALLED FROM:", i), this.allSelectedProperty = !1;
      for (let e = 0; e < this.rowsFinal.length; e++)
        this.$set(this.selected, e, !1);
    },
    /**
     * Load new rows via ajax including filters, search query and pagination
     *
     * @param clear
     * @param accessor
     */
    loadViaAjax(i = !1, e = !0, t = null) {
      this.DEBUG && console.log("CALLED FROM:", t);
      let s = this.query;
      if (s && s.length < this.configFinal.searchLength && (this.lastQuery.length < s.length || this.lastQuery.length < this.configFinal.searchLength))
        return;
      if (!s && this.lastQuery) {
        const o = this.lastQuery;
        if (this.lastQuery = "", o.length < this.configFinal.searchLength)
          return;
      } else
        s && s.length < this.configFinal.searchLength && (s = "");
      this.cancelSource && this.cancelSource.cancel("Operation canceled by the user."), this.clearLists(e), this.ajaxRows = [], i && (this.currentPage = 1, this.resetSelect("loadViaAjax method")), this.loaderHeight = this.$refs["height-wrapper"] ? this.$refs["height-wrapper"].clientHeight : 0, this.fetching = !0;
      let l = {
        search: s,
        filters: this.filtersFinal,
        perPage: this.currentRowsPerPage,
        page: this.currentPage,
        sort: this.numberOfSorts > 0 ? {
          indexes: this.currentSortIndexes,
          columns: this.sortingColumns
        } : null
      };
      this.cancelSource = this.axiosFinal.CancelToken.source();
      const n = {
        "Content-Type": "application/json"
      };
      this.axiosFinal.request(this.configFinal.ajaxUrl, {
        method: this.configFinal.requestMethod,
        params: this.configFinal.requestMethod === "GET" ? l : null,
        data: this.configFinal.requestMethod === "POST" ? l : null,
        cancelToken: this.cancelSource.token,
        headers: n
      }).then((o) => {
        if (!o.data.rows || typeof o.data.rows.length == "undefined")
          throw "Response data has to contain rows property. Please see Readme.md for details";
        if (typeof o.data.all == "undefined")
          throw "Response data has to contain all property. Please see Readme.md for details";
        this.ajaxAll = o.data.all, this.ajaxPages = Math.max(
          1,
          Math.ceil(o.data.all / this.currentRowsPerPage)
        ), this.$emit(
          "ajax:rows",
          {
            rows: o.data.rows,
            old: JSON.parse(JSON.stringify(this.ajaxRows)),
            all: this.ajaxAll
          },
          "ajax:rows"
        ), o.data.all && (this.ajaxRows = o.data.rows, this.initLists()), this.fetching = !1;
      }).catch((o) => {
        this.axiosFinal.isCancel(o) ? console.log("Request canceled", o.message) : (this.fetching = !1, console.error(o), this.$emit("ajax:error", o, "ajax:error"));
      });
    },
    /**
     * Check if DOM element is visible
     *
     * @param el DOMElement
     * @returns {boolean}
     */
    elementVisible(i) {
      return i ? window.getComputedStyle(i).display !== "none" : !1;
    },
    /**
     * Event Listener for window resize event.
     *
     */
    breakpointListener() {
      clearTimeout(this.breakpointTimeout), this.breakpointTimeout = setTimeout(() => {
        this.generateHiddenBreakpoints(!1);
      }, 250);
    },
    /**
     * Generate the list of hidden breakpoints
     *
     * @param regenerate
     */
    generateHiddenBreakpoints(i = !1) {
      i && (this.hiddenBreakpoints = []);
      let e = [];
      this.elementVisible(this.$refs.xxl) || e.push("xxl"), this.elementVisible(this.$refs.xl) || e.push("xl"), this.elementVisible(this.$refs.lg) || e.push("lg"), this.elementVisible(this.$refs.md) || e.push("md"), this.elementVisible(this.$refs.sm) || e.push("sm"), e.push("all"), JSON.stringify(this.hiddenBreakpoints) !== JSON.stringify(e) && (this.hiddenBreakpoints = e);
    },
    checkStoredSelectedRows(i = !1) {
      if (this.storedState["pre-selected-rows"], this.storedState["selected-rows"]) {
        this.selected = JSON.parse(
          JSON.stringify(this.storedState["selected-rows"])
        );
        const e = Object.values(this.selected).filter((t) => t).length;
        this.configFinal.selectAllRows ? this.allSelectedCustom = e && e === this.rowsFinal.length : this.allSelectedCustom = e && e === this.visibleRows.filter((t) => t).length, i && this.$delete(this.storedState, "selected-rows");
      }
    }
  },
  created() {
    if (this.configFinal.storeState) {
      const t = localStorage.getItem(
        `vue-quintable-${this.identifier}-filters`
      );
      if (t) {
        const r = JSON.parse(t);
        for (let c in this.filters)
          Object.prototype.hasOwnProperty.call(this.filters, c) && !Object.prototype.hasOwnProperty.call(r, c) && (r[c] = this.filters[c]);
        this.$set(this.storedState, "filters", r);
      }
      const s = localStorage.getItem(
        `vue-quintable-${this.identifier}-query`
      );
      s && this.$set(this.storedState, "query", s);
      const l = localStorage.getItem(
        `vue-quintable-${this.identifier}-rows-per-page`
      );
      l && this.$set(this.storedState, "rows-per-page", parseInt(l));
      const n = localStorage.getItem(
        `vue-quintable-${this.identifier}-selected-rows`
      );
      n && this.$set(this.storedState, "selected-rows", JSON.parse(n));
      const o = localStorage.getItem(
        `vue-quintable-${this.identifier}-current-page`
      );
      o && this.$set(this.storedState, "current-page", parseInt(o));
      const a = localStorage.getItem(
        `vue-quintable-${this.identifier}-sort-indexes`
      );
      a && this.$set(this.storedState, "sort-indexes", JSON.parse(a));
    }
    this.initLists();
    let i = 0;
    const e = this.configFinal.selectAllRows ? this.rowsFinal.map((t, s) => s) : this.visibleRowIndexes;
    for (let t = 0; t < e.length; t++) {
      let s = this.rowsFinal[t];
      s.selected && this.$set(this.selected, t, !0), (s.selected || s.disableSelect) && i++;
    }
    !this.configFinal.selectAllRows && i && i === this.visibleRows.filter((t) => t).length ? this.allSelectedCustom = !0 : this.configFinal.selectAllRows && i && i === this.rowsFinal.length && (this.allSelectedCustom = !0), this.initialSearchTerm && (this.query = this.initialSearchTerm), this.storedState.query && (this.query = this.storedState.query), this.storedState["rows-per-page"] && (this.customRowsPerPage = this.storedState["rows-per-page"]), this.storedState["sort-indexes"] && (this.currentSortIndexes = this.storedState["sort-indexes"], this.sort(!0)), this.storedState["current-page"] && this.$nextTick(() => {
      this.currentPage = this.storedState["current-page"];
    }), this.$nextTick(this.checkStoredSelectedRows);
  },
  mounted() {
    this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "MOUNTED"), this.configFinal.defaultSelected && this.checkAll(!0), this.generateHiddenBreakpoints(), window.addEventListener("resize", this.breakpointListener);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.breakpointListener);
  }
};
var He = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "table-wrapper quintable" }, [t("div", { staticClass: "breakpoints quintable--breakpoints" }, [t("div", { ref: "xs" }), t("div", { ref: "sm", staticClass: "d-none d-sm-block" }), t("div", { ref: "md", staticClass: "d-none d-md-block" }), t("div", { ref: "lg", staticClass: "d-none d-lg-block" }), t("div", { ref: "xl", staticClass: "d-none d-xl-block" }), t("div", { ref: "xxl", staticClass: "d-none d-xxl-block" })]), t("div", { staticClass: "header slot slot-header quintable--header" }, [e._t("header")], 2), e.configFinal.search ? t("div", { staticClass: "mb-3 quintable--search-container", class: e.configFinal.searchContainerClass }, [e._t("before-search"), e._t("search", function() {
    return [t("div", { staticClass: "quintable--search-container--input-container", class: e.configFinal.searchClass }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: e.query, expression: "query" }], staticClass: "form-control", attrs: { type: "search", placeholder: e.configFinal.searchPlaceholder }, domProps: { value: e.query }, on: { input: function(s) {
      s.target.composing || (e.query = s.target.value);
    } } })])];
  }, { value: e.query, loading: e.loading, setSearchQuery: e.setSearchQuery, placeholder: e.configFinal.searchPlaceholder, searchClass: e.configFinal.searchClass }), e._t("after-search")], 2) : e._e(), t("div", { staticClass: "slot slot-after-search quintable--after-search-container" }, [e._t("after-search-container")], 2), t("div", { ref: "height-wrapper", staticClass: "clearfix quintable--table-container" }, [e.ajaxLoading ? e._e() : t("table", { staticClass: "vue-quintable table quintable--table-container--table", class: e.tableClasses }, [e.configFinal.headlines.length ? t("thead", [t("tr", { staticClass: "vue-quintable-header-row quintable--table-container--table--header-row" }, [e.hasGeneratedRows && !e.configFinal.hideRowToggle ? t("th", { staticClass: "placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th" }, [t("wbr")]) : e._e(), e.configFinal.select && e.configFinal.selectPosition === "pre" ? t("th", { staticClass: "select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre" }, [e.configFinal.selectAll && !e.noRows ? [e.configFinal.prettySelect ? t("p-check", { staticClass: "p-icon p-smooth", attrs: { name: "check" }, on: { change: function(s) {
    return e.checkAll();
  } }, model: { value: e.allSelectedProperty, callback: function(s) {
    e.allSelectedProperty = s;
  }, expression: "allSelectedProperty" } }, [t("template", { slot: "extra" }, [t("span", [e.allSelectedProperty ? t("font-awesome-icon", { staticClass: "text-success icon-check", attrs: { icon: "check" } }) : e._e()], 1), t("span", [e.someSelected && !e.allSelectedProperty ? t("font-awesome-icon", { staticClass: "text-success icon-check", attrs: { icon: "square" } }) : e._e()], 1)])], 2) : t("label", { staticClass: "mb-0 mt-0" }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: e.allSelectedProperty, expression: "allSelectedProperty" }], attrs: { type: "checkbox" }, domProps: { checked: Array.isArray(e.allSelectedProperty) ? e._i(e.allSelectedProperty, null) > -1 : e.allSelectedProperty }, on: { change: [function(s) {
    var l = e.allSelectedProperty, n = s.target, o = !!n.checked;
    if (Array.isArray(l)) {
      var a = null, r = e._i(l, a);
      n.checked ? r < 0 && (e.allSelectedProperty = l.concat([a])) : r > -1 && (e.allSelectedProperty = l.slice(0, r).concat(l.slice(r + 1)));
    } else
      e.allSelectedProperty = o;
  }, function(s) {
    return e.checkAll();
  }] } })])] : e._e()], 2) : e._e(), e._l(e.configFinal.headlines, function(s, l) {
    return [(e.configFinal.columns[l] && !e.configFinal.columns[l].breakpoint || e.hiddenBreakpoints.findIndex(
      (n) => e.configFinal.columns[l] && n === e.configFinal.columns[l].breakpoint
    ) === -1) && !e.configFinal.columns[l].sticky && !e.configFinal.hiddenCols[l] && !e.emptyColumns[l] ? t("th", { key: "headline-" + l, class: e.headerClass[l], attrs: { title: e.configFinal.columns[l].title }, on: { click: function(n) {
      return e.setSortColumn(l);
    } } }, [e.showHeadlines[l] ? t("span", { staticClass: "headline quintable--table-container--table--header-row--th--headline", domProps: { innerHTML: e._s(s) } }) : t("span", { staticClass: "headline quintable--table-container--table--header-row--th--headline" }, [t("wbr")]), e.configFinal.sorts[l] ? t("span", { staticClass: "sorting-icon ms-2 quintable--table-container--table--header-row--th--sorting-icon" }, [e.currentSortIndexes[l] ? e._e() : t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort" } }), e.currentSortIndexes[l] && e.currentSortIndexes[l].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down-alt" } }) : e._e(), e.currentSortIndexes[l] && !e.currentSortIndexes[l].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down" } }) : e._e(), e.currentSortIndexes[l] ? t("span", { staticClass: "ms-1 text-muted", on: { click: function(n) {
      return n.stopPropagation(), n.preventDefault(), e.removeSort(l);
    } } }, [e.numberOfSorts > 1 ? t("span", { staticClass: "badge bg-info text-white" }, [e._v(" " + e._s(e.currentSortIndexes[l].order + 1) + " ")]) : t("small", [t("font-awesome-icon", { attrs: { icon: "times" } })], 1)]) : e._e()], 1) : e._e()]) : e._e()];
  }), e.configFinal.select && e.configFinal.selectPosition === "post" ? t("th", { staticClass: "select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post" }, [e.configFinal.selectAll && !e.noRows ? [e.configFinal.prettySelect ? t("p-check", { staticClass: "p-icon p-smooth", attrs: { name: "check" }, on: { change: function(s) {
    return e.checkAll();
  } }, model: { value: e.allSelectedProperty, callback: function(s) {
    e.allSelectedProperty = s;
  }, expression: "allSelectedProperty" } }, [t("template", { slot: "extra" }, [t("span", [e.allSelectedProperty ? t("font-awesome-icon", { staticClass: "text-success icon-check", attrs: { icon: "check" } }) : e._e()], 1), t("span", [e.someSelected && !e.allSelectedProperty ? t("font-awesome-icon", { staticClass: "text-success icon-check", attrs: { icon: "square" } }) : e._e()], 1)])], 2) : t("label", { staticClass: "mb-0 mt-0" }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: e.allSelectedProperty, expression: "allSelectedProperty" }], attrs: { type: "checkbox" }, domProps: { checked: Array.isArray(e.allSelectedProperty) ? e._i(e.allSelectedProperty, null) > -1 : e.allSelectedProperty }, on: { change: [function(s) {
    var l = e.allSelectedProperty, n = s.target, o = !!n.checked;
    if (Array.isArray(l)) {
      var a = null, r = e._i(l, a);
      n.checked ? r < 0 && (e.allSelectedProperty = l.concat([a])) : r > -1 && (e.allSelectedProperty = l.slice(0, r).concat(l.slice(r + 1)));
    } else
      e.allSelectedProperty = o;
  }, function(s) {
    return e.checkAll();
  }] } })])] : e._e()], 2) : e._e()], 2)]) : e._e(), t("tbody", { staticClass: "quintable--table-container--table--tbody", on: { mouseleave: e.onMouseleaveTable } }, [e._l(e.visibleRowIndexes, function(s) {
    return [t("tr", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
      placement: "top",
      content: e.rowsFinal[s].tooltip,
      trigger: e.rowsFinal[s].tooltip ? "hover" : "manual",
      offset: 5
    }, expression: `{
              placement: 'top',
              content: rowsFinal[rIndex].tooltip,
              trigger: rowsFinal[rIndex].tooltip ? 'hover' : 'manual',
              offset: 5,
            }` }], key: "vue-quintable-" + e.uuid + "-row-" + s + "-" + e.indexesUpdatedKey, ref: "row-highlighted-on-hover-" + s, refInFor: !0, staticClass: "vue-quintable-row quintable--table-container--table--tbody--row", class: e.rowClasses[s], style: e.hiddenColumns[s] > 0 ? "cursor:pointer;" : "", attrs: { id: "vue-quintable-" + e.uuid + "-row-" + s }, on: { click: function(l) {
      return e.onRowClick(l, s);
    }, mouseenter: function(l) {
      return e.onMouseenterRow(s);
    } } }, [e.hasGeneratedRows && !e.configFinal.hideRowToggle ? t("td", { staticClass: "toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td" }, [e.hiddenColumns[s] > 0 ? t("span", [e.openRows[s] ? t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.configFinal.expandedRowIcon } })], 1) : t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.configFinal.collapsedRowIcon } })], 1)]) : e._e()]) : e._e(), e.configFinal.select && e.configFinal.selectPosition === "pre" ? t("td", { staticClass: "select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre", class: { "disabled-select": e.rowsFinal[s].disableSelect } }, [e.rowsFinal[s].disableSelect ? e._e() : [e.configFinal.prettySelect ? t("p-check", { staticClass: "p-icon", attrs: { name: "check" }, on: { change: function(l) {
      return e.checkListener(l, s);
    } }, model: { value: e.selected[s], callback: function(l) {
      e.$set(e.selected, s, l);
    }, expression: "selected[rIndex]" } }, [t("template", { slot: "extra" }, [t("span", [e.selected[s] ? t("font-awesome-icon", { staticClass: "text-success icon-check", attrs: { icon: "check" } }) : e._e()], 1)])], 2) : t("label", { staticClass: "mb-0 mt-0" }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: e.selected[s], expression: "selected[rIndex]" }], attrs: { type: "checkbox" }, domProps: { checked: Array.isArray(e.selected[s]) ? e._i(e.selected[s], null) > -1 : e.selected[s] }, on: { change: [function(l) {
      var n = e.selected[s], o = l.target, a = !!o.checked;
      if (Array.isArray(n)) {
        var r = null, c = e._i(n, r);
        o.checked ? c < 0 && e.$set(e.selected, s, n.concat([r])) : c > -1 && e.$set(e.selected, s, n.slice(0, c).concat(n.slice(c + 1)));
      } else
        e.$set(e.selected, s, a);
    }, function(l) {
      return e.checkListener(l, s);
    }] } })])]], 2) : e._e(), e._l(e.rowsFinal[s].cells ? e.rowsFinal[s].cells : e.rowsFinal[s], function(l, n) {
      return [!e.configFinal.hiddenCols[n] && !e.emptyColumns[n] && e.configFinal.columns[n] && l && e.hiddenBreakpoints.findIndex(
        (o) => o === e.configFinal.columns[n].breakpoint
      ) === -1 && e.configFinal.columns[n].breakpoint !== "all" && !e.configFinal.stickyCols[n] ? t("td", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
        placement: "left",
        content: l.tooltip,
        trigger: l.tooltip ? "hover" : "manual"
      }, expression: `{
                  placement: 'left',
                  content: cell.tooltip,
                  trigger: cell.tooltip ? 'hover' : 'manual',
                }` }], key: "vue-quintable-" + e.uuid + "-cell-" + s + "-" + n, staticClass: "vue-quintable-cell quintable--table-container--table--tbody--row--cell", class: e.cellClassesParsed[s][n] + " " + e.configFinal.columnClasses[n], attrs: { id: "vue-quintable-" + e.uuid + "-cell-" + s + "-" + n }, on: { click: function(o) {
        return e.onCellClick(o, l);
      } } }, [e._t("cell-complete", function() {
        return [e._t("cell-content", function() {
          return [e.configFinal.columns[n].cellFormatter && e.cellFormatters(n, l).type === "html" ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html", domProps: { innerHTML: e._s(e.cellFormatters(n, l).value) } }) : e.configFinal.columns[n].cellFormatter ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value" }, [e._v(" " + e._s(e.cellFormatters(n, l).value) + " ")]) : e.valueToString(l.html) ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--row--cell--inner-cell--html", domProps: { innerHTML: e._s(l.html) } }) : e._e(), e.valueToString(l.text) ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--row--cell--inner-cell--text" }, [e._v(" " + e._s(l.text) + " ")]) : e._e(), l.component ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--row--cell--inner-cell--component" }, [t(l.component.name, e._b({ tag: "component", on: { action: e.handleComponentEvent } }, "component", l.component.props, !1))], 1) : e._e()];
        }, { cell: l })];
      }, { cell: l })], 2) : e._e()];
    }), e.configFinal.select && e.configFinal.selectPosition === "post" ? t("td", { staticClass: "select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post", class: { "disabled-select": e.rowsFinal[s].disableSelect } }, [e.rowsFinal[s].disableSelect ? e._e() : [e.configFinal.prettySelect ? t("p-check", { staticClass: "p-icon", attrs: { name: "check" }, on: { change: function(l) {
      return e.checkListener(l, s);
    } }, model: { value: e.selected[s], callback: function(l) {
      e.$set(e.selected, s, l);
    }, expression: "selected[rIndex]" } }, [t("template", { slot: "extra" }, [t("span", [e.selected[s] ? t("font-awesome-icon", { staticClass: "text-success icon-check", attrs: { icon: "check" } }) : e._e()], 1)])], 2) : t("label", { staticClass: "mb-0 mt-0" }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: e.selected[s], expression: "selected[rIndex]" }], attrs: { type: "checkbox" }, domProps: { checked: Array.isArray(e.selected[s]) ? e._i(e.selected[s], null) > -1 : e.selected[s] }, on: { change: [function(l) {
      var n = e.selected[s], o = l.target, a = !!o.checked;
      if (Array.isArray(n)) {
        var r = null, c = e._i(n, r);
        o.checked ? c < 0 && e.$set(e.selected, s, n.concat([r])) : c > -1 && e.$set(e.selected, s, n.slice(0, c).concat(n.slice(c + 1)));
      } else
        e.$set(e.selected, s, a);
    }, function(l) {
      return e.checkListener(l, s);
    }] } })])]], 2) : e._e()], 2), (e.generatedRows[s] || e.stickyRows[s]) && e.visibleRows[s] ? [e.generatedUpdatedKey && e.openRows[s] && Object.keys(e.generatedRows[s]).length || Object.keys(e.stickyRows[s]).length ? t("tr", { key: "generated-row-" + s + "-" + e.rowsUpdatedKey + "-" + e.generatedUpdatedKey, ref: "generated-row-highlighted-on-hover-" + s, refInFor: !0, staticClass: "generated-row quintable--table-container--table--tbody--generated-row", class: {
      "parent-row-expanded": e.openRows[s],
      "parent-row-collapsed": e.hiddenColumns[s] > 0 && !e.openRows[s]
    }, on: { mouseenter: function(l) {
      return e.onMouseenterRow(s);
    }, click: function(l) {
      return e.onRowClick(l, s);
    } } }, [t("td", { staticClass: "ps-0 pe-0 pt-0", attrs: { colspan: e.configFinal.number + 1 } }, [t("div", { class: e.hoveredRow === s ? e.configFinal.hoverClass : "" }, [t("table", { staticClass: "mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table" }, [t("tbody", [e._l(e.generatedRows[s], function(l, n) {
      return [e.openRows[s] ? t("tr", { key: "vue-quintable-" + e.uuid + "-generated-row-cell-" + s + "-" + n + "-" + e.generatedUpdatedKey, staticClass: "generated-row-cell quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell", attrs: { id: "vue-quintable-" + e.uuid + "-generated-row-cell-" + s + "-" + n } }, [!e.configFinal.hideRowToggle && e.generatedRows[s] && Object.keys(e.generatedRows[s]).length ? t("td", { staticClass: "toggle-cell invisible" }, [e.hiddenColumns[s] > 0 ? t("span", [e.openRows[s] ? t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.configFinal.expandedRowIcon } })], 1) : t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.configFinal.collapsedRowIcon } })], 1)]) : e._e()]) : e._e(), e.showHeadlines[n] || e.configFinal.sorts[n] ? t("td", { staticClass: "generated-cell-element generated-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline", class: e.configFinal.columnClasses[n], on: { click: function(o) {
        return e.setSortColumn(n);
      } } }, [e.showHeadlines[n] ? t("strong", { domProps: { innerHTML: e._s(e.configFinal.headlines[n]) } }) : t("span", { staticClass: "headline" }, [t("wbr")]), e.configFinal.sorts[n] && e.hoveredRow === s ? t("span", { staticClass: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon" }, [e.currentSortIndexes[n] ? e._e() : t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort" } }), e.currentSortIndexes[n] && e.currentSortIndexes[n].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down-alt" } }) : e._e(), e.currentSortIndexes[n] && !e.currentSortIndexes[n].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down" } }) : e._e(), e.currentSortIndexes[n] ? t("span", { staticClass: "ms-1 text-muted", on: { click: function(o) {
        return o.stopPropagation(), o.preventDefault(), e.removeSort(n);
      } } }, [e.numberOfSorts > 1 ? t("span", { staticClass: "badge bg-info text-white" }, [e._v(" " + e._s(e.currentSortIndexes[n].order + 1) + " ")]) : t("small", [t("font-awesome-icon", { attrs: { icon: "times" } })], 1)]) : e._e()], 1) : e._e()]) : e._e(), t("td", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
        placement: "top",
        content: l.tooltip,
        trigger: l.tooltip ? "hover" : "manual"
      }, expression: `{
                              placement: 'top',
                              content: cell.tooltip,
                              trigger: cell.tooltip ? 'hover' : 'manual',
                            }` }], staticClass: "generated-cell-element generated-cell-element-content generated-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content", class: e.configFinal.columnClasses[n] + " " + e.cellClassesParsed[s][n], attrs: { colspan: !e.showHeadlines[n] && !e.configFinal.sorts[n] ? 2 : 1 }, on: { click: function(o) {
        return e.onCellClick(o, l);
      } } }, [e._t("generated-cell-complete", function() {
        return [e._t("generated-cell-content", function() {
          return [e.configFinal.columns[n].cellFormatter && e.cellFormatters(n, l).type === "html" ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html", domProps: { innerHTML: e._s(e.cellFormatters(n, l).value) } }) : e.configFinal.columns[n].cellFormatter ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value" }, [e._v(" " + e._s(e.cellFormatters(n, l).value) + " ")]) : e.valueToString(l.html) ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html", domProps: { innerHTML: e._s(l.html) } }) : e._e(), e.valueToString(l.text) ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text" }, [e._v(" " + e._s(l.text) + " ")]) : e._e(), l.component ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component" }, [t(l.component.name, e._b({ tag: "component", on: { action: e.handleComponentEvent } }, "component", l.component.props, !1))], 1) : e._e()];
        }, { cell: l })];
      }, { cell: l })], 2)]) : e._e()];
    }), e._l(e.stickyRows[s], function(l, n) {
      return t("tr", { key: "vue-quintable-" + e.uuid + "-sticky-row-cell-" + s + "-" + n, staticClass: "sticky-row-cell quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell", attrs: { id: "vue-quintable-" + e.uuid + "-sticky-row-cell-" + s + "-" + n } }, [!e.configFinal.hideRowToggle && e.generatedRows[s] && Object.keys(e.generatedRows[s]).length ? t("td", { staticClass: "toggle-cell invisible" }, [e.hiddenColumns[s] > 0 ? t("span", [e.openRows[s] ? t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.configFinal.expandedRowIcon } })], 1) : t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.configFinal.collapsedRowIcon } })], 1)]) : e._e()]) : e._e(), e.showHeadlines[n] || e.configFinal.sorts[n] ? t("td", { staticClass: "generated-cell-element sticky-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline", class: e.configFinal.columnClasses[n], on: { click: function(o) {
        return e.setSortColumn(n);
      } } }, [e.showHeadlines[n] ? t("strong", { domProps: { innerHTML: e._s(e.configFinal.headlines[n]) } }) : t("span", { staticClass: "headline" }, [t("wbr")]), e.configFinal.sorts[n] && e.hoveredRow === s ? t("span", { staticClass: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon" }, [e.currentSortIndexes[n] ? e._e() : t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort" } }), e.currentSortIndexes[n] && e.currentSortIndexes[n].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down-alt" } }) : e._e(), e.currentSortIndexes[n] && !e.currentSortIndexes[n].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down" } }) : e._e(), e.currentSortIndexes[n] ? t("span", { staticClass: "ms-1 text-muted", on: { click: function(o) {
        return o.stopPropagation(), o.preventDefault(), e.removeSort(n);
      } } }, [e.numberOfSorts > 1 ? t("span", { staticClass: "badge bg-info text-white" }, [e._v(" " + e._s(e.currentSortIndexes[n].order + 1) + " ")]) : t("small", [t("font-awesome-icon", { attrs: { icon: "times" } })], 1)]) : e._e()], 1) : e._e()]) : e._e(), t("td", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
        placement: "top",
        content: l.tooltip,
        trigger: l.tooltip ? "hover" : "manual"
      }, expression: `{
                            placement: 'top',
                            content: cell.tooltip,
                            trigger: cell.tooltip ? 'hover' : 'manual',
                          }` }], staticClass: "generated-cell-element generated-cell-element-content sticky-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content", class: e.configFinal.columnClasses[n] + " " + e.cellClassesParsed[s][n], attrs: { colspan: !e.showHeadlines[n] && !e.configFinal.sorts[n] ? 2 : 1 }, on: { click: function(o) {
        return e.onCellClick(o, l);
      } } }, [e._t("sticky-cell-complete", function() {
        return [e._t("sticky-cell-content", function() {
          return [e.configFinal.columns[n].cellFormatter && e.cellFormatters(n, l).type === "html" ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html", domProps: { innerHTML: e._s(e.cellFormatters(n, l).value) } }) : e.configFinal.columns[n].cellFormatter ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value" }, [e._v(" " + e._s(e.cellFormatters(n, l).value) + " ")]) : e.valueToString(l.html) ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html", domProps: { innerHTML: e._s(l.html) } }) : e._e(), e.valueToString(l.text) ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text" }, [e._v(" " + e._s(l.text) + " ")]) : e._e(), l.component ? t("div", { staticClass: "cell-inner", class: "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component" }, [t(l.component.name, e._b({ tag: "component", on: { action: e.handleComponentEvent } }, "component", l.component.props, !1))], 1) : e._e()];
        }, { cell: l })];
      }, { cell: l })], 2)]);
    })], 2)])])])]) : e._e()] : e._e()];
  })], 2)]), e.noRows && !e.ajaxLoading ? [t("div", { staticClass: "clearfix slot-no-results slot quintable--table-container--no-results" }, [e._t("no-results", function() {
    return [t("div", { staticClass: "text-center p-3 quintable--table-container--no-results--results" }, [t("em", { domProps: { innerHTML: e._s(e.configFinal.emptyPlaceholder) } })])];
  }), t("hr")], 2)] : e._e()], 2), e.ajaxLoading ? t("div", { staticClass: "slot-loading slot quintable--loading" }, [e._t("loading", function() {
    return [t("div", { staticClass: "loader-wrapper quintable--loading--loader-wrapper", style: "height:" + e.loaderHeight + "px;" }, [t("div", { staticClass: "loader text-center py-4 quintable--loading--loader-wrapper--loader" }, [t("font-awesome-icon", { staticClass: "ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader", attrs: { icon: "circle-notch", spin: "" } })], 1)])];
  })], 2) : e._e(), t("div", { staticClass: "clearfix quintable--table-footer-container" }, [t("div", { staticClass: "row" }, [t("div", { staticClass: "col-lg-4 quintable--table-footer-container--sort-container" }, [e.configFinal.multiSortSelect || e.configFinal.pageSortSelect ? t("div", { staticClass: "pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select" }, [e.configFinal.multiSortSelect ? t("span", { class: e.configFinal.pageSort ? "me-3" : "" }, [t("p-check", { staticClass: "p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select", attrs: { value: "true" }, model: { value: e.multiSort, callback: function(s) {
    e.multiSort = s;
  }, expression: "multiSort" } }, [e._v(e._s(e.configFinal.multiSortPlaceholder))])], 1) : e._e(), e.configFinal.pageSortSelect ? t("p-check", { staticClass: "p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select", attrs: { value: "true" }, model: { value: e.pageSort, callback: function(s) {
    e.pageSort = s;
  }, expression: "pageSort" } }, [e._v(e._s(e.configFinal.pageSortPlaceholder))]) : e._e()], 1) : e._e()]), t("div", { staticClass: "col-lg-8 quintable--table-footer-container--pagination-wrapper" }, [e.configFinal && e.configFinal.pagination ? t("div", { staticClass: "float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container" }, [e.configFinal.rowsSelect ? t("div", { staticClass: "mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select" }, [t("span", { staticClass: "d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder", domProps: { innerHTML: e._s(e.configFinal.rowsPlaceholder) } }), t("v-select", { staticClass: "d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select", attrs: { options: e.paginationOptionsFilled, clearable: !1 }, model: { value: e.currentRowsPerPageProperty, callback: function(s) {
    e.currentRowsPerPageProperty = s;
  }, expression: "currentRowsPerPageProperty" } })], 1) : e._e(), e.configFinal && e.configFinal.pagination && e.pages > 1 ? t("nav", { staticClass: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav", class: { "me-3": e.numberOfVisibleRows, disabled: e.ajaxLoading } }, [t("ul", { staticClass: "pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination" }, [e.pages > e.pageRange ? t("li", { staticClass: "page-item", class: { disabled: e.currentPage <= 1 }, on: { click: function(s) {
    return e.gotoPage("first");
  } } }, [t("span", { staticClass: "page-link" }, [t("font-awesome-icon", { attrs: { icon: "angle-double-left" } })], 1)]) : e._e(), t("li", { staticClass: "page-item", class: { disabled: e.currentPage <= 1 }, on: { click: function(s) {
    return e.gotoPage("prev");
  } } }, [t("span", { staticClass: "page-link" }, [t("font-awesome-icon", { attrs: { icon: "angle-left" } })], 1)]), e.pageRange < e.pages && e.visiblePages[0] > 1 ? t("li", { staticClass: "page-item", on: { click: function(s) {
    return e.updatePageOffset(-1);
  } } }, [t("span", { staticClass: "page-link" }, [e._v(" ... ")])]) : e._e(), e._l(e.visiblePages, function(s) {
    return t("li", { key: "pagination-item-" + s, staticClass: "page-item", class: { active: s === e.currentPage }, on: { click: function(l) {
      return e.gotoPage(s);
    } } }, [t("span", { staticClass: "page-link" }, [e._v(" " + e._s(s) + " ")])]);
  }), e.pageRange < e.pages && e.visiblePages[e.visiblePages.length - 1] < e.pages ? t("li", { staticClass: "page-item", on: { click: function(s) {
    return e.updatePageOffset(1);
  } } }, [t("span", { staticClass: "page-link" }, [e._v(" ... ")])]) : e._e(), t("li", { staticClass: "page-item", class: { disabled: e.pages === e.currentPage }, on: { click: function(s) {
    return e.gotoPage("next");
  } } }, [t("span", { staticClass: "page-link" }, [t("font-awesome-icon", { attrs: { icon: "angle-right" } })], 1)]), e.pages > e.pageRange ? t("li", { staticClass: "page-item", class: { disabled: e.pages === e.currentPage }, on: { click: function(s) {
    return e.gotoPage("last");
  } } }, [t("span", { staticClass: "page-link" }, [t("font-awesome-icon", { attrs: { icon: "angle-double-right" } })], 1)]) : e._e()], 2)]) : e._e(), e.numberOfVisibleRows ? t("span", { staticClass: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows" }, [e._v(e._s(e.firstVisibleRow) + "-" + e._s(e.lastVisibleRow) + " " + e._s(e.configFinal.numberOfVisibleRowsFillerWord) + " " + e._s(e.numberOfVisibleRows))]) : e._e()]) : e._e()])])]), t("div", { staticClass: "footer slot slot-footer quintable--footer" }, [e._t("footer")], 2)]);
}, Qe = [], ze = /* @__PURE__ */ Ne(
  Be,
  He,
  Qe,
  !1,
  null,
  "d3aae2a9",
  null,
  null
);
const re = ze.exports;
y.add(fe);
y.add(de);
y.add(ge);
y.add(pe);
y.add(me);
y.add(we);
y.add(be);
y.add(ye);
y.add(Se);
y.add(Fe);
y.add(ve);
y.add(Ce);
y.add(_e);
y.add(Re);
y.add(ke);
y.add(Pe);
y.add(xe);
y.add(Oe);
y.add(qe);
let P = function(i) {
  P.installed || (P.installed = !0, i.component("v-select", ce), i.component("p-check", Te), i.component("font-awesome-icon", he), i.component("VueQuintable", re), i.use(ue, {
    defaultTemplate: '<div class="quintable-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    defaultClass: ""
  }));
};
const Ke = {
  install: P
};
let x = null;
typeof window != "undefined" ? x = window.Vue : typeof global != "undefined" && (x = global.Vue);
x && x.use(Ke);
const tt = {
  VueQuintable: re,
  install: P
};
export {
  tt as default
};
//# sourceMappingURL=vue-quintable.es.js.map
