<template>
    <pre
        class="line-numbers mt-2"
        data-toolbar-order="copy-to-clipboard"
    ><code class="language-markup" ref="codeBlock" v-html="code"/></pre>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue';
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/toolbar/prism-toolbar.min.js";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js";

// the code cannot be passed as child because vue removes whitespaces
defineProps({
  code: {
    type: String,
    required: true
  }
})
const codeBlock = ref(null);

onMounted(async () => {
  Prism.manual = true;

  await nextTick();
  if (codeBlock.value) {
    Prism.highlightElement(codeBlock.value);
  }
});
</script>