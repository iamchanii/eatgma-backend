module.exports = {
  root: true,
  env: { node: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    'import/prefer-default-export': 0,
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      },
    ],
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
