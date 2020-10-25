export default class CurrentDate {

    constructor(target) {
        this.target = target;
        this.elements = {};
        this.date = new Date();

        this.create();
    }

    create() {
        this.elements.container = document.createElement('div');
        this.elements.weekday = document.createElement('span');
        this.elements.day = document.createElement('span');
        this.elements.month = document.createElement('span');

        this.elements.container.classList.add('current-date');
        this.elements.weekday.classList.add('current-date__weekday');
        this.elements.day.classList.add('current-date__day');
        this.elements.month.classList.add('current-date__month');

        this.elements.container.append(this.elements.weekday);
        this.elements.container.append(this.elements.day);
        this.elements.container.append(this.elements.month);

        this.target.append(this.elements.container);
    }

    update() {
        this.date = new Date();
    }

    render() {
        const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const weekday = this.date.getDay();
        const day = this.date.getDate();
        const month = this.date.getMonth();

        let endingForDay = '';

        if (day > 10 && day < 21) {
            endingForDay = 'th';
        } else if (+day.toString().slice(-1) === 0) {
            endingForDay = 'th';
        } else if (+day.toString().slice(-1) === 1) {
            endingForDay = 'st';
        } else if (+day.toString().slice(-1) === 2) {
            endingForDay = 'nd';
        } else if (+day.toString().slice(-1) === 3) {
            endingForDay = 'rd';
        } else if (+day.toString().slice(-1) === 4) {
            endingForDay = 'th';
        } else if (+day.toString().slice(-1) > 4 && +day.toString().slice(-1) < 10) {
            endingForDay = 'th';
        }

        this.elements.weekday.innerHTML = weekdayNames[weekday] + ', ';
        this.elements.day.innerHTML = day + endingForDay + ' ';
        this.elements.month.innerHTML = monthNames[month];
    }

};