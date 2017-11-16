/* eslint-disable */
require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');
const NwBuilder = require('nw-builder');
const globby = require('globby');
const { spawn } = require('child_process');
const fs = require('fs');

var spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (err) => {
  if(err) throw err;
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if(err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Webpack build complete.\n'));

    spinner = ora('generating license credits...');
    spinner.start();

    const creditsStream = fs.createWriteStream('./nwjs/src/credits.html', { flags: 'w+' });

    const nls = spawn('./node_modules/.bin/node-license-sniffer', ['--recurse', '--body']);

    nls.stdout.pipe(creditsStream);

    nls.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    nls.on('close', (code) => {
      spinner.stop();
      console.log(chalk.yellow('  Starting NWJS build...\n'));

      spinner = ora('installing required packages for nwjs application...');
      spinner.start();

      const npm = spawn('npm', ['i'],  { cwd: './nwjs' });

      npm.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      npm.on('close', (code) => {
        spinner.stop();
        buildNwjs();
      });
    });
  });
});

// buildNwjs();

function buildNwjs() {
  var spinner = ora('building nwjs...');
  spinner.start();

  // globby([]).then((paths) => {
    var nwb = new NwBuilder({
      files: __dirname + '/../dist/**/**',
      platforms: ['osx64', 'win64'],
      //flavor: 'normal',
      flavor: 'sdk',
      cacheDir: path.resolve(__dirname, '..', 'nwjs', 'cache'),
      buildDir: path.resolve(__dirname, '..', 'nwjs', 'build'),
      macCredits: path.resolve(__dirname, '..', 'nwjs', 'src', 'credits.html'),
      macIcns: path.resolve(__dirname, '..', 'nwjs', 'src', 'icon.icns'),
      winIco: path.resolve(__dirname, '..', 'nwjs', 'src', 'icon.ico')
    });

    nwb.on('log', console.log);

    nwb.build().then(() => {
      spinner.stop();
      console.log(chalk.cyan('  NWJS build complete.\n'));
    }).catch((error) => {
      console.error(error);
      spinner.stop();
      process.exit();
    });
  // });
}
