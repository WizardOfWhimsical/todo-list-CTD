//ToDoList.jsx

import { ToDoListItem } from './ToDoListItem';

function ToDoList({ todos, onCompleteTodo }) {
  console.log(todos);
  const filteredTodos = todos.filter((todo) => todo.isCompleted === false);

  return (
    // watched {todo.length === 0 && "No Todos"}
    // its called shortCircuting, represents a conditional??
    <ul>
      {todos.length <= 0
        ? `NO TODOS TODAY {^-^}`
        : filteredTodos.map((todo) => (
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
