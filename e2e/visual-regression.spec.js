import { test, expect } from "@playwright/test";

// All examples registered in App.vue with their v-select labels
const examples = [
  { value: "BasicExample", label: "Basic Example" },
  { value: "ComputedRowsExample", label: "Computed Rows Example" },
  { value: "PaginationExample", label: "Pagination Example" },
  { value: "SortExample", label: "Sort Example" },
  { value: "SelectExample", label: "Select Example" },
  { value: "CellFormattersExample", label: "Cell Formatters Example" },
  { value: "BreakpointsExample", label: "Breakpoints Example" },
  { value: "BreakpointsAdvancedExample", label: "Breakpoints Advanced Example" },
  { value: "TooltipsExample", label: "Tooltips" },
  { value: "EventsExample", label: "Events Example" },
  { value: "SlotsExample", label: "Slots Example" },
  { value: "BindedExample", label: "Vue-binded Example" },
  { value: "FiltersExample", label: "Filter Example" },
  { value: "ComponentsExample", label: "Component Example" },
  { value: "HiddenExample", label: "Hide/Show Example" },
  { value: "AddRemoveExample", label: "Add/Remove/Move Example" },
  { value: "NestedExample", label: "Nested Example" },
  { value: "StoreStateExample", label: "Store State" },
];

// Ajax examples are excluded because they depend on external HTTP requests
// that may fail or return different data, causing flaky screenshots.

async function selectExample(page, label) {
  // Click v-select to open the dropdown
  const vSelect = page.locator(".v-select");
  await vSelect.click();

  // Type to filter and select
  const input = vSelect.locator("input[type='search']");
  await input.fill(label);

  // Click the matching option
  const option = page.locator(".vs__dropdown-menu .vs__dropdown-option", {
    hasText: label,
  });
  await option.first().click();

  // Wait for the component to render
  await page.waitForTimeout(500);
}

for (const example of examples) {
  test(`visual regression: ${example.label}`, async ({ page }) => {
    // Make Chance() deterministic so screenshots are stable across runs.
    // Chance's Mersenne Twister uses Math.random() when no seed is given.
    await page.addInitScript(() => {
      let state = 42;
      Math.random = function() {
        state = (state * 1103515245 + 12345) & 0x7fffffff;
        return state / 0x7fffffff;
      };
    });

    await page.goto("/");

    // Wait for the app to fully load
    await page.waitForSelector(".example-content", { state: "visible" });

    // BasicExample is the default, no need to select it
    if (example.value !== "BasicExample") {
      await selectExample(page, example.label);
    }

    // Wait for tables to render
    await page.waitForTimeout(300);

    // Screenshot the example content area (not the full page to avoid header noise)
    const content = page.locator(".example-content");
    await expect(content).toHaveScreenshot(
      `${example.value}.png`,
      {
        animations: "disabled",
        mask: [
          // Mask any loading spinners
          page.locator(".ajax-loader"),
        ],
      }
    );
  });
}
