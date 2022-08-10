const initSplideMainSlider = function () {

    let splideMainSlider = new Splide('.main__slider-splide', {
        type: 'slide',
        perPage: 2,
        perMove: 1,
        width: '100vw',
        fixedWidth: '934px',
        fixedHeight: '553px',
        updateOnMove: true,
        focus: 'center',
        trimSpace: false,
        start: 1,
        gap: '2rem',
    }).mount();

    let mainSliderSplide = document.querySelector('.main__slider-splide'),
        products = mainSliderSplide.querySelectorAll('.product.splide__slide');


    splideMainSlider.on('moved', function () {
        let pFirst = products[0].classList.contains('is-active'),
            pLast = products[products.length - 1].classList.contains('is-active'),
            btnPrev = mainSliderSplide.querySelector('.splide__arrow--prev'),
            btnNext = mainSliderSplide.querySelector('.splide__arrow--next');
        if (pFirst) {
            btnPrev.classList.add('--disable');
            btnPrev.disabled = true;
        }
        if (pLast) {
            btnNext.classList.add('--disable');
            btnNext.disabled = true;
        }
        if (!pFirst && !pLast) {
            btnPrev.classList.remove('--disable');
            btnPrev.disabled = false;
            btnNext.classList.remove('--disable');
            btnNext.disabled = false;
        }
    });
}

const initSplideRooms = function () {

    let splideRooms = new Splide('.main__rooms-splide', {
        type: 'slide',
        perPage: 0,
        perMove: 0,
        width: '880px',
        updateOnMove: true,
        focus: 'center',
        gap: '1.5rem',
        drag: false,
    }).mount();

    let roomsSplide = document.querySelector('.main__rooms-splide'),
        rooms = roomsSplide.querySelectorAll('.room.splide__slide'),
        roomsList = roomsSplide.querySelector('.splide__list'),
        roomPaginationButton = roomsSplide.querySelectorAll('.splide__pagination__page'),
        wRoom = rooms[1].offsetWidth + parseInt(getComputedStyle(rooms[0], true).marginRight),
        transition = `transform ${splideRooms.options.speed}ms ${splideRooms.options.easing}`,
        translateX = 0;

    roomPaginationButton.forEach(function (item, index, array) {
        item.disabled = true;
    })

    splideRooms.on('moved', function () {
        let rFirst = rooms[0].classList.contains('is-active'),
            rLast = rooms[rooms.length - 1].classList.contains('is-active'),
            btnPrev = roomsSplide.querySelector('.splide__arrow--prev'),
            btnNext = roomsSplide.querySelector('.splide__arrow--next');
        if (rFirst) {
            btnPrev.style.display = 'none';
        }
        if (rLast) {
            btnNext.style.display = 'none';
        }
        if (!rFirst && !rLast) {
            btnPrev.style.display = 'flex';
            btnNext.style.display = 'flex';
        }
    });

    const prevRoom = function (e) {
        let btn = e.target.closest('.splide__arrow--prev');
        if (!btn) return;

        translateX -= wRoom;
        roomsList.style.transform = 'translateX(' + -translateX + 'px)';
        roomsList.style.transition = transition;
    }

    const nextRoom = function (e) {
        let btn = e.target.closest('.splide__arrow--next');
        if (!btn) return;

        translateX += wRoom;
        roomsList.style.transform = 'translateX(' + -translateX + 'px)';
        roomsList.style.transition = transition;
    }

    roomsSplide.addEventListener("click", prevRoom);
    roomsSplide.addEventListener("click", nextRoom);

}

const initSplideTricks = function () {

    let splideTricks = new Splide('.main__tricks-splide', {
        type: 'slide',
        perPage: 3,
        perMove: 2,
        width: '1285px',
        gap: '2rem',
    }).mount();

    let trick = document.querySelectorAll('.trick');

    let timerId = setInterval(() => {
        if (trick[0].classList.contains('is-active')) {
            let tricks = document.querySelectorAll('.trick.is-visible');
            tricks[0].classList.remove('is-active');
            tricks[1].classList.add('is-active');
        }
    }, 10);

    setTimeout(() => clearInterval(timerId), 5000);

    splideTricks.on('moved', function () {
        let tricks = document.querySelectorAll('.trick.is-visible');
        tricks[0].classList.remove('is-active');
        tricks[1].classList.add('is-active');
        tricks[2].classList.remove('is-active');
    });

}

const initFuniroRiver = function (row) {

    let funiro = document.querySelector('.funiro'),
        funiros = funiro.querySelectorAll('.funiro__item'),
        fMargin = 2 * parseInt(window.getComputedStyle(funiros[0], null).margin);

    window.onload = function () {
        funiros.forEach(function (item, index, array) {
            item.style.width = item.clientWidth / 2 + 'px';
        })

        let fWidth = funiro.clientWidth / row + fMargin * funiros.length,
            fTranslateX = 0

        funiro.style.width = fWidth + 'px';

        new Masonry('.funiro', {
            itemSelector: '.funiro__item',
            columnWidth: 2,
            horizontalOrder: true
        });

        function funiroTranslate(tX) {
            if (fTranslateX < -fWidth) {
                fTranslateX = 0;
                funiro.style.transform = 'translateX(' + fTranslateX + 'px)';
            } else {
                fTranslateX -= tX;
                funiro.style.transform = 'translateX(' + fTranslateX + 'px)';
            }
        }

        setInterval(funiroTranslate, 7.5, 1);
    };
}
window.addEventListener("DOMContentLoaded", initSplideMainSlider);
window.addEventListener("DOMContentLoaded", initSplideRooms);
window.addEventListener("DOMContentLoaded", initSplideTricks);
window.addEventListener("load", initFuniroRiver(2));
