"use strict";
// $ node stdin.js
var input = '';
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  input += chunk;
});
process.stdin.on('end', function() {
  var d = input.toString().split('\n');
  console.log(d);
});
console.log("Input data & Close [ctr+D] >>>");
