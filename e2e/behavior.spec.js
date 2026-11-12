import { test, expect } from "@playwright/test";
import {
  EXAMPLES,
  VIEWPORTS,
  prepare,
  settle,
  tickIntervals,
} from "./fixtures.js";

// Drives every demo example through the same clicks and records the example's DOM after each one, plus the
// alerts it raised. A refactoring of the table must leave every snapshot unchanged.

function normalize(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "") // Vue's placeholder comments differ between template shapes, not in output
    .replace(/qt-\d+-\d+/g, "qt") // per-instance uuid with a timestamp
    .replace(/data-v-[0-9a-f]+/g, "data-v")
    .replace(/popper_[a-z0-9_]+/gi, "popper")
    .replace(/(class="render-time[^"]*"[^>]*>)[^<]*/g, "$1") // a measured time
    .replace(/\s+/g, " ")
    .replace(/></g, ">\n<");
}

for (const [viewport, size] of Object.entries(VIEWPORTS)) {
  for (const example of EXAMPLES) {
    test(`behavior: ${example} (${viewport})`, async ({ page }) => {
      await page.setViewportSize(size);
      const dialogs = await prepare(page);
      await page.goto(`/?example=${example}`);
      await page.waitForSelector(".example-content .quintable");
      const content = page.locator(".example-content");
      const table = content.locator(".quintable").first();
      const steps = [];

      const record = async (label) => {
        await settle(page);
        steps.push(
          `### ${label} | dialogs: ${JSON.stringify(dialogs.splice(0))}\n` +
            normalize(await content.innerHTML()),
        );
      };
      const ifPresent = async (locator, action) => {
        if (await locator.count()) {
          await action(locator.first());
          return true;
        }
        return false;
      };

      await record("initial");

      if (await tickIntervals(page)) {
        await record("tick intervals");
        await tickIntervals(page);
        await record("tick intervals again");
      }

      const sortHeader = table.locator("thead th.sort-header");
      if (await ifPresent(sortHeader, (l) => l.click())) {
        await record("sort first sortable column");
        await sortHeader.first().click();
        await record("sort it the other way");
        if (await sortHeader.nth(1).count()) {
          await sortHeader.nth(1).click();
          await record("sort the second sortable column");
        }
      }

      const nextPage = table.locator(".pagination .page-item", {
        hasText: /^\s*2\s*$/,
      });
      if (await ifPresent(nextPage, (l) => l.click())) {
        await record("go to page 2");
        await table.locator(".pagination .page-item").last().click();
        await record("go to the last page");
      }

      const search = table.locator(
        ".quintable--search-container input[type=search]",
      );
      // The pointer goes to the search field first: left over the table, the row under it would depend on how the
      // page scrolls while the rows change.
      const typeInSearch = async (l) => {
        await l.hover();
        await l.fill("e");
      };
      if (await ifPresent(search, typeInSearch)) {
        await record("search 'e'");
        await search.first().fill("");
        await record("clear the search");
      }

      if (
        await ifPresent(table.locator("thead th.select-th input"), (l) =>
          l.click({ force: true }),
        )
      ) {
        await record("select all");
      }
      if (
        await ifPresent(table.locator("tbody td.select-td input"), (l) =>
          l.click({ force: true }),
        )
      ) {
        await record("toggle the first row's checkbox");
      }

      const firstRow = table.locator("tbody tr.vue-quintable-row");
      if (
        await ifPresent(firstRow, (l) =>
          l.locator("td.vue-quintable-cell").first().click(),
        )
      ) {
        await record("click the first row");
        await firstRow.first().locator("td.vue-quintable-cell").first().click();
        await record("click the first row again");
        if (await firstRow.nth(1).count()) {
          await firstRow.nth(1).hover();
          await record("hover the second row");
        }
      }

      expect(steps.join("\n\n")).toMatchSnapshot(`${example}-${viewport}.txt`);
    });
  }
}
