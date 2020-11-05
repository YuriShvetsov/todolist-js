import TaskModel from './task/model';
import TaskView from './task/view';
import TaskController from './task/controller';

class Task {

    constructor(props) {
        this.data = props.data;
        this.delete = props.delete;
        this.taskContainer = props.taskContainer;

        this.model = Object.assign({}, TaskModel);
        this.view = Object.assign({}, TaskView);
        this.controller = Object.assign({}, TaskController);

        this.model.init(this.data);
        this.view.init(this.taskContainer);
        this.controller.init(this.model, this.view, this.delete);
    }

    get id() {
        return this.model.getId();
    }

    get date() {
        return this.model.getDate();
    }

    get done() {
        return this.model.isDone();
    }

    get name() {
        return this.model.getName();
    }

    get notes() {
        return this.model.getNotes();
    }

};

export default Task;
