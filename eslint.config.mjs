// @ts-check
import eslintReact from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';
import importXPlugin from 'eslint-plugin-import-x';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const reactTsRecommended = eslintReact.configs['recommended-typescript'];

export default defineConfig(
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.netlify/**',
      'out/**',
      'coverage/**',
      'dist/**',
      'playwright-report/**',
    ],
  },
  // All Files
  {
    plugins: {
      import: importXPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'import/no-duplicates': ['warn', { 'prefer-inline': true }],
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [{ pattern: '#*/**', group: 'internal' }],
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
        },
      ],
    },
  },
  prettierRecommended,
  // TypeScript + React ([ESLint React](https://www.eslint-react.xyz/) replaces eslint-plugin-react + eslint-plugin-react-hooks)
  {
    files: ['**/*.{ts,tsx}'],
    ...reactTsRecommended,
    plugins: {
      ...reactTsRecommended.plugins,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...reactTsRecommended.rules,
      '@eslint-react/no-missing-key': 'warn',
      // Too strict for common patterns (e.g. formatting dates, console in error boundaries).
      '@eslint-react/purity': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
);
