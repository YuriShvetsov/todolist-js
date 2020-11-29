export default {

    init: function(data) {
        this.id = data.id;
        this.date = data.date;
        this.done = data.done;
        this.name = data.name;
        this.notes = data.notes;
    },

    // Получение данных

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

    // Изменение данных

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
