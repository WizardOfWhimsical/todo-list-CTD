export const initialTodoState = {
  todoList: [],
  error: '',
  filterError: '',
  isTodoListLoading: false,
  sortBy: 'createDate',
  sortDirection: 'asc',
  filterTerm: '',
  dataVerion: 0,
};

export const TODO_ACTIONS = {
  // fetch operations
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  // filter operations
  SET_SORT_BY: 'SET_SORT_BY',
  SET_SORT_DIRECTION: 'SET_SORT_DIRECTION',
  SET_S_E_O: 'SET_S_E_O',
  FILTER_ERROR: 'FILTER_ERROR',
  //todo verbs
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  SYNCHRONIZE_TODO: 'SYNCHRONIZE_TODO',
  REVERT_ADD_TODO: 'REVERT_ADD_TODO',
};

export function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.FETCH_START: {
      return { ...state, isTodoListLoading: true, error: '' };
    }
    //gets list-fetch_success
    case TODO_ACTIONS.FETCH_SUCCESS: {
      return {
        ...state,
        todoList: action.data,
        error: '',
        isTodoListLoading: false,
      };
      // return [...state, todoList:]
    }
    case TODO_ACTIONS.FETCH_ERROR: {
      return {
        ...state,
        isTodoListLoading: false,
        error: action.fetchError,
      };
    }
    //------------------------------------------
    case TODO_ACTIONS.SET_SORT_BY: {
      console.log('hitting switch', action.sortBy);
      return { ...state, sortBy: action.sortBy, filterError: '' };
    }
    case TODO_ACTIONS.SET_SORT_DIRECTION: {
      return { ...state, filterError: '', sortDirection: action.sortDirection };
    }
    case TODO_ACTIONS.SET_S_E_O: {
      return { ...state, filterTerm: action.filterTerm };
    }
    case TODO_ACTIONS.FILTER_ERROR: {
      return { ...state, filterError: action.sortError };
    }
    //------------------------------------------
    // puts todo in list
    case TODO_ACTIONS.ADD_TODO: {
      const newToDo = {
        id: action.id,
        title: action.title,
        isCompleted: false,
      };
      return { ...state, todoList: [newToDo, ...state.todoList] };
    }
    // used for isComplete/isEditing
    case TODO_ACTIONS.UPDATE_TODO: {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.todo.id) {
            return { ...todo, ...action.todo };
          }
          return todo;
        }),
      };
    }
    // adds successful db updating to list
    case TODO_ACTIONS.SYNCHRONIZE_TODO: {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.id) {
            return action.data;
          }
          return todo;
        }),
      };
    }
    // removes upon failure to update db
    case TODO_ACTIONS.REVERT_ADD_TODO: {
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.id),
      };
    }
    default: {
      return state;
    }
  }
}
