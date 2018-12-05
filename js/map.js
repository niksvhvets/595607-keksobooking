'use strict';

var TITLES_APPARTEMENT = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];

var FEATURES_APPARTEMENT = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
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
var MAX_LOCATION_X = 1190
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var adsCount = 8;
var generatedArrayAds = [];

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var getRandomElement = function (array) {
  var render = Math.floor(Math.random() * array.length);
  return array[render];
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

var getRandomLengthArray = function (array) {
  return array.slice(0, generateRandomNumber(1, array.length));
}

var generateAds = function (index) {
  var locationX = generateRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
  var locationY = generateRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y)

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
  }
  return object;
}

var createAdsList = function () {
  for (var i = 0; i < adsCount; i++) {
    generatedArrayAds.push(generateAds(i));
  }
  return generatedArrayAds;
};

createAdsList();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins= document.querySelector('.map__pins');

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
  image.width = 40;
  image.height = 40;
  image.draggable = false;
  image.alt = element.author.title;
  item.appendChild(image);

  return item;
}

var renderPins = function () {
  var pins = document.createDocumentFragment();

  for (var i = 0; i < adsCount; i++) {
    pins.appendChild(createPins(generatedArrayAds[i]));
  }
  return pins;
}

mapPins.appendChild(renderPins());

var createFeatures = function (array) {
  var feature = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var featuresItem = document.createElement('li');
    featuresItem.className = 'popup__feature popup__feature--' + array[i];
    feature.appendChild(featuresItem);
  }
  return feature;
}

var createPhotos = function (array) {
  var photo = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var photoItem = document.createElement('img');
    photoItem.className = 'popup_photo';
    photoItem.src = array[i];
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt = 'Фотография жилья';

    photo.appendChild(photoItem);
  }

  return photo;
}

var map = document.querySelector('.map');
var adCard = document.querySelector('#card').content.querySelector('.map__card');

var createAds = function (element) {
  var ad = adCard.cloneNode(true);

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

  return ad;
}

var renderAds = function () {
  var ads = document.createDocumentFragment();

  for (var i = 0; i < adsCount; i++) {
    ads.appendChild(createAds(generatedArrayAds[i]));
  }
  return ads;
}

map.insertBefore(createAds(generatedArrayAds[generateRandomNumber(0, generatedArrayAds.length - 1)]), map.querySelector('.map__filters-container'));