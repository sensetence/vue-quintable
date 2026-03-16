import fuzzy from "fuzzy.js";

export default {
  data() {
    return {
      defaultOperator: "equal",
      operatorFunctions: {
        equal: (a, b) => {
          return b === a;
        },
        greater: (a, b) => {
          return b > a;
        },
        less: (a, b) => {
          return b < a;
        },
        greaterEqual: (a, b) => {
          return b >= a;
        },
        lessEqual: (a, b) => {
          return b <= a;
        },
        contains: (a, b) => {
          if (!Array.isArray(b) && typeof b !== "string") {
            return false;
          }

          return b.indexOf(a) !== -1;
        },

        notContains: (a, b) => {
          if (!Array.isArray(b) && typeof b !== "string") {
            return false;
          }

          return b.indexOf(a) === -1;
        },

        startsWith: (a, b) => {
          if (typeof b !== "string") {
            return false;
          }

          return b.indexOf(a) === 0;
        },

        endsWitch: (a, b) => {
          if (typeof b !== "string") {
            return false;
          }

          return b.indexOf(a, this.length - a.length) !== -1;
        },

        matches(regex, b) {
          if (!(regex instanceof RegExp) || typeof b !== "string") {
            return false;
          }
          return regex.test(b);
        },
      },
    };
  },
  computed: {
    operators() {
      return Object.keys(this.operatorFunctions);
    },

    filterActive() {
      return this.filtersFinal && Object.keys(this.filtersFinal).length;
    },

    filtersFinal() {
      if (!this.configFinal.storeState || !this.storedState.filters) {
        return this.filters;
      }
      return this.storedState.filters;
    },

    filteredRows() {
      let visible = [];

      if (this.configFinal.ajaxUrl) {
        return this.rowsFinal;
      }

      for (let i = 0; i < this.rowsFinal.length; i++) {
        visible.push(true);
      }

      if (
        (!this.configFinal.search && !this.filterActive) ||
        (!this.filterActive &&
          this.configFinal.search &&
          this.query.length < this.configFinal.searchLength)
      ) {
        return visible;
      }

      for (let i = 0; i < this.rowsFinal.length; i++) {
        let row = this.rowsFinal[i].cells
          ? this.rowsFinal[i].cells
          : this.rowsFinal[i];
        let match = false;
        let searched = false;

        if (
          this.configFinal.search &&
          this.query.length >= this.configFinal.searchLength
        ) {
          for (let j = 0; j < row.length; j++) {
            let col = row[j];

            let textVal = col.html ? col.html : col.text;

            if (textVal) {
              if (
                this.configFinal.useFuzzySearch &&
                fuzzy(
                  (textVal + "").toLowerCase(),
                  (this.query + "").toLowerCase()
                ).score > 6
              ) {
                match = true;
                break;
              }

              if (
                (textVal + "")
                  .toLowerCase()
                  .indexOf((this.query + "").toLowerCase()) !== -1
              ) {
                match = true;
                break;
              }
            }
          }

          if (this.rowsFinal[i].keywords) {
            for (let k = 0; k < this.rowsFinal[i].keywords.length; k++) {
              if (
                this.configFinal.useFuzzySearch &&
                fuzzy(
                  (this.rowsFinal[i].keywords[k] + "").toLowerCase(),
                  (this.query + "").toLowerCase()
                ).score > 6
              ) {
                match = true;
                break;
              }

              if (
                (this.rowsFinal[i].keywords[k] + "")
                  .toLowerCase()
                  .indexOf((this.query + "").toLowerCase()) !== -1
              ) {
                match = true;
                break;
              }
            }
          }

          searched = true;
        }

        if (this.filterActive && !this.rowsFinal[i].filters) {
          match = false;
        } else if (((searched && match) || !searched) && this.filterActive) {
          if (this.filterGroups.length) {
            match = this.doFiltering(this.rowsFinal[i].filters);
          } else {
            let group = {
              items: [],
              relation: this.configFinal.filterRelation,
            };

            for (let filter in this.filtersFinal) {
              if (
                Object.prototype.hasOwnProperty.call(this.filtersFinal, filter)
              ) {
                group.items.push({ name: filter });
              }
            }

            match = this.doFilteringForGroup(
              this.filtersFinal,
              this.rowsFinal[i].filters,
              group
            );

            if (this.DEBUG) {
              console.log("FILTER GROUPS CALCULATED", this.filterGroups);
            }
          }

          if (this.DEBUG) {
            console.log("\n");
            console.log("ROW " + i, match, this.rowsFinal[i].filters);
            console.log("\n");
          }
        }

        visible[i] = match;
      }

      return visible;
    },
  },
  watch: {
    filters: {
      handler() {
        if (this.configFinal.ajaxUrl) {
          const clear = !(
            this.configFinal.storeState && this.storedState.filters
          );
          this.pageSort = false;
          this.loadViaAjax(clear, clear, "FILTERS");
        }

        if (this.pageSort) {
          this.currentSortIndexes = {};
          this.resetSorts();
          this.recomputeEssentials();
        }

        if (this.configFinal.storeState) {
          this.$delete(this.storedState, "filters");
          localStorage.setItem(
            `vue-quintable-${this.identifier}-filters`,
            JSON.stringify(this.filtersFinal)
          );
        }
      },
      deep: true,
    },
    filtersFinal(val) {
      this.$emit("update:filters", val, "update:filters");
    },

    filteredRows: {
      handler(val, old) {
        if (this.configFinal.ajaxUrl) {
          return;
        }

        if (old && val.length === old.length) {
          let same = true;
          for (let i = 0; i < val.length; i++) {
            if (val[i] !== old[i]) {
              same = false;
              break;
            }
          }
          if (same) return;
        }

        const realCurrentIndex = this.visibleRowIndexes.findIndex(
          (x) => x === this.activeRow
        );
        if (realCurrentIndex < 0) {
          this.activeRow = null;
        }

        if (this.currentPage !== 1) {
          this.currentPage = 1;
        } else if (!this.configFinal.keepSelect) {
          this.resetSelect("filteredRows watcher");
        }

        const rows = [];
        for (let i = 0; i < val.length; i++) {
          const index = i.toString();
          if (val[i]) {
            rows.push(
              this.rowsFinal[
                this.sortedIndexes[index] ? this.sortedIndexes[index] : i
              ]
            );
          }
        }

        this.$emit("filtered:rows", rows, "filtered:rows");
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    doFiltering(filterValues) {
      let results = [];

      for (let i = 0; i < this.filterGroups.length; i++) {
        results.push(
          this.doFilteringForGroup(
            this.filtersFinal,
            filterValues,
            this.filterGroups[i]
          )
        );

        if (this.DEBUG && i < this.filterGroups.length - 1) {
          console.log(this.configFinal.filterGroupRelation);
        }
      }

      if (this.DEBUG) {
        console.log(
          "RESULTS FOR GROUPS:",
          results,
          this.configFinal.filterGroupRelation
        );
      }

      if (this.configFinal.filterGroupRelation === "AND") {
        return results.indexOf(false) === -1;
      } else if (this.configFinal.filterGroupRelation === "OR") {
        return results.indexOf(true) !== -1;
      } else {
        return true;
      }
    },

    doFilteringForGroup(filters, filterValues, group, index = 0) {
      let spaces = "   ";

      for (let i = 0; i < index; i++) {
        spaces += "   ";
      }

      if (this.DEBUG) {
        if (group.items) {
          let str = spaces;
          let tmp = group.items.slice();

          let cmp = function (a, b) {
            if (a.name === undefined) {
              return 1;
            }
            if (b.name === undefined) {
              return -1;
            }
            return 0;
          };

          tmp = tmp.sort(cmp);

          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].name) {
              str += tmp[i].name;
              if (i < tmp.length - 1) {
                str += " " + group.relation + " ";
              }
            }
          }

          console.log(str);
        }

        console.log(spaces, "GROUP:", group);
      }

      let found = false;

      if (group.relation === "AND") {
        for (let key in filters) {
          if (Object.prototype.hasOwnProperty.call(filters, key)) {
            if (
              this.filterGroups.length &&
              !this.findInFilterGroups(key, this.filterGroups)
            ) {
              continue;
            }

            let allIncluding = true;
            for (let i = 0; i < group.items.length; i++) {
              let item = group.items[i];

              if (item.name && filterValues[item.name] === undefined) {
                allIncluding = false;
                break;
              }
            }

            if (allIncluding) {
              for (let i = 0; i < group.items.length; i++) {
                let item = group.items[i];

                found = true;
                if (item.items) {
                  found = this.doFilteringForGroup(
                    filters,
                    filterValues,
                    item,
                    index + 1
                  );
                }

                if (!found) {
                  break;
                }

                if (typeof filters[item.name] === "undefined") {
                  continue;
                }

                let operator =
                  typeof filters[item.name] === "object" &&
                  filters[item.name] !== null &&
                  filters[item.name]["operator"] &&
                  this.operators.includes(filters[item.name]["operator"])
                    ? filters[item.name]["operator"]
                    : this.defaultOperator;
                let filterProperties = this.getFilterValues(filters[item.name]);

                const cmpFunction =
                  typeof filters[item.name].compare === "function"
                    ? filters[item.name].compare
                    : this.operatorFunctions[operator];

                for (let j = 0; j < filterProperties.length; j++) {
                  const matches = cmpFunction(
                    filterProperties[j],
                    filterValues[item.name]
                  );
                  if (!matches) {
                    found = false;
                    break;
                  }
                }

                if (!found) {
                  break;
                }
              }
            }
          }
        }
        return found;
      } else if (group.relation === "OR" || group.items) {
        for (let key in filters) {
          if (Object.prototype.hasOwnProperty.call(filters, key)) {
            if (
              this.filterGroups.length &&
              !this.findInFilterGroups(key, this.filterGroups)
            ) {
              continue;
            }

            for (let i = 0; i < group.items.length; i++) {
              let item = group.items[i];

              if (item.items) {
                found = this.doFilteringForGroup(
                  filters,
                  filterValues,
                  item,
                  index + 1
                );

                if (found) {
                  break;
                }
              }

              if (typeof filters[item.name] === "undefined") {
                continue;
              }

              let operator =
                typeof filters[item.name] === "object" &&
                filters[item.name] !== null &&
                filters[item.name]["operator"] &&
                this.operators.includes(filters[item.name]["operator"])
                  ? filters[item.name]["operator"]
                  : this.defaultOperator;
              let filterProperties = this.getFilterValues(filters[item.name]);

              const cmpFunction =
                typeof filters[item.name].compare === "function"
                  ? filters[item.name].compare
                  : this.operatorFunctions[operator];

              for (let j = 0; j < filterProperties.length; j++) {
                const matches = cmpFunction(
                  filterProperties[j],
                  filterValues[item.name]
                );

                if (matches) {
                  found = true;
                  break;
                }
              }

              if (found) {
                break;
              }
            }
          }
        }
        return found;
      } else {
        return true;
      }
    },

    getFilterValues(values) {
      return values instanceof RegExp ||
        typeof values !== "object" ||
        values === null
        ? [values]
        : Array.isArray(values)
        ? values
        : this.getFilterValues(values.values);
    },

    findInFilterGroups(key, arr, index = 0) {
      if (!arr) {
        return false;
      }

      let found = false;

      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item.items) {
          found = this.findInFilterGroups(key, item.items, index + 1);
          if (found) {
            break;
          }
        }

        if (item.name === key) {
          found = true;
          break;
        }
      }
      return found;
    },
  },
};
