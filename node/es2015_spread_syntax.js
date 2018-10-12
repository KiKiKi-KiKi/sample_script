'use strict'
// Spread syntax (スプレッド構文)
// `...` Array-like (for inで展開できるオブジェクト)を個々の値で展開できる
function sum(x, y, z) {
  return x + y + z
}

const numbers = [1, 2, 3]
console.log( sum(...numbers) ) // 6

console.log( sum.apply(null, numbers) ) // 6

function sum2(...values) {
  // arguments: object
  // values:Array = [ 1, 2, 3 ]
  return values.reduce((sum, val) => {
    return sum + val
  }, 0)
}
console.log( sum2(1, 2, 3) ) // => 6

var arg, arg1, arg2, arg3

arg1 = [1, 2]
// clone array
const cloneArray = [...arg1]
console.log(arg1, cloneArray) // [ 1, 2 ] [ 1, 2 ]
console.log( arg1 === cloneArray ) // false ... 別オブジェクトになっている
cloneArray[0] = 3
console.log(arg1, cloneArray) // [ 1, 2 ] [ 3, 2 ]

const newArray = [3, ...arg1, 4]
console.log(newArray) // [ 3, 1, 2, 4 ]

// concat
console.log('>>> concat, marge')
arg1 = [0, 1, 2]
arg2 = [3, 4, 5]
// arr1.concat(arr2)
arg3 = [...arg1, ...arg2]
console.log(arg3) // [ 0, 1, 2, 3, 4, 5 ]
arg3 = arg1.concat(arg2)
console.log(arg3) // [ 0, 1, 2, 3, 4, 5 ]

arg1 = [0, 1, 2]
arg2 = ['a', 'b', 'c']
arg1.push(...arg2)
console.log(arg1) // [ 0, 1, 2, 'a', 'b', 'c' ]
arg1 = [0, 1, 2]
arg1.unshift(...arg2)
console.log(arg1) // [ 'a', 'b', 'c', 0, 1, 2 ]

console.log('>>> Object')
var obj, obj1, obj2, obj3

obj1 = {a: 1, b: 2}
obj2 = {...obj1}
console.log(obj2) // { a: 1, b: 2 }
console.log(obj1 === obj2) // false
obj2.a = 0
console.log(obj1, obj2) // { a: 1, b: 2 } { a: 0, b: 2 }

obj3 = {z: 0, ...obj1, c: 3}
console.log(obj3) // { z: 0, a: 1, b: 2, c: 3 }

console.log('>>> Merge Object')
obj1 = {a: 1, b: 2}
obj2 = {c: 3, d: 4}
obj3 = {...obj1, ...obj2}
console.log(obj3) // { a: 1, b: 2, c: 3, d: 4 }

obj = {
  name: 'Mika',
  name: 'Aki',
  name: 'Mikko'
}
console.log(obj) // { name: 'Mikko' }

obj1 = {a: 1, b: 2}
obj2 = {a: 3, c: 4}
obj3 = {a: 0, ...obj1, ...obj2, c: 5}
console.log(obj3) // { a: 3, b: 2, c: 5 }

console.log('*** [...obj] is TypeError')
obj = {a: 1, b: 2}
// console.log( [1, ...obj, 2] ) // => TypeError: obj is not iterable

console.log('*** {...arg}')
arg = ['foo', 'bar']
console.log( {a: 1, ...arg, b: 2} ) // { '0': 'foo', '1': 'bar', a: 1, b: 2 }
console.log( {0: 'a', ...arg, 2: 'b'} ) // { '0': 'foo', '1': 'bar', '2': 'b' }

console.log('>>> Shallow Copy')
arg = [1, [2, 3], 4]
var copy = [...arg]
copy[1][0] = 'a'
console.log(arg) // [ 1, [ 'a', 3 ], 4 ]

obj = {
  a: {
    b: 1
  },
  c: 2
}
copy = {...obj}
copy.a.b = 0
copy.a.d = 3
console.log(obj) // { a: { b: 0, d: 3 }, c: 2 }

console.log(">>> null, undefined")
var r
// r = [...null]
// => TypeError: null is not iterable
// r = [...undefined]
// => TypeError: undefined is not iterable

r = {...null}
console.log(r) // {}
r = {...undefined}
console.log(r) // {}

console.log('>>> String')
const str = 'こんにちわJavaScript🎌'
// [ 'こ', 'ん', 'に', 'ち', 'わ', 'J', 'a', 'v', 'a', 'S', 'c', 'r', 'i', 'p', 't', '🎌' ]
var reverseStr = [...str].reverse().join('')
console.log(reverseStr); // 🎌tpircSavaJわちにんこ

console.log('>>> Destructuring assignment')
var [a, b, ...rest] = [1, 2, 3, 4, 5, 6, 7]
console.log(a, b, rest) // 1 2 [ 3, 4, 5, 6, 7 ]
// var [a, ...rest, b] = [1, 2, 3, 4, 5, 6, 7]
// => SyntaxError: Rest element must be last element

var {a, b} = {a:10, b:20, c:30}
console.log(a, b) // 10 20
var {c, d} = {foo:10, bar:20, baz:30}
console.log(c, d) // undefined undefined
var {a, c, ...rest} = {a:1, b:2, c:3, d:4, e:5}
console.log(a, c, rest) // 1 3 { b: 2, d: 4, e: 5 }

console.log('>>> Set')
arg = [0, 1, 2, 3.1, true, false, 1, "2", "", 3.1, null, undefined, NaN, false, NaN];
console.log( [...new Set(arg)] )
// [ 0, 1, 2, 3.1, true, false, '2', '', null, undefined, NaN ]

console.log('>>> Object default option')
const createObj = (options) => {
  return {name: 'アシリパ', ...options}
}
obj1 = createObj()
console.log(obj1) // {name: 'アシリパ'}
obj2 = createObj({name: '不死身の杉元'})
console.log(obj2) // {name: '不死身の杉元'}
