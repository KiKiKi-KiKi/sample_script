"use strict";
module.exports = function() {
  return {
    start: function() {
      console.time('a');
    },
    end: function() {
      console.timeEnd('a');
    }
  }
}
