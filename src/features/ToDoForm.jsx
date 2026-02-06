import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import isValidTodoTitle from '../utils/todoValidation';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function ToDoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const inputRef = useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const todoTitle = workingTodoTitle.trim();

    if (todoTitle) {
      onAddTodo(todoTitle);
      setWorkingTodoTitle('');
      inputRef.current.focus();
    }
  }

  return (
    <Form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        labelText={'To Do: '}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        ref={inputRef}
      />
      <Button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add ToDo
      </Button>
    </Form>
  );
}
