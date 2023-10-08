//imports
import { TodoModule } from "./TodoModule.js";

//Dom Elements
const html = document.documentElement;
const themeBtn = document.querySelector(".toggle-btn");
const allTodoContainers = document.querySelectorAll(".items");
const allTodoItems = document.querySelector(".all");
const completedTodoItems = document.querySelector(".completed");
const activeTodoItems = document.querySelector(".active");
const todoInput = document.querySelector("#ToDoItem");
const addBtn = document.getElementById("add-btn");
const emptyList = document.querySelector(".emptyList");
const viewOptions = document.querySelector(".view-options");
const todosLeft = document.querySelector("#items-left");
const clearCompletedBtn = document.getElementById("clear-completed");

//Functions
function toggleThemes(e) {
  const theme = html.dataset.theme;
  if (theme == "light") {
    e.target.src = "assets/icon-sun.svg";
    e.target.alt = "Sun image";
    html.dataset.theme = "dark";
  } else if (theme == "dark") {
    e.target.src = "assets/icon-moon.svg";
    e.target.alt = "Moon image";
    html.dataset.theme = "light";
  }
}

// animation for when a todo item is deleted
function deleteItem(element) {
  element.style.opacity = "0";
  setTimeout(() => {
    element.remove();
  }, 300); // Wait for the animation duration (in milliseconds)
}

//removes the todo item when the button with the x image is clicked
function removeTodo(e) {
  const todoItemRemoveBtn = e.target.closest(".remove");
  if (todoItemRemoveBtn) {
    deleteItem(todoItemRemoveBtn.parentElement);
    TodoModule.remove(todoItemRemoveBtn.parentElement.id);
    updateTodosLeft();
    toggleEmptyDisplay();
  }
}

//remove completed todoItems from the array and screen
function clearCompletedTodos() {
  if (activeTodoItems.classList.contains("showDisplay")) {
    const completedIds = TodoModule.completedTodoIds();
    const container = allTodoItems.classList.contains("showDisplay") ? completedTodoItems : allTodoItems;
    container.querySelectorAll("li").forEach((todo) => {
      if (completedIds.includes(Number(todo.id))) {
        deleteItem(todo);
      }
    });
    TodoModule.removeCompleted();
    toggleEmptyDisplay();
  }
}

// toggle checkmark for list item
function toggleComplete(e) {
  const checkbtn = e.target.closest(".circle");
  if (checkbtn) {
    TodoModule.changeStatus(checkbtn.parentElement.id);
    const computedStyle = window.getComputedStyle(checkbtn.children[0]);
    const displayValue = computedStyle.getPropertyValue("display");
    if (displayValue == "inline") {
      checkbtn.children[0].style.display = "none";
    } else {
      checkbtn.children[0].style.display = "inline";
    }
    checkbtn.parentElement.classList.toggle("strike-todo");
    updateTodosLeft();
  }
}
//populate todoList with the todoList data from local storage if any exists
function populateTodoList() {
  if (true) {
    TodoModule.getTodoList().forEach((todoItem) => initialTodoAdd(todoItem));
  }
}

function initialTodoAdd(todoItem) {
  const { task, completed, id } = todoItem;
  console.log(task, completed, id);
  let newTodoItem = document.createElement("li");
  newTodoItem.id = id;
  let circle = document.createElement("span");
  circle.classList.add("circle");
  let checkImage = document.createElement("img");
  checkImage.src = "assets/icon-check.svg";
  checkImage.style.display = completed == false ? "none" : "inline";
  if (completed) newTodoItem.classList.add("strike-todo");
  circle.appendChild(checkImage);
  newTodoItem.appendChild(circle);
  let todo = document.createElement("div");
  todo.classList.add("todo");
  todo.innerText = task;
  newTodoItem.appendChild(todo);
  let removeBtn = document.createElement("button");
  removeBtn.classList.add("remove");
  let crossImg = document.createElement("img");
  crossImg.src = "assets/icon-cross.svg";
  removeBtn.appendChild(crossImg);
  newTodoItem.appendChild(removeBtn);
  allTodoItems.appendChild(newTodoItem);
  updateTodosLeft();
}
// Takes input from the user to create a todo item, which is then added to the todo item list
function addTodo(e) {
  if ((e.key === "Enter" || e.keyCode === 13 || e.target.id == "add-btn") && todoInput.value != "") {
    // add created todoItem to the list in TodoModule
    const todoItem = TodoModule.append(todoInput.value);
    //create todoItem element for the DOM
    let newTodoItem = document.createElement("li");
    newTodoItem.id = todoItem.id;
    let circle = document.createElement("span");
    circle.classList.add("circle");
    let checkImage = document.createElement("img");
    checkImage.src = "assets/icon-check.svg";
    checkImage.style.display = "none";
    circle.appendChild(checkImage);
    newTodoItem.appendChild(circle);
    let todo = document.createElement("div");
    todo.classList.add("todo");
    todo.innerText = todoInput.value;
    newTodoItem.appendChild(todo);
    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    let crossImg = document.createElement("img");
    crossImg.src = "assets/icon-cross.svg";
    removeBtn.appendChild(crossImg);
    newTodoItem.appendChild(removeBtn);
    activeTodoItems.classList.contains("showDisplay")
      ? allTodoItems.appendChild(newTodoItem)
      : activeTodoItems.appendChild(newTodoItem);
    toggleEmptyDisplay();
    todoInput.value = ""; // clears the input for the todo item
    updateTodosLeft();
  }
}

//toggles emptylist display depending on whether todolist is empty or not
function toggleEmptyDisplay() {
  console.log("Im here");
  const selectedContainer = Array.from(allTodoContainers).filter((container) => {
    return !container.classList.contains("showDisplay");
  })[0];
  console.log(selectedContainer);
  console.log(TodoModule.todoListLength());
  if (TodoModule.todoListLength() == 0 && emptyList.classList.contains("showDisplay")) {
    emptyList.classList.toggle("showDisplay");
    selectedContainer.classList.toggle("showDisplay");
  } else if (!emptyList.classList.contains("showDisplay") && TodoModule.todoListLength() == 1) {
    emptyList.classList.toggle("showDisplay");
    allTodoItems.classList.toggle("showDisplay");
    addActive(viewOptions.querySelector("#all"));
  }
}

//add active color to the container option selected
function addActive(selection) {
  const allBtns = viewOptions.querySelectorAll("button");
  allBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  selection.classList.add("active");
}

//update the todos left to complete
function updateTodosLeft() {
  todosLeft.textContent = TodoModule.activeTodos();
}

//switch todolist containers
function switchContainers(e) {
  if (emptyList.classList.contains("showDisplay") && e.target.tagName == "BUTTON") {
    const allContainers = document.querySelectorAll(".items");
    allContainers.forEach((container) => {
      container.classList.add("showDisplay");
    });
    addActive(e.target);
    const container = document.querySelector(`.${e.target.id}`);
    containerSwitchTodoItems(container);
    container.classList.toggle("showDisplay");
  }
}
//switch the todoItems between containers
function containerSwitchTodoItems(container) {
  // list of the DOM elements for the todoItem containers
  const containers = [allTodoItems, activeTodoItems, completedTodoItems];
  switch (true) {
    case container.classList.contains("all"):
      containers
        .slice(1)
        .forEach((container) =>
          container.querySelectorAll("li").forEach((item) => allTodoItems.appendChild(item))
        );
      break;
    case container.classList.contains("active"):
      const activeIds = TodoModule.activeTodoIds();
      containers.splice(1, 1); // Remove actvieTodoItems from the containers
      containers.forEach((container) =>
        container.querySelectorAll("li").forEach((item) => {
          // adds the todoItem to the container if its id is included in the array of activeIds
          if (activeIds.includes(Number(item.id))) {
            activeTodoItems.appendChild(item);
          }
        })
      );
      TodoModule.activeTodos();
      TodoModule.activeTodoIds();
      break;
    case container.classList.contains("completed"):
      const completedIds = TodoModule.completedTodoIds();
      //excludes the completedTodoItems DOM element from the loop
      containers.slice(0, 2).forEach((container) => {
        container.querySelectorAll("li").forEach((item) => {
          // adds the todoItem to the container if its id is included in the array of completedIds
          if (completedIds.includes(Number(item.id))) {
            completedTodoItems.appendChild(item);
          }
        });
      });
      break;
  }
}

//Event Listeners
populateTodoList();
themeBtn.addEventListener("click", toggleThemes);
allTodoContainers.forEach((container) => container.addEventListener("click", toggleComplete));
allTodoContainers.forEach((container) => container.addEventListener("click", removeTodo));
todoInput.addEventListener("keydown", addTodo);
addBtn.addEventListener("click", addTodo);
viewOptions.addEventListener("click", switchContainers);
clearCompletedBtn.addEventListener("click", clearCompletedTodos);
