export default function todoReducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS': {
      return action.data;
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
      console.log(action);
      return state.map((todo) => {
        // ITS HERE
        console.log('before conditional');

        if (todo.id === action.id) {
          console.log('running...', action);
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
