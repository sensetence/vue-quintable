<template>
  <nav
    v-if="pages > 1"
    class="
      d-inline-block
      align-middle
      mb-2
      quintable--table-footer-container--pagination-wrapper--pagination-container--nav
    "
    :class="{ 'me-3': hasVisibleRows, disabled: disabled }"
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
        @click="$emit('goto', 'first')"
      >
        <span class="page-link">
          <font-awesome-icon icon="angle-double-left" />
        </span>
      </li>
      <li
        class="page-item"
        :class="{ disabled: currentPage <= 1 }"
        @click="$emit('goto', 'prev')"
      >
        <span class="page-link">
          <font-awesome-icon icon="angle-left" />
        </span>
      </li>
      <li
        class="page-item"
        v-if="pageRange < pages && visiblePages[0] > 1"
        @click="$emit('offset', -1)"
      >
        <span class="page-link"> ... </span>
      </li>

      <li
        :key="'pagination-item-' + page"
        class="page-item"
        :class="{ active: page === currentPage }"
        v-for="page in visiblePages"
        @click="$emit('goto', page)"
      >
        <span class="page-link">
          {{ page }}
        </span>
      </li>

      <li
        class="page-item"
        v-if="
          pageRange < pages && visiblePages[visiblePages.length - 1] < pages
        "
        @click="$emit('offset', 1)"
      >
        <span class="page-link"> ... </span>
      </li>

      <li
        class="page-item"
        :class="{ disabled: pages === currentPage }"
        @click="$emit('goto', 'next')"
      >
        <span class="page-link">
          <font-awesome-icon icon="angle-right" />
        </span>
      </li>
      <li
        class="page-item"
        v-if="pages > pageRange"
        :class="{ disabled: pages === currentPage }"
        @click="$emit('goto', 'last')"
      >
        <span class="page-link">
          <font-awesome-icon icon="angle-double-right" />
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PaginationNav",
  props: {
    pages: { type: Number, required: true },
    currentPage: { type: Number, required: true },
    pageRange: { type: Number, required: true },
    visiblePages: { type: Array, required: true },
    hasVisibleRows: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
};
</script>
