require('./modules/Array-reject');

// functional programming (関数型プログラミング) では関数も値
const triple = function(x) {
  return x * 3;
}
const waffle = triple;
console.log( waffle(3) ); // => 9

// Higher-order function
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

// 通常の for文 ... ロジックが分離されてないので再利用が難しい
let coolIdols = [];
for (var i = 0, l = idols.length; i < l; i += 1) {
  if ( idols[i].type === 'cool' ) {
    coolIdols.push(idols[i]);
  }
}
console.log(coolIdols);

// 高階関数 (Higher-order function) ... 関数を引数にとる関数
coolIdols = idols.filter((idol) => {
  return idol.type === 'cool';
});
console.log(coolIdols);

// 引数が関数なのでロジックを分離することができる
const isCuteIdol = function(idol) {
  return idol.type === 'cute';
};

const cuteIdols = idols.filter(isCuteIdol);
const otherIdols = idols.reject(isCuteIdol);
console.log('cuteIdols');
console.log(cuteIdols);
console.log('otherIdols');
console.log(otherIdols);
