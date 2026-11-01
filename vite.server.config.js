import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve("src") } },
  ssr: {
    target: "node",
    noExternal: true,
  },
  build: {
    ssr: "server/handler.js",
    outDir: "server-dist",
    rollupOptions: { output: { entryFileNames: "handler.js" } },
  },
});
