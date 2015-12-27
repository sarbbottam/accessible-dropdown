'use strict';

function Index(optionList) {
  this.optionList = optionList;
}

// returns the index of the first desired option
Index.prototype.getIndexOfDesiredOption = function(desiredOptionStartsWith) {

  var optionList = this.optionList;
  var low = 0, high = optionList.length - 1, mid;
  var currentOptionStartsWith;
  var substrLength = desiredOptionStartsWith.length;
  var desiredOption = -1;

  while (low <= high) {
    mid = Math.floor((low + high) / 2) || 0;
    currentOptionStartsWith = this.optionList[mid].substr(0, substrLength);

    if (currentOptionStartsWith < desiredOptionStartsWith) {
      low = mid + 1;
    }
    else if (currentOptionStartsWith > desiredOptionStartsWith) {
      high = mid - 1;
    }
    else {
      desiredOption = mid;
      high = mid - 1;
    }
  }

  return desiredOption;
};

module.exports = Index;
