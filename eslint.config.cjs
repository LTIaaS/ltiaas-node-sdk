module.exports = [
  {
    ...require('eslint-config-love'),
    files: ['**/*.js', '**/*.ts'],
    ignores: ['dist/*', 'node_modules/*'],
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    },
  },
]
