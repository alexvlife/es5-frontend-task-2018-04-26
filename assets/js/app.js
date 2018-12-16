;
(function (ajax, scroll) {
    // Глобальное хранилище.
    var store = {
        imagesData: null, // Информация о всех изображениях (многомерный массив, см. ф-цию getImagesData).
        currentImageBlock: 0 // Номер подмассива с изображениями, по которому формируем контент на странице.
    };

    // Функция для получения информации об изображениях.
    function getImagesData() {
        ajax({
            url: 'mock-data/data.json',
            method: 'GET'
        }, function (data) {
            store.imagesData = handleData(data[0].data); // Получаем массив из подмассивов, для удобства. (Хранится в глобальном store).
            showData(store.imagesData, store.currentImageBlock);
        })
    }

    // Обработка полученных данных.
    // Функция для создания многомерного массива.
    function handleData(array) {
        var subArrSize = 4; // Размер подмассива (кол-во изображений в одном ряду).
        var multiArray = []; // Массив из подмассивов.

        // Разбиваем массив на подмассивы.
        for (var i = 0; i < Math.ceil(array.length / subArrSize); i++) {
            multiArray[i] = array.slice((i * subArrSize), (i * subArrSize) + subArrSize);
        }

        return multiArray;
    }

    // Колбэк-функция, которая принимает:
    //  - многомерный массив изображений;
    //  - номер подмассива, по которому будут сгенерированы html-элементы.
    function showData(data, currentImageBlock) {
        if (!data[currentImageBlock]) {
            alert("Фотографии закончились...");
            return;
        }

        createImgRow(data[currentImageBlock]); // Создаем ряд элементов по информации из определенного подмассива.
    }

    // Функция для генерации html-элементов на странице,
    //   в которую передается imageArr - подмассив с изображениями.
    function createImgRow(imageArr) {
        var mainElement = document.getElementById('mainImagesBlock'); // Блок, в котором будут генерироваться html-элементы.
        var ulImagesBlock = document.createElement('ul'); //Ряд, в котором будут отображены элементы с изображениями.

        ulImagesBlock.classList.add("images-block");

		// Добавляем элементы с изображениями.
        for (var j = 0; j < imageArr.length; j++) {
            ulImagesBlock.appendChild(createImg(imageArr[j]));
        }

        mainElement.insertBefore(ulImagesBlock, mainElement.children[0]);
    }

    // Функция для создания элементов с изображением,
    //   в которую передается объект image - элемент подмассива с изображениями imageArr.
    function createImg(image) {
        var liImg = document.createElement('li');
        liImg.classList.add("images-block__item");
        liImg.id = image.id;
        liImg.style.backgroundImage = 'url(' + image.imageUrl + ')';

        //Блок с контентом (заголовок, текст, кнопка).
        var divWrap = document.createElement('div');
        divWrap.classList.add("item-wrapper");

        var h2 = document.createElement('h2');
        h2.classList.add("item-header");
        h2.innerHTML = image.name;

        var elemP = document.createElement('p');
        elemP.classList.add("item-text");
        elemP.innerHTML = image.text;

        var btnDel = document.createElement('button');
        btnDel.name = image.id;
        btnDel.classList.add("btn", "btn-del");
        btnDel.innerHTML = "Delete";
        btnDel.imgBlock = liImg;
        btnDel.onclick = removeImage; // При клике на кнопку 'DELETE' удяляется соответствующий элемент из DOM.

        divWrap.appendChild(h2);
        divWrap.appendChild(elemP);
        divWrap.appendChild(btnDel);

        liImg.appendChild(divWrap);

        return liImg;
    }

	// Функция для удаления элемента из DOM.
    function removeImage(e) {
        var imgBlock = e.target.imgBlock;
        imgBlock.parentNode.removeChild(imgBlock);
    }	
	
	// Функция для запуска приложения.
    function init() {
        getImagesData();

        // При клике на кнопку 'DOWNLOAD' отображается еще один ряд следующих элементов.
        var btnDownload = document.getElementById('btnDownload');
        btnDownload.addEventListener('click', function () {
            scroll();
            showData(store.imagesData, ++store.currentImageBlock);
        });
    }

    init();
})(ajax, scroll);