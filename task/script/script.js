let taskDB = JSON.parse(localStorage.getItem("DB")) || [];

const tasks = document.getElementById("tasks");
const form = document.getElementById("task-add");
const input = form.querySelector("#input-add");
const btnSortByAlphabet = document.getElementById("sorting-alphabet");
const btnSortByTime = document.getElementById("sorting-time");

btnSortByAlphabet.addEventListener("click", () => {
  currentSortMode("taskContent");
  sorter("taskContent");
});

btnSortByTime.addEventListener("click", () => {
  currentSortMode("creationTime");
  sorter("creationTime");
});


// begin drag'n'drop
// tasks.addEventListener("dragstart", (e) => {
//   e.target.classList.add("js-selected");
// });

// tasks.addEventListener("dragend", (e) => {
//   e.target.classList.remove("js-selected");
//   updateDBfromTaskList();
// });

// tasks.addEventListener("dragover", (e) => {
//   e.preventDefault();

//   const selectedElement = tasks.querySelector(".js-selected");
//   const currentElement = e.target;

//   if (selectedElement !== currentElement && currentElement.classList.contains("js-task-item")) {

//     const nextElement =
//       currentElement === selectedElement.nextElementSibling ?
//       currentElement.nextElementSibling :
//       currentElement;

//     tasks.insertBefore(selectedElement, nextElement);
//   }
// });
// end drag'n'drop


form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    addTask();
    form.reset();
  }
});


// begin main
function buildTasksList() {
  tasks.innerHTML = "";

  taskDB.forEach((item) => {
    const elem = createHTMLElement(item);

    addListenerToElem(elem);

    tasks.append(elem);
  });
}


function createHTMLElement({taskContent, creationTime, checked}) {
  const elem = document.createElement("li");

  elem.className = "js-task-item";
  elem.draggable = true;
  elem.innerHTML = `
  <span class="js-task-content${checked ? " js-cross-text" : ""}" contenteditable></span>
    <div>
      <span class="js-task-time">${creationTime}</span>
      <input class="js-check-btn" type="checkbox" ${checked ? "checked" : ""}>
      <img class="js-delete" src="./icons/trash.svg" alt="delete" draggable="false">
    </div>`;
  elem.firstElementChild.insertAdjacentText("afterBegin", taskContent);

  return elem;
}


function addListenerToElem(elem) {
  const taskContent = elem.firstElementChild;
  taskContent.addEventListener("focusout", updateDBfromTaskList);

  taskContent.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "Escape") taskContent.blur();
  });

  elem.addEventListener("click", (e) => {
    if (e.target.matches(".js-check-btn")) checkItem(taskContent, e.target.checked);
    if (e.target.matches(".js-delete")) {
      elem.remove();
      updateDBfromTaskList();
    }
  });
}
// end main


function updateDBfromTaskList() {
  taskDB.length = 0;

  tasks.querySelectorAll(".js-task-item").forEach((item) => {
    taskDB.push({
      taskContent: item.querySelector(".js-task-content").innerText,
      creationTime: item.querySelector(".js-task-time").innerText,
      checked: item.querySelector(".js-check-btn").checked,
    });
  });

  localStorage.removeItem("sortFlag");
  
  currentSortMode();
  saveDB();
}


function setCreationTime() {
  const time = new Date();
  const verifyZero = (value) => value.toString().length === 1 ? `0${value}` : `${value}`;
  const year = time.getFullYear();
  const month = verifyZero(time.getMonth());
  const date = verifyZero(time.getDate());
  const hours = verifyZero(time.getHours());
  const minutes = verifyZero(time.getMinutes());

  return `${year}-${month}-${date} / ${hours}:${minutes}`;
}


function addTask() {
  const elem = createHTMLElement({
    taskContent: input.value,
    creationTime: setCreationTime(),
    checked: false
  });

  tasks.append(elem);

  addListenerToElem(elem);
  updateDBfromTaskList();
}


function checkItem(taskContent, checked) {
  const sortFlag = localStorage.getItem("sortFlag");
  
  checked
    ? taskContent.classList.add("js-cross-text")
    : taskContent.classList.remove("js-cross-text");

  updateDBfromTaskList();

  localStorage.setItem("sortFlag", sortFlag);

  currentSortMode();
}


function sorter(sortBy) {
  if (localStorage.getItem("sortFlag") === sortBy) {
    taskDB.reverse();
  }

  if (localStorage.getItem("sortFlag") !== sortBy) {
    taskDB.sort((x, y) => x[sortBy].localeCompare(y[sortBy]));
    localStorage.setItem("sortFlag", sortBy);
  }

  saveDB();
  buildTasksList();
}


function currentSortMode(arg) {
  const sortType = arg || localStorage.getItem("sortFlag");

  if (!sortType) {
    btnSortByTime.classList.remove("js-border");
    btnSortByAlphabet.classList.remove("js-border");
  }

  if (sortType === "taskContent") {
    btnSortByAlphabet.classList.add("js-border");
    btnSortByTime.classList.remove("js-border");
  }

  if (sortType === "creationTime") {
    btnSortByTime.classList.add("js-border");
    btnSortByAlphabet.classList.remove("js-border");
  }
}


function saveDB() {
  localStorage.setItem("DB", JSON.stringify(taskDB));
}


currentSortMode();
buildTasksList();