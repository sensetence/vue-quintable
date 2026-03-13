<template>
  <tbody
    @mouseleave="quintable.onMouseleaveTable"
    class="quintable--table-container--table--tbody"
  >
    <template v-for="rIndex in quintable.visibleRowIndexes">
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
        :key="
          'vue-quintable-' +
          quintable.uuid +
          '-row-' +
          rIndex +
          '-' +
          quintable.indexesUpdatedKey
        "
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
          v-if="
            quintable.hasGeneratedRows && !quintable.configFinal.hideRowToggle
          "
        >
          <span v-if="quintable.hiddenColumns[rIndex] > 0">
            <span v-if="!quintable.openRows[rIndex]"
              ><font-awesome-icon
                fixed-width
                :icon="quintable.configFinal.collapsedRowIcon"
              ></font-awesome-icon
            ></span>
            <span v-else
              ><font-awesome-icon
                fixed-width
                :icon="quintable.configFinal.expandedRowIcon"
              ></font-awesome-icon
            ></span>
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
            'disabled-select': quintable.rowsFinal[rIndex].disableSelect,
          }"
        >
          <template
            v-if="
              !quintable.rowsFinal[rIndex].disableSelect ||
              quintable.rowsFinal[rIndex].showDisabledSelect
            "
          >
            <p-check
              v-if="quintable.configFinal.prettySelect"
              name="check"
              class="p-icon"
              :disabled="quintable.rowsFinal[rIndex].disableSelect"
              v-model="quintable.selected[rIndex]"
              @change="quintable.checkListener($event, rIndex)"
            >
              <template slot="extra">
                <span
                  ><font-awesome-icon
                    v-if="quintable.selected[rIndex]"
                    icon="check"
                    class="text-success icon-check"
                /></span>
              </template>
            </p-check>
            <label v-else class="mb-0 mt-0">
              <input
                type="checkbox"
                v-model="quintable.selected[rIndex]"
                :disabled="quintable.rowsFinal[rIndex].disableSelect"
                @change="quintable.checkListener($event, rIndex)"
              />
            </label>
          </template>
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
              'vue-quintable-' +
              quintable.uuid +
              '-cell-' +
              rIndex +
              '-' +
              cIndex
            "
            :id="
              'vue-quintable-' +
              quintable.uuid +
              '-cell-' +
              rIndex +
              '-' +
              cIndex
            "
          >
            <slot :cell="cell" name="cell-complete">
              <slot :cell="cell" name="cell-content">
                <div
                  class="cell-inner"
                  :class="'quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html'"
                  v-if="
                    quintable.configFinal.columns[cIndex].cellFormatter &&
                    quintable.cellFormatters(cIndex, cell).type === 'html'
                  "
                  v-html="quintable.cellFormatters(cIndex, cell).value"
                ></div>
                <div
                  class="cell-inner"
                  :class="'quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value'"
                  v-else-if="
                    quintable.configFinal.columns[cIndex].cellFormatter
                  "
                >
                  {{ quintable.cellFormatters(cIndex, cell).value }}
                </div>
                <div
                  class="cell-inner"
                  :class="'quintable--table-container--table--tbody--row--cell--inner-cell--html'"
                  v-else-if="quintable.valueToString(cell.html)"
                  v-html="cell.html"
                ></div>
                <div
                  class="cell-inner"
                  :class="'quintable--table-container--table--tbody--row--cell--inner-cell--component'"
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
                  :class="'quintable--table-container--table--tbody--row--cell--inner-cell--text'"
                  v-else-if="quintable.valueToString(cell.text)"
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
            'disabled-select': quintable.rowsFinal[rIndex].disableSelect,
          }"
        >
          <template
            v-if="
              !quintable.rowsFinal[rIndex].disableSelect ||
              quintable.rowsFinal[rIndex].showDisabledSelect
            "
          >
            <p-check
              v-if="quintable.configFinal.prettySelect"
              name="check"
              class="p-icon"
              :disabled="quintable.rowsFinal[rIndex].disableSelect"
              v-model="quintable.selected[rIndex]"
              @change="quintable.checkListener($event, rIndex)"
            >
              <template slot="extra">
                <span
                  ><font-awesome-icon
                    v-if="quintable.selected[rIndex]"
                    icon="check"
                    class="text-success icon-check"
                /></span>
              </template>
            </p-check>
            <label v-else class="mb-0 mt-0">
              <input
                type="checkbox"
                v-model="quintable.selected[rIndex]"
                :disabled="quintable.rowsFinal[rIndex].disableSelect"
                @change="quintable.checkListener($event, rIndex)"
              />
            </label>
          </template>
        </td>
      </tr>
      <template
        v-if="
          (quintable.generatedRows[rIndex] || quintable.stickyRows[rIndex]) &&
          quintable.visibleRows[rIndex]
        "
      >
        <tr
          @mouseenter="quintable.onMouseenterRow(rIndex)"
          @click="quintable.onRowClick($event, rIndex)"
          :ref="'generated-row-highlighted-' + rIndex"
          :key="
            'generated-row-' +
            rIndex +
            '-' +
            quintable.rowsUpdatedKey +
            '-' +
            quintable.generatedUpdatedKey
          "
          class="
            generated-row
            quintable--table-container--table--tbody--generated-row
          "
          :class="{
            'parent-row-expanded': quintable.openRows[rIndex],
            'parent-row-collapsed':
              quintable.hiddenColumns[rIndex] > 0 &&
              !quintable.openRows[rIndex],
          }"
          v-if="
            (quintable.generatedUpdatedKey &&
              quintable.openRows[rIndex] &&
              Object.keys(quintable.generatedRows[rIndex]).length) ||
            Object.keys(quintable.stickyRows[rIndex]).length
          "
        >
          <td
            :colspan="quintable.configFinal.number + 1"
            class="ps-0 pe-0 pt-0"
          >
            <div
              :class="{
                [quintable.configFinal.hoverClass]:
                  quintable.hoveredRow === rIndex,
                [quintable.configFinal.activeClass]:
                  quintable.activeRow === rIndex,
              }"
            >
              <table
                class="
                  mb-2
                  generated-table
                  quintable--table-container--table--tbody--generated-row--generated-table
                "
              >
                <tbody>
                  <template
                    v-for="(cell, cIndex) in quintable.generatedRows[rIndex]"
                  >
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
                        cIndex +
                        '-' +
                        quintable.generatedUpdatedKey
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
                      <td
                        v-if="
                          !quintable.configFinal.hideRowToggle &&
                          quintable.generatedRows[rIndex] &&
                          Object.keys(quintable.generatedRows[rIndex]).length
                        "
                        class="toggle-cell invisible"
                      >
                        <span v-if="quintable.hiddenColumns[rIndex] > 0">
                          <span v-if="!quintable.openRows[rIndex]"
                            ><font-awesome-icon
                              fixed-width
                              :icon="quintable.configFinal.collapsedRowIcon"
                            ></font-awesome-icon
                          ></span>
                          <span v-else
                            ><font-awesome-icon
                              fixed-width
                              :icon="quintable.configFinal.expandedRowIcon"
                            ></font-awesome-icon
                          ></span>
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
                          v-if="
                            quintable.configFinal.sorts[cIndex] &&
                            quintable.hoveredRow === rIndex
                          "
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
                              {{
                                quintable.currentSortIndexes[cIndex].order + 1
                              }}
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
                        <slot :cell="cell" name="generated-cell-complete">
                          <slot :cell="cell" name="generated-cell-content">
                            <div
                              class="
                                cell-inner
                                quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html
                              "
                              v-if="
                                quintable.configFinal.columns[cIndex]
                                  .cellFormatter &&
                                quintable.cellFormatters(cIndex, cell).type ===
                                  'html'
                              "
                              v-html="
                                quintable.cellFormatters(cIndex, cell).value
                              "
                            ></div>
                            <div
                              class="
                                cell-inner
                                quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value
                              "
                              v-else-if="
                                quintable.configFinal.columns[cIndex]
                                  .cellFormatter
                              "
                            >
                              {{ quintable.cellFormatters(cIndex, cell).value }}
                            </div>
                            <div
                              class="
                                cell-inner
                                quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html
                              "
                              v-else-if="quintable.valueToString(cell.html)"
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
                              v-else-if="quintable.valueToString(cell.text)"
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
                    <td
                      v-if="
                        !quintable.configFinal.hideRowToggle &&
                        quintable.generatedRows[rIndex] &&
                        Object.keys(quintable.generatedRows[rIndex]).length
                      "
                      class="toggle-cell invisible"
                    >
                      <span v-if="quintable.hiddenColumns[rIndex] > 0">
                        <span v-if="!quintable.openRows[rIndex]"
                          ><font-awesome-icon
                            fixed-width
                            :icon="quintable.configFinal.collapsedRowIcon"
                          ></font-awesome-icon
                        ></span>
                        <span v-else
                          ><font-awesome-icon
                            fixed-width
                            :icon="quintable.configFinal.expandedRowIcon"
                          ></font-awesome-icon
                        ></span>
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
                        v-if="
                          quintable.configFinal.sorts[cIndex] &&
                          quintable.hoveredRow === rIndex
                        "
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
                      <slot :cell="cell" name="sticky-cell-complete">
                        <slot :cell="cell" name="sticky-cell-content">
                          <div
                            class="cell-inner"
                            :class="'quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html'"
                            v-if="
                              quintable.configFinal.columns[cIndex]
                                .cellFormatter &&
                              quintable.cellFormatters(cIndex, cell).type ===
                                'html'
                            "
                            v-html="
                              quintable.cellFormatters(cIndex, cell).value
                            "
                          ></div>
                          <div
                            class="cell-inner"
                            :class="'quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value'"
                            v-else-if="
                              quintable.configFinal.columns[cIndex]
                                .cellFormatter
                            "
                          >
                            {{ quintable.cellFormatters(cIndex, cell).value }}
                          </div>
                          <div
                            class="cell-inner"
                            :class="'quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html'"
                            v-else-if="quintable.valueToString(cell.html)"
                            v-html="cell.html"
                          ></div>
                          <div
                            class="cell-inner"
                            :class="'quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component'"
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
                            :class="'quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text'"
                            v-else-if="quintable.valueToString(cell.text)"
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
    </template>
  </tbody>
</template>

<script>
export default {
  name: "TableBody",
  inject: ["quintable"],
};
</script>
