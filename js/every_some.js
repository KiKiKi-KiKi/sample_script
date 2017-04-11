var d = [
  "217.0.0.0",
  "169.254.0.1",
  "0.0.0.256",
  "1.0.-1.255",
  ".0.0.0"
];
d.forEach(function(s, i) {
  let arr = s.split(".").map(function(i){
    if(/[0-9]/g.test(i)) {
      return i-0;
    } else {
      return i;
    }
  });
  d[i] = arr;
});
console.log(d);
var a = [];

// for in
console.log("------------------------");
console.log(">> for (in break)");
d.forEach(function(arr, i) {
  let isOK = true;
  for(let j=0,l=arr.length; j<l; j+=1) {
    let n = arr[j];
    if( typeof(n) !== 'number' || (n < 0 || n > 255) ) {
      console.log("break!", n);
      isOK = false;
      break;
    }
  }
  if(isOK) {
    a[a.length] = arr;
  }
});
console.log("result:\n", a);

a = [];
// every
console.log("------------------------");
console.log(">> every");
d.forEach(function(arr, i) {
  let callback = function(i) {
    /*
    let isOK = true;
    if(typeof(i) !== 'number' || (i < 0 || i > 255) ) isOK = false;
    console.log(i);
    return isOK;
    */
    // console.log(i);
    return (typeof(i) === 'number' && (i >= 0 && i <= 255) );
  };
  if( arr.every(callback) ) {
    a[a.length] = arr;
  }
});
console.log("result:\n", a);

a = [];
// some
console.log("------------------------");
console.log(">> some");
d.forEach(function(arr, i) {
  let callback = function(i) {
    /*
    let hasNG = false;
    if(typeof(i) !== 'number' || (i < 0 || i > 255) ) hasNG = true;
    console.log(i);
    return hasNG;
    */
    // console.log(i);
    return (typeof(i) !== 'number' || (i < 0 || i > 255) );
  };
  if( !arr.some(callback) ) {
    a[a.length] = arr;
  }
});
console.log("result:\n", a);
