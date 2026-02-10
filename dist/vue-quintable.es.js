var is = Object.defineProperty, ns = Object.defineProperties;
var rs = Object.getOwnPropertyDescriptors;
var ht = Object.getOwnPropertySymbols;
var ls = Object.prototype.hasOwnProperty, os = Object.prototype.propertyIsEnumerable;
var X = (e, t) => (t = Symbol[e]) ? t : Symbol.for("Symbol." + e), as = (e) => {
  throw TypeError(e);
};
var dt = (e, t, i) => t in e ? is(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, ne = (e, t) => {
  for (var i in t || (t = {}))
    ls.call(t, i) && dt(e, i, t[i]);
  if (ht)
    for (var i of ht(t))
      os.call(t, i) && dt(e, i, t[i]);
  return e;
}, ft = (e, t) => ns(e, rs(t));
var z = (e, t, i) => new Promise((n, r) => {
  var s = (g) => {
    try {
      c(i.next(g));
    } catch (u) {
      r(u);
    }
  }, l = (g) => {
    try {
      c(i.throw(g));
    } catch (u) {
      r(u);
    }
  }, c = (g) => g.done ? n(g.value) : Promise.resolve(g.value).then(s, l);
  c((i = i.apply(e, t)).next());
}), J = function(e, t) {
  this[0] = e, this[1] = t;
}, Te = (e, t, i) => {
  var n = (l, c, g, u) => {
    try {
      var o = i[l](c), a = (c = o.value) instanceof J, f = o.done;
      Promise.resolve(a ? c[0] : c).then((b) => a ? n(l === "return" ? l : "next", c[1] ? { done: b.done, value: b.value } : b, g, u) : g({ value: b, done: f })).catch((b) => n("throw", b, g, u));
    } catch (b) {
      u(b);
    }
  }, r = (l) => s[l] = (c) => new Promise((g, u) => n(l, c, g, u)), s = {};
  return i = i.apply(e, t), s[X("asyncIterator")] = () => s, r("next"), r("throw"), r("return"), s;
}, qe = (e) => {
  var t = e[X("asyncIterator")], i = !1, n, r = {};
  return t == null ? (t = e[X("iterator")](), n = (s) => r[s] = (l) => t[s](l)) : (t = t.call(e), n = (s) => r[s] = (l) => {
    if (i) {
      if (i = !1, s === "throw") throw l;
      return l;
    }
    return i = !0, {
      done: !1,
      value: new J(new Promise((c) => {
        var g = t[s](l);
        g instanceof Object || as("Object expected"), c(g);
      }), 1)
    };
  }), r[X("iterator")] = () => r, n("next"), "throw" in t ? n("throw") : r.throw = (s) => {
    throw s;
  }, "return" in t && n("return"), r;
}, gt = (e, t, i) => (t = e[X("asyncIterator")]) ? t.call(e) : (e = e[X("iterator")](), t = {}, i = (n, r) => (r = e[n]) && (t[n] = (s) => new Promise((l, c, g) => (s = r.call(e, s), g = s.done, Promise.resolve(s.value).then((u) => l({ value: u, done: g }), c)))), i("next"), i("return"), t);
import At from "floating-vue";
import { library as cs } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as us } from "@fortawesome/vue-fontawesome";
import { faChevronUp as hs, faChevronDown as ds, faInfoCircle as fs, faAngleDoubleLeft as gs, faAngleDoubleRight as ps, faAngleLeft as ms, faAngleRight as ws, faArrowsAlt as bs, faExpand as ys, faSort as Ss, faSortAmountDown as ks, faSortAmountDownAlt as Fs, faSortAmountUp as Rs, faSortAmountUpAlt as Cs, faTimes as xs, faCheck as Ps, faSquare as vs, faCircleNotch as Os, faPlus as _s, faCaretUp as Es } from "@fortawesome/free-solid-svg-icons";
import { createElementBlock as p, openBlock as d, normalizeClass as P, createElementVNode as k, createCommentVNode as m, renderSlot as O, resolveComponent as je, resolveDirective as As, withDirectives as I, vModelText as Ts, Fragment as j, createBlock as _, withCtx as Z, vModelCheckbox as de, renderList as Y, withModifiers as $, toDisplayString as T, createVNode as L, normalizeStyle as pt, resolveDynamicComponent as Le, mergeProps as Ue, createTextVNode as mt } from "vue";
import qs from "vue-select";
import wt from "fuzzy.js";
import { v4 as js } from "uuid";
cs.add(
  hs,
  ds,
  fs,
  gs,
  ps,
  ms,
  ws,
  bs,
  ys,
  Ss,
  ks,
  Fs,
  Rs,
  Cs,
  xs,
  Ps,
  vs,
  Os,
  _s,
  Es
);
function Ls(e) {
  e.component("QuintableFontAwesomeIcon", us);
}
const Je = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [n, r] of t)
    i[n] = r;
  return i;
}, Us = {
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
        let i = [...this.modelValue];
        t ? i.push(this.value) : i.splice(i.indexOf(this.value), 1), this.$emit("update:modelValue", i), this.$emit("change", i);
      } else {
        const i = t ? this._trueValue ? this.trueValue : !0 : this._falseValue ? this.falseValue : !1;
        this.$emit("update:modelValue", i), this.$emit("change", i);
      }
    }
  }
}, Ns = ["name", "value", "checked", "disabled", "required"];
function Vs(e, t, i, n, r, s) {
  return d(), p("div", {
    class: P(s.classes)
  }, [
    k("input", {
      ref: "input",
      type: "checkbox",
      name: i.name,
      value: i.value,
      checked: s.shouldBeChecked,
      disabled: s._disabled,
      required: s._required,
      onChange: t[0] || (t[0] = (...l) => s.updateInput && s.updateInput(...l))
    }, null, 40, Ns),
    k("div", {
      class: P(s.onClasses)
    }, [
      O(e.$slots, "extra", {}, void 0, !0),
      k("label", null, [
        O(e.$slots, "default", {}, void 0, !0)
      ])
    ], 2),
    s._toggle ? (d(), p("div", {
      key: 0,
      class: P(s.offClasses)
    }, [
      O(e.$slots, "off-extra", {}, void 0, !0),
      O(e.$slots, "off-label", {}, void 0, !0)
    ], 2)) : m("", !0),
    s._hover ? (d(), p("div", {
      key: 1,
      class: P(s.hoverClasses)
    }, [
      O(e.$slots, "hover-extra", {}, void 0, !0),
      O(e.$slots, "hover-label", {}, void 0, !0)
    ], 2)) : m("", !0),
    s._indeterminate ? (d(), p("div", {
      key: 2,
      class: P(s.indeterminateClasses)
    }, [
      O(e.$slots, "indeterminate-extra", {}, void 0, !0),
      O(e.$slots, "indeterminate-label", {}, void 0, !0)
    ], 2)) : m("", !0)
  ], 2);
}
const Bs = /* @__PURE__ */ Je(Us, [["render", Vs], ["__scopeId", "data-v-bc7c5ce1"]]), Ds = {
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
      console.log("radio changed", this.value), this.$emit("update:model-value", this.value), this.$emit("change", this.value);
    }
  }
}, Ms = ["name", "value", "checked", "disabled", "required"];
function Hs(e, t, i, n, r, s) {
  return d(), p("div", {
    class: P(s.classes)
  }, [
    k("input", {
      ref: "input",
      type: "radio",
      name: i.name,
      value: i.value,
      checked: s.shouldBeChecked,
      disabled: s._disabled,
      required: s._required,
      onChange: t[0] || (t[0] = (...l) => s.updateInput && s.updateInput(...l))
    }, null, 40, Ms),
    k("div", {
      class: P(s.onClasses)
    }, [
      O(e.$slots, "extra"),
      k("label", null, [
        O(e.$slots, "default")
      ])
    ], 2),
    s._toggle ? (d(), p("div", {
      key: 0,
      class: P(s.offClasses)
    }, [
      O(e.$slots, "off-extra"),
      O(e.$slots, "off-label")
    ], 2)) : m("", !0),
    s._hover ? (d(), p("div", {
      key: 1,
      class: P(s.hoverClasses)
    }, [
      O(e.$slots, "hover-extra"),
      O(e.$slots, "hover-label")
    ], 2)) : m("", !0)
  ], 2);
}
const Is = /* @__PURE__ */ Je(Ds, [["render", Hs]]);
function Gs(e) {
  e.component("QuintablePCheck", Bs), e.component("QuintablePRadio", Is), e.component("QuintableVSelect", qs);
}
function zs(e) {
  e.use(At, {
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
function Tt(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Js } = Object.prototype, { getPrototypeOf: Ke } = Object, { iterator: be, toStringTag: qt } = Symbol, ye = /* @__PURE__ */ ((e) => (t) => {
  const i = Js.call(t);
  return e[i] || (e[i] = i.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), D = (e) => (e = e.toLowerCase(), (t) => ye(t) === e), Se = (e) => (t) => typeof t === e, { isArray: ee } = Array, le = Se("undefined");
function Ks(e) {
  return e !== null && !le(e) && e.constructor !== null && !le(e.constructor) && U(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const jt = D("ArrayBuffer");
function Ws(e) {
  let t;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && jt(e.buffer), t;
}
const Qs = Se("string"), U = Se("function"), Lt = Se("number"), ke = (e) => e !== null && typeof e == "object", Xs = (e) => e === !0 || e === !1, fe = (e) => {
  if (ye(e) !== "object")
    return !1;
  const t = Ke(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(qt in e) && !(be in e);
}, Zs = D("Date"), Ys = D("File"), $s = D("Blob"), ei = D("FileList"), ti = (e) => ke(e) && U(e.pipe), si = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || U(e.append) && ((t = ye(e)) === "formdata" || // detect form-data instance
  t === "object" && U(e.toString) && e.toString() === "[object FormData]"));
}, ii = D("URLSearchParams"), [ni, ri, li, oi] = ["ReadableStream", "Request", "Response", "Headers"].map(D), ai = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function oe(e, t, { allOwnKeys: i = !1 } = {}) {
  if (e === null || typeof e == "undefined")
    return;
  let n, r;
  if (typeof e != "object" && (e = [e]), ee(e))
    for (n = 0, r = e.length; n < r; n++)
      t.call(null, e[n], n, e);
  else {
    const s = i ? Object.getOwnPropertyNames(e) : Object.keys(e), l = s.length;
    let c;
    for (n = 0; n < l; n++)
      c = s[n], t.call(null, e[c], c, e);
  }
}
function Ut(e, t) {
  t = t.toLowerCase();
  const i = Object.keys(e);
  let n = i.length, r;
  for (; n-- > 0; )
    if (r = i[n], t === r.toLowerCase())
      return r;
  return null;
}
const K = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global, Nt = (e) => !le(e) && e !== K;
function De() {
  const { caseless: e } = Nt(this) && this || {}, t = {}, i = (n, r) => {
    const s = e && Ut(t, r) || r;
    fe(t[s]) && fe(n) ? t[s] = De(t[s], n) : fe(n) ? t[s] = De({}, n) : ee(n) ? t[s] = n.slice() : t[s] = n;
  };
  for (let n = 0, r = arguments.length; n < r; n++)
    arguments[n] && oe(arguments[n], i);
  return t;
}
const ci = (e, t, i, { allOwnKeys: n } = {}) => (oe(t, (r, s) => {
  i && U(r) ? e[s] = Tt(r, i) : e[s] = r;
}, { allOwnKeys: n }), e), ui = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), hi = (e, t, i, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), i && Object.assign(e.prototype, i);
}, di = (e, t, i, n) => {
  let r, s, l;
  const c = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), s = r.length; s-- > 0; )
      l = r[s], (!n || n(l, e, t)) && !c[l] && (t[l] = e[l], c[l] = !0);
    e = i !== !1 && Ke(e);
  } while (e && (!i || i(e, t)) && e !== Object.prototype);
  return t;
}, fi = (e, t, i) => {
  e = String(e), (i === void 0 || i > e.length) && (i = e.length), i -= t.length;
  const n = e.indexOf(t, i);
  return n !== -1 && n === i;
}, gi = (e) => {
  if (!e) return null;
  if (ee(e)) return e;
  let t = e.length;
  if (!Lt(t)) return null;
  const i = new Array(t);
  for (; t-- > 0; )
    i[t] = e[t];
  return i;
}, pi = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array != "undefined" && Ke(Uint8Array)), mi = (e, t) => {
  const n = (e && e[be]).call(e);
  let r;
  for (; (r = n.next()) && !r.done; ) {
    const s = r.value;
    t.call(e, s[0], s[1]);
  }
}, wi = (e, t) => {
  let i;
  const n = [];
  for (; (i = e.exec(t)) !== null; )
    n.push(i);
  return n;
}, bi = D("HTMLFormElement"), yi = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(i, n, r) {
    return n.toUpperCase() + r;
  }
), bt = (({ hasOwnProperty: e }) => (t, i) => e.call(t, i))(Object.prototype), Si = D("RegExp"), Vt = (e, t) => {
  const i = Object.getOwnPropertyDescriptors(e), n = {};
  oe(i, (r, s) => {
    let l;
    (l = t(r, s, e)) !== !1 && (n[s] = l || r);
  }), Object.defineProperties(e, n);
}, ki = (e) => {
  Vt(e, (t, i) => {
    if (U(e) && ["arguments", "caller", "callee"].indexOf(i) !== -1)
      return !1;
    const n = e[i];
    if (U(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + i + "'");
      });
    }
  });
}, Fi = (e, t) => {
  const i = {}, n = (r) => {
    r.forEach((s) => {
      i[s] = !0;
    });
  };
  return ee(e) ? n(e) : n(String(e).split(t)), i;
}, Ri = () => {
}, Ci = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function xi(e) {
  return !!(e && U(e.append) && e[qt] === "FormData" && e[be]);
}
const Pi = (e) => {
  const t = new Array(10), i = (n, r) => {
    if (ke(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[r] = n;
        const s = ee(n) ? [] : {};
        return oe(n, (l, c) => {
          const g = i(l, r + 1);
          !le(g) && (s[c] = g);
        }), t[r] = void 0, s;
      }
    }
    return n;
  };
  return i(e, 0);
}, vi = D("AsyncFunction"), Oi = (e) => e && (ke(e) || U(e)) && U(e.then) && U(e.catch), Bt = ((e, t) => e ? setImmediate : t ? ((i, n) => (K.addEventListener("message", ({ source: r, data: s }) => {
  r === K && s === i && n.length && n.shift()();
}, !1), (r) => {
  n.push(r), K.postMessage(i, "*");
}))(`axios@${Math.random()}`, []) : (i) => setTimeout(i))(
  typeof setImmediate == "function",
  U(K.postMessage)
), _i = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(K) : typeof process != "undefined" && process.nextTick || Bt, Ei = (e) => e != null && U(e[be]), h = {
  isArray: ee,
  isArrayBuffer: jt,
  isBuffer: Ks,
  isFormData: si,
  isArrayBufferView: Ws,
  isString: Qs,
  isNumber: Lt,
  isBoolean: Xs,
  isObject: ke,
  isPlainObject: fe,
  isReadableStream: ni,
  isRequest: ri,
  isResponse: li,
  isHeaders: oi,
  isUndefined: le,
  isDate: Zs,
  isFile: Ys,
  isBlob: $s,
  isRegExp: Si,
  isFunction: U,
  isStream: ti,
  isURLSearchParams: ii,
  isTypedArray: pi,
  isFileList: ei,
  forEach: oe,
  merge: De,
  extend: ci,
  trim: ai,
  stripBOM: ui,
  inherits: hi,
  toFlatObject: di,
  kindOf: ye,
  kindOfTest: D,
  endsWith: fi,
  toArray: gi,
  forEachEntry: mi,
  matchAll: wi,
  isHTMLForm: bi,
  hasOwnProperty: bt,
  hasOwnProp: bt,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Vt,
  freezeMethods: ki,
  toObjectSet: Fi,
  toCamelCase: yi,
  noop: Ri,
  toFiniteNumber: Ci,
  findKey: Ut,
  global: K,
  isContextDefined: Nt,
  isSpecCompliantForm: xi,
  toJSONObject: Pi,
  isAsyncFn: vi,
  isThenable: Oi,
  setImmediate: Bt,
  asap: _i,
  isIterable: Ei
};
function C(e, t, i, n, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), i && (this.config = i), n && (this.request = n), r && (this.response = r, this.status = r.status ? r.status : null);
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
const Dt = C.prototype, Mt = {};
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
  Mt[e] = { value: e };
});
Object.defineProperties(C, Mt);
Object.defineProperty(Dt, "isAxiosError", { value: !0 });
C.from = (e, t, i, n, r, s) => {
  const l = Object.create(Dt);
  return h.toFlatObject(e, l, function(g) {
    return g !== Error.prototype;
  }, (c) => c !== "isAxiosError"), C.call(l, e.message, t, i, n, r), l.cause = e, l.name = e.name, s && Object.assign(l, s), l;
};
const Ai = null;
function Me(e) {
  return h.isPlainObject(e) || h.isArray(e);
}
function Ht(e) {
  return h.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function yt(e, t, i) {
  return e ? e.concat(t).map(function(r, s) {
    return r = Ht(r), !i && s ? "[" + r + "]" : r;
  }).join(i ? "." : "") : t;
}
function Ti(e) {
  return h.isArray(e) && !e.some(Me);
}
const qi = h.toFlatObject(h, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Fe(e, t, i) {
  if (!h.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), i = h.toFlatObject(i, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(S, w) {
    return !h.isUndefined(w[S]);
  });
  const n = i.metaTokens, r = i.visitor || o, s = i.dots, l = i.indexes, g = (i.Blob || typeof Blob != "undefined" && Blob) && h.isSpecCompliantForm(t);
  if (!h.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(y) {
    if (y === null) return "";
    if (h.isDate(y))
      return y.toISOString();
    if (!g && h.isBlob(y))
      throw new C("Blob is not supported. Use a Buffer instead.");
    return h.isArrayBuffer(y) || h.isTypedArray(y) ? g && typeof Blob == "function" ? new Blob([y]) : Buffer.from(y) : y;
  }
  function o(y, S, w) {
    let v = y;
    if (y && !w && typeof y == "object") {
      if (h.endsWith(S, "{}"))
        S = n ? S : S.slice(0, -2), y = JSON.stringify(y);
      else if (h.isArray(y) && Ti(y) || (h.isFileList(y) || h.endsWith(S, "[]")) && (v = h.toArray(y)))
        return S = Ht(S), v.forEach(function(x, V) {
          !(h.isUndefined(x) || x === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            l === !0 ? yt([S], V, s) : l === null ? S : S + "[]",
            u(x)
          );
        }), !1;
    }
    return Me(y) ? !0 : (t.append(yt(w, S, s), u(y)), !1);
  }
  const a = [], f = Object.assign(qi, {
    defaultVisitor: o,
    convertValue: u,
    isVisitable: Me
  });
  function b(y, S) {
    if (!h.isUndefined(y)) {
      if (a.indexOf(y) !== -1)
        throw Error("Circular reference detected in " + S.join("."));
      a.push(y), h.forEach(y, function(v, R) {
        (!(h.isUndefined(v) || v === null) && r.call(
          t,
          v,
          h.isString(R) ? R.trim() : R,
          S,
          f
        )) === !0 && b(v, S ? S.concat(R) : [R]);
      }), a.pop();
    }
  }
  if (!h.isObject(e))
    throw new TypeError("data must be an object");
  return b(e), t;
}
function St(e) {
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
function We(e, t) {
  this._pairs = [], e && Fe(e, this, t);
}
const It = We.prototype;
It.append = function(t, i) {
  this._pairs.push([t, i]);
};
It.toString = function(t) {
  const i = t ? function(n) {
    return t.call(this, n, St);
  } : St;
  return this._pairs.map(function(r) {
    return i(r[0]) + "=" + i(r[1]);
  }, "").join("&");
};
function ji(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Gt(e, t, i) {
  if (!t)
    return e;
  const n = i && i.encode || ji;
  h.isFunction(i) && (i = {
    serialize: i
  });
  const r = i && i.serialize;
  let s;
  if (r ? s = r(t, i) : s = h.isURLSearchParams(t) ? t.toString() : new We(t, i).toString(n), s) {
    const l = e.indexOf("#");
    l !== -1 && (e = e.slice(0, l)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class kt {
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
  use(t, i, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: i,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
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
    h.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const zt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Li = typeof URLSearchParams != "undefined" ? URLSearchParams : We, Ui = typeof FormData != "undefined" ? FormData : null, Ni = typeof Blob != "undefined" ? Blob : null, Vi = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Li,
    FormData: Ui,
    Blob: Ni
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Qe = typeof window != "undefined" && typeof document != "undefined", He = typeof navigator == "object" && navigator || void 0, Bi = Qe && (!He || ["ReactNative", "NativeScript", "NS"].indexOf(He.product) < 0), Di = typeof WorkerGlobalScope != "undefined" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Mi = Qe && window.location.href || "http://localhost", Hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Qe,
  hasStandardBrowserEnv: Bi,
  hasStandardBrowserWebWorkerEnv: Di,
  navigator: He,
  origin: Mi
}, Symbol.toStringTag, { value: "Module" })), q = ne(ne({}, Hi), Vi);
function Ii(e, t) {
  return Fe(e, new q.classes.URLSearchParams(), Object.assign({
    visitor: function(i, n, r, s) {
      return q.isNode && h.isBuffer(i) ? (this.append(n, i.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Gi(e) {
  return h.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function zi(e) {
  const t = {}, i = Object.keys(e);
  let n;
  const r = i.length;
  let s;
  for (n = 0; n < r; n++)
    s = i[n], t[s] = e[s];
  return t;
}
function Jt(e) {
  function t(i, n, r, s) {
    let l = i[s++];
    if (l === "__proto__") return !0;
    const c = Number.isFinite(+l), g = s >= i.length;
    return l = !l && h.isArray(r) ? r.length : l, g ? (h.hasOwnProp(r, l) ? r[l] = [r[l], n] : r[l] = n, !c) : ((!r[l] || !h.isObject(r[l])) && (r[l] = []), t(i, n, r[l], s) && h.isArray(r[l]) && (r[l] = zi(r[l])), !c);
  }
  if (h.isFormData(e) && h.isFunction(e.entries)) {
    const i = {};
    return h.forEachEntry(e, (n, r) => {
      t(Gi(n), r, i, 0);
    }), i;
  }
  return null;
}
function Ji(e, t, i) {
  if (h.isString(e))
    try {
      return (t || JSON.parse)(e), h.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (i || JSON.stringify)(e);
}
const ae = {
  transitional: zt,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, i) {
    const n = i.getContentType() || "", r = n.indexOf("application/json") > -1, s = h.isObject(t);
    if (s && h.isHTMLForm(t) && (t = new FormData(t)), h.isFormData(t))
      return r ? JSON.stringify(Jt(t)) : t;
    if (h.isArrayBuffer(t) || h.isBuffer(t) || h.isStream(t) || h.isFile(t) || h.isBlob(t) || h.isReadableStream(t))
      return t;
    if (h.isArrayBufferView(t))
      return t.buffer;
    if (h.isURLSearchParams(t))
      return i.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let c;
    if (s) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Ii(t, this.formSerializer).toString();
      if ((c = h.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const g = this.env && this.env.FormData;
        return Fe(
          c ? { "files[]": t } : t,
          g && new g(),
          this.formSerializer
        );
      }
    }
    return s || r ? (i.setContentType("application/json", !1), Ji(t)) : t;
  }],
  transformResponse: [function(t) {
    const i = this.transitional || ae.transitional, n = i && i.forcedJSONParsing, r = this.responseType === "json";
    if (h.isResponse(t) || h.isReadableStream(t))
      return t;
    if (t && h.isString(t) && (n && !this.responseType || r)) {
      const l = !(i && i.silentJSONParsing) && r;
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
  ae.headers[e] = {};
});
const Ki = h.toObjectSet([
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
]), Wi = (e) => {
  const t = {};
  let i, n, r;
  return e && e.split(`
`).forEach(function(l) {
    r = l.indexOf(":"), i = l.substring(0, r).trim().toLowerCase(), n = l.substring(r + 1).trim(), !(!i || t[i] && Ki[i]) && (i === "set-cookie" ? t[i] ? t[i].push(n) : t[i] = [n] : t[i] = t[i] ? t[i] + ", " + n : n);
  }), t;
}, Ft = Symbol("internals");
function re(e) {
  return e && String(e).trim().toLowerCase();
}
function ge(e) {
  return e === !1 || e == null ? e : h.isArray(e) ? e.map(ge) : String(e);
}
function Qi(e) {
  const t = /* @__PURE__ */ Object.create(null), i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = i.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const Xi = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ne(e, t, i, n, r) {
  if (h.isFunction(n))
    return n.call(this, t, i);
  if (r && (t = i), !!h.isString(t)) {
    if (h.isString(n))
      return t.indexOf(n) !== -1;
    if (h.isRegExp(n))
      return n.test(t);
  }
}
function Zi(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, i, n) => i.toUpperCase() + n);
}
function Yi(e, t) {
  const i = h.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + i, {
      value: function(r, s, l) {
        return this[n].call(this, t, r, s, l);
      },
      configurable: !0
    });
  });
}
let N = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, i, n) {
    const r = this;
    function s(c, g, u) {
      const o = re(g);
      if (!o)
        throw new Error("header name must be a non-empty string");
      const a = h.findKey(r, o);
      (!a || r[a] === void 0 || u === !0 || u === void 0 && r[a] !== !1) && (r[a || g] = ge(c));
    }
    const l = (c, g) => h.forEach(c, (u, o) => s(u, o, g));
    if (h.isPlainObject(t) || t instanceof this.constructor)
      l(t, i);
    else if (h.isString(t) && (t = t.trim()) && !Xi(t))
      l(Wi(t), i);
    else if (h.isObject(t) && h.isIterable(t)) {
      let c = {}, g, u;
      for (const o of t) {
        if (!h.isArray(o))
          throw TypeError("Object iterator must return a key-value pair");
        c[u = o[0]] = (g = c[u]) ? h.isArray(g) ? [...g, o[1]] : [g, o[1]] : o[1];
      }
      l(c, i);
    } else
      t != null && s(i, t, n);
    return this;
  }
  get(t, i) {
    if (t = re(t), t) {
      const n = h.findKey(this, t);
      if (n) {
        const r = this[n];
        if (!i)
          return r;
        if (i === !0)
          return Qi(r);
        if (h.isFunction(i))
          return i.call(this, r, n);
        if (h.isRegExp(i))
          return i.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, i) {
    if (t = re(t), t) {
      const n = h.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!i || Ne(this, this[n], n, i)));
    }
    return !1;
  }
  delete(t, i) {
    const n = this;
    let r = !1;
    function s(l) {
      if (l = re(l), l) {
        const c = h.findKey(n, l);
        c && (!i || Ne(n, n[c], c, i)) && (delete n[c], r = !0);
      }
    }
    return h.isArray(t) ? t.forEach(s) : s(t), r;
  }
  clear(t) {
    const i = Object.keys(this);
    let n = i.length, r = !1;
    for (; n--; ) {
      const s = i[n];
      (!t || Ne(this, this[s], s, t, !0)) && (delete this[s], r = !0);
    }
    return r;
  }
  normalize(t) {
    const i = this, n = {};
    return h.forEach(this, (r, s) => {
      const l = h.findKey(n, s);
      if (l) {
        i[l] = ge(r), delete i[s];
        return;
      }
      const c = t ? Zi(s) : String(s).trim();
      c !== s && delete i[s], i[c] = ge(r), n[c] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const i = /* @__PURE__ */ Object.create(null);
    return h.forEach(this, (n, r) => {
      n != null && n !== !1 && (i[r] = t && h.isArray(n) ? n.join(", ") : n);
    }), i;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, i]) => t + ": " + i).join(`
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
  static concat(t, ...i) {
    const n = new this(t);
    return i.forEach((r) => n.set(r)), n;
  }
  static accessor(t) {
    const n = (this[Ft] = this[Ft] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function s(l) {
      const c = re(l);
      n[c] || (Yi(r, l), n[c] = !0);
    }
    return h.isArray(t) ? t.forEach(s) : s(t), this;
  }
};
N.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
h.reduceDescriptors(N.prototype, ({ value: e }, t) => {
  let i = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[i] = n;
    }
  };
});
h.freezeMethods(N);
function Ve(e, t) {
  const i = this || ae, n = t || i, r = N.from(n.headers);
  let s = n.data;
  return h.forEach(e, function(c) {
    s = c.call(i, s, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), s;
}
function Kt(e) {
  return !!(e && e.__CANCEL__);
}
function te(e, t, i) {
  C.call(this, e == null ? "canceled" : e, C.ERR_CANCELED, t, i), this.name = "CanceledError";
}
h.inherits(te, C, {
  __CANCEL__: !0
});
function Wt(e, t, i) {
  const n = i.config.validateStatus;
  !i.status || !n || n(i.status) ? e(i) : t(new C(
    "Request failed with status code " + i.status,
    [C.ERR_BAD_REQUEST, C.ERR_BAD_RESPONSE][Math.floor(i.status / 100) - 4],
    i.config,
    i.request,
    i
  ));
}
function $i(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function en(e, t) {
  e = e || 10;
  const i = new Array(e), n = new Array(e);
  let r = 0, s = 0, l;
  return t = t !== void 0 ? t : 1e3, function(g) {
    const u = Date.now(), o = n[s];
    l || (l = u), i[r] = g, n[r] = u;
    let a = s, f = 0;
    for (; a !== r; )
      f += i[a++], a = a % e;
    if (r = (r + 1) % e, r === s && (s = (s + 1) % e), u - l < t)
      return;
    const b = o && u - o;
    return b ? Math.round(f * 1e3 / b) : void 0;
  };
}
function tn(e, t) {
  let i = 0, n = 1e3 / t, r, s;
  const l = (u, o = Date.now()) => {
    i = o, r = null, s && (clearTimeout(s), s = null), e.apply(null, u);
  };
  return [(...u) => {
    const o = Date.now(), a = o - i;
    a >= n ? l(u, o) : (r = u, s || (s = setTimeout(() => {
      s = null, l(r);
    }, n - a)));
  }, () => r && l(r)];
}
const me = (e, t, i = 3) => {
  let n = 0;
  const r = en(50, 250);
  return tn((s) => {
    const l = s.loaded, c = s.lengthComputable ? s.total : void 0, g = l - n, u = r(g), o = l <= c;
    n = l;
    const a = {
      loaded: l,
      total: c,
      progress: c ? l / c : void 0,
      bytes: g,
      rate: u || void 0,
      estimated: u && c && o ? (c - l) / u : void 0,
      event: s,
      lengthComputable: c != null,
      [t ? "download" : "upload"]: !0
    };
    e(a);
  }, i);
}, Rt = (e, t) => {
  const i = e != null;
  return [(n) => t[0]({
    lengthComputable: i,
    total: e,
    loaded: n
  }), t[1]];
}, Ct = (e) => (...t) => h.asap(() => e(...t)), sn = q.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (i) => (i = new URL(i, q.origin), e.protocol === i.protocol && e.host === i.host && (t || e.port === i.port)))(
  new URL(q.origin),
  q.navigator && /(msie|trident)/i.test(q.navigator.userAgent)
) : () => !0, nn = q.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, i, n, r, s) {
      const l = [e + "=" + encodeURIComponent(t)];
      h.isNumber(i) && l.push("expires=" + new Date(i).toGMTString()), h.isString(n) && l.push("path=" + n), h.isString(r) && l.push("domain=" + r), s === !0 && l.push("secure"), document.cookie = l.join("; ");
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
function rn(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function ln(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Qt(e, t, i) {
  let n = !rn(t);
  return e && (n || i == !1) ? ln(e, t) : t;
}
const xt = (e) => e instanceof N ? ne({}, e) : e;
function Q(e, t) {
  t = t || {};
  const i = {};
  function n(u, o, a, f) {
    return h.isPlainObject(u) && h.isPlainObject(o) ? h.merge.call({ caseless: f }, u, o) : h.isPlainObject(o) ? h.merge({}, o) : h.isArray(o) ? o.slice() : o;
  }
  function r(u, o, a, f) {
    if (h.isUndefined(o)) {
      if (!h.isUndefined(u))
        return n(void 0, u, a, f);
    } else return n(u, o, a, f);
  }
  function s(u, o) {
    if (!h.isUndefined(o))
      return n(void 0, o);
  }
  function l(u, o) {
    if (h.isUndefined(o)) {
      if (!h.isUndefined(u))
        return n(void 0, u);
    } else return n(void 0, o);
  }
  function c(u, o, a) {
    if (a in t)
      return n(u, o);
    if (a in e)
      return n(void 0, u);
  }
  const g = {
    url: s,
    method: s,
    data: s,
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
    headers: (u, o, a) => r(xt(u), xt(o), a, !0)
  };
  return h.forEach(Object.keys(Object.assign({}, e, t)), function(o) {
    const a = g[o] || r, f = a(e[o], t[o], o);
    h.isUndefined(f) && a !== c || (i[o] = f);
  }), i;
}
const Xt = (e) => {
  const t = Q({}, e);
  let { data: i, withXSRFToken: n, xsrfHeaderName: r, xsrfCookieName: s, headers: l, auth: c } = t;
  t.headers = l = N.from(l), t.url = Gt(Qt(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), c && l.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  );
  let g;
  if (h.isFormData(i)) {
    if (q.hasStandardBrowserEnv || q.hasStandardBrowserWebWorkerEnv)
      l.setContentType(void 0);
    else if ((g = l.getContentType()) !== !1) {
      const [u, ...o] = g ? g.split(";").map((a) => a.trim()).filter(Boolean) : [];
      l.setContentType([u || "multipart/form-data", ...o].join("; "));
    }
  }
  if (q.hasStandardBrowserEnv && (n && h.isFunction(n) && (n = n(t)), n || n !== !1 && sn(t.url))) {
    const u = r && s && nn.read(s);
    u && l.set(r, u);
  }
  return t;
}, on = typeof XMLHttpRequest != "undefined", an = on && function(e) {
  return new Promise(function(i, n) {
    const r = Xt(e);
    let s = r.data;
    const l = N.from(r.headers).normalize();
    let { responseType: c, onUploadProgress: g, onDownloadProgress: u } = r, o, a, f, b, y;
    function S() {
      b && b(), y && y(), r.cancelToken && r.cancelToken.unsubscribe(o), r.signal && r.signal.removeEventListener("abort", o);
    }
    let w = new XMLHttpRequest();
    w.open(r.method.toUpperCase(), r.url, !0), w.timeout = r.timeout;
    function v() {
      if (!w)
        return;
      const x = N.from(
        "getAllResponseHeaders" in w && w.getAllResponseHeaders()
      ), A = {
        data: !c || c === "text" || c === "json" ? w.responseText : w.response,
        status: w.status,
        statusText: w.statusText,
        headers: x,
        config: e,
        request: w
      };
      Wt(function(M) {
        i(M), S();
      }, function(M) {
        n(M), S();
      }, A), w = null;
    }
    "onloadend" in w ? w.onloadend = v : w.onreadystatechange = function() {
      !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, w.onabort = function() {
      w && (n(new C("Request aborted", C.ECONNABORTED, e, w)), w = null);
    }, w.onerror = function() {
      n(new C("Network Error", C.ERR_NETWORK, e, w)), w = null;
    }, w.ontimeout = function() {
      let V = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const A = r.transitional || zt;
      r.timeoutErrorMessage && (V = r.timeoutErrorMessage), n(new C(
        V,
        A.clarifyTimeoutError ? C.ETIMEDOUT : C.ECONNABORTED,
        e,
        w
      )), w = null;
    }, s === void 0 && l.setContentType(null), "setRequestHeader" in w && h.forEach(l.toJSON(), function(V, A) {
      w.setRequestHeader(A, V);
    }), h.isUndefined(r.withCredentials) || (w.withCredentials = !!r.withCredentials), c && c !== "json" && (w.responseType = r.responseType), u && ([f, y] = me(u, !0), w.addEventListener("progress", f)), g && w.upload && ([a, b] = me(g), w.upload.addEventListener("progress", a), w.upload.addEventListener("loadend", b)), (r.cancelToken || r.signal) && (o = (x) => {
      w && (n(!x || x.type ? new te(null, e, w) : x), w.abort(), w = null);
    }, r.cancelToken && r.cancelToken.subscribe(o), r.signal && (r.signal.aborted ? o() : r.signal.addEventListener("abort", o)));
    const R = $i(r.url);
    if (R && q.protocols.indexOf(R) === -1) {
      n(new C("Unsupported protocol " + R + ":", C.ERR_BAD_REQUEST, e));
      return;
    }
    w.send(s || null);
  });
}, cn = (e, t) => {
  const { length: i } = e = e ? e.filter(Boolean) : [];
  if (t || i) {
    let n = new AbortController(), r;
    const s = function(u) {
      if (!r) {
        r = !0, c();
        const o = u instanceof Error ? u : this.reason;
        n.abort(o instanceof C ? o : new te(o instanceof Error ? o.message : o));
      }
    };
    let l = t && setTimeout(() => {
      l = null, s(new C(`timeout ${t} of ms exceeded`, C.ETIMEDOUT));
    }, t);
    const c = () => {
      e && (l && clearTimeout(l), l = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", s));
    const { signal: g } = n;
    return g.unsubscribe = () => h.asap(c), g;
  }
}, un = function* (e, t) {
  let i = e.byteLength;
  if (i < t) {
    yield e;
    return;
  }
  let n = 0, r;
  for (; n < i; )
    r = n + t, yield e.slice(n, r), n = r;
}, hn = function(e, t) {
  return Te(this, null, function* () {
    try {
      for (var i = gt(dn(e)), n, r, s; n = !(r = yield new J(i.next())).done; n = !1) {
        const l = r.value;
        yield* qe(un(l, t));
      }
    } catch (r) {
      s = [r];
    } finally {
      try {
        n && (r = i.return) && (yield new J(r.call(i)));
      } finally {
        if (s)
          throw s[0];
      }
    }
  });
}, dn = function(e) {
  return Te(this, null, function* () {
    if (e[Symbol.asyncIterator]) {
      yield* qe(e);
      return;
    }
    const t = e.getReader();
    try {
      for (; ; ) {
        const { done: i, value: n } = yield new J(t.read());
        if (i)
          break;
        yield n;
      }
    } finally {
      yield new J(t.cancel());
    }
  });
}, Pt = (e, t, i, n) => {
  const r = hn(e, t);
  let s = 0, l, c = (u) => {
    l || (l = !0, n && n(u));
  };
  return new ReadableStream({
    pull(u) {
      return z(this, null, function* () {
        try {
          const { done: o, value: a } = yield r.next();
          if (o) {
            c(), u.close();
            return;
          }
          let f = a.byteLength;
          if (i) {
            let b = s += f;
            i(b);
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
}, Re = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Zt = Re && typeof ReadableStream == "function", fn = Re && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : (e) => z(null, null, function* () {
  return new Uint8Array(yield new Response(e).arrayBuffer());
})), Yt = (e, ...t) => {
  try {
    return !!e(...t);
  } catch (i) {
    return !1;
  }
}, gn = Zt && Yt(() => {
  let e = !1;
  const t = new Request(q.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), vt = 64 * 1024, Ie = Zt && Yt(() => h.isReadableStream(new Response("").body)), we = {
  stream: Ie && ((e) => e.body)
};
Re && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !we[t] && (we[t] = h.isFunction(e[t]) ? (i) => i[t]() : (i, n) => {
      throw new C(`Response type '${t}' is not supported`, C.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const pn = (e) => z(null, null, function* () {
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
    return (yield fn(e)).byteLength;
}), mn = (e, t) => z(null, null, function* () {
  const i = h.toFiniteNumber(e.getContentLength());
  return i == null ? pn(t) : i;
}), wn = Re && ((e) => z(null, null, function* () {
  let {
    url: t,
    method: i,
    data: n,
    signal: r,
    cancelToken: s,
    timeout: l,
    onDownloadProgress: c,
    onUploadProgress: g,
    responseType: u,
    headers: o,
    withCredentials: a = "same-origin",
    fetchOptions: f
  } = Xt(e);
  u = u ? (u + "").toLowerCase() : "text";
  let b = cn([r, s && s.toAbortSignal()], l), y;
  const S = b && b.unsubscribe && (() => {
    b.unsubscribe();
  });
  let w;
  try {
    if (g && gn && i !== "get" && i !== "head" && (w = yield mn(o, n)) !== 0) {
      let A = new Request(t, {
        method: "POST",
        body: n,
        duplex: "half"
      }), B;
      if (h.isFormData(n) && (B = A.headers.get("content-type")) && o.setContentType(B), A.body) {
        const [M, G] = Rt(
          w,
          me(Ct(g))
        );
        n = Pt(A.body, vt, M, G);
      }
    }
    h.isString(a) || (a = a ? "include" : "omit");
    const v = "credentials" in Request.prototype;
    y = new Request(t, ft(ne({}, f), {
      signal: b,
      method: i.toUpperCase(),
      headers: o.normalize().toJSON(),
      body: n,
      duplex: "half",
      credentials: v ? a : void 0
    }));
    let R = yield fetch(y);
    const x = Ie && (u === "stream" || u === "response");
    if (Ie && (c || x && S)) {
      const A = {};
      ["status", "statusText", "headers"].forEach((se) => {
        A[se] = R[se];
      });
      const B = h.toFiniteNumber(R.headers.get("content-length")), [M, G] = c && Rt(
        B,
        me(Ct(c), !0)
      ) || [];
      R = new Response(
        Pt(R.body, vt, M, () => {
          G && G(), S && S();
        }),
        A
      );
    }
    u = u || "text";
    let V = yield we[h.findKey(we, u) || "text"](R, e);
    return !x && S && S(), yield new Promise((A, B) => {
      Wt(A, B, {
        data: V,
        headers: N.from(R.headers),
        status: R.status,
        statusText: R.statusText,
        config: e,
        request: y
      });
    });
  } catch (v) {
    throw S && S(), v && v.name === "TypeError" && /Load failed|fetch/i.test(v.message) ? Object.assign(
      new C("Network Error", C.ERR_NETWORK, e, y),
      {
        cause: v.cause || v
      }
    ) : C.from(v, v && v.code, e, y);
  }
})), Ge = {
  http: Ai,
  xhr: an,
  fetch: wn
};
h.forEach(Ge, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch (i) {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Ot = (e) => `- ${e}`, bn = (e) => h.isFunction(e) || e === null || e === !1, $t = {
  getAdapter: (e) => {
    e = h.isArray(e) ? e : [e];
    const { length: t } = e;
    let i, n;
    const r = {};
    for (let s = 0; s < t; s++) {
      i = e[s];
      let l;
      if (n = i, !bn(i) && (n = Ge[(l = String(i)).toLowerCase()], n === void 0))
        throw new C(`Unknown adapter '${l}'`);
      if (n)
        break;
      r[l || "#" + s] = n;
    }
    if (!n) {
      const s = Object.entries(r).map(
        ([c, g]) => `adapter ${c} ` + (g === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let l = t ? s.length > 1 ? `since :
` + s.map(Ot).join(`
`) : " " + Ot(s[0]) : "as no adapter specified";
      throw new C(
        "There is no suitable adapter to dispatch the request " + l,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: Ge
};
function Be(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new te(null, e);
}
function _t(e) {
  return Be(e), e.headers = N.from(e.headers), e.data = Ve.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), $t.getAdapter(e.adapter || ae.adapter)(e).then(function(n) {
    return Be(e), n.data = Ve.call(
      e,
      e.transformResponse,
      n
    ), n.headers = N.from(n.headers), n;
  }, function(n) {
    return Kt(n) || (Be(e), n && n.response && (n.response.data = Ve.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = N.from(n.response.headers))), Promise.reject(n);
  });
}
const es = "1.9.0", Ce = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ce[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Et = {};
Ce.transitional = function(t, i, n) {
  function r(s, l) {
    return "[Axios v" + es + "] Transitional option '" + s + "'" + l + (n ? ". " + n : "");
  }
  return (s, l, c) => {
    if (t === !1)
      throw new C(
        r(l, " has been removed" + (i ? " in " + i : "")),
        C.ERR_DEPRECATED
      );
    return i && !Et[l] && (Et[l] = !0, console.warn(
      r(
        l,
        " has been deprecated since v" + i + " and will be removed in the near future"
      )
    )), t ? t(s, l, c) : !0;
  };
};
Ce.spelling = function(t) {
  return (i, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function yn(e, t, i) {
  if (typeof e != "object")
    throw new C("options must be an object", C.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let r = n.length;
  for (; r-- > 0; ) {
    const s = n[r], l = t[s];
    if (l) {
      const c = e[s], g = c === void 0 || l(c, s, e);
      if (g !== !0)
        throw new C("option " + s + " must be " + g, C.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (i !== !0)
      throw new C("Unknown option " + s, C.ERR_BAD_OPTION);
  }
}
const pe = {
  assertOptions: yn,
  validators: Ce
}, H = pe.validators;
let W = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new kt(),
      response: new kt()
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
  request(t, i) {
    return z(this, null, function* () {
      try {
        return yield this._request(t, i);
      } catch (n) {
        if (n instanceof Error) {
          let r = {};
          Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
          const s = r.stack ? r.stack.replace(/^.+\n/, "") : "";
          try {
            n.stack ? s && !String(n.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + s) : n.stack = s;
          } catch (l) {
          }
        }
        throw n;
      }
    });
  }
  _request(t, i) {
    typeof t == "string" ? (i = i || {}, i.url = t) : i = t || {}, i = Q(this.defaults, i);
    const { transitional: n, paramsSerializer: r, headers: s } = i;
    n !== void 0 && pe.assertOptions(n, {
      silentJSONParsing: H.transitional(H.boolean),
      forcedJSONParsing: H.transitional(H.boolean),
      clarifyTimeoutError: H.transitional(H.boolean)
    }, !1), r != null && (h.isFunction(r) ? i.paramsSerializer = {
      serialize: r
    } : pe.assertOptions(r, {
      encode: H.function,
      serialize: H.function
    }, !0)), i.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? i.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : i.allowAbsoluteUrls = !0), pe.assertOptions(i, {
      baseUrl: H.spelling("baseURL"),
      withXsrfToken: H.spelling("withXSRFToken")
    }, !0), i.method = (i.method || this.defaults.method || "get").toLowerCase();
    let l = s && h.merge(
      s.common,
      s[i.method]
    );
    s && h.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (y) => {
        delete s[y];
      }
    ), i.headers = N.concat(l, s);
    const c = [];
    let g = !0;
    this.interceptors.request.forEach(function(S) {
      typeof S.runWhen == "function" && S.runWhen(i) === !1 || (g = g && S.synchronous, c.unshift(S.fulfilled, S.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(S) {
      u.push(S.fulfilled, S.rejected);
    });
    let o, a = 0, f;
    if (!g) {
      const y = [_t.bind(this), void 0];
      for (y.unshift.apply(y, c), y.push.apply(y, u), f = y.length, o = Promise.resolve(i); a < f; )
        o = o.then(y[a++], y[a++]);
      return o;
    }
    f = c.length;
    let b = i;
    for (a = 0; a < f; ) {
      const y = c[a++], S = c[a++];
      try {
        b = y(b);
      } catch (w) {
        S.call(this, w);
        break;
      }
    }
    try {
      o = _t.call(this, b);
    } catch (y) {
      return Promise.reject(y);
    }
    for (a = 0, f = u.length; a < f; )
      o = o.then(u[a++], u[a++]);
    return o;
  }
  getUri(t) {
    t = Q(this.defaults, t);
    const i = Qt(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Gt(i, t.params, t.paramsSerializer);
  }
};
h.forEach(["delete", "get", "head", "options"], function(t) {
  W.prototype[t] = function(i, n) {
    return this.request(Q(n || {}, {
      method: t,
      url: i,
      data: (n || {}).data
    }));
  };
});
h.forEach(["post", "put", "patch"], function(t) {
  function i(n) {
    return function(s, l, c) {
      return this.request(Q(c || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: l
      }));
    };
  }
  W.prototype[t] = i(), W.prototype[t + "Form"] = i(!0);
});
let Sn = class ts {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let i;
    this.promise = new Promise(function(s) {
      i = s;
    });
    const n = this;
    this.promise.then((r) => {
      if (!n._listeners) return;
      let s = n._listeners.length;
      for (; s-- > 0; )
        n._listeners[s](r);
      n._listeners = null;
    }), this.promise.then = (r) => {
      let s;
      const l = new Promise((c) => {
        n.subscribe(c), s = c;
      }).then(r);
      return l.cancel = function() {
        n.unsubscribe(s);
      }, l;
    }, t(function(s, l, c) {
      n.reason || (n.reason = new te(s, l, c), i(n.reason));
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
    const i = this._listeners.indexOf(t);
    i !== -1 && this._listeners.splice(i, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), i = (n) => {
      t.abort(n);
    };
    return this.subscribe(i), t.signal.unsubscribe = () => this.unsubscribe(i), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new ts(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function kn(e) {
  return function(i) {
    return e.apply(null, i);
  };
}
function Fn(e) {
  return h.isObject(e) && e.isAxiosError === !0;
}
const ze = {
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
Object.entries(ze).forEach(([e, t]) => {
  ze[t] = e;
});
function ss(e) {
  const t = new W(e), i = Tt(W.prototype.request, t);
  return h.extend(i, W.prototype, t, { allOwnKeys: !0 }), h.extend(i, t, null, { allOwnKeys: !0 }), i.create = function(r) {
    return ss(Q(e, r));
  }, i;
}
const E = ss(ae);
E.Axios = W;
E.CanceledError = te;
E.CancelToken = Sn;
E.isCancel = Kt;
E.VERSION = es;
E.toFormData = Fe;
E.AxiosError = C;
E.Cancel = E.CanceledError;
E.all = function(t) {
  return Promise.all(t);
};
E.spread = kn;
E.isAxiosError = Fn;
E.mergeConfig = Q;
E.AxiosHeaders = N;
E.formToJSON = (e) => Jt(h.isHTMLForm(e) ? new FormData(e) : e);
E.getAdapter = $t.getAdapter;
E.HttpStatusCode = ze;
E.default = E;
const {
  Axios: xl,
  AxiosError: Pl,
  CanceledError: vl,
  isCancel: Ol,
  CancelToken: _l,
  VERSION: El,
  all: Al,
  Cancel: Tl,
  isAxiosError: ql,
  spread: jl,
  toFormData: Ll,
  AxiosHeaders: Ul,
  HttpStatusCode: Nl,
  formToJSON: Vl,
  getAdapter: Bl,
  mergeConfig: Dl
} = E, Rn = {
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
      uuid: js(),
      loaderHeight: 0,
      defaultOperator: "equal",
      queryAjaxTimeout: null,
      lastSearchQueryUpdated: null,
      operatorFunctions: {
        equal: (e, t) => t === e,
        greater: (e, t) => t > e,
        less: (e, t) => t < e,
        greaterEqual: (e, t) => t >= e,
        lessEqual: (e, t) => t <= e,
        contains: (e, t) => !Array.isArray(t) && typeof t != "string" ? !1 : t.indexOf(e) !== -1,
        notContains: (e, t) => !Array.isArray(t) && typeof t != "string" ? !1 : t.indexOf(e) === -1,
        startsWith: (e, t) => typeof t != "string" ? !1 : t.indexOf(e) === 0,
        endsWitch: (e, t) => typeof t != "string" ? !1 : t.indexOf(e, this.length - e.length) !== -1,
        matches(e, t) {
          return !(e instanceof RegExp) || typeof t != "string" ? !1 : e.test(t);
        }
      },
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
      let i = !1;
      this.config.select && (i = !0);
      let n = 250;
      this.config.ajaxRequestDelay && (n = this.config.ajaxRequestDelay);
      let r = "bg-muted";
      this.config.hoverClass === !1 ? r = "" : this.config.hoverClass && this.config.hoverClass !== !0 && (r = this.config.hoverClass);
      let s = "bg-muted";
      this.config.activeClass === !1 ? s = "" : this.config.activeClass && this.config.activeClass !== !0 && (s = this.config.activeClass);
      let l = !1;
      this.config.multiSort && (l = !0);
      let c = !1;
      this.config.pageSort && (c = !0);
      let g = !1;
      this.config.multiSortSelect && (g = !0);
      let u = !1;
      this.config.pageSortSelect && (u = !0);
      let o = !1;
      this.config.ajaxUrl && (o = this.config.ajaxUrl);
      let a = "post";
      ["pre", "post"].includes(this.config.selectPosition) && (a = this.config.selectPosition);
      let f = !1;
      this.config.expandedAll && (f = !0);
      let b = !1;
      this.config.useFuzzySearch && (b = !0);
      let y = !1;
      this.config.prettySelect && (y = !0);
      let S = !1;
      this.config.rowsSelect && (S = !0);
      let w = !1;
      this.config.keepSelect && (w = !0);
      let v = !1;
      this.config.disallowAllOption && (v = !0);
      let R = !1;
      this.config.hideEmptyColumns && (R = !0);
      let x = "none";
      ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns) && (x = this.config.ignoreSortEmptyColumns);
      let V = !1;
      this.config.search && (V = !0);
      let A = 1;
      this.config.searchLength && (A = this.config.searchLength);
      let B = "Search...";
      this.config.searchPlaceholder && (B = this.config.searchPlaceholder);
      let M = "Multiple sort";
      this.config.multiSortPlaceholder && (M = this.config.multiSortPlaceholder);
      let G = "Page sort";
      this.config.pageSortPlaceholder && (G = this.config.pageSortPlaceholder);
      let se = "AND";
      ["AND", "OR"].includes(this.config.filterRelation) && (se = this.config.filterRelation);
      let Xe = "AND";
      ["AND", "OR"].includes(this.config.filterGroupRelation) && (Xe = this.config.filterGroupRelation);
      let Ze = "Rows per page:";
      this.config.rowsPlaceholder && (Ze = this.config.rowsPlaceholder);
      let Ye = "No rows...";
      this.config.emptyPlaceholder && (Ye = this.config.emptyPlaceholder);
      let $e = !1;
      this.config.selectAll && ($e = !0);
      let ce = !1;
      this.config.selectAllRows && (ce = !0), o && ce && (console.warn(
        "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
      ), ce = !1);
      let ue = !1;
      this.config.storeState && (ue = !0), !this.identifier && this.config.storeState && (console.warn(
        "Option storeState was deactivated automatically because table identifier is not set!"
      ), ue = !1);
      const xe = "test-local-storage";
      try {
        localStorage.setItem(xe, xe), localStorage.removeItem(xe);
      } catch (F) {
        console.warn(
          "Option storeState was deactivated automatically because local storage is not available!",
          F
        ), ue = !1;
      }
      let et = !1;
      this.config.defaultSelected && (et = !0);
      let tt = !1;
      this.config.hideRowToggle && (tt = !0);
      let st = !1;
      this.config.enableRowTabIndex && (st = !0);
      let it = "chevron-up";
      this.config.expandedRowIcon && typeof this.config.expandedRowIcon == "string" && ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
        this.config.expandedRowIcon.toLowerCase()
      ) && (it = this.config.expandedRowIcon.toLowerCase());
      let nt = "chevron-down";
      this.config.collapsedRowIcon && typeof this.config.collapsedRowIcon == "string" && ["chevron-down", "plus", "caret-down", "eye"].includes(
        this.config.collapsedRowIcon.toLowerCase()
      ) && (nt = this.config.collapsedRowIcon.toLowerCase());
      let rt = 5;
      this.config.pageRange && (rt = this.config.pageRange);
      let lt = "col-12";
      this.config.searchClass && (lt = this.config.searchClass);
      let ot = "row";
      this.config.searchContainerClass && (ot = this.config.searchContainerClass);
      let at = "GET";
      this.config.requestMethod && typeof this.config.requestMethod == "string" && ["POST", "GET"].includes(this.config.requestMethod.toUpperCase()) && (at = this.config.requestMethod.toUpperCase());
      let ct = 0, Pe = [], ve = [], Oe = [], he = [], _e = [], Ee = [], ie = [], Ae = [], ut = null;
      if (this.config.columns) {
        ct = this.config.columns.length;
        for (let F = 0; F < this.config.columns.length; F++)
          ie[F] = "", this.config.columns[F] && this.config.columns[F].headline ? (Pe[F] = this.config.columns[F].headline, ie[F] += this.config.columns[F].headline.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()) : Pe[F] = "", ie[F] += " column-" + (F + 1), this.config.columns[F].classes && (ie[F] += " " + this.config.columns[F].classes), this.config.columns[F] && this.config.columns[F].breakpoint ? ve[F] = this.config.columns[F].breakpoint : ve[F] = "", this.config.columns[F] && this.config.columns[F].sort ? this.config.columns[F].firstSortDirection && typeof this.config.columns[F].firstSortDirection == "string" && ["DESC", "ASC"].includes(
            this.config.columns[F].firstSortDirection.toUpperCase()
          ) ? he[F] = this.config.columns[F].firstSortDirection.toUpperCase() : he[F] = !0 : he[F] = !1, this.config.columns[F] && this.config.columns[F].ignoreEmpty ? Ae[F] = !0 : Ae[F] = !1, this.config.columns[F] && this.config.columns[F].sticky ? _e[F] = !0 : _e[F] = !1, this.config.columns[F] && this.config.columns[F].hidden ? Oe[F] = !0 : Oe[F] = !1, this.config.columns[F] && this.config.columns[F].align ? Ee[F] = this.config.columns[F].align : Ee[F] = !1;
        ut = this.config.columns;
      }
      return {
        headlines: Pe,
        columnClasses: ie,
        sorts: he,
        pageSort: c,
        multiSort: l,
        pageSortSelect: u,
        multiSortSelect: g,
        filterGroupRelation: Xe,
        filterRelation: se,
        rowsSelect: S,
        keepSelect: w,
        disallowAllOption: v,
        defaultSelected: et,
        searchLength: A,
        search: V,
        searchPlaceholder: B,
        useFuzzySearch: b,
        ajaxUrl: o,
        pageSortPlaceholder: G,
        multiSortPlaceholder: M,
        rowsPlaceholder: Ze,
        emptyPlaceholder: Ye,
        stickyCols: _e,
        alignments: Ee,
        breakpoints: ve,
        hiddenCols: Oe,
        ignoreEmpty: Ae,
        hideEmptyColumns: R,
        ignoreSortEmptyColumns: x,
        pagination: e,
        numberOfVisibleRowsFillerWord: t,
        select: i,
        selectAll: $e,
        selectAllRows: ce,
        hoverClass: r,
        activeClass: s,
        expandedAll: f,
        pageRange: rt,
        prettySelect: y,
        number: ct,
        columns: ut,
        hideRowToggle: tt,
        enableRowTabIndex: st,
        expandedRowIcon: it,
        collapsedRowIcon: nt,
        selectPosition: a,
        searchClass: lt,
        searchContainerClass: ot,
        requestMethod: at,
        storeState: ue,
        ajaxRequestDelay: n
      };
    },
    /**
     * Checks which rows shall be shown
     *
     * @returns {Array} a boolean array which represents all indexes of the rows
     */
    visibleRows() {
      if (this.rowsUpdatedKey && !this.configFinal.ajaxUrl && this.currentRowsPerPage !== "All") {
        let e = [];
        for (let s = 0; s < this.rowsFinal.length; s++)
          e.push(!1);
        let t = {};
        for (let s in this.sortedIndexes)
          Object.prototype.hasOwnProperty.call(this.sortedIndexes, s) && this.filteredRows[this.sortedIndexes[s]] && (t[s] = this.sortedIndexes[s]);
        let i = this.currentPage * this.currentRowsPerPage, n = i - this.currentRowsPerPage, r = 0;
        for (let s in t)
          Object.prototype.hasOwnProperty.call(t, s) && (s = parseInt(s), r < i && r >= n && (e[t[s]] = !0), r++);
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
      if (this.indexesUpdatedKey)
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
      if (this.generatedUpdatedKey)
        for (let t = 0; t < this.rowsFinal.length; t++) {
          let i = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t], n = {};
          for (let r = 0; r < this.hiddenBreakpoints.length; r++) {
            let s = this.hiddenBreakpoints[r];
            for (let l = 0; l < this.configFinal.columns.length; l++) {
              let c = this.configFinal.columns[l];
              !(this.configFinal.hiddenCols[l] || !this.configFinal.ignoreEmpty[l] && this.configFinal.hideEmptyColumns && (this.isColEmpty(l) || this.isColEmpty(l, t)) || this.emptyColumns[l]) && c.breakpoint && (c.breakpoint.toLocaleLowerCase() === "all" || c.breakpoint.toLocaleLowerCase() === s) && !c.sticky && !c.alwaysExpanded && (n[l] = i[l]);
            }
          }
          e[t] = n;
        }
      return e;
    },
    stickyRows() {
      let e = {};
      for (let t = 0; t < this.rowsFinal.length; t++) {
        let i = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t], n = {};
        for (let r = 0; r < this.hiddenBreakpoints.length; r++) {
          let s = this.hiddenBreakpoints[r];
          for (let l = 0; l < this.configFinal.columns.length; l++) {
            let c = this.configFinal.columns[l];
            const g = this.configFinal.hiddenCols[l] || !this.configFinal.ignoreEmpty[l] && this.configFinal.hideEmptyColumns && (this.isColEmpty(l) || this.isColEmpty(l, t)) || this.emptyColumns[l];
            (!g && c.sticky || !g && c.breakpoint && (c.breakpoint.toLocaleLowerCase() === "all" || c.breakpoint.toLocaleLowerCase() === s) && c.alwaysExpanded) && (n[l] = i[l]);
          }
        }
        e[t] = n;
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
      for (let e in this.generatedRows)
        if (Object.prototype.hasOwnProperty.call(this.generatedRows, e) && Object.keys(this.generatedRows[e]).length)
          return !0;
      return !1;
    },
    /**
     * Calculates the classes array for every cell from the align parameters of rows and cells and the custom class string passed to cells
     *
     */
    cellClassesParsed() {
      let e = [];
      for (let t = 0; t < this.rowsFinal.length; t++) {
        e.push([]);
        let i = this.rowsFinal[t].align, n = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t];
        for (let r = 0; r < n.length; r++) {
          let s = [], l = this.configFinal.alignments[r];
          if ((n[r].align || i || l) && (n[r].align ? s.push("text-" + n[r].align) : i ? s.push("text-" + i) : s.push("text-" + l)), n[r].classes) {
            let c = n[r].classes.split(" ");
            Array.prototype.push.apply(s, c);
          }
          e[t].push(s.join(" "));
        }
      }
      return e;
    },
    /**
     *Calculates the number of hidden columns
     *
     */
    hiddenColumns() {
      const e = {};
      for (let t = 0; t < this.visibleRowIndexes.length; t++) {
        let i = 0;
        const n = this.visibleRowIndexes[t];
        for (let r = 0; r < this.hiddenBreakpoints.length; r++) {
          let s = this.hiddenBreakpoints[r];
          for (let l = 0; l < this.configFinal.columns.length; l++) {
            let c = this.configFinal.columns[l];
            if (!(this.configFinal.hiddenCols[l] || !this.configFinal.ignoreEmpty[l] && this.configFinal.hideEmptyColumns && (this.isColEmpty(l) || this.isColEmpty(l, n)) || this.emptyColumns[l]) && c.breakpoint && (c.breakpoint.toLocaleLowerCase() === "all" || c.breakpoint.toLocaleLowerCase() === s)) {
              i++;
              break;
            }
          }
        }
        e[n] = i;
      }
      return e;
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
      return Object.values(this.selected).filter((e) => e).length > 0;
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
        let i = [];
        this.configFinal.alignments[t] && i.push("text-" + this.configFinal.alignments[t]), this.configFinal.sorts[t] && (i.push("sort-header"), this.currentSortIndexes[t] && i.push("active")), e.push(
          i.join(" ") + "  quintable--table-container--table--header-row--th " + this.configFinal.columnClasses[t]
        );
      }
      return e;
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
      return this.configFinal.ajaxUrl ? this.ajaxAll : this.filteredRows.filter((e) => e).length;
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
        let i;
        this.pageRange % 2 === 0 ? i = this.pageRange / 2 : (i = (this.pageRange - 1) / 2, this.currentPage + i > this.pages && i++), t = this.currentPage - i;
      }
      t = Math.max(t + this.pageOffset, 1);
      for (let i = 0; i < this.pageRange && !(i + t > this.pages); i++)
        e.push(i + t);
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
        let i = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t], n = !1, r = !1;
        if (this.configFinal.search && this.query.length >= this.configFinal.searchLength) {
          for (let s = 0; s < i.length; s++) {
            let l = i[s], c = l.html ? l.html : l.text;
            if (c) {
              if (this.configFinal.useFuzzySearch && wt(
                (c + "").toLowerCase(),
                (this.query + "").toLowerCase()
              ).score > 6) {
                n = !0;
                break;
              }
              if ((c + "").toLowerCase().indexOf((this.query + "").toLowerCase()) !== -1) {
                n = !0;
                break;
              }
            }
          }
          if (this.rowsFinal[t].keywords)
            for (let s = 0; s < this.rowsFinal[t].keywords.length; s++) {
              if (this.configFinal.useFuzzySearch && wt(
                (this.rowsFinal[t].keywords[s] + "").toLowerCase(),
                (this.query + "").toLowerCase()
              ).score > 6) {
                n = !0;
                break;
              }
              if ((this.rowsFinal[t].keywords[s] + "").toLowerCase().indexOf((this.query + "").toLowerCase()) !== -1) {
                n = !0;
                break;
              }
            }
          r = !0;
        }
        if (this.filterActive && !this.rowsFinal[t].filters)
          n = !1;
        else if ((r && n || !r) && this.filterActive) {
          if (this.filterGroups.length)
            n = this.doFiltering(this.rowsFinal[t].filters);
          else {
            let s = {
              items: [],
              relation: this.configFinal.filterRelation
            };
            for (let l in this.filtersFinal)
              Object.prototype.hasOwnProperty.call(this.filtersFinal, l) && s.items.push({ name: l });
            n = this.doFilteringForGroup(
              this.filtersFinal,
              this.rowsFinal[t].filters,
              s
            ), this.DEBUG && console.log("FILTER GROUPS CALCULATED", this.filterGroups);
          }
          this.DEBUG && (console.log(`
`), console.log("ROW " + t, n, this.rowsFinal[t].filters), console.log(`
`));
        }
        e[t] = n;
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
      let e = [];
      for (let t = 0; t < this.configFinal.number; t++)
        //headline is not empty
        this.configFinal.headlines[t] && //show breakpoints match with set settings
        //no show breakpoint is set
        (!this.configFinal.columns[t].showHeadlineBreakpoint || //show breakpoint is set and the hidden breakpoints contain this breakpoint
        this.configFinal.columns[t].showHeadlineBreakpoint && this.hiddenBreakpoints.findIndex(
          (i) => this.configFinal.columns[t] && i === this.configFinal.columns[t].showHeadlineBreakpoint
        ) !== -1) && //hide breakpoints match with set settings
        //no hide breakpoint is set
        (!this.configFinal.columns[t].hideHeadlineBreakpoint || //hide breakpoint is set and the hidden breakpoints contain this breakpoint
        this.configFinal.columns[t].hideHeadlineBreakpoint && this.hiddenBreakpoints.findIndex(
          (i) => this.configFinal.columns[t] && i === this.configFinal.columns[t].hideHeadlineBreakpoint
        ) === -1) ? e.push(!0) : e.push(!1);
      return e;
    },
    /**
     * Key of filter operator fuctions
     *
     */
    operators() {
      return Object.keys(this.operatorFunctions);
    },
    emptyColumns() {
      const e = {}, t = this.configFinal.ignoreSortEmptyColumns;
      for (let i = 0; i < this.configFinal.number; i++) {
        const n = this.configFinal.ignoreEmpty[i], r = this.configFinal.sorts[i];
        !this.configFinal.hideEmptyColumns || n || t === "none" && r || t === "active" && Object.keys(this.currentSortIndexes).includes(i + "") ? e[i] = !1 : e[i] = this.isColEmpty(i);
      }
      return e;
    },
    filtersFinal() {
      return !this.configFinal.storeState || !this.storedState.filters ? this.filters : this.storedState.filters;
    },
    rowClasses() {
      const e = {};
      for (let t = 0; t < this.visibleRowIndexes.length; t++) {
        const i = this.visibleRowIndexes[t], n = [];
        this.rowsFinal[i].classes && n.push(this.rowsFinal[i].classes), this.hoveredRow === i && n.push(this.configFinal.hoverClass), this.activeRow === i && n.push(this.configFinal.activeClass), this.openRows[i] && n.push("row-expanded"), this.hiddenColumns[i] > 0 && !this.openRows[i] && n.push("row-collapsed"), e[i] = n.join(" ");
      }
      return e;
    }
  },
  watch: {
    rowsFinal: {
      handler(e) {
        if (e && e.length)
          for (let t = 0; t < e.length; t++) {
            let i = e[t].cells ? e[t].cells : e[t];
            i.length !== this.config.columns.length && console.error(
              `Column count on row index ${t} doesn't fit for column config! expected: ${this.config.columns.length}, got: ${i.length}` + (this.configFinal.ajaxUrl ? ` | URL: ${this.configFinal.ajaxUrl}` : "") + (this.identifier ? ` | IDENTIFIER: ${this.identifier}` : ""),
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
          const i = this.configFinal.selectAllRows ? this.rowsFinal.map((n, r) => r) : this.visibleRowIndexes;
          for (let n = 0; n < e.length; n++) {
            const r = e[n].key, s = e[n].value;
            for (let l = 0; l < i.length; l++) {
              const c = i[l];
              !this.rowsFinal[c].disableSelect && this.rowsFinal[c][r] === s && (this.selected[c] = !0, t++);
            }
          }
          this.configFinal.selectAllRows ? this.allSelectedCustom = t && t === this.rowsFinal.filter((n) => !n.disableSelect).length : this.allSelectedCustom = t && t === this.rowsFinal.filter(
            (n, r) => !n.disableSelect && this.visibleRows[this.sortedIndexes[r]]
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
        if (JSON.stringify(e) === JSON.stringify(t) || this.configFinal.ajaxUrl)
          return;
        this.visibleRowIndexes.findIndex(
          (r) => r === this.activeRow
        ) < 0 && (this.activeRow = null), this.currentPage !== 1 ? this.currentPage = 1 : this.configFinal.keepSelect || this.resetSelect("filteredRows watcher");
        const n = [];
        for (let r = 0; r < e.length; r++) {
          const s = r.toString();
          e[r] && n.push(
            this.rowsFinal[this.sortedIndexes[s] ? this.sortedIndexes[s] : r]
          );
        }
        this.$emit("filtered:rows", n, "filtered:rows");
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
        const i = !(this.configFinal.storeState && this.storedState.query);
        clearTimeout(this.queryAjaxTimeout), this.queryAjaxTimeout = setTimeout(() => {
          this.loadViaAjax(i, i, "QUERY");
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
        this.recomputeEssentials(), this.$forceUpdate(), this.configFinal.defaultSelected && (this.allSelectedCustom = null, this.checkAll(!0));
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
        this.dynamicConfig || (this.initLists(), this.$forceUpdate(), this.activeRow = null, console.log(this.configFinal), this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "CONFIG"), this.configFinal.defaultSelected && this.checkAll(!0));
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
        for (let i in this.sortedIndexes)
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, i) && e[this.sortedIndexes[i]]) {
            const n = this.rowsFinal[this.sortedIndexes[i]];
            n.disableSelect || t.push(n);
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
        let t, i;
        for (let n in this.currentSortIndexes)
          if (Object.prototype.hasOwnProperty.call(
            this.currentSortIndexes,
            n
          ) && this.currentSortIndexes[n].order === 0) {
            t = this.currentSortIndexes[n], i = n;
            break;
          }
        this.currentSortIndexes = {
          [i]: t
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
      const t = this.visibleRowIndexes.findIndex((i) => i === e);
      this.$emit("active:row", this.rowsFinal[e], "active:row", t);
    }
  },
  created() {
    if (this.configFinal.storeState) {
      const i = localStorage.getItem(
        `vue-quintable-${this.identifier}-filters`
      );
      if (i) {
        const g = JSON.parse(i);
        for (let u in this.filters)
          Object.prototype.hasOwnProperty.call(this.filters, u) && !Object.prototype.hasOwnProperty.call(g, u) && (g[u] = this.filters[u]);
        this.storedState.filters = g;
      }
      const n = localStorage.getItem(
        `vue-quintable-${this.identifier}-query`
      );
      n && (this.storedState.query = n);
      const r = localStorage.getItem(
        `vue-quintable-${this.identifier}-rows-per-page`
      );
      r && (this.storedState["rows-per-page"] = parseInt(r));
      const s = localStorage.getItem(
        `vue-quintable-${this.identifier}-selected-rows`
      );
      s && (this.storedState["selected-rows"] = JSON.parse(s));
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
    const t = this.configFinal.selectAllRows ? this.rowsFinal.map((i, n) => n) : this.visibleRowIndexes;
    for (let i = 0; i < t.length; i++) {
      let n = this.rowsFinal[i];
      n.selected && (this.selected[i] = !0), n.selected && e++;
    }
    !this.configFinal.selectAllRows && e && e === this.rowsFinal.filter(
      (i, n) => !i.disableSelect && this.visibleRows[this.sortedIndexes[n]]
    ).length ? this.allSelectedCustom = !0 : this.configFinal.selectAllRows && e && e === this.rowsFinal.filter((i) => !i.disableSelect).length && (this.allSelectedCustom = !0), this.initialSearchTerm && (this.query = this.initialSearchTerm), this.storedState.query && (this.query = this.storedState.query), this.storedState["rows-per-page"] && (this.customRowsPerPage = this.storedState["rows-per-page"]), this.storedState["sort-indexes"] && (this.currentSortIndexes = this.storedState["sort-indexes"], this.sort(!0)), this.storedState["current-page"] && this.$nextTick(() => {
      this.currentPage = this.storedState["current-page"];
    }), this.$nextTick(this.checkStoredSelectedRows), this.configFinal.enableRowTabIndex && document.addEventListener("keydown", this.checkKey);
  },
  mounted() {
    this.configFinal.ajaxUrl && this.loadViaAjax(!1, !0, "MOUNTED"), this.configFinal.defaultSelected && this.checkAll(!0), this.generateHiddenBreakpoints(), window.addEventListener("resize", this.breakpointListener);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.breakpointListener), this.configFinal.enableRowTabIndex && document.removeEventListener("keydown", this.checkKey);
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
        const s = r.cells ? r.cells : r;
        return typeof s[e].isEmpty == "boolean" && s[e].isEmpty === !0 ? !1 : !!(typeof s[e].isEmpty == "boolean" && s[e].isEmpty === !1 || typeof s[e].text != "undefined" && this.valueToString(s[e].text) || typeof s[e].html != "undefined" && this.valueToString(s[e].html));
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
        let i = Math.min(t, this.pages - this.pageRange);
        this.pageOffset = Math.min(i, this.pages - this.currentPage);
      } else e < 0 ? this.pageOffset = Math.max(t, -(this.pages - this.pageRange)) : this.pageOffset = 0;
    },
    cellFormatters(e, t) {
      if (typeof this.configFinal.columns[e].cellFormatter == "function") {
        let i = this.configFinal.columns[e].cellFormatter(t);
        return typeof i != "object" && (i = {
          value: i
        }), i;
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
      let i = Object.keys(this.selected).slice().map((n) => !!this.selected[n] || !!(this.rowsFinal[parseInt(n)] && this.rowsFinal[parseInt(n)].disableSelect));
      i[t] = !!e, this.configFinal.selectAllRows ? i.indexOf(!1) === -1 ? this.allSelectedProperty = !0 : this.allSelectedProperty = !1 : (i = i.filter((n, r) => this.visibleRowIndexes.includes(r)), i.indexOf(!1) !== -1 ? this.allSelectedProperty = !1 : i.indexOf(!1) === -1 && (this.allSelectedProperty = !0));
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
        const i = parseInt(t);
        this.$emit(
          "auxclick:row",
          this.rowsFinal[i],
          "auxclick:row",
          e.target,
          e,
          i
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
      let i = this.hasSomeParentTagName(e.target, "a"), n = this.hasSomeParentTheClass(
        e.target,
        "prevent-toggle"
      );
      const r = t.toString(), s = parseInt(t);
      this.hiddenColumns[r] && !i && !n && (this.openRows[r] ? (this.openRows[r] = !1, this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[r]],
        "collapse:row",
        this.sortedIndexes[r]
      )) : (this.openRows[r] = !0, this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[r]],
        "expand:row",
        this.sortedIndexes[r]
      )), this.generatedUpdatedKey = Date.now()), this.configFinal.enableRowTabIndex && (this.activeRow === s ? this.activeRow = null : this.activeRow = s), this.$emit("click:row", this.rowsFinal[s], "click:row", e.target, e, s);
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
     * Event listener for hovered row. Sets the hoveredRow data entry
     *
     * @param index Index of hovered row
     */
    onMouseenterRow(e) {
      this.hoveredRow !== e && (this.hoveredRow = e);
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
    removeSort(e) {
      for (let t in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, t)) {
          let i = this.currentSortIndexes[t];
          i.order > this.currentSortIndexes[e].order && i.order--, this.currentSortIndexes[t] = i;
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
      let i = 0;
      for (let n in this.sortedIndexes)
        Object.prototype.hasOwnProperty.call(this.sortedIndexes, n) && (n = parseInt(n), !this.rowsFinal[this.sortedIndexes[n]].disableSelect && (!this.configFinal.selectAllRows && this.visibleRows[this.sortedIndexes[n]] || this.configFinal.selectAllRows && this.filteredRows[this.sortedIndexes[n]]) ? (this.selected[this.sortedIndexes[n]] = t, i++) : this.selected[this.sortedIndexes[n]] = t);
      t && (this.configFinal.selectAllRows ? this.allSelectedCustom = i && i === this.rowsFinal.filter((n) => !n.disableSelect).length : this.allSelectedCustom = i && i === this.rowsFinal.filter(
        (n, r) => !n.disableSelect && this.visibleRows[this.sortedIndexes[r]]
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
      for (let i = 0; i < this.filterGroups.length; i++)
        t.push(
          this.doFilteringForGroup(
            this.filtersFinal,
            e,
            this.filterGroups[i]
          )
        ), this.DEBUG && i < this.filterGroups.length - 1 && console.log(this.configFinal.filterGroupRelation);
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
    doFilteringForGroup(e, t, i, n = 0) {
      let r = "   ";
      for (let l = 0; l < n; l++)
        r += "   ";
      if (this.DEBUG) {
        if (i.items) {
          let l = r, c = i.items.slice(), g = function(u, o) {
            return u.name === void 0 ? 1 : o.name === void 0 ? -1 : 0;
          };
          c = c.sort(g);
          for (let u = 0; u < c.length; u++)
            c[u].name && (l += c[u].name, u < c.length - 1 && (l += " " + i.relation + " "));
          console.log(l);
        }
        console.log(r, "GROUP:", i);
      }
      let s = !1;
      if (i.relation === "AND") {
        for (let l in e)
          if (Object.prototype.hasOwnProperty.call(e, l)) {
            if (this.filterGroups.length && !this.findInFilterGroups(l, this.filterGroups))
              continue;
            let c = !0;
            for (let g = 0; g < i.items.length; g++) {
              let u = i.items[g];
              if (u.name && t[u.name] === void 0) {
                c = !1;
                break;
              }
            }
            if (c)
              for (let g = 0; g < i.items.length; g++) {
                let u = i.items[g];
                if (s = !0, u.items && (s = this.doFilteringForGroup(
                  e,
                  t,
                  u,
                  n + 1
                )), !s)
                  break;
                if (typeof e[u.name] == "undefined")
                  continue;
                let o = typeof e[u.name] == "object" && e[u.name] !== null && e[u.name].operator && this.operators.includes(e[u.name].operator) ? e[u.name].operator : this.defaultOperator, a = this.getFilterValues(e[u.name]);
                const f = typeof e[u.name].compare == "function" ? e[u.name].compare : this.operatorFunctions[o];
                for (let b = 0; b < a.length; b++)
                  if (!f(
                    a[b],
                    t[u.name]
                  )) {
                    s = !1;
                    break;
                  }
                if (!s)
                  break;
              }
          }
        return s;
      } else if (i.relation === "OR" || i.items) {
        for (let l in e)
          if (Object.prototype.hasOwnProperty.call(e, l)) {
            if (this.filterGroups.length && !this.findInFilterGroups(l, this.filterGroups))
              continue;
            for (let c = 0; c < i.items.length; c++) {
              let g = i.items[c];
              if (g.items && (s = this.doFilteringForGroup(
                e,
                t,
                g,
                n + 1
              ), s))
                break;
              if (typeof e[g.name] == "undefined")
                continue;
              let u = typeof e[g.name] == "object" && e[g.name] !== null && e[g.name].operator && this.operators.includes(e[g.name].operator) ? e[g.name].operator : this.defaultOperator, o = this.getFilterValues(e[g.name]);
              const a = typeof e[g.name].compare == "function" ? e[g.name].compare : this.operatorFunctions[u];
              for (let f = 0; f < o.length; f++)
                if (a(
                  o[f],
                  t[g.name]
                )) {
                  s = !0;
                  break;
                }
              if (s)
                break;
            }
          }
        return s;
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
    findInFilterGroups(e, t, i = 0) {
      if (!t)
        return !1;
      let n = !1;
      for (let r = 0; r < t.length; r++) {
        let s = t[r];
        if (s.items && (n = this.findInFilterGroups(e, s.items, i + 1), n))
          break;
        if (s.name === e) {
          n = !0;
          break;
        }
      }
      return n;
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
      const i = parseInt(e), n = e.toString();
      if (!this.configFinal.sorts[i])
        return;
      let r;
      this.currentSortIndexes[n] ? (r = this.currentSortIndexes[n], r.asc = !r.asc) : (this.multiSort || (this.currentSortIndexes = {}), r = {
        headline: this.configFinal.headlines[i],
        index: i,
        asc: this.configFinal.sorts[i] === !0 ? !0 : this.configFinal.sorts[i] === "ASC",
        order: this.numberOfSorts
      }), typeof t != "undefined" && (r.asc = t), this.currentSortIndexes[i] = r, this.configFinal.storeState && localStorage.setItem(
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
      let t = this.rowsFinal.slice(), i = [], n = [], r = {};
      if (this.pageSort) {
        if (n = this.visibleRowIndexes.slice(), !n.length) {
          const a = this.configFinal.pagination ? this.configFinal.pagination : this.rowsFinal.length;
          for (let f = 0; f < a; f++)
            n.push(f);
        }
        let o = 0;
        for (let a = 0; a < t.length; a++)
          t[a].index = a, n.indexOf(a) !== -1 && (o < this.configFinal.pagination && i.push(t[a]), o++);
        if (Object.keys(this.sortedIndexes).length)
          r = Object.assign({}, this.sortedIndexes);
        else
          for (let a = 0; a < t.length; a++)
            r[a.toString()] = a;
      } else {
        i = this.rowsFinal.slice();
        for (let o = 0; o < i.length; o++)
          i[o].index = o;
      }
      let s = [];
      for (let o in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, o)) {
          let a = this.currentSortIndexes[o];
          a.index = o, s.push(a);
        }
      s.sort(function(o, a) {
        return o.order - a.order;
      });
      let l = (o, a, f, b) => {
        b = b || 0;
        let y = f[b], S = y.index, w = o.cells ? o.cells : o, v = a.cells ? a.cells : a, R = typeof w[S].sortValue != "undefined" && w[S].sortValue !== null ? w[S].sortValue : w[S].html ? w[S].html : w[S].text;
        typeof w[S].computeSortValue == "function" && (R = w[S].computeSortValue(this.currentSortIndexes));
        let x = typeof v[S].sortValue != "undefined" && v[S].sortValue !== null ? v[S].sortValue : v[S].html ? v[S].html : v[S].text;
        return typeof v[S].computeSortValue == "function" && (R = v[S].computeSortValue(this.currentSortIndexes)), typeof R == "string" && (R = R.toLowerCase()), typeof x == "string" && (x = x.toLowerCase()), isNaN(R) ? (typeof R == "string" && R.match(/^-?\d+$/) || typeof R == "string" && R.match(/^\d+\.\d+$/)) && (R = parseFloat(R)) : R = parseFloat(R), isNaN(x) ? (typeof x == "string" && x.match(/^-?\d+$/) || typeof x == "string" && x.match(/^\d+\.\d+$/)) && (x = parseFloat(x)) : x = parseFloat(x), y.asc ? R > x ? 1 : R < x ? -1 : f[b + 1] ? l(o, a, f, b + 1) : 1 : R < x ? 1 : R > x ? -1 : f[b + 1] ? l(o, a, f, b + 1) : -1;
      };
      i.sort(function(o, a) {
        return l(o, a, s);
      });
      const c = [];
      let g = 0, u = 0;
      for (let o = 0; o < t.length; o++) {
        const a = o.toString();
        this.pageSort && n.indexOf(o) !== -1 ? (g < this.configFinal.pagination ? (c.push(i[u]), u++) : c.push(t[r[a]]), g++) : this.pageSort ? c.push(t[r[a]]) : c.push(i[o]);
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
        this.rowsUpdatedKey = Date.now(), this.indexesUpdatedKey = Date.now(), this.generatedUpdatedKey = Date.now();
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
    loadViaAjax(e = !1, t = !0, i = null) {
      this.DEBUG && console.log("CALLED FROM:", i);
      let n = this.query;
      if (n && n.length < this.configFinal.searchLength && (this.lastQuery.length < n.length || this.lastQuery.length < this.configFinal.searchLength))
        return;
      if (!n && this.lastQuery) {
        const l = this.lastQuery;
        if (this.lastQuery = "", l.length < this.configFinal.searchLength)
          return;
      } else n && n.length < this.configFinal.searchLength && (n = "");
      this.cancelSource && this.cancelSource.cancel("Operation canceled by the user."), this.clearLists(t), this.ajaxRows = [], e && (this.currentPage = 1, this.resetSelect("loadViaAjax method")), this.loaderHeight = this.$refs["height-wrapper"] ? this.$refs["height-wrapper"].clientHeight : 0, this.fetching = !0;
      let r = {
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
      const s = {
        "Content-Type": "application/json"
      };
      this.axiosFinal.request(this.configFinal.ajaxUrl, {
        method: this.configFinal.requestMethod,
        params: this.configFinal.requestMethod === "GET" ? r : null,
        data: this.configFinal.requestMethod === "POST" ? r : null,
        cancelToken: this.cancelSource.token,
        headers: s
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
     * Check if DOM element is visible
     *
     * @param el DOMElement
     * @returns {boolean}
     */
    elementVisible(e) {
      return e ? window.getComputedStyle(e).display !== "none" : !1;
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
    generateHiddenBreakpoints(e = !1) {
      e && (this.hiddenBreakpoints = []);
      let t = [];
      this.elementVisible(this.$refs.xxl) || t.push("xxl"), this.elementVisible(this.$refs.xl) || t.push("xl"), this.elementVisible(this.$refs.lg) || t.push("lg"), this.elementVisible(this.$refs.md) || t.push("md"), this.elementVisible(this.$refs.sm) || t.push("sm"), t.push("all"), JSON.stringify(this.hiddenBreakpoints) !== JSON.stringify(t) && (this.hiddenBreakpoints = t);
    },
    checkStoredSelectedRows(e = !1) {
      if (this.storedState["pre-selected-rows"], this.storedState["selected-rows"]) {
        this.selected = JSON.parse(
          JSON.stringify(this.storedState["selected-rows"])
        );
        const t = Object.values(this.selected).filter((i) => i).length;
        this.configFinal.selectAllRows ? this.allSelectedCustom = t && t === this.rowsFinal.length : this.allSelectedCustom = t && t === this.visibleRows.filter((i) => i).length, e && delete this.storedState["selected-rows"];
      }
    },
    checkKey(e) {
      if (this.activeRow !== null) {
        if (e.keyCode === 40) {
          e.preventDefault();
          const t = this.visibleRowIndexes.findIndex(
            (i) => i === this.activeRow
          );
          t === this.visibleRowIndexes.length - 1 ? this.activeRow = 0 : this.activeRow = this.visibleRowIndexes[t + 1];
        }
        if (e.keyCode === 38) {
          e.preventDefault();
          const t = this.visibleRowIndexes.findIndex(
            (i) => i === this.activeRow
          );
          t === 0 ? this.activeRow = this.visibleRowIndexes[this.visibleRowIndexes.length - 1] : this.activeRow = this.visibleRowIndexes[t - 1];
        }
      }
    }
  }
}, Cn = { class: "table-wrapper quintable" }, xn = { class: "breakpoints quintable--breakpoints" }, Pn = { ref: "xs" }, vn = {
  ref: "sm",
  class: "d-none d-sm-block"
}, On = {
  ref: "md",
  class: "d-none d-md-block"
}, _n = {
  ref: "lg",
  class: "d-none d-lg-block"
}, En = {
  ref: "xl",
  class: "d-none d-xl-block"
}, An = {
  ref: "xxl",
  class: "d-none d-xxl-block"
}, Tn = { class: "header slot slot-header quintable--header" }, qn = ["placeholder"], jn = { class: "slot slot-after-search quintable--after-search-container" }, Ln = {
  ref: "height-wrapper",
  class: "clearfix quintable--table-container"
}, Un = { key: 0 }, Nn = { class: "vue-quintable-header-row quintable--table-container--table--header-row" }, Vn = {
  key: 0,
  class: "placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th"
}, Bn = {
  key: 1,
  class: "select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre"
}, Dn = { class: "p-1" }, Mn = {
  key: 1,
  class: "mb-0 mt-0"
}, Hn = ["title", "onClick"], In = ["innerHTML"], Gn = {
  key: 1,
  class: "headline quintable--table-container--table--header-row--th--headline"
}, zn = {
  key: 2,
  class: "sorting-icon ms-2 quintable--table-container--table--header-row--th--sorting-icon"
}, Jn = ["onClick"], Kn = {
  key: 0,
  class: "badge bg-info text-white"
}, Wn = { key: 1 }, Qn = {
  key: 2,
  class: "select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post"
}, Xn = {
  key: 1,
  class: "mb-0 mt-0"
}, Zn = ["id", "onClick", "onAuxclick", "onMouseenter"], Yn = {
  key: 0,
  class: "toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td"
}, $n = { key: 0 }, er = { key: 0 }, tr = { key: 1 }, sr = {
  key: 1,
  class: "mb-0 mt-0"
}, ir = ["onUpdate:modelValue", "disabled", "onChange"], nr = ["id", "onClick", "onAuxclick"], rr = ["innerHTML"], lr = ["innerHTML"], or = {
  key: 1,
  class: "mb-0 mt-0"
}, ar = ["onUpdate:modelValue", "disabled", "onChange"], cr = ["onMouseenter", "onClick"], ur = ["colspan"], hr = { class: "mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table" }, dr = ["id"], fr = {
  key: 0,
  class: "toggle-cell invisible"
}, gr = { key: 0 }, pr = { key: 0 }, mr = { key: 1 }, wr = ["onClick"], br = ["innerHTML"], yr = {
  key: 1,
  class: "headline"
}, Sr = {
  key: 2,
  class: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
}, kr = ["onClick"], Fr = {
  key: 0,
  class: "badge bg-info text-white"
}, Rr = { key: 1 }, Cr = ["colspan", "onClick"], xr = ["innerHTML"], Pr = {
  key: 1,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value"
}, vr = ["innerHTML"], Or = {
  key: 3,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component"
}, _r = {
  key: 4,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text"
}, Er = ["id"], Ar = {
  key: 0,
  class: "toggle-cell invisible"
}, Tr = { key: 0 }, qr = { key: 0 }, jr = { key: 1 }, Lr = ["onClick"], Ur = ["innerHTML"], Nr = {
  key: 1,
  class: "headline"
}, Vr = {
  key: 2,
  class: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
}, Br = ["onClick"], Dr = {
  key: 0,
  class: "badge bg-info text-white"
}, Mr = { key: 1 }, Hr = ["colspan", "onClick"], Ir = ["innerHTML"], Gr = ["innerHTML"], zr = {
  key: 1,
  class: "clearfix slot-no-results slot quintable--table-container--no-results"
}, Jr = { class: "text-center p-3 quintable--table-container--no-results--results" }, Kr = ["innerHTML"], Wr = {
  key: 1,
  class: "slot-loading slot quintable--loading"
}, Qr = { class: "loader text-center py-4 quintable--loading--loader-wrapper--loader" }, Xr = { class: "clearfix quintable--table-footer-container" }, Zr = { class: "row" }, Yr = { class: "col-lg-4 quintable--table-footer-container--sort-container" }, $r = { class: "col-lg-8 quintable--table-footer-container--pagination-wrapper" }, el = {
  key: 0,
  class: "float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container"
}, tl = {
  key: 0,
  class: "mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select"
}, sl = ["innerHTML"], il = { class: "pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination" }, nl = { class: "page-link" }, rl = { class: "page-link" }, ll = ["onClick"], ol = { class: "page-link" }, al = { class: "page-link" }, cl = { class: "page-link" }, ul = {
  key: 2,
  class: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows"
}, hl = { class: "footer slot slot-footer quintable--footer" };
function dl(e, t, i, n, r, s) {
  const l = je("quintable-font-awesome-icon"), c = je("quintable-p-check"), g = je("quintable-v-select"), u = As("tooltip");
  return d(), p("div", Cn, [
    k("div", xn, [
      k("div", Pn, null, 512),
      k("div", vn, null, 512),
      k("div", On, null, 512),
      k("div", _n, null, 512),
      k("div", En, null, 512),
      k("div", An, null, 512)
    ]),
    k("div", Tn, [
      O(e.$slots, "header", {}, void 0, !0)
    ]),
    s.configFinal.search ? (d(), p("div", {
      key: 0,
      class: P(["mb-3 quintable--search-container", s.configFinal.searchContainerClass])
    }, [
      O(e.$slots, "before-search", {}, void 0, !0),
      O(e.$slots, "search", {
        value: r.query,
        loading: i.loading,
        setSearchQuery: s.setSearchQuery,
        placeholder: s.configFinal.searchPlaceholder,
        searchClass: s.configFinal.searchClass
      }, () => [
        k("div", {
          class: P(["quintable--search-container--input-container", s.configFinal.searchClass])
        }, [
          I(k("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (o) => r.query = o),
            type: "search",
            placeholder: s.configFinal.searchPlaceholder,
            class: "form-control"
          }, null, 8, qn), [
            [Ts, r.query]
          ])
        ], 2)
      ], !0),
      O(e.$slots, "after-search", {}, void 0, !0)
    ], 2)) : m("", !0),
    k("div", jn, [
      O(e.$slots, "after-search-container", {}, void 0, !0)
    ]),
    k("div", Ln, [
      s.ajaxLoading ? m("", !0) : (d(), p("table", {
        key: 0,
        ref: "table",
        class: P(["vue-quintable table quintable--table-container--table", i.tableClasses])
      }, [
        s.configFinal.headlines.length ? (d(), p("thead", Un, [
          k("tr", Nn, [
            s.hasGeneratedRows && !s.configFinal.hideRowToggle ? (d(), p("th", Vn, t[21] || (t[21] = [
              k("wbr", null, null, -1)
            ]))) : m("", !0),
            s.configFinal.select && s.configFinal.selectPosition === "pre" ? (d(), p("th", Bn, [
              s.configFinal.selectAll && !s.noRows ? (d(), p(j, { key: 0 }, [
                s.configFinal.prettySelect ? (d(), _(c, {
                  key: 0,
                  modelValue: s.allSelectedProperty,
                  "onUpdate:modelValue": t[1] || (t[1] = (o) => s.allSelectedProperty = o),
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[2] || (t[2] = (o) => s.checkAll())
                }, {
                  extra: Z(() => [
                    k("span", null, [
                      s.allSelectedProperty ? (d(), _(l, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : m("", !0)
                    ]),
                    k("span", Dn, [
                      s.someSelected && !s.allSelectedProperty ? (d(), _(l, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : m("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : (d(), p("label", Mn, [
                  I(k("input", {
                    "onUpdate:modelValue": t[3] || (t[3] = (o) => s.allSelectedProperty = o),
                    type: "checkbox",
                    onChange: t[4] || (t[4] = (o) => s.checkAll())
                  }, null, 544), [
                    [de, s.allSelectedProperty]
                  ])
                ]))
              ], 64)) : m("", !0)
            ])) : m("", !0),
            (d(!0), p(j, null, Y(s.configFinal.headlines, (o, a) => (d(), p(j, null, [
              (s.configFinal.columns[a] && !s.configFinal.columns[a].breakpoint || r.hiddenBreakpoints.findIndex(
                (f) => s.configFinal.columns[a] && f === s.configFinal.columns[a].breakpoint
              ) === -1) && !s.configFinal.columns[a].sticky && !s.configFinal.hiddenCols[a] && !s.emptyColumns[a] ? (d(), p("th", {
                key: "headline-" + a,
                class: P(s.headerClass[a]),
                title: s.configFinal.columns[a].title,
                onClick: $((f) => s.setSortColumn(a), ["stop"])
              }, [
                s.showHeadlines[a] ? (d(), p("span", {
                  key: 0,
                  class: "headline quintable--table-container--table--header-row--th--headline",
                  innerHTML: o
                }, null, 8, In)) : (d(), p("span", Gn, t[22] || (t[22] = [
                  k("wbr", null, null, -1)
                ]))),
                s.configFinal.sorts[a] ? (d(), p("span", zn, [
                  r.currentSortIndexes[a] ? m("", !0) : (d(), _(l, {
                    key: 0,
                    icon: "sort",
                    class: "text-primary"
                  })),
                  r.currentSortIndexes[a] && r.currentSortIndexes[a].asc ? (d(), _(l, {
                    key: 1,
                    icon: "sort-amount-down-alt",
                    class: "text-primary"
                  })) : m("", !0),
                  r.currentSortIndexes[a] && !r.currentSortIndexes[a].asc ? (d(), _(l, {
                    key: 2,
                    icon: "sort-amount-down",
                    class: "text-primary"
                  })) : m("", !0),
                  r.currentSortIndexes[a] ? (d(), p("span", {
                    key: 3,
                    class: "ms-1 text-muted",
                    onClick: $((f) => s.removeSort(a), ["stop", "prevent"])
                  }, [
                    s.numberOfSorts > 1 ? (d(), p("span", Kn, T(r.currentSortIndexes[a].order + 1), 1)) : (d(), p("small", Wn, [
                      L(l, { icon: "times" })
                    ]))
                  ], 8, Jn)) : m("", !0)
                ])) : m("", !0)
              ], 10, Hn)) : m("", !0)
            ], 64))), 256)),
            s.configFinal.select && s.configFinal.selectPosition === "post" ? (d(), p("th", Qn, [
              s.configFinal.selectAll && !s.noRows ? (d(), p(j, { key: 0 }, [
                s.configFinal.prettySelect ? (d(), _(c, {
                  key: 0,
                  modelValue: s.allSelectedProperty,
                  "onUpdate:modelValue": t[5] || (t[5] = (o) => s.allSelectedProperty = o),
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[6] || (t[6] = (o) => s.checkAll())
                }, {
                  extra: Z(() => [
                    k("span", null, [
                      s.allSelectedProperty ? (d(), _(l, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : m("", !0)
                    ]),
                    k("span", null, [
                      s.someSelected && !s.allSelectedProperty ? (d(), _(l, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : m("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : (d(), p("label", Xn, [
                  I(k("input", {
                    "onUpdate:modelValue": t[7] || (t[7] = (o) => s.allSelectedProperty = o),
                    type: "checkbox",
                    onChange: t[8] || (t[8] = (o) => s.checkAll())
                  }, null, 544), [
                    [de, s.allSelectedProperty]
                  ])
                ]))
              ], 64)) : m("", !0)
            ])) : m("", !0)
          ])
        ])) : m("", !0),
        k("tbody", {
          class: "quintable--table-container--table--tbody",
          onMouseleave: t[11] || (t[11] = (...o) => s.onMouseleaveTable && s.onMouseleaveTable(...o))
        }, [
          (d(!0), p(j, null, Y(s.visibleRowIndexes, (o) => (d(), p(j, {
            key: "vue-quintable-" + r.uuid + "-row-" + o + "-" + r.indexesUpdatedKey
          }, [
            I((d(), p("tr", {
              id: "vue-quintable-" + r.uuid + "-row-" + o,
              ref_for: !0,
              ref: "row-highlighted-" + o,
              class: P([s.rowClasses[o], "vue-quintable-row quintable--table-container--table--tbody--row"]),
              style: pt(s.hiddenColumns[o] > 0 ? "cursor:pointer;" : ""),
              onClick: (a) => s.onRowClick(a, o),
              onAuxclick: (a) => s.onRowAuxClick(a, o),
              onMousedown: t[10] || (t[10] = (a) => s.onRowMousedown(a)),
              onMouseenter: (a) => s.onMouseenterRow(o)
            }, [
              s.hasGeneratedRows && !s.configFinal.hideRowToggle ? (d(), p("td", Yn, [
                s.hiddenColumns[o] > 0 ? (d(), p("span", $n, [
                  r.openRows[o] ? (d(), p("span", tr, [
                    L(l, {
                      "fixed-width": "",
                      icon: s.configFinal.expandedRowIcon
                    }, null, 8, ["icon"])
                  ])) : (d(), p("span", er, [
                    L(l, {
                      "fixed-width": "",
                      icon: s.configFinal.collapsedRowIcon
                    }, null, 8, ["icon"])
                  ]))
                ])) : m("", !0)
              ])) : m("", !0),
              s.configFinal.select && s.configFinal.selectPosition === "pre" ? (d(), p("td", {
                key: 1,
                class: P(["select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre", { "disabled-select": s.rowsFinal[o].disableSelect }])
              }, [
                !s.rowsFinal[o].disableSelect || s.rowsFinal[o].showDisabledSelect ? (d(), p(j, { key: 0 }, [
                  s.configFinal.prettySelect ? (d(), _(c, {
                    key: 0,
                    modelValue: r.selected[o],
                    "onUpdate:modelValue": (a) => r.selected[o] = a,
                    name: "check",
                    class: "p-icon",
                    disabled: s.rowsFinal[o].disableSelect,
                    onChange: (a) => s.checkListener(a, o)
                  }, {
                    extra: Z(() => [
                      k("span", null, [
                        r.selected[o] ? (d(), _(l, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : m("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : (d(), p("label", sr, [
                    I(k("input", {
                      "onUpdate:modelValue": (a) => r.selected[o] = a,
                      type: "checkbox",
                      disabled: s.rowsFinal[o].disableSelect,
                      onChange: (a) => s.checkListener(a, o)
                    }, null, 40, ir), [
                      [de, r.selected[o]]
                    ])
                  ]))
                ], 64)) : m("", !0)
              ], 2)) : m("", !0),
              (d(!0), p(j, null, Y(s.rowsFinal[o].cells ? s.rowsFinal[o].cells : s.rowsFinal[o], (a, f) => (d(), p(j, null, [
                !s.configFinal.hiddenCols[f] && !s.emptyColumns[f] && s.configFinal.columns[f] && a && r.hiddenBreakpoints.findIndex(
                  (b) => b === s.configFinal.columns[f].breakpoint
                ) === -1 && s.configFinal.columns[f].breakpoint !== "all" && !s.configFinal.stickyCols[f] ? I((d(), p("td", {
                  id: "vue-quintable-" + r.uuid + "-cell-" + o + "-" + f,
                  key: "vue-quintable-" + r.uuid + "-cell-" + o + "-" + f,
                  class: P([
                    "vue-quintable-cell quintable--table-container--table--tbody--row--cell",
                    s.cellClassesParsed[o][f] + " " + s.configFinal.columnClasses[f]
                  ]),
                  onClick: (b) => s.onCellClick(b, a),
                  onAuxclick: (b) => s.onCellAuxClick(b, a),
                  onMousedown: t[9] || (t[9] = (b) => s.onCellMousedown(b))
                }, [
                  O(e.$slots, "cell-complete", { cell: a }, () => [
                    O(e.$slots, "cell-content", { cell: a }, () => [
                      s.configFinal.columns[f].cellFormatter && s.cellFormatters(f, a).type === "html" ? (d(), p("div", {
                        key: 0,
                        class: P(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html"]),
                        innerHTML: s.cellFormatters(f, a).value
                      }, null, 8, rr)) : s.configFinal.columns[f].cellFormatter ? (d(), p("div", {
                        key: 1,
                        class: P(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value"])
                      }, T(s.cellFormatters(f, a).value), 1)) : s.valueToString(a.html) ? (d(), p("div", {
                        key: 2,
                        class: P(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--html"]),
                        innerHTML: a.html
                      }, null, 8, lr)) : a.component ? (d(), p("div", {
                        key: 3,
                        class: P(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--component"])
                      }, [
                        (d(), _(Le(a.component.name), Ue({ ref_for: !0 }, a.component.props, { onAction: s.handleComponentEvent }), null, 16, ["onAction"]))
                      ])) : s.valueToString(a.text) ? (d(), p("div", {
                        key: 4,
                        class: P(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--text"])
                      }, T(a.text), 1)) : m("", !0)
                    ], !0)
                  ], !0)
                ], 42, nr)), [
                  [u, {
                    placement: "left",
                    content: a.tooltip,
                    trigger: a.tooltip ? "hover" : "manual"
                  }]
                ]) : m("", !0)
              ], 64))), 256)),
              s.configFinal.select && s.configFinal.selectPosition === "post" ? (d(), p("td", {
                key: 2,
                class: P(["select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post", { "disabled-select": s.rowsFinal[o].disableSelect }])
              }, [
                !s.rowsFinal[o].disableSelect || s.rowsFinal[o].showDisabledSelect ? (d(), p(j, { key: 0 }, [
                  s.configFinal.prettySelect ? (d(), _(c, {
                    key: 0,
                    modelValue: r.selected[o],
                    "onUpdate:modelValue": (a) => r.selected[o] = a,
                    name: "check",
                    class: "p-icon",
                    disabled: s.rowsFinal[o].disableSelect,
                    onChange: (a) => s.checkListener(a, o)
                  }, {
                    extra: Z(() => [
                      k("span", null, [
                        r.selected[o] ? (d(), _(l, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : m("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : (d(), p("label", or, [
                    I(k("input", {
                      "onUpdate:modelValue": (a) => r.selected[o] = a,
                      type: "checkbox",
                      disabled: s.rowsFinal[o].disableSelect,
                      onChange: (a) => s.checkListener(a, o)
                    }, null, 40, ar), [
                      [de, r.selected[o]]
                    ])
                  ]))
                ], 64)) : m("", !0)
              ], 2)) : m("", !0)
            ], 46, Zn)), [
              [u, {
                placement: "top",
                content: s.rowsFinal[o].tooltip,
                trigger: s.rowsFinal[o].tooltip ? "hover" : "manual",
                offset: 5
              }]
            ]),
            (s.generatedRows[o] || s.stickyRows[o]) && s.visibleRows[o] ? (d(), p(j, { key: 0 }, [
              r.generatedUpdatedKey && r.openRows[o] && Object.keys(s.generatedRows[o]).length || Object.keys(s.stickyRows[o]).length ? (d(), p("tr", {
                key: "generated-row-" + o + "-" + r.rowsUpdatedKey + "-" + r.generatedUpdatedKey,
                ref_for: !0,
                ref: "generated-row-highlighted-" + o,
                class: P(["generated-row quintable--table-container--table--tbody--generated-row", {
                  "parent-row-expanded": r.openRows[o],
                  "parent-row-collapsed": s.hiddenColumns[o] > 0 && !r.openRows[o]
                }]),
                onMouseenter: (a) => s.onMouseenterRow(o),
                onClick: (a) => s.onRowClick(a, o)
              }, [
                k("td", {
                  colspan: s.configFinal.number + 1,
                  class: "ps-0 pe-0 pt-0"
                }, [
                  k("div", {
                    class: P({
                      [s.configFinal.hoverClass]: r.hoveredRow === o,
                      [s.configFinal.activeClass]: r.activeRow === o
                    })
                  }, [
                    k("table", hr, [
                      k("tbody", null, [
                        (d(!0), p(j, null, Y(s.generatedRows[o], (a, f) => (d(), p(j, null, [
                          r.openRows[o] ? (d(), p("tr", {
                            id: "vue-quintable-" + r.uuid + "-generated-row-cell-" + o + "-" + f,
                            key: "vue-quintable-" + r.uuid + "-generated-row-cell-" + o + "-" + f + "-" + r.generatedUpdatedKey,
                            class: "generated-row-cell quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell"
                          }, [
                            !s.configFinal.hideRowToggle && s.generatedRows[o] && Object.keys(s.generatedRows[o]).length ? (d(), p("td", fr, [
                              s.hiddenColumns[o] > 0 ? (d(), p("span", gr, [
                                r.openRows[o] ? (d(), p("span", mr, [
                                  L(l, {
                                    "fixed-width": "",
                                    icon: s.configFinal.expandedRowIcon
                                  }, null, 8, ["icon"])
                                ])) : (d(), p("span", pr, [
                                  L(l, {
                                    "fixed-width": "",
                                    icon: s.configFinal.collapsedRowIcon
                                  }, null, 8, ["icon"])
                                ]))
                              ])) : m("", !0)
                            ])) : m("", !0),
                            s.showHeadlines[f] || s.configFinal.sorts[f] ? (d(), p("td", {
                              key: 1,
                              class: P([s.configFinal.columnClasses[f], "generated-cell-element generated-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline"]),
                              onClick: $((b) => s.setSortColumn(f), ["stop"])
                            }, [
                              s.showHeadlines[f] ? (d(), p("strong", {
                                key: 0,
                                innerHTML: s.configFinal.headlines[f]
                              }, null, 8, br)) : (d(), p("span", yr, t[23] || (t[23] = [
                                k("wbr", null, null, -1)
                              ]))),
                              s.configFinal.sorts[f] && r.hoveredRow === o ? (d(), p("span", Sr, [
                                r.currentSortIndexes[f] ? m("", !0) : (d(), _(l, {
                                  key: 0,
                                  icon: "sort",
                                  class: "text-primary"
                                })),
                                r.currentSortIndexes[f] && r.currentSortIndexes[f].asc ? (d(), _(l, {
                                  key: 1,
                                  icon: "sort-amount-down-alt",
                                  class: "text-primary"
                                })) : m("", !0),
                                r.currentSortIndexes[f] && !r.currentSortIndexes[f].asc ? (d(), _(l, {
                                  key: 2,
                                  icon: "sort-amount-down",
                                  class: "text-primary"
                                })) : m("", !0),
                                r.currentSortIndexes[f] ? (d(), p("span", {
                                  key: 3,
                                  class: "ms-1 text-muted",
                                  onClick: $((b) => s.removeSort(f), ["stop", "prevent"])
                                }, [
                                  s.numberOfSorts > 1 ? (d(), p("span", Fr, T(r.currentSortIndexes[f].order + 1), 1)) : (d(), p("small", Rr, [
                                    L(l, { icon: "times" })
                                  ]))
                                ], 8, kr)) : m("", !0)
                              ])) : m("", !0)
                            ], 10, wr)) : m("", !0),
                            I((d(), p("td", {
                              colspan: !s.showHeadlines[f] && !s.configFinal.sorts[f] ? 2 : 1,
                              class: P([
                                s.configFinal.columnClasses[f] + " " + s.cellClassesParsed[o][f],
                                "generated-cell-element generated-cell-element-content generated-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content"
                              ]),
                              onClick: (b) => s.onCellClick(b, a)
                            }, [
                              O(e.$slots, "generated-cell-complete", { cell: a }, () => [
                                O(e.$slots, "generated-cell-content", { cell: a }, () => [
                                  s.configFinal.columns[f].cellFormatter && s.cellFormatters(f, a).type === "html" ? (d(), p("div", {
                                    key: 0,
                                    class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html",
                                    innerHTML: s.cellFormatters(f, a).value
                                  }, null, 8, xr)) : s.configFinal.columns[f].cellFormatter ? (d(), p("div", Pr, T(s.cellFormatters(f, a).value), 1)) : s.valueToString(a.html) ? (d(), p("div", {
                                    key: 2,
                                    class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html",
                                    innerHTML: a.html
                                  }, null, 8, vr)) : a.component ? (d(), p("div", Or, [
                                    (d(), _(Le(a.component.name), Ue({ ref_for: !0 }, a.component.props, { onAction: s.handleComponentEvent }), null, 16, ["onAction"]))
                                  ])) : s.valueToString(a.text) ? (d(), p("div", _r, T(a.text), 1)) : m("", !0)
                                ], !0)
                              ], !0)
                            ], 10, Cr)), [
                              [u, {
                                placement: "top",
                                content: a.tooltip,
                                trigger: a.tooltip ? "hover" : "manual"
                              }]
                            ])
                          ], 8, dr)) : m("", !0)
                        ], 64))), 256)),
                        (d(!0), p(j, null, Y(s.stickyRows[o], (a, f) => (d(), p("tr", {
                          id: "vue-quintable-" + r.uuid + "-sticky-row-cell-" + o + "-" + f,
                          key: "vue-quintable-" + r.uuid + "-sticky-row-cell-" + o + "-" + f,
                          class: "sticky-row-cell quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell"
                        }, [
                          !s.configFinal.hideRowToggle && s.generatedRows[o] && Object.keys(s.generatedRows[o]).length ? (d(), p("td", Ar, [
                            s.hiddenColumns[o] > 0 ? (d(), p("span", Tr, [
                              r.openRows[o] ? (d(), p("span", jr, [
                                L(l, {
                                  "fixed-width": "",
                                  icon: s.configFinal.expandedRowIcon
                                }, null, 8, ["icon"])
                              ])) : (d(), p("span", qr, [
                                L(l, {
                                  "fixed-width": "",
                                  icon: s.configFinal.collapsedRowIcon
                                }, null, 8, ["icon"])
                              ]))
                            ])) : m("", !0)
                          ])) : m("", !0),
                          s.showHeadlines[f] || s.configFinal.sorts[f] ? (d(), p("td", {
                            key: 1,
                            class: P([s.configFinal.columnClasses[f], "generated-cell-element sticky-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline"]),
                            onClick: $((b) => s.setSortColumn(f), ["stop"])
                          }, [
                            s.showHeadlines[f] ? (d(), p("strong", {
                              key: 0,
                              innerHTML: s.configFinal.headlines[f]
                            }, null, 8, Ur)) : (d(), p("span", Nr, t[24] || (t[24] = [
                              k("wbr", null, null, -1)
                            ]))),
                            s.configFinal.sorts[f] && r.hoveredRow === o ? (d(), p("span", Vr, [
                              r.currentSortIndexes[f] ? m("", !0) : (d(), _(l, {
                                key: 0,
                                icon: "sort",
                                class: "text-primary"
                              })),
                              r.currentSortIndexes[f] && r.currentSortIndexes[f].asc ? (d(), _(l, {
                                key: 1,
                                icon: "sort-amount-down-alt",
                                class: "text-primary"
                              })) : m("", !0),
                              r.currentSortIndexes[f] && !r.currentSortIndexes[f].asc ? (d(), _(l, {
                                key: 2,
                                icon: "sort-amount-down",
                                class: "text-primary"
                              })) : m("", !0),
                              r.currentSortIndexes[f] ? (d(), p("span", {
                                key: 3,
                                class: "ms-1 text-muted",
                                onClick: $((b) => s.removeSort(f), ["stop", "prevent"])
                              }, [
                                s.numberOfSorts > 1 ? (d(), p("span", Dr, T(r.currentSortIndexes[f].order + 1), 1)) : (d(), p("small", Mr, [
                                  L(l, { icon: "times" })
                                ]))
                              ], 8, Br)) : m("", !0)
                            ])) : m("", !0)
                          ], 10, Lr)) : m("", !0),
                          I((d(), p("td", {
                            colspan: !s.showHeadlines[f] && !s.configFinal.sorts[f] ? 2 : 1,
                            class: P([
                              s.configFinal.columnClasses[f] + " " + s.cellClassesParsed[o][f],
                              "generated-cell-element generated-cell-element-content sticky-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content"
                            ]),
                            onClick: (b) => s.onCellClick(b, a)
                          }, [
                            O(e.$slots, "sticky-cell-complete", { cell: a }, () => [
                              O(e.$slots, "sticky-cell-content", { cell: a }, () => [
                                s.configFinal.columns[f].cellFormatter && s.cellFormatters(f, a).type === "html" ? (d(), p("div", {
                                  key: 0,
                                  class: P(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html"]),
                                  innerHTML: s.cellFormatters(f, a).value
                                }, null, 8, Ir)) : s.configFinal.columns[f].cellFormatter ? (d(), p("div", {
                                  key: 1,
                                  class: P(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value"])
                                }, T(s.cellFormatters(f, a).value), 1)) : s.valueToString(a.html) ? (d(), p("div", {
                                  key: 2,
                                  class: P(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html"]),
                                  innerHTML: a.html
                                }, null, 8, Gr)) : a.component ? (d(), p("div", {
                                  key: 3,
                                  class: P(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component"])
                                }, [
                                  (d(), _(Le(a.component.name), Ue({ ref_for: !0 }, a.component.props, { onAction: s.handleComponentEvent }), null, 16, ["onAction"]))
                                ])) : s.valueToString(a.text) ? (d(), p("div", {
                                  key: 4,
                                  class: P(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text"])
                                }, T(a.text), 1)) : m("", !0)
                              ], !0)
                            ], !0)
                          ], 10, Hr)), [
                            [u, {
                              placement: "top",
                              content: a.tooltip,
                              trigger: a.tooltip ? "hover" : "manual"
                            }]
                          ])
                        ], 8, Er))), 128))
                      ])
                    ])
                  ], 2)
                ], 8, ur)
              ], 42, cr)) : m("", !0)
            ], 64)) : m("", !0)
          ], 64))), 128))
        ], 32)
      ], 2)),
      s.noRows && !s.ajaxLoading ? (d(), p("div", zr, [
        O(e.$slots, "no-results", {}, () => [
          k("div", Jr, [
            k("em", {
              innerHTML: s.configFinal.emptyPlaceholder
            }, null, 8, Kr)
          ])
        ], !0),
        t[25] || (t[25] = k("hr", null, null, -1))
      ])) : m("", !0)
    ], 512),
    s.ajaxLoading ? (d(), p("div", Wr, [
      O(e.$slots, "loading", {}, () => [
        k("div", {
          class: "loader-wrapper quintable--loading--loader-wrapper",
          style: pt("height:" + r.loaderHeight + "px;")
        }, [
          k("div", Qr, [
            L(l, {
              icon: "circle-notch",
              spin: "",
              class: "ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader"
            })
          ])
        ], 4)
      ], !0)
    ])) : m("", !0),
    k("div", Xr, [
      k("div", Zr, [
        k("div", Yr, [
          s.configFinal.multiSortSelect || s.configFinal.pageSortSelect ? (d(), p("div", {
            key: 0,
            class: P(
              `pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select flex-inline ${s.configFinal.pageSort ? "me-3" : ""}`.trim()
            )
          }, [
            s.configFinal.multiSortSelect ? (d(), _(c, {
              key: 0,
              modelValue: s.multiSort,
              "onUpdate:modelValue": t[12] || (t[12] = (o) => s.multiSort = o),
              class: "p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select",
              value: "true"
            }, {
              default: Z(() => [
                mt(T(s.configFinal.multiSortPlaceholder), 1)
              ]),
              _: 1
            }, 8, ["modelValue"])) : m("", !0),
            s.configFinal.pageSortSelect ? (d(), _(c, {
              key: 1,
              modelValue: s.pageSort,
              "onUpdate:modelValue": t[13] || (t[13] = (o) => s.pageSort = o),
              class: "p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select",
              value: "true"
            }, {
              default: Z(() => [
                mt(T(s.configFinal.pageSortPlaceholder), 1)
              ]),
              _: 1
            }, 8, ["modelValue"])) : m("", !0)
          ], 2)) : m("", !0)
        ]),
        k("div", $r, [
          s.configFinal && s.configFinal.pagination ? (d(), p("div", el, [
            s.configFinal.rowsSelect ? (d(), p("div", tl, [
              k("span", {
                class: "d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder",
                innerHTML: s.configFinal.rowsPlaceholder
              }, null, 8, sl),
              L(g, {
                modelValue: s.currentRowsPerPageProperty,
                "onUpdate:modelValue": t[14] || (t[14] = (o) => s.currentRowsPerPageProperty = o),
                class: "d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select",
                options: s.paginationOptionsFilled,
                clearable: !1
              }, null, 8, ["modelValue", "options"])
            ])) : m("", !0),
            s.configFinal && s.configFinal.pagination && s.pages > 1 ? (d(), p("nav", {
              key: 1,
              class: P(["d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav", { "me-3": s.numberOfVisibleRows, disabled: s.ajaxLoading }])
            }, [
              k("ul", il, [
                s.pages > s.pageRange ? (d(), p("li", {
                  key: 0,
                  class: P(["page-item", { disabled: r.currentPage <= 1 }]),
                  onClick: t[15] || (t[15] = (o) => s.gotoPage("first"))
                }, [
                  k("span", nl, [
                    L(l, { icon: "angle-double-left" })
                  ])
                ], 2)) : m("", !0),
                k("li", {
                  class: P(["page-item", { disabled: r.currentPage <= 1 }]),
                  onClick: t[16] || (t[16] = (o) => s.gotoPage("prev"))
                }, [
                  k("span", rl, [
                    L(l, { icon: "angle-left" })
                  ])
                ], 2),
                s.pageRange < s.pages && s.visiblePages[0] > 1 ? (d(), p("li", {
                  key: 1,
                  class: "page-item",
                  onClick: t[17] || (t[17] = (o) => s.updatePageOffset(-1))
                }, t[26] || (t[26] = [
                  k("span", { class: "page-link" }, " ... ", -1)
                ]))) : m("", !0),
                (d(!0), p(j, null, Y(s.visiblePages, (o) => (d(), p("li", {
                  key: "pagination-item-" + o,
                  class: P(["page-item", { active: o === r.currentPage }]),
                  onClick: (a) => s.gotoPage(o)
                }, [
                  k("span", ol, T(o), 1)
                ], 10, ll))), 128)),
                s.pageRange < s.pages && s.visiblePages[s.visiblePages.length - 1] < s.pages ? (d(), p("li", {
                  key: 2,
                  class: "page-item",
                  onClick: t[18] || (t[18] = (o) => s.updatePageOffset(1))
                }, t[27] || (t[27] = [
                  k("span", { class: "page-link" }, " ... ", -1)
                ]))) : m("", !0),
                k("li", {
                  class: P(["page-item", { disabled: s.pages === r.currentPage }]),
                  onClick: t[19] || (t[19] = (o) => s.gotoPage("next"))
                }, [
                  k("span", al, [
                    L(l, { icon: "angle-right" })
                  ])
                ], 2),
                s.pages > s.pageRange ? (d(), p("li", {
                  key: 3,
                  class: P(["page-item", { disabled: s.pages === r.currentPage }]),
                  onClick: t[20] || (t[20] = (o) => s.gotoPage("last"))
                }, [
                  k("span", cl, [
                    L(l, { icon: "angle-double-right" })
                  ])
                ], 2)) : m("", !0)
              ])
            ], 2)) : m("", !0),
            s.numberOfVisibleRows ? (d(), p("span", ul, T(s.firstVisibleRow) + "-" + T(s.lastVisibleRow) + " " + T(s.configFinal.numberOfVisibleRowsFillerWord) + " " + T(s.numberOfVisibleRows), 1)) : m("", !0)
          ])) : m("", !0)
        ])
      ])
    ]),
    k("div", hl, [
      O(e.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const fl = /* @__PURE__ */ Je(Rn, [["render", dl], ["__scopeId", "data-v-e403edb3"]]), Ml = (e, t = {}) => {
  e.component("VueQuintable", fl), Ls(e), Gs(e), zs(e), e.use(At, {
    // You can tweak defaults here; example sets a custom distance.
    distance: 6
    // If you want a custom theme class, add CSS and set theme on each use.
    // See floating-vue docs for options.
  }), t.axios && (e.config.globalProperties || (e.config.globalProperties = {}), e.config.globalProperties.$globalVueQuintableaxios = t.axios);
};
export {
  fl as VueQuintable,
  Ml as default
};
//# sourceMappingURL=vue-quintable.es.js.map
