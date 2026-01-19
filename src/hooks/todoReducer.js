export const initialTodoState = {
  todoList: [],
  errors: '',
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
};

export function todoReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START': {
      return { ...state, isTodoListLoading: true };
    }
    //gets list-fetch_success
    case 'FETCH_SUCCESS': {
      return { ...state, initialTodoState: action.data };
      // return [...state, todoList:]
    }
    case 'FETCH_ERROR': {
      return {
        ...state,
        errors: action.fetchError,
      };
    }
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
