module.exports = {
  testURL: 'http://localhost',
  transform: {
    '^.+\\.md?$': 'markdown-loader-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@babel/runtime)/).*/'],
};
