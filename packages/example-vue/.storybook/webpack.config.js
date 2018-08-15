const path = require('path');
const updateWebpackConfig = require('storybook-readme/env/vue/updateWebpackConfig');

module.exports = storybookBaseConfig => {
  // updateWebpackConfig(storybookBaseConfig);

  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  });

  storybookBaseConfig.module.rules.push({
    resourceQuery: /blockType=docs/,
    use: [
      'storybook-readme/env/vue/docs-loader',
      'html-loader',
      'markdown-loader',
    ],
  });
  // ----------------
  // NOTE: this alias is needed only for this example
  // ----------------
  if (!storybookBaseConfig.resolve.alias) {
    storybookBaseConfig.resolve.alias = {};
  }

  Object.assign(storybookBaseConfig.resolve.alias, {
    '@storybook/addons': path.resolve(
      __dirname,
      '..',
      'node_modules',
      '@storybook',
      'addons'
    ),
  });

  return storybookBaseConfig;
};
