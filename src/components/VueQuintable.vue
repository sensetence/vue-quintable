<template>
  <div class="table-wrapper quintable">
    <div class="breakpoints quintable--breakpoints">
      <div ref="xs"></div>
      <div ref="sm" class="d-none d-sm-block"></div>
      <div ref="md" class="d-none d-md-block"></div>
      <div ref="lg" class="d-none d-lg-block"></div>
      <div ref="xl" class="d-none d-xl-block"></div>
      <div ref="xxl" class="d-none d-xxl-block"></div>
    </div>
    <div class="header slot slot-header quintable--header">
      <slot name="header"></slot>
    </div>

    <template v-for="rIndex in visibleRowIndexes">
      <template
        v-for="(cell, cIndex) in rowsFinal[rIndex].cells
          ? rowsFinal[rIndex].cells
          : rowsFinal[rIndex]"
      >
        <div :key="'cell-content-portal-' + rIndex + '-' + cIndex">
          <portal
            :to="
              portalIdentifier +
              '-cell-content-portal-target-' +
              rIndex +
              '-' +
              cIndex
            "
          >
            <div slot-scope="options">
              <div
                class="cell-inner"
                :class="options.path + ' ' + options.path + '--quintable'"
                v-if="cell.quintable"
              >
                Nested support was removed, use slots instead!
              </div>
              <slot :cell="cell" v-else :name="'cell-complete'">
                <slot :name="'cell-content'" :cell="cell">
                  <div
                    class="cell-inner"
                    :class="
                      options.path + ' ' + options.path + '--formatted-html'
                    "
                    v-if="
                      configFinal.columns[cIndex].cellFormatter &&
                      cellFormatters(cIndex, cell).type === 'html'
                    "
                    v-html="cellFormatters(cIndex, cell).value"
                  ></div>
                  <div
                    class="cell-inner"
                    :class="
                      options.path + ' ' + options.path + '--formatted-value'
                    "
                    v-else-if="configFinal.columns[cIndex].cellFormatter"
                  >
                    {{ cellFormatters(cIndex, cell).value }}
                  </div>
                  <div
                    class="cell-inner"
                    :class="options.path + ' ' + options.path + '--html'"
                    v-else-if="cell.html"
                    v-html="cell.html"
                  ></div>
                  <div
                    class="cell-inner"
                    :class="options.path + ' ' + options.path + '--text'"
                    v-if="cell.text"
                  >
                    {{ cell.text }}
                  </div>

                  <div
                    class="cell-inner"
                    :class="options.path + ' ' + options.path + '--component'"
                    v-if="cell.component"
                  >
                    <component
                      :is="cell.component.name"
                      v-bind="cell.component.props"
                      @action="handleComponentEvent"
                    ></component>
                  </div>
                </slot>
              </slot>
            </div>
          </portal>
        </div>
      </template>
    </template>

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
        :setSearchQuery="setSearchQuery"
        :placeholder="configFinal.searchPlaceholder"
        :search-class="configFinal.searchClass"
      >
        <div
          class="quintable--search-container--input-container"
          :class="configFinal.searchClass"
        >
          <input
            type="search"
            :placeholder="configFinal.searchPlaceholder"
            v-model="query"
            class="form-control"
          />
        </div>
      </slot>
      <slot name="after-search"></slot>
    </div>
    <div class="slot slot-after-search quintable--after-search-container">
      <slot name="after-search-container"></slot>
    </div>
    <div class="clearfix quintable--table-container" ref="height-wrapper">
      <table
        class="vue-quintable table quintable--table-container--table"
        :class="tableClasses"
        v-if="!ajaxLoading"
      >
        <thead v-if="configFinal.headlines.length">
          <tr
            class="
              vue-quintable-header-row
              quintable--table-container--table--header-row
            "
          >
            <th
              class="
                placeholder-th
                toggle-th toggle-cell
                quintable--table-container--table--header-row--placeholder-th
              "
              v-if="hasGeneratedRows && !configFinal.hideRowToggle"
            >
              <wbr />
            </th>
            <th
              v-if="configFinal.select && configFinal.selectPosition === 'pre'"
              class="
                select-th
                pre
                quintable--table-container--table--header-row--select-th
                quintable--table-container--table--header-row--select-th--pre
              "
            >
              <template v-if="configFinal.selectAll && !noRows">
                <p-check
                  v-if="configFinal.prettySelect"
                  name="check"
                  class="p-icon p-smooth"
                  v-model="allSelectedProperty"
                  @change="checkAll()"
                >
                  <template slot="extra">
                    <span
                      ><font-awesome-icon
                        v-if="allSelectedProperty"
                        icon="check"
                        class="text-success icon-check"
                    /></span>
                    <span
                      ><font-awesome-icon
                        v-if="someSelected && !allSelectedProperty"
                        icon="square"
                        class="text-success icon-check"
                    /></span>
                  </template>
                </p-check>
                <label v-else class="mb-0 mt-0">
                  <input
                    type="checkbox"
                    v-model="allSelectedProperty"
                    @change="checkAll()"
                  />
                </label>
              </template>
            </th>
            <template v-for="(headline, hIndex) in configFinal.headlines">
              <th
                v-if="
                  ((configFinal.columns[hIndex] &&
                    !configFinal.columns[hIndex].breakpoint) ||
                    hiddenBreakpoints.findIndex(
                      (x) =>
                        configFinal.columns[hIndex] &&
                        x === configFinal.columns[hIndex].breakpoint
                    ) === -1) &&
                  !configFinal.columns[hIndex].sticky &&
                  !configFinal.hiddenCols[hIndex] &&
                  !emptyColumns[hIndex]
                "
                :class="headerClass[hIndex]"
                :title="configFinal.columns[hIndex].title"
                :key="'headline-' + hIndex"
                @click="setSortColumn(hIndex)"
              >
                <span
                  class="
                    headline
                    quintable--table-container--table--header-row--th--headline
                  "
                  v-html="headline"
                  v-if="showHeadlines[hIndex]"
                ></span>
                <span
                  class="
                    headline
                    quintable--table-container--table--header-row--th--headline
                  "
                  v-else
                  ><wbr
                /></span>
                <span
                  class="
                    sorting-icon
                    ms-2
                    quintable--table-container--table--header-row--th--sorting-icon
                  "
                  v-if="configFinal.sorts[hIndex]"
                >
                  <font-awesome-icon
                    v-if="!currentSortIndexes[hIndex]"
                    icon="sort"
                    class="text-primary"
                  />
                  <font-awesome-icon
                    v-if="
                      currentSortIndexes[hIndex] &&
                      currentSortIndexes[hIndex].asc
                    "
                    icon="sort-amount-down-alt"
                    class="text-primary"
                  />
                  <font-awesome-icon
                    v-if="
                      currentSortIndexes[hIndex] &&
                      !currentSortIndexes[hIndex].asc
                    "
                    icon="sort-amount-down"
                    class="text-primary"
                  />
                  <span
                    v-if="currentSortIndexes[hIndex]"
                    @click.stop.prevent="removeSort(hIndex)"
                    class="ms-1 text-muted"
                  >
                    <span
                      class="badge bg-info text-white"
                      v-if="numberOfSorts > 1"
                    >
                      {{ currentSortIndexes[hIndex].order + 1 }}
                    </span>
                    <small v-else>
                      <font-awesome-icon icon="times" />
                    </small>
                  </span>
                </span>
              </th>
            </template>
            <th
              v-if="configFinal.select && configFinal.selectPosition === 'post'"
              class="
                select-th
                post
                quintable--table-container--table--header-row--select-th
                quintable--table-container--table--header-row--select-th--post
              "
            >
              <template v-if="configFinal.selectAll && !noRows">
                <p-check
                  v-if="configFinal.prettySelect"
                  name="check"
                  class="p-icon p-smooth"
                  v-model="allSelectedProperty"
                  @change="checkAll()"
                >
                  <template slot="extra">
                    <span
                      ><font-awesome-icon
                        v-if="allSelectedProperty"
                        icon="check"
                        class="text-success icon-check"
                    /></span>
                    <span
                      ><font-awesome-icon
                        v-if="someSelected && !allSelectedProperty"
                        icon="square"
                        class="text-success icon-check"
                    /></span>
                  </template>
                </p-check>
                <label v-else class="mb-0 mt-0">
                  <input
                    type="checkbox"
                    v-model="allSelectedProperty"
                    @change="checkAll()"
                  />
                </label>
              </template>
            </th>
          </tr>
        </thead>
        <tbody
          @mouseleave="onMouseleaveTable"
          class="quintable--table-container--table--tbody"
        >
          <template v-for="rIndex in visibleRowIndexes">
            <tr
              class="
                vue-quintable-row
                quintable--table-container--table--tbody--row
              "
              v-tooltip="{
                placement: 'top',
                content: rowsFinal[rIndex].tooltip,
                trigger: rowsFinal[rIndex].tooltip ? 'hover' : 'manual',
                offset: 5,
              }"
              :style="hiddenColumns[rIndex] > 0 ? 'cursor:pointer;' : ''"
              :ref="'row-highlighted-on-hover-' + rIndex"
              :key="
                'vue-quintable-' +
                uuid +
                '-row-' +
                rIndex +
                '-' +
                indexesUpdatedKey
              "
              @click="onRowClick($event, rIndex)"
              :class="
                hoveredRow === rIndex
                  ? configFinal.hoverClass +
                    (rowsFinal[rIndex].classes
                      ? ' ' + rowsFinal[rIndex].classes
                      : '')
                  : rowsFinal[rIndex].classes
                  ? rowsFinal[rIndex].classes
                  : ''
              "
              :id="'vue-quintable-' + uuid + '-row-' + rIndex"
              @mouseenter="onMouseenterRow(rIndex)"
            >
              <td
                class="
                  toggle toggle-td toggle-cell
                  quintable--table-container--table--tbody--row--toggle-td
                "
                v-if="hasGeneratedRows && !configFinal.hideRowToggle"
              >
                <span v-if="hiddenColumns[rIndex] > 0">
                  <span v-if="!openRows[rIndex]"
                    ><font-awesome-icon
                      fixed-width
                      :icon="configFinal.collapsedRowIcon"
                    ></font-awesome-icon
                  ></span>
                  <span v-else
                    ><font-awesome-icon
                      fixed-width
                      :icon="configFinal.expandedRowIcon"
                    ></font-awesome-icon
                  ></span>
                </span>
              </td>
              <td
                v-if="
                  configFinal.select && configFinal.selectPosition === 'pre'
                "
                class="
                  select-td
                  pre
                  quintable--table-container--table--tbody--row--select-td
                  quintable--table-container--table--tbody--row--select-td--pre
                "
                :class="{ 'disabled-select': rowsFinal[rIndex].disableSelect }"
              >
                <template v-if="!rowsFinal[rIndex].disableSelect">
                  <p-check
                    v-if="configFinal.prettySelect"
                    name="check"
                    class="p-icon"
                    v-model="selected[rIndex]"
                    @change="checkListener($event, rIndex)"
                  >
                    <template slot="extra">
                      <span
                        ><font-awesome-icon
                          v-if="selected[rIndex]"
                          icon="check"
                          class="text-success icon-check"
                      /></span>
                    </template>
                  </p-check>
                  <label v-else class="mb-0 mt-0">
                    <input
                      type="checkbox"
                      v-model="selected[rIndex]"
                      @change="checkListener($event, rIndex)"
                    />
                  </label>
                </template>
              </td>

              <template
                v-for="(cell, cIndex) in rowsFinal[rIndex].cells
                  ? rowsFinal[rIndex].cells
                  : rowsFinal[rIndex]"
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
                    cellClassesParsed[rIndex][cIndex] +
                    ' ' +
                    configFinal.columnClasses[cIndex]
                  "
                  v-if="
                    !configFinal.hiddenCols[cIndex] &&
                    !emptyColumns[cIndex] &&
                    configFinal.columns[cIndex] &&
                    cell &&
                    hiddenBreakpoints.findIndex(
                      (x) => x === configFinal.columns[cIndex].breakpoint
                    ) === -1 &&
                    configFinal.columns[cIndex].breakpoint !== 'all' &&
                    !configFinal.stickyCols[cIndex]
                  "
                  @click="onCellClick(cell)"
                  :key="
                    'vue-quintable-' + uuid + '-cell-' + rIndex + '-' + cIndex
                  "
                  :id="
                    'vue-quintable-' + uuid + '-cell-' + rIndex + '-' + cIndex
                  "
                >
                  <portal-target
                    v-if="
                      configFinal.columns[cIndex] &&
                      cell &&
                      hiddenBreakpoints.findIndex(
                        (x) => x === configFinal.columns[cIndex].breakpoint
                      ) === -1 &&
                      configFinal.columns[cIndex].breakpoint !== 'all' &&
                      !configFinal.stickyCols[cIndex]
                    "
                    :name="
                      portalIdentifier +
                      '-cell-content-portal-target-' +
                      rIndex +
                      '-' +
                      cIndex
                    "
                    :slot-props="{
                      path: 'quintable--table-container--table--tbody--row--cell--inner-cell',
                    }"
                  ></portal-target>
                </td>
              </template>

              <td
                v-if="
                  configFinal.select && configFinal.selectPosition === 'post'
                "
                class="
                  select-td
                  post
                  quintable--table-container--table--tbody--row--select-td
                  quintable--table-container--table--tbody--row--select-td--post
                "
                :class="{ 'disabled-select': rowsFinal[rIndex].disableSelect }"
              >
                <template v-if="!rowsFinal[rIndex].disableSelect">
                  <p-check
                    v-if="configFinal.prettySelect"
                    name="check"
                    class="p-icon"
                    v-model="selected[rIndex]"
                    @change="checkListener($event, rIndex)"
                  >
                    <template slot="extra">
                      <span
                        ><font-awesome-icon
                          v-if="selected[rIndex]"
                          icon="check"
                          class="text-success icon-check"
                      /></span>
                    </template>
                  </p-check>
                  <label v-else class="mb-0 mt-0">
                    <input
                      type="checkbox"
                      v-model="selected[rIndex]"
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
                @mouseenter="onMouseenterRow(rIndex)"
                @click="onRowClick($event, rIndex)"
                :ref="'generated-row-highlighted-on-hover-' + rIndex"
                :key="
                  'generated-row-' +
                  rIndex +
                  '-' +
                  rowsUpdatedKey +
                  '-' +
                  generatedUpdatedKey
                "
                class="
                  generated-row
                  quintable--table-container--table--tbody--generated-row
                "
                v-if="
                  (generatedUpdatedKey &&
                    openRows[rIndex] &&
                    Object.keys(generatedRows[rIndex]).length) ||
                  Object.keys(stickyRows[rIndex]).length
                "
              >
                <td :colspan="configFinal.number + 1" class="ps-0 pe-0 pt-0">
                  <div
                    class="
                      mb-0
                      generated-table
                      quintable--table-container--table--tbody--generated-row--generated-table
                    "
                  >
                    <div
                      class="
                        d-flex
                        generated-row-cell
                        quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell
                      "
                      :class="
                        hoveredRow === rIndex ? configFinal.hoverClass : ''
                      "
                    >
                      <div
                        v-if="
                          !configFinal.hideRowToggle &&
                          generatedRows[rIndex] &&
                          Object.keys(generatedRows[rIndex]).length
                        "
                        class="toggle-cell"
                      ></div>
                      <div>
                        <div
                          class="
                            generated-cell-element generated-cell-headline
                            quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline
                          "
                          @click="setSortColumn(cIndex)"
                          v-show="openRows[rIndex]"
                          :class="configFinal.columnClasses[cIndex]"
                          :key="
                            'vue-quintable-' +
                            uuid +
                            '-generated-row-cell-headline' +
                            rIndex +
                            '-' +
                            cIndex +
                            '-' +
                            generatedUpdatedKey
                          "
                          :id="
                            'vue-quintable-' +
                            uuid +
                            '-generated-row-cell-headline' +
                            rIndex +
                            '-' +
                            cIndex
                          "
                          v-for="(cell, cIndex) in generatedRows[rIndex]"
                        >
                          <strong
                            v-html="configFinal.headlines[cIndex]"
                            v-if="showHeadlines[cIndex]"
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
                              configFinal.sorts[cIndex] && hoveredRow === rIndex
                            "
                          >
                            <font-awesome-icon
                              v-if="!currentSortIndexes[cIndex]"
                              icon="sort"
                              class="text-primary"
                            />
                            <font-awesome-icon
                              v-if="
                                currentSortIndexes[cIndex] &&
                                currentSortIndexes[cIndex].asc
                              "
                              icon="sort-amount-down-alt"
                              class="text-primary"
                            />
                            <font-awesome-icon
                              v-if="
                                currentSortIndexes[cIndex] &&
                                !currentSortIndexes[cIndex].asc
                              "
                              icon="sort-amount-down"
                              class="text-primary"
                            />
                            <span
                              v-if="currentSortIndexes[cIndex]"
                              @click.stop.prevent="removeSort(cIndex)"
                              class="ms-1 text-muted"
                            >
                              <span
                                class="badge bg-info text-white"
                                v-if="numberOfSorts > 1"
                              >
                                {{ currentSortIndexes[cIndex].order + 1 }}
                              </span>
                              <small v-else>
                                <font-awesome-icon icon="times" />
                              </small>
                            </span>
                          </span>
                        </div>
                        <div
                          class="
                            generated-cell-element
                            sticky-cell-headline
                            quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline
                          "
                          @click="setSortColumn(cIndex)"
                          :class="configFinal.columnClasses[cIndex]"
                          :key="
                            'vue-quintable-' +
                            uuid +
                            '-sticky-row-cell-headline' +
                            rIndex +
                            '-' +
                            cIndex
                          "
                          :id="
                            'vue-quintable-' +
                            uuid +
                            '-sticky-row-cell-headline' +
                            rIndex +
                            '-' +
                            cIndex
                          "
                          v-for="(cell, cIndex) in stickyRows[rIndex]"
                        >
                          <strong
                            v-html="configFinal.headlines[cIndex]"
                            v-if="showHeadlines[cIndex]"
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
                              configFinal.sorts[cIndex] && hoveredRow === rIndex
                            "
                          >
                            <font-awesome-icon
                              v-if="!currentSortIndexes[cIndex]"
                              icon="sort"
                              class="text-primary"
                            />
                            <font-awesome-icon
                              v-if="
                                currentSortIndexes[cIndex] &&
                                currentSortIndexes[cIndex].asc
                              "
                              icon="sort-amount-down-alt"
                              class="text-primary"
                            />
                            <font-awesome-icon
                              v-if="
                                currentSortIndexes[cIndex] &&
                                !currentSortIndexes[cIndex].asc
                              "
                              icon="sort-amount-down"
                              class="text-primary"
                            />
                            <span
                              v-if="currentSortIndexes[cIndex]"
                              @click.stop.prevent="removeSort(cIndex)"
                              class="ms-1 text-muted"
                            >
                              <span
                                class="badge bg-info text-white"
                                v-if="numberOfSorts > 1"
                              >
                                {{ currentSortIndexes[cIndex].order + 1 }}
                              </span>
                              <small v-else>
                                <font-awesome-icon icon="times" />
                              </small>
                            </span>
                          </span>
                        </div>
                      </div>
                      <div>
                        <div
                          :class="
                            configFinal.columnClasses[cIndex] +
                            ' ' +
                            cellClassesParsed[rIndex][cIndex]
                          "
                          :key="
                            'vue-quintable-' +
                            uuid +
                            '-generated-row-cell-' +
                            rIndex +
                            '-' +
                            cIndex +
                            '-' +
                            generatedUpdatedKey
                          "
                          :id="
                            'vue-quintable-' +
                            uuid +
                            '-generated-row-cell-' +
                            rIndex +
                            '-' +
                            cIndex
                          "
                          v-show="openRows[rIndex]"
                          v-for="(cell, cIndex) in generatedRows[rIndex]"
                          class="
                            generated-cell-element
                            generated-cell-element-content
                            generated-cell-content
                            quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content
                          "
                          @click="onCellClick(cell)"
                          v-tooltip="{
                            placement: 'top',
                            content: cell.tooltip,
                            trigger: cell.tooltip ? 'hover' : 'manual',
                          }"
                        >
                          <slot :cell="cell" :name="'generated-cell-complete'">
                            <slot :cell="cell" :name="'generated-cell-content'">
                              <portal-target
                                :name="
                                  portalIdentifier +
                                  '-cell-content-portal-target-' +
                                  rIndex +
                                  '-' +
                                  cIndex
                                "
                                :slot-props="{
                                  path: 'quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner',
                                }"
                              ></portal-target>
                            </slot>
                          </slot>
                        </div>
                        <div
                          :class="
                            configFinal.columnClasses[cIndex] +
                            ' ' +
                            cellClassesParsed[rIndex][cIndex]
                          "
                          :key="
                            'vue-quintable-' +
                            uuid +
                            '-sticky-row-cell-' +
                            rIndex +
                            '-' +
                            cIndex
                          "
                          :id="
                            'vue-quintable-' +
                            uuid +
                            '-sticky-row-cell-' +
                            rIndex +
                            '-' +
                            cIndex
                          "
                          v-for="(cell, cIndex) in stickyRows[rIndex]"
                          class="
                            generated-cell-element
                            generated-cell-element-content
                            sticky-cell-content
                            quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content
                          "
                          @click="onCellClick(cell)"
                          v-tooltip="{
                            placement: 'top',
                            content: cell.tooltip,
                            trigger: cell.tooltip ? 'hover' : 'manual',
                          }"
                        >
                          <slot :cell="cell" :name="'sticky-cell-complete'">
                            <slot :cell="cell" :name="'sticky-cell-content'">
                              <portal-target
                                :name="
                                  portalIdentifier +
                                  '-cell-content-portal-target-' +
                                  rIndex +
                                  '-' +
                                  cIndex
                                "
                                :slot-props="{
                                  path: 'quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner',
                                }"
                              ></portal-target>
                            </slot>
                          </slot>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>

      <template v-if="noRows && !ajaxLoading">
        <div
          class="
            clearfix
            slot-no-results slot
            quintable--table-container--no-results
          "
        >
          <slot name="no-results">
            <div
              class="
                text-center
                p-3
                quintable--table-container--no-results--results
              "
            >
              <em v-html="configFinal.emptyPlaceholder"></em>
            </div>
          </slot>
          <hr />
        </div>
      </template>
    </div>

    <div v-if="ajaxLoading" class="slot-loading slot quintable--loading">
      <slot name="loading">
        <div
          class="loader-wrapper quintable--loading--loader-wrapper"
          :style="'height:' + loaderHeight + 'px;'"
        >
          <div
            class="
              loader
              text-center
              py-4
              quintable--loading--loader-wrapper--loader
            "
          >
            <font-awesome-icon
              icon="circle-notch"
              spin
              class="
                ajax-loader
                quintable--loading--loader-wrapper--loader--ajax-loader
              "
            />
          </div>
        </div>
      </slot>
    </div>

    <div class="clearfix quintable--table-footer-container">
      <div class="row">
        <div class="col-lg-4 quintable--table-footer-container--sort-container">
          <div
            class="
              pb-lg-0 pb-3
              float-start
              quintable--table-footer-container--sort-container--sort-select
            "
            v-if="configFinal.multiSortSelect || configFinal.pageSortSelect"
          >
            <span
              :class="configFinal.pageSort ? 'me-3' : ''"
              v-if="configFinal.multiSortSelect"
              ><p-check
                class="
                  p-switch
                  quintable--table-footer-container--sort-container--sort-select--multi-sort-select
                "
                v-model="multiSort"
                value="true"
                >{{ configFinal.multiSortPlaceholder }}</p-check
              ></span
            >
            <p-check
              v-if="configFinal.pageSortSelect"
              class="
                p-switch
                quintable--table-footer-container--sort-container--sort-select--page-sort-select
              "
              v-model="pageSort"
              value="true"
              >{{ configFinal.pageSortPlaceholder }}</p-check
            >
          </div>
        </div>
        <div
          class="col-lg-8 quintable--table-footer-container--pagination-wrapper"
        >
          <div
            class="
              float-lg-end
              me-3
              pagination-container
              quintable--table-footer-container--pagination-wrapper--pagination-container
            "
            v-if="configFinal && configFinal.pagination"
          >
            <div
              v-if="configFinal.rowsSelect"
              class="
                mb-2
                d-inline-block
                me-3
                align-middle
                quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select
              "
            >
              <span
                class="
                  d-inline-block
                  align-middle
                  me-2
                  quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder
                "
                v-html="configFinal.rowsPlaceholder"
              ></span>
              <v-select
                class="
                  d-inline-block
                  align-middle
                  quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select
                "
                :options="paginationOptionsFilled"
                v-model="currentRowsPerPageProperty"
                :clearable="false"
              />
            </div>
            <nav
              v-if="configFinal && configFinal.pagination && pages > 1"
              class="
                d-inline-block
                align-middle
                mb-2
                quintable--table-footer-container--pagination-wrapper--pagination-container--nav
              "
              :class="{ 'me-3': numberOfVisibleRows, disabled: ajaxLoading }"
            >
              <ul
                class="
                  pagination
                  mb-0
                  quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination
                "
              >
                <li
                  class="page-item"
                  v-if="pages > pageRange"
                  :class="{ disabled: currentPage <= 1 }"
                  @click="gotoPage('first')"
                >
                  <span class="page-link">
                    <font-awesome-icon icon="angle-double-left" />
                  </span>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: currentPage <= 1 }"
                  @click="gotoPage('prev')"
                >
                  <span class="page-link">
                    <font-awesome-icon icon="angle-left" />
                  </span>
                </li>
                <li
                  class="page-item"
                  v-if="pageRange < pages && visiblePages[0] > 1"
                  @click="updatePageOffset(-1)"
                >
                  <span class="page-link"> ... </span>
                </li>

                <li
                  :key="'pagination-item-' + page"
                  class="page-item"
                  :class="{ active: page === currentPage }"
                  v-for="page in visiblePages"
                  @click="gotoPage(page)"
                >
                  <span class="page-link">
                    {{ page }}
                  </span>
                </li>

                <li
                  class="page-item"
                  v-if="
                    pageRange < pages &&
                    visiblePages[visiblePages.length - 1] < pages
                  "
                  @click="updatePageOffset(1)"
                >
                  <span class="page-link"> ... </span>
                </li>

                <li
                  class="page-item"
                  :class="{ disabled: pages === currentPage }"
                  @click="gotoPage('next')"
                >
                  <span class="page-link">
                    <font-awesome-icon icon="angle-right" />
                  </span>
                </li>
                <li
                  class="page-item"
                  v-if="pages > pageRange"
                  :class="{ disabled: pages === currentPage }"
                  @click="gotoPage('last')"
                >
                  <span class="page-link">
                    <font-awesome-icon icon="angle-double-right" />
                  </span>
                </li>
              </ul>
            </nav>

            <span
              class="
                d-inline-block
                align-middle
                mb-2
                quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows
              "
              v-if="numberOfVisibleRows"
              >{{ firstVisibleRow }}-{{ lastVisibleRow }}
              {{ configFinal.numberOfVisibleRowsFillerWord }}
              {{ numberOfVisibleRows }}</span
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
import fuzzy from "fuzzy.js";
import axios from "axios";
import randomUUID from "uuid/v4";

export default {
  name: "VueQuintable",
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
      type: Function,
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
  data() {
    return {
      rowsUpdatedKey: Date.now(),
      indexesUpdatedKey: Date.now(),
      generatedUpdatedKey: Date.now(),
      hoveredRow: null,
      allSelectedCustom: null,
      selected: {},
      openRows: {},
      sortedIndexes: {},
      currentSortIndexes: {},
      query: "",
      currentPage: 1,
      paginationOptions: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 50, 100,
      ],
      fetching: false,
      ajaxRows: [],
      ajaxPages: 0,
      ajaxAll: 0,
      customRowsPerPage: null,
      customMultiSort: null,
      customPageSort: null,
      hiddenBreakpoints: [],
      initBreakpoints: true,
      breakpointTimeout: null,
      cancelSource: null,
      lastQuery: "",
      pageOffset: 0,
      uuid: randomUUID(),
      loaderHeight: 0,
      defaultOperator: "equal",
      queryAjaxTimeout: null,
      lastSearchQueryUpdated: null,
      operatorFunctions: {
        equal: (a, b) => {
          return b === a;
        },
        greater: (a, b) => {
          return b > a;
        },
        less: (a, b) => {
          return b < a;
        },
        greaterEqual: (a, b) => {
          return b >= a;
        },
        lessEqual: (a, b) => {
          return b <= a;
        },
        contains: (a, b) => {
          if (!Array.isArray(b) && typeof b !== "string") {
            return false;
          }

          return b.indexOf(a) !== -1;
        },

        notContains: (a, b) => {
          if (!Array.isArray(b) && typeof b !== "string") {
            return false;
          }

          return b.indexOf(a) === -1;
        },

        startsWith: (a, b) => {
          if (typeof b !== "string") {
            return false;
          }

          return b.indexOf(a) === 0;
        },

        endsWitch: (a, b) => {
          if (typeof b !== "string") {
            return false;
          }

          return b.indexOf(a, this.length - a.length) !== -1;
        },

        matches(regex, b) {
          if (!(regex instanceof RegExp) || typeof b !== "string") {
            return false;
          }
          return regex.test(b);
        },
      },
      storedState: {},
    };
  },

  computed: {
    portalIdentifier() {
      return randomUUID();
    },
    /**
     * Just a debug flag
     *
     */
    DEBUG() {
      return this.verbose;
    },

    /**
     * Checks if an axios instance has been passed to quintable or the default axios has to be used
     *
     */
    axiosFinal() {
      return this.axios ? this.axios : axios;
    },

    /**
     * Set default values for all possible config values
     *
     */
    configFinal() {
      if (!this.config) {
        return {};
      }

      let pagination = false;
      if (this.config.pagination === true) {
        pagination = 25;
      } else if (this.config.pagination) {
        let i = 0;
        while (
          this.paginationOptions[i] <= this.config.pagination &&
          i < this.paginationOptions.length
        ) {
          i++;
        }
        pagination =
          this.paginationOptions[
            Math.min(i - 1, this.paginationOptions.length - 1)
          ];
      }

      let numberOfVisibleRowsFillerWord = "of";

      if (this.config.numberOfVisibleRowsFillerWord) {
        numberOfVisibleRowsFillerWord =
          this.config.numberOfVisibleRowsFillerWord;
      }

      let select = false;
      if (this.config.select) {
        select = true;
      }

      let ajaxRequestDelay = 250;
      if (this.config.ajaxRequestDelay) {
        ajaxRequestDelay = this.config.ajaxRequestDelay;
      }

      let hoverClass = "bg-muted";
      if (this.config.hoverClass === false) {
        hoverClass = "";
      } else if (this.config.hoverClass && this.config.hoverClass !== true) {
        hoverClass = this.config.hoverClass;
      }

      let multiSort = false;
      if (this.config.multiSort) {
        multiSort = true;
      }

      let pageSort = false;
      if (this.config.pageSort) {
        pageSort = true;
      }

      let multiSortSelect = false;
      if (this.config.multiSortSelect) {
        multiSortSelect = true;
      }

      let pageSortSelect = false;
      if (this.config.pageSortSelect) {
        pageSortSelect = true;
      }

      let ajaxUrl = false;
      if (this.config.ajaxUrl) {
        ajaxUrl = this.config.ajaxUrl;
      }

      let selectPosition = "post";
      if (["pre", "post"].includes(this.config.selectPosition)) {
        selectPosition = this.config.selectPosition;
      }

      let expandedAll = false;
      if (this.config.expandedAll) {
        expandedAll = true;
      }

      let useFuzzySearch = false;
      if (this.config.useFuzzySearch) {
        useFuzzySearch = true;
      }
      let prettySelect = false;
      if (this.config.prettySelect) {
        prettySelect = true;
      }

      let rowsSelect = false;
      if (this.config.rowsSelect) {
        rowsSelect = true;
      }

      let disallowAllOption = false;
      if (this.config.disallowAllOption) {
        disallowAllOption = true;
      }

      let hideEmptyColumns = false;
      if (this.config.hideEmptyColumns) {
        hideEmptyColumns = true;
      }

      let ignoreSortEmptyColumns = "none";
      if (
        ["none", "active", "all"].includes(this.config.ignoreSortEmptyColumns)
      ) {
        ignoreSortEmptyColumns = this.config.ignoreSortEmptyColumns;
      }

      let search = false;
      if (this.config.search) {
        search = true;
      }

      let searchLength = 1;
      if (this.config.searchLength) {
        searchLength = this.config.searchLength;
      }

      let searchPlaceholder = "Search...";
      if (this.config.searchPlaceholder) {
        searchPlaceholder = this.config.searchPlaceholder;
      }

      let multiSortPlaceholder = "Multiple sort";
      if (this.config.multiSortPlaceholder) {
        multiSortPlaceholder = this.config.multiSortPlaceholder;
      }

      let pageSortPlaceholder = "Page sort";
      if (this.config.pageSortPlaceholder) {
        pageSortPlaceholder = this.config.pageSortPlaceholder;
      }

      let filterRelation = "AND";
      if (["AND", "OR"].includes(this.config.filterRelation)) {
        filterRelation = this.config.filterRelation;
      }

      let filterGroupRelation = "AND";
      if (["AND", "OR"].includes(this.config.filterGroupRelation)) {
        filterGroupRelation = this.config.filterGroupRelation;
      }

      let rowsPlaceholder = "Rows per page:";
      if (this.config.rowsPlaceholder) {
        rowsPlaceholder = this.config.rowsPlaceholder;
      }

      let emptyPlaceholder = "No rows...";
      if (this.config.emptyPlaceholder) {
        emptyPlaceholder = this.config.emptyPlaceholder;
      }

      let selectAll = false;
      if (this.config.selectAll) {
        selectAll = true;
      }

      let selectAllRows = false;
      if (this.config.selectAllRows) {
        selectAllRows = true;
      }

      if (ajaxUrl && selectAllRows) {
        console.warn(
          "Option selectAllRows was deactivated automatically because ajaxUrl is set!"
        );
        selectAllRows = false;
      }

      let storeState = false;
      if (this.config.storeState) {
        storeState = true;
      }

      if (!this.identifier && this.config.storeState) {
        console.warn(
          "Option storeState was deactivated automatically because table identifier is not set!"
        );
        storeState = false;
      }

      const testLocalStorage = "test-local-storage";
      try {
        localStorage.setItem(testLocalStorage, testLocalStorage);
        localStorage.removeItem(testLocalStorage);
      } catch (e) {
        console.warn(
          "Option storeState was deactivated automatically because local storage is not available!"
        );
        storeState = false;
      }

      let defaultSelected = false;
      if (this.config.defaultSelected) {
        defaultSelected = true;
      }

      let hideRowToggle = false;
      if (this.config.hideRowToggle) {
        hideRowToggle = true;
      }

      let expandedRowIcon = "chevron-up";
      if (
        this.config.expandedRowIcon &&
        typeof this.config.expandedRowIcon === "string" &&
        ["chevron-up", "minus", "caret-up", "eye-slash"].includes(
          this.config.expandedRowIcon.toLowerCase()
        )
      ) {
        expandedRowIcon = this.config.expandedRowIcon.toLowerCase();
      }

      let collapsedRowIcon = "chevron-down";
      if (
        this.config.collapsedRowIcon &&
        typeof this.config.collapsedRowIcon === "string" &&
        ["chevron-down", "plus", "caret-down", "eye"].includes(
          this.config.collapsedRowIcon.toLowerCase()
        )
      ) {
        collapsedRowIcon = this.config.collapsedRowIcon.toLowerCase();
      }

      let pageRange = 5;
      if (this.config.pageRange) {
        pageRange = this.config.pageRange;
      }

      let searchClass = "col-12";
      if (this.config.searchClass) {
        searchClass = this.config.searchClass;
      }

      let searchContainerClass = "row";
      if (this.config.searchContainerClass) {
        searchContainerClass = this.config.searchContainerClass;
      }

      let requestMethod = "GET";
      if (
        this.config.requestMethod &&
        typeof this.config.requestMethod === "string" &&
        ["POST", "GET"].includes(this.config.requestMethod.toUpperCase())
      ) {
        requestMethod = this.config.requestMethod.toUpperCase();
      }

      let number = 0;
      let headlines = [];
      let breakpoints = [];
      let hiddenCols = [];
      let sorts = [];
      let stickyCols = [];
      let alignments = [];
      let columnClasses = [];
      let ignoreEmpty = [];

      let columns = null;
      if (this.config.columns) {
        number = this.config.columns.length;

        for (let i = 0; i < this.config.columns.length; i++) {
          columnClasses[i] = "";
          if (this.config.columns[i] && this.config.columns[i].headline) {
            headlines[i] = this.config.columns[i].headline;
            columnClasses[i] += this.config.columns[i].headline
              .replace(/([a-z])([A-Z])/g, "$1-$2")
              .replace(/\s+/g, "-")
              .toLowerCase();
          } else {
            headlines[i] = "";
          }

          columnClasses[i] += " column-" + (i + 1);

          if (this.config.columns[i].classes) {
            columnClasses[i] += " " + this.config.columns[i].classes;
          }

          if (this.config.columns[i] && this.config.columns[i].breakpoint) {
            breakpoints[i] = this.config.columns[i].breakpoint;
          } else {
            breakpoints[i] = "";
          }

          if (this.config.columns[i] && this.config.columns[i].sort) {
            if (
              this.config.columns[i].firstSortDirection &&
              typeof this.config.columns[i].firstSortDirection === "string" &&
              ["DESC", "ASC"].includes(
                this.config.columns[i].firstSortDirection.toUpperCase()
              )
            ) {
              sorts[i] =
                this.config.columns[i].firstSortDirection.toUpperCase();
            } else {
              sorts[i] = true;
            }
          } else {
            sorts[i] = false;
          }

          if (this.config.columns[i] && this.config.columns[i].ignoreEmpty) {
            ignoreEmpty[i] = true;
          } else {
            ignoreEmpty[i] = false;
          }

          if (this.config.columns[i] && this.config.columns[i].sticky) {
            stickyCols[i] = true;
          } else {
            stickyCols[i] = false;
          }

          if (this.config.columns[i] && this.config.columns[i].hidden) {
            hiddenCols[i] = true;
          } else {
            hiddenCols[i] = false;
          }

          if (this.config.columns[i] && this.config.columns[i].align) {
            alignments[i] = this.config.columns[i].align;
          } else {
            alignments[i] = false;
          }
        }

        columns = this.config.columns;
      }

      return {
        headlines: headlines,
        columnClasses: columnClasses,
        sorts: sorts,
        pageSort: pageSort,
        multiSort: multiSort,
        pageSortSelect: pageSortSelect,
        multiSortSelect: multiSortSelect,
        filterGroupRelation: filterGroupRelation,
        filterRelation: filterRelation,
        rowsSelect: rowsSelect,
        disallowAllOption: disallowAllOption,
        defaultSelected: defaultSelected,
        searchLength: searchLength,
        search: search,
        searchPlaceholder: searchPlaceholder,
        useFuzzySearch: useFuzzySearch,
        ajaxUrl: ajaxUrl,
        pageSortPlaceholder: pageSortPlaceholder,
        multiSortPlaceholder: multiSortPlaceholder,
        rowsPlaceholder: rowsPlaceholder,
        emptyPlaceholder: emptyPlaceholder,
        stickyCols: stickyCols,
        alignments: alignments,
        breakpoints: breakpoints,
        hiddenCols: hiddenCols,
        ignoreEmpty: ignoreEmpty,
        hideEmptyColumns: hideEmptyColumns,
        ignoreSortEmptyColumns: ignoreSortEmptyColumns,
        pagination: pagination,
        numberOfVisibleRowsFillerWord: numberOfVisibleRowsFillerWord,
        select: select,
        selectAll: selectAll,
        selectAllRows: selectAllRows,
        hoverClass: hoverClass,
        expandedAll: expandedAll,
        pageRange: pageRange,
        prettySelect: prettySelect,
        number: number,
        columns: columns,
        hideRowToggle: hideRowToggle,
        expandedRowIcon: expandedRowIcon,
        collapsedRowIcon: collapsedRowIcon,
        selectPosition: selectPosition,
        searchClass: searchClass,
        searchContainerClass: searchContainerClass,
        requestMethod: requestMethod,
        storeState: storeState,
        ajaxRequestDelay: ajaxRequestDelay,
      };
    },

    /**
     * Checks which rows shall be shown
     *
     * @returns {Array} a boolean array which represents all indexes of the rows
     */
    visibleRows() {
      //just for updating the computed property
      if (
        !!this.rowsUpdatedKey &&
        !this.configFinal.ajaxUrl &&
        this.currentRowsPerPage !== "All"
      ) {
        let visible = [];

        for (let i = 0; i < this.rowsFinal.length; i++) {
          visible.push(false);
        }

        let onlyVisibleSortedRows = {};

        for (let index in this.sortedIndexes) {
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, index)) {
            if (this.filteredRows[this.sortedIndexes[index]]) {
              onlyVisibleSortedRows[index] = this.sortedIndexes[index];
            }
          }
        }

        let borderHigh = this.currentPage * this.currentRowsPerPage;
        let borderLow = borderHigh - this.currentRowsPerPage;

        let counter = 0;
        for (let index in onlyVisibleSortedRows) {
          if (
            Object.prototype.hasOwnProperty.call(onlyVisibleSortedRows, index)
          ) {
            index = parseInt(index);
            if (counter < borderHigh && counter >= borderLow) {
              visible[onlyVisibleSortedRows[index]] = true;
            }
            counter++;
          }
        }

        return visible;
      } else {
        return this.filteredRows;
      }
    },

    /**
     * Checks which indexes belongs to the current visible rows
     *
     * @returns {Array} an array of all visible indexes
     */
    visibleRowIndexes() {
      let rows = [];
      //just for updating the computed property
      if (this.indexesUpdatedKey) {
        if (this.configFinal.ajaxUrl && !this.pageSort) {
          for (let i = 0; i < this.rowsFinal.length; i++) {
            rows.push(i);
          }
        } else {
          for (let i in this.sortedIndexes) {
            if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, i)) {
              if (this.visibleRows[this.sortedIndexes[i]]) {
                rows.push(this.sortedIndexes[i]);
              }
            }
          }
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
      let generatedRows = {};

      //just for updating the computed value
      if (this.generatedUpdatedKey) {
        for (let x = 0; x < this.rowsFinal.length; x++) {
          let cells = this.rowsFinal[x].cells
            ? this.rowsFinal[x].cells
            : this.rowsFinal[x];

          let generatedCells = {};
          let stickyCells = {};

          for (let i = 0; i < this.hiddenBreakpoints.length; i++) {
            let bp = this.hiddenBreakpoints[i];
            for (let j = 0; j < this.configFinal.columns.length; j++) {
              let col = this.configFinal.columns[j];

              const hide =
                this.configFinal.hiddenCols[j] ||
                (!this.configFinal.ignoreEmpty[j] &&
                  this.configFinal.hideEmptyColumns &&
                  (this.isColEmpty(j) || this.isColEmpty(j, x))) ||
                this.emptyColumns[j];

              if (!hide && col.sticky) {
                stickyCells[j] = cells[j];
              } else if (
                !hide &&
                col.breakpoint &&
                (col.breakpoint.toLocaleLowerCase() === "all" ||
                  col.breakpoint.toLocaleLowerCase() === bp)
              ) {
                if (!col.sticky && !col.alwaysExpanded) {
                  generatedCells[j] = cells[j];
                } else if (col.alwaysExpanded) {
                  stickyCells[j] = cells[j];
                }
              }
            }
          }
          generatedRows[x] = generatedCells;
        }
      }
      return generatedRows;
    },

    stickyRows() {
      let stickyRows = {};

      for (let x = 0; x < this.rowsFinal.length; x++) {
        let cells = this.rowsFinal[x].cells
          ? this.rowsFinal[x].cells
          : this.rowsFinal[x];

        let stickyCells = {};

        for (let i = 0; i < this.hiddenBreakpoints.length; i++) {
          let bp = this.hiddenBreakpoints[i];
          for (let j = 0; j < this.configFinal.columns.length; j++) {
            let col = this.configFinal.columns[j];

            const hide =
              this.configFinal.hiddenCols[j] ||
              (!this.configFinal.ignoreEmpty[j] &&
                this.configFinal.hideEmptyColumns &&
                (this.isColEmpty(j) || this.isColEmpty(j, x))) ||
              this.emptyColumns[j];

            if (!hide && col.sticky) {
              stickyCells[j] = cells[j];
            } else if (
              !hide &&
              col.breakpoint &&
              (col.breakpoint.toLocaleLowerCase() === "all" ||
                col.breakpoint.toLocaleLowerCase() === bp) &&
              col.alwaysExpanded
            ) {
              stickyCells[j] = cells[j];
            }
          }
        }
        stickyRows[x] = stickyCells;
      }
      return stickyRows;
    },

    /**
     * Calculates the all selected flag. Special case: defaultSelected is set and no user action in place
     *
     */
    allSelectedProperty: {
      get() {
        if (this.allSelectedCustom === null) {
          return this.configFinal.defaultSelected;
        }
        return this.allSelectedCustom;
      },
      set(val) {
        this.allSelectedCustom = val;
      },
    },

    /**
     * Calculates number of current rows per page. Special case: no user action in place
     *
     */
    currentRowsPerPageProperty: {
      get() {
        if (!this.customRowsPerPage) {
          return this.currentRowsPerPage;
        }
        return this.customRowsPerPage;
      },
      set(val) {
        this.customRowsPerPage = val;
      },
    },

    /**
     * Checks if page sort is currently active. Special case: no user action in place
     *
     */
    pageSort: {
      get() {
        if (this.customPageSort === null) {
          return this.configFinal.pageSort;
        }
        return this.customPageSort;
      },
      set(val) {
        this.customPageSort = val;
      },
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
     * Calculates the value of number of shown rows. If no pagination is set, all will be displayed.
     *
     */
    currentRowsPerPage() {
      if (!this.customRowsPerPage) {
        return this.configFinal.pagination
          ? this.configFinal.pagination
          : "All";
      }
      return this.customRowsPerPage;
    },

    /**
     * Checks if there are any generated rows in place
     *
     */
    hasGeneratedRows() {
      for (let row in this.generatedRows) {
        if (Object.prototype.hasOwnProperty.call(this.generatedRows, row)) {
          if (Object.keys(this.generatedRows[row]).length) {
            return true;
          }
        }
      }
      return false;
    },

    /**
     * Calculates the classes array for every cell from the align parameters of rows and cells and the custom class string passed to cells
     *
     */
    cellClassesParsed() {
      let cellClasses = [];

      for (let i = 0; i < this.rowsFinal.length; i++) {
        cellClasses.push([]);

        let rAlign = this.rowsFinal[i].align;

        let cells = this.rowsFinal[i].cells
          ? this.rowsFinal[i].cells
          : this.rowsFinal[i];

        for (let j = 0; j < cells.length; j++) {
          let classes = [];

          let colAlign = this.configFinal.alignments[j];

          if (cells[j].align || rAlign || colAlign) {
            if (cells[j].align) {
              classes.push("text-" + cells[j].align);
            } else if (rAlign) {
              classes.push("text-" + rAlign);
            } else {
              classes.push("text-" + colAlign);
            }
          }

          if (cells[j].classes) {
            let splitted = cells[j].classes.split(" ");
            Array.prototype.push.apply(classes, splitted);
          }

          cellClasses[i].push(classes.join(" "));
        }
      }

      return cellClasses;
    },

    /**
     *Calculates the number of hidden columns
     *
     */
    hiddenColumns() {
      const rows = {};

      for (let x = 0; x < this.visibleRowIndexes.length; x++) {
        let hidden = 0;

        const rowIndex = this.visibleRowIndexes[x];

        for (let i = 0; i < this.hiddenBreakpoints.length; i++) {
          let bp = this.hiddenBreakpoints[i];
          for (let j = 0; j < this.configFinal.columns.length; j++) {
            let col = this.configFinal.columns[j];
            const hide =
              this.configFinal.hiddenCols[j] ||
              (!this.configFinal.ignoreEmpty[j] &&
                this.configFinal.hideEmptyColumns &&
                (this.isColEmpty(j) || this.isColEmpty(j, rowIndex))) ||
              this.emptyColumns[j];

            if (
              !hide &&
              col.breakpoint &&
              (col.breakpoint.toLocaleLowerCase() === "all" ||
                col.breakpoint.toLocaleLowerCase() === bp)
            ) {
              hidden++;
              break;
            }
          }
        }

        rows[rowIndex] = hidden;
      }

      return rows;
    },

    /**
     * Calculates the actual rows which shall be used.
     *
     */
    rowsFinal() {
      return this.configFinal.ajaxUrl
        ? this.ajaxRows
        : this.rows
        ? this.rows
        : [];
    },

    /**
     * Checks if some rows are selected
     *
     */
    someSelected() {
      return Object.values(this.selected).filter((x) => x).length > 0;
    },

    /**
     * Calculates the number of active sorts
     *
     */
    numberOfSorts() {
      return Object.keys(this.currentSortIndexes).length;
    },

    /**
     * Calculates the actual visible pagination options to sort out options which are bigger than number of rows
     *
     */
    paginationOptionsFilled() {
      // let all = this.rowsFinal.length;
      //
      // if(this.configFinal.ajaxUrl){
      // 	all = this.ajaxAll;
      // }

      let options = !this.configFinal.disallowAllOption ? ["All"] : [];
      // let i = 0;
      // while(i<this.paginationOptions.length&&i<all){
      // 	options.push(this.paginationOptions[i]);
      // 	i++;
      // }

      return options.concat(this.paginationOptions);
    },

    /**
     * Calculates columns which can be sorted from config value
     *
     */
    sortingColumns() {
      let columns = {};

      for (let index in this.currentSortIndexes) {
        if (
          Object.prototype.hasOwnProperty.call(this.currentSortIndexes, index)
        ) {
          columns[index] = this.configFinal.columns[index];
        }
      }

      return columns;
    },

    /**
     * Calculates the classes of every table header
     *
     */
    headerClass() {
      let classes = [];

      for (let i = 0; i < this.configFinal.number; i++) {
        let iClasses = [];
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
            this.configFinal.columnClasses[i]
        );
      }
      return classes;
    },

    /**
     * Calculates the actual displayed page range (number of shown page buttons in pagination) to prevent showing pages out of row range
     *
     */
    pageRange() {
      return Math.min(this.configFinal.pageRange, this.pages);
    },

    /**
     * Calculates number of pages regarding the rows per page and visible rows
     *
     */
    pages() {
      if (this.ajaxPages) {
        return this.ajaxPages;
      }

      if (!this.currentRowsPerPage || this.currentRowsPerPage === "All") {
        return 1;
      }

      return Math.max(
        1,
        Math.ceil(this.numberOfVisibleRows / this.currentRowsPerPage)
      );
    },

    /**
     * Calculates the number of visible Rows without paging;
     *
     */
    numberOfVisibleRows() {
      if (this.configFinal.ajaxUrl) {
        return this.ajaxAll;
      }

      return this.filteredRows.filter((item) => {
        return item;
      }).length;
    },

    /**
     * Calculates all accessible pages regarding to page range and current page
     *
     */
    visiblePages() {
      let pages = [];
      let start = 0;

      if (this.pages < this.pageRange || this.currentPage === 1) {
        start = 1;
      } else if (this.currentPage === this.pages) {
        start = this.currentPage - (this.pageRange - 1);
      } else {
        let off;
        if (this.pageRange % 2 === 0) {
          off = this.pageRange / 2;
        } else {
          off = (this.pageRange - 1) / 2;
          if (this.currentPage + off > this.pages) {
            off++;
          }
        }

        start = this.currentPage - off;
      }

      start = Math.max(start + this.pageOffset, 1);

      for (let i = 0; i < this.pageRange; i++) {
        if (i + start > this.pages) {
          break;
        }
        pages.push(i + start);
      }

      return pages;
    },

    /**
     * Checks if any filter is active
     *
     */
    filterActive() {
      return this.filtersFinal && Object.keys(this.filtersFinal).length;
    },

    /**
     * Calculates all rows which passes the filter and search restrictions
     *
     */
    filteredRows() {
      let visible = [];

      if (this.configFinal.ajaxUrl) {
        return this.rowsFinal;
      }

      for (let i = 0; i < this.rowsFinal.length; i++) {
        visible.push(true);
      }

      if (
        (!this.configFinal.search && !this.filterActive) ||
        (!this.filterActive &&
          this.configFinal.search &&
          this.query.length < this.configFinal.searchLength)
      ) {
        //Skip filtering, no search or filter is active
        return visible;
      }
      //search per row
      for (let i = 0; i < this.rowsFinal.length; i++) {
        let row = this.rowsFinal[i].cells
          ? this.rowsFinal[i].cells
          : this.rowsFinal[i];
        let match = false;
        let searched = false;

        if (
          this.configFinal.search &&
          this.query.length >= this.configFinal.searchLength
        ) {
          //check inner html/text per row/col
          for (let j = 0; j < row.length; j++) {
            let col = row[j];

            let textVal = col.html ? col.html : col.text;

            if (textVal) {
              if (
                this.configFinal.useFuzzySearch &&
                fuzzy(
                  (textVal + "").toLowerCase(),
                  (this.query + "").toLowerCase()
                ).score > 6
              ) {
                match = true;
                break;
              }

              if (
                (textVal + "")
                  .toLowerCase()
                  .indexOf((this.query + "").toLowerCase()) !== -1
              ) {
                match = true;
                break;
              }
            }
          }
          //check set per row keywords
          if (row.keywords) {
            for (let k = 0; k < row.keywords.length; k++) {
              if (
                this.configFinal.useFuzzySearch &&
                fuzzy(
                  (row.keywords[k] + "").toLowerCase(),
                  (this.query + "").toLowerCase()
                ).score > 6
              ) {
                match = true;
                break;
              }

              if (
                (row.keywords[k] + "")
                  .toLowerCase()
                  .indexOf((this.query + "").toLowerCase()) !== -1
              ) {
                match = true;
                break;
              }
            }
          }

          searched = true;
        }

        //filter are active but no filter values on row!
        if (this.filterActive && !this.rowsFinal[i].filters) {
          match = false;
        }

        //filter will be applied
        else if (((searched && match) || !searched) && this.filterActive) {
          //filter groups are defined
          if (this.filterGroups.length) {
            match = this.doFiltering(this.rowsFinal[i].filters);

            //define dummy filter group with filters and relation set
          } else {
            let group = {
              items: [],
              relation: this.configFinal.filterRelation,
            };

            for (let filter in this.filtersFinal) {
              if (
                Object.prototype.hasOwnProperty.call(this.filtersFinal, filter)
              ) {
                group.items.push({ name: filter });
              }
            }

            match = this.doFilteringForGroup(
              this.filtersFinal,
              this.rowsFinal[i].filters,
              group
            );

            if (this.DEBUG) {
              console.log("FILTER GROUPS CALCULATED", this.filterGroups);
            }
          }
          //######################################
          if (this.DEBUG) {
            console.log("\n");
            console.log("ROW " + i, match, this.rowsFinal[i].filters);
            console.log("\n");
          }
          //######################################
        }

        visible[i] = match;
      }

      return visible;
    },

    /**
     * Checks if there are currently no rows visible
     *
     */
    noRows() {
      return !this.numberOfVisibleRows;
    },

    /**
     * Calculates the first visible row for displaying
     *
     */
    firstVisibleRow() {
      if (this.currentRowsPerPage === "All" || this.pages === 1) {
        return 1;
      }

      return (
        this.currentPage * this.currentRowsPerPage - this.currentRowsPerPage + 1
      );
    },

    /**
     * Calculates the last visible row for displaying
     *
     */
    lastVisibleRow() {
      if (this.currentRowsPerPage === "All" || this.pages === 1) {
        return this.numberOfVisibleRows;
      }
      return Math.min(
        this.firstVisibleRow + this.currentRowsPerPage - 1,
        this.numberOfVisibleRows
      );
    },

    /**
     * Calculates if something is currently loading via ajax
     *
     */
    ajaxLoading() {
      return this.loading || this.fetching;
    },

    /**
     * Calculates if a headline is to be shown on generated rows
     *
     */

    showHeadlines() {
      let shows = [];

      for (let i = 0; i < this.configFinal.number; i++) {
        if (
          //headline is not empty
          this.configFinal.headlines[i] &&
          //show breakpoints match with set settings
          //no show breakpoint is set
          (!this.configFinal.columns[i].showHeadlineBreakpoint ||
            //show breakpoint is set and the hidden breakpoints contain this breakpoint
            (this.configFinal.columns[i].showHeadlineBreakpoint &&
              this.hiddenBreakpoints.findIndex(
                (x) =>
                  this.configFinal.columns[i] &&
                  x === this.configFinal.columns[i].showHeadlineBreakpoint
              ) !== -1)) &&
          //hide breakpoints match with set settings
          //no hide breakpoint is set
          (!this.configFinal.columns[i].hideHeadlineBreakpoint ||
            //hide breakpoint is set and the hidden breakpoints contain this breakpoint
            (this.configFinal.columns[i].hideHeadlineBreakpoint &&
              this.hiddenBreakpoints.findIndex(
                (x) =>
                  this.configFinal.columns[i] &&
                  x === this.configFinal.columns[i].hideHeadlineBreakpoint
              ) === -1))
        ) {
          shows.push(true);
        } else {
          shows.push(false);
        }
      }
      return shows;
    },
    /**
     * Key of filter operator fuctions
     *
     */
    operators() {
      return Object.keys(this.operatorFunctions);
    },
    emptyColumns() {
      const cols = {};

      const ignore = this.configFinal.ignoreSortEmptyColumns;

      for (let i = 0; i < this.configFinal.number; i++) {
        const ignoredCol = this.configFinal.ignoreEmpty[i];
        const sort = this.configFinal.sorts[i];

        if (
          !this.configFinal.hideEmptyColumns ||
          ignoredCol ||
          (ignore === "none" && sort) ||
          (ignore === "active" &&
            Object.keys(this.currentSortIndexes).includes(i + ""))
        ) {
          cols[i] = false;
        } else {
          cols[i] = this.isColEmpty(i);
        }
      }

      return cols;
    },
    filtersFinal() {
      if (!this.configFinal.storeState || !this.storedState.filters) {
        return this.filters;
      }
      return this.storedState.filters;
    },
  },

  watch: {
    rowsFinal: {
      handler(val) {
        if (val && val.length) {
          for (let i = 0; i < val.length; i++) {
            let cells = val[i].cells ? val[i].cells : val[i];
            if (cells.length !== this.config.columns.length) {
              console.error(
                `Row cell count on index ${i} doesn't fit for column config! expected: ${this.config.columns.length}, got: ${cells.length}`,
                val[i]
              );
            }
          }
        }
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

      for (let i = 0; i < this.rowsFinal.length; i++) {
        this.$set(this.selected, i, false);
      }

      if (val && val.length) {
        let counter = 0;

        const indexes = this.configFinal.selectAllRows
          ? this.rowsFinal.map((x, i) => i)
          : this.visibleRowIndexes;

        for (let i = 0; i < val.length; i++) {
          const key = val[i].key;
          const value = val[i].value;

          for (let j = 0; j < indexes.length; j++) {
            const index = indexes[j];
            if (this.rowsFinal[index][key] === value) {
              this.$set(this.selected, index, true);
              counter++;
            }
          }
        }

        if (!this.configFinal.selectAllRows) {
          this.allSelectedCustom =
            counter && counter === this.visibleRows.filter((x) => x).length;
        } else {
          this.allSelectedCustom = counter && counter === this.rowsFinal.length;
        }
      } else {
        this.allSelectedCustom = false;
      }
    },

    /**
     * Resets page and selects if a filter value is changes
     *
     */
    filters: {
      handler() {
        if (this.configFinal.ajaxUrl) {
          const clear = !(
            this.configFinal.storeState && this.storedState.filters
          );
          this.pageSort = false;
          this.loadViaAjax(clear, clear, "FILTERS");
        }

        if (this.pageSort) {
          this.currentSortIndexes = {};
          this.resetSorts();
          this.recomputeEssentials();
        }

        if (this.configFinal.storeState) {
          this.$delete(this.storedState, "filters");
          localStorage.setItem(
            `vue-quintable-${this.identifier}-filters`,
            JSON.stringify(this.filtersFinal)
          );
        }
      },
      deep: true,
    },
    filtersFinal(val) {
      this.$emit("update:filters", val);
    },
    /**
     * Trigger reload current page without changing filter/search/page from outside
     *
     */
    updated(val) {
      if (!this.configFinal.ajaxUrl) {
        return;
      }

      if (val && val.clear) {
        this.loadViaAjax(true, true, "UPDATED");
      } else if (val) {
        this.loadViaAjax(false, true, "UPDATED");
      }
    },

    /**
     * Set height of loader if loading is set from outside
     *
     */
    loading() {
      this.loaderHeight = this.$refs["height-wrapper"]
        ? this.$refs["height-wrapper"].clientHeight
        : 0;
    },

    /**
     * Reset page and select if filtering/search is active
     *
     */
    filteredRows: {
      handler(val, old) {
        if (
          JSON.stringify(val) === JSON.stringify(old) ||
          this.configFinal.ajaxUrl
        ) {
          return;
        }

        if (this.currentPage !== 1) {
          this.currentPage = 1;
        } else {
          this.resetSelect("filteredRows watcher");
        }

        const rows = [];
        for (let i = 0; i < val.length; i++) {
          const index = i.toString();
          if (val[i]) {
            rows.push(
              this.rowsFinal[
                this.sortedIndexes[index] ? this.sortedIndexes[index] : i
              ]
            );
          }
        }

        this.$emit("filtered:rows", rows, "filtered:rows");
      },
      deep: true,
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
    hoveredRow(val) {
      if (val !== null) {
        this.$emit("hover:row", this.rowsFinal[val], "hover:row");
      }
    },

    /**
     * Resets page and selects if a search query is entered and emits and event
     *
     */
    query(val, old) {
      this.lastQuery = old;

      if (this.configFinal.ajaxUrl) {
        this.pageSort = false;
        const clear = !(this.configFinal.storeState && this.storedState.query);
        clearTimeout(this.queryAjaxTimeout);
        this.queryAjaxTimeout = setTimeout(() => {
          this.loadViaAjax(clear, clear, "QUERY");
        }, this.configFinal.ajaxRequestDelay);
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
        this.$delete(this.storedState, "query");
        localStorage.setItem(
          `vue-quintable-${this.identifier}-query`,
          this.query
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
        this.configFinal.storeState && this.storedState["rows-per-page"]
      );

      if (this.configFinal.storeState) {
        this.$delete(this.storedState, "rows-per-page");
        localStorage.setItem(
          `vue-quintable-${this.identifier}-rows-per-page`,
          this.currentRowsPerPage
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

      this.$nextTick(() => {
        this.recomputeEssentials();
        this.$forceUpdate();

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
    config(val) {
      if (typeof val !== "object") {
        throw "config must be an object";
      }

      if (this.dynamicConfig) {
        return;
      }

      this.initLists();
      this.$forceUpdate();

      if (this.configFinal.ajaxUrl) {
        this.loadViaAjax(false, true, "CONFIG");
      }

      if (this.configFinal.defaultSelected) {
        this.checkAll(true);
      }
    },

    /**
     * Prepare the selected rows array for passing to the event and emits it
     *
     */
    selected: {
      handler(val) {
        let selected = [];
        for (let index in this.sortedIndexes) {
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, index)) {
            if (val[this.sortedIndexes[index]]) {
              const row = this.rowsFinal[this.sortedIndexes[index]];
              if (!row.disableSelect) {
                selected.push(row);
              }
            }
          }
        }

        if (this.configFinal.storeState) {
          localStorage.setItem(
            `vue-quintable-${this.identifier}-selected-rows`,
            JSON.stringify(val)
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

      this.$emit("update:page", val, "update:page");

      const clear = !(
        this.configFinal.storeState && this.storedState["current-page"]
      );

      if (this.configFinal.storeState) {
        this.$delete(this.storedState, "current-page");
        localStorage.setItem(
          `vue-quintable-${this.identifier}-current-page`,
          this.currentPage
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
      if (!val && Object.keys(this.currentSortIndexes).length > 1) {
        let currentItem;
        let currentIndex;
        for (let index in this.currentSortIndexes) {
          if (
            Object.prototype.hasOwnProperty.call(
              this.currentSortIndexes,
              index
            ) &&
            this.currentSortIndexes[index].order === 0
          ) {
            currentItem = this.currentSortIndexes[index];
            currentIndex = index;
            break;
          }
        }

        this.currentSortIndexes = {};
        this.$set(this.currentSortIndexes, currentIndex, currentItem);

        this.sort();
      }
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
        for (let i = 0; i < this.sortOrder.length; i++) {
          if (typeof this.sortOrder[i] === "object") {
            this.setSortColumn(this.sortOrder[i].index, this.sortOrder[i].asc);
          } else if (typeof this.sortOrder[i] === "number") {
            this.setSortColumn(this.sortOrder[i]);
          }
        }
      },
    },
  },
  methods: {
    /**
     * sets search query from outside (search slot)
     *
     */
    setSearchQuery(query) {
      this.query = query;
    },

    /**
     * checks if the passed cell is empty for one or all rows
     *
     */
    isColEmpty(i, rowIndex = -1) {
      const rowIndexes = rowIndex > -1 ? [rowIndex] : this.visibleRowIndexes;

      return (
        rowIndexes
          .map((index) => {
            return this.rowsFinal[index];
          })
          .filter((row) => {
            const cells = row.cells ? row.cells : row;
            return (
              cells[i].text ||
              cells[i].html ||
              cells[i].quintable ||
              cells[i].component
            );
          }).length <= 0
      );
    },

    /**
     * Handler for generic component events
     *
     */
    handleComponentEvent(data) {
      this.$emit("component:event", data, "component:event");
    },

    /**
     * Calculate which pages should be displayed in pagination due to page offset
     *
     */
    updatePageOffset(factor) {
      let result = this.pageOffset + this.pageRange * factor;

      if (factor > 0) {
        let offset = Math.min(result, this.pages - this.pageRange);
        this.pageOffset = Math.min(offset, this.pages - this.currentPage);
      } else if (factor < 0) {
        this.pageOffset = Math.max(result, -(this.pages - this.pageRange));
      } else {
        this.pageOffset = 0;
      }
    },

    cellFormatters(cIndex, cell) {
      if (
        typeof this.configFinal.columns[cIndex].cellFormatter === "function"
      ) {
        let formatted = this.configFinal.columns[cIndex].cellFormatter(cell);

        if (typeof formatted !== "object") {
          formatted = {
            value: formatted,
          };
        }

        return formatted;
      }

      return cell.html ? cell.html : cell.text ? cell.text : "";
    },

    /**
     * Event listener for select row checkboxes. Checks if all rows are selected now and sets the allSelectedProperty in case
     *
     * @param bool selected or not
     * @param index index of selected row
     */
    checkListener(bool, index) {
      let tmp = Object.keys(this.selected)
        .slice()
        .map((key) => {
          return (
            !!this.selected[key] ||
            !!(
              this.rowsFinal[parseInt(key)] &&
              this.rowsFinal[parseInt(key)].disableSelect
            )
          );
        });

      tmp[index] = !!bool;

      if (!this.configFinal.selectAllRows) {
        tmp = tmp.filter((x, index) => this.visibleRowIndexes.includes(index));

        if (tmp.indexOf(false) !== -1) {
          this.allSelectedProperty = false;
        } else if (tmp.indexOf(false) === -1) {
          this.allSelectedProperty = true;
        }
      } else {
        if (tmp.indexOf(false) === -1) {
          this.allSelectedProperty = true;
        } else {
          this.allSelectedProperty = false;
        }
      }
    },

    /**
     * Check if a parent with certain class exists
     *
     */
    hasSomeParentTheClass(element, className) {
      if (
        element instanceof HTMLElement &&
        element.classList.contains(className)
      ) {
        return true;
      }
      return (
        element instanceof Element &&
        element.parentNode &&
        this.hasSomeParentTheClass(element.parentNode, className)
      );
    },

    /**
     * Check if a parent with certain tag name exists
     *
     */
    hasSomeParentTagName(element, tagName) {
      if (
        element instanceof HTMLElement &&
        element.tagName.toLowerCase() === tagName.toLowerCase()
      ) {
        return true;
      }
      return (
        element instanceof Element &&
        element.parentNode &&
        this.hasSomeParentTagName(element.parentNode, tagName)
      );
    },

    /**
     * Event listener for clicked row. Emits an event if the row has been expanded or collapsed. Emits and event that row was clicked
     *
     * @param e Click Event
     * @param rowIndex Index of clicked row
     */
    onRowClick(e, rowIndex) {
      if ((e.target || {}).type === "checkbox") {
        return;
      } else if (
        this.hasSomeParentTheClass(e.target, "generated-table") &&
        !this.nested
      ) {
        return;
      }

      let isLink = this.hasSomeParentTagName(e.target, "a");
      let shouldPrevent = this.hasSomeParentTheClass(
        e.target,
        "prevent-toggle"
      );

      const index = rowIndex.toString();
      const i = parseInt(rowIndex);

      if (this.hiddenColumns[index] && !isLink && !shouldPrevent) {
        if (!this.openRows[index]) {
          this.$set(this.openRows, index, true);
          this.$emit(
            "expand:row",
            this.rowsFinal[this.sortedIndexes[index]],
            "expand:row"
          );
        } else {
          this.$set(this.openRows, index, false);
          this.$emit(
            "expand:row",
            this.rowsFinal[this.sortedIndexes[index]],
            "collapse:row"
          );
        }

        this.generatedUpdatedKey = Date.now();
      }

      this.$emit("click:row", this.rowsFinal[i], "click:row");
    },

    /**
     * Event listener for clicked cell. Emits and event that row was clicked
     *
     * @param cell Clicked Cell
     */
    onCellClick(cell) {
      this.$emit("click:cell", cell, "click:cell");
    },

    /**
     * Event listener for hovered row. Sets the hoveredRow data entry
     *
     * @param index Index of hovered row
     */
    onMouseenterRow(index) {
      if (this.hoveredRow !== index) {
        this.hoveredRow = index;
      }
    },

    /**
     * Event listener for mouse leave of table body. Releases the hoveredRow data entry
     *
     */
    onMouseleaveTable() {
      this.hoveredRow = null;
    },

    /**
     *
     *
     * @param index Index of removed sorting column
     */
    removeSort(index) {
      for (let i in this.currentSortIndexes) {
        if (Object.prototype.hasOwnProperty.call(this.currentSortIndexes, i)) {
          let item = this.currentSortIndexes[i];
          if (item.order > this.currentSortIndexes[index].order) {
            item.order--;
          }
          this.$set(this.currentSortIndexes, i, item);
        }
      }
      this.$delete(this.currentSortIndexes, index);

      if (this.numberOfSorts === 0) {
        this.resetSorts();
        if (this.currentPage !== 1) {
          this.currentPage = 1;
        } else {
          this.recomputeEssentials();
        }

        if (this.configFinal.ajaxUrl && !this.pageSort) {
          this.loadViaAjax(true, true, "SORT");
        }
      } else {
        this.sort();
      }
    },

    resetSorts() {
      for (let i = 0; i < this.rowsFinal.length; i++) {
        const index = i.toString();
        this.$set(this.sortedIndexes, index, i);
      }
    },

    /**
     * Select all relevant rows
     *
     */
    checkAll(force = false) {
      let value = this.allSelectedProperty;

      if (force) {
        value = true;
      }

      let counter = 0;

      for (let index in this.sortedIndexes) {
        if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, index)) {
          index = parseInt(index);
          if (
            (!this.configFinal.selectAllRows &&
              this.visibleRows[this.sortedIndexes[index]]) ||
            (this.configFinal.selectAllRows &&
              this.filteredRows[this.sortedIndexes[index]])
          ) {
            this.$set(this.selected, this.sortedIndexes[index], value);
            counter++;
          } else {
            this.$set(this.selected, this.sortedIndexes[index], false);
          }
        }
      }

      if (value) {
        if (!this.configFinal.selectAllRows) {
          this.allSelectedCustom =
            counter && counter === this.visibleRows.filter((x) => x).length;
        } else {
          this.allSelectedCustom = counter && counter === this.rowsFinal.length;
        }
      }
    },

    /**
     * Do the filtering for all rows against all groups
     *
     * @param filterValues the set filter keys and values
     *
     * @returns {boolean}
     */
    doFiltering(filterValues) {
      let results = [];

      for (let i = 0; i < this.filterGroups.length; i++) {
        results.push(
          this.doFilteringForGroup(
            this.filtersFinal,
            filterValues,
            this.filterGroups[i]
          )
        );

        if (this.DEBUG && i < this.filterGroups.length - 1) {
          console.log(this.configFinal.filterGroupRelation);
        }
      }
      //######################################
      if (this.DEBUG) {
        console.log(
          "RESULTS FOR GROUPS:",
          results,
          this.configFinal.filterGroupRelation
        );
      }
      //######################################

      if (this.configFinal.filterGroupRelation === "AND") {
        return results.indexOf(false) === -1;
      } else if (this.configFinal.filterGroupRelation === "OR") {
        return results.indexOf(true) !== -1;
      } else {
        return true;
      }
    },

    /**
     * Do the actual filtering for a row against a cetrain group
     *
     * @param filters the set filter keys and values
     * @param filterValues the filter values of one row
     * @param group the actual filter group
     * @param index just a counter
     *
     * @returns {boolean}
     */
    doFilteringForGroup(filters, filterValues, group, index = 0) {
      //###################################### DEBUG
      let spaces = "   ";

      for (let i = 0; i < index; i++) {
        spaces += "   ";
      }

      if (this.DEBUG) {
        if (group.items) {
          let str = spaces;
          let tmp = group.items.slice();

          let cmp = function (a, b) {
            if (a.name === undefined) {
              return 1;
            }
            if (b.name === undefined) {
              return -1;
            }
            return 0;
          };

          tmp = tmp.sort(cmp);

          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].name) {
              str += tmp[i].name;
              if (i < tmp.length - 1) {
                str += " " + group.relation + " ";
              }
            }
          }

          console.log(str);
        }

        console.log(spaces, "GROUP:", group);
      }
      //###################################### / DEBUG

      let found = false;

      if (group.relation === "AND") {
        for (let key in filters) {
          if (Object.prototype.hasOwnProperty.call(filters, key)) {
            if (
              this.filterGroups.length &&
              !this.findInFilterGroups(key, this.filterGroups)
            ) {
              continue;
            }

            let allIncluding = true;
            for (let i = 0; i < group.items.length; i++) {
              let item = group.items[i];

              if (item.name && filterValues[item.name] === undefined) {
                allIncluding = false;
                break;
              }
            }

            if (allIncluding) {
              for (let i = 0; i < group.items.length; i++) {
                let item = group.items[i];

                found = true;
                if (item.items) {
                  found = this.doFilteringForGroup(
                    filters,
                    filterValues,
                    item,
                    index + 1
                  );
                }

                if (!found) {
                  break;
                }

                if (typeof filters[item.name] === "undefined") {
                  continue;
                }

                let operator =
                  typeof filters[item.name] === "object" &&
                  filters[item.name] !== null &&
                  filters[item.name]["operator"] &&
                  this.operators.includes(filters[item.name]["operator"])
                    ? filters[item.name]["operator"]
                    : this.defaultOperator;
                let filterProperties = this.getFilterValues(filters[item.name]);

                const cmpFunction =
                  typeof filters[item.name].compare === "function"
                    ? filters[item.name].compare
                    : this.operatorFunctions[operator];

                for (let j = 0; j < filterProperties.length; j++) {
                  const matches = cmpFunction(
                    filterProperties[j],
                    filterValues[item.name]
                  );
                  if (!matches) {
                    found = false;
                    break;
                  }
                }

                if (!found) {
                  break;
                }

                //actual checking for matching
                // if( Array.isArray(filters[item.name]) && filters[item.name].length && filters[item.name].indexOf(filterValues[item.name]) === -1){
                // 	found =  false;
                // 	break;
                // }else if( !Array.isArray(filters[item.name]) && typeof filters[item.name] !== "object" && filterValues[item.name] !== filters[item.name]){
                // 	found =  false;
                // 	break;
                // }
              }
            }
          }
        }
        return found;
      } else if (group.relation === "OR" || group.items) {
        for (let key in filters) {
          if (Object.prototype.hasOwnProperty.call(filters, key)) {
            if (
              this.filterGroups.length &&
              !this.findInFilterGroups(key, this.filterGroups)
            ) {
              continue;
            }

            for (let i = 0; i < group.items.length; i++) {
              let item = group.items[i];

              if (item.items) {
                found = this.doFilteringForGroup(
                  filters,
                  filterValues,
                  item,
                  index + 1
                );

                if (found) {
                  break;
                }
              }

              if (typeof filters[item.name] === "undefined") {
                continue;
              }

              let operator =
                typeof filters[item.name] === "object" &&
                filters[item.name] !== null &&
                filters[item.name]["operator"] &&
                this.operators.includes(filters[item.name]["operator"])
                  ? filters[item.name]["operator"]
                  : this.defaultOperator;
              let filterProperties = this.getFilterValues(filters[item.name]);

              const cmpFunction =
                typeof filters[item.name].compare === "function"
                  ? filters[item.name].compare
                  : this.operatorFunctions[operator];

              for (let j = 0; j < filterProperties.length; j++) {
                const matches = cmpFunction(
                  filterProperties[j],
                  filterValues[item.name]
                );

                if (matches) {
                  found = true;
                  break;
                }
              }

              if (found) {
                break;
              }

              // //actual checking for matching
              // if(Array.isArray(filters[item.name]) && filters[item.name].length && filters[item.name].indexOf(filterValues[item.name]) !== -1){
              // 	found =  true;
              // 	break;
              // }else if(!Array.isArray(filters[item.name]) && typeof filters[item.name] !== "object" && filterValues[item.name] && filters[item.name] && filterValues[item.name] === filters[item.name]){
              // 	found =  true;
              // 	break;
              // }
            }
          }
        }
        return found;
      } else {
        return true;
      }
    },

    /**
     *
     * Helper method to calculate an array of filter values from value/array/object
     *
     */
    getFilterValues(values) {
      return values instanceof RegExp ||
        typeof values !== "object" ||
        values === null
        ? [values]
        : Array.isArray(values)
        ? values
        : this.getFilterValues(values.values);
    },

    /**
     * Search a certain filter key in a filter group
     *
     * @param key the filter key
     * @param arr the group
     * @param index just a counter
     * @returns {boolean}
     */
    findInFilterGroups(key, arr, index = 0) {
      if (!arr) {
        return false;
      }

      let found = false;

      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item.items) {
          found = this.findInFilterGroups(key, item.items, index + 1);
          if (found) {
            break;
          }
        }

        if (item.name === key) {
          found = true;
          break;
        }
      }
      return found;
    },

    /**
     * Change page with certain value
     *
     * @param page
     */
    gotoPage(page) {
      if (page === "prev") {
        if (this.currentPage - 1 > 0) {
          this.currentPage--;
        }
      } else if (page === "next") {
        if (this.currentPage + 1 <= this.pages) {
          this.currentPage++;
        }
      } else if (page === "first") {
        this.currentPage = 1;
      } else if (page === "last") {
        this.currentPage = this.pages;
      } else {
        this.currentPage = page;
      }
    },

    /**
     * Add a column to the sorting or change the sort direction of set sorting column
     *
     * @param index the column
     * @param asc bool if it shall be set to a direction
     */
    setSortColumn(sortIndex, asc) {
      const i = parseInt(sortIndex);
      const index = sortIndex.toString();

      if (!this.configFinal.sorts[i]) {
        return;
      }

      let item;

      if (!this.currentSortIndexes[index]) {
        if (!this.multiSort) {
          this.currentSortIndexes = {};
        }

        item = {
          headline: this.configFinal.headlines[i],
          index: i,
          asc:
            this.configFinal.sorts[i] === true
              ? true
              : this.configFinal.sorts[i] === "ASC",
          order: this.numberOfSorts,
        };
      } else {
        item = this.currentSortIndexes[index];
        item.asc = !item.asc;
      }

      if (typeof asc !== "undefined") {
        item.asc = asc;
      }

      this.$set(this.currentSortIndexes, index, item);

      if (this.configFinal.storeState) {
        localStorage.setItem(
          `vue-quintable-${this.identifier}-sort-indexes`,
          JSON.stringify(this.currentSortIndexes)
        );
      }

      this.$emit("update:sort", this.currentSortIndexes, "update:sort");

      this.sort();
    },

    /**
     * The actual sorting process. Sort by sorting value or the inner text/html of the cells
     *
     */
    sort(preventReset = false) {
      if (this.configFinal.ajaxUrl && !this.pageSort) {
        this.loadViaAjax(!preventReset, !preventReset, "SORT");
        return;
      }

      let allRows = this.rowsFinal.slice();
      let rows = [];
      let visibleIndexes = [];
      let sortedIndexesBefore = {};

      if (this.pageSort) {
        visibleIndexes = this.visibleRowIndexes.slice();

        if (!visibleIndexes.length) {
          const length = this.configFinal.pagination
            ? this.configFinal.pagination
            : this.rowsFinal.length;
          for (let i = 0; i < length; i++) {
            visibleIndexes.push(i);
          }
        }

        let counter = 0;
        for (let i = 0; i < allRows.length; i++) {
          allRows[i].index = i;
          if (visibleIndexes.indexOf(i) !== -1) {
            if (counter < this.configFinal.pagination) {
              rows.push(allRows[i]);
            }
            counter++;
          }
        }

        if (Object.keys(this.sortedIndexes).length) {
          sortedIndexesBefore = Object.assign({}, this.sortedIndexes);
        } else {
          for (let i = 0; i < allRows.length; i++) {
            this.$set(sortedIndexesBefore, i.toString(), i);
          }
        }
      } else {
        rows = this.rowsFinal.slice();
        for (let i = 0; i < rows.length; i++) {
          rows[i].index = i;
        }
      }

      let sortableIndexes = [];
      for (let index in this.currentSortIndexes) {
        if (
          Object.prototype.hasOwnProperty.call(this.currentSortIndexes, index)
        ) {
          let data = this.currentSortIndexes[index];
          data.index = index;
          sortableIndexes.push(data);
        }
      }

      sortableIndexes.sort(function (a, b) {
        return a.order - b.order;
      });

      let compare = (a, b, keys, index) => {
        index = index || 0;

        let currentKey = keys[index];

        let i = currentKey.index;

        let cellsA = a.cells ? a.cells : a;
        let cellsB = b.cells ? b.cells : b;

        let aValue =
          typeof cellsA[i].sortValue !== "undefined" &&
          cellsA[i].sortValue !== null
            ? cellsA[i].sortValue
            : cellsA[i].html
            ? cellsA[i].html
            : cellsA[i].text;
        let bValue =
          typeof cellsB[i].sortValue !== "undefined" &&
          cellsB[i].sortValue !== null
            ? cellsB[i].sortValue
            : cellsB[i].html
            ? cellsB[i].html
            : cellsB[i].text;

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
        }

        if (typeof bValue === "string") {
          bValue = bValue.toLowerCase();
        }

        if (!isNaN(aValue)) {
          aValue = parseFloat(aValue);
        } else if (typeof aValue === "string" && aValue.match(/^-?\d+$/)) {
          aValue = parseFloat(aValue);
        } else if (typeof aValue === "string" && aValue.match(/^\d+\.\d+$/)) {
          aValue = parseFloat(aValue);
        }

        if (!isNaN(bValue)) {
          bValue = parseFloat(bValue);
        } else if (typeof bValue === "string" && bValue.match(/^-?\d+$/)) {
          bValue = parseFloat(bValue);
        } else if (typeof bValue === "string" && bValue.match(/^\d+\.\d+$/)) {
          bValue = parseFloat(bValue);
        }

        if (currentKey.asc) {
          return aValue > bValue
            ? 1
            : aValue < bValue
            ? -1
            : keys[index + 1]
            ? compare(a, b, keys, index + 1)
            : 1;
        } else {
          return aValue < bValue
            ? 1
            : aValue > bValue
            ? -1
            : keys[index + 1]
            ? compare(a, b, keys, index + 1)
            : -1;
        }
      };

      rows.sort(function (a, b) {
        return compare(a, b, sortableIndexes);
      });

      const finalRows = [];

      let counterRows = 0;
      let counterAdded = 0;
      for (let i = 0; i < allRows.length; i++) {
        const index = i.toString();
        if (this.pageSort && visibleIndexes.indexOf(i) !== -1) {
          if (counterRows < this.configFinal.pagination) {
            finalRows.push(rows[counterAdded]);
            counterAdded++;
          } else {
            finalRows.push(allRows[sortedIndexesBefore[index]]);
          }
          counterRows++;
        } else if (this.pageSort) {
          finalRows.push(allRows[sortedIndexesBefore[index]]);
        } else {
          finalRows.push(rows[i]);
        }
      }

      for (let i = 0; i < finalRows.length; i++) {
        const index = i.toString();
        this.$set(this.sortedIndexes, index, parseInt(finalRows[i].index));
      }

      if (!this.pageSort && !preventReset) {
        this.currentPage = 1;
      }

      if (!this.configFinal.selectAllRows && !this.pageSort && !preventReset) {
        this.resetSelect("sort method");
      }

      this.recomputeEssentials();
    },

    /**
     * Trigger recomputing of the essential parts of the table to ensure correct displaying
     *
     */
    recomputeEssentials() {
      this.$nextTick(() => {
        this.rowsUpdatedKey = Date.now();
        this.indexesUpdatedKey = Date.now();
        this.generatedUpdatedKey = Date.now();
      });
    },

    /**
     * Initialize nested object lists
     *
     */
    initLists() {
      if (!this.rowsFinal) {
        return;
      }

      for (let i = 0; i < this.rowsFinal.length; i++) {
        const index = i.toString();

        // if (typeof this.generatedRows[index] !== "object") {
        //   this.$set(this.generatedRows,index,{});
        // }

        // if (typeof this.stickyRows[index] !== "object") {
        //   this.$set(this.stickyRows, index, {});
        // }

        if (typeof this.sortedIndexes[index] === "undefined") {
          this.$set(this.sortedIndexes, index, i);
        }

        if (typeof this.selected[index] === "undefined") {
          this.$set(this.selected, index, false);
        }

        if (this.configFinal.expandedAll || this.rowsFinal[i].expanded) {
          this.$set(this.openRows, index, true);
        } else {
          this.$set(this.openRows, index, false);
        }
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
     * Clear all row selections
     *
     */
    resetSelect(accessor) {
      if (this.DEBUG) {
        console.log("CALLED FROM:", accessor);
      }
      this.allSelectedProperty = false;

      for (let i = 0; i < this.rowsFinal.length; i++) {
        this.$set(this.selected, i, false);
      }
    },
    /**
     * Load new rows via ajax including filters, search query and pagination
     *
     * @param clear
     * @param accessor
     */
    loadViaAjax(
      clearSortAndPage = false,
      clearSelected = true,
      accessor = null
    ) {
      if (this.DEBUG) {
        console.log("CALLED FROM:", accessor);
      }

      let query = this.query;

      //Do nothing if there is a query and it is shorter than the minimum search length and either the last entered query is shorter or the last entered query is also shorter than the minimum search length
      if (
        query &&
        query.length < this.configFinal.searchLength &&
        (this.lastQuery.length < query.length ||
          this.lastQuery.length < this.configFinal.searchLength)
      ) {
        return;
      }
      //Reset last query if the current query is empty and last query hasn't been reset
      else if (!query && this.lastQuery) {
        const tmp = this.lastQuery;
        this.lastQuery = "";
        //Return if last query was shorter than minimum search length (means it was the last )
        if (tmp.length < this.configFinal.searchLength) {
          return;
        }
      }
      //Set query to empty string (no filtering) if the query is shorter than minimum search length
      else if (query && query.length < this.configFinal.searchLength) {
        query = "";
      }

      if (this.cancelSource) {
        this.cancelSource.cancel("Operation canceled by the user.");
      }

      this.clearLists(clearSelected);

      this.ajaxRows = [];

      if (clearSortAndPage) {
        this.currentPage = 1;
        this.resetSelect("loadViaAjax method");
      }

      this.loaderHeight = this.$refs["height-wrapper"]
        ? this.$refs["height-wrapper"].clientHeight
        : 0;

      this.fetching = true;

      let params = {
        search: query,
        filters: this.filtersFinal,
        perPage: this.currentRowsPerPage,
        page: this.currentPage,
        sort:
          this.numberOfSorts > 0
            ? {
                indexes: this.currentSortIndexes,
                columns: this.sortingColumns,
              }
            : null,
      };

      this.cancelSource = this.axiosFinal.CancelToken.source();

      const headers = {
        "Content-Type": "application/json",
      };

      this.axiosFinal
        .request(this.configFinal.ajaxUrl, {
          method: this.configFinal.requestMethod,
          params: this.configFinal.requestMethod === "GET" ? params : null,
          data: this.configFinal.requestMethod === "POST" ? params : null,
          cancelToken: this.cancelSource.token,
          headers,
        })
        .then((response) => {
          if (
            !response.data.rows ||
            typeof response.data.rows.length === "undefined"
          ) {
            throw "Response data has to contain rows property. Please see Readme.md for details";
          }

          if (typeof response.data.all === "undefined") {
            throw "Response data has to contain all property. Please see Readme.md for details";
          }

          this.ajaxAll = response.data.all;
          this.ajaxPages = Math.max(
            1,
            Math.ceil(response.data.all / this.currentRowsPerPage)
          );

          this.$emit(
            "ajax:rows",
            {
              rows: response.data.rows,
              old: JSON.parse(JSON.stringify(this.ajaxRows)),
              all: this.ajaxAll,
            },
            "ajax:rows"
          );

          if (response.data.all) {
            this.ajaxRows = response.data.rows;
            // this.checkStoredSelectedRows(true);
            this.initLists();
          }

          this.fetching = false;
        })
        .catch((error) => {
          if (this.axiosFinal.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            this.fetching = false;
            console.error(error);
            this.$emit("ajax:error", error, "ajax:error");
          }
        });
    },

    /**
     * Check if DOM element is visible
     *
     * @param el DOMElement
     * @returns {boolean}
     */
    elementVisible(el) {
      if (el) {
        let computedStyle = window.getComputedStyle(el);
        return computedStyle.display !== "none";
      }
      return false;
    },

    /**
     * Event Listener for window resize event.
     *
     */
    breakpointListener() {
      clearTimeout(this.breakpointTimeout);

      this.breakpointTimeout = setTimeout(() => {
        this.generateHiddenBreakpoints(false);
      }, 250);
    },

    /**
     * Generate the list of hidden breakpoints
     *
     * @param regenerate
     */
    generateHiddenBreakpoints(regenerate = false) {
      if (regenerate) {
        this.hiddenBreakpoints = [];
      }

      let breakpoints = [];
      if (!this.elementVisible(this.$refs.xxl)) {
        breakpoints.push("xxl");
      }

      if (!this.elementVisible(this.$refs.xl)) {
        breakpoints.push("xl");
      }

      if (!this.elementVisible(this.$refs.lg)) {
        breakpoints.push("lg");
      }

      if (!this.elementVisible(this.$refs.md)) {
        breakpoints.push("md");
      }

      if (!this.elementVisible(this.$refs.sm)) {
        breakpoints.push("sm");
      }

      breakpoints.push("all");

      if (
        JSON.stringify(this.hiddenBreakpoints) !== JSON.stringify(breakpoints)
      ) {
        this.hiddenBreakpoints = breakpoints;
      }
    },

    checkStoredSelectedRows(deleteStore = false) {
      if (this.storedState["pre-selected-rows"]) {
        //TODO
      }

      if (this.storedState["selected-rows"]) {
        this.selected = JSON.parse(
          JSON.stringify(this.storedState["selected-rows"])
        );
        const counter = Object.values(this.selected).filter((x) => x).length;
        if (!this.configFinal.selectAllRows) {
          this.allSelectedCustom =
            counter && counter === this.visibleRows.filter((x) => x).length;
        } else {
          this.allSelectedCustom = counter && counter === this.rowsFinal.length;
        }
        if (deleteStore) {
          this.$delete(this.storedState, "selected-rows");
        }
      }
    },
  },
  created() {
    if (this.configFinal.storeState) {
      const filters = localStorage.getItem(
        `vue-quintable-${this.identifier}-filters`
      );
      if (filters) {
        this.$set(this.storedState, "filters", JSON.parse(filters));
      }

      const query = localStorage.getItem(
        `vue-quintable-${this.identifier}-query`
      );
      if (query) {
        this.$set(this.storedState, "query", query);
      }

      const rowsPerPage = localStorage.getItem(
        `vue-quintable-${this.identifier}-rows-per-page`
      );
      if (rowsPerPage) {
        this.$set(this.storedState, "rows-per-page", parseInt(rowsPerPage));
      }

      const selectedRows = localStorage.getItem(
        `vue-quintable-${this.identifier}-selected-rows`
      );
      if (selectedRows) {
        this.$set(this.storedState, "selected-rows", JSON.parse(selectedRows));
      }

      const page = localStorage.getItem(
        `vue-quintable-${this.identifier}-current-page`
      );
      if (page) {
        this.$set(this.storedState, "current-page", parseInt(page));
      }

      const sortIndexes = localStorage.getItem(
        `vue-quintable-${this.identifier}-sort-indexes`
      );
      if (sortIndexes) {
        this.$set(this.storedState, "sort-indexes", JSON.parse(sortIndexes));
      }
    }
    this.initLists();

    //Pre-select rows in case
    let counter = 0;

    const indexes = this.configFinal.selectAllRows
      ? this.rowsFinal.map((x, i) => i)
      : this.visibleRowIndexes;
    for (let i = 0; i < indexes.length; i++) {
      let row = this.rowsFinal[i];
      if (row.selected) {
        this.$set(this.selected, i, true);
      }
      if (row.selected || row.disableSelect) {
        counter++;
      }
    }

    if (
      !this.configFinal.selectAllRows &&
      counter &&
      counter === this.visibleRows.filter((x) => x).length
    ) {
      this.allSelectedCustom = true;
    } else if (
      this.configFinal.selectAllRows &&
      counter &&
      counter === this.rowsFinal.length
    ) {
      this.allSelectedCustom = true;
    }

    if (this.initialSearchTerm) {
      this.query = this.initialSearchTerm;
    }

    if (this.storedState.query) {
      this.query = this.storedState.query;
    }

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
      });
    }
    this.$nextTick(this.checkStoredSelectedRows);
  },
  mounted() {
    if (this.configFinal.ajaxUrl) {
      this.loadViaAjax(false, true, "MOUNTED");
    }

    if (this.configFinal.defaultSelected) {
      this.checkAll(true);
    }

    this.generateHiddenBreakpoints();

    //bind listener to window resize
    window.addEventListener("resize", this.breakpointListener);
  },
  beforeDestroy() {
    //release listener from window resize
    window.removeEventListener("resize", this.breakpointListener);
  },
};
</script>

<style scoped>
.generated-cell-element {
  padding: 0.5rem 0.5rem;
}

.toggle-cell {
  min-width: 50px;
  max-width: 50px;
  width: 50px;
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

.table-wrapper .bg-muted {
  background: rgba(0, 0, 0, 0.1);
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

.sort-header {
  cursor: pointer;
  position: relative;
}

.sort-header:hover {
  padding-right: 20px !important;
}

.sort-header.active {
  padding-right: 45px !important;
}

.sort-header .sorting-icon {
  position: absolute;
  right: 5px;
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
}

.sort-header.active .sorting-icon,
.sort-header:hover .sorting-icon {
  opacity: 1;
}

.ajax-loader {
  font-size: 3em;
}

.generated-row-cell .generated-cell-element-content {
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
  transition: opacity 0.15s, visibility 0.15s;
}

.quintable-tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
