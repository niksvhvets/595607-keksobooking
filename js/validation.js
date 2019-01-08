'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adPrice = adForm.querySelector('[name=price]');
  var guestNumber = adForm.querySelector('#capacity');
  var roomNumber = adForm.querySelector('#room_number');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var typeOfHousing = adForm.querySelector('#type');
  var submitButton = adForm.querySelector('.ad-form__submit');

  var checkTimeSyncHandler = function (evt) {

    var time = evt.target.value;

    if (timeIn.value === time) {
      timeOut.value = time;
    } else if (timeOut.value === time) {
      timeIn.value = time;
    }
  };

  timeIn.addEventListener('change', checkTimeSyncHandler);
  timeOut.addEventListener('change', checkTimeSyncHandler);

  var priceAd = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  typeOfHousing.addEventListener('change', function () {
    var type = typeOfHousing.value;

    adPrice.placeholder = priceAd[type];
    adPrice.min = priceAd[type];
  });

  roomNumber.addEventListener('change', function () {

    var room = roomNumber.value;

    window.utils.setAvailabilityForm(guestNumber, true);

    if (room !== '100') {
      for (var i = 0; i < guestNumber.length; i++) {
        if (guestNumber[i].value <= room) {
          guestNumber[i].disabled = false;
          guestNumber[guestNumber.length - 1].disabled = true;
        }
      }
    } else {
      guestNumber[guestNumber.length - 1].disabled = false;
      guestNumber[guestNumber.length - 1].selected = true;
    }
  });

  submitButton.addEventListener('click', function () {
    if (guestNumber[guestNumber.selectedIndex].disabled) {
      guestNumber.setCustomValidity('Кол-во мест выбрано не верно');
    } else {
      guestNumber.setCustomValidity('');
    }
  });
  /*
  adForm.addEventListener('submit', function (evt) {
    window.backend(new FormData(form), function (response) {

    });
  });*/

  window.validation = {
    adForm: adForm
  };
})();
