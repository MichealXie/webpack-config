const common = require('./webpack.common.js')
const merge = require('webpack-merge')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
	module: {
		rules: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				// ExtractTextPlugin 这个插件要求把 style-loader 放在 fallback...
				fallback: 'style-loader',
				use: [
					{ loader: 'css-loader' },
					//https://github.com/postcss/postcss-loader
					{
						loader: 'postcss-loader',
						options: {
							// 只要路径就可以用, 真方便
							config: resolve('postcss.config.js')
						}
					},
				]
			})
		},]
	},
	plugins: [
		// 分离 CSS 代码
		new ExtractTextPlugin("css/[name].[contenthash].css"),
		// 压缩提取出的 CSS，并解决ExtractTextPlugin分离出的 JS 重复问题
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		// 压缩 JS 代码
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			},
			sourceMap: true,
			parallel: true
		}),
		
	]
});