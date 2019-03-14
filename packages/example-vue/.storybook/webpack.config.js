const path = require('path');
const updateWebpackConfig = require('storybook-readme/vue/updateWebpackConfig');

module.exports = ({ config, mode }) => {
  updateWebpackConfig(config);

  if (mode === 'PRODUCTION') {
    // ...
  }

  // config.module.rules.push({
  //   test: /\.css$/,
  //   use: ['style-loader', 'css-loader'],
  // });

  //  config.module.rules.push({
  //   resourceQuery: /blockType=docs/,
  //   use: ['storybook-readme/docs-loader', 'html-loader', 'markdown-loader'],
  // });

  return config;
};
