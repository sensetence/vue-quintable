<template>
  <div
    v-if="quintable.configFinal.search"
    class="mb-3 quintable--search-container"
    :class="quintable.configFinal.searchContainerClass"
  >
    <slot name="before-search"></slot>
    <slot
      name="search"
      :value="quintable.query"
      :loading="quintable.loading"
      :setSearchQuery="quintable.setSearchQuery"
      :placeholder="quintable.configFinal.searchPlaceholder"
      :search-class="quintable.configFinal.searchClass"
    >
      <div
        class="quintable--search-container--input-container"
        :class="quintable.configFinal.searchClass"
      >
        <input
          type="search"
          :placeholder="quintable.configFinal.searchPlaceholder"
          v-model="quintable.query"
          class="form-control"
        />
      </div>
    </slot>
    <slot name="after-search"></slot>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  inject: ["quintable"],
};
</script>
