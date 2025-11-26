//App.jsx
import './App.css';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import { useState } from 'react';

const todos = [
  { id: 1, title: 'review resources' },
  { id: 2, title: 'take notes' },
  { id: 3, title: 'code out app' },
];

function App() {
  const [toDoList, setToDoList] = useState(todos);
  function addToDo(newTitle) {
    const newToDo = { id: window.crypto.randomUUID(), title: newTitle };
    setToDoList((previousToDos) => [...previousToDos, newToDo]);
  }
  return (
    <>
      <h1>My Todos</h1>
      <ToDoForm onFormSubmit={addToDo} />
      <ToDoList todos={toDoList} />
    </>
  );
}

export default App;
