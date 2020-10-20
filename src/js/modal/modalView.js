const ModalView = {

    init: function(props) {
        this.id = props.id;
        this.targetId = props.targetId;
        this.data = props.data;
        this.type = props.type;

        this.element = null;
        this.form = null;

        this.inputTypes = ['text', 'textarea', 'radio'];

        this.open();
    },

    getElement: function() {
        return this.element;
    },

    open: function() {
        const template = document.getElementById(this.id);
        const copy = document.importNode(template.content, true);
        const target = document.getElementById(this.targetId);

        target.append(copy);

        this.element = target.querySelector('.js-modal');
        this.element.classList.add('modal_visible');

        if (this.type == 'consent') return;

        if (this.type == 'form') {
            this.fillForm();
            this.focusAtFirstInput();
            return;
        }
    },

    close: function() {
        this.element.classList.add('modal_hidden');

        setTimeout(() => {
            this.element.remove();
        }, 200);
    },

    fillForm: function() {
        this.form = this.element.querySelector('.js-modal-form');

        if (!this.data) return;
        
        Array.from(this.form.elements).forEach(el => {
            if (!this.inputTypes.includes(el.type)) return;
            if (!this.data[el.name]) return;

            el.value = this.data[el.name];
        });
    },

    focusAtFirstInput: function() {
        let firstInputIsFocused = false;

        Array.from(this.form.elements).forEach((el, index) => {
            if (!this.inputTypes.includes(el.type)) return;
            if (firstInputIsFocused) return;

            el.focus();
            firstInputIsFocused = true;
        });
    },

    getData: function() {
        let formIsFilled = true;

        switch (this.type) {
            case 'consent':
                return true;
            case 'form':
                this.data = {};

                Array.from(this.form.elements).forEach(el => {
                    if (!this.inputTypes.includes(el.type)) return;

                    if  (!this.fieldIsValid(el)) {
                        formIsFilled = false;
                    }

                    this.data[el.name] = el.value;
                });

                if (formIsFilled) {
                    return this.data;
                } else {
                    return null;
                }
        }
    },

    fieldIsValid: function(el) {
        if (el.hasAttribute('important')) {
            return (el.value.length > 0);
        } else {
            return true;
        }
    }

};

export default ModalView;
