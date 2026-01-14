import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import useEditableTitle from '../../../hooks/useEditableTitle';

//ToDoListItem.jsx
export function ToDoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const {
    startEditing,
    workingTitle,
    isEditing,
    updateTitle,
    finishEdit,
    cancelEdit,
  } = useEditableTitle(todo.title);

  function handleEdit(e) {
    updateTitle(e.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (!isEditing) return;
    const finalTitle = finishEdit();
    onUpdateTodo({ ...todo, title: finalTitle });
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              labelText="Editing task: "
              value={workingTitle}
              onChange={handleEdit}
            />
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
            <button key="submit" type="submit">
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                onChange={() => onCompleteTodo(todo.id)}
                checked={todo.isCompleted}
              />
            </label>
            <span>{todo.title}</span>
            <button type="button" onClick={() => startEditing()}>
              EDIT
            </button>
          </>
        )}
      </form>
    </li>
  );
}
