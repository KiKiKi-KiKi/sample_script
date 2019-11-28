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
  - https://lodash.com/docs/4.17.15#cloneDeep
*/
