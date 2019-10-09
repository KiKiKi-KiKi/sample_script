Array.prototype.reject = function(func) {
  const arr = this;
  const res = [];
  
  if ( typeof(func) !== 'function' ) {
    return res;
  }

  arr.forEach(function(v) {
    if ( !func(v) ) {
      res.push(v);
    }  
  });

  return res;
}
