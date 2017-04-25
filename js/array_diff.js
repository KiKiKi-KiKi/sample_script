"use strict";

var oldArrys =[
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [0, 1, 2, 3, 4, 5, 6],
  [],
  [1, "サーバル", 3, "かばん"],
  ["あぶくま", "きそ", "しまかぜ", "ひびき", "わかば", "ながなみ"]
];

var newArrays = [
  [8, 2, 8, 4, 7, 9, 11, 8, 10],
  ['', 1, NaN, "3", null, 5, undefined],
  ["いちご", "あおい", "らん"],
  [1, 7, "ボス"],
  ["あぶくま", "きそ", "しまかぜ", "ひびき", "ながなみ"]
];

// Get Array Index & Value Diff
function getArrayIndexValueDiff(oldArr, newArr) {
  return newArr.filter((v, i)=> oldArr[i] !== v);
}

function getArrayIndexValueDiffBoth(arr1, arr2) {
  let _a1 = arr1,
      _a2 = arr2,
      _a2Len,
      res = [[],[]],
      reverse = false;
  if(_a1.length < _a2.length) {
    _a1 = arr2;
    _a2 = arr1;
    reverse = true;
  }
  _a2Len = _a2.length;
  res[0] = _a1.filter((v, i)=> {
    if(_a2[i] !== v) {
      if( i < _a2Len ) {
        res[1].push( _a2[i] );
      }
      return true;
    }
  });
  if(reverse) {
    res.reverse();
  }
  return res;
}

// Get Array Value Diff
function getArrayDiff(arr1, arr2) {
  let arr = arr1.concat(arr2);
  return arr.filter((v, i)=> {
    return !(arr1.indexOf(v) !== -1 && arr2.indexOf(v) !== -1);
  });
}

// Remove Array Duplication
function removeArrayDuplication(arr) {
  return arr.filter((v, i, t) => {
    return t.indexOf(v) === i;
  });
}

newArrays.forEach((v, i) => {
  let arr1 = oldArrys[i], arr2 = newArrays[i];
  console.log("------------------------");
  console.log("> TEST");
  console.log('OLD', arr1);
  console.log('NEW', arr2);

  console.log("------");
  console.log(">> Get Array Index & Value Diff");
  console.log( getArrayIndexValueDiff(arr1, arr2) );

  console.log("------");
  console.log(">> Get Array Index & Value Diff Both");
  console.log( getArrayIndexValueDiffBoth(arr1, arr2) );

  console.log("------");
  console.log(">> Get Array Value Diff");
  console.log( getArrayDiff(arr1, arr2) );

  console.log("----------");
  console.log(">> Remove Array Duplication");
  console.log( removeArrayDuplication( arr1.concat(arr2) ) );
});
