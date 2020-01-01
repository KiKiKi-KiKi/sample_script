const checkEqual = (val) => ({func, expect}) => {
  const res = func(val);
  if ( res !== expect ) {
    new Error(`Error: expect ${expect}, val is ${val}`);
    console.error('⛔️', expect, val, 'is', res);
  } else {
    console.log('✅', expect, val);
  }
};

const badIsNumber = (n) => {
  const val = n - 0;
  if ( val || val === 0 ) {
    return true;
  }
  return false;
}

const typeOfNumber = (n) => {
  return typeof(n) === 'number';
}

const isNumber = (n) => {
  if ( typeof(n) === 'number' && Number.isFinite(n) ) {
    return true;
  }
  return false;
};

const isNumber2 = (n) => {
  if ( typeof(n) === 'number' && n - n === 0 ) {
    return true;
  }
  return false;
};

const isNumberAllowString = (n) => {
  const type = typeof(n);
  if ( type === 'number' ) {
    return Number.isFinite(n);
  }

  if ( type === 'string' && n.trim() !== '' ) {
    return Number.isFinite(n-0);
  }
  return false;
};

const numberIsFinite = (n) => {
  return Number.isFinite(n);
};

// test
const testData = [
  {
    expect: true,
    list: [
      0,
      1,
      -1,
      10.10,
      -1.1,
      5e3,
      10e+3,
      10e-3,
      0xff,
      Math.PI,
      parseInt('012'),
      parseFloat('012.5'),
    ],
  },
  {
    expect: false,
    list: [
      Infinity,  // typeof(Infinity) -> number
      -Infinity, // typeof(-Infinity) -> number
      NaN,       // typeof(NaN) -> number
      null,
      undefined,
      true,
      false,
      '10',
      '-10',
      '',
      ' ',
      'string',
      [],
      [1],
      {},
      {a:1},
      function() {},
    ]
  }
];

console.log('typeof number');
testData.forEach((data) => {
  const expect = data.expect;
  data.list.forEach((val) => {
    checkEqual( val )({func: typeOfNumber, expect});
  });
});

console.log(`\nisNumber ----`);
testData.forEach((data) => {
  const expect = data.expect;
  data.list.forEach((val) => {
    checkEqual( val )({func: isNumber, expect});
  });
});

console.log(`\nisNumber2 ----`);
testData.forEach((data) => {
  const expect = data.expect;
  data.list.forEach((val) => {
    checkEqual( val )({func: isNumber2, expect});
  });
});

console.log(`\nisNumberAllowString ----`);
testData.forEach((data) => {
  const expect = data.expect;
  data.list.forEach((val) => {
    checkEqual( val )({func: isNumberAllowString, expect});
  });
});

console.log('----');
console.log('Infinity', isFinite(Infinity), Number.isFinite(Infinity));
// false, false
console.log('NaN', isFinite(NaN), Number.isFinite(NaN));
// false, false
console.log('"10"', isFinite("10"), Number.isFinite("10"));
// true, false
console.log('""', isFinite(""), Number.isFinite(""));
// true, false
console.log('[1]', isFinite([1]), Number.isFinite([1]));
// true false
console.log('[]', isFinite([]), Number.isFinite([]));
// true false

console.log( Infinity - Infinity );
// NaN
console.log( -Infinity - (-Infinity) );
// NaN
console.log( NaN - NaN );
// NaN

console.log('----');
testData.forEach((data) => {
  const expect = data.expect;
  data.list.forEach((val) => {
    checkEqual( val )({func: badIsNumber, expect});
  });
});

console.log('Number.isFinite----');
testData.forEach((data) => {
  const expect = data.expect;
  data.list.forEach((val) => {
    checkEqual( val )({func: numberIsFinite, expect});
  });
});
