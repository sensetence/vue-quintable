import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTable, objectRows } from "./helpers";

describe("Props", () => {
  describe("rows", () => {
    it("accepts array-of-arrays format", () => {
      const wrapper = createTable({
        rows: [[{ text: "A" }, { text: 1 }]],
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.vm.rowsFinal.length).toBe(1);
    });

    it("accepts object format with cells key", () => {
      const wrapper = createTable({ rows: objectRows() });
      expect(wrapper.vm.rowsFinal.length).toBe(3);
    });

    it("defaults to empty array", () => {
      const wrapper = createTable({ rows: [] });
      expect(wrapper.vm.rowsFinal).toEqual([]);
    });
  });

  describe("config", () => {
    it("defaults to empty object when not provided", () => {
      const wrapper = createTable({
        config: {},
        rows: [],
      });
      expect(wrapper.vm.configFinal).toBeDefined();
    });

    it("merges user config with defaults", () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Col1" }, { headline: "Col2" }],
          search: true,
          searchPlaceholder: "Find...",
        },
      });
      expect(wrapper.vm.configFinal.search).toBe(true);
      expect(wrapper.vm.configFinal.searchPlaceholder).toBe("Find...");
      // defaults are still present
      expect(wrapper.vm.configFinal.filterRelation).toBe("AND");
    });
  });

  describe("configFinal defaults", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTable({
        config: { columns: [{ headline: "A" }, { headline: "B" }] },
      });
    });

    it("pagination defaults to false", () => {
      expect(wrapper.vm.configFinal.pagination).toBe(false);
    });

    it("pagination true becomes 25", () => {
      const w = createTable({
        config: {
          columns: [{ headline: "A" }, { headline: "B" }],
          pagination: true,
        },
      });
      expect(w.vm.configFinal.pagination).toBe(25);
    });

    it("select defaults to false", () => {
      expect(wrapper.vm.configFinal.select).toBe(false);
    });

    it("search defaults to false", () => {
      expect(wrapper.vm.configFinal.search).toBe(false);
    });

    it("searchLength defaults to 1", () => {
      expect(wrapper.vm.configFinal.searchLength).toBe(1);
    });

    it("searchPlaceholder defaults to 'Search...'", () => {
      expect(wrapper.vm.configFinal.searchPlaceholder).toBe("Search...");
    });

    it("searchClass defaults to 'col-12'", () => {
      expect(wrapper.vm.configFinal.searchClass).toBe("col-12");
    });

    it("searchContainerClass defaults to 'row'", () => {
      expect(wrapper.vm.configFinal.searchContainerClass).toBe("row");
    });

    it("emptyPlaceholder defaults to 'No rows...'", () => {
      expect(wrapper.vm.configFinal.emptyPlaceholder).toBe("No rows...");
    });

    it("filterRelation defaults to 'AND'", () => {
      expect(wrapper.vm.configFinal.filterRelation).toBe("AND");
    });

    it("filterGroupRelation defaults to 'AND'", () => {
      expect(wrapper.vm.configFinal.filterGroupRelation).toBe("AND");
    });

    it("hoverClass defaults to 'bg-muted'", () => {
      expect(wrapper.vm.configFinal.hoverClass).toBe("bg-muted");
    });

    it("activeClass defaults to 'bg-muted'", () => {
      expect(wrapper.vm.configFinal.activeClass).toBe("bg-muted");
    });

    it("multiSort defaults to false", () => {
      expect(wrapper.vm.configFinal.multiSort).toBe(false);
    });

    it("pageSort defaults to false", () => {
      expect(wrapper.vm.configFinal.pageSort).toBe(false);
    });

    it("ajaxUrl defaults to false", () => {
      expect(wrapper.vm.configFinal.ajaxUrl).toBe(false);
    });

    it("selectPosition defaults to 'post'", () => {
      expect(wrapper.vm.configFinal.selectPosition).toBe("post");
    });

    it("expandedAll defaults to false", () => {
      expect(wrapper.vm.configFinal.expandedAll).toBe(false);
    });

    it("useFuzzySearch defaults to false", () => {
      expect(wrapper.vm.configFinal.useFuzzySearch).toBe(false);
    });

    it("prettySelect defaults to false", () => {
      expect(wrapper.vm.configFinal.prettySelect).toBe(false);
    });

    it("rowsSelect defaults to false", () => {
      expect(wrapper.vm.configFinal.rowsSelect).toBe(false);
    });

    it("keepSelect defaults to false", () => {
      expect(wrapper.vm.configFinal.keepSelect).toBe(false);
    });

    it("disallowAllOption defaults to false", () => {
      expect(wrapper.vm.configFinal.disallowAllOption).toBe(false);
    });

    it("hideEmptyColumns defaults to false", () => {
      expect(wrapper.vm.configFinal.hideEmptyColumns).toBe(false);
    });

    it("ignoreSortEmptyColumns defaults to 'none'", () => {
      expect(wrapper.vm.configFinal.ignoreSortEmptyColumns).toBe("none");
    });

    it("selectAll defaults to false", () => {
      expect(wrapper.vm.configFinal.selectAll).toBe(false);
    });

    it("selectAllRows defaults to false", () => {
      expect(wrapper.vm.configFinal.selectAllRows).toBe(false);
    });

    it("storeState defaults to false", () => {
      expect(wrapper.vm.configFinal.storeState).toBe(false);
    });

    it("defaultSelected defaults to false", () => {
      expect(wrapper.vm.configFinal.defaultSelected).toBe(false);
    });

    it("hideRowToggle defaults to false", () => {
      expect(wrapper.vm.configFinal.hideRowToggle).toBe(false);
    });

    it("enableRowTabIndex defaults to false", () => {
      expect(wrapper.vm.configFinal.enableRowTabIndex).toBe(false);
    });

    it("expandedRowIcon defaults to 'chevron-up'", () => {
      expect(wrapper.vm.configFinal.expandedRowIcon).toBe("chevron-up");
    });

    it("collapsedRowIcon defaults to 'chevron-down'", () => {
      expect(wrapper.vm.configFinal.collapsedRowIcon).toBe("chevron-down");
    });

    it("pageRange defaults to 5", () => {
      expect(wrapper.vm.configFinal.pageRange).toBe(5);
    });

    it("rowsPlaceholder defaults to 'Rows per page:'", () => {
      expect(wrapper.vm.configFinal.rowsPlaceholder).toBe("Rows per page:");
    });

    it("multiSortPlaceholder defaults to 'Multiple sort'", () => {
      expect(wrapper.vm.configFinal.multiSortPlaceholder).toBe("Multiple sort");
    });

    it("pageSortPlaceholder defaults to 'Page sort'", () => {
      expect(wrapper.vm.configFinal.pageSortPlaceholder).toBe("Page sort");
    });

    it("numberOfVisibleRowsFillerWord defaults to 'of'", () => {
      expect(wrapper.vm.configFinal.numberOfVisibleRowsFillerWord).toBe("of");
    });

    it("ajaxRequestDelay defaults to 250", () => {
      expect(wrapper.vm.configFinal.ajaxRequestDelay).toBe(250);
    });

    it("requestMethod defaults to 'GET'", () => {
      expect(wrapper.vm.configFinal.requestMethod).toBe("GET");
    });
  });

  describe("dynamicConfig", () => {
    it("defaults to false", () => {
      const wrapper = createTable();
      expect(wrapper.vm.dynamicConfig).toBe(false);
    });

    it("can be set to true", () => {
      const wrapper = createTable({ propsData: { dynamicConfig: true } });
      expect(wrapper.vm.dynamicConfig).toBe(true);
    });
  });

  describe("loading", () => {
    it("defaults to false", () => {
      const wrapper = createTable();
      expect(wrapper.vm.loading).toBe(false);
    });

    it("can be set to true", () => {
      const wrapper = createTable({ propsData: { loading: true } });
      expect(wrapper.vm.loading).toBe(true);
    });
  });

  describe("verbose", () => {
    it("defaults to false", () => {
      const wrapper = createTable();
      expect(wrapper.vm.verbose).toBe(false);
    });

    it("enables DEBUG computed when true", () => {
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      const wrapper = createTable({ propsData: { verbose: true } });
      expect(wrapper.vm.DEBUG).toBe(true);
      spy.mockRestore();
    });
  });

  describe("nested", () => {
    it("defaults to false", () => {
      const wrapper = createTable();
      expect(wrapper.vm.nested).toBe(false);
    });
  });

  describe("tableClasses", () => {
    it("defaults to empty string", () => {
      const wrapper = createTable();
      expect(wrapper.vm.tableClasses).toBe("");
    });

    it("accepts custom class string", () => {
      const wrapper = createTable({
        propsData: { tableClasses: "my-class" },
      });
      expect(wrapper.vm.tableClasses).toBe("my-class");
    });
  });

  describe("identifier", () => {
    it("defaults to null", () => {
      const wrapper = createTable();
      expect(wrapper.vm.identifier).toBe(null);
    });

    it("accepts a string", () => {
      const wrapper = createTable({
        propsData: { identifier: "my-table" },
      });
      expect(wrapper.vm.identifier).toBe("my-table");
    });
  });

  describe("initialSearchTerm", () => {
    it("defaults to null", () => {
      const wrapper = createTable();
      expect(wrapper.vm.initialSearchTerm).toBe(null);
    });
  });

  describe("filters", () => {
    it("defaults to empty object", () => {
      const wrapper = createTable();
      expect(wrapper.vm.filters).toEqual({});
    });
  });

  describe("filterGroups", () => {
    it("defaults to empty array", () => {
      const wrapper = createTable();
      expect(wrapper.vm.filterGroups).toEqual([]);
    });
  });

  describe("sortOrder", () => {
    it("defaults to empty array", () => {
      const wrapper = createTable();
      expect(wrapper.vm.sortOrder).toEqual([]);
    });
  });

  describe("updated", () => {
    it("defaults to false", () => {
      const wrapper = createTable();
      expect(wrapper.vm.updated).toBe(false);
    });
  });

  describe("value (v-model)", () => {
    it("defaults to empty array", () => {
      const wrapper = createTable();
      expect(wrapper.vm.value).toEqual([]);
    });
  });

  describe("selectedRows", () => {
    it("defaults to empty array", () => {
      const wrapper = createTable();
      expect(wrapper.vm.selectedRows).toEqual([]);
    });
  });

  describe("preSelectedRows", () => {
    it("defaults to empty array", () => {
      const wrapper = createTable();
      expect(wrapper.vm.preSelectedRows).toEqual([]);
    });
  });
});
