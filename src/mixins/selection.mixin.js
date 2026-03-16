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
      return Object.values(this.selected).filter((x) => x).length > 0;
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
          this.allSelectedCustom =
            counter &&
            counter ===
              this.rowsFinal.filter(
                (x, index) =>
                  !x.disableSelect &&
                  this.visibleRows[this.sortedIndexes[index]]
              ).length;
        } else {
          this.allSelectedCustom =
            counter &&
            counter === this.rowsFinal.filter((x) => !x.disableSelect).length;
        }
      } else {
        this.allSelectedCustom = false;
      }
    },

    selected: {
      handler(val) {
        let selected = [];
        for (let index in this.sortedIndexes) {
          if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, index)) {
            if (val[this.sortedIndexes[index]]) {
              const row = this.rowsFinal[this.sortedIndexes[index]];
              if (row && !row.disableSelect) {
                selected.push(row);
              }
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

      for (let index in this.sortedIndexes) {
        if (Object.prototype.hasOwnProperty.call(this.sortedIndexes, index)) {
          index = parseInt(index);
          if (
            !this.rowsFinal[this.sortedIndexes[index]].disableSelect &&
            ((!this.configFinal.selectAllRows &&
              this.visibleRows[this.sortedIndexes[index]]) ||
              (this.configFinal.selectAllRows &&
                this.filteredRows[this.sortedIndexes[index]]))
          ) {
            this.$set(this.selected, this.sortedIndexes[index], value);
            counter++;
          } else {
            this.$set(this.selected, this.sortedIndexes[index], false);
          }
        }
      }

      if (value) {
        if (!this.configFinal.selectAllRows) {
          this.allSelectedCustom =
            counter &&
            counter ===
              this.rowsFinal.filter(
                (x, index) =>
                  !x.disableSelect &&
                  this.visibleRows[this.sortedIndexes[index]]
              ).length;
        } else {
          this.allSelectedCustom =
            counter &&
            counter === this.rowsFinal.filter((x) => !x.disableSelect).length;
        }
      }
    },

    checkListener(bool, index) {
      let tmp = Object.keys(this.selected)
        .slice()
        .map((key) => {
          return (
            !!this.selected[key] ||
            !!(
              this.rowsFinal[parseInt(key)] &&
              this.rowsFinal[parseInt(key)].disableSelect
            )
          );
        });

      tmp[index] = !!bool;

      if (!this.configFinal.selectAllRows) {
        tmp = tmp.filter((x, index) => this.visibleRowIndexes.includes(index));

        if (tmp.indexOf(false) !== -1) {
          this.allSelectedProperty = false;
        } else if (tmp.indexOf(false) === -1) {
          this.allSelectedProperty = true;
        }
      } else {
        if (tmp.indexOf(false) === -1) {
          this.allSelectedProperty = true;
        } else {
          this.allSelectedProperty = false;
        }
      }
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
          this.allSelectedCustom =
            counter && counter === this.visibleRows.filter((x) => x).length;
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
