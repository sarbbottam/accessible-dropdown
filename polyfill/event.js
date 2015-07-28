'use strict';

function triggerKeydownEvent(element, keyCode) {
  var event = document.createEvent('Events');

  if (event.initEvent) {
    event.initEvent('keydown', true, true);
  }

  event.keyCode = keyCode;
  event.which = keyCode;

  element.dispatchEvent(event);
}

function triggerClickEvent(element) {
  var event = document.createEvent('MouseEvent');

  event.initMouseEvent(
      'click',
      true, /* bubble */
      true, /* cancelable */
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0,/*left*/
      null
  );

  element.dispatchEvent(event);
}

module.exports = {
  triggerKeydownEvent: triggerKeydownEvent,
  triggerClickEvent: triggerClickEvent
};
