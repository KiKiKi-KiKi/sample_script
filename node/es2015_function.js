'use strict'

// default 引数
function hi(name = 'スター宮') {
  console.log(`Hi ${name}!`)
}
hi() // => Hi スター宮!
hi('霧矢ハニー') // => Hi 霧矢ハニー!

function add(x, y = x) {
  return x + y
}
console.log( add(1, 3) ) // => 4
console.log( add(3) )    // => 6

// default 引数に関数を設定
function required() {
  throw new Error('Arguments is missing');
}
function myFunc(v = required()) {
  return v;
}
// myFunc();
// => Error: Arguments is missing

// Arrow Function
let arg = [1, 2, 3, 4]

let formatted
formatted = arg.map(function(v, i) {
  return v * v
})
// => [ 1, 4, 9, 16 ]

// return するだけの関数の場合 `return`を書く必要はない
formatted = arg.map((v, i) => v * v)
// => [ 1, 4, 9, 16 ]

// ※ １文で`{}`を省略した書き方で、オブジェクトを返す場合は`({...})`の形で書く必要がある
let hoge = () => ({hoge: 'foo'})
console.log(hoge()) // => { hoge: 'foo' }
/* 下記と同等
let hoge = () => {
  return {hoge: 'foo'}
}
*/

// これはエラー
//let hoge = () => return {hoge: 'foo'}
// => SyntaxError: Unexpected token return

// ()で囲わないとundefined
let foo = (param) => {cute: '星宮いちご'}
console.log('foo', foo())  // undefined

// thisの拘束
// アロー関数内のthisは宣言された場所のスコープのthisに拘束される
const Counter = function() {
  // this = Counter Object
  this.count = 0
  this.timer = null
  this.onCount = false
}
Counter.prototype.start = function() {
  if ( !this.onCount ) {
    this.onCount = true
    this.onCountUp()
  }
}
Counter.prototype.onCountUp = function() {
  if ( this.onCount ) {
    this.timer = setTimeout(() => {
      // this = Counter
      this.count += 1
      this.onCountUp()
    }, 100)
  }
}
Counter.prototype.stop = function() {
  this.onCount = false
  clearTimeout(this.timer)
  this.timer = null
  console.log(`STOP: ${this.count}`)
}

let myCounter = new Counter()
myCounter.start()
setTimeout(() => {myCounter.stop()}, 500)

// 即時関数
;((name) => {
  console.log(`My name is ${name}!`)
})('ジョニー別府')
