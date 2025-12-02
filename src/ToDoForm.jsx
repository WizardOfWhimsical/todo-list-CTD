import { useRef } from 'react';

function ToDoForm({ onAddTodo }) {
  const inputRef = useRef();

  /**
   *
   * @param {Event} event
   */
  const handleAddTodo = (event) => {
    event.preventDefault();

    /**
     * @type {HTMLInputElement}//how we define it as a string
     */
    const inputFieldElement = event.target.todoTitle;

    //trim is always smart.
    const todoTitle = inputFieldElement.value.trim();
    //check for empty string
    //theres form validation in here??
    if (todoTitle) {
      //<-check if the inputs empty or not
      onAddTodo(todoTitle);
      event.target.reset(); //restets form input
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
