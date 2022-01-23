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
        constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
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
    <img src="${this.img}" alt="${this.altimg}">
    <h3 class="menu__item-subtitle">${this.title}</h3>
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

    const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok){
        throw new Error (console.log('Error'));
    }
    return await res.json();

    };

    getResource('http://localhost:3000/menu')
    .then(data =>{
     data.forEach(({img, altimg, title, descr, price, parentSelector}) => {
     new MenuCard(img, altimg, title, descr, price, parentSelector).render();
     });
    });

    const forms = document.querySelectorAll('form');

    const messageResponse = {
        loading: '/icons/spinner.svg',
        success: 'OK',
        failure: 'Something goes wrong...'
    };


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        if(!res.ok){
            throw new Error (console.log('Error'));
        }

        return await res.json();
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

            const formData = new FormData(form);
          
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                thanksModal(messageResponse.success);
            }).catch(() => {
                thanksModal(messageResponse.failure);
            }).finally(() => {
                element.remove();
                form.reset();
            });
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

    const slides = document.querySelectorAll('.offer__slide'),
    prevSlide = document.querySelector('.offer__slider-prev'),
    nextSlide = document.querySelector('.offer__slider-next'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    slideWrapper = document.querySelector('.offer__slider-wrapper'),
    slideField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slideWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    showSlides();

    function showSlides() {
        if(slideIndex < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function dotsOpacity() {
        dots.forEach(dot => {
            dot.style.opacity = '0.5';
            dots[slideIndex-1].style.opacity = 1;
        });
    }

    slideField.style.width = 100 * slides.length + '%';
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';

    slideWrapper.style.position = 'relative';
    slideWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    let dots = [];
    
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    slideWrapper.style.position = 'relative';
    slideWrapper.append(indicators);

    for (let i = 0; i < slides.length; i++){
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

        if(offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showSlides();
        dotsOpacity();

    });

    prevSlide.addEventListener('click', () => {

        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showSlides();
        dotsOpacity();
        
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo.length - 1);
            slideField.style.transform = `translateX(-${offset}px)`;

            showSlides();
            dotsOpacity();
        });
    });




});