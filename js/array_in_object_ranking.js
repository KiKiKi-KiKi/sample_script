'use strict';

const data = [];

const initData = (arr, n = 26) => {
  if (n > 26) { n = 26; }
  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  [...Array(n)].map((v, i) => {
    const item = {
      id: keys[i],
      score: Math.floor(Math.random() * 100) / 10,
    };
    arr.push(item);
  });
};
initData(data);

console.log( 'data', data );
console.log('---');

const rejectItem = (arr, key = 'score') => ( limit = 0 ) => {
  return arr.filter((item) => {
    return item[key] > limit;
  });
}

const sortByScore = (arr, key1 = 'score', key2 = 'id') => (orderBy = 'ASC') => {
  const sorted = [...arr].sort(function(a, b) {
    if ( orderBy === 'DESC' ) {
      [a, b] = [b, a];
    }
    return (a[key1] > b[key1] || a[key1] === b[key1] && a[key2] > b[key2])? 1 : -1;
  });
  console.log('sorted', orderBy, "\n", sorted);
  return sorted;
};

const mapKeyArray = (arr, key = 'id') => {
  return arr.map((item) => {
    return item[key];
  });
}

const mapRanking = (arr, key = 'id') => (sorted) => {
  const sortedKey = mapKeyArray(sorted, key);
  const ranking = [...arr].map((item) => {
    const id = item[key];
    // no rank data: array.indexOf(id) = -1 + 1 => 0
    const rank = sortedKey.indexOf(id) + 1;
    return {...item, ranking: rank || null};
  });

  return ranking;
}

const over2Data = rejectItem(data)(2);

const asc = sortByScore( over2Data )('ASC');
console.log('---');
const desc = sortByScore( over2Data )('DESC');
console.log('---');
console.log('ASC sorted');
console.log( mapRanking(data)(asc) );
console.log('---');
console.log('DESC sorted');
console.log( mapRanking(data)(desc) );
