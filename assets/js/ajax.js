;
// Функция для загрузки JSON-файлов с сервера.
function ajax(xhrSettings, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open(xhrSettings.method, xhrSettings.url);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            // Обработка ошибки.
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            try {
                var data = JSON.parse(xhr.responseText); // Превращаем строку с данными в JS-объект.
                callback && callback(data); // Защита от того, что не передали колбэк.
            } catch (e) {
                console.log('Информация об ошибке: ' + e.message);
            }
        }
    }
}