const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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
		bundle: './src/main.ts',
		vendor: VENOR
	},
	// 如果想修改 webpack-dev-server 配置，在这个对象里面修改
	devServer: {
		port: 8081
	},
	output: {
		path: path.join(__dirname, 'dist'),
		// chunkhash 在 dev 会出错, prodution 的时候改回来就好
		filename: '[name].[hash].js'
	},
	resolve: {
	// 文件扩展名，写明以后就不需要每个文件写后缀
		extensions: ['.js', '.ts', '.vue', '.json'],
		alias: {
			'@': resolve('src'),
			// 不加会报: You are using the runtime-only build of Vue where the template compiler is not available
			'vue$': 'vue/dist/vue.esm.js',
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
						stylus: ExtractTextPlugin.extract({
							use: ['css-loader', 'stylus-loader'],
							fallback: 'vue-style-loader'
						})
					}
				}
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
				include: [resolve('src')]
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
					// ExtractTextPlugin 这个插件要求把 style-loader 放在 fallback...
					fallback: 'style-loader',
					use: [
						{loader: 'css-loader'},
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
};