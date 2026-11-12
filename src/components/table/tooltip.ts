import type { Directive, DirectiveBinding, ObjectDirective, VNode } from "vue";

// The table's v-tooltip: hands each cell's and row's tooltip to the app's `tooltip` directive (floating-vue's, as the
// plugin registers it), but only for elements that have or had a tooltip, and only when it changed. Called on every
// patch of every cell, floating-vue's own hooks cost about a quarter of each re-render even without a tooltip.
// Passes on every hook but `beforeUpdate`: Vue calls each hook it finds here for every cell on every render, and
// tooltip directives (floating-vue, PrimeVue, function directives) do their work in `updated`.

type Hook = keyof ObjectDirective;
type TooltipElement = HTMLElement & { _quintableTooltip?: boolean };

function call(
  hook: Hook,
  el: TooltipElement,
  binding: DirectiveBinding,
  vnode: VNode,
  prev: VNode | null,
) {
  let dir: Directive | undefined =
    binding.instance?.$.appContext.directives.tooltip;
  if (typeof dir === "function") {
    dir = { mounted: dir, updated: dir };
  }
  const fn = dir?.[hook] as ((...args: unknown[]) => void) | undefined;
  if (fn) {
    fn(el, binding, vnode, prev);
  }
}

// Whether a tooltip is unchanged. Only the new value's keys count: floating-vue adds its own to the old one.
function same(a: any, b: any) {
  if (a === b) {
    return true;
  }
  if (!a || !b || typeof a !== "object" || typeof b !== "object") {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

const hasTooltip = (binding: DirectiveBinding) =>
  !!(binding.value && binding.value.content);

function mountHook(hook: Hook) {
  return (el: TooltipElement, binding: DirectiveBinding, vnode: VNode) => {
    if (hasTooltip(binding)) {
      el._quintableTooltip = true;
      call(hook, el, binding, vnode, null);
    }
  };
}

function unmountHook(hook: Hook) {
  return (el: TooltipElement, binding: DirectiveBinding, vnode: VNode) => {
    if (el._quintableTooltip) {
      call(hook, el, binding, vnode, null);
    }
  };
}

export const vTooltip: ObjectDirective = {
  created: mountHook("created"),
  beforeMount: mountHook("beforeMount"),
  mounted: mountHook("mounted"),
  updated(el: TooltipElement, binding, vnode, prev) {
    if (el._quintableTooltip) {
      if (!same(binding.value, binding.oldValue)) {
        call("updated", el, binding, vnode, prev);
      }
    } else if (hasTooltip(binding)) {
      // A first tooltip on an element mounted without one.
      el._quintableTooltip = true;
      call("created", el, binding, vnode, null);
      call("beforeMount", el, binding, vnode, null);
      call("mounted", el, binding, vnode, null);
    }
  },
  beforeUnmount: unmountHook("beforeUnmount"),
  unmounted: unmountHook("unmounted"),
};
