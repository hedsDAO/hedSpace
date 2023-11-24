import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "src",
  publicDir: "../dist/assets",
  resolve: {
    alias: {
      "@": path.resolve(__dirname,"./src"),
    },
  },
  build : {
    outDir : "../dist",
    copyPublicDir : true
  }
});
