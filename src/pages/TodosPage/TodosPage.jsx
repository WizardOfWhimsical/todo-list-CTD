//TodosPage.jsx
import { useReducer, useEffect, useCallback } from 'react';
import ToDoList from '../../features/ToDoList';
import ToDoForm from '../../features/ToDoForm';
import ErrorDisplay from '../../shared/ErrorDisplay/ErrorDisplay';
import StatusFilter from '../../shared/StatusFilter';

import Logoff from '../../features/Logoff/Logoff';

import { useAuth } from '../../context/AuthContext';
import isValid from '../../utils/todoValidation';
import sanitizeInput from '../../utils/sanitizeInput';

import { addTodo, patch, get } from '../../utils/api';
import { FilterInput } from '../../shared/FilterInput';
import SortBy from '../../shared/SortBy';
import Header from '../../shared/Header';
import styles from './TodosPage.module.css';

import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../../hooks/todoReducer';
import useDebounce from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router';

export default function TodosPage() {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
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

  const statusFilter = searchParams.get('status') || 'active'; //<--changed from all to active
  const debouncedFilterTerm = useDebounce(filterTerm, 500);

  useEffect(() => {
    if (!token) return;
    let firstPost = false;

    const paramsObj = { sortBy, sortDirection };
    if (debouncedFilterTerm) {
      paramsObj.find = debouncedFilterTerm;
    }

    const params = new URLSearchParams(paramsObj);

    async function fetchTodos() {
      //i made token to tokens to throw error but it never showed on the page. revisit
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
      } catch (error) {
        dispatch({ fetchError: error.message, type: TODO_ACTIONS.FETCH_ERROR });
        if (
          debouncedFilterTerm ||
          sortBy !== initialTodoState.sortBy ||
          sortDirection !== initialTodoState.sortDirection
        ) {
          dispatch({
            sortError: error.message,
            type: TODO_ACTIONS.FILTER_ERROR,
          });
        } else {
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
    if (isValid(todoTitle)) {
      if (sanitizeInput(todoTitle) === '') {
        dispatch({
          fetchError: 'Only non-malious chracters',
          type: TODO_ACTIONS.FETCH_ERROR,
        });
        return;
      }
    }
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
      todo: { ...targetTodo, isCompleted: !targetTodo.isCompleted },
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
   * @param {Object} editedTodo
   */
  async function updateTodo(editedTodo) {
    if (isValid(editedTodo.title)) {
      if (sanitizeInput(editedTodo.title) === '') {
        dispatch({
          fetchError: 'Only non-malious chracters',
          type: TODO_ACTIONS.FETCH_ERROR,
        });
        return;
      }
    }
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
    if (isValid(newTerm)) {
      if (sanitizeInput(newTerm) === '') {
        dispatch({
          fetchError: 'Only non-malious chracters',
          type: TODO_ACTIONS.FETCH_ERROR,
        });
        return;
      }
    }

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

  return (
    <>
      {error && (
        <ErrorDisplay
          error={error}
          onClick={() =>
            dispatch({
              type: TODO_ACTIONS.FETCH_ERROR,
              fetchError: '',
            })
          }
        />
      )}
      {filterError && (
        <ErrorDisplay error={filterError} onClick={() => resetFilters()} />
      )}
      <div className={styles.filterContainer}>
        <div className={styles.inputContainer}>
          <ToDoForm onAddTodo={addToDo} />
          <FilterInput
            filterTerm={filterTerm}
            onFilterChange={handlefilterChange}
          />
        </div>

        <div className={styles.sortContainer}>
          <SortBy
            onSortByChange={handleSortByChange}
            onSortDirectionChange={handleSortByDirectionChange}
            sortBy={sortBy}
            sortDirection={sortDirection}
          />
          <StatusFilter />
        </div>
      </div>
      {isTodoListLoading ? (
        <h1>Is Loading the List....</h1>
      ) : (
        <>
          <Header message={'Going To Do...'} />
          <h2>My Todos</h2>
          <ToDoList
            onUpdateTodo={updateTodo}
            onCompleteTodo={completeTodo}
            dataVersion={dataVersion}
            todos={todoList}
            statusFilter={statusFilter}
          />
        </>
      )}
      <Logoff />
    </>
  );
}
