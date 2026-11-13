import { describe, it, expect, afterEach } from "vitest";
import { nextTick } from "vue";
import { createTable } from "./helpers";
import { operatorFunctions } from "../src/components/table/filter";

// Fixes from the v3.0.0 review (REVIEW-v3.0.0.md): a global RegExp filter, broken stored values, the row of
// expand:row/collapse:row after a sort, and the count behind "select all" after a sort.

afterEach(() => localStorage.clear());

describe("matches filter", () => {
  it("matches every row with a global or sticky RegExp", async () => {
    const global = /a/gi;
    expect(
      ["Anna", "Alan", "Ada", "Abe"].map((v) =>
        operatorFunctions.matches(global, v),
      ),
    ).toEqual([true, true, true, true]);
    const sticky = /a/iy;
    expect(
      ["Anna", "Alan"].map((v) => operatorFunctions.matches(sticky, v)),
    ).toEqual([true, true]);

    const rows = ["Anna", "Alan", "Ada", "Abe", "Bob"].map((name) => ({
      cells: [{ text: name }],
      filters: { name },
    }));
    const w = createTable({
      mountFn: "mount",
      config: { columns: [{ headline: "Name" }] },
      rows,
      props: { filters: { name: { operator: "matches", values: /a/gi } } },
    });
    await nextTick();
    expect(w.findAll("tbody tr.vue-quintable-row")).toHaveLength(4);
    w.unmount();
  });
});

describe("broken stored values", () => {
  const config = {
    columns: [{ headline: "Name", sort: true }],
    storeState: true,
    columnPicker: true,
    columnFilters: true,
    resizableColumns: true,
  };

  it("are dropped, and removed from storage, instead of breaking the table", async () => {
    const broken = {
      filters: "{not json",
      "selected-rows": "[1,2",
      "sort-indexes": "5",
      "column-widths": "null",
      "column-filters": "true",
      "hidden-columns": '{"0":true}',
    };
    for (const [name, value] of Object.entries(broken)) {
      localStorage.setItem(`vue-quintable-broken-${name}`, value);
    }
    const w = createTable({
      mountFn: "mount",
      config,
      rows: [[{ text: "b" }], [{ text: "a" }]],
      props: { identifier: "broken" },
    });
    await nextTick();
    expect(w.findAll("tbody tr.vue-quintable-row")).toHaveLength(2);
    for (const name of Object.keys(broken)) {
      expect(localStorage.getItem(`vue-quintable-broken-${name}`)).toBeNull();
    }
    w.unmount();
  });

  it("leave valid stored values as they are", async () => {
    localStorage.setItem(
      "vue-quintable-fine-sort-indexes",
      JSON.stringify({
        0: { headline: "Name", index: 0, asc: false, order: 0 },
      }),
    );
    localStorage.setItem("vue-quintable-fine-hidden-columns", "[]");
    const w = createTable({
      mountFn: "mount",
      config,
      rows: [[{ text: "a" }], [{ text: "b" }]],
      props: { identifier: "fine" },
    });
    await nextTick();
    expect(
      w.findAll("tbody td.vue-quintable-cell").map((td) => td.text()),
    ).toEqual(["b", "a"]);
    w.unmount();
  });
});

describe("expand:row and collapse:row after a sort", () => {
  it("hand out the clicked row and its index, as click:row does", async () => {
    const w = createTable({
      mountFn: "mount",
      config: {
        columns: [
          { headline: "Name", sort: true },
          { headline: "Note", breakpoint: "all" },
        ],
      },
      rows: [
        [{ text: "c" }, { text: "1" }],
        [{ text: "a" }, { text: "2" }],
        [{ text: "b" }, { text: "3" }],
      ],
    });
    await w.find("thead th.sort-header").trigger("click");
    const first = w.find("tbody tr.vue-quintable-row");
    expect(first.find("td.vue-quintable-cell").text()).toBe("a");
    await first.trigger("click");
    const [row, , index] = w.emitted("expand:row")[0];
    expect(row[0].text).toBe("a");
    expect(index).toBe(1);
    expect(w.emitted("click:row")[0][4]).toBe(1);
    await w.find("tbody tr.vue-quintable-row").trigger("click");
    const [closed, , closedIndex] = w.emitted("collapse:row")[0];
    expect(closed[0].text).toBe("a");
    expect(closedIndex).toBe(1);
    w.unmount();
  });
});

describe("select all after a sort", () => {
  it("counts the rows shown that can be selected, so its checkbox stays checked", async () => {
    const w = createTable({
      mountFn: "mount",
      config: {
        columns: [{ headline: "Name", sort: true }],
        select: true,
        selectAll: true,
        pagination: 2,
      },
      rows: [
        { cells: [{ text: "d" }], disableSelect: true },
        { cells: [{ text: "a" }] },
        { cells: [{ text: "b" }] },
        { cells: [{ text: "c" }] },
      ],
    });
    await w.find("thead th.sort-header").trigger("click");
    expect(
      w.findAll("tbody td.vue-quintable-cell").map((td) => td.text()),
    ).toEqual(["a", "b"]);
    await w.find("thead th.select-th input").setValue(true);
    expect(w.vm.allSelectedProperty).toBe(true);
    expect(w.find("thead th.select-th input").element.checked).toBe(true);
    w.unmount();
  });
});

describe("input event (left from 2.x)", () => {
  it("still carries the selected rows, like update:selected-rows", async () => {
    const w = createTable({
      mountFn: "mount",
      config: { columns: [{ headline: "Name" }], select: true },
      rows: [[{ text: "a" }], [{ text: "b" }]],
    });
    await w.find("tbody td.select-td input").setValue(true);
    expect(w.emitted("input").at(-1)[0]).toEqual(
      w.emitted("update:selected-rows").at(-1)[0],
    );
    w.unmount();
  });
});
