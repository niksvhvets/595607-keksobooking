'use strict';

(function () {

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

  createAdsList();

  window.generateAds = {
    generateAds: generateAds,
    createAdsList: createAdsList
  };

})();
