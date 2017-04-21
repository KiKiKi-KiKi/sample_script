"use strict";
// 直積集合 Cartesian product
// 配列 総当り [2,3,4,5] * [2,3,4,5]

var a = [2, 3, 4, 5],
    o = {},
    c = 0;

function set_to_obj(e, n) {
  if(e in o === false) {
    o[e] = [];
  }
  o[e].push(e*n);
}

!function() {
  // 重複を削除してソート
  a = a.filter((x, i, self)=>self.indexOf(x)===i).sort((x,y)=>x-y);

  console.log(a);

  while(a.length > 0) {
    let e = a.reverse().pop();
    a.reverse();
    set_to_obj(e, e);
    a.forEach((i)=> {
      c+=1;
      set_to_obj(e, i);
    });
  }

  console.log(o);
  console.log("処理数", c);

}();
