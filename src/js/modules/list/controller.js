import Modal from '../modal';
import Task from '../task';

export default {

    init: function(model, view, subscribe) {
        this.model = model;
        this.view = view;
        this.subscribe = subscribe;

        this.tasks = [];
        this.isOpened = false;

        this.initBtn();
        this.initTasks();
        this.initBtnEventHandlers();
        this.initPageEventHandlers();
    },

    initBtn: function() {
        const name = this.model.getName();
        const tasks = this.model.getTasks();

        this.view.updateBtnName(name);
        this.view.updateBtnCounter(tasks.length);

        this.view.updatePageTitle(name);
        this.view.createBtn();
    },

    initTasks: function() {
        const data = this.model.getTasks();
        const taskContainer = this.view.getTaskContainer();

        data.forEach(item => {
            this.tasks.push(
                new Task({
                    data: item,
                    taskContainer: taskContainer,
                    subscribe: {
                        update: this.updateTask.bind(this),
                        delete: this.deleteTask.bind(this)
                    }
                })
            );
        });
    },

    // Обработка событий

    initBtnEventHandlers: function() {
        const btn = this.view.getBtn();

        btn.addEventListener('click', this.handleClickOnBtn.bind(this));
    },

    initPageEventHandlers: function() {
        const page = this.view.getPage();
        page.addEventListener('click', this.handleClickOnPage.bind(this));

        this.resizeHandler = this.throttle(this.resizeHandler, 100);
        window.addEventListener('resize', this.resizeHandler.bind(this));
    },

    handleClickOnBtn: function(event) {
        const action = event.target.dataset.action;

        if (!action || !this.actions[action]) return;

        this.actions[action].call(this, event);
    },

    handleClickOnPage: function(event) {
        const action = event.target.dataset.action;

        if (!action || !this.actions[action]) return;

        this.actions[action].call(this, event);
    },

    resizeHandler: function(event) {
        this.view.setSizeTaskContainer();
    },

    removeBtnEventHandlers: function() {
        const btn = this.view.getBtn();

        btn.removeEventListener('click', this.handleClickOnBtn.bind(this));
    },

    removePageEventHandlers: function() {
        const page = this.view.getPage();

        page.removeEventListener('click', this.handleClickOnPage.bind(this));
        window.removeEventListener('resize', this.resizeHandler.bind(this));
    },

    // Основные методы

    addTask: function(data) {
        const taskContainer = this.view.getTaskContainer();
        const taskData = {
            id: this.model.generateTaskId(),
            date: new Date(),
            done: false,
            name: data.name,
            notes: data.notes
        };

        this.tasks.push(
            new Task({
                data: taskData,
                taskContainer: taskContainer,
                subscribe: {
                    update: this.updateTask.bind(this),
                    delete: this.deleteTask.bind(this)
                }
            })
        );

        this.model.addTask(taskData);
        this.subscribe.update(this.model.getId());

        const tasksCount = this.model.getTasks().length;

        this.view.updateBtnCounter(tasksCount);
    },

    updateTask: function(id) {
        const task = this.tasks.find(task => task.id == id);
        const taskData = task.getData();

        this.model.updateTask(id, taskData);

        this.subscribe.update(this.model.getId());

        this.activateListClearing();
    },

    deleteTask: function(id) {
        this.tasks = this.tasks.filter(task => task.id != id);
        this.model.deleteTask(id);

        const tasksCount = this.model.getTasks().length;
        this.view.updateBtnCounter(tasksCount);

        const listId = this.model.getId();
        this.subscribe.update(listId);

        this.activateListClearing();
    },

    openList: function() {
        if (this.isOpened) return;

        this.view.activateBtn();
        this.view.createPage();

        this.activateListClearing();

        this.isOpened = true;
    },

    closeList: function() {
        this.view.unactivateBtn();
        this.view.removePage();

        this.isOpened = false;
    },

    renameList: function(data) {
        this.model.updateName(data.name);

        const newName = this.model.getName();

        this.view.updatePageTitle(newName);
        this.view.updateBtnName(newName);

        this.subscribe.update(this.model.getId());
    },

    deleteList: function(allowed=false) {
        if (allowed) {
            const id = this.model.getId();

            this.removeBtnEventHandlers();
            this.removePageEventHandlers();

            this.view.removeBtn();
            this.view.removePage();

            this.subscribe.delete(id);
        }
    },

    actions: {

        openPage: function() {
            if (this.isOpened) return;

            const id = this.model.getId();

            this.subscribe.open(id);

            this.view.activateBtn();
            this.view.createPage();

            this.activateListClearing();

            this.isOpened = true;
        },

        closePage: function() {
            this.subscribe.close();

            this.view.unactivateBtn();
            this.view.removePage();

            this.isOpened = false;
        },

        openRenameListModal: function() {
            const modal = new Modal({
                id: 'rename-list',
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
                success: this.addTask.bind(this),
                failure: null
            });

            modal.open();
        },

        clearList: function() {
            this.tasks.forEach(task => {
                if (task.done) {
                    task.delete();
                }
            });
        }

    },

    // Вспомогательные функции

    activateListClearing: function() {
        if (this.tasks.find(task => task.done)) {
            this.view.activateClearBtn();
        } else {
            this.view.unactivateClearBtn();
        }
    },

    throttle: function(func, ms) {
        let isThrottled = false;
        let savedThis;
        let savedArgs;
    
        function wrapper() {
            if (isThrottled) {
                savedThis = this;
                savedArgs = arguments;
                return;
            }
            
            func.apply(this, arguments);

            isThrottled = true;
    
            setTimeout(() => {
                isThrottled = false;
    
                if (savedThis) {
                    wrapper.apply(savedThis, savedArgs);
                    savedThis = savedArgs = null;
                }
            }, ms);
        }
    
        return wrapper;
    }

};
