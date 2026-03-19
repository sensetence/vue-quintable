var as = Object.defineProperty, cs = Object.defineProperties;
var us = Object.getOwnPropertyDescriptors;
var pt = Object.getOwnPropertySymbols;
var hs = Object.prototype.hasOwnProperty, fs = Object.prototype.propertyIsEnumerable;
var X = (e, t) => (t = Symbol[e]) ? t : Symbol.for("Symbol." + e), ds = (e) => {
  throw TypeError(e);
};
var Le = (e, t, s) => t in e ? as(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, re = (e, t) => {
  for (var s in t || (t = {}))
    hs.call(t, s) && Le(e, s, t[s]);
  if (pt)
    for (var s of pt(t))
      fs.call(t, s) && Le(e, s, t[s]);
  return e;
}, mt = (e, t) => cs(e, us(t));
var fe = (e, t, s) => Le(e, typeof t != "symbol" ? t + "" : t, s);
var G = (e, t, s) => new Promise((i, r) => {
  var n = (f) => {
    try {
      c(s.next(f));
    } catch (u) {
      r(u);
    }
  }, l = (f) => {
    try {
      c(s.throw(f));
    } catch (u) {
      r(u);
    }
  }, c = (f) => f.done ? i(f.value) : Promise.resolve(f.value).then(n, l);
  c((s = s.apply(e, t)).next());
}), J = function(e, t) {
  this[0] = e, this[1] = t;
}, Ue = (e, t, s) => {
  var i = (l, c, f, u) => {
    try {
      var o = s[l](c), a = (c = o.value) instanceof J, g = o.done;
      Promise.resolve(a ? c[0] : c).then((S) => a ? i(l === "return" ? l : "next", c[1] ? { done: S.done, value: S.value } : S, f, u) : f({ value: S, done: g })).catch((S) => i("throw", S, f, u));
    } catch (S) {
      u(S);
    }
  }, r = (l) => n[l] = (c) => new Promise((f, u) => i(l, c, f, u)), n = {};
  return s = s.apply(e, t), n[X("asyncIterator")] = () => n, r("next"), r("throw"), r("return"), n;
}, Be = (e) => {
  var t = e[X("asyncIterator")], s = !1, i, r = {};
  return t == null ? (t = e[X("iterator")](), i = (n) => r[n] = (l) => t[n](l)) : (t = t.call(e), i = (n) => r[n] = (l) => {
    if (s) {
      if (s = !1, n === "throw") throw l;
      return l;
    }
    return s = !0, {
      done: !1,
      value: new J(new Promise((c) => {
        var f = t[n](l);
        f instanceof Object || ds("Object expected"), c(f);
      }), 1)
    };
  }), r[X("iterator")] = () => r, i("next"), "throw" in t ? i("throw") : r.throw = (n) => {
    throw n;
  }, "return" in t && i("return"), r;
}, bt = (e, t, s) => (t = e[X("asyncIterator")]) ? t.call(e) : (e = e[X("iterator")](), t = {}, s = (i, r) => (r = e[i]) && (t[i] = (n) => new Promise((l, c, f) => (n = r.call(e, n), f = n.done, Promise.resolve(n.value).then((u) => l({ value: u, done: f }), c)))), s("next"), s("return"), t);
import Ut from "floating-vue";
import { library as gs } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as ps } from "@fortawesome/vue-fontawesome";
import { faChevronUp as ms, faChevronDown as bs, faInfoCircle as ws, faAngleDoubleLeft as ys, faAngleDoubleRight as Ss, faAngleLeft as Rs, faAngleRight as ks, faArrowsAlt as Fs, faExpand as Cs, faSort as xs, faSortAmountDown as _s, faSortAmountDownAlt as vs, faSortAmountUp as Ps, faSortAmountUpAlt as Os, faTimes as Es, faCheck as As, faSquare as Ts, faCircleNotch as qs, faPlus as js, faCaretUp as Ls } from "@fortawesome/free-solid-svg-icons";
import { createElementBlock as p, openBlock as d, normalizeClass as _, createElementVNode as R, createCommentVNode as b, renderSlot as P, resolveComponent as Ne, resolveDirective as Us, withDirectives as H, vModelText as Bs, Fragment as j, createBlock as O, withCtx as Z, vModelCheckbox as de, renderList as Y, withModifiers as $, toDisplayString as T, createVNode as L, normalizeStyle as wt, resolveDynamicComponent as Ve, mergeProps as Me, createTextVNode as yt } from "vue";
import Ns from "vue-select";
import St from "fuzzy.js";
gs.add(
  ms,
  bs,
  ws,
  ys,
  Ss,
  Rs,
  ks,
  Fs,
  Cs,
  xs,
  _s,
  vs,
  Ps,
  Os,
  Es,
  As,
  Ts,
  qs,
  js,
  Ls
);
function Vs(e) {
  e.component("QuintableFontAwesomeIcon", ps);
}
const Xe = (e, t) => {
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
}, Ds = ["name", "value", "checked", "disabled", "required"];
function Is(e, t, s, i, r, n) {
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
    }, null, 40, Ds),
    R("div", {
      class: _(n.onClasses)
    }, [
      P(e.$slots, "extra", {}, void 0, !0),
      R("label", null, [
        P(e.$slots, "default", {}, void 0, !0)
      ])
    ], 2),
    n._toggle ? (d(), p("div", {
      key: 0,
      class: _(n.offClasses)
    }, [
      P(e.$slots, "off-extra", {}, void 0, !0),
      P(e.$slots, "off-label", {}, void 0, !0)
    ], 2)) : b("", !0),
    n._hover ? (d(), p("div", {
      key: 1,
      class: _(n.hoverClasses)
    }, [
      P(e.$slots, "hover-extra", {}, void 0, !0),
      P(e.$slots, "hover-label", {}, void 0, !0)
    ], 2)) : b("", !0),
    n._indeterminate ? (d(), p("div", {
      key: 2,
      class: _(n.indeterminateClasses)
    }, [
      P(e.$slots, "indeterminate-extra", {}, void 0, !0),
      P(e.$slots, "indeterminate-label", {}, void 0, !0)
    ], 2)) : b("", !0)
  ], 2);
}
const Hs = /* @__PURE__ */ Xe(Ms, [["render", Is], ["__scopeId", "data-v-bc7c5ce1"]]), zs = {
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
}, Gs = ["name", "value", "checked", "disabled", "required"];
function Js(e, t, s, i, r, n) {
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
    }, null, 40, Gs),
    R("div", {
      class: _(n.onClasses)
    }, [
      P(e.$slots, "extra"),
      R("label", null, [
        P(e.$slots, "default")
      ])
    ], 2),
    n._toggle ? (d(), p("div", {
      key: 0,
      class: _(n.offClasses)
    }, [
      P(e.$slots, "off-extra"),
      P(e.$slots, "off-label")
    ], 2)) : b("", !0),
    n._hover ? (d(), p("div", {
      key: 1,
      class: _(n.hoverClasses)
    }, [
      P(e.$slots, "hover-extra"),
      P(e.$slots, "hover-label")
    ], 2)) : b("", !0)
  ], 2);
}
const Ks = /* @__PURE__ */ Xe(zs, [["render", Js]]);
function Qs(e) {
  e.component("QuintablePCheck", Hs), e.component("QuintablePRadio", Ks), e.component("QuintableVSelect", Ns);
}
function Ws(e) {
  e.use(Ut, {
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
function Bt(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Xs } = Object.prototype, { getPrototypeOf: Ze } = Object, { iterator: ke, toStringTag: Nt } = Symbol, Fe = /* @__PURE__ */ ((e) => (t) => {
  const s = Xs.call(t);
  return e[s] || (e[s] = s.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), M = (e) => (e = e.toLowerCase(), (t) => Fe(t) === e), Ce = (e) => (t) => typeof t === e, { isArray: ee } = Array, oe = Ce("undefined");
function Zs(e) {
  return e !== null && !oe(e) && e.constructor !== null && !oe(e.constructor) && U(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Vt = M("ArrayBuffer");
function Ys(e) {
  let t;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Vt(e.buffer), t;
}
const $s = Ce("string"), U = Ce("function"), Mt = Ce("number"), xe = (e) => e !== null && typeof e == "object", en = (e) => e === !0 || e === !1, me = (e) => {
  if (Fe(e) !== "object")
    return !1;
  const t = Ze(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Nt in e) && !(ke in e);
}, tn = M("Date"), sn = M("File"), nn = M("Blob"), rn = M("FileList"), ln = (e) => xe(e) && U(e.pipe), on = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || U(e.append) && ((t = Fe(e)) === "formdata" || // detect form-data instance
  t === "object" && U(e.toString) && e.toString() === "[object FormData]"));
}, an = M("URLSearchParams"), [cn, un, hn, fn] = ["ReadableStream", "Request", "Response", "Headers"].map(M), dn = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ae(e, t, { allOwnKeys: s = !1 } = {}) {
  if (e === null || typeof e == "undefined")
    return;
  let i, r;
  if (typeof e != "object" && (e = [e]), ee(e))
    for (i = 0, r = e.length; i < r; i++)
      t.call(null, e[i], i, e);
  else {
    const n = s ? Object.getOwnPropertyNames(e) : Object.keys(e), l = n.length;
    let c;
    for (i = 0; i < l; i++)
      c = n[i], t.call(null, e[c], c, e);
  }
}
function Dt(e, t) {
  t = t.toLowerCase();
  const s = Object.keys(e);
  let i = s.length, r;
  for (; i-- > 0; )
    if (r = s[i], t === r.toLowerCase())
      return r;
  return null;
}
const K = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global, It = (e) => !oe(e) && e !== K;
function ze() {
  const { caseless: e } = It(this) && this || {}, t = {}, s = (i, r) => {
    const n = e && Dt(t, r) || r;
    me(t[n]) && me(i) ? t[n] = ze(t[n], i) : me(i) ? t[n] = ze({}, i) : ee(i) ? t[n] = i.slice() : t[n] = i;
  };
  for (let i = 0, r = arguments.length; i < r; i++)
    arguments[i] && ae(arguments[i], s);
  return t;
}
const gn = (e, t, s, { allOwnKeys: i } = {}) => (ae(t, (r, n) => {
  s && U(r) ? e[n] = Bt(r, s) : e[n] = r;
}, { allOwnKeys: i }), e), pn = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), mn = (e, t, s, i) => {
  e.prototype = Object.create(t.prototype, i), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), s && Object.assign(e.prototype, s);
}, bn = (e, t, s, i) => {
  let r, n, l;
  const c = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), n = r.length; n-- > 0; )
      l = r[n], (!i || i(l, e, t)) && !c[l] && (t[l] = e[l], c[l] = !0);
    e = s !== !1 && Ze(e);
  } while (e && (!s || s(e, t)) && e !== Object.prototype);
  return t;
}, wn = (e, t, s) => {
  e = String(e), (s === void 0 || s > e.length) && (s = e.length), s -= t.length;
  const i = e.indexOf(t, s);
  return i !== -1 && i === s;
}, yn = (e) => {
  if (!e) return null;
  if (ee(e)) return e;
  let t = e.length;
  if (!Mt(t)) return null;
  const s = new Array(t);
  for (; t-- > 0; )
    s[t] = e[t];
  return s;
}, Sn = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array != "undefined" && Ze(Uint8Array)), Rn = (e, t) => {
  const i = (e && e[ke]).call(e);
  let r;
  for (; (r = i.next()) && !r.done; ) {
    const n = r.value;
    t.call(e, n[0], n[1]);
  }
}, kn = (e, t) => {
  let s;
  const i = [];
  for (; (s = e.exec(t)) !== null; )
    i.push(s);
  return i;
}, Fn = M("HTMLFormElement"), Cn = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(s, i, r) {
    return i.toUpperCase() + r;
  }
), Rt = (({ hasOwnProperty: e }) => (t, s) => e.call(t, s))(Object.prototype), xn = M("RegExp"), Ht = (e, t) => {
  const s = Object.getOwnPropertyDescriptors(e), i = {};
  ae(s, (r, n) => {
    let l;
    (l = t(r, n, e)) !== !1 && (i[n] = l || r);
  }), Object.defineProperties(e, i);
}, _n = (e) => {
  Ht(e, (t, s) => {
    if (U(e) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
      return !1;
    const i = e[s];
    if (U(i)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + s + "'");
      });
    }
  });
}, vn = (e, t) => {
  const s = {}, i = (r) => {
    r.forEach((n) => {
      s[n] = !0;
    });
  };
  return ee(e) ? i(e) : i(String(e).split(t)), s;
}, Pn = () => {
}, On = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function En(e) {
  return !!(e && U(e.append) && e[Nt] === "FormData" && e[ke]);
}
const An = (e) => {
  const t = new Array(10), s = (i, r) => {
    if (xe(i)) {
      if (t.indexOf(i) >= 0)
        return;
      if (!("toJSON" in i)) {
        t[r] = i;
        const n = ee(i) ? [] : {};
        return ae(i, (l, c) => {
          const f = s(l, r + 1);
          !oe(f) && (n[c] = f);
        }), t[r] = void 0, n;
      }
    }
    return i;
  };
  return s(e, 0);
}, Tn = M("AsyncFunction"), qn = (e) => e && (xe(e) || U(e)) && U(e.then) && U(e.catch), zt = ((e, t) => e ? setImmediate : t ? ((s, i) => (K.addEventListener("message", ({ source: r, data: n }) => {
  r === K && n === s && i.length && i.shift()();
}, !1), (r) => {
  i.push(r), K.postMessage(s, "*");
}))(`axios@${Math.random()}`, []) : (s) => setTimeout(s))(
  typeof setImmediate == "function",
  U(K.postMessage)
), jn = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(K) : typeof process != "undefined" && process.nextTick || zt, Ln = (e) => e != null && U(e[ke]), h = {
  isArray: ee,
  isArrayBuffer: Vt,
  isBuffer: Zs,
  isFormData: on,
  isArrayBufferView: Ys,
  isString: $s,
  isNumber: Mt,
  isBoolean: en,
  isObject: xe,
  isPlainObject: me,
  isReadableStream: cn,
  isRequest: un,
  isResponse: hn,
  isHeaders: fn,
  isUndefined: oe,
  isDate: tn,
  isFile: sn,
  isBlob: nn,
  isRegExp: xn,
  isFunction: U,
  isStream: ln,
  isURLSearchParams: an,
  isTypedArray: Sn,
  isFileList: rn,
  forEach: ae,
  merge: ze,
  extend: gn,
  trim: dn,
  stripBOM: pn,
  inherits: mn,
  toFlatObject: bn,
  kindOf: Fe,
  kindOfTest: M,
  endsWith: wn,
  toArray: yn,
  forEachEntry: Rn,
  matchAll: kn,
  isHTMLForm: Fn,
  hasOwnProperty: Rt,
  hasOwnProp: Rt,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ht,
  freezeMethods: _n,
  toObjectSet: vn,
  toCamelCase: Cn,
  noop: Pn,
  toFiniteNumber: On,
  findKey: Dt,
  global: K,
  isContextDefined: It,
  isSpecCompliantForm: En,
  toJSONObject: An,
  isAsyncFn: Tn,
  isThenable: qn,
  setImmediate: zt,
  asap: jn,
  isIterable: Ln
};
function C(e, t, s, i, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), s && (this.config = s), i && (this.request = i), r && (this.response = r, this.status = r.status ? r.status : null);
}
h.inherits(C, Error, {
  toJSON: function() {
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
});
const Gt = C.prototype, Jt = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Jt[e] = { value: e };
});
Object.defineProperties(C, Jt);
Object.defineProperty(Gt, "isAxiosError", { value: !0 });
C.from = (e, t, s, i, r, n) => {
  const l = Object.create(Gt);
  return h.toFlatObject(e, l, function(f) {
    return f !== Error.prototype;
  }, (c) => c !== "isAxiosError"), C.call(l, e.message, t, s, i, r), l.cause = e, l.name = e.name, n && Object.assign(l, n), l;
};
const Un = null;
function Ge(e) {
  return h.isPlainObject(e) || h.isArray(e);
}
function Kt(e) {
  return h.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function kt(e, t, s) {
  return e ? e.concat(t).map(function(r, n) {
    return r = Kt(r), !s && n ? "[" + r + "]" : r;
  }).join(s ? "." : "") : t;
}
function Bn(e) {
  return h.isArray(e) && !e.some(Ge);
}
const Nn = h.toFlatObject(h, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function _e(e, t, s) {
  if (!h.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), s = h.toFlatObject(s, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(y, w) {
    return !h.isUndefined(w[y]);
  });
  const i = s.metaTokens, r = s.visitor || o, n = s.dots, l = s.indexes, f = (s.Blob || typeof Blob != "undefined" && Blob) && h.isSpecCompliantForm(t);
  if (!h.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(m) {
    if (m === null) return "";
    if (h.isDate(m))
      return m.toISOString();
    if (!f && h.isBlob(m))
      throw new C("Blob is not supported. Use a Buffer instead.");
    return h.isArrayBuffer(m) || h.isTypedArray(m) ? f && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function o(m, y, w) {
    let v = m;
    if (m && !w && typeof m == "object") {
      if (h.endsWith(y, "{}"))
        y = i ? y : y.slice(0, -2), m = JSON.stringify(m);
      else if (h.isArray(m) && Bn(m) || (h.isFileList(m) || h.endsWith(y, "[]")) && (v = h.toArray(m)))
        return y = Kt(y), v.forEach(function(x, N) {
          !(h.isUndefined(x) || x === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            l === !0 ? kt([y], N, n) : l === null ? y : y + "[]",
            u(x)
          );
        }), !1;
    }
    return Ge(m) ? !0 : (t.append(kt(w, y, n), u(m)), !1);
  }
  const a = [], g = Object.assign(Nn, {
    defaultVisitor: o,
    convertValue: u,
    isVisitable: Ge
  });
  function S(m, y) {
    if (!h.isUndefined(m)) {
      if (a.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      a.push(m), h.forEach(m, function(v, F) {
        (!(h.isUndefined(v) || v === null) && r.call(
          t,
          v,
          h.isString(F) ? F.trim() : F,
          y,
          g
        )) === !0 && S(v, y ? y.concat(F) : [F]);
      }), a.pop();
    }
  }
  if (!h.isObject(e))
    throw new TypeError("data must be an object");
  return S(e), t;
}
function Ft(e) {
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
function Ye(e, t) {
  this._pairs = [], e && _e(e, this, t);
}
const Qt = Ye.prototype;
Qt.append = function(t, s) {
  this._pairs.push([t, s]);
};
Qt.toString = function(t) {
  const s = t ? function(i) {
    return t.call(this, i, Ft);
  } : Ft;
  return this._pairs.map(function(r) {
    return s(r[0]) + "=" + s(r[1]);
  }, "").join("&");
};
function Vn(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Wt(e, t, s) {
  if (!t)
    return e;
  const i = s && s.encode || Vn;
  h.isFunction(s) && (s = {
    serialize: s
  });
  const r = s && s.serialize;
  let n;
  if (r ? n = r(t, s) : n = h.isURLSearchParams(t) ? t.toString() : new Ye(t, s).toString(i), n) {
    const l = e.indexOf("#");
    l !== -1 && (e = e.slice(0, l)), e += (e.indexOf("?") === -1 ? "?" : "&") + n;
  }
  return e;
}
class Ct {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
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
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
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
const Xt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Mn = typeof URLSearchParams != "undefined" ? URLSearchParams : Ye, Dn = typeof FormData != "undefined" ? FormData : null, In = typeof Blob != "undefined" ? Blob : null, Hn = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Mn,
    FormData: Dn,
    Blob: In
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, $e = typeof window != "undefined" && typeof document != "undefined", Je = typeof navigator == "object" && navigator || void 0, zn = $e && (!Je || ["ReactNative", "NativeScript", "NS"].indexOf(Je.product) < 0), Gn = typeof WorkerGlobalScope != "undefined" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Jn = $e && window.location.href || "http://localhost", Kn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: $e,
  hasStandardBrowserEnv: zn,
  hasStandardBrowserWebWorkerEnv: Gn,
  navigator: Je,
  origin: Jn
}, Symbol.toStringTag, { value: "Module" })), q = re(re({}, Kn), Hn);
function Qn(e, t) {
  return _e(e, new q.classes.URLSearchParams(), Object.assign({
    visitor: function(s, i, r, n) {
      return q.isNode && h.isBuffer(s) ? (this.append(i, s.toString("base64")), !1) : n.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Wn(e) {
  return h.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Xn(e) {
  const t = {}, s = Object.keys(e);
  let i;
  const r = s.length;
  let n;
  for (i = 0; i < r; i++)
    n = s[i], t[n] = e[n];
  return t;
}
function Zt(e) {
  function t(s, i, r, n) {
    let l = s[n++];
    if (l === "__proto__") return !0;
    const c = Number.isFinite(+l), f = n >= s.length;
    return l = !l && h.isArray(r) ? r.length : l, f ? (h.hasOwnProp(r, l) ? r[l] = [r[l], i] : r[l] = i, !c) : ((!r[l] || !h.isObject(r[l])) && (r[l] = []), t(s, i, r[l], n) && h.isArray(r[l]) && (r[l] = Xn(r[l])), !c);
  }
  if (h.isFormData(e) && h.isFunction(e.entries)) {
    const s = {};
    return h.forEachEntry(e, (i, r) => {
      t(Wn(i), r, s, 0);
    }), s;
  }
  return null;
}
function Zn(e, t, s) {
  if (h.isString(e))
    try {
      return (t || JSON.parse)(e), h.trim(e);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (s || JSON.stringify)(e);
}
const ce = {
  transitional: Xt,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, s) {
    const i = s.getContentType() || "", r = i.indexOf("application/json") > -1, n = h.isObject(t);
    if (n && h.isHTMLForm(t) && (t = new FormData(t)), h.isFormData(t))
      return r ? JSON.stringify(Zt(t)) : t;
    if (h.isArrayBuffer(t) || h.isBuffer(t) || h.isStream(t) || h.isFile(t) || h.isBlob(t) || h.isReadableStream(t))
      return t;
    if (h.isArrayBufferView(t))
      return t.buffer;
    if (h.isURLSearchParams(t))
      return s.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let c;
    if (n) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return Qn(t, this.formSerializer).toString();
      if ((c = h.isFileList(t)) || i.indexOf("multipart/form-data") > -1) {
        const f = this.env && this.env.FormData;
        return _e(
          c ? { "files[]": t } : t,
          f && new f(),
          this.formSerializer
        );
      }
    }
    return n || r ? (s.setContentType("application/json", !1), Zn(t)) : t;
  }],
  transformResponse: [function(t) {
    const s = this.transitional || ce.transitional, i = s && s.forcedJSONParsing, r = this.responseType === "json";
    if (h.isResponse(t) || h.isReadableStream(t))
      return t;
    if (t && h.isString(t) && (i && !this.responseType || r)) {
      const l = !(s && s.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (c) {
        if (l)
          throw c.name === "SyntaxError" ? C.from(c, C.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    }
    return t;
  }],
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
  ce.headers[e] = {};
});
const Yn = h.toObjectSet([
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
]), $n = (e) => {
  const t = {};
  let s, i, r;
  return e && e.split(`
`).forEach(function(l) {
    r = l.indexOf(":"), s = l.substring(0, r).trim().toLowerCase(), i = l.substring(r + 1).trim(), !(!s || t[s] && Yn[s]) && (s === "set-cookie" ? t[s] ? t[s].push(i) : t[s] = [i] : t[s] = t[s] ? t[s] + ", " + i : i);
  }), t;
}, xt = Symbol("internals");
function le(e) {
  return e && String(e).trim().toLowerCase();
}
function be(e) {
  return e === !1 || e == null ? e : h.isArray(e) ? e.map(be) : String(e);
}
function ei(e) {
  const t = /* @__PURE__ */ Object.create(null), s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = s.exec(e); )
    t[i[1]] = i[2];
  return t;
}
const ti = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function De(e, t, s, i, r) {
  if (h.isFunction(i))
    return i.call(this, t, s);
  if (r && (t = s), !!h.isString(t)) {
    if (h.isString(i))
      return t.indexOf(i) !== -1;
    if (h.isRegExp(i))
      return i.test(t);
  }
}
function si(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, s, i) => s.toUpperCase() + i);
}
function ni(e, t) {
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
let B = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, s, i) {
    const r = this;
    function n(c, f, u) {
      const o = le(f);
      if (!o)
        throw new Error("header name must be a non-empty string");
      const a = h.findKey(r, o);
      (!a || r[a] === void 0 || u === !0 || u === void 0 && r[a] !== !1) && (r[a || f] = be(c));
    }
    const l = (c, f) => h.forEach(c, (u, o) => n(u, o, f));
    if (h.isPlainObject(t) || t instanceof this.constructor)
      l(t, s);
    else if (h.isString(t) && (t = t.trim()) && !ti(t))
      l($n(t), s);
    else if (h.isObject(t) && h.isIterable(t)) {
      let c = {}, f, u;
      for (const o of t) {
        if (!h.isArray(o))
          throw TypeError("Object iterator must return a key-value pair");
        c[u = o[0]] = (f = c[u]) ? h.isArray(f) ? [...f, o[1]] : [f, o[1]] : o[1];
      }
      l(c, s);
    } else
      t != null && n(s, t, i);
    return this;
  }
  get(t, s) {
    if (t = le(t), t) {
      const i = h.findKey(this, t);
      if (i) {
        const r = this[i];
        if (!s)
          return r;
        if (s === !0)
          return ei(r);
        if (h.isFunction(s))
          return s.call(this, r, i);
        if (h.isRegExp(s))
          return s.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, s) {
    if (t = le(t), t) {
      const i = h.findKey(this, t);
      return !!(i && this[i] !== void 0 && (!s || De(this, this[i], i, s)));
    }
    return !1;
  }
  delete(t, s) {
    const i = this;
    let r = !1;
    function n(l) {
      if (l = le(l), l) {
        const c = h.findKey(i, l);
        c && (!s || De(i, i[c], c, s)) && (delete i[c], r = !0);
      }
    }
    return h.isArray(t) ? t.forEach(n) : n(t), r;
  }
  clear(t) {
    const s = Object.keys(this);
    let i = s.length, r = !1;
    for (; i--; ) {
      const n = s[i];
      (!t || De(this, this[n], n, t, !0)) && (delete this[n], r = !0);
    }
    return r;
  }
  normalize(t) {
    const s = this, i = {};
    return h.forEach(this, (r, n) => {
      const l = h.findKey(i, n);
      if (l) {
        s[l] = be(r), delete s[n];
        return;
      }
      const c = t ? si(n) : String(n).trim();
      c !== n && delete s[n], s[c] = be(r), i[c] = !0;
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
    const i = (this[xt] = this[xt] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function n(l) {
      const c = le(l);
      i[c] || (ni(r, l), i[c] = !0);
    }
    return h.isArray(t) ? t.forEach(n) : n(t), this;
  }
};
B.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
h.reduceDescriptors(B.prototype, ({ value: e }, t) => {
  let s = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(i) {
      this[s] = i;
    }
  };
});
h.freezeMethods(B);
function Ie(e, t) {
  const s = this || ce, i = t || s, r = B.from(i.headers);
  let n = i.data;
  return h.forEach(e, function(c) {
    n = c.call(s, n, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), n;
}
function Yt(e) {
  return !!(e && e.__CANCEL__);
}
function te(e, t, s) {
  C.call(this, e == null ? "canceled" : e, C.ERR_CANCELED, t, s), this.name = "CanceledError";
}
h.inherits(te, C, {
  __CANCEL__: !0
});
function $t(e, t, s) {
  const i = s.config.validateStatus;
  !s.status || !i || i(s.status) ? e(s) : t(new C(
    "Request failed with status code " + s.status,
    [C.ERR_BAD_REQUEST, C.ERR_BAD_RESPONSE][Math.floor(s.status / 100) - 4],
    s.config,
    s.request,
    s
  ));
}
function ii(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function ri(e, t) {
  e = e || 10;
  const s = new Array(e), i = new Array(e);
  let r = 0, n = 0, l;
  return t = t !== void 0 ? t : 1e3, function(f) {
    const u = Date.now(), o = i[n];
    l || (l = u), s[r] = f, i[r] = u;
    let a = n, g = 0;
    for (; a !== r; )
      g += s[a++], a = a % e;
    if (r = (r + 1) % e, r === n && (n = (n + 1) % e), u - l < t)
      return;
    const S = o && u - o;
    return S ? Math.round(g * 1e3 / S) : void 0;
  };
}
function li(e, t) {
  let s = 0, i = 1e3 / t, r, n;
  const l = (u, o = Date.now()) => {
    s = o, r = null, n && (clearTimeout(n), n = null), e.apply(null, u);
  };
  return [(...u) => {
    const o = Date.now(), a = o - s;
    a >= i ? l(u, o) : (r = u, n || (n = setTimeout(() => {
      n = null, l(r);
    }, i - a)));
  }, () => r && l(r)];
}
const Se = (e, t, s = 3) => {
  let i = 0;
  const r = ri(50, 250);
  return li((n) => {
    const l = n.loaded, c = n.lengthComputable ? n.total : void 0, f = l - i, u = r(f), o = l <= c;
    i = l;
    const a = {
      loaded: l,
      total: c,
      progress: c ? l / c : void 0,
      bytes: f,
      rate: u || void 0,
      estimated: u && c && o ? (c - l) / u : void 0,
      event: n,
      lengthComputable: c != null,
      [t ? "download" : "upload"]: !0
    };
    e(a);
  }, s);
}, _t = (e, t) => {
  const s = e != null;
  return [(i) => t[0]({
    lengthComputable: s,
    total: e,
    loaded: i
  }), t[1]];
}, vt = (e) => (...t) => h.asap(() => e(...t)), oi = q.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (s) => (s = new URL(s, q.origin), e.protocol === s.protocol && e.host === s.host && (t || e.port === s.port)))(
  new URL(q.origin),
  q.navigator && /(msie|trident)/i.test(q.navigator.userAgent)
) : () => !0, ai = q.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, s, i, r, n) {
      const l = [e + "=" + encodeURIComponent(t)];
      h.isNumber(s) && l.push("expires=" + new Date(s).toGMTString()), h.isString(i) && l.push("path=" + i), h.isString(r) && l.push("domain=" + r), n === !0 && l.push("secure"), document.cookie = l.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
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
function ci(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function ui(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function es(e, t, s) {
  let i = !ci(t);
  return e && (i || s == !1) ? ui(e, t) : t;
}
const Pt = (e) => e instanceof B ? re({}, e) : e;
function W(e, t) {
  t = t || {};
  const s = {};
  function i(u, o, a, g) {
    return h.isPlainObject(u) && h.isPlainObject(o) ? h.merge.call({ caseless: g }, u, o) : h.isPlainObject(o) ? h.merge({}, o) : h.isArray(o) ? o.slice() : o;
  }
  function r(u, o, a, g) {
    if (h.isUndefined(o)) {
      if (!h.isUndefined(u))
        return i(void 0, u, a, g);
    } else return i(u, o, a, g);
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
  function c(u, o, a) {
    if (a in t)
      return i(u, o);
    if (a in e)
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
    validateStatus: c,
    headers: (u, o, a) => r(Pt(u), Pt(o), a, !0)
  };
  return h.forEach(Object.keys(Object.assign({}, e, t)), function(o) {
    const a = f[o] || r, g = a(e[o], t[o], o);
    h.isUndefined(g) && a !== c || (s[o] = g);
  }), s;
}
const ts = (e) => {
  const t = W({}, e);
  let { data: s, withXSRFToken: i, xsrfHeaderName: r, xsrfCookieName: n, headers: l, auth: c } = t;
  t.headers = l = B.from(l), t.url = Wt(es(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), c && l.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  );
  let f;
  if (h.isFormData(s)) {
    if (q.hasStandardBrowserEnv || q.hasStandardBrowserWebWorkerEnv)
      l.setContentType(void 0);
    else if ((f = l.getContentType()) !== !1) {
      const [u, ...o] = f ? f.split(";").map((a) => a.trim()).filter(Boolean) : [];
      l.setContentType([u || "multipart/form-data", ...o].join("; "));
    }
  }
  if (q.hasStandardBrowserEnv && (i && h.isFunction(i) && (i = i(t)), i || i !== !1 && oi(t.url))) {
    const u = r && n && ai.read(n);
    u && l.set(r, u);
  }
  return t;
}, hi = typeof XMLHttpRequest != "undefined", fi = hi && function(e) {
  return new Promise(function(s, i) {
    const r = ts(e);
    let n = r.data;
    const l = B.from(r.headers).normalize();
    let { responseType: c, onUploadProgress: f, onDownloadProgress: u } = r, o, a, g, S, m;
    function y() {
      S && S(), m && m(), r.cancelToken && r.cancelToken.unsubscribe(o), r.signal && r.signal.removeEventListener("abort", o);
    }
    let w = new XMLHttpRequest();
    w.open(r.method.toUpperCase(), r.url, !0), w.timeout = r.timeout;
    function v() {
      if (!w)
        return;
      const x = B.from(
        "getAllResponseHeaders" in w && w.getAllResponseHeaders()
      ), A = {
        data: !c || c === "text" || c === "json" ? w.responseText : w.response,
        status: w.status,
        statusText: w.statusText,
        headers: x,
        config: e,
        request: w
      };
      $t(function(D) {
        s(D), y();
      }, function(D) {
        i(D), y();
      }, A), w = null;
    }
    "onloadend" in w ? w.onloadend = v : w.onreadystatechange = function() {
      !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, w.onabort = function() {
      w && (i(new C("Request aborted", C.ECONNABORTED, e, w)), w = null);
    }, w.onerror = function() {
      i(new C("Network Error", C.ERR_NETWORK, e, w)), w = null;
    }, w.ontimeout = function() {
      let N = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const A = r.transitional || Xt;
      r.timeoutErrorMessage && (N = r.timeoutErrorMessage), i(new C(
        N,
        A.clarifyTimeoutError ? C.ETIMEDOUT : C.ECONNABORTED,
        e,
        w
      )), w = null;
    }, n === void 0 && l.setContentType(null), "setRequestHeader" in w && h.forEach(l.toJSON(), function(N, A) {
      w.setRequestHeader(A, N);
    }), h.isUndefined(r.withCredentials) || (w.withCredentials = !!r.withCredentials), c && c !== "json" && (w.responseType = r.responseType), u && ([g, m] = Se(u, !0), w.addEventListener("progress", g)), f && w.upload && ([a, S] = Se(f), w.upload.addEventListener("progress", a), w.upload.addEventListener("loadend", S)), (r.cancelToken || r.signal) && (o = (x) => {
      w && (i(!x || x.type ? new te(null, e, w) : x), w.abort(), w = null);
    }, r.cancelToken && r.cancelToken.subscribe(o), r.signal && (r.signal.aborted ? o() : r.signal.addEventListener("abort", o)));
    const F = ii(r.url);
    if (F && q.protocols.indexOf(F) === -1) {
      i(new C("Unsupported protocol " + F + ":", C.ERR_BAD_REQUEST, e));
      return;
    }
    w.send(n || null);
  });
}, di = (e, t) => {
  const { length: s } = e = e ? e.filter(Boolean) : [];
  if (t || s) {
    let i = new AbortController(), r;
    const n = function(u) {
      if (!r) {
        r = !0, c();
        const o = u instanceof Error ? u : this.reason;
        i.abort(o instanceof C ? o : new te(o instanceof Error ? o.message : o));
      }
    };
    let l = t && setTimeout(() => {
      l = null, n(new C(`timeout ${t} of ms exceeded`, C.ETIMEDOUT));
    }, t);
    const c = () => {
      e && (l && clearTimeout(l), l = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(n) : u.removeEventListener("abort", n);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", n));
    const { signal: f } = i;
    return f.unsubscribe = () => h.asap(c), f;
  }
}, gi = function* (e, t) {
  let s = e.byteLength;
  if (s < t) {
    yield e;
    return;
  }
  let i = 0, r;
  for (; i < s; )
    r = i + t, yield e.slice(i, r), i = r;
}, pi = function(e, t) {
  return Ue(this, null, function* () {
    try {
      for (var s = bt(mi(e)), i, r, n; i = !(r = yield new J(s.next())).done; i = !1) {
        const l = r.value;
        yield* Be(gi(l, t));
      }
    } catch (r) {
      n = [r];
    } finally {
      try {
        i && (r = s.return) && (yield new J(r.call(s)));
      } finally {
        if (n)
          throw n[0];
      }
    }
  });
}, mi = function(e) {
  return Ue(this, null, function* () {
    if (e[Symbol.asyncIterator]) {
      yield* Be(e);
      return;
    }
    const t = e.getReader();
    try {
      for (; ; ) {
        const { done: s, value: i } = yield new J(t.read());
        if (s)
          break;
        yield i;
      }
    } finally {
      yield new J(t.cancel());
    }
  });
}, Ot = (e, t, s, i) => {
  const r = pi(e, t);
  let n = 0, l, c = (u) => {
    l || (l = !0, i && i(u));
  };
  return new ReadableStream({
    pull(u) {
      return G(this, null, function* () {
        try {
          const { done: o, value: a } = yield r.next();
          if (o) {
            c(), u.close();
            return;
          }
          let g = a.byteLength;
          if (s) {
            let S = n += g;
            s(S);
          }
          u.enqueue(new Uint8Array(a));
        } catch (o) {
          throw c(o), o;
        }
      });
    },
    cancel(u) {
      return c(u), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, ve = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", ss = ve && typeof ReadableStream == "function", bi = ve && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : (e) => G(null, null, function* () {
  return new Uint8Array(yield new Response(e).arrayBuffer());
})), ns = (e, ...t) => {
  try {
    return !!e(...t);
  } catch (s) {
    return !1;
  }
}, wi = ss && ns(() => {
  let e = !1;
  const t = new Request(q.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Et = 64 * 1024, Ke = ss && ns(() => h.isReadableStream(new Response("").body)), Re = {
  stream: Ke && ((e) => e.body)
};
ve && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Re[t] && (Re[t] = h.isFunction(e[t]) ? (s) => s[t]() : (s, i) => {
      throw new C(`Response type '${t}' is not supported`, C.ERR_NOT_SUPPORT, i);
    });
  });
})(new Response());
const yi = (e) => G(null, null, function* () {
  if (e == null)
    return 0;
  if (h.isBlob(e))
    return e.size;
  if (h.isSpecCompliantForm(e))
    return (yield new Request(q.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (h.isArrayBufferView(e) || h.isArrayBuffer(e))
    return e.byteLength;
  if (h.isURLSearchParams(e) && (e = e + ""), h.isString(e))
    return (yield bi(e)).byteLength;
}), Si = (e, t) => G(null, null, function* () {
  const s = h.toFiniteNumber(e.getContentLength());
  return s == null ? yi(t) : s;
}), Ri = ve && ((e) => G(null, null, function* () {
  let {
    url: t,
    method: s,
    data: i,
    signal: r,
    cancelToken: n,
    timeout: l,
    onDownloadProgress: c,
    onUploadProgress: f,
    responseType: u,
    headers: o,
    withCredentials: a = "same-origin",
    fetchOptions: g
  } = ts(e);
  u = u ? (u + "").toLowerCase() : "text";
  let S = di([r, n && n.toAbortSignal()], l), m;
  const y = S && S.unsubscribe && (() => {
    S.unsubscribe();
  });
  let w;
  try {
    if (f && wi && s !== "get" && s !== "head" && (w = yield Si(o, i)) !== 0) {
      let A = new Request(t, {
        method: "POST",
        body: i,
        duplex: "half"
      }), V;
      if (h.isFormData(i) && (V = A.headers.get("content-type")) && o.setContentType(V), A.body) {
        const [D, z] = _t(
          w,
          Se(vt(f))
        );
        i = Ot(A.body, Et, D, z);
      }
    }
    h.isString(a) || (a = a ? "include" : "omit");
    const v = "credentials" in Request.prototype;
    m = new Request(t, mt(re({}, g), {
      signal: S,
      method: s.toUpperCase(),
      headers: o.normalize().toJSON(),
      body: i,
      duplex: "half",
      credentials: v ? a : void 0
    }));
    let F = yield fetch(m);
    const x = Ke && (u === "stream" || u === "response");
    if (Ke && (c || x && y)) {
      const A = {};
      ["status", "statusText", "headers"].forEach((se) => {
        A[se] = F[se];
      });
      const V = h.toFiniteNumber(F.headers.get("content-length")), [D, z] = c && _t(
        V,
        Se(vt(c), !0)
      ) || [];
      F = new Response(
        Ot(F.body, Et, D, () => {
          z && z(), y && y();
        }),
        A
      );
    }
    u = u || "text";
    let N = yield Re[h.findKey(Re, u) || "text"](F, e);
    return !x && y && y(), yield new Promise((A, V) => {
      $t(A, V, {
        data: N,
        headers: B.from(F.headers),
        status: F.status,
        statusText: F.statusText,
        config: e,
        request: m
      });
    });
  } catch (v) {
    throw y && y(), v && v.name === "TypeError" && /Load failed|fetch/i.test(v.message) ? Object.assign(
      new C("Network Error", C.ERR_NETWORK, e, m),
      {
        cause: v.cause || v
      }
    ) : C.from(v, v && v.code, e, m);
  }
})), Qe = {
  http: Un,
  xhr: fi,
  fetch: Ri
};
h.forEach(Qe, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch (s) {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const At = (e) => `- ${e}`, ki = (e) => h.isFunction(e) || e === null || e === !1, is = {
  getAdapter: (e) => {
    e = h.isArray(e) ? e : [e];
    const { length: t } = e;
    let s, i;
    const r = {};
    for (let n = 0; n < t; n++) {
      s = e[n];
      let l;
      if (i = s, !ki(s) && (i = Qe[(l = String(s)).toLowerCase()], i === void 0))
        throw new C(`Unknown adapter '${l}'`);
      if (i)
        break;
      r[l || "#" + n] = i;
    }
    if (!i) {
      const n = Object.entries(r).map(
        ([c, f]) => `adapter ${c} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let l = t ? n.length > 1 ? `since :
` + n.map(At).join(`
`) : " " + At(n[0]) : "as no adapter specified";
      throw new C(
        "There is no suitable adapter to dispatch the request " + l,
        "ERR_NOT_SUPPORT"
      );
    }
    return i;
  },
  adapters: Qe
};
function He(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new te(null, e);
}
function Tt(e) {
  return He(e), e.headers = B.from(e.headers), e.data = Ie.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), is.getAdapter(e.adapter || ce.adapter)(e).then(function(i) {
    return He(e), i.data = Ie.call(
      e,
      e.transformResponse,
      i
    ), i.headers = B.from(i.headers), i;
  }, function(i) {
    return Yt(i) || (He(e), i && i.response && (i.response.data = Ie.call(
      e,
      e.transformResponse,
      i.response
    ), i.response.headers = B.from(i.response.headers))), Promise.reject(i);
  });
}
const rs = "1.9.0", Pe = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Pe[e] = function(i) {
    return typeof i === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const qt = {};
Pe.transitional = function(t, s, i) {
  function r(n, l) {
    return "[Axios v" + rs + "] Transitional option '" + n + "'" + l + (i ? ". " + i : "");
  }
  return (n, l, c) => {
    if (t === !1)
      throw new C(
        r(l, " has been removed" + (s ? " in " + s : "")),
        C.ERR_DEPRECATED
      );
    return s && !qt[l] && (qt[l] = !0, console.warn(
      r(
        l,
        " has been deprecated since v" + s + " and will be removed in the near future"
      )
    )), t ? t(n, l, c) : !0;
  };
};
Pe.spelling = function(t) {
  return (s, i) => (console.warn(`${i} is likely a misspelling of ${t}`), !0);
};
function Fi(e, t, s) {
  if (typeof e != "object")
    throw new C("options must be an object", C.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(e);
  let r = i.length;
  for (; r-- > 0; ) {
    const n = i[r], l = t[n];
    if (l) {
      const c = e[n], f = c === void 0 || l(c, n, e);
      if (f !== !0)
        throw new C("option " + n + " must be " + f, C.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (s !== !0)
      throw new C("Unknown option " + n, C.ERR_BAD_OPTION);
  }
}
const we = {
  assertOptions: Fi,
  validators: Pe
}, I = we.validators;
let Q = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Ct(),
      response: new Ct()
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
    return G(this, null, function* () {
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
    typeof t == "string" ? (s = s || {}, s.url = t) : s = t || {}, s = W(this.defaults, s);
    const { transitional: i, paramsSerializer: r, headers: n } = s;
    i !== void 0 && we.assertOptions(i, {
      silentJSONParsing: I.transitional(I.boolean),
      forcedJSONParsing: I.transitional(I.boolean),
      clarifyTimeoutError: I.transitional(I.boolean)
    }, !1), r != null && (h.isFunction(r) ? s.paramsSerializer = {
      serialize: r
    } : we.assertOptions(r, {
      encode: I.function,
      serialize: I.function
    }, !0)), s.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : s.allowAbsoluteUrls = !0), we.assertOptions(s, {
      baseUrl: I.spelling("baseURL"),
      withXsrfToken: I.spelling("withXSRFToken")
    }, !0), s.method = (s.method || this.defaults.method || "get").toLowerCase();
    let l = n && h.merge(
      n.common,
      n[s.method]
    );
    n && h.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete n[m];
      }
    ), s.headers = B.concat(l, n);
    const c = [];
    let f = !0;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(s) === !1 || (f = f && y.synchronous, c.unshift(y.fulfilled, y.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(y) {
      u.push(y.fulfilled, y.rejected);
    });
    let o, a = 0, g;
    if (!f) {
      const m = [Tt.bind(this), void 0];
      for (m.unshift.apply(m, c), m.push.apply(m, u), g = m.length, o = Promise.resolve(s); a < g; )
        o = o.then(m[a++], m[a++]);
      return o;
    }
    g = c.length;
    let S = s;
    for (a = 0; a < g; ) {
      const m = c[a++], y = c[a++];
      try {
        S = m(S);
      } catch (w) {
        y.call(this, w);
        break;
      }
    }
    try {
      o = Tt.call(this, S);
    } catch (m) {
      return Promise.reject(m);
    }
    for (a = 0, g = u.length; a < g; )
      o = o.then(u[a++], u[a++]);
    return o;
  }
  getUri(t) {
    t = W(this.defaults, t);
    const s = es(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Wt(s, t.params, t.paramsSerializer);
  }
};
h.forEach(["delete", "get", "head", "options"], function(t) {
  Q.prototype[t] = function(s, i) {
    return this.request(W(i || {}, {
      method: t,
      url: s,
      data: (i || {}).data
    }));
  };
});
h.forEach(["post", "put", "patch"], function(t) {
  function s(i) {
    return function(n, l, c) {
      return this.request(W(c || {}, {
        method: t,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: n,
        data: l
      }));
    };
  }
  Q.prototype[t] = s(), Q.prototype[t + "Form"] = s(!0);
});
let Ci = class ls {
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
      const l = new Promise((c) => {
        i.subscribe(c), n = c;
      }).then(r);
      return l.cancel = function() {
        i.unsubscribe(n);
      }, l;
    }, t(function(n, l, c) {
      i.reason || (i.reason = new te(n, l, c), s(i.reason));
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
      token: new ls(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function xi(e) {
  return function(s) {
    return e.apply(null, s);
  };
}
function _i(e) {
  return h.isObject(e) && e.isAxiosError === !0;
}
const We = {
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
  NetworkAuthenticationRequired: 511
};
Object.entries(We).forEach(([e, t]) => {
  We[t] = e;
});
function os(e) {
  const t = new Q(e), s = Bt(Q.prototype.request, t);
  return h.extend(s, Q.prototype, t, { allOwnKeys: !0 }), h.extend(s, t, null, { allOwnKeys: !0 }), s.create = function(r) {
    return os(W(e, r));
  }, s;
}
const E = os(ce);
E.Axios = Q;
E.CanceledError = te;
E.CancelToken = Ci;
E.isCancel = Yt;
E.VERSION = rs;
E.toFormData = _e;
E.AxiosError = C;
E.Cancel = E.CanceledError;
E.all = function(t) {
  return Promise.all(t);
};
E.spread = xi;
E.isAxiosError = _i;
E.mergeConfig = W;
E.AxiosHeaders = B;
E.formToJSON = (e) => Zt(h.isHTMLForm(e) ? new FormData(e) : e);
E.getAdapter = is.getAdapter;
E.HttpStatusCode = We;
E.default = E;
const {
  Axios: xl,
  AxiosError: _l,
  CanceledError: vl,
  isCancel: Pl,
  CancelToken: Ol,
  VERSION: El,
  all: Al,
  Cancel: Tl,
  isAxiosError: ql,
  spread: jl,
  toFormData: Ll,
  AxiosHeaders: Ul,
  HttpStatusCode: Bl,
  formToJSON: Nl,
  getAdapter: Vl,
  mergeConfig: Ml
} = E, ge = {
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1400px)"
}, jt = typeof window != "undefined" && typeof window.matchMedia == "function";
let ye = null;
class vi {
  constructor() {
    fe(this, "_subscribers");
    fe(this, "_mqls");
    fe(this, "hiddenBreakpoints");
    if (this._subscribers = /* @__PURE__ */ new Set(), this._mqls = {}, this.hiddenBreakpoints = [], this._onChange = this._onChange.bind(this), this._compute(), jt)
      for (const t in ge) {
        const s = window.matchMedia(ge[t]);
        this._mqls[t] = s, s.addEventListener ? s.addEventListener("change", this._onChange) : s.addListener(this._onChange);
      }
  }
  _onChange() {
    this._compute();
  }
  _compute() {
    const t = [];
    if (jt)
      for (const s in ge)
        window.matchMedia(ge[s]).matches || t.push(s);
    t.push("all"), this.hiddenBreakpoints = t, this._subscribers.forEach((s) => s(t));
  }
  subscribe(t) {
    this._subscribers.add(t), t(this.hiddenBreakpoints);
  }
  unsubscribe(t) {
    this._subscribers.delete(t), this._subscribers.size === 0 && (this._destroy(), ye = null);
  }
  _destroy() {
    for (const t in this._mqls) {
      const s = this._mqls[t];
      s.removeEventListener ? s.removeEventListener("change", this._onChange) : s.removeListener(this._onChange);
    }
    this._mqls = {}, this._subscribers.clear();
  }
}
function Lt() {
  return ye || (ye = new vi()), ye;
}
let Pi = 0, pe = null;
function Oi() {
  if (pe === null)
    try {
      const e = "test-local-storage";
      localStorage.setItem(e, e), localStorage.removeItem(e), pe = !0;
    } catch (e) {
      pe = !1;
    }
  return pe;
}
const Ei = Object.freeze({
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
}), Ai = {
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
      uuid: "qt-" + ++Pi + "-" + Date.now(),
      loaderHeight: 0,
      defaultOperator: "equal",
      queryAjaxTimeout: null,
      lastSearchQueryUpdated: null,
      operatorFunctions: Ei,
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
        let k = 0;
        for (; this.paginationOptions[k] <= this.config.pagination && k < this.paginationOptions.length; )
          k++;
        e = this.paginationOptions[Math.min(k - 1, this.paginationOptions.length - 1)];
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
      let c = !1;
      this.config.pageSort && (c = !0);
      let f = !1;
      this.config.multiSortSelect && (f = !0);
      let u = !1;
      this.config.pageSortSelect && (u = !0);
      let o = !1;
      this.config.ajaxUrl && (o = this.config.ajaxUrl);
      let a = "post";
      ["pre", "post"].includes(this.config.selectPosition) && (a = this.config.selectPosition);
      let g = !1;
      this.config.expandedAll && (g = !0);
      let S = !1;
      this.config.useFuzzySearch && (S = !0);
      let m = !1;
      this.config.prettySelect && (m = !0);
      let y = !1;
      this.config.rowsSelect && (y = !0);
      let w = !1;
      this.config.keepSelect && (w = !0);
      let v = !1;
      this.config.disallowAllOption && (v = !0);
      let F = !1;
      this.config.hideEmptyColumns && (F = !0);
      let x = "none";
      ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns) && (x = this.config.ignoreSortEmptyColumns);
      let N = !1;
      this.config.search && (N = !0);
      let A = 1;
      this.config.searchLength && (A = this.config.searchLength);
      let V = "Search...";
      this.config.searchPlaceholder && (V = this.config.searchPlaceholder);
      let D = "Multiple sort";
      this.config.multiSortPlaceholder && (D = this.config.multiSortPlaceholder);
      let z = "Page sort";
      this.config.pageSortPlaceholder && (z = this.config.pageSortPlaceholder);
      let se = "AND";
      ["AND", "OR"].includes(this.config.filterRelation) && (se = this.config.filterRelation);
      let et = "AND";
      ["AND", "OR"].includes(this.config.filterGroupRelation) && (et = this.config.filterGroupRelation);
      let tt = "Rows per page:";
      this.config.rowsPlaceholder && (tt = this.config.rowsPlaceholder);
      let st = "No rows...";
      this.config.emptyPlaceholder && (st = this.config.emptyPlaceholder);
      let nt = !1;
      this.config.selectAll && (nt = !0);
      let ue = !1;
      this.config.selectAllRows && (ue = !0), o && ue && (console.warn(
        "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
      ), ue = !1);
      let ne = !1;
      this.config.storeState && (ne = !0), !this.identifier && this.config.storeState && (console.warn(
        "Option storeState was deactivated automatically because table identifier is not set!"
      ), ne = !1), ne && !Oi() && (console.warn(
        "Option storeState was deactivated automatically because local storage is not available!"
      ), ne = !1);
      let it = !1;
      this.config.defaultSelected && (it = !0);
      let rt = !1;
      this.config.hideRowToggle && (rt = !0);
      let lt = !1;
      this.config.enableRowTabIndex && (lt = !0);
      let ot = "chevron-up";
      this.config.expandedRowIcon && typeof this.config.expandedRowIcon == "string" && ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
        this.config.expandedRowIcon.toLowerCase()
      ) && (ot = this.config.expandedRowIcon.toLowerCase());
      let at = "chevron-down";
      this.config.collapsedRowIcon && typeof this.config.collapsedRowIcon == "string" && ["chevron-down", "plus", "caret-down", "eye"].includes(
        this.config.collapsedRowIcon.toLowerCase()
      ) && (at = this.config.collapsedRowIcon.toLowerCase());
      let ct = 5;
      this.config.pageRange && (ct = this.config.pageRange);
      let ut = "col-12";
      this.config.searchClass && (ut = this.config.searchClass);
      let ht = "row";
      this.config.searchContainerClass && (ht = this.config.searchContainerClass);
      let ft = "GET";
      this.config.requestMethod && typeof this.config.requestMethod == "string" && ["POST", "GET"].includes(this.config.requestMethod.toUpperCase()) && (ft = this.config.requestMethod.toUpperCase());
      let dt = 0, Oe = [], Ee = [], Ae = [], he = [], Te = [], qe = [], ie = [], je = [], gt = null;
      if (this.config.columns) {
        dt = this.config.columns.length;
        for (let k = 0; k < this.config.columns.length; k++)
          ie[k] = "", this.config.columns[k] && this.config.columns[k].headline ? (Oe[k] = this.config.columns[k].headline, ie[k] += this.config.columns[k].headline.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()) : Oe[k] = "", ie[k] += " column-" + (k + 1), this.config.columns[k].classes && (ie[k] += " " + this.config.columns[k].classes), this.config.columns[k] && this.config.columns[k].breakpoint ? Ee[k] = this.config.columns[k].breakpoint : Ee[k] = "", this.config.columns[k] && this.config.columns[k].sort ? this.config.columns[k].firstSortDirection && typeof this.config.columns[k].firstSortDirection == "string" && ["DESC", "ASC"].includes(
            this.config.columns[k].firstSortDirection.toUpperCase()
          ) ? he[k] = this.config.columns[k].firstSortDirection.toUpperCase() : he[k] = !0 : he[k] = !1, this.config.columns[k] && this.config.columns[k].ignoreEmpty ? je[k] = !0 : je[k] = !1, this.config.columns[k] && this.config.columns[k].sticky ? Te[k] = !0 : Te[k] = !1, this.config.columns[k] && this.config.columns[k].hidden ? Ae[k] = !0 : Ae[k] = !1, this.config.columns[k] && this.config.columns[k].align ? qe[k] = this.config.columns[k].align : qe[k] = !1;
        gt = this.config.columns;
      }
      return Object.freeze({
        headlines: Oe,
        columnClasses: ie,
        sorts: he,
        pageSort: c,
        multiSort: l,
        pageSortSelect: u,
        multiSortSelect: f,
        filterGroupRelation: et,
        filterRelation: se,
        rowsSelect: y,
        keepSelect: w,
        disallowAllOption: v,
        defaultSelected: it,
        searchLength: A,
        search: N,
        searchPlaceholder: V,
        useFuzzySearch: S,
        ajaxUrl: o,
        pageSortPlaceholder: z,
        multiSortPlaceholder: D,
        rowsPlaceholder: tt,
        emptyPlaceholder: st,
        stickyCols: Te,
        alignments: qe,
        breakpoints: Ee,
        hiddenCols: Ae,
        ignoreEmpty: je,
        hideEmptyColumns: F,
        ignoreSortEmptyColumns: x,
        pagination: e,
        numberOfVisibleRowsFillerWord: t,
        select: s,
        selectAll: nt,
        selectAllRows: ue,
        hoverClass: r,
        activeClass: n,
        expandedAll: g,
        pageRange: ct,
        prettySelect: m,
        number: dt,
        columns: gt,
        hideRowToggle: rt,
        enableRowTabIndex: lt,
        expandedRowIcon: ot,
        collapsedRowIcon: at,
        selectPosition: a,
        searchClass: ut,
        searchContainerClass: ht,
        requestMethod: ft,
        storeState: ne,
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
          let c = this.rowsFinal[l].cells ? this.rowsFinal[l].cells : this.rowsFinal[l], f = {};
          for (let u = 0; u < this.configFinal.columns.length; u++) {
            if (!t[u]) continue;
            let o = this.configFinal.columns[u];
            !(s[u] || i && !this.configFinal.ignoreEmpty[u] && this.isColEmpty(u, l)) && !o.sticky && !o.alwaysExpanded && (f[u] = c[u]);
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
        let c = this.rowsFinal[l].cells ? this.rowsFinal[l].cells : this.rowsFinal[l], f = {};
        for (let u = 0; u < this.configFinal.columns.length; u++) {
          let o = this.configFinal.columns[u];
          const a = s[u] || i && !this.configFinal.ignoreEmpty[u] && this.isColEmpty(u, l);
          (!a && o.sticky || !a && o.alwaysExpanded && t[u]) && (f[u] = c[u]);
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
          let c = [], f = this.configFinal.alignments[l];
          if ((n[l].align || r || f) && (n[l].align ? c.push("text-" + n[l].align) : r ? c.push("text-" + r) : c.push("text-" + f)), n[l].classes) {
            let u = n[l].classes.split(" ");
            Array.prototype.push.apply(c, u);
          }
          e[i].push(c.join(" "));
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
          for (let c = 0; c < this.configFinal.columns.length; c++) {
            if (!e[c]) continue;
            if (!(t[c] || !this.configFinal.ignoreEmpty[c] && this.isColEmpty(c, l))) {
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
            let l = s[n], c = l.html ? l.html : l.text;
            if (c) {
              if (this.configFinal.useFuzzySearch && St(
                (c + "").toLowerCase(),
                (this.query + "").toLowerCase()
              ).score > 6) {
                i = !0;
                break;
              }
              if ((c + "").toLowerCase().indexOf((this.query + "").toLowerCase()) !== -1) {
                i = !0;
                break;
              }
            }
          }
          if (this.rowsFinal[t].keywords)
            for (let n = 0; n < this.rowsFinal[t].keywords.length; n++) {
              if (this.configFinal.useFuzzySearch && St(
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
        const c = {};
        for (let f = 0; f < n.length; f++)
          t[f] && t[f].cellFormatter && (c[f] = this.cellFormatters(f, n[f]), l = !0);
        l && (e[i] = c);
      }
      return e;
    },
    _renderRows() {
      const e = {}, t = this.configFinal.columnClasses, s = this.cellVisible, i = this.cellClassesParsed, r = this._fmtCells, n = this.uuid;
      for (let l = 0; l < this.visibleRowIndexes.length; l++) {
        const c = this.visibleRowIndexes[l], f = this.rowsFinal[c];
        if (!f) continue;
        const u = f.cells ? f.cells : f, o = "vue-quintable-" + n + "-cell-" + c + "-", a = i[c], g = r[c], S = [];
        for (let m = 0; m < u.length; m++) {
          const y = u[m];
          S.push(
            Object.freeze({
              cell: y,
              cls: (a && a[m] || "") + " " + (t[m] || ""),
              vis: !!(s[m] && y),
              fmt: g && g[m] || null,
              key: o + m
            })
          );
        }
        e[c] = Object.freeze(S);
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
              const c = s[l];
              !this.rowsFinal[c].disableSelect && this.rowsFinal[c][r] === n && (this.selected[c] = !0, t++);
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
        if (this.configFinal.ajaxUrl) {
          const e = !(this.configFinal.storeState && this.storedState.filters);
          this.pageSort = !1, this.loadViaAjax(e, e, "FILTERS");
        }
        this.pageSort && (this.currentSortIndexes = {}, this.resetSorts(), this.recomputeEssentials()), this.configFinal.storeState && (delete this.storedState.filters, localStorage.setItem(
          `vue-quintable-${this.identifier}-filters`,
          JSON.stringify(this.filtersFinal)
        ));
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
      const c = localStorage.getItem(
        `vue-quintable-${this.identifier}-sort-indexes`
      );
      c && (this.storedState["sort-indexes"] = JSON.parse(c));
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
    this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "MOUNTED"), this.configFinal.defaultSelected && this.checkAll(!0), this._sharedBP = Lt(), this._sharedBP.subscribe(this._onBreakpointChange);
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
        Object.prototype.hasOwnProperty.call(this.sortedIndexes, i) && (i = parseInt(i), !this.rowsFinal[this.sortedIndexes[i]].disableSelect && (!this.configFinal.selectAllRows && this.visibleRows[this.sortedIndexes[i]] || this.configFinal.selectAllRows && this.filteredRows[this.sortedIndexes[i]]) ? (this.selected[this.sortedIndexes[i]] = t, s++) : this.selected[this.sortedIndexes[i]] = t);
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
          let l = r, c = s.items.slice(), f = function(u, o) {
            return u.name === void 0 ? 1 : o.name === void 0 ? -1 : 0;
          };
          c = c.sort(f);
          for (let u = 0; u < c.length; u++)
            c[u].name && (l += c[u].name, u < c.length - 1 && (l += " " + s.relation + " "));
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
            let c = !0;
            for (let f = 0; f < s.items.length; f++) {
              let u = s.items[f];
              if (u.name && t[u.name] === void 0) {
                c = !1;
                break;
              }
            }
            if (c)
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
                let o = typeof e[u.name] == "object" && e[u.name] !== null && e[u.name].operator && this.operators.includes(e[u.name].operator) ? e[u.name].operator : this.defaultOperator, a = this.getFilterValues(e[u.name]);
                const g = typeof e[u.name].compare == "function" ? e[u.name].compare : this.operatorFunctions[o];
                for (let S = 0; S < a.length; S++)
                  if (!g(
                    a[S],
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
            for (let c = 0; c < s.items.length; c++) {
              let f = s.items[c];
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
              const a = typeof e[f.name].compare == "function" ? e[f.name].compare : this.operatorFunctions[u];
              for (let g = 0; g < o.length; g++)
                if (a(
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
          const a = this.configFinal.pagination ? this.configFinal.pagination : this.rowsFinal.length;
          for (let g = 0; g < a; g++)
            i.push(g);
        }
        let o = 0;
        for (let a = 0; a < t.length; a++)
          t[a].index = a, i.indexOf(a) !== -1 && (o < this.configFinal.pagination && s.push(t[a]), o++);
        if (Object.keys(this.sortedIndexes).length)
          r = Object.assign({}, this.sortedIndexes);
        else
          for (let a = 0; a < t.length; a++)
            r[a.toString()] = a;
      } else {
        s = this.rowsFinal.slice();
        for (let o = 0; o < s.length; o++)
          s[o].index = o;
      }
      let n = [];
      for (let o in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, o)) {
          let a = this.currentSortIndexes[o];
          a.index = o, n.push(a);
        }
      n.sort(function(o, a) {
        return o.order - a.order;
      });
      let l = (o, a, g, S) => {
        S = S || 0;
        let m = g[S], y = m.index, w = o.cells ? o.cells : o, v = a.cells ? a.cells : a, F = typeof w[y].sortValue != "undefined" && w[y].sortValue !== null ? w[y].sortValue : w[y].html ? w[y].html : w[y].text;
        typeof w[y].computeSortValue == "function" && (F = w[y].computeSortValue(this.currentSortIndexes));
        let x = typeof v[y].sortValue != "undefined" && v[y].sortValue !== null ? v[y].sortValue : v[y].html ? v[y].html : v[y].text;
        return typeof v[y].computeSortValue == "function" && (F = v[y].computeSortValue(this.currentSortIndexes)), typeof F == "string" && (F = F.toLowerCase()), typeof x == "string" && (x = x.toLowerCase()), isNaN(F) ? (typeof F == "string" && F.match(/^-?\d+$/) || typeof F == "string" && F.match(/^\d+\.\d+$/)) && (F = parseFloat(F)) : F = parseFloat(F), isNaN(x) ? (typeof x == "string" && x.match(/^-?\d+$/) || typeof x == "string" && x.match(/^\d+\.\d+$/)) && (x = parseFloat(x)) : x = parseFloat(x), m.asc ? F > x ? 1 : F < x ? -1 : g[S + 1] ? l(o, a, g, S + 1) : 1 : F < x ? 1 : F > x ? -1 : g[S + 1] ? l(o, a, g, S + 1) : -1;
      };
      s.sort(function(o, a) {
        return l(o, a, n);
      });
      const c = [];
      let f = 0, u = 0;
      for (let o = 0; o < t.length; o++) {
        const a = o.toString();
        this.pageSort && i.indexOf(o) !== -1 ? (f < this.configFinal.pagination ? (c.push(s[u]), u++) : c.push(t[r[a]]), f++) : this.pageSort ? c.push(t[r[a]]) : c.push(s[o]);
      }
      for (let o = 0; o < c.length; o++) {
        const a = o.toString();
        this.sortedIndexes[a] = parseInt(c[o].index);
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
          typeof this.sortedIndexes[t] == "undefined" && (this.sortedIndexes[t] = e), typeof this.selected[t] == "undefined" && (this.selected[t] = !1), this.openRows[t] = this.configFinal.expandedAll || this.rowsFinal[e].expanded;
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
      const e = Lt();
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
}, Ti = { class: "table-wrapper quintable" }, qi = { class: "header slot slot-header quintable--header" }, ji = ["placeholder"], Li = { class: "slot slot-after-search quintable--after-search-container" }, Ui = {
  ref: "height-wrapper",
  class: "clearfix quintable--table-container"
}, Bi = { key: 0 }, Ni = { class: "vue-quintable-header-row quintable--table-container--table--header-row" }, Vi = {
  key: 0,
  class: "placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th"
}, Mi = {
  key: 1,
  class: "select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre"
}, Di = { class: "p-1" }, Ii = {
  key: 1,
  class: "mb-0 mt-0"
}, Hi = ["title", "onClick"], zi = ["innerHTML"], Gi = {
  key: 1,
  class: "headline quintable--table-container--table--header-row--th--headline"
}, Ji = {
  key: 2,
  class: "sorting-icon ms-2 quintable--table-container--table--header-row--th--sorting-icon"
}, Ki = ["onClick"], Qi = {
  key: 0,
  class: "badge bg-info text-white"
}, Wi = { key: 1 }, Xi = {
  key: 2,
  class: "select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post"
}, Zi = {
  key: 1,
  class: "mb-0 mt-0"
}, Yi = ["id", "onClick", "onAuxclick", "onMouseenter"], $i = {
  key: 0,
  class: "toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td"
}, er = { key: 0 }, tr = { key: 0 }, sr = { key: 1 }, nr = {
  key: 1,
  class: "mb-0 mt-0"
}, ir = ["onUpdate:modelValue", "disabled", "onChange"], rr = ["id", "onClick", "onAuxclick"], lr = ["innerHTML"], or = ["innerHTML"], ar = {
  key: 1,
  class: "mb-0 mt-0"
}, cr = ["onUpdate:modelValue", "disabled", "onChange"], ur = ["onMouseenter", "onClick"], hr = ["colspan"], fr = { class: "mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table" }, dr = ["id"], gr = {
  key: 0,
  class: "toggle-cell invisible"
}, pr = { key: 0 }, mr = { key: 0 }, br = { key: 1 }, wr = ["onClick"], yr = ["innerHTML"], Sr = {
  key: 1,
  class: "headline"
}, Rr = {
  key: 2,
  class: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
}, kr = ["onClick"], Fr = {
  key: 0,
  class: "badge bg-info text-white"
}, Cr = { key: 1 }, xr = ["colspan", "onClick"], _r = ["innerHTML"], vr = {
  key: 1,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value"
}, Pr = ["innerHTML"], Or = {
  key: 3,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component"
}, Er = {
  key: 4,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text"
}, Ar = ["id"], Tr = {
  key: 0,
  class: "toggle-cell invisible"
}, qr = { key: 0 }, jr = { key: 0 }, Lr = { key: 1 }, Ur = ["onClick"], Br = ["innerHTML"], Nr = {
  key: 1,
  class: "headline"
}, Vr = {
  key: 2,
  class: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
}, Mr = ["onClick"], Dr = {
  key: 0,
  class: "badge bg-info text-white"
}, Ir = { key: 1 }, Hr = ["colspan", "onClick"], zr = ["innerHTML"], Gr = ["innerHTML"], Jr = {
  key: 1,
  class: "clearfix slot-no-results slot quintable--table-container--no-results"
}, Kr = { class: "text-center p-3 quintable--table-container--no-results--results" }, Qr = ["innerHTML"], Wr = {
  key: 1,
  class: "slot-loading slot quintable--loading"
}, Xr = { class: "loader text-center py-4 quintable--loading--loader-wrapper--loader" }, Zr = { class: "clearfix quintable--table-footer-container" }, Yr = { class: "row" }, $r = { class: "col-lg-4 quintable--table-footer-container--sort-container" }, el = { class: "col-lg-8 quintable--table-footer-container--pagination-wrapper" }, tl = {
  key: 0,
  class: "float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container"
}, sl = {
  key: 0,
  class: "mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select"
}, nl = ["innerHTML"], il = { class: "pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination" }, rl = { class: "page-link" }, ll = { class: "page-link" }, ol = ["onClick"], al = { class: "page-link" }, cl = { class: "page-link" }, ul = { class: "page-link" }, hl = {
  key: 2,
  class: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows"
}, fl = { class: "footer slot slot-footer quintable--footer" };
function dl(e, t, s, i, r, n) {
  const l = Ne("quintable-font-awesome-icon"), c = Ne("quintable-p-check"), f = Ne("quintable-v-select"), u = Us("tooltip");
  return d(), p("div", Ti, [
    R("div", qi, [
      P(e.$slots, "header", {}, void 0, !0)
    ]),
    n.configFinal.search ? (d(), p("div", {
      key: 0,
      class: _(["mb-3 quintable--search-container", n.configFinal.searchContainerClass])
    }, [
      P(e.$slots, "before-search", {}, void 0, !0),
      P(e.$slots, "search", {
        value: r.query,
        loading: s.loading,
        setSearchQuery: n.setSearchQuery,
        placeholder: n.configFinal.searchPlaceholder,
        searchClass: n.configFinal.searchClass
      }, () => [
        R("div", {
          class: _(["quintable--search-container--input-container", n.configFinal.searchClass])
        }, [
          H(R("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (o) => r.query = o),
            type: "search",
            placeholder: n.configFinal.searchPlaceholder,
            class: "form-control"
          }, null, 8, ji), [
            [Bs, r.query]
          ])
        ], 2)
      ], !0),
      P(e.$slots, "after-search", {}, void 0, !0)
    ], 2)) : b("", !0),
    R("div", Li, [
      P(e.$slots, "after-search-container", {}, void 0, !0)
    ]),
    R("div", Ui, [
      n.ajaxLoading ? b("", !0) : (d(), p("table", {
        key: 0,
        ref: "table",
        class: _(["vue-quintable table quintable--table-container--table", s.tableClasses])
      }, [
        n.configFinal.headlines.length ? (d(), p("thead", Bi, [
          R("tr", Ni, [
            n.hasGeneratedRows && !n.configFinal.hideRowToggle ? (d(), p("th", Vi, t[21] || (t[21] = [
              R("wbr", null, null, -1)
            ]))) : b("", !0),
            n.configFinal.select && n.configFinal.selectPosition === "pre" ? (d(), p("th", Mi, [
              n.configFinal.selectAll && !n.noRows ? (d(), p(j, { key: 0 }, [
                n.configFinal.prettySelect ? (d(), O(c, {
                  key: 0,
                  modelValue: n.allSelectedProperty,
                  "onUpdate:modelValue": t[1] || (t[1] = (o) => n.allSelectedProperty = o),
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[2] || (t[2] = (o) => n.checkAll())
                }, {
                  extra: Z(() => [
                    R("span", null, [
                      n.allSelectedProperty ? (d(), O(l, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : b("", !0)
                    ]),
                    R("span", Di, [
                      n.someSelected && !n.allSelectedProperty ? (d(), O(l, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : b("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : (d(), p("label", Ii, [
                  H(R("input", {
                    "onUpdate:modelValue": t[3] || (t[3] = (o) => n.allSelectedProperty = o),
                    type: "checkbox",
                    onChange: t[4] || (t[4] = (o) => n.checkAll())
                  }, null, 544), [
                    [de, n.allSelectedProperty]
                  ])
                ]))
              ], 64)) : b("", !0)
            ])) : b("", !0),
            (d(!0), p(j, null, Y(n.configFinal.headlines, (o, a) => (d(), p(j, null, [
              n.cellVisible[a] ? (d(), p("th", {
                key: "headline-" + a,
                class: _(n.headerClass[a]),
                title: n.configFinal.columns[a].title,
                onClick: $((g) => n.setSortColumn(a), ["stop"])
              }, [
                n.showHeadlines[a] ? (d(), p("span", {
                  key: 0,
                  class: "headline quintable--table-container--table--header-row--th--headline",
                  innerHTML: o
                }, null, 8, zi)) : (d(), p("span", Gi, t[22] || (t[22] = [
                  R("wbr", null, null, -1)
                ]))),
                n.configFinal.sorts[a] ? (d(), p("span", Ji, [
                  r.currentSortIndexes[a] ? b("", !0) : (d(), O(l, {
                    key: 0,
                    icon: "sort",
                    class: "text-primary"
                  })),
                  r.currentSortIndexes[a] && r.currentSortIndexes[a].asc ? (d(), O(l, {
                    key: 1,
                    icon: "sort-amount-down-alt",
                    class: "text-primary"
                  })) : b("", !0),
                  r.currentSortIndexes[a] && !r.currentSortIndexes[a].asc ? (d(), O(l, {
                    key: 2,
                    icon: "sort-amount-down",
                    class: "text-primary"
                  })) : b("", !0),
                  r.currentSortIndexes[a] ? (d(), p("span", {
                    key: 3,
                    class: "ms-1 text-muted",
                    onClick: $((g) => n.removeSort(a), ["stop", "prevent"])
                  }, [
                    n.numberOfSorts > 1 ? (d(), p("span", Qi, T(r.currentSortIndexes[a].order + 1), 1)) : (d(), p("small", Wi, [
                      L(l, { icon: "times" })
                    ]))
                  ], 8, Ki)) : b("", !0)
                ])) : b("", !0)
              ], 10, Hi)) : b("", !0)
            ], 64))), 256)),
            n.configFinal.select && n.configFinal.selectPosition === "post" ? (d(), p("th", Xi, [
              n.configFinal.selectAll && !n.noRows ? (d(), p(j, { key: 0 }, [
                n.configFinal.prettySelect ? (d(), O(c, {
                  key: 0,
                  modelValue: n.allSelectedProperty,
                  "onUpdate:modelValue": t[5] || (t[5] = (o) => n.allSelectedProperty = o),
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[6] || (t[6] = (o) => n.checkAll())
                }, {
                  extra: Z(() => [
                    R("span", null, [
                      n.allSelectedProperty ? (d(), O(l, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : b("", !0)
                    ]),
                    R("span", null, [
                      n.someSelected && !n.allSelectedProperty ? (d(), O(l, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : b("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : (d(), p("label", Zi, [
                  H(R("input", {
                    "onUpdate:modelValue": t[7] || (t[7] = (o) => n.allSelectedProperty = o),
                    type: "checkbox",
                    onChange: t[8] || (t[8] = (o) => n.checkAll())
                  }, null, 544), [
                    [de, n.allSelectedProperty]
                  ])
                ]))
              ], 64)) : b("", !0)
            ])) : b("", !0)
          ])
        ])) : b("", !0),
        R("tbody", {
          class: "quintable--table-container--table--tbody",
          onMouseleave: t[11] || (t[11] = (...o) => n.onMouseleaveTable && n.onMouseleaveTable(...o))
        }, [
          (d(!0), p(j, null, Y(n.visibleRowIndexes, (o) => (d(), p(j, {
            key: "vue-quintable-" + r.uuid + "-row-" + o + "-" + r.essentialsKey
          }, [
            H((d(), p("tr", {
              id: "vue-quintable-" + r.uuid + "-row-" + o,
              ref_for: !0,
              ref: "row-highlighted-" + o,
              class: _([n.rowClasses[o], "vue-quintable-row quintable--table-container--table--tbody--row"]),
              style: wt(n.hiddenColumns[o] > 0 ? "cursor:pointer;" : ""),
              onClick: (a) => n.onRowClick(a, o),
              onAuxclick: (a) => n.onRowAuxClick(a, o),
              onMousedown: t[10] || (t[10] = (a) => n.onRowMousedown(a)),
              onMouseenter: (a) => n._hoverRow(o, a)
            }, [
              n.hasGeneratedRows && !n.configFinal.hideRowToggle ? (d(), p("td", $i, [
                n.hiddenColumns[o] > 0 ? (d(), p("span", er, [
                  r.openRows[o] ? (d(), p("span", sr, [
                    L(l, {
                      "fixed-width": "",
                      icon: n.configFinal.expandedRowIcon
                    }, null, 8, ["icon"])
                  ])) : (d(), p("span", tr, [
                    L(l, {
                      "fixed-width": "",
                      icon: n.configFinal.collapsedRowIcon
                    }, null, 8, ["icon"])
                  ]))
                ])) : b("", !0)
              ])) : b("", !0),
              n.configFinal.select && n.configFinal.selectPosition === "pre" ? (d(), p("td", {
                key: 1,
                class: _(["select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre", { "disabled-select": n.rowsFinal[o].disableSelect }])
              }, [
                !n.rowsFinal[o].disableSelect || n.rowsFinal[o].showDisabledSelect ? (d(), p(j, { key: 0 }, [
                  n.configFinal.prettySelect ? (d(), O(c, {
                    key: 0,
                    modelValue: r.selected[o],
                    "onUpdate:modelValue": (a) => r.selected[o] = a,
                    name: "check",
                    class: "p-icon",
                    disabled: n.rowsFinal[o].disableSelect,
                    onChange: (a) => n.checkListener(a, o)
                  }, {
                    extra: Z(() => [
                      R("span", null, [
                        r.selected[o] ? (d(), O(l, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : b("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : (d(), p("label", nr, [
                    H(R("input", {
                      "onUpdate:modelValue": (a) => r.selected[o] = a,
                      type: "checkbox",
                      disabled: n.rowsFinal[o].disableSelect,
                      onChange: (a) => n.checkListener(a, o)
                    }, null, 40, ir), [
                      [de, r.selected[o]]
                    ])
                  ]))
                ], 64)) : b("", !0)
              ], 2)) : b("", !0),
              (d(!0), p(j, null, Y(n._renderRows[o], (a) => (d(), p(j, null, [
                a.vis ? H((d(), p("td", {
                  id: a.key,
                  key: a.key,
                  class: _(["vue-quintable-cell quintable--table-container--table--tbody--row--cell", a.cls]),
                  onClick: (g) => n.onCellClick(g, a.cell),
                  onAuxclick: (g) => n.onCellAuxClick(g, a.cell),
                  onMousedown: t[9] || (t[9] = (g) => n.onCellMousedown(g))
                }, [
                  P(e.$slots, "cell-complete", {
                    cell: a.cell
                  }, () => [
                    P(e.$slots, "cell-content", {
                      cell: a.cell
                    }, () => [
                      a.fmt && a.fmt.type === "html" ? (d(), p("div", {
                        key: 0,
                        class: _(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html"]),
                        innerHTML: a.fmt.value
                      }, null, 8, lr)) : a.fmt ? (d(), p("div", {
                        key: 1,
                        class: _(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value"])
                      }, T(a.fmt.value), 1)) : n.valueToString(a.cell.html) ? (d(), p("div", {
                        key: 2,
                        class: _(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--html"]),
                        innerHTML: a.cell.html
                      }, null, 8, or)) : a.cell.component ? (d(), p("div", {
                        key: 3,
                        class: _(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--component"])
                      }, [
                        (d(), O(Ve(a.cell.component.name), Me({ ref_for: !0 }, a.cell.component.props, { onAction: n.handleComponentEvent }), null, 16, ["onAction"]))
                      ])) : n.valueToString(a.cell.text) ? (d(), p("div", {
                        key: 4,
                        class: _(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--text"])
                      }, T(a.cell.text), 1)) : b("", !0)
                    ], !0)
                  ], !0)
                ], 42, rr)), [
                  [u, {
                    placement: "left",
                    content: a.cell.tooltip,
                    trigger: a.cell.tooltip ? "hover" : "manual"
                  }]
                ]) : b("", !0)
              ], 64))), 256)),
              n.configFinal.select && n.configFinal.selectPosition === "post" ? (d(), p("td", {
                key: 2,
                class: _(["select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post", { "disabled-select": n.rowsFinal[o].disableSelect }])
              }, [
                !n.rowsFinal[o].disableSelect || n.rowsFinal[o].showDisabledSelect ? (d(), p(j, { key: 0 }, [
                  n.configFinal.prettySelect ? (d(), O(c, {
                    key: 0,
                    modelValue: r.selected[o],
                    "onUpdate:modelValue": (a) => r.selected[o] = a,
                    name: "check",
                    class: "p-icon",
                    disabled: n.rowsFinal[o].disableSelect,
                    onChange: (a) => n.checkListener(a, o)
                  }, {
                    extra: Z(() => [
                      R("span", null, [
                        r.selected[o] ? (d(), O(l, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : b("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : (d(), p("label", ar, [
                    H(R("input", {
                      "onUpdate:modelValue": (a) => r.selected[o] = a,
                      type: "checkbox",
                      disabled: n.rowsFinal[o].disableSelect,
                      onChange: (a) => n.checkListener(a, o)
                    }, null, 40, cr), [
                      [de, r.selected[o]]
                    ])
                  ]))
                ], 64)) : b("", !0)
              ], 2)) : b("", !0)
            ], 46, Yi)), [
              [u, {
                placement: "top",
                content: n.rowsFinal[o].tooltip,
                trigger: n.rowsFinal[o].tooltip ? "hover" : "manual",
                offset: 5
              }]
            ]),
            (n.generatedRows[o] || n.stickyRows[o]) && n.visibleRows[o] ? (d(), p(j, { key: 0 }, [
              r.generatedUpdatedKey && r.openRows[o] && Object.keys(n.generatedRows[o]).length || Object.keys(n.stickyRows[o]).length ? (d(), p("tr", {
                key: "generated-row-" + o + "-" + r.essentialsKey + "-" + r.generatedUpdatedKey,
                ref_for: !0,
                ref: "generated-row-highlighted-" + o,
                class: _(["generated-row quintable--table-container--table--tbody--generated-row", {
                  "parent-row-expanded": r.openRows[o],
                  "parent-row-collapsed": n.hiddenColumns[o] > 0 && !r.openRows[o]
                }]),
                onMouseenter: (a) => n._hoverRow(o, a),
                onClick: (a) => n.onRowClick(a, o)
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
                    R("table", fr, [
                      R("tbody", null, [
                        (d(!0), p(j, null, Y(n.generatedRows[o], (a, g) => (d(), p(j, null, [
                          r.openRows[o] ? (d(), p("tr", {
                            id: "vue-quintable-" + r.uuid + "-generated-row-cell-" + o + "-" + g,
                            key: "vue-quintable-" + r.uuid + "-generated-row-cell-" + o + "-" + g + "-" + r.generatedUpdatedKey,
                            class: "generated-row-cell quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell"
                          }, [
                            !n.configFinal.hideRowToggle && n.generatedRows[o] && Object.keys(n.generatedRows[o]).length ? (d(), p("td", gr, [
                              n.hiddenColumns[o] > 0 ? (d(), p("span", pr, [
                                r.openRows[o] ? (d(), p("span", br, [
                                  L(l, {
                                    "fixed-width": "",
                                    icon: n.configFinal.expandedRowIcon
                                  }, null, 8, ["icon"])
                                ])) : (d(), p("span", mr, [
                                  L(l, {
                                    "fixed-width": "",
                                    icon: n.configFinal.collapsedRowIcon
                                  }, null, 8, ["icon"])
                                ]))
                              ])) : b("", !0)
                            ])) : b("", !0),
                            n.showHeadlines[g] || n.configFinal.sorts[g] ? (d(), p("td", {
                              key: 1,
                              class: _([n.configFinal.columnClasses[g], "generated-cell-element generated-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline"]),
                              onClick: $((S) => n.setSortColumn(g), ["stop"])
                            }, [
                              n.showHeadlines[g] ? (d(), p("strong", {
                                key: 0,
                                innerHTML: n.configFinal.headlines[g]
                              }, null, 8, yr)) : (d(), p("span", Sr, t[23] || (t[23] = [
                                R("wbr", null, null, -1)
                              ]))),
                              n.configFinal.sorts[g] && r.hoveredRow === o ? (d(), p("span", Rr, [
                                r.currentSortIndexes[g] ? b("", !0) : (d(), O(l, {
                                  key: 0,
                                  icon: "sort",
                                  class: "text-primary"
                                })),
                                r.currentSortIndexes[g] && r.currentSortIndexes[g].asc ? (d(), O(l, {
                                  key: 1,
                                  icon: "sort-amount-down-alt",
                                  class: "text-primary"
                                })) : b("", !0),
                                r.currentSortIndexes[g] && !r.currentSortIndexes[g].asc ? (d(), O(l, {
                                  key: 2,
                                  icon: "sort-amount-down",
                                  class: "text-primary"
                                })) : b("", !0),
                                r.currentSortIndexes[g] ? (d(), p("span", {
                                  key: 3,
                                  class: "ms-1 text-muted",
                                  onClick: $((S) => n.removeSort(g), ["stop", "prevent"])
                                }, [
                                  n.numberOfSorts > 1 ? (d(), p("span", Fr, T(r.currentSortIndexes[g].order + 1), 1)) : (d(), p("small", Cr, [
                                    L(l, { icon: "times" })
                                  ]))
                                ], 8, kr)) : b("", !0)
                              ])) : b("", !0)
                            ], 10, wr)) : b("", !0),
                            H((d(), p("td", {
                              colspan: !n.showHeadlines[g] && !n.configFinal.sorts[g] ? 2 : 1,
                              class: _([
                                n.configFinal.columnClasses[g] + " " + n.cellClassesParsed[o][g],
                                "generated-cell-element generated-cell-element-content generated-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content"
                              ]),
                              onClick: (S) => n.onCellClick(S, a)
                            }, [
                              P(e.$slots, "generated-cell-complete", { cell: a }, () => [
                                P(e.$slots, "generated-cell-content", { cell: a }, () => [
                                  n.configFinal.columns[g].cellFormatter && n.cellFormatters(g, a).type === "html" ? (d(), p("div", {
                                    key: 0,
                                    class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html",
                                    innerHTML: n.cellFormatters(g, a).value
                                  }, null, 8, _r)) : n.configFinal.columns[g].cellFormatter ? (d(), p("div", vr, T(n.cellFormatters(g, a).value), 1)) : n.valueToString(a.html) ? (d(), p("div", {
                                    key: 2,
                                    class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html",
                                    innerHTML: a.html
                                  }, null, 8, Pr)) : a.component ? (d(), p("div", Or, [
                                    (d(), O(Ve(a.component.name), Me({ ref_for: !0 }, a.component.props, { onAction: n.handleComponentEvent }), null, 16, ["onAction"]))
                                  ])) : n.valueToString(a.text) ? (d(), p("div", Er, T(a.text), 1)) : b("", !0)
                                ], !0)
                              ], !0)
                            ], 10, xr)), [
                              [u, {
                                placement: "top",
                                content: a.tooltip,
                                trigger: a.tooltip ? "hover" : "manual"
                              }]
                            ])
                          ], 8, dr)) : b("", !0)
                        ], 64))), 256)),
                        (d(!0), p(j, null, Y(n.stickyRows[o], (a, g) => (d(), p("tr", {
                          id: "vue-quintable-" + r.uuid + "-sticky-row-cell-" + o + "-" + g,
                          key: "vue-quintable-" + r.uuid + "-sticky-row-cell-" + o + "-" + g,
                          class: "sticky-row-cell quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell"
                        }, [
                          !n.configFinal.hideRowToggle && n.generatedRows[o] && Object.keys(n.generatedRows[o]).length ? (d(), p("td", Tr, [
                            n.hiddenColumns[o] > 0 ? (d(), p("span", qr, [
                              r.openRows[o] ? (d(), p("span", Lr, [
                                L(l, {
                                  "fixed-width": "",
                                  icon: n.configFinal.expandedRowIcon
                                }, null, 8, ["icon"])
                              ])) : (d(), p("span", jr, [
                                L(l, {
                                  "fixed-width": "",
                                  icon: n.configFinal.collapsedRowIcon
                                }, null, 8, ["icon"])
                              ]))
                            ])) : b("", !0)
                          ])) : b("", !0),
                          n.showHeadlines[g] || n.configFinal.sorts[g] ? (d(), p("td", {
                            key: 1,
                            class: _([n.configFinal.columnClasses[g], "generated-cell-element sticky-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline"]),
                            onClick: $((S) => n.setSortColumn(g), ["stop"])
                          }, [
                            n.showHeadlines[g] ? (d(), p("strong", {
                              key: 0,
                              innerHTML: n.configFinal.headlines[g]
                            }, null, 8, Br)) : (d(), p("span", Nr, t[24] || (t[24] = [
                              R("wbr", null, null, -1)
                            ]))),
                            n.configFinal.sorts[g] && r.hoveredRow === o ? (d(), p("span", Vr, [
                              r.currentSortIndexes[g] ? b("", !0) : (d(), O(l, {
                                key: 0,
                                icon: "sort",
                                class: "text-primary"
                              })),
                              r.currentSortIndexes[g] && r.currentSortIndexes[g].asc ? (d(), O(l, {
                                key: 1,
                                icon: "sort-amount-down-alt",
                                class: "text-primary"
                              })) : b("", !0),
                              r.currentSortIndexes[g] && !r.currentSortIndexes[g].asc ? (d(), O(l, {
                                key: 2,
                                icon: "sort-amount-down",
                                class: "text-primary"
                              })) : b("", !0),
                              r.currentSortIndexes[g] ? (d(), p("span", {
                                key: 3,
                                class: "ms-1 text-muted",
                                onClick: $((S) => n.removeSort(g), ["stop", "prevent"])
                              }, [
                                n.numberOfSorts > 1 ? (d(), p("span", Dr, T(r.currentSortIndexes[g].order + 1), 1)) : (d(), p("small", Ir, [
                                  L(l, { icon: "times" })
                                ]))
                              ], 8, Mr)) : b("", !0)
                            ])) : b("", !0)
                          ], 10, Ur)) : b("", !0),
                          H((d(), p("td", {
                            colspan: !n.showHeadlines[g] && !n.configFinal.sorts[g] ? 2 : 1,
                            class: _([
                              n.configFinal.columnClasses[g] + " " + n.cellClassesParsed[o][g],
                              "generated-cell-element generated-cell-element-content sticky-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content"
                            ]),
                            onClick: (S) => n.onCellClick(S, a)
                          }, [
                            P(e.$slots, "sticky-cell-complete", { cell: a }, () => [
                              P(e.$slots, "sticky-cell-content", { cell: a }, () => [
                                n.configFinal.columns[g].cellFormatter && n.cellFormatters(g, a).type === "html" ? (d(), p("div", {
                                  key: 0,
                                  class: _(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html"]),
                                  innerHTML: n.cellFormatters(g, a).value
                                }, null, 8, zr)) : n.configFinal.columns[g].cellFormatter ? (d(), p("div", {
                                  key: 1,
                                  class: _(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value"])
                                }, T(n.cellFormatters(g, a).value), 1)) : n.valueToString(a.html) ? (d(), p("div", {
                                  key: 2,
                                  class: _(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html"]),
                                  innerHTML: a.html
                                }, null, 8, Gr)) : a.component ? (d(), p("div", {
                                  key: 3,
                                  class: _(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component"])
                                }, [
                                  (d(), O(Ve(a.component.name), Me({ ref_for: !0 }, a.component.props, { onAction: n.handleComponentEvent }), null, 16, ["onAction"]))
                                ])) : n.valueToString(a.text) ? (d(), p("div", {
                                  key: 4,
                                  class: _(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text"])
                                }, T(a.text), 1)) : b("", !0)
                              ], !0)
                            ], !0)
                          ], 10, Hr)), [
                            [u, {
                              placement: "top",
                              content: a.tooltip,
                              trigger: a.tooltip ? "hover" : "manual"
                            }]
                          ])
                        ], 8, Ar))), 128))
                      ])
                    ])
                  ], 2)
                ], 8, hr)
              ], 42, ur)) : b("", !0)
            ], 64)) : b("", !0)
          ], 64))), 128))
        ], 32)
      ], 2)),
      n.noRows && !n.ajaxLoading ? (d(), p("div", Jr, [
        P(e.$slots, "no-results", {}, () => [
          R("div", Kr, [
            R("em", {
              innerHTML: n.configFinal.emptyPlaceholder
            }, null, 8, Qr)
          ])
        ], !0),
        t[25] || (t[25] = R("hr", null, null, -1))
      ])) : b("", !0)
    ], 512),
    n.ajaxLoading ? (d(), p("div", Wr, [
      P(e.$slots, "loading", {}, () => [
        R("div", {
          class: "loader-wrapper quintable--loading--loader-wrapper",
          style: wt("height:" + r.loaderHeight + "px;")
        }, [
          R("div", Xr, [
            L(l, {
              icon: "circle-notch",
              spin: "",
              class: "ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader"
            })
          ])
        ], 4)
      ], !0)
    ])) : b("", !0),
    R("div", Zr, [
      R("div", Yr, [
        R("div", $r, [
          n.configFinal.multiSortSelect || n.configFinal.pageSortSelect ? (d(), p("div", {
            key: 0,
            class: _(
              `pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select flex-inline ${n.configFinal.pageSort ? "me-3" : ""}`.trim()
            )
          }, [
            n.configFinal.multiSortSelect ? (d(), O(c, {
              key: 0,
              modelValue: n.multiSort,
              "onUpdate:modelValue": t[12] || (t[12] = (o) => n.multiSort = o),
              class: "p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select",
              value: "true"
            }, {
              default: Z(() => [
                yt(T(n.configFinal.multiSortPlaceholder), 1)
              ]),
              _: 1
            }, 8, ["modelValue"])) : b("", !0),
            n.configFinal.pageSortSelect ? (d(), O(c, {
              key: 1,
              modelValue: n.pageSort,
              "onUpdate:modelValue": t[13] || (t[13] = (o) => n.pageSort = o),
              class: "p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select",
              value: "true"
            }, {
              default: Z(() => [
                yt(T(n.configFinal.pageSortPlaceholder), 1)
              ]),
              _: 1
            }, 8, ["modelValue"])) : b("", !0)
          ], 2)) : b("", !0)
        ]),
        R("div", el, [
          n.configFinal && n.configFinal.pagination ? (d(), p("div", tl, [
            n.configFinal.rowsSelect ? (d(), p("div", sl, [
              R("span", {
                class: "d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder",
                innerHTML: n.configFinal.rowsPlaceholder
              }, null, 8, nl),
              L(f, {
                modelValue: n.currentRowsPerPageProperty,
                "onUpdate:modelValue": t[14] || (t[14] = (o) => n.currentRowsPerPageProperty = o),
                class: "d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select",
                options: n.paginationOptionsFilled,
                clearable: !1
              }, null, 8, ["modelValue", "options"])
            ])) : b("", !0),
            n.configFinal && n.configFinal.pagination && n.pages > 1 ? (d(), p("nav", {
              key: 1,
              class: _(["d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav", { "me-3": n.numberOfVisibleRows, disabled: n.ajaxLoading }])
            }, [
              R("ul", il, [
                n.pages > n.pageRange ? (d(), p("li", {
                  key: 0,
                  class: _(["page-item", { disabled: r.currentPage <= 1 }]),
                  onClick: t[15] || (t[15] = (o) => n.gotoPage("first"))
                }, [
                  R("span", rl, [
                    L(l, { icon: "angle-double-left" })
                  ])
                ], 2)) : b("", !0),
                R("li", {
                  class: _(["page-item", { disabled: r.currentPage <= 1 }]),
                  onClick: t[16] || (t[16] = (o) => n.gotoPage("prev"))
                }, [
                  R("span", ll, [
                    L(l, { icon: "angle-left" })
                  ])
                ], 2),
                n.pageRange < n.pages && n.visiblePages[0] > 1 ? (d(), p("li", {
                  key: 1,
                  class: "page-item",
                  onClick: t[17] || (t[17] = (o) => n.updatePageOffset(-1))
                }, t[26] || (t[26] = [
                  R("span", { class: "page-link" }, " ... ", -1)
                ]))) : b("", !0),
                (d(!0), p(j, null, Y(n.visiblePages, (o) => (d(), p("li", {
                  key: "pagination-item-" + o,
                  class: _(["page-item", { active: o === r.currentPage }]),
                  onClick: (a) => n.gotoPage(o)
                }, [
                  R("span", al, T(o), 1)
                ], 10, ol))), 128)),
                n.pageRange < n.pages && n.visiblePages[n.visiblePages.length - 1] < n.pages ? (d(), p("li", {
                  key: 2,
                  class: "page-item",
                  onClick: t[18] || (t[18] = (o) => n.updatePageOffset(1))
                }, t[27] || (t[27] = [
                  R("span", { class: "page-link" }, " ... ", -1)
                ]))) : b("", !0),
                R("li", {
                  class: _(["page-item", { disabled: n.pages === r.currentPage }]),
                  onClick: t[19] || (t[19] = (o) => n.gotoPage("next"))
                }, [
                  R("span", cl, [
                    L(l, { icon: "angle-right" })
                  ])
                ], 2),
                n.pages > n.pageRange ? (d(), p("li", {
                  key: 3,
                  class: _(["page-item", { disabled: n.pages === r.currentPage }]),
                  onClick: t[20] || (t[20] = (o) => n.gotoPage("last"))
                }, [
                  R("span", ul, [
                    L(l, { icon: "angle-double-right" })
                  ])
                ], 2)) : b("", !0)
              ])
            ], 2)) : b("", !0),
            n.numberOfVisibleRows ? (d(), p("span", hl, T(n.firstVisibleRow) + "-" + T(n.lastVisibleRow) + " " + T(n.configFinal.numberOfVisibleRowsFillerWord) + " " + T(n.numberOfVisibleRows), 1)) : b("", !0)
          ])) : b("", !0)
        ])
      ])
    ]),
    R("div", fl, [
      P(e.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const gl = /* @__PURE__ */ Xe(Ai, [["render", dl], ["__scopeId", "data-v-8289e0dd"]]), Dl = (e, t = {}) => {
  e.component("VueQuintable", gl), Vs(e), Qs(e), Ws(e), e.use(Ut, {
    // You can tweak defaults here; example sets a custom distance.
    distance: 6
    // If you want a custom theme class, add CSS and set theme on each use.
    // See floating-vue docs for options.
  }), t.axios && (e.config.globalProperties || (e.config.globalProperties = {}), e.config.globalProperties.$globalVueQuintableaxios = t.axios);
};
export {
  gl as VueQuintable,
  Dl as default
};
//# sourceMappingURL=vue-quintable.es.js.map
