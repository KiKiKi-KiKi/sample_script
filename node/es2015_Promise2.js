'use strict'
function myFunc(a, b = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(!a) {
        reject( `Error a is ${a}` )
      }
      let res = (a + b) * 2
      console.log(`(${a} + ${b}) * 2 = ${res}`)
      resolve( res )
    }, 10)
  })
}

setTimeout(() => {
console.log('--- not use return ---')
myFunc(0)
.then((res) => console.log(res))
.then((res2) => console.log('CHAIN!!', res2))
.catch((error) => console.log(error))
//=> (0 + 0) * 2 = 0
//=> Error a is 0
}, 100)

setTimeout(() => {
console.log('--- not use return 2 ---')
myFunc(0)
.then(
  (res1) => {
    console.log('Success 1')
    return myFunc(2, res1)
  },
  (error) => {
    console.log('Error 1')
    return 'Bar'
})
.then(
  (res2) => console.log('> Promise Complete:', res2),
  (error) => console.log('Error2', error)
)
// => (0 + 0) * 2 = 0
// => Error 1
// => > Promise Complete: Bar
}, 200)


const task1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('> TASK-1')
      resolve('task1')
    }, 20)
  })
}

const task2 = () => {
  return new Promise((resolve, rejecy) => {
    setTimeout(() => {
      console.log('> TASK-2')
      resolve('task2')
    }, 5)
  })
}

const task3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('> TASK-3')
      reject('REJECT TASK3')
    }, 10)
  })
}

setTimeout(() => {
console.log('--- Promise.all ---')
Promise.all([task1(), task2(), task3()])
.then((res) => {
  console.log('>> Promise.all' ,res)
})
.catch((error) => {
  console.log('>> Promise.all ERROR')
})
  /*
  > TASK-2
  > TASK-3
  >> Promise.all ERROR
  > TASK-1
  => 非同期の処理はストップされない
  */

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
}, 400)

setTimeout(() => {
console.log('--- Promise.race ---')
Promise.race([task1(), task3()])
  .then((res) => {
    console.log('>> Promise.race', res)
  })
  .catch((error) => {
    console.log('>> Promise.race ERROR')
  })

/*
> TASK-3
>> Promise.race ERROR
> TASK-1
*/
// Promise.race も同様に非同期の処理はストップしない
}, 600)
