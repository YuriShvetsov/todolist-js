import Modal from '../modal';

// Controller for class Task

const TaskController = {

    init(model, view, report, deleteSelf) {
        this.model = model;
        this.view = view;

        this.report = report;
        this.deleteSelf = deleteSelf;

        this.initUI();
        this.initEventHandlers();
    },

    initEventHandlers: function() {
        const container = this.view.getTaskElement('container');

        container.addEventListener('click', this.handleClick.bind(this));
    },

    handleClick: function(event) {
        const action = event.target.dataset.action;

        if (!action || !this.userActions[action]) return;

        this.userActions[action].call(this, event);
    },

    removeEventHandlers: function() {
        const container = this.view.getTaskElement('container');

        container.removeEventListener('click', this.handleClickOnBtn.bind(this));
    },

    // Основные методы

    initUI: function() {
        const id = this.model.getId();
        const done = this.model.isDone();
        const name = this.model.getName();
        const notes = this.model.getNotes();

        this.view.setIdForDoneCheckbox(id);

        this.view.updateDoneCheckbox(done);
        this.view.updateName(name);
        this.view.updateNotes(notes);

        this.view.create();
    },

    reportAboutChanges: function() {
        
    },

    updateTask: function(data) {
        this.model.setName(data.name);
        this.model.setNotes(data.notes);

        this.view.updateName(this.model.getName());
        this.view.updateNotes(this.model.getNotes());

        this.report(this.model.getId());
    },

    userActions: {

        toggleDoneTask: function() {
            this.model.toggleDone();
            this.report(this.model.getId());
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
            console.log('delete task');
        }

    }

};

export default TaskController;
