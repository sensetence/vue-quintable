// Shared setup for the E2E specs: seeded random data and a local stand-in for the demo's AJAX endpoint.

export const EXAMPLES = [
  "basic-example",
  "computed-rows-example",
  "pagination-example",
  "sort-example",
  "select-example",
  "cell-formatter-example",
  "breakpoints-example",
  "breakpoints-advanced-example",
  "container-fit-example",
  "tooltips-example",
  "ajax-example",
  "ajax-select-example",
  "ajax-loaded-example",
  "ajax-skeleton-example",
  "events-example",
  "slots-example",
  "vue-binded-example",
  "filter-example",
  "component-example",
  "hide-show-example",
  "add-remove-example",
  "nested-example",
  "store-state-example",
  "ajax-store-state-example",
  "large-data-example",
  "custom-sort-example",
  "select-options-example",
  "row-details-example",
  "row-states-example",
  "ajax-error-example",
  "texts-example",
  "search-example",
  "filter-groups-example",
  "slot-controls-example",
  "accessibility-example",
  "column-tools-example",
  "pinned-columns-example",
  "virtual-scroll-example",
  "url-state-example",
];

export const VIEWPORTS = {
  wide: { width: 1280, height: 900 },
  narrow: { width: 480, height: 900 },
};

const NAMES = ["Ada", "Ben", "Cleo", "Dan", "Eve", "Finn", "Gus", "Hana"];
const CITIES = ["Berlin", "Lima", "Oslo", "Rome", "Kyiv", "Quito"];

const SERVER_ROWS = Array.from({ length: 47 }, (_, i) => [
  { text: `${NAMES[i % NAMES.length]} ${i}` },
  { text: `user${i}@example.com` },
  { text: `+49 30 ${1000 + i}` },
  { text: i % 3 ? "Engineer" : "Designer" },
  { text: CITIES[i % CITIES.length] },
  { text: `Street ${i}` },
]);

function serverResponse(request) {
  const url = new URL(request.url());
  if (url.searchParams.get("fetch")) {
    return {
      config: {
        columns: [
          { headline: "Name", sort: true },
          { headline: "Email", breakpoint: "sm" },
          { headline: "City", breakpoint: "md" },
        ],
        pagination: 5,
      },
      rows: SERVER_ROWS.map((r) => [r[0], r[1], r[4]]),
    };
  }
  let params = Object.fromEntries(url.searchParams);
  if (request.method() === "POST") {
    params = request.postDataJSON() || {};
  }
  const search = (params.search || "").toLowerCase();
  let rows = SERVER_ROWS.filter(
    (r) => !search || r.some((c) => c.text.toLowerCase().includes(search)),
  );
  const sort = params.sort && params.sort.indexes;
  if (sort && Object.keys(sort).length) {
    const [index, { asc }] = Object.entries(sort)[0];
    rows = rows
      .slice()
      .sort(
        (a, b) => a[index].text.localeCompare(b[index].text) * (asc ? 1 : -1),
      );
  }
  const perPage = parseInt(params.perPage) || rows.length;
  const page = parseInt(params.page) || 1;
  return {
    rows: rows.slice((page - 1) * perPage, page * perPage),
    all: rows.length,
  };
}

/** Seeds Math.random (Chance seeds itself from it), answers the AJAX endpoint and records dialogs. */
export async function prepare(page) {
  await page.addInitScript(() => {
    let s = 42;
    Math.random = function () {
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    // Intervals run only when a spec calls tickIntervals(), not by the clock.
    window.__intervals = [];
    window.setInterval = (fn) => window.__intervals.push(fn);
  });
  await page.route("**/vue-quintable-demo/data.php**", (route) =>
    route.fulfill({ json: serverResponse(route.request()) }),
  );
  // the ajax error example's unreachable server
  await page.route("**/quintable-demo.invalid/**", (route) =>
    route.abort("namenotresolved"),
  );
  const dialogs = [];
  page.on("dialog", (dialog) => {
    dialogs.push(dialog.message());
    dialog.accept();
  });
  return dialogs;
}

/** Runs every callback registered with setInterval once. Returns false if there are none. */
export function tickIntervals(page) {
  return page.evaluate(() => {
    window.__intervals.forEach((fn) => fn());
    return window.__intervals.length > 0;
  });
}

/** Waits until Vue, the ResizeObserver and the AJAX mock have settled. */
export async function settle(page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setTimeout(resolve, 50)),
        ),
      ),
  );
  await page.waitForTimeout(350);
}
