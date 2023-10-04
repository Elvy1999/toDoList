//Dom Elements
const html = document.documentElement;
const themeBtn = document.querySelector(".toggle-btn");
const todoItems = document.querySelector(".items");

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

//Event Listeners
themeBtn.addEventListener("click", toggleThemes);
todoItems.addEventListener("click", toggleComplete);
todoItems.addEventListener("click", removeTodo);
