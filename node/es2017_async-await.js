'use strict';
const api = 'http://localhost:3001';

// async function はPromiseを返す
// return すれば resolve
async function resolveFunc() {
  return 'this resolve';
}

//
async function rejectError() {
  throw new Error('throw Error');
}

// return すると resolveされる
async function rejectFunc2() {
  return new Error('retun Error');
}

resolveFunc().then((res) => console.log(res));
// => this resolve

rejectError()
.then((res) => console.log(res))
.catch((err)=> console.log(`ERROR ${err}`));
// => ERROR Error: throw Error

rejectFunc2()
.then((res) => console.log(`RESOLVE ${res}`))
.catch((err)=> console.log(`ERROR ${err}`));
// => RESOLVE Error: retun Error

// --------------------------------------------
// awaite
// --------------------------------------------
const waitSquareFunc = (x) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x * x);
    }, 500);
  });
}

// awaitキーワードはasync内でしか使用できない
async function getSquareAndAdd(x, y) {
  // awaitキーワードがあると値が帰ってくるまで処理が止まる
  const res = await waitSquareFunc(x);
  // Promise.resolve
  return res + y;
}

getSquareAndAdd(2, 1)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
// => 5

// Promiseで getSquareAndAdd を書いた例
function getSquareAndAddByPromise(x, y) {
  return waitSquareFunc(x)
    .then((res) => {return res + y})
    .catch((err) => {throw err});
}

getSquareAndAddByPromise(2, 1)
  .then((res) => console.log(res, `Promise`))
  .catch((err) => console.log(err, `Promise`));
// => 5 'Promise'

// --------------------------------------------
// ERROR ハンドリング
// --------------------------------------------
function throwErrorFunc(isError) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if( isError ) {
          reject('Reject ERROR');
        } else {
          // throw new Error は try - catch文の中で使わないと処理が止まる
          throw new Error('Throw new ERROR');
          console.log('ココは実行されない');
          resolve('NO ERROR');
        }
      } catch(e) {
        console.log('> ERROR CATCH');
        reject(e.message);
      }
    }, 500);
  });
}

// エラーハンドリングに失敗する例
function ngThrowError(isError) {
  if( isError ) {
    reject('Reject ERROR');
  } else {
    throw new Error('Throw new ERROR');
    // ↑ ここでエラーになり、error catchできず処理が止まる
    resolve('NO ERROR');
  }
}

async function errorHandlingTry_catch(isError) {
  try {
    const res = await throwErrorFunc(isError);
    console.log('>> NOT IN CATCH');
    return res;
  } catch(err) {
    console.log('>> TRY-CATCH ERROR');
    // return throw err
    // => SyntaxError: Unexpected token throw
    throw err;
  }
}

// reject error
errorHandlingTry_catch(true)
  .then((res) => console.log(res, 'then'))
  .catch((err) => console.log(err, 'catch'));
// => >> TRY-CATCH ERROR
// => Reject ERROR catch

// throw new Error
errorHandlingTry_catch(false)
  .then((res) => console.log(res, 'then'))
  .catch((err) => console.log(err, 'catch'));
// => > ERROR CATCH
// => >> TRY-CATCH ERROR
// => Error: Throw ERROR


// not use TRY-CATCH
// async function内ではtry-catchしなくてもrejectの場合はそのまま元の呼び出し元に trow される
async function errorHandling(isError) {
  const res = await throwErrorFunc(isError);
  console.log('NOT IN CATCH');
  return res;
}

// reject err
errorHandling(true)
  .then((res) => console.log(res, 'then'))
  .catch((err) => console.log(err, 'catch'));
// => Reject ERROR catch

// throw new Error
errorHandling(false)
  .then((res) => console.log(res, 'then'))
  .catch((err) => console.log(err, 'catch'));
// => > ERROR CATCH
// => Error: Throw ERROR
