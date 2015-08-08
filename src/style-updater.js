'use strict';

/* istanbul ignore next */
function getStyle(element, property) {
  return document.defaultView.getComputedStyle(element).getPropertyValue(property);
}

/* istanbul ignore next */
function StyleUpdater(config) {
  this.pseudoSelectContainer = config.pseudoSelectContainer;
  this.correspondingNode = config.correspondingNode;
  this.direction = config.direction || getStyle(document.body, 'direction');
  this.extraPadding = config.extraPadding || 0;
}

/* istanbul ignore next */
StyleUpdater.prototype.adjustCorrespondingNodePadding = function() {
  var padding = parseInt(getStyle(this.pseudoSelectContainer.querySelector('a'), 'width'), 10) + this.extraPadding + 'px';
  if(this.direction === 'ltr') {
    this.correspondingNode.style.paddingLeft = padding;
  } else {
    this.correspondingNode.style.paddingRight = padding;
  }
};

module.exports = StyleUpdater;
