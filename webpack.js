const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    main: './src/assets/js/main.js',
  },
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name].js',
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {test: /\.vue$/, use: 'vue-loader'},
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
