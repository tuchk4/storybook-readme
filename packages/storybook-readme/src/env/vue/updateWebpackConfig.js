const path = require('path');

const docsLoader = path.resolve(__dirname, 'docs-loader');

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules = storybookBaseConfig.module.rules.map(
    rule => {
      if (rule.loader && rule.loader.indexOf('vue-loader') !== -1) {
        return Object.assign({}, rule, {
          options: Object.assign({}, rule.options, {
            loaders: {
              docs: [
                // 'storybook-readme/env/vue/docs-loader',
                docsLoader,
                'html-loader',
                'markdown-loader',
              ],
            },
          }),
        });
      }

      return rule;
    }
  );

  return storybookBaseConfig;
};
