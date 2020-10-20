import Modal from './modal';
import List from './list/list';

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

        init: function() {
            // this.readAppData();
        },

        readAppData: function() {

        },

        writeAppData: function() {

        },

        getNumCreatedTasks: function() {

        },

        getNumCompletedTasks: function() {

        },

        addList: function(list) {
            this.state.taskLists.push(list);
        },

        removeList: function(listId) {

        },

        findList: function(listId) {
            return this.state.taskLists.find(list => list.id == listId);
        },

        getListIds: function() {
            return this.state.taskLists.map(list => list.id);
        }

    },

    view: {

        appElement: null,
        appContainer: null,
        elements: {},

        init: function(element) {
            this.appElement = element;
            this.initElements();
        },

        initElements: function() {
            // App container
            this.elements.appContainer = this.appElement.querySelector('.js-app-container');

            // Current date
            this.elements.currentDateWeekday = this.appElement.querySelector('.js-current-date-weekday');
            this.elements.currentDateDay = this.appElement.querySelector('.js-current-date-day');
            this.elements.currentDateMonth = this.appElement.querySelector('.js-current-date-month');

            // Counters
            this.elements.counterCreatedTasks = this.appElement.querySelector('.js-counter-created-tasks');
            this.elements.counterCompletedTasks = this.appElement.querySelector('.js-counter-completed-tasks');

            // Lists container
            this.elements.listContainer = this.appElement.querySelector('.js-lists-container');
        },

        getAppContainer: function() {
            return this.elements.appContainer;
        },

        getListBtnContainer: function() {
            return this.elements.listContainer;
        },

        renderCurrentDate: function() {
            const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const currentDate = new Date();

            const weekday = currentDate.getDay();
            const day = currentDate.getDate();
            const month = currentDate.getMonth();

            let endingForDay = '';

            if (+day.toString().slice(-1) === 0) {
                endingForDay = 'th';
            } else if (+day.toString().slice(-1) === 1) {
                endingForDay = 'st';
            } else if (+day.toString().slice(-1) === 2) {
                endingForDay = 'nd';
            } else if (+day.toString().slice(-1) === 3) {
                endingForDay = 'rd';
            } else if (+day.toString().slice(-1) === 4) {
                endingForDay = 'th';
            } else if (+day.toString().slice(-1) > 4 && +day.toString().slice(-1) < 10) {
                endingForDay = 'th';
            } else if (day > 10 && day < 21) {
                endingForDay = 'th';
            }

            this.elements.currentDateWeekday.innerHTML = weekdayNames[weekday];
            this.elements.currentDateDay.innerHTML = day + endingForDay;
            this.elements.currentDateMonth.innerHTML = monthNames[month];
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
            this.view.appElement.addEventListener('click', this.handleClick.bind(this));
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
            const appContainer = this.view.getAppContainer();
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
                    type: 'form',
                    data: null,
                    success: this.createList.bind(this),
                    failure: null
                });
            },

            openList: function(event) {
                const listId = event.target.getAttribute('list-id');
                const list = this.model.findList(listId);

                list.open();
            }

        }

    }

};

app.init();
