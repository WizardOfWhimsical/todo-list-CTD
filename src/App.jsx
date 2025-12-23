//App.jsx
import './App.css';
import TodosPage from './features/Todos/TodosPage';
import Header from './shared/Header';
import Logon from './features/Logon';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <>
      <Header message={'Hopefully Do'} />
      <TodosPage />
    </>
  ) : (
    <>
      <Header message={'Please Log In'} />
      <Logon />
    </>
  );
}
/**
 * return (
     // watched {todo.length === 0 && "No Todos"}
     // its called shortCircuting, represents a conditional??
     <ul>
       {filteredTodos.length <= 0
         ? 'Add todo above to get started'
         : filteredTodos.map((todo) => (
             <ToDoListItem
               onUpdateTodo={onUpdateTodo}
               onCompleteTodo={onCompleteTodo}
               key={todo.id}
               todo={todo}
             />
           ))}
     </ul>
 */
export default App;
