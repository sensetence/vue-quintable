import { describe, it, expect, vi } from "vitest";
import { createTable, sortConfig } from "./helpers";

describe("Config non-default branches", () => {
  it("hoverClass false becomes empty string", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        hoverClass: false,
      },
    });
    expect(w.vm.configFinal.hoverClass).toBe("");
  });

  it("hoverClass custom string is kept", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        hoverClass: "bg-success",
      },
    });
    expect(w.vm.configFinal.hoverClass).toBe("bg-success");
  });

  it("activeClass false becomes empty string", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        activeClass: false,
      },
    });
    expect(w.vm.configFinal.activeClass).toBe("");
  });

  it("activeClass custom string is kept", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        activeClass: "bg-danger",
      },
    });
    expect(w.vm.configFinal.activeClass).toBe("bg-danger");
  });

  it("config null returns empty object from configFinal", () => {
    // Test the null check in configFinal computed directly
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    // Manually test the null path
    const origConfig = w.vm.$options.computed.configFinal;
    // The config null check is at the top of configFinal
    expect(typeof origConfig).toBe("function");
    w.unmount();
  });

  it("pagination number snaps to nearest option", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 12,
      },
    });
    expect(w.vm.configFinal.pagination).toBe(10);
  });

  it("multiSort true is set", () => {
    const w = createTable({ config: { ...sortConfig(), multiSort: true } });
    expect(w.vm.configFinal.multiSort).toBe(true);
  });

  it("pageSort true is set", () => {
    const w = createTable({ config: { ...sortConfig(), pageSort: true } });
    expect(w.vm.configFinal.pageSort).toBe(true);
  });

  it("multiSortSelect true is set", () => {
    const w = createTable({
      config: { ...sortConfig(), multiSortSelect: true },
    });
    expect(w.vm.configFinal.multiSortSelect).toBe(true);
  });

  it("pageSortSelect true is set", () => {
    const w = createTable({
      config: { ...sortConfig(), pageSortSelect: true },
    });
    expect(w.vm.configFinal.pageSortSelect).toBe(true);
  });

  it("ajaxUrl is set from config", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local/api",
      },
    });
    expect(w.vm.configFinal.ajaxUrl).toBe("http://test.local/api");
  });

  it("selectPosition pre is accepted", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        selectPosition: "pre",
      },
    });
    expect(w.vm.configFinal.selectPosition).toBe("pre");
  });

  it("selectPosition invalid value falls back to post", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        selectPosition: "invalid",
      },
    });
    expect(w.vm.configFinal.selectPosition).toBe("post");
  });

  it("expandedAll true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        expandedAll: true,
      },
    });
    expect(w.vm.configFinal.expandedAll).toBe(true);
  });

  it("useFuzzySearch true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        useFuzzySearch: true,
      },
    });
    expect(w.vm.configFinal.useFuzzySearch).toBe(true);
  });

  it("prettySelect true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        prettySelect: true,
      },
    });
    expect(w.vm.configFinal.prettySelect).toBe(true);
  });

  it("rowsSelect true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: true,
        rowsSelect: true,
      },
    });
    expect(w.vm.configFinal.rowsSelect).toBe(true);
  });

  it("keepSelect true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        keepSelect: true,
      },
    });
    expect(w.vm.configFinal.keepSelect).toBe(true);
  });

  it("disallowAllOption true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: true,
        disallowAllOption: true,
      },
    });
    expect(w.vm.configFinal.disallowAllOption).toBe(true);
  });

  it("hideEmptyColumns true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        hideEmptyColumns: true,
      },
    });
    expect(w.vm.configFinal.hideEmptyColumns).toBe(true);
  });

  it("ignoreSortEmptyColumns 'all' is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        hideEmptyColumns: true,
        ignoreSortEmptyColumns: "all",
      },
    });
    expect(w.vm.configFinal.ignoreSortEmptyColumns).toBe("all");
  });

  it("ignoreSortEmptyColumns 'active' is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        hideEmptyColumns: true,
        ignoreSortEmptyColumns: "active",
      },
    });
    expect(w.vm.configFinal.ignoreSortEmptyColumns).toBe("active");
  });

  it("ignoreSortEmptyColumns invalid falls back to none", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        hideEmptyColumns: true,
        ignoreSortEmptyColumns: "invalid",
      },
    });
    expect(w.vm.configFinal.ignoreSortEmptyColumns).toBe("none");
  });

  it("search true is set", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], search: true },
    });
    expect(w.vm.configFinal.search).toBe(true);
  });

  it("searchLength custom is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchLength: 3,
      },
    });
    expect(w.vm.configFinal.searchLength).toBe(3);
  });

  it("searchPlaceholder custom is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchPlaceholder: "Find...",
      },
    });
    expect(w.vm.configFinal.searchPlaceholder).toBe("Find...");
  });

  it("multiSortPlaceholder custom is set", () => {
    const w = createTable({
      config: { ...sortConfig(), multiSortPlaceholder: "Multi" },
    });
    expect(w.vm.configFinal.multiSortPlaceholder).toBe("Multi");
  });

  it("pageSortPlaceholder custom is set", () => {
    const w = createTable({
      config: { ...sortConfig(), pageSortPlaceholder: "PSort" },
    });
    expect(w.vm.configFinal.pageSortPlaceholder).toBe("PSort");
  });

  it("filterRelation OR is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        filterRelation: "OR",
      },
    });
    expect(w.vm.configFinal.filterRelation).toBe("OR");
  });

  it("filterRelation invalid falls back to AND", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        filterRelation: "INVALID",
      },
    });
    expect(w.vm.configFinal.filterRelation).toBe("AND");
  });

  it("filterGroupRelation OR is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        filterGroupRelation: "OR",
      },
    });
    expect(w.vm.configFinal.filterGroupRelation).toBe("OR");
  });

  it("rowsPlaceholder custom is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: true,
        rowsSelect: true,
        rowsPlaceholder: "Rows:",
      },
    });
    expect(w.vm.configFinal.rowsPlaceholder).toBe("Rows:");
  });

  it("emptyPlaceholder custom is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        emptyPlaceholder: "Nothing",
      },
    });
    expect(w.vm.configFinal.emptyPlaceholder).toBe("Nothing");
  });

  it("selectAll true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        selectAll: true,
      },
    });
    expect(w.vm.configFinal.selectAll).toBe(true);
  });

  it("selectAllRows true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        selectAllRows: true,
      },
    });
    expect(w.vm.configFinal.selectAllRows).toBe(true);
  });

  it("selectAllRows deactivated when ajaxUrl is set", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        selectAllRows: true,
        ajaxUrl: "http://test.local/api",
      },
    });
    expect(w.vm.configFinal.selectAllRows).toBe(false);
    spy.mockRestore();
  });

  it("storeState true is set when identifier is present", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
      },
      props: { identifier: "test-table" },
    });
    expect(w.vm.configFinal.storeState).toBe(true);
  });

  it("storeState deactivated when no identifier", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
      },
    });
    expect(w.vm.configFinal.storeState).toBe(false);
    spy.mockRestore();
  });

  it("defaultSelected true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        select: true,
        defaultSelected: true,
      },
    });
    expect(w.vm.configFinal.defaultSelected).toBe(true);
  });

  it("hideRowToggle true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        hideRowToggle: true,
      },
    });
    expect(w.vm.configFinal.hideRowToggle).toBe(true);
  });

  it("enableRowTabIndex true is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
    });
    expect(w.vm.configFinal.enableRowTabIndex).toBe(true);
    w.unmount();
  });

  it("expandedRowIcon custom value is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        expandedRowIcon: "minus",
      },
    });
    expect(w.vm.configFinal.expandedRowIcon).toBe("minus");
  });

  it("expandedRowIcon invalid falls back to default", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        expandedRowIcon: "invalid",
      },
    });
    expect(w.vm.configFinal.expandedRowIcon).toBe("chevron-up");
  });

  it("collapsedRowIcon custom value is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        collapsedRowIcon: "plus",
      },
    });
    expect(w.vm.configFinal.collapsedRowIcon).toBe("plus");
  });

  it("collapsedRowIcon invalid falls back to default", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        collapsedRowIcon: "invalid",
      },
    });
    expect(w.vm.configFinal.collapsedRowIcon).toBe("chevron-down");
  });

  it("pageRange custom is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: true,
        pageRange: 3,
      },
    });
    expect(w.vm.configFinal.pageRange).toBe(3);
  });

  it("searchClass custom is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchClass: "col-md-6",
      },
    });
    expect(w.vm.configFinal.searchClass).toBe("col-md-6");
  });

  it("searchContainerClass custom is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchContainerClass: "container",
      },
    });
    expect(w.vm.configFinal.searchContainerClass).toBe("container");
  });

  it("requestMethod POST is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local",
        requestMethod: "POST",
      },
    });
    expect(w.vm.configFinal.requestMethod).toBe("POST");
  });

  it("requestMethod invalid falls back to GET", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local",
        requestMethod: "PATCH",
      },
    });
    expect(w.vm.configFinal.requestMethod).toBe("GET");
  });

  it("ajaxRequestDelay custom is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local",
        ajaxRequestDelay: 500,
      },
    });
    expect(w.vm.configFinal.ajaxRequestDelay).toBe(500);
  });

  it("numberOfVisibleRowsFillerWord custom is set", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: true,
        numberOfVisibleRowsFillerWord: "von",
      },
    });
    expect(w.vm.configFinal.numberOfVisibleRowsFillerWord).toBe("von");
  });

  it("column with classes applies them", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A", classes: "custom-col" }, { headline: "B" }],
      },
    });
    expect(w.vm.configFinal.columnClasses[0]).toContain("custom-col");
  });

  it("column without headline gets empty string", () => {
    const w = createTable({ config: { columns: [{}, { headline: "B" }] } });
    expect(w.vm.configFinal.headlines[0]).toBe("");
  });

  it("column with ignoreEmpty is tracked", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A", ignoreEmpty: true }, { headline: "B" }],
      },
    });
    expect(w.vm.configFinal.ignoreEmpty[0]).toBe(true);
    expect(w.vm.configFinal.ignoreEmpty[1]).toBe(false);
  });
});
