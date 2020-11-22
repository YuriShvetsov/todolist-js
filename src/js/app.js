import Modal from './modules/modal';
import List from './modules/list';
import CurrentDate from './modules/curdate';

const app = {
    init: function() {
        this.model.init();
        this.view.init();
        this.controller.init(this.model, this.view);
    },

    model: {

        init: function() {
            this.data = this.read();
        },

        // Чтение и запись данных в ls

        read: function() {
            const data = JSON.parse(localStorage.getItem('todolist')) || {
                activeListId: null,
                lists: []
            };

            return data;
        },

        write: function() {
            localStorage.setItem('todolist', JSON.stringify(this.data));
        },

        // Работа со списками

        getLists: function() {
            return this.data.lists;
        },

        addList: function(list) {
            this.data.lists.push(list);
            this.write();
        },

        updateList: function(id, data) {
            const index = this.data.lists.findIndex(list => list.id == id);
            this.data.lists[index] = data;
            this.write();
        },

        deleteList: function(id) {
            const index = this.data.lists.findIndex(list => list.id == id);

            this.data.lists.splice(index, 1);

            if (id == this.data.activeListId) this.resetActiveListId();
            
            this.write();
        },

        // Активный список

        setActiveListId: function(id) {
            this.data.activeListId = id;
            this.write();
        },

        getActiveListId: function() {
            return this.data.activeListId;
        },

        resetActiveListId: function() {
            if (this.data.lists.length == 0) {
                this.data.activeListId = null;
                return;
            }

            const lastList = this.data.lists[this.data.lists.length - 1];

            this.data.activeListId = lastList.id;
        },

        // Прочие функции

        generateListId: function() {
            const ids = this.data.lists.map(list => list.id);
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
            this.elements = {};
            this.popup = {
                container: null
            };

            this.initElements();
            this.setSizeBtnList();
        },

        initElements: function() {
            const app = document.getElementById('app');

            this.elements.dateInsert = app.querySelector('.js-date-insert');
            this.elements.listBtnInsert = app.querySelector('.js-list-btn-insert');
            this.elements.listInsert = app.querySelector('.js-list-insert');

            this.elements.side = app.querySelector('.js-side');
            this.elements.sideHeader = app.querySelector('.js-side-header');
        },

        getElement: function(el) {
            if (!this.elements[el]) throw new Error(`Element '${ el }' is not found`);
            
            return this.elements[el];
        },

        setSizeBtnList: function() {
            this.elements.listBtnInsert.style.height = 0 + 'px';

            const sideHeight = this.elements.side.getBoundingClientRect().height;
            const sideHeaderHeight = this.elements.sideHeader.getBoundingClientRect().height;

            this.elements.listBtnInsert.style.height = sideHeight - sideHeaderHeight + 'px';
        },

        showPopup: function(btn) {
            this.popup.container = btn.nextElementSibling;
            this.popup.container.classList.add('popup_visible');
        },
    
        hidePopup: function() {
            const closedPopup = Object.assign({}, this.popup);

            closedPopup.container.classList.add('popup_hidden');

            setTimeout(() => {
                closedPopup.container.classList.remove('popup_visible');
                closedPopup.container.classList.remove('popup_hidden');
            }, 200);
        },

    },

    controller: {

        init: function(model, view) {
            this.model = model;
            this.view = view;

            this.lists = [];
            this.popup = {
                isActive: false,
                btn: null,
            };

            this.initHandlers();
            this.initCurDate();
            this.initLists();
        },

        initHandlers: function() {
            const app = document.getElementById('app');

            app.addEventListener('click', this.clickHandler.bind(this));
            window.addEventListener('resize', this.resizeHandler.bind(this));
        },

        clickHandler: function(event) {
            this.checkActivePopup(event.target);

            const action = event.target.dataset.action;

            if (!action || !this.actions[action]) return;

            this.actions[action].call(this, event);
        },

        resizeHandler: function(event) {
            this.view.setSizeBtnList();
        },

        // Основные методы

        initCurDate: function() {
            const dateInsert = this.view.getElement('dateInsert');
            const curDate = new CurrentDate(dateInsert);

            curDate.render();
        },

        initLists: function() {
            this.model.getLists().forEach(data => {
                let list = new List({
                    data: data,
                    subscribe: {
                        open: this.openList.bind(this),
                        close: this.closeList.bind(this),
                        update: this.updateList.bind(this),
                        delete: this.deleteList.bind(this)
                    },
                    btnContainer: this.view.getElement('listBtnInsert'),
                    pageContainer: this.view.getElement('listInsert')
                });

                this.lists.push(list);
            });

            this.openActiveList();
        },

        createList: function(data) {
            const id = this.model.generateListId();
            const list = new List({
                data: {
                    id: id,
                    name: data.name,
                    tasks: []
                },
                subscribe: {
                    open: this.openList.bind(this),
                    close: this.closeList.bind(this),
                    update: this.updateList.bind(this),
                    delete: this.deleteList.bind(this)
                },
                btnContainer: this.view.getElement('listBtnInsert'),
                pageContainer: this.view.getElement('listInsert')
            });
            const listData = {
                id: list.id,
                name: list.name,
                tasks: list.tasks
            };

            this.lists.push(list);
            this.model.addList(listData);

            this.closeActiveList();
            this.model.setActiveListId(id);
            this.openActiveList();
        },

        // Методы, вызываемые при изменении списка

        openList: function(id) {
            this.closeActiveList();
            this.model.setActiveListId(id);
        },

        closeList: function() {
            this.closeActiveList();
            this.model.setActiveListId(null);
        },

        openActiveList: function() {
            const id = this.model.getActiveListId();

            if (!id) return;

            const list = this.lists.find(list => list.id == id);

            list.open();
        },

        closeActiveList: function() {
            const id = this.model.getActiveListId();

            if (!id) return;

            const list = this.lists.find(list => list.id == id);

            list.close();
        },

        updateList: function(id) {
            const list = this.lists.find(list => list.id == id);

            this.model.updateList(id, {
                id: list.id,
                name: list.name,
                tasks: list.tasks
            });
        },

        deleteList: function(id) {
            const index = this.lists.findIndex(list => list.id == id);

            this.lists.splice(index, 1);
            this.model.deleteList(id);

            this.openActiveList();
        },

        actions: {

            openCreateListModal: function() {
                const modal = new Modal({
                    id: 'create-list',
                    targetId: 'app',
                    data: null,
                    success: this.createList.bind(this),
                    failure: null
                });

                modal.open();
            },

            togglePopup: function(event) {
                if (this.popup.isActive) {
                    this.view.hidePopup();
                    this.popup.btn = null;
                } else {
                    this.popup.btn = event.target;
                    this.view.showPopup(this.popup.btn);
                }
    
                this.popup.isActive = !this.popup.isActive;
            }

        },

        // Другие методы

        checkActivePopup: function(el) {
            if (this.popup.isActive && this.popup.btn != el) {
                this.view.hidePopup();
                this.popup.btn = null;
                this.popup.isActive = false;
            }
        }

    }
};

app.init();
