export default {

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
        this.task.upperPointer = this.task.container.querySelector('.js-upper-pointer');
        this.task.lowerPointer = this.task.container.querySelector('.js-lower-pointer');
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

    setIdForContainer: function(id) {
        this.task.container.dataset.taskid = id;
    },

    setIdForDoneCheckbox: function(id) {
        this.task.doneCheckbox.setAttribute('id', id);
        this.task.doneLabel.setAttribute('for', id);
    },

    // Обновление элементов DOM

    updateDoneCheckbox: function(value) {
        this.task.doneCheckbox.checked = value;
    },

    updateName: function(value) {
        this.task.name.innerHTML = value;
    },

    updateNotes: function(value) {
        this.task.notes.innerHTML = value;
    },

    showUpperPointer: function() {
        this.task.upperPointer.classList.add('task__upper-pointer_visible');
    },

    showLowerPointer: function() {
        this.task.lowerPointer.classList.add('task__lower-pointer_visible');
    },

    hidePointer: function() {
        this.task.upperPointer.classList.remove('task__upper-pointer_visible');
        this.task.lowerPointer.classList.remove('task__lower-pointer_visible');
    },

    select: function() {
        this.task.container.classList.add('task_selected');
    },

    unselect: function() {
        this.task.container.classList.remove('task_selected');
    }

};
