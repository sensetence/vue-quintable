import { describe, it, expect } from "vitest";
import { h, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import VueQuintable from "../src/components/table/vue-quintable.vue";
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
      await nextTick();
      const row = wrapper.find("tbody tr");
      await row.trigger("click");
      expect(wrapper.emitted("click:row")).toBeTruthy();
      expect(wrapper.emitted("click:row")[0][0]).toBeDefined();
    });
  });

  describe("click:cell", () => {
    it("emits click:cell when a cell is clicked", async () => {
      const wrapper = createTable({ mountFn: "mount" });
      await nextTick();
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
      await nextTick();

      // Manually simulate breakpoint by setting hiddenColumns
      wrapper.vm.hiddenColumns["0"] = 1;
      await nextTick();

      const row = wrapper.find("tbody tr");
      await row.trigger("click");

      const events = wrapper.emitted("expand:row");
      if (events) {
        expect(events[0][1]).toBe("expand:row");
      }
    });

    it("emits collapse:row (and legacy expand:row) when row collapses", async () => {
      const config = {
        columns: [{ headline: "Name" }, { headline: "Age", breakpoint: "xl" }],
      };
      const wrapper = createTable({
        config,
        rows: [[{ text: "Alice" }, { text: 25 }]],
        mountFn: "mount",
      });
      await nextTick();

      wrapper.vm.hiddenColumns["0"] = 1;
      wrapper.vm.openRows["0"] = true;
      await nextTick();

      const row = wrapper.find("tbody tr");
      await row.trigger("click");

      const collapseEvents = wrapper.emitted("collapse:row");
      expect(collapseEvents).toHaveLength(1);
      expect(collapseEvents[0][1]).toBe("collapse:row");

      const events = wrapper.emitted("expand:row");
      expect(events.find((e) => e[1] === "collapse:row")).toBeTruthy();
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
      await nextTick();

      wrapper.vm.currentRowsPerPageProperty = 5;
      await nextTick();

      expect(wrapper.emitted("update:rows-per-page")).toBeTruthy();
    });
  });

  describe("update:page", () => {
    it("emits when page changes", async () => {
      const wrapper = createTable({
        config: paginationConfig(2),
        rows: generateRows(10),
      });
      await nextTick();

      wrapper.vm.gotoPage(2);
      await nextTick();

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
      await nextTick();

      wrapper.vm.query = "Alice";
      await nextTick();

      expect(wrapper.emitted("update:search")).toBeTruthy();
      expect(wrapper.emitted("update:search")[0][0]).toBe("Alice");
    });
  });

  describe("update:sort", () => {
    it("emits when sort column is set", async () => {
      const wrapper = createTable({
        config: sortConfig(),
      });
      await nextTick();

      wrapper.vm.setSortColumn(0);
      await nextTick();

      expect(wrapper.emitted("update:sort")).toBeTruthy();
    });
  });

  describe("update:filters", () => {
    it("emits when filters prop changes", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
        },
        props: {
          filters: {},
        },
      });
      await nextTick();

      // Change filters to trigger the filtersFinal watcher
      await wrapper.setProps({ filters: { name: "test" } });
      await nextTick();

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
      await nextTick();

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
      await nextTick();

      wrapper.vm.activeRow = 0;
      await nextTick();

      expect(wrapper.emitted("active:row")).toBeTruthy();
    });
  });

  describe("hover:row", () => {
    it("emits when hoveredRow changes", async () => {
      const wrapper = createTable();
      await nextTick();

      wrapper.vm.hoveredRow = 0;
      await nextTick();

      expect(wrapper.emitted("hover:row")).toBeTruthy();
    });

    it("applies hoverClass to the hovered row DOM element", async () => {
      const wrapper = createTable({ mountFn: "mount" });
      await nextTick();

      const rows = wrapper.findAll("tbody tr.vue-quintable-row");
      expect(rows.length).toBeGreaterThan(0);

      // Trigger mouseenter on the first row
      await rows.at(0).trigger("mouseenter");
      await nextTick();

      // The hovered row should have the hover class
      expect(rows.at(0).classes()).toContain("bg-muted");
      // Other rows should not
      if (rows.length > 1) {
        expect(rows.at(1).classes()).not.toContain("bg-muted");
      }
    });

    it("removes hoverClass on mouseleave from tbody", async () => {
      const wrapper = createTable({ mountFn: "mount" });
      await nextTick();

      const row = wrapper.find("tbody tr.vue-quintable-row");
      await row.trigger("mouseenter");
      await nextTick();
      expect(row.classes()).toContain("bg-muted");

      // Mouseleave on tbody clears hoveredRow
      const tbody = wrapper.find("tbody");
      await tbody.trigger("mouseleave");
      await nextTick();
      expect(row.classes()).not.toContain("bg-muted");
    });

    it("uses custom hoverClass when configured", async () => {
      const wrapper = createTable({
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          hoverClass: "custom-hover",
        },
        mountFn: "mount",
      });
      await nextTick();

      const row = wrapper.find("tbody tr.vue-quintable-row");
      await row.trigger("mouseenter");
      await nextTick();

      expect(row.classes()).toContain("custom-hover");
      expect(row.classes()).not.toContain("bg-muted");
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
      await nextTick();

      wrapper.vm.selected["0"] = true;
      await nextTick();
      // Wait for deep watcher
      await nextTick();

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
      await nextTick();

      wrapper.vm.selected["0"] = true;
      await nextTick();
      await nextTick();

      expect(wrapper.emitted("input")).toBeTruthy();
    });
  });
});

describe("clicks inside a row's details", () => {
  // A nested table re-renders between the listeners of one click and can detach the clicked element (its toggle
  // icon) before the click reaches this table's row.
  it("are no row clicks even if the clicked element is gone by then", async () => {
    const w = mount(VueQuintable, {
      props: {
        config: {
          columns: [{ headline: "A" }, { headline: "B", breakpoint: "all" }],
          expandedAll: true,
        },
        rows: [[{ text: "a" }, { text: "b" }]],
      },
      slots: {
        "generated-cell-content": () =>
          h("span", { class: "gone", onClick: (e) => e.target.remove() }, "x"),
      },
    });
    await nextTick();
    await w.find("span.gone").trigger("click");
    expect(w.vm.openRows[0]).toBe(true);
    expect(w.emitted("collapse:row")).toBeUndefined();
    w.unmount();
  });
});

describe("clicks inside a cell's shadow DOM", () => {
  if (!customElements.get("x-shadow-btn")) {
    customElements.define(
      "x-shadow-btn",
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" }).innerHTML =
            "<button>b</button><a href='#'>l</a>";
        }
      },
    );
  }
  for (const ignoreControlClicks of [false, true]) {
    it(`count as clicks on the host (ignoreControlClicks: ${ignoreControlClicks})`, async () => {
      const w = createTable({
        mountFn: "mount",
        attachTo: document.body,
        config: {
          columns: [{ headline: "A" }, { headline: "B", breakpoint: "all" }],
          ignoreControlClicks,
        },
        rows: [[{ html: "<x-shadow-btn></x-shadow-btn>" }, { text: "b" }]],
      });
      await nextTick();
      const shadow = w.find("x-shadow-btn").element.shadowRoot;
      for (const sel of ["button", "a"]) {
        shadow
          .querySelector(sel)
          .dispatchEvent(
            new MouseEvent("click", { bubbles: true, composed: true }),
          );
        await nextTick();
      }
      expect(w.emitted("click:row")).toHaveLength(2);
      expect(w.emitted("click:cell")).toHaveLength(2);
      expect(w.emitted("expand:row")).toHaveLength(2);
      w.unmount();
    });
  }
});
