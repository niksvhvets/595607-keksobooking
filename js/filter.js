'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var typeSelect = mapFilters.querySelector('#housing-type');
  var priceSelect = mapFilters.querySelector('#housing-price');
  var roomsSelect = mapFilters.querySelector('#housing-rooms');
  var guestsSelect = mapFilters.querySelector('#housing-guests');
  var featuresChoose = mapFilters.querySelectorAll('.map__checkbox');

  window.utils.setAvailabilityForm(mapFilters, window.constants.DISABLED_MAP_STATE);

  var HousesPrices = {
    MIN: 10000,
    MAX: 50000
  };

  var getTypeFilter = function (ad) {
    var value = typeSelect.value;
    if (value === 'any' || value === ad.offer.type) {
      return true;
    }
    return false;
  };

  var getPriceFilter = function (ad) {

    var value = priceSelect.value;
    switch (value) {
      case 'low': return ad.offer.price < HousesPrices.MIN;
      case 'middle': return ((ad.offer.price >= HousesPrices.MIN) && (ad.offer.price <= HousesPrices.MAX));
      case 'high': return ad.offer.price > HousesPrices.MAX;
      default: return true;
    }
  };

  var getRoomsSelect = function (ad) {
    var value = roomsSelect.value;
    if (value === 'any' || +value === ad.offer.rooms) {
      return true;
    }
    return false;
  };

  var getGuestsSelect = function (ad) {
    var value = guestsSelect.value;
    if (value === 'any' || +value === ad.offer.guests) {
      return true;
    }
    return false;
  };

  var renderFilteredPins = function (newPins) {
    var pins = document.createDocumentFragment();
    for (var i = 0; i < newPins.length; i++) {
      pins.appendChild(window.pin.createPins(newPins[i]));
    }
    window.itemSearch.mapPins.appendChild(pins);
  };

  var getChangeFeature = function (data) {
    for (var i = 0; i < featuresChoose.length; i++) {
      if (featuresChoose[i].checked && data.offer.features.indexOf(featuresChoose[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var getfilterPins = function () {
    var newData = window.pin.arrayAds;
    var filteredArray = newData.filter(function (data) {
      return getTypeFilter(data)
          && getPriceFilter(data)
          && getRoomsSelect(data)
          && getGuestsSelect(data)
          && getChangeFeature(data);
    }).slice(0, window.constants.FILTERED_ADS_COUNT);

    window.utils.removePins();
    renderFilteredPins(filteredArray);
  };

  mapFilters.addEventListener('change', function () {
    window.utils.removeDomElement('.map__card');
  });
  mapFilters.addEventListener('change', window.utils.debounce(getfilterPins));

  window.filter = {
    mapFilters: mapFilters
  };

})();
