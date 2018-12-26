'use strict';

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
var MIN_LOCATION_X = 10;
var MAX_LOCATION_X = 1190;
var IMAGE_WIDTH = 40;
var IMAGE_HEIGHT = 40;
var ADS_COUNT = 8;
var generatedArrayAds = [];
var ENABLED_MAP_STATE = false;
var DISABLED_MAP_STATE = true;
var ESC_BUTTON = 27;

var TITLE_ALERT_MIN_LENGHT = 'Заголовок объявления должен состоять минимум из 30-х символов';
var TITLE_ALERT_MAX_LENGHT = 'Заголовок объявления не должно превышать 100 символов';

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
  var locationX = generateRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
  var locationY = generateRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y);

  var object = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },

    offer: {
      title: getRandomElement(TITLES_APPARTEMENT),
      address: locationX + ', ' + locationY,
      price: generateRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPES_APPARTEMENT),
      rooms: generateRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: generateRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKIN_APPARTEMENT),
      checkout: getRandomElement(CHECKOUT_APPARTEMENT),
      features: getRandomLengthArray(FEATURES_APPARTEMENT),
      description: '',
      photos: shuffleArray(PHOTOS_APPARTEMENT)
    },

    location: {
      x: locationX,
      y: locationY
    }
  };
  return object;
};

var createAdsList = function () {
  for (var i = 0; i < ADS_COUNT; i++) {
    generatedArrayAds.push(generateAds(i));
  }
  return generatedArrayAds;
};

createAdsList();

var map = document.querySelector('.map');

var classRemove = function (domElement, domElementClassRemove) {
  domElement.classList.remove(domElementClassRemove);
  return domElement;
};

var mapPins = document.querySelector('.map__pins');

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
  image.width = IMAGE_WIDTH;
  image.height = IMAGE_HEIGHT;
  image.draggable = false;
  image.alt = element.offer.title;
  item.appendChild(image);

  var pinElementClickHandler = function () {
    if (map.querySelector('.map__card') !== null) {
      removeDomElement('.map__card');
    }
    showAd(element);
  };

  item.addEventListener('click', pinElementClickHandler);
  return item;
};

var renderPins = function () {
  var pins = document.createDocumentFragment();

  for (var i = 0; i < ADS_COUNT; i++) {
    pins.appendChild(createPins(generatedArrayAds[i]));
  }
  return pins;
};

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
    photoItem.width = IMAGE_WIDTH;
    photoItem.height = IMAGE_HEIGHT;
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
    if (evt.keyCode === ESC_BUTTON) {
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
};

var mapFilters = document.querySelector('.map__filters-container');

var showAd = function (ad) {
  map.insertBefore(createAds(ad), mapFilters);
};

var removeDomElement = function (element) {
  map.querySelector(element).remove();
};

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formFieldset = document.querySelectorAll('fieldset');
var inputAddress = document.querySelector('#address');

var setAvailabilityForm = function (state) {
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = state;
  }
};

var getCoordinatesAddress = function () {
  return Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
};

var mapPinMouseUpHandler = function () {
  classRemove(map, 'map--faded');
  classRemove(adForm, 'ad-form--disabled');
  setAvailabilityForm(ENABLED_MAP_STATE);
  inputAddress.value = getCoordinatesAddress();
  if (map.querySelectorAll('.map__pin').length < 9) {
    mapPins.appendChild(renderPins());
  }
};

setAvailabilityForm(DISABLED_MAP_STATE);
mapPinMain.addEventListener('mouseup', mapPinMouseUpHandler);

var adTitle = adForm.querySelector('[name=title]');
var adPrice = adForm.querySelector('[name=price]');

var guestNumber = adForm.querySelector('#capacity');
var roomNumber = adForm.querySelector('#room_number');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var typeOfHousing = adForm.querySelector('#type');

var priceAd = {
  'bungalo': {
    min: 0,
    placeholder: 0
  },
  'flat': {
    min: 1000,
    placeholder: 1000
  },
  'house': {
    min: 5000,
    placeholder: 5000
  },
  'palace': {
    min: 10000,
    placeholder: 10000
  }
};

var priceAlertMaxValue = 'Максимальная цена за ночь должна быть максимум ' + MAX_PRICE + ' руб.';

var checkInputValidity = function (checkValue, tooShortAlert, tooLongAlert) {
  checkValue.addEventListener('invalid', function () {
    if (checkValue.validity.tooShort) {
      checkValue.setCustomValidity(tooShortAlert);
    } else if (checkValue.validity.tooLong) {
      checkValue.setCustomValidity(tooLongAlert);
    } else if (checkValue.validity.valueMissing) {
      checkValue.setCustomValidity('Обязательное поле');
    } else {
      checkValue.setCustomValidity('');
    }
  });
};

var setOptionState = function (option) {
  for (var i = 0; i < option.length; i++) {
    option[i].disabled = true;
  }
};

var selectedDisabledInput = function (inputValue, active, firstInput, secondInput) {
  inputValue[active].selected = true;
  inputValue[active].disabled = false;
  inputValue[firstInput].disabled = false;
  inputValue[secondInput].disabled = false;
};

var changeState = function (firstInputValue, secondInputValue) {
  firstInputValue.addEventListener('change', function () {
    switch (firstInputValue.value) {
      case '1': setOptionState(secondInputValue);
        selectedDisabledInput(guestNumber, 2, 2, 2);
        return;
      case '2': setOptionState(secondInputValue);
        selectedDisabledInput(guestNumber, 1, 2, 1);
        break;
      case '3': setOptionState(secondInputValue);
        selectedDisabledInput(guestNumber, 0, 1, 2);
        break;
      case '100': setOptionState(secondInputValue);
        selectedDisabledInput(guestNumber, 3, 3, 3);
        break;
      case '12:00': setOptionState(timeOut);
        selectedDisabledInput(guestNumber, 0);
        break;
      case '13:00': setOptionState(timeOut);
        selectedDisabledInput(guestNumber, 1);
        break;
      case '14:00': setOptionState(timeOut);
        selectedDisabledInput(guestNumber, 2);
        break;
      case 'bungalo': adPrice.placeholder = priceAd.bungalo.placeholder;
        adPrice.min = priceAd.bungalo.min;
        break;
      case 'flat': adPrice.placeholder = priceAd.flat.placeholder;
        adPrice.min = priceAd.flat.min;
        break;
      case 'house': adPrice.placeholder = priceAd.house.placeholder;
        adPrice.min = priceAd.house.min;
        break;
      case 'palace': adPrice.placeholder = priceAd.palace.placeholder;
        adPrice.min = priceAd.palace.min;
        break;
    }
    var priceAlertMinValue = 'Минимальная цена за ночь должна быть минимум ' + adPrice.min + ' руб.';

    var checkInputCostValidity = function (checkValue, tooShortAlert, tooLongAlert) {
      checkValue.addEventListener('invalid', function () {
        if (checkValue.validity.rangeUnderflow) {
          checkValue.setCustomValidity(tooShortAlert);
        } else if (checkValue.validity.rangeOverflow) {
          checkValue.setCustomValidity(tooLongAlert);
        } else if (checkValue.validity.valueMissing) {
          checkValue.setCustomValidity('Обязательное поле');
        } else {
          checkValue.setCustomValidity('');
        }
      });
      return checkInputCostValidity;
    };
    checkInputCostValidity(adPrice, priceAlertMinValue, priceAlertMaxValue);
  });
};


/*
var checkInputCostValidity = function (checkValue, tooShortAlert, tooLongAlert) {
  checkValue.addEventListener('invalid', function () {
    if (checkValue.validity.rangeUnderflow) {
      checkValue.setCustomValidity(tooShortAlert);
    } else if (checkValue.validity.rangeOverflow) {
      checkValue.setCustomValidity(tooLongAlert);
    } else if (checkValue.validity.valueMissing) {
      checkValue.setCustomValidity('Обязательное поле');
    } else {
      checkValue.setCustomValidity('');
    }
  });
};*/

changeState(roomNumber, guestNumber);
changeState(timeIn, timeOut);
changeState(typeOfHousing);

checkInputValidity(adTitle, TITLE_ALERT_MIN_LENGHT, TITLE_ALERT_MAX_LENGHT);
/*
checkInputCostValidity(adPrice, priceAlertMinValue, priceAlertMaxValue);*/
