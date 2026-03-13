<template>
  <thead v-if="quintable.configFinal.headlines.length">
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
        v-if="
          quintable.hasGeneratedRows && !quintable.configFinal.hideRowToggle
        "
      >
        <wbr />
      </th>
      <th
        v-if="
          quintable.configFinal.select &&
          quintable.configFinal.selectPosition === 'pre'
        "
        class="
          select-th
          pre
          quintable--table-container--table--header-row--select-th
          quintable--table-container--table--header-row--select-th--pre
        "
      >
        <template v-if="quintable.configFinal.selectAll && !quintable.noRows">
          <p-check
            v-if="quintable.configFinal.prettySelect"
            name="check"
            class="p-icon p-smooth"
            v-model="quintable.allSelectedProperty"
            @change="quintable.checkAll()"
          >
            <template slot="extra">
              <span
                ><font-awesome-icon
                  v-if="quintable.allSelectedProperty"
                  icon="check"
                  class="text-success icon-check"
              /></span>
              <span
                ><font-awesome-icon
                  v-if="
                    quintable.someSelected && !quintable.allSelectedProperty
                  "
                  icon="square"
                  class="text-success icon-check"
              /></span>
            </template>
          </p-check>
          <label v-else class="mb-0 mt-0">
            <input
              type="checkbox"
              v-model="quintable.allSelectedProperty"
              @change="quintable.checkAll()"
            />
          </label>
        </template>
      </th>
      <template v-for="(headline, hIndex) in quintable.configFinal.headlines">
        <th
          v-if="
            ((quintable.configFinal.columns[hIndex] &&
              !quintable.configFinal.columns[hIndex].breakpoint) ||
              quintable.hiddenBreakpoints.findIndex(
                (x) =>
                  quintable.configFinal.columns[hIndex] &&
                  x === quintable.configFinal.columns[hIndex].breakpoint
              ) === -1) &&
            !quintable.configFinal.columns[hIndex].sticky &&
            !quintable.configFinal.hiddenCols[hIndex] &&
            !quintable.emptyColumns[hIndex]
          "
          :class="quintable.headerClass[hIndex]"
          :title="quintable.configFinal.columns[hIndex].title"
          :key="'headline-' + hIndex"
          @click.stop="quintable.setSortColumn(hIndex)"
        >
          <span
            class="
              headline
              quintable--table-container--table--header-row--th--headline
            "
            v-html="headline"
            v-if="quintable.showHeadlines[hIndex]"
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
            v-if="quintable.configFinal.sorts[hIndex]"
          >
            <font-awesome-icon
              v-if="!quintable.currentSortIndexes[hIndex]"
              icon="sort"
              class="text-primary"
            />
            <font-awesome-icon
              v-if="
                quintable.currentSortIndexes[hIndex] &&
                quintable.currentSortIndexes[hIndex].asc
              "
              icon="sort-amount-down-alt"
              class="text-primary"
            />
            <font-awesome-icon
              v-if="
                quintable.currentSortIndexes[hIndex] &&
                !quintable.currentSortIndexes[hIndex].asc
              "
              icon="sort-amount-down"
              class="text-primary"
            />
            <span
              v-if="quintable.currentSortIndexes[hIndex]"
              @click.stop.prevent="quintable.removeSort(hIndex)"
              class="ms-1 text-muted"
            >
              <span
                class="badge bg-info text-white"
                v-if="quintable.numberOfSorts > 1"
              >
                {{ quintable.currentSortIndexes[hIndex].order + 1 }}
              </span>
              <small v-else>
                <font-awesome-icon icon="times" />
              </small>
            </span>
          </span>
        </th>
      </template>
      <th
        v-if="
          quintable.configFinal.select &&
          quintable.configFinal.selectPosition === 'post'
        "
        class="
          select-th
          post
          quintable--table-container--table--header-row--select-th
          quintable--table-container--table--header-row--select-th--post
        "
      >
        <template v-if="quintable.configFinal.selectAll && !quintable.noRows">
          <p-check
            v-if="quintable.configFinal.prettySelect"
            name="check"
            class="p-icon p-smooth"
            v-model="quintable.allSelectedProperty"
            @change="quintable.checkAll()"
          >
            <template slot="extra">
              <span
                ><font-awesome-icon
                  v-if="quintable.allSelectedProperty"
                  icon="check"
                  class="text-success icon-check"
              /></span>
              <span
                ><font-awesome-icon
                  v-if="
                    quintable.someSelected && !quintable.allSelectedProperty
                  "
                  icon="square"
                  class="text-success icon-check"
              /></span>
            </template>
          </p-check>
          <label v-else class="mb-0 mt-0">
            <input
              type="checkbox"
              v-model="quintable.allSelectedProperty"
              @change="quintable.checkAll()"
            />
          </label>
        </template>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "TableHeader",
  inject: ["quintable"],
};
</script>
