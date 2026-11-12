import { describe, it, expect, vi } from "vitest";
import { nextTick, h } from "vue";
import { createTable, generateRows } from "./helpers";

// Slots for icons, headings, details, extra columns, the footer controls and the empty and error states.

const sortable = {
  columns: [{ headline: "Name", sort: true }, { headline: "Age" }],
};
const withDetails = {
  columns: [{ headline: "Name" }, { headline: "City", breakpoint: "all" }],
};
const detailRows = [
  [{ text: "Ada" }, { text: "Oslo" }],
  [{ text: "Ben" }, { text: "Rome" }],
];

function mountTable(options) {
  return createTable({ mountFn: "mount", attachTo: document.body, ...options });
}

function ajaxMock(result) {
  const request = vi.fn(() => result());
  return {
    request,
    CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
    isCancel: () => false,
  };
}

describe("sort-icon", () => {
  it("replaces the sort arrows and gets the direction", async () => {
    const w = mountTable({
      config: sortable,
      slots: {
        "sort-icon": (p) =>
          h("i", { class: "my-sort" }, `${p.index}:${p.direction}`),
      },
    });
    const th = w.find("thead th.sort-header");
    expect(w.findAll(".my-sort").map((e) => e.text())).toEqual(["0:null"]);
    expect(th.find("svg.fa-up-long").exists()).toBe(false);
    await th.trigger("click");
    expect(w.find(".my-sort").text()).toBe("0:asc");
    // the control that removes the sort stays
    expect(th.find(".sorting-icon .text-muted").exists()).toBe(true);
    await th.trigger("click");
    expect(w.find(".my-sort").text()).toBe("0:desc");
    w.unmount();
  });

  it("is used for sortable headings in a row's details too", async () => {
    const w = mountTable({
      config: {
        columns: [
          { headline: "Name" },
          { headline: "City", breakpoint: "all", sort: true },
        ],
      },
      rows: detailRows,
      slots: { "sort-icon": (p) => h("i", { class: "my-sort" }, p.index) },
    });
    await w.find("tbody tr.vue-quintable-row").trigger("click");
    await w.find("tbody tr.generated-row").trigger("mouseenter");
    expect(w.find(".generated-row .my-sort").text()).toBe("1");
    w.unmount();
  });
});

describe("toggle-icon", () => {
  it("replaces the expand icon and gets the open state", async () => {
    const w = mountTable({
      config: withDetails,
      rows: detailRows,
      slots: {
        "toggle-icon": (p) =>
          h("i", { class: "my-toggle" }, `${p.index}:${p.expanded}`),
      },
    });
    const row = w.find("tbody tr.vue-quintable-row");
    expect(row.find(".my-toggle").text()).toBe("0:false");
    expect(row.find("td.toggle-td svg").exists()).toBe(false);
    await row.trigger("click");
    expect(row.find(".my-toggle").text()).toBe("0:true");
    // the invisible copy in the details keeps the column as wide
    expect(w.find(".generated-row .toggle-cell .my-toggle").exists()).toBe(
      true,
    );
    w.unmount();
  });
});

describe("select-checkbox and select-all-checkbox", () => {
  it("toggle selects a row as its checkbox does, but not a disabled one", async () => {
    const w = mountTable({
      config: { ...sortable, select: true },
      rows: [
        [{ text: "Ada" }, { text: 1 }],
        { cells: [{ text: "Ben" }, { text: 2 }], disableSelect: true },
      ],
      slots: {
        "select-checkbox": (p) =>
          h(
            "button",
            {
              class: "my-check",
              disabled: p.disabled,
              onClick: () => p.toggle(),
            },
            String(p.checked),
          ),
      },
    });
    const buttons = w.findAll(".my-check");
    expect(buttons).toHaveLength(1);
    await buttons[0].trigger("click");
    await nextTick();
    expect(w.find(".my-check").text()).toBe("true");
    const emitted = w.emitted("update:selected-rows");
    expect(emitted[emitted.length - 1][0]).toHaveLength(1);
    w.vm._toggleSelect(1, true);
    expect(w.vm.selected[1]).toBeFalsy();
    w.unmount();
  });

  it("toggle selects all rows in scope, indeterminate while only some are", async () => {
    const w = mountTable({
      config: { ...sortable, select: true, selectAll: true },
      slots: {
        "select-all-checkbox": (p) =>
          h(
            "button",
            { class: "my-all", onClick: () => p.toggle() },
            `${p.checked}:${p.indeterminate}`,
          ),
      },
    });
    expect(w.find(".my-all").text()).toBe("false:false");
    await w.find(".my-all").trigger("click");
    expect(w.find(".my-all").text()).toBe("true:false");
    expect(Object.values(w.vm.selected).every(Boolean)).toBe(true);
    w.vm._toggleSelect(0, false);
    await nextTick();
    expect(w.find(".my-all").text()).toBe("false:true");
    w.unmount();
  });
});

describe("pagination, pagination-icon, rows-info and rows-per-page", () => {
  const config = {
    columns: [{ headline: "Name" }, { headline: "Age" }],
    pagination: 2,
    pageRange: 2,
    rowsSelect: true,
  };

  it("pagination-icon replaces the four arrows", () => {
    const w = mountTable({
      config,
      rows: generateRows(10),
      slots: {
        "pagination-icon": (p) => h("i", { class: "my-arrow" }, p.type),
      },
    });
    expect(w.findAll(".my-arrow").map((e) => e.text())).toEqual([
      "first",
      "prev",
      "next",
      "last",
    ]);
    w.unmount();
  });

  it("pagination replaces the navigation and setPage changes the page", async () => {
    const w = mountTable({
      config,
      rows: generateRows(10),
      slots: {
        pagination: (p) =>
          h(
            "button",
            { class: "my-more", onClick: () => p.setPage(p.page + 1) },
            `${p.page}/${p.pages}`,
          ),
      },
    });
    expect(w.find("ul.pagination").exists()).toBe(false);
    expect(w.find(".my-more").text()).toBe("1/5");
    await w.find(".my-more").trigger("click");
    expect(w.find(".my-more").text()).toBe("2/5");
    expect(w.emitted("update:page")).toBeTruthy();
    w.unmount();
  });

  it("rows-info gets first, last and total", () => {
    const w = mountTable({
      config,
      rows: generateRows(10),
      slots: {
        "rows-info": (p) => `${p.first} to ${p.last}, ${p.total} people`,
      },
    });
    expect(
      w
        .find(
          ".quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows",
        )
        .text(),
    ).toBe("1 to 2, 10 people");
    w.unmount();
  });

  it("rows-per-page replaces the select and setRowsPerPage changes the page size", async () => {
    const w = mountTable({
      config,
      rows: generateRows(10),
      slots: {
        "rows-per-page": (p) =>
          h(
            "button",
            { class: "my-size", onClick: () => p.setRowsPerPage(5) },
            `${p.placeholder} ${p.value} of ${p.options.join(",")}`,
          ),
      },
    });
    expect(w.find(".v-select").exists()).toBe(false);
    expect(w.find(".my-size").text()).toMatch(/^Rows per page: 2 of All,1,2,/);
    await w.find(".my-size").trigger("click");
    expect(w.vm.currentRowsPerPage).toBe(5);
    w.unmount();
  });
});

describe("sort-switches", () => {
  it("replaces the switches and sets multi and page sort", async () => {
    const w = mountTable({
      config: { ...sortable, multiSortSelect: true, pageSortSelect: true },
      slots: {
        "sort-switches": (p) =>
          h("div", [
            h("button", {
              class: "my-multi",
              onClick: () => p.setMultiSort(!p.multiSort),
            }),
            h("button", {
              class: "my-page",
              onClick: () => p.setPageSort(!p.pageSort),
            }),
          ]),
      },
    });
    expect(w.find(".p-switch").exists()).toBe(false);
    await w.find(".my-multi").trigger("click");
    await w.find(".my-page").trigger("click");
    expect(w.vm.multiSort).toBe(true);
    expect(w.vm.pageSort).toBe(true);
    w.unmount();
  });
});

describe("headline", () => {
  it("renders headings in the header and in a row's details", async () => {
    const w = mountTable({
      config: withDetails,
      rows: detailRows,
      slots: {
        headline: (p) =>
          h("b", { class: "my-head" }, `${p.index}:${p.headline}`),
      },
    });
    expect(w.findAll("thead .my-head").map((e) => e.text())).toEqual([
      "0:Name",
    ]);
    await w.find("tbody tr.vue-quintable-row").trigger("click");
    expect(w.find(".generated-row .my-head").text()).toBe("1:City");
    w.unmount();
  });
});

describe("details", () => {
  it("replaces a row's details and gets the cells it shows", async () => {
    const config = {
      columns: [
        { headline: "Name" },
        { headline: "City", breakpoint: "all" },
        { headline: "Note", sticky: true },
      ],
    };
    const w = mountTable({
      config,
      rows: [[{ text: "Ada" }, { text: "Oslo" }, { text: "VIP" }]],
      slots: {
        details: (p) =>
          h(
            "p",
            { class: "my-details" },
            p.cells
              .map((c) => `${c.headline}=${c.cell.text}${c.sticky ? "*" : ""}`)
              .join(" "),
          ),
      },
    });
    // only the sticky cell while the row is closed
    expect(w.find(".my-details").text()).toBe("Note=VIP*");
    expect(w.find(".generated-table").exists()).toBe(false);
    await w.find("tbody tr.vue-quintable-row").trigger("click");
    expect(w.find(".my-details").text()).toBe("City=Oslo Note=VIP*");
    // a click in the details keeps the row open, as in the default details
    await w.find(".my-details").trigger("click");
    expect(w.find(".my-details").text()).toBe("City=Oslo Note=VIP*");
    w.unmount();
  });
});

describe("row-prepend and row-append", () => {
  it("add a cell to every row and to the header, and the details span them", async () => {
    const w = mountTable({
      config: withDetails,
      rows: detailRows,
      slots: {
        "row-prepend": (p) => h("i", { class: "my-pre" }, p.index),
        "row-append": (p) => h("button", { class: "my-edit" }, p.row[0].text),
        "header-append": () => "Actions",
      },
    });
    expect(w.findAll("td.row-prepend-td .my-pre")).toHaveLength(2);
    expect(w.findAll("td.row-append-td .my-edit").map((e) => e.text())).toEqual(
      ["Ada", "Ben"],
    );
    expect(w.find("thead th.row-prepend-th").text()).toBe("");
    expect(w.find("thead th.row-append-th").text()).toBe("Actions");
    const headerCells = w.findAll("thead th").length;
    await w.find("tbody tr.vue-quintable-row").trigger("click");
    expect(Number(w.find(".generated-row > td").attributes("colspan"))).toBe(
      headerCells,
    );
    w.unmount();
  });
});

describe("empty", () => {
  it("shows when the table has no rows at all, no-results when search finds none", async () => {
    const config = { ...sortable, search: true };
    const slots = {
      empty: () => h("p", { class: "my-empty" }, "Nothing yet"),
      "no-results": () => h("p", { class: "my-none" }, "No match"),
    };
    const empty = mountTable({ config, rows: [], slots });
    expect(empty.find(".my-empty").exists()).toBe(true);
    expect(empty.find(".my-none").exists()).toBe(false);
    empty.unmount();

    const some = mountTable({ config, slots });
    some.vm.setSearchQuery("zzz");
    await nextTick();
    expect(some.find(".my-empty").exists()).toBe(false);
    expect(some.find(".my-none").exists()).toBe(true);
    some.unmount();
  });

  it("shows for an AJAX table when the server has no rows and no search is set", async () => {
    const ax = ajaxMock(() => Promise.resolve({ data: { rows: [], all: 0 } }));
    const w = mountTable({
      config: { ...sortable, ajaxUrl: "http://test.local/api" },
      rows: [],
      props: { axios: ax },
      slots: { empty: () => h("p", { class: "my-empty" }, "Nothing yet") },
    });
    await vi.waitFor(() => expect(w.find(".my-empty").exists()).toBe(true));
    w.unmount();
  });
});

describe("error", () => {
  it("shows when loading fails, reload loads again, and it goes once rows arrive", async () => {
    let fail = true;
    const ax = ajaxMock(() =>
      fail
        ? Promise.reject(new Error("Server down"))
        : Promise.resolve({
            data: { rows: [[{ text: "A" }, { text: 1 }]], all: 1 },
          }),
    );
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const w = mountTable({
      config: { ...sortable, ajaxUrl: "http://test.local/api" },
      rows: [],
      props: { axios: ax },
      slots: {
        error: (p) =>
          h(
            "button",
            { class: "my-error", onClick: () => p.reload() },
            p.error.message,
          ),
      },
    });
    await vi.waitFor(() => expect(w.find(".my-error").exists()).toBe(true));
    expect(w.find(".my-error").text()).toBe("Server down");
    expect(w.find(".quintable--table-container--no-results").exists()).toBe(
      false,
    );
    fail = false;
    await w.find(".my-error").trigger("click");
    await vi.waitFor(() => expect(w.find(".my-error").exists()).toBe(false));
    expect(ax.request).toHaveBeenCalledTimes(2);
    expect(w.text()).toContain("A");
    errorSpy.mockRestore();
    w.unmount();
  });
});
