'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');
  var formFieldset = document.querySelectorAll('fieldset');
  var inputAddress = document.querySelector('#address');

  window.domElement = {
    map: map,
    mapPins: mapPins,
    mapFilters: mapFilters,
    mapPinMain: mapPinMain,
    formFieldset: formFieldset,
    inputAddress: inputAddress
  };

})();
