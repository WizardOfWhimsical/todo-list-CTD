//TodosPage.jsx
import ToDoList from './TodoList/ToDoList';
import ToDoForm from './ToDoForm';
import { useState, useEffect } from 'react';
//kept in for baseline
const todos = [
  { id: 1, title: 'review resources', isCompleted: false },
  { id: 2, title: 'take notes', isCompleted: true },
  { id: 3, title: 'code out app', isCompleted: false },
];

export default function TodosPage({ token }) {
  // const [todoList, setToDoList] = useState([]);
  console.log(token);
  const [todoList, setToDoList] = useState(todos);
  // const [todoList, setToDoList] = useState(todos);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!token) return;
    let firstPost = false;
    async function fetchTodos() {
      const options = {
        method: 'GET',
        headers: { 'X-CSRF-TOKEN': token },
        credentials: 'include',
      };
      try {
        setIsTodoListLoading(true);
        const response = await fetch(`${baseUrl}/tasks`, options);
        if (response.status === 401) {
          throw new Error('useEffect-401', response);
        }
        if (!response.ok) {
          setError(response);
          throw new Error('useEffect-!ok', response);
        }
        const data = await response.json();
        console.log(data);
        if (!firstPost) {
          setToDoList((prev) => [...prev, ...data]);
        }
      } catch (er) {
        setError(er);
        console.log(error);
      } finally {
        setIsTodoListLoading(false);
      }
    }
    fetchTodos();
    return () => {
      firstPost = true;
    };
  }, [token]);

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
      <h2>My Todos</h2>
      <ToDoForm onAddTodo={addToDo} />
      <ToDoList
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
        todos={todoList}
      />
    </>
  );
}
