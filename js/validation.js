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

  var uploadSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);

    window.itemSearch.main.appendChild(successMessage);

    document.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC_BUTTON) {
        closeSuccessMessage();
      }
    });
  };

  var closeSuccessMessage = function () {
    var successMessage = document.querySelector('.success');

    if (successMessage) {
      window.itemSearch.main.removeChild(successMessage);

      document.removeEventListener('click', closeSuccessMessage);
      document.removeEventListener('keydown', closeSuccessMessage);

      adForm.reset();
    }
  };

  var uploadError = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    var errorButton = errorMessage.querySelector('.error__button');

    window.itemSearch.main.appendChild(errorMessage);

    errorButton.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC_BUTTON) {
        closeErrorMessage();
      }
    });
  };

  var closeErrorMessage = function () {
    var ErrorMessage = document.querySelector('.error');
    var errorButton = document.querySelector('.error__button');

    if (ErrorMessage) {
      window.itemSearch.main.removeChild(ErrorMessage);

      errorButton.removeEventListener('click', closeErrorMessage);
      document.removeEventListener('keydown', closeErrorMessage);

      adForm.reset();
    }
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(adForm), uploadSuccess, uploadError);
  });

  window.validation = {
    adForm: adForm,
    uploadSuccess: uploadSuccess
  };
})();
