import { describe, it, expect } from "vitest";
import { parse } from "vue/compiler-sfc";
import { exampleCode } from "../src/components/code-block/example-code";

const sources = import.meta.glob("../src/examples/**/*.vue", {
  query: "?raw",
  import: "default",
  eager: true,
});

describe("exampleCode", () => {
  for (const [file, source] of Object.entries(sources)) {
    it(`shows ${file.replace("../src/examples/", "")} without the demo frame`, () => {
      const code = exampleCode(source);
      expect(code).not.toMatch(
        /<alert-info|AlertInfo|show-hide-button|ShowHideButton|code-block|CodeBlock|showCode|exampleCode|\?raw|class="content"/,
      );
      expect(parse(code).errors).toEqual([]);
      // everything else of the source is still there
      expect(code).toContain("<template>");
    });
  }

  it("keeps the example's own code and drops only the frame", () => {
    const source = [
      "<template>",
      '  <div class="content">',
      "    <alert-info",
      "      >Info.</alert-info",
      "    >",
      "",
      '    <vue-quintable :config="config" :rows="rows" />',
      "",
      "    <!-- code -->",
      '    <show-hide-button v-model:show-code="showCode" />',
      '    <code-block v-if="showCode" :code="code" />',
      "  </div>",
      "</template>",
      "",
      '<script setup lang="ts">',
      'import { ref, computed } from "vue";',
      'import AlertInfo from "../components/alert/alert-info.vue";',
      'import CodeBlock from "../components/code-block/code-block.vue";',
      'import { exampleCode } from "../components/code-block/example-code";',
      'import source from "./x-example.vue?raw";',
      "",
      "const showCode = ref(false);",
      "const code = exampleCode(source);",
      "const config = computed(() => ({}));",
      "</script>",
    ].join("\r\n");
    expect(exampleCode(source)).toBe(
      [
        "<template>",
        '  <vue-quintable :config="config" :rows="rows" />',
        "</template>",
        "",
        '<script setup lang="ts">',
        'import { computed } from "vue";',
        "",
        "const config = computed(() => ({}));",
        "</script>",
      ].join("\n"),
    );
  });
});
