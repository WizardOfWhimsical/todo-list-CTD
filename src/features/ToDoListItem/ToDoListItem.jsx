import TextInputWithLabel from '../../shared/TextInputWithLabel';
import useEditableTitle from '../../hooks/useEditableTitle';
import { useEffect, useRef } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//ToDoListItem.jsx
export default function ToDoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
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
    <li className="todo-list-item">
      <Form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              labelText="Editing task: "
              value={workingTitle}
              onChange={handleEdit}
              ref={inputRef}
              onKeyDown={handleEscape}
            />
            <Button type="button" onClick={cancelEdit}>
              Cancel
            </Button>
            <Button key="submit" type="submit">
              Update
            </Button>
          </>
        ) : (
          <Form.Group>
            <Form.Label>
              <Form.Control
                type="checkbox"
                onChange={() => onCompleteTodo(todo.id)}
                checked={todo.isCompleted}
              />
            </Form.Label>
            <span>{todo.title}</span>
            <Button
              type="button"
              onClick={() => {
                startEditing();
                // inputRef.current?.focus();
              }}
            >
              EDIT
            </Button>
          </Form.Group>
        )}
      </Form>
    </li>
  );
}
