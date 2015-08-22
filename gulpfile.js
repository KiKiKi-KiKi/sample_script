var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    concat = require("gulp-concat"),
    bower = require('main-bower-files'),
    rename = require('gulp-rename'),
    gulpFilter = require('gulp-filter'),
    // CSS
    sass = require("gulp-sass"),
    //compass = require('gulp-compass'),
    autoprefixer = require("gulp-autoprefixer"),
    minifyCss = require("gulp-minify-css"),
    less = require('gulp-less'),
    // JS
    uglify = require("gulp-uglify");

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

gulp.task('default', function() {
  gulp.watch(['asset/scss/*.scss'], ['css']);
});
