const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, './build');
const ASSETS_PATH = path.resolve(__dirname, './src/js');
const STATIC_PATH = path.resolve(__dirname, './public')

const isDev = process.env.NODE_ENV === "development";
const withHotReload = "webpack-hot-middleware/client?path=/__webpack_hmr&reload=true";
const app = isDev ? [path.join(ASSETS_PATH, "/index.tsx"), withHotReload] : path.join(ASSETS_PATH, "/index.tsx");


var webpack_config = {
	mode: (isDev) ? "development" : "production",

	context: __dirname,

	entry: {
		main: [
			"react",
			"react-dom",
			"react-router"
		],
		react_app : app
	},

	output: {
		path: BUILD_DIR,
		filename: 'js/[name].min.js',
		publicPath: '/build',
		hotUpdateChunkFilename: '.hot/hot-update.js',
		hotUpdateMainFilename: '.hot/hot-update.json',
	},

	resolve: {
		extensions: [' ', '.web.js', '.ts', '.tsx', '.js', '.jsx', 'css'],
	},

	devtool: isDev
		? "eval-source-map" : "source-map",

	watchOptions: {
		poll: true
	},

	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				use: ['babel-loader?compact=true&comments=true&minified=true', 'eslint-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.(ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '/css/fonts/'
					}
				}
			},
			{
				test: /\.(eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '/css/media/'
					}
				}
			},
			{
				test: /\.jpe?g$|\.ico$|\.gif$|\.png$/,
				exclude: /node_modules/,
				use: {
					loader: 'file-loader',
					options: {
						limit: 1024 * 10,
						name: '[name].[ext]',
						outputPath: 'images/'
					}
				}
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {}
					}
					, 'css-loader'],
			},
		]
	}
	,

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: ' Appointment-APP | Stefanini EMEA ',
			template: './public/index.html',
			filename: path.join(BUILD_DIR, '/index.html'),
			chunks: ['main', 'react_app']
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join(STATIC_PATH, '/images'),
					to: path.join(BUILD_DIR, '/images'),
					toType: 'dir'
				},
			]
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: '[id].css',
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.min\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {discardComments: {removeAll: true}},
			canPrint: true
		}),
	],

	stats: {
		env: true,
		colors: true,
		builtAt: true,
		warnings: true,
		errors: true,
		errorDetails: true,
		children: false,
		assets: true,
		entrypoints: true,
		chunks: true,
		chunksSort: "size",
		modules: false,
		modulesSort: "size",
		logging: true,
		loggingTrace: true,
		moduleTrace: true,
	},

	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	}
};

module.exports = webpack_config;