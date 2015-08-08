var Dropdown = require('../src/dropdown');
var TemplateWithFlag = require('./template-with-flag');
var TemplateWithFlagComposite = require('./template-with-flag-composite');

var countryDropdown;
var countrySelectNode = document.getElementById('country');
var countryOptionNodeList = Array.prototype.slice.call(countrySelectNode.options);
var countryOptionList = [];

countryOptionNodeList.forEach(function(optionNode) {
  countryOptionList.push(optionNode.innerHTML.toLowerCase().trim());
});

countryDropdown = new Dropdown({
  selectNode: countrySelectNode,
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
  Template: TemplateWithFlag,
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


var countryWithFlagCompositeDropdown;
var countryWithFlagCompositeSelectNode = document.getElementById('country-with-flag-composite');
var mobileNumber = document.getElementById('mobile-number');
var countryWithFlagCompositeOptionNodeList = Array.prototype.slice.call(countryWithFlagCompositeSelectNode.options);
var countryWithFlagCompositeOptionList = [];

countryWithFlagCompositeOptionNodeList.forEach(function(optionNode) {
  countryWithFlagCompositeOptionList.push(optionNode.innerHTML.toLowerCase().trim());
});

countryWithFlagCompositeDropdown = new Dropdown({
  selectNode: countryWithFlagCompositeSelectNode,
  correspondingNode: mobileNumber,
  Template: TemplateWithFlagComposite,
  optionList: countryWithFlagCompositeOptionList,
  css : {
    hide : 'hide',
    pseudoSelect: 'pseudo-select drop-down pseudo-select-composite',
    pseudoSelectFocus: 'pseudo-select-focus',
    options: 'options options-composite'
  }
});

countryWithFlagCompositeDropdown.init();

countryWithFlagCompositeSelectNode.addEventListener('change', function(e) {
  mobileNumber.focus();
});
