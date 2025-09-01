import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';

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
    postcss: {},
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
});
