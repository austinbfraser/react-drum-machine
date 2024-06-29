import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import _import from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:import/errors',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended'
    )
  ),
  {
    plugins: {
      import: fixupPluginRules(_import),
      react: fixupPluginRules(react),
      'jsx-a11y': fixupPluginRules(jsxA11Y),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': 'webpack',
    },

    rules: {
      'no-unused-vars': [
        'off',
        {
          vars: 'local',
        },
      ],

      indent: ['warn', 2],
      quotes: ['warn', 'single'],
      'prefer-const': 'warn',
      semi: ['warn', 'always'],
      'react/prefer-stateless-function': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': 'warn',
    },
  },
];
