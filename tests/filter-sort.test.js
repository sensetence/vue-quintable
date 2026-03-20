import { describe, it, expect, vi } from "vitest"
import { nextTick } from "vue";;
import { createTable, objectRows } from "./helpers";

describe("Filter groups and advanced filtering", () => {
  function filterConfig() {
    return {
      columns: [{ headline: "Name" }, { headline: "Status" }],
    };
  }

  function rowsWithFilters() {
    return [
      {
        cells: [{ text: "Alice" }, { text: "active" }],
        filters: { name: "Alice", status: "active" },
      },
      {
        cells: [{ text: "Bob" }, { text: "inactive" }],
        filters: { name: "Bob", status: "inactive" },
      },
      {
        cells: [{ text: "Charlie" }, { text: "active" }],
        filters: { name: "Charlie", status: "active" },
      },
    ];
  }

  it("doFiltering with AND filter group relation", () => {
    const rows = rowsWithFilters();
    const w = createTable({
      config: { ...filterConfig(), filterGroupRelation: "AND" },
      rows,
      props: {
        filters: { name: "Alice", status: "active" },
        filterGroups: [
          { relation: "AND", items: [{ name: "name" }, { name: "status" }] },
        ],
      },
    });
    const result = w.vm.doFiltering(rows[0].filters);
    expect(result).toBe(true);
    w.unmount();
  });

  it("doFiltering with AND group returns false when not all match", () => {
    const rows = rowsWithFilters();
    const w = createTable({
      config: { ...filterConfig(), filterGroupRelation: "AND" },
      rows,
      props: {
        filters: { name: "Alice", status: "inactive" },
        filterGroups: [
          { relation: "AND", items: [{ name: "name" }, { name: "status" }] },
        ],
      },
    });
    const result = w.vm.doFiltering(rows[0].filters);
    expect(result).toBe(false);
    w.unmount();
  });

  it("doFiltering with OR filter group relation", () => {
    const rows = rowsWithFilters();
    const w = createTable({
      config: { ...filterConfig(), filterGroupRelation: "OR" },
      rows,
      props: {
        filters: { name: "Alice", status: "inactive" },
        filterGroups: [
          { relation: "OR", items: [{ name: "name" }] },
          { relation: "OR", items: [{ name: "status" }] },
        ],
      },
    });
    // name matches Alice in first group
    const result = w.vm.doFiltering(rows[0].filters);
    expect(result).toBe(true);
    w.unmount();
  });

  it("doFilteringForGroup with AND relation matches", () => {
    const w = createTable({
      config: filterConfig(),
      rows: rowsWithFilters(),
      props: {
        filters: { name: "Alice", status: "active" },
        filterGroups: [
          { relation: "AND", items: [{ name: "name" }, { name: "status" }] },
        ],
      },
    });
    const group = {
      relation: "AND",
      items: [{ name: "name" }, { name: "status" }],
    };
    const result = w.vm.doFilteringForGroup(
      { name: "Alice", status: "active" },
      { name: "Alice", status: "active" },
      group
    );
    expect(result).toBe(true);
    w.unmount();
  });

  it("doFilteringForGroup with AND relation fails on mismatch", () => {
    const w = createTable({
      config: filterConfig(),
      rows: rowsWithFilters(),
      props: {
        filters: { name: "Alice", status: "inactive" },
        filterGroups: [
          { relation: "AND", items: [{ name: "name" }, { name: "status" }] },
        ],
      },
    });
    const group = {
      relation: "AND",
      items: [{ name: "name" }, { name: "status" }],
    };
    const result = w.vm.doFilteringForGroup(
      { name: "Alice", status: "inactive" },
      { name: "Alice", status: "active" },
      group
    );
    expect(result).toBe(false);
    w.unmount();
  });

  it("doFilteringForGroup with OR relation matches one", () => {
    const w = createTable({
      config: filterConfig(),
      rows: rowsWithFilters(),
      props: {
        filters: { name: "Alice", status: "inactive" },
        filterGroups: [
          { relation: "OR", items: [{ name: "name" }, { name: "status" }] },
        ],
      },
    });
    const group = {
      relation: "OR",
      items: [{ name: "name" }, { name: "status" }],
    };
    const result = w.vm.doFilteringForGroup(
      { name: "Alice", status: "inactive" },
      { name: "Alice", status: "active" },
      group
    );
    expect(result).toBe(true);
    w.unmount();
  });

  it("doFilteringForGroup with nested group", () => {
    const w = createTable({
      config: filterConfig(),
      rows: rowsWithFilters(),
      props: {
        filters: { name: "Alice", status: "active" },
        filterGroups: [
          {
            relation: "AND",
            items: [
              { name: "name" },
              { relation: "AND", items: [{ name: "status" }] },
            ],
          },
        ],
      },
    });
    const group = {
      relation: "AND",
      items: [
        { name: "name" },
        { relation: "AND", items: [{ name: "status" }] },
      ],
    };
    const result = w.vm.doFilteringForGroup(
      { name: "Alice", status: "active" },
      { name: "Alice", status: "active" },
      group
    );
    expect(result).toBe(true);
    w.unmount();
  });

  it("doFilteringForGroup with neither AND nor OR returns true", () => {
    const w = createTable({
      config: filterConfig(),
      rows: rowsWithFilters(),
      props: {
        filters: { name: "Alice" },
        filterGroups: [],
      },
    });
    const group = { relation: "UNKNOWN", items: [{ name: "name" }] };
    const result = w.vm.doFilteringForGroup(
      { name: "Alice" },
      { name: "Alice" },
      group
    );
    expect(result).toBe(true);
    w.unmount();
  });

  it("filter with 'contains' operator", () => {
    const rows = [
      {
        cells: [{ text: "Alice" }, { text: "active" }],
        filters: { name: "Alice" },
      },
    ];
    const w = createTable({
      config: filterConfig(),
      rows,
      props: {
        filters: { name: { values: "li", operator: "contains" } },
        filterGroups: [],
      },
    });
    const filtered = w.vm.filteredRows;
    expect(filtered[0]).toBe(true);
    w.unmount();
  });

  it("filter with 'greater' operator", () => {
    const rows = [
      { cells: [{ text: "Alice" }, { text: 10 }], filters: { age: 10 } },
      { cells: [{ text: "Bob" }, { text: 20 }], filters: { age: 20 } },
    ];
    const w = createTable({
      config: { columns: [{ headline: "Name" }, { headline: "Age" }] },
      rows,
      props: {
        filters: { age: { values: 15, operator: "greater" } },
        filterGroups: [],
      },
    });
    const filtered = w.vm.filteredRows;
    expect(filtered[0]).toBe(false);
    expect(filtered[1]).toBe(true);
    w.unmount();
  });

  it("filter with custom compare function", () => {
    const rows = [
      {
        cells: [{ text: "Alice" }, { text: "active" }],
        filters: { name: "Alice" },
      },
      {
        cells: [{ text: "Bob" }, { text: "inactive" }],
        filters: { name: "Bob" },
      },
    ];
    const w = createTable({
      config: filterConfig(),
      rows,
      props: {
        filters: {
          name: { values: "alice", compare: (a, b) => b.toLowerCase() === a },
        },
        filterGroups: [],
      },
    });
    const filtered = w.vm.filteredRows;
    expect(filtered[0]).toBe(true);
    expect(filtered[1]).toBe(false);
    w.unmount();
  });

  it("filter with array values (multiple filter values)", () => {
    const rows = [
      {
        cells: [{ text: "Alice" }, { text: "active" }],
        filters: { status: "active" },
      },
      {
        cells: [{ text: "Bob" }, { text: "pending" }],
        filters: { status: "pending" },
      },
    ];
    const w = createTable({
      config: filterConfig(),
      rows,
      props: {
        filters: { status: ["active"] },
        filterGroups: [],
      },
    });
    const filtered = w.vm.filteredRows;
    // With default operator "equal", first value "active" matches first row
    expect(filtered[0]).toBe(true);
    expect(filtered[1]).toBe(false);
    w.unmount();
  });

  it("filter with regex (matches operator)", () => {
    const rows = [
      {
        cells: [{ text: "Alice" }, { text: "active" }],
        filters: { name: "Alice" },
      },
      {
        cells: [{ text: "Bob" }, { text: "inactive" }],
        filters: { name: "Bob" },
      },
    ];
    const w = createTable({
      config: filterConfig(),
      rows,
      props: {
        filters: { name: { values: /^Ali/, operator: "matches" } },
        filterGroups: [],
      },
    });
    const filtered = w.vm.filteredRows;
    expect(filtered[0]).toBe(true);
    expect(filtered[1]).toBe(false);
    w.unmount();
  });

  it("rows without filter property are excluded when filters active", () => {
    const rows = [
      {
        cells: [{ text: "Alice" }, { text: "active" }],
        filters: { name: "Alice" },
      },
      { cells: [{ text: "Bob" }, { text: "inactive" }] },
    ];
    const w = createTable({
      config: filterConfig(),
      rows,
      props: {
        filters: { name: "Alice" },
        filterGroups: [],
      },
    });
    const filtered = w.vm.filteredRows;
    expect(filtered[0]).toBe(true);
    expect(filtered[1]).toBe(false);
    w.unmount();
  });

  it("getFilterValues handles RegExp", () => {
    const w = createTable({ config: filterConfig(), rows: rowsWithFilters() });
    const regex = /test/;
    expect(w.vm.getFilterValues(regex)).toEqual([regex]);
    w.unmount();
  });

  it("getFilterValues handles null", () => {
    const w = createTable({ config: filterConfig(), rows: rowsWithFilters() });
    expect(w.vm.getFilterValues(null)).toEqual([null]);
    w.unmount();
  });

  it("getFilterValues handles primitive", () => {
    const w = createTable({ config: filterConfig(), rows: rowsWithFilters() });
    expect(w.vm.getFilterValues("test")).toEqual(["test"]);
    w.unmount();
  });

  it("getFilterValues handles array", () => {
    const w = createTable({ config: filterConfig(), rows: rowsWithFilters() });
    expect(w.vm.getFilterValues(["a", "b"])).toEqual(["a", "b"]);
    w.unmount();
  });

  it("getFilterValues handles object with values", () => {
    const w = createTable({ config: filterConfig(), rows: rowsWithFilters() });
    expect(w.vm.getFilterValues({ values: "test", operator: "equal" })).toEqual(
      ["test"]
    );
    w.unmount();
  });

  it("findInFilterGroups finds key in flat group", () => {
    const w = createTable({ config: filterConfig(), rows: rowsWithFilters() });
    const arr = [{ name: "status" }, { name: "name" }];
    expect(w.vm.findInFilterGroups("name", arr)).toBe(true);
    expect(w.vm.findInFilterGroups("missing", arr)).toBe(false);
    w.unmount();
  });

  it("findInFilterGroups finds key in nested groups", () => {
    const w = createTable({ config: filterConfig(), rows: rowsWithFilters() });
    const arr = [
      { items: [{ name: "status" }, { items: [{ name: "deep" }] }] },
    ];
    expect(w.vm.findInFilterGroups("deep", arr)).toBe(true);
    w.unmount();
  });

  it("findInFilterGroups returns false for null input", () => {
    const w = createTable({ config: filterConfig(), rows: rowsWithFilters() });
    expect(w.vm.findInFilterGroups("name", null)).toBe(false);
    w.unmount();
  });
});

describe("Sort edge cases", () => {
  it("sort with pageSort flag sorts only visible page", async () => {
    const rows = [
      [{ text: "C" }, { text: 3 }],
      [{ text: "A" }, { text: 1 }],
      [{ text: "B" }, { text: 2 }],
      [{ text: "D" }, { text: 4 }],
      [{ text: "E" }, { text: 5 }],
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Num" }],
        pagination: 2,
        pageSortSelect: true,
      },
      rows,
    });
    w.vm.customPageSort = true;
    await nextTick();
    w.vm.setSortColumn(0, true);
    await nextTick();
    // Only first 2 (current page) should be sorted
    const idx0 = w.vm.sortedIndexes["0"];
    const idx1 = w.vm.sortedIndexes["1"];
    // After page sort, first page items should be alphabetically ordered
    const name0 = rows[idx0][0].text;
    const name1 = rows[idx1][0].text;
    expect(name0 <= name1).toBe(true);
    w.unmount();
  });

  it("sort with ajax and no pageSort triggers loadViaAjax", async () => {
    const ax = {
      request: vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } }),
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    ax.request.mockClear();
    w.vm.setSortColumn(0);
    await nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.unmount();
  });

  it("removeSort with last sort resets everything", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Age" }],
      },
    });
    w.vm.setSortColumn(0);
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(1);
    w.vm.removeSort("0");
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(0);
    w.unmount();
  });

  it("removeSort with ajax triggers loadViaAjax", async () => {
    const ax = {
      request: vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } }),
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    w.vm.setSortColumn(0);
    await nextTick();
    ax.request.mockClear();
    w.vm.removeSort("0");
    await nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.unmount();
  });

  it("sort with computeSortValue uses custom value", () => {
    const rows = [
      [{ text: "B", computeSortValue: () => 2 }, { text: 1 }],
      [{ text: "A", computeSortValue: () => 1 }, { text: 2 }],
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Num" }],
      },
      rows,
    });
    w.vm.setSortColumn(0, true);
    expect(w.vm.sortedIndexes["0"]).toBe(1); // A first
    expect(w.vm.sortedIndexes["1"]).toBe(0); // B second
    w.unmount();
  });

  it("sort descending", () => {
    const rows = [
      [{ text: "A" }, { text: 1 }],
      [{ text: "C" }, { text: 3 }],
      [{ text: "B" }, { text: 2 }],
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Num" }],
      },
      rows,
    });
    w.vm.setSortColumn(0, false);
    expect(w.vm.sortedIndexes["0"]).toBe(1); // C first
    w.unmount();
  });

  it("sort with html cells", () => {
    const rows = [
      [{ html: "<b>B</b>" }, { text: 1 }],
      [{ html: "<b>A</b>" }, { text: 2 }],
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Num" }],
      },
      rows,
    });
    w.vm.setSortColumn(0, true);
    expect(w.vm.sortedIndexes["0"]).toBe(1); // <b>A</b> first
    w.unmount();
  });

  it("sort with sortValue uses sortValue over text", () => {
    const rows = [
      [{ text: "A", sortValue: 2 }, { text: 1 }],
      [{ text: "B", sortValue: 1 }, { text: 2 }],
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Num" }],
      },
      rows,
    });
    w.vm.setSortColumn(0, true);
    expect(w.vm.sortedIndexes["0"]).toBe(1); // sortValue 1 first
    w.unmount();
  });

  it("multiSort sorts by multiple columns", () => {
    const rows = [
      [{ text: "A" }, { text: 2 }],
      [{ text: "A" }, { text: 1 }],
      [{ text: "B" }, { text: 3 }],
    ];
    const w = createTable({
      config: {
        columns: [
          { headline: "Name", sort: true },
          { headline: "Num", sort: true },
        ],
        multiSort: true,
      },
      rows,
    });
    w.vm.setSortColumn(0, true);
    w.vm.setSortColumn(1, true);
    // A rows should be before B, and within A, num 1 before num 2
    expect(w.vm.sortedIndexes["0"]).toBe(1); // A,1
    expect(w.vm.sortedIndexes["1"]).toBe(0); // A,2
    expect(w.vm.sortedIndexes["2"]).toBe(2); // B,3
    w.unmount();
  });

  it("setSortColumn toggles direction on second call", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Age" }],
      },
    });
    w.vm.setSortColumn(0);
    expect(w.vm.currentSortIndexes["0"].asc).toBe(true);
    w.vm.setSortColumn(0);
    expect(w.vm.currentSortIndexes["0"].asc).toBe(false);
    w.unmount();
  });

  it("setSortColumn with ASC string config", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: "ASC" }, { headline: "Age" }],
      },
    });
    w.vm.setSortColumn(0);
    expect(w.vm.currentSortIndexes["0"].asc).toBe(true);
    w.unmount();
  });

  it("setSortColumn with firstSortDirection DESC", () => {
    const w = createTable({
      config: {
        columns: [
          { headline: "Name", sort: true, firstSortDirection: "DESC" },
          { headline: "Age" },
        ],
      },
    });
    w.vm.setSortColumn(0);
    expect(w.vm.currentSortIndexes["0"].asc).toBe(false);
    w.unmount();
  });

  it("setSortColumn ignores unsortable column", () => {
    const w = createTable({
      config: { columns: [{ headline: "Name" }, { headline: "Age" }] },
    });
    w.vm.setSortColumn(0);
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(0);
    w.unmount();
  });

  it("sort without keepSelect resets selection", () => {
    const rows = objectRows();
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Age" }],
        select: true,
      },
      rows,
    });
    w.vm.selected[0] = true;
    w.vm.setSortColumn(0);
    expect(w.vm.selected[0]).toBe(false);
    w.unmount();
  });

  it("sort with keepSelect preserves selection", () => {
    const rows = objectRows();
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Age" }],
        select: true,
        keepSelect: true,
      },
      rows,
    });
    w.vm.selected[0] = true;
    w.vm.setSortColumn(0);
    expect(w.vm.selected[0]).toBe(true);
    w.unmount();
  });

  it("removeSort with multiple sorts reorders", () => {
    const w = createTable({
      config: {
        columns: [
          { headline: "A", sort: true },
          { headline: "B", sort: true },
        ],
        multiSort: true,
      },
    });
    w.vm.setSortColumn(0);
    w.vm.setSortColumn(1);
    expect(w.vm.currentSortIndexes["0"].order).toBe(0);
    expect(w.vm.currentSortIndexes["1"].order).toBe(1);
    w.vm.removeSort("0");
    // The remaining sort should have order 0
    expect(w.vm.currentSortIndexes["1"].order).toBe(0);
    w.unmount();
  });

  it("sort with numeric string values sorts numerically", () => {
    const rows = [
      [{ text: "10" }, { text: "x" }],
      [{ text: "2" }, { text: "x" }],
      [{ text: "1" }, { text: "x" }],
    ];
    const w = createTable({
      config: { columns: [{ headline: "Num", sort: true }, { headline: "B" }] },
      rows,
    });
    w.vm.setSortColumn(0, true);
    expect(w.vm.sortedIndexes["0"]).toBe(2); // 1
    expect(w.vm.sortedIndexes["1"]).toBe(1); // 2
    expect(w.vm.sortedIndexes["2"]).toBe(0); // 10
    w.unmount();
  });
});
