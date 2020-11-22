// View for class Task

const TaskView = {

    init: function(taskContainer) {
        this.taskContainer = taskContainer;
        this.task = {};

        this.initElements();
    },

    initElements: function() {
        const taskTemplate = document.getElementById('task');

        this.task.container = document.importNode(taskTemplate.content, true).children[0];
        this.task.doneCheckbox = this.task.container.querySelector('.js-done');
        this.task.doneLabel = this.task.container.querySelector('.js-done-label');
        this.task.name = this.task.container.querySelector('.js-name');
        this.task.notes = this.task.container.querySelector('.js-notes');
    },

    getElement: function(name) {
        if (!this.task[name]) throw new Error(`Element "${ name }" is not found!`);

        return this.task[name];
    },

    create: function() {
        this.taskContainer.append(this.task.container);
    },

    remove: function() {
        this.task.container.remove();
    },

    setIdForDoneCheckbox: function(id) {
        this.task.doneCheckbox.setAttribute('id', id);
        this.task.doneLabel.setAttribute('for', id);
    },



    updateDoneCheckbox: function(value) {
        this.task.doneCheckbox.checked = value;
    },

    updateName: function(value) {
        this.task.name.innerHTML = value;
    },

    updateNotes: function(value) {
        this.task.notes.innerHTML = value;
    }

};

export default TaskView;
