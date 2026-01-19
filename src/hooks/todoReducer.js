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
  // fetcho operations
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  ERROR_CLEAR: 'ERROR_CLEAR',
};

export function todoReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START': {
      return { ...state, isTodoListLoading: true, error: '' };
    }
    //gets list-fetch_success
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        todoList: action.data,
        error: '',
        isTodoListLoading: false,
      };
      // return [...state, todoList:]
    }
    case 'FETCH_ERROR': {
      return {
        ...state,
        isTodoListLoading: false,
        error: action.fetchError,
      };
    }
    case 'ERROR_CLEAR': {
      return { ...state, error: '' };
    }
    //------------------------------------------
    // puts todo in list
    case 'ADD_TODO': {
      const newToDo = {
        id: action.id,
        title: action.title,
        isCompleted: false,
      };
      return [newToDo, ...state];
    }
    // used for isComplete/isEditing
    case 'UPDATE_TODO': {
      return state.map((todo) => {
        if (todo.id === action.todo.id) {
          return { ...todo, ...action.todo };
        }
        return todo;
      });
    }
    // adds successful db updating to list
    case 'SYNCHRONIZE_TODO': {
      return state.map((todo) => {
        if (todo.id === action.id) {
          return action.data;
        }
        return todo;
      });
    }
    // removes upon failure to update db
    case 'REVERT_ADD_TODO': {
      return state.filter((todo) => todo.id !== action.id);
    }
    default: {
      return state;
    }
  }
}
