const copyPlugin              = require('copy-webpack-plugin'),
      extractTextPlugin       = require('extract-text-webpack-plugin'),
      htmlPlugin              = require('html-webpack-plugin'),
      optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      path                    = require('path'),
      uglifyJsPlugin          = require('uglifyjs-webpack-plugin'),
      webpack                 = require('webpack');


const distDir   = path.resolve(__dirname, '..', 'dist'),
      nodeEnv   = process.env.NODE_ENV === 'production' ? 'production' : 'development',
      prodEnv   = nodeEnv === 'production',
      srcDir    = path.resolve(__dirname, '..', 'src'),
      srcAppDir = path.resolve(srcDir, 'app'),
      srcCssDir = path.resolve(srcDir, 'css'),
      staticDir = path.resolve(__dirname, '..', 'static');

const webpackConfig = {
    entry:   {
        app: [
            path.resolve(srcAppDir, 'index.ts'),
            path.resolve(srcCssDir, 'styles.scss')
        ]
    },
    output:  {
        filename: prodEnv ? '[name].[chunkhash:8].js' : '[name].js',
        path:     distDir
    },
    resolve: {
        alias:      {
            '@app':    srcAppDir,
            '@css':    srcCssDir,
            '@static': staticDir,
            'vue$':    'vue/dist/vue.esm.js'
        },
        extensions: ['.ts', '.js', '.vue', '.json']
    },

    devServer: {
        contentBase: distDir,
        host:        '0.0.0.0',
        noInfo:      true,
        open:        true,
        overlay:     { errors: true, warning: false },
        port:        3000
    },
    devtool:   prodEnv ? false : 'cheap-module-eval-source-map',

    module: {
        rules: [
            {
                enforce: 'pre',
                test:    /\.js$/,
                exclude: [/node_modules/],
                use:     'source-map-loader'
            },
            {
                test:    /\.s?css$/,
                include: [srcAppDir, srcCssDir],
                use:     ['css-hot-loader', ...extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:      ['css-loader', 'sass-loader']
                })]
            },
            {
                test:    /\.ts$/,
                include: [srcAppDir],
                loader:  'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test:    /\.vue$/,
                include: [srcAppDir],
                loader:  'vue-loader',
                options: { esModule: true }
            },
            {
                test:    /\.(gif|jpe?g|png|svg)(\?.*)?$/,
                loader:  'url-loader',
                options: {
                    limit: 10000,
                    name:  path.join('static', 'img', '[name].[hash:8].[ext]')
                }
            },
            {
                test:    /\.(eot|otf|ttf|woff2?)(\?.*)?$/,
                loader:  'url-loader',
                options: {
                    limit: 10000,
                    name:  path.join('static', 'fonts', '[name].[hash:8].[ext]')
                }
            }
        ]
    },

    plugins: [
        // HTML
        new htmlPlugin({
            inject:   true,
            minify:   {
                collapseWhitespace:    true,
                removeAttributeQuotes: true,
                removeComments:        true
            },
            template: path.resolve(srcDir, 'index.html')
        }),
        // Assets
        new copyPlugin([
            { from: '**/*', to: 'static' }
        ], {
            context: staticDir,
            ignore:  ['.*']
        }),
        // CSS
        new extractTextPlugin({
            allChunks: true,
            filename:  prodEnv ? 'styles.[contenthash:8].css' : 'styles.css'
        }),
        new optimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        }),
        // JS
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(nodeEnv)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:      'vendor',
            minChunks: module => module.context && module.context.includes('node_modules')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:      'manifest',
            minChunks: Infinity
        })
    ]
};

if (prodEnv) {
    webpackConfig.plugins.push(
        new webpack.HashedModuleIdsPlugin(),
        new uglifyJsPlugin()
    );
}

module.exports = webpackConfig;
