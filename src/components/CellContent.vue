<template>
  <div style="display: contents">
    <slot :cell="cell">
      <div
        class="cell-inner"
        :class="classPrefix + '--formatted-html'"
        v-if="hasFormatter && formattedCell.type === 'html'"
        v-html="formattedCell.value"
      ></div>
      <div
        class="cell-inner"
        :class="classPrefix + '--formatted-value'"
        v-else-if="hasFormatter"
      >
        {{ formattedCell.value }}
      </div>
      <div
        class="cell-inner"
        :class="classPrefix + '--html'"
        v-else-if="quintable.valueToString(cell.html)"
        v-html="cell.html"
      ></div>
      <div
        class="cell-inner"
        :class="classPrefix + '--component'"
        v-else-if="cell.component"
      >
        <component
          :is="cell.component.name"
          v-bind="cell.component.props"
          @action="quintable.handleComponentEvent"
        ></component>
      </div>
      <div
        class="cell-inner"
        :class="classPrefix + '--text'"
        v-else-if="quintable.valueToString(cell.text)"
      >
        {{ cell.text }}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "CellContent",
  inject: ["quintable"],
  props: {
    cell: { type: Object, required: true },
    cIndex: { type: [Number, String], required: true },
    classPrefix: { type: String, default: "" },
  },
  computed: {
    hasFormatter() {
      return !!(
        this.quintable.configFinal.columns[this.cIndex] &&
        this.quintable.configFinal.columns[this.cIndex].cellFormatter
      );
    },
    formattedCell() {
      if (!this.hasFormatter) return {};
      return this.quintable.cellFormatters(this.cIndex, this.cell);
    },
  },
};
</script>
