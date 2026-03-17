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
    :class="[quintable.rowClasses[rIndex], dynamicClasses]"
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
      <span v-if="quintable.hiddenColumns[rIndex] > 0">
        <span v-if="!quintable.openRows[rIndex]">
          <font-awesome-icon
            fixed-width
            :icon="quintable.configFinal.collapsedRowIcon"
          ></font-awesome-icon>
        </span>
        <span v-else>
          <font-awesome-icon
            fixed-width
            :icon="quintable.configFinal.expandedRowIcon"
          ></font-awesome-icon>
        </span>
      </span>
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
        :class="cellClasses[cIndex] + ' ' + columnClasses[cIndex]"
        v-if="cellVisibility[cIndex] && cell"
        @click="quintable.onCellClick($event, cell)"
        @auxclick="quintable.onCellAuxClick($event, cell)"
        @mousedown="quintable.onCellMousedown($event)"
        :key="cellKeyPrefix + cIndex"
        :id="cellKeyPrefix + cIndex"
      >
        <slot name="cell-complete" :cell="cell">
          <slot name="cell-content" :cell="cell">
            <div
              class="
                cell-inner
                quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html
              "
              v-if="
                formattedCells[cIndex] && formattedCells[cIndex].type === 'html'
              "
              v-html="formattedCells[cIndex].value"
            ></div>
            <div
              class="
                cell-inner
                quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value
              "
              v-else-if="formattedCells[cIndex]"
            >
              {{ formattedCells[cIndex].value }}
            </div>
            <div
              class="
                cell-inner
                quintable--table-container--table--tbody--row--cell--inner-cell--html
              "
              v-else-if="cell.html != null && String(cell.html) !== ''"
              v-html="cell.html"
            ></div>
            <div
              class="
                cell-inner
                quintable--table-container--table--tbody--row--cell--inner-cell--component
              "
              v-else-if="cell.component"
            >
              <component
                :is="cell.component.name"
                v-bind="cell.component.props"
                @action="quintable.handleComponentEvent"
              ></component>
            </div>
            <div
              class="
                cell-inner
                quintable--table-container--table--tbody--row--cell--inner-cell--text
              "
              v-else-if="cell.text != null && String(cell.text) !== ''"
            >
              {{ cell.text }}
            </div>
          </slot>
        </slot>
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
import SelectCheckbox from "./SelectCheckbox.vue";

export default {
  name: "TableRow",
  inject: ["quintable"],
  components: { SelectCheckbox },
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
    cellClasses() {
      return this.quintable.cellClassesParsed[this.rIndex] || [];
    },
    columnClasses() {
      return this.quintable.configFinal.columnClasses;
    },
    cellVisibility() {
      return this.quintable.cellVisible;
    },
    cellKeyPrefix() {
      return (
        "vue-quintable-" + this.quintable.uuid + "-cell-" + this.rIndex + "-"
      );
    },
    formattedCells() {
      const result = {};
      const cols = this.quintable.configFinal.columns;
      const cells = this.cells;
      for (let i = 0; i < cells.length; i++) {
        if (cols[i] && cols[i].cellFormatter) {
          result[i] = this.quintable.cellFormatters(i, cells[i]);
        }
      }
      return result;
    },
    dynamicClasses() {
      const cls = [];
      if (this.quintable.hoveredRow === this.rIndex) {
        cls.push(this.quintable.configFinal.hoverClass);
      }
      if (this.quintable.activeRow === this.rIndex) {
        cls.push(this.quintable.configFinal.activeClass);
      }
      return cls;
    },
  },
};
</script>
