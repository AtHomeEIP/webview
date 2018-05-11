const CopyPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlPlugin = require('html-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    Path = require('path'),
    VueLoaderPlugin = require('vue-loader/lib/plugin');


const DIR_DIST = Path.resolve(__dirname, '..', 'dist'),
    DIR_SRC = Path.resolve(__dirname, '..', 'src'),
    DIR_SRC_APP = Path.resolve(DIR_SRC, 'app'),
    DIR_SRC_CSS = Path.resolve(DIR_SRC, 'css'),
    DIR_STATIC = Path.resolve(__dirname, '..', 'static'),
    NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development',
    PROD_ENV = NODE_ENV === 'production';

module.exports = {
    mode: NODE_ENV,

    entry: {
        app: [
            Path.resolve(DIR_SRC_APP, 'index.ts'),
            Path.resolve(DIR_SRC_CSS, 'styles.scss')
        ]
    },
    output: {
        filename: PROD_ENV ? '[name].[chunkhash:8].js' : '[name].js',
        path: DIR_DIST
    },
    resolve: {
        alias: {
            '@app': DIR_SRC_APP,
            '@css': DIR_SRC_CSS,
            '@static': DIR_STATIC,
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.ts', '.js', '.vue', '.json']
    },

    devServer: {
        contentBase: DIR_DIST,
        host: '0.0.0.0',
        noInfo: true,
        open: true,
        overlay: { errors: true, warning: false },
        port: 3000
    },
    devtool: PROD_ENV ? false : 'cheap-module-eval-source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                enforce: 'pre',
                use: 'source-map-loader'
            },
            {
                test: /\.s?css$/,
                include: [DIR_SRC_APP, DIR_SRC_CSS, DIR_STATIC],
                use: ['css-hot-loader', ...ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })]
            },
            {
                test: /\.ts$/,
                include: [DIR_SRC_APP],
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test: /\.vue$/,
                include: [DIR_SRC_APP],
                loader: 'vue-loader',
                options: { esModule: true }
            },
            {
                test: /\.(gif|jpe?g|png|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: Path.join('static', 'img', '[name].[hash:8].[ext]')
                }
            },
            {
                test: /\.(eot|otf|ttf|woff2?)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: Path.join('static', 'fonts', '[name].[hash:8].[ext]')
                }
            }
        ]
    },

    plugins: [
        // HTML
        new HtmlPlugin({
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true
            },
            template: Path.resolve(DIR_SRC, 'index.html')
        }),
        // CSS
        new ExtractTextPlugin({
            allChunks: true,
            filename: PROD_ENV ? 'styles.[md5:contenthash:hex:8].css' : 'styles.css'
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        }),
        // Assets
        new CopyPlugin([
            { from: '**/*', to: 'static' }
        ], {
            context: DIR_STATIC,
            ignore: ['.*']
        }),
        // VueJS
        new VueLoaderPlugin()
    ],

    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    test: module => {
                        return module.context && module.context.includes('node_modules');
                    }
                }
            }
        }
    }
};
