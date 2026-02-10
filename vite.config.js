import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fullReload from "vite-plugin-full-reload";

export default defineConfig({
  plugins: [
    tailwindcss(),
    fullReload(
      [
        "site/**/*.php",
        "site/**/*.yml",
        "content/**/*",
      ],
      { delay: 100 }
    ),
  ],
  server: {
    strictPort: true,
    port: 5173,
  },
  build: {
    outDir: "assets/build",
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        app: "src/js/app.js",
      },
    },
  },
});