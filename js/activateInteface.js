'use strict';

(function () {
  var activateKeksobookingInterface = function () {
    window.utils.classRemove(window.domElement.map, 'map--faded');
    window.utils.classRemove(window.validation.adForm, 'ad-form--disabled');
    window.utils.setAvailabilityForm(window.domElement.formFieldset, window.constants.ENABLED_MAP_STATE);
    window.domElement.inputAddress.value = window.pin.getCoordinatesAddress(true);
    if (window.domElement.map.querySelectorAll('.map__pin').length < 9) {
      window.domElement.mapPins.appendChild(window.pin.renderPins());
    }
  };

  window.utils.setAvailabilityForm(window.domElement.formFieldset, window.constants.DISABLED_MAP_STATE);
  window.domElement.mapPinMain.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMoveHandler = function (moveEvt) {
      activateKeksobookingInterface();
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainY = window.domElement.mapPinMain.offsetTop - shift.y;
      var mapPinMainX = window.domElement.mapPinMain.offsetLeft - shift.x;

      if (mapPinMainY >= window.constants.MAP_PIN_Y_MIN && mapPinMainY <= window.constants.MAP_PIN_Y_MAX) {
        window.domElement.mapPinMain.style.top = mapPinMainY + 'px';
      }
      if (mapPinMainX >= window.constants.MAP_PIN_X_MIN && mapPinMainX <= window.constants.MAP_PIN_X_MAX) {
        window.domElement.mapPinMain.style.left = mapPinMainX + 'px';
      }
    };

    var mainPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.domElement.inputAddress.value = window.pin.getCoordinatesAddress(false);
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };
    window.domElement.inputAddress.value = window.pin.getCoordinatesAddress(false);
    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  });
})();
