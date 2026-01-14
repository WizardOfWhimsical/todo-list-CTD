//TodosPage.jsx
import ToDoList from './TodoList/ToDoList';
import ToDoForm from './ToDoForm';
import { useReducer, useState, useEffect } from 'react';
import { post, patch, get } from '../../utils/api';

export default function TodosPage({ token }) {
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

  /**
   * @param {string} todoTitle
   */
  async function addToDo(todoTitle) {
    const newToDo = { id: Date.now(), title: todoTitle, isCompleted: false };

    dispatch({ type: 'ADD_TODO', title: todoTitle });

    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: { title: newToDo.title, isCompleted: newToDo.isCompleted },
    };

    try {
      const data = await post(`tasks`, options);
      dispatch({ type: 'SYNCHRONIZE_TODO', id: newToDo.id, data });
    } catch (e) {
      setError((prev) => [...prev, e]);
      dispatch({ type: 'REVERT_ADD_TODO', id: newToDo.id });
    }
  }

  async function completeTodo(todoId) {
    const targetTodo = todoList.find((todo) => todo.id === todoId);
    dispatch({
      type: 'UPDATE_TODO',
      todo: { ...targetTodo, isCompleted: true },
    });

    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: {
        isCompleted: !targetTodo.isCompleted,
      },
    };
    try {
      await patch(`tasks/${todoId}`, options);
    } catch (e) {
      setError((prev) => [...prev, e]);
      dispatch({ type: 'UPDATE_TODO', todo: targetTodo });
    }
  }

  async function updateTodo(editedTodo) {
    dispatch({
      type: 'UPDATE_TODO',
      todo: editedTodo,
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
      dispatch({ type: 'UPDATE_TODO', todo: targetTodo });
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
    // try to turn this into UPDATE_TODO
    case 'SYNCHRONIZE_TODO': {
      return state.map((todo) => {
        if (todo.id === action.id) {
          return action.data;
        }
        return todo;
      });
    }
    case 'REVERT_ADD_TODO': {
      return state.filter((todo) => todo.id !== action.id);
    }
    case 'UPDATE_TODO': {
      return state.map((todo) => {
        if (todo.id === action.todo.id) {
          return { ...todo, ...action.todo };
        }
        return todo;
      });
    }
    default: {
      return state;
    }
  }
}
