/**
 * Shared breakpoint detector — one singleton serves all VueQuintable instances.
 * Uses matchMedia instead of hidden DOM probe elements.
 * Bootstrap 5 breakpoints: sm≥576, md≥768, lg≥992, xl≥1200, xxl≥1400.
 */

const BP_QUERIES = {
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1400px)",
};

const _hasMatchMedia =
  typeof window !== "undefined" && typeof window.matchMedia === "function";

let instance = null;

class SharedBreakpoints {
  constructor() {
    this._subscribers = new Set();
    this._mqls = {};
    this.hiddenBreakpoints = [];
    this._onChange = this._onChange.bind(this);
    this._compute();
    if (_hasMatchMedia) {
      for (const bp in BP_QUERIES) {
        const mql = window.matchMedia(BP_QUERIES[bp]);
        this._mqls[bp] = mql;
        // Use addEventListener where available (modern), fallback to addListener
        if (mql.addEventListener) {
          mql.addEventListener("change", this._onChange);
        } else {
          mql.addListener(this._onChange);
        }
      }
    }
  }

  _onChange() {
    this._compute();
  }

  _compute() {
    const hidden = [];
    if (_hasMatchMedia) {
      for (const bp in BP_QUERIES) {
        if (!window.matchMedia(BP_QUERIES[bp]).matches) {
          hidden.push(bp);
        }
      }
    }
    hidden.push("all");
    this.hiddenBreakpoints = hidden;
    this._subscribers.forEach((cb) => cb(hidden));
  }

  subscribe(cb) {
    this._subscribers.add(cb);
    // Immediately deliver current state
    cb(this.hiddenBreakpoints);
  }

  unsubscribe(cb) {
    this._subscribers.delete(cb);
    if (this._subscribers.size === 0) {
      this._destroy();
      instance = null;
    }
  }

  _destroy() {
    for (const bp in this._mqls) {
      const mql = this._mqls[bp];
      if (mql.removeEventListener) {
        mql.removeEventListener("change", this._onChange);
      } else {
        mql.removeListener(this._onChange);
      }
    }
    this._mqls = {};
    this._subscribers.clear();
  }
}

export function getSharedBreakpoints() {
  if (!instance) {
    instance = new SharedBreakpoints();
  }
  return instance;
}
