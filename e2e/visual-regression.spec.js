import { test, expect } from "@playwright/test";
import { EXAMPLES, VIEWPORTS, prepare, settle } from "./fixtures.js";

// Screenshot of every demo example, wide and narrow. AJAX examples get their rows from the local stand-in
// for the demo server (fixtures.js), so they render the same each run.

for (const [viewport, size] of Object.entries(VIEWPORTS)) {
  for (const example of EXAMPLES) {
    test(`visual regression: ${example} (${viewport})`, async ({ page }) => {
      await page.setViewportSize(size);
      await prepare(page);
      await page.goto(`/?example=${example}`);
      await page.waitForSelector(".example-content .quintable");
      await settle(page);

      await expect(page.locator(".example-content")).toHaveScreenshot(
        `${example}-${viewport}.png`,
        { animations: "disabled" },
      );
    });
  }
}
