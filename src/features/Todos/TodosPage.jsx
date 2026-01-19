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
    // filterError,
    // sortBy,
    // sortDirection,
    // filterTerm,
    // dataVersion,
  } = state;

  // const [error, setErrors] = useState([]);
  // const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  const [sortBy, setSortBy] = useState('creationDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const [filterTerm, setFilterTerm] = useState('');
  const debouncedFilterTerm = useDebounce(filterTerm, 500);

  const [dataVersion, setDataVersion] = useState(0);

  const [filterError, setFilterError] = useState('');

  useEffect(() => {
    if (!token) return;
    let firstPost = false;

    const paramsObj = { sortBy, sortDirection };
    if (debouncedFilterTerm) {
      paramsObj.find = debouncedFilterTerm;
    }

    const params = new URLSearchParams(paramsObj);

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

        const data = await get(`tanker?${params}`, options);
        // fetch_success
        if (!firstPost) {
          dispatch({ data, type: TODO_ACTIONS.FETCH_SUCCESS });
        }
        //clearing err->put into reducer w/success
        setFilterError('');
      } catch (er) {
        //setting err->line 64 failSafe? seprate err
        dispatch({ fetchError: er.message, type: TODO_ACTIONS.FETCH_ERROR });
        // setErrors((prev) => [...prev, er]);
        //search/sort filterErr
        if (
          debouncedFilterTerm ||
          sortBy !== 'creationDate' ||
          sortDirection !== 'desc'
        ) {
          //handle in reducer when we get to sortiung
          setFilterError(`Error filtering/sorting todos: ${error.message}`);
        } else {
          //setting err
          console.log('error in catch/else', er);
          dispatch({
            fetchError: er.message,
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

    dispatch({ type: 'ADD_TODO', title: todoTitle, id: newToDo.id });

    const options = {
      headers: { 'X-CSRF-TOKEN': token },
      body: { title: newToDo.title, isCompleted: newToDo.isCompleted },
    };

    try {
      const data = await post(`tasks`, options);

      dispatch({ type: 'SYNCHRONIZE_TODO', id: newToDo.id, data });

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
      invalidateCache();
    } catch (e) {
      //COMBINE? line 155-160
      dispatch({
        fetchError: e,
        type: TODO_ACTIONS.FETCH_ERROR,
      });
      // setErrors((prev) => [...prev, e]);
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
      // understand this fool!
      await patch(`tasks/${editedTodo.id}`, options);
      invalidateCache();
    } catch (e) {
      dispatch({
        fetchError: e,
        type: TODO_ACTIONS.FETCH_ERROR,
      });
      // setErrors((prev) => [...prev, e]);
      dispatch({ type: 'UPDATE_TODO', todo: targetTodo });
    }
  }

  function handleSortByChange(newValue) {
    setSortBy(newValue);
  }
  function handleSortByDirectionChange(newValue) {
    setSortDirection(newValue);
  }

  function handlefilterChange(newTerm) {
    setFilterTerm(newTerm);
  }

  const invalidateCache = useCallback(() => {
    console.log(
      'Invalidating Memo cache after todo mutation\n',
      `Version${dataVersion}`
    );
    setDataVersion((previous) => previous + 1);
  }, [dataVersion]);

  function resetFilters() {
    setFilterTerm('');
    setSortBy('creationDate');
    setSortDirection('desc');
    setFilterError('');
  }

  return (
    <>
      {error && (
        <div>
          <p>{error}</p>
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.ERROR_CLEAR })}
          >
            Clear Filter Error
          </button>
        </div>
      )}
      ;
      {filterError && (
        <div>
          <p>{filterError}</p>
          <button type="button" onClick={() => setFilterError('')}>
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
