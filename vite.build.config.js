import vue from "@vitejs/plugin-vue2";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import basicSsl from "@vitejs/plugin-basic-ssl";
import eslint from "vite-plugin-eslint";
import { splitVendorChunkPlugin } from "vite";
import commonjs from "vite-plugin-commonjs";
import { resolve } from "path";
import { defineConfig } from "vite";
import { camelCase } from "lodash";
import { config } from "./package.json";

const name = config.packageName;

export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    basicSsl(),
    eslint(),
    pluginRewriteAll(),
    vue(),
    commonjs(),
  ],
  server: {
    https: true,
    host: "localhost",
  },
  build: {
    outDir: resolve(__dirname, "built"),
    rollupOptions: {
      input: {
        app: resolve(__dirname, "index.html"),
      },
      output: {
        name: camelCase(name),
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  base: "",
});
