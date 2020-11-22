// View for class List

const ListView = {

    init: function(btnContainer, pageContainer) {
        this.btnContainer = btnContainer;
        this.pageContainer = pageContainer;

        this.btn = this.initBtn();
        this.page = this.initPage();
    },

    initBtn: function() {
        const btnTemplate = document.getElementById('list-btn');
        const btn = {};

        btn.container = document.importNode(btnTemplate.content, true).children[0];
        btn.name = btn.container.querySelector('.js-name');
        btn.counter = btn.container.querySelector('.js-counter');

        return btn;
    },

    initPage: function() {
        const pageTemplate = document.getElementById('list-page');
        const page = {};

        page.container = document.importNode(pageTemplate.content, true).children[0];
        page.title = page.container.querySelector('.js-title');
        page.taskContainer = page.container.querySelector('.js-task-insert');

        return page;
    },

    // Получение элементов DOM

    getBtn: function() {
        return this.btn.container;
    },

    getPage: function() {
        return this.page.container;
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

    activateBtn: function() {
        this.btn.container.classList.add('list-btn_active');
    },

    unactivateBtn: function() {
        this.btn.container.classList.remove('list-btn_active');
    },

    createPage: function() {
        this.pageContainer.append(this.page.container);
        this.page.container.classList.add('page_visible');
    },

    removePage: function() {
        this.page.container.classList.remove('page_visible');
        this.page.container.remove();
    },

    // Изменение содержимого элементов

    updatePageTitle: function(value) {
        this.page.title.innerHTML = value;
    },

    updateBtnName: function(value) {
        this.btn.name.innerHTML = value;
    },

    updateBtnCounter: function(value) {
        this.btn.counter.innerHTML = value;
    },

};

export default ListView;
