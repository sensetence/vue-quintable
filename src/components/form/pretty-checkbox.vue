<template>
  <div :class="classes">
    <input
      ref="input"
      type="checkbox"
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
    <div v-if="_indeterminate" :class="indeterminateClasses">
      <slot name="indeterminate-extra"></slot>
      <slot name="indeterminate-label"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrettyCheckbox",

  props: {
    type: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number, Object, Array, Boolean],
      default: null,
    },
    modelValue: {
      type: [String, Number, Object, Array, Boolean],
      default: undefined,
    },
    trueValue: {
      type: [String, Number, Object, Array, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Object, Array, Boolean],
      default: false,
    },
    checked: {
      type: [String, Boolean],
      default: false,
    },
    disabled: {
      type: [String, Boolean],
      default: false,
    },
    required: {
      type: [String, Boolean],
      default: false,
    },
    indeterminate: {
      type: [String, Boolean],
      default: false,
    },
    color: {
      type: String,
      default: null,
    },
    offColor: {
      type: String,
      default: null,
    },
    hoverColor: {
      type: String,
      default: null,
    },
    indeterminateColor: {
      type: String,
      default: null,
    },
    toggle: {
      type: [String, Boolean],
      default: false,
    },
    hover: {
      type: [String, Boolean],
      default: false,
    },
    focus: {
      type: [String, Boolean],
      default: false,
    },
  },

  emits: ["update:modelValue", "change", "update:indeterminate"],

  data() {
    return {
      m_checked: false,
      default_mode: false,
    };
  },

  computed: {
    shouldBeChecked() {
      if (this.modelValue !== undefined) {
        if (this.modelValue instanceof Array) {
          return this.modelValue.includes(this.value);
        }
        if (this._trueValue) {
          return this.modelValue === this.trueValue;
        }
        return typeof this.modelValue === "string" ? true : !!this.modelValue;
      }
      return this.m_checked;
    },
    _disabled() {
      return typeof this.disabled === "string" ? true : !!this.disabled;
    },
    _required() {
      return typeof this.required === "string" ? true : !!this.required;
    },
    _indeterminate() {
      return typeof this.indeterminate === "string"
        ? true
        : !!this.indeterminate;
    },
    _trueValue() {
      return typeof this.trueValue === "string"
        ? this.trueValue
        : !!this.trueValue;
    },
    _falseValue() {
      return typeof this.falseValue === "string"
        ? this.falseValue
        : !!this.falseValue;
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
        "p-toggle": this._toggle,
        "p-has-hover": this._hover,
        "p-has-focus": this._focus,
        "p-has-indeterminate": this._indeterminate,
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
    indeterminateClasses() {
      let classes = {
        state: true,
        "p-is-indeterminate": true,
      };
      if (this.indeterminateColor)
        classes[`p-${this.indeterminateColor}`] = true;

      return classes;
    },
  },

  watch: {
    checked(newValue) {
      this.m_checked = typeof newValue === "string" ? true : !!newValue;
    },
    indeterminate(v) {
      if (this.$refs.input) {
        this.$refs.input.indeterminate = v;
      }
    },
  },

  created() {
    this.m_checked = typeof this.checked === "string" ? true : !!this.checked;
  },

  mounted() {
    if (!this.$el.className || this.$el.className === "pretty")
      this.default_mode = true;
    if (this._indeterminate && this.$refs.input)
      this.$refs.input.indeterminate = true;
    this.$el.setAttribute("p-checkbox", "");
  },

  methods: {
    updateInput(event) {
      this.$emit("update:indeterminate", false);

      let isChecked = event.target.checked;

      this.m_checked = isChecked;

      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];

        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }

        this.$emit("update:modelValue", newValue);
        this.$emit("change", newValue);
      } else {
        const emitValue = isChecked
          ? this._trueValue
            ? this.trueValue
            : true
          : this._falseValue
            ? this.falseValue
            : false;
        this.$emit("update:modelValue", emitValue);
        this.$emit("change", emitValue);
      }
    },
  },
};
</script>

<style scoped>
@import "../../assets/styles/pretty-checkbox.css";
</style>
