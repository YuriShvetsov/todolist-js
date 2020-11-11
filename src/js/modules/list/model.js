// Model for class List

const ListModel = {

    init: function(data) {
        this.id = data.id;
        this.name = data.name.trim();
        this.tasks = data.tasks;
    },

    genTaskId: function() {
        const ids = this.tasks.map(task => task.id);
        let id;

        while (true) {
            id = 'task-' + Math.random().toString(36).substr(2, 8);
            if (!ids.includes(id)) break;
        }

        return id;
    },

    updateName: function(name) {
        this.name = name.trim();
        console.log(`list > modal > имя списка обновлено`);
    },

    addTask: function(task) {
        this.tasks.push(task);
        console.log(`list > modal > задача с id "${ task.id }" добавлена`);
    },

    deleteTask: function(id) {
        const index = this.tasks.findIndex(task => task.id === data.id);

        this.tasks.splice(index, 1);
        console.log(`list > modal > задача с id "${ task.id }" удалена`);
    },

    updateTask: function(data) {
        const index = this.tasks.findIndex(task => task.id === data.id);

        this.tasks[index] = data;
        console.log(`list > model > задача с id "${ data.id }" обновлена`);
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

    getCreatedTasksNum: function() {
        return this.tasks.length;
    },

    getCompletedTasksNum: function() {
        return this.tasks.reduce((sum, task) => {
            if (task.done) {
                return sum + 1;
            }

            return sum;
        }, 0);
    }

};

export default ListModel;
