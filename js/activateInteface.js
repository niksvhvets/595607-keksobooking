'use strict';

(function () {

  var activateInterface = function () {
    window.utils.classRemove(window.itemSearch.map, 'map--faded');
    window.utils.classRemove(window.validation.adForm, 'ad-form--disabled');
    window.utils.setAvailabilityForm(window.filter.mapFilters, window.constants.ENABLED_MAP_STATE);
    window.utils.setAvailabilityForm(window.itemSearch.formFieldset, window.constants.ENABLED_MAP_STATE);

    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (mapPins.length === 0) {
      window.pin.renderPins();
    }
  };

  window.itemSearch.inputAddress.value = window.pin.getCoordinatesAddress(true);
  window.itemSearch.mapPinMain.addEventListener('mousedown', function (evt) {
    activateInterface();
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainY = window.itemSearch.mapPinMain.offsetTop - shift.y;
      var mapPinMainX = window.itemSearch.mapPinMain.offsetLeft - shift.x;

      if (mapPinMainY >= window.constants.MAP_PIN_Y_MIN && mapPinMainY <= window.constants.MAP_PIN_Y_MAX) {
        window.itemSearch.mapPinMain.style.top = mapPinMainY + 'px';
      }
      if (mapPinMainX >= window.constants.MAP_PIN_X_MIN && mapPinMainX <= window.constants.MAP_PIN_X_MAX) {
        window.itemSearch.mapPinMain.style.left = mapPinMainX + 'px';
      }
    };

    var mainPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      window.itemSearch.inputAddress.value = window.pin.getCoordinatesAddress(false);
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };
    window.itemSearch.inputAddress.value = window.pin.getCoordinatesAddress(false);
    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  });

})();
