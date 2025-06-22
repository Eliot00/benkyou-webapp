import antfu from '@antfu/eslint-config'
import { config as common } from '@benkyou/eslint-config/base'

export default antfu({
  solid: true,
  unocss: true,
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type'],
    },
  },
  ignores: [
    './src/components/ui/**',
    'wrangler.toml',
    './src/hooks/use-mobile.tsx',
    './src/libs/call-handler.ts',
    './src/libs/cn.ts',
    './src/libs/combine-props.tsx',
  ],
}, common)
