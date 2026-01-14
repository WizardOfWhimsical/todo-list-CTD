//ToDoList.jsx

import { ToDoListItem } from './ToDoListItem';

function ToDoList({ todos, onCompleteTodo, onUpdateTodo }) {
  const filteredTodos = todos.filter((todo) => todo.isCompleted === false);
  // const filteredTodos = todos;
  return (
    <ul>
      {filteredTodos.length <= 0
        ? 'Add todo above to get started'
        : filteredTodos.map((todo) => (
            <ToDoListItem
              onUpdateTodo={onUpdateTodo}
              onCompleteTodo={onCompleteTodo}
              key={todo.id}
              todo={todo}
            />
          ))}
    </ul>
  );
}

export default ToDoList;
