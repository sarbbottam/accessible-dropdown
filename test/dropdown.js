'use strict';

describe('Dropdown', function() {
  var wrapper;
  var markup = '\
    <div> \
      <select id="drop-down" title="Country Code"> \
        <option data-iso-country-code="af" value="93"> Afghanistan (+93) </option> \
        <option data-iso-country-code="bd" value="880"> Bangladesh (+880) </option> \
        <option data-iso-country-code="kh" value="855"> Cambodia (+855) </option> \
        <option data-iso-country-code="ca" value="1"> Canada (+1) </option> \
        <option data-iso-country-code="dk" value="45"> Denmark (+45) </option> \
        <option data-iso-country-code="eg" value="20"> Egypt (+20) </option> \
        <option data-iso-country-code="fr" value="33"> France (+33) </option> \
        <option data-iso-country-code="de" value="49"> Germany (+49) </option> \
        <option data-iso-country-code="hk" value="852"> Hong Kong (+852) </option> \
        <option data-iso-country-code="hu" value="36"> Hungary (+36) </option> \
        <option data-iso-country-code="is" value="354"> Iceland (+354) </option> \
        <option data-iso-country-code="in" value="91"> India (+91) </option> \
        <option data-iso-country-code="jp" value="81"> Japan (+81) </option> \
        <option data-iso-country-code="np" value="977"> Nepal (+977) </option> \
        <option data-iso-country-code="us" value="1"> United States (+1) </option> \
        <option data-iso-country-code="zw" value="263"> Zimbabwe (+263) </option> \
      </select> \
    </div>';
  var event = require('../polyfill/event');
  var Dropdown = require('../src/dropdown');
  var dropdown;
  var selectNode;
  var optionNodeList;
  var optionList = [];
  var dropdownContainer;
  var pseudoSelect;
  var options;

  before(function() {
    wrapper = document.createElement('div');
    wrapper.innerHTML = markup;
    document.body.appendChild(wrapper);

    selectNode = document.getElementById('drop-down');
    optionNodeList = Array.prototype.slice.call(selectNode.options);

    optionNodeList.forEach(function(optionNode) {
      optionList.push(optionNode.innerHTML.toLowerCase().trim());
    });

    dropdown = new Dropdown({
      selectNode: selectNode,
      optionList: optionList,
      css: {
        hide: 'hide',
        pseudoSelect: 'pseudo-select',
        pseudoSelectFocus: 'pseudo-select-focus',
        options: 'options'
      }
    });

    dropdown.init();
    dropdownContainer = document.querySelector('.dropdown-container');
    pseudoSelect = dropdownContainer.querySelector('.pseudo-select');
    options = dropdownContainer.querySelector('.options');

  });

  it('should be a function', function() {
    assert.isFunction(Dropdown);
  });

  it('should return an object', function() {
    assert.isObject(dropdown);
  });

  describe('init', function() {
    it('should create the custom dropdown markup', function() {
      assert.ok(dropdownContainer);
    });

    it('should hide the options container', function() {
      assert.isTrue(options.classList.contains('hide'));
    });
  });

  describe('pseudo select click handlers', function() {
    it('should show the options if hidden when pseudo select is clicked', function() {
      event.triggerClickEvent(pseudoSelect);
      assert.isFalse(options.classList.contains('hide'));
    });

    it('should hide the options if visible when pseudo select is clicked', function() {
      event.triggerClickEvent(pseudoSelect);
      assert.isTrue(options.classList.contains('hide'));
    });
  });

  describe('options click handlers', function() {

    it('should select the current option (anchor tag) when clicked', function() {
      var desiredOption;
      var selectedOption;
      desiredOption = Array.prototype.slice.call(options.querySelectorAll('a'))[2];
      event.triggerClickEvent(desiredOption);
      selectedOption = dropdownContainer.querySelector('.pseudo-select').innerHTML;
      assert.equal(desiredOption.innerHTML, selectedOption);
    });

    it('should not update the selected option if the same option (anchor tag) is clicked again', function() {
      var desiredOption;
      var selectedOption;
      desiredOption = Array.prototype.slice.call(options.querySelectorAll('a'))[2];
      event.triggerClickEvent(desiredOption);
      selectedOption = dropdownContainer.querySelector('.pseudo-select').innerHTML;
      assert.equal(desiredOption.innerHTML, selectedOption);

      event.triggerClickEvent(desiredOption);
      assert.equal(desiredOption.innerHTML, selectedOption);
    });

    it('should select the current option (li tag) when clicked', function() {
      var desiredOption;
      var selectedOption;
      desiredOption = Array.prototype.slice.call(options.querySelectorAll('li'))[3];
      event.triggerClickEvent(desiredOption);
      selectedOption = dropdownContainer.querySelector('.pseudo-select').innerHTML;
      assert.equal(desiredOption.querySelector('a').innerHTML, selectedOption);
    });

    it('should not update the selected option if the same option (li tag) is clicked again', function() {
      var desiredOption;
      var selectedOption;
      desiredOption = Array.prototype.slice.call(options.querySelectorAll('li'))[3];
      event.triggerClickEvent(desiredOption);
      selectedOption = dropdownContainer.querySelector('.pseudo-select').innerHTML;
      assert.equal(desiredOption.querySelector('a').innerHTML, selectedOption);

      event.triggerClickEvent(desiredOption);
      assert.equal(desiredOption.querySelector('a').innerHTML, selectedOption);
    });

  });

  describe('options keydown handlers', function() {

    it('should highlight the last option on presssing end ', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeydownEvent(options, 35);
      assert.equal(document.activeElement, desiredOptions[desiredOptions.length - 1]);
    });

    it('should highlight the first option on presssing home ', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeydownEvent(options, 36);
      assert.equal(document.activeElement, desiredOptions[0]);
    });

    it('should highlight the next option on presssing down arrow ', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeydownEvent(options, 36);
      event.triggerKeydownEvent(options, 40);
      assert.equal(document.activeElement, desiredOptions[1]);
    });

    it('should keep the last option highlighted on pressing down arrow if the last option is already highlighted ', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeydownEvent(options, 35);
      event.triggerKeydownEvent(options, 40);
      assert.equal(document.activeElement, desiredOptions[desiredOptions.length - 1]);
    });

    it('should highlight the previous option on presssing up arrow ', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeydownEvent(options, 35);
      event.triggerKeydownEvent(options, 38);
      assert.equal(document.activeElement, desiredOptions[desiredOptions.length - 2]);
    });

    it('should keep the first option highlighted on pressing up arrow if the first option is already highlighted ', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeydownEvent(options, 36);
      event.triggerKeydownEvent(options, 38);
      assert.equal(document.activeElement, desiredOptions[0]);
    });

    it('should highlight the next fifth option on presssing page down', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeydownEvent(options, 36);
      event.triggerKeydownEvent(options, 34);
      assert.equal(document.activeElement, desiredOptions[5]);
    });

    it('should highlight the last option on presssing page down if the desired index is more than the limit', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeydownEvent(options, 35);
      event.triggerKeydownEvent(options, 38);
      event.triggerKeydownEvent(options, 38);
      event.triggerKeydownEvent(options, 34);
      assert.equal(document.activeElement, desiredOptions[desiredOptions.length - 1]);
    });

    it('should highlight the previous fifth option on presssing page up', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeydownEvent(options, 35);
      event.triggerKeydownEvent(options, 33);
      assert.equal(document.activeElement, desiredOptions[desiredOptions.length - 6]);
    });

    it('should highlight the first option on presssing page up if the desired index is less than the limit', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeydownEvent(options, 36);
      event.triggerKeydownEvent(options, 40);
      event.triggerKeydownEvent(options, 40);
      event.triggerKeydownEvent(options, 33);
      assert.equal(document.activeElement, desiredOptions[0]);
    });

    it('should hide the options if visible when esc is pressed', function() {
      event.triggerKeydownEvent(options, 27);
      assert.isTrue(options.classList.contains('hide'));
    });

    it('should hide the options if visible when esc is pressed', function() {
      event.triggerKeydownEvent(options, 9);
      assert.isTrue(options.classList.contains('hide'));
    });

  });

  describe('options keypress handlers', function() {

    // a better test title please
    it('should highlight the option Bangladesh', function(done) {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeypressEvent(options, 66);
      event.triggerKeypressEvent(options, 65);
      assert.equal(document.activeElement, desiredOptions[1]);
      setTimeout(function() {
        event.triggerKeypressEvent(options, 66);
        assert.equal(document.activeElement, desiredOptions[1]);
        done();
      }, 555);
    });

    // a better test title please
    it('should highlight the option Afghanistan', function(done) {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerKeypressEvent(options, 66);
      event.triggerKeypressEvent(options, 65);
      //assert.equal(document.activeElement, desiredOptions[1]);
      setTimeout(function() {
        event.triggerKeypressEvent(options, 65);
        assert.equal(document.activeElement, desiredOptions[0]);
        done();
      }, 555);
    });

  });

  describe('options mousemove handlers', function() {

    it('should highlight the option Afghanistan', function() {
      var desiredOptions = Array.prototype.slice.call(options.querySelectorAll('a'));
      event.triggerMousemoveEvent(options);
      event.triggerMousemoveEvent(options);
      event.triggerMousemoveEvent(options);
      assert.equal(document.activeElement, desiredOptions[0]);
    });

  });

  describe('pseudo select keypress handlers', function() {

    it('should show the options', function() {
      event.triggerKeypressEvent(dropdownContainer.querySelector('div'), 66);
      assert.isFalse(options.classList.contains('hide'));
    });

  });

  describe('pseudo select keydown handlers', function() {

    it('should show the options', function() {
      event.triggerKeydownEvent(dropdownContainer.querySelector('div'), 20);
      event.triggerKeydownEvent(dropdownContainer.querySelector('div'), 40);
      assert.isFalse(options.classList.contains('hide'));
    });

  });

});
