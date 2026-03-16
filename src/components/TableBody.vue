<template>
  <tbody
    @mouseleave="quintable.onMouseleaveTable"
    class="quintable--table-container--table--tbody"
  >
    <template v-for="rIndex in quintable.visibleRowIndexes">
      <table-row
        :r-index="rIndex"
        :key="
          'vue-quintable-' +
          quintable.uuid +
          '-row-' +
          rIndex +
          '-' +
          quintable.essentialsKey
        "
      >
        <template
          v-if="$scopedSlots['cell-complete']"
          v-slot:cell-complete="{ cell }"
        >
          <slot name="cell-complete" :cell="cell" />
        </template>
        <template
          v-if="$scopedSlots['cell-content']"
          v-slot:cell-content="{ cell }"
        >
          <slot name="cell-content" :cell="cell" />
        </template>
      </table-row>
      <expanded-row
        v-if="
          (quintable.generatedRows[rIndex] || quintable.stickyRows[rIndex]) &&
          quintable.visibleRows[rIndex]
        "
        :r-index="rIndex"
        :key="
          'generated-row-' +
          rIndex +
          '-' +
          quintable.essentialsKey +
          '-' +
          quintable.generatedUpdatedKey
        "
      >
        <template
          v-if="$scopedSlots['generated-cell-complete']"
          v-slot:generated-cell-complete="{ cell }"
        >
          <slot name="generated-cell-complete" :cell="cell" />
        </template>
        <template
          v-if="$scopedSlots['generated-cell-content']"
          v-slot:generated-cell-content="{ cell }"
        >
          <slot name="generated-cell-content" :cell="cell" />
        </template>
        <template
          v-if="$scopedSlots['sticky-cell-complete']"
          v-slot:sticky-cell-complete="{ cell }"
        >
          <slot name="sticky-cell-complete" :cell="cell" />
        </template>
        <template
          v-if="$scopedSlots['sticky-cell-content']"
          v-slot:sticky-cell-content="{ cell }"
        >
          <slot name="sticky-cell-content" :cell="cell" />
        </template>
      </expanded-row>
    </template>
  </tbody>
</template>

<script>
import TableRow from "./TableRow.vue";
import ExpandedRow from "./ExpandedRow.vue";

export default {
  name: "TableBody",
  inject: ["quintable"],
  components: { TableRow, ExpandedRow },
};
</script>
