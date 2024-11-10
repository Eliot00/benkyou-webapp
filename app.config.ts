import { defineConfig } from "@solidjs/start/config";
import unocssPlugin from "unocss/vite";

export default defineConfig({
  middleware: "./src/middleware",
  server: {
    preset: "cloudflare-pages",
    rollupConfig: {
      external: ["node:async_hooks"]
    }
  },
  vite: {
    plugins: [unocssPlugin()]
  }
});
