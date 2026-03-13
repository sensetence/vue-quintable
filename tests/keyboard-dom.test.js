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
    w.destroy();
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
    w.destroy();
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
    w.destroy();
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
    w.destroy();
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
    w.destroy();
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
    w.destroy();
  });
});

describe("DOM event handlers", () => {
  it("onMouseenterRow sets hoveredRow", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm.onMouseenterRow(1);
    expect(w.vm.hoveredRow).toBe(1);
    w.destroy();
  });

  it("onMouseenterRow does not re-set same index", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm.hoveredRow = 1;
    w.vm.onMouseenterRow(1);
    expect(w.vm.hoveredRow).toBe(1);
    w.destroy();
  });

  it("onMouseleaveTable resets hoveredRow", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm.hoveredRow = 2;
    w.vm.onMouseleaveTable();
    expect(w.vm.hoveredRow).toBeNull();
    w.destroy();
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
    w.destroy();
  });

  it("onCellAuxClick emits auxclick:cell on middle button", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const cell = { text: "test" };
    const event = { button: 1, target: document.createElement("td") };
    w.vm.onCellAuxClick(event, cell);
    expect(w.emitted()["auxclick:cell"]).toBeTruthy();
    w.destroy();
  });

  it("onCellAuxClick ignores non-middle button", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const cell = { text: "test" };
    const event = { button: 0, target: document.createElement("td") };
    w.vm.onCellAuxClick(event, cell);
    expect(w.emitted()["auxclick:cell"]).toBeFalsy();
    w.destroy();
  });

  it("onRowAuxClick emits auxclick:row on middle button", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const event = { button: 1, target: document.createElement("tr") };
    w.vm.onRowAuxClick(event, 0);
    expect(w.emitted()["auxclick:row"]).toBeTruthy();
    w.destroy();
  });

  it("onRowAuxClick ignores non-middle button", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const event = { button: 0, target: document.createElement("tr") };
    w.vm.onRowAuxClick(event, 0);
    expect(w.emitted()["auxclick:row"]).toBeFalsy();
    w.destroy();
  });

  it("onRowMousedown prevents default on middle click", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const event = { which: 2, preventDefault: vi.fn() };
    w.vm.onRowMousedown(event);
    expect(event.preventDefault).toHaveBeenCalled();
    w.destroy();
  });

  it("onRowMousedown does nothing on left click", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const event = { which: 1, preventDefault: vi.fn() };
    w.vm.onRowMousedown(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
    w.destroy();
  });

  it("onCellMousedown prevents default on middle click", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const event = { which: 2, preventDefault: vi.fn() };
    w.vm.onCellMousedown(event);
    expect(event.preventDefault).toHaveBeenCalled();
    w.destroy();
  });

  it("onRowClick emits click:row", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const target = document.createElement("td");
    const event = { target, preventDefault: vi.fn() };
    w.vm.onRowClick(event, 0);
    expect(w.emitted()["click:row"]).toBeTruthy();
    w.destroy();
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
    w.destroy();
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
    w.destroy();
  });

  it("elementVisible returns false for null", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    expect(w.vm.elementVisible(null)).toBe(false);
    w.destroy();
  });

  it("elementVisible returns true for visible element", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const el = document.createElement("div");
    document.body.appendChild(el);
    expect(w.vm.elementVisible(el)).toBe(true);
    document.body.removeChild(el);
    w.destroy();
  });

  it("elementVisible returns false for display:none element", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const el = document.createElement("div");
    el.style.display = "none";
    document.body.appendChild(el);
    expect(w.vm.elementVisible(el)).toBe(false);
    document.body.removeChild(el);
    w.destroy();
  });

  it("breakpointListener triggers generateHiddenBreakpoints with delay", () => {
    vi.useFakeTimers();
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    const spy = vi.spyOn(w.vm, "generateHiddenBreakpoints");
    w.vm.breakpointListener();
    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalled();
    vi.useRealTimers();
    w.destroy();
  });

  it("generateHiddenBreakpoints regenerate clears list first", () => {
    const w = createTable({
      config: { columns: [{ headline: "A" }, { headline: "B" }] },
    });
    w.vm.hiddenBreakpoints = ["old"];
    w.vm.generateHiddenBreakpoints(true);
    expect(w.vm.hiddenBreakpoints).not.toContain("old");
    w.destroy();
  });
});
