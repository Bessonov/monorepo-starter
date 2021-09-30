const path = require('path')
const webpack = require('webpack')
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
			cache: {
				type: 'filesystem',
			},
			output: {
				path: path.resolve(context, './dist'),
				filename: 'index.js',
				// webpack process files in memory and because of that vsc can't resolve
				// source maps. The workaround is from
				// https://gist.github.com/jarshwah/389f93f2282a165563990ed60f2b6d6c
				devtoolModuleFilenameTemplate: isDev ? 'file://[absolute-resource-path]' : undefined,
			},
			devtool: 'source-map',
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
			},
		}
	}
}