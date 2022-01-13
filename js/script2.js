document.addEventListener('DOMContentLoaded', () => {

    const tabContent = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item');

    function hideContent() {
        tabContent.forEach(content => {
            content.classList.remove('show', 'fade');
            content.classList.add('hide');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }


    hideContent();
    showContent();


    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            hideContent();
            showContent(i);
        });
    });

    const deadline = '2022-02-10';

    function getTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / 1000 / 60 / 60 / 24),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            t,
            days,
            hours,
            minutes,
            seconds
        };
    }


    function setClock(endtime, selector) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        const interval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTime(endtime);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            if (t <= 0) {
                clearInterval(interval);
            }
        }

    }

    setClock(deadline, '.timer');

    const buttonOn = document.querySelectorAll('[data-modal]'),
    body = document.querySelector('body'),
        modalWindow = document.querySelector('.modal');

    function modalOn() {
        modalWindow.classList.add('show', 'fade');
        modalWindow.classList.remove('hide');
        body.style.overflow = 'hidden';
        clearTimeout(timeoutModal);
    }

    function modalOff() {
        modalWindow.classList.remove('show', 'fade');
        modalWindow.classList.add('hide');
        body.style.overflow = '';
    }

    buttonOn.forEach(item => {
        item.addEventListener('click', modalOn);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            modalOff();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            modalOff();
        }
    });

    const timeoutModal = setTimeout(() => {
        modalOn();
    }, 15000);


    class MenuCard {
        constructor(src, alt, name, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.name = name;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.transfer = 27;
            this.classes = classes;
            this.convertToUAH();
        }

        convertToUAH() {
            this.price *= this.transfer;
        }

        render() {

            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(item => {
                    element.classList.add(item);
                });
            }
            element.innerHTML = `
    <img src="${this.src}" alt="${this.alt}">
    <h3 class="menu__item-subtitle">${this.name}</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span class="menu__item-pricenum">${this.price}</span> грн/день</div>
    </div>
    `;
            this.parentSelector.append(element);
        }

    }


    new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', "Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 10, ".menu .container").render(); //класса menu__item нету   

    new MenuCard("img/tabs/elite.jpg", "elite", 'Меню "Премиум"', "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 20, ".menu .container", 'menu__item').render();

    new MenuCard("img/tabs/post.jpg", "post", 'Меню "Постное"', "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 15, ".menu .container", 'menu__item').render();

    const forms = document.querySelectorAll('form');

    const messageResponse = {
        loading: '/icons/spinner.svg',
        success: 'OK',
        failure: 'Something goes wrong...'
    };

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {

            e.preventDefault();

            const element = document.createElement('img');
            element.src = messageResponse.loading;
            element.style.cssText = `
            margin: 0 auto;
            display: block;
            `;
            
            form.insertAdjacentElement('afterend', element);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            const formData = new FormData(form);
            const obj = {};
            formData.forEach((data, i) => {
                obj[i] = data;
            });

            const json = JSON.stringify(obj);

            request.send(json);


            request.addEventListener('load', () => {
                console.log(request.response);
                if (request.status === 200) {
                    thanksModal(messageResponse.success);
                } else {
                    thanksModal(messageResponse.failure);
                }
            });

            element.remove();
            form.reset();

        });

    });

    function thanksModal(message) {

        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');


        const currentModal = document.createElement('div');
        currentModal.classList.add('modal__dialog');
        currentModal.innerHTML = `
        <div class="modal__content">
                <form action="#">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </form>
            </div>
        `;
        
        modalWindow.append(currentModal);

        modalOn();

    
        function thanksModalClose(){
            prevModal.classList.remove('hide');
            currentModal.remove();
            modalOff();
        }

        modalWindow.addEventListener('click', (e) => {
            if(e.target === modalWindow || e.target.getAttribute('data-close') == ''){
            thanksModalClose();
            clearTimeout(timeoutThanks);
            }
        });

       const timeoutThanks = setTimeout(thanksModalClose, 2000);

    }


});