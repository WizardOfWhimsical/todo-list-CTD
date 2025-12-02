//App.jsx
import './App.css';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import { useReducer, useState } from 'react';

const initalTodos = [
  { id: 1, title: 'review resources', isCompleted: false },
  { id: 2, title: 'take notes', isCompleted: true },
  { id: 3, title: 'code out app', isCompleted: false },
];
// FAIL SAFES
const ADD = 'ADD',
  COMPLETE = 'COMPLETE',
  DELETE = 'DELETE';

function todoReducer(todos, action) {
  if (action.type === ADD) {
    return [...todos, { title: action.title, id: action.id }];
  }

  if (action.type === DELETE) {
    return todos.filter((todo) => todo.id !== action.id);
  }

  if (action.type === COMPLETE) {
    return todos.map((todo) => {
      if (action.id === todo.id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
  }

  return todos;
}

function App() {
  const [todoList, dispatch] = useReducer(todoReducer, initalTodos);

  /**
   * @param {string} todoTitle
   */
  function addToDo(todoTitle) {
    dispatch({ type: ADD, title: todoTitle, id: Date.now() });
  }

  /**
   * @param {string} todoId
   */
  function deleteTodo(todoId) {
    dispatch({ type: DELETE, id: todoId });
  }

  /**
   * @param {number} todoId
   */
  function completeTodo(todoId) {
    dispatch({ type: COMPLETE, id: todoId });
  }

  return (
    <>
      <h1>My Todos</h1>
      <ToDoForm onAddTodo={addToDo} />
      <ToDoList
        todos={todoList}
        onDeleteTodo={deleteTodo}
        onCompleteTodo={completeTodo}
      />
    </>
  );
}

export default App;
