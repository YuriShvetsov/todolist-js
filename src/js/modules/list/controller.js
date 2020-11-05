import Modal from '../modal';
import Task from '../task';

// Controller for class List

const ListController = {

    init: function(model, view) {
        this.model = model;
        this.view = view;

        this.popup = {
            isActive: false,
            btn: null,
        };

        this.tasks = [];

        this.initBtn();
        this.initObjects();
        this.initBtnEventHandlers();
        this.initPageEventHandlers();
    },

    initBtn: function() {
        const name = this.model.getName();
        const tasks = this.model.getTasks();

        this.view.updateBtnName(name);
        this.view.updateBtnCounter(tasks.length);
        this.view.createBtn();
    },

    initObjects: function() {
        this.initTasks();
    },

    initTasks: function() {
        const data = this.model.getTasks();
        const taskContainer = this.view.getTaskContainer();

        data.forEach(task => {
            this.tasks.push(
                new Task({
                    data: task,
                    delete: this.deleteTask.bind(this),
                    taskContainer: taskContainer
                })
            );
        });

        if (this.tasks.length > 0) {
            this.view.hideCaptionEmptyList();
        }
    },

    // Обработка событий

    initBtnEventHandlers: function() {
        const btn = this.view.getBtn();

        btn.addEventListener('click', this.handleClickOnBtn.bind(this));
    },

    initPageEventHandlers: function() {
        const page = this.view.getPage();

        page.addEventListener('click', this.handleClickOnPage.bind(this));
    },

    handleClickOnBtn: function(event) {
        const action = event.target.dataset.action;

        if (!action || !this.userActions[action]) return;

        this.userActions[action].call(this, event);
    },

    handleClickOnPage: function(event) {
        this.checkActivePopup(event.target);

        const action = event.target.dataset.action;

        if (!action || !this.userActions[action]) return;

        this.userActions[action].call(this, event);
    },

    removeBtnEventHandlers: function() {
        const btn = this.view.getBtn();

        btn.removeEventListener('click', this.handleClickOnBtn.bind(this));
    },

    removePageEventHandlers: function() {
        const page = this.view.getPage();

        page.removeEventListener('click', this.handleClickOnPage.bind(this));
    },

    // Основные методы

    createTask: function(data) {
        console.log('create task');
    },

    deleteTask: function(id) {
        console.log('delete task');
    },

    renameList: function(data) {
        this.model.setName(data.name);

        const newName = this.model.getName();

        this.view.updatePageTitle(newName);
        this.view.updateBtnName(newName);
    },

    deleteList: function(allowed=false) {
        if (allowed) {
            this.removeBtnEventHandlers();
            this.removePageEventHandlers();

            this.view.removeBtn();
            this.view.removePage();

            this.model.deleteSelf();
        }
    },

    userActions: {

        openList: function() {
            const name = this.model.getName();
            const tasks = this.model.getTasks();

            this.view.updatePageTitle(name);
            this.view.updatePageTasksCounter(tasks.length);
            this.view.createPage();
        },

        closeList: function() {
            this.view.removePage();
        },

        openEditListModal: function() {
            const modal = new Modal({
                id: 'edit-list',
                targetId: 'app',
                data: {
                    name: this.model.getName()
                },
                success: this.renameList.bind(this),
                failure: null
            });

            modal.open();
        },

        openDeleteListModal: function() {
            const modal = new Modal({
                id: 'delete-list',
                targetId: 'app',
                data: null,
                success: this.deleteList.bind(this),
                failure: null
            });

            modal.open();
        },

        openCreateTaskModal: function() {
            const modal = new Modal({
                id: 'create-task',
                targetId: 'app',
                data: null,
                success: this.createTask.bind(this),
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
        if (this.popup.isActive && el != this.popup.btn) {
            this.userActions.togglePopup.call(this);
        }
    }

};

export default ListController;
