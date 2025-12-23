//TodosPage.jsx
import ToDoList from './features/TodoList/ToDoList';
import ToDoForm from './features/ToDoForm';
import { useState } from 'react';
//kept in for baseline
const todos = [
  { id: 1, title: 'review resources', isCompleted: false },
  { id: 2, title: 'take notes', isCompleted: true },
  { id: 3, title: 'code out app', isCompleted: false },
];

export default function TodosPage() {
  // const [todoList, setToDoList] = useState([]);
  const [todoList, setToDoList] = useState(todos);

  /**
   * @param {string} todoTitle
   */
  function addToDo(todoTitle) {
    const newToDo = { id: Date.now(), title: todoTitle, isCompleted: false };
    //when passing in the first parameter, it is like recieving a promise
    //this gives us the current list (previousTodo) to add new item to the list
    setToDoList((previousTodos) => [newToDo, ...previousTodos]);
  }

  function completeTodo(todoId) {
    setToDoList((previousTodos) => {
      return previousTodos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    });
  }

  function updateTodo(editedTodo) {
    setToDoList((previousTodos) => {
      return previousTodos.map((todo) => {
        if (todo.id === editedTodo.id) {
          return { ...todo, title: editedTodo.title };
        }
        return todo;
      });
    });
  }

  return (
    <>
      <h1>My Todos</h1>
      <ToDoForm onAddTodo={addToDo} />
      <ToDoList
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
        todos={todoList}
      />
    </>
  );
}
