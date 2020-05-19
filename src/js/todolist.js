{

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const monthsShort = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.'
  ];
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const state = initAppState();
  const ui = initAppUI();

  writeToLS();
  renderApp();
  initAppHandlers();

  function initAppState() {
    if (!readFromLS()) {
      return {
        tasks: [],
        curDate: new Date().toString()
      };
    }

    return readFromLS();
  }

  function readFromLS() {
    return JSON.parse(localStorage.getItem('todos'));
  }

  function writeToLS() {
    localStorage.setItem('todos', JSON.stringify(state));
  }

  function generateID() {
    function random() {
      return Math.random().toString(36).substr(2, 16);
    }

    const IDs = state.tasks.map(task => task.id);
    let newID = 'todo-id-' + random();

    while (IDs.includes(newID)) {
      newID = 'todo-id-' + random();
    }

    return newID;
  }

  function delSpacesFromString(str) {
    return str.replace(/^[ \s]+|[ \s]+$/g, '');
  }

  function addTask(text) {
    state.tasks.push({
      date: new Date().toString(),
      done: false,
      id: generateID(),
      text: delSpacesFromString(text),
    });
  }

  function delDoneTasks() {
    const unCompletedTasks = state.tasks.filter(task => !task.done);
    state.tasks = unCompletedTasks;
    writeToLS();
  }
  
  function selectAllTasks() {
    state.tasks.forEach(task => task.done = true);
    writeToLS();
  }

  function unSelectAllTasks() {
    state.tasks.forEach(task => task.done = false);
    writeToLS();
  }

  function initAppUI() {
    const $app = document.querySelector('#todo');

    return {
      currentDate: {
        day: $app.querySelector('.js-todo-day'),
        weekDay: $app.querySelector('.js-todo-weekday'),
        month: $app.querySelector('.js-todo-month')
      },
      countTasks: $app.querySelector('.js-todo-count'),
      addButton: $app.querySelector('.js-todo-add'),
      clearButton: $app.querySelector('.js-todo-clear'),
      input: $app.querySelector('.js-todo-input'),
      filter: {
        container: $app.querySelector('.js-todo-filter'),
        checkbox: $app.querySelector('.js-todo-filter-checkbox'),
        label: $app.querySelector('.js-todo-filter-label')
      },
      list: $app.querySelector('.js-todo-list'),
      captionEmpty: $app.querySelector('.js-todo-caption-empty'),
      templateTask: $app.querySelector('#task-template')
    };
  }

  function initAppHandlers() {
    initInputHandler();
    initAddBtnHandler();
    initClearHandler();
    initFilterHandler();
  }

  function initInputHandler() {
    const input = ui.input;

    input.addEventListener('keydown', e => {
      if ((e.key == 'Enter' || e.keyCode == 13) && delSpacesFromString(e.target.value).length > 0) {
        addTask(e.target.value);
        writeToLS();
        renderTask(state.tasks[state.tasks.length - 1]);
        updateCountTasks();
        updateCaptionEmpty();
        activateFilter();
        e.target.value = '';
      }
    });
  }

  function initAddBtnHandler() {
    const addBtn = ui.addButton;
    const input = ui.input;

    addBtn.addEventListener('click', e => {
      if (delSpacesFromString(input.value).length > 0) {
        addTask(input.value);
        writeToLS();
        renderTask(state.tasks[state.tasks.length - 1]);
        updateCountTasks();
        updateCaptionEmpty();
        activateFilter();
        input.value = '';
      }
    })
  }

  function initFilterHandler() {
    const filter = ui.filter.container;
    const filterCheckbox = ui.filter.checkbox;
    const filterLabel = ui.filter.label;

    filterCheckbox.addEventListener('change', e => {
      if (e.target.checked) {
        selectAllTasks();
        renderTaskCheckboxes();
      } else {
        unSelectAllTasks();
        renderTaskCheckboxes();
      }
      activateFilter();
    });
  }

  function initClearHandler() {
    const clearBtn = ui.clearButton;

    clearBtn.addEventListener('click', function() {
      delDoneTasks();
      removeDoneTasks();
      updateCountTasks();
      updateCaptionEmpty();
      activateFilter();
    });
  }

  function renderTask(task) {
    const template = ui.templateTask;
    const clone = document.importNode(template.content, true);

    const newTask = clone.querySelector('.js-todo-task')
    const newTaskCheckbox = newTask.querySelector('.js-todo-task-checkbox');
    const newTaskText = newTask.querySelector('.js-todo-task-text');
    const newTaskDate = newTask.querySelector('.js-todo-task-date');
    const newTaskLabel = newTask.querySelector('.js-todo-task-label');

    newTaskCheckbox.checked = task.done;
    newTaskText.textContent = task.text;
    newTaskDate.textContent = transformDateForTask(task.date);

    newTask.setAttribute('task-id', task.id);
    newTaskCheckbox.id = task.id;
    newTaskLabel.setAttribute('for', task.id);

    newTask.addEventListener('click', event => {
      let eventChangeImitation = new Event('change');
      newTaskCheckbox.dispatchEvent(eventChangeImitation);

      const clickedTask = state.tasks.find(item => item.id == task.id);
      clickedTask.done = !clickedTask.done;
      newTaskCheckbox.checked = clickedTask.done;
      writeToLS();
      activateFilter();
    });

    ui.list.append(newTask);
  }

  function renderAllTasks() {
    state.tasks.forEach(task => renderTask(task));
  }

  function removeDoneTasks() {
    const $tasks = ui.list.querySelectorAll('.js-todo-task');
    const IDs = state.tasks.map(task => task.id);

    $tasks.forEach(task => {
      let taskID = task.getAttribute('task-id');
      if (!IDs.includes(taskID)) {
        task.remove();
      }
    });
  }

  function renderTaskCheckboxes() {
    const $tasks = ui.list.querySelectorAll('.js-todo-task');

    $tasks.forEach(task => {
      let taskID = task.getAttribute('task-id');
      let taskCheckbox = task.querySelector('.js-todo-task-checkbox');

      taskCheckbox.checked = state.tasks.find(item => item.id === taskID).done;
    });
  }

  function transformDateForTask(date) {
    const sourceDate = new Date(date);
    const day = sourceDate.getDate();
    const month = monthsShort[sourceDate.getMonth()];
    const hours = ('0' + sourceDate.getHours()).slice(-2);
    const minutes = ('0' + sourceDate.getMinutes()).slice(-2);

    return `${day} ${month} ${hours}:${minutes}`;
  }

  function renderCurDate() {
    const curDate = new Date(state.curDate);
    const $curWeekDay = ui.currentDate.weekDay;
    const $curDay = ui.currentDate.day;
    const $curMonth = ui.currentDate.month;

    $curWeekDay.textContent = weekDays[curDate.getDay()] + ', ';
    $curDay.textContent = curDate.getDate();
    $curMonth.textContent = months[curDate.getMonth()];
    state.curDate = new Date().toString();
    writeToLS();
  }

  function updateCountTasks() {
    const countTasks = ui.countTasks;
    countTasks.textContent = state.tasks.length + ' tasks';
  }

  function updateCurDate() {
    renderCurDate();
    setInterval(renderCurDate, 1000);
  }

  function updateCaptionEmpty() {
    const captionEmpty = ui.captionEmpty;

    if (state.tasks.length === 0) {
      captionEmpty.classList.remove('todo__caption-empty_hidden');
    } else { 
      captionEmpty.classList.add('todo__caption-empty_hidden');
    }
  }

  function activateFilter() {
    const filterCheckbox = ui.filter.checkbox;
    const filterLabel = ui.filter.label;

    if (state.tasks.find(item => item.done) && !state.tasks.find(item => !item.done)) {
      filterCheckbox.checked = true;
      filterLabel.classList.remove('todo__filter-label_minus');
    }

    if (state.tasks.find(item => item.done) && state.tasks.find(item => !item.done)) {
      filterCheckbox.checked = true;
      filterLabel.classList.add('todo__filter-label_minus');
    }

    if (!state.tasks.find(item => item.done)) {
      filterCheckbox.checked = false;
      setTimeout(function () {
        filterLabel.classList.remove('todo__filter-label_minus');
      }, 200);
    }

    if (state.tasks.length > 0) {
      filterCheckbox.removeAttribute('disabled');
    } else if (state.tasks.length === 0) {
      filterCheckbox.checked = false;
      filterCheckbox.setAttribute('disabled', true);
    }
  }

  function renderApp() {
    renderAllTasks();
    updateCurDate();
    updateCaptionEmpty();
    updateCountTasks();
    activateFilter();
  }

}