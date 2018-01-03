const path = require('path');

module.exports = {
  // ----------------
  // NOTE: this alias is needed only for this example
  // ----------------
  resolve: {
    alias: {
      // react: path.resolve(__dirname, '..', 'node_modules', 'react'),
      // 'react-dom': path.resolve(__dirname, '..', 'node_modules', 'react-dom'),
      '@storybook/addons': path.resolve(
        __dirname,
        '..',
        'node_modules',
        '@storybook',
        'addons'
      ),
    },
  },
};
