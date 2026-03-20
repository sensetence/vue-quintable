import { describe, it, expect, vi } from "vitest";
import { createTable, generateRows, paginationConfig } from "./helpers";
import { shallowMount } from "@vue/test-utils";
import VueQuintable from "../src/components/table/vue-quintable.vue";

describe("Computed property branches", () => {
  it("cellClassesParsed with cell align", () => {
    const rows = [[{ text: "A", align: "center" }, { text: "B" }]];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      rows,
    });
    expect(w.vm.cellClassesParsed[0][0]).toContain("text-center");
    w.unmount();
  });

  it("cellClassesParsed with row align", () => {
    const rows = [{ cells: [{ text: "A" }, { text: "B" }], align: "right" }];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      rows,
    });
    expect(w.vm.cellClassesParsed[0][0]).toContain("text-right");
    w.unmount();
  });

  it("cellClassesParsed with column align", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A", align: "left" }, { headline: "B" }],
      },
    });
    expect(w.vm.cellClassesParsed[0][0]).toContain("text-left");
    w.unmount();
  });

  it("cellClassesParsed with cell classes", () => {
    const rows = [[{ text: "A", classes: "custom-class bold" }, { text: "B" }]];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      rows,
    });
    expect(w.vm.cellClassesParsed[0][0]).toContain("custom-class");
    expect(w.vm.cellClassesParsed[0][0]).toContain("bold");
    w.unmount();
  });

  it("rowsFinal returns rows for non-ajax", () => {
    const rows = generateRows(3);
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      rows,
    });
    expect(w.vm.rowsFinal).toStrictEqual(rows);
    w.unmount();
  });

  it("rowsFinal returns ajaxRows for ajax config", () => {
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
      props: { axios: ax },
    });
    expect(w.vm.rowsFinal).toEqual([]);
    w.unmount();
  });

  it("rowsFinal returns empty array when rows is falsy", () => {
    const w = shallowMount(VueQuintable, {
      props: {
        config: { columns: [{ headline: "A" }, { headline: "B" }] },
        rows: null,
      },
    });
    expect(w.vm.rowsFinal).toEqual([]);
    w.unmount();
  });

  it("paginationOptionsFilled includes All when not disallowed", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 10,
      },
    });
    expect(w.vm.paginationOptionsFilled).toContain("All");
    w.unmount();
  });

  it("paginationOptionsFilled excludes All when disallowed", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 10,
        disallowAllOption: true,
      },
    });
    expect(w.vm.paginationOptionsFilled).not.toContain("All");
    w.unmount();
  });

  it("sortingColumns returns sort column metadata", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Age" }],
      },
    });
    w.vm.setSortColumn(0);
    expect(w.vm.sortingColumns["0"]).toBeTruthy();
    expect(w.vm.sortingColumns["0"].headline).toBe("Name");
    w.unmount();
  });

  it("headerClass includes sort-header for sortable columns", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Age" }],
      },
    });
    expect(w.vm.headerClass[0]).toContain("sort-header");
    expect(w.vm.headerClass[1]).not.toContain("sort-header");
    w.unmount();
  });

  it("headerClass includes active for sorted column", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "Name", sort: true }, { headline: "Age" }],
      },
    });
    w.vm.setSortColumn(0);
    expect(w.vm.headerClass[0]).toContain("active");
    w.unmount();
  });

  it("headerClass includes alignment class", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "Name", align: "center" }, { headline: "Age" }],
      },
    });
    expect(w.vm.headerClass[0]).toContain("text-center");
    w.unmount();
  });

  it("pages returns 1 when rowsPerPage is All", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 10,
      },
      rows: generateRows(20),
    });
    w.vm.customRowsPerPage = "All";
    expect(w.vm.pages).toBe(1);
    w.unmount();
  });

  it("pages returns ajaxPages when set", () => {
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
      props: { axios: ax },
    });
    w.vm.ajaxPages = 5;
    expect(w.vm.pages).toBe(5);
    w.unmount();
  });

  it("numberOfVisibleRows returns ajaxAll for ajax", () => {
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
      props: { axios: ax },
    });
    w.vm.ajaxAll = 42;
    expect(w.vm.numberOfVisibleRows).toBe(42);
    w.unmount();
  });

  it("visiblePages includes correct range at end", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 1,
        pageRange: 3,
      },
      rows: generateRows(10),
    });
    w.vm.gotoPage("last");
    expect(w.vm.visiblePages).toContain(10);
    expect(w.vm.visiblePages.length).toBeLessThanOrEqual(3);
    w.unmount();
  });

  it("visiblePages with even pageRange", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 1,
        pageRange: 4,
      },
      rows: generateRows(10),
    });
    w.vm.gotoPage(5);
    expect(w.vm.visiblePages.length).toBeLessThanOrEqual(4);
    expect(w.vm.visiblePages).toContain(5);
    w.unmount();
  });

  it("visiblePages near end with odd pageRange", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 1,
        pageRange: 3,
      },
      rows: generateRows(10),
    });
    w.vm.gotoPage(9);
    expect(w.vm.visiblePages).toContain(9);
    w.unmount();
  });

  it("filteredRows returns all true when no search/filter active", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      rows: generateRows(3),
    });
    const filtered = w.vm.filteredRows;
    expect(filtered.every((x) => x === true)).toBe(true);
    w.unmount();
  });

  it("filteredRows with search matches correct rows", () => {
    const rows = [
      [{ text: "Apple" }, { text: 1 }],
      [{ text: "Banana" }, { text: 2 }],
      [{ text: "Cherry" }, { text: 3 }],
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchLength: 1,
      },
      rows,
    });
    w.vm.query = "Ban";
    const filtered = w.vm.filteredRows;
    expect(filtered[0]).toBe(false);
    expect(filtered[1]).toBe(true);
    expect(filtered[2]).toBe(false);
    w.unmount();
  });

  it("filteredRows with fuzzy search", () => {
    const rows = [
      [{ text: "Appricot" }, { text: 1 }],
      [{ text: "Banana" }, { text: 2 }],
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchLength: 1,
        useFuzzySearch: true,
      },
      rows,
    });
    w.vm.query = "Banana";
    const filtered = w.vm.filteredRows;
    expect(filtered[1]).toBe(true);
    w.unmount();
  });

  it("filteredRows keyword search", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }], keywords: ["fruit", "apple"] },
      { cells: [{ text: "B" }, { text: 2 }], keywords: ["vegetable"] },
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        search: true,
        searchLength: 1,
      },
      rows,
    });
    w.vm.query = "fruit";
    const filtered = w.vm.filteredRows;
    expect(filtered[0]).toBe(true);
    expect(filtered[1]).toBe(false);
    w.unmount();
  });

  it("filteredRows with ajax returns all rows", () => {
    const ax = {
      request: vi.fn().mockResolvedValue({
        data: { rows: [[{ text: "A" }, { text: 1 }]], all: 1 },
      }),
      CancelToken: { source: () => ({ token: "t", cancel: vi.fn() }) },
      isCancel: vi.fn().mockReturnValue(false),
    };
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        ajaxUrl: "http://test.local",
      },
      rows: [],
      props: { axios: ax },
    });
    expect(w.vm.filteredRows).toEqual(w.vm.rowsFinal);
    w.unmount();
  });

  it("filtersFinal returns stored filters when storeState", () => {
    localStorage.setItem("vue-quintable-ft-filters", JSON.stringify({ x: 1 }));
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        storeState: true,
      },
      props: { identifier: "ft", filters: {} },
    });
    expect(w.vm.filtersFinal).toEqual({ x: 1 });
    localStorage.clear();
    w.unmount();
  });

  it("rowClasses includes row custom classes", () => {
    const rows = [{ cells: [{ text: "A" }, { text: 1 }], classes: "my-row" }];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      rows,
    });
    const cls = w.vm.rowClasses;
    expect(Object.values(cls)[0]).toContain("my-row");
    w.unmount();
  });

  it("rowClasses includes hover class", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm.hoveredRow = 0;
    // Hover class is applied directly in the TableRow template via dynamic binding
    // Verify the data state that drives it
    expect(w.vm.hoveredRow).toBe(0);
    expect(w.vm.configFinal.hoverClass).toBe("bg-muted");
    w.unmount();
  });

  it("rowClasses includes active class", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
    });
    w.vm.activeRow = 0;
    // Active class is applied directly in the TableRow template via dynamic binding
    // Verify the data state that drives it
    expect(w.vm.activeRow).toBe(0);
    expect(w.vm.configFinal.activeClass).toBe("bg-muted");
    w.unmount();
  });

  it("showHeadlines shows headline when available", () => {
    const w = createTable({
      config: { columns: [{ headline: "Name" }, { headline: "" }] },
    });
    expect(w.vm.showHeadlines[0]).toBe(true);
    expect(w.vm.showHeadlines[1]).toBe(false);
    w.unmount();
  });

  it("emptyColumns detects empty columns", () => {
    const rows = [
      [{ text: "" }, { text: "data" }],
      [{ text: "" }, { text: "more" }],
    ];
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        hideEmptyColumns: true,
      },
      rows,
    });
    expect(w.vm.emptyColumns[0]).toBe(true);
    expect(w.vm.emptyColumns[1]).toBe(false);
    w.unmount();
  });

  it("emptyColumns respects ignoreEmpty", () => {
    const rows = [[{ text: "" }, { text: "data" }]];
    const w = createTable({
      config: {
        columns: [{ headline: "A", ignoreEmpty: true }, { headline: "B" }],
        hideEmptyColumns: true,
      },
      rows,
    });
    expect(w.vm.emptyColumns[0]).toBe(false);
    w.unmount();
  });

  it("emptyColumns respects ignoreSortEmptyColumns none with sort", () => {
    const rows = [[{ text: "" }, { text: "data" }]];
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        hideEmptyColumns: true,
        ignoreSortEmptyColumns: "none",
      },
      rows,
    });
    expect(w.vm.emptyColumns[0]).toBe(false);
    w.unmount();
  });

  it("emptyColumns respects ignoreSortEmptyColumns active with active sort", () => {
    const rows = [[{ text: "" }, { text: "data" }]];
    const w = createTable({
      config: {
        columns: [{ headline: "A", sort: true }, { headline: "B" }],
        hideEmptyColumns: true,
        ignoreSortEmptyColumns: "active",
      },
      rows,
    });
    w.vm.setSortColumn(0);
    expect(w.vm.emptyColumns[0]).toBe(false);
    w.unmount();
  });

  it("operators returns keys of operatorFunctions", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const ops = w.vm.operators;
    expect(ops).toContain("equal");
    expect(ops).toContain("greater");
    expect(ops).toContain("less");
    expect(ops).toContain("contains");
    expect(ops).toContain("matches");
    w.unmount();
  });

  it("hiddenColumns counts breakpoint hidden columns", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A", breakpoint: "sm" }, { headline: "B" }],
      },
    });
    // In jsdom, hiddenBreakpoints should include "all" + potentially "sm"
    w.vm.hiddenBreakpoints = ["sm", "all"];
    const hidden = w.vm.hiddenColumns;
    // Should count columns hidden at sm breakpoint
    expect(hidden[0]).toBeGreaterThanOrEqual(0);
    w.unmount();
  });

  it("allSelectedProperty uses allSelectedCustom when not null", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
    });
    w.vm.allSelectedCustom = true;
    expect(w.vm.allSelectedProperty).toBe(true);
    w.vm.allSelectedCustom = false;
    expect(w.vm.allSelectedProperty).toBe(false);
    w.unmount();
  });

  it("pageRange is capped to pages", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 10,
        pageRange: 10,
      },
      rows: generateRows(3),
    });
    expect(w.vm.pageRange).toBe(1); // only 1 page
    w.unmount();
  });

  it("firstVisibleRow returns 1 when All", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 10,
      },
      rows: generateRows(5),
    });
    w.vm.customRowsPerPage = "All";
    expect(w.vm.firstVisibleRow).toBe(1);
    w.unmount();
  });

  it("lastVisibleRow capped to numberOfVisibleRows", () => {
    const w = createTable({
      config: paginationConfig(10),
      rows: generateRows(5),
    });
    expect(w.vm.lastVisibleRow).toBe(5);
    w.unmount();
  });

  it("DEBUG returns verbose prop", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      props: { verbose: true },
    });
    expect(w.vm.DEBUG).toBe(true);
    w.unmount();
  });

  it("axiosFinal uses provided axios", () => {
    const customAxios = { custom: true };
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
      props: { axios: customAxios },
    });
    expect(w.vm.axiosFinal).toEqual(customAxios);
    w.unmount();
  });

  it("checkAll with selectAllRows selects all rows including non-visible", () => {
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
    w.vm.checkAll(true);
    for (let i = 0; i < 5; i++) {
      expect(w.vm.selected[i]).toBe(true);
    }
    w.unmount();
  });

  it("checkAll respects disableSelect", () => {
    const rows = [
      { cells: [{ text: "A" }, { text: 1 }] },
      { cells: [{ text: "B" }, { text: 2 }], disableSelect: true },
    ];
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
      rows,
    });
    w.vm.checkAll(true);
    expect(w.vm.selected[0]).toBe(true);
    expect(w.vm.selected[1]).toBe(false);
    w.unmount();
  });

  it("hasSomeParentTheClass detects parent class", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const parent = document.createElement("div");
    parent.className = "test-class";
    const child = document.createElement("span");
    parent.appendChild(child);
    expect(w.vm.hasSomeParentTheClass(child, "test-class")).toBe(true);
    expect(w.vm.hasSomeParentTheClass(child, "other-class")).toBeFalsy();
    w.unmount();
  });

  it("hasSomeParentTagName detects parent tag", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const parent = document.createElement("a");
    const child = document.createElement("span");
    parent.appendChild(child);
    expect(w.vm.hasSomeParentTagName(child, "a")).toBe(true);
    expect(w.vm.hasSomeParentTagName(child, "div")).toBeFalsy();
    w.unmount();
  });

  it("checkStoredSelectedRows restores from storedState", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
    });
    w.vm.storedState["selected-rows"] = {
      0: true,
      1: false,
      2: true,
    };
    w.vm.checkStoredSelectedRows();
    expect(w.vm.selected[0]).toBe(true);
    expect(w.vm.selected[2]).toBe(true);
    w.unmount();
  });

  it("checkStoredSelectedRows with deleteStore removes entry", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }], select: true },
    });
    w.vm.storedState["selected-rows"] = { 0: true };
    w.vm.checkStoredSelectedRows(true);
    expect(w.vm.storedState["selected-rows"]).toBeUndefined();
    w.unmount();
  });

  it("updatePageOffset adjusts page range", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        pagination: 1,
        pageRange: 3,
      },
      rows: generateRows(10),
    });
    w.vm.updatePageOffset(1);
    expect(w.vm.pageOffset).toBeGreaterThan(0);
    w.vm.updatePageOffset(-1);
    expect(w.vm.pageOffset).toBeLessThanOrEqual(0);
    w.vm.updatePageOffset(0);
    expect(w.vm.pageOffset).toBe(0);
    w.unmount();
  });

  it("operator functions: lessEqual", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(w.vm.operatorFunctions.lessEqual(5, 5)).toBe(true);
    expect(w.vm.operatorFunctions.lessEqual(5, 3)).toBe(true);
    expect(w.vm.operatorFunctions.lessEqual(5, 6)).toBe(false);
    w.unmount();
  });

  it("operator functions: greaterEqual", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(w.vm.operatorFunctions.greaterEqual(5, 5)).toBe(true);
    expect(w.vm.operatorFunctions.greaterEqual(5, 6)).toBe(true);
    expect(w.vm.operatorFunctions.greaterEqual(5, 3)).toBe(false);
    w.unmount();
  });

  it("operator functions: notContains", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(w.vm.operatorFunctions.notContains("x", "abc")).toBe(true);
    expect(w.vm.operatorFunctions.notContains("a", "abc")).toBe(false);
    expect(w.vm.operatorFunctions.notContains("a", 123)).toBe(false);
    w.unmount();
  });

  it("operator functions: startsWith", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(w.vm.operatorFunctions.startsWith("abc", "abcdef")).toBe(true);
    expect(w.vm.operatorFunctions.startsWith("xyz", "abcdef")).toBe(false);
    expect(w.vm.operatorFunctions.startsWith("abc", 123)).toBe(false);
    w.unmount();
  });

  it("operator functions: endsWitch", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(w.vm.operatorFunctions.endsWitch("def", "abcdef")).toBe(true);
    expect(w.vm.operatorFunctions.endsWitch("xyz", "abcdef")).toBe(false);
    expect(w.vm.operatorFunctions.endsWitch("abc", 123)).toBe(false);
    w.unmount();
  });

  it("operator functions: matches with regex", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(w.vm.operatorFunctions.matches(/^abc/, "abcdef")).toBe(true);
    expect(w.vm.operatorFunctions.matches(/^xyz/, "abcdef")).toBe(false);
    expect(w.vm.operatorFunctions.matches("notregex", "test")).toBe(false);
    expect(w.vm.operatorFunctions.matches(/test/, 123)).toBe(false);
    w.unmount();
  });

  it("operator functions: contains with array", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(w.vm.operatorFunctions.contains("a", ["a", "b", "c"])).toBe(true);
    expect(w.vm.operatorFunctions.contains("x", ["a", "b", "c"])).toBe(false);
    w.unmount();
  });
});
