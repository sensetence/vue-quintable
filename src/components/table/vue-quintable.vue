<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="table-wrapper quintable"
    :style="
      typeof currentRowsPerPage === 'number'
        ? { '--quintable-page-size': currentRowsPerPage }
        : null
    "
  >
    <div class="header slot slot-header quintable--header">
      <slot name="header"></slot>
    </div>

    <div
      v-if="configFinal.columnPicker"
      class="quintable--toolbar d-flex justify-content-end mb-2"
    >
      <details class="quintable--column-picker" @toggle="_onPickerToggle">
        <summary class="btn btn-sm btn-outline-secondary">
          {{ configFinal.columnPickerPlaceholder }}
        </summary>
        <div class="dropdown-menu show quintable--column-picker--menu">
          <label
            v-for="column in _pickerColumns"
            :key="column.index"
            class="dropdown-item d-flex align-items-center gap-2 mb-0"
          >
            <input
              type="checkbox"
              class="form-check-input mt-0"
              :checked="column.visible"
              :disabled="
                column.visible &&
                _pickerColumns.filter((c) => c.visible).length <= 1
              "
              @change="toggleColumn(column.index)"
            />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="column.headline"></span>
          </label>
        </div>
      </details>
    </div>

    <div
      v-if="configFinal.search"
      class="mb-3 quintable--search-container"
      :class="configFinal.searchContainerClass"
    >
      <slot name="before-search"></slot>
      <slot
        name="search"
        :value="query"
        :loading="loading"
        :set-search-query="setSearchQuery"
        :placeholder="configFinal.searchPlaceholder"
        :search-class="configFinal.searchClass"
      >
        <div
          class="quintable--search-container--input-container"
          :class="configFinal.searchClass"
        >
          <input
            v-model="query"
            type="search"
            :placeholder="configFinal.searchPlaceholder"
            :aria-label="
              configFinal.accessible ? configFinal.searchPlaceholder : null
            "
            class="form-control"
          />
        </div>
      </slot>
      <slot name="after-search"></slot>
    </div>
    <div class="slot slot-after-search quintable--after-search-container">
      <slot name="after-search-container"></slot>
    </div>
    <div
      ref="height-wrapper"
      class="clearfix quintable--table-container"
      :class="{
        'quintable-fit-scroll': fitScroll,
        'quintable-scroll': !!_scrollHeight,
        'quintable-scroll-x': _pin.any || !!_layoutWidths,
        'quintable-virtual': configFinal.virtualScroll,
      }"
      :style="_scrollHeight ? { maxHeight: _scrollHeight } : null"
    >
      <table
        v-if="!ajaxLoading"
        ref="table"
        class="vue-quintable table quintable--table-container--table"
        :class="[
          tableClasses,
          configFinal.stickyHeader ? 'quintable--sticky-header' : '',
          configFinal.resizableColumns ? 'quintable--resizable' : '',
          _layoutWidths ? 'quintable--fixed-layout' : '',
        ]"
        :style="_layoutWidths && _layoutWidths.table"
      >
        <thead v-if="configFinal.headlines.length">
          <tr
            class="vue-quintable-header-row quintable--table-container--table--header-row"
            :class="{ 'sort-icons-visible': configFinal.alwaysShowSortIcons }"
          >
            <th
              v-if="hasGeneratedRows && !configFinal.hideRowToggle"
              class="placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th"
              :class="_pin.toggle && _pin.toggle.cls"
              :style="_extraThStyle('toggle')"
            >
              <wbr />
            </th>
            <th
              v-if="configFinal.select && configFinal.selectPosition === 'pre'"
              class="select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre"
              :class="_pin.selectPre && _pin.selectPre.cls"
              :style="_extraThStyle('selectPre')"
            >
              <template v-if="configFinal.selectAll && !noRows">
                <slot
                  v-if="$slots['select-all-checkbox']"
                  name="select-all-checkbox"
                  :checked="!!allSelectedProperty"
                  :indeterminate="someSelected && !allSelectedProperty"
                  :toggle="_toggleSelectAll"
                ></slot>
                <quintable-p-check
                  v-else-if="configFinal.prettySelect"
                  v-model="allSelectedProperty"
                  :aria-label="
                    configFinal.accessible ? configFinal.selectAllLabel : null
                  "
                  name="check"
                  class="p-icon p-smooth"
                  @change="checkAll()"
                >
                  <template #extra>
                    <span
                      ><quintable-font-awesome-icon
                        v-if="allSelectedProperty"
                        icon="check"
                        class="text-success icon-check"
                    /></span>
                    <span class="p-1"
                      ><quintable-font-awesome-icon
                        v-if="someSelected && !allSelectedProperty"
                        icon="square"
                        class="text-success icon-check"
                    /></span>
                  </template>
                </quintable-p-check>
                <label v-else class="mb-0 mt-0">
                  <input
                    v-model="allSelectedProperty"
                    type="checkbox"
                    :aria-label="
                      configFinal.accessible ? configFinal.selectAllLabel : null
                    "
                    @change="checkAll()"
                  />
                </label>
              </template>
            </th>
            <th
              v-if="$slots['row-prepend']"
              class="row-prepend-th quintable--table-container--table--header-row--prepend-th"
              :class="_pin.prepend && _pin.prepend.cls"
              :style="_extraThStyle('prepend')"
            >
              <slot name="header-prepend"></slot>
            </th>
            <template v-for="(headline, hIndex) in configFinal.headlines">
              <th
                v-if="cellVisible[hIndex]"
                :key="'headline-' + hIndex"
                :class="[
                  headerClass[hIndex],
                  _pin.cols[hIndex] && _pin.cols[hIndex].cls,
                ]"
                :style="_thStyles[hIndex]"
                :data-column="configFinal.resizableColumns ? hIndex : null"
                :title="configFinal.columns[hIndex].title"
                v-bind="configFinal.accessible ? _headerA11y[hIndex] : null"
                @click.stop="setSortColumn(hIndex)"
                @keydown="_onHeaderKeydown($event, hIndex)"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span
                  v-if="showHeadlines[hIndex] && $slots.headline"
                  class="headline quintable--table-container--table--header-row--th--headline"
                  ><slot
                    name="headline"
                    :column="configFinal.columns[hIndex]"
                    :index="hIndex"
                    :headline="headline"
                  ></slot
                ></span>
                <span
                  v-else-if="showHeadlines[hIndex]"
                  class="headline quintable--table-container--table--header-row--th--headline"
                  v-html="headline"
                ></span>
                <span
                  v-else
                  class="headline quintable--table-container--table--header-row--th--headline"
                  ><wbr
                /></span>
                <span
                  v-if="configFinal.sorts[hIndex]"
                  class="sorting-icon quintable--table-container--table--header-row--th--sorting-icon"
                  :class="{ sorted: currentSortIndexes[hIndex] }"
                >
                  <slot
                    v-if="$slots['sort-icon']"
                    name="sort-icon"
                    :column="configFinal.columns[hIndex]"
                    :index="hIndex"
                    :direction="_sortDirection(hIndex)"
                  ></slot>
                  <template v-else-if="!currentSortIndexes[hIndex]">
                    <quintable-font-awesome-icon icon="up-long" width-auto />
                    <quintable-font-awesome-icon icon="down-long" width-auto />
                  </template>
                  <quintable-font-awesome-icon
                    v-else
                    :icon="
                      currentSortIndexes[hIndex].asc
                        ? 'arrow-up-short-wide'
                        : 'arrow-down-wide-short'
                    "
                  />
                  <span
                    v-if="currentSortIndexes[hIndex]"
                    class="ms-1 text-muted"
                    @click.stop.prevent="removeSort(hIndex)"
                  >
                    <span
                      v-if="numberOfSorts > 1"
                      class="badge bg-info text-white"
                    >
                      {{ currentSortIndexes[hIndex].order + 1 }}
                    </span>
                    <small v-else>
                      <quintable-font-awesome-icon icon="xmark" />
                    </small>
                  </span>
                </span>
                <span
                  v-if="
                    configFinal.resizableColumns &&
                    configFinal.columns[hIndex].resizable !== false
                  "
                  class="quintable--resize-handle"
                  role="separator"
                  aria-orientation="vertical"
                  tabindex="0"
                  :aria-label="configFinal.resizeColumnLabel"
                  :aria-valuenow="columnWidths[hIndex] || null"
                  @pointerdown.stop.prevent="_startResize($event, hIndex)"
                  @click.stop
                  @dblclick.stop="resetColumnWidths()"
                  @keydown.stop="_resizeKeydown($event, hIndex)"
                ></span>
              </th>
            </template>
            <th
              v-if="$slots['row-append']"
              class="row-append-th quintable--table-container--table--header-row--append-th"
              :class="_pin.append && _pin.append.cls"
              :style="_extraThStyle('append')"
            >
              <slot name="header-append"></slot>
            </th>
            <th
              v-if="configFinal.select && configFinal.selectPosition === 'post'"
              class="select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post"
              :class="_pin.selectPost && _pin.selectPost.cls"
              :style="_extraThStyle('selectPost')"
            >
              <template v-if="configFinal.selectAll && !noRows">
                <slot
                  v-if="$slots['select-all-checkbox']"
                  name="select-all-checkbox"
                  :checked="!!allSelectedProperty"
                  :indeterminate="someSelected && !allSelectedProperty"
                  :toggle="_toggleSelectAll"
                ></slot>
                <quintable-p-check
                  v-else-if="configFinal.prettySelect"
                  v-model="allSelectedProperty"
                  :aria-label="
                    configFinal.accessible ? configFinal.selectAllLabel : null
                  "
                  name="check"
                  class="p-icon p-smooth"
                  @change="checkAll()"
                >
                  <template #extra>
                    <span
                      ><quintable-font-awesome-icon
                        v-if="allSelectedProperty"
                        icon="check"
                        class="text-success icon-check"
                    /></span>
                    <span
                      ><quintable-font-awesome-icon
                        v-if="someSelected && !allSelectedProperty"
                        icon="square"
                        class="text-success icon-check"
                    /></span>
                  </template>
                </quintable-p-check>
                <label v-else class="mb-0 mt-0">
                  <input
                    v-model="allSelectedProperty"
                    type="checkbox"
                    :aria-label="
                      configFinal.accessible ? configFinal.selectAllLabel : null
                    "
                    @change="checkAll()"
                  />
                </label>
              </template>
            </th>
          </tr>
          <tr
            v-if="configFinal.columnFilters"
            class="quintable--filter-row quintable--table-container--table--filter-row"
          >
            <th
              v-if="hasGeneratedRows && !configFinal.hideRowToggle"
              :class="_pin.toggle && _pin.toggle.cls"
            ></th>
            <th
              v-if="configFinal.select && configFinal.selectPosition === 'pre'"
              :class="_pin.selectPre && _pin.selectPre.cls"
            ></th>
            <th
              v-if="$slots['row-prepend']"
              :class="_pin.prepend && _pin.prepend.cls"
            ></th>
            <template v-for="(headline, hIndex) in configFinal.headlines">
              <th
                v-if="cellVisible[hIndex]"
                :key="'filter-' + hIndex"
                :class="[
                  configFinal.columnClasses[hIndex],
                  _pin.cols[hIndex] && _pin.cols[hIndex].cls,
                ]"
              >
                <input
                  v-if="configFinal.filterTypes[hIndex] === 'text'"
                  type="search"
                  class="form-control form-control-sm"
                  :placeholder="configFinal.columnFilterPlaceholder"
                  :aria-label="_filterLabel(hIndex)"
                  :value="columnFilterValues[hIndex] || ''"
                  @input="_onFilterInput(hIndex, $event)"
                />
                <select
                  v-else-if="configFinal.filterTypes[hIndex] === 'select'"
                  class="form-select form-select-sm"
                  :aria-label="_filterLabel(hIndex)"
                  :value="columnFilterValues[hIndex] || ''"
                  @change="_onFilterInput(hIndex, $event)"
                >
                  <option value="">
                    {{ configFinal.columnFilterAllLabel }}
                  </option>
                  <option
                    v-for="option in _columnFilterOptions[hIndex]"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <div
                  v-else-if="configFinal.filterTypes[hIndex] === 'range'"
                  class="d-flex gap-1"
                >
                  <input
                    v-for="bound in ['min', 'max']"
                    :key="bound"
                    type="number"
                    class="form-control form-control-sm"
                    :placeholder="
                      bound === 'min'
                        ? configFinal.columnFilterMinLabel
                        : configFinal.columnFilterMaxLabel
                    "
                    :aria-label="
                      _filterLabel(hIndex) +
                      ' ' +
                      (bound === 'min'
                        ? configFinal.columnFilterMinLabel
                        : configFinal.columnFilterMaxLabel)
                    "
                    :value="(columnFilterValues[hIndex] || {})[bound] ?? ''"
                    @input="_onFilterInput(hIndex, $event, bound)"
                  />
                </div>
              </th>
            </template>
            <th
              v-if="$slots['row-append']"
              :class="_pin.append && _pin.append.cls"
            ></th>
            <th
              v-if="configFinal.select && configFinal.selectPosition === 'post'"
              :class="_pin.selectPost && _pin.selectPost.cls"
            ></th>
          </tr>
        </thead>
        <tbody
          class="quintable--table-container--table--tbody"
          @mouseleave="onMouseleaveTable"
          @mouseover="onCellMouseover"
        >
          <tr
            v-if="configFinal.virtualScroll"
            class="quintable--virtual-spacer"
            aria-hidden="true"
          >
            <td
              :colspan="
                columnCount +
                ($slots['row-prepend'] ? 1 : 0) +
                ($slots['row-append'] ? 1 : 0)
              "
              class="quintable--virtual-spacer-cell"
              :style="{ height: virtualRange.top + 'px' }"
            ></td>
          </tr>
          <template
            v-for="(rIndex, position) in _renderedRowIndexes"
            :key="
              configFinal.reuseRows
                ? position
                : `vue-quintable-${uuid}-row-${rIndex}-${essentialsKey}`
            "
          >
            <tr
              :id="'vue-quintable-' + uuid + '-row-' + rIndex"
              :ref="'row-highlighted-' + rIndex"
              v-tooltip="{
                placement: 'top',
                content: rowsFinal[rIndex].tooltip,
                trigger: rowsFinal[rIndex].tooltip ? 'hover' : 'manual',
                offset: 5,
              }"
              :class="rowClasses[rIndex]"
              class="vue-quintable-row quintable--table-container--table--tbody--row"
              :style="hiddenColumns[rIndex] > 0 ? 'cursor:pointer;' : ''"
              @click="onRowClick($event, rIndex)"
              @auxclick="onRowAuxClick($event, rIndex)"
              @mousedown="onRowMousedown($event)"
              @mouseenter="_hoverRow(rIndex, $event)"
            >
              <td
                v-if="hasGeneratedRows && !configFinal.hideRowToggle"
                class="toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td"
                :class="_pin.toggle && _pin.toggle.cls"
              >
                <!-- accessible: a button; else the plain span (no dynamic component in every row) -->
                <button
                  v-if="configFinal.accessible && hiddenColumns[rIndex] > 0"
                  v-bind="_toggleA11y(rIndex)"
                >
                  <slot
                    v-if="$slots['toggle-icon']"
                    name="toggle-icon"
                    :row="rowsFinal[rIndex]"
                    :index="rIndex"
                    :expanded="!!openRows[rIndex]"
                  ></slot>
                  <span v-else-if="!openRows[rIndex]"
                    ><quintable-font-awesome-icon
                      fixed-width
                      :icon="configFinal.collapsedRowIcon"
                    ></quintable-font-awesome-icon
                  ></span>
                  <span v-else
                    ><quintable-font-awesome-icon
                      fixed-width
                      :icon="configFinal.expandedRowIcon"
                    ></quintable-font-awesome-icon
                  ></span>
                </button>
                <span v-else-if="hiddenColumns[rIndex] > 0">
                  <slot
                    v-if="$slots['toggle-icon']"
                    name="toggle-icon"
                    :row="rowsFinal[rIndex]"
                    :index="rIndex"
                    :expanded="!!openRows[rIndex]"
                  ></slot>
                  <span v-else-if="!openRows[rIndex]"
                    ><quintable-font-awesome-icon
                      fixed-width
                      :icon="configFinal.collapsedRowIcon"
                    ></quintable-font-awesome-icon
                  ></span>
                  <span v-else
                    ><quintable-font-awesome-icon
                      fixed-width
                      :icon="configFinal.expandedRowIcon"
                    ></quintable-font-awesome-icon
                  ></span>
                </span>
              </td>
              <td
                v-if="
                  configFinal.select && configFinal.selectPosition === 'pre'
                "
                class="select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre"
                :class="[
                  { 'disabled-select': rowsFinal[rIndex].disableSelect },
                  _pin.selectPre && _pin.selectPre.cls,
                ]"
              >
                <template
                  v-if="
                    !rowsFinal[rIndex].disableSelect ||
                    rowsFinal[rIndex].showDisabledSelect
                  "
                >
                  <slot
                    v-if="$slots['select-checkbox']"
                    name="select-checkbox"
                    :row="rowsFinal[rIndex]"
                    :index="rIndex"
                    :checked="!!selected[rIndex]"
                    :disabled="!!rowsFinal[rIndex].disableSelect"
                    :toggle="(value) => _toggleSelect(rIndex, value)"
                  ></slot>
                  <quintable-p-check
                    v-else-if="configFinal.prettySelect"
                    v-model="selected[rIndex]"
                    :aria-label="
                      configFinal.accessible
                        ? configFinal.selectRowLabel +
                          ' ' +
                          (_visibleRowIndexMap[rIndex] + 1)
                        : null
                    "
                    name="check"
                    class="p-icon"
                    :disabled="rowsFinal[rIndex].disableSelect"
                    @change="checkListener($event, rIndex)"
                  >
                    <template #extra>
                      <span
                        ><quintable-font-awesome-icon
                          v-if="selected[rIndex]"
                          icon="check"
                          class="text-success icon-check"
                      /></span>
                    </template>
                  </quintable-p-check>
                  <label v-else class="mb-0 mt-0">
                    <input
                      v-model="selected[rIndex]"
                      type="checkbox"
                      :aria-label="
                        configFinal.accessible
                          ? configFinal.selectRowLabel +
                            ' ' +
                            (_visibleRowIndexMap[rIndex] + 1)
                          : null
                      "
                      :disabled="rowsFinal[rIndex].disableSelect"
                      @change="checkListener($event, rIndex)"
                    />
                  </label>
                </template>
              </td>

              <td
                v-if="$slots['row-prepend']"
                class="row-prepend-td quintable--table-container--table--tbody--row--prepend-td"
                :class="_pin.prepend && _pin.prepend.cls"
              >
                <slot
                  name="row-prepend"
                  :row="rowsFinal[rIndex]"
                  :index="rIndex"
                ></slot>
              </td>
              <template v-for="(rc, cIndex) in _renderRows[rIndex]">
                <td
                  v-if="rc.vis"
                  :id="rc.key"
                  :key="configFinal.reuseRows ? cIndex : rc.key"
                  v-tooltip="rc.tooltip"
                  class="vue-quintable-cell quintable--table-container--table--tbody--row--cell"
                  :class="rc.cls"
                  @click="onCellClick($event, rc.cell)"
                  @auxclick="onCellAuxClick($event, rc.cell)"
                  @mousedown="onCellMousedown($event)"
                >
                  <slot
                    v-if="$slots['cell-complete'] || $slots['cell-content']"
                    :cell="rc.cell"
                    name="cell-complete"
                  >
                    <slot :cell="rc.cell" name="cell-content">
                      <div
                        v-if="rc.kind === 'component'"
                        class="cell-inner"
                        :class="rc.innerClass"
                      >
                        <component
                          :is="rc.value.name"
                          v-bind="rc.value.props"
                          @action="handleComponentEvent"
                        ></component>
                      </div>
                      <div
                        v-else-if="rc.kind === 'html'"
                        class="cell-inner"
                        :class="rc.innerClass"
                        v-html="rc.value"
                      ></div>
                      <div
                        v-else-if="rc.kind === 'text' && rc.marks"
                        class="cell-inner"
                        :class="rc.innerClass"
                      >
                        <template v-for="(piece, p) in rc.marks" :key="p"
                          ><mark
                            v-if="piece.mark"
                            class="quintable--search-mark"
                            >{{ piece.text }}</mark
                          ><template v-else>{{
                            piece.text
                          }}</template></template
                        >
                      </div>
                      <div
                        v-else-if="rc.kind === 'text'"
                        class="cell-inner"
                        :class="rc.innerClass"
                      >
                        {{ rc.value }}
                      </div>
                    </slot>
                  </slot>
                  <div
                    v-else-if="rc.kind === 'component'"
                    class="cell-inner"
                    :class="rc.innerClass"
                  >
                    <component
                      :is="rc.value.name"
                      v-bind="rc.value.props"
                      @action="handleComponentEvent"
                    ></component>
                  </div>
                  <div
                    v-else-if="rc.kind === 'html'"
                    class="cell-inner"
                    :class="rc.innerClass"
                    v-html="rc.value"
                  ></div>
                  <div
                    v-else-if="rc.kind === 'text' && rc.marks"
                    class="cell-inner"
                    :class="rc.innerClass"
                  >
                    <template v-for="(piece, p) in rc.marks" :key="p"
                      ><mark v-if="piece.mark" class="quintable--search-mark">{{
                        piece.text
                      }}</mark
                      ><template v-else>{{ piece.text }}</template></template
                    >
                  </div>
                  <div
                    v-else-if="rc.kind === 'text'"
                    class="cell-inner"
                    :class="rc.innerClass"
                  >
                    {{ rc.value }}
                  </div>
                </td>
              </template>
              <td
                v-if="$slots['row-append']"
                class="row-append-td quintable--table-container--table--tbody--row--append-td"
                :class="_pin.append && _pin.append.cls"
              >
                <slot
                  name="row-append"
                  :row="rowsFinal[rIndex]"
                  :index="rIndex"
                ></slot>
              </td>

              <td
                v-if="
                  configFinal.select && configFinal.selectPosition === 'post'
                "
                class="select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post"
                :class="[
                  { 'disabled-select': rowsFinal[rIndex].disableSelect },
                  _pin.selectPost && _pin.selectPost.cls,
                ]"
              >
                <template
                  v-if="
                    !rowsFinal[rIndex].disableSelect ||
                    rowsFinal[rIndex].showDisabledSelect
                  "
                >
                  <slot
                    v-if="$slots['select-checkbox']"
                    name="select-checkbox"
                    :row="rowsFinal[rIndex]"
                    :index="rIndex"
                    :checked="!!selected[rIndex]"
                    :disabled="!!rowsFinal[rIndex].disableSelect"
                    :toggle="(value) => _toggleSelect(rIndex, value)"
                  ></slot>
                  <quintable-p-check
                    v-else-if="configFinal.prettySelect"
                    v-model="selected[rIndex]"
                    :aria-label="
                      configFinal.accessible
                        ? configFinal.selectRowLabel +
                          ' ' +
                          (_visibleRowIndexMap[rIndex] + 1)
                        : null
                    "
                    name="check"
                    class="p-icon"
                    :disabled="rowsFinal[rIndex].disableSelect"
                    @change="checkListener($event, rIndex)"
                  >
                    <template #extra>
                      <span
                        ><quintable-font-awesome-icon
                          v-if="selected[rIndex]"
                          icon="check"
                          class="text-success icon-check"
                      /></span>
                    </template>
                  </quintable-p-check>
                  <label v-else class="mb-0 mt-0">
                    <input
                      v-model="selected[rIndex]"
                      type="checkbox"
                      :aria-label="
                        configFinal.accessible
                          ? configFinal.selectRowLabel +
                            ' ' +
                            (_visibleRowIndexMap[rIndex] + 1)
                          : null
                      "
                      :disabled="rowsFinal[rIndex].disableSelect"
                      @change="checkListener($event, rIndex)"
                    />
                  </label>
                </template>
              </td>
            </tr>
            <template
              v-if="
                (generatedRows[rIndex] || stickyRows[rIndex]) &&
                visibleRows[rIndex]
              "
            >
              <tr
                v-if="
                  (generatedUpdatedKey &&
                    openRows[rIndex] &&
                    Object.keys(generatedRows[rIndex]).length) ||
                  Object.keys(stickyRows[rIndex]).length
                "
                :key="
                  'generated-row-' +
                  rIndex +
                  '-' +
                  essentialsKey +
                  '-' +
                  generatedUpdatedKey
                "
                :ref="'generated-row-highlighted-' + rIndex"
                class="generated-row quintable--table-container--table--tbody--generated-row"
                :class="{
                  'parent-row-expanded': openRows[rIndex],
                  'parent-row-collapsed':
                    hiddenColumns[rIndex] > 0 && !openRows[rIndex],
                }"
                @mouseenter="_hoverRow(rIndex, $event)"
                @click="onRowClick($event, rIndex)"
              >
                <td
                  :colspan="
                    columnCount +
                    ($slots['row-prepend'] ? 1 : 0) +
                    ($slots['row-append'] ? 1 : 0)
                  "
                  class="ps-0 pe-0 pt-0"
                >
                  <quintable-details-box v-slot="{ hovered }" :row="rIndex">
                    <div
                      v-if="$slots.details"
                      class="generated-details quintable--table-container--table--tbody--generated-row--generated-details"
                    >
                      <slot
                        name="details"
                        :row="rowsFinal[rIndex]"
                        :index="rIndex"
                        :cells="_detailsSlotCells(rIndex)"
                        :hovered="hovered"
                      ></slot>
                    </div>
                    <table
                      v-else
                      class="mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table"
                    >
                      <tbody>
                        <template
                          v-for="part in _detailCells[rIndex]"
                          :key="part.kind"
                        >
                          <template v-for="rc in part.cells" :key="rc.key">
                            <tr
                              v-if="part.open"
                              :id="rc.id"
                              :class="part.rowClass"
                            >
                              <td
                                v-if="
                                  !configFinal.hideRowToggle &&
                                  generatedRows[rIndex] &&
                                  Object.keys(generatedRows[rIndex]).length
                                "
                                class="toggle-cell invisible"
                              >
                                <span v-if="hiddenColumns[rIndex] > 0">
                                  <slot
                                    v-if="$slots['toggle-icon']"
                                    name="toggle-icon"
                                    :row="rowsFinal[rIndex]"
                                    :index="rIndex"
                                    :expanded="!!openRows[rIndex]"
                                  ></slot>
                                  <span v-else-if="!openRows[rIndex]"
                                    ><quintable-font-awesome-icon
                                      fixed-width
                                      :icon="configFinal.collapsedRowIcon"
                                    ></quintable-font-awesome-icon
                                  ></span>
                                  <span v-else
                                    ><quintable-font-awesome-icon
                                      fixed-width
                                      :icon="configFinal.expandedRowIcon"
                                    ></quintable-font-awesome-icon
                                  ></span>
                                </span>
                              </td>
                              <td
                                v-if="
                                  showHeadlines[rc.cIndex] ||
                                  configFinal.sorts[rc.cIndex]
                                "
                                :class="[
                                  configFinal.columnClasses[rc.cIndex],
                                  'generated-cell-element',
                                  part.headlineClass,
                                ]"
                                @click.stop="setSortColumn(rc.cIndex)"
                              >
                                <strong
                                  v-if="
                                    showHeadlines[rc.cIndex] && $slots.headline
                                  "
                                  ><slot
                                    name="headline"
                                    :column="configFinal.columns[rc.cIndex]"
                                    :index="Number(rc.cIndex)"
                                    :headline="configFinal.headlines[rc.cIndex]"
                                  ></slot
                                ></strong>
                                <strong
                                  v-else-if="showHeadlines[rc.cIndex]"
                                  v-html="configFinal.headlines[rc.cIndex]"
                                >
                                </strong>
                                <span v-else class="headline"><wbr /></span>

                                <span
                                  v-if="
                                    configFinal.sorts[rc.cIndex] &&
                                    (hovered || noHover)
                                  "
                                  class="sorting-icon cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"
                                  :class="{
                                    sorted: currentSortIndexes[rc.cIndex],
                                  }"
                                >
                                  <slot
                                    v-if="$slots['sort-icon']"
                                    name="sort-icon"
                                    :column="configFinal.columns[rc.cIndex]"
                                    :index="Number(rc.cIndex)"
                                    :direction="_sortDirection(rc.cIndex)"
                                  ></slot>
                                  <template
                                    v-else-if="!currentSortIndexes[rc.cIndex]"
                                  >
                                    <quintable-font-awesome-icon
                                      icon="up-long"
                                      width-auto
                                    />
                                    <quintable-font-awesome-icon
                                      icon="down-long"
                                      width-auto
                                    />
                                  </template>
                                  <quintable-font-awesome-icon
                                    v-else
                                    :icon="
                                      currentSortIndexes[rc.cIndex].asc
                                        ? 'arrow-up-short-wide'
                                        : 'arrow-down-wide-short'
                                    "
                                  />
                                  <span
                                    v-if="currentSortIndexes[rc.cIndex]"
                                    class="ms-1 text-muted"
                                    @click.stop.prevent="removeSort(rc.cIndex)"
                                  >
                                    <span
                                      v-if="numberOfSorts > 1"
                                      class="badge bg-info text-white"
                                    >
                                      {{
                                        currentSortIndexes[rc.cIndex].order + 1
                                      }}
                                    </span>
                                    <small v-else>
                                      <quintable-font-awesome-icon
                                        icon="xmark"
                                      />
                                    </small>
                                  </span>
                                </span>
                              </td>
                              <td
                                v-tooltip="rc.tooltip"
                                :colspan="
                                  !showHeadlines[rc.cIndex] &&
                                  !configFinal.sorts[rc.cIndex]
                                    ? 2
                                    : 1
                                "
                                :class="[
                                  configFinal.columnClasses[rc.cIndex] +
                                    ' ' +
                                    cellClassesParsed[rIndex][rc.cIndex],
                                  'generated-cell-element generated-cell-element-content',
                                  part.contentClass,
                                ]"
                                @click="onCellClick($event, rc.cell)"
                              >
                                <slot
                                  v-if="
                                    $slots[part.kind + '-cell-complete'] ||
                                    $slots[part.kind + '-cell-content']
                                  "
                                  :cell="rc.cell"
                                  :name="part.kind + '-cell-complete'"
                                >
                                  <slot
                                    :cell="rc.cell"
                                    :name="part.kind + '-cell-content'"
                                  >
                                    <div
                                      v-if="rc.kind === 'component'"
                                      class="cell-inner"
                                      :class="rc.innerClass"
                                    >
                                      <component
                                        :is="rc.value.name"
                                        v-bind="rc.value.props"
                                        @action="handleComponentEvent"
                                      ></component>
                                    </div>
                                    <div
                                      v-else-if="rc.kind === 'html'"
                                      class="cell-inner"
                                      :class="rc.innerClass"
                                      v-html="rc.value"
                                    ></div>
                                    <div
                                      v-else-if="rc.kind === 'text' && rc.marks"
                                      class="cell-inner"
                                      :class="rc.innerClass"
                                    >
                                      <template
                                        v-for="(piece, p) in rc.marks"
                                        :key="p"
                                        ><mark
                                          v-if="piece.mark"
                                          class="quintable--search-mark"
                                          >{{ piece.text }}</mark
                                        ><template v-else>{{
                                          piece.text
                                        }}</template></template
                                      >
                                    </div>
                                    <div
                                      v-else-if="rc.kind === 'text'"
                                      class="cell-inner"
                                      :class="rc.innerClass"
                                    >
                                      {{ rc.value }}
                                    </div>
                                  </slot>
                                </slot>
                                <div
                                  v-else-if="rc.kind === 'component'"
                                  class="cell-inner"
                                  :class="rc.innerClass"
                                >
                                  <component
                                    :is="rc.value.name"
                                    v-bind="rc.value.props"
                                    @action="handleComponentEvent"
                                  ></component>
                                </div>
                                <div
                                  v-else-if="rc.kind === 'html'"
                                  class="cell-inner"
                                  :class="rc.innerClass"
                                  v-html="rc.value"
                                ></div>
                                <div
                                  v-else-if="rc.kind === 'text' && rc.marks"
                                  class="cell-inner"
                                  :class="rc.innerClass"
                                >
                                  <template
                                    v-for="(piece, p) in rc.marks"
                                    :key="p"
                                    ><mark
                                      v-if="piece.mark"
                                      class="quintable--search-mark"
                                      >{{ piece.text }}</mark
                                    ><template v-else>{{
                                      piece.text
                                    }}</template></template
                                  >
                                </div>
                                <div
                                  v-else-if="rc.kind === 'text'"
                                  class="cell-inner"
                                  :class="rc.innerClass"
                                >
                                  {{ rc.value }}
                                </div>
                              </td>
                            </tr>
                          </template>
                        </template>
                      </tbody>
                    </table>
                  </quintable-details-box>
                </td>
              </tr>
            </template>
          </template>
          <tr
            v-if="configFinal.virtualScroll"
            class="quintable--virtual-spacer"
            aria-hidden="true"
          >
            <td
              :colspan="
                columnCount +
                ($slots['row-prepend'] ? 1 : 0) +
                ($slots['row-append'] ? 1 : 0)
              "
              class="quintable--virtual-spacer-cell"
              :style="{ height: virtualRange.bottom + 'px' }"
            ></td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="ajaxError && !ajaxLoading && $slots.error"
        class="clearfix slot-error slot quintable--table-container--error"
      >
        <slot name="error" :error="ajaxError" :reload="_reloadPage"></slot>
      </div>
      <template v-else-if="noRows && !ajaxLoading">
        <div
          v-if="$slots.empty && _hasNoRowsAtAll"
          class="clearfix slot-empty slot quintable--table-container--empty"
        >
          <slot name="empty"></slot>
        </div>
        <div
          v-else
          class="clearfix slot-no-results slot quintable--table-container--no-results"
        >
          <slot name="no-results">
            <div
              class="text-center p-3 quintable--table-container--no-results--results"
            >
              <em v-html="configFinal.emptyPlaceholder"></em>
            </div>
          </slot>
          <hr />
        </div>
      </template>
    </div>

    <div v-if="ajaxLoading" class="slot-loading slot quintable--loading">
      <slot name="loading" :hidden-breakpoints="hiddenBreakpoints">
        <!-- Divs laid out as a table, never table markup: this stands in for the table while it loads, and a
             `tbody tr` selector must not read its empty rows as data. -->
        <div
          v-if="configFinal.skeletonLoading"
          class="table quintable--skeleton"
          role="presentation"
          aria-hidden="true"
        >
          <!-- Groups as in thead/tbody: `.table > * > * > *` styles the cells, as in the loaded table. -->
          <div class="quintable--skeleton--head">
            <div
              class="quintable--skeleton--row quintable--table-container--table--header-row"
            >
              <div
                v-if="skeleton.toggle"
                class="quintable--skeleton--cell quintable--table-container--table--header-row--placeholder-th"
              ></div>
              <div
                v-if="
                  configFinal.select && configFinal.selectPosition === 'pre'
                "
                class="quintable--skeleton--cell quintable--table-container--table--header-row--select-th"
              ></div>
              <div
                v-if="$slots['row-prepend']"
                class="quintable--skeleton--cell quintable--table-container--table--header-row--prepend-th"
              ></div>
              <template v-for="(headline, hIndex) in configFinal.headlines">
                <div
                  v-if="skeleton.columns[hIndex]"
                  :key="'skeleton-headline-' + hIndex"
                  class="quintable--skeleton--cell"
                  :class="headerClass[hIndex]"
                >
                  <!-- The headline keeps its text, hidden under a bar, so the columns are as wide as loaded. -->
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <span
                    v-if="showHeadlines[hIndex] && $slots.headline"
                    class="quintable--skeleton--headline"
                    ><slot
                      name="headline"
                      :column="configFinal.columns[hIndex]"
                      :index="hIndex"
                      :headline="headline"
                    ></slot
                  ></span>
                  <span
                    v-else
                    class="quintable--skeleton--headline"
                    v-html="showHeadlines[hIndex] ? headline : ''"
                  ></span>
                  <span
                    v-if="configFinal.sorts[hIndex]"
                    class="sorting-icon quintable--skeleton--sorting-icon"
                  ></span>
                </div>
              </template>
              <div
                v-if="$slots['row-append']"
                class="quintable--skeleton--cell quintable--table-container--table--header-row--append-th"
              ></div>
              <div
                v-if="
                  configFinal.select && configFinal.selectPosition === 'post'
                "
                class="quintable--skeleton--cell quintable--table-container--table--header-row--select-th"
              ></div>
            </div>
          </div>
          <div class="quintable--skeleton--body">
            <div
              v-for="row in skeleton.rows"
              :key="'skeleton-row-' + row"
              class="quintable--skeleton--row quintable--table-container--table--tbody--row"
            >
              <div
                v-if="skeleton.toggle"
                class="quintable--skeleton--cell quintable--table-container--table--tbody--row--toggle-td"
              ></div>
              <div
                v-if="
                  configFinal.select && configFinal.selectPosition === 'pre'
                "
                class="quintable--skeleton--cell quintable--table-container--table--tbody--row--select-td"
              ></div>
              <div
                v-if="$slots['row-prepend']"
                class="quintable--skeleton--cell quintable--table-container--table--tbody--row--prepend-td"
              ></div>
              <template v-for="(headline, hIndex) in configFinal.headlines">
                <div
                  v-if="skeleton.columns[hIndex]"
                  :key="'skeleton-cell-' + hIndex"
                  class="quintable--skeleton--cell quintable--table-container--table--tbody--row--cell"
                  :class="configFinal.columnClasses[hIndex]"
                >
                  <span class="quintable--skeleton--bar"></span>
                </div>
              </template>
              <div
                v-if="$slots['row-append']"
                class="quintable--skeleton--cell quintable--table-container--table--tbody--row--append-td"
              ></div>
              <div
                v-if="
                  configFinal.select && configFinal.selectPosition === 'post'
                "
                class="quintable--skeleton--cell quintable--table-container--table--tbody--row--select-td"
              ></div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="loader-wrapper quintable--loading--loader-wrapper"
          :style="'height:' + loaderHeight + 'px;'"
        >
          <div
            class="loader text-center py-4 quintable--loading--loader-wrapper--loader"
          >
            <quintable-font-awesome-icon
              icon="circle-notch"
              spin
              class="ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader"
            />
          </div>
        </div>
      </slot>
    </div>

    <div class="clearfix quintable--table-footer-container">
      <div class="row">
        <div class="col-lg-4 quintable--table-footer-container--sort-container">
          <div
            v-if="configFinal.multiSortSelect || configFinal.pageSortSelect"
            :class="
              `pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select flex-inline ${
                configFinal.pageSort ? 'me-3' : ''
              }`.trim()
            "
          >
            <slot
              v-if="$slots['sort-switches']"
              name="sort-switches"
              :multi-sort="multiSort"
              :page-sort="pageSort"
              :set-multi-sort="(value) => (multiSort = value)"
              :set-page-sort="(value) => (pageSort = value)"
            ></slot>
            <template v-else>
              <quintable-p-check
                v-if="configFinal.multiSortSelect"
                v-model="multiSort"
                class="p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select"
                value="true"
                >{{ configFinal.multiSortPlaceholder }}
              </quintable-p-check>
              <quintable-p-check
                v-if="configFinal.pageSortSelect"
                v-model="pageSort"
                class="p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select"
                value="true"
                >{{ configFinal.pageSortPlaceholder }}
              </quintable-p-check>
            </template>
          </div>
        </div>
        <div
          class="col-lg-8 quintable--table-footer-container--pagination-wrapper"
        >
          <div
            v-if="configFinal && configFinal.pagination"
            class="float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container"
          >
            <div
              v-if="configFinal.rowsSelect"
              class="mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select"
            >
              <slot
                v-if="$slots['rows-per-page']"
                name="rows-per-page"
                :value="currentRowsPerPageProperty"
                :options="paginationOptionsFilled"
                :set-rows-per-page="
                  (value) => (currentRowsPerPageProperty = value)
                "
                :placeholder="configFinal.rowsPlaceholder"
              ></slot>
              <template v-else>
                <span
                  class="d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder"
                  v-html="configFinal.rowsPlaceholder"
                ></span>
                <quintable-v-select
                  v-model="currentRowsPerPageProperty"
                  class="d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select"
                  :options="paginationOptionsFilled"
                  :clearable="false"
                />
              </template>
            </div>
            <slot
              v-if="
                $slots.pagination &&
                configFinal &&
                configFinal.pagination &&
                pages > 1
              "
              name="pagination"
              :page="currentPage"
              :pages="pages"
              :set-page="gotoPage"
            ></slot>
            <nav
              v-else-if="configFinal && configFinal.pagination && pages > 1"
              :aria-label="
                configFinal.accessible ? configFinal.paginationLabel : null
              "
              class="d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav"
              :class="{ 'me-3': numberOfVisibleRows, disabled: ajaxLoading }"
            >
              <ul
                class="pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination"
                @keydown="_onPaginationKeydown"
              >
                <li
                  v-if="pages > pageRange"
                  class="page-item"
                  :class="{ disabled: currentPage <= 1 }"
                  @click="gotoPage('first')"
                >
                  <span
                    class="page-link"
                    v-bind="
                      configFinal.accessible
                        ? _pageLinkA11y(configFinal.firstPageLabel)
                        : null
                    "
                  >
                    <slot
                      v-if="$slots['pagination-icon']"
                      name="pagination-icon"
                      type="first"
                    ></slot>
                    <quintable-font-awesome-icon v-else icon="angles-left" />
                  </span>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: currentPage <= 1 }"
                  @click="gotoPage('prev')"
                >
                  <span
                    class="page-link"
                    v-bind="
                      configFinal.accessible
                        ? _pageLinkA11y(configFinal.previousPageLabel)
                        : null
                    "
                  >
                    <slot
                      v-if="$slots['pagination-icon']"
                      name="pagination-icon"
                      type="prev"
                    ></slot>
                    <quintable-font-awesome-icon v-else icon="angle-left" />
                  </span>
                </li>
                <li
                  v-if="pageRange < pages && visiblePages[0] > 1"
                  class="page-item"
                  @click="updatePageOffset(-1)"
                >
                  <span
                    class="page-link"
                    v-bind="configFinal.accessible ? _pageLinkA11y() : null"
                  >
                    ...
                  </span>
                </li>

                <li
                  v-for="page in visiblePages"
                  :key="'pagination-item-' + page"
                  class="page-item"
                  :class="{ active: page === currentPage }"
                  @click="gotoPage(page)"
                >
                  <span
                    class="page-link"
                    v-bind="
                      configFinal.accessible
                        ? _pageLinkA11y(null, page === currentPage)
                        : null
                    "
                  >
                    {{ page }}
                  </span>
                </li>

                <li
                  v-if="
                    pageRange < pages &&
                    visiblePages[visiblePages.length - 1] < pages
                  "
                  class="page-item"
                  @click="updatePageOffset(1)"
                >
                  <span
                    class="page-link"
                    v-bind="configFinal.accessible ? _pageLinkA11y() : null"
                  >
                    ...
                  </span>
                </li>

                <li
                  class="page-item"
                  :class="{ disabled: pages === currentPage }"
                  @click="gotoPage('next')"
                >
                  <span
                    class="page-link"
                    v-bind="
                      configFinal.accessible
                        ? _pageLinkA11y(configFinal.nextPageLabel)
                        : null
                    "
                  >
                    <slot
                      v-if="$slots['pagination-icon']"
                      name="pagination-icon"
                      type="next"
                    ></slot>
                    <quintable-font-awesome-icon v-else icon="angle-right" />
                  </span>
                </li>
                <li
                  v-if="pages > pageRange"
                  class="page-item"
                  :class="{ disabled: pages === currentPage }"
                  @click="gotoPage('last')"
                >
                  <span
                    class="page-link"
                    v-bind="
                      configFinal.accessible
                        ? _pageLinkA11y(configFinal.lastPageLabel)
                        : null
                    "
                  >
                    <slot
                      v-if="$slots['pagination-icon']"
                      name="pagination-icon"
                      type="last"
                    ></slot>
                    <quintable-font-awesome-icon v-else icon="angles-right" />
                  </span>
                </li>
              </ul>
            </nav>

            <span
              v-if="numberOfVisibleRows"
              class="d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows"
              ><slot
                v-if="$slots['rows-info']"
                name="rows-info"
                :first="firstVisibleRow"
                :last="lastVisibleRow"
                :total="numberOfVisibleRows"
              ></slot
              ><template v-else
                >{{ firstVisibleRow }}-{{ lastVisibleRow }}
                {{ configFinal.numberOfVisibleRowsFillerWord }}
                {{ numberOfVisibleRows }}</template
              ></span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="footer slot slot-footer quintable--footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, h, toRaw } from "vue";
import { getSharedBreakpoints } from "../../utils/shared-breakpoints";
import { PAGINATION_OPTIONS, _resetLocalStorageCache } from "./config";
import { operatorFunctions } from "./filter";
import {
  sameList,
  valueToString,
  cellsOf,
  withUpdates,
  splitMarks,
} from "./helpers";
import { vTooltip } from "./tooltip";
// Computed values and methods by topic, as in v2 (src/mixins there too). Props, data, watchers and lifecycle hooks
// stay here: the order watchers are created in decides the order of the events they emit.
import configMixin from "../../mixins/config.mixin";
import sortingMixin from "../../mixins/sorting.mixin";
import filteringMixin from "../../mixins/filtering.mixin";
import ajaxMixin from "../../mixins/ajax.mixin";
import paginationMixin from "../../mixins/pagination.mixin";
import selectionMixin from "../../mixins/selection.mixin";
import eventsMixin from "../../mixins/events.mixin";
import breakpointMixin from "../../mixins/breakpoint.mixin";
import columnsMixin from "../../mixins/columns.mixin";
import urlStateMixin from "../../mixins/url-state.mixin";
import virtualScrollMixin from "../../mixins/virtual-scroll.mixin";

let _quintableIdCounter = 0;

// A cell's v-tooltip value, built once per cell (not per render), so the tooltip directive sees it unchanged.
function cellTooltip(cell, placement) {
  return {
    placement,
    content: cell.tooltip,
    trigger: cell.tooltip ? "hover" : "manual",
  };
}

const CELL_INNER =
  "quintable--table-container--table--tbody--row--cell--inner-cell--";
const DETAILS =
  "quintable--table-container--table--tbody--generated-row--generated-table";

/**
 * What a cell shows without a slot: its formatted value (if `useFormatted`), else its html, component or text. `kind`
 * is "html", "component", "text" or null, `innerClass` the class of the element around it. The template renders a
 * cell's slots only if the table got them: their fragments cost a tenth of each render.
 */
function cellContent(cell, formatted, useFormatted, classPrefix) {
  let kind = null;
  let value;
  let modifier;
  if (useFormatted) {
    const html = formatted.type === "html";
    kind = html ? "html" : "text";
    value = formatted.value;
    modifier = html ? "formatted-html" : "formatted-value";
  } else if (valueToString(cell.html)) {
    kind = modifier = "html";
    value = cell.html;
  } else if (cell.component) {
    kind = modifier = "component";
    value = cell.component;
  } else if (valueToString(cell.text)) {
    kind = modifier = "text";
    value = cell.text;
  }
  return { kind, value, innerClass: kind && classPrefix + modifier };
}

// highlightSearch: a text cell's content split at the query's occurrences (marks), if it has any.
function withMarks(content, query) {
  if (query && content.kind === "text") {
    const marks = splitMarks(String(content.value), query);
    if (marks) {
      content.marks = marks;
    }
  }
  return content;
}

// The parts of a row's details: the cells collapsed by a breakpoint (shown while the row is open), then the sticky ones.
const DETAIL_PARTS = ["generated", "sticky"].map((kind) => ({
  kind,
  rowClass: `${kind}-row-cell ${DETAILS}--${kind}-row-cell`,
  headlineClass: `${kind}-cell-headline ${DETAILS}--generated-row-cell--${kind}-cell-headline`,
  contentClass: `${kind}-cell-content ${DETAILS}--generated-row-cell--${kind}-cell-content`,
  innerPrefix: `${DETAILS}--${kind}-row-cell--${kind}-cell--cell-inner--`,
}));

/**
 * The box in a row's details. It, not the table, reads the row's hover and active state: moving the mouse re-renders
 * only the boxes of the rows it leaves and enters instead of the whole table.
 */
const QuintableDetailsBox = {
  name: "QuintableDetailsBox",
  props: ["row"],
  setup(props, { slots }) {
    const table = getCurrentInstance().parent.proxy;
    const hovered = computed(() => !!table._rowFlags("hovered")[props.row]);
    const active = computed(() => !!table._rowFlags("active")[props.row]);
    return () => {
      const { hoverClass, activeClass } = table.configFinal;
      return h(
        "div",
        { class: { [hoverClass]: hovered.value, [activeClass]: active.value } },
        slots.default({ hovered: hovered.value }),
      );
    };
  },
};

export { _resetLocalStorageCache };

export default {
  name: "VueQuintable",
  components: { QuintableDetailsBox },
  directives: { tooltip: vTooltip },
  mixins: [
    configMixin,
    sortingMixin,
    filteringMixin,
    ajaxMixin,
    paginationMixin,
    selectionMixin,
    eventsMixin,
    breakpointMixin,
    columnsMixin,
    urlStateMixin,
    virtualScrollMixin,
  ],
  inject: {
    // Config defaults for every table of the app: app.use(VueQuintable, { defaults: { ... } }).
    quintableDefaults: { from: "vueQuintableDefaults", default: null },
  },
  props: {
    rows: {
      type: Array,
      default() {
        return [];
      },
    },
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    dynamicConfig: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    selectedRows: {
      type: Array,
      default() {
        return [];
      },
    },
    preSelectedRows: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Object,
      default() {
        return {};
      },
    },
    filterGroups: {
      type: Array,
      default() {
        return [];
      },
    },
    verbose: {
      type: Boolean,
      default: false,
    },
    nested: {
      type: Boolean,
      default: false,
    },
    tableClasses: {
      type: String,
      default: "",
    },
    sortOrder: {
      type: Array,
      default() {
        return [];
      },
    },
    updated: {
      type: [Boolean, Object, Date],
      default: false,
    },
    axios: {
      // an axios instance is a function; a hand-made client or mock may be a plain object
      type: [Function, Object],
      default: null,
    },
    identifier: {
      type: String,
      default: null,
    },
    initialSearchTerm: {
      type: String,
      default: null,
    },
  },
  emits: [
    "update:filters",
    "filtered:rows",
    "change:breakpoints",
    "hover:row",
    "update:search",
    "update:rows-per-page",
    "input",
    "update:selected-rows",
    "update:page",
    "active:row",
    "component:event",
    "auxclick:row",
    "expand:row",
    "collapse:row",
    "click:row",
    "click:cell",
    "auxclick:cell",
    "update:sort",
    "ajax:rows",
    "ajax:error",
    "update:hidden-columns",
    "resize:column",
    "update:column-filters",
  ],
  data() {
    return {
      // Part of every row's key: a new value re-creates all rows (sort, page, new rows).
      essentialsKey: Date.now(),
      // Part of every details row's key: a new value re-creates them (expand, collapse).
      generatedUpdatedKey: Date.now(),
      hoveredRow: null,
      // A touch screen has no hover, so a row's details show their sort icons there all the time.
      noHover:
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(hover: none)").matches,
      allSelectedCustom: null,
      selected: {},
      openRows: {},
      // Position (as a string key) → row index, in display order.
      sortedIndexes: {},
      currentSortIndexes: {},
      query: "",
      currentPage: 1,
      paginationOptions: [...PAGINATION_OPTIONS],
      fetching: false,
      ajaxRows: [],
      ajaxPages: 0,
      ajaxAll: 0,
      // resizableColumns: the widths in px, by column index or the table's own cells (see columns.mixin.js).
      columnWidths: {},
      // virtualScroll: the rendered rows (positions start to end of the page's rows) and the spacer heights.
      virtualRange: { start: 0, end: 40, top: 0, bottom: 0 },
      // columnFilters: the value of each column's filter, by column index.
      columnFilterValues: {},
      // columnPicker: the columns the user hid, index → true.
      userHiddenColumns: {},
      // searchDebounce: the query the rows are searched by, the typed one after a pause.
      debouncedQuery: "",
      // The last failed AJAX request's error (error slot), null once a request starts.
      ajaxError: null,
      customRowsPerPage: null,
      customMultiSort: null,
      customPageSort: null,
      hiddenBreakpoints: [],
      initBreakpoints: true,
      cancelSource: null,
      lastQuery: "",
      pageOffset: 0,
      uuid: "qt-" + ++_quintableIdCounter + "-" + Date.now(),
      loaderHeight: 0,
      defaultOperator: "equal",
      queryAjaxTimeout: null,
      lastSearchQueryUpdated: null,
      operatorFunctions: operatorFunctions,
      storedState: {},
      activeRow: null,
      // autoFit: how many of FIT_ORDER are collapsed on top of the window's list, and that list without them.
      fitLevel: 0,
      windowHiddenBreakpoints: null,
      fitScroll: false,
    };
  },

  computed: {
    // The table's column count, which is the header's cell count: a row's details span exactly these.
    columnCount() {
      return Math.max(
        1,
        (this.hasGeneratedRows && !this.configFinal.hideRowToggle ? 1 : 0) +
          (this.configFinal.select ? 1 : 0) +
          this.cellVisible.filter(Boolean).length,
      );
    },

    // skeletonLoading: the columns, toggle and row count the loading table stands in for. No empty-column check:
    // while rows load there are none to check.
    skeleton() {
      const cols = this.configFinal.columns;
      const shown = cols.map((col, j) => !!col && !this._isHiddenCol(j));
      return {
        columns: shown.map(
          (show, j) =>
            show &&
            !this._colBreakpointMatch[j] &&
            !this.configFinal.stickyCols[j],
        ),
        toggle:
          !this.configFinal.hideRowToggle &&
          shown.some(
            (show, j) =>
              show &&
              this._colBreakpointMatch[j] &&
              !cols[j].sticky &&
              !cols[j].alwaysExpanded,
          ),
        rows:
          typeof this.currentRowsPerPage === "number"
            ? this.currentRowsPerPage
            : 10,
      };
    },

    // Cache isColEmpty(j) results so it's computed once per column, not N times
    _colEmptyCache() {
      const cache = {};
      for (let j = 0; j < this.configFinal.number; j++) {
        cache[j] = this.isColEmpty(j);
      }
      return Object.freeze(cache);
    },

    // Pre-compute per-column hide status (shared by generatedRows, stickyRows, hiddenColumns)
    _colHideCache() {
      const cache = {};
      for (let j = 0; j < this.configFinal.columns.length; j++) {
        cache[j] =
          this._isHiddenCol(j) ||
          (!this.configFinal.ignoreEmpty[j] &&
            this.configFinal.hideEmptyColumns &&
            this._colEmptyCache[j]) ||
          this.emptyColumns[j];
      }
      return Object.freeze(cache);
    },

    // Pre-compute per-column base visibility for cell rendering
    cellVisible() {
      return Object.freeze(
        this.configFinal.columns.map(
          (col, j) =>
            !this._isHiddenCol(j) &&
            !this.emptyColumns[j] &&
            !!col &&
            !this._colBreakpointMatch[j] &&
            !this.configFinal.stickyCols[j],
        ),
      );
    },

    /**
     * Checks which rows shall be shown
     *
     * @returns {Array} a boolean array which represents all indexes of the rows
     */
    visibleRows() {
      if (this.configFinal.ajaxUrl || this.currentRowsPerPage === "All") {
        return this.filteredRows;
      }

      const visible = new Array(this.rowsFinal.length).fill(false);

      // The rows that pass the filters, in display order (sources read in the order of before, see visibleRowIndexes).
      const passing = [];
      let filtered;
      const sortedIndexes = this.sortedIndexes;
      for (const position in sortedIndexes) {
        const index = sortedIndexes[position];
        if ((filtered || (filtered = this.filteredRows))[index]) {
          passing.push(index);
        }
      }

      // Those of the current page are visible.
      const borderHigh = this.currentPage * this.currentRowsPerPage;
      const borderLow = borderHigh - this.currentRowsPerPage;
      for (
        let i = Math.max(borderLow, 0);
        i < borderHigh && i < passing.length;
        i++
      ) {
        visible[passing[i]] = true;
      }
      return visible;
    },

    /**
     * Checks which indexes belongs to the current visible rows
     *
     * @returns {Array} an array of all visible indexes
     */
    visibleRowIndexes() {
      const rows = [];
      if (!this.essentialsKey) {
        return rows;
      }
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        for (let i = 0; i < this.rowsFinal.length; i++) {
          rows.push(i);
        }
        return rows;
      }
      // Reads sortedIndexes before visibleRows, as before: the order a computed reads its sources in decides the
      // order watchers run in, and with it the order of the events they emit. (Read once, then kept.)
      let visible;
      const sortedIndexes = this.sortedIndexes;
      for (const position in sortedIndexes) {
        const index = sortedIndexes[position];
        if ((visible || (visible = this.visibleRows))[index]) {
          rows.push(index);
        }
      }
      return rows;
    },

    /**
     * Checks which cells are hidden and shall be displayed as additional generated rows.
     *
     * @returns {Object} an object with sorted index as key and generated row array of cells as value
     */
    generatedRows() {
      const generatedRows = {};
      if (!this.generatedUpdatedKey) {
        return generatedRows;
      }
      const columns = this.configFinal.columns;
      const colMatch = this._colBreakpointMatch;
      const colHide = this._colHideCache;
      const checkEmpty = this.configFinal.hideEmptyColumns;
      const ignoreEmpty = this.configFinal.ignoreEmpty;

      for (const x of this.visibleRowIndexes) {
        const cells = cellsOf(this.rowsFinal[x]);
        const generatedCells = {};
        for (let j = 0; j < columns.length; j++) {
          if (
            colMatch[j] &&
            !colHide[j] &&
            !(checkEmpty && !ignoreEmpty[j] && this.isColEmpty(j, x)) &&
            !columns[j].sticky &&
            !columns[j].alwaysExpanded
          ) {
            generatedCells[j] = cells[j];
          }
        }
        generatedRows[x] = generatedCells;
      }
      return generatedRows;
    },

    stickyRows() {
      const stickyRows = {};
      const columns = this.configFinal.columns;
      const colMatch = this._colBreakpointMatch;
      const colHide = this._colHideCache;
      const checkEmpty = this.configFinal.hideEmptyColumns;
      const ignoreEmpty = this.configFinal.ignoreEmpty;

      for (const x of this.visibleRowIndexes) {
        const cells = cellsOf(this.rowsFinal[x]);
        const stickyCells = {};
        for (let j = 0; j < columns.length; j++) {
          const col = columns[j];
          if (
            (col.sticky || (col.alwaysExpanded && colMatch[j])) &&
            !colHide[j] &&
            !(checkEmpty && !ignoreEmpty[j] && this.isColEmpty(j, x))
          ) {
            stickyCells[j] = cells[j];
          }
        }
        stickyRows[x] = stickyCells;
      }
      return stickyRows;
    },

    /**
     * Checks if multi sort is currently active. Special case: no user action in place
     *
     */
    multiSort: {
      get() {
        if (this.customMultiSort === null) {
          return this.configFinal.multiSort;
        }
        return this.customMultiSort;
      },
      set(val) {
        this.customMultiSort = val;
      },
    },

    /**
     * Checks if there are any generated rows in place
     *
     */
    hasGeneratedRows() {
      const colMatch = this._colBreakpointMatch;
      const colHide = this._colHideCache;
      return this.configFinal.columns.some(
        (col, j) =>
          colMatch[j] && !colHide[j] && !col.sticky && !col.alwaysExpanded,
      );
    },

    /**
     * Calculates the classes array for every cell from the align parameters of rows and cells and the custom class string passed to cells
     *
     */
    cellClassesParsed() {
      const cellClasses = {};
      const alignments = this.configFinal.alignments;
      const indexes =
        this.visibleRowIndexes.length > 0
          ? this.visibleRowIndexes
          : Object.keys(this.rowsFinal).map(Number);

      for (const i of indexes) {
        const row = this.rowsFinal[i];
        if (!row) continue;
        const cells = cellsOf(row);
        const rowClasses = [];
        for (let j = 0; j < cells.length; j++) {
          const align = cells[j].align || row.align || alignments[j];
          const classes = cells[j].classes;
          rowClasses.push(
            align
              ? classes
                ? "text-" + align + " " + classes
                : "text-" + align
              : classes || "",
          );
        }
        cellClasses[i] = rowClasses;
      }
      return cellClasses;
    },

    /**
     *Calculates the number of hidden columns
     *
     */
    hiddenColumns() {
      // A visible row has hidden columns to show if any column is collapsed by a breakpoint and not hidden. (Then
      // every row has: a column hidden by hideEmptyColumns counts in _colHideCache already.)
      const colMatch = this._colBreakpointMatch;
      const colHide = this._colHideCache;
      const hidden = this.configFinal.columns.some(
        (col, j) => colMatch[j] && !colHide[j],
      )
        ? 1
        : 0;
      const rows = {};
      for (const x of this.visibleRowIndexes) {
        rows[x] = hidden;
      }
      return rows;
    },

    /**
     * Calculates the actual rows which shall be used.
     *
     */
    rowsFinal() {
      return this.configFinal.ajaxUrl ? this.ajaxRows : this.rows || [];
    },

    /**
     * Calculates the classes of every table header
     *
     */
    headerClass() {
      const classes = [];
      for (let i = 0; i < this.configFinal.number; i++) {
        const iClasses = [];
        if (this.configFinal.alignments[i]) {
          iClasses.push("text-" + this.configFinal.alignments[i]);
        }
        if (this.configFinal.sorts[i]) {
          iClasses.push("sort-header");
          if (this.currentSortIndexes[i]) {
            iClasses.push("active");
          }
        }
        classes.push(
          iClasses.join(" ") +
            "  quintable--table-container--table--header-row--th " +
            this.configFinal.columnClasses[i],
        );
      }
      return Object.freeze(classes);
    },

    /**
     * Calculates if a headline is to be shown on generated rows
     *
     */
    showHeadlines() {
      const bpSet = this._hiddenBreakpointSet;
      const shows = [];
      for (let i = 0; i < this.configFinal.number; i++) {
        const col = this.configFinal.columns[i];
        shows.push(
          !!this.configFinal.headlines[i] &&
            (!col.showHeadlineBreakpoint ||
              bpSet.has(col.showHeadlineBreakpoint)) &&
            (!col.hideHeadlineBreakpoint ||
              !bpSet.has(col.hideHeadlineBreakpoint)),
        );
      }
      return Object.freeze(shows);
    },

    emptyColumns() {
      const cols = {};
      // Read up front, as before: hasOwnProperty.call below is not tracked by Vue, so this read is what makes the
      // columns update once a sort is removed (via visibleRowIndexes and essentialsKey).
      const colEmptyCache = this._colEmptyCache;
      const ignore = this.configFinal.ignoreSortEmptyColumns;

      for (let i = 0; i < this.configFinal.number; i++) {
        cols[i] =
          !this.configFinal.hideEmptyColumns ||
          this.configFinal.ignoreEmpty[i] ||
          (ignore === "none" && this.configFinal.sorts[i]) ||
          (ignore === "active" &&
            Object.prototype.hasOwnProperty.call(this.currentSortIndexes, i))
            ? false
            : colEmptyCache[i];
      }
      return cols;
    },

    rowClasses() {
      const allRowclasses = {};
      for (const rIndex of this.visibleRowIndexes) {
        const rowClasses = [];
        if (this.rowsFinal[rIndex].classes) {
          rowClasses.push(this.rowsFinal[rIndex].classes);
        }
        if (this.openRows[rIndex]) {
          rowClasses.push("row-expanded");
        }
        if (this.hiddenColumns[rIndex] > 0 && !this.openRows[rIndex]) {
          rowClasses.push("row-collapsed");
        }
        allRowclasses[rIndex] = rowClasses.join(" ");
      }
      return allRowclasses;
    },

    // The cellFormatter results of the visible rows: row index → column index → formatted value.
    _fmtCells() {
      const map = {};
      const cols = this.configFinal.columns;
      if (!cols.some((col) => col && col.cellFormatter)) {
        return map;
      }
      for (const rIndex of this.visibleRowIndexes) {
        const row = this.rowsFinal[rIndex];
        if (!row) continue;
        const cells = cellsOf(row);
        let hasAny = false;
        const rowMap = {};
        for (let i = 0; i < cells.length; i++) {
          if (cols[i] && cols[i].cellFormatter) {
            rowMap[i] = this.cellFormatters(i, cells[i]);
            hasAny = true;
          }
        }
        if (hasAny) map[rIndex] = rowMap;
      }
      return map;
    },

    // What the template needs for each cell of the visible rows, precomputed once per change.
    _renderRows() {
      const map = {};
      const colClasses = this.configFinal.columnClasses;
      const cellVis = this.cellVisible;
      const cellCls = this.cellClassesParsed;
      const fmtCells = this._fmtCells;
      const uid = this.uuid;
      const marks = this.configFinal.highlightSearch ? this._markQuery : "";
      const pins = this._pin.cols;
      // resizableColumns: in the fixed layout long words break instead of widening a column
      const wrap =
        this.configFinal.resizableColumns && this._layoutWidths
          ? " quintable-wrap-anywhere"
          : "";
      for (const rIndex of this._renderedRowIndexes) {
        const row = this.rowsFinal[rIndex];
        if (!row) continue;
        const cells = cellsOf(row);
        const prefix = "vue-quintable-" + uid + "-cell-" + rIndex + "-";
        const rowCls = cellCls[rIndex];
        const rowFmt = fmtCells[rIndex];
        const arr = [];
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          const vis = !!(cellVis[i] && cell);
          const fmt = rowFmt ? rowFmt[i] || null : null;
          arr.push({
            cell: cell,
            cls:
              (rowCls ? rowCls[i] || "" : "") +
              " " +
              (colClasses[i] || "") +
              (pins[i] ? " " + pins[i].cls : "") +
              wrap,
            vis,
            key: prefix + i,
            ...(vis
              ? {
                  tooltip: cellTooltip(cell, "left"),
                  ...withMarks(
                    cellContent(cell, fmt, !!fmt, CELL_INNER),
                    marks,
                  ),
                }
              : null),
          });
        }
        map[rIndex] = arr;
      }
      return map;
    },

    // The cells of each visible row's details (see DETAIL_PARTS), with their ids, keys and content.
    _detailCells() {
      const details = {};
      const fmtCells = this._fmtCells;
      const marks = this.configFinal.highlightSearch ? this._markQuery : "";
      for (const rIndex of this._renderedRowIndexes) {
        const prefix = "vue-quintable-" + this.uuid + "-";
        details[rIndex] = DETAIL_PARTS.map((part) => {
          const generated = part.kind === "generated";
          const cells = generated
            ? this.generatedRows[rIndex]
            : this.stickyRows[rIndex];
          // A collapsed row renders no cells of its own: their content is not needed (nor its formatters run).
          const open = generated ? this.openRows[rIndex] : true;
          return {
            ...part,
            open,
            cells: Object.keys(cells).map((cIndex) => {
              const cell = cells[cIndex];
              const id = `${prefix}${part.kind}-row-cell-${rIndex}-${cIndex}`;
              // _fmtCells holds a cell's formatted value exactly if its column has a formatter.
              const formatted = fmtCells[rIndex] && fmtCells[rIndex][cIndex];
              const hasFormatter =
                !!this.configFinal.columns[cIndex].cellFormatter;
              return {
                cell,
                cIndex,
                id,
                key: generated ? id + "-" + this.generatedUpdatedKey : id,
                tooltip: open ? cellTooltip(cell, "top") : null,
                ...(open
                  ? withMarks(
                      cellContent(
                        cell,
                        formatted,
                        hasFormatter,
                        part.innerPrefix,
                      ),
                      marks,
                    )
                  : null),
              };
            }),
          };
        });
      }
      return details;
    },

    // O(1) lookup map: rowIndex → position in visibleRowIndexes
    _visibleRowIndexMap() {
      const map = {};
      this.visibleRowIndexes.forEach((rIndex, i) => (map[rIndex] = i));
      return map;
    },
  },

  watch: {
    visibleRowIndexes(val, old) {
      // reuseRows: the hovered row element now shows another row. The hover goes, as with re-created rows.
      if (
        this.configFinal.reuseRows &&
        this._hoverTarget &&
        !sameList(val, old)
      ) {
        this._hoverTarget = null;
        this._paintRows();
      }
      // autoFit: new rows (page, sort, filter, search) may be narrower than the ones a fit level was raised for. Rows
      // cleared for a load keep the level, so the skeleton has the columns the list had; the next rows re-fit.
      if (this.windowHiddenBreakpoints && this.fitLevel > 0 && val.length > 0) {
        this.fitLevel = 0;
        this._applyFitLevel();
        this.$nextTick(this._fitToContainer);
      }
    },
    rowsFinal: {
      handler(val) {
        if (!this.verbose || !val) return;
        val.forEach((row, i) => {
          const cells = cellsOf(row);
          const expected = this.config.columns.length;
          if (cells.length !== expected) {
            console.error(
              `Column count on row index ${i} doesn't fit for column config! expected: ${expected}, got: ${cells.length}` +
                (this.configFinal.ajaxUrl
                  ? ` | URL: ${this.configFinal.ajaxUrl}`
                  : "") +
                (this.identifier ? ` | IDENTIFIER: ${this.identifier}` : ""),
              row,
            );
          }
        });
      },
      immediate: true,
    },

    /**
     * Check if some rows should be selected due to an outside change
     *
     */
    preSelectedRows(val) {
      if (!val) {
        return;
      }

      const rows = this.rowsFinal;
      const selected = this.selected;
      for (let i = 0; i < rows.length; i++) {
        selected[i] = false;
      }

      if (!val.length) {
        this.allSelectedCustom = false;
        return;
      }

      let counter = 0;
      const indexes = this.configFinal.selectAllRows
        ? rows.map((x, i) => i)
        : this.visibleRowIndexes;

      for (const { key, value } of val) {
        for (const index of indexes) {
          if (!rows[index].disableSelect && rows[index][key] === value) {
            selected[index] = true;
            counter++;
          }
        }
      }

      this.allSelectedCustom = counter && counter === this._selectableCount();
    },

    /**
     * Resets page and selects if a filter value is changes
     *
     */
    filters: {
      handler() {
        const fromStored = !!(
          this.configFinal.storeState && this.storedState.filters
        );

        // Drop the restored filters before the request: filtersFinal (and thus
        // the ajax params) still returns storedState.filters while it exists.
        if (fromStored) {
          delete this.storedState.filters;
        }

        if (this.configFinal.ajaxUrl) {
          this.pageSort = false;
          this.loadViaAjax(!fromStored, !fromStored, "FILTERS");
        }

        if (this.pageSort) {
          this.currentSortIndexes = {};
          this.resetSorts();
          this.recomputeEssentials();
        }

        if (this.configFinal.storeState) {
          localStorage.setItem(
            `vue-quintable-${this.identifier}-filters`,
            JSON.stringify(this.filtersFinal),
          );
        }
      },
      deep: true,
    },
    filtersFinal(val) {
      this.$emit("update:filters", val, "update:filters");
    },
    /**
     * Trigger reload current page without changing filter/search/page from outside
     *
     */
    updated(val) {
      if (!this.configFinal.ajaxUrl || !val) {
        return;
      }
      this.loadViaAjax(!!val.clear, true, "UPDATED");
    },

    /**
     * Set height of loader if loading is set from outside
     *
     */
    loading() {
      this.loaderHeight = this._wrapperHeight();
    },

    /**
     * Reset page and select if filtering/search is active
     *
     */
    filteredRows: {
      handler(val, old) {
        if (this.configFinal.ajaxUrl || (old && sameList(val, old))) {
          return;
        }

        if (
          this.activeRow !== null &&
          !this.visibleRowIndexes.includes(this.activeRow)
        ) {
          this.activeRow = null;
        }

        if (this.currentPage !== 1) {
          this.currentPage = 1;
        } else if (!this.configFinal.keepSelect) {
          this.resetSelect("filteredRows watcher");
        }

        const rows = [];
        const { sortedIndexes, rowsFinal } = this;
        for (let i = 0; i < val.length; i++) {
          if (val[i]) {
            const index = sortedIndexes[i.toString()];
            rows.push(rowsFinal[index ? index : i]);
          }
        }

        this.$emit("filtered:rows", rows, "filtered:rows");
      },
      immediate: true,
    },

    /**
     * Emits an event if breakpoints are changed
     *
     */
    hiddenBreakpoints(val) {
      if (!this.initBreakpoints) {
        this.$emit("change:breakpoints", val, "change:breakpoints");
      }
      this.initBreakpoints = false;
    },

    /**
     * Emits an event if a row is hovered
     *
     */
    hoveredRow(val, old) {
      if (val !== null) {
        this.$emit("hover:row", this.rowsFinal[val], "hover:row");
      }
      this._flagRow("hovered", old, val);
    },

    /**
     * Resets page and selects if a search query is entered and emits and event
     *
     */
    query(val, old) {
      this.lastQuery = old;
      // The query created() set: the load in mounted() carries it already.
      const loadsOnMount = val === this._mountQuery;
      this._mountQuery = undefined;

      if (this.configFinal.ajaxUrl) {
        this.pageSort = false;
        if (!loadsOnMount) {
          const clear = !(
            (this.configFinal.storeState || this.configFinal.urlState) &&
            this.storedState.query
          );
          clearTimeout(this.queryAjaxTimeout);
          this.queryAjaxTimeout = setTimeout(() => {
            this.loadViaAjax(clear, clear, "QUERY");
          }, this.configFinal.ajaxRequestDelay);
        }
      }

      if (
        val.length >= this.configFinal.searchLength &&
        this.lastSearchQueryUpdated !== val
      ) {
        this.$emit("update:search", val, "update:search");
        this.lastSearchQueryUpdated = val;
      } else if (this.lastSearchQueryUpdated !== null) {
        this.lastSearchQueryUpdated = null;
        this.$emit("update:search", null, "update:search");
      }

      if (this.pageSort) {
        this.currentSortIndexes = {};
        this.resetSorts();
        this.recomputeEssentials();
      }

      if (this.configFinal.storeState) {
        delete this.storedState.query;
        localStorage.setItem(
          `vue-quintable-${this.identifier}-query`,
          this.query,
        );
      }
    },

    /**
     * Resets page and selects if the number of rows per page is changed and emits and event
     *
     */
    currentRowsPerPage(val) {
      this.$emit("update:rows-per-page", val, "update:rows-per-page");

      const clear = !(
        (this.configFinal.storeState || this.configFinal.urlState) &&
        this.storedState["rows-per-page"]
      );

      if (this.configFinal.storeState) {
        delete this.storedState["rows-per-page"];
        localStorage.setItem(
          `vue-quintable-${this.identifier}-rows-per-page`,
          this.currentRowsPerPage,
        );
      }

      if (this.configFinal.ajaxUrl) {
        this.loadViaAjax(clear, clear, "PAGE_ROWS");
        return;
      }

      if (this.currentPage !== 1) {
        this.currentPage = 1;
      } else if (!this.configFinal.selectAllRows) {
        this.resetSelect("currentRowsPerPage watcher");
      }
    },

    /**
     * Reset everything if rows have been changed (e.g. [re]loaded via ajax)
     *
     */
    rows() {
      this.clearLists();
      this.initLists();
      this.activeRow = null;
      this.recomputeEssentials();

      this.$nextTick(() => {
        if (this.configFinal.defaultSelected) {
          this.allSelectedCustom = null;
          this.checkAll(true);
        }
      });
    },

    /**
     * Reset everything if config has been changed (e.g. [re]loaded via ajax)
     *
     */
    config: {
      handler(val) {
        if (typeof val !== "object") {
          throw "config must be an object";
        }

        if (this.dynamicConfig) {
          return;
        }

        this.initLists();

        this.activeRow = null;

        if (this.configFinal.ajaxUrl) {
          this.loadViaAjax(false, true, "CONFIG");
        }

        if (this.configFinal.defaultSelected) {
          this.checkAll(true);
        }
      },
      deep: true,
    },

    /**
     * Prepare the selected rows array for passing to the event and emits it
     *
     */
    selected: {
      handler(val) {
        const selected = [];
        // Raw reads (see setIfChanged in helpers.ts); the rows themselves through the proxy, as the event hands them out.
        const sortedIndexes = toRaw(this.sortedIndexes);
        const checked = toRaw(val);
        const rowsFinal = this.rowsFinal;
        for (const position in sortedIndexes) {
          const index = sortedIndexes[position];
          if (checked[index]) {
            const row = rowsFinal[index];
            if (!row.disableSelect) {
              selected.push(row);
            }
          }
        }

        if (this.configFinal.storeState) {
          localStorage.setItem(
            `vue-quintable-${this.identifier}-selected-rows`,
            JSON.stringify(val),
          );
        }

        this.$emit("input", selected);
        this.$emit("update:selected-rows", selected);
      },
      deep: true,
    },

    /**
     * Resets the row selection if page has been changed and emits an event
     *
     */
    currentPage(val) {
      this.pageOffset = 0;
      this.activeRow = null;

      this.$emit("update:page", val, "update:page");

      const clear = !(
        (this.configFinal.storeState || this.configFinal.urlState) &&
        this.storedState["current-page"]
      );

      if (this.configFinal.storeState) {
        delete this.storedState["current-page"];
        localStorage.setItem(
          `vue-quintable-${this.identifier}-current-page`,
          this.currentPage,
        );
      }

      if (this.configFinal.ajaxUrl) {
        this.resetSelect("currentPage watcher ajax");
        this.loadViaAjax(false, clear, "PAGE");
        return;
      }

      if (!this.configFinal.selectAllRows) {
        this.resetSelect("currentPage watcher");
      }

      if (this.pageSort) {
        this.currentSortIndexes = {};
        this.resetSorts();
      }

      this.recomputeEssentials();
    },

    /**
     *  Reorder the indexes of sorting if a sort column has been removed (e.g. column 1,2,3 are active, 2 has been removed, 3 has to be 2 now)
     *
     */
    customMultiSort(val) {
      if (val || Object.keys(this.currentSortIndexes).length <= 1) {
        return;
      }
      // Leaving multi sort keeps only the first sort.
      let currentItem;
      let currentIndex;
      for (const index in this.currentSortIndexes) {
        if (this.currentSortIndexes[index].order === 0) {
          currentItem = this.currentSortIndexes[index];
          currentIndex = index;
          break;
        }
      }
      this.currentSortIndexes = { [currentIndex]: currentItem };
      this.sort();
    },

    /**
     * Reset sort order on page sort change
     *
     */
    pageSort() {
      this.currentSortIndexes = {};
      this.resetSorts();
      this.recomputeEssentials();
    },

    /**
     * Reset sort order if it is changed from outside
     *
     */
    sortOrder: {
      immediate: true,
      handler() {
        this.currentSortIndexes = {};
        for (const item of this.sortOrder) {
          if (typeof item === "object") {
            this.setSortColumn(item.index, item.asc);
          } else if (typeof item === "number") {
            this.setSortColumn(item);
          }
        }
      },
    },
    activeRow(val, old) {
      const realIndex = this.visibleRowIndexes.indexOf(val);
      this.$emit("active:row", this.rowsFinal[val], "active:row", realIndex);
      this._paintRows();
      this._flagRow("active", old, val);
      // virtualScroll: the arrow keys may move the active row out of the rendered window.
      if (this.configFinal.virtualScroll && val !== null) {
        this._scrollRowIntoView(val);
      }
    },
  },
  created() {
    if (this.configFinal.storeState) {
      this._restoreState();
    }
    // urlState: the link's state wins over the stored one.
    if (this.configFinal.urlState) {
      this._readUrlState();
    }
    // What the restored state refers to may be gone since it was saved (a column, a filter).
    if (this.configFinal.storeState || this.configFinal.urlState) {
      this._validateRestoredState();
    }

    this.initLists();

    // Pre-select rows in case. (Counts the first rows by position, not the visible ones by index, as it always has.)
    const count = this.configFinal.selectAllRows
      ? this.rowsFinal.length
      : this.visibleRowIndexes.length;
    let counter = 0;
    for (let i = 0; i < count; i++) {
      if (this.rowsFinal[i].selected) {
        this.selected[i] = true;
        counter++;
      }
    }
    if (counter && counter === this._selectableCount()) {
      this.allSelectedCustom = true;
    }

    if (this.initialSearchTerm) {
      this.query = this.initialSearchTerm;
    }

    if (this.storedState.query) {
      this.query = this.storedState.query;
    } else if (this.initialSearchTerm) {
      // A new search starts on the first page with nothing selected: the stored page and rows are the old result's.
      for (const name of ["current-page", "selected-rows"]) {
        delete this.storedState[name];
        if (this.configFinal.storeState) {
          localStorage.removeItem(`vue-quintable-${this.identifier}-${name}`);
        }
      }
    }
    this._mountQuery = this.query;

    if (this.storedState["rows-per-page"]) {
      this.customRowsPerPage = this.storedState["rows-per-page"];
    }

    if (this.storedState["sort-indexes"]) {
      this.currentSortIndexes = this.storedState["sort-indexes"];
      this.sort(true);
    }

    if (this.storedState["current-page"]) {
      this.$nextTick(() => {
        this.currentPage = this.storedState["current-page"];
        // The page may be gone since (fewer rows): checked once the rows are there.
        this._checkRestoredPage(this.currentPage);
      });
    }
    this.$nextTick(this.checkStoredSelectedRows);

    if (this.configFinal.enableRowTabIndex) {
      document.addEventListener("keydown", this.checkKey);
    }

    // searchDebounce: created last, so it runs after the query watcher above and changes no event order.
    this.debouncedQuery = this.query;
    this.$watch("query", this._debounceQuery);

    // urlState: created last as well; writes the state into the address bar.
    if (this.configFinal.urlState) {
      this.$watch(() => this._urlStateParams, this._writeUrlState);
    }
  },
  mounted() {
    if (this.configFinal.ajaxUrl) {
      this.loadViaAjax(false, true, "MOUNTED");
    }
    this._schedulePins();
    if (this.configFinal.virtualScroll) {
      this._setupVirtual();
    }

    if (this.configFinal.defaultSelected) {
      this.checkAll(true);
    }

    // autoFit: refit when the container or the table changes size; the table is observed anew after each render.
    if (this.configFinal.autoFit && typeof ResizeObserver !== "undefined") {
      this._fitObserver = new ResizeObserver(() => this._scheduleFit());
      this._fitObserver.observe(this.$refs["height-wrapper"]);
      this._observeFitTable();
    }

    // Subscribe to shared breakpoint detector
    this._sharedBP = getSharedBreakpoints();
    this._sharedBP.subscribe(this._onBreakpointChange);

    if (this.configFinal.reloadOn) {
      this._offReload = this.configFinal.reloadOn(() => {
        if (this.configFinal.ajaxUrl) {
          this.loadViaAjax(false, true, "RELOAD");
        }
      });
    }
  },
  updated() {
    // A render rewrites the class of patched rows and adds or re-creates details rows: set the hover and the active
    // class on them again.
    this._paintRows();
    // column pin: new cells, or a new table after loading, need their offsets.
    this._schedulePins();
    // virtualScroll: measure the rendered rows, correct the window.
    if (this.configFinal.virtualScroll || this._virtualListening) {
      this._setupVirtual();
    }
    // autoFit: a new page or sort can bring longer values that widen the table without resizing anything observed.
    if (this.configFinal.autoFit) {
      this._observeFitTable();
      this._scheduleFit();
    }
  },
  beforeUnmount() {
    clearTimeout(this._debounceTimer);
    this._removePickerListeners();
    this._unobservePins();
    clearTimeout(this._columnFilterTimeout);
    this._teardownVirtual();
    if (this._sharedBP) {
      this._sharedBP.unsubscribe(this._onBreakpointChange);
    }
    if (this._fitObserver) {
      this._fitObserver.disconnect();
    }
    if (this._fitFrame) {
      cancelAnimationFrame(this._fitFrame);
    }
    if (typeof this._offReload === "function") {
      this._offReload();
    }
    if (this.configFinal.enableRowTabIndex) {
      document.removeEventListener("keydown", this.checkKey);
    }
  },
  methods: {
    /**
     * just a small string casting function
     *
     */
    valueToString,

    // details slot: the cells a row's details show now, its hidden columns' while it is open, then its sticky ones.
    _detailsSlotCells(rIndex) {
      const cells = [];
      for (const part of this._detailCells[rIndex] || []) {
        if (!part.open) {
          continue;
        }
        for (const rc of part.cells) {
          const index = Number(rc.cIndex);
          cells.push({
            cell: rc.cell,
            index,
            headline: this.configFinal.headlines[index],
            sticky: part.kind === "sticky",
          });
        }
      }
      return cells;
    },

    /**
     * checks if the passed cell is empty for one or all rows
     *
     */
    isColEmpty(i, rowIndex = -1) {
      const rowIndexes = rowIndex > -1 ? [rowIndex] : this.visibleRowIndexes;
      // A cell has content if it says so (isEmpty: false) or has text or html; isEmpty: true wins.
      return !rowIndexes.some((index) => {
        const cell = cellsOf(this.rowsFinal[index])[i];
        if (!cell || cell.isEmpty === true) {
          return false;
        }
        return (
          cell.isEmpty === false ||
          !!valueToString(cell.text) ||
          !!valueToString(cell.html)
        );
      });
    },

    cellFormatters(cIndex, cell) {
      const column = this.configFinal.columns[cIndex];
      if (typeof column.cellFormatter === "function") {
        // Called on the column, which a formatter may use as `this`.
        const formatted = column.cellFormatter(cell);
        return typeof formatted !== "object" ? { value: formatted } : formatted;
      }

      return valueToString(cell.html)
        ? cell.html
        : valueToString(cell.text)
          ? cell.text
          : "";
    },

    /**
     * Re-creates all rows (new keys), so they render anew after a sort, a page change or new rows
     *
     */
    recomputeEssentials() {
      const now = Date.now();
      this.essentialsKey = now;
      this.generatedUpdatedKey = now;
    },

    /**
     * Initialize nested object lists
     *
     */
    initLists() {
      if (!this.rowsFinal) {
        return;
      }

      // The table's own lists read raw; openRows replaced once (see withUpdates), as every details box reads it. The
      // rows through the proxy, which unwraps refs in them.
      const rows = this.rowsFinal;
      const { sortedIndexes, selected } = this;
      const openUpdates = new Map();
      const rawSorted = toRaw(sortedIndexes);
      const rawSelected = toRaw(selected);
      const expandedAll = this.configFinal.expandedAll;
      for (let i = 0; i < rows.length; i++) {
        const index = i.toString();

        if (typeof rawSorted[index] === "undefined") {
          sortedIndexes[index] = i;
        }

        if (typeof rawSelected[index] === "undefined") {
          selected[index] = false;
        }

        openUpdates.set(index, expandedAll || !!rows[i].expanded);
      }
      const nextOpen = withUpdates(this.openRows, openUpdates);
      if (nextOpen) {
        this.openRows = nextOpen;
      }
    },

    /**
     * Clear all relevant lists to ensure re-initialization
     *
     */
    clearLists(clearSelected = true) {
      if (clearSelected) {
        this.selected = {};
      }
      this.openRows = {};
      this.sortedIndexes = {};
    },

    /**
     * storeState / urlState: drops what a restored state refers to but the table no longer has: sorts on a column
     * that is gone, no longer sortable or has another headline now (another column at its index), more sorts than
     * one without multiSort, and column filters on a column without a filter (or with a filter of another kind).
     * The stored state is written back without them. A page beyond the last is checked once the rows are known
     * (_checkRestoredPage).
     */
    _validateRestoredState() {
      const store = (name, value) => {
        if (!this.configFinal.storeState) {
          return;
        }
        const key = `vue-quintable-${this.identifier}-${name}`;
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(value));
        }
      };

      const sorts = this.storedState["sort-indexes"];
      if (sorts) {
        let valid = Object.values(sorts)
          .filter((sort) => {
            const index = parseInt(sort.index);
            return (
              !!this.configFinal.sorts[index] &&
              (sort.headline === undefined ||
                sort.headline === this.configFinal.headlines[index])
            );
          })
          .sort((a, b) => a.order - b.order);
        if (!this.configFinal.multiSort) {
          valid = valid.slice(0, 1);
        }
        if (valid.length !== Object.keys(sorts).length) {
          const next = {};
          valid.forEach((sort, order) => {
            next[parseInt(sort.index)] = { ...sort, order };
          });
          if (valid.length) {
            this.storedState["sort-indexes"] = next;
          } else {
            delete this.storedState["sort-indexes"];
          }
          store("sort-indexes", valid.length ? next : null);
        }
      }

      const filters = this.columnFilterValues;
      const kept = Object.entries(filters).filter(([index, value]) => {
        const type = this.configFinal.filterTypes[index];
        const range = typeof value === "object" && value !== null;
        return !!type && (type === "range") === range;
      });
      if (kept.length !== Object.keys(filters).length) {
        this.columnFilterValues = Object.fromEntries(kept);
        store("column-filters", kept.length ? this.columnFilterValues : null);
      }
    },

    /**
     * storeState / urlState: a restored page beyond the last (there are fewer rows now) shows the first page. Local
     * rows are checked at once (rows that arrive later start on the first page anyway, as new rows always do); AJAX
     * rows when the server answers for that page (see loadViaAjax).
     */
    _checkRestoredPage(page) {
      if (this.configFinal.ajaxUrl) {
        this._restoredPage = page;
      } else if (this.numberOfVisibleRows && this.currentPage > this.pages) {
        this._dropRestoredPage();
      }
    },

    // The restored page is gone: the first page, and the stored state says so.
    _dropRestoredPage() {
      delete this.storedState["current-page"];
      if (this.configFinal.storeState) {
        localStorage.setItem(
          `vue-quintable-${this.identifier}-current-page`,
          1,
        );
      }
      this.currentPage = 1;
    },

    // storeState: reads the table's saved filters, search, page size, selection, page and sort.
    _restoreState() {
      const key = (name) => `vue-quintable-${this.identifier}-${name}`;
      const read = (name) => localStorage.getItem(key(name));
      // A stored object (or array), or null. A value that does not parse or has another shape is removed, so one
      // broken entry cannot break the table on every load.
      const readJson = (name, array = false) => {
        const raw = read(name);
        if (!raw) {
          return null;
        }
        try {
          const value = JSON.parse(raw);
          if (
            value &&
            typeof value === "object" &&
            Array.isArray(value) === array
          ) {
            return value;
          }
        } catch {
          // removed below
        }
        localStorage.removeItem(key(name));
        return null;
      };

      const storedFilters = readJson("filters");
      if (storedFilters) {
        // Filters set on the table but not saved keep their value.
        for (const key in this.filters) {
          if (
            Object.prototype.hasOwnProperty.call(this.filters, key) &&
            !Object.prototype.hasOwnProperty.call(storedFilters, key)
          ) {
            storedFilters[key] = this.filters[key];
          }
        }
        this.storedState.filters = storedFilters;
      }

      const query = read("query");
      if (query) {
        this.storedState.query = query;
      }

      const rowsPerPage = read("rows-per-page");
      if (rowsPerPage) {
        this.storedState["rows-per-page"] = parseInt(rowsPerPage);
      }

      const selectedRows = readJson("selected-rows");
      if (selectedRows) {
        this.storedState["selected-rows"] = selectedRows;
      }

      const page = read("current-page");
      if (page) {
        this.storedState["current-page"] = parseInt(page);
      }

      const sortIndexes = readJson("sort-indexes");
      if (sortIndexes) {
        this.storedState["sort-indexes"] = sortIndexes;
      }

      const columnWidths = this.configFinal.resizableColumns
        ? readJson("column-widths")
        : null;
      if (columnWidths) {
        this.columnWidths = columnWidths;
      }

      const columnFilters = this.configFinal.columnFilters
        ? readJson("column-filters")
        : null;
      if (columnFilters) {
        this.columnFilterValues = columnFilters;
      }

      const hiddenColumns = this.configFinal.columnPicker
        ? readJson("hidden-columns", true)
        : null;
      if (hiddenColumns) {
        this.userHiddenColumns = Object.fromEntries(
          hiddenColumns.map((index) => [index, true]),
        );
      }
    },
  },
};
</script>

<style scoped>
/* autoFit: what still overflows after the last fit level scrolls inside the container. Only then: a scroll box
   clips anything absolutely positioned in it, e.g. a dropdown opened in a cell. */
.quintable--table-container.quintable-fit-scroll {
  overflow-x: auto;
}

/* skeletonLoading: divs laid out as a table, so padding, borders and column widths come from the same `.table`
   styles the loaded table gets. */
.quintable--skeleton {
  display: table;
  border-collapse: collapse;
}
/* What Bootstrap's reboot gives thead, tbody, tr, td and th: without it the `.table` cell border has no style and
   each row is 1px lower than loaded. `:where()` keeps it below the `.table` cell rule that sets the width. */
:where(
  .quintable--skeleton--head,
  .quintable--skeleton--body,
  .quintable--skeleton--row,
  .quintable--skeleton--cell
) {
  border: 0 solid;
  border-color: inherit;
}
.quintable--skeleton--head {
  display: table-header-group;
  font-weight: bold; /* as a th, so the hidden headlines are as wide as loaded */
}
.quintable--skeleton--body {
  display: table-row-group;
}
.quintable--skeleton--row {
  display: table-row;
}
.quintable--skeleton--cell {
  display: table-cell;
  vertical-align: top;
}
.quintable--skeleton--headline {
  position: relative;
  display: inline-block;
  color: transparent;
}
.quintable--skeleton--headline::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: calc(50% - 4px);
  height: 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.15);
}
.quintable--skeleton--sorting-icon {
  display: inline-block;
  width: 1em; /* two arrows at 0.8em */
}
/* A bar 8px high whose margins keep the 1.5em line of the text it stands for, so rows are as high as loaded. */
.quintable--skeleton--bar {
  position: relative;
  display: block;
  overflow: hidden;
  width: 85%;
  height: 8px;
  margin: calc((1.5em - 8px) / 2) 0;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.08);
}
.quintable--skeleton--bar::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: quintable-shimmer 1.5s infinite linear;
}
@media (prefers-reduced-motion: reduce) {
  .quintable--skeleton--bar::after {
    animation: none;
  }
}
@keyframes quintable-shimmer {
  to {
    transform: translateX(100%);
  }
}

table.generated-table td {
  vertical-align: top;
}

.generated-cell-element {
  padding: 0.5rem 0.5rem;
}

.toggle-cell {
  width: 0;
  white-space: nowrap;
  padding: 0.5rem 0.5rem;
}

.toggle-cell.invisible > span {
  pointer-events: none;
  opacity: 0;
}

/* scrollHeight: the table scrolls in its own box; column pin: sideways in its container. */
.quintable-scroll {
  overflow: auto;
}
.quintable-scroll-x {
  overflow-x: auto;
}

/* stickyHeader: the headings stay on top while the rows scroll, the page or the table's own box. */
.quintable--sticky-header > thead {
  position: sticky;
  top: var(--quintable-sticky-top, 0);
  z-index: 2;
}
.quintable--sticky-header > thead > tr > th {
  box-shadow: inset 0 -1px 0 var(--bs-border-color);
}

/* column pin: pinned cells stay while the table scrolls sideways, above the cells that pass under them. Their
   background is Bootstrap's opaque table background; a hovered row tints them with a shadow, not a translucent
   background, so nothing shows through. A soft edge marks where the pinned cells end. */
.quintable-pin {
  position: sticky;
  z-index: 1;
}
/* Each pinned cell's offset: the widths of the pinned cells before it, measured into the table's variables. */
.quintable-pin-start-0 {
  inset-inline-start: var(--quintable-pin-start-0, 0px);
}
.quintable-pin-start-1 {
  inset-inline-start: var(--quintable-pin-start-1, 0px);
}
.quintable-pin-start-2 {
  inset-inline-start: var(--quintable-pin-start-2, 0px);
}
.quintable-pin-start-3 {
  inset-inline-start: var(--quintable-pin-start-3, 0px);
}
.quintable-pin-start-4 {
  inset-inline-start: var(--quintable-pin-start-4, 0px);
}
.quintable-pin-start-5 {
  inset-inline-start: var(--quintable-pin-start-5, 0px);
}
.quintable-pin-start-6 {
  inset-inline-start: var(--quintable-pin-start-6, 0px);
}
.quintable-pin-start-7 {
  inset-inline-start: var(--quintable-pin-start-7, 0px);
}
.quintable-pin-start-8 {
  inset-inline-start: var(--quintable-pin-start-8, 0px);
}
.quintable-pin-start-9 {
  inset-inline-start: var(--quintable-pin-start-9, 0px);
}
.quintable-pin-end-0 {
  inset-inline-end: var(--quintable-pin-end-0, 0px);
}
.quintable-pin-end-1 {
  inset-inline-end: var(--quintable-pin-end-1, 0px);
}
.quintable-pin-end-2 {
  inset-inline-end: var(--quintable-pin-end-2, 0px);
}
.quintable-pin-end-3 {
  inset-inline-end: var(--quintable-pin-end-3, 0px);
}
.quintable-pin-end-4 {
  inset-inline-end: var(--quintable-pin-end-4, 0px);
}
.quintable-pin-end-5 {
  inset-inline-end: var(--quintable-pin-end-5, 0px);
}
.quintable-pin-end-6 {
  inset-inline-end: var(--quintable-pin-end-6, 0px);
}
.quintable-pin-end-7 {
  inset-inline-end: var(--quintable-pin-end-7, 0px);
}
.quintable-pin-end-8 {
  inset-inline-end: var(--quintable-pin-end-8, 0px);
}
.quintable-pin-end-9 {
  inset-inline-end: var(--quintable-pin-end-9, 0px);
}
.quintable-pin-edge::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  pointer-events: none;
}
.quintable-pin-start.quintable-pin-edge::after {
  inset-inline-end: -6px;
  background: linear-gradient(
    to right,
    rgba(var(--bs-emphasis-color-rgb, 0, 0, 0), 0.08),
    transparent
  );
}
.quintable-pin-end.quintable-pin-edge::after {
  inset-inline-start: -6px;
  background: linear-gradient(
    to left,
    rgba(var(--bs-emphasis-color-rgb, 0, 0, 0), 0.08),
    transparent
  );
}
/* Right-to-left: the edges point the other way. */
.quintable-pin-start.quintable-pin-edge:dir(rtl)::after {
  transform: scaleX(-1);
}
.quintable-pin-end.quintable-pin-edge:dir(rtl)::after {
  transform: scaleX(-1);
}
.table-wrapper .bg-muted > td.quintable-pin {
  background-color: var(--bs-table-bg, var(--bs-body-bg));
  box-shadow: inset 0 0 0 9999px
    var(
      --quintable-row-hover-bg,
      rgba(var(--bs-emphasis-color-rgb, 0, 0, 0), 0.1)
    );
}
.table-wrapper
  .bg-muted:is(.row-active, .parent-row-active)
  > td.quintable-pin {
  background-color: var(
    --quintable-row-active-bg,
    var(--bs-primary-bg-subtle, #cfe2ff)
  );
  box-shadow: none;
}

/* resizableColumns: a grip on the end edge of each heading. Once a column was sized, the columns keep fixed
   widths and long words break instead of widening them. */
:where(.quintable--resizable > thead > tr) > th:not(.quintable-pin) {
  position: relative;
}
.quintable--resize-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  inset-inline-end: 0;
  width: 0.5rem;
  cursor: col-resize;
  touch-action: none;
}
.quintable--resize-handle:hover,
.quintable--resize-handle:focus-visible {
  outline: none;
  background: linear-gradient(
    to right,
    transparent calc(100% - 3px),
    var(--bs-primary, #0d6efd) calc(100% - 3px)
  );
}
.quintable--resize-handle:dir(rtl):hover,
.quintable--resize-handle:dir(rtl):focus-visible {
  transform: scaleX(-1);
}
/* A class only the cells of the fixed layout have: a rule on a class every cell has would be checked for every cell
   in every table, at each restyle. */
.quintable-wrap-anywhere,
.quintable--fixed-layout > thead > tr > th {
  overflow-wrap: anywhere;
}

/* virtualScroll: the rows not rendered take their room in two empty rows. The browser must not move the scroll
   position when a spacer changes (scroll anchoring): the table would answer with a new window, and so on. */
.quintable-virtual {
  overflow-anchor: none;
}
.quintable--virtual-spacer-cell {
  padding: 0;
  border: 0;
}

/* columnPicker: a disclosure button with its menu below, right-aligned. */
.quintable--column-picker {
  position: relative;
}
.quintable--column-picker > summary {
  list-style: none;
}
.quintable--column-picker > summary::-webkit-details-marker {
  display: none;
}
.quintable--column-picker--menu {
  top: 100%;
  right: 0;
  left: auto;
  max-height: 20rem;
  overflow-y: auto;
}

/* accessible: the toggle is a button that looks like the icon it holds. */
.quintable--toggle-button {
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  line-height: inherit;
}

/* accessible: what the keyboard reaches shows where focus is. */
.quintable--toggle-button:focus-visible,
.sort-header[tabindex]:focus-visible,
.page-link[tabindex]:focus-visible {
  outline: 2px solid var(--bs-focus-ring-color, rgba(13, 110, 253, 0.5));
  outline-offset: -2px;
}

.cursor-pointer {
  cursor: pointer;
}

.icon-check {
  padding: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.loader-wrapper {
  position: relative;
  min-height: 100px;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

/* Hover and active rows (default classes, both `bg-muted`). A row and its details are one surface with one tint;
   a table in the details sits on it, so its hovered row is one step darker. The active row (enableRowTabIndex) takes
   the accent and a leading edge, so it never looks like hover. Themes and dark mode come through Bootstrap's
   variables. The defaults are fallbacks, not declarations, so an app's --quintable-row-* variables win wherever it
   sets them. */
.table-wrapper .bg-muted > td {
  background-color: var(
    --quintable-row-hover-bg,
    rgba(var(--bs-emphasis-color-rgb, 0, 0, 0), 0.1)
  );
}
.table-wrapper .bg-muted:is(.row-active, .parent-row-active) > td {
  background-color: var(
    --quintable-row-active-bg,
    var(--bs-primary-bg-subtle, #cfe2ff)
  );
}
/* The edge as a background image from the border box: it runs on under the row's bottom border, unbroken into the
   details (an inset shadow would stop above it). */
.table-wrapper .bg-muted:is(.row-active, .parent-row-active) > td:first-child {
  background-image: linear-gradient(
    var(--quintable-row-active-edge, var(--bs-primary, #0d6efd)),
    var(--quintable-row-active-edge, var(--bs-primary, #0d6efd))
  );
  background-origin: border-box;
  background-repeat: no-repeat;
  background-size: 3px 100%;
}
/* The leading edge is the right one in right-to-left text. */
.table-wrapper
  .bg-muted:is(.row-active, .parent-row-active)
  > td:first-child:dir(rtl) {
  background-position: right;
}
/* A plain table in the details takes the row's tint; a coloured one (table-dark, …) keeps its background. */
.table-wrapper
  .generated-table
  :deep(
    .table:not(
      .table-primary,
      .table-secondary,
      .table-success,
      .table-info,
      .table-warning,
      .table-danger,
      .table-light,
      .table-dark
    )
  ) {
  --bs-table-bg: transparent;
}
/* An open row and its details read as one: no line between them. */
.table-wrapper .vue-quintable-row:has(+ .generated-row) > td {
  border-bottom-color: transparent;
}

.table-wrapper .select-th .pretty,
.table-wrapper .select-td .pretty {
  background: #fff;
  margin-right: 0 !important;
  width: 18px;
}

.footer {
  height: auto;
  background-color: transparent;
}

.table th {
  border-top: none;
}

/* Sort arrows stand in the text flow after a sortable heading. Hidden at rest, faint while the header row is hovered
   (always with alwaysShowSortIcons, and on touch screens, which have no hover), in full while the heading is hovered
   or sorted. A sorted one shows a single icon of its direction and the "x" that removes the sort. Neither hover nor
   sorting widens a heading, so no column moves. The icons take the heading's colour. */
.sort-header {
  cursor: pointer;
}

.sorting-icon {
  margin-left: 0.25rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.15s ease-out;
}

/* Faint. :where() adds no weight, so the full-opacity rules below win. A row's details render their icons only while
   the row is hovered (on a touch screen always), so those are faint whenever they show. Child combinators: a table
   nested in the details keeps its own setting. */
:where(
    .vue-quintable-header-row:hover > th,
    .sort-icons-visible > th,
    .generated-cell-headline,
    .sticky-cell-headline
  )
  > .sorting-icon {
  opacity: 0.4;
}

@media (hover: none) {
  .sorting-icon {
    opacity: 0.4;
  }
}

/* The icons sit a size below the heading's text, as fine as the arrows of a sort control should be. */
.sorting-icon > svg {
  font-size: 0.8em;
}

.sort-header:hover .sorting-icon,
.generated-cell-headline:hover .sorting-icon,
.sticky-cell-headline:hover .sorting-icon,
.sorting-icon.sorted {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .sorting-icon {
    transition: none;
  }
}

/* A right-aligned heading has its arrows before its text, so the text ends where its column's values do. */
.sort-header:is(.text-end, .text-right) {
  direction: rtl;
}
.sort-header:is(.text-end, .text-right) > * {
  direction: ltr;
  unicode-bidi: isolate;
}
.sort-header:is(.text-end, .text-right) > .sorting-icon {
  margin: 0 0.25rem 0 0;
}

.ajax-loader {
  font-size: 3em;
}

.generated-cell-element-content {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

/*.generated-row-cell:nth-child(odd) {*/
/*  background: rgba(255, 255, 0, 0.1);*/
/*}*/

/*.generated-row-cell:nth-child(even) {*/
/*  background: rgba(100, 100, 0, 0.1);*/
/*}*/

/*.generated-row-cell:nth-child(odd).hovered,*/
/*.generated-row-cell:nth-child(even).hovered{*/
/*	background:none;*/
/*}*/

.generated-row table tr:first-child td {
  border-top: none;
}

.quintable-sub-table {
  text-align: left;
}

nav.disabled {
  pointer-events: none;
  opacity: 0.75;
}
</style>

<style>
.tooltip-arrow {
  z-index: 1;
}

.quintable-tooltip {
  display: block !important;
  z-index: 10000;
}

.quintable-tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 4px;
  padding: 5px 10px 4px;
}

.quintable-tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.quintable-tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.quintable-tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.quintable-tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.quintable-tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.quintable-tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.quintable-tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.quintable-tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.quintable-tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.quintable-tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
}

.quintable-tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.quintable-tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.15s,
    visibility 0.15s;
}

.quintable-tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

.flex-inline {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
