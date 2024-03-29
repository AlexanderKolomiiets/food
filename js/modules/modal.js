function modalOn(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimer){
    clearInterval(modalTimer);
    }
}

function modalOff(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(modalSelector, trigger, modalTimer) {
    const modal = document.querySelector(modalSelector);
    const btnsOn = document.querySelectorAll(trigger);

    btnsOn.forEach(item => {
        item.addEventListener('click', () => modalOn(modalSelector, modalTimer));
    });

    modal.addEventListener('click', (e) => {

        if (e.target === modal || e.target.getAttribute('data-close') == '') {

            modalOff(modalSelector);

        }
    });

    document.addEventListener('keydown', (e) => {

        if (e.code === 'Escape' && modal.classList.contains('show')) {

            modalOff(modalSelector);

        }
    });

    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOn(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

}

export default modal;

export {modalOn};
export {modalOff};