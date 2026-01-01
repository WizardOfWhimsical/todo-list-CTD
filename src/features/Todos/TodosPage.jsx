//TodosPage.jsx
import ToDoList from './TodoList/ToDoList';
import ToDoForm from './ToDoForm';
import { useState, useEffect } from 'react';
import { post, patch, get } from '../../utils/api';
//kept in for baseline
// const todos = [
//   { id: 1, title: 'review resources', isCompleted: false },
//   { id: 2, title: 'take notes', isCompleted: true },
//   { id: 3, title: 'code out app', isCompleted: false },
// ];
// const baseUrl = import.meta.env.VITE_BASE_URL;

export default function TodosPage({ token }) {
  const [todoList, setToDoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    // if (error) return;
    let firstPost = false;
    async function fetchTodos() {
      const options = {
        headers: { 'X-CSRF-TOKEN': token },
      };
      try {
        setIsTodoListLoading(true);
        const response = await get(`tasks`, options);
        if (response.status === 401) {
          throw new Error('useEffect-401', response);
        }
        if (!response.ok) {
          throw new Error('useEffect-!ok', response);
        }
        const data = await response.json();
        console.log(data);
        if (!firstPost) {
          setToDoList((prev) => [...prev, ...data]);
        }
      } catch (er) {
        setError(er);
        console.log(er);
      } finally {
        setIsTodoListLoading(false);
      }
    }
    fetchTodos();
    return () => {
      console.log('one render ran clean up');
      firstPost = true;
    };
  }, [token]);
  // to watch my list
  useEffect(() => {
    console.log('Up to date to do list in useEffect' + '\n\t', todoList);
    console.log('Errors updated State' + '\n\t', error);
  }, [todoList, error]);

  /**
   * @param {string} todoTitle
   */
  async function addToDo(todoTitle) {
    const newToDo = { id: Date.now(), title: todoTitle, isCompleted: false };

    setToDoList((previousTodos) => [newToDo, ...previousTodos]);

    // fetch post
    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: { title: newToDo.title, isCompleted: newToDo.isCompleted },
    };

    try {
      const response = await post(`tasks`, options);
      if (!response.ok) {
        throw new Error('addToDo/POST', response.error && response.message);
      }

      const data = await response.json();

      setToDoList((previousTodos) => {
        // map throu to replace newTodo with data
        return previousTodos.map((todo) => {
          if (todo.id === newToDo.id) {
            return data;
          }
          return todo;
        });
      });
    } catch (e) {
      // chose to do this here for:
      // trigger useEffect
      setError((prev) => [...prev, e]);
      // to then clean this up here
      setToDoList((previousTodos) =>
        previousTodos.filter((todo) => todo.id !== newToDo.id)
      );
      // this is important because if you trigger the useEffect unknowingly you can get duplicates of state
      console.log('Catch for adding todo', e);
    }
  }

  async function completeTodo(todoId) {
    setToDoList((previousTodos) => {
      return previousTodos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    });
    // request
    const targetTodo = todoList.find((todo) => todo.id === todoId);
    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: {
        isCompleted: !targetTodo.isCompleted,
      },
    };
    try {
      const response = await patch(`tasks/${todoId}`, options);
      if (!response.ok) {
        const err = await response.json();
        console.log('ERR', err);
        throw new Error(
          `Patch update for isComplete failed because:\n
          ${err.message}`
        );
      }
    } catch (e) {
      console.log('checking error shape', '\n\t\t', e);

      setError(e);

      setToDoList((prev) =>
        prev.map((todo) => {
          if (todo.id === targetTodo.id) {
            return { ...targetTodo };
          }
          return todo;
        })
      );
    }
  }

  async function updateTodo(editedTodo) {
    setToDoList((previousTodos) => {
      return previousTodos.map((todo) => {
        if (todo.id === editedTodo.id) {
          return { ...todo, title: editedTodo.title };
        }
        return todo;
      });
    });
    // patch request
    const targetTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: {
        title: editedTodo.title,
        isCompleted: editedTodo.isCompleted,
      },
    };
    try {
      const response = await patch(`taskss/${editedTodo.id}`, options);
      if (!response.ok) {
        throw new Error(
          'patch update for editting error' + '\n\t\t',
          response.error && response.message
        );
      }
    } catch (e) {
      setError((prev) => [...prev, e]);
      setToDoList((prev) =>
        prev.map((todo) => {
          if (todo.id === targetTodo.id) {
            return { ...targetTodo };
          }
          return todo;
        })
      );
    }
  }

  return (
    <>
      <h2>My Todos</h2>
      {error && (
        <>
          <p>{error.message}</p>
          <button onClick={() => setError('')}>Close</button>
        </>
      )}
      <ToDoForm onAddTodo={addToDo} />

      {isTodoListLoading ? (
        <h1>Is Loading the List....</h1>
      ) : (
        <ToDoList
          onUpdateTodo={updateTodo}
          onCompleteTodo={completeTodo}
          todos={todoList}
        />
      )}
    </>
  );
}
