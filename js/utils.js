'use strict';

(function () {

  var DEBOUNCE = 500;

  var resetPage = function () {
    window.utils.addClass(window.itemSearch.map, 'map--faded');
    window.utils.addClass(window.validation.adForm, 'ad-form--disabled');
    window.utils.setAvailabilityForm(window.filter.mapFilters, window.constants.DISABLED_MAP_STATE);
    window.utils.setAvailabilityForm(window.itemSearch.formFieldset, window.constants.DISABLED_MAP_STATE);
    removePins();
    resetPinMainCoordinate();
    closeOpenedPopup();
  };

  var resetPinMainCoordinate = function () {
    window.itemSearch.mapPinMain.style.left = window.constants.MAIN_PIN_COORDINATE_X + 'px';
    window.itemSearch.mapPinMain.style.top = window.constants.MAIN_PIN_COORDINATE_Y + 'px';
    window.itemSearch.inputAddress.value = window.pin.getCoordinatesAddress(true);
  };

  var classRemove = function (domElement, domElementClassRemove) {
    domElement.classList.remove(domElementClassRemove);
    return domElement;
  };

  var addClass = function (domElement, domElementClassRemove) {
    domElement.classList.add(domElementClassRemove);
    return domElement;
  };

  var setAvailabilityForm = function (thatChange, state) {
    for (var i = 0; i < thatChange.length; i++) {
      thatChange[i].disabled = state;
    }
  };

  var removeDomElement = function (element) {
    var foundElement = window.itemSearch.map.querySelector(element);

    if (foundElement) {
      foundElement.remove();
    }
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
    addClass: addClass,
    setAvailabilityForm: setAvailabilityForm,
    removeDomElement: removeDomElement,
    removePins: removePins,
    debounce: debounce,
    closeOpenedPopup: closeOpenedPopup,
    resetPage: resetPage,
    resetPinMainCoordinate: resetPinMainCoordinate
  };

})();
