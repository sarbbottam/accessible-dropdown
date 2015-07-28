var Dropdown = require('../src/dropdown');
var Template = require('./template');

var countryDropdown;
var countrySelectNode = document.getElementById('country');
var countryOptionNodeList = Array.prototype.slice.call(countrySelectNode.options);
var countryOptionList = [];

countryOptionNodeList.forEach(function(optionNode) {
  countryOptionList.push(optionNode.innerHTML.toLowerCase().trim());
});

countryDropdown = new Dropdown({
  selectNode: countrySelectNode,
  //Template: Template,
  optionList: countryOptionList,
  css : {
    hide : 'hide',
    pseudoSelect: 'pseudo-select drop-down',
    pseudoSelectFocus: 'pseudo-select-focus',
    options: 'options'
  }
});

countryDropdown.init();

countrySelectNode.addEventListener('change', function(e) {
  /*
   * do what ever you want to do ...
   */
});


var countryWithFlagDropdown;
var countryWithFlagSelectNode = document.getElementById('country-with-flag');
var countryWithFlagOptionNodeList = Array.prototype.slice.call(countryWithFlagSelectNode.options);
var countryWithFlagOptionList = [];

countryWithFlagOptionNodeList.forEach(function(optionNode) {
  countryWithFlagOptionList.push(optionNode.innerHTML.toLowerCase().trim());
});

countryWithFlagDropdown = new Dropdown({
  selectNode: countryWithFlagSelectNode,
  Template: Template,
  optionList: countryWithFlagOptionList,
  css : {
    hide : 'hide',
    pseudoSelect: 'pseudo-select drop-down',
    pseudoSelectFocus: 'pseudo-select-focus',
    options: 'options'
  }
});

countryWithFlagDropdown.init();

countryWithFlagSelectNode.addEventListener('change', function(e) {
  /*
   * do what ever you want to do ...
   */
});
