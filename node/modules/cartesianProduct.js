"use strict";
// 配列 総当り結果を返す
// arr: Array
module.exports = function(arr) {
  var obj = {},
      a = arr.filter((x, i, self)=>self.indexOf(x)===i).sort((x,y)=>x-y),
      c = 0;

  // console.log(a);
  console.time('run');

  function set_to_obj(e, n) {
    if(e in obj === false) {
      obj[e] = [];
    }
    obj[e].push(e*n);
  }

  while(a.length > 0) {
    let e = a.reverse().pop();
    a.reverse();
    set_to_obj(e, e);
    a.forEach((i)=> {
      c+=1;
      set_to_obj(e, i);
    });
  }

  console.timeEnd('run');
  console.log("処理数", c);

  return obj;
}
