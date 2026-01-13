//TodosPage.jsx
import { useReducer, useState, useEffect, useCallback } from 'react';
import ToDoList from './TodoList/ToDoList';
import ToDoForm from './ToDoForm';
import { post, patch, get } from '../../utils/api';
import { FilterInput } from '../../shared/FilterInput';
import SortBy from '../../shared/SortBy';
import todoReducer from '../../hooks/todoReducer';
import useDebounce from '../../hooks/useDebounce';

export default function TodosPage({ token }) {
  const [todoList, dispatch] = useReducer(todoReducer, []);

  const [error, setError] = useState([]);
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  const [sortBy, setSortBy] = useState('creationDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const [filterterm, setFilterTerm] = useState('');
  const debouncedFilter = useDebounce(filterterm, 500);

  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    if (!token) return;
    let firstPost = false;

    const paramsObj = { sortBy, sortDirection };
    if (debouncedFilter) {
      paramsObj.find = debouncedFilter;
    }
    const params = new URLSearchParams(paramsObj);
    async function fetchTodos() {
      const options = {
        headers: { 'X-CSRF-TOKEN': token },
      };
      try {
        setIsTodoListLoading(true);

        const data = await get(`tasks?${params}`, options);

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
  }, [token, sortBy, sortDirection, debouncedFilter]);

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

  function handleSortByChange(newValue) {
    console.log('handle', newValue);
    setSortBy(newValue);
  }
  function handleSortByDirectionChange(newValue) {
    console.log('sort direction', newValue);
    setSortDirection(newValue);
  }

  function handlefilterChange(newTerm) {
    setFilterTerm(newTerm);
  }

  const invalidateCache = useCallback(() => {
    setDataVersion((previous) => previous + 1);
  });

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
      <FilterInput
        filterTerm={filterterm}
        onFilterChange={handlefilterChange}
      />
      <br />
      <SortBy
        onSortByChange={handleSortByChange}
        onSortDirectionChange={handleSortByDirectionChange}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />

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
