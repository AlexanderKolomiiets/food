function tabs({tabsSelector, tabsContentSelector, tabsParentSelector, activeClass}) {
    //   TABS

    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);


    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });

    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    hideTabsContent();
    showTabContent();

    // i = 0  // нужно чтобы поставить дефолтное значение

    // 2 решения

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {

            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });

        }

    });

    tabs.forEach((item, i) => {
        item.addEventListener('click', () => {
            hideTabsContent();
            showTabContent(i);
        });
    });
}

export default tabs;   // пример дефолтного експорта

// let one = 1;
// export {one};

// export default нужен для експорта только одного выражения