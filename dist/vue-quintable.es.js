var us = Object.defineProperty, hs = Object.defineProperties;
var fs = Object.getOwnPropertyDescriptors;
var mt = Object.getOwnPropertySymbols;
var ds = Object.prototype.hasOwnProperty, gs = Object.prototype.propertyIsEnumerable;
var ae = (e, t) => (t = Symbol[e]) ? t : Symbol.for("Symbol." + e), ps = (e) => {
  throw TypeError(e);
};
var Qe = (e, t, s) => t in e ? us(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, Z = (e, t) => {
  for (var s in t || (t = {}))
    ds.call(t, s) && Qe(e, s, t[s]);
  if (mt)
    for (var s of mt(t))
      gs.call(t, s) && Qe(e, s, t[s]);
  return e;
}, bt = (e, t) => hs(e, fs(t));
var ve = (e, t, s) => Qe(e, typeof t != "symbol" ? t + "" : t, s);
var te = (e, t, s) => new Promise((i, r) => {
  var n = (f) => {
    try {
      a(s.next(f));
    } catch (u) {
      r(u);
    }
  }, l = (f) => {
    try {
      a(s.throw(f));
    } catch (u) {
      r(u);
    }
  }, a = (f) => f.done ? i(f.value) : Promise.resolve(f.value).then(n, l);
  a((s = s.apply(e, t)).next());
}), se = function(e, t) {
  this[0] = e, this[1] = t;
}, Xe = (e, t, s) => {
  var i = (l, a, f, u) => {
    try {
      var o = s[l](a), c = (a = o.value) instanceof se, g = o.done;
      Promise.resolve(c ? a[0] : a).then((S) => c ? i(l === "return" ? l : "next", a[1] ? { done: S.done, value: S.value } : S, f, u) : f({ value: S, done: g })).catch((S) => i("throw", S, f, u));
    } catch (S) {
      u(S);
    }
  }, r = (l) => n[l] = (a) => new Promise((f, u) => i(l, a, f, u)), n = {};
  return s = s.apply(e, t), n[ae("asyncIterator")] = () => n, r("next"), r("throw"), r("return"), n;
}, Ze = (e) => {
  var t = e[ae("asyncIterator")], s = !1, i, r = {};
  return t == null ? (t = e[ae("iterator")](), i = (n) => r[n] = (l) => t[n](l)) : (t = t.call(e), i = (n) => r[n] = (l) => {
    if (s) {
      if (s = !1, n === "throw") throw l;
      return l;
    }
    return s = !0, {
      done: !1,
      value: new se(new Promise((a) => {
        var f = t[n](l);
        f instanceof Object || ps("Object expected"), a(f);
      }), 1)
    };
  }), r[ae("iterator")] = () => r, i("next"), "throw" in t ? i("throw") : r.throw = (n) => {
    throw n;
  }, "return" in t && i("return"), r;
}, wt = (e, t, s) => (t = e[ae("asyncIterator")]) ? t.call(e) : (e = e[ae("iterator")](), t = {}, s = (i, r) => (r = e[i]) && (t[i] = (n) => new Promise((l, a, f) => (n = r.call(e, n), f = n.done, Promise.resolve(n.value).then((u) => l({ value: u, done: f }), a)))), s("next"), s("return"), t);
import Dt from "floating-vue";
import { library as ms } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as bs } from "@fortawesome/vue-fontawesome";
import { faChevronUp as ws, faChevronDown as ys, faInfoCircle as Ss, faAngleDoubleLeft as Rs, faAngleDoubleRight as Fs, faAngleLeft as ks, faAngleRight as Cs, faArrowsAlt as _s, faExpand as xs, faSort as Os, faSortAmountDown as vs, faSortAmountDownAlt as Ps, faSortAmountUp as Es, faSortAmountUpAlt as As, faTimes as Ts, faCheck as qs, faSquare as js, faCircleNotch as Ls, faPlus as Us, faCaretUp as Bs } from "@fortawesome/free-solid-svg-icons";
import { createElementBlock as p, openBlock as d, normalizeClass as _, createElementVNode as R, createCommentVNode as y, renderSlot as v, resolveComponent as Ye, resolveDirective as Ns, withDirectives as W, vModelText as Vs, Fragment as U, createBlock as P, withCtx as ce, vModelCheckbox as Pe, renderList as ue, withModifiers as he, toDisplayString as q, createVNode as B, normalizeStyle as yt, resolveDynamicComponent as $e, mergeProps as et, createTextVNode as St } from "vue";
import Is from "vue-select";
import Rt from "fuzzy.js";
ms.add(
  ws,
  ys,
  Ss,
  Rs,
  Fs,
  ks,
  Cs,
  _s,
  xs,
  Os,
  vs,
  Ps,
  Es,
  As,
  Ts,
  qs,
  js,
  Ls,
  Us,
  Bs
);
function Ds(e) {
  e.component("QuintableFontAwesomeIcon", bs);
}
const ct = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, r] of t)
    s[i] = r;
  return s;
}, Ms = {
  name: "PrettyCheckbox",
  props: {
    type: {
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
}, Hs = ["name", "value", "checked", "disabled", "required"];
function zs(e, t, s, i, r, n) {
  return d(), p("div", {
    class: _(n.classes)
  }, [
    R("input", {
      ref: "input",
      type: "checkbox",
      name: s.name,
      value: s.value,
      checked: n.shouldBeChecked,
      disabled: n._disabled,
      required: n._required,
      onChange: t[0] || (t[0] = (...l) => n.updateInput && n.updateInput(...l))
    }, null, 40, Hs),
    R("div", {
      class: _(n.onClasses)
    }, [
      v(e.$slots, "extra", {}, void 0, !0),
      R("label", null, [
        v(e.$slots, "default", {}, void 0, !0)
      ])
    ], 2),
    n._toggle ? (d(), p("div", {
      key: 0,
      class: _(n.offClasses)
    }, [
      v(e.$slots, "off-extra", {}, void 0, !0),
      v(e.$slots, "off-label", {}, void 0, !0)
    ], 2)) : y("", !0),
    n._hover ? (d(), p("div", {
      key: 1,
      class: _(n.hoverClasses)
    }, [
      v(e.$slots, "hover-extra", {}, void 0, !0),
      v(e.$slots, "hover-label", {}, void 0, !0)
    ], 2)) : y("", !0),
    n._indeterminate ? (d(), p("div", {
      key: 2,
      class: _(n.indeterminateClasses)
    }, [
      v(e.$slots, "indeterminate-extra", {}, void 0, !0),
      v(e.$slots, "indeterminate-label", {}, void 0, !0)
    ], 2)) : y("", !0)
  ], 2);
}
const Gs = /* @__PURE__ */ ct(Ms, [["render", zs], ["__scopeId", "data-v-bf32dad5"]]), Js = {
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
}, Ks = ["name", "value", "checked", "disabled", "required"];
function Ws(e, t, s, i, r, n) {
  return d(), p("div", {
    class: _(n.classes)
  }, [
    R("input", {
      ref: "input",
      type: "radio",
      name: s.name,
      value: s.value,
      checked: n.shouldBeChecked,
      disabled: n._disabled,
      required: n._required,
      onChange: t[0] || (t[0] = (...l) => n.updateInput && n.updateInput(...l))
    }, null, 40, Ks),
    R("div", {
      class: _(n.onClasses)
    }, [
      v(e.$slots, "extra"),
      R("label", null, [
        v(e.$slots, "default")
      ])
    ], 2),
    n._toggle ? (d(), p("div", {
      key: 0,
      class: _(n.offClasses)
    }, [
      v(e.$slots, "off-extra"),
      v(e.$slots, "off-label")
    ], 2)) : y("", !0),
    n._hover ? (d(), p("div", {
      key: 1,
      class: _(n.hoverClasses)
    }, [
      v(e.$slots, "hover-extra"),
      v(e.$slots, "hover-label")
    ], 2)) : y("", !0)
  ], 2);
}
const Qs = /* @__PURE__ */ ct(Js, [["render", Ws]]);
function Xs(e) {
  e.component("QuintablePCheck", Gs), e.component("QuintablePRadio", Qs), e.component("QuintableVSelect", Is);
}
function Zs(e) {
  e.use(Dt, {
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
function Mt(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Ys } = Object.prototype, { getPrototypeOf: ut } = Object, { iterator: Ne, toStringTag: Ht } = Symbol, Ve = /* @__PURE__ */ ((e) => (t) => {
  const s = Ys.call(t);
  return e[s] || (e[s] = s.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), G = (e) => (e = e.toLowerCase(), (t) => Ve(t) === e), Ie = (e) => (t) => typeof t === e, { isArray: de } = Array, fe = Ie("undefined");
function Re(e) {
  return e !== null && !fe(e) && e.constructor !== null && !fe(e.constructor) && V(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const zt = G("ArrayBuffer");
function $s(e) {
  let t;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && zt(e.buffer), t;
}
const en = Ie("string"), V = Ie("function"), Gt = Ie("number"), Fe = (e) => e !== null && typeof e == "object", tn = (e) => e === !0 || e === !1, qe = (e) => {
  if (Ve(e) !== "object")
    return !1;
  const t = ut(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Ht in e) && !(Ne in e);
}, sn = (e) => {
  if (!Fe(e) || Re(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch (t) {
    return !1;
  }
}, nn = G("Date"), rn = G("File"), ln = (e) => !!(e && typeof e.uri != "undefined"), on = (e) => e && typeof e.getParts != "undefined", an = G("Blob"), cn = G("FileList"), un = (e) => Fe(e) && V(e.pipe);
function hn() {
  return typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {};
}
const Ft = hn(), kt = typeof Ft.FormData != "undefined" ? Ft.FormData : void 0, fn = (e) => {
  let t;
  return e && (kt && e instanceof kt || V(e.append) && ((t = Ve(e)) === "formdata" || // detect form-data instance
  t === "object" && V(e.toString) && e.toString() === "[object FormData]"));
}, dn = G("URLSearchParams"), [gn, pn, mn, bn] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(G), wn = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ke(e, t, { allOwnKeys: s = !1 } = {}) {
  if (e === null || typeof e == "undefined")
    return;
  let i, r;
  if (typeof e != "object" && (e = [e]), de(e))
    for (i = 0, r = e.length; i < r; i++)
      t.call(null, e[i], i, e);
  else {
    if (Re(e))
      return;
    const n = s ? Object.getOwnPropertyNames(e) : Object.keys(e), l = n.length;
    let a;
    for (i = 0; i < l; i++)
      a = n[i], t.call(null, e[a], a, e);
  }
}
function Jt(e, t) {
  if (Re(e))
    return null;
  t = t.toLowerCase();
  const s = Object.keys(e);
  let i = s.length, r;
  for (; i-- > 0; )
    if (r = s[i], t === r.toLowerCase())
      return r;
  return null;
}
const ne = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global, Kt = (e) => !fe(e) && e !== ne;
function rt() {
  const { caseless: e, skipUndefined: t } = Kt(this) && this || {}, s = {}, i = (r, n) => {
    if (n === "__proto__" || n === "constructor" || n === "prototype")
      return;
    const l = e && Jt(s, n) || n;
    qe(s[l]) && qe(r) ? s[l] = rt(s[l], r) : qe(r) ? s[l] = rt({}, r) : de(r) ? s[l] = r.slice() : (!t || !fe(r)) && (s[l] = r);
  };
  for (let r = 0, n = arguments.length; r < n; r++)
    arguments[r] && ke(arguments[r], i);
  return s;
}
const yn = (e, t, s, { allOwnKeys: i } = {}) => (ke(
  t,
  (r, n) => {
    s && V(r) ? Object.defineProperty(e, n, {
      value: Mt(r, s),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(e, n, {
      value: r,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: i }
), e), Sn = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Rn = (e, t, s, i) => {
  e.prototype = Object.create(t.prototype, i), Object.defineProperty(e.prototype, "constructor", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    value: t.prototype
  }), s && Object.assign(e.prototype, s);
}, Fn = (e, t, s, i) => {
  let r, n, l;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), n = r.length; n-- > 0; )
      l = r[n], (!i || i(l, e, t)) && !a[l] && (t[l] = e[l], a[l] = !0);
    e = s !== !1 && ut(e);
  } while (e && (!s || s(e, t)) && e !== Object.prototype);
  return t;
}, kn = (e, t, s) => {
  e = String(e), (s === void 0 || s > e.length) && (s = e.length), s -= t.length;
  const i = e.indexOf(t, s);
  return i !== -1 && i === s;
}, Cn = (e) => {
  if (!e) return null;
  if (de(e)) return e;
  let t = e.length;
  if (!Gt(t)) return null;
  const s = new Array(t);
  for (; t-- > 0; )
    s[t] = e[t];
  return s;
}, _n = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array != "undefined" && ut(Uint8Array)), xn = (e, t) => {
  const i = (e && e[Ne]).call(e);
  let r;
  for (; (r = i.next()) && !r.done; ) {
    const n = r.value;
    t.call(e, n[0], n[1]);
  }
}, On = (e, t) => {
  let s;
  const i = [];
  for (; (s = e.exec(t)) !== null; )
    i.push(s);
  return i;
}, vn = G("HTMLFormElement"), Pn = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(s, i, r) {
  return i.toUpperCase() + r;
}), Ct = (({ hasOwnProperty: e }) => (t, s) => e.call(t, s))(Object.prototype), En = G("RegExp"), Wt = (e, t) => {
  const s = Object.getOwnPropertyDescriptors(e), i = {};
  ke(s, (r, n) => {
    let l;
    (l = t(r, n, e)) !== !1 && (i[n] = l || r);
  }), Object.defineProperties(e, i);
}, An = (e) => {
  Wt(e, (t, s) => {
    if (V(e) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
      return !1;
    const i = e[s];
    if (V(i)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + s + "'");
      });
    }
  });
}, Tn = (e, t) => {
  const s = {}, i = (r) => {
    r.forEach((n) => {
      s[n] = !0;
    });
  };
  return de(e) ? i(e) : i(String(e).split(t)), s;
}, qn = () => {
}, jn = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Ln(e) {
  return !!(e && V(e.append) && e[Ht] === "FormData" && e[Ne]);
}
const Un = (e) => {
  const t = new Array(10), s = (i, r) => {
    if (Fe(i)) {
      if (t.indexOf(i) >= 0)
        return;
      if (Re(i))
        return i;
      if (!("toJSON" in i)) {
        t[r] = i;
        const n = de(i) ? [] : {};
        return ke(i, (l, a) => {
          const f = s(l, r + 1);
          !fe(f) && (n[a] = f);
        }), t[r] = void 0, n;
      }
    }
    return i;
  };
  return s(e, 0);
}, Bn = G("AsyncFunction"), Nn = (e) => e && (Fe(e) || V(e)) && V(e.then) && V(e.catch), Qt = ((e, t) => e ? setImmediate : t ? ((s, i) => (ne.addEventListener(
  "message",
  ({ source: r, data: n }) => {
    r === ne && n === s && i.length && i.shift()();
  },
  !1
), (r) => {
  i.push(r), ne.postMessage(s, "*");
}))(`axios@${Math.random()}`, []) : (s) => setTimeout(s))(typeof setImmediate == "function", V(ne.postMessage)), Vn = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(ne) : typeof process != "undefined" && process.nextTick || Qt, In = (e) => e != null && V(e[Ne]), h = {
  isArray: de,
  isArrayBuffer: zt,
  isBuffer: Re,
  isFormData: fn,
  isArrayBufferView: $s,
  isString: en,
  isNumber: Gt,
  isBoolean: tn,
  isObject: Fe,
  isPlainObject: qe,
  isEmptyObject: sn,
  isReadableStream: gn,
  isRequest: pn,
  isResponse: mn,
  isHeaders: bn,
  isUndefined: fe,
  isDate: nn,
  isFile: rn,
  isReactNativeBlob: ln,
  isReactNative: on,
  isBlob: an,
  isRegExp: En,
  isFunction: V,
  isStream: un,
  isURLSearchParams: dn,
  isTypedArray: _n,
  isFileList: cn,
  forEach: ke,
  merge: rt,
  extend: yn,
  trim: wn,
  stripBOM: Sn,
  inherits: Rn,
  toFlatObject: Fn,
  kindOf: Ve,
  kindOfTest: G,
  endsWith: kn,
  toArray: Cn,
  forEachEntry: xn,
  matchAll: On,
  isHTMLForm: vn,
  hasOwnProperty: Ct,
  hasOwnProp: Ct,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Wt,
  freezeMethods: An,
  toObjectSet: Tn,
  toCamelCase: Pn,
  noop: qn,
  toFiniteNumber: jn,
  findKey: Jt,
  global: ne,
  isContextDefined: Kt,
  isSpecCompliantForm: Ln,
  toJSONObject: Un,
  isAsyncFn: Bn,
  isThenable: Nn,
  setImmediate: Qt,
  asap: Vn,
  isIterable: In
};
let k = class Xt extends Error {
  static from(t, s, i, r, n, l) {
    const a = new Xt(t.message, s || t.code, i, r, n);
    return a.cause = t, a.name = t.name, t.status != null && a.status == null && (a.status = t.status), l && Object.assign(a, l), a;
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
  constructor(t, s, i, r, n) {
    super(t), Object.defineProperty(this, "message", {
      value: t,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }), this.name = "AxiosError", this.isAxiosError = !0, s && (this.code = s), i && (this.config = i), r && (this.request = r), n && (this.response = n, this.status = n.status);
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
};
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
const Dn = null;
function lt(e) {
  return h.isPlainObject(e) || h.isArray(e);
}
function Zt(e) {
  return h.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function tt(e, t, s) {
  return e ? e.concat(t).map(function(r, n) {
    return r = Zt(r), !s && n ? "[" + r + "]" : r;
  }).join(s ? "." : "") : t;
}
function Mn(e) {
  return h.isArray(e) && !e.some(lt);
}
const Hn = h.toFlatObject(h, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function De(e, t, s) {
  if (!h.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), s = h.toFlatObject(
    s,
    {
      metaTokens: !0,
      dots: !1,
      indexes: !1
    },
    !1,
    function(w, b) {
      return !h.isUndefined(b[w]);
    }
  );
  const i = s.metaTokens, r = s.visitor || o, n = s.dots, l = s.indexes, f = (s.Blob || typeof Blob != "undefined" && Blob) && h.isSpecCompliantForm(t);
  if (!h.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(m) {
    if (m === null) return "";
    if (h.isDate(m))
      return m.toISOString();
    if (h.isBoolean(m))
      return m.toString();
    if (!f && h.isBlob(m))
      throw new k("Blob is not supported. Use a Buffer instead.");
    return h.isArrayBuffer(m) || h.isTypedArray(m) ? f && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function o(m, w, b) {
    let O = m;
    if (h.isReactNative(t) && h.isReactNativeBlob(m))
      return t.append(tt(b, w, n), u(m)), !1;
    if (m && !b && typeof m == "object") {
      if (h.endsWith(w, "{}"))
        w = i ? w : w.slice(0, -2), m = JSON.stringify(m);
      else if (h.isArray(m) && Mn(m) || (h.isFileList(m) || h.endsWith(w, "[]")) && (O = h.toArray(m)))
        return w = Zt(w), O.forEach(function(C, A) {
          !(h.isUndefined(C) || C === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            l === !0 ? tt([w], A, n) : l === null ? w : w + "[]",
            u(C)
          );
        }), !1;
    }
    return lt(m) ? !0 : (t.append(tt(b, w, n), u(m)), !1);
  }
  const c = [], g = Object.assign(Hn, {
    defaultVisitor: o,
    convertValue: u,
    isVisitable: lt
  });
  function S(m, w) {
    if (!h.isUndefined(m)) {
      if (c.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + w.join("."));
      c.push(m), h.forEach(m, function(O, x) {
        (!(h.isUndefined(O) || O === null) && r.call(t, O, h.isString(x) ? x.trim() : x, w, g)) === !0 && S(O, w ? w.concat(x) : [x]);
      }), c.pop();
    }
  }
  if (!h.isObject(e))
    throw new TypeError("data must be an object");
  return S(e), t;
}
function _t(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(i) {
    return t[i];
  });
}
function ht(e, t) {
  this._pairs = [], e && De(e, this, t);
}
const Yt = ht.prototype;
Yt.append = function(t, s) {
  this._pairs.push([t, s]);
};
Yt.toString = function(t) {
  const s = t ? function(i) {
    return t.call(this, i, _t);
  } : _t;
  return this._pairs.map(function(r) {
    return s(r[0]) + "=" + s(r[1]);
  }, "").join("&");
};
function zn(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function $t(e, t, s) {
  if (!t)
    return e;
  const i = s && s.encode || zn, r = h.isFunction(s) ? {
    serialize: s
  } : s, n = r && r.serialize;
  let l;
  if (n ? l = n(t, r) : l = h.isURLSearchParams(t) ? t.toString() : new ht(t, r).toString(i), l) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + l;
  }
  return e;
}
class xt {
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
  use(t, s, i) {
    return this.handlers.push({
      fulfilled: t,
      rejected: s,
      synchronous: i ? i.synchronous : !1,
      runWhen: i ? i.runWhen : null
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
    h.forEach(this.handlers, function(i) {
      i !== null && t(i);
    });
  }
}
const ft = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, Gn = typeof URLSearchParams != "undefined" ? URLSearchParams : ht, Jn = typeof FormData != "undefined" ? FormData : null, Kn = typeof Blob != "undefined" ? Blob : null, Wn = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Gn,
    FormData: Jn,
    Blob: Kn
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, dt = typeof window != "undefined" && typeof document != "undefined", ot = typeof navigator == "object" && navigator || void 0, Qn = dt && (!ot || ["ReactNative", "NativeScript", "NS"].indexOf(ot.product) < 0), Xn = typeof WorkerGlobalScope != "undefined" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Zn = dt && window.location.href || "http://localhost", Yn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: dt,
  hasStandardBrowserEnv: Qn,
  hasStandardBrowserWebWorkerEnv: Xn,
  navigator: ot,
  origin: Zn
}, Symbol.toStringTag, { value: "Module" })), j = Z(Z({}, Yn), Wn);
function $n(e, t) {
  return De(e, new j.classes.URLSearchParams(), Z({
    visitor: function(s, i, r, n) {
      return j.isNode && h.isBuffer(s) ? (this.append(i, s.toString("base64")), !1) : n.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function ei(e) {
  return h.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function ti(e) {
  const t = {}, s = Object.keys(e);
  let i;
  const r = s.length;
  let n;
  for (i = 0; i < r; i++)
    n = s[i], t[n] = e[n];
  return t;
}
function es(e) {
  function t(s, i, r, n) {
    let l = s[n++];
    if (l === "__proto__") return !0;
    const a = Number.isFinite(+l), f = n >= s.length;
    return l = !l && h.isArray(r) ? r.length : l, f ? (h.hasOwnProp(r, l) ? r[l] = [r[l], i] : r[l] = i, !a) : ((!r[l] || !h.isObject(r[l])) && (r[l] = []), t(s, i, r[l], n) && h.isArray(r[l]) && (r[l] = ti(r[l])), !a);
  }
  if (h.isFormData(e) && h.isFunction(e.entries)) {
    const s = {};
    return h.forEachEntry(e, (i, r) => {
      t(ei(i), r, s, 0);
    }), s;
  }
  return null;
}
function si(e, t, s) {
  if (h.isString(e))
    try {
      return (t || JSON.parse)(e), h.trim(e);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (s || JSON.stringify)(e);
}
const Ce = {
  transitional: ft,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function(t, s) {
      const i = s.getContentType() || "", r = i.indexOf("application/json") > -1, n = h.isObject(t);
      if (n && h.isHTMLForm(t) && (t = new FormData(t)), h.isFormData(t))
        return r ? JSON.stringify(es(t)) : t;
      if (h.isArrayBuffer(t) || h.isBuffer(t) || h.isStream(t) || h.isFile(t) || h.isBlob(t) || h.isReadableStream(t))
        return t;
      if (h.isArrayBufferView(t))
        return t.buffer;
      if (h.isURLSearchParams(t))
        return s.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
      let a;
      if (n) {
        if (i.indexOf("application/x-www-form-urlencoded") > -1)
          return $n(t, this.formSerializer).toString();
        if ((a = h.isFileList(t)) || i.indexOf("multipart/form-data") > -1) {
          const f = this.env && this.env.FormData;
          return De(
            a ? { "files[]": t } : t,
            f && new f(),
            this.formSerializer
          );
        }
      }
      return n || r ? (s.setContentType("application/json", !1), si(t)) : t;
    }
  ],
  transformResponse: [
    function(t) {
      const s = this.transitional || Ce.transitional, i = s && s.forcedJSONParsing, r = this.responseType === "json";
      if (h.isResponse(t) || h.isReadableStream(t))
        return t;
      if (t && h.isString(t) && (i && !this.responseType || r)) {
        const l = !(s && s.silentJSONParsing) && r;
        try {
          return JSON.parse(t, this.parseReviver);
        } catch (a) {
          if (l)
            throw a.name === "SyntaxError" ? k.from(a, k.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
    FormData: j.classes.FormData,
    Blob: j.classes.Blob
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
h.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Ce.headers[e] = {};
});
const ni = h.toObjectSet([
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
]), ii = (e) => {
  const t = {};
  let s, i, r;
  return e && e.split(`
`).forEach(function(l) {
    r = l.indexOf(":"), s = l.substring(0, r).trim().toLowerCase(), i = l.substring(r + 1).trim(), !(!s || t[s] && ni[s]) && (s === "set-cookie" ? t[s] ? t[s].push(i) : t[s] = [i] : t[s] = t[s] ? t[s] + ", " + i : i);
  }), t;
}, Ot = Symbol("internals");
function Se(e) {
  return e && String(e).trim().toLowerCase();
}
function je(e) {
  return e === !1 || e == null ? e : h.isArray(e) ? e.map(je) : String(e);
}
function ri(e) {
  const t = /* @__PURE__ */ Object.create(null), s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = s.exec(e); )
    t[i[1]] = i[2];
  return t;
}
const li = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function st(e, t, s, i, r) {
  if (h.isFunction(i))
    return i.call(this, t, s);
  if (r && (t = s), !!h.isString(t)) {
    if (h.isString(i))
      return t.indexOf(i) !== -1;
    if (h.isRegExp(i))
      return i.test(t);
  }
}
function oi(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, s, i) => s.toUpperCase() + i);
}
function ai(e, t) {
  const s = h.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(e, i + s, {
      value: function(r, n, l) {
        return this[i].call(this, t, r, n, l);
      },
      configurable: !0
    });
  });
}
let I = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, s, i) {
    const r = this;
    function n(a, f, u) {
      const o = Se(f);
      if (!o)
        throw new Error("header name must be a non-empty string");
      const c = h.findKey(r, o);
      (!c || r[c] === void 0 || u === !0 || u === void 0 && r[c] !== !1) && (r[c || f] = je(a));
    }
    const l = (a, f) => h.forEach(a, (u, o) => n(u, o, f));
    if (h.isPlainObject(t) || t instanceof this.constructor)
      l(t, s);
    else if (h.isString(t) && (t = t.trim()) && !li(t))
      l(ii(t), s);
    else if (h.isObject(t) && h.isIterable(t)) {
      let a = {}, f, u;
      for (const o of t) {
        if (!h.isArray(o))
          throw TypeError("Object iterator must return a key-value pair");
        a[u = o[0]] = (f = a[u]) ? h.isArray(f) ? [...f, o[1]] : [f, o[1]] : o[1];
      }
      l(a, s);
    } else
      t != null && n(s, t, i);
    return this;
  }
  get(t, s) {
    if (t = Se(t), t) {
      const i = h.findKey(this, t);
      if (i) {
        const r = this[i];
        if (!s)
          return r;
        if (s === !0)
          return ri(r);
        if (h.isFunction(s))
          return s.call(this, r, i);
        if (h.isRegExp(s))
          return s.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, s) {
    if (t = Se(t), t) {
      const i = h.findKey(this, t);
      return !!(i && this[i] !== void 0 && (!s || st(this, this[i], i, s)));
    }
    return !1;
  }
  delete(t, s) {
    const i = this;
    let r = !1;
    function n(l) {
      if (l = Se(l), l) {
        const a = h.findKey(i, l);
        a && (!s || st(i, i[a], a, s)) && (delete i[a], r = !0);
      }
    }
    return h.isArray(t) ? t.forEach(n) : n(t), r;
  }
  clear(t) {
    const s = Object.keys(this);
    let i = s.length, r = !1;
    for (; i--; ) {
      const n = s[i];
      (!t || st(this, this[n], n, t, !0)) && (delete this[n], r = !0);
    }
    return r;
  }
  normalize(t) {
    const s = this, i = {};
    return h.forEach(this, (r, n) => {
      const l = h.findKey(i, n);
      if (l) {
        s[l] = je(r), delete s[n];
        return;
      }
      const a = t ? oi(n) : String(n).trim();
      a !== n && delete s[n], s[a] = je(r), i[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const s = /* @__PURE__ */ Object.create(null);
    return h.forEach(this, (i, r) => {
      i != null && i !== !1 && (s[r] = t && h.isArray(i) ? i.join(", ") : i);
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
    const i = new this(t);
    return s.forEach((r) => i.set(r)), i;
  }
  static accessor(t) {
    const i = (this[Ot] = this[Ot] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function n(l) {
      const a = Se(l);
      i[a] || (ai(r, l), i[a] = !0);
    }
    return h.isArray(t) ? t.forEach(n) : n(t), this;
  }
};
I.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
h.reduceDescriptors(I.prototype, ({ value: e }, t) => {
  let s = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(i) {
      this[s] = i;
    }
  };
});
h.freezeMethods(I);
function nt(e, t) {
  const s = this || Ce, i = t || s, r = I.from(i.headers);
  let n = i.data;
  return h.forEach(e, function(a) {
    n = a.call(s, n, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), n;
}
function ts(e) {
  return !!(e && e.__CANCEL__);
}
let _e = class extends k {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(t, s, i) {
    super(t == null ? "canceled" : t, k.ERR_CANCELED, s, i), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function ss(e, t, s) {
  const i = s.config.validateStatus;
  !s.status || !i || i(s.status) ? e(s) : t(
    new k(
      "Request failed with status code " + s.status,
      [k.ERR_BAD_REQUEST, k.ERR_BAD_RESPONSE][Math.floor(s.status / 100) - 4],
      s.config,
      s.request,
      s
    )
  );
}
function ci(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function ui(e, t) {
  e = e || 10;
  const s = new Array(e), i = new Array(e);
  let r = 0, n = 0, l;
  return t = t !== void 0 ? t : 1e3, function(f) {
    const u = Date.now(), o = i[n];
    l || (l = u), s[r] = f, i[r] = u;
    let c = n, g = 0;
    for (; c !== r; )
      g += s[c++], c = c % e;
    if (r = (r + 1) % e, r === n && (n = (n + 1) % e), u - l < t)
      return;
    const S = o && u - o;
    return S ? Math.round(g * 1e3 / S) : void 0;
  };
}
function hi(e, t) {
  let s = 0, i = 1e3 / t, r, n;
  const l = (u, o = Date.now()) => {
    s = o, r = null, n && (clearTimeout(n), n = null), e(...u);
  };
  return [(...u) => {
    const o = Date.now(), c = o - s;
    c >= i ? l(u, o) : (r = u, n || (n = setTimeout(() => {
      n = null, l(r);
    }, i - c)));
  }, () => r && l(r)];
}
const Be = (e, t, s = 3) => {
  let i = 0;
  const r = ui(50, 250);
  return hi((n) => {
    const l = n.loaded, a = n.lengthComputable ? n.total : void 0, f = l - i, u = r(f), o = l <= a;
    i = l;
    const c = {
      loaded: l,
      total: a,
      progress: a ? l / a : void 0,
      bytes: f,
      rate: u || void 0,
      estimated: u && a && o ? (a - l) / u : void 0,
      event: n,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(c);
  }, s);
}, vt = (e, t) => {
  const s = e != null;
  return [
    (i) => t[0]({
      lengthComputable: s,
      total: e,
      loaded: i
    }),
    t[1]
  ];
}, Pt = (e) => (...t) => h.asap(() => e(...t)), fi = j.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (s) => (s = new URL(s, j.origin), e.protocol === s.protocol && e.host === s.host && (t || e.port === s.port)))(
  new URL(j.origin),
  j.navigator && /(msie|trident)/i.test(j.navigator.userAgent)
) : () => !0, di = j.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, s, i, r, n, l) {
      if (typeof document == "undefined") return;
      const a = [`${e}=${encodeURIComponent(t)}`];
      h.isNumber(s) && a.push(`expires=${new Date(s).toUTCString()}`), h.isString(i) && a.push(`path=${i}`), h.isString(r) && a.push(`domain=${r}`), n === !0 && a.push("secure"), h.isString(l) && a.push(`SameSite=${l}`), document.cookie = a.join("; ");
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
function gi(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function pi(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ns(e, t, s) {
  let i = !gi(t);
  return e && (i || s == !1) ? pi(e, t) : t;
}
const Et = (e) => e instanceof I ? Z({}, e) : e;
function re(e, t) {
  t = t || {};
  const s = {};
  function i(u, o, c, g) {
    return h.isPlainObject(u) && h.isPlainObject(o) ? h.merge.call({ caseless: g }, u, o) : h.isPlainObject(o) ? h.merge({}, o) : h.isArray(o) ? o.slice() : o;
  }
  function r(u, o, c, g) {
    if (h.isUndefined(o)) {
      if (!h.isUndefined(u))
        return i(void 0, u, c, g);
    } else return i(u, o, c, g);
  }
  function n(u, o) {
    if (!h.isUndefined(o))
      return i(void 0, o);
  }
  function l(u, o) {
    if (h.isUndefined(o)) {
      if (!h.isUndefined(u))
        return i(void 0, u);
    } else return i(void 0, o);
  }
  function a(u, o, c) {
    if (c in t)
      return i(u, o);
    if (c in e)
      return i(void 0, u);
  }
  const f = {
    url: n,
    method: n,
    data: n,
    baseURL: l,
    transformRequest: l,
    transformResponse: l,
    paramsSerializer: l,
    timeout: l,
    timeoutMessage: l,
    withCredentials: l,
    withXSRFToken: l,
    adapter: l,
    responseType: l,
    xsrfCookieName: l,
    xsrfHeaderName: l,
    onUploadProgress: l,
    onDownloadProgress: l,
    decompress: l,
    maxContentLength: l,
    maxBodyLength: l,
    beforeRedirect: l,
    transport: l,
    httpAgent: l,
    httpsAgent: l,
    cancelToken: l,
    socketPath: l,
    responseEncoding: l,
    validateStatus: a,
    headers: (u, o, c) => r(Et(u), Et(o), c, !0)
  };
  return h.forEach(Object.keys(Z(Z({}, e), t)), function(o) {
    if (o === "__proto__" || o === "constructor" || o === "prototype") return;
    const c = h.hasOwnProp(f, o) ? f[o] : r, g = c(e[o], t[o], o);
    h.isUndefined(g) && c !== a || (s[o] = g);
  }), s;
}
const is = (e) => {
  const t = re({}, e);
  let { data: s, withXSRFToken: i, xsrfHeaderName: r, xsrfCookieName: n, headers: l, auth: a } = t;
  if (t.headers = l = I.from(l), t.url = $t(
    ns(t.baseURL, t.url, t.allowAbsoluteUrls),
    e.params,
    e.paramsSerializer
  ), a && l.set(
    "Authorization",
    "Basic " + btoa(
      (a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : "")
    )
  ), h.isFormData(s)) {
    if (j.hasStandardBrowserEnv || j.hasStandardBrowserWebWorkerEnv)
      l.setContentType(void 0);
    else if (h.isFunction(s.getHeaders)) {
      const f = s.getHeaders(), u = ["content-type", "content-length"];
      Object.entries(f).forEach(([o, c]) => {
        u.includes(o.toLowerCase()) && l.set(o, c);
      });
    }
  }
  if (j.hasStandardBrowserEnv && (i && h.isFunction(i) && (i = i(t)), i || i !== !1 && fi(t.url))) {
    const f = r && n && di.read(n);
    f && l.set(r, f);
  }
  return t;
}, mi = typeof XMLHttpRequest != "undefined", bi = mi && function(e) {
  return new Promise(function(s, i) {
    const r = is(e);
    let n = r.data;
    const l = I.from(r.headers).normalize();
    let { responseType: a, onUploadProgress: f, onDownloadProgress: u } = r, o, c, g, S, m;
    function w() {
      S && S(), m && m(), r.cancelToken && r.cancelToken.unsubscribe(o), r.signal && r.signal.removeEventListener("abort", o);
    }
    let b = new XMLHttpRequest();
    b.open(r.method.toUpperCase(), r.url, !0), b.timeout = r.timeout;
    function O() {
      if (!b)
        return;
      const C = I.from(
        "getAllResponseHeaders" in b && b.getAllResponseHeaders()
      ), N = {
        data: !a || a === "text" || a === "json" ? b.responseText : b.response,
        status: b.status,
        statusText: b.statusText,
        headers: C,
        config: e,
        request: b
      };
      ss(
        function(L) {
          s(L), w();
        },
        function(L) {
          i(L), w();
        },
        N
      ), b = null;
    }
    "onloadend" in b ? b.onloadend = O : b.onreadystatechange = function() {
      !b || b.readyState !== 4 || b.status === 0 && !(b.responseURL && b.responseURL.indexOf("file:") === 0) || setTimeout(O);
    }, b.onabort = function() {
      b && (i(new k("Request aborted", k.ECONNABORTED, e, b)), b = null);
    }, b.onerror = function(A) {
      const N = A && A.message ? A.message : "Network Error", J = new k(N, k.ERR_NETWORK, e, b);
      J.event = A || null, i(J), b = null;
    }, b.ontimeout = function() {
      let A = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const N = r.transitional || ft;
      r.timeoutErrorMessage && (A = r.timeoutErrorMessage), i(
        new k(
          A,
          N.clarifyTimeoutError ? k.ETIMEDOUT : k.ECONNABORTED,
          e,
          b
        )
      ), b = null;
    }, n === void 0 && l.setContentType(null), "setRequestHeader" in b && h.forEach(l.toJSON(), function(A, N) {
      b.setRequestHeader(N, A);
    }), h.isUndefined(r.withCredentials) || (b.withCredentials = !!r.withCredentials), a && a !== "json" && (b.responseType = r.responseType), u && ([g, m] = Be(u, !0), b.addEventListener("progress", g)), f && b.upload && ([c, S] = Be(f), b.upload.addEventListener("progress", c), b.upload.addEventListener("loadend", S)), (r.cancelToken || r.signal) && (o = (C) => {
      b && (i(!C || C.type ? new _e(null, e, b) : C), b.abort(), b = null);
    }, r.cancelToken && r.cancelToken.subscribe(o), r.signal && (r.signal.aborted ? o() : r.signal.addEventListener("abort", o)));
    const x = ci(r.url);
    if (x && j.protocols.indexOf(x) === -1) {
      i(
        new k(
          "Unsupported protocol " + x + ":",
          k.ERR_BAD_REQUEST,
          e
        )
      );
      return;
    }
    b.send(n || null);
  });
}, wi = (e, t) => {
  const { length: s } = e = e ? e.filter(Boolean) : [];
  if (t || s) {
    let i = new AbortController(), r;
    const n = function(u) {
      if (!r) {
        r = !0, a();
        const o = u instanceof Error ? u : this.reason;
        i.abort(
          o instanceof k ? o : new _e(o instanceof Error ? o.message : o)
        );
      }
    };
    let l = t && setTimeout(() => {
      l = null, n(new k(`timeout of ${t}ms exceeded`, k.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (l && clearTimeout(l), l = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(n) : u.removeEventListener("abort", n);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", n));
    const { signal: f } = i;
    return f.unsubscribe = () => h.asap(a), f;
  }
}, yi = function* (e, t) {
  let s = e.byteLength;
  if (s < t) {
    yield e;
    return;
  }
  let i = 0, r;
  for (; i < s; )
    r = i + t, yield e.slice(i, r), i = r;
}, Si = function(e, t) {
  return Xe(this, null, function* () {
    try {
      for (var s = wt(Ri(e)), i, r, n; i = !(r = yield new se(s.next())).done; i = !1) {
        const l = r.value;
        yield* Ze(yi(l, t));
      }
    } catch (r) {
      n = [r];
    } finally {
      try {
        i && (r = s.return) && (yield new se(r.call(s)));
      } finally {
        if (n)
          throw n[0];
      }
    }
  });
}, Ri = function(e) {
  return Xe(this, null, function* () {
    if (e[Symbol.asyncIterator]) {
      yield* Ze(e);
      return;
    }
    const t = e.getReader();
    try {
      for (; ; ) {
        const { done: s, value: i } = yield new se(t.read());
        if (s)
          break;
        yield i;
      }
    } finally {
      yield new se(t.cancel());
    }
  });
}, At = (e, t, s, i) => {
  const r = Si(e, t);
  let n = 0, l, a = (u) => {
    l || (l = !0, i && i(u));
  };
  return new ReadableStream(
    {
      pull(u) {
        return te(this, null, function* () {
          try {
            const { done: o, value: c } = yield r.next();
            if (o) {
              a(), u.close();
              return;
            }
            let g = c.byteLength;
            if (s) {
              let S = n += g;
              s(S);
            }
            u.enqueue(new Uint8Array(c));
          } catch (o) {
            throw a(o), o;
          }
        });
      },
      cancel(u) {
        return a(u), r.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
}, Tt = 64 * 1024, { isFunction: Ee } = h, Fi = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(h.global), { ReadableStream: qt, TextEncoder: jt } = h.global, Lt = (e, ...t) => {
  try {
    return !!e(...t);
  } catch (s) {
    return !1;
  }
}, ki = (e) => {
  e = h.merge.call(
    {
      skipUndefined: !0
    },
    Fi,
    e
  );
  const { fetch: t, Request: s, Response: i } = e, r = t ? Ee(t) : typeof fetch == "function", n = Ee(s), l = Ee(i);
  if (!r)
    return !1;
  const a = r && Ee(qt), f = r && (typeof jt == "function" ? /* @__PURE__ */ ((m) => (w) => m.encode(w))(new jt()) : (m) => te(null, null, function* () {
    return new Uint8Array(yield new s(m).arrayBuffer());
  })), u = n && a && Lt(() => {
    let m = !1;
    const w = new s(j.origin, {
      body: new qt(),
      method: "POST",
      get duplex() {
        return m = !0, "half";
      }
    }).headers.has("Content-Type");
    return m && !w;
  }), o = l && a && Lt(() => h.isReadableStream(new i("").body)), c = {
    stream: o && ((m) => m.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((m) => {
    !c[m] && (c[m] = (w, b) => {
      let O = w && w[m];
      if (O)
        return O.call(w);
      throw new k(
        `Response type '${m}' is not supported`,
        k.ERR_NOT_SUPPORT,
        b
      );
    });
  });
  const g = (m) => te(null, null, function* () {
    if (m == null)
      return 0;
    if (h.isBlob(m))
      return m.size;
    if (h.isSpecCompliantForm(m))
      return (yield new s(j.origin, {
        method: "POST",
        body: m
      }).arrayBuffer()).byteLength;
    if (h.isArrayBufferView(m) || h.isArrayBuffer(m))
      return m.byteLength;
    if (h.isURLSearchParams(m) && (m = m + ""), h.isString(m))
      return (yield f(m)).byteLength;
  }), S = (m, w) => te(null, null, function* () {
    const b = h.toFiniteNumber(m.getContentLength());
    return b == null ? g(w) : b;
  });
  return (m) => te(null, null, function* () {
    let {
      url: w,
      method: b,
      data: O,
      signal: x,
      cancelToken: C,
      timeout: A,
      onDownloadProgress: N,
      onUploadProgress: J,
      responseType: L,
      headers: le,
      withCredentials: Y = "same-origin",
      fetchOptions: ge
    } = is(m), pe = t || fetch;
    L = L ? (L + "").toLowerCase() : "text";
    let $ = wi(
      [x, C && C.toAbortSignal()],
      A
    ), Q = null;
    const D = $ && $.unsubscribe && (() => {
      $.unsubscribe();
    });
    let X;
    try {
      if (J && u && b !== "get" && b !== "head" && (X = yield S(le, O)) !== 0) {
        let z = new s(w, {
          method: "POST",
          body: O,
          duplex: "half"
        }), K;
        if (h.isFormData(O) && (K = z.headers.get("content-type")) && le.setContentType(K), z.body) {
          const [oe, ee] = vt(
            X,
            Be(Pt(J))
          );
          O = At(z.body, Tt, oe, ee);
        }
      }
      h.isString(Y) || (Y = Y ? "include" : "omit");
      const T = n && "credentials" in s.prototype, me = bt(Z({}, ge), {
        signal: $,
        method: b.toUpperCase(),
        headers: le.normalize().toJSON(),
        body: O,
        duplex: "half",
        credentials: T ? Y : void 0
      });
      Q = n && new s(w, me);
      let H = yield n ? pe(Q, ge) : pe(w, me);
      const be = o && (L === "stream" || L === "response");
      if (o && (N || be && D)) {
        const z = {};
        ["status", "statusText", "headers"].forEach((we) => {
          z[we] = H[we];
        });
        const K = h.toFiniteNumber(H.headers.get("content-length")), [oe, ee] = N && vt(
          K,
          Be(Pt(N), !0)
        ) || [];
        H = new i(
          At(H.body, Tt, oe, () => {
            ee && ee(), D && D();
          }),
          z
        );
      }
      L = L || "text";
      let xe = yield c[h.findKey(c, L) || "text"](
        H,
        m
      );
      return !be && D && D(), yield new Promise((z, K) => {
        ss(z, K, {
          data: xe,
          headers: I.from(H.headers),
          status: H.status,
          statusText: H.statusText,
          config: m,
          request: Q
        });
      });
    } catch (T) {
      throw D && D(), T && T.name === "TypeError" && /Load failed|fetch/i.test(T.message) ? Object.assign(
        new k(
          "Network Error",
          k.ERR_NETWORK,
          m,
          Q,
          T && T.response
        ),
        {
          cause: T.cause || T
        }
      ) : k.from(T, T && T.code, m, Q, T && T.response);
    }
  });
}, Ci = /* @__PURE__ */ new Map(), rs = (e) => {
  let t = e && e.env || {};
  const { fetch: s, Request: i, Response: r } = t, n = [i, r, s];
  let l = n.length, a = l, f, u, o = Ci;
  for (; a--; )
    f = n[a], u = o.get(f), u === void 0 && o.set(f, u = a ? /* @__PURE__ */ new Map() : ki(t)), o = u;
  return u;
};
rs();
const gt = {
  http: Dn,
  xhr: bi,
  fetch: {
    get: rs
  }
};
h.forEach(gt, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch (s) {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Ut = (e) => `- ${e}`, _i = (e) => h.isFunction(e) || e === null || e === !1;
function xi(e, t) {
  e = h.isArray(e) ? e : [e];
  const { length: s } = e;
  let i, r;
  const n = {};
  for (let l = 0; l < s; l++) {
    i = e[l];
    let a;
    if (r = i, !_i(i) && (r = gt[(a = String(i)).toLowerCase()], r === void 0))
      throw new k(`Unknown adapter '${a}'`);
    if (r && (h.isFunction(r) || (r = r.get(t))))
      break;
    n[a || "#" + l] = r;
  }
  if (!r) {
    const l = Object.entries(n).map(
      ([f, u]) => `adapter ${f} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let a = s ? l.length > 1 ? `since :
` + l.map(Ut).join(`
`) : " " + Ut(l[0]) : "as no adapter specified";
    throw new k(
      "There is no suitable adapter to dispatch the request " + a,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const ls = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: xi,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: gt
};
function it(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new _e(null, e);
}
function Bt(e) {
  return it(e), e.headers = I.from(e.headers), e.data = nt.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), ls.getAdapter(e.adapter || Ce.adapter, e)(e).then(
    function(i) {
      return it(e), i.data = nt.call(e, e.transformResponse, i), i.headers = I.from(i.headers), i;
    },
    function(i) {
      return ts(i) || (it(e), i && i.response && (i.response.data = nt.call(
        e,
        e.transformResponse,
        i.response
      ), i.response.headers = I.from(i.response.headers))), Promise.reject(i);
    }
  );
}
const os = "1.13.6", Me = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Me[e] = function(i) {
    return typeof i === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Nt = {};
Me.transitional = function(t, s, i) {
  function r(n, l) {
    return "[Axios v" + os + "] Transitional option '" + n + "'" + l + (i ? ". " + i : "");
  }
  return (n, l, a) => {
    if (t === !1)
      throw new k(
        r(l, " has been removed" + (s ? " in " + s : "")),
        k.ERR_DEPRECATED
      );
    return s && !Nt[l] && (Nt[l] = !0, console.warn(
      r(
        l,
        " has been deprecated since v" + s + " and will be removed in the near future"
      )
    )), t ? t(n, l, a) : !0;
  };
};
Me.spelling = function(t) {
  return (s, i) => (console.warn(`${i} is likely a misspelling of ${t}`), !0);
};
function Oi(e, t, s) {
  if (typeof e != "object")
    throw new k("options must be an object", k.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(e);
  let r = i.length;
  for (; r-- > 0; ) {
    const n = i[r], l = t[n];
    if (l) {
      const a = e[n], f = a === void 0 || l(a, n, e);
      if (f !== !0)
        throw new k(
          "option " + n + " must be " + f,
          k.ERR_BAD_OPTION_VALUE
        );
      continue;
    }
    if (s !== !0)
      throw new k("Unknown option " + n, k.ERR_BAD_OPTION);
  }
}
const Le = {
  assertOptions: Oi,
  validators: Me
}, M = Le.validators;
let ie = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new xt(),
      response: new xt()
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
      } catch (i) {
        if (i instanceof Error) {
          let r = {};
          Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
          const n = r.stack ? r.stack.replace(/^.+\n/, "") : "";
          try {
            i.stack ? n && !String(i.stack).endsWith(n.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + n) : i.stack = n;
          } catch (l) {
          }
        }
        throw i;
      }
    });
  }
  _request(t, s) {
    typeof t == "string" ? (s = s || {}, s.url = t) : s = t || {}, s = re(this.defaults, s);
    const { transitional: i, paramsSerializer: r, headers: n } = s;
    i !== void 0 && Le.assertOptions(
      i,
      {
        silentJSONParsing: M.transitional(M.boolean),
        forcedJSONParsing: M.transitional(M.boolean),
        clarifyTimeoutError: M.transitional(M.boolean),
        legacyInterceptorReqResOrdering: M.transitional(M.boolean)
      },
      !1
    ), r != null && (h.isFunction(r) ? s.paramsSerializer = {
      serialize: r
    } : Le.assertOptions(
      r,
      {
        encode: M.function,
        serialize: M.function
      },
      !0
    )), s.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : s.allowAbsoluteUrls = !0), Le.assertOptions(
      s,
      {
        baseUrl: M.spelling("baseURL"),
        withXsrfToken: M.spelling("withXSRFToken")
      },
      !0
    ), s.method = (s.method || this.defaults.method || "get").toLowerCase();
    let l = n && h.merge(n.common, n[s.method]);
    n && h.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (m) => {
      delete n[m];
    }), s.headers = I.concat(l, n);
    const a = [];
    let f = !0;
    this.interceptors.request.forEach(function(w) {
      if (typeof w.runWhen == "function" && w.runWhen(s) === !1)
        return;
      f = f && w.synchronous;
      const b = s.transitional || ft;
      b && b.legacyInterceptorReqResOrdering ? a.unshift(w.fulfilled, w.rejected) : a.push(w.fulfilled, w.rejected);
    });
    const u = [];
    this.interceptors.response.forEach(function(w) {
      u.push(w.fulfilled, w.rejected);
    });
    let o, c = 0, g;
    if (!f) {
      const m = [Bt.bind(this), void 0];
      for (m.unshift(...a), m.push(...u), g = m.length, o = Promise.resolve(s); c < g; )
        o = o.then(m[c++], m[c++]);
      return o;
    }
    g = a.length;
    let S = s;
    for (; c < g; ) {
      const m = a[c++], w = a[c++];
      try {
        S = m(S);
      } catch (b) {
        w.call(this, b);
        break;
      }
    }
    try {
      o = Bt.call(this, S);
    } catch (m) {
      return Promise.reject(m);
    }
    for (c = 0, g = u.length; c < g; )
      o = o.then(u[c++], u[c++]);
    return o;
  }
  getUri(t) {
    t = re(this.defaults, t);
    const s = ns(t.baseURL, t.url, t.allowAbsoluteUrls);
    return $t(s, t.params, t.paramsSerializer);
  }
};
h.forEach(["delete", "get", "head", "options"], function(t) {
  ie.prototype[t] = function(s, i) {
    return this.request(
      re(i || {}, {
        method: t,
        url: s,
        data: (i || {}).data
      })
    );
  };
});
h.forEach(["post", "put", "patch"], function(t) {
  function s(i) {
    return function(n, l, a) {
      return this.request(
        re(a || {}, {
          method: t,
          headers: i ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: n,
          data: l
        })
      );
    };
  }
  ie.prototype[t] = s(), ie.prototype[t + "Form"] = s(!0);
});
let vi = class as {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let s;
    this.promise = new Promise(function(n) {
      s = n;
    });
    const i = this;
    this.promise.then((r) => {
      if (!i._listeners) return;
      let n = i._listeners.length;
      for (; n-- > 0; )
        i._listeners[n](r);
      i._listeners = null;
    }), this.promise.then = (r) => {
      let n;
      const l = new Promise((a) => {
        i.subscribe(a), n = a;
      }).then(r);
      return l.cancel = function() {
        i.unsubscribe(n);
      }, l;
    }, t(function(n, l, a) {
      i.reason || (i.reason = new _e(n, l, a), s(i.reason));
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
    const t = new AbortController(), s = (i) => {
      t.abort(i);
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
      token: new as(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Pi(e) {
  return function(s) {
    return e.apply(null, s);
  };
}
function Ei(e) {
  return h.isObject(e) && e.isAxiosError === !0;
}
const at = {
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
Object.entries(at).forEach(([e, t]) => {
  at[t] = e;
});
function cs(e) {
  const t = new ie(e), s = Mt(ie.prototype.request, t);
  return h.extend(s, ie.prototype, t, { allOwnKeys: !0 }), h.extend(s, t, null, { allOwnKeys: !0 }), s.create = function(r) {
    return cs(re(e, r));
  }, s;
}
const E = cs(Ce);
E.Axios = ie;
E.CanceledError = _e;
E.CancelToken = vi;
E.isCancel = ts;
E.VERSION = os;
E.toFormData = De;
E.AxiosError = k;
E.Cancel = E.CanceledError;
E.all = function(t) {
  return Promise.all(t);
};
E.spread = Pi;
E.isAxiosError = Ei;
E.mergeConfig = re;
E.AxiosHeaders = I;
E.formToJSON = (e) => es(h.isHTMLForm(e) ? new FormData(e) : e);
E.getAdapter = ls.getAdapter;
E.HttpStatusCode = at;
E.default = E;
const {
  Axios: El,
  AxiosError: Al,
  CanceledError: Tl,
  isCancel: ql,
  CancelToken: jl,
  VERSION: Ll,
  all: Ul,
  Cancel: Bl,
  isAxiosError: Nl,
  spread: Vl,
  toFormData: Il,
  AxiosHeaders: Dl,
  HttpStatusCode: Ml,
  formToJSON: Hl,
  getAdapter: zl,
  mergeConfig: Gl
} = E, Ae = {
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1400px)"
}, Vt = typeof window != "undefined" && typeof window.matchMedia == "function";
let Ue = null;
class Ai {
  constructor() {
    ve(this, "_subscribers");
    ve(this, "_mqls");
    ve(this, "hiddenBreakpoints");
    if (this._subscribers = /* @__PURE__ */ new Set(), this._mqls = {}, this.hiddenBreakpoints = [], this._onChange = this._onChange.bind(this), this._compute(), Vt)
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
    if (Vt)
      for (const s in Ae)
        window.matchMedia(Ae[s]).matches || t.push(s);
    t.push("all"), this.hiddenBreakpoints = t, this._subscribers.forEach((s) => s(t));
  }
  subscribe(t) {
    this._subscribers.add(t), t(this.hiddenBreakpoints);
  }
  unsubscribe(t) {
    this._subscribers.delete(t), this._subscribers.size === 0 && (this._destroy(), Ue = null);
  }
  _destroy() {
    for (const t in this._mqls) {
      const s = this._mqls[t];
      s.removeEventListener ? s.removeEventListener("change", this._onChange) : s.removeListener(this._onChange);
    }
    this._mqls = {}, this._subscribers.clear();
  }
}
function It() {
  return Ue || (Ue = new Ai()), Ue;
}
let Ti = 0, Te = null;
function qi() {
  if (Te === null)
    try {
      const e = "test-local-storage";
      localStorage.setItem(e, e), localStorage.removeItem(e), Te = !0;
    } catch (e) {
      Te = !1;
    }
  return Te;
}
const ji = Object.freeze({
  equal: (e, t) => t === e,
  greater: (e, t) => t > e,
  less: (e, t) => t < e,
  greaterEqual: (e, t) => t >= e,
  lessEqual: (e, t) => t <= e,
  contains: (e, t) => !Array.isArray(t) && typeof t != "string" ? !1 : t.indexOf(e) !== -1,
  notContains: (e, t) => !Array.isArray(t) && typeof t != "string" ? !1 : t.indexOf(e) === -1,
  startsWith: (e, t) => typeof t != "string" ? !1 : t.indexOf(e) === 0,
  endsWitch: (e, t) => typeof t != "string" ? !1 : t.indexOf(e, t.length - e.length) !== -1,
  matches(e, t) {
    return !(e instanceof RegExp) || typeof t != "string" ? !1 : e.test(t);
  }
}), Li = {
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
    "dennis",
    "update:page",
    "active:row",
    "component:event",
    "auxclick:row",
    "expand:row",
    "click:row",
    "click:cell",
    "auxclick:cell",
    "update:sort",
    "ajax:rows",
    "ajax:error"
  ],
  data() {
    return {
      essentialsKey: Date.now(),
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
      cancelSource: null,
      lastQuery: "",
      pageOffset: 0,
      uuid: "qt-" + ++Ti + "-" + Date.now(),
      loaderHeight: 0,
      defaultOperator: "equal",
      queryAjaxTimeout: null,
      lastSearchQueryUpdated: null,
      operatorFunctions: ji,
      storedState: {},
      activeRow: null
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
      return this.axios ? this.axios : this.$globalVueQuintableaxios ? this.$globalVueQuintableaxios : E;
    },
    /**
     * Set default values for all possible config values
     *
     */
    configFinal() {
      if (!this.config)
        return {};
      let e = !1;
      if (this.config.pagination === !0)
        e = 25;
      else if (this.config.pagination) {
        let F = 0;
        for (; this.paginationOptions[F] <= this.config.pagination && F < this.paginationOptions.length; )
          F++;
        e = this.paginationOptions[Math.min(F - 1, this.paginationOptions.length - 1)];
      }
      let t = "of";
      this.config.numberOfVisibleRowsFillerWord && (t = this.config.numberOfVisibleRowsFillerWord);
      let s = !1;
      this.config.select && (s = !0);
      let i = 250;
      this.config.ajaxRequestDelay && (i = this.config.ajaxRequestDelay);
      let r = "bg-muted";
      this.config.hoverClass === !1 ? r = "" : this.config.hoverClass && this.config.hoverClass !== !0 && (r = this.config.hoverClass);
      let n = "bg-muted";
      this.config.activeClass === !1 ? n = "" : this.config.activeClass && this.config.activeClass !== !0 && (n = this.config.activeClass);
      let l = !1;
      this.config.multiSort && (l = !0);
      let a = !1;
      this.config.pageSort && (a = !0);
      let f = !1;
      this.config.multiSortSelect && (f = !0);
      let u = !1;
      this.config.pageSortSelect && (u = !0);
      let o = !1;
      this.config.ajaxUrl && (o = this.config.ajaxUrl);
      let c = "post";
      ["pre", "post"].includes(this.config.selectPosition) && (c = this.config.selectPosition);
      let g = !1;
      this.config.expandedAll && (g = !0);
      let S = !1;
      this.config.useFuzzySearch && (S = !0);
      let m = !1;
      this.config.prettySelect && (m = !0);
      let w = !1;
      this.config.rowsSelect && (w = !0);
      let b = !1;
      this.config.keepSelect && (b = !0);
      let O = !1;
      this.config.disallowAllOption && (O = !0);
      let x = !1;
      this.config.hideEmptyColumns && (x = !0);
      let C = "none";
      ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns) && (C = this.config.ignoreSortEmptyColumns);
      let A = !1;
      this.config.search && (A = !0);
      let N = 1;
      this.config.searchLength && (N = this.config.searchLength);
      let J = "Search...";
      this.config.searchPlaceholder && (J = this.config.searchPlaceholder);
      let L = "Multiple sort";
      this.config.multiSortPlaceholder && (L = this.config.multiSortPlaceholder);
      let le = "Page sort";
      this.config.pageSortPlaceholder && (le = this.config.pageSortPlaceholder);
      let Y = "AND";
      ["AND", "OR"].includes(this.config.filterRelation) && (Y = this.config.filterRelation);
      let ge = "AND";
      ["AND", "OR"].includes(this.config.filterGroupRelation) && (ge = this.config.filterGroupRelation);
      let pe = "Rows per page:";
      this.config.rowsPlaceholder && (pe = this.config.rowsPlaceholder);
      let $ = "No rows...";
      this.config.emptyPlaceholder && ($ = this.config.emptyPlaceholder);
      let Q = !1;
      this.config.selectAll && (Q = !0);
      let D = !1;
      this.config.selectAllRows && (D = !0), o && D && (console.warn(
        "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
      ), D = !1);
      let X = !1;
      this.config.storeState && (X = !0), !this.identifier && this.config.storeState && (console.warn(
        "Option storeState was deactivated automatically because table identifier is not set!"
      ), X = !1), X && !qi() && (console.warn(
        "Option storeState was deactivated automatically because local storage is not available!"
      ), X = !1);
      let T = !1;
      this.config.defaultSelected && (T = !0);
      let me = !1;
      this.config.hideRowToggle && (me = !0);
      let H = !1;
      this.config.enableRowTabIndex && (H = !0);
      let be = "chevron-up";
      this.config.expandedRowIcon && typeof this.config.expandedRowIcon == "string" && ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
        this.config.expandedRowIcon.toLowerCase()
      ) && (be = this.config.expandedRowIcon.toLowerCase());
      let xe = "chevron-down";
      this.config.collapsedRowIcon && typeof this.config.collapsedRowIcon == "string" && ["chevron-down", "plus", "caret-down", "eye"].includes(
        this.config.collapsedRowIcon.toLowerCase()
      ) && (xe = this.config.collapsedRowIcon.toLowerCase());
      let z = 5;
      this.config.pageRange && (z = this.config.pageRange);
      let K = "col-12";
      this.config.searchClass && (K = this.config.searchClass);
      let oe = "row";
      this.config.searchContainerClass && (oe = this.config.searchContainerClass);
      let ee = "GET";
      this.config.requestMethod && typeof this.config.requestMethod == "string" && ["POST", "GET"].includes(this.config.requestMethod.toUpperCase()) && (ee = this.config.requestMethod.toUpperCase());
      let we = 0, He = [], ze = [], Ge = [], Oe = [], Je = [], Ke = [], ye = [], We = [], pt = null;
      if (this.config.columns) {
        we = this.config.columns.length;
        for (let F = 0; F < this.config.columns.length; F++)
          ye[F] = "", this.config.columns[F] && this.config.columns[F].headline ? (He[F] = this.config.columns[F].headline, ye[F] += this.config.columns[F].headline.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()) : He[F] = "", ye[F] += " column-" + (F + 1), this.config.columns[F].classes && (ye[F] += " " + this.config.columns[F].classes), this.config.columns[F] && this.config.columns[F].breakpoint ? ze[F] = this.config.columns[F].breakpoint : ze[F] = "", this.config.columns[F] && this.config.columns[F].sort ? this.config.columns[F].firstSortDirection && typeof this.config.columns[F].firstSortDirection == "string" && ["DESC", "ASC"].includes(
            this.config.columns[F].firstSortDirection.toUpperCase()
          ) ? Oe[F] = this.config.columns[F].firstSortDirection.toUpperCase() : Oe[F] = !0 : Oe[F] = !1, this.config.columns[F] && this.config.columns[F].ignoreEmpty ? We[F] = !0 : We[F] = !1, this.config.columns[F] && this.config.columns[F].sticky ? Je[F] = !0 : Je[F] = !1, this.config.columns[F] && this.config.columns[F].hidden ? Ge[F] = !0 : Ge[F] = !1, this.config.columns[F] && this.config.columns[F].align ? Ke[F] = this.config.columns[F].align : Ke[F] = !1;
        pt = this.config.columns;
      }
      return Object.freeze({
        headlines: He,
        columnClasses: ye,
        sorts: Oe,
        pageSort: a,
        multiSort: l,
        pageSortSelect: u,
        multiSortSelect: f,
        filterGroupRelation: ge,
        filterRelation: Y,
        rowsSelect: w,
        keepSelect: b,
        disallowAllOption: O,
        defaultSelected: T,
        searchLength: N,
        search: A,
        searchPlaceholder: J,
        useFuzzySearch: S,
        ajaxUrl: o,
        pageSortPlaceholder: le,
        multiSortPlaceholder: L,
        rowsPlaceholder: pe,
        emptyPlaceholder: $,
        stickyCols: Je,
        alignments: Ke,
        breakpoints: ze,
        hiddenCols: Ge,
        ignoreEmpty: We,
        hideEmptyColumns: x,
        ignoreSortEmptyColumns: C,
        pagination: e,
        numberOfVisibleRowsFillerWord: t,
        select: s,
        selectAll: Q,
        selectAllRows: D,
        hoverClass: r,
        activeClass: n,
        expandedAll: g,
        pageRange: z,
        prettySelect: m,
        number: we,
        columns: pt,
        hideRowToggle: me,
        enableRowTabIndex: H,
        expandedRowIcon: be,
        collapsedRowIcon: xe,
        selectPosition: c,
        searchClass: K,
        searchContainerClass: oe,
        requestMethod: ee,
        storeState: X,
        ajaxRequestDelay: i
      });
    },
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
        e[t] = this.configFinal.hiddenCols[t] || !this.configFinal.ignoreEmpty[t] && this.configFinal.hideEmptyColumns && this._colEmptyCache[t] || this.emptyColumns[t];
      return Object.freeze(e);
    },
    // Pre-compute per-column base visibility for cell rendering
    cellVisible() {
      return Object.freeze(
        this.configFinal.columns.map((e, t) => !(this.configFinal.hiddenCols[t] || this.emptyColumns[t] || !e || this._colBreakpointMatch[t] || this.configFinal.stickyCols[t]))
      );
    },
    /**
     * Checks which rows shall be shown
     *
     * @returns {Array} a boolean array which represents all indexes of the rows
     */
    visibleRows() {
      if (!this.configFinal.ajaxUrl && this.currentRowsPerPage !== "All") {
        let e = new Array(this.rowsFinal.length).fill(!1), t = {};
        for (let n in this.sortedIndexes)
          Object.prototype.hasOwnProperty.call(this.sortedIndexes, n) && this.filteredRows[this.sortedIndexes[n]] && (t[n] = this.sortedIndexes[n]);
        let s = this.currentPage * this.currentRowsPerPage, i = s - this.currentRowsPerPage, r = 0;
        for (let n in t)
          Object.prototype.hasOwnProperty.call(t, n) && (n = parseInt(n), r < s && r >= i && (e[t[n]] = !0), r++);
        return e;
      } else
        return this.filteredRows;
    },
    /**
     * Checks which indexes belongs to the current visible rows
     *
     * @returns {Array} an array of all visible indexes
     */
    visibleRowIndexes() {
      let e = [];
      if (this.essentialsKey)
        if (this.configFinal.ajaxUrl && !this.pageSort)
          for (let t = 0; t < this.rowsFinal.length; t++)
            e.push(t);
        else
          for (let t in this.sortedIndexes)
            Object.prototype.hasOwnProperty.call(this.sortedIndexes, t) && this.visibleRows[this.sortedIndexes[t]] && e.push(this.sortedIndexes[t]);
      return e;
    },
    /**
     * Checks which cells are hidden and shall be displayed as additional generated rows.
     *
     * @returns {Object} an object with sorted index as key and generated row array of cells as value
     */
    generatedRows() {
      let e = {};
      if (this.generatedUpdatedKey) {
        const t = this._colBreakpointMatch, s = this._colHideCache, i = this.configFinal.hideEmptyColumns, r = this.visibleRowIndexes;
        for (let n = 0; n < r.length; n++) {
          const l = r[n];
          let a = this.rowsFinal[l].cells ? this.rowsFinal[l].cells : this.rowsFinal[l], f = {};
          for (let u = 0; u < this.configFinal.columns.length; u++) {
            if (!t[u]) continue;
            let o = this.configFinal.columns[u];
            !(s[u] || i && !this.configFinal.ignoreEmpty[u] && this.isColEmpty(u, l)) && !o.sticky && !o.alwaysExpanded && (f[u] = a[u]);
          }
          e[l] = f;
        }
      }
      return e;
    },
    stickyRows() {
      let e = {};
      const t = this._colBreakpointMatch, s = this._colHideCache, i = this.configFinal.hideEmptyColumns, r = this.visibleRowIndexes;
      for (let n = 0; n < r.length; n++) {
        const l = r[n];
        let a = this.rowsFinal[l].cells ? this.rowsFinal[l].cells : this.rowsFinal[l], f = {};
        for (let u = 0; u < this.configFinal.columns.length; u++) {
          let o = this.configFinal.columns[u];
          const c = s[u] || i && !this.configFinal.ignoreEmpty[u] && this.isColEmpty(u, l);
          (!c && o.sticky || !c && o.alwaysExpanded && t[u]) && (f[u] = a[u]);
        }
        e[l] = f;
      }
      return e;
    },
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
     * Calculates number of current rows per page. Special case: no user action in place
     *
     */
    currentRowsPerPageProperty: {
      get() {
        return this.customRowsPerPage ? this.customRowsPerPage : this.currentRowsPerPage;
      },
      set(e) {
        this.customRowsPerPage = e;
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
      set(e) {
        this.customPageSort = e;
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
      set(e) {
        this.customMultiSort = e;
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
      const e = this._colBreakpointMatch, t = this._colHideCache;
      for (let s = 0; s < this.configFinal.columns.length; s++)
        if (e[s] && !t[s]) {
          const i = this.configFinal.columns[s];
          if (!i.sticky && !i.alwaysExpanded)
            return !0;
        }
      return !1;
    },
    /**
     * Calculates the classes array for every cell from the align parameters of rows and cells and the custom class string passed to cells
     *
     */
    cellClassesParsed() {
      let e = {};
      const t = this.visibleRowIndexes.length > 0 ? this.visibleRowIndexes : Object.keys(this.rowsFinal).map(Number);
      for (let s = 0; s < t.length; s++) {
        const i = t[s];
        if (!this.rowsFinal[i]) continue;
        e[i] = [];
        let r = this.rowsFinal[i].align, n = this.rowsFinal[i].cells ? this.rowsFinal[i].cells : this.rowsFinal[i];
        for (let l = 0; l < n.length; l++) {
          let a = [], f = this.configFinal.alignments[l];
          if ((n[l].align || r || f) && (n[l].align ? a.push("text-" + n[l].align) : r ? a.push("text-" + r) : a.push("text-" + f)), n[l].classes) {
            let u = n[l].classes.split(" ");
            Array.prototype.push.apply(a, u);
          }
          e[i].push(a.join(" "));
        }
      }
      return e;
    },
    /**
     *Calculates the number of hidden columns
     *
     */
    hiddenColumns() {
      const e = this._colBreakpointMatch, t = this._colHideCache;
      let s = !1;
      for (let r = 0; r < this.configFinal.columns.length; r++)
        if (e[r] && !t[r]) {
          s = !0;
          break;
        }
      const i = {};
      if (s)
        for (let r = 0; r < this.visibleRowIndexes.length; r++)
          i[this.visibleRowIndexes[r]] = 1;
      else if (this.configFinal.hideEmptyColumns)
        for (let r = 0; r < this.visibleRowIndexes.length; r++) {
          let n = 0;
          const l = this.visibleRowIndexes[r];
          for (let a = 0; a < this.configFinal.columns.length; a++) {
            if (!e[a]) continue;
            if (!(t[a] || !this.configFinal.ignoreEmpty[a] && this.isColEmpty(a, l))) {
              n++;
              break;
            }
          }
          i[l] = n;
        }
      else
        for (let r = 0; r < this.visibleRowIndexes.length; r++)
          i[this.visibleRowIndexes[r]] = 0;
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
      return Object.values(this.selected).some((e) => e);
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
      let e = {};
      for (let t in this.currentSortIndexes)
        Object.prototype.hasOwnProperty.call(this.currentSortIndexes, t) && (e[t] = this.configFinal.columns[t]);
      return e;
    },
    /**
     * Calculates the classes of every table header
     *
     */
    headerClass() {
      let e = [];
      for (let t = 0; t < this.configFinal.number; t++) {
        let s = [];
        this.configFinal.alignments[t] && s.push("text-" + this.configFinal.alignments[t]), this.configFinal.sorts[t] && (s.push("sort-header"), this.currentSortIndexes[t] && s.push("active")), e.push(
          s.join(" ") + "  quintable--table-container--table--header-row--th " + this.configFinal.columnClasses[t]
        );
      }
      return Object.freeze(e);
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
      for (let t = 0; t < this.filteredRows.length; t++)
        this.filteredRows[t] && e++;
      return e;
    },
    /**
     * Calculates all accessible pages regarding to page range and current page
     *
     */
    visiblePages() {
      let e = [], t = 0;
      if (this.pages < this.pageRange || this.currentPage === 1)
        t = 1;
      else if (this.currentPage === this.pages)
        t = this.currentPage - (this.pageRange - 1);
      else {
        let s;
        this.pageRange % 2 === 0 ? s = this.pageRange / 2 : (s = (this.pageRange - 1) / 2, this.currentPage + s > this.pages && s++), t = this.currentPage - s;
      }
      t = Math.max(t + this.pageOffset, 1);
      for (let s = 0; s < this.pageRange && !(s + t > this.pages); s++)
        e.push(s + t);
      return e;
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
      let e = [];
      if (this.configFinal.ajaxUrl)
        return this.rowsFinal;
      for (let t = 0; t < this.rowsFinal.length; t++)
        e.push(!0);
      if (!this.configFinal.search && !this.filterActive || !this.filterActive && this.configFinal.search && this.query.length < this.configFinal.searchLength)
        return e;
      for (let t = 0; t < this.rowsFinal.length; t++) {
        let s = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t], i = !1, r = !1;
        if (this.configFinal.search && this.query.length >= this.configFinal.searchLength) {
          for (let n = 0; n < s.length; n++) {
            let l = s[n], a = l.html ? l.html : l.text;
            if (a) {
              if (this.configFinal.useFuzzySearch && Rt(
                (a + "").toLowerCase(),
                (this.query + "").toLowerCase()
              ).score > 6) {
                i = !0;
                break;
              }
              if ((a + "").toLowerCase().indexOf((this.query + "").toLowerCase()) !== -1) {
                i = !0;
                break;
              }
            }
          }
          if (this.rowsFinal[t].keywords)
            for (let n = 0; n < this.rowsFinal[t].keywords.length; n++) {
              if (this.configFinal.useFuzzySearch && Rt(
                (this.rowsFinal[t].keywords[n] + "").toLowerCase(),
                (this.query + "").toLowerCase()
              ).score > 6) {
                i = !0;
                break;
              }
              if ((this.rowsFinal[t].keywords[n] + "").toLowerCase().indexOf((this.query + "").toLowerCase()) !== -1) {
                i = !0;
                break;
              }
            }
          r = !0;
        }
        if (this.filterActive && !this.rowsFinal[t].filters)
          i = !1;
        else if ((r && i || !r) && this.filterActive) {
          if (this.filterGroups.length)
            i = this.doFiltering(this.rowsFinal[t].filters);
          else {
            let n = {
              items: [],
              relation: this.configFinal.filterRelation
            };
            for (let l in this.filtersFinal)
              Object.prototype.hasOwnProperty.call(this.filtersFinal, l) && n.items.push({ name: l });
            i = this.doFilteringForGroup(
              this.filtersFinal,
              this.rowsFinal[t].filters,
              n
            ), this.DEBUG && console.log("FILTER GROUPS CALCULATED", this.filterGroups);
          }
          this.DEBUG && (console.log(`
`), console.log("ROW " + t, i, this.rowsFinal[t].filters), console.log(`
`));
        }
        e[t] = i;
      }
      return e;
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
      const e = this._hiddenBreakpointSet;
      let t = [];
      for (let s = 0; s < this.configFinal.number; s++) {
        const i = this.configFinal.columns[s];
        this.configFinal.headlines[s] && (!i.showHeadlineBreakpoint || i.showHeadlineBreakpoint && e.has(i.showHeadlineBreakpoint)) && (!i.hideHeadlineBreakpoint || i.hideHeadlineBreakpoint && !e.has(i.hideHeadlineBreakpoint)) ? t.push(!0) : t.push(!1);
      }
      return Object.freeze(t);
    },
    /**
     * Key of filter operator fuctions
     *
     */
    operators() {
      return Object.keys(this.operatorFunctions);
    },
    emptyColumns() {
      const e = {}, t = this._colEmptyCache, s = this.configFinal.ignoreSortEmptyColumns;
      for (let i = 0; i < this.configFinal.number; i++) {
        const r = this.configFinal.ignoreEmpty[i], n = this.configFinal.sorts[i];
        !this.configFinal.hideEmptyColumns || r || s === "none" && n || s === "active" && Object.prototype.hasOwnProperty.call(this.currentSortIndexes, i) ? e[i] = !1 : e[i] = t[i];
      }
      return e;
    },
    filtersFinal() {
      return !this.configFinal.storeState || !this.storedState.filters ? this.filters : this.storedState.filters;
    },
    rowClasses() {
      const e = {};
      for (let t = 0; t < this.visibleRowIndexes.length; t++) {
        const s = this.visibleRowIndexes[t], i = [];
        this.rowsFinal[s].classes && i.push(this.rowsFinal[s].classes), this.openRows[s] && i.push("row-expanded"), this.hiddenColumns[s] > 0 && !this.openRows[s] && i.push("row-collapsed"), e[s] = i.join(" ");
      }
      return e;
    },
    _fmtCells() {
      const e = {}, t = this.configFinal.columns;
      for (let s = 0; s < this.visibleRowIndexes.length; s++) {
        const i = this.visibleRowIndexes[s], r = this.rowsFinal[i];
        if (!r) continue;
        const n = r.cells ? r.cells : r;
        let l = !1;
        const a = {};
        for (let f = 0; f < n.length; f++)
          t[f] && t[f].cellFormatter && (a[f] = this.cellFormatters(f, n[f]), l = !0);
        l && (e[i] = a);
      }
      return e;
    },
    _renderRows() {
      const e = {}, t = this.configFinal.columnClasses, s = this.cellVisible, i = this.cellClassesParsed, r = this._fmtCells, n = this.uuid;
      for (let l = 0; l < this.visibleRowIndexes.length; l++) {
        const a = this.visibleRowIndexes[l], f = this.rowsFinal[a];
        if (!f) continue;
        const u = f.cells ? f.cells : f, o = "vue-quintable-" + n + "-cell-" + a + "-", c = i[a], g = r[a], S = [];
        for (let m = 0; m < u.length; m++) {
          const w = u[m];
          S.push(
            Object.freeze({
              cell: w,
              cls: (c && c[m] || "") + " " + (t[m] || ""),
              vis: !!(s[m] && w),
              fmt: g && g[m] || null,
              key: o + m
            })
          );
        }
        e[a] = Object.freeze(S);
      }
      return e;
    },
    // O(1) lookup map: rowIndex → position in visibleRowIndexes
    _visibleRowIndexMap() {
      const e = {};
      for (let t = 0; t < this.visibleRowIndexes.length; t++)
        e[this.visibleRowIndexes[t]] = t;
      return e;
    }
  },
  watch: {
    rowsFinal: {
      handler(e) {
        if (this.verbose && e && e.length)
          for (let t = 0; t < e.length; t++) {
            let s = e[t].cells ? e[t].cells : e[t];
            s.length !== this.config.columns.length && console.error(
              `Column count on row index ${t} doesn't fit for column config! expected: ${this.config.columns.length}, got: ${s.length}` + (this.configFinal.ajaxUrl ? ` | URL: ${this.configFinal.ajaxUrl}` : "") + (this.identifier ? ` | IDENTIFIER: ${this.identifier}` : ""),
              e[t]
            );
          }
      },
      immediate: !0
    },
    /**
     * Check if some rows should be selected due to an outside change
     *
     */
    preSelectedRows(e) {
      if (e) {
        for (let t = 0; t < this.rowsFinal.length; t++)
          this.selected[t] = !1;
        if (e && e.length) {
          let t = 0;
          const s = this.configFinal.selectAllRows ? this.rowsFinal.map((i, r) => r) : this.visibleRowIndexes;
          for (let i = 0; i < e.length; i++) {
            const r = e[i].key, n = e[i].value;
            for (let l = 0; l < s.length; l++) {
              const a = s[l];
              !this.rowsFinal[a].disableSelect && this.rowsFinal[a][r] === n && (this.selected[a] = !0, t++);
            }
          }
          this.configFinal.selectAllRows ? this.allSelectedCustom = t && t === this.rowsFinal.filter((i) => !i.disableSelect).length : this.allSelectedCustom = t && t === this.rowsFinal.filter(
            (i, r) => !i.disableSelect && this.visibleRows[this.sortedIndexes[r]]
          ).length;
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
      this.configFinal.ajaxUrl && (e && e.clear ? this.loadViaAjax(!0, !0, "UPDATED") : e && this.loadViaAjax(!1, !0, "UPDATED"));
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
      handler(e, t) {
        if (this.configFinal.ajaxUrl)
          return;
        if (t && e.length === t.length) {
          let r = !0;
          for (let n = 0; n < e.length; n++)
            if (e[n] !== t[n]) {
              r = !1;
              break;
            }
          if (r) return;
        }
        this.visibleRowIndexes.findIndex(
          (r) => r === this.activeRow
        ) < 0 && (this.activeRow = null), this.currentPage !== 1 ? this.currentPage = 1 : this.configFinal.keepSelect || this.resetSelect("filteredRows watcher");
        const i = [];
        for (let r = 0; r < e.length; r++) {
          const n = r.toString();
          e[r] && i.push(
            this.rowsFinal[this.sortedIndexes[n] ? this.sortedIndexes[n] : r]
          );
        }
        this.$emit("filtered:rows", i, "filtered:rows");
      },
      deep: !0,
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
    hoveredRow(e) {
      e !== null && this.$emit("hover:row", this.rowsFinal[e], "hover:row");
    },
    /**
     * Resets page and selects if a search query is entered and emits and event
     *
     */
    query(e, t) {
      if (this.lastQuery = t, this.configFinal.ajaxUrl) {
        this.pageSort = !1;
        const s = !(this.configFinal.storeState && this.storedState.query);
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
      const t = !(this.configFinal.storeState && this.storedState["rows-per-page"]);
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
      this.clearLists(), this.initLists(), this.activeRow = null, this.$nextTick(() => {
        this.recomputeEssentials(), this.configFinal.defaultSelected && (this.allSelectedCustom = null, this.checkAll(!0));
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
        let t = [];
        for (let s in this.sortedIndexes)
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, s) && e[this.sortedIndexes[s]]) {
            const i = this.rowsFinal[this.sortedIndexes[s]];
            i.disableSelect || t.push(i);
          }
        this.configFinal.storeState && localStorage.setItem(
          `vue-quintable-${this.identifier}-selected-rows`,
          JSON.stringify(e)
        ), this.$emit("input", t), this.$emit("update:selected-rows", t), this.$emit("dennis", t);
      },
      deep: !0
    },
    /**
     * Resets the row selection if page has been changed and emits an event
     *
     */
    currentPage(e) {
      this.pageOffset = 0, this.activeRow = null, this.$emit("update:page", e, "update:page");
      const t = !(this.configFinal.storeState && this.storedState["current-page"]);
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
      if (!e && Object.keys(this.currentSortIndexes).length > 1) {
        let t, s;
        for (let i in this.currentSortIndexes)
          if (Object.prototype.hasOwnProperty.call(
            this.currentSortIndexes,
            i
          ) && this.currentSortIndexes[i].order === 0) {
            t = this.currentSortIndexes[i], s = i;
            break;
          }
        this.currentSortIndexes = {
          [s]: t
        }, this.sort();
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
        for (let e = 0; e < this.sortOrder.length; e++)
          typeof this.sortOrder[e] == "object" ? this.setSortColumn(this.sortOrder[e].index, this.sortOrder[e].asc) : typeof this.sortOrder[e] == "number" && this.setSortColumn(this.sortOrder[e]);
      }
    },
    activeRow(e) {
      const t = this.visibleRowIndexes.findIndex((s) => s === e);
      this.$emit("active:row", this.rowsFinal[e], "active:row", t);
    }
  },
  created() {
    if (this.configFinal.storeState) {
      const s = localStorage.getItem(
        `vue-quintable-${this.identifier}-filters`
      );
      if (s) {
        const f = JSON.parse(s);
        for (let u in this.filters)
          Object.prototype.hasOwnProperty.call(this.filters, u) && !Object.prototype.hasOwnProperty.call(f, u) && (f[u] = this.filters[u]);
        this.storedState.filters = f;
      }
      const i = localStorage.getItem(
        `vue-quintable-${this.identifier}-query`
      );
      i && (this.storedState.query = i);
      const r = localStorage.getItem(
        `vue-quintable-${this.identifier}-rows-per-page`
      );
      r && (this.storedState["rows-per-page"] = parseInt(r));
      const n = localStorage.getItem(
        `vue-quintable-${this.identifier}-selected-rows`
      );
      n && (this.storedState["selected-rows"] = JSON.parse(n));
      const l = localStorage.getItem(
        `vue-quintable-${this.identifier}-current-page`
      );
      l && (this.storedState["current-page"] = parseInt(l));
      const a = localStorage.getItem(
        `vue-quintable-${this.identifier}-sort-indexes`
      );
      a && (this.storedState["sort-indexes"] = JSON.parse(a));
    }
    this.initLists();
    let e = 0;
    const t = this.configFinal.selectAllRows ? this.rowsFinal.map((s, i) => i) : this.visibleRowIndexes;
    for (let s = 0; s < t.length; s++) {
      let i = this.rowsFinal[s];
      i.selected && (this.selected[s] = !0), i.selected && e++;
    }
    !this.configFinal.selectAllRows && e && e === this.rowsFinal.filter(
      (s, i) => !s.disableSelect && this.visibleRows[this.sortedIndexes[i]]
    ).length ? this.allSelectedCustom = !0 : this.configFinal.selectAllRows && e && e === this.rowsFinal.filter((s) => !s.disableSelect).length && (this.allSelectedCustom = !0), this.initialSearchTerm && (this.query = this.initialSearchTerm), this.storedState.query && (this.query = this.storedState.query), this.storedState["rows-per-page"] && (this.customRowsPerPage = this.storedState["rows-per-page"]), this.storedState["sort-indexes"] && (this.currentSortIndexes = this.storedState["sort-indexes"], this.sort(!0)), this.storedState["current-page"] && this.$nextTick(() => {
      this.currentPage = this.storedState["current-page"];
    }), this.$nextTick(this.checkStoredSelectedRows), this.configFinal.enableRowTabIndex && document.addEventListener("keydown", this.checkKey);
  },
  mounted() {
    this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "MOUNTED"), this.configFinal.defaultSelected && this.checkAll(!0), this._sharedBP = It(), this._sharedBP.subscribe(this._onBreakpointChange);
  },
  beforeUnmount() {
    this._sharedBP && this._sharedBP.unsubscribe(this._onBreakpointChange), this.configFinal.enableRowTabIndex && document.removeEventListener("keydown", this.checkKey);
  },
  methods: {
    /**
     * sets search query from outside (search slot)
     *
     */
    setSearchQuery(e) {
      this.query = e;
    },
    /**
     * just a small string casting function
     *
     */
    valueToString: function(e) {
      switch (e) {
        case "":
        case null:
        case !1:
        case void 0:
          return "";
        case 0:
        case "0":
        default:
          return String(e);
      }
    },
    /**
     * checks if the passed cell is empty for one or all rows
     *
     */
    isColEmpty(e, t = -1) {
      return (t > -1 ? [t] : this.visibleRowIndexes).map((r) => this.rowsFinal[r]).filter((r) => {
        const l = (r.cells ? r.cells : r)[e];
        return !l || typeof l.isEmpty == "boolean" && l.isEmpty === !0 ? !1 : !!(typeof l.isEmpty == "boolean" && l.isEmpty === !1 || typeof l.text != "undefined" && this.valueToString(l.text) || typeof l.html != "undefined" && this.valueToString(l.html));
      }).length <= 0;
    },
    /**
     * Handler for generic component events
     *
     */
    handleComponentEvent(e) {
      this.$emit("component:event", e, "component:event");
    },
    /**
     * Calculate which pages should be displayed in pagination due to page offset
     *
     */
    updatePageOffset(e) {
      let t = this.pageOffset + this.pageRange * e;
      if (e > 0) {
        let s = Math.min(t, this.pages - this.pageRange);
        this.pageOffset = Math.min(s, this.pages - this.currentPage);
      } else e < 0 ? this.pageOffset = Math.max(t, -(this.pages - this.pageRange)) : this.pageOffset = 0;
    },
    cellFormatters(e, t) {
      if (typeof this.configFinal.columns[e].cellFormatter == "function") {
        let s = this.configFinal.columns[e].cellFormatter(t);
        return typeof s != "object" && (s = {
          value: s
        }), s;
      }
      return this.valueToString(t.html) ? t.html : this.valueToString(t.text) ? t.text : "";
    },
    /**
     * Event listener for select row checkboxes. Checks if all rows are selected now and sets the allSelectedProperty in case
     *
     * @param bool selected or not
     * @param index index of selected row
     */
    checkListener(e, t) {
      let s = Object.keys(this.selected).slice().map((i) => !!this.selected[i] || !!(this.rowsFinal[parseInt(i)] && this.rowsFinal[parseInt(i)].disableSelect));
      s[t] = !!e, this.configFinal.selectAllRows ? s.indexOf(!1) === -1 ? this.allSelectedProperty = !0 : this.allSelectedProperty = !1 : (s = s.filter((i, r) => this.visibleRowIndexes.includes(r)), s.indexOf(!1) !== -1 ? this.allSelectedProperty = !1 : s.indexOf(!1) === -1 && (this.allSelectedProperty = !0));
    },
    /**
     * Check if a parent with certain class exists
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
      if (e.button === 1) {
        const s = parseInt(t);
        this.$emit(
          "auxclick:row",
          this.rowsFinal[s],
          "auxclick:row",
          e.target,
          e,
          s
        );
      }
    },
    /**
     * Event listener for mousedown row, just for supporting mouse wheel click
     *
     * @param e Click Event
     */
    onRowMousedown(e) {
      e.which === 2 && e.preventDefault();
    },
    /**
     * Event listener for clicked row. Emits an event if the row has been expanded or collapsed. Emits and event that row was clicked
     *
     * @param e Click Event
     * @param rowIndex Index of clicked row
     */
    onRowClick(e, t) {
      if ((e.target || {}).type === "checkbox")
        return;
      if (this.hasSomeParentTheClass(e.target, "generated-table") && !this.nested)
        return;
      let s = this.hasSomeParentTagName(e.target, "a"), i = this.hasSomeParentTheClass(
        e.target,
        "prevent-toggle"
      );
      const r = t.toString(), n = parseInt(t);
      this.hiddenColumns[r] && !s && !i && (this.openRows[r] ? (this.openRows[r] = !1, this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[r]],
        "collapse:row",
        this.sortedIndexes[r]
      )) : (this.openRows[r] = !0, this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[r]],
        "expand:row",
        this.sortedIndexes[r]
      )), this.generatedUpdatedKey = Date.now()), this.configFinal.enableRowTabIndex && (this.activeRow === n ? this.activeRow = null : this.activeRow = n), this.$emit("click:row", this.rowsFinal[n], "click:row", e.target, e, n);
    },
    /**
     *
     * @param e
     * @param cell
     */
    onCellClick(e, t) {
      this.$emit("click:cell", t, "click:cell", e.target, e);
    },
    /**
     *
     * @param e
     * @param cell
     */
    onCellAuxClick(e, t) {
      e.button === 1 && this.$emit("auxclick:cell", t, "auxclick:cell", e.target, e);
    },
    /**
     * Event listener for mousedown cell, just for supporting mouse wheel click
     *
     * @param e Click Event
     */
    onCellMousedown(e) {
      e.which === 2 && e.preventDefault();
    },
    /**
     * DOM-based hover management — avoids full re-render on mouse movement
     */
    _hoverRow(e, t) {
      if (this.hoveredRow !== e) {
        const s = this.configFinal.hoverClass;
        s && this._lastHoveredEl && this._lastHoveredEl.classList.remove(s), this.hoveredRow = e, s && t && t.currentTarget && (t.currentTarget.classList.add(s), this._lastHoveredEl = t.currentTarget);
      }
    },
    /**
     * Event listener for mouse leave of table body. Releases the hoveredRow data entry
     *
     */
    onMouseleaveTable() {
      const e = this.configFinal.hoverClass;
      e && this._lastHoveredEl && (this._lastHoveredEl.classList.remove(e), this._lastHoveredEl = null), this.hoveredRow = null;
    },
    /**
     *
     *
     * @param index Index of removed sorting column
     */
    removeSort(e) {
      for (let t in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, t)) {
          let s = this.currentSortIndexes[t];
          s.order > this.currentSortIndexes[e].order && s.order--, this.currentSortIndexes[t] = s;
        }
      delete this.currentSortIndexes[e], this.numberOfSorts === 0 ? (this.resetSorts(), this.currentPage !== 1 ? this.currentPage = 1 : this.recomputeEssentials(), this.configFinal.ajaxUrl && !this.pageSort && this.loadViaAjax(!0, !0, "SORT")) : this.sort();
    },
    resetSorts() {
      for (let e = 0; e < this.rowsFinal.length; e++) {
        const t = e.toString();
        this.sortedIndexes[t] = e;
      }
    },
    /**
     * Select all relevant rows
     *
     */
    checkAll(e = !1) {
      let t = this.allSelectedProperty;
      e && (t = !0);
      let s = 0;
      for (let i in this.sortedIndexes)
        Object.prototype.hasOwnProperty.call(this.sortedIndexes, i) && (i = parseInt(i), !this.rowsFinal[this.sortedIndexes[i]].disableSelect && (!this.configFinal.selectAllRows && this.visibleRows[this.sortedIndexes[i]] || this.configFinal.selectAllRows && this.filteredRows[this.sortedIndexes[i]]) ? (this.selected[this.sortedIndexes[i]] = t, s++) : this.rowsFinal[this.sortedIndexes[i]].disableSelect || (this.selected[this.sortedIndexes[i]] = t));
      t && (this.configFinal.selectAllRows ? this.allSelectedCustom = s && s === this.rowsFinal.filter((i) => !i.disableSelect).length : this.allSelectedCustom = s && s === this.rowsFinal.filter(
        (i, r) => !i.disableSelect && this.visibleRows[this.sortedIndexes[r]]
      ).length);
    },
    /**
     * Do the filtering for all rows against all groups
     *
     * @param filterValues the set filter keys and values
     *
     * @returns {boolean}
     */
    doFiltering(e) {
      let t = [];
      for (let s = 0; s < this.filterGroups.length; s++)
        t.push(
          this.doFilteringForGroup(
            this.filtersFinal,
            e,
            this.filterGroups[s]
          )
        ), this.DEBUG && s < this.filterGroups.length - 1 && console.log(this.configFinal.filterGroupRelation);
      return this.DEBUG && console.log(
        "RESULTS FOR GROUPS:",
        t,
        this.configFinal.filterGroupRelation
      ), this.configFinal.filterGroupRelation === "AND" ? t.indexOf(!1) === -1 : this.configFinal.filterGroupRelation === "OR" ? t.indexOf(!0) !== -1 : !0;
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
    doFilteringForGroup(e, t, s, i = 0) {
      let r = "   ";
      for (let l = 0; l < i; l++)
        r += "   ";
      if (this.DEBUG) {
        if (s.items) {
          let l = r, a = s.items.slice(), f = function(u, o) {
            return u.name === void 0 ? 1 : o.name === void 0 ? -1 : 0;
          };
          a = a.sort(f);
          for (let u = 0; u < a.length; u++)
            a[u].name && (l += a[u].name, u < a.length - 1 && (l += " " + s.relation + " "));
          console.log(l);
        }
        console.log(r, "GROUP:", s);
      }
      let n = !1;
      if (s.relation === "AND") {
        for (let l in e)
          if (Object.prototype.hasOwnProperty.call(e, l)) {
            if (this.filterGroups.length && !this.findInFilterGroups(l, this.filterGroups))
              continue;
            let a = !0;
            for (let f = 0; f < s.items.length; f++) {
              let u = s.items[f];
              if (u.name && t[u.name] === void 0) {
                a = !1;
                break;
              }
            }
            if (a)
              for (let f = 0; f < s.items.length; f++) {
                let u = s.items[f];
                if (n = !0, u.items && (n = this.doFilteringForGroup(
                  e,
                  t,
                  u,
                  i + 1
                )), !n)
                  break;
                if (typeof e[u.name] == "undefined")
                  continue;
                let o = typeof e[u.name] == "object" && e[u.name] !== null && e[u.name].operator && this.operators.includes(e[u.name].operator) ? e[u.name].operator : this.defaultOperator, c = this.getFilterValues(e[u.name]);
                const g = typeof e[u.name].compare == "function" ? e[u.name].compare : this.operatorFunctions[o];
                for (let S = 0; S < c.length; S++)
                  if (!g(
                    c[S],
                    t[u.name]
                  )) {
                    n = !1;
                    break;
                  }
                if (!n)
                  break;
              }
          }
        return n;
      } else if (s.relation === "OR" || s.items) {
        for (let l in e)
          if (Object.prototype.hasOwnProperty.call(e, l)) {
            if (this.filterGroups.length && !this.findInFilterGroups(l, this.filterGroups))
              continue;
            for (let a = 0; a < s.items.length; a++) {
              let f = s.items[a];
              if (f.items && (n = this.doFilteringForGroup(
                e,
                t,
                f,
                i + 1
              ), n))
                break;
              if (typeof e[f.name] == "undefined")
                continue;
              let u = typeof e[f.name] == "object" && e[f.name] !== null && e[f.name].operator && this.operators.includes(e[f.name].operator) ? e[f.name].operator : this.defaultOperator, o = this.getFilterValues(e[f.name]);
              const c = typeof e[f.name].compare == "function" ? e[f.name].compare : this.operatorFunctions[u];
              for (let g = 0; g < o.length; g++)
                if (c(
                  o[g],
                  t[f.name]
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
    getFilterValues(e) {
      return e instanceof RegExp || typeof e != "object" || e === null ? [e] : Array.isArray(e) ? e : this.getFilterValues(e.values);
    },
    /**
     * Search a certain filter key in a filter group
     *
     * @param key the filter key
     * @param arr the group
     * @param index just a counter
     * @returns {boolean}
     */
    findInFilterGroups(e, t, s = 0) {
      if (!t)
        return !1;
      let i = !1;
      for (let r = 0; r < t.length; r++) {
        let n = t[r];
        if (n.items && (i = this.findInFilterGroups(e, n.items, s + 1), i))
          break;
        if (n.name === e) {
          i = !0;
          break;
        }
      }
      return i;
    },
    /**
     * Change page with certain value
     *
     * @param page
     */
    gotoPage(e) {
      e === "prev" ? this.currentPage - 1 > 0 && this.currentPage-- : e === "next" ? this.currentPage + 1 <= this.pages && this.currentPage++ : e === "first" ? this.currentPage = 1 : e === "last" ? this.currentPage = this.pages : this.currentPage = e;
    },
    /**
     * Add a column to the sorting or change the sort direction of set sorting column
     *
     * @param sortIndex the column
     * @param asc bool if it shall be set to a direction
     */
    setSortColumn(e, t) {
      const s = parseInt(e), i = e.toString();
      if (!this.configFinal.sorts[s])
        return;
      let r;
      this.currentSortIndexes[i] ? (r = this.currentSortIndexes[i], r.asc = !r.asc) : (this.multiSort || (this.currentSortIndexes = {}), r = {
        headline: this.configFinal.headlines[s],
        index: s,
        asc: this.configFinal.sorts[s] === !0 ? !0 : this.configFinal.sorts[s] === "ASC",
        order: this.numberOfSorts
      }), typeof t != "undefined" && (r.asc = t), this.currentSortIndexes[s] = r, this.configFinal.storeState && localStorage.setItem(
        `vue-quintable-${this.identifier}-sort-indexes`,
        JSON.stringify(this.currentSortIndexes)
      ), this.$emit("update:sort", this.currentSortIndexes, "update:sort"), this.sort();
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
      let t = this.rowsFinal.slice(), s = [], i = [], r = {};
      if (this.pageSort) {
        if (i = this.visibleRowIndexes.slice(), !i.length) {
          const c = this.configFinal.pagination ? this.configFinal.pagination : this.rowsFinal.length;
          for (let g = 0; g < c; g++)
            i.push(g);
        }
        let o = 0;
        for (let c = 0; c < t.length; c++)
          t[c].index = c, i.indexOf(c) !== -1 && (o < this.configFinal.pagination && s.push(t[c]), o++);
        if (Object.keys(this.sortedIndexes).length)
          r = Object.assign({}, this.sortedIndexes);
        else
          for (let c = 0; c < t.length; c++)
            r[c.toString()] = c;
      } else {
        s = this.rowsFinal.slice();
        for (let o = 0; o < s.length; o++)
          s[o].index = o;
      }
      let n = [];
      for (let o in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, o)) {
          let c = this.currentSortIndexes[o];
          c.index = o, n.push(c);
        }
      n.sort(function(o, c) {
        return o.order - c.order;
      });
      let l = (o, c, g, S) => {
        S = S || 0;
        let m = g[S], w = m.index, b = o.cells ? o.cells : o, O = c.cells ? c.cells : c, x = typeof b[w].sortValue != "undefined" && b[w].sortValue !== null ? b[w].sortValue : b[w].html ? b[w].html : b[w].text;
        typeof b[w].computeSortValue == "function" && (x = b[w].computeSortValue(this.currentSortIndexes));
        let C = typeof O[w].sortValue != "undefined" && O[w].sortValue !== null ? O[w].sortValue : O[w].html ? O[w].html : O[w].text;
        return typeof O[w].computeSortValue == "function" && (C = O[w].computeSortValue(this.currentSortIndexes)), typeof x == "string" && (x = x.toLowerCase()), typeof C == "string" && (C = C.toLowerCase()), isNaN(x) ? (typeof x == "string" && x.match(/^-?\d+$/) || typeof x == "string" && x.match(/^\d+\.\d+$/)) && (x = parseFloat(x)) : x = parseFloat(x), isNaN(C) ? (typeof C == "string" && C.match(/^-?\d+$/) || typeof C == "string" && C.match(/^\d+\.\d+$/)) && (C = parseFloat(C)) : C = parseFloat(C), m.asc ? x > C ? 1 : x < C ? -1 : g[S + 1] ? l(o, c, g, S + 1) : 1 : x < C ? 1 : x > C ? -1 : g[S + 1] ? l(o, c, g, S + 1) : -1;
      };
      s.sort(function(o, c) {
        return l(o, c, n);
      });
      const a = [];
      let f = 0, u = 0;
      for (let o = 0; o < t.length; o++) {
        const c = o.toString();
        this.pageSort && i.indexOf(o) !== -1 ? (f < this.configFinal.pagination ? (a.push(s[u]), u++) : a.push(t[r[c]]), f++) : this.pageSort ? a.push(t[r[c]]) : a.push(s[o]);
      }
      for (let o = 0; o < a.length; o++) {
        const c = o.toString();
        this.sortedIndexes[c] = parseInt(a[o].index);
      }
      !this.pageSort && !e && (this.currentPage = 1), !this.configFinal.selectAllRows && !this.pageSort && !e && !this.configFinal.keepSelect && this.resetSelect("sort method"), this.recomputeEssentials();
    },
    /**
     * Trigger recomputing of the essential parts of the table to ensure correct displaying
     *
     */
    recomputeEssentials() {
      this.$nextTick(() => {
        const e = Date.now();
        this.essentialsKey = e, this.generatedUpdatedKey = e;
      });
    },
    /**
     * Initialize nested object lists
     *
     */
    initLists() {
      if (this.rowsFinal)
        for (let e = 0; e < this.rowsFinal.length; e++) {
          const t = e.toString();
          typeof this.sortedIndexes[t] == "undefined" && (this.sortedIndexes[t] = e), typeof this.selected[t] == "undefined" && (this.selected[t] = !1), this.openRows[t] = this.configFinal.expandedAll || !!this.rowsFinal[e].expanded;
        }
    },
    /**
     * Clear all relevant lists to ensure re-initialization
     *
     */
    clearLists(e = !0) {
      e && (this.selected = {}), this.openRows = {}, this.sortedIndexes = {};
    },
    /**
     * Clear all row selections
     *
     */
    resetSelect(e) {
      this.DEBUG && console.log("CALLED FROM:", e), this.allSelectedProperty = !1;
      for (let t = 0; t < this.rowsFinal.length; t++)
        this.selected[t] = !1;
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
      let i = this.query;
      if (i && i.length < this.configFinal.searchLength && (this.lastQuery.length < i.length || this.lastQuery.length < this.configFinal.searchLength))
        return;
      if (!i && this.lastQuery) {
        const l = this.lastQuery;
        if (this.lastQuery = "", l.length < this.configFinal.searchLength)
          return;
      } else i && i.length < this.configFinal.searchLength && (i = "");
      this.cancelSource && this.cancelSource.cancel("Operation canceled by the user."), this.clearLists(t), this.ajaxRows = [], e && (this.currentPage = 1, this.resetSelect("loadViaAjax method")), this.loaderHeight = this.$refs["height-wrapper"] ? this.$refs["height-wrapper"].clientHeight : 0, this.fetching = !0;
      let r = {
        search: i,
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
      const n = {
        "Content-Type": "application/json"
      };
      this.axiosFinal.request(this.configFinal.ajaxUrl, {
        method: this.configFinal.requestMethod,
        params: this.configFinal.requestMethod === "GET" ? r : null,
        data: this.configFinal.requestMethod === "POST" ? r : null,
        cancelToken: this.cancelSource.token,
        headers: n
      }).then((l) => {
        if (!l.data.rows || typeof l.data.rows.length == "undefined")
          throw "Response data has to contain rows property. Please see Readme.md for details";
        if (typeof l.data.all == "undefined")
          throw "Response data has to contain all property. Please see Readme.md for details";
        this.ajaxAll = l.data.all, this.ajaxPages = Math.max(
          1,
          Math.ceil(l.data.all / this.currentRowsPerPage)
        ), this.$emit(
          "ajax:rows",
          {
            rows: l.data.rows,
            old: JSON.parse(JSON.stringify(this.ajaxRows)),
            all: this.ajaxAll
          },
          "ajax:rows"
        ), l.data.all && (this.ajaxRows = l.data.rows, this.initLists()), this.fetching = !1;
      }).catch((l) => {
        this.axiosFinal.isCancel(l) ? console.log("Request canceled", l.message) : (this.fetching = !1, console.error(l), this.$emit("ajax:error", l, "ajax:error"));
      });
    },
    /**
     * Callback from shared breakpoint detector
     */
    _onBreakpointChange(e) {
      (this.hiddenBreakpoints.length !== e.length || this.hiddenBreakpoints.some((t, s) => t !== e[s])) && (this.hiddenBreakpoints = e);
    },
    /**
     * Keep for backwards compatibility — now delegates to shared detector
     */
    generateHiddenBreakpoints() {
      const e = It();
      this._onBreakpointChange(e.hiddenBreakpoints);
    },
    checkStoredSelectedRows(e = !1) {
      if (this.storedState["pre-selected-rows"], this.storedState["selected-rows"]) {
        this.selected = JSON.parse(
          JSON.stringify(this.storedState["selected-rows"])
        );
        const t = Object.values(this.selected).filter((s) => s).length;
        this.configFinal.selectAllRows ? this.allSelectedCustom = t && t === this.rowsFinal.length : this.allSelectedCustom = t && t === this.visibleRows.filter((s) => s).length, e && delete this.storedState["selected-rows"];
      }
    },
    checkKey(e) {
      if (this.activeRow !== null) {
        if (e.keyCode === 40) {
          e.preventDefault();
          const t = this._visibleRowIndexMap[this.activeRow];
          t === void 0 || t === this.visibleRowIndexes.length - 1 ? this.activeRow = this.visibleRowIndexes[0] : this.activeRow = this.visibleRowIndexes[t + 1];
        }
        if (e.keyCode === 38) {
          e.preventDefault();
          const t = this._visibleRowIndexMap[this.activeRow];
          t === void 0 || t === 0 ? this.activeRow = this.visibleRowIndexes[this.visibleRowIndexes.length - 1] : this.activeRow = this.visibleRowIndexes[t - 1];
        }
      }
    }
  }
}, Ui = { class: "table-wrapper quintable" }, Bi = { class: "header slot slot-header quintable--header" }, Ni = ["placeholder"], Vi = { class: "slot slot-after-search quintable--after-search-container" }, Ii = {
  ref: "height-wrapper",
  class: "clearfix quintable--table-container"
}, Di = { key: 0 }, Mi = { class: "vue-quintable-header-row quintable--table-container--table--header-row" }, Hi = {
  key: 0,
  class: "placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th"
}, zi = {
  key: 1,
  class: "select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre"
}, Gi = { class: "p-1" }, Ji = {
  key: 1,
  class: "mb-0 mt-0"
}, Ki = ["title", "onClick"], Wi = ["innerHTML"], Qi = {
  key: 1,
  class: "headline quintable--table-container--table--header-row--th--headline"
}, Xi = {
  key: 2,
  class: "sorting-icon ms-2 quintable--table-container--table--header-row--th--sorting-icon"
}, Zi = ["onClick"], Yi = {
  key: 0,
  class: "badge bg-info text-white"
}, $i = { key: 1 }, er = {
  key: 2,
  class: "select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post"
}, tr = {
  key: 1,
  class: "mb-0 mt-0"
}, sr = ["id", "onClick", "onAuxclick", "onMouseenter"], nr = {
  key: 0,
  class: "toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td"
}, ir = { key: 0 }, rr = { key: 0 }, lr = { key: 1 }, or = {
  key: 1,
  class: "mb-0 mt-0"
}, ar = ["onUpdate:modelValue", "disabled", "onChange"], cr = ["id", "onClick", "onAuxclick"], ur = ["innerHTML"], hr = ["innerHTML"], fr = {
  key: 1,
  class: "mb-0 mt-0"
}, dr = ["onUpdate:modelValue", "disabled", "onChange"], gr = ["onMouseenter", "onClick"], pr = ["colspan"], mr = { class: "mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table" }, br = ["id"], wr = {
  key: 0,
  class: "toggle-cell invisible"
}, yr = { key: 0 }, Sr = { key: 0 }, Rr = { key: 1 }, Fr = ["onClick"], kr = ["innerHTML"], Cr = {
  key: 1,
  class: "headline"
}, _r = {
  key: 2,
  class: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
}, xr = ["onClick"], Or = {
  key: 0,
  class: "badge bg-info text-white"
}, vr = { key: 1 }, Pr = ["colspan", "onClick"], Er = ["innerHTML"], Ar = {
  key: 1,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value"
}, Tr = ["innerHTML"], qr = {
  key: 3,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component"
}, jr = {
  key: 4,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text"
}, Lr = ["id"], Ur = {
  key: 0,
  class: "toggle-cell invisible"
}, Br = { key: 0 }, Nr = { key: 0 }, Vr = { key: 1 }, Ir = ["onClick"], Dr = ["innerHTML"], Mr = {
  key: 1,
  class: "headline"
}, Hr = {
  key: 2,
  class: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
}, zr = ["onClick"], Gr = {
  key: 0,
  class: "badge bg-info text-white"
}, Jr = { key: 1 }, Kr = ["colspan", "onClick"], Wr = ["innerHTML"], Qr = ["innerHTML"], Xr = {
  key: 1,
  class: "clearfix slot-no-results slot quintable--table-container--no-results"
}, Zr = { class: "text-center p-3 quintable--table-container--no-results--results" }, Yr = ["innerHTML"], $r = {
  key: 1,
  class: "slot-loading slot quintable--loading"
}, el = { class: "loader text-center py-4 quintable--loading--loader-wrapper--loader" }, tl = { class: "clearfix quintable--table-footer-container" }, sl = { class: "row" }, nl = { class: "col-lg-4 quintable--table-footer-container--sort-container" }, il = { class: "col-lg-8 quintable--table-footer-container--pagination-wrapper" }, rl = {
  key: 0,
  class: "float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container"
}, ll = {
  key: 0,
  class: "mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select"
}, ol = ["innerHTML"], al = { class: "pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination" }, cl = { class: "page-link" }, ul = { class: "page-link" }, hl = ["onClick"], fl = { class: "page-link" }, dl = { class: "page-link" }, gl = { class: "page-link" }, pl = {
  key: 2,
  class: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows"
}, ml = { class: "footer slot slot-footer quintable--footer" };
function bl(e, t, s, i, r, n) {
  const l = Ye("quintable-font-awesome-icon"), a = Ye("quintable-p-check"), f = Ye("quintable-v-select"), u = Ns("tooltip");
  return d(), p("div", Ui, [
    R("div", Bi, [
      v(e.$slots, "header", {}, void 0, !0)
    ]),
    n.configFinal.search ? (d(), p("div", {
      key: 0,
      class: _(["mb-3 quintable--search-container", n.configFinal.searchContainerClass])
    }, [
      v(e.$slots, "before-search", {}, void 0, !0),
      v(e.$slots, "search", {
        value: r.query,
        loading: s.loading,
        setSearchQuery: n.setSearchQuery,
        placeholder: n.configFinal.searchPlaceholder,
        searchClass: n.configFinal.searchClass
      }, () => [
        R("div", {
          class: _(["quintable--search-container--input-container", n.configFinal.searchClass])
        }, [
          W(R("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (o) => r.query = o),
            type: "search",
            placeholder: n.configFinal.searchPlaceholder,
            class: "form-control"
          }, null, 8, Ni), [
            [Vs, r.query]
          ])
        ], 2)
      ], !0),
      v(e.$slots, "after-search", {}, void 0, !0)
    ], 2)) : y("", !0),
    R("div", Vi, [
      v(e.$slots, "after-search-container", {}, void 0, !0)
    ]),
    R("div", Ii, [
      n.ajaxLoading ? y("", !0) : (d(), p("table", {
        key: 0,
        ref: "table",
        class: _(["vue-quintable table quintable--table-container--table", s.tableClasses])
      }, [
        n.configFinal.headlines.length ? (d(), p("thead", Di, [
          R("tr", Mi, [
            n.hasGeneratedRows && !n.configFinal.hideRowToggle ? (d(), p("th", Hi, t[21] || (t[21] = [
              R("wbr", null, null, -1)
            ]))) : y("", !0),
            n.configFinal.select && n.configFinal.selectPosition === "pre" ? (d(), p("th", zi, [
              n.configFinal.selectAll && !n.noRows ? (d(), p(U, { key: 0 }, [
                n.configFinal.prettySelect ? (d(), P(a, {
                  key: 0,
                  modelValue: n.allSelectedProperty,
                  "onUpdate:modelValue": t[1] || (t[1] = (o) => n.allSelectedProperty = o),
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[2] || (t[2] = (o) => n.checkAll())
                }, {
                  extra: ce(() => [
                    R("span", null, [
                      n.allSelectedProperty ? (d(), P(l, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : y("", !0)
                    ]),
                    R("span", Gi, [
                      n.someSelected && !n.allSelectedProperty ? (d(), P(l, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : y("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : (d(), p("label", Ji, [
                  W(R("input", {
                    "onUpdate:modelValue": t[3] || (t[3] = (o) => n.allSelectedProperty = o),
                    type: "checkbox",
                    onChange: t[4] || (t[4] = (o) => n.checkAll())
                  }, null, 544), [
                    [Pe, n.allSelectedProperty]
                  ])
                ]))
              ], 64)) : y("", !0)
            ])) : y("", !0),
            (d(!0), p(U, null, ue(n.configFinal.headlines, (o, c) => (d(), p(U, null, [
              n.cellVisible[c] ? (d(), p("th", {
                key: "headline-" + c,
                class: _(n.headerClass[c]),
                title: n.configFinal.columns[c].title,
                onClick: he((g) => n.setSortColumn(c), ["stop"])
              }, [
                n.showHeadlines[c] ? (d(), p("span", {
                  key: 0,
                  class: "headline quintable--table-container--table--header-row--th--headline",
                  innerHTML: o
                }, null, 8, Wi)) : (d(), p("span", Qi, t[22] || (t[22] = [
                  R("wbr", null, null, -1)
                ]))),
                n.configFinal.sorts[c] ? (d(), p("span", Xi, [
                  r.currentSortIndexes[c] ? y("", !0) : (d(), P(l, {
                    key: 0,
                    icon: "sort",
                    class: "text-primary"
                  })),
                  r.currentSortIndexes[c] && r.currentSortIndexes[c].asc ? (d(), P(l, {
                    key: 1,
                    icon: "sort-amount-down-alt",
                    class: "text-primary"
                  })) : y("", !0),
                  r.currentSortIndexes[c] && !r.currentSortIndexes[c].asc ? (d(), P(l, {
                    key: 2,
                    icon: "sort-amount-down",
                    class: "text-primary"
                  })) : y("", !0),
                  r.currentSortIndexes[c] ? (d(), p("span", {
                    key: 3,
                    class: "ms-1 text-muted",
                    onClick: he((g) => n.removeSort(c), ["stop", "prevent"])
                  }, [
                    n.numberOfSorts > 1 ? (d(), p("span", Yi, q(r.currentSortIndexes[c].order + 1), 1)) : (d(), p("small", $i, [
                      B(l, { icon: "times" })
                    ]))
                  ], 8, Zi)) : y("", !0)
                ])) : y("", !0)
              ], 10, Ki)) : y("", !0)
            ], 64))), 256)),
            n.configFinal.select && n.configFinal.selectPosition === "post" ? (d(), p("th", er, [
              n.configFinal.selectAll && !n.noRows ? (d(), p(U, { key: 0 }, [
                n.configFinal.prettySelect ? (d(), P(a, {
                  key: 0,
                  modelValue: n.allSelectedProperty,
                  "onUpdate:modelValue": t[5] || (t[5] = (o) => n.allSelectedProperty = o),
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[6] || (t[6] = (o) => n.checkAll())
                }, {
                  extra: ce(() => [
                    R("span", null, [
                      n.allSelectedProperty ? (d(), P(l, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : y("", !0)
                    ]),
                    R("span", null, [
                      n.someSelected && !n.allSelectedProperty ? (d(), P(l, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : y("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : (d(), p("label", tr, [
                  W(R("input", {
                    "onUpdate:modelValue": t[7] || (t[7] = (o) => n.allSelectedProperty = o),
                    type: "checkbox",
                    onChange: t[8] || (t[8] = (o) => n.checkAll())
                  }, null, 544), [
                    [Pe, n.allSelectedProperty]
                  ])
                ]))
              ], 64)) : y("", !0)
            ])) : y("", !0)
          ])
        ])) : y("", !0),
        R("tbody", {
          class: "quintable--table-container--table--tbody",
          onMouseleave: t[11] || (t[11] = (...o) => n.onMouseleaveTable && n.onMouseleaveTable(...o))
        }, [
          (d(!0), p(U, null, ue(n.visibleRowIndexes, (o) => (d(), p(U, {
            key: "vue-quintable-" + r.uuid + "-row-" + o + "-" + r.essentialsKey
          }, [
            W((d(), p("tr", {
              id: "vue-quintable-" + r.uuid + "-row-" + o,
              ref_for: !0,
              ref: "row-highlighted-" + o,
              class: _([n.rowClasses[o], "vue-quintable-row quintable--table-container--table--tbody--row"]),
              style: yt(n.hiddenColumns[o] > 0 ? "cursor:pointer;" : ""),
              onClick: (c) => n.onRowClick(c, o),
              onAuxclick: (c) => n.onRowAuxClick(c, o),
              onMousedown: t[10] || (t[10] = (c) => n.onRowMousedown(c)),
              onMouseenter: (c) => n._hoverRow(o, c)
            }, [
              n.hasGeneratedRows && !n.configFinal.hideRowToggle ? (d(), p("td", nr, [
                n.hiddenColumns[o] > 0 ? (d(), p("span", ir, [
                  r.openRows[o] ? (d(), p("span", lr, [
                    B(l, {
                      "fixed-width": "",
                      icon: n.configFinal.expandedRowIcon
                    }, null, 8, ["icon"])
                  ])) : (d(), p("span", rr, [
                    B(l, {
                      "fixed-width": "",
                      icon: n.configFinal.collapsedRowIcon
                    }, null, 8, ["icon"])
                  ]))
                ])) : y("", !0)
              ])) : y("", !0),
              n.configFinal.select && n.configFinal.selectPosition === "pre" ? (d(), p("td", {
                key: 1,
                class: _(["select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre", { "disabled-select": n.rowsFinal[o].disableSelect }])
              }, [
                !n.rowsFinal[o].disableSelect || n.rowsFinal[o].showDisabledSelect ? (d(), p(U, { key: 0 }, [
                  n.configFinal.prettySelect ? (d(), P(a, {
                    key: 0,
                    modelValue: r.selected[o],
                    "onUpdate:modelValue": (c) => r.selected[o] = c,
                    name: "check",
                    class: "p-icon",
                    disabled: n.rowsFinal[o].disableSelect,
                    onChange: (c) => n.checkListener(c, o)
                  }, {
                    extra: ce(() => [
                      R("span", null, [
                        r.selected[o] ? (d(), P(l, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : y("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : (d(), p("label", or, [
                    W(R("input", {
                      "onUpdate:modelValue": (c) => r.selected[o] = c,
                      type: "checkbox",
                      disabled: n.rowsFinal[o].disableSelect,
                      onChange: (c) => n.checkListener(c, o)
                    }, null, 40, ar), [
                      [Pe, r.selected[o]]
                    ])
                  ]))
                ], 64)) : y("", !0)
              ], 2)) : y("", !0),
              (d(!0), p(U, null, ue(n._renderRows[o], (c) => (d(), p(U, null, [
                c.vis ? W((d(), p("td", {
                  id: c.key,
                  key: c.key,
                  class: _(["vue-quintable-cell quintable--table-container--table--tbody--row--cell", c.cls]),
                  onClick: (g) => n.onCellClick(g, c.cell),
                  onAuxclick: (g) => n.onCellAuxClick(g, c.cell),
                  onMousedown: t[9] || (t[9] = (g) => n.onCellMousedown(g))
                }, [
                  v(e.$slots, "cell-complete", {
                    cell: c.cell
                  }, () => [
                    v(e.$slots, "cell-content", {
                      cell: c.cell
                    }, () => [
                      c.fmt && c.fmt.type === "html" ? (d(), p("div", {
                        key: 0,
                        class: _(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html"]),
                        innerHTML: c.fmt.value
                      }, null, 8, ur)) : c.fmt ? (d(), p("div", {
                        key: 1,
                        class: _(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value"])
                      }, q(c.fmt.value), 1)) : n.valueToString(c.cell.html) ? (d(), p("div", {
                        key: 2,
                        class: _(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--html"]),
                        innerHTML: c.cell.html
                      }, null, 8, hr)) : c.cell.component ? (d(), p("div", {
                        key: 3,
                        class: _(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--component"])
                      }, [
                        (d(), P($e(c.cell.component.name), et({ ref_for: !0 }, c.cell.component.props, { onAction: n.handleComponentEvent }), null, 16, ["onAction"]))
                      ])) : n.valueToString(c.cell.text) ? (d(), p("div", {
                        key: 4,
                        class: _(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--text"])
                      }, q(c.cell.text), 1)) : y("", !0)
                    ], !0)
                  ], !0)
                ], 42, cr)), [
                  [u, {
                    placement: "left",
                    content: c.cell.tooltip,
                    trigger: c.cell.tooltip ? "hover" : "manual"
                  }]
                ]) : y("", !0)
              ], 64))), 256)),
              n.configFinal.select && n.configFinal.selectPosition === "post" ? (d(), p("td", {
                key: 2,
                class: _(["select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post", { "disabled-select": n.rowsFinal[o].disableSelect }])
              }, [
                !n.rowsFinal[o].disableSelect || n.rowsFinal[o].showDisabledSelect ? (d(), p(U, { key: 0 }, [
                  n.configFinal.prettySelect ? (d(), P(a, {
                    key: 0,
                    modelValue: r.selected[o],
                    "onUpdate:modelValue": (c) => r.selected[o] = c,
                    name: "check",
                    class: "p-icon",
                    disabled: n.rowsFinal[o].disableSelect,
                    onChange: (c) => n.checkListener(c, o)
                  }, {
                    extra: ce(() => [
                      R("span", null, [
                        r.selected[o] ? (d(), P(l, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : y("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : (d(), p("label", fr, [
                    W(R("input", {
                      "onUpdate:modelValue": (c) => r.selected[o] = c,
                      type: "checkbox",
                      disabled: n.rowsFinal[o].disableSelect,
                      onChange: (c) => n.checkListener(c, o)
                    }, null, 40, dr), [
                      [Pe, r.selected[o]]
                    ])
                  ]))
                ], 64)) : y("", !0)
              ], 2)) : y("", !0)
            ], 46, sr)), [
              [u, {
                placement: "top",
                content: n.rowsFinal[o].tooltip,
                trigger: n.rowsFinal[o].tooltip ? "hover" : "manual",
                offset: 5
              }]
            ]),
            (n.generatedRows[o] || n.stickyRows[o]) && n.visibleRows[o] ? (d(), p(U, { key: 0 }, [
              r.generatedUpdatedKey && r.openRows[o] && Object.keys(n.generatedRows[o]).length || Object.keys(n.stickyRows[o]).length ? (d(), p("tr", {
                key: "generated-row-" + o + "-" + r.essentialsKey + "-" + r.generatedUpdatedKey,
                ref_for: !0,
                ref: "generated-row-highlighted-" + o,
                class: _(["generated-row quintable--table-container--table--tbody--generated-row", {
                  "parent-row-expanded": r.openRows[o],
                  "parent-row-collapsed": n.hiddenColumns[o] > 0 && !r.openRows[o]
                }]),
                onMouseenter: (c) => n._hoverRow(o, c),
                onClick: (c) => n.onRowClick(c, o)
              }, [
                R("td", {
                  colspan: n.configFinal.number + 1,
                  class: "ps-0 pe-0 pt-0"
                }, [
                  R("div", {
                    class: _({
                      [n.configFinal.hoverClass]: r.hoveredRow === o,
                      [n.configFinal.activeClass]: r.activeRow === o
                    })
                  }, [
                    R("table", mr, [
                      R("tbody", null, [
                        (d(!0), p(U, null, ue(n.generatedRows[o], (c, g) => (d(), p(U, null, [
                          r.openRows[o] ? (d(), p("tr", {
                            id: "vue-quintable-" + r.uuid + "-generated-row-cell-" + o + "-" + g,
                            key: "vue-quintable-" + r.uuid + "-generated-row-cell-" + o + "-" + g + "-" + r.generatedUpdatedKey,
                            class: "generated-row-cell quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell"
                          }, [
                            !n.configFinal.hideRowToggle && n.generatedRows[o] && Object.keys(n.generatedRows[o]).length ? (d(), p("td", wr, [
                              n.hiddenColumns[o] > 0 ? (d(), p("span", yr, [
                                r.openRows[o] ? (d(), p("span", Rr, [
                                  B(l, {
                                    "fixed-width": "",
                                    icon: n.configFinal.expandedRowIcon
                                  }, null, 8, ["icon"])
                                ])) : (d(), p("span", Sr, [
                                  B(l, {
                                    "fixed-width": "",
                                    icon: n.configFinal.collapsedRowIcon
                                  }, null, 8, ["icon"])
                                ]))
                              ])) : y("", !0)
                            ])) : y("", !0),
                            n.showHeadlines[g] || n.configFinal.sorts[g] ? (d(), p("td", {
                              key: 1,
                              class: _([n.configFinal.columnClasses[g], "generated-cell-element generated-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline"]),
                              onClick: he((S) => n.setSortColumn(g), ["stop"])
                            }, [
                              n.showHeadlines[g] ? (d(), p("strong", {
                                key: 0,
                                innerHTML: n.configFinal.headlines[g]
                              }, null, 8, kr)) : (d(), p("span", Cr, t[23] || (t[23] = [
                                R("wbr", null, null, -1)
                              ]))),
                              n.configFinal.sorts[g] && r.hoveredRow === o ? (d(), p("span", _r, [
                                r.currentSortIndexes[g] ? y("", !0) : (d(), P(l, {
                                  key: 0,
                                  icon: "sort",
                                  class: "text-primary"
                                })),
                                r.currentSortIndexes[g] && r.currentSortIndexes[g].asc ? (d(), P(l, {
                                  key: 1,
                                  icon: "sort-amount-down-alt",
                                  class: "text-primary"
                                })) : y("", !0),
                                r.currentSortIndexes[g] && !r.currentSortIndexes[g].asc ? (d(), P(l, {
                                  key: 2,
                                  icon: "sort-amount-down",
                                  class: "text-primary"
                                })) : y("", !0),
                                r.currentSortIndexes[g] ? (d(), p("span", {
                                  key: 3,
                                  class: "ms-1 text-muted",
                                  onClick: he((S) => n.removeSort(g), ["stop", "prevent"])
                                }, [
                                  n.numberOfSorts > 1 ? (d(), p("span", Or, q(r.currentSortIndexes[g].order + 1), 1)) : (d(), p("small", vr, [
                                    B(l, { icon: "times" })
                                  ]))
                                ], 8, xr)) : y("", !0)
                              ])) : y("", !0)
                            ], 10, Fr)) : y("", !0),
                            W((d(), p("td", {
                              colspan: !n.showHeadlines[g] && !n.configFinal.sorts[g] ? 2 : 1,
                              class: _([
                                n.configFinal.columnClasses[g] + " " + n.cellClassesParsed[o][g],
                                "generated-cell-element generated-cell-element-content generated-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content"
                              ]),
                              onClick: (S) => n.onCellClick(S, c)
                            }, [
                              v(e.$slots, "generated-cell-complete", { cell: c }, () => [
                                v(e.$slots, "generated-cell-content", { cell: c }, () => [
                                  n.configFinal.columns[g].cellFormatter && n.cellFormatters(g, c).type === "html" ? (d(), p("div", {
                                    key: 0,
                                    class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html",
                                    innerHTML: n.cellFormatters(g, c).value
                                  }, null, 8, Er)) : n.configFinal.columns[g].cellFormatter ? (d(), p("div", Ar, q(n.cellFormatters(g, c).value), 1)) : n.valueToString(c.html) ? (d(), p("div", {
                                    key: 2,
                                    class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html",
                                    innerHTML: c.html
                                  }, null, 8, Tr)) : c.component ? (d(), p("div", qr, [
                                    (d(), P($e(c.component.name), et({ ref_for: !0 }, c.component.props, { onAction: n.handleComponentEvent }), null, 16, ["onAction"]))
                                  ])) : n.valueToString(c.text) ? (d(), p("div", jr, q(c.text), 1)) : y("", !0)
                                ], !0)
                              ], !0)
                            ], 10, Pr)), [
                              [u, {
                                placement: "top",
                                content: c.tooltip,
                                trigger: c.tooltip ? "hover" : "manual"
                              }]
                            ])
                          ], 8, br)) : y("", !0)
                        ], 64))), 256)),
                        (d(!0), p(U, null, ue(n.stickyRows[o], (c, g) => (d(), p("tr", {
                          id: "vue-quintable-" + r.uuid + "-sticky-row-cell-" + o + "-" + g,
                          key: "vue-quintable-" + r.uuid + "-sticky-row-cell-" + o + "-" + g,
                          class: "sticky-row-cell quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell"
                        }, [
                          !n.configFinal.hideRowToggle && n.generatedRows[o] && Object.keys(n.generatedRows[o]).length ? (d(), p("td", Ur, [
                            n.hiddenColumns[o] > 0 ? (d(), p("span", Br, [
                              r.openRows[o] ? (d(), p("span", Vr, [
                                B(l, {
                                  "fixed-width": "",
                                  icon: n.configFinal.expandedRowIcon
                                }, null, 8, ["icon"])
                              ])) : (d(), p("span", Nr, [
                                B(l, {
                                  "fixed-width": "",
                                  icon: n.configFinal.collapsedRowIcon
                                }, null, 8, ["icon"])
                              ]))
                            ])) : y("", !0)
                          ])) : y("", !0),
                          n.showHeadlines[g] || n.configFinal.sorts[g] ? (d(), p("td", {
                            key: 1,
                            class: _([n.configFinal.columnClasses[g], "generated-cell-element sticky-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline"]),
                            onClick: he((S) => n.setSortColumn(g), ["stop"])
                          }, [
                            n.showHeadlines[g] ? (d(), p("strong", {
                              key: 0,
                              innerHTML: n.configFinal.headlines[g]
                            }, null, 8, Dr)) : (d(), p("span", Mr, t[24] || (t[24] = [
                              R("wbr", null, null, -1)
                            ]))),
                            n.configFinal.sorts[g] && r.hoveredRow === o ? (d(), p("span", Hr, [
                              r.currentSortIndexes[g] ? y("", !0) : (d(), P(l, {
                                key: 0,
                                icon: "sort",
                                class: "text-primary"
                              })),
                              r.currentSortIndexes[g] && r.currentSortIndexes[g].asc ? (d(), P(l, {
                                key: 1,
                                icon: "sort-amount-down-alt",
                                class: "text-primary"
                              })) : y("", !0),
                              r.currentSortIndexes[g] && !r.currentSortIndexes[g].asc ? (d(), P(l, {
                                key: 2,
                                icon: "sort-amount-down",
                                class: "text-primary"
                              })) : y("", !0),
                              r.currentSortIndexes[g] ? (d(), p("span", {
                                key: 3,
                                class: "ms-1 text-muted",
                                onClick: he((S) => n.removeSort(g), ["stop", "prevent"])
                              }, [
                                n.numberOfSorts > 1 ? (d(), p("span", Gr, q(r.currentSortIndexes[g].order + 1), 1)) : (d(), p("small", Jr, [
                                  B(l, { icon: "times" })
                                ]))
                              ], 8, zr)) : y("", !0)
                            ])) : y("", !0)
                          ], 10, Ir)) : y("", !0),
                          W((d(), p("td", {
                            colspan: !n.showHeadlines[g] && !n.configFinal.sorts[g] ? 2 : 1,
                            class: _([
                              n.configFinal.columnClasses[g] + " " + n.cellClassesParsed[o][g],
                              "generated-cell-element generated-cell-element-content sticky-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content"
                            ]),
                            onClick: (S) => n.onCellClick(S, c)
                          }, [
                            v(e.$slots, "sticky-cell-complete", { cell: c }, () => [
                              v(e.$slots, "sticky-cell-content", { cell: c }, () => [
                                n.configFinal.columns[g].cellFormatter && n.cellFormatters(g, c).type === "html" ? (d(), p("div", {
                                  key: 0,
                                  class: _(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html"]),
                                  innerHTML: n.cellFormatters(g, c).value
                                }, null, 8, Wr)) : n.configFinal.columns[g].cellFormatter ? (d(), p("div", {
                                  key: 1,
                                  class: _(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value"])
                                }, q(n.cellFormatters(g, c).value), 1)) : n.valueToString(c.html) ? (d(), p("div", {
                                  key: 2,
                                  class: _(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html"]),
                                  innerHTML: c.html
                                }, null, 8, Qr)) : c.component ? (d(), p("div", {
                                  key: 3,
                                  class: _(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component"])
                                }, [
                                  (d(), P($e(c.component.name), et({ ref_for: !0 }, c.component.props, { onAction: n.handleComponentEvent }), null, 16, ["onAction"]))
                                ])) : n.valueToString(c.text) ? (d(), p("div", {
                                  key: 4,
                                  class: _(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text"])
                                }, q(c.text), 1)) : y("", !0)
                              ], !0)
                            ], !0)
                          ], 10, Kr)), [
                            [u, {
                              placement: "top",
                              content: c.tooltip,
                              trigger: c.tooltip ? "hover" : "manual"
                            }]
                          ])
                        ], 8, Lr))), 128))
                      ])
                    ])
                  ], 2)
                ], 8, pr)
              ], 42, gr)) : y("", !0)
            ], 64)) : y("", !0)
          ], 64))), 128))
        ], 32)
      ], 2)),
      n.noRows && !n.ajaxLoading ? (d(), p("div", Xr, [
        v(e.$slots, "no-results", {}, () => [
          R("div", Zr, [
            R("em", {
              innerHTML: n.configFinal.emptyPlaceholder
            }, null, 8, Yr)
          ])
        ], !0),
        t[25] || (t[25] = R("hr", null, null, -1))
      ])) : y("", !0)
    ], 512),
    n.ajaxLoading ? (d(), p("div", $r, [
      v(e.$slots, "loading", {}, () => [
        R("div", {
          class: "loader-wrapper quintable--loading--loader-wrapper",
          style: yt("height:" + r.loaderHeight + "px;")
        }, [
          R("div", el, [
            B(l, {
              icon: "circle-notch",
              spin: "",
              class: "ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader"
            })
          ])
        ], 4)
      ], !0)
    ])) : y("", !0),
    R("div", tl, [
      R("div", sl, [
        R("div", nl, [
          n.configFinal.multiSortSelect || n.configFinal.pageSortSelect ? (d(), p("div", {
            key: 0,
            class: _(
              `pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select flex-inline ${n.configFinal.pageSort ? "me-3" : ""}`.trim()
            )
          }, [
            n.configFinal.multiSortSelect ? (d(), P(a, {
              key: 0,
              modelValue: n.multiSort,
              "onUpdate:modelValue": t[12] || (t[12] = (o) => n.multiSort = o),
              class: "p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select",
              value: "true"
            }, {
              default: ce(() => [
                St(q(n.configFinal.multiSortPlaceholder), 1)
              ]),
              _: 1
            }, 8, ["modelValue"])) : y("", !0),
            n.configFinal.pageSortSelect ? (d(), P(a, {
              key: 1,
              modelValue: n.pageSort,
              "onUpdate:modelValue": t[13] || (t[13] = (o) => n.pageSort = o),
              class: "p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select",
              value: "true"
            }, {
              default: ce(() => [
                St(q(n.configFinal.pageSortPlaceholder), 1)
              ]),
              _: 1
            }, 8, ["modelValue"])) : y("", !0)
          ], 2)) : y("", !0)
        ]),
        R("div", il, [
          n.configFinal && n.configFinal.pagination ? (d(), p("div", rl, [
            n.configFinal.rowsSelect ? (d(), p("div", ll, [
              R("span", {
                class: "d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder",
                innerHTML: n.configFinal.rowsPlaceholder
              }, null, 8, ol),
              B(f, {
                modelValue: n.currentRowsPerPageProperty,
                "onUpdate:modelValue": t[14] || (t[14] = (o) => n.currentRowsPerPageProperty = o),
                class: "d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select",
                options: n.paginationOptionsFilled,
                clearable: !1
              }, null, 8, ["modelValue", "options"])
            ])) : y("", !0),
            n.configFinal && n.configFinal.pagination && n.pages > 1 ? (d(), p("nav", {
              key: 1,
              class: _(["d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav", { "me-3": n.numberOfVisibleRows, disabled: n.ajaxLoading }])
            }, [
              R("ul", al, [
                n.pages > n.pageRange ? (d(), p("li", {
                  key: 0,
                  class: _(["page-item", { disabled: r.currentPage <= 1 }]),
                  onClick: t[15] || (t[15] = (o) => n.gotoPage("first"))
                }, [
                  R("span", cl, [
                    B(l, { icon: "angle-double-left" })
                  ])
                ], 2)) : y("", !0),
                R("li", {
                  class: _(["page-item", { disabled: r.currentPage <= 1 }]),
                  onClick: t[16] || (t[16] = (o) => n.gotoPage("prev"))
                }, [
                  R("span", ul, [
                    B(l, { icon: "angle-left" })
                  ])
                ], 2),
                n.pageRange < n.pages && n.visiblePages[0] > 1 ? (d(), p("li", {
                  key: 1,
                  class: "page-item",
                  onClick: t[17] || (t[17] = (o) => n.updatePageOffset(-1))
                }, t[26] || (t[26] = [
                  R("span", { class: "page-link" }, " ... ", -1)
                ]))) : y("", !0),
                (d(!0), p(U, null, ue(n.visiblePages, (o) => (d(), p("li", {
                  key: "pagination-item-" + o,
                  class: _(["page-item", { active: o === r.currentPage }]),
                  onClick: (c) => n.gotoPage(o)
                }, [
                  R("span", fl, q(o), 1)
                ], 10, hl))), 128)),
                n.pageRange < n.pages && n.visiblePages[n.visiblePages.length - 1] < n.pages ? (d(), p("li", {
                  key: 2,
                  class: "page-item",
                  onClick: t[18] || (t[18] = (o) => n.updatePageOffset(1))
                }, t[27] || (t[27] = [
                  R("span", { class: "page-link" }, " ... ", -1)
                ]))) : y("", !0),
                R("li", {
                  class: _(["page-item", { disabled: n.pages === r.currentPage }]),
                  onClick: t[19] || (t[19] = (o) => n.gotoPage("next"))
                }, [
                  R("span", dl, [
                    B(l, { icon: "angle-right" })
                  ])
                ], 2),
                n.pages > n.pageRange ? (d(), p("li", {
                  key: 3,
                  class: _(["page-item", { disabled: n.pages === r.currentPage }]),
                  onClick: t[20] || (t[20] = (o) => n.gotoPage("last"))
                }, [
                  R("span", gl, [
                    B(l, { icon: "angle-double-right" })
                  ])
                ], 2)) : y("", !0)
              ])
            ], 2)) : y("", !0),
            n.numberOfVisibleRows ? (d(), p("span", pl, q(n.firstVisibleRow) + "-" + q(n.lastVisibleRow) + " " + q(n.configFinal.numberOfVisibleRowsFillerWord) + " " + q(n.numberOfVisibleRows), 1)) : y("", !0)
          ])) : y("", !0)
        ])
      ])
    ]),
    R("div", ml, [
      v(e.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const wl = /* @__PURE__ */ ct(Li, [["render", bl], ["__scopeId", "data-v-0e09076d"]]), Jl = (e, t = {}) => {
  e.component("VueQuintable", wl), Ds(e), Xs(e), Zs(e), e.use(Dt, {
    // You can tweak defaults here; example sets a custom distance.
    distance: 6
    // If you want a custom theme class, add CSS and set theme on each use.
    // See floating-vue docs for options.
  }), t.axios && (e.config.globalProperties || (e.config.globalProperties = {}), e.config.globalProperties.$globalVueQuintableaxios = t.axios);
};
export {
  wl as VueQuintable,
  Jl as default
};
//# sourceMappingURL=vue-quintable.es.js.map
