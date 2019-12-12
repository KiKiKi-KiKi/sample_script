const greet = ({
  name,
  msg = 'Hello',
} = {}) => {
  console.log(`${msg}, ${name}!`);
};

greet({name: 'Ichigo'});
// => Hello, Ichigo!

greet({name: 'Ichigo', msg: 'Hi'});
// => Hi, Ichigo!

const func = ({foo = 'bar'}) => console.log(foo);
// func();
// TypeError: Cannot destructure property `foo` of 'undefined' or 'null'.
func({});
// => bar
func({foo: 'hoge'});
// => hoge

!function() {
  const obj = {};
  const { foo = 'foo' } = obj;
  console.log(obj.foo); // undefined
  console.log(foo);     // 'foo'
}();

!function() {
  const obj = { foo: undefined };
  const { foo = 'foo' } = obj;
  console.log(obj.foo); // undefined
  console.log(foo);     // 'foo'
}();

!function() {
  const obj = { foo: undefined };
  const { foo: foo = 'foo' } = obj;
  console.log(obj.foo); // undefined
  console.log(foo);     // 'foo'
}();

console.log('---');
!function() {
  const obj = { foo: undefined };
  const { foo: val = 'foo' } = obj;
  console.log(obj.foo); // undefined
  // console.log(foo);  // ReferenceError: foo is not defined
  console.log(val);     // 'foo'
}();

console.log('---');
!function() {
  const { foo: val = 'foo' } = { foo: 'hoge' };
  // console.log(foo);  // ReferenceError: foo is not defined
  console.log(val);     // 'hoge'
}();

// ref. https://qiita.com/otsukayuhi/items/5dfb407b124783a39f04

console.log('---');
!function() {
  const obj = { foo: val = 'foo' };
  console.log(obj); // { foo: 'foo' }
  console.log( {foo: val = 'foo'} = {foo: 'hoo'} )
}();

console.log('---');
!function() {
  const obj = { a: 'bar', b: 'buzz'};
  const { foo, bar } = obj;
  console.log( foo, bar ); // undefined undefined
  const { a: c, b } = obj;
  // const { a: c, b: b } = obj;
  console.log(b, c);
}();
