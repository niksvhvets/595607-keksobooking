'use strict';

(function () {

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
    if (!element.author.avatar) {
      ad.querySelector('img').style.display = 'none';
    }

    ad.querySelector('.popup__title').textContent = element.offer.title;
    if (!element.offer.title) {
      ad.querySelector('.popup__title').style.display = 'none';
    }

    ad.querySelector('.popup__text--address').textContent = element.offer.address;
    if (!element.offer.address) {
      ad.querySelector('.popup__text--address').style.display = 'none';
    }

    ad.querySelector('.popup__text--price').textContent = element.offer.price + '₽/нoчь';
    if (!element.offer.price) {
      ad.querySelector('.popup__text--price').style.display = 'none';
    }

    ad.querySelector('.popup__type').textContent = element.offer.type;
    switch (element.offer.type) {
      case 'palace':
        ad.querySelector('.popup__type').textContent = 'Дворец';
        break;
      case 'flat':
        ad.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'house':
        ad.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'bungalo':
        ad.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case false:
        ad.querySelector('.popup__type').style.display = 'none';
        break;
    }
    ad.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    if ((element.offer.rooms || element.offer.guests) === '') {
      ad.querySelector('.popup__text--capacity').style.display = 'none';
    }

    ad.querySelector('.popup__text--time').textContent = 'заезд после ' + element.offer.checkin + ' выезд до ' + element.offer.checkout;
    if (!element.offer.checkin || !element.offer.checkout) {
      ad.querySelector('.popup__text--time').style.display = 'none';
    }

    ad.querySelector('.popup__features').innerHTML = '';
    ad.querySelector('.popup__features').appendChild(createFeatures(element.offer.features));
    if (element.offer.features.length === 0) {
      ad.querySelector('.popup__features').style.display = 'none';
    }

    ad.querySelector('.popup__description').textContent = element.offer.description;
    if (!element.offer.description) {
      ad.querySelector('.popup__description').style.display = 'none';
    }

    ad.querySelector('.popup__photos').innerHTML = '';
    ad.querySelector('.popup__photos').appendChild(createPhotos(element.offer.photos));
    if (element.offer.photos.length === 0) {
      ad.querySelector('.popup__photos').style.display = 'none';
    }

    ad.querySelector('.popup__close').addEventListener('click', popupCloseClickHandler);
    document.addEventListener('keydown', popupCloseEscButton);

    return ad;
  };

  var showAd = function (ad) {
    window.itemSearch.map.insertBefore(createAds(ad), window.itemSearch.mapFilters);
  };

  window.card = {
    showAd: showAd
  };

})();
