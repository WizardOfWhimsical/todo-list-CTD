//TodosPage.jsx
import ToDoList from './TodoList/ToDoList';
import ToDoForm from './ToDoForm';
import { useReducer, useState, useEffect } from 'react';
import { post, patch, get } from '../../utils/api';

export default function TodosPage({ token }) {
  const [todoListOld, setToDoListOld] = useState([]);
  const [error, setError] = useState([]);
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [todoList, dispatch] = useReducer(todoReducer, []);

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
          dispatch({ data, type: 'GET_TODOS' });
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
    console.log('Up to date to do list in useEffect' + '\n\t', todoListOld);
    console.log('Errors updated State' + '\n\t', error);
  }, [todoListOld, error]);

  /**
   * @param {string} todoTitle
   */
  async function addToDo(todoTitle) {
    const newToDo = { id: Date.now(), title: todoTitle, isCompleted: false };

    dispatch({ type: 'ADD_TODO', title: todoTitle });

    // fetch post
    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: { title: newToDo.title, isCompleted: newToDo.isCompleted },
    };

    try {
      const data = await post(`tasks`, options);

      dispatch({ type: 'SYNCHRONIZE_TODO', id: newToDo.id, data });

      // setToDoListOld((previousTodos) => {
      //   return previousTodos.map((todo) => {
      //     if (todo.id === newToDo.id) {
      //       return data;
      //     }
      //     return todo;
      //   });
      // });
    } catch (e) {
      setError((prev) => [...prev, e]);

      setToDoListOld((previousTodos) =>
        previousTodos.filter((todo) => todo.id !== newToDo.id)
      );

      console.log('line 104', e);
    }
  }

  async function completeTodo(todoId) {
    setToDoListOld((previousTodos) => {
      return previousTodos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    });

    const targetTodo = todoListOld.find((todo) => todo.id === todoId);

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

      setToDoListOld((prev) =>
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
    setToDoListOld((previousTodos) => {
      return previousTodos.map((todo) => {
        if (todo.id === editedTodo.id) {
          return { ...todo, title: editedTodo.title };
        }
        return todo;
      });
    });

    const targetTodo = todoListOld.find((todo) => todo.id === editedTodo.id);

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
      setToDoListOld((prev) =>
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

function todoReducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS': {
      return [...action.data, ...state];
    }
    case 'ADD_TODO': {
      const newToDo = {
        id: Date.now(),
        title: action.title,
        isCompleted: false,
      };

      return [newToDo, ...state];
    }
    case 'SYNCHRONIZE_TODO': {
      return state.map((todo) => {
        if (todo.id === action.id) {
          return action.data;
        }
        return todo;
      });
    }
  }
  return state;
}
