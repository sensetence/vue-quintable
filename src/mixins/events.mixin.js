export default {
  methods: {
    handleComponentEvent(data) {
      this.$emit("component:event", data, "component:event");
    },

    hasSomeParentTheClass(element, className) {
      if (
        element instanceof HTMLElement &&
        element.classList.contains(className)
      ) {
        return true;
      }
      return (
        element instanceof Element &&
        element.parentNode &&
        this.hasSomeParentTheClass(element.parentNode, className)
      );
    },

    hasSomeParentTagName(element, tagName) {
      if (
        element instanceof HTMLElement &&
        element.tagName.toLowerCase() === tagName.toLowerCase()
      ) {
        return true;
      }
      return (
        element instanceof Element &&
        element.parentNode &&
        this.hasSomeParentTagName(element.parentNode, tagName)
      );
    },

    onRowAuxClick(e, rowIndex) {
      if (e.button === 1) {
        const i = parseInt(rowIndex);
        this.$emit(
          "auxclick:row",
          this.rowsFinal[i],
          "auxclick:row",
          e.target,
          e,
          i
        );
      }
    },

    onRowMousedown(e) {
      if (e.which === 2) {
        e.preventDefault();
      }
    },

    onRowClick(e, rowIndex) {
      if ((e.target || {}).type === "checkbox") {
        return;
      } else if (
        this.hasSomeParentTheClass(e.target, "generated-table") &&
        !this.nested
      ) {
        return;
      }

      let isLink = this.hasSomeParentTagName(e.target, "a");
      let shouldPrevent = this.hasSomeParentTheClass(
        e.target,
        "prevent-toggle"
      );

      const index = rowIndex.toString();
      const i = parseInt(rowIndex);

      if (this.hiddenColumns[index] && !isLink && !shouldPrevent) {
        if (!this.openRows[index]) {
          this.$set(this.openRows, index, true);
          this.$emit(
            "expand:row",
            this.rowsFinal[this.sortedIndexes[index]],
            "expand:row",
            this.sortedIndexes[index]
          );
        } else {
          this.$set(this.openRows, index, false);
          this.$emit(
            "expand:row",
            this.rowsFinal[this.sortedIndexes[index]],
            "collapse:row",
            this.sortedIndexes[index]
          );
        }
        this.generatedUpdatedKey = Date.now();
      }

      if (this.configFinal.enableRowTabIndex) {
        if (this.activeRow === i) {
          this.activeRow = null;
        } else {
          this.activeRow = i;
        }
      }
      this.$emit("click:row", this.rowsFinal[i], "click:row", e.target, e, i);
    },

    onCellClick(e, cell) {
      this.$emit("click:cell", cell, "click:cell", e.target, e);
    },

    onCellAuxClick(e, cell) {
      if (e.button === 1) {
        this.$emit("auxclick:cell", cell, "auxclick:cell", e.target, e);
      }
    },

    onCellMousedown(e) {
      if (e.which === 2) {
        e.preventDefault();
      }
    },

    onMouseenterRow(index) {
      if (this.hoveredRow !== index) {
        this.hoveredRow = index;
      }
    },

    onMouseleaveTable() {
      this.hoveredRow = null;
    },
  },
};
