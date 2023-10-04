//Dom Elements
const html = document.documentElement;
const themeBtn = document.querySelector(".toggle-btn");
const todoItems = document.querySelector(".items");
const todoInput = document.querySelector("#ToDoItem");
const addBtn = document.getElementById("add-btn");

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
  }
}

// toggle checkmark for list item
function toggleComplete(e) {
  const checkbtn = e.target.closest(".circle");
  if (checkbtn) {
    const computedStyle = window.getComputedStyle(checkbtn.children[0]);
    const displayValue = computedStyle.getPropertyValue("display");
    if (displayValue == "inline") {
      checkbtn.children[0].style.display = "none";
    } else {
      checkbtn.children[0].style.display = "inline";
    }
  }
}
// Takes input from the user to create a todo item, which is then added to the todo item list
function addTodo(e) {
  if (e.key === "Enter" || e.keyCode === 13 || e.target.id == "add-btn") {
    let newTodoItem = document.createElement("li");
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
    todoItems.appendChild(newTodoItem);
    todoInput.value = ""; // clears the input for the todo item
  }
}

//Event Listeners
themeBtn.addEventListener("click", toggleThemes);
todoItems.addEventListener("click", toggleComplete);
todoItems.addEventListener("click", removeTodo);
todoInput.addEventListener("keydown", addTodo);
addBtn.addEventListener("click", addTodo);
