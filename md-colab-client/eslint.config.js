/* eslint-disable sort-keys-fix/sort-keys-fix */
import harrisConfigBase from 'eslint-config-harris/base';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...harrisConfigBase,
  {
    files: ['rsbuild.config.ts', 'eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
      },
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    rules: {
      'no-console': 'off',
      'line-comment-position': 'off',
      'func-names': ['error', 'as-needed'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: ['node_modules/'],
  },
];

// eslint-disable-next-line import/no-default-export
export default eslintConfig;
