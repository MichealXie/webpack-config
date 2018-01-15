var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const VENOR = [
    "axios",
    "vue",
    "vue-router",
    "vuex"
]

module.exports = {
	entry: {
		bundle: './src/main.js',
		vendor: VENOR
	},
	// 如果想修改 webpack-dev-server 配置，在这个对象里面修改
	devServer: {
		port: 8081
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[hash].js'
	},
	resolve: {
	// 文件扩展名，写明以后就不需要每个文件写后缀
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
		}
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						stylus: 'vue-style-loader!css-loader!stylus-loader'
					},
					 extractCSS: true
				}
			},
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'images/[name].[hash:7].[ext]'
					}
				}]
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						// 这边其实还可以使用 postcss 先处理下 CSS 代码
						loader: 'css-loader'
					}]
				})
			},
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['vendor', 'manifest'],
			minChunks: Infinity
		}),
		new CleanWebpackPlugin(['dist/*.js', 'dist/css/*.css'], {
			verbose: true,
			dry: false
		}),
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		// 生成全局变量
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("process.env.NODE_ENV")
		}),
		// 分离 CSS 代码
		new ExtractTextPlugin("css/[name].[contenthash].css"),
		// 压缩提取出的 CSS，并解决ExtractTextPlugin分离出的 JS 重复问题
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		// 压缩 JS 代码
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};