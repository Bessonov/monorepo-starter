const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { isDev, isProd, config } = require('../../webpack.common.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

// release path is used for cache forever strategy on CDN Usage:
// RELEASE_PATH=/version pnpm build
const RELEASE_PATH = process.env.RELEASE_PATH ?? '/'

// should css go into separate file?
// Probably, it's better to inline small css files.
const EXTRACT_CSS = process.env.EXTRACT_CSS === 'true'

module.exports = merge(config({
	context: __dirname,
}), {
	name: 'frontend',
	target: 'web',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist', ...RELEASE_PATH.split('/')),
		publicPath: RELEASE_PATH,
	},
	devtool: false,
	devServer: {
		hot: true,
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
		isDev && new webpack.HotModuleReplacementPlugin(),
		isDev && new ReactRefreshWebpackPlugin(),
		isProd && EXTRACT_CSS && new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './public/index.html',
			favicon: './public/favicon.ico',
		}),
		isProd && new webpack.SourceMapDevToolPlugin({
			// same as 'source-map'
			// https://stackoverflow.com/questions/52228650/configure-sourcemapdevtoolplugin-to-generate-source-map/55282204#55282204
			filename: "[file].map[query]",
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
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
						getCustomTransformers: () => ({
							before: isDev ? [ReactRefreshTypeScript()] : [],
						}),
					},
				},
			},
			isProd && {
				test: /\.js$/,
				enforce: "pre",
				use: ["source-map-loader"],
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					isProd && EXTRACT_CSS && {
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