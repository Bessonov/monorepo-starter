const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { isDev, isProd, config } = require('../../webpack.common.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

// release path is used for cache forever strategy on CDN. Usage:
// RELEASE_PATH=/version pnpm build
const RELEASE_PATH = process.env.RELEASE_PATH ?? ''

module.exports = merge(config({
	context: __dirname,
}), {
	name: 'frontend',
	target: 'web',
	entry: './build/index.js',
	output: {
		path: path.resolve(__dirname, 'dist', ...RELEASE_PATH.split('/')),
		publicPath: RELEASE_PATH,
	},
	devServer: {
		host: '0.0.0.0',
	},
	optimization: {
		minimizer: [
			// special webpack syntax to include default optimizers
			`...`,
			isProd && new CssMinimizerPlugin(),
		].filter(Boolean),
	},
	plugins: [
		isDev && new ReactRefreshWebpackPlugin(),
		new MiniCssExtractPlugin({
			experimentalUseImportModule: true,
		}),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './public/index.html',
			favicon: './public/favicon.ico',
		}),
		isProd && new webpack.SourceMapDevToolPlugin({
			// same as 'source-map'
			// https://stackoverflow.com/questions/52228650/configure-sourcemapdevtoolplugin-to-generate-source-map/55282204#55282204
			filename: '[file].map[query]',
			// TODO: set url for private deployment
			// TODO: probably better do that with sed while deployment
			// publicPath: 'https://api.example.com/project/',
		}),
		isProd && new CompressionPlugin({
			include: /(\.js|\.css)$/,
		}),
	].filter(Boolean),
	module: {
		rules: [
			isProd && {
				test: /\.js$/,
				exclude: /node_modules/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
			{
				test: /\.css$/i,
				// https://stackoverflow.com/questions/55505894/webpack-mini-css-extract-plugin-not-outputting-css-file/60482491#60482491
				sideEffects: true,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
						},
					},
					'css-loader',
					'postcss-loader',
				].filter(Boolean),
			},
			{
				test: /\.svg$/,
				type: 'asset/resource'
			},
		].filter(Boolean),
	},
})
