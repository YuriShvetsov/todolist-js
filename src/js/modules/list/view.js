export default {

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
        page.header = page.container.querySelector('.js-header');
        page.controls = page.container.querySelector('.js-controls');
        page.title = page.container.querySelector('.js-title');
        page.taskContainer = page.container.querySelector('.js-task-insert');
        page.clearBtn = page.container.querySelector('.js-clear-btn');

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
        this.setSizeTaskContainer();
    },

    removePage: function() {
        this.page.container.classList.remove('page_visible');
        this.page.container.remove();
    },

    activateClearBtn: function() {
        this.page.clearBtn.classList.remove('button_state_unactive');
    },

    unactivateClearBtn: function() {
        this.page.clearBtn.classList.add('button_state_unactive');
    },

    setSizeTaskContainer: function() {
        this.hideTaskContainer();

        this.page.taskContainer.style.height = '0';
        setTimeout(resize.bind(this), 100);

        function resize() {
            const pageHeight = this.pageContainer.getBoundingClientRect().height;
            const headerHeight = this.page.header.getBoundingClientRect().height;
            const controlsHeight = this.page.controls.getBoundingClientRect().height;
            const taskContainerHeight = pageHeight - headerHeight - controlsHeight;
    
            this.page.taskContainer.style.height = taskContainerHeight + 'px';

            this.showTaskContainer();
        }
    },

    showTaskContainer: function() {
        this.page.taskContainer.classList.remove('list__body_hidden');
        this.page.taskContainer.classList.add('list__body_visible');
    },

    hideTaskContainer: function() {
        this.page.taskContainer.classList.remove('list__body_visible');
        this.page.taskContainer.classList.add('list__body_hidden');
    },

    clearTaskList: function() {
        this.page.taskContainer.innerHTML = '';
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
