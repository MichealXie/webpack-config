module.exports = {
	plugins: {
		// 在原生 css引入sass/stylus 等的 @import, 然而我全程 stylus....
		// 'postcss-import': {},
		"autoprefixer": { browsers: ['last 2 versions'] },
		'postcss-cssnext': {},
		// 压缩 css
		'cssnano': {},
		// "postcss-px-to-viewport": {
		// 	viewportWidth: 375,
		// 	viewportHeight: 667,
		// 	unitPrecision: 5,
		// 	viewportUnit: 'vw',
		// 	selectorBlackList: [],
		// 	minPixelValue: 1,
		// 	mediaQuery: false
		// },
	}
}