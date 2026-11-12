import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick, reactive } from "vue";
import VueQuintable from "../src/components/table/vue-quintable.vue";

// The table hands tooltips to the app's `tooltip` directive only for elements that have or had one, and only when
// they change.
function spyDirective() {
  const calls = [];
  const hook = (name) => (el, binding) => {
    calls.push(`${name} ${el.tagName} ${binding.value.content}`);
    // Like floating-vue, which adds its own keys to the value it gets.
    binding.value.targetNodes = () => [el];
  };
  return {
    calls,
    directive: {
      beforeMount: hook("beforeMount"),
      updated: hook("updated"),
      beforeUnmount: hook("beforeUnmount"),
    },
  };
}

describe("tooltips", () => {
  it("reach the app's directive only for elements with a tooltip, and only on change", async () => {
    const { calls, directive } = spyDirective();
    const rows = reactive([
      [{ text: "a", tooltip: "tip a" }, { text: "b" }],
      [{ text: "c" }, { text: "d" }],
    ]);
    const w = mount(VueQuintable, {
      props: {
        config: { columns: [{ headline: "A" }, { headline: "B" }] },
        rows,
      },
      global: { directives: { tooltip: directive } },
    });
    expect(calls).toEqual(["beforeMount TD tip a"]);

    // A re-render that changes no tooltip calls nothing.
    calls.length = 0;
    w.vm.selected[1] = true;
    w.vm.hoveredRow = 1;
    await nextTick();
    expect(calls).toEqual([]);

    // A changed tooltip is updated; a new one is mounted.
    rows[0][0].tooltip = "tip a2";
    rows[1][1].tooltip = "tip d";
    await nextTick();
    expect(calls.sort()).toEqual(["beforeMount TD tip d", "updated TD tip a2"]);

    // A removed tooltip is updated once (the directive removes it), then left alone.
    calls.length = 0;
    rows[0][0].tooltip = undefined;
    await nextTick();
    rows[1][0].text = "c2";
    await nextTick();
    expect(calls).toEqual(["updated TD undefined"]);

    calls.length = 0;
    w.unmount();
    expect(calls.sort()).toEqual([
      "beforeUnmount TD tip d",
      "beforeUnmount TD undefined",
    ]);
  });
});
