const ListModel = {

    init: function(data, listIds) {
        this.data = data;
        this.listIds = listIds;

        this.initTaskList();
    },

    initTaskList: function() {
        const listId = this.generateListId();

        if (this.data.taskList === undefined) {
            this.data.taskList = [];
            this.data.id = listId;
            return;
        }

    },

    generateListId: function() {
        let id;

        while (true) {
            id = 'list-' + Math.random().toString(36).substr(2, 8);

            if (!this.listIds.includes(id)) break;
        }

        return id;
    },

    getId: function() {
        return this.data.id;
    },

    getData: function() {
        return this.data;
    },

    setListName: function(name) {
        this.data.name = name;
    },

    getTaskList: function() {

    },

    getTaskCount: function() {
        return this.data.taskList.length;
    }

};

export default ListModel;
