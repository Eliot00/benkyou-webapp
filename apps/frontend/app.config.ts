import { defineConfig } from '@solidjs/start/config'
import unocssPlugin from 'unocss/vite'

export default defineConfig({
  server: {
    preset: 'cloudflare_module',
    compatibilityDate: '2025-06-10',
    prerender: {
      routes: [
        '/',
        '/game',
        '/game/date-quiz',
        '/game/kata-pair',
        '/learn',
        '/auth/sign-in',
        '/auth/sign-up',
      ],
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
