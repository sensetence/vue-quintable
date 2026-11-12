<template>
  <pre
    class="line-numbers mt-2"
    data-toolbar-order="copy-to-clipboard"
  ><code ref="codeBlock" class="language-markup" v-text="code"/></pre>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/toolbar/prism-toolbar.css";

// v-text, not a child: the template would collapse the code's whitespace
defineProps({
  code: {
    type: String,
    required: true,
  },
});
const codeBlock = ref(null);

// Prism loads with the first code block shown, not with the page. Its plugins need Prism first, and the
// copy button needs the toolbar.
onMounted(async () => {
  const { default: Prism } = await import("prismjs");
  Prism.manual = true;
  await import("prismjs/plugins/line-numbers/prism-line-numbers.min.js");
  await import("prismjs/plugins/toolbar/prism-toolbar.min.js");
  await import(
    "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"
  );
  if (codeBlock.value) {
    Prism.highlightElement(codeBlock.value);
  }
});
</script>
