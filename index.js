const initApp = () => {
  // ADD BOARD //
  
  let currentBoard = null; //init current board
  const addBoardBtn = document.querySelector('#add-board-btn');
  const popAddBoard = document.querySelector('#add-board-container');
  addBoard = document.querySelector('#add-board');
  titleTag = addBoard.querySelector('input');
  createBoardBtn = addBoard.querySelector('#create-board-btn');
  const titleHead = document.querySelector('#title');

  let isUpdate = false, updateId;

  //getting local storage boards
  const boards = JSON.parse(localStorage.getItem("boards") || "[]");
  let colorScheme = JSON.parse(localStorage.getItem("darkMode") || "[]");

  const body = document.querySelector('body');
  const boardList = document.querySelector('#board-list');

  addBoardBtn.addEventListener('click', function() {
    popAddBoard.style.display = 'block';
  });
  
  window.addEventListener('click', function(e) {
    if(e.target === popAddBoard) {
      isUpdate = false;
      titleTag.value = "";
      popAddBoard.style.display = 'none';
      addBoard.querySelector('h2').textContent = 'Add New Board';
      addBoard.querySelector('button').textContent = 'Create Board';
    };
  });


  // SHOW CREATED BOARDS // 

  function showBoards() {
    document.querySelectorAll('#task-board').forEach(taskboard => taskboard.remove());
    document.querySelectorAll('#board-title').forEach(boardtitle => boardtitle.remove());

    boards.forEach((board, index) => {

      let liTag = `
      <li data-for-tab="${index}" id="board-title" class="hover:text-[#635fcf] flex items-center py-3 px-6 cursor-pointer">
        <div class="mr-2">
          <img src="./img/icon-board.53d57c07.svg" alt="" class="">
        </div>
        <h3 class="text-base">${board.title}</h3>
      </li>`;
      boardList.insertAdjacentHTML('beforeend', liTag);

      const title = document.querySelector('#title');
      title.textContent = `${board.title}`;

      if(colorScheme === false) {
        let boardTag = `
          <main data-tab="${index}" id="task-board" class="bg-[#f4f7fd] hidden items-start gap-6 p-6 overflow-x-scroll task-board" style="margin-left: 300px;">
            <section class="w-[17.5rem] shrink-0" id="section-one">
              <div id="div-one" class="flex items-center">
                <div class="bg-[#49c4e5] w-4 h-4 rounded-full mr-2"></div>
                <h3 class="text-[#828fa3] text-xs tracking-[0.3em]">TODO (<span>0</span>)</h3>
              </div>
              <ul id="todo-list" class="flex flex-col mt-4 gap-y-4 cursor-pointer">
              </ul>
            </section>
            <section id="section-two" class="w-[17.5rem] shrink-0">
              <div id="div-two" class="flex items-center">
                <div class="bg-[#8471f2] w-4 h-4 rounded-full mr-2"></div>
                <h3 class="text-[#828fa3] text-xs tracking-[0.3em]">DOING (<span>0</span>)</h3>
              </div>
              <ul id="doing-list" class="flex flex-col mt-4 gap-y-4 cursor-pointer">
              </ul>
            </section>
            <section id="section-three" class="w-[17.5rem] shrink-0">
              <div id="div-three" class="flex items-center">
                <div class="bg-[#67e2ae] w-4 h-4 rounded-full mr-2"></div>
                <h3 class="text-[#828fa3] text-xs tracking-[0.3em]">DONE (<span>0</span>)</h3>
              </div>
              <ul id="done-list" class="flex flex-col mt-4 gap-y-4 cursor-pointer">
              </ul>
            </section>
            <!-- <div class="shrink-0 new-column">
              <button id="new-column-btn" class="text-[#828fa3] text-2xl hover:text-[#635fcf] bg-[#ffffff] dark:bg-[#161822] rounded-sm">+New Column</button>
            </div> -->
          </main>`
        ;
        body.insertAdjacentHTML('beforeend', boardTag);
      }

      if(colorScheme === true) {
        let boardTag = `
          <main data-tab="${index}" id="task-board" class="bg-[#20212c] hidden items-start gap-6 p-6 overflow-x-scroll task-board">
            <section class="w-[17.5rem] shrink-0" id="section-one">
              <div id="div-one" class="flex items-center">
                <div class="bg-[#49c4e5] w-4 h-4 rounded-full mr-2"></div>
                <h3 class="text-[#828fa3] text-xs tracking-[0.3em]">TODO (<span>0</span>)</h3>
              </div>
              <ul id="todo-list" class="flex flex-col mt-4 gap-y-4 cursor-pointer">
              </ul>
            </section>
            <section id="section-two" class="w-[17.5rem] shrink-0">
              <div id="div-two" class="flex items-center">
                <div class="bg-[#8471f2] w-4 h-4 rounded-full mr-2"></div>
                <h3 class="text-[#828fa3] text-xs tracking-[0.3em]">DOING (<span>0</span>)</h3>
              </div>
              <ul id="doing-list" class="flex flex-col mt-4 gap-y-4 cursor-pointer">
              </ul>
            </section>
            <section id="section-three" class="w-[17.5rem] shrink-0">
              <div id="div-three" class="flex items-center">
                <div class="bg-[#67e2ae] w-4 h-4 rounded-full mr-2"></div>
                <h3 class="text-[#828fa3] text-xs tracking-[0.3em]">DONE (<span>0</span>)</h3>
              </div>
              <ul id="done-list" class="flex flex-col mt-4 gap-y-4 cursor-pointer">
              </ul>
            </section>
            <!-- <div class="shrink-0 new-column">
              <button id="new-column-btn" class="text-[#828fa3] text-2xl hover:text-[#635fcf] bg-[#ffffff] dark:bg-[#161822] rounded-sm">+New Column</button>
            </div> -->
          </main>`
        ;
        body.insertAdjacentHTML('beforeend', boardTag);
      }
    });
  };
  showBoards();


  // OPEN & CLOSE SIDEBAR //

  const sideOpenBtn = document.querySelector('#side-open-btn');
  const sideCloseBtn = document.querySelector('#side-close-btn');
  const sideBar = document.querySelector('#sidebar');
  const taskBoard = document.querySelectorAll('#task-board');

  sideOpenBtn.addEventListener('click', () => {
    sideBar.style.display = 'block';
    taskBoard.forEach((taskboard) => {
      taskboard.style.marginLeft = '300px';
    });
  });

  sideCloseBtn.addEventListener('click', () => {
    sideBar.style.display = 'none';
    taskBoard.forEach((taskboard) => {
      taskboard.style.marginLeft = 'auto';
    })
  });


  let randNumber = Math.floor(Math.random() * 10000);


  // CREATE BOARD BTN //

  createBoardBtn.addEventListener('click', e => {
    e.preventDefault()

    titleTag.focus();

    let boardTitle = titleTag.value;
    let boardInfo = {
      id: randNumber,
      title: boardTitle,
      todoColumn: [],
      doingColumn: [],
      doneColumn: [],
    };

    if(!isUpdate) {
      boards.push(boardInfo); //adding new board to boards
    } else {
      isUpdate = false;
      boards[currentBoard].title = boardInfo.title;
    };
    localStorage.setItem("boards", JSON.stringify(boards)); //saving boards to local storage

    popAddBoard.style.display = 'none';
    titleTag.value = "";
    showBoards();
    selectBoard();

    // UPDATES BOARD LENGTH //

    const boardsLength = document.querySelector('#boards span');
    boardsLength.textContent = `${boards.length}`;

    // CLICKS ON THE LAST BOARD TITLE WHEN A NEW BOARD IS CREATED //
    
    boardList.lastElementChild.click();

    let query = window.matchMedia("(max-width: 720px)");
    let queryOne = window.matchMedia("(max-width: 1080px)");
    if(query.matches) {
      window.location.reload();
      taskBoard.forEach((taskboard) => {
        taskboard.style.marginLeft = 'auto';
      });
    }
    if(queryOne.matches) {
      window.location.reload();
    }
  });
  if(sideOpenBtn.click()) {
    taskBoard.forEach((taskboard) => {
      taskboard.style.marginLeft = '300px';
    });
  };
  const boardsLength = document.querySelector('#boards span');
  boardsLength.textContent = `${boards.length}`;

  window.onload = () => { 
    boardList.firstElementChild.click();
  };


  // DELETE BOARD //

  const dotBoardBtn = document.querySelector('#dot-board-btn');
  const dotBoardMenu = document.querySelector('#dot-board-menu');
  const deleteBoardBtn = document.querySelector('#deleteboard');
  const deleteAlert = document.querySelector('#delete-alert-container');

  dotBoardBtn.addEventListener('click', () => {
    dotBoardMenu.style.display = 'block';
  });

  window.addEventListener('click', (e) => {
    if(e.target !== dotBoardBtn){
      dotBoardMenu.style.display = 'none';
    }
  });

  deleteBoardBtn.addEventListener('click', () => {
    deleteAlert.style.display = 'block';
  });

  window.addEventListener('click', function(e) {
    if(e.target === deleteAlert) {
      deleteAlert.style.display = 'none';
    };
  });

  window.addEventListener('click', function(e) {
    if(e.target === this.document.querySelector('#delete-task-alert-container')) {
      document.querySelector('#delete-task-alert-container').style.display = 'none';
    };
  });

  document.querySelector('#cancel-alert').addEventListener('click', () => {
    deleteAlert.style.display = 'none'
  });

  document.querySelector('#cancel-task-delete').addEventListener('click', () => {
    document.querySelector('#delete-task-alert-container').style.display = 'none';
  });


  // SELECT BOARD //

  function selectBoard() {
    document.querySelectorAll('#board-title').forEach((title, index) => {
      title.addEventListener('click', () => {
        const boardNumber = title.dataset.forTab;
        currentBoard = boardNumber; //set current board
        const toActivate = document.querySelector(`#task-board[data-tab="${currentBoard}"]`);

        sideBar.querySelectorAll('#board-title').forEach(title => {
        title.classList.remove('board-title--active');
        });
        
        taskBoard.forEach(taskboard => {
          taskboard.classList.remove('task-board--active');
        });

        title.classList.add('board-title--active');
        toActivate.classList.add('task-board--active');

        titleHead.textContent = `${title.textContent}`;

        showTodoTask();
        showDoingTask();
        showDoneTask();

        document.querySelector('#edit-board').addEventListener('click', () => {
          isUpdate = true;
          updateId = currentBoard;
          popAddBoard.style.display = 'block';
          addBoard.querySelector('h2').textContent = 'Edit Board';
          addBoard.querySelector('button').textContent = 'Save Changes';
          titleTag.value = titleHead.innerText;
        });

        const deleteboard = document.querySelector('#delete-board');

        deleteboard.addEventListener('click', () => {
          boards.splice(currentBoard, 1);
          if(boardList.lastElementChild.click()) return;
          localStorage.setItem("boards", JSON.stringify(boards));
          showBoards();
          window.location.reload();
          deleteAlert.style.display = 'none';
        });

        let query = window.matchMedia("(max-width: 720px)");
        if(query.matches) {
          sideBar.style.display = 'none';
          taskBoard.forEach((taskboard) => {
            taskboard.style.marginLeft = 'auto';
          });
        }
      });
    });
  };
  selectBoard();


  // TODO TASK FUNCTION FOR EACH BOARD //

  function showTodoTask() {
    const todoList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list');
    const doingList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list');
    const doneList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list');
    const todoLength = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#div-one span');
    todoList.querySelectorAll('#todo-task').forEach(task => task.remove());
    todoList.querySelectorAll('#task-details-container').forEach(detail => detail.remove());
    todoList.querySelectorAll('#sub-task').forEach(task => task.remove());

    let board = boards[currentBoard];
    board.todoColumn.forEach((column, index) => {
      if(colorScheme === false) {
        let todoTag = `
          <li id="todo-task" class="bg-[#ffffff] w-full px-4 py-5 rounded-md">
            <h4 id="task-title" class="text-[#000112] hover:text-[#635fcf] text-sm">${board.todoColumn[index].title}</h4>
            <p class="text-[#828fa3] text-xs"><span id="done">0</span> of <span id="subtasks">0</span> subtasks</p>
          </li>
        `;
        todoList.insertAdjacentHTML("beforeend", todoTag);

        let details = `
          <section id="task-details-container" class="absolute z-[1000] hidden">
            <div id="task-details" class="text-[#000112] p-8 bg-[#ffffff] rounded-md absolute z-[1000]">
              <div class="flex justify-between">
                <h2 id="title" class="text-base">${board.todoColumn[index].title}</h2>
                <i id="dot-btn" class="fa-solid fa-ellipsis-vertical cursor-pointer"
                style="color: #828fa3; font-size: x-large;"></i>
              </div>
              <div>
                <p id="description" class="mt-[24px] text-xs font-semibold text-[#828fa3]">${board.todoColumn[index].desc}</p>
              </div>
              <div class="mt-[24px]">
                <label for="subtasks" class="text-[#828fa3] text-xs font-semibold">Subtasks (<span id="completed">0</span> of <span id="subtask">0</span>)</label>
              </div>
              <ul id="subtask-list" class="text-xs">
              </ul>
              <div>
                <div class="mt-[24px]">
                  <label for="status" class="text-[#828fa3] text-xs">Current Status</label>
                </div>
                <div id="btn-two"
                class="flex justify-between px-4 py-2 text-xs rounded-sm bg-[#ffffff] border-[1.9px] border-[#828fa3] border-opacity-20 mt-2 hover:border-[#635fcf] cursor-pointer">
                  <p>Todo</p>
                  <div class="">
                    <i class="fa-solid fa-angle-down" style="color: #635fcf; font-size: large;"></i>
                  </div>
                </div>
                <section id="status-menu-two" class="relative z-[1000] text-xs hidden">
                  <div class="bg-[#ffffff] absolute w-full top-1 rounded-sm border-[1.8px] border-[#828fa3] border-opacity-20 py-1 text-[#828fa3]">
                    <ul>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Todo</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Doing</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Done</li>
                    </ul>
                  </div>
                </section>
                <div id="dot-menu"
                class="bg-[#ffffff] rounded-md py-2 text-xs font-normal w-1/3 absolute z-[1000] hidden">
                  <ul>
                    <li id="edit-task" class="text-[#828fa3] my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Edit Task</li>
                    <li id="deletetask" class="text-red-500 my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Delete Task</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        `;
        todoList.insertAdjacentHTML("beforeend", details);
      }

      if(colorScheme === true) {
        let todoTag = `
          <li id="todo-task" class="bg-[#2b2c37] w-full px-4 py-5 rounded-md" style="background: #2b2c37";>
            <h4 id="task-title" class="text-[#ffffff] hover:text-[#635fcf] text-sm">${board.todoColumn[index].title}</h4>
            <p class="text-[#828fa3] text-xs"><span id="done">0</span> of <span id="subtasks">0</span> subtasks</p>
          </li>
        `;
        todoList.insertAdjacentHTML("beforeend", todoTag);

        let details = `
          <section id="task-details-container" class="absolute z-[1000] hidden">
            <div id="task-details" class="text-[#ffffff] p-8 bg-[#2b2c37] rounded-md absolute z-[1000]" style="background: #2b2c37";>
              <div class="flex justify-between">
                <h2 id="title" class="text-base">${board.todoColumn[index].title}</h2>
                <i id="dot-btn" class="fa-solid fa-ellipsis-vertical cursor-pointer"
                style="color: #828fa3; font-size: x-large;"></i>
              </div>
              <div>
                <p id="description" class="mt-[24px] text-xs font-semibold text-[#828fa3]">${board.todoColumn[index].desc}</p>
              </div>
              <div class="mt-[24px]">
                <label for="subtasks" class="text-[#828fa3] text-xs font-semibold">Subtasks (<span id="completed">0</span> of <span id="subtask">0</span>)</label>
              </div>
              <ul id="subtask-list" class="text-xs">
              </ul>
              <div>
                <div class="mt-[24px]">
                  <label for="status" class="text-[#828fa3] text-xs">Current Status</label>
                </div>
                <div id="btn-two"
                class="flex justify-between px-4 py-2 text-xs rounded-sm bg-[#2b2c37] border-[1.9px] border-[#828fa3] border-opacity-20 mt-2 hover:border-[#635fcf] cursor-pointer">
                  <p>Todo</p>
                  <div class="">
                    <i class="fa-solid fa-angle-down" style="color: #635fcf; font-size: large;"></i>
                  </div>
                </div>
                <section id="status-menu-two" class="relative z-[1000] text-xs hidden">
                  <div class="bg-[#2b2c37] absolute w-full top-1 rounded-sm border-[1.8px] border-[#828fa3] border-opacity-20 py-1 text-[#828fa3]" style="background: #2b2c37";>
                    <ul>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Todo</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Doing</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Done</li>
                    </ul>
                  </div>
                </section>
                <div id="dot-menu"
                class="bg-[#20212c] rounded-md py-2 text-xs font-normal w-1/3 absolute z-[1000] hidden" style="background: #20212c";>
                  <ul>
                    <li id="edit-task" class="text-[#828fa3] my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Edit Task</li>
                    <li id="deletetask" class="text-red-500 my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Delete Task</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        `;
        todoList.insertAdjacentHTML("beforeend", details);
      }

      const subtaskList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#subtask-list');

      column.subtasks.forEach((task) => {
        if(colorScheme === false) {
          let subtasks = `
            <label id="sub-task" class="px-4 py-2 rounded-sm bg-[#f4f7fd] mt-4 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 flex items-center">
              <input id="checkbox" type="checkbox" name="subtask" value="${task.title}" class="mr-2" style="background-color: #ffffff;">
              <p id="input">${task.title}</p>
            </label>
          `;
          subtaskList[index].insertAdjacentHTML("beforeend", subtasks); 
        }
        if(colorScheme === true) {
          let subtasks = `
            <label id="sub-task" class="px-4 py-2 rounded-sm bg-[#20212c] mt-4 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 flex items-center" style="background: #20212c";>
              <input id="checkbox" type="checkbox" name="subtask" value="${task.title}" class="mr-2" style="background-color: #2b2c37;">
              <p id="input">${task.title}</p>
            </label>
          `;
          subtaskList[index].insertAdjacentHTML("beforeend", subtasks);
        }
      });

      // UPDATES SUBTASKS LENGTH //

      const subtasksLength = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelectorAll('#todo-list #subtasks');

      subtasksLength.forEach((subtasks, index) => {
        subtasks.textContent = `${board.todoColumn[index].subtasks.length}`;
      });

      // TASK DETAILS //

      const taskTitles = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelectorAll('#todo-task h4');
      const taskDetailsBox = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#task-details-container');
      const dotMenu = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#dot-menu');
      const subtaskLength = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#subtask');
      const taskDetails = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#task-details');

      taskTitles.forEach((title, index) => {

        const todoTasks = todoList.querySelectorAll('#todo-task');
        let done = todoTasks[index].querySelector('#done');
        let increase = 0;
        let number = board.todoColumn[index];

        title.addEventListener('click', () => {
          taskDetailsBox[index].style.display = 'block';
        });

        subtaskLength.forEach((subtask, index) => {
          subtask.textContent = `${board.todoColumn[index].subtasks.length}`;
        });

        // CHECKBOX STATUS OF SUBTASKS //

        let checkBox = taskDetails[index].querySelector('#subtask-list').querySelectorAll('input');
        let completed = taskDetails[index].querySelector('#completed');
        let count = 0;
        checkBox.forEach((checkbox, index) => {
          checkbox.addEventListener('change', () => {
            if(checkbox.checked === true) {
              completed.textContent = ++count;
              done.textContent = ++increase;
              checkbox.style.backgroundColor = '#635fcf';
              checkbox.nextElementSibling.style.color = '#828fa3';
              checkbox.nextElementSibling.style.textDecoration = 'line-through';

            } else {
              completed.textContent = --count;
              done.textContent = --increase;
              if(colorScheme === false) {
                checkbox.style.backgroundColor = '#ffffff';
              } else {
                checkbox.style.backgroundColor = '#2b2c37';
              }
              checkbox.nextElementSibling.style.color = '#ffffff';
              checkbox.nextElementSibling.style.textDecoration = 'initial';
            }
            number.subtasks[index].isCompleted = checkbox.checked;
            localStorage.setItem("boards", JSON.stringify(boards));
          });
          checkbox.checked = number.subtasks[index].isCompleted;
          if(number.subtasks[index].isCompleted === true) {
            completed.textContent = ++count;
            done.textContent = ++increase;
            checkbox.style.backgroundColor = '#635fcf';
            checkbox.nextElementSibling.style.color = '#828fa3';
            checkbox.nextElementSibling.style.textDecoration = 'line-through';
          }
        })
      });

      taskDetailsBox.forEach((box, index) => {
        window.addEventListener('click', function(e) {
          if(e.target === box) {
            box.style.display = 'none';
            dotMenu[index].style.display = 'none';
          };
        });
      });
    });
    todoLength.textContent = `${board.todoColumn.length}`;


    const dotBtn = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#dot-btn');
    const dotMenu = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#dot-menu');
    const taskDetailsBox = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#task-details-container');
    const taskDetails = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#task-details');
    const todoTasks = todoList.querySelectorAll('#todo-task');

    dotBtn.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        if(e.target === btn) {
          dotMenu[index].style.display = 'block';
        }
      });

      window.addEventListener('click', (e) => {
        if(e.target !== btn) {
          dotMenu[index].style.display = 'none';
        }
      });

      // EDIT TASK //

      dotMenu[index].querySelector('#edit-task').addEventListener('click', () => {
        isUpdate = true;
        updateId = index;
        addBtn.click();
        taskDetailsBox[index].style.display = 'none';
        addtask.querySelector('h2').textContent = 'Edit Task';
        createTaskBtn.textContent = 'Save Changes';
        taskTitleTag.value = taskDetails[index].querySelector('h2').textContent;
        descTag.value = taskDetails[index].querySelector('p').textContent;
        addtask.querySelector('.sub-task').style.display = 'none';

        const subtask = taskDetails[index].querySelectorAll('#input');
        board.todoColumn[index].subtasks.forEach((tag, index) => {

          const subTaskDiv = document.querySelector('#subtask-div');

          // create elements //
          const div = document.createElement('div');
          const input = document.createElement('input');
          const deleteBtn = document.createElement('i');

          // add classes //
          div.classList.add('flex', 'justify-between', 'items-center', 'mt-4', 'sub');
          input.setAttribute('id', 'sub-task');
          input.setAttribute('type', 'text');
          input.setAttribute('minlength', '5');
          input.setAttribute('maxlength', '30');
          input.setAttribute('placeholder', 'e.g.Make Coffee');
          input.classList.add('px-4', 'py-2', 'text-xs', 'rounded-sm', 'border-[1.9px]', 'border-[#828fa3', 'border-opacity-20','w-full', 'cursor-pointer', 'hover:border-[#635fcf]');
          if(colorScheme === false) {
            input.style.background = '#ffffff';
            input.style.color = '#000112';
          };
          if(colorScheme === true) {
            input.style.background = '#2b2c37';
            input.style.color = '#ffffff';
          };
          deleteBtn.classList.add('fa-solid', 'fa-xmark', 'ml-3', 'cursor-pointer', 'delete');
          deleteBtn.style.color = "#828fa3";
          deleteBtn.style.fontSize = "x-large";
          deleteBtn.setAttribute('id', 'delete');

          // append to document //
          div.appendChild(input);
          div.appendChild(deleteBtn);
          subTaskDiv.append(div);
          
          input.value = subtask[index].textContent;
        });
        statusMenu.querySelector('.doing').style.display = 'none';
        statusMenu.querySelector('.done').style.display = 'none';
      });

      // DELETE TASK //

      dotMenu[index].querySelector('#deletetask').addEventListener('click', () => {
        document.querySelector('#delete-task-alert-container').style.display = 'block';
        taskDetailsBox[index].style.display = 'none';

        document.querySelector('#delete-task').addEventListener('click', () => {
          board.todoColumn.splice(index, 1);
          localStorage.setItem("boards", JSON.stringify(boards));
          document.querySelector('#delete-task-alert-container').style.display = 'none';
          showTodoTask();
        })
      });
    });

    const btnTwo = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#btn-two');
    const statusMenuTwo = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list').querySelectorAll('#status-menu-two');

    btnTwo.forEach((btn, index) => {

      btn.addEventListener('click', (e) => {
        if(e.target === btn) {
          statusMenuTwo[index].style.display = 'block';
        }
      })
      statusMenuTwo[index].addEventListener('click', (e) => {
        if(e.target.matches('li')){
          btn.textContent = e.target.textContent;
          statusMenuTwo[index].style.display = 'none';

          if(btn.textContent === 'Doing') {
            doingList.insertAdjacentElement('beforeend', todoTasks[index]);
            board.doingColumn.push(board.todoColumn[index]);
            board.todoColumn.splice(index, 1);
            localStorage.setItem("boards", JSON.stringify(boards));
            window.location.reload();
            boardTitles[index].click();
          }
          else if(btn.textContent === 'Done') {
            doneList.insertAdjacentElement('beforeend', todoTasks[index]);
            board.doneColumn.push(board.todoColumn[index]);
            board.todoColumn.splice(index, 1);
            localStorage.setItem("boards", JSON.stringify(boards));
            window.location.reload();
            boardTitles[index].click();
          }
        }
      })
    })
  };


  // DOING TASK FUNCTION FOR EACH BOARD //

  function showDoingTask() {
    const doingList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list');
    const todoList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list');
    const doneList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list');
    const doingLength = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#div-two span');
    doingList.querySelectorAll('#doing-task').forEach(task => task.remove());
    doingList.querySelectorAll('#task-details-container').forEach(detail => detail.remove());

    let board = boards[currentBoard];
    board.doingColumn.forEach((column, index) => {

      if(colorScheme === false) {
        let doingTag = `
          <li id="doing-task" class="bg-[#ffffff] w-full px-4 py-5 rounded-md">
            <h4 id="task-title" class="text-[#000112] hover:text-[#635fcf] text-sm">${board.doingColumn[index].title}</h4>
            <p class="text-[#828fa3] text-xs"><span id="done">0</span> of <span id="subtasks">0</span> subtasks</p>
          </li>
        `;
        doingList.insertAdjacentHTML("beforeend", doingTag);

        let details = `
          <section id="task-details-container" class="absolute z-[1000] hidden">
            <div id="task-details" class="text-[#000112] p-8 bg-[#ffffff] rounded-md absolute z-[1000]">
              <div class="flex justify-between">
                <h2 id="title" class="text-base">${board.doingColumn[index].title}</h2>
                <i id="dot-btn" class="fa-solid fa-ellipsis-vertical cursor-pointer"
                style="color: #828fa3; font-size: x-large;"></i>
              </div>
              <div>
                <p id="description" class="mt-[24px] text-xs font-semibold text-[#828fa3]">${board.doingColumn[index].desc}</p>
              </div>
              <div class="mt-[24px]">
                <label for="subtasks" class="text-[#828fa3] text-xs font-semibold">Subtasks (<span id="completed">0</span> of <span id="subtask">0</span>)</label>
              </div>
              <ul id="subtask-list" class="text-xs">
              </ul>
              <div>
                <div class="mt-[24px]">
                  <label for="status" class="text-[#828fa3] text-xs">Current Status</label>
                </div>
                <div id="btn-two"
                class="flex justify-between px-4 py-2 text-xs rounded-sm bg-[#ffffff] border-[1.9px] border-[#828fa3] border-opacity-20 mt-2 hover:border-[#635fcf] cursor-pointer">
                  <p>Doing</p>
                  <div class="">
                    <i class="fa-solid fa-angle-down" style="color: #635fcf; font-size: large;"></i>
                  </div>
                </div>
                <section id="status-menu-two" class="relative z-[1000] text-xs hidden">
                  <div class="bg-[#ffffff] absolute w-full top-1 rounded-sm border-[1.8px] border-[#828fa3] border-opacity-20 py-1 text-[#828fa3]">
                    <ul>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Todo</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Doing</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Done</li>
                    </ul>
                  </div>
                </section>
                <div id="dot-menu"
                class="bg-[#ffffff] rounded-md py-2 text-xs font-normal w-1/3 absolute z-[1000] hidden">
                  <ul>
                    <li id="edit-task" class="text-[#828fa3] my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Edit Task</li>
                    <li id="deletetask" class="text-red-500 my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Delete Task</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        `;
        doingList.insertAdjacentHTML("beforeend", details);
      }

      if(colorScheme === true) {
        let doingTag = `
          <li id="doing-task" class="bg-[#2b2c37] w-full px-4 py-5 rounded-md" style="background: #2b2c37";>
            <h4 id="task-title" class="text-[#ffffff] hover:text-[#635fcf] text-sm">${board.doingColumn[index].title}</h4>
            <p class="text-[#828fa3] text-sm"><span id="done">0</span> of <span id="subtasks">0</span> subtasks</p>
          </li>
        `;
        doingList.insertAdjacentHTML("beforeend", doingTag);

        let details = `
          <section id="task-details-container" class="absolute z-[1000] hidden">
            <div id="task-details" class="text-[#ffffff] p-8 bg-[#2b2c37] rounded-md absolute z-[1000]" style="background: #2b2c37";>
              <div class="flex justify-between">
                <h2 id="title" class="text-base">${board.doingColumn[index].title}</h2>
                <i id="dot-btn" class="fa-solid fa-ellipsis-vertical cursor-pointer"
                style="color: #828fa3; font-size: x-large;"></i>
              </div>
              <div>
                <p id="description" class="mt-[24px] text-xs font-semibold text-[#828fa3]">${board.doingColumn[index].desc}</p>
              </div>
              <div class="mt-[24px]">
                <label for="subtasks" class="text-[#828fa3] text-xs font-semibold">Subtasks (<span id="completed">0</span> of <span id="subtask">0</span>)</label>
              </div>
              <ul id="subtask-list" class="text-xs">
              </ul>
              <div>
                <div class="mt-[24px]">
                  <label for="status" class="text-[#828fa3] text-xs">Current Status</label>
                </div>
                <div id="btn-two"
                class="flex justify-between px-4 py-2 text-xs rounded-sm bg-[#2b2c37] border-[1.9px] border-[#828fa3] border-opacity-20 mt-2 hover:border-[#635fcf] cursor-pointer">
                  <p>Doing</p>
                  <div class="">
                    <i class="fa-solid fa-angle-down" style="color: #635fcf; font-size: large;"></i>
                  </div>
                </div>
                <section id="status-menu-two" class="relative z-[1000] text-xs hidden">
                  <div class="bg-[#2b2c37] absolute w-full top-1 rounded-sm border-[1.8px] border-[#828fa3] border-opacity-20 py-1 text-[#828fa3]" style="background: #2b2c37";>
                    <ul>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Todo</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Doing</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Done</li>
                    </ul>
                  </div>
                </section>
                <div id="dot-menu"
                class="bg-[#20212c] rounded-md py-2 text-xs font-normal w-1/3 absolute z-[1000] hidden" style="background: #20212c";>
                  <ul>
                    <li id="edit-task" class="text-[#828fa3] my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Edit Task</li>
                    <li id="deletetask" class="text-red-500 my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Delete Task</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        `;
        doingList.insertAdjacentHTML("beforeend", details);
      }

      const subtaskList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#subtask-list');

      column.subtasks.forEach((task) => {
        if(colorScheme === false) {
          let subtasks = `
            <label id="sub-task" class="px-4 py-2 rounded-sm bg-[#f4f7fd] mt-4 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 flex items-center">
              <input id="checkbox" type="checkbox" name="subtask" value="${task.title}" class="mr-2" style="background-color: #ffffff;">
              <p id="input">${task.title}</p>
            </label>
          `;
          subtaskList[index].insertAdjacentHTML("beforeend", subtasks); 
        }
        if(colorScheme === true) {
          let subtasks = `
            <label id="sub-task" class="px-4 py-2 rounded-sm bg-[#20212c] mt-4 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 flex items-center" style="background: #20212c";>
              <input id="checkbox" type="checkbox" name="subtask" value="${task.title}" class="mr-2" style="background-color: #2b2c37;">
              <p id="input">${task.title}</p>
            </label>
          `;
          subtaskList[index].insertAdjacentHTML("beforeend", subtasks);
        }
      });

      // UPDATES SUBTASKS LENGTH //

      const subtasksLength = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelectorAll('#doing-task #subtasks');

      subtasksLength.forEach((subtasks, index) => {
        subtasks.textContent = `${board.doingColumn[index].subtasks.length}`;
      });

      // TASK DETAILS //

      const taskTitles = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelectorAll('#doing-task h4');
      const taskDetailsBox = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#task-details-container');
      const taskDetails = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#task-details');
      const dotMenu = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#dot-menu');
      const subtaskLength = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#subtask');

      taskTitles.forEach((title, index) => {

        const doingTasks = doingList.querySelectorAll('#doing-task');
        let done = doingTasks[index].querySelector('#done');
        let increase = 0;
        let number = board.doingColumn[index];

        title.addEventListener('click', () => {
          taskDetailsBox[index].style.display = 'block';
        });

        subtaskLength.forEach((subtask, index) => {
          subtask.textContent = `${board.doingColumn[index].subtasks.length}`;
        });

        // CHECKBOX STATUS OF SUBTASKS //

        let checkBox = taskDetails[index].querySelector('#subtask-list').querySelectorAll('input');
        let completed = taskDetails[index].querySelector('#completed');
        let count = 0;
        checkBox.forEach((checkbox, index) => {
          checkbox.addEventListener('change', () => {
            if(checkbox.checked === true) {
              completed.textContent = ++count;
              done.textContent = ++increase;
              checkbox.style.backgroundColor = '#635fcf';
              checkbox.nextElementSibling.style.color = '#828fa3';
              checkbox.nextElementSibling.style.textDecoration = 'line-through';

            } else {
              completed.textContent = --count;
              done.textContent = --increase;
              if(colorScheme === false) {
                checkbox.style.backgroundColor = '#ffffff';
              } else {
                checkbox.style.backgroundColor = '#2b2c37';
              }
              checkbox.nextElementSibling.style.color = '#ffffff';
              checkbox.nextElementSibling.style.textDecoration = 'initial';
            }
            number.subtasks[index].isCompleted = checkbox.checked;
            localStorage.setItem("boards", JSON.stringify(boards));
          });
          checkbox.checked = number.subtasks[index].isCompleted;
          if(number.subtasks[index].isCompleted === true) {
            completed.textContent = ++count;
            done.textContent = ++increase;
            checkbox.style.backgroundColor = '#635fcf';
            checkbox.nextElementSibling.style.color = '#828fa3';
            checkbox.nextElementSibling.style.textDecoration = 'line-through';
          }
        })
      });

      taskDetailsBox.forEach((box, index) => {
        window.addEventListener('click', function(e) {
          if(e.target === box) {
            box.style.display = 'none';
            dotMenu[index].style.display = 'none';
          };
        });
      })
    });
    doingLength.textContent = `${board.doingColumn.length}`;

    const dotBtn = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#dot-btn');
    const dotMenu = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#dot-menu');
    const taskDetailsBox = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#task-details-container');
    const taskDetails = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#task-details');

    // DELETE TASK //

    dotBtn.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        if(e.target === btn) {
          dotMenu[index].style.display = 'block';
        }
      });

      window.addEventListener('click', (e) => {
        if(e.target !== btn) {
          dotMenu[index].style.display = 'none';
        }
      });

      // EDIT TASK //

      dotMenu[index].querySelector('#edit-task').addEventListener('click', () => {
        isUpdate = true;
        updateId = index;
        addBtn.click();
        taskDetailsBox[index].style.display = 'none';
        addtask.querySelector('h2').textContent = 'Edit Task';
        createTaskBtn.textContent = 'Save Changes';
        taskTitleTag.value = taskDetails[index].querySelector('h2').textContent;
        descTag.value = taskDetails[index].querySelector('p').textContent;
        addtask.querySelector('.sub-task').style.display = 'none';

        const subtask = taskDetails[index].querySelectorAll('#input');
        board.doingColumn[index].subtasks.forEach((tag, index) => {

          const subTaskDiv = document.querySelector('#subtask-div');

          // create elements //
          const div = document.createElement('div');
          const input = document.createElement('input');
          const deleteBtn = document.createElement('i');

          // add classes //
          div.classList.add('flex', 'justify-between', 'items-center', 'mt-4', 'sub');
          input.setAttribute('id', 'sub-task');
          input.setAttribute('type', 'text');
          input.setAttribute('minlength', '5');
          input.setAttribute('maxlength', '30');
          input.setAttribute('placeholder', 'e.g.Make Coffee');
          input.classList.add('px-4', 'py-2', 'text-xs', 'rounded-sm', 'bg-[#ffffff]', 'dark:bg-[#2b2c37]', 'border-[1.9px]', 'border-[#828fa3',   'border-opacity-20', 'text-[#000112]', 'dark:text-[#ffffff]','w-full',  'cursor-pointer', 'hover:border-[#635fcf]');
          if(colorScheme === false) {
            input.style.background = '#ffffff';
            input.style.color = '#000112';
          };
          if(colorScheme === true) {
            input.style.background = '#2b2c37';
            input.style.color = '#ffffff';
          };
          deleteBtn.classList.add('fa-solid', 'fa-xmark', 'ml-3', 'cursor-pointer', 'delete');
          deleteBtn.style.color = "#828fa3";
          deleteBtn.style.fontSize = "x-large";
          deleteBtn.setAttribute('id', 'delete');

          // append to document //
          div.appendChild(input);
          div.appendChild(deleteBtn);
          subTaskDiv.append(div);
          
          input.value = subtask[index].textContent;
        });

        statusMenu.querySelector('.todo').style.display = 'none';
        statusMenu.querySelector('.done').style.display = 'none';
      });

      dotMenu[index].querySelector('#deletetask').addEventListener('click', () => {
        document.querySelector('#delete-task-alert-container').style.display = 'block';
        taskDetailsBox[index].style.display = 'none';

        document.querySelector('#delete-task').addEventListener('click', () => {
          board.doingColumn.splice(index, 1);
          localStorage.setItem("boards", JSON.stringify(boards));
          document.querySelector('#delete-task-alert-container').style.display = 'none';
          showDoingTask();
        })
      });
    });

    const btnTwo = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#btn-two');
    const statusMenuTwo = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list').querySelectorAll('#status-menu-two');

    btnTwo.forEach((btn, index) => {
      const doingTasks = doingList.querySelectorAll('#doing-task');

      btn.addEventListener('click', (e) => {
        if(e.target === btn) {
          statusMenuTwo[index].style.display = 'block';
        }
      })
      statusMenuTwo[index].addEventListener('click', (e) => {
        if(e.target.matches('li')){
          btn.textContent = e.target.textContent;
          statusMenuTwo[index].style.display = 'none';

          if(btn.textContent === 'Todo') {
            todoList.insertAdjacentElement('beforeend', doingTasks[index]);
            board.todoColumn.push(board.doingColumn[index]);
            board.doingColumn.splice(index, 1);
            localStorage.setItem("boards", JSON.stringify(boards));
            window.location.reload();
          }
          else if(btn.textContent === 'Done') {
            doneList.insertAdjacentElement('beforeend', doingTasks[index]);
            board.doneColumn.push(board.doingColumn[index]);
            board.doingColumn.splice(index, 1);
            localStorage.setItem("boards", JSON.stringify(boards));
            window.location.reload();
          }
        }
      })
    })
  };


  // DONE TASK FUNCTION FOR EACH BOARD //

  function showDoneTask() {
    const doneList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list');
    const doingList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#doing-list');
    const todoList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#todo-list');
    const doneLength = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#div-three span');
    doneList.querySelectorAll('#done-task').forEach(task => task.remove());
    doneList.querySelectorAll('#task-details-container').forEach(detail => detail.remove());

    let board = boards[currentBoard];
    board.doneColumn.forEach((column, index) => {
      if(colorScheme === false) {
        let doneTag = `
          <li id="done-task" class="bg-[#ffffff] w-full px-4 py-5 rounded-md text-sm">
            <h4 id="task-title" class="text-[#000112] hover:text-[#635fcf]">${board.doneColumn[index].title}</h4>
            <p class="text-[#828fa3] text-sm"><span id="done">0</span> of <span id="subtasks">0</span> subtasks</p>
          </li>
        `;
        doneList.insertAdjacentHTML("beforeend", doneTag);

        let details = `
          <section id="task-details-container" class="absolute z-[1000] hidden">
            <div id="task-details" class="text-[#000112] p-8 bg-[#ffffff] rounded-md absolute z-[1000]">
              <div class="flex justify-between">
                <h2 id="title" class="text-base">${board.doneColumn[index].title}</h2>
                <i id="dot-btn" class="fa-solid fa-ellipsis-vertical cursor-pointer"
                style="color: #828fa3; font-size: x-large;"></i>
              </div>
              <div>
                <p id="description" class="mt-[24px] text-xs font-semibold text-[#828fa3]">${board.doneColumn[index].desc}</p>
              </div>
              <div class="mt-[24px]">
                <label for="subtasks" class="text-[#828fa3] text-xs font-semibold">Subtasks (<span id="completed">0</span> of <span id="subtask">0</span>)</label>
              </div>
              <ul id="subtask-list" class="text-xs">
              </ul>
              <div>
                <div class="mt-[24px]">
                  <label for="status" class="text-[#828fa3] text-xs">Current Status</label>
                </div>
                <div id="btn-two"
                class="flex justify-between px-4 py-2 text-xs rounded-sm bg-[#ffffff] border-[1.9px] border-[#828fa3] border-opacity-20 mt-2 hover:border-[#635fcf] cursor-pointer">
                  <p>Done</p>
                  <div class="">
                    <i class="fa-solid fa-angle-down" style="color: #635fcf; font-size: large;"></i>
                  </div>
                </div>
                <section id="status-menu-two" class="relative z-[1000] text-xs hidden">
                  <div class="bg-[#ffffff] absolute w-full top-1 rounded-sm border-[1.8px] border-[#828fa3] border-opacity-20 py-1 text-[#828fa3]">
                    <ul>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Todo</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Doing</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Done</li>
                    </ul>
                  </div>
                </section>
                <div id="dot-menu"
                class="bg-[#ffffff] rounded-md py-2 text-xs font-normal w-1/3 absolute z-[1000] hidden">
                  <ul>
                    <li id="edit-task" class="text-[#828fa3] my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Edit Task</li>
                    <li id="deletetask" class="text-red-500 my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Delete Task</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        `;
        doneList.insertAdjacentHTML("beforeend", details);
      };

      if(colorScheme === true) {
        let doneTag = `
          <li id="done-task" class="bg-[#2b2c37] w-full px-4 py-5 rounded-md text-sm" style="background: #2b2c37";>
            <h4 id="task-title" class="text-[#ffffff] hover:text-[#635fcf]">${board.doneColumn[index].title}</h4>
            <p class="text-[#828fa3] text-sm"><span id="done">0</span> of <span id="subtasks">0</span> subtasks</p>
          </li>
        `;
        doneList.insertAdjacentHTML("beforeend", doneTag);

        let details = `
          <section id="task-details-container" class="absolute z-[1000] hidden">
            <div id="task-details" class="text-[#ffffff] p-8 bg-[#2b2c37] rounded-md absolute z-[1000]" style="background: #2b2c37";>
              <div class="flex justify-between">
                <h2 id="title" class="text-base">${board.doneColumn[index].title}</h2>
                <i id="dot-btn" class="fa-solid fa-ellipsis-vertical cursor-pointer"
                style="color: #828fa3; font-size: x-large;"></i>
              </div>
              <div>
                <p id="description" class="mt-[24px] text-xs font-semibold text-[#828fa3]">${board.doneColumn[index].desc}</p>
              </div>
              <div class="mt-[24px]">
                <label for="subtasks" class="text-[#828fa3] text-xs font-semibold">Subtasks (<span id="completed">0</span> of <span id="subtask">0</span>)</label>
              </div>
              <ul id="subtask-list" class="text-xs">
              </ul>
              <div>
                <div class="mt-[24px]">
                  <label for="status" class="text-[#828fa3] text-xs">Current Status</label>
                </div>
                <div id="btn-two"
                class="flex justify-between px-4 py-2 text-xs rounded-sm bg-[#2b2c37] border-[1.9px] border-[#828fa3] border-opacity-20 mt-2 hover:border-[#635fcf] cursor-pointer">
                  <p>Done</p>
                  <div class="">
                    <i class="fa-solid fa-angle-down" style="color: #635fcf; font-size: large;"></i>
                  </div>
                </div>
                <section id="status-menu-two" class="relative z-[1000] text-xs hidden">
                  <div class="bg-[#2b2c37] absolute w-full top-1 rounded-sm border-[1.8px] border-[#828fa3] border-opacity-20 py-1 text-[#828fa3]" style="background: #2b2c37";>
                    <ul>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Todo</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Doing</li>
                      <li class="px-4 py-2 hover:bg-[#63cfcf] hover:bg-opacity-20 cursor-pointer">Done</li>
                    </ul>
                  </div>
                </section>
                <div id="dot-menu"
                class="bg-[#20212c] rounded-md py-2 text-xs font-normal w-1/3 absolute z-[1000] hidden" style="background: #20212c";>
                  <ul>
                    <li id="edit-task" class="text-[#828fa3] my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Edit Task</li>
                    <li id="deletetask" class="text-red-500 my-2 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 px-3 py-1">Delete Task</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        `;
        doneList.insertAdjacentHTML("beforeend", details);
      };

      const subtaskList = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#subtask-list');

      column.subtasks.forEach((task) => {
        if(colorScheme === false) {
        let subtasks = `
          <label id="sub-task" class="px-4 py-2 rounded-sm bg-[#f4f7fd] mt-4 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 flex items-center">
            <input id="checkbox" type="checkbox" name="subtask" value="${task.title}" class="mr-2" style="background-color: #ffffff;">
            <p id="input">${task.title}</p>
          </label>
        `;
        subtaskList[index].insertAdjacentHTML("beforeend", subtasks); 
        }
        if(colorScheme === true) {
          let subtasks = `
            <label id="sub-task" class="px-4 py-2 rounded-sm bg-[#20212c] mt-4 cursor-pointer hover:bg-[#63cfcf] hover:bg-opacity-20 flex items-center" style="background: #20212c";>
              <input id="checkbox" type="checkbox" name="subtask" value="${task.title}" class="mr-2" style="background-color: #2b2c37;">
              <p id="input">${task.title}</p>
            </label>
          `;
          subtaskList[index].insertAdjacentHTML("beforeend", subtasks);
        }
      });

      // UPDATES SUBTASKS LENGTH //

      const subtasksLength = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelectorAll('#done-task #subtasks');

      subtasksLength.forEach((subtasks, index) => {
        subtasks.textContent = `${board.doneColumn[index].subtasks.length}`;
      });

      // TASK DETAILS //

      const taskTitles = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelectorAll('#done-task h4');
      const taskDetailsBox = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#task-details-container');
      const taskDetails = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#task-details');
      const dotMenu = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#dot-menu');
      const subtaskLength = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#subtask');

      taskTitles.forEach((title, index) => {

        const doneTasks = doneList.querySelectorAll('#done-task');
        let done = doneTasks[index].querySelector('#done');
        let increase = 0;
        let number = board.doneColumn[index];

        title.addEventListener('click', () => {
          taskDetailsBox[index].style.display = 'block';
        });

        subtaskLength.forEach((subtask, index) => {
          subtask.textContent = `${board.doneColumn[index].subtasks.length}`;
        });

        // CHECKBOX STATUS OF SUBTASKS //

        let checkBox = taskDetails[index].querySelector('#subtask-list').querySelectorAll('input');
        let completed = taskDetails[index].querySelector('#completed');
        let count = 0;
        checkBox.forEach((checkbox, index) => {
          checkbox.addEventListener('change', () => {
            if(checkbox.checked === true) {
              completed.textContent = ++count;
              done.textContent = ++increase;
              checkbox.style.backgroundColor = '#635fcf';
              checkbox.nextElementSibling.style.color = '#828fa3';
              checkbox.nextElementSibling.style.textDecoration = 'line-through';

            } else {
              completed.textContent = --count;
              done.textContent = --increase;
              if(colorScheme === false) {
                checkbox.style.backgroundColor = '#ffffff';
              } else {
                checkbox.style.backgroundColor = '#2b2c37';
              }
              checkbox.nextElementSibling.style.color = '#ffffff';
              checkbox.nextElementSibling.style.textDecoration = 'initial';
            }
            number.subtasks[index].isCompleted = checkbox.checked;
            localStorage.setItem("boards", JSON.stringify(boards));
          });
          checkbox.checked = number.subtasks[index].isCompleted;
          if(number.subtasks[index].isCompleted === true) {
            completed.textContent = ++count;
            done.textContent = ++increase;
            checkbox.style.backgroundColor = '#635fcf';
            checkbox.nextElementSibling.style.color = '#828fa3';
            checkbox.nextElementSibling.style.textDecoration = 'line-through';
          }
        })
      });

      taskDetailsBox.forEach((box, index) => {
        window.addEventListener('click', function(e) {
          if(e.target === box) {
            box.style.display = 'none';
            dotMenu[index].style.display = 'none';
          };
        });
      })
    });
    doneLength.textContent = `${board.doneColumn.length}`;

    const dotBtn = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#dot-btn');
    const dotMenu = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#dot-menu');
    const taskDetailsBox = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#task-details-container');
    const taskDetails = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#task-details');

    dotBtn.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        if(e.target === btn) {
          dotMenu[index].style.display = 'block';
        }
      });

      window.addEventListener('click', (e) => {
        if(e.target !== btn) {
          dotMenu[index].style.display = 'none';
        }
      });

      // EDIT TASK //

      dotMenu[index].querySelector('#edit-task').addEventListener('click', () => {
        isUpdate = true;
        updateId = index;
        addBtn.click();
        taskDetailsBox[index].style.display = 'none';
        addtask.querySelector('h2').textContent = 'Edit Task';
        createTaskBtn.textContent = 'Save Changes';
        taskTitleTag.value = taskDetails[index].querySelector('h2').textContent;
        descTag.value = taskDetails[index].querySelector('p').textContent;
        addtask.querySelector('.sub-task').style.display = 'none';

        const subtask = taskDetails[index].querySelectorAll('#input');
        board.doneColumn[index].subtasks.forEach((tag, index) => {

          const subTaskDiv = document.querySelector('#subtask-div');

          // create elements //
          const div = document.createElement('div');
          const input = document.createElement('input');
          const deleteBtn = document.createElement('i');

          // add classes //
          div.classList.add('flex', 'justify-between', 'items-center', 'mt-4','sub');
          input.setAttribute('id', 'sub-task');
          input.setAttribute('type', 'text');
          input.setAttribute('minlength', '5');
          input.setAttribute('maxlength', '30');
          input.setAttribute('placeholder', 'e.g.Make Coffee');
          input.classList.add('px-4', 'py-2', 'text-xs', 'rounded-sm', 'border-[1.9px]', 'border-[#828fa3', 'border-opacity-20','w-full',  'cursor-pointer', 'hover:border-[#635fcf]');
          if(colorScheme === false) {
            input.style.background = '#ffffff';
            input.style.color = '#000112';
          };
          if(colorScheme === true) {
            input.style.background = '#2b2c37';
            input.style.color = '#ffffff';
          };
          deleteBtn.classList.add('fa-solid', 'fa-xmark', 'ml-3', 'cursor-pointer', 'delete');
          deleteBtn.style.color = "#828fa3";
          deleteBtn.style.fontSize = "x-large";
          deleteBtn.setAttribute('id', 'delete');

          // append to document //
          div.appendChild(input);
          div.appendChild(deleteBtn);
          subTaskDiv.append(div);
          
          input.value = subtask[index].textContent;
        });

        statusMenu.querySelector('.todo').style.display = 'none';
        statusMenu.querySelector('.doing').style.display = 'none';
      });

      // DELETE TASK //

      dotMenu[index].querySelector('#deletetask').addEventListener('click', () => {
        document.querySelector('#delete-task-alert-container').style.display = 'block';
        taskDetailsBox[index].style.display = 'none';

        document.querySelector('#delete-task').addEventListener('click', () => {
          board.doneColumn.splice(index, 1);
          localStorage.setItem("boards", JSON.stringify(boards));
          document.querySelector('#delete-task-alert-container').style.display = 'none';
          showDoneTask();
        })
      });
    });

    const btnTwo = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#btn-two');
    const statusMenuTwo = document.querySelector(`#task-board[data-tab="${currentBoard}"]`).querySelector('#done-list').querySelectorAll('#status-menu-two');

    btnTwo.forEach((btn, index) => {
      const doneTasks = doneList.querySelectorAll('#done-task');

      btn.addEventListener('click', (e) => {
        if(e.target === btn) {
          statusMenuTwo[index].style.display = 'block';
        }
      })
      statusMenuTwo[index].addEventListener('click', (e) => {
        if(e.target.matches('li')){
          btn.textContent = e.target.textContent;
          statusMenuTwo[index].style.display = 'none';

          if(btn.textContent === 'Todo') {
            todoList.insertAdjacentElement('beforeend', doneTasks[index]);
            board.todoColumn.push(board.doneColumn[index]);
            board.doneColumn.splice(index, 1);
            localStorage.setItem("boards", JSON.stringify(boards));
            window.location.reload();
          }
          else if(btn.textContent === 'Doing') {
            doingList.insertAdjacentElement('beforeend', doneTasks[index]);
            board.doneColumn.push(board.doingColumn[index]);
            board.doingColumn.splice(index, 1);
            localStorage.setItem("boards", JSON.stringify(boards));
            window.location.reload();
          }
        }
      })
    })
  };


  // CREATE NEW TASKS MENU //

  const addBtn = document.querySelector('#add-btn');
  const addtask = document.querySelector('#add-task');
  const addTask = document.querySelector('#add-task-container');
  const boardTitles = document.querySelectorAll('#board-title');
  addTaskForm = document.forms['add-task-form'];
  taskTitleTag = addTaskForm.querySelector('#task-title-input');
  descTag = addTaskForm.querySelector('textarea');
  subTaskTag = addTaskForm.querySelectorAll('#sub-task');
  createTaskBtn = addTaskForm.querySelector('#create-task-btn');
  const subTaskDiv = document.querySelector('#subtask-div');


  addBtn.addEventListener('click', function() {
    taskTitleTag.focus();
    addTask.style.display = 'block';
    subTaskDiv.querySelector('.sub-task').style.display = 'flex';
    subTaskDiv.querySelectorAll('.sub').forEach(detail => detail.remove());
    subTaskDiv.querySelectorAll('.subtaskk').forEach(detail => detail.remove());
    subTaskDiv.querySelectorAll('.subtaskk').forEach(detail => detail.style.display = 'none');
    addtask.querySelector('h2').textContent = 'Add New Task';
    createTaskBtn.textContent = 'Create Task';
    statusMenu.style.display - 'none';
    statusTag.textContent = 'Select Status';

    // ADD SUBTASKS //
    const subTaskBtn = document.querySelector('.subtask-btn');

    subTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // create elements //
      const div = document.createElement('div');
      const input = document.createElement('input');
      const deleteBtn = document.createElement('i');

      // add classes //
      div.classList.add('flex', 'justify-between', 'items-center', 'mt-4',  'subtaskk');
      input.setAttribute('id', 'sub-task');
      input.setAttribute('type', 'text');
      input.setAttribute('minlength', '5');
      input.setAttribute('maxlength', '100');
      input.setAttribute('placeholder', 'e.g.Make Coffee');
      input.classList.add('px-4', 'py-2', 'text-xs', 'rounded-sm', 'bg-[#ffffff]', 'dark:bg-[#2b2c37]', 'border-[1.9px]', 'border-[#828fa3',   'border-opacity-20', 'text-[#000112]', 'dark:text-[#ffffff]','w-full',  'cursor-pointer', 'hover:border-[#635fcf]');
      deleteBtn.classList.add('fa-solid', 'fa-xmark', 'ml-3', 'cursor-pointer', 'delete');
      if(colorScheme === false) {
        input.style.background = '#ffffff';
        input.style.color = '#000112';
      };
      if(colorScheme === true) {
        input.style.background = '#2b2c37';
        input.style.color = '#ffffff';
      };
      window.addEventListener('click', function(e) {
        if(e.target === addTask) {
          div.style.display = 'none';
        };
      });
      deleteBtn.style.color = "#828fa3";
      deleteBtn.style.fontSize = "x-large";
      deleteBtn.setAttribute('id', 'delete');

      // append to document //
      div.appendChild(input);
      div.appendChild(deleteBtn);
      subTaskDiv.append(div);
    });
    subTaskDiv.querySelectorAll('.subtaskk').forEach(detail => detail.style.display = 'none');

    // DELETE SUBTASKS //

    subTaskDiv.addEventListener('click', function (e) {
      if (e.target.id == 'delete') {
        subTaskDiv.removeChild(e.target.parentElement);
      }
    });
    statusMenu.querySelector('.todo').style.display = 'block';
    statusMenu.querySelector('.doing').style.display = 'block';
    statusMenu.querySelector('.done').style.display = 'block';

    // CREATE TASK BTN

    createTaskBtn.addEventListener('click', e => {
      e.preventDefault();

      let board = boards[currentBoard];

      subTaskTag = addTaskForm.querySelectorAll('#sub-task');
      let taskTitle = taskTitleTag.value;
      let taskDesc = descTag.value;
      let task = {
        title: taskTitle,
        desc: taskDesc,
        subtasks: []
      };
      subTaskTag.forEach((subtask) => {
        if(subtask.value !== "") {
          let subtasks = {
            title: subtask.value,
            isCompleted: false
          }
          task.subtasks.push(subtasks);
        }
      });

      if(statusTag.textContent === "Todo") {
        if(!isUpdate) {
          board.todoColumn.push(task);
        } else {
          isUpdate = false;
          board.todoColumn[updateId] = task; //updating specific task
        }
        showTodoTask();
      }
      else if(statusTag.textContent === "Doing") {
        if(!isUpdate) {
          board.doingColumn.push(task);
        } else {
          isUpdate = false;
          board.doingColumn[updateId] = task; //updating specific task
        }
        showDoingTask();
      }
      else if(statusTag.textContent === "Done") {
        if(!isUpdate) {
          board.doneColumn.push(task);
        } else {
          isUpdate = false;
          board.doneColumn[updateId] = task; //updating specific task
        }
        showDoneTask();
      };

      boards[currentBoard] = board //overwrite previous board

      localStorage.setItem("boards", JSON.stringify(boards));

      addTask.style.display = 'none';
      taskTitleTag.value = "";
      descTag.value = "";
      subTaskTag.forEach((subtask) => {
        subtask.value = ""
      });
      statusTag.textContent = 'Select Status';
      subTaskDiv.querySelectorAll('.subtaskk').forEach(detail => detail.remove());
    });
  });

  window.addEventListener('click', function(e) {
    if(e.target === addTask) {
      isUpdate = false;
      addTask.style.display = 'none';
      addtask.querySelector('h2').textContent = 'Add New Task';
      createTaskBtn.textContent = 'Create Task';
      statusMenu.style.display - 'none';
      statusTag.textContent = 'Select Status';
      subTaskDiv.querySelectorAll('.subtaskk').forEach(detail => detail.remove());
    };
  });


  // STATUS MENU(TODO, DOING, DONE) //

  statusBtnOne = document.querySelector('#status-btn-one');
  statusTag = statusBtnOne.querySelector('p');
  statusMenu = document.querySelector('#status-menu');

  statusMenu.querySelector('ul').addEventListener('click', e => {
    if(e.target.matches('li')) {
      statusTag.textContent = e.target.textContent;
      statusMenu.style.display = 'none';
    }
  });

  const selectStatus = () => {
    statusMenu.style.display = 'block';
  };
  statusBtnOne.addEventListener('click', selectStatus);


  // MEDIA QUERY //

  let query = window.matchMedia("(max-width: 720px)");
  let queryOne = window.matchMedia("(max-width: 1080px)");

  const title = document.querySelector('#title');
  const mobileLogo = document.querySelector('.logo img');
  const header = document.querySelector('header section');
  const titleContainer = document.querySelector('.title');
  const titleDiv = document.querySelector('.title div');
  const side = document.querySelector('.side');

  if (query.matches) {
    addBtn.innerHTML = '<i class="fa-solid fa-plus" style="color:#ffffff; "></i>'
    addBtn.classList.remove('px-6', 'py-3');  
    addBtn.classList.add('px-4', 'py-1');  
    sideOpenBtn.style.display = 'none';
    mobileLogo.setAttribute('src', './img/logo-mobile.9b60a582.svg');
    titleContainer.style.flex = '0';
    titleContainer.classList.remove('ml-2');
    titleDiv.classList.remove('hidden');
    titleDiv.classList.add('block');
    title.classList.remove('text-2xl');
    title.classList.add('text-base', 'cursor-pointer');
    header.style.height = '64px';
    dotBoardBtn.classList.remove('ml-5');
    dotBoardBtn.classList.add('ml-3');
    sideBar.classList.remove('bg-[#ffffff]', 'dark:bg-[#2b2c37]',   'border-r-[1.8px]', 'border-[#828fa3]', 'border-opacity-20');
    sideBar.querySelector('.sidebar-logo').style.display = 'none';
    side.classList.add('bg-[#ffffff]', 'dark:bg-[#2b2c37]','rounded-md');
    title.addEventListener('click', function() {
      sideBar.style.display = 'block';
    });
    sideCloseBtn.style.display = 'none';

    window.addEventListener('click', function(e) {
      if(e.target === sideBar) {
        sideBar.style.display = 'none';
        taskBoard.forEach((taskboard) => {
          taskboard.style.marginLeft = 'auto';
        });
      };
    });

    const toggleLightMode = document.querySelector('.fa-sun');
    const toggleDarkMode = document.querySelector('.fa-moon');

    toggleLightMode.addEventListener('click', () => {
      side.style.background = '#ffffff';
    });
    toggleDarkMode.addEventListener('click', () => {
      side.style.background = '#2b2c37';
    });
  };

  if (queryOne.matches) {
    const titleContainer = document.querySelector('.title');
    const taskBoard = document.querySelectorAll('#task-board');
    titleContainer.classList.remove('ml-2');
    sideOpenBtn.addEventListener('click', function() {
      sideBar.style.display = 'block';
      taskBoard.forEach((taskboard) => {
        taskboard.style.marginLeft = '259px';
      });
    });
    if(sideOpenBtn.click()) {
      taskBoard.forEach((taskboard) => {
        taskboard.style.marginLeft = '259px';
      });
    }
  };


  // COLOR SCHEME: LIGHT AND DARK MODE // 

  const toggleLightMode = document.querySelector('.fa-sun');
  const toggleDarkMode = document.querySelector('.fa-moon');

  
  // LIGHT MODE //

  function lightMode() {
    body.style.background = '#ffffff';
    side.style.background = '#ffffff';
    toggleLightMode.style.background = '#635fcf';
    toggleLightMode.style.color = '#ffffff';
    toggleDarkMode.style.color = '#828fa3';
    taskBoard.forEach((taskboard) => {
      taskboard.style.background = '#f4f7fd';
      taskboard.style.transition = 'all .2s ease';
    });
    sideBar.style.background = '#ffffff';
    sideBar.style.transition = 'all .2s ease';
    dotBoardMenu.style.background = '#ffffff';
    addBoard.style.background = '#ffffff';
    addBoard.querySelector('h2').style.color = '#000112';
    addBoard.querySelector('input').style.background = '#ffffff';
    addBoard.querySelector('input').style.color = '#000112';
    statusBtnOne.style.background = '#ffffff';
    statusMenu.querySelector('div').style.background = '#ffffff';
    statusTag.style.color = '#000112';
    deleteAlert.querySelector('#delete-alert').style.background = '#ffffff';
    document.querySelector('#delete-task-alert').style.background = '#ffffff'
    document.querySelector('#add-task').style.background = '#ffffff';
    document.querySelector('#add-task').querySelector('textarea').style.background = '#ffffff';
    document.querySelector('#add-task').querySelector('textarea').style.color = '#000112';
    document.querySelector('#add-task').querySelector('h2').style.color = '#000112';
    document.querySelector('#add-task').querySelectorAll('input').forEach((input) => {
      input.style.background = '#ffffff';
      input.style.color = '#000112';
    })
    document.querySelector('header').style.background = '#ffffff';
    document.querySelectorAll('#todo-task').forEach((task) => {
      task.style.background = '#ffffff';
      task.querySelector('h4').style.transition = 'all .5s ease';
      task.querySelector('h4').style.color = '#000112';
    });
    document.querySelectorAll('#doing-task').forEach((task) => {
      task.style.background = '#ffffff';
      task.querySelector('h4').style.transition = 'all .5s ease';
      task.querySelector('h4').style.color = '#000112';
    });
    document.querySelectorAll('#done-task').forEach((task) => {
      task.style.background = '#ffffff';
      task.querySelector('h4').style.transition = 'all .5s ease';
      task.querySelector('h4').style.color = '#000112';
    });
    document.querySelectorAll('#task-details').forEach((details) => {
      details.style.background = '#ffffff';
      details.style.color = '#000112';
      details.querySelector('h2').style.color = '#000112';
      details.querySelector('#dot-menu').style.background = '#ffffff';
      details.querySelectorAll('#sub-task').forEach((subtask) => {
        subtask.style.background = '#f4f7fd';
      })
      details.querySelector('#btn-two').style.background = '#ffffff';
      details.querySelector('#status-menu-two div').style.background = '#ffffff';
    });
    header.querySelector('h1').style.color = '#000112';
    header.style.transition = 'all .5s ease';
    document.querySelector('#toggle-theme').style.background = '#f4f7fd';
    document.querySelector('#sidebar img').removeAttribute('src', './img/kanban-logo.svg');
    document.querySelector('#sidebar img').setAttribute('src', './img/kanban-logo-light.svg');
    document.querySelector('header img').removeAttribute('src', './img/kanban-logo.svg');
    document.querySelector('header img').setAttribute('src', './img/kanban-logo-light.svg');
    let query = window.matchMedia("(max-width: 720px)");
    if(query.matches) {
      document.querySelector('header img').removeAttribute('src', './img/kanban-logo-light.svg');
      document.querySelector('header img').setAttribute('src', './img/logo-mobile.9b60a582.svg');
      sideBar.style.background = 'rgba(0, 0, 0, .1)';
      sideBar.style.backdropFilter = 'blur(3px)';
      body.style.background = '#ffffff'
    }
  };

  toggleLightMode.addEventListener('click', () => {
    colorScheme = false;
    localStorage.setItem("darkMode", JSON.stringify(colorScheme));
    lightMode();
    toggleDarkMode.style.background = '#f4f7fd';
  });

  if(colorScheme === false) {
    lightMode();
  };

  
  // DARK MODE //

  function darkMode() {
    body.style.background = '#2b2c37';
    side.style.background = '#2b2c37';
    toggleDarkMode.style.background = '#635fcf';
    toggleDarkMode.style.color = '#ffffff';
    toggleLightMode.style.color = '#828fa3';
    taskBoard.forEach((taskboard) => {
      taskboard.style.background = '#20212c';
      taskboard.style.transition = 'all .2s ease';
    });
    sideBar.style.background = '#2b2c37';
    sideBar.style.transition = 'all .2s ease';
    addBoard.style.background = '#2b2c37';
    dotBoardMenu.style.background = '#2b2c37';
    addBoard.querySelector('h2').style.color = '#ffffff';
    addBoard.querySelector('input').style.background = '#2b2c37';
    addBoard.querySelector('input').style.color = '#ffffff';
    statusBtnOne.style.background = '#2b2c37';
    statusMenu.querySelector('div').style.background = '#2b2c37';
    statusTag.style.color = '#ffffff';
    deleteAlert.querySelector('#delete-alert').style.background = '#2b2c37'
    document.querySelector('#delete-task-alert').style.background = '#2b2c37'
    document.querySelector('#add-task').style.background = '#2b2c37';
    document.querySelector('#add-task').querySelector('textarea').style.background = '#2b2c37';
    document.querySelector('#add-task').querySelector('h2').style.color = '#ffffff';
    document.querySelector('#add-task').querySelectorAll('input').forEach((input) => {
      input.style.background = '#2b2c37';
    })
    document.querySelector('header').style.background = '#2b2c37';
    document.querySelectorAll('#todo-task').forEach((task) => {
      task.style.background = '#2b2c37';
      task.querySelector('h4').style.transition = 'all .5s ease';
      task.querySelector('h4').style.color = '#ffffff';
    });
    document.querySelectorAll('#doing-task').forEach((task) => {
      task.style.background = '#2b2c37';
      task.querySelector('h4').style.transition = 'all .5s ease';
      task.querySelector('h4').style.color = '#ffffff';
    });
    document.querySelectorAll('#done-task').forEach((task) => {
      task.style.background = '#2b2c37';
      task.querySelector('h4').style.transition = 'all .5s ease';
      task.querySelector('h4').style.color = '#ffffff';
    });
    document.querySelectorAll('#task-details').forEach((details) => {
      details.style.background = '#2b2c37';
      details.style.color = '#ffffff';
      details.querySelector('h2').style.color = '#ffffff';
      details.querySelector('#dot-menu').style.background = '#2b2c37';
      details.querySelectorAll('#sub-task').forEach((subtask) => {
        subtask.style.background = '#20212c';
      })
      details.querySelector('#btn-two').style.background = '#2b2c37';
      details.querySelector('#status-menu-two div').style.background = '#2b2c37';
    });
    header.querySelector('h1').style.color = '#ffffff';
    header.style.transition = 'all .5s ease';
    document.querySelector('#toggle-theme').style.background = '#20212c';
    document.querySelector('#sidebar img').setAttribute('src', './img/kanban-logo.svg');
    document.querySelector('header img').setAttribute('src', './img/kanban-logo.svg');

    let query = window.matchMedia("(max-width: 720px)");
    if(query.matches) {
      document.querySelector('header img').removeAttribute('src', './img/kanban-logo.svg');
      document.querySelector('header img').setAttribute('src', './img/logo-mobile.9b60a582.svg');
      sideBar.style.background = 'rgba(0, 0, 0, .1)';
      sideBar.style.backdropFilter = 'blur(3px)';
      body.style.background = '#2b2c37'
    }
  };

  toggleDarkMode.addEventListener('click', () => {
    colorScheme = true;
    localStorage.setItem("darkMode", JSON.stringify(colorScheme));
    darkMode();
    toggleLightMode.style.background = '#20212c';
  });

  if(colorScheme === true) {
    darkMode();
  }
}
document.addEventListener('DOMContentLoaded', initApp)
