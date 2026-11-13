import { describe, it, expect, vi, afterEach } from "vitest";
import { nextTick } from "vue";
import { createTable, generateRows } from "./helpers";

// storeState / urlState: a restored state that refers to what is gone (a column, a page beyond the last) must not
// break the table; it falls back to no sort and the first page.

const settle = async () => {
  for (let i = 0; i < 4; i++) {
    await nextTick();
  }
};
const store = (id, name, value) =>
  localStorage.setItem(
    `vue-quintable-${id}-${name}`,
    typeof value === "string" ? value : JSON.stringify(value),
  );
const stored = (id, name) =>
  localStorage.getItem(`vue-quintable-${id}-${name}`);
const shown = (w) => w.findAll("tbody tr.vue-quintable-row").length;

function ajax(pages) {
  const request = vi.fn((url, options) => {
    const { page } = options.params || options.data;
    return Promise.resolve({
      data: {
        rows: page <= pages ? [[{ text: "Row " + page }]] : [],
        all: pages,
      },
    });
  });
  return {
    request,
    axios: {
      request,
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: () => false,
    },
  };
}

afterEach(() => {
  localStorage.clear();
  window.history.replaceState(null, "", "/");
});

describe("restored sort", () => {
  const columns = [{ headline: "A", sort: true }, { headline: "B" }];

  it("drops a sort on a column that is gone, not sortable, or now another one", async () => {
    store("s1", "sort-indexes", {
      0: { headline: "Renamed", index: 0, asc: true, order: 0 },
      1: { headline: "B", index: 1, asc: true, order: 1 },
      5: { headline: "Gone", index: 5, asc: true, order: 2 },
    });
    const w = createTable({
      mountFn: "mount",
      config: { columns, storeState: true, multiSort: true },
      rows: generateRows(3),
      props: { identifier: "s1" },
    });
    await settle();
    expect(w.vm.currentSortIndexes).toEqual({});
    expect(shown(w)).toBe(3);
    expect(stored("s1", "sort-indexes")).toBeNull();
    w.unmount();
  });

  it("keeps a valid sort, and only the first without multiSort", async () => {
    const both = [
      { headline: "A", sort: true },
      { headline: "B", sort: true },
    ];
    store("s2", "sort-indexes", {
      1: { headline: "B", index: 1, asc: false, order: 0 },
      0: { headline: "A", index: 0, asc: true, order: 1 },
    });
    const w = createTable({
      mountFn: "mount",
      config: { columns: both, storeState: true },
      rows: generateRows(3),
      props: { identifier: "s2" },
    });
    await settle();
    expect(Object.keys(w.vm.currentSortIndexes)).toEqual(["1"]);
    expect(w.vm.currentSortIndexes[1]).toMatchObject({ asc: false, order: 0 });
    expect(Object.keys(JSON.parse(stored("s2", "sort-indexes")))).toEqual([
      "1",
    ]);
    w.unmount();
  });

  it("never sends a sort on a column that is gone to the server", async () => {
    store("s3", "sort-indexes", {
      5: { headline: "Gone", index: 5, asc: true, order: 0 },
    });
    const { request, axios } = ajax(1);
    const w = createTable({
      mountFn: "mount",
      config: { columns, storeState: true, ajaxUrl: "http://x" },
      rows: [],
      props: { identifier: "s3", axios },
    });
    await vi.waitFor(() => expect(request).toHaveBeenCalled());
    await settle();
    for (const call of request.mock.calls) {
      expect((call[1].params || call[1].data).sort).toBeNull();
    }
    w.unmount();
  });
});

describe("restored page", () => {
  const config = {
    columns: [{ headline: "A" }, { headline: "B" }],
    pagination: 1,
  };

  it("shows the first page instead of a page beyond the last", async () => {
    store("p1", "current-page", "7");
    const w = createTable({
      mountFn: "mount",
      config: { ...config, storeState: true },
      rows: generateRows(3),
      props: { identifier: "p1" },
    });
    await settle();
    expect(w.vm.currentPage).toBe(1);
    expect(shown(w)).toBe(1);
    expect(stored("p1", "current-page")).toBe("1");
    w.unmount();
  });

  it("keeps a page that still exists", async () => {
    store("p2", "current-page", "3");
    const w = createTable({
      mountFn: "mount",
      config: { ...config, storeState: true },
      rows: generateRows(3),
      props: { identifier: "p2" },
    });
    await settle();
    expect(w.vm.currentPage).toBe(3);
    w.unmount();
  });

  it("starts rows that arrive later on the first page, as new rows always do", async () => {
    store("p3", "current-page", "3");
    const w = createTable({
      mountFn: "mount",
      config: { ...config, storeState: true },
      rows: [],
      props: { identifier: "p3" },
    });
    await settle();
    await w.setProps({ rows: generateRows(2) });
    await settle();
    expect(w.vm.currentPage).toBe(1);
    expect(shown(w)).toBe(1);
    w.unmount();
  });

  it("loads the first page when the server has fewer pages now", async () => {
    store("p5", "current-page", "7");
    const { request, axios } = ajax(2);
    const w = createTable({
      mountFn: "mount",
      config: { ...config, storeState: true, ajaxUrl: "http://x" },
      rows: [],
      props: { identifier: "p5", axios },
    });
    await vi.waitFor(() => expect(w.text()).toContain("Row 1"));
    expect(w.vm.currentPage).toBe(1);
    expect(
      request.mock.calls.map((call) => (call[1].params || call[1].data).page),
    ).toContain(7);
    expect(stored("p5", "current-page")).toBe("1");
    w.unmount();
  });

  it("keeps a server page that still exists", async () => {
    store("p6", "current-page", "2");
    const { axios } = ajax(2);
    const w = createTable({
      mountFn: "mount",
      config: { ...config, storeState: true, ajaxUrl: "http://x" },
      rows: [],
      props: { identifier: "p6", axios },
    });
    await vi.waitFor(() => expect(w.text()).toContain("Row 2"));
    expect(w.vm.currentPage).toBe(2);
    w.unmount();
  });

  it("does the same for a page from the address", async () => {
    window.history.replaceState(null, "", "/?u1-page=9");
    const w = createTable({
      mountFn: "mount",
      config: { ...config, urlState: true },
      rows: generateRows(3),
      props: { identifier: "u1" },
    });
    await settle();
    expect(w.vm.currentPage).toBe(1);
    expect(shown(w)).toBe(1);
    w.unmount();
  });
});

describe("restored column filters", () => {
  it("drops filters on columns without one, or of another kind", async () => {
    store("f1", "column-filters", { 0: "row", 1: "x", 4: "y", 2: "z" });
    const w = createTable({
      mountFn: "mount",
      config: {
        columns: [
          { headline: "A" },
          { headline: "B", filter: false },
          { headline: "C", filter: "range" },
        ],
        storeState: true,
        columnFilters: true,
      },
      rows: [
        [{ text: "Row 1" }, { text: 1 }, { text: 1 }],
        [{ text: "Row 2" }, { text: 2 }, { text: 2 }],
      ],
      props: { identifier: "f1" },
    });
    await settle();
    expect(w.vm.columnFilterValues).toEqual({ 0: "row" });
    expect(shown(w)).toBe(2);
    expect(JSON.parse(stored("f1", "column-filters"))).toEqual({ 0: "row" });
    w.unmount();
  });
});
