import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { nextTick } from "vue";;
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
      props: { preSelectedRows: [] },
    });
    await w.setProps({ preSelectedRows: [{ key: "id", value: "r2" }] });
    await nextTick();
    expect(w.vm.selected[1]).toBe(true);
    expect(w.vm.selected[0]).toBe(false);
    w.unmount();
  });

  it("preSelectedRows watcher clears selection when empty array", async () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }], id: "r1", selected: true },
      { cells: [{ text: "B" }, { text: 2 }], id: "r2" },
    ];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
      props: { preSelectedRows: [{ key: "id", value: "r1" }] },
    });
    await w.setProps({ preSelectedRows: [] });
    await nextTick();
    expect(w.vm.allSelectedCustom).toBe(false);
    w.unmount();
  });

  it("preSelectedRows null does nothing", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      props: { preSelectedRows: [] },
    });
    await w.setProps({ preSelectedRows: null });
    await nextTick();
    // Should not throw
    w.unmount();
  });

  it("filters watcher stores filters when storeState is active", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
      },
      props: { identifier: "test-tbl", filters: {} },
    });
    await w.setProps({ filters: { status: "active" } });
    await nextTick();
    const stored = localStorage.getItem("vue-quintable-test-tbl-filters");
    expect(stored).toBeTruthy();
    w.unmount();
  });

  it("filters watcher emits update:filters", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      props: { filters: {} },
    });
    await w.setProps({ filters: { status: "x" } });
    await nextTick();
    expect(w.emitted()["update:filters"]).toBeTruthy();
    w.unmount();
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
      props: { axios: ax, updated: false },
    });
    await nextTick();
    ax.request.mockClear();
    await w.setProps({ updated: true });
    await nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.unmount();
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
      props: { axios: ax, updated: false },
    });
    await nextTick();
    ax.request.mockClear();
    await w.setProps({ updated: { clear: true } });
    await nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.unmount();
  });

  it("loading watcher sets loaderHeight", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      props: { loading: false },
    });
    await w.setProps({ loading: true });
    await nextTick();
    // loaderHeight should be 0 in jsdom (no real DOM)
    expect(w.vm.loaderHeight).toBe(0);
    w.unmount();
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
    await nextTick();
    expect(w.emitted()["filtered:rows"]).toBeTruthy();
    w.unmount();
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
    await nextTick();
    w.vm.query = "Row 0";
    await nextTick();
    expect(w.vm.currentPage).toBe(1);
    w.unmount();
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
    await nextTick();
    w.vm.query = "Row 0";
    await nextTick();
    expect(w.vm.activeRow).toBeNull();
    w.unmount();
  });

  it("hiddenBreakpoints watcher emits change:breakpoints on subsequent changes", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    // initBreakpoints must be false for the watcher to emit
    w.vm.initBreakpoints = false;
    w.vm.hiddenBreakpoints = ["sm", "all"];
    await nextTick();
    expect(w.emitted()["change:breakpoints"]).toBeTruthy();
    w.unmount();
  });

  it("hoveredRow watcher emits hover:row", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm.hoveredRow = 0;
    await nextTick();
    expect(w.emitted()["hover:row"]).toBeTruthy();
    w.unmount();
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
    await nextTick();
    expect(w.emitted()["update:search"]).toBeTruthy();
    const args = w.emitted()["update:search"][0];
    expect(args[0]).toBe("test");
    w.unmount();
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
    await nextTick();
    w.vm.query = "";
    await nextTick();
    const events = w.emitted()["update:search"];
    const last = events[events.length - 1];
    expect(last[0]).toBeNull();
    w.unmount();
  });

  it("currentRowsPerPage watcher emits update:rows-per-page", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 10,
      },
    });
    w.vm.customRowsPerPage = 5;
    await nextTick();
    expect(w.emitted()["update:rows-per-page"]).toBeTruthy();
    w.unmount();
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
    await nextTick();
    expect(Object.keys(w.vm.sortedIndexes).length).toBe(2);
    w.unmount();
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
    await nextTick();
    expect(w.vm.configFinal.number).toBe(3);
    w.unmount();
  });

  it("config watcher throws on non-object", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(() => {
      // Trigger watcher manually since setProps validates type
      const configWatcher = w.vm.$options.watch.config;
      const handler = Array.isArray(configWatcher)
        ? configWatcher[configWatcher.length - 1]
        : configWatcher;
      (typeof handler === "function" ? handler : handler.handler).call(
        w.vm,
        "string"
      );
    }).toThrow("config must be an object");
    w.unmount();
  });

  it("selected watcher emits input and update:selected-rows", async () => {
    const rows = objectRows();
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
    });
    w.vm.selected[0] = true;
    await nextTick();
    expect(w.emitted()["input"]).toBeTruthy();
    expect(w.emitted()["update:selected-rows"]).toBeTruthy();
    w.unmount();
  });

  it("selected watcher stores when storeState active", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        storeState: true,
      },
      props: { identifier: "sel-tbl" },
    });
    w.vm.selected[0] = true;
    await nextTick();
    const stored = localStorage.getItem("vue-quintable-sel-tbl-selected-rows");
    expect(stored).toBeTruthy();
    w.unmount();
  });

  it("currentPage watcher emits update:page", async () => {
    const w = createTable({
      config: paginationConfig(1),
      rows: generateRows(3),
    });
    w.vm.gotoPage(2);
    await nextTick();
    expect(w.emitted()["update:page"]).toBeTruthy();
    w.unmount();
  });

  it("currentPage watcher stores when storeState active", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 1,
        storeState: true,
      },
      props: { identifier: "page-tbl" },
      rows: generateRows(3),
    });
    w.vm.gotoPage(2);
    await nextTick();
    expect(localStorage.getItem("vue-quintable-page-tbl-current-page")).toBe(
      "2"
    );
    w.unmount();
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
    await nextTick();
    w.vm.setSortColumn(0);
    w.vm.setSortColumn(1);
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(2);
    w.vm.customMultiSort = false;
    await nextTick();
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(1);
    w.unmount();
  });

  it("pageSort watcher resets sort state", async () => {
    const w = createTable({
      config: { columns: [{ headline: "A", sort: true }, { headline: "B" }] },
    });
    w.vm.setSortColumn(0);
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(1);
    w.vm.customPageSort = true;
    await nextTick();
    // pageSort watcher triggers reset
    w.vm.customPageSort = false;
    await nextTick();
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(0);
    w.unmount();
  });

  it("sortOrder watcher applies external sort order", async () => {
    const w = createTable({
      config: {
        columns: [
          { headline: "A", sort: true },
          { headline: "B", sort: true },
        ],
      },
      props: { sortOrder: [] },
    });
    await w.setProps({ sortOrder: [{ index: 1, asc: false }] });
    await nextTick();
    expect(w.vm.currentSortIndexes["1"]).toBeTruthy();
    expect(w.vm.currentSortIndexes["1"].asc).toBe(false);
    w.unmount();
  });

  it("sortOrder watcher with number values", async () => {
    const w = createTable({
      config: {
        columns: [
          { headline: "A", sort: true },
          { headline: "B", sort: true },
        ],
      },
      props: { sortOrder: [] },
    });
    await w.setProps({ sortOrder: [0] });
    await nextTick();
    expect(w.vm.currentSortIndexes["0"]).toBeTruthy();
    w.unmount();
  });

  it("activeRow watcher emits active:row", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
    });
    w.vm.activeRow = 0;
    await nextTick();
    expect(w.emitted()["active:row"]).toBeTruthy();
    w.unmount();
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
      props: { axios: ax },
    });
    await nextTick();
    ax.request.mockClear();
    w.vm.query = "test";
    await nextTick();
    vi.advanceTimersByTime(200);
    expect(ax.request).toHaveBeenCalled();
    vi.useRealTimers();
    w.unmount();
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
      props: { axios: ax },
    });
    await nextTick();
    ax.request.mockClear();
    w.vm.customRowsPerPage = 5;
    await nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.unmount();
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
      props: { axios: ax },
    });
    await nextTick();
    ax.request.mockClear();
    w.vm.currentPage = 2;
    await nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.unmount();
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
      props: { axios: ax, filters: {} },
    });
    await nextTick();
    ax.request.mockClear();
    await w.setProps({ filters: { status: "active" } });
    await nextTick();
    expect(ax.request).toHaveBeenCalled();
    w.unmount();
  });

  it("filters watcher with pageSort resets sort", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        pagination: 2,
      },
      rows: generateRows(5),
      props: { filters: {} },
    });
    w.vm.customPageSort = true;
    await nextTick();
    w.vm.setSortColumn(0);
    await nextTick();
    await w.setProps({ filters: { status: "active" } });
    await nextTick();
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(0);
    w.unmount();
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
    await nextTick();
    w.vm.setSortColumn(0);
    await nextTick();
    w.vm.query = "test";
    await nextTick();
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(0);
    w.unmount();
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
    await nextTick();
    w.vm.setSortColumn(0);
    await nextTick();
    w.vm.gotoPage(2);
    await nextTick();
    expect(Object.keys(w.vm.currentSortIndexes).length).toBe(0);
    w.unmount();
  });

  it("rows watcher with defaultSelected checks all", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        defaultSelected: true,
      },
    });
    await nextTick();
    const newRows = [
      [{ text: "X" }, { text: 1 }],
      [{ text: "Y" }, { text: 2 }],
    ];
    await w.setProps({ rows: newRows });
    await nextTick();
    await nextTick();
    expect(w.vm.selected[0]).toBe(true);
    expect(w.vm.selected[1]).toBe(true);
    w.unmount();
  });
});
