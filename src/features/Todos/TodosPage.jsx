//TodosPage.jsx
import ToDoList from './TodoList/ToDoList';
import ToDoForm from './ToDoForm';
import { useState, useEffect } from 'react';
import { post, patch, get } from '../../utils/api';

export default function TodosPage({ token }) {
  const [todoList, setToDoList] = useState([]);
  const [error, setError] = useState([]);
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    let firstPost = false;
    async function fetchTodos() {
      const options = {
        headers: { 'X-CSRF-TOKEN': token },
      };
      try {
        setIsTodoListLoading(true);
        const data = await get(`tasks`, options);

        if (!firstPost) {
          setToDoList((prev) => [...prev, ...data]);
        }
      } catch (er) {
        setError((prev) => [...prev, er]);
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
      const data = await post(`tasks`, options);

      setToDoList((previousTodos) => {
        return previousTodos.map((todo) => {
          if (todo.id === newToDo.id) {
            return data;
          }
          return todo;
        });
      });
    } catch (e) {
      setError((prev) => [...prev, e]);

      setToDoList((previousTodos) =>
        previousTodos.filter((todo) => todo.id !== newToDo.id)
      );

      console.log('line 104', e);
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

    const targetTodo = todoList.find((todo) => todo.id === todoId);

    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: {
        isCompleted: !targetTodo.isCompleted,
      },
    };
    try {
      await patch(`tasks/${todoId}`, options);
    } catch (e) {
      console.log('line 132', e);

      setError((prev) => [...prev, e]);

      setToDoList((prev) =>
        prev.map((todo) => {
          if (todo.id === targetTodo.id) {
            return targetTodo;
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

    const targetTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: {
        title: editedTodo.title,
        isCompleted: editedTodo.isCompleted,
      },
    };
    try {
      await patch(`tasks/${editedTodo.id}`, options);
    } catch (e) {
      setError((prev) => [...prev, e]);
      setToDoList((prev) =>
        prev.map((todo) => {
          if (todo.id === targetTodo.id) {
            return targetTodo;
          }
          return todo;
        })
      );
    }
  }

  return (
    <>
      {error &&
        error.map((err, index) => {
          return (
            <span key={index}>
              <p>{err.message}</p>
              <button
                onClick={() =>
                  setError((previousErrors) =>
                    previousErrors.filter((error, i) => i !== index)
                  )
                }
              >
                Close
              </button>
            </span>
          );
        })}
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
