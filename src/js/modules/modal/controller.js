export default {

    init: function(props) {
        // Входные параметры
        this.model = props.model;
        this.view = props.view;

        this.success = props.success;
        this.failure = props.failure;

        // Окно закрыто
        this.isClosed = false;

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

        if (!this.userActions[action]) throw Error('Error at init of user action');

        this.userActions[action].call(this);
    },

    removeHandlers: function() {
        const modal = this.view.getModal();

        modal.blur();
        modal.removeEventListener('click', this.handleClick.bind(this));
    },

    // Действия пользователя

    userActions: {

        // Передача данных формы
        send: function() {
            if (this.isClosed) return;
            if (!this.success) throw Error('Success function is not defined!');

            const formData = this.view.getFormData();

            if (!formData) return;

            this.model.setData(formData);

            const data = this.model.getData();
            this.success(data);

            this.removeHandlers.call(this);
            this.view.hide();
            this.isClosed = true;
        },

        // Отмена передачи данных формы
        cancel: function() {
            if (this.isClosed) return;

            this.removeHandlers.call(this);
            this.view.hide();
            this.isClosed = true;
        },

        // Передача утвердительного ответа
        accept: function() {
            if (this.isClosed) return;
            if (!this.success) throw Error('Success function is not defined!');

            const positiveAnswer = this.model.getPositiveAnswer();
            this.success(positiveAnswer);

            this.removeHandlers.call(this);
            this.view.hide();
            this.isClosed = true;
        },

        // Передача отрицательного ответа
        decline: function() {
            if (this.isClosed) return;
            if (!this.failure) throw Error('Failure function is not defined!');

            const negativeAnswer = this.model.getNegativeAnswer();
            this.failure(negativeAnswer);

            this.removeHandlers.call(this);
            this.view.hide();
            this.isClosed = true;
        }

    }

};
