"use strict";

const list = [
  1,
  0, // want to remove
  -0, // want to remove
  -1,
  true,
  false, // want to remove
  null, // want to remove
  undefined, // want to remove
  NaN, // want to remove
  "a",
  "", // want to remove
];

console.log('to Boolean');
list.forEach((val) => {
  console.log(`${val} > ${Boolean(val)}`);
})

const removeFalseValueInList = (list) => {
  return list.filter(Boolean);
};

console.log('-------');
console.log('remove false filter', removeFalseValueInList(list));

console.log( list.filter((val) => Boolean(val)) );
