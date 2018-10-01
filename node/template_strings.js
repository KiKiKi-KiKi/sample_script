'use strict'
// Template String
var val = 'Javascript'
var str1 = `Hello ${val}!`
var str2
console.log(str1) // Hello Javascript!

// ${...}内では計算が可能
var a = 3, b = 5
console.log( `a + b = ${a + b}, \na * 2 + b = ${a * 2 + b}` )
/*
a + b = 8,
a * 2 + b = 11
*/

// ${...}内では関数も呼べる
function sub(a, b) {
  return a - b
}
console.log( `a - b = ${sub(a,b)}` )
// a - b = -2

// 同期はされない
function timer() {
  setTimeout(()=> {
    return 'timeout!'
  }, 100)
}
console.log( `set timer => ${timer()}` )
// set timer => undefined

// 改行
var val1 = "Hello\nJavascript"
var val2 = `Hello
Javascript`
console.log(val1 === val2) // true

var val3
// エスケープしない
// `String.raw`を使う 又は今までどおりの`\`でエスケープできる
val1 = "Hello\\Java\\nScript"
val2 = String.raw`Hello\Java\nScript`
val3 = `Hello\\Java\\nScript`
console.log(val1 == val2, val1 == val3, val2 == val3) // true true true
console.log( val2 ) // Hello\Java\nScript
console.log( val3 ) // Hello\Java\nScript

// String.raw内ではエスケープされていない${...}は展開される
console.log( String.raw`Hello\n${val}` ) // Hello\nJavascript

// String.rawは最後が`\`になっている文字列だと最後が`\``とみなされエラーになる
// console.log( String.raw`Hello\Java\\script\` ) // => Error

console.log( String.raw`Hello\Java\\script` + '\\' ) // Hello\Java\\script\
var v = '\\'
console.log( String.raw`Hello\Java\\script${v}` ) // Hello\Java\\script\

// ${...}をそのまま出力
val1 = "Hello${foo}World"
val2 = `Hello\${foo}World`
val3 = `Hello$\{foo}World`
console.log(val1 == val2, val1 == val3, val2 == val3) // true true true
console.log( val2 ) // Hello${foo}World
console.log( val3 ) // Hello${foo}World

a = 5
b = 10
function tag(strings, ...values) {
  console.log(strings) // ... 変更不可オブジェクト
  console.log(values)
  return strings
}
str1 = tag`Hello${a+b}Java${a-b}script`
// strings: [ 'Hello', 'Java', 'script' ]
// vales: [ 15, -5 ]
str2 = tag`Hello${b-a}Java${a*b}script`
// strings: [ 'Hello', 'Java', 'script' ]
// values: [ 5, 50 ]
console.log(str1 === str2, typeof(str1)) // true, 'object'

// str1[1] = 'World'
// => TypeError: Cannot assign to read only property
// delete str1[2]
// => TypeError: Cannot delete property
// str1.push('!')
// => TypeError: Cannot add property

// 文字列中の改行
str1 = "aaa\
bbb\
ccc"
console.log(str1)
str2 = `aaa\
bbb\
ccc`
console.log(str2)
// `\`無しで改行すると通常の改行になる
str2 = `aaa
bbb
ccc`
console.log(str2)
