export default {

    init: function(data) {
        this.id = data.id;
        this.name = data.name.trim();
        this.tasks = data.tasks;
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

    generateTaskId: function() {
        const ids = this.tasks.map(task => task.id);
        let id;

        while (true) {
            id = 'task-' + Math.random().toString(36).substr(2, 8);
            if (!ids.includes(id)) break;
        }

        return id;
    },

    taskPlacedBeforeTask: function(firstTaskId, secondTaskId) {
        const firstTaskIndex = this.tasks.findIndex(task => task.id == firstTaskId);
        const secondTaskIndex = this.tasks.findIndex(task => task.id == secondTaskId);

        return (firstTaskIndex < secondTaskIndex);
    },

    // Изменение данных

    updateName: function(name) {
        this.name = name.trim();
    },

    addTask: function(task) {
        this.tasks.push(task);
    },

    deleteTask: function(id) {
        this.tasks = this.tasks.filter(task => task.id != id);
    },

    updateTask: function(id, data) {
        const index = this.tasks.findIndex(task => task.id === id);

        this.tasks[index] = data;
    },

    replaceTask: function(firstTaskId, secondTaskId) {
        const firstTask = this.tasks.find(task => task.id == firstTaskId);
        const newTaskList = [];
        const firstPlacedBefore = this.taskPlacedBeforeTask(firstTaskId, secondTaskId);

        if (firstPlacedBefore) {
            this.tasks.forEach(task => {
                if (task.id != firstTaskId) {
                    newTaskList.push(task);
                }
    
                if (task.id == secondTaskId) {
                    newTaskList.push(firstTask);
                }
            });
        } else {
            this.tasks.forEach(task => {
                if (task.id == secondTaskId) {
                    newTaskList.push(firstTask);
                }

                if (task.id != firstTaskId) {
                    newTaskList.push(task);
                }
            });
        }

        this.tasks = newTaskList;
    }

};
