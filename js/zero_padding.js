// zero padding

const zeroPadding = (num) => (digits = 2) => {
  if (num.toString().length > digits) {
    return num.toString();
  }
  const prefix = '0'.repeat( digits );
  return `${prefix}${num}`.slice( -digits );
};

console.log( zeroPadding(3)(2) );   // => "03"
console.log( zeroPadding(10)(2) );  // => "10"
console.log( zeroPadding(100)(2) ); // => "100"

console.log('----------');

// ES2017
// cf. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
const fillLeftPadding = (num) => (digits = 2) => {
  return num.toString().padStart(digits, 0);
};

console.log( fillLeftPadding(3)(2) );   // => "03"
console.log( fillLeftPadding(10)(2) );  // => "10"
console.log( fillLeftPadding(100)(2) ); // => "100"

console.log('----------');

// format to decimal place digits

const formatToDecimalPlaceDigits = (num) => (digits = 2) => {
  if (Number.isFinite(digits) === false || digits < 1) {
    return Math.round(num);
  }
  const decimalDigits = 10 ** Math.floor(digits);
  return Math.round( Number.parseFloat(num) * decimalDigits ) / decimalDigits;
};

var n = 1.41421356;

console.log( formatToDecimalPlaceDigits(n)(2) );  // => 1.41
console.log( formatToDecimalPlaceDigits(n)(6) );  // => 1.414214
console.log( formatToDecimalPlaceDigits(5.1)(2) );  // => 5.1
console.log( formatToDecimalPlaceDigits(5.1)(-1) ); // => 5
console.log( formatToDecimalPlaceDigits(-1.235)(2) ); // => -1.24
console.log( formatToDecimalPlaceDigits('3.14')(1) ); // => 3.1
console.log( formatToDecimalPlaceDigits(false)(1) );  // => NaN

console.log('----------');

const formatToDecimalPlaceDiditsString = (num) => (digits = 2) => {
  return Number.parseFloat(num).toFixed(digits);
};

console.log( formatToDecimalPlaceDiditsString(n)(2) );  // => "1.41"
console.log( formatToDecimalPlaceDiditsString(n)(6) );  // => "1.414214"
console.log( formatToDecimalPlaceDiditsString(5.1)(2) );  // => "5.10"
//console.log( formatToDecimalPlaceDiditsString(5.1)(-1) );
// => RangeError: toFixed() digits argument must be between 0 and 100
console.log( formatToDecimalPlaceDiditsString(-1.235)(2) ); // => "-1.24"
console.log( formatToDecimalPlaceDiditsString('3.14')(1) ); // => "3.1"
console.log( formatToDecimalPlaceDiditsString(false)(1) );  // => "NaN"
