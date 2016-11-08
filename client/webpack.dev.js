var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.base');

webpackConfig.plugins = (webpackConfig.plugins) ? webpackConfig.plugins : [];

// add HMR related entries
// webpackConfig.entry.main.unshift(
//   './node_modules/react-hot-loader/patch',
//   './node_modules/webpack-dev-server/client?http://localhost:8080',
//   './node_modules/webpack/hot/only-dev-server'
// );

webpackConfig.entry.main.unshift(
  path.join(__dirname, 'node_modules', 'react-hot-loader', 'patch'),
  path.join(__dirname, 'node_modules', 'webpack-dev-server', 'client') + '?http://localhost:8080',
  path.join(__dirname, 'node_modules', 'webpack', 'hot', 'only-dev-server')
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
          localIdentName: '[folder]-[local]--[hash:base64:5]'
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
    'process.env.NEA_API_URL': JSON.stringify('http://api.nea.gov.sg/api/WebAPI/'),
    'process.env.NEA_API_KEY': JSON.stringify('781CF461BB6606AD1260F4D81345157FB37CFB554A5D5E6A'),
    'process.env.API_BASE': "'http://128.199.250.111:3003'",
    //'process.env.API_BASE': "'http://localhost:8000'",
    'process.env.API_ROOT': "'cms'",
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
  contentBase: path.resolve(__dirname, 'static'),
  historyApiFallback: true,
  hot: true,
  inline: true,
  progress: true,
  // Display only errors to reduce the amount of output.
  stats: 'minimal',
};

module.exports = webpackConfig;
