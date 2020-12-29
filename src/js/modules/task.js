import TaskModel from './task/model';
import TaskView from './task/view';
import TaskController from './task/controller';

class Task {

    constructor(props) {
        this.data = props.data;
        this.taskContainer = props.taskContainer;
        this.subscribe = props.subscribe;

        this.model = Object.assign({}, TaskModel);
        this.view = Object.assign({}, TaskView);
        this.controller = Object.assign({}, TaskController);

        this.model.init(this.data);
        this.view.init(this.taskContainer);
        this.controller.init(this.model, this.view, this.subscribe);
    }

    get id() {
        return this.model.getId();
    }

    get done() {
        return this.model.isDone();
    }

    getData() {
        return {
            id: this.model.getId(),
            date: this.model.getDate(),
            done: this.model.isDone(),
            name: this.model.getName(),
            notes: this.model.getNotes()
        };
    }

    delete() {
        this.controller.deleteTask();
    }

    showUpperPointer() {
        this.view.showUpperPointer();
    }

    showLowerPointer() {
        this.view.showLowerPointer();
    }

    hidePointer() {
        this.view.hidePointer();
    }

    select() {
        this.view.select();
    }

    unselect() {
        this.view.unselect();
    }

};

export default Task;
