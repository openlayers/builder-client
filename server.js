var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(3000, 'localhost', function(err) {
  if (err) {
    process.stderr.write(err.message + '\n');
  }

  process.stdout.write('Listening at http://localhost:3000/\n');
});
