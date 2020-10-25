import Modal from './modules/modal';
import List from './modules/list';
import CurrentDate from './modules/curdate';

const app = {

    element: document.getElementById('app'),

    init: function() {
        this.model.init();
        this.view.init(this.element);
        this.controller.init(this.model, this.view);
    },

    model: {

        state: {
            taskLists: []
        },

        init: function() {},

        readData: function() {},

        writeData: function() {},

        getCountCreatedTasks: function() {},

        getCountCompletedTasks: function() {},

        addList: function(list) {
            this.state.taskLists.push(list);
        },

        removeList: function(listId) {
            const index = this.state.taskLists.findIndex(list => list.id === listId);

            this.state.taskLists.splice(index);
        },

        findList: function(listId) {
            return this.state.taskLists.find(list => list.id === listId);
        },

        getListIds: function() {
            return this.state.taskLists.map(list => list.id);
        }

    },

    view: {

        elements: {},

        init: function(appElement) {
            this.elements.app = appElement;
            this.initElements();

            this.currentDate = new CurrentDate(this.elements.insetDate); // инициализировать в контроллере
        },

        initElements: function() {
            // App container
            this.elements.appContainer = this.elements.app.querySelector('.js-app-container');

            // Inset date
            this.elements.insetDate = this.elements.app.querySelector('.js-inset-date');

            // Counters
            this.elements.counterCreatedTasks = this.elements.app.querySelector('.js-counter-created-tasks');
            this.elements.counterCompletedTasks = this.elements.app.querySelector('.js-counter-completed-tasks');

            // List button container
            this.elements.listContainer = this.elements.app.querySelector('.js-list-btn-container');
        },

        getElements: function() {
            return this.elements;
        },

        getListBtnContainer: function() {
            return this.elements.listContainer;
        },

        renderCurrentDate: function() {
            this.currentDate.update();
            this.currentDate.render();
        },

        renderTaskCounters: function(nums) {
            this.elements.counterCreatedTasks.innerHTML = nums.createdTasks;
            this.elements.counterCompletedTasks.innerHTML = nums.completedTasks;
        }

    },

    controller: {

        state: {},

        init: function(model, view) {
            this.model = model;
            this.view = view;

            this.handleEvents();
            this.readAppData();
            this.updateCounters();
            this.updateCurrentDate();
        },

        handleEvents: function() {
            this.view.getElements().app.addEventListener('click', this.handleClick.bind(this));
        },

        handleClick: function(event) {
            const action = event.target.dataset.action;

            if (!action || !this.userActions[action]) return;

            this.userActions[action].call(this, event);
        },

        updateCurrentDate: function() {
            this.view.renderCurrentDate();
        },

        readAppData: function() {

        },

        updateCounters: function() {

        },

        createList: function(data) {
            const appContainer = this.view.getElements().container;
            const btnContainer = this.view.getListBtnContainer();
            const listIds = this.model.getListIds();

            const list = new List({
                data,
                appContainer,
                btnContainer,
                listIds
            });

            this.model.addList(list);
        },

        userActions: {

            openCreateListModal: function() {
                const modal = new Modal({
                    id: 'create-list',
                    targetId: 'app',
                    type: 'form-data',
                    data: null,
                    success: this.createList.bind(this),
                    failure: null
                });

                modal.open();
            },

            openList: function(event) {
                const listId = event.target.getAttribute('list-id');
                const list = this.model.findList(listId);

                list.open();
            }

        }

    }

};

window.onload = app.init();
