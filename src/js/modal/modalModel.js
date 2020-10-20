const ModalModel = {

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

export default ModalModel;
