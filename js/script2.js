document.addEventListener('DOMContentLoaded', () => {

    const tabsContainer = document.querySelector('.tabheader__items');
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');

    function hideContent() {
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
    }

    function showContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideContent();
    showContent();

    tabs.forEach((item, i) => {
        item.addEventListener('click', () => {
            hideContent();
            showContent(i);
        });
    });


    const deadline = '2022-02-10';

    function getTimeRemaining(endline) {
        const t = Date.parse(endline) - Date.parse(new Date()),
            days = Math.floor(t / 1000 / 60 / 60 / 24),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function zero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }

    }

    function setClock(selector, endline) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            interval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endline);
            days.innerHTML = zero(t.days);
            hours.innerHTML = zero(t.hours);
            minutes.innerHTML = zero(t.minutes);
            seconds.innerHTML = zero(t.seconds);
            if (t.total <= 0) {
                clearInterval(interval);
            }
        }

    }

    setClock('.timer', deadline);

    const buttonModalOn = document.querySelectorAll('[data-modal]');
    const buttonModalOff = document.querySelector('[data-close]');
    const modalWindow = document.querySelector('.modal');
    const body = document.querySelector('body');


    function on() {
        modalWindow.classList.add('show', 'fade');
        modalWindow.classList.remove('hide');
        body.style.overflow = 'hidden';
        clearInterval(interval);
    }

    function off() {
        modalWindow.classList.remove('show', 'fade');
        modalWindow.classList.add('hide');
        body.style.overflow = '';
    }

    buttonModalOn.forEach(item => {
        item.addEventListener('click', on);
    });

    buttonModalOff.addEventListener('click', off);

    let interval = setInterval(on, 5000);

    document.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            off();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' || modalWindow.contains.classList('show')) {
            off();
        }
    });

    class Menu {
        constructor(src, alt, parent, title, descr, price, ...classes) {
            this.src = src;
            this.alt = alt;
            this.parent = document.querySelector(parent);
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.convert();
        }
        convert() {
            this.price *= this.transfer;
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
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
        `;
            this.parent.append(element);
        }
    }

    new Menu("img/tabs/vegy.jpg", "vegy", ".menu .container", 'Меню "Фитнес"', "Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 10).render(); //класса menu__item нету   

    new Menu("img/tabs/elite.jpg", "elite", ".menu .container", 'Меню "Премиум"', "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 20, 'menu__item').render();

    new Menu("img/tabs/post.jpg", "post", ".menu .container", 'Меню "Постное"', "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 15, 'menu__item').render();






});