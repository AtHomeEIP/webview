const { config } = require('dotenv');
const { join } = require('path');
const { IgnorePlugin } = require('webpack');

config();

const DIST_DIR = join(__dirname, 'dist');
const SRC_DIR = join(__dirname, 'src');

const ENV = process.env.NODE_ENV || 'development';
const PROD_ENV = ENV === 'production';

module.exports = {
	mode: ENV,

	entry: {
		app: join(SRC_DIR, 'index.tsx'),
	},
	output: {
		filename: 'js/[name].js',
		path: DIST_DIR,
		publicPath: '/',
	},
	resolve: {
		alias: {
			'@api': join(SRC_DIR, 'api'),
			'@components': join(SRC_DIR, 'components'),
			'@i18n': join(SRC_DIR, 'i18n'),
			'@pages': join(SRC_DIR, 'pages'),
			'@store': join(SRC_DIR, 'store'),
			'react$': PROD_ENV ? 'react/umd/react.production.min.js' : 'react/umd/react.development.js',
			'react-dom$': PROD_ENV ? 'react-dom/umd/react-dom.production.min.js' : 'react-dom/umd/react-dom.development.js',
		},
		extensions: [
			'.ts', '.tsx',
			'.js', '.jsx',
			'.json',
		],
	},

	devtool: PROD_ENV ? 'source-map' : 'cheap-module-eval-source-map',

	devServer: {
		clientLogLevel: 'warning',
		compress: true,
		contentBase: [DIST_DIR],
		historyApiFallback: true,
		host: '0.0.0.0',
		overlay: {
			errors: true,
			warning: true,
		},
		port: parseInt(process.env.PORT, 10) || 3000,
		watchContentBase: true,
	},

	module: {
		rules: [{
			enforce: 'pre',
			test: /.(ts|tsx)$/,
			exclude: /node_modules/,
			use: [{
				loader: 'tslint-loader',
				options: {
					emitErrors: PROD_ENV,
					fix: PROD_ENV,
					typeCheck: true,
				},
			}],
		}, {
			test: /.(ts|tsx)$/,
			exclude: /node_modules/,
			loader: 'ts-loader',
		}],
	},
	plugins: [
		new IgnorePlugin(/locale/, /moment/),
	],

	optimization: {
		runtimeChunk: {
			name: 'manifest',
		},
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /node_modules/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
};
