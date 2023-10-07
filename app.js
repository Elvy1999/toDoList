//imports
import { TodoModule } from "/TodoModule.js";

//Dom Elements
const html = document.documentElement;
const themeBtn = document.querySelector(".toggle-btn");
const allTodoItems = document.querySelector(".all");
const activeTodoItems = document.querySelector(".active");
const completedTodoItems = document.querySelector(".completed");
const todoInput = document.querySelector("#ToDoItem");
const addBtn = document.getElementById("add-btn");
const emptyList = document.querySelector(".emptyList");
const viewOptions = document.querySelector(".view-options");

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
    TodoModule.remove(e.target.parentElement.id);
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
  }
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
    allTodoItems.appendChild(newTodoItem);
    toggleEmptyDisplay();
    todoInput.value = ""; // clears the input for the todo item
  }
}

//toggles emptylist display depending on whether todolist is empty or not
function toggleEmptyDisplay() {
  if (allTodoItems.childElementCount - 1 == 0 && emptyList.classList.contains("showDisplay")) {
    emptyList.classList.toggle("showDisplay");
    allTodoItems.classList.toggle("showDisplay");
  } else if (!emptyList.classList.contains("showDisplay") && allTodoItems.childElementCount == 1) {
    emptyList.classList.toggle("showDisplay");
    allTodoItems.classList.toggle("showDisplay");
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

function containerSwitchTodoItems(container) {
  switch (true) {
    case container.classList.contains("all"):
      activeTodoItems.querySelectorAll("li").forEach((item) => allTodoItems.appendChild(item));
      completedTodoItems.querySelectorAll("li").forEach((item) => allTodoItems.appendChild(item));
      console.log(TodoModule.todoList);
      break;
    case container.classList.contains("active"):
      const activeIds = TodoModule.activeTodoIds();
      allTodoItems.querySelectorAll("li").forEach((item) => {
        if (activeIds.includes(Number(item.id))) {
          console.log("activeIds", activeIds);
          activeTodoItems.appendChild(item);
        }
      });
      completedTodoItems.querySelectorAll("li").forEach((item) => {
        if (activeIds.includes(Number(item.id))) {
          console.log("activeIds", activeIds);
          activeTodoItems.appendChild(item);
        }
        console.log(TodoModule.todoList);
      });
      break;
    case container.classList.contains("completed"):
      const completedIds = TodoModule.completedTodoIds();
      allTodoItems.querySelectorAll("li").forEach((item) => {
        if (completedIds.includes(Number(item.id))) {
          console.log("CompletedIds", completedIds);
          completedTodoItems.appendChild(item);
        }
        console.log(" ");
        console.log(TodoModule.todoList);
      });
      activeTodoItems.querySelectorAll("li").forEach((item) => {
        if (completedIds.includes(Number(item.id))) {
          console.log("CompletedIds", completedIds);
          completedTodoItems.appendChild(item);
        }
        console.log(" ");
        console.log(TodoModule.todoList);
      });
      break;
  }
}

//Event Listeners
themeBtn.addEventListener("click", toggleThemes);
allTodoItems.addEventListener("click", toggleComplete);
activeTodoItems.addEventListener("click", toggleComplete);
completedTodoItems.addEventListener("click", toggleComplete);
allTodoItems.addEventListener("click", removeTodo);
todoInput.addEventListener("keydown", addTodo);
addBtn.addEventListener("click", addTodo);
viewOptions.addEventListener("click", switchContainers);

console.log(TodoModule.todoList);
