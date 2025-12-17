import { useRef } from 'react';

function ToDoForm({ onAddTodo }) {
  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();

    console.log(event.target.todoTitle.value);
    //trim is always smart.
    const todoTitle = event.target.todoTitle.value.trim();
    //check for empty string
    //theres form validation in here??
    if (todoTitle) {
      onAddTodo(todoTitle);
      event.target.reset();
      inputRef.current.focus(); //<-whats this do?
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">To Do: </label>
      <input
        type="text"
        id="todoTitle"
        name="todoTitle"
        ref={inputRef}
        required
      />
      <button type="submit">Add ToDo</button>
    </form>
  );
}

export default ToDoForm;
