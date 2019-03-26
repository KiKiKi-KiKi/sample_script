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
