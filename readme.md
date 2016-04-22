accessible-dropdown
---

[![build status](https://travis-ci.org/sarbbottam/accessible-dropdown.svg?branch=master)](https://travis-ci.org/sarbbottam/accessible-dropdown/)
[![coverage status](https://coveralls.io/repos/sarbbottam/accessible-dropdown/badge.svg?branch=master)](https://coveralls.io/r/sarbbottam/accessible-dropdown?branch=master)
[![sauce test status](https://saucelabs.com/buildstatus/sarbbottam)](https://saucelabs.com/u/sarbbottam)

[![sauce browser matrix](https://saucelabs.com/browser-matrix/sarbbottam.svg)](https://saucelabs.com/u/sarbbottam)

## Why?

Till date, there is no way to style native `<select>/<option>`.
I have tweeted to all the major browser vendors way back in 2013.
[![tweet to major browser vendors to allow styling select/option](http://i.imgur.com/Swn4hIv.png)](https://twitter.com/sarbbottam/status/357940658482331650)

For example, there is no way to display a **flag** against the **country name** option. Something like the image below.
![Country drop down with flags associated to the corresponding country option](http://i.imgur.com/iopqi1Z.png)

## Why this library?

It's not difficult to create something with above image with HTML, CSS, and JavaScript.

__So, whats the big deal with this library?__

It takes care of the following just like native select/option, out of the box for you
* up/and down key press
* `page up`, `page down`, `home` and `end` key press
* respects `space` and `enter` keypress along with `click`
* typing option, for example, you can type
  * 'India' (case-insensitive) to select 'India'
  * 'Den' (case-insensitive) to select 'Denmark'
  * 'Xyz' (case-insensitive) to select the first option that starts with 'Xyz' (case-insensitive)
* complete mouse interaction
* resolves race condition between mouse and key board interaction
  * mouse over an option, followed by key press
  * scroll the option list, followed by key press
* Manually tested with VoiceOver/Mac, JAWS/Windows, NVDA/Windows
* 100% code coverage against Chrome, Firefox and IE

## Demo

Check out http://sarbbottam.github.io/accessible-dropdown/

## Usage

```sh
npm i accessible-dropdown -S
```

```js
var Dropdown = require('accessible-dropdown');

// refer the following files for sample templates
// https://github.com/sarbbottam/accessible-dropdown/blob/master/src/template.js
// https://github.com/sarbbottam/accessible-dropdown/blob/master/example/template-with-flag.js
// https://github.com/sarbbottam/accessible-dropdown/blob/master/example/template-with-flag-composite.js
var Template = require('./path/to/template');

var dropdown;
var selectNode = document.getElementById('select');
var optionNodeList = Array.prototype.slice.call(selectNode.options);
var optionList = [];

optionNodeList.forEach(function(optionNode) {
  optionList.push(optionNode.innerHTML.toLowerCase().trim());
});

countryDropdown = new Dropdown({
  selectNode: selectNode,
  optionList: optionList,
  css : {
    hide : 'hide',
    pseudoSelect: 'pseudo-select drop-down',
    pseudoSelectFocus: 'pseudo-select-focus',
    options: 'options'
  }
});

countryDropdown.init();

selectNode.addEventListener('change', function(e) {
  /*
   * do what ever you want to do ...
   */
});
```

Refer [example folder](https://github.com/sarbbottam/accessible-dropdown/tree/master/example) for [working example](http://sarbbottam.github.io/accessible-dropdown/).

### Note

This works in mobile too, but don't use it if you care about your users, native option/picker is much more usable.

## License

MIT © [Sarbbottam Bandyopadhyay](https://twitter.com/sarbbottam)
