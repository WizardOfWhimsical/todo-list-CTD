import './App.css';
import ToDoList from './todolist';
import ToDoForm from './ToDoForm';

function App() {
  return (
    <>
      <h1>My Todos</h1>
      <ToDoForm />
      <ToDoList />
    </>
  );
}

export default App;
