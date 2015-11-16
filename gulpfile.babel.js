import gulp from 'gulp';
import webpack from 'webpack';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import express from 'express';
import nodemon from 'nodemon';
import path from 'path';
import request from 'request';
import mkdirp from 'mkdirp';

import configs from './webpack.config';
const [ frontendConfig, backendConfig ] = configs;

gulp.task('dev', [ 'directories' ], () => {
  const compiler = webpack(frontendConfig);

  const server = express();

  // proxy requests to api
  server.use(backendConfig.app.url.api, (req, res) => {
    request({
      url: 'http://localhost:' + backendConfig.app.port.backend + req.originalUrl,
      qs: req.query,
      method: req.method.toUpperCase()
    }).pipe(res);
  });

  server.use(backendConfig.app.url.static, express.static(backendConfig.app.path.static));
  server.use(WebpackDevMiddleware(compiler));
  server.use(WebpackHotMiddleware(compiler));

  server.listen(backendConfig.app.port.frontend, (err) => {
    if (err)
      return console.log(err);
    console.log('webpack-dev-server listening on:' + backendConfig.app.port.frontend);
  });
});

gulp.task('backend-watch', () => {
  webpack(backendConfig).watch(100, (err) => {
    if (err)
      return console.log(err);
    nodemon.restart();
  });
});

gulp.task('server', ['directories', 'backend-watch'], () => {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(backendConfig.app.path.build, 'server.js'),
    // Do not watch any directory/files to refresh.
    // All refreshes should be manual
    watch: ['foo/'],
    ext: 'noop',
    ignore: ['*']
  }).on('restart', () => {
    console.log('nodemon: restart');
  });
});

gulp.task('directories', () => {
  mkdirp(backendConfig.app.path.database, (err) => {
    if (err)
      console.log('Could not make database directory: "' + backendConfig.app.path.database + '" - ' + err);
  });
  mkdirp(backendConfig.app.path.static, (err) => {
    if (err)
      console.log('Could not make static directory: "' + backendConfig.app.path.static + '" - ' + err);
  });
});

gulp.task('default', ['dev', 'server']);