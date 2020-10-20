import ModalModel from './modalModel';
import ModalView from './modalView';
import ModalController from './modalController';

export default class Modal {

    constructor(props) {
        this.id = props.id;
        this.type = props.type;
        this.targetId = props.targetId;
        this.data = props.data;
        this.success = props.success;
        this.failure = props.failure;

        this.model = Object.assign({}, ModalModel);
        this.view = Object.assign({}, ModalView);
        this.controller = Object.assign({}, ModalController);

        this.init();
    }

    init() {
        this.model.init(this.id, this.data);
        this.view.init({
            id: this.id,
            targetId: this.targetId,
            data: this.data,
            type: this.type
        });
        this.controller.init({
            model: this.model,
            view: this.view,
            success: this.success,
            failure: this.failure,
            type: this.type // string: consent, form
        });
    }

};
