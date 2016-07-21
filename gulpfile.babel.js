import gulp from 'gulp';
import gUtil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import genConfig from './webpack.config.js';

const PORT = 2016;
const dist = 'build';
const env = {
  publicPath: `http://127.0.0.1:${PORT}/`
};


gulp.task('build', (cb) => {
  webpack(genConfig({
    dist: dist,
    publicPath: env.publicPath,
    isDev: false
  }), function(err, stats) {
    if(err) throw new gUtil.PluginError('webpack', err);
    gUtil.log('[webpack]', stats.toString());
    cb();
  });
});

gulp.task('dev', () => {

  var config = genConfig({
    isDev: true,
    publicPath: env.publicPath,
    dist: dist
  });

  var compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
    contentBase: __dirname,
    publicPath: env.publicPath,
    hot: false,
    noInfo: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    },
    stats: {
      colors: true
    }
  });

  server.listen(PORT, (err) => {
    if(err) throw new gUtil.PluginError('webpack-dev-server', err);
    gUtil.log('[webpack-dev-server]', env.publicPath);
  });

});