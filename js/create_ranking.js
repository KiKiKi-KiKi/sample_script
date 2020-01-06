'use strict';

const idols = [
  {id: 1,  name: '星宮いちご',  score: 90},
  {id: 2,  name: '霧矢あおい',  score: 85},
  {id: 3,  name: '紫吹蘭',     score: 80},
  {id: 4,  name: '有栖川おとめ', score: 85},
  {id: 5,  name: '藤堂ユリカ',  score: 87},
  {id: 6,  name: '神崎美月',   score: 92},
  {id: 7,  name: '夏樹みくる',  score: 80},
  {id: 8,  name: '大空あかり',  score: 92},
  {id: 9,  name: '氷上すみれ',  score: 83},
  {id: 10, name: '新条ひなき',  score: 80},
];

const filterScore = (list) => (limit = 0) => {
  return list.filter((item) => {
    return item.score > limit;
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

const mapDataToKeyArray = (arr, key = 'id') => {
  return arr.map((item) => {
    return item[key];
  });
};

const getIndexFromRankArray = (arr) => (id) => {
  return arr.findIndex((keys) => {
    return keys.some((_id) => {
      return _id === id;
    });
  });
}

const mapDataToRankingArray = (arr, id = 'id') => (key = 'score') => {
  return arr.reduce((accumlator, item, index, _list) => {
    if ( index > 0 ) {
      const prevValue = _list[index - 1][key];
      // same ranking
      if ( prevValue === item[key] ) {
        accumlator[accumlator.length - 1].push(item[id]);
        return accumlator;
      }
    }
    accumlator[accumlator.length] = [item[id]];
    return accumlator;
  }, []);
};

const mapDataToRankingArraySkipRankBeforeSameRanks = (arr, id = 'id') => (key = 'score') => {
  const rankList = arr.reduce((accumlator, item, index, _list) => {
    if ( index > 0 ) {
      const prevValue = _list[index - 1][key];
      // same ranking
      if ( prevValue === item[key] ) {
        const prevID = _list[index - 1][id];
        const sameRankIndex = getIndexFromRankArray(accumlator)(prevID);
        accumlator[sameRankIndex].push(item[id]);
        accumlator.push([]);
        return accumlator;
      }
    }
    accumlator[accumlator.length] = [item[id]];
    return accumlator;
  }, []);

  // trim last empty index
  rankList.reverse();

  const i = rankList.findIndex((_arr) => {
    return _arr.length;
  });

  return rankList.slice(i).reverse();
};

console.log('SORT DESC');
const idolsOrderByScoreDESC = sortByScoreAndID(idols)('DESC');
console.log(idolsOrderByScoreDESC);

console.log("\n");
console.log('> map Name');
console.log( mapDataToKeyArray(idolsOrderByScoreDESC, 'name') );

console.log("\n");
console.log('> map RankingArray');
console.log( mapDataToRankingArray(idolsOrderByScoreDESC, 'name')('score') );

console.log("\n");
console.log('> map RankingArray skip same rank');
console.log( mapDataToRankingArraySkipRankBeforeSameRanks(idolsOrderByScoreDESC, 'name')('score') );


console.log("\n");
console.log('>> Simple Ranking');

const addRankingByIds = (list, id = 'id') => (sorted) => {
  sorted = sorted || list;
  const ids = mapDataToKeyArray(sorted, id);
  return list.map((item) => {
    const ranking = ids.indexOf(item[id]) + 1;
    return {...item, ranking: ranking || null};
  });
};

console.log( addRankingByIds(idols)(idolsOrderByScoreDESC) );
console.log('---');
console.log( addRankingByIds(idolsOrderByScoreDESC)() );

console.log("\n");
console.log('>> Ranking Allow Same Rank');

const addRankingAllowSameRank = (list, id = 'id') => (sorted, key = 'score') => (allowSkipRank = true) => {
  sorted = sorted || list;
  const rankingList = allowSkipRank
    ? mapDataToRankingArraySkipRankBeforeSameRanks(sorted, id)(key)
    : mapDataToRankingArray(sorted, id)(key);
  return list.map((item) => {
    const ranking = getIndexFromRankArray(rankingList)(item[id]) + 1;
    return {...item, ranking: ranking || null};
  });
};

console.log( addRankingAllowSameRank(idols)(idolsOrderByScoreDESC)(false) );
console.log('---');
console.log( addRankingAllowSameRank(idolsOrderByScoreDESC)()(false) );

console.log("\n");
console.log('>> Ranking Allow Same Rank And Skin Rank after same ranks');

console.log( addRankingAllowSameRank(idols)(idolsOrderByScoreDESC)(true) );
console.log('---');
console.log( addRankingAllowSameRank(idolsOrderByScoreDESC)()(true) );
