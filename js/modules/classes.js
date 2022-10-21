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
            <div class="menu__item-cost">Ціна:</div>
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

    new Menu("img/tabs/vegy.jpg", "vegy", 'Меню "Фітнес"', "Меню “Фітнес”  - це новий підхід до приготування страв: більше свіжих овочів та фруктів. Продукт активних та здорових людей. Це абсолютно новий продукт з оптимальною ціною та високою якістю!", 10, ".menu .container").render(); //класса menu__item нету   

    new Menu("img/tabs/elite.jpg", "elite", 'Меню "Преміум"', "У меню “Преміум” ми використовуємо не лише гарний дизайн упаковки, але й якісне виконання страв. Червона риба, морепродукти, фрукти – ресторанне меню без походу до ресторану!", 20, ".menu .container", 'menu__item').render();

    new Menu("img/tabs/post.jpg", "post", 'Меню "Пісне"', "Меню “Пісне” - це ретельний підбір інгредієнтів: повна відсутність продуктів тваринного походження, молоко з мигдалю, вівса, кокосу чи гречки, правильна кількість білків за рахунок тофу та імпортних вегетаріанських стейків.", 15, ".menu .container", 'menu__item').render();


}

export default classes;