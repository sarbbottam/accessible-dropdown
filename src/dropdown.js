'use strict';

var CHANGE_EVENT = new Event('change');

var Template = require('./template');
var Dictionary = require('./dictionary');

function Dropdown(config) {
  var css;

  this.selectNode = config.selectNode;
  this.selectedIndex = this.selectNode.selectedIndex;
  this.parentNode = config.parentNode || this.selectNode.parentNode;
  this.Template = config.Template || Template;

  css = config.css;

  this.css = {
    hide: css && css.hide ? css.hide : 'hide',
    pseudoSelect: css && css.pseudoSelect ? css.pseudoSelect : 'pseudo-select',
    pseudoSelectFocus: css && css.pseudoSelectFocus,
    options: css && css.options ? css.options : 'options'
  };

  this.dictionary = new Dictionary(config.optionList || []);
  this.template = new this.Template({
    selectNode: config.selectNode,
    css: {
      pseudoSelect: this.css.pseudoSelect
    }
  });
  this.desiredOptionStartsWith = '';
  this.isVisible = false;
}

function getOption(option) {
  if(option.tagName.toLowerCase() !== 'a') {
    option = option.querySelector('a');
  }
  return option;
}


function focusOption() {
  var selectedOption = this.optionNodeList[this.selectedIndex];
  selectedOption.focus();
  selectedOption.scrollIntoView();
}

function showOptions() {
  if(!this.isVisible) {
    // reinitialize selected index from the actual selectNode
    // it would be used for keydown handler
    this.selectedIndex = this.selectNode.selectedIndex;
    this.optionsContainerNode.classList.remove(this.css.hide);
    this.pseudoSelectNode.querySelector('a').classList.add(this.css.pseudoSelectFocus);
    // this query would also be passed as the config.
    focusOption.bind(this)();
    this.isVisible = true;
  }
}

function hideOptions() {
  if(this.isVisible) {
    this.optionsContainerNode.classList.add(this.css.hide);
    this.pseudoSelectNode.querySelector('a').classList.remove(this.css.pseudoSelectFocus);
    this.isVisible = false;
  }
}

function showHideOptionsContainerNode() {
  if(this.isVisible) {
    hideOptions.bind(this)();
  } else {
    showOptions.bind(this)();
  }
}

function selectOption(e) {
  var option;
  var value;

  option = getOption(e.target);
  value = option.getAttribute('data-value');

  if(value !== this.selectNode.value) {
    this.pseudoSelectNode.innerHTML = this.template.getPseudoSelectHTML(option);
    this.selectNode.value = value;
    // dispatch change event on the selectNode
    this.selectNode.dispatchEvent(CHANGE_EVENT);
  }
  // focus the anchor tag
  this.pseudoSelectNode.querySelector('a').focus();
  hideOptions.bind(this)();
}

function optionsKeydownHandler(e) {
  var menuSize;

  // only interested for up and down arrow
  if(e.keyCode === 38 || e.keyCode === 40) {
    e.preventDefault();
    e.stopPropagation();
    menuSize = this.optionNodeList.length;

    switch(e.keyCode) {
      case 38:
        if(this.selectedIndex > 0) {
          this.selectedIndex -= 1;
        }
        break;
      case 40:
        if(this.selectedIndex < menuSize - 1) {
          this.selectedIndex += 1;
        }
        break;
    }
  }

  focusOption.bind(this)();

  // if tab or esc is pressed hide the options container
  if(e.keyCode === 9 || e.keyCode === 27) {
    hideOptions.bind(this)();
  }

  // this will be used in optionsMousemoveHandler
  this.event = e.type;
}

function optionsKeypressHandler(e) {
  // http://stackoverflow.com/questions/7330724/event-keycode-not-returning-correct-values-in-firefox#answer-7330817
  var charCode = (typeof e.which === 'number') ? e.which : e.keyCode;
  var desiredOptionIndex = 0;
  // halt for space and arrow keys
  e.preventDefault();
  e.stopPropagation();

  this.currentKeyPressTime = new Date().getTime();
  if(this.previousKeyPressTime && (this.currentKeyPressTime - this.previousKeyPressTime) > 500) {
    this.desiredOptionStartsWith = '';
  }
  this.previousKeyPressTime = this.currentKeyPressTime;
  this.desiredOptionStartsWith = this.desiredOptionStartsWith + String.fromCharCode(charCode).toLowerCase();
  // do not update the selectedindex if desiredOptionIndex is -1
  // firefox/windows hack, firefox/windows listening to up/down/right/left arrow keypress
  desiredOptionIndex = this.dictionary.getIndexOfDesiredOption(this.desiredOptionStartsWith);

  if(desiredOptionIndex !== -1) {
    this.selectedIndex = desiredOptionIndex;
    focusOption.bind(this)();
  }

  // this will be used in optionsMousemoveHandler
  this.event = e.type;
}

function pseudoSelectKeydownHandler(e) {
  if(e.keyCode === 38 || e.keyCode === 40) {
    e.preventDefault();
    e.stopPropagation();
    showOptions.bind(this)();
  }
  //optionsKeydownHandler.bind(this)(e);
}

function pseudoSelectKeypressHandler(e) {
  showOptions.bind(this)();
  optionsKeydownHandler.bind(this)(e);
}

function optionsMousemoveHandler(e) {

  if( !(this.event === 'keydown' || this.event === 'keypress') ) {
    var option = getOption(e.target);
    option.focus();
    this.selectedIndex = this.optionNodeList.indexOf(option);
  }

  // this will be used in optionsMousemoveHandler
  this.event = e.type;
}

function injectDropdownContainerNode() {

  var dropdownContainerNode;
  var pseudoSelectNode;
  var optionsContainerNode;

  /*
   * create a div (dropdownContainerNode) as the container
   * to wrap pseudoSelectNode & optionsContainerNode
   */
  dropdownContainerNode = document.createElement('div');

  pseudoSelectNode = document.createElement('div');
  pseudoSelectNode.innerHTML = this.template.getPseudoSelectHTML();

  optionsContainerNode = document.createElement('div');
  /*
   * ToDo:
   * does not look clean
   * need to revist
   */
  optionsContainerNode.classList.add(this.css.hide);
  this.css.options.split(' ').forEach(function(css) {
    optionsContainerNode.classList.add(css); // hook to add styles
  });
  optionsContainerNode.innerHTML = this.template.getOptionsContainerHTML();

  dropdownContainerNode.appendChild(pseudoSelectNode);
  dropdownContainerNode.appendChild(optionsContainerNode);

  this.parentNode.appendChild(dropdownContainerNode);

  this.dropdownContainerNode = dropdownContainerNode;
  this.pseudoSelectNode = pseudoSelectNode;
  this.optionsContainerNode = optionsContainerNode;
}

Dropdown.prototype.init = function() {
  injectDropdownContainerNode.bind(this)();

  this.optionNodeList = Array.prototype.slice.call(this.optionsContainerNode.querySelectorAll('a'));

  this.selectNode.classList.add(this.css.hide);

  this.pseudoSelectNode.addEventListener('click', showHideOptionsContainerNode.bind(this));
  this.pseudoSelectNode.addEventListener('keydown', pseudoSelectKeydownHandler.bind(this));
  this.pseudoSelectNode.addEventListener('keypress', pseudoSelectKeypressHandler.bind(this));

  this.optionsContainerNode.addEventListener('click', selectOption.bind(this));
  this.optionsContainerNode.addEventListener('keydown', optionsKeydownHandler.bind(this));
  this.optionsContainerNode.addEventListener('keypress', optionsKeypressHandler.bind(this));
  this.optionsContainerNode.addEventListener('mousemove', optionsMousemoveHandler.bind(this));

  document.addEventListener('click', hideOptions.bind(this), true);
};

module.exports = Dropdown;
