'use strict';

function Index(optionList) {
  this.optionList = optionList;
}

function getFirstIndexOfDesiredOption(optionList, index, desiredOptionStartsWith) {
  var substrLength = desiredOptionStartsWith.length;
  while (index >= 0) {
    if(optionList[index].substr(0, substrLength) !== desiredOptionStartsWith) {
      break;
    }
    index -= 1;
  }
  return index + 1;
}

Index.prototype.getIndexOfDesiredOption = function(desiredOptionStartsWith) {

  var optionList = this.optionList;
  var low = 0, high = optionList.length - 1, mid;
  var currentOptionStartsWith;
  var substrLength = desiredOptionStartsWith.length;

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
      return getFirstIndexOfDesiredOption(this.optionList, mid, desiredOptionStartsWith);
    }
  }

  return -1;
};

module.exports = Index;
