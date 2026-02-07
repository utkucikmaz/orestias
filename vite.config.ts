import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/orestias/",
  plugins: [react()],
  build: {
    outDir: "docs",
    chunkSizeWarningLimit: 1200,
  },
});
