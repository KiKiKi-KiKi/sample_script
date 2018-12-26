const gulp = require('gulp'),
      browserSync = require('browser-sync');

// dir
const webroot = './webroot/'

// server
const server = (cb) => {
  browserSync.init({
    server: {
      port: 3000,
      baseDir: webroot,
      index: 'index.html'
    }
  });
  cb();
};

const reload = (cb) => {
  console.log('>> reload');
  browserSync.reload();
  cb();
};

const watch = (cb) => {
  console.log('>> watch start');
  gulp.watch([`${webroot}*.html`], gulp.series( reload ));
  cb();
};

// default
gulp.task('default', gulp.series(server, watch))
