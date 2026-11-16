import { describe, it, expect, vi, afterEach } from "vitest";
import { nextTick } from "vue";
import { createTable, generateRows } from "./helpers";

const columns = [{ headline: "Name" }, { headline: "Age" }];

function axiosMock() {
  return {
    request: vi.fn().mockResolvedValue({ data: { rows: [], all: 0 } }),
    CancelToken: { source: () => ({ token: "tok", cancel: vi.fn() }) },
    isCancel: vi.fn().mockReturnValue(false),
  };
}

function setSize(element, sizes) {
  for (const [key, value] of Object.entries(sizes)) {
    Object.defineProperty(element, key, { configurable: true, value });
  }
}

describe("checkAll keeps the 2.x scope", () => {
  it("select-all deselects the rows of other pages", async () => {
    const rows = generateRows(4).map((cells, i) => ({
      cells,
      selected: i >= 2,
    }));
    const w = createTable({
      config: { columns, select: true, selectAll: true, pagination: 2 },
      rows,
    });
    await nextTick();
    w.vm.checkAll(true);
    expect([0, 1, 2, 3].map((i) => w.vm.selected[i])).toEqual([
      true,
      true,
      false,
      false,
    ]);
    w.unmount();
  });

  it("select-all deselects the rows the search filters out", async () => {
    const w = createTable({
      config: { columns, select: true, selectAll: true, search: true },
      rows: [
        [{ text: "Alice" }, { text: 1 }],
        { cells: [{ text: "Bob" }, { text: 2 }], selected: true },
      ],
    });
    w.vm.query = "Alice";
    await nextTick();
    w.vm.checkAll(true);
    expect(w.vm.selected[0]).toBe(true);
    expect(w.vm.selected[1]).toBe(false);
    w.unmount();
  });
});

describe("ignoreControlClicks", () => {
  function table(ignoreControlClicks) {
    return createTable({
      mountFn: "mount",
      config: { columns, ignoreControlClicks },
      rows: [
        [
          { html: '<a href="#" class="link">open</a>' },
          {
            html: '<label class="off"><input type="radio" disabled /> x</label>',
          },
        ],
      ],
    });
  }

  it("a click on a link is no click on the row or the cell", async () => {
    const w = table(true);
    await w.find("a.link").trigger("click");
    await w.find("a.link").trigger("auxclick", { button: 1 });
    expect(w.emitted("click:row")).toBeUndefined();
    expect(w.emitted("click:cell")).toBeUndefined();
    expect(w.emitted("auxclick:row")).toBeUndefined();
    expect(w.emitted("auxclick:cell")).toBeUndefined();
    w.unmount();
  });

  it("a click on the label of a disabled control stays the row's", async () => {
    const w = table(true);
    await w.find("label.off").trigger("click");
    expect(w.emitted("click:row")).toHaveLength(1);
    w.unmount();
  });

  it("is off by default: the link's click reaches the row", async () => {
    const w = table(undefined);
    await w.find("a.link").trigger("click");
    expect(w.emitted("click:row")).toHaveLength(1);
    expect(w.emitted("click:cell")).toHaveLength(1);
    w.unmount();
  });
});

describe("cellTitles", () => {
  function table(cellTitles, html) {
    return createTable({
      mountFn: "mount",
      config: { columns, cellTitles },
      rows: [[{ html }, { text: 1 }]],
    });
  }
  const cut =
    '<span class="cut" style="text-overflow: ellipsis">Long customer name</span>';

  it("a cut text gets its full text as title, and loses it once it fits", async () => {
    const w = table(true, cut);
    const span = w.find("span.cut");
    setSize(span.element, { scrollWidth: 200, clientWidth: 100 });
    await span.trigger("mouseover");
    expect(span.attributes("title")).toBe("Long customer name");

    setSize(span.element, { scrollWidth: 100, clientWidth: 100 });
    await span.trigger("mouseover");
    expect(span.attributes("title")).toBeUndefined();
    w.unmount();
  });

  it("an own title wins", async () => {
    const w = table(
      true,
      '<span class="cut" title="Own" style="text-overflow: ellipsis">Long</span>',
    );
    const span = w.find("span.cut");
    setSize(span.element, { scrollWidth: 200, clientWidth: 100 });
    await span.trigger("mouseover");
    expect(span.attributes("title")).toBe("Own");
    w.unmount();
  });

  it("is off by default", async () => {
    const w = table(undefined, cut);
    const span = w.find("span.cut");
    setSize(span.element, { scrollWidth: 200, clientWidth: 100 });
    await span.trigger("mouseover");
    expect(span.attributes("title")).toBeUndefined();
    w.unmount();
  });
});

describe("skeletonLoading", () => {
  const config = {
    columns: [
      { headline: "Name", sort: true },
      { headline: "Age" },
      { headline: "Notes", breakpoint: "all" },
    ],
    pagination: 5,
    select: true,
    skeletonLoading: true,
  };
  const rows = [[{ text: "A" }, { text: 1 }, { text: "x" }]];

  it("shows a skeleton of the visible columns and one page of rows", () => {
    const w = createTable({
      mountFn: "mount",
      config,
      rows,
      props: { loading: true },
    });
    const skeleton = w.find(".quintable--skeleton");
    expect(skeleton.exists()).toBe(true);
    expect(w.find(".loader-wrapper").exists()).toBe(false);
    const rowEls = skeleton.findAll(".quintable--skeleton--row");
    expect(rowEls).toHaveLength(1 + 5);
    // toggle + Name + Age + select; the "all" column folds into the details
    expect(
      rowEls[0].findAll(":scope > .quintable--skeleton--cell"),
    ).toHaveLength(4);
    expect(rowEls[0].text()).toContain("Name");
    expect(rowEls[0].text()).not.toContain("Notes");
    expect(skeleton.findAll(".quintable--skeleton--bar")).toHaveLength(2 * 5);
    w.unmount();
  });

  it("nests cells as deep as a table's, so `.table > * > * > *` pads them as loaded", () => {
    const w = createTable({
      mountFn: "mount",
      config,
      rows,
      props: { loading: true },
    });
    const skeleton = w.find(".quintable--skeleton").element;
    const cells = skeleton.querySelectorAll(".quintable--skeleton--cell");
    expect(cells.length).toBe(4 * 6);
    expect(skeleton.querySelectorAll(":scope > * > * > *")).toHaveLength(
      cells.length,
    );
    // the bars sit one level deeper, out of reach of the cell padding
    expect(
      skeleton.querySelectorAll(
        ":scope > * > * > * > .quintable--skeleton--bar",
      ),
    ).toHaveLength(2 * 5);
    w.unmount();
  });

  it("is off by default: the spinner shows", () => {
    const w = createTable({
      mountFn: "mount",
      config: { ...config, skeletonLoading: false },
      rows,
      props: { loading: true },
    });
    expect(w.find(".quintable--skeleton").exists()).toBe(false);
    expect(w.find(".loader-wrapper").exists()).toBe(true);
    w.unmount();
  });

  it("an own loading slot gets the hidden breakpoints", async () => {
    const w = createTable({
      mountFn: "mount",
      config,
      rows,
      props: { loading: true },
      slots: {
        loading: `<template #loading="{ hiddenBreakpoints }"><p class="own">{{ hiddenBreakpoints.join(",") }}</p></template>`,
      },
    });
    await nextTick();
    expect(w.find(".own").text()).toContain("all");
    w.unmount();
  });
});

describe("autoFit", () => {
  function table() {
    return createTable({
      mountFn: "mount",
      config: {
        columns: [
          { headline: "Name" },
          { headline: "Street", breakpoint: "xxl" },
          { headline: "City", breakpoint: "xl" },
          { headline: "Mail", breakpoint: "md" },
        ],
        autoFit: true,
      },
      rows: [[{ text: "A" }, { text: "B" }, { text: "C" }, { text: "D" }]],
    });
  }

  it("xxl/xl/lg follow the container, not the window", async () => {
    const w = table();
    w.vm._onBreakpointChange(["md", "lg", "xl", "xxl", "all"]);
    expect(w.vm.hiddenBreakpoints).toEqual(["md", "all"]);
    w.unmount();
  });

  it("folds level by level while the table overflows, then scrolls", async () => {
    const w = table();
    w.vm._onBreakpointChange(["all"]);
    setSize(w.vm.$refs["height-wrapper"], { clientWidth: 300 });
    setSize(w.vm.$refs.table, { scrollWidth: 500 });

    w.vm._fitToContainer();
    for (let i = 0; i < 5; i++) {
      await nextTick();
    }
    expect(w.vm.hiddenBreakpoints).toEqual(["all", "xxl", "xl", "lg"]);
    expect(w.vm.fitScroll).toBe(true);
    await nextTick();
    expect(
      w.find(".quintable--table-container").classes("quintable-fit-scroll"),
    ).toBe(true);

    // The container grows: start over from the window's list.
    setSize(w.vm.$refs["height-wrapper"], { clientWidth: 600 });
    setSize(w.vm.$refs.table, { scrollWidth: 500 });
    w.vm._fitToContainer();
    await nextTick();
    expect(w.vm.hiddenBreakpoints).toEqual(["all"]);
    expect(w.vm.fitScroll).toBe(false);
    w.unmount();
  });

  it("is off by default: the window's list stands", () => {
    const w = createTable({ config: { columns } });
    w.vm._onBreakpointChange(["lg", "xl", "xxl", "all"]);
    expect(w.vm.hiddenBreakpoints).toEqual(["lg", "xl", "xxl", "all"]);
    w.unmount();
  });
});

describe("row details", () => {
  it("span exactly the table's columns", async () => {
    const w = createTable({
      mountFn: "mount",
      config: {
        columns: [
          { headline: "Name" },
          { headline: "Age" },
          { headline: "Notes", breakpoint: "all" },
        ],
        expandedAll: true,
      },
      rows: [[{ text: "A" }, { text: 1 }, { text: "x" }]],
    });
    await nextTick();
    const headerCells = w.findAll("thead tr > th").length;
    const detailsCell = w.find(".generated-row > td");
    expect(headerCells).toBe(3); // toggle, Name, Age — the details used to span 4
    expect(detailsCell.attributes("colspan")).toBe(String(headerCells));
    w.unmount();
  });
});

describe("reloadOn", () => {
  it("re-fetches an ajax table on the app's signal and unsubscribes on unmount", async () => {
    let reload = null;
    const off = vi.fn();
    const ax = axiosMock();
    const w = createTable({
      config: {
        columns,
        ajaxUrl: "http://test.local/api",
        reloadOn: (callback) => {
          reload = callback;
          return off;
        },
      },
      rows: [],
      props: { axios: ax },
    });
    await nextTick();
    const spy = vi.spyOn(w.vm, "loadViaAjax");
    reload();
    expect(spy).toHaveBeenCalledWith(false, true, "RELOAD");
    w.unmount();
    expect(off).toHaveBeenCalled();
  });

  it("does nothing for a table without ajaxUrl", async () => {
    let reload = null;
    const w = createTable({
      config: { columns, reloadOn: (callback) => (reload = callback) },
    });
    const spy = vi.spyOn(w.vm, "loadViaAjax");
    reload();
    expect(spy).not.toHaveBeenCalled();
    w.unmount();
  });
});

describe("plugin defaults", () => {
  it("apply to every table; a table's own config wins", () => {
    const global = {
      provide: { vueQuintableDefaults: { autoFit: true, cellTitles: true } },
    };
    const w = createTable({ config: { columns, cellTitles: false }, global });
    expect(w.vm.configFinal.autoFit).toBe(true);
    expect(w.vm.configFinal.cellTitles).toBe(false);
    w.unmount();
  });
});

describe("sort header", () => {
  function icons(w) {
    return w
      .find(".quintable--table-container--table--header-row--th--sorting-icon")
      .findAll("svg")
      .map((svg) => svg.attributes("data-icon"));
  }

  it("shows two arrows until sorted, then one icon of the direction", async () => {
    const w = createTable({
      mountFn: "mount",
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Age" }],
      },
    });
    expect(icons(w)).toEqual(["up-long", "down-long"]);
    expect(w.find(".sorting-icon").classes("sorted")).toBe(false);

    w.vm.setSortColumn(0, true);
    await nextTick();
    expect(icons(w)).toEqual(["arrow-up-short-wide", "xmark"]);
    expect(w.find(".sorting-icon").classes("sorted")).toBe(true);

    w.vm.setSortColumn(0, false);
    await nextTick();
    expect(icons(w)).toEqual(["arrow-down-wide-short", "xmark"]);
    w.unmount();
  });
});

describe("alwaysShowSortIcons", () => {
  function headerRow(alwaysShowSortIcons) {
    const w = createTable({
      mountFn: "mount",
      config: {
        columns: [{ headline: "Name", sort: true }],
        alwaysShowSortIcons,
      },
    });
    return w.find(".vue-quintable-header-row");
  }

  it("marks the header row so its arrows stay faintly visible", () => {
    expect(headerRow(true).classes("sort-icons-visible")).toBe(true);
  });

  it("is off by default: the arrows show on hover only", () => {
    expect(headerRow(undefined).classes("sort-icons-visible")).toBe(false);
  });
});

describe("page size", () => {
  it("is handed to the styles as --quintable-page-size", () => {
    const w = createTable({
      mountFn: "mount",
      config: { columns, pagination: 5 },
      rows: generateRows(8),
    });
    expect(w.attributes("style")).toContain("--quintable-page-size: 5");
    w.unmount();
  });
});

describe("expandedAll at runtime", () => {
  it("opens and closes every row's details when the config changes", async () => {
    const columns = [{ headline: "A" }, { headline: "B", breakpoint: "all" }];
    const w = createTable({
      mountFn: "mount",
      config: { columns },
      rows: [
        [{ text: "a" }, { text: "1" }],
        [{ text: "b" }, { text: "2" }],
      ],
    });
    await nextTick();
    expect(w.findAll(".generated-row")).toHaveLength(0);
    await w.setProps({ config: { columns, expandedAll: true } });
    await nextTick();
    expect({ ...w.vm.openRows }).toEqual({ 0: true, 1: true });
    expect(w.findAll(".generated-row")).toHaveLength(2);
    await w.setProps({ config: { columns, expandedAll: false } });
    await nextTick();
    expect({ ...w.vm.openRows }).toEqual({ 0: false, 1: false });
    expect(w.findAll(".generated-row")).toHaveLength(0);
    w.unmount();
  });
});

describe("sort icon of a folded column in a row's details", () => {
  const DETAIL_ICON =
    ".quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon";

  async function details(hoverNone) {
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query) => ({
        matches: hoverNone && query === "(hover: none)",
        media: query,
        addEventListener() {},
        removeEventListener() {},
      })),
    );
    const w = createTable({
      mountFn: "mount",
      config: {
        columns: [
          { headline: "Name" },
          { headline: "City", sort: true, breakpoint: "all" },
        ],
        expandedAll: true,
      },
      rows: [[{ text: "Alice" }, { text: "Ulm" }]],
    });
    await nextTick();
    return w;
  }

  afterEach(() => vi.unstubAllGlobals());

  it("shows on a touch screen without a hover", async () => {
    const w = await details(true);
    expect(w.find(DETAIL_ICON).exists()).toBe(true);
    w.unmount();
  });

  it("shows on a pointer device only while the row is hovered", async () => {
    const w = await details(false);
    expect(w.find(DETAIL_ICON).exists()).toBe(false);
    await w.find("tbody tr").trigger("mouseenter");
    await nextTick();
    expect(w.find(DETAIL_ICON).exists()).toBe(true);
    w.unmount();
  });
});
