//ToDoList.jsx

import { ToDoListItem } from './ToDoListItem';

function ToDoList({ todos, onCompleteTodo, onUpdateTodo }) {
  const filteredTodos = todos.filter((todo) => todo.isCompleted === false);
  return (
    // watched {todo.length === 0 && "No Todos"}
    // its called shortCircuting, represents a conditional??
    <ul>
      {filteredTodos.length <= 0
        ? 'Add todo above to get started'
        : filteredTodos.map((todo) => (
            <ToDoListItem
              onUpdateTodo={onUpdateTodo} //<-ask bout this
              onCompleteTodo={onCompleteTodo} //<-ask bout this
              key={todo.id}
              todo={todo}
            />
          ))}
    </ul>
  );
}
//the expample in the curriculim is confussing
export default ToDoList;
