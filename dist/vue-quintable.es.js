import fe from "vue-select";
import { library as _ } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as de } from "@fortawesome/vue-fontawesome";
import pe from "v-tooltip";
import { faAngleDoubleLeft as ge, faAngleDoubleRight as me, faAngleLeft as be, faAngleRight as we, faCaretDown as ye, faCaretUp as _e, faCheck as ve, faChevronDown as Se, faChevronUp as xe, faCircleNotch as Ce, faEye as Fe, faEyeSlash as qe, faMinus as Re, faPlus as ke, faSort as Pe, faSortAmountDown as Oe, faSortAmountDownAlt as $e, faSquare as je, faTimes as Ie } from "@fortawesome/free-solid-svg-icons";
import Ae from "axios";
import oe from "fuzzy.js";
var Ee = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function Ve(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var L = {}, Te = {
  get exports() {
    return L;
  },
  set exports(i) {
    L = i;
  }
};
/*!
 * pretty-checkbox-vue v1.1.9
 * (c) 2017-2018 Hamed Ehtesham
 * Released under the MIT License.
 */
(function(i, e) {
  (function(t, n) {
    i.exports = n();
  })(typeof self != "undefined" ? self : Ee, function() {
    return function(t) {
      var n = {};
      function s(l) {
        if (n[l])
          return n[l].exports;
        var o = n[l] = { i: l, l: !1, exports: {} };
        return t[l].call(o.exports, o, o.exports, s), o.l = !0, o.exports;
      }
      return s.m = t, s.c = n, s.d = function(l, o, a) {
        s.o(l, o) || Object.defineProperty(l, o, { configurable: !1, enumerable: !0, get: a });
      }, s.n = function(l) {
        var o = l && l.__esModule ? function() {
          return l.default;
        } : function() {
          return l;
        };
        return s.d(o, "a", o), o;
      }, s.o = function(l, o) {
        return Object.prototype.hasOwnProperty.call(l, o);
      }, s.p = "", s(s.s = 1);
    }([function(t, n) {
      t.exports = function(s, l, o, a, r, c) {
        var h, u = s = s || {}, d = typeof s.default;
        d !== "object" && d !== "function" || (h = s, u = s.default);
        var g, p = typeof u == "function" ? u.options : u;
        if (l && (p.render = l.render, p.staticRenderFns = l.staticRenderFns, p._compiled = !0), o && (p.functional = !0), r && (p._scopeId = r), c ? (g = function(y) {
          (y = y || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || typeof __VUE_SSR_CONTEXT__ == "undefined" || (y = __VUE_SSR_CONTEXT__), a && a.call(this, y), y && y._registeredComponents && y._registeredComponents.add(c);
        }, p._ssrRegister = g) : a && (g = a), g) {
          var m = p.functional, v = m ? p.render : p.beforeCreate;
          m ? (p._injectStyles = g, p.render = function(y, b) {
            return g.call(b), v(y, b);
          }) : p.beforeCreate = v ? [].concat(v, g) : [g];
        }
        return { esModule: h, exports: u, options: p };
      };
    }, function(t, n, s) {
      var l = s(0)(s(2), null, !1, null, null, null);
      l.options.__file = "src/PrettyCheckbox.vue", t.exports = l.exports;
    }, function(t, n, s) {
      Object.defineProperty(n, "__esModule", { value: !0 });
      var l = s(3), o = { name: "pretty-checkbox", input_type: "checkbox", model: l.model, props: l.props, data: l.data, computed: l.computed, watch: l.watch, mounted: l.mounted, methods: l.methods, render: l.render };
      n.default = o;
    }, function(t, n, s) {
      var l = s(0)(s(4), s(5), !1, null, null, null);
      l.options.__file = "src/PrettyInput.vue", t.exports = l.exports;
    }, function(t, n, s) {
      Object.defineProperty(n, "__esModule", { value: !0 }), n.default = { name: "pretty-input", model: { prop: "modelValue", event: "change" }, props: { type: String, name: String, value: {}, modelValue: {}, trueValue: {}, falseValue: {}, checked: {}, disabled: {}, required: {}, indeterminate: {}, color: String, offColor: String, hoverColor: String, indeterminateColor: String, toggle: {}, hover: {}, focus: {} }, data: function() {
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
        var l = { state: !0, "p-on": this._toggle };
        return this.color && (l["p-" + this.color] = !0), l;
      }, offClasses: function() {
        var l = { state: !0, "p-off": !0 };
        return this.offColor && (l["p-" + this.offColor] = !0), l;
      }, hoverClasses: function() {
        var l = { state: !0, "p-is-hover": !0 };
        return this.hoverColor && (l["p-" + this.hoverColor] = !0), l;
      }, indeterminateClasses: function() {
        var l = { state: !0, "p-is-indeterminate": !0 };
        return this.indeterminateColor && (l["p-" + this.indeterminateColor] = !0), l;
      } }, watch: { checked: function(l) {
        this.m_checked = l;
      }, indeterminate: function(l) {
        this.$refs.input.indeterminate = l;
      } }, mounted: function() {
        this.$vnode.data && !this.$vnode.data.staticClass && (this.default_mode = !0), this._indeterminate && (this.$refs.input.indeterminate = !0), this.$el.setAttribute("p-" + this._type, "");
      }, methods: { updateInput: function(l) {
        if (this._type !== "radio") {
          this.$emit("update:indeterminate", !1);
          var o = l.target.checked;
          if (this.m_checked = o, this.modelValue instanceof Array) {
            var a = [].concat(function(r) {
              if (Array.isArray(r)) {
                for (var c = 0, h = Array(r.length); c < r.length; c++)
                  h[c] = r[c];
                return h;
              }
              return Array.from(r);
            }(this.modelValue));
            o ? a.push(this.value) : a.splice(a.indexOf(this.value), 1), this.$emit("change", a);
          } else
            this.$emit("change", o ? !this._trueValue || this.trueValue : !!this._falseValue && this.falseValue);
        } else
          this.$emit("change", this.value);
      } } };
    }, function(t, n, s) {
      var l = function() {
        var o = this.$createElement, a = this._self._c || o;
        return a("div", { class: this.classes }, [a("input", { ref: "input", attrs: { type: this._type, name: this.name, disabled: this._disabled, required: this._required }, domProps: { checked: this.shouldBeChecked, value: this.value }, on: { change: this.updateInput } }), this._v(" "), a("div", { class: this.onClasses }, [this._t("extra"), this._v(" "), a("label", [this._t("default")], 2)], 2), this._v(" "), this._toggle ? a("div", { class: this.offClasses }, [this._t("off-extra"), this._v(" "), this._t("off-label")], 2) : this._e(), this._v(" "), this._hover ? a("div", { class: this.hoverClasses }, [this._t("hover-extra"), this._v(" "), this._t("hover-label")], 2) : this._e(), this._v(" "), this._indeterminate ? a("div", { class: this.indeterminateClasses }, [this._t("indeterminate-extra"), this._v(" "), this._t("indeterminate-label")], 2) : this._e()]);
      };
      l._withStripped = !0, t.exports = { render: l, staticRenderFns: [] };
    }]);
  });
})(Te);
const Le = /* @__PURE__ */ Ve(L);
const k = {
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1400px)"
}, ae = typeof window != "undefined" && typeof window.matchMedia == "function";
let P = null;
class Me {
  constructor() {
    if (this._subscribers = /* @__PURE__ */ new Set(), this._mqls = {}, this.hiddenBreakpoints = [], this._onChange = this._onChange.bind(this), this._compute(), ae)
      for (const e in k) {
        const t = window.matchMedia(k[e]);
        this._mqls[e] = t, t.addEventListener ? t.addEventListener("change", this._onChange) : t.addListener(this._onChange);
      }
  }
  _onChange() {
    this._compute();
  }
  _compute() {
    const e = [];
    if (ae)
      for (const t in k)
        window.matchMedia(k[t]).matches || e.push(t);
    e.push("all"), this.hiddenBreakpoints = e, this._subscribers.forEach((t) => t(e));
  }
  subscribe(e) {
    this._subscribers.add(e), e(this.hiddenBreakpoints);
  }
  unsubscribe(e) {
    this._subscribers.delete(e), this._subscribers.size === 0 && (this._destroy(), P = null);
  }
  _destroy() {
    for (const e in this._mqls) {
      const t = this._mqls[e];
      t.removeEventListener ? t.removeEventListener("change", this._onChange) : t.removeListener(this._onChange);
    }
    this._mqls = {}, this._subscribers.clear();
  }
}
function re() {
  return P || (P = new Me()), P;
}
function S(i, e, t, n, s, l, o, a) {
  var r = typeof i == "function" ? i.options : i;
  e && (r.render = e, r.staticRenderFns = t, r._compiled = !0), n && (r.functional = !0), l && (r._scopeId = "data-v-" + l);
  var c;
  if (o ? (c = function(d) {
    d = d || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ != "undefined" && (d = __VUE_SSR_CONTEXT__), s && s.call(this, d), d && d._registeredComponents && d._registeredComponents.add(o);
  }, r._ssrRegister = c) : s && (c = a ? function() {
    s.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), c)
    if (r.functional) {
      r._injectStyles = c;
      var h = r.render;
      r.render = function(g, p) {
        return c.call(p), h(g, p);
      };
    } else {
      var u = r.beforeCreate;
      r.beforeCreate = u ? [].concat(u, c) : [c];
    }
  return {
    exports: i,
    options: r
  };
}
const Be = {
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
      set(i) {
        this.$emit("input", i);
      }
    }
  }
};
var Ue = function() {
  var e = this, t = e._self._c;
  return t("span", { staticStyle: { display: "contents" } }, [e.pretty ? t("p-check", { staticClass: "p-icon", class: e.smooth ? "p-smooth" : "", attrs: { name: "check", disabled: e.disabled }, on: { change: function(n) {
    return e.$emit("change", n);
  } }, model: { value: e.proxyValue, callback: function(n) {
    e.proxyValue = n;
  }, expression: "proxyValue" } }, [t("template", { slot: "extra" }, [t("span", [e.proxyValue ? t("font-awesome-icon", { staticClass: "text-success icon-check", attrs: { icon: "check" } }) : e._e()], 1), e.showPartial ? t("span", [e.partial && !e.proxyValue ? t("font-awesome-icon", { staticClass: "text-success icon-check", attrs: { icon: "square" } }) : e._e()], 1) : e._e()])], 2) : t("label", { staticClass: "mb-0 mt-0" }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: e.proxyValue, expression: "proxyValue" }], attrs: { type: "checkbox", disabled: e.disabled }, domProps: { checked: Array.isArray(e.proxyValue) ? e._i(e.proxyValue, null) > -1 : e.proxyValue }, on: { change: [function(n) {
    var s = e.proxyValue, l = n.target, o = !!l.checked;
    if (Array.isArray(s)) {
      var a = null, r = e._i(s, a);
      l.checked ? r < 0 && (e.proxyValue = s.concat([a])) : r > -1 && (e.proxyValue = s.slice(0, r).concat(s.slice(r + 1)));
    } else
      e.proxyValue = o;
  }, function(n) {
    return e.$emit("change", n);
  }] } })])], 1);
}, De = [], Ge = /* @__PURE__ */ S(
  Be,
  Ue,
  De,
  !1,
  null,
  null,
  null,
  null
);
const ce = Ge.exports, He = {
  name: "TableHeader",
  inject: ["quintable"],
  components: { SelectCheckbox: ce },
  methods: {
    isColumnVisible(i) {
      return this.quintable.cellVisible[i];
    }
  }
};
var Ne = function() {
  var e = this, t = e._self._c;
  return e.quintable.configFinal.headlines.length ? t("thead", [t("tr", { staticClass: "vue-quintable-header-row quintable--table-container--table--header-row" }, [e.quintable.hasGeneratedRows && !e.quintable.configFinal.hideRowToggle ? t("th", { staticClass: "placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th" }, [t("wbr")]) : e._e(), e.quintable.configFinal.select && e.quintable.configFinal.selectPosition === "pre" ? t("th", { staticClass: "select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre" }, [e.quintable.configFinal.selectAll && !e.quintable.noRows ? t("select-checkbox", { attrs: { value: e.quintable.allSelectedProperty, pretty: e.quintable.configFinal.prettySelect, smooth: !0, "show-partial": !0, partial: e.quintable.someSelected }, on: { input: function(n) {
    e.quintable.allSelectedProperty = n;
  }, change: function(n) {
    return e.quintable.checkAll();
  } } }) : e._e()], 1) : e._e(), e._l(e.quintable.configFinal.headlines, function(n, s) {
    return [e.isColumnVisible(s) ? t("th", { key: "headline-" + s, class: e.quintable.headerClass[s], attrs: { title: e.quintable.configFinal.columns[s].title }, on: { click: function(l) {
      return l.stopPropagation(), e.quintable.setSortColumn(s);
    } } }, [e.quintable.showHeadlines[s] ? t("span", { staticClass: "headline quintable--table-container--table--header-row--th--headline", domProps: { innerHTML: e._s(n) } }) : t("span", { staticClass: "headline quintable--table-container--table--header-row--th--headline" }, [t("wbr")]), e.quintable.configFinal.sorts[s] ? t("span", { staticClass: "sorting-icon ms-2 quintable--table-container--table--header-row--th--sorting-icon" }, [e.quintable.currentSortIndexes[s] ? e._e() : t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort" } }), e.quintable.currentSortIndexes[s] && e.quintable.currentSortIndexes[s].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down-alt" } }) : e._e(), e.quintable.currentSortIndexes[s] && !e.quintable.currentSortIndexes[s].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down" } }) : e._e(), e.quintable.currentSortIndexes[s] ? t("span", { staticClass: "ms-1 text-muted", on: { click: function(l) {
      return l.stopPropagation(), l.preventDefault(), e.quintable.removeSort(s);
    } } }, [e.quintable.numberOfSorts > 1 ? t("span", { staticClass: "badge bg-info text-white" }, [e._v(" " + e._s(e.quintable.currentSortIndexes[s].order + 1) + " ")]) : t("small", [t("font-awesome-icon", { attrs: { icon: "times" } })], 1)]) : e._e()], 1) : e._e()]) : e._e()];
  }), e.quintable.configFinal.select && e.quintable.configFinal.selectPosition === "post" ? t("th", { staticClass: "select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post" }, [e.quintable.configFinal.selectAll && !e.quintable.noRows ? t("select-checkbox", { attrs: { value: e.quintable.allSelectedProperty, pretty: e.quintable.configFinal.prettySelect, smooth: !0, "show-partial": !0, partial: e.quintable.someSelected }, on: { input: function(n) {
    e.quintable.allSelectedProperty = n;
  }, change: function(n) {
    return e.quintable.checkAll();
  } } }) : e._e()], 1) : e._e()], 2)]) : e._e();
}, ze = [], Qe = /* @__PURE__ */ S(
  He,
  Ne,
  ze,
  !1,
  null,
  null,
  null,
  null
);
const Ke = Qe.exports, Je = {
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
      const i = [];
      return this.quintable.hoveredRow === this.rIndex && i.push(this.quintable.configFinal.hoverClass), this.quintable.activeRow === this.rIndex && i.push(this.quintable.configFinal.activeClass), i;
    },
    formattedGenerated() {
      const i = this.quintable.generatedRows[this.rIndex];
      if (!i)
        return {};
      const e = {}, t = this.quintable.configFinal.columns;
      for (let n in i)
        Object.prototype.hasOwnProperty.call(i, n) && t[n] && t[n].cellFormatter && (e[n] = this.quintable.cellFormatters(n, i[n]));
      return e;
    },
    formattedSticky() {
      const i = this.quintable.stickyRows[this.rIndex];
      if (!i)
        return {};
      const e = {}, t = this.quintable.configFinal.columns;
      for (let n in i)
        Object.prototype.hasOwnProperty.call(i, n) && t[n] && t[n].cellFormatter && (e[n] = this.quintable.cellFormatters(n, i[n]));
      return e;
    }
  },
  methods: {
    _hasKeys(i) {
      if (!i)
        return !1;
      for (let e in i)
        if (Object.prototype.hasOwnProperty.call(i, e))
          return !0;
      return !1;
    }
  }
};
var We = function() {
  var e = this, t = e._self._c;
  return e.shouldRender ? t("tr", { ref: "generated-row-highlighted-" + e.rIndex, staticClass: "generated-row quintable--table-container--table--tbody--generated-row", class: {
    "parent-row-expanded": e.quintable.openRows[e.rIndex],
    "parent-row-collapsed": e.quintable.hiddenColumns[e.rIndex] > 0 && !e.quintable.openRows[e.rIndex]
  }, on: { mouseenter: function(n) {
    return e.quintable.onMouseenterRow(e.rIndex);
  }, click: function(n) {
    return e.quintable.onRowClick(n, e.rIndex);
  } } }, [t("td", { staticClass: "ps-0 pe-0 pt-0", attrs: { colspan: e.quintable.configFinal.number + 1 } }, [t("div", { class: e.innerClasses }, [t("table", { staticClass: "mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table" }, [t("tbody", [e._l(e.quintable.generatedRows[e.rIndex], function(n, s) {
    return [e.quintable.openRows[e.rIndex] ? t("tr", { key: "vue-quintable-" + e.quintable.uuid + "-generated-row-cell-" + e.rIndex + "-" + s, staticClass: "generated-row-cell quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell", attrs: { id: "vue-quintable-" + e.quintable.uuid + "-generated-row-cell-" + e.rIndex + "-" + s } }, [e.showToggleCell ? t("td", { staticClass: "toggle-cell invisible" }, [e.quintable.hiddenColumns[e.rIndex] > 0 ? t("span", [e.quintable.openRows[e.rIndex] ? t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.quintable.configFinal.expandedRowIcon } })], 1) : t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.quintable.configFinal.collapsedRowIcon } })], 1)]) : e._e()]) : e._e(), e.quintable.showHeadlines[s] || e.quintable.configFinal.sorts[s] ? t("td", { staticClass: "generated-cell-element generated-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline", class: e.quintable.configFinal.columnClasses[s], on: { click: function(l) {
      return l.stopPropagation(), e.quintable.setSortColumn(s);
    } } }, [e.quintable.showHeadlines[s] ? t("strong", { domProps: { innerHTML: e._s(e.quintable.configFinal.headlines[s]) } }) : t("span", { staticClass: "headline" }, [t("wbr")]), e.quintable.configFinal.sorts[s] ? t("span", { directives: [{ name: "show", rawName: "v-show", value: e.quintable.hoveredRow === e.rIndex, expression: "quintable.hoveredRow === rIndex" }], staticClass: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon" }, [e.quintable.currentSortIndexes[s] ? e._e() : t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort" } }), e.quintable.currentSortIndexes[s] && e.quintable.currentSortIndexes[s].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down-alt" } }) : e._e(), e.quintable.currentSortIndexes[s] && !e.quintable.currentSortIndexes[s].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down" } }) : e._e(), e.quintable.currentSortIndexes[s] ? t("span", { staticClass: "ms-1 text-muted", on: { click: function(l) {
      return l.stopPropagation(), l.preventDefault(), e.quintable.removeSort(s);
    } } }, [e.quintable.numberOfSorts > 1 ? t("span", { staticClass: "badge bg-info text-white" }, [e._v(" " + e._s(e.quintable.currentSortIndexes[s].order + 1) + " ")]) : t("small", [t("font-awesome-icon", { attrs: { icon: "times" } })], 1)]) : e._e()], 1) : e._e()]) : e._e(), t("td", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
      placement: "top",
      content: n.tooltip,
      trigger: n.tooltip ? "hover" : "manual"
    }, expression: `{
                  placement: 'top',
                  content: cell.tooltip,
                  trigger: cell.tooltip ? 'hover' : 'manual',
                }` }], staticClass: "generated-cell-element generated-cell-element-content generated-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content", class: e.quintable.configFinal.columnClasses[s] + " " + e.quintable.cellClassesParsed[e.rIndex][s], attrs: { colspan: !e.quintable.showHeadlines[s] && !e.quintable.configFinal.sorts[s] ? 2 : 1 }, on: { click: function(l) {
      return e.quintable.onCellClick(l, n);
    } } }, [e._t("generated-cell-complete", function() {
      return [e._t("generated-cell-content", function() {
        return [e.formattedGenerated[s] && e.formattedGenerated[s].type === "html" ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html", domProps: { innerHTML: e._s(e.formattedGenerated[s].value) } }) : e.formattedGenerated[s] ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value" }, [e._v(" " + e._s(e.formattedGenerated[s].value) + " ")]) : n.html != null && String(n.html) !== "" ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html", domProps: { innerHTML: e._s(n.html) } }) : n.component ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component" }, [t(n.component.name, e._b({ tag: "component", on: { action: e.quintable.handleComponentEvent } }, "component", n.component.props, !1))], 1) : n.text != null && String(n.text) !== "" ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text" }, [e._v(" " + e._s(n.text) + " ")]) : e._e()];
      }, { cell: n })];
    }, { cell: n })], 2)]) : e._e()];
  }), e._l(e.quintable.stickyRows[e.rIndex], function(n, s) {
    return t("tr", { key: "vue-quintable-" + e.quintable.uuid + "-sticky-row-cell-" + e.rIndex + "-" + s, staticClass: "sticky-row-cell quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell", attrs: { id: "vue-quintable-" + e.quintable.uuid + "-sticky-row-cell-" + e.rIndex + "-" + s } }, [e.showToggleCell ? t("td", { staticClass: "toggle-cell invisible" }, [e.quintable.hiddenColumns[e.rIndex] > 0 ? t("span", [e.quintable.openRows[e.rIndex] ? t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.quintable.configFinal.expandedRowIcon } })], 1) : t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.quintable.configFinal.collapsedRowIcon } })], 1)]) : e._e()]) : e._e(), e.quintable.showHeadlines[s] || e.quintable.configFinal.sorts[s] ? t("td", { staticClass: "generated-cell-element sticky-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline", class: e.quintable.configFinal.columnClasses[s], on: { click: function(l) {
      return l.stopPropagation(), e.quintable.setSortColumn(s);
    } } }, [e.quintable.showHeadlines[s] ? t("strong", { domProps: { innerHTML: e._s(e.quintable.configFinal.headlines[s]) } }) : t("span", { staticClass: "headline" }, [t("wbr")]), e.quintable.configFinal.sorts[s] ? t("span", { directives: [{ name: "show", rawName: "v-show", value: e.quintable.hoveredRow === e.rIndex, expression: "quintable.hoveredRow === rIndex" }], staticClass: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon" }, [e.quintable.currentSortIndexes[s] ? e._e() : t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort" } }), e.quintable.currentSortIndexes[s] && e.quintable.currentSortIndexes[s].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down-alt" } }) : e._e(), e.quintable.currentSortIndexes[s] && !e.quintable.currentSortIndexes[s].asc ? t("font-awesome-icon", { staticClass: "text-primary", attrs: { icon: "sort-amount-down" } }) : e._e(), e.quintable.currentSortIndexes[s] ? t("span", { staticClass: "ms-1 text-muted", on: { click: function(l) {
      return l.stopPropagation(), l.preventDefault(), e.quintable.removeSort(s);
    } } }, [e.quintable.numberOfSorts > 1 ? t("span", { staticClass: "badge bg-info text-white" }, [e._v(" " + e._s(e.quintable.currentSortIndexes[s].order + 1) + " ")]) : t("small", [t("font-awesome-icon", { attrs: { icon: "times" } })], 1)]) : e._e()], 1) : e._e()]) : e._e(), t("td", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
      placement: "top",
      content: n.tooltip,
      trigger: n.tooltip ? "hover" : "manual"
    }, expression: `{
                placement: 'top',
                content: cell.tooltip,
                trigger: cell.tooltip ? 'hover' : 'manual',
              }` }], staticClass: "generated-cell-element generated-cell-element-content sticky-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content", class: e.quintable.configFinal.columnClasses[s] + " " + e.quintable.cellClassesParsed[e.rIndex][s], attrs: { colspan: !e.quintable.showHeadlines[s] && !e.quintable.configFinal.sorts[s] ? 2 : 1 }, on: { click: function(l) {
      return e.quintable.onCellClick(l, n);
    } } }, [e._t("sticky-cell-complete", function() {
      return [e._t("sticky-cell-content", function() {
        return [e.formattedSticky[s] && e.formattedSticky[s].type === "html" ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html", domProps: { innerHTML: e._s(e.formattedSticky[s].value) } }) : e.formattedSticky[s] ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value" }, [e._v(" " + e._s(e.formattedSticky[s].value) + " ")]) : n.html != null && String(n.html) !== "" ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html", domProps: { innerHTML: e._s(n.html) } }) : n.component ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component" }, [t(n.component.name, e._b({ tag: "component", on: { action: e.quintable.handleComponentEvent } }, "component", n.component.props, !1))], 1) : n.text != null && String(n.text) !== "" ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text" }, [e._v(" " + e._s(n.text) + " ")]) : e._e()];
      }, { cell: n })];
    }, { cell: n })], 2)]);
  })], 2)])])])]) : e._e();
}, Xe = [], Ye = /* @__PURE__ */ S(
  Je,
  We,
  Xe,
  !1,
  null,
  null,
  null,
  null
);
const Ze = Ye.exports, et = {
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
var tt = function() {
  var e = this, t = e._self._c;
  return e.pages > 1 ? t("nav", { staticClass: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav", class: { "me-3": e.hasVisibleRows, disabled: e.disabled } }, [t("ul", { staticClass: "pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination" }, [e.pages > e.pageRange ? t("li", { staticClass: "page-item", class: { disabled: e.currentPage <= 1 }, on: { click: function(n) {
    return e.$emit("goto", "first");
  } } }, [t("span", { staticClass: "page-link" }, [t("font-awesome-icon", { attrs: { icon: "angle-double-left" } })], 1)]) : e._e(), t("li", { staticClass: "page-item", class: { disabled: e.currentPage <= 1 }, on: { click: function(n) {
    return e.$emit("goto", "prev");
  } } }, [t("span", { staticClass: "page-link" }, [t("font-awesome-icon", { attrs: { icon: "angle-left" } })], 1)]), e.pageRange < e.pages && e.visiblePages[0] > 1 ? t("li", { staticClass: "page-item", on: { click: function(n) {
    return e.$emit("offset", -1);
  } } }, [t("span", { staticClass: "page-link" }, [e._v(" ... ")])]) : e._e(), e._l(e.visiblePages, function(n) {
    return t("li", { key: "pagination-item-" + n, staticClass: "page-item", class: { active: n === e.currentPage }, on: { click: function(s) {
      return e.$emit("goto", n);
    } } }, [t("span", { staticClass: "page-link" }, [e._v(" " + e._s(n) + " ")])]);
  }), e.pageRange < e.pages && e.visiblePages[e.visiblePages.length - 1] < e.pages ? t("li", { staticClass: "page-item", on: { click: function(n) {
    return e.$emit("offset", 1);
  } } }, [t("span", { staticClass: "page-link" }, [e._v(" ... ")])]) : e._e(), t("li", { staticClass: "page-item", class: { disabled: e.pages === e.currentPage }, on: { click: function(n) {
    return e.$emit("goto", "next");
  } } }, [t("span", { staticClass: "page-link" }, [t("font-awesome-icon", { attrs: { icon: "angle-right" } })], 1)]), e.pages > e.pageRange ? t("li", { staticClass: "page-item", class: { disabled: e.pages === e.currentPage }, on: { click: function(n) {
    return e.$emit("goto", "last");
  } } }, [t("span", { staticClass: "page-link" }, [t("font-awesome-icon", { attrs: { icon: "angle-double-right" } })], 1)]) : e._e()], 2)]) : e._e();
}, it = [], st = /* @__PURE__ */ S(
  et,
  tt,
  it,
  !1,
  null,
  null,
  null,
  null
);
const nt = st.exports, lt = {
  name: "PaginationFooter",
  inject: ["quintable"],
  components: { PaginationNav: nt }
};
var ot = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "clearfix quintable--table-footer-container" }, [t("div", { staticClass: "row" }, [t("div", { staticClass: "col-lg-4 quintable--table-footer-container--sort-container" }, [e.quintable.configFinal.multiSortSelect || e.quintable.configFinal.pageSortSelect ? t("div", { staticClass: "pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select" }, [e.quintable.configFinal.multiSortSelect ? t("span", { class: e.quintable.configFinal.pageSort ? "me-3" : "" }, [t("p-check", { staticClass: "p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select", attrs: { value: "true" }, model: { value: e.quintable.multiSort, callback: function(n) {
    e.$set(e.quintable, "multiSort", n);
  }, expression: "quintable.multiSort" } }, [e._v(e._s(e.quintable.configFinal.multiSortPlaceholder))])], 1) : e._e(), e.quintable.configFinal.pageSortSelect ? t("p-check", { staticClass: "p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select", attrs: { value: "true" }, model: { value: e.quintable.pageSort, callback: function(n) {
    e.$set(e.quintable, "pageSort", n);
  }, expression: "quintable.pageSort" } }, [e._v(e._s(e.quintable.configFinal.pageSortPlaceholder))]) : e._e()], 1) : e._e()]), t("div", { staticClass: "col-lg-8 quintable--table-footer-container--pagination-wrapper" }, [e.quintable.configFinal && e.quintable.configFinal.pagination ? t("div", { staticClass: "float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container" }, [e.quintable.configFinal.rowsSelect ? t("div", { staticClass: "mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select" }, [t("span", { staticClass: "d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder", domProps: { innerHTML: e._s(e.quintable.configFinal.rowsPlaceholder) } }), t("v-select", { staticClass: "d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select", attrs: { options: e.quintable.paginationOptionsFilled, clearable: !1 }, model: { value: e.quintable.currentRowsPerPageProperty, callback: function(n) {
    e.$set(e.quintable, "currentRowsPerPageProperty", n);
  }, expression: "quintable.currentRowsPerPageProperty" } })], 1) : e._e(), e.quintable.configFinal && e.quintable.configFinal.pagination && e.quintable.pages > 1 ? t("pagination-nav", { attrs: { pages: e.quintable.pages, "current-page": e.quintable.currentPage, "page-range": e.quintable.pageRange, "visible-pages": e.quintable.visiblePages, "has-visible-rows": !!e.quintable.numberOfVisibleRows, disabled: e.quintable.ajaxLoading }, on: { goto: function(n) {
    return e.quintable.gotoPage(n);
  }, offset: function(n) {
    return e.quintable.updatePageOffset(n);
  } } }) : e._e(), e.quintable.numberOfVisibleRows ? t("span", { staticClass: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows" }, [e._v(e._s(e.quintable.firstVisibleRow) + "-" + e._s(e.quintable.lastVisibleRow) + " " + e._s(e.quintable.configFinal.numberOfVisibleRowsFillerWord) + " " + e._s(e.quintable.numberOfVisibleRows))]) : e._e()], 1) : e._e()])])]);
}, at = [], rt = /* @__PURE__ */ S(
  lt,
  ot,
  at,
  !1,
  null,
  null,
  null,
  null
);
const ct = rt.exports, ht = {
  name: "SearchBar",
  inject: ["quintable"]
};
var ut = function() {
  var e = this, t = e._self._c;
  return e.quintable.configFinal.search ? t("div", { staticClass: "mb-3 quintable--search-container", class: e.quintable.configFinal.searchContainerClass }, [e._t("before-search"), e._t("search", function() {
    return [t("div", { staticClass: "quintable--search-container--input-container", class: e.quintable.configFinal.searchClass }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: e.quintable.query, expression: "quintable.query" }], staticClass: "form-control", attrs: { type: "search", placeholder: e.quintable.configFinal.searchPlaceholder }, domProps: { value: e.quintable.query }, on: { input: function(n) {
      n.target.composing || e.$set(e.quintable, "query", n.target.value);
    } } })])];
  }, { value: e.quintable.query, loading: e.quintable.loading, setSearchQuery: e.quintable.setSearchQuery, placeholder: e.quintable.configFinal.searchPlaceholder, searchClass: e.quintable.configFinal.searchClass }), e._t("after-search")], 2) : e._e();
}, ft = [], dt = /* @__PURE__ */ S(
  ht,
  ut,
  ft,
  !1,
  null,
  null,
  null,
  null
);
const pt = dt.exports;
let C = null;
function gt() {
  if (C !== null)
    return C;
  try {
    const i = "test-local-storage";
    localStorage.setItem(i, i), localStorage.removeItem(i), C = !0;
  } catch (i) {
    C = !1;
  }
  return C;
}
const mt = {
  computed: {
    DEBUG() {
      return this.verbose;
    },
    axiosFinal() {
      return this.axios ? this.axios : this.$globalVueQuintableaxios ? this.$globalVueQuintableaxios : Ae;
    },
    configFinal() {
      if (!this.config)
        return {};
      let i = !1;
      if (this.config.pagination === !0)
        i = 25;
      else if (this.config.pagination) {
        let f = 0;
        for (; this.paginationOptions[f] <= this.config.pagination && f < this.paginationOptions.length; )
          f++;
        i = this.paginationOptions[Math.min(f - 1, this.paginationOptions.length - 1)];
      }
      let e = "of";
      this.config.numberOfVisibleRowsFillerWord && (e = this.config.numberOfVisibleRowsFillerWord);
      let t = !1;
      this.config.select && (t = !0);
      let n = 250;
      this.config.ajaxRequestDelay && (n = this.config.ajaxRequestDelay);
      let s = "bg-muted";
      this.config.hoverClass === !1 ? s = "" : this.config.hoverClass && this.config.hoverClass !== !0 && (s = this.config.hoverClass);
      let l = "bg-muted";
      this.config.activeClass === !1 ? l = "" : this.config.activeClass && this.config.activeClass !== !0 && (l = this.config.activeClass);
      let o = !1;
      this.config.multiSort && (o = !0);
      let a = !1;
      this.config.pageSort && (a = !0);
      let r = !1;
      this.config.multiSortSelect && (r = !0);
      let c = !1;
      this.config.pageSortSelect && (c = !0);
      let h = !1;
      this.config.ajaxUrl && (h = this.config.ajaxUrl);
      let u = "post";
      ["pre", "post"].includes(this.config.selectPosition) && (u = this.config.selectPosition);
      let d = !1;
      this.config.expandedAll && (d = !0);
      let g = !1;
      this.config.useFuzzySearch && (g = !0);
      let p = !1;
      this.config.prettySelect && (p = !0);
      let m = !1;
      this.config.rowsSelect && (m = !0);
      let v = !1;
      this.config.keepSelect && (v = !0);
      let y = !1;
      this.config.disallowAllOption && (y = !0);
      let b = !1;
      this.config.hideEmptyColumns && (b = !0);
      let w = "none";
      ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns) && (w = this.config.ignoreSortEmptyColumns);
      let M = !1;
      this.config.search && (M = !0);
      let B = 1;
      this.config.searchLength && (B = this.config.searchLength);
      let U = "Search...";
      this.config.searchPlaceholder && (U = this.config.searchPlaceholder);
      let D = "Multiple sort";
      this.config.multiSortPlaceholder && (D = this.config.multiSortPlaceholder);
      let G = "Page sort";
      this.config.pageSortPlaceholder && (G = this.config.pageSortPlaceholder);
      let H = "AND";
      ["AND", "OR"].includes(this.config.filterRelation) && (H = this.config.filterRelation);
      let N = "AND";
      ["AND", "OR"].includes(this.config.filterGroupRelation) && (N = this.config.filterGroupRelation);
      let z = "Rows per page:";
      this.config.rowsPlaceholder && (z = this.config.rowsPlaceholder);
      let Q = "No rows...";
      this.config.emptyPlaceholder && (Q = this.config.emptyPlaceholder);
      let K = !1;
      this.config.selectAll && (K = !0);
      let F = !1;
      this.config.selectAllRows && (F = !0), h && F && (console.warn(
        "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
      ), F = !1);
      let q = !1;
      this.config.storeState && (q = !0), !this.identifier && this.config.storeState && (console.warn(
        "Option storeState was deactivated automatically because table identifier is not set!"
      ), q = !1), gt() || (console.warn(
        "Option storeState was deactivated automatically because local storage is not available!"
      ), q = !1);
      let J = !1;
      this.config.defaultSelected && (J = !0);
      let W = !1;
      this.config.hideRowToggle && (W = !0);
      let X = !1;
      this.config.enableRowTabIndex && (X = !0);
      let Y = "chevron-up";
      this.config.expandedRowIcon && typeof this.config.expandedRowIcon == "string" && ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
        this.config.expandedRowIcon.toLowerCase()
      ) && (Y = this.config.expandedRowIcon.toLowerCase());
      let Z = "chevron-down";
      this.config.collapsedRowIcon && typeof this.config.collapsedRowIcon == "string" && ["chevron-down", "plus", "caret-down", "eye"].includes(
        this.config.collapsedRowIcon.toLowerCase()
      ) && (Z = this.config.collapsedRowIcon.toLowerCase());
      let ee = 5;
      this.config.pageRange && (ee = this.config.pageRange);
      let te = "col-12";
      this.config.searchClass && (te = this.config.searchClass);
      let ie = "row";
      this.config.searchContainerClass && (ie = this.config.searchContainerClass);
      let se = "GET";
      this.config.requestMethod && typeof this.config.requestMethod == "string" && ["POST", "GET"].includes(this.config.requestMethod.toUpperCase()) && (se = this.config.requestMethod.toUpperCase());
      let ne = 0, j = [], I = [], A = [], R = [], E = [], V = [], x = [], T = [], le = null;
      if (this.config.columns) {
        ne = this.config.columns.length;
        for (let f = 0; f < this.config.columns.length; f++)
          x[f] = "", this.config.columns[f] && this.config.columns[f].headline ? (j[f] = this.config.columns[f].headline, x[f] += this.config.columns[f].headline.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()) : j[f] = "", x[f] += " column-" + (f + 1), this.config.columns[f].classes && (x[f] += " " + this.config.columns[f].classes), this.config.columns[f] && this.config.columns[f].breakpoint ? I[f] = this.config.columns[f].breakpoint : I[f] = "", this.config.columns[f] && this.config.columns[f].sort ? this.config.columns[f].firstSortDirection && typeof this.config.columns[f].firstSortDirection == "string" && ["DESC", "ASC"].includes(
            this.config.columns[f].firstSortDirection.toUpperCase()
          ) ? R[f] = this.config.columns[f].firstSortDirection.toUpperCase() : R[f] = !0 : R[f] = !1, this.config.columns[f] && this.config.columns[f].ignoreEmpty ? T[f] = !0 : T[f] = !1, this.config.columns[f] && this.config.columns[f].sticky ? E[f] = !0 : E[f] = !1, this.config.columns[f] && this.config.columns[f].hidden ? A[f] = !0 : A[f] = !1, this.config.columns[f] && this.config.columns[f].align ? V[f] = this.config.columns[f].align : V[f] = !1;
        le = this.config.columns;
      }
      return Object.freeze({
        headlines: j,
        columnClasses: x,
        sorts: R,
        pageSort: a,
        multiSort: o,
        pageSortSelect: c,
        multiSortSelect: r,
        filterGroupRelation: N,
        filterRelation: H,
        rowsSelect: m,
        keepSelect: v,
        disallowAllOption: y,
        defaultSelected: J,
        searchLength: B,
        search: M,
        searchPlaceholder: U,
        useFuzzySearch: g,
        ajaxUrl: h,
        pageSortPlaceholder: G,
        multiSortPlaceholder: D,
        rowsPlaceholder: z,
        emptyPlaceholder: Q,
        stickyCols: E,
        alignments: V,
        breakpoints: I,
        hiddenCols: A,
        ignoreEmpty: T,
        hideEmptyColumns: b,
        ignoreSortEmptyColumns: w,
        pagination: i,
        numberOfVisibleRowsFillerWord: e,
        select: t,
        selectAll: K,
        selectAllRows: F,
        hoverClass: s,
        activeClass: l,
        expandedAll: d,
        pageRange: ee,
        prettySelect: p,
        number: ne,
        columns: le,
        hideRowToggle: W,
        enableRowTabIndex: X,
        expandedRowIcon: Y,
        collapsedRowIcon: Z,
        selectPosition: u,
        searchClass: te,
        searchContainerClass: ie,
        requestMethod: se,
        storeState: q,
        ajaxRequestDelay: n
      });
    }
  }
}, bt = {
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
      let i = {};
      for (let e in this.currentSortIndexes)
        Object.prototype.hasOwnProperty.call(this.currentSortIndexes, e) && (i[e] = this.configFinal.columns[e]);
      return i;
    }
  },
  watch: {
    pageSort() {
      this.currentSortIndexes = {}, this.resetSorts(), this.recomputeEssentials();
    },
    customMultiSort(i) {
      if (!i && Object.keys(this.currentSortIndexes).length > 1) {
        let e, t;
        for (let n in this.currentSortIndexes)
          if (Object.prototype.hasOwnProperty.call(
            this.currentSortIndexes,
            n
          ) && this.currentSortIndexes[n].order === 0) {
            e = this.currentSortIndexes[n], t = n;
            break;
          }
        this.currentSortIndexes = {}, this.$set(this.currentSortIndexes, t, e), this.sort();
      }
    },
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
    setSortColumn(i, e) {
      const t = parseInt(i), n = i.toString();
      if (!this.configFinal.sorts[t])
        return;
      let s;
      this.currentSortIndexes[n] ? (s = this.currentSortIndexes[n], s.asc = !s.asc) : (this.multiSort || (this.currentSortIndexes = {}), s = {
        headline: this.configFinal.headlines[t],
        index: t,
        asc: this.configFinal.sorts[t] === !0 ? !0 : this.configFinal.sorts[t] === "ASC",
        order: this.numberOfSorts
      }), typeof e != "undefined" && (s.asc = e), this.$set(this.currentSortIndexes, n, s), this.configFinal.storeState && localStorage.setItem(
        `vue-quintable-${this.identifier}-sort-indexes`,
        JSON.stringify(this.currentSortIndexes)
      ), this.$emit("update:sort", this.currentSortIndexes, "update:sort"), this.sort();
    },
    sort(i = !1) {
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        this.loadViaAjax(!i, !i, "SORT");
        return;
      }
      let e = this.rowsFinal.slice(), t = [], n = [], s = {};
      if (this.pageSort) {
        if (n = this.visibleRowIndexes.slice(), !n.length) {
          const u = this.configFinal.pagination ? this.configFinal.pagination : this.rowsFinal.length;
          for (let d = 0; d < u; d++)
            n.push(d);
        }
        let h = 0;
        for (let u = 0; u < e.length; u++)
          e[u].index = u, n.indexOf(u) !== -1 && (h < this.configFinal.pagination && t.push(e[u]), h++);
        if (Object.keys(this.sortedIndexes).length)
          s = Object.assign({}, this.sortedIndexes);
        else
          for (let u = 0; u < e.length; u++)
            this.$set(s, u.toString(), u);
      } else {
        t = this.rowsFinal.slice();
        for (let h = 0; h < t.length; h++)
          t[h].index = h;
      }
      let l = [];
      for (let h in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, h)) {
          let u = this.currentSortIndexes[h];
          u.index = h, l.push(u);
        }
      l.sort(function(h, u) {
        return h.order - u.order;
      });
      let o = (h, u, d, g) => {
        g = g || 0;
        let p = d[g], m = p.index, v = h.cells ? h.cells : h, y = u.cells ? u.cells : u, b = typeof v[m].sortValue != "undefined" && v[m].sortValue !== null ? v[m].sortValue : v[m].html ? v[m].html : v[m].text;
        typeof v[m].computeSortValue == "function" && (b = v[m].computeSortValue(this.currentSortIndexes));
        let w = typeof y[m].sortValue != "undefined" && y[m].sortValue !== null ? y[m].sortValue : y[m].html ? y[m].html : y[m].text;
        return typeof y[m].computeSortValue == "function" && (w = y[m].computeSortValue(this.currentSortIndexes)), typeof b == "string" && (b = b.toLowerCase()), typeof w == "string" && (w = w.toLowerCase()), isNaN(b) ? (typeof b == "string" && b.match(/^-?\d+$/) || typeof b == "string" && b.match(/^\d+\.\d+$/)) && (b = parseFloat(b)) : b = parseFloat(b), isNaN(w) ? (typeof w == "string" && w.match(/^-?\d+$/) || typeof w == "string" && w.match(/^\d+\.\d+$/)) && (w = parseFloat(w)) : w = parseFloat(w), p.asc ? b > w ? 1 : b < w ? -1 : d[g + 1] ? o(h, u, d, g + 1) : 1 : b < w ? 1 : b > w ? -1 : d[g + 1] ? o(h, u, d, g + 1) : -1;
      };
      t.sort(function(h, u) {
        return o(h, u, l);
      });
      const a = [];
      let r = 0, c = 0;
      for (let h = 0; h < e.length; h++) {
        const u = h.toString();
        this.pageSort && n.indexOf(h) !== -1 ? (r < this.configFinal.pagination ? (a.push(t[c]), c++) : a.push(e[s[u]]), r++) : this.pageSort ? a.push(e[s[u]]) : a.push(t[h]);
      }
      for (let h = 0; h < a.length; h++) {
        const u = h.toString();
        this.$set(this.sortedIndexes, u, parseInt(a[h].index));
      }
      !this.pageSort && !i && (this.currentPage = 1), !this.configFinal.selectAllRows && !this.pageSort && !i && !this.configFinal.keepSelect && this.resetSelect("sort method"), this.recomputeEssentials();
    }
  }
}, he = Object.freeze({
  equal: (i, e) => e === i,
  greater: (i, e) => e > i,
  less: (i, e) => e < i,
  greaterEqual: (i, e) => e >= i,
  lessEqual: (i, e) => e <= i,
  contains: (i, e) => !Array.isArray(e) && typeof e != "string" ? !1 : e.indexOf(i) !== -1,
  notContains: (i, e) => !Array.isArray(e) && typeof e != "string" ? !1 : e.indexOf(i) === -1,
  startsWith: (i, e) => typeof e != "string" ? !1 : e.indexOf(i) === 0,
  endsWitch: (i, e) => typeof e != "string" ? !1 : e.indexOf(i, globalThis.length - i.length) !== -1,
  matches(i, e) {
    return !(i instanceof RegExp) || typeof e != "string" ? !1 : i.test(e);
  }
}), wt = Object.keys(he), yt = {
  data() {
    return {
      defaultOperator: "equal",
      operatorFunctions: he
    };
  },
  computed: {
    operators() {
      return wt;
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
      let i = new Array(this.rowsFinal.length).fill(!0);
      if (!this.configFinal.search && !this.filterActive || !this.filterActive && this.configFinal.search && this.query.length < this.configFinal.searchLength)
        return i;
      const e = (this.query + "").toLowerCase();
      for (let t = 0; t < this.rowsFinal.length; t++) {
        let n = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t], s = !1, l = !1;
        if (this.configFinal.search && this.query.length >= this.configFinal.searchLength) {
          for (let o = 0; o < n.length; o++) {
            let a = n[o], r = a.html ? a.html : a.text;
            if (r) {
              const c = (r + "").toLowerCase();
              if (this.configFinal.useFuzzySearch && oe(c, e).score > 6) {
                s = !0;
                break;
              }
              if (c.indexOf(e) !== -1) {
                s = !0;
                break;
              }
            }
          }
          if (!s && this.rowsFinal[t].keywords)
            for (let o = 0; o < this.rowsFinal[t].keywords.length; o++) {
              const a = (this.rowsFinal[t].keywords[o] + "").toLowerCase();
              if (this.configFinal.useFuzzySearch && oe(a, e).score > 6) {
                s = !0;
                break;
              }
              if (a.indexOf(e) !== -1) {
                s = !0;
                break;
              }
            }
          l = !0;
        }
        if (this.filterActive && !this.rowsFinal[t].filters)
          s = !1;
        else if ((l && s || !l) && this.filterActive) {
          if (this.filterGroups.length)
            s = this.doFiltering(this.rowsFinal[t].filters);
          else {
            let o = {
              items: [],
              relation: this.configFinal.filterRelation
            };
            const a = Object.keys(this.filtersFinal);
            for (let r = 0; r < a.length; r++)
              o.items.push({ name: a[r] });
            s = this.doFilteringForGroup(
              this.filtersFinal,
              this.rowsFinal[t].filters,
              o
            ), this.DEBUG && console.log("FILTER GROUPS CALCULATED", this.filterGroups);
          }
          this.DEBUG && (console.log(`
`), console.log("ROW " + t, s, this.rowsFinal[t].filters), console.log(`
`));
        }
        i[t] = s;
      }
      return i;
    }
  },
  watch: {
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
      this.$emit("update:filters", i, "update:filters");
    },
    filteredRows: {
      handler(i, e) {
        if (this.configFinal.ajaxUrl || i === e)
          return;
        if (e && i.length === e.length) {
          let s = !0;
          for (let l = 0; l < i.length; l++)
            if (i[l] !== e[l]) {
              s = !1;
              break;
            }
          if (s)
            return;
        }
        (this.activeRow !== null && this._visibleRowIndexMap[this.activeRow] !== void 0 ? this._visibleRowIndexMap[this.activeRow] : -1) < 0 && (this.activeRow = null), this.currentPage !== 1 ? this.currentPage = 1 : this.configFinal.keepSelect || this.resetSelect("filteredRows watcher");
        const n = [];
        for (let s = 0; s < i.length; s++) {
          const l = s.toString();
          i[s] && n.push(
            this.rowsFinal[this.sortedIndexes[l] ? this.sortedIndexes[l] : s]
          );
        }
        this.$emit("filtered:rows", n, "filtered:rows");
      },
      immediate: !0
    }
  },
  methods: {
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
    doFilteringForGroup(i, e, t, n = 0) {
      let s = "   ";
      for (let o = 0; o < n; o++)
        s += "   ";
      if (this.DEBUG) {
        if (t.items) {
          let o = s, a = t.items.slice(), r = function(c, h) {
            return c.name === void 0 ? 1 : h.name === void 0 ? -1 : 0;
          };
          a = a.sort(r);
          for (let c = 0; c < a.length; c++)
            a[c].name && (o += a[c].name, c < a.length - 1 && (o += " " + t.relation + " "));
          console.log(o);
        }
        console.log(s, "GROUP:", t);
      }
      let l = !1;
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
                if (l = !0, c.items && (l = this.doFilteringForGroup(
                  i,
                  e,
                  c,
                  n + 1
                )), !l)
                  break;
                if (typeof i[c.name] == "undefined")
                  continue;
                let h = typeof i[c.name] == "object" && i[c.name] !== null && i[c.name].operator && this.operators.includes(i[c.name].operator) ? i[c.name].operator : this.defaultOperator, u = this.getFilterValues(i[c.name]);
                const d = typeof i[c.name].compare == "function" ? i[c.name].compare : this.operatorFunctions[h];
                for (let g = 0; g < u.length; g++)
                  if (!d(
                    u[g],
                    e[c.name]
                  )) {
                    l = !1;
                    break;
                  }
                if (!l)
                  break;
              }
          }
        return l;
      } else if (t.relation === "OR" || t.items) {
        for (let o in i)
          if (Object.prototype.hasOwnProperty.call(i, o)) {
            if (this.filterGroups.length && !this.findInFilterGroups(o, this.filterGroups))
              continue;
            for (let a = 0; a < t.items.length; a++) {
              let r = t.items[a];
              if (r.items && (l = this.doFilteringForGroup(
                i,
                e,
                r,
                n + 1
              ), l))
                break;
              if (typeof i[r.name] == "undefined")
                continue;
              let c = typeof i[r.name] == "object" && i[r.name] !== null && i[r.name].operator && this.operators.includes(i[r.name].operator) ? i[r.name].operator : this.defaultOperator, h = this.getFilterValues(i[r.name]);
              const u = typeof i[r.name].compare == "function" ? i[r.name].compare : this.operatorFunctions[c];
              for (let d = 0; d < h.length; d++)
                if (u(
                  h[d],
                  e[r.name]
                )) {
                  l = !0;
                  break;
                }
              if (l)
                break;
            }
          }
        return l;
      } else
        return !0;
    },
    getFilterValues(i) {
      return i instanceof RegExp || typeof i != "object" || i === null ? [i] : Array.isArray(i) ? i : this.getFilterValues(i.values);
    },
    findInFilterGroups(i, e, t = 0) {
      if (!e)
        return !1;
      let n = !1;
      for (let s = 0; s < e.length; s++) {
        let l = e[s];
        if (l.items && (n = this.findInFilterGroups(i, l.items, t + 1), n))
          break;
        if (l.name === i) {
          n = !0;
          break;
        }
      }
      return n;
    }
  }
}, _t = {
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
    updated(i) {
      this.configFinal.ajaxUrl && (i && i.clear ? this.loadViaAjax(!0, !0, "UPDATED") : i && this.loadViaAjax(!1, !0, "UPDATED"));
    },
    loading() {
      this.loaderHeight = this.$refs["height-wrapper"] ? this.$refs["height-wrapper"].clientHeight : 0;
    }
  },
  methods: {
    loadViaAjax(i = !1, e = !0, t = null) {
      this.DEBUG && console.log("CALLED FROM:", t);
      let n = this.query;
      if (n && n.length < this.configFinal.searchLength && (this.lastQuery.length < n.length || this.lastQuery.length < this.configFinal.searchLength))
        return;
      if (!n && this.lastQuery) {
        const o = this.lastQuery;
        if (this.lastQuery = "", o.length < this.configFinal.searchLength)
          return;
      } else
        n && n.length < this.configFinal.searchLength && (n = "");
      this.cancelSource && this.cancelSource.cancel("Operation canceled by the user."), this.clearLists(e), this.ajaxRows = [], i && (this.currentPage = 1, this.resetSelect("loadViaAjax method")), this.loaderHeight = this.$refs["height-wrapper"] ? this.$refs["height-wrapper"].clientHeight : 0, this.fetching = !0;
      let s = {
        search: n,
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
      const l = {
        "Content-Type": "application/json"
      };
      this.axiosFinal.request(this.configFinal.ajaxUrl, {
        method: this.configFinal.requestMethod,
        params: this.configFinal.requestMethod === "GET" ? s : null,
        data: this.configFinal.requestMethod === "POST" ? s : null,
        cancelToken: this.cancelSource.token,
        headers: l
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
}, vt = Object.freeze([
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
]), St = {
  data() {
    return {
      currentPage: 1,
      paginationOptions: vt,
      customRowsPerPage: null,
      pageOffset: 0
    };
  },
  computed: {
    currentRowsPerPageProperty: {
      get() {
        return this.customRowsPerPage ? this.customRowsPerPage : this.currentRowsPerPage;
      },
      set(i) {
        this.customRowsPerPage = i;
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
      let i = 0;
      for (let e = 0; e < this.filteredRows.length; e++)
        this.filteredRows[e] && i++;
      return i;
    },
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
    currentPage(i) {
      this.pageOffset = 0, this.activeRow = null, this.$emit("update:page", i, "update:page");
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
    gotoPage(i) {
      i === "prev" ? this.currentPage - 1 > 0 && this.currentPage-- : i === "next" ? this.currentPage + 1 <= this.pages && this.currentPage++ : i === "first" ? this.currentPage = 1 : i === "last" ? this.currentPage = this.pages : this.currentPage = i;
    },
    updatePageOffset(i) {
      let e = this.pageOffset + this.pageRange * i;
      if (i > 0) {
        let t = Math.min(e, this.pages - this.pageRange);
        this.pageOffset = Math.min(t, this.pages - this.currentPage);
      } else
        i < 0 ? this.pageOffset = Math.max(e, -(this.pages - this.pageRange)) : this.pageOffset = 0;
    }
  }
}, xt = {
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
      set(i) {
        this.allSelectedCustom = i;
      }
    },
    someSelected() {
      return Object.values(this.selected).some((i) => i);
    }
  },
  watch: {
    preSelectedRows(i) {
      if (i) {
        for (let e = 0; e < this.rowsFinal.length; e++)
          this.$set(this.selected, e, !1);
        if (i && i.length) {
          let e = 0;
          const t = this.configFinal.selectAllRows ? this.rowsFinal.map((n, s) => s) : this.visibleRowIndexes;
          for (let n = 0; n < i.length; n++) {
            const s = i[n].key, l = i[n].value;
            for (let o = 0; o < t.length; o++) {
              const a = t[o];
              !this.rowsFinal[a].disableSelect && this.rowsFinal[a][s] === l && (this.$set(this.selected, a, !0), e++);
            }
          }
          if (this.configFinal.selectAllRows) {
            let n = 0;
            for (let s = 0; s < this.rowsFinal.length; s++)
              this.rowsFinal[s].disableSelect || n++;
            this.allSelectedCustom = e && e === n;
          } else {
            let n = 0;
            for (let s = 0; s < this.rowsFinal.length; s++)
              !this.rowsFinal[s].disableSelect && this.visibleRows[this.sortedIndexes[s]] && n++;
            this.allSelectedCustom = e && e === n;
          }
        } else
          this.allSelectedCustom = !1;
      }
    },
    selected: {
      handler(i) {
        let e = [];
        for (let t in this.sortedIndexes)
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, t) && i[this.sortedIndexes[t]]) {
            const n = this.rowsFinal[this.sortedIndexes[t]];
            n && !n.disableSelect && e.push(n);
          }
        this.configFinal.storeState && localStorage.setItem(
          `vue-quintable-${this.identifier}-selected-rows`,
          JSON.stringify(i)
        ), this.$emit("input", e), this.$emit("update:selected-rows", e, "update:selected-rows");
      },
      deep: !0
    }
  },
  methods: {
    checkAll(i = !1) {
      let e = this.allSelectedProperty;
      i && (e = !0);
      let t = 0;
      for (let n in this.sortedIndexes)
        Object.prototype.hasOwnProperty.call(this.sortedIndexes, n) && (n = parseInt(n), !this.rowsFinal[this.sortedIndexes[n]].disableSelect && (!this.configFinal.selectAllRows && this.visibleRows[this.sortedIndexes[n]] || this.configFinal.selectAllRows && this.filteredRows[this.sortedIndexes[n]]) ? (this.$set(this.selected, this.sortedIndexes[n], e), t++) : this.$set(this.selected, this.sortedIndexes[n], !1));
      if (e)
        if (this.configFinal.selectAllRows) {
          let n = 0;
          for (let s = 0; s < this.rowsFinal.length; s++)
            this.rowsFinal[s].disableSelect || n++;
          this.allSelectedCustom = t && t === n;
        } else {
          let n = 0;
          for (let s = 0; s < this.rowsFinal.length; s++)
            !this.rowsFinal[s].disableSelect && this.visibleRows[this.sortedIndexes[s]] && n++;
          this.allSelectedCustom = t && t === n;
        }
    },
    checkListener(i, e) {
      let t = !0;
      if (this.configFinal.selectAllRows) {
        for (let n = 0; n < this.rowsFinal.length; n++)
          if (!(n === e ? !!i : !!(this.selected[n] || this.rowsFinal[n] && this.rowsFinal[n].disableSelect))) {
            t = !1;
            break;
          }
      } else
        for (let n = 0; n < this.visibleRowIndexes.length; n++) {
          const s = this.visibleRowIndexes[n];
          if (!(s === e ? !!i : !!(this.selected[s] || this.rowsFinal[s] && this.rowsFinal[s].disableSelect))) {
            t = !1;
            break;
          }
        }
      this.allSelectedProperty = t;
    },
    resetSelect(i) {
      this.DEBUG && console.log("CALLED FROM:", i), this.allSelectedProperty = !1;
      for (let e = 0; e < this.rowsFinal.length; e++)
        this.$set(this.selected, e, !1);
    },
    checkStoredSelectedRows(i = !1) {
      if (this.storedState["pre-selected-rows"], this.storedState["selected-rows"]) {
        this.selected = JSON.parse(
          JSON.stringify(this.storedState["selected-rows"])
        );
        const e = Object.values(this.selected).filter((t) => t).length;
        if (this.configFinal.selectAllRows)
          this.allSelectedCustom = e && e === this.rowsFinal.length;
        else {
          let t = 0;
          for (let n = 0; n < this.visibleRows.length; n++)
            this.visibleRows[n] && t++;
          this.allSelectedCustom = e && e === t;
        }
        i && this.$delete(this.storedState, "selected-rows");
      }
    }
  }
}, Ct = {
  methods: {
    handleComponentEvent(i) {
      this.$emit("component:event", i, "component:event");
    },
    hasSomeParentTheClass(i, e) {
      return i instanceof HTMLElement && i.classList.contains(e) ? !0 : i instanceof Element && i.parentNode && this.hasSomeParentTheClass(i.parentNode, e);
    },
    hasSomeParentTagName(i, e) {
      return i instanceof HTMLElement && i.tagName.toLowerCase() === e.toLowerCase() ? !0 : i instanceof Element && i.parentNode && this.hasSomeParentTagName(i.parentNode, e);
    },
    onRowAuxClick(i, e) {
      if (i.button === 1) {
        const t = parseInt(e);
        this.$emit(
          "auxclick:row",
          this.rowsFinal[t],
          "auxclick:row",
          i.target,
          i,
          t
        );
      }
    },
    onRowMousedown(i) {
      i.which === 2 && i.preventDefault();
    },
    onRowClick(i, e) {
      if ((i.target || {}).type === "checkbox")
        return;
      if (this.hasSomeParentTheClass(i.target, "generated-table") && !this.nested)
        return;
      let t = this.hasSomeParentTagName(i.target, "a"), n = this.hasSomeParentTheClass(
        i.target,
        "prevent-toggle"
      );
      const s = e.toString(), l = parseInt(e);
      this.hiddenColumns[s] && !t && !n && (this.openRows[s] ? (this.$set(this.openRows, s, !1), this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[s]],
        "collapse:row",
        this.sortedIndexes[s]
      )) : (this.$set(this.openRows, s, !0), this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[s]],
        "expand:row",
        this.sortedIndexes[s]
      )), this.generatedUpdatedKey = Date.now()), this.configFinal.enableRowTabIndex && (this.activeRow === l ? this.activeRow = null : this.activeRow = l), this.$emit("click:row", this.rowsFinal[l], "click:row", i.target, i, l);
    },
    onCellClick(i, e) {
      this.$emit("click:cell", e, "click:cell", i.target, i);
    },
    onCellAuxClick(i, e) {
      i.button === 1 && this.$emit("auxclick:cell", e, "auxclick:cell", i.target, i);
    },
    onCellMousedown(i) {
      i.which === 2 && i.preventDefault();
    },
    onMouseenterRow(i) {
      this.hoveredRow !== i && (this.hoveredRow = i);
    },
    onMouseleaveTable() {
      const i = this.configFinal.hoverClass;
      i && this._lastHoveredEl && (this._lastHoveredEl.classList.remove(i), this._lastHoveredEl = null), this.hoveredRow = null;
    }
  }
}, Ft = {
  data() {
    return {
      hiddenBreakpoints: [],
      initBreakpoints: !0,
      breakpointTimeout: null
    };
  },
  watch: {
    hiddenBreakpoints(i) {
      this.initBreakpoints || this.$emit("change:breakpoints", i, "change:breakpoints"), this.initBreakpoints = !1;
    }
  },
  methods: {
    _onBreakpointChange(i) {
      (this.hiddenBreakpoints.length !== i.length || this.hiddenBreakpoints.some((e, t) => e !== i[t])) && (this.hiddenBreakpoints = i);
    },
    elementVisible(i) {
      return i ? window.getComputedStyle(i).display !== "none" : !1;
    },
    // Keep for backwards compatibility — now delegates to shared detector
    generateHiddenBreakpoints() {
      const i = re();
      this._onBreakpointChange(i.hiddenBreakpoints);
    },
    breakpointListener() {
      clearTimeout(this.breakpointTimeout), this.breakpointTimeout = setTimeout(() => {
        this.generateHiddenBreakpoints();
      }, 200);
    }
  }
};
let qt = 0;
const Rt = {
  name: "VueQuintable",
  mixins: [
    mt,
    bt,
    yt,
    _t,
    St,
    xt,
    Ct,
    Ft
  ],
  components: {
    TableHeader: Ke,
    SelectCheckbox: ce,
    ExpandedRow: Ze,
    PaginationFooter: ct,
    SearchBar: pt
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
      uuid: "qt-" + ++qt + "-" + Date.now(),
      loaderHeight: 0,
      lastSearchQueryUpdated: null,
      storedState: {},
      activeRow: null
    };
  },
  computed: {
    visibleRows() {
      if (!this.configFinal.ajaxUrl && this.currentRowsPerPage !== "All") {
        let i = new Array(this.rowsFinal.length).fill(!1), e = {};
        for (let l in this.sortedIndexes)
          Object.prototype.hasOwnProperty.call(this.sortedIndexes, l) && this.filteredRows[this.sortedIndexes[l]] && (e[l] = this.sortedIndexes[l]);
        let t = this.currentPage * this.currentRowsPerPage, n = t - this.currentRowsPerPage, s = 0;
        for (let l in e)
          Object.prototype.hasOwnProperty.call(e, l) && (l = parseInt(l), s < t && s >= n && (i[e[l]] = !0), s++);
        return i;
      } else
        return this.filteredRows;
    },
    visibleRowIndexes() {
      let i = [];
      if (this.configFinal.ajaxUrl && !this.pageSort)
        for (let e = 0; e < this.rowsFinal.length; e++)
          i.push(e);
      else
        for (let e in this.sortedIndexes)
          Object.prototype.hasOwnProperty.call(this.sortedIndexes, e) && this.visibleRows[this.sortedIndexes[e]] && i.push(this.sortedIndexes[e]);
      return i;
    },
    // Pre-compute per-column whether it matches any hidden breakpoint
    _hiddenBreakpointSet() {
      return Object.freeze(new Set(this.hiddenBreakpoints));
    },
    _colBreakpointMatch() {
      const i = this._hiddenBreakpointSet;
      return Object.freeze(
        this.configFinal.columns.map((e) => {
          if (!e || !e.breakpoint)
            return !1;
          const t = e.breakpoint.toLocaleLowerCase();
          return t === "all" || i.has(t);
        })
      );
    },
    // Cache isColEmpty(j) results so it's computed once per column, not N times
    _colEmptyCache() {
      const i = {};
      for (let e = 0; e < this.configFinal.number; e++)
        i[e] = this.isColEmpty(e);
      return Object.freeze(i);
    },
    // Pre-compute per-column hide status (shared by generatedRows, stickyRows, hiddenColumns)
    _colHideCache() {
      const i = {};
      for (let e = 0; e < this.configFinal.columns.length; e++)
        i[e] = this.configFinal.hiddenCols[e] || !this.configFinal.ignoreEmpty[e] && this.configFinal.hideEmptyColumns && this._colEmptyCache[e] || this.emptyColumns[e];
      return Object.freeze(i);
    },
    // Pre-compute per-column base visibility for TableRow template
    cellVisible() {
      return Object.freeze(
        this.configFinal.columns.map((i, e) => !(this.configFinal.hiddenCols[e] || this.emptyColumns[e] || !i || this._colBreakpointMatch[e] || this.configFinal.stickyCols[e]))
      );
    },
    generatedRows() {
      let i = {};
      if (this.generatedUpdatedKey) {
        const e = this._colBreakpointMatch, t = this._colHideCache, n = this.configFinal.hideEmptyColumns, s = this.visibleRowIndexes;
        for (let l = 0; l < s.length; l++) {
          const o = s[l];
          let a = this.rowsFinal[o].cells ? this.rowsFinal[o].cells : this.rowsFinal[o], r = {};
          for (let c = 0; c < this.configFinal.columns.length; c++) {
            if (!e[c])
              continue;
            let h = this.configFinal.columns[c];
            !(t[c] || n && !this.configFinal.ignoreEmpty[c] && this.isColEmpty(c, o)) && !h.sticky && !h.alwaysExpanded && (r[c] = a[c]);
          }
          i[o] = r;
        }
      }
      return i;
    },
    stickyRows() {
      let i = {};
      const e = this._colBreakpointMatch, t = this._colHideCache, n = this.configFinal.hideEmptyColumns, s = this.visibleRowIndexes;
      for (let l = 0; l < s.length; l++) {
        const o = s[l];
        let a = this.rowsFinal[o].cells ? this.rowsFinal[o].cells : this.rowsFinal[o], r = {};
        for (let c = 0; c < this.configFinal.columns.length; c++) {
          let h = this.configFinal.columns[c];
          const u = t[c] || n && !this.configFinal.ignoreEmpty[c] && this.isColEmpty(c, o);
          (!u && h.sticky || !u && h.alwaysExpanded && e[c]) && (r[c] = a[c]);
        }
        i[o] = r;
      }
      return i;
    },
    pageSort: {
      get() {
        return this.customPageSort === null ? this.configFinal.pageSort : this.customPageSort;
      },
      set(i) {
        this.customPageSort = i;
      }
    },
    multiSort: {
      get() {
        return this.customMultiSort === null ? this.configFinal.multiSort : this.customMultiSort;
      },
      set(i) {
        this.customMultiSort = i;
      }
    },
    hasGeneratedRows() {
      const i = this._colBreakpointMatch, e = this._colHideCache;
      for (let t = 0; t < this.configFinal.columns.length; t++)
        if (i[t] && !e[t]) {
          const n = this.configFinal.columns[t];
          if (!n.sticky && !n.alwaysExpanded)
            return !0;
        }
      return !1;
    },
    cellClassesParsed() {
      let i = {};
      const e = this.visibleRowIndexes.length > 0 ? this.visibleRowIndexes : Object.keys(this.rowsFinal).map(Number);
      for (let t = 0; t < e.length; t++) {
        const n = e[t];
        if (!this.rowsFinal[n])
          continue;
        i[n] = [];
        let s = this.rowsFinal[n].align, l = this.rowsFinal[n].cells ? this.rowsFinal[n].cells : this.rowsFinal[n];
        for (let o = 0; o < l.length; o++) {
          let a = [], r = this.configFinal.alignments[o];
          if ((l[o].align || s || r) && (l[o].align ? a.push("text-" + l[o].align) : s ? a.push("text-" + s) : a.push("text-" + r)), l[o].classes) {
            let c = l[o].classes.split(" ");
            Array.prototype.push.apply(a, c);
          }
          i[n].push(a.join(" "));
        }
      }
      return i;
    },
    hiddenColumns() {
      const i = this._colBreakpointMatch, e = this._colHideCache;
      let t = !1;
      for (let s = 0; s < this.configFinal.columns.length; s++)
        if (i[s] && !e[s]) {
          t = !0;
          break;
        }
      const n = {};
      if (t)
        for (let s = 0; s < this.visibleRowIndexes.length; s++)
          n[this.visibleRowIndexes[s]] = 1;
      else if (this.configFinal.hideEmptyColumns)
        for (let s = 0; s < this.visibleRowIndexes.length; s++) {
          let l = 0;
          const o = this.visibleRowIndexes[s];
          for (let a = 0; a < this.configFinal.columns.length; a++) {
            if (!i[a])
              continue;
            if (!(e[a] || !this.configFinal.ignoreEmpty[a] && this.isColEmpty(a, o))) {
              l++;
              break;
            }
          }
          n[o] = l;
        }
      else
        for (let s = 0; s < this.visibleRowIndexes.length; s++)
          n[this.visibleRowIndexes[s]] = 0;
      return n;
    },
    rowsFinal() {
      return this.configFinal.ajaxUrl ? this.ajaxRows : this.rows ? this.rows : [];
    },
    headerClass() {
      let i = [];
      for (let e = 0; e < this.configFinal.number; e++) {
        let t = [];
        this.configFinal.alignments[e] && t.push("text-" + this.configFinal.alignments[e]), this.configFinal.sorts[e] && (t.push("sort-header"), this.currentSortIndexes[e] && t.push("active")), i.push(
          t.join(" ") + "  quintable--table-container--table--header-row--th " + this.configFinal.columnClasses[e]
        );
      }
      return Object.freeze(i);
    },
    showHeadlines() {
      const i = this._hiddenBreakpointSet;
      let e = [];
      for (let t = 0; t < this.configFinal.number; t++) {
        const n = this.configFinal.columns[t];
        this.configFinal.headlines[t] && (!n.showHeadlineBreakpoint || n.showHeadlineBreakpoint && i.has(n.showHeadlineBreakpoint)) && (!n.hideHeadlineBreakpoint || n.hideHeadlineBreakpoint && !i.has(n.hideHeadlineBreakpoint)) ? e.push(!0) : e.push(!1);
      }
      return Object.freeze(e);
    },
    emptyColumns() {
      const i = {}, e = this._colEmptyCache, t = this.configFinal.ignoreSortEmptyColumns;
      for (let n = 0; n < this.configFinal.number; n++) {
        const s = this.configFinal.ignoreEmpty[n], l = this.configFinal.sorts[n];
        !this.configFinal.hideEmptyColumns || s || t === "none" && l || t === "active" && Object.prototype.hasOwnProperty.call(this.currentSortIndexes, n) ? i[n] = !1 : i[n] = e[n];
      }
      return i;
    },
    rowClasses() {
      const i = {};
      for (let e = 0; e < this.visibleRowIndexes.length; e++) {
        const t = this.visibleRowIndexes[e], n = [];
        this.rowsFinal[t].classes && n.push(this.rowsFinal[t].classes), this.openRows[t] && n.push("row-expanded"), this.hiddenColumns[t] > 0 && !this.openRows[t] && n.push("row-collapsed"), i[t] = n.join(" ");
      }
      return i;
    },
    _fmtCells() {
      const i = {}, e = this.configFinal.columns;
      for (let t = 0; t < this.visibleRowIndexes.length; t++) {
        const n = this.visibleRowIndexes[t], s = this.rowsFinal[n];
        if (!s)
          continue;
        const l = s.cells ? s.cells : s;
        let o = !1;
        const a = {};
        for (let r = 0; r < l.length; r++)
          e[r] && e[r].cellFormatter && (a[r] = this.cellFormatters(r, l[r]), o = !0);
        o && (i[n] = a);
      }
      return i;
    },
    _renderRows() {
      const i = {}, e = this.configFinal.columnClasses, t = this.cellVisible, n = this.cellClassesParsed, s = this._fmtCells, l = this.uuid;
      for (let o = 0; o < this.visibleRowIndexes.length; o++) {
        const a = this.visibleRowIndexes[o], r = this.rowsFinal[a];
        if (!r)
          continue;
        const c = r.cells ? r.cells : r, h = "vue-quintable-" + l + "-cell-" + a + "-", u = n[a], d = s[a], g = [];
        for (let p = 0; p < c.length; p++) {
          const m = c[p];
          g.push(
            Object.freeze({
              cell: m,
              cls: (u && u[p] || "") + " " + (e[p] || ""),
              vis: !!(t[p] && m),
              fmt: d && d[p] || null,
              key: h + p
            })
          );
        }
        i[a] = Object.freeze(g);
      }
      return i;
    },
    // O(1) lookup map: rowIndex → position in visibleRowIndexes
    _visibleRowIndexMap() {
      const i = {};
      for (let e = 0; e < this.visibleRowIndexes.length; e++)
        i[this.visibleRowIndexes[e]] = e;
      return i;
    }
  },
  watch: {
    rowsFinal: {
      handler(i) {
        if (this.verbose && i && i.length)
          for (let e = 0; e < i.length; e++) {
            let t = i[e].cells ? i[e].cells : i[e];
            t.length !== this.config.columns.length && console.error(
              `Column count on row index ${e} doesn't fit for column config! expected: ${this.config.columns.length}, got: ${t.length}` + (this.configFinal.ajaxUrl ? ` | URL: ${this.configFinal.ajaxUrl}` : "") + (this.identifier ? ` | IDENTIFIER: ${this.identifier}` : ""),
              i[e]
            );
          }
      },
      immediate: !0
    },
    hoveredRow(i) {
      i !== null && this.$emit("hover:row", this.rowsFinal[i], "hover:row");
    },
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
    rows() {
      this.clearLists(), this.initLists(), this.activeRow = null, this.$nextTick(() => {
        this.recomputeEssentials(), this.configFinal.defaultSelected && (this.allSelectedCustom = null, this.checkAll(!0));
      });
    },
    config(i) {
      if (typeof i != "object")
        throw "config must be an object";
      this.dynamicConfig || (this.initLists(), this.activeRow = null, this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "CONFIG"), this.configFinal.defaultSelected && this.checkAll(!0));
    },
    activeRow(i, e) {
      const t = this.configFinal.activeClass;
      if (t) {
        if (e !== null) {
          const s = this.$refs["row-highlighted-" + e], l = s && (Array.isArray(s) ? s[0] : s);
          l && l.classList.remove(t);
        }
        if (i !== null) {
          const s = this.$refs["row-highlighted-" + i], l = s && (Array.isArray(s) ? s[0] : s);
          l && l.classList.add(t);
        }
      }
      const n = i !== null && this._visibleRowIndexMap[i] !== void 0 ? this._visibleRowIndexMap[i] : -1;
      this.$emit("active:row", this.rowsFinal[i], "active:row", n);
    }
  },
  methods: {
    setSearchQuery(i) {
      this.query = i;
    },
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
    isColEmpty(i, e = -1) {
      const t = e > -1 ? [e] : this.visibleRowIndexes;
      for (let n = 0; n < t.length; n++) {
        const s = this.rowsFinal[t[n]];
        if (!s)
          continue;
        const o = (s.cells ? s.cells : s)[i];
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
    cellFormatters(i, e) {
      if (typeof this.configFinal.columns[i].cellFormatter == "function") {
        let t = this.configFinal.columns[i].cellFormatter(e);
        return typeof t != "object" && (t = {
          value: t
        }), t;
      }
      return this.valueToString(e.html) ? e.html : this.valueToString(e.text) ? e.text : "";
    },
    _rowCells(i) {
      const e = this.rowsFinal[i];
      return e ? e.cells ? e.cells : e : [];
    },
    _hoverRow(i, e) {
      if (this.hoveredRow !== i) {
        const t = this.configFinal.hoverClass;
        t && this._lastHoveredEl && this._lastHoveredEl.classList.remove(t), this.hoveredRow = i, t && e && e.currentTarget && (e.currentTarget.classList.add(t), this._lastHoveredEl = e.currentTarget);
      }
    },
    recomputeEssentials() {
      this.$nextTick(() => {
        const i = Date.now();
        this.essentialsKey = i, this.generatedUpdatedKey = i;
      });
    },
    initLists() {
      if (this.rowsFinal)
        for (let i = 0; i < this.rowsFinal.length; i++) {
          const e = i.toString();
          typeof this.sortedIndexes[e] == "undefined" && this.$set(this.sortedIndexes, e, i), typeof this.selected[e] == "undefined" && this.$set(this.selected, e, !1), this.configFinal.expandedAll || this.rowsFinal[i].expanded ? this.$set(this.openRows, e, !0) : this.$set(this.openRows, e, !1);
        }
    },
    clearLists(i = !0) {
      i && (this.selected = {}), this.openRows = {}, this.sortedIndexes = {};
    },
    checkKey(i) {
      if (this.activeRow !== null) {
        if (i.keyCode === 40) {
          i.preventDefault();
          const e = this._visibleRowIndexMap[this.activeRow];
          e === void 0 || e === this.visibleRowIndexes.length - 1 ? this.activeRow = 0 : this.activeRow = this.visibleRowIndexes[e + 1];
        }
        if (i.keyCode === 38) {
          i.preventDefault();
          const e = this._visibleRowIndexMap[this.activeRow];
          e === void 0 || e === 0 ? this.activeRow = this.visibleRowIndexes[this.visibleRowIndexes.length - 1] : this.activeRow = this.visibleRowIndexes[e - 1];
        }
      }
    }
  },
  created() {
    if (this._lastHoveredEl = null, this.configFinal.storeState) {
      const t = localStorage.getItem(
        `vue-quintable-${this.identifier}-filters`
      );
      if (t) {
        const r = JSON.parse(t);
        for (let c in this.filters)
          Object.prototype.hasOwnProperty.call(this.filters, c) && !Object.prototype.hasOwnProperty.call(r, c) && (r[c] = this.filters[c]);
        this.$set(this.storedState, "filters", r);
      }
      const n = localStorage.getItem(
        `vue-quintable-${this.identifier}-query`
      );
      n && this.$set(this.storedState, "query", n);
      const s = localStorage.getItem(
        `vue-quintable-${this.identifier}-rows-per-page`
      );
      s && this.$set(this.storedState, "rows-per-page", parseInt(s));
      const l = localStorage.getItem(
        `vue-quintable-${this.identifier}-selected-rows`
      );
      l && this.$set(this.storedState, "selected-rows", JSON.parse(l));
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
    const e = this.configFinal.selectAllRows ? this.rowsFinal.map((t, n) => n) : this.visibleRowIndexes;
    for (let t = 0; t < e.length; t++) {
      let n = this.rowsFinal[t];
      n.selected && this.$set(this.selected, t, !0), n.selected && i++;
    }
    if (!this.configFinal.selectAllRows && i) {
      let t = 0;
      for (let n = 0; n < this.rowsFinal.length; n++)
        !this.rowsFinal[n].disableSelect && this.visibleRows[this.sortedIndexes[n]] && t++;
      i === t && (this.allSelectedCustom = !0);
    } else if (this.configFinal.selectAllRows && i) {
      let t = 0;
      for (let n = 0; n < this.rowsFinal.length; n++)
        this.rowsFinal[n].disableSelect || t++;
      i === t && (this.allSelectedCustom = !0);
    }
    this.initialSearchTerm && (this.query = this.initialSearchTerm), this.storedState.query && (this.query = this.storedState.query), this.storedState["rows-per-page"] && (this.customRowsPerPage = this.storedState["rows-per-page"]), this.storedState["sort-indexes"] && (this.currentSortIndexes = this.storedState["sort-indexes"], this.sort(!0)), this.storedState["current-page"] && this.$nextTick(() => {
      this.currentPage = this.storedState["current-page"];
    }), this.$nextTick(this.checkStoredSelectedRows), this.configFinal.enableRowTabIndex && document.addEventListener("keydown", this.checkKey);
  },
  mounted() {
    this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "MOUNTED"), this.configFinal.defaultSelected && this.checkAll(!0), this._sharedBP = re(), this._sharedBP.subscribe(this._onBreakpointChange);
  },
  beforeDestroy() {
    this._sharedBP && this._sharedBP.unsubscribe(this._onBreakpointChange), this.configFinal.enableRowTabIndex && document.removeEventListener("keydown", this.checkKey);
  }
};
var kt = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "table-wrapper quintable" }, [t("div", { staticClass: "header slot slot-header quintable--header" }, [e._t("header")], 2), t("search-bar", { scopedSlots: e._u([e.$scopedSlots["before-search"] ? { key: "before-search", fn: function() {
    return [e._t("before-search")];
  }, proxy: !0 } : null, e.$scopedSlots.search ? { key: "search", fn: function(n) {
    return [e._t("search", null, null, n)];
  } } : null, e.$scopedSlots["after-search"] ? { key: "after-search", fn: function() {
    return [e._t("after-search")];
  }, proxy: !0 } : null], null, !0) }), t("div", { staticClass: "slot slot-after-search quintable--after-search-container" }, [e._t("after-search-container")], 2), t("div", { ref: "height-wrapper", staticClass: "clearfix quintable--table-container" }, [e.ajaxLoading ? e._e() : t("table", { staticClass: "vue-quintable table quintable--table-container--table", class: e.tableClasses }, [t("table-header"), t("tbody", { staticClass: "quintable--table-container--table--tbody", on: { mouseleave: e.onMouseleaveTable } }, [e._l(e.visibleRowIndexes, function(n) {
    return [e.rowsFinal[n] ? t("tr", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
      placement: "top",
      content: e.rowsFinal[n].tooltip,
      trigger: e.rowsFinal[n].tooltip ? "hover" : "manual",
      offset: 5
    }, expression: `{
              placement: 'top',
              content: rowsFinal[rIndex].tooltip,
              trigger: rowsFinal[rIndex].tooltip ? 'hover' : 'manual',
              offset: 5,
            }` }], key: "vue-quintable-" + e.uuid + "-row-" + n, ref: "row-highlighted-" + n, refInFor: !0, staticClass: "vue-quintable-row quintable--table-container--table--tbody--row", class: e.rowClasses[n], style: e.hiddenColumns[n] > 0 ? "cursor:pointer;" : "", attrs: { id: "vue-quintable-" + e.uuid + "-row-" + n }, on: { click: function(s) {
      return e.onRowClick(s, n);
    }, auxclick: function(s) {
      return e.onRowAuxClick(s, n);
    }, mousedown: function(s) {
      return e.onRowMousedown(s);
    }, mouseenter: function(s) {
      return e._hoverRow(n, s);
    } } }, [e.hasGeneratedRows && !e.configFinal.hideRowToggle ? t("td", { staticClass: "toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td" }, [e.hiddenColumns[n] > 0 ? t("span", [e.openRows[n] ? t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.configFinal.expandedRowIcon } })], 1) : t("span", [t("font-awesome-icon", { attrs: { "fixed-width": "", icon: e.configFinal.collapsedRowIcon } })], 1)]) : e._e()]) : e._e(), e.configFinal.select && e.configFinal.selectPosition === "pre" ? t("td", { staticClass: "select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre", class: {
      "disabled-select": e.rowsFinal[n].disableSelect
    } }, [!e.rowsFinal[n].disableSelect || e.rowsFinal[n].showDisabledSelect ? t("select-checkbox", { attrs: { value: e.selected[n], pretty: e.configFinal.prettySelect, disabled: e.rowsFinal[n].disableSelect }, on: { input: function(s) {
      return e.$set(e.selected, n, s);
    }, change: function(s) {
      return e.checkListener(s, n);
    } } }) : e._e()], 1) : e._e(), e._l(e._renderRows[n], function(s) {
      return [s.vis ? t("td", { directives: [{ name: "tooltip", rawName: "v-tooltip", value: {
        placement: "left",
        content: s.cell.tooltip,
        trigger: s.cell.tooltip ? "hover" : "manual"
      }, expression: `{
                  placement: 'left',
                  content: rc.cell.tooltip,
                  trigger: rc.cell.tooltip ? 'hover' : 'manual',
                }` }], key: s.key, staticClass: "vue-quintable-cell quintable--table-container--table--tbody--row--cell", class: s.cls, attrs: { id: s.key }, on: { click: function(l) {
        return e.onCellClick(l, s.cell);
      }, auxclick: function(l) {
        return e.onCellAuxClick(l, s.cell);
      }, mousedown: function(l) {
        return e.onCellMousedown(l);
      } } }, [e._t("cell-complete", function() {
        return [e._t("cell-content", function() {
          return [s.fmt && s.fmt.type === "html" ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html", domProps: { innerHTML: e._s(s.fmt.value) } }) : s.fmt ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value" }, [e._v(" " + e._s(s.fmt.value) + " ")]) : s.cell.html != null && String(s.cell.html) !== "" ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--html", domProps: { innerHTML: e._s(s.cell.html) } }) : s.cell.component ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--component" }, [t(s.cell.component.name, e._b({ tag: "component", on: { action: e.handleComponentEvent } }, "component", s.cell.component.props, !1))], 1) : s.cell.text != null && String(s.cell.text) !== "" ? t("div", { staticClass: "cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--text" }, [e._v(" " + e._s(s.cell.text) + " ")]) : e._e()];
        }, { cell: s.cell })];
      }, { cell: s.cell })], 2) : e._e()];
    }), e.configFinal.select && e.configFinal.selectPosition === "post" ? t("td", { staticClass: "select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post", class: {
      "disabled-select": e.rowsFinal[n].disableSelect
    } }, [!e.rowsFinal[n].disableSelect || e.rowsFinal[n].showDisabledSelect ? t("select-checkbox", { attrs: { value: e.selected[n], pretty: e.configFinal.prettySelect, disabled: e.rowsFinal[n].disableSelect }, on: { input: function(s) {
      return e.$set(e.selected, n, s);
    }, change: function(s) {
      return e.checkListener(s, n);
    } } }) : e._e()], 1) : e._e()], 2) : e._e(), (e.generatedRows[n] || e.stickyRows[n]) && e.visibleRows[n] ? t("expanded-row", { key: "vue-quintable-" + e.uuid + "-expanded-" + n, attrs: { "r-index": n }, scopedSlots: e._u([e.$scopedSlots["generated-cell-complete"] ? { key: "generated-cell-complete", fn: function({ cell: s }) {
      return [e._t("generated-cell-complete", null, { cell: s })];
    } } : null, e.$scopedSlots["generated-cell-content"] ? { key: "generated-cell-content", fn: function({ cell: s }) {
      return [e._t("generated-cell-content", null, { cell: s })];
    } } : null, e.$scopedSlots["sticky-cell-complete"] ? { key: "sticky-cell-complete", fn: function({ cell: s }) {
      return [e._t("sticky-cell-complete", null, { cell: s })];
    } } : null, e.$scopedSlots["sticky-cell-content"] ? { key: "sticky-cell-content", fn: function({ cell: s }) {
      return [e._t("sticky-cell-content", null, { cell: s })];
    } } : null], null, !0) }) : e._e()];
  })], 2)], 1), e.noRows && !e.ajaxLoading ? [t("div", { staticClass: "clearfix slot-no-results slot quintable--table-container--no-results" }, [e._t("no-results", function() {
    return [t("div", { staticClass: "text-center p-3 quintable--table-container--no-results--results" }, [t("em", { domProps: { innerHTML: e._s(e.configFinal.emptyPlaceholder) } })])];
  }), t("hr")], 2)] : e._e()], 2), e.ajaxLoading ? t("div", { staticClass: "slot-loading slot quintable--loading" }, [e._t("loading", function() {
    return [t("div", { staticClass: "loader-wrapper quintable--loading--loader-wrapper", style: "height:" + e.loaderHeight + "px;" }, [t("div", { staticClass: "loader text-center py-4 quintable--loading--loader-wrapper--loader" }, [t("font-awesome-icon", { staticClass: "ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader", attrs: { icon: "circle-notch", spin: "" } })], 1)])];
  })], 2) : e._e(), t("pagination-footer"), t("div", { staticClass: "footer slot slot-footer quintable--footer" }, [e._t("footer")], 2)], 1);
}, Pt = [], Ot = /* @__PURE__ */ S(
  Rt,
  kt,
  Pt,
  !1,
  null,
  "6e222ec7",
  null,
  null
);
const ue = Ot.exports;
_.add(ge);
_.add(me);
_.add(be);
_.add(we);
_.add(ye);
_.add(_e);
_.add(ve);
_.add(Se);
_.add(xe);
_.add(Ce);
_.add(Fe);
_.add(qe);
_.add(Re);
_.add(ke);
_.add(Pe);
_.add(Oe);
_.add($e);
_.add(je);
_.add(Ie);
let O = function(i, e) {
  O.installed || (O.installed = !0, i.component("v-select", fe), i.component("p-check", Le), i.component("font-awesome-icon", de), i.component("VueQuintable", ue), i.use(pe, {
    defaultTemplate: '<div class="quintable-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    defaultClass: ""
  }), e && e.axios && (i.prototype.$globalVueQuintableaxios = e.axios));
};
const $t = {
  install: O
};
let $ = null;
typeof window != "undefined" ? $ = window.Vue : typeof global != "undefined" && ($ = global.Vue);
$ && $.use($t);
const Mt = {
  VueQuintable: ue,
  install: O
};
export {
  Mt as default
};
//# sourceMappingURL=vue-quintable.es.js.map
