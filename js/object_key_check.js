"use strict";
var obj = {
  A: 0,
  B: 1,
  C: 2,
  D: "",
};
var foo;
obj.E = foo;

// Bad!
["A", "B", "C", "D", "E", "F"].forEach(function(key) {
  if( obj[key] ) {
    console.log( key, obj[key] );
  }
});

console.log("-------------");

// Good!
["A", "B", "C", "D", "E", "F"].forEach(function(key) {
  if( key in obj ) {
    console.log( key, obj[key] );
  }
});
