import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  createTable,
  generateRows,
  objectRows,
  paginationConfig,
} from "./helpers";

describe("Watchers", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it("preSelectedRows watcher selects matching rows", async () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }], id: "r1" },
      { cells: [{ text: "B" }, { text: 2 }], id: "r2" },
      { cells: [{ text: "C" }, { text: 3 }], id: "r3" },
    ];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
      propsData: { preSelectedRows: [] },
    });
    await w.setProps({ preSelectedRows: [{ key: "id", value: "r2" }] });
    await w.vm.$nextTick();
    expect(w.vm.selected[1]).toBe(true);
    expect(w.vm.selected[0]).toBe(false);
    w.destroy();
  });

  it("preSelectedRows watcher clears selection when empty array", async () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }], id: "r1", selected: true },
      { cells: [{ text: "B" }, { text: 2 }], id: "r2" },
    ];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
      propsData: { preSelectedRows: [{ key: "id", value: "r1" }] },
    });
    await w.setProps({ preSelectedRows: [] });
    await w.vm.$nextTick();
    expect(w.vm.allSelectedCustom).toBe(false);
    w.destroy();
  });

  it("preSelectedRows null does nothing", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      propsData: { preSelectedRows: [] },
    });
    await w.setProps({ preSelectedRows: null });
    await w.vm.$nextTick();
    // Should not throw
    w.destroy();
  });

  it("filters watcher stores filters when storeState is active", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
      },
      propsData: { identifier: "test-tbl", filters: {} },
    });
    await w.setProps({ filters: { status: "active" } });
    await w.vm.$nextTick();
    const stored = localStorage.getItem("vue-quintable-test-tbl-filters");
    expect(stored).toBeTruthy();
    w.destroy();
  });

  it("filters watcher emits update:filters", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      propsData: { filters: {} },
    });
    await w.setProps({ filters: { status: "x" } });
    await w.vm.$nextTick();
    expect(w.emitted()["update:filters"]).toBeTruthy();
    w.destroy();
  });

  it("updated watcher triggers ajax reload when truthy", async () => {
    const ax = {
      request: vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } }),
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      propsData: { axios: ax, updated: false },
    });
    await w.vm.$nextTick();
    ax.request.mockClear();
    await w.setProps({ updated: true });
    await w.vm.$nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.destroy();
  });

  it("updated watcher with clear triggers full reload", async () => {
    const ax = {
      request: vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } }),
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
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

  it("loading watcher sets loaderHeight", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      propsData: { loading: false },
    });
    await w.setProps({ loading: true });
    await w.vm.$nextTick();
    // loaderHeight should be 0 in jsdom (no real DOM)
    expect(w.vm.loaderHeight).toBe(0);
    w.destroy();
  });

  it("filteredRows watcher emits filtered:rows", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchLength: 1,
      },
    });
    w.vm.query = "Alice";
    await w.vm.$nextTick();
    expect(w.emitted()["filtered:rows"]).toBeTruthy();
    w.destroy();
  });

  it("filteredRows watcher resets currentPage to 1", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchLength: 1,
        pagination: 1,
      },
      rows: generateRows(5),
    });
    w.vm.currentPage = 3;
    await w.vm.$nextTick();
    w.vm.query = "Row 0";
    await w.vm.$nextTick();
    expect(w.vm.currentPage).toBe(1);
    w.destroy();
  });

  it("filteredRows watcher resets activeRow if not in visible rows", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchLength: 1,
        enableRowTabIndex: true,
      },
      rows: generateRows(5),
    });
    w.vm.activeRow = 4;
    await w.vm.$nextTick();
    w.vm.query = "Row 0";
    await w.vm.$nextTick();
    expect(w.vm.activeRow).toBeNull();
    w.destroy();
  });

  it("hiddenBreakpoints watcher emits change:breakpoints on subsequent changes", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    // initBreakpoints must be false for the watcher to emit
    w.vm.initBreakpoints = false;
    w.vm.hiddenBreakpoints = ["sm", "all"];
    await w.vm.$nextTick();
    expect(w.emitted()["change:breakpoints"]).toBeTruthy();
    w.destroy();
  });

  it("hoveredRow watcher emits hover:row", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm.hoveredRow = 0;
    await w.vm.$nextTick();
    expect(w.emitted()["hover:row"]).toBeTruthy();
    w.destroy();
  });

  it("query watcher emits update:search when searchLength met", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchLength: 1,
      },
    });
    w.vm.query = "test";
    await w.vm.$nextTick();
    expect(w.emitted()["update:search"]).toBeTruthy();
    const args = w.emitted()["update:search"][0];
    expect(args[0]).toBe("test");
    w.destroy();
  });

  it("query watcher emits update:search null when cleared", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchLength: 1,
      },
    });
    w.vm.query = "test";
    await w.vm.$nextTick();
    w.vm.query = "";
    await w.vm.$nextTick();
    const events = w.emitted()["update:search"];
    const last = events[events.length - 1];
    expect(last[0]).toBeNull();
    w.destroy();
  });

  it("currentRowsPerPage watcher emits update:rows-per-page", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 10,
      },
    });
    w.vm.customRowsPerPage = 5;
    await w.vm.$nextTick();
    expect(w.emitted()["update:rows-per-page"]).toBeTruthy();
    w.destroy();
  });

  it("rows watcher reinitializes lists", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const newRows = [
      [{ text: "X" }, { text: 1 }],
      [{ text: "Y" }, { text: 2 }],
    ];
    await w.setProps({ rows: newRows });
    await w.vm.$nextTick();
    expect(Object.keys(w.vm.sortedIndexes).length).toBe(2);
    w.destroy();
  });

  it("config watcher reinitializes", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    await w.setProps({
      config: {
        columns: [{ headline: "X" }, { headline: "Y" }, { headline: "Z" }],
      },
    });
    await w.vm.$nextTick();
    expect(w.vm.configFinal.number).toBe(3);
    w.destroy();
  });

  it("config watcher throws on non-object", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(() => {
      // Trigger watcher manually since setProps validates type
      const configWatcher = w.vm.$options.watch.config;
      const handler = Array.isArray(configWatcher) ? configWatcher[configWatcher.length - 1] : configWatcher;
      (typeof handler === 'function' ? handler : handler.handler).call(w.vm, "string");
    }).toThrow("config must be an object");
    w.destroy();
  });

  it("selected watcher emits input and update:selected-rows", async () => {
    const rows = objectRows();
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
    });
    w.vm.$set(w.vm.selected, 0, true);
    await w.vm.$nextTick();
    expect(w.emitted()["input"]).toBeTruthy();
    expect(w.emitted()["update:selected-rows"]).toBeTruthy();
    w.destroy();
  });

  it("selected watcher stores when storeState active", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        storeState: true,
      },
      propsData: { identifier: "sel-tbl" },
    });
    w.vm.$set(w.vm.selected, 0, true);
    await w.vm.$nextTick();
    const stored = localStorage.getItem("vue-quintable-sel-tbl-selected-rows");
    expect(stored).toBeTruthy();
    w.destroy();
  });

  it("currentPage watcher emits update:page", async () => {
    const w = createTable({
      config: paginationConfig(1),
      rows: generateRows(3),
    });
    w.vm.gotoPage(2);
    await w.vm.$nextTick();
    expect(w.emitted()["update:page"]).toBeTruthy();
    w.destroy();
  });

  it("currentPage watcher stores when storeState active", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 1,
        storeState: true,
      },
      propsData: { identifier: "page-tbl" },
      rows: generateRows(3),
    });
    w.vm.gotoPage(2);
    await w.vm.$nextTick();
    expect(localStorage.getItem("vue-quintable-page-tbl-current-page")).toBe(
      "2"
    );
    w.destroy();
  });

  it("customMultiSort toggles multi-sort to single", async () => {
    const w = createTable({
      config: {
        columns: [
          { headline: "A", sort: true },
          { headline: "B", sort: true },
        ],
      },
    });
    w.vm.customMultiSort = true;
    await w.vm.$nextTick();
    w.vm.setSortColumn(0);
    w.vm.setSortColumn(1);
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(2);
    w.vm.customMultiSort = false;
    await w.vm.$nextTick();
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(1);
    w.destroy();
  });

  it("pageSort watcher resets sort state", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A", sort: true }, { headline: "B" }] },
    });
    w.vm.setSortColumn(0);
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(1);
    w.vm.customPageSort = true;
    await w.vm.$nextTick();
    // pageSort watcher triggers reset
    w.vm.customPageSort = false;
    await w.vm.$nextTick();
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(0);
    w.destroy();
  });

  it("sortOrder watcher applies external sort order", async () => {
    const w = createTable({
      config: {
        columns: [
          { headline: "A", sort: true },
          { headline: "B", sort: true },
        ],
      },
      propsData: { sortOrder: [] },
    });
    await w.setProps({ sortOrder: [{ index: 1, asc: false }] });
    await w.vm.$nextTick();
    expect(w.vm.currentSortIndexes["1"]).toBeTruthy();
    expect(w.vm.currentSortIndexes["1"].asc).toBe(false);
    w.destroy();
  });

  it("sortOrder watcher with number values", async () => {
    const w = createTable({
      config: {
        columns: [
          { headline: "A", sort: true },
          { headline: "B", sort: true },
        ],
      },
      propsData: { sortOrder: [] },
    });
    await w.setProps({ sortOrder: [0] });
    await w.vm.$nextTick();
    expect(w.vm.currentSortIndexes["0"]).toBeTruthy();
    w.destroy();
  });

  it("activeRow watcher emits active:row", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
    });
    w.vm.activeRow = 0;
    await w.vm.$nextTick();
    expect(w.emitted()["active:row"]).toBeTruthy();
    w.destroy();
  });

  it("query watcher with ajax triggers delayed loadViaAjax", async () => {
    vi.useFakeTimers();
    const ax = {
      request: vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } }),
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
        search: true,
        searchLength: 1,
        ajaxRequestDelay: 100,
      },
      rows: [],
      propsData: { axios: ax },
    });
    await w.vm.$nextTick();
    ax.request.mockClear();
    w.vm.query = "test";
    await w.vm.$nextTick();
    vi.advanceTimersByTime(200);
    expect(ax.request).toHaveBeenCalled();
    vi.useRealTimers();
    w.destroy();
  });

  it("currentRowsPerPage watcher with ajax triggers loadViaAjax", async () => {
    const ax = {
      request: vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } }),
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
        pagination: 10,
      },
      rows: [],
      propsData: { axios: ax },
    });
    await w.vm.$nextTick();
    ax.request.mockClear();
    w.vm.customRowsPerPage = 5;
    await w.vm.$nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.destroy();
  });

  it("currentPage watcher with ajax triggers loadViaAjax", async () => {
    const ax = {
      request: vi.fn().mockResolvedValue({
        data: { rows: [[{ text: "a" }, { text: 1 }]], all: 5 },
      }),
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
        pagination: 1,
      },
      rows: [],
      propsData: { axios: ax },
    });
    await w.vm.$nextTick();
    ax.request.mockClear();
    w.vm.currentPage = 2;
    await w.vm.$nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.destroy();
  });

  it("filters watcher with ajax triggers loadViaAjax", async () => {
    const ax = {
      request: vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } }),
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      propsData: { axios: ax, filters: {} },
    });
    await w.vm.$nextTick();
    ax.request.mockClear();
    await w.setProps({ filters: { status: "active" } });
    await w.vm.$nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.destroy();
  });

  it("filters watcher with pageSort resets sort", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        pagination: 2,
      },
      rows: generateRows(5),
      propsData: { filters: {} },
    });
    w.vm.customPageSort = true;
    await w.vm.$nextTick();
    w.vm.setSortColumn(0);
    await w.vm.$nextTick();
    await w.setProps({ filters: { status: "active" } });
    await w.vm.$nextTick();
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(0);
    w.destroy();
  });

  it("query watcher with pageSort resets sort", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        pagination: 2,
        search: true,
        searchLength: 1,
      },
      rows: generateRows(5),
    });
    w.vm.customPageSort = true;
    await w.vm.$nextTick();
    w.vm.setSortColumn(0);
    await w.vm.$nextTick();
    w.vm.query = "test";
    await w.vm.$nextTick();
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(0);
    w.destroy();
  });

  it("currentPage watcher with pageSort resets sort", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        pagination: 1,
      },
      rows: generateRows(5),
    });
    w.vm.customPageSort = true;
    await w.vm.$nextTick();
    w.vm.setSortColumn(0);
    await w.vm.$nextTick();
    w.vm.gotoPage(2);
    await w.vm.$nextTick();
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(0);
    w.destroy();
  });

  it("rows watcher with defaultSelected checks all", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        defaultSelected: true,
      },
    });
    await w.vm.$nextTick();
    const newRows = [
      [{ text: "X" }, { text: 1 }],
      [{ text: "Y" }, { text: 2 }],
    ];
    await w.setProps({ rows: newRows });
    await w.vm.$nextTick();
    await w.vm.$nextTick();
    expect(w.vm.selected[0]).toBe(true);
    expect(w.vm.selected[1]).toBe(true);
    w.destroy();
  });
});
