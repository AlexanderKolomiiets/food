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
if(e.target === modalWindow ){
    off();
}
});

document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape' || modalWindow.contains.classList('show')){
        off();
    }
    });
});