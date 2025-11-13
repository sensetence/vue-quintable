<template>
  <div :class="classes">
    <input
        ref="input"
        type="radio"
        :name="name"
        :value="value"
        :checked="shouldBeChecked"
        :disabled="_disabled"
        :required="_required"
        @change="updateInput"
    />
    <div :class="onClasses">
      <slot name="extra"></slot>
      <label>
        <slot></slot>
      </label>
    </div>
    <div v-if="_toggle" :class="offClasses">
      <slot name="off-extra"></slot>
      <slot name="off-label"></slot>
    </div>
    <div v-if="_hover" :class="hoverClasses">
      <slot name="hover-extra"></slot>
      <slot name="hover-label"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrettyRadio",

  props: {
    name: {
      type: String,
      default: undefined,
    },
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: undefined,
    },
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: undefined,
    },
    checked: {
      type: [Boolean, String],
      default: undefined,
    },
    disabled: {
      type: [Boolean, String],
      default: undefined,
    },
    required: {
      type: [Boolean, String],
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    offColor: {
      type: String,
      default: undefined,
    },
    hoverColor: {
      type: String,
      default: undefined,
    },
    toggle: {
      type: [Boolean, String],
      default: undefined,
    },
    hover: {
      type: [Boolean, String],
      default: undefined,
    },
    focus: {
      type: [Boolean, String],
      default: undefined,
    },
  },

  emits: ['update:modelValue', 'change'],

  data() {
    return {
      m_checked: undefined,
      default_mode: false,
    };
  },

  computed: {
    shouldBeChecked() {
      if (this.modelValue !== undefined) {
        return this.modelValue === this.value;
      }

      if (this.m_checked === undefined) {
        return typeof this.checked === "string" ? true : !!this.checked;
      } else {
        return this.m_checked;
      }
    },
    _disabled() {
      return typeof this.disabled === "string" ? true : !!this.disabled;
    },
    _required() {
      return typeof this.required === "string" ? true : !!this.required;
    },
    _toggle() {
      return typeof this.toggle === "string" ? true : !!this.toggle;
    },
    _hover() {
      return typeof this.hover === "string" ? true : !!this.hover;
    },
    _focus() {
      return typeof this.focus === "string" ? true : !!this.focus;
    },
    classes() {
      return {
        pretty: true,
        "p-default": this.default_mode,
        "p-round": this.default_mode,
        "p-toggle": this._toggle,
        "p-has-hover": this._hover,
        "p-has-focus": this._focus,
      };
    },
    onClasses() {
      let classes = {
        state: true,
        "p-on": this._toggle,
      };
      if (this.color) classes[`p-${this.color}`] = true;

      return classes;
    },
    offClasses() {
      let classes = {
        state: true,
        "p-off": true,
      };
      if (this.offColor) classes[`p-${this.offColor}`] = true;

      return classes;
    },
    hoverClasses() {
      let classes = {
        state: true,
        "p-is-hover": true,
      };
      if (this.hoverColor) classes[`p-${this.hoverColor}`] = true;

      return classes;
    },
  },

  watch: {
    checked(v) {
      this.m_checked = v;
    },
  },

  mounted() {
    if (!this.$el.className || this.$el.className === 'pretty') {
      this.default_mode = true;
    }
    if (this.m_checked === undefined && this.checked !== undefined) {
      this.m_checked = typeof this.checked === "string" ? true : !!this.checked;
    }
    this.$el.setAttribute("p-radio", "");
  },

  methods: {
    updateInput() {
      this.$emit("update:modelValue", this.value);
      this.$emit("change", this.value);
    },
  },
};
</script>

<style>
@import '../../assets/styles/pretty-checkbox.css';
</style>

