const array = [
  [['foo', 'bar'], 1, 2, 3, 4, 5],
  'a',
];

// slice() is shallow copy
console.log('slice() ------');
const sliceArray = array.slice();
sliceArray[1] = 'b';
sliceArray[0][1] = 'b';
console.log(sliceArray);
// => [ [ [ 'foo', 'bar' ], 'b', 2, 3, 4, 5 ], 'b' ]
console.log(array);
// => [ [ [ 'foo', 'bar' ], 'b', 2, 3, 4, 5 ], 'a' ]

array[0][1] = 1;

// Spread syntax is shallow copy
console.log('Spread syntax -------');
const spredArray = [...array];
spredArray[1] = 'b';
spredArray[0][1] = 'b';
console.log(spredArray);
// => [ [ [ 'foo', 'bar' ], 'b', 2, 3, 4, 5 ], 'b' ]
console.log(array);
// => [ [ [ 'foo', 'bar' ], 'b', 2, 3, 4, 5 ], 'a' ]

array[0][1] = 1;

// Array.from() is shallow copy
console.log('Array.from() ------');
const arrayFrom = Array.from(array);
arrayFrom[1] = 'b';
arrayFrom[0][1] = 'b'
console.log(arrayFrom);
// => [ [ [ 'foo', 'bar' ], 'b', 2, 3, 4, 5 ], 'b' ]
console.log(array);
// => [ [ [ 'foo', 'bar' ], 'b', 2, 3, 4, 5 ], 'a' ]

array[0][1] = 1;

// Object.assign() is shallow copy
console.log('Object.assign() ------');
const objectAssignArray = Object.assign([], array);
objectAssignArray[1] = 'b';
objectAssignArray[0][1] = 'b';
console.log(objectAssignArray);

console.log(array);


array[0][1] = 1;

// JSON.parse(JSON.stringify()) is deep copy
console.log('JSON.parse(JSON.stringify()) -------')
let jsonArray = JSON.parse(JSON.stringify(array));
jsonArray[1] = 'b';
jsonArray[0][1] = 'b';
console.log(jsonArray);
// => [ [ [ 'foo', 'bar' ], 'b', 2, 3, 4, 5 ], 'b' ]
console.log(array);
// => [ [ [ 'foo', 'bar' ], 1, 2, 3, 4, 5 ], 'a' ]

// But this way can't copy some objects
array.push( new Date() );
array.push( {func: () => console.log('function')});
console.log(array);
// => [ [ [ 'foo', 'bar' ], 1, 2, 3, 4, 5 ], 'a', 2019-11-28T03:18:41.271Z, { func: [Function: func] } ]

jsonArray = JSON.parse(JSON.stringify(array));
console.log(jsonArray)
// => [ [ [ 'foo', 'bar' ], 1, 2, 3, 4, 5 ], 'a', '2019-11-28T03:20:10.070Z', {} ]

// lodash#cloneDeep
console.log('lodash#cloneDeep ------')
const _ = require('lodash');
const _array = _.cloneDeep(array);
console.log(_array);
// => [ [ [ 'foo', 'bar' ], 1, 2, 3, 4, 5 ], 'a', 2019-11-28T03:24:47.299Z, { func: [Function: func] } ]
_array[1] = 'b';
_array[0][1] = 'b';
_array[0][0][1] = 'b';
console.log(_array);
// => [ [ [ 'foo', 'b' ], 'b', 2, 3, 4, 5 ], 'b', 2019-11-28T03:25:45.467Z, { func: [Function: func] } ]
console.log(array);
// => [ [ [ 'foo', 'bar' ], 1, 2, 3, 4, 5 ], 'a', 2019-11-28T03:25:45.467Z, { func: [Function: func] } ]

/*
ref.
- https://medium.com/@gamshan001/javascript-deep-copy-for-array-and-object-97e3d4bc401a
- https://qiita.com/knhr__/items/d7de463bf9013d5d3dc0
  - https://qiita.com/rentondesu/items/f3e8924af2fcd3c28598
  - https://lodash.com/docs/4.17.15#cloneDeep
*/

console.log('--------');

const arg = [
  {name: 'Shamiko'},
  {name: 'Chiyoda Momo'},
];

const arrayReset = () => {
  console.log('================');
  arg.length = 0;
  arg.push( {name: 'Shamiko'} );
  arg.push( {name: 'Chiyoda Momo'} )
  console.log(arg);
  console.log('---');
};

let copyArray = arg;
copyArray.push({name: 'Hinatsuki Mikan'});
copyArray[0].name = 'Ririsu';

console.log(copyArray);
console.log(copyArray);
console.log(copyArray === arg)

arrayReset();
// Slice
console.log('Slice()');
copyArray = arg.slice();
console.log(copyArray === arg); // false
copyArray.push({name: 'Hinatsuki Mikan'});
copyArray[0].name = 'Ririsu';
console.log(copyArray);
console.log(arg);

arrayReset();
// Spread syntax
console.log('Spread syntax');
copyArray = [...arg];
console.log(copyArray === arg); // false
copyArray.push({name: 'Hinatsuki Mikan'});
copyArray[0].name = 'Ririsu';
console.log(copyArray);
console.log(arg);

arrayReset();
// Array.from()
console.log('Array.from()');
copyArray = Array.from(arg);
console.log(copyArray === arg); // false
copyArray.push({name: 'Hinatsuki Mikan'});
copyArray[0].name = 'Ririsu';
console.log(copyArray);
console.log(arg);

arrayReset();
// Object.assign()
console.log('Object.assign()');
copyArray = Object.assign([], arg);
console.log(copyArray === arg); // false
copyArray.push({name: 'Hinatsuki Mikan'});
copyArray[0].name = 'Ririsu';
console.log(copyArray);
console.log(arg);

arrayReset();
// JSON
console.log('JSON');
copyArray = JSON.parse(JSON.stringify(arg));
console.log(copyArray === arg); // false
copyArray.push({name: 'Hinatsuki Mikan'});
copyArray[0].name = 'Ririsu';
console.log(copyArray);
console.log(arg);

console.log('================');
const arg2 = [
  new Date(),
  () => { console.log('function') },
];
console.log(arg2);

copyArray = JSON.parse(JSON.stringify(arg2));
console.log(copyArray);

// lodash
console.log('================');
console.log('lodash#cloneDeep');
arg.push( new Date() );
arg.push( {func() {console.log('foo');}} );
console.log(arg);
copyArray = _.cloneDeep(arg);
console.log(copyArray === arg); // false
copyArray.push({name: 'Hinatsuki Mikan'});
copyArray[0].name = 'Ririsu';
console.log(copyArray);
// => [{name: 'Ririsu'}, {name: 'Chiyoda Momo'}, 2019-11-29T10:57:00.595Z, {func: [Function: func]}, {name: 'Hinatsuki Mikan'}]
console.log(arg);
// => [{name: 'Shamiko'}, {name: 'Chiyoda Momo'}, 2019-11-29T10:57:00.595Z, {func: [Function: func]}]

console.log( copyArray[2].getFullYear() ); // => 2019
copyArray[3].func(); // => 'foo'
