//App.jsx
import './App.css';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import { useState } from 'react';
//kept in for baseline
const todos = [
  { id: 1, title: 'review resources', isCompleted: false },
  { id: 2, title: 'take notes', isCompleted: true },
  { id: 3, title: 'code out app', isCompleted: false },
];

function App() {
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

  return (
    <>
      <h1>My Todos</h1>
      <ToDoForm onAddTodo={addToDo} />
      <ToDoList onCompleteTodo={completeTodo} todos={todoList} />
    </>
  );
}

export default App;
