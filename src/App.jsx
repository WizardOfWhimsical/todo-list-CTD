import './App.css';
import ToDoList from './todolist';
import ToDoForm from './ToDoForm';
import { useState } from 'react';

const initalTodos = [
  { id: 1, title: 'review resources' },
  { id: 2, title: 'take notes' },
  { id: 3, title: 'code out app' },
];

function App() {
  const [todoList, setTodolist] = useState(initalTodos);

  return (
    <>
      <h1>My Todos</h1>
      <ToDoForm />
      <ToDoList todoList={todoList} />
    </>
  );
}

export default App;
