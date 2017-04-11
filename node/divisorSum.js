"use strict";
// 約数の和を返す
// n: Init
module.exports = function(n) {
  if(n < 0) n = -n;
  let c = Math.floor(n/2)+1, r = (n-0);
  while(c--) {
    if(n%c === 0) r += c;
  }
  return r;
}
