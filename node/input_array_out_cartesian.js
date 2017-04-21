"use strict";
var input = '';
var cartesian = require('./modules/cartesianProduct.js');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  input += chunk;
});
process.stdin.on('end', function() {
  var d = input.toString().split('\n')[0].split(" ").map((i)=> i-0),
      seed = (d[1]-d[0]),
      arr = [];

  // ランダムな配列を作成
  for(let i=d[0]; i<d[1]; i+=1) {
    arr.push( Math.floor( Math.random()*seed + d[0] ) );
  }

  // console.log(arr);
  var output = cartesian(arr);
  // console.log(output);
});
console.log("Input data & Close [ctr+D] >>>");
