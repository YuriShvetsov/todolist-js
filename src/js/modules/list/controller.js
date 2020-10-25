import Modal from '../modal';

const ListController = {

    init: function(model, view) {
        this.model = model;
        this.view = view;

        this.popup = {
            isActive: false,
            btn: null,
            hidingFunc: null
        };

        this.addListBtn();
        this.openList();
    },

    handleEvents: function() {
        this.view.page.addEventListener('click', this.handleClick.bind(this));
    },

    handleClick: function(event) {
        const action = event.target.dataset.action;

        if  (this.popup.isActive && this.popup.btn != event.target) this.hideActivePopup();

        if (!action || !this.userActions[action]) return;

        this.userActions[action].call(this, event);
    },

    addListBtn: function() {
        const id = this.model.getId();
        const listName = this.model.getData().name;
        const taskCount = this.model.getTaskCount();

        this.view.addListBtn(id, listName, taskCount);
    },

    openList: function() {
        const data = this.model.getData();

        this.view.showPage(data);
        this.handleEvents();
    },

    closeList: function() {
        this.view.hidePage();
    },

    hideActivePopup: function() {
        this.userActions.togglePopup.call(this);
    },

    renameList: function(data) {
        this.model.setListName(data.name);

        const listName = this.model.getData().name;

        this.view.updatePageTitle(listName);
        this.view.updateListBtn(listName);
    },

    userActions: {

        togglePopup: function(event) {
            if (this.popup.isActive) {
                this.view.hidePopup();
                this.popup.btn = null;
            } else {
                this.view.showPopup(event.target);
                this.popup.btn = this.view.popup.btn;
            }

            this.popup.isActive = !this.popup.isActive;
        },

        openEditListModal: function() {
            const successFunction = this.renameList.bind(this);
            const modal = new Modal({
                id: 'edit-list',
                targetId: 'app',
                type: 'form',
                data: {
                    name: this.model.getData().name
                },
                success: successFunction,
                failure: null
            });
        },

        openDeleteListModal: function() {

        },

        openCreateTaskModal: function() {
            const successFunction = null;
            const modal = new Modal({
                id: 'create-task',
                targetId: 'app',
                type: 'form',
                data: null,
                success: successFunction,
                failure: null
            });
        },

        openEditTaskModal: function() {

        },

        close: function() {
            this.closeList();
        }

    }

};

export default ListController;
