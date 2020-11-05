// Model for class task

const TaskModel = {

    init: function(data) {
        this.id = data.id;
        this.date = data.date;

        this.done = data.done;
        this.name = data.name;
        this.notes = data.notes;
    },

    getId: function() {},

    getDate: function() {},

    isDone: function() {},

    getName: function() {
        return this.name;
    },

    getNotes: function() {
        return this.notes;
    },

    

    toggleDone: function() {},

    setName: function(value) {
        this.name = value.trim();
    },

    setNotes: function(value) {
        this.notes = value.trim();
    }

};

export default TaskModel;
