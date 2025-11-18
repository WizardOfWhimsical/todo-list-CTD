function ToDoList({ props }) {
  return (
    <ul>
      {props.map((prop) => (
        <li key={prop.id}>{prop.title}</li>
      ))}
    </ul>
  );
}
//the expample in the curriculim is confussing
export default ToDoList;
