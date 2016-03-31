'use strict';

var CHANGE_EVENT;

/* istanbul ignore next */
if (typeof Event === 'function') {
  CHANGE_EVENT = new Event('change');
}

var Template = require('./template');
var Dictionary = require('./dictionary');
var StyleUpdater = require('./style-updater');

function Dropdown(config) {
  var css;

  this.selectNode = config.selectNode;
  this.selectedIndex = this.selectNode.selectedIndex;
  this.parentNode = config.parentNode || this.selectNode.parentNode;
  this.correspondingNode = config.correspondingNode;
  this.Template = config.Template || Template;

  css = config.css;

  /* istanbul ignore next */
  this.css = {
    hide: css && css.hide ? css.hide : 'hide',
    pseudoSelect: css && css.pseudoSelect ? css.pseudoSelect : 'pseudo-select',
    pseudoSelectFocus: css && css.pseudoSelectFocus,
    options: css && css.options ? css.options : 'options'
  };

  /* istanbul ignore next */
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
  // set selectedIndex to the selectedIndex the actual selectNode
  this.selectedIndex = this.selectNode.selectedIndex;
  this.optionsContainer.classList.remove(this.css.hide);
  /* istanbul ignore next */
  if(this.correspondingNode) {
    this.correspondingNode.classList.add(this.css.pseudoSelectFocus);
  } else {
    this.pseudoSelectContainer.querySelector('a').classList.add(this.css.pseudoSelectFocus);
  }
  focusOption.bind(this)();
  this.isVisible = true;
}

function hideOptions() {
  this.optionsContainer.classList.add(this.css.hide);
  this.pseudoSelectContainer.querySelector('a').classList.remove(this.css.pseudoSelectFocus);
  this.isVisible = false;
}

function showHideOptionsContainer(e) {
  e.preventDefault();
  e.stopPropagation();
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
    this.pseudoSelectContainer.innerHTML = this.template.getPseudoSelectHTML(option);
    this.selectNode.value = value;
  }
  // focus the anchor tag
  this.pseudoSelectContainer.querySelector('a').focus();
  /* istanbul ignore next */
  if(this.correspondingNode) {
    this.styleUpdater.adjustCorrespondingNodePadding();
  }
  // dispatch change event on the selectNode
  /* istanbul ignore next */
  if(CHANGE_EVENT) {
    this.selectNode.dispatchEvent(CHANGE_EVENT);
  }
  hideOptions.bind(this)();
}

function optionsKeydownHandler(e) {
  var optionListLength;

  /*
   * only interested in following keys
   * up arrow      38
   * down arrow    40
   * end           35
   * home          36
   * page up       33
   * page down     34
   * tab           9
   * esc           27
   */

  if(e.keyCode === 38 || e.keyCode === 40 ||
      e.keyCode === 35 || e.keyCode === 36 ||
      e.keyCode === 33 || e.keyCode === 34) {

    e.preventDefault();
    e.stopPropagation();

    optionListLength = this.optionNodeList.length;

    switch(e.keyCode) {
      case 38: // up arrow
        if(this.selectedIndex > 0) {
          this.selectedIndex -= 1;
        }
        break;
      case 40: // down arrow
        if(this.selectedIndex < optionListLength - 1) {
          this.selectedIndex += 1;
        }
        break;
      case 35: // end
        this.selectedIndex = optionListLength - 1;
        break;
      case 36: // home
        this.selectedIndex = 0;
        break;
      case 33: // page up
        this.selectedIndex -= 5;
        if(this.selectedIndex < 0) {
          this.selectedIndex = 0;
        }
        break;
      case 34: // page down
        this.selectedIndex += 5;
        if(this.selectedIndex >= optionListLength) {
          this.selectedIndex = optionListLength - 1;
        }
        break;
    }
  }

  focusOption.bind(this)();

  // if tab or esc is pressed hide the options container
  if(e.keyCode === 9 || e.keyCode === 27) {
    hideOptions.bind(this)();
  }

  if(e.keyCode === 27) {
    this.pseudoSelectContainer.querySelector('a').focus();
  }

  // this will be used in optionsMousemoveHandler
  this.event = e.type;
}

function optionsKeypressHandler(e) {
  // http://stackoverflow.com/questions/7330724/event-keycode-not-returning-correct-values-in-firefox#answer-7330817
  /* istanbul ignore next */
  var charCode = (typeof e.which === 'number') ? e.which : e.keyCode;
  var desiredOptionIndex = 0;

  // firefox listens to keypress for tab with charcode 0
  if (charCode === 0) {
    return;
  }

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
}

function pseudoSelectKeypressHandler(e) {
  // http://stackoverflow.com/questions/7330724/event-keycode-not-returning-correct-values-in-firefox#answer-7330817
  /* istanbul ignore next */
  var charCode = (typeof e.which === 'number') ? e.which : e.keyCode;

  // firefox listens to keypress for tab with charcode 0
  if (charCode === 0) {
    return;
  }
  showOptions.bind(this)();
}

function optionsMousemoveHandler(e) {

  if( !(this.event === 'keydown' || this.event === 'keypress') ) {
    var option = getOption(e.target);
    option.focus();
    this.selectedIndex = this.optionNodeList.indexOf(option);
  }

  // this will be used in optionsMousemoveHandler (this function)
  this.event = e.type;
}

function injectDropdownContainer() {

  var dropdownContainer;
  var pseudoSelectContainer;
  var optionsContainer;

  /*
   * create a div (dropdownContainer) as the container
   * to wrap pseudoSelectContainer & optionsContainer
   */
  dropdownContainer = document.createElement('div');

  /*
   * required to test, if the container has been injected in the document
   * should it be an id instead of a class?
   */
  dropdownContainer.classList.add('dropdown-container');

  pseudoSelectContainer = document.createElement('div');
  pseudoSelectContainer.innerHTML = this.template.getPseudoSelectHTML();

  optionsContainer = document.createElement('div');
  optionsContainer.classList.add(this.css.hide);
  this.css.options.split(' ').forEach(function(css) {
    optionsContainer.classList.add(css);
  });
  optionsContainer.innerHTML = this.template.getOptionsContainerHTML();

  dropdownContainer.appendChild(pseudoSelectContainer);
  dropdownContainer.appendChild(optionsContainer);

  /* istanbul ignore next */
  if(this.correspondingNode) {
    this.parentNode.insertBefore(dropdownContainer, this.correspondingNode);
  } else {
    this.parentNode.appendChild(dropdownContainer);
  }

  this.dropdownContainer = dropdownContainer;
  this.pseudoSelectContainer = pseudoSelectContainer;
  this.optionsContainer = optionsContainer;
}

Dropdown.prototype.init = function() {
  injectDropdownContainer.bind(this)();

  this.optionNodeList = Array.prototype.slice.call(this.optionsContainer.querySelectorAll('a'));

  this.selectNode.classList.add(this.css.hide);

  this.pseudoSelectContainer.addEventListener('click', showHideOptionsContainer.bind(this));
  this.pseudoSelectContainer.addEventListener('keydown', pseudoSelectKeydownHandler.bind(this));
  this.pseudoSelectContainer.addEventListener('keypress', pseudoSelectKeypressHandler.bind(this));

  this.optionsContainer.addEventListener('click', selectOption.bind(this));
  this.optionsContainer.addEventListener('keydown', optionsKeydownHandler.bind(this));
  this.optionsContainer.addEventListener('keypress', optionsKeypressHandler.bind(this));
  this.optionsContainer.addEventListener('mousemove', optionsMousemoveHandler.bind(this));

  /* istanbul ignore next */
  if(this.correspondingNode) {
    this.styleUpdater = new StyleUpdater({
      pseudoSelectContainer: this.pseudoSelectContainer,
      correspondingNode: this.correspondingNode,
      extraPadding: 10
    });
    this.styleUpdater.adjustCorrespondingNodePadding();
    this.pseudoSelectContainer.querySelector('a').addEventListener('focus', function() {
      this.correspondingNode.classList.add(this.css.pseudoSelectFocus);
    }.bind(this));
  }

  document.addEventListener('click', hideOptions.bind(this), false);
};

module.exports = Dropdown;
