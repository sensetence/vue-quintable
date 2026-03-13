<template>
  <div class="clearfix quintable--table-footer-container">
    <div class="row">
      <div class="col-lg-4 quintable--table-footer-container--sort-container">
        <div
          class="
            pb-lg-0 pb-3
            float-start
            quintable--table-footer-container--sort-container--sort-select
          "
          v-if="
            quintable.configFinal.multiSortSelect ||
            quintable.configFinal.pageSortSelect
          "
        >
          <span
            :class="quintable.configFinal.pageSort ? 'me-3' : ''"
            v-if="quintable.configFinal.multiSortSelect"
            ><p-check
              class="
                p-switch
                quintable--table-footer-container--sort-container--sort-select--multi-sort-select
              "
              v-model="quintable.multiSort"
              value="true"
              >{{ quintable.configFinal.multiSortPlaceholder }}</p-check
            ></span
          >
          <p-check
            v-if="quintable.configFinal.pageSortSelect"
            class="
              p-switch
              quintable--table-footer-container--sort-container--sort-select--page-sort-select
            "
            v-model="quintable.pageSort"
            value="true"
            >{{ quintable.configFinal.pageSortPlaceholder }}</p-check
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
          v-if="quintable.configFinal && quintable.configFinal.pagination"
        >
          <div
            v-if="quintable.configFinal.rowsSelect"
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
              v-html="quintable.configFinal.rowsPlaceholder"
            ></span>
            <v-select
              class="
                d-inline-block
                align-middle
                quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select
              "
              :options="quintable.paginationOptionsFilled"
              v-model="quintable.currentRowsPerPageProperty"
              :clearable="false"
            />
          </div>
          <nav
            v-if="
              quintable.configFinal &&
              quintable.configFinal.pagination &&
              quintable.pages > 1
            "
            class="
              d-inline-block
              align-middle
              mb-2
              quintable--table-footer-container--pagination-wrapper--pagination-container--nav
            "
            :class="{
              'me-3': quintable.numberOfVisibleRows,
              disabled: quintable.ajaxLoading,
            }"
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
                v-if="quintable.pages > quintable.pageRange"
                :class="{ disabled: quintable.currentPage <= 1 }"
                @click="quintable.gotoPage('first')"
              >
                <span class="page-link">
                  <font-awesome-icon icon="angle-double-left" />
                </span>
              </li>
              <li
                class="page-item"
                :class="{ disabled: quintable.currentPage <= 1 }"
                @click="quintable.gotoPage('prev')"
              >
                <span class="page-link">
                  <font-awesome-icon icon="angle-left" />
                </span>
              </li>
              <li
                class="page-item"
                v-if="
                  quintable.pageRange < quintable.pages &&
                  quintable.visiblePages[0] > 1
                "
                @click="quintable.updatePageOffset(-1)"
              >
                <span class="page-link"> ... </span>
              </li>

              <li
                :key="'pagination-item-' + page"
                class="page-item"
                :class="{ active: page === quintable.currentPage }"
                v-for="page in quintable.visiblePages"
                @click="quintable.gotoPage(page)"
              >
                <span class="page-link">
                  {{ page }}
                </span>
              </li>

              <li
                class="page-item"
                v-if="
                  quintable.pageRange < quintable.pages &&
                  quintable.visiblePages[quintable.visiblePages.length - 1] <
                    quintable.pages
                "
                @click="quintable.updatePageOffset(1)"
              >
                <span class="page-link"> ... </span>
              </li>

              <li
                class="page-item"
                :class="{ disabled: quintable.pages === quintable.currentPage }"
                @click="quintable.gotoPage('next')"
              >
                <span class="page-link">
                  <font-awesome-icon icon="angle-right" />
                </span>
              </li>
              <li
                class="page-item"
                v-if="quintable.pages > quintable.pageRange"
                :class="{ disabled: quintable.pages === quintable.currentPage }"
                @click="quintable.gotoPage('last')"
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
            v-if="quintable.numberOfVisibleRows"
            >{{ quintable.firstVisibleRow }}-{{ quintable.lastVisibleRow }}
            {{ quintable.configFinal.numberOfVisibleRowsFillerWord }}
            {{ quintable.numberOfVisibleRows }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationFooter",
  inject: ["quintable"],
};
</script>
