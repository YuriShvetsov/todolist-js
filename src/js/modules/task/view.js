// View for class Task

const TaskView = {

    init: function(taskContainer) {
        this.taskContainer = taskContainer;

        this.task = this.initTask();
    },

    initTask: function() {
        const taskTemplate = document.getElementById('task');
        const task = {};

        task.container = document.importNode(taskTemplate.content, true).children[0];
        task.doneCheckbox = task.container.querySelector('.js-done');
        task.doneLabel = task.container.querySelector('.js-done-label');
        task.name = task.container.querySelector('.js-name');
        task.notes = task.container.querySelector('.js-notes');
        task.editBtn = task.container.querySelector('.js-edit');
        task.deleteBtn = task.container.querySelector('.js-delete');

        return task;
    },

    getTaskElement: function(name) {
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
