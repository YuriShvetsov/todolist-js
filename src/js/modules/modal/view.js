// View for class Modal

const view = {

    init: function(props) {
        // Входные параметры
        this.id = props.id;
        this.targetId = props.targetId;
        this.type = props.type;
        this.formData = props.formData;

        // Прочие свойства
        this.inputTypes = ['text', 'textarea', 'radio', 'checkbox'];

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

        if (this.type === 'form-data') {
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

    // Получение данных формы и элементов

    getData: function() {
        if (this.type === 'default') {
            return getDefaultData();
        } else if (this.type === 'form-data') {
            return getFormData();
        }
    },

    getDefaultPositiveResult: function() {
        return true;
    },
    
    getDefaultNegativeResult: function() {
        return false;
    },

    getFormData: function() {
        const formData = {};

        // ...
    },

    getModal: function() {
        return this.elements.modal;
    },

    getFormInputs: function() {
        const formElements = Array.from(this.elements.form.elements);
        const formInputs = [];

        formElements.forEach(el => {
            const type = el.getAttribute('type');
            if (!this.inputTypes.includes(type)) return;

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
    },
    
    formInputsIsValid: function() {
        // ...
    }

};

export default view;