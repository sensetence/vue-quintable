export default {
  data() {
    return {
      allSelectedCustom: null,
      selected: {},
    };
  },
  computed: {
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

    someSelected() {
      return Object.values(this.selected).some((x) => x);
    },
  },
  watch: {
    preSelectedRows(val) {
      if (!val) {
        return;
      }

      for (let i = 0; i < this.rowsFinal.length; i++) {
        this.$set(this.selected, i, false);
      }

      if (val && val.length) {
        let counter = 0;

        const indexes = this.configFinal.selectAllRows
          ? this.rowsFinal.map((x, i) => i)
          : this.visibleRowIndexes;

        for (let i = 0; i < val.length; i++) {
          const key = val[i].key;
          const value = val[i].value;

          for (let j = 0; j < indexes.length; j++) {
            const index = indexes[j];
            if (
              !this.rowsFinal[index].disableSelect &&
              this.rowsFinal[index][key] === value
            ) {
              this.$set(this.selected, index, true);
              counter++;
            }
          }
        }

        if (!this.configFinal.selectAllRows) {
          let selectableCount = 0;
          for (let j = 0; j < this.rowsFinal.length; j++) {
            if (
              !this.rowsFinal[j].disableSelect &&
              this.visibleRows[this.sortedIndexes[j]]
            ) {
              selectableCount++;
            }
          }
          this.allSelectedCustom = counter && counter === selectableCount;
        } else {
          let selectableCount = 0;
          for (let j = 0; j < this.rowsFinal.length; j++) {
            if (!this.rowsFinal[j].disableSelect) selectableCount++;
          }
          this.allSelectedCustom = counter && counter === selectableCount;
        }
      } else {
        this.allSelectedCustom = false;
      }
    },

    selected: {
      handler(val) {
        let selected = [];
        const keys = Object.keys(this.sortedIndexes);
        for (let k = 0; k < keys.length; k++) {
          const si = this.sortedIndexes[keys[k]];
          if (val[si]) {
            const row = this.rowsFinal[si];
            if (row && !row.disableSelect) {
              selected.push(row);
            }
          }
        }

        if (this.configFinal.storeState) {
          localStorage.setItem(
            `vue-quintable-${this.identifier}-selected-rows`,
            JSON.stringify(val)
          );
        }

        this.$emit("input", selected);
        this.$emit("update:selected-rows", selected, "update:selected-rows");
      },
      deep: true,
    },
  },
  methods: {
    checkAll(force = false) {
      let value = this.allSelectedProperty;

      if (force) {
        value = true;
      }

      let counter = 0;

      const keys = Object.keys(this.sortedIndexes);
      for (let k = 0; k < keys.length; k++) {
        const si = this.sortedIndexes[keys[k]];
        if (
          !this.rowsFinal[si].disableSelect &&
          ((!this.configFinal.selectAllRows && this.visibleRows[si]) ||
            (this.configFinal.selectAllRows && this.filteredRows[si]))
        ) {
          this.$set(this.selected, si, value);
          counter++;
        } else {
          this.$set(this.selected, si, false);
        }
      }

      if (value) {
        if (!this.configFinal.selectAllRows) {
          let selectableCount = 0;
          for (let j = 0; j < this.rowsFinal.length; j++) {
            if (
              !this.rowsFinal[j].disableSelect &&
              this.visibleRows[this.sortedIndexes[j]]
            ) {
              selectableCount++;
            }
          }
          this.allSelectedCustom = counter && counter === selectableCount;
        } else {
          let selectableCount = 0;
          for (let j = 0; j < this.rowsFinal.length; j++) {
            if (!this.rowsFinal[j].disableSelect) selectableCount++;
          }
          this.allSelectedCustom = counter && counter === selectableCount;
        }
      }
    },

    checkListener(bool, index) {
      let allTrue = true;

      if (!this.configFinal.selectAllRows) {
        for (let j = 0; j < this.visibleRowIndexes.length; j++) {
          const idx = this.visibleRowIndexes[j];
          const val =
            idx === index
              ? !!bool
              : !!(
                  this.selected[idx] ||
                  (this.rowsFinal[idx] && this.rowsFinal[idx].disableSelect)
                );
          if (!val) {
            allTrue = false;
            break;
          }
        }
      } else {
        for (let k = 0; k < this.rowsFinal.length; k++) {
          const val =
            k === index
              ? !!bool
              : !!(
                  this.selected[k] ||
                  (this.rowsFinal[k] && this.rowsFinal[k].disableSelect)
                );
          if (!val) {
            allTrue = false;
            break;
          }
        }
      }

      this.allSelectedProperty = allTrue;
    },

    resetSelect(accessor) {
      if (this.DEBUG) {
        console.log("CALLED FROM:", accessor);
      }
      this.allSelectedProperty = false;

      for (let i = 0; i < this.rowsFinal.length; i++) {
        this.$set(this.selected, i, false);
      }
    },

    checkStoredSelectedRows(deleteStore = false) {
      if (this.storedState["pre-selected-rows"]) {
        //TODO
      }

      if (this.storedState["selected-rows"]) {
        this.selected = JSON.parse(
          JSON.stringify(this.storedState["selected-rows"])
        );
        const counter = Object.values(this.selected).filter((x) => x).length;
        if (!this.configFinal.selectAllRows) {
          let visibleCount = 0;
          for (let j = 0; j < this.visibleRows.length; j++) {
            if (this.visibleRows[j]) visibleCount++;
          }
          this.allSelectedCustom = counter && counter === visibleCount;
        } else {
          this.allSelectedCustom = counter && counter === this.rowsFinal.length;
        }
        if (deleteStore) {
          this.$delete(this.storedState, "selected-rows");
        }
      }
    },
  },
};
