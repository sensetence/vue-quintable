var Es = Object.defineProperty, As = Object.defineProperties;
var Ts = Object.getOwnPropertyDescriptors;
var Pt = Object.getOwnPropertySymbols;
var qs = Object.prototype.hasOwnProperty, Ls = Object.prototype.propertyIsEnumerable;
var ue = (e, t) => (t = Symbol[e]) ? t : Symbol.for("Symbol." + e), js = (e) => {
  throw TypeError(e);
};
var Ge = (e, t, s) => t in e ? Es(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, O = (e, t) => {
  for (var s in t || (t = {}))
    qs.call(t, s) && Ge(e, s, t[s]);
  if (Pt)
    for (var s of Pt(t))
      Ls.call(t, s) && Ge(e, s, t[s]);
  return e;
}, G = (e, t) => As(e, Ts(t));
var Pe = (e, t, s) => Ge(e, typeof t != "symbol" ? t + "" : t, s);
var te = (e, t, s) => new Promise((n, i) => {
  var o = (u) => {
    try {
      l(s.next(u));
    } catch (c) {
      i(c);
    }
  }, r = (u) => {
    try {
      l(s.throw(u));
    } catch (c) {
      i(c);
    }
  }, l = (u) => u.done ? n(u.value) : Promise.resolve(u.value).then(o, r);
  l((s = s.apply(e, t)).next());
}), se = function(e, t) {
  this[0] = e, this[1] = t;
}, Je = (e, t, s) => {
  var n = (r, l, u, c) => {
    try {
      var g = s[r](l), a = (l = g.value) instanceof se, p = g.done;
      Promise.resolve(a ? l[0] : l).then((f) => a ? n(r === "return" ? r : "next", l[1] ? { done: f.done, value: f.value } : f, u, c) : u({ value: f, done: p })).catch((f) => n("throw", f, u, c));
    } catch (f) {
      c(f);
    }
  }, i = (r) => o[r] = (l) => new Promise((u, c) => n(r, l, u, c)), o = {};
  return s = s.apply(e, t), o[ue("asyncIterator")] = () => o, i("next"), i("throw"), i("return"), o;
}, Xe = (e) => {
  var t = e[ue("asyncIterator")], s = !1, n, i = {};
  return t == null ? (t = e[ue("iterator")](), n = (o) => i[o] = (r) => t[o](r)) : (t = t.call(e), n = (o) => i[o] = (r) => {
    if (s) {
      if (s = !1, o === "throw") throw r;
      return r;
    }
    return s = !0, {
      done: !1,
      value: new se(new Promise((l) => {
        var u = t[o](r);
        u instanceof Object || js("Object expected"), l(u);
      }), 1)
    };
  }), i[ue("iterator")] = () => i, n("next"), "throw" in t ? n("throw") : i.throw = (o) => {
    throw o;
  }, "return" in t && n("return"), i;
}, Ot = (e, t, s) => (t = e[ue("asyncIterator")]) ? t.call(e) : (e = e[ue("iterator")](), t = {}, s = (n, i) => (i = e[n]) && (t[n] = (o) => new Promise((r, l, u) => (o = i.call(e, o), u = o.done, Promise.resolve(o.value).then((c) => r({ value: c, done: u }), l)))), s("next"), s("return"), t);
import Ns from "floating-vue";
import { library as Ms } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as Us } from "@fortawesome/vue-fontawesome";
import { faAngleLeft as Bs, faAngleRight as Vs, faAnglesLeft as Hs, faAnglesRight as Ds, faArrowDownWideShort as $s, faArrowUpShortWide as Is, faCaretDown as zs, faCaretUp as xs, faCheck as Ws, faChevronDown as Ks, faChevronUp as Qs, faCircleInfo as Gs, faCircleNotch as Js, faDownLong as Xs, faExpand as Zs, faEye as Ys, faEyeSlash as en, faMinus as tn, faPlus as sn, faSquare as nn, faUpDownLeftRight as on, faUpLong as rn, faXmark as ln } from "@fortawesome/free-solid-svg-icons";
import { createElementBlock as h, openBlock as d, normalizeClass as k, createElementVNode as F, createCommentVNode as S, renderSlot as R, toRaw as Z, shallowReactive as an, resolveComponent as Oe, resolveDirective as cn, normalizeStyle as $, toDisplayString as _, Fragment as C, renderList as q, withDirectives as J, vModelText as un, createBlock as E, withCtx as ne, vModelCheckbox as _e, mergeProps as H, withModifiers as X, createVNode as N, resolveDynamicComponent as Ee, createTextVNode as ie, getCurrentInstance as dn, computed as _t, h as hn } from "vue";
import fn from "vue-select";
import pn from "fuzzy.js";
function gn(e) {
  e.use(Ns, {
    themes: {
      tooltip: {
        $extend: "dropdown",
        // inherit default styles
        triggers: ["hover", "focus"],
        delay: {
          show: 200,
          hide: 200
        },
        popperOptions: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 6]
              }
            }
          ]
        },
        contentClass: "quintable-tooltip"
      }
    }
  });
}
Ms.add(
  Bs,
  Vs,
  Hs,
  Ds,
  $s,
  Is,
  zs,
  xs,
  Ws,
  Ks,
  Qs,
  Gs,
  Js,
  Xs,
  Zs,
  Ys,
  en,
  tn,
  sn,
  nn,
  on,
  rn,
  ln
);
function mn(e) {
  e.component("QuintableFontAwesomeIcon", Us);
}
const ht = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, bn = {
  name: "PrettyCheckbox",
  props: {
    type: {
      type: String,
      default: null
    },
    // the input's accessible name (VueQuintable's accessible option)
    ariaLabel: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number, Object, Array, Boolean],
      default: null
    },
    modelValue: {
      type: [String, Number, Object, Array, Boolean],
      default: void 0
    },
    trueValue: {
      type: [String, Number, Object, Array, Boolean],
      default: !0
    },
    falseValue: {
      type: [String, Number, Object, Array, Boolean],
      default: !1
    },
    checked: {
      type: [String, Boolean],
      default: !1
    },
    disabled: {
      type: [String, Boolean],
      default: !1
    },
    required: {
      type: [String, Boolean],
      default: !1
    },
    indeterminate: {
      type: [String, Boolean],
      default: !1
    },
    color: {
      type: String,
      default: null
    },
    offColor: {
      type: String,
      default: null
    },
    hoverColor: {
      type: String,
      default: null
    },
    indeterminateColor: {
      type: String,
      default: null
    },
    toggle: {
      type: [String, Boolean],
      default: !1
    },
    hover: {
      type: [String, Boolean],
      default: !1
    },
    focus: {
      type: [String, Boolean],
      default: !1
    }
  },
  emits: ["update:modelValue", "change", "update:indeterminate"],
  data() {
    return {
      m_checked: !1,
      default_mode: !1
    };
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue !== void 0 ? this.modelValue instanceof Array ? this.modelValue.includes(this.value) : this._trueValue ? this.modelValue === this.trueValue : typeof this.modelValue == "string" ? !0 : !!this.modelValue : this.m_checked;
    },
    _disabled() {
      return typeof this.disabled == "string" ? !0 : !!this.disabled;
    },
    _required() {
      return typeof this.required == "string" ? !0 : !!this.required;
    },
    _indeterminate() {
      return typeof this.indeterminate == "string" ? !0 : !!this.indeterminate;
    },
    _trueValue() {
      return typeof this.trueValue == "string" ? this.trueValue : !!this.trueValue;
    },
    _falseValue() {
      return typeof this.falseValue == "string" ? this.falseValue : !!this.falseValue;
    },
    _toggle() {
      return typeof this.toggle == "string" ? !0 : !!this.toggle;
    },
    _hover() {
      return typeof this.hover == "string" ? !0 : !!this.hover;
    },
    _focus() {
      return typeof this.focus == "string" ? !0 : !!this.focus;
    },
    classes() {
      return {
        pretty: !0,
        "p-default": this.default_mode,
        "p-toggle": this._toggle,
        "p-has-hover": this._hover,
        "p-has-focus": this._focus,
        "p-has-indeterminate": this._indeterminate
      };
    },
    onClasses() {
      let e = {
        state: !0,
        "p-on": this._toggle
      };
      return this.color && (e[`p-${this.color}`] = !0), e;
    },
    offClasses() {
      let e = {
        state: !0,
        "p-off": !0
      };
      return this.offColor && (e[`p-${this.offColor}`] = !0), e;
    },
    hoverClasses() {
      let e = {
        state: !0,
        "p-is-hover": !0
      };
      return this.hoverColor && (e[`p-${this.hoverColor}`] = !0), e;
    },
    indeterminateClasses() {
      let e = {
        state: !0,
        "p-is-indeterminate": !0
      };
      return this.indeterminateColor && (e[`p-${this.indeterminateColor}`] = !0), e;
    }
  },
  watch: {
    checked(e) {
      this.m_checked = typeof e == "string" ? !0 : !!e;
    },
    indeterminate(e) {
      this.$refs.input && (this.$refs.input.indeterminate = e);
    }
  },
  created() {
    this.m_checked = typeof this.checked == "string" ? !0 : !!this.checked;
  },
  mounted() {
    (!this.$el.className || this.$el.className === "pretty") && (this.default_mode = !0), this._indeterminate && this.$refs.input && (this.$refs.input.indeterminate = !0), this.$el.setAttribute("p-checkbox", "");
  },
  methods: {
    updateInput(e) {
      this.$emit("update:indeterminate", !1);
      let t = e.target.checked;
      if (this.m_checked = t, this.modelValue instanceof Array) {
        let s = [...this.modelValue];
        t ? s.push(this.value) : s.splice(s.indexOf(this.value), 1), this.$emit("update:modelValue", s), this.$emit("change", s);
      } else {
        const s = t ? this._trueValue ? this.trueValue : !0 : this._falseValue ? this.falseValue : !1;
        this.$emit("update:modelValue", s), this.$emit("change", s);
      }
    }
  }
}, wn = ["name", "value", "checked", "disabled", "required", "aria-label"];
function yn(e, t, s, n, i, o) {
  return d(), h("div", {
    class: k(o.classes)
  }, [
    F("input", {
      ref: "input",
      type: "checkbox",
      name: s.name,
      value: s.value,
      checked: o.shouldBeChecked,
      disabled: o._disabled,
      required: o._required,
      "aria-label": s.ariaLabel,
      onChange: t[0] || (t[0] = (...r) => o.updateInput && o.updateInput(...r))
    }, null, 40, wn),
    F("div", {
      class: k(o.onClasses)
    }, [
      R(e.$slots, "extra", {}, void 0, !0),
      F("label", null, [
        R(e.$slots, "default", {}, void 0, !0)
      ])
    ], 2),
    o._toggle ? (d(), h("div", {
      key: 0,
      class: k(o.offClasses)
    }, [
      R(e.$slots, "off-extra", {}, void 0, !0),
      R(e.$slots, "off-label", {}, void 0, !0)
    ], 2)) : S("", !0),
    o._hover ? (d(), h("div", {
      key: 1,
      class: k(o.hoverClasses)
    }, [
      R(e.$slots, "hover-extra", {}, void 0, !0),
      R(e.$slots, "hover-label", {}, void 0, !0)
    ], 2)) : S("", !0),
    o._indeterminate ? (d(), h("div", {
      key: 2,
      class: k(o.indeterminateClasses)
    }, [
      R(e.$slots, "indeterminate-extra", {}, void 0, !0),
      R(e.$slots, "indeterminate-label", {}, void 0, !0)
    ], 2)) : S("", !0)
  ], 2);
}
const Sn = /* @__PURE__ */ ht(bn, [["render", yn], ["__scopeId", "data-v-00fc3994"]]), kn = {
  name: "PrettyRadio",
  props: {
    name: {
      type: String,
      default: void 0
    },
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: void 0
    },
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: void 0
    },
    checked: {
      type: [Boolean, String],
      default: void 0
    },
    disabled: {
      type: [Boolean, String],
      default: void 0
    },
    required: {
      type: [Boolean, String],
      default: void 0
    },
    color: {
      type: String,
      default: void 0
    },
    offColor: {
      type: String,
      default: void 0
    },
    hoverColor: {
      type: String,
      default: void 0
    },
    toggle: {
      type: [Boolean, String],
      default: void 0
    },
    hover: {
      type: [Boolean, String],
      default: void 0
    },
    focus: {
      type: [Boolean, String],
      default: void 0
    }
  },
  emits: ["update:model-value", "change"],
  data() {
    return {
      m_checked: void 0,
      default_mode: !1
    };
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue !== void 0 ? this.modelValue === this.value : this.m_checked === void 0 ? typeof this.checked == "string" ? !0 : !!this.checked : this.m_checked;
    },
    _disabled() {
      return typeof this.disabled == "string" ? !0 : !!this.disabled;
    },
    _required() {
      return typeof this.required == "string" ? !0 : !!this.required;
    },
    _toggle() {
      return typeof this.toggle == "string" ? !0 : !!this.toggle;
    },
    _hover() {
      return typeof this.hover == "string" ? !0 : !!this.hover;
    },
    _focus() {
      return typeof this.focus == "string" ? !0 : !!this.focus;
    },
    classes() {
      return {
        pretty: !0,
        "p-default": this.default_mode,
        "p-round": this.default_mode,
        "p-toggle": this._toggle,
        "p-has-hover": this._hover,
        "p-has-focus": this._focus
      };
    },
    onClasses() {
      let e = {
        state: !0,
        "p-on": this._toggle
      };
      return this.color && (e[`p-${this.color}`] = !0), e;
    },
    offClasses() {
      let e = {
        state: !0,
        "p-off": !0
      };
      return this.offColor && (e[`p-${this.offColor}`] = !0), e;
    },
    hoverClasses() {
      let e = {
        state: !0,
        "p-is-hover": !0
      };
      return this.hoverColor && (e[`p-${this.hoverColor}`] = !0), e;
    }
  },
  watch: {
    checked(e) {
      this.m_checked = e;
    }
  },
  mounted() {
    (!this.$el.className || this.$el.className === "pretty") && (this.default_mode = !0), this.m_checked === void 0 && this.checked !== void 0 && (this.m_checked = typeof this.checked == "string" ? !0 : !!this.checked), this.$el.setAttribute("p-radio", "");
  },
  methods: {
    updateInput() {
      this.$emit("update:model-value", this.value), this.$emit("change", this.value);
    }
  }
}, Fn = ["name", "value", "checked", "disabled", "required"];
function Rn(e, t, s, n, i, o) {
  return d(), h("div", {
    class: k(o.classes)
  }, [
    F("input", {
      ref: "input",
      type: "radio",
      name: s.name,
      value: s.value,
      checked: o.shouldBeChecked,
      disabled: o._disabled,
      required: o._required,
      onChange: t[0] || (t[0] = (...r) => o.updateInput && o.updateInput(...r))
    }, null, 40, Fn),
    F("div", {
      class: k(o.onClasses)
    }, [
      R(e.$slots, "extra"),
      F("label", null, [
        R(e.$slots, "default")
      ])
    ], 2),
    o._toggle ? (d(), h("div", {
      key: 0,
      class: k(o.offClasses)
    }, [
      R(e.$slots, "off-extra"),
      R(e.$slots, "off-label")
    ], 2)) : S("", !0),
    o._hover ? (d(), h("div", {
      key: 1,
      class: k(o.hoverClasses)
    }, [
      R(e.$slots, "hover-extra"),
      R(e.$slots, "hover-label")
    ], 2)) : S("", !0)
  ], 2);
}
const vn = /* @__PURE__ */ ht(kn, [["render", Rn]]);
function Cn(e) {
  e.component("QuintablePCheck", Sn), e.component("QuintablePRadio", vn), e.component("QuintableVSelect", fn);
}
const Ae = {
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1400px)"
}, Et = typeof window != "undefined" && typeof window.matchMedia == "function";
let je = null;
class Pn {
  constructor() {
    Pe(this, "_subscribers");
    Pe(this, "_mqls");
    Pe(this, "hiddenBreakpoints");
    if (this._subscribers = /* @__PURE__ */ new Set(), this._mqls = {}, this.hiddenBreakpoints = [], this._onChange = this._onChange.bind(this), this._compute(), Et)
      for (const t in Ae) {
        const s = window.matchMedia(Ae[t]);
        this._mqls[t] = s, s.addEventListener ? s.addEventListener("change", this._onChange) : s.addListener(this._onChange);
      }
  }
  _onChange() {
    this._compute();
  }
  _compute() {
    const t = [];
    if (Et)
      for (const s in Ae)
        window.matchMedia(Ae[s]).matches || t.push(s);
    t.push("all"), this.hiddenBreakpoints = t, this._subscribers.forEach((s) => s(t));
  }
  subscribe(t) {
    this._subscribers.add(t), t(this.hiddenBreakpoints);
  }
  unsubscribe(t) {
    this._subscribers.delete(t), this._subscribers.size === 0 && (this._destroy(), je = null);
  }
  _destroy() {
    for (const t in this._mqls) {
      const s = this._mqls[t];
      s.removeEventListener ? s.removeEventListener("change", this._onChange) : s.removeListener(this._onChange);
    }
    this._mqls = {}, this._subscribers.clear();
  }
}
function is() {
  return je || (je = new Pn()), je;
}
const On = [
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
  100,
  250,
  500,
  1e3
], _n = [
  "pageSort",
  "multiSort",
  "pageSortSelect",
  "multiSortSelect",
  "rowsSelect",
  "keepSelect",
  "disallowAllOption",
  "defaultSelected",
  "search",
  "useFuzzySearch",
  "hideEmptyColumns",
  "select",
  "selectAll",
  "expandedAll",
  "prettySelect",
  "hideRowToggle",
  "enableRowTabIndex",
  "autoFit",
  "cellTitles",
  "skeletonLoading",
  "ignoreControlClicks",
  "alwaysShowSortIcons",
  "reuseRows",
  "accessible",
  "highlightSearch",
  "columnPicker",
  "stickyHeader",
  "resizableColumns",
  "columnFilters",
  "virtualScroll",
  "urlState"
], At = {
  numberOfVisibleRowsFillerWord: "of",
  ajaxRequestDelay: 250,
  ajaxUrl: !1,
  searchLength: 1,
  searchPlaceholder: "Search...",
  multiSortPlaceholder: "Multiple sort",
  pageSortPlaceholder: "Page sort",
  rowsPlaceholder: "Rows per page:",
  emptyPlaceholder: "No rows...",
  pageRange: 5,
  searchClass: "col-12",
  searchContainerClass: "row",
  searchDebounce: 0,
  scrollHeight: !1,
  rowHeight: 41,
  columnPickerPlaceholder: "Columns",
  columnFilterPlaceholder: "Filter",
  selectRowLabel: "Select row",
  selectAllLabel: "Select all rows",
  paginationLabel: "Pagination",
  expandRowLabel: "Show details",
  collapseRowLabel: "Hide details",
  firstPageLabel: "First page",
  previousPageLabel: "Previous page",
  nextPageLabel: "Next page",
  lastPageLabel: "Last page",
  resizeColumnLabel: "Resize column",
  columnFilterAllLabel: "All",
  columnFilterMinLabel: "Min",
  columnFilterMaxLabel: "Max"
}, Ze = {
  selectPosition: ["post", "pre"],
  ignoreSortEmptyColumns: ["none", "active", "all"],
  filterRelation: ["AND", "OR"],
  filterGroupRelation: ["AND", "OR"]
}, Ye = {
  expandedRowIcon: ["chevron-up", "minus", "caret-up", "eye-slash"],
  collapsedRowIcon: ["chevron-down", "plus", "caret-down", "eye"]
};
let Te = null;
function En() {
  if (Te === null)
    try {
      const e = "test-local-storage";
      localStorage.setItem(e, e), localStorage.removeItem(e), Te = !0;
    } catch (e) {
      Te = !1;
    }
  return Te;
}
function An(e, t) {
  if (e === !0)
    return 25;
  if (!e)
    return !1;
  let s = 0;
  for (; t[s] <= e && s < t.length; )
    s++;
  return t[Math.min(s - 1, t.length - 1)];
}
function Tt(e) {
  return e === !1 ? "" : e && e !== !0 ? e : "bg-muted";
}
function Tn(e) {
  const t = {
    headlines: [],
    columnClasses: [],
    sorts: [],
    stickyCols: [],
    alignments: [],
    breakpoints: [],
    hiddenCols: [],
    ignoreEmpty: [],
    pins: [],
    widths: [],
    filterTypes: []
  };
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    let i = "";
    n && n.headline ? (t.headlines[s] = n.headline, i = n.headline.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()) : t.headlines[s] = "", i += " column-" + (s + 1), n.classes && (i += " " + n.classes), t.columnClasses[s] = i, t.breakpoints[s] = n && n.breakpoint || "";
    const o = n && n.firstSortDirection;
    t.sorts[s] = !!(n && n.sort) && (typeof o == "string" && ["DESC", "ASC"].includes(o.toUpperCase()) ? o.toUpperCase() : !0), t.ignoreEmpty[s] = !!(n && n.ignoreEmpty), t.stickyCols[s] = !!(n && n.sticky), t.hiddenCols[s] = !!(n && n.hidden), t.alignments[s] = n && n.align || !1, t.pins[s] = n && (n.pin === "start" || n.pin === "end") ? n.pin : !1, t.widths[s] = n && n.width ? typeof n.width == "number" ? n.width + "px" : String(n.width) : !1, t.filterTypes[s] = n && n.filter === !1 ? !1 : n && (n.filter === "select" || n.filter === "range") ? n.filter : "text";
  }
  return t;
}
function qn(e, t, s, n) {
  if (!e)
    return {};
  const i = O(O({}, t), e), o = {};
  for (const l of _n)
    o[l] = !!i[l];
  for (const l in At)
    o[l] = i[l] || At[l];
  for (const l in Ze)
    o[l] = Ze[l].includes(i[l]) ? i[l] : Ze[l][0];
  for (const l in Ye) {
    const u = i[l];
    o[l] = typeof u == "string" && Ye[l].includes(u.toLowerCase()) ? u.toLowerCase() : Ye[l][0];
  }
  o.pagination = An(i.pagination, n), o.hoverClass = Tt(i.hoverClass), o.activeClass = Tt(i.activeClass);
  const r = i.requestMethod;
  return o.requestMethod = typeof r == "string" && ["POST", "GET"].includes(r.toUpperCase()) ? r.toUpperCase() : "GET", o.selectAllRows = !!i.selectAllRows, o.ajaxUrl && o.selectAllRows && (console.warn(
    "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
  ), o.selectAllRows = !1), o.storeState = !!i.storeState, !s && i.storeState && (console.warn(
    "Option storeState was deactivated automatically because table identifier is not set!"
  ), o.storeState = !1), o.storeState && !En() && (console.warn(
    "Option storeState was deactivated automatically because local storage is not available!"
  ), o.storeState = !1), o.reloadOn = typeof i.reloadOn == "function" ? i.reloadOn : null, o.ajaxHeaders = typeof i.ajaxHeaders == "function" || i.ajaxHeaders && typeof i.ajaxHeaders == "object" ? i.ajaxHeaders : null, Object.freeze(G(O(O({}, o), Tn(i.columns || [])), {
    number: i.columns ? i.columns.length : 0,
    columns: i.columns ? i.columns : null
  }));
}
const Ln = Object.freeze({
  equal: (e, t) => t === e,
  greater: (e, t) => t > e,
  less: (e, t) => t < e,
  greaterEqual: (e, t) => t >= e,
  lessEqual: (e, t) => t <= e,
  contains: (e, t) => !Array.isArray(t) && typeof t != "string" ? !1 : t.indexOf(e) !== -1,
  notContains: (e, t) => !Array.isArray(t) && typeof t != "string" ? !1 : t.indexOf(e) === -1,
  startsWith: (e, t) => typeof t != "string" ? !1 : t.indexOf(e) === 0,
  endsWith: (e, t) => typeof t != "string" ? !1 : t.indexOf(e, t.length - e.length) !== -1,
  matches(e, t) {
    return !(e instanceof RegExp) || typeof t != "string" ? !1 : (e.lastIndex = 0, e.test(t));
  }
});
function ft(e) {
  return e instanceof RegExp || typeof e != "object" || e === null ? [e] : Array.isArray(e) ? e : ft(e.values);
}
function pt(e, t, s = 0) {
  if (!t)
    return !1;
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    if (i.items && pt(e, i.items, s + 1) || i.name === e)
      return !0;
  }
  return !1;
}
function qt(e, t, s) {
  const n = e[t];
  if (typeof n == "undefined")
    return null;
  const i = typeof n == "object" && n !== null && n.operator && s.operatorNames.includes(n.operator) ? n.operator : s.defaultOperator;
  return {
    values: ft(n),
    // No null check, as before: a filter set to null throws here.
    compare: typeof n.compare == "function" ? n.compare : s.operators[i]
  };
}
function jn(e, t) {
  const s = "   ".repeat(t + 1);
  if (e.items) {
    const n = e.items.slice().sort(
      (o, r) => o.name === void 0 ? 1 : r.name === void 0 ? -1 : 0
    );
    let i = s;
    for (let o = 0; o < n.length; o++)
      n[o].name && (i += n[o].name, o < n.length - 1 && (i += " " + e.relation + " "));
    console.log(i);
  }
  console.log(s, "GROUP:", e);
}
function Ve(e, t, s, n, i = 0) {
  n.debug && jn(s, i);
  const o = s.relation === "AND";
  if (!o && s.relation !== "OR" && !s.items)
    return !0;
  let r = !1;
  for (const l in e)
    if (Object.prototype.hasOwnProperty.call(e, l) && (!n.groups.length || pt(l, n.groups))) {
      r = !0;
      break;
    }
  if (!r)
    return !1;
  if (o) {
    if (!s.items.length)
      return !1;
    for (const l of s.items)
      if (l.name && t[l.name] === void 0)
        return !1;
    for (const l of s.items) {
      if (l.items && !Ve(e, t, l, n, i + 1))
        return !1;
      const u = qt(e, l.name, n);
      if (u && !u.values.every(
        (c) => u.compare(c, t[l.name])
      ))
        return !1;
    }
    return !0;
  }
  for (const l of s.items) {
    if (l.items && Ve(e, t, l, n, i + 1))
      return !0;
    const u = qt(e, l.name, n);
    if (u && u.values.some((c) => u.compare(c, t[l.name])))
      return !0;
  }
  return !1;
}
function Nn(e, t, s, n) {
  const i = n.groups.map((o, r) => {
    const l = Ve(e, t, o, n);
    return n.debug && r < n.groups.length - 1 && console.log(s), l;
  });
  return n.debug && console.log("RESULTS FOR GROUPS:", i, s), s === "AND" ? !i.includes(!1) : s === "OR" ? i.includes(!0) : !0;
}
function He(e, t) {
  return e.length === t.length && e.every((s, n) => s === t[n]);
}
function oe(e) {
  return e === "" || e === null || e === !1 || e === void 0 ? "" : String(e);
}
function W(e) {
  const t = e.cells;
  return t || e;
}
function be(e, t, s) {
  const n = Z(e);
  (!Object.prototype.hasOwnProperty.call(n, t) || !Object.is(n[t], s)) && (e[t] = s);
}
function lt(e, t) {
  const s = Z(e);
  let n = null;
  for (const [i, o] of t)
    (n || !Object.prototype.hasOwnProperty.call(s, i) || !Object.is(s[i], o)) && (n = n || O({}, s), n[i] = o);
  return n;
}
function Mn(e, t) {
  const s = e.toLowerCase();
  let n = s.indexOf(t);
  if (!t || n === -1)
    return null;
  const i = [];
  let o = 0;
  for (; n !== -1; )
    n > o && i.push({ text: e.slice(o, n), mark: !1 }), i.push({ text: e.slice(n, n + t.length), mark: !0 }), o = n + t.length, n = s.indexOf(t, o);
  return o < e.length && i.push({ text: e.slice(o), mark: !1 }), i;
}
function de(e, t, s, n, i) {
  var l;
  let o = (l = s.instance) == null ? void 0 : l.$.appContext.directives.tooltip;
  typeof o == "function" && (o = { mounted: o, updated: o });
  const r = o == null ? void 0 : o[e];
  r && r(t, s, n, i);
}
function Un(e, t) {
  if (e === t)
    return !0;
  if (!e || !t || typeof e != "object" || typeof t != "object")
    return !1;
  for (const s in e)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
const os = (e) => !!(e.value && e.value.content);
function et(e) {
  return (t, s, n) => {
    os(s) && (t._quintableTooltip = !0, de(e, t, s, n, null));
  };
}
function Lt(e) {
  return (t, s, n) => {
    t._quintableTooltip && de(e, t, s, n, null);
  };
}
const Bn = {
  created: et("created"),
  beforeMount: et("beforeMount"),
  mounted: et("mounted"),
  updated(e, t, s, n) {
    e._quintableTooltip ? Un(t.value, t.oldValue) || de("updated", e, t, s, n) : os(t) && (e._quintableTooltip = !0, de("created", e, t, s, null), de("beforeMount", e, t, s, null), de("mounted", e, t, s, null));
  },
  beforeUnmount: Lt("beforeUnmount"),
  unmounted: Lt("unmounted")
};
function rs(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Vn } = Object.prototype, { getPrototypeOf: gt } = Object, { iterator: $e, toStringTag: ls } = Symbol, Ie = /* @__PURE__ */ ((e) => (t) => {
  const s = Vn.call(t);
  return e[s] || (e[s] = s.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), x = (e) => (e = e.toLowerCase(), (t) => Ie(t) === e), ze = (e) => (t) => typeof t === e, { isArray: fe } = Array, he = ze("undefined");
function we(e) {
  return e !== null && !he(e) && e.constructor !== null && !he(e.constructor) && B(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const as = x("ArrayBuffer");
function Hn(e) {
  let t;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && as(e.buffer), t;
}
const Dn = ze("string"), B = ze("function"), cs = ze("number"), ye = (e) => e !== null && typeof e == "object", $n = (e) => e === !0 || e === !1, Ne = (e) => {
  if (Ie(e) !== "object")
    return !1;
  const t = gt(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(ls in e) && !($e in e);
}, In = (e) => {
  if (!ye(e) || we(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch (t) {
    return !1;
  }
}, zn = x("Date"), xn = x("File"), Wn = (e) => !!(e && typeof e.uri != "undefined"), Kn = (e) => e && typeof e.getParts != "undefined", Qn = x("Blob"), Gn = x("FileList"), Jn = (e) => ye(e) && B(e.pipe);
function Xn() {
  return typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {};
}
const jt = Xn(), Nt = typeof jt.FormData != "undefined" ? jt.FormData : void 0, Zn = (e) => {
  let t;
  return e && (Nt && e instanceof Nt || B(e.append) && ((t = Ie(e)) === "formdata" || // detect form-data instance
  t === "object" && B(e.toString) && e.toString() === "[object FormData]"));
}, Yn = x("URLSearchParams"), [ei, ti, si, ni] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(x), ii = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Se(e, t, { allOwnKeys: s = !1 } = {}) {
  if (e === null || typeof e == "undefined")
    return;
  let n, i;
  if (typeof e != "object" && (e = [e]), fe(e))
    for (n = 0, i = e.length; n < i; n++)
      t.call(null, e[n], n, e);
  else {
    if (we(e))
      return;
    const o = s ? Object.getOwnPropertyNames(e) : Object.keys(e), r = o.length;
    let l;
    for (n = 0; n < r; n++)
      l = o[n], t.call(null, e[l], l, e);
  }
}
function us(e, t) {
  if (we(e))
    return null;
  t = t.toLowerCase();
  const s = Object.keys(e);
  let n = s.length, i;
  for (; n-- > 0; )
    if (i = s[n], t === i.toLowerCase())
      return i;
  return null;
}
const re = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global, ds = (e) => !he(e) && e !== re;
function at() {
  const { caseless: e, skipUndefined: t } = ds(this) && this || {}, s = {}, n = (i, o) => {
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      return;
    const r = e && us(s, o) || o;
    Ne(s[r]) && Ne(i) ? s[r] = at(s[r], i) : Ne(i) ? s[r] = at({}, i) : fe(i) ? s[r] = i.slice() : (!t || !he(i)) && (s[r] = i);
  };
  for (let i = 0, o = arguments.length; i < o; i++)
    arguments[i] && Se(arguments[i], n);
  return s;
}
const oi = (e, t, s, { allOwnKeys: n } = {}) => (Se(
  t,
  (i, o) => {
    s && B(i) ? Object.defineProperty(e, o, {
      value: rs(i, s),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(e, o, {
      value: i,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: n }
), e), ri = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), li = (e, t, s, n) => {
  e.prototype = Object.create(t.prototype, n), Object.defineProperty(e.prototype, "constructor", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    value: t.prototype
  }), s && Object.assign(e.prototype, s);
}, ai = (e, t, s, n) => {
  let i, o, r;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (i = Object.getOwnPropertyNames(e), o = i.length; o-- > 0; )
      r = i[o], (!n || n(r, e, t)) && !l[r] && (t[r] = e[r], l[r] = !0);
    e = s !== !1 && gt(e);
  } while (e && (!s || s(e, t)) && e !== Object.prototype);
  return t;
}, ci = (e, t, s) => {
  e = String(e), (s === void 0 || s > e.length) && (s = e.length), s -= t.length;
  const n = e.indexOf(t, s);
  return n !== -1 && n === s;
}, ui = (e) => {
  if (!e) return null;
  if (fe(e)) return e;
  let t = e.length;
  if (!cs(t)) return null;
  const s = new Array(t);
  for (; t-- > 0; )
    s[t] = e[t];
  return s;
}, di = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array != "undefined" && gt(Uint8Array)), hi = (e, t) => {
  const n = (e && e[$e]).call(e);
  let i;
  for (; (i = n.next()) && !i.done; ) {
    const o = i.value;
    t.call(e, o[0], o[1]);
  }
}, fi = (e, t) => {
  let s;
  const n = [];
  for (; (s = e.exec(t)) !== null; )
    n.push(s);
  return n;
}, pi = x("HTMLFormElement"), gi = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(s, n, i) {
  return n.toUpperCase() + i;
}), Mt = (({ hasOwnProperty: e }) => (t, s) => e.call(t, s))(Object.prototype), mi = x("RegExp"), hs = (e, t) => {
  const s = Object.getOwnPropertyDescriptors(e), n = {};
  Se(s, (i, o) => {
    let r;
    (r = t(i, o, e)) !== !1 && (n[o] = r || i);
  }), Object.defineProperties(e, n);
}, bi = (e) => {
  hs(e, (t, s) => {
    if (B(e) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
      return !1;
    const n = e[s];
    if (B(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + s + "'");
      });
    }
  });
}, wi = (e, t) => {
  const s = {}, n = (i) => {
    i.forEach((o) => {
      s[o] = !0;
    });
  };
  return fe(e) ? n(e) : n(String(e).split(t)), s;
}, yi = () => {
}, Si = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function ki(e) {
  return !!(e && B(e.append) && e[ls] === "FormData" && e[$e]);
}
const Fi = (e) => {
  const t = new Array(10), s = (n, i) => {
    if (ye(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (we(n))
        return n;
      if (!("toJSON" in n)) {
        t[i] = n;
        const o = fe(n) ? [] : {};
        return Se(n, (r, l) => {
          const u = s(r, i + 1);
          !he(u) && (o[l] = u);
        }), t[i] = void 0, o;
      }
    }
    return n;
  };
  return s(e, 0);
}, Ri = x("AsyncFunction"), vi = (e) => e && (ye(e) || B(e)) && B(e.then) && B(e.catch), fs = ((e, t) => e ? setImmediate : t ? ((s, n) => (re.addEventListener(
  "message",
  ({ source: i, data: o }) => {
    i === re && o === s && n.length && n.shift()();
  },
  !1
), (i) => {
  n.push(i), re.postMessage(s, "*");
}))(`axios@${Math.random()}`, []) : (s) => setTimeout(s))(typeof setImmediate == "function", B(re.postMessage)), Ci = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(re) : typeof process != "undefined" && process.nextTick || fs, Pi = (e) => e != null && B(e[$e]), m = {
  isArray: fe,
  isArrayBuffer: as,
  isBuffer: we,
  isFormData: Zn,
  isArrayBufferView: Hn,
  isString: Dn,
  isNumber: cs,
  isBoolean: $n,
  isObject: ye,
  isPlainObject: Ne,
  isEmptyObject: In,
  isReadableStream: ei,
  isRequest: ti,
  isResponse: si,
  isHeaders: ni,
  isUndefined: he,
  isDate: zn,
  isFile: xn,
  isReactNativeBlob: Wn,
  isReactNative: Kn,
  isBlob: Qn,
  isRegExp: mi,
  isFunction: B,
  isStream: Jn,
  isURLSearchParams: Yn,
  isTypedArray: di,
  isFileList: Gn,
  forEach: Se,
  merge: at,
  extend: oi,
  trim: ii,
  stripBOM: ri,
  inherits: li,
  toFlatObject: ai,
  kindOf: Ie,
  kindOfTest: x,
  endsWith: ci,
  toArray: ui,
  forEachEntry: hi,
  matchAll: fi,
  isHTMLForm: pi,
  hasOwnProperty: Mt,
  hasOwnProp: Mt,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: hs,
  freezeMethods: bi,
  toObjectSet: wi,
  toCamelCase: gi,
  noop: yi,
  toFiniteNumber: Si,
  findKey: us,
  global: re,
  isContextDefined: ds,
  isSpecCompliantForm: ki,
  toJSONObject: Fi,
  isAsyncFn: Ri,
  isThenable: vi,
  setImmediate: fs,
  asap: Ci,
  isIterable: Pi
};
let v = class ps extends Error {
  static from(t, s, n, i, o, r) {
    const l = new ps(t.message, s || t.code, n, i, o);
    return l.cause = t, l.name = t.name, t.status != null && l.status == null && (l.status = t.status), r && Object.assign(l, r), l;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(t, s, n, i, o) {
    super(t), Object.defineProperty(this, "message", {
      value: t,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }), this.name = "AxiosError", this.isAxiosError = !0, s && (this.code = s), n && (this.config = n), i && (this.request = i), o && (this.response = o, this.status = o.status);
  }
  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: m.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
v.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
v.ERR_BAD_OPTION = "ERR_BAD_OPTION";
v.ECONNABORTED = "ECONNABORTED";
v.ETIMEDOUT = "ETIMEDOUT";
v.ERR_NETWORK = "ERR_NETWORK";
v.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
v.ERR_DEPRECATED = "ERR_DEPRECATED";
v.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
v.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
v.ERR_CANCELED = "ERR_CANCELED";
v.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
v.ERR_INVALID_URL = "ERR_INVALID_URL";
const Oi = null;
function ct(e) {
  return m.isPlainObject(e) || m.isArray(e);
}
function gs(e) {
  return m.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function tt(e, t, s) {
  return e ? e.concat(t).map(function(i, o) {
    return i = gs(i), !s && o ? "[" + i + "]" : i;
  }).join(s ? "." : "") : t;
}
function _i(e) {
  return m.isArray(e) && !e.some(ct);
}
const Ei = m.toFlatObject(m, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function xe(e, t, s) {
  if (!m.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), s = m.toFlatObject(
    s,
    {
      metaTokens: !0,
      dots: !1,
      indexes: !1
    },
    !1,
    function(b, y) {
      return !m.isUndefined(y[b]);
    }
  );
  const n = s.metaTokens, i = s.visitor || g, o = s.dots, r = s.indexes, u = (s.Blob || typeof Blob != "undefined" && Blob) && m.isSpecCompliantForm(t);
  if (!m.isFunction(i))
    throw new TypeError("visitor must be a function");
  function c(w) {
    if (w === null) return "";
    if (m.isDate(w))
      return w.toISOString();
    if (m.isBoolean(w))
      return w.toString();
    if (!u && m.isBlob(w))
      throw new v("Blob is not supported. Use a Buffer instead.");
    return m.isArrayBuffer(w) || m.isTypedArray(w) ? u && typeof Blob == "function" ? new Blob([w]) : Buffer.from(w) : w;
  }
  function g(w, b, y) {
    let P = w;
    if (m.isReactNative(t) && m.isReactNativeBlob(w))
      return t.append(tt(y, b, o), c(w)), !1;
    if (w && !y && typeof w == "object") {
      if (m.endsWith(b, "{}"))
        b = n ? b : b.slice(0, -2), w = JSON.stringify(w);
      else if (m.isArray(w) && _i(w) || (m.isFileList(w) || m.endsWith(b, "[]")) && (P = m.toArray(w)))
        return b = gs(b), P.forEach(function(A, M) {
          !(m.isUndefined(A) || A === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            r === !0 ? tt([b], M, o) : r === null ? b : b + "[]",
            c(A)
          );
        }), !1;
    }
    return ct(w) ? !0 : (t.append(tt(y, b, o), c(w)), !1);
  }
  const a = [], p = Object.assign(Ei, {
    defaultVisitor: g,
    convertValue: c,
    isVisitable: ct
  });
  function f(w, b) {
    if (!m.isUndefined(w)) {
      if (a.indexOf(w) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      a.push(w), m.forEach(w, function(P, j) {
        (!(m.isUndefined(P) || P === null) && i.call(t, P, m.isString(j) ? j.trim() : j, b, p)) === !0 && f(P, b ? b.concat(j) : [j]);
      }), a.pop();
    }
  }
  if (!m.isObject(e))
    throw new TypeError("data must be an object");
  return f(e), t;
}
function Ut(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function mt(e, t) {
  this._pairs = [], e && xe(e, this, t);
}
const ms = mt.prototype;
ms.append = function(t, s) {
  this._pairs.push([t, s]);
};
ms.toString = function(t) {
  const s = t ? function(n) {
    return t.call(this, n, Ut);
  } : Ut;
  return this._pairs.map(function(i) {
    return s(i[0]) + "=" + s(i[1]);
  }, "").join("&");
};
function Ai(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function bs(e, t, s) {
  if (!t)
    return e;
  const n = s && s.encode || Ai, i = m.isFunction(s) ? {
    serialize: s
  } : s, o = i && i.serialize;
  let r;
  if (o ? r = o(t, i) : r = m.isURLSearchParams(t) ? t.toString() : new mt(t, i).toString(n), r) {
    const l = e.indexOf("#");
    l !== -1 && (e = e.slice(0, l)), e += (e.indexOf("?") === -1 ? "?" : "&") + r;
  }
  return e;
}
class Bt {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, s, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: s,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    m.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const bt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, Ti = typeof URLSearchParams != "undefined" ? URLSearchParams : mt, qi = typeof FormData != "undefined" ? FormData : null, Li = typeof Blob != "undefined" ? Blob : null, ji = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ti,
    FormData: qi,
    Blob: Li
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, wt = typeof window != "undefined" && typeof document != "undefined", ut = typeof navigator == "object" && navigator || void 0, Ni = wt && (!ut || ["ReactNative", "NativeScript", "NS"].indexOf(ut.product) < 0), Mi = typeof WorkerGlobalScope != "undefined" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Ui = wt && window.location.href || "http://localhost", Bi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: wt,
  hasStandardBrowserEnv: Ni,
  hasStandardBrowserWebWorkerEnv: Mi,
  navigator: ut,
  origin: Ui
}, Symbol.toStringTag, { value: "Module" })), L = O(O({}, Bi), ji);
function Vi(e, t) {
  return xe(e, new L.classes.URLSearchParams(), O({
    visitor: function(s, n, i, o) {
      return L.isNode && m.isBuffer(s) ? (this.append(n, s.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Hi(e) {
  return m.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Di(e) {
  const t = {}, s = Object.keys(e);
  let n;
  const i = s.length;
  let o;
  for (n = 0; n < i; n++)
    o = s[n], t[o] = e[o];
  return t;
}
function ws(e) {
  function t(s, n, i, o) {
    let r = s[o++];
    if (r === "__proto__") return !0;
    const l = Number.isFinite(+r), u = o >= s.length;
    return r = !r && m.isArray(i) ? i.length : r, u ? (m.hasOwnProp(i, r) ? i[r] = [i[r], n] : i[r] = n, !l) : ((!i[r] || !m.isObject(i[r])) && (i[r] = []), t(s, n, i[r], o) && m.isArray(i[r]) && (i[r] = Di(i[r])), !l);
  }
  if (m.isFormData(e) && m.isFunction(e.entries)) {
    const s = {};
    return m.forEachEntry(e, (n, i) => {
      t(Hi(n), i, s, 0);
    }), s;
  }
  return null;
}
function $i(e, t, s) {
  if (m.isString(e))
    try {
      return (t || JSON.parse)(e), m.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (s || JSON.stringify)(e);
}
const ke = {
  transitional: bt,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function(t, s) {
      const n = s.getContentType() || "", i = n.indexOf("application/json") > -1, o = m.isObject(t);
      if (o && m.isHTMLForm(t) && (t = new FormData(t)), m.isFormData(t))
        return i ? JSON.stringify(ws(t)) : t;
      if (m.isArrayBuffer(t) || m.isBuffer(t) || m.isStream(t) || m.isFile(t) || m.isBlob(t) || m.isReadableStream(t))
        return t;
      if (m.isArrayBufferView(t))
        return t.buffer;
      if (m.isURLSearchParams(t))
        return s.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
      let l;
      if (o) {
        if (n.indexOf("application/x-www-form-urlencoded") > -1)
          return Vi(t, this.formSerializer).toString();
        if ((l = m.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
          const u = this.env && this.env.FormData;
          return xe(
            l ? { "files[]": t } : t,
            u && new u(),
            this.formSerializer
          );
        }
      }
      return o || i ? (s.setContentType("application/json", !1), $i(t)) : t;
    }
  ],
  transformResponse: [
    function(t) {
      const s = this.transitional || ke.transitional, n = s && s.forcedJSONParsing, i = this.responseType === "json";
      if (m.isResponse(t) || m.isReadableStream(t))
        return t;
      if (t && m.isString(t) && (n && !this.responseType || i)) {
        const r = !(s && s.silentJSONParsing) && i;
        try {
          return JSON.parse(t, this.parseReviver);
        } catch (l) {
          if (r)
            throw l.name === "SyntaxError" ? v.from(l, v.ERR_BAD_RESPONSE, this, null, this.response) : l;
        }
      }
      return t;
    }
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: L.classes.FormData,
    Blob: L.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
m.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  ke.headers[e] = {};
});
const Ii = m.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), zi = (e) => {
  const t = {};
  let s, n, i;
  return e && e.split(`
`).forEach(function(r) {
    i = r.indexOf(":"), s = r.substring(0, i).trim().toLowerCase(), n = r.substring(i + 1).trim(), !(!s || t[s] && Ii[s]) && (s === "set-cookie" ? t[s] ? t[s].push(n) : t[s] = [n] : t[s] = t[s] ? t[s] + ", " + n : n);
  }), t;
}, Vt = Symbol("internals");
function ge(e) {
  return e && String(e).trim().toLowerCase();
}
function Me(e) {
  return e === !1 || e == null ? e : m.isArray(e) ? e.map(Me) : String(e);
}
function xi(e) {
  const t = /* @__PURE__ */ Object.create(null), s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = s.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const Wi = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function st(e, t, s, n, i) {
  if (m.isFunction(n))
    return n.call(this, t, s);
  if (i && (t = s), !!m.isString(t)) {
    if (m.isString(n))
      return t.indexOf(n) !== -1;
    if (m.isRegExp(n))
      return n.test(t);
  }
}
function Ki(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, s, n) => s.toUpperCase() + n);
}
function Qi(e, t) {
  const s = m.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + s, {
      value: function(i, o, r) {
        return this[n].call(this, t, i, o, r);
      },
      configurable: !0
    });
  });
}
let V = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, s, n) {
    const i = this;
    function o(l, u, c) {
      const g = ge(u);
      if (!g)
        throw new Error("header name must be a non-empty string");
      const a = m.findKey(i, g);
      (!a || i[a] === void 0 || c === !0 || c === void 0 && i[a] !== !1) && (i[a || u] = Me(l));
    }
    const r = (l, u) => m.forEach(l, (c, g) => o(c, g, u));
    if (m.isPlainObject(t) || t instanceof this.constructor)
      r(t, s);
    else if (m.isString(t) && (t = t.trim()) && !Wi(t))
      r(zi(t), s);
    else if (m.isObject(t) && m.isIterable(t)) {
      let l = {}, u, c;
      for (const g of t) {
        if (!m.isArray(g))
          throw TypeError("Object iterator must return a key-value pair");
        l[c = g[0]] = (u = l[c]) ? m.isArray(u) ? [...u, g[1]] : [u, g[1]] : g[1];
      }
      r(l, s);
    } else
      t != null && o(s, t, n);
    return this;
  }
  get(t, s) {
    if (t = ge(t), t) {
      const n = m.findKey(this, t);
      if (n) {
        const i = this[n];
        if (!s)
          return i;
        if (s === !0)
          return xi(i);
        if (m.isFunction(s))
          return s.call(this, i, n);
        if (m.isRegExp(s))
          return s.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, s) {
    if (t = ge(t), t) {
      const n = m.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!s || st(this, this[n], n, s)));
    }
    return !1;
  }
  delete(t, s) {
    const n = this;
    let i = !1;
    function o(r) {
      if (r = ge(r), r) {
        const l = m.findKey(n, r);
        l && (!s || st(n, n[l], l, s)) && (delete n[l], i = !0);
      }
    }
    return m.isArray(t) ? t.forEach(o) : o(t), i;
  }
  clear(t) {
    const s = Object.keys(this);
    let n = s.length, i = !1;
    for (; n--; ) {
      const o = s[n];
      (!t || st(this, this[o], o, t, !0)) && (delete this[o], i = !0);
    }
    return i;
  }
  normalize(t) {
    const s = this, n = {};
    return m.forEach(this, (i, o) => {
      const r = m.findKey(n, o);
      if (r) {
        s[r] = Me(i), delete s[o];
        return;
      }
      const l = t ? Ki(o) : String(o).trim();
      l !== o && delete s[o], s[l] = Me(i), n[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const s = /* @__PURE__ */ Object.create(null);
    return m.forEach(this, (n, i) => {
      n != null && n !== !1 && (s[i] = t && m.isArray(n) ? n.join(", ") : n);
    }), s;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, s]) => t + ": " + s).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...s) {
    const n = new this(t);
    return s.forEach((i) => n.set(i)), n;
  }
  static accessor(t) {
    const n = (this[Vt] = this[Vt] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function o(r) {
      const l = ge(r);
      n[l] || (Qi(i, r), n[l] = !0);
    }
    return m.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
V.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
m.reduceDescriptors(V.prototype, ({ value: e }, t) => {
  let s = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[s] = n;
    }
  };
});
m.freezeMethods(V);
function nt(e, t) {
  const s = this || ke, n = t || s, i = V.from(n.headers);
  let o = n.data;
  return m.forEach(e, function(l) {
    o = l.call(s, o, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), o;
}
function ys(e) {
  return !!(e && e.__CANCEL__);
}
let Fe = class extends v {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(t, s, n) {
    super(t == null ? "canceled" : t, v.ERR_CANCELED, s, n), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function Ss(e, t, s) {
  const n = s.config.validateStatus;
  !s.status || !n || n(s.status) ? e(s) : t(
    new v(
      "Request failed with status code " + s.status,
      [v.ERR_BAD_REQUEST, v.ERR_BAD_RESPONSE][Math.floor(s.status / 100) - 4],
      s.config,
      s.request,
      s
    )
  );
}
function Gi(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Ji(e, t) {
  e = e || 10;
  const s = new Array(e), n = new Array(e);
  let i = 0, o = 0, r;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const c = Date.now(), g = n[o];
    r || (r = c), s[i] = u, n[i] = c;
    let a = o, p = 0;
    for (; a !== i; )
      p += s[a++], a = a % e;
    if (i = (i + 1) % e, i === o && (o = (o + 1) % e), c - r < t)
      return;
    const f = g && c - g;
    return f ? Math.round(p * 1e3 / f) : void 0;
  };
}
function Xi(e, t) {
  let s = 0, n = 1e3 / t, i, o;
  const r = (c, g = Date.now()) => {
    s = g, i = null, o && (clearTimeout(o), o = null), e(...c);
  };
  return [(...c) => {
    const g = Date.now(), a = g - s;
    a >= n ? r(c, g) : (i = c, o || (o = setTimeout(() => {
      o = null, r(i);
    }, n - a)));
  }, () => i && r(i)];
}
const De = (e, t, s = 3) => {
  let n = 0;
  const i = Ji(50, 250);
  return Xi((o) => {
    const r = o.loaded, l = o.lengthComputable ? o.total : void 0, u = r - n, c = i(u), g = r <= l;
    n = r;
    const a = {
      loaded: r,
      total: l,
      progress: l ? r / l : void 0,
      bytes: u,
      rate: c || void 0,
      estimated: c && l && g ? (l - r) / c : void 0,
      event: o,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(a);
  }, s);
}, Ht = (e, t) => {
  const s = e != null;
  return [
    (n) => t[0]({
      lengthComputable: s,
      total: e,
      loaded: n
    }),
    t[1]
  ];
}, Dt = (e) => (...t) => m.asap(() => e(...t)), Zi = L.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (s) => (s = new URL(s, L.origin), e.protocol === s.protocol && e.host === s.host && (t || e.port === s.port)))(
  new URL(L.origin),
  L.navigator && /(msie|trident)/i.test(L.navigator.userAgent)
) : () => !0, Yi = L.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, s, n, i, o, r) {
      if (typeof document == "undefined") return;
      const l = [`${e}=${encodeURIComponent(t)}`];
      m.isNumber(s) && l.push(`expires=${new Date(s).toUTCString()}`), m.isString(n) && l.push(`path=${n}`), m.isString(i) && l.push(`domain=${i}`), o === !0 && l.push("secure"), m.isString(r) && l.push(`SameSite=${r}`), document.cookie = l.join("; ");
    },
    read(e) {
      if (typeof document == "undefined") return null;
      const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return t ? decodeURIComponent(t[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function eo(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function to(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ks(e, t, s) {
  let n = !eo(t);
  return e && (n || s == !1) ? to(e, t) : t;
}
const $t = (e) => e instanceof V ? O({}, e) : e;
function ae(e, t) {
  t = t || {};
  const s = {};
  function n(c, g, a, p) {
    return m.isPlainObject(c) && m.isPlainObject(g) ? m.merge.call({ caseless: p }, c, g) : m.isPlainObject(g) ? m.merge({}, g) : m.isArray(g) ? g.slice() : g;
  }
  function i(c, g, a, p) {
    if (m.isUndefined(g)) {
      if (!m.isUndefined(c))
        return n(void 0, c, a, p);
    } else return n(c, g, a, p);
  }
  function o(c, g) {
    if (!m.isUndefined(g))
      return n(void 0, g);
  }
  function r(c, g) {
    if (m.isUndefined(g)) {
      if (!m.isUndefined(c))
        return n(void 0, c);
    } else return n(void 0, g);
  }
  function l(c, g, a) {
    if (a in t)
      return n(c, g);
    if (a in e)
      return n(void 0, c);
  }
  const u = {
    url: o,
    method: o,
    data: o,
    baseURL: r,
    transformRequest: r,
    transformResponse: r,
    paramsSerializer: r,
    timeout: r,
    timeoutMessage: r,
    withCredentials: r,
    withXSRFToken: r,
    adapter: r,
    responseType: r,
    xsrfCookieName: r,
    xsrfHeaderName: r,
    onUploadProgress: r,
    onDownloadProgress: r,
    decompress: r,
    maxContentLength: r,
    maxBodyLength: r,
    beforeRedirect: r,
    transport: r,
    httpAgent: r,
    httpsAgent: r,
    cancelToken: r,
    socketPath: r,
    responseEncoding: r,
    validateStatus: l,
    headers: (c, g, a) => i($t(c), $t(g), a, !0)
  };
  return m.forEach(Object.keys(O(O({}, e), t)), function(g) {
    if (g === "__proto__" || g === "constructor" || g === "prototype") return;
    const a = m.hasOwnProp(u, g) ? u[g] : i, p = a(e[g], t[g], g);
    m.isUndefined(p) && a !== l || (s[g] = p);
  }), s;
}
const Fs = (e) => {
  const t = ae({}, e);
  let { data: s, withXSRFToken: n, xsrfHeaderName: i, xsrfCookieName: o, headers: r, auth: l } = t;
  if (t.headers = r = V.from(r), t.url = bs(
    ks(t.baseURL, t.url, t.allowAbsoluteUrls),
    e.params,
    e.paramsSerializer
  ), l && r.set(
    "Authorization",
    "Basic " + btoa(
      (l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : "")
    )
  ), m.isFormData(s)) {
    if (L.hasStandardBrowserEnv || L.hasStandardBrowserWebWorkerEnv)
      r.setContentType(void 0);
    else if (m.isFunction(s.getHeaders)) {
      const u = s.getHeaders(), c = ["content-type", "content-length"];
      Object.entries(u).forEach(([g, a]) => {
        c.includes(g.toLowerCase()) && r.set(g, a);
      });
    }
  }
  if (L.hasStandardBrowserEnv && (n && m.isFunction(n) && (n = n(t)), n || n !== !1 && Zi(t.url))) {
    const u = i && o && Yi.read(o);
    u && r.set(i, u);
  }
  return t;
}, so = typeof XMLHttpRequest != "undefined", no = so && function(e) {
  return new Promise(function(s, n) {
    const i = Fs(e);
    let o = i.data;
    const r = V.from(i.headers).normalize();
    let { responseType: l, onUploadProgress: u, onDownloadProgress: c } = i, g, a, p, f, w;
    function b() {
      f && f(), w && w(), i.cancelToken && i.cancelToken.unsubscribe(g), i.signal && i.signal.removeEventListener("abort", g);
    }
    let y = new XMLHttpRequest();
    y.open(i.method.toUpperCase(), i.url, !0), y.timeout = i.timeout;
    function P() {
      if (!y)
        return;
      const A = V.from(
        "getAllResponseHeaders" in y && y.getAllResponseHeaders()
      ), z = {
        data: !l || l === "text" || l === "json" ? y.responseText : y.response,
        status: y.status,
        statusText: y.statusText,
        headers: A,
        config: e,
        request: y
      };
      Ss(
        function(D) {
          s(D), b();
        },
        function(D) {
          n(D), b();
        },
        z
      ), y = null;
    }
    "onloadend" in y ? y.onloadend = P : y.onreadystatechange = function() {
      !y || y.readyState !== 4 || y.status === 0 && !(y.responseURL && y.responseURL.indexOf("file:") === 0) || setTimeout(P);
    }, y.onabort = function() {
      y && (n(new v("Request aborted", v.ECONNABORTED, e, y)), y = null);
    }, y.onerror = function(M) {
      const z = M && M.message ? M.message : "Network Error", Y = new v(z, v.ERR_NETWORK, e, y);
      Y.event = M || null, n(Y), y = null;
    }, y.ontimeout = function() {
      let M = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const z = i.transitional || bt;
      i.timeoutErrorMessage && (M = i.timeoutErrorMessage), n(
        new v(
          M,
          z.clarifyTimeoutError ? v.ETIMEDOUT : v.ECONNABORTED,
          e,
          y
        )
      ), y = null;
    }, o === void 0 && r.setContentType(null), "setRequestHeader" in y && m.forEach(r.toJSON(), function(M, z) {
      y.setRequestHeader(z, M);
    }), m.isUndefined(i.withCredentials) || (y.withCredentials = !!i.withCredentials), l && l !== "json" && (y.responseType = i.responseType), c && ([p, w] = De(c, !0), y.addEventListener("progress", p)), u && y.upload && ([a, f] = De(u), y.upload.addEventListener("progress", a), y.upload.addEventListener("loadend", f)), (i.cancelToken || i.signal) && (g = (A) => {
      y && (n(!A || A.type ? new Fe(null, e, y) : A), y.abort(), y = null);
    }, i.cancelToken && i.cancelToken.subscribe(g), i.signal && (i.signal.aborted ? g() : i.signal.addEventListener("abort", g)));
    const j = Gi(i.url);
    if (j && L.protocols.indexOf(j) === -1) {
      n(
        new v(
          "Unsupported protocol " + j + ":",
          v.ERR_BAD_REQUEST,
          e
        )
      );
      return;
    }
    y.send(o || null);
  });
}, io = (e, t) => {
  const { length: s } = e = e ? e.filter(Boolean) : [];
  if (t || s) {
    let n = new AbortController(), i;
    const o = function(c) {
      if (!i) {
        i = !0, l();
        const g = c instanceof Error ? c : this.reason;
        n.abort(
          g instanceof v ? g : new Fe(g instanceof Error ? g.message : g)
        );
      }
    };
    let r = t && setTimeout(() => {
      r = null, o(new v(`timeout of ${t}ms exceeded`, v.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (r && clearTimeout(r), r = null, e.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(o) : c.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((c) => c.addEventListener("abort", o));
    const { signal: u } = n;
    return u.unsubscribe = () => m.asap(l), u;
  }
}, oo = function* (e, t) {
  let s = e.byteLength;
  if (s < t) {
    yield e;
    return;
  }
  let n = 0, i;
  for (; n < s; )
    i = n + t, yield e.slice(n, i), n = i;
}, ro = function(e, t) {
  return Je(this, null, function* () {
    try {
      for (var s = Ot(lo(e)), n, i, o; n = !(i = yield new se(s.next())).done; n = !1) {
        const r = i.value;
        yield* Xe(oo(r, t));
      }
    } catch (i) {
      o = [i];
    } finally {
      try {
        n && (i = s.return) && (yield new se(i.call(s)));
      } finally {
        if (o)
          throw o[0];
      }
    }
  });
}, lo = function(e) {
  return Je(this, null, function* () {
    if (e[Symbol.asyncIterator]) {
      yield* Xe(e);
      return;
    }
    const t = e.getReader();
    try {
      for (; ; ) {
        const { done: s, value: n } = yield new se(t.read());
        if (s)
          break;
        yield n;
      }
    } finally {
      yield new se(t.cancel());
    }
  });
}, It = (e, t, s, n) => {
  const i = ro(e, t);
  let o = 0, r, l = (c) => {
    r || (r = !0, n && n(c));
  };
  return new ReadableStream(
    {
      pull(c) {
        return te(this, null, function* () {
          try {
            const { done: g, value: a } = yield i.next();
            if (g) {
              l(), c.close();
              return;
            }
            let p = a.byteLength;
            if (s) {
              let f = o += p;
              s(f);
            }
            c.enqueue(new Uint8Array(a));
          } catch (g) {
            throw l(g), g;
          }
        });
      },
      cancel(c) {
        return l(c), i.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
}, zt = 64 * 1024, { isFunction: qe } = m, ao = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(m.global), { ReadableStream: xt, TextEncoder: Wt } = m.global, Kt = (e, ...t) => {
  try {
    return !!e(...t);
  } catch (s) {
    return !1;
  }
}, co = (e) => {
  e = m.merge.call(
    {
      skipUndefined: !0
    },
    ao,
    e
  );
  const { fetch: t, Request: s, Response: n } = e, i = t ? qe(t) : typeof fetch == "function", o = qe(s), r = qe(n);
  if (!i)
    return !1;
  const l = i && qe(xt), u = i && (typeof Wt == "function" ? /* @__PURE__ */ ((w) => (b) => w.encode(b))(new Wt()) : (w) => te(null, null, function* () {
    return new Uint8Array(yield new s(w).arrayBuffer());
  })), c = o && l && Kt(() => {
    let w = !1;
    const b = new s(L.origin, {
      body: new xt(),
      method: "POST",
      get duplex() {
        return w = !0, "half";
      }
    }).headers.has("Content-Type");
    return w && !b;
  }), g = r && l && Kt(() => m.isReadableStream(new n("").body)), a = {
    stream: g && ((w) => w.body)
  };
  i && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((w) => {
    !a[w] && (a[w] = (b, y) => {
      let P = b && b[w];
      if (P)
        return P.call(b);
      throw new v(
        `Response type '${w}' is not supported`,
        v.ERR_NOT_SUPPORT,
        y
      );
    });
  });
  const p = (w) => te(null, null, function* () {
    if (w == null)
      return 0;
    if (m.isBlob(w))
      return w.size;
    if (m.isSpecCompliantForm(w))
      return (yield new s(L.origin, {
        method: "POST",
        body: w
      }).arrayBuffer()).byteLength;
    if (m.isArrayBufferView(w) || m.isArrayBuffer(w))
      return w.byteLength;
    if (m.isURLSearchParams(w) && (w = w + ""), m.isString(w))
      return (yield u(w)).byteLength;
  }), f = (w, b) => te(null, null, function* () {
    const y = m.toFiniteNumber(w.getContentLength());
    return y == null ? p(b) : y;
  });
  return (w) => te(null, null, function* () {
    let {
      url: b,
      method: y,
      data: P,
      signal: j,
      cancelToken: A,
      timeout: M,
      onDownloadProgress: z,
      onUploadProgress: Y,
      responseType: D,
      headers: Ke,
      withCredentials: Re = "same-origin",
      fetchOptions: St
    } = Fs(w), kt = t || fetch;
    D = D ? (D + "").toLowerCase() : "text";
    let ve = io(
      [j, A && A.toAbortSignal()],
      M
    ), pe = null;
    const ee = ve && ve.unsubscribe && (() => {
      ve.unsubscribe();
    });
    let Ft;
    try {
      if (Y && c && y !== "get" && y !== "head" && (Ft = yield f(Ke, P)) !== 0) {
        let Q = new s(b, {
          method: "POST",
          body: P,
          duplex: "half"
        }), ce;
        if (m.isFormData(P) && (ce = Q.headers.get("content-type")) && Ke.setContentType(ce), Q.body) {
          const [Qe, Ce] = Ht(
            Ft,
            De(Dt(Y))
          );
          P = It(Q.body, zt, Qe, Ce);
        }
      }
      m.isString(Re) || (Re = Re ? "include" : "omit");
      const U = o && "credentials" in s.prototype, Rt = G(O({}, St), {
        signal: ve,
        method: y.toUpperCase(),
        headers: Ke.normalize().toJSON(),
        body: P,
        duplex: "half",
        credentials: U ? Re : void 0
      });
      pe = o && new s(b, Rt);
      let K = yield o ? kt(pe, St) : kt(b, Rt);
      const vt = g && (D === "stream" || D === "response");
      if (g && (z || vt && ee)) {
        const Q = {};
        ["status", "statusText", "headers"].forEach((Ct) => {
          Q[Ct] = K[Ct];
        });
        const ce = m.toFiniteNumber(K.headers.get("content-length")), [Qe, Ce] = z && Ht(
          ce,
          De(Dt(z), !0)
        ) || [];
        K = new n(
          It(K.body, zt, Qe, () => {
            Ce && Ce(), ee && ee();
          }),
          Q
        );
      }
      D = D || "text";
      let _s = yield a[m.findKey(a, D) || "text"](
        K,
        w
      );
      return !vt && ee && ee(), yield new Promise((Q, ce) => {
        Ss(Q, ce, {
          data: _s,
          headers: V.from(K.headers),
          status: K.status,
          statusText: K.statusText,
          config: w,
          request: pe
        });
      });
    } catch (U) {
      throw ee && ee(), U && U.name === "TypeError" && /Load failed|fetch/i.test(U.message) ? Object.assign(
        new v(
          "Network Error",
          v.ERR_NETWORK,
          w,
          pe,
          U && U.response
        ),
        {
          cause: U.cause || U
        }
      ) : v.from(U, U && U.code, w, pe, U && U.response);
    }
  });
}, uo = /* @__PURE__ */ new Map(), Rs = (e) => {
  let t = e && e.env || {};
  const { fetch: s, Request: n, Response: i } = t, o = [n, i, s];
  let r = o.length, l = r, u, c, g = uo;
  for (; l--; )
    u = o[l], c = g.get(u), c === void 0 && g.set(u, c = l ? /* @__PURE__ */ new Map() : co(t)), g = c;
  return c;
};
Rs();
const yt = {
  http: Oi,
  xhr: no,
  fetch: {
    get: Rs
  }
};
m.forEach(yt, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch (s) {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Qt = (e) => `- ${e}`, ho = (e) => m.isFunction(e) || e === null || e === !1;
function fo(e, t) {
  e = m.isArray(e) ? e : [e];
  const { length: s } = e;
  let n, i;
  const o = {};
  for (let r = 0; r < s; r++) {
    n = e[r];
    let l;
    if (i = n, !ho(n) && (i = yt[(l = String(n)).toLowerCase()], i === void 0))
      throw new v(`Unknown adapter '${l}'`);
    if (i && (m.isFunction(i) || (i = i.get(t))))
      break;
    o[l || "#" + r] = i;
  }
  if (!i) {
    const r = Object.entries(o).map(
      ([u, c]) => `adapter ${u} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let l = s ? r.length > 1 ? `since :
` + r.map(Qt).join(`
`) : " " + Qt(r[0]) : "as no adapter specified";
    throw new v(
      "There is no suitable adapter to dispatch the request " + l,
      "ERR_NOT_SUPPORT"
    );
  }
  return i;
}
const vs = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: fo,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: yt
};
function it(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Fe(null, e);
}
function Gt(e) {
  return it(e), e.headers = V.from(e.headers), e.data = nt.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), vs.getAdapter(e.adapter || ke.adapter, e)(e).then(
    function(n) {
      return it(e), n.data = nt.call(e, e.transformResponse, n), n.headers = V.from(n.headers), n;
    },
    function(n) {
      return ys(n) || (it(e), n && n.response && (n.response.data = nt.call(
        e,
        e.transformResponse,
        n.response
      ), n.response.headers = V.from(n.response.headers))), Promise.reject(n);
    }
  );
}
const Cs = "1.13.6", We = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  We[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Jt = {};
We.transitional = function(t, s, n) {
  function i(o, r) {
    return "[Axios v" + Cs + "] Transitional option '" + o + "'" + r + (n ? ". " + n : "");
  }
  return (o, r, l) => {
    if (t === !1)
      throw new v(
        i(r, " has been removed" + (s ? " in " + s : "")),
        v.ERR_DEPRECATED
      );
    return s && !Jt[r] && (Jt[r] = !0, console.warn(
      i(
        r,
        " has been deprecated since v" + s + " and will be removed in the near future"
      )
    )), t ? t(o, r, l) : !0;
  };
};
We.spelling = function(t) {
  return (s, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function po(e, t, s) {
  if (typeof e != "object")
    throw new v("options must be an object", v.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let i = n.length;
  for (; i-- > 0; ) {
    const o = n[i], r = t[o];
    if (r) {
      const l = e[o], u = l === void 0 || r(l, o, e);
      if (u !== !0)
        throw new v(
          "option " + o + " must be " + u,
          v.ERR_BAD_OPTION_VALUE
        );
      continue;
    }
    if (s !== !0)
      throw new v("Unknown option " + o, v.ERR_BAD_OPTION);
  }
}
const Ue = {
  assertOptions: po,
  validators: We
}, I = Ue.validators;
let le = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Bt(),
      response: new Bt()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(t, s) {
    return te(this, null, function* () {
      try {
        return yield this._request(t, s);
      } catch (n) {
        if (n instanceof Error) {
          let i = {};
          Error.captureStackTrace ? Error.captureStackTrace(i) : i = new Error();
          const o = i.stack ? i.stack.replace(/^.+\n/, "") : "";
          try {
            n.stack ? o && !String(n.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + o) : n.stack = o;
          } catch (r) {
          }
        }
        throw n;
      }
    });
  }
  _request(t, s) {
    typeof t == "string" ? (s = s || {}, s.url = t) : s = t || {}, s = ae(this.defaults, s);
    const { transitional: n, paramsSerializer: i, headers: o } = s;
    n !== void 0 && Ue.assertOptions(
      n,
      {
        silentJSONParsing: I.transitional(I.boolean),
        forcedJSONParsing: I.transitional(I.boolean),
        clarifyTimeoutError: I.transitional(I.boolean),
        legacyInterceptorReqResOrdering: I.transitional(I.boolean)
      },
      !1
    ), i != null && (m.isFunction(i) ? s.paramsSerializer = {
      serialize: i
    } : Ue.assertOptions(
      i,
      {
        encode: I.function,
        serialize: I.function
      },
      !0
    )), s.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : s.allowAbsoluteUrls = !0), Ue.assertOptions(
      s,
      {
        baseUrl: I.spelling("baseURL"),
        withXsrfToken: I.spelling("withXSRFToken")
      },
      !0
    ), s.method = (s.method || this.defaults.method || "get").toLowerCase();
    let r = o && m.merge(o.common, o[s.method]);
    o && m.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (w) => {
      delete o[w];
    }), s.headers = V.concat(r, o);
    const l = [];
    let u = !0;
    this.interceptors.request.forEach(function(b) {
      if (typeof b.runWhen == "function" && b.runWhen(s) === !1)
        return;
      u = u && b.synchronous;
      const y = s.transitional || bt;
      y && y.legacyInterceptorReqResOrdering ? l.unshift(b.fulfilled, b.rejected) : l.push(b.fulfilled, b.rejected);
    });
    const c = [];
    this.interceptors.response.forEach(function(b) {
      c.push(b.fulfilled, b.rejected);
    });
    let g, a = 0, p;
    if (!u) {
      const w = [Gt.bind(this), void 0];
      for (w.unshift(...l), w.push(...c), p = w.length, g = Promise.resolve(s); a < p; )
        g = g.then(w[a++], w[a++]);
      return g;
    }
    p = l.length;
    let f = s;
    for (; a < p; ) {
      const w = l[a++], b = l[a++];
      try {
        f = w(f);
      } catch (y) {
        b.call(this, y);
        break;
      }
    }
    try {
      g = Gt.call(this, f);
    } catch (w) {
      return Promise.reject(w);
    }
    for (a = 0, p = c.length; a < p; )
      g = g.then(c[a++], c[a++]);
    return g;
  }
  getUri(t) {
    t = ae(this.defaults, t);
    const s = ks(t.baseURL, t.url, t.allowAbsoluteUrls);
    return bs(s, t.params, t.paramsSerializer);
  }
};
m.forEach(["delete", "get", "head", "options"], function(t) {
  le.prototype[t] = function(s, n) {
    return this.request(
      ae(n || {}, {
        method: t,
        url: s,
        data: (n || {}).data
      })
    );
  };
});
m.forEach(["post", "put", "patch"], function(t) {
  function s(n) {
    return function(o, r, l) {
      return this.request(
        ae(l || {}, {
          method: t,
          headers: n ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: o,
          data: r
        })
      );
    };
  }
  le.prototype[t] = s(), le.prototype[t + "Form"] = s(!0);
});
let go = class Ps {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let s;
    this.promise = new Promise(function(o) {
      s = o;
    });
    const n = this;
    this.promise.then((i) => {
      if (!n._listeners) return;
      let o = n._listeners.length;
      for (; o-- > 0; )
        n._listeners[o](i);
      n._listeners = null;
    }), this.promise.then = (i) => {
      let o;
      const r = new Promise((l) => {
        n.subscribe(l), o = l;
      }).then(i);
      return r.cancel = function() {
        n.unsubscribe(o);
      }, r;
    }, t(function(o, r, l) {
      n.reason || (n.reason = new Fe(o, r, l), s(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const s = this._listeners.indexOf(t);
    s !== -1 && this._listeners.splice(s, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), s = (n) => {
      t.abort(n);
    };
    return this.subscribe(s), t.signal.unsubscribe = () => this.unsubscribe(s), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Ps(function(i) {
        t = i;
      }),
      cancel: t
    };
  }
};
function mo(e) {
  return function(s) {
    return e.apply(null, s);
  };
}
function bo(e) {
  return m.isObject(e) && e.isAxiosError === !0;
}
const dt = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(dt).forEach(([e, t]) => {
  dt[t] = e;
});
function Os(e) {
  const t = new le(e), s = rs(le.prototype.request, t);
  return m.extend(s, le.prototype, t, { allOwnKeys: !0 }), m.extend(s, t, null, { allOwnKeys: !0 }), s.create = function(i) {
    return Os(ae(e, i));
  }, s;
}
const T = Os(ke);
T.Axios = le;
T.CanceledError = Fe;
T.CancelToken = go;
T.isCancel = ys;
T.VERSION = Cs;
T.toFormData = xe;
T.AxiosError = v;
T.Cancel = T.CanceledError;
T.all = function(t) {
  return Promise.all(t);
};
T.spread = mo;
T.isAxiosError = bo;
T.mergeConfig = ae;
T.AxiosHeaders = V;
T.formToJSON = (e) => ws(m.isHTMLForm(e) ? new FormData(e) : e);
T.getAdapter = vs.getAdapter;
T.HttpStatusCode = dt;
T.default = T;
const {
  Axios: Xl,
  AxiosError: Zl,
  CanceledError: Yl,
  isCancel: ea,
  CancelToken: ta,
  VERSION: sa,
  all: na,
  Cancel: ia,
  isAxiosError: oa,
  spread: ra,
  toFormData: la,
  AxiosHeaders: aa,
  HttpStatusCode: ca,
  formToJSON: ua,
  getAdapter: da,
  mergeConfig: ha
} = T, wo = {
  computed: {
    /**
     * Just a debug flag
     *
     */
    DEBUG() {
      return this.verbose;
    },
    /**
     * The axios instance to use: the table's own, else the plugin's, else the default axios.
     *
     */
    axiosFinal() {
      return this.axios || this.$globalVueQuintableaxios || T;
    },
    /**
     * The config with every default filled in (see config.ts)
     *
     */
    configFinal() {
      return qn(
        this.config,
        this.quintableDefaults,
        this.identifier,
        this.paginationOptions
      );
    }
  }
};
function yo(e, t) {
  let s = typeof e.sortValue != "undefined" && e.sortValue !== null ? e.sortValue : e.html ? e.html : e.text;
  return typeof e.computeSortValue == "function" && (s = e.computeSortValue(t)), typeof s == "string" && (s = s.toLowerCase()), isNaN(s) || (s = parseFloat(s)), s;
}
function So(e, t, s) {
  const n = e.map((r) => ({
    row: r,
    cells: r.cells ? r.cells : r,
    values: [],
    known: []
  })), i = (r, l) => (r.known[l] || (r.values[l] = yo(r.cells[t[l].index], s), r.known[l] = !0), r.values[l]), o = (r, l, u) => {
    const c = i(r, u), g = i(l, u), a = !t[u + 1];
    return t[u].asc ? c > g ? 1 : c < g ? -1 : a ? 1 : o(r, l, u + 1) : c < g ? 1 : c > g || a ? -1 : o(r, l, u + 1);
  };
  return n.sort((r, l) => o(r, l, 0)), n.forEach((r, l) => e[l] = r.row), e;
}
const ko = {
  computed: {
    /**
     * Calculates the number of active sorts
     *
     */
    numberOfSorts() {
      return Object.keys(this.currentSortIndexes).length;
    },
    /**
     * Calculates columns which can be sorted from config value
     *
     */
    sortingColumns() {
      const e = {};
      for (const t in this.currentSortIndexes)
        e[t] = this.configFinal.columns[t];
      return e;
    },
    // accessible: a sortable heading can take focus and says how its column is sorted.
    _headerA11y() {
      return this.configFinal.headlines.map((e, t) => {
        if (!this.configFinal.sorts[t])
          return {};
        const s = this.currentSortIndexes[t];
        return {
          tabindex: 0,
          "aria-sort": s ? s.asc ? "ascending" : "descending" : "none"
        };
      });
    },
    /**
     * Checks if page sort is currently active. Special case: no user action in place
     *
     */
    pageSort: {
      get() {
        return this.customPageSort === null ? this.configFinal.pageSort : this.customPageSort;
      },
      set(e) {
        this.customPageSort = e;
      }
    }
  },
  methods: {
    /**
     *
     *
     * @param index Index of removed sorting column
     */
    removeSort(e) {
      for (const t in this.currentSortIndexes) {
        const s = this.currentSortIndexes[t];
        s.order > this.currentSortIndexes[e].order && s.order--, this.currentSortIndexes[t] = s;
      }
      if (delete this.currentSortIndexes[e], this.numberOfSorts !== 0) {
        this.sort();
        return;
      }
      this.resetSorts(), this.currentPage !== 1 ? this.currentPage = 1 : this.recomputeEssentials(), this.configFinal.ajaxUrl && !this.pageSort && this.loadViaAjax(!0, !0, "SORT");
    },
    resetSorts() {
      const e = /* @__PURE__ */ new Map();
      for (let s = 0, n = this.rowsFinal.length; s < n; s++)
        e.set(s.toString(), s);
      const t = lt(this.sortedIndexes, e);
      t && (this.sortedIndexes = t);
    },
    /**
     * Add a column to the sorting or change the sort direction of set sorting column
     *
     * @param sortIndex the column
     * @param asc bool if it shall be set to a direction
     */
    setSortColumn(e, t) {
      const s = parseInt(e), n = e.toString();
      if (!this.configFinal.sorts[s])
        return;
      let i;
      this.currentSortIndexes[n] ? (i = this.currentSortIndexes[n], i.asc = !i.asc) : (this.multiSort || (this.currentSortIndexes = {}), i = {
        headline: this.configFinal.headlines[s],
        index: s,
        asc: this.configFinal.sorts[s] === !0 || this.configFinal.sorts[s] === "ASC",
        order: this.numberOfSorts
      }), typeof t != "undefined" && (i.asc = t), this.currentSortIndexes[s] = i, this.configFinal.storeState && localStorage.setItem(
        `vue-quintable-${this.identifier}-sort-indexes`,
        JSON.stringify(this.currentSortIndexes)
      ), this.$emit("update:sort", this.currentSortIndexes, "update:sort"), this.sort();
    },
    // sort-icon slot: "asc", "desc" or null for an unsorted column.
    _sortDirection(e) {
      const t = this.currentSortIndexes[e];
      return t ? t.asc ? "asc" : "desc" : null;
    },
    /**
     * The actual sorting process. Sort by sorting value or the inner text/html of the cells
     *
     */
    sort(e = !1) {
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        this.loadViaAjax(!e, !e, "SORT");
        return;
      }
      const t = this.pageSort, s = this.configFinal.pagination, n = this.rowsFinal.slice();
      let i = [], o = null, r = {};
      if (t) {
        if (o = new Set(this.visibleRowIndexes), !o.size) {
          const f = s || this.rowsFinal.length;
          for (let w = 0; w < f; w++)
            o.add(w);
        }
        let p = 0;
        for (let f = 0; f < n.length; f++)
          be(n[f], "index", f), o.has(f) && (p < s && i.push(n[f]), p++);
        if (Object.keys(this.sortedIndexes).length)
          r = O({}, this.sortedIndexes);
        else
          for (let f = 0; f < n.length; f++)
            r[f.toString()] = f;
      } else {
        i = n;
        for (let p = 0; p < i.length; p++)
          be(i[p], "index", p);
      }
      const l = [];
      for (const p in this.currentSortIndexes) {
        const f = this.currentSortIndexes[p];
        f.index = p, l.push(f);
      }
      l.sort((p, f) => p.order - f.order), So(i, l, this.currentSortIndexes);
      let u = 0, c = 0;
      const g = /* @__PURE__ */ new Map();
      for (let p = 0; p < n.length; p++) {
        let f;
        t && o.has(p) ? (f = u < s ? i[c++] : n[r[p.toString()]], u++) : t ? f = n[r[p.toString()]] : f = i[p], g.set(p.toString(), parseInt(f.index));
      }
      const a = lt(this.sortedIndexes, g);
      a && (this.sortedIndexes = a), !t && !e && (this.currentPage = 1), !this.configFinal.selectAllRows && !t && !e && !this.configFinal.keepSelect && this.resetSelect("sort method"), this.recomputeEssentials();
    }
  }
}, Fo = {
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
      return !this.configFinal.storeState || !this.storedState.filters ? this.filters : this.storedState.filters;
    },
    /**
     * Calculates all rows which passes the filter and search restrictions
     *
     */
    filteredRows() {
      const e = this._searchAndFilter();
      return this.configFinal.columnFilters && !this.configFinal.ajaxUrl && this._columnFilterActive ? this._applyColumnFilters(e) : e;
    },
    // highlightSearch: the lower-case query the text cells mark, "" while none is searched.
    _markQuery() {
      if (!this.configFinal.search)
        return "";
      const e = String(
        this.configFinal.searchDebounce && !this.configFinal.ajaxUrl ? this.debouncedQuery : this.query
      );
      return e.length >= this.configFinal.searchLength ? e.toLowerCase() : "";
    },
    // What filter.ts needs from the table.
    _filterContext() {
      return {
        groups: this.filterGroups,
        operators: this.operatorFunctions,
        operatorNames: this.operators,
        defaultOperator: this.defaultOperator,
        debug: this.DEBUG
      };
    }
  },
  methods: {
    // The rows that pass search and filters (filteredRows without the column filters).
    _searchAndFilter() {
      if (this.configFinal.ajaxUrl)
        return this.rowsFinal;
      const e = this.rowsFinal, t = new Array(e.length).fill(!0), s = this.configFinal.search, n = () => this.configFinal.searchDebounce ? this.debouncedQuery : this.query;
      if (!s && !this.filterActive || !this.filterActive && s && n().length < this.configFinal.searchLength)
        return t;
      const i = this.filterActive;
      let o, r, l = null;
      for (let u = 0; u < e.length; u++) {
        const c = e[u];
        let g = !1;
        if (o === void 0 && (o = s && n().length >= this.configFinal.searchLength), o && !r) {
          const a = (n() + "").toLowerCase(), p = this.configFinal.useFuzzySearch;
          r = (f) => {
            const w = (f + "").toLowerCase();
            return p && pn(w, a).score > 6 || w.indexOf(a) !== -1;
          };
        }
        if (o) {
          const a = W(c);
          for (let p = 0, f = a.length; p < f && !g; p++) {
            const w = a[p], b = w.html, y = b || w.text;
            g = !!y && r(y);
          }
          if (c.keywords)
            for (let p = 0; p < c.keywords.length && !g; p++)
              g = r(c.keywords[p]);
        }
        i && !c.filters ? g = !1 : i && (!o || g) && (this.filterGroups.length ? g = this.doFiltering(c.filters) : (l = l || {
          items: Object.keys(this.filtersFinal).map((a) => ({ name: a })),
          relation: this.configFinal.filterRelation
        }, g = this.doFilteringForGroup(
          this.filtersFinal,
          c.filters,
          l
        ), this.DEBUG && console.log("FILTER GROUPS CALCULATED", this.filterGroups)), this.DEBUG && (console.log(`
`), console.log("ROW " + u, g, c.filters), console.log(`
`))), t[u] = g;
      }
      return t;
    },
    // searchDebounce: follows the typed query after the pause; at once without one.
    _debounceQuery(e) {
      clearTimeout(this._debounceTimer);
      const t = this.configFinal.searchDebounce;
      if (!t || this.configFinal.ajaxUrl) {
        this.debouncedQuery = e;
        return;
      }
      this._debounceTimer = setTimeout(() => {
        this.debouncedQuery = e;
      }, t);
    },
    /**
     * sets search query from outside (search slot)
     *
     */
    setSearchQuery(e) {
      this.query = e;
    },
    /**
     * Do the filtering for all rows against all groups
     *
     * @param filterValues the set filter keys and values
     *
     * @returns {boolean}
     */
    doFiltering(e) {
      return Nn(
        this.filtersFinal,
        e,
        this.configFinal.filterGroupRelation,
        this._filterContext
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
    doFilteringForGroup(e, t, s, n = 0) {
      return Ve(
        e,
        t,
        s,
        this._filterContext,
        n
      );
    },
    /**
     *
     * Helper method to calculate an array of filter values from value/array/object
     *
     */
    getFilterValues: ft,
    /**
     * Search a certain filter key in a filter group
     *
     * @param key the filter key
     * @param arr the group
     * @param index just a counter
     * @returns {boolean}
     */
    findInFilterGroups: pt
  }
}, Ro = {
  computed: {
    /**
     * Calculates if something is currently loading via ajax
     *
     */
    ajaxLoading() {
      return this.loading || this.fetching;
    }
  },
  methods: {
    // ajaxHeaders: the request's own headers, or null without the option.
    _ajaxHeaders(e) {
      const t = this.configFinal.ajaxHeaders;
      return typeof t == "function" ? t(e) : t;
    },
    // error slot: loads the current page again.
    _reloadPage() {
      this.loadViaAjax(!1, !0, "RELOAD");
    },
    _wrapperHeight() {
      const e = this.$refs["height-wrapper"];
      return e ? e.clientHeight : 0;
    },
    /**
     * Load new rows via ajax including filters, search query and pagination
     *
     * @param clearSortAndPage
     * @param clearSelected
     * @param accessor
     */
    loadViaAjax(e = !1, t = !0, s = null) {
      this.DEBUG && console.log("CALLED FROM:", s);
      const n = this.configFinal.searchLength;
      let i = this.query;
      if (i && i.length < n && (this.lastQuery.length < i.length || this.lastQuery.length < n))
        return;
      if (!i && this.lastQuery) {
        const c = this.lastQuery;
        if (this.lastQuery = "", c.length < n)
          return;
      } else i && i.length < n && (i = "");
      this.cancelSource && this.cancelSource.cancel("Operation canceled by the user."), this.clearLists(t), this.ajaxRows = [], e && (this.currentPage = 1, this.resetSelect("loadViaAjax method")), this.loaderHeight = this._wrapperHeight(), this.fetching = !0, this.ajaxError = null;
      const o = G(O({
        search: i,
        filters: this.filtersFinal,
        perPage: this.currentRowsPerPage,
        page: this.currentPage
      }, this.configFinal.columnFilters ? { columnFilters: this.columnFilterValues } : null), {
        hiddenColumns: this.configFinal.columnPicker ? this.configFinal.columns.map((c, g) => !!this._isHiddenCol(g)) : this.configFinal.hiddenCols,
        sort: this.numberOfSorts > 0 ? {
          indexes: this.currentSortIndexes,
          columns: this.sortingColumns
        } : null
      });
      this.cancelSource = this.axiosFinal.CancelToken.source();
      const r = this.configFinal.requestMethod, l = (c) => this.axiosFinal.request(this.configFinal.ajaxUrl, {
        method: r,
        params: r === "GET" ? o : null,
        data: r === "POST" ? o : null,
        cancelToken: this.cancelSource.token,
        headers: O({
          "Content-Type": "application/json"
        }, c)
      });
      let u;
      try {
        const c = this._ajaxHeaders(o);
        u = c && typeof c.then == "function" ? c.then(l) : l(c);
      } catch (c) {
        u = Promise.reject(c);
      }
      u.then((c) => {
        if (!c.data.rows || typeof c.data.rows.length == "undefined")
          throw "Response data has to contain rows property. Please see Readme.md for details";
        if (typeof c.data.all == "undefined")
          throw "Response data has to contain all property. Please see Readme.md for details";
        if (this._restoredPage !== void 0 && o.page === this._restoredPage) {
          this._restoredPage = void 0;
          const g = this.currentRowsPerPage, a = g === "All" ? 1 : Math.max(1, Math.ceil(c.data.all / g));
          if (o.page > a) {
            this._dropRestoredPage();
            return;
          }
        }
        this.ajaxAll = c.data.all, this.ajaxPages = Math.max(
          1,
          Math.ceil(c.data.all / this.currentRowsPerPage)
        ), this.$emit(
          "ajax:rows",
          {
            rows: c.data.rows,
            old: JSON.parse(JSON.stringify(this.ajaxRows)),
            all: this.ajaxAll
          },
          "ajax:rows"
        ), c.data.all && (this.ajaxRows = c.data.rows, this.initLists()), this.fetching = !1;
      }).catch((c) => {
        this.axiosFinal.isCancel(c) ? console.log("Request canceled", c.message) : (this.fetching = !1, this.ajaxError = c, console.error(c), this.$emit("ajax:error", c, "ajax:error"));
      });
    }
  }
}, vo = {
  computed: {
    /**
     * Calculates number of current rows per page. Special case: no user action in place
     *
     */
    currentRowsPerPageProperty: {
      get() {
        return this.customRowsPerPage || this.currentRowsPerPage;
      },
      set(e) {
        this.customRowsPerPage = e;
      }
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
        this.paginationOptions
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
      if (this.configFinal.ajaxUrl)
        return this.ajaxAll;
      let e = 0;
      for (const t of this.filteredRows)
        t && e++;
      return e;
    },
    /**
     * Calculates all accessible pages regarding to page range and current page
     *
     */
    visiblePages() {
      let e;
      if (this.pages < this.pageRange || this.currentPage === 1)
        e = 1;
      else if (this.currentPage === this.pages)
        e = this.currentPage - (this.pageRange - 1);
      else {
        let s;
        this.pageRange % 2 === 0 ? s = this.pageRange / 2 : (s = (this.pageRange - 1) / 2, this.currentPage + s > this.pages && s++), e = this.currentPage - s;
      }
      e = Math.max(e + this.pageOffset, 1);
      const t = [];
      for (let s = 0; s < this.pageRange && s + e <= this.pages; s++)
        t.push(s + e);
      return t;
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
      return this.configFinal.ajaxUrl ? !this.ajaxAll && !this.query && !Object.keys(this.filtersFinal || {}).length : !this.rowsFinal.length;
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
    }
  },
  methods: {
    /**
     * Change page with certain value
     *
     * @param page
     */
    gotoPage(e) {
      e === "prev" ? this.currentPage - 1 > 0 && this.currentPage-- : e === "next" ? this.currentPage + 1 <= this.pages && this.currentPage++ : e === "first" ? this.currentPage = 1 : e === "last" ? this.currentPage = this.pages : this.currentPage = e;
    },
    /**
     * Calculate which pages should be displayed in pagination due to page offset
     *
     */
    updatePageOffset(e) {
      const t = this.pageOffset + this.pageRange * e;
      if (e > 0) {
        const s = Math.min(t, this.pages - this.pageRange);
        this.pageOffset = Math.min(s, this.pages - this.currentPage);
      } else e < 0 ? this.pageOffset = Math.max(t, -(this.pages - this.pageRange)) : this.pageOffset = 0;
    }
  }
}, Co = {
  computed: {
    /**
     * Calculates the all selected flag. Special case: defaultSelected is set and no user action in place
     *
     */
    allSelectedProperty: {
      get() {
        return this.allSelectedCustom === null ? this.configFinal.defaultSelected : this.allSelectedCustom;
      },
      set(e) {
        this.allSelectedCustom = e;
      }
    },
    /**
     * Checks if some rows are selected
     *
     */
    someSelected() {
      return Object.values(this.selected).some((e) => e);
    }
  },
  methods: {
    // The rows a select-all covers that can be selected: the visible ones, or all rows with selectAllRows.
    _selectableCount() {
      const e = this.rowsFinal;
      if (this.configFinal.selectAllRows)
        return e.filter((s) => !s.disableSelect).length;
      let t;
      return e.filter(
        (s, n) => !s.disableSelect && (t || (t = this.visibleRows))[n]
      ).length;
    },
    /**
     * Select all relevant rows
     *
     */
    checkAll(e = !1) {
      const t = e ? !0 : this.allSelectedProperty, s = this.configFinal.selectAllRows ? this.filteredRows : this.visibleRows;
      let n = 0;
      const i = this.selected, o = Z(this.sortedIndexes), r = this.rowsFinal;
      for (const l in o) {
        const u = o[l];
        !r[u].disableSelect && s[u] ? (be(i, u, t), n++) : be(i, u, !1);
      }
      t && (this.allSelectedCustom = n && n === this._selectableCount());
    },
    /**
     * Event listener for select row checkboxes. Checks if all rows are selected now and sets the allSelectedProperty in case
     *
     * @param bool selected or not
     * @param index index of selected row
     */
    checkListener(e, t) {
      const s = Z(this.selected), n = this.rowsFinal;
      let i = Object.keys(s).map((o) => {
        const r = n[parseInt(o)];
        return !!s[o] || !!(r && r.disableSelect);
      });
      if (i[t] = !!e, !this.configFinal.selectAllRows) {
        const o = new Set(this.visibleRowIndexes);
        i = i.filter((r, l) => o.has(l));
      }
      this.allSelectedProperty = !i.includes(!1);
    },
    // select-checkbox slot: sets a row's checkbox (or flips it without a value), as a click on the checkbox does.
    _toggleSelect(e, t) {
      if (this.rowsFinal[e].disableSelect)
        return;
      const s = typeof t == "boolean" ? t : !this.selected[e];
      this.selected[e] = s, this.checkListener(s, e);
    },
    // select-all-checkbox slot: sets "select all" (or flips it without a value), as a click on its checkbox does.
    _toggleSelectAll(e) {
      this.allSelectedProperty = typeof e == "boolean" ? e : !this.allSelectedProperty, this.checkAll();
    },
    /**
     * Clear all row selections
     *
     */
    resetSelect(e) {
      this.DEBUG && console.log("CALLED FROM:", e), this.allSelectedProperty = !1;
      const t = this.selected;
      for (let s = 0, n = this.rowsFinal.length; s < n; s++)
        be(t, s, !1);
    },
    checkStoredSelectedRows(e = !1) {
      if (!this.storedState["selected-rows"])
        return;
      this.selected = JSON.parse(
        JSON.stringify(this.storedState["selected-rows"])
      );
      const t = Object.values(this.selected).filter((n) => n).length, s = this.configFinal.selectAllRows ? this.rowsFinal.length : this.visibleRows.filter((n) => n).length;
      this.allSelectedCustom = t && t === s, e && delete this.storedState["selected-rows"];
    }
  }
}, Po = "bg-muted", Oo = "a, button, input, select, textarea, label, [role='button']", _o = ".quintable--toggle-button";
function Xt(e) {
  let t = typeof e.composedPath == "function" ? e.composedPath() : [];
  if (t.length) {
    const s = e.currentTarget && e.currentTarget.getRootNode();
    return s ? t.filter((n) => !(n instanceof Node) || n.getRootNode() === s) : t;
  }
  for (let s = e.target; s; s = s.parentNode)
    t.push(s);
  return t;
}
const Eo = {
  methods: {
    /**
     * Handler for generic component events
     *
     */
    handleComponentEvent(e) {
      this.$emit("component:event", e, "component:event");
    },
    /**
     * ignoreControlClicks: a click on a link, button or form field inside the row or cell is the control's own, so
     * the row and the cell emit nothing and leave the event alone. A disabled control does nothing of its own: a
     * click on it stays the row's.
     */
    _isControlClick(e) {
      if (!this.configFinal.ignoreControlClicks || !(e.target instanceof Element) || !(e.currentTarget instanceof Element))
        return !1;
      const t = Xt(e), s = t.slice(0, t.indexOf(e.currentTarget) + 1).find(
        (i) => i instanceof Element && i.matches(Oo) && !i.matches(_o)
      );
      if (!s)
        return !1;
      const n = s instanceof HTMLLabelElement ? s.control : s;
      return !(n != null && n.disabled);
    },
    /**
     * cellTitles: an element in a body cell that cuts its text with `text-overflow: ellipsis` shows the whole text
     * as its title while the text is cut. An own title, or a tooltip on the cell, wins. Hover only: touch screens
     * get no title.
     */
    onCellMouseover(e) {
      if (!this.configFinal.cellTitles || !(e.target instanceof Element))
        return;
      const t = e.target.closest("td");
      if (!t || t.hasAttribute("title") || t.hasAttribute("aria-describedby"))
        return;
      let s = e.target;
      for (; getComputedStyle(s).textOverflow !== "ellipsis"; ) {
        if (s === t)
          return;
        s = s.parentElement;
      }
      s.hasAttribute("title") && !s.dataset.quintableTitle || (s.scrollWidth > s.clientWidth ? (s.title = s.textContent.trim(), s.dataset.quintableTitle = "1") : s.dataset.quintableTitle && (s.removeAttribute("title"), delete s.dataset.quintableTitle));
    },
    /**
     * Check if a parent with certain class exists (kept for compatibility; onRowClick checks the event's path)
     *
     */
    hasSomeParentTheClass(e, t) {
      return e instanceof HTMLElement && e.classList.contains(t) ? !0 : e instanceof Element && e.parentNode && this.hasSomeParentTheClass(e.parentNode, t);
    },
    /**
     * Check if a parent with certain tag name exists
     *
     */
    hasSomeParentTagName(e, t) {
      return e instanceof HTMLElement && e.tagName.toLowerCase() === t.toLowerCase() ? !0 : e instanceof Element && e.parentNode && this.hasSomeParentTagName(e.parentNode, t);
    },
    /**
     * Event listener for mouse wheel clicked row
     *
     * @param e Click Event
     * @param rowIndex Index of clicked row
     */
    onRowAuxClick(e, t) {
      if (this._isControlClick(e) || e.button !== 1)
        return;
      const s = parseInt(t);
      this.$emit(
        "auxclick:row",
        this.rowsFinal[s],
        "auxclick:row",
        e.target,
        e,
        s
      );
    },
    /**
     * Event listener for mousedown row, just for supporting mouse wheel click
     *
     * @param e Click Event
     */
    onRowMousedown(e) {
      !this._isControlClick(e) && e.which === 2 && e.preventDefault();
    },
    /**
     * Event listener for clicked row. Emits an event if the row has been expanded or collapsed. Emits and event that row was clicked
     *
     * @param e Click Event
     * @param rowIndex Index of clicked row
     */
    onRowClick(e, t) {
      const s = Xt(e), n = (u) => s.some((c) => c instanceof HTMLElement && u(c));
      if (this._isControlClick(e) || (e.target || {}).type === "checkbox" || // A click in a row's details (the default table or the details slot) is not a click on the row.
      n(
        (u) => u.classList.contains("generated-table") || u.classList.contains("generated-details")
      ) && !this.nested)
        return;
      const i = n((u) => u.tagName.toLowerCase() === "a"), o = n(
        (u) => u.classList.contains("prevent-toggle")
      ), r = t.toString(), l = parseInt(t);
      if (this.hiddenColumns[r] && !i && !o) {
        const u = this.rowsFinal[l], c = l;
        this.openRows[r] ? (this.openRows[r] = !1, this.$emit("collapse:row", u, "collapse:row", c), this.$emit("expand:row", u, "collapse:row", c)) : (this.openRows[r] = !0, this.$emit("expand:row", u, "expand:row", c)), this.generatedUpdatedKey = Date.now();
      }
      this.configFinal.enableRowTabIndex && (this.activeRow = this.activeRow === l ? null : l), this.$emit("click:row", this.rowsFinal[l], "click:row", e.target, e, l);
    },
    /**
     *
     * @param e
     * @param cell
     */
    onCellClick(e, t) {
      this._isControlClick(e) || this.$emit("click:cell", t, "click:cell", e.target, e);
    },
    /**
     *
     * @param e
     * @param cell
     */
    onCellAuxClick(e, t) {
      !this._isControlClick(e) && e.button === 1 && this.$emit("auxclick:cell", t, "auxclick:cell", e.target, e);
    },
    /**
     * Event listener for mousedown cell, just for supporting mouse wheel click
     *
     * @param e Click Event
     */
    onCellMousedown(e) {
      !this._isControlClick(e) && e.which === 2 && e.preventDefault();
    },
    /**
     * DOM-based hover management — avoids full re-render on mouse movement. A row and its details are one row: the
     * hovered element and both of them get the hover class, whichever the mouse is on.
     */
    _hoverRow(e, t) {
      const s = t && t.currentTarget;
      this.hoveredRow === e && (!s || s === this._hoverTarget) || (this._hoverTarget = s || null, this.hoveredRow = e, this._paintRows());
    },
    /**
     * Sets the hover and the active class on the rendered elements of their rows, a row's tr and its details' tr,
     * and takes them off the ones no longer hovered or active. On the DOM, not by rendering: moving the mouse or the
     * active row with the arrow keys re-renders nothing. With the default active class the active row also gets
     * `row-active` (`parent-row-active` on its details): both default classes are `bg-muted`, and the markers carry
     * the built-in active look. A custom activeClass is the app's to style. Only classes this method added are ever
     * taken off again, so a class a row has of its own stays.
     */
    _paintRows() {
      const { hoverClass: e, activeClass: t } = this.configFinal, s = (u) => u ? String(u).split(/\s+/).filter(Boolean) : [], n = /* @__PURE__ */ new Map(), i = (u, c) => {
        for (const g of u)
          n.set(g, [...n.get(g) || [], ...c]);
      }, o = (u) => [].concat(this.$refs[u] || []);
      if (e && this._hoverTarget && this.$el.contains(this._hoverTarget) && i(
        [
          this._hoverTarget,
          ...o("row-highlighted-" + this.hoveredRow),
          ...o("generated-row-highlighted-" + this.hoveredRow)
        ],
        s(e)
      ), t && this.activeRow !== null) {
        const u = t === Po;
        i(o("row-highlighted-" + this.activeRow), [
          ...s(t),
          ...u ? ["row-active"] : []
        ]), i(o("generated-row-highlighted-" + this.activeRow), [
          ...s(t),
          ...u ? ["parent-row-active"] : []
        ]);
      }
      const r = this._painted || /* @__PURE__ */ new Map();
      for (const [u, c] of r) {
        const g = n.get(u) || [];
        u.classList.remove(...c.filter((a) => !g.includes(a)));
      }
      const l = /* @__PURE__ */ new Map();
      for (const [u, c] of n) {
        const g = r.get(u) || [], a = c.filter(
          (p) => g.includes(p) || !u.classList.contains(p)
        );
        u.classList.add(...a), l.set(u, a);
      }
      this._painted = l;
    },
    /**
     * The rows' hover or active flags (name "hovered" or "active") for their details boxes (QuintableDetailsBox):
     * one reactive key per row, so a change wakes only the boxes of the rows it leaves and enters.
     */
    _rowFlags(e) {
      const t = this._flags || (this._flags = {});
      return t[e] || (t[e] = an({}));
    },
    // Moves a flag (see _rowFlags) from one row to another; null for none.
    _flagRow(e, t, s) {
      const n = this._rowFlags(e);
      t != null && (n[t] = !1), s != null && (n[s] = !0);
    },
    /**
     * Event listener for mouse leave of table body. Releases the hoveredRow data entry
     *
     */
    onMouseleaveTable() {
      this._hoverTarget = null, this._paintRows(), this.hoveredRow = null;
    },
    // accessible: Enter and Space sort by a focused sortable heading.
    _onHeaderKeydown(e, t) {
      this.configFinal.accessible && this.configFinal.sorts[t] && (e.key === "Enter" || e.key === " ") && e.target === e.currentTarget && (e.preventDefault(), this.setSortColumn(t));
    },
    // accessible: Enter and Space on a focused page link click it.
    _onPaginationKeydown(e) {
      this.configFinal.accessible && (e.key === "Enter" || e.key === " ") && e.target instanceof Element && e.target.matches(".page-link[tabindex]") && (e.preventDefault(), e.target.click());
    },
    // accessible: the attributes of a row's toggle button.
    _toggleA11y(e) {
      const t = !!this.openRows[e];
      return {
        type: "button",
        class: "quintable--toggle-button",
        "aria-expanded": String(t),
        "aria-label": t ? this.configFinal.collapseRowLabel : this.configFinal.expandRowLabel
      };
    },
    // accessible: the attributes of a page link; label for an arrow, current for the page shown.
    _pageLinkA11y(e = null, t = !1) {
      return {
        role: "button",
        tabindex: 0,
        "aria-label": e,
        "aria-current": t ? "page" : null
      };
    },
    checkKey(e) {
      if (this.activeRow === null || e.keyCode !== 40 && e.keyCode !== 38)
        return;
      e.preventDefault();
      const t = this.visibleRowIndexes, s = this._visibleRowIndexMap[this.activeRow];
      e.keyCode === 40 ? this.activeRow = s === void 0 || s === t.length - 1 ? t[0] : t[s + 1] : this.activeRow = s === void 0 || s === 0 ? t[t.length - 1] : t[s - 1];
    }
  }
}, ot = ["xxl", "xl", "lg"], Ao = {
  computed: {
    // Pre-compute per-column whether it matches any hidden breakpoint
    _hiddenBreakpointSet() {
      return Object.freeze(new Set(this.hiddenBreakpoints));
    },
    _colBreakpointMatch() {
      const e = this._hiddenBreakpointSet;
      return Object.freeze(
        this.configFinal.columns.map((t) => {
          if (!t || !t.breakpoint) return !1;
          const s = t.breakpoint.toLocaleLowerCase();
          return s === "all" || e.has(s);
        })
      );
    }
  },
  methods: {
    /**
     * Callback from shared breakpoint detector
     */
    _onBreakpointChange(e) {
      if (this.configFinal.autoFit) {
        this.windowHiddenBreakpoints = e.filter(
          (t) => !ot.includes(t)
        ), this.fitLevel = 0, this._applyFitLevel(), this._scheduleFit();
        return;
      }
      He(this.hiddenBreakpoints, e) || (this.hiddenBreakpoints = e);
    },
    /**
     * autoFit: the window's list (phones, tablets, `all`) plus the `fitLevel` largest of FIT_ORDER.
     */
    _applyFitLevel() {
      const e = [
        ...this.windowHiddenBreakpoints,
        ...ot.slice(0, this.fitLevel)
      ];
      He(this.hiddenBreakpoints, e) || (this.hiddenBreakpoints = e);
    },
    _observeFitTable() {
      const e = this.$refs.table;
      this._fitObserver && e && e !== this._fitTable && (this._fitTable && this._fitObserver.unobserve(this._fitTable), this._fitObserver.observe(e), this._fitTable = e);
    },
    _scheduleFit() {
      if (typeof requestAnimationFrame == "undefined") {
        this._fitToContainer();
        return;
      }
      this._fitFrame && cancelAnimationFrame(this._fitFrame), this._fitFrame = requestAnimationFrame(() => {
        this._fitFrame = null, this._fitToContainer();
      });
    },
    /**
     * autoFit: collapses FIT_ORDER one level at a time while the table overflows its container, all in one frame
     * before the next paint. A container that grew starts again from the window's list. Whatever still overflows
     * after the last level scrolls inside the container (`quintable-fit-scroll`).
     */
    _fitToContainer() {
      const e = this.$refs["height-wrapper"], t = this.$refs.table;
      if (!e || !t || !this.windowHiddenBreakpoints)
        return;
      const s = e.clientWidth, n = this._fitWidth !== void 0 && s > this._fitWidth;
      if (this._fitWidth = s, n && this.fitLevel > 0) {
        this.fitScroll = !1, this.fitLevel = 0, this._applyFitLevel(), this.$nextTick(this._fitToContainer);
        return;
      }
      if (s === 0 || t.scrollWidth <= s + 1) {
        this.fitScroll = !1;
        return;
      }
      if (this.fitLevel >= ot.length) {
        this.fitScroll = !0;
        return;
      }
      this.fitLevel += 1, this._applyFitLevel(), this.$nextTick(this._fitToContainer);
    },
    /**
     * Keep for backwards compatibility — now delegates to shared detector
     */
    generateHiddenBreakpoints() {
      const e = is();
      this._onBreakpointChange(e.hiddenBreakpoints);
    }
  }
};
function Be(e) {
  if (!e)
    return "";
  const t = e.html;
  return t != null && t !== "" ? String(t).replace(/<[^>]*>/g, "") : e.text === void 0 || e.text === null ? "" : String(e.text);
}
function To(e) {
  if (!e)
    return NaN;
  const t = e.sortValue !== void 0 && e.sortValue !== null ? e.sortValue : Be(e);
  return typeof t == "number" ? t : parseFloat(t);
}
const me = (e) => e != null && String(e).trim() !== "", rt = { column: 120, extra: 40 }, Zt = 40, Yt = {
  toggle: "toggle-th",
  selectPre: "select-th pre",
  selectPost: "select-th post",
  prepend: "row-prepend-th",
  append: "row-append-th"
}, qo = Object.freeze({ any: !1, cols: Object.freeze([]) }), Lo = {
  methods: {
    // A column the table does not show: hidden by the config, or (columnPicker) by the user.
    _isHiddenCol(e) {
      return this.configFinal.hiddenCols[e] || this.configFinal.columnPicker && !!this.userHiddenColumns[e];
    },
    /**
     * columnPicker: shows or hides a column (flips it without a value). The last shown column stays.
     *
     * @param index the column
     * @param visible true to show, false to hide
     */
    toggleColumn(e, t) {
      const s = typeof t == "boolean" ? t : !!this.userHiddenColumns[e];
      if (!s && this._pickerColumns.filter((o) => o.visible).length <= 1)
        return;
      const n = O({}, this.userHiddenColumns);
      s ? delete n[e] : n[e] = !0, this.userHiddenColumns = n;
      const i = Object.keys(n).map(Number);
      this.configFinal.storeState && localStorage.setItem(
        `vue-quintable-${this.identifier}-hidden-columns`,
        JSON.stringify(i)
      ), this.$emit("update:hidden-columns", i, "update:hidden-columns");
    },
    // columnPicker: closes the menu on a click outside it or on Escape.
    _onPickerToggle(e) {
      const t = e.target, s = (n) => {
        (n.type === "keydown" && n.key === "Escape" || n.type === "pointerdown" && !t.contains(n.target)) && (t.open = !1);
      };
      t.open ? (this._closePicker = s, document.addEventListener("pointerdown", s), document.addEventListener("keydown", s)) : this._removePickerListeners();
    },
    // column pin: measures the pinned cells now and whenever the table's size changes.
    _schedulePins() {
      if (!this._pin.any)
        return;
      const e = this.$refs.table;
      e && this._pinObserved !== e && typeof ResizeObserver != "undefined" && (this._unobservePins(), this._pinObserver = new ResizeObserver(() => this._measurePins()), this._pinObserver.observe(e), this._pinObserved = e), this._measurePins();
    },
    _unobservePins() {
      this._pinObserver && (this._pinObserver.disconnect(), this._pinObserver = null, this._pinObserved = null);
    },
    // column pin: measures the pinned headings and sets each pinned cell's offset (the widths before it).
    _measurePins() {
      const e = this.$refs.table, t = e && e.querySelector(":scope > thead > tr");
      if (t)
        for (const s of ["start", "end"]) {
          const n = [
            ...t.querySelectorAll(`:scope > .quintable-pin-${s}`)
          ];
          s === "end" && n.reverse();
          let i = 0;
          n.forEach((o, r) => {
            e.style.setProperty(
              `--quintable-pin-${s}-${r}`,
              i + "px"
            ), i += o.getBoundingClientRect().width;
          });
        }
    },
    // resizableColumns: the key a header cell's width is kept under (a column's index, or an EXTRA_HEADERS key).
    _widthKey(e) {
      return e.dataset.column !== void 0 ? Number(e.dataset.column) : Object.keys(Yt).find(
        (t) => Yt[t].split(" ").every((s) => e.classList.contains(s))
      );
    },
    // resizableColumns: takes the widths the header cells have now, so the table can switch to a fixed layout.
    _freezeWidths() {
      const e = this.$refs.table && this.$refs.table.querySelector(":scope > thead > tr");
      if (!e || Object.keys(this.columnWidths).length)
        return;
      const t = {};
      for (const s of e.children) {
        const n = this._widthKey(s);
        n !== void 0 && (t[n] = Math.round(s.getBoundingClientRect().width));
      }
      this.columnWidths = t;
    },
    // resizableColumns: sets a column's width and reports it.
    _commitWidth(e, t) {
      const s = G(O({}, this.columnWidths), {
        [e]: Math.max(Zt, t)
      });
      this.columnWidths = s, this.configFinal.storeState && localStorage.setItem(
        `vue-quintable-${this.identifier}-column-widths`,
        JSON.stringify(s)
      ), this.$emit("resize:column", e, s[e], "resize:column");
    },
    /**
     * resizableColumns: back to the widths the content gives the columns.
     */
    resetColumnWidths() {
      this.columnWidths = {}, this.configFinal.storeState && localStorage.removeItem(
        `vue-quintable-${this.identifier}-column-widths`
      );
    },
    // resizableColumns: drags a column's edge. The DOM follows the pointer; the width is committed on release, so
    // moving the pointer renders nothing.
    _startResize(e, t) {
      var p;
      const s = e.currentTarget, n = s.parentElement, i = this.$refs.table;
      this._freezeWidths();
      const o = getComputedStyle(i).direction === "rtl", r = e.clientX, l = n.getBoundingClientRect().width, u = i.getBoundingClientRect().width;
      let c = l;
      (p = s.setPointerCapture) == null || p.call(s, e.pointerId);
      const g = (f) => {
        c = Math.max(
          Zt,
          l + (o ? r - f.clientX : f.clientX - r)
        ), n.style.width = c + "px", i.style.width = u + c - l + "px";
      }, a = () => {
        s.removeEventListener("pointermove", g), s.removeEventListener("pointerup", a), s.removeEventListener("pointercancel", a), this._commitWidth(t, Math.round(c));
      };
      s.addEventListener("pointermove", g), s.addEventListener("pointerup", a), s.addEventListener("pointercancel", a);
    },
    // resizableColumns: arrow keys on a focused edge narrow or widen its column.
    _resizeKeydown(e, t) {
      const s = { ArrowLeft: -10, ArrowRight: 10 }[e.key];
      if (!s)
        return;
      e.preventDefault(), this._freezeWidths();
      const n = this.$refs.table && getComputedStyle(this.$refs.table).direction === "rtl", i = this.columnWidths[t] || rt.column;
      this._commitWidth(t, i + (n ? -s : s));
    },
    // The width of one of the table's own header cells (toggle, select, prepend, append) in the fixed layout.
    _extraThStyle(e) {
      return this._layoutWidths && this._layoutWidths.extras[e] || void 0;
    },
    /**
     * columnFilters: sets a column's filter: a text, a select value, or { min, max } for a range. An empty value
     * removes it.
     *
     * @param index the column
     * @param value the filter value
     */
    setColumnFilter(e, t) {
      const s = O({}, this.columnFilterValues);
      (t && typeof t == "object" ? !me(t.min) && !me(t.max) : !me(t)) ? delete s[e] : s[e] = t, this.columnFilterValues = s, this._columnFiltersChanged();
    },
    /**
     * columnFilters: removes every column filter.
     */
    clearColumnFilters() {
      this.columnFilterValues = {}, this._columnFiltersChanged();
    },
    _columnFiltersChanged() {
      const e = this.columnFilterValues;
      this.configFinal.storeState && localStorage.setItem(
        `vue-quintable-${this.identifier}-column-filters`,
        JSON.stringify(e)
      ), this.$emit("update:column-filters", e, "update:column-filters"), this.configFinal.ajaxUrl ? (clearTimeout(this._columnFilterTimeout), this._columnFilterTimeout = setTimeout(
        () => this.loadViaAjax(!0, !0, "COLUMN_FILTERS"),
        this.configFinal.ajaxRequestDelay
      )) : this.currentPage = 1;
    },
    // columnFilters: an input of the filter row changed (a range input changes one bound).
    _onFilterInput(e, t, s) {
      const n = t.target.value;
      this.setColumnFilter(
        e,
        s ? G(O({}, this.columnFilterValues[e] || {}), { [s]: n }) : n
      );
    },
    // columnFilters: the accessible name of a column's filter: "Filter" and the heading's text.
    _filterLabel(e) {
      const t = String(this.configFinal.headlines[e] || "").replace(/<[^>]*>/g, "").trim();
      return `${this.configFinal.columnFilterPlaceholder} ${t || e + 1}`;
    },
    // columnFilters: the rows of `visible` that also pass every column filter.
    _applyColumnFilters(e) {
      const t = Object.entries(this.columnFilterValues).map(
        ([i, o]) => {
          const r = this.configFinal.filterTypes[i];
          if (r === "range") {
            const u = me(o.min) ? parseFloat(o.min) : -1 / 0, c = me(o.max) ? parseFloat(o.max) : 1 / 0;
            return (g) => {
              const a = To(g);
              return !isNaN(a) && a >= u && a <= c;
            };
          }
          if (r === "select") {
            const u = String(o);
            return (c) => Be(c) === u;
          }
          const l = String(o).toLowerCase();
          return (u) => Be(u).toLowerCase().includes(l);
        }
      ), s = Object.keys(this.columnFilterValues).map(Number), n = this.rowsFinal;
      return e.map((i, o) => {
        if (!i)
          return !1;
        const r = W(n[o]);
        return t.every((l, u) => l(r[s[u]]));
      });
    },
    _removePickerListeners() {
      this._closePicker && (document.removeEventListener("pointerdown", this._closePicker), document.removeEventListener("keydown", this._closePicker), this._closePicker = null);
    }
  },
  computed: {
    // columnFilters: whether a column filter is set.
    _columnFilterActive() {
      return Object.keys(this.columnFilterValues).length > 0;
    },
    // columnFilters: the choices of each select filter, the column's filterOptions or its distinct values.
    _columnFilterOptions() {
      const e = {}, t = this.rowsFinal;
      return this.configFinal.columns.forEach((s, n) => {
        if (this.configFinal.filterTypes[n] !== "select")
          return;
        if (Array.isArray(s.filterOptions)) {
          e[n] = s.filterOptions.map(String);
          return;
        }
        const i = /* @__PURE__ */ new Set();
        for (const o of t) {
          const r = Be(W(o)[n]);
          r !== "" && i.add(r);
        }
        e[n] = [...i].sort(
          (o, r) => o.localeCompare(r, void 0, { numeric: !0 })
        );
      }), e;
    },
    /**
     * resizableColumns: once a column was sized, the table lays its columns out by fixed widths (a sized width, or
     * a default for cells that came later), and is exactly as wide as they are together. Null before.
     */
    _layoutWidths() {
      if (!this.configFinal.resizableColumns)
        return null;
      const e = this.columnWidths;
      if (!Object.keys(e).length)
        return null;
      let t = 0;
      const s = (r, l) => {
        const u = e[r] || l;
        return t += u, Object.freeze({ width: u + "px" });
      }, n = this.configFinal.columns.map(
        (r, l) => this.cellVisible[l] ? s(l, rt.column) : null
      ), i = {}, o = {
        toggle: this.hasGeneratedRows && !this.configFinal.hideRowToggle,
        selectPre: this.configFinal.select && this.configFinal.selectPosition === "pre",
        selectPost: this.configFinal.select && this.configFinal.selectPosition === "post",
        prepend: !!this.$slots["row-prepend"],
        append: !!this.$slots["row-append"]
      };
      for (const r in o)
        o[r] && (i[r] = s(r, rt.extra));
      return Object.freeze({
        columns: n,
        extras: i,
        table: Object.freeze({ tableLayout: "fixed", width: t + "px" })
      });
    },
    // The style of a column's heading: its width (sized, or the column's width option), or undefined.
    _thStyles() {
      const e = this._layoutWidths, t = this.configFinal.widths;
      return this.configFinal.columns.map(
        (s, n) => (
          // a sized width, else the column's width option
          e && e.columns[n] || (t[n] ? { width: t[n] } : void 0)
        )
      );
    },
    // scrollHeight: the height the table scrolls in (virtualScroll needs one: 400px unless set), or false.
    _scrollHeight() {
      const e = this.configFinal.scrollHeight || (this.configFinal.virtualScroll ? 400 : !1);
      return typeof e == "number" ? e + "px" : e;
    },
    /**
     * column pin: the cells that stay in place while the table scrolls sideways, by column and for the table's own
     * columns (toggle, select, row-prepend/-append), each with its class and its offset variable. With a column
     * pinned to the start, the columns before all columns pin too; to the end, those after them.
     */
    _pin() {
      const e = this.configFinal.pins;
      if (!e.some(Boolean))
        return qo;
      const t = this.cellVisible, s = { any: !1, cols: [] }, n = [], i = [];
      e.filter((l, u) => l === "start" && t[u]).length && (this.hasGeneratedRows && !this.configFinal.hideRowToggle && n.push("toggle"), this.configFinal.select && this.configFinal.selectPosition === "pre" && n.push("selectPre"), this.$slots["row-prepend"] && n.push("prepend")), e.forEach((l, u) => l === "start" && t[u] && n.push(u)), e.some((l, u) => l === "end" && t[u]) && (this.configFinal.select && this.configFinal.selectPosition === "post" && i.push("selectPost"), this.$slots["row-append"] && i.push("append"));
      for (let l = e.length - 1; l >= 0; l--)
        e[l] === "end" && t[l] && i.push(l);
      const r = (l, u) => l.slice(0, 10).forEach((c, g, a) => {
        const p = Object.freeze({
          cls: `quintable-pin quintable-pin-${u} quintable-pin-${u}-${g}` + (g === a.length - 1 ? " quintable-pin-edge" : "")
        });
        typeof c == "number" ? s.cols[c] = p : s[c] = p;
      });
      return r(n, "start"), r(i, "end"), s.any = n.length + i.length > 0, Object.freeze(s);
    },
    // columnPicker: the columns the menu lists (not those the config hides), with their state.
    _pickerColumns() {
      const e = [];
      return this.configFinal.columns.forEach((t, s) => {
        t && !this.configFinal.hiddenCols[s] && e.push({
          index: s,
          headline: this.configFinal.headlines[s] || `Column ${s + 1}`,
          visible: !this.userHiddenColumns[s]
        });
      }), e;
    }
  }
}, jo = {
  computed: {
    // The parameter names: the table's identifier (or "qt") and the state's name, e.g. "orders-page".
    _urlStatePrefix() {
      return (this.identifier || "qt") + "-";
    },
    // The state as parameters; values at their default are left out.
    _urlStateParams() {
      const e = {};
      this.currentPage > 1 && (e.page = String(this.currentPage));
      const t = Object.values(this.currentSortIndexes).slice().sort((s, n) => s.order - n.order).map((s) => `${s.index}:${s.asc ? "asc" : "desc"}`);
      return t.length && (e.sort = t.join(",")), this.query && (e.search = this.query), this.customRowsPerPage && this.customRowsPerPage !== this.configFinal.pagination && (e.rows = String(this.customRowsPerPage)), this.configFinal.columnFilters && Object.keys(this.columnFilterValues).length && (e.filters = JSON.stringify(this.columnFilterValues)), e;
    }
  },
  methods: {
    // Reads the state from the address into storedState, the way storeState restores it.
    _readUrlState() {
      if (typeof window == "undefined")
        return;
      const e = new URLSearchParams(window.location.search), t = (l) => e.get(this._urlStatePrefix + l), s = parseInt(t("page"));
      s > 1 && (this.storedState["current-page"] = s);
      const n = t("search");
      n && (this.storedState.query = n);
      const i = t("rows");
      i && (this.storedState["rows-per-page"] = i === "All" ? "All" : parseInt(i) || void 0);
      const o = t("sort");
      if (o) {
        const l = {};
        o.split(",").forEach((u, c) => {
          const [g, a] = u.split(":"), p = parseInt(g);
          this.configFinal.sorts[p] && (l[p] = {
            headline: this.configFinal.headlines[p],
            index: p,
            asc: a !== "desc",
            order: c
          });
        }), Object.keys(l).length && (this.storedState["sort-indexes"] = l);
      }
      const r = t("filters");
      if (r && this.configFinal.columnFilters)
        try {
          this.columnFilterValues = JSON.parse(r);
        } catch (l) {
        }
    },
    // Writes the state into the address, keeping its other parameters, without a new history entry.
    _writeUrlState(e) {
      const t = new URL(window.location.href);
      for (const s of ["page", "sort", "search", "rows", "filters"]) {
        const n = this._urlStatePrefix + s;
        e[s] === void 0 ? t.searchParams.delete(n) : t.searchParams.set(n, e[s]);
      }
      t.href !== window.location.href && window.history.replaceState(window.history.state, "", t);
    }
  }
}, es = 8, No = 40, Mo = {
  computed: {
    // The rows to render: the window with virtualScroll, else all rows of the page (the same array).
    _renderedRowIndexes() {
      if (!this.configFinal.virtualScroll)
        return this.visibleRowIndexes;
      const { start: e, end: t } = this.virtualRange;
      return this.visibleRowIndexes.slice(e, t);
    }
  },
  methods: {
    // A row's height: measured, or estimated. The estimate is fixed once a first row was measured: an average that
    // moved with every measurement, times thousands of unmeasured rows, would move the window on every render.
    _rowHeight(e) {
      const t = this._virtualHeights || (this._virtualHeights = /* @__PURE__ */ new Map());
      return t.has(e) ? t.get(e) : this._virtualEstimate || this.configFinal.rowHeight;
    },
    // The box the rows scroll in and where the body starts in it.
    _virtualBox() {
      const e = this.$refs["height-wrapper"], t = this.$refs.table && this.$refs.table.querySelector(":scope > tbody");
      if (!e || !t)
        return null;
      const s = t.getBoundingClientRect().top - e.getBoundingClientRect().top + e.scrollTop;
      return { box: e, bodyTop: s };
    },
    // Works out which rows the box shows and sets the window and the spacer heights, if they changed.
    _updateVirtualRange() {
      if (!this.configFinal.virtualScroll)
        return;
      const e = this.visibleRowIndexes, t = e.length, s = this._virtualBox();
      let n = 0, i = No * this.configFinal.rowHeight;
      s && (n = Math.max(0, s.box.scrollTop - s.bodyTop), i = s.box.clientHeight || i);
      let o = 0, r = 0;
      for (; o < t && r + this._rowHeight(e[o]) <= n; )
        r += this._rowHeight(e[o]), o++;
      let l = o, u = r;
      for (; l < t && u < n + i; )
        u += this._rowHeight(e[l]), l++;
      o = Math.max(0, o - es), l = Math.min(t, l + es);
      let c = 0;
      for (let p = 0; p < o; p++)
        c += this._rowHeight(e[p]);
      let g = 0;
      for (let p = l; p < t; p++)
        g += this._rowHeight(e[p]);
      const a = this.virtualRange;
      (a.start !== o || a.end !== l || Math.abs(a.top - c) > 1 || Math.abs(a.bottom - g) > 1) && (this.virtualRange = {
        start: o,
        end: l,
        top: Math.round(c),
        bottom: Math.round(g)
      });
    },
    // Measures the rendered rows (a row and its details) and corrects the window if their heights changed it.
    _measureVirtualRows() {
      if (!this.configFinal.virtualScroll)
        return;
      if (this._virtualPasses = (this._virtualPasses || 0) + 1, this._virtualPasses === 1)
        requestAnimationFrame(() => this._virtualPasses = 0);
      else if (this._virtualPasses > 4)
        return;
      const e = this._virtualHeights || (this._virtualHeights = /* @__PURE__ */ new Map()), t = (s) => [].concat(this.$refs[s] || [])[0];
      for (const s of this._renderedRowIndexes) {
        const n = t("row-highlighted-" + s);
        if (!n)
          continue;
        const i = t("generated-row-highlighted-" + s), o = n.getBoundingClientRect().height + (i ? i.getBoundingClientRect().height : 0);
        o > 0 && (e.set(s, o), !this._virtualEstimate && !i && (this._virtualEstimate = o));
      }
      this._updateVirtualRange();
    },
    // Listens to the box's scrolling (once a frame) while virtualScroll is on.
    _setupVirtual() {
      const e = this.$refs["height-wrapper"];
      if (!this.configFinal.virtualScroll || !e) {
        this._teardownVirtual();
        return;
      }
      this._virtualListening !== e && (this._teardownVirtual(), this._onVirtualScroll = () => {
        this._virtualFrame || (this._virtualFrame = requestAnimationFrame(() => {
          this._virtualFrame = null, this._updateVirtualRange();
        }));
      }, e.addEventListener("scroll", this._onVirtualScroll, {
        passive: !0
      }), typeof ResizeObserver != "undefined" && (this._virtualObserver = new ResizeObserver(
        () => this._measureVirtualRows()
      ), this._virtualObserver.observe(e)), this._virtualListening = e), this._measureVirtualRows();
    },
    _teardownVirtual() {
      this._virtualListening && (this._virtualListening.removeEventListener(
        "scroll",
        this._onVirtualScroll
      ), this._virtualListening = null), this._virtualObserver && (this._virtualObserver.disconnect(), this._virtualObserver = null), this._virtualFrame && (cancelAnimationFrame(this._virtualFrame), this._virtualFrame = null);
    },
    // Scrolls the box so a row (e.g. the active one, moved with the arrow keys) is in view.
    _scrollRowIntoView(e) {
      const t = this._virtualBox(), s = this._visibleRowIndexMap[e];
      if (!t || s === void 0)
        return;
      const n = this.visibleRowIndexes;
      let i = 0;
      for (let u = 0; u < s; u++)
        i += this._rowHeight(n[u]);
      const o = t.bodyTop + i, r = o + this._rowHeight(e), l = t.box;
      o < l.scrollTop + t.bodyTop ? l.scrollTop = o - t.bodyTop : r > l.scrollTop + l.clientHeight && (l.scrollTop = r - l.clientHeight);
    }
  }
};
let Uo = 0;
function ts(e, t) {
  return {
    placement: t,
    content: e.tooltip,
    trigger: e.tooltip ? "hover" : "manual"
  };
}
const Bo = "quintable--table-container--table--tbody--row--cell--inner-cell--", Le = "quintable--table-container--table--tbody--generated-row--generated-table";
function ss(e, t, s, n) {
  let i = null, o, r;
  if (s) {
    const l = t.type === "html";
    i = l ? "html" : "text", o = t.value, r = l ? "formatted-html" : "formatted-value";
  } else oe(e.html) ? (i = r = "html", o = e.html) : e.component ? (i = r = "component", o = e.component) : oe(e.text) && (i = r = "text", o = e.text);
  return { kind: i, value: o, innerClass: i && n + r };
}
function ns(e, t) {
  if (t && e.kind === "text") {
    const s = Mn(String(e.value), t);
    s && (e.marks = s);
  }
  return e;
}
const Vo = ["generated", "sticky"].map((e) => ({
  kind: e,
  rowClass: `${e}-row-cell ${Le}--${e}-row-cell`,
  headlineClass: `${e}-cell-headline ${Le}--generated-row-cell--${e}-cell-headline`,
  contentClass: `${e}-cell-content ${Le}--generated-row-cell--${e}-cell-content`,
  innerPrefix: `${Le}--${e}-row-cell--${e}-cell--cell-inner--`
})), Ho = {
  name: "QuintableDetailsBox",
  props: ["row"],
  setup(e, { slots: t }) {
    const s = dn().parent.proxy, n = _t(() => !!s._rowFlags("hovered")[e.row]), i = _t(() => !!s._rowFlags("active")[e.row]);
    return () => {
      const { hoverClass: o, activeClass: r } = s.configFinal;
      return hn(
        "div",
        { class: { [o]: n.value, [r]: i.value } },
        t.default({ hovered: n.value })
      );
    };
  }
}, Do = {
  name: "VueQuintable",
  components: { QuintableDetailsBox: Ho },
  directives: { tooltip: Bn },
  mixins: [
    wo,
    ko,
    Fo,
    Ro,
    vo,
    Co,
    Eo,
    Ao,
    Lo,
    jo,
    Mo
  ],
  inject: {
    // Config defaults for every table of the app: app.use(VueQuintable, { defaults: { ... } }).
    quintableDefaults: { from: "vueQuintableDefaults", default: null }
  },
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
      type: Function,
      default: null
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
  emits: [
    "update:filters",
    "filtered:rows",
    "change:breakpoints",
    "hover:row",
    "update:search",
    "update:rows-per-page",
    "input",
    "update:selected-rows",
    "update:page",
    "active:row",
    "component:event",
    "auxclick:row",
    "expand:row",
    "collapse:row",
    "click:row",
    "click:cell",
    "auxclick:cell",
    "update:sort",
    "ajax:rows",
    "ajax:error",
    "update:hidden-columns",
    "resize:column",
    "update:column-filters"
  ],
  data() {
    return {
      // Part of every row's key: a new value re-creates all rows (sort, page, new rows).
      essentialsKey: Date.now(),
      // Part of every details row's key: a new value re-creates them (expand, collapse).
      generatedUpdatedKey: Date.now(),
      hoveredRow: null,
      // A touch screen has no hover, so a row's details show their sort icons there all the time.
      noHover: typeof window != "undefined" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches,
      allSelectedCustom: null,
      selected: {},
      openRows: {},
      // Position (as a string key) → row index, in display order.
      sortedIndexes: {},
      currentSortIndexes: {},
      query: "",
      currentPage: 1,
      paginationOptions: [...On],
      fetching: !1,
      ajaxRows: [],
      ajaxPages: 0,
      ajaxAll: 0,
      // resizableColumns: the widths in px, by column index or the table's own cells (see columns.mixin.js).
      columnWidths: {},
      // virtualScroll: the rendered rows (positions start to end of the page's rows) and the spacer heights.
      virtualRange: { start: 0, end: 40, top: 0, bottom: 0 },
      // columnFilters: the value of each column's filter, by column index.
      columnFilterValues: {},
      // columnPicker: the columns the user hid, index → true.
      userHiddenColumns: {},
      // searchDebounce: the query the rows are searched by, the typed one after a pause.
      debouncedQuery: "",
      // The last failed AJAX request's error (error slot), null once a request starts.
      ajaxError: null,
      customRowsPerPage: null,
      customMultiSort: null,
      customPageSort: null,
      hiddenBreakpoints: [],
      initBreakpoints: !0,
      cancelSource: null,
      lastQuery: "",
      pageOffset: 0,
      uuid: "qt-" + ++Uo + "-" + Date.now(),
      loaderHeight: 0,
      defaultOperator: "equal",
      queryAjaxTimeout: null,
      lastSearchQueryUpdated: null,
      operatorFunctions: Ln,
      storedState: {},
      activeRow: null,
      // autoFit: how many of FIT_ORDER are collapsed on top of the window's list, and that list without them.
      fitLevel: 0,
      windowHiddenBreakpoints: null,
      fitScroll: !1
    };
  },
  computed: {
    // The table's column count, which is the header's cell count: a row's details span exactly these.
    columnCount() {
      return Math.max(
        1,
        (this.hasGeneratedRows && !this.configFinal.hideRowToggle ? 1 : 0) + (this.configFinal.select ? 1 : 0) + this.cellVisible.filter(Boolean).length
      );
    },
    // skeletonLoading: the columns, toggle and row count the loading table stands in for. No empty-column check:
    // while rows load there are none to check.
    skeleton() {
      const e = this.configFinal.columns, t = e.map((s, n) => !!s && !this._isHiddenCol(n));
      return {
        columns: t.map(
          (s, n) => s && !this._colBreakpointMatch[n] && !this.configFinal.stickyCols[n]
        ),
        toggle: !this.configFinal.hideRowToggle && t.some(
          (s, n) => s && this._colBreakpointMatch[n] && !e[n].sticky && !e[n].alwaysExpanded
        ),
        rows: typeof this.currentRowsPerPage == "number" ? this.currentRowsPerPage : 10
      };
    },
    // Cache isColEmpty(j) results so it's computed once per column, not N times
    _colEmptyCache() {
      const e = {};
      for (let t = 0; t < this.configFinal.number; t++)
        e[t] = this.isColEmpty(t);
      return Object.freeze(e);
    },
    // Pre-compute per-column hide status (shared by generatedRows, stickyRows, hiddenColumns)
    _colHideCache() {
      const e = {};
      for (let t = 0; t < this.configFinal.columns.length; t++)
        e[t] = this._isHiddenCol(t) || !this.configFinal.ignoreEmpty[t] && this.configFinal.hideEmptyColumns && this._colEmptyCache[t] || this.emptyColumns[t];
      return Object.freeze(e);
    },
    // Pre-compute per-column base visibility for cell rendering
    cellVisible() {
      return Object.freeze(
        this.configFinal.columns.map(
          (e, t) => !this._isHiddenCol(t) && !this.emptyColumns[t] && !!e && !this._colBreakpointMatch[t] && !this.configFinal.stickyCols[t]
        )
      );
    },
    /**
     * Checks which rows shall be shown
     *
     * @returns {Array} a boolean array which represents all indexes of the rows
     */
    visibleRows() {
      if (this.configFinal.ajaxUrl || this.currentRowsPerPage === "All")
        return this.filteredRows;
      const e = new Array(this.rowsFinal.length).fill(!1), t = [];
      let s;
      const n = this.sortedIndexes;
      for (const r in n) {
        const l = n[r];
        (s || (s = this.filteredRows))[l] && t.push(l);
      }
      const i = this.currentPage * this.currentRowsPerPage, o = i - this.currentRowsPerPage;
      for (let r = Math.max(o, 0); r < i && r < t.length; r++)
        e[t[r]] = !0;
      return e;
    },
    /**
     * Checks which indexes belongs to the current visible rows
     *
     * @returns {Array} an array of all visible indexes
     */
    visibleRowIndexes() {
      const e = [];
      if (!this.essentialsKey)
        return e;
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        for (let n = 0; n < this.rowsFinal.length; n++)
          e.push(n);
        return e;
      }
      let t;
      const s = this.sortedIndexes;
      for (const n in s) {
        const i = s[n];
        (t || (t = this.visibleRows))[i] && e.push(i);
      }
      return e;
    },
    /**
     * Checks which cells are hidden and shall be displayed as additional generated rows.
     *
     * @returns {Object} an object with sorted index as key and generated row array of cells as value
     */
    generatedRows() {
      const e = {};
      if (!this.generatedUpdatedKey)
        return e;
      const t = this.configFinal.columns, s = this._colBreakpointMatch, n = this._colHideCache, i = this.configFinal.hideEmptyColumns, o = this.configFinal.ignoreEmpty;
      for (const r of this.visibleRowIndexes) {
        const l = W(this.rowsFinal[r]), u = {};
        for (let c = 0; c < t.length; c++)
          s[c] && !n[c] && !(i && !o[c] && this.isColEmpty(c, r)) && !t[c].sticky && !t[c].alwaysExpanded && (u[c] = l[c]);
        e[r] = u;
      }
      return e;
    },
    stickyRows() {
      const e = {}, t = this.configFinal.columns, s = this._colBreakpointMatch, n = this._colHideCache, i = this.configFinal.hideEmptyColumns, o = this.configFinal.ignoreEmpty;
      for (const r of this.visibleRowIndexes) {
        const l = W(this.rowsFinal[r]), u = {};
        for (let c = 0; c < t.length; c++) {
          const g = t[c];
          (g.sticky || g.alwaysExpanded && s[c]) && !n[c] && !(i && !o[c] && this.isColEmpty(c, r)) && (u[c] = l[c]);
        }
        e[r] = u;
      }
      return e;
    },
    /**
     * Checks if multi sort is currently active. Special case: no user action in place
     *
     */
    multiSort: {
      get() {
        return this.customMultiSort === null ? this.configFinal.multiSort : this.customMultiSort;
      },
      set(e) {
        this.customMultiSort = e;
      }
    },
    /**
     * Checks if there are any generated rows in place
     *
     */
    hasGeneratedRows() {
      const e = this._colBreakpointMatch, t = this._colHideCache;
      return this.configFinal.columns.some(
        (s, n) => e[n] && !t[n] && !s.sticky && !s.alwaysExpanded
      );
    },
    /**
     * Calculates the classes array for every cell from the align parameters of rows and cells and the custom class string passed to cells
     *
     */
    cellClassesParsed() {
      const e = {}, t = this.configFinal.alignments, s = this.visibleRowIndexes.length > 0 ? this.visibleRowIndexes : Object.keys(this.rowsFinal).map(Number);
      for (const n of s) {
        const i = this.rowsFinal[n];
        if (!i) continue;
        const o = W(i), r = [];
        for (let l = 0; l < o.length; l++) {
          const u = o[l].align || i.align || t[l], c = o[l].classes;
          r.push(
            u ? c ? "text-" + u + " " + c : "text-" + u : c || ""
          );
        }
        e[n] = r;
      }
      return e;
    },
    /**
     *Calculates the number of hidden columns
     *
     */
    hiddenColumns() {
      const e = this._colBreakpointMatch, t = this._colHideCache, s = this.configFinal.columns.some(
        (i, o) => e[o] && !t[o]
      ) ? 1 : 0, n = {};
      for (const i of this.visibleRowIndexes)
        n[i] = s;
      return n;
    },
    /**
     * Calculates the actual rows which shall be used.
     *
     */
    rowsFinal() {
      return this.configFinal.ajaxUrl ? this.ajaxRows : this.rows || [];
    },
    /**
     * Calculates the classes of every table header
     *
     */
    headerClass() {
      const e = [];
      for (let t = 0; t < this.configFinal.number; t++) {
        const s = [];
        this.configFinal.alignments[t] && s.push("text-" + this.configFinal.alignments[t]), this.configFinal.sorts[t] && (s.push("sort-header"), this.currentSortIndexes[t] && s.push("active")), e.push(
          s.join(" ") + "  quintable--table-container--table--header-row--th " + this.configFinal.columnClasses[t]
        );
      }
      return Object.freeze(e);
    },
    /**
     * Calculates if a headline is to be shown on generated rows
     *
     */
    showHeadlines() {
      const e = this._hiddenBreakpointSet, t = [];
      for (let s = 0; s < this.configFinal.number; s++) {
        const n = this.configFinal.columns[s];
        t.push(
          !!this.configFinal.headlines[s] && (!n.showHeadlineBreakpoint || e.has(n.showHeadlineBreakpoint)) && (!n.hideHeadlineBreakpoint || !e.has(n.hideHeadlineBreakpoint))
        );
      }
      return Object.freeze(t);
    },
    emptyColumns() {
      const e = {}, t = this._colEmptyCache, s = this.configFinal.ignoreSortEmptyColumns;
      for (let n = 0; n < this.configFinal.number; n++)
        e[n] = !this.configFinal.hideEmptyColumns || this.configFinal.ignoreEmpty[n] || s === "none" && this.configFinal.sorts[n] || s === "active" && Object.prototype.hasOwnProperty.call(this.currentSortIndexes, n) ? !1 : t[n];
      return e;
    },
    rowClasses() {
      const e = {};
      for (const t of this.visibleRowIndexes) {
        const s = [];
        this.rowsFinal[t].classes && s.push(this.rowsFinal[t].classes), this.openRows[t] && s.push("row-expanded"), this.hiddenColumns[t] > 0 && !this.openRows[t] && s.push("row-collapsed"), e[t] = s.join(" ");
      }
      return e;
    },
    // The cellFormatter results of the visible rows: row index → column index → formatted value.
    _fmtCells() {
      const e = {}, t = this.configFinal.columns;
      if (!t.some((s) => s && s.cellFormatter))
        return e;
      for (const s of this.visibleRowIndexes) {
        const n = this.rowsFinal[s];
        if (!n) continue;
        const i = W(n);
        let o = !1;
        const r = {};
        for (let l = 0; l < i.length; l++)
          t[l] && t[l].cellFormatter && (r[l] = this.cellFormatters(l, i[l]), o = !0);
        o && (e[s] = r);
      }
      return e;
    },
    // What the template needs for each cell of the visible rows, precomputed once per change.
    _renderRows() {
      const e = {}, t = this.configFinal.columnClasses, s = this.cellVisible, n = this.cellClassesParsed, i = this._fmtCells, o = this.uuid, r = this.configFinal.highlightSearch ? this._markQuery : "", l = this._pin.cols, u = this.configFinal.resizableColumns && this._layoutWidths ? " quintable-wrap-anywhere" : "";
      for (const c of this._renderedRowIndexes) {
        const g = this.rowsFinal[c];
        if (!g) continue;
        const a = W(g), p = "vue-quintable-" + o + "-cell-" + c + "-", f = n[c], w = i[c], b = [];
        for (let y = 0; y < a.length; y++) {
          const P = a[y], j = !!(s[y] && P), A = w && w[y] || null;
          b.push(O({
            cell: P,
            cls: (f && f[y] || "") + " " + (t[y] || "") + (l[y] ? " " + l[y].cls : "") + u,
            vis: j,
            key: p + y
          }, j ? O({
            tooltip: ts(P, "left")
          }, ns(
            ss(P, A, !!A, Bo),
            r
          )) : null));
        }
        e[c] = b;
      }
      return e;
    },
    // The cells of each visible row's details (see DETAIL_PARTS), with their ids, keys and content.
    _detailCells() {
      const e = {}, t = this._fmtCells, s = this.configFinal.highlightSearch ? this._markQuery : "";
      for (const n of this._renderedRowIndexes) {
        const i = "vue-quintable-" + this.uuid + "-";
        e[n] = Vo.map((o) => {
          const r = o.kind === "generated", l = r ? this.generatedRows[n] : this.stickyRows[n], u = r ? this.openRows[n] : !0;
          return G(O({}, o), {
            open: u,
            cells: Object.keys(l).map((c) => {
              const g = l[c], a = `${i}${o.kind}-row-cell-${n}-${c}`, p = t[n] && t[n][c], f = !!this.configFinal.columns[c].cellFormatter;
              return O({
                cell: g,
                cIndex: c,
                id: a,
                key: r ? a + "-" + this.generatedUpdatedKey : a,
                tooltip: u ? ts(g, "top") : null
              }, u ? ns(
                ss(
                  g,
                  p,
                  f,
                  o.innerPrefix
                ),
                s
              ) : null);
            })
          });
        });
      }
      return e;
    },
    // O(1) lookup map: rowIndex → position in visibleRowIndexes
    _visibleRowIndexMap() {
      const e = {};
      return this.visibleRowIndexes.forEach((t, s) => e[t] = s), e;
    }
  },
  watch: {
    visibleRowIndexes(e, t) {
      this.configFinal.reuseRows && this._hoverTarget && !He(e, t) && (this._hoverTarget = null, this._paintRows()), this.windowHiddenBreakpoints && this.fitLevel > 0 && (this.fitLevel = 0, this._applyFitLevel(), this.$nextTick(this._fitToContainer));
    },
    rowsFinal: {
      handler(e) {
        !this.verbose || !e || e.forEach((t, s) => {
          const n = W(t), i = this.config.columns.length;
          n.length !== i && console.error(
            `Column count on row index ${s} doesn't fit for column config! expected: ${i}, got: ${n.length}` + (this.configFinal.ajaxUrl ? ` | URL: ${this.configFinal.ajaxUrl}` : "") + (this.identifier ? ` | IDENTIFIER: ${this.identifier}` : ""),
            t
          );
        });
      },
      immediate: !0
    },
    /**
     * Check if some rows should be selected due to an outside change
     *
     */
    preSelectedRows(e) {
      if (!e)
        return;
      const t = this.rowsFinal, s = this.selected;
      for (let o = 0; o < t.length; o++)
        s[o] = !1;
      if (!e.length) {
        this.allSelectedCustom = !1;
        return;
      }
      let n = 0;
      const i = this.configFinal.selectAllRows ? t.map((o, r) => r) : this.visibleRowIndexes;
      for (const { key: o, value: r } of e)
        for (const l of i)
          !t[l].disableSelect && t[l][o] === r && (s[l] = !0, n++);
      this.allSelectedCustom = n && n === this._selectableCount();
    },
    /**
     * Resets page and selects if a filter value is changes
     *
     */
    filters: {
      handler() {
        const e = !!(this.configFinal.storeState && this.storedState.filters);
        e && delete this.storedState.filters, this.configFinal.ajaxUrl && (this.pageSort = !1, this.loadViaAjax(!e, !e, "FILTERS")), this.pageSort && (this.currentSortIndexes = {}, this.resetSorts(), this.recomputeEssentials()), this.configFinal.storeState && localStorage.setItem(
          `vue-quintable-${this.identifier}-filters`,
          JSON.stringify(this.filtersFinal)
        );
      },
      deep: !0
    },
    filtersFinal(e) {
      this.$emit("update:filters", e, "update:filters");
    },
    /**
     * Trigger reload current page without changing filter/search/page from outside
     *
     */
    updated(e) {
      !this.configFinal.ajaxUrl || !e || this.loadViaAjax(!!e.clear, !0, "UPDATED");
    },
    /**
     * Set height of loader if loading is set from outside
     *
     */
    loading() {
      this.loaderHeight = this._wrapperHeight();
    },
    /**
     * Reset page and select if filtering/search is active
     *
     */
    filteredRows: {
      handler(e, t) {
        if (this.configFinal.ajaxUrl || t && He(e, t))
          return;
        this.activeRow !== null && !this.visibleRowIndexes.includes(this.activeRow) && (this.activeRow = null), this.currentPage !== 1 ? this.currentPage = 1 : this.configFinal.keepSelect || this.resetSelect("filteredRows watcher");
        const s = [], { sortedIndexes: n, rowsFinal: i } = this;
        for (let o = 0; o < e.length; o++)
          if (e[o]) {
            const r = n[o.toString()];
            s.push(i[r || o]);
          }
        this.$emit("filtered:rows", s, "filtered:rows");
      },
      immediate: !0
    },
    /**
     * Emits an event if breakpoints are changed
     *
     */
    hiddenBreakpoints(e) {
      this.initBreakpoints || this.$emit("change:breakpoints", e, "change:breakpoints"), this.initBreakpoints = !1;
    },
    /**
     * Emits an event if a row is hovered
     *
     */
    hoveredRow(e, t) {
      e !== null && this.$emit("hover:row", this.rowsFinal[e], "hover:row"), this._flagRow("hovered", t, e);
    },
    /**
     * Resets page and selects if a search query is entered and emits and event
     *
     */
    query(e, t) {
      if (this.lastQuery = t, this.configFinal.ajaxUrl) {
        this.pageSort = !1;
        const s = !((this.configFinal.storeState || this.configFinal.urlState) && this.storedState.query);
        clearTimeout(this.queryAjaxTimeout), this.queryAjaxTimeout = setTimeout(() => {
          this.loadViaAjax(s, s, "QUERY");
        }, this.configFinal.ajaxRequestDelay);
      }
      e.length >= this.configFinal.searchLength && this.lastSearchQueryUpdated !== e ? (this.$emit("update:search", e, "update:search"), this.lastSearchQueryUpdated = e) : this.lastSearchQueryUpdated !== null && (this.lastSearchQueryUpdated = null, this.$emit("update:search", null, "update:search")), this.pageSort && (this.currentSortIndexes = {}, this.resetSorts(), this.recomputeEssentials()), this.configFinal.storeState && (delete this.storedState.query, localStorage.setItem(
        `vue-quintable-${this.identifier}-query`,
        this.query
      ));
    },
    /**
     * Resets page and selects if the number of rows per page is changed and emits and event
     *
     */
    currentRowsPerPage(e) {
      this.$emit("update:rows-per-page", e, "update:rows-per-page");
      const t = !((this.configFinal.storeState || this.configFinal.urlState) && this.storedState["rows-per-page"]);
      if (this.configFinal.storeState && (delete this.storedState["rows-per-page"], localStorage.setItem(
        `vue-quintable-${this.identifier}-rows-per-page`,
        this.currentRowsPerPage
      )), this.configFinal.ajaxUrl) {
        this.loadViaAjax(t, t, "PAGE_ROWS");
        return;
      }
      this.currentPage !== 1 ? this.currentPage = 1 : this.configFinal.selectAllRows || this.resetSelect("currentRowsPerPage watcher");
    },
    /**
     * Reset everything if rows have been changed (e.g. [re]loaded via ajax)
     *
     */
    rows() {
      this.clearLists(), this.initLists(), this.activeRow = null, this.recomputeEssentials(), this.$nextTick(() => {
        this.configFinal.defaultSelected && (this.allSelectedCustom = null, this.checkAll(!0));
      });
    },
    /**
     * Reset everything if config has been changed (e.g. [re]loaded via ajax)
     *
     */
    config: {
      handler(e) {
        if (typeof e != "object")
          throw "config must be an object";
        this.dynamicConfig || (this.initLists(), this.activeRow = null, this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "CONFIG"), this.configFinal.defaultSelected && this.checkAll(!0));
      },
      deep: !0
    },
    /**
     * Prepare the selected rows array for passing to the event and emits it
     *
     */
    selected: {
      handler(e) {
        const t = [], s = Z(this.sortedIndexes), n = Z(e), i = this.rowsFinal;
        for (const o in s) {
          const r = s[o];
          if (n[r]) {
            const l = i[r];
            l.disableSelect || t.push(l);
          }
        }
        this.configFinal.storeState && localStorage.setItem(
          `vue-quintable-${this.identifier}-selected-rows`,
          JSON.stringify(e)
        ), this.$emit("input", t), this.$emit("update:selected-rows", t);
      },
      deep: !0
    },
    /**
     * Resets the row selection if page has been changed and emits an event
     *
     */
    currentPage(e) {
      this.pageOffset = 0, this.activeRow = null, this.$emit("update:page", e, "update:page");
      const t = !((this.configFinal.storeState || this.configFinal.urlState) && this.storedState["current-page"]);
      if (this.configFinal.storeState && (delete this.storedState["current-page"], localStorage.setItem(
        `vue-quintable-${this.identifier}-current-page`,
        this.currentPage
      )), this.configFinal.ajaxUrl) {
        this.resetSelect("currentPage watcher ajax"), this.loadViaAjax(!1, t, "PAGE");
        return;
      }
      this.configFinal.selectAllRows || this.resetSelect("currentPage watcher"), this.pageSort && (this.currentSortIndexes = {}, this.resetSorts()), this.recomputeEssentials();
    },
    /**
     *  Reorder the indexes of sorting if a sort column has been removed (e.g. column 1,2,3 are active, 2 has been removed, 3 has to be 2 now)
     *
     */
    customMultiSort(e) {
      if (e || Object.keys(this.currentSortIndexes).length <= 1)
        return;
      let t, s;
      for (const n in this.currentSortIndexes)
        if (this.currentSortIndexes[n].order === 0) {
          t = this.currentSortIndexes[n], s = n;
          break;
        }
      this.currentSortIndexes = { [s]: t }, this.sort();
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
        for (const e of this.sortOrder)
          typeof e == "object" ? this.setSortColumn(e.index, e.asc) : typeof e == "number" && this.setSortColumn(e);
      }
    },
    activeRow(e, t) {
      const s = this.visibleRowIndexes.indexOf(e);
      this.$emit("active:row", this.rowsFinal[e], "active:row", s), this._paintRows(), this._flagRow("active", t, e), this.configFinal.virtualScroll && e !== null && this._scrollRowIntoView(e);
    }
  },
  created() {
    this.configFinal.storeState && this._restoreState(), this.configFinal.urlState && this._readUrlState(), (this.configFinal.storeState || this.configFinal.urlState) && this._validateRestoredState(), this.initLists();
    const e = this.configFinal.selectAllRows ? this.rowsFinal.length : this.visibleRowIndexes.length;
    let t = 0;
    for (let s = 0; s < e; s++)
      this.rowsFinal[s].selected && (this.selected[s] = !0, t++);
    t && t === this._selectableCount() && (this.allSelectedCustom = !0), this.initialSearchTerm && (this.query = this.initialSearchTerm), this.storedState.query && (this.query = this.storedState.query), this.storedState["rows-per-page"] && (this.customRowsPerPage = this.storedState["rows-per-page"]), this.storedState["sort-indexes"] && (this.currentSortIndexes = this.storedState["sort-indexes"], this.sort(!0)), this.storedState["current-page"] && this.$nextTick(() => {
      this.currentPage = this.storedState["current-page"], this._checkRestoredPage(this.currentPage);
    }), this.$nextTick(this.checkStoredSelectedRows), this.configFinal.enableRowTabIndex && document.addEventListener("keydown", this.checkKey), this.debouncedQuery = this.query, this.$watch("query", this._debounceQuery), this.configFinal.urlState && this.$watch(() => this._urlStateParams, this._writeUrlState);
  },
  mounted() {
    this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "MOUNTED"), this._schedulePins(), this.configFinal.virtualScroll && this._setupVirtual(), this.configFinal.defaultSelected && this.checkAll(!0), this.configFinal.autoFit && typeof ResizeObserver != "undefined" && (this._fitObserver = new ResizeObserver(() => this._scheduleFit()), this._fitObserver.observe(this.$refs["height-wrapper"]), this._observeFitTable()), this._sharedBP = is(), this._sharedBP.subscribe(this._onBreakpointChange), this.configFinal.reloadOn && (this._offReload = this.configFinal.reloadOn(() => {
      this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "RELOAD");
    }));
  },
  updated() {
    this._paintRows(), this._schedulePins(), (this.configFinal.virtualScroll || this._virtualListening) && this._setupVirtual(), this.configFinal.autoFit && (this._observeFitTable(), this._scheduleFit());
  },
  beforeUnmount() {
    clearTimeout(this._debounceTimer), this._removePickerListeners(), this._unobservePins(), clearTimeout(this._columnFilterTimeout), this._teardownVirtual(), this._sharedBP && this._sharedBP.unsubscribe(this._onBreakpointChange), this._fitObserver && this._fitObserver.disconnect(), this._fitFrame && cancelAnimationFrame(this._fitFrame), typeof this._offReload == "function" && this._offReload(), this.configFinal.enableRowTabIndex && document.removeEventListener("keydown", this.checkKey);
  },
  methods: {
    /**
     * just a small string casting function
     *
     */
    valueToString: oe,
    // details slot: the cells a row's details show now, its hidden columns' while it is open, then its sticky ones.
    _detailsSlotCells(e) {
      const t = [];
      for (const s of this._detailCells[e] || [])
        if (s.open)
          for (const n of s.cells) {
            const i = Number(n.cIndex);
            t.push({
              cell: n.cell,
              index: i,
              headline: this.configFinal.headlines[i],
              sticky: s.kind === "sticky"
            });
          }
      return t;
    },
    /**
     * checks if the passed cell is empty for one or all rows
     *
     */
    isColEmpty(e, t = -1) {
      return !(t > -1 ? [t] : this.visibleRowIndexes).some((n) => {
        const i = W(this.rowsFinal[n])[e];
        return !i || i.isEmpty === !0 ? !1 : i.isEmpty === !1 || !!oe(i.text) || !!oe(i.html);
      });
    },
    cellFormatters(e, t) {
      const s = this.configFinal.columns[e];
      if (typeof s.cellFormatter == "function") {
        const n = s.cellFormatter(t);
        return typeof n != "object" ? { value: n } : n;
      }
      return oe(t.html) ? t.html : oe(t.text) ? t.text : "";
    },
    /**
     * Re-creates all rows (new keys), so they render anew after a sort, a page change or new rows
     *
     */
    recomputeEssentials() {
      const e = Date.now();
      this.essentialsKey = e, this.generatedUpdatedKey = e;
    },
    /**
     * Initialize nested object lists
     *
     */
    initLists() {
      if (!this.rowsFinal)
        return;
      const e = this.rowsFinal, { sortedIndexes: t, selected: s } = this, n = /* @__PURE__ */ new Map(), i = Z(t), o = Z(s), r = this.configFinal.expandedAll;
      for (let u = 0; u < e.length; u++) {
        const c = u.toString();
        typeof i[c] == "undefined" && (t[c] = u), typeof o[c] == "undefined" && (s[c] = !1), n.set(c, r || !!e[u].expanded);
      }
      const l = lt(this.openRows, n);
      l && (this.openRows = l);
    },
    /**
     * Clear all relevant lists to ensure re-initialization
     *
     */
    clearLists(e = !0) {
      e && (this.selected = {}), this.openRows = {}, this.sortedIndexes = {};
    },
    /**
     * storeState / urlState: drops what a restored state refers to but the table no longer has: sorts on a column
     * that is gone, no longer sortable or has another headline now (another column at its index), more sorts than
     * one without multiSort, and column filters on a column without a filter (or with a filter of another kind).
     * The stored state is written back without them. A page beyond the last is checked once the rows are known
     * (_checkRestoredPage).
     */
    _validateRestoredState() {
      const e = (i, o) => {
        if (!this.configFinal.storeState)
          return;
        const r = `vue-quintable-${this.identifier}-${i}`;
        o === null ? localStorage.removeItem(r) : localStorage.setItem(r, JSON.stringify(o));
      }, t = this.storedState["sort-indexes"];
      if (t) {
        let i = Object.values(t).filter((o) => {
          const r = parseInt(o.index);
          return !!this.configFinal.sorts[r] && (o.headline === void 0 || o.headline === this.configFinal.headlines[r]);
        }).sort((o, r) => o.order - r.order);
        if (this.configFinal.multiSort || (i = i.slice(0, 1)), i.length !== Object.keys(t).length) {
          const o = {};
          i.forEach((r, l) => {
            o[parseInt(r.index)] = G(O({}, r), { order: l });
          }), i.length ? this.storedState["sort-indexes"] = o : delete this.storedState["sort-indexes"], e("sort-indexes", i.length ? o : null);
        }
      }
      const s = this.columnFilterValues, n = Object.entries(s).filter(([i, o]) => {
        const r = this.configFinal.filterTypes[i];
        return !!r && r === "range" === (typeof o == "object" && o !== null);
      });
      n.length !== Object.keys(s).length && (this.columnFilterValues = Object.fromEntries(n), e("column-filters", n.length ? this.columnFilterValues : null));
    },
    /**
     * storeState / urlState: a restored page beyond the last (there are fewer rows now) shows the first page. Local
     * rows are checked at once (rows that arrive later start on the first page anyway, as new rows always do); AJAX
     * rows when the server answers for that page (see loadViaAjax).
     */
    _checkRestoredPage(e) {
      this.configFinal.ajaxUrl ? this._restoredPage = e : this.numberOfVisibleRows && this.currentPage > this.pages && this._dropRestoredPage();
    },
    // The restored page is gone: the first page, and the stored state says so.
    _dropRestoredPage() {
      delete this.storedState["current-page"], this.configFinal.storeState && localStorage.setItem(
        `vue-quintable-${this.identifier}-current-page`,
        1
      ), this.currentPage = 1;
    },
    // storeState: reads the table's saved filters, search, page size, selection, page and sort.
    _restoreState() {
      const e = (p) => `vue-quintable-${this.identifier}-${p}`, t = (p) => localStorage.getItem(e(p)), s = (p, f = !1) => {
        const w = t(p);
        if (!w)
          return null;
        try {
          const b = JSON.parse(w);
          if (b && typeof b == "object" && Array.isArray(b) === f)
            return b;
        } catch (b) {
        }
        return localStorage.removeItem(e(p)), null;
      }, n = s("filters");
      if (n) {
        for (const p in this.filters)
          Object.prototype.hasOwnProperty.call(this.filters, p) && !Object.prototype.hasOwnProperty.call(n, p) && (n[p] = this.filters[p]);
        this.storedState.filters = n;
      }
      const i = t("query");
      i && (this.storedState.query = i);
      const o = t("rows-per-page");
      o && (this.storedState["rows-per-page"] = parseInt(o));
      const r = s("selected-rows");
      r && (this.storedState["selected-rows"] = r);
      const l = t("current-page");
      l && (this.storedState["current-page"] = parseInt(l));
      const u = s("sort-indexes");
      u && (this.storedState["sort-indexes"] = u);
      const c = this.configFinal.resizableColumns ? s("column-widths") : null;
      c && (this.columnWidths = c);
      const g = this.configFinal.columnFilters ? s("column-filters") : null;
      g && (this.columnFilterValues = g);
      const a = this.configFinal.columnPicker ? s("hidden-columns", !0) : null;
      a && (this.userHiddenColumns = Object.fromEntries(
        a.map((p) => [p, !0])
      ));
    }
  }
}, $o = { class: "header slot slot-header quintable--header" }, Io = {
  key: 0,
  class: "quintable--toolbar d-flex justify-content-end mb-2"
}, zo = { class: "btn btn-sm btn-outline-secondary" }, xo = { class: "dropdown-menu show quintable--column-picker--menu" }, Wo = ["checked", "disabled", "onChange"], Ko = ["innerHTML"], Qo = ["placeholder", "aria-label"], Go = { class: "slot slot-after-search quintable--after-search-container" }, Jo = { key: 0 }, Xo = { class: "p-1" }, Zo = {
  key: 2,
  class: "mb-0 mt-0"
}, Yo = ["aria-label"], er = ["data-column", "title", "onClick", "onKeydown"], tr = {
  key: 0,
  class: "headline quintable--table-container--table--header-row--th--headline"
}, sr = ["innerHTML"], nr = {
  key: 2,
  class: "headline quintable--table-container--table--header-row--th--headline"
}, ir = ["onClick"], or = {
  key: 0,
  class: "badge bg-info text-white"
}, rr = { key: 1 }, lr = ["aria-label", "aria-valuenow", "onPointerdown", "onKeydown"], ar = {
  key: 2,
  class: "mb-0 mt-0"
}, cr = ["aria-label"], ur = {
  key: 0,
  class: "quintable--filter-row quintable--table-container--table--filter-row"
}, dr = ["placeholder", "aria-label", "value", "onInput"], hr = ["aria-label", "value", "onChange"], fr = { value: "" }, pr = ["value"], gr = {
  key: 2,
  class: "d-flex gap-1"
}, mr = ["placeholder", "aria-label", "value", "onInput"], br = {
  key: 0,
  class: "quintable--virtual-spacer",
  "aria-hidden": "true"
}, wr = ["colspan"], yr = ["id", "onClick", "onAuxclick", "onMouseenter"], Sr = { key: 1 }, kr = { key: 2 }, Fr = { key: 1 }, Rr = { key: 1 }, vr = { key: 2 }, Cr = {
  key: 2,
  class: "mb-0 mt-0"
}, Pr = ["onUpdate:modelValue", "aria-label", "disabled", "onChange"], Or = ["id", "onClick", "onAuxclick"], _r = ["innerHTML"], Er = {
  key: 0,
  class: "quintable--search-mark"
}, Ar = ["innerHTML"], Tr = {
  key: 0,
  class: "quintable--search-mark"
}, qr = {
  key: 2,
  class: "mb-0 mt-0"
}, Lr = ["onUpdate:modelValue", "aria-label", "disabled", "onChange"], jr = ["onMouseenter", "onClick"], Nr = ["colspan"], Mr = {
  key: 0,
  class: "generated-details quintable--table-container--table--tbody--generated-row--generated-details"
}, Ur = {
  key: 1,
  class: "mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table"
}, Br = ["id"], Vr = {
  key: 0,
  class: "toggle-cell invisible"
}, Hr = { key: 0 }, Dr = { key: 1 }, $r = { key: 2 }, Ir = ["onClick"], zr = { key: 0 }, xr = ["innerHTML"], Wr = {
  key: 2,
  class: "headline"
}, Kr = ["onClick"], Qr = {
  key: 0,
  class: "badge bg-info text-white"
}, Gr = { key: 1 }, Jr = ["colspan", "onClick"], Xr = ["innerHTML"], Zr = {
  key: 0,
  class: "quintable--search-mark"
}, Yr = ["innerHTML"], el = {
  key: 0,
  class: "quintable--search-mark"
}, tl = {
  key: 1,
  class: "quintable--virtual-spacer",
  "aria-hidden": "true"
}, sl = ["colspan"], nl = {
  key: 1,
  class: "clearfix slot-error slot quintable--table-container--error"
}, il = {
  key: 0,
  class: "clearfix slot-empty slot quintable--table-container--empty"
}, ol = {
  key: 1,
  class: "clearfix slot-no-results slot quintable--table-container--no-results"
}, rl = { class: "text-center p-3 quintable--table-container--no-results--results" }, ll = ["innerHTML"], al = {
  key: 2,
  class: "slot-loading slot quintable--loading"
}, cl = {
  key: 0,
  class: "table quintable--skeleton",
  role: "presentation",
  "aria-hidden": "true"
}, ul = { class: "quintable--skeleton--head" }, dl = { class: "quintable--skeleton--row quintable--table-container--table--header-row" }, hl = {
  key: 0,
  class: "quintable--skeleton--cell quintable--table-container--table--header-row--placeholder-th"
}, fl = {
  key: 1,
  class: "quintable--skeleton--cell quintable--table-container--table--header-row--select-th"
}, pl = {
  key: 2,
  class: "quintable--skeleton--cell quintable--table-container--table--header-row--prepend-th"
}, gl = {
  key: 0,
  class: "quintable--skeleton--headline"
}, ml = ["innerHTML"], bl = {
  key: 2,
  class: "sorting-icon quintable--skeleton--sorting-icon"
}, wl = {
  key: 3,
  class: "quintable--skeleton--cell quintable--table-container--table--header-row--append-th"
}, yl = {
  key: 4,
  class: "quintable--skeleton--cell quintable--table-container--table--header-row--select-th"
}, Sl = { class: "quintable--skeleton--body" }, kl = {
  key: 0,
  class: "quintable--skeleton--cell quintable--table-container--table--tbody--row--toggle-td"
}, Fl = {
  key: 1,
  class: "quintable--skeleton--cell quintable--table-container--table--tbody--row--select-td"
}, Rl = {
  key: 2,
  class: "quintable--skeleton--cell quintable--table-container--table--tbody--row--prepend-td"
}, vl = {
  key: 3,
  class: "quintable--skeleton--cell quintable--table-container--table--tbody--row--append-td"
}, Cl = {
  key: 4,
  class: "quintable--skeleton--cell quintable--table-container--table--tbody--row--select-td"
}, Pl = { class: "loader text-center py-4 quintable--loading--loader-wrapper--loader" }, Ol = { class: "clearfix quintable--table-footer-container" }, _l = { class: "row" }, El = { class: "col-lg-4 quintable--table-footer-container--sort-container" }, Al = { class: "col-lg-8 quintable--table-footer-container--pagination-wrapper" }, Tl = {
  key: 0,
  class: "float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container"
}, ql = {
  key: 0,
  class: "mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select"
}, Ll = ["innerHTML"], jl = ["aria-label"], Nl = ["onClick"], Ml = {
  key: 3,
  class: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows"
}, Ul = { class: "footer slot slot-footer quintable--footer" };
function Bl(e, t, s, n, i, o) {
  const r = Oe("quintable-font-awesome-icon"), l = Oe("quintable-p-check"), u = Oe("quintable-details-box"), c = Oe("quintable-v-select"), g = cn("tooltip");
  return d(), h("div", {
    class: "table-wrapper quintable",
    style: $(
      typeof e.currentRowsPerPage == "number" ? { "--quintable-page-size": e.currentRowsPerPage } : null
    )
  }, [
    F("div", $o, [
      R(e.$slots, "header", {}, void 0, !0)
    ]),
    e.configFinal.columnPicker ? (d(), h("div", Io, [
      F("details", {
        class: "quintable--column-picker",
        onToggle: t[0] || (t[0] = (...a) => e._onPickerToggle && e._onPickerToggle(...a))
      }, [
        F("summary", zo, _(e.configFinal.columnPickerPlaceholder), 1),
        F("div", xo, [
          (d(!0), h(C, null, q(e._pickerColumns, (a) => (d(), h("label", {
            key: a.index,
            class: "dropdown-item d-flex align-items-center gap-2 mb-0"
          }, [
            F("input", {
              type: "checkbox",
              class: "form-check-input mt-0",
              checked: a.visible,
              disabled: a.visible && e._pickerColumns.filter((p) => p.visible).length <= 1,
              onChange: (p) => e.toggleColumn(a.index)
            }, null, 40, Wo),
            F("span", {
              innerHTML: a.headline
            }, null, 8, Ko)
          ]))), 128))
        ])
      ], 32)
    ])) : S("", !0),
    e.configFinal.search ? (d(), h("div", {
      key: 1,
      class: k(["mb-3 quintable--search-container", e.configFinal.searchContainerClass])
    }, [
      R(e.$slots, "before-search", {}, void 0, !0),
      R(e.$slots, "search", {
        value: i.query,
        loading: s.loading,
        setSearchQuery: e.setSearchQuery,
        placeholder: e.configFinal.searchPlaceholder,
        searchClass: e.configFinal.searchClass
      }, () => [
        F("div", {
          class: k(["quintable--search-container--input-container", e.configFinal.searchClass])
        }, [
          J(F("input", {
            "onUpdate:modelValue": t[1] || (t[1] = (a) => i.query = a),
            type: "search",
            placeholder: e.configFinal.searchPlaceholder,
            "aria-label": e.configFinal.accessible ? e.configFinal.searchPlaceholder : null,
            class: "form-control"
          }, null, 8, Qo), [
            [un, i.query]
          ])
        ], 2)
      ], !0),
      R(e.$slots, "after-search", {}, void 0, !0)
    ], 2)) : S("", !0),
    F("div", Go, [
      R(e.$slots, "after-search-container", {}, void 0, !0)
    ]),
    F("div", {
      ref: "height-wrapper",
      class: k(["clearfix quintable--table-container", {
        "quintable-fit-scroll": i.fitScroll,
        "quintable-scroll": !!e._scrollHeight,
        "quintable-scroll-x": e._pin.any || !!e._layoutWidths,
        "quintable-virtual": e.configFinal.virtualScroll
      }]),
      style: $(e._scrollHeight ? { maxHeight: e._scrollHeight } : null)
    }, [
      e.ajaxLoading ? S("", !0) : (d(), h("table", {
        key: 0,
        ref: "table",
        class: k(["vue-quintable table quintable--table-container--table", [
          s.tableClasses,
          e.configFinal.stickyHeader ? "quintable--sticky-header" : "",
          e.configFinal.resizableColumns ? "quintable--resizable" : "",
          e._layoutWidths ? "quintable--fixed-layout" : ""
        ]]),
        style: $(e._layoutWidths && e._layoutWidths.table)
      }, [
        e.configFinal.headlines.length ? (d(), h("thead", Jo, [
          F("tr", {
            class: k(["vue-quintable-header-row quintable--table-container--table--header-row", { "sort-icons-visible": e.configFinal.alwaysShowSortIcons }])
          }, [
            o.hasGeneratedRows && !e.configFinal.hideRowToggle ? (d(), h("th", {
              key: 0,
              class: k(["placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th", e._pin.toggle && e._pin.toggle.cls]),
              style: $(e._extraThStyle("toggle"))
            }, t[26] || (t[26] = [
              F("wbr", null, null, -1)
            ]), 6)) : S("", !0),
            e.configFinal.select && e.configFinal.selectPosition === "pre" ? (d(), h("th", {
              key: 1,
              class: k(["select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre", e._pin.selectPre && e._pin.selectPre.cls]),
              style: $(e._extraThStyle("selectPre"))
            }, [
              e.configFinal.selectAll && !e.noRows ? (d(), h(C, { key: 0 }, [
                e.$slots["select-all-checkbox"] ? R(e.$slots, "select-all-checkbox", {
                  key: 0,
                  checked: !!e.allSelectedProperty,
                  indeterminate: e.someSelected && !e.allSelectedProperty,
                  toggle: e._toggleSelectAll
                }, void 0, !0) : e.configFinal.prettySelect ? (d(), E(l, {
                  key: 1,
                  modelValue: e.allSelectedProperty,
                  "onUpdate:modelValue": t[2] || (t[2] = (a) => e.allSelectedProperty = a),
                  "aria-label": e.configFinal.accessible ? e.configFinal.selectAllLabel : null,
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[3] || (t[3] = (a) => e.checkAll())
                }, {
                  extra: ne(() => [
                    F("span", null, [
                      e.allSelectedProperty ? (d(), E(r, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : S("", !0)
                    ]),
                    F("span", Xo, [
                      e.someSelected && !e.allSelectedProperty ? (d(), E(r, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : S("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue", "aria-label"])) : (d(), h("label", Zo, [
                  J(F("input", {
                    "onUpdate:modelValue": t[4] || (t[4] = (a) => e.allSelectedProperty = a),
                    type: "checkbox",
                    "aria-label": e.configFinal.accessible ? e.configFinal.selectAllLabel : null,
                    onChange: t[5] || (t[5] = (a) => e.checkAll())
                  }, null, 40, Yo), [
                    [_e, e.allSelectedProperty]
                  ])
                ]))
              ], 64)) : S("", !0)
            ], 6)) : S("", !0),
            e.$slots["row-prepend"] ? (d(), h("th", {
              key: 2,
              class: k(["row-prepend-th quintable--table-container--table--header-row--prepend-th", e._pin.prepend && e._pin.prepend.cls]),
              style: $(e._extraThStyle("prepend"))
            }, [
              R(e.$slots, "header-prepend", {}, void 0, !0)
            ], 6)) : S("", !0),
            (d(!0), h(C, null, q(e.configFinal.headlines, (a, p) => (d(), h(C, null, [
              o.cellVisible[p] ? (d(), h("th", H({
                key: "headline-" + p,
                class: [
                  o.headerClass[p],
                  e._pin.cols[p] && e._pin.cols[p].cls
                ],
                style: e._thStyles[p],
                "data-column": e.configFinal.resizableColumns ? p : null,
                title: e.configFinal.columns[p].title,
                ref_for: !0
              }, e.configFinal.accessible ? e._headerA11y[p] : null, {
                onClick: X((f) => e.setSortColumn(p), ["stop"]),
                onKeydown: (f) => e._onHeaderKeydown(f, p)
              }), [
                o.showHeadlines[p] && e.$slots.headline ? (d(), h("span", tr, [
                  R(e.$slots, "headline", {
                    column: e.configFinal.columns[p],
                    index: p,
                    headline: a
                  }, void 0, !0)
                ])) : o.showHeadlines[p] ? (d(), h("span", {
                  key: 1,
                  class: "headline quintable--table-container--table--header-row--th--headline",
                  innerHTML: a
                }, null, 8, sr)) : (d(), h("span", nr, t[27] || (t[27] = [
                  F("wbr", null, null, -1)
                ]))),
                e.configFinal.sorts[p] ? (d(), h("span", {
                  key: 3,
                  class: k(["sorting-icon quintable--table-container--table--header-row--th--sorting-icon", { sorted: i.currentSortIndexes[p] }])
                }, [
                  e.$slots["sort-icon"] ? R(e.$slots, "sort-icon", {
                    key: 0,
                    column: e.configFinal.columns[p],
                    index: p,
                    direction: e._sortDirection(p)
                  }, void 0, !0) : i.currentSortIndexes[p] ? (d(), E(r, {
                    key: 2,
                    icon: i.currentSortIndexes[p].asc ? "arrow-up-short-wide" : "arrow-down-wide-short"
                  }, null, 8, ["icon"])) : (d(), h(C, { key: 1 }, [
                    N(r, {
                      icon: "up-long",
                      "width-auto": ""
                    }),
                    N(r, {
                      icon: "down-long",
                      "width-auto": ""
                    })
                  ], 64)),
                  i.currentSortIndexes[p] ? (d(), h("span", {
                    key: 3,
                    class: "ms-1 text-muted",
                    onClick: X((f) => e.removeSort(p), ["stop", "prevent"])
                  }, [
                    e.numberOfSorts > 1 ? (d(), h("span", or, _(i.currentSortIndexes[p].order + 1), 1)) : (d(), h("small", rr, [
                      N(r, { icon: "xmark" })
                    ]))
                  ], 8, ir)) : S("", !0)
                ], 2)) : S("", !0),
                e.configFinal.resizableColumns && e.configFinal.columns[p].resizable !== !1 ? (d(), h("span", {
                  key: 4,
                  class: "quintable--resize-handle",
                  role: "separator",
                  "aria-orientation": "vertical",
                  tabindex: "0",
                  "aria-label": e.configFinal.resizeColumnLabel,
                  "aria-valuenow": i.columnWidths[p] || null,
                  onPointerdown: X((f) => e._startResize(f, p), ["stop", "prevent"]),
                  onClick: t[6] || (t[6] = X(() => {
                  }, ["stop"])),
                  onDblclick: t[7] || (t[7] = X((f) => e.resetColumnWidths(), ["stop"])),
                  onKeydown: X((f) => e._resizeKeydown(f, p), ["stop"])
                }, null, 40, lr)) : S("", !0)
              ], 16, er)) : S("", !0)
            ], 64))), 256)),
            e.$slots["row-append"] ? (d(), h("th", {
              key: 3,
              class: k(["row-append-th quintable--table-container--table--header-row--append-th", e._pin.append && e._pin.append.cls]),
              style: $(e._extraThStyle("append"))
            }, [
              R(e.$slots, "header-append", {}, void 0, !0)
            ], 6)) : S("", !0),
            e.configFinal.select && e.configFinal.selectPosition === "post" ? (d(), h("th", {
              key: 4,
              class: k(["select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post", e._pin.selectPost && e._pin.selectPost.cls]),
              style: $(e._extraThStyle("selectPost"))
            }, [
              e.configFinal.selectAll && !e.noRows ? (d(), h(C, { key: 0 }, [
                e.$slots["select-all-checkbox"] ? R(e.$slots, "select-all-checkbox", {
                  key: 0,
                  checked: !!e.allSelectedProperty,
                  indeterminate: e.someSelected && !e.allSelectedProperty,
                  toggle: e._toggleSelectAll
                }, void 0, !0) : e.configFinal.prettySelect ? (d(), E(l, {
                  key: 1,
                  modelValue: e.allSelectedProperty,
                  "onUpdate:modelValue": t[8] || (t[8] = (a) => e.allSelectedProperty = a),
                  "aria-label": e.configFinal.accessible ? e.configFinal.selectAllLabel : null,
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[9] || (t[9] = (a) => e.checkAll())
                }, {
                  extra: ne(() => [
                    F("span", null, [
                      e.allSelectedProperty ? (d(), E(r, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : S("", !0)
                    ]),
                    F("span", null, [
                      e.someSelected && !e.allSelectedProperty ? (d(), E(r, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : S("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue", "aria-label"])) : (d(), h("label", ar, [
                  J(F("input", {
                    "onUpdate:modelValue": t[10] || (t[10] = (a) => e.allSelectedProperty = a),
                    type: "checkbox",
                    "aria-label": e.configFinal.accessible ? e.configFinal.selectAllLabel : null,
                    onChange: t[11] || (t[11] = (a) => e.checkAll())
                  }, null, 40, cr), [
                    [_e, e.allSelectedProperty]
                  ])
                ]))
              ], 64)) : S("", !0)
            ], 6)) : S("", !0)
          ], 2),
          e.configFinal.columnFilters ? (d(), h("tr", ur, [
            o.hasGeneratedRows && !e.configFinal.hideRowToggle ? (d(), h("th", {
              key: 0,
              class: k(e._pin.toggle && e._pin.toggle.cls)
            }, null, 2)) : S("", !0),
            e.configFinal.select && e.configFinal.selectPosition === "pre" ? (d(), h("th", {
              key: 1,
              class: k(e._pin.selectPre && e._pin.selectPre.cls)
            }, null, 2)) : S("", !0),
            e.$slots["row-prepend"] ? (d(), h("th", {
              key: 2,
              class: k(e._pin.prepend && e._pin.prepend.cls)
            }, null, 2)) : S("", !0),
            (d(!0), h(C, null, q(e.configFinal.headlines, (a, p) => (d(), h(C, null, [
              o.cellVisible[p] ? (d(), h("th", {
                key: "filter-" + p,
                class: k([
                  e.configFinal.columnClasses[p],
                  e._pin.cols[p] && e._pin.cols[p].cls
                ])
              }, [
                e.configFinal.filterTypes[p] === "text" ? (d(), h("input", {
                  key: 0,
                  type: "search",
                  class: "form-control form-control-sm",
                  placeholder: e.configFinal.columnFilterPlaceholder,
                  "aria-label": e._filterLabel(p),
                  value: i.columnFilterValues[p] || "",
                  onInput: (f) => e._onFilterInput(p, f)
                }, null, 40, dr)) : e.configFinal.filterTypes[p] === "select" ? (d(), h("select", {
                  key: 1,
                  class: "form-select form-select-sm",
                  "aria-label": e._filterLabel(p),
                  value: i.columnFilterValues[p] || "",
                  onChange: (f) => e._onFilterInput(p, f)
                }, [
                  F("option", fr, _(e.configFinal.columnFilterAllLabel), 1),
                  (d(!0), h(C, null, q(e._columnFilterOptions[p], (f) => (d(), h("option", {
                    key: f,
                    value: f
                  }, _(f), 9, pr))), 128))
                ], 40, hr)) : e.configFinal.filterTypes[p] === "range" ? (d(), h("div", gr, [
                  (d(), h(C, null, q(["min", "max"], (f) => {
                    var w;
                    return F("input", {
                      key: f,
                      type: "number",
                      class: "form-control form-control-sm",
                      placeholder: f === "min" ? e.configFinal.columnFilterMinLabel : e.configFinal.columnFilterMaxLabel,
                      "aria-label": e._filterLabel(p) + " " + (f === "min" ? e.configFinal.columnFilterMinLabel : e.configFinal.columnFilterMaxLabel),
                      value: (w = (i.columnFilterValues[p] || {})[f]) != null ? w : "",
                      onInput: (b) => e._onFilterInput(p, b, f)
                    }, null, 40, mr);
                  }), 64))
                ])) : S("", !0)
              ], 2)) : S("", !0)
            ], 64))), 256)),
            e.$slots["row-append"] ? (d(), h("th", {
              key: 3,
              class: k(e._pin.append && e._pin.append.cls)
            }, null, 2)) : S("", !0),
            e.configFinal.select && e.configFinal.selectPosition === "post" ? (d(), h("th", {
              key: 4,
              class: k(e._pin.selectPost && e._pin.selectPost.cls)
            }, null, 2)) : S("", !0)
          ])) : S("", !0)
        ])) : S("", !0),
        F("tbody", {
          class: "quintable--table-container--table--tbody",
          onMouseleave: t[14] || (t[14] = (...a) => e.onMouseleaveTable && e.onMouseleaveTable(...a)),
          onMouseover: t[15] || (t[15] = (...a) => e.onCellMouseover && e.onCellMouseover(...a))
        }, [
          e.configFinal.virtualScroll ? (d(), h("tr", br, [
            F("td", {
              colspan: o.columnCount + (e.$slots["row-prepend"] ? 1 : 0) + (e.$slots["row-append"] ? 1 : 0),
              class: "quintable--virtual-spacer-cell",
              style: $({ height: i.virtualRange.top + "px" })
            }, null, 12, wr)
          ])) : S("", !0),
          (d(!0), h(C, null, q(e._renderedRowIndexes, (a, p) => (d(), h(C, {
            key: e.configFinal.reuseRows ? p : `vue-quintable-${i.uuid}-row-${a}-${i.essentialsKey}`
          }, [
            J((d(), h("tr", {
              id: "vue-quintable-" + i.uuid + "-row-" + a,
              ref_for: !0,
              ref: "row-highlighted-" + a,
              class: k([o.rowClasses[a], "vue-quintable-row quintable--table-container--table--tbody--row"]),
              style: $(o.hiddenColumns[a] > 0 ? "cursor:pointer;" : ""),
              onClick: (f) => e.onRowClick(f, a),
              onAuxclick: (f) => e.onRowAuxClick(f, a),
              onMousedown: t[13] || (t[13] = (f) => e.onRowMousedown(f)),
              onMouseenter: (f) => e._hoverRow(a, f)
            }, [
              o.hasGeneratedRows && !e.configFinal.hideRowToggle ? (d(), h("td", {
                key: 0,
                class: k(["toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td", e._pin.toggle && e._pin.toggle.cls])
              }, [
                e.configFinal.accessible && o.hiddenColumns[a] > 0 ? (d(), h("button", H({
                  key: 0,
                  ref_for: !0
                }, e._toggleA11y(a)), [
                  e.$slots["toggle-icon"] ? R(e.$slots, "toggle-icon", {
                    key: 0,
                    row: o.rowsFinal[a],
                    index: a,
                    expanded: !!i.openRows[a]
                  }, void 0, !0) : i.openRows[a] ? (d(), h("span", kr, [
                    N(r, {
                      "fixed-width": "",
                      icon: e.configFinal.expandedRowIcon
                    }, null, 8, ["icon"])
                  ])) : (d(), h("span", Sr, [
                    N(r, {
                      "fixed-width": "",
                      icon: e.configFinal.collapsedRowIcon
                    }, null, 8, ["icon"])
                  ]))
                ], 16)) : o.hiddenColumns[a] > 0 ? (d(), h("span", Fr, [
                  e.$slots["toggle-icon"] ? R(e.$slots, "toggle-icon", {
                    key: 0,
                    row: o.rowsFinal[a],
                    index: a,
                    expanded: !!i.openRows[a]
                  }, void 0, !0) : i.openRows[a] ? (d(), h("span", vr, [
                    N(r, {
                      "fixed-width": "",
                      icon: e.configFinal.expandedRowIcon
                    }, null, 8, ["icon"])
                  ])) : (d(), h("span", Rr, [
                    N(r, {
                      "fixed-width": "",
                      icon: e.configFinal.collapsedRowIcon
                    }, null, 8, ["icon"])
                  ]))
                ])) : S("", !0)
              ], 2)) : S("", !0),
              e.configFinal.select && e.configFinal.selectPosition === "pre" ? (d(), h("td", {
                key: 1,
                class: k(["select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre", [
                  { "disabled-select": o.rowsFinal[a].disableSelect },
                  e._pin.selectPre && e._pin.selectPre.cls
                ]])
              }, [
                !o.rowsFinal[a].disableSelect || o.rowsFinal[a].showDisabledSelect ? (d(), h(C, { key: 0 }, [
                  e.$slots["select-checkbox"] ? R(e.$slots, "select-checkbox", {
                    key: 0,
                    row: o.rowsFinal[a],
                    index: a,
                    checked: !!i.selected[a],
                    disabled: !!o.rowsFinal[a].disableSelect,
                    toggle: (f) => e._toggleSelect(a, f)
                  }, void 0, !0) : e.configFinal.prettySelect ? (d(), E(l, {
                    key: 1,
                    modelValue: i.selected[a],
                    "onUpdate:modelValue": (f) => i.selected[a] = f,
                    "aria-label": e.configFinal.accessible ? e.configFinal.selectRowLabel + " " + (o._visibleRowIndexMap[a] + 1) : null,
                    name: "check",
                    class: "p-icon",
                    disabled: o.rowsFinal[a].disableSelect,
                    onChange: (f) => e.checkListener(f, a)
                  }, {
                    extra: ne(() => [
                      F("span", null, [
                        i.selected[a] ? (d(), E(r, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : S("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "aria-label", "disabled", "onChange"])) : (d(), h("label", Cr, [
                    J(F("input", {
                      "onUpdate:modelValue": (f) => i.selected[a] = f,
                      type: "checkbox",
                      "aria-label": e.configFinal.accessible ? e.configFinal.selectRowLabel + " " + (o._visibleRowIndexMap[a] + 1) : null,
                      disabled: o.rowsFinal[a].disableSelect,
                      onChange: (f) => e.checkListener(f, a)
                    }, null, 40, Pr), [
                      [_e, i.selected[a]]
                    ])
                  ]))
                ], 64)) : S("", !0)
              ], 2)) : S("", !0),
              e.$slots["row-prepend"] ? (d(), h("td", {
                key: 2,
                class: k(["row-prepend-td quintable--table-container--table--tbody--row--prepend-td", e._pin.prepend && e._pin.prepend.cls])
              }, [
                R(e.$slots, "row-prepend", {
                  row: o.rowsFinal[a],
                  index: a
                }, void 0, !0)
              ], 2)) : S("", !0),
              (d(!0), h(C, null, q(o._renderRows[a], (f, w) => (d(), h(C, null, [
                f.vis ? J((d(), h("td", {
                  id: f.key,
                  key: e.configFinal.reuseRows ? w : f.key,
                  class: k(["vue-quintable-cell quintable--table-container--table--tbody--row--cell", f.cls]),
                  onClick: (b) => e.onCellClick(b, f.cell),
                  onAuxclick: (b) => e.onCellAuxClick(b, f.cell),
                  onMousedown: t[12] || (t[12] = (b) => e.onCellMousedown(b))
                }, [
                  e.$slots["cell-complete"] || e.$slots["cell-content"] ? R(e.$slots, "cell-complete", {
                    key: 0,
                    cell: f.cell
                  }, () => [
                    R(e.$slots, "cell-content", {
                      cell: f.cell
                    }, () => [
                      f.kind === "component" ? (d(), h("div", {
                        key: 0,
                        class: k(["cell-inner", f.innerClass])
                      }, [
                        (d(), E(Ee(f.value.name), H({ ref_for: !0 }, f.value.props, { onAction: e.handleComponentEvent }), null, 16, ["onAction"]))
                      ], 2)) : f.kind === "html" ? (d(), h("div", {
                        key: 1,
                        class: k(["cell-inner", f.innerClass]),
                        innerHTML: f.value
                      }, null, 10, _r)) : f.kind === "text" && f.marks ? (d(), h("div", {
                        key: 2,
                        class: k(["cell-inner", f.innerClass])
                      }, [
                        (d(!0), h(C, null, q(f.marks, (b, y) => (d(), h(C, { key: y }, [
                          b.mark ? (d(), h("mark", Er, _(b.text), 1)) : (d(), h(C, { key: 1 }, [
                            ie(_(b.text), 1)
                          ], 64))
                        ], 64))), 128))
                      ], 2)) : f.kind === "text" ? (d(), h("div", {
                        key: 3,
                        class: k(["cell-inner", f.innerClass])
                      }, _(f.value), 3)) : S("", !0)
                    ], !0)
                  ], !0) : f.kind === "component" ? (d(), h("div", {
                    key: 1,
                    class: k(["cell-inner", f.innerClass])
                  }, [
                    (d(), E(Ee(f.value.name), H({ ref_for: !0 }, f.value.props, { onAction: e.handleComponentEvent }), null, 16, ["onAction"]))
                  ], 2)) : f.kind === "html" ? (d(), h("div", {
                    key: 2,
                    class: k(["cell-inner", f.innerClass]),
                    innerHTML: f.value
                  }, null, 10, Ar)) : f.kind === "text" && f.marks ? (d(), h("div", {
                    key: 3,
                    class: k(["cell-inner", f.innerClass])
                  }, [
                    (d(!0), h(C, null, q(f.marks, (b, y) => (d(), h(C, { key: y }, [
                      b.mark ? (d(), h("mark", Tr, _(b.text), 1)) : (d(), h(C, { key: 1 }, [
                        ie(_(b.text), 1)
                      ], 64))
                    ], 64))), 128))
                  ], 2)) : f.kind === "text" ? (d(), h("div", {
                    key: 4,
                    class: k(["cell-inner", f.innerClass])
                  }, _(f.value), 3)) : S("", !0)
                ], 42, Or)), [
                  [g, f.tooltip]
                ]) : S("", !0)
              ], 64))), 256)),
              e.$slots["row-append"] ? (d(), h("td", {
                key: 3,
                class: k(["row-append-td quintable--table-container--table--tbody--row--append-td", e._pin.append && e._pin.append.cls])
              }, [
                R(e.$slots, "row-append", {
                  row: o.rowsFinal[a],
                  index: a
                }, void 0, !0)
              ], 2)) : S("", !0),
              e.configFinal.select && e.configFinal.selectPosition === "post" ? (d(), h("td", {
                key: 4,
                class: k(["select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post", [
                  { "disabled-select": o.rowsFinal[a].disableSelect },
                  e._pin.selectPost && e._pin.selectPost.cls
                ]])
              }, [
                !o.rowsFinal[a].disableSelect || o.rowsFinal[a].showDisabledSelect ? (d(), h(C, { key: 0 }, [
                  e.$slots["select-checkbox"] ? R(e.$slots, "select-checkbox", {
                    key: 0,
                    row: o.rowsFinal[a],
                    index: a,
                    checked: !!i.selected[a],
                    disabled: !!o.rowsFinal[a].disableSelect,
                    toggle: (f) => e._toggleSelect(a, f)
                  }, void 0, !0) : e.configFinal.prettySelect ? (d(), E(l, {
                    key: 1,
                    modelValue: i.selected[a],
                    "onUpdate:modelValue": (f) => i.selected[a] = f,
                    "aria-label": e.configFinal.accessible ? e.configFinal.selectRowLabel + " " + (o._visibleRowIndexMap[a] + 1) : null,
                    name: "check",
                    class: "p-icon",
                    disabled: o.rowsFinal[a].disableSelect,
                    onChange: (f) => e.checkListener(f, a)
                  }, {
                    extra: ne(() => [
                      F("span", null, [
                        i.selected[a] ? (d(), E(r, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : S("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "aria-label", "disabled", "onChange"])) : (d(), h("label", qr, [
                    J(F("input", {
                      "onUpdate:modelValue": (f) => i.selected[a] = f,
                      type: "checkbox",
                      "aria-label": e.configFinal.accessible ? e.configFinal.selectRowLabel + " " + (o._visibleRowIndexMap[a] + 1) : null,
                      disabled: o.rowsFinal[a].disableSelect,
                      onChange: (f) => e.checkListener(f, a)
                    }, null, 40, Lr), [
                      [_e, i.selected[a]]
                    ])
                  ]))
                ], 64)) : S("", !0)
              ], 2)) : S("", !0)
            ], 46, yr)), [
              [g, {
                placement: "top",
                content: o.rowsFinal[a].tooltip,
                trigger: o.rowsFinal[a].tooltip ? "hover" : "manual",
                offset: 5
              }]
            ]),
            (o.generatedRows[a] || o.stickyRows[a]) && o.visibleRows[a] ? (d(), h(C, { key: 0 }, [
              i.generatedUpdatedKey && i.openRows[a] && Object.keys(o.generatedRows[a]).length || Object.keys(o.stickyRows[a]).length ? (d(), h("tr", {
                key: "generated-row-" + a + "-" + i.essentialsKey + "-" + i.generatedUpdatedKey,
                ref_for: !0,
                ref: "generated-row-highlighted-" + a,
                class: k(["generated-row quintable--table-container--table--tbody--generated-row", {
                  "parent-row-expanded": i.openRows[a],
                  "parent-row-collapsed": o.hiddenColumns[a] > 0 && !i.openRows[a]
                }]),
                onMouseenter: (f) => e._hoverRow(a, f),
                onClick: (f) => e.onRowClick(f, a)
              }, [
                F("td", {
                  colspan: o.columnCount + (e.$slots["row-prepend"] ? 1 : 0) + (e.$slots["row-append"] ? 1 : 0),
                  class: "ps-0 pe-0 pt-0"
                }, [
                  N(u, { row: a }, {
                    default: ne(({ hovered: f }) => [
                      e.$slots.details ? (d(), h("div", Mr, [
                        R(e.$slots, "details", {
                          row: o.rowsFinal[a],
                          index: a,
                          cells: o._detailsSlotCells(a),
                          hovered: f
                        }, void 0, !0)
                      ])) : (d(), h("table", Ur, [
                        F("tbody", null, [
                          (d(!0), h(C, null, q(o._detailCells[a], (w) => (d(), h(C, {
                            key: w.kind
                          }, [
                            (d(!0), h(C, null, q(w.cells, (b) => (d(), h(C, {
                              key: b.key
                            }, [
                              w.open ? (d(), h("tr", {
                                key: 0,
                                id: b.id,
                                class: k(w.rowClass)
                              }, [
                                !e.configFinal.hideRowToggle && o.generatedRows[a] && Object.keys(o.generatedRows[a]).length ? (d(), h("td", Vr, [
                                  o.hiddenColumns[a] > 0 ? (d(), h("span", Hr, [
                                    e.$slots["toggle-icon"] ? R(e.$slots, "toggle-icon", {
                                      key: 0,
                                      row: o.rowsFinal[a],
                                      index: a,
                                      expanded: !!i.openRows[a]
                                    }, void 0, !0) : i.openRows[a] ? (d(), h("span", $r, [
                                      N(r, {
                                        "fixed-width": "",
                                        icon: e.configFinal.expandedRowIcon
                                      }, null, 8, ["icon"])
                                    ])) : (d(), h("span", Dr, [
                                      N(r, {
                                        "fixed-width": "",
                                        icon: e.configFinal.collapsedRowIcon
                                      }, null, 8, ["icon"])
                                    ]))
                                  ])) : S("", !0)
                                ])) : S("", !0),
                                o.showHeadlines[b.cIndex] || e.configFinal.sorts[b.cIndex] ? (d(), h("td", {
                                  key: 1,
                                  class: k([
                                    e.configFinal.columnClasses[b.cIndex],
                                    "generated-cell-element",
                                    w.headlineClass
                                  ]),
                                  onClick: X((y) => e.setSortColumn(b.cIndex), ["stop"])
                                }, [
                                  o.showHeadlines[b.cIndex] && e.$slots.headline ? (d(), h("strong", zr, [
                                    R(e.$slots, "headline", {
                                      column: e.configFinal.columns[b.cIndex],
                                      index: Number(b.cIndex),
                                      headline: e.configFinal.headlines[b.cIndex]
                                    }, void 0, !0)
                                  ])) : o.showHeadlines[b.cIndex] ? (d(), h("strong", {
                                    key: 1,
                                    innerHTML: e.configFinal.headlines[b.cIndex]
                                  }, null, 8, xr)) : (d(), h("span", Wr, t[28] || (t[28] = [
                                    F("wbr", null, null, -1)
                                  ]))),
                                  e.configFinal.sorts[b.cIndex] && (f || i.noHover) ? (d(), h("span", {
                                    key: 3,
                                    class: k(["sorting-icon cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon", {
                                      sorted: i.currentSortIndexes[b.cIndex]
                                    }])
                                  }, [
                                    e.$slots["sort-icon"] ? R(e.$slots, "sort-icon", {
                                      key: 0,
                                      column: e.configFinal.columns[b.cIndex],
                                      index: Number(b.cIndex),
                                      direction: e._sortDirection(b.cIndex)
                                    }, void 0, !0) : i.currentSortIndexes[b.cIndex] ? (d(), E(r, {
                                      key: 2,
                                      icon: i.currentSortIndexes[b.cIndex].asc ? "arrow-up-short-wide" : "arrow-down-wide-short"
                                    }, null, 8, ["icon"])) : (d(), h(C, { key: 1 }, [
                                      N(r, {
                                        icon: "up-long",
                                        "width-auto": ""
                                      }),
                                      N(r, {
                                        icon: "down-long",
                                        "width-auto": ""
                                      })
                                    ], 64)),
                                    i.currentSortIndexes[b.cIndex] ? (d(), h("span", {
                                      key: 3,
                                      class: "ms-1 text-muted",
                                      onClick: X((y) => e.removeSort(b.cIndex), ["stop", "prevent"])
                                    }, [
                                      e.numberOfSorts > 1 ? (d(), h("span", Qr, _(i.currentSortIndexes[b.cIndex].order + 1), 1)) : (d(), h("small", Gr, [
                                        N(r, { icon: "xmark" })
                                      ]))
                                    ], 8, Kr)) : S("", !0)
                                  ], 2)) : S("", !0)
                                ], 10, Ir)) : S("", !0),
                                J((d(), h("td", {
                                  colspan: !o.showHeadlines[b.cIndex] && !e.configFinal.sorts[b.cIndex] ? 2 : 1,
                                  class: k([
                                    e.configFinal.columnClasses[b.cIndex] + " " + o.cellClassesParsed[a][b.cIndex],
                                    "generated-cell-element generated-cell-element-content",
                                    w.contentClass
                                  ]),
                                  onClick: (y) => e.onCellClick(y, b.cell)
                                }, [
                                  e.$slots[w.kind + "-cell-complete"] || e.$slots[w.kind + "-cell-content"] ? R(e.$slots, w.kind + "-cell-complete", {
                                    key: 0,
                                    cell: b.cell
                                  }, () => [
                                    R(e.$slots, w.kind + "-cell-content", {
                                      cell: b.cell
                                    }, () => [
                                      b.kind === "component" ? (d(), h("div", {
                                        key: 0,
                                        class: k(["cell-inner", b.innerClass])
                                      }, [
                                        (d(), E(Ee(b.value.name), H({ ref_for: !0 }, b.value.props, { onAction: e.handleComponentEvent }), null, 16, ["onAction"]))
                                      ], 2)) : b.kind === "html" ? (d(), h("div", {
                                        key: 1,
                                        class: k(["cell-inner", b.innerClass]),
                                        innerHTML: b.value
                                      }, null, 10, Xr)) : b.kind === "text" && b.marks ? (d(), h("div", {
                                        key: 2,
                                        class: k(["cell-inner", b.innerClass])
                                      }, [
                                        (d(!0), h(C, null, q(b.marks, (y, P) => (d(), h(C, { key: P }, [
                                          y.mark ? (d(), h("mark", Zr, _(y.text), 1)) : (d(), h(C, { key: 1 }, [
                                            ie(_(y.text), 1)
                                          ], 64))
                                        ], 64))), 128))
                                      ], 2)) : b.kind === "text" ? (d(), h("div", {
                                        key: 3,
                                        class: k(["cell-inner", b.innerClass])
                                      }, _(b.value), 3)) : S("", !0)
                                    ], !0)
                                  ], !0) : b.kind === "component" ? (d(), h("div", {
                                    key: 1,
                                    class: k(["cell-inner", b.innerClass])
                                  }, [
                                    (d(), E(Ee(b.value.name), H({ ref_for: !0 }, b.value.props, { onAction: e.handleComponentEvent }), null, 16, ["onAction"]))
                                  ], 2)) : b.kind === "html" ? (d(), h("div", {
                                    key: 2,
                                    class: k(["cell-inner", b.innerClass]),
                                    innerHTML: b.value
                                  }, null, 10, Yr)) : b.kind === "text" && b.marks ? (d(), h("div", {
                                    key: 3,
                                    class: k(["cell-inner", b.innerClass])
                                  }, [
                                    (d(!0), h(C, null, q(b.marks, (y, P) => (d(), h(C, { key: P }, [
                                      y.mark ? (d(), h("mark", el, _(y.text), 1)) : (d(), h(C, { key: 1 }, [
                                        ie(_(y.text), 1)
                                      ], 64))
                                    ], 64))), 128))
                                  ], 2)) : b.kind === "text" ? (d(), h("div", {
                                    key: 4,
                                    class: k(["cell-inner", b.innerClass])
                                  }, _(b.value), 3)) : S("", !0)
                                ], 10, Jr)), [
                                  [g, b.tooltip]
                                ])
                              ], 10, Br)) : S("", !0)
                            ], 64))), 128))
                          ], 64))), 128))
                        ])
                      ]))
                    ]),
                    _: 2
                  }, 1032, ["row"])
                ], 8, Nr)
              ], 42, jr)) : S("", !0)
            ], 64)) : S("", !0)
          ], 64))), 128)),
          e.configFinal.virtualScroll ? (d(), h("tr", tl, [
            F("td", {
              colspan: o.columnCount + (e.$slots["row-prepend"] ? 1 : 0) + (e.$slots["row-append"] ? 1 : 0),
              class: "quintable--virtual-spacer-cell",
              style: $({ height: i.virtualRange.bottom + "px" })
            }, null, 12, sl)
          ])) : S("", !0)
        ], 32)
      ], 6)),
      i.ajaxError && !e.ajaxLoading && e.$slots.error ? (d(), h("div", nl, [
        R(e.$slots, "error", {
          error: i.ajaxError,
          reload: e._reloadPage
        }, void 0, !0)
      ])) : e.noRows && !e.ajaxLoading ? (d(), h(C, { key: 2 }, [
        e.$slots.empty && e._hasNoRowsAtAll ? (d(), h("div", il, [
          R(e.$slots, "empty", {}, void 0, !0)
        ])) : (d(), h("div", ol, [
          R(e.$slots, "no-results", {}, () => [
            F("div", rl, [
              F("em", {
                innerHTML: e.configFinal.emptyPlaceholder
              }, null, 8, ll)
            ])
          ], !0),
          t[29] || (t[29] = F("hr", null, null, -1))
        ]))
      ], 64)) : S("", !0)
    ], 6),
    e.ajaxLoading ? (d(), h("div", al, [
      R(e.$slots, "loading", { hiddenBreakpoints: i.hiddenBreakpoints }, () => [
        e.configFinal.skeletonLoading ? (d(), h("div", cl, [
          F("div", ul, [
            F("div", dl, [
              o.skeleton.toggle ? (d(), h("div", hl)) : S("", !0),
              e.configFinal.select && e.configFinal.selectPosition === "pre" ? (d(), h("div", fl)) : S("", !0),
              e.$slots["row-prepend"] ? (d(), h("div", pl)) : S("", !0),
              (d(!0), h(C, null, q(e.configFinal.headlines, (a, p) => (d(), h(C, null, [
                o.skeleton.columns[p] ? (d(), h("div", {
                  key: "skeleton-headline-" + p,
                  class: k(["quintable--skeleton--cell", o.headerClass[p]])
                }, [
                  o.showHeadlines[p] && e.$slots.headline ? (d(), h("span", gl, [
                    R(e.$slots, "headline", {
                      column: e.configFinal.columns[p],
                      index: p,
                      headline: a
                    }, void 0, !0)
                  ])) : (d(), h("span", {
                    key: 1,
                    class: "quintable--skeleton--headline",
                    innerHTML: o.showHeadlines[p] ? a : ""
                  }, null, 8, ml)),
                  e.configFinal.sorts[p] ? (d(), h("span", bl)) : S("", !0)
                ], 2)) : S("", !0)
              ], 64))), 256)),
              e.$slots["row-append"] ? (d(), h("div", wl)) : S("", !0),
              e.configFinal.select && e.configFinal.selectPosition === "post" ? (d(), h("div", yl)) : S("", !0)
            ])
          ]),
          F("div", Sl, [
            (d(!0), h(C, null, q(o.skeleton.rows, (a) => (d(), h("div", {
              key: "skeleton-row-" + a,
              class: "quintable--skeleton--row quintable--table-container--table--tbody--row"
            }, [
              o.skeleton.toggle ? (d(), h("div", kl)) : S("", !0),
              e.configFinal.select && e.configFinal.selectPosition === "pre" ? (d(), h("div", Fl)) : S("", !0),
              e.$slots["row-prepend"] ? (d(), h("div", Rl)) : S("", !0),
              (d(!0), h(C, null, q(e.configFinal.headlines, (p, f) => (d(), h(C, null, [
                o.skeleton.columns[f] ? (d(), h("div", {
                  key: "skeleton-cell-" + f,
                  class: k(["quintable--skeleton--cell quintable--table-container--table--tbody--row--cell", e.configFinal.columnClasses[f]])
                }, t[30] || (t[30] = [
                  F("span", { class: "quintable--skeleton--bar" }, null, -1)
                ]), 2)) : S("", !0)
              ], 64))), 256)),
              e.$slots["row-append"] ? (d(), h("div", vl)) : S("", !0),
              e.configFinal.select && e.configFinal.selectPosition === "post" ? (d(), h("div", Cl)) : S("", !0)
            ]))), 128))
          ])
        ])) : (d(), h("div", {
          key: 1,
          class: "loader-wrapper quintable--loading--loader-wrapper",
          style: $("height:" + i.loaderHeight + "px;")
        }, [
          F("div", Pl, [
            N(r, {
              icon: "circle-notch",
              spin: "",
              class: "ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader"
            })
          ])
        ], 4))
      ], !0)
    ])) : S("", !0),
    F("div", Ol, [
      F("div", _l, [
        F("div", El, [
          e.configFinal.multiSortSelect || e.configFinal.pageSortSelect ? (d(), h("div", {
            key: 0,
            class: k(
              `pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select flex-inline ${e.configFinal.pageSort ? "me-3" : ""}`.trim()
            )
          }, [
            e.$slots["sort-switches"] ? R(e.$slots, "sort-switches", {
              key: 0,
              multiSort: o.multiSort,
              pageSort: e.pageSort,
              setMultiSort: (a) => o.multiSort = a,
              setPageSort: (a) => e.pageSort = a
            }, void 0, !0) : (d(), h(C, { key: 1 }, [
              e.configFinal.multiSortSelect ? (d(), E(l, {
                key: 0,
                modelValue: o.multiSort,
                "onUpdate:modelValue": t[16] || (t[16] = (a) => o.multiSort = a),
                class: "p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select",
                value: "true"
              }, {
                default: ne(() => [
                  ie(_(e.configFinal.multiSortPlaceholder), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : S("", !0),
              e.configFinal.pageSortSelect ? (d(), E(l, {
                key: 1,
                modelValue: e.pageSort,
                "onUpdate:modelValue": t[17] || (t[17] = (a) => e.pageSort = a),
                class: "p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select",
                value: "true"
              }, {
                default: ne(() => [
                  ie(_(e.configFinal.pageSortPlaceholder), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : S("", !0)
            ], 64))
          ], 2)) : S("", !0)
        ]),
        F("div", Al, [
          e.configFinal && e.configFinal.pagination ? (d(), h("div", Tl, [
            e.configFinal.rowsSelect ? (d(), h("div", ql, [
              e.$slots["rows-per-page"] ? R(e.$slots, "rows-per-page", {
                key: 0,
                value: e.currentRowsPerPageProperty,
                options: e.paginationOptionsFilled,
                setRowsPerPage: (a) => e.currentRowsPerPageProperty = a,
                placeholder: e.configFinal.rowsPlaceholder
              }, void 0, !0) : (d(), h(C, { key: 1 }, [
                F("span", {
                  class: "d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder",
                  innerHTML: e.configFinal.rowsPlaceholder
                }, null, 8, Ll),
                N(c, {
                  modelValue: e.currentRowsPerPageProperty,
                  "onUpdate:modelValue": t[18] || (t[18] = (a) => e.currentRowsPerPageProperty = a),
                  class: "d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select",
                  options: e.paginationOptionsFilled,
                  clearable: !1
                }, null, 8, ["modelValue", "options"])
              ], 64))
            ])) : S("", !0),
            e.$slots.pagination && e.configFinal && e.configFinal.pagination && e.pages > 1 ? R(e.$slots, "pagination", {
              key: 1,
              page: i.currentPage,
              pages: e.pages,
              setPage: e.gotoPage
            }, void 0, !0) : e.configFinal && e.configFinal.pagination && e.pages > 1 ? (d(), h("nav", {
              key: 2,
              "aria-label": e.configFinal.accessible ? e.configFinal.paginationLabel : null,
              class: k(["d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav", { "me-3": e.numberOfVisibleRows, disabled: e.ajaxLoading }])
            }, [
              F("ul", {
                class: "pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination",
                onKeydown: t[25] || (t[25] = (...a) => e._onPaginationKeydown && e._onPaginationKeydown(...a))
              }, [
                e.pages > e.pageRange ? (d(), h("li", {
                  key: 0,
                  class: k(["page-item", { disabled: i.currentPage <= 1 }]),
                  onClick: t[19] || (t[19] = (a) => e.gotoPage("first"))
                }, [
                  F("span", H(
                    { class: "page-link" },
                    e.configFinal.accessible ? e._pageLinkA11y(e.configFinal.firstPageLabel) : null
                  ), [
                    e.$slots["pagination-icon"] ? R(e.$slots, "pagination-icon", {
                      key: 0,
                      type: "first"
                    }, void 0, !0) : (d(), E(r, {
                      key: 1,
                      icon: "angles-left"
                    }))
                  ], 16)
                ], 2)) : S("", !0),
                F("li", {
                  class: k(["page-item", { disabled: i.currentPage <= 1 }]),
                  onClick: t[20] || (t[20] = (a) => e.gotoPage("prev"))
                }, [
                  F("span", H(
                    { class: "page-link" },
                    e.configFinal.accessible ? e._pageLinkA11y(e.configFinal.previousPageLabel) : null
                  ), [
                    e.$slots["pagination-icon"] ? R(e.$slots, "pagination-icon", {
                      key: 0,
                      type: "prev"
                    }, void 0, !0) : (d(), E(r, {
                      key: 1,
                      icon: "angle-left"
                    }))
                  ], 16)
                ], 2),
                e.pageRange < e.pages && e.visiblePages[0] > 1 ? (d(), h("li", {
                  key: 1,
                  class: "page-item",
                  onClick: t[21] || (t[21] = (a) => e.updatePageOffset(-1))
                }, [
                  F("span", H({ class: "page-link" }, e.configFinal.accessible ? e._pageLinkA11y() : null), " ... ", 16)
                ])) : S("", !0),
                (d(!0), h(C, null, q(e.visiblePages, (a) => (d(), h("li", {
                  key: "pagination-item-" + a,
                  class: k(["page-item", { active: a === i.currentPage }]),
                  onClick: (p) => e.gotoPage(a)
                }, [
                  F("span", H(
                    {
                      class: "page-link",
                      ref_for: !0
                    },
                    e.configFinal.accessible ? e._pageLinkA11y(null, a === i.currentPage) : null
                  ), _(a), 17)
                ], 10, Nl))), 128)),
                e.pageRange < e.pages && e.visiblePages[e.visiblePages.length - 1] < e.pages ? (d(), h("li", {
                  key: 2,
                  class: "page-item",
                  onClick: t[22] || (t[22] = (a) => e.updatePageOffset(1))
                }, [
                  F("span", H({ class: "page-link" }, e.configFinal.accessible ? e._pageLinkA11y() : null), " ... ", 16)
                ])) : S("", !0),
                F("li", {
                  class: k(["page-item", { disabled: e.pages === i.currentPage }]),
                  onClick: t[23] || (t[23] = (a) => e.gotoPage("next"))
                }, [
                  F("span", H(
                    { class: "page-link" },
                    e.configFinal.accessible ? e._pageLinkA11y(e.configFinal.nextPageLabel) : null
                  ), [
                    e.$slots["pagination-icon"] ? R(e.$slots, "pagination-icon", {
                      key: 0,
                      type: "next"
                    }, void 0, !0) : (d(), E(r, {
                      key: 1,
                      icon: "angle-right"
                    }))
                  ], 16)
                ], 2),
                e.pages > e.pageRange ? (d(), h("li", {
                  key: 3,
                  class: k(["page-item", { disabled: e.pages === i.currentPage }]),
                  onClick: t[24] || (t[24] = (a) => e.gotoPage("last"))
                }, [
                  F("span", H(
                    { class: "page-link" },
                    e.configFinal.accessible ? e._pageLinkA11y(e.configFinal.lastPageLabel) : null
                  ), [
                    e.$slots["pagination-icon"] ? R(e.$slots, "pagination-icon", {
                      key: 0,
                      type: "last"
                    }, void 0, !0) : (d(), E(r, {
                      key: 1,
                      icon: "angles-right"
                    }))
                  ], 16)
                ], 2)) : S("", !0)
              ], 32)
            ], 10, jl)) : S("", !0),
            e.numberOfVisibleRows ? (d(), h("span", Ml, [
              e.$slots["rows-info"] ? R(e.$slots, "rows-info", {
                key: 0,
                first: e.firstVisibleRow,
                last: e.lastVisibleRow,
                total: e.numberOfVisibleRows
              }, void 0, !0) : (d(), h(C, { key: 1 }, [
                ie(_(e.firstVisibleRow) + "-" + _(e.lastVisibleRow) + " " + _(e.configFinal.numberOfVisibleRowsFillerWord) + " " + _(e.numberOfVisibleRows), 1)
              ], 64))
            ])) : S("", !0)
          ])) : S("", !0)
        ])
      ])
    ]),
    F("div", Ul, [
      R(e.$slots, "footer", {}, void 0, !0)
    ])
  ], 4);
}
const Vl = /* @__PURE__ */ ht(Do, [["render", Bl], ["__scopeId", "data-v-540f117d"]]), fa = (e, t = {}) => {
  e.component("VueQuintable", Vl), mn(e), Cn(e), gn(e), t.defaults && e.provide("vueQuintableDefaults", t.defaults), t.axios && (e.config.globalProperties.$globalVueQuintableaxios = t.axios);
};
export {
  Vl as VueQuintable,
  fa as default
};
//# sourceMappingURL=vue-quintable.es.js.map
