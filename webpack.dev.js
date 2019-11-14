const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ip = require('ip');

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
  devServer: {
    host: ip.address(),
    port: 8080,
    contentBase: './dist'
  },
});