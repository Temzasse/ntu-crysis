/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

/**
  * This file contains the base configuration for client side webpack.
  * The base configuration is extended by environment specific configuration
  * files.
  *
  * Note that this file is NOT run through babel transpilation before execution.
  */

var webpackConfig = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    main: ['./index.js']
  },

  // When webpack bundles your application, the bundled file(s) need to be saved
  // somewhere. Settings under `output` affect this.
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    // The HtmlWebpackPlugin plugin will generate an HTML5 file for you that
    // includes all your webpack bundles in the body using script tags.
    new HtmlWebpackPlugin({
      title: 'Crysis',
      template: 'index.html.template',
      inject: 'body',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [autoprefixer];
        }
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: { cacheDirectory: '/tmp/' },
        loader: 'babel'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'index'), 'node_modules'],
    descriptionFiles: ['package.json'],
    mainFiles: ['index.prod', 'index'],
    extensions: ['.json', '.jsx', '.js'],
  }
}

module.exports = webpackConfig;
