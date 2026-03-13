import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createTable,
  generateRows,
  sortConfig,
  paginationConfig,
  objectRows,
} from "./helpers";

describe("Methods", () => {
  describe("valueToString", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTable();
    });

    it("returns empty string for null", () => {
      expect(wrapper.vm.valueToString(null)).toBe("");
    });

    it("returns empty string for undefined", () => {
      expect(wrapper.vm.valueToString(undefined)).toBe("");
    });

    it("returns empty string for false", () => {
      expect(wrapper.vm.valueToString(false)).toBe("");
    });

    it("returns empty string for empty string", () => {
      expect(wrapper.vm.valueToString("")).toBe("");
    });

    it("returns '0' for 0", () => {
      expect(wrapper.vm.valueToString(0)).toBe("0");
    });

    it("returns '0' for string '0'", () => {
      expect(wrapper.vm.valueToString("0")).toBe("0");
    });

    it("returns string for any other value", () => {
      expect(wrapper.vm.valueToString("hello")).toBe("hello");
      expect(wrapper.vm.valueToString(42)).toBe("42");
    });
  });

  describe("setSearchQuery", () => {
    it("sets the internal query", () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          search: true,
        },
      });
      wrapper.vm.setSearchQuery("test");
      expect(wrapper.vm.query).toBe("test");
    });
  });

  describe("isColEmpty", () => {
    it("returns true when all cells in a column are empty", () => {
      const wrapper = createTable({
        rows: [
          [{ text: "A" }, { text: "" }],
          [{ text: "B" }, { text: "" }],
        ],
      });
      expect(wrapper.vm.isColEmpty(1)).toBe(true);
    });

    it("returns false when some cells have content", () => {
      const wrapper = createTable({
        rows: [
          [{ text: "A" }, { text: "hello" }],
          [{ text: "B" }, { text: "" }],
        ],
      });
      expect(wrapper.vm.isColEmpty(1)).toBe(false);
    });

    it("checks a specific row when rowIndex is given", () => {
      const wrapper = createTable({
        rows: [
          [{ text: "A" }, { text: "hello" }],
          [{ text: "B" }, { text: "" }],
        ],
      });
      // Row 0 has content in column 1
      expect(wrapper.vm.isColEmpty(1, 0)).toBe(false);
      // Row 1 does not
      expect(wrapper.vm.isColEmpty(1, 1)).toBe(true);
    });

    it("respects isEmpty flag on cells", () => {
      const wrapper = createTable({
        rows: [
          [{ text: "A" }, { text: "has content", isEmpty: true }],
          [{ text: "B" }, { text: "also has content", isEmpty: true }],
        ],
      });
      expect(wrapper.vm.isColEmpty(1)).toBe(true);
    });

    it("isEmpty false overrides empty text", () => {
      const wrapper = createTable({
        rows: [[{ text: "A" }, { text: "", isEmpty: false }]],
      });
      expect(wrapper.vm.isColEmpty(1)).toBe(false);
    });
  });

  describe("cellFormatters", () => {
    it("returns cell text when no formatter is set", () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
        },
        rows: [[{ text: "Alice" }, { text: 25 }]],
      });
      expect(wrapper.vm.cellFormatters(0, { text: "Alice" })).toBe("Alice");
    });

    it("returns cell html when html is set and no formatter", () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
        },
      });
      expect(
        wrapper.vm.cellFormatters(0, { html: "<b>Bold</b>", text: "fallback" })
      ).toBe("<b>Bold</b>");
    });

    it("returns empty string when no text/html and no formatter", () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
        },
      });
      expect(wrapper.vm.cellFormatters(0, {})).toBe("");
    });

    it("uses cellFormatter function when defined on column", () => {
      const formatter = (cell) => `Formatted: ${cell.text}`;
      const wrapper = createTable({
        config: {
          columns: [
            { headline: "Name", cellFormatter: formatter },
            { headline: "Age" },
          ],
        },
      });
      const result = wrapper.vm.cellFormatters(0, { text: "Alice" });
      expect(result).toEqual({ value: "Formatted: Alice" });
    });

    it("cellFormatter returning object is passed through", () => {
      const formatter = (cell) => ({
        value: `<b>${cell.text}</b>`,
        type: "html",
      });
      const wrapper = createTable({
        config: {
          columns: [
            { headline: "Name", cellFormatter: formatter },
            { headline: "Age" },
          ],
        },
      });
      const result = wrapper.vm.cellFormatters(0, { text: "Alice" });
      expect(result).toEqual({ value: "<b>Alice</b>", type: "html" });
    });
  });

  describe("handleComponentEvent", () => {
    it("emits component:event with data", () => {
      const wrapper = createTable();
      wrapper.vm.handleComponentEvent({ id: 1, action: "delete" });
      expect(wrapper.emitted("component:event")).toBeTruthy();
      expect(wrapper.emitted("component:event")[0][0]).toEqual({
        id: 1,
        action: "delete",
      });
    });
  });

  describe("gotoPage", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTable({
        config: paginationConfig(2),
        rows: generateRows(10),
      });
    });

    it("goes to a specific page number", () => {
      wrapper.vm.gotoPage(3);
      expect(wrapper.vm.currentPage).toBe(3);
    });

    it("goes to next page", () => {
      wrapper.vm.gotoPage("next");
      expect(wrapper.vm.currentPage).toBe(2);
    });

    it("goes to previous page", () => {
      wrapper.vm.currentPage = 3;
      wrapper.vm.gotoPage("prev");
      expect(wrapper.vm.currentPage).toBe(2);
    });

    it("does not go below page 1", () => {
      wrapper.vm.gotoPage("prev");
      expect(wrapper.vm.currentPage).toBe(1);
    });

    it("does not go above max pages", () => {
      wrapper.vm.gotoPage("last");
      const maxPage = wrapper.vm.pages;
      wrapper.vm.gotoPage("next");
      expect(wrapper.vm.currentPage).toBe(maxPage);
    });

    it("goes to first page", () => {
      wrapper.vm.currentPage = 3;
      wrapper.vm.gotoPage("first");
      expect(wrapper.vm.currentPage).toBe(1);
    });

    it("goes to last page", () => {
      wrapper.vm.gotoPage("last");
      expect(wrapper.vm.currentPage).toBe(wrapper.vm.pages);
    });
  });

  describe("setSortColumn", () => {
    it("sets a sort column", () => {
      const wrapper = createTable({ config: sortConfig() });
      wrapper.vm.setSortColumn(0);
      expect(wrapper.vm.currentSortIndexes["0"]).toBeDefined();
      expect(wrapper.vm.currentSortIndexes["0"].asc).toBe(true);
    });

    it("toggles sort direction on second call", () => {
      const wrapper = createTable({ config: sortConfig() });
      wrapper.vm.setSortColumn(0);
      expect(wrapper.vm.currentSortIndexes["0"].asc).toBe(true);
      wrapper.vm.setSortColumn(0);
      expect(wrapper.vm.currentSortIndexes["0"].asc).toBe(false);
    });

    it("ignores non-sortable columns", () => {
      const wrapper = createTable({
        config: {
          columns: [
            { headline: "Name", sort: false },
            { headline: "Age", sort: true },
          ],
        },
      });
      wrapper.vm.setSortColumn(0);
      expect(wrapper.vm.currentSortIndexes["0"]).toBeUndefined();
    });
  });

  describe("removeSort", () => {
    it("removes sort from a column", () => {
      const wrapper = createTable({
        config: { ...sortConfig(), multiSort: true },
      });
      wrapper.vm.setSortColumn(0);
      wrapper.vm.setSortColumn(1);
      expect(wrapper.vm.currentSortIndexes["0"]).toBeDefined();
      wrapper.vm.removeSort("0");
      expect(wrapper.vm.currentSortIndexes["0"]).toBeUndefined();
    });
  });

  describe("resetSorts", () => {
    it("resets sortedIndexes to default order", () => {
      const wrapper = createTable({
        config: sortConfig(),
        rows: generateRows(3),
      });
      wrapper.vm.setSortColumn(0);
      wrapper.vm.sort();
      wrapper.vm.resetSorts();
      expect(wrapper.vm.sortedIndexes["0"]).toBe(0);
      expect(wrapper.vm.sortedIndexes["1"]).toBe(1);
      expect(wrapper.vm.sortedIndexes["2"]).toBe(2);
    });
  });

  describe("checkAll", () => {
    it("selects all rows when select is enabled", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          select: true,
          selectAll: true,
        },
        rows: generateRows(3),
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.allSelectedProperty = true;
      wrapper.vm.checkAll();

      const selectedCount = Object.values(wrapper.vm.selected).filter(
        Boolean
      ).length;
      expect(selectedCount).toBe(3);
    });

    it("deselects all rows", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          select: true,
          selectAll: true,
        },
        rows: generateRows(3),
      });
      await wrapper.vm.$nextTick();

      // Select all first
      wrapper.vm.allSelectedProperty = true;
      wrapper.vm.checkAll();

      // Now deselect all
      wrapper.vm.allSelectedProperty = false;
      wrapper.vm.checkAll();

      const selectedCount = Object.values(wrapper.vm.selected).filter(
        Boolean
      ).length;
      expect(selectedCount).toBe(0);
    });

    it("does not select rows with disableSelect", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          select: true,
          selectAll: true,
        },
        rows: objectRows(),
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.allSelectedProperty = true;
      wrapper.vm.checkAll();

      // objectRows()[2] has disableSelect: true
      expect(wrapper.vm.selected["2"]).toBe(false);
    });
  });

  describe("updatePageOffset", () => {
    it("positive factor increases offset", () => {
      const wrapper = createTable({
        config: paginationConfig(1),
        rows: generateRows(20),
      });
      wrapper.vm.updatePageOffset(1);
      expect(wrapper.vm.pageOffset).toBeGreaterThan(0);
    });

    it("negative factor decreases offset", () => {
      const wrapper = createTable({
        config: paginationConfig(1),
        rows: generateRows(20),
      });
      wrapper.vm.updatePageOffset(1);
      wrapper.vm.updatePageOffset(-1);
      expect(wrapper.vm.pageOffset).toBeLessThanOrEqual(0);
    });

    it("zero resets offset", () => {
      const wrapper = createTable({
        config: paginationConfig(1),
        rows: generateRows(20),
      });
      wrapper.vm.updatePageOffset(1);
      wrapper.vm.updatePageOffset(0);
      expect(wrapper.vm.pageOffset).toBe(0);
    });
  });

  describe("recomputeEssentials", () => {
    it("updates key timestamps", () => {
      const wrapper = createTable();
      const oldKey = wrapper.vm.rowsUpdatedKey;

      // Ensure time difference
      wrapper.vm.recomputeEssentials();
      // Keys should be different (Date.now())
      expect(wrapper.vm.rowsUpdatedKey).toBeGreaterThanOrEqual(oldKey);
    });
  });

  describe("initLists", () => {
    it("initializes sorted indexes", () => {
      const wrapper = createTable({ rows: generateRows(3) });
      wrapper.vm.initLists();
      expect(Object.keys(wrapper.vm.sortedIndexes).length).toBe(3);
    });
  });

  describe("clearLists", () => {
    it("clears internal lists", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          select: true,
        },
        rows: generateRows(3),
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.$set(wrapper.vm.selected, "0", true);
      wrapper.vm.clearLists(true);

      expect(Object.keys(wrapper.vm.selected).length).toBe(0);
      expect(Object.keys(wrapper.vm.openRows).length).toBe(0);
    });

    it("clears lists without clearing selection when false", () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          select: true,
        },
        rows: generateRows(3),
      });
      wrapper.vm.$set(wrapper.vm.selected, "0", true);
      wrapper.vm.clearLists(false);
      // selected should remain
      expect(wrapper.vm.selected["0"]).toBe(true);
    });
  });
});

describe("Computed properties", () => {
  describe("rowsFinal", () => {
    it("returns rows when no ajax", () => {
      const rows = generateRows(3);
      const wrapper = createTable({ rows });
      expect(wrapper.vm.rowsFinal.length).toBe(3);
    });
  });

  describe("pages", () => {
    it("calculates correct number of pages", () => {
      const wrapper = createTable({
        config: paginationConfig(2),
        rows: generateRows(7),
      });
      expect(wrapper.vm.pages).toBe(4); // ceil(7/2) = 4
    });

    it("returns 1 when no pagination", () => {
      const wrapper = createTable({
        rows: generateRows(3),
      });
      expect(wrapper.vm.pages).toBe(1);
    });
  });

  describe("numberOfVisibleRows", () => {
    it("returns total count without filters", () => {
      const wrapper = createTable({ rows: generateRows(5) });
      expect(wrapper.vm.numberOfVisibleRows).toBe(5);
    });
  });

  describe("visiblePages", () => {
    it("generates page numbers for navigation", () => {
      const wrapper = createTable({
        config: paginationConfig(2),
        rows: generateRows(10),
      });
      expect(wrapper.vm.visiblePages.length).toBeGreaterThan(0);
      expect(wrapper.vm.visiblePages).toContain(1);
    });
  });

  describe("noRows", () => {
    it("is true when there are no visible rows", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          search: true,
        },
        rows: [[{ text: "Alice" }, { text: 25 }]],
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.query = "zzzzzzzznoexist";
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.noRows).toBe(true);
    });

    it("is false when there are visible rows", () => {
      const wrapper = createTable({ rows: generateRows(3) });
      expect(wrapper.vm.noRows).toBe(false);
    });
  });

  describe("filteredRows", () => {
    it("filters rows based on search query", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          search: true,
        },
        rows: [
          [{ text: "Alice" }, { text: 25 }],
          [{ text: "Bob" }, { text: 30 }],
          [{ text: "Charlie" }, { text: 35 }],
        ],
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.query = "Alice";
      await wrapper.vm.$nextTick();

      const visibleCount = wrapper.vm.filteredRows.filter(Boolean).length;
      expect(visibleCount).toBe(1);
    });
  });

  describe("filterActive", () => {
    it("is falsy when no filters are set", () => {
      const wrapper = createTable();
      expect(wrapper.vm.filterActive).toBeFalsy();
    });

    it("is truthy when filters are provided", () => {
      const wrapper = createTable({
        propsData: { filters: { name: "test" } },
        rows: [[{ text: "Alice" }, { text: 25 }]],
      });
      expect(wrapper.vm.filterActive).toBeTruthy();
    });
  });

  describe("someSelected", () => {
    it("is false when nothing is selected", () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          select: true,
        },
      });
      expect(wrapper.vm.someSelected).toBe(false);
    });
  });

  describe("numberOfSorts", () => {
    it("returns 0 when no sorts are active", () => {
      const wrapper = createTable({ config: sortConfig() });
      expect(wrapper.vm.numberOfSorts).toBe(0);
    });

    it("returns 1 after setting a sort column", () => {
      const wrapper = createTable({ config: sortConfig() });
      wrapper.vm.setSortColumn(0);
      expect(wrapper.vm.numberOfSorts).toBe(1);
    });
  });

  describe("firstVisibleRow / lastVisibleRow", () => {
    it("returns correct range with pagination", () => {
      const wrapper = createTable({
        config: paginationConfig(3),
        rows: generateRows(10),
      });
      expect(wrapper.vm.firstVisibleRow).toBe(1);
      expect(wrapper.vm.lastVisibleRow).toBe(3);
    });

    it("page 2 has correct range", () => {
      const wrapper = createTable({
        config: paginationConfig(3),
        rows: generateRows(10),
      });
      wrapper.vm.gotoPage(2);
      expect(wrapper.vm.firstVisibleRow).toBe(4);
      expect(wrapper.vm.lastVisibleRow).toBe(6);
    });
  });

  describe("ajaxLoading", () => {
    it("is false by default", () => {
      const wrapper = createTable();
      expect(wrapper.vm.ajaxLoading).toBe(false);
    });

    it("is true when loading prop is true", () => {
      const wrapper = createTable({ propsData: { loading: true } });
      expect(wrapper.vm.ajaxLoading).toBe(true);
    });
  });

  describe("DEBUG", () => {
    it("is false by default", () => {
      const wrapper = createTable();
      expect(wrapper.vm.DEBUG).toBe(false);
    });

    it("is true when verbose is true", () => {
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      const wrapper = createTable({ propsData: { verbose: true } });
      expect(wrapper.vm.DEBUG).toBe(true);
      spy.mockRestore();
    });
  });
});

describe("Sort functionality", () => {
  it("sorts rows ascending by text", async () => {
    const wrapper = createTable({
      config: sortConfig(),
      rows: [
        [{ text: "Charlie" }, { text: 35 }],
        [{ text: "Alice" }, { text: 25 }],
        [{ text: "Bob" }, { text: 30 }],
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.setSortColumn(0);
    wrapper.vm.sort();

    expect(wrapper.vm.sortedIndexes["0"]).toBe(1); // Alice
    expect(wrapper.vm.sortedIndexes["1"]).toBe(2); // Bob
    expect(wrapper.vm.sortedIndexes["2"]).toBe(0); // Charlie
  });

  it("sorts rows descending on second click", async () => {
    const wrapper = createTable({
      config: sortConfig(),
      rows: [
        [{ text: "Charlie" }, { text: 35 }],
        [{ text: "Alice" }, { text: 25 }],
        [{ text: "Bob" }, { text: 30 }],
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.setSortColumn(0); // ASC
    wrapper.vm.setSortColumn(0); // DESC
    wrapper.vm.sort();

    expect(wrapper.vm.sortedIndexes["0"]).toBe(0); // Charlie
    expect(wrapper.vm.sortedIndexes["1"]).toBe(2); // Bob
    expect(wrapper.vm.sortedIndexes["2"]).toBe(1); // Alice
  });

  it("sorts numerically with sortValue", async () => {
    const wrapper = createTable({
      config: sortConfig(),
      rows: [
        [{ text: "A" }, { text: "35", sortValue: 35 }],
        [{ text: "B" }, { text: "5", sortValue: 5 }],
        [{ text: "C" }, { text: "300", sortValue: 300 }],
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.setSortColumn(1);
    wrapper.vm.sort();

    expect(wrapper.vm.sortedIndexes["0"]).toBe(1); // 5
    expect(wrapper.vm.sortedIndexes["1"]).toBe(0); // 35
    expect(wrapper.vm.sortedIndexes["2"]).toBe(2); // 300
  });

  it("respects firstSortDirection DESC", async () => {
    const wrapper = createTable({
      config: {
        columns: [
          { headline: "Name", sort: true, firstSortDirection: "DESC" },
          { headline: "Age", sort: true },
        ],
      },
      rows: [
        [{ text: "Alice" }, { text: 25 }],
        [{ text: "Charlie" }, { text: 35 }],
        [{ text: "Bob" }, { text: 30 }],
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.setSortColumn(0);
    // After first click with firstSortDirection DESC, should sort descending
    expect(wrapper.vm.currentSortIndexes["0"].asc).toBe(false);
  });
});

describe("Pagination", () => {
  it("limits visible rows to page size", () => {
    const wrapper = createTable({
      config: paginationConfig(2),
      rows: generateRows(5),
    });
    expect(wrapper.vm.firstVisibleRow).toBe(1);
    expect(wrapper.vm.lastVisibleRow).toBe(2);
  });

  it("paginationOptionsFilled includes all options and 'All' by default", () => {
    const wrapper = createTable({
      config: {
        ...paginationConfig(2),
        rowsSelect: true,
      },
      rows: generateRows(5),
    });
    const options = wrapper.vm.paginationOptionsFilled;
    expect(options).toContain("All");
    expect(options.filter((o) => typeof o === "number").length).toBeGreaterThan(
      0
    );
  });

  it("paginationOptionsFilled excludes 'All' when disallowAllOption is true", () => {
    const wrapper = createTable({
      config: {
        ...paginationConfig(2),
        rowsSelect: true,
        disallowAllOption: true,
      },
      rows: generateRows(5),
    });
    const options = wrapper.vm.paginationOptionsFilled;
    expect(options).not.toContain("All");
  });
});

describe("Filter functionality", () => {
  it("filters rows by filter prop", async () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age" }],
      },
      rows: [
        {
          cells: [{ text: "Alice" }, { text: 25 }],
          filters: { status: "active" },
        },
        {
          cells: [{ text: "Bob" }, { text: 30 }],
          filters: { status: "inactive" },
        },
      ],
      propsData: {
        filters: { status: "active" },
      },
    });
    await wrapper.vm.$nextTick();

    const visibleCount = wrapper.vm.filteredRows.filter(Boolean).length;
    expect(visibleCount).toBe(1);
  });

  it("respects filterRelation OR", async () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age" }],
        filterRelation: "OR",
      },
      rows: [
        {
          cells: [{ text: "Alice" }, { text: 25 }],
          filters: { status: "active", role: "admin" },
        },
        {
          cells: [{ text: "Bob" }, { text: 30 }],
          filters: { status: "inactive", role: "user" },
        },
        {
          cells: [{ text: "Charlie" }, { text: 35 }],
          filters: { status: "inactive", role: "admin" },
        },
      ],
      propsData: {
        filters: { status: "active", role: "admin" },
      },
    });
    await wrapper.vm.$nextTick();

    // With OR: Alice matches both, Charlie matches role=admin, Bob matches neither
    const visibleCount = wrapper.vm.filteredRows.filter(Boolean).length;
    expect(visibleCount).toBe(2); // Alice and Charlie
  });

  it("uses contains operator", async () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age" }],
      },
      rows: [
        {
          cells: [{ text: "Alice Johnson" }, { text: 25 }],
          filters: { name: "Alice Johnson" },
        },
        {
          cells: [{ text: "Bob Smith" }, { text: 30 }],
          filters: { name: "Bob Smith" },
        },
      ],
      propsData: {
        filters: {
          name: { operator: "contains", values: "Alice" },
        },
      },
    });
    await wrapper.vm.$nextTick();

    const visibleCount = wrapper.vm.filteredRows.filter(Boolean).length;
    expect(visibleCount).toBe(1);
  });
});

describe("Search functionality", () => {
  it("search by text content", async () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age" }],
        search: true,
      },
      rows: [
        [{ text: "Alice" }, { text: 25 }],
        [{ text: "Bob" }, { text: 30 }],
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.query = "Alice";
    await wrapper.vm.$nextTick();

    const visibleCount = wrapper.vm.filteredRows.filter(Boolean).length;
    expect(visibleCount).toBe(1);
  });

  it("search by custom keywords", async () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age" }],
        search: true,
      },
      rows: [
        {
          cells: [{ text: "Alice" }, { text: 25 }],
          keywords: ["developer", "engineer"],
        },
        { cells: [{ text: "Bob" }, { text: 30 }], keywords: ["designer"] },
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.query = "engineer";
    await wrapper.vm.$nextTick();

    const visibleCount = wrapper.vm.filteredRows.filter(Boolean).length;
    expect(visibleCount).toBe(1);
  });

  it("respects searchLength minimum", async () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age" }],
        search: true,
        searchLength: 3,
      },
      rows: [
        [{ text: "Alice" }, { text: 25 }],
        [{ text: "Bob" }, { text: 30 }],
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.query = "Al"; // only 2, below minimum
    await wrapper.vm.$nextTick();

    // Both rows should still be visible since search hasn't triggered
    const visibleCount = wrapper.vm.filteredRows.filter(Boolean).length;
    expect(visibleCount).toBe(2);
  });
});

describe("Selection", () => {
  it("row.selected sets initial selection", async () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age" }],
        select: true,
      },
      rows: [
        { cells: [{ text: "Alice" }, { text: 25 }], selected: true },
        { cells: [{ text: "Bob" }, { text: 30 }] },
      ],
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selected["0"]).toBe(true);
  });

  it("defaultSelected selects all rows", async () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age" }],
        select: true,
        defaultSelected: true,
      },
      rows: generateRows(3),
    });
    await wrapper.vm.$nextTick();

    const selectedCount = Object.values(wrapper.vm.selected).filter(
      Boolean
    ).length;
    expect(selectedCount).toBe(3);
  });

  it("disableSelect prevents row selection", async () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age" }],
        select: true,
        defaultSelected: true,
      },
      rows: [
        { cells: [{ text: "Alice" }, { text: 25 }] },
        { cells: [{ text: "Bob" }, { text: 30 }], disableSelect: true },
      ],
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selected["1"]).toBeFalsy();
  });
});

describe("Row classes", () => {
  it("applies row classes from row object", () => {
    const wrapper = createTable({
      mountFn: "mount",
      rows: [
        { cells: [{ text: "Alice" }, { text: 25 }], classes: "highlight" },
        { cells: [{ text: "Bob" }, { text: 30 }] },
      ],
    });
    expect(wrapper.vm.rowClasses["0"]).toContain("highlight");
  });

  it("applies alignment class from column config via cellClassesParsed", () => {
    const wrapper = createTable({
      config: {
        columns: [
          { headline: "Name", align: "center" },
          { headline: "Age", align: "end" },
        ],
      },
      rows: [[{ text: "Alice" }, { text: 25 }]],
    });
    // Cell alignment is in cellClassesParsed, not rowClasses
    expect(wrapper.vm.cellClassesParsed[0][0]).toContain("text-center");
    expect(wrapper.vm.cellClassesParsed[0][1]).toContain("text-end");
  });
});

describe("Column config", () => {
  it("extract headlines from columns config", () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "First" }, { headline: "Second" }],
      },
    });
    expect(wrapper.vm.configFinal.headlines).toEqual(["First", "Second"]);
  });

  it("extracts sort flags from columns config", () => {
    const wrapper = createTable({
      config: {
        columns: [
          { headline: "Name", sort: true },
          { headline: "Age", sort: false },
        ],
      },
    });
    expect(wrapper.vm.configFinal.sorts).toEqual([true, false]);
  });

  it("extracts breakpoints from columns config", () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age", breakpoint: "md" }],
      },
    });
    expect(wrapper.vm.configFinal.breakpoints[1]).toBe("md");
  });

  it("extracts alignments from columns config", () => {
    const wrapper = createTable({
      config: {
        columns: [
          { headline: "Name", align: "start" },
          { headline: "Age", align: "end" },
        ],
      },
    });
    expect(wrapper.vm.configFinal.alignments).toEqual(["start", "end"]);
  });

  it("hidden column is tracked", () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age", hidden: true }],
      },
    });
    expect(wrapper.vm.configFinal.hiddenCols[1]).toBe(true);
  });

  it("sticky column is tracked", () => {
    const wrapper = createTable({
      config: {
        columns: [{ headline: "Name" }, { headline: "Age", sticky: true }],
      },
    });
    expect(wrapper.vm.configFinal.stickyCols[1]).toBe(true);
  });
});
