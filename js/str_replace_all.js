'use strict';
/*
ref. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replace
     https://qiita.com/phi/items/3b10288b02c87057c006 (reduce)

```sh
$ node -v
v10.4.0
```
*/

const str1 = "藤堂ユリカ\n一ノ瀬かえで\n神崎美月";

// replace
console.log( str1.replace("\n", ' ') );
// => "藤堂ユリカ 一ノ瀬かえで\n神崎美月"

// replace use regexp
console.log( str1.replace(/\n/g, ' ') );
// => "藤堂ユリカ 一ノ瀬かえで 神崎美月"

// 同じ文字列を一括で置き換えるなら`str.split().join()`が楽かも
// split().join()
console.log( str1.split("\n").join(' ') );
// => "藤堂ユリカ 一ノ瀬かえで 神崎美月"

// `split()`したら配列になるので、`reduce()`で結合することもできる
// split().reduce()
console.log( str1.split("\n").reduce((sum, val)=> {
  if( /^神崎美月$/.test(val) ) {
    val = 'レジェンド美月';
  }
  return `${val}🌟${sum}`;
}) );
// => レジェンド美月🌟一ノ瀬かえで🌟藤堂ユリカ


// replace の第二引数は function もとれる
console.log(
  str1.replace("\n", (...val)=> {
    console.log(val);
    return '-- I am ジョニー --';
  })
);
// => [ '\n', 5, '藤堂ユリカ\n一ノ瀬かえで\n神崎美月' ]
// => res: 藤堂ユリカ-- I am ジョニー --一ノ瀬かえで\n神崎美月

console.log(
  str1.replace(/(.+)\n/g, (...val)=> {
    console.log(val);
    return 'ジョニー別府 ';
  })
);
// => [ '藤堂ユリカ\n', '藤堂ユリカ', 0, '藤堂ユリカ\n一ノ瀬かえで\n神崎美月' ]
// => [ '一ノ瀬かえで\n', '一ノ瀬かえで', 6, '藤堂ユリカ\n一ノ瀬かえで\n神崎美月' ]
// => res: ジョニー別府 ジョニー別府 神崎美月

function replacer(match, p1, p2, p3, offset, string) {
  console.log(match, p1, p2, p3, offset, string);
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
