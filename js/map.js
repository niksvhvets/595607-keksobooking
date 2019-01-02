'use strict';
/*
var TITLES_APPARTEMENT = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var FEATURES_APPARTEMENT = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var TYPES_APPARTEMENT = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало'
];

var CHECKIN_APPARTEMENT = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT_APPARTEMENT = [
  '12:00',
  '13:00',
  '14:00'
];


var PHOTOS_APPARTEMENT = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var MIN_LOCATION_X = 0;
var MAX_LOCATION_X = 1135;
var IMAGE_WIDTH = 40;
var IMAGE_HEIGHT = 40;
var ADS_COUNT = 8;
var generatedArrayAds = [];
var ENABLED_MAP_STATE = false;
var DISABLED_MAP_STATE = true;
var ESC_BUTTON = 27;
var pinEndPoint = 19;
var MAP_PIN_X_MIN = 0;
var MAP_PIN_X_MAX = 1135;
var MAP_PIN_Y_MIN = 46; // метка высота 44 padding 8 border 10 + псевдоэлемент 22 = 84 => 130 - 84 = 46
var MAP_PIN_Y_MAX = 546; // 630 - 84 = 546;

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var getRandomLengthArray = function (array) {
  return array.slice(0, generateRandomNumber(1, array.length));
};

var generateAds = function (index) {
  var locationX = window.utils.generateRandomNumber(window.constants.MIN_LOCATION_X, window.constants.MAX_LOCATION_X);
  var locationY = window.utils.generateRandomNumber(window.constants.MIN_LOCATION_Y, window.constants.MAX_LOCATION_Y);

  var object = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },

    offer: {
      title: window.utils.getRandomElement(window.constants.TITLES_APPARTEMENT),
      address: locationX + ', ' + locationY,
      price: window.utils.generateRandomNumber(window.constants.MIN_PRICE, window.constants.MAX_PRICE),
      type: window.utils.getRandomElement(window.constants.TYPES_APPARTEMENT),
      rooms: window.utils.generateRandomNumber(window.constants.MIN_ROOMS, window.constants.MAX_ROOMS),
      guests: window.utils.generateRandomNumber(window.constants.MIN_GUESTS, window.constants.MAX_GUESTS),
      checkin: window.utils.getRandomElement(window.constants.CHECKIN_APPARTEMENT),
      checkout: window.utils.getRandomElement(window.constants.CHECKOUT_APPARTEMENT),
      features: window.utils.getRandomLengthArray(window.constants.FEATURES_APPARTEMENT),
      description: '',
      photos: window.utils.shuffleArray(window.constants.PHOTOS_APPARTEMENT)
    },

    location: {
      x: locationX,
      y: locationY
    }
  };
  return object;
};

var createAdsList = function () {
  for (var i = 0; i < window.constants.ADS_COUNT; i++) {
    window.constants.generatedArrayAds.push(generateAds(i));
  }
  return window.constants.generatedArrayAds;
};

createAdsList();*/

/* dom-element.js
var map = document.querySelector('.map');*/

/* utils.js
var classRemove = function (domElement, domElementClassRemove) {
  domElement.classList.remove(domElementClassRemove);
  return domElement;
};*/

/* dom-element.js
var mapPins = document.querySelector('.map__pins');*/

/* pin.js
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
    if (window.domElement.map.querySelector('.map__card') !== null) {
      window.utils.removeDomElement('.map__card');
    }
    window.card.showAd(element);
  };

  item.addEventListener('click', pinElementClickHandler);
  return item;
};

var renderPins = function () {
  var pins = document.createDocumentFragment();

  for (var i = 0; i < window.constants.ADS_COUNT; i++) {
    pins.appendChild(createPins(window.constants.generatedArrayAds[i]));
  }
  return pins;
};*/

/* card.js
var createFeatures = function (array) {
  var feature = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var featuresItem = document.createElement('li');
    featuresItem.className = 'popup__feature popup__feature--' + array[i];
    feature.appendChild(featuresItem);
  }
  return feature;
};

var createPhotos = function (array) {
  var photo = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = array[i];
    photoItem.width = window.constants.IMAGE_WIDTH;
    photoItem.height = window.constants.IMAGE_HEIGHT;
    photoItem.alt = 'Фотография жилья';

    photo.appendChild(photoItem);
  }

  return photo;
};

var adCard = document.querySelector('#card').content.querySelector('.map__card');

var createAds = function (element) {
  var ad = adCard.cloneNode(true);

  var popupCloseClickHandler = function () {
    removeDomElement('.map__card');
    document.removeEventListener('.click', popupCloseEscButton);

    ad.addEventListener('keydown', function () {
      removeDomElement('.map__card');
      document.removeEventListener('keydown', popupCloseEscButton);
    });
  };

  var popupCloseEscButton = function (evt) {
    if (evt.keyCode === window.constants.ESC_BUTTON) {
      removeDomElement('.map__card');
      document.removeEventListener('keydown', popupCloseEscButton);
    }
  };

  ad.querySelector('img').src = element.author.avatar;
  ad.querySelector('.popup__title').textContent = element.author.title;
  ad.querySelector('.popup__text--address').textContent = element.author.address;
  ad.querySelector('.popup__text--price').textContent = element.offer.price + '₽/нoчь';
  ad.querySelector('.popup__type').textContent = element.offer.type;
  ad.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  ad.querySelector('.popup__text--time').textContent = 'заезд после ' + element.offer.checkin + ' выезд до ' + element.offer.checkout;
  ad.querySelector('.popup__features').innerHTML = '';
  ad.querySelector('.popup__features').appendChild(createFeatures(element.offer.features));
  ad.querySelector('.popup__description').textContent = element.offer.description;
  ad.querySelector('.popup__photos').innerHTML = '';
  ad.querySelector('.popup__photos').appendChild(createPhotos(element.offer.photos));

  ad.querySelector('.popup__close').addEventListener('click', popupCloseClickHandler);
  document.addEventListener('keydown', popupCloseEscButton);

  return ad;
};*/

/* dom-element.js
var mapFilters = document.querySelector('.map__filters-container');*/

/* card.js
var showAd = function (ad) {
  window.domElement.map.insertBefore(createAds(ad), window.domElement.mapFilters);
};*/

/* utils.js
var removeDomElement = function (element) {
  map.querySelector(element).remove();
};*/

/* dom-element.js
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formFieldset = document.querySelectorAll('fieldset');
var inputAddress = document.querySelector('#address');*/

/* utils.js
var setAvailabilityForm = function (thatChange, state) {
  for (var i = 0; i < thatChange.length; i++) {
    thatChange[i].disabled = state;
  }
};*/

/* pin.js
var getCoordinatesAddress = function (centerOfPin) {
  if (centerOfPin) {
    return Math.floor(window.domElement.mapPinMain.offsetLeft + window.domElement.mapPinMain.offsetWidth / 2) + ', ' + Math.floor(window.domElement.mapPinMain.offsetTop + window.domElement.mapPinMain.offsetHeight / 2);
  } else {
    return Math.floor(window.domElement.mapPinMain.offsetLeft + window.domElement.mapPinMain.offsetWidth / 2) + ', ' + Math.floor(window.domElement.mapPinMain.offsetTop + window.domElement.mapPinMain.offsetHeight + window.constants.pinEndPoint);
  }
};*/
/* activateInterface.js
var activateKeksobookingInterface = function () {
  window.utils.classRemove(window.domElement.map, 'map--faded');
  window.utils.classRemove(window.domElement.adForm, 'ad-form--disabled');
  window.utils.setAvailabilityForm(window.domElement.formFieldset, window.constants.ENABLED_MAP_STATE);
  window.domElement.inputAddress.value = window.pin.getCoordinatesAddress(true);
  if (window.domElement.map.querySelectorAll('.map__pin').length < 9) {
    window.domElement.mapPins.appendChild(window.pin.renderPins());
  }
};

window.utils.setAvailabilityForm(window.domElement.formFieldset, window.constants.DISABLED_MAP_STATE);*/

/* dom-element.js
var adPrice = adForm.querySelector('[name=price]');
var guestNumber = adForm.querySelector('#capacity');
var roomNumber = adForm.querySelector('#room_number');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var typeOfHousing = adForm.querySelector('#type');
var submitButton = adForm.querySelector('.ad-form__submit');*/

/* validation.js
var checkTimeSyncHandler = function (evt) {

  var time = evt.target.value;

  if (window.domElement.timeIn.value === time) {
    window.domElement.timeOut.value = time;
  } else if (window.domElement.timeOut.value === time) {
    window.domElement.timeIn.value = time;
  }
};

window.domElement.timeIn.addEventListener('change', checkTimeSyncHandler);
window.domElement.timeOut.addEventListener('change', checkTimeSyncHandler);

var priceAd = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

window.domElement.typeOfHousing.addEventListener('change', function () {
  var type = window.domElement.typeOfHousing.value;

  window.domElement.adPrice.placeholder = priceAd[type];
  window.domElement.adPrice.min = priceAd[type];
});

window.domElement.roomNumber.addEventListener('change', function () {

  var room = window.domElement.roomNumber.value;

  window.utils.setAvailabilityForm(window.domElement.guestNumber, true);

  if (room !== '100') {
    for (var i = 0; i < window.domElement.guestNumber.length; i++) {
      if (window.domElement.guestNumber[i].value <= room) {
        window.domElement.guestNumber[i].disabled = false;
        window.domElement.guestNumber[window.domElement.window.domElement.guestNumber.length - 1].disabled = true;
      }
    }
  } else {
    window.domElement.guestNumber[window.domElement.guestNumber.length - 1].disabled = false;
    window.domElement.guestNumber[window.domElement.guestNumber.length - 1].selected = true;
  }
});

window.domElement.submitButton.addEventListener('click', function () {
  if (window.domElement.guestNumber[window.domElement.guestNumber.selectedIndex].disabled) {
    window.domElement.guestNumber.setCustomValidity('Кол-во мест выбрано не верно');
  } else {
    window.domElement.guestNumber.setCustomValidity('');
  }
});*/

/* activateInterface.js
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
});*/
