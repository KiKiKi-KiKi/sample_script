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

console.log('-------------------');
// ref. https://chaika.hatenablog.com/entry/2020/01/04/090000

const idols = [
  {id: 1,  name: '星宮いちご',  score: 90},
  {id: 2,  name: '霧矢あおい',  score: 83},
  {id: 3,  name: '紫吹蘭',     score: 80},
  {id: 4,  name: '有栖川おとめ', score: 85},
  {id: 5,  name: '藤堂ユリカ',  score: 87},
  {id: 6,  name: '神崎美月',   score: 92},
  {id: 7,  name: '夏樹みくる',  score: 80},
  {id: 8,  name: '大空あかり',  score: 91},
  {id: 9,  name: '氷上すみれ',  score: 83},
  {id: 10, name: '新条ひなき',  score: 80},
];

const sortByScore2 = (arr) => (orderby = 'DESC') => {
  return [...arr].sort((a, b) => {
    if ( a.score === b.score ) {
      return 0;
    }

    if ( orderby === 'ASC' ) {
      [a, b] = [b, a];
    }

    return a.score > b.score ? -1 : 1;
  });
};

const sortByScoreAndID = (arr) => (orderby = 'DESC') => {
  return [...arr].sort((a, b) => {
    if ( orderby === 'ASC' ) {
      [a, b] = [b, a];
    }

    return (a.score > b.score || a.score === b.score && a.id < b.id) ? -1 : 1;
  });
};

const sortByScoreDESC = (arr) => {
  return [...arr].sort((a, b) => {
    if ( a.score === b.score ) { return 0; }
    return a.score > b.score ? -1 : 1;
  });
};

const sortByScoreASC = (arr) => {
  return [...arr].sort((a, b) => {
    if ( a.score === b.score ) { return 0; }
    return a.score < b.score ? -1 : 1;
  });
};

const mapDataToKeyArray = (arr, key = 'id') => {
  return arr.map((item) => {
    return item[key];
  });
};

const mapRankingToData = (arr, key = 'id') => (sortedArr) => {
  const sortedKeys = mapDataToKeyArray(sortedArr, key);
  const ranking = arr.map((item) => {
    const id = item[key];
    // no rank data: array.indexOf(id) = -1 + 1 => 0
    const rank = sortedKeys.indexOf(id) + 1;
    // have to copy item.
    return {...item, ranking: rank || null};
  });

  return ranking;
};

console.log('SORT DESC');
console.log( sortByScoreAndID(idols)('DESC') );
console.log('---');
console.log('SORT ASC');
console.log( sortByScoreAndID(idols)('ASC') );
console.log('---');
const idolsOrderByScoreDESC = sortByScoreAndID(idols)('DESC');
// console.log( mapDataToKeyArray(idolsOrderByScoreDESC, 'name') );

console.log('DESC---');
console.log(
  mapRankingToData(idols)(idolsOrderByScoreDESC)
);

console.log('DESC---');
console.log(
  mapRankingToData(idols, 'name')(idolsOrderByScoreDESC)
);

console.log('---');
console.log(idols);

const filterScore = (arr) => (limit) => {
  return arr.filter((item) => {
    return item.score > limit;
  });
};

const overScore85Idols = filterScore(idols)(85);
console.log('DESC---');
console.log(
  mapRankingToData(overScore85Idols)(sortByScoreAndID(overScore85Idols)('DESC'))
);

const sortedIdols = sortByScoreAndID(overScore85Idols)('DESC');
console.log('DESC---');
console.log(
  mapRankingToData(sortedIdols)(sortedIdols)
);
