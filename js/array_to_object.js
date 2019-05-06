'use strict';

const arg = [
  {id: 1, name: '星宮いちご', type: 'cute'},
  {id: 2, name: '霧矢あおい', type: 'cool'},
  {id: 3, name: '紫吹蘭', type: 'sexy'},
];

console.log('> Array to Object');

// for
const obj = {};
for(let i = 0, l = arg.length; i < l; i += 1) {
  const data = arg[i];
  obj[data.id] = data;
}

console.log('for', obj);

// forEach
const obj1 = {}
arg.forEach((data, i) => {
  obj1[data.id] = data;
});

console.log('forEach', obj1);

// reduce
const obj2 = arg.reduce((obj, data) => {
  obj[data.id] = data;
  return obj;
}, {});

console.log('reduce', obj2);

// reduce & copy object
const obj3 = arg.reduce((obj, data) => {
  return {
    ...obj,
    [data.id]: data,
  }
}, {});

console.log('reduce & copy', obj3);

console.log('------------------------------');
