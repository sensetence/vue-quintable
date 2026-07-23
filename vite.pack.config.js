import vue from "@vitejs/plugin-vue2";
import eslint from "vite-plugin-eslint2";
import { splitVendorChunkPlugin } from "vite";
import commonjs from "vite-plugin-commonjs";
import { resolve, normalize, sep, isAbsolute } from "path";
import { defineConfig } from "vite";
import { camelCase } from "lodash";
import { config, dependencies } from "./package.json";
import sanitize from "sanitize-filename";

let outDir = resolve(__dirname, "dist");

if (process.env.BUILD_DEST_DIRECTORY) {
  const absolute = isAbsolute(process.env.BUILD_DEST_DIRECTORY);
  const arr = process.env.BUILD_DEST_DIRECTORY.split(sep);
  outDir = arr
    .map((s, index) => {
      if ((absolute && index === 0) || s === "." || s === "..") {
        return s;
      }
      return sanitize(s);
    })
    .join(sep);

  if (!absolute) {
    outDir = resolve(__dirname, outDir);
  }
}

const name = config.packageName;

const externals = ["vue", ...Object.keys(dependencies)];
// axios is bundled into the dist (NOT externalized) so consumers never have to
// compile axios 1.x themselves — webpack 5 cannot resolve axios' "process/browser"
// reference. Keep it here even if axios is re-added to dependencies later.
const externalExcludes = ["axios"];

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
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        silenceDeprecations: ["import", "global-builtin", "color-functions", "legacy-js-api"],
      },
    },
  },
  publicDir: false,
  build: {
    outDir: normalize(outDir),
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
