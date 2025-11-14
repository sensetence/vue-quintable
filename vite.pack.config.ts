import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outDir = process.env.BUILD_DEST_DIRECTORY || "dist";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  publicDir: false,
  build: {
    outDir,
    sourcemap: true,
    minify: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueQuintable",
      fileName: (format) => `vue-quintable.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        assetFileNames: "vue-quintable.[ext]",
      },
    },
  },
});
