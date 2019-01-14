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

    var img = ad.querySelector('img');
    var popupTitle = ad.querySelector('.popup__title');
    var popupTextAddress = ad.querySelector('.popup__text--address');
    var popupTextPrice = ad.querySelector('.popup__text--price');
    var popupType = ad.querySelector('.popup__type');
    var popupTextCapacity = ad.querySelector('.popup__text--capacity');
    var popupTextTime = ad.querySelector('.popup__text--time');
    var popupFeatures = ad.querySelector('.popup__features');
    var popupDescription = ad.querySelector('.popup__description');
    var popupPhotos = ad.querySelector('.popup__photos');
    var popupClose = ad.querySelector('.popup__close');

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

    img.src = element.author.avatar;
    if (!element.author.avatar) {
      img.style.display = 'none';
    }

    popupTitle.textContent = element.offer.title;
    if (!element.offer.title) {
      popupTitle.style.display = 'none';
    }

    popupTextAddress.textContent = element.offer.address;
    if (!element.offer.address) {
      popupTextAddress.style.display = 'none';
    }

    popupTextPrice.textContent = element.offer.price + '₽/нoчь';
    if (!element.offer.price) {
      popupTextPrice.style.display = 'none';
    }

    popupType.textContent = element.offer.type;
    switch (element.offer.type) {
      case 'palace':
        popupType.textContent = 'Дворец';
        break;
      case 'flat':
        popupType.textContent = 'Квартира';
        break;
      case 'house':
        popupType.textContent = 'Дом';
        break;
      case 'bungalo':
        popupType.textContent = 'Бунгало';
        break;
      case false:
        popupType.style.display = 'none';
        break;
    }
    popupTextCapacity.textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    if ((element.offer.rooms || element.offer.guests) === '') {
      popupTextCapacity.style.display = 'none';
    }

    popupTextTime.textContent = 'заезд после ' + element.offer.checkin + ' выезд до ' + element.offer.checkout;
    if (!element.offer.checkin || !element.offer.checkout) {
      popupTextTime.style.display = 'none';
    }

    popupFeatures.innerHTML = '';
    popupFeatures.appendChild(createFeatures(element.offer.features));
    if (element.offer.features.length === 0) {
      popupFeatures.style.display = 'none';
    }

    popupDescription.textContent = element.offer.description;
    if (!element.offer.description) {
      popupDescription.style.display = 'none';
    }

    popupPhotos.innerHTML = '';
    popupPhotos.appendChild(createPhotos(element.offer.photos));
    if (element.offer.photos.length === 0) {
      popupPhotos.style.display = 'none';
    }

    popupClose.addEventListener('click', popupCloseClickHandler);
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
