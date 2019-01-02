'use strict';

(function () {
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

  window.constants = {
    TITLES_APPARTEMENT: TITLES_APPARTEMENT,
    FEATURES_APPARTEMENT: FEATURES_APPARTEMENT,
    TYPES_APPARTEMENT: TYPES_APPARTEMENT,
    CHECKIN_APPARTEMENT: CHECKIN_APPARTEMENT,
    CHECKOUT_APPARTEMENT: CHECKOUT_APPARTEMENT,
    PHOTOS_APPARTEMENT: PHOTOS_APPARTEMENT,
    MIN_ROOMS: MIN_ROOMS,
    MAX_ROOMS: MAX_ROOMS,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    MIN_GUESTS: MIN_GUESTS,
    MAX_GUESTS: MAX_GUESTS,
    MIN_LOCATION_Y: MIN_LOCATION_Y,
    MAX_LOCATION_Y: MAX_LOCATION_Y,
    MIN_LOCATION_X: MIN_LOCATION_X,
    MAX_LOCATION_X: MAX_LOCATION_X,
    IMAGE_WIDTH: IMAGE_WIDTH,
    IMAGE_HEIGHT: IMAGE_HEIGHT,
    ADS_COUNT: ADS_COUNT,
    generatedArrayAds: generatedArrayAds,
    ENABLED_MAP_STATE: ENABLED_MAP_STATE,
    DISABLED_MAP_STATE: DISABLED_MAP_STATE,
    ESC_BUTTON: ESC_BUTTON,
    pinEndPoint: pinEndPoint,
    MAP_PIN_X_MIN: MAP_PIN_X_MIN,
    MAP_PIN_X_MAX: MAP_PIN_X_MAX,
    MAP_PIN_Y_MIN: MAP_PIN_Y_MIN,
    MAP_PIN_Y_MAX: MAP_PIN_Y_MAX
  };
})();
