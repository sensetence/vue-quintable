<template>
  <tr
    v-if="row"
    class="vue-quintable-row quintable--table-container--table--tbody--row"
    v-tooltip="{
      placement: 'top',
      content: row.tooltip,
      trigger: row.tooltip ? 'hover' : 'manual',
      offset: 5,
    }"
    :style="quintable.hiddenColumns[rIndex] > 0 ? 'cursor:pointer;' : ''"
    :ref="'row-highlighted-' + rIndex"
    @click="quintable.onRowClick($event, rIndex)"
    @auxclick="quintable.onRowAuxClick($event, rIndex)"
    @mousedown="quintable.onRowMousedown($event)"
    :class="quintable.rowClasses[rIndex]"
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
        'disabled-select': row.disableSelect,
      }"
    >
      <select-checkbox
        v-if="!row.disableSelect || row.showDisabledSelect"
        :value="quintable.selected[rIndex]"
        :pretty="quintable.configFinal.prettySelect"
        :disabled="row.disableSelect"
        @input="$set(quintable.selected, rIndex, $event)"
        @change="quintable.checkListener($event, rIndex)"
      />
    </td>

    <template v-for="(cell, cIndex) in cells">
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
        v-if="quintable.cellVisible[cIndex] && cell"
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
        'disabled-select': row.disableSelect,
      }"
    >
      <select-checkbox
        v-if="!row.disableSelect || row.showDisabledSelect"
        :value="quintable.selected[rIndex]"
        :pretty="quintable.configFinal.prettySelect"
        :disabled="row.disableSelect"
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
  computed: {
    row() {
      return this.quintable.rowsFinal[this.rIndex];
    },
    cells() {
      if (!this.row) return [];
      return this.row.cells ? this.row.cells : this.row;
    },
  },
};
</script>
