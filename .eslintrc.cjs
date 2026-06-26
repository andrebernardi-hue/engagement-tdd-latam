module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'tailwind.config.js', 'postcss.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'react-hooks', 'tailwindcss'],
  settings: {
    tailwindcss: {
      callees: ['clsx', 'tv', 'cn'],
      config: 'tailwind.config.js',
    },
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    ...require('eslint-plugin-react-hooks').configs.recommended.rules,
    // Governance: no one-off arbitrary Tailwind values (02-DESIGN-SYSTEM §9).
    'tailwindcss/no-arbitrary-value': 'error',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}
