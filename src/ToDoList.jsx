//ToDoList.jsx
import { ToDoListItem } from './ToDoListItem';

function ToDoList({ todos }) {
  console.log(todos);
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
//the expample in the curriculim is confussing
export default ToDoList;
