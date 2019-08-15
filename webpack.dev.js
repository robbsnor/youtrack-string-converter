const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
  	rules: [
  		{
  		  test: /\.(sa|sc|c)ss$/,
  		  use: [
  		    'style-loader',
  		    'css-loader',
  		    'sass-loader'
  		  ]
  		}
  	]
  },
  // devtool: 'inline-source-map',
  devServer: {
    host: '192.168.0.106',
    port: 8080,
    contentBase: './dist'
  }
});