import Modal from '../modal';

export default {

    init(model, view, subscribe) {
        this.model = model;
        this.view = view;
        this.subscribe = subscribe;

        this.initUI();
        this.initEventHandlers();
    },

    initUI: function() {
        const id = this.model.getId();
        const done = this.model.isDone();
        const name = this.model.getName();
        const notes = this.model.getNotes();

        this.view.setIdForContainer(id);
        this.view.setIdForDoneCheckbox(id);

        this.view.updateDoneCheckbox(done);
        this.view.updateName(name);
        this.view.updateNotes(notes);

        this.view.create();
    },

    initEventHandlers: function() {
        const container = this.view.getElement('container');

        container.addEventListener('click', this.handleClick.bind(this));
    },

    handleClick: function(event) {
        const action = event.target.dataset.action;

        if (!action || !this.actions[action]) return;

        this.actions[action].call(this, event);
    },

    removeEventHandlers: function() {
        const container = this.view.getTaskElement('container');

        container.removeEventListener('click', this.handleClickOnBtn.bind(this));
    },

    // Основные методы

    updateTask: function(data) {
        this.model.setName(data.name);
        this.model.setNotes(data.notes);

        this.view.updateName(this.model.getName());
        this.view.updateNotes(this.model.getNotes());

        this.subscribe.update(this.model.getId());
    },

    deleteTask: function() {
        this.actions.deleteTask.apply(this);
    },

    actions: {

        toggleTaskDone: function() {
            this.model.toggleDone();
            this.subscribe.update(this.model.getId());
        },

        openEditTaskModal: function() {
            const modal = new Modal({
                id: 'edit-task',
                targetId: 'app',
                data: {
                    name: this.model.getName(),
                    notes: this.model.getNotes()
                },
                success: this.updateTask.bind(this),
                failure: null
            }); 

            modal.open();
        },

        deleteTask: function() {
            this.view.remove();
            this.subscribe.delete(this.model.getId());
        }
    }

};
