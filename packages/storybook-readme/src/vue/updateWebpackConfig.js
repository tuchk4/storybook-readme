const path = require('path');

const docsLoader = path.resolve(__dirname, 'docs-loader');

module.exports = function(config, configType) {
  // if (configType === 'PRODUCTION') {
  //
  // }

  config.module.rules.push({
    resourceQuery: /blockType=docs/,
    loaders: [
      // 'storybook-readme/vue/docs-loader',
      docsLoader,
      'html-loader',
      'markdown-loader',
    ],
  });

  return config;
};
