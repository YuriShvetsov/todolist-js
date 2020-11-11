import Modal from './modules/modal';
import List from './modules/list';
import CurrentDate from './modules/curdate';

const app = {

    init: function() {
        this.view.init();
        this.controller.init(this.model, this.view)
    },

    model: {},

    view: {

        init: function() {
            this.initElements();
            this.setSizeBtnList();
        },

        initElements: function() {
            const app = document.getElementById('app');

            this.elements = {
                sectionMain: app.querySelector('.js-section-main'),
                header: app.querySelector('.js-header'),
                btnList: app.querySelector('.js-btn-list'),
                btnListBar: app.querySelector('.js-btn-list-bar'),
                btnListInsert: app.querySelector('.js-btn-list-insert'),
                btnListEmpty: app.querySelector('.js-btn-list-empty')
            };
        },

        setSizeBtnList: function() {
            const sectionMainHeight = this.elements.sectionMain.getBoundingClientRect().height;
            const headerHeight = this.elements.header.getBoundingClientRect().height;
            const btnListBarHeight = this.elements.btnListBar.getBoundingClientRect().height;

            this.elements.btnListInsert.style.height = sectionMainHeight - (headerHeight + btnListBarHeight) - 40 + 'px';

            console.log({
                main: sectionMainHeight,
                header: headerHeight,
                btnListBar: btnListBarHeight,
                btnListInsert: sectionMainHeight - (headerHeight + btnListBarHeight) - 54
            });
        },

        showBtnListEmpty: function() {
            this.elements.btnListEmpty.classList.remove('btn-list__empty_hidden');
        },

        hideBtnListEmpty: function() {
            this.elements.btnListEmpty.classList.add('btn-list__empty_hidden');
        }

    },

    controller: {

        init: function(model, view) {
            this.model = model;
            this.view = view;

            this.initHadlers();
        },

        initHadlers: function() {
            window.addEventListener('resize', event => {
                this.view.setSizeBtnList();
            });
        }

    }

};

app.init();














// const app = {

//     init: function() {
//         this.model.init();
//         this.view.init();
//         this.controller.init(this.model, this.view);
//     },

//     model: {

//         init: function() {
//             this.lists = this.read();
//         },

//         read: function() {
//             return [
//                 {
//                     id: 'list-id-1',
//                     name: 'main',
//                     tasks: [
//                         {
//                             id: 'task-id-1',
//                             date: new Date,
//                             done: false,
//                             name: 'task 1',
//                             notes: ''
//                         }
//                     ]
//                 }
                
//             ];
//         },

//         write: function() {},

//         addList: function(list) {
//             this.lists.push({
//                 id: list.id,
//                 name: list.name,
//                 tasks: list.tasks
//             });

//             this.write();
//         },

//         deleteList: function(id) {
//             this.lists = this.lists.filter(item => item.id != id);
//             console.log(this.lists.length);
//             this.write();
//         },

//         getLists: function() {
//             return this.lists;
//         },

//         genListId: function() {
//             const ids = this.lists.map(list => list.id);
//             let id;
    
//             while (true) {
//                 id = 'list-' + Math.random().toString(36).substr(2, 8);
//                 if (!ids.includes(id)) break;
//             }
    
//             return id;
//         }

//     },

//     view: {

//         init: function() {
//             this.elements = this.initElements();
//         },

//         initElements: function() {
//             const app = document.getElementById('app');
//             const elements = {};

//             elements.pageContainer = app.querySelector('.js-page-container');
    
//             elements.startPage = app.querySelector('.js-start-page')
//             elements.dateContainer = app.querySelector('.js-date-container');
//             elements.createdTasksCounter = app.querySelector('.js-created-tasks');
//             elements.completedTasksCounter = app.querySelector('.js-completed-tasks');
//             elements.listBtnContainer = app.querySelector('.js-list-btn-container');
//             elements.captionEmptyList = app.querySelector('.js-caption-empty-list');

//             return elements;
//         },

//         getElement: function(name) {
//             if (!this.elements[name]) throw new Error(`Element "${name}" is not found!`);

//             return this.elements[name];
//         },

//         // Изменение состояния DOM

//         updateCreatedTasksCounter: function(value) {
//             const counter = this.getElement('createdTasksCounter');

//             counter.innerHTML = value;
//         },

//         updateCompletedTasksCounter: function(value) {
//             const counter = this.getElement('completedTasksCounter');

//             counter.innerHTML = value;
//         },

//         showCaptionEmptyList: function() {
//             this.elements.captionEmptyList.classList.remove('start-page__caption-nothing_hidden');
//         },

//         hideCaptionEmptyList: function() {
//             this.elements.captionEmptyList.classList.add('start-page__caption-nothing_hidden');
//         },

//     },

//     controller: {

//         init: function(model, view) {
//             this.model = model;
//             this.view = view;

//             this.lists = [];

//             this.initCurrentDate();
//             this.initLists();
//             this.initEventHandlers();
//         },

//         initCurrentDate: function() {
//             const dateContainer = this.view.getElement('dateContainer');
//             const curDate = new CurrentDate(dateContainer);

//             curDate.render();
//             // console.log(`app > controller > текущая дата инициализирована`);
//         },

//         initLists: function() {
//             const data = this.model.getLists();
//             const btnContainer = this.view.getElement('listBtnContainer');
//             const pageContainer = this.view.getElement('pageContainer');

//             data.forEach(item => {
//                 this.lists.push(
//                     new List({
//                         data: item,
//                         deleteSelf: this.deleteList.bind(this),
//                         btnContainer: btnContainer,
//                         pageContainer: pageContainer
//                     })
//                 );
//             });

//             this.updateCounters();

//             if (this.lists.length > 0) this.view.hideCaptionEmptyList();
//             // console.log(`app > controller > списки инициализированы`);
//         },

//         // Обработка событий

//         initEventHandlers: function() {
//             const startPage = this.view.getElement('startPage');

//             startPage.addEventListener('click', this.handleClick.bind(this));
//         },

//         handleClick: function(event) {
//             const action = event.target.dataset.action;

//             if (!action || !this.userActions[action]) return;

//             this.userActions[action].call(this, event);
//         },

//         // Основные методы

//         updateCounters: function() {
//             if (this.lists.length == 0) {
//                 this.view.updateCreatedTasksCounter(0);
//                 this.view.updateCompletedTasksCounter(0);
//                 return;
//             }

//             const createdTasksNum = this.lists.reduce((sum, list) => sum + list.length, 0);
//             const completedTasksNum = this.lists.reduce((sum, list) => sum + list.completedTasksNum, 0);

//             this.view.updateCreatedTasksCounter(createdTasksNum);
//             this.view.updateCompletedTasksCounter(completedTasksNum);

//             // console.log(`app > controller > счетчики обновлены`);
//         },

//         createList: function(data) {
//             this.lists.push(
//                 new List({
//                     data: {
//                         id: this.model.genListId(),
//                         name: data.name,
//                         tasks: []
//                     },
//                     deleteSelf: this.deleteList.bind(this),
//                     btnContainer: this.view.getElement('listBtnContainer'),
//                     pageContainer: this.view.getElement('pageContainer'),
//                 })
//             );
//             this.model.addList(this.lists[this.lists.length - 1]);

//             this.view.hideCaptionEmptyList();
//             // console.log(`app > controller > создан новый список "${ data.name }"`);
//         },

//         deleteList: function(id) {
//             this.model.deleteList(id);
//             this.lists = this.lists.filter(item => item.id != id);

//             if (this.lists.length == 0) this.view.showCaptionEmptyList();
//             // console.log(`app > controller > удален список "${ id }"`);
//         },

//         // Действия пользователя

//         userActions: {

//             openCreateListModal: function() {
//                 const modal = new Modal({
//                     id: 'create-list',
//                     targetId: 'app',
//                     data: null,
//                     success: this.createList.bind(this),
//                     failure: null
//                 });

//                 modal.open();
//                 // console.log('app > controller > создать новый список');
//             }

//         }

//     }

// };

// app.init();
