const ListView = {

    init: function(btnContainer, appContainer) {
        this.btnContainer = btnContainer;
        this.appContainer = appContainer;

        this.page = null;
        this.btn = null;
        this.popup = {
            btn: null,
            el: null
        };
        this.pageTitle = null;
        this.taskCounter = null;
        this.taskContainer = null;
    },

    initPageElements: function() {
        this.menu = this.page.querySelector('.js-list-page-menu');
    },
    
    addListBtn: function(listId, name, count) {
        const template = document.getElementById('list-button');
        const copy = document.importNode(template.content, true).children[0];

        const listName = copy.querySelector('.js-list-button-name');
        const taskCount = copy.querySelector('.js-list-button-counter');

        listName.innerHTML = name;
        taskCount.innerHTML = count;

        copy.setAttribute('list-id', listId);
        this.btnContainer.append(copy);

        const btnList = this.btnContainer.querySelectorAll('.js-list-button');

        this.btn = Array.from(btnList).find(btn => btn.getAttribute('list-id') == listId);
    },

    removeListBtn: function(listId) {
        const listButtons = this.btnContainer.querySelectorAll('.js-list-button');
        const listButton = listButtons.find(button => button.getAttribute('list-id') == listId);

        listButton.remove();
    },

    showPage: function(data) {
        const template = document.getElementById('list-page');
        const copy = document.importNode(template.content, true).children[0];

        this.pageTitle = copy.querySelector('.js-list-page-name');

        this.pageTitle.innerHTML = data.name;
        this.appContainer.append(copy);

        this.page = this.appContainer.querySelector('.js-list-page');
        this.page.classList.add('page_visible');

        this.initPageElements();
    },

    updatePageTitle: function(title) {
        this.pageTitle.innerHTML = title;
    },

    updateListBtn: function(name) {
        const btnName = this.btn.querySelector('.js-list-button-name');
        btnName.innerHTML = name;
    },
    
    hidePage: function() {
        this.page.remove();
    },

    showPopup: function(popupBtn) {
        this.popup.btn = popupBtn;
        this.popup.el = popupBtn.nextElementSibling;

        this.popup.el.classList.add('popup_visible');
    },

    hidePopup: function() {
        this.popup.el.classList.remove('popup_visible');

        this.popup.btn = null;
        this.popup.el = null;
    }

};

export default ListView;
