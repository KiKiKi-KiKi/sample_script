"use strict";
var d = [
  0,
  "0",
  "",
  undefined,
  "undefined",
  false,
  "false",
  true,
  "true",
  null,
  "null",
  NaN,
  "NaN",
  Infinity,
  "Infinity",
  -Infinity,
  "-Infinity",
  "123",
  -5,
  12.8,
  "A"
];
console.log("N-0");
d.forEach(function(v) {
  console.log(v + " (" + typeof(v) + ") =>", v-0);
});

// isNaN()
console.log("-------------------");
d.forEach(function(v) {
  if( isNaN(v) ) {
    console.log('isNaN >', v, "("+typeof(v)+")");
  }
});
console.log("-------------------");
d.forEach(function(v) {
  if( Number.isNaN(v) ) {
    console.log('Number.isNaN >', v, "("+typeof(v)+")");
  }
});

// !isFinite()
console.log("-------------------");
d.forEach(function(v) {
  if( isFinite(v) ) {
    console.log('isFinite >', v, "("+typeof(v)+")");
  }
});
console.log("-------------------");
d.forEach(function(v) {
  if( Number.isFinite(v) ) {
    console.log('Number.isFinite >', v, "("+typeof(v)+")");
  }
});

// Number.isInteger() ES6
console.log("-------------------");
d.forEach(function(v) {
  if( Number.isInteger(v) ) {
    console.log('Number.isInteger >', v, "("+typeof(v)+")");
  }
});

console.log("-------------------");
var a = d.filter(function(val, i) {
  if( !isFinite(val) || typeof(val) === "boolean" ) {
    console.log("< reject:", val, "("+typeof(val)+")");
    return false;
  }
  console.log('TEST:', val, "("+typeof(val)+")");
  if( typeof(val) === 'number'
   || (typeof(val) === 'string' && val !== "")
   || val - 0 !== 0
  ) {
    console.log(">", val, "is Number");
    return true;
  }
});
console.log(a);

console.log("-------------------");
a = d.filter(function(val, i) {
  if( !isFinite(val) || typeof(val) === "boolean") {
    console.log("< reject:", val, "("+typeof(val)+")");
    return false;
  }
  console.log('TEST:', val, "("+typeof(val)+")");
  if( val-0 === 0 ) {
    if(/[0-9]/g.test(val)) {
      console.log(">", val, "is Number");
      return true;
    }
    console.log("<< reject:", val);
  } else {
    return true;
  }
});
console.log(a);
