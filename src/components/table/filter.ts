// Filters: which rows pass the table's filter values, by group and relation.

type Dict = Record<string, any>;
type Compare = (filterValue: any, rowValue: any) => boolean;

export const operatorFunctions: Readonly<Record<string, Compare>> =
  Object.freeze({
    equal: (a, b) => b === a,
    greater: (a, b) => b > a,
    less: (a, b) => b < a,
    greaterEqual: (a, b) => b >= a,
    lessEqual: (a, b) => b <= a,
    contains: (a, b) => {
      if (!Array.isArray(b) && typeof b !== "string") return false;
      return b.indexOf(a) !== -1;
    },
    notContains: (a, b) => {
      if (!Array.isArray(b) && typeof b !== "string") return false;
      return b.indexOf(a) === -1;
    },
    startsWith: (a, b) => {
      if (typeof b !== "string") return false;
      return b.indexOf(a) === 0;
    },
    endsWith: (a, b) => {
      if (typeof b !== "string") return false;
      return b.indexOf(a, b.length - a.length) !== -1;
    },
    matches(regex, b) {
      if (!(regex instanceof RegExp) || typeof b !== "string") return false;
      return regex.test(b);
    },
  });

export interface FilterContext {
  groups: Dict[]; // the filterGroups prop
  operators: Record<string, Compare>;
  operatorNames: string[];
  defaultOperator: string;
  debug: boolean;
}

/** The values a filter compares with: a single value, an array, or an object's `values`. */
export function getFilterValues(values: any): any[] {
  return values instanceof RegExp ||
    typeof values !== "object" ||
    values === null
    ? [values]
    : Array.isArray(values)
      ? values
      : getFilterValues(values.values);
}

/** Whether a filter key occurs in a (nested) list of filter group items. */
export function findInFilterGroups(key: string, arr: any, index = 0): boolean {
  if (!arr) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.items && findInFilterGroups(key, item.items, index + 1)) {
      return true;
    }
    if (item.name === key) {
      return true;
    }
  }
  return false;
}

// The compare function and values of one filter item, or null if the filter is not set.
function filterOf(filters: Dict, name: string, ctx: FilterContext) {
  const filter = filters[name];
  if (typeof filter === "undefined") {
    return null;
  }
  const operator =
    typeof filter === "object" &&
    filter !== null &&
    filter.operator &&
    ctx.operatorNames.includes(filter.operator)
      ? filter.operator
      : ctx.defaultOperator;
  return {
    values: getFilterValues(filter),
    // No null check, as before: a filter set to null throws here.
    compare:
      typeof filter.compare === "function"
        ? (filter.compare as Compare)
        : ctx.operators[operator],
  };
}

function logGroup(group: Dict, depth: number) {
  const spaces = "   ".repeat(depth + 1);
  if (group.items) {
    const names = group.items
      .slice()
      .sort((a: Dict, b: Dict) =>
        a.name === undefined ? 1 : b.name === undefined ? -1 : 0,
      );
    let str = spaces;
    for (let i = 0; i < names.length; i++) {
      if (names[i].name) {
        str += names[i].name;
        if (i < names.length - 1) {
          str += " " + group.relation + " ";
        }
      }
    }
    console.log(str);
  }
  console.log(spaces, "GROUP:", group);
}

/**
 * Whether a row's filter values pass one group. A group is only checked if at least one set filter takes part in
 * the table's filter groups (or there are none); otherwise the row does not pass.
 */
export function matchesGroup(
  filters: Dict,
  rowValues: Dict,
  group: Dict,
  ctx: FilterContext,
  depth = 0,
): boolean {
  if (ctx.debug) {
    logGroup(group, depth);
  }

  const isAnd = group.relation === "AND";
  if (!isAnd && group.relation !== "OR" && !group.items) {
    return true;
  }

  let active = false;
  for (const key in filters) {
    if (
      Object.prototype.hasOwnProperty.call(filters, key) &&
      (!ctx.groups.length || findInFilterGroups(key, ctx.groups))
    ) {
      active = true;
      break;
    }
  }
  if (!active) {
    return false;
  }

  if (isAnd) {
    // An empty AND group passes nothing, and every item's filter key must be among the row's values.
    if (!group.items.length) {
      return false;
    }
    for (const item of group.items) {
      if (item.name && rowValues[item.name] === undefined) {
        return false;
      }
    }
    for (const item of group.items) {
      if (
        item.items &&
        !matchesGroup(filters, rowValues, item, ctx, depth + 1)
      ) {
        return false;
      }
      const filter = filterOf(filters, item.name, ctx);
      if (
        filter &&
        !filter.values.every((value) =>
          filter.compare(value, rowValues[item.name]),
        )
      ) {
        return false;
      }
    }
    return true;
  }

  for (const item of group.items) {
    if (item.items && matchesGroup(filters, rowValues, item, ctx, depth + 1)) {
      return true;
    }
    const filter = filterOf(filters, item.name, ctx);
    if (
      filter &&
      filter.values.some((value) => filter.compare(value, rowValues[item.name]))
    ) {
      return true;
    }
  }
  return false;
}

/** Whether a row's filter values pass all (AND) or any (OR) of the table's filter groups. */
export function matchesGroups(
  filters: Dict,
  rowValues: Dict,
  relation: string,
  ctx: FilterContext,
): boolean {
  const results = ctx.groups.map((group, i) => {
    const result = matchesGroup(filters, rowValues, group, ctx);
    if (ctx.debug && i < ctx.groups.length - 1) {
      console.log(relation);
    }
    return result;
  });
  if (ctx.debug) {
    console.log("RESULTS FOR GROUPS:", results, relation);
  }
  if (relation === "AND") {
    return !results.includes(false);
  }
  if (relation === "OR") {
    return results.includes(true);
  }
  return true;
}
