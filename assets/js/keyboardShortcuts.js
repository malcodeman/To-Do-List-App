import localStorage from "./localStorage.js";

function selectTaskDownArrowShortcut() {
  const tasks = document.getElementsByClassName("task");

  for (let i = 0; i < tasks.length; ++i) {
    if (tasks[i].classList.contains("selected")) {
      if (i === tasks.length - 1) {
        return;
      }
      tasks[i].classList.remove("selected");
      tasks[i + 1].classList.add("selected");
      return;
    }
  }
  if (tasks.length > 0) {
    tasks[0].classList.add("selected");
  }
}

function selectTaskUpArrowShortcut() {
  const tasks = document.getElementsByClassName("task");

  for (let i = 0; i < tasks.length; ++i) {
    if (tasks[i].classList.contains("selected")) {
      if (i === 0) {
        return;
      }
      tasks[i].classList.remove("selected");
      tasks[i - 1].classList.add("selected");
      return;
    }
  }
  if (tasks.length > 0) {
    tasks[tasks.length - 1].classList.add("selected");
  }
}

function removeTask() {
  const tasks = document.getElementsByClassName("task");

  Array.from(tasks).forEach(task => {
    if (task.classList.contains("selected")) {
      task.remove();
      localStorage.removeTask(task.dataset.id);
    }
  });
}

export default {
  selectTaskDownArrowShortcut,
  selectTaskUpArrowShortcut,
  removeTask
};