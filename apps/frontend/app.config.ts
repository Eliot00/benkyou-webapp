import { defineConfig } from '@solidjs/start/config'
import unocssPlugin from 'unocss/vite'

export default defineConfig({
  server: {
    preset: 'cloudflare-pages',
    rollupConfig: {
      external: ['node:async_hooks'],
    },
  },
  vite: {
    plugins: [unocssPlugin()],
    server: {
      proxy: {
        '/api': 'http://localhost:8787',
      },
    },
  },
})
