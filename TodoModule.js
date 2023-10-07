export const TodoModule = (function () {
  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  let counter = JSON.parse(localStorage.getItem("counter")) || 1;

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
  function updateLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("counter", JSON.stringify(counter));
  }
  //creates a TodoItem object and appends it to the todoList and the activeList
  function append(task) {
    const todoItem = new TodoItem(task, false, counter++);
    todoList.push(todoItem);
    updateLocalStorage();
    return todoItem;
  }
  //changes the status of a todoItem and update the respective lists that need to be updated
  function changeStatus(id) {
    const todoItem = todoList.find((todo) => todo.id == id);
    if (todoItem) {
      todoItem.toggleCompleted();
      console.log(todoList);
      updateLocalStorage();
    }
  }

  function activeTodos() {
    //refactor this
  }
  // remove todoItem from the lists by utilizing the todoItem id
  function remove(id) {
    const todoItem = todoList.find((todo) => todo.id == id);
    if (todoItem) {
      todoList = todoList.filter((todo) => todo != todoItem);
      updateLocalStorage();
    }
  }
  //removes the completed todoItems from the lists
  function removeCompleted() {
    todoList = todoList.filter((todo) => todo.completed != true);
    updateLocalStorage();
  }

  //return an array with the id numbers of the active todo items
  function activeTodoIds() {
    return todoList.filter((todo) => todo.completed == false).map((todo) => todo.id);
  }

  //returns an array with the id numbers of the completed todo items
  function completedTodoIds() {
    return todoList.filter((todo) => todo.completed == true).map((todo) => todo.id);
  }

  return {
    append,
    remove,
    changeStatus,
    activeTodos,
    removeCompleted,
    activeTodoIds,
    completedTodoIds,
    todoList,
  };
})();
