import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { nextTick } from "vue";;
import { createTable, generateRows } from "./helpers";

describe("AJAX loading", () => {
  let mockAxios;

  function makeAxiosMock(response) {
    const CancelToken = {
      source: () => ({ token: "tok", cancel: vi.fn() }),
    };
    const request = vi.fn().mockResolvedValue(
      response || {
        data: { rows: [[{ text: "X" }, { text: 1 }]], all: 1 },
      }
    );
    mockAxios = {
      request,
      CancelToken,
      isCancel: vi.fn().mockReturnValue(false),
    };
    return mockAxios;
  }

  it("loadViaAjax fires request on mount when ajaxUrl is set", async () => {
    const ax = makeAxiosMock();
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    expect(ax.request).toHaveBeenCalledWith(
      "http://test.local/api",
      expect.objectContaining({ method: "GET" })
    );
    w.unmount();
  });

  it("loadViaAjax uses POST when requestMethod is POST", async () => {
    const ax = makeAxiosMock();
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
        requestMethod: "POST",
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    expect(ax.request).toHaveBeenCalledWith(
      "http://test.local/api",
      expect.objectContaining({
        method: "POST",
        data: expect.any(Object),
        params: null,
      })
    );
    w.unmount();
  });

  it("loadViaAjax GET passes params only", async () => {
    const ax = makeAxiosMock();
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    expect(ax.request).toHaveBeenCalledWith(
      "http://test.local/api",
      expect.objectContaining({
        method: "GET",
        params: expect.any(Object),
        data: null,
      })
    );
    w.unmount();
  });

  it("loadViaAjax cancels previous request", async () => {
    const cancelFn = vi.fn();
    const CancelToken = {
      source: () => ({ token: "tok", cancel: cancelFn }),
    };
    const ax = {
      request: vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } }),
      CancelToken,
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    // First call made during mount, now trigger second
    w.vm.loadViaAjax(false, true, "TEST");
    expect(cancelFn).toHaveBeenCalledWith("Operation canceled by the user.");
    w.unmount();
  });

  it("loadViaAjax populates ajaxRows on success", async () => {
    const responseData = {
      data: {
        rows: [
          [{ text: "X" }, { text: 1 }],
          [{ text: "Y" }, { text: 2 }],
        ],
        all: 2,
      },
    };
    const ax = makeAxiosMock(responseData);
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    await nextTick();
    expect(w.vm.ajaxRows).toHaveLength(2);
    expect(w.vm.ajaxAll).toBe(2);
    w.unmount();
  });

  it("loadViaAjax emits ajax:error on failure", async () => {
    const ax = {
      request: vi.fn().mockRejectedValue(new Error("Network error")),
      CancelToken: { source: () => ({ token: "tok", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    await nextTick();
    expect(w.emitted()["ajax:error"]).toBeTruthy();
    spy.mockRestore();
    w.unmount();
  });

  it("loadViaAjax emits ajax:rows on success", async () => {
    const responseData = {
      data: { rows: [[{ text: "X" }, { text: 1 }]], all: 1 },
    };
    const ax = makeAxiosMock(responseData);
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    await nextTick();
    expect(w.emitted()["ajax:rows"]).toBeTruthy();
    w.unmount();
  });

  it("loadViaAjax skips short query", () => {
    const ax = makeAxiosMock();
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
        search: true,
        searchLength: 3,
      },
      rows: [],
      props: { axios: ax },
    });
    ax.request.mockClear();
    w.vm.query = "ab";
    w.vm.lastQuery = "";
    w.vm.loadViaAjax(false, true, "TEST");
    expect(ax.request).not.toHaveBeenCalled();
    w.unmount();
  });

  it("loadViaAjax resets lastQuery when query empty", () => {
    const ax = makeAxiosMock();
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
        search: true,
        searchLength: 3,
      },
      rows: [],
      props: { axios: ax },
    });
    ax.request.mockClear();
    w.vm.query = "";
    w.vm.lastQuery = "ab";
    w.vm.loadViaAjax(false, true, "TEST");
    expect(w.vm.lastQuery).toBe("");
    // Should return early because tmp.length < searchLength
    expect(ax.request).not.toHaveBeenCalled();
    w.unmount();
  });

  it("loadViaAjax clears query when too short", async () => {
    const ax = makeAxiosMock();
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
        search: true,
        searchLength: 3,
      },
      rows: [],
      props: { axios: ax },
    });
    ax.request.mockClear();
    w.vm.query = "ab";
    w.vm.lastQuery = "abc";
    w.vm.loadViaAjax(false, true, "TEST");
    // Should have called request with empty search since query < searchLength but lastQuery >= searchLength
    expect(ax.request).toHaveBeenCalled();
    const callArgs = ax.request.mock.calls[0][1];
    expect(callArgs.params.search).toBe("");
    w.unmount();
  });

  it("loadViaAjax with clearSortAndPage resets page", async () => {
    const ax = makeAxiosMock();
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    w.vm.currentPage = 3;
    ax.request.mockClear();
    w.vm.loadViaAjax(true, true, "TEST");
    expect(w.vm.currentPage).toBe(1);
    w.unmount();
  });
});

describe("Lifecycle hooks", () => {
  it("created sets initialSearchTerm to query", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], search: true },
      props: { initialSearchTerm: "hello" },
    });
    expect(w.vm.query).toBe("hello");
    w.unmount();
  });

  it("created pre-selects rows with selected:true", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }], selected: true },
      { cells: [{ text: "B" }, { text: 2 }] },
    ];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
    });
    expect(w.vm.selected[0]).toBe(true);
    expect(w.vm.selected[1]).toBe(false);
    w.unmount();
  });

  it("created adds keydown listener when enableRowTabIndex", () => {
    const addSpy = vi.spyOn(document, "addEventListener");
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
    });
    expect(addSpy).toHaveBeenCalledWith("keydown", w.vm.checkKey);
    addSpy.mockRestore();
    w.unmount();
  });

  it("beforeDestroy unsubscribes from shared breakpoints", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const bp = w.vm._sharedBP;
    expect(bp).toBeTruthy();
    const unsubSpy = vi.spyOn(bp, "unsubscribe");
    w.unmount();
    expect(unsubSpy).toHaveBeenCalledWith(w.vm._onBreakpointChange);
    unsubSpy.mockRestore();
  });

  it("beforeDestroy removes keydown listener when enableRowTabIndex", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener");
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
    });
    const checkKeyRef = w.vm.checkKey;
    w.unmount();
    expect(removeSpy).toHaveBeenCalledWith("keydown", checkKeyRef);
    removeSpy.mockRestore();
  });

  it("mounted subscribes to shared breakpoints", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(w.vm._sharedBP).toBeTruthy();
    expect(w.vm._sharedBP._subscribers.has(w.vm._onBreakpointChange)).toBe(
      true
    );
    w.unmount();
  });

  it("mounted triggers defaultSelected", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }] },
      { cells: [{ text: "B" }, { text: 2 }] },
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        defaultSelected: true,
      },
      rows,
    });
    expect(w.vm.selected[0]).toBe(true);
    expect(w.vm.selected[1]).toBe(true);
    w.unmount();
  });
});

describe("Store state (localStorage)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("storeState loads stored query from localStorage", () => {
    localStorage.setItem("vue-quintable-my-table-query", "stored-search");
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
        search: true,
      },
      props: { identifier: "my-table" },
    });
    expect(w.vm.query).toBe("stored-search");
    w.unmount();
  });

  it("storeState loads stored rows-per-page from localStorage", () => {
    localStorage.setItem("vue-quintable-my-table-rows-per-page", "5");
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
        pagination: 10,
      },
      props: { identifier: "my-table" },
    });
    expect(w.vm.customRowsPerPage).toBe(5);
    w.unmount();
  });

  it("storeState loads stored filters from localStorage", () => {
    localStorage.setItem(
      "vue-quintable-my-table-filters",
      JSON.stringify({ status: "active" })
    );
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
      },
      props: { identifier: "my-table", filters: {} },
    });
    expect(w.vm.filtersFinal).toEqual({ status: "active" });
    w.unmount();
  });

  it("storeState loads stored current-page from localStorage", async () => {
    localStorage.setItem("vue-quintable-my-table-current-page", "3");
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
        pagination: 1,
      },
      props: { identifier: "my-table" },
      rows: generateRows(5),
    });
    await nextTick();
    expect(w.vm.currentPage).toBe(3);
    w.unmount();
  });

  it("storeState loads stored sort-indexes from localStorage", () => {
    const indexes = { 0: { headline: "A", index: 0, asc: true, order: 0 } };
    localStorage.setItem(
      "vue-quintable-my-table-sort-indexes",
      JSON.stringify(indexes)
    );
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        storeState: true,
      },
      props: { identifier: "my-table" },
    });
    expect(Object.keys(w.vm.currentSortIndexes).length).toBeGreaterThan(0);
    w.unmount();
  });

  it("storeState saves query to localStorage on query change", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
        search: true,
      },
      props: { identifier: "my-table" },
    });
    w.vm.query = "new-search";
    await nextTick();
    expect(localStorage.getItem("vue-quintable-my-table-query")).toBe(
      "new-search"
    );
    w.unmount();
  });

  it("storeState saves currentPage to localStorage on page change", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
        pagination: 1,
      },
      props: { identifier: "my-table" },
      rows: generateRows(5),
    });
    w.vm.gotoPage(2);
    await nextTick();
    expect(localStorage.getItem("vue-quintable-my-table-current-page")).toBe(
      "2"
    );
    w.unmount();
  });

  it("storeState loads stored selected-rows from localStorage", async () => {
    const sel = { 0: true, 1: false };
    localStorage.setItem(
      "vue-quintable-my-table-selected-rows",
      JSON.stringify(sel)
    );
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
        select: true,
      },
      props: { identifier: "my-table" },
    });
    await nextTick();
    await nextTick();
    // The stored selection should be loaded
    expect(w.vm.selected[0]).toBe(true);
    w.unmount();
  });

  it("storeState saves sort-indexes to localStorage", async () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        storeState: true,
      },
      props: { identifier: "my-table" },
    });
    w.vm.setSortColumn(0);
    await nextTick();
    const stored = localStorage.getItem("vue-quintable-my-table-sort-indexes");
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored)["0"]).toBeTruthy();
    w.unmount();
  });

  it("storeState merges new filters into stored filters", () => {
    localStorage.setItem(
      "vue-quintable-my-table-filters",
      JSON.stringify({ status: "active" })
    );
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
      },
      props: { identifier: "my-table", filters: { category: "new" } },
    });
    expect(w.vm.filtersFinal.status).toBe("active");
    expect(w.vm.filtersFinal.category).toBe("new");
    w.unmount();
  });
});
