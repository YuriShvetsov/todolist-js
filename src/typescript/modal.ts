export class Modal {

    id: string;
    type: string;
    userActions: any;
    template: HTMLElement | null;
    app: HTMLElement | null;
    element!: HTMLElement | null;
    overlay!: HTMLInputElement | null;

    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
        this.userActions = {};
        this.app = document.getElementById('app');
        this.template = document.getElementById(this.id);
        this.initElements();

        this.initUserActions();
        this.initHandlers();
    }

    initElements(): void {
        if (!this.template) throw Error('Template is not found =(');

        let modalCopy: DocumentFragment;

        if (this.template instanceof HTMLTemplateElement) {
            modalCopy = document.importNode(this.template.content, true);
            this.app?.append(modalCopy);
        }

        if (this.app instanceof HTMLElement) {
            this.element = this.app.querySelector('.js-modal');
            this.overlay = this.app.querySelector('.js-overlay');
        }
    }

    initHandlers(): void {
        this.element?.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(e: Event): void {
        if (!(e.target instanceof HTMLInputElement)) return;

        e.preventDefault();

        let action = e.target.dataset.action;

        if (action === undefined || !this.userActions[action]) return;

        this.userActions[action].call(this);
    }

    open(): void {
        if (this.element instanceof HTMLElement) {
            this.element.classList.add('modal_visible');
        }

        if (this.overlay instanceof HTMLElement) {
            this.overlay.classList.add('overlay_visible');
        }
    }

    close(): void {
        if (this.element instanceof HTMLElement) {
            this.element.classList.add('modal_hidden');
            
            setTimeout(() => {
                this.element?.remove();
            }, 200);
        }

        if (this.overlay instanceof HTMLElement) {
            this.overlay.classList.add('overlay_hidden');

            setTimeout(() => {
                this.overlay?.classList.remove('overlay_visible');
                this.overlay?.classList.remove('overlay_hidden');
            }, 200);
        }
    }

    getAnswer(): boolean | object {
        let answer: boolean | object;

        if (this.type == 'bool') {
            answer = true;
        } else if (this.type == 'data') {
            answer = {
                name: (<HTMLInputElement>document.forms[0][0]).value
            };
        } else {
            answer = false;
        }

        console.log(answer);
        return answer;
    }

    // User actions:
    initUserActions(): void {
        let actions: Array<Function> = [];

        actions = actions.concat([
            this.getAnswer,
            this.close
        ]);

        actions.forEach(action => {
            this.userActions[action.name] = action;
        });
    }

};
