// プロパティのキーと値の変数が同じ場合省略可能
// ES5
let cute = '星宮いちご';
let cool = '霧矢あおい';
let sexy = '紫吹蘭';
const soleil_es5 = {
  cute: cute,
  cool: cool,
  sexy: sexy,
};
console.log( soleil_es5 );
// { cute: '星宮いちご', cool: '霧矢あおい', sexy: '紫吹蘭' }
const soleil_es2015 = { cute, cool, sexy };
console.log( soleil_es2015 );
// { cute: '星宮いちご', cool: '霧矢あおい', sexy: '紫吹蘭' }

