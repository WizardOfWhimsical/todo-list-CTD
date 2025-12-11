import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

//ToDoListItem.jsx
export function ToDoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(e) {
    setWorkingTitle(e.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (!isEditing) return;
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              labelText="Editing task: "
              value={workingTitle}
              onChange={handleEdit}
            />
            <button type="button" onClick={handleCancel}>
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
            <button type="button" onClick={() => setIsEditing(true)}>
              EDIT
            </button>
          </>
        )}
      </form>
    </li>
  );
}
