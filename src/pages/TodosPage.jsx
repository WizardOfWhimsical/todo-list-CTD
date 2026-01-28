//TodosPage.jsx
import { useReducer, useEffect, useCallback } from 'react';
import ToDoList from '../features/Todos/TodoList/ToDoList';
import ToDoForm from '../features/Todos/ToDoForm';

import { useAuth } from '../context/AuthContext';

import { addTodo, patch, get } from '../utils/api';
import { FilterInput } from '../shared/FilterInput';
import SortBy from '../shared/SortBy';

import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../hooks/todoReducer';
import useDebounce from '../hooks/useDebounce';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function TodosPage() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    isTodoListLoading,
    filterError,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const { token, logout } = useAuth();

  console.log('data verion start count state', dataVersion);

  const debouncedFilterTerm = useDebounce(filterTerm, 500);

  useEffect(() => {
    if (!token) return;
    let firstPost = false;

    const paramsObj = { sortBy, sortDirection };
    if (debouncedFilterTerm) {
      paramsObj.find = debouncedFilterTerm;
    }

    const params = new URLSearchParams(paramsObj);
    console.log(params.toString());
    async function fetchTodos() {
      const options = {
        headers: { 'X-CSRF-TOKEN': token },
      };
      try {
        dispatch({
          type: TODO_ACTIONS.FETCH_START,
        });

        const data = await get(`tasks?${params}`, options);

        if (!firstPost) {
          dispatch({ data, type: TODO_ACTIONS.FETCH_SUCCESS });
        }
        dispatch({ type: TODO_ACTIONS.FILTER_ERROR, sortError: '' });
      } catch (error) {
        dispatch({ fetchError: error.message, type: TODO_ACTIONS.FETCH_ERROR });
        if (
          debouncedFilterTerm ||
          sortBy !== 'creationDate' ||
          sortDirection !== 'desc'
        ) {
          dispatch({
            sortError: error.message,
            type: TODO_ACTIONS.FILTER_ERROR,
          });
        } else {
          //setting err
          dispatch({
            fetchError: error.message,
            type: TODO_ACTIONS.FETCH_ERROR,
          });
        }
      }
    }

    fetchTodos();

    return () => {
      console.log('one render ran clean up');
      firstPost = true;
    };
  }, [token, sortBy, sortDirection, debouncedFilterTerm, error?.message]);

  /**
   * @param {string} todoTitle
   */
  async function addToDo(todoTitle) {
    const newToDo = { id: Date.now(), title: todoTitle, isCompleted: false };

    dispatch({ type: TODO_ACTIONS.ADD_TODO, title: todoTitle, id: newToDo.id });

    try {
      const data = await addTodo(newToDo, token);

      dispatch({ type: TODO_ACTIONS.SYNCHRONIZE_TODO, id: newToDo.id, data });

      invalidateCache();
    } catch (e) {
      dispatch({
        fetchError: e,
        type: TODO_ACTIONS.FETCH_ERROR,
      });
      dispatch({ type: 'REVERT_ADD_TODO', id: newToDo.id });
    }
  }
  /**
   *
   * @param {number} todoId
   */
  async function completeTodo(todoId) {
    const targetTodo = todoList.find((todo) => todo.id === todoId);
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO,
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
      invalidateCache();
    } catch (e) {
      dispatch({
        fetchError: e,
        type: TODO_ACTIONS.FETCH_ERROR,
      });
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, todo: targetTodo });
    }
  }
  /**
   *
   * @param {string} editedTodo
   */
  async function updateTodo(editedTodo) {
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO,
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
      invalidateCache();
    } catch (e) {
      dispatch({
        fetchError: e,
        type: TODO_ACTIONS.FETCH_ERROR,
      });
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, todo: targetTodo });
    }
  }

  /**
   * @param {string} newValue
   */
  function handleSortByChange(newValue) {
    dispatch({ type: TODO_ACTIONS.SET_SORT_BY, sortBy: newValue });
  }
  /**
   * @param {string} newValue
   */
  function handleSortByDirectionChange(newValue) {
    dispatch({
      type: TODO_ACTIONS.SET_SORT_DIRECTION,
      sortDirection: newValue,
    });
  }
  /**
   * @param {string} newTerm
   */
  function handlefilterChange(newTerm) {
    dispatch({ type: TODO_ACTIONS.SET_S_E_O, filterTerm: newTerm });
  }

  const invalidateCache = useCallback(() => {
    console.log(
      'Invalidating Memo cache after todo mutation\n',
      `Version${dataVersion}`
    );
    dispatch({
      type: TODO_ACTIONS.DATA_VERSION_COUNT,
    });
  }, [dataVersion]);

  function resetFilters() {
    dispatch({ type: TODO_ACTIONS.SET_S_E_O, filterTerm: '' });
    dispatch({ type: TODO_ACTIONS.SET_SORT_BY, sortBy: 'createDate' });
    dispatch({ type: TODO_ACTIONS.SET_SORT_DIRECTION, sortDirection: 'desc' });
    dispatch({ type: TODO_ACTIONS.FILTER_ERROR, filterError: '' });
  }

  // it clear the state but doesnt rerender to login??
  async function handleLogOut(token) {
    const data = await logout(token);
    console.log(data);
  }

  return (
    <>
      {error && (
        <div>
          <p>{error}</p>
          <Button
            type="button"
            onClick={() =>
              dispatch({ type: TODO_ACTIONS.FETCH_ERROR, fetchError: '' })
            }
          >
            Clear Error
          </Button>
        </div>
      )}
      {filterError && (
        <div>
          <p>{filterError}</p>
          <Button
            type="button"
            onClick={() =>
              dispatch({ type: TODO_ACTIONS.FILTER_ERROR, filterError: '' })
            }
          >
            Clear Filter Error
          </Button>
          <Button type="button" onClick={() => resetFilters()}>
            Reset Filters
          </Button>
        </div>
      )}
      <h2>My Todos</h2>
      <ToDoForm onAddTodo={addToDo} />
      <FilterInput
        filterTerm={filterTerm}
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
          dataVersion={dataVersion}
          todos={todoList}
        />
      )}
      <Button type="button" onClick={() => handleLogOut(token)}>
        Log Off
      </Button>
    </>
  );
}
