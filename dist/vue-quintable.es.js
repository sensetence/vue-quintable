var Xi = Object.defineProperty, Yi = Object.defineProperties;
var Zi = Object.getOwnPropertyDescriptors;
var it = Object.getOwnPropertySymbols;
var wn = Object.prototype.hasOwnProperty, yn = Object.prototype.propertyIsEnumerable;
var Ae = (e, t) => (t = Symbol[e]) ? t : Symbol.for("Symbol." + e), es = (e) => {
  throw TypeError(e);
};
var mn = (e, t, n) => t in e ? Xi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, E = (e, t) => {
  for (var n in t || (t = {}))
    wn.call(t, n) && mn(e, n, t[n]);
  if (it)
    for (var n of it(t))
      yn.call(t, n) && mn(e, n, t[n]);
  return e;
}, X = (e, t) => Yi(e, Zi(t));
var Be = (e, t) => {
  var n = {};
  for (var i in e)
    wn.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
  if (e != null && it)
    for (var i of it(e))
      t.indexOf(i) < 0 && yn.call(e, i) && (n[i] = e[i]);
  return n;
};
var L = (e, t, n) => new Promise((i, o) => {
  var s = (d) => {
    try {
      a(n.next(d));
    } catch (u) {
      o(u);
    }
  }, r = (d) => {
    try {
      a(n.throw(d));
    } catch (u) {
      o(u);
    }
  }, a = (d) => d.done ? i(d.value) : Promise.resolve(d.value).then(s, r);
  a((n = n.apply(e, t)).next());
}), Fe = function(e, t) {
  this[0] = e, this[1] = t;
}, Dt = (e, t, n) => {
  var i = (r, a, d, u) => {
    try {
      var l = n[r](a), c = (a = l.value) instanceof Fe, h = l.done;
      Promise.resolve(c ? a[0] : a).then((g) => c ? i(r === "return" ? r : "next", a[1] ? { done: g.done, value: g.value } : g, d, u) : d({ value: g, done: h })).catch((g) => i("throw", g, d, u));
    } catch (g) {
      u(g);
    }
  }, o = (r) => s[r] = (a) => new Promise((d, u) => i(r, a, d, u)), s = {};
  return n = n.apply(e, t), s[Ae("asyncIterator")] = () => s, o("next"), o("throw"), o("return"), s;
}, Mt = (e) => {
  var t = e[Ae("asyncIterator")], n = !1, i, o = {};
  return t == null ? (t = e[Ae("iterator")](), i = (s) => o[s] = (r) => t[s](r)) : (t = t.call(e), i = (s) => o[s] = (r) => {
    if (n) {
      if (n = !1, s === "throw") throw r;
      return r;
    }
    return n = !0, {
      done: !1,
      value: new Fe(new Promise((a) => {
        var d = t[s](r);
        d instanceof Object || es("Object expected"), a(d);
      }), 1)
    };
  }), o[Ae("iterator")] = () => o, i("next"), "throw" in t ? i("throw") : o.throw = (s) => {
    throw s;
  }, "return" in t && i("return"), o;
}, bn = (e, t, n) => (t = e[Ae("asyncIterator")]) ? t.call(e) : (e = e[Ae("iterator")](), t = {}, n = (i, o) => (o = e[i]) && (t[i] = (s) => new Promise((r, a, d) => (s = o.call(e, s), d = s.done, Promise.resolve(s.value).then((u) => r({ value: u, done: d }), a)))), n("next"), n("return"), t);
import ts from "vue-select";
import { library as ns } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as is } from "@fortawesome/vue-fontawesome";
import { defineComponent as yt, pushScopeId as ss, popScopeId as os, nextTick as rs, createElementBlock as b, openBlock as p, normalizeClass as O, renderSlot as z, normalizeProps as ls, guardReactiveProps as as, resolveComponent as be, createBlock as A, mergeProps as Ue, withCtx as de, createVNode as I, ref as Gt, createApp as cs, h as us, toDisplayString as V, withScopeId as ds, withKeys as hs, normalizeStyle as ze, createElementVNode as F, createCommentVNode as R, Fragment as W, resolveDirective as fs, withDirectives as ge, vModelText as ps, vModelCheckbox as st, renderList as Ee, withModifiers as Le, resolveDynamicComponent as Bt, createTextVNode as Sn } from "vue";
import { faAngleDoubleLeft as gs, faAngleDoubleRight as ms, faAngleLeft as ws, faAngleRight as ys, faCaretDown as bs, faCaretUp as Ss, faCheck as vs, faChevronDown as xs, faChevronUp as Rs, faCircleNotch as Fs, faEye as ks, faEyeSlash as _s, faMinus as Cs, faPlus as Ps, faSort as Ts, faSortAmountDown as Os, faSortAmountDownAlt as As, faSquare as Es, faTimes as Ls } from "@fortawesome/free-solid-svg-icons";
import vn from "fuzzy.js";
import { v4 as Ns } from "uuid";
const qs = ["top", "right", "bottom", "left"], xn = ["start", "end"], Rn = /* @__PURE__ */ qs.reduce((e, t) => e.concat(t, t + "-" + xn[0], t + "-" + xn[1]), []), We = Math.min, _e = Math.max, js = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ds = {
  start: "end",
  end: "start"
};
function Wt(e, t, n) {
  return _e(e, We(t, n));
}
function Oe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function pe(e) {
  return e.split("-")[0];
}
function oe(e) {
  return e.split("-")[1];
}
function ti(e) {
  return e === "x" ? "y" : "x";
}
function on(e) {
  return e === "y" ? "height" : "width";
}
function Se(e) {
  return ["top", "bottom"].includes(pe(e)) ? "y" : "x";
}
function rn(e) {
  return ti(Se(e));
}
function ni(e, t, n) {
  n === void 0 && (n = !1);
  const i = oe(e), o = rn(e), s = on(o);
  let r = o === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (r = ht(r)), [r, ht(r)];
}
function Ms(e) {
  const t = ht(e);
  return [dt(e), t, dt(t)];
}
function dt(e) {
  return e.replace(/start|end/g, (t) => Ds[t]);
}
function Bs(e, t, n) {
  const i = ["left", "right"], o = ["right", "left"], s = ["top", "bottom"], r = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : i : t ? i : o;
    case "left":
    case "right":
      return t ? s : r;
    default:
      return [];
  }
}
function Hs(e, t, n, i) {
  const o = oe(e);
  let s = Bs(pe(e), n === "start", i);
  return o && (s = s.map((r) => r + "-" + o), t && (s = s.concat(s.map(dt)))), s;
}
function ht(e) {
  return e.replace(/left|right|bottom|top/g, (t) => js[t]);
}
function Us(e) {
  return E({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, e);
}
function ii(e) {
  return typeof e != "number" ? Us(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Ve(e) {
  const {
    x: t,
    y: n,
    width: i,
    height: o
  } = e;
  return {
    width: i,
    height: o,
    top: n,
    left: t,
    right: t + i,
    bottom: n + o,
    x: t,
    y: n
  };
}
function Fn(e, t, n) {
  let {
    reference: i,
    floating: o
  } = e;
  const s = Se(t), r = rn(t), a = on(r), d = pe(t), u = s === "y", l = i.x + i.width / 2 - o.width / 2, c = i.y + i.height / 2 - o.height / 2, h = i[a] / 2 - o[a] / 2;
  let g;
  switch (d) {
    case "top":
      g = {
        x: l,
        y: i.y - o.height
      };
      break;
    case "bottom":
      g = {
        x: l,
        y: i.y + i.height
      };
      break;
    case "right":
      g = {
        x: i.x + i.width,
        y: c
      };
      break;
    case "left":
      g = {
        x: i.x - o.width,
        y: c
      };
      break;
    default:
      g = {
        x: i.x,
        y: i.y
      };
  }
  switch (oe(t)) {
    case "start":
      g[r] -= h * (n && u ? -1 : 1);
      break;
    case "end":
      g[r] += h * (n && u ? -1 : 1);
      break;
  }
  return g;
}
const zs = (e, t, n) => L(null, null, function* () {
  const {
    placement: i = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: r
  } = n, a = s.filter(Boolean), d = yield r.isRTL == null ? void 0 : r.isRTL(t);
  let u = yield r.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: l,
    y: c
  } = Fn(u, i, d), h = i, g = {}, m = 0;
  for (let w = 0; w < a.length; w++) {
    const {
      name: y,
      fn: v
    } = a[w], {
      x: S,
      y: x,
      data: P,
      reset: _
    } = yield v({
      x: l,
      y: c,
      initialPlacement: i,
      placement: h,
      strategy: o,
      middlewareData: g,
      rects: u,
      platform: r,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = S != null ? S : l, c = x != null ? x : c, g = X(E({}, g), {
      [y]: E(E({}, g[y]), P)
    }), _ && m <= 50 && (m++, typeof _ == "object" && (_.placement && (h = _.placement), _.rects && (u = _.rects === !0 ? yield r.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : _.rects), {
      x: l,
      y: c
    } = Fn(u, h, d)), w = -1);
  }
  return {
    x: l,
    y: c,
    placement: h,
    strategy: o,
    middlewareData: g
  };
});
function bt(e, t) {
  return L(this, null, function* () {
    var n;
    t === void 0 && (t = {});
    const {
      x: i,
      y: o,
      platform: s,
      rects: r,
      elements: a,
      strategy: d
    } = e, {
      boundary: u = "clippingAncestors",
      rootBoundary: l = "viewport",
      elementContext: c = "floating",
      altBoundary: h = !1,
      padding: g = 0
    } = Oe(t, e), m = ii(g), y = a[h ? c === "floating" ? "reference" : "floating" : c], v = Ve(yield s.getClippingRect({
      element: (n = yield s.isElement == null ? void 0 : s.isElement(y)) == null || n ? y : y.contextElement || (yield s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
      boundary: u,
      rootBoundary: l,
      strategy: d
    })), S = c === "floating" ? {
      x: i,
      y: o,
      width: r.floating.width,
      height: r.floating.height
    } : r.reference, x = yield s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating), P = (yield s.isElement == null ? void 0 : s.isElement(x)) ? (yield s.getScale == null ? void 0 : s.getScale(x)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    }, _ = Ve(s.convertOffsetParentRelativeRectToViewportRelativeRect ? yield s.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements: a,
      rect: S,
      offsetParent: x,
      strategy: d
    }) : S);
    return {
      top: (v.top - _.top + m.top) / P.y,
      bottom: (_.bottom - v.bottom + m.bottom) / P.y,
      left: (v.left - _.left + m.left) / P.x,
      right: (_.right - v.right + m.right) / P.x
    };
  });
}
const Vs = (e) => ({
  name: "arrow",
  options: e,
  fn(n) {
    return L(this, null, function* () {
      const {
        x: i,
        y: o,
        placement: s,
        rects: r,
        platform: a,
        elements: d,
        middlewareData: u
      } = n, {
        element: l,
        padding: c = 0
      } = Oe(e, n) || {};
      if (l == null)
        return {};
      const h = ii(c), g = {
        x: i,
        y: o
      }, m = rn(s), w = on(m), y = yield a.getDimensions(l), v = m === "y", S = v ? "top" : "left", x = v ? "bottom" : "right", P = v ? "clientHeight" : "clientWidth", _ = r.reference[w] + r.reference[m] - g[m] - r.floating[w], N = g[m] - r.reference[m], q = yield a.getOffsetParent == null ? void 0 : a.getOffsetParent(l);
      let j = q ? q[P] : 0;
      (!j || !(yield a.isElement == null ? void 0 : a.isElement(q))) && (j = d.floating[P] || r.floating[w]);
      const $ = _ / 2 - N / 2, G = j / 2 - y[w] / 2 - 1, U = We(h[S], G), D = We(h[x], G), H = U, K = j - y[w] - D, B = j / 2 - y[w] / 2 + $, ae = Wt(H, B, K), Q = !u.arrow && oe(s) != null && B !== ae && r.reference[w] / 2 - (B < H ? U : D) - y[w] / 2 < 0, ce = Q ? B < H ? B - H : B - K : 0;
      return {
        [m]: g[m] + ce,
        data: E({
          [m]: ae,
          centerOffset: B - ae - ce
        }, Q && {
          alignmentOffset: ce
        }),
        reset: Q
      };
    });
  }
});
function Is(e, t, n) {
  return (e ? [...n.filter((o) => oe(o) === e), ...n.filter((o) => oe(o) !== e)] : n.filter((o) => pe(o) === o)).filter((o) => e ? oe(o) === e || (t ? dt(o) !== o : !1) : !0);
}
const $s = function(e) {
  return e === void 0 && (e = {}), {
    name: "autoPlacement",
    options: e,
    fn(n) {
      return L(this, null, function* () {
        var i, o, s;
        const {
          rects: r,
          middlewareData: a,
          placement: d,
          platform: u,
          elements: l
        } = n, U = Oe(e, n), {
          crossAxis: c = !1,
          alignment: h,
          allowedPlacements: g = Rn,
          autoAlignment: m = !0
        } = U, w = Be(U, [
          "crossAxis",
          "alignment",
          "allowedPlacements",
          "autoAlignment"
        ]), y = h !== void 0 || g === Rn ? Is(h || null, m, g) : g, v = yield bt(n, w), S = ((i = a.autoPlacement) == null ? void 0 : i.index) || 0, x = y[S];
        if (x == null)
          return {};
        const P = ni(x, r, yield u.isRTL == null ? void 0 : u.isRTL(l.floating));
        if (d !== x)
          return {
            reset: {
              placement: y[0]
            }
          };
        const _ = [v[pe(x)], v[P[0]], v[P[1]]], N = [...((o = a.autoPlacement) == null ? void 0 : o.overflows) || [], {
          placement: x,
          overflows: _
        }], q = y[S + 1];
        if (q)
          return {
            data: {
              index: S + 1,
              overflows: N
            },
            reset: {
              placement: q
            }
          };
        const j = N.map((D) => {
          const H = oe(D.placement);
          return [D.placement, H && c ? (
            // Check along the mainAxis and main crossAxis side.
            D.overflows.slice(0, 2).reduce((K, B) => K + B, 0)
          ) : (
            // Check only the mainAxis.
            D.overflows[0]
          ), D.overflows];
        }).sort((D, H) => D[1] - H[1]), G = ((s = j.filter((D) => D[2].slice(
          0,
          // Aligned placements should not check their opposite crossAxis
          // side.
          oe(D[0]) ? 2 : 3
        ).every((H) => H <= 0))[0]) == null ? void 0 : s[0]) || j[0][0];
        return G !== d ? {
          data: {
            index: S + 1,
            overflows: N
          },
          reset: {
            placement: G
          }
        } : {};
      });
    }
  };
}, Gs = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    fn(n) {
      return L(this, null, function* () {
        var i, o;
        const {
          placement: s,
          middlewareData: r,
          rects: a,
          initialPlacement: d,
          platform: u,
          elements: l
        } = n, ae = Oe(e, n), {
          mainAxis: c = !0,
          crossAxis: h = !0,
          fallbackPlacements: g,
          fallbackStrategy: m = "bestFit",
          fallbackAxisSideDirection: w = "none",
          flipAlignment: y = !0
        } = ae, v = Be(ae, [
          "mainAxis",
          "crossAxis",
          "fallbackPlacements",
          "fallbackStrategy",
          "fallbackAxisSideDirection",
          "flipAlignment"
        ]);
        if ((i = r.arrow) != null && i.alignmentOffset)
          return {};
        const S = pe(s), x = Se(d), P = pe(d) === d, _ = yield u.isRTL == null ? void 0 : u.isRTL(l.floating), N = g || (P || !y ? [ht(d)] : Ms(d)), q = w !== "none";
        !g && q && N.push(...Hs(d, y, w, _));
        const j = [d, ...N], $ = yield bt(n, v), G = [];
        let U = ((o = r.flip) == null ? void 0 : o.overflows) || [];
        if (c && G.push($[S]), h) {
          const Q = ni(s, a, _);
          G.push($[Q[0]], $[Q[1]]);
        }
        if (U = [...U, {
          placement: s,
          overflows: G
        }], !G.every((Q) => Q <= 0)) {
          var D, H;
          const Q = (((D = r.flip) == null ? void 0 : D.index) || 0) + 1, ce = j[Q];
          if (ce) {
            var K;
            const ne = h === "alignment" ? x !== Se(ce) : !1, ee = ((K = U[0]) == null ? void 0 : K.overflows[0]) > 0;
            if (!ne || ee)
              return {
                data: {
                  index: Q,
                  overflows: U
                },
                reset: {
                  placement: ce
                }
              };
          }
          let me = (H = U.filter((ne) => ne.overflows[0] <= 0).sort((ne, ee) => ne.overflows[1] - ee.overflows[1])[0]) == null ? void 0 : H.placement;
          if (!me)
            switch (m) {
              case "bestFit": {
                var B;
                const ne = (B = U.filter((ee) => {
                  if (q) {
                    const ie = Se(ee.placement);
                    return ie === x || // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    ie === "y";
                  }
                  return !0;
                }).map((ee) => [ee.placement, ee.overflows.filter((ie) => ie > 0).reduce((ie, tt) => ie + tt, 0)]).sort((ee, ie) => ee[1] - ie[1])[0]) == null ? void 0 : B[0];
                ne && (me = ne);
                break;
              }
              case "initialPlacement":
                me = d;
                break;
            }
          if (s !== me)
            return {
              reset: {
                placement: me
              }
            };
        }
        return {};
      });
    }
  };
};
function Ws(e, t) {
  return L(this, null, function* () {
    const {
      placement: n,
      platform: i,
      elements: o
    } = e, s = yield i.isRTL == null ? void 0 : i.isRTL(o.floating), r = pe(n), a = oe(n), d = Se(n) === "y", u = ["left", "top"].includes(r) ? -1 : 1, l = s && d ? -1 : 1, c = Oe(t, e);
    let {
      mainAxis: h,
      crossAxis: g,
      alignmentAxis: m
    } = typeof c == "number" ? {
      mainAxis: c,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: c.mainAxis || 0,
      crossAxis: c.crossAxis || 0,
      alignmentAxis: c.alignmentAxis
    };
    return a && typeof m == "number" && (g = a === "end" ? m * -1 : m), d ? {
      x: g * l,
      y: h * u
    } : {
      x: h * u,
      y: g * l
    };
  });
}
const Js = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    fn(n) {
      return L(this, null, function* () {
        var i, o;
        const {
          x: s,
          y: r,
          placement: a,
          middlewareData: d
        } = n, u = yield Ws(n, e);
        return a === ((i = d.offset) == null ? void 0 : i.placement) && (o = d.arrow) != null && o.alignmentOffset ? {} : {
          x: s + u.x,
          y: r + u.y,
          data: X(E({}, u), {
            placement: a
          })
        };
      });
    }
  };
}, Ks = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    fn(n) {
      return L(this, null, function* () {
        const {
          x: i,
          y: o,
          placement: s
        } = n, v = Oe(e, n), {
          mainAxis: r = !0,
          crossAxis: a = !1,
          limiter: d = {
            fn: (S) => {
              let {
                x,
                y: P
              } = S;
              return {
                x,
                y: P
              };
            }
          }
        } = v, u = Be(v, [
          "mainAxis",
          "crossAxis",
          "limiter"
        ]), l = {
          x: i,
          y: o
        }, c = yield bt(n, u), h = Se(pe(s)), g = ti(h);
        let m = l[g], w = l[h];
        if (r) {
          const S = g === "y" ? "top" : "left", x = g === "y" ? "bottom" : "right", P = m + c[S], _ = m - c[x];
          m = Wt(P, m, _);
        }
        if (a) {
          const S = h === "y" ? "top" : "left", x = h === "y" ? "bottom" : "right", P = w + c[S], _ = w - c[x];
          w = Wt(P, w, _);
        }
        const y = d.fn(X(E({}, n), {
          [g]: m,
          [h]: w
        }));
        return X(E({}, y), {
          data: {
            x: y.x - i,
            y: y.y - o,
            enabled: {
              [g]: r,
              [h]: a
            }
          }
        });
      });
    }
  };
}, Qs = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    fn(n) {
      return L(this, null, function* () {
        var i, o;
        const {
          placement: s,
          rects: r,
          platform: a,
          elements: d
        } = n, U = Oe(e, n), {
          apply: u = () => {
          }
        } = U, l = Be(U, [
          "apply"
        ]), c = yield bt(n, l), h = pe(s), g = oe(s), m = Se(s) === "y", {
          width: w,
          height: y
        } = r.floating;
        let v, S;
        h === "top" || h === "bottom" ? (v = h, S = g === ((yield a.isRTL == null ? void 0 : a.isRTL(d.floating)) ? "start" : "end") ? "left" : "right") : (S = h, v = g === "end" ? "top" : "bottom");
        const x = y - c.top - c.bottom, P = w - c.left - c.right, _ = We(y - c[v], x), N = We(w - c[S], P), q = !n.middlewareData.shift;
        let j = _, $ = N;
        if ((i = n.middlewareData.shift) != null && i.enabled.x && ($ = P), (o = n.middlewareData.shift) != null && o.enabled.y && (j = x), q && !g) {
          const D = _e(c.left, 0), H = _e(c.right, 0), K = _e(c.top, 0), B = _e(c.bottom, 0);
          m ? $ = w - 2 * (D !== 0 || H !== 0 ? D + H : _e(c.left, c.right)) : j = y - 2 * (K !== 0 || B !== 0 ? K + B : _e(c.top, c.bottom));
        }
        yield u(X(E({}, n), {
          availableWidth: $,
          availableHeight: j
        }));
        const G = yield a.getDimensions(d.floating);
        return w !== G.width || y !== G.height ? {
          reset: {
            rects: !0
          }
        } : {};
      });
    }
  };
};
function te(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function he(e) {
  return te(e).getComputedStyle(e);
}
const kn = Math.min, Ie = Math.max, ft = Math.round;
function si(e) {
  const t = he(e);
  let n = parseFloat(t.width), i = parseFloat(t.height);
  const o = e.offsetWidth, s = e.offsetHeight, r = ft(n) !== o || ft(i) !== s;
  return r && (n = o, i = s), { width: n, height: i, fallback: r };
}
function Re(e) {
  return ri(e) ? (e.nodeName || "").toLowerCase() : "";
}
let ot;
function oi() {
  if (ot) return ot;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (ot = e.brands.map(((t) => t.brand + "/" + t.version)).join(" "), ot) : navigator.userAgent;
}
function fe(e) {
  return e instanceof te(e).HTMLElement;
}
function ve(e) {
  return e instanceof te(e).Element;
}
function ri(e) {
  return e instanceof te(e).Node;
}
function _n(e) {
  return typeof ShadowRoot == "undefined" ? !1 : e instanceof te(e).ShadowRoot || e instanceof ShadowRoot;
}
function St(e) {
  const { overflow: t, overflowX: n, overflowY: i, display: o } = he(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + i + n) && !["inline", "contents"].includes(o);
}
function Xs(e) {
  return ["table", "td", "th"].includes(Re(e));
}
function Jt(e) {
  const t = /firefox/i.test(oi()), n = he(e), i = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!i && i !== "none" || t && n.willChange === "filter" || t && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some(((o) => n.willChange.includes(o))) || ["paint", "layout", "strict", "content"].some(((o) => {
    const s = n.contain;
    return s != null && s.includes(o);
  }));
}
function li() {
  return !/^((?!chrome|android).)*safari/i.test(oi());
}
function ln(e) {
  return ["html", "body", "#document"].includes(Re(e));
}
function ai(e) {
  return ve(e) ? e : e.contextElement;
}
const ci = { x: 1, y: 1 };
function Ne(e) {
  const t = ai(e);
  if (!fe(t)) return ci;
  const n = t.getBoundingClientRect(), { width: i, height: o, fallback: s } = si(t);
  let r = (s ? ft(n.width) : n.width) / i, a = (s ? ft(n.height) : n.height) / o;
  return r && Number.isFinite(r) || (r = 1), a && Number.isFinite(a) || (a = 1), { x: r, y: a };
}
function Je(e, t, n, i) {
  var o, s;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), a = ai(e);
  let d = ci;
  t && (i ? ve(i) && (d = Ne(i)) : d = Ne(e));
  const u = a ? te(a) : window, l = !li() && n;
  let c = (r.left + (l && ((o = u.visualViewport) == null ? void 0 : o.offsetLeft) || 0)) / d.x, h = (r.top + (l && ((s = u.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / d.y, g = r.width / d.x, m = r.height / d.y;
  if (a) {
    const w = te(a), y = i && ve(i) ? te(i) : i;
    let v = w.frameElement;
    for (; v && i && y !== w; ) {
      const S = Ne(v), x = v.getBoundingClientRect(), P = getComputedStyle(v);
      x.x += (v.clientLeft + parseFloat(P.paddingLeft)) * S.x, x.y += (v.clientTop + parseFloat(P.paddingTop)) * S.y, c *= S.x, h *= S.y, g *= S.x, m *= S.y, c += x.x, h += x.y, v = te(v).frameElement;
    }
  }
  return { width: g, height: m, top: h, right: c + g, bottom: h + m, left: c, x: c, y: h };
}
function xe(e) {
  return ((ri(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function vt(e) {
  return ve(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function ui(e) {
  return Je(xe(e)).left + vt(e).scrollLeft;
}
function Ke(e) {
  if (Re(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || _n(e) && e.host || xe(e);
  return _n(t) ? t.host : t;
}
function di(e) {
  const t = Ke(e);
  return ln(t) ? t.ownerDocument.body : fe(t) && St(t) ? t : di(t);
}
function pt(e, t) {
  var n;
  t === void 0 && (t = []);
  const i = di(e), o = i === ((n = e.ownerDocument) == null ? void 0 : n.body), s = te(i);
  return o ? t.concat(s, s.visualViewport || [], St(i) ? i : []) : t.concat(i, pt(i));
}
function Cn(e, t, n) {
  return t === "viewport" ? Ve((function(i, o) {
    const s = te(i), r = xe(i), a = s.visualViewport;
    let d = r.clientWidth, u = r.clientHeight, l = 0, c = 0;
    if (a) {
      d = a.width, u = a.height;
      const h = li();
      (h || !h && o === "fixed") && (l = a.offsetLeft, c = a.offsetTop);
    }
    return { width: d, height: u, x: l, y: c };
  })(e, n)) : ve(t) ? Ve((function(i, o) {
    const s = Je(i, !0, o === "fixed"), r = s.top + i.clientTop, a = s.left + i.clientLeft, d = fe(i) ? Ne(i) : { x: 1, y: 1 };
    return { width: i.clientWidth * d.x, height: i.clientHeight * d.y, x: a * d.x, y: r * d.y };
  })(t, n)) : Ve((function(i) {
    const o = xe(i), s = vt(i), r = i.ownerDocument.body, a = Ie(o.scrollWidth, o.clientWidth, r.scrollWidth, r.clientWidth), d = Ie(o.scrollHeight, o.clientHeight, r.scrollHeight, r.clientHeight);
    let u = -s.scrollLeft + ui(i);
    const l = -s.scrollTop;
    return he(r).direction === "rtl" && (u += Ie(o.clientWidth, r.clientWidth) - a), { width: a, height: d, x: u, y: l };
  })(xe(e)));
}
function Pn(e) {
  return fe(e) && he(e).position !== "fixed" ? e.offsetParent : null;
}
function Tn(e) {
  const t = te(e);
  let n = Pn(e);
  for (; n && Xs(n) && he(n).position === "static"; ) n = Pn(n);
  return n && (Re(n) === "html" || Re(n) === "body" && he(n).position === "static" && !Jt(n)) ? t : n || (function(i) {
    let o = Ke(i);
    for (; fe(o) && !ln(o); ) {
      if (Jt(o)) return o;
      o = Ke(o);
    }
    return null;
  })(e) || t;
}
function Ys(e, t, n) {
  const i = fe(t), o = xe(t), s = Je(e, !0, n === "fixed", t);
  let r = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (i || !i && n !== "fixed") if ((Re(t) !== "body" || St(o)) && (r = vt(t)), fe(t)) {
    const d = Je(t, !0);
    a.x = d.x + t.clientLeft, a.y = d.y + t.clientTop;
  } else o && (a.x = ui(o));
  return { x: s.left + r.scrollLeft - a.x, y: s.top + r.scrollTop - a.y, width: s.width, height: s.height };
}
const Zs = { getClippingRect: function(e) {
  let { element: t, boundary: n, rootBoundary: i, strategy: o } = e;
  const s = n === "clippingAncestors" ? (function(u, l) {
    const c = l.get(u);
    if (c) return c;
    let h = pt(u).filter(((y) => ve(y) && Re(y) !== "body")), g = null;
    const m = he(u).position === "fixed";
    let w = m ? Ke(u) : u;
    for (; ve(w) && !ln(w); ) {
      const y = he(w), v = Jt(w);
      (m ? v || g : v || y.position !== "static" || !g || !["absolute", "fixed"].includes(g.position)) ? g = y : h = h.filter(((S) => S !== w)), w = Ke(w);
    }
    return l.set(u, h), h;
  })(t, this._c) : [].concat(n), r = [...s, i], a = r[0], d = r.reduce(((u, l) => {
    const c = Cn(t, l, o);
    return u.top = Ie(c.top, u.top), u.right = kn(c.right, u.right), u.bottom = kn(c.bottom, u.bottom), u.left = Ie(c.left, u.left), u;
  }), Cn(t, a, o));
  return { width: d.right - d.left, height: d.bottom - d.top, x: d.left, y: d.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: n, strategy: i } = e;
  const o = fe(n), s = xe(n);
  if (n === s) return t;
  let r = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const d = { x: 0, y: 0 };
  if ((o || !o && i !== "fixed") && ((Re(n) !== "body" || St(s)) && (r = vt(n)), fe(n))) {
    const u = Je(n);
    a = Ne(n), d.x = u.x + n.clientLeft, d.y = u.y + n.clientTop;
  }
  return { width: t.width * a.x, height: t.height * a.y, x: t.x * a.x - r.scrollLeft * a.x + d.x, y: t.y * a.y - r.scrollTop * a.y + d.y };
}, isElement: ve, getDimensions: function(e) {
  return fe(e) ? si(e) : e.getBoundingClientRect();
}, getOffsetParent: Tn, getDocumentElement: xe, getScale: Ne, getElementRects(e) {
  return L(this, null, function* () {
    let { reference: t, floating: n, strategy: i } = e;
    const o = this.getOffsetParent || Tn, s = this.getDimensions;
    return { reference: Ys(t, yield o(n), i), floating: E({ x: 0, y: 0 }, yield s(n)) };
  });
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => he(e).direction === "rtl" }, eo = (e, t, n) => {
  const i = /* @__PURE__ */ new Map(), o = E({ platform: Zs }, n), s = X(E({}, o.platform), { _c: i });
  return zs(e, t, X(E({}, o), { platform: s }));
};
function hi(e, t) {
  for (const n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (typeof t[n] == "object" && e[n] ? hi(e[n], t[n]) : e[n] = t[n]);
}
const re = {
  // Disable popper components
  disabled: !1,
  // Default position offset along main axis (px)
  distance: 5,
  // Default position offset along cross axis (px)
  skidding: 0,
  // Default container where the tooltip will be appended
  container: "body",
  // Element used to compute position and size boundaries
  boundary: void 0,
  // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
  instantMove: !1,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 150,
  // Triggers on the popper itself
  popperTriggers: [],
  // Positioning strategy
  strategy: "absolute",
  // Prevent overflow
  preventOverflow: !0,
  // Flip to the opposite placement if needed
  flip: !0,
  // Shift on the cross axis to prevent the popper from overflowing
  shift: !0,
  // Overflow padding (px)
  overflowPadding: 0,
  // Arrow padding (px)
  arrowPadding: 0,
  // Compute arrow overflow (useful to hide it)
  arrowOverflow: !0,
  /**
   * By default, compute autohide on 'click'.
   */
  autoHideOnMousedown: !1,
  // Themes
  themes: {
    tooltip: {
      // Default tooltip placement relative to target element
      placement: "top",
      // Default events that trigger the tooltip
      triggers: ["hover", "focus", "touch"],
      // Close tooltip on click on tooltip target
      hideTriggers: (e) => [...e, "click"],
      // Delay (ms)
      delay: {
        show: 200,
        hide: 0
      },
      // Update popper on content resize
      handleResize: !1,
      // Enable HTML content in directive
      html: !1,
      // Displayed when tooltip content is loading
      loadingContent: "..."
    },
    dropdown: {
      // Default dropdown placement relative to target element
      placement: "bottom",
      // Default events that trigger the dropdown
      triggers: ["click"],
      // Delay (ms)
      delay: 0,
      // Update popper on content resize
      handleResize: !0,
      // Hide on clock outside
      autoHide: !0
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function Qe(e, t) {
  let n = re.themes[e] || {}, i;
  do
    i = n[t], typeof i > "u" ? n.$extend ? n = re.themes[n.$extend] || {} : (n = null, i = re[t]) : n = null;
  while (n);
  return i;
}
function to(e) {
  const t = [e];
  let n = re.themes[e] || {};
  do
    n.$extend && !n.$resetCss ? (t.push(n.$extend), n = re.themes[n.$extend] || {}) : n = null;
  while (n);
  return t.map((i) => `v-popper--theme-${i}`);
}
function On(e) {
  const t = [e];
  let n = re.themes[e] || {};
  do
    n.$extend ? (t.push(n.$extend), n = re.themes[n.$extend] || {}) : n = null;
  while (n);
  return t;
}
let qe = !1;
if (typeof window < "u") {
  qe = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        qe = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch (e) {
  }
}
let fi = !1;
typeof window < "u" && typeof navigator < "u" && (fi = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const pi = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), An = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, En = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function Ln(e, t) {
  const n = e.indexOf(t);
  n !== -1 && e.splice(n, 1);
}
function Ht() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const se = [];
let ke = null;
const Nn = {};
function qn(e) {
  let t = Nn[e];
  return t || (t = Nn[e] = []), t;
}
let Kt = function() {
};
typeof window < "u" && (Kt = window.Element);
function T(e) {
  return function(t) {
    return Qe(t.theme, e);
  };
}
const Ut = "__floating-vue__popper", gi = () => yt({
  name: "VPopper",
  provide() {
    return {
      [Ut]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [Ut]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: !0
    },
    targetNodes: {
      type: Function,
      required: !0
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: !0
    },
    shown: {
      type: Boolean,
      default: !1
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: T("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: T("positioningDisabled")
    },
    placement: {
      type: String,
      default: T("placement"),
      validator: (n) => pi.includes(n)
    },
    delay: {
      type: [String, Number, Object],
      default: T("delay")
    },
    distance: {
      type: [Number, String],
      default: T("distance")
    },
    skidding: {
      type: [Number, String],
      default: T("skidding")
    },
    triggers: {
      type: Array,
      default: T("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: T("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: T("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: T("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: T("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: T("popperHideTriggers")
    },
    container: {
      type: [String, Object, Kt, Boolean],
      default: T("container")
    },
    boundary: {
      type: [String, Kt],
      default: T("boundary")
    },
    strategy: {
      type: String,
      validator: (n) => ["absolute", "fixed"].includes(n),
      default: T("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: T("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: T("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: T("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: T("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: T("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: T("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: T("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: T("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: T("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: T("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: T("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: T("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: T("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: T("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: T("flip")
    },
    shift: {
      type: Boolean,
      default: T("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: T("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: T("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: T("disposeTimeout")
    }
  },
  emits: {
    show: () => !0,
    hide: () => !0,
    "update:shown": (n) => !0,
    "apply-show": () => !0,
    "apply-hide": () => !0,
    "close-group": () => !0,
    "close-directive": () => !0,
    "auto-hide": () => !0,
    resize: () => !0
  },
  data() {
    return {
      isShown: !1,
      isMounted: !1,
      skipTransition: !1,
      classes: {
        showFrom: !1,
        showTo: !1,
        hideFrom: !1,
        hideTo: !0
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      randomId: `popper_${[Math.random(), Date.now()].map((n) => n.toString(36).substring(2, 10)).join("_")}`,
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: !0,
      pendingHide: !1,
      containsGlobalTarget: !1,
      isDisposed: !0,
      mouseDownContains: !1
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: X(E({}, this.classes), {
          popperClass: this.popperClass
        }),
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var n;
      return (n = this[Ut]) == null ? void 0 : n.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var n, i;
      return ((n = this.popperTriggers) == null ? void 0 : n.includes("hover")) || ((i = this.popperShowTriggers) == null ? void 0 : i.includes("hover"));
    }
  },
  watch: E({
    shown: "$_autoShowHide",
    disabled(n) {
      n ? this.dispose() : this.init();
    },
    container() {
      return L(this, null, function* () {
        this.isShown && (this.$_ensureTeleport(), yield this.$_computePosition());
      });
    },
    triggers: {
      handler: "$_refreshListeners",
      deep: !0
    },
    positioningDisabled: "$_refreshListeners"
  }, [
    "placement",
    "distance",
    "skidding",
    "boundary",
    "strategy",
    "overflowPadding",
    "arrowPadding",
    "preventOverflow",
    "shift",
    "shiftCrossAxis",
    "flip"
  ].reduce((n, i) => (n[i] = "$_computePosition", n), {})),
  created() {
    this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
  },
  mounted() {
    this.init(), this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event: n = null, skipDelay: i = !1, force: o = !1 } = {}) {
      var s, r;
      (s = this.parentPopper) != null && s.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = !1, (o || !this.disabled) && (((r = this.parentPopper) == null ? void 0 : r.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(n, i), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
        this.$_showFrameLocked = !1;
      })), this.$emit("update:shown", !0));
    },
    hide({ event: n = null, skipDelay: i = !1 } = {}) {
      var o;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.pendingHide = !0;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: i }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((o = this.parentPopper) == null ? void 0 : o.lockedChild) === this && (this.parentPopper.lockedChild = null), this.pendingHide = !1, this.$_scheduleHide(n, i), this.$emit("hide"), this.$emit("update:shown", !1);
      }
    },
    init() {
      var i;
      var n;
      this.isDisposed && (this.isDisposed = !1, this.isMounted = !1, this.$_events = [], this.$_preventShow = !1, this.$_referenceNode = (i = (n = this.referenceNode) == null ? void 0 : n.call(this)) != null ? i : this.$el, this.$_targetNodes = this.targetNodes().filter((o) => o.nodeType === o.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.isDisposed || (this.isDisposed = !0, this.$_removeEventListeners(), this.hide({ skipDelay: !0 }), this.$_detachPopperNode(), this.isMounted = !1, this.isShown = !1, this.$_updateParentShownChildren(!1), this.$_swapTargetAttrs("data-original-title", "title"));
    },
    onResize() {
      return L(this, null, function* () {
        this.isShown && (yield this.$_computePosition(), this.$emit("resize"));
      });
    },
    $_computePosition() {
      return L(this, null, function* () {
        var s;
        if (this.isDisposed || this.positioningDisabled)
          return;
        const n = {
          strategy: this.strategy,
          middleware: []
        };
        (this.distance || this.skidding) && n.middleware.push(Js({
          mainAxis: this.distance,
          crossAxis: this.skidding
        }));
        const i = this.placement.startsWith("auto");
        if (i ? n.middleware.push($s({
          alignment: (s = this.placement.split("-")[1]) != null ? s : ""
        })) : n.placement = this.placement, this.preventOverflow && (this.shift && n.middleware.push(Ks({
          padding: this.overflowPadding,
          boundary: this.boundary,
          crossAxis: this.shiftCrossAxis
        })), !i && this.flip && n.middleware.push(Gs({
          padding: this.overflowPadding,
          boundary: this.boundary
        }))), n.middleware.push(Vs({
          element: this.$_arrowNode,
          padding: this.arrowPadding
        })), this.arrowOverflow && n.middleware.push({
          name: "arrowOverflow",
          fn: ({ placement: r, rects: a, middlewareData: d }) => {
            let u;
            const { centerOffset: l } = d.arrow;
            return r.startsWith("top") || r.startsWith("bottom") ? u = Math.abs(l) > a.reference.width / 2 : u = Math.abs(l) > a.reference.height / 2, {
              data: {
                overflow: u
              }
            };
          }
        }), this.autoMinSize || this.autoSize) {
          const r = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
          n.middleware.push({
            name: "autoSize",
            fn: ({ rects: a, placement: d, middlewareData: u }) => {
              var l;
              if ((l = u.autoSize) != null && l.skip)
                return {};
              let c, h;
              return d.startsWith("top") || d.startsWith("bottom") ? c = a.reference.width : h = a.reference.height, this.$_innerNode.style[r === "min" ? "minWidth" : r === "max" ? "maxWidth" : "width"] = c != null ? `${c}px` : null, this.$_innerNode.style[r === "min" ? "minHeight" : r === "max" ? "maxHeight" : "height"] = h != null ? `${h}px` : null, {
                data: {
                  skip: !0
                },
                reset: {
                  rects: !0
                }
              };
            }
          });
        }
        (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, n.middleware.push(Qs({
          boundary: this.boundary,
          padding: this.overflowPadding,
          apply: ({ availableWidth: r, availableHeight: a }) => {
            this.$_innerNode.style.maxWidth = r != null ? `${r}px` : null, this.$_innerNode.style.maxHeight = a != null ? `${a}px` : null;
          }
        })));
        const o = yield eo(this.$_referenceNode, this.$_popperNode, n);
        Object.assign(this.result, {
          x: o.x,
          y: o.y,
          placement: o.placement,
          strategy: o.strategy,
          arrow: E(E({}, o.middlewareData.arrow), o.middlewareData.arrowOverflow)
        });
      });
    },
    $_scheduleShow(n, i = !1) {
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), ke && this.instantMove && ke.instantMove && ke !== this.parentPopper) {
        ke.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      i ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(n, i = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (ke = this), i ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(n) {
      const i = this.delay;
      return parseInt(i && i[n] || i || 0);
    },
    $_applyShow(n = !1) {
      return L(this, null, function* () {
        clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = n, !this.isShown && (this.$_ensureTeleport(), yield Ht(), yield this.$_computePosition(), yield this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
          ...pt(this.$_referenceNode),
          ...pt(this.$_popperNode)
        ], "scroll", () => {
          this.$_computePosition();
        }));
      });
    },
    $_applyShowEffect() {
      return L(this, null, function* () {
        if (this.$_hideInProgress)
          return;
        if (this.computeTransformOrigin) {
          const i = this.$_referenceNode.getBoundingClientRect(), o = this.$_popperNode.querySelector(".v-popper__wrapper"), s = o.parentNode.getBoundingClientRect(), r = i.x + i.width / 2 - (s.left + o.offsetLeft), a = i.y + i.height / 2 - (s.top + o.offsetTop);
          this.result.transformOrigin = `${r}px ${a}px`;
        }
        this.isShown = !0, this.$_applyAttrsToTarget({
          "aria-describedby": this.popperId,
          "data-popper-shown": ""
        });
        const n = this.showGroup;
        if (n) {
          let i;
          for (let o = 0; o < se.length; o++)
            i = se[o], i.showGroup !== n && (i.hide(), i.$emit("close-group"));
        }
        se.push(this), document.body.classList.add("v-popper--some-open");
        for (const i of On(this.theme))
          qn(i).push(this), document.body.classList.add(`v-popper--some-open--${i}`);
        this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, yield Ht(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
      });
    },
    $_applyHide(n = !1) {
      return L(this, null, function* () {
        if (this.shownChildren.size > 0) {
          this.pendingHide = !0, this.$_hideInProgress = !1;
          return;
        }
        if (clearTimeout(this.$_scheduleTimer), !this.isShown)
          return;
        this.skipTransition = n, Ln(se, this), se.length === 0 && document.body.classList.remove("v-popper--some-open");
        for (const o of On(this.theme)) {
          const s = qn(o);
          Ln(s, this), s.length === 0 && document.body.classList.remove(`v-popper--some-open--${o}`);
        }
        ke === this && (ke = null), this.isShown = !1, this.$_applyAttrsToTarget({
          "aria-describedby": void 0,
          "data-popper-shown": void 0
        }), clearTimeout(this.$_disposeTimer);
        const i = this.disposeTimeout;
        i !== null && (this.$_disposeTimer = setTimeout(() => {
          this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
        }, i)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, yield Ht(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
      });
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.isDisposed)
        return;
      let n = this.container;
      if (typeof n == "string" ? n = window.document.querySelector(n) : n === !1 && (n = this.$_targetNodes[0].parentNode), !n)
        throw new Error("No container for popover: " + this.container);
      n.appendChild(this.$_popperNode), this.isMounted = !0;
    },
    $_addEventListeners() {
      const n = (o) => {
        this.isShown && !this.$_hideInProgress || (o.usedByTooltip = !0, !this.$_preventShow && this.show({ event: o }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, An, this.triggers, this.showTriggers, n), this.$_registerTriggerListeners([this.$_popperNode], An, this.popperTriggers, this.popperShowTriggers, n);
      const i = (o) => {
        o.usedByTooltip || this.hide({ event: o });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, En, this.triggers, this.hideTriggers, i), this.$_registerTriggerListeners([this.$_popperNode], En, this.popperTriggers, this.popperHideTriggers, i);
    },
    $_registerEventListeners(n, i, o) {
      this.$_events.push({ targetNodes: n, eventType: i, handler: o }), n.forEach((s) => s.addEventListener(i, o, qe ? {
        passive: !0
      } : void 0));
    },
    $_registerTriggerListeners(n, i, o, s, r) {
      let a = o;
      s != null && (a = typeof s == "function" ? s(a) : s), a.forEach((d) => {
        const u = i[d];
        u && this.$_registerEventListeners(n, u, r);
      });
    },
    $_removeEventListeners(n) {
      const i = [];
      this.$_events.forEach((o) => {
        const { targetNodes: s, eventType: r, handler: a } = o;
        !n || n === r ? s.forEach((d) => d.removeEventListener(r, a)) : i.push(o);
      }), this.$_events = i;
    },
    $_refreshListeners() {
      this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(n, i = !1) {
      this.$_showFrameLocked || (this.hide({ event: n }), n.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), i && (this.$_preventShow = !0, setTimeout(() => {
        this.$_preventShow = !1;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(n, i) {
      for (const o of this.$_targetNodes) {
        const s = o.getAttribute(n);
        s && (o.removeAttribute(n), o.setAttribute(i, s));
      }
    },
    $_applyAttrsToTarget(n) {
      for (const i of this.$_targetNodes)
        for (const o in n) {
          const s = n[o];
          s == null ? i.removeAttribute(o) : i.setAttribute(o, s);
        }
    },
    $_updateParentShownChildren(n) {
      let i = this.parentPopper;
      for (; i; )
        n ? i.shownChildren.add(this.randomId) : (i.shownChildren.delete(this.randomId), i.pendingHide && i.hide()), i = i.parentPopper;
    },
    $_isAimingPopper() {
      const n = this.$_referenceNode.getBoundingClientRect();
      if ($e >= n.left && $e <= n.right && Ge >= n.top && Ge <= n.bottom) {
        const i = this.$_popperNode.getBoundingClientRect(), o = $e - we, s = Ge - ye, r = i.left + i.width / 2 - we + (i.top + i.height / 2) - ye + i.width + i.height, a = we + o * r, d = ye + s * r;
        return rt(we, ye, a, d, i.left, i.top, i.left, i.bottom) || // Left edge
        rt(we, ye, a, d, i.left, i.top, i.right, i.top) || // Top edge
        rt(we, ye, a, d, i.right, i.top, i.right, i.bottom) || // Right edge
        rt(we, ye, a, d, i.left, i.bottom, i.right, i.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (fi) {
    const e = qe ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => jn(t, !0), e), document.addEventListener("touchend", (t) => Dn(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => jn(e, !1), !0), window.addEventListener("click", (e) => Dn(e, !1), !0);
  window.addEventListener("resize", io);
}
function jn(e, t) {
  if (re.autoHideOnMousedown)
    mi(e, t);
  else
    for (let n = 0; n < se.length; n++) {
      const i = se[n];
      try {
        i.mouseDownContains = i.popperNode().contains(e.target);
      } catch (o) {
      }
    }
}
function Dn(e, t) {
  re.autoHideOnMousedown || mi(e, t);
}
function mi(e, t) {
  const n = {};
  for (let i = se.length - 1; i >= 0; i--) {
    const o = se[i];
    try {
      const s = o.containsGlobalTarget = o.mouseDownContains || o.popperNode().contains(e.target);
      o.pendingHide = !1, requestAnimationFrame(() => {
        if (o.pendingHide = !1, !n[o.randomId] && Mn(o, s, e)) {
          if (o.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let a = o.parentPopper;
            for (; a; )
              n[a.randomId] = !0, a = a.parentPopper;
            return;
          }
          let r = o.parentPopper;
          for (; r && Mn(r, r.containsGlobalTarget, e); )
            r.$_handleGlobalClose(e, t), r = r.parentPopper;
        }
      });
    } catch (s) {
    }
  }
}
function Mn(e, t, n) {
  return n.closeAllPopover || n.closePopover && t || no(e, n) && !t;
}
function no(e, t) {
  if (typeof e.autoHide == "function") {
    const n = e.autoHide(t);
    return e.lastAutoHide = n, n;
  }
  return e.autoHide;
}
function io() {
  for (let e = 0; e < se.length; e++)
    se[e].$_computePosition();
}
let we = 0, ye = 0, $e = 0, Ge = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  we = $e, ye = Ge, $e = e.clientX, Ge = e.clientY;
}, qe ? {
  passive: !0
} : void 0);
function rt(e, t, n, i, o, s, r, a) {
  const d = ((r - o) * (t - s) - (a - s) * (e - o)) / ((a - s) * (n - e) - (r - o) * (i - t)), u = ((n - e) * (t - s) - (i - t) * (e - o)) / ((a - s) * (n - e) - (r - o) * (i - t));
  return d >= 0 && d <= 1 && u >= 0 && u <= 1;
}
const so = {
  extends: gi()
}, xt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, o] of t)
    n[i] = o;
  return n;
};
function oo(e, t, n, i, o, s) {
  return p(), b("div", {
    ref: "reference",
    class: O(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    z(e.$slots, "default", ls(as(e.slotData)))
  ], 2);
}
const ro = /* @__PURE__ */ xt(so, [["render", oo]]);
function lo() {
  var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var n = e.indexOf("Trident/");
  if (n > 0) {
    var i = e.indexOf("rv:");
    return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10);
  }
  var o = e.indexOf("Edge/");
  return o > 0 ? parseInt(e.substring(o + 5, e.indexOf(".", o)), 10) : -1;
}
let lt;
function Qt() {
  Qt.init || (Qt.init = !0, lt = lo() !== -1);
}
var Rt = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: !1
    },
    ignoreWidth: {
      type: Boolean,
      default: !1
    },
    ignoreHeight: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    Qt(), rs(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", lt && this.$el.appendChild(e), e.data = "about:blank", lt || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject && this._resizeObject.onload && (!lt && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const ao = /* @__PURE__ */ ds("data-v-b329ee4c");
ss("data-v-b329ee4c");
const co = {
  class: "resize-observer",
  tabindex: "-1"
};
os();
const uo = /* @__PURE__ */ ao((e, t, n, i, o, s) => (p(), A("div", co)));
Rt.render = uo;
Rt.__scopeId = "data-v-b329ee4c";
Rt.__file = "src/components/ResizeObserver.vue";
const wi = (e = "theme") => ({
  computed: {
    themeClass() {
      return to(this[e]);
    }
  }
}), ho = yt({
  name: "VPopperContent",
  components: {
    ResizeObserver: Rt
  },
  mixins: [
    wi()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(e) {
      return e != null && !isNaN(e) ? `${e}px` : null;
    }
  }
}), fo = ["id", "aria-hidden", "tabindex", "data-popper-placement"], po = {
  ref: "inner",
  class: "v-popper__inner"
}, go = /* @__PURE__ */ F("div", { class: "v-popper__arrow-outer" }, null, -1), mo = /* @__PURE__ */ F("div", { class: "v-popper__arrow-inner" }, null, -1), wo = [
  go,
  mo
];
function yo(e, t, n, i, o, s) {
  const r = be("ResizeObserver");
  return p(), b("div", {
    id: e.popperId,
    ref: "popover",
    class: O(["v-popper__popper", [
      e.themeClass,
      e.classes.popperClass,
      {
        "v-popper__popper--shown": e.shown,
        "v-popper__popper--hidden": !e.shown,
        "v-popper__popper--show-from": e.classes.showFrom,
        "v-popper__popper--show-to": e.classes.showTo,
        "v-popper__popper--hide-from": e.classes.hideFrom,
        "v-popper__popper--hide-to": e.classes.hideTo,
        "v-popper__popper--skip-transition": e.skipTransition,
        "v-popper__popper--arrow-overflow": e.result && e.result.arrow.overflow,
        "v-popper__popper--no-positioning": !e.result
      }
    ]]),
    style: ze(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = hs((a) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    F("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (a) => e.autoHide && e.$emit("hide"))
    }),
    F("div", {
      class: "v-popper__wrapper",
      style: ze(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      F("div", po, [
        e.mounted ? (p(), b(W, { key: 0 }, [
          F("div", null, [
            z(e.$slots, "default")
          ]),
          e.handleResize ? (p(), A(r, {
            key: 0,
            onNotify: t[1] || (t[1] = (a) => e.$emit("resize", a))
          })) : R("", !0)
        ], 64)) : R("", !0)
      ], 512),
      F("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: ze(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, wo, 4)
    ], 4)
  ], 46, fo);
}
const yi = /* @__PURE__ */ xt(ho, [["render", yo]]), bi = {
  methods: {
    show(...e) {
      return this.$refs.popper.show(...e);
    },
    hide(...e) {
      return this.$refs.popper.hide(...e);
    },
    dispose(...e) {
      return this.$refs.popper.dispose(...e);
    },
    onResize(...e) {
      return this.$refs.popper.onResize(...e);
    }
  }
};
let Xt = function() {
};
typeof window < "u" && (Xt = window.Element);
const bo = yt({
  name: "VPopperWrapper",
  components: {
    Popper: ro,
    PopperContent: yi
  },
  mixins: [
    bi,
    wi("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    },
    referenceNode: {
      type: Function,
      default: null
    },
    shown: {
      type: Boolean,
      default: !1
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    positioningDisabled: {
      type: Boolean,
      default: void 0
    },
    placement: {
      type: String,
      default: void 0
    },
    delay: {
      type: [String, Number, Object],
      default: void 0
    },
    distance: {
      type: [Number, String],
      default: void 0
    },
    skidding: {
      type: [Number, String],
      default: void 0
    },
    triggers: {
      type: Array,
      default: void 0
    },
    showTriggers: {
      type: [Array, Function],
      default: void 0
    },
    hideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperTriggers: {
      type: Array,
      default: void 0
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    container: {
      type: [String, Object, Xt, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, Xt],
      default: void 0
    },
    strategy: {
      type: String,
      default: void 0
    },
    autoHide: {
      type: [Boolean, Function],
      default: void 0
    },
    handleResize: {
      type: Boolean,
      default: void 0
    },
    instantMove: {
      type: Boolean,
      default: void 0
    },
    eagerMount: {
      type: Boolean,
      default: void 0
    },
    popperClass: {
      type: [String, Array, Object],
      default: void 0
    },
    computeTransformOrigin: {
      type: Boolean,
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: void 0
    },
    autoSize: {
      type: [Boolean, String],
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: void 0
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: void 0
    },
    preventOverflow: {
      type: Boolean,
      default: void 0
    },
    overflowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowOverflow: {
      type: Boolean,
      default: void 0
    },
    flip: {
      type: Boolean,
      default: void 0
    },
    shift: {
      type: Boolean,
      default: void 0
    },
    shiftCrossAxis: {
      type: Boolean,
      default: void 0
    },
    noAutoFocus: {
      type: Boolean,
      default: void 0
    },
    disposeTimeout: {
      type: Number,
      default: void 0
    }
  },
  emits: {
    show: () => !0,
    hide: () => !0,
    "update:shown": (e) => !0,
    "apply-show": () => !0,
    "apply-hide": () => !0,
    "close-group": () => !0,
    "close-directive": () => !0,
    "auto-hide": () => !0,
    resize: () => !0
  },
  computed: {
    finalTheme() {
      var e;
      return (e = this.theme) != null ? e : this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
    }
  }
});
function So(e, t, n, i, o, s) {
  const r = be("PopperContent"), a = be("Popper");
  return p(), A(a, Ue({ ref: "popper" }, e.$props, {
    theme: e.finalTheme,
    "target-nodes": e.getTargetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    class: [
      e.themeClass
    ],
    onShow: t[0] || (t[0] = () => e.$emit("show")),
    onHide: t[1] || (t[1] = () => e.$emit("hide")),
    "onUpdate:shown": t[2] || (t[2] = (d) => e.$emit("update:shown", d)),
    onApplyShow: t[3] || (t[3] = () => e.$emit("apply-show")),
    onApplyHide: t[4] || (t[4] = () => e.$emit("apply-hide")),
    onCloseGroup: t[5] || (t[5] = () => e.$emit("close-group")),
    onCloseDirective: t[6] || (t[6] = () => e.$emit("close-directive")),
    onAutoHide: t[7] || (t[7] = () => e.$emit("auto-hide")),
    onResize: t[8] || (t[8] = () => e.$emit("resize"))
  }), {
    default: de(({
      popperId: d,
      isShown: u,
      shouldMountContent: l,
      skipTransition: c,
      autoHide: h,
      show: g,
      hide: m,
      handleResize: w,
      onResize: y,
      classes: v,
      result: S
    }) => [
      z(e.$slots, "default", {
        shown: u,
        show: g,
        hide: m
      }),
      I(r, {
        ref: "popperContent",
        "popper-id": d,
        theme: e.finalTheme,
        shown: u,
        mounted: l,
        "skip-transition": c,
        "auto-hide": h,
        "handle-resize": w,
        classes: v,
        result: S,
        onHide: m,
        onResize: y
      }, {
        default: de(() => [
          z(e.$slots, "popper", {
            shown: u,
            hide: m
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const an = /* @__PURE__ */ xt(bo, [["render", So]]), vo = X(E({}, an), {
  name: "VDropdown",
  vPopperTheme: "dropdown"
}), xo = X(E({}, an), {
  name: "VMenu",
  vPopperTheme: "menu"
}), Ro = X(E({}, an), {
  name: "VTooltip",
  vPopperTheme: "tooltip"
}), Fo = yt({
  name: "VTooltipDirective",
  components: {
    Popper: gi(),
    PopperContent: yi
  },
  mixins: [
    bi
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => Qe(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => Qe(e.theme, "loadingContent")
    },
    targetNodes: {
      type: Function,
      required: !0
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(!0);
      },
      immediate: !0
    },
    finalContent() {
      return L(this, null, function* () {
        yield this.$nextTick(), this.$refs.popper.onResize();
      });
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e) {
      if (typeof this.content == "function" && this.$_isShown && (e || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null, this.$_loading = !0;
        const t = ++this.$_fetchId, n = this.content(this);
        n.then ? n.then((i) => this.onResult(t, i)) : this.onResult(t, n);
      }
    },
    onResult(e, t) {
      e === this.$_fetchId && (this.$_loading = !1, this.asyncContent = t);
    },
    onShow() {
      this.$_isShown = !0, this.fetchContent();
    },
    onHide() {
      this.$_isShown = !1;
    }
  }
}), ko = ["innerHTML"], _o = ["textContent"];
function Co(e, t, n, i, o, s) {
  const r = be("PopperContent"), a = be("Popper");
  return p(), A(a, Ue({ ref: "popper" }, e.$attrs, {
    theme: e.theme,
    "target-nodes": e.targetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    onApplyShow: e.onShow,
    onApplyHide: e.onHide
  }), {
    default: de(({
      popperId: d,
      isShown: u,
      shouldMountContent: l,
      skipTransition: c,
      autoHide: h,
      hide: g,
      handleResize: m,
      onResize: w,
      classes: y,
      result: v
    }) => [
      I(r, {
        ref: "popperContent",
        class: O({
          "v-popper--tooltip-loading": e.loading
        }),
        "popper-id": d,
        theme: e.theme,
        shown: u,
        mounted: l,
        "skip-transition": c,
        "auto-hide": h,
        "handle-resize": m,
        classes: y,
        result: v,
        onHide: g,
        onResize: w
      }, {
        default: de(() => [
          e.html ? (p(), b("div", {
            key: 0,
            innerHTML: e.finalContent
          }, null, 8, ko)) : (p(), b("div", {
            key: 1,
            textContent: V(e.finalContent)
          }, null, 8, _o))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "target-nodes", "popper-node", "onApplyShow", "onApplyHide"]);
}
const Po = /* @__PURE__ */ xt(Fo, [["render", Co]]), Si = "v-popper--has-tooltip";
function To(e, t) {
  let n = e.placement;
  if (!n && t)
    for (const i of pi)
      t[i] && (n = i);
  return n || (n = Qe(e.theme || "tooltip", "placement")), n;
}
function vi(e, t, n) {
  let i;
  const o = typeof t;
  return o === "string" ? i = { content: t } : t && o === "object" ? i = t : i = { content: !1 }, i.placement = To(i, n), i.targetNodes = () => [e], i.referenceNode = () => e, i;
}
let zt, Xe, Oo = 0;
function Ao() {
  if (zt)
    return;
  Xe = Gt([]), zt = cs({
    name: "VTooltipDirectiveApp",
    setup() {
      return {
        directives: Xe
      };
    },
    render() {
      return this.directives.map((t) => us(Po, X(E({}, t.options), {
        shown: t.shown || t.options.shown,
        key: t.id
      })));
    },
    devtools: {
      hide: !0
    }
  });
  const e = document.createElement("div");
  document.body.appendChild(e), zt.mount(e);
}
function Eo(e, t, n) {
  Ao();
  const i = Gt(vi(e, t, n)), o = Gt(!1), s = {
    id: Oo++,
    options: i,
    shown: o
  };
  return Xe.value.push(s), e.classList && e.classList.add(Si), e.$_popper = {
    options: i,
    item: s,
    show() {
      o.value = !0;
    },
    hide() {
      o.value = !1;
    }
  };
}
function xi(e) {
  if (e.$_popper) {
    const t = Xe.value.indexOf(e.$_popper.item);
    t !== -1 && Xe.value.splice(t, 1), delete e.$_popper, delete e.$_popperOldShown, delete e.$_popperMountTarget;
  }
  e.classList && e.classList.remove(Si);
}
function Bn(e, { value: t, modifiers: n }) {
  const i = vi(e, t, n);
  if (!i.content || Qe(i.theme || "tooltip", "disabled"))
    xi(e);
  else {
    let o;
    e.$_popper ? (o = e.$_popper, o.options.value = i) : o = Eo(e, t, n), typeof t.shown < "u" && t.shown !== e.$_popperOldShown && (e.$_popperOldShown = t.shown, t.shown ? o.show() : o.hide());
  }
}
const Lo = {
  beforeMount: Bn,
  updated: Bn,
  beforeUnmount(e) {
    xi(e);
  }
};
function Hn(e) {
  e.addEventListener("mousedown", gt), e.addEventListener("click", gt), e.addEventListener("touchstart", Ri, qe ? {
    passive: !0
  } : !1);
}
function Un(e) {
  e.removeEventListener("mousedown", gt), e.removeEventListener("click", gt), e.removeEventListener("touchstart", Ri), e.removeEventListener("touchend", Fi), e.removeEventListener("touchcancel", ki);
}
function gt(e) {
  const t = e.currentTarget;
  e.closePopover = !t.$_vclosepopover_touch, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
}
function Ri(e) {
  if (e.changedTouches.length === 1) {
    const t = e.currentTarget;
    t.$_vclosepopover_touch = !0;
    const n = e.changedTouches[0];
    t.$_vclosepopover_touchPoint = n, t.addEventListener("touchend", Fi), t.addEventListener("touchcancel", ki);
  }
}
function Fi(e) {
  const t = e.currentTarget;
  if (t.$_vclosepopover_touch = !1, e.changedTouches.length === 1) {
    const n = e.changedTouches[0], i = t.$_vclosepopover_touchPoint;
    e.closePopover = Math.abs(n.screenY - i.screenY) < 20 && Math.abs(n.screenX - i.screenX) < 20, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
  }
}
function ki(e) {
  const t = e.currentTarget;
  t.$_vclosepopover_touch = !1;
}
const No = {
  beforeMount(e, { value: t, modifiers: n }) {
    e.$_closePopoverModifiers = n, (typeof t > "u" || t) && Hn(e);
  },
  updated(e, { value: t, oldValue: n, modifiers: i }) {
    e.$_closePopoverModifiers = i, t !== n && (typeof t > "u" || t ? Hn(e) : Un(e));
  },
  beforeUnmount(e) {
    Un(e);
  }
};
function qo(e, t = {}) {
  e.$_vTooltipInstalled || (e.$_vTooltipInstalled = !0, hi(re, t), e.directive("tooltip", Lo), e.directive("close-popper", No), e.component("VTooltip", Ro), e.component("VDropdown", vo), e.component("VMenu", xo));
}
const jo = {
  // eslint-disable-next-line no-undef
  version: "5.2.2",
  install: qo,
  options: re
};
function _i(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Do } = Object.prototype, { getPrototypeOf: cn } = Object, { iterator: Ft, toStringTag: Ci } = Symbol, kt = /* @__PURE__ */ ((e) => (t) => {
  const n = Do.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), le = (e) => (e = e.toLowerCase(), (t) => kt(t) === e), _t = (e) => (t) => typeof t === e, { isArray: je } = Array, Ye = _t("undefined");
function Mo(e) {
  return e !== null && !Ye(e) && e.constructor !== null && !Ye(e.constructor) && Y(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Pi = le("ArrayBuffer");
function Bo(e) {
  let t;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Pi(e.buffer), t;
}
const Ho = _t("string"), Y = _t("function"), Ti = _t("number"), Ct = (e) => e !== null && typeof e == "object", Uo = (e) => e === !0 || e === !1, at = (e) => {
  if (kt(e) !== "object")
    return !1;
  const t = cn(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Ci in e) && !(Ft in e);
}, zo = le("Date"), Vo = le("File"), Io = le("Blob"), $o = le("FileList"), Go = (e) => Ct(e) && Y(e.pipe), Wo = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Y(e.append) && ((t = kt(e)) === "formdata" || // detect form-data instance
  t === "object" && Y(e.toString) && e.toString() === "[object FormData]"));
}, Jo = le("URLSearchParams"), [Ko, Qo, Xo, Yo] = ["ReadableStream", "Request", "Response", "Headers"].map(le), Zo = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ze(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e == "undefined")
    return;
  let i, o;
  if (typeof e != "object" && (e = [e]), je(e))
    for (i = 0, o = e.length; i < o; i++)
      t.call(null, e[i], i, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), r = s.length;
    let a;
    for (i = 0; i < r; i++)
      a = s[i], t.call(null, e[a], a, e);
  }
}
function Oi(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let i = n.length, o;
  for (; i-- > 0; )
    if (o = n[i], t === o.toLowerCase())
      return o;
  return null;
}
const Ce = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global, Ai = (e) => !Ye(e) && e !== Ce;
function Yt() {
  const { caseless: e } = Ai(this) && this || {}, t = {}, n = (i, o) => {
    const s = e && Oi(t, o) || o;
    at(t[s]) && at(i) ? t[s] = Yt(t[s], i) : at(i) ? t[s] = Yt({}, i) : je(i) ? t[s] = i.slice() : t[s] = i;
  };
  for (let i = 0, o = arguments.length; i < o; i++)
    arguments[i] && Ze(arguments[i], n);
  return t;
}
const er = (e, t, n, { allOwnKeys: i } = {}) => (Ze(t, (o, s) => {
  n && Y(o) ? e[s] = _i(o, n) : e[s] = o;
}, { allOwnKeys: i }), e), tr = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), nr = (e, t, n, i) => {
  e.prototype = Object.create(t.prototype, i), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, ir = (e, t, n, i) => {
  let o, s, r;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; )
      r = o[s], (!i || i(r, e, t)) && !a[r] && (t[r] = e[r], a[r] = !0);
    e = n !== !1 && cn(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, sr = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const i = e.indexOf(t, n);
  return i !== -1 && i === n;
}, or = (e) => {
  if (!e) return null;
  if (je(e)) return e;
  let t = e.length;
  if (!Ti(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, rr = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array != "undefined" && cn(Uint8Array)), lr = (e, t) => {
  const i = (e && e[Ft]).call(e);
  let o;
  for (; (o = i.next()) && !o.done; ) {
    const s = o.value;
    t.call(e, s[0], s[1]);
  }
}, ar = (e, t) => {
  let n;
  const i = [];
  for (; (n = e.exec(t)) !== null; )
    i.push(n);
  return i;
}, cr = le("HTMLFormElement"), ur = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, i, o) {
    return i.toUpperCase() + o;
  }
), zn = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), dr = le("RegExp"), Ei = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), i = {};
  Ze(n, (o, s) => {
    let r;
    (r = t(o, s, e)) !== !1 && (i[s] = r || o);
  }), Object.defineProperties(e, i);
}, hr = (e) => {
  Ei(e, (t, n) => {
    if (Y(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const i = e[n];
    if (Y(i)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, fr = (e, t) => {
  const n = {}, i = (o) => {
    o.forEach((s) => {
      n[s] = !0;
    });
  };
  return je(e) ? i(e) : i(String(e).split(t)), n;
}, pr = () => {
}, gr = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function mr(e) {
  return !!(e && Y(e.append) && e[Ci] === "FormData" && e[Ft]);
}
const wr = (e) => {
  const t = new Array(10), n = (i, o) => {
    if (Ct(i)) {
      if (t.indexOf(i) >= 0)
        return;
      if (!("toJSON" in i)) {
        t[o] = i;
        const s = je(i) ? [] : {};
        return Ze(i, (r, a) => {
          const d = n(r, o + 1);
          !Ye(d) && (s[a] = d);
        }), t[o] = void 0, s;
      }
    }
    return i;
  };
  return n(e, 0);
}, yr = le("AsyncFunction"), br = (e) => e && (Ct(e) || Y(e)) && Y(e.then) && Y(e.catch), Li = ((e, t) => e ? setImmediate : t ? ((n, i) => (Ce.addEventListener("message", ({ source: o, data: s }) => {
  o === Ce && s === n && i.length && i.shift()();
}, !1), (o) => {
  i.push(o), Ce.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  Y(Ce.postMessage)
), Sr = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(Ce) : typeof process != "undefined" && process.nextTick || Li, vr = (e) => e != null && Y(e[Ft]), f = {
  isArray: je,
  isArrayBuffer: Pi,
  isBuffer: Mo,
  isFormData: Wo,
  isArrayBufferView: Bo,
  isString: Ho,
  isNumber: Ti,
  isBoolean: Uo,
  isObject: Ct,
  isPlainObject: at,
  isReadableStream: Ko,
  isRequest: Qo,
  isResponse: Xo,
  isHeaders: Yo,
  isUndefined: Ye,
  isDate: zo,
  isFile: Vo,
  isBlob: Io,
  isRegExp: dr,
  isFunction: Y,
  isStream: Go,
  isURLSearchParams: Jo,
  isTypedArray: rr,
  isFileList: $o,
  forEach: Ze,
  merge: Yt,
  extend: er,
  trim: Zo,
  stripBOM: tr,
  inherits: nr,
  toFlatObject: ir,
  kindOf: kt,
  kindOfTest: le,
  endsWith: sr,
  toArray: or,
  forEachEntry: lr,
  matchAll: ar,
  isHTMLForm: cr,
  hasOwnProperty: zn,
  hasOwnProp: zn,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ei,
  freezeMethods: hr,
  toObjectSet: fr,
  toCamelCase: ur,
  noop: pr,
  toFiniteNumber: gr,
  findKey: Oi,
  global: Ce,
  isContextDefined: Ai,
  isSpecCompliantForm: mr,
  toJSONObject: wr,
  isAsyncFn: yr,
  isThenable: br,
  setImmediate: Li,
  asap: Sr,
  isIterable: vr
};
function C(e, t, n, i, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), i && (this.request = i), o && (this.response = o, this.status = o.status ? o.status : null);
}
f.inherits(C, Error, {
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
      config: f.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Ni = C.prototype, qi = {};
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
  qi[e] = { value: e };
});
Object.defineProperties(C, qi);
Object.defineProperty(Ni, "isAxiosError", { value: !0 });
C.from = (e, t, n, i, o, s) => {
  const r = Object.create(Ni);
  return f.toFlatObject(e, r, function(d) {
    return d !== Error.prototype;
  }, (a) => a !== "isAxiosError"), C.call(r, e.message, t, n, i, o), r.cause = e, r.name = e.name, s && Object.assign(r, s), r;
};
const xr = null;
function Zt(e) {
  return f.isPlainObject(e) || f.isArray(e);
}
function ji(e) {
  return f.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Vn(e, t, n) {
  return e ? e.concat(t).map(function(o, s) {
    return o = ji(o), !n && s ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function Rr(e) {
  return f.isArray(e) && !e.some(Zt);
}
const Fr = f.toFlatObject(f, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Pt(e, t, n) {
  if (!f.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = f.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(w, y) {
    return !f.isUndefined(y[w]);
  });
  const i = n.metaTokens, o = n.visitor || l, s = n.dots, r = n.indexes, d = (n.Blob || typeof Blob != "undefined" && Blob) && f.isSpecCompliantForm(t);
  if (!f.isFunction(o))
    throw new TypeError("visitor must be a function");
  function u(m) {
    if (m === null) return "";
    if (f.isDate(m))
      return m.toISOString();
    if (!d && f.isBlob(m))
      throw new C("Blob is not supported. Use a Buffer instead.");
    return f.isArrayBuffer(m) || f.isTypedArray(m) ? d && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function l(m, w, y) {
    let v = m;
    if (m && !y && typeof m == "object") {
      if (f.endsWith(w, "{}"))
        w = i ? w : w.slice(0, -2), m = JSON.stringify(m);
      else if (f.isArray(m) && Rr(m) || (f.isFileList(m) || f.endsWith(w, "[]")) && (v = f.toArray(m)))
        return w = ji(w), v.forEach(function(x, P) {
          !(f.isUndefined(x) || x === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            r === !0 ? Vn([w], P, s) : r === null ? w : w + "[]",
            u(x)
          );
        }), !1;
    }
    return Zt(m) ? !0 : (t.append(Vn(y, w, s), u(m)), !1);
  }
  const c = [], h = Object.assign(Fr, {
    defaultVisitor: l,
    convertValue: u,
    isVisitable: Zt
  });
  function g(m, w) {
    if (!f.isUndefined(m)) {
      if (c.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + w.join("."));
      c.push(m), f.forEach(m, function(v, S) {
        (!(f.isUndefined(v) || v === null) && o.call(
          t,
          v,
          f.isString(S) ? S.trim() : S,
          w,
          h
        )) === !0 && g(v, w ? w.concat(S) : [S]);
      }), c.pop();
    }
  }
  if (!f.isObject(e))
    throw new TypeError("data must be an object");
  return g(e), t;
}
function In(e) {
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
function un(e, t) {
  this._pairs = [], e && Pt(e, this, t);
}
const Di = un.prototype;
Di.append = function(t, n) {
  this._pairs.push([t, n]);
};
Di.toString = function(t) {
  const n = t ? function(i) {
    return t.call(this, i, In);
  } : In;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function kr(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Mi(e, t, n) {
  if (!t)
    return e;
  const i = n && n.encode || kr;
  f.isFunction(n) && (n = {
    serialize: n
  });
  const o = n && n.serialize;
  let s;
  if (o ? s = o(t, n) : s = f.isURLSearchParams(t) ? t.toString() : new un(t, n).toString(i), s) {
    const r = e.indexOf("#");
    r !== -1 && (e = e.slice(0, r)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class $n {
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
  use(t, n, i) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
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
    f.forEach(this.handlers, function(i) {
      i !== null && t(i);
    });
  }
}
const Bi = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, _r = typeof URLSearchParams != "undefined" ? URLSearchParams : un, Cr = typeof FormData != "undefined" ? FormData : null, Pr = typeof Blob != "undefined" ? Blob : null, Tr = {
  isBrowser: !0,
  classes: {
    URLSearchParams: _r,
    FormData: Cr,
    Blob: Pr
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, dn = typeof window != "undefined" && typeof document != "undefined", en = typeof navigator == "object" && navigator || void 0, Or = dn && (!en || ["ReactNative", "NativeScript", "NS"].indexOf(en.product) < 0), Ar = typeof WorkerGlobalScope != "undefined" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Er = dn && window.location.href || "http://localhost", Lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: dn,
  hasStandardBrowserEnv: Or,
  hasStandardBrowserWebWorkerEnv: Ar,
  navigator: en,
  origin: Er
}, Symbol.toStringTag, { value: "Module" })), J = E(E({}, Lr), Tr);
function Nr(e, t) {
  return Pt(e, new J.classes.URLSearchParams(), Object.assign({
    visitor: function(n, i, o, s) {
      return J.isNode && f.isBuffer(n) ? (this.append(i, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function qr(e) {
  return f.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function jr(e) {
  const t = {}, n = Object.keys(e);
  let i;
  const o = n.length;
  let s;
  for (i = 0; i < o; i++)
    s = n[i], t[s] = e[s];
  return t;
}
function Hi(e) {
  function t(n, i, o, s) {
    let r = n[s++];
    if (r === "__proto__") return !0;
    const a = Number.isFinite(+r), d = s >= n.length;
    return r = !r && f.isArray(o) ? o.length : r, d ? (f.hasOwnProp(o, r) ? o[r] = [o[r], i] : o[r] = i, !a) : ((!o[r] || !f.isObject(o[r])) && (o[r] = []), t(n, i, o[r], s) && f.isArray(o[r]) && (o[r] = jr(o[r])), !a);
  }
  if (f.isFormData(e) && f.isFunction(e.entries)) {
    const n = {};
    return f.forEachEntry(e, (i, o) => {
      t(qr(i), o, n, 0);
    }), n;
  }
  return null;
}
function Dr(e, t, n) {
  if (f.isString(e))
    try {
      return (t || JSON.parse)(e), f.trim(e);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (n || JSON.stringify)(e);
}
const et = {
  transitional: Bi,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const i = n.getContentType() || "", o = i.indexOf("application/json") > -1, s = f.isObject(t);
    if (s && f.isHTMLForm(t) && (t = new FormData(t)), f.isFormData(t))
      return o ? JSON.stringify(Hi(t)) : t;
    if (f.isArrayBuffer(t) || f.isBuffer(t) || f.isStream(t) || f.isFile(t) || f.isBlob(t) || f.isReadableStream(t))
      return t;
    if (f.isArrayBufferView(t))
      return t.buffer;
    if (f.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (s) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return Nr(t, this.formSerializer).toString();
      if ((a = f.isFileList(t)) || i.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return Pt(
          a ? { "files[]": t } : t,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return s || o ? (n.setContentType("application/json", !1), Dr(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || et.transitional, i = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (f.isResponse(t) || f.isReadableStream(t))
      return t;
    if (t && f.isString(t) && (i && !this.responseType || o)) {
      const r = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (r)
          throw a.name === "SyntaxError" ? C.from(a, C.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
    FormData: J.classes.FormData,
    Blob: J.classes.Blob
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
f.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  et.headers[e] = {};
});
const Mr = f.toObjectSet([
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
]), Br = (e) => {
  const t = {};
  let n, i, o;
  return e && e.split(`
`).forEach(function(r) {
    o = r.indexOf(":"), n = r.substring(0, o).trim().toLowerCase(), i = r.substring(o + 1).trim(), !(!n || t[n] && Mr[n]) && (n === "set-cookie" ? t[n] ? t[n].push(i) : t[n] = [i] : t[n] = t[n] ? t[n] + ", " + i : i);
  }), t;
}, Gn = Symbol("internals");
function He(e) {
  return e && String(e).trim().toLowerCase();
}
function ct(e) {
  return e === !1 || e == null ? e : f.isArray(e) ? e.map(ct) : String(e);
}
function Hr(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = n.exec(e); )
    t[i[1]] = i[2];
  return t;
}
const Ur = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Vt(e, t, n, i, o) {
  if (f.isFunction(i))
    return i.call(this, t, n);
  if (o && (t = n), !!f.isString(t)) {
    if (f.isString(i))
      return t.indexOf(i) !== -1;
    if (f.isRegExp(i))
      return i.test(t);
  }
}
function zr(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, i) => n.toUpperCase() + i);
}
function Vr(e, t) {
  const n = f.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(e, i + n, {
      value: function(o, s, r) {
        return this[i].call(this, t, o, s, r);
      },
      configurable: !0
    });
  });
}
let Z = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, i) {
    const o = this;
    function s(a, d, u) {
      const l = He(d);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const c = f.findKey(o, l);
      (!c || o[c] === void 0 || u === !0 || u === void 0 && o[c] !== !1) && (o[c || d] = ct(a));
    }
    const r = (a, d) => f.forEach(a, (u, l) => s(u, l, d));
    if (f.isPlainObject(t) || t instanceof this.constructor)
      r(t, n);
    else if (f.isString(t) && (t = t.trim()) && !Ur(t))
      r(Br(t), n);
    else if (f.isObject(t) && f.isIterable(t)) {
      let a = {}, d, u;
      for (const l of t) {
        if (!f.isArray(l))
          throw TypeError("Object iterator must return a key-value pair");
        a[u = l[0]] = (d = a[u]) ? f.isArray(d) ? [...d, l[1]] : [d, l[1]] : l[1];
      }
      r(a, n);
    } else
      t != null && s(n, t, i);
    return this;
  }
  get(t, n) {
    if (t = He(t), t) {
      const i = f.findKey(this, t);
      if (i) {
        const o = this[i];
        if (!n)
          return o;
        if (n === !0)
          return Hr(o);
        if (f.isFunction(n))
          return n.call(this, o, i);
        if (f.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = He(t), t) {
      const i = f.findKey(this, t);
      return !!(i && this[i] !== void 0 && (!n || Vt(this, this[i], i, n)));
    }
    return !1;
  }
  delete(t, n) {
    const i = this;
    let o = !1;
    function s(r) {
      if (r = He(r), r) {
        const a = f.findKey(i, r);
        a && (!n || Vt(i, i[a], a, n)) && (delete i[a], o = !0);
      }
    }
    return f.isArray(t) ? t.forEach(s) : s(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let i = n.length, o = !1;
    for (; i--; ) {
      const s = n[i];
      (!t || Vt(this, this[s], s, t, !0)) && (delete this[s], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, i = {};
    return f.forEach(this, (o, s) => {
      const r = f.findKey(i, s);
      if (r) {
        n[r] = ct(o), delete n[s];
        return;
      }
      const a = t ? zr(s) : String(s).trim();
      a !== s && delete n[s], n[a] = ct(o), i[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return f.forEach(this, (i, o) => {
      i != null && i !== !1 && (n[o] = t && f.isArray(i) ? i.join(", ") : i);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
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
  static concat(t, ...n) {
    const i = new this(t);
    return n.forEach((o) => i.set(o)), i;
  }
  static accessor(t) {
    const i = (this[Gn] = this[Gn] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function s(r) {
      const a = He(r);
      i[a] || (Vr(o, r), i[a] = !0);
    }
    return f.isArray(t) ? t.forEach(s) : s(t), this;
  }
};
Z.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
f.reduceDescriptors(Z.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(i) {
      this[n] = i;
    }
  };
});
f.freezeMethods(Z);
function It(e, t) {
  const n = this || et, i = t || n, o = Z.from(i.headers);
  let s = i.data;
  return f.forEach(e, function(a) {
    s = a.call(n, s, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), s;
}
function Ui(e) {
  return !!(e && e.__CANCEL__);
}
function De(e, t, n) {
  C.call(this, e == null ? "canceled" : e, C.ERR_CANCELED, t, n), this.name = "CanceledError";
}
f.inherits(De, C, {
  __CANCEL__: !0
});
function zi(e, t, n) {
  const i = n.config.validateStatus;
  !n.status || !i || i(n.status) ? e(n) : t(new C(
    "Request failed with status code " + n.status,
    [C.ERR_BAD_REQUEST, C.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Ir(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function $r(e, t) {
  e = e || 10;
  const n = new Array(e), i = new Array(e);
  let o = 0, s = 0, r;
  return t = t !== void 0 ? t : 1e3, function(d) {
    const u = Date.now(), l = i[s];
    r || (r = u), n[o] = d, i[o] = u;
    let c = s, h = 0;
    for (; c !== o; )
      h += n[c++], c = c % e;
    if (o = (o + 1) % e, o === s && (s = (s + 1) % e), u - r < t)
      return;
    const g = l && u - l;
    return g ? Math.round(h * 1e3 / g) : void 0;
  };
}
function Gr(e, t) {
  let n = 0, i = 1e3 / t, o, s;
  const r = (u, l = Date.now()) => {
    n = l, o = null, s && (clearTimeout(s), s = null), e.apply(null, u);
  };
  return [(...u) => {
    const l = Date.now(), c = l - n;
    c >= i ? r(u, l) : (o = u, s || (s = setTimeout(() => {
      s = null, r(o);
    }, i - c)));
  }, () => o && r(o)];
}
const mt = (e, t, n = 3) => {
  let i = 0;
  const o = $r(50, 250);
  return Gr((s) => {
    const r = s.loaded, a = s.lengthComputable ? s.total : void 0, d = r - i, u = o(d), l = r <= a;
    i = r;
    const c = {
      loaded: r,
      total: a,
      progress: a ? r / a : void 0,
      bytes: d,
      rate: u || void 0,
      estimated: u && a && l ? (a - r) / u : void 0,
      event: s,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(c);
  }, n);
}, Wn = (e, t) => {
  const n = e != null;
  return [(i) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: i
  }), t[1]];
}, Jn = (e) => (...t) => f.asap(() => e(...t)), Wr = J.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, J.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(J.origin),
  J.navigator && /(msie|trident)/i.test(J.navigator.userAgent)
) : () => !0, Jr = J.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, i, o, s) {
      const r = [e + "=" + encodeURIComponent(t)];
      f.isNumber(n) && r.push("expires=" + new Date(n).toGMTString()), f.isString(i) && r.push("path=" + i), f.isString(o) && r.push("domain=" + o), s === !0 && r.push("secure"), document.cookie = r.join("; ");
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
function Kr(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Qr(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Vi(e, t, n) {
  let i = !Kr(t);
  return e && (i || n == !1) ? Qr(e, t) : t;
}
const Kn = (e) => e instanceof Z ? E({}, e) : e;
function Te(e, t) {
  t = t || {};
  const n = {};
  function i(u, l, c, h) {
    return f.isPlainObject(u) && f.isPlainObject(l) ? f.merge.call({ caseless: h }, u, l) : f.isPlainObject(l) ? f.merge({}, l) : f.isArray(l) ? l.slice() : l;
  }
  function o(u, l, c, h) {
    if (f.isUndefined(l)) {
      if (!f.isUndefined(u))
        return i(void 0, u, c, h);
    } else return i(u, l, c, h);
  }
  function s(u, l) {
    if (!f.isUndefined(l))
      return i(void 0, l);
  }
  function r(u, l) {
    if (f.isUndefined(l)) {
      if (!f.isUndefined(u))
        return i(void 0, u);
    } else return i(void 0, l);
  }
  function a(u, l, c) {
    if (c in t)
      return i(u, l);
    if (c in e)
      return i(void 0, u);
  }
  const d = {
    url: s,
    method: s,
    data: s,
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
    validateStatus: a,
    headers: (u, l, c) => o(Kn(u), Kn(l), c, !0)
  };
  return f.forEach(Object.keys(Object.assign({}, e, t)), function(l) {
    const c = d[l] || o, h = c(e[l], t[l], l);
    f.isUndefined(h) && c !== a || (n[l] = h);
  }), n;
}
const Ii = (e) => {
  const t = Te({}, e);
  let { data: n, withXSRFToken: i, xsrfHeaderName: o, xsrfCookieName: s, headers: r, auth: a } = t;
  t.headers = r = Z.from(r), t.url = Mi(Vi(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && r.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let d;
  if (f.isFormData(n)) {
    if (J.hasStandardBrowserEnv || J.hasStandardBrowserWebWorkerEnv)
      r.setContentType(void 0);
    else if ((d = r.getContentType()) !== !1) {
      const [u, ...l] = d ? d.split(";").map((c) => c.trim()).filter(Boolean) : [];
      r.setContentType([u || "multipart/form-data", ...l].join("; "));
    }
  }
  if (J.hasStandardBrowserEnv && (i && f.isFunction(i) && (i = i(t)), i || i !== !1 && Wr(t.url))) {
    const u = o && s && Jr.read(s);
    u && r.set(o, u);
  }
  return t;
}, Xr = typeof XMLHttpRequest != "undefined", Yr = Xr && function(e) {
  return new Promise(function(n, i) {
    const o = Ii(e);
    let s = o.data;
    const r = Z.from(o.headers).normalize();
    let { responseType: a, onUploadProgress: d, onDownloadProgress: u } = o, l, c, h, g, m;
    function w() {
      g && g(), m && m(), o.cancelToken && o.cancelToken.unsubscribe(l), o.signal && o.signal.removeEventListener("abort", l);
    }
    let y = new XMLHttpRequest();
    y.open(o.method.toUpperCase(), o.url, !0), y.timeout = o.timeout;
    function v() {
      if (!y)
        return;
      const x = Z.from(
        "getAllResponseHeaders" in y && y.getAllResponseHeaders()
      ), _ = {
        data: !a || a === "text" || a === "json" ? y.responseText : y.response,
        status: y.status,
        statusText: y.statusText,
        headers: x,
        config: e,
        request: y
      };
      zi(function(q) {
        n(q), w();
      }, function(q) {
        i(q), w();
      }, _), y = null;
    }
    "onloadend" in y ? y.onloadend = v : y.onreadystatechange = function() {
      !y || y.readyState !== 4 || y.status === 0 && !(y.responseURL && y.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, y.onabort = function() {
      y && (i(new C("Request aborted", C.ECONNABORTED, e, y)), y = null);
    }, y.onerror = function() {
      i(new C("Network Error", C.ERR_NETWORK, e, y)), y = null;
    }, y.ontimeout = function() {
      let P = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const _ = o.transitional || Bi;
      o.timeoutErrorMessage && (P = o.timeoutErrorMessage), i(new C(
        P,
        _.clarifyTimeoutError ? C.ETIMEDOUT : C.ECONNABORTED,
        e,
        y
      )), y = null;
    }, s === void 0 && r.setContentType(null), "setRequestHeader" in y && f.forEach(r.toJSON(), function(P, _) {
      y.setRequestHeader(_, P);
    }), f.isUndefined(o.withCredentials) || (y.withCredentials = !!o.withCredentials), a && a !== "json" && (y.responseType = o.responseType), u && ([h, m] = mt(u, !0), y.addEventListener("progress", h)), d && y.upload && ([c, g] = mt(d), y.upload.addEventListener("progress", c), y.upload.addEventListener("loadend", g)), (o.cancelToken || o.signal) && (l = (x) => {
      y && (i(!x || x.type ? new De(null, e, y) : x), y.abort(), y = null);
    }, o.cancelToken && o.cancelToken.subscribe(l), o.signal && (o.signal.aborted ? l() : o.signal.addEventListener("abort", l)));
    const S = Ir(o.url);
    if (S && J.protocols.indexOf(S) === -1) {
      i(new C("Unsupported protocol " + S + ":", C.ERR_BAD_REQUEST, e));
      return;
    }
    y.send(s || null);
  });
}, Zr = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let i = new AbortController(), o;
    const s = function(u) {
      if (!o) {
        o = !0, a();
        const l = u instanceof Error ? u : this.reason;
        i.abort(l instanceof C ? l : new De(l instanceof Error ? l.message : l));
      }
    };
    let r = t && setTimeout(() => {
      r = null, s(new C(`timeout ${t} of ms exceeded`, C.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (r && clearTimeout(r), r = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", s));
    const { signal: d } = i;
    return d.unsubscribe = () => f.asap(a), d;
  }
}, el = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let i = 0, o;
  for (; i < n; )
    o = i + t, yield e.slice(i, o), i = o;
}, tl = function(e, t) {
  return Dt(this, null, function* () {
    try {
      for (var n = bn(nl(e)), i, o, s; i = !(o = yield new Fe(n.next())).done; i = !1) {
        const r = o.value;
        yield* Mt(el(r, t));
      }
    } catch (o) {
      s = [o];
    } finally {
      try {
        i && (o = n.return) && (yield new Fe(o.call(n)));
      } finally {
        if (s)
          throw s[0];
      }
    }
  });
}, nl = function(e) {
  return Dt(this, null, function* () {
    if (e[Symbol.asyncIterator]) {
      yield* Mt(e);
      return;
    }
    const t = e.getReader();
    try {
      for (; ; ) {
        const { done: n, value: i } = yield new Fe(t.read());
        if (n)
          break;
        yield i;
      }
    } finally {
      yield new Fe(t.cancel());
    }
  });
}, Qn = (e, t, n, i) => {
  const o = tl(e, t);
  let s = 0, r, a = (u) => {
    r || (r = !0, i && i(u));
  };
  return new ReadableStream({
    pull(u) {
      return L(this, null, function* () {
        try {
          const { done: l, value: c } = yield o.next();
          if (l) {
            a(), u.close();
            return;
          }
          let h = c.byteLength;
          if (n) {
            let g = s += h;
            n(g);
          }
          u.enqueue(new Uint8Array(c));
        } catch (l) {
          throw a(l), l;
        }
      });
    },
    cancel(u) {
      return a(u), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, Tt = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", $i = Tt && typeof ReadableStream == "function", il = Tt && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : (e) => L(null, null, function* () {
  return new Uint8Array(yield new Response(e).arrayBuffer());
})), Gi = (e, ...t) => {
  try {
    return !!e(...t);
  } catch (n) {
    return !1;
  }
}, sl = $i && Gi(() => {
  let e = !1;
  const t = new Request(J.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Xn = 64 * 1024, tn = $i && Gi(() => f.isReadableStream(new Response("").body)), wt = {
  stream: tn && ((e) => e.body)
};
Tt && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !wt[t] && (wt[t] = f.isFunction(e[t]) ? (n) => n[t]() : (n, i) => {
      throw new C(`Response type '${t}' is not supported`, C.ERR_NOT_SUPPORT, i);
    });
  });
})(new Response());
const ol = (e) => L(null, null, function* () {
  if (e == null)
    return 0;
  if (f.isBlob(e))
    return e.size;
  if (f.isSpecCompliantForm(e))
    return (yield new Request(J.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (f.isArrayBufferView(e) || f.isArrayBuffer(e))
    return e.byteLength;
  if (f.isURLSearchParams(e) && (e = e + ""), f.isString(e))
    return (yield il(e)).byteLength;
}), rl = (e, t) => L(null, null, function* () {
  const n = f.toFiniteNumber(e.getContentLength());
  return n == null ? ol(t) : n;
}), ll = Tt && ((e) => L(null, null, function* () {
  let {
    url: t,
    method: n,
    data: i,
    signal: o,
    cancelToken: s,
    timeout: r,
    onDownloadProgress: a,
    onUploadProgress: d,
    responseType: u,
    headers: l,
    withCredentials: c = "same-origin",
    fetchOptions: h
  } = Ii(e);
  u = u ? (u + "").toLowerCase() : "text";
  let g = Zr([o, s && s.toAbortSignal()], r), m;
  const w = g && g.unsubscribe && (() => {
    g.unsubscribe();
  });
  let y;
  try {
    if (d && sl && n !== "get" && n !== "head" && (y = yield rl(l, i)) !== 0) {
      let _ = new Request(t, {
        method: "POST",
        body: i,
        duplex: "half"
      }), N;
      if (f.isFormData(i) && (N = _.headers.get("content-type")) && l.setContentType(N), _.body) {
        const [q, j] = Wn(
          y,
          mt(Jn(d))
        );
        i = Qn(_.body, Xn, q, j);
      }
    }
    f.isString(c) || (c = c ? "include" : "omit");
    const v = "credentials" in Request.prototype;
    m = new Request(t, X(E({}, h), {
      signal: g,
      method: n.toUpperCase(),
      headers: l.normalize().toJSON(),
      body: i,
      duplex: "half",
      credentials: v ? c : void 0
    }));
    let S = yield fetch(m);
    const x = tn && (u === "stream" || u === "response");
    if (tn && (a || x && w)) {
      const _ = {};
      ["status", "statusText", "headers"].forEach(($) => {
        _[$] = S[$];
      });
      const N = f.toFiniteNumber(S.headers.get("content-length")), [q, j] = a && Wn(
        N,
        mt(Jn(a), !0)
      ) || [];
      S = new Response(
        Qn(S.body, Xn, q, () => {
          j && j(), w && w();
        }),
        _
      );
    }
    u = u || "text";
    let P = yield wt[f.findKey(wt, u) || "text"](S, e);
    return !x && w && w(), yield new Promise((_, N) => {
      zi(_, N, {
        data: P,
        headers: Z.from(S.headers),
        status: S.status,
        statusText: S.statusText,
        config: e,
        request: m
      });
    });
  } catch (v) {
    throw w && w(), v && v.name === "TypeError" && /Load failed|fetch/i.test(v.message) ? Object.assign(
      new C("Network Error", C.ERR_NETWORK, e, m),
      {
        cause: v.cause || v
      }
    ) : C.from(v, v && v.code, e, m);
  }
})), nn = {
  http: xr,
  xhr: Yr,
  fetch: ll
};
f.forEach(nn, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch (n) {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Yn = (e) => `- ${e}`, al = (e) => f.isFunction(e) || e === null || e === !1, Wi = {
  getAdapter: (e) => {
    e = f.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, i;
    const o = {};
    for (let s = 0; s < t; s++) {
      n = e[s];
      let r;
      if (i = n, !al(n) && (i = nn[(r = String(n)).toLowerCase()], i === void 0))
        throw new C(`Unknown adapter '${r}'`);
      if (i)
        break;
      o[r || "#" + s] = i;
    }
    if (!i) {
      const s = Object.entries(o).map(
        ([a, d]) => `adapter ${a} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let r = t ? s.length > 1 ? `since :
` + s.map(Yn).join(`
`) : " " + Yn(s[0]) : "as no adapter specified";
      throw new C(
        "There is no suitable adapter to dispatch the request " + r,
        "ERR_NOT_SUPPORT"
      );
    }
    return i;
  },
  adapters: nn
};
function $t(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new De(null, e);
}
function Zn(e) {
  return $t(e), e.headers = Z.from(e.headers), e.data = It.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Wi.getAdapter(e.adapter || et.adapter)(e).then(function(i) {
    return $t(e), i.data = It.call(
      e,
      e.transformResponse,
      i
    ), i.headers = Z.from(i.headers), i;
  }, function(i) {
    return Ui(i) || ($t(e), i && i.response && (i.response.data = It.call(
      e,
      e.transformResponse,
      i.response
    ), i.response.headers = Z.from(i.response.headers))), Promise.reject(i);
  });
}
const Ji = "1.9.0", Ot = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ot[e] = function(i) {
    return typeof i === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const ei = {};
Ot.transitional = function(t, n, i) {
  function o(s, r) {
    return "[Axios v" + Ji + "] Transitional option '" + s + "'" + r + (i ? ". " + i : "");
  }
  return (s, r, a) => {
    if (t === !1)
      throw new C(
        o(r, " has been removed" + (n ? " in " + n : "")),
        C.ERR_DEPRECATED
      );
    return n && !ei[r] && (ei[r] = !0, console.warn(
      o(
        r,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, r, a) : !0;
  };
};
Ot.spelling = function(t) {
  return (n, i) => (console.warn(`${i} is likely a misspelling of ${t}`), !0);
};
function cl(e, t, n) {
  if (typeof e != "object")
    throw new C("options must be an object", C.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(e);
  let o = i.length;
  for (; o-- > 0; ) {
    const s = i[o], r = t[s];
    if (r) {
      const a = e[s], d = a === void 0 || r(a, s, e);
      if (d !== !0)
        throw new C("option " + s + " must be " + d, C.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new C("Unknown option " + s, C.ERR_BAD_OPTION);
  }
}
const ut = {
  assertOptions: cl,
  validators: Ot
}, ue = ut.validators;
let Pe = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new $n(),
      response: new $n()
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
  request(t, n) {
    return L(this, null, function* () {
      try {
        return yield this._request(t, n);
      } catch (i) {
        if (i instanceof Error) {
          let o = {};
          Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
          const s = o.stack ? o.stack.replace(/^.+\n/, "") : "";
          try {
            i.stack ? s && !String(i.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + s) : i.stack = s;
          } catch (r) {
          }
        }
        throw i;
      }
    });
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Te(this.defaults, n);
    const { transitional: i, paramsSerializer: o, headers: s } = n;
    i !== void 0 && ut.assertOptions(i, {
      silentJSONParsing: ue.transitional(ue.boolean),
      forcedJSONParsing: ue.transitional(ue.boolean),
      clarifyTimeoutError: ue.transitional(ue.boolean)
    }, !1), o != null && (f.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : ut.assertOptions(o, {
      encode: ue.function,
      serialize: ue.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), ut.assertOptions(n, {
      baseUrl: ue.spelling("baseURL"),
      withXsrfToken: ue.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let r = s && f.merge(
      s.common,
      s[n.method]
    );
    s && f.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete s[m];
      }
    ), n.headers = Z.concat(r, s);
    const a = [];
    let d = !0;
    this.interceptors.request.forEach(function(w) {
      typeof w.runWhen == "function" && w.runWhen(n) === !1 || (d = d && w.synchronous, a.unshift(w.fulfilled, w.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(w) {
      u.push(w.fulfilled, w.rejected);
    });
    let l, c = 0, h;
    if (!d) {
      const m = [Zn.bind(this), void 0];
      for (m.unshift.apply(m, a), m.push.apply(m, u), h = m.length, l = Promise.resolve(n); c < h; )
        l = l.then(m[c++], m[c++]);
      return l;
    }
    h = a.length;
    let g = n;
    for (c = 0; c < h; ) {
      const m = a[c++], w = a[c++];
      try {
        g = m(g);
      } catch (y) {
        w.call(this, y);
        break;
      }
    }
    try {
      l = Zn.call(this, g);
    } catch (m) {
      return Promise.reject(m);
    }
    for (c = 0, h = u.length; c < h; )
      l = l.then(u[c++], u[c++]);
    return l;
  }
  getUri(t) {
    t = Te(this.defaults, t);
    const n = Vi(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Mi(n, t.params, t.paramsSerializer);
  }
};
f.forEach(["delete", "get", "head", "options"], function(t) {
  Pe.prototype[t] = function(n, i) {
    return this.request(Te(i || {}, {
      method: t,
      url: n,
      data: (i || {}).data
    }));
  };
});
f.forEach(["post", "put", "patch"], function(t) {
  function n(i) {
    return function(s, r, a) {
      return this.request(Te(a || {}, {
        method: t,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: r
      }));
    };
  }
  Pe.prototype[t] = n(), Pe.prototype[t + "Form"] = n(!0);
});
let ul = class Ki {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const i = this;
    this.promise.then((o) => {
      if (!i._listeners) return;
      let s = i._listeners.length;
      for (; s-- > 0; )
        i._listeners[s](o);
      i._listeners = null;
    }), this.promise.then = (o) => {
      let s;
      const r = new Promise((a) => {
        i.subscribe(a), s = a;
      }).then(o);
      return r.cancel = function() {
        i.unsubscribe(s);
      }, r;
    }, t(function(s, r, a) {
      i.reason || (i.reason = new De(s, r, a), n(i.reason));
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
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (i) => {
      t.abort(i);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Ki(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
function dl(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function hl(e) {
  return f.isObject(e) && e.isAxiosError === !0;
}
const sn = {
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
Object.entries(sn).forEach(([e, t]) => {
  sn[t] = e;
});
function Qi(e) {
  const t = new Pe(e), n = _i(Pe.prototype.request, t);
  return f.extend(n, Pe.prototype, t, { allOwnKeys: !0 }), f.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return Qi(Te(e, o));
  }, n;
}
const M = Qi(et);
M.Axios = Pe;
M.CanceledError = De;
M.CancelToken = ul;
M.isCancel = Ui;
M.VERSION = Ji;
M.toFormData = Pt;
M.AxiosError = C;
M.Cancel = M.CanceledError;
M.all = function(t) {
  return Promise.all(t);
};
M.spread = dl;
M.isAxiosError = hl;
M.mergeConfig = Te;
M.AxiosHeaders = Z;
M.formToJSON = (e) => Hi(f.isHTMLForm(e) ? new FormData(e) : e);
M.getAdapter = Wi.getAdapter;
M.HttpStatusCode = sn;
M.default = M;
const {
  Axios: gc,
  AxiosError: mc,
  CanceledError: wc,
  isCancel: yc,
  CancelToken: bc,
  VERSION: Sc,
  all: vc,
  Cancel: xc,
  isAxiosError: Rc,
  spread: Fc,
  toFormData: kc,
  AxiosHeaders: _c,
  HttpStatusCode: Cc,
  formToJSON: Pc,
  getAdapter: Tc,
  mergeConfig: Oc
} = M, fl = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, o] of t)
    n[i] = o;
  return n;
}, pl = {
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
      uuid: Ns(),
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
      return this.axios ? this.axios : this.$globalVueQuintableaxios ? this.$globalVueQuintableaxios : M;
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
      let n = !1;
      this.config.select && (n = !0);
      let i = 250;
      this.config.ajaxRequestDelay && (i = this.config.ajaxRequestDelay);
      let o = "bg-muted";
      this.config.hoverClass === !1 ? o = "" : this.config.hoverClass && this.config.hoverClass !== !0 && (o = this.config.hoverClass);
      let s = "bg-muted";
      this.config.activeClass === !1 ? s = "" : this.config.activeClass && this.config.activeClass !== !0 && (s = this.config.activeClass);
      let r = !1;
      this.config.multiSort && (r = !0);
      let a = !1;
      this.config.pageSort && (a = !0);
      let d = !1;
      this.config.multiSortSelect && (d = !0);
      let u = !1;
      this.config.pageSortSelect && (u = !0);
      let l = !1;
      this.config.ajaxUrl && (l = this.config.ajaxUrl);
      let c = "post";
      ["pre", "post"].includes(this.config.selectPosition) && (c = this.config.selectPosition);
      let h = !1;
      this.config.expandedAll && (h = !0);
      let g = !1;
      this.config.useFuzzySearch && (g = !0);
      let m = !1;
      this.config.prettySelect && (m = !0);
      let w = !1;
      this.config.rowsSelect && (w = !0);
      let y = !1;
      this.config.keepSelect && (y = !0);
      let v = !1;
      this.config.disallowAllOption && (v = !0);
      let S = !1;
      this.config.hideEmptyColumns && (S = !0);
      let x = "none";
      ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns) && (x = this.config.ignoreSortEmptyColumns);
      let P = !1;
      this.config.search && (P = !0);
      let _ = 1;
      this.config.searchLength && (_ = this.config.searchLength);
      let N = "Search...";
      this.config.searchPlaceholder && (N = this.config.searchPlaceholder);
      let q = "Multiple sort";
      this.config.multiSortPlaceholder && (q = this.config.multiSortPlaceholder);
      let j = "Page sort";
      this.config.pageSortPlaceholder && (j = this.config.pageSortPlaceholder);
      let $ = "AND";
      ["AND", "OR"].includes(this.config.filterRelation) && ($ = this.config.filterRelation);
      let G = "AND";
      ["AND", "OR"].includes(this.config.filterGroupRelation) && (G = this.config.filterGroupRelation);
      let U = "Rows per page:";
      this.config.rowsPlaceholder && (U = this.config.rowsPlaceholder);
      let D = "No rows...";
      this.config.emptyPlaceholder && (D = this.config.emptyPlaceholder);
      let H = !1;
      this.config.selectAll && (H = !0);
      let K = !1;
      this.config.selectAllRows && (K = !0), l && K && (console.warn(
        "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
      ), K = !1);
      let B = !1;
      this.config.storeState && (B = !0), !this.identifier && this.config.storeState && (console.warn(
        "Option storeState was deactivated automatically because table identifier is not set!"
      ), B = !1);
      const ae = "test-local-storage";
      try {
        localStorage.setItem(ae, ae), localStorage.removeItem(ae);
      } catch (k) {
        console.warn(
          "Option storeState was deactivated automatically because local storage is not available!",
          k
        ), B = !1;
      }
      let Q = !1;
      this.config.defaultSelected && (Q = !0);
      let ce = !1;
      this.config.hideRowToggle && (ce = !0);
      let me = !1;
      this.config.enableRowTabIndex && (me = !0);
      let ne = "chevron-up";
      this.config.expandedRowIcon && typeof this.config.expandedRowIcon == "string" && ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
        this.config.expandedRowIcon.toLowerCase()
      ) && (ne = this.config.expandedRowIcon.toLowerCase());
      let ee = "chevron-down";
      this.config.collapsedRowIcon && typeof this.config.collapsedRowIcon == "string" && ["chevron-down", "plus", "caret-down", "eye"].includes(
        this.config.collapsedRowIcon.toLowerCase()
      ) && (ee = this.config.collapsedRowIcon.toLowerCase());
      let ie = 5;
      this.config.pageRange && (ie = this.config.pageRange);
      let tt = "col-12";
      this.config.searchClass && (tt = this.config.searchClass);
      let hn = "row";
      this.config.searchContainerClass && (hn = this.config.searchContainerClass);
      let fn = "GET";
      this.config.requestMethod && typeof this.config.requestMethod == "string" && ["POST", "GET"].includes(this.config.requestMethod.toUpperCase()) && (fn = this.config.requestMethod.toUpperCase());
      let pn = 0, At = [], Et = [], Lt = [], nt = [], Nt = [], qt = [], Me = [], jt = [], gn = null;
      if (this.config.columns) {
        pn = this.config.columns.length;
        for (let k = 0; k < this.config.columns.length; k++)
          Me[k] = "", this.config.columns[k] && this.config.columns[k].headline ? (At[k] = this.config.columns[k].headline, Me[k] += this.config.columns[k].headline.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()) : At[k] = "", Me[k] += " column-" + (k + 1), this.config.columns[k].classes && (Me[k] += " " + this.config.columns[k].classes), this.config.columns[k] && this.config.columns[k].breakpoint ? Et[k] = this.config.columns[k].breakpoint : Et[k] = "", this.config.columns[k] && this.config.columns[k].sort ? this.config.columns[k].firstSortDirection && typeof this.config.columns[k].firstSortDirection == "string" && ["DESC", "ASC"].includes(
            this.config.columns[k].firstSortDirection.toUpperCase()
          ) ? nt[k] = this.config.columns[k].firstSortDirection.toUpperCase() : nt[k] = !0 : nt[k] = !1, this.config.columns[k] && this.config.columns[k].ignoreEmpty ? jt[k] = !0 : jt[k] = !1, this.config.columns[k] && this.config.columns[k].sticky ? Nt[k] = !0 : Nt[k] = !1, this.config.columns[k] && this.config.columns[k].hidden ? Lt[k] = !0 : Lt[k] = !1, this.config.columns[k] && this.config.columns[k].align ? qt[k] = this.config.columns[k].align : qt[k] = !1;
        gn = this.config.columns;
      }
      return {
        headlines: At,
        columnClasses: Me,
        sorts: nt,
        pageSort: a,
        multiSort: r,
        pageSortSelect: u,
        multiSortSelect: d,
        filterGroupRelation: G,
        filterRelation: $,
        rowsSelect: w,
        keepSelect: y,
        disallowAllOption: v,
        defaultSelected: Q,
        searchLength: _,
        search: P,
        searchPlaceholder: N,
        useFuzzySearch: g,
        ajaxUrl: l,
        pageSortPlaceholder: j,
        multiSortPlaceholder: q,
        rowsPlaceholder: U,
        emptyPlaceholder: D,
        stickyCols: Nt,
        alignments: qt,
        breakpoints: Et,
        hiddenCols: Lt,
        ignoreEmpty: jt,
        hideEmptyColumns: S,
        ignoreSortEmptyColumns: x,
        pagination: e,
        numberOfVisibleRowsFillerWord: t,
        select: n,
        selectAll: H,
        selectAllRows: K,
        hoverClass: o,
        activeClass: s,
        expandedAll: h,
        pageRange: ie,
        prettySelect: m,
        number: pn,
        columns: gn,
        hideRowToggle: ce,
        enableRowTabIndex: me,
        expandedRowIcon: ne,
        collapsedRowIcon: ee,
        selectPosition: c,
        searchClass: tt,
        searchContainerClass: hn,
        requestMethod: fn,
        storeState: B,
        ajaxRequestDelay: i
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
        let n = this.currentPage * this.currentRowsPerPage, i = n - this.currentRowsPerPage, o = 0;
        for (let s in t)
          Object.prototype.hasOwnProperty.call(t, s) && (s = parseInt(s), o < n && o >= i && (e[t[s]] = !0), o++);
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
          let n = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t], i = {};
          for (let o = 0; o < this.hiddenBreakpoints.length; o++) {
            let s = this.hiddenBreakpoints[o];
            for (let r = 0; r < this.configFinal.columns.length; r++) {
              let a = this.configFinal.columns[r];
              !(this.configFinal.hiddenCols[r] || !this.configFinal.ignoreEmpty[r] && this.configFinal.hideEmptyColumns && (this.isColEmpty(r) || this.isColEmpty(r, t)) || this.emptyColumns[r]) && a.breakpoint && (a.breakpoint.toLocaleLowerCase() === "all" || a.breakpoint.toLocaleLowerCase() === s) && !a.sticky && !a.alwaysExpanded && (i[r] = n[r]);
            }
          }
          e[t] = i;
        }
      return e;
    },
    stickyRows() {
      let e = {};
      for (let t = 0; t < this.rowsFinal.length; t++) {
        let n = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t], i = {};
        for (let o = 0; o < this.hiddenBreakpoints.length; o++) {
          let s = this.hiddenBreakpoints[o];
          for (let r = 0; r < this.configFinal.columns.length; r++) {
            let a = this.configFinal.columns[r];
            const d = this.configFinal.hiddenCols[r] || !this.configFinal.ignoreEmpty[r] && this.configFinal.hideEmptyColumns && (this.isColEmpty(r) || this.isColEmpty(r, t)) || this.emptyColumns[r];
            (!d && a.sticky || !d && a.breakpoint && (a.breakpoint.toLocaleLowerCase() === "all" || a.breakpoint.toLocaleLowerCase() === s) && a.alwaysExpanded) && (i[r] = n[r]);
          }
        }
        e[t] = i;
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
        let n = this.rowsFinal[t].align, i = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t];
        for (let o = 0; o < i.length; o++) {
          let s = [], r = this.configFinal.alignments[o];
          if ((i[o].align || n || r) && (i[o].align ? s.push("text-" + i[o].align) : n ? s.push("text-" + n) : s.push("text-" + r)), i[o].classes) {
            let a = i[o].classes.split(" ");
            Array.prototype.push.apply(s, a);
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
        let n = 0;
        const i = this.visibleRowIndexes[t];
        for (let o = 0; o < this.hiddenBreakpoints.length; o++) {
          let s = this.hiddenBreakpoints[o];
          for (let r = 0; r < this.configFinal.columns.length; r++) {
            let a = this.configFinal.columns[r];
            if (!(this.configFinal.hiddenCols[r] || !this.configFinal.ignoreEmpty[r] && this.configFinal.hideEmptyColumns && (this.isColEmpty(r) || this.isColEmpty(r, i)) || this.emptyColumns[r]) && a.breakpoint && (a.breakpoint.toLocaleLowerCase() === "all" || a.breakpoint.toLocaleLowerCase() === s)) {
              n++;
              break;
            }
          }
        }
        e[i] = n;
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
        let n = [];
        this.configFinal.alignments[t] && n.push("text-" + this.configFinal.alignments[t]), this.configFinal.sorts[t] && (n.push("sort-header"), this.currentSortIndexes[t] && n.push("active")), e.push(
          n.join(" ") + "  quintable--table-container--table--header-row--th " + this.configFinal.columnClasses[t]
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
        let n;
        this.pageRange % 2 === 0 ? n = this.pageRange / 2 : (n = (this.pageRange - 1) / 2, this.currentPage + n > this.pages && n++), t = this.currentPage - n;
      }
      t = Math.max(t + this.pageOffset, 1);
      for (let n = 0; n < this.pageRange && !(n + t > this.pages); n++)
        e.push(n + t);
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
        let n = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t], i = !1, o = !1;
        if (this.configFinal.search && this.query.length >= this.configFinal.searchLength) {
          for (let s = 0; s < n.length; s++) {
            let r = n[s], a = r.html ? r.html : r.text;
            if (a) {
              if (this.configFinal.useFuzzySearch && vn(
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
            for (let s = 0; s < this.rowsFinal[t].keywords.length; s++) {
              if (this.configFinal.useFuzzySearch && vn(
                (this.rowsFinal[t].keywords[s] + "").toLowerCase(),
                (this.query + "").toLowerCase()
              ).score > 6) {
                i = !0;
                break;
              }
              if ((this.rowsFinal[t].keywords[s] + "").toLowerCase().indexOf((this.query + "").toLowerCase()) !== -1) {
                i = !0;
                break;
              }
            }
          o = !0;
        }
        if (this.filterActive && !this.rowsFinal[t].filters)
          i = !1;
        else if ((o && i || !o) && this.filterActive) {
          if (this.filterGroups.length)
            i = this.doFiltering(this.rowsFinal[t].filters);
          else {
            let s = {
              items: [],
              relation: this.configFinal.filterRelation
            };
            for (let r in this.filtersFinal)
              Object.prototype.hasOwnProperty.call(this.filtersFinal, r) && s.items.push({ name: r });
            i = this.doFilteringForGroup(
              this.filtersFinal,
              this.rowsFinal[t].filters,
              s
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
      let e = [];
      for (let t = 0; t < this.configFinal.number; t++)
        //headline is not empty
        this.configFinal.headlines[t] && //show breakpoints match with set settings
        //no show breakpoint is set
        (!this.configFinal.columns[t].showHeadlineBreakpoint || //show breakpoint is set and the hidden breakpoints contain this breakpoint
        this.configFinal.columns[t].showHeadlineBreakpoint && this.hiddenBreakpoints.findIndex(
          (n) => this.configFinal.columns[t] && n === this.configFinal.columns[t].showHeadlineBreakpoint
        ) !== -1) && //hide breakpoints match with set settings
        //no hide breakpoint is set
        (!this.configFinal.columns[t].hideHeadlineBreakpoint || //hide breakpoint is set and the hidden breakpoints contain this breakpoint
        this.configFinal.columns[t].hideHeadlineBreakpoint && this.hiddenBreakpoints.findIndex(
          (n) => this.configFinal.columns[t] && n === this.configFinal.columns[t].hideHeadlineBreakpoint
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
      for (let n = 0; n < this.configFinal.number; n++) {
        const i = this.configFinal.ignoreEmpty[n], o = this.configFinal.sorts[n];
        !this.configFinal.hideEmptyColumns || i || t === "none" && o || t === "active" && Object.keys(this.currentSortIndexes).includes(n + "") ? e[n] = !1 : e[n] = this.isColEmpty(n);
      }
      return e;
    },
    filtersFinal() {
      return !this.configFinal.storeState || !this.storedState.filters ? this.filters : this.storedState.filters;
    },
    rowClasses() {
      const e = {};
      for (let t = 0; t < this.visibleRowIndexes.length; t++) {
        const n = this.visibleRowIndexes[t], i = [];
        this.rowsFinal[n].classes && i.push(this.rowsFinal[n].classes), this.hoveredRow === n && i.push(this.configFinal.hoverClass), this.activeRow === n && i.push(this.configFinal.activeClass), this.openRows[n] && i.push("row-expanded"), this.hiddenColumns[n] > 0 && !this.openRows[n] && i.push("row-collapsed"), e[n] = i.join(" ");
      }
      return e;
    }
  },
  watch: {
    rowsFinal: {
      handler(e) {
        if (e && e.length)
          for (let t = 0; t < e.length; t++) {
            let n = e[t].cells ? e[t].cells : e[t];
            n.length !== this.config.columns.length && console.error(
              `Column count on row index ${t} doesn't fit for column config! expected: ${this.config.columns.length}, got: ${n.length}` + (this.configFinal.ajaxUrl ? ` | URL: ${this.configFinal.ajaxUrl}` : "") + (this.identifier ? ` | IDENTIFIER: ${this.identifier}` : ""),
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
          const n = this.configFinal.selectAllRows ? this.rowsFinal.map((i, o) => o) : this.visibleRowIndexes;
          for (let i = 0; i < e.length; i++) {
            const o = e[i].key, s = e[i].value;
            for (let r = 0; r < n.length; r++) {
              const a = n[r];
              !this.rowsFinal[a].disableSelect && this.rowsFinal[a][o] === s && (this.selected[a] = !0, t++);
            }
          }
          this.configFinal.selectAllRows ? this.allSelectedCustom = t && t === this.rowsFinal.filter((i) => !i.disableSelect).length : this.allSelectedCustom = t && t === this.rowsFinal.filter(
            (i, o) => !i.disableSelect && this.visibleRows[this.sortedIndexes[o]]
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
          (o) => o === this.activeRow
        ) < 0 && (this.activeRow = null), this.currentPage !== 1 ? this.currentPage = 1 : this.configFinal.keepSelect || this.resetSelect("filteredRows watcher");
        const i = [];
        for (let o = 0; o < e.length; o++) {
          const s = o.toString();
          e[o] && i.push(
            this.rowsFinal[this.sortedIndexes[s] ? this.sortedIndexes[s] : o]
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
        const n = !(this.configFinal.storeState && this.storedState.query);
        clearTimeout(this.queryAjaxTimeout), this.queryAjaxTimeout = setTimeout(() => {
          this.loadViaAjax(n, n, "QUERY");
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
        for (let n in this.sortedIndexes)
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, n) && e[this.sortedIndexes[n]]) {
            const i = this.rowsFinal[this.sortedIndexes[n]];
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
        let t, n;
        for (let i in this.currentSortIndexes)
          if (Object.prototype.hasOwnProperty.call(
            this.currentSortIndexes,
            i
          ) && this.currentSortIndexes[i].order === 0) {
            t = this.currentSortIndexes[i], n = i;
            break;
          }
        this.currentSortIndexes = {
          [n]: t
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
      const t = this.visibleRowIndexes.findIndex((n) => n === e);
      this.$emit("active:row", this.rowsFinal[e], "active:row", t);
    }
  },
  created() {
    if (this.configFinal.storeState) {
      const n = localStorage.getItem(
        `vue-quintable-${this.identifier}-filters`
      );
      if (n) {
        const d = JSON.parse(n);
        for (let u in this.filters)
          Object.prototype.hasOwnProperty.call(this.filters, u) && !Object.prototype.hasOwnProperty.call(d, u) && (d[u] = this.filters[u]);
        this.storedState.filters = d;
      }
      const i = localStorage.getItem(
        `vue-quintable-${this.identifier}-query`
      );
      i && (this.storedState.query = i);
      const o = localStorage.getItem(
        `vue-quintable-${this.identifier}-rows-per-page`
      );
      o && (this.storedState["rows-per-page"] = parseInt(o));
      const s = localStorage.getItem(
        `vue-quintable-${this.identifier}-selected-rows`
      );
      s && (this.storedState["selected-rows"] = JSON.parse(s));
      const r = localStorage.getItem(
        `vue-quintable-${this.identifier}-current-page`
      );
      r && (this.storedState["current-page"] = parseInt(r));
      const a = localStorage.getItem(
        `vue-quintable-${this.identifier}-sort-indexes`
      );
      a && (this.storedState["sort-indexes"] = JSON.parse(a));
    }
    this.initLists();
    let e = 0;
    const t = this.configFinal.selectAllRows ? this.rowsFinal.map((n, i) => i) : this.visibleRowIndexes;
    for (let n = 0; n < t.length; n++) {
      let i = this.rowsFinal[n];
      i.selected && (this.selected[n] = !0), i.selected && e++;
    }
    !this.configFinal.selectAllRows && e && e === this.rowsFinal.filter(
      (n, i) => !n.disableSelect && this.visibleRows[this.sortedIndexes[i]]
    ).length ? this.allSelectedCustom = !0 : this.configFinal.selectAllRows && e && e === this.rowsFinal.filter((n) => !n.disableSelect).length && (this.allSelectedCustom = !0), this.initialSearchTerm && (this.query = this.initialSearchTerm), this.storedState.query && (this.query = this.storedState.query), this.storedState["rows-per-page"] && (this.customRowsPerPage = this.storedState["rows-per-page"]), this.storedState["sort-indexes"] && (this.currentSortIndexes = this.storedState["sort-indexes"], this.sort(!0)), this.storedState["current-page"] && this.$nextTick(() => {
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
      return (t > -1 ? [t] : this.visibleRowIndexes).map((o) => this.rowsFinal[o]).filter((o) => {
        const s = o.cells ? o.cells : o;
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
        let n = Math.min(t, this.pages - this.pageRange);
        this.pageOffset = Math.min(n, this.pages - this.currentPage);
      } else e < 0 ? this.pageOffset = Math.max(t, -(this.pages - this.pageRange)) : this.pageOffset = 0;
    },
    cellFormatters(e, t) {
      if (typeof this.configFinal.columns[e].cellFormatter == "function") {
        let n = this.configFinal.columns[e].cellFormatter(t);
        return typeof n != "object" && (n = {
          value: n
        }), n;
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
      let n = Object.keys(this.selected).slice().map((i) => !!this.selected[i] || !!(this.rowsFinal[parseInt(i)] && this.rowsFinal[parseInt(i)].disableSelect));
      n[t] = !!e, this.configFinal.selectAllRows ? n.indexOf(!1) === -1 ? this.allSelectedProperty = !0 : this.allSelectedProperty = !1 : (n = n.filter((i, o) => this.visibleRowIndexes.includes(o)), n.indexOf(!1) !== -1 ? this.allSelectedProperty = !1 : n.indexOf(!1) === -1 && (this.allSelectedProperty = !0));
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
        const n = parseInt(t);
        this.$emit(
          "auxclick:row",
          this.rowsFinal[n],
          "auxclick:row",
          e.target,
          e,
          n
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
      let n = this.hasSomeParentTagName(e.target, "a"), i = this.hasSomeParentTheClass(
        e.target,
        "prevent-toggle"
      );
      const o = t.toString(), s = parseInt(t);
      this.hiddenColumns[o] && !n && !i && (this.openRows[o] ? (this.openRows[o] = !1, this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[o]],
        "collapse:row",
        this.sortedIndexes[o]
      )) : (this.openRows[o] = !0, this.$emit(
        "expand:row",
        this.rowsFinal[this.sortedIndexes[o]],
        "expand:row",
        this.sortedIndexes[o]
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
          let n = this.currentSortIndexes[t];
          n.order > this.currentSortIndexes[e].order && n.order--, this.currentSortIndexes[t] = n;
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
      let n = 0;
      for (let i in this.sortedIndexes)
        Object.prototype.hasOwnProperty.call(this.sortedIndexes, i) && (i = parseInt(i), !this.rowsFinal[this.sortedIndexes[i]].disableSelect && (!this.configFinal.selectAllRows && this.visibleRows[this.sortedIndexes[i]] || this.configFinal.selectAllRows && this.filteredRows[this.sortedIndexes[i]]) ? (this.selected[this.sortedIndexes[i]] = t, n++) : this.selected[this.sortedIndexes[i]] = t);
      t && (this.configFinal.selectAllRows ? this.allSelectedCustom = n && n === this.rowsFinal.filter((i) => !i.disableSelect).length : this.allSelectedCustom = n && n === this.rowsFinal.filter(
        (i, o) => !i.disableSelect && this.visibleRows[this.sortedIndexes[o]]
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
      for (let n = 0; n < this.filterGroups.length; n++)
        t.push(
          this.doFilteringForGroup(
            this.filtersFinal,
            e,
            this.filterGroups[n]
          )
        ), this.DEBUG && n < this.filterGroups.length - 1 && console.log(this.configFinal.filterGroupRelation);
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
    doFilteringForGroup(e, t, n, i = 0) {
      let o = "   ";
      for (let r = 0; r < i; r++)
        o += "   ";
      if (this.DEBUG) {
        if (n.items) {
          let r = o, a = n.items.slice(), d = function(u, l) {
            return u.name === void 0 ? 1 : l.name === void 0 ? -1 : 0;
          };
          a = a.sort(d);
          for (let u = 0; u < a.length; u++)
            a[u].name && (r += a[u].name, u < a.length - 1 && (r += " " + n.relation + " "));
          console.log(r);
        }
        console.log(o, "GROUP:", n);
      }
      let s = !1;
      if (n.relation === "AND") {
        for (let r in e)
          if (Object.prototype.hasOwnProperty.call(e, r)) {
            if (this.filterGroups.length && !this.findInFilterGroups(r, this.filterGroups))
              continue;
            let a = !0;
            for (let d = 0; d < n.items.length; d++) {
              let u = n.items[d];
              if (u.name && t[u.name] === void 0) {
                a = !1;
                break;
              }
            }
            if (a)
              for (let d = 0; d < n.items.length; d++) {
                let u = n.items[d];
                if (s = !0, u.items && (s = this.doFilteringForGroup(
                  e,
                  t,
                  u,
                  i + 1
                )), !s)
                  break;
                if (typeof e[u.name] == "undefined")
                  continue;
                let l = typeof e[u.name] == "object" && e[u.name] !== null && e[u.name].operator && this.operators.includes(e[u.name].operator) ? e[u.name].operator : this.defaultOperator, c = this.getFilterValues(e[u.name]);
                const h = typeof e[u.name].compare == "function" ? e[u.name].compare : this.operatorFunctions[l];
                for (let g = 0; g < c.length; g++)
                  if (!h(
                    c[g],
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
      } else if (n.relation === "OR" || n.items) {
        for (let r in e)
          if (Object.prototype.hasOwnProperty.call(e, r)) {
            if (this.filterGroups.length && !this.findInFilterGroups(r, this.filterGroups))
              continue;
            for (let a = 0; a < n.items.length; a++) {
              let d = n.items[a];
              if (d.items && (s = this.doFilteringForGroup(
                e,
                t,
                d,
                i + 1
              ), s))
                break;
              if (typeof e[d.name] == "undefined")
                continue;
              let u = typeof e[d.name] == "object" && e[d.name] !== null && e[d.name].operator && this.operators.includes(e[d.name].operator) ? e[d.name].operator : this.defaultOperator, l = this.getFilterValues(e[d.name]);
              const c = typeof e[d.name].compare == "function" ? e[d.name].compare : this.operatorFunctions[u];
              for (let h = 0; h < l.length; h++)
                if (c(
                  l[h],
                  t[d.name]
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
    findInFilterGroups(e, t, n = 0) {
      if (!t)
        return !1;
      let i = !1;
      for (let o = 0; o < t.length; o++) {
        let s = t[o];
        if (s.items && (i = this.findInFilterGroups(e, s.items, n + 1), i))
          break;
        if (s.name === e) {
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
      const n = parseInt(e), i = e.toString();
      if (!this.configFinal.sorts[n])
        return;
      let o;
      this.currentSortIndexes[i] ? (o = this.currentSortIndexes[i], o.asc = !o.asc) : (this.multiSort || (this.currentSortIndexes = {}), o = {
        headline: this.configFinal.headlines[n],
        index: n,
        asc: this.configFinal.sorts[n] === !0 ? !0 : this.configFinal.sorts[n] === "ASC",
        order: this.numberOfSorts
      }), typeof t != "undefined" && (o.asc = t), this.currentSortIndexes[n] = o, this.configFinal.storeState && localStorage.setItem(
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
      let t = this.rowsFinal.slice(), n = [], i = [], o = {};
      if (this.pageSort) {
        if (i = this.visibleRowIndexes.slice(), !i.length) {
          const c = this.configFinal.pagination ? this.configFinal.pagination : this.rowsFinal.length;
          for (let h = 0; h < c; h++)
            i.push(h);
        }
        let l = 0;
        for (let c = 0; c < t.length; c++)
          t[c].index = c, i.indexOf(c) !== -1 && (l < this.configFinal.pagination && n.push(t[c]), l++);
        if (Object.keys(this.sortedIndexes).length)
          o = Object.assign({}, this.sortedIndexes);
        else
          for (let c = 0; c < t.length; c++)
            o[c.toString()] = c;
      } else {
        n = this.rowsFinal.slice();
        for (let l = 0; l < n.length; l++)
          n[l].index = l;
      }
      let s = [];
      for (let l in this.currentSortIndexes)
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, l)) {
          let c = this.currentSortIndexes[l];
          c.index = l, s.push(c);
        }
      s.sort(function(l, c) {
        return l.order - c.order;
      });
      let r = (l, c, h, g) => {
        g = g || 0;
        let m = h[g], w = m.index, y = l.cells ? l.cells : l, v = c.cells ? c.cells : c, S = typeof y[w].sortValue != "undefined" && y[w].sortValue !== null ? y[w].sortValue : y[w].html ? y[w].html : y[w].text;
        typeof y[w].computeSortValue == "function" && (S = y[w].computeSortValue(this.currentSortIndexes));
        let x = typeof v[w].sortValue != "undefined" && v[w].sortValue !== null ? v[w].sortValue : v[w].html ? v[w].html : v[w].text;
        return typeof v[w].computeSortValue == "function" && (S = v[w].computeSortValue(this.currentSortIndexes)), typeof S == "string" && (S = S.toLowerCase()), typeof x == "string" && (x = x.toLowerCase()), isNaN(S) ? (typeof S == "string" && S.match(/^-?\d+$/) || typeof S == "string" && S.match(/^\d+\.\d+$/)) && (S = parseFloat(S)) : S = parseFloat(S), isNaN(x) ? (typeof x == "string" && x.match(/^-?\d+$/) || typeof x == "string" && x.match(/^\d+\.\d+$/)) && (x = parseFloat(x)) : x = parseFloat(x), m.asc ? S > x ? 1 : S < x ? -1 : h[g + 1] ? r(l, c, h, g + 1) : 1 : S < x ? 1 : S > x ? -1 : h[g + 1] ? r(l, c, h, g + 1) : -1;
      };
      n.sort(function(l, c) {
        return r(l, c, s);
      });
      const a = [];
      let d = 0, u = 0;
      for (let l = 0; l < t.length; l++) {
        const c = l.toString();
        this.pageSort && i.indexOf(l) !== -1 ? (d < this.configFinal.pagination ? (a.push(n[u]), u++) : a.push(t[o[c]]), d++) : this.pageSort ? a.push(t[o[c]]) : a.push(n[l]);
      }
      for (let l = 0; l < a.length; l++) {
        const c = l.toString();
        this.sortedIndexes[c] = parseInt(a[l].index);
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
    loadViaAjax(e = !1, t = !0, n = null) {
      this.DEBUG && console.log("CALLED FROM:", n);
      let i = this.query;
      if (i && i.length < this.configFinal.searchLength && (this.lastQuery.length < i.length || this.lastQuery.length < this.configFinal.searchLength))
        return;
      if (!i && this.lastQuery) {
        const r = this.lastQuery;
        if (this.lastQuery = "", r.length < this.configFinal.searchLength)
          return;
      } else i && i.length < this.configFinal.searchLength && (i = "");
      this.cancelSource && this.cancelSource.cancel("Operation canceled by the user."), this.clearLists(t), this.ajaxRows = [], e && (this.currentPage = 1, this.resetSelect("loadViaAjax method")), this.loaderHeight = this.$refs["height-wrapper"] ? this.$refs["height-wrapper"].clientHeight : 0, this.fetching = !0;
      let o = {
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
      const s = {
        "Content-Type": "application/json"
      };
      this.axiosFinal.request(this.configFinal.ajaxUrl, {
        method: this.configFinal.requestMethod,
        params: this.configFinal.requestMethod === "GET" ? o : null,
        data: this.configFinal.requestMethod === "POST" ? o : null,
        cancelToken: this.cancelSource.token,
        headers: s
      }).then((r) => {
        if (!r.data.rows || typeof r.data.rows.length == "undefined")
          throw "Response data has to contain rows property. Please see Readme.md for details";
        if (typeof r.data.all == "undefined")
          throw "Response data has to contain all property. Please see Readme.md for details";
        this.ajaxAll = r.data.all, this.ajaxPages = Math.max(
          1,
          Math.ceil(r.data.all / this.currentRowsPerPage)
        ), this.$emit(
          "ajax:rows",
          {
            rows: r.data.rows,
            old: JSON.parse(JSON.stringify(this.ajaxRows)),
            all: this.ajaxAll
          },
          "ajax:rows"
        ), r.data.all && (this.ajaxRows = r.data.rows, this.initLists()), this.fetching = !1;
      }).catch((r) => {
        this.axiosFinal.isCancel(r) ? console.log("Request canceled", r.message) : (this.fetching = !1, console.error(r), this.$emit("ajax:error", r, "ajax:error"));
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
        const t = Object.values(this.selected).filter((n) => n).length;
        this.configFinal.selectAllRows ? this.allSelectedCustom = t && t === this.rowsFinal.length : this.allSelectedCustom = t && t === this.visibleRows.filter((n) => n).length, e && delete this.storedState["selected-rows"];
      }
    },
    checkKey(e) {
      if (this.activeRow !== null) {
        if (e.keyCode === 40) {
          e.preventDefault();
          const t = this.visibleRowIndexes.findIndex(
            (n) => n === this.activeRow
          );
          t === this.visibleRowIndexes.length - 1 ? this.activeRow = 0 : this.activeRow = this.visibleRowIndexes[t + 1];
        }
        if (e.keyCode === 38) {
          e.preventDefault();
          const t = this.visibleRowIndexes.findIndex(
            (n) => n === this.activeRow
          );
          t === 0 ? this.activeRow = this.visibleRowIndexes[this.visibleRowIndexes.length - 1] : this.activeRow = this.visibleRowIndexes[t - 1];
        }
      }
    }
  }
}, gl = { class: "table-wrapper quintable" }, ml = { class: "breakpoints quintable--breakpoints" }, wl = { ref: "xs" }, yl = {
  ref: "sm",
  class: "d-none d-sm-block"
}, bl = {
  ref: "md",
  class: "d-none d-md-block"
}, Sl = {
  ref: "lg",
  class: "d-none d-lg-block"
}, vl = {
  ref: "xl",
  class: "d-none d-xl-block"
}, xl = {
  ref: "xxl",
  class: "d-none d-xxl-block"
}, Rl = { class: "header slot slot-header quintable--header" }, Fl = ["placeholder"], kl = { class: "slot slot-after-search quintable--after-search-container" }, _l = {
  ref: "height-wrapper",
  class: "clearfix quintable--table-container"
}, Cl = { key: 0 }, Pl = { class: "vue-quintable-header-row quintable--table-container--table--header-row" }, Tl = {
  key: 0,
  class: "placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th"
}, Ol = {
  key: 1,
  class: "select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre"
}, Al = { class: "p-1" }, El = {
  key: 1,
  class: "mb-0 mt-0"
}, Ll = ["title", "onClick"], Nl = ["innerHTML"], ql = {
  key: 1,
  class: "headline quintable--table-container--table--header-row--th--headline"
}, jl = {
  key: 2,
  class: "sorting-icon ms-2 quintable--table-container--table--header-row--th--sorting-icon"
}, Dl = ["onClick"], Ml = {
  key: 0,
  class: "badge bg-info text-white"
}, Bl = { key: 1 }, Hl = {
  key: 2,
  class: "select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post"
}, Ul = {
  key: 1,
  class: "mb-0 mt-0"
}, zl = ["id", "onClick", "onAuxclick", "onMouseenter"], Vl = {
  key: 0,
  class: "toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td"
}, Il = { key: 0 }, $l = { key: 0 }, Gl = { key: 1 }, Wl = {
  key: 1,
  class: "mb-0 mt-0"
}, Jl = ["onUpdate:modelValue", "disabled", "onChange"], Kl = ["id", "onClick", "onAuxclick"], Ql = ["innerHTML"], Xl = ["innerHTML"], Yl = {
  key: 1,
  class: "mb-0 mt-0"
}, Zl = ["onUpdate:modelValue", "disabled", "onChange"], ea = ["onMouseenter", "onClick"], ta = ["colspan"], na = { class: "mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table" }, ia = ["id"], sa = {
  key: 0,
  class: "toggle-cell invisible"
}, oa = { key: 0 }, ra = { key: 0 }, la = { key: 1 }, aa = ["onClick"], ca = ["innerHTML"], ua = {
  key: 1,
  class: "headline"
}, da = {
  key: 2,
  class: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
}, ha = ["onClick"], fa = {
  key: 0,
  class: "badge bg-info text-white"
}, pa = { key: 1 }, ga = ["colspan", "onClick"], ma = ["innerHTML"], wa = {
  key: 1,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value"
}, ya = ["innerHTML"], ba = {
  key: 3,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component"
}, Sa = {
  key: 4,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text"
}, va = ["id"], xa = {
  key: 0,
  class: "toggle-cell invisible"
}, Ra = { key: 0 }, Fa = { key: 0 }, ka = { key: 1 }, _a = ["onClick"], Ca = ["innerHTML"], Pa = {
  key: 1,
  class: "headline"
}, Ta = {
  key: 2,
  class: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
}, Oa = ["onClick"], Aa = {
  key: 0,
  class: "badge bg-info text-white"
}, Ea = { key: 1 }, La = ["colspan", "onClick"], Na = ["innerHTML"], qa = ["innerHTML"], ja = {
  key: 1,
  class: "clearfix slot-no-results slot quintable--table-container--no-results"
}, Da = { class: "text-center p-3 quintable--table-container--no-results--results" }, Ma = ["innerHTML"], Ba = {
  key: 1,
  class: "slot-loading slot quintable--loading"
}, Ha = { class: "loader text-center py-4 quintable--loading--loader-wrapper--loader" }, Ua = { class: "clearfix quintable--table-footer-container" }, za = { class: "row" }, Va = { class: "col-lg-4 quintable--table-footer-container--sort-container" }, Ia = { class: "col-lg-8 quintable--table-footer-container--pagination-wrapper" }, $a = {
  key: 0,
  class: "float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container"
}, Ga = {
  key: 0,
  class: "mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select"
}, Wa = ["innerHTML"], Ja = { class: "pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination" }, Ka = { class: "page-link" }, Qa = { class: "page-link" }, Xa = ["onClick"], Ya = { class: "page-link" }, Za = { class: "page-link" }, ec = { class: "page-link" }, tc = {
  key: 2,
  class: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows"
}, nc = { class: "footer slot slot-footer quintable--footer" };
function ic(e, t, n, i, o, s) {
  const r = be("quintable-font-awesome-icon"), a = be("quintable-p-check"), d = be("quintable-v-select"), u = fs("tooltip");
  return p(), b("div", gl, [
    F("div", ml, [
      F("div", wl, null, 512),
      F("div", yl, null, 512),
      F("div", bl, null, 512),
      F("div", Sl, null, 512),
      F("div", vl, null, 512),
      F("div", xl, null, 512)
    ]),
    F("div", Rl, [
      z(e.$slots, "header", {}, void 0, !0)
    ]),
    s.configFinal.search ? (p(), b("div", {
      key: 0,
      class: O(["mb-3 quintable--search-container", s.configFinal.searchContainerClass])
    }, [
      z(e.$slots, "before-search", {}, void 0, !0),
      z(e.$slots, "search", {
        value: o.query,
        loading: n.loading,
        setSearchQuery: s.setSearchQuery,
        placeholder: s.configFinal.searchPlaceholder,
        searchClass: s.configFinal.searchClass
      }, () => [
        F("div", {
          class: O(["quintable--search-container--input-container", s.configFinal.searchClass])
        }, [
          ge(F("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (l) => o.query = l),
            type: "search",
            placeholder: s.configFinal.searchPlaceholder,
            class: "form-control"
          }, null, 8, Fl), [
            [ps, o.query]
          ])
        ], 2)
      ], !0),
      z(e.$slots, "after-search", {}, void 0, !0)
    ], 2)) : R("", !0),
    F("div", kl, [
      z(e.$slots, "after-search-container", {}, void 0, !0)
    ]),
    F("div", _l, [
      s.ajaxLoading ? R("", !0) : (p(), b("table", {
        key: 0,
        ref: "table",
        class: O(["vue-quintable table quintable--table-container--table", n.tableClasses])
      }, [
        s.configFinal.headlines.length ? (p(), b("thead", Cl, [
          F("tr", Pl, [
            s.hasGeneratedRows && !s.configFinal.hideRowToggle ? (p(), b("th", Tl, t[21] || (t[21] = [
              F("wbr", null, null, -1)
            ]))) : R("", !0),
            s.configFinal.select && s.configFinal.selectPosition === "pre" ? (p(), b("th", Ol, [
              s.configFinal.selectAll && !s.noRows ? (p(), b(W, { key: 0 }, [
                s.configFinal.prettySelect ? (p(), A(a, {
                  key: 0,
                  modelValue: s.allSelectedProperty,
                  "onUpdate:modelValue": t[1] || (t[1] = (l) => s.allSelectedProperty = l),
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[2] || (t[2] = (l) => s.checkAll())
                }, {
                  extra: de(() => [
                    F("span", null, [
                      s.allSelectedProperty ? (p(), A(r, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : R("", !0)
                    ]),
                    F("span", Al, [
                      s.someSelected && !s.allSelectedProperty ? (p(), A(r, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : R("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : (p(), b("label", El, [
                  ge(F("input", {
                    "onUpdate:modelValue": t[3] || (t[3] = (l) => s.allSelectedProperty = l),
                    type: "checkbox",
                    onChange: t[4] || (t[4] = (l) => s.checkAll())
                  }, null, 544), [
                    [st, s.allSelectedProperty]
                  ])
                ]))
              ], 64)) : R("", !0)
            ])) : R("", !0),
            (p(!0), b(W, null, Ee(s.configFinal.headlines, (l, c) => (p(), b(W, null, [
              (s.configFinal.columns[c] && !s.configFinal.columns[c].breakpoint || o.hiddenBreakpoints.findIndex(
                (h) => s.configFinal.columns[c] && h === s.configFinal.columns[c].breakpoint
              ) === -1) && !s.configFinal.columns[c].sticky && !s.configFinal.hiddenCols[c] && !s.emptyColumns[c] ? (p(), b("th", {
                key: "headline-" + c,
                class: O(s.headerClass[c]),
                title: s.configFinal.columns[c].title,
                onClick: Le((h) => s.setSortColumn(c), ["stop"])
              }, [
                s.showHeadlines[c] ? (p(), b("span", {
                  key: 0,
                  class: "headline quintable--table-container--table--header-row--th--headline",
                  innerHTML: l
                }, null, 8, Nl)) : (p(), b("span", ql, t[22] || (t[22] = [
                  F("wbr", null, null, -1)
                ]))),
                s.configFinal.sorts[c] ? (p(), b("span", jl, [
                  o.currentSortIndexes[c] ? R("", !0) : (p(), A(r, {
                    key: 0,
                    icon: "sort",
                    class: "text-primary"
                  })),
                  o.currentSortIndexes[c] && o.currentSortIndexes[c].asc ? (p(), A(r, {
                    key: 1,
                    icon: "sort-amount-down-alt",
                    class: "text-primary"
                  })) : R("", !0),
                  o.currentSortIndexes[c] && !o.currentSortIndexes[c].asc ? (p(), A(r, {
                    key: 2,
                    icon: "sort-amount-down",
                    class: "text-primary"
                  })) : R("", !0),
                  o.currentSortIndexes[c] ? (p(), b("span", {
                    key: 3,
                    class: "ms-1 text-muted",
                    onClick: Le((h) => s.removeSort(c), ["stop", "prevent"])
                  }, [
                    s.numberOfSorts > 1 ? (p(), b("span", Ml, V(o.currentSortIndexes[c].order + 1), 1)) : (p(), b("small", Bl, [
                      I(r, { icon: "times" })
                    ]))
                  ], 8, Dl)) : R("", !0)
                ])) : R("", !0)
              ], 10, Ll)) : R("", !0)
            ], 64))), 256)),
            s.configFinal.select && s.configFinal.selectPosition === "post" ? (p(), b("th", Hl, [
              s.configFinal.selectAll && !s.noRows ? (p(), b(W, { key: 0 }, [
                s.configFinal.prettySelect ? (p(), A(a, {
                  key: 0,
                  modelValue: s.allSelectedProperty,
                  "onUpdate:modelValue": t[5] || (t[5] = (l) => s.allSelectedProperty = l),
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[6] || (t[6] = (l) => s.checkAll())
                }, {
                  extra: de(() => [
                    F("span", null, [
                      s.allSelectedProperty ? (p(), A(r, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : R("", !0)
                    ]),
                    F("span", null, [
                      s.someSelected && !s.allSelectedProperty ? (p(), A(r, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : R("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : (p(), b("label", Ul, [
                  ge(F("input", {
                    "onUpdate:modelValue": t[7] || (t[7] = (l) => s.allSelectedProperty = l),
                    type: "checkbox",
                    onChange: t[8] || (t[8] = (l) => s.checkAll())
                  }, null, 544), [
                    [st, s.allSelectedProperty]
                  ])
                ]))
              ], 64)) : R("", !0)
            ])) : R("", !0)
          ])
        ])) : R("", !0),
        F("tbody", {
          class: "quintable--table-container--table--tbody",
          onMouseleave: t[11] || (t[11] = (...l) => s.onMouseleaveTable && s.onMouseleaveTable(...l))
        }, [
          (p(!0), b(W, null, Ee(s.visibleRowIndexes, (l) => (p(), b(W, {
            key: "vue-quintable-" + o.uuid + "-row-" + l + "-" + o.indexesUpdatedKey
          }, [
            ge((p(), b("tr", {
              id: "vue-quintable-" + o.uuid + "-row-" + l,
              ref_for: !0,
              ref: "row-highlighted-" + l,
              class: O([s.rowClasses[l], "vue-quintable-row quintable--table-container--table--tbody--row"]),
              style: ze(s.hiddenColumns[l] > 0 ? "cursor:pointer;" : ""),
              onClick: (c) => s.onRowClick(c, l),
              onAuxclick: (c) => s.onRowAuxClick(c, l),
              onMousedown: t[10] || (t[10] = (c) => s.onRowMousedown(c)),
              onMouseenter: (c) => s.onMouseenterRow(l)
            }, [
              s.hasGeneratedRows && !s.configFinal.hideRowToggle ? (p(), b("td", Vl, [
                s.hiddenColumns[l] > 0 ? (p(), b("span", Il, [
                  o.openRows[l] ? (p(), b("span", Gl, [
                    I(r, {
                      "fixed-width": "",
                      icon: s.configFinal.expandedRowIcon
                    }, null, 8, ["icon"])
                  ])) : (p(), b("span", $l, [
                    I(r, {
                      "fixed-width": "",
                      icon: s.configFinal.collapsedRowIcon
                    }, null, 8, ["icon"])
                  ]))
                ])) : R("", !0)
              ])) : R("", !0),
              s.configFinal.select && s.configFinal.selectPosition === "pre" ? (p(), b("td", {
                key: 1,
                class: O(["select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre", { "disabled-select": s.rowsFinal[l].disableSelect }])
              }, [
                !s.rowsFinal[l].disableSelect || s.rowsFinal[l].showDisabledSelect ? (p(), b(W, { key: 0 }, [
                  s.configFinal.prettySelect ? (p(), A(a, {
                    key: 0,
                    modelValue: o.selected[l],
                    "onUpdate:modelValue": (c) => o.selected[l] = c,
                    name: "check",
                    class: "p-icon",
                    disabled: s.rowsFinal[l].disableSelect,
                    onChange: (c) => s.checkListener(c, l)
                  }, {
                    extra: de(() => [
                      F("span", null, [
                        o.selected[l] ? (p(), A(r, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : R("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : (p(), b("label", Wl, [
                    ge(F("input", {
                      "onUpdate:modelValue": (c) => o.selected[l] = c,
                      type: "checkbox",
                      disabled: s.rowsFinal[l].disableSelect,
                      onChange: (c) => s.checkListener(c, l)
                    }, null, 40, Jl), [
                      [st, o.selected[l]]
                    ])
                  ]))
                ], 64)) : R("", !0)
              ], 2)) : R("", !0),
              (p(!0), b(W, null, Ee(s.rowsFinal[l].cells ? s.rowsFinal[l].cells : s.rowsFinal[l], (c, h) => (p(), b(W, null, [
                !s.configFinal.hiddenCols[h] && !s.emptyColumns[h] && s.configFinal.columns[h] && c && o.hiddenBreakpoints.findIndex(
                  (g) => g === s.configFinal.columns[h].breakpoint
                ) === -1 && s.configFinal.columns[h].breakpoint !== "all" && !s.configFinal.stickyCols[h] ? ge((p(), b("td", {
                  id: "vue-quintable-" + o.uuid + "-cell-" + l + "-" + h,
                  key: "vue-quintable-" + o.uuid + "-cell-" + l + "-" + h,
                  class: O([
                    "vue-quintable-cell quintable--table-container--table--tbody--row--cell",
                    s.cellClassesParsed[l][h] + " " + s.configFinal.columnClasses[h]
                  ]),
                  onClick: (g) => s.onCellClick(g, c),
                  onAuxclick: (g) => s.onCellAuxClick(g, c),
                  onMousedown: t[9] || (t[9] = (g) => s.onCellMousedown(g))
                }, [
                  z(e.$slots, "cell-complete", { cell: c }, () => [
                    z(e.$slots, "cell-content", { cell: c }, () => [
                      s.configFinal.columns[h].cellFormatter && s.cellFormatters(h, c).type === "html" ? (p(), b("div", {
                        key: 0,
                        class: O(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html"]),
                        innerHTML: s.cellFormatters(h, c).value
                      }, null, 8, Ql)) : s.configFinal.columns[h].cellFormatter ? (p(), b("div", {
                        key: 1,
                        class: O(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value"])
                      }, V(s.cellFormatters(h, c).value), 1)) : s.valueToString(c.html) ? (p(), b("div", {
                        key: 2,
                        class: O(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--html"]),
                        innerHTML: c.html
                      }, null, 8, Xl)) : c.component ? (p(), b("div", {
                        key: 3,
                        class: O(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--component"])
                      }, [
                        (p(), A(Bt(c.component.name), Ue({ ref_for: !0 }, c.component.props, { onAction: s.handleComponentEvent }), null, 16, ["onAction"]))
                      ])) : s.valueToString(c.text) ? (p(), b("div", {
                        key: 4,
                        class: O(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--text"])
                      }, V(c.text), 1)) : R("", !0)
                    ], !0)
                  ], !0)
                ], 42, Kl)), [
                  [u, {
                    placement: "left",
                    content: c.tooltip,
                    trigger: c.tooltip ? "hover" : "manual"
                  }]
                ]) : R("", !0)
              ], 64))), 256)),
              s.configFinal.select && s.configFinal.selectPosition === "post" ? (p(), b("td", {
                key: 2,
                class: O(["select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post", { "disabled-select": s.rowsFinal[l].disableSelect }])
              }, [
                !s.rowsFinal[l].disableSelect || s.rowsFinal[l].showDisabledSelect ? (p(), b(W, { key: 0 }, [
                  s.configFinal.prettySelect ? (p(), A(a, {
                    key: 0,
                    modelValue: o.selected[l],
                    "onUpdate:modelValue": (c) => o.selected[l] = c,
                    name: "check",
                    class: "p-icon",
                    disabled: s.rowsFinal[l].disableSelect,
                    onChange: (c) => s.checkListener(c, l)
                  }, {
                    extra: de(() => [
                      F("span", null, [
                        o.selected[l] ? (p(), A(r, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : R("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : (p(), b("label", Yl, [
                    ge(F("input", {
                      "onUpdate:modelValue": (c) => o.selected[l] = c,
                      type: "checkbox",
                      disabled: s.rowsFinal[l].disableSelect,
                      onChange: (c) => s.checkListener(c, l)
                    }, null, 40, Zl), [
                      [st, o.selected[l]]
                    ])
                  ]))
                ], 64)) : R("", !0)
              ], 2)) : R("", !0)
            ], 46, zl)), [
              [u, {
                placement: "top",
                content: s.rowsFinal[l].tooltip,
                trigger: s.rowsFinal[l].tooltip ? "hover" : "manual",
                offset: 5
              }]
            ]),
            (s.generatedRows[l] || s.stickyRows[l]) && s.visibleRows[l] ? (p(), b(W, { key: 0 }, [
              o.generatedUpdatedKey && o.openRows[l] && Object.keys(s.generatedRows[l]).length || Object.keys(s.stickyRows[l]).length ? (p(), b("tr", {
                key: "generated-row-" + l + "-" + o.rowsUpdatedKey + "-" + o.generatedUpdatedKey,
                ref_for: !0,
                ref: "generated-row-highlighted-" + l,
                class: O(["generated-row quintable--table-container--table--tbody--generated-row", {
                  "parent-row-expanded": o.openRows[l],
                  "parent-row-collapsed": s.hiddenColumns[l] > 0 && !o.openRows[l]
                }]),
                onMouseenter: (c) => s.onMouseenterRow(l),
                onClick: (c) => s.onRowClick(c, l)
              }, [
                F("td", {
                  colspan: s.configFinal.number + 1,
                  class: "ps-0 pe-0 pt-0"
                }, [
                  F("div", {
                    class: O({
                      [s.configFinal.hoverClass]: o.hoveredRow === l,
                      [s.configFinal.activeClass]: o.activeRow === l
                    })
                  }, [
                    F("table", na, [
                      F("tbody", null, [
                        (p(!0), b(W, null, Ee(s.generatedRows[l], (c, h) => (p(), b(W, null, [
                          o.openRows[l] ? (p(), b("tr", {
                            id: "vue-quintable-" + o.uuid + "-generated-row-cell-" + l + "-" + h,
                            key: "vue-quintable-" + o.uuid + "-generated-row-cell-" + l + "-" + h + "-" + o.generatedUpdatedKey,
                            class: "generated-row-cell quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell"
                          }, [
                            !s.configFinal.hideRowToggle && s.generatedRows[l] && Object.keys(s.generatedRows[l]).length ? (p(), b("td", sa, [
                              s.hiddenColumns[l] > 0 ? (p(), b("span", oa, [
                                o.openRows[l] ? (p(), b("span", la, [
                                  I(r, {
                                    "fixed-width": "",
                                    icon: s.configFinal.expandedRowIcon
                                  }, null, 8, ["icon"])
                                ])) : (p(), b("span", ra, [
                                  I(r, {
                                    "fixed-width": "",
                                    icon: s.configFinal.collapsedRowIcon
                                  }, null, 8, ["icon"])
                                ]))
                              ])) : R("", !0)
                            ])) : R("", !0),
                            s.showHeadlines[h] || s.configFinal.sorts[h] ? (p(), b("td", {
                              key: 1,
                              class: O([s.configFinal.columnClasses[h], "generated-cell-element generated-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline"]),
                              onClick: Le((g) => s.setSortColumn(h), ["stop"])
                            }, [
                              s.showHeadlines[h] ? (p(), b("strong", {
                                key: 0,
                                innerHTML: s.configFinal.headlines[h]
                              }, null, 8, ca)) : (p(), b("span", ua, t[23] || (t[23] = [
                                F("wbr", null, null, -1)
                              ]))),
                              s.configFinal.sorts[h] && o.hoveredRow === l ? (p(), b("span", da, [
                                o.currentSortIndexes[h] ? R("", !0) : (p(), A(r, {
                                  key: 0,
                                  icon: "sort",
                                  class: "text-primary"
                                })),
                                o.currentSortIndexes[h] && o.currentSortIndexes[h].asc ? (p(), A(r, {
                                  key: 1,
                                  icon: "sort-amount-down-alt",
                                  class: "text-primary"
                                })) : R("", !0),
                                o.currentSortIndexes[h] && !o.currentSortIndexes[h].asc ? (p(), A(r, {
                                  key: 2,
                                  icon: "sort-amount-down",
                                  class: "text-primary"
                                })) : R("", !0),
                                o.currentSortIndexes[h] ? (p(), b("span", {
                                  key: 3,
                                  class: "ms-1 text-muted",
                                  onClick: Le((g) => s.removeSort(h), ["stop", "prevent"])
                                }, [
                                  s.numberOfSorts > 1 ? (p(), b("span", fa, V(o.currentSortIndexes[h].order + 1), 1)) : (p(), b("small", pa, [
                                    I(r, { icon: "times" })
                                  ]))
                                ], 8, ha)) : R("", !0)
                              ])) : R("", !0)
                            ], 10, aa)) : R("", !0),
                            ge((p(), b("td", {
                              colspan: !s.showHeadlines[h] && !s.configFinal.sorts[h] ? 2 : 1,
                              class: O([
                                s.configFinal.columnClasses[h] + " " + s.cellClassesParsed[l][h],
                                "generated-cell-element generated-cell-element-content generated-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content"
                              ]),
                              onClick: (g) => s.onCellClick(g, c)
                            }, [
                              z(e.$slots, "generated-cell-complete", { cell: c }, () => [
                                z(e.$slots, "generated-cell-content", { cell: c }, () => [
                                  s.configFinal.columns[h].cellFormatter && s.cellFormatters(h, c).type === "html" ? (p(), b("div", {
                                    key: 0,
                                    class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html",
                                    innerHTML: s.cellFormatters(h, c).value
                                  }, null, 8, ma)) : s.configFinal.columns[h].cellFormatter ? (p(), b("div", wa, V(s.cellFormatters(h, c).value), 1)) : s.valueToString(c.html) ? (p(), b("div", {
                                    key: 2,
                                    class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html",
                                    innerHTML: c.html
                                  }, null, 8, ya)) : c.component ? (p(), b("div", ba, [
                                    (p(), A(Bt(c.component.name), Ue({ ref_for: !0 }, c.component.props, { onAction: s.handleComponentEvent }), null, 16, ["onAction"]))
                                  ])) : s.valueToString(c.text) ? (p(), b("div", Sa, V(c.text), 1)) : R("", !0)
                                ], !0)
                              ], !0)
                            ], 10, ga)), [
                              [u, {
                                placement: "top",
                                content: c.tooltip,
                                trigger: c.tooltip ? "hover" : "manual"
                              }]
                            ])
                          ], 8, ia)) : R("", !0)
                        ], 64))), 256)),
                        (p(!0), b(W, null, Ee(s.stickyRows[l], (c, h) => (p(), b("tr", {
                          id: "vue-quintable-" + o.uuid + "-sticky-row-cell-" + l + "-" + h,
                          key: "vue-quintable-" + o.uuid + "-sticky-row-cell-" + l + "-" + h,
                          class: "sticky-row-cell quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell"
                        }, [
                          !s.configFinal.hideRowToggle && s.generatedRows[l] && Object.keys(s.generatedRows[l]).length ? (p(), b("td", xa, [
                            s.hiddenColumns[l] > 0 ? (p(), b("span", Ra, [
                              o.openRows[l] ? (p(), b("span", ka, [
                                I(r, {
                                  "fixed-width": "",
                                  icon: s.configFinal.expandedRowIcon
                                }, null, 8, ["icon"])
                              ])) : (p(), b("span", Fa, [
                                I(r, {
                                  "fixed-width": "",
                                  icon: s.configFinal.collapsedRowIcon
                                }, null, 8, ["icon"])
                              ]))
                            ])) : R("", !0)
                          ])) : R("", !0),
                          s.showHeadlines[h] || s.configFinal.sorts[h] ? (p(), b("td", {
                            key: 1,
                            class: O([s.configFinal.columnClasses[h], "generated-cell-element sticky-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline"]),
                            onClick: Le((g) => s.setSortColumn(h), ["stop"])
                          }, [
                            s.showHeadlines[h] ? (p(), b("strong", {
                              key: 0,
                              innerHTML: s.configFinal.headlines[h]
                            }, null, 8, Ca)) : (p(), b("span", Pa, t[24] || (t[24] = [
                              F("wbr", null, null, -1)
                            ]))),
                            s.configFinal.sorts[h] && o.hoveredRow === l ? (p(), b("span", Ta, [
                              o.currentSortIndexes[h] ? R("", !0) : (p(), A(r, {
                                key: 0,
                                icon: "sort",
                                class: "text-primary"
                              })),
                              o.currentSortIndexes[h] && o.currentSortIndexes[h].asc ? (p(), A(r, {
                                key: 1,
                                icon: "sort-amount-down-alt",
                                class: "text-primary"
                              })) : R("", !0),
                              o.currentSortIndexes[h] && !o.currentSortIndexes[h].asc ? (p(), A(r, {
                                key: 2,
                                icon: "sort-amount-down",
                                class: "text-primary"
                              })) : R("", !0),
                              o.currentSortIndexes[h] ? (p(), b("span", {
                                key: 3,
                                class: "ms-1 text-muted",
                                onClick: Le((g) => s.removeSort(h), ["stop", "prevent"])
                              }, [
                                s.numberOfSorts > 1 ? (p(), b("span", Aa, V(o.currentSortIndexes[h].order + 1), 1)) : (p(), b("small", Ea, [
                                  I(r, { icon: "times" })
                                ]))
                              ], 8, Oa)) : R("", !0)
                            ])) : R("", !0)
                          ], 10, _a)) : R("", !0),
                          ge((p(), b("td", {
                            colspan: !s.showHeadlines[h] && !s.configFinal.sorts[h] ? 2 : 1,
                            class: O([
                              s.configFinal.columnClasses[h] + " " + s.cellClassesParsed[l][h],
                              "generated-cell-element generated-cell-element-content sticky-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content"
                            ]),
                            onClick: (g) => s.onCellClick(g, c)
                          }, [
                            z(e.$slots, "sticky-cell-complete", { cell: c }, () => [
                              z(e.$slots, "sticky-cell-content", { cell: c }, () => [
                                s.configFinal.columns[h].cellFormatter && s.cellFormatters(h, c).type === "html" ? (p(), b("div", {
                                  key: 0,
                                  class: O(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html"]),
                                  innerHTML: s.cellFormatters(h, c).value
                                }, null, 8, Na)) : s.configFinal.columns[h].cellFormatter ? (p(), b("div", {
                                  key: 1,
                                  class: O(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value"])
                                }, V(s.cellFormatters(h, c).value), 1)) : s.valueToString(c.html) ? (p(), b("div", {
                                  key: 2,
                                  class: O(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html"]),
                                  innerHTML: c.html
                                }, null, 8, qa)) : c.component ? (p(), b("div", {
                                  key: 3,
                                  class: O(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component"])
                                }, [
                                  (p(), A(Bt(c.component.name), Ue({ ref_for: !0 }, c.component.props, { onAction: s.handleComponentEvent }), null, 16, ["onAction"]))
                                ])) : s.valueToString(c.text) ? (p(), b("div", {
                                  key: 4,
                                  class: O(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text"])
                                }, V(c.text), 1)) : R("", !0)
                              ], !0)
                            ], !0)
                          ], 10, La)), [
                            [u, {
                              placement: "top",
                              content: c.tooltip,
                              trigger: c.tooltip ? "hover" : "manual"
                            }]
                          ])
                        ], 8, va))), 128))
                      ])
                    ])
                  ], 2)
                ], 8, ta)
              ], 42, ea)) : R("", !0)
            ], 64)) : R("", !0)
          ], 64))), 128))
        ], 32)
      ], 2)),
      s.noRows && !s.ajaxLoading ? (p(), b("div", ja, [
        z(e.$slots, "no-results", {}, () => [
          F("div", Da, [
            F("em", {
              innerHTML: s.configFinal.emptyPlaceholder
            }, null, 8, Ma)
          ])
        ], !0),
        t[25] || (t[25] = F("hr", null, null, -1))
      ])) : R("", !0)
    ], 512),
    s.ajaxLoading ? (p(), b("div", Ba, [
      z(e.$slots, "loading", {}, () => [
        F("div", {
          class: "loader-wrapper quintable--loading--loader-wrapper",
          style: ze("height:" + o.loaderHeight + "px;")
        }, [
          F("div", Ha, [
            I(r, {
              icon: "circle-notch",
              spin: "",
              class: "ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader"
            })
          ])
        ], 4)
      ], !0)
    ])) : R("", !0),
    F("div", Ua, [
      F("div", za, [
        F("div", Va, [
          s.configFinal.multiSortSelect || s.configFinal.pageSortSelect ? (p(), b("div", {
            key: 0,
            class: O(
              `pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select flex-inline ${s.configFinal.pageSort ? "me-3" : ""}`.trim()
            )
          }, [
            s.configFinal.multiSortSelect ? (p(), A(a, {
              key: 0,
              modelValue: s.multiSort,
              "onUpdate:modelValue": t[12] || (t[12] = (l) => s.multiSort = l),
              class: "p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select",
              value: "true"
            }, {
              default: de(() => [
                Sn(V(s.configFinal.multiSortPlaceholder), 1)
              ]),
              _: 1
            }, 8, ["modelValue"])) : R("", !0),
            s.configFinal.pageSortSelect ? (p(), A(a, {
              key: 1,
              modelValue: s.pageSort,
              "onUpdate:modelValue": t[13] || (t[13] = (l) => s.pageSort = l),
              class: "p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select",
              value: "true"
            }, {
              default: de(() => [
                Sn(V(s.configFinal.pageSortPlaceholder), 1)
              ]),
              _: 1
            }, 8, ["modelValue"])) : R("", !0)
          ], 2)) : R("", !0)
        ]),
        F("div", Ia, [
          s.configFinal && s.configFinal.pagination ? (p(), b("div", $a, [
            s.configFinal.rowsSelect ? (p(), b("div", Ga, [
              F("span", {
                class: "d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder",
                innerHTML: s.configFinal.rowsPlaceholder
              }, null, 8, Wa),
              I(d, {
                modelValue: s.currentRowsPerPageProperty,
                "onUpdate:modelValue": t[14] || (t[14] = (l) => s.currentRowsPerPageProperty = l),
                class: "d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select",
                options: s.paginationOptionsFilled,
                clearable: !1
              }, null, 8, ["modelValue", "options"])
            ])) : R("", !0),
            s.configFinal && s.configFinal.pagination && s.pages > 1 ? (p(), b("nav", {
              key: 1,
              class: O(["d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav", { "me-3": s.numberOfVisibleRows, disabled: s.ajaxLoading }])
            }, [
              F("ul", Ja, [
                s.pages > s.pageRange ? (p(), b("li", {
                  key: 0,
                  class: O(["page-item", { disabled: o.currentPage <= 1 }]),
                  onClick: t[15] || (t[15] = (l) => s.gotoPage("first"))
                }, [
                  F("span", Ka, [
                    I(r, { icon: "angle-double-left" })
                  ])
                ], 2)) : R("", !0),
                F("li", {
                  class: O(["page-item", { disabled: o.currentPage <= 1 }]),
                  onClick: t[16] || (t[16] = (l) => s.gotoPage("prev"))
                }, [
                  F("span", Qa, [
                    I(r, { icon: "angle-left" })
                  ])
                ], 2),
                s.pageRange < s.pages && s.visiblePages[0] > 1 ? (p(), b("li", {
                  key: 1,
                  class: "page-item",
                  onClick: t[17] || (t[17] = (l) => s.updatePageOffset(-1))
                }, t[26] || (t[26] = [
                  F("span", { class: "page-link" }, " ... ", -1)
                ]))) : R("", !0),
                (p(!0), b(W, null, Ee(s.visiblePages, (l) => (p(), b("li", {
                  key: "pagination-item-" + l,
                  class: O(["page-item", { active: l === o.currentPage }]),
                  onClick: (c) => s.gotoPage(l)
                }, [
                  F("span", Ya, V(l), 1)
                ], 10, Xa))), 128)),
                s.pageRange < s.pages && s.visiblePages[s.visiblePages.length - 1] < s.pages ? (p(), b("li", {
                  key: 2,
                  class: "page-item",
                  onClick: t[18] || (t[18] = (l) => s.updatePageOffset(1))
                }, t[27] || (t[27] = [
                  F("span", { class: "page-link" }, " ... ", -1)
                ]))) : R("", !0),
                F("li", {
                  class: O(["page-item", { disabled: s.pages === o.currentPage }]),
                  onClick: t[19] || (t[19] = (l) => s.gotoPage("next"))
                }, [
                  F("span", Za, [
                    I(r, { icon: "angle-right" })
                  ])
                ], 2),
                s.pages > s.pageRange ? (p(), b("li", {
                  key: 3,
                  class: O(["page-item", { disabled: s.pages === o.currentPage }]),
                  onClick: t[20] || (t[20] = (l) => s.gotoPage("last"))
                }, [
                  F("span", ec, [
                    I(r, { icon: "angle-double-right" })
                  ])
                ], 2)) : R("", !0)
              ])
            ], 2)) : R("", !0),
            s.numberOfVisibleRows ? (p(), b("span", tc, V(s.firstVisibleRow) + "-" + V(s.lastVisibleRow) + " " + V(s.configFinal.numberOfVisibleRowsFillerWord) + " " + V(s.numberOfVisibleRows), 1)) : R("", !0)
          ])) : R("", !0)
        ])
      ])
    ]),
    F("div", nc, [
      z(e.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const sc = /* @__PURE__ */ fl(pl, [["render", ic], ["__scopeId", "data-v-e403edb3"]]);
ns.add(
  gs,
  ms,
  ws,
  ys,
  bs,
  Ss,
  vs,
  xs,
  Rs,
  Fs,
  ks,
  _s,
  Cs,
  Ps,
  Ts,
  Os,
  As,
  Es,
  Ls
);
const Ac = (e, t = {}) => {
  e.component("QuintableVSelect", ts), e.component("QuintableFontAwesomeIcon", is), e.component("VueQuintable", sc), e.use(jo, {
    // You can tweak defaults here; example sets a custom distance.
    distance: 6
    // If you want a custom theme class, add CSS and set theme on each use.
    // See floating-vue docs for options.
  }), t.axios && (console.log(e), e.config.globalProperties || (e.config.globalProperties = {}), e.config.globalProperties.$globalVueQuintableaxios = t.axios);
};
export {
  sc as VueQuintable,
  Ac as default
};
//# sourceMappingURL=vue-quintable.es.js.map
