// プロパティのキーと値の変数が同じ場合省略可能
// ES5
let cute = '星宮いちご';
let cool = '霧矢あおい';
let sexy = '紫吹蘭';

// ES5
let soleil_es5 = {
  cute: cute,
  cool: cool,
  sexy: sexy,
};
console.log( soleil_es5 );
// { cute: '星宮いちご', cool: '霧矢あおい', sexy: '紫吹蘭' }

// ES2015
let soleil_es2015 = { cute, cool, sexy };
console.log( soleil_es2015 );
// { cute: '星宮いちご', cool: '霧矢あおい', sexy: '紫吹蘭' }

// set function
// ES5
soleil_es5 = {
  cute: cute,
  cool: cool,
  sexy: sexy,
  toString: function() {
    return `ES5 Soleil ${this.cute}, ${this.cool}, ${this.sexy}`;
  }
};
console.log( soleil_es5.toString() );
// ES5 Soleil 星宮いちご, 霧矢あおい, 紫吹蘭

// ES2015
soleil_es2015 = {
  cute,
  cool,
  sexy,
  toString() {
    return `ES2015 Soleil ${this.cute}, ${this.cool}, ${this.sexy}`;
  }
};
console.log( soleil_es2015.toString() );
// ES2015 Soleil 星宮いちご, 霧矢あおい, 紫吹蘭

// Set Object key via Variable
const key = 'pop';
const value = '夏樹みくる';

// ES5
const es5Obj = {};
es5Obj[key] = value;
console.log('ES5', es5Obj);
// ES5 { pop: '夏樹みくる' }

// ES2015
const es2015Obj = {
  [key]: value,
};
console.log('ES2015', es2015Obj);
// ES2015 { pop: '夏樹みくる' }

let i = 0;
const myObj = {
  [`index-${++i}`]: i * i,
  [`index-${++i}`]: i * i,
  [`index-${++i}`]: i * i,
};
console.log( myObj);
// { 'index-1': 1, 'index-2': 4, 'index-3': 9 }
