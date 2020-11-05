import Modal from './modules/modal';
import List from './modules/list';
import CurrentDate from './modules/curdate';

/* Application TODOLIST

1. Инициализация (app)
    а) чтение данных (model.read),
    б) инициализация DOM (view.init),
    в) инициализация объектов (controller.initAppObjects),
    г) инициализация обработчиков событий (controller.initEventHandlers),
    д) отрисовка DOM на основе полученных данных (controller.renderDOM)

2. Обработка событий
    а) изменение объектов app,
    б) запись данных (model.write),
    в) отрисовка DOM на основе измененных данных

*/

const app = {

    init: function() {
        this.model.init();
        this.view.init();
        this.controller.init(this.model, this.view);
    },

    model: {

        init: function() {
            this.lists = this.read();
        },

        read: function() {
            return [
                {
                    id: 'list-id',
                    name: 'list-name',
                    tasks: [
                        {
                            id: 'task-id',
                            date: new Date,
                            done: false,
                            name: 'task name',
                            notes: 'task notes'
                        }
                    ]
                }
            ];
        },

        write: function() {},

        addList: function(list) {
            this.lists.push({
                id: list.id,
                name: list.name,
                tasks: list.tasks
            });

            this.write();
        },

        deleteList: function(id) {
            this.lists = this.lists.filter(item => item.id != id);

            this.write();
        },

        getLists: function() {
            return this.lists;
        },

        genListId: function() {
            const ids = this.lists.map(list => list.id);
            let id;
    
            while (true) {
                id = 'list-' + Math.random().toString(36).substr(2, 8);
                if (!ids.includes(id)) break;
            }
    
            return id;
        }

    },

    view: {

        init: function() {
            this.elements = this.initElements();
        },

        initElements: function() {
            const app = document.getElementById('app');
            const elements = {};

            elements.pageContainer = app.querySelector('.js-page-container');
    
            elements.startPage = app.querySelector('.js-start-page')
            elements.dateContainer = app.querySelector('.js-date-container');
            elements.createdTasksCounter = app.querySelector('.js-created-tasks');
            elements.completedTasksCounter = app.querySelector('.js-completed-tasks');
            elements.listBtnContainer = app.querySelector('.js-list-btn-container');
            elements.captionEmptyList = app.querySelector('.js-caption-empty-list');

            return elements;
        },

        getElement: function(name) {
            if (!this.elements[name]) throw new Error(`Element "${name}" is not found!`);

            return this.elements[name];
        },

        // Изменение состояния DOM

        renderCreatedTasksCounter: function(value) {
            const counter = this.getElement('createdTasksCounter');

            counter.innerHTML = value;
        },

        renderCompletedTasksCounter: function(value) {
            const counter = this.getElement('completedTasksCounter');

            counter.innerHTML = value;
        },

        showCaptionEmptyList: function() {
            this.elements.captionEmptyList.classList.remove('start-page__caption-nothing_hidden');
        },

        hideCaptionEmptyList: function() {
            this.elements.captionEmptyList.classList.add('start-page__caption-nothing_hidden');
        },

    },

    controller: {

        init: function(model, view) {
            this.model = model;
            this.view = view;

            this.lists = [];

            this.initObjects();
            this.renderDOM();
            this.initEventHandlers();
        },

        initObjects: function() {
            this.initCurrentDate();
            this.initLists();
        },

        initCurrentDate: function() {
            const dateContainer = this.view.getElement('dateContainer');
            const curDate = new CurrentDate(dateContainer);

            curDate.render();
        },

        initLists: function() {
            const data = this.model.getLists();
            const btnContainer = this.view.getElement('listBtnContainer');
            const pageContainer = this.view.getElement('pageContainer');

            data.forEach(item => {
                this.lists.push(
                    new List({
                        data: item,
                        delete: this.deleteList.bind(this),
                        btnContainer: btnContainer,
                        pageContainer: pageContainer
                    })
                );
            });

            if (this.lists.length > 0) this.view.hideCaptionEmptyList();
        },

        // Обработка событий

        initEventHandlers: function() {
            const startPage = this.view.getElement('startPage');

            startPage.addEventListener('click', this.handleClick.bind(this));
        },

        handleClick: function(event) {
            const action = event.target.dataset.action;

            if (!action || !this.userActions[action]) return;

            this.userActions[action].call(this, event);
        },

        // Основные методы

        renderDOM: function() {
            this.updateCounters();
        },

        updateCounters: function() {},

        createList: function(inputData) {
            const data = Object.assign({}, inputData);

            data.id = this.model.genListId();
            data.tasks = [];

            this.lists.push(
                new List({
                    data: data,
                    delete: this.deleteList.bind(this),
                    btnContainer: this.view.getElement('listBtnContainer'),
                    pageContainer: this.view.getElement('pageContainer'),
                })
            );
            this.model.addList(this.lists[this.lists.length - 1]);

            this.view.hideCaptionEmptyList();
        },

        deleteList: function(id) {
            this.model.deleteList(id);
            this.lists = this.lists.filter(item => item.id != id);

            if (this.lists.length == 0) this.view.showCaptionEmptyList();
        },

        // Действия пользователя

        userActions: {

            openCreateListModal: function() {
                const modal = new Modal({
                    id: 'create-list',
                    targetId: 'app',
                    data: null,
                    success: this.createList.bind(this),
                    failure: null
                });

                modal.open();
            }

        }

    }

};

app.init();
