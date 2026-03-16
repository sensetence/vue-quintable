import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createTable, generateRows, objectRows } from "./helpers";

/**
 * Targeted tests hitting remaining uncovered lines.
 */

describe("checkListener (lines 3190-3216)", () => {
  it("checkListener sets allSelectedProperty false when not all selected", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }] },
      { cells: [{ text: "B" }, { text: 2 }] },
      { cells: [{ text: "C" }, { text: 3 }] },
    ];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
    });
    w.vm.$set(w.vm.selected, 0, true);
    w.vm.$set(w.vm.selected, 1, false);
    w.vm.$set(w.vm.selected, 2, false);
    w.vm.checkListener(true, 0);
    expect(w.vm.allSelectedProperty).toBe(false);
    w.destroy();
  });

  it("checkListener sets allSelectedProperty true when all selected", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }] },
      { cells: [{ text: "B" }, { text: 2 }] },
    ];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
    });
    w.vm.$set(w.vm.selected, 0, true);
    w.vm.$set(w.vm.selected, 1, true);
    w.vm.checkListener(true, 1);
    expect(w.vm.allSelectedProperty).toBe(true);
    w.destroy();
  });

  it("checkListener with selectAllRows false filters to visible rows", () => {
    const rows = generateRows(5);
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        pagination: 2,
      },
      rows,
    });
    // Select only visible rows on page 1
    w.vm.$set(w.vm.selected, 0, true);
    w.vm.$set(w.vm.selected, 1, true);
    w.vm.checkListener(true, 1);
    expect(w.vm.allSelectedProperty).toBe(true);
    w.destroy();
  });

  it("checkListener with selectAllRows true checks all rows", () => {
    const rows = generateRows(5);
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        selectAllRows: true,
        pagination: 2,
      },
      rows,
    });
    // Select only 2 of 5 rows
    w.vm.$set(w.vm.selected, 0, true);
    w.vm.$set(w.vm.selected, 1, true);
    w.vm.checkListener(true, 1);
    // Not all 5 are selected
    expect(w.vm.allSelectedProperty).toBe(false);
    w.destroy();
  });

  it("checkListener with selectAllRows true and all selected", () => {
    const rows = generateRows(3);
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        selectAllRows: true,
      },
      rows,
    });
    w.vm.$set(w.vm.selected, 0, true);
    w.vm.$set(w.vm.selected, 1, true);
    w.vm.$set(w.vm.selected, 2, true);
    w.vm.checkListener(true, 2);
    expect(w.vm.allSelectedProperty).toBe(true);
    w.destroy();
  });

  it("checkListener handles disableSelect rows as selected", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }] },
      { cells: [{ text: "B" }, { text: 2 }], disableSelect: true },
    ];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
    });
    w.vm.$set(w.vm.selected, 0, true);
    w.vm.$set(w.vm.selected, 1, false);
    w.vm.checkListener(true, 0);
    // disableSelect counts as true, so all should be selected
    expect(w.vm.allSelectedProperty).toBe(true);
    w.destroy();
  });
});

describe("visiblePages edge cases (lines 2287-2298)", () => {
  it("visiblePages with odd pageRange and currentPage near end (off++)", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 1,
        pageRange: 5,
      },
      rows: generateRows(10),
    });
    // Go to page 9, near end with off=2, 9+2=11>10 so off becomes 3
    w.vm.gotoPage(9);
    expect(w.vm.visiblePages).toContain(9);
    expect(w.vm.visiblePages.length).toBeLessThanOrEqual(5);
    w.destroy();
  });

  it("visiblePages breaks when page exceeds total", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 1,
        pageRange: 10,
      },
      rows: generateRows(3),
    });
    // pageRange=10 but only 3 pages, so it should break early
    expect(w.vm.visiblePages.length).toBe(3);
    w.destroy();
  });
});

describe("Updated watcher with clear (line 2726)", () => {
  it("updated watcher with clear:true triggers full reload", async () => {
    const ax = {
      request: vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } }),
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local",
      },
      rows: [],
      propsData: { axios: ax, updated: false },
    });
    await w.vm.$nextTick();
    ax.request.mockClear();
    await w.setProps({ updated: { clear: true } });
    await w.vm.$nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.destroy();
  });

  it("updated watcher ignores falsy on non-ajax", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      propsData: { updated: false },
    });
    await w.setProps({ updated: true });
    await w.vm.$nextTick();
    // Should not throw for non-ajax
    w.destroy();
  });
});

describe("currentRowsPerPage watcher edge cases (lines 2865-2878)", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it("currentRowsPerPage stores to localStorage when storeState", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
        pagination: 10,
      },
      propsData: { identifier: "rpp2" },
    });
    w.vm.customRowsPerPage = 5;
    await w.vm.$nextTick();
    expect(localStorage.getItem("vue-quintable-rpp2-rows-per-page")).toBe("5");
    w.destroy();
  });

  it("currentRowsPerPage watcher resets select when on page 1 without selectAllRows", async () => {
    const rows = objectRows();
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        pagination: 10,
      },
      rows,
    });
    w.vm.$set(w.vm.selected, 0, true);
    // Already on page 1
    expect(w.vm.currentPage).toBe(1);
    w.vm.customRowsPerPage = 5;
    await w.vm.$nextTick();
    // Select should be reset
    expect(w.vm.selected[0]).toBe(false);
    w.destroy();
  });

  it("currentRowsPerPage watcher resets page when not on page 1", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        pagination: 1,
      },
      rows: generateRows(5),
    });
    w.vm.gotoPage(3);
    await w.vm.$nextTick();
    w.vm.customRowsPerPage = 2;
    await w.vm.$nextTick();
    expect(w.vm.currentPage).toBe(1);
    w.destroy();
  });
});

describe("Config watcher (line 2915)", () => {
  it("config watcher throws on non-object", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    // Direct watcher call since Vue prop validation prevents non-object
    expect(() => {
      const configWatcher = w.vm.$options.watch.config;
      const handler = Array.isArray(configWatcher)
        ? configWatcher[configWatcher.length - 1]
        : configWatcher;
      (typeof handler === "function" ? handler : handler.handler).call(
        w.vm,
        "string"
      );
    }).toThrow("config must be an object");
    w.destroy();
  });
});

describe("pageSort sort with empty visibleRowIndexes (lines 3879-3883, 3901-3902)", () => {
  it("pageSort sort with no prior sortedIndexes", async () => {
    const rows = generateRows(5);
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        pagination: 2,
      },
      rows,
    });
    // Clear sortedIndexes to trigger fallback
    w.vm.sortedIndexes = {};
    w.vm.customPageSort = true;
    await w.vm.$nextTick();
    w.vm.setSortColumn(0, true);
    expect(Object.keys(w.vm.sortedIndexes).length).toBe(5);
    w.destroy();
  });
});

describe("Sort with more rows than pagination in pageSort (line 4019)", () => {
  it("pageSort exceeds pagination limit", () => {
    const rows = [
      [{ text: "E" }, { text: 5 }],
      [{ text: "D" }, { text: 4 }],
      [{ text: "C" }, { text: 3 }],
      [{ text: "B" }, { text: 2 }],
      [{ text: "A" }, { text: 1 }],
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Num" }],
        pagination: 2,
      },
      rows,
    });
    w.vm.customPageSort = true;
    w.vm.setSortColumn(0, true);
    // Verify all indexes are accounted for
    expect(Object.keys(w.vm.sortedIndexes).length).toBe(5);
    w.destroy();
  });
});

describe("Integer / float string parsing in sort (lines 3972-3982)", () => {
  it("sorts integer strings numerically", () => {
    const rows = [
      [{ text: "100" }, { text: "x" }],
      [{ text: "-5" }, { text: "x" }],
      [{ text: "42" }, { text: "x" }],
    ];
    const w = createTable({
      config: { columns: [{ headline: "Num", sort: true }, { headline: "B" }] },
      rows,
    });
    w.vm.setSortColumn(0, true);
    expect(w.vm.sortedIndexes["0"]).toBe(1); // -5
    expect(w.vm.sortedIndexes["1"]).toBe(2); // 42
    expect(w.vm.sortedIndexes["2"]).toBe(0); // 100
    w.destroy();
  });

  it("sorts float strings numerically", () => {
    const rows = [
      [{ text: "10.5" }, { text: "x" }],
      [{ text: "1.23" }, { text: "x" }],
      [{ text: "5.67" }, { text: "x" }],
    ];
    const w = createTable({
      config: { columns: [{ headline: "Num", sort: true }, { headline: "B" }] },
      rows,
    });
    w.vm.setSortColumn(0, true);
    expect(w.vm.sortedIndexes["0"]).toBe(1); // 1.23
    expect(w.vm.sortedIndexes["1"]).toBe(2); // 5.67
    expect(w.vm.sortedIndexes["2"]).toBe(0); // 10.5
    w.destroy();
  });
});

describe("created() allSelectedCustom branches (lines 4460-4466)", () => {
  it("created sets allSelectedCustom when all rows pre-selected", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }], selected: true },
      { cells: [{ text: "B" }, { text: 2 }], selected: true },
    ];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
    });
    expect(w.vm.allSelectedCustom).toBe(true);
    w.destroy();
  });

  it("created sets allSelectedCustom with selectAllRows", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }], selected: true },
      { cells: [{ text: "B" }, { text: 2 }], selected: true },
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        selectAllRows: true,
      },
      rows,
    });
    expect(w.vm.allSelectedCustom).toBe(true);
    w.destroy();
  });

  it("created does not set allSelectedCustom when partially selected", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }], selected: true },
      { cells: [{ text: "B" }, { text: 2 }] },
    ];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
    });
    // With partial selection, allSelectedCustom should not be true
    expect(w.vm.allSelectedCustom).not.toBe(true);
    w.destroy();
  });
});

describe("initLists early return (line 4068)", () => {
  it("initLists with no rows does not throw", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      rows: [],
    });
    w.vm.initLists();
    // No crash
    expect(Object.keys(w.vm.sortedIndexes).length).toBe(0);
    w.destroy();
  });
});

describe("Debug filter group logging (lines 3547-3562)", () => {
  it("verbose filter group with items logs indented info", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const rows = [
      {
        cells: [{ text: "A" }, { text: "x" }],
        filters: { name: "Alice", status: "active" },
      },
    ];
    const w = createTable({
      config: { columns: [{ headline: "Name" }, { headline: "Status" }] },
      rows,
      propsData: {
        verbose: true,
        filters: { name: "Alice" },
        filterGroups: [
          { relation: "AND", items: [{ name: "name" }, { name: "status" }] },
        ],
      },
    });
    w.vm.doFilteringForGroup(
      { name: "Alice" },
      { name: "Alice", status: "active" },
      { relation: "AND", items: [{ name: "name" }, { name: "status" }] },
      0
    );
    // Debug logging should have been called
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    w.destroy();
  });
});

describe("localStorage exception handling (lines 1586-1589)", () => {
  it("storeState disabled when localStorage throws", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const origSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = vi.fn(() => {
      throw new Error("QuotaExceeded");
    });
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
      },
      propsData: { identifier: "error-tbl" },
    });
    expect(w.vm.configFinal.storeState).toBe(false);
    Storage.prototype.setItem = origSetItem;
    warn.mockRestore();
    w.destroy();
  });
});

describe("onRowClick with nested table class (line 3299)", () => {
  it("onRowClick returns early when target is inside generated-table and not nested", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const parent = document.createElement("div");
    parent.className = "generated-table";
    const target = document.createElement("td");
    parent.appendChild(target);
    w.vm.onRowClick({ target }, 0);
    // Should not emit click:row because of generated-table parent
    expect(w.emitted()["click:row"]).toBeFalsy();
    w.destroy();
  });
});

describe("OR filter group with nested sub-group (line 3667)", () => {
  it("OR group with nested OR sub-group", () => {
    const w = createTable({
      config: { columns: [{ headline: "Name" }, { headline: "Status" }] },
      rows: [
        {
          cells: [{ text: "A" }, { text: "x" }],
          filters: { name: "Alice", status: "active" },
        },
      ],
      propsData: {
        filters: { name: "Bob", status: "active" },
        filterGroups: [
          {
            relation: "OR",
            items: [
              { relation: "OR", items: [{ name: "status" }] },
              { name: "name" },
            ],
          },
        ],
      },
    });
    // status matches (active=active) in the nested group -> should break out
    const result = w.vm.doFilteringForGroup(
      { name: "Bob", status: "active" },
      { name: "Alice", status: "active" },
      {
        relation: "OR",
        items: [
          { relation: "OR", items: [{ name: "status" }] },
          { name: "name" },
        ],
      }
    );
    expect(result).toBe(true);
    w.destroy();
  });
});

describe("Operator edge cases (lines 1306, 1316)", () => {
  it("filter with less operator in filteredRows", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 10 }], filters: { age: 10 } },
      { cells: [{ text: "B" }, { text: 5 }], filters: { age: 5 } },
    ];
    const w = createTable({
      config: { columns: [{ headline: "Name" }, { headline: "Age" }] },
      rows,
      propsData: {
        filters: { age: { values: 8, operator: "less" } },
      },
    });
    const filtered = w.vm.filteredRows;
    expect(filtered[0]).toBe(false); // 10 is not < 8
    expect(filtered[1]).toBe(true); // 5 < 8
    w.destroy();
  });

  it("filter with lessEqual operator in filteredRows", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 10 }], filters: { age: 10 } },
      { cells: [{ text: "B" }, { text: 8 }], filters: { age: 8 } },
    ];
    const w = createTable({
      config: { columns: [{ headline: "Name" }, { headline: "Age" }] },
      rows,
      propsData: {
        filters: { age: { values: 8, operator: "lessEqual" } },
      },
    });
    const filtered = w.vm.filteredRows;
    expect(filtered[0]).toBe(false); // 10 is not <= 8
    expect(filtered[1]).toBe(true); // 8 <= 8
    w.destroy();
  });
});
