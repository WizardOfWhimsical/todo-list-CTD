//TodosPage.jsx
import { useReducer, useState, useEffect, useCallback } from 'react';
import ToDoList from './TodoList/ToDoList';
import ToDoForm from './ToDoForm';
import { post, patch, get } from '../../utils/api';
import { FilterInput } from '../../shared/FilterInput';
import SortBy from '../../shared/SortBy';
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../../hooks/todoReducer';
import useDebounce from '../../hooks/useDebounce';

export default function TodosPage({ token }) {
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

  console.log('data verion start count state', dataVersion);

  // const [error, setErrors] = useState([]);
  // const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  // const [filterError, setFilterError] = useState('');

  // const [sortBy, setSortBy] = useState('creationDate');
  // const [sortDirection, setSortDirection] = useState('desc');

  // const [filterTerm, setFilterTerm] = useState('');
  // const [dataVersion, setDataVersion] = useState(0);
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
        //fetch_start?
        dispatch({
          type: TODO_ACTIONS.FETCH_START,
        });
        // setIsTodoListLoading(true);

        const data = await get(`tasks?${params}`, options);
        // fetch_success
        if (!firstPost) {
          dispatch({ data, type: TODO_ACTIONS.FETCH_SUCCESS });
        }
        //clearing err->put into reducer w/success
        dispatch({ type: TODO_ACTIONS.FILTER_ERROR_CLEAR });
      } catch (error) {
        //setting err->line 64 failSafe? seprate err
        dispatch({ fetchError: error.message, type: TODO_ACTIONS.FETCH_ERROR });
        // setErrors((prev) => [...prev, er]);
        //search/sort filterErr
        if (
          debouncedFilterTerm ||
          sortBy !== 'creationDate' ||
          sortDirection !== 'desc'
        ) {
          //handle in reducer when we get to sorting
          dispatch({
            sortError: error.message,
            type: TODO_ACTIONS.FILTER_ERROR,
          });
          // setFilterError(`Error filtering/sorting todos: ${error.message}`);
        } else {
          //setting err
          dispatch({
            fetchError: error.message,
            type: TODO_ACTIONS.FETCH_ERROR,
          });
          // setErrors((previous) => [
          //   ...previous,
          //   `Error fetching todos: ${error.message}`,
          // ]);
        }
      }
      // finally {
      //   //setting this in success return, handled up top
      //   setIsTodoListLoading(false);
      // }
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

    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: { title: newToDo.title, isCompleted: newToDo.isCompleted },
    };

    try {
      const data = await post(`tasks`, options);

      dispatch({ type: TODO_ACTIONS.SYNCHRONIZE_TODO, id: newToDo.id, data });

      invalidateCache();
    } catch (e) {
      dispatch({
        fetchError: e,
        type: TODO_ACTIONS.FETCH_ERROR,
      });
      // setErrors((prev) => [...prev, e]);
      dispatch({ type: 'REVERT_ADD_TODO', id: newToDo.id });
    }
  }

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
      //COMBINE? line 155-160
      dispatch({
        fetchError: e,
        type: TODO_ACTIONS.FETCH_ERROR,
      });
      // setErrors((prev) => [...prev, e]);
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, todo: targetTodo });
    }
  }

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
      // understand this fool!
      await patch(`tasks/${editedTodo.id}`, options);
      invalidateCache();
    } catch (e) {
      dispatch({
        fetchError: e,
        type: TODO_ACTIONS.FETCH_ERROR,
      });
      // setErrors((prev) => [...prev, e]);
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, todo: targetTodo });
    }
  }

  /**
   * @param {string} newValue
   */
  function handleSortByChange(newValue) {
    dispatch({ type: TODO_ACTIONS.SET_SORT_BY, sortBy: newValue });
    // setSortBy(newValue);
  }
  /**
   * @param {string} newValue
   */
  function handleSortByDirectionChange(newValue) {
    dispatch({
      type: TODO_ACTIONS.SET_SORT_DIRECTION,
      sortDirection: newValue,
    });
    // setSortDirection(newValue);
  }
  /**
   * @param {string} newTerm
   */
  function handlefilterChange(newTerm) {
    dispatch({ type: TODO_ACTIONS.SET_S_E_O, filterTerm: newTerm });
    // setFilterTerm(newTerm);
  }

  const invalidateCache = useCallback(() => {
    console.log(
      'Invalidating Memo cache after todo mutation\n',
      `Version${dataVersion}`
    );
    dispatch({
      type: TODO_ACTIONS.DATA_VERSION_COUNT,
      // dataVersion: dataVersion,
    });
    // setDataVersion((previous) => previous + 1);
  }, [dataVersion]);

  function resetFilters() {
    dispatch({ type: TODO_ACTIONS.SET_S_E_O, filterTerm: '' });
    // setFilterTerm('');
    dispatch({ type: TODO_ACTIONS.SET_SORT_BY, sortBy: 'createDate' });
    // setSortBy('creationDate');
    dispatch({ type: TODO_ACTIONS.SET_SORT_DIRECTION, sortDirection: 'desc' });
    // setSortDirection('desc');
    dispatch({ type: TODO_ACTIONS.FILTER_ERROR, filterError: '' });
    // setFilterError('');
  }

  return (
    <>
      {error && (
        <div>
          <p>{error}</p>
          <button
            type="button"
            onClick={() =>
              dispatch({ type: TODO_ACTIONS.FETCH_ERROR, fetchError: '' })
            }
          >
            Clear Error
          </button>
        </div>
      )}
      {filterError && (
        <div>
          <p>{filterError}</p>
          <button
            type="button"
            onClick={() =>
              dispatch({ type: TODO_ACTIONS.FILTER_ERROR, filterError: '' })
            }
          >
            Clear Filter Error
          </button>
          <button type="button" onClick={() => resetFilters()}>
            Reset Filters
          </button>
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
    </>
  );
}
