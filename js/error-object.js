"use strict";
// ref. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Error
// ref. https://qiita.com/Tsuyoshi84/items/c50fbbf30a2af387efdf
// ref. https://chaika.hatenablog.com/entry/2019/01/24/090000

// Error
function throwError() {
  try {
    throw new Error('error message');
  } catch (err) {
    console.log(err.name, err.message);
  }
}

throwError();

// simple custom Error
function customError() {
  try {
    throw {
      name: 'MyCustomError',
      message: 'error message',
      date: new Date(),
      remedy: genericErrorHandler,
    }
  } catch (err) {
    console.log(err.date, err.name, err.message);
    err.remedy();
  }
}

function genericErrorHandler() {
  console.info('> generic error handler!');
}

customError();

// extends error
class CustomError extends Error {
  constructor(name = 'Custom Error', ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = name;
    this.date = new Date();
  }
}

try {
  throw new CustomError('My Error', 'error message!');
} catch (err) {
  console.log(err.date, err.name, err.message);
  console.log(err.stack);
}
