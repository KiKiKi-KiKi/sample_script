'use strict'

function myFunc(a, b = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(a) {
        let res = (a + b) * 2
        console.log(`(${a} + ${b}) * 2 = ${res}`)
        resolve( res )
      } else {
        reject(`Error a is ${a}`)
      }
    }, 10)
  })
}

function onReject(error) {
  console.log('>> onReject', error)
}

myFunc(1).then((res1) => {
  return myFunc(2, res1)
})
.then((res2) => {
  return myFunc(3, res2)
})
.then((res3) => {
  console.log('> Promaise Complete', res3)
})
.catch(onReject)
// => (1 + 0) * 2 = 2
// => (2 + 2) * 2 = 8
// => (3 + 8) * 2 = 22
// => Promaise Complete 22

setTimeout(() => {

console.log('----')
myFunc(1).then((res1) => {
  return myFunc(0, res1)
})
.then((res2) => {
  return myFunc(3, res2)
})
.then((res3) => {
  console.log('> Promaise Complete', res3)
})
.catch(onReject)
// => (1 + 0) * 2 = 2
// => >> onReject error

}, 50)

// then(successCallback, failureCallback)でメソッドチェーンしている場合
setTimeout(() => {
console.log('---- then ')

myFunc(1).then(
  (res1) => myFunc(0, res1),
  (error) => console.log('Error 1')
)
.then(
  (res2) => myFunc(3, res2),
  (error) => console.log('Error 2')
)
.then(
  (res3) => console.log('> Promaise Complete', res3),
  (error) => console.log('Error 3')
)
.catch(onReject)
// => (1 + 0) * 2 = 2
// => Error 2
// => > Promaise Complete undefined

}, 100)

setTimeout(() => {
console.log('---- nest')

myFunc(1).then((res1) => {
  myFunc(0, res1).then((res2) => {
    myFunc(3, res2).then((res3) => {
      console.log('> Promaise Complete', res3)
    }, (error) => console.log('Error 3'))
  }, (error) => console.log('Error 2'))
}, (error) => console.log('Error 1'))
// => (1 + 0) * 2 = 2
// => Error 2

}, 150)


setTimeout(() => {
console.log('--- no error handle')

myFunc(1).then(
  (res1) => myFunc(0, res1)
).then(
  (res2) => myFunc(3, res2)
).then(
  (res3) => console.log('> Promaise Complete', res3)
)
// => UnhandledPromiseRejectionWarning
// => DeprecationWarning

}, 200)

setTimeout(() => {
console.log('---')

myFunc(0).then(
  (res1) => myFunc(2, res1),
  (error) => {
    console.log('Error 1')
    return 'Foo'
})
.then(
  (res2) => console.log('> Promise Complete:', res2),
  (error) => console.log('Error2', error)
)
// => Error 1
// => > Promise Complete: Foo

}, 250)

setTimeout(() => {
console.log('-----')

myFunc(0).then(
  (res1) => myFunc(2, res1),
  (error) => {
    console.log('Error 1')
    return Promise.reject('Reject 1')
})
.then(
  (res2) => console.log('> Promise Complete:', res2),
  (error) => console.log('Error2', error)
)
// => Error 1
// => Error2 Reject 1

}, 300)

function myFunc2(a, b = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(!a) {
        reject(`Error a is ${a}`)
      }
      let res = (a + b) * 2
      console.log(`(${a} + ${b}) * 2 = ${res}`)
      resolve( res )
    }, 10)
  })
}

setTimeout(() => {
console.log('-------')

myFunc2(0).then(
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

}, 350)

setTimeout(() => {
console.log('>>> Common Function')
}, 400)
