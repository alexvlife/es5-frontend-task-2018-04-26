;
//Функция для плавной прокрутки страницы.
function scroll() {

    var speed = 0.3, // Скорость прокрутки страницы.
        y = window.pageYOffset,  // Вертикальная прокрутка.
        id = '#mainImagesBlock',  // id элемента, к которому нужно перейти.
        top = document.querySelector(id).getBoundingClientRect().top,  // Отступ от окна браузера до id.
        start = null;

    requestAnimationFrame(step);  // Запускаем анимацию в браузере.

    function step(time) {

        if (start === null) {
            start = time;
        }

        var progress = time - start,
            r = (top < 0 ? Math.max(y - progress / speed, y + top) : Math.min(y + progress / speed, y + top));

        window.scrollTo(0, r);

        if (r !== y + top) {
            requestAnimationFrame(step)
        } else {
            location.id = id  // URL с id, с которому нужно перейти.
        }
    }
}