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

                  <span
                    class="
                      sorting-icon
                      ms-2
                      cursor-pointer
                      quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon
                    "
                    v-if="!!quintable.configFinal.sorts[cIndex]"
                    v-show="quintable.hoveredRow === rIndex"
                  >
                    <font-awesome-icon
                      v-if="!quintable.currentSortIndexes[cIndex]"
                      icon="sort"
                      class="text-primary"
                    />
                    <font-awesome-icon
                      v-if="
                        quintable.currentSortIndexes[cIndex] &&
                        quintable.currentSortIndexes[cIndex].asc
                      "
                      icon="sort-amount-down-alt"
                      class="text-primary"
                    />
                    <font-awesome-icon
                      v-if="
                        quintable.currentSortIndexes[cIndex] &&
                        !quintable.currentSortIndexes[cIndex].asc
                      "
                      icon="sort-amount-down"
                      class="text-primary"
                    />
                    <span
                      v-if="quintable.currentSortIndexes[cIndex]"
                      @click.stop.prevent="quintable.removeSort(cIndex)"
                      class="ms-1 text-muted"
                    >
                      <span
                        class="badge bg-info text-white"
                        v-if="quintable.numberOfSorts > 1"
                      >
                        {{ quintable.currentSortIndexes[cIndex].order + 1 }}
                      </span>
                      <small v-else>
                        <font-awesome-icon icon="times" />
                      </small>
                    </span>
                  </span>
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
                  <slot name="generated-cell-complete" :cell="cell">
                    <slot name="generated-cell-content" :cell="cell">
                      <div
                        class="
                          cell-inner
                          quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html
                        "
                        v-if="
                          formattedGenerated[cIndex] &&
                          formattedGenerated[cIndex].type === 'html'
                        "
                        v-html="formattedGenerated[cIndex].value"
                      ></div>
                      <div
                        class="
                          cell-inner
                          quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value
                        "
                        v-else-if="formattedGenerated[cIndex]"
                      >
                        {{ formattedGenerated[cIndex].value }}
                      </div>
                      <div
                        class="
                          cell-inner
                          quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html
                        "
                        v-else-if="
                          cell.html != null && String(cell.html) !== ''
                        "
                        v-html="cell.html"
                      ></div>
                      <div
                        class="
                          cell-inner
                          quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component
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
                          quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text
                        "
                        v-else-if="
                          cell.text != null && String(cell.text) !== ''
                        "
                      >
                        {{ cell.text }}
                      </div>
                    </slot>
                  </slot>
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

                <span
                  class="
                    sorting-icon
                    ms-2
                    cursor-pointer
                    quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon
                  "
                  v-if="!!quintable.configFinal.sorts[cIndex]"
                  v-show="quintable.hoveredRow === rIndex"
                >
                  <font-awesome-icon
                    v-if="!quintable.currentSortIndexes[cIndex]"
                    icon="sort"
                    class="text-primary"
                  />
                  <font-awesome-icon
                    v-if="
                      quintable.currentSortIndexes[cIndex] &&
                      quintable.currentSortIndexes[cIndex].asc
                    "
                    icon="sort-amount-down-alt"
                    class="text-primary"
                  />
                  <font-awesome-icon
                    v-if="
                      quintable.currentSortIndexes[cIndex] &&
                      !quintable.currentSortIndexes[cIndex].asc
                    "
                    icon="sort-amount-down"
                    class="text-primary"
                  />
                  <span
                    v-if="quintable.currentSortIndexes[cIndex]"
                    @click.stop.prevent="quintable.removeSort(cIndex)"
                    class="ms-1 text-muted"
                  >
                    <span
                      class="badge bg-info text-white"
                      v-if="quintable.numberOfSorts > 1"
                    >
                      {{ quintable.currentSortIndexes[cIndex].order + 1 }}
                    </span>
                    <small v-else>
                      <font-awesome-icon icon="times" />
                    </small>
                  </span>
                </span>
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
                <slot name="sticky-cell-complete" :cell="cell">
                  <slot name="sticky-cell-content" :cell="cell">
                    <div
                      class="
                        cell-inner
                        quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html
                      "
                      v-if="
                        formattedSticky[cIndex] &&
                        formattedSticky[cIndex].type === 'html'
                      "
                      v-html="formattedSticky[cIndex].value"
                    ></div>
                    <div
                      class="
                        cell-inner
                        quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value
                      "
                      v-else-if="formattedSticky[cIndex]"
                    >
                      {{ formattedSticky[cIndex].value }}
                    </div>
                    <div
                      class="
                        cell-inner
                        quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html
                      "
                      v-else-if="cell.html != null && String(cell.html) !== ''"
                      v-html="cell.html"
                    ></div>
                    <div
                      class="
                        cell-inner
                        quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component
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
                        quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text
                      "
                      v-else-if="cell.text != null && String(cell.text) !== ''"
                    >
                      {{ cell.text }}
                    </div>
                  </slot>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "ExpandedRow",
  inject: ["quintable"],
  components: {},
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
    formattedGenerated() {
      const rows = this.quintable.generatedRows[this.rIndex];
      if (!rows) return {};
      const result = {};
      const cols = this.quintable.configFinal.columns;
      for (let k in rows) {
        if (
          Object.prototype.hasOwnProperty.call(rows, k) &&
          cols[k] &&
          cols[k].cellFormatter
        ) {
          result[k] = this.quintable.cellFormatters(k, rows[k]);
        }
      }
      return result;
    },
    formattedSticky() {
      const rows = this.quintable.stickyRows[this.rIndex];
      if (!rows) return {};
      const result = {};
      const cols = this.quintable.configFinal.columns;
      for (let k in rows) {
        if (
          Object.prototype.hasOwnProperty.call(rows, k) &&
          cols[k] &&
          cols[k].cellFormatter
        ) {
          result[k] = this.quintable.cellFormatters(k, rows[k]);
        }
      }
      return result;
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
