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