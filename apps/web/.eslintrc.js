module.exports = {
  env: {
    node: true,
  },
  extends: [
    require.resolve('@gln-libs/eslint-plugins'),
    require.resolve('@gln-libs/eslint-plugins/react'),
  ],
  ignorePatterns: ['.eslintrc.js'],
};