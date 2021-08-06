const path = require('path')
const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const mode = process.env.NODE_ENV ?? 'development'
const isProd = mode === 'production'
const isDev = !isProd

module.exports = {
	mode,
	isDev,
	isProd,
	config({
		context,
	}) {
		return {
			mode,
			cache: true,
			output: {
				path: path.resolve(context, './dist'),
				filename: 'index.js',
			},
			plugins: [
				// remove double compilation
				// https://github.com/TypeStrong/ts-loader#usage-with-webpack-watch
				new webpack.WatchIgnorePlugin({
					paths: [
						/\.js$/,
						/\.d\.ts$/,
						/\.map$/,
					]
				}),
				new ForkTsCheckerWebpackPlugin(),
			].filter(Boolean),
			resolve: {
				extensions: ['.tsx', '.ts', '.js'],
				fallback: {
					fs: false,
					buffer: false,
					stream: false,
					http: false,
					path: false,
					util: false,
				},
				plugins: [
					new TsconfigPathsPlugin({
						logLevel: 'info',
						mainFields: 'module',
						extensions: ['.tsx', '.ts'],
					})
				]
			},
		}
	}
}