import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "localhost",
  },
  build: {
    outDir: resolve(__dirname, "built"),
    rollupOptions: {
      input: {
        app: resolve(__dirname, "index.html"),
      },
    },
  },
  base: "",
});
