var webpack = require('webpack');
var webpackConfig = require('./webpack.base');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var path = require('path');
var pkg = require('./package.json');

// Best for production
webpackConfig.devtool = 'hidden-source-map';
webpackConfig.eslint = webpackConfig.eslint ? webpackConfig.eslint : {};
webpackConfig.eslint.emitWarning = true;

webpackConfig.entry = {
  app: './index.js',
  vendor: Object.keys(pkg.dependencies)
};

webpackConfig.module.loaders.push(
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'webpack-strip',
    query: {
      strip: ['console.debug', 'console.log']
    }
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
      notExtractLoader: 'style-loader',
      loader: 'css?minimize&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss!sass'
    })
  }
);

webpackConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.DefinePlugin({
    'process.env.DEBUG': false,
    'process.env.API_URL': process.env.API_URL,
    'process.env.API_ROOT': process.env.API_ROOT,
    'process.env.NODE_ENV': "'production'",
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor', filename: 'vendor.[hash].js'
  }),
  new ExtractTextPlugin({
    filename: 'style.[contenthash].css',
    allChunks: true
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    compress: {
      unused: true,
      dead_code: true,
      warnings: false,
      screw_ie8: true
    },
    output: {
      comments: false
    },
    sourceMap: false
  }),
  new webpack.BannerPlugin('Copyright 2016 NTU Crysis - All rights reserved.'),
  new webpack.NoErrorsPlugin()
);

module.exports = webpackConfig;
