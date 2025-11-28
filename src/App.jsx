//App.jsx
import './App.css';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import { useState } from 'react';
//kept in for baseline
// const todos = [
//   { id: 1, title: 'review resources' },
//   { id: 2, title: 'take notes' },
//   { id: 3, title: 'code out app' },
// ];

function App() {
  const [todoList, setToDoList] = useState([]);
  // const [todoList, setToDoList] = useState(todos);

  /**
   * @param {string} todoTitle
   */
  function addToDo(todoTitle) {
    const newToDo = { id: Date.now(), title: todoTitle };
    //when passing in the first parameter, it is like recieving a promise
    //this gives us the current list (previousTodo) to add new item to the list
    setToDoList((previousTodos) => [newToDo, ...previousTodos]);
  }

  return (
    <>
      <h1>My Todos</h1>
      <ToDoForm onAddTodo={addToDo} />
      <ToDoList todos={todoList} />
    </>
  );
}

export default App;
