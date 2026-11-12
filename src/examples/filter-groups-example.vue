<template>
  <div class="content">
    <alert-info
      >Find a flat. Two filter groups decide which flats show: the outdoor space
      (any of the ticked ones, <code>OR</code>) and the size and rent (both,
      <code>AND</code>). <code>filterGroupRelation</code> joins the two
      groups.</alert-info
    >

    <div class="row g-3 mb-3">
      <fieldset class="col-md-4">
        <legend class="fs-6 mb-2">Outdoor space</legend>
        <div v-for="option in OUTDOOR" :key="option" class="form-check">
          <input
            :id="`outdoor-${option}`"
            v-model="outdoor"
            class="form-check-input"
            type="checkbox"
            :value="option"
          />
          <label
            class="form-check-label text-capitalize"
            :for="`outdoor-${option}`"
            >{{ option }}</label
          >
        </div>
      </fieldset>
      <div class="col-md-4">
        <label class="form-label" for="min-rooms"
          >At least {{ minRooms }} rooms</label
        >
        <input
          id="min-rooms"
          v-model.number="minRooms"
          class="form-range"
          type="range"
          min="1"
          max="5"
        />
        <label class="form-label" for="max-rent"
          >At most €{{ maxRent }} rent</label
        >
        <input
          id="max-rent"
          v-model.number="maxRent"
          class="form-range"
          type="range"
          min="600"
          max="2400"
          step="100"
        />
      </div>
      <fieldset class="col-md-4">
        <legend class="fs-6 mb-2">The groups must</legend>
        <div class="form-check">
          <input
            id="relation-and"
            v-model="relation"
            class="form-check-input"
            type="radio"
            value="AND"
          />
          <label class="form-check-label" for="relation-and"
            >both match (AND)</label
          >
        </div>
        <div class="form-check">
          <input
            id="relation-or"
            v-model="relation"
            class="form-check-input"
            type="radio"
            value="OR"
          />
          <label class="form-check-label" for="relation-or"
            >either match (OR)</label
          >
        </div>
      </fieldset>
    </div>

    <p class="mb-2" aria-live="polite">
      Showing flats with <strong>{{ rule }}</strong
      >: {{ matches }} of {{ rows.length }}.
    </p>

    <!-- table -->
    <vue-quintable
      :config="config"
      :rows="rows"
      :filters="filters"
      :filter-groups="filterGroups"
      @filtered:rows="(visible: unknown[]) => (matches = visible.length)"
    />

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./filter-groups-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const OUTDOOR = ["balcony", "garden", "terrace"];

const outdoor = ref(["balcony", "garden"]);
const minRooms = ref(2);
const maxRent = ref(1500);
const relation = ref<"AND" | "OR">("AND");
const matches = ref(0);

// One filter per name. A ticked outdoor space filters for rows that have it.
const filters = computed(() => ({
  rooms: { operator: "greaterEqual", values: minRooms.value },
  rent: { operator: "lessEqual", values: maxRent.value },
  ...Object.fromEntries(outdoor.value.map((name) => [name, true])),
}));

// An OR group with no ticked item would match nothing, so it is left out then.
const filterGroups = computed(() => [
  ...(outdoor.value.length
    ? [
        {
          relation: "OR",
          items: outdoor.value.map((name) => ({ name })),
        },
      ]
    : []),
  { relation: "AND", items: [{ name: "rooms" }, { name: "rent" }] },
]);

const rule = computed(() => {
  const size = `${minRooms.value}+ rooms and €${maxRent.value} or less`;
  if (!outdoor.value.length) {
    return size;
  }
  return `(${outdoor.value.join(" or ")}) ${relation.value} (${size})`;
});

// table data
const config = computed(() => ({
  columns: [
    { headline: "Flat" },
    { headline: "Rooms", align: "end" },
    { headline: "Rent", align: "end" },
    { headline: "Outdoor space", breakpoint: "sm" },
  ],
  filterGroupRelation: relation.value,
}));

const flats = [
  { name: "Altbau near the park", rooms: 3, rent: 1450, outdoor: ["balcony"] },
  { name: "Loft by the canal", rooms: 2, rent: 1900, outdoor: ["terrace"] },
  {
    name: "Garden flat, ground floor",
    rooms: 4,
    rent: 1700,
    outdoor: ["garden"],
  },
  { name: "Studio in the old town", rooms: 1, rent: 780, outdoor: [] },
  {
    name: "Family flat with yard",
    rooms: 5,
    rent: 2300,
    outdoor: ["garden", "terrace"],
  },
  {
    name: "Top floor with view",
    rooms: 2,
    rent: 1250,
    outdoor: ["balcony", "terrace"],
  },
  { name: "Quiet courtyard flat", rooms: 3, rent: 1100, outdoor: [] },
  {
    name: "Corner flat on the square",
    rooms: 2,
    rent: 980,
    outdoor: ["balcony"],
  },
];

const rows = flats.map((flat) => ({
  filters: {
    rooms: flat.rooms,
    rent: flat.rent,
    balcony: flat.outdoor.includes("balcony"),
    garden: flat.outdoor.includes("garden"),
    terrace: flat.outdoor.includes("terrace"),
  },
  cells: [
    { text: flat.name },
    { text: flat.rooms },
    { text: `€${flat.rent}` },
    { text: flat.outdoor.join(", ") || "None" },
  ],
}));
</script>
