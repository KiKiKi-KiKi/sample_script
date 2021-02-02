// Map
// cf. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map

const myMap = new Map();

// add key-value
// map.set(key, value)
myMap.set('hoshimiya', {name: 'Ichigo'})
myMap.set('kiriya', {name: 'Aoi'});
myMap.set('shibuki', {name: 'Ran'});

console.log(myMap);
// Map {
//  'hoshimiya' => { name: 'Ichigo' },
//   'kiriya' => { name: 'Aoi' },
//   'shibuki' => { name: 'Ran' }
// }

// map[key] = value では Map に要素を追加できない
myMap['arisugawa'] = {name: 'Otome'};
console.log(myMap);
// Map {
//   'hoshimiya' => { name: 'Ichigo' },
//   'kiriya' => { name: 'Aoi' },
//   'shibuki' => { name: 'Ran' },
//   arisugawa: { name: 'Otome' }
// }

const hasKye = (map) => (key) => {
  const result = map.has(key);
  console.log('Has key?', key, result);
  return result;
};

hasKye(myMap)('hoshimiya');
// => true
hasKye(myMap)('arisugawa');
// => false

// map.get(key)
const getMapValue = (map) => (key) => {
  const result = map.get(key);
  console.log(key, result, typeof(result));
  return result;
};

getMapValue(myMap)('hoshimiya');
// => { name: 'Ichigo' }
getMapValue(myMap)('arisugawa');
// => undefined
getMapValue(myMap)('todou');
// => undefined

console.log('----------');

// map keys
console.log(myMap.keys());
// => [Map Iterator] { 'hoshimiya', 'kiriya', 'shibuki' }

// map values
console.log(myMap.values());
// => [Map Iterator] { { name: 'Ichigo' }, { name: 'Aoi' }, { name: 'Ran' } }

console.log(myMap.entries());
// [Map Entries] {
//   [ 'hoshimiya', { name: 'Ichigo' } ],
//   [ 'kiriya', { name: 'Aoi' } ],
//   [ 'shibuki', { name: 'Ran' } ]
// }

// Map は forEach が使える
myMap.forEach((value, key) => {
  console.log(value, key);
});
// { name: 'Ichigo' } hoshimiya
// { name: 'Aoi' } kiriya
// { name: 'Ran' } shibuki

console.log('----------');

// delete item
myMap.delete('shibuki');
console.log(myMap);
// Map {
//   'hoshimiya' => { name: 'Ichigo' },
//   'kiriya' => { name: 'Aoi' },
//   arisugawa: { name: 'Otome' }
// }

// map[key] = value で追加した値は削除できない
myMap.delete('arisugawa');
console.log(myMap);
// Map {
//   'hoshimiya' => { name: 'Ichigo' },
//   'kiriya' => { name: 'Aoi' },
//   arisugawa: { name: 'Otome' }
// }

// Map の初期化
myMap.clear();
console.log(myMap);
// => Map { arisugawa: { name: 'Otome' } }

console.log('----------');

// Map は文字列以外もキーにすることができる
// key は同じオブジェクトでないと取り出せない
const map = new Map();

const keyStr = '文字列';
const keyObj = {};
const keyFunc = () => {};
const keyBool = true;
const keyNaN = NaN;
const keyUndefined = undefined;

map.set(keyStr, 'ketStr');
map.set(keyObj, 'keyObj');
map.set(keyFunc, 'keyFunc');
map.set(keyBool, 'keyBool');
map.set(keyUndefined, 'keyUndefined');

const mapVal = getMapValue(map);
mapVal('文字列');
// => 'ketStr': keyStr === '文字列' => true

mapVal({});
// => undefined: keyObj === {} => false
mapVal(keyObj);
// => 'keyObj'

mapVal(() => {});
// => undefined: keyFunc === () => {} => false
mapVal(keyFunc);
// => 'keyFunc'

mapVal(true);
// => 'keyBool': keyBool === true => true
mapVal(keyBool);
// => 'keyBool'

mapVal(NaN);
// => undefined: keyNaN === NaN => false
mapVal(keyNaN);
// => undefined: keyNaN === keyNaN => NaN ===  NaN => false

mapVal(undefined);
// => 'keyUndefined': keyUndefined === undefined => undefined === undefined => true
mapVal(keyUndefined);
// => 'keyUndefined'

console.log('-------------');
// map をマージした場合、後から追加されたキーが残る
let first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'tree'],
]);

let second = new Map([
  [1, 'uno'],
  [2, 'dos'],
  ['3', 'tres'],
]);

let merged = new Map([...first, ...second]);
console.log(merged);
// => Map { 1 => 'uno', 2 => 'dos', 3 => 'tree', '3' => 'tres' }

console.log('-------------');
// Map は複製できるが shallow copy

let original = new Map([
  [1, ['one', 'two', 'tree']],
]);

let clone = new Map(original);

console.log(original === clone);
// => false
console.log(original.get(1) === clone.get(1));
// => true

original.get(1)[0] = 'uno';
console.log(original);
// => Map { 1 => [ 'uno', 'two', 'tree' ] }
console.log(clone);
// => Map { 1 => [ 'uno', 'two', 'tree' ] }s

console.log('-------------');

const Idols = [
  { id: 1, name: 'Ichigo' },
  { id: 7, name: 'Yurika' },
  { id: 6, name: 'Hinaki' },
  { id: 4, name: 'Akari' },
  { id: 5, name: 'Sumire' },
  { id: 9, name: 'Mikuru' },
  { id: 8, name: 'Mituki' },
  { id: 2, name: 'Aoi' },
  { id: 3, name: 'Ran' },
];

const convertMap = (data) => (key) => {
  const list = Object.entries(data.reduce((obj, data) => {
    const id = data[key];
    return {
      ...obj,
      [id]: data,
    };
  }, {}));
  console.log(list);
  return new Map(list);
};

console.log(convertMap(Idols)('id'));
