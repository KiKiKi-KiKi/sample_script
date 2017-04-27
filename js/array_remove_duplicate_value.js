"use strict";

var arr = [0, 1, 2, 3, 4.1, true, false, 1, "2", "", 4.2, null, undefined, NaN, false, NaN];

// Remove Array Duplication
function removeDuplicateValue1(arr) {
  return arr.filter((val, i, self) => {
    return self.indexOf(val) === i;
  });
}

console.log("filter -> array.indexOf");
console.log( removeDuplicateValue1(arr) );
// => [ 0, 1, 2, 3, 4.1, true, false, '2', '', 4.2, null, undefined ]

var a = NaN;
console.log(a === a); // false
// NaN is defined not be equal to anything. Not equal even itself. so
// array.indexOf(NaN); => -1

function removeDuplicateValue_NaN(arr) {
  let hasNaN = false;
  return arr.filter((val, i, self) => {
    if(isNaN(val) && !hasNaN ) {
      hasNaN = true;
      return true;
    }
    return self.indexOf(val) === i;
  });
}
console.log("filter -> array.indexOf");
console.log( removeDuplicateValue_NaN(arr) );


// ES6
// Array.from
//  refs. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// Set
//  refs. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set
function removeDuplicateValue2(arr) {
  return Array.from( new Set(arr) );
}

console.log("Array.from( new Set(array) )");
console.log( removeDuplicateValue2(arr) );
// => [ 0, 1, 2, 3, 4.1, true, false, '2', '', 4.2, null, undefined, NaN ]

// ES6 スプレッド演算子
// refs. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_operator
function removeDuplicateValue3(arr) {
  return [...new Set(arr)];
}

console.log("[...new Set(arr)]");
console.log( removeDuplicateValue3(arr) );
// => [ 0, 1, 2, 3, 4.1, true, false, '2', '', 4.2, null, undefined, NaN ]

console.log("-----");
console.log("Set()");
console.log( new Set(arr) );
// => Set { 0, 1, 2, 3, 4.1, true, false, '2', '', 4.2, null, undefined, NaN }

console.log(" ... ");
var arr1 = [1,2,3];
var arr2 = [4,5,6];
arr1.push(...arr2);
console.log( arr1 ); // [1, 2, 3, 4, 5, 6];

var set = new Set();
set.add(1);
set.add(2);
set.add(3);
console.log(set); // Set { 1, 2, 3 }
console.log( [...set] ); // [ 1, 2, 3 ]
