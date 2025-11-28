//ToDoList.jsx

/**
 * In TodoList.jsx, replace the current return statement with a ternary operator that:
        Checks if the todoList length equals zero
            If true, renders a paragraph element with the text "Add todo above to get started"
            If false, renders the existing unordered list with the mapped todos
 */

import { ToDoListItem } from './ToDoListItem';

function ToDoList({ todos }) {
  console.log(todos);
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
//the expample in the curriculim is confussing
export default ToDoList;
