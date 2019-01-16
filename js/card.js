'use strict';

(function () {

  var createFeatures = function (array) {
    var feature = document.createDocumentFragment();

    array.forEach(function (el) {
      var featuresItem = document.createElement('li');
      featuresItem.className = 'popup__feature popup__feature--' + el;
      feature.appendChild(featuresItem);
    });

    return feature;
  };

  var createPhotos = function (array) {
    var photo = document.createDocumentFragment();

    array.forEach(function (el) {
      var photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.src = el;
      photoItem.width = window.constants.IMAGE_WIDTH;
      photoItem.height = window.constants.IMAGE_HEIGHT;
      photoItem.alt = 'Фотография жилья';

      photo.appendChild(photoItem);
    });

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
      document.removeEventListener('click', popupCloseEscButton);

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

    var hideEmtyblock = function (block, popupInfo) {
      if (!block || block.length === 0) {
        popupInfo.style.display = 'none';
      }
    };

    img.src = element.author.avatar;
    hideEmtyblock(element.author.avatar, img);

    popupTitle.textContent = element.offer.title;
    hideEmtyblock(element.offer.title, popupTitle);

    popupTextAddress.textContent = element.offer.address;
    hideEmtyblock(element.offer.address, popupTextAddress);

    popupTextPrice.textContent = element.offer.price + '₽/нoчь';
    hideEmtyblock(element.offer.price, popupTextPrice);

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
    hideEmtyblock(element.offer.features, popupFeatures);

    popupDescription.textContent = element.offer.description;
    hideEmtyblock(element.offer.description, popupDescription);

    popupPhotos.innerHTML = '';
    popupPhotos.appendChild(createPhotos(element.offer.photos));
    hideEmtyblock(element.offer.photos, popupPhotos);

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
