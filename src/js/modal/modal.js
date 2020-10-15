import ModalModel from './modalModel';
import ModalView from './modalView';
import ModalController from './modalController';

export default class Modal {

    constructor(id, type, targetId, data=null) { // type: confirm, form
        this.id = id;
        this.type = type;
        this.targetId = targetId;

        this.model = ModalModel;
        this.view = ModalView;
        this.controller = ModalController;

        this.init();
    }

    init() {
        this.model.init(this.data);
        this.view.init(this.id, this.targetId);
        this.controller.init(this.model, this.view);
    }

};
