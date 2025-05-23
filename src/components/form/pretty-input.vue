<template>
  <div :class="classes">
    <input
        ref="input"
        :type="_type"
        :name="name"
        :checked="shouldBeChecked"
        :value="value"
        @change="updateInput"
        :disabled="_disabled"
        :required="_required"
    />
    <div :class="onClasses">
      <slot name="extra"/>
      <label>
        <slot/>
      </label>
    </div>
    <div v-if="_toggle" :class="offClasses">
      <slot name="off-extra"/>
      <slot name="off-label"/>
    </div>
    <div v-if="_hover" :class="hoverClasses">
      <slot name="hover-extra"/>
      <slot name="hover-label"/>
    </div>
    <div v-if="_indeterminate" :class="indeterminateClasses">
      <slot name="indeterminate-extra"/>
      <slot name="indeterminate-label"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "pretty-input",

  props: {
    type: String,
    name: String,
    value: {},
    modelValue: {},
    trueValue: {},
    falseValue: {},
    checked: {},
    disabled: {},
    required: {},
    indeterminate: {},
    color: String,
    offColor: String,
    hoverColor: String,
    indeterminateColor: String,
    toggle: {},
    hover: {},
    focus: {}
  },

  data() {
    return {
      m_checked: false,
      default_mode: false
    };
  },

  computed: {
    _type() {
      if (this.$options.input_type) return this.$options.input_type;
      if (this.type) return this.type;
      return "checkbox";
    },
    shouldBeChecked() {
      if (this.modelValue !== undefined) {
        if (this._type === "radio") {
          return this.modelValue === this.value;
        }
        if (this.modelValue instanceof Array) {
          return this.modelValue.includes(this.value);
        }
        if (this._trueValue) {
          return this.modelValue === this.trueValue;
        }
        return typeof this.modelValue === "string" ? true : !!this.modelValue;
      }

      if (this.m_checked === undefined)
        return typeof this.checked === "string" ? true : !!this.checked;
      else return this.m_checked;
    },
    _disabled() {
      return typeof this.disabled === "string" ? true : !!this.disabled;
    },
    _required() {
      return typeof this.required === "string" ? true : !!this.required;
    },
    _indeterminate() {
      return typeof this.indeterminate === "string" ? true : !!this.indeterminate;
    },
    _trueValue() {
      return typeof this.trueValue === "string" ? this.trueValue : !!this.trueValue;
    },
    _falseValue() {
      return typeof this.falseValue === "string" ? this.falseValue : !!this.falseValue;
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
        "p-round": this._type === "radio" ? this.default_mode : false,
        "p-toggle": this._toggle,
        "p-has-hover": this._hover,
        "p-has-focus": this._focus,
        "p-has-indeterminate": this._indeterminate
      };
    },
    onClasses() {
      const classes: Record<string, boolean> = {
        state: true,
        "p-on": this._toggle
      };
      if (this.color) classes[`p-${this.color}`] = true;
      return classes;
    },
    offClasses() {
      const classes: Record<string, boolean> = {
        state: true,
        "p-off": true
      };
      if (this.offColor) classes[`p-${this.offColor}`] = true;
      return classes;
    },
    hoverClasses() {
      const classes: Record<string, boolean> = {
        state: true,
        "p-is-hover": true
      };
      if (this.hoverColor) classes[`p-${this.hoverColor}`] = true;
      return classes;
    },
    indeterminateClasses() {
      const classes: Record<string, boolean> = {
        state: true,
        "p-is-indeterminate": true
      };
      if (this.indeterminateColor) classes[`p-${this.indeterminateColor}`] = true;
      return classes;
    }
  },

  watch: {
    checked(v) {
      this.m_checked = typeof v === "string" ? true : !!v;
    }
  },

  mounted() {
    this.default_mode = true;
    this.$el.setAttribute(`p-${this._type}`, "");

    if (this.$refs.input && this._indeterminate) {
      (this.$refs.input as HTMLInputElement).indeterminate = true;
    }
  },

  updated() {
    if (this.$refs.input) {
      (this.$refs.input as HTMLInputElement).indeterminate = this._indeterminate;
    }
  },

  methods: {
    updateInput(event: any) {
      if (this._type === "radio") {
        this.$emit("change", this.value);
        return;
      }

      this.$emit("update:indeterminate", false);
      const isChecked = event.target.checked;
      this.m_checked = isChecked;

      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue];
        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }
        this.$emit("change", newValue);
      } else {
        this.$emit(
            "change",
            isChecked
                ? this._trueValue
                    ? this.trueValue
                    : true
                : this._falseValue
                    ? this.falseValue
                    : false
        );
      }
    }
  }
});
</script>
