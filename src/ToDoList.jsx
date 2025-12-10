import TodoListItem from './TodoListItem';

function ToDoList({ todoList }) {
  console.log(todoList);
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default ToDoList;
