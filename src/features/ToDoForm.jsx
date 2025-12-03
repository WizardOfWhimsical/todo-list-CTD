import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../utils/todoValidation';
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
      setWorkingTodoTitle('');
      // inputRef.current.reset();
      inputRef.current.focus(); //<-puts cursor into input
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
      {/* <label htmlFor="todoTitle">To Do: </label>
      <input
        type="text"
        id="todoTitle"
        name="todoTitle"
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        ref={inputRef}
        required
      /> */}
      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add ToDo
      </button>
    </form>
  );
}

export default ToDoForm;
