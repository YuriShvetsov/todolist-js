// Model for class List

const ListModel = {

    init: function(data, deleteAction) {
        this.id = data.id;
        this.name = data.name.trim();
        this.tasks = data.tasks;

        this.deleteAction = deleteAction;
    },

    deleteSelf: function() {
        this.deleteAction(this.id);
    },

    setName: function(name) {
        this.name = name.trim();
    },

    addTask: function(task) {

    },

    deleteTask: function(id) {

    },

    // Получение данных

    getId: function() {
        return this.id;
    },

    getName: function() {
        return this.name;  
    },

    getTasks: function() {
        return this.tasks;
    },

};

export default ListModel;
