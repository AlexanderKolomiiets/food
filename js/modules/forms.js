import {modalOn, modalOff} from './modal';
import {postData} from '../services/POST request';

function forms(modalTimer) {
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
                    showThanksModal(message.success);
                }).catch(() => {
                    showThanksModal(message.failure);
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

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        modalOn('.modal', modalTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                            <div data-close class="modal__close">&times;</div>
                            <div class="modal__title">${message}</div>
                    </div>
                `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalOff('.modal');
        }, 4000);

    } 

}

export default forms;