const Chalk = require('chalk'),
    Ora = require('ora'),
    Path = require('path'),
    Rimraf = require('rimraf'),
    Webpack = require('webpack');

const webpackConfig = require('./webpack.config');


const DIR_DIST = Path.resolve(__dirname, '..', 'dist'),
    SPINNER = Ora(),
    STATS_OPTIONS = {
        children: false,
        chunkModules: false,
        chunks: false,
        colors: true,
        modules: false
    };

SPINNER.start('Building for production...');
Rimraf(DIR_DIST, error => {
    if (error) {
        SPINNER.stop();
        throw error;
    }
    Webpack(webpackConfig, (error, stats) => {
        SPINNER.stop();
        if (error) {
            throw error;
        }
        console.log(stats.toString(STATS_OPTIONS));
        console.log('');
        console.log(Chalk.cyan(' => Build complete !'));
    });
});
