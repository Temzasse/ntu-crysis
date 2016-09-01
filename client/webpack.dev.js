var webpack = require('webpack');
var webpackConfig = require('./webpack.base');

webpackConfig.plugins = (webpackConfig.plugins) ? webpackConfig.plugins : [];

webpackConfig.entry.unshift( //'./webpack-public-path',
  'react-hot-loader/patch',
  'webpack/hot/dev-server'
);

webpackConfig.output.filename = 'app.js'; // no need to add the hash in dev

webpackConfig.module.loaders.push(
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    loaders: [
      { loader: 'style-loader', query: { sourceMap: true } },
      {
        loader: 'css-loader',
        query: {
          sourceMap: true,
          modules: true,
          importLoaders: 3,
          localIdentName: '[name]-[local]'
        }
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        query: {
          sourceMap: true, sourceComments: true
        }
      }
    ]
  }
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
