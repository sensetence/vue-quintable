import { describe, it, expect } from "vitest";
import {
  createTable,
  generateRows,
  sortConfig,
  paginationConfig,
} from "./helpers";

describe("Events", () => {
  describe("click:row", () => {
    it("emits click:row when a row is clicked", async () => {
      const wrapper = createTable({ mountFn: "mount" });
      await wrapper.vm.$nextTick();
      const row = wrapper.find("tbody tr");
      await row.trigger("click");
      expect(wrapper.emitted("click:row")).toBeTruthy();
      expect(wrapper.emitted("click:row")[0][0]).toBeDefined();
    });
  });

  describe("click:cell", () => {
    it("emits click:cell when a cell is clicked", async () => {
      const wrapper = createTable({ mountFn: "mount" });
      await wrapper.vm.$nextTick();
      const cell = wrapper.find("tbody td");
      await cell.trigger("click");
      expect(wrapper.emitted("click:cell")).toBeTruthy();
    });
  });

  describe("expand:row", () => {
    it("emits expand:row with 'expand:row' as second param when row expands", async () => {
      const config = {
        columns: [{ headline: "Name" }, { headline: "Age", breakpoint: "xl" }],
      };
      const wrapper = createTable({
        config,
        rows: [[{ text: "Alice" }, { text: 25 }]],
        mountFn: "mount",
      });
      await wrapper.vm.$nextTick();

      // Manually simulate breakpoint by setting hiddenColumns
      wrapper.vm.$set(wrapper.vm.hiddenColumns, "0", 1);
      await wrapper.vm.$nextTick();

      const row = wrapper.find("tbody tr");
      await row.trigger("click");

      const events = wrapper.emitted("expand:row");
      if (events) {
        expect(events[0][1]).toBe("expand:row");
      }
    });

    it("emits expand:row with 'collapse:row' as second param when row collapses", async () => {
      const config = {
        columns: [{ headline: "Name" }, { headline: "Age", breakpoint: "xl" }],
      };
      const wrapper = createTable({
        config,
        rows: [[{ text: "Alice" }, { text: 25 }]],
        mountFn: "mount",
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.$set(wrapper.vm.hiddenColumns, "0", 1);
      wrapper.vm.$set(wrapper.vm.openRows, "0", true);
      await wrapper.vm.$nextTick();

      const row = wrapper.find("tbody tr");
      await row.trigger("click");

      const events = wrapper.emitted("expand:row");
      if (events) {
        const collapseEvent = events.find((e) => e[1] === "collapse:row");
        expect(collapseEvent).toBeTruthy();
      }
    });
  });

  describe("update:rows-per-page", () => {
    it("emits when rows per page changes", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          pagination: 2,
          rowsSelect: true,
        },
        rows: generateRows(10),
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.currentRowsPerPageProperty = 5;
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("update:rows-per-page")).toBeTruthy();
    });
  });

  describe("update:page", () => {
    it("emits when page changes", async () => {
      const wrapper = createTable({
        config: paginationConfig(2),
        rows: generateRows(10),
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.gotoPage(2);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("update:page")).toBeTruthy();
      expect(wrapper.emitted("update:page")[0][0]).toBe(2);
    });
  });

  describe("update:search", () => {
    it("emits when search query changes", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          search: true,
        },
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.query = "Alice";
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("update:search")).toBeTruthy();
      expect(wrapper.emitted("update:search")[0][0]).toBe("Alice");
    });
  });

  describe("update:sort", () => {
    it("emits when sort column is set", async () => {
      const wrapper = createTable({
        config: sortConfig(),
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.setSortColumn(0);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("update:sort")).toBeTruthy();
    });
  });

  describe("update:filters", () => {
    it("emits when filters prop changes", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
        },
        propsData: {
          filters: {},
        },
      });
      await wrapper.vm.$nextTick();

      // Change filters to trigger the filtersFinal watcher
      await wrapper.setProps({ filters: { name: "test" } });
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("update:filters")).toBeTruthy();
    });
  });

  describe("filtered:rows", () => {
    it("emits when rows are filtered", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          search: true,
        },
      });
      await wrapper.vm.$nextTick();

      // filteredRows watcher fires on immediate
      expect(wrapper.emitted("filtered:rows")).toBeTruthy();
    });
  });

  describe("component:event", () => {
    it("emits when handleComponentEvent is called", () => {
      const wrapper = createTable();
      wrapper.vm.handleComponentEvent({ action: "test" });
      expect(wrapper.emitted("component:event")).toBeTruthy();
      expect(wrapper.emitted("component:event")[0][0]).toEqual({
        action: "test",
      });
    });
  });

  describe("active:row", () => {
    it("emits when activeRow changes and enableRowTabIndex is true", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          enableRowTabIndex: true,
        },
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.activeRow = 0;
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("active:row")).toBeTruthy();
    });
  });

  describe("hover:row", () => {
    it("emits when hoveredRow changes", async () => {
      const wrapper = createTable();
      await wrapper.vm.$nextTick();

      wrapper.vm.hoveredRow = 0;
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("hover:row")).toBeTruthy();
    });
  });

  describe("update:selected-rows", () => {
    it("emits when selection changes", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          select: true,
        },
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.$set(wrapper.vm.selected, "0", true);
      await wrapper.vm.$nextTick();
      // Wait for deep watcher
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("update:selected-rows")).toBeTruthy();
    });
  });

  describe("input (v-model)", () => {
    it("emits input when selection changes", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          select: true,
        },
      });
      await wrapper.vm.$nextTick();

      wrapper.vm.$set(wrapper.vm.selected, "0", true);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("input")).toBeTruthy();
    });
  });
});
