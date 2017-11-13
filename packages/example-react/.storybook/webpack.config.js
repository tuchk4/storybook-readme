const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
        ],
      },
    ],
  },

  // NOTE: this alise need only for this example
  resolve: {
    alias: {
      react: path.resolve(__dirname, '..', 'node_modules', 'react'),
      'react-dom': path.resolve(__dirname, '..', 'node_modules', 'react-dom'),
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
