import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components"
    }
  },
  build: {
    cssCodeSplit: false,
    outDir: "./build"
  }
});
