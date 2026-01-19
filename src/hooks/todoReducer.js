export default function todoReducer(state, action) {
  switch (action.type) {
    //gets list
    case 'GET_TODOS': {
      return action.data;
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
