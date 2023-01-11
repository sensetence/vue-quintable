import vue from "@vitejs/plugin-vue2";
import eslint from "vite-plugin-eslint";
import { splitVendorChunkPlugin } from "vite";
import commonjs from "vite-plugin-commonjs";
import { resolve } from "path";
import { defineConfig } from "vite";
import { camelCase } from "lodash";
import { config, dependencies } from "./package.json";

const name = config.packageName;

const externals = ["vue", ...Object.keys(dependencies)];
const externalExcludes = [];

export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    eslint(),
    commonjs(),
    vue({
      isProduction: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname),
    },
  },
  publicDir: false,
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,
    minify: true,
    target: "es2015",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.js"),
      name: "VueQuintable",
      // the proper extensions will be added
      fileName: (format) => `${name}.${format}.js`,
      // formats: ["cjs", "es", "umd"],
    },
    rollupOptions: {
      external: externals.filter((dep) => !externalExcludes.includes(dep)),
      // external: [
      //   "vue",
      //   "@fortawesome/fontawesome-svg-core",
      //   "@fortawesome/free-solid-svg-icons",
      //   "@fortawesome/vue-fontawesome",
      // ],
      output: {
        name: camelCase(name),
        assetFileNames: `${name}.[ext]`,
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  base: "",
});
