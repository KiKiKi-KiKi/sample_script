var gulp = require("gulp"),
    sass = require("gulp-sass"),
    //compass = require('gulp-compass'),
    autoprefixer = require("gulp-autoprefixer"),
    plumber = require("gulp-plumber"),
    concat = require("gulp-concat"),
    minifyCss = require("gulp-minify-css");

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
    .pipe(concat('all.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('css', ['compass']);

gulp.task('default', function() {
  gulp.watch(['asset/scss/*.scss'], ['css']);
});
