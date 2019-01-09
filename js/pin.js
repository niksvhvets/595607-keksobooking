'use strict';

(function () {

  var makeElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  var createPins = function (element) {
    var item = makeElement('buttom', 'map__pin');
    item.style.left = (element.location.x) + 'px';
    item.style.top = (element.location.y) + 'px';

    var image = makeElement('img');
    image.src = element.author.avatar;
    image.width = window.constants.IMAGE_WIDTH;
    image.height = window.constants.IMAGE_HEIGHT;
    image.draggable = false;
    image.alt = element.offer.title;
    item.appendChild(image);

    var pinElementClickHandler = function () {
      if (window.itemSearch.map.querySelector('.map__card') !== null) {
        window.utils.removeDomElement('.map__card');
      }
      window.card.showAd(element);
    };

    item.addEventListener('click', pinElementClickHandler);
    return item;
  };

  var renderPins = function () {
    window.backend.load(function (response) {
      var pins = document.createDocumentFragment();

      for (var i = 0; i < window.constants.ADS_COUNT; i++) {
        pins.appendChild(window.pin.createPins(response[i]));
      }
      window.itemSearch.mapPins.appendChild(pins);
    });
  };

  var getCoordinatesAddress = function (centerOfPin) {
    if (centerOfPin) {
      return Math.floor(window.itemSearch.mapPinMain.offsetLeft + window.itemSearch.mapPinMain.offsetWidth / 2) + ', ' + Math.floor(window.itemSearch.mapPinMain.offsetTop + window.itemSearch.mapPinMain.offsetHeight / 2);
    } else {
      return Math.floor(window.itemSearch.mapPinMain.offsetLeft + window.itemSearch.mapPinMain.offsetWidth / 2) + ', ' + Math.floor(window.itemSearch.mapPinMain.offsetTop + window.itemSearch.mapPinMain.offsetHeight + window.constants.pinEndPoint);
    }
  };

  window.pin = {
    createPins: createPins,
    renderPins: renderPins,
    getCoordinatesAddress: getCoordinatesAddress
  };

})();
