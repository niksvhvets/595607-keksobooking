'use strict';

(function () {

  var DEBOUNCE = 500;

  var classRemove = function (domElement, domElementClassRemove) {
    domElement.classList.remove(domElementClassRemove);
    return domElement;
  };

  var setAvailabilityForm = function (thatChange, state) {
    for (var i = 0; i < thatChange.length; i++) {
      thatChange[i].disabled = state;
    }
  };

  var removeDomElement = function (element) {
    window.itemSearch.map.querySelector(element).remove();
  };

  var removePins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (el) {
      window.itemSearch.mapPins.removeChild(el);
    });
  };

  var debounce = function (cb) {
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE);
    };
  };

  var closeOpenedPopup = function () {
    var oldCard = window.itemSearch.map.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }
  };

  window.utils = {
    classRemove: classRemove,
    setAvailabilityForm: setAvailabilityForm,
    removeDomElement: removeDomElement,
    removePins: removePins,
    debounce: debounce,
    closeOpenedPopup: closeOpenedPopup
  };

})();
