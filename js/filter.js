'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var typeSelect = mapFilters.querySelector('#housing-type');
  var priceSelect = mapFilters.querySelector('#housing-price');
  var roomsSelect = mapFilters.querySelector('#housing-rooms');
  var guestsSelect = mapFilters.querySelector('#housing-guests');
  var featuresChoose = mapFilters.querySelector('#housing-features');

  //  window.utils.setAvailabilityForm(mapFilters, window.constants.DISABLED_MAP_STATE);

  var housePrices = {
    low: 10000,
    middle: [10000, 50000],
    high: 50000
  };

  var housingTypeFilter = function (ad) {
    var value = typeSelect.value;
    // debugger;
    if (value === 'any' || value === ad.offer.type) {
      return true;
    }
    return false;
  };

  var housingPriceFilter = function (ad) {

    var value = priceSelect.value;
    switch (value) {
      case 'low': return ad.offer.price < housePrices[value];
      case 'middle': return ((ad.offer.price >= housePrices[value][0]) && (ad.offer.price <= housePrices[value][1]));
      case 'high': return ad.offer.price > housePrices[value];
      default: return true;
    }
  };

  var housingRoomsSelect = function (ad) {
    var value = roomsSelect.value;
    if (value === 'any' || +value === ad.offer.rooms) {
      return true;
    }
    return false;
  };

  var housingGuestsSelect = function (ad) {
    var value = guestsSelect.value;
    if (value === 'any' || +value === ad.offer.guests) {
      return true;
    }
    return false;
  };

  var getCheckedCheckboxes = function (searchElement) {
    var selectedCheckboxes = searchElement.querySelectorAll('input.map__checkbox:checked');

    return [].map.call(selectedCheckboxes, function (el) {
      return el.value;
    });
  };

  var housingCheckboxChecked = function (ad) {
    var checkedFilters = getCheckedCheckboxes(featuresChoose);

    if (checkedFilters.length) {
      return checkedFilters.some(function (el) {
        if (ad.offer.features.indexOf(el) !== -1) {
          return true;
        } else {
          return false;
        }
      });
    }
    return true;
  };

  var renderFilteredPins = function (newPins) {
    var pins = document.createDocumentFragment();
    // debugger;
    for (var i = 0; i < window.constants.FILTERED_ADS_COUNT; i++) {
      pins.appendChild(window.pin.createPins(newPins[i]));
    }
    window.itemSearch.mapPins.appendChild(pins);
  };

  mapFilters.addEventListener('change', function () {
    // console.log(evt.target.value);

    if (typeSelect.value === 'any' && priceSelect.value === 'any' && roomsSelect.value === 'any' && guestsSelect.value === 'any') {
      window.pin.renderPins();
    } else {
      var newArrayData = window.pin.arrayAds
                  .filter(housingTypeFilter)
                  .filter(housingPriceFilter)
                  .filter(housingRoomsSelect)
                  .filter(housingGuestsSelect)
                  .filter(housingCheckboxChecked)
                  ;
      window.utils.removePins();
      renderFilteredPins(newArrayData);
    }

    // console.log(newArrayData);
    return newArrayData;

  });

})();
