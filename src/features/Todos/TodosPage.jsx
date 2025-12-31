//TodosPage.jsx
import ToDoList from './TodoList/ToDoList';
import ToDoForm from './ToDoForm';
import { useState, useEffect } from 'react';
import { post, get } from '../../utils/api';
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
    if (error) return;
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
          setError(response);
          throw new Error('useEffect-!ok', response);
        }
        const data = await response.json();
        // console.log(data);
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
      console.log('one render ran clean up');
      firstPost = true;
    };
  }, [token, error]);

  /**
   * @param {string} todoTitle
   */
  async function addToDo(todoTitle) {
    const newToDo = { id: Date.now(), title: todoTitle, isCompleted: false };
    //when passing in the first parameter, it is like recieving a promise
    //this gives us the current list (previousTodo) to add new item to the list
    setToDoList((previousTodos) => [newToDo, ...previousTodos]);

    // fetch post
    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: newToDo,
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
            return { ...data };
          }
          return todo;
        });
      });
      console.log('Response object', data);
      console.log(
        'Updated State with new item replacing place holder',
        todoList
      );
    } catch (e) {
      setError(e);
      setToDoList((previousTodos) =>
        previousTodos.filter((todo) => todo.id !== newToDo.id)
      );
      console.log('Catch for adding todo', error);
    }
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
