document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  addTaskBtn.addEventListener("click", addTask);

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);

    taskInput.value = "";
  }

  function createTaskItem(taskText) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskItem.classList.add("task-item");

    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit";
    editIcon.addEventListener("click", editTask);
    taskItem.appendChild(editIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.addEventListener("click", deleteTask);
    taskItem.appendChild(deleteIcon);

    taskItem.addEventListener("click", toggleTaskStatus);

    return taskItem;
  }

  function toggleTaskStatus(event) {
    const taskItem = event.target;
    if (taskItem.tagName === "I") return;

    taskItem.classList.toggle("completed");
  }

  function editTask(event) {
    event.stopPropagation();

    const taskItem = event.target.parentElement;
    const currentText = taskItem.textContent;

    const newText = prompt("Edit task:", currentText);
    if (newText === null || newText.trim() === "") return;

    taskItem.textContent = newText.trim();

    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit";
    editIcon.addEventListener("click", editTask);
    taskItem.appendChild(editIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.addEventListener("click", deleteTask);
    taskItem.appendChild(deleteIcon);
  }

  function deleteTask(event) {
    event.stopPropagation();

    const taskItem = event.target.parentElement;
    taskItem.remove();
  }
});
