/**
 * The code a demo example shows: its own source (imported with `?raw`), without the demo's frame (the info alert,
 * the show/hide button, the code block and their imports). So the shown code is always the code that runs.
 */
export function exampleCode(source: string): string {
  let code = source
    .replace(/\r\n/g, "\n")
    .replace(/^[ \t]*<alert-info\b[\s\S]*?<\/alert-info\s*>\n/gm, "")
    .replace(/^[ \t]*<(show-hide-button|code-block)\b[^>]*\/>\n/gm, "")
    .replace(/^[ \t]*<!-- code -->\n/gm, "")
    .replace(/^import .*(\?raw"|\/code-block\/|\/alert\/).*\n/gm, "")
    .replace(/^const showCode = ref\(false\);\n/gm, "")
    .replace(/^const code\w* = .*\n/gm, "")
    // the demo's wrapper div, its content one level up
    .replace(
      /^<template>\n {2}<div class="content">\n([\s\S]*?)\n {2}<\/div>\n<\/template>/m,
      (_, body: string) =>
        `<template>\n${body.replace(/^ {2}/gm, "")}\n</template>`,
    );

  // `ref` was only needed for showCode
  if (!/\bref\s*[<(]/.test(code)) {
    code = code.replace(
      /^import \{([^}]*)\} from "vue";\n/m,
      (_, names: string) => {
        const rest = names
          .split(",")
          .map((name) => name.trim())
          .filter((name) => name && name !== "ref");
        return rest.length ? `import { ${rest.join(", ")} } from "vue";\n` : "";
      },
    );
  }

  return code
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(<template>|<script[^>]*>)\n\n/g, "$1\n")
    .replace(/\n\n(<\/template>|<\/script>)/g, "\n$1")
    .trim();
}
