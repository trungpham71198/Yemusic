module.exports = {
  extends: ['plugin:react-hooks/recommended'],
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: oldestSupportedReactVersion,
    },
  },
  rules: {
    'react/jsx-fragments': ['warn', 'element'],
    'react-hooks/rules-of-hooks': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/react-in-jsx-scope': 0,
  },
};