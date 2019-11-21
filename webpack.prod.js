const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
  	rules: [
  		{
  		  test: /\.(sa|sc|c)ss$/,
  		  use: [
  		    MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: 'postcss.config.js'
							}
						}
					},
  		    'sass-loader'
  		  ]
  		}
  	]
  },
  plugins: [
  	new MiniCssExtractPlugin(
  		{
  			filename: '[name].[contenthash].css'
  		}
		),
  	new CleanWebpackPlugin()
  ],
  optimization: {
  	minimizer: [
  		new OptimizeCssAssetsPlugin({
        // remove comments from css
        cssProcessorPluginOptions: { preset: ['default', { discardComments: { removeAll: true } }]}
      }),
  		new TerserPlugin({
        // remove comments from js
        terserOptions: { output: {comments: false} }
      })
  	]
  }
});