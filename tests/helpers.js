import { shallowMount, mount } from "@vue/test-utils";
import VueQuintable from "../src/components/VueQuintable.vue";

/**
 * Helper to create a wrapper with sensible defaults.
 * Pass overrides via `options`.
 */
export function createTable(options = {}) {
  const defaultConfig = {
    columns: [{ headline: "Name" }, { headline: "Age" }],
  };

  const defaultRows = [
    [{ text: "Alice" }, { text: 25 }],
    [{ text: "Bob" }, { text: 30 }],
    [{ text: "Charlie" }, { text: 35 }],
  ];

  const { config, rows, propsData, mountFn, ...rest } = options;

  const fn = mountFn === "mount" ? mount : shallowMount;

  return fn(VueQuintable, {
    propsData: {
      config: config || defaultConfig,
      rows: rows || defaultRows,
      ...(propsData || {}),
    },
    ...rest,
  });
}

/**
 * Rows with row-object format (cells key).
 */
export function objectRows() {
  return [
    { cells: [{ text: "Alice" }, { text: 25 }], classes: "row-a" },
    { cells: [{ text: "Bob" }, { text: 30 }], selected: true },
    { cells: [{ text: "Charlie" }, { text: 35 }], disableSelect: true },
  ];
}

/**
 * Config with sort enabled on first column.
 */
export function sortConfig() {
  return {
    columns: [
      { headline: "Name", sort: true },
      { headline: "Age", sort: true },
    ],
  };
}

/**
 * Config with pagination.
 */
export function paginationConfig(perPage = 2) {
  return {
    columns: [{ headline: "Name" }, { headline: "Age" }],
    pagination: perPage,
  };
}

/**
 * Generate N simple rows.
 */
export function generateRows(n) {
  return Array.from({ length: n }, (_, i) => [
    { text: `Row ${i}` },
    { text: i },
  ]);
}
