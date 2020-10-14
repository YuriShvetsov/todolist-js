import { Modal } from './modal'

const app: any = {
    state: {
        activeModal: null,
        currentView: 'start-page',
        data: {}
    },
    userActions: {},

    init: function(): void {
        this.app = document.getElementById('app');
        this.readAppData();
        this.renderStartPage();
        this.initUserActions();
        this.initHandlers();
    },

    initAppData: function(): void {
        // ...
    },

    initHandlers: function(): void {
        this.app.addEventListener('click', this.handleClick.bind(this));
    },
    handleClick: function(event: Event) {
        if (!(event.target instanceof HTMLElement)) {
            return;
        }

        let action = event.target.dataset.action;

        if (action === undefined || !this.userActions[action]) return;

        this.userActions[action].call(this);
    },

    renderStartPage: function(): void {
        // ...
    },
    readAppData: function(): void {
        let json = localStorage.getItem('todolist');
        let data: Object;

        if (json !== null) {
            data = JSON.parse(json);
        } else {
            data = { taskLists: [] };
        }

        this.state.data = data;
    },
    writeAppData: function(): void {
        let data = { taskLists: this.state.data.taskLists };
        let json = JSON.stringify(data);

        localStorage.setItem('todolist', json);
    },
    clearAppData: function(): void {
        localStorage.removeItem('todolist');
    },

    // User actions:
    initUserActions: function(): void {
        let actions: Array<Function> = [];

        actions = actions.concat([
            this.openCreateListModal,
            this.closeModal
        ]);

        actions.forEach(action => {
            this.userActions[action.name] = action;
        });
    },
    openCreateListModal: function(): void {
        let createListModal = new Modal('create-list', 'data');

        this.state.activeModal = createListModal;
        createListModal.open();
    },
    closeModal: function(): void {
        this.state.activeModal.close();
        this.state.activeModal = null;
    }
};

app.init();



/* ✓

    Техническое задание

    1. Дописать шаблоны, добавить стили
        [✓] 1.1. Шаблон создания нового списка (модальное окно)
        [✓] 1.2. Шаблон редактирования списка (модальное окно)
        [✓] 1.3. Шаблон удаления текущего списка (модальное окно)
        [✓] 1.4. Шаблон задания
        [✓] 1.5. Шаблон создания нового задания (модальное окно)
        [✓] 1.6. Шаблон редактирования задания (модальное окно)
    2. Написать черновой вариант архитектуры приложения (обдумать идею модульности, классы и прочее)
        2.1. Первый уровень - уровень App, инициализация данных приложения, рендеринг стартовой страницы

*/