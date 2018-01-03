const path = require('path');
const updateWebpackConfig = require('storybook-readme/env/vue/updateWebpackConfig');

module.exports = storybookBaseConfig => {
  updateWebpackConfig(storybookBaseConfig);

  // ----------------
  // NOTE: this alias is needed only for this example
  // ----------------
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
