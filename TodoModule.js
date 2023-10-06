const TodoModule = (function () {
  let todoList = [];
  let counter = 1;
  let completedList = [];
  let activeList = [];
  // let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  // let counter = JSON.parse(localStorage.getItem("counter")) || 1;
  // let completedList = JSON.parse(localStorage.getItem("completedList")) || [];
  // let activeList = JSON.parse(localStorage.getItem("activeList")) || [];

  class TodoItem {
    constructor(task, completed = false, id) {
      this.task = task;
      this.completed = completed;
      this.id = id;
    }
    // switches the value of the completed attribute
    toggleCompleted() {
      this.completed = !this.completed;
    }
  }
  //updates the local storage with the values of the three todoItem arrays and the counter
  // function updateLocalStorage() {
  //   localStorage.setItem("todoList", JSON.stringify(todoList));
  //   localStorage.setItem("completedList", JSON.stringify(completedList));
  //   localStorage.setItem("activeList", JSON.stringify(activeList));
  //   localStorage.setItem("counter", JSON.stringify(counter));
  // }
  //creates a TodoItem object and appends it to the todoList and the activeList
  function appendTodoList(task) {
    const todoItem = new TodoItem(task, false, counter++);
    todoList.push(todoItem);
    activeList.push(todoItem);
    //updateLocalStorage();
    return todoItem;
  }
  //changes the status of a todoItem and update the respective lists that need to be updated
  function changeStatus(id) {
    const todoItem = todoList.find((todo) => todo.id == id);
    if (todoItem) {
      todoItem.toggleCompleted();
      if (todoItem.completed == true) {
        activeList = activeList.filter((todo) => todo != todoItem);
        completedList.push(todoItem);
      } else if (todoItem.completed == false) {
        completedList = completedList.filter((todo) => todo != todoItem);
        activeList.push(todoItem);
      }
      //updateLocalStorage();
    }
  }

  function activeTodos() {
    return activeList.length;
  }
  // remove todoItem from the lists by utilizing the todoItem id
  function removeTodo(id) {
    const todoItem = todoList.find((todo) => todo.id == id);
    if (todoItem) {
      todoList = todoList.filter((todo) => todo != todoItem);
      activeList = activeList.filter((todo) => todo != todoItem);
      completedList = completedList.filter((todo) => todo != todoItem);
      //updateLocalStorage();
    }
  }
  //removes the completed todoItems from the lists
  function removeCompleted() {
    todoList = todoList.filter((todo) => todo.completed != true);
    completedList = [];
    //updateLocalStorage();
  }

  function returnAllLists() {
    console.log("todoList", todoList);
    console.log("completedList", completedList);
    console.log("activeList", activeList);
  }

  return { appendTodoList, removeTodo, changeStatus, returnAllLists, activeTodos, removeCompleted };
})();

TodoModule.appendTodoList("Go to the park");
TodoModule.returnAllLists();
console.log("number of active todoItems:", TodoModule.activeTodos());
console.log(" ");
TodoModule.changeStatus(1);
TodoModule.returnAllLists();
console.log("number of active todoItems:", TodoModule.activeTodos());
TodoModule.appendTodoList("Go to the Mall");
console.log(" ");
TodoModule.returnAllLists();
console.log("number of active todoItems:", TodoModule.activeTodos());
TodoModule.changeStatus(2);
console.log(" ");
TodoModule.returnAllLists();
console.log(" ");
TodoModule.removeCompleted();
TodoModule.returnAllLists();
