'use strict'
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of
// for...of  Array-likeなiterableオブジェクトを列挙できる
// [iterableオブジェクト](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)

// Array
let arg = [1, 2, 3, 4, 5];
for (let val of arg) {
  console.log(val);
}
// 1,2,3,4,5

// String
let str = 'Hello ココちゃん！';
for (let val of str) {
  console.log(val);
}
// "H","e","l","l","o"," ","コ","コ","ち","ゃ","ん","！"

// Map
let map = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (let val of map) {
  console.log(val);
}
// [ 'a', 1 ]
// [ 'b', 2 ]
// [ 'c', 3 ]

// Set
let set = new Set([0, 1, 2, 3.1, true, false, 1, "2", "", 3.1, null, undefined, NaN, false, NaN]);
for (let val of set) {
  console.log(val);
}
// 0, 1, 2, 3.1, true, false, "2", "", null, undefined, NaN

// arguments オブジェクト
!function() {
  for (let val of arguments) {
    console.log(val)
  }
}('a', 'b', 'c');
// "a", "b", "c"

/*
for...of vs for...in
for...of は値を列挙する
for..in はプロパティ(インデックス)をprototypeで拡張されたプロパティを含めて列挙する
*/
Object.prototype.objCustomFunc = function() {};
Array.prototype.arrCustomFunc = function() {};
let iterable = ['星宮いちご', '霧矢あおい', '紫吹蘭'];
iterable.unitName = 'ソレイユ';

for (let val of iterable) {
  console.log(val);
}
// "星宮いちご", "霧矢あおい", "紫吹蘭""

for (let i in iterable) {
  console.log(i);
}
// 0, 1, 2, "unitName", "arrCustomFunc", "objCustomFunc"

// hasOwnProperty を使えば自身のプロパティだけに限定できる
for (let i in iterable) {
  if ( iterable.hasOwnProperty(i) ) {
    console.log(i);
  }
}
// 0, 1, 2, "unitName"

// Object loop
// ref. https://qiita.com/endam/items/808a084859e3a101ab8f

let obj = {
  cute:   '星宮いちご',
  cool:   '霧矢あおい',
  sexy:   '紫吹蘭',
  pop:    '夏樹みくる',
  legend: '神前美月'
};
Object.prototype.objCustomFunc = function() {};

console.log('---------------------');
console.log('for...of');
console.log('=> TypeError: obj is not iterable');

console.log('---------------------');
console.log('for...in');
for (let key in obj) {
  console.log(key, obj[key]);
}
// cute 星宮いちご
// cool 霧矢あおい
// sexy 紫吹蘭
// pop 夏樹みくる
// legend 神前美月
// objCustomFunc [Function]

console.log('---------------------');
console.log('for...of Object.keys');
for (let key of Object.keys(obj)) {
  console.log(key, obj[key]);
}
// cute 星宮いちご
// cool 霧矢あおい
// sexy 紫吹蘭
// pop 夏樹みくる
// legend 神前美月

console.log('---------------------');
console.log('Object.keys().forEach');
Object.keys(obj).forEach(function(key) {
  console.log(key, this[key]);
}, obj);
// cute 星宮いちご
// cool 霧矢あおい
// sexy 紫吹蘭
// pop 夏樹みくる
// legend 神前美月
