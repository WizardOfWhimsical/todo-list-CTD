//App.jsx
import './App.css';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import { useState } from 'react';

function App() {
  const [toDoList, setToDoList] = useState([]);

  function addTodo(todoTitle) {
    const newTodo = { id: new Date(), title: todoTitle };
    return setToDoList([newTodo, ...toDoList]);
  }

  return (
    <>
      <h1>My Todos</h1>
      <ToDoForm onAddToDo={addTodo} />
      <ToDoList todos={toDoList} />
    </>
  );
}

export default App;
