//App.jsx
import './App.css';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import { useState } from 'react';

function App() {
  const [todoList, setToDoList] = useState([]);

  /**
   * @param {string} todoTitle
   */
  function addToDo(todoTitle) {
    const newToDo = { id: Date.now(), title: todoTitle };
    //when passing in the first parameter, it is like recieving a promise
    //this gives us the current list (previousTodo) to add new item to the list
    setToDoList((previousTodos) => [newToDo, ...previousTodos]);
  }

  /**
   * @param {string} todoId
   */
  function deleteTodo(todoId) {
    setToDoList((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== todoId)
    );
  }

  return (
    <>
      <h1>My Todos</h1>
      <ToDoForm onAddTodo={addToDo} />
      <ToDoList todos={todoList} onDeleteTodo={deleteTodo} />
    </>
  );
}

export default App;
