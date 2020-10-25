// Controller for class Modal

const controller = {

    init: function(props) {
        // Входные параметры
        this.model = props.model;
        this.view = props.view;
        this.success = props.success;
        this.failure = props.failure;

        // Инициализация
        this.handleEvents();
    },

    // Обработка событий

    handleEvents: function() {
        const modal = this.view.getModal();

        modal.addEventListener('click', this.handleClick.bind(this));
    },

    handleClick: function(event) {
        event.preventDefault();

        const action = event.target.dataset.action;

        if (action === undefined) return;

        if (!this.userActions[action]) {
            throw Error('Error at init of user action');
        }

        this.userActions[action].call(this);
    },

    // Действия пользователя

    userActions: {

        result: function() {
            console.log('result');
        },
         
        cancel: function() {
            this.view.hide();
        }

    }

};

export default controller;