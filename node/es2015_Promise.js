'use strict'
// Promise Object
/*
> new Promise(function(resolve, reject) { ... } );
refs
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Using_promises
- https://qiita.com/koki_cheese/items/c559da338a3d307c9d88
- https://qiita.com/toshihirock/items/e49b66f8685a8510bd76
*/

function hi(name) {
  console.log(`>>> ${name} Promise start`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(name) {
        resolve(`Hi, ${name}!`)
      } else {
        reject('ERROR name is empty!')
      }
    }, 100)
  })
}

// then(func success, func failure)
hi('星宮いちご').then((res) => {
  console.log(res)
})
.catch((error) => {
  console.log(error)
})

hi().then((res) => {
  console.log(res)
})
.catch((error) => {
  console.log(error)
})

// nest
hi('星宮いちご').then((res) => {
  console.log(`1. ${res}`)
  return hi('霧矢あおい')
})
.then((res) => {
  console.log(`2. ${res}`)
})
.catch((error) => {
  // 共通のエラー処理
  console.log(error)
})
