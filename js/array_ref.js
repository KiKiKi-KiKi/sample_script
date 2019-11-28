let arg = ['シャミ子', 'もも', 'みかん'];

// 配列は参照
const refArg = arg;

arg.push('シャミ先');
console.log(refArg);
// => [ 'シャミ子', 'もも', 'みかん', 'シャミ先' ]

// 配列をからにする時に代入をすると参照が切れる
arg = [];
console.log(arg);
// => []
console.log(refArg);
// => [ 'シャミ子', 'もも', 'みかん', 'シャミ先' ]

arg = refArg;

// Array.length = 0 で配列を空にできる
// ※ 代入してないので参照が切れない
arg.length = 0;
console.log(arg);
// => []
console.log(refArg);
// => []

arg.push('メタ子');
console.log(refArg);
// => [ 'メタ子' ]

// 関数に引数で渡した配列も参照になっているので扱いには注意が必要
arg = ['Shamiko', 'Chiyoda Momo', 'Hinatsuki Mikan', 'Ririsu', 'Sata Anri', 'Ogura Shion'];

// !!! This function has side-effect !!!
const sort = (array) => {
  const arr = array.sort();
  console.log('sorted > ', arr);
  return arr;
}

sort(arg);
// sorted >
// [ 'Chiyoda Momo', 'Hinatsuki Mikan', 'Ogura Shion', 'Ririsu', 'Sata Anri' 'Shamiko' ]
console.log('origin >', arg);
// origin >
// [ 'Chiyoda Momo', 'Hinatsuki Mikan', 'Ogura Shion', 'Ririsu', 'Sata Anri', 'Shamiko' ]

console.log('---------------')
arg = ['Shamiko', 'Chiyoda Momo', 'Hinatsuki Mikan', 'Ririsu', 'Sata Anri', 'Ogura Shion'];

const sortWithoutSideEffect = (array) => {
  const arr = array.slice().sort();
  console.log('sorted > ', arr);
  return arr;
}

sortWithoutSideEffect(arg);
// sorted >
// [ 'Chiyoda Momo', 'Hinatsuki Mikan', 'Ogura Shion', 'Ririsu', 'Sata Anri' 'Shamiko' ]
console.log('origin >', arg);
// origin >
// [ 'Shamiko', 'Chiyoda Momo', 'Hinatsuki Mikan', 'Ririsu', 'Sata Anri', 'Ogura Shion' ]


console.log('Object.freeze -----')

Object.freeze(arg);
console.log( Object.isFrozen(arg) )
// => true

try {
  // Frozen されたオブジェクトを変更しようつするとエラーになる
  arg.push('Yoshua');
  // => TypeError
} catch(e) {
  console.log(e);
}

try {
  // 参照元に対して破壊的メソッドが使われると同様にエラーになる
  sort(arg);
  // => TypeError
} catch(e) {
  console.log(e);
}

// コピーしてしまえば操作することができる
const argCopy = arg.slice();
console.log( argCopy.reverse() );
// => [ 'Ogura Shion', 'Sata Anri', 'Ririsu', 'Hinatsuki Mikan', 'Chiyoda Momo' 'Shamiko' ]
