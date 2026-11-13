import { describe, it, expect, vi, afterEach } from "vitest";
import { nextTick } from "vue";
import { createTable, generateRows } from "./helpers";

// The opt-in table features: accessible, highlightSearch, searchDebounce, columnPicker, stickyHeader, scrollHeight,
// column pin, resizableColumns, columnFilters, urlState and virtualScroll. Without their switches the table renders
// as before (the differential fuzz test and the E2E snapshots check that).

const columns = [
  { headline: "Name", sort: true },
  { headline: "Age", sort: true },
  { headline: "City", breakpoint: "all" },
];
const people = [
  [{ text: "Alice" }, { text: 30 }, { text: "Berlin" }],
  [{ text: "Bob" }, { text: 25 }, { text: "Lima" }],
  [{ html: "<b>Clara</b>" }, { text: 41 }, { text: "Oslo" }],
];

function mountTable(config, options = {}) {
  return createTable({
    mountFn: "mount",
    attachTo: document.body,
    config: { columns, ...config },
    rows: people,
    ...options,
  });
}

afterEach(() => {
  localStorage.clear();
  window.history.replaceState(null, "", "/");
  vi.useRealTimers();
});

describe("accessible", () => {
  it("adds nothing while it is off", () => {
    const w = mountTable({ pagination: 2 });
    expect(w.find("thead th[aria-sort]").exists()).toBe(false);
    expect(w.find("thead th[tabindex]").exists()).toBe(false);
    expect(w.find(".quintable--toggle-button").exists()).toBe(false);
    expect(w.find("nav[aria-label]").exists()).toBe(false);
    w.unmount();
  });

  it("makes sorting, toggling, selecting and paging reachable and named", async () => {
    const w = mountTable({
      accessible: true,
      select: true,
      selectAll: true,
      pagination: 2,
    });
    const th = w.find("thead th.sort-header");
    expect(th.attributes("tabindex")).toBe("0");
    expect(th.attributes("aria-sort")).toBe("none");
    await th.trigger("keydown", { key: "Enter" });
    expect(th.attributes("aria-sort")).toBe("ascending");
    await th.trigger("keydown", { key: " " });
    expect(th.attributes("aria-sort")).toBe("descending");

    const toggle = w.find("tbody .quintable--toggle-button");
    expect(toggle.element.tagName).toBe("BUTTON");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    expect(toggle.attributes("aria-label")).toBe("Show details");
    await toggle.trigger("click");
    expect(
      w.find("tbody .quintable--toggle-button").attributes(),
    ).toMatchObject({ "aria-expanded": "true", "aria-label": "Hide details" });

    expect(
      w
        .findAll("tbody td.select-td input")
        .map((i) => i.attributes("aria-label")),
    ).toEqual(["Select row 1", "Select row 2"]);
    expect(w.find("thead th.select-th input").attributes("aria-label")).toBe(
      "Select all rows",
    );

    expect(w.find("nav").attributes("aria-label")).toBe("Pagination");
    expect(w.find(".page-item.active .page-link").attributes()).toMatchObject({
      role: "button",
      tabindex: "0",
      "aria-current": "page",
    });
    const second = w.findAll(".page-link").find((link) => link.text() === "2");
    await second.trigger("keydown", { key: "Enter" });
    expect(w.vm.currentPage).toBe(2);
    w.unmount();
  });

  it("keeps the toggle button's click the row's with ignoreControlClicks", async () => {
    const w = mountTable({ accessible: true, ignoreControlClicks: true });
    await w.find("tbody .quintable--toggle-button").trigger("click");
    expect(w.emitted("click:row")).toHaveLength(1);
    expect(w.emitted("expand:row")).toHaveLength(1);
    w.unmount();
  });
});

describe("highlightSearch and searchDebounce", () => {
  it("marks the query in text cells only", async () => {
    const w = mountTable({ search: true, highlightSearch: true });
    w.vm.setSearchQuery("li");
    await nextTick();
    expect(w.findAll("tbody mark").map((m) => m.text())).toEqual(["li"]);
    expect(w.find("tbody mark").element.closest("tr").textContent).toContain(
      "Alice",
    );
    w.vm.setSearchQuery("");
    await nextTick();
    expect(w.find("tbody mark").exists()).toBe(false);
    w.unmount();
  });

  it("marks nothing while it is off", async () => {
    const w = mountTable({ search: true });
    w.vm.setSearchQuery("li");
    await nextTick();
    expect(w.find("tbody mark").exists()).toBe(false);
    w.unmount();
  });

  it("searches once the typing pauses", async () => {
    vi.useFakeTimers();
    const w = mountTable({ search: true, searchDebounce: 300 });
    w.vm.setSearchQuery("bob");
    await nextTick();
    expect(w.findAll("tbody tr.vue-quintable-row")).toHaveLength(3);
    vi.advanceTimersByTime(300);
    await nextTick();
    expect(w.findAll("tbody tr.vue-quintable-row")).toHaveLength(1);
    w.unmount();
  });
});

describe("columnPicker", () => {
  it("hides and shows columns, keeps the last one, reports and stores them", async () => {
    const w = mountTable(
      { columnPicker: true, storeState: true },
      { props: { identifier: "picker" } },
    );
    const boxes = () => w.findAll(".quintable--column-picker input");
    expect(boxes()).toHaveLength(3);
    await boxes()[1].trigger("change");
    expect(w.findAll("thead th").map((th) => th.text())).not.toContain("Age");
    expect(w.emitted("update:hidden-columns")[0][0]).toEqual([1]);
    expect(localStorage.getItem("vue-quintable-picker-hidden-columns")).toBe(
      "[1]",
    );
    w.vm.toggleColumn(0, false);
    w.vm.toggleColumn(2, false);
    await nextTick();
    // City is the last shown column now
    expect(boxes()[2].element.disabled).toBe(true);
    w.vm.toggleColumn(1, true);
    await nextTick();
    expect(w.findAll("thead th").map((th) => th.text())).toContain("Age");
    w.unmount();

    const again = mountTable(
      { columnPicker: true, storeState: true },
      { props: { identifier: "picker" } },
    );
    expect(again.vm.userHiddenColumns).toEqual({ 0: true });
    again.unmount();
  });
});

describe("stickyHeader, scrollHeight and column pin", () => {
  it("marks the table and sizes the scroll box", () => {
    const w = mountTable({ stickyHeader: true, scrollHeight: 300 });
    expect(w.find("table").classes()).toContain("quintable--sticky-header");
    const box = w.find(".quintable--table-container");
    expect(box.classes()).toContain("quintable-scroll");
    expect(box.attributes("style")).toContain("max-height: 300px");
    w.unmount();
  });

  it("pins columns and the table's own cells before them", async () => {
    const w = mountTable({
      columns: [
        { headline: "Name", pin: "start" },
        { headline: "Age" },
        { headline: "City", breakpoint: "all" },
        { headline: "Job", pin: "end" },
      ],
      select: true,
      selectPosition: "pre",
    });
    const head = w.findAll("thead > tr > th");
    // toggle, select, Name pinned to the start; Job to the end
    expect(head.map((th) => th.classes().includes("quintable-pin"))).toEqual([
      true,
      true,
      true,
      false,
      true,
    ]);
    expect(head[2].classes()).toContain("quintable-pin-edge");
    // offsets by class: the third pinned cell at the start, the first at the end
    expect(head[2].classes()).toContain("quintable-pin-start-2");
    expect(head[4].classes()).toContain("quintable-pin-end-0");
    expect(head[2].attributes("style")).toBeUndefined();
    const cell = w.find("tbody td.vue-quintable-cell");
    expect(cell.classes()).toContain("quintable-pin-start");
    expect(
      w.find("table").element.style.getPropertyValue("--quintable-pin-start-2"),
    ).toBe("0px");
    w.unmount();
  });
});

describe("resizableColumns", () => {
  it("adds nothing while it is off", () => {
    const w = mountTable({});
    expect(w.find(".quintable--resize-handle").exists()).toBe(false);
    w.unmount();
  });

  it("sizes a column by keyboard, switches to fixed widths, stores and resets them", async () => {
    const w = mountTable(
      {
        resizableColumns: true,
        storeState: true,
        columns: [
          { headline: "Name" },
          { headline: "Age", resizable: false },
          { headline: "City" },
        ],
      },
      { props: { identifier: "widths" } },
    );
    expect(w.findAll(".quintable--resize-handle")).toHaveLength(2);
    await w.find(".quintable--resize-handle").trigger("keydown", {
      key: "ArrowRight",
    });
    // jsdom measures 0: the column starts at the default width (120) and grows by a step
    expect(w.emitted("resize:column")[0].slice(0, 2)).toEqual([0, 130]);
    const table = w.find("table");
    expect(table.classes()).toContain("quintable--fixed-layout");
    expect(table.attributes("style")).toContain("table-layout: fixed");
    expect(w.find("thead th").attributes("style")).toContain("width: 130px");
    expect(
      JSON.parse(localStorage.getItem("vue-quintable-widths-column-widths"))[0],
    ).toBe(130);
    w.vm.resetColumnWidths();
    await nextTick();
    expect(w.find("table").attributes("style")).toBeUndefined();
    w.unmount();
  });

  it("starts with a column's width option", () => {
    const w = mountTable({
      columns: [{ headline: "Name", width: 200 }, { headline: "Age" }],
    });
    expect(w.find("thead th").attributes("style")).toBe("width: 200px;");
    w.unmount();
  });
});

describe("columnFilters", () => {
  const config = {
    columnFilters: true,
    columns: [
      { headline: "Name" },
      { headline: "Age", filter: "range" },
      { headline: "City", filter: "select" },
      { headline: "Note", filter: false },
    ],
  };
  const rows = [
    [{ text: "Alice" }, { text: 30 }, { text: "Berlin" }, { text: "a" }],
    [{ text: "Bob" }, { text: 25 }, { text: "Lima" }, { text: "b" }],
    [{ html: "<b>Clara</b>" }, { text: 41 }, { text: "Berlin" }, { text: "c" }],
  ];
  const names = (w) =>
    w.findAll("tbody tr.vue-quintable-row").map((tr) => tr.find("td").text());

  it("filters by text, select and range, and reports the filters", async () => {
    const w = mountTable(config, { rows });
    const filterRow = w.find(".quintable--filter-row");
    expect(filterRow.findAll("input[type=search]")).toHaveLength(1);
    expect(filterRow.findAll("select option").map((o) => o.text())).toEqual([
      "All",
      "Berlin",
      "Lima",
    ]);
    expect(filterRow.findAll("input[type=number]")).toHaveLength(2);

    await filterRow.find("input[type=search]").setValue("cla");
    expect(names(w)).toEqual(["Clara"]);
    await filterRow.find("input[type=search]").setValue("");
    await filterRow.find("select").setValue("Berlin");
    expect(names(w)).toEqual(["Alice", "Clara"]);
    await filterRow.findAll("input[type=number]")[0].setValue("35");
    expect(names(w)).toEqual(["Clara"]);
    expect(w.emitted("update:column-filters").at(-1)[0]).toEqual({
      1: { min: "35" },
      2: "Berlin",
    });
    w.vm.clearColumnFilters();
    await nextTick();
    expect(names(w)).toHaveLength(3);
    w.unmount();
  });

  it("sends the filters to the server with ajaxUrl", async () => {
    vi.useFakeTimers();
    const request = vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } });
    const axios = {
      request,
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: () => false,
    };
    const w = mountTable(
      { ...config, ajaxUrl: "http://test.local/api" },
      { rows: [], props: { axios } },
    );
    w.vm.setColumnFilter(0, "ali");
    vi.advanceTimersByTime(250);
    expect(request.mock.calls.at(-1)[1].params.columnFilters).toEqual({
      0: "ali",
    });
    w.unmount();
  });
});

describe("urlState", () => {
  it("reads page, sort and search from the address and writes changes back", async () => {
    window.history.replaceState(
      null,
      "",
      "/?other=1&people-page=2&people-sort=1:desc&people-search=o",
    );
    const w = mountTable(
      { urlState: true, search: true, pagination: 1 },
      { props: { identifier: "people" } },
    );
    await nextTick();
    await nextTick();
    expect(w.vm.query).toBe("o");
    expect(w.vm.currentSortIndexes[1].asc).toBe(false);
    expect(w.vm.currentPage).toBe(2);

    w.vm.setSearchQuery("");
    await nextTick();
    await nextTick();
    const url = new URLSearchParams(window.location.search);
    expect(url.get("other")).toBe("1");
    expect(url.get("people-search")).toBeNull();
    expect(url.get("people-sort")).toBe("1:desc");
    w.unmount();
  });
});

describe("virtualScroll", () => {
  it("renders a window of the rows with spacers for the rest", async () => {
    const w = createTable({
      mountFn: "mount",
      attachTo: document.body,
      config: {
        columns: [{ headline: "Name" }, { headline: "Age" }],
        virtualScroll: true,
      },
      rows: generateRows(1000),
    });
    await nextTick();
    const rendered = w.findAll("tbody tr.vue-quintable-row").length;
    expect(rendered).toBeGreaterThan(0);
    expect(rendered).toBeLessThan(100);
    const spacers = w.findAll("tbody .quintable--virtual-spacer-cell");
    expect(spacers).toHaveLength(2);
    expect(
      parseInt(spacers[1].attributes("style").match(/\d+/)[0]),
    ).toBeGreaterThan(30000);

    // scrolled down: a later window, with the rows above as one spacer (jsdom keeps no scrollTop: set it)
    Object.defineProperty(
      w.find(".quintable--table-container").element,
      "scrollTop",
      { value: 41 * 500, configurable: true },
    );
    // and the body moved up by as much, as a browser lays it out
    w.find("tbody").element.getBoundingClientRect = () => ({
      top: -41 * 500,
      height: 0,
    });
    w.vm._updateVirtualRange();
    await nextTick();
    const first = w.find("tbody tr.vue-quintable-row td").text();
    expect(Number(first.replace("Row ", ""))).toBeGreaterThan(450);
    expect(
      parseInt(
        w
          .findAll("tbody .quintable--virtual-spacer-cell")[0]
          .attributes("style")
          .match(/\d+/)[0],
      ),
    ).toBeGreaterThan(18000);
    w.unmount();
  });
});

describe("ajaxHeaders", () => {
  function ajaxTable(config) {
    const request = vi
      .fn()
      .mockResolvedValue({ data: { rows: [[{ text: "A" }]], all: 1 } });
    const axios = {
      request,
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: () => false,
    };
    const w = createTable({
      mountFn: "mount",
      config: {
        columns: [{ headline: "Name" }],
        ajaxUrl: "http://test.local/api",
        ...config,
      },
      rows: [],
      props: { axios },
    });
    return { w, request };
  }

  it("sends only the JSON content type without the option", async () => {
    const { w, request } = ajaxTable({});
    await vi.waitFor(() => expect(request).toHaveBeenCalled());
    expect(request.mock.calls[0][1].headers).toEqual({
      "Content-Type": "application/json",
    });
    w.unmount();
  });

  it("adds an object's headers, which may replace the content type", async () => {
    const { w, request } = ajaxTable({
      ajaxHeaders: {
        Authorization: "Bearer abc",
        "Content-Type": "text/plain",
      },
    });
    await vi.waitFor(() => expect(request).toHaveBeenCalled());
    expect(request.mock.calls[0][1].headers).toEqual({
      "Content-Type": "text/plain",
      Authorization: "Bearer abc",
    });
    w.unmount();
  });

  it("calls a function with the request's parameters before each request", async () => {
    const ajaxHeaders = vi.fn((params) => ({ "X-Page": String(params.page) }));
    const { w, request } = ajaxTable({ ajaxHeaders, pagination: 1 });
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(ajaxHeaders.mock.calls[0][0]).toMatchObject({ page: 1, search: "" });
    expect(request.mock.calls[0][1].headers["X-Page"]).toBe("1");
    w.vm._reloadPage();
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(ajaxHeaders).toHaveBeenCalledTimes(2);
    w.unmount();
  });

  it("waits for headers a function returns as a promise", async () => {
    const { w, request } = ajaxTable({
      ajaxHeaders: () => Promise.resolve({ Authorization: "Bearer later" }),
    });
    await vi.waitFor(() => expect(request).toHaveBeenCalled());
    expect(request.mock.calls[0][1].headers.Authorization).toBe("Bearer later");
    await vi.waitFor(() => expect(w.text()).toContain("A"));
    w.unmount();
  });

  it("fails the request like the server would when the function throws", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { w, request } = ajaxTable({
      ajaxHeaders: () => {
        throw new Error("no token");
      },
    });
    await vi.waitFor(() => expect(w.emitted("ajax:error")).toBeTruthy());
    expect(w.emitted("ajax:error")[0][0].message).toBe("no token");
    expect(request).not.toHaveBeenCalled();
    expect(w.vm.fetching).toBe(false);
    errorSpy.mockRestore();
    w.unmount();
  });
});
