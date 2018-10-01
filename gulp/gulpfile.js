// gulp v4
"use strict"
const gulp        = require('gulp'),
      plumber     = require('gulp-plumber'),
      rename      = require('gulp-rename'),
      runSequence = require('run-sequence'),
      stylus      = require('gulp-stylus'),
      nib         = require('nib'),
      gulpPrefix  = require("gulp-autoprefixer"),
      prefix      = require("autoprefixer-stylus"),
      rupture     = require('rupture');

const devDir  = '.',
      destDir = './webroot';

// ------------------------
// task
// ------------------------
// use gulp-autoprefixer
gulp.task('stylus', function() {
  let basePath = devDir + '/stylus',
      files = basePath + '/**/*.styl',
      destPath = destDir + '/assets/css';

  return gulp.src( files, {base: basePath} )
    .pipe( plumber() )
    .pipe( stylus({
      import: ['nib'],
      use:    [nib()],
      compress: false,
      linenos:  false
    }) )
    .pipe( gulpPrefix({
      browsers: ['last 2 versions', '> 1% in JP', 'ie >= 10'],
      cascade: true,
      grid: true
    }) )
    .pipe( rename({
      basename: 'page',
      extname:  '.css'
    }) )
    .pipe( gulp.dest( destPath ) );
});

// use autoprefixer-stylus
gulp.task('stylus:autoPrefix', function() {
  let files = devDir + '/stylus/**/*.styl',
      destPath = destDir + '/assets/css';

  return gulp.src( files )
    .pipe( plumber() )
    // autoprefixer-stylus
    .pipe( stylus({
      import: ['nib'],
      use: [nib(), prefix({
        browsers: ['last 2 versions', '> 1% in JP', 'ie >= 10'],
        cascade: true
      })],
      compress: false,
      linenos:  false
    }) )
    .pipe( rename(function(path) {
      console.log(path);
      path.basename = 'page';
    }) )
    .pipe( gulp.dest( destPath ) );
});

// --------------------------------
// Watch
// --------------------------------
gulp.task('watch:css', function() {
  gulp.watch([
    devDir + '/stylus/**/*.styl'
  ], gulp.series('stylus'));
});

// default
gulp.task('default', gulp.series('watch:css') );
