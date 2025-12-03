import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

//ToDoListItem.jsx
export function ToDoListItem({ todo, onCompleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li>
      <form>
        {isEditing ? (
          <TextInputWithLabel value={todo.title} />
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                onChange={() => onCompleteTodo(todo.id)}
                checked={todo.isCompleted}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}
