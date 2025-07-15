import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';
import UnoCSS from '@unocss/postcss'

export default defineConfig({
  html: {
    title: '乐学日语',
    tags: [
      {
        tag: 'link',
        attrs: { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
      },
      {
        tag: 'link',
        attrs: { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: true },
      },
      {
        tag: 'link',
        attrs: {
          href: 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap',
          rel: 'stylesheet',
        },
      },
    ],
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
  ],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [UnoCSS()],
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
});
