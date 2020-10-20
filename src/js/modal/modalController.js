const ModalController = {

    init: function(props) {
        this.model = props.model;
        this.view = props.view;
        this.success = props.success;
        this.failure = props.failure;
        this.type = props.type;

        this.handleEvents();
        this.model.setType(this.type);

        this.resultIsReceived = false;
    },

    handleEvents: function() {
        this.view.element.addEventListener('click', this.handleClick.bind(this));
    },

    handleClick: function(event) {
        event.preventDefault();

        const action = event.target.dataset.action;

        if (!action || !this.userActions[action]) return;

        this.userActions[action].call(this);
    },

    userActions: {

        getResult: function() {
            if (this.resultIsReceived) return;

            const result = this.view.getData();

            if (result === null) return;

            this.model.setData(this.view.getData());
            this.success(this.model.getData());
            this.resultIsReceived = true;

            this.view.close();
        },

        cancel: function() {
            this.view.close();
        }

    }

};

export default ModalController;
