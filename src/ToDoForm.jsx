import { useState } from 'react';

function ToDoForm({ onFormSubmit }) {
  const [title, setTitle] = useState('');

  function handleChange(event) {
    let newTitle = event.target.value;
    setTitle(newTitle);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onFormSubmit(title);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todoTitle">To Do: </label>
      <input
        type="input"
        id="todoTitle"
        value={title}
        onChange={handleChange}
      />
      <button type="submit">Add ToDo</button>
    </form>
  );
}

export default ToDoForm;

/**
 *
 * WHEN YOU COME BACK, SWITCH TO BRANCH 4, CREATE NEW HOOKS BRANCH PART II
 * THEN FOLLOW THE ASSIGNMENT
 *
 */
