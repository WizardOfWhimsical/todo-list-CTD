//ToDoListItem.jsx
export function ToDoListItem({ todo, onCompleteTodo }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          onChange={() => onCompleteTodo(todo.id)}
          checked={todo.isCompleted}
        />
        {todo.title}
      </label>
    </li>
  );
}
