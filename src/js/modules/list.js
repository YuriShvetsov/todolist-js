import ListModel from './list/model';
import ListView from './list/view';
import ListController from './list/controller';

class List {

    constructor(props) {
        this.data = props.data;
        this.delete = props.delete;

        this.btnContainer = props.btnContainer;
        this.pageContainer = props.pageContainer;

        this.model = Object.assign({}, ListModel);
        this.view = Object.assign({}, ListView);
        this.controller = Object.assign({}, ListController);

        this.model.init(this.data, this.delete);
        this.view.init(this.btnContainer, this.pageContainer);
        this.controller.init(this.model, this.view);
    }

    get id() {
        return this.model.getId();
    }

    get name() {
        return this.model.getName();
    }

    get tasks() {
        return this.model.getTasks();
    }

    get createdTasksNum() {}

    get completedTasksNum() {}

};

export default List;
