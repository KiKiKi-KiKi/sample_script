'use strict';
// Currying ... 複数の引数をとる関数を、引数が「もとの関数の最初の引数」で戻り値が「もとの関数の残りの引数を取り結果を返す関数」であるような関数

function over(standard_value) {
  console.log('over init!');
  return function(x) {
    return x > standard_value;
  }
}

const over5 = over(5);
console.log( over5(10) ); // => true

console.log( over(5)(10) ); // => true

const over5Arr = [1,2,3,4,5,6,7,8,9,10].filter( over(5) );
console.log( over5Arr ); // => [ 6, 7, 8, 9, 10 ]
// 最初に1回 over 関数が呼び出されて、後は返された関数が実行される
