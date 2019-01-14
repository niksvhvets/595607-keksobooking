'use strict';

(function () {
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var MIN_LOCATION_X = 0;
  var MAX_LOCATION_X = 1135;
  var IMAGE_WIDTH = 40;
  var IMAGE_HEIGHT = 40;
  var ADS_COUNT = 5;
  var ENABLED_MAP_STATE = false;
  var DISABLED_MAP_STATE = true;
  var ESC_BUTTON = 27;
  var PIN_END_POINT = 19;
  var MAP_PIN_X_MIN = 0;
  var MAP_PIN_X_MAX = 1135;
  var MAP_PIN_Y_MIN = 46; // метка высота 44 padding 8 border 10 + псевдоэлемент 22 = 84 => 130 - 84 = 46
  var MAP_PIN_Y_MAX = 546; // 630 - 84 = 546;
  var BACKEND = {
    STATUS_200: 200,
    TIMEOUT: 10000
  };
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking/';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';

  window.constants = {
    MIN_LOCATION_Y: MIN_LOCATION_Y,
    MAX_LOCATION_Y: MAX_LOCATION_Y,
    MIN_LOCATION_X: MIN_LOCATION_X,
    MAX_LOCATION_X: MAX_LOCATION_X,
    IMAGE_WIDTH: IMAGE_WIDTH,
    IMAGE_HEIGHT: IMAGE_HEIGHT,
    ADS_COUNT: ADS_COUNT,
    ENABLED_MAP_STATE: ENABLED_MAP_STATE,
    DISABLED_MAP_STATE: DISABLED_MAP_STATE,
    ESC_BUTTON: ESC_BUTTON,
    PIN_END_POINT: PIN_END_POINT,
    MAP_PIN_X_MIN: MAP_PIN_X_MIN,
    MAP_PIN_X_MAX: MAP_PIN_X_MAX,
    MAP_PIN_Y_MIN: MAP_PIN_Y_MIN,
    MAP_PIN_Y_MAX: MAP_PIN_Y_MAX,
    BACKEND: BACKEND,
    UPLOAD_URL: UPLOAD_URL,
    LOAD_URL: LOAD_URL
  };
})();
