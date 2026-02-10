import TextInputWithLabel from '../../shared/TextInputWithLabel';
import useEditableTitle from '../../hooks/useEditableTitle';
import { useEffect, useRef } from 'react';
import styles from './ToDoListItem.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function ToDoListItem({
  todo,
  onCompleteTodo,
  onUpdateTodo,
  // onDeleteTodo,
}) {
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
      inputRef.current?.focus();
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

  function handleEscape(e) {
    if (e.key === 'Escape') cancelEdit();
  }

  return (
    <li className={styles.todoListItem}>
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
              <span>{todo.title}</span>
            </Form.Label>

            <Button
              type="button"
              onClick={() => {
                startEditing();
              }}
            >
              EDIT
            </Button>
            {/* <Button
              type="button"
              onClick={() => {
                onDeleteTodo();
              }}
            >
              Delete
            </Button> */}
          </Form.Group>
        )}
      </Form>
    </li>
  );
}
