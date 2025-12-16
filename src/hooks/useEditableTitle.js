import { useReducer, useState } from 'react';

function titleReducer(state, action) {
  //start, cancel, update, finsish
  if (action.type === 'start') {
    console.log('start worked', action);
    return { isEditing: true, value: action.value };
  }
  if (action.type === 'cancel') {
    console.log('cancel worked', action);
    return { value: action.value, isEditing: false };
  }
  if (action.type === 'update') {
    return {
      ...state,
      value: action.value,
    };
  }
  if (action.type === 'finish') {
    console.log('finsih worked', action);
    return { ...state, isEditing: false };
  }
  return state;
}

export default function useEditableTitle(initialTitle) {
  const [title, dispatch] = useReducer(titleReducer, {
    isEditing: false,
    value: initialTitle,
  });

  const startEditing = () => {
    // setWorkingTitle(initialTitle);
    // setIsEditing(true);
    dispatch({ type: 'start', value: initialTitle });
  };

  const cancelEdit = () => {
    // setWorkingTitle(initialTitle);
    // setIsEditing(false);
    dispatch({ type: 'cancel', value: initialTitle });
  };

  const updateTitle = (newTitle) => {
    // setWorkingTitle(newTitle);
    dispatch({ type: 'update', value: newTitle });
  };

  const finishEdit = () => {
    // setIsEditing(false);
    dispatch({ type: 'finish' });
    return title.value;
    // return workingTitle;
  };

  return {
    isEditing: title.isEditing,
    workingTitle: title.value,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  };
}
