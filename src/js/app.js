// import { List } from './list';
// import { Task } from './task';

const app = {

    container: document.getElementById('app'),

    init: function() {
        this.model.init();
        this.view.init(this.container);
        this.controller.init(this.model, this.view);
    },

    model: {

        state: {
            appData: {
                taskLists: [
                    {
                        name: 'main',
                        items: [
                            {
                                name: 'купить продукты',
                                notes: 'сметана, молоко, хлеб'
                            },
                            {
                                name: 'покормить кота',
                                notes: null
                            }
                        ]
                    }
                ]
            }
        },

        init: function() {
            this.readAppData();
        },

        readAppData: function() {

        },

        writeAppData: function() {

        }

    },

    view: {

        appContainer: null,
        elements: {},

        init: function(appContainer) {
            this.appContainer = appContainer;
            this.initElements();
        },

        initElements: function() {
            // Current date
            this.elements.currentDateWeekday = this.appContainer.querySelector('.js-current-date-weekday');
            this.elements.currentDateDay = this.appContainer.querySelector('.js-current-date-day');
            this.elements.currentDateMonth = this.appContainer.querySelector('.js-current-date-month');

            // App info (counters)
            this.elements.counterCreatedTasks = this.appContainer.querySelector('.js-counter-created-tasks');
            this.elements.counterCompletedTasks = this.appContainer.querySelector('.js-counter-completed-tasks');

            // List container
            this.elements.listContainer = this.appContainer.querySelector('.js-list-container');
        },

        renderCurrentDate: function() {
            const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const currentDate = new Date();

            const weekday = currentDate.getDay();
            const day = currentDate.getDate();
            const month = currentDate.getMonth();

            let endingForDay = '';

            if (day > 10 && day < 21) {
                endingForDay = 'th';
            } else if (+day.toString().slice(-1) > 4 && +day.toString().slice(-1) < 10) {
                endingForDay = 'th';
            } else if (+day.toString().slice(-1) === 0) {
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
            }

            this.elements.currentDateWeekday.innerHTML = weekdayNames[weekday];
            this.elements.currentDateDay.innerHTML = day + endingForDay;
            this.elements.currentDateMonth.innerHTML = monthNames[month];
        },

        renderAppInfo: function(info) { // info - object

        },

        renderListButtons: function(lists) { // lists - list of lists

        }

    },

    controller: {

        state: {
            modal: null,
        },

        init: function(model, view) {
            this.model = model;
            this.view = view;

            this.handleEvents();
            this.updateCurrentDate();
            this.readAppData();
            this.updateAppInfo();
            this.updateListButtons();
        },

        handleEvents: function() {

        },

        updateCurrentDate: function() {
            this.view.renderCurrentDate();
        },

        readAppData: function() {

        },

        updateAppInfo: function() {

        },

        updateListButtons: function() {

        },

        userAcrtions: {

            openCreateListModal: function() {

            },

            openList: function(listId) {

            }

        }
    }

};

app.init();