// Proxy Object
// Proxy オブジェクトは、基本的な操作 (例えばプロパティの検索、代入、列挙、関数の起動など) について独自の動作を定義するために使用します。
// new Proxy(target, handler);
// ref. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy

let obj = {
  hoo: 'bar'
};

let p = new Proxy(obj, {
  get: function(target, name) {
    return name in target? target[name] : 37;
  }
})

p.a = 1;
p.b = undefined;

console.log( typeof(p) ); // object
console.log(p.a, p.b); // 1 undefine
console.log('c' in p, p.c); // false 37

// Proxyオブジェクトに対する変更はtargetにも反映される
console.log(obj.a); // 1
console.log(obj.c); // undefined

const validator = {
  set: function(obj, prop, value) {
    if( prop === 'age' ) {
      if( !Number.isInteger(value) ) {
        throw new TypeError("年齢が整数ではありません");
      }
      if( value > 200 ) {
        throw new RangeError('年齢が不正なようです')
      }
    }
    // set value
    obj[prop] = value;
    // save complete
    return true;
  }
};

let person = new Proxy({}, validator);
person.name = 'Jhone';
person.age = 100;
console.log(person.name, person.age); // 100
try {
  person.age = 'young'; // TypeError: 年齢が整数ではありません
} catch(err) {
  console.log(err);
}
try {
  person.age = 300;     // RangeError: 年齢が不正なようです
} catch(err) {
  console.log(err);
}

// コンストラクタを拡張する
console.log('>>> Construcor Extend')
function extend(sup, base) {
  // Object.getOwnPropertyDescriptor
  //
  const descriptor = Object.getOwnPropertyDescriptor(
    base.prototype, "constructor"
  );
  console.log("descriptor", descriptor);
  base.prototype = Object.create(sup.prototype);

  const handler = {
    construct: function(target, args) {
      let obj = Object.create(base.prototype);
      this.apply(target, obj, args);
      return obj;
    },
    apply: function(target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    }
  };

  const proxy = new Proxy(base, handler);
  descriptor.value = proxy;
  // Object.defineProperty
  // あるオブジェクトに新しいプロパティを直接定義したり、オブジェクトの既存のプロパティを変更したりして、そのオブジェクトを返します。
  Object.defineProperty(base.prototype, "constructor", descriptor);
  return proxy;
}

const Person = function(name) {
  this.name = name;
};
const Boy = extend(Person, function(name, age) {
  this.age = age;
});

Boy.prototype.sex = 'M';

let Peter = new Boy("Peter", 13);
console.log('Peter > ', Peter); // Peter > Person { name: 'Peter', age: 13 }
console.log(Peter.name, Peter.age, Peter.sex); // Peter 13 M

let descriptor = Object.getOwnPropertyDescriptor(Peter, 'age');
console.log(descriptor);
/*
{ value: 13,
  writable: true,
  enumerable: true,
  configurable: true }
*/
