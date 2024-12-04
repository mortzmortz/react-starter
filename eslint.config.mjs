import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importXPlugin from 'eslint-plugin-import-x';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      '.next/**',
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
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
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
      ...prettierPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
    },
  },
  // jsx/tsx Files
  {
    files: ['**/*.tsx', '**/*.jsx'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        jsx: true,
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react/jsx-key': 'warn',
    },
  },
  // React Files
  {
    files: ['**/*.ts?(x)', '**/*.js?(x)'],
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  // Typescript Files
  {
    files: ['**/*.ts?(x)'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
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
