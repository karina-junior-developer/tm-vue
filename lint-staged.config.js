// lint-staged.config.js
export default {
  '*.{js,vue,css}': ['eslint --fix', 'prettier --write'],
};
