document.addEventListener('DOMContentLoaded', () => {

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

    //  TIMER

    const deadline = '2022-2-10';

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

    // CLASSES

    class Menu {
        constructor(src, alt, parentSelector, title, descr, price, ...classes) {
            this.src = src;
            this.alt = alt;
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
    <img src="${this.src}" alt="${this.alt}">
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

    // удобно не создавать отдельную переменную чисто для оглашения метода одинарно 

    new Menu("img/tabs/vegy.jpg", "vegy", ".menu .container", 'Меню "Фитнес"', "Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 10).render(); //класса menu__item нету   

    new Menu("img/tabs/elite.jpg", "elite", ".menu .container", 'Меню "Премиум"', "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 20, 'menu__item').render();

    new Menu("img/tabs/post.jpg", "post", ".menu .container", 'Меню "Постное"', "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 15, 'menu__item').render();


    // ФОРМА ОТПРАВКИ ДАННЫХ

    const forms = document.querySelectorAll('form');

    const message = {
        loading: '/icons/spinner.svg',
        success: 'Спасибо !',
        failure: 'Что-то пошло не так...'
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

            //  Запрос через XMLHttpRequest

            const formData = new FormData(form);
            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            const json = JSON.stringify(obj);

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

            //   Запрос через Fetch API

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: json
            }).then(data => data.text())
              .then(data => {
                console.log(data);
                thanksModal(message.success);
            }).catch(() => {
                thanksModal(message.failure);
            }).finally(() => {
                form.reset();
                statusMessage.remove();
            });


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
        }, 2500);
    }



});