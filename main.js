let taskList = [
  {
    text: "Купить хлеб",
    isDone: false,
  },
  {
    text: "Погулять с собакой",
    isDone: false,
  },
  {
    text: "Навестить бабулю",
    isDone: false,
  },
  {
    text: "Прочитать книгу",
    isDone: true,
  },
];

let darkMode = false;

let buttonAdd = document.querySelector("#add");
let inputNew = document.querySelector("#inputNew");
let ulUndoneTask = document.querySelector("#ulTask");
let ulDoneTask = document.querySelector("#ulDoneTask");
let mode = document.querySelector("#mode");
let body = document.querySelector("body");

function renderList() {
  let undoneList = "";
  let doneList = "";
  for (idx in taskList) {
    if (!taskList[idx].isDone) {
      undoneList += `
        <li onclick='doneToggler(${idx})'>
          <input type='checkbox' id='${idx}'>
          <label for='${idx}'>
            ${taskList[idx].text}
          </label>
          <button onclick='deleteTask(event, ${idx})'>✖</button>
        </li>
      `;
    } else {
      doneList += `
        <li onclick='doneToggler(${idx})'>
          <input type='checkbox' id='${idx}' checked>
          <label for='${idx}'>
            ${taskList[idx].text}
          </label>
          <button onclick='deleteTask(event, ${idx})'>✖</button>
        </li>
      `;
    }
  }
  if (doneList === "") {
    doneList = "<p>Нет выполненных задач</p>";
  }
  if (undoneList === "") {
    undoneList = "<p>Нет активных задач</p>";
  }
  ulUndoneTask.innerHTML = undoneList;
  ulDoneTask.innerHTML = doneList;
}

function doneToggler(idx) {
  // пересоздание элемента для его постановки в конец списка
  let newIdx = taskList.length + 1;
  taskList[idx].isDone = !taskList[idx].isDone;
  taskList[newIdx] = taskList[idx];
  taskList.splice(idx, 1);
  renderList();
}

function addTask() {
  // проверка на пустоту input text
  if (!inputNew.value.length) {
    return;
  }
  let newTask = {
    text: inputNew.value,
    isDone: false,
  };
  inputNew.value = "";
  taskList.push(newTask);
  renderList();
}

function deleteTask(event, idx) {
  taskList.splice(idx, 1);
  event.stopPropagation();
  renderList();
}

function darkModeToggler() {
  if (darkMode) {
    body.classList.remove("body-dark");
    inputNew.classList.remove("input-dark");
    mode.classList.remove("mode-dark");
    mode.innerHTML = "☀";
    darkMode = !darkMode;
  } else {
    inputNew.classList.add("input-dark");
    body.classList.add("body-dark");
    mode.classList.add("mode-dark");
    mode.innerHTML = "🌙";
    darkMode = !darkMode;
  }
}

buttonAdd.onclick = addTask;

mode.onclick = darkModeToggler;

// ввод через enter
inputNew.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    addTask();
  }
});

renderList();
