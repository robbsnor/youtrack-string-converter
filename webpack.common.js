const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    vendor: './src/js/vendor.js',
    app: './src/js/index.js'
  },
  module: {
  	rules: [ 
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'img',
            folder: 'src/assets/patterns'
          }
        }
      }
  	]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html',
      // favicon: 'src/assets/favicon/logo.png'
    }),
    new webpack.ProvidePlugin({
      // use jQuery in all js files
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  devtool: 'inline-source-map'
};