"use strict";

const gulp = require('gulp');

// TASK
function task1(done) {
  console.log('task 1');
  setTimeout(function() {
    console.log('task 1 >> 1100ms');
    done();
  }, 1100);
}

function task2(done) {
  console.log('task 2');
  setTimeout(function() {
    console.log('task 2 >> 1000ms');
    done();
  }, 1000);
}

function task3(done) {
  console.log('task 3');
  done();
}

// Default
gulp.task('default', gulp.series(gulp.parallel(task1, task2), task3, function(done) {
  console.log('default');
  done();
}) );

gulp.task(function mytask(done) {
  console.log('my task');
  //done();
})

/*
note. TODO

**npm-script**

- [https://liginc.co.jp/334426:title]
- [http://techblog.kayac.com/2016-12-22_npm-scripts:title]
- [https://qiita.com/takeshi-nagaoka/items/fbbaaa62d60e17b6ba82:title]

**module.export / exports / require **

- [https://qiita.com/toshihirock/items/e98363a4c99950be5abc:title]
- [https://qiita.com/daijinload/items/f6d8234cd761403ece65:title]
- [http://karoten512.hatenablog.com/entry/2018/01/28/191928:title]

[https://nabettu.hatenablog.com/entry/frontendresume:embed]

[https://ashleynolan.co.uk/blog/frontend-tooling-survey-2018-results:embed]

*/
