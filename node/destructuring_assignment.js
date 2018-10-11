// Destructuring assignment 分割代入

// 変数宣言と代入を別にした分割代入
// ~~※変数宣言のみで何も入っていない変数でないとエラーになる？~~
// 分割代入の前にセミコロンがないとエラーになる
var hoge, fuga, mofu;
[hoge, fuga] = [10, 20]
console.log(hoge, fuga);
// オブジェクトの代入は全体を () で囲う必要がある
({hoge, fuga, ...mofu} = {hoge: 'foo', fuga: 'bar', mofu: 'baz', foo: 'foo'})
console.log(hoge, fuga, mofu)

let foo = 1, bar = 2;
[bar, foo] = [foo, bar];
console.log(foo, bar)

// 引数をオブジェクトの分割代入のにすることで、キーがあっていれば引数の順序を不問にできる
function trapezoid({upper = 1, lower = 1, height = 1}) {
  return (upper + lower) * height / 2
}
console.log(trapezoid({
  height: 2,
  upper: 5,
  lower: 10
})) // 15

// オブジェクトから特定のプロパティのみ取り出せる関数
function zipcode({zip}) {
  console.log(zip)
}
zipcode({
  address: '1111 hogehoge',
  city: 'Yoyogi',
  region: 'Tokyo',
  country: 'Japan',
  zip: '151-0001'
}) // => 151-0001

zipcode({
  address: '1234 foobar',
  city: '',
  region: 'Helshinki',
  country: 'Finland',
}) // => undefined

// 配列を返す関数を分割して変数に代入する
let tel = '090-1111-2222'
let tel_pattern = /^(0\d{2,4})\-(\d{1,4})\-(\d{2,5})$/
let [, area, local, privated] = tel_pattern.exec(tel)
console.log(area, local, privated)
