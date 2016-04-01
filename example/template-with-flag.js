'use strict';

function Template(config) {
  this.selectNode = config.selectNode;
  this.title = this.selectNode.getAttribute('title');
  this.optionNodeList = Array.prototype.slice.call(this.selectNode.options);
  this.css = config.css;
}

Template.prototype.getPseudoSelectHTML = function(option) {
  var pseudoSelectHTML = [];
  var isoCountryCode = '';

  var optionText;
  var label;

  if(option) {
    optionText = option.innerHTML;
  } else {
    optionText = this.optionNodeList[this.selectNode.selectedIndex].innerHTML;
  }

  label = this.title + ' ' + optionText.replace(/\<span.*span\>/, '');

  pseudoSelectHTML.push('<a href="#" class="' + this.css.pseudoSelect + '" role="button" aria-expanded="false" aria-label="' + label + '">');
  if(option) {
    pseudoSelectHTML.push(optionText);
  } else {
    isoCountryCode = this.optionNodeList[this.selectNode.selectedIndex].getAttribute('data-iso-country-code');
    pseudoSelectHTML.push('<span class="flag ' + isoCountryCode + '"></span>');
    pseudoSelectHTML.push(optionText);
  }
  pseudoSelectHTML.push('</a>');

  return pseudoSelectHTML.join('');
};

Template.prototype.getOptionsContainerHTML = function() {
  var optionsHTML = [];
  var isoCountryCode = '';

  optionsHTML.push('<ul role="menu">');
  this.optionNodeList.forEach(function(optionNode) {
    isoCountryCode = optionNode.getAttribute('data-iso-country-code');
    optionsHTML.push('<li role="presentation">');
    optionsHTML.push('<a href="#" tabindex="-1" role="menuitem" data-iso-country-code="' + isoCountryCode + '" data-value="' + optionNode.value + '">');
    optionsHTML.push('<span class="flag ' + isoCountryCode + '"></span>');
    optionsHTML.push(optionNode.innerHTML);
    optionsHTML.push('</a>');
    optionsHTML.push('</li>');
  });
  optionsHTML.push('</ul>');

  return optionsHTML.join('');
};

module.exports = Template;
