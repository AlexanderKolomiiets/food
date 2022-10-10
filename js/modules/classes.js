import {getResource} from '../services/GET request';

function classes() {
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

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price,
    //             parentSelector
    //         }) => {
    //             new Menu(img, altimg, title, descr, price, parentSelector).render();
    //         });
    //     });

    new Menu("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', "Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 10, ".menu .container").render(); //класса menu__item нету   

    new Menu("img/tabs/elite.jpg", "elite", 'Меню "Премиум"', "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 20, ".menu .container", 'menu__item').render();

    new Menu("img/tabs/post.jpg", "post", 'Меню "Постное"', "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 15, ".menu .container", 'menu__item').render();


}

export default classes;