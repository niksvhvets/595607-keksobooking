'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPin = document.querySelectorAll('.map__pin');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');
  var formFieldset = document.querySelectorAll('fieldset');
  var inputAddress = document.querySelector('#address');
  var titleAd = document.querySelector('#title');
  var main = document.querySelector('main');
  var resetButtom = document.querySelector('.ad-form__reset');

  window.itemSearch = {
    map: map,
    mapPins: mapPins,
    mapPin: mapPin,
    mapFilters: mapFilters,
    mapPinMain: mapPinMain,
    formFieldset: formFieldset,
    inputAddress: inputAddress,
    titleAd: titleAd,
    main: main,
    resetButtom: resetButtom
  };

})();
