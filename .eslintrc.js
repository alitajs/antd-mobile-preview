module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/alt-text': 0,
    'no-unused-expressions': 0,
    'no-console': 0,
    'selector-type-no-unknown': 0,
  },
  globals: {},
};
