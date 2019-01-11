import {
  getTask,
  getTaskCounter,
  setTask,
  setTaskCounter,
  removeTask
} from "./localStorage.js";
import components from "./components.js";

function focusInputNewTodo() {
  document.getElementById("newTodoInput").focus();
}

// Deletes task if user double clicks on task
function deleteTask() {
  removeTask(this.id);
  setTaskCounter(Number(getTaskCounter()) - 1);
  document
    .getElementById("tasks_content")
    .getElementsByClassName("task")
    [this.id].remove();
  var j = Number(this.id),
    i = 0;
  for (j; j < Number(getTaskCounter()) + 1; j += 1) {
    localStorage.setItem("task_" + j, getTask(j + 1));
  }
  removeTask(getTaskCounter());
  for (i; i < Number(getTaskCounter()); i += 1) {
    document.getElementById("tasks_content").getElementsByClassName("task")[
      i
    ].id = i;
  }
}

// Shows task
function renderTask(task_number) {
  const task = components.Task(task_number, getTask(task_number));

  document
    .getElementById("tasks_content")
    .insertAdjacentHTML("beforeend", task);
}

// Adds task if user pressed enter and textfield isnt empty
function addTask(event) {
  if (event.keyCode === 13 && this.value !== "") {
    setTask(this.value);
    setTaskCounter(Number(getTaskCounter()) + 1);
    makeTask(this.value);
  }
}

function makeTask(value) {
  const newTodo = document.getElementById("newTodo");
  const newTodoInput = document.getElementById("newTodoInput");

  newTodo.className = "task";
  newTodo.removeAttribute("id");

  newTodoInput.readOnly = true;
  newTodoInput.removeAttribute("placeholder");
  newTodoInput.removeAttribute("id");
  newTodoInput.value = value;

  document
    .getElementById("main")
    .insertAdjacentHTML("beforeend", components.NewTodo());
  document.getElementById("newTodoInput").addEventListener("keyup", addTask);
  document.activeElement.blur();
}

// Loops through all saved tasks and shows them one by one
function renderTasks() {
  let i = 0;
  for (i; i < getTaskCounter(); i += 1) {
    renderTask(i);
  }
  const tasks = document.getElementsByClassName("task");
  Array.from(tasks).forEach(task => {
    task.addEventListener("dblclick", deleteTask);
  });
}

function toggleAddTodo() {
  const newTodo = document.getElementById("newTodo");

  newTodo.classList.toggle("new-todo-active");
  if (newTodo.classList.contains("new-todo-active")) {
    focusInputNewTodo();
  }
}

function main() {
  if (getTaskCounter() === null) {
    setTaskCounter(0);
  }
  renderTasks();
  document.getElementById("newTodoInput").addEventListener("keyup", addTask);
  document
    .getElementById("newTodoBtn")
    .addEventListener("click", toggleAddTodo);
}

main();
