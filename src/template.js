'use strict';

function Template(config) {
  this.selectNode = config.selectNode;
  this.title = this.selectNode.getAttribute('title');
  this.optionNodeList = Array.prototype.slice.call(this.selectNode.options);
  this.css = config.css;
}

Template.prototype.getPseudoSelectHTML = function(option) {
  var pseudoSelectHTML = [];
  var optionText;
  var label;

  if(option) {
    optionText = option.innerHTML;
  } else {
    optionText = this.optionNodeList[this.selectNode.selectedIndex].innerHTML;
  }

  label = this.title + ' ' + optionText;

  pseudoSelectHTML.push('<a href="#" class="' + this.css.pseudoSelect + '" role="button" aria-expanded="false" aria-label="' + label + '">');
  pseudoSelectHTML.push(optionText);
  pseudoSelectHTML.push('</a>');

  return pseudoSelectHTML.join('');
};

Template.prototype.getOptionsContainerHTML = function() {
  var optionsHTML = [];

  optionsHTML.push('<ul role="menu">');
  this.optionNodeList.forEach(function(optionNode) {
    optionsHTML.push('<li role="presentation">');
    optionsHTML.push('<a href="#" tabindex="-1" role="menuitem" data-value="' + optionNode.value + '">');
    optionsHTML.push(optionNode.innerHTML);
    optionsHTML.push('</a>');
    optionsHTML.push('</li>');
  });
  optionsHTML.push('</ul>');

  return optionsHTML.join('');
};

module.exports = Template;
