'use strict';

(function () {

  var DEBOUNCE = 500;

  var resetPage = function () {
    window.utils.addClass(window.itemSearch.map, 'map--faded');
    window.utils.addClass(window.validation.adForm, 'ad-form--disabled');
    window.utils.setAvailabilityForm(window.filter.mapFilters, window.constants.DISABLED_MAP_STATE);
    window.utils.setAvailabilityForm(window.itemSearch.formFieldset, window.constants.DISABLED_MAP_STATE);
    window.utils.removeDomElement('.map__card');
    window.validation.adForm.reset();
    removePins();
    resetPinMainCoordinate();
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
    [].forEach.call(thatChange, function (el) {
      el.disabled = state;
    });
  };

  var removeDomElement = function (element) {
    var foundElement = document.querySelector(element);

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

  window.utils = {
    classRemove: classRemove,
    addClass: addClass,
    setAvailabilityForm: setAvailabilityForm,
    removeDomElement: removeDomElement,
    removePins: removePins,
    debounce: debounce,
    resetPage: resetPage,
    resetPinMainCoordinate: resetPinMainCoordinate
  };

})();
