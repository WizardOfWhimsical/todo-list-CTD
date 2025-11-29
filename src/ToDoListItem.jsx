//ToDoListItem.jsx
export function ToDoListItem({ todo, onDeleteTodo }) {
  return (
    <li>
      {todo.title}
      <button type="button" onClick={() => onDeleteTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
}
