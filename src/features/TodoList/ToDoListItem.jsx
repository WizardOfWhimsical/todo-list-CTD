import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

//ToDoListItem.jsx
export function ToDoListItem({ todo, onCompleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(e) {
    setWorkingTitle(e.target.value);
  }

  return (
    <li>
      <form>
        {isEditing ? (
          <>
            <TextInputWithLabel
              labelText="Editing task: "
              id="edits" //<-unique id needed
              value={workingTitle}
              onChange={handleEdit}
            />
            <button type="button" onClick={handleCancel}>
              Cancel
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
