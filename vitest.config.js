import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue2";

export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.js"],
  },
});
