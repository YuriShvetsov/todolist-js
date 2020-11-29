export default {

    init: function(data) {
        this.data = data;
    },

    setData: function(data) {
        this.data = data;
    },

    getData: function() {
        return this.data;
    },

    getPositiveAnswer: function() {
        return true;
    },

    getNegativeAnswer: function() {
        return false;
    }

};
