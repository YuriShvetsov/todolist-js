import ListModel from './list/model';
import ListView from './list/view';
import ListController from './list/controller';

export default class List {

    constructor(props) {
        this.data = props.data;
        this.btnContainer = props.btnContainer;
        this.appContainer = props.appContainer;
        this.listIds = props.listIds;

        this.model = Object.assign({}, ListModel);
        this.view = Object.assign({}, ListView);
        this.controller = Object.assign({}, ListController);

        this.init();
    }

    init() {
        this.model.init(this.data, this.listIds);
        this.view.init(this.btnContainer, this.appContainer);
        this.controller.init(this.model, this.view);
    }

    open() {
        this.controller.openList();
    }

    get id() {
        return this.model.getId();
    }

};