'use strict';

(function () {
  var generateRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomElement = function (array) {
    var randomElement = Math.floor(Math.random() * array.length);
    return array[randomElement];
  };

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var getRandomLengthArray = function (array) {
    return array.slice(0, generateRandomNumber(1, array.length));
  };

  var classRemove = function (domElement, domElementClassRemove) {
    domElement.classList.remove(domElementClassRemove);
    return domElement;
  };

  var setAvailabilityForm = function (thatChange, state) {
    for (var i = 0; i < thatChange.length; i++) {
      thatChange[i].disabled = state;
    }
  };

  var removeDomElement = function (element) {
    window.itemSearch.map.querySelector(element).remove();
  };

  window.utils = {
    generateRandomNumber: generateRandomNumber,
    getRandomElement: getRandomElement,
    shuffleArray: shuffleArray,
    getRandomLengthArray: getRandomLengthArray,
    classRemove: classRemove,
    setAvailabilityForm: setAvailabilityForm,
    removeDomElement: removeDomElement
  };

})();
