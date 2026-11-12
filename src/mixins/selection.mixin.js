// Selecting rows with the checkboxes.
// Part of VueQuintable (src/components/table/vue-quintable.vue), as src/mixins/selection.mixin.js is in v2. Its
// watchers stay in the component: the order watchers are created in decides the order of the events they emit.

import { toRaw } from "vue";
import { setIfChanged } from "../components/table/helpers";

export default {
  computed: {
    /**
     * Calculates the all selected flag. Special case: defaultSelected is set and no user action in place
     *
     */
    allSelectedProperty: {
      get() {
        if (this.allSelectedCustom === null) {
          return this.configFinal.defaultSelected;
        }
        return this.allSelectedCustom;
      },
      set(val) {
        this.allSelectedCustom = val;
      },
    },

    /**
     * Checks if some rows are selected
     *
     */
    someSelected() {
      return Object.values(this.selected).some((x) => x);
    },
  },
  methods: {
    // The rows a select-all covers that can be selected: the visible ones, or all rows with selectAllRows.
    _selectableCount() {
      // The table's own sortedIndexes read raw (see setIfChanged); the rows through the proxy, which unwraps refs in them.
      const rows = this.rowsFinal;
      if (this.configFinal.selectAllRows) {
        return rows.filter((x) => !x.disableSelect).length;
      }
      // visibleRows read once, at the first selectable row (as before), not once per row.
      const sortedIndexes = toRaw(this.sortedIndexes);
      let visible;
      return rows.filter(
        (x, index) =>
          !x.disableSelect &&
          (visible || (visible = this.visibleRows))[sortedIndexes[index]],
      ).length;
    },

    /**
     * Select all relevant rows
     *
     */
    checkAll(force = false) {
      const value = force ? true : this.allSelectedProperty;
      const scope = this.configFinal.selectAllRows
        ? this.filteredRows
        : this.visibleRows;

      let counter = 0;
      const selected = this.selected;
      const sortedIndexes = toRaw(this.sortedIndexes);
      const rowsFinal = this.rowsFinal;
      for (const position in sortedIndexes) {
        const index = sortedIndexes[position];
        if (!rowsFinal[index].disableSelect && scope[index]) {
          setIfChanged(selected, index, value);
          counter++;
        } else {
          // A row outside the selection scope (another page, filtered out, disableSelect) is deselected, as in 2.x.
          setIfChanged(selected, index, false);
        }
      }

      if (value) {
        this.allSelectedCustom = counter && counter === this._selectableCount();
      }
    },

    /**
     * Event listener for select row checkboxes. Checks if all rows are selected now and sets the allSelectedProperty in case
     *
     * @param bool selected or not
     * @param index index of selected row
     */
    checkListener(bool, index) {
      // By position in the selected map, which is the row index while the map holds every row.
      const selected = toRaw(this.selected);
      const rowsFinal = this.rowsFinal;
      let tmp = Object.keys(selected).map((key) => {
        const row = rowsFinal[parseInt(key)];
        return !!selected[key] || !!(row && row.disableSelect);
      });

      tmp[index] = !!bool;

      if (!this.configFinal.selectAllRows) {
        const visible = new Set(this.visibleRowIndexes);
        tmp = tmp.filter((x, position) => visible.has(position));
      }
      this.allSelectedProperty = !tmp.includes(false);
    },

    /**
     * Clear all row selections
     *
     */
    resetSelect(accessor) {
      if (this.DEBUG) {
        console.log("CALLED FROM:", accessor);
      }
      this.allSelectedProperty = false;

      const selected = this.selected;
      for (let i = 0, n = this.rowsFinal.length; i < n; i++) {
        setIfChanged(selected, i, false);
      }
    },

    checkStoredSelectedRows(deleteStore = false) {
      if (!this.storedState["selected-rows"]) {
        return;
      }
      this.selected = JSON.parse(
        JSON.stringify(this.storedState["selected-rows"]),
      );
      const counter = Object.values(this.selected).filter((x) => x).length;
      const all = this.configFinal.selectAllRows
        ? this.rowsFinal.length
        : this.visibleRows.filter((x) => x).length;
      this.allSelectedCustom = counter && counter === all;
      if (deleteStore) {
        delete this.storedState["selected-rows"];
      }
    },
  },
};
