// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/widget.ts"),
      name: "UsersWidget",
      formats: ["umd"],
      fileName: () => "users-widget.umd.js",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: { vue: "Vue" },
      },
    },
  },
});
