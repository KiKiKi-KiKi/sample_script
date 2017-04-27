"use strict";
// 配列 総当り結果を返す
// arr: Array
module.exports = function(arr) {
  var obj = {},
      arr1 = arr.filter((x, i, self)=>self.indexOf(x)===i).sort((x,y)=>x-y),
      arr2 = arr1.slice(),
      // 計算結果
      z = [],
      c = 0;
  console.log(arr1);
  z = multiply_karatsuba(arr1, arr2);
  //z = do_carry(z);

  // 繰り上がり処理
  function do_carry(a) {
    let cr = 0;
    for(let i=0,l=a.length; i<l; i+=1) {
      a[i] += cr;
      cr = a[i] / 10;
      a[i] -= cr * 10;
    }
    return a;
  }

  // 乗算 ( 標準(筆算)法 )
  function multiply_normal(a, b) {
    let a_len = a.length,
        b_len = b.length,
        z = [];

    for(let j=0; j<b_len; j+=1) {
      for(let i=0; i<a_len; i+=1) {
        console.log("["+(i+j)+"]=", (a[i] * b[j]));
        z[ j + i ] = (a[i] * b[j]);
      }
    }
    return z;
  }

  // 乗算 ( Karatsuba 法 )
  function multiply_karatsuba(a, b) {
    let t_size = a.length;


    if(t_size <= 4) {
      // ４桁（配列４個）になった場合は標準乗算
      return multiply_normal(a, b);
    }


    // 配列分割
    let t_size_half = t_size/2;
    let a_1 = a.slice(t_size_half),
        a_0 = a.slice(0, t_size_half),
        b_1 = b.slice(t_size_half),
        b_0 = b.slice(0, t_size_half);

    // v = a1 + a0, w = b1 + b0
    let v = [],
        w = [],
        c = Math.floor(t_size_half),
        i = 0;
    while(i < c) {
      v.push( a_1[i] + a_0[i] );
      w.push( b_1[i] + b_0[i] );
      i+=1;
    }

    // x1 = a0 * b0
    let x_1 = multiply_karatsuba(a_0, b_0)

    // x2 = a1 * b1
    let x_2 = multiply_karatsuba(a_1, b_1)

    // x3 = (a1 + a0) * (b1 + b0)
    let x_3 = multiply_karatsuba(v,  w)

    // x3 = x3 - x1 - x2
    for(let i=0, l=t_size; i<l; i+=1) {
      x_3[i] -= x_1[i] + x_2[i];
    }

    // z = x2 * R^2 + (x3 - x2 - x1) * R + x1
    let z = x_1.concat(x_2);
    for(let i=0, l=t_size; i<l; i+=1) {
      z[i + (t_size/2)] += x_3[i];
    }
  }

  console.log(z);

  return obj;
}
