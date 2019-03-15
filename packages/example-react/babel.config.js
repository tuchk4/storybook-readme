// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/react',
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
};
