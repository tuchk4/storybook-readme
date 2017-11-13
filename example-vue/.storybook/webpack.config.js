const path = require('path');
const docsLoader = path.resolve(
  __dirname,
  '..',
  '..',
  'env',
  'vue',
  'docs-loader'
);

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules = storybookBaseConfig.module.rules.map(
    rule => {
      if (rule.loader.indexOf('vue-loader') !== -1) {
        return Object.assign({}, rule, {
          options: Object.assign({}, rule.options, {
            loaders: {
              docs: [docsLoader, 'html-loader', 'markdown-loader'],
            },
          }),
        });
      }

      return rule;
    }
  );

  storybookBaseConfig.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: 'html-loader',
      },
      {
        loader: 'markdown-loader',
      },
    ],
  });

  return storybookBaseConfig;
};
