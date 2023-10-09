export const TodoModule = (function () {
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
  let todoList;
  let counter;

  const deafualtTodoList = [
    { task: "Go to the gym", completed: false, id: 1 },
    { task: "Cook a healthy dinner", completed: false, id: 2 },
    { task: "Finish math homework", completed: true, id: 3 },
    { task: "Go for a 20 min jog", completed: false, id: 4 },
    { task: "Read for one hour", completed: true, id: 5 },
  ].map((todo) => new TodoItem(...Object.values(todo)));

  // populates the todolist with TodoItem objects
  if (localStorage.getItem("todoList") != null) {
    todoList = JSON.parse(localStorage.getItem("todoList")).map(
      (todo) =>
        // destructors the values in todo and passes them
        // as arguments, in order, to the new TodoItem instance
        new TodoItem(...Object.values(todo))
    );
    counter = JSON.parse(localStorage.getItem("counter"));
  }
  if (!todoList || todoList.length === 0) {
    todoList = deafualtTodoList;
    counter = 6;
  }
  // updates the local storage with the values of the three todoItem arrays and the counter
  function updateLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("counter", JSON.stringify(counter));
  }
  // creates a TodoItem object and appends it to the todoList and the activeList
  function append(task) {
    const todoItem = new TodoItem(task, false, counter++);
    todoList.push(todoItem);
    updateLocalStorage();
    return todoItem;
  }
  // changes the status of a todoItem and update the respective lists that need to be updated
  function changeStatus(id) {
    const todoItem = todoList.find((todo) => todo.id == id);
    if (todoItem) {
      todoItem.toggleCompleted();
      updateLocalStorage();
    }
  }

  function activeTodos() {
    return activeTodoIds().length;
  }
  // remove todoItem from the lists by utilizing the todoItem id
  function remove(id) {
    const todoItem = todoList.find((todo) => todo.id == id);
    if (todoItem) {
      todoList = todoList.filter((todo) => todo != todoItem);
      updateLocalStorage();
    }
  }
  // removes the completed todoItems from the lists
  function removeCompleted() {
    todoList = todoList.filter((todo) => todo.completed != true);
    updateLocalStorage();
  }

  // return an array with the id numbers of the active todo items
  function activeTodoIds() {
    return todoList.filter((todo) => todo.completed == false).map((todo) => todo.id);
  }

  // returns an array with the id numbers of the completed todo items
  function completedTodoIds() {
    return todoList.filter((todo) => todo.completed == true).map((todo) => todo.id);
  }
  // returns the length of the todoList array
  function todoListLength() {
    return todoList.length;
  }

  function getTodoList() {
    // returns a copy of the todolist instead of a refrence to it
    return [...todoList];
  }

  return {
    append,
    remove,
    changeStatus,
    removeCompleted,
    activeTodoIds,
    completedTodoIds,
    activeTodos,
    todoListLength,
    getTodoList,
  };
})();
