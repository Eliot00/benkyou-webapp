import turboPlugin from "eslint-plugin-turbo";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = {
  plugins: {
    turbo: turboPlugin,
  },
  ignores: [
    "dist/**",
    "*.config.{js,mjs,ts}",
    "wrangler.toml",
  ],
}
