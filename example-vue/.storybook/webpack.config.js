const path = require('path');
const docsLoader = path.resolve(__dirname, '..', '..', 'vue', 'docs-loader');

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules = storybookBaseConfig.module.rules.map(
    rule => {
      if (rule.loader.indexOf('vue-loader') !== -1) {
        return Object.assign({}, rule, {
          options: Object.assign({}, rule.options, {
            loaders: {
              docs: docsLoader,
            },
          }),
        });
      }

      return rule;
    }
  );

  storybookBaseConfig.module.rules.push({
    test: /\.md$/,
    loader: 'raw-loader',
  });

  return storybookBaseConfig;
};
