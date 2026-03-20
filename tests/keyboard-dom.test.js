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
