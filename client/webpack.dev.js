var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.base');

webpackConfig.plugins = (webpackConfig.plugins) ? webpackConfig.plugins : [];

// add HMR related entries
webpackConfig.entry.main.unshift(
  './node_modules/react-hot-loader/patch',
  './node_modules/webpack-dev-server/client?http://localhost:8080',
  './node_modules/webpack/hot/only-dev-server'
);

webpackConfig.output.filename = 'app.js'; // no need to add the hash in dev

// TODO: use LoaderOptionsPlugin instead of defining options inline
webpackConfig.module.rules.push(
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]-[local]'
        }
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          sourceComments: true
        }
      }
    ]
  }
);

webpackConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({
    options: {
      sassLoader: { // define options here => sass-loader requires context
        includePaths: [path.resolve(__dirname, 'components', 'static')]
      },
      context: '/'
    }
  })
);

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.DEBUG': true,
    'process.env.API_URL': "''",
    'process.env.API_ROOT': "''",
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
  })
);

// HMR
webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

webpackConfig.devServer = {
  contentBase: './static',
  historyApiFallback: true,
  hot: true,
  inline: true,
  progress: true,
  // Display only errors to reduce the amount of output.
  stats: 'errors-only',
};

module.exports = webpackConfig;
