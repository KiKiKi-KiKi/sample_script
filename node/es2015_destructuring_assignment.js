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

var a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
/*
// 文章が終わってないと判断される場合エラーになる
let a = 1, b = 2
[a, b] = [b, a]
// => ReferenceError: b is not defined

let a = 1, b = 2
{}
[a, b] = [b, a]
// => OK
*/
// 変数宣言だけならエラーにならない
var a1, b1
[a1, b1] = [1, 2]
console.log(a1, b1) // 1, 2

/*
let aa = 1, bb = 2
console.log(aa, bb)
[aa, bb] = [bb, aa]
// => TypeError: Cannot set property '2' of undefined
*/
var aa = 11, bb = 22
console.log(aa, bb); // 11 22
[aa, bb] = [bb, aa]
console.log(aa, bb)  // 22 11

var {cute, cool, sexy, ...other} = {
  cute:   '星宮いちご',
  cool:   '霧矢あおい',
  pop:    '有栖川おとめ',
  sexy:   '紫吹蘭',
  legend: '神前美月'
};
console.log(cute);  // 星宮いちご
console.log(cool);  // 霧矢あおい
console.log(sexy);  // 紫吹蘭
console.log(other); // { pop: '有栖川おとめ', legend: '神前美月' }

var cute, cool
({cute, cool} = { cute: '星宮いちご', cool: '音城セイラ' })
console.log(cute, cool) // 星宮いちご, 音城セイラ

/*
var cute = '星宮いちご', cool = '霧矢あおい'
({cute, cool} = { cute: '大空あかり', cool: '氷上スミレ' })
// TypeError: "霧矢あおい" is not a function
*/
var cute = '星宮いちご', cool = '霧矢あおい';
({cute, cool} = { cute: '大空あかり', cool: '氷上スミレ' })
console.log(cute, cool)

var cute = '星宮いちご', cool = '霧矢あおい', n = 5
while(n--) { console.log(n) }
({cute, cool} = { cute: '大空あかり', cool: '氷上スミレ' })
console.log(cute, cool)

var cute = '星宮いちご', cool = '霧矢あおい'
;({cute, cool} = { cute: '大空あかり', cool: '氷上スミレ' })
console.log(cute, cool)

/*
function myFunc() { console.log('OKOKOK-') }
var sexy = '神前美月', pop = '夏樹みくる'
myFunc()
({sexy, pop} = { sexy: '風沢そら', pop: '冴草きい' })
// TypeError: myFunc(...) is not a function
console.log(sexy, pop)
*/
function myFunc() { console.log('OKOKOK-') }
var sexy = '神前美月', pop = '夏樹みくる'
myFunc();
({sexy, pop} = { sexy: '風沢そら', pop: '冴草きい' })
console.log(sexy, pop) // 風沢そら 冴草きい
