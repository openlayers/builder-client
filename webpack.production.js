var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react']
      },
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  }
};
