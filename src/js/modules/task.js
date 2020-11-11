import TaskModel from './task/model';
import TaskView from './task/view';
import TaskController from './task/controller';

class Task {

    constructor(props) {
        this.data = props.data;
        this.taskContainer = props.taskContainer;

        this.report = props.report;
        this.deleteSelf = props.deleteSelf;

        this.model = Object.assign({}, TaskModel);
        this.view = Object.assign({}, TaskView);
        this.controller = Object.assign({}, TaskController);

        this.model.init(this.data);
        this.view.init(this.taskContainer);
        this.controller.init(this.model, this.view, this.report, this.delete);
    }

    get id() {
        return this.model.getId();
    }

    get allData() {
        return {
            id: this.model.getId(),
            date: this.model.getDate(),
            done: this.model.isDone(),
            name: this.model.getName(),
            notes: this.model.getNotes()
        };
    }

};

export default Task;
