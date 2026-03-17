<template functional>
  <div style="display: contents">
    <slot :cell="props.cell">
      <div
        class="cell-inner"
        :class="props.classPrefix + '--formatted-html'"
        v-if="props.formatted && props.formatted.type === 'html'"
        v-html="props.formatted.value"
      ></div>
      <div
        class="cell-inner"
        :class="props.classPrefix + '--formatted-value'"
        v-else-if="props.formatted"
      >
        {{ props.formatted.value }}
      </div>
      <div
        class="cell-inner"
        :class="props.classPrefix + '--html'"
        v-else-if="props.cell.html != null && String(props.cell.html) !== ''"
        v-html="props.cell.html"
      ></div>
      <div
        class="cell-inner"
        :class="props.classPrefix + '--component'"
        v-else-if="props.cell.component"
      >
        <component
          :is="props.cell.component.name"
          v-bind="props.cell.component.props"
          @action="props.onComponentEvent"
        ></component>
      </div>
      <div
        class="cell-inner"
        :class="props.classPrefix + '--text'"
        v-else-if="props.cell.text != null && String(props.cell.text) !== ''"
      >
        {{ props.cell.text }}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "CellContent",
  functional: true,
  props: {
    cell: { type: Object, required: true },
    cIndex: { type: [Number, String], required: true },
    classPrefix: { type: String, default: "" },
    formatted: { type: [Object, null], default: null },
    onComponentEvent: { type: Function, default: () => {} },
  },
};
</script>
