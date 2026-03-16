<template>
  <tr
    @mouseenter="quintable.onMouseenterRow(rIndex)"
    @click="quintable.onRowClick($event, rIndex)"
    :ref="'generated-row-highlighted-' + rIndex"
    class="
      generated-row
      quintable--table-container--table--tbody--generated-row
    "
    :class="{
      'parent-row-expanded': quintable.openRows[rIndex],
      'parent-row-collapsed':
        quintable.hiddenColumns[rIndex] > 0 && !quintable.openRows[rIndex],
    }"
    v-if="shouldRender"
  >
    <td :colspan="quintable.configFinal.number + 1" class="ps-0 pe-0 pt-0">
      <div :class="innerClasses">
        <table
          class="
            mb-2
            generated-table
            quintable--table-container--table--tbody--generated-row--generated-table
          "
        >
          <tbody>
            <template v-for="(cell, cIndex) in quintable.generatedRows[rIndex]">
              <tr
                class="
                  generated-row-cell
                  quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell
                "
                :key="
                  'vue-quintable-' +
                  quintable.uuid +
                  '-generated-row-cell-' +
                  rIndex +
                  '-' +
                  cIndex
                "
                :id="
                  'vue-quintable-' +
                  quintable.uuid +
                  '-generated-row-cell-' +
                  rIndex +
                  '-' +
                  cIndex
                "
                v-if="quintable.openRows[rIndex]"
              >
                <td v-if="showToggleCell" class="toggle-cell invisible">
                  <toggle-icon
                    :has-hidden="quintable.hiddenColumns[rIndex] > 0"
                    :expanded="!!quintable.openRows[rIndex]"
                    :collapsed-icon="quintable.configFinal.collapsedRowIcon"
                    :expanded-icon="quintable.configFinal.expandedRowIcon"
                  />
                </td>
                <td
                  class="
                    generated-cell-element generated-cell-headline
                    quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline
                  "
                  @click.stop="quintable.setSortColumn(cIndex)"
                  :class="quintable.configFinal.columnClasses[cIndex]"
                  v-if="
                    quintable.showHeadlines[cIndex] ||
                    quintable.configFinal.sorts[cIndex]
                  "
                >
                  <strong
                    v-html="quintable.configFinal.headlines[cIndex]"
                    v-if="quintable.showHeadlines[cIndex]"
                  >
                  </strong>
                  <span v-else class="headline"><wbr /></span>

                  <sort-indicator
                    v-show="quintable.hoveredRow === rIndex"
                    :sort-enabled="!!quintable.configFinal.sorts[cIndex]"
                    :sort-info="quintable.currentSortIndexes[cIndex] || null"
                    :number-of-sorts="quintable.numberOfSorts"
                    :column-index="cIndex"
                    wrapper-class="sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
                    @remove-sort="quintable.removeSort($event)"
                  />
                </td>
                <td
                  :colspan="
                    !quintable.showHeadlines[cIndex] &&
                    !quintable.configFinal.sorts[cIndex]
                      ? 2
                      : 1
                  "
                  :class="
                    quintable.configFinal.columnClasses[cIndex] +
                    ' ' +
                    quintable.cellClassesParsed[rIndex][cIndex]
                  "
                  class="
                    generated-cell-element
                    generated-cell-element-content
                    generated-cell-content
                    quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content
                  "
                  @click="quintable.onCellClick($event, cell)"
                  v-tooltip="{
                    placement: 'top',
                    content: cell.tooltip,
                    trigger: cell.tooltip ? 'hover' : 'manual',
                  }"
                >
                  <cell-content
                    :cell="cell"
                    :c-index="cIndex"
                    class-prefix="quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner"
                  >
                    <template v-slot:default="{ cell: slotCell }">
                      <slot name="generated-cell-complete" :cell="slotCell">
                        <slot name="generated-cell-content" :cell="slotCell" />
                      </slot>
                    </template>
                  </cell-content>
                </td>
              </tr>
            </template>
            <tr
              v-for="(cell, cIndex) in quintable.stickyRows[rIndex]"
              class="
                sticky-row-cell
                quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell
              "
              :key="
                'vue-quintable-' +
                quintable.uuid +
                '-sticky-row-cell-' +
                rIndex +
                '-' +
                cIndex
              "
              :id="
                'vue-quintable-' +
                quintable.uuid +
                '-sticky-row-cell-' +
                rIndex +
                '-' +
                cIndex
              "
            >
              <td v-if="showToggleCell" class="toggle-cell invisible">
                <toggle-icon
                  :has-hidden="quintable.hiddenColumns[rIndex] > 0"
                  :expanded="!!quintable.openRows[rIndex]"
                  :collapsed-icon="quintable.configFinal.collapsedRowIcon"
                  :expanded-icon="quintable.configFinal.expandedRowIcon"
                />
              </td>
              <td
                class="
                  generated-cell-element
                  sticky-cell-headline
                  quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline
                "
                @click.stop="quintable.setSortColumn(cIndex)"
                :class="quintable.configFinal.columnClasses[cIndex]"
                v-if="
                  quintable.showHeadlines[cIndex] ||
                  quintable.configFinal.sorts[cIndex]
                "
              >
                <strong
                  v-html="quintable.configFinal.headlines[cIndex]"
                  v-if="quintable.showHeadlines[cIndex]"
                >
                </strong>
                <span v-else class="headline"><wbr /></span>

                <sort-indicator
                  v-show="quintable.hoveredRow === rIndex"
                  :sort-enabled="!!quintable.configFinal.sorts[cIndex]"
                  :sort-info="quintable.currentSortIndexes[cIndex] || null"
                  :number-of-sorts="quintable.numberOfSorts"
                  :column-index="cIndex"
                  wrapper-class="sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
                  @remove-sort="quintable.removeSort($event)"
                />
              </td>

              <td
                :colspan="
                  !quintable.showHeadlines[cIndex] &&
                  !quintable.configFinal.sorts[cIndex]
                    ? 2
                    : 1
                "
                :class="
                  quintable.configFinal.columnClasses[cIndex] +
                  ' ' +
                  quintable.cellClassesParsed[rIndex][cIndex]
                "
                class="
                  generated-cell-element generated-cell-element-content
                  sticky-cell-content
                  quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content
                "
                @click="quintable.onCellClick($event, cell)"
                v-tooltip="{
                  placement: 'top',
                  content: cell.tooltip,
                  trigger: cell.tooltip ? 'hover' : 'manual',
                }"
              >
                <cell-content
                  :cell="cell"
                  :c-index="cIndex"
                  class-prefix="quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner"
                >
                  <template v-slot:default="{ cell: slotCell }">
                    <slot name="sticky-cell-complete" :cell="slotCell">
                      <slot name="sticky-cell-content" :cell="slotCell" />
                    </slot>
                  </template>
                </cell-content>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</template>

<script>
import CellContent from "./CellContent.vue";
import SortIndicator from "./SortIndicator.vue";
import ToggleIcon from "./ToggleIcon.vue";

export default {
  name: "ExpandedRow",
  inject: ["quintable"],
  components: { CellContent, SortIndicator, ToggleIcon },
  props: {
    rIndex: { type: [Number, String], required: true },
  },
  computed: {
    shouldRender() {
      return (
        (this.quintable.generatedUpdatedKey &&
          this.quintable.openRows[this.rIndex] &&
          this._hasKeys(this.quintable.generatedRows[this.rIndex])) ||
        this._hasKeys(this.quintable.stickyRows[this.rIndex])
      );
    },
    showToggleCell() {
      return (
        !this.quintable.configFinal.hideRowToggle &&
        this.quintable.generatedRows[this.rIndex] &&
        this._hasKeys(this.quintable.generatedRows[this.rIndex])
      );
    },
    innerClasses() {
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
  methods: {
    _hasKeys(obj) {
      if (!obj) return false;
      for (let k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) return true;
      }
      return false;
    },
  },
};
</script>
