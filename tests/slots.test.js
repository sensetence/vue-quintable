import { describe, it, expect } from "vitest";
import { createTable } from "./helpers";

describe("Slots", () => {
  describe("header", () => {
    it("renders header slot content", () => {
      const wrapper = createTable({
        mountFn: "mount",
        slots: {
          header: '<div class="custom-header">Header</div>',
        },
      });
      expect(wrapper.find(".custom-header").exists()).toBe(true);
      expect(wrapper.find(".custom-header").text()).toBe("Header");
    });
  });

  describe("footer", () => {
    it("renders footer slot content", () => {
      const wrapper = createTable({
        mountFn: "mount",
        slots: {
          footer: '<div class="custom-footer">Footer</div>',
        },
      });
      expect(wrapper.find(".custom-footer").exists()).toBe(true);
      expect(wrapper.find(".custom-footer").text()).toBe("Footer");
    });
  });

  describe("before-search", () => {
    it("renders before-search slot when search is enabled", () => {
      const wrapper = createTable({
        mountFn: "mount",
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          search: true,
        },
        slots: {
          "before-search": '<div class="before-search">Before</div>',
        },
      });
      expect(wrapper.find(".before-search").exists()).toBe(true);
    });
  });

  describe("after-search", () => {
    it("renders after-search slot when search is enabled", () => {
      const wrapper = createTable({
        mountFn: "mount",
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          search: true,
        },
        slots: {
          "after-search": '<div class="after-search">After</div>',
        },
      });
      expect(wrapper.find(".after-search").exists()).toBe(true);
    });
  });

  describe("after-search-container", () => {
    it("renders after-search-container slot when search is enabled", () => {
      const wrapper = createTable({
        mountFn: "mount",
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          search: true,
        },
        slots: {
          "after-search-container":
            '<div class="after-search-container">Container</div>',
        },
      });
      expect(wrapper.find(".after-search-container").exists()).toBe(true);
    });
  });

  describe("search", () => {
    it("renders custom search slot with scoped props", () => {
      const wrapper = createTable({
        mountFn: "mount",
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          search: true,
          searchPlaceholder: "Find items...",
        },
        scopedSlots: {
          search(props) {
            return this.$createElement("input", {
              class: "custom-search",
              attrs: { placeholder: props.placeholder },
            });
          },
        },
      });
      const el = wrapper.find(".custom-search");
      expect(el.exists()).toBe(true);
      expect(el.attributes("placeholder")).toBe("Find items...");
    });
  });

  describe("no-results", () => {
    it("renders no-results slot when there are no matching rows", async () => {
      const wrapper = createTable({
        mountFn: "mount",
        config: {
          columns: [{ headline: "Name" }, { headline: "Age" }],
          search: true,
        },
        rows: [[{ text: "Alice" }, { text: 25 }]],
        slots: {
          "no-results": '<div class="custom-no-results">Nothing found</div>',
        },
      });
      await wrapper.vm.$nextTick();

      // Search for something that won't match
      wrapper.vm.query = "zzzzzzzzzzz";
      await wrapper.vm.$nextTick();

      expect(wrapper.find(".custom-no-results").exists()).toBe(true);
    });
  });

  describe("loading", () => {
    it("renders loading slot when loading is true", () => {
      const wrapper = createTable({
        mountFn: "mount",
        propsData: { loading: true },
        slots: {
          loading: '<div class="custom-loader">Loading...</div>',
        },
      });
      expect(wrapper.find(".custom-loader").exists()).toBe(true);
    });
  });

  describe("cell-content", () => {
    it("renders custom cell content via scoped slot", () => {
      const wrapper = createTable({
        mountFn: "mount",
        rows: [[{ text: "Test", custom: true }, { text: 1 }]],
        scopedSlots: {
          "cell-content"(props) {
            return this.$createElement(
              "span",
              { class: "custom-cell" },
              props.cell.text || ""
            );
          },
        },
      });
      expect(wrapper.find(".custom-cell").exists()).toBe(true);
    });
  });

  describe("cell-complete", () => {
    it("renders cell-complete scoped slot (deprecated)", () => {
      const wrapper = createTable({
        mountFn: "mount",
        scopedSlots: {
          "cell-complete"(props) {
            return this.$createElement("td", { class: "full-cell" }, [
              props.cell.text || "",
            ]);
          },
        },
      });
      expect(wrapper.findAll(".full-cell").length).toBeGreaterThan(0);
    });
  });
});
