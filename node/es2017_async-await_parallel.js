// async / await での非同期処理の並行処理問題

// 実行時間計測 performance
const { PerformanceObserver, performance } = require('perf_hooks');

const arg = [2, 4, 6];
const answer = arg.reduce((x, y) => { return x + y * y * 2; }, 0);

const prindAnswer = (a, txt = '') => {
  console.log(`${txt}Answer = ${a}`);
};
prindAnswer(answer);

const waitSquareFunc = (x) => {
  // const sleep = Math.floor(Math.random() * 5 + 5) * 100;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve( x * x );
    }, 1000)
  });
};


console.log('--- LOOP ---');
const calculationByLoop = async (arg) => {
  const startAt = performance.now();
  let sum = 0
  for(let v of arg) {
    let squareV = await waitSquareFunc(v);
    // 直列処理する必要はないが 1000ms 待機してしまう
    console.log(squareV);
    sum += squareV * 2;
  }
  const endAt = performance.now();
  prindAnswer(sum, `LOOP ${ endAt - startAt }`);
  return sum;
};
calculationByLoop(arg);


const calculationByReduce = async (arg) => {
  const startAt = performance.now();
  const sum2 = await arg.reduce( async (x, add) => {
    // console.log('reduce', x, add);
    const a = await waitSquareFunc(add);
    console.log('reduce', x, a);
    // return 値にawait を付けないと、待たずに次のループに入ってしまうっぽい
    return await x + a * 2;
  }, 0);
  const endAt = performance.now();
  prindAnswer(sum2, `Array.reduce ${ endAt - startAt }`);
  return sum2;
};
setTimeout(() => {
  console.log('--- LOOP Reduce ---');
  calculationByReduce(arg);
}, 4000);


console.log('--- Promise.all & map ---');
// ※ Promise.all だと1つでもエラーになるとその後の処理ができなくなるので、工夫が必要
const calculationParallel = async (arg) => {
  const startAt = performance.now();
  const all = await Promise.all( arg.map( async (val) => {
    let squareV = await waitSquareFunc(val);
    console.log(squareV);
    return squareV * 2;
  } ) );
  const sum = all.reduce((x, y) => x + y);
  const endAt = performance.now();
  prindAnswer(sum, `Promise.all & map ${ endAt - startAt }`);
  return sum;
};
calculationParallel(arg);

console.log('--- Promise.all ---');
const calculationParallel2 = async (arg) => {
  const startAt = performance.now();
  const a = waitSquareFunc(2);
  const b = waitSquareFunc(4);
  const c = waitSquareFunc(6);
  const [aa, bb, cc] = await Promise.all([a, b, c]);
  const sum = (aa + bb + cc) * 2;
  const endAt = performance.now();
  prindAnswer(sum, `Promise.all ${ endAt - startAt }`);
  return sum;
};
calculationParallel2(arg);

// forEachは内部でasync / awaitを使ってもループ外はawaitされない
const calculationForEach = async (arg) => {
  const startAt = performance.now();
  let sum = 0;
  const f = await arg.forEach( async (val) => {
    const a = await waitSquareFunc(val);
    sum += a * 2;
  });
  const endAt = performance.now();
  console.log(f); // => undefined
  prindAnswer(sum, `ForEach ${ endAt - startAt }`);
  return sum;
};
setTimeout(() => {
  console.log('--- forEach ----')
  calculationForEach(arg);
  // => 0
}, 6000);
