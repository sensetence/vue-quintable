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
          <pagination-nav
            v-if="
              quintable.configFinal &&
              quintable.configFinal.pagination &&
              quintable.pages > 1
            "
            :pages="quintable.pages"
            :current-page="quintable.currentPage"
            :page-range="quintable.pageRange"
            :visible-pages="quintable.visiblePages"
            :has-visible-rows="!!quintable.numberOfVisibleRows"
            :disabled="quintable.ajaxLoading"
            @goto="quintable.gotoPage($event)"
            @offset="quintable.updatePageOffset($event)"
          />

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
import PaginationNav from "./PaginationNav.vue";

export default {
  name: "PaginationFooter",
  inject: ["quintable"],
  components: { PaginationNav },
};
</script>
