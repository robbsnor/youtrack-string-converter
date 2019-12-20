const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ip = require('ip');

module.exports = merge(common, {
	mode: 'development',
	module: {
		rules: [{
			test: /\.(sa|sc|c)ss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
					},
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true,
					},
				},
			],
		}]
	},
	devServer: {
		host: ip.address()
	},
});