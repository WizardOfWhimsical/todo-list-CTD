//ToDoList.jsx

import { useMemo } from 'react';
import { ToDoListItem } from './ToDoListItem';

function ToDoList({ todos, onCompleteTodo, onUpdateTodo, dataVersion }) {
  const filteredTodoList = useMemo(() => {
    console.log(`Recalculating todos (v${dataVersion})`);
    return {
      version: dataVersion,
      todos: todos.filter((todo) => todo.isCompleted === false),
    };
  }, [dataVersion, todos]);

  return (
    <ul className="todo-list-container">
      {filteredTodoList.todos.length <= 0
        ? 'Add todo above to get started'
        : filteredTodoList.todos.map((todo) => (
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
