import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env.NODE_ENV": '"test"',
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.js"],
    // mount-heavy tests take up to 2 s alone and miss the default 5 s when the machine is busy
    testTimeout: 20000,
    exclude: ["e2e/**", "node_modules/**"],
  },
});
