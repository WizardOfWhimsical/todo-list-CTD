import { useRef, useState } from 'react';

function ToDoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();

    //trim is always smart.
    const todoTitle = workingTodoTitle.trim();
    //check for empty string
    //theres form validation in here??
    if (todoTitle) {
      onAddTodo(todoTitle);
      console.log('1st', event);
      event.target.reset(); //<-clears field
      setWorkingTodoTitle('');
      // inputRef.current.reset();
      inputRef.current.focus(); //<-puts cursor into input
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">To Do: </label>
      <input
        type="text"
        id="todoTitle"
        name="todoTitle"
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        ref={inputRef}
        required
      />
      <button type="submit" disabled={!workingTodoTitle.trim()}>
        Add ToDo
      </button>
    </form>
  );
}

export default ToDoForm;
