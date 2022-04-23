/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    //  CALCULATOR

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    function initLocal(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }

        });
    }

    initLocal('#gender div', 'calculating__choose-item_active');
    initLocal('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '___';
            return;
        }
        if (sex === 'female') {
            result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(2);
        } else {
            result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(2);
        }
    }

    calcTotal();

    function getStatic(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });

    }

    getStatic('#gender div', 'calculating__choose-item_active');
    getStatic('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamic(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            if (input.getAttribute('id') === 'height') {
                height = +input.value;
            } else if (input.getAttribute('id') === 'weight') {
                weight = +input.value;
            } else if (input.getAttribute('id') === 'age') {
                age = +input.value;
            }
            calcTotal();
        });
    }

    getDynamic('#height');
    getDynamic('#weight');
    getDynamic('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/classes.js":
/*!*******************************!*\
  !*** ./js/modules/classes.js ***!
  \*******************************/
/***/ ((module) => {

function classes() {
    // CLASSES
    class Menu {
        constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.altimg = altimg;
            this.parent = document.querySelector(parentSelector);
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUah();
        }
        changeToUah() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
        <img src="${this.img}" alt="${this.altimg}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span class="menu__item-pricenum">${this.price}</span> грн/день</div>
        </div>
        `;
            this.parent.append(element);
        }
    }

    // Создание GET-запроса для создания классов
    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(console.log(`Could not fetch ${url}, status: ${res.status}`));
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price,
                parentSelector
            }) => {
                new Menu(img, altimg, title, descr, price, parentSelector).render();
            });
        });

    // new Menu("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', "Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 10, ".menu .container").render(); //класса menu__item нету   

    // new Menu("img/tabs/elite.jpg", "elite", 'Меню "Премиум"', "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 20, ".menu .container", 'menu__item').render();

    // new Menu("img/tabs/post.jpg", "post", 'Меню "Постное"', "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 15, ".menu .container", 'menu__item').render();


}

module.exports = classes;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    // ФОРМА ОТПРАВКИ ДАННЫХ

    const forms = document.querySelectorAll('form');

    const message = {
        loading: '/icons/spinner.svg',
        success: 'Спасибо !',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        if (!res.ok) {
            throw new Error(console.log(`Could not fetch ${url}, status: ${res.status}`));
        }

        return await res.json();
    };


    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                    `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // 1 метод создания обьекта json

            // const obj = {};
            // formData.forEach((value, key) => {
            //     obj[key] = value;
            // });
            // const json = JSON.stringify(obj);

            // 2 метод создания обьекта json

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            //   Запрос через Fetch API

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    thanksModal(message.success);
                }).catch(() => {
                    thanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                    statusMessage.remove();
                });

            //  Запрос через XMLHttpRequest

            // const request = new XMLHttpRequest();

            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');
            // request.send(json);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         thanksModal(message.success);
            //     } else {
            //         thanksModal(message.failure);
            //     }
            // });
            //         form.reset();
            //         statusMessage.remove();

            // npx json-server db.json

            // fetch('http://localhost:3000/menu')
            // .then(data => data.text())
            // .then(data => console.log(data));

        });
    });

    function thanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                            <div data-close class="modal__close">&times;</div>
                            <div class="modal__title">${message}</div>
                    </div>
                `;

        document.querySelector('.modal').append(thanksModal);

        modalOn();

        function closeThanksModal() {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            modalOff();
        }

        modal.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-close') == '' || e.target === modal) {
                closeThanksModal();
                clearTimeout(timeoutModal);
            }
        });

        const timeoutModal = setTimeout(() => {
            closeThanksModal();
        }, 4000);
    }

}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    // MODAL WINDOW 

    const modal = document.querySelector('.modal');
    const btnsOn = document.querySelectorAll('[data-modal]');
    const body = document.querySelector('body');


    function modalOn() {

        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('hide');
        body.style.overflow = 'hidden';
        clearInterval(timer);

    }

    function modalOff() {

        modal.classList.add('hide');
        modal.classList.remove('show');
        body.style.overflow = '';


    }


    btnsOn.forEach(item => {
        item.addEventListener('click', modalOn);
    });


    modal.addEventListener('click', (e) => { // убрать окно нажав мимо него

        if (e.target === modal || e.target.getAttribute('data-close') == '') {

            modalOff();

        }
    });

    document.addEventListener('keydown', (e) => { // убрать нажав Esc (keydown)

        if (e.code === 'Escape' && modal.classList.contains('show')) { // e.code для обозначения конкретной клавиши

            modalOff();

        }
    });

    const timer = setTimeout(modalOn, 15000); // открыть модальное окно через 5 сек

    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOn();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    //  Slider (2 вариант)

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slidesWrapper.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slidesWrapper.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    nextSlide.addEventListener('click', () => {

        if (offset === +width.replace(/\D/ig, '') * (slides.length - 1)) { //  width нужно обрезать из-за px в конце
            offset = 0;
        } else {
            offset += +width.replace(/\D/ig, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '0.5';
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    prevSlide.addEventListener('click', () => {

        if (offset == 0) { //  width нужно обрезать из-за px в конце
            offset = +width.replace(/\D/ig, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/ig, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '0.5';
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.replace(/\D/ig, '') * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => {
                dot.style.opacity = '0.5';
                dots[slideIndex - 1].style.opacity = 1;
            });
        });
    });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    //   TABS

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabsContent();
    showTabContent();

    // i = 0  // нужно чтобы поставить дефолтное значение

    // 2 решения

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {

            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });

        }

    });

    tabs.forEach((item, i) => {
        item.addEventListener('click', () => {
            hideTabsContent();
            showTabContent(i);
        });
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    //  TIMER

    const deadline = '2022-11-10';

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((total / (1000 * 60) % 60)),
            seconds = Math.floor((total / 1000) % 60);

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }

    }

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
document.addEventListener('DOMContentLoaded', () => {

    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
    timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
    modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
    forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
    classes = __webpack_require__(/*! ./modules/classes */ "./js/modules/classes.js"),
    slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
    calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    tabs();
    timer();
    modal();
    forms();
    classes();
    slider();
    calc();


});










})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map