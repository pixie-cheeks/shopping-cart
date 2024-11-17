import pixie from '@pixie-cheeks/eslint-config';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginVitest from '@vitest/eslint-plugin';
import pluginTestingLibrary from 'eslint-plugin-testing-library';
import pluginJestDom from 'eslint-plugin-jest-dom';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{jsx,js,cjs}'] },
  { ignores: ['dist'] },
  ...pixie.base,
  ...pixie.react,
  {
    plugins: {
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import-x/no-extraneous-dependencies': [
        'error',
        // All js/cjs files in the root folder can have devDeps
        {
          devDependencies: ['*.{js,cjs}', '**/*.test.*'],
          optionalDependencies: false,
        },
      ],
    },
  },
  {
    files: ['src/**/*'],
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },
  {
    files: ['**/*.test.*'],
    plugins: {
      vitest: pluginVitest,
      'testing-library': pluginTestingLibrary,
      'jest-dom': pluginJestDom,
    },
    rules: {
      ...pluginVitest.configs.recommended.rules,
      ...pluginTestingLibrary.configs['flat/react'].rules,
      ...pluginJestDom.configs['flat/recommended'].rules,
    },
  },
  pixie.prettier,
];
