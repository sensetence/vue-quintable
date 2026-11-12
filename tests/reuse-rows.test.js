import { describe, it, expect, afterEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import VueQuintable from "../src/components/table/vue-quintable.vue";

const EVENTS = [
  "filtered:rows",
  "update:sort",
  "update:page",
  "update:search",
  "click:row",
  "expand:row",
  "collapse:row",
  "hover:row",
  "input",
  "update:selected-rows",
];

const wrappers = [];
afterEach(() => wrappers.splice(0).forEach((w) => w.unmount()));

// A table with sorting, pages, search, selection and row details, and a log of its events.
function table(reuseRows) {
  const log = [];
  const listeners = {};
  for (const name of EVENTS) {
    listeners["on" + name[0].toUpperCase() + name.slice(1)] = (payload) =>
      log.push(name + " " + JSON.stringify(payload));
  }
  const rows = Array.from({ length: 12 }, (_, i) => ({
    cells: [
      { text: "Name " + ((i * 7) % 12) },
      { text: i % 5, classes: "num-" + (i % 3) },
      { text: "details " + i },
    ],
    classes: i % 4 ? undefined : "special",
  }));
  const w = mount(VueQuintable, {
    props: {
      config: {
        columns: [
          { headline: "Name", sort: true },
          { headline: "Num", sort: true },
          { headline: "Details", breakpoint: "all" },
        ],
        pagination: 5,
        search: true,
        select: true,
        reuseRows,
      },
      rows,
      ...listeners,
    },
    attachTo: document.body,
  });
  wrappers.push(w);
  return { w, log };
}

const html = (w) => w.html().replace(/qt-\d+-\d+/g, "qt");
const rowElements = (w) =>
  w.findAll("tr.vue-quintable-row").map((tr) => tr.element);

describe("reuseRows", () => {
  it("renders the same table and emits the same events as re-created rows", async () => {
    const steps = [
      (w) => w.find("th.sort-header").trigger("click"),
      (w) => w.find("th.sort-header").trigger("click"),
      (w) => w.vm.gotoPage(2),
      (w) => w.findAll("tr.vue-quintable-row")[1].trigger("click"),
      (w) => w.findAll("th.sort-header")[1].trigger("click"),
      (w) => w.findAll("td.select-td input")[0].setValue(true),
      (w) => w.find("input[type=search]").setValue("Name 1"),
      (w) => w.find("input[type=search]").setValue(""),
      (w) => w.vm.gotoPage(3),
    ];
    const recreated = table(false);
    const reused = table(true);
    await flushPromises();
    expect(html(reused.w)).toBe(html(recreated.w));
    for (const step of steps) {
      await step(recreated.w);
      await step(reused.w);
      await flushPromises();
      expect(html(reused.w)).toBe(html(recreated.w));
      expect(reused.log).toEqual(recreated.log);
    }
  });

  it("keeps the row elements on a sort and a page change", async () => {
    for (const reuseRows of [false, true]) {
      const { w } = table(reuseRows);
      await flushPromises();
      const before = rowElements(w);
      await w.find("th.sort-header").trigger("click");
      await flushPromises();
      const sorted = rowElements(w);
      w.vm.gotoPage(2);
      await flushPromises();
      const paged = rowElements(w);
      expect(sorted.every((tr, i) => tr === before[i])).toBe(reuseRows);
      expect(paged.every((tr, i) => tr === before[i])).toBe(reuseRows);
    }
  });

  it("drops the hover when another row moves under it, and hovers the next row entered", async () => {
    const { w } = table(true);
    await flushPromises();
    await w.findAll("tr.vue-quintable-row")[1].trigger("click"); // opens its details
    await w.findAll("tr.vue-quintable-row")[1].trigger("mouseenter");
    expect(w.findAll("tr.bg-muted")).toHaveLength(2); // the row and its details

    await w.find("th.sort-header").trigger("click");
    await flushPromises();
    expect(w.findAll("tr.bg-muted")).toHaveLength(0);

    const next = w.findAll("tr.vue-quintable-row")[3];
    await next.trigger("mouseenter");
    const hovered = w.findAll("tr.vue-quintable-row.bg-muted");
    expect(hovered).toHaveLength(1);
    expect(hovered[0].element).toBe(next.element);
  });

  it("is off by default", () => {
    const { w } = table(undefined);
    expect(w.vm.configFinal.reuseRows).toBe(false);
  });
});
