import { useMemo } from 'react';
import ToDoListItem from '../ToDoListItem';
import styles from './ToDoList.module.css';

function ToDoList({
  todos,
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
  statusFilter,
}) {
  const filteredTodoList = useMemo(() => {
    console.log(`Recalculating todos (v${dataVersion})`);

    let filteredTodos;
    switch (statusFilter) {
      case 'completed':
        filteredTodos = todos.filter((todo) => todo.isCompleted);
        break;
      case 'active':
        filteredTodos = todos.filter((todo) => !todo.isCompleted);
        break;
      case 'all':
      default:
        filteredTodos = todos;
        break;
    }

    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [dataVersion, todos, statusFilter]);

  function getEmptyMessage() {
    switch (statusFilter) {
      case 'completed':
        return 'No completed todos yet. Start something...';
      case 'active':
        return 'No active To-dos. You might be done for the day...';
      case 'all':
      default:
        return 'Add a todo to get started';
    }
  }

  return (
    <ul className={styles.todoListContainer}>
      {filteredTodoList.todos.length === 0 ? (
        <p>
          <em>{getEmptyMessage()}</em>
        </p>
      ) : (
        filteredTodoList.todos.map((todo) => (
          <ToDoListItem
            // onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
            onCompleteTodo={onCompleteTodo}
            key={todo.id}
            todo={todo}
          />
        ))
      )}
    </ul>
  );
}

export default ToDoList;
