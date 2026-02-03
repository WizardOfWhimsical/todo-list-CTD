import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import useEditableTitle from '../../../hooks/useEditableTitle';
import { useEffect, useRef } from 'react';

//ToDoListItem.jsx
export function ToDoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const {
    startEditing,
    workingTitle,
    isEditing,
    updateTitle,
    finishEdit,
    cancelEdit,
  } = useEditableTitle(todo.title);

  const inputRef = useRef();

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleEdit(e) {
    updateTitle(e.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (!isEditing) return;
    const finalTitle = finishEdit();
    onUpdateTodo({ ...todo, title: finalTitle });
  }
  const handleEscape = (e) => {
    if (e.key === 'Escape') cancelEdit();
  };
  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              labelText="Editing task: "
              value={workingTitle}
              onChange={handleEdit}
              ref={inputRef}
              onKeyDown={handleEscape}
            />
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
            <button key="submit" type="submit">
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                onChange={() => onCompleteTodo(todo.id)}
                checked={todo.isCompleted}
              />
            </label>
            <span>{todo.title}</span>
            <button
              type="button"
              onClick={() => {
                startEditing();
                // inputRef.current?.focus();
              }}
            >
              EDIT
            </button>
          </>
        )}
      </form>
    </li>
  );
}
