// Model for class task

const TaskModel = {

    init: function(data) {
        this.id = data.id;
        this.date = data.date;
        this.done = data.done;
        this.name = data.name;
        this.notes = data.notes;
    },

    getId: function() {
        return this.id;
    },

    getDate: function() {
        return this.date;
    },

    isDone: function() {
        return this.done;
    },

    getName: function() {
        return this.name;
    },

    getNotes: function() {
        return this.notes;
    },

    

    toggleDone: function() {
        this.done = !this.done;
    },

    setName: function(value) {
        this.name = value.trim();
    },

    setNotes: function(value) {
        this.notes = value.trim();
    }

};

export default TaskModel;
