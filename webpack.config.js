var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/static/'
  },
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
