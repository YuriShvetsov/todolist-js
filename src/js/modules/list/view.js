// View for class List

const ListView = {

    init: function(btnContainer, pageContainer) {
        this.btnContainer = btnContainer;
        this.pageContainer = pageContainer;

        this.popup = {
            container: null
        };

        this.btn = this.initBtn();
        this.page = this.initPage();
    },

    initBtn: function() {
        const btnTemplate = document.getElementById('list-button');
        const btn = {};

        btn.container = document.importNode(btnTemplate.content, true).children[0];
        btn.name = btn.container.querySelector('.js-name');
        btn.counter = btn.container.querySelector('.js-tasks');

        return btn;
    },

    initPage: function() {
        const pageTemplate = document.getElementById('list-page');
        const page = {};

        page.container = document.importNode(pageTemplate.content, true).children[0];
        page.title = page.container.querySelector('.js-page-title');
        page.tasksCounter = page.container.querySelector('.js-tasks-counter');
        page.taskContainer = page.container.querySelector('.js-task-container');
        page.captionEmptyList = page.container.querySelector('.js-caption-empty-list');

        return page;
    },

    // Получение элементов DOM

    getPage: function() {
        return this.page.container;
    },

    getBtn: function() {
        return this.btn.container;
    },

    getTaskContainer: function() {
        return this.page.taskContainer;
    },

    // Изменение состояния DOM элементов

    createBtn: function() {
        this.btnContainer.append(this.btn.container);
    },

    removeBtn: function() {
        this.btn.container.remove();
    },

    createPage: function() {
        this.pageContainer.append(this.page.container);
        this.page.container.classList.add('page_visible');
    },

    removePage: function() {
        this.page.container.classList.add('page_hidden');
        setTimeout(() => {
            this.page.container.classList.remove('page_visible');
            this.page.container.classList.remove('page_hidden');
            this.page.container.remove();
        }, 400);
    },

    showPopup: function(btn) {
        this.popup.container = btn.nextElementSibling;
        this.popup.container.classList.add('popup_visible');
    },

    hidePopup: function() {
        this.popup.container.classList.add('popup_hidden');
        setTimeout(() => {
            this.popup.container.classList.remove('popup_visible');
            this.popup.container.classList.remove('popup_hidden');
            this.popup.container = null;
        }, 200);
    },

    showCaptionEmptyList: function() {
        this.page.captionEmptyList.classList.remove('list-page__caption-nothing_hidden');
    },

    hideCaptionEmptyList: function() {
        this.page.captionEmptyList.classList.add('list-page__caption-nothing_hidden');
    },

    // Изменение содержимого элементов

    updatePageTitle: function(value) {
        this.page.title.innerHTML = value;
    },

    updatePageTasksCounter: function(value) {
        this.page.tasksCounter.innerHTML = value;
    },

    updateBtnName: function(value) {
        this.btn.name.innerHTML = value;
    },

    updateBtnCounter: function(value) {
        this.btn.counter.innerHTML = value;
    },

};

export default ListView;
