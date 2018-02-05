const chalk   = require('chalk'),
      ora     = require('ora'),
      path    = require('path'),
      rimraf  = require('rimraf'),
      webpack = require('webpack');

const webpackConfig = require('./webpack.config');


const distDir = path.resolve(__dirname, '..', 'dist'),
      spinner = ora('Building for production...').start();
rimraf(distDir, error => {
    if (error) {
        spinner.stop();
        throw error;
    }
    webpack(webpackConfig, (error, stats) => {
        spinner.stop();
        if (error) {
            throw error;
        }
        console.log(stats.toString({
            colors:       true,
            modules:      false,
            children:     false,
            chunks:       false,
            chunkModules: false
        }));
        console.log('');
        console.log(chalk.cyan(' => Build complete !'));
    });
});
