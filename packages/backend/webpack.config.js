const { merge } = require('webpack-merge')
const { config } = require('../../webpack.common.config.js')

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