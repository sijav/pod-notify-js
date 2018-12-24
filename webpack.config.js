const swPlug = require('serviceworker-webpack-plugin');
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		"pod-notify": './src/index.ts',
		"pod-notify.min":  './src/index.ts'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: [
					path.resolve(__dirname, "src")
				],
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.js$/,
				use: ["source-map-loader"],
				exclude: /serviceWorker\.js/,
				enforce: "pre"
			}
		]
	},
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty"
	},
	resolve: {
	  extensions: [ '.ts', '.js' ]
	},
	plugins: [
		new swPlug({
			entry: path.join(__dirname, 'src/serviceWorker.js'),
			filename: 'serviceWorker.min.js'
		})
	],
	optimization: {
		minimize: true,
		minimizer: [
			new UglifyJsPlugin({
				include: /\.min\.js$/,
				sourceMap: true,
				extractComments: true,
				uglifyOptions: {
					output: {
						comments: /@license/i
					}
				}
			}
		)]
	},
	output: {
		path: path.join(__dirname, "bin"),
		filename: "[name].js",
		library: "PodNotify",
		libraryExport: "default",
		libraryTarget: "umd"
	}
};