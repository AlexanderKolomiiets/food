require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal, { modalOn } from './modules/modal';
import forms from'./modules/forms';
import classes from './modules/classes';
import slider from './modules/slider';
import calc from './modules/calc';
 
document.addEventListener('DOMContentLoaded', () => {

    const modalTimer = setTimeout(() => modalOn('.modal', modalTimer), 15000); // функцию modalOn нужно превращать в стрелочную, потому что в ней есть аргументы

    tabs({
        tabsSelector : '.tabheader__item',
        tabsContentSelector : '.tabcontent',
        tabsParentSelector : '.tabheader__items',
        activeClass : 'tabheader__item_active'
    });
    timer('.timer', '2022-11-11');
    modal('.modal', '[data-modal]', modalTimer);
    forms(modalTimer);
    classes();
    slider({
        container : '.offer__slider',
        slide : '.offer__slide',
        nextArrow : '.offer__slider-next',
        prevArrow : '.offer__slider-prev',
        totalCounter : '#total',
        currentCounter : '#current',
        wrapper : '.offer__slider-wrapper',
        field : '.offer__slider-inner'
    });
    calc();

});








