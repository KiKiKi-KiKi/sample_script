"use strict";
// $ node stdin.js
var input = '';
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  input += chunk;
});
// SUCCESS 02_2
function getMixList(list) {
  var arg = [];
  list.forEach((v, i) => {
    let a = list.slice(i);
    if(a.length) a.forEach((w, j)=> arg[arg.length] = (v-0)*(w-0) );
  });
  arg = arg.filter((x, i, self) => self.indexOf(x) === i).sort((x,y)=>x-y);
  return arg;
};
function getA(list, x) {
  list.some((i)=> {
    if(i >= x) {
      console.log('解'+ i + '-' + x +"=", i-x);
      return true;
    }
  });
}

process.stdin.on('end', function() {
  console.log("-----");
  var d=input.toString().split('\n'),
      d1=d[0].split(" "), m=d1[0]-0, n=d1[1]-0;
      // p=d.slice(-(n+1), -1).filter((x, i, t)=> t.indexOf(x)===i).map((i)=> i-0).sort((x,y)=>x-y),
      //x=d.slice(1, m+1),
      //l=p[p.length-1], max = l*l, a = [];

  var p = [],
      z = [],
      p_len;

  d.slice(-(n+1), -1).forEach((v, i, t) => {
    if( t.indexOf(v) === i ) { p.push(v-0); }
  });

  p_len = p.length;

  while(p_len--) {
    var x = p[p_len];
    for(let i=0; i<=p_len; i+=1) {
      let xx = x*p[i];
      if( z.indexOf(xx) === -1 ) {
        z.push(xx);
      }
    }
  }

  function q_sort(arr) {
    if(arr.length < 1) return arr;
    let pivot = arr[0],
        left = [],
        right = [];

    for(let i=1,l=arr.length; i<l; i+=1) {
      let x = arr[i];
      if(x <= pivot) {
        left.push(x);
      } else {
        right.push(x);
      }
    }

    left = q_sort(left);
    right = q_sort(right);

    left.push(pivot);
    return left.concat(right);
  }
  z = q_sort(z);
  console.log(z);

  for(var i=1; i<=m; i+=1) {
    let s = d[i]-0,
        z_len = z.length,
        n = z[ Math.floor(z_len/2) ],
        c = 0,
        min;
    if(z.indexOf(s) !== -1) {
      min = 0;
    } else {
      if(s >= n) c = z_len;
      while(c<z_len) {
        if( z[c] >= s ) {
          min = z[c] - s;
          break;
        }
        c+=1;
      }
    }
    console.log('---');
    console.log(min);
  }

  //console.log('入れる個数', d.slice(1, m+1) );
  //console.log('辺', p);
  //var _p = getMixList(p);
  /*
  x.forEach((s, i)=> {
    console.log("----------------------------------------");
    getA(_p, s);
    let min = max, c = {}, keys, _max = 0;
    s-=0;
    //console.log("s >", s, 'max >', min);
    p.some((v)=> {
      let qo = Math.ceil(s/v),
          re = s%v;
      //console.log(s, v);
      //console.log(re + '+' + v + "(n >= ", qo, ")");
      if(re === 0 && p.indexOf(qo) !== -1) {
        //console.log('>> BINGO!');
        min = 0;
        return true;
      } else {
        // 最小予想値
        //console.log('最小値', (v*qo - s));
        if(qo > _max) _max = qo;
        if(qo in c === false) c[qo] = [];
        c[qo][ c[qo].length ] = function(s, x, n){
          return (x*n) - s;
        }.bind(null, s, v);
      }
    });
    //console.log(c);
    //console.log('_max', _max);
    keys = Object.keys(c);
    if(keys.length) {
      let _mins = [];
      keys.some((k)=> {
        p.some((n)=> {
          if(n>=k) {
            c[k].forEach((v, i)=> c[k][i] = c[k][i](n));
            //console.log('c[k] > ', c[k]);
            _mins[_mins.length] = (c[k].length > 1)? Math.min.apply(null, c[k]): c[k][0];
            //console.log(_mins);
            return true;
          }
        });
      });
      min = Math.min.apply(null, _mins);
      //console.log('min > ', min);
    }
    console.log('min =', min);
    a[a.length] = min;
   });
  */
  //console.log("---------------");
  // console.log(a.join("\n"));
});

console.log("Input data & Close [ctr+D] >>>");
