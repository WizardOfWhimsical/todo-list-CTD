import { useRef } from 'react';

function ToDoForm() {
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
