import antfu from '@antfu/eslint-config'
import { config as common } from '@benkyou/eslint-config/base'

export default antfu({
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type'],
    },
  },
  ignores: [
    './drizzle/**',
  ],
}, common)
