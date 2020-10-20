export default class Modal {

    constructor(props) {
        this.id = props.id;
        this.type = props.type;
        this.targetId = props.targetId;
        this.data = props.data;
        this.success = props.success;
        this.failure = props.failure;

        this.model = this.initModel(this.data);
        this.view = this.initView({
            id: this.id,
            targetId: this.targetId,
            data: this.data,
            type: this.type
        });
        this.controller = this.initController({
            model: this.model,
            view: this.view,
            success: this.success,
            failure: this.failure,
            type: this.type // string: consent, form
        });

        // this.init();
    }

    initModel(data) {
        const model = {

            init: function(data) {
                this.data = data;
                this.type = null;
                this.element = null;
            },
        
            setType: function(type) {
                this.type = type;
            },
        
            setElement: function(element) {
                this.element = element;
            },
        
            setData: function(newData) {
                this.data = newData;
            },
        
            getData: function() {
                switch (this.type) {
                    case 'consent':
                        return true;
                    case 'form':
                        return this.data;
                }
            },
        
        };

        model.init(data);

        return model;
    }

    initView(props) {

    }

    initController(props) {

    }

};
