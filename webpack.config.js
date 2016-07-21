var webpack = require('webpack');


var path = require('path');

module.exports = function (options) {
  options = options || {};

  var isDev = options.isDev;

  var plugins = [];
  if (!isDev) {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }));
  }

  return {
    entry: {
      index: './src/index.js'
    },
    output: {
      path: path.join(__dirname, options.dist),
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      publicPath: options.publicPath,
      sourceMapFilename: "debugging/[file].map"
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'eslint-loader'
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
        },
        {
          test: /\.txt$/,
          loader: 'raw-loader'
        },
        {
          test: /\.json/,
          loader: 'json-loader'
        },
        {
          test: /\.css/,
          loader: 'style-loader!css-loader'
        }
      ]
    },

    plugins: plugins
  };
};
