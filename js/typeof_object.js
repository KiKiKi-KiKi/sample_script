class MyClass {
  constructor() {}
};

const symbol1 = Symbol();
const symbol2 = Symbol( {} );

const vals = {
  String: [
    'String',
    new String('Foo'),
  ],
  Number: [
    1,
    -1,
    1.5,
    -0.8,
    NaN,
  ],
  Boolean: [
    true,
    false,
    null,
    undefined,
  ],
  Array: [
    [],
    [1, 2],
  ],
  Object: [
    {},
    {a: 1, b: 2},
  ],
  Function: [
    function() {},
  ],
  Date: [
    new Date(),
  ],
  RegExp: [
   /\w+/,
   new RegExp('\\w+'),
 ],
  Symbol: [
    symbol1,
    symbol2,
  ],
  Class: [
    new MyClass(),
  ],
};

const objectArg = [];

for (let key of Object.keys(vals)) {
  console.log(key);
  let arg = vals[key];
  if( Array.isArray(arg) ) {
    arg.forEach((v) => {
      console.log(v, typeof(v));
      if(typeof(v) === 'object') {
        objectArg.push(v);
      }
    });
  }
}

console.log('------------');
console.log(objectArg);
console.log( Object.prototype.toString() ); // [object Object]

function getObjectType(val) {
  const type = Object.prototype.toString.call(val);
  return type.slice(8, -1);
}

objectArg.forEach((v) => {
  console.log(v, getObjectType(v) );
});
/*
new String('Foo') '[object String]' '=>' 'String'
null '[object Null]' '=>' 'Null'
[] '[object Array]' '=>' 'Array'
[ 1, 2 ] '[object Array]' '=>' 'Array'
{} '[object Object]' '=>' 'Object'
{ a: 1, b: 2 } '[object Object]' '=>' 'Object'
new Date() '[object Date]' '=>' 'Date'
/\w+/ '[object RegExp]' '=>' 'RegExp'
new RegExp('\\w+') '[object RegExp]' '=>' 'RegExp'
new MyClass() '[object Object]' '=>' 'Object'
*/
console.log('------------');
function getConstructor(val) {
  if( val === null ) return null;
  const type = val.constructor;
  return type;
}

objectArg.forEach((v) => {
  console.log(v, getConstructor(v) );
});
/*
new String('Foo') => [Function: String]
null null
[] => [Function: Array]
[ 1, 2 ] => [Function: Array]
{} => [Function: Object]
{ a: 1, b: 2 } => [Function: Object]
new Date() => [Function: Date]
/\w+/ => [Function: RegExp]
new RegExp('\\w+') => [Function: RegExp]
new MyClass() => [Function: MyClass]
*/

const obj = new Object();
console.log(obj, getConstructor(obj), getObjectType(obj));
// => {} [Function: Object] 'Object'

console.log('------------');

function isObject(val) {
  if( val !== null
   && typeof(val) === 'object'
   && val.constructor === Object ) {
    return true;
  }
  return false;
}

for (let key of Object.keys(vals)) {
  let arg = vals[key];
  if( Array.isArray(arg) ) {
    arg.forEach((v) => {
      console.log(v, 'isObject?', isObject(v));
    });
  }
}
/*
"String" isObject? false
new String("Foo") 'isObject?' false
1 'isObject?' false
-1 'isObject?' false
1.5 'isObject?' false
-0.8 'isObject?' false
NaN 'isObject?' false
true 'isObject?' false
false 'isObject?' false
null 'isObject?' false
undefined 'isObject?' false
[] 'isObject?' false
[ 1, 2 ] 'isObject?' false
{} 'isObject?' true
{ a: 1, b: 2 } 'isObject?' true
function() {} 'isObject?' false
new Date() 'isObject?' false
/\w+/ 'isObject?' false
new RegExp('\\w+') 'isObject?' false
Symbol() 'isObject?' false
Symbol({}) 'isObject?' false
new MyClass() 'isObject?' false
*/
console.log( 'new Object()', isObject( new Object() ) ); // => true
