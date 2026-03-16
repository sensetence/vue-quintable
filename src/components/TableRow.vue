<template>
  <tr
    class="vue-quintable-row quintable--table-container--table--tbody--row"
    v-tooltip="{
      placement: 'top',
      content: quintable.rowsFinal[rIndex].tooltip,
      trigger: quintable.rowsFinal[rIndex].tooltip ? 'hover' : 'manual',
      offset: 5,
    }"
    :style="quintable.hiddenColumns[rIndex] > 0 ? 'cursor:pointer;' : ''"
    :ref="'row-highlighted-' + rIndex"
    @click="quintable.onRowClick($event, rIndex)"
    @auxclick="quintable.onRowAuxClick($event, rIndex)"
    @mousedown="quintable.onRowMousedown($event)"
    :class="[
      quintable.rowClasses[rIndex],
      {
        [quintable.configFinal.hoverClass]: quintable.hoveredRow === rIndex,
        [quintable.configFinal.activeClass]: quintable.activeRow === rIndex,
      },
    ]"
    :id="'vue-quintable-' + quintable.uuid + '-row-' + rIndex"
    @mouseenter="quintable.onMouseenterRow(rIndex)"
  >
    <td
      class="
        toggle toggle-td toggle-cell
        quintable--table-container--table--tbody--row--toggle-td
      "
      v-if="quintable.hasGeneratedRows && !quintable.configFinal.hideRowToggle"
    >
      <toggle-icon
        :has-hidden="quintable.hiddenColumns[rIndex] > 0"
        :expanded="!!quintable.openRows[rIndex]"
        :collapsed-icon="quintable.configFinal.collapsedRowIcon"
        :expanded-icon="quintable.configFinal.expandedRowIcon"
      />
    </td>
    <td
      v-if="
        quintable.configFinal.select &&
        quintable.configFinal.selectPosition === 'pre'
      "
      class="
        select-td
        pre
        quintable--table-container--table--tbody--row--select-td
        quintable--table-container--table--tbody--row--select-td--pre
      "
      :class="{
        'disabled-select': quintable.rowsFinal[rIndex].disableSelect,
      }"
    >
      <select-checkbox
        v-if="
          !quintable.rowsFinal[rIndex].disableSelect ||
          quintable.rowsFinal[rIndex].showDisabledSelect
        "
        :value="quintable.selected[rIndex]"
        :pretty="quintable.configFinal.prettySelect"
        :disabled="quintable.rowsFinal[rIndex].disableSelect"
        @input="$set(quintable.selected, rIndex, $event)"
        @change="quintable.checkListener($event, rIndex)"
      />
    </td>

    <template
      v-for="(cell, cIndex) in quintable.rowsFinal[rIndex].cells
        ? quintable.rowsFinal[rIndex].cells
        : quintable.rowsFinal[rIndex]"
    >
      <td
        class="
          vue-quintable-cell
          quintable--table-container--table--tbody--row--cell
        "
        v-tooltip="{
          placement: 'left',
          content: cell.tooltip,
          trigger: cell.tooltip ? 'hover' : 'manual',
        }"
        :class="
          quintable.cellClassesParsed[rIndex][cIndex] +
          ' ' +
          quintable.configFinal.columnClasses[cIndex]
        "
        v-if="
          !quintable.configFinal.hiddenCols[cIndex] &&
          !quintable.emptyColumns[cIndex] &&
          quintable.configFinal.columns[cIndex] &&
          cell &&
          quintable.hiddenBreakpoints.findIndex(
            (x) => x === quintable.configFinal.columns[cIndex].breakpoint
          ) === -1 &&
          quintable.configFinal.columns[cIndex].breakpoint !== 'all' &&
          !quintable.configFinal.stickyCols[cIndex]
        "
        @click="quintable.onCellClick($event, cell)"
        @auxclick="quintable.onCellAuxClick($event, cell)"
        @mousedown="quintable.onCellMousedown($event)"
        :key="
          'vue-quintable-' + quintable.uuid + '-cell-' + rIndex + '-' + cIndex
        "
        :id="
          'vue-quintable-' + quintable.uuid + '-cell-' + rIndex + '-' + cIndex
        "
      >
        <cell-content
          :cell="cell"
          :c-index="cIndex"
          class-prefix="quintable--table-container--table--tbody--row--cell--inner-cell"
        >
          <template v-slot:default="{ cell: slotCell }">
            <slot name="cell-complete" :cell="slotCell">
              <slot name="cell-content" :cell="slotCell" />
            </slot>
          </template>
        </cell-content>
      </td>
    </template>

    <td
      v-if="
        quintable.configFinal.select &&
        quintable.configFinal.selectPosition === 'post'
      "
      class="
        select-td
        post
        quintable--table-container--table--tbody--row--select-td
        quintable--table-container--table--tbody--row--select-td--post
      "
      :class="{
        'disabled-select': quintable.rowsFinal[rIndex].disableSelect,
      }"
    >
      <select-checkbox
        v-if="
          !quintable.rowsFinal[rIndex].disableSelect ||
          quintable.rowsFinal[rIndex].showDisabledSelect
        "
        :value="quintable.selected[rIndex]"
        :pretty="quintable.configFinal.prettySelect"
        :disabled="quintable.rowsFinal[rIndex].disableSelect"
        @input="$set(quintable.selected, rIndex, $event)"
        @change="quintable.checkListener($event, rIndex)"
      />
    </td>
  </tr>
</template>

<script>
import CellContent from "./CellContent.vue";
import SelectCheckbox from "./SelectCheckbox.vue";
import ToggleIcon from "./ToggleIcon.vue";

export default {
  name: "TableRow",
  inject: ["quintable"],
  components: { CellContent, SelectCheckbox, ToggleIcon },
  props: {
    rIndex: {
      type: Number,
      required: true,
    },
  },
};
</script>
