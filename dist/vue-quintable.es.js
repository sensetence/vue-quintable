var Zt = Object.defineProperty, Yt = Object.defineProperties;
var en = Object.getOwnPropertyDescriptors;
var it = Object.getOwnPropertySymbols;
var tn = Object.prototype.hasOwnProperty, nn = Object.prototype.propertyIsEnumerable;
var ae = (t, e) => {
  if (e = Symbol[t])
    return e;
  throw Error("Symbol." + t + " is not defined");
};
var rt = (t, e, n) => e in t ? Zt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, D = (t, e) => {
  for (var n in e || (e = {}))
    tn.call(e, n) && rt(t, n, e[n]);
  if (it)
    for (var n of it(e))
      nn.call(e, n) && rt(t, n, e[n]);
  return t;
}, ot = (t, e) => Yt(t, en(e));
var z = (t, e, n) => new Promise((s, i) => {
  var r = (c) => {
    try {
      a(n.next(c));
    } catch (l) {
      i(l);
    }
  }, o = (c) => {
    try {
      a(n.throw(c));
    } catch (l) {
      i(l);
    }
  }, a = (c) => c.done ? s(c.value) : Promise.resolve(c.value).then(r, o);
  a((n = n.apply(t, e)).next());
}), J = function(t, e) {
  this[0] = t, this[1] = e;
}, Ue = (t, e, n) => {
  var s = (o, a, c, l) => {
    try {
      var u = n[o](a), d = (a = u.value) instanceof J, m = u.done;
      Promise.resolve(d ? a[0] : a).then((b) => d ? s(o === "return" ? o : "next", a[1] ? { done: b.done, value: b.value } : b, c, l) : c({ value: b, done: m })).catch((b) => s("throw", b, c, l));
    } catch (b) {
      l(b);
    }
  }, i = (o) => r[o] = (a) => new Promise((c, l) => s(o, a, c, l)), r = {};
  return n = n.apply(t, e), r[Symbol.asyncIterator] = () => r, i("next"), i("throw"), i("return"), r;
}, Be = (t) => {
  var e = t[ae("asyncIterator")], n = !1, s, i = {};
  return e == null ? (e = t[ae("iterator")](), s = (r) => i[r] = (o) => e[r](o)) : (e = e.call(t), s = (r) => i[r] = (o) => {
    if (n) {
      if (n = !1, r === "throw")
        throw o;
      return o;
    }
    return n = !0, {
      done: !1,
      value: new J(new Promise((a) => {
        var c = e[r](o);
        if (!(c instanceof Object))
          throw TypeError("Object expected");
        a(c);
      }), 1)
    };
  }), i[ae("iterator")] = () => i, s("next"), "throw" in e ? s("throw") : i.throw = (r) => {
    throw r;
  }, "return" in e && s("return"), i;
}, at = (t, e, n) => (e = t[ae("asyncIterator")]) ? e.call(t) : (t = t[ae("iterator")](), e = {}, n = (s, i) => (i = t[s]) && (e[s] = (r) => new Promise((o, a, c) => (r = i.call(t, r), c = r.done, Promise.resolve(r.value).then((l) => o({ value: l, done: c }), a)))), n("next"), n("return"), e);
import sn from "vue-select";
import { library as C } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as rn } from "@fortawesome/vue-fontawesome";
import on from "v-tooltip";
import { faAngleDoubleLeft as an, faAngleDoubleRight as ln, faAngleLeft as cn, faAngleRight as un, faCaretDown as hn, faCaretUp as fn, faCheck as dn, faChevronDown as pn, faChevronUp as gn, faCircleNotch as mn, faEye as bn, faEyeSlash as wn, faMinus as yn, faPlus as Sn, faSort as Rn, faSortAmountDown as _n, faSortAmountDownAlt as xn, faSquare as Cn, faTimes as Fn } from "@fortawesome/free-solid-svg-icons";
import lt from "fuzzy.js";
var vn = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function qn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var qt = { exports: {} };
/*!
 * pretty-checkbox-vue v1.1.9
 * (c) 2017-2018 Hamed Ehtesham
 * Released under the MIT License.
 */
(function(t, e) {
  (function(n, s) {
    t.exports = s();
  })(typeof self != "undefined" ? self : vn, function() {
    return function(n) {
      var s = {};
      function i(r) {
        if (s[r])
          return s[r].exports;
        var o = s[r] = { i: r, l: !1, exports: {} };
        return n[r].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
      }
      return i.m = n, i.c = s, i.d = function(r, o, a) {
        i.o(r, o) || Object.defineProperty(r, o, { configurable: !1, enumerable: !0, get: a });
      }, i.n = function(r) {
        var o = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(o, "a", o), o;
      }, i.o = function(r, o) {
        return Object.prototype.hasOwnProperty.call(r, o);
      }, i.p = "", i(i.s = 1);
    }([function(n, s) {
      n.exports = function(i, r, o, a, c, l) {
        var u, d = i = i || {}, m = typeof i.default;
        m !== "object" && m !== "function" || (u = i, d = i.default);
        var b, f = typeof d == "function" ? d.options : d;
        if (r && (f.render = r.render, f.staticRenderFns = r.staticRenderFns, f._compiled = !0), o && (f.functional = !0), c && (f._scopeId = c), l ? (b = function(y) {
          (y = y || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || typeof __VUE_SSR_CONTEXT__ == "undefined" || (y = __VUE_SSR_CONTEXT__), a && a.call(this, y), y && y._registeredComponents && y._registeredComponents.add(l);
        }, f._ssrRegister = b) : a && (b = a), b) {
          var g = f.functional, p = g ? f.render : f.beforeCreate;
          g ? (f._injectStyles = b, f.render = function(y, R) {
            return b.call(R), p(y, R);
          }) : f.beforeCreate = p ? [].concat(p, b) : [b];
        }
        return { esModule: u, exports: d, options: f };
      };
    }, function(n, s, i) {
      var r = i(0)(i(2), null, !1, null, null, null);
      r.options.__file = "src/PrettyCheckbox.vue", n.exports = r.exports;
    }, function(n, s, i) {
      Object.defineProperty(s, "__esModule", { value: !0 });
      var r = i(3), o = { name: "pretty-checkbox", input_type: "checkbox", model: r.model, props: r.props, data: r.data, computed: r.computed, watch: r.watch, mounted: r.mounted, methods: r.methods, render: r.render };
      s.default = o;
    }, function(n, s, i) {
      var r = i(0)(i(4), i(5), !1, null, null, null);
      r.options.__file = "src/PrettyInput.vue", n.exports = r.exports;
    }, function(n, s, i) {
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
        var r = { state: !0, "p-on": this._toggle };
        return this.color && (r["p-" + this.color] = !0), r;
      }, offClasses: function() {
        var r = { state: !0, "p-off": !0 };
        return this.offColor && (r["p-" + this.offColor] = !0), r;
      }, hoverClasses: function() {
        var r = { state: !0, "p-is-hover": !0 };
        return this.hoverColor && (r["p-" + this.hoverColor] = !0), r;
      }, indeterminateClasses: function() {
        var r = { state: !0, "p-is-indeterminate": !0 };
        return this.indeterminateColor && (r["p-" + this.indeterminateColor] = !0), r;
      } }, watch: { checked: function(r) {
        this.m_checked = r;
      }, indeterminate: function(r) {
        this.$refs.input.indeterminate = r;
      } }, mounted: function() {
        this.$vnode.data && !this.$vnode.data.staticClass && (this.default_mode = !0), this._indeterminate && (this.$refs.input.indeterminate = !0), this.$el.setAttribute("p-" + this._type, "");
      }, methods: { updateInput: function(r) {
        if (this._type !== "radio") {
          this.$emit("update:indeterminate", !1);
          var o = r.target.checked;
          if (this.m_checked = o, this.modelValue instanceof Array) {
            var a = [].concat(function(c) {
              if (Array.isArray(c)) {
                for (var l = 0, u = Array(c.length); l < c.length; l++)
                  u[l] = c[l];
                return u;
              }
              return Array.from(c);
            }(this.modelValue));
            o ? a.push(this.value) : a.splice(a.indexOf(this.value), 1), this.$emit("change", a);
          } else
            this.$emit("change", o ? !this._trueValue || this.trueValue : !!this._falseValue && this.falseValue);
        } else
          this.$emit("change", this.value);
      } } };
    }, function(n, s, i) {
      var r = function() {
        var o = this.$createElement, a = this._self._c || o;
        return a("div", { class: this.classes }, [a("input", { ref: "input", attrs: { type: this._type, name: this.name, disabled: this._disabled, required: this._required }, domProps: { checked: this.shouldBeChecked, value: this.value }, on: { change: this.updateInput } }), this._v(" "), a("div", { class: this.onClasses }, [this._t("extra"), this._v(" "), a("label", [this._t("default")], 2)], 2), this._v(" "), this._toggle ? a("div", { class: this.offClasses }, [this._t("off-extra"), this._v(" "), this._t("off-label")], 2) : this._e(), this._v(" "), this._hover ? a("div", { class: this.hoverClasses }, [this._t("hover-extra"), this._v(" "), this._t("hover-label")], 2) : this._e(), this._v(" "), this._indeterminate ? a("div", { class: this.indeterminateClasses }, [this._t("indeterminate-extra"), this._v(" "), this._t("indeterminate-label")], 2) : this._e()]);
      };
      r._withStripped = !0, n.exports = { render: r, staticRenderFns: [] };
    }]);
  });
})(qt);
var Pn = qt.exports;
const kn = /* @__PURE__ */ qn(Pn);
const me = {
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1400px)"
}, ct = typeof window != "undefined" && typeof window.matchMedia == "function";
let we = null;
class On {
  constructor() {
    if (this._subscribers = /* @__PURE__ */ new Set(), this._mqls = {}, this.hiddenBreakpoints = [], this._onChange = this._onChange.bind(this), this._compute(), ct)
      for (const e in me) {
        const n = window.matchMedia(me[e]);
        this._mqls[e] = n, n.addEventListener ? n.addEventListener("change", this._onChange) : n.addListener(this._onChange);
      }
  }
  _onChange() {
    this._compute();
  }
  _compute() {
    const e = [];
    if (ct)
      for (const n in me)
        window.matchMedia(me[n]).matches || e.push(n);
    e.push("all"), this.hiddenBreakpoints = e, this._subscribers.forEach((n) => n(e));
  }
  subscribe(e) {
    this._subscribers.add(e), e(this.hiddenBreakpoints);
  }
  unsubscribe(e) {
    this._subscribers.delete(e), this._subscribers.size === 0 && (this._destroy(), we = null);
  }
  _destroy() {
    for (const e in this._mqls) {
      const n = this._mqls[e];
      n.removeEventListener ? n.removeEventListener("change", this._onChange) : n.removeListener(this._onChange);
    }
    this._mqls = {}, this._subscribers.clear();
  }
}
function Pt() {
  return we || (we = new On()), we;
}
function Q(t, e, n, s, i, r, o, a) {
  var c = typeof t == "function" ? t.options : t;
  e && (c.render = e, c.staticRenderFns = n, c._compiled = !0), s && (c.functional = !0), r && (c._scopeId = "data-v-" + r);
  var l;
  if (o ? (l = function(m) {
    m = m || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !m && typeof __VUE_SSR_CONTEXT__ != "undefined" && (m = __VUE_SSR_CONTEXT__), i && i.call(this, m), m && m._registeredComponents && m._registeredComponents.add(o);
  }, c._ssrRegister = l) : i && (l = a ? function() {
    i.call(
      this,
      (c.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), l)
    if (c.functional) {
      c._injectStyles = l;
      var u = c.render;
      c.render = function(b, f) {
        return l.call(f), u(b, f);
      };
    } else {
      var d = c.beforeCreate;
      c.beforeCreate = d ? [].concat(d, l) : [l];
    }
  return {
    exports: t,
    options: c
  };
}
const En = {
  name: "SelectCheckbox",
  props: {
    value: { type: Boolean, default: !1 },
    pretty: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    smooth: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    showPartial: { type: Boolean, default: !1 }
  },
  computed: {
    proxyValue: {
      get() {
        return this.value;
      },
      set(t) {
        this.$emit("input", t);
      }
    }
  }
};
var An = function() {
  var e = this, n = e._self._c;
  return n("span", { staticStyle: { display: "contents" } }, [e.pretty ? n("p-check", { staticClass: "p-icon", class: e.smooth ? "p-smooth" : "", attrs: { name: "check", disabled: e.disabled }, on: { change: function(s) {
    return e.$emit("change", s);
  } }, model: { value: e.proxyValue, callback: function(s) {
    e.proxyValue = s;
  }, expression: "proxyValue" } }, [n("template", { slot: "extra" }, [n("span", [e.proxyValue ? n("font-awesome-icon", { staticClass: "text-success icon-check", attrs: { icon: "check" } }) : e._e()], 1), e.showPartial ? n("span", [e.partial && !e.proxyValue ? n("font-awesome-icon", { staticClass: "text-success icon-check", attrs: { icon: "square" } }) : e._e()], 1) : e._e()])], 2) : n("label", { staticClass: "mb-0 mt-0" }, [n("input", { directives: [{ name: "model", rawName: "v-model", value: e.proxyValue, expression: "proxyValue" }], attrs: { type: "checkbox", disabled: e.disabled }, domProps: { checked: Array.isArray(e.proxyValue) ? e._i(e.proxyValue, null) > -1 : e.proxyValue }, on: { change: [function(s) {
    var i = e.proxyValue, r = s.target, o = !!r.checked;
    if (Array.isArray(i)) {
      var a = null, c = e._i(i, a);
      r.checked ? c < 0 && (e.proxyValue = i.concat([a])) : c > -1 && (e.proxyValue = i.slice(0, c).concat(i.slice(c + 1)));
    } else
      e.proxyValue = o;
  }, function(s) {
    return e.$emit("change", s);
  }] } })])], 1);
}, Tn = [], jn = /* @__PURE__ */ Q(
  En,
  An,
  Tn,
  !1,
  null,
  null,
  null,
  null
);
const kt = jn.exports, In = {
  name: "TableHeader",
  inject: ["quintable"],
  components: { SelectCheckbox: kt },
  methods: {
    isColumnVisible(t) {
      return this.quintable.cellVisible[t];
    }
  }
};
var $n = function() {
  var e = this, n = e._self._c;
  return e.quintable.configFinal.headlines.length ? n("thead", [n("tr", { staticClass: "vue-quintable-header-row quintable--table-container--table--header-row" }, [e.quintable.hasGeneratedRows && !e.quintable.configFinal.hideRowToggle ? n("th", { staticClass: "placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th" }, [n("wbr")]) : e._e(), e.quintable.configFinal.select && e.quintable.configFinal.selectPosition === "pre" ? n("th", { staticClass: "select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre" }, [e.quintable.configFinal.selectAll && !e.quintable.noRows ? n("select-checkbox", { attrs: { value: e.quintable.allSelectedProperty, pretty: e.quintable.configFinal.prettySelect, smooth: !0, "show-partial": !0, partial: e.quintable.someSelected }, on: { input: function(s) {
    e.quintable.allSelectedProperty = s;
  }, change: function(s) {
    return e.quintable.checkAll();
  } } }) : e._e()], 1) : e._e(), e._l(e.quintable.configFinal.headlines, function(s, i) {
    return [e.isColumnVisible(i) ? n("th", { key: "headline-" + i, class: e.quintable.headerClass[i], attrs: { title: e.quintable.configFinal.columns[i].title }, on: { click: function(r) {
      return r.stopPropagation(), e.quintable.setSortColumn(i);
    } } }, [e.quintable.showHeadlines[i] ? n("span", { staticClass: "headline quintable--table-container--table--header-row--th--headline", domProps: { innerHTML: e._s(s) } }) : n("span", { staticClass: "headline quintable--table-container--table--header-row--th--headline" }, [n("wbr")]), e.quintable.configFinal.sorts[i] ? n("span", { staticClass: "sorting-icon ms-2 quintable--table-container--table--header-row--th--sorting-icon" }, [e.quintable.currentSortIndexes[i] ? e._e() : n("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort" } }), e.quintable.currentSortIndexes[i] && e.quintable.currentSortIndexes[i].asc ? n("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down-alt" } }) : e._e(), e.quintable.currentSortIndexes[i] && !e.quintable.currentSortIndexes[i].asc ? n("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down" } }) : e._e(), e.quintable.currentSortIndexes[i] ? n("span", { staticClass: "ms-1 text-muted", on: { click: function(r) {
      return r.stopPropagation(), r.preventDefault(), e.quintable.removeSort(i);
    } } }, [e.quintable.numberOfSorts > 1 ? n("span", { staticClass: "badge bg-info text-white" }, [e._v(" " + e._s(e.quintable.currentSortIndexes[i].order + 1) + " ")]) : n("small", [n("font-awesome-icon", { attrs: { icon: "times" } })], 1)]) : e._e()], 1) : e._e()]) : e._e()];
  }), e.quintable.configFinal.select && e.quintable.configFinal.selectPosition === "post" ? n("th", { staticClass: "select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post" }, [e.quintable.configFinal.selectAll && !e.quintable.noRows ? n("select-checkbox", { attrs: { value: e.quintable.allSelectedProperty, pretty: e.quintable.configFinal.prettySelect, smooth: !0, "show-partial": !0, partial: e.quintable.someSelected }, on: { input: function(s) {
    e.quintable.allSelectedProperty = s;
  }, change: function(s) {
    return e.quintable.checkAll();
  } } }) : e._e()], 1) : e._e()], 2)]) : e._e();
}, Ln = [], Nn = /* @__PURE__ */ Q(
  In,
  $n,
  Ln,
  !1,
  null,
  null,
  null,
  null
);
const Un = Nn.exports, Bn = {
  name: "ExpandedRow",
  inject: ["quintable"],
  components: {},
  props: {
    rIndex: { type: [Number, String], required: !0 }
  },
  computed: {
    shouldRender() {
      return this.quintable.generatedUpdatedKey && this.quintable.openRows[this.rIndex] && this._hasKeys(this.quintable.generatedRows[this.rIndex]) || this._hasKeys(this.quintable.stickyRows[this.rIndex]);
    },
    showToggleCell() {
      return !this.quintable.configFinal.hideRowToggle && this.quintable.generatedRows[this.rIndex] && this._hasKeys(this.quintable.generatedRows[this.rIndex]);
    },
    innerClasses() {
      const t = [];
      return this.quintable.hoveredRow === this.rIndex && t.push(this.quintable.configFinal.hoverClass), this.quintable.activeRow === this.rIndex && t.push(this.quintable.configFinal.activeClass), t;
    },
    formattedGenerated() {
      const t = this.quintable.generatedRows[this.rIndex];
      if (!t)
        return {};
      const e = {}, n = this.quintable.configFinal.columns;
      for (let s in t)
        Object.prototype.hasOwnProperty.call(t, s) && n[s] && n[s].cellFormatter && (e[s] = this.quintable.cellFormatters(s, t[s]));
      return e;
    },
    formattedSticky() {
      const t = this.quintable.stickyRows[this.rIndex];
      if (!t)
        return {};
      const e = {}, n = this.quintable.configFinal.columns;
      for (let s in t)
        Object.prototype.hasOwnProperty.call(t, s) && n[s] && n[s].cellFormatter && (e[s] = this.quintable.cellFormatters(s, t[s]));
      return e;
    }
  },
  methods: {
    _hasKeys(t) {
      if (!t)
        return !1;
      for (let e in t)
        if (Object.prototype.hasOwnProperty.call(t, e))
          return !0;
      return !1;
    }
  }
};
var Dn = function() {
  var e = this, n = e._self._c;
  return e.shouldRender ? n("tr", { ref: "generated-row-highlighted-" + e.rIndex, staticClass: "generated-row quintable--table-container--table--tbody--generated-row", class: {
    "parent-row-expanded": e.quintable.openRows[e.rIndex],
    "parent-row-collapsed": e.quintable.hiddenColumns[e.rIndex] > 0 && !e.quintable.openRows[e.rIndex]
  }, on: { mouseenter: function(s) {
    return e.quintable.onMouseenterRow(e.rIndex);
  }, click: function(s) {
    return e.quintable.onRowClick(s, e.rIndex);
  } } }, [n("td", { staticClass: "ps-0 pe-0 pt-0", attrs: { colspan: e.quintable.configFinal.number + 1 } }, [n("div", { class: e.innerClasses }, [n("table", { staticClass: "mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table" }, [n("tbody", [e._l(e.quintable.generatedRows[e.rIndex], function(s, i) {
    return [e.quintable.openRows[e.rIndex] ? n("tr", { key: "vue-quintable-" + e.quintable.uuid + "-generated-row-cell-" + e.rIndex + "-" + i, staticClass: "generated-row-cell quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell", attrs: { id: "vue-quintable-" + e.quintable.uuid + "-generated-row-cell-" + e.rIndex + "-" + i } }, [e.showToggleCell ? n("td", { staticClass: "toggle-cell invisible" }, [e.quintable.hiddenColumns[e.rIndex] > 0 ? n("span", [e.quintable.openRows[e.rIndex] ? n("span", [n("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.quintable.configFinal.expandedRowIcon } })], 1) : n("span", [n("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.quintable.configFinal.collapsedRowIcon } })], 1)]) : e._e()]) : e._e(), e.quintable.showHeadlines[i] || e.quintable.configFinal.sorts[i] ? n("td", { staticClass: "generated-cell-element generated-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline", class: e.quintable.configFinal.columnClasses[i], on: { click: function(r) {
      return r.stopPropagation(), e.quintable.setSortColumn(i);
    } } }, [e.quintable.showHeadlines[i] ? n("strong", { domProps: { innerHTML: e._s(e.quintable.configFinal.headlines[i]) } }) : n("span", { staticClass: "headline" }, [n("wbr")]), e.quintable.configFinal.sorts[i] ? n("span", { directives: [{ name: "show", rawName: "v-show", value: e.quintable.hoveredRow === e.rIndex, expression: "quintable.hoveredRow === rIndex" }], staticClass: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon" }, [e.quintable.currentSortIndexes[i] ? e._e() : n("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort" } }), e.quintable.currentSortIndexes[i] && e.quintable.currentSortIndexes[i].asc ? n("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down-alt" } }) : e._e(), e.quintable.currentSortIndexes[i] && !e.quintable.currentSortIndexes[i].asc ? n("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down" } }) : e._e(), e.quintable.currentSortIndexes[i] ? n("span", { staticClass: "ms-1 text-muted", on: { click: function(r) {
      return r.stopPropagation(), r.preventDefault(), e.quintable.removeSort(i);
    } } }, [e.quintable.numberOfSorts > 1 ? n("span", { staticClass: "badge bg-info text-white" }, [e._v(" " + e._s(e.quintable.currentSortIndexes[i].order + 1) + " ")]) : n("small", [n("font-awesome-icon", { attrs: { icon: "times" } })], 1)]) : e._e()], 1) : e._e()]) : e._e(), n("td", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
      placement: "top",
      content: s.tooltip,
      trigger: s.tooltip ? "hover" : "manual"
    }, expression: `{
                  placement: 'top',
                  content: cell.tooltip,
                  trigger: cell.tooltip ? 'hover' : 'manual',
                }` }], staticClass: "generated-cell-element generated-cell-element-content generated-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content", class: e.quintable.configFinal.columnClasses[i] + " " + e.quintable.cellClassesParsed[e.rIndex][i], attrs: { colspan: !e.quintable.showHeadlines[i] && !e.quintable.configFinal.sorts[i] ? 2 : 1 }, on: { click: function(r) {
      return e.quintable.onCellClick(r, s);
    } } }, [e._t("generated-cell-complete", function() {
      return [e._t("generated-cell-content", function() {
        return [e.formattedGenerated[i] && e.formattedGenerated[i].type === "html" ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html", domProps: { innerHTML: e._s(e.formattedGenerated[i].value) } }) : e.formattedGenerated[i] ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value" }, [e._v(" " + e._s(e.formattedGenerated[i].value) + " ")]) : s.html != null && String(s.html) !== "" ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html", domProps: { innerHTML: e._s(s.html) } }) : s.component ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component" }, [n(s.component.name, e._b({ tag: "component", on: { action: e.quintable.handleComponentEvent } }, "component", s.component.props, !1))], 1) : s.text != null && String(s.text) !== "" ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text" }, [e._v(" " + e._s(s.text) + " ")]) : e._e()];
      }, { cell: s })];
    }, { cell: s })], 2)]) : e._e()];
  }), e._l(e.quintable.stickyRows[e.rIndex], function(s, i) {
    return n("tr", { key: "vue-quintable-" + e.quintable.uuid + "-sticky-row-cell-" + e.rIndex + "-" + i, staticClass: "sticky-row-cell quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell", attrs: { id: "vue-quintable-" + e.quintable.uuid + "-sticky-row-cell-" + e.rIndex + "-" + i } }, [e.showToggleCell ? n("td", { staticClass: "toggle-cell invisible" }, [e.quintable.hiddenColumns[e.rIndex] > 0 ? n("span", [e.quintable.openRows[e.rIndex] ? n("span", [n("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.quintable.configFinal.expandedRowIcon } })], 1) : n("span", [n("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.quintable.configFinal.collapsedRowIcon } })], 1)]) : e._e()]) : e._e(), e.quintable.showHeadlines[i] || e.quintable.configFinal.sorts[i] ? n("td", { staticClass: "generated-cell-element sticky-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline", class: e.quintable.configFinal.columnClasses[i], on: { click: function(r) {
      return r.stopPropagation(), e.quintable.setSortColumn(i);
    } } }, [e.quintable.showHeadlines[i] ? n("strong", { domProps: { innerHTML: e._s(e.quintable.configFinal.headlines[i]) } }) : n("span", { staticClass: "headline" }, [n("wbr")]), e.quintable.configFinal.sorts[i] ? n("span", { directives: [{ name: "show", rawName: "v-show", value: e.quintable.hoveredRow === e.rIndex, expression: "quintable.hoveredRow === rIndex" }], staticClass: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon" }, [e.quintable.currentSortIndexes[i] ? e._e() : n("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort" } }), e.quintable.currentSortIndexes[i] && e.quintable.currentSortIndexes[i].asc ? n("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down-alt" } }) : e._e(), e.quintable.currentSortIndexes[i] && !e.quintable.currentSortIndexes[i].asc ? n("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down" } }) : e._e(), e.quintable.currentSortIndexes[i] ? n("span", { staticClass: "ms-1 text-muted", on: { click: function(r) {
      return r.stopPropagation(), r.preventDefault(), e.quintable.removeSort(i);
    } } }, [e.quintable.numberOfSorts > 1 ? n("span", { staticClass: "badge bg-info text-white" }, [e._v(" " + e._s(e.quintable.currentSortIndexes[i].order + 1) + " ")]) : n("small", [n("font-awesome-icon", { attrs: { icon: "times" } })], 1)]) : e._e()], 1) : e._e()]) : e._e(), n("td", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
      placement: "top",
      content: s.tooltip,
      trigger: s.tooltip ? "hover" : "manual"
    }, expression: `{
                placement: 'top',
                content: cell.tooltip,
                trigger: cell.tooltip ? 'hover' : 'manual',
              }` }], staticClass: "generated-cell-element generated-cell-element-content sticky-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content", class: e.quintable.configFinal.columnClasses[i] + " " + e.quintable.cellClassesParsed[e.rIndex][i], attrs: { colspan: !e.quintable.showHeadlines[i] && !e.quintable.configFinal.sorts[i] ? 2 : 1 }, on: { click: function(r) {
      return e.quintable.onCellClick(r, s);
    } } }, [e._t("sticky-cell-complete", function() {
      return [e._t("sticky-cell-content", function() {
        return [e.formattedSticky[i] && e.formattedSticky[i].type === "html" ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html", domProps: { innerHTML: e._s(e.formattedSticky[i].value) } }) : e.formattedSticky[i] ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value" }, [e._v(" " + e._s(e.formattedSticky[i].value) + " ")]) : s.html != null && String(s.html) !== "" ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html", domProps: { innerHTML: e._s(s.html) } }) : s.component ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component" }, [n(s.component.name, e._b({ tag: "component", on: { action: e.quintable.handleComponentEvent } }, "component", s.component.props, !1))], 1) : s.text != null && String(s.text) !== "" ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text" }, [e._v(" " + e._s(s.text) + " ")]) : e._e()];
      }, { cell: s })];
    }, { cell: s })], 2)]);
  })], 2)])])])]) : e._e();
}, Mn = [], Vn = /* @__PURE__ */ Q(
  Bn,
  Dn,
  Mn,
  !1,
  null,
  null,
  null,
  null
);
const Hn = Vn.exports, Gn = {
  name: "PaginationNav",
  props: {
    pages: { type: Number, required: !0 },
    currentPage: { type: Number, required: !0 },
    pageRange: { type: Number, required: !0 },
    visiblePages: { type: Array, required: !0 },
    hasVisibleRows: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  }
};
var zn = function() {
  var e = this, n = e._self._c;
  return e.pages > 1 ? n("nav", { staticClass: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav", class: { "me-3": e.hasVisibleRows, disabled: e.disabled } }, [n("ul", { staticClass: "pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination" }, [e.pages > e.pageRange ? n("li", { staticClass: "page-item", class: { disabled: e.currentPage <= 1 }, on: { click: function(s) {
    return e.$emit("goto", "first");
  } } }, [n("span", { staticClass: "page-link" }, [n("font-awesome-icon", { attrs: { icon: "angle-double-left" } })], 1)]) : e._e(), n("li", { staticClass: "page-item", class: { disabled: e.currentPage <= 1 }, on: { click: function(s) {
    return e.$emit("goto", "prev");
  } } }, [n("span", { staticClass: "page-link" }, [n("font-awesome-icon", { attrs: { icon: "angle-left" } })], 1)]), e.pageRange < e.pages && e.visiblePages[0] > 1 ? n("li", { staticClass: "page-item", on: { click: function(s) {
    return e.$emit("offset", -1);
  } } }, [n("span", { staticClass: "page-link" }, [e._v(" ... ")])]) : e._e(), e._l(e.visiblePages, function(s) {
    return n("li", { key: "pagination-item-" + s, staticClass: "page-item", class: { active: s === e.currentPage }, on: { click: function(i) {
      return e.$emit("goto", s);
    } } }, [n("span", { staticClass: "page-link" }, [e._v(" " + e._s(s) + " ")])]);
  }), e.pageRange < e.pages && e.visiblePages[e.visiblePages.length - 1] < e.pages ? n("li", { staticClass: "page-item", on: { click: function(s) {
    return e.$emit("offset", 1);
  } } }, [n("span", { staticClass: "page-link" }, [e._v(" ... ")])]) : e._e(), n("li", { staticClass: "page-item", class: { disabled: e.pages === e.currentPage }, on: { click: function(s) {
    return e.$emit("goto", "next");
  } } }, [n("span", { staticClass: "page-link" }, [n("font-awesome-icon", { attrs: { icon: "angle-right" } })], 1)]), e.pages > e.pageRange ? n("li", { staticClass: "page-item", class: { disabled: e.pages === e.currentPage }, on: { click: function(s) {
    return e.$emit("goto", "last");
  } } }, [n("span", { staticClass: "page-link" }, [n("font-awesome-icon", { attrs: { icon: "angle-double-right" } })], 1)]) : e._e()], 2)]) : e._e();
}, Jn = [], Kn = /* @__PURE__ */ Q(
  Gn,
  zn,
  Jn,
  !1,
  null,
  null,
  null,
  null
);
const Wn = Kn.exports, Qn = {
  name: "PaginationFooter",
  inject: ["quintable"],
  components: { PaginationNav: Wn }
};
var Xn = function() {
  var e = this, n = e._self._c;
  return n("div", { staticClass: "clearfix quintable--table-footer-container" }, [n("div", { staticClass: "row" }, [n("div", { staticClass: "col-lg-4 quintable--table-footer-container--sort-container" }, [e.quintable.configFinal.multiSortSelect || e.quintable.configFinal.pageSortSelect ? n("div", { staticClass: "pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select" }, [e.quintable.configFinal.multiSortSelect ? n("span", { class: e.quintable.configFinal.pageSort ? "me-3" : "" }, [n("p-check", { staticClass: "p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select", attrs: { value: "true" }, model: { value: e.quintable.multiSort, callback: function(s) {
    e.$set(e.quintable, "multiSort", s);
  }, expression: "quintable.multiSort" } }, [e._v(e._s(e.quintable.configFinal.multiSortPlaceholder))])], 1) : e._e(), e.quintable.configFinal.pageSortSelect ? n("p-check", { staticClass: "p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select", attrs: { value: "true" }, model: { value: e.quintable.pageSort, callback: function(s) {
    e.$set(e.quintable, "pageSort", s);
  }, expression: "quintable.pageSort" } }, [e._v(e._s(e.quintable.configFinal.pageSortPlaceholder))]) : e._e()], 1) : e._e()]), n("div", { staticClass: "col-lg-8 quintable--table-footer-container--pagination-wrapper" }, [e.quintable.configFinal && e.quintable.configFinal.pagination ? n("div", { staticClass: "float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container" }, [e.quintable.configFinal.rowsSelect ? n("div", { staticClass: "mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select" }, [n("span", { staticClass: "d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder", domProps: { innerHTML: e._s(e.quintable.configFinal.rowsPlaceholder) } }), n("v-select", { staticClass: "d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select", attrs: { options: e.quintable.paginationOptionsFilled, clearable: !1 }, model: { value: e.quintable.currentRowsPerPageProperty, callback: function(s) {
    e.$set(e.quintable, "currentRowsPerPageProperty", s);
  }, expression: "quintable.currentRowsPerPageProperty" } })], 1) : e._e(), e.quintable.configFinal && e.quintable.configFinal.pagination && e.quintable.pages > 1 ? n("pagination-nav", { attrs: { pages: e.quintable.pages, "current-page": e.quintable.currentPage, "page-range": e.quintable.pageRange, "visible-pages": e.quintable.visiblePages, "has-visible-rows": !!e.quintable.numberOfVisibleRows, disabled: e.quintable.ajaxLoading }, on: { goto: function(s) {
    return e.quintable.gotoPage(s);
  }, offset: function(s) {
    return e.quintable.updatePageOffset(s);
  } } }) : e._e(), e.quintable.numberOfVisibleRows ? n("span", { staticClass: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows" }, [e._v(e._s(e.quintable.firstVisibleRow) + "-" + e._s(e.quintable.lastVisibleRow) + " " + e._s(e.quintable.configFinal.numberOfVisibleRowsFillerWord) + " " + e._s(e.quintable.numberOfVisibleRows))]) : e._e()], 1) : e._e()])])]);
}, Zn = [], Yn = /* @__PURE__ */ Q(
  Qn,
  Xn,
  Zn,
  !1,
  null,
  null,
  null,
  null
);
const es = Yn.exports, ts = {
  name: "SearchBar",
  inject: ["quintable"]
};
var ns = function() {
  var e = this, n = e._self._c;
  return e.quintable.configFinal.search ? n("div", { staticClass: "mb-3 quintable--search-container", class: e.quintable.configFinal.searchContainerClass }, [e._t("before-search"), e._t("search", function() {
    return [n("div", { staticClass: "quintable--search-container--input-container", class: e.quintable.configFinal.searchClass }, [n("input", { directives: [{ name: "model", rawName: "v-model", value: e.quintable.query, expression: "quintable.query" }], staticClass: "form-control", attrs: { type: "search", placeholder: e.quintable.configFinal.searchPlaceholder }, domProps: { value: e.quintable.query }, on: { input: function(s) {
      s.target.composing || e.$set(e.quintable, "query", s.target.value);
    } } })])];
  }, { value: e.quintable.query, loading: e.quintable.loading, setSearchQuery: e.quintable.setSearchQuery, placeholder: e.quintable.configFinal.searchPlaceholder, searchClass: e.quintable.configFinal.searchClass }), e._t("after-search")], 2) : e._e();
}, ss = [], is = /* @__PURE__ */ Q(
  ts,
  ns,
  ss,
  !1,
  null,
  null,
  null,
  null
);
const rs = is.exports;
function Ot(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: os } = Object.prototype, { getPrototypeOf: We } = Object, { iterator: qe, toStringTag: Et } = Symbol, Pe = ((t) => (e) => {
  const n = os.call(e);
  return t[n] || (t[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), L = (t) => (t = t.toLowerCase(), (e) => Pe(e) === t), ke = (t) => (e) => typeof e === t, { isArray: ee } = Array, Y = ke("undefined");
function ue(t) {
  return t !== null && !Y(t) && t.constructor !== null && !Y(t.constructor) && E(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const At = L("ArrayBuffer");
function as(t) {
  let e;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && At(t.buffer), e;
}
const ls = ke("string"), E = ke("function"), Tt = ke("number"), he = (t) => t !== null && typeof t == "object", cs = (t) => t === !0 || t === !1, ye = (t) => {
  if (Pe(t) !== "object")
    return !1;
  const e = We(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Et in t) && !(qe in t);
}, us = (t) => {
  if (!he(t) || ue(t))
    return !1;
  try {
    return Object.keys(t).length === 0 && Object.getPrototypeOf(t) === Object.prototype;
  } catch (e) {
    return !1;
  }
}, hs = L("Date"), fs = L("File"), ds = (t) => !!(t && typeof t.uri != "undefined"), ps = (t) => t && typeof t.getParts != "undefined", gs = L("Blob"), ms = L("FileList"), bs = (t) => he(t) && E(t.pipe);
function ws() {
  return typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {};
}
const ut = ws(), ht = typeof ut.FormData != "undefined" ? ut.FormData : void 0, ys = (t) => {
  let e;
  return t && (ht && t instanceof ht || E(t.append) && ((e = Pe(t)) === "formdata" || // detect form-data instance
  e === "object" && E(t.toString) && t.toString() === "[object FormData]"));
}, Ss = L("URLSearchParams"), [Rs, _s, xs, Cs] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(L), Fs = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function fe(t, e, { allOwnKeys: n = !1 } = {}) {
  if (t === null || typeof t == "undefined")
    return;
  let s, i;
  if (typeof t != "object" && (t = [t]), ee(t))
    for (s = 0, i = t.length; s < i; s++)
      e.call(null, t[s], s, t);
  else {
    if (ue(t))
      return;
    const r = n ? Object.getOwnPropertyNames(t) : Object.keys(t), o = r.length;
    let a;
    for (s = 0; s < o; s++)
      a = r[s], e.call(null, t[a], a, t);
  }
}
function jt(t, e) {
  if (ue(t))
    return null;
  e = e.toLowerCase();
  const n = Object.keys(t);
  let s = n.length, i;
  for (; s-- > 0; )
    if (i = n[s], e === i.toLowerCase())
      return i;
  return null;
}
const K = (() => typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global)(), It = (t) => !Y(t) && t !== K;
function Ge() {
  const { caseless: t, skipUndefined: e } = It(this) && this || {}, n = {}, s = (i, r) => {
    if (r === "__proto__" || r === "constructor" || r === "prototype")
      return;
    const o = t && jt(n, r) || r;
    ye(n[o]) && ye(i) ? n[o] = Ge(n[o], i) : ye(i) ? n[o] = Ge({}, i) : ee(i) ? n[o] = i.slice() : (!e || !Y(i)) && (n[o] = i);
  };
  for (let i = 0, r = arguments.length; i < r; i++)
    arguments[i] && fe(arguments[i], s);
  return n;
}
const vs = (t, e, n, { allOwnKeys: s } = {}) => (fe(
  e,
  (i, r) => {
    n && E(i) ? Object.defineProperty(t, r, {
      value: Ot(i, n),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(t, r, {
      value: i,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: s }
), t), qs = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), Ps = (t, e, n, s) => {
  t.prototype = Object.create(e.prototype, s), Object.defineProperty(t.prototype, "constructor", {
    value: t,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(t, "super", {
    value: e.prototype
  }), n && Object.assign(t.prototype, n);
}, ks = (t, e, n, s) => {
  let i, r, o;
  const a = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (i = Object.getOwnPropertyNames(t), r = i.length; r-- > 0; )
      o = i[r], (!s || s(o, t, e)) && !a[o] && (e[o] = t[o], a[o] = !0);
    t = n !== !1 && We(t);
  } while (t && (!n || n(t, e)) && t !== Object.prototype);
  return e;
}, Os = (t, e, n) => {
  t = String(t), (n === void 0 || n > t.length) && (n = t.length), n -= e.length;
  const s = t.indexOf(e, n);
  return s !== -1 && s === n;
}, Es = (t) => {
  if (!t)
    return null;
  if (ee(t))
    return t;
  let e = t.length;
  if (!Tt(e))
    return null;
  const n = new Array(e);
  for (; e-- > 0; )
    n[e] = t[e];
  return n;
}, As = ((t) => (e) => t && e instanceof t)(typeof Uint8Array != "undefined" && We(Uint8Array)), Ts = (t, e) => {
  const s = (t && t[qe]).call(t);
  let i;
  for (; (i = s.next()) && !i.done; ) {
    const r = i.value;
    e.call(t, r[0], r[1]);
  }
}, js = (t, e) => {
  let n;
  const s = [];
  for (; (n = t.exec(e)) !== null; )
    s.push(n);
  return s;
}, Is = L("HTMLFormElement"), $s = (t) => t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, s, i) {
  return s.toUpperCase() + i;
}), ft = (({ hasOwnProperty: t }) => (e, n) => t.call(e, n))(Object.prototype), Ls = L("RegExp"), $t = (t, e) => {
  const n = Object.getOwnPropertyDescriptors(t), s = {};
  fe(n, (i, r) => {
    let o;
    (o = e(i, r, t)) !== !1 && (s[r] = o || i);
  }), Object.defineProperties(t, s);
}, Ns = (t) => {
  $t(t, (e, n) => {
    if (E(t) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = t[n];
    if (E(s)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Us = (t, e) => {
  const n = {}, s = (i) => {
    i.forEach((r) => {
      n[r] = !0;
    });
  };
  return ee(t) ? s(t) : s(String(t).split(e)), n;
}, Bs = () => {
}, Ds = (t, e) => t != null && Number.isFinite(t = +t) ? t : e;
function Ms(t) {
  return !!(t && E(t.append) && t[Et] === "FormData" && t[qe]);
}
const Vs = (t) => {
  const e = new Array(10), n = (s, i) => {
    if (he(s)) {
      if (e.indexOf(s) >= 0)
        return;
      if (ue(s))
        return s;
      if (!("toJSON" in s)) {
        e[i] = s;
        const r = ee(s) ? [] : {};
        return fe(s, (o, a) => {
          const c = n(o, i + 1);
          !Y(c) && (r[a] = c);
        }), e[i] = void 0, r;
      }
    }
    return s;
  };
  return n(t, 0);
}, Hs = L("AsyncFunction"), Gs = (t) => t && (he(t) || E(t)) && E(t.then) && E(t.catch), Lt = ((t, e) => t ? setImmediate : e ? ((n, s) => (K.addEventListener(
  "message",
  ({ source: i, data: r }) => {
    i === K && r === n && s.length && s.shift()();
  },
  !1
), (i) => {
  s.push(i), K.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(typeof setImmediate == "function", E(K.postMessage)), zs = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(K) : typeof process != "undefined" && process.nextTick || Lt, Js = (t) => t != null && E(t[qe]), h = {
  isArray: ee,
  isArrayBuffer: At,
  isBuffer: ue,
  isFormData: ys,
  isArrayBufferView: as,
  isString: ls,
  isNumber: Tt,
  isBoolean: cs,
  isObject: he,
  isPlainObject: ye,
  isEmptyObject: us,
  isReadableStream: Rs,
  isRequest: _s,
  isResponse: xs,
  isHeaders: Cs,
  isUndefined: Y,
  isDate: hs,
  isFile: fs,
  isReactNativeBlob: ds,
  isReactNative: ps,
  isBlob: gs,
  isRegExp: Ls,
  isFunction: E,
  isStream: bs,
  isURLSearchParams: Ss,
  isTypedArray: As,
  isFileList: ms,
  forEach: fe,
  merge: Ge,
  extend: vs,
  trim: Fs,
  stripBOM: qs,
  inherits: Ps,
  toFlatObject: ks,
  kindOf: Pe,
  kindOfTest: L,
  endsWith: Os,
  toArray: Es,
  forEachEntry: Ts,
  matchAll: js,
  isHTMLForm: Is,
  hasOwnProperty: ft,
  hasOwnProp: ft,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: $t,
  freezeMethods: Ns,
  toObjectSet: Us,
  toCamelCase: $s,
  noop: Bs,
  toFiniteNumber: Ds,
  findKey: jt,
  global: K,
  isContextDefined: It,
  isSpecCompliantForm: Ms,
  toJSONObject: Vs,
  isAsyncFn: Hs,
  isThenable: Gs,
  setImmediate: Lt,
  asap: zs,
  isIterable: Js
};
class k extends Error {
  static from(e, n, s, i, r, o) {
    const a = new k(e.message, n || e.code, s, i, r);
    return a.cause = e, a.name = e.name, e.status != null && a.status == null && (a.status = e.status), o && Object.assign(a, o), a;
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
  constructor(e, n, s, i, r) {
    super(e), Object.defineProperty(this, "message", {
      value: e,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }), this.name = "AxiosError", this.isAxiosError = !0, n && (this.code = n), s && (this.config = s), i && (this.request = i), r && (this.response = r, this.status = r.status);
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
      config: h.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
}
k.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
k.ERR_BAD_OPTION = "ERR_BAD_OPTION";
k.ECONNABORTED = "ECONNABORTED";
k.ETIMEDOUT = "ETIMEDOUT";
k.ERR_NETWORK = "ERR_NETWORK";
k.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
k.ERR_DEPRECATED = "ERR_DEPRECATED";
k.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
k.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
k.ERR_CANCELED = "ERR_CANCELED";
k.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
k.ERR_INVALID_URL = "ERR_INVALID_URL";
const _ = k, Ks = null;
function ze(t) {
  return h.isPlainObject(t) || h.isArray(t);
}
function Nt(t) {
  return h.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function De(t, e, n) {
  return t ? t.concat(e).map(function(i, r) {
    return i = Nt(i), !n && r ? "[" + i + "]" : i;
  }).join(n ? "." : "") : e;
}
function Ws(t) {
  return h.isArray(t) && !t.some(ze);
}
const Qs = h.toFlatObject(h, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function Oe(t, e, n) {
  if (!h.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), n = h.toFlatObject(
    n,
    {
      metaTokens: !0,
      dots: !1,
      indexes: !1
    },
    !1,
    function(g, p) {
      return !h.isUndefined(p[g]);
    }
  );
  const s = n.metaTokens, i = n.visitor || u, r = n.dots, o = n.indexes, c = (n.Blob || typeof Blob != "undefined" && Blob) && h.isSpecCompliantForm(e);
  if (!h.isFunction(i))
    throw new TypeError("visitor must be a function");
  function l(f) {
    if (f === null)
      return "";
    if (h.isDate(f))
      return f.toISOString();
    if (h.isBoolean(f))
      return f.toString();
    if (!c && h.isBlob(f))
      throw new _("Blob is not supported. Use a Buffer instead.");
    return h.isArrayBuffer(f) || h.isTypedArray(f) ? c && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function u(f, g, p) {
    let y = f;
    if (h.isReactNative(e) && h.isReactNativeBlob(f))
      return e.append(De(p, g, r), l(f)), !1;
    if (f && !p && typeof f == "object") {
      if (h.endsWith(g, "{}"))
        g = s ? g : g.slice(0, -2), f = JSON.stringify(f);
      else if (h.isArray(f) && Ws(f) || (h.isFileList(f) || h.endsWith(g, "[]")) && (y = h.toArray(f)))
        return g = Nt(g), y.forEach(function(S, F) {
          !(h.isUndefined(S) || S === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? De([g], F, r) : o === null ? g : g + "[]",
            l(S)
          );
        }), !1;
    }
    return ze(f) ? !0 : (e.append(De(p, g, r), l(f)), !1);
  }
  const d = [], m = Object.assign(Qs, {
    defaultVisitor: u,
    convertValue: l,
    isVisitable: ze
  });
  function b(f, g) {
    if (!h.isUndefined(f)) {
      if (d.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + g.join("."));
      d.push(f), h.forEach(f, function(y, R) {
        (!(h.isUndefined(y) || y === null) && i.call(e, y, h.isString(R) ? R.trim() : R, g, m)) === !0 && b(y, g ? g.concat(R) : [R]);
      }), d.pop();
    }
  }
  if (!h.isObject(t))
    throw new TypeError("data must be an object");
  return b(t), e;
}
function dt(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(s) {
    return e[s];
  });
}
function Qe(t, e) {
  this._pairs = [], t && Oe(t, this, e);
}
const Ut = Qe.prototype;
Ut.append = function(e, n) {
  this._pairs.push([e, n]);
};
Ut.toString = function(e) {
  const n = e ? function(s) {
    return e.call(this, s, dt);
  } : dt;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function Xs(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function Bt(t, e, n) {
  if (!e)
    return t;
  const s = n && n.encode || Xs, i = h.isFunction(n) ? {
    serialize: n
  } : n, r = i && i.serialize;
  let o;
  if (r ? o = r(e, i) : o = h.isURLSearchParams(e) ? e.toString() : new Qe(e, i).toString(s), o) {
    const a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return t;
}
class Zs {
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
  use(e, n, s) {
    return this.handlers.push({
      fulfilled: e,
      rejected: n,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
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
  forEach(e) {
    h.forEach(this.handlers, function(s) {
      s !== null && e(s);
    });
  }
}
const pt = Zs, Xe = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, Ys = typeof URLSearchParams != "undefined" ? URLSearchParams : Qe, ei = typeof FormData != "undefined" ? FormData : null, ti = typeof Blob != "undefined" ? Blob : null, ni = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ys,
    FormData: ei,
    Blob: ti
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Ze = typeof window != "undefined" && typeof document != "undefined", Je = typeof navigator == "object" && navigator || void 0, si = Ze && (!Je || ["ReactNative", "NativeScript", "NS"].indexOf(Je.product) < 0), ii = (() => typeof WorkerGlobalScope != "undefined" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), ri = Ze && window.location.href || "http://localhost", oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Ze,
  hasStandardBrowserEnv: si,
  hasStandardBrowserWebWorkerEnv: ii,
  navigator: Je,
  origin: ri
}, Symbol.toStringTag, { value: "Module" })), q = D(D({}, oi), ni);
function ai(t, e) {
  return Oe(t, new q.classes.URLSearchParams(), D({
    visitor: function(n, s, i, r) {
      return q.isNode && h.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function li(t) {
  return h.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function ci(t) {
  const e = {}, n = Object.keys(t);
  let s;
  const i = n.length;
  let r;
  for (s = 0; s < i; s++)
    r = n[s], e[r] = t[r];
  return e;
}
function Dt(t) {
  function e(n, s, i, r) {
    let o = n[r++];
    if (o === "__proto__")
      return !0;
    const a = Number.isFinite(+o), c = r >= n.length;
    return o = !o && h.isArray(i) ? i.length : o, c ? (h.hasOwnProp(i, o) ? i[o] = [i[o], s] : i[o] = s, !a) : ((!i[o] || !h.isObject(i[o])) && (i[o] = []), e(n, s, i[o], r) && h.isArray(i[o]) && (i[o] = ci(i[o])), !a);
  }
  if (h.isFormData(t) && h.isFunction(t.entries)) {
    const n = {};
    return h.forEachEntry(t, (s, i) => {
      e(li(s), i, n, 0);
    }), n;
  }
  return null;
}
function ui(t, e, n) {
  if (h.isString(t))
    try {
      return (e || JSON.parse)(t), h.trim(t);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(t);
}
const Ye = {
  transitional: Xe,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function(e, n) {
      const s = n.getContentType() || "", i = s.indexOf("application/json") > -1, r = h.isObject(e);
      if (r && h.isHTMLForm(e) && (e = new FormData(e)), h.isFormData(e))
        return i ? JSON.stringify(Dt(e)) : e;
      if (h.isArrayBuffer(e) || h.isBuffer(e) || h.isStream(e) || h.isFile(e) || h.isBlob(e) || h.isReadableStream(e))
        return e;
      if (h.isArrayBufferView(e))
        return e.buffer;
      if (h.isURLSearchParams(e))
        return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
      let a;
      if (r) {
        if (s.indexOf("application/x-www-form-urlencoded") > -1)
          return ai(e, this.formSerializer).toString();
        if ((a = h.isFileList(e)) || s.indexOf("multipart/form-data") > -1) {
          const c = this.env && this.env.FormData;
          return Oe(
            a ? { "files[]": e } : e,
            c && new c(),
            this.formSerializer
          );
        }
      }
      return r || i ? (n.setContentType("application/json", !1), ui(e)) : e;
    }
  ],
  transformResponse: [
    function(e) {
      const n = this.transitional || Ye.transitional, s = n && n.forcedJSONParsing, i = this.responseType === "json";
      if (h.isResponse(e) || h.isReadableStream(e))
        return e;
      if (e && h.isString(e) && (s && !this.responseType || i)) {
        const o = !(n && n.silentJSONParsing) && i;
        try {
          return JSON.parse(e, this.parseReviver);
        } catch (a) {
          if (o)
            throw a.name === "SyntaxError" ? _.from(a, _.ERR_BAD_RESPONSE, this, null, this.response) : a;
        }
      }
      return e;
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
    FormData: q.classes.FormData,
    Blob: q.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
h.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  Ye.headers[t] = {};
});
const et = Ye, hi = h.toObjectSet([
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
]), fi = (t) => {
  const e = {};
  let n, s, i;
  return t && t.split(`
`).forEach(function(o) {
    i = o.indexOf(":"), n = o.substring(0, i).trim().toLowerCase(), s = o.substring(i + 1).trim(), !(!n || e[n] && hi[n]) && (n === "set-cookie" ? e[n] ? e[n].push(s) : e[n] = [s] : e[n] = e[n] ? e[n] + ", " + s : s);
  }), e;
}, gt = Symbol("internals");
function le(t) {
  return t && String(t).trim().toLowerCase();
}
function Se(t) {
  return t === !1 || t == null ? t : h.isArray(t) ? t.map(Se) : String(t);
}
function di(t) {
  const e = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(t); )
    e[s[1]] = s[2];
  return e;
}
const pi = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Me(t, e, n, s, i) {
  if (h.isFunction(s))
    return s.call(this, e, n);
  if (i && (e = n), !!h.isString(e)) {
    if (h.isString(s))
      return e.indexOf(s) !== -1;
    if (h.isRegExp(s))
      return s.test(e);
  }
}
function gi(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, n, s) => n.toUpperCase() + s);
}
function mi(t, e) {
  const n = h.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(t, s + n, {
      value: function(i, r, o) {
        return this[s].call(this, e, i, r, o);
      },
      configurable: !0
    });
  });
}
class Ee {
  constructor(e) {
    e && this.set(e);
  }
  set(e, n, s) {
    const i = this;
    function r(a, c, l) {
      const u = le(c);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const d = h.findKey(i, u);
      (!d || i[d] === void 0 || l === !0 || l === void 0 && i[d] !== !1) && (i[d || c] = Se(a));
    }
    const o = (a, c) => h.forEach(a, (l, u) => r(l, u, c));
    if (h.isPlainObject(e) || e instanceof this.constructor)
      o(e, n);
    else if (h.isString(e) && (e = e.trim()) && !pi(e))
      o(fi(e), n);
    else if (h.isObject(e) && h.isIterable(e)) {
      let a = {}, c, l;
      for (const u of e) {
        if (!h.isArray(u))
          throw TypeError("Object iterator must return a key-value pair");
        a[l = u[0]] = (c = a[l]) ? h.isArray(c) ? [...c, u[1]] : [c, u[1]] : u[1];
      }
      o(a, n);
    } else
      e != null && r(n, e, s);
    return this;
  }
  get(e, n) {
    if (e = le(e), e) {
      const s = h.findKey(this, e);
      if (s) {
        const i = this[s];
        if (!n)
          return i;
        if (n === !0)
          return di(i);
        if (h.isFunction(n))
          return n.call(this, i, s);
        if (h.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, n) {
    if (e = le(e), e) {
      const s = h.findKey(this, e);
      return !!(s && this[s] !== void 0 && (!n || Me(this, this[s], s, n)));
    }
    return !1;
  }
  delete(e, n) {
    const s = this;
    let i = !1;
    function r(o) {
      if (o = le(o), o) {
        const a = h.findKey(s, o);
        a && (!n || Me(s, s[a], a, n)) && (delete s[a], i = !0);
      }
    }
    return h.isArray(e) ? e.forEach(r) : r(e), i;
  }
  clear(e) {
    const n = Object.keys(this);
    let s = n.length, i = !1;
    for (; s--; ) {
      const r = n[s];
      (!e || Me(this, this[r], r, e, !0)) && (delete this[r], i = !0);
    }
    return i;
  }
  normalize(e) {
    const n = this, s = {};
    return h.forEach(this, (i, r) => {
      const o = h.findKey(s, r);
      if (o) {
        n[o] = Se(i), delete n[r];
        return;
      }
      const a = e ? gi(r) : String(r).trim();
      a !== r && delete n[r], n[a] = Se(i), s[a] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const n = /* @__PURE__ */ Object.create(null);
    return h.forEach(this, (s, i) => {
      s != null && s !== !1 && (n[i] = e && h.isArray(s) ? s.join(", ") : s);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, n]) => e + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...n) {
    const s = new this(e);
    return n.forEach((i) => s.set(i)), s;
  }
  static accessor(e) {
    const s = (this[gt] = this[gt] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function r(o) {
      const a = le(o);
      s[a] || (mi(i, o), s[a] = !0);
    }
    return h.isArray(e) ? e.forEach(r) : r(e), this;
  }
}
Ee.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
h.reduceDescriptors(Ee.prototype, ({ value: t }, e) => {
  let n = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(s) {
      this[n] = s;
    }
  };
});
h.freezeMethods(Ee);
const $ = Ee;
function Ve(t, e) {
  const n = this || et, s = e || n, i = $.from(s.headers);
  let r = s.data;
  return h.forEach(t, function(a) {
    r = a.call(n, r, i.normalize(), e ? e.status : void 0);
  }), i.normalize(), r;
}
function Mt(t) {
  return !!(t && t.__CANCEL__);
}
class bi extends _ {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(e, n, s) {
    super(e == null ? "canceled" : e, _.ERR_CANCELED, n, s), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
}
const de = bi;
function Vt(t, e, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? t(n) : e(
    new _(
      "Request failed with status code " + n.status,
      [_.ERR_BAD_REQUEST, _.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
      n.config,
      n.request,
      n
    )
  );
}
function wi(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function yi(t, e) {
  t = t || 10;
  const n = new Array(t), s = new Array(t);
  let i = 0, r = 0, o;
  return e = e !== void 0 ? e : 1e3, function(c) {
    const l = Date.now(), u = s[r];
    o || (o = l), n[i] = c, s[i] = l;
    let d = r, m = 0;
    for (; d !== i; )
      m += n[d++], d = d % t;
    if (i = (i + 1) % t, i === r && (r = (r + 1) % t), l - o < e)
      return;
    const b = u && l - u;
    return b ? Math.round(m * 1e3 / b) : void 0;
  };
}
function Si(t, e) {
  let n = 0, s = 1e3 / e, i, r;
  const o = (l, u = Date.now()) => {
    n = u, i = null, r && (clearTimeout(r), r = null), t(...l);
  };
  return [(...l) => {
    const u = Date.now(), d = u - n;
    d >= s ? o(l, u) : (i = l, r || (r = setTimeout(() => {
      r = null, o(i);
    }, s - d)));
  }, () => i && o(i)];
}
const xe = (t, e, n = 3) => {
  let s = 0;
  const i = yi(50, 250);
  return Si((r) => {
    const o = r.loaded, a = r.lengthComputable ? r.total : void 0, c = o - s, l = i(c), u = o <= a;
    s = o;
    const d = {
      loaded: o,
      total: a,
      progress: a ? o / a : void 0,
      bytes: c,
      rate: l || void 0,
      estimated: l && a && u ? (a - o) / l : void 0,
      event: r,
      lengthComputable: a != null,
      [e ? "download" : "upload"]: !0
    };
    t(d);
  }, n);
}, mt = (t, e) => {
  const n = t != null;
  return [
    (s) => e[0]({
      lengthComputable: n,
      total: t,
      loaded: s
    }),
    e[1]
  ];
}, bt = (t) => (...e) => h.asap(() => t(...e)), Ri = q.hasStandardBrowserEnv ? ((t, e) => (n) => (n = new URL(n, q.origin), t.protocol === n.protocol && t.host === n.host && (e || t.port === n.port)))(
  new URL(q.origin),
  q.navigator && /(msie|trident)/i.test(q.navigator.userAgent)
) : () => !0, _i = q.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(t, e, n, s, i, r, o) {
      if (typeof document == "undefined")
        return;
      const a = [`${t}=${encodeURIComponent(e)}`];
      h.isNumber(n) && a.push(`expires=${new Date(n).toUTCString()}`), h.isString(s) && a.push(`path=${s}`), h.isString(i) && a.push(`domain=${i}`), r === !0 && a.push("secure"), h.isString(o) && a.push(`SameSite=${o}`), document.cookie = a.join("; ");
    },
    read(t) {
      if (typeof document == "undefined")
        return null;
      const e = document.cookie.match(new RegExp("(?:^|; )" + t + "=([^;]*)"));
      return e ? decodeURIComponent(e[1]) : null;
    },
    remove(t) {
      this.write(t, "", Date.now() - 864e5, "/");
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
function xi(t) {
  return typeof t != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Ci(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function Ht(t, e, n) {
  let s = !xi(e);
  return t && (s || n == !1) ? Ci(t, e) : e;
}
const wt = (t) => t instanceof $ ? D({}, t) : t;
function W(t, e) {
  e = e || {};
  const n = {};
  function s(l, u, d, m) {
    return h.isPlainObject(l) && h.isPlainObject(u) ? h.merge.call({ caseless: m }, l, u) : h.isPlainObject(u) ? h.merge({}, u) : h.isArray(u) ? u.slice() : u;
  }
  function i(l, u, d, m) {
    if (h.isUndefined(u)) {
      if (!h.isUndefined(l))
        return s(void 0, l, d, m);
    } else
      return s(l, u, d, m);
  }
  function r(l, u) {
    if (!h.isUndefined(u))
      return s(void 0, u);
  }
  function o(l, u) {
    if (h.isUndefined(u)) {
      if (!h.isUndefined(l))
        return s(void 0, l);
    } else
      return s(void 0, u);
  }
  function a(l, u, d) {
    if (d in e)
      return s(l, u);
    if (d in t)
      return s(void 0, l);
  }
  const c = {
    url: r,
    method: r,
    data: r,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: a,
    headers: (l, u, d) => i(wt(l), wt(u), d, !0)
  };
  return h.forEach(Object.keys(D(D({}, t), e)), function(u) {
    if (u === "__proto__" || u === "constructor" || u === "prototype")
      return;
    const d = h.hasOwnProp(c, u) ? c[u] : i, m = d(t[u], e[u], u);
    h.isUndefined(m) && d !== a || (n[u] = m);
  }), n;
}
const Gt = (t) => {
  const e = W({}, t);
  let { data: n, withXSRFToken: s, xsrfHeaderName: i, xsrfCookieName: r, headers: o, auth: a } = e;
  if (e.headers = o = $.from(o), e.url = Bt(
    Ht(e.baseURL, e.url, e.allowAbsoluteUrls),
    t.params,
    t.paramsSerializer
  ), a && o.set(
    "Authorization",
    "Basic " + btoa(
      (a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : "")
    )
  ), h.isFormData(n)) {
    if (q.hasStandardBrowserEnv || q.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if (h.isFunction(n.getHeaders)) {
      const c = n.getHeaders(), l = ["content-type", "content-length"];
      Object.entries(c).forEach(([u, d]) => {
        l.includes(u.toLowerCase()) && o.set(u, d);
      });
    }
  }
  if (q.hasStandardBrowserEnv && (s && h.isFunction(s) && (s = s(e)), s || s !== !1 && Ri(e.url))) {
    const c = i && r && _i.read(r);
    c && o.set(i, c);
  }
  return e;
}, Fi = typeof XMLHttpRequest != "undefined", vi = Fi && function(t) {
  return new Promise(function(n, s) {
    const i = Gt(t);
    let r = i.data;
    const o = $.from(i.headers).normalize();
    let { responseType: a, onUploadProgress: c, onDownloadProgress: l } = i, u, d, m, b, f;
    function g() {
      b && b(), f && f(), i.cancelToken && i.cancelToken.unsubscribe(u), i.signal && i.signal.removeEventListener("abort", u);
    }
    let p = new XMLHttpRequest();
    p.open(i.method.toUpperCase(), i.url, !0), p.timeout = i.timeout;
    function y() {
      if (!p)
        return;
      const S = $.from(
        "getAllResponseHeaders" in p && p.getAllResponseHeaders()
      ), O = {
        data: !a || a === "text" || a === "json" ? p.responseText : p.response,
        status: p.status,
        statusText: p.statusText,
        headers: S,
        config: t,
        request: p
      };
      Vt(
        function(P) {
          n(P), g();
        },
        function(P) {
          s(P), g();
        },
        O
      ), p = null;
    }
    "onloadend" in p ? p.onloadend = y : p.onreadystatechange = function() {
      !p || p.readyState !== 4 || p.status === 0 && !(p.responseURL && p.responseURL.indexOf("file:") === 0) || setTimeout(y);
    }, p.onabort = function() {
      p && (s(new _("Request aborted", _.ECONNABORTED, t, p)), p = null);
    }, p.onerror = function(F) {
      const O = F && F.message ? F.message : "Network Error", N = new _(O, _.ERR_NETWORK, t, p);
      N.event = F || null, s(N), p = null;
    }, p.ontimeout = function() {
      let F = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const O = i.transitional || Xe;
      i.timeoutErrorMessage && (F = i.timeoutErrorMessage), s(
        new _(
          F,
          O.clarifyTimeoutError ? _.ETIMEDOUT : _.ECONNABORTED,
          t,
          p
        )
      ), p = null;
    }, r === void 0 && o.setContentType(null), "setRequestHeader" in p && h.forEach(o.toJSON(), function(F, O) {
      p.setRequestHeader(O, F);
    }), h.isUndefined(i.withCredentials) || (p.withCredentials = !!i.withCredentials), a && a !== "json" && (p.responseType = i.responseType), l && ([m, f] = xe(l, !0), p.addEventListener("progress", m)), c && p.upload && ([d, b] = xe(c), p.upload.addEventListener("progress", d), p.upload.addEventListener("loadend", b)), (i.cancelToken || i.signal) && (u = (S) => {
      p && (s(!S || S.type ? new de(null, t, p) : S), p.abort(), p = null);
    }, i.cancelToken && i.cancelToken.subscribe(u), i.signal && (i.signal.aborted ? u() : i.signal.addEventListener("abort", u)));
    const R = wi(i.url);
    if (R && q.protocols.indexOf(R) === -1) {
      s(
        new _(
          "Unsupported protocol " + R + ":",
          _.ERR_BAD_REQUEST,
          t
        )
      );
      return;
    }
    p.send(r || null);
  });
}, qi = (t, e) => {
  const { length: n } = t = t ? t.filter(Boolean) : [];
  if (e || n) {
    let s = new AbortController(), i;
    const r = function(l) {
      if (!i) {
        i = !0, a();
        const u = l instanceof Error ? l : this.reason;
        s.abort(
          u instanceof _ ? u : new de(u instanceof Error ? u.message : u)
        );
      }
    };
    let o = e && setTimeout(() => {
      o = null, r(new _(`timeout of ${e}ms exceeded`, _.ETIMEDOUT));
    }, e);
    const a = () => {
      t && (o && clearTimeout(o), o = null, t.forEach((l) => {
        l.unsubscribe ? l.unsubscribe(r) : l.removeEventListener("abort", r);
      }), t = null);
    };
    t.forEach((l) => l.addEventListener("abort", r));
    const { signal: c } = s;
    return c.unsubscribe = () => h.asap(a), c;
  }
}, Pi = qi, ki = function* (t, e) {
  let n = t.byteLength;
  if (!e || n < e) {
    yield t;
    return;
  }
  let s = 0, i;
  for (; s < n; )
    i = s + e, yield t.slice(s, i), s = i;
}, Oi = function(t, e) {
  return Ue(this, null, function* () {
    try {
      for (var n = at(Ei(t)), s, i, r; s = !(i = yield new J(n.next())).done; s = !1) {
        const o = i.value;
        yield* Be(ki(o, e));
      }
    } catch (i) {
      r = [i];
    } finally {
      try {
        s && (i = n.return) && (yield new J(i.call(n)));
      } finally {
        if (r)
          throw r[0];
      }
    }
  });
}, Ei = function(t) {
  return Ue(this, null, function* () {
    if (t[Symbol.asyncIterator]) {
      yield* Be(t);
      return;
    }
    const e = t.getReader();
    try {
      for (; ; ) {
        const { done: n, value: s } = yield new J(e.read());
        if (n)
          break;
        yield s;
      }
    } finally {
      yield new J(e.cancel());
    }
  });
}, yt = (t, e, n, s) => {
  const i = Oi(t, e);
  let r = 0, o, a = (l) => {
    o || (o = !0, s && s(l));
  };
  return new ReadableStream(
    {
      pull(l) {
        return z(this, null, function* () {
          try {
            const { done: u, value: d } = yield i.next();
            if (u) {
              a(), l.close();
              return;
            }
            let m = d.byteLength;
            if (n) {
              let b = r += m;
              n(b);
            }
            l.enqueue(new Uint8Array(d));
          } catch (u) {
            throw a(u), u;
          }
        });
      },
      cancel(l) {
        return a(l), i.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
}, St = 64 * 1024, { isFunction: be } = h, Ai = (({ Request: t, Response: e }) => ({
  Request: t,
  Response: e
}))(h.global), { ReadableStream: Rt, TextEncoder: _t } = h.global, xt = (t, ...e) => {
  try {
    return !!t(...e);
  } catch (n) {
    return !1;
  }
}, Ti = (t) => {
  t = h.merge.call(
    {
      skipUndefined: !0
    },
    Ai,
    t
  );
  const { fetch: e, Request: n, Response: s } = t, i = e ? be(e) : typeof fetch == "function", r = be(n), o = be(s);
  if (!i)
    return !1;
  const a = i && be(Rt), c = i && (typeof _t == "function" ? ((f) => (g) => f.encode(g))(new _t()) : (f) => z(void 0, null, function* () {
    return new Uint8Array(yield new n(f).arrayBuffer());
  })), l = r && a && xt(() => {
    let f = !1;
    const g = new n(q.origin, {
      body: new Rt(),
      method: "POST",
      get duplex() {
        return f = !0, "half";
      }
    }).headers.has("Content-Type");
    return f && !g;
  }), u = o && a && xt(() => h.isReadableStream(new s("").body)), d = {
    stream: u && ((f) => f.body)
  };
  i && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((f) => {
    !d[f] && (d[f] = (g, p) => {
      let y = g && g[f];
      if (y)
        return y.call(g);
      throw new _(
        `Response type '${f}' is not supported`,
        _.ERR_NOT_SUPPORT,
        p
      );
    });
  });
  const m = (f) => z(void 0, null, function* () {
    if (f == null)
      return 0;
    if (h.isBlob(f))
      return f.size;
    if (h.isSpecCompliantForm(f))
      return (yield new n(q.origin, {
        method: "POST",
        body: f
      }).arrayBuffer()).byteLength;
    if (h.isArrayBufferView(f) || h.isArrayBuffer(f))
      return f.byteLength;
    if (h.isURLSearchParams(f) && (f = f + ""), h.isString(f))
      return (yield c(f)).byteLength;
  }), b = (f, g) => z(void 0, null, function* () {
    const p = h.toFiniteNumber(f.getContentLength());
    return p == null ? m(g) : p;
  });
  return (f) => z(void 0, null, function* () {
    let {
      url: g,
      method: p,
      data: y,
      signal: R,
      cancelToken: S,
      timeout: F,
      onDownloadProgress: O,
      onUploadProgress: N,
      responseType: P,
      headers: X,
      withCredentials: M = "same-origin",
      fetchOptions: te
    } = Gt(f), ne = e || fetch;
    P = P ? (P + "").toLowerCase() : "text";
    let V = Pi(
      [R, S && S.toAbortSignal()],
      F
    ), B = null;
    const A = V && V.unsubscribe && (() => {
      V.unsubscribe();
    });
    let H;
    try {
      if (N && l && p !== "get" && p !== "head" && (H = yield b(X, y)) !== 0) {
        let I = new n(g, {
          method: "POST",
          body: y,
          duplex: "half"
        }), U;
        if (h.isFormData(y) && (U = I.headers.get("content-type")) && X.setContentType(U), I.body) {
          const [Z, G] = mt(
            H,
            xe(bt(N))
          );
          y = yt(I.body, St, Z, G);
        }
      }
      h.isString(M) || (M = M ? "include" : "omit");
      const v = r && "credentials" in n.prototype, se = ot(D({}, te), {
        signal: V,
        method: p.toUpperCase(),
        headers: X.normalize().toJSON(),
        body: y,
        duplex: "half",
        credentials: v ? M : void 0
      });
      B = r && new n(g, se);
      let j = yield r ? ne(B, te) : ne(g, se);
      const ie = u && (P === "stream" || P === "response");
      if (u && (O || ie && A)) {
        const I = {};
        ["status", "statusText", "headers"].forEach((re) => {
          I[re] = j[re];
        });
        const U = h.toFiniteNumber(j.headers.get("content-length")), [Z, G] = O && mt(
          U,
          xe(bt(O), !0)
        ) || [];
        j = new s(
          yt(j.body, St, Z, () => {
            G && G(), A && A();
          }),
          I
        );
      }
      P = P || "text";
      let pe = yield d[h.findKey(d, P) || "text"](
        j,
        f
      );
      return !ie && A && A(), yield new Promise((I, U) => {
        Vt(I, U, {
          data: pe,
          headers: $.from(j.headers),
          status: j.status,
          statusText: j.statusText,
          config: f,
          request: B
        });
      });
    } catch (v) {
      throw A && A(), v && v.name === "TypeError" && /Load failed|fetch/i.test(v.message) ? Object.assign(
        new _(
          "Network Error",
          _.ERR_NETWORK,
          f,
          B,
          v && v.response
        ),
        {
          cause: v.cause || v
        }
      ) : _.from(v, v && v.code, f, B, v && v.response);
    }
  });
}, ji = /* @__PURE__ */ new Map(), zt = (t) => {
  let e = t && t.env || {};
  const { fetch: n, Request: s, Response: i } = e, r = [s, i, n];
  let o = r.length, a = o, c, l, u = ji;
  for (; a--; )
    c = r[a], l = u.get(c), l === void 0 && u.set(c, l = a ? /* @__PURE__ */ new Map() : Ti(e)), u = l;
  return l;
};
zt();
const tt = {
  http: Ks,
  xhr: vi,
  fetch: {
    get: zt
  }
};
h.forEach(tt, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch (n) {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const Ct = (t) => `- ${t}`, Ii = (t) => h.isFunction(t) || t === null || t === !1;
function $i(t, e) {
  t = h.isArray(t) ? t : [t];
  const { length: n } = t;
  let s, i;
  const r = {};
  for (let o = 0; o < n; o++) {
    s = t[o];
    let a;
    if (i = s, !Ii(s) && (i = tt[(a = String(s)).toLowerCase()], i === void 0))
      throw new _(`Unknown adapter '${a}'`);
    if (i && (h.isFunction(i) || (i = i.get(e))))
      break;
    r[a || "#" + o] = i;
  }
  if (!i) {
    const o = Object.entries(r).map(
      ([c, l]) => `adapter ${c} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let a = n ? o.length > 1 ? `since :
` + o.map(Ct).join(`
`) : " " + Ct(o[0]) : "as no adapter specified";
    throw new _(
      "There is no suitable adapter to dispatch the request " + a,
      "ERR_NOT_SUPPORT"
    );
  }
  return i;
}
const Jt = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: $i,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: tt
};
function He(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new de(null, t);
}
function Ft(t) {
  return He(t), t.headers = $.from(t.headers), t.data = Ve.call(t, t.transformRequest), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Jt.getAdapter(t.adapter || et.adapter, t)(t).then(
    function(s) {
      return He(t), s.data = Ve.call(t, t.transformResponse, s), s.headers = $.from(s.headers), s;
    },
    function(s) {
      return Mt(s) || (He(t), s && s.response && (s.response.data = Ve.call(
        t,
        t.transformResponse,
        s.response
      ), s.response.headers = $.from(s.response.headers))), Promise.reject(s);
    }
  );
}
const Kt = "1.13.6", Ae = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  Ae[t] = function(s) {
    return typeof s === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const vt = {};
Ae.transitional = function(e, n, s) {
  function i(r, o) {
    return "[Axios v" + Kt + "] Transitional option '" + r + "'" + o + (s ? ". " + s : "");
  }
  return (r, o, a) => {
    if (e === !1)
      throw new _(
        i(o, " has been removed" + (n ? " in " + n : "")),
        _.ERR_DEPRECATED
      );
    return n && !vt[o] && (vt[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), e ? e(r, o, a) : !0;
  };
};
Ae.spelling = function(e) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${e}`), !0);
};
function Li(t, e, n) {
  if (typeof t != "object")
    throw new _("options must be an object", _.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(t);
  let i = s.length;
  for (; i-- > 0; ) {
    const r = s[i], o = e[r];
    if (o) {
      const a = t[r], c = a === void 0 || o(a, r, t);
      if (c !== !0)
        throw new _(
          "option " + r + " must be " + c,
          _.ERR_BAD_OPTION_VALUE
        );
      continue;
    }
    if (n !== !0)
      throw new _("Unknown option " + r, _.ERR_BAD_OPTION);
  }
}
const Re = {
  assertOptions: Li,
  validators: Ae
}, T = Re.validators;
class Ce {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = {
      request: new pt(),
      response: new pt()
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
  request(e, n) {
    return z(this, null, function* () {
      try {
        return yield this._request(e, n);
      } catch (s) {
        if (s instanceof Error) {
          let i = {};
          Error.captureStackTrace ? Error.captureStackTrace(i) : i = new Error();
          const r = i.stack ? i.stack.replace(/^.+\n/, "") : "";
          try {
            s.stack ? r && !String(s.stack).endsWith(r.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + r) : s.stack = r;
          } catch (o) {
          }
        }
        throw s;
      }
    });
  }
  _request(e, n) {
    typeof e == "string" ? (n = n || {}, n.url = e) : n = e || {}, n = W(this.defaults, n);
    const { transitional: s, paramsSerializer: i, headers: r } = n;
    s !== void 0 && Re.assertOptions(
      s,
      {
        silentJSONParsing: T.transitional(T.boolean),
        forcedJSONParsing: T.transitional(T.boolean),
        clarifyTimeoutError: T.transitional(T.boolean),
        legacyInterceptorReqResOrdering: T.transitional(T.boolean)
      },
      !1
    ), i != null && (h.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : Re.assertOptions(
      i,
      {
        encode: T.function,
        serialize: T.function
      },
      !0
    )), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Re.assertOptions(
      n,
      {
        baseUrl: T.spelling("baseURL"),
        withXsrfToken: T.spelling("withXSRFToken")
      },
      !0
    ), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = r && h.merge(r.common, r[n.method]);
    r && h.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (f) => {
      delete r[f];
    }), n.headers = $.concat(o, r);
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function(g) {
      if (typeof g.runWhen == "function" && g.runWhen(n) === !1)
        return;
      c = c && g.synchronous;
      const p = n.transitional || Xe;
      p && p.legacyInterceptorReqResOrdering ? a.unshift(g.fulfilled, g.rejected) : a.push(g.fulfilled, g.rejected);
    });
    const l = [];
    this.interceptors.response.forEach(function(g) {
      l.push(g.fulfilled, g.rejected);
    });
    let u, d = 0, m;
    if (!c) {
      const f = [Ft.bind(this), void 0];
      for (f.unshift(...a), f.push(...l), m = f.length, u = Promise.resolve(n); d < m; )
        u = u.then(f[d++], f[d++]);
      return u;
    }
    m = a.length;
    let b = n;
    for (; d < m; ) {
      const f = a[d++], g = a[d++];
      try {
        b = f(b);
      } catch (p) {
        g.call(this, p);
        break;
      }
    }
    try {
      u = Ft.call(this, b);
    } catch (f) {
      return Promise.reject(f);
    }
    for (d = 0, m = l.length; d < m; )
      u = u.then(l[d++], l[d++]);
    return u;
  }
  getUri(e) {
    e = W(this.defaults, e);
    const n = Ht(e.baseURL, e.url, e.allowAbsoluteUrls);
    return Bt(n, e.params, e.paramsSerializer);
  }
}
h.forEach(["delete", "get", "head", "options"], function(e) {
  Ce.prototype[e] = function(n, s) {
    return this.request(
      W(s || {}, {
        method: e,
        url: n,
        data: (s || {}).data
      })
    );
  };
});
h.forEach(["post", "put", "patch"], function(e) {
  function n(s) {
    return function(r, o, a) {
      return this.request(
        W(a || {}, {
          method: e,
          headers: s ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: r,
          data: o
        })
      );
    };
  }
  Ce.prototype[e] = n(), Ce.prototype[e + "Form"] = n(!0);
});
const _e = Ce;
class nt {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(r) {
      n = r;
    });
    const s = this;
    this.promise.then((i) => {
      if (!s._listeners)
        return;
      let r = s._listeners.length;
      for (; r-- > 0; )
        s._listeners[r](i);
      s._listeners = null;
    }), this.promise.then = (i) => {
      let r;
      const o = new Promise((a) => {
        s.subscribe(a), r = a;
      }).then(i);
      return o.cancel = function() {
        s.unsubscribe(r);
      }, o;
    }, e(function(r, o, a) {
      s.reason || (s.reason = new de(r, o, a), n(s.reason));
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
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(e);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), n = (s) => {
      e.abort(s);
    };
    return this.subscribe(n), e.signal.unsubscribe = () => this.unsubscribe(n), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new nt(function(i) {
        e = i;
      }),
      cancel: e
    };
  }
}
const Ni = nt;
function Ui(t) {
  return function(n) {
    return t.apply(null, n);
  };
}
function Bi(t) {
  return h.isObject(t) && t.isAxiosError === !0;
}
const Ke = {
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
Object.entries(Ke).forEach(([t, e]) => {
  Ke[e] = t;
});
const Di = Ke;
function Wt(t) {
  const e = new _e(t), n = Ot(_e.prototype.request, e);
  return h.extend(n, _e.prototype, e, { allOwnKeys: !0 }), h.extend(n, e, null, { allOwnKeys: !0 }), n.create = function(i) {
    return Wt(W(t, i));
  }, n;
}
const x = Wt(et);
x.Axios = _e;
x.CanceledError = de;
x.CancelToken = Ni;
x.isCancel = Mt;
x.VERSION = Kt;
x.toFormData = Oe;
x.AxiosError = _;
x.Cancel = x.CanceledError;
x.all = function(e) {
  return Promise.all(e);
};
x.spread = Ui;
x.isAxiosError = Bi;
x.mergeConfig = W;
x.AxiosHeaders = $;
x.formToJSON = (t) => Dt(h.isHTMLForm(t) ? new FormData(t) : t);
x.getAdapter = Jt.getAdapter;
x.HttpStatusCode = Di;
x.default = x;
const Mi = x;
let ce = null;
function Vi() {
  if (ce !== null)
    return ce;
  try {
    const t = "test-local-storage";
    localStorage.setItem(t, t), localStorage.removeItem(t), ce = !0;
  } catch (t) {
    ce = !1;
  }
  return ce;
}
const Hi = {
  computed: {
    DEBUG() {
      return this.verbose;
    },
    axiosFinal() {
      return this.axios ? this.axios : this.$globalVueQuintableaxios ? this.$globalVueQuintableaxios : Mi;
    },
    configFinal() {
      if (!this.config)
        return {};
      let t = !1;
      if (this.config.pagination === !0)
        t = 25;
      else if (this.config.pagination) {
        let w = 0;
        for (; this.paginationOptions[w] <= this.config.pagination && w < this.paginationOptions.length; )
          w++;
        t = this.paginationOptions[Math.min(w - 1, this.paginationOptions.length - 1)];
      }
      let e = "of";
      this.config.numberOfVisibleRowsFillerWord && (e = this.config.numberOfVisibleRowsFillerWord);
      let n = !1;
      this.config.select && (n = !0);
      let s = 250;
      this.config.ajaxRequestDelay && (s = this.config.ajaxRequestDelay);
      let i = "bg-muted";
      this.config.hoverClass === !1 ? i = "" : this.config.hoverClass && this.config.hoverClass !== !0 && (i = this.config.hoverClass);
      let r = "bg-muted";
      this.config.activeClass === !1 ? r = "" : this.config.activeClass && this.config.activeClass !== !0 && (r = this.config.activeClass);
      let o = !1;
      this.config.multiSort && (o = !0);
      let a = !1;
      this.config.pageSort && (a = !0);
      let c = !1;
      this.config.multiSortSelect && (c = !0);
      let l = !1;
      this.config.pageSortSelect && (l = !0);
      let u = !1;
      this.config.ajaxUrl && (u = this.config.ajaxUrl);
      let d = "post";
      ["pre", "post"].includes(this.config.selectPosition) && (d = this.config.selectPosition);
      let m = !1;
      this.config.expandedAll && (m = !0);
      let b = !1;
      this.config.useFuzzySearch && (b = !0);
      let f = !1;
      this.config.prettySelect && (f = !0);
      let g = !1;
      this.config.rowsSelect && (g = !0);
      let p = !1;
      this.config.keepSelect && (p = !0);
      let y = !1;
      this.config.disallowAllOption && (y = !0);
      let R = !1;
      this.config.hideEmptyColumns && (R = !0);
      let S = "none";
      ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns) && (S = this.config.ignoreSortEmptyColumns);
      let F = !1;
      this.config.search && (F = !0);
      let O = 1;
      this.config.searchLength && (O = this.config.searchLength);
      let N = "Search...";
      this.config.searchPlaceholder && (N = this.config.searchPlaceholder);
      let P = "Multiple sort";
      this.config.multiSortPlaceholder && (P = this.config.multiSortPlaceholder);
      let X = "Page sort";
      this.config.pageSortPlaceholder && (X = this.config.pageSortPlaceholder);
      let M = "AND";
      ["AND", "OR"].includes(this.config.filterRelation) && (M = this.config.filterRelation);
      let te = "AND";
      ["AND", "OR"].includes(this.config.filterGroupRelation) && (te = this.config.filterGroupRelation);
      let ne = "Rows per page:";
      this.config.rowsPlaceholder && (ne = this.config.rowsPlaceholder);
      let V = "No rows...";
      this.config.emptyPlaceholder && (V = this.config.emptyPlaceholder);
      let B = !1;
      this.config.selectAll && (B = !0);
      let A = !1;
      this.config.selectAllRows && (A = !0), u && A && (console.warn(
        "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
      ), A = !1);
      let H = !1;
      this.config.storeState && (H = !0), !this.identifier && this.config.storeState && (console.warn(
        "Option storeState was deactivated automatically because table identifier is not set!"
      ), H = !1), Vi() || (console.warn(
        "Option storeState was deactivated automatically because local storage is not available!"
      ), H = !1);
      let v = !1;
      this.config.defaultSelected && (v = !0);
      let se = !1;
      this.config.hideRowToggle && (se = !0);
      let j = !1;
      this.config.enableRowTabIndex && (j = !0);
      let ie = "chevron-up";
      this.config.expandedRowIcon && typeof this.config.expandedRowIcon == "string" && ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
        this.config.expandedRowIcon.toLowerCase()
      ) && (ie = this.config.expandedRowIcon.toLowerCase());
      let pe = "chevron-down";
      this.config.collapsedRowIcon && typeof this.config.collapsedRowIcon == "string" && ["chevron-down", "plus", "caret-down", "eye"].includes(
        this.config.collapsedRowIcon.toLowerCase()
      ) && (pe = this.config.collapsedRowIcon.toLowerCase());
      let I = 5;
      this.config.pageRange && (I = this.config.pageRange);
      let U = "col-12";
      this.config.searchClass && (U = this.config.searchClass);
      let Z = "row";
      this.config.searchContainerClass && (Z = this.config.searchContainerClass);
      let G = "GET";
      this.config.requestMethod && typeof this.config.requestMethod == "string" && ["POST", "GET"].includes(this.config.requestMethod.toUpperCase()) && (G = this.config.requestMethod.toUpperCase());
      let re = 0, Te = [], je = [], Ie = [], ge = [], $e = [], Le = [], oe = [], Ne = [], st = null;
      if (this.config.columns) {
        re = this.config.columns.length;
        for (let w = 0; w < this.config.columns.length; w++)
          oe[w] = "", this.config.columns[w] && this.config.columns[w].headline ? (Te[w] = this.config.columns[w].headline, oe[w] += this.config.columns[w].headline.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()) : Te[w] = "", oe[w] += " column-" + (w + 1), this.config.columns[w].classes && (oe[w] += " " + this.config.columns[w].classes), this.config.columns[w] && this.config.columns[w].breakpoint ? je[w] = this.config.columns[w].breakpoint : je[w] = "", this.config.columns[w] && this.config.columns[w].sort ? this.config.columns[w].firstSortDirection && typeof this.config.columns[w].firstSortDirection == "string" && ["DESC", "ASC"].includes(
            this.config.columns[w].firstSortDirection.toUpperCase()
          ) ? ge[w] = this.config.columns[w].firstSortDirection.toUpperCase() : ge[w] = !0 : ge[w] = !1, this.config.columns[w] && this.config.columns[w].ignoreEmpty ? Ne[w] = !0 : Ne[w] = !1, this.config.columns[w] && this.config.columns[w].sticky ? $e[w] = !0 : $e[w] = !1, this.config.columns[w] && this.config.columns[w].hidden ? Ie[w] = !0 : Ie[w] = !1, this.config.columns[w] && this.config.columns[w].align ? Le[w] = this.config.columns[w].align : Le[w] = !1;
        st = this.config.columns;
      }
      return Object.freeze({
        headlines: Te,
        columnClasses: oe,
        sorts: ge,
        pageSort: a,
        multiSort: o,
        pageSortSelect: l,
        multiSortSelect: c,
        filterGroupRelation: te,
        filterRelation: M,
        rowsSelect: g,
        keepSelect: p,
        disallowAllOption: y,
        defaultSelected: v,
        searchLength: O,
        search: F,
        searchPlaceholder: N,
        useFuzzySearch: b,
        ajaxUrl: u,
        pageSortPlaceholder: X,
        multiSortPlaceholder: P,
        rowsPlaceholder: ne,
        emptyPlaceholder: V,
        stickyCols: $e,
        alignments: Le,
        breakpoints: je,
        hiddenCols: Ie,
        ignoreEmpty: Ne,
        hideEmptyColumns: R,
        ignoreSortEmptyColumns: S,
        pagination: t,
        numberOfVisibleRowsFillerWord: e,
        select: n,
        selectAll: B,
        selectAllRows: A,
        hoverClass: i,
        activeClass: r,
        expandedAll: m,
        pageRange: I,
        prettySelect: f,
        number: re,
        columns: st,
        hideRowToggle: se,
        enableRowTabIndex: j,
        expandedRowIcon: ie,
        collapsedRowIcon: pe,
        selectPosition: d,
        searchClass: U,
        searchContainerClass: Z,
        requestMethod: G,
        storeState: H,
        ajaxRequestDelay: s
      });
    }
  }
}, Gi = {
  data() {
    return {
      sortedIndexes: {},
      currentSortIndexes: {}
    };
  },
  computed: {
    numberOfSorts() {
      return Object.keys(this.currentSortIndexes).length;
    },
    sortingColumns() {
      let t = {};
      for (let e in this.currentSortIndexes)
        Object.prototype.hasOwnProperty.call(this.currentSortIndexes, e) && (t[e] = this.configFinal.columns[e]);
      return t;
    }
  },
  watch: {
    pageSort() {
      this.currentSortIndexes = {}, this.resetSorts(), this.recomputeEssentials();
    },
    customMultiSort(t) {
      if (!t && Object.keys(this.currentSortIndexes).length > 1) {
        let e, n;
        for (let s in this.currentSortIndexes)
          if (Object.prototype.hasOwnProperty.call(
            this.currentSortIndexes,
            s
          ) && this.currentSortIndexes[s].order === 0) {
            e = this.currentSortIndexes[s], n = s;
            break;
          }
        this.currentSortIndexes = {}, this.$set(this.currentSortIndexes, n, e), this.sort();
      }
    },
    sortOrder: {
      immediate: !0,
      handler() {
        this.currentSortIndexes = {};
        for (let t = 0; t < this.sortOrder.length; t++)
          typeof this.sortOrder[t] == "object" ? this.setSortColumn(this.sortOrder[t].index, this.sortOrder[t].asc) : typeof this.sortOrder[t] == "number" && this.setSortColumn(this.sortOrder[t]);
      }
    }
  },
  methods: {
    removeSort(t) {
      for (let e in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, e)) {
          let n = this.currentSortIndexes[e];
          n.order > this.currentSortIndexes[t].order && n.order--, this.$set(this.currentSortIndexes, e, n);
        }
      this.$delete(this.currentSortIndexes, t), this.numberOfSorts === 0 ? (this.resetSorts(), this.currentPage !== 1 ? this.currentPage = 1 : this.recomputeEssentials(), this.configFinal.ajaxUrl && !this.pageSort && this.loadViaAjax(!0, !0, "SORT")) : this.sort();
    },
    resetSorts() {
      for (let t = 0; t < this.rowsFinal.length; t++) {
        const e = t.toString();
        this.$set(this.sortedIndexes, e, t);
      }
    },
    setSortColumn(t, e) {
      const n = parseInt(t), s = t.toString();
      if (!this.configFinal.sorts[n])
        return;
      let i;
      this.currentSortIndexes[s] ? (i = this.currentSortIndexes[s], i.asc = !i.asc) : (this.multiSort || (this.currentSortIndexes = {}), i = {
        headline: this.configFinal.headlines[n],
        index: n,
        asc: this.configFinal.sorts[n] === !0 ? !0 : this.configFinal.sorts[n] === "ASC",
        order: this.numberOfSorts
      }), typeof e != "undefined" && (i.asc = e), this.$set(this.currentSortIndexes, s, i), this.configFinal.storeState && localStorage.setItem(
        `vue-quintable-${this.identifier}-sort-indexes`,
        JSON.stringify(this.currentSortIndexes)
      ), this.$emit("update:sort", this.currentSortIndexes, "update:sort"), this.sort();
    },
    sort(t = !1) {
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        this.loadViaAjax(!t, !t, "SORT");
        return;
      }
      let e = this.rowsFinal.slice(), n = [], s = [], i = {};
      if (this.pageSort) {
        if (s = this.visibleRowIndexes.slice(), !s.length) {
          const d = this.configFinal.pagination ? this.configFinal.pagination : this.rowsFinal.length;
          for (let m = 0; m < d; m++)
            s.push(m);
        }
        let u = 0;
        for (let d = 0; d < e.length; d++)
          e[d].index = d, s.indexOf(d) !== -1 && (u < this.configFinal.pagination && n.push(e[d]), u++);
        if (Object.keys(this.sortedIndexes).length)
          i = Object.assign({}, this.sortedIndexes);
        else
          for (let d = 0; d < e.length; d++)
            this.$set(i, d.toString(), d);
      } else {
        n = this.rowsFinal.slice();
        for (let u = 0; u < n.length; u++)
          n[u].index = u;
      }
      let r = [];
      for (let u in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, u)) {
          let d = this.currentSortIndexes[u];
          d.index = u, r.push(d);
        }
      r.sort(function(u, d) {
        return u.order - d.order;
      });
      let o = (u, d, m, b) => {
        b = b || 0;
        let f = m[b], g = f.index, p = u.cells ? u.cells : u, y = d.cells ? d.cells : d, R = typeof p[g].sortValue != "undefined" && p[g].sortValue !== null ? p[g].sortValue : p[g].html ? p[g].html : p[g].text;
        typeof p[g].computeSortValue == "function" && (R = p[g].computeSortValue(this.currentSortIndexes));
        let S = typeof y[g].sortValue != "undefined" && y[g].sortValue !== null ? y[g].sortValue : y[g].html ? y[g].html : y[g].text;
        return typeof y[g].computeSortValue == "function" && (S = y[g].computeSortValue(this.currentSortIndexes)), typeof R == "string" && (R = R.toLowerCase()), typeof S == "string" && (S = S.toLowerCase()), isNaN(R) ? (typeof R == "string" && R.match(/^-?\d+$/) || typeof R == "string" && R.match(/^\d+\.\d+$/)) && (R = parseFloat(R)) : R = parseFloat(R), isNaN(S) ? (typeof S == "string" && S.match(/^-?\d+$/) || typeof S == "string" && S.match(/^\d+\.\d+$/)) && (S = parseFloat(S)) : S = parseFloat(S), f.asc ? R > S ? 1 : R < S ? -1 : m[b + 1] ? o(u, d, m, b + 1) : 1 : R < S ? 1 : R > S ? -1 : m[b + 1] ? o(u, d, m, b + 1) : -1;
      };
      n.sort(function(u, d) {
        return o(u, d, r);
      });
      const a = [];
      let c = 0, l = 0;
      for (let u = 0; u < e.length; u++) {
        const d = u.toString();
        this.pageSort && s.indexOf(u) !== -1 ? (c < this.configFinal.pagination ? (a.push(n[l]), l++) : a.push(e[i[d]]), c++) : this.pageSort ? a.push(e[i[d]]) : a.push(n[u]);
      }
      for (let u = 0; u < a.length; u++) {
        const d = u.toString();
        this.$set(this.sortedIndexes, d, parseInt(a[u].index));
      }
      !this.pageSort && !t && (this.currentPage = 1), !this.configFinal.selectAllRows && !this.pageSort && !t && !this.configFinal.keepSelect && this.resetSelect("sort method"), this.recomputeEssentials();
    }
  }
}, Qt = Object.freeze({
  equal: (t, e) => e === t,
  greater: (t, e) => e > t,
  less: (t, e) => e < t,
  greaterEqual: (t, e) => e >= t,
  lessEqual: (t, e) => e <= t,
  contains: (t, e) => !Array.isArray(e) && typeof e != "string" ? !1 : e.indexOf(t) !== -1,
  notContains: (t, e) => !Array.isArray(e) && typeof e != "string" ? !1 : e.indexOf(t) === -1,
  startsWith: (t, e) => typeof e != "string" ? !1 : e.indexOf(t) === 0,
  endsWitch: (t, e) => typeof e != "string" ? !1 : e.indexOf(t, globalThis.length - t.length) !== -1,
  matches(t, e) {
    return !(t instanceof RegExp) || typeof e != "string" ? !1 : t.test(e);
  }
}), zi = Object.keys(Qt), Ji = {
  data() {
    return {
      defaultOperator: "equal",
      operatorFunctions: Qt
    };
  },
  computed: {
    operators() {
      return zi;
    },
    filterActive() {
      return this.filtersFinal && Object.keys(this.filtersFinal).length;
    },
    filtersFinal() {
      return !this.configFinal.storeState || !this.storedState.filters ? this.filters : this.storedState.filters;
    },
    filteredRows() {
      if (this.configFinal.ajaxUrl)
        return this.rowsFinal;
      let t = new Array(this.rowsFinal.length).fill(!0);
      if (!this.configFinal.search && !this.filterActive || !this.filterActive && this.configFinal.search && this.query.length < this.configFinal.searchLength)
        return t;
      const e = (this.query + "").toLowerCase();
      for (let n = 0; n < this.rowsFinal.length; n++) {
        let s = this.rowsFinal[n].cells ? this.rowsFinal[n].cells : this.rowsFinal[n], i = !1, r = !1;
        if (this.configFinal.search && this.query.length >= this.configFinal.searchLength) {
          for (let o = 0; o < s.length; o++) {
            let a = s[o], c = a.html ? a.html : a.text;
            if (c) {
              const l = (c + "").toLowerCase();
              if (this.configFinal.useFuzzySearch && lt(l, e).score > 6) {
                i = !0;
                break;
              }
              if (l.indexOf(e) !== -1) {
                i = !0;
                break;
              }
            }
          }
          if (!i && this.rowsFinal[n].keywords)
            for (let o = 0; o < this.rowsFinal[n].keywords.length; o++) {
              const a = (this.rowsFinal[n].keywords[o] + "").toLowerCase();
              if (this.configFinal.useFuzzySearch && lt(a, e).score > 6) {
                i = !0;
                break;
              }
              if (a.indexOf(e) !== -1) {
                i = !0;
                break;
              }
            }
          r = !0;
        }
        if (this.filterActive && !this.rowsFinal[n].filters)
          i = !1;
        else if ((r && i || !r) && this.filterActive) {
          if (this.filterGroups.length)
            i = this.doFiltering(this.rowsFinal[n].filters);
          else {
            let o = {
              items: [],
              relation: this.configFinal.filterRelation
            };
            const a = Object.keys(this.filtersFinal);
            for (let c = 0; c < a.length; c++)
              o.items.push({ name: a[c] });
            i = this.doFilteringForGroup(
              this.filtersFinal,
              this.rowsFinal[n].filters,
              o
            ), this.DEBUG && console.log("FILTER GROUPS CALCULATED", this.filterGroups);
          }
          this.DEBUG && (console.log(`
`), console.log("ROW " + n, i, this.rowsFinal[n].filters), console.log(`
`));
        }
        t[n] = i;
      }
      return t;
    }
  },
  watch: {
    filters: {
      handler() {
        const t = !!(this.configFinal.storeState && this.storedState.filters);
        t && this.$delete(this.storedState, "filters"), this.configFinal.ajaxUrl && (this.pageSort = !1, this.loadViaAjax(!t, !t, "FILTERS")), this.pageSort && (this.currentSortIndexes = {}, this.resetSorts(), this.recomputeEssentials()), this.configFinal.storeState && localStorage.setItem(
          `vue-quintable-${this.identifier}-filters`,
          JSON.stringify(this.filtersFinal)
        );
      },
      deep: !0
    },
    filtersFinal(t) {
      this.$emit("update:filters", t, "update:filters");
    },
    filteredRows: {
      handler(t, e) {
        if (this.configFinal.ajaxUrl || t === e)
          return;
        if (e && t.length === e.length) {
          let i = !0;
          for (let r = 0; r < t.length; r++)
            if (t[r] !== e[r]) {
              i = !1;
              break;
            }
          if (i)
            return;
        }
        (this.activeRow !== null && this._visibleRowIndexMap[this.activeRow] !== void 0 ? this._visibleRowIndexMap[this.activeRow] : -1) < 0 && (this.activeRow = null), this.currentPage !== 1 ? this.currentPage = 1 : this.configFinal.keepSelect || this.resetSelect("filteredRows watcher");
        const s = [];
        for (let i = 0; i < t.length; i++) {
          const r = i.toString();
          t[i] && s.push(
            this.rowsFinal[this.sortedIndexes[r] ? this.sortedIndexes[r] : i]
          );
        }
        this.$emit("filtered:rows", s, "filtered:rows");
      },
      immediate: !0
    }
  },
  methods: {
    doFiltering(t) {
      let e = [];
      for (let n = 0; n < this.filterGroups.length; n++)
        e.push(
          this.doFilteringForGroup(
            this.filtersFinal,
            t,
            this.filterGroups[n]
          )
        ), this.DEBUG && n < this.filterGroups.length - 1 && console.log(this.configFinal.filterGroupRelation);
      return this.DEBUG && console.log(
        "RESULTS FOR GROUPS:",
        e,
        this.configFinal.filterGroupRelation
      ), this.configFinal.filterGroupRelation === "AND" ? e.indexOf(!1) === -1 : this.configFinal.filterGroupRelation === "OR" ? e.indexOf(!0) !== -1 : !0;
    },
    doFilteringForGroup(t, e, n, s = 0) {
      let i = "   ";
      for (let o = 0; o < s; o++)
        i += "   ";
      if (this.DEBUG) {
        if (n.items) {
          let o = i, a = n.items.slice(), c = function(l, u) {
            return l.name === void 0 ? 1 : u.name === void 0 ? -1 : 0;
          };
          a = a.sort(c);
          for (let l = 0; l < a.length; l++)
            a[l].name && (o += a[l].name, l < a.length - 1 && (o += " " + n.relation + " "));
          console.log(o);
        }
        console.log(i, "GROUP:", n);
      }
      let r = !1;
      if (n.relation === "AND") {
        for (let o in t)
          if (Object.prototype.hasOwnProperty.call(t, o)) {
            if (this.filterGroups.length && !this.findInFilterGroups(o, this.filterGroups))
              continue;
            let a = !0;
            for (let c = 0; c < n.items.length; c++) {
              let l = n.items[c];
              if (l.name && e[l.name] === void 0) {
                a = !1;
                break;
              }
            }
            if (a)
              for (let c = 0; c < n.items.length; c++) {
                let l = n.items[c];
                if (r = !0, l.items && (r = this.doFilteringForGroup(
                  t,
                  e,
                  l,
                  s + 1
                )), !r)
                  break;
                if (typeof t[l.name] == "undefined")
                  continue;
                let u = typeof t[l.name] == "object" && t[l.name] !== null && t[l.name].operator && this.operators.includes(t[l.name].operator) ? t[l.name].operator : this.defaultOperator, d = this.getFilterValues(t[l.name]);
                const m = typeof t[l.name].compare == "function" ? t[l.name].compare : this.operatorFunctions[u];
                for (let b = 0; b < d.length; b++)
                  if (!m(
                    d[b],
                    e[l.name]
                  )) {
                    r = !1;
                    break;
                  }
                if (!r)
                  break;
              }
          }
        return r;
      } else if (n.relation === "OR" || n.items) {
        for (let o in t)
          if (Object.prototype.hasOwnProperty.call(t, o)) {
            if (this.filterGroups.length && !this.findInFilterGroups(o, this.filterGroups))
              continue;
            for (let a = 0; a < n.items.length; a++) {
              let c = n.items[a];
              if (c.items && (r = this.doFilteringForGroup(
                t,
                e,
                c,
                s + 1
              ), r))
                break;
              if (typeof t[c.name] == "undefined")
                continue;
              let l = typeof t[c.name] == "object" && t[c.name] !== null && t[c.name].operator && this.operators.includes(t[c.name].operator) ? t[c.name].operator : this.defaultOperator, u = this.getFilterValues(t[c.name]);
              const d = typeof t[c.name].compare == "function" ? t[c.name].compare : this.operatorFunctions[l];
              for (let m = 0; m < u.length; m++)
                if (d(
                  u[m],
                  e[c.name]
                )) {
                  r = !0;
                  break;
                }
              if (r)
                break;
            }
          }
        return r;
      } else
        return !0;
    },
    getFilterValues(t) {
      return t instanceof RegExp || typeof t != "object" || t === null ? [t] : Array.isArray(t) ? t : this.getFilterValues(t.values);
    },
    findInFilterGroups(t, e, n = 0) {
      if (!e)
        return !1;
      let s = !1;
      for (let i = 0; i < e.length; i++) {
        let r = e[i];
        if (r.items && (s = this.findInFilterGroups(t, r.items, n + 1), s))
          break;
        if (r.name === t) {
          s = !0;
          break;
        }
      }
      return s;
    }
  }
}, Ki = {
  data() {
    return {
      fetching: !1,
      ajaxRows: [],
      ajaxPages: 0,
      ajaxAll: 0,
      cancelSource: null,
      lastQuery: "",
      queryAjaxTimeout: null
    };
  },
  computed: {
    ajaxLoading() {
      return this.loading || this.fetching;
    }
  },
  watch: {
    updated(t) {
      this.configFinal.ajaxUrl && (t && t.clear ? this.loadViaAjax(!0, !0, "UPDATED") : t && this.loadViaAjax(!1, !0, "UPDATED"));
    },
    loading() {
      this.loaderHeight = this.$refs["height-wrapper"] ? this.$refs["height-wrapper"].clientHeight : 0;
    }
  },
  methods: {
    loadViaAjax(t = !1, e = !0, n = null) {
      this.DEBUG && console.log("CALLED FROM:", n);
      let s = this.query;
      if (s && s.length < this.configFinal.searchLength && (this.lastQuery.length < s.length || this.lastQuery.length < this.configFinal.searchLength))
        return;
      if (!s && this.lastQuery) {
        const o = this.lastQuery;
        if (this.lastQuery = "", o.length < this.configFinal.searchLength)
          return;
      } else
        s && s.length < this.configFinal.searchLength && (s = "");
      this.cancelSource && this.cancelSource.cancel("Operation canceled by the user."), this.clearLists(e), this.ajaxRows = [], t && (this.currentPage = 1, this.resetSelect("loadViaAjax method")), this.loaderHeight = this.$refs["height-wrapper"] ? this.$refs["height-wrapper"].clientHeight : 0, this.fetching = !0;
      let i = {
        search: s,
        filters: this.filtersFinal,
        perPage: this.currentRowsPerPage,
        page: this.currentPage,
        hiddenColumns: this.configFinal.hiddenCols,
        sort: this.numberOfSorts > 0 ? {
          indexes: this.currentSortIndexes,
          columns: this.sortingColumns
        } : null
      };
      this.cancelSource = this.axiosFinal.CancelToken.source();
      const r = {
        "Content-Type": "application/json"
      };
      this.axiosFinal.request(this.configFinal.ajaxUrl, {
        method: this.configFinal.requestMethod,
        params: this.configFinal.requestMethod === "GET" ? i : null,
        data: this.configFinal.requestMethod === "POST" ? i : null,
        cancelToken: this.cancelSource.token,
        headers: r
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
    }
  }
}, Wi = Object.freeze([
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
]), Qi = {
  data() {
    return {
      currentPage: 1,
      paginationOptions: Wi,
      customRowsPerPage: null,
      pageOffset: 0
    };
  },
  computed: {
    currentRowsPerPageProperty: {
      get() {
        return this.customRowsPerPage ? this.customRowsPerPage : this.currentRowsPerPage;
      },
      set(t) {
        this.customRowsPerPage = t;
      }
    },
    currentRowsPerPage() {
      return this.customRowsPerPage ? this.customRowsPerPage : this.configFinal.pagination ? this.configFinal.pagination : "All";
    },
    paginationOptionsFilled() {
      return (this.configFinal.disallowAllOption ? [] : ["All"]).concat(this.paginationOptions);
    },
    pageRange() {
      return Math.min(this.configFinal.pageRange, this.pages);
    },
    pages() {
      return this.ajaxPages ? this.ajaxPages : !this.currentRowsPerPage || this.currentRowsPerPage === "All" ? 1 : Math.max(
        1,
        Math.ceil(this.numberOfVisibleRows / this.currentRowsPerPage)
      );
    },
    numberOfVisibleRows() {
      if (this.configFinal.ajaxUrl)
        return this.ajaxAll;
      let t = 0;
      for (let e = 0; e < this.filteredRows.length; e++)
        this.filteredRows[e] && t++;
      return t;
    },
    visiblePages() {
      let t = [], e = 0;
      if (this.pages < this.pageRange || this.currentPage === 1)
        e = 1;
      else if (this.currentPage === this.pages)
        e = this.currentPage - (this.pageRange - 1);
      else {
        let n;
        this.pageRange % 2 === 0 ? n = this.pageRange / 2 : (n = (this.pageRange - 1) / 2, this.currentPage + n > this.pages && n++), e = this.currentPage - n;
      }
      e = Math.max(e + this.pageOffset, 1);
      for (let n = 0; n < this.pageRange && !(n + e > this.pages); n++)
        t.push(n + e);
      return t;
    },
    noRows() {
      return !this.numberOfVisibleRows;
    },
    firstVisibleRow() {
      return this.currentRowsPerPage === "All" || this.pages === 1 ? 1 : this.currentPage * this.currentRowsPerPage - this.currentRowsPerPage + 1;
    },
    lastVisibleRow() {
      return this.currentRowsPerPage === "All" || this.pages === 1 ? this.numberOfVisibleRows : Math.min(
        this.firstVisibleRow + this.currentRowsPerPage - 1,
        this.numberOfVisibleRows
      );
    }
  },
  watch: {
    currentRowsPerPage(t) {
      this.$emit("update:rows-per-page", t, "update:rows-per-page");
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
    currentPage(t) {
      this.pageOffset = 0, this.activeRow = null, this.$emit("update:page", t, "update:page");
      const e = !(this.configFinal.storeState && this.storedState["current-page"]);
      if (this.configFinal.storeState && (this.$delete(this.storedState, "current-page"), localStorage.setItem(
        `vue-quintable-${this.identifier}-current-page`,
        this.currentPage
      )), this.configFinal.ajaxUrl) {
        this.resetSelect("currentPage watcher ajax"), this.loadViaAjax(!1, e, "PAGE");
        return;
      }
      this.configFinal.selectAllRows || this.resetSelect("currentPage watcher"), this.pageSort && (this.currentSortIndexes = {}, this.resetSorts()), this.recomputeEssentials();
    }
  },
  methods: {
    gotoPage(t) {
      t === "prev" ? this.currentPage - 1 > 0 && this.currentPage-- : t === "next" ? this.currentPage + 1 <= this.pages && this.currentPage++ : t === "first" ? this.currentPage = 1 : t === "last" ? this.currentPage = this.pages : this.currentPage = t;
    },
    updatePageOffset(t) {
      let e = this.pageOffset + this.pageRange * t;
      if (t > 0) {
        let n = Math.min(e, this.pages - this.pageRange);
        this.pageOffset = Math.min(n, this.pages - this.currentPage);
      } else
        t < 0 ? this.pageOffset = Math.max(e, -(this.pages - this.pageRange)) : this.pageOffset = 0;
    }
  }
}, Xi = {
  data() {
    return {
      allSelectedCustom: null,
      selected: {}
    };
  },
  computed: {
    allSelectedProperty: {
      get() {
        return this.allSelectedCustom === null ? this.configFinal.defaultSelected : this.allSelectedCustom;
      },
      set(t) {
        this.allSelectedCustom = t;
      }
    },
    someSelected() {
      return Object.values(this.selected).some((t) => t);
    }
  },
  watch: {
    preSelectedRows(t) {
      if (t) {
        for (let e = 0; e < this.rowsFinal.length; e++)
          this.$set(this.selected, e, !1);
        if (t && t.length) {
          let e = 0;
          const n = this.configFinal.selectAllRows ? this.rowsFinal.map((s, i) => i) : this.visibleRowIndexes;
          for (let s = 0; s < t.length; s++) {
            const i = t[s].key, r = t[s].value;
            for (let o = 0; o < n.length; o++) {
              const a = n[o];
              !this.rowsFinal[a].disableSelect && this.rowsFinal[a][i] === r && (this.$set(this.selected, a, !0), e++);
            }
          }
          if (this.configFinal.selectAllRows) {
            let s = 0;
            for (let i = 0; i < this.rowsFinal.length; i++)
              this.rowsFinal[i].disableSelect || s++;
            this.allSelectedCustom = e && e === s;
          } else {
            let s = 0;
            for (let i = 0; i < this.rowsFinal.length; i++)
              !this.rowsFinal[i].disableSelect && this.visibleRows[this.sortedIndexes[i]] && s++;
            this.allSelectedCustom = e && e === s;
          }
        } else
          this.allSelectedCustom = !1;
      }
    },
    selected: {
      handler(t) {
        let e = [];
        for (let n in this.sortedIndexes)
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, n) && t[this.sortedIndexes[n]]) {
            const s = this.rowsFinal[this.sortedIndexes[n]];
            s && !s.disableSelect && e.push(s);
          }
        this.configFinal.storeState && localStorage.setItem(
          `vue-quintable-${this.identifier}-selected-rows`,
          JSON.stringify(t)
        ), this.$emit("input", e), this.$emit("update:selected-rows", e, "update:selected-rows");
      },
      deep: !0
    }
  },
  methods: {
    checkAll(t = !1) {
      let e = this.allSelectedProperty;
      t && (e = !0);
      let n = 0;
      for (let s in this.sortedIndexes)
        Object.prototype.hasOwnProperty.call(this.sortedIndexes, s) && (s = parseInt(s), !this.rowsFinal[this.sortedIndexes[s]].disableSelect && (!this.configFinal.selectAllRows && this.visibleRows[this.sortedIndexes[s]] || this.configFinal.selectAllRows && this.filteredRows[this.sortedIndexes[s]]) ? (this.$set(this.selected, this.sortedIndexes[s], e), n++) : this.$set(this.selected, this.sortedIndexes[s], !1));
      if (e)
        if (this.configFinal.selectAllRows) {
          let s = 0;
          for (let i = 0; i < this.rowsFinal.length; i++)
            this.rowsFinal[i].disableSelect || s++;
          this.allSelectedCustom = n && n === s;
        } else {
          let s = 0;
          for (let i = 0; i < this.rowsFinal.length; i++)
            !this.rowsFinal[i].disableSelect && this.visibleRows[this.sortedIndexes[i]] && s++;
          this.allSelectedCustom = n && n === s;
        }
    },
    checkListener(t, e) {
      let n = !0;
      if (this.configFinal.selectAllRows) {
        for (let s = 0; s < this.rowsFinal.length; s++)
          if (!(s === e ? !!t : !!(this.selected[s] || this.rowsFinal[s] && this.rowsFinal[s].disableSelect))) {
            n = !1;
            break;
          }
      } else
        for (let s = 0; s < this.visibleRowIndexes.length; s++) {
          const i = this.visibleRowIndexes[s];
          if (!(i === e ? !!t : !!(this.selected[i] || this.rowsFinal[i] && this.rowsFinal[i].disableSelect))) {
            n = !1;
            break;
          }
        }
      this.allSelectedProperty = n;
    },
    resetSelect(t) {
      this.DEBUG && console.log("CALLED FROM:", t), this.allSelectedProperty = !1;
      for (let e = 0; e < this.rowsFinal.length; e++)
        this.$set(this.selected, e, !1);
    },
    checkStoredSelectedRows(t = !1) {
      if (this.storedState["pre-selected-rows"], this.storedState["selected-rows"]) {
        this.selected = JSON.parse(
          JSON.stringify(this.storedState["selected-rows"])
        );
        const e = Object.values(this.selected).filter((n) => n).length;
        if (this.configFinal.selectAllRows)
          this.allSelectedCustom = e && e === this.rowsFinal.length;
        else {
          let n = 0;
          for (let s = 0; s < this.visibleRows.length; s++)
            this.visibleRows[s] && n++;
          this.allSelectedCustom = e && e === n;
        }
        t && this.$delete(this.storedState, "selected-rows");
      }
    }
  }
}, Zi = {
  methods: {
    handleComponentEvent(t) {
      this.$emit("component:event", t, "component:event");
    },
    hasSomeParentTheClass(t, e) {
      return t instanceof HTMLElement && t.classList.contains(e) ? !0 : t instanceof Element && t.parentNode && this.hasSomeParentTheClass(t.parentNode, e);
    },
    hasSomeParentTagName(t, e) {
      return t instanceof HTMLElement && t.tagName.toLowerCase() === e.toLowerCase() ? !0 : t instanceof Element && t.parentNode && this.hasSomeParentTagName(t.parentNode, e);
    },
    onRowAuxClick(t, e) {
      if (t.button === 1) {
        const n = parseInt(e);
        this.$emit(
          "auxclick:row",
          this.rowsFinal[n],
          "auxclick:row",
          t.target,
          t,
          n
        );
      }
    },
    onRowMousedown(t) {
      t.which === 2 && t.preventDefault();
    },
    onRowClick(t, e) {
      if ((t.target || {}).type === "checkbox")
        return;
      if (this.hasSomeParentTheClass(t.target, "generated-table") && !this.nested)
        return;
      let n = this.hasSomeParentTagName(t.target, "a"), s = this.hasSomeParentTheClass(
        t.target,
        "prevent-toggle"
      );
      const i = e.toString(), r = parseInt(e);
      this.hiddenColumns[i] && !n && !s && (this.openRows[i] ? (this.$set(this.openRows, i, !1), this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[i]],
        "collapse:row",
        this.sortedIndexes[i]
      )) : (this.$set(this.openRows, i, !0), this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[i]],
        "expand:row",
        this.sortedIndexes[i]
      )), this.generatedUpdatedKey = Date.now()), this.configFinal.enableRowTabIndex && (this.activeRow === r ? this.activeRow = null : this.activeRow = r), this.$emit("click:row", this.rowsFinal[r], "click:row", t.target, t, r);
    },
    onCellClick(t, e) {
      this.$emit("click:cell", e, "click:cell", t.target, t);
    },
    onCellAuxClick(t, e) {
      t.button === 1 && this.$emit("auxclick:cell", e, "auxclick:cell", t.target, t);
    },
    onCellMousedown(t) {
      t.which === 2 && t.preventDefault();
    },
    onMouseenterRow(t) {
      this.hoveredRow !== t && (this.hoveredRow = t);
    },
    onMouseleaveTable() {
      const t = this.configFinal.hoverClass;
      t && this._lastHoveredEl && (this._lastHoveredEl.classList.remove(t), this._lastHoveredEl = null), this.hoveredRow = null;
    }
  }
}, Yi = {
  data() {
    return {
      hiddenBreakpoints: [],
      initBreakpoints: !0,
      breakpointTimeout: null
    };
  },
  watch: {
    hiddenBreakpoints(t) {
      this.initBreakpoints || this.$emit("change:breakpoints", t, "change:breakpoints"), this.initBreakpoints = !1;
    }
  },
  methods: {
    _onBreakpointChange(t) {
      (this.hiddenBreakpoints.length !== t.length || this.hiddenBreakpoints.some((e, n) => e !== t[n])) && (this.hiddenBreakpoints = t);
    },
    elementVisible(t) {
      return t ? window.getComputedStyle(t).display !== "none" : !1;
    },
    // Keep for backwards compatibility — now delegates to shared detector
    generateHiddenBreakpoints() {
      const t = Pt();
      this._onBreakpointChange(t.hiddenBreakpoints);
    },
    breakpointListener() {
      clearTimeout(this.breakpointTimeout), this.breakpointTimeout = setTimeout(() => {
        this.generateHiddenBreakpoints();
      }, 200);
    }
  }
};
let er = 0;
const tr = {
  name: "VueQuintable",
  mixins: [
    Hi,
    Gi,
    Ji,
    Ki,
    Qi,
    Xi,
    Zi,
    Yi
  ],
  components: {
    TableHeader: Un,
    SelectCheckbox: kt,
    ExpandedRow: Hn,
    PaginationFooter: es,
    SearchBar: rs
  },
  provide() {
    return {
      quintable: this
    };
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
      essentialsKey: Date.now(),
      generatedUpdatedKey: Date.now(),
      hoveredRow: null,
      openRows: {},
      query: "",
      customMultiSort: null,
      customPageSort: null,
      uuid: "qt-" + ++er + "-" + Date.now(),
      loaderHeight: 0,
      lastSearchQueryUpdated: null,
      storedState: {},
      activeRow: null
    };
  },
  computed: {
    visibleRows() {
      if (!this.configFinal.ajaxUrl && this.currentRowsPerPage !== "All") {
        let t = new Array(this.rowsFinal.length).fill(!1), e = {};
        for (let r in this.sortedIndexes)
          Object.prototype.hasOwnProperty.call(this.sortedIndexes, r) && this.filteredRows[this.sortedIndexes[r]] && (e[r] = this.sortedIndexes[r]);
        let n = this.currentPage * this.currentRowsPerPage, s = n - this.currentRowsPerPage, i = 0;
        for (let r in e)
          Object.prototype.hasOwnProperty.call(e, r) && (r = parseInt(r), i < n && i >= s && (t[e[r]] = !0), i++);
        return t;
      } else
        return this.filteredRows;
    },
    visibleRowIndexes() {
      let t = [];
      if (this.configFinal.ajaxUrl && !this.pageSort)
        for (let e = 0; e < this.rowsFinal.length; e++)
          t.push(e);
      else
        for (let e in this.sortedIndexes)
          Object.prototype.hasOwnProperty.call(this.sortedIndexes, e) && this.visibleRows[this.sortedIndexes[e]] && t.push(this.sortedIndexes[e]);
      return t;
    },
    // Pre-compute per-column whether it matches any hidden breakpoint
    _hiddenBreakpointSet() {
      return Object.freeze(new Set(this.hiddenBreakpoints));
    },
    _colBreakpointMatch() {
      const t = this._hiddenBreakpointSet;
      return Object.freeze(
        this.configFinal.columns.map((e) => {
          if (!e || !e.breakpoint)
            return !1;
          const n = e.breakpoint.toLocaleLowerCase();
          return n === "all" || t.has(n);
        })
      );
    },
    // Cache isColEmpty(j) results so it's computed once per column, not N times
    _colEmptyCache() {
      const t = {};
      for (let e = 0; e < this.configFinal.number; e++)
        t[e] = this.isColEmpty(e);
      return Object.freeze(t);
    },
    // Pre-compute per-column hide status (shared by generatedRows, stickyRows, hiddenColumns)
    _colHideCache() {
      const t = {};
      for (let e = 0; e < this.configFinal.columns.length; e++)
        t[e] = this.configFinal.hiddenCols[e] || !this.configFinal.ignoreEmpty[e] && this.configFinal.hideEmptyColumns && this._colEmptyCache[e] || this.emptyColumns[e];
      return Object.freeze(t);
    },
    // Pre-compute per-column base visibility for TableRow template
    cellVisible() {
      return Object.freeze(
        this.configFinal.columns.map((t, e) => !(this.configFinal.hiddenCols[e] || this.emptyColumns[e] || !t || this._colBreakpointMatch[e] || this.configFinal.stickyCols[e]))
      );
    },
    generatedRows() {
      let t = {};
      if (this.generatedUpdatedKey) {
        const e = this._colBreakpointMatch, n = this._colHideCache, s = this.configFinal.hideEmptyColumns, i = this.visibleRowIndexes;
        for (let r = 0; r < i.length; r++) {
          const o = i[r];
          let a = this.rowsFinal[o].cells ? this.rowsFinal[o].cells : this.rowsFinal[o], c = {};
          for (let l = 0; l < this.configFinal.columns.length; l++) {
            if (!e[l])
              continue;
            let u = this.configFinal.columns[l];
            !(n[l] || s && !this.configFinal.ignoreEmpty[l] && this.isColEmpty(l, o)) && !u.sticky && !u.alwaysExpanded && (c[l] = a[l]);
          }
          t[o] = c;
        }
      }
      return t;
    },
    stickyRows() {
      let t = {};
      const e = this._colBreakpointMatch, n = this._colHideCache, s = this.configFinal.hideEmptyColumns, i = this.visibleRowIndexes;
      for (let r = 0; r < i.length; r++) {
        const o = i[r];
        let a = this.rowsFinal[o].cells ? this.rowsFinal[o].cells : this.rowsFinal[o], c = {};
        for (let l = 0; l < this.configFinal.columns.length; l++) {
          let u = this.configFinal.columns[l];
          const d = n[l] || s && !this.configFinal.ignoreEmpty[l] && this.isColEmpty(l, o);
          (!d && u.sticky || !d && u.alwaysExpanded && e[l]) && (c[l] = a[l]);
        }
        t[o] = c;
      }
      return t;
    },
    pageSort: {
      get() {
        return this.customPageSort === null ? this.configFinal.pageSort : this.customPageSort;
      },
      set(t) {
        this.customPageSort = t;
      }
    },
    multiSort: {
      get() {
        return this.customMultiSort === null ? this.configFinal.multiSort : this.customMultiSort;
      },
      set(t) {
        this.customMultiSort = t;
      }
    },
    hasGeneratedRows() {
      const t = this._colBreakpointMatch, e = this._colHideCache;
      for (let n = 0; n < this.configFinal.columns.length; n++)
        if (t[n] && !e[n]) {
          const s = this.configFinal.columns[n];
          if (!s.sticky && !s.alwaysExpanded)
            return !0;
        }
      return !1;
    },
    cellClassesParsed() {
      let t = {};
      const e = this.visibleRowIndexes.length > 0 ? this.visibleRowIndexes : Object.keys(this.rowsFinal).map(Number);
      for (let n = 0; n < e.length; n++) {
        const s = e[n];
        if (!this.rowsFinal[s])
          continue;
        t[s] = [];
        let i = this.rowsFinal[s].align, r = this.rowsFinal[s].cells ? this.rowsFinal[s].cells : this.rowsFinal[s];
        for (let o = 0; o < r.length; o++) {
          let a = [], c = this.configFinal.alignments[o];
          if ((r[o].align || i || c) && (r[o].align ? a.push("text-" + r[o].align) : i ? a.push("text-" + i) : a.push("text-" + c)), r[o].classes) {
            let l = r[o].classes.split(" ");
            Array.prototype.push.apply(a, l);
          }
          t[s].push(a.join(" "));
        }
      }
      return t;
    },
    hiddenColumns() {
      const t = this._colBreakpointMatch, e = this._colHideCache;
      let n = !1;
      for (let i = 0; i < this.configFinal.columns.length; i++)
        if (t[i] && !e[i]) {
          if (this.configFinal.hideEmptyColumns && !this.configFinal.ignoreEmpty[i])
            continue;
          n = !0;
          break;
        }
      const s = {};
      if (n)
        for (let i = 0; i < this.visibleRowIndexes.length; i++)
          s[this.visibleRowIndexes[i]] = 1;
      else if (this.configFinal.hideEmptyColumns)
        for (let i = 0; i < this.visibleRowIndexes.length; i++) {
          let r = 0;
          const o = this.visibleRowIndexes[i];
          for (let a = 0; a < this.configFinal.columns.length; a++) {
            if (!t[a])
              continue;
            if (!(e[a] || !this.configFinal.ignoreEmpty[a] && this.isColEmpty(a, o))) {
              r++;
              break;
            }
          }
          s[o] = r;
        }
      else
        for (let i = 0; i < this.visibleRowIndexes.length; i++)
          s[this.visibleRowIndexes[i]] = 0;
      return s;
    },
    rowsFinal() {
      return this.configFinal.ajaxUrl ? this.ajaxRows : this.rows ? this.rows : [];
    },
    headerClass() {
      let t = [];
      for (let e = 0; e < this.configFinal.number; e++) {
        let n = [];
        this.configFinal.alignments[e] && n.push("text-" + this.configFinal.alignments[e]), this.configFinal.sorts[e] && (n.push("sort-header"), this.currentSortIndexes[e] && n.push("active")), t.push(
          n.join(" ") + "  quintable--table-container--table--header-row--th " + this.configFinal.columnClasses[e]
        );
      }
      return Object.freeze(t);
    },
    showHeadlines() {
      const t = this._hiddenBreakpointSet;
      let e = [];
      for (let n = 0; n < this.configFinal.number; n++) {
        const s = this.configFinal.columns[n];
        this.configFinal.headlines[n] && (!s.showHeadlineBreakpoint || s.showHeadlineBreakpoint && t.has(s.showHeadlineBreakpoint)) && (!s.hideHeadlineBreakpoint || s.hideHeadlineBreakpoint && !t.has(s.hideHeadlineBreakpoint)) ? e.push(!0) : e.push(!1);
      }
      return Object.freeze(e);
    },
    emptyColumns() {
      const t = {}, e = this._colEmptyCache, n = this.configFinal.ignoreSortEmptyColumns;
      for (let s = 0; s < this.configFinal.number; s++) {
        const i = this.configFinal.ignoreEmpty[s], r = this.configFinal.sorts[s];
        !this.configFinal.hideEmptyColumns || i || n === "none" && r || n === "active" && Object.prototype.hasOwnProperty.call(this.currentSortIndexes, s) ? t[s] = !1 : t[s] = e[s];
      }
      return t;
    },
    rowClasses() {
      const t = {};
      for (let e = 0; e < this.visibleRowIndexes.length; e++) {
        const n = this.visibleRowIndexes[e], s = [];
        this.rowsFinal[n].classes && s.push(this.rowsFinal[n].classes), this.openRows[n] && s.push("row-expanded"), this.hiddenColumns[n] > 0 && !this.openRows[n] && s.push("row-collapsed"), t[n] = s.join(" ");
      }
      return t;
    },
    _fmtCells() {
      const t = {}, e = this.configFinal.columns;
      for (let n = 0; n < this.visibleRowIndexes.length; n++) {
        const s = this.visibleRowIndexes[n], i = this.rowsFinal[s];
        if (!i)
          continue;
        const r = i.cells ? i.cells : i;
        let o = !1;
        const a = {};
        for (let c = 0; c < r.length; c++)
          e[c] && e[c].cellFormatter && (a[c] = this.cellFormatters(c, r[c]), o = !0);
        o && (t[s] = a);
      }
      return t;
    },
    _renderRows() {
      const t = {}, e = this.configFinal.columnClasses, n = this.cellVisible, s = this.cellClassesParsed, i = this._fmtCells, r = this.uuid;
      for (let o = 0; o < this.visibleRowIndexes.length; o++) {
        const a = this.visibleRowIndexes[o], c = this.rowsFinal[a];
        if (!c)
          continue;
        const l = c.cells ? c.cells : c, u = "vue-quintable-" + r + "-cell-" + a + "-", d = s[a], m = i[a], b = [];
        for (let f = 0; f < l.length; f++) {
          const g = l[f];
          b.push(
            Object.freeze({
              cell: g,
              cls: (d && d[f] || "") + " " + (e[f] || ""),
              vis: !!(n[f] && g),
              fmt: m && m[f] || null,
              key: u + f
            })
          );
        }
        t[a] = Object.freeze(b);
      }
      return t;
    },
    // O(1) lookup map: rowIndex → position in visibleRowIndexes
    _visibleRowIndexMap() {
      const t = {};
      for (let e = 0; e < this.visibleRowIndexes.length; e++)
        t[this.visibleRowIndexes[e]] = e;
      return t;
    }
  },
  watch: {
    rowsFinal: {
      handler(t) {
        if (this.verbose && t && t.length)
          for (let e = 0; e < t.length; e++) {
            let n = t[e].cells ? t[e].cells : t[e];
            n.length !== this.config.columns.length && console.error(
              `Column count on row index ${e} doesn't fit for column config! expected: ${this.config.columns.length}, got: ${n.length}` + (this.configFinal.ajaxUrl ? ` | URL: ${this.configFinal.ajaxUrl}` : "") + (this.identifier ? ` | IDENTIFIER: ${this.identifier}` : ""),
              t[e]
            );
          }
      },
      immediate: !0
    },
    hoveredRow(t) {
      t !== null && this.$emit("hover:row", this.rowsFinal[t], "hover:row");
    },
    query(t, e) {
      if (this.lastQuery = e, this.configFinal.ajaxUrl) {
        this.pageSort = !1;
        const n = !(this.configFinal.storeState && this.storedState.query);
        clearTimeout(this.queryAjaxTimeout), this.queryAjaxTimeout = setTimeout(() => {
          this.loadViaAjax(n, n, "QUERY");
        }, this.configFinal.ajaxRequestDelay);
      }
      t.length >= this.configFinal.searchLength && this.lastSearchQueryUpdated !== t ? (this.$emit("update:search", t, "update:search"), this.lastSearchQueryUpdated = t) : this.lastSearchQueryUpdated !== null && (this.lastSearchQueryUpdated = null, this.$emit("update:search", null, "update:search")), this.pageSort && (this.currentSortIndexes = {}, this.resetSorts(), this.recomputeEssentials()), this.configFinal.storeState && (this.$delete(this.storedState, "query"), localStorage.setItem(
        `vue-quintable-${this.identifier}-query`,
        this.query
      ));
    },
    rows() {
      this.clearLists(), this.initLists(), this.activeRow = null, this.$nextTick(() => {
        this.recomputeEssentials(), this.configFinal.defaultSelected && (this.allSelectedCustom = null, this.checkAll(!0));
      });
    },
    config(t) {
      if (typeof t != "object")
        throw "config must be an object";
      this.dynamicConfig || (this.initLists(), this.activeRow = null, this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "CONFIG"), this.configFinal.defaultSelected && this.checkAll(!0));
    },
    activeRow(t, e) {
      const n = this.configFinal.activeClass;
      if (n) {
        if (e !== null) {
          const i = this.$refs["row-highlighted-" + e], r = i && (Array.isArray(i) ? i[0] : i);
          r && r.classList.remove(n);
        }
        if (t !== null) {
          const i = this.$refs["row-highlighted-" + t], r = i && (Array.isArray(i) ? i[0] : i);
          r && r.classList.add(n);
        }
      }
      const s = t !== null && this._visibleRowIndexMap[t] !== void 0 ? this._visibleRowIndexMap[t] : -1;
      this.$emit("active:row", this.rowsFinal[t], "active:row", s);
    }
  },
  methods: {
    setSearchQuery(t) {
      this.query = t;
    },
    valueToString: function(t) {
      switch (t) {
        case "":
        case null:
        case !1:
        case void 0:
          return "";
        case 0:
        case "0":
        default:
          return String(t);
      }
    },
    isColEmpty(t, e = -1) {
      const n = e > -1 ? [e] : this.visibleRowIndexes;
      for (let s = 0; s < n.length; s++) {
        const i = this.rowsFinal[n[s]];
        if (!i)
          continue;
        const o = (i.cells ? i.cells : i)[t];
        if (o) {
          if (typeof o.isEmpty == "boolean") {
            if (!o.isEmpty)
              return !1;
            continue;
          }
          if (typeof o.text != "undefined" && this.valueToString(o.text) || typeof o.html != "undefined" && this.valueToString(o.html))
            return !1;
        }
      }
      return !0;
    },
    cellFormatters(t, e) {
      if (typeof this.configFinal.columns[t].cellFormatter == "function") {
        let n = this.configFinal.columns[t].cellFormatter(e);
        return typeof n != "object" && (n = {
          value: n
        }), n;
      }
      return this.valueToString(e.html) ? e.html : this.valueToString(e.text) ? e.text : "";
    },
    _rowCells(t) {
      const e = this.rowsFinal[t];
      return e ? e.cells ? e.cells : e : [];
    },
    _hoverRow(t, e) {
      if (this.hoveredRow !== t) {
        const n = this.configFinal.hoverClass;
        n && this._lastHoveredEl && this._lastHoveredEl.classList.remove(n), this.hoveredRow = t, n && e && e.currentTarget && (e.currentTarget.classList.add(n), this._lastHoveredEl = e.currentTarget);
      }
    },
    recomputeEssentials() {
      this.$nextTick(() => {
        const t = Date.now();
        this.essentialsKey = t, this.generatedUpdatedKey = t;
      });
    },
    initLists() {
      if (this.rowsFinal)
        for (let t = 0; t < this.rowsFinal.length; t++) {
          const e = t.toString();
          typeof this.sortedIndexes[e] == "undefined" && this.$set(this.sortedIndexes, e, t), typeof this.selected[e] == "undefined" && this.$set(this.selected, e, !1), this.configFinal.expandedAll || this.rowsFinal[t].expanded ? this.$set(this.openRows, e, !0) : this.$set(this.openRows, e, !1);
        }
    },
    clearLists(t = !0) {
      t && (this.selected = {}), this.openRows = {}, this.sortedIndexes = {};
    },
    checkKey(t) {
      if (this.activeRow !== null) {
        if (t.keyCode === 40) {
          t.preventDefault();
          const e = this._visibleRowIndexMap[this.activeRow];
          e === void 0 || e === this.visibleRowIndexes.length - 1 ? this.activeRow = 0 : this.activeRow = this.visibleRowIndexes[e + 1];
        }
        if (t.keyCode === 38) {
          t.preventDefault();
          const e = this._visibleRowIndexMap[this.activeRow];
          e === void 0 || e === 0 ? this.activeRow = this.visibleRowIndexes[this.visibleRowIndexes.length - 1] : this.activeRow = this.visibleRowIndexes[e - 1];
        }
      }
    }
  },
  created() {
    if (this._lastHoveredEl = null, this.configFinal.storeState) {
      const n = localStorage.getItem(
        `vue-quintable-${this.identifier}-filters`
      );
      if (n) {
        const c = JSON.parse(n);
        for (let l in this.filters)
          Object.prototype.hasOwnProperty.call(this.filters, l) && !Object.prototype.hasOwnProperty.call(c, l) && (c[l] = this.filters[l]);
        this.$set(this.storedState, "filters", c);
      }
      const s = localStorage.getItem(
        `vue-quintable-${this.identifier}-query`
      );
      s && this.$set(this.storedState, "query", s);
      const i = localStorage.getItem(
        `vue-quintable-${this.identifier}-rows-per-page`
      );
      i && this.$set(this.storedState, "rows-per-page", parseInt(i));
      const r = localStorage.getItem(
        `vue-quintable-${this.identifier}-selected-rows`
      );
      r && this.$set(this.storedState, "selected-rows", JSON.parse(r));
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
    let t = 0;
    const e = this.configFinal.selectAllRows ? this.rowsFinal.map((n, s) => s) : this.visibleRowIndexes;
    for (let n = 0; n < e.length; n++) {
      let s = this.rowsFinal[n];
      s.selected && this.$set(this.selected, n, !0), s.selected && t++;
    }
    if (!this.configFinal.selectAllRows && t) {
      let n = 0;
      for (let s = 0; s < this.rowsFinal.length; s++)
        !this.rowsFinal[s].disableSelect && this.visibleRows[this.sortedIndexes[s]] && n++;
      t === n && (this.allSelectedCustom = !0);
    } else if (this.configFinal.selectAllRows && t) {
      let n = 0;
      for (let s = 0; s < this.rowsFinal.length; s++)
        this.rowsFinal[s].disableSelect || n++;
      t === n && (this.allSelectedCustom = !0);
    }
    this.initialSearchTerm && (this.query = this.initialSearchTerm), this.storedState.query && (this.query = this.storedState.query), this.storedState["rows-per-page"] && (this.customRowsPerPage = this.storedState["rows-per-page"]), this.storedState["sort-indexes"] && (this.currentSortIndexes = this.storedState["sort-indexes"], this.sort(!0)), this.storedState["current-page"] && this.$nextTick(() => {
      this.currentPage = this.storedState["current-page"];
    }), this.$nextTick(this.checkStoredSelectedRows), this.configFinal.enableRowTabIndex && document.addEventListener("keydown", this.checkKey);
  },
  mounted() {
    this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "MOUNTED"), this.configFinal.defaultSelected && this.checkAll(!0), this._sharedBP = Pt(), this._sharedBP.subscribe(this._onBreakpointChange);
  },
  beforeDestroy() {
    this._sharedBP && this._sharedBP.unsubscribe(this._onBreakpointChange), this.configFinal.enableRowTabIndex && document.removeEventListener("keydown", this.checkKey);
  }
};
var nr = function() {
  var e = this, n = e._self._c;
  return n("div", { staticClass: "table-wrapper quintable" }, [n("div", { staticClass: "header slot slot-header quintable--header" }, [e._t("header")], 2), n("search-bar", { scopedSlots: e._u([e.$scopedSlots["before-search"] ? { key: "before-search", fn: function() {
    return [e._t("before-search")];
  }, proxy: !0 } : null, e.$scopedSlots.search ? { key: "search", fn: function(s) {
    return [e._t("search", null, null, s)];
  } } : null, e.$scopedSlots["after-search"] ? { key: "after-search", fn: function() {
    return [e._t("after-search")];
  }, proxy: !0 } : null], null, !0) }), n("div", { staticClass: "slot slot-after-search quintable--after-search-container" }, [e._t("after-search-container")], 2), n("div", { ref: "height-wrapper", staticClass: "clearfix quintable--table-container" }, [e.ajaxLoading ? e._e() : n("table", { staticClass: "vue-quintable table quintable--table-container--table", class: e.tableClasses }, [n("table-header"), n("tbody", { staticClass: "quintable--table-container--table--tbody", on: { mouseleave: e.onMouseleaveTable } }, [e._l(e.visibleRowIndexes, function(s) {
    return [e.rowsFinal[s] ? n("tr", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
      placement: "top",
      content: e.rowsFinal[s].tooltip,
      trigger: e.rowsFinal[s].tooltip ? "hover" : "manual",
      offset: 5
    }, expression: `{
              placement: 'top',
              content: rowsFinal[rIndex].tooltip,
              trigger: rowsFinal[rIndex].tooltip ? 'hover' : 'manual',
              offset: 5,
            }` }], key: "vue-quintable-" + e.uuid + "-row-" + s, ref: "row-highlighted-" + s, refInFor: !0, staticClass: "vue-quintable-row quintable--table-container--table--tbody--row", class: e.rowClasses[s], style: e.hiddenColumns[s] > 0 ? "cursor:pointer;" : "", attrs: { id: "vue-quintable-" + e.uuid + "-row-" + s }, on: { click: function(i) {
      return e.onRowClick(i, s);
    }, auxclick: function(i) {
      return e.onRowAuxClick(i, s);
    }, mousedown: function(i) {
      return e.onRowMousedown(i);
    }, mouseenter: function(i) {
      return e._hoverRow(s, i);
    } } }, [e.hasGeneratedRows && !e.configFinal.hideRowToggle ? n("td", { staticClass: "toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td" }, [e.hiddenColumns[s] > 0 ? n("span", [e.openRows[s] ? n("span", [n("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.configFinal.expandedRowIcon } })], 1) : n("span", [n("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.configFinal.collapsedRowIcon } })], 1)]) : e._e()]) : e._e(), e.configFinal.select && e.configFinal.selectPosition === "pre" ? n("td", { staticClass: "select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre", class: {
      "disabled-select": e.rowsFinal[s].disableSelect
    } }, [!e.rowsFinal[s].disableSelect || e.rowsFinal[s].showDisabledSelect ? n("select-checkbox", { attrs: { value: e.selected[s], pretty: e.configFinal.prettySelect, disabled: e.rowsFinal[s].disableSelect }, on: { input: function(i) {
      return e.$set(e.selected, s, i);
    }, change: function(i) {
      return e.checkListener(i, s);
    } } }) : e._e()], 1) : e._e(), e._l(e._renderRows[s], function(i) {
      return [i.vis ? n("td", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
        placement: "left",
        content: i.cell.tooltip,
        trigger: i.cell.tooltip ? "hover" : "manual"
      }, expression: `{
                  placement: 'left',
                  content: rc.cell.tooltip,
                  trigger: rc.cell.tooltip ? 'hover' : 'manual',
                }` }], key: i.key, staticClass: "vue-quintable-cell quintable--table-container--table--tbody--row--cell", class: i.cls, attrs: { id: i.key }, on: { click: function(r) {
        return e.onCellClick(r, i.cell);
      }, auxclick: function(r) {
        return e.onCellAuxClick(r, i.cell);
      }, mousedown: function(r) {
        return e.onCellMousedown(r);
      } } }, [e._t("cell-complete", function() {
        return [e._t("cell-content", function() {
          return [i.fmt && i.fmt.type === "html" ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html", domProps: { innerHTML: e._s(i.fmt.value) } }) : i.fmt ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value" }, [e._v(" " + e._s(i.fmt.value) + " ")]) : i.cell.html != null && String(i.cell.html) !== "" ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--html", domProps: { innerHTML: e._s(i.cell.html) } }) : i.cell.component ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--component" }, [n(i.cell.component.name, e._b({ tag: "component", on: { action: e.handleComponentEvent } }, "component", i.cell.component.props, !1))], 1) : i.cell.text != null && String(i.cell.text) !== "" ? n("div", { staticClass: "cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--text" }, [e._v(" " + e._s(i.cell.text) + " ")]) : e._e()];
        }, { cell: i.cell })];
      }, { cell: i.cell })], 2) : e._e()];
    }), e.configFinal.select && e.configFinal.selectPosition === "post" ? n("td", { staticClass: "select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post", class: {
      "disabled-select": e.rowsFinal[s].disableSelect
    } }, [!e.rowsFinal[s].disableSelect || e.rowsFinal[s].showDisabledSelect ? n("select-checkbox", { attrs: { value: e.selected[s], pretty: e.configFinal.prettySelect, disabled: e.rowsFinal[s].disableSelect }, on: { input: function(i) {
      return e.$set(e.selected, s, i);
    }, change: function(i) {
      return e.checkListener(i, s);
    } } }) : e._e()], 1) : e._e()], 2) : e._e(), (e.generatedRows[s] || e.stickyRows[s]) && e.visibleRows[s] ? n("expanded-row", { key: "vue-quintable-" + e.uuid + "-expanded-" + s, attrs: { "r-index": s }, scopedSlots: e._u([e.$scopedSlots["generated-cell-complete"] ? { key: "generated-cell-complete", fn: function({ cell: i }) {
      return [e._t("generated-cell-complete", null, { cell: i })];
    } } : null, e.$scopedSlots["generated-cell-content"] ? { key: "generated-cell-content", fn: function({ cell: i }) {
      return [e._t("generated-cell-content", null, { cell: i })];
    } } : null, e.$scopedSlots["sticky-cell-complete"] ? { key: "sticky-cell-complete", fn: function({ cell: i }) {
      return [e._t("sticky-cell-complete", null, { cell: i })];
    } } : null, e.$scopedSlots["sticky-cell-content"] ? { key: "sticky-cell-content", fn: function({ cell: i }) {
      return [e._t("sticky-cell-content", null, { cell: i })];
    } } : null], null, !0) }) : e._e()];
  })], 2)], 1), e.noRows && !e.ajaxLoading ? [n("div", { staticClass: "clearfix slot-no-results slot quintable--table-container--no-results" }, [e._t("no-results", function() {
    return [n("div", { staticClass: "text-center p-3 quintable--table-container--no-results--results" }, [n("em", { domProps: { innerHTML: e._s(e.configFinal.emptyPlaceholder) } })])];
  }), n("hr")], 2)] : e._e()], 2), e.ajaxLoading ? n("div", { staticClass: "slot-loading slot quintable--loading" }, [e._t("loading", function() {
    return [n("div", { staticClass: "loader-wrapper quintable--loading--loader-wrapper", style: "height:" + e.loaderHeight + "px;" }, [n("div", { staticClass: "loader text-center py-4 quintable--loading--loader-wrapper--loader" }, [n("font-awesome-icon", { staticClass: "ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader", attrs: { icon: "circle-notch", spin: "" } })], 1)])];
  })], 2) : e._e(), n("pagination-footer"), n("div", { staticClass: "footer slot slot-footer quintable--footer" }, [e._t("footer")], 2)], 1);
}, sr = [], ir = /* @__PURE__ */ Q(
  tr,
  nr,
  sr,
  !1,
  null,
  "13ce32ca",
  null,
  null
);
const Xt = ir.exports;
C.add(an);
C.add(ln);
C.add(cn);
C.add(un);
C.add(hn);
C.add(fn);
C.add(dn);
C.add(pn);
C.add(gn);
C.add(mn);
C.add(bn);
C.add(wn);
C.add(yn);
C.add(Sn);
C.add(Rn);
C.add(_n);
C.add(xn);
C.add(Cn);
C.add(Fn);
let Fe = function(t, e) {
  Fe.installed || (Fe.installed = !0, t.component("v-select", sn), t.component("p-check", kn), t.component("font-awesome-icon", rn), t.component("VueQuintable", Xt), t.use(on, {
    defaultTemplate: '<div class="quintable-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    defaultClass: ""
  }), e && e.axios && (t.prototype.$globalVueQuintableaxios = e.axios));
};
const rr = {
  install: Fe
};
let ve = null;
typeof window != "undefined" ? ve = window.Vue : typeof global != "undefined" && (ve = global.Vue);
ve && ve.use(rr);
const dr = {
  VueQuintable: Xt,
  install: Fe
};
export {
  dr as default
};
//# sourceMappingURL=vue-quintable.es.js.map
