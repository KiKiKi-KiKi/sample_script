'use strict';
require('./modules/Array-reject');

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

console.log('----');

const idols = [
  { name: '星宮 いちご',   type: 'cute' },
  { name: '霧矢 あおい',   type: 'cool' },
  { name: '紫吹 蘭',      type: 'sexy' },
  { name: '有栖川 おとめ', type: 'pop' },
  { name: '藤堂 ユリカ',  type: 'cool' },
  { name: '神谷 しおん',  type: 'cool' },
  { name: '一ノ瀬 かえで', type: 'pop' },
  { name: '三ノ輪 ヒカリ', type: 'sexy' },
  { name: '神崎 美月',    type: 'sexy' },
  { name: '夏樹 みくる',  type: 'pop' },
  { name: '北大路 さくら', type: 'cute' },
  { name: '大空 あかり',  type: 'cute' },
  { name: '服部 ユウ',   type: 'cool' },
  { name: '氷上 スミレ',  type: 'cool' },
  { name: '新条 ひなき',  type: 'pop' },
  { name: '紅林 珠璃',   type: 'sexy' },
  { name: '黒沢 凛',    type: 'cool' },
  { name: '天羽 まどか', type: 'cute' },
];

function idolType(type) {
  return function(idol) {
    return idol.type === type
  };
}

const coolIdols    = idols.filter( idolType('cool') );
const notCoolIdols = idols.reject( idolType('cool') );
const cuteIdols    = idols.filter( idolType('cute') );

console.log( "coolIdolds\n", coolIdols );
console.log( "notCoolIdols\n", notCoolIdols );
console.log( "cutelIdols\n", cuteIdols );
