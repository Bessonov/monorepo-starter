const { merge } = require('webpack-merge')
const NodemonPlugin = require('nodemon-webpack-plugin')
const {
	config,
	isDev,
} = require('../../webpack.common.config.js')

module.exports = merge(config({
	context: __dirname,
}), {
	name: 'backend',
	target: 'node',
	entry: './src/index.ts',
	resolve: {
		extensions: ['.ts', '.js'],
	},
	optimization: {
		minimize: false,
		moduleIds: 'named',
		mangleExports: false,
	},
	plugins: [
		isDev && new NodemonPlugin({
			delay: '100',
			exec: 'kill-port --port 3000,9228 > /dev/null; node -r source-map-support/register --inspect=0.0.0.0:9228',
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
					},
				},
			},
		],
	},
})