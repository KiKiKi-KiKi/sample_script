var gulp = require("gulp"),
    sass = require("gulp-sass"),
    //compass = require('gulp-compass'),
    autoprefixer = require("gulp-autoprefixer"),
    plumber = require("gulp-plumber");

gulp.task("compass", function() {
  gulp.src('asset/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("asset/css"));
});

gulp.task('css', ['compass']);

gulp.task('default', function() {
  gulp.watch(['asset/scss/*.scss'], ['css']);
});
