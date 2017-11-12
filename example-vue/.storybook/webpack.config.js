module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {},
          // other vue-loader options go here
        },
      },
    ],
  },
  resolve: {
    alias: {
      // vue: 'vue/dist/vue.js',
      vue$: 'vue/dist/vue.esm.js',
    },
  },
};
