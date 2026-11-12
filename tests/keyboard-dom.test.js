import { describe, it, expect, vi } from "vitest";
import { createTable, generateRows } from "./helpers";

describe("Keyboard navigation (checkKey)", () => {
  it("does nothing when activeRow is null", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
    });
    const event = { keyCode: 40, preventDefault: vi.fn() };
    w.vm.activeRow = null;
    w.vm.checkKey(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
    w.unmount();
  });

  it("arrow down moves to next row", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
      rows: generateRows(3),
    });
    w.vm.activeRow = 0;
    w.vm.checkKey({ keyCode: 40, preventDefault: vi.fn() });
    expect(w.vm.activeRow).toBe(1);
    w.unmount();
  });

  it("arrow down wraps around at last row", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
      rows: generateRows(3),
    });
    w.vm.activeRow = 2;
    w.vm.checkKey({ keyCode: 40, preventDefault: vi.fn() });
    expect(w.vm.activeRow).toBe(0);
    w.unmount();
  });

  it("arrow up moves to previous row", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
      rows: generateRows(3),
    });
    w.vm.activeRow = 1;
    w.vm.checkKey({ keyCode: 38, preventDefault: vi.fn() });
    expect(w.vm.activeRow).toBe(0);
    w.unmount();
  });

  it("arrow up wraps around at first row", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
      rows: generateRows(3),
    });
    w.vm.activeRow = 0;
    w.vm.checkKey({ keyCode: 38, preventDefault: vi.fn() });
    expect(w.vm.activeRow).toBe(2);
    w.unmount();
  });

  it("non-arrow key does nothing", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
      rows: generateRows(3),
    });
    w.vm.activeRow = 1;
    w.vm.checkKey({ keyCode: 13, preventDefault: vi.fn() });
    expect(w.vm.activeRow).toBe(1);
    w.unmount();
  });
});

describe("DOM event handlers", () => {
  it("_hoverRow sets hoveredRow", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm._hoverRow(1, { currentTarget: document.createElement("tr") });
    expect(w.vm.hoveredRow).toBe(1);
    w.unmount();
  });

  it("_hoverRow does not re-set same index", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm.hoveredRow = 1;
    w.vm._hoverRow(1, { currentTarget: document.createElement("tr") });
    expect(w.vm.hoveredRow).toBe(1);
    w.unmount();
  });

  it("hovers a row and its details together, whichever the mouse is on", async () => {
    const w = createTable({
      mountFn: "mount",
      config: {
        columns: [{ headline: "A" }, { headline: "B", breakpoint: "all" }],
        expandedAll: true,
      },
      rows: [
        [{ text: "a" }, { text: "1" }],
        [{ text: "b" }, { text: "2" }],
      ],
    });
    await w.vm.$nextTick();
    const rows = w.findAll("tr.vue-quintable-row");
    const details = w.findAll("tr.generated-row");
    const hovered = () =>
      [rows[0], details[0], rows[1], details[1]].map((r) =>
        r.classes().includes("bg-muted"),
      );

    await rows[0].trigger("mouseenter");
    expect(hovered()).toEqual([true, true, false, false]);
    await details[0].trigger("mouseenter");
    expect(hovered()).toEqual([true, true, false, false]);
    await details[1].trigger("mouseenter");
    expect(hovered()).toEqual([false, false, true, true]);
    await w.find("tbody").trigger("mouseleave");
    expect(hovered()).toEqual([false, false, false, false]);
    w.unmount();
  });

  it("marks the active row and its details, and moves the mark with the arrow keys", async () => {
    const mountActive = (activeClass) =>
      createTable({
        mountFn: "mount",
        config: {
          // A sticky column: details that are always there (a click on the row does not collapse them).
          columns: [{ headline: "A" }, { headline: "B", sticky: true }],
          enableRowTabIndex: true,
          ...(activeClass === undefined ? {} : { activeClass }),
        },
        rows: [
          [{ text: "a" }, { text: "1" }],
          [{ text: "b" }, { text: "2" }],
        ],
      });
    const marks = (w) =>
      w.findAll("table.vue-quintable > tbody > tr").map((tr) =>
        tr
          .classes()
          .filter((c) =>
            ["bg-muted", "row-active", "parent-row-active"].includes(c),
          )
          .join(" "),
      );

    const w = mountActive();
    await w.vm.$nextTick();
    await w.find("tr.vue-quintable-row td.vue-quintable-cell").trigger("click");
    expect(marks(w)).toEqual([
      "bg-muted row-active",
      "bg-muted parent-row-active",
      "",
      "",
    ]);
    document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 40 }));
    await w.vm.$nextTick();
    expect(marks(w)).toEqual([
      "",
      "",
      "bg-muted row-active",
      "bg-muted parent-row-active",
    ]);
    w.unmount();

    const off = mountActive(false);
    await off.vm.$nextTick();
    await off
      .find("tr.vue-quintable-row td.vue-quintable-cell")
      .trigger("click");
    expect(off.vm.activeRow).toBe(0);
    expect(marks(off)).toEqual(["", "", "", ""]);
    off.unmount();
  });

  it("paints class settings with several classes, a custom active class without the built-in look, and keeps a row's own classes", async () => {
    const w = createTable({
      mountFn: "mount",
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
        activeClass: "foo bar",
        hoverClass: "hov x",
      },
      rows: [
        { cells: [{ text: "a" }, { text: "1" }], classes: "x" },
        { cells: [{ text: "b" }, { text: "2" }] },
        { cells: [{ text: "c" }, { text: "3" }] },
      ],
    });
    await w.vm.$nextTick();
    const trs = w.findAll("table.vue-quintable > tbody > tr");
    await trs[1].find("td.vue-quintable-cell").trigger("click");
    for (const i of [0, 2, 0, 1]) {
      await trs[i].trigger("mouseenter");
    }
    const mine = (tr) =>
      tr
        .classes()
        .filter((c) => ["x", "hov", "foo", "bar", "row-active"].includes(c))
        .sort()
        .join(" ");
    expect(trs.map(mine)).toEqual(["x", "bar foo hov x", ""]);
    w.unmount();
  });

  it("onMouseleaveTable resets hoveredRow", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm.hoveredRow = 2;
    w.vm.onMouseleaveTable();
    expect(w.vm.hoveredRow).toBeNull();
    w.unmount();
  });

  it("onCellClick emits click:cell", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const cell = { text: "test" };
    const event = { target: document.createElement("td") };
    w.vm.onCellClick(event, cell);
    expect(w.emitted()["click:cell"]).toBeTruthy();
    expect(w.emitted()["click:cell"][0][0]).toBe(cell);
    w.unmount();
  });

  it("onCellAuxClick emits auxclick:cell on middle button", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const cell = { text: "test" };
    const event = { button: 1, target: document.createElement("td") };
    w.vm.onCellAuxClick(event, cell);
    expect(w.emitted()["auxclick:cell"]).toBeTruthy();
    w.unmount();
  });

  it("onCellAuxClick ignores non-middle button", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const cell = { text: "test" };
    const event = { button: 0, target: document.createElement("td") };
    w.vm.onCellAuxClick(event, cell);
    expect(w.emitted()["auxclick:cell"]).toBeFalsy();
    w.unmount();
  });

  it("onRowAuxClick emits auxclick:row on middle button", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const event = { button: 1, target: document.createElement("tr") };
    w.vm.onRowAuxClick(event, 0);
    expect(w.emitted()["auxclick:row"]).toBeTruthy();
    w.unmount();
  });

  it("onRowAuxClick ignores non-middle button", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const event = { button: 0, target: document.createElement("tr") };
    w.vm.onRowAuxClick(event, 0);
    expect(w.emitted()["auxclick:row"]).toBeFalsy();
    w.unmount();
  });

  it("onRowMousedown prevents default on middle click", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const event = { which: 2, preventDefault: vi.fn() };
    w.vm.onRowMousedown(event);
    expect(event.preventDefault).toHaveBeenCalled();
    w.unmount();
  });

  it("onRowMousedown does nothing on left click", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const event = { which: 1, preventDefault: vi.fn() };
    w.vm.onRowMousedown(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
    w.unmount();
  });

  it("onCellMousedown prevents default on middle click", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const event = { which: 2, preventDefault: vi.fn() };
    w.vm.onCellMousedown(event);
    expect(event.preventDefault).toHaveBeenCalled();
    w.unmount();
  });

  it("onRowClick emits click:row", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const target = document.createElement("td");
    const event = { target, preventDefault: vi.fn() };
    w.vm.onRowClick(event, 0);
    expect(w.emitted()["click:row"]).toBeTruthy();
    w.unmount();
  });

  it("onRowClick skips checkbox targets", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const target = document.createElement("input");
    target.type = "checkbox";
    const event = { target, preventDefault: vi.fn() };
    w.vm.onRowClick(event, 0);
    expect(w.emitted()["click:row"]).toBeFalsy();
    w.unmount();
  });

  it("onRowClick with enableRowTabIndex toggles activeRow", () => {
    const w = createTable({
      config: {
        columns: [{ headline: "A" }, { headline: "B" }],
        enableRowTabIndex: true,
      },
    });
    const target = document.createElement("td");
    w.vm.onRowClick({ target }, 1);
    expect(w.vm.activeRow).toBe(1);
    w.vm.onRowClick({ target }, 1);
    expect(w.vm.activeRow).toBeNull();
    w.unmount();
  });

  it("_onBreakpointChange updates hiddenBreakpoints", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm._onBreakpointChange(["xs", "sm"]);
    expect(w.vm.hiddenBreakpoints).toEqual(["xs", "sm"]);
    w.unmount();
  });

  it("generateHiddenBreakpoints regenerate clears list first", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm.hiddenBreakpoints = ["old"];
    w.vm.generateHiddenBreakpoints(true);
    expect(w.vm.hiddenBreakpoints).not.toContain("old");
    w.unmount();
  });
});
