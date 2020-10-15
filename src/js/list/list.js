import ListModel from './listModel';
import ListView from './listView';
import ListController from './listController';

export default class List {

    constructor(data) {
        this.model = ListModel;
        this.view = ListView;
        this.controller = ListController;

        this.init(data);
    }

    init(data) {
        this.model.init(data);
        this.view.init();
        this.controller.init(this.model, this.view);
    }

};

// const newList = new List({
//     name: 'main',
//     taskList: [
//         {
//             name: 'Купить продукты',
//             notes: 'Молоко, хлеб, сметана'
//         },
//         {
//             name: 'Покормить кота',
//             notes: ''
//         }
//     ]
// });
