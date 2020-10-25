import modalModel from './modal/model';
import modalView from './modal/view';
import modalController from './modal/controller';

export default class Modal {

    constructor(props) {
        this.id = props.id;
        this.type = props.type || 'default';
        this.targetId = props.targetId;
        this.data = props.data;
        this.success = props.success;
        this.failure = props.failure;

        this.model = Object.assign({}, modalModel);
        this.view = Object.assign({}, modalView);
        this.controller = Object.assign({}, modalController);

        this.init();
    }

    init() {
        this.model.init(this.data);

        this.view.init({
            id: this.id,
            targetId: this.targetId,
            formData: this.model.getData(),
            type: this.type
        });

        this.controller.init({
            model: this.model,
            view: this.view,
            success: this.success,
            failure: this.failure
        });
    }

    open() {
        this.view.show();
    }

};
