export default {

    init: function(props) {
        // Входные параметры
        this.id = props.id;
        this.targetId = props.targetId;
        this.formData = props.formData;

        // Элементы DOM
        this.elements = {};
        this.initElements();
    },

    initElements: function() {
        const template = document.getElementById(this.id);
        const target = document.getElementById(this.targetId);

        this.elements.modal = document.importNode(template.content, true).children[0];
        this.elements.container = this.elements.modal.querySelector('.js-container');
        this.elements.form = this.elements.modal.querySelector('.js-form');
        this.elements.overlay = this.elements.modal.querySelector('.js-overlay');
        this.elements.formInputs = this.getFormInputs();

        target.append(this.elements.modal);
    },

    // Изменение состояние элементов

    show: function() {
        this.showContainer();
        this.showOverlay();

        if (this.elements.formInputs.length > 0) {
            this.fillForm();
            this.focusForm();
        }
    },

    hide: function() {
        this.hideContainer();
        this.hideOverlay();

        setTimeout(() => {
            this.elements.modal.remove();
            this.elements = {};
        }, 200);
    },

    showContainer: function() {
        this.elements.container.classList.add('modal__container_visible');
    },

    hideContainer: function() {
        this.elements.container.classList.add('modal__container_hidden');
    },

    showOverlay: function() {
        this.elements.overlay.classList.add('modal__overlay_visible');
    },

    hideOverlay: function() {
        this.elements.overlay.classList.add('modal__overlay_hidden');
    },

    showInputWarn: function(input) {
        input.parentElement.classList.add('modal__label_warning');
    },

    hideInputWarn: function(input) {
        input.parentElement.classList.remove('modal__label_warning');
    },

    // Получение данных из формы

    getFormData: function() {
        if (!this.formIsFilled()) return null;

        const formData = {};

        this.elements.formInputs.forEach(input => {
            let name = input.getAttribute('name');
            let value = formData[input.getAttribute('name')] = input.value;

            formData[name] = value;
        });

        return formData;
    },

    formIsFilled: function() {
        let isFilled = true;
        let notFilledInputs = [];

        this.elements.formInputs.forEach(input => {
            let value = input.value;
            let isImportant = input.hasAttribute('important');

            if (value.length === 0 && isImportant) {
                isFilled = false;
                this.showInputWarn(input);
                notFilledInputs.push(input);
            } else {
                this.hideInputWarn(input);
            }
        });

        if (!isFilled) {
            notFilledInputs[0].focus();
        }

        return isFilled;
    },

    // Получение элементов DOM

    getModal: function() {
        return this.elements.modal;
    },

    getFormInputs: function() {
        const formElements = Array.from(this.elements.form.elements);
        const formInputs = [];

        formElements.forEach(el => {
            const type = el.getAttribute('type');
            if (['submit', 'button'].includes(type)) return;

            formInputs.push(el);
        });

        return formInputs;
    },

    // Работа с формой

    fillForm: function() {
        if (!this.formData) return;

        this.elements.formInputs.forEach(input => {
            const attrName = input.getAttribute('name');
            if (!attrName || !this.formData[attrName]) return;

            input.value = this.formData[attrName];
        });
    },

    focusForm: function() {
        this.elements.formInputs[0].focus();
    }

};
