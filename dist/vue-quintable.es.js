import { createElementBlock as S, openBlock as h, createElementVNode as O, resolveDirective as sr, normalizeClass as T, renderSlot as M, createVNode as q, normalizeProps as re, guardReactiveProps as fe, Fragment as V, renderList as Te, createCommentVNode as C, createTextVNode as wt, toDisplayString as U, createBlock as N, resolveDynamicComponent as et, mergeProps as He, toHandlers as zo, withDirectives as oe, vShow as Ui, Transition as Io, withCtx as de, withModifiers as Ee, defineComponent as Je, computed as he, watch as Bo, h as mi, pushScopeId as $o, popScopeId as Uo, nextTick as qo, resolveComponent as Le, ref as In, createApp as Vo, withScopeId as Ho, withKeys as Wo, normalizeStyle as ft, vModelText as Go, vModelCheckbox as Nt } from "vue";
var Ko = Object.defineProperty, Yo = Object.defineProperties, Jo = Object.getOwnPropertyDescriptors, qi = Object.getOwnPropertySymbols, Xo = Object.prototype.hasOwnProperty, Qo = Object.prototype.propertyIsEnumerable, Vi = (e, t, n) => t in e ? Ko(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Qe = (e, t) => {
  for (var n in t || (t = {}))
    Xo.call(t, n) && Vi(e, n, t[n]);
  if (qi)
    for (var n of qi(t))
      Qo.call(t, n) && Vi(e, n, t[n]);
  return e;
}, Hi = (e, t) => Yo(e, Jo(t));
const Zo = {
  props: {
    autoscroll: {
      type: Boolean,
      default: !0
    }
  },
  watch: {
    typeAheadPointer() {
      this.autoscroll && this.maybeAdjustScroll();
    },
    open(e) {
      this.autoscroll && e && this.$nextTick(() => this.maybeAdjustScroll());
    }
  },
  methods: {
    maybeAdjustScroll() {
      var e;
      const t = ((e = this.$refs.dropdownMenu) == null ? void 0 : e.children[this.typeAheadPointer]) || !1;
      if (t) {
        const n = this.getDropdownViewport(), { top: i, bottom: r, height: s } = t.getBoundingClientRect();
        if (i < n.top)
          return this.$refs.dropdownMenu.scrollTop = t.offsetTop;
        if (r > n.bottom)
          return this.$refs.dropdownMenu.scrollTop = t.offsetTop - (n.height - s);
      }
    },
    getDropdownViewport() {
      return this.$refs.dropdownMenu ? this.$refs.dropdownMenu.getBoundingClientRect() : {
        height: 0,
        top: 0,
        bottom: 0
      };
    }
  }
}, ea = {
  data() {
    return {
      typeAheadPointer: -1
    };
  },
  watch: {
    filteredOptions() {
      for (let e = 0; e < this.filteredOptions.length; e++)
        if (this.selectable(this.filteredOptions[e])) {
          this.typeAheadPointer = e;
          break;
        }
    },
    open(e) {
      e && this.typeAheadToLastSelected();
    },
    selectedValue() {
      this.open && this.typeAheadToLastSelected();
    }
  },
  methods: {
    typeAheadUp() {
      for (let e = this.typeAheadPointer - 1; e >= 0; e--)
        if (this.selectable(this.filteredOptions[e])) {
          this.typeAheadPointer = e;
          break;
        }
    },
    typeAheadDown() {
      for (let e = this.typeAheadPointer + 1; e < this.filteredOptions.length; e++)
        if (this.selectable(this.filteredOptions[e])) {
          this.typeAheadPointer = e;
          break;
        }
    },
    typeAheadSelect() {
      const e = this.filteredOptions[this.typeAheadPointer];
      e && this.selectable(e) && this.select(e);
    },
    typeAheadToLastSelected() {
      this.typeAheadPointer = this.selectedValue.length !== 0 ? this.filteredOptions.indexOf(this.selectedValue[this.selectedValue.length - 1]) : -1;
    }
  }
}, ta = {
  props: {
    loading: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      mutableLoading: !1
    };
  },
  watch: {
    search() {
      this.$emit("search", this.search, this.toggleLoading);
    },
    loading(e) {
      this.mutableLoading = e;
    }
  },
  methods: {
    toggleLoading(e = null) {
      return e == null ? this.mutableLoading = !this.mutableLoading : this.mutableLoading = e;
    }
  }
}, gi = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, na = {}, ia = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "10",
  height: "10"
}, sa = /* @__PURE__ */ O("path", { d: "M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z" }, null, -1), ra = [
  sa
];
function oa(e, t) {
  return h(), S("svg", ia, ra);
}
const aa = /* @__PURE__ */ gi(na, [["render", oa]]), la = {}, ca = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "14",
  height: "10"
}, ua = /* @__PURE__ */ O("path", { d: "M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z" }, null, -1), fa = [
  ua
];
function da(e, t) {
  return h(), S("svg", ca, fa);
}
const ha = /* @__PURE__ */ gi(la, [["render", da]]), Wi = {
  Deselect: aa,
  OpenIndicator: ha
}, pa = {
  mounted(e, { instance: t }) {
    if (t.appendToBody) {
      const {
        height: n,
        top: i,
        left: r,
        width: s
      } = t.$refs.toggle.getBoundingClientRect();
      let o = window.scrollX || window.pageXOffset, a = window.scrollY || window.pageYOffset;
      e.unbindPosition = t.calculatePosition(e, t, {
        width: s + "px",
        left: o + r + "px",
        top: a + i + n + "px"
      }), document.body.appendChild(e);
    }
  },
  unmounted(e, { instance: t }) {
    t.appendToBody && (e.unbindPosition && typeof e.unbindPosition == "function" && e.unbindPosition(), e.parentNode && e.parentNode.removeChild(e));
  }
};
function ma(e) {
  const t = {};
  return Object.keys(e).sort().forEach((n) => {
    t[n] = e[n];
  }), JSON.stringify(t);
}
let ga = 0;
function ya() {
  return ++ga;
}
const ba = {
  components: Qe({}, Wi),
  directives: { appendToBody: pa },
  mixins: [Zo, ea, ta],
  compatConfig: {
    MODE: 3
  },
  emits: [
    "open",
    "close",
    "update:modelValue",
    "search",
    "search:compositionstart",
    "search:compositionend",
    "search:keydown",
    "search:blur",
    "search:focus",
    "search:input",
    "option:created",
    "option:selecting",
    "option:selected",
    "option:deselecting",
    "option:deselected"
  ],
  props: {
    modelValue: {},
    components: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    clearable: {
      type: Boolean,
      default: !0
    },
    deselectFromDropdown: {
      type: Boolean,
      default: !1
    },
    searchable: {
      type: Boolean,
      default: !0
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: ""
    },
    transition: {
      type: String,
      default: "vs__fade"
    },
    clearSearchOnSelect: {
      type: Boolean,
      default: !0
    },
    closeOnSelect: {
      type: Boolean,
      default: !0
    },
    label: {
      type: String,
      default: "label"
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    reduce: {
      type: Function,
      default: (e) => e
    },
    selectable: {
      type: Function,
      default: (e) => !0
    },
    getOptionLabel: {
      type: Function,
      default(e) {
        return typeof e == "object" ? e.hasOwnProperty(this.label) ? e[this.label] : console.warn(`[vue-select warn]: Label key "option.${this.label}" does not exist in options object ${JSON.stringify(e)}.
https://vue-select.org/api/props.html#getoptionlabel`) : e;
      }
    },
    getOptionKey: {
      type: Function,
      default(e) {
        if (typeof e != "object")
          return e;
        try {
          return e.hasOwnProperty("id") ? e.id : ma(e);
        } catch (t) {
          return console.warn(`[vue-select warn]: Could not stringify this option to generate unique key. Please provide'getOptionKey' prop to return a unique key for each option.
https://vue-select.org/api/props.html#getoptionkey`, e, t);
        }
      }
    },
    onTab: {
      type: Function,
      default: function() {
        this.selectOnTab && !this.isComposing && this.typeAheadSelect();
      }
    },
    taggable: {
      type: Boolean,
      default: !1
    },
    tabindex: {
      type: Number,
      default: null
    },
    pushTags: {
      type: Boolean,
      default: !1
    },
    filterable: {
      type: Boolean,
      default: !0
    },
    filterBy: {
      type: Function,
      default(e, t, n) {
        return (t || "").toLocaleLowerCase().indexOf(n.toLocaleLowerCase()) > -1;
      }
    },
    filter: {
      type: Function,
      default(e, t) {
        return e.filter((n) => {
          let i = this.getOptionLabel(n);
          return typeof i == "number" && (i = i.toString()), this.filterBy(n, i, t);
        });
      }
    },
    createOption: {
      type: Function,
      default(e) {
        return typeof this.optionList[0] == "object" ? { [this.label]: e } : e;
      }
    },
    resetOnOptionsChange: {
      default: !1,
      validator: (e) => ["function", "boolean"].includes(typeof e)
    },
    clearSearchOnBlur: {
      type: Function,
      default: function({ clearSearchOnSelect: e, multiple: t }) {
        return e && !t;
      }
    },
    noDrop: {
      type: Boolean,
      default: !1
    },
    inputId: {
      type: String
    },
    dir: {
      type: String,
      default: "auto"
    },
    selectOnTab: {
      type: Boolean,
      default: !1
    },
    selectOnKeyCodes: {
      type: Array,
      default: () => [13]
    },
    searchInputQuerySelector: {
      type: String,
      default: "[type=search]"
    },
    mapKeydown: {
      type: Function,
      default: (e, t) => e
    },
    appendToBody: {
      type: Boolean,
      default: !1
    },
    calculatePosition: {
      type: Function,
      default(e, t, { width: n, top: i, left: r }) {
        e.style.top = i, e.style.left = r, e.style.width = n;
      }
    },
    dropdownShouldOpen: {
      type: Function,
      default({ noDrop: e, open: t, mutableLoading: n }) {
        return e ? !1 : t && !n;
      }
    },
    uid: {
      type: [String, Number],
      default: () => ya()
    }
  },
  data() {
    return {
      search: "",
      open: !1,
      isComposing: !1,
      pushedTags: [],
      _value: [],
      deselectButtons: []
    };
  },
  computed: {
    isReducingValues() {
      return this.$props.reduce !== this.$options.props.reduce.default;
    },
    isTrackingValues() {
      return typeof this.modelValue > "u" || this.isReducingValues;
    },
    selectedValue() {
      let e = this.modelValue;
      return this.isTrackingValues && (e = this.$data._value), e != null && e !== "" ? [].concat(e) : [];
    },
    optionList() {
      return this.options.concat(this.pushTags ? this.pushedTags : []);
    },
    searchEl() {
      return this.$slots.search ? this.$refs.selectedOptions.querySelector(this.searchInputQuerySelector) : this.$refs.search;
    },
    scope() {
      const e = {
        search: this.search,
        loading: this.loading,
        searching: this.searching,
        filteredOptions: this.filteredOptions
      };
      return {
        search: {
          attributes: Qe({
            disabled: this.disabled,
            placeholder: this.searchPlaceholder,
            tabindex: this.tabindex,
            readonly: !this.searchable,
            id: this.inputId,
            "aria-autocomplete": "list",
            "aria-labelledby": `vs${this.uid}__combobox`,
            "aria-controls": `vs${this.uid}__listbox`,
            ref: "search",
            type: "search",
            autocomplete: this.autocomplete,
            value: this.search
          }, this.dropdownOpen && this.filteredOptions[this.typeAheadPointer] ? {
            "aria-activedescendant": `vs${this.uid}__option-${this.typeAheadPointer}`
          } : {}),
          events: {
            compositionstart: () => this.isComposing = !0,
            compositionend: () => this.isComposing = !1,
            keydown: this.onSearchKeyDown,
            blur: this.onSearchBlur,
            focus: this.onSearchFocus,
            input: (t) => this.search = t.target.value
          }
        },
        spinner: {
          loading: this.mutableLoading
        },
        noOptions: {
          search: this.search,
          loading: this.mutableLoading,
          searching: this.searching
        },
        openIndicator: {
          attributes: {
            ref: "openIndicator",
            role: "presentation",
            class: "vs__open-indicator"
          }
        },
        listHeader: e,
        listFooter: e,
        header: Hi(Qe({}, e), { deselect: this.deselect }),
        footer: Hi(Qe({}, e), { deselect: this.deselect })
      };
    },
    childComponents() {
      return Qe(Qe({}, Wi), this.components);
    },
    stateClasses() {
      return {
        "vs--open": this.dropdownOpen,
        "vs--single": !this.multiple,
        "vs--multiple": this.multiple,
        "vs--searching": this.searching && !this.noDrop,
        "vs--searchable": this.searchable && !this.noDrop,
        "vs--unsearchable": !this.searchable,
        "vs--loading": this.mutableLoading,
        "vs--disabled": this.disabled
      };
    },
    searching() {
      return !!this.search;
    },
    dropdownOpen() {
      return this.dropdownShouldOpen(this);
    },
    searchPlaceholder() {
      return this.isValueEmpty && this.placeholder ? this.placeholder : void 0;
    },
    filteredOptions() {
      const e = [].concat(this.optionList);
      if (!this.filterable && !this.taggable)
        return e;
      const t = this.search.length ? this.filter(e, this.search, this) : e;
      if (this.taggable && this.search.length) {
        const n = this.createOption(this.search);
        this.optionExists(n) || t.unshift(n);
      }
      return t;
    },
    isValueEmpty() {
      return this.selectedValue.length === 0;
    },
    showClearButton() {
      return !this.multiple && this.clearable && !this.open && !this.isValueEmpty;
    }
  },
  watch: {
    options(e, t) {
      const n = () => typeof this.resetOnOptionsChange == "function" ? this.resetOnOptionsChange(e, t, this.selectedValue) : this.resetOnOptionsChange;
      !this.taggable && n() && this.clearSelection(), this.modelValue && this.isTrackingValues && this.setInternalValueFromOptions(this.modelValue);
    },
    modelValue: {
      immediate: !0,
      handler(e) {
        this.isTrackingValues && this.setInternalValueFromOptions(e);
      }
    },
    multiple() {
      this.clearSelection();
    },
    open(e) {
      this.$emit(e ? "open" : "close");
    }
  },
  created() {
    this.mutableLoading = this.loading;
  },
  methods: {
    setInternalValueFromOptions(e) {
      Array.isArray(e) ? this.$data._value = e.map((t) => this.findOptionFromReducedValue(t)) : this.$data._value = this.findOptionFromReducedValue(e);
    },
    select(e) {
      this.$emit("option:selecting", e), this.isOptionSelected(e) ? this.deselectFromDropdown && (this.clearable || this.multiple && this.selectedValue.length > 1) && this.deselect(e) : (this.taggable && !this.optionExists(e) && (this.$emit("option:created", e), this.pushTag(e)), this.multiple && (e = this.selectedValue.concat(e)), this.updateValue(e), this.$emit("option:selected", e)), this.onAfterSelect(e);
    },
    deselect(e) {
      this.$emit("option:deselecting", e), this.updateValue(this.selectedValue.filter((t) => !this.optionComparator(t, e))), this.$emit("option:deselected", e);
    },
    clearSelection() {
      this.updateValue(this.multiple ? [] : null);
    },
    onAfterSelect(e) {
      this.closeOnSelect && (this.open = !this.open, this.searchEl.blur()), this.clearSearchOnSelect && (this.search = "");
    },
    updateValue(e) {
      typeof this.modelValue > "u" && (this.$data._value = e), e !== null && (Array.isArray(e) ? e = e.map((t) => this.reduce(t)) : e = this.reduce(e)), this.$emit("update:modelValue", e);
    },
    toggleDropdown(e) {
      const t = e.target !== this.searchEl;
      t && e.preventDefault();
      const n = [
        ...this.deselectButtons || [],
        this.$refs.clearButton
      ];
      if (this.searchEl === void 0 || n.filter(Boolean).some((i) => i.contains(e.target) || i === e.target)) {
        e.preventDefault();
        return;
      }
      this.open && t ? this.searchEl.blur() : this.disabled || (this.open = !0, this.searchEl.focus());
    },
    isOptionSelected(e) {
      return this.selectedValue.some((t) => this.optionComparator(t, e));
    },
    isOptionDeselectable(e) {
      return this.isOptionSelected(e) && this.deselectFromDropdown;
    },
    optionComparator(e, t) {
      return this.getOptionKey(e) === this.getOptionKey(t);
    },
    findOptionFromReducedValue(e) {
      const t = (i) => JSON.stringify(this.reduce(i)) === JSON.stringify(e), n = [...this.options, ...this.pushedTags].filter(t);
      return n.length === 1 ? n[0] : n.find((i) => this.optionComparator(i, this.$data._value)) || e;
    },
    closeSearchOptions() {
      this.open = !1, this.$emit("search:blur");
    },
    maybeDeleteValue() {
      if (!this.searchEl.value.length && this.selectedValue && this.selectedValue.length && this.clearable) {
        let e = null;
        this.multiple && (e = [
          ...this.selectedValue.slice(0, this.selectedValue.length - 1)
        ]), this.updateValue(e);
      }
    },
    optionExists(e) {
      return this.optionList.some((t) => this.optionComparator(t, e));
    },
    normalizeOptionForSlot(e) {
      return typeof e == "object" ? e : { [this.label]: e };
    },
    pushTag(e) {
      this.pushedTags.push(e);
    },
    onEscape() {
      this.search.length ? this.search = "" : this.searchEl.blur();
    },
    onSearchBlur() {
      if (this.mousedown && !this.searching)
        this.mousedown = !1;
      else {
        const { clearSearchOnSelect: e, multiple: t } = this;
        this.clearSearchOnBlur({ clearSearchOnSelect: e, multiple: t }) && (this.search = ""), this.closeSearchOptions();
        return;
      }
      if (this.search.length === 0 && this.options.length === 0) {
        this.closeSearchOptions();
        return;
      }
    },
    onSearchFocus() {
      this.open = !0, this.$emit("search:focus");
    },
    onMousedown() {
      this.mousedown = !0;
    },
    onMouseUp() {
      this.mousedown = !1;
    },
    onSearchKeyDown(e) {
      const t = (r) => (r.preventDefault(), !this.isComposing && this.typeAheadSelect()), n = {
        8: (r) => this.maybeDeleteValue(),
        9: (r) => this.onTab(),
        27: (r) => this.onEscape(),
        38: (r) => (r.preventDefault(), this.typeAheadUp()),
        40: (r) => (r.preventDefault(), this.typeAheadDown())
      };
      this.selectOnKeyCodes.forEach((r) => n[r] = t);
      const i = this.mapKeydown(n, this);
      if (typeof i[e.keyCode] == "function")
        return i[e.keyCode](e);
    }
  }
}, wa = ["dir"], va = ["id", "aria-expanded", "aria-owns"], Sa = {
  ref: "selectedOptions",
  class: "vs__selected-options"
}, xa = ["disabled", "title", "aria-label", "onClick"], ka = {
  ref: "actions",
  class: "vs__actions"
}, Oa = ["disabled"], Ca = { class: "vs__spinner" }, _a = ["id"], Pa = ["id", "aria-selected", "onMouseover", "onClick"], Fa = {
  key: 0,
  class: "vs__no-options"
}, Aa = /* @__PURE__ */ wt(" Sorry, no matching options. "), Ra = ["id"];
function Ta(e, t, n, i, r, s) {
  const o = sr("append-to-body");
  return h(), S("div", {
    dir: n.dir,
    class: T(["v-select", s.stateClasses])
  }, [
    M(e.$slots, "header", re(fe(s.scope.header))),
    O("div", {
      id: `vs${n.uid}__combobox`,
      ref: "toggle",
      class: "vs__dropdown-toggle",
      role: "combobox",
      "aria-expanded": s.dropdownOpen.toString(),
      "aria-owns": `vs${n.uid}__listbox`,
      "aria-label": "Search for option",
      onMousedown: t[1] || (t[1] = (a) => s.toggleDropdown(a))
    }, [
      O("div", Sa, [
        (h(!0), S(V, null, Te(s.selectedValue, (a, f) => M(e.$slots, "selected-option-container", {
          option: s.normalizeOptionForSlot(a),
          deselect: s.deselect,
          multiple: n.multiple,
          disabled: n.disabled
        }, () => [
          (h(), S("span", {
            key: n.getOptionKey(a),
            class: "vs__selected"
          }, [
            M(e.$slots, "selected-option", re(fe(s.normalizeOptionForSlot(a))), () => [
              wt(U(n.getOptionLabel(a)), 1)
            ]),
            n.multiple ? (h(), S("button", {
              key: 0,
              ref_for: !0,
              ref: (u) => r.deselectButtons[f] = u,
              disabled: n.disabled,
              type: "button",
              class: "vs__deselect",
              title: `Deselect ${n.getOptionLabel(a)}`,
              "aria-label": `Deselect ${n.getOptionLabel(a)}`,
              onClick: (u) => s.deselect(a)
            }, [
              (h(), N(et(s.childComponents.Deselect)))
            ], 8, xa)) : C("", !0)
          ]))
        ])), 256)),
        M(e.$slots, "search", re(fe(s.scope.search)), () => [
          O("input", He({ class: "vs__search" }, s.scope.search.attributes, zo(s.scope.search.events)), null, 16)
        ])
      ], 512),
      O("div", ka, [
        oe(O("button", {
          ref: "clearButton",
          disabled: n.disabled,
          type: "button",
          class: "vs__clear",
          title: "Clear Selected",
          "aria-label": "Clear Selected",
          onClick: t[0] || (t[0] = (...a) => s.clearSelection && s.clearSelection(...a))
        }, [
          (h(), N(et(s.childComponents.Deselect)))
        ], 8, Oa), [
          [Ui, s.showClearButton]
        ]),
        M(e.$slots, "open-indicator", re(fe(s.scope.openIndicator)), () => [
          n.noDrop ? C("", !0) : (h(), N(et(s.childComponents.OpenIndicator), re(He({ key: 0 }, s.scope.openIndicator.attributes)), null, 16))
        ]),
        M(e.$slots, "spinner", re(fe(s.scope.spinner)), () => [
          oe(O("div", Ca, "Loading...", 512), [
            [Ui, e.mutableLoading]
          ])
        ])
      ], 512)
    ], 40, va),
    q(Io, { name: n.transition }, {
      default: de(() => [
        s.dropdownOpen ? oe((h(), S("ul", {
          id: `vs${n.uid}__listbox`,
          ref: "dropdownMenu",
          key: `vs${n.uid}__listbox`,
          class: "vs__dropdown-menu",
          role: "listbox",
          tabindex: "-1",
          onMousedown: t[2] || (t[2] = Ee((...a) => s.onMousedown && s.onMousedown(...a), ["prevent"])),
          onMouseup: t[3] || (t[3] = (...a) => s.onMouseUp && s.onMouseUp(...a))
        }, [
          M(e.$slots, "list-header", re(fe(s.scope.listHeader))),
          (h(!0), S(V, null, Te(s.filteredOptions, (a, f) => (h(), S("li", {
            id: `vs${n.uid}__option-${f}`,
            key: n.getOptionKey(a),
            role: "option",
            class: T(["vs__dropdown-option", {
              "vs__dropdown-option--deselect": s.isOptionDeselectable(a) && f === e.typeAheadPointer,
              "vs__dropdown-option--selected": s.isOptionSelected(a),
              "vs__dropdown-option--highlight": f === e.typeAheadPointer,
              "vs__dropdown-option--disabled": !n.selectable(a)
            }]),
            "aria-selected": f === e.typeAheadPointer ? !0 : null,
            onMouseover: (u) => n.selectable(a) ? e.typeAheadPointer = f : null,
            onClick: Ee((u) => n.selectable(a) ? s.select(a) : null, ["prevent", "stop"])
          }, [
            M(e.$slots, "option", re(fe(s.normalizeOptionForSlot(a))), () => [
              wt(U(n.getOptionLabel(a)), 1)
            ])
          ], 42, Pa))), 128)),
          s.filteredOptions.length === 0 ? (h(), S("li", Fa, [
            M(e.$slots, "no-options", re(fe(s.scope.noOptions)), () => [
              Aa
            ])
          ])) : C("", !0),
          M(e.$slots, "list-footer", re(fe(s.scope.listFooter)))
        ], 40, _a)), [
          [o]
        ]) : (h(), S("ul", {
          key: 1,
          id: `vs${n.uid}__listbox`,
          role: "listbox",
          style: { display: "none", visibility: "hidden" }
        }, null, 8, Ra))
      ]),
      _: 3
    }, 8, ["name"]),
    M(e.$slots, "footer", re(fe(s.scope.footer)))
  ], 10, wa);
}
const Ea = /* @__PURE__ */ gi(ba, [["render", Ta]]);
function La(e, t, n) {
  return (t = Ma(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Gi(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    t && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function x(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gi(Object(n), !0).forEach(function(i) {
      La(e, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Gi(Object(n)).forEach(function(i) {
      Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return e;
}
function Na(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ma(e) {
  var t = Na(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
const Ki = () => {
};
let yi = {}, rr = {}, or = null, ar = {
  mark: Ki,
  measure: Ki
};
try {
  typeof window < "u" && (yi = window), typeof document < "u" && (rr = document), typeof MutationObserver < "u" && (or = MutationObserver), typeof performance < "u" && (ar = performance);
} catch {
}
const {
  userAgent: Yi = ""
} = yi.navigator || {}, je = yi, z = rr, Ji = or, Mt = ar;
je.document;
const Pe = !!z.documentElement && !!z.head && typeof z.addEventListener == "function" && typeof z.createElement == "function", lr = ~Yi.indexOf("MSIE") || ~Yi.indexOf("Trident/");
var Da = /fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/, ja = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i, cr = {
  classic: {
    fa: "solid",
    fas: "solid",
    "fa-solid": "solid",
    far: "regular",
    "fa-regular": "regular",
    fal: "light",
    "fa-light": "light",
    fat: "thin",
    "fa-thin": "thin",
    fab: "brands",
    "fa-brands": "brands"
  },
  duotone: {
    fa: "solid",
    fad: "solid",
    "fa-solid": "solid",
    "fa-duotone": "solid",
    fadr: "regular",
    "fa-regular": "regular",
    fadl: "light",
    "fa-light": "light",
    fadt: "thin",
    "fa-thin": "thin"
  },
  sharp: {
    fa: "solid",
    fass: "solid",
    "fa-solid": "solid",
    fasr: "regular",
    "fa-regular": "regular",
    fasl: "light",
    "fa-light": "light",
    fast: "thin",
    "fa-thin": "thin"
  },
  "sharp-duotone": {
    fa: "solid",
    fasds: "solid",
    "fa-solid": "solid",
    fasdr: "regular",
    "fa-regular": "regular",
    fasdl: "light",
    "fa-light": "light",
    fasdt: "thin",
    "fa-thin": "thin"
  }
}, za = {
  GROUP: "duotone-group",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, ur = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"], Y = "classic", sn = "duotone", Ia = "sharp", Ba = "sharp-duotone", fr = [Y, sn, Ia, Ba], $a = {
  classic: {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  duotone: {
    900: "fad",
    400: "fadr",
    300: "fadl",
    100: "fadt"
  },
  sharp: {
    900: "fass",
    400: "fasr",
    300: "fasl",
    100: "fast"
  },
  "sharp-duotone": {
    900: "fasds",
    400: "fasdr",
    300: "fasdl",
    100: "fasdt"
  }
}, Ua = {
  "Font Awesome 6 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 6 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  "Font Awesome 6 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 6 Duotone": {
    900: "fad",
    400: "fadr",
    normal: "fadr",
    300: "fadl",
    100: "fadt"
  },
  "Font Awesome 6 Sharp": {
    900: "fass",
    400: "fasr",
    normal: "fasr",
    300: "fasl",
    100: "fast"
  },
  "Font Awesome 6 Sharp Duotone": {
    900: "fasds",
    400: "fasdr",
    normal: "fasdr",
    300: "fasdl",
    100: "fasdt"
  }
}, qa = /* @__PURE__ */ new Map([["classic", {
  defaultShortPrefixId: "fas",
  defaultStyleId: "solid",
  styleIds: ["solid", "regular", "light", "thin", "brands"],
  futureStyleIds: [],
  defaultFontWeight: 900
}], ["sharp", {
  defaultShortPrefixId: "fass",
  defaultStyleId: "solid",
  styleIds: ["solid", "regular", "light", "thin"],
  futureStyleIds: [],
  defaultFontWeight: 900
}], ["duotone", {
  defaultShortPrefixId: "fad",
  defaultStyleId: "solid",
  styleIds: ["solid", "regular", "light", "thin"],
  futureStyleIds: [],
  defaultFontWeight: 900
}], ["sharp-duotone", {
  defaultShortPrefixId: "fasds",
  defaultStyleId: "solid",
  styleIds: ["solid", "regular", "light", "thin"],
  futureStyleIds: [],
  defaultFontWeight: 900
}]]), Va = {
  classic: {
    solid: "fas",
    regular: "far",
    light: "fal",
    thin: "fat",
    brands: "fab"
  },
  duotone: {
    solid: "fad",
    regular: "fadr",
    light: "fadl",
    thin: "fadt"
  },
  sharp: {
    solid: "fass",
    regular: "fasr",
    light: "fasl",
    thin: "fast"
  },
  "sharp-duotone": {
    solid: "fasds",
    regular: "fasdr",
    light: "fasdl",
    thin: "fasdt"
  }
}, Ha = ["fak", "fa-kit", "fakd", "fa-kit-duotone"], Xi = {
  kit: {
    fak: "kit",
    "fa-kit": "kit"
  },
  "kit-duotone": {
    fakd: "kit-duotone",
    "fa-kit-duotone": "kit-duotone"
  }
}, Wa = ["kit"], Ga = {
  kit: {
    "fa-kit": "fak"
  }
}, Ka = ["fak", "fakd"], Ya = {
  kit: {
    fak: "fa-kit"
  }
}, Qi = {
  kit: {
    kit: "fak"
  },
  "kit-duotone": {
    "kit-duotone": "fakd"
  }
}, Dt = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, Ja = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"], Xa = ["fak", "fa-kit", "fakd", "fa-kit-duotone"], Qa = {
  "Font Awesome Kit": {
    400: "fak",
    normal: "fak"
  },
  "Font Awesome Kit Duotone": {
    400: "fakd",
    normal: "fakd"
  }
}, Za = {
  classic: {
    "fa-brands": "fab",
    "fa-duotone": "fad",
    "fa-light": "fal",
    "fa-regular": "far",
    "fa-solid": "fas",
    "fa-thin": "fat"
  },
  duotone: {
    "fa-regular": "fadr",
    "fa-light": "fadl",
    "fa-thin": "fadt"
  },
  sharp: {
    "fa-solid": "fass",
    "fa-regular": "fasr",
    "fa-light": "fasl",
    "fa-thin": "fast"
  },
  "sharp-duotone": {
    "fa-solid": "fasds",
    "fa-regular": "fasdr",
    "fa-light": "fasdl",
    "fa-thin": "fasdt"
  }
}, el = {
  classic: ["fas", "far", "fal", "fat", "fad"],
  duotone: ["fadr", "fadl", "fadt"],
  sharp: ["fass", "fasr", "fasl", "fast"],
  "sharp-duotone": ["fasds", "fasdr", "fasdl", "fasdt"]
}, Bn = {
  classic: {
    fab: "fa-brands",
    fad: "fa-duotone",
    fal: "fa-light",
    far: "fa-regular",
    fas: "fa-solid",
    fat: "fa-thin"
  },
  duotone: {
    fadr: "fa-regular",
    fadl: "fa-light",
    fadt: "fa-thin"
  },
  sharp: {
    fass: "fa-solid",
    fasr: "fa-regular",
    fasl: "fa-light",
    fast: "fa-thin"
  },
  "sharp-duotone": {
    fasds: "fa-solid",
    fasdr: "fa-regular",
    fasdl: "fa-light",
    fasdt: "fa-thin"
  }
}, tl = ["fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands"], $n = ["fa", "fas", "far", "fal", "fat", "fad", "fadr", "fadl", "fadt", "fab", "fass", "fasr", "fasl", "fast", "fasds", "fasdr", "fasdl", "fasdt", ...Ja, ...tl], nl = ["solid", "regular", "light", "thin", "duotone", "brands"], dr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], il = dr.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), sl = [...Object.keys(el), ...nl, "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", Dt.GROUP, Dt.SWAP_OPACITY, Dt.PRIMARY, Dt.SECONDARY].concat(dr.map((e) => "".concat(e, "x"))).concat(il.map((e) => "w-".concat(e))), rl = {
  "Font Awesome 5 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 5 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal"
  },
  "Font Awesome 5 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 5 Duotone": {
    900: "fad"
  }
};
const Ce = "___FONT_AWESOME___", Un = 16, hr = "fa", pr = "svg-inline--fa", Ge = "data-fa-i2svg", qn = "data-fa-pseudo-element", ol = "data-fa-pseudo-element-pending", bi = "data-prefix", wi = "data-icon", Zi = "fontawesome-i2svg", al = "async", ll = ["HTML", "HEAD", "STYLE", "SCRIPT"], mr = (() => {
  try {
    return process.env.NODE_ENV === "production";
  } catch {
    return !1;
  }
})();
function Ft(e) {
  return new Proxy(e, {
    get(t, n) {
      return n in t ? t[n] : t[Y];
    }
  });
}
const gr = x({}, cr);
gr[Y] = x(x(x(x({}, {
  "fa-duotone": "duotone"
}), cr[Y]), Xi.kit), Xi["kit-duotone"]);
const cl = Ft(gr), Vn = x({}, Va);
Vn[Y] = x(x(x(x({}, {
  duotone: "fad"
}), Vn[Y]), Qi.kit), Qi["kit-duotone"]);
const es = Ft(Vn), Hn = x({}, Bn);
Hn[Y] = x(x({}, Hn[Y]), Ya.kit);
const vi = Ft(Hn), Wn = x({}, Za);
Wn[Y] = x(x({}, Wn[Y]), Ga.kit);
Ft(Wn);
const ul = Da, yr = "fa-layers-text", fl = ja, dl = x({}, $a);
Ft(dl);
const hl = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], Pn = za, pl = [...Wa, ...sl], dt = je.FontAwesomeConfig || {};
function ml(e) {
  var t = z.querySelector("script[" + e + "]");
  if (t)
    return t.getAttribute(e);
}
function gl(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
z && typeof z.querySelector == "function" && [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]].forEach((t) => {
  let [n, i] = t;
  const r = gl(ml(n));
  r != null && (dt[i] = r);
});
const br = {
  styleDefault: "solid",
  familyDefault: Y,
  cssPrefix: hr,
  replacementClass: pr,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
};
dt.familyPrefix && (dt.cssPrefix = dt.familyPrefix);
const it = x(x({}, br), dt);
it.autoReplaceSvg || (it.observeMutations = !1);
const _ = {};
Object.keys(br).forEach((e) => {
  Object.defineProperty(_, e, {
    enumerable: !0,
    set: function(t) {
      it[e] = t, ht.forEach((n) => n(_));
    },
    get: function() {
      return it[e];
    }
  });
});
Object.defineProperty(_, "familyPrefix", {
  enumerable: !0,
  set: function(e) {
    it.cssPrefix = e, ht.forEach((t) => t(_));
  },
  get: function() {
    return it.cssPrefix;
  }
});
je.FontAwesomeConfig = _;
const ht = [];
function yl(e) {
  return ht.push(e), () => {
    ht.splice(ht.indexOf(e), 1);
  };
}
const Fe = Un, ve = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function bl(e) {
  if (!e || !Pe)
    return;
  const t = z.createElement("style");
  t.setAttribute("type", "text/css"), t.innerHTML = e;
  const n = z.head.childNodes;
  let i = null;
  for (let r = n.length - 1; r > -1; r--) {
    const s = n[r], o = (s.tagName || "").toUpperCase();
    ["STYLE", "LINK"].indexOf(o) > -1 && (i = s);
  }
  return z.head.insertBefore(t, i), e;
}
const wl = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function vt() {
  let e = 12, t = "";
  for (; e-- > 0; )
    t += wl[Math.random() * 62 | 0];
  return t;
}
function rt(e) {
  const t = [];
  for (let n = (e || []).length >>> 0; n--; )
    t[n] = e[n];
  return t;
}
function Si(e) {
  return e.classList ? rt(e.classList) : (e.getAttribute("class") || "").split(" ").filter((t) => t);
}
function wr(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function vl(e) {
  return Object.keys(e || {}).reduce((t, n) => t + "".concat(n, '="').concat(wr(e[n]), '" '), "").trim();
}
function rn(e) {
  return Object.keys(e || {}).reduce((t, n) => t + "".concat(n, ": ").concat(e[n].trim(), ";"), "");
}
function xi(e) {
  return e.size !== ve.size || e.x !== ve.x || e.y !== ve.y || e.rotate !== ve.rotate || e.flipX || e.flipY;
}
function Sl(e) {
  let {
    transform: t,
    containerWidth: n,
    iconWidth: i
  } = e;
  const r = {
    transform: "translate(".concat(n / 2, " 256)")
  }, s = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "), o = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), a = "rotate(".concat(t.rotate, " 0 0)"), f = {
    transform: "".concat(s, " ").concat(o, " ").concat(a)
  }, u = {
    transform: "translate(".concat(i / 2 * -1, " -256)")
  };
  return {
    outer: r,
    inner: f,
    path: u
  };
}
function xl(e) {
  let {
    transform: t,
    width: n = Un,
    height: i = Un,
    startCentered: r = !1
  } = e, s = "";
  return r && lr ? s += "translate(".concat(t.x / Fe - n / 2, "em, ").concat(t.y / Fe - i / 2, "em) ") : r ? s += "translate(calc(-50% + ".concat(t.x / Fe, "em), calc(-50% + ").concat(t.y / Fe, "em)) ") : s += "translate(".concat(t.x / Fe, "em, ").concat(t.y / Fe, "em) "), s += "scale(".concat(t.size / Fe * (t.flipX ? -1 : 1), ", ").concat(t.size / Fe * (t.flipY ? -1 : 1), ") "), s += "rotate(".concat(t.rotate, "deg) "), s;
}
var kl = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;
function vr() {
  const e = hr, t = pr, n = _.cssPrefix, i = _.replacementClass;
  let r = kl;
  if (n !== e || i !== t) {
    const s = new RegExp("\\.".concat(e, "\\-"), "g"), o = new RegExp("\\--".concat(e, "\\-"), "g"), a = new RegExp("\\.".concat(t), "g");
    r = r.replace(s, ".".concat(n, "-")).replace(o, "--".concat(n, "-")).replace(a, ".".concat(i));
  }
  return r;
}
let ts = !1;
function Fn() {
  _.autoAddCss && !ts && (bl(vr()), ts = !0);
}
var Ol = {
  mixout() {
    return {
      dom: {
        css: vr,
        insertCss: Fn
      }
    };
  },
  hooks() {
    return {
      beforeDOMElementCreation() {
        Fn();
      },
      beforeI2svg() {
        Fn();
      }
    };
  }
};
const _e = je || {};
_e[Ce] || (_e[Ce] = {});
_e[Ce].styles || (_e[Ce].styles = {});
_e[Ce].hooks || (_e[Ce].hooks = {});
_e[Ce].shims || (_e[Ce].shims = []);
var Se = _e[Ce];
const Sr = [], xr = function() {
  z.removeEventListener("DOMContentLoaded", xr), Wt = 1, Sr.map((e) => e());
};
let Wt = !1;
Pe && (Wt = (z.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(z.readyState), Wt || z.addEventListener("DOMContentLoaded", xr));
function Cl(e) {
  Pe && (Wt ? setTimeout(e, 0) : Sr.push(e));
}
function At(e) {
  const {
    tag: t,
    attributes: n = {},
    children: i = []
  } = e;
  return typeof e == "string" ? wr(e) : "<".concat(t, " ").concat(vl(n), ">").concat(i.map(At).join(""), "</").concat(t, ">");
}
function ns(e, t, n) {
  if (e && e[t] && e[t][n])
    return {
      prefix: t,
      iconName: n,
      icon: e[t][n]
    };
}
var An = function(t, n, i, r) {
  var s = Object.keys(t), o = s.length, a = n, f, u, l;
  for (i === void 0 ? (f = 1, l = t[s[0]]) : (f = 0, l = i); f < o; f++)
    u = s[f], l = a(l, t[u], u, t);
  return l;
};
function _l(e) {
  const t = [];
  let n = 0;
  const i = e.length;
  for (; n < i; ) {
    const r = e.charCodeAt(n++);
    if (r >= 55296 && r <= 56319 && n < i) {
      const s = e.charCodeAt(n++);
      (s & 64512) == 56320 ? t.push(((r & 1023) << 10) + (s & 1023) + 65536) : (t.push(r), n--);
    } else
      t.push(r);
  }
  return t;
}
function Gn(e) {
  const t = _l(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function Pl(e, t) {
  const n = e.length;
  let i = e.charCodeAt(t), r;
  return i >= 55296 && i <= 56319 && n > t + 1 && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (i - 55296) * 1024 + r - 56320 + 65536 : i;
}
function is(e) {
  return Object.keys(e).reduce((t, n) => {
    const i = e[n];
    return !!i.icon ? t[i.iconName] = i.icon : t[n] = i, t;
  }, {});
}
function Kn(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const {
    skipHooks: i = !1
  } = n, r = is(t);
  typeof Se.hooks.addPack == "function" && !i ? Se.hooks.addPack(e, is(t)) : Se.styles[e] = x(x({}, Se.styles[e] || {}), r), e === "fas" && Kn("fa", t);
}
const {
  styles: St,
  shims: Fl
} = Se, kr = Object.keys(vi), Al = kr.reduce((e, t) => (e[t] = Object.keys(vi[t]), e), {});
let ki = null, Or = {}, Cr = {}, _r = {}, Pr = {}, Fr = {};
function Rl(e) {
  return ~pl.indexOf(e);
}
function Tl(e, t) {
  const n = t.split("-"), i = n[0], r = n.slice(1).join("-");
  return i === e && r !== "" && !Rl(r) ? r : null;
}
const Ar = () => {
  const e = (i) => An(St, (r, s, o) => (r[o] = An(s, i, {}), r), {});
  Or = e((i, r, s) => (r[3] && (i[r[3]] = s), r[2] && r[2].filter((a) => typeof a == "number").forEach((a) => {
    i[a.toString(16)] = s;
  }), i)), Cr = e((i, r, s) => (i[s] = s, r[2] && r[2].filter((a) => typeof a == "string").forEach((a) => {
    i[a] = s;
  }), i)), Fr = e((i, r, s) => {
    const o = r[2];
    return i[s] = s, o.forEach((a) => {
      i[a] = s;
    }), i;
  });
  const t = "far" in St || _.autoFetchSvg, n = An(Fl, (i, r) => {
    const s = r[0];
    let o = r[1];
    const a = r[2];
    return o === "far" && !t && (o = "fas"), typeof s == "string" && (i.names[s] = {
      prefix: o,
      iconName: a
    }), typeof s == "number" && (i.unicodes[s.toString(16)] = {
      prefix: o,
      iconName: a
    }), i;
  }, {
    names: {},
    unicodes: {}
  });
  _r = n.names, Pr = n.unicodes, ki = on(_.styleDefault, {
    family: _.familyDefault
  });
};
yl((e) => {
  ki = on(e.styleDefault, {
    family: _.familyDefault
  });
});
Ar();
function Oi(e, t) {
  return (Or[e] || {})[t];
}
function El(e, t) {
  return (Cr[e] || {})[t];
}
function qe(e, t) {
  return (Fr[e] || {})[t];
}
function Rr(e) {
  return _r[e] || {
    prefix: null,
    iconName: null
  };
}
function Ll(e) {
  const t = Pr[e], n = Oi("fas", e);
  return t || (n ? {
    prefix: "fas",
    iconName: n
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function ze() {
  return ki;
}
const Tr = () => ({
  prefix: null,
  iconName: null,
  rest: []
});
function Nl(e) {
  let t = Y;
  const n = kr.reduce((i, r) => (i[r] = "".concat(_.cssPrefix, "-").concat(r), i), {});
  return fr.forEach((i) => {
    (e.includes(n[i]) || e.some((r) => Al[i].includes(r))) && (t = i);
  }), t;
}
function on(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    family: n = Y
  } = t, i = cl[n][e];
  if (n === sn && !e)
    return "fad";
  const r = es[n][e] || es[n][i], s = e in Se.styles ? e : null;
  return r || s || null;
}
function Ml(e) {
  let t = [], n = null;
  return e.forEach((i) => {
    const r = Tl(_.cssPrefix, i);
    r ? n = r : i && t.push(i);
  }), {
    iconName: n,
    rest: t
  };
}
function ss(e) {
  return e.sort().filter((t, n, i) => i.indexOf(t) === n);
}
function an(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    skipLookups: n = !1
  } = t;
  let i = null;
  const r = $n.concat(Xa), s = ss(e.filter((c) => r.includes(c))), o = ss(e.filter((c) => !$n.includes(c))), a = s.filter((c) => (i = c, !ur.includes(c))), [f = null] = a, u = Nl(s), l = x(x({}, Ml(o)), {}, {
    prefix: on(f, {
      family: u
    })
  });
  return x(x(x({}, l), Il({
    values: e,
    family: u,
    styles: St,
    config: _,
    canonical: l,
    givenPrefix: i
  })), Dl(n, i, l));
}
function Dl(e, t, n) {
  let {
    prefix: i,
    iconName: r
  } = n;
  if (e || !i || !r)
    return {
      prefix: i,
      iconName: r
    };
  const s = t === "fa" ? Rr(r) : {}, o = qe(i, r);
  return r = s.iconName || o || r, i = s.prefix || i, i === "far" && !St.far && St.fas && !_.autoFetchSvg && (i = "fas"), {
    prefix: i,
    iconName: r
  };
}
const jl = fr.filter((e) => e !== Y || e !== sn), zl = Object.keys(Bn).filter((e) => e !== Y).map((e) => Object.keys(Bn[e])).flat();
function Il(e) {
  const {
    values: t,
    family: n,
    canonical: i,
    givenPrefix: r = "",
    styles: s = {},
    config: o = {}
  } = e, a = n === sn, f = t.includes("fa-duotone") || t.includes("fad"), u = o.familyDefault === "duotone", l = i.prefix === "fad" || i.prefix === "fa-duotone";
  if (!a && (f || u || l) && (i.prefix = "fad"), (t.includes("fa-brands") || t.includes("fab")) && (i.prefix = "fab"), !i.prefix && jl.includes(n) && (Object.keys(s).find((d) => zl.includes(d)) || o.autoFetchSvg)) {
    const d = qa.get(n).defaultShortPrefixId;
    i.prefix = d, i.iconName = qe(i.prefix, i.iconName) || i.iconName;
  }
  return (i.prefix === "fa" || r === "fa") && (i.prefix = ze() || "fas"), i;
}
class Bl {
  constructor() {
    this.definitions = {};
  }
  add() {
    for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++)
      n[i] = arguments[i];
    const r = n.reduce(this._pullDefinitions, {});
    Object.keys(r).forEach((s) => {
      this.definitions[s] = x(x({}, this.definitions[s] || {}), r[s]), Kn(s, r[s]);
      const o = vi[Y][s];
      o && Kn(o, r[s]), Ar();
    });
  }
  reset() {
    this.definitions = {};
  }
  _pullDefinitions(t, n) {
    const i = n.prefix && n.iconName && n.icon ? {
      0: n
    } : n;
    return Object.keys(i).map((r) => {
      const {
        prefix: s,
        iconName: o,
        icon: a
      } = i[r], f = a[2];
      t[s] || (t[s] = {}), f.length > 0 && f.forEach((u) => {
        typeof u == "string" && (t[s][u] = a);
      }), t[s][o] = a;
    }), t;
  }
}
let rs = [], Ze = {};
const tt = {}, $l = Object.keys(tt);
function Ul(e, t) {
  let {
    mixoutsTo: n
  } = t;
  return rs = e, Ze = {}, Object.keys(tt).forEach((i) => {
    $l.indexOf(i) === -1 && delete tt[i];
  }), rs.forEach((i) => {
    const r = i.mixout ? i.mixout() : {};
    if (Object.keys(r).forEach((s) => {
      typeof r[s] == "function" && (n[s] = r[s]), typeof r[s] == "object" && Object.keys(r[s]).forEach((o) => {
        n[s] || (n[s] = {}), n[s][o] = r[s][o];
      });
    }), i.hooks) {
      const s = i.hooks();
      Object.keys(s).forEach((o) => {
        Ze[o] || (Ze[o] = []), Ze[o].push(s[o]);
      });
    }
    i.provides && i.provides(tt);
  }), n;
}
function Yn(e, t) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++)
    i[r - 2] = arguments[r];
  return (Ze[e] || []).forEach((o) => {
    t = o.apply(null, [t, ...i]);
  }), t;
}
function Ke(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  (Ze[e] || []).forEach((s) => {
    s.apply(null, n);
  });
}
function Ie() {
  const e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
  return tt[e] ? tt[e].apply(null, t) : void 0;
}
function Jn(e) {
  e.prefix === "fa" && (e.prefix = "fas");
  let {
    iconName: t
  } = e;
  const n = e.prefix || ze();
  if (t)
    return t = qe(n, t) || t, ns(Er.definitions, n, t) || ns(Se.styles, n, t);
}
const Er = new Bl(), ql = () => {
  _.autoReplaceSvg = !1, _.observeMutations = !1, Ke("noAuto");
}, Vl = {
  i2svg: function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Pe ? (Ke("beforeI2svg", e), Ie("pseudoElements2svg", e), Ie("i2svg", e)) : Promise.reject(new Error("Operation requires a DOM of some kind."));
  },
  watch: function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      autoReplaceSvgRoot: t
    } = e;
    _.autoReplaceSvg === !1 && (_.autoReplaceSvg = !0), _.observeMutations = !0, Cl(() => {
      Wl({
        autoReplaceSvgRoot: t
      }), Ke("watch", e);
    });
  }
}, Hl = {
  icon: (e) => {
    if (e === null)
      return null;
    if (typeof e == "object" && e.prefix && e.iconName)
      return {
        prefix: e.prefix,
        iconName: qe(e.prefix, e.iconName) || e.iconName
      };
    if (Array.isArray(e) && e.length === 2) {
      const t = e[1].indexOf("fa-") === 0 ? e[1].slice(3) : e[1], n = on(e[0]);
      return {
        prefix: n,
        iconName: qe(n, t) || t
      };
    }
    if (typeof e == "string" && (e.indexOf("".concat(_.cssPrefix, "-")) > -1 || e.match(ul))) {
      const t = an(e.split(" "), {
        skipLookups: !0
      });
      return {
        prefix: t.prefix || ze(),
        iconName: qe(t.prefix, t.iconName) || t.iconName
      };
    }
    if (typeof e == "string") {
      const t = ze();
      return {
        prefix: t,
        iconName: qe(t, e) || e
      };
    }
  }
}, ie = {
  noAuto: ql,
  config: _,
  dom: Vl,
  parse: Hl,
  library: Er,
  findIconDefinition: Jn,
  toHtml: At
}, Wl = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    autoReplaceSvgRoot: t = z
  } = e;
  (Object.keys(Se.styles).length > 0 || _.autoFetchSvg) && Pe && _.autoReplaceSvg && ie.dom.i2svg({
    node: t
  });
};
function ln(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map((n) => At(n));
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (!Pe) return;
      const n = z.createElement("div");
      return n.innerHTML = e.html, n.children;
    }
  }), e;
}
function Gl(e) {
  let {
    children: t,
    main: n,
    mask: i,
    attributes: r,
    styles: s,
    transform: o
  } = e;
  if (xi(o) && n.found && !i.found) {
    const {
      width: a,
      height: f
    } = n, u = {
      x: a / f / 2,
      y: 0.5
    };
    r.style = rn(x(x({}, s), {}, {
      "transform-origin": "".concat(u.x + o.x / 16, "em ").concat(u.y + o.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes: r,
    children: t
  }];
}
function Kl(e) {
  let {
    prefix: t,
    iconName: n,
    children: i,
    attributes: r,
    symbol: s
  } = e;
  const o = s === !0 ? "".concat(t, "-").concat(_.cssPrefix, "-").concat(n) : s;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: x(x({}, r), {}, {
        id: o
      }),
      children: i
    }]
  }];
}
function Ci(e) {
  const {
    icons: {
      main: t,
      mask: n
    },
    prefix: i,
    iconName: r,
    transform: s,
    symbol: o,
    title: a,
    maskId: f,
    titleId: u,
    extra: l,
    watchable: c = !1
  } = e, {
    width: d,
    height: y
  } = n.found ? n : t, b = Ka.includes(i), v = [_.replacementClass, r ? "".concat(_.cssPrefix, "-").concat(r) : ""].filter((P) => l.classes.indexOf(P) === -1).filter((P) => P !== "" || !!P).concat(l.classes).join(" ");
  let w = {
    children: [],
    attributes: x(x({}, l.attributes), {}, {
      "data-prefix": i,
      "data-icon": r,
      class: v,
      role: l.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(d, " ").concat(y)
    })
  };
  const m = b && !~l.classes.indexOf("fa-fw") ? {
    width: "".concat(d / y * 16 * 0.0625, "em")
  } : {};
  c && (w.attributes[Ge] = ""), a && (w.children.push({
    tag: "title",
    attributes: {
      id: w.attributes["aria-labelledby"] || "title-".concat(u || vt())
    },
    children: [a]
  }), delete w.attributes.title);
  const g = x(x({}, w), {}, {
    prefix: i,
    iconName: r,
    main: t,
    mask: n,
    maskId: f,
    transform: s,
    symbol: o,
    styles: x(x({}, m), l.styles)
  }), {
    children: k,
    attributes: A
  } = n.found && t.found ? Ie("generateAbstractMask", g) || {
    children: [],
    attributes: {}
  } : Ie("generateAbstractIcon", g) || {
    children: [],
    attributes: {}
  };
  return g.children = k, g.attributes = A, o ? Kl(g) : Gl(g);
}
function os(e) {
  const {
    content: t,
    width: n,
    height: i,
    transform: r,
    title: s,
    extra: o,
    watchable: a = !1
  } = e, f = x(x(x({}, o.attributes), s ? {
    title: s
  } : {}), {}, {
    class: o.classes.join(" ")
  });
  a && (f[Ge] = "");
  const u = x({}, o.styles);
  xi(r) && (u.transform = xl({
    transform: r,
    startCentered: !0,
    width: n,
    height: i
  }), u["-webkit-transform"] = u.transform);
  const l = rn(u);
  l.length > 0 && (f.style = l);
  const c = [];
  return c.push({
    tag: "span",
    attributes: f,
    children: [t]
  }), s && c.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [s]
  }), c;
}
function Yl(e) {
  const {
    content: t,
    title: n,
    extra: i
  } = e, r = x(x(x({}, i.attributes), n ? {
    title: n
  } : {}), {}, {
    class: i.classes.join(" ")
  }), s = rn(i.styles);
  s.length > 0 && (r.style = s);
  const o = [];
  return o.push({
    tag: "span",
    attributes: r,
    children: [t]
  }), n && o.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [n]
  }), o;
}
const {
  styles: Rn
} = Se;
function Xn(e) {
  const t = e[0], n = e[1], [i] = e.slice(4);
  let r = null;
  return Array.isArray(i) ? r = {
    tag: "g",
    attributes: {
      class: "".concat(_.cssPrefix, "-").concat(Pn.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(_.cssPrefix, "-").concat(Pn.SECONDARY),
        fill: "currentColor",
        d: i[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(_.cssPrefix, "-").concat(Pn.PRIMARY),
        fill: "currentColor",
        d: i[1]
      }
    }]
  } : r = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: i
    }
  }, {
    found: !0,
    width: t,
    height: n,
    icon: r
  };
}
const Jl = {
  found: !1,
  width: 512,
  height: 512
};
function Xl(e, t) {
  !mr && !_.showMissingIcons && e && console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
}
function Qn(e, t) {
  let n = t;
  return t === "fa" && _.styleDefault !== null && (t = ze()), new Promise((i, r) => {
    if (n === "fa") {
      const s = Rr(e) || {};
      e = s.iconName || e, t = s.prefix || t;
    }
    if (e && t && Rn[t] && Rn[t][e]) {
      const s = Rn[t][e];
      return i(Xn(s));
    }
    Xl(e, t), i(x(x({}, Jl), {}, {
      icon: _.showMissingIcons && e ? Ie("missingIconAbstract") || {} : {}
    }));
  });
}
const as = () => {
}, Zn = _.measurePerformance && Mt && Mt.mark && Mt.measure ? Mt : {
  mark: as,
  measure: as
}, ut = 'FA "6.7.2"', Ql = (e) => (Zn.mark("".concat(ut, " ").concat(e, " begins")), () => Lr(e)), Lr = (e) => {
  Zn.mark("".concat(ut, " ").concat(e, " ends")), Zn.measure("".concat(ut, " ").concat(e), "".concat(ut, " ").concat(e, " begins"), "".concat(ut, " ").concat(e, " ends"));
};
var _i = {
  begin: Ql,
  end: Lr
};
const It = () => {
};
function ls(e) {
  return typeof (e.getAttribute ? e.getAttribute(Ge) : null) == "string";
}
function Zl(e) {
  const t = e.getAttribute ? e.getAttribute(bi) : null, n = e.getAttribute ? e.getAttribute(wi) : null;
  return t && n;
}
function ec(e) {
  return e && e.classList && e.classList.contains && e.classList.contains(_.replacementClass);
}
function tc() {
  return _.autoReplaceSvg === !0 ? Bt.replace : Bt[_.autoReplaceSvg] || Bt.replace;
}
function nc(e) {
  return z.createElementNS("http://www.w3.org/2000/svg", e);
}
function ic(e) {
  return z.createElement(e);
}
function Nr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    ceFn: n = e.tag === "svg" ? nc : ic
  } = t;
  if (typeof e == "string")
    return z.createTextNode(e);
  const i = n(e.tag);
  return Object.keys(e.attributes || []).forEach(function(s) {
    i.setAttribute(s, e.attributes[s]);
  }), (e.children || []).forEach(function(s) {
    i.appendChild(Nr(s, {
      ceFn: n
    }));
  }), i;
}
function sc(e) {
  let t = " ".concat(e.outerHTML, " ");
  return t = "".concat(t, "Font Awesome fontawesome.com "), t;
}
const Bt = {
  replace: function(e) {
    const t = e[0];
    if (t.parentNode)
      if (e[1].forEach((n) => {
        t.parentNode.insertBefore(Nr(n), t);
      }), t.getAttribute(Ge) === null && _.keepOriginalSource) {
        let n = z.createComment(sc(t));
        t.parentNode.replaceChild(n, t);
      } else
        t.remove();
  },
  nest: function(e) {
    const t = e[0], n = e[1];
    if (~Si(t).indexOf(_.replacementClass))
      return Bt.replace(e);
    const i = new RegExp("".concat(_.cssPrefix, "-.*"));
    if (delete n[0].attributes.id, n[0].attributes.class) {
      const s = n[0].attributes.class.split(" ").reduce((o, a) => (a === _.replacementClass || a.match(i) ? o.toSvg.push(a) : o.toNode.push(a), o), {
        toNode: [],
        toSvg: []
      });
      n[0].attributes.class = s.toSvg.join(" "), s.toNode.length === 0 ? t.removeAttribute("class") : t.setAttribute("class", s.toNode.join(" "));
    }
    const r = n.map((s) => At(s)).join(`
`);
    t.setAttribute(Ge, ""), t.innerHTML = r;
  }
};
function cs(e) {
  e();
}
function Mr(e, t) {
  const n = typeof t == "function" ? t : It;
  if (e.length === 0)
    n();
  else {
    let i = cs;
    _.mutateApproach === al && (i = je.requestAnimationFrame || cs), i(() => {
      const r = tc(), s = _i.begin("mutate");
      e.map(r), s(), n();
    });
  }
}
let Pi = !1;
function Dr() {
  Pi = !0;
}
function ei() {
  Pi = !1;
}
let Gt = null;
function us(e) {
  if (!Ji || !_.observeMutations)
    return;
  const {
    treeCallback: t = It,
    nodeCallback: n = It,
    pseudoElementsCallback: i = It,
    observeMutationsRoot: r = z
  } = e;
  Gt = new Ji((s) => {
    if (Pi) return;
    const o = ze();
    rt(s).forEach((a) => {
      if (a.type === "childList" && a.addedNodes.length > 0 && !ls(a.addedNodes[0]) && (_.searchPseudoElements && i(a.target), t(a.target)), a.type === "attributes" && a.target.parentNode && _.searchPseudoElements && i(a.target.parentNode), a.type === "attributes" && ls(a.target) && ~hl.indexOf(a.attributeName))
        if (a.attributeName === "class" && Zl(a.target)) {
          const {
            prefix: f,
            iconName: u
          } = an(Si(a.target));
          a.target.setAttribute(bi, f || o), u && a.target.setAttribute(wi, u);
        } else ec(a.target) && n(a.target);
    });
  }), Pe && Gt.observe(r, {
    childList: !0,
    attributes: !0,
    characterData: !0,
    subtree: !0
  });
}
function rc() {
  Gt && Gt.disconnect();
}
function oc(e) {
  const t = e.getAttribute("style");
  let n = [];
  return t && (n = t.split(";").reduce((i, r) => {
    const s = r.split(":"), o = s[0], a = s.slice(1);
    return o && a.length > 0 && (i[o] = a.join(":").trim()), i;
  }, {})), n;
}
function ac(e) {
  const t = e.getAttribute("data-prefix"), n = e.getAttribute("data-icon"), i = e.innerText !== void 0 ? e.innerText.trim() : "";
  let r = an(Si(e));
  return r.prefix || (r.prefix = ze()), t && n && (r.prefix = t, r.iconName = n), r.iconName && r.prefix || (r.prefix && i.length > 0 && (r.iconName = El(r.prefix, e.innerText) || Oi(r.prefix, Gn(e.innerText))), !r.iconName && _.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (r.iconName = e.firstChild.data)), r;
}
function lc(e) {
  const t = rt(e.attributes).reduce((r, s) => (r.name !== "class" && r.name !== "style" && (r[s.name] = s.value), r), {}), n = e.getAttribute("title"), i = e.getAttribute("data-fa-title-id");
  return _.autoA11y && (n ? t["aria-labelledby"] = "".concat(_.replacementClass, "-title-").concat(i || vt()) : (t["aria-hidden"] = "true", t.focusable = "false")), t;
}
function cc() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: ve,
    symbol: !1,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function fs(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: !0
  };
  const {
    iconName: n,
    prefix: i,
    rest: r
  } = ac(e), s = lc(e), o = Yn("parseNodeAttributes", {}, e);
  let a = t.styleParser ? oc(e) : [];
  return x({
    iconName: n,
    title: e.getAttribute("title"),
    titleId: e.getAttribute("data-fa-title-id"),
    prefix: i,
    transform: ve,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: !1,
    extra: {
      classes: r,
      styles: a,
      attributes: s
    }
  }, o);
}
const {
  styles: uc
} = Se;
function jr(e) {
  const t = _.autoReplaceSvg === "nest" ? fs(e, {
    styleParser: !1
  }) : fs(e);
  return ~t.extra.classes.indexOf(yr) ? Ie("generateLayersText", e, t) : Ie("generateSvgReplacementMutation", e, t);
}
function fc() {
  return [...Ha, ...$n];
}
function ds(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!Pe) return Promise.resolve();
  const n = z.documentElement.classList, i = (l) => n.add("".concat(Zi, "-").concat(l)), r = (l) => n.remove("".concat(Zi, "-").concat(l)), s = _.autoFetchSvg ? fc() : ur.concat(Object.keys(uc));
  s.includes("fa") || s.push("fa");
  const o = [".".concat(yr, ":not([").concat(Ge, "])")].concat(s.map((l) => ".".concat(l, ":not([").concat(Ge, "])"))).join(", ");
  if (o.length === 0)
    return Promise.resolve();
  let a = [];
  try {
    a = rt(e.querySelectorAll(o));
  } catch {
  }
  if (a.length > 0)
    i("pending"), r("complete");
  else
    return Promise.resolve();
  const f = _i.begin("onTree"), u = a.reduce((l, c) => {
    try {
      const d = jr(c);
      d && l.push(d);
    } catch (d) {
      mr || d.name === "MissingIcon" && console.error(d);
    }
    return l;
  }, []);
  return new Promise((l, c) => {
    Promise.all(u).then((d) => {
      Mr(d, () => {
        i("active"), i("complete"), r("pending"), typeof t == "function" && t(), f(), l();
      });
    }).catch((d) => {
      f(), c(d);
    });
  });
}
function dc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  jr(e).then((n) => {
    n && Mr([n], t);
  });
}
function hc(e) {
  return function(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const i = (t || {}).icon ? t : Jn(t || {});
    let {
      mask: r
    } = n;
    return r && (r = (r || {}).icon ? r : Jn(r || {})), e(i, x(x({}, n), {}, {
      mask: r
    }));
  };
}
const pc = function(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    transform: n = ve,
    symbol: i = !1,
    mask: r = null,
    maskId: s = null,
    title: o = null,
    titleId: a = null,
    classes: f = [],
    attributes: u = {},
    styles: l = {}
  } = t;
  if (!e) return;
  const {
    prefix: c,
    iconName: d,
    icon: y
  } = e;
  return ln(x({
    type: "icon"
  }, e), () => (Ke("beforeDOMElementCreation", {
    iconDefinition: e,
    params: t
  }), _.autoA11y && (o ? u["aria-labelledby"] = "".concat(_.replacementClass, "-title-").concat(a || vt()) : (u["aria-hidden"] = "true", u.focusable = "false")), Ci({
    icons: {
      main: Xn(y),
      mask: r ? Xn(r.icon) : {
        found: !1,
        width: null,
        height: null,
        icon: {}
      }
    },
    prefix: c,
    iconName: d,
    transform: x(x({}, ve), n),
    symbol: i,
    title: o,
    maskId: s,
    titleId: a,
    extra: {
      attributes: u,
      styles: l,
      classes: f
    }
  })));
};
var mc = {
  mixout() {
    return {
      icon: hc(pc)
    };
  },
  hooks() {
    return {
      mutationObserverCallbacks(e) {
        return e.treeCallback = ds, e.nodeCallback = dc, e;
      }
    };
  },
  provides(e) {
    e.i2svg = function(t) {
      const {
        node: n = z,
        callback: i = () => {
        }
      } = t;
      return ds(n, i);
    }, e.generateSvgReplacementMutation = function(t, n) {
      const {
        iconName: i,
        title: r,
        titleId: s,
        prefix: o,
        transform: a,
        symbol: f,
        mask: u,
        maskId: l,
        extra: c
      } = n;
      return new Promise((d, y) => {
        Promise.all([Qn(i, o), u.iconName ? Qn(u.iconName, u.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        })]).then((b) => {
          let [v, w] = b;
          d([t, Ci({
            icons: {
              main: v,
              mask: w
            },
            prefix: o,
            iconName: i,
            transform: a,
            symbol: f,
            maskId: l,
            title: r,
            titleId: s,
            extra: c,
            watchable: !0
          })]);
        }).catch(y);
      });
    }, e.generateAbstractIcon = function(t) {
      let {
        children: n,
        attributes: i,
        main: r,
        transform: s,
        styles: o
      } = t;
      const a = rn(o);
      a.length > 0 && (i.style = a);
      let f;
      return xi(s) && (f = Ie("generateAbstractTransformGrouping", {
        main: r,
        transform: s,
        containerWidth: r.width,
        iconWidth: r.width
      })), n.push(f || r.icon), {
        children: n,
        attributes: i
      };
    };
  }
}, gc = {
  mixout() {
    return {
      layer(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          classes: n = []
        } = t;
        return ln({
          type: "layer"
        }, () => {
          Ke("beforeDOMElementCreation", {
            assembler: e,
            params: t
          });
          let i = [];
          return e((r) => {
            Array.isArray(r) ? r.map((s) => {
              i = i.concat(s.abstract);
            }) : i = i.concat(r.abstract);
          }), [{
            tag: "span",
            attributes: {
              class: ["".concat(_.cssPrefix, "-layers"), ...n].join(" ")
            },
            children: i
          }];
        });
      }
    };
  }
}, yc = {
  mixout() {
    return {
      counter(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          title: n = null,
          classes: i = [],
          attributes: r = {},
          styles: s = {}
        } = t;
        return ln({
          type: "counter",
          content: e
        }, () => (Ke("beforeDOMElementCreation", {
          content: e,
          params: t
        }), Yl({
          content: e.toString(),
          title: n,
          extra: {
            attributes: r,
            styles: s,
            classes: ["".concat(_.cssPrefix, "-layers-counter"), ...i]
          }
        })));
      }
    };
  }
}, bc = {
  mixout() {
    return {
      text(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          transform: n = ve,
          title: i = null,
          classes: r = [],
          attributes: s = {},
          styles: o = {}
        } = t;
        return ln({
          type: "text",
          content: e
        }, () => (Ke("beforeDOMElementCreation", {
          content: e,
          params: t
        }), os({
          content: e,
          transform: x(x({}, ve), n),
          title: i,
          extra: {
            attributes: s,
            styles: o,
            classes: ["".concat(_.cssPrefix, "-layers-text"), ...r]
          }
        })));
      }
    };
  },
  provides(e) {
    e.generateLayersText = function(t, n) {
      const {
        title: i,
        transform: r,
        extra: s
      } = n;
      let o = null, a = null;
      if (lr) {
        const f = parseInt(getComputedStyle(t).fontSize, 10), u = t.getBoundingClientRect();
        o = u.width / f, a = u.height / f;
      }
      return _.autoA11y && !i && (s.attributes["aria-hidden"] = "true"), Promise.resolve([t, os({
        content: t.innerHTML,
        width: o,
        height: a,
        transform: r,
        title: i,
        extra: s,
        watchable: !0
      })]);
    };
  }
};
const wc = new RegExp('"', "ug"), hs = [1105920, 1112319], ps = x(x(x(x({}, {
  FontAwesome: {
    normal: "fas",
    400: "fas"
  }
}), Ua), rl), Qa), ti = Object.keys(ps).reduce((e, t) => (e[t.toLowerCase()] = ps[t], e), {}), vc = Object.keys(ti).reduce((e, t) => {
  const n = ti[t];
  return e[t] = n[900] || [...Object.entries(n)][0][1], e;
}, {});
function Sc(e) {
  const t = e.replace(wc, ""), n = Pl(t, 0), i = n >= hs[0] && n <= hs[1], r = t.length === 2 ? t[0] === t[1] : !1;
  return {
    value: Gn(r ? t[0] : t),
    isSecondary: i || r
  };
}
function xc(e, t) {
  const n = e.replace(/^['"]|['"]$/g, "").toLowerCase(), i = parseInt(t), r = isNaN(i) ? "normal" : i;
  return (ti[n] || {})[r] || vc[n];
}
function ms(e, t) {
  const n = "".concat(ol).concat(t.replace(":", "-"));
  return new Promise((i, r) => {
    if (e.getAttribute(n) !== null)
      return i();
    const o = rt(e.children).filter((d) => d.getAttribute(qn) === t)[0], a = je.getComputedStyle(e, t), f = a.getPropertyValue("font-family"), u = f.match(fl), l = a.getPropertyValue("font-weight"), c = a.getPropertyValue("content");
    if (o && !u)
      return e.removeChild(o), i();
    if (u && c !== "none" && c !== "") {
      const d = a.getPropertyValue("content");
      let y = xc(f, l);
      const {
        value: b,
        isSecondary: v
      } = Sc(d), w = u[0].startsWith("FontAwesome");
      let m = Oi(y, b), g = m;
      if (w) {
        const k = Ll(b);
        k.iconName && k.prefix && (m = k.iconName, y = k.prefix);
      }
      if (m && !v && (!o || o.getAttribute(bi) !== y || o.getAttribute(wi) !== g)) {
        e.setAttribute(n, g), o && e.removeChild(o);
        const k = cc(), {
          extra: A
        } = k;
        A.attributes[qn] = t, Qn(m, y).then((P) => {
          const D = Ci(x(x({}, k), {}, {
            icons: {
              main: P,
              mask: Tr()
            },
            prefix: y,
            iconName: g,
            extra: A,
            watchable: !0
          })), L = z.createElementNS("http://www.w3.org/2000/svg", "svg");
          t === "::before" ? e.insertBefore(L, e.firstChild) : e.appendChild(L), L.outerHTML = D.map((B) => At(B)).join(`
`), e.removeAttribute(n), i();
        }).catch(r);
      } else
        i();
    } else
      i();
  });
}
function kc(e) {
  return Promise.all([ms(e, "::before"), ms(e, "::after")]);
}
function Oc(e) {
  return e.parentNode !== document.head && !~ll.indexOf(e.tagName.toUpperCase()) && !e.getAttribute(qn) && (!e.parentNode || e.parentNode.tagName !== "svg");
}
function gs(e) {
  if (Pe)
    return new Promise((t, n) => {
      const i = rt(e.querySelectorAll("*")).filter(Oc).map(kc), r = _i.begin("searchPseudoElements");
      Dr(), Promise.all(i).then(() => {
        r(), ei(), t();
      }).catch(() => {
        r(), ei(), n();
      });
    });
}
var Cc = {
  hooks() {
    return {
      mutationObserverCallbacks(e) {
        return e.pseudoElementsCallback = gs, e;
      }
    };
  },
  provides(e) {
    e.pseudoElements2svg = function(t) {
      const {
        node: n = z
      } = t;
      _.searchPseudoElements && gs(n);
    };
  }
};
let ys = !1;
var _c = {
  mixout() {
    return {
      dom: {
        unwatch() {
          Dr(), ys = !0;
        }
      }
    };
  },
  hooks() {
    return {
      bootstrap() {
        us(Yn("mutationObserverCallbacks", {}));
      },
      noAuto() {
        rc();
      },
      watch(e) {
        const {
          observeMutationsRoot: t
        } = e;
        ys ? ei() : us(Yn("mutationObserverCallbacks", {
          observeMutationsRoot: t
        }));
      }
    };
  }
};
const bs = (e) => {
  let t = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return e.toLowerCase().split(" ").reduce((n, i) => {
    const r = i.toLowerCase().split("-"), s = r[0];
    let o = r.slice(1).join("-");
    if (s && o === "h")
      return n.flipX = !0, n;
    if (s && o === "v")
      return n.flipY = !0, n;
    if (o = parseFloat(o), isNaN(o))
      return n;
    switch (s) {
      case "grow":
        n.size = n.size + o;
        break;
      case "shrink":
        n.size = n.size - o;
        break;
      case "left":
        n.x = n.x - o;
        break;
      case "right":
        n.x = n.x + o;
        break;
      case "up":
        n.y = n.y - o;
        break;
      case "down":
        n.y = n.y + o;
        break;
      case "rotate":
        n.rotate = n.rotate + o;
        break;
    }
    return n;
  }, t);
};
var Pc = {
  mixout() {
    return {
      parse: {
        transform: (e) => bs(e)
      }
    };
  },
  hooks() {
    return {
      parseNodeAttributes(e, t) {
        const n = t.getAttribute("data-fa-transform");
        return n && (e.transform = bs(n)), e;
      }
    };
  },
  provides(e) {
    e.generateAbstractTransformGrouping = function(t) {
      let {
        main: n,
        transform: i,
        containerWidth: r,
        iconWidth: s
      } = t;
      const o = {
        transform: "translate(".concat(r / 2, " 256)")
      }, a = "translate(".concat(i.x * 32, ", ").concat(i.y * 32, ") "), f = "scale(".concat(i.size / 16 * (i.flipX ? -1 : 1), ", ").concat(i.size / 16 * (i.flipY ? -1 : 1), ") "), u = "rotate(".concat(i.rotate, " 0 0)"), l = {
        transform: "".concat(a, " ").concat(f, " ").concat(u)
      }, c = {
        transform: "translate(".concat(s / 2 * -1, " -256)")
      }, d = {
        outer: o,
        inner: l,
        path: c
      };
      return {
        tag: "g",
        attributes: x({}, d.outer),
        children: [{
          tag: "g",
          attributes: x({}, d.inner),
          children: [{
            tag: n.icon.tag,
            children: n.icon.children,
            attributes: x(x({}, n.icon.attributes), d.path)
          }]
        }]
      };
    };
  }
};
const Tn = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function ws(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function Fc(e) {
  return e.tag === "g" ? e.children : [e];
}
var Ac = {
  hooks() {
    return {
      parseNodeAttributes(e, t) {
        const n = t.getAttribute("data-fa-mask"), i = n ? an(n.split(" ").map((r) => r.trim())) : Tr();
        return i.prefix || (i.prefix = ze()), e.mask = i, e.maskId = t.getAttribute("data-fa-mask-id"), e;
      }
    };
  },
  provides(e) {
    e.generateAbstractMask = function(t) {
      let {
        children: n,
        attributes: i,
        main: r,
        mask: s,
        maskId: o,
        transform: a
      } = t;
      const {
        width: f,
        icon: u
      } = r, {
        width: l,
        icon: c
      } = s, d = Sl({
        transform: a,
        containerWidth: l,
        iconWidth: f
      }), y = {
        tag: "rect",
        attributes: x(x({}, Tn), {}, {
          fill: "white"
        })
      }, b = u.children ? {
        children: u.children.map(ws)
      } : {}, v = {
        tag: "g",
        attributes: x({}, d.inner),
        children: [ws(x({
          tag: u.tag,
          attributes: x(x({}, u.attributes), d.path)
        }, b))]
      }, w = {
        tag: "g",
        attributes: x({}, d.outer),
        children: [v]
      }, m = "mask-".concat(o || vt()), g = "clip-".concat(o || vt()), k = {
        tag: "mask",
        attributes: x(x({}, Tn), {}, {
          id: m,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        }),
        children: [y, w]
      }, A = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: g
          },
          children: Fc(c)
        }, k]
      };
      return n.push(A, {
        tag: "rect",
        attributes: x({
          fill: "currentColor",
          "clip-path": "url(#".concat(g, ")"),
          mask: "url(#".concat(m, ")")
        }, Tn)
      }), {
        children: n,
        attributes: i
      };
    };
  }
}, Rc = {
  provides(e) {
    let t = !1;
    je.matchMedia && (t = je.matchMedia("(prefers-reduced-motion: reduce)").matches), e.missingIconAbstract = function() {
      const n = [], i = {
        fill: "currentColor"
      }, r = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      n.push({
        tag: "path",
        attributes: x(x({}, i), {}, {
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
      });
      const s = x(x({}, r), {}, {
        attributeName: "opacity"
      }), o = {
        tag: "circle",
        attributes: x(x({}, i), {}, {
          cx: "256",
          cy: "364",
          r: "28"
        }),
        children: []
      };
      return t || o.children.push({
        tag: "animate",
        attributes: x(x({}, r), {}, {
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        })
      }, {
        tag: "animate",
        attributes: x(x({}, s), {}, {
          values: "1;0;1;1;0;1;"
        })
      }), n.push(o), n.push({
        tag: "path",
        attributes: x(x({}, i), {}, {
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }),
        children: t ? [] : [{
          tag: "animate",
          attributes: x(x({}, s), {}, {
            values: "1;0;0;0;0;1;"
          })
        }]
      }), t || n.push({
        tag: "path",
        attributes: x(x({}, i), {}, {
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        }),
        children: [{
          tag: "animate",
          attributes: x(x({}, s), {}, {
            values: "0;0;1;1;0;0;"
          })
        }]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: n
      };
    };
  }
}, Tc = {
  hooks() {
    return {
      parseNodeAttributes(e, t) {
        const n = t.getAttribute("data-fa-symbol"), i = n === null ? !1 : n === "" ? !0 : n;
        return e.symbol = i, e;
      }
    };
  }
}, Ec = [Ol, mc, gc, yc, bc, Cc, _c, Pc, Ac, Rc, Tc];
Ul(Ec, {
  mixoutsTo: ie
});
ie.noAuto;
const zr = ie.config, Lc = ie.library;
ie.dom;
const Kt = ie.parse;
ie.findIconDefinition;
ie.toHtml;
const Nc = ie.icon;
ie.layer;
const Mc = ie.text;
ie.counter;
function vs(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    t && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vs(Object(n), !0).forEach(function(i) {
      Q(e, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vs(Object(n)).forEach(function(i) {
      Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return e;
}
function Dc(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function jc(e) {
  var t = Dc(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Yt(e) {
  "@babel/helpers - typeof";
  return Yt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Yt(e);
}
function Q(e, t, n) {
  return t = jc(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function zc(e, t) {
  if (e == null) return {};
  var n = {};
  for (var i in e)
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      if (t.indexOf(i) >= 0) continue;
      n[i] = e[i];
    }
  return n;
}
function Ic(e, t) {
  if (e == null) return {};
  var n = zc(e, t), i, r;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++)
      i = s[r], !(t.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(e, i) && (n[i] = e[i]);
  }
  return n;
}
function ni(e) {
  return Bc(e) || $c(e) || Uc(e) || qc();
}
function Bc(e) {
  if (Array.isArray(e)) return ii(e);
}
function $c(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Uc(e, t) {
  if (e) {
    if (typeof e == "string") return ii(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ii(e, t);
  }
}
function ii(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
  return i;
}
function qc() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Vc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ir = { exports: {} };
(function(e) {
  (function(t) {
    var n = function(m, g, k) {
      if (!u(g) || c(g) || d(g) || y(g) || f(g))
        return g;
      var A, P = 0, D = 0;
      if (l(g))
        for (A = [], D = g.length; P < D; P++)
          A.push(n(m, g[P], k));
      else {
        A = {};
        for (var L in g)
          Object.prototype.hasOwnProperty.call(g, L) && (A[m(L, k)] = n(m, g[L], k));
      }
      return A;
    }, i = function(m, g) {
      g = g || {};
      var k = g.separator || "_", A = g.split || /(?=[A-Z])/;
      return m.split(A).join(k);
    }, r = function(m) {
      return b(m) ? m : (m = m.replace(/[\-_\s]+(.)?/g, function(g, k) {
        return k ? k.toUpperCase() : "";
      }), m.substr(0, 1).toLowerCase() + m.substr(1));
    }, s = function(m) {
      var g = r(m);
      return g.substr(0, 1).toUpperCase() + g.substr(1);
    }, o = function(m, g) {
      return i(m, g).toLowerCase();
    }, a = Object.prototype.toString, f = function(m) {
      return typeof m == "function";
    }, u = function(m) {
      return m === Object(m);
    }, l = function(m) {
      return a.call(m) == "[object Array]";
    }, c = function(m) {
      return a.call(m) == "[object Date]";
    }, d = function(m) {
      return a.call(m) == "[object RegExp]";
    }, y = function(m) {
      return a.call(m) == "[object Boolean]";
    }, b = function(m) {
      return m = m - 0, m === m;
    }, v = function(m, g) {
      var k = g && "process" in g ? g.process : g;
      return typeof k != "function" ? m : function(A, P) {
        return k(A, m, P);
      };
    }, w = {
      camelize: r,
      decamelize: o,
      pascalize: s,
      depascalize: o,
      camelizeKeys: function(m, g) {
        return n(v(r, g), m);
      },
      decamelizeKeys: function(m, g) {
        return n(v(o, g), m, g);
      },
      pascalizeKeys: function(m, g) {
        return n(v(s, g), m);
      },
      depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };
    e.exports ? e.exports = w : t.humps = w;
  })(Vc);
})(Ir);
var Hc = Ir.exports, Wc = ["class", "style"];
function Gc(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, n) {
    var i = n.indexOf(":"), r = Hc.camelize(n.slice(0, i)), s = n.slice(i + 1).trim();
    return t[r] = s, t;
  }, {});
}
function Kc(e) {
  return e.split(/\s+/).reduce(function(t, n) {
    return t[n] = !0, t;
  }, {});
}
function Fi(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof e == "string")
    return e;
  var i = (e.children || []).map(function(f) {
    return Fi(f);
  }), r = Object.keys(e.attributes || {}).reduce(function(f, u) {
    var l = e.attributes[u];
    switch (u) {
      case "class":
        f.class = Kc(l);
        break;
      case "style":
        f.style = Gc(l);
        break;
      default:
        f.attrs[u] = l;
    }
    return f;
  }, {
    attrs: {},
    class: {},
    style: {}
  });
  n.class;
  var s = n.style, o = s === void 0 ? {} : s, a = Ic(n, Wc);
  return mi(e.tag, pe(pe(pe({}, t), {}, {
    class: r.class,
    style: pe(pe({}, r.style), o)
  }, r.attrs), a), i);
}
var Br = !1;
try {
  Br = process.env.NODE_ENV === "production";
} catch {
}
function Yc() {
  if (!Br && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function pt(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? Q({}, e, t) : {};
}
function Jc(e) {
  var t, n = (t = {
    "fa-spin": e.spin,
    "fa-pulse": e.pulse,
    "fa-fw": e.fixedWidth,
    "fa-border": e.border,
    "fa-li": e.listItem,
    "fa-inverse": e.inverse,
    "fa-flip": e.flip === !0,
    "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
    "fa-flip-vertical": e.flip === "vertical" || e.flip === "both"
  }, Q(Q(Q(Q(Q(Q(Q(Q(Q(Q(t, "fa-".concat(e.size), e.size !== null), "fa-rotate-".concat(e.rotation), e.rotation !== null), "fa-pull-".concat(e.pull), e.pull !== null), "fa-swap-opacity", e.swapOpacity), "fa-bounce", e.bounce), "fa-shake", e.shake), "fa-beat", e.beat), "fa-fade", e.fade), "fa-beat-fade", e.beatFade), "fa-flash", e.flash), Q(Q(t, "fa-spin-pulse", e.spinPulse), "fa-spin-reverse", e.spinReverse));
  return Object.keys(n).map(function(i) {
    return n[i] ? i : null;
  }).filter(function(i) {
    return i;
  });
}
function Ss(e) {
  if (e && Yt(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (Kt.icon)
    return Kt.icon(e);
  if (e === null)
    return null;
  if (Yt(e) === "object" && e.prefix && e.iconName)
    return e;
  if (Array.isArray(e) && e.length === 2)
    return {
      prefix: e[0],
      iconName: e[1]
    };
  if (typeof e == "string")
    return {
      prefix: "fas",
      iconName: e
    };
}
var Xc = Je({
  name: "FontAwesomeIcon",
  props: {
    border: {
      type: Boolean,
      default: !1
    },
    fixedWidth: {
      type: Boolean,
      default: !1
    },
    flip: {
      type: [Boolean, String],
      default: !1,
      validator: function(t) {
        return [!0, !1, "horizontal", "vertical", "both"].indexOf(t) > -1;
      }
    },
    icon: {
      type: [Object, Array, String],
      required: !0
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    maskId: {
      type: String,
      default: null
    },
    listItem: {
      type: Boolean,
      default: !1
    },
    pull: {
      type: String,
      default: null,
      validator: function(t) {
        return ["right", "left"].indexOf(t) > -1;
      }
    },
    pulse: {
      type: Boolean,
      default: !1
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function(t) {
        return [90, 180, 270].indexOf(Number.parseInt(t, 10)) > -1;
      }
    },
    swapOpacity: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: null,
      validator: function(t) {
        return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(t) > -1;
      }
    },
    spin: {
      type: Boolean,
      default: !1
    },
    transform: {
      type: [String, Object],
      default: null
    },
    symbol: {
      type: [Boolean, String],
      default: !1
    },
    title: {
      type: String,
      default: null
    },
    titleId: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: !1
    },
    bounce: {
      type: Boolean,
      default: !1
    },
    shake: {
      type: Boolean,
      default: !1
    },
    beat: {
      type: Boolean,
      default: !1
    },
    fade: {
      type: Boolean,
      default: !1
    },
    beatFade: {
      type: Boolean,
      default: !1
    },
    flash: {
      type: Boolean,
      default: !1
    },
    spinPulse: {
      type: Boolean,
      default: !1
    },
    spinReverse: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, n) {
    var i = n.attrs, r = he(function() {
      return Ss(t.icon);
    }), s = he(function() {
      return pt("classes", Jc(t));
    }), o = he(function() {
      return pt("transform", typeof t.transform == "string" ? Kt.transform(t.transform) : t.transform);
    }), a = he(function() {
      return pt("mask", Ss(t.mask));
    }), f = he(function() {
      return Nc(r.value, pe(pe(pe(pe({}, s.value), o.value), a.value), {}, {
        symbol: t.symbol,
        title: t.title,
        titleId: t.titleId,
        maskId: t.maskId
      }));
    });
    Bo(f, function(l) {
      if (!l)
        return Yc("Could not find one or more icon(s)", r.value, a.value);
    }, {
      immediate: !0
    });
    var u = he(function() {
      return f.value ? Fi(f.value.abstract[0], {}, i) : null;
    });
    return function() {
      return u.value;
    };
  }
});
Je({
  name: "FontAwesomeLayers",
  props: {
    fixedWidth: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, n) {
    var i = n.slots, r = zr.familyPrefix, s = he(function() {
      return ["".concat(r, "-layers")].concat(ni(t.fixedWidth ? ["".concat(r, "-fw")] : []));
    });
    return function() {
      return mi("div", {
        class: s.value
      }, i.default ? i.default() : []);
    };
  }
});
Je({
  name: "FontAwesomeLayersText",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    transform: {
      type: [String, Object],
      default: null
    },
    counter: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      default: null,
      validator: function(t) {
        return ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(t) > -1;
      }
    }
  },
  setup: function(t, n) {
    var i = n.attrs, r = zr.familyPrefix, s = he(function() {
      return pt("classes", [].concat(ni(t.counter ? ["".concat(r, "-layers-counter")] : []), ni(t.position ? ["".concat(r, "-layers-").concat(t.position)] : [])));
    }), o = he(function() {
      return pt("transform", typeof t.transform == "string" ? Kt.transform(t.transform) : t.transform);
    }), a = he(function() {
      var u = Mc(t.value.toString(), pe(pe({}, o.value), s.value)), l = u.abstract;
      return t.counter && (l[0].attributes.class = l[0].attributes.class.replace("fa-layers-text", "")), l[0];
    }), f = he(function() {
      return Fi(a.value, {}, i);
    });
    return function() {
      return f.value;
    };
  }
});
const Qc = ["top", "right", "bottom", "left"], xs = ["start", "end"], ks = /* @__PURE__ */ Qc.reduce((e, t) => e.concat(t, t + "-" + xs[0], t + "-" + xs[1]), []), xt = Math.min, Ue = Math.max, Zc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, eu = {
  start: "end",
  end: "start"
};
function si(e, t, n) {
  return Ue(e, xt(t, n));
}
function Xe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Oe(e) {
  return e.split("-")[0];
}
function ge(e) {
  return e.split("-")[1];
}
function $r(e) {
  return e === "x" ? "y" : "x";
}
function Ai(e) {
  return e === "y" ? "height" : "width";
}
function Ne(e) {
  return ["top", "bottom"].includes(Oe(e)) ? "y" : "x";
}
function Ri(e) {
  return $r(Ne(e));
}
function Ur(e, t, n) {
  n === void 0 && (n = !1);
  const i = ge(e), r = Ri(e), s = Ai(r);
  let o = r === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (o = Xt(o)), [o, Xt(o)];
}
function tu(e) {
  const t = Xt(e);
  return [Jt(e), t, Jt(t)];
}
function Jt(e) {
  return e.replace(/start|end/g, (t) => eu[t]);
}
function nu(e, t, n) {
  const i = ["left", "right"], r = ["right", "left"], s = ["top", "bottom"], o = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? r : i : t ? i : r;
    case "left":
    case "right":
      return t ? s : o;
    default:
      return [];
  }
}
function iu(e, t, n, i) {
  const r = ge(e);
  let s = nu(Oe(e), n === "start", i);
  return r && (s = s.map((o) => o + "-" + r), t && (s = s.concat(s.map(Jt)))), s;
}
function Xt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Zc[t]);
}
function su(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function qr(e) {
  return typeof e != "number" ? su(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function mt(e) {
  const {
    x: t,
    y: n,
    width: i,
    height: r
  } = e;
  return {
    width: i,
    height: r,
    top: n,
    left: t,
    right: t + i,
    bottom: n + r,
    x: t,
    y: n
  };
}
function Os(e, t, n) {
  let {
    reference: i,
    floating: r
  } = e;
  const s = Ne(t), o = Ri(t), a = Ai(o), f = Oe(t), u = s === "y", l = i.x + i.width / 2 - r.width / 2, c = i.y + i.height / 2 - r.height / 2, d = i[a] / 2 - r[a] / 2;
  let y;
  switch (f) {
    case "top":
      y = {
        x: l,
        y: i.y - r.height
      };
      break;
    case "bottom":
      y = {
        x: l,
        y: i.y + i.height
      };
      break;
    case "right":
      y = {
        x: i.x + i.width,
        y: c
      };
      break;
    case "left":
      y = {
        x: i.x - r.width,
        y: c
      };
      break;
    default:
      y = {
        x: i.x,
        y: i.y
      };
  }
  switch (ge(t)) {
    case "start":
      y[o] -= d * (n && u ? -1 : 1);
      break;
    case "end":
      y[o] += d * (n && u ? -1 : 1);
      break;
  }
  return y;
}
const ru = async (e, t, n) => {
  const {
    placement: i = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: o
  } = n, a = s.filter(Boolean), f = await (o.isRTL == null ? void 0 : o.isRTL(t));
  let u = await o.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: l,
    y: c
  } = Os(u, i, f), d = i, y = {}, b = 0;
  for (let v = 0; v < a.length; v++) {
    const {
      name: w,
      fn: m
    } = a[v], {
      x: g,
      y: k,
      data: A,
      reset: P
    } = await m({
      x: l,
      y: c,
      initialPlacement: i,
      placement: d,
      strategy: r,
      middlewareData: y,
      rects: u,
      platform: o,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = g ?? l, c = k ?? c, y = {
      ...y,
      [w]: {
        ...y[w],
        ...A
      }
    }, P && b <= 50 && (b++, typeof P == "object" && (P.placement && (d = P.placement), P.rects && (u = P.rects === !0 ? await o.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : P.rects), {
      x: l,
      y: c
    } = Os(u, d, f)), v = -1);
  }
  return {
    x: l,
    y: c,
    placement: d,
    strategy: r,
    middlewareData: y
  };
};
async function cn(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: i,
    y: r,
    platform: s,
    rects: o,
    elements: a,
    strategy: f
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: c = "floating",
    altBoundary: d = !1,
    padding: y = 0
  } = Xe(t, e), b = qr(y), w = a[d ? c === "floating" ? "reference" : "floating" : c], m = mt(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(w))) == null || n ? w : w.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: u,
    rootBoundary: l,
    strategy: f
  })), g = c === "floating" ? {
    x: i,
    y: r,
    width: o.floating.width,
    height: o.floating.height
  } : o.reference, k = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), A = await (s.isElement == null ? void 0 : s.isElement(k)) ? await (s.getScale == null ? void 0 : s.getScale(k)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, P = mt(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: g,
    offsetParent: k,
    strategy: f
  }) : g);
  return {
    top: (m.top - P.top + b.top) / A.y,
    bottom: (P.bottom - m.bottom + b.bottom) / A.y,
    left: (m.left - P.left + b.left) / A.x,
    right: (P.right - m.right + b.right) / A.x
  };
}
const ou = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: i,
      placement: r,
      rects: s,
      platform: o,
      elements: a,
      middlewareData: f
    } = t, {
      element: u,
      padding: l = 0
    } = Xe(e, t) || {};
    if (u == null)
      return {};
    const c = qr(l), d = {
      x: n,
      y: i
    }, y = Ri(r), b = Ai(y), v = await o.getDimensions(u), w = y === "y", m = w ? "top" : "left", g = w ? "bottom" : "right", k = w ? "clientHeight" : "clientWidth", A = s.reference[b] + s.reference[y] - d[y] - s.floating[b], P = d[y] - s.reference[y], D = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
    let L = D ? D[k] : 0;
    (!L || !await (o.isElement == null ? void 0 : o.isElement(D))) && (L = a.floating[k] || s.floating[b]);
    const B = A / 2 - P / 2, $ = L / 2 - v[b] / 2 - 1, j = xt(c[m], $), H = xt(c[g], $), J = j, te = L - v[b] - H, X = L / 2 - v[b] / 2 + B, G = si(J, X, te), le = !f.arrow && ge(r) != null && X !== G && s.reference[b] / 2 - (X < J ? j : H) - v[b] / 2 < 0, se = le ? X < J ? X - J : X - te : 0;
    return {
      [y]: d[y] + se,
      data: {
        [y]: G,
        centerOffset: X - G - se,
        ...le && {
          alignmentOffset: se
        }
      },
      reset: le
    };
  }
});
function au(e, t, n) {
  return (e ? [...n.filter((r) => ge(r) === e), ...n.filter((r) => ge(r) !== e)] : n.filter((r) => Oe(r) === r)).filter((r) => e ? ge(r) === e || (t ? Jt(r) !== r : !1) : !0);
}
const lu = function(e) {
  return e === void 0 && (e = {}), {
    name: "autoPlacement",
    options: e,
    async fn(t) {
      var n, i, r;
      const {
        rects: s,
        middlewareData: o,
        placement: a,
        platform: f,
        elements: u
      } = t, {
        crossAxis: l = !1,
        alignment: c,
        allowedPlacements: d = ks,
        autoAlignment: y = !0,
        ...b
      } = Xe(e, t), v = c !== void 0 || d === ks ? au(c || null, y, d) : d, w = await cn(t, b), m = ((n = o.autoPlacement) == null ? void 0 : n.index) || 0, g = v[m];
      if (g == null)
        return {};
      const k = Ur(g, s, await (f.isRTL == null ? void 0 : f.isRTL(u.floating)));
      if (a !== g)
        return {
          reset: {
            placement: v[0]
          }
        };
      const A = [w[Oe(g)], w[k[0]], w[k[1]]], P = [...((i = o.autoPlacement) == null ? void 0 : i.overflows) || [], {
        placement: g,
        overflows: A
      }], D = v[m + 1];
      if (D)
        return {
          data: {
            index: m + 1,
            overflows: P
          },
          reset: {
            placement: D
          }
        };
      const L = P.map((j) => {
        const H = ge(j.placement);
        return [j.placement, H && l ? (
          // Check along the mainAxis and main crossAxis side.
          j.overflows.slice(0, 2).reduce((J, te) => J + te, 0)
        ) : (
          // Check only the mainAxis.
          j.overflows[0]
        ), j.overflows];
      }).sort((j, H) => j[1] - H[1]), $ = ((r = L.filter((j) => j[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        ge(j[0]) ? 2 : 3
      ).every((H) => H <= 0))[0]) == null ? void 0 : r[0]) || L[0][0];
      return $ !== a ? {
        data: {
          index: m + 1,
          overflows: P
        },
        reset: {
          placement: $
        }
      } : {};
    }
  };
}, cu = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, i;
      const {
        placement: r,
        middlewareData: s,
        rects: o,
        initialPlacement: a,
        platform: f,
        elements: u
      } = t, {
        mainAxis: l = !0,
        crossAxis: c = !0,
        fallbackPlacements: d,
        fallbackStrategy: y = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: v = !0,
        ...w
      } = Xe(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const m = Oe(r), g = Ne(a), k = Oe(a) === a, A = await (f.isRTL == null ? void 0 : f.isRTL(u.floating)), P = d || (k || !v ? [Xt(a)] : tu(a)), D = b !== "none";
      !d && D && P.push(...iu(a, v, b, A));
      const L = [a, ...P], B = await cn(t, w), $ = [];
      let j = ((i = s.flip) == null ? void 0 : i.overflows) || [];
      if (l && $.push(B[m]), c) {
        const G = Ur(r, o, A);
        $.push(B[G[0]], B[G[1]]);
      }
      if (j = [...j, {
        placement: r,
        overflows: $
      }], !$.every((G) => G <= 0)) {
        var H, J;
        const G = (((H = s.flip) == null ? void 0 : H.index) || 0) + 1, le = L[G];
        if (le) {
          var te;
          const ce = c === "alignment" ? g !== Ne(le) : !1, ne = ((te = j[0]) == null ? void 0 : te.overflows[0]) > 0;
          if (!ce || ne)
            return {
              data: {
                index: G,
                overflows: j
              },
              reset: {
                placement: le
              }
            };
        }
        let se = (J = j.filter((ce) => ce.overflows[0] <= 0).sort((ce, ne) => ce.overflows[1] - ne.overflows[1])[0]) == null ? void 0 : J.placement;
        if (!se)
          switch (y) {
            case "bestFit": {
              var X;
              const ce = (X = j.filter((ne) => {
                if (D) {
                  const ue = Ne(ne.placement);
                  return ue === g || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ue === "y";
                }
                return !0;
              }).map((ne) => [ne.placement, ne.overflows.filter((ue) => ue > 0).reduce((ue, Et) => ue + Et, 0)]).sort((ne, ue) => ne[1] - ue[1])[0]) == null ? void 0 : X[0];
              ce && (se = ce);
              break;
            }
            case "initialPlacement":
              se = a;
              break;
          }
        if (r !== se)
          return {
            reset: {
              placement: se
            }
          };
      }
      return {};
    }
  };
};
async function uu(e, t) {
  const {
    placement: n,
    platform: i,
    elements: r
  } = e, s = await (i.isRTL == null ? void 0 : i.isRTL(r.floating)), o = Oe(n), a = ge(n), f = Ne(n) === "y", u = ["left", "top"].includes(o) ? -1 : 1, l = s && f ? -1 : 1, c = Xe(t, e);
  let {
    mainAxis: d,
    crossAxis: y,
    alignmentAxis: b
  } = typeof c == "number" ? {
    mainAxis: c,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: c.mainAxis || 0,
    crossAxis: c.crossAxis || 0,
    alignmentAxis: c.alignmentAxis
  };
  return a && typeof b == "number" && (y = a === "end" ? b * -1 : b), f ? {
    x: y * l,
    y: d * u
  } : {
    x: d * u,
    y: y * l
  };
}
const fu = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, i;
      const {
        x: r,
        y: s,
        placement: o,
        middlewareData: a
      } = t, f = await uu(t, e);
      return o === ((n = a.offset) == null ? void 0 : n.placement) && (i = a.arrow) != null && i.alignmentOffset ? {} : {
        x: r + f.x,
        y: s + f.y,
        data: {
          ...f,
          placement: o
        }
      };
    }
  };
}, du = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: i,
        placement: r
      } = t, {
        mainAxis: s = !0,
        crossAxis: o = !1,
        limiter: a = {
          fn: (w) => {
            let {
              x: m,
              y: g
            } = w;
            return {
              x: m,
              y: g
            };
          }
        },
        ...f
      } = Xe(e, t), u = {
        x: n,
        y: i
      }, l = await cn(t, f), c = Ne(Oe(r)), d = $r(c);
      let y = u[d], b = u[c];
      if (s) {
        const w = d === "y" ? "top" : "left", m = d === "y" ? "bottom" : "right", g = y + l[w], k = y - l[m];
        y = si(g, y, k);
      }
      if (o) {
        const w = c === "y" ? "top" : "left", m = c === "y" ? "bottom" : "right", g = b + l[w], k = b - l[m];
        b = si(g, b, k);
      }
      const v = a.fn({
        ...t,
        [d]: y,
        [c]: b
      });
      return {
        ...v,
        data: {
          x: v.x - n,
          y: v.y - i,
          enabled: {
            [d]: s,
            [c]: o
          }
        }
      };
    }
  };
}, hu = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, i;
      const {
        placement: r,
        rects: s,
        platform: o,
        elements: a
      } = t, {
        apply: f = () => {
        },
        ...u
      } = Xe(e, t), l = await cn(t, u), c = Oe(r), d = ge(r), y = Ne(r) === "y", {
        width: b,
        height: v
      } = s.floating;
      let w, m;
      c === "top" || c === "bottom" ? (w = c, m = d === (await (o.isRTL == null ? void 0 : o.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (m = c, w = d === "end" ? "top" : "bottom");
      const g = v - l.top - l.bottom, k = b - l.left - l.right, A = xt(v - l[w], g), P = xt(b - l[m], k), D = !t.middlewareData.shift;
      let L = A, B = P;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (B = k), (i = t.middlewareData.shift) != null && i.enabled.y && (L = g), D && !d) {
        const j = Ue(l.left, 0), H = Ue(l.right, 0), J = Ue(l.top, 0), te = Ue(l.bottom, 0);
        y ? B = b - 2 * (j !== 0 || H !== 0 ? j + H : Ue(l.left, l.right)) : L = v - 2 * (J !== 0 || te !== 0 ? J + te : Ue(l.top, l.bottom));
      }
      await f({
        ...t,
        availableWidth: B,
        availableHeight: L
      });
      const $ = await o.getDimensions(a.floating);
      return b !== $.width || v !== $.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ae(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function xe(e) {
  return ae(e).getComputedStyle(e);
}
const Cs = Math.min, gt = Math.max, Qt = Math.round;
function Vr(e) {
  const t = xe(e);
  let n = parseFloat(t.width), i = parseFloat(t.height);
  const r = e.offsetWidth, s = e.offsetHeight, o = Qt(n) !== r || Qt(i) !== s;
  return o && (n = r, i = s), { width: n, height: i, fallback: o };
}
function Be(e) {
  return Wr(e) ? (e.nodeName || "").toLowerCase() : "";
}
let jt;
function Hr() {
  if (jt) return jt;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (jt = e.brands.map((t) => t.brand + "/" + t.version).join(" "), jt) : navigator.userAgent;
}
function ke(e) {
  return e instanceof ae(e).HTMLElement;
}
function Me(e) {
  return e instanceof ae(e).Element;
}
function Wr(e) {
  return e instanceof ae(e).Node;
}
function _s(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ae(e).ShadowRoot || e instanceof ShadowRoot;
}
function un(e) {
  const { overflow: t, overflowX: n, overflowY: i, display: r } = xe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + i + n) && !["inline", "contents"].includes(r);
}
function pu(e) {
  return ["table", "td", "th"].includes(Be(e));
}
function ri(e) {
  const t = /firefox/i.test(Hr()), n = xe(e), i = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || !!i && i !== "none" || t && n.willChange === "filter" || t && !!n.filter && n.filter !== "none" || ["transform", "perspective"].some((r) => n.willChange.includes(r)) || ["paint", "layout", "strict", "content"].some((r) => {
    const s = n.contain;
    return s != null && s.includes(r);
  });
}
function Gr() {
  return !/^((?!chrome|android).)*safari/i.test(Hr());
}
function Ti(e) {
  return ["html", "body", "#document"].includes(Be(e));
}
function Kr(e) {
  return Me(e) ? e : e.contextElement;
}
const Yr = { x: 1, y: 1 };
function nt(e) {
  const t = Kr(e);
  if (!ke(t)) return Yr;
  const n = t.getBoundingClientRect(), { width: i, height: r, fallback: s } = Vr(t);
  let o = (s ? Qt(n.width) : n.width) / i, a = (s ? Qt(n.height) : n.height) / r;
  return o && Number.isFinite(o) || (o = 1), a && Number.isFinite(a) || (a = 1), { x: o, y: a };
}
function kt(e, t, n, i) {
  var r, s;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = Kr(e);
  let f = Yr;
  t && (i ? Me(i) && (f = nt(i)) : f = nt(e));
  const u = a ? ae(a) : window, l = !Gr() && n;
  let c = (o.left + (l && ((r = u.visualViewport) == null ? void 0 : r.offsetLeft) || 0)) / f.x, d = (o.top + (l && ((s = u.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / f.y, y = o.width / f.x, b = o.height / f.y;
  if (a) {
    const v = ae(a), w = i && Me(i) ? ae(i) : i;
    let m = v.frameElement;
    for (; m && i && w !== v; ) {
      const g = nt(m), k = m.getBoundingClientRect(), A = getComputedStyle(m);
      k.x += (m.clientLeft + parseFloat(A.paddingLeft)) * g.x, k.y += (m.clientTop + parseFloat(A.paddingTop)) * g.y, c *= g.x, d *= g.y, y *= g.x, b *= g.y, c += k.x, d += k.y, m = ae(m).frameElement;
    }
  }
  return { width: y, height: b, top: d, right: c + y, bottom: d + b, left: c, x: c, y: d };
}
function De(e) {
  return ((Wr(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function fn(e) {
  return Me(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Jr(e) {
  return kt(De(e)).left + fn(e).scrollLeft;
}
function Ot(e) {
  if (Be(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || _s(e) && e.host || De(e);
  return _s(t) ? t.host : t;
}
function Xr(e) {
  const t = Ot(e);
  return Ti(t) ? t.ownerDocument.body : ke(t) && un(t) ? t : Xr(t);
}
function Zt(e, t) {
  var n;
  t === void 0 && (t = []);
  const i = Xr(e), r = i === ((n = e.ownerDocument) == null ? void 0 : n.body), s = ae(i);
  return r ? t.concat(s, s.visualViewport || [], un(i) ? i : []) : t.concat(i, Zt(i));
}
function Ps(e, t, n) {
  return t === "viewport" ? mt(function(i, r) {
    const s = ae(i), o = De(i), a = s.visualViewport;
    let f = o.clientWidth, u = o.clientHeight, l = 0, c = 0;
    if (a) {
      f = a.width, u = a.height;
      const d = Gr();
      (d || !d && r === "fixed") && (l = a.offsetLeft, c = a.offsetTop);
    }
    return { width: f, height: u, x: l, y: c };
  }(e, n)) : Me(t) ? mt(function(i, r) {
    const s = kt(i, !0, r === "fixed"), o = s.top + i.clientTop, a = s.left + i.clientLeft, f = ke(i) ? nt(i) : { x: 1, y: 1 };
    return { width: i.clientWidth * f.x, height: i.clientHeight * f.y, x: a * f.x, y: o * f.y };
  }(t, n)) : mt(function(i) {
    const r = De(i), s = fn(i), o = i.ownerDocument.body, a = gt(r.scrollWidth, r.clientWidth, o.scrollWidth, o.clientWidth), f = gt(r.scrollHeight, r.clientHeight, o.scrollHeight, o.clientHeight);
    let u = -s.scrollLeft + Jr(i);
    const l = -s.scrollTop;
    return xe(o).direction === "rtl" && (u += gt(r.clientWidth, o.clientWidth) - a), { width: a, height: f, x: u, y: l };
  }(De(e)));
}
function Fs(e) {
  return ke(e) && xe(e).position !== "fixed" ? e.offsetParent : null;
}
function As(e) {
  const t = ae(e);
  let n = Fs(e);
  for (; n && pu(n) && xe(n).position === "static"; ) n = Fs(n);
  return n && (Be(n) === "html" || Be(n) === "body" && xe(n).position === "static" && !ri(n)) ? t : n || function(i) {
    let r = Ot(i);
    for (; ke(r) && !Ti(r); ) {
      if (ri(r)) return r;
      r = Ot(r);
    }
    return null;
  }(e) || t;
}
function mu(e, t, n) {
  const i = ke(t), r = De(t), s = kt(e, !0, n === "fixed", t);
  let o = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (i || !i && n !== "fixed") if ((Be(t) !== "body" || un(r)) && (o = fn(t)), ke(t)) {
    const f = kt(t, !0);
    a.x = f.x + t.clientLeft, a.y = f.y + t.clientTop;
  } else r && (a.x = Jr(r));
  return { x: s.left + o.scrollLeft - a.x, y: s.top + o.scrollTop - a.y, width: s.width, height: s.height };
}
const gu = { getClippingRect: function(e) {
  let { element: t, boundary: n, rootBoundary: i, strategy: r } = e;
  const s = n === "clippingAncestors" ? function(u, l) {
    const c = l.get(u);
    if (c) return c;
    let d = Zt(u).filter((w) => Me(w) && Be(w) !== "body"), y = null;
    const b = xe(u).position === "fixed";
    let v = b ? Ot(u) : u;
    for (; Me(v) && !Ti(v); ) {
      const w = xe(v), m = ri(v);
      (b ? m || y : m || w.position !== "static" || !y || !["absolute", "fixed"].includes(y.position)) ? y = w : d = d.filter((g) => g !== v), v = Ot(v);
    }
    return l.set(u, d), d;
  }(t, this._c) : [].concat(n), o = [...s, i], a = o[0], f = o.reduce((u, l) => {
    const c = Ps(t, l, r);
    return u.top = gt(c.top, u.top), u.right = Cs(c.right, u.right), u.bottom = Cs(c.bottom, u.bottom), u.left = gt(c.left, u.left), u;
  }, Ps(t, a, r));
  return { width: f.right - f.left, height: f.bottom - f.top, x: f.left, y: f.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: n, strategy: i } = e;
  const r = ke(n), s = De(n);
  if (n === s) return t;
  let o = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const f = { x: 0, y: 0 };
  if ((r || !r && i !== "fixed") && ((Be(n) !== "body" || un(s)) && (o = fn(n)), ke(n))) {
    const u = kt(n);
    a = nt(n), f.x = u.x + n.clientLeft, f.y = u.y + n.clientTop;
  }
  return { width: t.width * a.x, height: t.height * a.y, x: t.x * a.x - o.scrollLeft * a.x + f.x, y: t.y * a.y - o.scrollTop * a.y + f.y };
}, isElement: Me, getDimensions: function(e) {
  return ke(e) ? Vr(e) : e.getBoundingClientRect();
}, getOffsetParent: As, getDocumentElement: De, getScale: nt, async getElementRects(e) {
  let { reference: t, floating: n, strategy: i } = e;
  const r = this.getOffsetParent || As, s = this.getDimensions;
  return { reference: mu(t, await r(n), i), floating: { x: 0, y: 0, ...await s(n) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => xe(e).direction === "rtl" }, yu = (e, t, n) => {
  const i = /* @__PURE__ */ new Map(), r = { platform: gu, ...n }, s = { ...r.platform, _c: i };
  return ru(e, t, { ...r, platform: s });
};
function Qr(e, t) {
  for (const n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (typeof t[n] == "object" && e[n] ? Qr(e[n], t[n]) : e[n] = t[n]);
}
const ye = {
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
function Ct(e, t) {
  let n = ye.themes[e] || {}, i;
  do
    i = n[t], typeof i > "u" ? n.$extend ? n = ye.themes[n.$extend] || {} : (n = null, i = ye[t]) : n = null;
  while (n);
  return i;
}
function bu(e) {
  const t = [e];
  let n = ye.themes[e] || {};
  do
    n.$extend && !n.$resetCss ? (t.push(n.$extend), n = ye.themes[n.$extend] || {}) : n = null;
  while (n);
  return t.map((i) => `v-popper--theme-${i}`);
}
function Rs(e) {
  const t = [e];
  let n = ye.themes[e] || {};
  do
    n.$extend ? (t.push(n.$extend), n = ye.themes[n.$extend] || {}) : n = null;
  while (n);
  return t;
}
let st = !1;
if (typeof window < "u") {
  st = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        st = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let Zr = !1;
typeof window < "u" && typeof navigator < "u" && (Zr = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const eo = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), Ts = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, Es = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function Ls(e, t) {
  const n = e.indexOf(t);
  n !== -1 && e.splice(n, 1);
}
function En() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const me = [];
let $e = null;
const Ns = {};
function Ms(e) {
  let t = Ns[e];
  return t || (t = Ns[e] = []), t;
}
let oi = function() {
};
typeof window < "u" && (oi = window.Element);
function E(e) {
  return function(t) {
    return Ct(t.theme, e);
  };
}
const Ln = "__floating-vue__popper", to = () => Je({
  name: "VPopper",
  provide() {
    return {
      [Ln]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [Ln]: { default: null }
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
      default: E("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: E("positioningDisabled")
    },
    placement: {
      type: String,
      default: E("placement"),
      validator: (e) => eo.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: E("delay")
    },
    distance: {
      type: [Number, String],
      default: E("distance")
    },
    skidding: {
      type: [Number, String],
      default: E("skidding")
    },
    triggers: {
      type: Array,
      default: E("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: E("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: E("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: E("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: E("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: E("popperHideTriggers")
    },
    container: {
      type: [String, Object, oi, Boolean],
      default: E("container")
    },
    boundary: {
      type: [String, oi],
      default: E("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: E("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: E("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: E("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: E("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: E("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: E("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: E("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: E("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: E("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: E("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: E("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: E("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: E("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: E("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: E("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: E("flip")
    },
    shift: {
      type: Boolean,
      default: E("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: E("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: E("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: E("disposeTimeout")
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
      randomId: `popper_${[Math.random(), Date.now()].map((e) => e.toString(36).substring(2, 10)).join("_")}`,
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
        classes: {
          ...this.classes,
          popperClass: this.popperClass
        },
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var e;
      return (e = this[Ln]) == null ? void 0 : e.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var e, t;
      return ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"));
    }
  },
  watch: {
    shown: "$_autoShowHide",
    disabled(e) {
      e ? this.dispose() : this.init();
    },
    async container() {
      this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
    },
    triggers: {
      handler: "$_refreshListeners",
      deep: !0
    },
    positioningDisabled: "$_refreshListeners",
    ...[
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
    ].reduce((e, t) => (e[t] = "$_computePosition", e), {})
  },
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
    show({ event: e = null, skipDelay: t = !1, force: n = !1 } = {}) {
      var i, r;
      (i = this.parentPopper) != null && i.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = !1, (n || !this.disabled) && (((r = this.parentPopper) == null ? void 0 : r.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
        this.$_showFrameLocked = !1;
      })), this.$emit("update:shown", !0));
    },
    hide({ event: e = null, skipDelay: t = !1 } = {}) {
      var n;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.pendingHide = !0;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((n = this.parentPopper) == null ? void 0 : n.lockedChild) === this && (this.parentPopper.lockedChild = null), this.pendingHide = !1, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", !1);
      }
    },
    init() {
      var e;
      this.isDisposed && (this.isDisposed = !1, this.isMounted = !1, this.$_events = [], this.$_preventShow = !1, this.$_referenceNode = ((e = this.referenceNode) == null ? void 0 : e.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t) => t.nodeType === t.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.isDisposed || (this.isDisposed = !0, this.$_removeEventListeners(), this.hide({ skipDelay: !0 }), this.$_detachPopperNode(), this.isMounted = !1, this.isShown = !1, this.$_updateParentShownChildren(!1), this.$_swapTargetAttrs("data-original-title", "title"));
    },
    async onResize() {
      this.isShown && (await this.$_computePosition(), this.$emit("resize"));
    },
    async $_computePosition() {
      if (this.isDisposed || this.positioningDisabled)
        return;
      const e = {
        strategy: this.strategy,
        middleware: []
      };
      (this.distance || this.skidding) && e.middleware.push(fu({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(lu({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(du({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(cu({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(ou({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: i, rects: r, middlewareData: s }) => {
          let o;
          const { centerOffset: a } = s.arrow;
          return i.startsWith("top") || i.startsWith("bottom") ? o = Math.abs(a) > r.reference.width / 2 : o = Math.abs(a) > r.reference.height / 2, {
            data: {
              overflow: o
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const i = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e.middleware.push({
          name: "autoSize",
          fn: ({ rects: r, placement: s, middlewareData: o }) => {
            var a;
            if ((a = o.autoSize) != null && a.skip)
              return {};
            let f, u;
            return s.startsWith("top") || s.startsWith("bottom") ? f = r.reference.width : u = r.reference.height, this.$_innerNode.style[i === "min" ? "minWidth" : i === "max" ? "maxWidth" : "width"] = f != null ? `${f}px` : null, this.$_innerNode.style[i === "min" ? "minHeight" : i === "max" ? "maxHeight" : "height"] = u != null ? `${u}px` : null, {
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
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(hu({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: i, availableHeight: r }) => {
          this.$_innerNode.style.maxWidth = i != null ? `${i}px` : null, this.$_innerNode.style.maxHeight = r != null ? `${r}px` : null;
        }
      })));
      const n = await yu(this.$_referenceNode, this.$_popperNode, e);
      Object.assign(this.result, {
        x: n.x,
        y: n.y,
        placement: n.placement,
        strategy: n.strategy,
        arrow: {
          ...n.middlewareData.arrow,
          ...n.middlewareData.arrowOverflow
        }
      });
    },
    $_scheduleShow(e, t = !1) {
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), $e && this.instantMove && $e.instantMove && $e !== this.parentPopper) {
        $e.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e, t = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && ($e = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await En(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...Zt(this.$_referenceNode),
        ...Zt(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), n = this.$_popperNode.querySelector(".v-popper__wrapper"), i = n.parentNode.getBoundingClientRect(), r = t.x + t.width / 2 - (i.left + n.offsetLeft), s = t.y + t.height / 2 - (i.top + n.offsetTop);
        this.result.transformOrigin = `${r}px ${s}px`;
      }
      this.isShown = !0, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e = this.showGroup;
      if (e) {
        let t;
        for (let n = 0; n < me.length; n++)
          t = me[n], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      me.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of Rs(this.theme))
        Ms(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await En(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, Ls(me, this), me.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const n of Rs(this.theme)) {
        const i = Ms(n);
        Ls(i, this), i.length === 0 && document.body.classList.remove(`v-popper--some-open--${n}`);
      }
      $e === this && ($e = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await En(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.isDisposed)
        return;
      let e = this.container;
      if (typeof e == "string" ? e = window.document.querySelector(e) : e === !1 && (e = this.$_targetNodes[0].parentNode), !e)
        throw new Error("No container for popover: " + this.container);
      e.appendChild(this.$_popperNode), this.isMounted = !0;
    },
    $_addEventListeners() {
      const e = (n) => {
        this.isShown && !this.$_hideInProgress || (n.usedByTooltip = !0, !this.$_preventShow && this.show({ event: n }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, Ts, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], Ts, this.popperTriggers, this.popperShowTriggers, e);
      const t = (n) => {
        n.usedByTooltip || this.hide({ event: n });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, Es, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], Es, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, n) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: n }), e.forEach((i) => i.addEventListener(t, n, st ? {
        passive: !0
      } : void 0));
    },
    $_registerTriggerListeners(e, t, n, i, r) {
      let s = n;
      i != null && (s = typeof i == "function" ? i(s) : i), s.forEach((o) => {
        const a = t[o];
        a && this.$_registerEventListeners(e, a, r);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((n) => {
        const { targetNodes: i, eventType: r, handler: s } = n;
        !e || e === r ? i.forEach((o) => o.removeEventListener(r, s)) : t.push(n);
      }), this.$_events = t;
    },
    $_refreshListeners() {
      this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(e, t = !1) {
      this.$_showFrameLocked || (this.hide({ event: e }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = !0, setTimeout(() => {
        this.$_preventShow = !1;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(e, t) {
      for (const n of this.$_targetNodes) {
        const i = n.getAttribute(e);
        i && (n.removeAttribute(e), n.setAttribute(t, i));
      }
    },
    $_applyAttrsToTarget(e) {
      for (const t of this.$_targetNodes)
        for (const n in e) {
          const i = e[n];
          i == null ? t.removeAttribute(n) : t.setAttribute(n, i);
        }
    },
    $_updateParentShownChildren(e) {
      let t = this.parentPopper;
      for (; t; )
        e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.pendingHide && t.hide()), t = t.parentPopper;
    },
    $_isAimingPopper() {
      const e = this.$_referenceNode.getBoundingClientRect();
      if (yt >= e.left && yt <= e.right && bt >= e.top && bt <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), n = yt - Ae, i = bt - Re, r = t.left + t.width / 2 - Ae + (t.top + t.height / 2) - Re + t.width + t.height, s = Ae + n * r, o = Re + i * r;
        return zt(Ae, Re, s, o, t.left, t.top, t.left, t.bottom) || // Left edge
        zt(Ae, Re, s, o, t.left, t.top, t.right, t.top) || // Top edge
        zt(Ae, Re, s, o, t.right, t.top, t.right, t.bottom) || // Right edge
        zt(Ae, Re, s, o, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (Zr) {
    const e = st ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => Ds(t, !0), e), document.addEventListener("touchend", (t) => js(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => Ds(e, !1), !0), window.addEventListener("click", (e) => js(e, !1), !0);
  window.addEventListener("resize", vu);
}
function Ds(e, t) {
  if (ye.autoHideOnMousedown)
    no(e, t);
  else
    for (let n = 0; n < me.length; n++) {
      const i = me[n];
      try {
        i.mouseDownContains = i.popperNode().contains(e.target);
      } catch {
      }
    }
}
function js(e, t) {
  ye.autoHideOnMousedown || no(e, t);
}
function no(e, t) {
  const n = {};
  for (let i = me.length - 1; i >= 0; i--) {
    const r = me[i];
    try {
      const s = r.containsGlobalTarget = r.mouseDownContains || r.popperNode().contains(e.target);
      r.pendingHide = !1, requestAnimationFrame(() => {
        if (r.pendingHide = !1, !n[r.randomId] && zs(r, s, e)) {
          if (r.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let a = r.parentPopper;
            for (; a; )
              n[a.randomId] = !0, a = a.parentPopper;
            return;
          }
          let o = r.parentPopper;
          for (; o && zs(o, o.containsGlobalTarget, e); )
            o.$_handleGlobalClose(e, t), o = o.parentPopper;
        }
      });
    } catch {
    }
  }
}
function zs(e, t, n) {
  return n.closeAllPopover || n.closePopover && t || wu(e, n) && !t;
}
function wu(e, t) {
  if (typeof e.autoHide == "function") {
    const n = e.autoHide(t);
    return e.lastAutoHide = n, n;
  }
  return e.autoHide;
}
function vu() {
  for (let e = 0; e < me.length; e++)
    me[e].$_computePosition();
}
let Ae = 0, Re = 0, yt = 0, bt = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  Ae = yt, Re = bt, yt = e.clientX, bt = e.clientY;
}, st ? {
  passive: !0
} : void 0);
function zt(e, t, n, i, r, s, o, a) {
  const f = ((o - r) * (t - s) - (a - s) * (e - r)) / ((a - s) * (n - e) - (o - r) * (i - t)), u = ((n - e) * (t - s) - (i - t) * (e - r)) / ((a - s) * (n - e) - (o - r) * (i - t));
  return f >= 0 && f <= 1 && u >= 0 && u <= 1;
}
const Su = {
  extends: to()
}, dn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
};
function xu(e, t, n, i, r, s) {
  return h(), S("div", {
    ref: "reference",
    class: T(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    M(e.$slots, "default", re(fe(e.slotData)))
  ], 2);
}
const ku = /* @__PURE__ */ dn(Su, [["render", xu]]);
function Ou() {
  var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var n = e.indexOf("Trident/");
  if (n > 0) {
    var i = e.indexOf("rv:");
    return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10);
  }
  var r = e.indexOf("Edge/");
  return r > 0 ? parseInt(e.substring(r + 5, e.indexOf(".", r)), 10) : -1;
}
let $t;
function ai() {
  ai.init || (ai.init = !0, $t = Ou() !== -1);
}
var hn = {
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
    ai(), qo(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", $t && this.$el.appendChild(e), e.data = "about:blank", $t || this.$el.appendChild(e);
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
      this._resizeObject && this._resizeObject.onload && (!$t && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const Cu = /* @__PURE__ */ Ho("data-v-b329ee4c");
$o("data-v-b329ee4c");
const _u = {
  class: "resize-observer",
  tabindex: "-1"
};
Uo();
const Pu = /* @__PURE__ */ Cu((e, t, n, i, r, s) => (h(), N("div", _u)));
hn.render = Pu;
hn.__scopeId = "data-v-b329ee4c";
hn.__file = "src/components/ResizeObserver.vue";
const io = (e = "theme") => ({
  computed: {
    themeClass() {
      return bu(this[e]);
    }
  }
}), Fu = Je({
  name: "VPopperContent",
  components: {
    ResizeObserver: hn
  },
  mixins: [
    io()
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
}), Au = ["id", "aria-hidden", "tabindex", "data-popper-placement"], Ru = {
  ref: "inner",
  class: "v-popper__inner"
}, Tu = /* @__PURE__ */ O("div", { class: "v-popper__arrow-outer" }, null, -1), Eu = /* @__PURE__ */ O("div", { class: "v-popper__arrow-inner" }, null, -1), Lu = [
  Tu,
  Eu
];
function Nu(e, t, n, i, r, s) {
  const o = Le("ResizeObserver");
  return h(), S("div", {
    id: e.popperId,
    ref: "popover",
    class: T(["v-popper__popper", [
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
    style: ft(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = Wo((a) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    O("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (a) => e.autoHide && e.$emit("hide"))
    }),
    O("div", {
      class: "v-popper__wrapper",
      style: ft(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      O("div", Ru, [
        e.mounted ? (h(), S(V, { key: 0 }, [
          O("div", null, [
            M(e.$slots, "default")
          ]),
          e.handleResize ? (h(), N(o, {
            key: 0,
            onNotify: t[1] || (t[1] = (a) => e.$emit("resize", a))
          })) : C("", !0)
        ], 64)) : C("", !0)
      ], 512),
      O("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: ft(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, Lu, 4)
    ], 4)
  ], 46, Au);
}
const so = /* @__PURE__ */ dn(Fu, [["render", Nu]]), ro = {
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
let li = function() {
};
typeof window < "u" && (li = window.Element);
const Mu = Je({
  name: "VPopperWrapper",
  components: {
    Popper: ku,
    PopperContent: so
  },
  mixins: [
    ro,
    io("finalTheme")
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
      type: [String, Object, li, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, li],
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
      return this.theme ?? this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
    }
  }
});
function Du(e, t, n, i, r, s) {
  const o = Le("PopperContent"), a = Le("Popper");
  return h(), N(a, He({ ref: "popper" }, e.$props, {
    theme: e.finalTheme,
    "target-nodes": e.getTargetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    class: [
      e.themeClass
    ],
    onShow: t[0] || (t[0] = () => e.$emit("show")),
    onHide: t[1] || (t[1] = () => e.$emit("hide")),
    "onUpdate:shown": t[2] || (t[2] = (f) => e.$emit("update:shown", f)),
    onApplyShow: t[3] || (t[3] = () => e.$emit("apply-show")),
    onApplyHide: t[4] || (t[4] = () => e.$emit("apply-hide")),
    onCloseGroup: t[5] || (t[5] = () => e.$emit("close-group")),
    onCloseDirective: t[6] || (t[6] = () => e.$emit("close-directive")),
    onAutoHide: t[7] || (t[7] = () => e.$emit("auto-hide")),
    onResize: t[8] || (t[8] = () => e.$emit("resize"))
  }), {
    default: de(({
      popperId: f,
      isShown: u,
      shouldMountContent: l,
      skipTransition: c,
      autoHide: d,
      show: y,
      hide: b,
      handleResize: v,
      onResize: w,
      classes: m,
      result: g
    }) => [
      M(e.$slots, "default", {
        shown: u,
        show: y,
        hide: b
      }),
      q(o, {
        ref: "popperContent",
        "popper-id": f,
        theme: e.finalTheme,
        shown: u,
        mounted: l,
        "skip-transition": c,
        "auto-hide": d,
        "handle-resize": v,
        classes: m,
        result: g,
        onHide: b,
        onResize: w
      }, {
        default: de(() => [
          M(e.$slots, "popper", {
            shown: u,
            hide: b
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const Ei = /* @__PURE__ */ dn(Mu, [["render", Du]]), ju = {
  ...Ei,
  name: "VDropdown",
  vPopperTheme: "dropdown"
}, zu = {
  ...Ei,
  name: "VMenu",
  vPopperTheme: "menu"
}, Iu = {
  ...Ei,
  name: "VTooltip",
  vPopperTheme: "tooltip"
}, Bu = Je({
  name: "VTooltipDirective",
  components: {
    Popper: to(),
    PopperContent: so
  },
  mixins: [
    ro
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => Ct(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => Ct(e.theme, "loadingContent")
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
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
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
}), $u = ["innerHTML"], Uu = ["textContent"];
function qu(e, t, n, i, r, s) {
  const o = Le("PopperContent"), a = Le("Popper");
  return h(), N(a, He({ ref: "popper" }, e.$attrs, {
    theme: e.theme,
    "target-nodes": e.targetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    onApplyShow: e.onShow,
    onApplyHide: e.onHide
  }), {
    default: de(({
      popperId: f,
      isShown: u,
      shouldMountContent: l,
      skipTransition: c,
      autoHide: d,
      hide: y,
      handleResize: b,
      onResize: v,
      classes: w,
      result: m
    }) => [
      q(o, {
        ref: "popperContent",
        class: T({
          "v-popper--tooltip-loading": e.loading
        }),
        "popper-id": f,
        theme: e.theme,
        shown: u,
        mounted: l,
        "skip-transition": c,
        "auto-hide": d,
        "handle-resize": b,
        classes: w,
        result: m,
        onHide: y,
        onResize: v
      }, {
        default: de(() => [
          e.html ? (h(), S("div", {
            key: 0,
            innerHTML: e.finalContent
          }, null, 8, $u)) : (h(), S("div", {
            key: 1,
            textContent: U(e.finalContent)
          }, null, 8, Uu))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "target-nodes", "popper-node", "onApplyShow", "onApplyHide"]);
}
const Vu = /* @__PURE__ */ dn(Bu, [["render", qu]]), oo = "v-popper--has-tooltip";
function Hu(e, t) {
  let n = e.placement;
  if (!n && t)
    for (const i of eo)
      t[i] && (n = i);
  return n || (n = Ct(e.theme || "tooltip", "placement")), n;
}
function ao(e, t, n) {
  let i;
  const r = typeof t;
  return r === "string" ? i = { content: t } : t && r === "object" ? i = t : i = { content: !1 }, i.placement = Hu(i, n), i.targetNodes = () => [e], i.referenceNode = () => e, i;
}
let Nn, _t, Wu = 0;
function Gu() {
  if (Nn)
    return;
  _t = In([]), Nn = Vo({
    name: "VTooltipDirectiveApp",
    setup() {
      return {
        directives: _t
      };
    },
    render() {
      return this.directives.map((t) => mi(Vu, {
        ...t.options,
        shown: t.shown || t.options.shown,
        key: t.id
      }));
    },
    devtools: {
      hide: !0
    }
  });
  const e = document.createElement("div");
  document.body.appendChild(e), Nn.mount(e);
}
function Ku(e, t, n) {
  Gu();
  const i = In(ao(e, t, n)), r = In(!1), s = {
    id: Wu++,
    options: i,
    shown: r
  };
  return _t.value.push(s), e.classList && e.classList.add(oo), e.$_popper = {
    options: i,
    item: s,
    show() {
      r.value = !0;
    },
    hide() {
      r.value = !1;
    }
  };
}
function lo(e) {
  if (e.$_popper) {
    const t = _t.value.indexOf(e.$_popper.item);
    t !== -1 && _t.value.splice(t, 1), delete e.$_popper, delete e.$_popperOldShown, delete e.$_popperMountTarget;
  }
  e.classList && e.classList.remove(oo);
}
function Is(e, { value: t, modifiers: n }) {
  const i = ao(e, t, n);
  if (!i.content || Ct(i.theme || "tooltip", "disabled"))
    lo(e);
  else {
    let r;
    e.$_popper ? (r = e.$_popper, r.options.value = i) : r = Ku(e, t, n), typeof t.shown < "u" && t.shown !== e.$_popperOldShown && (e.$_popperOldShown = t.shown, t.shown ? r.show() : r.hide());
  }
}
const Yu = {
  beforeMount: Is,
  updated: Is,
  beforeUnmount(e) {
    lo(e);
  }
};
function Bs(e) {
  e.addEventListener("mousedown", en), e.addEventListener("click", en), e.addEventListener("touchstart", co, st ? {
    passive: !0
  } : !1);
}
function $s(e) {
  e.removeEventListener("mousedown", en), e.removeEventListener("click", en), e.removeEventListener("touchstart", co), e.removeEventListener("touchend", uo), e.removeEventListener("touchcancel", fo);
}
function en(e) {
  const t = e.currentTarget;
  e.closePopover = !t.$_vclosepopover_touch, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
}
function co(e) {
  if (e.changedTouches.length === 1) {
    const t = e.currentTarget;
    t.$_vclosepopover_touch = !0;
    const n = e.changedTouches[0];
    t.$_vclosepopover_touchPoint = n, t.addEventListener("touchend", uo), t.addEventListener("touchcancel", fo);
  }
}
function uo(e) {
  const t = e.currentTarget;
  if (t.$_vclosepopover_touch = !1, e.changedTouches.length === 1) {
    const n = e.changedTouches[0], i = t.$_vclosepopover_touchPoint;
    e.closePopover = Math.abs(n.screenY - i.screenY) < 20 && Math.abs(n.screenX - i.screenX) < 20, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
  }
}
function fo(e) {
  const t = e.currentTarget;
  t.$_vclosepopover_touch = !1;
}
const Ju = {
  beforeMount(e, { value: t, modifiers: n }) {
    e.$_closePopoverModifiers = n, (typeof t > "u" || t) && Bs(e);
  },
  updated(e, { value: t, oldValue: n, modifiers: i }) {
    e.$_closePopoverModifiers = i, t !== n && (typeof t > "u" || t ? Bs(e) : $s(e));
  },
  beforeUnmount(e) {
    $s(e);
  }
};
function Xu(e, t = {}) {
  e.$_vTooltipInstalled || (e.$_vTooltipInstalled = !0, Qr(ye, t), e.directive("tooltip", Yu), e.directive("close-popper", Ju), e.component("VTooltip", Iu), e.component("VDropdown", ju), e.component("VMenu", zu));
}
const Qu = {
  // eslint-disable-next-line no-undef
  version: "5.2.2",
  install: Xu,
  options: ye
};
const Zu = {
  prefix: "fas",
  iconName: "circle-notch",
  icon: [512, 512, [], "f1ce", "M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"]
}, ef = {
  prefix: "fas",
  iconName: "eye-slash",
  icon: [640, 512, [], "f070", "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"]
}, tf = {
  prefix: "fas",
  iconName: "chevron-up",
  icon: [512, 512, [], "f077", "M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"]
}, nf = {
  prefix: "fas",
  iconName: "angle-right",
  icon: [320, 512, [8250], "f105", "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"]
}, sf = {
  prefix: "fas",
  iconName: "caret-up",
  icon: [320, 512, [], "f0d8", "M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"]
}, rf = {
  prefix: "fas",
  iconName: "angles-right",
  icon: [512, 512, [187, "angle-double-right"], "f101", "M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"]
}, of = rf, af = {
  prefix: "fas",
  iconName: "arrow-down-wide-short",
  icon: [576, 512, ["sort-amount-asc", "sort-amount-down"], "f160", "M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 301.7 32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-160 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L320 96z"]
}, lf = af, cf = {
  prefix: "fas",
  iconName: "square",
  icon: [448, 512, [9632, 9723, 9724, 61590], "f0c8", "M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"]
}, uf = {
  prefix: "fas",
  iconName: "sort",
  icon: [320, 512, ["unsorted"], "f0dc", "M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"]
}, ff = {
  prefix: "fas",
  iconName: "eye",
  icon: [576, 512, [128065], "f06e", "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"]
}, df = {
  prefix: "fas",
  iconName: "minus",
  icon: [448, 512, [8211, 8722, 10134, "subtract"], "f068", "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"]
}, hf = {
  prefix: "fas",
  iconName: "caret-down",
  icon: [320, 512, [], "f0d7", "M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"]
}, pf = {
  prefix: "fas",
  iconName: "arrow-down-short-wide",
  icon: [576, 512, ["sort-amount-desc", "sort-amount-down-alt"], "f884", "M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 301.7 32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-160 0c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"]
}, mf = pf, gf = {
  prefix: "fas",
  iconName: "chevron-down",
  icon: [512, 512, [], "f078", "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]
}, yf = {
  prefix: "fas",
  iconName: "plus",
  icon: [448, 512, [10133, 61543, "add"], "2b", "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"]
}, bf = {
  prefix: "fas",
  iconName: "xmark",
  icon: [384, 512, [128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times"], "f00d", "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"]
}, wf = bf, vf = {
  prefix: "fas",
  iconName: "angles-left",
  icon: [512, 512, [171, "angle-double-left"], "f100", "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"]
}, Sf = vf, xf = {
  prefix: "fas",
  iconName: "check",
  icon: [448, 512, [10003, 10004], "f00c", "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"]
}, kf = {
  prefix: "fas",
  iconName: "angle-left",
  icon: [320, 512, [8249], "f104", "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]
};
function Of(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ut = { exports: {} };
var Cf = Ut.exports, Us;
function _f() {
  return Us || (Us = 1, function(e) {
    (function(t) {
      var n = function s(o, a) {
        var f = i(o, a), u = o.length;
        if (s.analyzeSubTerms)
          for (var l = 1; l < u && l < s.analyzeSubTermDepth; l++) {
            var c = o.substring(l), d = i(c, a);
            d.score > f.score && (d.term = o, d.highlightedTerm = o.substring(0, l) + d.highlightedTerm, f = d);
          }
        return f;
      }, i = function(o, a) {
        for (var f = 0, u = o.length, l = a.length, c = "", d = 0, y = -2, b = 0; b < l && d < u; b++)
          for (var v = a.charAt(b), w = v.toLowerCase(); d < u; d++) {
            var m = o.charAt(d);
            if (w === m.toLowerCase()) {
              f++, y + 1 === d && (f += 2), c += n.highlighting.before + m + n.highlighting.after, y = d, d++;
              break;
            } else
              c += m;
          }
        return c += o.substring(d, o.length), {
          score: f,
          term: o,
          query: a,
          highlightedTerm: c
        };
      };
      if (n.matchComparator = function(o, a) {
        return a.score - o.score != 0 ? a.score - o.score : o.term.length - a.term.length;
      }, n.analyzeSubTerms = !1, n.analyzeSubTermDepth = 10, n.highlighting = {
        before: "<em>",
        after: "</em>"
      }, e.exports)
        e.exports = n;
      else {
        var r = t.fuzzy;
        n.noConflict = function() {
          return t.fuzzy = r, n;
        }, t.fuzzy = n;
      }
    })(Cf);
  }(Ut)), Ut.exports;
}
var Pf = _f();
const qs = /* @__PURE__ */ Of(Pf);
function ho(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Ff } = Object.prototype, { getPrototypeOf: Li } = Object, { iterator: pn, toStringTag: po } = Symbol, mn = /* @__PURE__ */ ((e) => (t) => {
  const n = Ff.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), be = (e) => (e = e.toLowerCase(), (t) => mn(t) === e), gn = (e) => (t) => typeof t === e, { isArray: ot } = Array, Pt = gn("undefined");
function Af(e) {
  return e !== null && !Pt(e) && e.constructor !== null && !Pt(e.constructor) && Z(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const mo = be("ArrayBuffer");
function Rf(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && mo(e.buffer), t;
}
const Tf = gn("string"), Z = gn("function"), go = gn("number"), yn = (e) => e !== null && typeof e == "object", Ef = (e) => e === !0 || e === !1, qt = (e) => {
  if (mn(e) !== "object")
    return !1;
  const t = Li(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(po in e) && !(pn in e);
}, Lf = be("Date"), Nf = be("File"), Mf = be("Blob"), Df = be("FileList"), jf = (e) => yn(e) && Z(e.pipe), zf = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Z(e.append) && ((t = mn(e)) === "formdata" || // detect form-data instance
  t === "object" && Z(e.toString) && e.toString() === "[object FormData]"));
}, If = be("URLSearchParams"), [Bf, $f, Uf, qf] = ["ReadableStream", "Request", "Response", "Headers"].map(be), Vf = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Rt(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let i, r;
  if (typeof e != "object" && (e = [e]), ot(e))
    for (i = 0, r = e.length; i < r; i++)
      t.call(null, e[i], i, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), o = s.length;
    let a;
    for (i = 0; i < o; i++)
      a = s[i], t.call(null, e[a], a, e);
  }
}
function yo(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let i = n.length, r;
  for (; i-- > 0; )
    if (r = n[i], t === r.toLowerCase())
      return r;
  return null;
}
const Ve = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, bo = (e) => !Pt(e) && e !== Ve;
function ci() {
  const { caseless: e } = bo(this) && this || {}, t = {}, n = (i, r) => {
    const s = e && yo(t, r) || r;
    qt(t[s]) && qt(i) ? t[s] = ci(t[s], i) : qt(i) ? t[s] = ci({}, i) : ot(i) ? t[s] = i.slice() : t[s] = i;
  };
  for (let i = 0, r = arguments.length; i < r; i++)
    arguments[i] && Rt(arguments[i], n);
  return t;
}
const Hf = (e, t, n, { allOwnKeys: i } = {}) => (Rt(t, (r, s) => {
  n && Z(r) ? e[s] = ho(r, n) : e[s] = r;
}, { allOwnKeys: i }), e), Wf = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Gf = (e, t, n, i) => {
  e.prototype = Object.create(t.prototype, i), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Kf = (e, t, n, i) => {
  let r, s, o;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), s = r.length; s-- > 0; )
      o = r[s], (!i || i(o, e, t)) && !a[o] && (t[o] = e[o], a[o] = !0);
    e = n !== !1 && Li(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Yf = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const i = e.indexOf(t, n);
  return i !== -1 && i === n;
}, Jf = (e) => {
  if (!e) return null;
  if (ot(e)) return e;
  let t = e.length;
  if (!go(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Xf = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Li(Uint8Array)), Qf = (e, t) => {
  const i = (e && e[pn]).call(e);
  let r;
  for (; (r = i.next()) && !r.done; ) {
    const s = r.value;
    t.call(e, s[0], s[1]);
  }
}, Zf = (e, t) => {
  let n;
  const i = [];
  for (; (n = e.exec(t)) !== null; )
    i.push(n);
  return i;
}, ed = be("HTMLFormElement"), td = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, i, r) {
    return i.toUpperCase() + r;
  }
), Vs = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), nd = be("RegExp"), wo = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), i = {};
  Rt(n, (r, s) => {
    let o;
    (o = t(r, s, e)) !== !1 && (i[s] = o || r);
  }), Object.defineProperties(e, i);
}, id = (e) => {
  wo(e, (t, n) => {
    if (Z(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const i = e[n];
    if (Z(i)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, sd = (e, t) => {
  const n = {}, i = (r) => {
    r.forEach((s) => {
      n[s] = !0;
    });
  };
  return ot(e) ? i(e) : i(String(e).split(t)), n;
}, rd = () => {
}, od = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function ad(e) {
  return !!(e && Z(e.append) && e[po] === "FormData" && e[pn]);
}
const ld = (e) => {
  const t = new Array(10), n = (i, r) => {
    if (yn(i)) {
      if (t.indexOf(i) >= 0)
        return;
      if (!("toJSON" in i)) {
        t[r] = i;
        const s = ot(i) ? [] : {};
        return Rt(i, (o, a) => {
          const f = n(o, r + 1);
          !Pt(f) && (s[a] = f);
        }), t[r] = void 0, s;
      }
    }
    return i;
  };
  return n(e, 0);
}, cd = be("AsyncFunction"), ud = (e) => e && (yn(e) || Z(e)) && Z(e.then) && Z(e.catch), vo = ((e, t) => e ? setImmediate : t ? ((n, i) => (Ve.addEventListener("message", ({ source: r, data: s }) => {
  r === Ve && s === n && i.length && i.shift()();
}, !1), (r) => {
  i.push(r), Ve.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  Z(Ve.postMessage)
), fd = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ve) : typeof process < "u" && process.nextTick || vo, dd = (e) => e != null && Z(e[pn]), p = {
  isArray: ot,
  isArrayBuffer: mo,
  isBuffer: Af,
  isFormData: zf,
  isArrayBufferView: Rf,
  isString: Tf,
  isNumber: go,
  isBoolean: Ef,
  isObject: yn,
  isPlainObject: qt,
  isReadableStream: Bf,
  isRequest: $f,
  isResponse: Uf,
  isHeaders: qf,
  isUndefined: Pt,
  isDate: Lf,
  isFile: Nf,
  isBlob: Mf,
  isRegExp: nd,
  isFunction: Z,
  isStream: jf,
  isURLSearchParams: If,
  isTypedArray: Xf,
  isFileList: Df,
  forEach: Rt,
  merge: ci,
  extend: Hf,
  trim: Vf,
  stripBOM: Wf,
  inherits: Gf,
  toFlatObject: Kf,
  kindOf: mn,
  kindOfTest: be,
  endsWith: Yf,
  toArray: Jf,
  forEachEntry: Qf,
  matchAll: Zf,
  isHTMLForm: ed,
  hasOwnProperty: Vs,
  hasOwnProp: Vs,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: wo,
  freezeMethods: id,
  toObjectSet: sd,
  toCamelCase: td,
  noop: rd,
  toFiniteNumber: od,
  findKey: yo,
  global: Ve,
  isContextDefined: bo,
  isSpecCompliantForm: ad,
  toJSONObject: ld,
  isAsyncFn: cd,
  isThenable: ud,
  setImmediate: vo,
  asap: fd,
  isIterable: dd
};
function R(e, t, n, i, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), i && (this.request = i), r && (this.response = r, this.status = r.status ? r.status : null);
}
p.inherits(R, Error, {
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
      config: p.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const So = R.prototype, xo = {};
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
  xo[e] = { value: e };
});
Object.defineProperties(R, xo);
Object.defineProperty(So, "isAxiosError", { value: !0 });
R.from = (e, t, n, i, r, s) => {
  const o = Object.create(So);
  return p.toFlatObject(e, o, function(f) {
    return f !== Error.prototype;
  }, (a) => a !== "isAxiosError"), R.call(o, e.message, t, n, i, r), o.cause = e, o.name = e.name, s && Object.assign(o, s), o;
};
const hd = null;
function ui(e) {
  return p.isPlainObject(e) || p.isArray(e);
}
function ko(e) {
  return p.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Hs(e, t, n) {
  return e ? e.concat(t).map(function(r, s) {
    return r = ko(r), !n && s ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function pd(e) {
  return p.isArray(e) && !e.some(ui);
}
const md = p.toFlatObject(p, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function bn(e, t, n) {
  if (!p.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = p.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(v, w) {
    return !p.isUndefined(w[v]);
  });
  const i = n.metaTokens, r = n.visitor || l, s = n.dots, o = n.indexes, f = (n.Blob || typeof Blob < "u" && Blob) && p.isSpecCompliantForm(t);
  if (!p.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(b) {
    if (b === null) return "";
    if (p.isDate(b))
      return b.toISOString();
    if (!f && p.isBlob(b))
      throw new R("Blob is not supported. Use a Buffer instead.");
    return p.isArrayBuffer(b) || p.isTypedArray(b) ? f && typeof Blob == "function" ? new Blob([b]) : Buffer.from(b) : b;
  }
  function l(b, v, w) {
    let m = b;
    if (b && !w && typeof b == "object") {
      if (p.endsWith(v, "{}"))
        v = i ? v : v.slice(0, -2), b = JSON.stringify(b);
      else if (p.isArray(b) && pd(b) || (p.isFileList(b) || p.endsWith(v, "[]")) && (m = p.toArray(b)))
        return v = ko(v), m.forEach(function(k, A) {
          !(p.isUndefined(k) || k === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Hs([v], A, s) : o === null ? v : v + "[]",
            u(k)
          );
        }), !1;
    }
    return ui(b) ? !0 : (t.append(Hs(w, v, s), u(b)), !1);
  }
  const c = [], d = Object.assign(md, {
    defaultVisitor: l,
    convertValue: u,
    isVisitable: ui
  });
  function y(b, v) {
    if (!p.isUndefined(b)) {
      if (c.indexOf(b) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      c.push(b), p.forEach(b, function(m, g) {
        (!(p.isUndefined(m) || m === null) && r.call(
          t,
          m,
          p.isString(g) ? g.trim() : g,
          v,
          d
        )) === !0 && y(m, v ? v.concat(g) : [g]);
      }), c.pop();
    }
  }
  if (!p.isObject(e))
    throw new TypeError("data must be an object");
  return y(e), t;
}
function Ws(e) {
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
function Ni(e, t) {
  this._pairs = [], e && bn(e, this, t);
}
const Oo = Ni.prototype;
Oo.append = function(t, n) {
  this._pairs.push([t, n]);
};
Oo.toString = function(t) {
  const n = t ? function(i) {
    return t.call(this, i, Ws);
  } : Ws;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function gd(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Co(e, t, n) {
  if (!t)
    return e;
  const i = n && n.encode || gd;
  p.isFunction(n) && (n = {
    serialize: n
  });
  const r = n && n.serialize;
  let s;
  if (r ? s = r(t, n) : s = p.isURLSearchParams(t) ? t.toString() : new Ni(t, n).toString(i), s) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class Gs {
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
    p.forEach(this.handlers, function(i) {
      i !== null && t(i);
    });
  }
}
const _o = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, yd = typeof URLSearchParams < "u" ? URLSearchParams : Ni, bd = typeof FormData < "u" ? FormData : null, wd = typeof Blob < "u" ? Blob : null, vd = {
  isBrowser: !0,
  classes: {
    URLSearchParams: yd,
    FormData: bd,
    Blob: wd
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Mi = typeof window < "u" && typeof document < "u", fi = typeof navigator == "object" && navigator || void 0, Sd = Mi && (!fi || ["ReactNative", "NativeScript", "NS"].indexOf(fi.product) < 0), xd = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", kd = Mi && window.location.href || "http://localhost", Od = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Mi,
  hasStandardBrowserEnv: Sd,
  hasStandardBrowserWebWorkerEnv: xd,
  navigator: fi,
  origin: kd
}, Symbol.toStringTag, { value: "Module" })), K = {
  ...Od,
  ...vd
};
function Cd(e, t) {
  return bn(e, new K.classes.URLSearchParams(), Object.assign({
    visitor: function(n, i, r, s) {
      return K.isNode && p.isBuffer(n) ? (this.append(i, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function _d(e) {
  return p.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Pd(e) {
  const t = {}, n = Object.keys(e);
  let i;
  const r = n.length;
  let s;
  for (i = 0; i < r; i++)
    s = n[i], t[s] = e[s];
  return t;
}
function Po(e) {
  function t(n, i, r, s) {
    let o = n[s++];
    if (o === "__proto__") return !0;
    const a = Number.isFinite(+o), f = s >= n.length;
    return o = !o && p.isArray(r) ? r.length : o, f ? (p.hasOwnProp(r, o) ? r[o] = [r[o], i] : r[o] = i, !a) : ((!r[o] || !p.isObject(r[o])) && (r[o] = []), t(n, i, r[o], s) && p.isArray(r[o]) && (r[o] = Pd(r[o])), !a);
  }
  if (p.isFormData(e) && p.isFunction(e.entries)) {
    const n = {};
    return p.forEachEntry(e, (i, r) => {
      t(_d(i), r, n, 0);
    }), n;
  }
  return null;
}
function Fd(e, t, n) {
  if (p.isString(e))
    try {
      return (t || JSON.parse)(e), p.trim(e);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (n || JSON.stringify)(e);
}
const Tt = {
  transitional: _o,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const i = n.getContentType() || "", r = i.indexOf("application/json") > -1, s = p.isObject(t);
    if (s && p.isHTMLForm(t) && (t = new FormData(t)), p.isFormData(t))
      return r ? JSON.stringify(Po(t)) : t;
    if (p.isArrayBuffer(t) || p.isBuffer(t) || p.isStream(t) || p.isFile(t) || p.isBlob(t) || p.isReadableStream(t))
      return t;
    if (p.isArrayBufferView(t))
      return t.buffer;
    if (p.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (s) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return Cd(t, this.formSerializer).toString();
      if ((a = p.isFileList(t)) || i.indexOf("multipart/form-data") > -1) {
        const f = this.env && this.env.FormData;
        return bn(
          a ? { "files[]": t } : t,
          f && new f(),
          this.formSerializer
        );
      }
    }
    return s || r ? (n.setContentType("application/json", !1), Fd(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Tt.transitional, i = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (p.isResponse(t) || p.isReadableStream(t))
      return t;
    if (t && p.isString(t) && (i && !this.responseType || r)) {
      const o = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (o)
          throw a.name === "SyntaxError" ? R.from(a, R.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
    FormData: K.classes.FormData,
    Blob: K.classes.Blob
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
p.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Tt.headers[e] = {};
});
const Ad = p.toObjectSet([
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
]), Rd = (e) => {
  const t = {};
  let n, i, r;
  return e && e.split(`
`).forEach(function(o) {
    r = o.indexOf(":"), n = o.substring(0, r).trim().toLowerCase(), i = o.substring(r + 1).trim(), !(!n || t[n] && Ad[n]) && (n === "set-cookie" ? t[n] ? t[n].push(i) : t[n] = [i] : t[n] = t[n] ? t[n] + ", " + i : i);
  }), t;
}, Ks = Symbol("internals");
function ct(e) {
  return e && String(e).trim().toLowerCase();
}
function Vt(e) {
  return e === !1 || e == null ? e : p.isArray(e) ? e.map(Vt) : String(e);
}
function Td(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = n.exec(e); )
    t[i[1]] = i[2];
  return t;
}
const Ed = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Mn(e, t, n, i, r) {
  if (p.isFunction(i))
    return i.call(this, t, n);
  if (r && (t = n), !!p.isString(t)) {
    if (p.isString(i))
      return t.indexOf(i) !== -1;
    if (p.isRegExp(i))
      return i.test(t);
  }
}
function Ld(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, i) => n.toUpperCase() + i);
}
function Nd(e, t) {
  const n = p.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(e, i + n, {
      value: function(r, s, o) {
        return this[i].call(this, t, r, s, o);
      },
      configurable: !0
    });
  });
}
let ee = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, i) {
    const r = this;
    function s(a, f, u) {
      const l = ct(f);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const c = p.findKey(r, l);
      (!c || r[c] === void 0 || u === !0 || u === void 0 && r[c] !== !1) && (r[c || f] = Vt(a));
    }
    const o = (a, f) => p.forEach(a, (u, l) => s(u, l, f));
    if (p.isPlainObject(t) || t instanceof this.constructor)
      o(t, n);
    else if (p.isString(t) && (t = t.trim()) && !Ed(t))
      o(Rd(t), n);
    else if (p.isObject(t) && p.isIterable(t)) {
      let a = {}, f, u;
      for (const l of t) {
        if (!p.isArray(l))
          throw TypeError("Object iterator must return a key-value pair");
        a[u = l[0]] = (f = a[u]) ? p.isArray(f) ? [...f, l[1]] : [f, l[1]] : l[1];
      }
      o(a, n);
    } else
      t != null && s(n, t, i);
    return this;
  }
  get(t, n) {
    if (t = ct(t), t) {
      const i = p.findKey(this, t);
      if (i) {
        const r = this[i];
        if (!n)
          return r;
        if (n === !0)
          return Td(r);
        if (p.isFunction(n))
          return n.call(this, r, i);
        if (p.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = ct(t), t) {
      const i = p.findKey(this, t);
      return !!(i && this[i] !== void 0 && (!n || Mn(this, this[i], i, n)));
    }
    return !1;
  }
  delete(t, n) {
    const i = this;
    let r = !1;
    function s(o) {
      if (o = ct(o), o) {
        const a = p.findKey(i, o);
        a && (!n || Mn(i, i[a], a, n)) && (delete i[a], r = !0);
      }
    }
    return p.isArray(t) ? t.forEach(s) : s(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let i = n.length, r = !1;
    for (; i--; ) {
      const s = n[i];
      (!t || Mn(this, this[s], s, t, !0)) && (delete this[s], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, i = {};
    return p.forEach(this, (r, s) => {
      const o = p.findKey(i, s);
      if (o) {
        n[o] = Vt(r), delete n[s];
        return;
      }
      const a = t ? Ld(s) : String(s).trim();
      a !== s && delete n[s], n[a] = Vt(r), i[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return p.forEach(this, (i, r) => {
      i != null && i !== !1 && (n[r] = t && p.isArray(i) ? i.join(", ") : i);
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
    return n.forEach((r) => i.set(r)), i;
  }
  static accessor(t) {
    const i = (this[Ks] = this[Ks] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function s(o) {
      const a = ct(o);
      i[a] || (Nd(r, o), i[a] = !0);
    }
    return p.isArray(t) ? t.forEach(s) : s(t), this;
  }
};
ee.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
p.reduceDescriptors(ee.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(i) {
      this[n] = i;
    }
  };
});
p.freezeMethods(ee);
function Dn(e, t) {
  const n = this || Tt, i = t || n, r = ee.from(i.headers);
  let s = i.data;
  return p.forEach(e, function(a) {
    s = a.call(n, s, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), s;
}
function Fo(e) {
  return !!(e && e.__CANCEL__);
}
function at(e, t, n) {
  R.call(this, e ?? "canceled", R.ERR_CANCELED, t, n), this.name = "CanceledError";
}
p.inherits(at, R, {
  __CANCEL__: !0
});
function Ao(e, t, n) {
  const i = n.config.validateStatus;
  !n.status || !i || i(n.status) ? e(n) : t(new R(
    "Request failed with status code " + n.status,
    [R.ERR_BAD_REQUEST, R.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Md(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Dd(e, t) {
  e = e || 10;
  const n = new Array(e), i = new Array(e);
  let r = 0, s = 0, o;
  return t = t !== void 0 ? t : 1e3, function(f) {
    const u = Date.now(), l = i[s];
    o || (o = u), n[r] = f, i[r] = u;
    let c = s, d = 0;
    for (; c !== r; )
      d += n[c++], c = c % e;
    if (r = (r + 1) % e, r === s && (s = (s + 1) % e), u - o < t)
      return;
    const y = l && u - l;
    return y ? Math.round(d * 1e3 / y) : void 0;
  };
}
function jd(e, t) {
  let n = 0, i = 1e3 / t, r, s;
  const o = (u, l = Date.now()) => {
    n = l, r = null, s && (clearTimeout(s), s = null), e.apply(null, u);
  };
  return [(...u) => {
    const l = Date.now(), c = l - n;
    c >= i ? o(u, l) : (r = u, s || (s = setTimeout(() => {
      s = null, o(r);
    }, i - c)));
  }, () => r && o(r)];
}
const tn = (e, t, n = 3) => {
  let i = 0;
  const r = Dd(50, 250);
  return jd((s) => {
    const o = s.loaded, a = s.lengthComputable ? s.total : void 0, f = o - i, u = r(f), l = o <= a;
    i = o;
    const c = {
      loaded: o,
      total: a,
      progress: a ? o / a : void 0,
      bytes: f,
      rate: u || void 0,
      estimated: u && a && l ? (a - o) / u : void 0,
      event: s,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(c);
  }, n);
}, Ys = (e, t) => {
  const n = e != null;
  return [(i) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: i
  }), t[1]];
}, Js = (e) => (...t) => p.asap(() => e(...t)), zd = K.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, K.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(K.origin),
  K.navigator && /(msie|trident)/i.test(K.navigator.userAgent)
) : () => !0, Id = K.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, i, r, s) {
      const o = [e + "=" + encodeURIComponent(t)];
      p.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), p.isString(i) && o.push("path=" + i), p.isString(r) && o.push("domain=" + r), s === !0 && o.push("secure"), document.cookie = o.join("; ");
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
function Bd(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function $d(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Ro(e, t, n) {
  let i = !Bd(t);
  return e && (i || n == !1) ? $d(e, t) : t;
}
const Xs = (e) => e instanceof ee ? { ...e } : e;
function Ye(e, t) {
  t = t || {};
  const n = {};
  function i(u, l, c, d) {
    return p.isPlainObject(u) && p.isPlainObject(l) ? p.merge.call({ caseless: d }, u, l) : p.isPlainObject(l) ? p.merge({}, l) : p.isArray(l) ? l.slice() : l;
  }
  function r(u, l, c, d) {
    if (p.isUndefined(l)) {
      if (!p.isUndefined(u))
        return i(void 0, u, c, d);
    } else return i(u, l, c, d);
  }
  function s(u, l) {
    if (!p.isUndefined(l))
      return i(void 0, l);
  }
  function o(u, l) {
    if (p.isUndefined(l)) {
      if (!p.isUndefined(u))
        return i(void 0, u);
    } else return i(void 0, l);
  }
  function a(u, l, c) {
    if (c in t)
      return i(u, l);
    if (c in e)
      return i(void 0, u);
  }
  const f = {
    url: s,
    method: s,
    data: s,
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
    headers: (u, l, c) => r(Xs(u), Xs(l), c, !0)
  };
  return p.forEach(Object.keys(Object.assign({}, e, t)), function(l) {
    const c = f[l] || r, d = c(e[l], t[l], l);
    p.isUndefined(d) && c !== a || (n[l] = d);
  }), n;
}
const To = (e) => {
  const t = Ye({}, e);
  let { data: n, withXSRFToken: i, xsrfHeaderName: r, xsrfCookieName: s, headers: o, auth: a } = t;
  t.headers = o = ee.from(o), t.url = Co(Ro(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && o.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let f;
  if (p.isFormData(n)) {
    if (K.hasStandardBrowserEnv || K.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if ((f = o.getContentType()) !== !1) {
      const [u, ...l] = f ? f.split(";").map((c) => c.trim()).filter(Boolean) : [];
      o.setContentType([u || "multipart/form-data", ...l].join("; "));
    }
  }
  if (K.hasStandardBrowserEnv && (i && p.isFunction(i) && (i = i(t)), i || i !== !1 && zd(t.url))) {
    const u = r && s && Id.read(s);
    u && o.set(r, u);
  }
  return t;
}, Ud = typeof XMLHttpRequest < "u", qd = Ud && function(e) {
  return new Promise(function(n, i) {
    const r = To(e);
    let s = r.data;
    const o = ee.from(r.headers).normalize();
    let { responseType: a, onUploadProgress: f, onDownloadProgress: u } = r, l, c, d, y, b;
    function v() {
      y && y(), b && b(), r.cancelToken && r.cancelToken.unsubscribe(l), r.signal && r.signal.removeEventListener("abort", l);
    }
    let w = new XMLHttpRequest();
    w.open(r.method.toUpperCase(), r.url, !0), w.timeout = r.timeout;
    function m() {
      if (!w)
        return;
      const k = ee.from(
        "getAllResponseHeaders" in w && w.getAllResponseHeaders()
      ), P = {
        data: !a || a === "text" || a === "json" ? w.responseText : w.response,
        status: w.status,
        statusText: w.statusText,
        headers: k,
        config: e,
        request: w
      };
      Ao(function(L) {
        n(L), v();
      }, function(L) {
        i(L), v();
      }, P), w = null;
    }
    "onloadend" in w ? w.onloadend = m : w.onreadystatechange = function() {
      !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(m);
    }, w.onabort = function() {
      w && (i(new R("Request aborted", R.ECONNABORTED, e, w)), w = null);
    }, w.onerror = function() {
      i(new R("Network Error", R.ERR_NETWORK, e, w)), w = null;
    }, w.ontimeout = function() {
      let A = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const P = r.transitional || _o;
      r.timeoutErrorMessage && (A = r.timeoutErrorMessage), i(new R(
        A,
        P.clarifyTimeoutError ? R.ETIMEDOUT : R.ECONNABORTED,
        e,
        w
      )), w = null;
    }, s === void 0 && o.setContentType(null), "setRequestHeader" in w && p.forEach(o.toJSON(), function(A, P) {
      w.setRequestHeader(P, A);
    }), p.isUndefined(r.withCredentials) || (w.withCredentials = !!r.withCredentials), a && a !== "json" && (w.responseType = r.responseType), u && ([d, b] = tn(u, !0), w.addEventListener("progress", d)), f && w.upload && ([c, y] = tn(f), w.upload.addEventListener("progress", c), w.upload.addEventListener("loadend", y)), (r.cancelToken || r.signal) && (l = (k) => {
      w && (i(!k || k.type ? new at(null, e, w) : k), w.abort(), w = null);
    }, r.cancelToken && r.cancelToken.subscribe(l), r.signal && (r.signal.aborted ? l() : r.signal.addEventListener("abort", l)));
    const g = Md(r.url);
    if (g && K.protocols.indexOf(g) === -1) {
      i(new R("Unsupported protocol " + g + ":", R.ERR_BAD_REQUEST, e));
      return;
    }
    w.send(s || null);
  });
}, Vd = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let i = new AbortController(), r;
    const s = function(u) {
      if (!r) {
        r = !0, a();
        const l = u instanceof Error ? u : this.reason;
        i.abort(l instanceof R ? l : new at(l instanceof Error ? l.message : l));
      }
    };
    let o = t && setTimeout(() => {
      o = null, s(new R(`timeout ${t} of ms exceeded`, R.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (o && clearTimeout(o), o = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", s));
    const { signal: f } = i;
    return f.unsubscribe = () => p.asap(a), f;
  }
}, Hd = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let i = 0, r;
  for (; i < n; )
    r = i + t, yield e.slice(i, r), i = r;
}, Wd = async function* (e, t) {
  for await (const n of Gd(e))
    yield* Hd(n, t);
}, Gd = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: i } = await t.read();
      if (n)
        break;
      yield i;
    }
  } finally {
    await t.cancel();
  }
}, Qs = (e, t, n, i) => {
  const r = Wd(e, t);
  let s = 0, o, a = (f) => {
    o || (o = !0, i && i(f));
  };
  return new ReadableStream({
    async pull(f) {
      try {
        const { done: u, value: l } = await r.next();
        if (u) {
          a(), f.close();
          return;
        }
        let c = l.byteLength;
        if (n) {
          let d = s += c;
          n(d);
        }
        f.enqueue(new Uint8Array(l));
      } catch (u) {
        throw a(u), u;
      }
    },
    cancel(f) {
      return a(f), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, wn = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Eo = wn && typeof ReadableStream == "function", Kd = wn && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Lo = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Yd = Eo && Lo(() => {
  let e = !1;
  const t = new Request(K.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Zs = 64 * 1024, di = Eo && Lo(() => p.isReadableStream(new Response("").body)), nn = {
  stream: di && ((e) => e.body)
};
wn && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !nn[t] && (nn[t] = p.isFunction(e[t]) ? (n) => n[t]() : (n, i) => {
      throw new R(`Response type '${t}' is not supported`, R.ERR_NOT_SUPPORT, i);
    });
  });
})(new Response());
const Jd = async (e) => {
  if (e == null)
    return 0;
  if (p.isBlob(e))
    return e.size;
  if (p.isSpecCompliantForm(e))
    return (await new Request(K.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (p.isArrayBufferView(e) || p.isArrayBuffer(e))
    return e.byteLength;
  if (p.isURLSearchParams(e) && (e = e + ""), p.isString(e))
    return (await Kd(e)).byteLength;
}, Xd = async (e, t) => {
  const n = p.toFiniteNumber(e.getContentLength());
  return n ?? Jd(t);
}, Qd = wn && (async (e) => {
  let {
    url: t,
    method: n,
    data: i,
    signal: r,
    cancelToken: s,
    timeout: o,
    onDownloadProgress: a,
    onUploadProgress: f,
    responseType: u,
    headers: l,
    withCredentials: c = "same-origin",
    fetchOptions: d
  } = To(e);
  u = u ? (u + "").toLowerCase() : "text";
  let y = Vd([r, s && s.toAbortSignal()], o), b;
  const v = y && y.unsubscribe && (() => {
    y.unsubscribe();
  });
  let w;
  try {
    if (f && Yd && n !== "get" && n !== "head" && (w = await Xd(l, i)) !== 0) {
      let P = new Request(t, {
        method: "POST",
        body: i,
        duplex: "half"
      }), D;
      if (p.isFormData(i) && (D = P.headers.get("content-type")) && l.setContentType(D), P.body) {
        const [L, B] = Ys(
          w,
          tn(Js(f))
        );
        i = Qs(P.body, Zs, L, B);
      }
    }
    p.isString(c) || (c = c ? "include" : "omit");
    const m = "credentials" in Request.prototype;
    b = new Request(t, {
      ...d,
      signal: y,
      method: n.toUpperCase(),
      headers: l.normalize().toJSON(),
      body: i,
      duplex: "half",
      credentials: m ? c : void 0
    });
    let g = await fetch(b);
    const k = di && (u === "stream" || u === "response");
    if (di && (a || k && v)) {
      const P = {};
      ["status", "statusText", "headers"].forEach(($) => {
        P[$] = g[$];
      });
      const D = p.toFiniteNumber(g.headers.get("content-length")), [L, B] = a && Ys(
        D,
        tn(Js(a), !0)
      ) || [];
      g = new Response(
        Qs(g.body, Zs, L, () => {
          B && B(), v && v();
        }),
        P
      );
    }
    u = u || "text";
    let A = await nn[p.findKey(nn, u) || "text"](g, e);
    return !k && v && v(), await new Promise((P, D) => {
      Ao(P, D, {
        data: A,
        headers: ee.from(g.headers),
        status: g.status,
        statusText: g.statusText,
        config: e,
        request: b
      });
    });
  } catch (m) {
    throw v && v(), m && m.name === "TypeError" && /Load failed|fetch/i.test(m.message) ? Object.assign(
      new R("Network Error", R.ERR_NETWORK, e, b),
      {
        cause: m.cause || m
      }
    ) : R.from(m, m && m.code, e, b);
  }
}), hi = {
  http: hd,
  xhr: qd,
  fetch: Qd
};
p.forEach(hi, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const er = (e) => `- ${e}`, Zd = (e) => p.isFunction(e) || e === null || e === !1, No = {
  getAdapter: (e) => {
    e = p.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, i;
    const r = {};
    for (let s = 0; s < t; s++) {
      n = e[s];
      let o;
      if (i = n, !Zd(n) && (i = hi[(o = String(n)).toLowerCase()], i === void 0))
        throw new R(`Unknown adapter '${o}'`);
      if (i)
        break;
      r[o || "#" + s] = i;
    }
    if (!i) {
      const s = Object.entries(r).map(
        ([a, f]) => `adapter ${a} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = t ? s.length > 1 ? `since :
` + s.map(er).join(`
`) : " " + er(s[0]) : "as no adapter specified";
      throw new R(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return i;
  },
  adapters: hi
};
function jn(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new at(null, e);
}
function tr(e) {
  return jn(e), e.headers = ee.from(e.headers), e.data = Dn.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), No.getAdapter(e.adapter || Tt.adapter)(e).then(function(i) {
    return jn(e), i.data = Dn.call(
      e,
      e.transformResponse,
      i
    ), i.headers = ee.from(i.headers), i;
  }, function(i) {
    return Fo(i) || (jn(e), i && i.response && (i.response.data = Dn.call(
      e,
      e.transformResponse,
      i.response
    ), i.response.headers = ee.from(i.response.headers))), Promise.reject(i);
  });
}
const Mo = "1.9.0", vn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  vn[e] = function(i) {
    return typeof i === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const nr = {};
vn.transitional = function(t, n, i) {
  function r(s, o) {
    return "[Axios v" + Mo + "] Transitional option '" + s + "'" + o + (i ? ". " + i : "");
  }
  return (s, o, a) => {
    if (t === !1)
      throw new R(
        r(o, " has been removed" + (n ? " in " + n : "")),
        R.ERR_DEPRECATED
      );
    return n && !nr[o] && (nr[o] = !0, console.warn(
      r(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, o, a) : !0;
  };
};
vn.spelling = function(t) {
  return (n, i) => (console.warn(`${i} is likely a misspelling of ${t}`), !0);
};
function eh(e, t, n) {
  if (typeof e != "object")
    throw new R("options must be an object", R.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(e);
  let r = i.length;
  for (; r-- > 0; ) {
    const s = i[r], o = t[s];
    if (o) {
      const a = e[s], f = a === void 0 || o(a, s, e);
      if (f !== !0)
        throw new R("option " + s + " must be " + f, R.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new R("Unknown option " + s, R.ERR_BAD_OPTION);
  }
}
const Ht = {
  assertOptions: eh,
  validators: vn
}, we = Ht.validators;
let We = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Gs(),
      response: new Gs()
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
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (i) {
      if (i instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const s = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          i.stack ? s && !String(i.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + s) : i.stack = s;
        } catch {
        }
      }
      throw i;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Ye(this.defaults, n);
    const { transitional: i, paramsSerializer: r, headers: s } = n;
    i !== void 0 && Ht.assertOptions(i, {
      silentJSONParsing: we.transitional(we.boolean),
      forcedJSONParsing: we.transitional(we.boolean),
      clarifyTimeoutError: we.transitional(we.boolean)
    }, !1), r != null && (p.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : Ht.assertOptions(r, {
      encode: we.function,
      serialize: we.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Ht.assertOptions(n, {
      baseUrl: we.spelling("baseURL"),
      withXsrfToken: we.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = s && p.merge(
      s.common,
      s[n.method]
    );
    s && p.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (b) => {
        delete s[b];
      }
    ), n.headers = ee.concat(o, s);
    const a = [];
    let f = !0;
    this.interceptors.request.forEach(function(v) {
      typeof v.runWhen == "function" && v.runWhen(n) === !1 || (f = f && v.synchronous, a.unshift(v.fulfilled, v.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(v) {
      u.push(v.fulfilled, v.rejected);
    });
    let l, c = 0, d;
    if (!f) {
      const b = [tr.bind(this), void 0];
      for (b.unshift.apply(b, a), b.push.apply(b, u), d = b.length, l = Promise.resolve(n); c < d; )
        l = l.then(b[c++], b[c++]);
      return l;
    }
    d = a.length;
    let y = n;
    for (c = 0; c < d; ) {
      const b = a[c++], v = a[c++];
      try {
        y = b(y);
      } catch (w) {
        v.call(this, w);
        break;
      }
    }
    try {
      l = tr.call(this, y);
    } catch (b) {
      return Promise.reject(b);
    }
    for (c = 0, d = u.length; c < d; )
      l = l.then(u[c++], u[c++]);
    return l;
  }
  getUri(t) {
    t = Ye(this.defaults, t);
    const n = Ro(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Co(n, t.params, t.paramsSerializer);
  }
};
p.forEach(["delete", "get", "head", "options"], function(t) {
  We.prototype[t] = function(n, i) {
    return this.request(Ye(i || {}, {
      method: t,
      url: n,
      data: (i || {}).data
    }));
  };
});
p.forEach(["post", "put", "patch"], function(t) {
  function n(i) {
    return function(s, o, a) {
      return this.request(Ye(a || {}, {
        method: t,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: o
      }));
    };
  }
  We.prototype[t] = n(), We.prototype[t + "Form"] = n(!0);
});
let th = class Do {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const i = this;
    this.promise.then((r) => {
      if (!i._listeners) return;
      let s = i._listeners.length;
      for (; s-- > 0; )
        i._listeners[s](r);
      i._listeners = null;
    }), this.promise.then = (r) => {
      let s;
      const o = new Promise((a) => {
        i.subscribe(a), s = a;
      }).then(r);
      return o.cancel = function() {
        i.unsubscribe(s);
      }, o;
    }, t(function(s, o, a) {
      i.reason || (i.reason = new at(s, o, a), n(i.reason));
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
      token: new Do(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function nh(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function ih(e) {
  return p.isObject(e) && e.isAxiosError === !0;
}
const pi = {
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
Object.entries(pi).forEach(([e, t]) => {
  pi[t] = e;
});
function jo(e) {
  const t = new We(e), n = ho(We.prototype.request, t);
  return p.extend(n, We.prototype, t, { allOwnKeys: !0 }), p.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return jo(Ye(e, r));
  }, n;
}
const I = jo(Tt);
I.Axios = We;
I.CanceledError = at;
I.CancelToken = th;
I.isCancel = Fo;
I.VERSION = Mo;
I.toFormData = bn;
I.AxiosError = R;
I.Cancel = I.CanceledError;
I.all = function(t) {
  return Promise.all(t);
};
I.spread = nh;
I.isAxiosError = ih;
I.mergeConfig = Ye;
I.AxiosHeaders = ee;
I.formToJSON = (e) => Po(p.isHTMLForm(e) ? new FormData(e) : e);
I.getAdapter = No.getAdapter;
I.HttpStatusCode = pi;
I.default = I;
const {
  Axios: sm,
  AxiosError: rm,
  CanceledError: om,
  isCancel: am,
  CancelToken: lm,
  VERSION: cm,
  all: um,
  Cancel: fm,
  isAxiosError: dm,
  spread: hm,
  toFormData: pm,
  AxiosHeaders: mm,
  HttpStatusCode: gm,
  formToJSON: ym,
  getAdapter: bm,
  mergeConfig: wm
} = I, W = [];
for (let e = 0; e < 256; ++e)
  W.push((e + 256).toString(16).slice(1));
function sh(e, t = 0) {
  return (W[e[t + 0]] + W[e[t + 1]] + W[e[t + 2]] + W[e[t + 3]] + "-" + W[e[t + 4]] + W[e[t + 5]] + "-" + W[e[t + 6]] + W[e[t + 7]] + "-" + W[e[t + 8]] + W[e[t + 9]] + "-" + W[e[t + 10]] + W[e[t + 11]] + W[e[t + 12]] + W[e[t + 13]] + W[e[t + 14]] + W[e[t + 15]]).toLowerCase();
}
let zn;
const rh = new Uint8Array(16);
function oh() {
  if (!zn) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    zn = crypto.getRandomValues.bind(crypto);
  }
  return zn(rh);
}
const ah = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ir = { randomUUID: ah };
function lh(e, t, n) {
  if (ir.randomUUID && !e)
    return ir.randomUUID();
  e = e || {};
  const i = e.random ?? e.rng?.() ?? oh();
  if (i.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, sh(i);
}
const ch = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, uh = {
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
      uuid: lh(),
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
      return this.axios ? this.axios : this.$globalVueQuintableaxios ? this.$globalVueQuintableaxios : I;
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
      let n = !1;
      this.config.select && (n = !0);
      let i = 250;
      this.config.ajaxRequestDelay && (i = this.config.ajaxRequestDelay);
      let r = "bg-muted";
      this.config.hoverClass === !1 ? r = "" : this.config.hoverClass && this.config.hoverClass !== !0 && (r = this.config.hoverClass);
      let s = "bg-muted";
      this.config.activeClass === !1 ? s = "" : this.config.activeClass && this.config.activeClass !== !0 && (s = this.config.activeClass);
      let o = !1;
      this.config.multiSort && (o = !0);
      let a = !1;
      this.config.pageSort && (a = !0);
      let f = !1;
      this.config.multiSortSelect && (f = !0);
      let u = !1;
      this.config.pageSortSelect && (u = !0);
      let l = !1;
      this.config.ajaxUrl && (l = this.config.ajaxUrl);
      let c = "post";
      ["pre", "post"].includes(this.config.selectPosition) && (c = this.config.selectPosition);
      let d = !1;
      this.config.expandedAll && (d = !0);
      let y = !1;
      this.config.useFuzzySearch && (y = !0);
      let b = !1;
      this.config.prettySelect && (b = !0);
      let v = !1;
      this.config.rowsSelect && (v = !0);
      let w = !1;
      this.config.keepSelect && (w = !0);
      let m = !1;
      this.config.disallowAllOption && (m = !0);
      let g = !1;
      this.config.hideEmptyColumns && (g = !0);
      let k = "none";
      ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns) && (k = this.config.ignoreSortEmptyColumns);
      let A = !1;
      this.config.search && (A = !0);
      let P = 1;
      this.config.searchLength && (P = this.config.searchLength);
      let D = "Search...";
      this.config.searchPlaceholder && (D = this.config.searchPlaceholder);
      let L = "Multiple sort";
      this.config.multiSortPlaceholder && (L = this.config.multiSortPlaceholder);
      let B = "Page sort";
      this.config.pageSortPlaceholder && (B = this.config.pageSortPlaceholder);
      let $ = "AND";
      ["AND", "OR"].includes(this.config.filterRelation) && ($ = this.config.filterRelation);
      let j = "AND";
      ["AND", "OR"].includes(this.config.filterGroupRelation) && (j = this.config.filterGroupRelation);
      let H = "Rows per page:";
      this.config.rowsPlaceholder && (H = this.config.rowsPlaceholder);
      let J = "No rows...";
      this.config.emptyPlaceholder && (J = this.config.emptyPlaceholder);
      let te = !1;
      this.config.selectAll && (te = !0);
      let X = !1;
      this.config.selectAllRows && (X = !0), l && X && (console.warn(
        "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
      ), X = !1);
      let G = !1;
      this.config.storeState && (G = !0), !this.identifier && this.config.storeState && (console.warn(
        "Option storeState was deactivated automatically because table identifier is not set!"
      ), G = !1);
      const le = "test-local-storage";
      try {
        localStorage.setItem(le, le), localStorage.removeItem(le);
      } catch (F) {
        console.warn(
          "Option storeState was deactivated automatically because local storage is not available!",
          F
        ), G = !1;
      }
      let se = !1;
      this.config.defaultSelected && (se = !0);
      let ce = !1;
      this.config.hideRowToggle && (ce = !0);
      let ne = !1;
      this.config.enableRowTabIndex && (ne = !0);
      let ue = "chevron-up";
      this.config.expandedRowIcon && typeof this.config.expandedRowIcon == "string" && ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
        this.config.expandedRowIcon.toLowerCase()
      ) && (ue = this.config.expandedRowIcon.toLowerCase());
      let Et = "chevron-down";
      this.config.collapsedRowIcon && typeof this.config.collapsedRowIcon == "string" && ["chevron-down", "plus", "caret-down", "eye"].includes(
        this.config.collapsedRowIcon.toLowerCase()
      ) && (Et = this.config.collapsedRowIcon.toLowerCase());
      let Di = 5;
      this.config.pageRange && (Di = this.config.pageRange);
      let ji = "col-12";
      this.config.searchClass && (ji = this.config.searchClass);
      let zi = "row";
      this.config.searchContainerClass && (zi = this.config.searchContainerClass);
      let Ii = "GET";
      this.config.requestMethod && typeof this.config.requestMethod == "string" && ["POST", "GET"].includes(this.config.requestMethod.toUpperCase()) && (Ii = this.config.requestMethod.toUpperCase());
      let Bi = 0, Sn = [], xn = [], kn = [], Lt = [], On = [], Cn = [], lt = [], _n = [], $i = null;
      if (this.config.columns) {
        Bi = this.config.columns.length;
        for (let F = 0; F < this.config.columns.length; F++)
          lt[F] = "", this.config.columns[F] && this.config.columns[F].headline ? (Sn[F] = this.config.columns[F].headline, lt[F] += this.config.columns[F].headline.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase()) : Sn[F] = "", lt[F] += " column-" + (F + 1), this.config.columns[F].classes && (lt[F] += " " + this.config.columns[F].classes), this.config.columns[F] && this.config.columns[F].breakpoint ? xn[F] = this.config.columns[F].breakpoint : xn[F] = "", this.config.columns[F] && this.config.columns[F].sort ? this.config.columns[F].firstSortDirection && typeof this.config.columns[F].firstSortDirection == "string" && ["DESC", "ASC"].includes(
            this.config.columns[F].firstSortDirection.toUpperCase()
          ) ? Lt[F] = this.config.columns[F].firstSortDirection.toUpperCase() : Lt[F] = !0 : Lt[F] = !1, this.config.columns[F] && this.config.columns[F].ignoreEmpty ? _n[F] = !0 : _n[F] = !1, this.config.columns[F] && this.config.columns[F].sticky ? On[F] = !0 : On[F] = !1, this.config.columns[F] && this.config.columns[F].hidden ? kn[F] = !0 : kn[F] = !1, this.config.columns[F] && this.config.columns[F].align ? Cn[F] = this.config.columns[F].align : Cn[F] = !1;
        $i = this.config.columns;
      }
      return {
        headlines: Sn,
        columnClasses: lt,
        sorts: Lt,
        pageSort: a,
        multiSort: o,
        pageSortSelect: u,
        multiSortSelect: f,
        filterGroupRelation: j,
        filterRelation: $,
        rowsSelect: v,
        keepSelect: w,
        disallowAllOption: m,
        defaultSelected: se,
        searchLength: P,
        search: A,
        searchPlaceholder: D,
        useFuzzySearch: y,
        ajaxUrl: l,
        pageSortPlaceholder: B,
        multiSortPlaceholder: L,
        rowsPlaceholder: H,
        emptyPlaceholder: J,
        stickyCols: On,
        alignments: Cn,
        breakpoints: xn,
        hiddenCols: kn,
        ignoreEmpty: _n,
        hideEmptyColumns: g,
        ignoreSortEmptyColumns: k,
        pagination: e,
        numberOfVisibleRowsFillerWord: t,
        select: n,
        selectAll: te,
        selectAllRows: X,
        hoverClass: r,
        activeClass: s,
        expandedAll: d,
        pageRange: Di,
        prettySelect: b,
        number: Bi,
        columns: $i,
        hideRowToggle: ce,
        enableRowTabIndex: ne,
        expandedRowIcon: ue,
        collapsedRowIcon: Et,
        selectPosition: c,
        searchClass: ji,
        searchContainerClass: zi,
        requestMethod: Ii,
        storeState: G,
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
        let n = this.currentPage * this.currentRowsPerPage, i = n - this.currentRowsPerPage, r = 0;
        for (let s in t)
          Object.prototype.hasOwnProperty.call(t, s) && (s = parseInt(s), r < n && r >= i && (e[t[s]] = !0), r++);
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
          for (let r = 0; r < this.hiddenBreakpoints.length; r++) {
            let s = this.hiddenBreakpoints[r];
            for (let o = 0; o < this.configFinal.columns.length; o++) {
              let a = this.configFinal.columns[o];
              !(this.configFinal.hiddenCols[o] || !this.configFinal.ignoreEmpty[o] && this.configFinal.hideEmptyColumns && (this.isColEmpty(o) || this.isColEmpty(o, t)) || this.emptyColumns[o]) && a.breakpoint && (a.breakpoint.toLocaleLowerCase() === "all" || a.breakpoint.toLocaleLowerCase() === s) && !a.sticky && !a.alwaysExpanded && (i[o] = n[o]);
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
        for (let r = 0; r < this.hiddenBreakpoints.length; r++) {
          let s = this.hiddenBreakpoints[r];
          for (let o = 0; o < this.configFinal.columns.length; o++) {
            let a = this.configFinal.columns[o];
            const f = this.configFinal.hiddenCols[o] || !this.configFinal.ignoreEmpty[o] && this.configFinal.hideEmptyColumns && (this.isColEmpty(o) || this.isColEmpty(o, t)) || this.emptyColumns[o];
            (!f && a.sticky || !f && a.breakpoint && (a.breakpoint.toLocaleLowerCase() === "all" || a.breakpoint.toLocaleLowerCase() === s) && a.alwaysExpanded) && (i[o] = n[o]);
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
        for (let r = 0; r < i.length; r++) {
          let s = [], o = this.configFinal.alignments[r];
          if ((i[r].align || n || o) && (i[r].align ? s.push("text-" + i[r].align) : n ? s.push("text-" + n) : s.push("text-" + o)), i[r].classes) {
            let a = i[r].classes.split(" ");
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
        for (let r = 0; r < this.hiddenBreakpoints.length; r++) {
          let s = this.hiddenBreakpoints[r];
          for (let o = 0; o < this.configFinal.columns.length; o++) {
            let a = this.configFinal.columns[o];
            if (!(this.configFinal.hiddenCols[o] || !this.configFinal.ignoreEmpty[o] && this.configFinal.hideEmptyColumns && (this.isColEmpty(o) || this.isColEmpty(o, i)) || this.emptyColumns[o]) && a.breakpoint && (a.breakpoint.toLocaleLowerCase() === "all" || a.breakpoint.toLocaleLowerCase() === s)) {
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
        let n = this.rowsFinal[t].cells ? this.rowsFinal[t].cells : this.rowsFinal[t], i = !1, r = !1;
        if (this.configFinal.search && this.query.length >= this.configFinal.searchLength) {
          for (let s = 0; s < n.length; s++) {
            let o = n[s], a = o.html ? o.html : o.text;
            if (a) {
              if (this.configFinal.useFuzzySearch && qs(
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
              if (this.configFinal.useFuzzySearch && qs(
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
          r = !0;
        }
        if (this.filterActive && !this.rowsFinal[t].filters)
          i = !1;
        else if ((r && i || !r) && this.filterActive) {
          if (this.filterGroups.length)
            i = this.doFiltering(this.rowsFinal[t].filters);
          else {
            let s = {
              items: [],
              relation: this.configFinal.filterRelation
            };
            for (let o in this.filtersFinal)
              Object.prototype.hasOwnProperty.call(this.filtersFinal, o) && s.items.push({ name: o });
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
        const i = this.configFinal.ignoreEmpty[n], r = this.configFinal.sorts[n];
        !this.configFinal.hideEmptyColumns || i || t === "none" && r || t === "active" && Object.keys(this.currentSortIndexes).includes(n + "") ? e[n] = !1 : e[n] = this.isColEmpty(n);
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
          const n = this.configFinal.selectAllRows ? this.rowsFinal.map((i, r) => r) : this.visibleRowIndexes;
          for (let i = 0; i < e.length; i++) {
            const r = e[i].key, s = e[i].value;
            for (let o = 0; o < n.length; o++) {
              const a = n[o];
              !this.rowsFinal[a].disableSelect && this.rowsFinal[a][r] === s && (this.selected[a] = !0, t++);
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
        if (JSON.stringify(e) === JSON.stringify(t) || this.configFinal.ajaxUrl)
          return;
        this.visibleRowIndexes.findIndex(
          (r) => r === this.activeRow
        ) < 0 && (this.activeRow = null), this.currentPage !== 1 ? this.currentPage = 1 : this.configFinal.keepSelect || this.resetSelect("filteredRows watcher");
        const i = [];
        for (let r = 0; r < e.length; r++) {
          const s = r.toString();
          e[r] && i.push(
            this.rowsFinal[this.sortedIndexes[s] ? this.sortedIndexes[s] : r]
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
        const f = JSON.parse(n);
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
      const s = localStorage.getItem(
        `vue-quintable-${this.identifier}-selected-rows`
      );
      s && (this.storedState["selected-rows"] = JSON.parse(s));
      const o = localStorage.getItem(
        `vue-quintable-${this.identifier}-current-page`
      );
      o && (this.storedState["current-page"] = parseInt(o));
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
      return (t > -1 ? [t] : this.visibleRowIndexes).map((r) => this.rowsFinal[r]).filter((r) => {
        const s = r.cells ? r.cells : r;
        return typeof s[e].isEmpty == "boolean" && s[e].isEmpty === !0 ? !1 : !!(typeof s[e].isEmpty == "boolean" && s[e].isEmpty === !1 || typeof s[e].text < "u" && this.valueToString(s[e].text) || typeof s[e].html < "u" && this.valueToString(s[e].html));
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
      n[t] = !!e, this.configFinal.selectAllRows ? n.indexOf(!1) === -1 ? this.allSelectedProperty = !0 : this.allSelectedProperty = !1 : (n = n.filter((i, r) => this.visibleRowIndexes.includes(r)), n.indexOf(!1) !== -1 ? this.allSelectedProperty = !1 : n.indexOf(!1) === -1 && (this.allSelectedProperty = !0));
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
      const r = t.toString(), s = parseInt(t);
      this.hiddenColumns[r] && !n && !i && (this.openRows[r] ? (this.openRows[r] = !1, this.$emit(
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
      let r = "   ";
      for (let o = 0; o < i; o++)
        r += "   ";
      if (this.DEBUG) {
        if (n.items) {
          let o = r, a = n.items.slice(), f = function(u, l) {
            return u.name === void 0 ? 1 : l.name === void 0 ? -1 : 0;
          };
          a = a.sort(f);
          for (let u = 0; u < a.length; u++)
            a[u].name && (o += a[u].name, u < a.length - 1 && (o += " " + n.relation + " "));
          console.log(o);
        }
        console.log(r, "GROUP:", n);
      }
      let s = !1;
      if (n.relation === "AND") {
        for (let o in e)
          if (Object.prototype.hasOwnProperty.call(e, o)) {
            if (this.filterGroups.length && !this.findInFilterGroups(o, this.filterGroups))
              continue;
            let a = !0;
            for (let f = 0; f < n.items.length; f++) {
              let u = n.items[f];
              if (u.name && t[u.name] === void 0) {
                a = !1;
                break;
              }
            }
            if (a)
              for (let f = 0; f < n.items.length; f++) {
                let u = n.items[f];
                if (s = !0, u.items && (s = this.doFilteringForGroup(
                  e,
                  t,
                  u,
                  i + 1
                )), !s)
                  break;
                if (typeof e[u.name] > "u")
                  continue;
                let l = typeof e[u.name] == "object" && e[u.name] !== null && e[u.name].operator && this.operators.includes(e[u.name].operator) ? e[u.name].operator : this.defaultOperator, c = this.getFilterValues(e[u.name]);
                const d = typeof e[u.name].compare == "function" ? e[u.name].compare : this.operatorFunctions[l];
                for (let y = 0; y < c.length; y++)
                  if (!d(
                    c[y],
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
        for (let o in e)
          if (Object.prototype.hasOwnProperty.call(e, o)) {
            if (this.filterGroups.length && !this.findInFilterGroups(o, this.filterGroups))
              continue;
            for (let a = 0; a < n.items.length; a++) {
              let f = n.items[a];
              if (f.items && (s = this.doFilteringForGroup(
                e,
                t,
                f,
                i + 1
              ), s))
                break;
              if (typeof e[f.name] > "u")
                continue;
              let u = typeof e[f.name] == "object" && e[f.name] !== null && e[f.name].operator && this.operators.includes(e[f.name].operator) ? e[f.name].operator : this.defaultOperator, l = this.getFilterValues(e[f.name]);
              const c = typeof e[f.name].compare == "function" ? e[f.name].compare : this.operatorFunctions[u];
              for (let d = 0; d < l.length; d++)
                if (c(
                  l[d],
                  t[f.name]
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
      for (let r = 0; r < t.length; r++) {
        let s = t[r];
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
      let r;
      this.currentSortIndexes[i] ? (r = this.currentSortIndexes[i], r.asc = !r.asc) : (this.multiSort || (this.currentSortIndexes = {}), r = {
        headline: this.configFinal.headlines[n],
        index: n,
        asc: this.configFinal.sorts[n] === !0 ? !0 : this.configFinal.sorts[n] === "ASC",
        order: this.numberOfSorts
      }), typeof t < "u" && (r.asc = t), this.currentSortIndexes[n] = r, this.configFinal.storeState && localStorage.setItem(
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
      let t = this.rowsFinal.slice(), n = [], i = [], r = {};
      if (this.pageSort) {
        if (i = this.visibleRowIndexes.slice(), !i.length) {
          const c = this.configFinal.pagination ? this.configFinal.pagination : this.rowsFinal.length;
          for (let d = 0; d < c; d++)
            i.push(d);
        }
        let l = 0;
        for (let c = 0; c < t.length; c++)
          t[c].index = c, i.indexOf(c) !== -1 && (l < this.configFinal.pagination && n.push(t[c]), l++);
        if (Object.keys(this.sortedIndexes).length)
          r = Object.assign({}, this.sortedIndexes);
        else
          for (let c = 0; c < t.length; c++)
            r[c.toString()] = c;
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
      let o = (l, c, d, y) => {
        y = y || 0;
        let b = d[y], v = b.index, w = l.cells ? l.cells : l, m = c.cells ? c.cells : c, g = typeof w[v].sortValue < "u" && w[v].sortValue !== null ? w[v].sortValue : w[v].html ? w[v].html : w[v].text;
        typeof w[v].computeSortValue == "function" && (g = w[v].computeSortValue(this.currentSortIndexes));
        let k = typeof m[v].sortValue < "u" && m[v].sortValue !== null ? m[v].sortValue : m[v].html ? m[v].html : m[v].text;
        return typeof m[v].computeSortValue == "function" && (g = m[v].computeSortValue(this.currentSortIndexes)), typeof g == "string" && (g = g.toLowerCase()), typeof k == "string" && (k = k.toLowerCase()), isNaN(g) ? (typeof g == "string" && g.match(/^-?\d+$/) || typeof g == "string" && g.match(/^\d+\.\d+$/)) && (g = parseFloat(g)) : g = parseFloat(g), isNaN(k) ? (typeof k == "string" && k.match(/^-?\d+$/) || typeof k == "string" && k.match(/^\d+\.\d+$/)) && (k = parseFloat(k)) : k = parseFloat(k), b.asc ? g > k ? 1 : g < k ? -1 : d[y + 1] ? o(l, c, d, y + 1) : 1 : g < k ? 1 : g > k ? -1 : d[y + 1] ? o(l, c, d, y + 1) : -1;
      };
      n.sort(function(l, c) {
        return o(l, c, s);
      });
      const a = [];
      let f = 0, u = 0;
      for (let l = 0; l < t.length; l++) {
        const c = l.toString();
        this.pageSort && i.indexOf(l) !== -1 ? (f < this.configFinal.pagination ? (a.push(n[u]), u++) : a.push(t[r[c]]), f++) : this.pageSort ? a.push(t[r[c]]) : a.push(n[l]);
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
          typeof this.sortedIndexes[t] > "u" && (this.sortedIndexes[t] = e), typeof this.selected[t] > "u" && (this.selected[t] = !1), this.openRows[t] = this.configFinal.expandedAll || this.rowsFinal[e].expanded;
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
        const o = this.lastQuery;
        if (this.lastQuery = "", o.length < this.configFinal.searchLength)
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
      const s = {
        "Content-Type": "application/json"
      };
      this.axiosFinal.request(this.configFinal.ajaxUrl, {
        method: this.configFinal.requestMethod,
        params: this.configFinal.requestMethod === "GET" ? r : null,
        data: this.configFinal.requestMethod === "POST" ? r : null,
        cancelToken: this.cancelSource.token,
        headers: s
      }).then((o) => {
        if (!o.data.rows || typeof o.data.rows.length > "u")
          throw "Response data has to contain rows property. Please see Readme.md for details";
        if (typeof o.data.all > "u")
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
}, fh = { class: "table-wrapper quintable" }, dh = { class: "breakpoints quintable--breakpoints" }, hh = { ref: "xs" }, ph = {
  ref: "sm",
  class: "d-none d-sm-block"
}, mh = {
  ref: "md",
  class: "d-none d-md-block"
}, gh = {
  ref: "lg",
  class: "d-none d-lg-block"
}, yh = {
  ref: "xl",
  class: "d-none d-xl-block"
}, bh = {
  ref: "xxl",
  class: "d-none d-xxl-block"
}, wh = { class: "header slot slot-header quintable--header" }, vh = ["placeholder"], Sh = { class: "slot slot-after-search quintable--after-search-container" }, xh = {
  ref: "height-wrapper",
  class: "clearfix quintable--table-container"
}, kh = { key: 0 }, Oh = { class: "vue-quintable-header-row quintable--table-container--table--header-row" }, Ch = {
  key: 0,
  class: "placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th"
}, _h = {
  key: 1,
  class: "select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre"
}, Ph = { class: "p-1" }, Fh = {
  key: 1,
  class: "mb-0 mt-0"
}, Ah = ["title", "onClick"], Rh = ["innerHTML"], Th = {
  key: 1,
  class: "headline quintable--table-container--table--header-row--th--headline"
}, Eh = {
  key: 2,
  class: "sorting-icon ms-2 quintable--table-container--table--header-row--th--sorting-icon"
}, Lh = ["onClick"], Nh = {
  key: 0,
  class: "badge bg-info text-white"
}, Mh = { key: 1 }, Dh = {
  key: 2,
  class: "select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post"
}, jh = {
  key: 1,
  class: "mb-0 mt-0"
}, zh = ["id", "onClick", "onAuxclick", "onMouseenter"], Ih = {
  key: 0,
  class: "toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td"
}, Bh = { key: 0 }, $h = { key: 0 }, Uh = { key: 1 }, qh = {
  key: 1,
  class: "mb-0 mt-0"
}, Vh = ["onUpdate:modelValue", "disabled", "onChange"], Hh = ["id", "onClick", "onAuxclick"], Wh = ["innerHTML"], Gh = ["innerHTML"], Kh = {
  key: 1,
  class: "mb-0 mt-0"
}, Yh = ["onUpdate:modelValue", "disabled", "onChange"], Jh = ["onMouseenter", "onClick"], Xh = ["colspan"], Qh = { class: "mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table" }, Zh = ["id"], ep = {
  key: 0,
  class: "toggle-cell invisible"
}, tp = { key: 0 }, np = { key: 0 }, ip = { key: 1 }, sp = ["onClick"], rp = ["innerHTML"], op = {
  key: 1,
  class: "headline"
}, ap = {
  key: 2,
  class: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
}, lp = ["onClick"], cp = {
  key: 0,
  class: "badge bg-info text-white"
}, up = { key: 1 }, fp = ["colspan", "onClick"], dp = ["innerHTML"], hp = {
  key: 1,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value"
}, pp = ["innerHTML"], mp = {
  key: 3,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component"
}, gp = {
  key: 4,
  class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text"
}, yp = ["id"], bp = {
  key: 0,
  class: "toggle-cell invisible"
}, wp = { key: 0 }, vp = { key: 0 }, Sp = { key: 1 }, xp = ["onClick"], kp = ["innerHTML"], Op = {
  key: 1,
  class: "headline"
}, Cp = {
  key: 2,
  class: "sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
}, _p = ["onClick"], Pp = {
  key: 0,
  class: "badge bg-info text-white"
}, Fp = { key: 1 }, Ap = ["colspan", "onClick"], Rp = ["innerHTML"], Tp = ["innerHTML"], Ep = {
  key: 1,
  class: "clearfix slot-no-results slot quintable--table-container--no-results"
}, Lp = { class: "text-center p-3 quintable--table-container--no-results--results" }, Np = ["innerHTML"], Mp = {
  key: 1,
  class: "slot-loading slot quintable--loading"
}, Dp = { class: "loader text-center py-4 quintable--loading--loader-wrapper--loader" }, jp = { class: "clearfix quintable--table-footer-container" }, zp = { class: "row" }, Ip = { class: "col-lg-4 quintable--table-footer-container--sort-container" }, Bp = { class: "col-lg-8 quintable--table-footer-container--pagination-wrapper" }, $p = {
  key: 0,
  class: "float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container"
}, Up = {
  key: 0,
  class: "mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select"
}, qp = ["innerHTML"], Vp = { class: "pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination" }, Hp = { class: "page-link" }, Wp = { class: "page-link" }, Gp = ["onClick"], Kp = { class: "page-link" }, Yp = { class: "page-link" }, Jp = { class: "page-link" }, Xp = {
  key: 2,
  class: "d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows"
}, Qp = { class: "footer slot slot-footer quintable--footer" };
function Zp(e, t, n, i, r, s) {
  const o = Le("quintable-font-awesome-icon"), a = Le("quintable-p-check"), f = Le("quintable-v-select"), u = sr("tooltip");
  return h(), S("div", fh, [
    O("div", dh, [
      O("div", hh, null, 512),
      O("div", ph, null, 512),
      O("div", mh, null, 512),
      O("div", gh, null, 512),
      O("div", yh, null, 512),
      O("div", bh, null, 512)
    ]),
    O("div", wh, [
      M(e.$slots, "header", {}, void 0, !0)
    ]),
    s.configFinal.search ? (h(), S("div", {
      key: 0,
      class: T(["mb-3 quintable--search-container", s.configFinal.searchContainerClass])
    }, [
      M(e.$slots, "before-search", {}, void 0, !0),
      M(e.$slots, "search", {
        value: r.query,
        loading: n.loading,
        setSearchQuery: s.setSearchQuery,
        placeholder: s.configFinal.searchPlaceholder,
        searchClass: s.configFinal.searchClass
      }, () => [
        O("div", {
          class: T(["quintable--search-container--input-container", s.configFinal.searchClass])
        }, [
          oe(O("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (l) => r.query = l),
            type: "search",
            placeholder: s.configFinal.searchPlaceholder,
            class: "form-control"
          }, null, 8, vh), [
            [Go, r.query]
          ])
        ], 2)
      ], !0),
      M(e.$slots, "after-search", {}, void 0, !0)
    ], 2)) : C("", !0),
    O("div", Sh, [
      M(e.$slots, "after-search-container", {}, void 0, !0)
    ]),
    O("div", xh, [
      s.ajaxLoading ? C("", !0) : (h(), S("table", {
        key: 0,
        ref: "table",
        class: T(["vue-quintable table quintable--table-container--table", n.tableClasses])
      }, [
        s.configFinal.headlines.length ? (h(), S("thead", kh, [
          O("tr", Oh, [
            s.hasGeneratedRows && !s.configFinal.hideRowToggle ? (h(), S("th", Ch, t[21] || (t[21] = [
              O("wbr", null, null, -1)
            ]))) : C("", !0),
            s.configFinal.select && s.configFinal.selectPosition === "pre" ? (h(), S("th", _h, [
              s.configFinal.selectAll && !s.noRows ? (h(), S(V, { key: 0 }, [
                s.configFinal.prettySelect ? (h(), N(a, {
                  key: 0,
                  modelValue: s.allSelectedProperty,
                  "onUpdate:modelValue": t[1] || (t[1] = (l) => s.allSelectedProperty = l),
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[2] || (t[2] = (l) => s.checkAll())
                }, {
                  extra: de(() => [
                    O("span", null, [
                      s.allSelectedProperty ? (h(), N(o, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : C("", !0)
                    ]),
                    O("span", Ph, [
                      s.someSelected && !s.allSelectedProperty ? (h(), N(o, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : C("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : (h(), S("label", Fh, [
                  oe(O("input", {
                    "onUpdate:modelValue": t[3] || (t[3] = (l) => s.allSelectedProperty = l),
                    type: "checkbox",
                    onChange: t[4] || (t[4] = (l) => s.checkAll())
                  }, null, 544), [
                    [Nt, s.allSelectedProperty]
                  ])
                ]))
              ], 64)) : C("", !0)
            ])) : C("", !0),
            (h(!0), S(V, null, Te(s.configFinal.headlines, (l, c) => (h(), S(V, null, [
              (s.configFinal.columns[c] && !s.configFinal.columns[c].breakpoint || r.hiddenBreakpoints.findIndex(
                (d) => s.configFinal.columns[c] && d === s.configFinal.columns[c].breakpoint
              ) === -1) && !s.configFinal.columns[c].sticky && !s.configFinal.hiddenCols[c] && !s.emptyColumns[c] ? (h(), S("th", {
                key: "headline-" + c,
                class: T(s.headerClass[c]),
                title: s.configFinal.columns[c].title,
                onClick: Ee((d) => s.setSortColumn(c), ["stop"])
              }, [
                s.showHeadlines[c] ? (h(), S("span", {
                  key: 0,
                  class: "headline quintable--table-container--table--header-row--th--headline",
                  innerHTML: l
                }, null, 8, Rh)) : (h(), S("span", Th, t[22] || (t[22] = [
                  O("wbr", null, null, -1)
                ]))),
                s.configFinal.sorts[c] ? (h(), S("span", Eh, [
                  r.currentSortIndexes[c] ? C("", !0) : (h(), N(o, {
                    key: 0,
                    icon: "sort",
                    class: "text-primary"
                  })),
                  r.currentSortIndexes[c] && r.currentSortIndexes[c].asc ? (h(), N(o, {
                    key: 1,
                    icon: "sort-amount-down-alt",
                    class: "text-primary"
                  })) : C("", !0),
                  r.currentSortIndexes[c] && !r.currentSortIndexes[c].asc ? (h(), N(o, {
                    key: 2,
                    icon: "sort-amount-down",
                    class: "text-primary"
                  })) : C("", !0),
                  r.currentSortIndexes[c] ? (h(), S("span", {
                    key: 3,
                    class: "ms-1 text-muted",
                    onClick: Ee((d) => s.removeSort(c), ["stop", "prevent"])
                  }, [
                    s.numberOfSorts > 1 ? (h(), S("span", Nh, U(r.currentSortIndexes[c].order + 1), 1)) : (h(), S("small", Mh, [
                      q(o, { icon: "times" })
                    ]))
                  ], 8, Lh)) : C("", !0)
                ])) : C("", !0)
              ], 10, Ah)) : C("", !0)
            ], 64))), 256)),
            s.configFinal.select && s.configFinal.selectPosition === "post" ? (h(), S("th", Dh, [
              s.configFinal.selectAll && !s.noRows ? (h(), S(V, { key: 0 }, [
                s.configFinal.prettySelect ? (h(), N(a, {
                  key: 0,
                  modelValue: s.allSelectedProperty,
                  "onUpdate:modelValue": t[5] || (t[5] = (l) => s.allSelectedProperty = l),
                  name: "check",
                  class: "p-icon p-smooth",
                  onChange: t[6] || (t[6] = (l) => s.checkAll())
                }, {
                  extra: de(() => [
                    O("span", null, [
                      s.allSelectedProperty ? (h(), N(o, {
                        key: 0,
                        icon: "check",
                        class: "text-success icon-check"
                      })) : C("", !0)
                    ]),
                    O("span", null, [
                      s.someSelected && !s.allSelectedProperty ? (h(), N(o, {
                        key: 0,
                        icon: "square",
                        class: "text-success icon-check"
                      })) : C("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : (h(), S("label", jh, [
                  oe(O("input", {
                    "onUpdate:modelValue": t[7] || (t[7] = (l) => s.allSelectedProperty = l),
                    type: "checkbox",
                    onChange: t[8] || (t[8] = (l) => s.checkAll())
                  }, null, 544), [
                    [Nt, s.allSelectedProperty]
                  ])
                ]))
              ], 64)) : C("", !0)
            ])) : C("", !0)
          ])
        ])) : C("", !0),
        O("tbody", {
          class: "quintable--table-container--table--tbody",
          onMouseleave: t[11] || (t[11] = (...l) => s.onMouseleaveTable && s.onMouseleaveTable(...l))
        }, [
          (h(!0), S(V, null, Te(s.visibleRowIndexes, (l) => (h(), S(V, {
            key: "vue-quintable-" + r.uuid + "-row-" + l + "-" + r.indexesUpdatedKey
          }, [
            oe((h(), S("tr", {
              id: "vue-quintable-" + r.uuid + "-row-" + l,
              ref_for: !0,
              ref: "row-highlighted-" + l,
              class: T([s.rowClasses[l], "vue-quintable-row quintable--table-container--table--tbody--row"]),
              style: ft(s.hiddenColumns[l] > 0 ? "cursor:pointer;" : ""),
              onClick: (c) => s.onRowClick(c, l),
              onAuxclick: (c) => s.onRowAuxClick(c, l),
              onMousedown: t[10] || (t[10] = (c) => s.onRowMousedown(c)),
              onMouseenter: (c) => s.onMouseenterRow(l)
            }, [
              s.hasGeneratedRows && !s.configFinal.hideRowToggle ? (h(), S("td", Ih, [
                s.hiddenColumns[l] > 0 ? (h(), S("span", Bh, [
                  r.openRows[l] ? (h(), S("span", Uh, [
                    q(o, {
                      "fixed-width": "",
                      icon: s.configFinal.expandedRowIcon
                    }, null, 8, ["icon"])
                  ])) : (h(), S("span", $h, [
                    q(o, {
                      "fixed-width": "",
                      icon: s.configFinal.collapsedRowIcon
                    }, null, 8, ["icon"])
                  ]))
                ])) : C("", !0)
              ])) : C("", !0),
              s.configFinal.select && s.configFinal.selectPosition === "pre" ? (h(), S("td", {
                key: 1,
                class: T(["select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre", { "disabled-select": s.rowsFinal[l].disableSelect }])
              }, [
                !s.rowsFinal[l].disableSelect || s.rowsFinal[l].showDisabledSelect ? (h(), S(V, { key: 0 }, [
                  s.configFinal.prettySelect ? (h(), N(a, {
                    key: 0,
                    modelValue: r.selected[l],
                    "onUpdate:modelValue": (c) => r.selected[l] = c,
                    name: "check",
                    class: "p-icon",
                    disabled: s.rowsFinal[l].disableSelect,
                    onChange: (c) => s.checkListener(c, l)
                  }, {
                    extra: de(() => [
                      O("span", null, [
                        r.selected[l] ? (h(), N(o, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : C("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : (h(), S("label", qh, [
                    oe(O("input", {
                      "onUpdate:modelValue": (c) => r.selected[l] = c,
                      type: "checkbox",
                      disabled: s.rowsFinal[l].disableSelect,
                      onChange: (c) => s.checkListener(c, l)
                    }, null, 40, Vh), [
                      [Nt, r.selected[l]]
                    ])
                  ]))
                ], 64)) : C("", !0)
              ], 2)) : C("", !0),
              (h(!0), S(V, null, Te(s.rowsFinal[l].cells ? s.rowsFinal[l].cells : s.rowsFinal[l], (c, d) => (h(), S(V, null, [
                !s.configFinal.hiddenCols[d] && !s.emptyColumns[d] && s.configFinal.columns[d] && c && r.hiddenBreakpoints.findIndex(
                  (y) => y === s.configFinal.columns[d].breakpoint
                ) === -1 && s.configFinal.columns[d].breakpoint !== "all" && !s.configFinal.stickyCols[d] ? oe((h(), S("td", {
                  id: "vue-quintable-" + r.uuid + "-cell-" + l + "-" + d,
                  key: "vue-quintable-" + r.uuid + "-cell-" + l + "-" + d,
                  class: T([
                    "vue-quintable-cell quintable--table-container--table--tbody--row--cell",
                    s.cellClassesParsed[l][d] + " " + s.configFinal.columnClasses[d]
                  ]),
                  onClick: (y) => s.onCellClick(y, c),
                  onAuxclick: (y) => s.onCellAuxClick(y, c),
                  onMousedown: t[9] || (t[9] = (y) => s.onCellMousedown(y))
                }, [
                  M(e.$slots, "cell-complete", { cell: c }, () => [
                    M(e.$slots, "cell-content", { cell: c }, () => [
                      s.configFinal.columns[d].cellFormatter && s.cellFormatters(d, c).type === "html" ? (h(), S("div", {
                        key: 0,
                        class: T(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html"]),
                        innerHTML: s.cellFormatters(d, c).value
                      }, null, 8, Wh)) : s.configFinal.columns[d].cellFormatter ? (h(), S("div", {
                        key: 1,
                        class: T(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value"])
                      }, U(s.cellFormatters(d, c).value), 1)) : s.valueToString(c.html) ? (h(), S("div", {
                        key: 2,
                        class: T(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--html"]),
                        innerHTML: c.html
                      }, null, 8, Gh)) : c.component ? (h(), S("div", {
                        key: 3,
                        class: T(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--component"])
                      }, [
                        (h(), N(et(c.component.name), He({ ref_for: !0 }, c.component.props, { onAction: s.handleComponentEvent }), null, 16, ["onAction"]))
                      ])) : s.valueToString(c.text) ? (h(), S("div", {
                        key: 4,
                        class: T(["cell-inner", "quintable--table-container--table--tbody--row--cell--inner-cell--text"])
                      }, U(c.text), 1)) : C("", !0)
                    ], !0)
                  ], !0)
                ], 42, Hh)), [
                  [u, {
                    placement: "left",
                    content: c.tooltip,
                    trigger: c.tooltip ? "hover" : "manual"
                  }]
                ]) : C("", !0)
              ], 64))), 256)),
              s.configFinal.select && s.configFinal.selectPosition === "post" ? (h(), S("td", {
                key: 2,
                class: T(["select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post", { "disabled-select": s.rowsFinal[l].disableSelect }])
              }, [
                !s.rowsFinal[l].disableSelect || s.rowsFinal[l].showDisabledSelect ? (h(), S(V, { key: 0 }, [
                  s.configFinal.prettySelect ? (h(), N(a, {
                    key: 0,
                    modelValue: r.selected[l],
                    "onUpdate:modelValue": (c) => r.selected[l] = c,
                    name: "check",
                    class: "p-icon",
                    disabled: s.rowsFinal[l].disableSelect,
                    onChange: (c) => s.checkListener(c, l)
                  }, {
                    extra: de(() => [
                      O("span", null, [
                        r.selected[l] ? (h(), N(o, {
                          key: 0,
                          icon: "check",
                          class: "text-success icon-check"
                        })) : C("", !0)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : (h(), S("label", Kh, [
                    oe(O("input", {
                      "onUpdate:modelValue": (c) => r.selected[l] = c,
                      type: "checkbox",
                      disabled: s.rowsFinal[l].disableSelect,
                      onChange: (c) => s.checkListener(c, l)
                    }, null, 40, Yh), [
                      [Nt, r.selected[l]]
                    ])
                  ]))
                ], 64)) : C("", !0)
              ], 2)) : C("", !0)
            ], 46, zh)), [
              [u, {
                placement: "top",
                content: s.rowsFinal[l].tooltip,
                trigger: s.rowsFinal[l].tooltip ? "hover" : "manual",
                offset: 5
              }]
            ]),
            (s.generatedRows[l] || s.stickyRows[l]) && s.visibleRows[l] ? (h(), S(V, { key: 0 }, [
              r.generatedUpdatedKey && r.openRows[l] && Object.keys(s.generatedRows[l]).length || Object.keys(s.stickyRows[l]).length ? (h(), S("tr", {
                key: "generated-row-" + l + "-" + r.rowsUpdatedKey + "-" + r.generatedUpdatedKey,
                ref_for: !0,
                ref: "generated-row-highlighted-" + l,
                class: T(["generated-row quintable--table-container--table--tbody--generated-row", {
                  "parent-row-expanded": r.openRows[l],
                  "parent-row-collapsed": s.hiddenColumns[l] > 0 && !r.openRows[l]
                }]),
                onMouseenter: (c) => s.onMouseenterRow(l),
                onClick: (c) => s.onRowClick(c, l)
              }, [
                O("td", {
                  colspan: s.configFinal.number + 1,
                  class: "ps-0 pe-0 pt-0"
                }, [
                  O("div", {
                    class: T({
                      [s.configFinal.hoverClass]: r.hoveredRow === l,
                      [s.configFinal.activeClass]: r.activeRow === l
                    })
                  }, [
                    O("table", Qh, [
                      O("tbody", null, [
                        (h(!0), S(V, null, Te(s.generatedRows[l], (c, d) => (h(), S(V, null, [
                          r.openRows[l] ? (h(), S("tr", {
                            id: "vue-quintable-" + r.uuid + "-generated-row-cell-" + l + "-" + d,
                            key: "vue-quintable-" + r.uuid + "-generated-row-cell-" + l + "-" + d + "-" + r.generatedUpdatedKey,
                            class: "generated-row-cell quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell"
                          }, [
                            !s.configFinal.hideRowToggle && s.generatedRows[l] && Object.keys(s.generatedRows[l]).length ? (h(), S("td", ep, [
                              s.hiddenColumns[l] > 0 ? (h(), S("span", tp, [
                                r.openRows[l] ? (h(), S("span", ip, [
                                  q(o, {
                                    "fixed-width": "",
                                    icon: s.configFinal.expandedRowIcon
                                  }, null, 8, ["icon"])
                                ])) : (h(), S("span", np, [
                                  q(o, {
                                    "fixed-width": "",
                                    icon: s.configFinal.collapsedRowIcon
                                  }, null, 8, ["icon"])
                                ]))
                              ])) : C("", !0)
                            ])) : C("", !0),
                            s.showHeadlines[d] || s.configFinal.sorts[d] ? (h(), S("td", {
                              key: 1,
                              class: T([s.configFinal.columnClasses[d], "generated-cell-element generated-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline"]),
                              onClick: Ee((y) => s.setSortColumn(d), ["stop"])
                            }, [
                              s.showHeadlines[d] ? (h(), S("strong", {
                                key: 0,
                                innerHTML: s.configFinal.headlines[d]
                              }, null, 8, rp)) : (h(), S("span", op, t[23] || (t[23] = [
                                O("wbr", null, null, -1)
                              ]))),
                              s.configFinal.sorts[d] && r.hoveredRow === l ? (h(), S("span", ap, [
                                r.currentSortIndexes[d] ? C("", !0) : (h(), N(o, {
                                  key: 0,
                                  icon: "sort",
                                  class: "text-primary"
                                })),
                                r.currentSortIndexes[d] && r.currentSortIndexes[d].asc ? (h(), N(o, {
                                  key: 1,
                                  icon: "sort-amount-down-alt",
                                  class: "text-primary"
                                })) : C("", !0),
                                r.currentSortIndexes[d] && !r.currentSortIndexes[d].asc ? (h(), N(o, {
                                  key: 2,
                                  icon: "sort-amount-down",
                                  class: "text-primary"
                                })) : C("", !0),
                                r.currentSortIndexes[d] ? (h(), S("span", {
                                  key: 3,
                                  class: "ms-1 text-muted",
                                  onClick: Ee((y) => s.removeSort(d), ["stop", "prevent"])
                                }, [
                                  s.numberOfSorts > 1 ? (h(), S("span", cp, U(r.currentSortIndexes[d].order + 1), 1)) : (h(), S("small", up, [
                                    q(o, { icon: "times" })
                                  ]))
                                ], 8, lp)) : C("", !0)
                              ])) : C("", !0)
                            ], 10, sp)) : C("", !0),
                            oe((h(), S("td", {
                              colspan: !s.showHeadlines[d] && !s.configFinal.sorts[d] ? 2 : 1,
                              class: T([
                                s.configFinal.columnClasses[d] + " " + s.cellClassesParsed[l][d],
                                "generated-cell-element generated-cell-element-content generated-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content"
                              ]),
                              onClick: (y) => s.onCellClick(y, c)
                            }, [
                              M(e.$slots, "generated-cell-complete", { cell: c }, () => [
                                M(e.$slots, "generated-cell-content", { cell: c }, () => [
                                  s.configFinal.columns[d].cellFormatter && s.cellFormatters(d, c).type === "html" ? (h(), S("div", {
                                    key: 0,
                                    class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html",
                                    innerHTML: s.cellFormatters(d, c).value
                                  }, null, 8, dp)) : s.configFinal.columns[d].cellFormatter ? (h(), S("div", hp, U(s.cellFormatters(d, c).value), 1)) : s.valueToString(c.html) ? (h(), S("div", {
                                    key: 2,
                                    class: "cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html",
                                    innerHTML: c.html
                                  }, null, 8, pp)) : c.component ? (h(), S("div", mp, [
                                    (h(), N(et(c.component.name), He({ ref_for: !0 }, c.component.props, { onAction: s.handleComponentEvent }), null, 16, ["onAction"]))
                                  ])) : s.valueToString(c.text) ? (h(), S("div", gp, U(c.text), 1)) : C("", !0)
                                ], !0)
                              ], !0)
                            ], 10, fp)), [
                              [u, {
                                placement: "top",
                                content: c.tooltip,
                                trigger: c.tooltip ? "hover" : "manual"
                              }]
                            ])
                          ], 8, Zh)) : C("", !0)
                        ], 64))), 256)),
                        (h(!0), S(V, null, Te(s.stickyRows[l], (c, d) => (h(), S("tr", {
                          id: "vue-quintable-" + r.uuid + "-sticky-row-cell-" + l + "-" + d,
                          key: "vue-quintable-" + r.uuid + "-sticky-row-cell-" + l + "-" + d,
                          class: "sticky-row-cell quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell"
                        }, [
                          !s.configFinal.hideRowToggle && s.generatedRows[l] && Object.keys(s.generatedRows[l]).length ? (h(), S("td", bp, [
                            s.hiddenColumns[l] > 0 ? (h(), S("span", wp, [
                              r.openRows[l] ? (h(), S("span", Sp, [
                                q(o, {
                                  "fixed-width": "",
                                  icon: s.configFinal.expandedRowIcon
                                }, null, 8, ["icon"])
                              ])) : (h(), S("span", vp, [
                                q(o, {
                                  "fixed-width": "",
                                  icon: s.configFinal.collapsedRowIcon
                                }, null, 8, ["icon"])
                              ]))
                            ])) : C("", !0)
                          ])) : C("", !0),
                          s.showHeadlines[d] || s.configFinal.sorts[d] ? (h(), S("td", {
                            key: 1,
                            class: T([s.configFinal.columnClasses[d], "generated-cell-element sticky-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline"]),
                            onClick: Ee((y) => s.setSortColumn(d), ["stop"])
                          }, [
                            s.showHeadlines[d] ? (h(), S("strong", {
                              key: 0,
                              innerHTML: s.configFinal.headlines[d]
                            }, null, 8, kp)) : (h(), S("span", Op, t[24] || (t[24] = [
                              O("wbr", null, null, -1)
                            ]))),
                            s.configFinal.sorts[d] && r.hoveredRow === l ? (h(), S("span", Cp, [
                              r.currentSortIndexes[d] ? C("", !0) : (h(), N(o, {
                                key: 0,
                                icon: "sort",
                                class: "text-primary"
                              })),
                              r.currentSortIndexes[d] && r.currentSortIndexes[d].asc ? (h(), N(o, {
                                key: 1,
                                icon: "sort-amount-down-alt",
                                class: "text-primary"
                              })) : C("", !0),
                              r.currentSortIndexes[d] && !r.currentSortIndexes[d].asc ? (h(), N(o, {
                                key: 2,
                                icon: "sort-amount-down",
                                class: "text-primary"
                              })) : C("", !0),
                              r.currentSortIndexes[d] ? (h(), S("span", {
                                key: 3,
                                class: "ms-1 text-muted",
                                onClick: Ee((y) => s.removeSort(d), ["stop", "prevent"])
                              }, [
                                s.numberOfSorts > 1 ? (h(), S("span", Pp, U(r.currentSortIndexes[d].order + 1), 1)) : (h(), S("small", Fp, [
                                  q(o, { icon: "times" })
                                ]))
                              ], 8, _p)) : C("", !0)
                            ])) : C("", !0)
                          ], 10, xp)) : C("", !0),
                          oe((h(), S("td", {
                            colspan: !s.showHeadlines[d] && !s.configFinal.sorts[d] ? 2 : 1,
                            class: T([
                              s.configFinal.columnClasses[d] + " " + s.cellClassesParsed[l][d],
                              "generated-cell-element generated-cell-element-content sticky-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content"
                            ]),
                            onClick: (y) => s.onCellClick(y, c)
                          }, [
                            M(e.$slots, "sticky-cell-complete", { cell: c }, () => [
                              M(e.$slots, "sticky-cell-content", { cell: c }, () => [
                                s.configFinal.columns[d].cellFormatter && s.cellFormatters(d, c).type === "html" ? (h(), S("div", {
                                  key: 0,
                                  class: T(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html"]),
                                  innerHTML: s.cellFormatters(d, c).value
                                }, null, 8, Rp)) : s.configFinal.columns[d].cellFormatter ? (h(), S("div", {
                                  key: 1,
                                  class: T(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value"])
                                }, U(s.cellFormatters(d, c).value), 1)) : s.valueToString(c.html) ? (h(), S("div", {
                                  key: 2,
                                  class: T(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html"]),
                                  innerHTML: c.html
                                }, null, 8, Tp)) : c.component ? (h(), S("div", {
                                  key: 3,
                                  class: T(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component"])
                                }, [
                                  (h(), N(et(c.component.name), He({ ref_for: !0 }, c.component.props, { onAction: s.handleComponentEvent }), null, 16, ["onAction"]))
                                ])) : s.valueToString(c.text) ? (h(), S("div", {
                                  key: 4,
                                  class: T(["cell-inner", "quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text"])
                                }, U(c.text), 1)) : C("", !0)
                              ], !0)
                            ], !0)
                          ], 10, Ap)), [
                            [u, {
                              placement: "top",
                              content: c.tooltip,
                              trigger: c.tooltip ? "hover" : "manual"
                            }]
                          ])
                        ], 8, yp))), 128))
                      ])
                    ])
                  ], 2)
                ], 8, Xh)
              ], 42, Jh)) : C("", !0)
            ], 64)) : C("", !0)
          ], 64))), 128))
        ], 32)
      ], 2)),
      s.noRows && !s.ajaxLoading ? (h(), S("div", Ep, [
        M(e.$slots, "no-results", {}, () => [
          O("div", Lp, [
            O("em", {
              innerHTML: s.configFinal.emptyPlaceholder
            }, null, 8, Np)
          ])
        ], !0),
        t[25] || (t[25] = O("hr", null, null, -1))
      ])) : C("", !0)
    ], 512),
    s.ajaxLoading ? (h(), S("div", Mp, [
      M(e.$slots, "loading", {}, () => [
        O("div", {
          class: "loader-wrapper quintable--loading--loader-wrapper",
          style: ft("height:" + r.loaderHeight + "px;")
        }, [
          O("div", Dp, [
            q(o, {
              icon: "circle-notch",
              spin: "",
              class: "ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader"
            })
          ])
        ], 4)
      ], !0)
    ])) : C("", !0),
    O("div", jp, [
      O("div", zp, [
        O("div", Ip, [
          s.configFinal.multiSortSelect || s.configFinal.pageSortSelect ? (h(), S("div", {
            key: 0,
            class: T(
              `pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select flex-inline ${s.configFinal.pageSort ? "me-3" : ""}`.trim()
            )
          }, [
            s.configFinal.multiSortSelect ? (h(), N(a, {
              key: 0,
              modelValue: s.multiSort,
              "onUpdate:modelValue": t[12] || (t[12] = (l) => s.multiSort = l),
              class: "p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select",
              value: "true"
            }, {
              default: de(() => [
                wt(U(s.configFinal.multiSortPlaceholder), 1)
              ]),
              _: 1
            }, 8, ["modelValue"])) : C("", !0),
            s.configFinal.pageSortSelect ? (h(), N(a, {
              key: 1,
              modelValue: s.pageSort,
              "onUpdate:modelValue": t[13] || (t[13] = (l) => s.pageSort = l),
              class: "p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select",
              value: "true"
            }, {
              default: de(() => [
                wt(U(s.configFinal.pageSortPlaceholder), 1)
              ]),
              _: 1
            }, 8, ["modelValue"])) : C("", !0)
          ], 2)) : C("", !0)
        ]),
        O("div", Bp, [
          s.configFinal && s.configFinal.pagination ? (h(), S("div", $p, [
            s.configFinal.rowsSelect ? (h(), S("div", Up, [
              O("span", {
                class: "d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder",
                innerHTML: s.configFinal.rowsPlaceholder
              }, null, 8, qp),
              q(f, {
                modelValue: s.currentRowsPerPageProperty,
                "onUpdate:modelValue": t[14] || (t[14] = (l) => s.currentRowsPerPageProperty = l),
                class: "d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select",
                options: s.paginationOptionsFilled,
                clearable: !1
              }, null, 8, ["modelValue", "options"])
            ])) : C("", !0),
            s.configFinal && s.configFinal.pagination && s.pages > 1 ? (h(), S("nav", {
              key: 1,
              class: T(["d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav", { "me-3": s.numberOfVisibleRows, disabled: s.ajaxLoading }])
            }, [
              O("ul", Vp, [
                s.pages > s.pageRange ? (h(), S("li", {
                  key: 0,
                  class: T(["page-item", { disabled: r.currentPage <= 1 }]),
                  onClick: t[15] || (t[15] = (l) => s.gotoPage("first"))
                }, [
                  O("span", Hp, [
                    q(o, { icon: "angle-double-left" })
                  ])
                ], 2)) : C("", !0),
                O("li", {
                  class: T(["page-item", { disabled: r.currentPage <= 1 }]),
                  onClick: t[16] || (t[16] = (l) => s.gotoPage("prev"))
                }, [
                  O("span", Wp, [
                    q(o, { icon: "angle-left" })
                  ])
                ], 2),
                s.pageRange < s.pages && s.visiblePages[0] > 1 ? (h(), S("li", {
                  key: 1,
                  class: "page-item",
                  onClick: t[17] || (t[17] = (l) => s.updatePageOffset(-1))
                }, t[26] || (t[26] = [
                  O("span", { class: "page-link" }, " ... ", -1)
                ]))) : C("", !0),
                (h(!0), S(V, null, Te(s.visiblePages, (l) => (h(), S("li", {
                  key: "pagination-item-" + l,
                  class: T(["page-item", { active: l === r.currentPage }]),
                  onClick: (c) => s.gotoPage(l)
                }, [
                  O("span", Kp, U(l), 1)
                ], 10, Gp))), 128)),
                s.pageRange < s.pages && s.visiblePages[s.visiblePages.length - 1] < s.pages ? (h(), S("li", {
                  key: 2,
                  class: "page-item",
                  onClick: t[18] || (t[18] = (l) => s.updatePageOffset(1))
                }, t[27] || (t[27] = [
                  O("span", { class: "page-link" }, " ... ", -1)
                ]))) : C("", !0),
                O("li", {
                  class: T(["page-item", { disabled: s.pages === r.currentPage }]),
                  onClick: t[19] || (t[19] = (l) => s.gotoPage("next"))
                }, [
                  O("span", Yp, [
                    q(o, { icon: "angle-right" })
                  ])
                ], 2),
                s.pages > s.pageRange ? (h(), S("li", {
                  key: 3,
                  class: T(["page-item", { disabled: s.pages === r.currentPage }]),
                  onClick: t[20] || (t[20] = (l) => s.gotoPage("last"))
                }, [
                  O("span", Jp, [
                    q(o, { icon: "angle-double-right" })
                  ])
                ], 2)) : C("", !0)
              ])
            ], 2)) : C("", !0),
            s.numberOfVisibleRows ? (h(), S("span", Xp, U(s.firstVisibleRow) + "-" + U(s.lastVisibleRow) + " " + U(s.configFinal.numberOfVisibleRowsFillerWord) + " " + U(s.numberOfVisibleRows), 1)) : C("", !0)
          ])) : C("", !0)
        ])
      ])
    ]),
    O("div", Qp, [
      M(e.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const em = /* @__PURE__ */ ch(uh, [["render", Zp], ["__scopeId", "data-v-e403edb3"]]);
Lc.add(
  Sf,
  of,
  kf,
  nf,
  hf,
  sf,
  xf,
  gf,
  tf,
  Zu,
  ff,
  ef,
  df,
  yf,
  uf,
  lf,
  mf,
  cf,
  wf
);
const vm = (e, t = {}) => {
  e.component("QuintableVSelect", Ea), e.component("QuintableFontAwesomeIcon", Xc), e.component("VueQuintable", em), e.use(Qu, {
    // You can tweak defaults here; example sets a custom distance.
    distance: 6
    // If you want a custom theme class, add CSS and set theme on each use.
    // See floating-vue docs for options.
  }), t.axios && (console.log(e), e.config.globalProperties || (e.config.globalProperties = {}), e.config.globalProperties.$globalVueQuintableaxios = t.axios);
};
export {
  em as VueQuintable,
  vm as default
};
//# sourceMappingURL=vue-quintable.es.js.map
