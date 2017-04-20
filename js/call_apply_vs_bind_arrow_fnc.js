'use strict';
var global = Function("return this")();
global.name = 'global';

var callback = function() {
  console.log('> callback >> ', this.name);
};

var obj1 = {
  name: "obj1"
};

var obj2 = {
  name: "obj2"
};

var applyFnc = function(f) {
  console.log('> applyFnc this = ', this);
  if(typeof(f) === 'function') {
    let _this = this || global;
    f.apply(_this);
  }
};

var callFnc = function(f) {
  console.log('> callFnc this = ', this);
  if(typeof(f) === 'function') {
    let _this = this || global;
    f.call(_this);
  }
};

applyFnc(callback);
callFnc(callback);
console.log('>>> use Function.prototype.bind() <<<');
applyFnc(callback.bind(obj1));
callFnc(callback.bind(obj1));

applyFnc.call(obj2, callback.bind(obj1));
callFnc.call(obj2, callback.bind(obj1));

console.log('>>> use () => <<<');
obj1.func1 = function() {
  console.log('obj1.func this = ', this);
  applyFnc(()=>{
    console.log('> callback >> ', this.name);
  });
  callFnc(()=> {
    console.log('> callback >> ', this.name);
  });
};
obj1.func1();

obj1.func2 = function() {
  applyFnc.call(obj2, ()=>{
    console.log('> callback >> ', this.name);
  });
  callFnc.call(obj2, ()=> {
    console.log('> callback >> ', this.name);
  });
};
obj1.func2();

var bindCallBack = callback.bind(obj1);
console.log(bindCallBack);
