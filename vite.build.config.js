import vue from "@vitejs/plugin-vue2";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import basicSsl from "@vitejs/plugin-basic-ssl";
import eslint from "vite-plugin-eslint2";
import { splitVendorChunkPlugin } from "vite";
import commonjs from "vite-plugin-commonjs";
import { resolve } from "path";
import { defineConfig } from "vite";
import { camelCase } from "lodash";
import { config } from "./package.json";
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

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
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        silenceDeprecations: ["import", "global-builtin", "color-functions", "legacy-js-api"],
      },
    },
  },
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
