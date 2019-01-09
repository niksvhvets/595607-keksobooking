'use strict';

(function () {
  var uploadURL = 'https://js.dump.academy/keksobooking/';
  var loadURL = 'https://js.dump.academy/keksobooking/data';

  var xhrRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.timeout = 10000;

    return xhr;
  };

  var upload = function (data, onLoad, onError) {

    var xhr = xhrRequest(onLoad, onError);

    xhr.open('POST', uploadURL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {

    var xhr = xhrRequest(onLoad, onError);

    xhr.open('GET', loadURL);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };

})();
