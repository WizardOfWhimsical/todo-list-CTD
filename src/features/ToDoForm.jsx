import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../utils/todoValidation';

export default function ToDoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoTitle = workingTodoTitle.trim();

    if (todoTitle) {
      onAddTodo(todoTitle);
      setWorkingTodoTitle('');
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        htmlFor={'todoTitle'}
        id={'todoTitle'}
        labelText={'To Do:'}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        ref={inputRef}
      />
      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add ToDo
      </button>
    </form>
  );
}
