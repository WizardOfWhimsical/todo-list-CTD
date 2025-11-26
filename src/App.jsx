//App.jsx
import './App.css';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import { useState } from 'react';

function App() {
  const [toDoList, setToDoList] = useState([]);
  function addTodo(todoTitle) {
    return setToDoList([{ id: new Date(), title: todoTitle }, ...toDoList]);
  }

  return (
    <>
      <h1>My Todos</h1>
      <ToDoForm />
      <ToDoList todos={toDoList} />
    </>
  );
}

export default App;
