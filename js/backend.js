'use strict';

(function () {

  var xhrRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.BACKEND.STATUS_200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.constants.BACKEND.TIMEOUT;

    return xhr;
  };

  var upload = function (data, onLoad, onError) {

    var xhr = xhrRequest(onLoad, onError);

    xhr.open('POST', window.constants.UPLOAD_URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {

    var xhr = xhrRequest(onLoad, onError);

    xhr.open('GET', window.constants.LOAD_URL);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };

})();
