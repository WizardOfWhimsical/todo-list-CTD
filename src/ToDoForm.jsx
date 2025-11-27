import { useRef } from 'react';

function ToDoForm({ onAddTodo }) {
  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();

    console.log(event.target.todoTitle.value);
    //trim is always smart.
    const todoTitle = event.target.todoTitle.value.trim();
    //check for empty string
    if (todoTitle) {
      onAddTodo(todoTitle);
      event.target.reset();
      inputRef.current.focus(); //<-whats this do?
    }
  };

  return (
    <form>
      <label htmlFor="todoTitle">To Do: </label>
      <input type="input" id="todoTitle" />
      <button type="submit" disabled>
        Add ToDo
      </button>
    </form>
  );
}

export default ToDoForm;
