var gulp        = require("gulp"),
    webserver   = require('gulp-webserver'),
    bower       = require('main-bower-files'),
    gulpFilter  = require('gulp-filter'),
    plumber     = require("gulp-plumber"),
    concat      = require("gulp-concat"),
    rename      = require('gulp-rename'),
    runSequence = require('run-sequence'),
    // runSequence = require('gulp-run-sequence'),
    clean       = require('gulp-clean'),
    // jade
    jade = require("gulp-jade"),
    // CSS
    sass = require("gulp-sass"),
    //compass = require('gulp-compass'),
    autoprefixer = require("gulp-autoprefixer"),
    minifyCss    = require("gulp-minify-css"),
    less         = require('gulp-less'),
    // JS
    uglify = require("gulp-uglify"),
    jshint = require("gulp-jshint");

gulp.task('webserver', function() {
  gulp.src('./html')
    .pipe(webserver({
      livereload: true,
      port: 3000
    }));
});

// bower CSS
gulp.task('bowerCSS', function() {
  var cssDir = 'assets/css/',
      cssFilter  = gulpFilter('**/*.css', {restore: true}),
      scssFilter = gulpFilter('**/*.scss', {restore: true}),
      sassFilter = gulpFilter('**/*.sass', {restore: true}),
      lessFilter = gulpFilter('**/*.less', {restore: true});
  return gulp.src( bower({
      paths: {
        bowerJson: 'bower.json'
      }
    }) )
    .pipe( lessFilter )
    .pipe( less() )
    .pipe( concat('_bundle.css') )
    .pipe( gulp.dest(cssDir) )
    .pipe( minifyCss() )
    .pipe( rename({
      extname: '.min.css'
    }) )
    .pipe( gulp.dest(cssDir) )
    .pipe( lessFilter.restore );
});
// bower JS
gulp.task('bowerJS', function() {
  var jsDir = 'assets/js/',
      jsFilter = gulpFilter('**/*.js', {restore: true});
  return gulp.src( bower({
    paths: {
      bowerJson: 'bower.json'
    }
  }) )
  .pipe( jsFilter )
  .pipe( concat('_bundle.js') )
  .pipe( gulp.dest(jsDir) )
  .pipe( uglify({
    preserveComments: 'some'
  }) )
  .pipe( rename({
    extname: '.min.js'
  }) )
  .pipe( gulp.dest(jsDir) )
  .pipe( jsFilter.restore );
});

gulp.task('bower', ['bowerCSS', 'bowerJS']);

gulp.task("compass", function() {
  return gulp.src('assets/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("assets/css"));
});

gulp.task("cssmin", function(){
  return gulp.src([
      'assets/css/html5reset.css',
      'assets/css/slick.css',
      'assets/css/font-awesome.css'
    ])
    .pipe(concat('_all.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('css', ['compass']);

gulp.task('jade', function(cb) {
  var option = {
    pretty: true
  };
  // タスク振り分けの実験
  // refs. https://teratail.com/questions/6833
  console.log('this.seq:', this.seq);
  if( this.seq && this.seq.indexOf('release') >= 0 ) {
    // releaseから呼び出される時だけの処理
    console.log('>>> Rlease task');
    option.pretty = false;
  }
  if( this.seq && this.seq.indexOf('build') >= 0 ) {
    // buildから呼び出される時だけの処理
    console.log('>>> Build task');
  }

  return gulp.src(['jade/*.jade'])
    .pipe(plumber())
    .pipe(jade(option))
    .pipe(gulp.dest('html/'));
});

// タスク振り分けの実験
// refs. https://teratail.com/questions/6833
gulp.task('build', function(cb) {
  runSequence('jade', cb);
  // gulp.run(['jade', 'cssmin']);
});
gulp.task('release', function(cb) {
  runSequence('jade', cb);
  // gulp.run(['jade', 'cssmin']);
});

// jsHint
gulp.task('jsHint', function() {
  var options = {
    asi: false,
    immed: false,
    unused: true
  };
   return gulp.src( ['js/**/*.js'] )
    .pipe( jshint(options) )
    .pipe( jshint.reporter('jshint-stylish') );
});

// WATCH
gulp.task('default', ['webserver'], function() {
  gulp.watch(['asset/scss/*.scss'], ['css']);
  gulp.watch(['jade/*.jade', 'jade/**/*.jade'], ['jade']);
  gulp.watch(['js/**/*.js'], ['jsHint']);
});
