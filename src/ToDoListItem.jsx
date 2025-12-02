//ToDoListItem.jsx
export function ToDoListItem({ todo, onDeleteTodo, onCompleteTodo }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onCompleteTodo(todo.id)}
        />
        {todo.title}
      </label>
      <button type="button" onClick={() => onDeleteTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
}
