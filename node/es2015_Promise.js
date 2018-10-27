'use strict'
// Promise Object
/*
> new Promise(function(resolve, reject) { ... } );
refs
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Using_promises
- https://qiita.com/koki_cheese/items/c559da338a3d307c9d88
- https://qiita.com/toshihirock/items/e49b66f8685a8510bd76
- https://qiita.com/naoto_koyama/items/7234d133f0d5f87532db
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

// ## 並行処理
// ### Promise.all(iterable)
// ref. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
/*
> Promise.all(iterable)メソッドは、
> iterable のすべての Promise が完了したときや、
> iterable な引数に Promise が含まれないときに、完了した Promiseを返します。
> 最初に失敗した Promise の失敗理由とともに失敗を返します。
*/
Promise.all([
  hi('神前美月'),
  hi('藤堂ユリカ'),
  hi('一ノ瀬かえで')
])
.then((res) => {
  // すべての非同期処理が完了したら、結果がArrayで返される
  console.log(res)
})
.catch((error) => console.log(error))
// [ 'Hi, 神前美月!', 'Hi, 藤堂ユリカ!', 'Hi, 一ノ瀬かえで!' ]

var p1 = Promise.resolve(3)
var p2 = 1337
var p3 = new Promise((resolve, reject) => setTimeout(reject, 100, 'Foo'))
var p4 = Promise.reject('Bar')

Promise.all([p1, p2, p3, p4])
.then(
  (res) => console.log(res),
  // 1つでもエラーがあると、最初にエラーになったものが返る
  (error) => console.log('e =>', error)
)
// e => Bar

// catch を使った場合も、最初にエラーになったものがキャッチされる
Promise.all([p1, p2, p3])
.then((res) => {
  console.log(res)
})
.catch((error) => {
  console.log('e =>', error)
})
// e => Foo

// ### Promise.race(iterable)
/*
> 引数 iterable に含まれる Promise のうち、
> 最初に完了 (成功または失敗) した Promise の値を返す Promise を返します。
*/
Promise.race([
  hi('風沢そら'),
  hi('冴草きい'),
  hi('音城セイラ'),
  hi('姫里マリア')
])
.then((res) => {
  // 最初に完了した処理の返り値がそのまま渡される
  console.log(res)
})
.catch((err) => {
  console.log(err)
})
// Hi, 風沢そら!

var pError = Promise.reject('Error!')

Promise.race([
  pError,
  hi('冴草きい'),
  hi('音城セイラ'),
  hi('姫里マリア')
])
.then((res) => {
  console.log(res)
})
.catch((err) => {
  // 最初にエラーが返るとエラー処理に流れて終了する
  console.log('Error:', err)
})
// Error: Promise.race Error!

// => Promise.race() は`resolve`, `reject`関係なしに最初に返された処理だけが行われて終了する

console.log('---------')

const task1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('>> TASK-1')
      resolve('task1')
    }, 20)
  })
}

const task2 = () => {
  return new Promise((resolve, rejecy) => {
    setTimeout(() => {
      console.log('>> TASK-2')
      resolve('task2')
    }, 5)
  })
}

const task3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('>> TASK-3')
      reject('REJECT TASK3')
    }, 10)
  })
}

setTimeout(() => {
  console.log('--- Promise.all ---')
  Promise.all([task1(), task2(), task3()])
    .then((res) => {
      console.log('>>> Promise.all' ,res)
    })
    .catch((error) => {
      console.log('>>> Promise.all ERROR')
    })
  /*
  >> TASK-2
  >> TASK-3
  >>> Promise.all ERROR
  >> TASK-1
  => 非同期の処理はストップされない
  */
}, 500)

/*
Promise.all([task1(), task2(), task3()])
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.log('>>> Promise.all ERROR')
    process.exit(1)
  })
*/
// process.exit(1) を使うとエラーの場合その場でプロセスが止まる

setTimeout(() => {
  console.log('--- Promise.race ---')
  Promise.race([task1(), task3()])
    .then((res) => {
      console.log('>>> Promise.race' ,res)
    })
    .catch((error) => {
      console.log('>>> Promise.race ERROR')
    })

  /*
  >> TASK-3
  >>> Promise.race ERROR
  >> TASK-1
  */
  // Promise.race も同様に非同期の処理はストップしない
}, 1000)
