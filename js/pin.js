'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPins = function (element) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (element.location.x) + 'px';
    pinElement.style.top = (element.location.y) + 'px';
    pinElement.querySelector('img').src = element.author.avatar;
    pinElement.querySelector('img').width = window.constants.IMAGE_WIDTH;
    pinElement.querySelector('img').height = window.constants.IMAGE_HEIGHT;
    pinElement.querySelector('img').draggable = false;
    pinElement.querySelector('img').alt = element.offer.title;

    var pinElementClickHandler = function () {
      if (window.itemSearch.map.querySelector('.map__card') !== null) {
        window.utils.removeDomElement('.map__card');
      }
      window.card.showAd(element);
    };

    pinElement.addEventListener('click', pinElementClickHandler);

    return pinElement;
  };

  var arrayAds = [];

  var renderPins = function () {
    window.backend.load(function (response) {
      var pins = document.createDocumentFragment();

      response.forEach(function (el) {
        arrayAds.push(el);
      });
      for (var j = 0; j < window.constants.ADS_COUNT; j++) {
        pins.appendChild(window.pin.createPins(response[j]));
      }
      window.itemSearch.mapPins.appendChild(pins);
    });
    return arrayAds;
  };

  var getCoordinatesAddress = function (centerOfPin) {
    if (centerOfPin) {
      return Math.floor(window.itemSearch.mapPinMain.offsetLeft + window.itemSearch.mapPinMain.offsetWidth / 2) + ', ' + Math.floor(window.itemSearch.mapPinMain.offsetTop + window.itemSearch.mapPinMain.offsetHeight / 2);
    } else {
      return Math.floor(window.itemSearch.mapPinMain.offsetLeft + window.itemSearch.mapPinMain.offsetWidth / 2) + ', ' + Math.floor(window.itemSearch.mapPinMain.offsetTop + window.itemSearch.mapPinMain.offsetHeight + window.constants.PIN_END_POINT);
    }
  };

  window.pin = {
    createPins: createPins,
    renderPins: renderPins,
    getCoordinatesAddress: getCoordinatesAddress,
    arrayAds: arrayAds
  };

})();
