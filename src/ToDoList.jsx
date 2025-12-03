//ToDoList.jsx

import { ToDoListItem } from './ToDoListItem';

function ToDoList({ todos, onCompleteTodo }) {
  console.log(todos);

  return (
    // watched {todo.length === 0 && "No Todos"}
    // its called shortCircuting, represents a conditional??
    <ul>
      {todos.length <= 0
        ? `NO TODOS TODAY {^-^}`
        : todos.map((todo) => (
            <ToDoListItem
              onCompleteTodo={onCompleteTodo}
              key={todo.id}
              todo={todo}
            />
          ))}
    </ul>
  );
}
//the expample in the curriculim is confussing
export default ToDoList;
