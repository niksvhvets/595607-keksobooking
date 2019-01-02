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
      window.utils.removeDomElement('.map__card');
      document.removeEventListener('.click', popupCloseEscButton);

      ad.addEventListener('keydown', function () {
        window.utils.removeDomElement('.map__card');
        document.removeEventListener('keydown', popupCloseEscButton);
      });
    };

    var popupCloseEscButton = function (evt) {
      if (evt.keyCode === window.constants.ESC_BUTTON) {
        window.utils.removeDomElement('.map__card');
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

  var showAd = function (ad) {
    window.domElement.map.insertBefore(createAds(ad), window.domElement.mapFilters);
  };

  window.card = {
    generateAds: generateAds,
    createAdsList: createAdsList,
    showAd: showAd
  };

})();
